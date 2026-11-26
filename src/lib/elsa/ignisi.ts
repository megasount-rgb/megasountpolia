// ============================================================
// MICAPROFITA-ELSA · RADAR ANTI-KECOLONGAN (IGNISI)
// ============================================================
// LUKA NYATA (keluhan pemilik 2026-11-26): harga ELSA melonjak
// 0.0835 → 0.1166 (+37%) dalam SATU JAM (candle 03:00 UTC) dan
// SISTEM TAK MELIHAT SATU PUN: verdict tetap BUNUH_LONG (K033
// "tanpa pola besar menyala"), jantung dompet justru membuka
// SHORT 0.1140 di puncak — uPnl -27 USD. Inilah kecolongan yang
// kata pemilik: "suatu waktu whale bisa saja masuk tanpa
// diketahui!!"
//
// AKAR LUKA (jujur): vonis arah dihitung dari CANDLE HARIAN —
// ledakan yang lahir dan tuntas dalam satu jam tak terlihat
// sampai hari ganti. Radar paus lama hanya menyalai saat cetakan
// BESAR (>~$10k) muncul di tape; whale modern memecah pesanan
// jadi ratusan potongan kecil (iceberg / TWAP) — semua di bawah
// ambang cetakan besar → radar bisu.
//
// HUKUM BARU — TUJUH LAPIS ANTI-KECOLONGAN, semuanya dari data
// nyata per-menit (bukan daily, bukan cetakan besar saja):
//   L1 AKUMULASI SENYAP  — harga merangkak naik + CVD positif
//                          pada VOLUME RENDAH (absorpsi diam;
//                          kaki whale pecah-potongan)
//   L2 PERCEPATAN VOLUME — z-score volume per-menit vs jam lalu
//   L3 KECEPATAN HARGA   — velocity %/menit berkelanjutan
//   L4 SAPUAN TAKER      — rentetan taker-buy menyapu ask
//                          (CVD vertikal, bukan cetakan tunggal)
//   L5 GEMA LINTAS-VENUE — ledakan sama-arah di 2 venue serentak
//   L6 OKSIGEN FUTURES   — OI melonjak % + funding berbalik
//   L7 ROTASI VENUE      — porsi volume Gate↔Bybit berbalik
//                          mendadak (whale pindah meja diam-diam)
//   L8 PARABOLIK         — fase vertikal (jarak ke EMA menit)
// Mesin negara: TENANG → MERANGKAK → MENYALA → PARABOLIK →
// KONVERSI → TENANG. Setiap TRANSISI bertimestamp — jadi kita
// JUJUR mengukur "berapa menit keterlambatan radar" (latensi
// deteksi) per kejadian; itu dipakai kasus + ujian.
//
// PAKAI: dompet-jantung (dilarang SHORT saat ignisi NAIK menyala;
// posisi melawan ignisi → stop ditarik dekat SEKARANG, bukan
// nunggu SL jauh), arah.ts E13 (dewan vonis), guru (briefing),
// kasus.ts (rekonstruksi), UI (panel radar).
// ============================================================
import fs from 'fs';
import type { SumberKesaksian } from './sumber';
import { catatOtonomi } from './otonomi';

const DIR_IGN = '/home/z/my-project/db/elsa/paus';
const FILE = `${DIR_IGN}/ignisi.json`;
const PAUS_JIWA_FILE = '/home/z/my-project/db/elsa/paus/neuron.json';

export type NegaraIgnisi = 'TENANG' | 'MERANGKAK' | 'MENYALA' | 'PARABOLIK' | 'KONVERSI';
export type ArahIgnisi = 'NAIK' | 'TURUN' | '—';

export type LapisanIgnisi = {
  id: string; nama: string; aktif: boolean; arah: ArahIgnisi;
  kekuatan: number; // 0..1
  bukti: string; angka: string;
};

export type TransisiIgnisi = {
  at: string; dari: NegaraIgnisi; ke: NegaraIgnisi;
  arah: ArahIgnisi; keyakinan: number; lapisanPemicu: string;
};

export type IgnisiData = {
  at: string; denyutKe: number;
  negara: NegaraIgnisi; negaraSebelum: NegaraIgnisi; arah: ArahIgnisi;
  keyakinan: number; // 0..100
  harga: number; hargaAnchor: number | null; // harga saat MERANGKAK mulai
  lapisan: LapisanIgnisi[];
  nLapisanAktif: number;
  transisi: TransisiIgnisi[]; // terbaru dulu, cap 60
  latensiDeteksiMenit: number | null; // dari first-signal → MENYALA
  peringkatRadar: 'SEGAH' | 'WASPADA' | 'BAHAYA' | 'MENYALA'; // label UI
  laranganShort: boolean; laranganLong: boolean;
  cerita: string;
  titikButa: string[]; // jujur: apa yang tetap bisa lolos
  metrik: { volZ: number; velocityPct: number; cvdUsd: number; cvdUsd30m: number;
    oiDelta1jPct: number | null; fundingRata: number | null; rotasiGatePct: number | null;
    jarakEmaMenitPct: number; driftMenitPct: number };
};

// ---------------- fetcher data nyata per-menit ----------------
type Menit = { t: number; o: number; h: number; l: number; c: number; v: number };

async function getJson(url: string, timeoutMs = 12000): Promise<unknown> {
  const r = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), cache: 'no-store' });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url.slice(0, 80)}`);
  return r.json();
}

// Gate 1m — [ts, vol, close, high, low, open] string, ascending
async function gateMenit(): Promise<Menit[]> {
  try {
    const j = (await getJson('https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=ELSA_USDT&interval=1m&limit=240')) as string[][];
    return j.map((k) => ({
      t: Number(k[0]) * 1000, o: Number(k[5]), h: Number(k[3]),
      l: Number(k[4]), c: Number(k[2]), v: Number(k[1]),
    })).filter((m) => Number.isFinite(m.c) && Number.isFinite(m.v)).sort((a, b) => a.t - b.t);
  } catch { return []; }
}

// Bybit 1m spot (gema venue) — list terbaru dulu
async function bybitMenit(): Promise<Menit[]> {
  try {
    const j = (await getJson('https://api.bybit.com/v5/market/kline?category=spot&symbol=ELSAUSDT&interval=1&limit=240')) as {
      retCode: number; result?: { list?: string[][] };
    };
    if (j.retCode !== 0) return [];
    return (j.result?.list ?? []).map((r) => ({
      t: Number(r[0]), o: Number(r[1]), h: Number(r[2]), l: Number(r[3]), c: Number(r[4]), v: Number(r[5]),
    })).filter((m) => Number.isFinite(m.c)).sort((a, b) => a.t - b.t);
  } catch { return []; }
}

// OI futures per-jam Bybit linear — { openInterest, timestamp(ms) }
async function oiFutures(): Promise<{ oi: number; t: number }[]> {
  try {
    const j = (await getJson('https://api.bybit.com/v5/market/open-interest?category=linear&symbol=ELSAUSDT&intervalTime=60&limit=30')) as {
      retCode: number; result?: { list?: { openInterest: string; timestamp: string }[] };
    };
    if (j.retCode !== 0) return [];
    return (j.result?.list ?? []).map((r) => ({ oi: Number(r.openInterest), t: Number(r.timestamp) }))
      .filter((x) => Number.isFinite(x.oi)).sort((a, b) => a.t - b.t);
  } catch { return []; }
}

// Funding terakhir (rate per interval)
async function fundingTerakhir(): Promise<number[]> {
  try {
    const j = (await getJson('https://api.bybit.com/v5/market/funding/history?category=linear&symbol=ELSAUSDT&limit=3')) as {
      retCode: number; result?: { list?: { fundingRate: string }[] };
    };
    if (j.retCode !== 0) return [];
    return (j.result?.list ?? []).map((r) => Number(r.fundingRate)).filter(Number.isFinite);
  } catch { return []; }
}

// Tape taker (dua venue) — utk CVD & sapuan: sisi taker nyata
type Tape = { t: number; venue: string; sisi: 'BELI' | 'JUAL'; usd: number };
async function tapeTaker(): Promise<Tape[]> {
  const out: Tape[] = [];
  try {
    const j = (await getJson('https://api.bybit.com/v5/market/recent-trade?category=spot&symbol=ELSAUSDT&limit=900')) as {
      retCode: number; result?: { list?: { time: string; side: string; price: string; size: string }[] };
    };
    for (const r of j.result?.list ?? []) {
      const usd = Number(r.price) * Number(r.size);
      if (!Number.isFinite(usd)) continue;
      out.push({ t: Number(r.time), venue: 'BYBIT', sisi: r.side === 'Buy' ? 'BELI' : 'JUAL', usd });
    }
  } catch { /* venue ini gagal — lain tetap hidup */ }
  try {
    const j = (await getJson('https://api.gateio.ws/api/v4/spot/trades?currency_pair=ELSA_USDT&limit=200')) as {
      id: number; create_time_ms: number | string; side: string; amount: string; price: string;
    }[];
    for (const r of j) {
      const usd = Number(r.price) * Number(r.amount);
      const t = typeof r.create_time_ms === 'string' ? Number(r.create_time_ms) : Number(r.create_time_ms) * 1000;
      if (!Number.isFinite(usd) || !Number.isFinite(t)) continue;
      out.push({ t, venue: 'GATE', sisi: r.side === 'buy' ? 'BELI' : 'JUAL', usd });
    }
  } catch { /* venue ini gagal — lain tetap hidup */ }
  return out.sort((a, b) => a.t - b.t);
}

// ---------------- keadaan tersimpan ----------------
type Keadaan = {
  denyutKe: number; negara: NegaraIgnisi; negaraSebelum: NegaraIgnisi;
  arah: ArahIgnisi; hargaAnchor: number | null;
  transisi: TransisiIgnisi[]; atMenyalaPertama: string | null; atPertamaTanda: string | null;
};
function baca(): Keadaan {
  try {
    if (fs.existsSync(FILE)) {
      const j = JSON.parse(fs.readFileSync(FILE, 'utf8')) as { keadaan?: Keadaan };
      if (j.keadaan) return j.keadaan;
    }
  } catch { /* mulai baru */ }
  return { denyutKe: 0, negara: 'TENANG', negaraSebelum: 'TENANG', arah: '—', hargaAnchor: null, transisi: [], atMenyalaPertama: null, atPertamaTanda: null };
}
function tulis(k: Keadaan, data: IgnisiData) {
  try {
    fs.mkdirSync(DIR_IGN, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify({ at: data.at, keadaan: k, data }, null, 0));
  } catch { /* abai */ }
}

const POI = (x: number) => Number.isFinite(x);
const pct = (a: number, b: number) => b === 0 ? 0 : (a - b) / b * 100;

// ---------------- satu denyut radar ----------------
let berdenyut = false;
async function denyutInti(): Promise<IgnisiData> {
  const k0 = baca();
  const sekarang = Date.now();
  const menit = await gateMenit();
  const venue2 = await bybitMenit();
  const oi = await oiFutures();
  const fund = await fundingTerakhir();
  const tape = await tapeTaker();

  const harga = menit.length ? menit[menit.length - 1].c : (venue2.length ? venue2[venue2.length - 1].c : 0);
  const jendela = menit.slice(-90); // 90 menit terakhir
  const dasar = menit.slice(-150, -3); // baseline volume: 147 menit sebelum 3 menit terakhir

  // ---- metrik inti ----
  const volMean = dasar.length ? dasar.reduce((s, m) => s + m.v, 0) / dasar.length : 0;
  const volTerakhir5 = jendela.slice(-5).reduce((s, m) => s + m.v, 0) / 5;
  const volZ = volMean > 0 ? (volTerakhir5 - volMean) / Math.max(volMean, 1e-9) : 0;

  const c30 = jendela.slice(-30);
  const driftMenitPct = c30.length ? pct(c30[c30.length - 1].c, c30[0].o) : 0; // % per 30 menit

  const emaSrc = jendela.map((m) => m.c);
  let ema = emaSrc.length ? emaSrc[0] : harga;
  const KALPHA = 2 / 12;
  for (const c of emaSrc) ema = ema * (1 - KALPHA) + c * KALPHA;
  const jarakEmaMenitPct = ema > 0 ? pct(harga, ema) : 0;

  // velocity: |perubahan| per menit, 3 menit terakhir
  const v3 = menit.slice(-4);
  const velocityPct = v3.length >= 4 ? Math.abs(pct(v3[3].c, v3[0].o)) / 3 : 0;

  // CVD dua jendela dari tape taker
  const t5 = tape.filter((x) => sekarang - x.t <= 5 * 60 * 1000);
  const t30 = tape.filter((x) => sekarang - x.t <= 30 * 60 * 1000);
  const cvdUsd = t5.reduce((s, x) => s + (x.sisi === 'BELI' ? x.usd : -x.usd), 0);
  const cvdUsd30m = t30.reduce((s, x) => s + (x.sisi === 'BELI' ? x.usd : -x.usd), 0);

  const oiDelta1jPct = oi.length >= 2 && oi[oi.length - 2].oi > 0
    ? pct(oi[oi.length - 1].oi, oi[oi.length - 2].oi) : null;
  const fundingRata = fund.length ? fund.reduce((s, f) => s + f, 0) / fund.length : null;

  // rotasi venue: share volume Gate dalam 10 menit terakhir vs baseline 2 jam
  const volGate10 = menit.slice(-10).reduce((s, m) => s + m.v, 0);
  const volBybit10 = (() => {
    const t0 = sekarang - 10 * 60 * 1000;
    return venue2.filter((m) => m.t >= t0).reduce((s, m) => s + m.v, 0);
  })();
  const rotasiGatePct = (volGate10 + volBybit10) > 0 ? volGate10 / (volGate10 + volBybit10) * 100 : null;

  const arahDrift: ArahIgnisi = driftMenitPct > 0.3 ? 'NAIK' : driftMenitPct < -0.3 ? 'TURUN' : '—';
  const arahCvd: ArahIgnisi = cvdUsd > 0 ? 'NAIK' : cvdUsd < 0 ? 'TURUN' : '—';
  const arahVel: ArahIgnisi = menit.length >= 4 && menit[menit.length - 1].c > menit[menit.length - 4].o ? 'NAIK'
    : menit.length >= 4 && menit[menit.length - 1].c < menit[menit.length - 4].o ? 'TURUN' : '—';

  // ---- L1 AKUMULASI SENYAP: harga merangkak + CVD searah + volume masih rendah ----
  const l1 = (() => {
    const aktif = arahDrift !== '—' && arahCvd === arahDrift && Math.abs(driftMenitPct) >= 0.5
      && volZ < 2.5 && Math.abs(cvdUsd) >= 500 && Math.abs(driftMenitPct) < 6;
    return {
      id: 'L1', nama: 'AKUMULASI SENYAP', aktif, arah: aktif ? arahDrift as ArahIgnisi : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, Math.abs(driftMenitPct) / 3 * 0.7 + Math.abs(cvdUsd) / 4000 * 0.3) : 0,
      bukti: aktif ? `harga geser ${driftMenitPct >= 0 ? '+' : ''}${driftMenitPct.toFixed(2)}% (30m) pada volume ${volZ < 1 ? 'masih' : 'menjelang'} rata-rata sementara CVD taker ${cvdUsd >= 0 ? '+' : ''}$${Math.round(cvdUsd).toLocaleString('en-US')} mengikuti arah sama — kaki whale pecah-potongan menyedot pasokan DIAM-DIAM; ini kelompok tanda yang RADAR LAMA GAGAL lihat` : 'tidak ada absorpsi senyap yang terukur',
      angka: `drift30m ${driftMenitPct >= 0 ? '+' : ''}${driftMenitPct.toFixed(2)}% · CVD30m $${Math.round(cvdUsd30m).toLocaleString('en-US')} · volZ ${volZ.toFixed(2)}`,
    } as LapisanIgnisi;
  })();

  // ---- L2 PERCEPATAN VOLUME ----
  const l2 = (() => {
    const aktif = volZ >= 3 && POI(volZ);
    return {
      id: 'L2', nama: 'PERCEPATAN VOLUME', aktif, arah: aktif ? arahVel : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, volZ / 12) : 0,
      bukti: aktif ? `volume per-menit ${volZ.toFixed(1)}× di atas rata-rata 147 menit sebelumnya — ada uang baru masuk, bukan harga jalan sendiri` : 'volume sepadan dengan baseline',
      angka: `volZ ${volZ.toFixed(2)}× · 5m-avg $${Math.round(volTerakhir5).toLocaleString('en-US')} ELSA/menit`,
    } as LapisanIgnisi;
  })();

  // ---- L3 KECEPATAN HARGA ----
  const l3 = (() => {
    const aktif = velocityPct >= 1.0;
    return {
      id: 'L3', nama: 'KECEPATAN HARGA', aktif, arah: aktif ? arahVel : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, velocityPct / 4) : 0,
      bukti: aktif ? `harga meluncur ${arahVel === 'NAIK' ? 'naik' : 'turun'} ${velocityPct.toFixed(2)}%/menit berkelanjutan 3 menit — gerak ini hanya bisa dilakukan pesanan pasar besar` : 'kecepatan harga normal',
      angka: `velocity ${velocityPct.toFixed(2)}%/menit (3m)`,
    } as LapisanIgnisi;
  })();

  // ---- L4 SAPUAN TAKER: rentetan taker searah + CVD vertikal ----
  const l4 = (() => {
    const streak = (() => {
      let n = 0; let sisi: 'BELI' | 'JUAL' | null = null;
      for (let i = t5.length - 1; i >= 0 && n < 12; i--) {
        const x = t5[i];
        if (!sisi) sisi = x.sisi;
        else if (x.sisi !== sisi) break;
        n++;
      }
      return { n, sisi: sisi ?? 'BELI' };
    })();
    const cvdSama = (streak.sisi === 'BELI' && cvdUsd > 800) || (streak.sisi === 'JUAL' && cvdUsd < -800);
    const aktif = streak.n >= 5 && cvdSama;
    return {
      id: 'L4', nama: 'SAPUAN TAKER', aktif, arah: aktif ? (streak.sisi === 'BELI' ? 'NAIK' : 'TURUN') : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, streak.n / 12 * 0.6 + Math.min(1, Math.abs(cvdUsd) / 8000) * 0.4) : 0,
      bukti: aktif ? `${streak.n} cetakan taker ${streak.sisi === 'BELI' ? 'BELI berurutan menyapu ask' : 'JUAL berurutan menghantam bid'} tanpa balik — CVD ${cvdUsd >= 0 ? '+' : ''}$${Math.round(cvdUsd).toLocaleString('en-US')} (5m) — buku sedang dimakan habis satu sisi` : 'taker dua arah, tidak ada sapuan',
      angka: `streak ${streak.n} ${streak.sisi} · CVD5m $${Math.round(cvdUsd).toLocaleString('en-US')}`,
    } as LapisanIgnisi;
  })();

  // ---- L5 GEMA LINTAS-VENUE: kedua venue bergerak sama arah dalam 10 menit ----
  const l5 = (() => {
    const g30 = jendela.slice(-10);
    const gHarga = g30.length ? pct(g30[g30.length - 1].c, g30[0].o) : 0;
    const t0 = sekarang - 10 * 60 * 1000;
    const b10 = venue2.filter((m) => m.t >= t0);
    const bHarga = b10.length ? pct(b10[b10.length - 1].c, b10[0].o) : 0;
    const sama = Math.sign(gHarga) === Math.sign(bHarga) && Math.abs(gHarga) >= 1.5 && Math.abs(bHarga) >= 0.5;
    return {
      id: 'L5', nama: 'GEMA LINTAS-VENUE', aktif: sama, arah: sama ? (gHarga > 0 ? 'NAIK' : 'TURUN') : '—' as ArahIgnisi,
      kekuatan: sama ? Math.min(1, Math.min(Math.abs(gHarga), Math.abs(bHarga)) / 5) : 0,
      bukti: sama ? `Gate ${gHarga >= 0 ? '+' : ''}${gHarga.toFixed(2)}% dan Bybit ${bHarga >= 0 ? '+' : ''}${bHarga.toFixed(2)}% (10m) bergerak SEARAH serentak — dana nyata lintas venue, bukan noise satu meja` : 'venue belum bergerak serentak',
      angka: `Gate ${gHarga >= 0 ? '+' : ''}${gHarga.toFixed(2)}% · Bybit ${bHarga >= 0 ? '+' : ''}${bHarga.toFixed(2)}% (10m)`,
    } as LapisanIgnisi;
  })();

  // ---- L6 OKSIGEN FUTURES: OI jump + funding berbalik searah ledakan ----
  const l6 = (() => {
    const oiAktif = oiDelta1jPct !== null && Math.abs(oiDelta1jPct) >= 8;
    const fundArah: ArahIgnisi = fundingRata === null ? '—' : fundingRata > 0.0002 ? 'NAIK' : fundingRata < -0.0002 ? 'TURUN' : '—';
    const aktif = oiAktif;
    return {
      id: 'L6', nama: 'OKSIGEN FUTURES', aktif, arah: aktif ? (oiDelta1jPct! > 0 ? 'NAIK' : 'TURUN') : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, Math.abs(oiDelta1jPct!) / 30 * 0.7 + (fundArah !== '—' ? 0.3 : 0)) : 0,
      bukti: aktif ? `open-interest futures berubah ${oiDelta1jPct! >= 0 ? '+' : ''}${oiDelta1jPct!.toFixed(1)}% dalam 1 jam — posisi baru DIBUKA massal${fundArah !== '—' ? `; funding ${fundingRata! >= 0 ? '+' : ''}${(fundingRata! * 100).toFixed(4)}% mengikuti` : ''}` : 'OI futures stabil',
      angka: `OI ${oiDelta1jPct === null ? '—' : `${oiDelta1jPct >= 0 ? '+' : ''}${oiDelta1jPct.toFixed(1)}%`} · funding ${(fundingRata ?? 0) * 100 >= 0 ? '+' : ''}${((fundingRata ?? 0) * 100).toFixed(4)}%`,
    } as LapisanIgnisi;
  })();

  // ---- L7 ROTASI VENUE: share Gate berbalik mendadak ----
  const l7 = (() => {
    const aktif = rotasiGatePct !== null && (rotasiGatePct >= 68 || rotasiGatePct <= 32) && volZ >= 2;
    return {
      id: 'L7', nama: 'ROTASI VENUE', aktif, arah: aktif ? arahVel : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, Math.abs(rotasiGatePct! - 50) / 45 * 0.6 + Math.min(1, volZ / 8) * 0.4) : 0,
      bukti: aktif ? `porsi volume Gate ${rotasiGatePct!.toFixed(0)}% (normal ~50%) saat volume ${volZ.toFixed(1)}× — whale memindahkan meja permainan diam-diam; kecolongan radar satu-venue tertutup` : 'porsi venue seimbang',
      angka: `Gate share ${rotasiGatePct === null ? '—' : `${rotasiGatePct.toFixed(0)}%`} · volZ ${volZ.toFixed(2)}`,
    } as LapisanIgnisi;
  })();

  // ---- L8 PARABOLIK: jarak ke EMA menit ekstrem ----
  const l8 = (() => {
    const aktif = Math.abs(jarakEmaMenitPct) >= 6;
    return {
      id: 'L8', nama: 'PARABOLIK', aktif, arah: aktif ? (jarakEmaMenitPct > 0 ? 'NAIK' : 'TURUN') : '—' as ArahIgnisi,
      kekuatan: aktif ? Math.min(1, Math.abs(jarakEmaMenitPct) / 18) : 0,
      bukti: aktif ? `harga ${jarakEmaMenitPct >= 0 ? '+' : ''}${jarakEmaMenitPct.toFixed(1)}% dari EMA-12 menit — fase vertikal; momentum murni, dilarang melawan` : 'harga menempel ratanya',
      angka: `jarak EMA ${jarakEmaMenitPct >= 0 ? '+' : ''}${jarakEmaMenitPct.toFixed(2)}%`,
    } as LapisanIgnisi;
  })();

  const lapisan = [l1, l2, l3, l4, l5, l6, l7, l8];
  const aktifArr = lapisan.filter((x) => x.aktif);

  // arah dominan: suara kekuatan tertimbang
  const suara = (a: ArahIgnisi) => aktifArr.filter((x) => x.arah === a).reduce((s, x) => s + x.kekuatan, 0);
  const suaraNaik = suara('NAIK'), suaraTurun = suara('TURUN');
  const arah: ArahIgnisi = suaraNaik > suaraTurun && suaraNaik > 0 ? 'NAIK' : suaraTurun > suaraNaik && suaraTurun > 0 ? 'TURUN' : k0.arah;

  // ---- mesin negara ----
  const nAktif = aktifArr.length;
  const kuat = Math.max(aktifArr.reduce((s, x) => s + x.kekuatan, 0), 0);
  let negaraBaru: NegaraIgnisi = k0.negara;
  const parabolikSejajar = l8.aktif && (l8.arah === arah);
  const nSearah = aktifArr.filter((x) => x.arah === arah).length;
  const menyalaKriteria = velocityPct >= 1.0 || (volZ >= 6 && l4.aktif) || nSearah >= 3;
  const merangkakKriteria = l1.aktif || (volZ >= 3 && Math.abs(driftMenitPct) >= 0.8);

  if (parabolikSejajar) negaraBaru = 'PARABOLIK';
  else if (menyalaKriteria && (arah === 'NAIK' || arah === 'TURUN')) negaraBaru = 'MENYALA';
  else if (merangkakKriteria && (arah === 'NAIK' || arah === 'TURUN')) negaraBaru = 'MERANGKAK';
  else if (k0.negara === 'PARABOLIK' || k0.negara === 'MENYALA' || k0.negara === 'KONVERSI') {
    // konversi: api meredup tapi harga masih menjauh dari anchor — tenda dingin
    const masihJauh = k0.hargaAnchor ? Math.abs(pct(harga, k0.hargaAnchor)) >= 4 : false;
    negaraBaru = masihJauh && velocityPct >= 0.4 ? 'KONVERSI' : 'TENANG';
  } else if (k0.negara === 'MERANGKAK') {
    // merangkak tanpa satu pun lapisan hidup = merangkak mati — jujur turun negara
    const masihJauh = k0.hargaAnchor ? Math.abs(pct(harga, k0.hargaAnchor)) >= 3 : false;
    negaraBaru = masihJauh ? 'KONVERSI' : 'TENANG';
  }

  // keyakinan: bobot negara + lapisan hidup + kekuatan gabungan — negara tanpa
  // lapisan pun tetap punya angka jujur (bukan 0% yang menyesatkan)
  const bobotNegara = negaraBaru === 'PARABOLIK' ? 42 : negaraBaru === 'MENYALA' ? 38 : negaraBaru === 'KONVERSI' ? 20 : negaraBaru === 'MERANGKAK' ? 14 : 0;
  const keyakinan = Math.round(Math.min(97, bobotNegara + 18 * nAktif + kuat * 34));

  // ---- transisi + jujur ukur latensi ----
  const k: Keadaan = { ...k0 };
  if (negaraBaru !== k.negara) {
    const tr: TransisiIgnisi = {
      at: new Date().toISOString(), dari: k.negara, ke: negaraBaru,
      arah, keyakinan, lapisanPemicu: aktifArr.filter((x) => x.arah === arah).map((x) => x.id).join('+') || '—',
    };
    k.transisi = [tr, ...k.transisi].slice(0, 60);
    if (negaraBaru === 'MERANGKAK' && !k.atPertamaTanda) k.atPertamaTanda = tr.at;
    if (negaraBaru === 'MENYALA' && !k.atMenyalaPertama) k.atMenyalaPertama = tr.at;
    if (negaraBaru === 'MERANGKAK' || negaraBaru === 'MENYALA' || negaraBaru === 'PARABOLIK') {
      if (k.hargaAnchor === null) k.hargaAnchor = harga;
      catatOtonomi({
        mesin: 'JANTUNG', pemicu: `RADAR-IGNISI→${negaraBaru}`, mandiri: true,
        hasil: `radar anti-kecolongan: pasar ${negaraBaru} arah ${arah} (keyakinan ${keyakinan}%, lapisan ${tr.lapisanPemicu}) — vonis & dompet wajib menjawab denyut ini`,
        bukti: `harga ${harga.toPrecision(6)} · ${aktifArr.filter((x) => x.arah === arah).map((x) => `${x.id} ${x.nama}`).join(', ')}`,
      });
    }
    k.negaraSebelum = k.negara;
    k.negara = negaraBaru;
    k.arah = arah;
  }
  k.denyutKe = k0.denyutKe + 1;

  const latensiDeteksiMenit = k.atPertamaTanda && k.atMenyalaPertama
    ? Math.max(1, Math.round((Date.parse(k.atMenyalaPertama) - Date.parse(k.atPertamaTanda)) / 60000)) : null;

  const peringkatRadar: IgnisiData['peringkatRadar'] =
    negaraBaru === 'PARABOLIK' || negaraBaru === 'MENYALA' ? 'MENYALA'
      : negaraBaru === 'KONVERSI' ? 'BAHAYA'
        : negaraBaru === 'MERANGKAK' ? 'WASPADA' : 'SEGAH';

  // ---- hukum dompet: dilarang melawan ignisi ----
  const laranganShort = (negaraBaru === 'MENYALA' || negaraBaru === 'PARABOLIK' || negaraBaru === 'KONVERSI') && arah === 'NAIK';
  const laranganLong = (negaraBaru === 'MENYALA' || negaraBaru === 'PARABOLIK' || negaraBaru === 'KONVERSI') && arah === 'TURUN';

  const cerita = (() => {
    if (negaraBaru === 'TENANG') return `radar segah: ${nAktif}/8 lapisan menyala, ${8 - nAktif} tidur; baseline volume ${Math.round(volMean).toLocaleString('en-US')} ELSA/menit — whale belum tampil, radar tetap MENJAGA (bukan tidur)`;
    if (negaraBaru === 'MERANGKAK') return `pasar MERANGKAK arah ${arah}: ${aktifArr.map((x) => x.nama).join(', ')} — kaki whale pecah-potongan terlihat SEBELUM ledakan; jantung dompet & vonis diperingatkan SEKARANG`;
    if (negaraBaru === 'MENYALA') return `IGNISI MENYALA arah ${arah} (keyakinan ${keyakinan}%): ${aktifArr.map((x) => x.nama).join(', ')} — lapisan ${tr2label(lapisan)}; DILARANG membuka posisi melawan arah ini, posisi melawan wajib tarik stop`;
    if (negaraBaru === 'PARABOLIK') return `PARABOLIK arah ${arah}: harga ${jarakEmaMenitPct >= 0 ? '+' : ''}${jarakEmaMenitPct.toFixed(1)}% di atas EMA menit — luka 2026-11-26 03:00 TAK BOLEH terulang: dilarang SHORT saat ini tanpa kecuali`;
    return `KONVERSI arah ${arah}: api meredup, harga masih ${k0.hargaAnchor ? pct(harga, k0.hargaAnchor).toFixed(1) : '—'}% dari anchor ${k0.hargaAnchor?.toPrecision(6) ?? '—'} — pasar sedang memilih melanjutkan atau mencerna; stop wajib rapat`;
  })();

  const titikButa = [
    'trading OTC / bilateral di luar tape venue ini — tak bisa diukur dari orderbook mana pun',
    'whale pindah token on-chain tanpa menjual di CEX (kumpul dulu, jual belakangan)',
    'pesanan tersembunyi (iceberg) yang tidak muncul di tape publik sampai dieksekusi',
    'venue kecil lain (MEXC, Bitget, DEX) yang tidak diawasi lapisan ini',
    'delay data public-trade venue (sampai ~2 menit) — radar menutupnya dengan lapisan harga/volume yang lebih cepat',
  ];

  const data: IgnisiData = {
    at: new Date().toISOString(), denyutKe: k.denyutKe,
    negara: k.negara, negaraSebelum: k.negaraSebelum, arah,
    keyakinan, harga, hargaAnchor: k.hargaAnchor,
    lapisan, nLapisanAktif: nAktif,
    transisi: k.transisi,
    latensiDeteksiMenit,
    peringkatRadar,
    laranganShort, laranganLong,
    cerita, titikButa,
    metrik: {
      volZ: Math.round(volZ * 100) / 100, velocityPct: Math.round(velocityPct * 1000) / 1000,
      cvdUsd: Math.round(cvdUsd), cvdUsd30m: Math.round(cvdUsd30m),
      oiDelta1jPct: oiDelta1jPct === null ? null : Math.round(oiDelta1jPct * 10) / 10,
      fundingRata: fundingRata === null ? null : fundingRata,
      rotasiGatePct: rotasiGatePct === null ? null : Math.round(rotasiGatePct),
      jarakEmaMenitPct: Math.round(jarakEmaMenitPct * 100) / 100,
      driftMenitPct: Math.round(driftMenitPct * 100) / 100,
    },
  };
  tulis(k, data);
  return data;
}

function tr2label(lapisan: LapisanIgnisi[]): string {
  const hidup = lapisan.filter((x) => x.aktif);
  return hidup.length ? hidup.map((x) => `${x.id}:${x.nama}`).join(' ') : '—';
}

export async function denyutIgnisi(): Promise<IgnisiData> {
  if (berdenyut) {
    const lama = bacaIgnisi();
    if (lama) return lama;
  }
  berdenyut = true;
  try { return await denyutInti(); }
  catch (e) {
    // jujur: jangan menutupi radar mati — pakai data lama + catat luka
    const lama = bacaIgnisi();
    if (lama) lama.cerita = `denyut radar GAGAL (${e instanceof Error ? e.message.slice(0, 60) : '?'}) — pakai kondisi terakhir; radar tidak bohong`;
    return lama ?? ({
      at: new Date().toISOString(), denyutKe: 0, negara: 'TENANG', negaraSebelum: 'TENANG',
      arah: '—', keyakinan: 0, harga: 0, hargaAnchor: null, lapisan: [], nLapisanAktif: 0,
      transisi: [], latensiDeteksiMenit: null, peringkatRadar: 'SEGAH',
      laranganShort: false, laranganLong: false,
      cerita: 'radar belum pernah berdenyut',
      titikButa: ['radar belum menyala — semua celah terbuka'],
      metrik: { volZ: 0, velocityPct: 0, cvdUsd: 0, cvdUsd30m: 0, oiDelta1jPct: null, fundingRata: null, rotasiGatePct: null, jarakEmaMenitPct: 0, driftMenitPct: 0 },
    } as IgnisiData);
  } finally { berdenyut = false; }
}

export function bacaIgnisi(): IgnisiData | null {
  try {
    if (fs.existsSync(FILE)) {
      const j = JSON.parse(fs.readFileSync(FILE, 'utf8')) as { data?: IgnisiData };
      if (j.data) return j.data;
    }
  } catch { /* abai */ }
  return null;
}

// kesaksian utk dewan vonis (arah.ts E13) — hanya dipanggil live, bukan ujian
export function kesaksianIgnisi(): SumberKesaksian[] {
  const d = bacaIgnisi();
  if (!d) return [];
  if (d.negara === 'TENANG') return [{ dari: 'IGNISI', vote: 'NETRAL', kekuatan: 0.15, cara: `radar segah (${d.nLapisanAktif} lapisan tidur) — tak ada arah dari data menit` }];
  const vote = d.arah === 'NAIK' ? 'NAIK' as const : d.arah === 'TURUN' ? 'TURUN' as const : 'NETRAL' as const;
  const kekuatan = d.negara === 'PARABOLIK' ? 0.95 : d.negara === 'MENYALA' ? 0.85 : d.negara === 'KONVERSI' ? 0.6 : 0.45;
  const hidup = d.lapisan.filter((x) => x.aktif).map((x) => x.nama).join(', ');
  return [{
    dari: 'IGNISI', vote, kekuatan,
    cara: `${d.negara} arah ${d.arah} keyakinan ${d.keyakinan}% — ${hidup || '—'} (luka 03:00: verdict harian buta intraday; radar ini menutupnya)`,
  }];
}

// gerbang dompet: arah terlarang saat ignisi menyala
export function pedangTerlarang(arahPedang: 'BUY' | 'SELL'): { terlarang: boolean; alasan: string } {
  const d = bacaIgnisi();
  if (!d) return { terlarang: false, alasan: 'radar belum berdenyut' };
  const negaraBerat = d.negara === 'MENYALA' || d.negara === 'PARABOLIK' || d.negara === 'KONVERSI';
  if (negaraBerat && d.arah === 'NAIK' && arahPedang === 'SELL') {
    return { terlarang: true, alasan: `IGNISI ${d.negara} NAIK (keyakinan ${d.keyakinan}%) — luka 2026-11-26 03:00: SHORT saat ignisi = ditembak sendiri; pedang SELL dirampas radar` };
  }
  if (negaraBerat && d.arah === 'TURUN' && arahPedang === 'BUY') {
    return { terlarang: true, alasan: `IGNISI ${d.negara} TURUN (keyakinan ${d.keyakinan}%) — menyapu taker jual aktif; pedang BUY dirampas radar` };
  }
  return { terlarang: false, alasan: `ignisi ${d.negara} ${d.arah} — pedang ${arahPedang} sah` };
}

// posisi melawan ignisi? (untuk pengawal dompet)
export function posisiMelawanIgnisi(arahPosisi: 'LONG' | 'SHORT'): { melawan: boolean; level: NegaraIgnisi | null; alasan: string } {
  const d = bacaIgnisi();
  if (!d) return { melawan: false, level: null, alasan: 'radar belum berdenyut' };
  const berat = d.negara === 'MENYALA' || d.negara === 'PARABOLIK';
  const melawan = berat && ((d.arah === 'NAIK' && arahPosisi === 'SHORT') || (d.arah === 'TURUN' && arahPosisi === 'LONG'));
  return {
    melawan, level: melawan ? d.negara : null,
    alasan: melawan
      ? `posisi ${arahPosisi} MELAWAN ignisi ${d.negara} arah ${d.arah} (keyakinan ${d.keyakinan}%) — stop WAJIB ditarik dekat harga sekarang; menunggu SL jauh = bunuh modal pelan`
      : `posisi ${arahPosisi} searah/tak konflik dengan ignisi ${d.negara} ${d.arah}`,
  };
}

// driver — dipanggil instrumentation tiap 60 dtk (mengikuti denyut jantung dompet)
export function mulaiRadarIgnisi(): void {
  const g = globalThis as { __elsaIgnisiTimer?: boolean };
  if (g.__elsaIgnisiTimer) return;
  g.__elsaIgnisiTimer = true;
  void denyutIgnisi().catch(() => null);
  setInterval(() => { void denyutIgnisi().catch(() => null); }, 60_000);
}

// sanity: radar menyala tapi neuron paus tak punya siluet baru → jujur di cerita
export function rekonsiliasiPaus(): string {
  try {
    const j = JSON.parse(fs.readFileSync(PAUS_JIWA_FILE, 'utf8')) as { at?: string };
    const umurMenit = j.at ? Math.round((Date.now() - Date.parse(j.at)) / 60000) : null;
    const d = bacaIgnisi();
    if (d && (d.negara === 'MENYALA' || d.negara === 'PARABOLIK') && umurMenit !== null && umurMenit > 10) {
      return `ignisi menyala tapi jiwa paus basi ${umurMenit} menit — radar anti-kecolongan hidup tanpa siluet: cetakan besar TAK ADA tapi pergerakan ADA = whale pecah-potongan (inilah mode kecolongan lama)`;
    }
    return `jiwa paus segar ${umurMenit ?? '—'} menit`;
  } catch { return 'jiwa paus belum ada'; }
}
