// ============================================================
// MICAPROFITA-ELSA · 7 MESIN WARISAN SAKTI (adaptasi satu koin
// dari organ warisan arena sumber: GARCH, beta, POC/VA, divRSI,
// kejut-pump, posisi-rentang, Monte Carlo pra-registrasi).
// ============================================================
import { Candle, mean, stdev, rsi, atr } from './indicators';

// ---------- PRNG deterministik berbibit (xorshift32) ----------
export function mulberry32(seedHex: string) {
  let a = parseInt(seedHex.slice(0, 8), 16) >>> 0;
  if (!a) a = 0x9e3779b9;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function gaussOf(rnd: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ---------- GARCH(1,1) MLE-grid (α=0.12 β=0.8 jangkar Bollerslev 1986) ----------
export function garch11(cs: Candle[]) {
  const rets: number[] = [];
  for (let i = 1; i < cs.length; i++) rets.push((cs[i].c - cs[i - 1].c) / cs[i - 1].c);
  const n = rets.length;
  if (n < 20) return { sigma24jPct: 2, modelVol: 'GARCH(1,1) MLE-grid — data kurang', persistensi: 0.92, alpha: 0.12, beta: 0.8 };
  const var0 = stdev(rets) ** 2;
  let best = { ll: -Infinity, a: 0.12, b: 0.8 };
  for (const a of [0.06, 0.09, 0.12, 0.15, 0.2]) {
    for (const b of [0.7, 0.75, 0.8, 0.85, 0.9]) {
      let v = var0;
      let ll = 0;
      for (const r of rets) {
        v = (1 - a - b) * var0 + a * r * r + b * v;
        ll += -0.5 * (Math.log(2 * Math.PI * v) + (r * r) / Math.max(v, 1e-12));
      }
      if (ll > best.ll) best = { ll, a, b };
    }
  }
  let v = var0;
  for (const r of rets) v = (1 - best.a - best.b) * var0 + best.a * r * r + best.b * v;
  const sigma24jPct = Math.sqrt(v) * 100;
  return {
    sigma24jPct: Math.round(sigma24jPct * 100) / 100,
    modelVol: `GARCH(1,1) MLE-grid — α=${best.a} β=${best.b} (Bollerslev 1986)`,
    persistensi: Math.round((best.a + best.b) * 100) / 100,
    alpha: best.a,
    beta: best.b,
  };
}

// ---------- Beta vs BTC + R² ----------
export function betaVsBtc(cs: Candle[], btc: Candle[]) {
  const n = Math.min(cs.length, btc.length);
  if (n < 20) return { beta: 0, r2: 0 };
  const rE: number[] = [];
  const rB: number[] = [];
  for (let i = 1; i < n; i++) {
    rE.push((cs[i].c - cs[i - 1].c) / cs[i - 1].c);
    rB.push((btc[i].c - btc[i - 1].c) / btc[i - 1].c);
  }
  const mb = mean(rB);
  const me = mean(rE);
  let cov = 0;
  let varB = 0;
  for (let i = 0; i < rE.length; i++) {
    cov += (rE[i] - me) * (rB[i] - mb);
    varB += (rB[i] - mb) ** 2;
  }
  const beta = varB > 1e-15 ? cov / varB : 0;
  let varE = 0;
  for (const r of rE) varE += (r - me) ** 2;
  const corr = Math.sqrt(varB * varE) > 1e-15 ? cov / Math.sqrt(varB * varE) : 0;
  return { beta: Math.round(beta * 100) / 100, r2: Math.round(corr * corr * 1000) / 1000 };
}

// ---------- Profil volume: POC + Value Area 70% ----------
export function profilVolume(cs: Candle[]) {
  const win = cs.slice(-48);
  const bins = 24;
  const lo = Math.min(...win.map((c) => c.l));
  const hi = Math.max(...win.map((c) => c.h));
  const step = Math.max((hi - lo) / bins, 1e-12);
  const vol = new Array<number>(bins).fill(0);
  for (const c of win) {
    const tp = (c.h + c.l + c.c) / 3;
    const idx = Math.min(bins - 1, Math.max(0, Math.floor((tp - lo) / step)));
    vol[idx] += c.v;
  }
  const total = vol.reduce((s, x) => s + x, 0);
  if (total <= 0) return { poc: cs[cs.length - 1].c, vaLo: lo, vaHi: hi, ket: 'profil volume kosong' };
  const pocIdx = vol.indexOf(Math.max(...vol));
  const poc = lo + (pocIdx + 0.5) * step;
  let acc = vol[pocIdx];
  let lo_i = pocIdx;
  let hi_i = pocIdx;
  while (acc < total * 0.7 && (lo_i > 0 || hi_i < bins - 1)) {
    const below = lo_i > 0 ? vol[lo_i - 1] : -1;
    const above = hi_i < bins - 1 ? vol[hi_i + 1] : -1;
    if (above >= below) {
      hi_i++;
      acc += Math.max(above, 0);
    } else {
      lo_i--;
      acc += Math.max(below, 0);
    }
  }
  return {
    poc,
    vaLo: lo + lo_i * step,
    vaHi: lo + (hi_i + 1) * step,
    ket: `POC ${poc.toFixed(4)} · VA ${ (lo + lo_i * step).toFixed(4) }–${(lo + (hi_i + 1) * step).toFixed(4)} (70% volume 48 jam)`,
  };
}

// ---------- Divergensi RSI ----------
export function divRsi(cs: Candle[]) {
  const rsiA = rsi(cs.map((c) => c.c), 14);
  const n = cs.length;
  const pivH: number[] = [];
  const pivL: number[] = [];
  for (let i = 2; i < n - 2; i++) {
    if (cs[i].h > cs[i - 1].h && cs[i].h > cs[i - 2].h && cs[i].h > cs[i + 1].h && cs[i].h > cs[i + 2].h) pivH.push(i);
    if (cs[i].l < cs[i - 1].l && cs[i].l < cs[i - 2].l && cs[i].l < cs[i + 1].l && cs[i].l < cs[i + 2].l) pivL.push(i);
  }
  let bearish = false;
  let bullish = false;
  if (pivH.length >= 2) {
    const a = pivH[pivH.length - 2];
    const b = pivH[pivH.length - 1];
    if (cs[b].h > cs[a].h && rsiA[b] < rsiA[a] - 2) bearish = true;
  }
  if (pivL.length >= 2) {
    const a = pivL[pivL.length - 2];
    const b = pivL[pivL.length - 1];
    if (cs[b].l < cs[a].l && rsiA[b] > rsiA[a] + 2) bullish = true;
  }
  const ket = bearish
    ? 'divergensi bearish — puncak lebih tinggi, RSI lebih rendah (momentum melemah)'
    : bullish
      ? 'divergensi bullish — dasar lebih rendah, RSI lebih tinggi (momentum menguat)'
      : 'tanpa divergensi RSI terbaca';
  return { bearish, bullish, ket };
}

// ---------- Kejut 6 jam vs sigma-GARCH (pelajaran false-breakout 100/100) ----------
export function kejutPump(cs6h: Candle[], sigma24jPct: number) {
  const n = cs6h.length;
  if (n < 4) return { pump: false, ket: 'data 6 jam tak cukup' };
  const last6 = cs6h.slice(-4); // 4 × 6h ≈ 24 jam? — 6 kandle = 1.5 hari; pakai 4 terakhir = 1 hari
  const move6jPct = ((last6[last6.length - 1].c - last6[0].c) / last6[0].c) * 100;
  const hi6 = Math.max(...last6.map((c) => c.h));
  const lo6 = Math.min(...last6.map((c) => c.l));
  const rangePos = (last6[last6.length - 1].c - lo6) / Math.max(hi6 - lo6, 1e-12);
  const volAvg = mean(cs6h.slice(-30).map((c) => c.v));
  const volSpike = volAvg > 0 ? last6[last6.length - 1].v / volAvg : 1;
  const sigmaMultiple = sigma24jPct > 0 ? move6jPct / Math.max(sigma24jPct / Math.sqrt(4), 1e-9) : 0;
  const pump = move6jPct > 4 && sigmaMultiple >= 2.2 && rangePos >= 0.85 && volSpike >= 1.6;
  const ket = pump
    ? `lonjakan 6 jam ${move6jPct.toFixed(1)}% = ${sigmaMultiple.toFixed(1)}× sigma-GARCH, posisi ${(rangePos * 100).toFixed(0)}% rentang, volume ${volSpike.toFixed(1)}× rata — kejar-top ditolak (pelajaran false-breakout 100/100)`
    : `lonjakan 6 jam ${move6jPct.toFixed(1)}% = ${sigmaMultiple.toFixed(1)}× sigma-GARCH, posisi ${(rangePos * 100).toFixed(0)}% rentang, volume ${volSpike.toFixed(1)}× rata — tanpa jejak kejar-top`;
  return { pump, move6jPct: Math.round(move6jPct * 100) / 100, sigmaMultiple: Math.round(sigmaMultiple * 10) / 10, posisiRentang: Math.round(rangePos * 1000) / 1000, volSpike: Math.round(volSpike * 100) / 100, ket };
}

// ---------- Monte Carlo pra-registrasi (2000 lintasan × 24 langkah, GBM berbibit) ----------
export type McResult = {
  lintasan: number;
  langkah: number;
  seedHex: string;
  pTarget: number;
  pStop: number;
  pAmbisius: number;
  pNaik: number;
  medianaEkskursiPct: number;
  ket: string;
};

export function monteCarlo(opts: {
  entry: number; sigma24jPct: number; targetPct: number; stopPct: number; ambisiusPct: number;
  seedHex: string; driftPct?: number; lintasan?: number; langkah?: number; arah?: 'BUY' | 'SELL';
}): McResult {
  const lintasan = opts.lintasan ?? 2000;
  const langkah = opts.langkah ?? 24;
  const arah = opts.arah ?? 'BUY';
  const rnd = mulberry32(opts.seedHex);
  const g = gaussOf(rnd);
  void g;
  const sigmaStep = Math.max(opts.sigma24jPct, 0.15) / 100 / Math.sqrt(langkah);
  const mu = (opts.driftPct ?? 0) / 100 / langkah;
  let kenaTarget = 0;
  let kenaStop = 0;
  let kenaAmbisius = 0;
  let naikAkhir = 0;
  const ekskursi: number[] = [];
  for (let i = 0; i < lintasan; i++) {
    let p = opts.entry;
    let hitT = false;
    let hitS = false;
    let hitA = false;
    let favMax = 0; // ekskursi searah rencana (favorable)
    for (let s = 0; s < langkah; s++) {
      p = p * (1 + mu + sigmaStep * gaussOf(rnd));
      const move = ((p - opts.entry) / opts.entry) * 100;
      const fav = arah === 'BUY' ? move : -move;
      favMax = Math.max(favMax, fav);
      if (!hitT && fav >= opts.targetPct) hitT = true;
      if (!hitA && fav >= opts.ambisiusPct) hitA = true;
      if (!hitS && fav <= -opts.stopPct) hitS = true;
    }
    if (hitT) kenaTarget++;
    if (hitS) kenaStop++;
    if (hitA) kenaAmbisius++;
    if (p > opts.entry) naikAkhir++;
    ekskursi.push(favMax);
  }
  ekskursi.sort((a, b) => a - b);
  const mediana = ekskursi[Math.floor(ekskursi.length / 2)];
  return {
    lintasan, langkah, seedHex: opts.seedHex,
    pTarget: Math.round((kenaTarget / lintasan) * 1000) / 1000,
    pStop: Math.round((kenaStop / lintasan) * 1000) / 1000,
    pAmbisius: Math.round((kenaAmbisius / lintasan) * 1000) / 1000,
    pNaik: Math.round((naikAkhir / lintasan) * 1000) / 1000,
    medianaEkskursiPct: Math.round(mediana * 100) / 100,
    ket: 'peluang Monte Carlo PRA-REGISTRASI berbibit (direproduksi ulang = angka sama) — dinilai medan saat horizon habis',
  };
}

// ---------- ATR% harian ----------
export function atrPctOf(cs: Candle[], period = 14) {
  const atrA = atr(cs, period);
  const price = cs[cs.length - 1].c;
  return Math.round((atrA[atrA.length - 1] / price) * 1000) / 10;
}
