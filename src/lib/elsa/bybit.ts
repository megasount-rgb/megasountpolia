// ============================================================
// MICAPROFITA-ELSA · lapisan data — Bybit v5 publik (spot).
// Koin tunggal: ELSAUSDT. Konteks pasar: BTCUSDT (iklim, bukan
// koin tempur kedua). Cache memori + file agar hemat rate-limit.
// ============================================================
import { Candle } from './indicators';

export const SIMBOL = 'ELSAUSDT';
export const SIMBOL_LABEL = 'ELSA/USDT';
export const BTC = 'BTCUSDT';

type CacheEntry = { at: number; data: Candle[] };
const memCache = new Map<string, CacheEntry>();
const TTL_MS = 90_000; // 90 detik

function fileCachePath(key: string) {
  return `${process.env.ELSA_DB_DIR ?? '/home/z/my-project/db'}/elsa_cache_${key.replace(/[^A-Z0-9]/gi, '_')}.json`; // env override khusus uji sandbox
}

async function klineBybit(category: 'spot', symbol: string, interval: 'D' | '240' | '60', limit: number): Promise<Candle[]> {
  const url = `https://api.bybit.com/v5/market/kline?category=${category}&symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`bybit ${res.status} ${symbol} ${interval}`);
  const j = await res.json();
  if (j.retCode !== 0) throw new Error(`bybit retCode ${j.retCode}: ${j.retMsg}`);
  const list: string[][] = j.result?.list ?? [];
  // Bybit: terbaru dulu -> urutkan naik
  const cs: Candle[] = list
    .map((r) => ({ t: Number(r[0]), o: Number(r[1]), h: Number(r[2]), l: Number(r[3]), c: Number(r[4]), v: Number(r[5]) }))
    .sort((a, b) => a.t - b.t);
  return cs;
}

export async function getCandles(symbol: string, interval: 'D' | '240' | '60', limit = 200): Promise<Candle[]> {
  const key = `${symbol}_${interval}_${limit}`;
  const hit = memCache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data;
  // coba cache file usia < TTL agar halaman pertama tetap cepat
  try {
    const fs = await import('fs');
    const fp = fileCachePath(key);
    if (fs.existsSync(fp)) {
      const j = JSON.parse(fs.readFileSync(fp, 'utf8')) as CacheEntry;
      if (Date.now() - j.at < TTL_MS) return j.data;
    }
  } catch {
    /* abai */
  }
  const data = await klineBybit('spot', symbol, interval, limit);
  memCache.set(key, { at: Date.now(), data });
  try {
    const fs = await import('fs');
    fs.mkdirSync(process.env.ELSA_DB_DIR ?? '/home/z/my-project/db', { recursive: true });
    fs.writeFileSync(fileCachePath(key), JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* abai */
  }
  return data;
}

export async function ticker24h(symbol: string) {
  const url = `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const j = await res.json();
  const row = j.result?.list?.[0];
  if (!row) return null;
  return {
    lastPrice: Number(row.lastPrice),
    prevPrice24h: Number(row.prevPrice24h),
    high24h: Number(row.highPrice24h),
    low24h: Number(row.lowPrice24h),
    volume24h: Number(row.volume24h),
    turnover24h: Number(row.turnover24h),
    perubahan24jPct: Number(row.price24hPcnt) * 100,
  };
}

export function fmtHarga(v: number | null | undefined): string {
  if (v === null || v === undefined || !Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1000) return v.toFixed(2);
  if (a >= 1) return v.toFixed(4);
  if (a >= 0.01) return v.toFixed(5);
  return v.toFixed(7);
}
