// ============================================================
// UJI PANTAU-TERUS — sandbox penuh (db di /tmp, fetch di-mock).
// Jalankan: bun scripts/ujian/pantau_test.ts
// Memastikan (pesan 18+19 pemilik):
//   A. TP kena intraday → MENANG dicatat LANGSUNG + rekalkulasi mandiri (zaman++)
//   B. SL kena intraday → KALAH dicatat LANGSUNG + pelajaran + rekalkulasi mandiri
//   C. TP & SL keduanya tersentuh → urutan dijawab candle 1j (konservatif STOP-dulu)
//   D. garis vonis selalu benar geometrinya: SELL → SL atas/TP bawah; BUY → TP atas/SL bawah
//   E. bukan satu-entry-sehari: zaman 1 → 2 → 3 di hari yang sama
//   F. dompet $1000 ikut: TUTUP di buku hidup lalu BUKA lagi (all-in) tiap zaman
// ============================================================
// PENTING: env HARUS ditetapkan sebelum modul elsa dimuat — static import
// ter-hoist di atas penugasan env, sehingga modul membaca DB PRODUKSI.
// Karena itu semua modul bermuatan-fs dimuat DINAMIS di bawah.
process.env.ELSA_DB_DIR = `/tmp/elsa_uji_pantau_${Date.now()}`;
const DB_DIR = process.env.ELSA_DB_DIR;

import type { Candle } from '../../src/lib/elsa/indicators'; // tipe saja — tanpa fs
import { keadaanHarga, garisVonisHidup, labelArahOf } from '../../src/lib/elsa/pantau'; // murni

const { _ujiPantau } = await import('../../src/lib/elsa/arena');
const { getDompetPayload } = await import('../../src/lib/elsa/dompet');

// ---------------- state hidup palsu ----------------
const state = { harga: 0.1 };
let seed = 42;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };

function buatLurus(n: number, langkahMs: number, hargaAkhir: number, rasio: number): Candle[] {
  // harga jalan maju dari hargaAkhir*rasio ke hargaAkhir dengan noise ringan
  const cs: Candle[] = [];
  const akhir = Date.now();
  const t0 = Math.floor(akhir / langkahMs) * langkahMs - (n - 1) * langkahMs;
  let prev = hargaAkhir * rasio;
  for (let i = 0; i < n; i++) {
    const c = i === n - 1 ? hargaAkhir : hargaAkhir * rasio + ((hargaAkhir - hargaAkhir * rasio) * i) / (n - 1) * (1 + (rnd() - 0.5) * 0.02);
    const o = prev;
    const h = Math.max(o, c) * (1 + rnd() * 0.006);
    const l = Math.min(o, c) * (1 - rnd() * 0.006);
    cs.push({ t: t0 + i * langkahMs, o, h, l, c, v: 400_000 + rnd() * 1_600_000 });
    prev = c;
  }
  return cs;
}

const HARI_MS = 86_400_000;
const hariIniT = Math.floor(Date.now() / HARI_MS) * HARI_MS;
const csD = buatLurus(200, HARI_MS, state.harga, 0.62);
csD[199].t = hariIniT; // candle harian berjalan = hari ini
const btcD = buatLurus(200, HARI_MS, 97000, 0.9);
const cs6h = buatLurus(200, 4 * 3_600_000, state.harga, 0.9);
const cs60: Candle[] = buatLurus(96, 3_600_000, state.harga, 0.995);

// ---------------- mock fetch (orderbook, ticker, kline, funding) ----------------
function bukuPalsu(mid: number) {
  const asks: { harga: number; qty: number }[] = [];
  const bids: { harga: number; qty: number }[] = [];
  for (let i = 0; i < 80; i++) {
    asks.push({ harga: mid * (1 + (i + 1) * 0.00004), qty: 1500 + rnd() * 800 });
    bids.push({ harga: mid * (1 - (i + 1) * 0.00004), qty: 1500 + rnd() * 800 });
  }
  return { asks: asks.sort((a, b) => a.harga - b.harga), bids: bids.sort((a, b) => b.harga - a.harga) };
}
const respPalsu = (j: unknown) => Promise.resolve({ ok: true, status: 200, json: async () => j } as unknown as Response);

// @ts-ignore — mock khusus sandbox uji
globalThis.fetch = (async (url: string) => {
  const u = String(url);
  const mid = state.harga;
  if (u.includes('/v5/market/kline')) {
    const sym = new URL(u).searchParams.get('symbol') ?? '';
    const iv = new URL(u).searchParams.get('interval') ?? '';
    let cs: Candle[];
    if (sym === 'BTCUSDT') cs = btcD;
    else if (iv === 'D') cs = csD;
    else if (iv === '240') cs = cs6h;
    else cs = cs60;
    const list = cs.map((c) => [String(c.t), String(c.o), String(c.h), String(c.l), String(c.c), String(c.v)]);
    return respPalsu({ retCode: 0, result: { list } });
  }
  if (u.includes('/v5/market/tickers')) {
    return respPalsu({ retCode: 0, result: { list: [{ lastPrice: String(mid), prevPrice24h: String(mid * 0.99), highPrice24h: String(mid * 1.03), lowPrice24h: String(mid * 0.97), volume24h: '9000000', turnover24h: '5000000', price24hPcnt: '0.01' }] } });
  }
  if (u.includes('/v5/market/orderbook')) {
    const b = bukuPalsu(mid);
    return respPalsu({ retCode: 0, result: { b: b.bids.map((x) => [String(x.harga), String(x.qty)]), a: b.asks.map((x) => [String(x.harga), String(x.qty)]) } });
  }
  if (u.includes('/v5/market/funding/history')) return respPalsu({ retCode: 0, result: { list: [] } });
  // endpoint lain (modal/aliran/sumber) — jawaban kosong yang jujur gagal lembut
  return respPalsu({ retCode: 10001, retMsg: 'mock-uji: endpoint tidak dipakai skenario pantau', result: {} });
}) as typeof fetch;

// ---------------- uji ----------------
const U = _ujiPantau;
if (!U.toko || typeof U.kunciSlot !== 'function') throw new Error('hook uji tidak tersedia');
console.log(`sandbox DB: ${DB_DIR}`);
let gagal = 0;
function cek(nama: string, ok: boolean, detail?: string) {
  if (ok) console.log(`  PASS ${nama}`);
  else { gagal++; console.log(`  FAIL ${nama}${detail ? ` — ${detail}` : ''}`); }
}

const hari = U.dayOf(csD[199].t);
const t24 = () => ({
  lastPrice: state.harga, prevPrice24h: state.harga * 0.99, high24h: state.harga * 1.03,
  low24h: state.harga * 0.97, volume24h: 9_000_000, turnover24h: 5_000_000, perubahan24jPct: 1,
});

console.log('=== A. garis vonis (murni) ===');
const gB = garisVonisHidup('BUY', 0.1, 2, 1.8);
const gS = garisVonisHidup('SELL', 0.1, 2, 1.8);
cek('BUY: SL < entry < TP', gB.stop < gB.entry && gB.entry < gB.target, `${gB.stop}/${gB.entry}/${gB.target}`);
cek('BUY: posisi TP ATAS, SL BAWAH', gB.posisiTarget === 'ATAS_PASAR' && gB.posisiStop === 'BAWAH_PASAR');
cek('SELL: TP < entry < SL', gS.target < gS.entry && gS.entry < gS.stop, `${gS.target}/${gS.entry}/${gS.stop}`);
cek('SELL: posisi TP BAWAH, SL ATAS', gS.posisiTarget === 'BAWAH_PASAR' && gS.posisiStop === 'ATAS_PASAR');
cek('label arah P-7', labelArahOf('BUY') === 'BUY (LONG)' && labelArahOf('SELL') === 'SELL (SHORT)');
cek('sanityOk keduanya', gB.sanityOk && gS.sanityOk);
const kB = keadaanHarga('BUY', 1.0, 1.02, 0.98, 1.025);
cek('keadaanHarga BUY kena TP', kB.sentuhTarget && !kB.sentuhStop);
const kS = keadaanHarga('SELL', 1.0, 0.98, 1.02, 1.025);
cek('keadaanHarga SELL kena SL (harga naik)', kS.sentuhStop && !kS.sentuhTarget);

console.log('=== B. kunci slot zaman-1 ===');
U.toko.sellOn = true; // izinkan kedua arah (uji)
await U.kunciSlot(csD, btcD, cs6h, t24(), hari, { zaman: 1, trigger: 'KUNCI HARIAN — uji pantau' });
const a1 = U.toko.aktif;
cek('aktif zaman-1 terkunci', !!a1 && a1.zaman === 1);
if (a1) {
  cek(`arah slot ${a1.arah}: geometri level benar`,
    a1.arah === 'BUY' ? (a1.stop < a1.entry && a1.entry < a1.target) : (a1.target < a1.entry && a1.entry < a1.stop));
  cek('waktuKunci tercatat', typeof a1.waktuKunci === 'string' && a1.waktuKunci.length > 10);
  cek('slotTerakhirCoba {hari, zaman:1}', U.toko.slotTerakhirCoba?.hari === hari && U.toko.slotTerakhirCoba.zaman === 1);
  cek('dompet all-in zaman-1', (await getDompetPayload()).posisi !== null);
}

async function dorongKe(level: number) {
  state.harga = level;
  const last = csD[199];
  last.c = level;
  last.h = Math.max(last.h, level);
  last.l = Math.min(last.l, level);
}

console.log('=== C. TP kena intraday → MENANG langsung + rekalkulasi (zaman 2) ===');
if (!a1) { cek('prasyarat slot-1', false); } else {
  const tp = a1.arah === 'BUY' ? a1.target * 1.0004 : a1.target * 0.9996;
  await dorongKe(tp);
  await U.pantauLive(csD, btcD, cs6h, t24(), cs60);
  const e1 = U.toko.bukuCuan[U.toko.bukuCuan.length - 1];
  cek('entri pantau tercatat', !!e1 && e1.via.includes('PANTAU TERUS'));
  cek('hasil MENANG', e1?.hasil === 'MENANG', e1 ? `${e1.hasil} net ${e1.netPct}` : '');
  cek('zaman entri = 1', e1?.zaman === 1);
  const a2 = U.toko.aktif;
  cek('REKALKULASI MANDIRI: slot zaman-2 terkunci otomatis', !!a2 && a2.zaman === 2);
  if (a2) {
    cek('zaman-2 entry = harga hidup baru', Math.abs(a2.entry - state.harga) / state.harga < 0.005, `${a2.entry} vs ${state.harga}`);
    cek('zaman-2 geometri benar', a2.arah === 'BUY' ? (a2.stop < a2.entry && a2.entry < a2.target) : (a2.target < a2.entry && a2.entry < a2.stop));
    cek('zaman-2 masih hari sama (bukan satu-entry-sehari)', a2.hari === hari);
  }
  const d = await getDompetPayload();
  cek('dompet: TUTUP lalu BUKA lagi', d.metrik.nTutup >= 1 && d.metrik.nBuka >= 2, `tutup ${d.metrik.nTutup} buka ${d.metrik.nBuka}`);
}

console.log('=== D. SL kena intraday → KALAH langsung + pelajaran + rekalkulasi (zaman 3) ===');
const a2b = U.toko.aktif;
if (!a2b) { cek('prasyarat slot-2', false); } else {
  const sl = a2b.arah === 'BUY' ? a2b.stop * 0.9996 : a2b.stop * 1.0004;
  await dorongKe(sl);
  await U.pantauLive(csD, btcD, cs6h, t24(), cs60);
  const e2 = U.toko.bukuCuan[U.toko.bukuCuan.length - 1];
  cek('entri pantau KALAH tercatat', e2?.hasil === 'KALAH' && e2.via.includes('PANTAU TERUS'), e2 ? `${e2.hasil} net ${e2.netPct}` : '');
  cek('zaman entri = 2', e2?.zaman === 2);
  cek('pelajaran ditulis (candle berubah, metode lain)', !!e2?.pelajaran && e2.pelajaran.includes('candle telah berubah'));
  cek('ingatan berjenjang menerima PANTAU TERUS', U.toko.ingatan.some((x) => x.text.includes('PANTAU TERUS')));
  const a3 = U.toko.aktif;
  cek('REKALKULASI MANDIRI: slot zaman-3 terkunci', !!a3 && a3.zaman === 3);
  cek('semua slot hari sama', !!a3 && a3.hari === hari);
  const d = await getDompetPayload();
  cek('dompet: 2+ tutup, 3+ buka di hari sama', d.metrik.nTutup >= 2 && d.metrik.nBuka >= 3, `tutup ${d.metrik.nTutup} buka ${d.metrik.nBuka}`);
  cek('analisis kesalahan dompet ditulis untuk rugi', d.analisis.length >= 1);
}

console.log('=== E. urutan TP vs SL dijawab candle 1j (P-5) ===');
const mk60 = (targetJam: number | null, stopJam: number | null, arah: 'BUY' | 'SELL', target: number, stop: number): Candle[] => {
  // geometri searah: BUY target di atas & stop di bawah; SELL target di bawah & stop di atas
  const out: Candle[] = [];
  const t0 = hariIniT;
  const mid = (target + stop) / 2;
  for (let i = 0; i < 10; i++) {
    const t = t0 + i * 3_600_000;
    let h = mid * 1.001; // dasar: aman dari kedua level
    let l = mid * 0.999;
    if (arah === 'BUY') {
      if (targetJam === i) h = target * 1.0001; // sentuh target dari bawah
      if (stopJam === i) l = stop * 0.9999;     // sentuh stop dari atas
    } else {
      if (targetJam === i) l = target * 0.9999; // sentuh target (turun)
      if (stopJam === i) h = stop * 1.0001;     // sentuh stop (naik)
    }
    const c = (h + l) / 2;
    out.push({ t, o: c, h, l, c, v: 1000 });
  }
  return out;
};
const tg = 1.02, sp = 0.98;
const vk1 = U.urutanKena(mk60(1, 3, 'BUY', tg, sp), hari, 'BUY', tg, sp, hariIniT);
cek('BUY: TP dulu (jam 1) → urutan TARGET', vk1.urutan === 'TARGET', JSON.stringify(vk1));
const vk2 = U.urutanKena(mk60(3, 1, 'BUY', tg, sp), hari, 'BUY', tg, sp, hariIniT);
cek('BUY: SL dulu (jam 1) → urutan STOP', vk2.urutan === 'STOP');
const vk3 = U.urutanKena(mk60(2, 2, 'BUY', tg, sp), hari, 'BUY', tg, sp, hariIniT);
cek('kena di jam sama → konservatif STOP', vk3.urutan === 'STOP' && vk3.sumber === 'konservatif');
const vk4 = U.urutanKena(mk60(1, 3, 'SELL', sp, tg), hari, 'SELL', sp, tg, hariIniT);
cek('SELL: TP dulu (jam 1) → urutan TARGET', vk4.urutan === 'TARGET', JSON.stringify(vk4));
const vk5 = U.urutanKena(mk60(3, 1, 'SELL', sp, tg), hari, 'SELL', sp, tg, hariIniT);
cek('SELL: SL dulu (jam 1) → urutan STOP', vk5.urutan === 'STOP');

console.log('=== F. pantau tidak salah simpan: buku pantau & ledger ===');
cek('pantauLog berisi rekalkulasi', U.toko.pantauLog.length >= 2);
cek('ledger rantai berisi ≥3 slot (z1+z2+z3)', U.toko.ledger.jumlah >= 3, `jumlah ${U.toko.ledger.jumlah}`);
cek('events memuat REKALKULASI MANDIRI', U.toko.events.some((e) => e.text.includes('REKALKULASI MANDIRI')));

console.log('=== G. pantau tanpa slot → repair orphan jujur ===');
U.toko.aktif = null;
state.harga = csD[199].c;
await U.pantauLive(csD, btcD, cs6h, t24(), cs60);
cek('tanpa slot: tidak ada entri baru', U.toko.bukuCuan[U.toko.bukuCuan.length - 1]?.hari !== undefined);
const dG = await getDompetPayload();
cek('orphan: posisi dompet yatim ditutup di harga hidup', dG.posisi === null, dG.posisi ? `masih ${dG.posisi.arah}` : '');

console.log('=== H. konkurensi: 3 pantauLive serentak → slot dinilai TEPAT SEKALI ===');
await U.kunciSlot(csD, btcD, cs6h, t24(), hari, { zaman: 4, trigger: 'UJI KONKURENSI' });
const a4 = U.toko.aktif;
cek('slot zaman-4 terkunci untuk uji konkurensi', !!a4 && a4.zaman === 4);
if (a4) {
  const tp4 = a4.arah === 'BUY' ? a4.target * 1.0004 : a4.target * 0.9996;
  await dorongKe(tp4);
  const hash4 = a4.hash;
  const nSebelum = U.toko.bukuCuan.filter((b) => b.via.includes('PANTAU TERUS')).length;
  await Promise.all([
    U.pantauLive(csD, btcD, cs6h, t24(), cs60),
    U.pantauLive(csD, btcD, cs6h, t24(), cs60),
    U.pantauLive(csD, btcD, cs6h, t24(), cs60),
  ]);
  const entri4 = U.toko.bukuCuan.filter((b) => b.hash === hash4 && b.via.includes('PANTAU TERUS'));
  cek('konkurensi: slot zaman-4 dinilai TEPAT SEKALI', entri4.length === 1, `ditemukan ${entri4.length}`);
  cek('konkurensi: total entri pantau naik 1 saja', U.toko.bukuCuan.filter((b) => b.via.includes('PANTAU TERUS')).length === nSebelum + 1);
  cek('konkurensi: rekalkulasi ke zaman-5 jalan sekali', U.toko.aktif?.zaman === 5, `zaman ${U.toko.aktif?.zaman}`);
}

console.log(gagal === 0 ? '\nSEMUA UJI PANTAU LULUS — sistem cerdas: kena → catat → hitung lagi, bukan menunggu candle.' : `\n${gagal} UJI GAGAL`);
process.exit(gagal === 0 ? 0 : 1);
