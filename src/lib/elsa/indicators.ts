// ============================================================
// MICAPROFITA-ELSA · indikator inti (port setia dari
// src/lib/exam/indicators.ts situs sumber MICAPROFITA).
// ============================================================
export type Candle = { t: number; o: number; h: number; l: number; c: number; v: number };

export const mean = (arr: number[]): number => (arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : 0);

export function stdev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1));
}

export function ema(values: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const out: number[] = [];
  let prev = values[0] ?? 0;
  for (let i = 0; i < values.length; i++) {
    prev = i === 0 ? values[0] : values[i] * k + prev * (1 - k);
    out.push(prev);
  }
  return out;
}

export function rsi(closes: number[], period = 14): number[] {
  const out: number[] = [50];
  let ag = 0;
  let al = 0;
  for (let i = 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    const g = Math.max(d, 0);
    const l = Math.max(-d, 0);
    if (i <= period) {
      ag += g / period;
      al += l / period;
    } else {
      ag = (ag * (period - 1) + g) / period;
      al = (al * (period - 1) + l) / period;
    }
    const rs = al > 1e-12 ? ag / al : 100;
    out.push(al <= 1e-12 ? 100 : 100 - 100 / (1 + rs));
  }
  return out;
}

export function atr(cs: Candle[], period = 14): number[] {
  const out: number[] = [cs[0]?.h - cs[0]?.l || 0];
  let prev = out[0];
  for (let i = 1; i < cs.length; i++) {
    const c = cs[i];
    const pc = cs[i - 1].c;
    const tr = Math.max(c.h - c.l, Math.abs(c.h - pc), Math.abs(c.l - pc));
    prev = (prev * (period - 1) + tr) / period;
    out.push(prev);
  }
  return out;
}

export function medianOf(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const sgn = (v: number): number => (v > 0 ? 1 : v < 0 ? -1 : 0);
