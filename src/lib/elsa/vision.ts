// ============================================================
// MICAPROFITA-ELSA · buildCandleVision (port setia dari
// src/lib/exam/sakti-candle.ts situs sumber) — ekstraksi fitur
// 60-candle point-in-time + deteksi pool likuiditas
// (src/lib/exam/stophunt-brain.ts).
// ============================================================
import { Candle, atr, ema, rsi, mean, stdev, medianOf, clamp } from './indicators';

function volClimaxAt(cs: Candle[], n: number, k: number): boolean {
  const win = cs.slice(Math.max(0, n - 21), n - 1);
  const m = mean(win.map((c) => c.v));
  return cs[n - 1].v >= k * Math.max(m, 1e-9);
}

export function buildCandleVision(cs: Candle[]) {
  const n = cs.length;
  const last = cs[n - 1];
  const price = last.c;
  const closes = cs.map((c) => c.c);
  const vols = cs.map((c) => c.v);
  const atrA = atr(cs, 14);
  const atrV = Math.max(atrA[n - 1], price * 0.0006);
  const ema9A = ema(closes, 9);
  const ema21A = ema(closes, 21);
  const ema50A = ema(closes, 50);
  const rsiA = rsi(closes, 14);
  const range = Math.max(last.h - last.l, 1e-9);
  const body = last.c - last.o;
  const bodyPct = Math.abs(body) / range;
  const upperWickPct = (last.h - Math.max(last.o, last.c)) / range;
  const lowerWickPct = (Math.min(last.o, last.c) - last.l) / range;
  const volWin = vols.slice(Math.max(0, n - 21), n - 1);
  const volMean = mean(volWin);
  const volSd = Math.max(stdev(volWin), 1e-9);
  const volZ = (last.v - volMean) / volSd;
  const volClimax = last.v >= 2.2 * Math.max(volMean, 1e-9);
  let upV = 0;
  let downV = 0;
  let totV = 0;
  for (let i = Math.max(0, n - 10); i < n; i++) {
    totV += cs[i].v;
    if (cs[i].c >= cs[i].o) upV += cs[i].v;
    else downV += cs[i].v;
  }
  const volAsym = totV > 0 ? (upV - downV) / totV : 0;
  // pivot fraktal k=2
  const pivotHighs: number[] = [];
  const pivotLows: number[] = [];
  for (let i = 2; i < n - 2; i++) {
    const h = cs[i].h;
    const l = cs[i].l;
    if (h > cs[i - 1].h && h > cs[i - 2].h && h > cs[i + 1].h && h > cs[i + 2].h) pivotHighs.push(h);
    if (l < cs[i - 1].l && l < cs[i - 2].l && l < cs[i + 1].l && l < cs[i + 2].l) pivotLows.push(l);
  }
  const hh = pivotHighs.length >= 2 ? pivotHighs[pivotHighs.length - 1] > pivotHighs[pivotHighs.length - 2] : false;
  const lh = pivotHighs.length >= 2 ? pivotHighs[pivotHighs.length - 1] < pivotHighs[pivotHighs.length - 2] : false;
  const hl = pivotLows.length >= 2 ? pivotLows[pivotLows.length - 1] > pivotLows[pivotLows.length - 2] : false;
  const ll = pivotLows.length >= 2 ? pivotLows[pivotLows.length - 1] < pivotLows[pivotLows.length - 2] : false;
  const win20 = cs.slice(Math.max(0, n - 22), n - 1);
  const rangeHigh = Math.max(...win20.map((c) => c.h));
  const rangeLow = Math.min(...win20.map((c) => c.l));
  const posInRange = clamp((price - rangeLow) / Math.max(rangeHigh - rangeLow, 1e-9), -0.3, 1.3);
  const priorLows = cs.slice(Math.max(0, n - 9), n - 1).map((c) => c.l);
  const priorHighs = cs.slice(Math.max(0, n - 9), n - 1).map((c) => c.h);
  const minPriorLow = Math.min(...priorLows);
  const maxPriorHigh = Math.max(...priorHighs);
  const sweptLow = last.l < minPriorLow && last.c > minPriorLow;
  const sweptHigh = last.h > maxPriorHigh && last.c < maxPriorHigh;
  const older = cs.slice(Math.max(0, n - 20), Math.max(0, n - 10));
  const recent = cs.slice(Math.max(0, n - 10), n);
  const breakLevel = older.length ? Math.max(...older.map((c) => c.h)) : price;
  const breakLevelDn = older.length ? Math.min(...older.map((c) => c.l)) : price;
  const recentBreakUp = recent.length ? Math.max(...recent.map((c) => c.h)) > breakLevel : false;
  const recentBreakDown = recent.length ? Math.min(...recent.map((c) => c.l)) < breakLevelDn : false;
  const retestHold =
    (recentBreakUp && last.l > breakLevel && last.c > breakLevel && !volClimaxAt(cs, n, 2.4)) ||
    (recentBreakDown && last.h < breakLevelDn && last.c < breakLevelDn && !volClimaxAt(cs, n, 2.4));
  const failedRetest = (recentBreakUp && last.c < breakLevel) || (recentBreakDown && last.c > breakLevelDn);
  let consecutiveUp = 0;
  let consecutiveDown = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (cs[i].c > cs[i].o) {
      if (consecutiveDown > 0) break;
      consecutiveUp++;
    } else if (cs[i].c < cs[i].o) {
      if (consecutiveUp > 0) break;
      consecutiveDown++;
    } else break;
  }
  const back12 = cs[Math.max(0, n - 13)].c;
  const mom12Atr = (price - back12) / atrV;
  const mom3Atr = (price - cs[Math.max(0, n - 4)].c) / atrV;
  const netLast5Atr = (price - cs[Math.max(0, n - 6)].c) / atrV;
  const winLow60 = Math.min(...cs.map((c) => c.l));
  const winHigh60 = Math.max(...cs.map((c) => c.h));
  const posInWindow60 = clamp((price - winLow60) / Math.max(winHigh60 - winLow60, 1e-9), -0.3, 1.3);
  let bodyUp6 = 0;
  let bodyDn6 = 0;
  for (let i = Math.max(0, n - 6); i < n; i++) {
    const b = cs[i].c - cs[i].o;
    if (b >= 0) bodyUp6 += b;
    else bodyDn6 += -b;
  }
  const volZat = (idx: number) => (vols[idx] - volMean) / volSd;
  const volZmidMax = Math.max(...[n - 5, n - 4, n - 3].filter((i) => i >= 0).map(volZat), -9);
  const top10 = Math.max(...cs.slice(Math.max(0, n - 10)).map((c) => c.h));
  const fallFromTop10Atr = (top10 - price) / atrV;
  const ret6Atr: number[] = [];
  for (let i = Math.max(1, n - 6); i < n; i++) ret6Atr.push((cs[i].c - cs[i - 1].c) / atrV);
  let up3 = 0;
  let dn3 = 0;
  for (let i = Math.max(0, n - 3); i < n; i++) {
    const b = cs[i].c - cs[i].o;
    if (b >= 0) up3 += b;
    else dn3 += -b;
  }
  let upV5 = 0;
  let dnV5 = 0;
  for (let i = Math.max(0, n - 5); i < n; i++) {
    if (cs[i].c >= cs[i].o) upV5 += cs[i].v;
    else dnV5 += cs[i].v;
  }
  const volAsym5 = upV5 + dnV5 > 0 ? (upV5 - dnV5) / (upV5 + dnV5) : 0;
  const mom30Atr = (price - cs[Math.max(0, n - 31)].c) / atrV;
  const mom50Atr = (price - cs[Math.max(0, n - 51)].c) / atrV;
  let lowTrend12 = 0;
  {
    const st = Math.max(0, n - 12);
    const m = cs.slice(st);
    const k = m.length;
    const xm = (k - 1) / 2;
    const ym = m.reduce((s, c) => s + c.l, 0) / k;
    let sxy = 0;
    let sxx = 0;
    for (let i = 0; i < k; i++) {
      sxy += (i - xm) * (m[i].l - ym);
      sxx += (i - xm) ** 2;
    }
    lowTrend12 = sxx > 0 ? sxy / sxx / atrV : 0;
  }
  // spring13 (Wyckoff): sapuan-recover terakhir di c(n-23)..c(n-7) yang lantainya tahan
  let spring13 = false;
  for (let i = n - 8; i >= Math.max(17, n - 24); i--) {
    let priorMin = Infinity;
    for (let j = Math.max(0, i - 17); j < i; j++) priorMin = Math.min(priorMin, cs[j].l);
    if (cs[i].l < priorMin && cs[i].c > priorMin) {
      let hold = true;
      for (let j = i + 1; j < n; j++) {
        if (cs[j].l < cs[i].l) {
          hold = false;
          break;
        }
      }
      if (hold) spring13 = true;
      break;
    }
  }
  let rFlip = 0;
  for (let i = 1; i < ret6Atr.length; i++) {
    if (ret6Atr[i] !== 0 && ret6Atr[i - 1] !== 0 && Math.sign(ret6Atr[i]) !== Math.sign(ret6Atr[i - 1])) rFlip++;
  }
  let squeeze = false;
  if (n >= 41) {
    const win = atrA.slice(n - 40, n);
    const mn = Math.min(...win);
    const mx = Math.max(...win);
    squeeze = mx > mn && (atrV - mn) / (mx - mn) < 0.25;
  }
  const prev = cs[n - 2] ?? last;
  const bullEngulf =
    prev.c < prev.o && last.c > last.o && last.c >= prev.o && last.o <= prev.c && Math.abs(last.c - last.o) > Math.abs(prev.c - prev.o);
  const bearEngulf =
    prev.c > prev.o && last.c < last.o && last.o >= prev.c && last.c <= prev.o && Math.abs(last.c - last.o) > Math.abs(prev.c - prev.o);
  const hammer = lowerWickPct >= 0.55 && bodyPct <= 0.35 && last.c >= last.o;
  const shootingStar = upperWickPct >= 0.55 && bodyPct <= 0.35 && last.c < last.o;
  const doji = bodyPct <= 0.12 && range >= atrV * 0.6;
  // divergensi RSI: 10..30 candle
  let divBull = false;
  let divBear = false;
  if (pivotLows.length >= 2) {
    const a = pivotLows[pivotLows.length - 2];
    const b = pivotLows[pivotLows.length - 1];
    const rA = rsiA[Math.max(0, n - 1 - 12)];
    divBull = b < a * 0.999 && rsiA[n - 1] > rsiA[Math.max(0, n - 1 - 20)] + 2;
    void a;
    void b;
    void rA;
  }
  if (pivotHighs.length >= 2) {
    divBear = pivotHighs[pivotHighs.length - 1] > pivotHighs[pivotHighs.length - 2] * 1.001 && rsiA[n - 1] < rsiA[Math.max(0, n - 1 - 20)] - 2;
  }
  const ema21SlopeAtr = (ema21A[n - 1] - ema21A[n - 6]) / (5 * atrV);

  return {
    n, last, price, atr: atrV, atrPct: atrV / price,
    ema9: ema9A[n - 1], ema21: ema21A[n - 1], ema50: ema50A[n - 1], ema21SlopeAtr,
    rsi: rsiA[n - 1], distEma21Atr: (price - ema21A[n - 1]) / atrV,
    green: body > 0, bodyPct, upperWickPct, lowerWickPct,
    rangeAtr: range / atrV, volZ, volMean, volClimax, volAsym,
    pivotHighs, pivotLows, hh, lh, hl, ll,
    rangeHigh, rangeLow, posInRange, sweptLow, sweptHigh,
    recentBreakUp, recentBreakDown, breakLevel, retestHold, failedRetest,
    consecutiveUp, consecutiveDown, squeeze, bullEngulf, bearEngulf, hammer, shootingStar, doji,
    divBull, divBear, mom12Atr, mom3Atr, netLast5Atr, posInWindow60, breakLevelDn,
    bodyUp6Atr: bodyUp6 / atrV, bodyDn6Atr: bodyDn6 / atrV, volZmidMax,
    fallFromTop10Atr, ret6Atr,
    bodyRatio3Atr: (up3 - dn3) / atrV, volAsym5, mom30Atr, mom50Atr, lowTrend12,
    spring13, rFlip,
  };
}

// ---------------- POOL LIKUIDITAS (stophunt-brain) ----------------
export type Pool = {
  side: 'BAWAH' | 'ATAS' | 'TAK-JELAS';
  jenis: string;
  level: number;
  sentuhan: number;
  maxBounceAtr?: number;
  swept: boolean;
  reclaimed?: boolean;
  barsSince?: number;
  depthAtr?: number;
  closeDistAtr?: number;
  volZSweep?: number;
  volRatioSweep?: number;
  sweepBodyAtr?: number;
  postBounceMaxBodyAtr?: number;
  postVolMean?: number;
  crossBack?: boolean;
  dariZona?: boolean;
  idxSweep?: number;
  episodeLen?: number;
};

function pivotIdx(win: Candle[], kind: 'low' | 'high', k = 3): number[] {
  const out: number[] = [];
  for (let i = k; i < win.length - k; i++) {
    let isP = true;
    for (let j = i - k; j <= i + k; j++) {
      if (j === i) continue;
      if (kind === 'low' ? win[j].l < win[i].l : win[j].h > win[i].h) {
        isP = false;
        break;
      }
    }
    if (isP) out.push(i);
  }
  return out;
}

function clusterPivots(win: Candle[], idxs: number[], kind: 'low' | 'high', atrV: number) {
  const px = (i: number) => (kind === 'low' ? win[i].l : win[i].h);
  const sorted = [...idxs].sort((a, b) => px(a) - px(b));
  const clusters: { level: number; idxs: number[] }[] = [];
  for (const i of sorted) {
    const lastCl = clusters[clusters.length - 1];
    if (lastCl && Math.abs(px(i) - lastCl.level) <= 0.3 * atrV) lastCl.idxs.push(i);
    else clusters.push({ level: px(i), idxs: [i] });
  }
  for (const cl of clusters) {
    const prices = cl.idxs.map(px).sort((a, b) => a - b);
    const counts = new Map<number, number>();
    for (const p of prices) counts.set(p, (counts.get(p) ?? 0) + 1);
    let modeVal = prices[0];
    let modeCnt = 0;
    for (const [val, cnt] of counts) {
      if (cnt > modeCnt) {
        modeVal = val;
        modeCnt = cnt;
      }
    }
    const mid = Math.floor(prices.length / 2);
    const median = prices.length % 2 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
    cl.level = modeCnt >= 2 && modeCnt * 2 >= prices.length ? modeVal : median;
  }
  return clusters;
}

function mineTouchZones(win: Candle[], atrV: number): { level: number; touches: number[] }[] {
  const touches: { px: number; close: boolean }[] = [];
  const zWin = win.slice(0, Math.max(0, win.length - 6));
  for (const c of zWin) {
    touches.push({ px: c.h, close: false }, { px: c.l, close: false }, { px: c.c, close: true });
  }
  const sorted = [...touches].sort((a, b) => a.px - b.px);
  const seedTol = 0.12 * atrV;
  const growTol = 0.18 * atrV;
  const zones: { level: number; touches: number[] }[] = [];
  let i = 0;
  while (i < sorted.length - 1) {
    if (sorted[i + 1].px - sorted[i].px <= seedTol) {
      const grp = [sorted[i], sorted[i + 1]];
      i += 2;
      while (i < sorted.length && sorted[i].px - medianOf(grp.map((t) => t.px)) <= growTol) {
        grp.push(sorted[i]);
        i++;
      }
      const strukt = grp.filter((t) => !t.close).map((t) => t.px);
      const src = strukt.length ? strukt : grp.map((t) => t.px);
      zones.push({ level: medianOf(src), touches: src });
    } else i++;
  }
  return zones.filter((z) => z.touches.length >= 2);
}

function visitsOf(cs: Candle[], level: number, side: 'BAWAH' | 'ATAS', atrV: number) {
  let visits = 0;
  let inVisit = false;
  let excursion = 0;
  let maxBounce = 0;
  for (const c of cs) {
    const near = side === 'BAWAH' ? c.l <= level + 0.22 * atrV : c.h >= level - 0.22 * atrV;
    if (near && !inVisit) {
      visits++;
      inVisit = true;
      excursion = 0;
    }
    if (inVisit) {
      const exc = side === 'BAWAH' ? (c.h - level) / atrV : (level - c.l) / atrV;
      excursion = Math.max(excursion, exc);
      const left = side === 'BAWAH' ? (c.h - level) / atrV > 0.55 : (level - c.l) / atrV > 0.55;
      if (left && !near) {
        maxBounce = Math.max(maxBounce, excursion);
        inVisit = false;
      }
    }
  }
  maxBounce = Math.max(maxBounce, inVisit ? excursion : 0);
  return { visits, maxBounceAtr: maxBounce };
}

function classifyPool(
  win: Candle[], v: ReturnType<typeof buildCandleVision>, level: number, side: 'BAWAH' | 'ATAS', atrV: number,
  visits: number, maxBounceAtr: number, consecBig: number, distPullAtr: number, trendStruct: boolean,
): string {
  // penolakan wick keras di level (sentuhan session/equal)
  for (const c of win.slice(-10)) {
    const uw = c.h - Math.max(c.o, c.c);
    const lw = Math.min(c.o, c.c) - c.l;
    const wick = side === 'BAWAH' ? lw : uw;
    const tip = side === 'BAWAH' ? c.l : c.h;
    if (wick >= 0.35 * atrV && wick >= 0.45 * Math.max(c.h - c.l, 1e-9) && Math.abs(tip - level) <= 0.15 * atrV) return 'penolakan-wick';
  }
  if (consecBig >= 2 && Math.abs(distPullAtr) >= 1.4) return 'kaskade-rantai';
  if (trendStruct && distPullAtr >= 1.6) return ' HL-tren'; // pullback dalam tren
  if (visits >= 2 && maxBounceAtr >= 0.8) return 'pivot-range';
  if (visits >= 2) return 'equal-lows/highs';
  return 'pivot-tunggal';
}

export type SgVision = ReturnType<typeof buildCandleVision> & {
  atrSd: number;
  pools: Pool[];
  active: Pool | null;
  consecDownBig: number;
  consecUpBig: number;
  lastVolZ: number;
};

function rankOf(p: Pool): number {
  if (p.crossBack) return 0;
  if ((p.barsSince ?? 9) <= 1 && p.reclaimed && Math.abs(p.closeDistAtr ?? 0) >= 0.5) return 0;
  if ((p.barsSince ?? 9) <= 4) return 1;
  if ((p.barsSince ?? 9) <= 8) return 2;
  return 3;
}

export function buildSgVision(cs: Candle[]): SgVision {
  const v = buildCandleVision(cs);
  const atrV = Math.max(v.atr, 1e-9);
  const n = cs.length;
  const vols = cs.map((c) => c.v);
  const volSd = Math.max(stdev(vols.slice(Math.max(0, n - 30))), 1e-9);
  const lastVolZ = (cs[n - 1].v - v.volMean) / volSd;
  let cd = 0;
  let cu = 0;
  let cdBig = 0;
  let cuBig = 0;
  for (let i = Math.max(1, n - 20); i < n; i++) {
    const red = cs[i].c < cs[i - 1].c;
    const body = Math.abs(cs[i].c - cs[i].o) / atrV;
    if (red) {
      cd++;
      cdBig = body >= 0.55 ? cdBig + 1 : 0;
    } else {
      cd = 0;
      cdBig = 0;
    }
    if (!red) {
      cu++;
      cuBig = body >= 0.55 ? cuBig + 1 : 0;
    } else {
      cu = 0;
      cuBig = 0;
    }
  }
  v.consecutiveDown = Math.max(v.consecutiveDown, cd);
  v.consecutiveUp = Math.max(v.consecutiveUp, cu);
  const pools: Pool[] = [];
  const win = cs.slice(Math.max(0, n - 58));
  const wOff = n - win.length;
  const recentExtreme = Math.min(...cs.slice(Math.max(0, n - 8)).map((c) => c.l));
  const recentExtremeHi = Math.max(...cs.slice(Math.max(0, n - 8)).map((c) => c.h));
  for (const side of ['BAWAH', 'ATAS'] as const) {
    const kind = side === 'BAWAH' ? 'low' : 'high';
    const pivWin = win.slice(0, Math.max(0, win.length - 3));
    const piv = pivotIdx(pivWin, kind);
    const clusters = clusterPivots(pivWin, piv, kind, atrV);
    for (const cl of clusters) {
      const level = cl.level;
      const margin = 0.12 * atrV;
      const pierce = (i: number) => (side === 'BAWAH' ? cs[i].l < level - margin : cs[i].h > level + margin);
      let lastPierce = -1;
      for (let i = n - 1; i >= Math.max(0, n - 14); i--) {
        if (pierce(i)) {
          lastPierce = i;
          break;
        }
      }
      let sweepStart = -1;
      if (lastPierce >= 0) {
        sweepStart = lastPierce;
        while (sweepStart - 1 >= 0 && n - sweepStart <= 22) {
          const prevC = cs[sweepStart - 1];
          const beyond = side === 'BAWAH' ? prevC.c < level - margin : prevC.c > level + margin;
          if (pierce(sweepStart - 1) || beyond) sweepStart--;
          else break;
        }
        if (n - sweepStart > 22) sweepStart = -1;
      }
      const swept = sweepStart >= 0;
      const vWin = swept ? win.slice(0, Math.max(0, sweepStart - wOff - 2)) : win;
      const { visits, maxBounceAtr } = visitsOf(vWin, level, side, atrV);
      const win30 = cs.slice(Math.max(0, n - 30));
      const distPullAtr = side === 'BAWAH' ? (Math.max(...win30.map((c) => c.h)) - level) / atrV : (level - Math.min(...win30.map((c) => c.l))) / atrV;
      const recent32 = cs.slice(Math.max(0, n - 32));
      const older32 = cs.slice(0, Math.max(0, n - 32));
      const hhStruct = older32.length > 10 && Math.max(...recent32.map((c) => c.h)) > Math.max(...older32.map((c) => c.h));
      const llStruct = older32.length > 10 && Math.min(...recent32.map((c) => c.l)) < Math.min(...older32.map((c) => c.l));
      const consecBig = side === 'BAWAH' ? cdBig : cuBig;
      const jenis = classifyPool(win, v, level, side, atrV, visits, maxBounceAtr, consecBig, distPullAtr, side === 'BAWAH' ? hhStruct : llStruct).trim();
      const pool: Pool = {
        side, jenis, level, sentuhan: visits, maxBounceAtr, swept,
        reclaimed: false, barsSince: swept ? n - 1 - sweepStart : -1,
        depthAtr: 0, closeDistAtr: 0, volZSweep: 0, volRatioSweep: 0,
        sweepBodyAtr: 0, postBounceMaxBodyAtr: 0, postVolMean: 0,
        crossBack: false, dariZona: false,
      };
      if (swept) {
        const prevClose = n >= 2 ? cs[n - 2].c : cs[n - 1].c;
        const lastClose = cs[n - 1].c;
        pool.crossBack = side === 'ATAS'
          ? prevClose > level && lastClose < level && (level - lastClose) / atrV >= 0.2
          : prevClose < level && lastClose > level && (lastClose - level) / atrV >= 0.2;
        const after = cs.slice(sweepStart);
        const extreme = side === 'BAWAH' ? Math.min(...after.map((c) => c.l)) : Math.max(...after.map((c) => c.h));
        pool.depthAtr = side === 'BAWAH' ? (level - extreme) / atrV : (extreme - level) / atrV;
        pool.closeDistAtr = side === 'BAWAH' ? (lastClose - level) / atrV : (level - lastClose) / atrV;
        pool.reclaimed = (pool.closeDistAtr ?? 0) >= 0.12;
        pool.volZSweep = (cs[sweepStart].v - v.volMean) / volSd;
        const preVols = cs.slice(Math.max(0, sweepStart - 12), sweepStart).map((c) => c.v);
        const preMean = preVols.length ? mean(preVols) : v.volMean;
        pool.volRatioSweep = cs[sweepStart].v / Math.max(preMean, 1e-9);
        pool.sweepBodyAtr = Math.abs(cs[sweepStart].c - cs[sweepStart].o) / atrV;
        const post = cs.slice(sweepStart + 1);
        pool.postBounceMaxBodyAtr = post.length ? Math.max(...post.map((c) => Math.abs(c.c - c.o))) / atrV : 0;
        pool.postVolMean = post.length ? mean(post.map((c) => c.v)) : 0;
        pool.idxSweep = sweepStart;
        pool.episodeLen = n - sweepStart;
      }
      if (visits >= 1) pools.push(pool);
    }
    // touch-zone pools
    const zones = mineTouchZones(win, atrV);
    for (const z of zones) {
      const level = z.level;
      const margin = 0.12 * atrV;
      const pierce = (i: number) => (side === 'BAWAH' ? cs[i].l < level - margin : cs[i].h > level + margin);
      let lastPierce = -1;
      for (let i = n - 1; i >= Math.max(0, n - 14); i--) {
        if (pierce(i)) {
          lastPierce = i;
          break;
        }
      }
      let sweepStart = -1;
      if (lastPierce >= 0) {
        sweepStart = lastPierce;
        while (sweepStart - 1 >= 0 && n - sweepStart <= 22) {
          const prevC = cs[sweepStart - 1];
          const beyond = side === 'BAWAH' ? prevC.c < level - margin : prevC.c > level + margin;
          if (pierce(sweepStart - 1) || beyond) sweepStart--;
          else break;
        }
        if (n - sweepStart > 22) sweepStart = -1;
      }
      const swept = sweepStart >= 0;
      const vWin = swept ? win.slice(0, Math.max(0, sweepStart - wOff - 2)) : win;
      const { visits, maxBounceAtr } = visitsOf(vWin, level, side, atrV);
      const win30 = cs.slice(Math.max(0, n - 30));
      const distPullAtr = side === 'BAWAH' ? (Math.max(...win30.map((c) => c.h)) - level) / atrV : (level - Math.min(...win30.map((c) => c.l))) / atrV;
      const recent32 = cs.slice(Math.max(0, n - 32));
      const older32 = cs.slice(0, Math.max(0, n - 32));
      const hhStruct = older32.length > 10 && Math.max(...recent32.map((c) => c.h)) > Math.max(...older32.map((c) => c.h));
      const llStruct = older32.length > 10 && Math.min(...recent32.map((c) => c.l)) < Math.min(...older32.map((c) => c.l));
      const consecBig = side === 'BAWAH' ? cdBig : cuBig;
      const jenis = classifyPool(win, v, level, side, atrV, visits, maxBounceAtr, consecBig, distPullAtr, side === 'BAWAH' ? hhStruct : llStruct).trim();
      const pool: Pool = {
        side, jenis, level, sentuhan: Math.max(visits, z.touches.length - 1), maxBounceAtr,
        swept, reclaimed: false, barsSince: swept ? n - 1 - sweepStart : -1,
        depthAtr: 0, closeDistAtr: 0, volZSweep: 0, volRatioSweep: 0,
        sweepBodyAtr: 0, postBounceMaxBodyAtr: 0, postVolMean: 0,
        crossBack: false, dariZona: true,
      };
      if (swept) {
        const lastClose = cs[n - 1].c;
        pool.crossBack = side === 'ATAS'
          ? cs[n - 2].c > level && lastClose < level && (level - lastClose) / atrV >= 0.2
          : cs[n - 2].c < level && lastClose > level && (lastClose - level) / atrV >= 0.2;
        const after = cs.slice(sweepStart);
        const extreme = side === 'BAWAH' ? Math.min(...after.map((c) => c.l)) : Math.max(...after.map((c) => c.h));
        pool.depthAtr = side === 'BAWAH' ? (level - extreme) / atrV : (extreme - level) / atrV;
        pool.closeDistAtr = side === 'BAWAH' ? (lastClose - level) / atrV : (level - lastClose) / atrV;
        pool.reclaimed = (pool.closeDistAtr ?? 0) >= 0.12;
        pool.volZSweep = (cs[sweepStart].v - v.volMean) / volSd;
        const preVols = cs.slice(Math.max(0, sweepStart - 12), sweepStart).map((c) => c.v);
        const preMean = preVols.length ? mean(preVols) : v.volMean;
        pool.volRatioSweep = cs[sweepStart].v / Math.max(preMean, 1e-9);
        pool.sweepBodyAtr = Math.abs(cs[sweepStart].c - cs[sweepStart].o) / atrV;
        const post = cs.slice(sweepStart + 1);
        pool.postBounceMaxBodyAtr = post.length ? Math.max(...post.map((c) => Math.abs(c.c - c.o))) / atrV : 0;
        pool.postVolMean = post.length ? mean(post.map((c) => c.v)) : 0;
        pool.idxSweep = sweepStart;
        pool.episodeLen = n - sweepStart;
      }
      if (visits >= 1 || z.touches.length >= 2) pools.push(pool);
    }
  }
  const sweptPools = pools.filter(
    (p) => p.swept &&
      ((p.depthAtr ?? 0) >= 0.4 || ((p.depthAtr ?? 0) >= 0.3 && Math.abs(p.closeDistAtr ?? 0) >= 0.5 && (p.volZSweep ?? 0) >= 2)) &&
      (p.dariZona || p.sentuhan >= 1) &&
      ((p.volZSweep ?? 0) >= 0.5 || (p.volRatioSweep ?? 0) >= 1.15),
  );
  sweptPools.sort((a, b) => {
    const ra = rankOf(a);
    const rb = rankOf(b);
    if (ra !== rb) return ra - rb;
    const da = Math.abs(a.level - (a.side === 'BAWAH' ? recentExtreme : recentExtremeHi));
    const db = Math.abs(b.level - (b.side === 'BAWAH' ? recentExtreme : recentExtremeHi));
    if (da !== db) return da - db;
    return (a.barsSince ?? 0) - (b.barsSince ?? 0);
  });
  const active = sweptPools[0] ?? null;
  return { ...v, atrSd: volSd, pools, active, consecDownBig: cdBig, consecUpBig: cuBig, lastVolZ };
}
