// Debug peta likuidasi — kenapa sisi short 0?
const BASE = 'https://api.bybit.com';
const binPct = 0.005;
(async () => {
  const res = await fetch(`${BASE}/v5/market/kline?category=linear&symbol=ELSAUSDT&interval=60&limit=168`);
  const j = await res.json();
  const list = j.result.list.map((r) => ({ t: +r[0], o: +r[1], h: +r[2], l: +r[3], c: +r[4], v: +r[5] })).sort((a, b) => a.t - b.t);
  const harga = list[list.length - 1].c;
  const lo = Math.min(...list.map((c) => c.l));
  const hi = Math.max(...list.map((c) => c.h));
  console.log('harga', harga, 'lo', lo, 'hi', hi);
  const nBins = Math.ceil(Math.log(hi / lo) / Math.log(1 + binPct));
  const bins = new Array(nBins).fill(0);
  for (const c of list) {
    const tp = (c.h + c.l + c.c) / 3;
    const idx = Math.min(nBins - 1, Math.max(0, Math.floor(Math.log(tp / lo) / Math.log(1 + binPct))));
    bins[idx] += c.v * tp;
  }
  const tiers = [{ lev: 10, w: 0.3 }, { lev: 25, w: 0.3 }, { lev: 50, w: 0.25 }, { lev: 100, w: 0.15 }];
  let shortAcc = 0, longAcc = 0;
  for (let i = 0; i < nBins; i++) {
    if (bins[i] <= 0) continue;
    const entry = lo * Math.pow(1 + binPct, i + 0.5);
    for (const t of tiers) {
      const jarak = 1 / t.lev - 0.005;
      const liqShort = entry * (1 + jarak);
      const dS = ((liqShort - harga) / harga) * 100;
      if (dS >= 0 && dS < 15) shortAcc += bins[i] * t.w;
      const liqLong = entry * (1 - jarak);
      const dL = ((harga - liqLong) / harga) * 100;
      if (dL >= 0 && dL < 15) longAcc += bins[i] * t.w;
    }
  }
  console.log('short est', shortAcc.toFixed(0), 'long est', longAcc.toFixed(0));
  // distribusi volume per bin atas (harga tinggi)
  for (let i = nBins - 10; i < nBins; i++) {
    const entry = lo * Math.pow(1 + binPct, i + 0.5);
    console.log('bin', i, 'entry', entry.toFixed(5), 'usd', (bins[i] / 1e6).toFixed(3), 'jt');
  }
})();
