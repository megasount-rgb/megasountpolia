// ============================================================
// MICAPROFITA-ELSA · OTAK ALIRAN — inferensi LANGSUNG dari model
// yang dilatih & diuji mesin ujian (scripts/ujian/mesin6.ts).
// Model: model_prod6.json (logistik per-coin, dilatih pada
// EVAA+PIEVERSE+AGT+ELSA masa lalu — walk-forward legal).
// Pertanyaan yang dijawab (permintaan pemilik, pesan ke-9):
//   1) KEMANA arah harga akan digerakan 6 jam ke depan?
//   2) SISI MANA yang akan terliquidasi (SHORT korban squeeze /
//      LONG korban flush) — "time traveler market".
//   3) Apa yang TERUJI (uji 500-soal × ronde, buta & walk-forward)
//      vs apa yang HANYA hukum kasus empiris.
// Sumber data live: Gate.io contract_stats + candlesticks ELSA_USDT.
// ============================================================
import fs from 'fs';
import { adiliVonisAliran, catatVonisAliran, koreksiKeyakinanAliran, perbaruiProfilJam, bacaPaham } from './paham';

const DIR_MODEL = '/home/z/my-project/db/aliran';
const GATE = 'https://api.gateio.ws/api/v4/futures/usdt';
const KONTRAK = 'ELSA_USDT';
const NEUTRAL_FUND = 0.00005;

// ---------------- muat model & laporan (cache 60 dtk) ----------------
type ModelL = {
  fitur: string[]; w: number[]; b: number;
  mu: Record<string, number[]>; sig: Record<string, number[]>;
  muG: number[]; sigG: number[]; thr: number;
};
type PaketModel = { ms: ModelL; mt: ModelL; mk: ModelL; meta: { dilatih: number; kaskade: number; thr: { sentuh: number; tutup: number; korban: number } } };
let cache: { at: number; model: PaketModel; laporan: Record<string, unknown>; hukum: { nama: string; n: number; rate: number; ket: string }[] } | null = null;
function muatPaket() {
  if (cache && Date.now() - cache.at < 60_000) return cache;
  const model = JSON.parse(fs.readFileSync(`${DIR_MODEL}/model_prod6.json`, 'utf8')) as PaketModel;
  const laporan = JSON.parse(fs.readFileSync(`${DIR_MODEL}/laporan6.json`, 'utf8')) as Record<string, unknown>;
  let hukum: { nama: string; n: number; rate: number; ket: string }[] = [];
  try { hukum = JSON.parse(fs.readFileSync(`${DIR_MODEL}/hukum_kasus.json`, 'utf8')); } catch { /* kosong */ }
  cache = { at: Date.now(), model, laporan, hukum };
  return cache;
}

// ---------------- data live Gate ----------------
type Stat = Record<string, number | string>;
type Candle = { t: number; o: number; c: number; h: number; l: number; v: number };
type Bar = {
  t: number; o: number; c: number; h: number; l: number; v: number;
  oi: number; funding: number; longU: number; shortU: number;
  longTaker: number; shortTaker: number;
  topLong: number; topShort: number; topLongAkun: number; topShortAkun: number;
  liqLong: number; liqShort: number;
};
async function getJson(url: string): Promise<unknown> {
  const r = await fetch(url, { signal: AbortSignal.timeout(12000), cache: 'no-store' });
  if (!r.ok) throw new Error(`gate ${r.status}`);
  return r.json();
}
async function ambilLive(): Promise<Bar[]> {
  const [stats, candles] = await Promise.all([
    getJson(`${GATE}/contract_stats?contract=${KONTRAK}&interval=1h&limit=240`) as Promise<Stat[]>,
    getJson(`${GATE}/candlesticks?contract=${KONTRAK}&interval=1h&limit=240`) as Promise<Record<string, string>[]>,
  ]);
  const cm = new Map<number, Candle>();
  for (const r of candles) cm.set(Number(r.t), { t: Number(r.t), o: Number(r.o), c: Number(r.c), h: Number(r.h), l: Number(r.l), v: Number(r.v) });
  const nowS = Math.floor(Date.now() / 1000);
  const bars: Bar[] = [];
  for (const s of stats) {
    const t = Number(s.time);
    if (t > nowS) continue; // jam berjalan = belum tutup, buang
    const k = cm.get(t);
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

// ---------------- fitur — TIRUAN SETIA fitur5 mesin6 (urutan sama) ----------------
const rata = (a: number[]) => (a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0);
const sd = (a: number[]) => { const m = rata(a); return Math.sqrt(rata(a.map((v) => (v - m) ** 2))) || 1e-9; };
function fiturLive(bars: Bar[], i: number): number[] | null {
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

const sigmoid = (z: number) => 1 / (1 + Math.exp(-Math.max(-30, Math.min(30, z))));
function skor(m: ModelL, x: number[], koin: string): number {
  return x.reduce((s, v, j) => s + ((v - (m.mu[koin]?.[j] ?? m.muG[j])) / (m.sig[koin]?.[j] ?? m.sigG[j])) * m.w[j], m.b);
}

// ---------------- payload ----------------
export type AliranData = {
  at: string; harga: number; oi: number; oiD24: number | null; funding: number; fundingMa3: number;
  orang: { long: number; short: number; rasioLong: number | null; dLongShare4: number | null; total: number };
  whaleTop: { topLong: number; topShort: number; topShare: number; dTopShare4: number | null; topLongAkun: number; topShortAkun: number };
  taker: { imb: number; imbMa3: number };
  liq6j: { longUsd: number; shortUsd: number; dominan: 'SHORT' | 'LONG' | null; liq24j: { longUsd: number; shortUsd: number } };
  vonis: {
    arah: 'NAIK' | 'TURUN'; pArah: number; skorArah: number; keyakinan: number;
    korban: 'SHORT' | 'LONG' | null; skorKorban: number; pKorban: number;
    alarm: boolean; alarmLevel: string;
    hukumRujuk: { nama: string; rate: number; n: number }[];
    alasan: string[];
  };
  ujian: {
    kalibrasi: { sentuh: number; korban: number; nKor: number };
    rondeJumlah: number;
    ronde: { n: number; sentuh: number; korban: number; nKor: number; alarmPresisi: number; alarmArah: number }[];
    rerata: { sentuh: number; korban: number; alarmArah: number; alarmPresisi: number };
    elsaButa: { sentuh: number; korban: number; nKor: number };
    walkforward: { sentuh: number; korban: number; nKor: number; alarmPresisi: number; alarmArah: number };
    dilatih: number; episodeKaskade: number;
  };
  hukum: { nama: string; n: number; rate: number; ket: string }[];
  catatanJujur: string[];
  paham: {
    nVonis: number; diadili: number; benarArah: number | null; benarKorban: number | null; benarKorbanN: number;
    koreksiDasar: string | null; catatan: string[];
  };
};
export async function getAliranData(): Promise<AliranData> {
  const { model, laporan, hukum } = muatPaket();
  const bars = await ambilLive();
  const n = bars.length;
  if (n < 100) throw new Error(`data live kurang (${n} bar)`);
  const i = n - 1; // bar tutup terakhir
  const b = bars[i];
  const x = fiturLive(bars, i);
  if (!x) throw new Error('fitur gagal');
  const sA = skor(model.ms, x, 'ELSA');
  const sK = skor(model.mk, x, 'ELSA');
  const pA = sigmoid(sA);
  const arah = sA > model.ms.thr ? 'NAIK' : 'TURUN';
  // skor mentah → probabilitas korban (logistik dgn skala skor model korban)
  const pK = sigmoid(sK * 1.4);
  const korban = Math.abs(sK) < model.mk.thr ? null : (sK > 0 ? 'SHORT' : 'LONG');
  // ambang alarm live: kuantil 88% |skor korban| di jendela 200 bar terakhir
  const skorKJendela: number[] = [];
  for (let k = 96; k < n; k++) {
    const xk = fiturLive(bars, k);
    if (xk) skorKJendela.push(skor(model.mk, xk, 'ELSA'));
  }
  const absK = [...skorKJendela.map((v) => Math.abs(v))].sort((a, b) => a - b);
  const thrAlarm = absK[Math.floor(absK.length * 0.88)] ?? 1;
  const alarm = Math.abs(sK) >= thrAlarm;
  const alarmLevel = alarm ? (Math.abs(sK) >= absK[Math.floor(absK.length * 0.96)] ? 'EKSTREM' : 'AKTIF') : 'bisa-diam';

  // OTAK PAHAM — amigdala yang menyala (keluhan pemilik 2026-11-26: "tab aliran
  // & ujian 500 masih tak miliki neuron… dia tidak benar-benar pahami koin yang
  // dituju — bisa jadi tumor"). Kini: vonis lama diadili candle+likuidasi nyata
  // ELSA dulu, lalu vonis kini dicatat ke rekam jejak — tidak ada vonis dibuang.
  adiliVonisAliran(bars);
  const mom24Reg = bars[i - 24].c > 0 ? b.c / bars[i - 24].c - 1 : 0;
  const atrWin: number[] = [];
  for (let k = 24; k < n; k += 8) { const q = bars[k]; atrWin.push((q.h - q.l) / Math.max(q.c, 1e-9)); }
  const atrNow = rata([0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const q = bars[Math.max(0, i - k)]; return (q.h - q.l) / Math.max(q.c, 1e-9); }));
  const atrS = [...atrWin].sort((p, q) => p - q);
  const medianAtr = atrS.length ? atrS[Math.floor((atrS.length - 1) / 2)] : atrNow;
  const regime = `${mom24Reg >= 0.01 ? 'TREN_NAIK' : mom24Reg <= -0.01 ? 'TREN_TURUN' : 'DATAR'}|${atrNow >= medianAtr * 1.5 ? 'VOL_TINGGI' : 'VOL_RENDAH'}`;
  catatVonisAliran({ at: new Date().toISOString(), barT: b.t, arah, korban, alarm, alarmLevel, harga: b.c, skorArah: Math.round(sA * 100) / 100, skorKorban: Math.round(sK * 100) / 100, regime });
  // likuidasi 6j & 24j terakhir
  let lLiq = 0, sLiq = 0, lLiq24 = 0, sLiq24 = 0;
  for (let k = Math.max(0, i - 5); k <= i; k++) { lLiq += bars[k].liqLong; sLiq += bars[k].liqShort; }
  for (let k = Math.max(0, i - 23); k <= i; k++) { lLiq24 += bars[k].liqLong; sLiq24 += bars[k].liqShort; }
  const dominan = lLiq + sLiq > 0 ? (sLiq >= 2.5 * Math.max(lLiq, 1) ? 'SHORT' : lLiq >= 2.5 * Math.max(sLiq, 1) ? 'LONG' : null) : null;
  // hukum yang dirujuk vonis ini — PRIORITAS: prediksi model kaskade dulu, baru dominan 6j
  const hukumRujuk: { nama: string; rate: number; n: number }[] = [];
  const korbanRate = (laporan.rerata as { korban: number }).korban;
  if (korban === 'SHORT') { const h = hukum.find((h) => h.nama.startsWith('banjir likuidasi SHORT')); if (h) hukumRujuk.push({ nama: `prediksi model: banjir likuidasi SHORT 6j → harga naik (keakuratan sisi model ujian buta ${(korbanRate * 100).toFixed(1)}%)`, rate: h.rate, n: h.n }); }
  if (korban === 'LONG') { const h = hukum.find((h) => h.nama.startsWith('banjir likuidasi LONG')); if (h) hukumRujuk.push({ nama: `prediksi model: banjir likuidasi LONG 6j → harga turun (keakuratan sisi model ujian buta ${(korbanRate * 100).toFixed(1)}%)`, rate: h.rate, n: h.n }); }
  if (hukumRujuk.length === 0 && dominan === 'SHORT') { const h = hukum.find((h) => h.nama.startsWith('banjir likuidasi SHORT')); if (h) hukumRujuk.push({ nama: h.nama, rate: h.rate, n: h.n }); }
  if (hukumRujuk.length === 0 && dominan === 'LONG') { const h = hukum.find((h) => h.nama.startsWith('banjir likuidasi LONG')); if (h) hukumRujuk.push({ nama: h.nama, rate: h.rate, n: h.n }); }

  // NOTE: likuidasi 24j (lLiq24/sLiq24) dihitung di bawah sebelum dipakai profil jam
  const alasan: string[] = [];
  const totU = b.longU + b.shortU;
  const ls4 = bars[i - 4].longU + bars[i - 4].shortU;
  const longShareNow = totU > 0 ? b.longU / totU : 0.5;
  const longShare4 = ls4 > 0 ? bars[i - 4].longU / ls4 : 0.5;
  const topShare = topShareNow(bars, i);
  const ts4 = bars[i - 4].topLong + bars[i - 4].topShort;
  alasan.push(`orang Gate: ${b.longU} long vs ${b.shortU} short (${totU ? ((b.longU / totU) * 100).toFixed(0) : '—'}% long)`);
  alasan.push(`whale top-20: ${(b.topLong / 1e3).toFixed(0)}k long vs ${(b.topShort / 1e3).toFixed(0)}k short (topShare ${(topShare * 100).toFixed(0)}%)`);
  alasan.push(`OI ${b.oi.toLocaleString('id-ID')} (${fmt24(oiD24Of(bars, i))} 24j) · funding ${(b.funding * 100).toFixed(4)}%`);
  alasan.push(`likuidasi 6j terakhir: long $${Math.round(lLiq)} vs short $${Math.round(sLiq)}${dominan ? ` — dominasi ${dominan}` : ''}`);
  if (korban) alasan.push(`MODEL KASKADE: sisi ${korban} berisiko dilikuidasi 6 jam ke depan (skor ${sK.toFixed(2)}, alarm ${alarmLevel})`);
  else alasan.push(`MODEL KASKADE: tanpa sisi yang menonjol — pasar bisa diam (skor ${sK.toFixed(2)})`);
  alasan.push(`MODEL ARAH: ${arah} (skor ${sA.toFixed(2)} — teruji sentuh-pertama hanya ~51% buta; pakai sebagai bias, bukan kepastian)`);

  // profil jam otak paham — dari stats jam yang sudah dihitung di atas
  perbaruiProfilJam({ nJam: n, funding: bars.map((x) => x.funding), liq24jLongUsd: lLiq24, liq24jShortUsd: sLiq24, jamNaik: bars.filter((x) => x.c > x.o).length });

  const uj = laporan as { kalib?: { sentuh?: { acc: number }; korban?: { acc: number }; nKor?: number }; ronde?: { ronde: number; sentuh: number; tutup: number; korban: number; nKor: number; alarmRate: number; alarmPresisi: number; alarmArah: number; nKask?: number }[]; rerata?: { sentuh: number; korban: number; alarmArah: number; alarmPresisi: number }; elsaButa?: { sentuh: number; korban: number; nKor: number }; walkforwardElsa?: { sentuh: number; korban: number; nKor: number; alarmPresisi: number; alarmArah: number } };
  const rondeOk = (uj.ronde ?? []).filter((r) => r.nKor > 0);
  // koreksi keyakinan dari neuron paham — pengalaman ELSA sendiri mengalir balik
  const koreksi = koreksiKeyakinanAliran();
  const pahamData = bacaPaham();
  if (koreksi) alasan.push(`NEURON PAHAM: ${koreksi.dasar}`);
  alasan.push(`NEURON PAHAM: rekam jejak ELSA — ${pahamData.rekam.diadili}/${pahamData.rekam.nVonis} vonis diadili candle+likuidasi nyata${pahamData.rekam.benarArah !== null ? ` · arah benar ${(pahamData.rekam.benarArah * 100).toFixed(0)}%` : ''}${pahamData.rekam.benarKorban !== null ? ` · sisi korban benar ${(pahamData.rekam.benarKorban * 100).toFixed(0)}% (${pahamData.rekam.benarKorbanN} kasus ber-sisi)` : ''} · regime vonis kini: ${regime}`);
  const catatanJujur = [
    'Ujian buta (soal segar yang belum pernah dilihat model, 10 ronde × 500 soal): rerata tersaji di scoreboard — angka TIDAK dipoles.',
    'Protokol tutup-vs-tutup GAGAL (36-40%) — dicatat sebagai pelajaran, tidak dipakai vonis.',
    `TUMOR DIBEDAH (keluhan pemilik): model dasar memang dilatih koin lama EVAA/PIEVERSE/AGT sebagai guru masa lalu — tapi lapisan hidup OTAK PAHAM kini menguasai ELSA sendiri: ${pahamData.rekam.diadili} vonis sudah diadili candle+likuidasi nyata ELSA, kepahaman per regime medan tumbuh tiap denyut, dan koreksinya menempel pada keyakinan di atas.`,
    'Di luar episode kaskade, arah 6 jam mikro-koin sebagian besar noise — formula menolak mengklaim bisa membaca yang tidak bisa dibaca.',
  ];
  return {
    at: new Date().toISOString(),
    harga: b.c, oi: b.oi,
    oiD24: oiD24Of(bars, i), funding: b.funding, fundingMa3: rata([0, 1, 2].map((k) => bars[Math.max(0, i - k)].funding)),
    orang: {
      long: b.longU, short: b.shortU, total: totU,
      rasioLong: totU > 0 ? b.longU / totU : null,
      dLongShare4: ls4 > 0 ? longShareNow - longShare4 : null,
    },
    whaleTop: {
      topLong: b.topLong, topShort: b.topShort, topShare, dTopShare4: ts4 > 0 ? topShare - bars[i - 4].topLong / ts4 : null,
      topLongAkun: b.topLongAkun, topShortAkun: b.topShortAkun,
    },
    taker: { imb: takerImbOf(bars, i), imbMa3: rata([0, 1, 2].map((k) => takerImbOf(bars, Math.max(0, i - k)))) },
    liq6j: { longUsd: lLiq, shortUsd: sLiq, dominan, liq24j: { longUsd: lLiq24, shortUsd: sLiq24 } },
    vonis: {
      arah, pArah: Math.round(pA * 1000) / 1000, skorArah: Math.round(sA * 100) / 100,
      korban, skorKorban: Math.round(sK * 100) / 100, pKorban: Math.round(pK * 1000) / 1000,
      alarm, alarmLevel,
      hukumRujuk,
      alasan,
      keyakinan: Math.max(0, Math.min(100, Math.round(Math.abs(pA - 0.5) * 200) + (koreksi?.delta ?? 0))),
    },
    ujian: {
      kalibrasi: { sentuh: uj.kalib?.sentuh?.acc ?? 0, korban: uj.kalib?.korban?.acc ?? 0, nKor: uj.kalib?.nKor ?? 0 },
      rondeJumlah: (uj.ronde ?? []).length,
      ronde: (uj.ronde ?? []).map((r) => ({ n: r.ronde, sentuh: r.sentuh, korban: r.nKor > 0 ? r.korban : 0, nKor: r.nKor, alarmPresisi: r.alarmPresisi, alarmArah: r.alarmArah })),
      rerata: {
        sentuh: uj.rerata?.sentuh ?? 0,
        korban: rondeOk.length ? rata(rondeOk.map((r) => r.korban)) : (uj.rerata?.korban ?? 0),
        alarmArah: uj.rerata?.alarmArah ?? 0,
        alarmPresisi: uj.rerata?.alarmPresisi ?? 0,
      },
      elsaButa: { sentuh: uj.elsaButa?.sentuh ?? 0, korban: uj.elsaButa?.korban ?? 0, nKor: uj.elsaButa?.nKor ?? 0 },
      walkforward: {
        sentuh: uj.walkforwardElsa?.sentuh ?? 0, korban: uj.walkforwardElsa?.korban ?? 0, nKor: uj.walkforwardElsa?.nKor ?? 0,
        alarmPresisi: uj.walkforwardElsa?.alarmPresisi ?? 0, alarmArah: uj.walkforwardElsa?.alarmArah ?? 0,
      },
      dilatih: model.meta?.dilatih ?? 0, episodeKaskade: model.meta?.kaskade ?? 0,
    },
    hukum,
    catatanJujur,
    paham: {
      nVonis: pahamData.rekam.nVonis, diadili: pahamData.rekam.diadili,
      benarArah: pahamData.rekam.benarArah, benarKorban: pahamData.rekam.benarKorban, benarKorbanN: pahamData.rekam.benarKorbanN,
      koreksiDasar: koreksi?.dasar ?? null, catatan: pahamData.catatan,
    },
  };
}
// pembantu kecil
function topShareNow(bars: Bar[], i: number): number {
  const b = bars[i];
  const tot = b.topLong + b.topShort;
  return tot > 0 ? b.topLong / tot : 0.5;
}
function oiD24Of(bars: Bar[], i: number): number | null {
  if (i < 24) return null;
  const a = bars[i - 24].oi;
  return a > 0 ? bars[i].oi / a - 1 : null;
}
function takerImbOf(bars: Bar[], i: number): number {
  const b = bars[i];
  const tot = b.longTaker + b.shortTaker;
  return tot > 0 ? (b.longTaker - b.shortTaker) / tot : 0;
}
function fmt24(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return '—';
  return `${v >= 0 ? '+' : ''}${(v * 100).toFixed(1)}%`;
}
