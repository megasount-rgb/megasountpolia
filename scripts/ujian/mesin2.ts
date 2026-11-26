// ============================================================
// UJIAN v2 · MESIN UJI ALIRAN — cascade-aware.
// Pembelajaran dari v1: sinyal naive (kerumunan ekstrem, whale
// tilt, OI tumbuh) hanya ~50% — fallacy. Yang TERBUKTI bisa
// dibaca: pendekatan & terpicunya kaskade likuidasi (hukum kasus:
// banjir short → naik 75%, banjir long → turun 80%).
// v2 = fitur kaskade + Real AdaBoost (stump depth-2) + kalibrasi
// threshold pada ronde kalibrasi, evaluasi pada soal-soal segar.
// Jalankan: bun scripts/ujian/mesin2.ts semua
// ============================================================
import fs from 'fs';

const DIR = '/home/z/my-project/db/aliran';
const KOIN_LATIH = ['EVAA', 'PIEVERSE', 'AGT'] as const;
const SEED = 20261124;
const H = 6; // horizon utama
const H2 = 12; // horizon sekunder
const DB_MIN = 0.008, DB_MAX = 0.025;
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

function muat(koin: string): Bar[] {
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
  return bars;
}

// ---------------- fitur v2 (~42) ----------------
export const FITUR2 = [
  'mom1', 'mom2', 'mom4', 'mom12', 'mom24', 'mom48',
  'rangePos24', 'distHi72', 'distLo72', 'atr24',
  'volZ', 'volClimax', 'body1', 'wickUp', 'wickDn', 'consec4',
  'oiD1', 'oiD2', 'oiD4', 'oiD12', 'oiD24', 'oiD72',
  'funding', 'fundingMa3', 'fundingDelta6',
  'longShare', 'dLongShare4', 'dLongShare12', 'logOrang',
  'takerImb', 'takerImbMa3',
  'topShare', 'dTopShare4', 'dTopShare12', 'whaleVsCrowd', 'topAkunShare',
  'liqAsym4', 'liqAsym12', 'liqFresh', 'liqLong4log', 'liqShort4log',
  'crowdLong', 'crowdShort', 'fuelShort', 'fuelLong', 'delever', 'contOIRah', 'akumSenyap', 'extTop', 'extBottom',
];

export function fitur2(bars: Bar[], i: number): number[] | null {
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
  return [
    mom(1), mom(2), mom4, mom(12), mom24, mom(48),
    rangePos24, (hi72 - harga) / harga, (harga - lo72) / harga, atr24,
    volZ, volZ * Math.abs(mom(1)) / atr24, body1, wickUp, wickDn, consec / 4,
    oiD(1), oiD(2), oiD(4), oiD(12), oiD24, oiD(72),
    b.funding, fundingMa3, b.funding - at(6).funding,
    longShare, longShare - (ls4 > 0 ? at(4).longU / ls4 : 0.5), longShare - (ls12 > 0 ? at(12).longU / ls12 : 0.5), Math.log10(Math.max(totU, 1)),
    takerImb(0), rata([0, 1, 2].map((k) => takerImb(k))),
    topShare, topShare - (ts4 > 0 ? at(4).topLong / ts4 : 0.5), topShare - (ts12 > 0 ? at(12).topLong / ts12 : 0.5),
    topShare - longShare, (b.topLongAkun + b.topShortAkun) > 0 ? b.topLongAkun / (b.topLongAkun + b.topShortAkun) : 0.5,
    liqAsym(0, 4), liqAsym(4, 16), liqAsym(0, 4) - liqAsym(4, 16),
    Math.log1p(liqLong4), Math.log1p(liqShort4),
    crowdLong, crowdShort,
    Math.max(0, 0.55 - longShare) * Math.max(0, (NEUTRAL_FUND - fundingMa3) * 4000) * (1 + Math.max(0, oiD24) * 20),
    Math.max(0, longShare - 0.45) * Math.max(0, (fundingMa3 - NEUTRAL_FUND) * 4000) * (1 + Math.max(0, oiD24) * 20),
    -oiD24, Math.max(0, oiD24) * Math.sign(mom4),
    Math.max(0, takerImb(0)) * Math.max(0, 1 - Math.abs(oiD24) * 25) * Math.max(0, 1 - Math.abs(mom4) * 50),
    Math.max(0, rangePos24 - 0.7) * (1 + Math.max(0, mom24) * 10),
    Math.max(0, 0.3 - rangePos24) * (1 + Math.max(0, -mom24) * 10),
  ];
}

// ---------------- label ----------------
function label2(bars: Bar[], i: number) {
  const n = bars.length;
  const fut6 = i + H < n ? bars[i + H].c / Math.max(bars[i].c, 1e-12) - 1 : 0;
  const fut12 = i + H2 < n ? bars[i + H2].c / Math.max(bars[i].c, 1e-12) - 1 : 0;
  const atr24 = rata([0, 1, 2, 3, 4, 5, 6, 7].map((k) => (bars[i - k].h - bars[i - k].l) / Math.max(bars[i - k].c, 1e-9)));
  const db = Math.min(DB_MAX, Math.max(DB_MIN, 0.35 * atr24));
  const arah6: 1 | -1 | 0 = fut6 >= db ? 1 : fut6 <= -db ? -1 : 0;
  const arah12: 1 | -1 | 0 = fut12 >= db ? 1 : fut12 <= -db ? -1 : 0;
  let sLiq = 0, lLiq = 0;
  for (let k = 1; k <= H; k++) { sLiq += bars[i + k].liqShort; lLiq += bars[i + k].liqLong; }
  let korban: 1 | -1 | 0 = 0;
  if (sLiq >= KORBAN_MIN_USD && sLiq >= KORBAN_DOM * Math.max(lLiq, 1)) korban = 1;
  else if (lLiq >= KORBAN_MIN_USD && lLiq >= KORBAN_DOM * Math.max(sLiq, 1)) korban = -1;
  return { fut6, fut12, db, arah6, arah12, korban, liqUsd: [lLiq, sLiq] as [number, number] };
}

type Row = { koin: string; t: number; i: number; x: number[]; arah6: 1 | -1 | 0; arah12: 1 | -1 | 0; korban: 1 | -1 | 0; fut6: number; fut12: number; db: number; blok: number };

function kandidat(koin: string): Row[] {
  const bars = muat(koin);
  const out: Row[] = [];
  for (let i = 96; i + H2 < bars.length; i++) {
    const x = fitur2(bars, i);
    if (!x) continue;
    const lb = label2(bars, i);
    out.push({ koin, t: bars[i].t, i, x, arah6: lb.arah6, arah12: lb.arah12, korban: lb.korban, fut6: lb.fut6, fut12: lb.fut12, db: lb.db, blok: Math.floor(bars[i].t / 3600 / BLOK) });
  }
  return out;
}

// ---------------- Real AdaBoost — stump depth-2 ----------------
type Stump = { f: number; thr: number; left: { f2: number; thr2: number; hL: number; hR: number } | null; hL: number; hR: number };
type Model2 = { stumps: Stump[]; fitur: string[]; thrPutus: number; horizon: string };

function kuantil(a: number[], q: number): number {
  const s = [...a].sort((x, y) => x - y);
  return s[Math.min(s.length - 1, Math.max(0, Math.floor(q * (s.length - 1))))];
}

function pilihStump(X: number[][], y: number[], w: number[], idx: number[], thrPerFeat: number[][]): { f: number; thr: number; err: number; pred: (xi: number[]) => -1 | 1 } | null {
  let best: { f: number; thr: number; err: number; pred: (xi: number[]) => -1 | 1 } | null = null;
  const D = X[0].length;
  for (let f = 0; f < D; f++) {
    const thrs = thrPerFeat[f];
    for (const thr of thrs) {
      for (const pola of [-1, 1] as const) {
        let err = 0;
        for (const k of idx) err += w[k] * (pola * (X[k][f] <= thr ? 1 : -1) !== y[k] ? 1 : 0);
        if (!best || err < best.err) {
          best = { f, thr, err, pred: (xi: number[]) => (pola * (xi[f] <= thr ? 1 : -1)) as -1 | 1 };
        }
      }
    }
  }
  return best;
}

function fitStump(X: number[][], y: number[], w: number[], idx: number[], thrPerFeat: number[][]): Stump {
  const root = pilihStump(X, y, w, idx, thrPerFeat)!;
  const kiri = idx.filter((k) => X[k][root.f] <= root.thr);
  const kanan = idx.filter((k) => X[k][root.f] > root.thr);
  const leaf = (subset: number[]) => {
    let Wp = 0, Wm = 0;
    for (const k of subset) (y[k] > 0 ? (Wp += w[k]) : (Wm += w[k]));
    const p = Math.min(Math.max(Wp / Math.max(Wp + Wm, 1e-12), 1e-4), 1 - 1e-4);
    return 0.5 * Math.log(p / (1 - p));
  };
  let stump: Stump = { f: root.f, thr: root.thr, left: null, hL: leaf(kiri), hR: leaf(kanan) };
  // level-2 pada cabang besar saja (hemat & anti overfit cabang kecil)
  if (kiri.length >= 80 && kiri.length >= kanan.length) {
    const s2 = pilihStump(X, y, w, kiri, thrPerFeat);
    if (s2) {
      const k2 = kiri.filter((k) => X[k][s2.f] <= s2.thr);
      const k3 = kiri.filter((k) => X[k][s2.f] > s2.thr);
      stump = { f: root.f, thr: root.thr, left: { f2: s2.f, thr2: s2.thr, hL: leaf(k2), hR: leaf(k3) }, hL: leaf(kanan), hR: leaf(kanan) };
    }
  } else if (kanan.length >= 80) {
    const s2 = pilihStump(X, y, w, kanan, thrPerFeat);
    if (s2) {
      const k2 = kanan.filter((k) => X[k][s2.f] <= s2.thr);
      const k3 = kanan.filter((k) => X[k][s2.f] > s2.thr);
      stump = { f: root.f, thr: root.thr, left: null, hL: leaf(kiri), hR: 0, ...({}) } as Stump;
      stump.left = { f2: 0, thr2: 0, hL: 0, hR: 0 }; // tak dipakai
      stump = { f: root.f, thr: root.thr, left: { f2: s2.f, thr2: s2.thr, hL: leaf(k2), hR: leaf(k3) }, hL: leaf(kiri), hR: leaf(kiri) };
    }
  }
  return stump;
}
function nilaiStump(s: Stump, xi: number[]): number {
  if (xi[s.f] <= s.thr) {
    if (s.left && xi[s.left.f2] <= s.left.thr2) return s.left.hL;
    if (s.left) return s.left.hR;
    return s.hL;
  }
  return s.hR;
}
function latihBoost(X: number[][], y: number[], T = 220, shrink = 0.35): { stumps: Stump[]; F: (xi: number[]) => number } {
  const n = X.length;
  const w = new Array(n).fill(1 / n);
  const thrPerFeat: number[][] = [];
  const D = X[0].length;
  for (let f = 0; f < D; f++) thrPerFeat.push([0.08, 0.2, 0.35, 0.5, 0.65, 0.8, 0.92].map((q) => kuantil(X.map((r) => r[f]), q)));
  const stumps: Stump[] = [];
  const Fbuf = new Array(n).fill(0);
  const idxSemua = Array.from({ length: n }, (_, k) => k);
  for (let t = 0; t < T; t++) {
    const s = fitStump(X, y, w, idxSemua, thrPerFeat);
    let err = 0;
    for (let k = 0; k < n; k++) { const h = nilaiStump(s, X[k]) * shrink; Fbuf[k] += h; if (Math.sign(h || 1) !== y[k]) err += w[k]; }
    for (let k = 0; k < n; k++) w[k] *= Math.exp(-y[k] * nilaiStump(s, X[k]) * shrink);
    const Z = w.reduce((a, v) => a + v, 0);
    for (let k = 0; k < n; k++) w[k] /= Z;
    stumps.push(s);
    if (err > 0.5) break;
  }
  return { stumps, F: (xi: number[]) => stumps.reduce((a, s) => a + nilaiStump(s, xi), 0) };
}

// ---------------- utama ----------------
function semua() {
  const poolLatih: Row[] = [];
  const poolSegar: Row[] = [];
  for (const koin of KOIN_LATIH) {
    for (const c of kandidat(koin)) {
      if (c.arah6 !== 0) (c.blok % 2 === 0 ? poolLatih : poolSegar).push(c);
    }
  }
  const elsa = kandidat('ELSA').filter((c) => c.arah6 !== 0);
  console.log(`pool latih ${poolLatih.length} · segar ${poolSegar.length} · ELSA ${elsa.length}`);

  const Xl = poolLatih.map((r) => r.x);
  // --- model korban (kaskade) ---
  const rk = poolLatih.filter((r) => r.korban !== 0);
  const mk = latihBoost(rk.map((r) => r.x), rk.map((r) => r.korban));
  console.log(`[korban] dilatih pada ${rk.length} episode kaskade`);
  // --- model arah 6j & 12j dgn fitur korbanP (stacking) ---
  const XlK = Xl.map((x) => [...x, mk.F(x)]);
  const m6 = latihBoost(XlK, poolLatih.map((r) => r.arah6));
  const m12 = latihBoost(XlK, poolLatih.map((r) => r.arah12));
  const predA6 = (x: number[]) => mk.F(x.slice(0, FITUR2.length)) + 0; // korbanP
  void predA6;

  // kalibrasi threshold pada ronde 1 (dinyatakan terbuka sebagai set kalibrasi)
  const rand = rng(SEED * 13);
  const segarAcak = poolSegar.map((v) => ({ v, r: rand() })).sort((a, b) => a.r - b.r).map((o) => o.v);
  const kalib = segarAcak.slice(0, 500);
  const sisa = segarAcak.slice(500);
  const skor = (m: { stumps: Stump[] }, x: number[]) => m.stumps.reduce((a, s) => a + nilaiStump(s, x), 0);
  const xkal = kalib.map((r) => [...r.x, skor(mk, r.x)]);
  const pKal6 = xkal.map((x) => skor(m6, x));
  const pKal12 = xkal.map((x) => skor(m12, x));
  const yKal = kalib.map((r) => r.arah6);
  const yKal12 = kalib.map((r) => r.arah12);
  const cariThr = (sk: number[], y: number[]) => {
    let best = { thr: 0, acc: 0 };
    const uniq = [...sk].sort((a, b) => a - b);
    for (let i = Math.floor(uniq.length * 0.2); i < Math.floor(uniq.length * 0.8); i++) {
      const thr = uniq[i];
      let b = 0;
      for (let k = 0; k < y.length; k++) if ((sk[k] > thr ? 1 : -1) === y[k]) b++;
      if (b / y.length > best.acc) best = { thr, acc: b / y.length };
    }
    return best;
  };
  const thr6 = cariThr(pKal6, yKal);
  const thr12 = cariThr(pKal12, yKal12);
  console.log(`kalibrasi ronde-0: thr6 ${thr6.thr.toFixed(3)} (acc ${(thr6.acc * 100).toFixed(1)}%) · thr12 ${thr12.thr.toFixed(3)} (acc ${(thr12.acc * 100).toFixed(1)}%)`);

  // evaluasi pada ronde-ronde soal segar (masing 500 soal BARU)
  const per = 500;
  const nRonde = Math.floor(sisa.length / per);
  const laporan: Record<string, unknown>[] = [];
  for (let r = 0; r < nRonde; r++) {
    const set = sisa.slice(r * per, (r + 1) * per);
    const ev = (sk: number[], y: number[], thr: number) => {
      let b = 0;
      for (let k = 0; k < y.length; k++) if ((sk[k] > thr ? 1 : -1) === y[k]) b++;
      return { n: y.length, benar: b, acc: b / y.length };
    };
    const s6 = set.map((r) => skor(m6, [...r.x, skor(mk, r.x)]));
    const s12 = set.map((r) => skor(m12, [...r.x, skor(mk, r.x)]));
    const k6 = set.filter((r) => r.korban !== 0);
    const sk = set.map((r) => skor(mk, r.x));
    const idxK = set.map((r) => r.korban).map((v, i) => ({ v, i })).filter((o) => o.v !== 0);
    let korB = 0;
    for (const o of idxK) if ((sk[o.i] > 0 ? 1 : -1) === o.v) korB++;
    const a6 = ev(s6, set.map((r) => r.arah6), thr6.thr);
    const a12 = ev(s12, set.map((r) => r.arah12), thr12.thr);
    const blend = ev(s6.map((v, i) => v + s12[i]), set.map((r) => (r.arah6 + r.arah12) / 2 === 0 ? 1 : (r.arah6 + r.arah12)), (thr6.thr + thr12.thr) / 2);
    laporan.push({ ronde: r + 1, arah6: a6, arah12: a12, blend, korban: { n: idxK.length, benar: korB, acc: idxK.length ? korB / idxK.length : 0 } });
    console.log(`[RONDE ${r + 1}] 500 soal baru — arah6 ${(a6.acc * 100).toFixed(1)}% · arah12 ${(a12.acc * 100).toFixed(1)}% · blend ${(blend.acc * 100).toFixed(1)}% · korban ${korB}/${idxK.length} = ${idxK.length ? ((korB / idxK.length) * 100).toFixed(1) : '—'}%`);
  }
  const rer = (k: string) => rata(laporan.map((l) => (l[k] as { acc: number }).acc));
  console.log(`RERATA segar: arah6 ${(rer('arah6') * 100).toFixed(1)}% · arah12 ${(rer('arah12') * 100).toFixed(1)}% · blend ${(rer('blend') * 100).toFixed(1)}%`);

  // FINAL ELSA
  const sE = elsa.map((r) => skor(m6, [...r.x, skor(mk, r.x)]));
  const sE12 = elsa.map((r) => skor(m12, [...r.x, skor(mk, r.x)]));
  const yE = elsa.map((r) => r.arah6);
  const yE12 = elsa.map((r) => r.arah12);
  const e6 = { n: yE.length, benar: sE.filter((v, i) => (v > thr6.thr ? 1 : -1) === yE[i]).length };
  const e12 = { n: yE12.length, benar: sE12.filter((v, i) => (v > thr12.thr ? 1 : -1) === yE12[i]).length };
  const yEk = elsa.filter((r) => r.korban !== 0);
  const sEk = elsa.map((r) => skor(mk, r.x));
  const yEkV = elsa.map((r) => r.korban).map((v, i) => ({ v, i })).filter((o) => o.v !== 0);
  const ekB = yEkV.filter((o) => (sEk[o.i] > 0 ? 1 : -1) === o.v).length;
  console.log(`[FINAL ELSA] arah6 ${e6.benar}/${e6.n} = ${((e6.benar / e6.n) * 100).toFixed(1)}% · arah12 ${e12.benar}/${e12.n} = ${((e12.benar / e12.n) * 100).toFixed(1)}% · korban ${ekB}/${yEkV.length} = ${yEkV.length ? ((ekB / yEkV.length) * 100).toFixed(1) : '—'}%`);

  // fitur penting
  const pakai = new Map<number, number>();
  for (const s of m6.stumps) pakai.set(s.f, (pakai.get(s.f) ?? 0) + 1);
  const penting = [...pakai.entries()].map(([f, c]) => ({ f: FITUR2[f] ?? 'korbanP', c })).sort((a, b) => b.c - a.c).slice(0, 14);
  console.log('fitur terpakai:', penting.map((p) => `${p.f}:${p.c}`).join(' · '));

  fs.writeFileSync(`${DIR}/model2.json`, JSON.stringify({
    fitur: FITUR2, mk: mk.stumps, m6: m6.stumps, m12: m12.stumps, thr6: thr6.thr, thr12: thr12.thr,
  }));
  fs.writeFileSync(`${DIR}/laporan2.json`, JSON.stringify({ kalib: { thr6, thr12 }, ronde: laporan, rerata: { arah6: rer('arah6'), arah12: rer('arah12'), blend: rer('blend') }, elsa: { arah6: { ...e6, acc: e6.benar / e6.n }, arah12: { ...e12, acc: e12.benar / e12.n }, korban: { n: yEkV.length, benar: ekB, acc: yEkV.length ? ekB / yEkV.length : 0 } }, penting, waktu: new Date().toISOString() }, null, 1));
}

semua();
