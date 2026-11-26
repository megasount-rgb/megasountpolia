// ============================================================
// UJIAN v5 · MESIN UJI ALIRAN FINAL.
// Pelajaran v1-v4 digabung:
//  - korban (sisi kaskade) = mahkota (71-73% buta; hukum kasus:
//    banjir short→naik 75-80%) → perbaiki filter label & kalibrasi
//  - tutup-tutup: HANYA baris label ≠0 saat melatih (bug v4)
//  - sentuhan-pertama: protokol sekunder
//  - metrik PORTAL ALARM: presisi/recall alarm kaskade + arah
//    mengikuti kaskade (angka utk panel "prediksi terliquidasi")
//  - MODEL PRODUKSI: arsitektur sama, dilatih ulang dgn ELSA
//    masa-lalu (walk-forward legal utk live) → model_prod.json
// Jalankan: bun scripts/ujian/mesin5.ts semua
// ============================================================
import fs from 'fs';

const DIR = '/home/z/my-project/db/aliran';
const KOIN_LATIH = ['EVAA', 'PIEVERSE', 'AGT'] as const;
const SEED = 20261124;
const H = 6;
const DB_MIN = 0.01, DB_KALI = 0.35, DB_MAX = 0.03;
const KORBAN_MIN_USD = 2000, KORBAN_DOM = 2.5;
const BLOK = 48;
const NEUTRAL_FUND = 0.00005;

function rng(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const rata = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const sd = (a: number[]) => { const m = rata(a); return Math.sqrt(rata(a.map((v) => (v - m) ** 2))) || 1e-9; };

type Stat = Record<string, number | string>;
type Candle = { t: number; o: number; c: number; h: number; l: number; v: number };
type Bar = {
  t: number; o: number; c: number; h: number; l: number; v: number;
  oi: number; funding: number; longU: number; shortU: number;
  longTaker: number; shortTaker: number;
  topLong: number; topShort: number; topLongAkun: number; topShortAkun: number;
  liqLong: number; liqShort: number;
};
const cacheBars = new Map<string, Bar[]>();
function muat(koin: string): Bar[] {
  if (cacheBars.has(koin)) return cacheBars.get(koin)!;
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
      longTaker: Number(s.long_taker_size), shortTaker: Number(s.short_taker_size),
      topLong: Number(s.top_long_size), topShort: Number(s.top_short_size),
      topLongAkun: Number(s.top_long_account), topShortAkun: Number(s.top_short_account),
      liqLong: Number(s.long_liq_usd), liqShort: Number(s.short_liq_usd),
    });
  }
  bars.sort((a, b) => a.t - b.t);
  cacheBars.set(koin, bars);
  return bars;
}

export const FITUR5 = [
  'mom1atr', 'mom2atr', 'mom4atr', 'mom12atr', 'mom24atr', 'mom48atr',
  'mom1', 'mom4', 'mom24',
  'rangePos24', 'distHi72atr', 'distLo72atr', 'atr24',
  'volZ', 'volClimax', 'body1', 'wickUp', 'wickDn', 'consec4',
  'oiD1', 'oiD2', 'oiD4', 'oiD12', 'oiD24', 'oiD72', 'oiD4xMom',
  'funding', 'fundingMa3', 'fundingDelta6',
  'longShare', 'dLongShare4', 'dLongShare12', 'logOrang',
  'takerImb', 'takerImbMa3',
  'topShare', 'dTopShare4', 'dTopShare12', 'whaleVsCrowd', 'topAkunShare', 'topAkunD4',
  'liqAsym4', 'liqAsym12', 'liqFresh', 'liqAsymSq', 'liqLong4log', 'liqShort4log',
  'crowdLong', 'crowdShort', 'fuelShort', 'fuelLong', 'delever', 'contOIRah', 'akumSenyap', 'extTop', 'extBottom',
];
const NF = FITUR5.length;

function fitur5(bars: Bar[], i: number): number[] | null {
  const n = bars.length;
  if (i < 96 || i >= n) return null;
  const at = (k: number) => bars[Math.max(0, i - k)];
  const b = bars[i];
  const harga = b.c;
  const atr24 = Math.max(rata([0, 1, 2, 3, 4, 5, 6, 7].map((k) => (at(k).h - at(k).l) / Math.max(at(k).c, 1e-9))), 1e-6);
  const mom = (k: number) => harga / Math.max(at(k).c, 1e-12) - 1;
  const vols = [1, 2, 3, 4, 5, 6, 7, 8].map((k) => at(k).v);
  const volZ = (b.v - rata(vols)) / sd(vols);
  const hi24 = Math.max(...[0, 1, 2, 3].map((k) => at(k).h), harga);
  const lo24 = Math.min(...[0, 1, 2, 3].map((k) => at(k).l), harga);
  const hi72 = Math.max(...[0, 12, 24, 36, 48, 60, 72, 84, 96].map((k) => at(k).h), harga);
  const lo72 = Math.min(...[0, 12, 24, 36, 48, 60, 72, 84, 96].map((k) => at(k).l), harga);
  const rangePos24 = hi24 > lo24 ? (harga - lo24) / (hi24 - lo24) : 0.5;
  const oiD = (k: number) => b.oi / Math.max(at(k).oi, 1) - 1;
  const fundingMa3 = rata([0, 1, 2].map((k) => at(k).funding));
  const totU = b.longU + b.shortU;
  const longShare = totU > 0 ? b.longU / totU : 0.5;
  const ls4 = at(4).longU + at(4).shortU;
  const ls12 = at(12).longU + at(12).shortU;
  const takerImb = (k: number) => { const t = at(k); const tot = t.longTaker + t.shortTaker; return tot > 0 ? (t.longTaker - t.shortTaker) / tot : 0; };
  const totTop = b.topLong + b.topShort;
  const topShare = totTop > 0 ? b.topLong / totTop : 0.5;
  const ts4 = at(4).topLong + at(4).topShort;
  const ts12 = at(12).topLong + at(12).topShort;
  const ta4 = at(4).topLongAkun + at(4).topShortAkun;
  const topAkunShare = (b.topLongAkun + b.topShortAkun) > 0 ? b.topLongAkun / (b.topLongAkun + b.topShortAkun) : 0.5;
  const ta4Share = ta4 > 0 ? at(4).topLongAkun / ta4 : 0.5;
  const liqAsym = (k0: number, k1: number) => { let s = 0, l = 0; for (let k = k0; k < k1; k++) { s += at(k).liqShort; l += at(k).liqLong; } return (s - l) / Math.max(s + l, 1); };
  const liqLong4 = rata([0, 1, 2, 3].map((k) => at(k).liqLong));
  const liqShort4 = rata([0, 1, 2, 3].map((k) => at(k).liqShort));
  const body1 = (b.c - b.o) / Math.max(b.h - b.l, 1e-12);
  const wickUp = (b.h - Math.max(b.o, b.c)) / Math.max(b.h - b.l, 1e-12);
  const wickDn = (Math.min(b.o, b.c) - b.l) / Math.max(b.h - b.l, 1e-12);
  let consec = 0;
  for (let k = 1; k <= 4; k++) consec += Math.sign(at(k).c - at(k).o);
  const oiD24 = oiD(24);
  const mom24 = mom(24);
  const mom4 = mom(4);
  const crowdLong = (longShare - 0.5) + 30 * (fundingMa3 - NEUTRAL_FUND) + 0.6 * Math.max(0, mom24);
  const crowdShort = (0.5 - longShare) + 30 * (NEUTRAL_FUND - fundingMa3) + 0.6 * Math.max(0, -mom24);
  const liqAsym4 = liqAsym(0, 4);
  const extTop = Math.max(0, rangePos24 - 0.7) * (1 + Math.max(0, mom24) * 10);
  const extBottom = Math.max(0, 0.3 - rangePos24) * (1 + Math.max(0, -mom24) * 10);
  const x: (number | null)[] = [
    mom(1) / atr24, mom(2) / atr24, mom4 / atr24, mom(12) / atr24, mom24 / atr24, mom(48) / atr24,
    mom(1), mom4, mom24,
    rangePos24, (hi72 - harga) / Math.max(atr24 * harga, 1e-9), (harga - lo72) / Math.max(atr24 * harga, 1e-9), atr24,
    volZ, volZ * Math.abs(mom(1)) / atr24, body1, wickUp, wickDn, consec / 4,
    oiD(1), oiD(2), oiD(4), oiD(12), oiD24, oiD(72), oiD(4) * Math.sign(mom4),
    b.funding, fundingMa3, b.funding - at(6).funding,
    longShare, longShare - (ls4 > 0 ? at(4).longU / ls4 : 0.5), longShare - (ls12 > 0 ? at(12).longU / ls12 : 0.5), Math.log10(Math.max(totU, 1)),
    takerImb(0), rata([0, 1, 2].map((k) => takerImb(k))),
    topShare, topShare - (ts4 > 0 ? at(4).topLong / ts4 : 0.5), topShare - (ts12 > 0 ? at(12).topLong / ts12 : 0.5),
    topShare - longShare, topAkunShare, topAkunShare - ta4Share,
    liqAsym4, liqAsym(4, 16), liqAsym4 - liqAsym(4, 16), liqAsym4 * Math.abs(liqAsym4),
    Math.log1p(liqLong4), Math.log1p(liqShort4),
    crowdLong, crowdShort,
    Math.max(0, 0.55 - longShare) * Math.max(0, (NEUTRAL_FUND - fundingMa3) * 4000) * (1 + Math.max(0, oiD24) * 20),
    Math.max(0, longShare - 0.45) * Math.max(0, (fundingMa3 - NEUTRAL_FUND) * 4000) * (1 + Math.max(0, oiD24) * 20),
    -oiD24, Math.max(0, oiD24) * Math.sign(mom4),
    Math.max(0, takerImb(0)) * Math.max(0, 1 - Math.abs(oiD24) * 25) * Math.max(0, 1 - Math.abs(mom4) * 50),
    extTop, extBottom,
  ];
  return x.map((v) => (v === null || !Number.isFinite(v) ? 0 : (v as number)));
}

function dbDi(bars: Bar[], i: number): number {
  const atr24 = rata([0, 1, 2, 3, 4, 5, 6, 7].map((k) => (bars[i - k].h - bars[i - k].l) / Math.max(bars[i - k].c, 1e-9)));
  return Math.min(DB_MAX, Math.max(DB_MIN, DB_KALI * atr24));
}
function label5(bars: Bar[], i: number) {
  const n = bars.length;
  const db = dbDi(bars, i);
  let sentuh: 1 | -1 | 0 = 0;
  for (let k = 1; k <= H; k++) {
    const r = bars[i + k].c / bars[i].c - 1;
    if (r >= db) { sentuh = 1; break; }
    if (r <= -db) { sentuh = -1; break; }
  }
  const fut6 = i + H < n ? bars[i + H].c / Math.max(bars[i].c, 1e-12) - 1 : 0;
  const tutup: 1 | -1 | 0 = i + H < n ? (fut6 >= db ? 1 : fut6 <= -db ? -1 : 0) : 0;
  let sLiq = 0, lLiq = 0;
  for (let k = 1; k <= H; k++) { sLiq += bars[i + k].liqShort; lLiq += bars[i + k].liqLong; }
  let korban: 1 | -1 | 0 = 0;
  if (sLiq >= KORBAN_MIN_USD && sLiq >= KORBAN_DOM * Math.max(lLiq, 1)) korban = 1;
  else if (lLiq >= KORBAN_MIN_USD && lLiq >= KORBAN_DOM * Math.max(sLiq, 1)) korban = -1;
  return { db, sentuh, tutup, fut6, korban, korbanUsd: [lLiq, sLiq] as [number, number] };
}

type Row = { koin: string; t: number; x: number[]; sentuh: 1 | -1 | 0; tutup: 1 | -1 | 0; korban: 1 | -1 | 0; fut6: number; db: number; korbanUsd: [number, number]; blok: number };
function kandidat(koin: string): Row[] {
  const bars = muat(koin);
  const out: Row[] = [];
  for (let i = 96; i + H < bars.length; i++) {
    const x = fitur5(bars, i);
    if (!x) continue;
    const lb = label5(bars, i);
    out.push({ koin, t: bars[i].t, x, sentuh: lb.sentuh, tutup: lb.tutup, korban: lb.korban, fut6: lb.fut6, db: lb.db, korbanUsd: lb.korbanUsd, blok: Math.floor(bars[i].t / 3600 / BLOK) });
  }
  return out;
}

const sigmoid = (z: number) => 1 / (1 + Math.exp(-Math.max(-30, Math.min(30, z))));
type ModelL = { w: number[]; b: number; mu: number[]; sig: number[]; thr: number };
function latih(X: number[][], y: number[], fMag: number[] | null, l2 = 0.02, iter = 3200, lr = 0.12): Omit<ModelL, 'thr'> {
  const d = X[0].length;
  const mu = Array.from({ length: d }, (_, j) => rata(X.map((r) => r[j])));
  const sig = Array.from({ length: d }, (_, j) => sd(X.map((r) => r[j])));
  const Z = X.map((r) => r.map((v, j) => (v - mu[j]) / sig[j]));
  const w = new Array(d).fill(0);
  let b = 0;
  const nPos = y.filter((v) => v > 0).length, nNeg = y.filter((v) => v < 0).length;
  const bobot = Z.map((_, k) => (fMag ? fMag[k] : 1) * (y[k] > 0 ? 0.5 / Math.max(nPos, 1) : 0.5 / Math.max(nNeg, 1)));
  const tot = bobot.reduce((a, v) => a + v, 0);
  for (let it = 0; it < iter; it++) {
    const gw = new Array(d).fill(0);
    let gb = 0;
    for (let k = 0; k < Z.length; k++) {
      const z = Z[k].reduce((s, v, j) => s + v * w[j], b);
      const p = sigmoid(z);
      const g = (p - (y[k] > 0 ? 1 : 0)) * (bobot[k] / tot);
      for (let j = 0; j < d; j++) gw[j] += g * Z[k][j];
      gb += g;
    }
    for (let j = 0; j < d; j++) w[j] -= lr * (gw[j] + l2 * w[j]);
    b -= lr * gb;
  }
  return { w, b, mu, sig };
}
const skorL = (m: Omit<ModelL, 'thr'>, x: number[]) => x.reduce((s, v, j) => s + ((v - m.mu[j]) / m.sig[j]) * m.w[j], m.b);
function cariThr(sk: number[], y: number[]) {
  let best = { thr: 0, acc: 0 };
  const uniq = [...sk].sort((a, b) => a - b);
  for (let i = Math.floor(uniq.length * 0.15); i < Math.floor(uniq.length * 0.85); i++) {
    const thr = uniq[i];
    let b = 0;
    for (let k = 0; k < y.length; k++) if ((sk[k] > thr ? 1 : -1) === y[k]) b++;
    if (b / y.length > best.acc) best = { thr, acc: b / y.length };
  }
  return best;
}

function evaluasiTabel(ms: Omit<ModelL, 'thr'> & { thr: number }, mt: Omit<ModelL, 'thr'> & { thr: number }, mk: Omit<ModelL, 'thr'> & { thr: number }, sets: Row[][], label: string) {
  const laporan: Record<string, number>[] = [];
  for (let r = 0; r < sets.length; r++) {
    const set = sets[r];
    const ss = set.map((r) => skorL(ms, r.x));
    const st = set.map((r) => skorL(mt, r.x));
    const sk = set.map((r) => skorL(mk, r.x));
    // ambang alarm = kuantil 88% dari |skor korban| dalam set (top 12% bar)
    const absSk = [...sk.map((v) => Math.abs(v))].sort((a, b) => a - b);
    const thrAlarm = absSk[Math.floor(absSk.length * 0.88)] ?? Infinity;
    let bS = 0, bT = 0, alarm = 0, alarmKena = 0, alarmArah = 0, nKor = 0, korBenar = 0, nKask = 0;
    for (let k = 0; k < set.length; k++) {
      if ((ss[k] > ms.thr ? 1 : -1) === set[k].sentuh) bS++;
      if ((st[k] > mt.thr ? 1 : -1) === set[k].tutup) bT++;
      if (set[k].korban !== 0) { nKor++; if ((sk[k] > mk.thr ? 1 : -1) === set[k].korban) korBenar++; nKask++; }
      // PORTAL ALARM: |skor| di kuantil atas — prediksi kaskade akan datang
      if (Math.abs(sk[k]) >= thrAlarm) {
        alarm++;
        if (set[k].korban !== 0 && Math.sign(sk[k]) === set[k].korban) alarmKena++;
        const arah = Math.sign(sk[k]);
        if (set[k].korban !== 0 && Math.sign(sk[k]) === set[k].korban && Math.sign(set[k].fut6) === arah) alarmArah++;
      }
    }
    const lapor = { ronde: r + 1, n: set.length, sentuh: bS / set.length, tutup: bT / set.length, korban: nKor ? korBenar / nKor : 0, nKor, alarmRate: alarm / set.length, alarmPresisi: alarm ? alarmKena / alarm : 0, alarmRecall: nKask ? laporan0(alarmKena, nKask) : 0, alarmArah: alarmKena ? alarmArah / alarmKena : 0, nKask };
    laporan.push(lapor);
    console.log(`[${label} ${r + 1}] n=${set.length} — sentuh ${(bS / set.length * 100).toFixed(1)}% · tutup ${(bT / set.length * 100).toFixed(1)}% · korban ${korBenar}/${nKor} = ${nKor ? (korBenar / nKor * 100).toFixed(1) : '—'}% · alarm ${(alarm / set.length * 100).toFixed(0)}% bar → kena kaskade+sisi ${alarm ? (alarmKena / alarm * 100).toFixed(1) : '—'}% · arah pasca-alarm ${alarmKena ? (alarmArah / alarmKena * 100).toFixed(1) : '—'}%`);
  }
  return laporan;
}
function laporan0(a: number, b: number) { return a / Math.max(b, 1); }

function semua() {
  const poolLatih: Row[] = [];
  const poolSegar: Row[] = [];
  for (const koin of KOIN_LATIH) for (const c of kandidat(koin)) (c.blok % 2 === 0 ? poolLatih : poolSegar).push(c);
  const latihS = poolLatih.filter((c) => c.sentuh !== 0);
  const latihT = poolLatih.filter((c) => c.tutup !== 0);
  const segarS = poolSegar.filter((c) => c.sentuh !== 0);
  const elsa = kandidat('ELSA');
  const elsaS = elsa.filter((c) => c.sentuh !== 0);
  const elsaT = elsa.filter((c) => c.tutup !== 0);
  console.log(`latih(S/T/K) ${latihS.length}/${latihT.length}/${poolLatih.filter((c) => c.korban !== 0).length} · segar ${segarS.length} · ELSA ${elsaS.length}`);

  const rk = poolLatih.filter((r) => r.korban !== 0);
  const magK = rk.map((r) => 0.5 + Math.min(Math.log10(1 + Math.max(...r.korbanUsd)) / 5, 2));
  const mkB = latih(rk.map((r) => r.x), rk.map((r) => r.korban), magK, 0.05);
  const magA = latihS.map((r) => 0.5 + Math.min(Math.abs(r.fut6) / Math.max(r.db, 1e-6), 3));
  const magT = latihT.map((r) => 0.5 + Math.min(Math.abs(r.fut6) / Math.max(r.db, 1e-6), 3));
  const msB = latih(latihS.map((r) => r.x), latihS.map((r) => r.sentuh), magA, 0.02);
  const mtB = latih(latihT.map((r) => r.x), latihT.map((r) => r.tutup), magT, 0.02);

  const rand = rng(SEED * 13);
  const segarAcak = segarS.map((v) => ({ v, r: rand() })).sort((a, b) => a.r - b.r).map((o) => o.v);
  const kalib = segarAcak.slice(0, 500);
  const sisa = segarAcak.slice(500);
  const thrS = cariThr(kalib.map((r) => skorL(msB, r.x)), kalib.map((r) => r.sentuh));
  const idxKalT = kalib.filter((r) => r.tutup !== 0);
  const thrT = cariThr(idxKalT.map((r) => skorL(mtB, r.x)), idxKalT.map((r) => r.tutup));
  const idxKalK = kalib.filter((r) => r.korban !== 0);
  const thrK = cariThr(idxKalK.map((r) => skorL(mkB, r.x)), idxKalK.map((r) => r.korban));
  console.log(`[KALIBRASI] sentuh ${(thrS.acc * 100).toFixed(1)}% · tutup ${(thrT.acc * 100).toFixed(1)}% (n=${idxKalT.length}) · korban ${(thrK.acc * 100).toFixed(1)}% (n=${idxKalK.length})`);
  const ms = { ...msB, thr: thrS.thr }, mt = { ...mtB, thr: thrT.thr }, mk = { ...mkB, thr: thrK.thr };

  const per = 500;
  const nR = Math.floor(sisa.length / per);
  const sets = Array.from({ length: nR }, (_, r) => sisa.slice(r * per, (r + 1) * per));
  const laporan = evaluasiTabel(ms, mt, mk, sets, 'RONDE');
  const rer = (k: string) => rata(laporan.map((l) => l[k]));
  console.log(`RERATA segar: sentuh ${(rer('sentuh') * 100).toFixed(1)}% · tutup ${(rer('tutup') * 100).toFixed(1)}% · korban ${(rata(laporan.filter((l) => l.nKor > 0).map((l) => l.korban)) * 100).toFixed(1)}% · alarm presisi ${(rer('alarmPresisi') * 100).toFixed(1)}% · arah pasca-alarm ${(rer('alarmArah') * 100).toFixed(1)}%`);

  const laporanElsa = evaluasiTabel(ms, mt, mk, [elsaS], 'ELSA-BUTA');

  // ---------- MODEL PRODUKSI (walk-forward legal: semua masa lalu) ----------
  const rk2 = [...poolLatih, ...poolSegar, ...elsa].filter((r) => r.korban !== 0);
  const magK2 = rk2.map((r) => 0.5 + Math.min(Math.log10(1 + Math.max(...r.korbanUsd)) / 5, 2));
  const mkProd = latih(rk2.map((r) => r.x), rk2.map((r) => r.korban), magK2, 0.05);
  const latihS2 = [...poolLatih, ...poolSegar, ...elsa].filter((c) => c.sentuh !== 0);
  const latihT2 = [...poolLatih, ...poolSegar, ...elsa].filter((c) => c.tutup !== 0);
  const magA2 = latihS2.map((r) => 0.5 + Math.min(Math.abs(r.fut6) / Math.max(r.db, 1e-6), 3));
  const magT2 = latihT2.map((r) => 0.5 + Math.min(Math.abs(r.fut6) / Math.max(r.db, 1e-6), 3));
  const msProd = latih(latihS2.map((r) => r.x), latihS2.map((r) => r.sentuh), magA2, 0.02);
  const mtProd = latih(latihT2.map((r) => r.x), latihT2.map((r) => r.tutup), magT2, 0.02);
  console.log(`model produksi: dilatih pada ${latihS2.length} baris sentuh + ${rk2.length} episode kaskade (semua koin, masa lalu penuh)`);

  // ---------- UJI WALK-FORWARD ELSA: 500 jam terakhir dikeluarkan dari latihan ----------
  const elsaSort = [...elsa].sort((a, b) => a.t - b.t);
  const elsaUji = elsaSort.slice(-500);
  const elsaLatih = elsaSort.slice(0, elsaSort.length - 500);
  const rkWf = [...poolLatih, ...poolSegar, ...elsaLatih].filter((r) => r.korban !== 0);
  const magKWf = rkWf.map((r) => 0.5 + Math.min(Math.log10(1 + Math.max(...r.korbanUsd)) / 5, 2));
  const mkWf = latih(rkWf.map((r) => r.x), rkWf.map((r) => r.korban), magKWf, 0.05);
  const laporanWf = evaluasiTabel({ ...msProd, thr: thrS.thr }, { ...mtProd, thr: thrT.thr }, { ...mkWf, thr: thrK.thr }, [elsaUji], 'ELSA-WALKFWD');

  // fitur penting
  const bobotT = ms.w.map((w, j) => ({ f: FITUR5[j], w })).sort((a, b) => Math.abs(b.w) - Math.abs(a.w)).slice(0, 14);
  const bobotK = mk.w.map((w, j) => ({ f: FITUR5[j], w })).sort((a, b) => Math.abs(b.w) - Math.abs(a.w)).slice(0, 12);
  console.log('bobot arah teratas:', bobotT.map((b) => `${b.f}:${b.w.toFixed(3)}`).join(' · '));
  console.log('bobot korban teratas:', bobotK.map((b) => `${b.f}:${b.w.toFixed(3)}`).join(' · '));

  fs.writeFileSync(`${DIR}/model_prod.json`, JSON.stringify({
    fitur: FITUR5, ms: { ...msProd, thr: thrS.thr }, mt: { ...mtProd, thr: thrT.thr }, mk: { ...mkProd, thr: thrK.thr },
    meta: { dilatih: latihS2.length, kaskade: rk2.length, thr: { sentuh: thrS.thr, tutup: thrT.thr, korban: thrK.thr } },
  }));
  fs.writeFileSync(`${DIR}/laporan5.json`, JSON.stringify({
    kalib: { sentuh: thrS, tutup: thrT, korban: thrK, nKor: idxKalK.length },
    ronde: laporan, rerata: {
      sentuh: rer('sentuh'), tutup: rer('tutup'), korban: rata(laporan.filter((l) => l.nKor > 0).map((l) => l.korban)),
      alarmPresisi: rer('alarmPresisi'), alarmRate: rer('alarmRate'), alarmArah: rer('alarmArah'),
    },
    elsaButa: laporanElsa[0], walkforwardElsa: laporanWf[0], bobot: { arah: bobotT, korban: bobotK }, waktu: new Date().toISOString(),
  }, null, 1));
  console.log('SELESAI — model_prod.json & laporan5.json tersimpan');
}

semua();
