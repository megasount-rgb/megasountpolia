// ============================================================
// MICAPROFITA-ELSA · OTAK MODAL — organ fundamental futures.
// Pertanyaan yang dijawab (permintaan pemilik):
//   1) Apakah gerakan harga ELSA 100% digerakkan futures +
//      short squeeze, atau didukung uang spot?
//   2) Di mana koin ini banyak memasang likuidasi (peta likuidasi)?
//   3) Whale memasang posisi di mana & sebesar apa?
//   4) Posisi whale itu JEBAKAN atau PUMP beneran?
// Pola perhitungan (formula) ditulis terbuka di setiap blok.
//
// SUMBER DATA:
//  - Bybit v5 publik: perp linear ELSAUSDT (OI + riwayat RESMI open-interest,
//    funding, account-ratio, trade, kline) + spot ELSAUSDT (turnover, trade).
//  - Gate.io contract stats: JUMLAH ORANG long/short (long_users/short_users —
//    akun nyata), posisi top-20 whale (top_long/short_size) & agregat
//    likuidasi NYATA per period (long/short_liq_usd).
// KETERBATASAN JUJUR: peta likuidasi per-level tetap ESTIMASI (distribusi
// volume × tier leverage × MMR nyata 2.5% Gate); riwayat likuidasi agregat
// memakai angka resmi Gate.io. Memori granular (OI & jumlah orang) dicatat
// otak sendiri tiap poll ke db/ — makin lama panel hidup makin tajam.
// ============================================================
import { Candle } from './indicators';
import fs from 'fs';
// JIWA OTAK MODAL (keluhan pemilik: "fundamen modal gak ada ruh, gak ada
// neuron, bodoh karena gak ada otak") — neuron keyakinan + kalibrasi
// mandiri + kepahaman tertambang + modulasi vonis + kesaksian AR-E11
import { denyutModal, hitungModulasiVonis, type ModalJiwa } from './modal-jiwa';

const BASE = 'https://api.bybit.com';
const GATE = 'https://api.gateio.ws/api/v4/futures/usdt';
const GATE_KONTRAK = 'ELSA_USDT';
const FILE_HIST = '/home/z/my-project/db/elsa_modal_history.json';
const FILE_LEDGER = '/home/z/my-project/db/elsa_modal_ledger.json';
const FILE_USERS = '/home/z/my-project/db/elsa_modal_users.json';
const FILE_TAPE = '/home/z/my-project/db/elsa_tape.json';

// ---------------- tipe ----------------
export type SnapOI = { at: number; oi: number; price: number; funding: number };
export type AcaraModal = { at: string; kind: 'VONIS' | 'WHALE' | 'LIKUIDASI' | 'OTAK'; text: string };

export type ModalData = {
  at: string;
  meta: { sumber: string; catatan: string[] };
  harga: { spot: number; perp: number; basisPct: number; perubahan24jPct: number; high24h: number; low24h: number };
  oi: {
    sekarang: number | null; oiUsd: number | null;
    delta1j: number | null; delta4j: number | null; delta24j: number | null;
    hargaDelta1j: number | null; hargaDelta4j: number | null; hargaDelta24j: number | null;
    jumlahSampel: number; keterangan: string;
    riwayat: { at: number; oi: number }[]; // riwayat RESMI Bybit (interval 1 jam)
  };
  orang: {
    long: number | null; short: number | null; hold: number | null; rasioLong: number | null;
    bybitAkun: { buy: number | null; sell: number | null; sejarah1j: { at: number; buy: number }[] };
    riwayat: { at: number; long: number; short: number }[];
    sumber: string;
  };
  whaleTop: {
    topLongSize: number | null; topShortSize: number | null; topLsrSize: number | null;
    topLongAkun: number | null; topShortAkun: number | null;
    dTopLong: number | null; dTopShort: number | null; // Δ% ukuran top-20 dalam ~3 jam
    klasifikasi: 'PUMP_JUJUR' | 'JEBAKAN' | 'WAR_POSISI' | 'MENGUMPULKAN' | 'DIAM';
    cara: string; sumber: string;
  };
  liqReal: { at: number; longUsd: number; shortUsd: number; harga: number }[];
  tape: { harga: number; beliUsd: number; jualUsd: number; whaleBeliUsd: number; whaleJualUsd: number; n: number }[];
  korban: {
    tier: { lev: number; longHarga: number; longJarakPct: number; shortHarga: number; shortJarakPct: number }[];
    berikutnya: { sisi: 'long' | 'short'; jarakPct: number; harga: number; usd: number; narasi: string }[];
    formula: string;
  };
  funding: { sekarang: number; rata12: number; intervalJam: number; tinggi: boolean; sejarah: { at: number; rate: number }[] };
  lsRasio: { buyRatio: number | null; sellRatio: number | null; sejarah: { at: number; buy: number; sell: number }[] };
  volume: { perp24jUsd: number; spot24jUsd: number; bagianFuturesPct: number };
  taker: { perpBuyPct: number; spotBuyPct: number };
  drive: { pct: number; label: string; komponen: { k: string; v: number }[]; ket: string };
  squeeze: { skor: number; aktif: boolean; ket: string };
  likuidasi: {
    bands: { jarakPct: number; harga: number; longUsd: number; shortUsd: number }[];
    totalLongUsd: number; totalShortUsd: number;
    topLong: { harga: number; usd: number; jarakPct: number }[];
    topShort: { harga: number; usd: number; jarakPct: number }[];
    magnet: { sisi: 'long' | 'short'; harga: number; usd: number; jarakPct: number } | null;
    ket: string;
  };
  whale: {
    ambangPerp: number; ambangSpot: number;
    perpNet: number; spotNet: number; perpTotal: number; spotTotal: number;
    bias: number; biasLabel: string; konfirmasiSpot: number;
    print: { at: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; size: number; price: number; usd: number }[];
    cluster: { at: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; jumlah: number; usd: number }[];
  };
  sensus: SensusData;
  leverage: LevData;
  portal: PortalData;
  akumulasi: AkumulasiData;
  sidikWhale: SidikWhale;
  vonis: { vonis: string; pedang: 'BUNUH_SHORT' | 'BUNUH_LONG'; skor: number; alasan: string[]; implikasi: string; at: string };
  jiwa: ModalJiwa | null;
  acara: AcaraModal[];
  memoriOI: { at: number; oi: number; price: number }[];
};

// ---------------- TIPE GALI DALAM A1 (permintaan pemilik ronde berikut) ----------------
// 1) SENSUS LINTAS VENUE — menjawab "masa jumlahnya hanya segitu?":
//    Gate.io hanya SATU venue; ELSA nyatanya trading di ≥5 venue perp + ≥4 venue spot.
export type SensusVenueBaris = {
  venue: string; jenis: 'perp' | 'spot'; listed: boolean;
  oiElsa: number | null; oiUsd: number | null;
  vol24jUsd: number | null; harga: number | null;
  funding: number | null; intervalJam: number | null;
  ratioLong: number | null; ratioShort: number | null; sumberRatio: string;
  akunLong: number | null; akunShort: number | null; akunNyata: boolean;
  estAkun: number | null;
  catatan: string;
};
export type SensusData = {
  venues: SensusVenueBaris[];
  totalOiUsd: number | null; totalOiElsa: number | null;
  totalVolUsd: number | null;
  akunGate: { long: number | null; short: number | null; hold: number | null };
  estUniverseAkun: number | null;
  metodeEstimasi: string; ket: string;
};
// 2) ESTIMASI LEVERAGE — menjawab "yang dipasang itu harganya kali leverage berapa?"
export type LevData = {
  longDominan: number | null; shortDominan: number | null;
  dominanTier: number; nKaskade: number;
  kaskade: { at: number; dP: number; dOI: number; lev: number; sisi: 'long' | 'short' }[];
  metode: string;
};
// 3) PORTAL WAKTU — time traveler likuidasi: mana yang MATI pada harga berapa,
//    peluang kapan, dan harga akhir setelah domino kaskade.
export type SkenarioWaktu = {
  sisi: 'long' | 'short';
  dPct: number; triggerHarga: number;
  prob24j: number; prob72j: number;
  korbanUsd: number; estAkunKorban: number | null;
  tierMati: number[];
  hargaAkhir: number; dAkhirPct: number;
  dominoKe: number;
  narasi: string;
};
export type PortalData = {
  skenario: SkenarioWaktu[];
  bencanaTurun: SkenarioWaktu | null; bencanaNaik: SkenarioWaktu | null;
  sigma24jPct: number;
  metode: string;
};
// 4) AKUMULASI SENYAP SPOT — user yang beli diam-diam di spot sekian sekian
//    (biar harga tidak naik dulu) sebelum menaikan harga.
export type AkumulasiBand = {
  harga: number; usdSenyap: number; whaleUsd: number; nJam: number;
  venue: string; deltaPct: number; verdict: 'SENYAP' | 'AGRESIF' | 'SEDAKAN';
};
export type AkumulasiData = {
  band: AkumulasiBand[];
  verdict: string; skor: number; ket: string;
  perVenue: { bybit: number; gate: number; upbit: number };
  whaleTampung: { at: string; price: number; usd: number; band: number }[];
  metode: string;
};
// 5) SIDIK WHALE — memisahkan akun-akun whale yang berbeda dari jejak tiketnya
export type SidikWhale = {
  akun: { id: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; nPrint: number; usdTotal: number; ukuranTipe: number; terakhir: string; pola: string }[];
  ket: string;
};

// ---------------- cache & memori ----------------
let memModal: { at: number; data: ModalData } | null = null;
const TTL_MS = 60_000;

function bacaJson<T>(fp: string, fallback: T): T {
  try {
    if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { /* abai */ }
  return fallback;
}
function tulisJson(fp: string, v: unknown) {
  try {
    fs.mkdirSync('/home/z/my-project/db', { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(v));
  } catch { /* abai */ }
}

// ---------------- fetcher Bybit ----------------
async function getJson(url: string): Promise<{ retCode: number; result: Record<string, unknown> }> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`bybit ${res.status}`);
  const j = await res.json();
  if (j.retCode !== 0) throw new Error(`bybit retCode ${j.retCode}: ${j.retMsg}`);
  return j;
}

async function tickerLinear() {
  const j = await getJson(`${BASE}/v5/market/tickers?category=linear&symbol=ELSAUSDT`);
  const r = (j.result.list as Record<string, string>[])[0];
  return {
    lastPrice: Number(r.lastPrice),
    prevPrice24h: Number(r.prevPrice24h),
    high24h: Number(r.highPrice24h),
    low24h: Number(r.lowPrice24h),
    price24hPcnt: Number(r.price24hPcnt) * 100,
    turnover24h: Number(r.turnover24h),
    volume24h: Number(r.volume24h),
    openInterest: Number(r.openInterest),
    fundingRate: Number(r.fundingRate),
    nextFundingTime: Number(r.nextFundingTime),
  };
}

async function tickerSpot() {
  const j = await getJson(`${BASE}/v5/market/tickers?category=spot&symbol=ELSAUSDT`);
  const r = (j.result.list as Record<string, string>[])[0];
  return {
    lastPrice: Number(r.lastPrice),
    turnover24h: Number(r.turnover24h),
    volume24h: Number(r.volume24h),
  };
}

async function fundingHistory(limit = 24) {
  const j = await getJson(`${BASE}/v5/market/funding/history?category=linear&symbol=ELSAUSDT&limit=${limit}`);
  const list = (j.result.list as Record<string, string>[]) ?? [];
  return list
    .map((r) => ({ at: Number(r.fundingRateTimestamp), rate: Number(r.fundingRate) }))
    .sort((a, b) => a.at - b.at);
}

async function accountRatio(limit = 7) {
  const j = await getJson(`${BASE}/v5/market/account-ratio?category=linear&symbol=ELSAUSDT&period=1d&limit=${limit}`);
  const list = (j.result.list as Record<string, string>[]) ?? [];
  return list
    .map((r) => ({ at: Number(r.timestamp), buy: Number(r.buyRatio), sell: Number(r.sellRatio) }))
    .sort((a, b) => a.at - b.at);
}

type Trade = { at: number; side: 'Buy' | 'Sell'; size: number; price: number };
async function trades(category: 'linear' | 'spot', limit = 1000): Promise<Trade[]> {
  const j = await getJson(`${BASE}/v5/market/recent-trade?category=${category}&symbol=ELSAUSDT&limit=${limit}`);
  const list = (j.result.list as Record<string, string>[]) ?? [];
  return list
    .map((r) => ({ at: Number(r.time), side: (r.side === 'Sell' ? 'Sell' : 'Buy') as 'Buy' | 'Sell', size: Number(r.size), price: Number(r.price) }))
    .filter((t) => Number.isFinite(t.price) && Number.isFinite(t.size))
    .sort((a, b) => a.at - b.at);
}

// TAPE MEMORI — akumulasi trade 30 menit terakhir (koin tipis: 1 poll Bybit
// hanya mengembalikan potongan beberapa menit; whale print jarang muncul)
const JENDELA_TAPE_MS = 30 * 60_000;
async function tradesMemori(category: 'linear' | 'spot', limit = 1000): Promise<Trade[]> {
  const fresh = await trades(category, limit);
  const bufKey = `tape_${category}`;
  const semua = bacaJson<Record<string, Trade[]>>(FILE_TAPE, {});
  const lama = semua[bufKey] ?? [];
  const gabung = [...lama, ...fresh];
  const lihat = new Set<string>();
  const unik: Trade[] = [];
  const batasAtas = Date.now() - JENDELA_TAPE_MS;
  for (const t of gabung.sort((a, b) => a.at - b.at)) {
    if (t.at < batasAtas) continue;
    const k = `${t.at}|${t.side}|${t.size}|${t.price}`;
    if (lihat.has(k)) continue;
    lihat.add(k);
    unik.push(t);
  }
  const terpotong = unik.slice(-8000);
  semua[bufKey] = terpotong;
  tulisJson(FILE_TAPE, semua);
  return terpotong;
}

async function klineLinear(interval: '60' | 'D', limit: number): Promise<Candle[]> {
  const j = await getJson(`${BASE}/v5/market/kline?category=linear&symbol=ELSAUSDT&interval=${interval}&limit=${limit}`);
  const list = (j.result.list as string[][]) ?? [];
  return list
    .map((r) => ({ t: Number(r[0]), o: Number(r[1]), h: Number(r[2]), l: Number(r[3]), c: Number(r[4]), v: Number(r[5]) }))
    .sort((a, b) => a.t - b.t);
}

// ---------------- fetcher Gate.io (venue kedua ELSA perp —
// mempublikasi JUMLAH ORANG long/short + posisi top-20 whale) ----------------
async function gateKontrak() {
  const res = await fetch(`${GATE}/contracts/${GATE_KONTRAK}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`gate ${res.status}`);
  const j = (await res.json()) as Record<string, string | number>;
  return {
    longUsers: Math.max(0, Math.round(Number(j.long_users) || 0)),
    shortUsers: Math.max(0, Math.round(Number(j.short_users) || 0)),
    quanto: Number(j.quanto_multiplier) || 10,
    leverageMax: Number(j.leverage_max) || 20,
    maintenanceRate: Number(j.maintenance_rate) || 0.025,
    markPrice: Number(j.mark_price) || 0,
  };
}

type GateStat = {
  at: number; longUsers: number; shortUsers: number; lsrAccount: number; lsrTaker: number;
  topLongSize: number; topShortSize: number; topLsrSize: number; topLongAkun: number; topShortAkun: number;
  oi: number; oiUsd: number; longLiqSize: number; shortLiqSize: number; longLiqUsd: number; shortLiqUsd: number; markPrice: number;
};

async function gateStats(interval: '15m' | '1h'): Promise<GateStat[]> {
  try {
    const res = await fetch(`${GATE}/contract_stats?contract=${GATE_KONTRAK}&interval=${interval}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const j = (await res.json()) as Record<string, string | number>[];
    if (!Array.isArray(j)) return [];
    return j
      .map((r) => ({
        at: Number(r.time) * 1000,
        longUsers: Math.round(Number(r.long_users) || 0),
        shortUsers: Math.round(Number(r.short_users) || 0),
        lsrAccount: Number(r.lsr_account) || 0,
        lsrTaker: Number(r.lsr_taker) || 0,
        topLongSize: Number(r.top_long_size) || 0,
        topShortSize: Number(r.top_short_size) || 0,
        topLsrSize: Number(r.top_lsr_size) || 0,
        topLongAkun: Math.round(Number(r.top_long_account) || 0),
        topShortAkun: Math.round(Number(r.top_short_account) || 0),
        oi: Number(r.open_interest) || 0,
        oiUsd: Number(r.open_interest_usd) || 0,
        longLiqSize: Number(r.long_liq_size) || 0,
        shortLiqSize: Number(r.short_liq_size) || 0,
        longLiqUsd: Number(r.long_liq_usd_new) || Number(r.long_liq_usd) || 0,
        shortLiqUsd: Number(r.short_liq_usd_new) || Number(r.short_liq_usd) || 0,
        markPrice: Number(r.mark_price) || 0,
      }))
      .filter((s) => s.at > 0)
      .sort((a, b) => a.at - b.at);
  } catch {
    return [];
  }
}

// riwayat OI RESMI Bybit (endpoint open-interest — interval 1 jam)
async function oiHistoryBybit(limit = 48): Promise<{ at: number; oi: number }[]> {
  try {
    const j = await getJson(`${BASE}/v5/market/open-interest?category=linear&symbol=ELSAUSDT&intervalTime=1h&limit=${limit}`);
    const list = (j.result.list as Record<string, string>[]) ?? [];
    return list
      .map((r) => ({ at: Number(r.timestamp), oi: Number(r.openInterest) }))
      .filter((x) => Number.isFinite(x.oi) && x.oi > 0)
      .sort((a, b) => a.at - b.at);
  } catch {
    return [];
  }
}

// rasio akun Bybit period 1 jam (Bybit hanya memberi RASIO, bukan jumlah orang)
async function accountRatio1h(limit = 24): Promise<{ at: number; buy: number }[]> {
  try {
    const j = await getJson(`${BASE}/v5/market/account-ratio?category=linear&symbol=ELSAUSDT&period=1h&limit=${limit}`);
    const list = (j.result.list as Record<string, string>[]) ?? [];
    return list
      .map((r) => ({ at: Number(r.timestamp), buy: Number(r.buyRatio) }))
      .filter((x) => Number.isFinite(x.buy))
      .sort((a, b) => a.at - b.at);
  } catch {
    return [];
  }
}

// memori jumlah orang — otak mencatat sendiri tiap poll (dedupe 5 menit)
function catatOrang(snap: { long: number; short: number; topLong: number; topShort: number }) {
  const hist = bacaJson<{ titik: { at: number; long: number; short: number; topLong: number; topShort: number }[] }>(FILE_USERS, { titik: [] });
  const now = Date.now();
  const last = hist.titik[hist.titik.length - 1];
  if (!last || now - last.at >= 5 * 60_000) {
    hist.titik.push({ at: now, ...snap });
    while (hist.titik.length > 3000) hist.titik.shift();
    tulisJson(FILE_USERS, hist);
  }
  return hist.titik;
}

// ---------------- memori OI (otak mencatat sendiri) ----------------
function catatOI(snap: Omit<SnapOI, 'at'>): { jumlah: number; tumbuh: boolean } {
  const hist = bacaJson<SnapOI[]>(FILE_HIST, []);
  const now = Date.now();
  const terakhir = hist[hist.length - 1];
  let tumbuh = false;
  if (!terakhir || now - terakhir.at >= 55_000) {
    hist.push({ at: now, ...snap });
    while (hist.length > 4000) hist.shift();
    tulisJson(FILE_HIST, hist);
    tumbuh = true;
  }
  return { jumlah: hist.length, tumbuh };
}

// Δ% nilai terbaru vs titik ~jendelaMs lalu (null jika memori belum cukup)
function deltaDariMemori(hist: SnapOI[], jendelaMs: number): { oi: number | null; harga: number | null } {
  if (hist.length < 2) return { oi: null, harga: null };
  const now = hist[hist.length - 1];
  const target = now.at - jendelaMs;
  let titik = hist[0];
  for (const s of hist) {
    if (s.at <= target) titik = s;
    else break;
  }
  if (titik.at === now.at || now.oi <= 0 || titik.oi <= 0) return { oi: null, harga: null };
  return {
    oi: ((now.oi - titik.oi) / titik.oi) * 100,
    harga: ((now.price - titik.price) / titik.price) * 100,
  };
}

// deteksi kaskade likuidasi: pasangan snapshot dengan gerak harga & OI besar bersamaan
function deteksiKaskade(hist: SnapOI[]): AcaraModal[] {
  const out: AcaraModal[] = [];
  for (let i = 1; i < hist.length; i++) {
    const a = hist[i - 1];
    const b = hist[i];
    const dt = b.at - a.at;
    if (dt < 60_000 || dt > 90 * 60_000 || a.oi <= 0) continue;
    const dP = ((b.price - a.price) / a.price) * 100;
    const dOI = ((b.oi - a.oi) / a.oi) * 100;
    if (Math.abs(dP) >= 1.5 && Math.abs(dOI) >= 2.5) {
      // harga turun + OI turun = long dilikuidasi; harga naik + OI turun = short squeeze
      if (dP < 0 && dOI < 0) {
        out.push({ at: new Date(b.at).toISOString(), kind: 'LIKUIDASI', text: `est. likuidasi LONG — harga ${dP.toFixed(2)}% & OI ${dOI.toFixed(2)}% dalam ${(dt / 60_000).toFixed(0)} m (kaskade terpaksa tutup)` });
      } else if (dP > 0 && dOI < 0) {
        out.push({ at: new Date(b.at).toISOString(), kind: 'LIKUIDASI', text: `est. likuidasi SHORT — harga +${dP.toFixed(2)}% & OI ${dOI.toFixed(2)}% dalam ${(dt / 60_000).toFixed(0)} m (squeeze terpaksa tutup)` });
      }
    }
  }
  return out;
}

// ---------------- PETA LIKUIDASI (estimasi) ----------------
// Formula: distribusi volume perp 7 hari → diterjemahkan sebagai posisi
// yang dibuka di tiap tingkat harga → likuidasi long = entry×(1−1/lev×0.95),
// short = entry×(1+1/lev×0.95) untuk tier 10x/25x/50x/100x (bobot 30/30/25/15).
function petaLikuidasi(perp1h: Candle[], harga: number) {
  const win = perp1h.slice(-168); // 7 hari
  if (!win.length || harga <= 0) {
    return { bands: [], totalLongUsd: 0, totalShortUsd: 0, topLong: [], topShort: [], magnet: null, ket: 'data perp belum cukup' };
  }
  const lo = Math.min(...win.map((c) => c.l));
  const hi = Math.max(...win.map((c) => c.h));
  const binPct = 0.005; // pita 0,5%
  const nBins = Math.max(8, Math.ceil(Math.log(hi / lo) / Math.log(1 + binPct)));
  const bins = new Array<number>(nBins).fill(0);
  let totalVol = 0;
  const nowT = win[win.length - 1].t;
  for (const c of win) {
    const tp = (c.h + c.l + c.c) / 3;
    const idx = Math.min(nBins - 1, Math.max(0, Math.floor(Math.log(tp / lo) / Math.log(1 + binPct))));
    const usd = c.v * tp; // turnover approx per candle (v = qty koin × tp)
    // pembobot recency: posisi dibuka lama waktu dianggap sudah ditutup/dilikuidasi
    // (paruh waktu 48 jam — hanya posisi yang masih mungkin terbuka yang dihitung)
    const umurJam = Math.max(0, (nowT - c.t) / 3_600_000);
    const bobot = Math.pow(0.5, umurJam / 48);
    bins[idx] += usd * bobot;
    totalVol += usd;
  }
  // tebakan komposisi leverage pemain (makin tinggi leverage makin sedikit)
  const tiers: { lev: number; w: number }[] = [
    { lev: 10, w: 0.3 }, { lev: 25, w: 0.3 }, { lev: 50, w: 0.25 }, { lev: 100, w: 0.15 },
  ];
  // akumulasi ke pita tampilan ±15% dari harga sekarang (pita 0,5%)
  const spanPct = 15;
  const nBand = spanPct * 2 * 2; // 60 band × 0,5%
  const bandLong = new Array<number>(nBand).fill(0); // di bawah harga
  const bandShort = new Array<number>(nBand).fill(0); // di atas harga
  for (let i = 0; i < nBins; i++) {
    if (bins[i] <= 0) continue;
    const entry = lo * Math.pow(1 + binPct, i + 0.5);
    for (const t of tiers) {
      const notional = bins[i] * t.w;
      const jarak = 1 / t.lev - 0.005; // dikurangi buffer maintenance ~0,5%
      if (jarak <= 0) continue;
      const liqLong = entry * (1 - jarak);
      const liqShort = entry * (1 + jarak);
      const dL = ((harga - liqLong) / harga) * 100; // % di bawah harga (positif = di bawah)
      const dS = ((liqShort - harga) / harga) * 100; // % di atas harga
      if (dL >= 0 && dL < spanPct) {
        const bi = Math.floor(dL / 0.5);
        if (bi < nBand) bandLong[bi] += notional;
      }
      if (dS >= 0 && dS < spanPct) {
        const bi = Math.floor(dS / 0.5);
        if (bi < nBand) bandShort[bi] += notional;
      }
    }
  }
  const bands = bandLong.map((l, i) => ({
    jarakPct: (i + 0.5) * 0.5,
    harga: harga * (1 - (i + 0.5) * 0.005),
    longUsd: l,
    shortUsd: bandShort[i],
  }));
  const totalLongUsd = bandLong.reduce((s, x) => s + x, 0);
  const totalShortUsd = bandShort.reduce((s, x) => s + x, 0);
  // top cluster: maksimum lokal terbesar tiap sisi
  const top = (arr: number[]) => {
    const idxs = arr.map((v, i) => [v, i] as [number, number]).sort((a, b) => b[0] - a[0]).slice(0, 3);
    return idxs
      .filter(([v]) => v > 0)
      .map(([v, i]) => ({ harga: harga * (1 - (i + 0.5) * 0.005), usd: v, jarakPct: (i + 0.5) * 0.5 }));
  };
  const topLong = top(bandLong).map((t) => ({ harga: t.harga, usd: t.usd, jarakPct: t.jarakPct }));
  const topShortIdx = bandShort.map((v, i) => [v, i] as [number, number]).sort((a, b) => b[0] - a[0]).slice(0, 3)
    .filter(([v]) => v > 0)
    .map(([v, i]) => ({ harga: harga * (1 + (i + 0.5) * 0.005), usd: v, jarakPct: (i + 0.5) * 0.5 }));
  const magnet = (() => {
    const l = topLong[0];
    const s = topShortIdx[0];
    if (!l && !s) return null;
    if (!s) return { sisi: 'long' as const, harga: l.harga, usd: l.usd, jarakPct: l.jarakPct };
    if (!l) return { sisi: 'short' as const, harga: s.harga, usd: s.usd, jarakPct: s.jarakPct };
    return l.usd >= s.usd
      ? { sisi: 'long' as const, harga: l.harga, usd: l.usd, jarakPct: l.jarakPct }
      : { sisi: 'short' as const, harga: s.harga, usd: s.usd, jarakPct: s.jarakPct };
  })();
  return {
    bands, totalLongUsd, totalShortUsd, topLong, topShort: topShortIdx, magnet,
    ket: `estimasi dari distribusi turnover perp ${(totalVol / 1e6).toFixed(1)} jt USD (7 hari, 1 jam, pembobot recency paruh 48 jam) × tier leverage 10/25/50/100x (bobot 30/30/25/15) · bukan data likuidasi resmi exchange — dipakai sebagai koridor magnet & jebakan`,
  };
}

// ---------------- TAPE PER TINGKAT HARGA — "siapa beli di harga sekian" ----------------
// Formula: 1000 trade terakhir perp+spot dibucket per pita 0,25% dalam ±2% dari
// harga; print ≥ ambang whale (p98 turnover) ditandai terpisah sebagai whale.
function tapePerHarga(perpT: Trade[], spotT: Trade[], harga: number, ambangPerp: number, ambangSpot: number) {
  const bandPct = 0.25;
  const spanPct = 2;
  const map = new Map<number, { harga: number; beliUsd: number; jualUsd: number; whaleBeliUsd: number; whaleJualUsd: number; n: number }>();
  const sum = (ts: Trade[], ambang: number) => {
    for (const t of ts) {
      const usd = t.price * t.size;
      const d = ((t.price - harga) / harga) * 100;
      if (!Number.isFinite(d) || Math.abs(d) > spanPct) continue;
      const k = Math.round(Math.round(d / bandPct) * bandPct * 100) / 100;
      const e = map.get(k) ?? { harga: harga * (1 + k / 100), beliUsd: 0, jualUsd: 0, whaleBeliUsd: 0, whaleJualUsd: 0, n: 0 };
      if (t.side === 'Buy') {
        e.beliUsd += usd;
        if (usd >= ambang) e.whaleBeliUsd += usd;
      } else {
        e.jualUsd += usd;
        if (usd >= ambang) e.whaleJualUsd += usd;
      }
      e.n += 1;
      map.set(k, e);
    }
  };
  sum(perpT, ambangPerp);
  sum(spotT, ambangSpot);
  return [...map.entries()]
    .sort((a, b) => b[1].beliUsd + b[1].jualUsd - (a[1].beliUsd + a[1].jualUsd))
    .slice(0, 14)
    .map(([k, e]) => ({ harga: Math.round(harga * (1 + k / 100) * 1e7) / 1e7, beliUsd: Math.round(e.beliUsd), jualUsd: Math.round(e.jualUsd), whaleBeliUsd: Math.round(e.whaleBeliUsd), whaleJualUsd: Math.round(e.whaleJualUsd), n: e.n }));
}

// ---------------- FORMULA KORBAN LIKUIDASI — "mana yang akan terliquidasi" ----------------
// Formula jarak likuidasi (isolated): jarak ≈ (1/leverage − MMR) dari harga
// entry. MMR (maintenance margin rate) & leverage cap memakai parameter RESMI
// kontrak Gate ELSA_USDT (maintenance_rate 2.5%, leverage_max 20). Nilai USD
// per level diambil dari peta likuidasi (estimasi turnover × tier).
function korbanLikuidasi(harga: number, mmr: number, levMax: number, bands: { jarakPct: number; harga: number; longUsd: number; shortUsd: number }[]) {
  const tiers = [...new Set([3, 5, 10, Math.max(10, Math.round(levMax))])].sort((a, b) => a - b);
  const tier = tiers.map((lev) => {
    const jarak = Math.max(0.02, 1 / lev - mmr);
    return {
      lev,
      longHarga: harga * (1 - jarak), longJarakPct: jarak * 100,
      shortHarga: harga * (1 + jarak), shortJarakPct: jarak * 100,
    };
  });
  const terdekat = (sisi: 'long' | 'short') => {
    const kandidat = bands.filter((b) => (sisi === 'long' ? b.longUsd : b.shortUsd) > 0).sort((a, b) => a.jarakPct - b.jarakPct);
    const b = kandidat[0];
    if (!b) return null;
    const usd = sisi === 'long' ? b.longUsd : b.shortUsd;
    const arahHarga = sisi === 'long' ? 'turun' : 'naik';
    // band.jarakPct selalu diukur dari harga sekarang: long di bawah, short di atas
    const levelHarga = sisi === 'long' ? harga * (1 - b.jarakPct / 100) : harga * (1 + b.jarakPct / 100);
    return {
      sisi,
      jarakPct: b.jarakPct,
      harga: levelHarga,
      usd: Math.round(usd),
      narasi: `bila harga ${arahHarga} ${b.jarakPct.toFixed(2)}% ke $${levelHarga.toPrecision(6)} — likuidasi ${sisi.toUpperCase()} ±${fmtUsd(usd).replace('+', '')} tersapu lebih dulu (korban pertama: posisi ${sisi} ber-leverage tinggi)`,
    };
  };
  const kL = terdekat('long');
  const kS = terdekat('short');
  const berikutnya = [kL, kS].filter((x): x is NonNullable<typeof x> => x !== null);
  return {
    tier,
    berikutnya,
    formula: `jarak likuidasi ≈ (1/leverage − MMR) dari harga entry · MMR kontrak Gate ELSA = ${(mmr * 100).toFixed(1)}% · leverage cap = ${Math.round(levMax)}x · nilai USD per level = peta likuidasi (turnover × bobot tier) — angka korban terdekat dihitung dari cluster ±0,75% di level itu`,
  };
}

// ---------------- KLASIFIKASI WHALE TOP-20 — jebakan atau sengaja pump ----------------
function klasifikasiWhaleTop(args: {
  hargaNaikPct: number; dTopLong: number | null; dTopShort: number | null;
  rasioLongKerumunan: number | null; topLsrSize: number | null; funding: number;
}): { klasifikasi: 'PUMP_JUJUR' | 'JEBAKAN' | 'WAR_POSISI' | 'MENGUMPULKAN' | 'DIAM'; cara: string } {
  const dL = args.dTopLong;
  const dS = args.dTopShort;
  const p = args.hargaNaikPct;
  if (dL === null || dS === null) {
    return { klasifikasi: 'DIAM', cara: 'riwayat posisi top-20 belum cukup (butuh ≥2 titik 15 menit dari Gate) — klasifikasi menyusul' };
  }
  const kerumunan = args.rasioLongKerumunan;
  const catKerumunan = kerumunan !== null ? ` · kerumunan ${Math.round(kerumunan * 100)}% long` : '';
  if (p > 1 && dS >= 5 && dL <= 0) {
    return { klasifikasi: 'JEBAKAN', cara: `harga naik ${p.toFixed(1)}% dalam 3 jam tapi top-20 MENAMBAH SHORT +${dS.toFixed(1)}% sambil mengurangi long ${dL.toFixed(1)}%${catKerumunan} — posisi besar dipasang MELAWAN pump: pola jebakan (menunggu korban long di atas); hati-hati mengejar BUY` };
  }
  if (p > 1 && dL >= 5 && dS <= 0) {
    return { klasifikasi: 'PUMP_JUJUR', cara: `harga naik ${p.toFixed(1)}% dan top-20 MENAMBAH LONG +${dL.toFixed(1)}% sambil short dipangkas ${dS.toFixed(1)}%${catKerumunan} — whale pasang posisi SEARAH pump (sengaja dorong harga)` };
  }
  if (dL >= 5 && dS >= 5) {
    return { klasifikasi: 'WAR_POSISI', cara: `duel posisi: top-20 menambah long +${dL.toFixed(1)}% DAN short +${dS.toFixed(1)}% sekaligus${catKerumunan} — arah ditentukan siapa menahan lebih lama; funding ${args.funding >= 0 ? 'positif' : 'negatif'} menunjukkan sisi yang membayar` };
  }
  if (p < -1 && dL >= 5 && dS <= 0) {
    return { klasifikasi: 'MENGUMPULKAN', cara: `harga turun ${p.toFixed(1)}% tapi top-20 MENAMBAH LONG +${dL.toFixed(1)}%${catKerumunan} — whale menampung diam-diam saat harga dilempar turun (pola akumulasi pra-pump)` };
  }
  if (p < -1 && dS >= 5 && dL <= 0) {
    return { klasifikasi: 'JEBAKAN', cara: `harga turun ${p.toFixed(1)}% dan top-20 menambah short +${dS.toFixed(1)}%${catKerumunan} — bearish terkonfirmasi posisi besar (hindari BUY menahan pisau jatuh)` };
  }
  return { klasifikasi: 'DIAM', cara: `top-20 relatif diam 3 jam (long ${dL >= 0 ? '+' : ''}${dL.toFixed(1)}%, short ${dS >= 0 ? '+' : ''}${dS.toFixed(1)}%)${catKerumunan} — tanpa perubahan posisi besar yang terbaca` };
}

// ---------------- PENGGERAK MODAL ----------------
function hitungDrive(args: {
  bagianFuturesPct: number; oiMemori: { oi: number | null; harga: number } | null;
  basisPct: number; fundingSekarang: number; perpBuyPct: number; spotBuyPct: number;
}) {
  const komponen: { k: string; v: number }[] = [];
  const p1 = args.bagianFuturesPct; // 0..1
  komponen.push({ k: 'porsi volume futures', v: Math.round(p1 * 1000) / 1000 });
  let p2 = 0.5;
  if (args.oiMemori && args.oiMemori.oi !== null && args.oiMemori.harga !== null) {
    const aOI = Math.abs(args.oiMemori.oi);
    const aP = Math.abs(args.oiMemori.harga);
    if (aOI + aP > 0.2) p2 = Math.min(1, Math.max(0.2, aOI / (aOI + Math.max(aP, 0.1))));
  }
  komponen.push({ k: 'elastisitas OI vs harga', v: Math.round(p2 * 1000) / 1000 });
  const p3 = Math.min(1, Math.abs(args.basisPct) / 0.6);
  komponen.push({ k: 'premi perp vs spot (basis)', v: Math.round(p3 * 1000) / 1000 });
  const p4 = Math.min(1, Math.abs(args.fundingSekarang - 0.0001) / 0.0009);
  komponen.push({ k: 'funding menjauh netral', v: Math.round(p4 * 1000) / 1000 });
  const p5 = Math.min(1, Math.abs(args.perpBuyPct - 0.5) * 4);
  komponen.push({ k: 'tekanan taker perp', v: Math.round(p5 * 1000) / 1000 });
  const pct = (0.35 * p1 + 0.2 * p2 + 0.15 * p3 + 0.15 * p4 + 0.15 * p5) * 100;
  const label = pct >= 72 ? 'MURNI FUTURES' : pct >= 55 ? 'DOMINAN FUTURES' : pct >= 40 ? 'CAMPURAN' : 'DIDUKUNG SPOT';
  return {
    pct: Math.round(pct * 10) / 10,
    label,
    komponen,
    ket: 'formula: 35%×porsi volume futures + 20%×elastisitas ΔOI/Δharga + 15%×basis + 15%×funding + 15%×tekanan taker perp — makin tinggi, makin besar gerakan dikendalikan posisi ber-leverage',
  };
}

// ---------------- SHORT SQUEEZE ----------------
function hitungSqueeze(args: {
  perubahan24jPct: number; oiD4j: number | null; fundingRata12: number;
  perpBuyPct: number; basisPct: number; rasioShortKerumunan: number | null;
}) {
  let skor = 0;
  const alasan: string[] = [];
  if (args.oiD4j !== null && args.oiD4j <= -2 && args.perubahan24jPct > 0) {
    skor += 40;
    alasan.push(`OI turun ${args.oiD4j.toFixed(2)}% saat harga naik — posisi menutup, bukan posisi baru (ciri squeeze)`);
  }
  if (args.fundingRata12 < 0) {
    skor += 20;
    alasan.push('rata funding 48 jam negatif — short membayar, bahan bakar squeeze');
  }
  if (args.perpBuyPct >= 0.58) {
    skor += 15;
    alasan.push(`taker beli perp ${(args.perpBuyPct * 100).toFixed(0)}% — penutupan short agresif via buy`);
  }
  if (args.basisPct > 0.15) {
    skor += 15;
    alasan.push(`premi perp +${args.basisPct.toFixed(2)}% — permintaan perp menekan harga naik`);
  }
  if (args.perubahan24jPct > 6) {
    skor += 10;
    alasan.push(`naik ${args.perubahan24jPct.toFixed(1)}% dalam 24 jam — gerak cepat khas squeeze`);
  }
  if (args.rasioShortKerumunan !== null && args.rasioShortKerumunan >= 0.55 && args.perubahan24jPct > 0) {
    skor += 10;
    alasan.push(`kerumunan masih condong SHORT ${Math.round(args.rasioShortKerumunan * 100)}% (jumlah orang Gate) — bensin squeeze (short yang belum tutup) masih tersisa`);
  }
  const ket = skor >= 55
    ? `SQUEEZE AKTIF (${skor}/100) — ${alasan.join(' · ')}`
    : `tanpa squeeze signifikan (${skor}/100)${alasan.length ? ' — ' + alasan.join(' · ') : ''}`;
  return { skor, aktif: skor >= 55, ket };
}

// ---------------- VONIS JEBAKAN vs PUMP — HUKUM DUA PEDANG ----------------
// Keluhan pemilik 2026-11-25: "kenetralan justru bikin kita bodoh — pasar
// hanya punya DUA pedang: membunuh short atau membunuh long, bukan berdiam
// di tempat." Vonis NETRAL DIHAPUS SELAMANYA: tak ada pedang ketiga. Bila
// tak ada pola besar yang menyala, otak WAJIB memilih pedang mana yang
// jatuh lebih dulu dari NERACA BUKTI (bobot per sumber, terbuka) — komitmen
// dengan keyakinan lebih rendah (skor rendah), bukan diam. Diam = otak
// malas yang tumbuh lalu memakan otak lain.
type Pedang = 'BUNUH_SHORT' | 'BUNUH_LONG';
const PEDANG_NARASI: Record<Pedang, string> = {
  BUNUH_SHORT: 'BUNUH SHORT — harga bergerak menyapu posisi short (arah naik)',
  BUNUH_LONG: 'BUNUH LONG — harga bergerak menyapu posisi long (arah turun)',
};

function hitungVonis(args: {
  squeeze: { skor: number; aktif: boolean }; bias: number; perpNet: number; spotNet: number;
  perpTotal: number; spotTotal: number; oiD24j: number | null; fundingSekarang: number;
  lsBuy: number | null; harga: number; high24h: number; perubahan24jPct: number; drivePct: number;
  rasioLongKerumunan: number | null; orangLong: number | null; orangShort: number | null;
  dTopLong: number | null; dTopShort: number | null;
}) {
  const alasan: string[] = [];
  let vonis: string;
  let pedang: Pedang;
  let skor: number;
  let implikasi: string;

  const perpSisi = Math.abs(args.perpNet) / Math.max(args.perpTotal, 1);
  const spotSisi = Math.abs(args.spotNet) / Math.max(args.spotTotal, 1);

  if (args.squeeze.aktif) {
    vonis = 'SHORT_SQUEEZE'; pedang = 'BUNUH_SHORT';
    skor = Math.min(92, 50 + args.squeeze.skor / 2);
    alasan.push('naik karena kejaran menutup short (OI turun saat harga naik) — bensinnya penutupan, bukan dana segar');
    implikasi = 'rally squeeze bisa cepat & curam tapi rapuh — hindari kejar-top; tunggu OI berbalik naik sebelum percaya BUY baru';
  } else if (args.bias >= 0.2 && args.spotNet > 0 && (args.oiD24j === null || args.oiD24j > 0) && args.fundingSekarang < 0.0008) {
    vonis = 'PUMP_NYATA'; pedang = 'BUNUH_SHORT';
    skor = Math.min(90, 48 + args.bias * 60 + spotSisi * 25);
    alasan.push(`whale akumulasi terbaca di DUA pasar (spot net ${fmtUsd(args.spotNet)} + perp net ${fmtUsd(args.perpNet)})`);
    alasan.push(`OI ${(args.oiD24j === null ? 'tercatat' : args.oiD24j.toFixed(1) + '% 24j')} tumbuh & funding belum panas`);
    implikasi = 'dana segar masuk dua pasar — pondasi BUY kuat; pegang selama OI & spot netflow positif';
  } else if (args.fundingSekarang >= 0.0006 && (args.lsBuy === null || args.lsBuy >= 0.58) && args.harga >= args.high24h * 0.97 && args.spotNet <= 0) {
    vonis = 'JEBAKAN_BULL'; pedang = 'BUNUH_LONG';
    skor = Math.min(88, 45 + (args.fundingSekarang - 0.0006) * 80000 + (args.lsBuy ?? 0.5) * 30);
    alasan.push('kerumunan long padat (funding mahal + L/S condong long) di dekat puncak 24 jam');
    alasan.push(`whale justru melepas di spot (net ${fmtUsd(args.spotNet)}) — harga digerakkan perp saja`);
    implikasi = 'pola klasik jebakan bull: arah BUY tanpa dukungan spot → rawan di-pump lalu dibanting; kurangi ukuran / tunda entry';
  } else if (args.dTopShort !== null && args.dTopShort >= 6 && (args.rasioLongKerumunan ?? 0.5) >= 0.58 && args.perubahan24jPct > 2) {
    vonis = 'JEBAKAN_BULL'; pedang = 'BUNUH_LONG';
    skor = Math.min(86, 44 + args.dTopShort * 1.6 + (args.rasioLongKerumunan ?? 0.6) * 40);
    alasan.push(`whale top-20 menambah SHORT +${args.dTopShort.toFixed(1)}% (Gate, 3 jam) sementara kerumunan long ${(args.rasioLongKerumunan! * 100).toFixed(0)}% (${args.orangLong ?? '?'} orang) — pump tanpa dukungan posisi besar`);
    implikasi = 'pump digerakkan kerumunan kecil sementara akun besar memasang short — profil jebakan bull; hindari kejar-top';
  } else if (args.dTopLong !== null && args.dTopLong >= 6 && (args.rasioLongKerumunan ?? 1) <= 0.45 && args.oiD24j !== null && args.oiD24j > 0) {
    vonis = 'PUMP_NYATA'; pedang = 'BUNUH_SHORT';
    skor = Math.min(88, 46 + args.dTopLong * 1.5);
    alasan.push(`whale top-20 menambah LONG +${args.dTopLong.toFixed(1)}% (Gate, 3 jam) sementara kerumunan belum mengejar (long ${(args.rasioLongKerumunan! * 100).toFixed(0)}%) & OI 24j +${args.oiD24j.toFixed(1)}%`);
    implikasi = 'posisi besar bergerak sebelum kerumunan — pola akumulasi whale utk pump; BUY teknis punya pondasi dana';
  } else if (args.bias >= 0.35 && args.perpNet > 0 && args.oiD24j !== null && args.oiD24j > 0 && args.fundingSekarang < 0.0008) {
    vonis = 'PUMP_NYATA'; pedang = 'BUNUH_SHORT';
    skor = Math.min(88, 46 + args.bias * 40 + Math.min(20, args.oiD24j * 0.5));
    alasan.push(`whale akumulasi PERP bersih ${fmtUsd(args.perpNet)} (tape 30 menit, bias ${args.bias.toFixed(2)}) + OI 24j +${args.oiD24j.toFixed(1)}% — posisi baru nyata, bukan penutupan`);
    alasan.push(`funding masih dingin (${(args.fundingSekarang * 100).toFixed(4)}%) — akumulasi belum digegarkan kerumunan`);
    implikasi = 'akumulasi via derivatif dengan posisi baru nyata (OI naik) — pondasi BUY terbaca; pantau OI: bila berbalik turun saat harga naik, itu penutupan (bensin habis)';
  } else if (args.bias <= -0.25 && args.perpNet < 0 && perpSisi >= 0.55 && args.perubahan24jPct < 2) {
    vonis = 'JEBAKAN_BEAR'; pedang = 'BUNUH_LONG';
    skor = Math.min(86, 45 + Math.abs(args.bias) * 60 + perpSisi * 25);
    alasan.push(`whale menimbun posisi short di perp (net ${fmtUsd(args.perpNet)}) saat harga belum naik`);
    implikasi = 'posisi short besar terpasang diam — kalau candle mulai melemah, drop bisa eksplosif dari likuidasi long di bawah';
  } else if (args.spotNet > args.spotTotal * 0.4 && args.fundingSekarang < 0.0004 && args.harga < args.high24h * 0.95) {
    vonis = 'AKUMULASI'; pedang = 'BUNUH_SHORT';
    skor = Math.min(84, 42 + spotSisi * 40);
    alasan.push(`whale menampung di spot (net ${fmtUsd(args.spotNet)}) jauh dari puncak & funding dingin`);
    implikasi = 'pola siap-pump: whale mengisi diam-diam — sinyal BUY teknis makin beralasan bila muncul';
  } else if (args.spotNet < 0 && args.perpNet < 0 && args.perubahan24jPct > 3) {
    vonis = 'DISTRIBUSI'; pedang = 'BUNUH_LONG';
    skor = Math.min(86, 44 + spotSisi * 20 + perpSisi * 20);
    alasan.push('harga masih naik tapi whale melepas di dua pasar — klasik penguras saat pump');
    implikasi = 'jangan terkecoh harga naik — pondasi modalnya sedang keluar';
  } else {
    // NERACA DUA PEDANG — wajib memilih, dilarang diam. Setiap sumber yang
    // hidup menimbang sisi mana yang lebih dekat pedangnya.
    const sisiNaik: string[] = []; const sisiTurun: string[] = [];
    let wNaik = 0; let wTurun = 0;
    const tambahNaik = (w: number, s: string) => { wNaik += w; sisiNaik.push(s); };
    const tambahTurun = (w: number, s: string) => { wTurun += w; sisiTurun.push(s); };
    // 1) uang whale (bias gabungan spot+perp dari tape 30 menit)
    if (args.bias > 0.1) tambahNaik(Math.min(1.6, args.bias * 1.6), `whale bias +${args.bias.toFixed(2)} — uang besar condong masuk`);
    if (args.bias < -0.1) tambahTurun(Math.min(1.6, -args.bias * 1.6), `whale bias ${args.bias.toFixed(2)} — uang besar condong keluar`);
    // 2) dana segar spot
    if (args.spotNet > 0) tambahNaik(0.7, `spot net ${fmtUsd(args.spotNet)} — dana segar menopang`);
    if (args.spotNet < 0) tambahTurun(0.7, `spot net ${fmtUsd(args.spotNet)} — dana keluar dari spot`);
    // 3) tape perp
    if (args.perpNet > 0) tambahNaik(0.4, `perp net ${fmtUsd(args.perpNet)}`);
    if (args.perpNet < 0) tambahTurun(0.4, `perp net ${fmtUsd(args.perpNet)}`);
    // 4) funding — sisi yang MEMBAYAR = sisi sesak = korban berikutnya
    if (args.fundingSekarang >= 0.0006) tambahTurun(0.6, `funding panas ${(args.fundingSekarang * 100).toFixed(4)}% — long sesak, korban long tersedia`);
    else if (args.fundingSekarang < 0) tambahNaik(0.6, `funding ${(args.fundingSekarang * 100).toFixed(4)}% — short membayar, bensin squeeze`);
    // 5) kerumunan (jumlah akun nyata) — sisi penuh sesak dilikuidasi dulu
    if (args.lsBuy !== null && args.lsBuy >= 0.58) tambahTurun(0.5, `kerumunan ${(args.lsBuy * 100).toFixed(0)}% long — akun sesak satu arah`);
    if (args.lsBuy !== null && args.lsBuy <= 0.42) tambahNaik(0.5, `kerumunan hanya ${(args.lsBuy * 100).toFixed(0)}% long — sisi short yang penuh`);
    // 6) posisi top-20 whale (Gate, 3 jam)
    if (args.dTopLong !== null && args.dTopLong >= 3) tambahNaik(0.5, `top-20 tambah long +${args.dTopLong.toFixed(1)}% (3 jam)`);
    if (args.dTopShort !== null && args.dTopShort >= 3) tambahTurun(0.5, `top-20 tambah short +${args.dTopShort.toFixed(1)}% (3 jam)`);
    // 7) OI vs harga — rally tanpa OI baru = rally tanpa bensin
    if (args.oiD24j !== null && args.oiD24j > 0 && args.perubahan24jPct > 0) tambahNaik(0.4, `OI +${args.oiD24j.toFixed(1)}% saat harga naik — posisi baru nyata`);
    if (args.oiD24j !== null && args.oiD24j < 0 && args.perubahan24jPct > 0) tambahTurun(0.5, `OI ${args.oiD24j.toFixed(1)}% saat harga naik — rally tanpa bensin baru`);
    // 8) harga nempel puncak 24 jam = stop long menumpuk di bawah
    if (args.harga >= args.high24h * 0.97) tambahTurun(0.3, `harga nempel puncak 24j (${((args.harga / args.high24h - 1) * 100).toFixed(1)}%) — stop long menumpuk di bawah`);

    pedang = wNaik >= wTurun ? 'BUNUH_SHORT' : 'BUNUH_LONG';
    const margin = Math.abs(wNaik - wTurun);
    if (margin < 0.15) {
      // neraca nyaris seri — pemutus: momentum 24 jam berlanjut (pasar tak pernah diam)
      pedang = args.perubahan24jPct < 0 ? 'BUNUH_LONG' : 'BUNUH_SHORT';
      alasan.push(`neraca nyaris seri (${wNaik.toFixed(2)} vs ${wTurun.toFixed(2)}) — pemutus: momentum 24 jam ${args.perubahan24jPct >= 0 ? '+' : ''}${args.perubahan24jPct.toFixed(1)}% berlanjut, bukan diam`);
    }
    vonis = pedang;
    skor = Math.round(Math.min(52, 34 + margin * 9)); // komitmen yakin-rendah: skor rendah, arah tetap SATU
    alasan.push(`HUKUM DUA PEDANG: pasar hanya punya dua pedang — tidak ada pedang ketiga "diam". Neraca bukti: naik ${wNaik.toFixed(2)} vs turun ${wTurun.toFixed(2)} → pedang jatuh ${pedang === 'BUNUH_SHORT' ? 'ke SHORT' : 'ke LONG'}${margin < 0.5 ? ' (bukti tipis — skor rendah, ukuran disiplin)' : ''}`);
    for (const s of sisiNaik.slice(0, 3)) alasan.push(`sisi naik: ${s}`);
    for (const s of sisiTurun.slice(0, 3)) alasan.push(`sisi turun: ${s}`);
    if (!sisiNaik.length && !sisiTurun.length) alasan.push('bukti dua sisi absen datanya (sumber mati) — pedang dipilih dari momentum 24 jam; otak tetap berdiri di SATU pedang, tidak bersembunyi di netral');
    implikasi = pedang === 'BUNUH_SHORT'
      ? 'tanpa pola besar menyala, neraca bukti memilih pedang bunuh-SHORT (naik menyapu short) — komitmen yakin-rendah; bila dana whale berbalik keluar, pedang berpindah dan dijawab ulang denyut berikutnya'
      : 'tanpa pola besar menyala, neraca bukti memilih pedang bunuh-LONG (turun menyapu long) — komitmen yakin-rendah; bila dana whale masuk segar, pedang berpindah dan dijawab ulang denyut berikutnya';
  }
  alasan.push(`porsi futures dari volume 24j: ${args.drivePct.toFixed(0)}%`);
  alasan.push(`pedang: ${PEDANG_NARASI[pedang]} — hukum dua pedang: membunuh short atau membunuh long, bukan berdiam di tempat`);
  return { vonis, pedang, skor: Math.round(skor), alasan, implikasi, at: new Date().toISOString() };
}

function fmtUsd(v: number): string {
  const a = Math.abs(v);
  const s = v < 0 ? '−' : '+';
  if (a >= 1e6) return `${s}${(a / 1e6).toFixed(2)} jt USD`;
  if (a >= 1e3) return `${s}${(a / 1e3).toFixed(1)} rb USD`;
  return `${s}${a.toFixed(0)} USD`;
}

// ---------------- RADAR WHALE ----------------
function radarWhale(perpT: Trade[], spotT: Trade[]) {
  const notional = (t: Trade) => t.price * t.size;
  const persen = (arr: number[], p: number) => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    return s[Math.min(s.length - 1, Math.floor(p * s.length))];
  };
  const ambangPerp = Math.max(800, persen(perpT.map(notional), 0.98) * 3);
  const ambangSpot = Math.max(400, persen(spotT.map(notional), 0.98) * 2.5);
  const saring = (ts: Trade[], ambang: number) => ts.filter((t) => notional(t) >= ambang);
  const wp = saring(perpT, ambangPerp);
  const ws = saring(spotT, ambangSpot);
  const jumlah = (arr: Trade[], side: 'Buy' | 'Sell') => arr.filter((t) => t.side === side).reduce((s, t) => s + notional(t), 0);
  const perpBuy = jumlah(wp, 'Buy');
  const perpSell = jumlah(wp, 'Sell');
  const spotBuy = jumlah(ws, 'Buy');
  const spotSell = jumlah(ws, 'Sell');
  const perpNet = perpBuy - perpSell;
  const spotNet = spotBuy - spotSell;
  const perpTotal = perpBuy + perpSell;
  const spotTotal = spotBuy + spotSell;
  const bias = perpTotal + spotTotal > 0 ? (perpNet + 1.5 * spotNet) / (perpTotal + 1.5 * spotTotal) : 0;
  const biasLabel = bias >= 0.25 ? 'AKUMULASI' : bias <= -0.25 ? 'DISTRIBUSI' : 'SEIMBANG';
  const konfirmasiSpot = spotTotal > 0 ? spotNet / spotTotal : 0;
  // print terbesar (gabungan, teratas 12)
  const print = [
    ...wp.map((t) => ({ ...t, mkt: 'perp' as const, usd: notional(t) })),
    ...ws.map((t) => ({ ...t, mkt: 'spot' as const, usd: notional(t) })),
  ].sort((a, b) => b.usd - a.usd).slice(0, 12)
    .map((t) => ({ at: new Date(t.at).toISOString(), mkt: t.mkt, side: t.side, size: Math.round(t.size * 100) / 100, price: t.price, usd: Math.round(t.usd) }));
  // cluster: ≥3 print sisi sama dalam 120 detik di satu pasar (indikasi entry terprogram)
  const cluster: { at: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; jumlah: number; usd: number }[] = [];
  for (const [mkt, arr] of [['perp', wp], ['spot', ws]] as const) {
    let i = 0;
    while (i < arr.length) {
      let j = i;
      while (j + 1 < arr.length && arr[j + 1].at - arr[i].at <= 120_000 && arr[j + 1].side === arr[i].side) j++;
      const n = j - i + 1;
      const usd = arr.slice(i, j + 1).reduce((s, t) => s + notional(t), 0);
      if (n >= 3 || usd >= 3 * (mkt === 'perp' ? ambangPerp : ambangSpot)) {
        cluster.push({ at: new Date(arr[i].at).toISOString(), mkt, side: arr[i].side, jumlah: n, usd: Math.round(usd) });
      }
      i = j + 1;
    }
  }
  cluster.sort((a, b) => b.at.localeCompare(a.at));
  return { ambangPerp, ambangSpot, perpNet, spotNet, perpTotal, spotTotal, bias, biasLabel, konfirmasiSpot, print, cluster: cluster.slice(0, 8) };
}

// ---------------- SUMBER A1 — fetcher lintas venue (semua fail-safe) ----------------
async function aman<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}
function getRaw(url: string, timeoutMs = 9000): Promise<Record<string, unknown> | unknown[]> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  return fetch(url, { signal: ac.signal, cache: 'no-store', headers: { accept: 'application/json' } })
    .then(async (res) => {
      if (!res.ok) throw new Error(`${res.status}`);
      return (await res.json()) as Record<string, unknown> | unknown[];
    })
    .finally(() => clearTimeout(timer));
}

// Bitget perp ELSAUSDT (OI resmi + funding + ticker full)
async function bitgetVenueData(hargaRef: number) {
  const oi = await aman(async () => {
    const j = (await getRaw('https://api.bitget.com/api/v2/mix/market/open-interest?symbol=ELSAUSDT&productType=USDT-FUTURES')) as { data?: { openInterestList?: { symbol: string; size: string }[] } };
    const row = j.data?.openInterestList?.find((x) => x.symbol === 'ELSAUSDT');
    return row ? Number(row.size) : null;
  }, null as number | null);
  const fund = await aman(async () => {
    const j = (await getRaw('https://api.bitget.com/api/v2/mix/market/current-fund-rate?symbol=ELSAUSDT&productType=USDT-FUTURES')) as { data?: { symbol: string; fundingRate: string; fundingRateInterval: string }[] };
    const row = j.data?.find((x) => x.symbol === 'ELSAUSDT');
    return row ? { rate: Number(row.fundingRate), interval: Number(row.fundingRateInterval) } : null;
  }, null as { rate: number; interval: number } | null);
  const tick = await aman(async () => {
    const j = (await getRaw('https://api.bitget.com/api/v2/mix/market/tickers?productType=USDT-FUTURES', 12000)) as { data?: { symbol: string; lastPr: string; quoteVolume: string; high24h: string; low24h: string }[] };
    const row = j.data?.find((x) => x.symbol === 'ELSAUSDT');
    return row ? { last: Number(row.lastPr), qv: Number(row.quoteVolume) } : null;
  }, null as { last: number; qv: number } | null);
  const harga = tick?.last ?? hargaRef;
  return { oi, funding: fund?.rate ?? null, interval: fund?.interval ?? 4, harga, vol24j: tick?.qv ?? null };
}

// BingX perp ELSA-USDT (ticker + funding + premium)
async function bingxVenueData() {
  const tick = await aman(async () => {
    const j = (await getRaw('https://open-api.bingx.com/openApi/swap/v2/quote/ticker?symbol=ELSA-USDT')) as { data?: { lastPrice: string; quoteVolume: string; highPrice: string; lowPrice: string } };
    return j.data ? { last: Number(j.data.lastPrice), qv: Number(j.data.quoteVolume) } : null;
  }, null as { last: number; qv: number } | null);
  const fund = await aman(async () => {
    const j = (await getRaw('https://open-api.bingx.com/openApi/swap/v2/quote/premiumIndex?symbol=ELSA-USDT')) as { data?: { lastFundingRate: string; fundingIntervalHours: number } };
    return j.data ? { rate: Number(j.data.lastFundingRate), interval: Number(j.data.fundingIntervalHours) } : null;
  }, null as { rate: number; interval: number } | null);
  const fh = await aman(async () => {
    const j = (await getRaw('https://open-api.bingx.com/openApi/swap/v2/quote/fundingRate?symbol=ELSA-USDT&limit=8')) as { data?: { fundingRate: string }[] };
    return (j.data ?? []).map((x) => Number(x.fundingRate)).filter(Number.isFinite);
  }, [] as number[]);
  return { harga: tick?.last ?? null, vol24j: tick?.qv ?? null, funding: fund?.rate ?? null, interval: fund?.interval ?? 4, fundingHist: fh };
}

// Toobit perp ELSAUSDT
async function toobitVenueData() {
  const tick = await aman(async () => {
    const j = (await getRaw('https://api.toobit.com/quote/v1/ticker/24hr?symbol=ELSAUSDT')) as { c?: string; qv?: string; h?: string; l?: string }[];
    const r = Array.isArray(j) ? j[0] : null;
    return r ? { last: Number(r.c), qv: Number(r.qv) } : null;
  }, null as { last: number; qv: number } | null);
  return { harga: tick?.last ?? null, vol24j: tick?.qv ?? null };
}

// MEXC spot ELSAUSDT
async function mexcSpotData() {
  return aman(async () => {
    const j = (await getRaw('https://api.mexc.com/api/v3/ticker/24hr?symbol=ELSAUSDT')) as { lastPrice?: string; quoteVolume?: string };
    return { harga: j.lastPrice ? Number(j.lastPrice) : null, vol24j: j.quoteVolume ? Number(j.quoteVolume) : null };
  }, { harga: null, vol24j: null });
}

// Upbit spot KRW-ELSA (kerumunan retail Korea — venue spot TERBESAR ELSA)
async function upbitSpotData() {
  const tick = await aman(async () => {
    const j = (await getRaw('https://api.upbit.com/v1/ticker?markets=KRW-ELSA')) as { trade_price?: number; acc_trade_price_24h?: number; high_price?: number; low_price?: number }[];
    const r = Array.isArray(j) ? j[0] : null;
    return r ? { hargaKrw: r.trade_price ?? null, vol24jKrw: r.acc_trade_price_24h ?? null, highKrw: r.high_price ?? null, lowKrw: r.low_price ?? null } : null;
  }, null as { hargaKrw: number | null; vol24jKrw: number | null; highKrw: number | null; lowKrw: number | null } | null);
  const candles = await aman(async () => {
    const j = (await getRaw('https://api.upbit.com/v1/candles/minutes/60?market=KRW-ELSA&count=24', 12000)) as { candle_date_time_utc: string; trade_price: number; candle_acc_trade_price: number; candle_acc_trade_volume: number }[];
    return j.map((c) => ({
      t: Date.parse(c.candle_date_time_utc),
      close: c.trade_price,
      usdKrw: c.candle_acc_trade_price,
      vol: c.candle_acc_trade_volume,
    }));
  }, [] as { t: number; close: number; usdKrw: number; vol: number }[]);
  return { tick, candles };
}

// kurs KRW→USD (cache file 6 jam)
const FILE_KRW = '/home/z/my-project/db/elsa_krw_rate.json';
async function kursKrw(): Promise<number> {
  try {
    if (fs.existsSync(FILE_KRW)) {
      const j = JSON.parse(fs.readFileSync(FILE_KRW, 'utf8')) as { at: number; rate: number };
      if (Date.now() - j.at < 6 * 3600_000) return j.rate;
    }
  } catch { /* abai */ }
  const rate = await aman(async () => {
    const j = (await getRaw('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=krw')) as { tether?: { krw?: number } };
    const r = j.tether?.krw;
    if (!r || r < 500 || r > 5000) throw new Error('rate aneh');
    return r;
  }, 1430);
  try {
    tulisJson(FILE_KRW, { at: Date.now(), rate });
  } catch { /* abai */ }
  return rate;
}

// Gate perp ticker (OI kontrak + funding + volume settle)
async function gatePerpTicker() {
  return aman(async () => {
    const j = (await getRaw(`${GATE}/tickers?contract=ELSA_USDT`)) as { last: string; total_size: string; funding_rate: string; volume_24h_settle: string }[];
    const r = Array.isArray(j) ? j[0] : null;
    if (!r) return null;
    return { last: Number(r.last), totalSize: Number(r.total_size), funding: Number(r.funding_rate), vol24j: Number(r.volume_24h_settle) };
  }, null as { last: number; totalSize: number; funding: number; vol24j: number } | null);
}

// Gate spot (ticker + candle 1 jam untuk akumulasi)
async function gateSpotData() {
  const tick = await aman(async () => {
    const j = (await getRaw('https://api.gateio.ws/api/v4/spot/tickers?currency_pair=ELSA_USDT')) as { last: string; quote_volume: string; high_24h: string; low_24h: string }[];
    const r = Array.isArray(j) ? j[0] : null;
    return r ? { harga: Number(r.last), vol24j: Number(r.quote_volume) } : null;
  }, null as { harga: number; vol24j: number } | null);
  const candles = await aman(async () => {
    const j = (await getRaw('https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=ELSA_USDT&interval=1h&limit=24', 12000)) as string[][];
    return j.map((r) => ({
      t: Number(r[0]) * 1000,
      close: Number(r[5]),
      usd: Number(r[6]),
      vol: Number(r[1]),
    }));
  }, [] as { t: number; close: number; usd: number; vol: number }[]);
  return { tick, candles };
}

// Bybit spot kline 1 jam (utk akumulasi senyap) — pakai cache getCandles? modal butuh spot: fetch langsung
async function bybitSpot1h(limit = 48): Promise<Candle[]> {
  return aman(async () => {
    const j = (await getRaw(`${BASE}/v5/market/kline?category=spot&symbol=ELSAUSDT&interval=60&limit=${limit}`)) as { result?: { list?: string[][] } };
    const list = j.result?.list ?? [];
    return list
      .map((r) => ({ t: Number(r[0]), o: Number(r[1]), h: Number(r[2]), l: Number(r[3]), c: Number(r[4]), v: Number(r[5]) }))
      .sort((a, b) => a.t - b.t);
  }, [] as Candle[]);
}

// ---------------- MATEMATIKA PORTAL WAKTU ----------------
function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y = 1 - ((((1.061405429 * t - 1.953153569) * t + 1.576976766) * t - 0.189400952) * t + 0.254829592) * t * Math.exp(-x * x);
  return x >= 0 ? y : -y;
}
const phiStd = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
// peluang harga MENYENTUH level dPct (±) dalam N hari — model jalan acak (refleksi)
function probSentuh(dPct: number, sigma24jPct: number, hari: number): number {
  const sig = Math.max(sigma24jPct, 0.6) * Math.sqrt(hari);
  return Math.min(0.995, Math.max(0.001, 2 * (1 - phiStd(Math.abs(dPct) / sig))));
}

// ---------------- SENSUS LINTAS VENUE ----------------
function hitungSensus(args: {
  hargaPerp: number;
  bybitOI: number | null; bybitVol: number | null; bybitSpotVol: number | null; bybitRatioBuy: number | null; bybitRatioSell: number | null;
  gateOI: number | null; gateVol: number | null; gateFunding: number | null;
  akunGateLong: number | null; akunGateShort: number | null;
  bitget: { oi: number | null; funding: number | null; interval: number; harga: number | null; vol24j: number | null };
  bingx: { harga: number | null; vol24j: number | null; funding: number | null; interval: number };
  toobit: { harga: number | null; vol24j: number | null };
  mexc: { harga: number | null; vol24j: number | null };
  upbit: { hargaKrw: number | null; vol24jKrw: number | null; krw: number };
  gateSpot: { harga: number | null; vol24j: number | null };
}): SensusData {
  const harga = args.hargaPerp;
  const row = (o: Partial<SensusVenueBaris> & { venue: string; jenis: 'perp' | 'spot' }): SensusVenueBaris => ({
    listed: true, oiElsa: null, oiUsd: null, vol24jUsd: null, harga: null,
    funding: null, intervalJam: null, ratioLong: null, ratioShort: null, sumberRatio: '',
    akunLong: null, akunShort: null, akunNyata: false, estAkun: null, catatan: '', ...o,
  });
  const venues: SensusVenueBaris[] = [];
  // Bybit perp (venue utama otak — OI & rasio akun 1h)
  const oiBybitUsd = args.bybitOI !== null ? args.bybitOI * harga : null;
  venues.push(row({
    venue: 'Bybit', jenis: 'perp',
    oiElsa: args.bybitOI, oiUsd: oiBybitUsd, vol24jUsd: args.bybitVol, harga,
    ratioLong: args.bybitRatioBuy, ratioShort: args.bybitRatioSell, sumberRatio: 'Bybit account-ratio 1d (rasio, bukan jumlah)',
    catatan: 'venue utama otak ini — perp ELSAUSDT + spot; tidak mempublikasi jumlah akun, hanya rasio',
  }));
  // Gate perp (SATU-SATUNYA venue dengan jumlah akun nyata)
  const oiGateUsd = args.gateOI !== null ? args.gateOI * harga : null;
  venues.push(row({
    venue: 'Gate.io', jenis: 'perp',
    oiElsa: args.gateOI, oiUsd: oiGateUsd, vol24jUsd: args.gateVol, harga,
    funding: args.gateFunding, intervalJam: 8,
    akunLong: args.akunGateLong, akunShort: args.akunGateShort, akunNyata: true,
    catatan: 'satu-satunya venue yang mempublikasi JUMLAH akun long/short (long_users/short_users) + likuidasi resmi + posisi top-20 whale',
  }));
  // Bitget perp
  const oiBitgetUsd = args.bitget.oi !== null ? args.bitget.oi * (args.bitget.harga ?? harga) : null;
  venues.push(row({
    venue: 'Bitget', jenis: 'perp',
    oiElsa: args.bitget.oi, oiUsd: oiBitgetUsd, vol24jUsd: args.bitget.vol24j, harga: args.bitget.harga,
    funding: args.bitget.funding, intervalJam: args.bitget.interval,
    catatan: 'perp ELSAUSDT — OI & funding resmi; endpoint rasio akun tidak tersedia publik (404) di venue ini',
  }));
  // BingX perp
  venues.push(row({
    venue: 'BingX', jenis: 'perp',
    vol24jUsd: args.bingx.vol24j, harga: args.bingx.harga,
    funding: args.bingx.funding, intervalJam: args.bingx.interval,
    catatan: 'perp ELSA-USDT — funding & premium resmi; OI tidak dipublikasi publik; endpoint rasio akun tidak ada',
  }));
  // Toobit perp
  venues.push(row({
    venue: 'Toobit', jenis: 'perp',
    vol24jUsd: args.toobit.vol24j, harga: args.toobit.harga,
    catatan: 'perp ELSAUSDT — kline & ticker resmi (kline Toobit memuat split taker-buy); OI/rasio akun tidak tersedia',
  }));
  // spot venues
  venues.push(row({ venue: 'Upbit (Korea)', jenis: 'spot', vol24jUsd: args.upbit.vol24jKrw !== null ? args.upbit.vol24jKrw / args.upbit.krw : null, harga: args.upbit.hargaKrw !== null ? args.upbit.hargaKrw / args.upbit.krw : null, catatan: `spot KRW-ELSA — kerumunan retail Korea; volume KRW dikonversi USD @ ${Math.round(args.upbit.krw)} KRW (CoinGecko tether/KRW, cache 6 jam) — venue spot TERBESAR ELSA` }));
  venues.push(row({ venue: 'Bybit', jenis: 'spot', vol24jUsd: args.bybitSpotVol, catatan: 'spot ELSAUSDT — volume 24 jam Bybit spot; tape spotnya dipakai untuk radar whale & akumulasi senyap' }));
  venues.push(row({ venue: 'Gate.io', jenis: 'spot', vol24jUsd: args.gateSpot.vol24j, harga: args.gateSpot.harga, catatan: 'spot ELSA_USDT — candle 1 jam dipakai untuk deteksi akumulasi senyap' }));
  venues.push(row({ venue: 'MEXC', jenis: 'spot', vol24jUsd: args.mexc.vol24j, harga: args.mexc.harga, catatan: 'spot ELSAUSDT — likuiditas kecil tapi terbaca; kontrak perp MEXC diblokir region server ini (403)' }));

  // agregat perp
  const oiPerpUsd = venues.filter((v) => v.jenis === 'perp' && v.oiUsd !== null).reduce((s, v) => s + (v.oiUsd ?? 0), 0);
  const oiPerpElsa = venues.filter((v) => v.jenis === 'perp' && v.oiElsa !== null).reduce((s, v) => s + (v.oiElsa ?? 0), 0);
  const volSemua = venues.reduce((s, v) => s + (v.vol24jUsd ?? 0), 0);
  // OI venue tanpa angka (BingX/Toobit) diestimasi proporsional volume vs Gate
  const oiGate = oiGateUsd ?? 0;
  const volGatePerp = args.gateVol ?? 0;
  let oiTambahanEstimasi = 0;
  for (const v of venues) {
    if (v.jenis === 'perp' && v.oiUsd === null && v.vol24jUsd !== null && oiGate > 0 && volGatePerp > 0) {
      oiTambahanEstimasi += Math.min(v.vol24jUsd, volGatePerp * 4) / volGatePerp * oiGate;
    }
  }
  const totalOiUsd = oiPerpUsd > 0 ? oiPerpUsd + oiTambahanEstimasi : null;
  // ESTIMASI universe akun: akun Gate × skala OI relatif (venue lain tak publikasi jumlah akun)
  const akunGateHold = args.akunGateLong !== null && args.akunGateShort !== null ? args.akunGateLong + args.akunGateShort : null;
  let estUniverse: number | null = null;
  if (akunGateHold !== null && akunGateHold > 0 && oiGate > 0 && totalOiUsd !== null) {
    const faktor = Math.min(12, Math.max(0.2, totalOiUsd / oiGate));
    for (const v of venues) {
      if (v.jenis !== 'perp') continue;
      if (v.akunNyata) {
        v.estAkun = akunGateHold;
        continue;
      }
      const skala = v.oiUsd !== null && oiGate > 0
        ? v.oiUsd / oiGate
        : v.vol24jUsd !== null && volGatePerp > 0 ? Math.min(6, (v.vol24jUsd / volGatePerp) * 0.9) : null;
      v.estAkun = skala !== null ? Math.round(akunGateHold * Math.min(12, skala)) : null;
    }
    estUniverse = Math.round(venues.reduce((s, v) => s + (v.jenis === 'perp' ? (v.estAkun ?? 0) : 0), 0));
  }
  const metode = 'ESTIMASI: jumlah akun nyata HANYA publikasi Gate.io. Venue lain = akun Gate × (OI USD venue ÷ OI USD Gate); venue tanpa OI memakai proxy volume 24j × 0,9 (cap 12×). Akun lintas venue bisa tumpang tindih (satu orang dua bursa) — angka ini SKALA posisi terpasang, bukan jumlah manusia unik.';
  const ket = totalOiUsd !== null
    ? `ELSA terbaca di ${venues.filter((v) => v.jenis === 'perp').length} venue perp + ${venues.filter((v) => v.jenis === 'spot').length} venue spot. Total OI perp ≈ ${(totalOiUsd / 1e6).toFixed(2)} jt USD (termasuk estimasi OI venue yang tidak mempublikasi). Jumlah akun Gate (${akunGateHold ?? '?'} hold) hanyalah SATU venue — skala universe lintas venue ≈ ${estUniverse?.toLocaleString('id-ID')} akun-posisi (estimasi).`
    : 'OI venue belum cukup terbaca untuk estimasi universe — memori otak akan menajamkan tiap poll.';
  return {
    venues,
    totalOiUsd: totalOiUsd !== null ? Math.round(totalOiUsd) : null,
    totalOiElsa: oiPerpElsa > 0 ? Math.round(oiPerpElsa) : null,
    totalVolUsd: Math.round(volSemua),
    akunGate: { long: args.akunGateLong, short: args.akunGateShort, hold: akunGateHold },
    estUniverseAkun: estUniverse,
    metodeEstimasi: metode, ket,
  };
}

// ---------------- ESTIMASI LEVERAGE (kali berapa posisi terpasang) ----------------
function estimasiLeverage(histOI: SnapOI[], harga: number): LevData {
  const kaskade: LevData['kaskade'] = [];
  for (let i = 1; i < histOI.length; i++) {
    const a = histOI[i - 1];
    const b = histOI[i];
    const dt = b.at - a.at;
    if (dt < 60_000 || dt > 90 * 60_000 || a.oi <= 0) continue;
    const dP = ((b.price - a.price) / a.price) * 100;
    const dOI = ((b.oi - a.oi) / a.oi) * 100;
    // OI turun sambil harga bergerak tajam = posisi dipaksa tutup (likuidasi) →
    // leverage implisit cohort ≈ 1/jarak ≈ 100/|Δprice%|
    if (Math.abs(dP) >= 1.2 && dOI <= -2.5) {
      const lev = Math.round(Math.max(2, Math.min(125, 100 / Math.max(Math.abs(dP), 0.8))));
      kaskade.push({ at: b.at, dP: Math.round(dP * 100) / 100, dOI: Math.round(dOI * 100) / 100, lev, sisi: dP < 0 ? 'long' : 'short' });
    }
  }
  const median = (arr: number[]) => (arr.length ? [...arr].sort((x, y) => x - y)[Math.floor(arr.length / 2)] : null);
  const levLong = median(kaskade.filter((k) => k.sisi === 'long').map((k) => k.lev));
  const levShort = median(kaskade.filter((k) => k.sisi === 'short').map((k) => k.lev));
  const dominanTier = Math.round([10, 25, 50, 100].reduce((s, l, i) => s + l * [0.3, 0.3, 0.25, 0.15][i], 0));
  return {
    longDominan: levLong, shortDominan: levShort, dominanTier,
    nKaskade: kaskade.length, kaskade: kaskade.slice(-6),
    metode: `leverage implisit = 100 ÷ |Δharga%| pada episode OI JATUH bersamaan (posisi dipaksa tutup bursa = likuidasi; jarak likuidasi cohort ≈ gerak harga itu) · median per sisi dari memori otak · tanpa episode: tebakan komposisi tier 10/25/50/100x (bobot 30/30/25/15) → dominan ≈ ${dominanTier}x`,
  };
}

// ---------------- PORTAL WAKTU — time traveler likuidasi ----------------
function mesinWaktu(args: {
  harga: number; bands: { jarakPct: number; harga: number; longUsd: number; shortUsd: number }[];
  sigma24jPct: number; perp24jUsd: number; orangHold: number | null; oiUniverseUsd: number | null;
}): PortalData {
  const langkah = 0.75;
  const TIERS = [100, 50, 25, 10];
  const jarakTier = (lev: number) => Math.max(0.001, 1 / lev - 0.005); // konsisten dgn peta likuidasi (buffer 0,5%)
  const serapPerLangkah = (args.perp24jUsd / 288) * 0.75 * 0.5; // model: buku menyerap 50% tiap 0,75% pergeseran (basis turnover 5 menit)
  const skena: SkenarioWaktu[] = [];
  let bencanaTurun: SkenarioWaktu | null = null;
  let bencanaNaik: SkenarioWaktu | null = null;
  for (const sisi of ['long', 'short'] as const) {
    const arahTurun = sisi === 'long';
    let kum = 0;
    let dominoKe = 0;
    let tenaga = 0; // tenaga jual/beli paksa kumulatif (notional dilikuidasi × 1,15)
    let hargaAkhir = args.harga;
    for (let d = langkah; d <= 15 + 1e-9; d += langkah) {
      const band = args.bands.find((b) => Math.abs(b.jarakPct - d) < langkah / 2);
      const usd = band ? (sisi === 'long' ? band.longUsd : band.shortUsd) : 0;
      const trigger = arahTurun ? args.harga * (1 - d / 100) : args.harga * (1 + d / 100);
      if (usd > 0) {
        kum += usd;
        dominoKe += 1;
        tenaga += usd * 1.15;
        const serapan = (d / langkah) * serapPerLangkah;
        const sisa = Math.max(0, tenaga - serapan);
        // penetrasi ekstra = sisa tenaga dibanding likuiditas buku → harga melewati level
        const dExtra = sisa > 0 ? Math.min(4, (sisa / Math.max(args.perp24jUsd / 288, 1)) * 0.75) : 0;
        hargaAkhir = arahTurun ? trigger * (1 - dExtra / 100) : trigger * (1 + dExtra / 100);
      }
      const tierMati = TIERS.filter((l) => jarakTier(l) <= d / 100);
      if (kum <= 0) continue;
      const dAkhir = ((hargaAkhir - args.harga) / args.harga) * 100;
      const estAkun = args.orangHold !== null && args.oiUniverseUsd && args.oiUniverseUsd > 0
        ? Math.round(args.orangHold * (kum / args.oiUniverseUsd))
        : null;
      const row: SkenarioWaktu = {
        sisi, dPct: Math.round(d * 100) / 100,
        triggerHarga: Math.round(trigger * 1e7) / 1e7,
        prob24j: Math.round(probSentuh(d, args.sigma24jPct, 1) * 1000) / 1000,
        prob72j: Math.round(probSentuh(d, args.sigma24jPct, 3) * 1000) / 1000,
        korbanUsd: Math.round(kum), estAkunKorban: estAkun,
        tierMati,
        hargaAkhir: Math.round(hargaAkhir * 1e7) / 1e7,
        dAkhirPct: Math.round(dAkhir * 100) / 100,
        dominoKe,
        narasi: `jika harga ${arahTurun ? 'JATUH' : 'PANAS'} ${d.toFixed(2)}% ke ${fmtHargaShort(trigger)} — ${dominoKe} domino likuidasi ${sisi.toUpperCase()} tersapu (±${fmtUsd(kum).replace('+', '')}${estAkun ? ` ≈ ${estAkun.toLocaleString('id-ID')} akun` : ''}), tier ${tierMati.join('/')}x mati${tenaga > 0 ? `, kaskade menyeret harga ke ${fmtHargaShort(hargaAkhir)} (${dAkhir >= 0 ? '+' : ''}${dAkhir.toFixed(1)}%) sebelum tenaga habis` : ''}`,
      };
      // tampilkan hanya domino baru (korban bertambah) + level kunci
      if (usd > 0 || Math.abs(d - 15) < 1e-9) skena.push(row);
      const skor = kum * row.prob24j;
      if (sisi === 'long') {
        if (!bencanaTurun || skor > bencanaTurun.korbanUsd * bencanaTurun.prob24j) bencanaTurun = row;
      } else {
        if (!bencanaNaik || skor > bencanaNaik.korbanUsd * bencanaNaik.prob24j) bencanaNaik = row;
      }
    }
  }
  return {
    skenario: skena.sort((a, b) => Math.abs(b.korbanUsd * b.prob24j) - Math.abs(a.korbanUsd * a.prob24j)),
    bencanaTurun, bencanaNaik,
    sigma24jPct: Math.round(args.sigma24jPct * 100) / 100,
    metode: `prob sentuh = jalan-acak 2×(1−Φ(|d|/σ)) dgn σ = sigma 24 jam dari kline perp 1 jam (dihitung otak) · korban = akumulasi peta likuidasi sampai level itu · kaskade: tenaga paksa = notional dilikuidasi × 1,15 menembus buku yang menyerap ±50% per 0,75% (basis turnover 5 menit) → harga akhir proyeksi · est. akun = orang hold × porsi korban dari OI universe · SEMUA dihitung SEKARANG utk harga BELUM terjadi — inilah membaca pasar ke depan`,
  };
}
function fmtHargaShort(v: number): string {
  return v < 0.01 ? `$${v.toFixed(6)}` : `$${v.toFixed(4)}`;
}

// ---------------- AKUMULASI SENYAP SPOT ----------------
// User yang beli di spot sekian sekian TANPA menaikkan harga (absorpsi diam-diam)
// sebelum harga di-pump. Bahan: kline 1 jam Bybit spot + Gate spot + Upbit (KRW→USD)
// + tape whale spot (siapa yang menampung).
function akumulasiSenyap(args: {
  harga: number;
  bybit: Candle[]; gate: { t: number; close: number; usd: number }[]; upbit: { t: number; close: number; usdKrw: number }[];
  krw: number; spotTape: Trade[]; ambangSpot: number;
}): AkumulasiData {
  type Jam = { t: number; harga: number; usd: number; venue: string };
  const semua: Jam[] = [];
  for (const c of args.bybit) semua.push({ t: c.t, harga: c.c, usd: c.v * c.c, venue: 'B' });
  for (const c of args.gate) semua.push({ t: c.t, harga: c.close, usd: c.usd, venue: 'G' });
  for (const c of args.upbit) semua.push({ t: c.t, harga: c.close / args.krw, usd: c.usdKrw / args.krw, venue: 'U' });
  semua.sort((a, b) => a.t - b.t);
  // hitung Δ% per jam per venue (harga venue tsb)
  const perVenueUsd: Record<string, number> = { B: 0, G: 0, U: 0 };
  const bandMap = new Map<number, { harga: number; usdSenyap: number; nJam: number; venueSet: Set<string>; deltaPcts: number[] }>();
  const jamPerVenue = new Map<string, number[]>();
  for (const j of semua) {
    const arr = jamPerVenue.get(j.venue) ?? [];
    arr.push(j.usd);
    jamPerVenue.set(j.venue, arr);
  }
  const medianOf = (a: number[]) => {
    if (!a.length) return 0;
    const s = [...a].sort((x, y) => x - y);
    return s[Math.floor(s.length / 2)];
  };
  for (let i = 0; i < semua.length; i++) {
    const j = semua[i];
    const prev = semua.slice(0, i).reverse().find((x) => x.venue === j.venue && x.t === j.t - 3600_000);
    if (!prev) continue;
    const med = medianOf(jamPerVenue.get(j.venue) ?? []);
    if (med <= 0) continue;
    const dPct = ((j.harga - prev.harga) / Math.max(prev.harga, 1e-12)) * 100;
    const rasioVol = j.usd / med;
    // SENYAP: volume ≥ 1,5× median jam venue itu sambil harga gerak ≤ 0,45% (absorpsi)
    const senyap = rasioVol >= 1.5 && Math.abs(dPct) <= 0.45;
    const agresif = rasioVol >= 1.8 && dPct > 0.45;
    if (!senyap && !agresif) continue;
    const bandKey = Math.round(Math.round((j.harga / args.harga - 1) * 200) / 200 * 100) / 100;
    const e = bandMap.get(bandKey) ?? { harga: j.harga, usdSenyap: 0, nJam: 0, venueSet: new Set<string>(), deltaPcts: [] };
    e.usdSenyap += j.usd;
    e.nJam += 1;
    e.venueSet.add(j.venue);
    e.deltaPcts.push(dPct);
    bandMap.set(bandKey, e);
    if (senyap) perVenueUsd[j.venue] += j.usd;
  }
  const band: AkumulasiBand[] = [...bandMap.entries()]
    .sort((a, b) => b[1].usdSenyap - a[1].usdSenyap)
    .slice(0, 8)
    .map(([k, e]) => {
      const dAvg = e.deltaPcts.reduce((s, x) => s + x, 0) / Math.max(e.deltaPcts.length, 1);
      const whale = args.spotTape
        .filter((t) => t.side === 'Buy' && Math.abs((t.price / args.harga - 1) * 100 - k) < 0.4 && t.price * t.size >= args.ambangSpot)
        .reduce((s, t) => s + t.price * t.size, 0);
      return {
        harga: Math.round(args.harga * (1 + k / 100) * 1e7) / 1e7,
        usdSenyap: Math.round(e.usdSenyap),
        whaleUsd: Math.round(whale),
        nJam: e.nJam,
        venue: [...e.venueSet].join('+'),
        deltaPct: Math.round(dAvg * 100) / 100,
        verdict: (Math.abs(dAvg) <= 0.3 ? 'SENYAP' : dAvg > 0.3 ? 'AGRESIF' : 'SEDAKAN') as AkumulasiBand['verdict'],
      };
    });
  // whale spot yang menampung (dari tape 30 menit)
  const whaleTampung = args.spotTape
    .filter((t) => t.side === 'Buy' && t.price * t.size >= args.ambangSpot)
    .sort((a, b) => b.price * b.size - a.price * a.size)
    .slice(0, 6)
    .map((t) => ({ at: new Date(t.at).toISOString(), price: t.price, usd: Math.round(t.price * t.size), band: Math.round(Math.round((t.price / args.harga - 1) * 200) / 200 * 100) / 100 }));
  const totalSenyap = perVenueUsd.B + perVenueUsd.G + perVenueUsd.U;
  // penyebut: volume 24 jam SEMUA venue yang dihitung (B+G+U) — bukan Bybit saja,
  // supaya skor tidak saturasi bila venue lain jauh lebih besar
  const batas24j = Date.now() - 24 * 3600_000;
  const totalVolSemua = semua.filter((x) => x.t >= batas24j).reduce((s, x) => s + x.usd, 0) || 1;
  const totalVolBybit = args.bybit.slice(-24).reduce((s, c) => s + c.v * c.c, 0) || 1;
  const skor = Math.max(0, Math.min(100, Math.round((totalSenyap / totalVolSemua) * 300 + band.filter((b) => b.verdict === 'SENYAP').length * 5)));
  const verdict = skor >= 55 ? 'AKUMULASI_SENYAP_AKTIF' : skor >= 25 ? 'ADA_TANDA_MENAMPUNG' : 'TANPA_AKUMULASI_MENONJOL';
  const ket = `${verdict.replace(/_/g, ' ')} (skor ${skor}/100) — absorpsi senyap ${(totalSenyap / 1e3).toFixed(1)} rb USD dari ${(totalVolSemua / 1e6).toFixed(2)} jt USD volume 24 jam B+G+U (Bybit spot 24j: ${(totalVolBybit / 1e6).toFixed(2)} jt USD); B=Bybit G=Gate U=Upbit(KRW→USD) · ${whaleTampung.length} print whale spot menampung terbaca di tape`;
  return {
    band, verdict, skor, ket,
    perVenue: { bybit: Math.round(perVenueUsd.B), gate: Math.round(perVenueUsd.G), upbit: Math.round(perVenueUsd.U) },
    whaleTampung,
    metode: 'absorpsi senyap per jam per venue: volume ≥ 1,5× median-jam venue itu sambil Δharga ≤ 0,45% (orang besar membeli TANPA menaikkan harga — ciri akumulasi pra-pump) · dikelompokkan per pita harga 0,5% dari harga sekarang · whale = print spot ≥ ambang whale di pita itu',
  };
}

// ---------------- SIDIK WHALE — pisahkan akun-akun whale ----------------
function sidikWhale(print: { at: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; size: number; price: number; usd: number }[]): SidikWhale {
  const grup: { mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; items: typeof print }[] = [];
  for (const p of print) {
    const g = grup.find((x) => x.mkt === p.mkt && x.side === p.side && Math.abs((x.items[0].usd - p.usd) / Math.max(x.items[0].usd, 1)) <= 0.4);
    if (g) g.items.push(p);
    else grup.push({ mkt: p.mkt, side: p.side, items: [p] });
  }
  const akun = grup
    .sort((a, b) => b.items.reduce((s, x) => s + x.usd, 0) - a.items.reduce((s, x) => s + x.usd, 0))
    .slice(0, 6)
    .map((g, i) => {
      const usdTotal = g.items.reduce((s, x) => s + x.usd, 0);
      const terakhir = [...g.items].sort((a, b) => b.at.localeCompare(a.at))[0].at;
      const pola = g.items.length >= 3
        ? `entry terprogram ×${g.items.length} (tiket serupa ±40%)`
        : g.items.length === 2
          ? 'menampung dua gelombang'
          : 'satu tiket besar tunggal';
      return { id: `W${i + 1}`, mkt: g.mkt, side: g.side, nPrint: g.items.length, usdTotal: Math.round(usdTotal), ukuranTipe: Math.round(usdTotal / g.items.length), terakhir, pola };
    });
  return {
    akun,
    ket: 'fingerprint tiket: print whale dikelompokkan per (pasar, sisi, ukuran ±40%) — W1..Wn adalah AKUN BERBEDA YANG TERBACA dari jejak, bukan ID resmi (bursa tidak publikasi identitas). Makin lama tape hidup, makin jelas siapa konsisten menampung vs melepas.',
  };
}

// ---------------- ledger modal ----------------
function catatAcara(acara: AcaraModal[]) {
  const led = bacaJson<{ acara: AcaraModal[] }>(FILE_LEDGER, { acara: [] });
  const semua = [...acara, ...led.acara];
  // dedupe kasar: text sama dalam 10 menit
  const bersih: AcaraModal[] = [];
  const kunciTerakhir = new Map<string, number>();
  for (const a of semua) {
    const at = Date.parse(a.at);
    const k = `${a.kind}|${a.text.slice(0, 40)}`;
    const last = kunciTerakhir.get(k) ?? Infinity;
    if (at < last - 10 * 60_000) {
      bersih.push(a);
      kunciTerakhir.set(k, at);
    }
  }
  tulisJson(FILE_LEDGER, { acara: bersih.slice(0, 200) });
  return bersih.slice(0, 24);
}

// ---------------- PAYLOAD UTAMA ----------------
export async function getModalPayload(): Promise<ModalData> {
  if (memModal && Date.now() - memModal.at < TTL_MS) return memModal.data;
  const catatan: string[] = [
    'Jumlah orang long/short = akun NYATA dari Gate.io (long_users/short_users) — venue listing ELSA perp yang mempublikasi jumlah akun; Bybit hanya memberi RASIO akun (ditampilkan sebagai pembanding kerumunan Bybit).',
    'Riwayat OI memakai endpoint RESMI Bybit open-interest (interval 1 jam) + memori granular 5 menit yang dicatat otak sendiri tiap poll.',
    'Peta likuidasi per-level = ESTIMASI (turnover × tier leverage); tier korban memakai parameter resmi kontrak Gate (MMR 2.5%, leverage 20x); RIWAYAT likuidasi agregat = angka resmi Gate.io.',
    'Whale = print di atas ambang relatif (≈3× p98 turnover tape, minimum 800 USD perp / 400 USD spot) — tape perp+spot Bybit diakumulasikan otak dalam jendela 30 menit (koin tipis: print besar jarang, jadi dipelajari dari memori).',
    'GALI DALAM A1: jumlah akun long/short Gate.io hanyalah SATU venue. Sensus lintas venue memetakan Bybit+Gate+Bitget+BingX+Toobit (perp) dan Upbit+Bybit+Gate+MEXC (spot); estimasi universe akun diskalakan dari OI relatif — venue lain tidak mempublikasi jumlah akun (jujur dilabeli ESTIMASI).',
    'PORTAL WAKTU: prediksi likuidasi memakai peta likuidasi + probabilitas jalan-acak (sigma 24 jam dari kline perp) + model kaskade domino — dihitung dari kondisi SEKARANG untuk harga yang BELUM terjadi.',
  ];

  const [tl, ts, fh, ar, perpT, spotT, perp1h, gk, gs15, gs1h, oi1h, ar1h] = await Promise.all([
    tickerLinear(), tickerSpot(), fundingHistory(24), accountRatio(7),
    tradesMemori('linear', 1000), tradesMemori('spot', 1000), klineLinear('60', 200),
    gateKontrak().catch(() => null), gateStats('15m'), gateStats('1h'),
    oiHistoryBybit(48), accountRatio1h(24),
  ]);

  // taker imbalance dari trade terakhir
  const imb = (ts: Trade[]) => {
    const b = ts.filter((t) => t.side === 'Buy').reduce((s, t) => s + t.price * t.size, 0);
    const s = ts.reduce((acc, t) => acc + t.price * t.size, 0);
    return s > 0 ? b / s : 0.5;
  };
  const perpBuyPct = imb(perpT);
  const spotBuyPct = imb(spotT);

  // snapshot harga & basis
  const hargaSpot = ts.lastPrice || tl.lastPrice;
  const hargaPerp = tl.lastPrice;
  const basisPct = hargaSpot > 0 ? ((hargaPerp - hargaSpot) / hargaSpot) * 100 : 0;

  // memori OI
  const mem = catatOI({ oi: tl.openInterest, price: hargaPerp, funding: tl.fundingRate });
  const histOI = bacaJson<SnapOI[]>(FILE_HIST, []);
  const d1 = deltaDariMemori(histOI, 60 * 60_000);
  const d4 = deltaDariMemori(histOI, 4 * 60 * 60_000);
  const d24 = deltaDariMemori(histOI, 24 * 60 * 60_000);

  // ΔOI RESMI dari riwayat Bybit open-interest (fallback ke memori bila kosong)
  const deltaOIS = (n: number): number | null => {
    if (oi1h.length < n + 1) return null;
    const a = oi1h[oi1h.length - 1 - n];
    const b = oi1h[oi1h.length - 1];
    if (a.oi <= 0) return null;
    return ((b.oi - a.oi) / a.oi) * 100;
  };
  const oiD1r = deltaOIS(1);
  const oiD4r = deltaOIS(4);
  const oiD24r = deltaOIS(24);
  const d1OI = oiD1r ?? d1.oi;
  const d4OI = oiD4r ?? d4.oi;
  const d24OI = oiD24r ?? d24.oi;

  // funding
  const rata12 = fh.slice(-12).reduce((s, x) => s + x.rate, 0) / Math.max(fh.slice(-12).length, 1);
  const intervalJam = (() => {
    if (fh.length >= 2) {
      const gaps: number[] = [];
      for (let i = 1; i < fh.length; i++) gaps.push(fh[i].at - fh[i - 1].at);
      gaps.sort((a, b) => a - b);
      return Math.round((gaps[Math.floor(gaps.length / 2)] / 3_600_000) * 10) / 10;
    }
    return 8;
  })();

  // volume & drive
  const perp24jUsd = tl.turnover24h;
  const spot24jUsd = ts.turnover24h;
  const bagianFuturesPct = perp24jUsd + spot24jUsd > 0 ? perp24jUsd / (perp24jUsd + spot24jUsd) : 0.5;
  const drive = hitungDrive({
    bagianFuturesPct,
    oiMemori: { oi: d4OI, harga: d4.harga },
    basisPct, fundingSekarang: tl.fundingRate, perpBuyPct, spotBuyPct,
  });

  // jumlah orang long/short (akun nyata Gate.io) — kerumunan
  const gs1hLast = gs1h[gs1h.length - 1] ?? null;
  const orangLong = gk ? gk.longUsers : gs1hLast?.longUsers ?? null;
  const orangShort = gk ? gk.shortUsers : gs1hLast?.shortUsers ?? null;
  const orangHold = orangLong !== null && orangShort !== null ? orangLong + orangShort : null;
  const orangRasioLong = orangLong !== null && orangShort !== null && orangHold! > 0 ? orangLong / orangHold! : null;
  const memOrang = orangLong !== null && orangShort !== null
    ? catatOrang({ long: orangLong, short: orangShort, topLong: gs15.length ? gs15[gs15.length - 1].topLongSize : 0, topShort: gs15.length ? gs15[gs15.length - 1].topShortSize : 0 })
    : [];
  const riwayatOrang = (() => {
    const gab = [
      ...memOrang.map((t) => ({ at: t.at, long: t.long, short: t.short })),
      ...gs1h.map((s) => ({ at: s.at, long: s.longUsers, short: s.shortUsers })),
    ].filter((t) => t.long > 0 && t.short > 0);
    gab.sort((a, b) => a.at - b.at);
    const out: { at: number; long: number; short: number }[] = [];
    for (const t of gab) {
      const last = out[out.length - 1];
      if (!last || t.at - last.at > 90_000) out.push(t);
    }
    return out.slice(-240);
  })();

  // whale top-20 (Gate): Δ% ukuran posisi dalam ~3 jam (12 titik × 15 menit)
  const gs15Now = gs15[gs15.length - 1] ?? null;
  const gs15Then = gs15.length >= 13 ? gs15[gs15.length - 13] : gs15.length >= 2 ? gs15[0] : null;
  const dTopLong = gs15Now && gs15Then && gs15Then.topLongSize > 0 ? ((gs15Now.topLongSize / gs15Then.topLongSize) - 1) * 100 : null;
  const dTopShort = gs15Now && gs15Then && gs15Then.topShortSize > 0 ? ((gs15Now.topShortSize / gs15Then.topShortSize) - 1) * 100 : null;
  const hargaNaik3j = gs15Now && gs15Then && gs15Then.markPrice > 0 ? ((gs15Now.markPrice / gs15Then.markPrice) - 1) * 100 : 0;

  // squeeze
  const squeeze = hitungSqueeze({
    perubahan24jPct: tl.price24hPcnt, oiD4j: d4OI, fundingRata12: rata12, perpBuyPct, basisPct,
    rasioShortKerumunan: orangRasioLong !== null ? 1 - orangRasioLong : null,
  });

  // likuidasi & whale
  const likuidasi = petaLikuidasi(perp1h, hargaPerp);
  const whale = radarWhale(perpT, spotT);
  const tape = tapePerHarga(perpT, spotT, hargaPerp, whale.ambangPerp, whale.ambangSpot);
  const korban = korbanLikuidasi(hargaPerp, gk?.maintenanceRate ?? 0.025, gk?.leverageMax ?? 20, likuidasi.bands);
  const wTop = klasifikasiWhaleTop({
    hargaNaikPct: hargaNaik3j, dTopLong, dTopShort,
    rasioLongKerumunan: orangRasioLong, topLsrSize: gs15Now?.topLsrSize ?? null, funding: tl.fundingRate,
  });

  // ---------------- GALI DALAM A1 (permintaan pemilik) ----------------
  // sigma 24 jam dari kline perp 1 jam (basis probabilitas portal waktu)
  const quanto = gk?.quanto ?? 10;
  const lsTerakhir = ar[ar.length - 1] ?? null;
  const retsJam = perp1h.slice(-72).map((c, i, a) => (i > 0 ? Math.log(c.c / a[i - 1].c) : null)).filter((x): x is number => x !== null);
  const rataR = retsJam.length ? retsJam.reduce((s, x) => s + x, 0) / retsJam.length : 0;
  const sdR = retsJam.length > 1 ? Math.sqrt(retsJam.reduce((s, x) => s + (x - rataR) ** 2, 0) / (retsJam.length - 1)) : 0;
  const sigma24jPct = Math.max(0.5, sdR * Math.sqrt(24) * 100);

  const [bitget, bingx, toobit, mexc, upbit, krw, gateSpot, gpt, spot1h] = await Promise.all([
    bitgetVenueData(hargaPerp), bingxVenueData(), toobitVenueData(), mexcSpotData(),
    upbitSpotData(), kursKrw(), gateSpotData(), gatePerpTicker(), bybitSpot1h(48),
  ]);

  const sensus = hitungSensus({
    hargaPerp,
    bybitOI: tl.openInterest, bybitVol: tl.turnover24h, bybitSpotVol: ts.turnover24h,
    bybitRatioBuy: lsTerakhir ? lsTerakhir.buy : null, bybitRatioSell: lsTerakhir ? lsTerakhir.sell : null,
    gateOI: gpt && gpt.totalSize > 0 ? gpt.totalSize * quanto : (gs1hLast?.oi ? gs1hLast.oi * (gk?.quanto ?? 10) : null),
    gateVol: gpt?.vol24j ?? null, gateFunding: gpt?.funding ?? null,
    akunGateLong: orangLong, akunGateShort: orangShort,
    bitget, bingx, toobit, mexc,
    upbit: { hargaKrw: upbit.tick?.hargaKrw ?? null, vol24jKrw: upbit.tick?.vol24jKrw ?? null, krw },
    gateSpot: { harga: gateSpot.tick?.harga ?? null, vol24j: gateSpot.tick?.vol24j ?? null },
  });
  const leverage = estimasiLeverage(histOI, hargaPerp);
  const portal = mesinWaktu({
    harga: hargaPerp, bands: likuidasi.bands, sigma24jPct,
    perp24jUsd: perp24jUsd, orangHold: orangHold, oiUniverseUsd: sensus.totalOiUsd,
  });
  const akumulasi = akumulasiSenyap({
    harga: hargaPerp, bybit: spot1h, gate: gateSpot.candles, upbit: upbit.candles,
    krw, spotTape: spotT, ambangSpot: whale.ambangSpot,
  });
  const sidik = sidikWhale(whale.print);

  // riwayat likuidasi NYATA (agregat resmi Gate.io; fallback size×quanto×mark)
  const liqGab = [...gs15, ...gs1h]
    .map((s) => ({
      at: s.at,
      longUsd: Math.round(s.longLiqUsd > 0 ? s.longLiqUsd : s.longLiqSize * quanto * s.markPrice),
      shortUsd: Math.round(s.shortLiqUsd > 0 ? s.shortLiqUsd : s.shortLiqSize * quanto * s.markPrice),
      harga: s.markPrice,
    }))
    .filter((s) => s.longUsd > 0 || s.shortUsd > 0);
  const liqMap = new Map<number, { at: number; longUsd: number; shortUsd: number; harga: number }>();
  for (const s of liqGab.sort((a, b) => a.at - b.at)) liqMap.set(s.at, s);
  const liqReal = [...liqMap.values()].sort((a, b) => b.at - a.at).slice(0, 24);

  // vonis
  const vonisMentah = hitungVonis({
    squeeze, bias: whale.bias, perpNet: whale.perpNet, spotNet: whale.spotNet,
    perpTotal: whale.perpTotal, spotTotal: whale.spotTotal, oiD24j: d24OI,
    fundingSekarang: tl.fundingRate, lsBuy: lsTerakhir ? lsTerakhir.buy : null,
    harga: hargaPerp, high24h: tl.high24h, perubahan24jPct: tl.price24hPcnt, drivePct: drive.pct,
    rasioLongKerumunan: orangRasioLong, orangLong, orangShort, dTopLong, dTopShort,
  });
  // JIWA OTAK MODAL — ORGAN 4: modulasi vonis pakai rekam jejak. Vonis jenis
  // yang terbukti SERING SALAH didiskon, yang SERING MENEPAT didorong. Ini
  // yang membuat vonis makin pintar setiap hari (bukan mesin yang bodoh
  // mengulang kebodohan yang sama). Akurasi muda (<4 sampel) tidak mengubah.
  const modulasi = hitungModulasiVonis(vonisMentah.vonis, vonisMentah.skor);
  const vonis = {
    ...vonisMentah,
    skor: modulasi.skorSesudah,
    alasan: [...vonisMentah.alasan, `OTAK-MODAL (rekam jejak): ${modulasi.ket}`],
  };

  // ledger: catat perubahan vonis + kaskade + cluster whale
  const acaraBaru: AcaraModal[] = [];
  const ledLama = bacaJson<{ acara: AcaraModal[] }>(FILE_LEDGER, { acara: [] });
  const vonisTerakhir = ledLama.acara.find((a) => a.kind === 'VONIS');
  if (!vonisTerakhir || !vonisTerakhir.text.startsWith(vonis.vonis)) {
    acaraBaru.push({ at: new Date().toISOString(), kind: 'VONIS', text: `${vonis.vonis} (skor ${vonis.skor}) — ${vonis.implikasi}` });
  }
  if (modulasi.efek !== 'BIASA') {
    acaraBaru.push({ at: new Date().toISOString(), kind: 'OTAK', text: `modulasi rekam jejak ${modulasi.jenis}: ${modulasi.ket}` });
  }
  acaraBaru.push(...deteksiKaskade(histOI));
  for (const c of whale.cluster.slice(0, 3)) {
    acaraBaru.push({ at: c.at, kind: 'WHALE', text: `cluster whale ${c.mkt.toUpperCase()} ${c.side} ×${c.jumlah} print ≈ ${fmtUsd(c.usd)}` });
  }
  const acara = catatAcara(acaraBaru);

  // JIWA OTAK MODAL — denyut penuh per ronde data segar: keyakinan lama
  // dijawab candle perp nyata, keyakinan baru dilahirkan (vonis + magnet
  // portal), kepahaman tertambang, kesaksian disiapkan utk dewan AR-E11.
  // Gagal jiwa ≠ gagal modal (jujur: dicatat, bukan ditelan).
  let jiwa: ModalJiwa | null = null;
  try {
    jiwa = await denyutModal({
      vonis: { vonis: vonis.vonis, skor: vonis.skor, alasan: vonis.alasan, implikasi: vonis.implikasi, modulasi },
      harga: hargaPerp, sigma24jPct,
      portalTurun: portal.bencanaTurun ? { dPct: portal.bencanaTurun.dPct, triggerHarga: portal.bencanaTurun.triggerHarga, prob24j: portal.bencanaTurun.prob24j } : null,
      portalNaik: portal.bencanaNaik ? { dPct: portal.bencanaNaik.dPct, triggerHarga: portal.bencanaNaik.triggerHarga, prob24j: portal.bencanaNaik.prob24j } : null,
      candles: perp1h,
      bukti: {
        nPrint: whale.print.length, nCluster: whale.cluster.length, oiD24j: d24OI,
        dTopLong, dTopShort, funding: tl.fundingRate,
        perpNet: whale.perpNet, spotNet: whale.spotNet, basisPct,
        orangRasioLong, squeezeSkor: squeeze.skor,
        akumulasiKlasifikasi: akumulasi.verdict,
        sumberHidup: sensus.venues.filter((v) => v.listed).length,
      },
    });
  } catch (e) {
    console.error('[OTAK-MODAL] denyutModal gagal:', e instanceof Error ? e.message : e);
    jiwa = null;
  }

  const data: ModalData = {
    at: new Date().toISOString(),
    meta: { sumber: 'Bybit v5 publik (perp+spot ELSAUSDT) + Gate.io contract stats ELSA_USDT (jumlah akun, top-20 whale, likuidasi nyata)', catatan },
    harga: { spot: hargaSpot, perp: hargaPerp, basisPct: Math.round(basisPct * 1000) / 1000, perubahan24jPct: Math.round(tl.price24hPcnt * 100) / 100, high24h: tl.high24h, low24h: tl.low24h },
    oi: {
      sekarang: tl.openInterest, oiUsd: Math.round(tl.openInterest * hargaPerp),
      delta1j: d1OI === null ? null : Math.round(d1OI * 100) / 100,
      delta4j: d4OI === null ? null : Math.round(d4OI * 100) / 100,
      delta24j: d24OI === null ? null : Math.round(d24OI * 100) / 100,
      hargaDelta1j: d1.harga === null ? null : Math.round(d1.harga * 100) / 100,
      hargaDelta4j: d4.harga === null ? null : Math.round(d4.harga * 100) / 100,
      hargaDelta24j: d24.harga === null ? null : Math.round(d24.harga * 100) / 100,
      jumlahSampel: histOI.length + oi1h.length,
      keterangan: `open interest saat ini ${tl.openInterest.toLocaleString('id-ID')} ELSA ≈ ${fmtUsd(tl.openInterest * hargaPerp)} · riwayat resmi Bybit ${oi1h.length} titik (1 jam) + memori otak ${histOI.length} sampel`,
      riwayat: oi1h,
    },
    orang: {
      long: orangLong, short: orangShort, hold: orangHold,
      rasioLong: orangRasioLong === null ? null : Math.round(orangRasioLong * 1000) / 1000,
      bybitAkun: { buy: lsTerakhir ? lsTerakhir.buy : null, sell: lsTerakhir ? lsTerakhir.sell : null, sejarah1j: ar1h },
      riwayat: riwayatOrang,
      sumber: gk ? 'Gate.io long_users/short_users (akun nyata) + Bybit account-ratio (rasio)' : 'Gate.io contract stats 1h (akun nyata)',
    },
    whaleTop: {
      topLongSize: gs15Now?.topLongSize ?? null, topShortSize: gs15Now?.topShortSize ?? null,
      topLsrSize: gs15Now?.topLsrSize ?? null,
      topLongAkun: gs15Now?.topLongAkun ?? null, topShortAkun: gs15Now?.topShortAkun ?? null,
      dTopLong: dTopLong === null ? null : Math.round(dTopLong * 100) / 100,
      dTopShort: dTopShort === null ? null : Math.round(dTopShort * 100) / 100,
      klasifikasi: wTop.klasifikasi, cara: wTop.cara,
      sumber: 'Gate.io top-20 position holders (top_long/short_size × quanto 10 ELSA per kontrak)',
    },
    liqReal, tape, korban,
    funding: {
      sekarang: tl.fundingRate, rata12: Math.round(rata12 * 1e6) / 1e6, intervalJam,
      tinggi: tl.fundingRate >= 0.0006,
      sejarah: fh.slice(-24).map((x) => ({ at: x.at, rate: Math.round(x.rate * 1e6) / 1e6 })),
    },
    lsRasio: { buyRatio: lsTerakhir ? lsTerakhir.buy : null, sellRatio: lsTerakhir ? lsTerakhir.sell : null, sejarah: ar.map((x) => ({ at: x.at, buy: x.buy, sell: x.sell })) },
    volume: { perp24jUsd: Math.round(perp24jUsd), spot24jUsd: Math.round(spot24jUsd), bagianFuturesPct: Math.round(bagianFuturesPct * 1000) / 1000 },
    taker: { perpBuyPct: Math.round(perpBuyPct * 1000) / 1000, spotBuyPct: Math.round(spotBuyPct * 1000) / 1000 },
    drive, squeeze, likuidasi, whale, vonis, jiwa,
    sensus, leverage, portal, akumulasi, sidikWhale: sidik,
    acara,
    memoriOI: histOI.slice(-288).map((s) => ({ at: s.at, oi: s.oi, price: s.price })),
  };
  memModal = { at: Date.now(), data };
  return data;
}

// ringkas untuk hook ke payload arena (otak arah)
export type ModalRingkas = {
  vonis: string; pedang: 'BUNUH_SHORT' | 'BUNUH_LONG'; skor: number; drivePct: number; driveLabel: string;
  squeezeSkor: number; squeezeAktif: boolean; whaleBias: string;
  perpNet: number; spotNet: number; basisPct: number; ket: string; at: string;
  orangLong: number | null; orangShort: number | null; orangRasioLong: number | null;
  whaleTopKlasifikasi: string; whaleTopCara: string; dTopLong: number | null; dTopShort: number | null;
  sensus: { venuePerp: number; venueSpot: number; totalOiUsd: number | null; totalVolUsd: number | null; estUniverseAkun: number | null; akunGateHold: number | null };
  leverageDominan: { long: number | null; short: number | null; dominanTier: number; nKaskade: number };
  akumulasiKlasifikasi: string; akumulasiSkor: number;
  portalTurun: { dPct: number; triggerHarga: number; prob24j: number; korbanUsd: number; hargaAkhir: number; estAkun: number | null } | null;
  portalNaik: { dPct: number; triggerHarga: number; prob24j: number; korbanUsd: number; hargaAkhir: number; estAkun: number | null } | null;
  sidikJumlah: number;
  otak: {
    kalibrasiN: number; kalibrasiBenar: number; kalibrasiAkurasi: number;
    keyakinanTerbukaN: number; aturanSiap: number;
    modulasi: { efek: 'DORONG' | 'DISKON' | 'BIASA'; skorSebelum: number; skorSesudah: number; ket: string } | null;
  } | null;
};
export async function getModalRingkas(): Promise<ModalRingkas> {
  const d = await getModalPayload();
  return {
    vonis: d.vonis.vonis, pedang: d.vonis.pedang, skor: d.vonis.skor, drivePct: d.drive.pct, driveLabel: d.drive.label,
    squeezeSkor: d.squeeze.skor, squeezeAktif: d.squeeze.aktif, whaleBias: d.whale.biasLabel,
    perpNet: d.whale.perpNet, spotNet: d.whale.spotNet, basisPct: d.harga.basisPct,
    ket: d.vonis.implikasi, at: d.vonis.at,
    orangLong: d.orang.long, orangShort: d.orang.short, orangRasioLong: d.orang.rasioLong,
    whaleTopKlasifikasi: d.whaleTop.klasifikasi, whaleTopCara: d.whaleTop.cara,
    dTopLong: d.whaleTop.dTopLong, dTopShort: d.whaleTop.dTopShort,
    sensus: {
      venuePerp: d.sensus.venues.filter((v) => v.jenis === 'perp').length,
      venueSpot: d.sensus.venues.filter((v) => v.jenis === 'spot').length,
      totalOiUsd: d.sensus.totalOiUsd, totalVolUsd: d.sensus.totalVolUsd,
      estUniverseAkun: d.sensus.estUniverseAkun, akunGateHold: d.sensus.akunGate.hold,
    },
    leverageDominan: { long: d.leverage.longDominan, short: d.leverage.shortDominan, dominanTier: d.leverage.dominanTier, nKaskade: d.leverage.nKaskade },
    akumulasiKlasifikasi: d.akumulasi.verdict, akumulasiSkor: d.akumulasi.skor,
    portalTurun: d.portal.bencanaTurun ? { dPct: d.portal.bencanaTurun.dPct, triggerHarga: d.portal.bencanaTurun.triggerHarga, prob24j: d.portal.bencanaTurun.prob24j, korbanUsd: d.portal.bencanaTurun.korbanUsd, hargaAkhir: d.portal.bencanaTurun.hargaAkhir, estAkun: d.portal.bencanaTurun.estAkunKorban } : null,
    portalNaik: d.portal.bencanaNaik ? { dPct: d.portal.bencanaNaik.dPct, triggerHarga: d.portal.bencanaNaik.triggerHarga, prob24j: d.portal.bencanaNaik.prob24j, korbanUsd: d.portal.bencanaNaik.korbanUsd, hargaAkhir: d.portal.bencanaNaik.hargaAkhir, estAkun: d.portal.bencanaNaik.estAkunKorban } : null,
    sidikJumlah: d.sidikWhale.akun.length,
    otak: d.jiwa ? {
      kalibrasiN: d.jiwa.kalibrasi.nTerjawab, kalibrasiBenar: d.jiwa.kalibrasi.nBenar, kalibrasiAkurasi: d.jiwa.kalibrasi.akurasi,
      keyakinanTerbukaN: d.jiwa.keyakinanTerbuka.length,
      aturanSiap: d.jiwa.kepahaman.filter((k) => k.n >= 4).length,
      modulasi: d.jiwa.modulasi ? { efek: d.jiwa.modulasi.efek, skorSebelum: d.jiwa.modulasi.skorSebelum, skorSesudah: d.jiwa.modulasi.skorSesudah, ket: d.jiwa.modulasi.ket } : null,
    } : null,
  };
}
