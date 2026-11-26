// ============================================================
// UJIAN · MESIN UJI ALIRAN — "Time traveler market" dilatih & diuji.
// Korpus: Gate.io contract_stats + candlesticks 1h, 180 hari,
// 4 koin kasus: EVAA, PIEVERSE, AGT (pelatihan) + ELSA (final).
//
// Soal ujian (dari kasus NYATA yang sudah terjadi):
//   Q-ARAH   : dgn data derivatif saat jam T (OI, orang long/short,
//              whale top-20, funding, taker, likuidasi) — arah harga
//              6 jam berikutnya NAIK atau TURUN? (deadband adaptif)
//   Q-KORBAN : dalam 6 jam berikutnya sisi mana yang lebih banyak
//              TERLIQUIDASI — LONG atau SHORT? (likuidasi resmi Gate)
//
// Etika ujian: tidak ada kebocoran waktu (split per blok 48 jam),
// standardisasi dihitung dari set pelatihan saja, soal segar selalu
// dari blok waktu yang belum pernah dipakai ronde sebelumnya.
// Jalankan: bun scripts/ujian/mesin.ts soal | latih | laws
// ============================================================
import fs from 'fs';

const DIR = '/home/z/my-project/db/aliran';
const KOIN_LATIH = ['EVAA', 'PIEVERSE', 'AGT'] as const;
const KOIN_FINAL = 'ELSA';
const H = 6; // horizon 6 jam
const DB_MIN = 0.008, DB_MAX = 0.025;
const KORBAN_MIN_USD = 2000, KORBAN_DOM = 2.5;
const BLOK = 48; // blok waktu 48 jam
const SEED = 20261124;

// ---------------- rng deterministik ----------------
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ---------------- tipe ----------------
type Stat = Record<string, number | string>;
type Candle = { t: number; o: number; c: number; h: number; l: number; v: number };
type Bar = {
  t: number; c: number; o: number; h: number; l: number; v: number;
  oi: number; funding: number; longU: number; shortU: number;
  lsrTaker: number; lsrAkun: number; longTaker: number; shortTaker: number;
  topLong: number; topShort: number; topLongAkun: number; topShortAkun: number;
  liqLong: number; liqShort: number;
};
type Fitur = Record<string, number>;
type Soal = {
  id: string; koin: string; t: number; harga: number;
  x: number[]; // vektor fitur (urutan NAMA_FITUR)
  arah: 1 | -1; korban: 1 | -1 | 0; korbanUsd: [number, number]; fut: number; db: number;
};

// ---------------- muat & rapikan ----------------
function muat(koin: string): { bars: Bar[] } {
  const stats = JSON.parse(fs.readFileSync(`${DIR}/${koin}_stats.json`, 'utf8')) as Stat[];
  const candles = JSON.parse(fs.readFileSync(`${DIR}/${koin}_candles.json`, 'utf8')) as Candle[];
  const cmap = new Map<number, Candle>();
  for (const c of candles) cmap.set(c.t, c);
  const bars: Bar[] = [];
  for (const s of stats) {
    const t = Number(s.time);
    const k = cmap.get(t);
    if (!k) continue;
    bars.push({
      t, o: k.o, c: k.c, h: k.h, l: k.l, v: k.v,
      oi: Number(s.open_interest), funding: Number(s.last_funding_rate),
      longU: Number(s.long_users), shortU: Number(s.short_users),
      lsrTaker: Number(s.lsr_taker), lsrAkun: Number(s.lsr_account),
      longTaker: Number(s.long_taker_size), shortTaker: Number(s.short_taker_size),
      topLong: Number(s.top_long_size), topShort: Number(s.top_short_size),
      topLongAkun: Number(s.top_long_account), topShortAkun: Number(s.top_short_account),
      liqLong: Number(s.long_liq_usd), liqShort: Number(s.short_liq_usd),
    });
  }
  bars.sort((a, b) => a.t - b.t);
  return { bars };
}

const rata = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const sd = (a: number[]) => {
  const m = rata(a);
  return Math.sqrt(rata(a.map((v) => (v - m) ** 2))) || 1e-9;
};

// ---------------- fitur (TANPA kebocoran: hanya bar ≤ i) ----------------
export const NAMA_FITUR = [
  'mom1', 'mom4', 'mom24', 'volZ', 'rangePos',
  'oiD1', 'oiD4', 'oiD24',
  'funding', 'fundingMa3',
  'longShare', 'dLongShare4',
  'takerImb', 'topShare', 'dTopShare4', 'whaleVsCrowd',
  'liqLong4', 'liqShort4', 'liqAsym4',
  'atr24',
  // fitur rekayasa — cerita mikrostruktur
  'crowdLong', 'crowdShort', 'fuelShort', 'fuelLong', 'delever',
  'contOIRah', 'akumSenyap', 'extTop', 'extBottom', 'whaleFlow',
];
const NEUTRAL_FUND = 0.00005;

export function fiturDi(bars: Bar[], i: number): Fitur | null {
  const n = bars.length;
  if (i < 72 || i >= n) return null;
  const b = bars[i];
  const c = (j: number) => bars[Math.max(0, Math.min(n - 1, j))].c;
  const atr24 = rata([0, 1, 2, 3, 4, 5, 6, 7].map((k) => (bars[i - k].h - bars[i - k].l) / Math.max(bars[i - k].c, 1e-9)));
  const harga = b.c;
  const mom1 = harga / Math.max(c(i - 1), 1e-12) - 1;
  const mom4 = harga / Math.max(c(i - 4), 1e-12) - 1;
  const mom24 = harga / Math.max(c(i - 24), 1e-12) - 1;
  const vols = [1, 2, 3, 4, 5, 6, 7, 8].map((k) => bars[i - k].v);
  const volZ = (b.v - rata(vols)) / sd(vols);
  const hi24 = Math.max(...[0, 1, 2, 3].map((k) => bars[i - k].h), harga);
  const lo24 = Math.min(...[0, 1, 2, 3].map((k) => bars[i - k].l), harga);
  const hi72 = Math.max(...[0, 12, 24, 36, 48, 60, 72].map((k) => bars[i - k].h), harga);
  const lo72 = Math.min(...[0, 12, 24, 36, 48, 60, 72].map((k) => bars[i - k].l), harga);
  const rangePos = hi24 > lo24 ? (harga - lo24) / (hi24 - lo24) : 0.5;
  const oiD1 = b.oi / Math.max(bars[i - 1].oi, 1) - 1;
  const oiD4 = b.oi / Math.max(bars[i - 4].oi, 1) - 1;
  const oiD24 = b.oi / Math.max(bars[i - 24].oi, 1) - 1;
  const funding = b.funding;
  const fundingMa3 = rata([0, 1, 2].map((k) => bars[i - k].funding));
  const totU = b.longU + b.shortU;
  const longShare = totU > 0 ? b.longU / totU : 0.5;
  const totU4 = bars[i - 4].longU + bars[i - 4].shortU;
  const longShare4 = totU4 > 0 ? bars[i - 4].longU / totU4 : 0.5;
  const dLongShare4 = longShare - longShare4;
  const totT = b.longTaker + b.shortTaker;
  const takerImb = totT > 0 ? (b.longTaker - b.shortTaker) / totT : 0;
  const totTop = b.topLong + b.topShort;
  const topShare = totTop > 0 ? b.topLong / totTop : 0.5;
  const totTop4 = bars[i - 4].topLong + bars[i - 4].topShort;
  const topShare4 = totTop4 > 0 ? bars[i - 4].topLong / totTop4 : 0.5;
  const dTopShare4 = topShare - topShare4;
  const liqLong4 = rata([0, 1, 2, 3].map((k) => bars[i - k].liqLong));
  const liqShort4 = rata([0, 1, 2, 3].map((k) => bars[i - k].liqShort));
  const liqSkala = Math.max(rata([24, 48].map((k) => rata([0, 1, 2, 3].map((j) => bars[i - k - j].liqLong + bars[i - k - j].liqShort)))), 1) ;
  const liqAsym4 = (liqShort4 - liqLong4) / Math.max(liqSkala, 1);
  const crowdLong = (longShare - 0.5) + 30 * (fundingMa3 - NEUTRAL_FUND) + 0.6 * Math.max(0, mom24);
  const crowdShort = (0.5 - longShare) + 30 * (NEUTRAL_FUND - fundingMa3) + 0.6 * Math.max(0, -mom24);
  const fuelShort = Math.max(0, 0.55 - longShare) * Math.max(0, (NEUTRAL_FUND - fundingMa3) * 4000) * (1 + Math.max(0, oiD24) * 20);
  const fuelLong = Math.max(0, longShare - 0.45) * Math.max(0, (fundingMa3 - NEUTRAL_FUND) * 4000) * (1 + Math.max(0, oiD24) * 20);
  const delever = -oiD24;
  const contOIRah = Math.max(0, oiD24) * Math.sign(mom4);
  const akumSenyap = Math.max(0, takerImb) * Math.max(0, 1 - Math.abs(oiD24) * 25) * Math.max(0, 1 - Math.abs(mom4) * 50);
  const extTop = Math.max(0, rangePos - 0.7) * (1 + Math.max(0, mom24) * 10);
  const extBottom = Math.max(0, 0.3 - rangePos) * (1 + Math.max(0, -mom24) * 10);
  const whaleVsCrowd = topShare - longShare;
  const whaleFlow = dTopShare4;
  void hi72; void lo72;
  return {
    mom1, mom4, mom24, volZ, rangePos, oiD1, oiD4, oiD24, funding, fundingMa3,
    longShare, dLongShare4, takerImb, topShare, dTopShare4, whaleVsCrowd,
    liqLong4, liqShort4, liqAsym4, atr24,
    crowdLong, crowdShort, fuelShort, fuelLong, delever, contOIRah,
    akumSenyap, extTop, extBottom, whaleFlow,
  };
}

// ---------------- label dari masa depan (jawaban resmi) ----------------
function labelDi(bars: Bar[], i: number): { arah: 1 | -1 | 0; korban: 1 | -1 | 0; fut: number; db: number; korbanUsd: [number, number] } {
  const n = bars.length;
  if (i + H >= n) return { arah: 0, korban: 0, fut: 0, db: 0, korbanUsd: [0, 0] };
  const fut = bars[i + H].c / Math.max(bars[i].c, 1e-12) - 1;
  const atr24 = rata([0, 1, 2, 3, 4, 5, 6, 7].map((k) => (bars[i - k].h - bars[i - k].l) / Math.max(bars[i - k].c, 1e-9)));
  const db = Math.min(DB_MAX, Math.max(DB_MIN, 0.35 * atr24));
  const arah = fut >= db ? 1 : fut <= -db ? -1 : 0;
  let shortU = 0, longU = 0;
  for (let k = 1; k <= H; k++) { shortU += bars[i + k].liqShort; longU += bars[i + k].liqLong; }
  let korban: 1 | -1 | 0 = 0;
  if (shortU >= KORBAN_MIN_USD && shortU >= KORBAN_DOM * Math.max(longU, 1)) korban = 1;      // SHORT dilikuidasi
  else if (longU >= KORBAN_MIN_USD && longU >= KORBAN_DOM * Math.max(shortU, 1)) korban = -1; // LONG dilikuidasi
  return { arah, korban, fut, db, korbanUsd: [longU, shortU] };
}

// ---------------- bangun kandidat per koin ----------------
type Kandidat = { koin: string; i: number; t: number; x: Fitur; arah: 1 | -1 | 0; korban: 1 | -1 | 0; fut: number; db: number; korbanUsd: [number, number]; blok: number };
function kandidatKoin(koin: string): Kandidat[] {
  const { bars } = muat(koin);
  const out: Kandidat[] = [];
  for (let i = 72; i + H < bars.length; i++) {
    const f = fiturDi(bars, i);
    if (!f) continue;
    const lb = labelDi(bars, i);
    const blok = Math.floor(bars[i].t / 3600 / BLOK);
    out.push({ koin, i, t: bars[i].t, x: f, arah: lb.arah, korban: lb.korban, fut: lb.fut, db: lb.db, korbanUsd: lb.korbanUsd, blok });
  }
  return out;
}

// ---------------- logistik ----------------
const sigmoid = (z: number) => 1 / (1 + Math.exp(-Math.max(-30, Math.min(30, z))));
type Model = { w: number[]; b: number; mu: number[]; sig: number[]; fitur: string[]; iter: number; l2: number };

function latihLogistik(X: number[][], y: number[], l2 = 0.03, iter = 2500, lr = 0.15): Model {
  const d = X[0].length;
  const mu = Array.from({ length: d }, (_, j) => rata(X.map((r) => r[j])));
  const sig = Array.from({ length: d }, (_, j) => sd(X.map((r) => r[j])));
  const Z = X.map((r) => r.map((v, j) => (v - mu[j]) / sig[j]));
  const w = new Array(d).fill(0);
  let b = 0;
  const nPos = y.filter((v) => v > 0).length, nNeg = y.filter((v) => v < 0).length;
  const sw = (v: number) => (v > 0 ? 0.5 / Math.max(nPos, 1) : 0.5 / Math.max(nNeg, 1));
  for (let it = 0; it < iter; it++) {
    const gw = new Array(d).fill(0);
    let gb = 0;
    for (let k = 0; k < Z.length; k++) {
      const z = Z[k].reduce((s, v, j) => s + v * w[j], b);
      const p = sigmoid(z);
      const g = (p - (y[k] > 0 ? 1 : 0)) * sw(y[k]);
      for (let j = 0; j < d; j++) gw[j] += g * Z[k][j];
      gb += g;
    }
    for (let j = 0; j < d; j++) w[j] -= lr * (gw[j] + l2 * w[j]);
    b -= lr * gb;
  }
  return { w, b, mu, sig, fitur: NAMA_FITUR, iter, l2 };
}
function prediksi(m: Model, x: number[]): number {
  const z = x.reduce((s, v, j) => s + ((v - m.mu[j]) / m.sig[j]) * m.w[j], m.b);
  return sigmoid(z);
}
function akurasi(m: Model, soal: Soal[], yKey: 'arah' | 'korban') {
  let benar = 0, n = 0;
  const brier: number[] = [];
  const gagal: { id: string; koin: string; t: number; p: number; y: number; fut: number }[] = [];
  for (const s of soal) {
    const y = yKey === 'arah' ? s.arah : s.korban;
    if (y === 0) continue;
    const p = prediksi(m, s.x);
    const ya = p >= 0.5 ? 1 : -1;
    n++;
    if (ya === y) benar++;
    brier.push((p - (y > 0 ? 1 : 0)) ** 2);
    if (ya !== y && gagal.length < 400) gagal.push({ id: s.id, koin: s.koin, t: s.t, p, y, fut: s.fut });
  }
  return { n, benar, acc: n ? benar / n : 0, brier: rata(brier), gagal };
}

// ---------------- vektorisasi ----------------
const vek = (f: Fitur) => NAMA_FITUR.map((k) => f[k] ?? 0);

// ---------------- UTAMA: soal ----------------
function buatSoal() {
  const rand = rng(SEED);
  const poolLatih: Kandidat[] = [];
  const poolSegar: Kandidat[] = [];
  for (const koin of KOIN_LATIH) {
    const k = kandidatKoin(koin).filter((c) => c.arah !== 0);
    for (const c of k) (c.blok % 2 === 0 ? poolLatih : poolSegar).push(c);
  }
  const finalEl = kandidatKoin(KOIN_FINAL).filter((c) => c.arah !== 0);

  const acak = <T,>(a: T[]) => a.map((v) => ({ v, r: rand() })).sort((x, y) => x.r - y.r).map((o) => o.v);
  const sampel = (pool: Kandidat[], n: number, kecualiBlok: Set<number>): Kandidat[] => {
    const k = acak(pool.filter((c) => !kecualiBlok.has(c.blok)));
    // adil per koin
    const perKoin = new Map<string, Kandidat[]>();
    for (const c of k) { const a = perKoin.get(c.koin) ?? []; a.push(c); perKoin.set(c.koin, a); }
    const out: Kandidat[] = [];
    let habis = false;
    while (out.length < n && !habis) {
      habis = true;
      for (const [, a] of perKoin) { if (a.length) { out.push(a.pop()!); habis = false; if (out.length >= n) break; } }
    }
    return out;
  };

  const blokDipakai = new Set<number>();
  const ronde: { n: number; soal: Soal[] }[] = [];
  for (let r = 0; r < 5; r++) {
    const soalR = sampel(poolSegar, 500, new Set());
    for (const c of soalR) blokDipakai.add(c.blok);
    ronde.push({ n: r + 1, soal: soalR.map(kandidatJadiSoal) });
  }
  const latih500 = sampel(poolLatih, 500, new Set()).map(kandidatJadiSoal);
  const elsaFinal = finalEl.map(kandidatJadiSoal);
  const hasil = { latih500, ronde, elsaFinal, poolLatihSemua: poolLatih.length, poolSegarSemua: poolSegar.length, elsaValid: finalEl.length };
  fs.writeFileSync(`${DIR}/soal.json`, JSON.stringify({ latih500, ronde: ronde.map((r) => ({ n: r.n, id: r.soal.map((s) => s.id) })), elsaFinal: elsaFinal.map((s) => s.id) }));
  fs.writeFileSync(`${DIR}/kandidat.json`, JSON.stringify({ poolLatih: poolLatih.map(kandidatJadiSoal), poolSegar: poolSegar.map(kandidatJadiSoal), elsaFinal }, null, 0));
  console.log(`kandidat: latih-pool ${poolLatih.length} · segar-pool ${poolSegar.length} · ELSA valid ${finalEl.length}`);
  console.log(`latih500 ${latih500.length} · ronde segar: ${ronde.map((r) => r.soal.length).join(', ')} · final ELSA ${elsaFinal.length}`);
  return hasil;
}
function kandidatJadiSoal(c: Kandidat): Soal {
  return { id: `${c.koin}@${c.t}`, koin: c.koin, t: c.t, harga: 0, x: vek(c.x), arah: c.arah as 1 | -1, korban: c.korban, korbanUsd: c.korbanUsd, fut: c.fut, db: c.db };
}

// ---------------- UTAMA: latih + ronde ujian ----------------
function lariRonde() {
  const k = JSON.parse(fs.readFileSync(`${DIR}/kandidat.json`, 'utf8')) as { poolLatih: Soal[]; poolSegar: Soal[]; elsaFinal: Soal[] };
  const rand = rng(SEED * 7);
  const acak = <T,>(a: T[]) => a.map((v) => ({ v, r: rand() })).sort((x, y) => x.r - y.r).map((o) => o.v);

  // model A: arah — dilatih dari pool pelatihan
  const Xa = k.poolLatih.map((s) => s.x);
  const ya = k.poolLatih.map((s) => s.arah);
  const mA = latihLogistik(Xa, ya, 0.02, 3000, 0.12);
  // model B: korban — hanya baris dgn korban ±1
  const barisK = k.poolLatih.filter((s) => s.korban !== 0);
  const mB = barisK.length > 60 ? latihLogistik(barisK.map((s) => s.x), barisK.map((s) => s.korban), 0.05, 3000, 0.12) : null;

  const evA = akurasi(mA, k.poolLatih, 'arah');
  console.log(`[ARAH]   latih(pool semua) acc ${evA.benar}/${evA.n} = ${(evA.acc * 100).toFixed(1)}%  brier ${evA.brier.toFixed(4)}`);

  // ronde-ronde: setiap ronde = 500 soal segar yang BELUM dipakai ronde sebelumnya
  const laporan: {
    ronde: number; arah: { n: number; benar: number; acc: number; brier: number };
    korban: { n: number; benar: number; acc: number } | null;
  }[] = [];
  const segar = acak(k.poolSegar);
  const perRonde = 500;
  const maxRonde = Math.floor(segar.length / perRonde);
  for (let r = 0; r < maxRonde; r++) {
    const set = segar.slice(r * perRonde, (r + 1) * perRonde);
    const a = akurasi(mA, set, 'arah');
    const kk = mB ? akurasi(mB, set, 'korban') : null;
    laporan.push({ ronde: r + 1, arah: { n: a.n, benar: a.benar, acc: a.acc, brier: a.brier }, korban: kk ? { n: kk.n, benar: kk.benar, acc: kk.acc } : null });
    console.log(`[RONDE ${r + 1}] 500 soal segar — ARAH ${a.benar}/${a.n} = ${(a.acc * 100).toFixed(1)}%${kk ? ` · KORBAN ${kk.benar}/${kk.n} = ${(kk.acc * 100).toFixed(1)}%` : ''}`);
  }

  const e = akurasi(mA, k.elsaFinal, 'arah');
  const ek = mB ? akurasi(mB, k.elsaFinal, 'korban') : null;
  console.log(`[FINAL ELSA] ARAH ${e.benar}/${e.n} = ${(e.acc * 100).toFixed(1)}%${ek ? ` · KORBAN ${ek.benar}/${ek.n} = ${(ek.acc * 100).toFixed(1)}%` : ''}`);

  // baseline kejenakan (cek fallacy)
  const base = (f: (s: Soal) => number) => {
    let b = 0, n = 0;
    for (const s of k.elsaFinal) { const y = s.arah; const p = f(s); if (p === y) b++; n++; }
    return n ? b / n : 0;
  };
  console.log(`[BASELINE] ikut-mom4 ${(base((s) => (s.x[NAMA_FITUR.indexOf('mom4')] >= 0 ? 1 : -1)) * 100).toFixed(1)}% · ikut-mom24 ${(base((s) => (s.x[NAMA_FITUR.indexOf('mom24')] >= 0 ? 1 : -1)) * 100).toFixed(1)}% · melawan-kerumunan ${(base((s) => (s.x[NAMA_FITUR.indexOf('longShare')] > 0.5 ? -1 : 1)) * 100).toFixed(1)}%`);

  // bobot fitur teratas
  const bobot = mA.w.map((w, j) => ({ f: NAMA_FITUR[j], w })).sort((a, b) => Math.abs(b.w) - Math.abs(a.w)).slice(0, 12);
  console.log('bobot teratas:', bobot.map((b) => `${b.f}:${b.w.toFixed(2)}`).join(' · '));

  // simpan model + laporan
  fs.writeFileSync(`${DIR}/model.json`, JSON.stringify({ mA, mB, namaFitur: NAMA_FITUR }, null, 1));
  fs.writeFileSync(`${DIR}/laporan_ronde.json`, JSON.stringify({
    latih: evA, ronde: laporan, finalElsa: { arah: e, korban: ek },
    bobot, waktu: new Date().toISOString(),
  }, null, 1));
}

// ---------------- UTAMA: hukum kasus (untuk panel) ----------------
function hukumKasus() {
  const out: { nama: string; n: number; rate: number; ket: string }[] = [];
  const semua: Kandidat[] = [];
  for (const koin of [...KOIN_LATIH, KOIN_FINAL as string]) {
    const { bars } = muat(koin);
    for (let i = 72; i + H < bars.length; i++) {
      const lb = labelDi(bars, i);
      const f = fiturDi(bars, i);
      if (!f) continue;
      semua.push({ koin, i, t: bars[i].t, x: f, arah: lb.arah, korban: lb.korban, fut: lb.fut, db: lb.db, korbanUsd: lb.korbanUsd, blok: 0 });
    }
  }
  const hit = (nama: string, ket: string, f: (c: Kandidat) => boolean, g: (c: Kandidat) => boolean) => {
    const n0 = semua.filter(f);
    const n1 = n0.filter(g);
    out.push({ nama, n: n0.length, rate: n0.length ? n1.length / n0.length : 0, ket });
  };
  hit('banjir likuidasi SHORT 6j', 'short likuidasi besar (≥2.5× long, ≥$2k) → harga naik 6j berikut', (c) => c.korban === 1, (c) => c.fut > 0);
  hit('banjir likuidasi LONG 6j', 'long likuidasi besar (≥2.5× short, ≥$2k) → harga turun 6j berikut', (c) => c.korban === -1, (c) => c.fut < 0);
  hit('kerumunan long ekstrem (≥62%) + funding panas', 'orang long ≥62% & funding > 0.0002 → turun 6j', (c) => c.x.longShare >= 0.62 && c.x.fundingMa3 > 0.0002, (c) => c.fut < 0);
  hit('kerumunan short ekstrem (≤38%) + funding dingin', 'orang short ≥62% & funding < netral → naik 6j', (c) => c.x.longShare <= 0.38 && c.x.fundingMa3 < NEUTRAL_FUND, (c) => c.fut > 0);
  hit('OI tumbuh ≥4%/24j + harga naik', 'posisi baru mengikuti rally → lanjut naik', (c) => c.x.oiD24 >= 0.04 && c.x.mom24 > 0.02, (c) => c.fut > 0);
  hit('OI tumbuh ≥4%/24j + harga turun', 'posisi baru mengikuti dump → lanjut turun', (c) => c.x.oiD24 >= 0.04 && c.x.mom24 < -0.02, (c) => c.fut < 0);
  hit('whale top-20 condong long ≥8pt vs kerumunan', 'topShare − longShare ≥ 0.08 → naik 6j', (c) => c.x.whaleVsCrowd >= 0.08, (c) => c.fut > 0);
  hit('whale top-20 condong short ≥8pt vs kerumunan', 'topShare − longShare ≤ −0.08 → turun 6j', (c) => c.x.whaleVsCrowd <= -0.08, (c) => c.fut < 0);
  hit('OI kolaps ≤−5%/24j', 'deleveraging besar → arah lanjut sisi momen', (c) => c.x.oiD24 <= -0.05, (c) => c.fut * Math.sign(c.x.mom4) > 0);
  hit('akumulasi senyap aktif (taker beli + OI kalem)', 'akumSenyap ≥ 0.15 → naik 6j', (c) => c.x.akumSenyap >= 0.15, (c) => c.fut > 0);
  fs.writeFileSync(`${DIR}/hukum_kasus.json`, JSON.stringify(out, null, 1));
  for (const o of out) console.log(`${o.nama}: n=${o.n} rate=${(o.rate * 100).toFixed(1)}%`);
}

// ---------------- CLI ----------------
const perintah = process.argv[2] ?? 'soal';
if (perintah === 'soal') buatSoal();
else if (perintah === 'latih') lariRonde();
else if (perintah === 'laws') hukumKasus();
else if (perintah === 'semua') { buatSoal(); lariRonde(); hukumKasus(); }
