// HUKUM KASUS v2 — threshold korban relatif per koin (p90 rolling-6j).
// Output: db/aliran/hukum_kasus.json — dipakai panel.
import fs from 'fs';
const DIR = '/home/z/my-project/db/aliran';
type Stat = Record<string, number | string>;
const KOIN = ['ELSA', 'EVAA', 'PIEVERSE', 'AGT'];
type B = { t: number; c: number; liqLong: number; liqShort: number };
type K = { koin: string; t: number; fut6: number; korban: 1 | -1 | 0; lLiq: number; sLiq: number; longShare: number; fundingMa3: number; oiD24: number; mom24: number; mom4: number; topShare: number; whaleVsCrowd: number; takerImb: number; rangePos24: number };
function muat(koin: string): { bars: B[]; thr: number } {
  const stats = JSON.parse(fs.readFileSync(`${DIR}/${koin}_stats.json`, 'utf8')) as Stat[];
  const candles = JSON.parse(fs.readFileSync(`${DIR}/${koin}_candles.json`, 'utf8')) as { t: number; c: number }[];
  const cm = new Map(candles.map((c) => [c.t, c.c]));
  const bars: B[] = [];
  for (const s of stats) {
    const t = Number(s.time);
    const c = cm.get(t);
    if (c === undefined) continue;
    bars.push({ t, c, liqLong: Number(s.long_liq_usd), liqShort: Number(s.short_liq_usd) });
  }
  bars.sort((a, b) => a.t - b.t);
  const tot = bars.map((b) => b.liqLong + b.liqShort);
  const w6 = tot.map((_, i) => tot.slice(Math.max(0, i - 5), i + 1).reduce((a, v) => a + v, 0)).sort((a, b) => a - b);
  return { bars, thr: Math.max(120, w6[Math.floor(w6.length * 0.9)] ?? 0) };
}
const rata = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const semua: K[] = [];
for (const koin of KOIN) {
  const { bars, thr } = muat(koin);
  for (let i = 96; i + 6 < bars.length; i++) {
    const s = JSON.parse('{}') as never; void s;
    semua.push({
      koin, t: bars[i].t,
      fut6: bars[i + 6].c / bars[i].c - 1,
      lLiq: 0, sLiq: 0, // diisi bawah
      korban: 0,
      longShare: 0, fundingMa3: 0, oiD24: 0, mom24: 0, mom4: 0, topShare: 0, whaleVsCrowd: 0, takerImb: 0, rangePos24: 0,
    });
    void i;
  }
}
// perhitungan fitur ringan terpisah (tanpa fitur penuh) — cukup utk hukum
const rows: K[] = [];
for (const koin of KOIN) {
  const { bars, thr } = muat(koin);
  const stats = JSON.parse(fs.readFileSync(`${DIR}/${koin}_stats.json`, 'utf8')) as Stat[];
  const sm = new Map<number, Stat>();
  for (const s of stats) sm.set(Number(s.time), s);
  for (let i = 96; i + 6 < bars.length; i++) {
    const st = sm.get(bars[i].t);
    if (!st) continue;
    let sLiq = 0, lLiq = 0;
    for (let k = 1; k <= 6; k++) { sLiq += bars[i + k].liqShort; lLiq += bars[i + k].liqLong; }
    let korban: 1 | -1 | 0 = 0;
    if (sLiq >= thr && sLiq >= 2.5 * Math.max(lLiq, 1)) korban = 1;
    else if (lLiq >= thr && lLiq >= 2.5 * Math.max(sLiq, 1)) korban = -1;
    const lu = Number(st.long_users), su = Number(st.short_users);
    const totU = lu + su;
    const hi24 = Math.max(...bars.slice(i - 23, i + 1).map((b) => b.c));
    const lo24 = Math.min(...bars.slice(i - 23, i + 1).map((b) => b.c));
    rows.push({
      koin, t: bars[i].t, fut6: bars[i + 6].c / bars[i].c - 1, korban, lLiq, sLiq,
      longShare: totU > 0 ? lu / totU : 0.5,
      fundingMa3: rata([0, 1, 2].map((k) => Number(sm.get(bars[Math.max(0, i - k)].t)?.last_funding_rate ?? 0))),
      oiD24: bars[i].c ? (Number(st.open_interest) / Math.max(Number(sm.get(bars[i - 24].t)?.open_interest ?? 0), 1) - 1) : 0,
      mom24: bars[i].c / Math.max(bars[i - 24].c, 1e-9) - 1,
      mom4: bars[i].c / Math.max(bars[i - 4].c, 1e-9) - 1,
      topShare: (Number(st.top_long_size) + Number(st.top_short_size)) > 0 ? Number(st.top_long_size) / (Number(st.top_long_size) + Number(st.top_short_size)) : 0.5,
      whaleVsCrowd: ((Number(st.top_long_size) + Number(st.top_short_size)) > 0 ? Number(st.top_long_size) / (Number(st.top_long_size) + Number(st.top_short_size)) : 0.5) - (totU > 0 ? lu / totU : 0.5),
      takerImb: (Number(st.long_taker_size) + Number(st.short_taker_size)) > 0 ? (Number(st.long_taker_size) - Number(st.short_taker_size)) / (Number(st.long_taker_size) + Number(st.short_taker_size)) : 0,
      rangePos24: hi24 > lo24 ? (bars[i].c - lo24) / (hi24 - lo24) : 0.5,
    });
  }
}
const hit = (nama: string, ket: string, f: (r: K) => boolean, g: (r: K) => boolean) => {
  const n0 = rows.filter(f);
  const n1 = n0.filter(g);
  return { nama, n: n0.length, rate: n0.length ? n1.length / n0.length : 0, ket };
};
const out = [
  hit('banjir likuidasi SHORT 6j', 'short dilikuidasi besar (dominasi ≥2.5×, ≥p90 koin) → harga naik 6 jam berikut', (r) => r.korban === 1, (r) => r.fut6 > 0),
  hit('banjir likuidasi LONG 6j', 'long dilikuidasi besar (dominasi ≥2.5×, ≥p90 koin) → harga turun 6 jam berikut', (r) => r.korban === -1, (r) => r.fut6 < 0),
  hit('banjir SHORT + OI ikut turun', 'squeeze murni (OI turun saat banjir short) → harga naik', (r) => r.korban === 1 && r.oiD24 < 0, (r) => r.fut6 > 0),
  hit('banjir LONG + OI ikut turun', 'long-flush murni (OI turun saat banjir long) → harga turun', (r) => r.korban === -1 && r.oiD24 < 0, (r) => r.fut6 < 0),
  hit('kerumunan long ekstrem ≥62% + funding panas', 'kerumunan sesak long + funding > 2× netral → turun 6j', (r) => r.longShare >= 0.62 && r.fundingMa3 > 0.0001, (r) => r.fut6 < 0),
  hit('kerumunan short ekstrem ≤38% + funding dingin', 'kerumunan sesak short + funding dingin → naik 6j', (r) => r.longShare <= 0.38 && r.fundingMa3 < 0.00005, (r) => r.fut6 > 0),
  hit('whale top-20 condong long ≥8pt vs kerumunan', 'posisi whale berlawanan kerumunan (long) → naik 6j', (r) => r.whaleVsCrowd >= 0.08, (r) => r.fut6 > 0),
  hit('whale top-20 condong short ≥8pt vs kerumunan', 'posisi whale berlawanan kerumunan (short) → turun 6j', (r) => r.whaleVsCrowd <= -0.08, (r) => r.fut6 < 0),
  hit('OI tumbuh ≥4%/24j + harga naik', 'posisi baru mengikuti rally → lanjut naik 6j', (r) => r.oiD24 >= 0.04 && r.mom24 > 0.02, (r) => r.fut6 > 0),
  hit('OI tumbuh ≥4%/24j + harga turun', 'posisi baru mengikuti dump → lanjut turun 6j', (r) => r.oiD24 >= 0.04 && r.mom24 < -0.02, (r) => r.fut6 < 0),
  hit('taker beli ekstrem ≥70% saat harga naik', 'kejaran beli klimaks → lanjut naik 6j', (r) => r.takerImb >= 0.4 && r.mom4 > 0, (r) => r.fut6 > 0),
  hit('akumulasi senyap (taker beli + harga kalem)', 'taker beli kuat tanpa lonjakan harga → naik 6j', (r) => r.takerImb >= 0.25 && Math.abs(r.mom4) < 0.01, (r) => r.fut6 > 0),
];
fs.writeFileSync(`${DIR}/hukum_kasus.json`, JSON.stringify(out, null, 1));
for (const o of out) console.log(`${o.nama}: n=${o.n} rate=${(o.rate * 100).toFixed(1)}%`);
