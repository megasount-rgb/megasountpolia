// ============================================================
// MICAPROFITA-ELSA · JANTUNG DOMPET — modal $1000 jadi otak yang
// HIDUP, bukan tab yang seakan terhenti.
// (keluhan pemilik 2026-11-26): "tab modal 1000$ seakan terhenti tak
//  melakukan aktivitas… kalau modal didiamkan justru kita tak akan
//  pernah tau dimana kecacatan/kesalahan kita. Kalau banyak
//  wait/tunggu justru itu adalah kanker — sebab pasar hanya dua
//  pedang: bunuh atau dibunuh."
// Diagnosa jujur: dompet.ts adalah MESIN AKUNTANSI hebat tapi ia
// hanya bergerak KETIKARENCANA arena terkunci/diadili (siklus arena,
// bila payload dibangun). Di antara siklus itu modal BISU: tidak ada
// pengawalan TP/SL miliknya sendiri, tidak ada keputusan, tidak ada
// jurnal — maka terlihat "terhenti".
// JANTUNG DOMPET memperbaikinya dengan EMPAT organ nyata:
//   1) PENGAWAL LANGSUNG — tiap 60 detik TP/SL posisi diadili
//      langsung dari buku pesanan (bid/ask terbaik), dieksekusi
//      dompetTutup saat tersentuh: sentuhan tidak bisa lolos di
//      antara dua siklus arena lagi.
//   2) ADOPSI SECEPAT KILAT — rencana arena hari ini yang belum
//      dieksekusi dompet langsung diadopsi pada denyut berikutnya,
//      tanpa menunggu ada yang membuka halaman.
//   3) HUKUM DUA PEDANG — dompet kosong + TIDAK ada rencana arena
//      aktif hari ini → jantung MENGAMBIL PEDANG sendiri dari
//      keyakinan modal-jiwa terkuat (K ≥ 0,50, asal VONIS): target/
//      stop dari σ24j candle 1j nyata, all-in, dicatat penuh.
//      Rekam jejak dompet sendiri (neuron) mendiskon arah yang
//      sering salah — otak modal pakai pengalamannya.
//   4) NEURON + JURNAL — tiap tutup (menang/rugi) ditambang jadi
//      pelajaran (rezim × arah × sumber); tiap denyut ditulis di
//      jurnal: harga, uPnl, jarak TP/SL, keputusan + alasannya.
//      Tidak ada satu pun denyut yang tak terlihat — modal yang
//      beraktivitas adalah satu-satunya cara menemukan kecacatan.
// V2 — HUKUM MAIN TERUS (keluhan pemilik 2026-11-26): "harusnya ini
//      di dalam situasi apapun sebisa mungkin harus bisa terus bermain
//      bahkan jikalau dana habispun tak masalah, karena masih bisa
//      suntik dana lagi — kalau takut pasar, keuangan ini mati, kaya
//      mayat!!"
//      • PEDANG MANDIRI: kalau modal-jiwa tak menawarkan pedang, jantung
//        MEMANDU sendiri dari pembacaan langsung ELSA (momentum candle 1j,
//        radar ignisi, magnet lintasan, bus persilangan) dengan formula K
//        terbuka — "tak ada pedang" bukan lagi alasan diam default.
//      • CAP naik 6→12 keputusan/hari + BYPASS K≥0.62: keyakinan tinggi
//        TETAP boleh bermain melewati cap (dengan catatan jujur).
//      • Jeda anti-churn dipangkas: rugi 20→10 mnt, menang 5→3 mnt —
//        wait adalah kanker, tapi fee tetap dihitung jujur.
// ============================================================
import fs from 'fs';
import crypto from 'crypto';
import { SIMBOL, getCandles } from './bybit';
import { catatOtonomi } from './otonomi';
import { pedangTerlarang, posisiMelawanIgnisi, bacaIgnisi } from './ignisi';
import { modulasiPedangDariBus } from './persilangan';
import {
  dompetBuka, dompetTutup,
  dompetAdopsiAktif, dompetBacaToko, dompetHargaKeluar,
  dompetTarikStop, dompetPerpanjangTarget,
  type DompetPosisi, type EntriBuku,
} from './dompet';

const DIR_JT = '/home/z/my-project/db/elsa/dompet-jantung';
const FILE_DENYUT = `${DIR_JT}/denyut.json`;
const FILE_JURNAL = `${DIR_JT}/jurnal.json`;
const FILE_KEPUTUSAN = `${DIR_JT}/keputusan.json`;
const FILE_NEURON = `${DIR_JT}/neuron.json`;
const JEDA_DTIK = 60;
const CAP_JURNAL = 900;
const CAP_KEPUTUSAN = 60;
const CAP_PELAJARAN = 60;
const AMBANG_K = 0.5;
const BYPASS_K = 0.62; // cap tercapai tapi K ≥ ini → tetap boleh main (main terus, bukan mayat)
const JEDA_SESUDAH_RUGI_MS = 10 * 60_000;
const JEDA_SESUDAH_MENANG_MS = 3 * 60_000;
const MAKS_KEPUTUSAN_HARIAN = 12;
const TUNGGU_ULANG_MS = 15 * 60_000;

// ---------------- tipe ----------------
export type AksiJantung = 'JAGA' | 'TUTUP' | 'ADOPSI' | 'BUKA' | 'TUNGGU' | 'IDLE' | 'BERJAGA-JAGA';
export type JurnalEntri = { at: string; aksi: AksiJantung; teks: string; harga?: number; uPnl?: number | null };
export type KeputusanJantung = {
  at: string; id: string; arah: 'BUY' | 'SELL'; sinyal: string; K: number;
  KSebelumNeuron: number; targetPct: number; stopPct: number;
  status: 'TERBUKA' | 'MENANG' | 'KALAH' | 'BATAL' | 'MELEWAT';
  pnl?: number | null; netPct?: number | null; refHash: string;
};
export type PelajaranDompet = {
  at: string; arah: string; sumber: 'ARENA' | 'JANTUNG'; rezim: string; keyakinan: number | null;
  pnl: number | null; netPct: number | null; via: string; pelajaran: string;
};
export type AgregatSisi = { n: number; win: number; sumNet: number };
export type NeuronDompet = {
  perSumber: Record<string, AgregatSisi>;
  perArah: Record<string, AgregatSisi>;
  perRezim: Record<string, AgregatSisi>;
  pelajaran: PelajaranDompet[];
  feeTotal: number; nTutup: number; winRate: number | null;
};
export type DompetJantungData = {
  at: string; status: 'AKTIF' | 'BERLAGA';
  detakKe: number; jedaDetik: number;
  atTerakhir: string | null; atBerikutnya: string | null;
  aksiTerakhir: AksiJantung | '—'; aksiTeks: string;
  jaga: { aktif: boolean; arah?: string; uPnl: number | null; uPnlPct: number | null; jarakTargetPct: number | null; jarakStopPct: number | null } | null;
  jurnal: JurnalEntri[];
  keputusan: KeputusanJantung[];
  neuron: NeuronDompet | null;
  hukum: string[];
};

type JantungState = {
  v: 1;
  detakKe: number; atTerakhir: string | null; status: 'AKTIF' | 'BERLAGA';
  aksiTerakhir: AksiJantung | '—'; aksiTeks: string;
  lastBukuTutupId: number;
  sigma24jPct: number | null; atSigma: number | null;
  tungguTerakhir: { teks: string; at: string } | null;
  jagaTanda: string | null;
  atKeputusanTerakhir: string | null;
};

// ---------------- persistensi ----------------
function bacaJson<T>(fp: string, def: T): T {
  try {
    fs.mkdirSync(DIR_JT, { recursive: true });
    if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { /* file rusak — mulai dari def, jujur */ }
  return def;
}
function tulisJson(fp: string, v: unknown): void {
  try {
    fs.mkdirSync(DIR_JT, { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(v));
  } catch { /* gagal simpan — jantung tetap berdenyut di memori */ }
}
function bacaState(): JantungState {
  return bacaJson<JantungState>(FILE_DENYUT, {
    v: 1, detakKe: 0, atTerakhir: null, status: 'AKTIF',
    aksiTerakhir: '—', aksiTeks: 'jantung dompet baru menyala — denyut pertama menyusul dalam ≤60 detik',
    lastBukuTutupId: 0, sigma24jPct: null, atSigma: null,
    tungguTerakhir: null, jagaTanda: null, atKeputusanTerakhir: null,
  });
}

// ---------------- jurnal (dedupe TUNGGU supaya tidak spam) ----------------
function jurnal(st: JantungState, aksi: AksiJantung, teks: string, harga?: number, uPnl?: number | null): void {
  const j = bacaJson<JurnalEntri[]>(FILE_JURNAL, []);
  const dobelTunggu = aksi === 'TUNGGU'
    && st.tungguTerakhir !== null
    && st.tungguTerakhir.teks === teks
    && Date.now() - Date.parse(st.tungguTerakhir.at) < TUNGGU_ULANG_MS;
  if (dobelTunggu) return; // alasan sama <15 menit — jangan membanjiri jurnal
  if (aksi === 'TUNGGU') st.tungguTerakhir = { teks, at: new Date().toISOString() };
  j.unshift({ at: new Date().toISOString(), aksi, teks, harga: harga ? Math.round(harga * 1e7) / 1e7 : undefined, uPnl: uPnl ?? undefined });
  tulisJson(FILE_JURNAL, j.slice(0, CAP_JURNAL));
}

// ---------------- σ24j dari candle 1j nyata (cache 30 menit) ----------------
async function sigma24j(st: JantungState): Promise<number> {
  if (st.sigma24jPct && st.atSigma && Date.now() - st.atSigma < 30 * 60_000) return st.sigma24jPct;
  let sigma: number | null = null;
  try {
    const cs = await getCandles(SIMBOL, '60', 96);
    const rets: number[] = [];
    for (let i = cs.length - 25; i < cs.length; i++) {
      if (i < 1) continue;
      rets.push((cs[i].c - cs[i - 1].c) / cs[i - 1].c * 100);
    }
    if (rets.length >= 12) {
      const mean = rets.reduce((s, r) => s + r, 0) / rets.length;
      const varr = rets.reduce((s, r) => s + (r - mean) * (r - mean), 0) / rets.length;
      const sigma1h = Math.sqrt(varr);
      sigma = sigma1h * Math.sqrt(24); // skala ke horizon 24 jam
    }
  } catch { /* candle gagal — pakai cache lama / default */ }
  const hasil = sigma && Number.isFinite(sigma) && sigma > 0 ? sigma : (st.sigma24jPct ?? 2.2);
  st.sigma24jPct = hasil;
  st.atSigma = Date.now();
  return hasil;
}

// ---------------- arena aktif? (baca toko.json, tanpa menulis) ----------------
function bacaAktifArena(): { hari: string; arah: string; nomor: number } | null {
  try {
    const j = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/toko.json', 'utf8')) as {
      aktif: { hari: string; arah: string; kunci: { nomor: number } } | null;
    };
    return j.aktif ? { hari: j.aktif.hari, arah: j.aktif.arah, nomor: j.aktif.kunci?.nomor ?? 0 } : null;
  } catch { return null; }
}

// ---------------- ORGAN 4 — panen pelajaran dari TUTUP baru ----------------
function panenPelajaran(state: JantungState, buku: EntriBuku[]): PelajaranDompet[] {
  const neuron = bacaJson<NeuronDompet>(FILE_NEURON, {
    perSumber: {}, perArah: {}, perRezim: {}, pelajaran: [], feeTotal: 0, nTutup: 0, winRate: null,
  });
  const tutupBaru = buku.filter((b) => b.jenis === 'TUTUP' && b.id > state.lastBukuTutupId);
  const hasil: PelajaranDompet[] = [];
  const keputusan = bacaJson<KeputusanJantung[]>(FILE_KEPUTUSAN, []);
  for (const t of tutupBaru) {
    const buka = buku.find((b) => b.jenis === 'BUKA' && b.ref && t.ref && b.ref.split(' ')[1] === t.ref?.split(' ')[1]);
    const sumber: 'ARENA' | 'JANTUNG' = buka && /JANTUNG DOMPET/.test(buka.alasan) ? 'JANTUNG' : 'ARENA';
    const m = buka ? buka.alasan.match(/keyakinan (\d+)% rezim ([A-Z\-]+)/) : null;
    const keyakinan = m ? Number(m[1]) : null;
    const rezim = m ? m[2] : 'TAK TERBACA';
    const arah = t.arah ?? '—';
    const via = t.alasan.split('—')[1]?.trim().slice(0, 80) ?? t.alasan.slice(0, 80);
    const insight = (() => {
      if ((t.pnl ?? 0) < 0) {
        const biaya = (t.fee ?? 0) + Math.abs((t.slippagePct ?? 0)) / 100 * (t.notional ?? 0);
        return `pelajaran: masuk ${arah} di rezim ${rezim} dengan keyakinan ${keyakinan ?? '—'}% kalah ${t.netPct?.toFixed(2)}% — biaya eksekusi (fee+slip ≈ $${biaya.toFixed(2)}) ikut dihitung; arah/rezim ini didiskon neuron pada keputusan serupa berikutnya`;
      }
      return `pelajaran: masuk ${arah} di rezim ${rezim} menang ${t.netPct?.toFixed(2)}% — eksekusi hidup membayar ${t.slippagePct !== null && t.slippagePct !== undefined ? `slip ${t.slippagePct}%` : 'slip terukur'} + fee $${(t.fee ?? 0).toFixed(2)}; rekam jejak sisi ini didorong neuron`;
    })();
    const p: PelajaranDompet = {
      at: t.at, arah, sumber, rezim, keyakinan,
      pnl: t.pnl ?? null, netPct: t.netPct ?? null, via, pelajaran: insight,
    };
    hasil.push(p);
    // agregat
    const isi = (mp: Record<string, AgregatSisi>, k: string, net: number) => {
      mp[k] = mp[k] ?? { n: 0, win: 0, sumNet: 0 };
      mp[k].n += 1;
      if (net > 0) mp[k].win += 1;
      mp[k].sumNet = Math.round((mp[k].sumNet + net) * 100) / 100;
    };
    isi(neuron.perSumber, sumber, t.netPct ?? 0);
    isi(neuron.perArah, arah, t.netPct ?? 0);
    isi(neuron.perRezim, rezim, t.netPct ?? 0);
    neuron.feeTotal = Math.round((neuron.feeTotal + (t.fee ?? 0)) * 100) / 100;
    neuron.nTutup += 1;
    // tutup keputusan jantung yang cocok
    const hash12 = t.ref?.split(' ')[1];
    if (hash12) {
      const kp = keputusan.find((k) => k.refHash.includes(hash12) && k.status === 'TERBUKA');
      if (kp) {
        kp.status = /MENANG/.test(t.alasan) ? 'MENANG' : /KALAH/.test(t.alasan) ? 'KALAH' : /BATAL/.test(t.alasan) ? 'BATAL' : 'MELEWAT';
        kp.pnl = t.pnl ?? null;
        kp.netPct = t.netPct ?? null;
      }
    }
  }
  if (tutupBaru.length) {
    state.lastBukuTutupId = Math.max(...tutupBaru.map((t) => t.id));
    const totalWin = Object.values(neuron.perArah).reduce((s, a) => s + a.win, 0);
    neuron.winRate = neuron.nTutup > 0 ? Math.round((totalWin / neuron.nTutup) * 100) / 100 : null;
    tulisJson(FILE_NEURON, neuron);
    tulisJson(FILE_KEPUTUSAN, keputusan.slice(0, CAP_KEPUTUSAN));
  }
  return hasil;
}

// ---------------- diskon neuron: rekam jejak dompet mengubah K ----------------
function diskonNeuron(neuron: NeuronDompet | null, arahArah: 'BUY' | 'SELL', K: number): { K: number; teks: string } {
  if (!neuron) return { K, teks: 'neuron dompet masih kosong — keyakinan berdiri apa adanya (perjalanan baru dimulai)' };
  const arah = arahArah === 'BUY' ? 'LONG' : 'SHORT';
  const a = neuron.perArah[arah];
  if (!a || a.n < 3) return { K, teks: `rekam jejak ${arah}: ${a?.n ?? 0} sampel (<3) — modulasi menyala di sampel ke-3; keyakinan utuh` };
  const winrate = a.win / a.n;
  if (winrate <= 0.34) {
    const baru = Math.max(0.3, K - 0.08);
    return { K: baru, teks: `neuron dompet MENOLONG: ${arah} ${a.n} kali cuma ${Math.round(winrate * 100)}% menang (net ${a.sumNet}%) — keyakinan didiskon 8 poin (${K.toFixed(2)} → ${baru.toFixed(2)})` };
  }
  if (winrate >= 0.66) {
    const baru = Math.min(0.92, K + 0.05);
    return { K: baru, teks: `neuron dompet MENDORONG: ${arah} ${a.n} kali ${Math.round(winrate * 100)}% menang (net ${a.sumNet}%) — keyakinan didorong 5 poin (${K.toFixed(2)} → ${baru.toFixed(2)})` };
  }
  return { K, teks: `rekam jejak ${arah}: ${a.n} sampel ${Math.round(winrate * 100)}% menang — seimbang, keyakinan utuh` };
}

// ---------------- sinyal: keyakinan modal-jiwa terkuat ----------------
// HUKUM DUA PEDANG — sinyal dua lapis:
//   lapis 1: keyakinan VONIS (komitmen pedang modal-jiwa) K ≥ 0,50
//   lapis 2: keyakinan PORTAL (magnet likuidasi) K ≥ 0,55 dan magnet ≤ 4,5%
//            dari harga — magnet yang dekat = pedang paling segera; jarak
//            < 1% gugur (R terlalu tipis, fee makan), dilarang ngejar magnet jauh
export type SinyalJantung = {
  id: string; jenis: string; arah: 'NAIK' | 'TURUN'; K: number;
  asal: 'VONIS' | 'PORTAL'; dasar: string;
  targetMagnet?: number; // utk asal PORTAL — harga magnet
};
function sinyalTerkuat(harga: number): SinyalJantung | null {
  try {
    const j = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/modal-jiwa/neuron.json', 'utf8')) as {
      terbuka: { id: string; jenis: string; arah: string; asal: string; keyakinan: number; dasar: string; hargaTarget?: number }[];
    };
    const layar = (j.terbuka ?? []).filter((b) => b.arah === 'NAIK' || b.arah === 'TURUN');
    const vonis = layar.filter((b) => b.asal === 'VONIS' && b.keyakinan >= 0.5)
      .sort((a, b) => b.keyakinan - a.keyakinan)[0];
    if (vonis) return { id: vonis.id, jenis: vonis.jenis, arah: vonis.arah as 'NAIK' | 'TURUN', K: vonis.keyakinan, asal: 'VONIS', dasar: vonis.dasar };
    // portal: magnet yang DEKAT dan kuat — pilih jarak terdekat (paling segera)
    const portal = layar
      .filter((b) => b.asal === 'PORTAL' && b.keyakinan >= 0.55 && b.hargaTarget && b.hargaTarget > 0)
      .map((b) => ({ b, dist: Math.abs(b.hargaTarget! - harga) / harga * 100 }))
      .filter((x) => x.dist >= 1.0 && x.dist <= 4.5)
      .sort((a, b2) => a.dist - b2.dist)[0];
    if (portal) return { id: portal.b.id, jenis: portal.b.jenis, arah: portal.b.arah as 'NAIK' | 'TURUN', K: portal.b.keyakinan, asal: 'PORTAL', dasar: portal.b.dasar, targetMagnet: portal.b.hargaTarget };
    return null;
  } catch { return null; }
}

// ---------------- PEDANG MANDIRI (HUKUM MAIN TERUS) ----------------
// Modal-jiwa kosong BUKAN alasan diam lagi (keluhan pemilik: "wait adalah
// kanker… kalau takut pasar keuangan ini mati kaya mayat"). Jantung memandu
// pedang sendiri dari pembacaan LANGSUNG ELSA, formula K terbuka dan
// terbukti salah:
//   K = 0.50
//     + momentum 6j searah        (0..0.10)  — candle 1j nyata Bybit
//     + posisi vs SMA12 searah    (0..0.06)
//     + radar ignisi searah       (0..0.14)  — MENYALA/PARABOLIK penuh, MERANGKAK separuh
//     + magnet lintasan searah    (0..0.08)  — tarikan terdekat menuju arah
//     + bus persilangan           (−0.15..+0.08) — kiriman paus/kasus/lintasan
// Syarat: ≥3 suara searah (momentum, SMA, ignisi, magnet) — pedang hanya
// diangkat bila MAYORITAS mata sepakat; 2-2 dan setengah hati = gugur.
// ID 'SELF-n' — dicatat jujur sebagai keputusan mandiri jantung.
async function sinyalMandiri(harga: number): Promise<SinyalJantung | null> {
  try {
    const cs = await getCandles(SIMBOL, '60', 96);
    if (cs.length < 20) return null;
    const ter = cs[cs.length - 1];
    const mom6 = ((ter.c - cs[cs.length - 7].c) / cs[cs.length - 7].c) * 100;
    const win12 = cs.slice(-12);
    const sma12 = win12.reduce((s, c) => s + c.c, 0) / win12.length;
    const diAtasSma = ter.c > sma12;
    const ign = bacaIgnisi();
    const wIg = (() => {
      if (!ign || ign.negara === 'TENANG') return { arah: null as string | null, w: 0 };
      const penuh = ign.negara === 'MENYALA' || ign.negara === 'PARABOLIK';
      return { arah: ign.arah, w: penuh ? 0.14 : 0.07 };
    })();
    // magnet lintasan terdekat yang masih hidup
    let magnet: { arah: 'NAIK' | 'TURUN'; w: number; teks: string } | null = null;
    try {
      const lin = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/lintasan/neuron.json', 'utf8')) as {
        terbuka?: { pola?: string; arahPertama?: string; m1?: { harga?: number; tarikan?: number }; keyakinan?: number }[];
      };
      const t0 = (lin.terbuka ?? [])[0];
      const mh = t0?.m1?.harga;
      if (t0 && mh && (t0.arahPertama === 'NAIK' || t0.arahPertama === 'TURUN')) {
        const jarak = Math.abs(mh - harga) / harga * 100;
        if (jarak <= 6.5) {
          magnet = {
            arah: t0.arahPertama as 'NAIK' | 'TURUN',
            w: Math.min(0.08, 0.03 + (t0.keyakinan ?? 0.5) * 0.06),
            teks: `magnet ${t0.pola ?? '—'} ${mh.toPrecision(6)} (jarak ${jarak.toFixed(2)}%)`,
          };
        }
      }
    } catch { /* lintasan belum terbaca — suara magnet hilang, jujur */ }
    // suara mayoritas
    const suara: { nama: string; arah: 'NAIK' | 'TURUN' | null }[] = [
      { nama: `mom6j ${mom6 >= 0 ? '+' : ''}${mom6.toFixed(2)}%`, arah: mom6 > 0.15 ? 'NAIK' : mom6 < -0.15 ? 'TURUN' : null },
      { nama: `SMA12 ${diAtasSma ? 'di atas' : 'di bawah'}`, arah: diAtasSma ? 'NAIK' : 'TURUN' },
      { nama: wIg.arah ? `ignisi ${ign?.negara} ${wIg.arah}` : 'ignisi TENANG', arah: (wIg.arah as 'NAIK' | 'TURUN' | null) },
      { nama: magnet ? `magnet ${magnet.arah}` : 'magnet jauh', arah: magnet?.arah ?? null },
    ];
    const nNaik = suara.filter((x) => x.arah === 'NAIK').length;
    const nTurun = suara.filter((x) => x.arah === 'TURUN').length;
    const arah: 'NAIK' | 'TURUN' | null = nNaik >= 3 ? 'NAIK' : nTurun >= 3 ? 'TURUN' : null;
    if (!arah) return null;
    let K = 0.5;
    const rincian: string[] = [];
    const searah = (a: 'NAIK' | 'TURUN' | null) => a === arah;
    if (searah(mom6 > 0.15 ? 'NAIK' : mom6 < -0.15 ? 'TURUN' : null)) { const w = Math.min(0.10, Math.abs(mom6) / 3); K += w; rincian.push(`momentum +${w.toFixed(2)}`); }
    if (searah(diAtasSma ? 'NAIK' : 'TURUN')) { K += 0.06; rincian.push('SMA +0.06'); }
    if (searah(wIg.arah as 'NAIK' | 'TURUN' | null) && wIg.w > 0) { K += wIg.w; rincian.push(`ignisi +${wIg.w.toFixed(2)}`); }
    if (magnet && searah(magnet.arah)) { K += magnet.w; rincian.push(`${magnet.teks} +${magnet.w.toFixed(2)}`); }
    // (modulasi bus persilangan dihitung SEKALI di jalur umum denyutInti —
    //  pedang mandiri tidak boleh memakainya dua kali)
    K = Math.max(0.2, Math.min(0.9, K));
    const suaraTeks = suara.map((x) => `${x.nama}${x.arah ? '→' + x.arah : ''}`).join(' · ');
    return {
      id: `SELF-${arah === 'NAIK' ? 'L' : 'S'}${Date.now().toString(36).slice(-4).toUpperCase()}`,
      jenis: 'PEDANG-MANDIRI',
      arah,
      K: Math.round(K * 1000) / 1000,
      asal: 'VONIS',
      dasar: `pedang mandiri jantung (suara ${arah === 'NAIK' ? nNaik : nTurun}/4 searah): ${suaraTeks} — K=0.50+${rincian.join('+') || 'tanpa tambahan'}=${K.toFixed(2)}`,
    };
  } catch { return null; }
}

// ---------------- satu denyut penuh ----------------
let berdenyut = false;
async function denyutInti(): Promise<{ aksi: AksiJantung; teks: string; harga?: number } | null> {
  if (berdenyut) return null;
  berdenyut = true;
  const st = bacaState();
  st.status = 'BERLAGA';
  tulisJson(FILE_DENYUT, st);
  try {
    const tk = dompetBacaToko();
    const hargaKel = tk.posisi ? await dompetHargaKeluar(tk.posisi.venue) : await dompetHargaKeluar('spot');
    const harga = hargaKel ? (hargaKel.bid + hargaKel.ask) / 2 : null;

    // ---- ORGAN 4: panen pelajaran tiap denyut (meski tak ada peristiwa) ----
    try { panenPelajaran(st, tk.buku); } catch { /* tambang berikutnya */ }

    // ---- ORGAN 1: PENGAWAL LANGSUNG TP/SL (posisi hidup) ----
    if (tk.posisi) {
      if (!hargaKel) {
        const teks = 'JAGA (data tertunda): harga/orderbook gagal terbaca denyut ini — pengawal menunggu data hidup; posisi tetap diadili denyut berikutnya, dilarang jatuh ke pencarian sinyal saat masih memegang posisi';
        st.aksiTerakhir = 'JAGA'; st.aksiTeks = teks;
        jurnal(st, 'JAGA', teks, undefined, null);
        return { aksi: 'JAGA', teks };
      }
      const p = tk.posisi;
      const keluar = p.arah === 'LONG' ? hargaKel.bid : hargaKel.ask;
      const uPnl = p.arah === 'LONG' ? (keluar - p.entryVwap) * p.qty : (p.entryVwap - keluar) * p.qty;
      const uPnlPct = (uPnl / p.notionalAwal) * 100;
      const kenaTarget = p.arah === 'LONG' ? keluar >= p.target : keluar <= p.target;
      const kenaStop = p.arah === 'LONG' ? keluar <= p.stop : keluar >= p.stop;
      if (kenaTarget || kenaStop) {
        const hasilLabel = kenaTarget ? 'MENANG' : 'KALAH';
        const teks = `${kenaTarget ? 'TP' : 'SL'} kena LANGSUNG (${p.arah}, keluar buku ${keluar.toPrecision(6)}) — diadili jantung dompet dalam ≤${JEDA_DTIK} detik tanpa menunggu siklus arena`;
        await dompetTutup({
          hari: p.hari, arahArena: p.arah === 'LONG' ? 'BUY' : 'SELL',
          hasilLabel,
          via: `JANTUNG DOMPET — ${teks}`,
          keluarRef: keluar, segar: true, dariJantung: true,
        });
        st.aksiTerakhir = 'TUTUP'; st.aksiTeks = teks;
        st.jagaTanda = null;
        jurnal(st, 'TUTUP', `${teks} — posisi ditutup di buku pesanan nyata; pelajaran ditambang di denyut ini`, keluar, uPnl);
        catatOtonomi({
          mesin: 'DOMPET', pemicu: 'JANTUNG-DOMPET', mandiri: true,
          hasil: `TP/SL ${hasilLabel} dieksekusi dompet ${p.arah} @${keluar.toPrecision(6)} (pengawal 60 detik)`,
          bukti: `target ${p.target.toPrecision(6)} / stop ${p.stop.toPrecision(6)} · keluar buku ${p.venue}`,
        });
        return { aksi: 'TUTUP', teks, harga: keluar };
      }
      // belum tersentuh — HUKUM IGNISI (luka 2026-11-26 03:00):
      // 1) posisi MELAWAN radar menyala → stop ditarik mendekat SEKARANG;
      // 2) posisi SEARAH ledakan → target MENJALAR (trailing), TP σ kecepetan
      //    tak membuang gelombang lagi; keduanya dari harga hidup buku pesanan.
      const ign = bacaIgnisi();
      let teksIgnisi = '';
      if (ign && ign.negara !== 'TENANG') {
        const mw = posisiMelawanIgnisi(p.arah);
        const palingTegas = mw.melawan && (ign.negara === 'MENYALA' || ign.negara === 'PARABOLIK');
        if (palingTegas) {
          const stopBaru = p.arah === 'SHORT' ? Math.min(p.stop, keluar * 1.009) : Math.max(p.stop, keluar * 0.991);
          if (dompetTarikStop(stopBaru, `RADAR IGNISI ${ign.negara} arah ${ign.arah} (keyakinan ${ign.keyakinan}%) MELAWAN posisi ${p.arah} — luka 03:00: menunggu SL σ jauh = bunuh modal pelan; pengawal 60 dtk kini tarik stop langsung`)) {
            teksIgnisi = `STOP DITARIK ke ${stopBaru.toPrecision(6)} — radar ignisi ${ign.negara} arah ${ign.arah} melawan posisi ${p.arah}`;
            jurnal(st, 'JAGA', teksIgnisi, keluar, uPnl);
            catatOtonomi({
              mesin: 'DOMPET', pemicu: 'HUKUM-IGNISI', mandiri: true,
              hasil: teksIgnisi, bukti: `harga keluar ${keluar.toPrecision(6)} · ${mw.alasan}`,
            });
          }
        } else if (!mw.melawan && (ign.negara === 'MENYALA' || ign.negara === 'PARABOLIK') && ((p.arah === 'LONG' && ign.arah === 'NAIK') || (p.arah === 'SHORT' && ign.arah === 'TURUN'))) {
          // searah ledakan — target menjalar mengikuti kecepatan pasar (pelajaran TP kecepetan 03:00)
          const vel = Math.max(0.04, Math.min(0.12, (ign.metrik.velocityPct || 0.8) * 2.5 / 100));
          const targetBaru = p.arah === 'LONG' ? keluar * (1 + vel) : keluar * (1 - vel);
          if (dompetPerpanjangTarget(targetBaru, `radar ignisi ${ign.negara} arah ${ign.arah} SEARAH posisi — gelombang dipelihara (velocity ${(ign.metrik.velocityPct || 0.8).toFixed(2)}%/mnt → ekstensi ${(vel * 100).toFixed(1)}%), TP σ kecepetan diperbarui mengikuti pasar`)) {
            teksIgnisi = `TARGET MENJALAR ke ${targetBaru.toPrecision(6)} — posisi ${p.arah} searah ignisi ${ign.negara}; profit tidak dibuang di kecepetan lagi`;
            jurnal(st, 'JAGA', teksIgnisi, keluar, uPnl);
            catatOtonomi({
              mesin: 'DOMPET', pemicu: 'HUKUM-IGNISI', mandiri: true,
              hasil: teksIgnisi, bukti: `harga keluar ${keluar.toPrecision(6)} · velocity ${(ign.metrik.velocityPct || 0).toFixed(2)}%/mnt`,
            });
          }
        }
      }
      const jarakT = ((p.target - keluar) / keluar) * 100 * (p.arah === 'SHORT' ? -1 : 1);
      const jarakS = ((p.stop - keluar) / keluar) * 100 * (p.arah === 'SHORT' ? -1 : 1);
      const tanda = `${Math.round(uPnlPct * 2) / 2}`;
      if (st.jagaTanda !== tanda) {
        st.jagaTanda = tanda;
        jurnal(st, 'JAGA', `pengawal aktif: ${p.arah} uPnl ${uPnl >= 0 ? '+' : ''}${uPnl.toFixed(2)} USD (${uPnlPct.toFixed(2)}%) — jarak TP ${jarakT.toFixed(2)}% / SL ${jarakS.toFixed(2)}%; sentuhan diadili ≤${JEDA_DTIK} detik${teksIgnisi ? ` · ${teksIgnisi}` : ''}`, keluar, uPnl);
      }
      st.aksiTerakhir = 'JAGA';
      st.aksiTeks = `JAGA ${p.arah}: uPnl ${uPnl >= 0 ? '+' : ''}${uPnl.toFixed(2)} USD — pengawal TP/SL hidup${teksIgnisi ? ` · ${teksIgnisi}` : ''}`;
      return { aksi: 'JAGA', teks: st.aksiTeks, harga: keluar };
    }

    // ---- ORGAN 2: ADOPSI rencana arena hari ini (anti-dobel tetap dijaga) ----
    const hariKini = new Date().toISOString().slice(0, 10);
    const aktif = bacaAktifArena();
    if (aktif && aktif.hari === hariKini) {
      const saldoSebelum = tk.saldo;
      const bukuSebelum = tk.buku.length;
      await dompetAdopsiAktif();
      const tk2 = dompetBacaToko();
      if (tk2.posisi && tk2.buku.length > bukuSebelum) {
        const teks = `adopsi secepat kilat: rencana arena #${aktif.nomor} ${aktif.arah} dieksekusi dompet dalam ≤${JEDA_DTIK} detik setelah terkunci — dulu menunggu halaman dibuka, kini jantung yang mengeksekusi`;
        st.aksiTerakhir = 'ADOPSI'; st.aksiTeks = teks;
        jurnal(st, 'ADOPSI', teks, harga ?? undefined, null);
        return { aksi: 'ADOPSI', teks, harga: harga ?? undefined };
      }
      if (saldoSebelum < 100 && tk2.saldo >= 1000) {
        // top-up otomatis sudah dicatat dompet.ts — jurnal sekadar menyaksikan
        st.aksiTerakhir = 'IDLE'; st.aksiTeks = 'dompet sempat habis — top-up $1000 tercatat di buku akuntansi';
        return { aksi: 'IDLE', teks: st.aksiTeks, harga: harga ?? undefined };
      }
      st.aksiTerakhir = 'JAGA'; st.aksiTeks = `rencana arena #${aktif.nomor} ${aktif.arah} hidup — dompet siap adopsi/eksekusi ikut siklusnya (anti-dobel: satu dompet satu posisi)`;
      return { aksi: 'JAGA', teks: st.aksiTeks, harga: harga ?? undefined };
    }

    // ---- ORGAN 3: HUKUM DUA PEDANG — dompet kosong, tak ada rencana aktif ----
    const neuron = bacaJson<NeuronDompet | null>(FILE_NEURON, null);
    // anti-churn: cooldown sesudah tutup terakhir (KECUALI tutup "luka mesin"
    // seperti REPAIR ORPHAN — itu bukan keputusan trading, dilarang menghukum
    // jantung atas luka yang bukan miliknya)
    const tutupTerakhir = tk.buku.filter((b) => b.jenis === 'TUTUP')[tk.buku.filter((b) => b.jenis === 'TUTUP').length - 1];
    if (tutupTerakhir && !/REPAIR ORPHAN/.test(tutupTerakhir.alasan)) {
      const umur = Date.now() - Date.parse(tutupTerakhir.at);
      const rugi = (tutupTerakhir.pnl ?? 0) < 0;
      const jeda = rugi ? JEDA_SESUDAH_RUGI_MS : JEDA_SESUDAH_MENANG_MS;
      if (umur < jeda) {
        const teks = `jeda anti-churn ${Math.ceil((jeda - umur) / 60000)} menit sesudah ${rugi ? 'RUGI' : 'MENANG'} ${(tutupTerakhir.pnl ?? 0).toFixed(2)} USD — candle telah berubah; arena/jantung menghitung ulang sebelum masuk lagi`;
        st.aksiTerakhir = 'TUNGGU'; st.aksiTeks = teks;
        jurnal(st, 'TUNGGU', teks, harga ?? undefined, null);
        return { aksi: 'TUNGGU', teks, harga: harga ?? undefined };
      }
    }
    // sinyal dulu — lalu harga, lalu cap: urutan baru HUKUM MAIN TERUS
    if (!harga) {
      const teks = 'harga hidup gagal terbaca — dilarang membuka posisi tanpa buku pesanan nyata; denyut berikutnya mencoba lagi';
      st.aksiTerakhir = 'TUNGGU'; st.aksiTeks = teks;
      jurnal(st, 'TUNGGU', teks, undefined, null);
      return { aksi: 'TUNGGU', teks };
    }
    // sinyal dua pintu: modal-jiwa terkuat DULU; kalau kosong → PEDANG MANDIRI
    // (keluhan pemilik: "harusnya dalam situasi apapun harus bisa terus bermain")
    const sinyalJiwa = sinyalTerkuat(harga);
    const sinyal = sinyalJiwa ?? (await sinyalMandiri(harga));
    const asalPedang = sinyalJiwa ? (sinyalJiwa.asal === 'PORTAL' ? 'magnet portal modal-jiwa' : 'vonis modal-jiwa') : 'PEDANG MANDIRI jantung';
    if (!sinyal) {
      const teks = 'TAK ADA PEDANG BAHKAN DARI PEDANG MANDIRI — suara mata (momentum/SMA/ignisi/magnet) bimbang <3/4 searah: ini SATU-SATUNYA alasan diam yang sah, tercatat & diuji ulang denyut berikutnya (mengarang sinyal tetap dilarang)';
      st.aksiTerakhir = 'TUNGGU'; st.aksiTeks = teks;
      jurnal(st, 'TUNGGU', teks, harga, null);
      return { aksi: 'TUNGGU', teks, harga };
    }
    // HUKUM IGNISI — radar anti-kecolongan merampas pedang yang melawan ledakan
    // (luka 2026-11-26 03:56: SHORT dibuka di tubuh melonjak +37%, uPnl -27 USD)
    const larang = pedangTerlarang(sinyal.arah === 'NAIK' ? 'BUY' : 'SELL');
    if (larang.terlarang) {
      const teks = `PEDANG DIRAMPAS RADAR: ${sinyal.arah === 'NAIK' ? 'BUY' : 'SELL'} gugur — ${larang.alasan}`;
      st.aksiTerakhir = 'TUNGGU'; st.aksiTeks = teks;
      jurnal(st, 'TUNGGU', teks, harga, null);
      catatOtonomi({
        mesin: 'DOMPET', pemicu: 'HUKUM-IGNISI', mandiri: true,
        hasil: 'pedang melawan ignisi tidak diangkat (anti kecolongan 03:00)',
        bukti: teks.slice(0, 180),
      });
      return { aksi: 'TUNGGU', teks, harga };
    }
    // ANTI-DOBEL SINYAL — pedang yang sama (id keyakinan) yang statusnya masih
    // TERBUKA tidak boleh diangkat dua kali (lapisan kedua di samping dedupe
    // hash dompet.ts): satu sinyal satu posisi, walau cache lintas-graph basi
    const keputusanHariIni = bacaJson<KeputusanJantung[]>(FILE_KEPUTUSAN, []).filter((k) => k.at.slice(0, 10) === hariKini);
    const pedangSudah = keputusanHariIni.some((k) => k.id === sinyal.id && k.status === 'TERBUKA');
    if (pedangSudah) {
      const teks = `pedang ${sinyal.id} ${sinyal.jenis} SUDAH terangkat (posisi hidup dijaga pengawal 60 dtk) — anti-dobel sinyal: dilarang menumpangi posisi kedua atas sinyal yang sama`;
      st.aksiTerakhir = 'JAGA'; st.aksiTeks = teks;
      jurnal(st, 'JAGA', teks, harga, null);
      return { aksi: 'JAGA', teks, harga };
    }
    // modulasi: rekam jejak dompet (diskonNeuron) + bus persilangan (kiriman
    // paus/lintasan/kasus bertanda tangan) — neuron saling mencerdaskan BENERAN
    const diskon = diskonNeuron(neuron, sinyal.arah === 'NAIK' ? 'BUY' : 'SELL', sinyal.K);
    const busMod = modulasiPedangDariBus(sinyal.arah === 'NAIK' ? 'BUY' : 'SELL');
    const modulasi = {
      K: Math.max(0.2, Math.min(0.95, diskon.K + busMod.delta)),
      teks: `${diskon.teks}${busMod.delta !== 0 ? ` · ${busMod.catatan} (${busMod.delta >= 0 ? '+' : ''}${busMod.delta})` : ''}`,
    };
    // BATAS HARIAN + BYPASS — hukum main terus: cap 12 bukan tembok mati;
    // K ≥ BYPASS_K (0.62) tetap boleh main dengan catatan jujur (bukan mayat)
    const capTercapai = keputusanHariIni.length >= MAKS_KEPUTUSAN_HARIAN;
    if (capTercapai && modulasi.K < BYPASS_K) {
      const teks = `batas ${MAKS_KEPUTUSAN_HARIAN} keputusan hari ini tercapai & K ${modulasi.K.toFixed(2)} < bypass ${BYPASS_K} — dompet tetap berjaga tiap denyut; pedang keyakinan rendah menunggu esok (aktif ≠ buang fee)`;
      st.aksiTerakhir = 'TUNGGU'; st.aksiTeks = teks;
      jurnal(st, 'TUNGGU', teks, harga, null);
      return { aksi: 'TUNGGU', teks, harga };
    }
    if (modulasi.K < AMBANG_K) {
      const teks = `pedang ${sinyal.arah} (${sinyal.id} K=${sinyal.K.toFixed(2)}) GUGUR ambang ${AMBANG_K} — ${modulasi.teks}; dilarang masuk setengah hati`;
      st.aksiTerakhir = 'TUNGGU'; st.aksiTeks = teks;
      jurnal(st, 'TUNGGU', teks, harga ?? undefined, null);
      return { aksi: 'TUNGGU', teks, harga: harga ?? undefined };
    }
    if (capTercapai) {
      catatOtonomi({
        mesin: 'DOMPET', pemicu: 'BYPASS-CAP', mandiri: true,
        hasil: `keputusan ke-${keputusanHariIni.length + 1} hari ini (≥ cap ${MAKS_KEPUTUSAN_HARIAN}) tetap diangkat: K ${modulasi.K.toFixed(2)} ≥ bypass ${BYPASS_K} — hukum main terus`,
        bukti: `${sinyal.id} ${sinyal.jenis} ${sinyal.arah} · ${modulasi.teks.slice(0, 150)}`,
      });
    }
    // target/stop: σ24j nyata (hukum modal-jiwa: 0,7σ clamp 1,2–4,0%);
    // sinyal PORTAL: target = harga magnet sesungguhnya, stop di-UKUR ke setup
    // (clamp 1,2–4,0%) supaya R ≥ 1 — dulu stop σ mentah membunuh semua magnet
    // (R < 0,8) → dompet balik diam; itu kecolongan baru, bukan disiplin.
    const sigma = await sigma24j(st);
    const pct = Math.max(1.2, Math.min(4.0, 0.7 * sigma));
    const arah: 'BUY' | 'SELL' = sinyal.arah === 'NAIK' ? 'BUY' : 'SELL';
    let targetPct = pct;
    let stopPct = pct;
    if (sinyal.asal === 'PORTAL' && sinyal.targetMagnet) {
      targetPct = Math.abs(sinyal.targetMagnet - harga) / harga * 100;
      stopPct = Math.max(1.2, Math.min(4.0, targetPct)); // R = targetPct/stopPct ≥ 1
    }
    const target = arah === 'BUY' ? harga * (1 + targetPct / 100) : harga * (1 - targetPct / 100);
    const stop = arah === 'BUY' ? harga * (1 - stopPct / 100) : harga * (1 + stopPct / 100);
    const hash = crypto.createHash('sha256').update(`jantung-dompet|${hariKini}|${sinyal.id}|${Date.now()}`).digest('hex');
    const label = `KEPUTUSAN JANTUNG DOMPET ${sinyal.id} (keyakinan ${Math.round(modulasi.K * 100)}% rezim JANTUNG-INTRADAY — σ24j ${sigma.toFixed(2)}%, pedang ${sinyal.arah} dari ${asalPedang}; ${modulasi.teks})`;
    await dompetBuka({
      hari: hariKini, arah,
      entry: harga, target, stop,
      ambisius: harga * (1 + (arah === 'BUY' ? 1 : -1) * pct * 1.5 / 100),
      keyakinan: Math.round(modulasi.K * 100), rezim: 'JANTUNG-INTRADAY',
      komposit: null, serangan: [], buktiKunci: [`${sinyal.id}: ${sinyal.dasar}`],
      hash, nomor: 0, asal: 'JANTUNG', label,
    });
    const keputusan: KeputusanJantung = {
      at: new Date().toISOString(), id: sinyal.id, arah, sinyal: `${asalPedang} — ${sinyal.dasar}`,
      K: Math.round(modulasi.K * 1000) / 1000, KSebelumNeuron: sinyal.K,
      targetPct: Math.round(targetPct * 100) / 100, stopPct: Math.round(stopPct * 100) / 100,
      status: 'TERBUKA', refHash: hash,
    };
    const daftarK = bacaJson<KeputusanJantung[]>(FILE_KEPUTUSAN, []);
    daftarK.unshift(keputusan);
    tulisJson(FILE_KEPUTUSAN, daftarK.slice(0, CAP_KEPUTUSAN));
    const teks = `PEDANG DIANGKAT: ${arah} ALL-IN (hukum main terus — dilarang diam) dari ${asalPedang} ${sinyal.id} ${sinyal.jenis} K=${modulasi.K.toFixed(2)} — target ${target.toPrecision(6)} (${targetPct.toFixed(2)}%) / stop ${stop.toPrecision(6)} (${stopPct.toFixed(2)}% ${sinyal.asal === 'PORTAL' ? 'diukur ke setup' : 'σ24j'}); ${modulasi.teks}`;
    st.aksiTerakhir = 'BUKA'; st.aksiTeks = teks;
    st.atKeputusanTerakhir = keputusan.at;
    st.jagaTanda = null;
    jurnal(st, 'BUKA', teks, harga, null);
    catatOtonomi({
      mesin: 'DOMPET', pemicu: 'HUKUM-DUA-PEDANG', mandiri: true,
      hasil: `dompet ${arah} ALL-IN dari ${sinyal.asal === 'PORTAL' ? 'magnet' : 'vonis'} ${sinyal.id} ${sinyal.jenis} (K=${modulasi.K.toFixed(2)}) — gap rencana arena diisi, modal tak didiamkan`,
      bukti: `target ${targetPct.toFixed(2)}% / stop ${stopPct.toFixed(2)}% (R ${Math.round(targetPct / stopPct * 100) / 100}) · ${modulasi.teks}`,
    });
    return { aksi: 'BUKA', teks, harga };
  } catch (e) {
    const teks = `denyut gagal separuh jalan (${e instanceof Error ? e.message.slice(0, 90) : 'tak terbaca'}) — denyut berikutnya mencoba lagi; luka tidak disembunyikan`;
    st.aksiTerakhir = 'BERJAGA-JAGA';
    st.aksiTeks = teks;
    try { jurnal(st, 'BERJAGA-JAGA', teks); } catch { /* abai */ }
    return null;
  } finally {
    // simpan state yang SUDAH dimutasi denyut ini (aksi/jurnal/tambang),
    // bukan salinan awal — kalau tidak, keputusan terakhir hilang
    st.status = 'AKTIF';
    st.detakKe += 1;
    st.atTerakhir = new Date().toISOString();
    tulisJson(FILE_DENYUT, st);
    berdenyut = false;
  }
}

// ---------------- driver ----------------
function mulaiJantung(): void {
  const g = globalThis as { __elsaDompetJantung?: NodeJS.Timeout; __elsaDompetJantungAwal?: boolean };
  if (g.__elsaDompetJantungAwal) return;
  g.__elsaDompetJantungAwal = true;
  setTimeout(() => { void denyutInti(); }, 8000); // denyut kickstart saat server hidup
  g.__elsaDompetJantung = setInterval(() => { void denyutInti(); }, JEDA_DTIK * 1000);
}

export function denyutDompetSekarang(): void {
  mulaiJantung();
  void denyutInti();
}

export async function denyutDompetPaksa(): Promise<DompetJantungData> {
  mulaiJantung();
  await denyutInti();
  return bacaJantungDompet();
}

// ---------------- payload UI ----------------
export function bacaJantungDompet(): DompetJantungData {
  const st = bacaState();
  const jurnalArr = bacaJson<JurnalEntri[]>(FILE_JURNAL, []);
  const keputusanArr = bacaJson<KeputusanJantung[]>(FILE_KEPUTUSAN, []);
  const neuron = bacaJson<NeuronDompet | null>(FILE_NEURON, null);
  const tk = dompetBacaToko();
  const jaga = tk.posisi
    ? {
      aktif: true, arah: tk.posisi.arah,
      uPnl: null, uPnlPct: null, jarakTargetPct: null, jarakStopPct: null,
    }
    : null;
  return {
    at: new Date().toISOString(),
    status: st.status,
    detakKe: st.detakKe,
    jedaDetik: JEDA_DTIK,
    atTerakhir: st.atTerakhir,
    atBerikutnya: st.atTerakhir ? new Date(Date.parse(st.atTerakhir) + JEDA_DTIK * 1000).toISOString() : null,
    aksiTerakhir: st.aksiTerakhir,
    aksiTeks: st.aksiTeks,
    jaga,
    jurnal: jurnalArr.slice(0, 16),
    keputusan: keputusanArr.slice(0, 12),
    neuron: neuron ? {
      ...neuron,
      pelajaran: neuron.pelajaran.slice(0, 12),
    } : null,
    hukum: [
      `PENGAWAL 60 DETIK: TP/SL posisi diadili langsung dari buku pesanan tiap denyut — sentuhan tidak bisa lolos di antara siklus arena lagi`,
      `HUKUM MAIN TERUS (perintah pemilik 2026-11-26: "dalam situasi apapun harus bisa terus bermain, dana habis pun tak masalah — masih bisa suntik dana lagi; takut pasar = mati kaya mayat"): modal-jiwa kosong BUKAN alasan diam — jantung memandu PEDANG MANDIRI dari momentum 6j + SMA12 + radar ignisi + magnet lintasan (suara ≥3/4 searah, formula K terbuka di dasar keputusan)`,
      `CAP 12 + BYPASS: maks ${MAKS_KEPUTUSAN_HARIAN} keputusan/hari, tapi K ≥ ${BYPASS_K} tetap boleh main melewati cap (dengan catatan otonomi) — aktif ≠ buang fee, tapi diam tanpa alasan = kanker`,
      `HUKUM IGNISI (luka 2026-11-26 03:00): radar anti-kecolongan merampas pedang yang melawan ledakan — SHORT dilarang saat ignisi NAIK menyala; posisi melawan radar → stop ditarik SEKARANG; posisi searah gelombang → target MENJALAR mengikuti velocity pasar`,
      `PERSILANGAN: kiriman paus/lintasan/kasus (bus saling mencerdaskan) memodulasi keyakinan pedang (+/−0.03..0.15) — neuron saling mencerdaskan, bukan saling cuek`,
      `ANTI-DOBEL: satu dompet satu posisi — rencana arena aktif hari ini diadopsi secepat kilat, bukan ditumpangi posisi sendiri`,
      `NEURON DOMPET: tiap tutup ditambang jadi pelajaran (rezim × arah × sumber) — arah yang sering salah didiskon keyakinannya di keputusan berikutnya`,
      `ANTI-CHURN: jeda ${JEDA_SESUDAH_RUGI_MS / 60000} menit sesudah rugi, ${JEDA_SESUDAH_MENANG_MS / 60000} menit sesudah menang — fee tetap dihitung jujur di buku`,
      `TOP-UP: dompet habis saat hendak buka → $1000 disetor ulang OTOMATIS (tanpa takut — catatan akuntansi SETORAN lengkap)`,
    ],
  };
}

export type { DompetPosisi };
