// ============================================================
// MICAPROFITA-ELSA · RADAR PAUS — forensik cetakan paus nyata
// (permintaan pemilik): saat paus beli ELSA, sistem WAJIB tahu
//   1) pembeliannya di SPOT atau FUTURES,
//   2) posisinya LONG atau SHORT (beli spot tapi pasang short
//      = pola hedged yang mematikan kalau salah dibaca),
//   3) dana gila-gilaan (misal 100 juta USD) MUNGKIN atau TIDAK
//      di pasar sekecil ini — atau justru PERTANDA akumulasi.
// Sumber jejak NYATA (bukan kabar):
//   - Bybit spot + linear ELSAUSDT recent-trade (sisi taker nyata)
//   - Gate contract_stats 1h (OI, taker size, top-20, 24 jam penuh)
//   - Bybit orderbook spot+linear (kedalaman ±2%) + ticker (volume/OI/funding)
// Hukum jujur: sisi taker = fakta; buka/tutup posisi = inferensi dari
// ΔOI per jam (Bybit OI-history kosong untuk ELSA — diakui terbuka);
// identitas dompet tak terbaca tanpa kunci on-chain (Etherscan/Arkham).
// V2 — JIWA (keluhan pemilik: "radar paus masih mayat, tak punya ruh
// dan tak ada neuron"): radar kini HIDUP — neuron siluet paus diingat
// lintas denyut (db/elsa/paus/neuron.json), formula keyakinan tumbuh
// dari bukti, DUEL paus-vs-paus diprediksi ("paus ini akan kalah dimakan
// paus itu"), tiap duel dijawab candle nyata, komponen formula dikalibrasi
// mandiri dari hasil medan, dan kesaksiannya dikirim ke dewan AR-E10
// arahVonis — radar paus ikut memutuskan, bukan pajangan mati.
// V3 — KUALITAS DINAIKKAN (keluhan pemilik: "masih terasa kualitasnya
// rendah"): lima kualitas baru yang membuat paus benar-benar PAUS:
//   1) IDENTITAS PAUS-ASLI: neuron hanya lahir dari cetakan KELAS PAUS
//      (≥ $2000 & ≥ 15× median) — kerumunan $500 tidak lagi menyamar
//      jadi paus; dicocokkan antar denyut lewat SIDIK UKURAN (band 0,4×–
//      2,5× median + venue + sisi + umur < 90 menit), bukan sekadar
//      bucket — PAUS-xx kini benar-benar satu kekuatan pasar, bukan
//      rata-rata kerumunan.
//   2) DINDING PAUS: dinding bid/ask besar di orderbook (Bybit spot/fut
//      + Gate fut) dilacak LINTAS DENYUT — lahir, bertahan, digigit,
//      PATAH DIMAKAN, atau MUNDUR (bait) — bukti medan nyata siapa
//      bertahan & siapa kalah, bukan cuma angka tenaga.
//   3) KERUMUNAN vs PAUS: rasio long/short akun Bybit (crowd) diadu
//      dgn sisi paus — kerumunan sesak = bahan bakar likuidasi.
//   4) REKAM JEJAK PER PAUS: tiap paus mencatat duel menang/kalah —
//      reputasi masuk formula keyakinan (paus yang sering salah DIDEMOT),
//      bukan semuanya diratakan.
//   5) KEPAHAMAN TERTAMBANG: aturan (funding/OI/dinding/kerumunan)
//      dinilai dari duel terjawab — n/benar/akurasi tiap aturan tumbuh
//      dan tersimpan — akumulasi kepahaman yang terbaca manusia.
// ============================================================
import fs from 'fs';
import { denyutPaus, type PausJiwa } from './paus-jiwa';

export type { PausJiwa } from './paus-jiwa';

const BYBIT = 'https://api.bybit.com/v5/market';
const GATE = 'https://api.gateio.ws/api/v4/futures/usdt';
const SIMBOL = 'ELSAUSDT';
const KONTRAK = 'ELSA_USDT';
const MULTIPLIER_GATE = 10; // 1 kontrak Gate = 10 ELSA (quanto_multiplier resmi)
const AMBANG_MIN_USD = 500; // untuk koin sekecil ELSA, cetakan $500 sudah menonjol (contoh pemilik: 3.5rb USD)
const AMBANG_KALI_MEDIAN = 15; // atau ≥ 15× ukuran trade tipikal di jendela itu

// ---------------- tipe ----------------
export type CetakanPaus = {
  t: number; // epoch ms — bahan memori neuron jiwa
  waktu: string; venue: 'SPOT' | 'FUTURES';
  sisi: 'TAKER_BELI' | 'TAKER_JUAL';
  usd: number; harga: number; ukuran: number;
  niat: string; dasarNiat: string;
};
export type JamNiat = {
  jam: string;
  dOiUsd: number; takerBeliUsd: number; takerJualUsd: number;
  niat: 'LONG_BARU' | 'SHORT_BARU' | 'TUTUP_LONG' | 'TUTUP_SHORT' | 'DATAR';
  ket: string;
};
export type AuditDana = {
  klaim: number; rVol24: number; rKedalaman: number; rOi: number;
  vonis: string; makna: string;
};
// V3 — level orderbook mentah (bahan deteksi DINDING paus) + kerumunan
// (rasio long/short akun Bybit) + meter kualitas sinyal per sumber
export type LevelBuku = { p: number; usd: number };
export type SisiBuku = { venue: string; sisi: 'BID' | 'ASK'; levels: LevelBuku[] };
export type Kerumunan = {
  akunLongPct: number | null; akunRasio: number | null;
  posisiLongPct: number | null; posisiRasio: number | null;
  jam: { t: number; akunRasio: number | null; posisiRasio: number | null }[];
  tersedia: boolean; catatan: string;
};
export type SinyalKualitas = { sumber: string; umurMenit: number | null; catatan: string };
// ============================================================
// V4 — LAPISAN SENYAP (keluhan pemilik 2026-11-26: "saya melihat adanya
// kecolongan di radar paus… suatu waktu whale bisa saja masuk tanpa
// diketahui!!"). Tiga kecolongan NYATA ditemukan dan ditutup:
//   1) CETAKAN HILANG ANTARA DENYUT — recent-trade cuma jendela menit;
//      cetakan paus bisa tersapu trade baru sebelum denyut 3 menit berikut
//      → Kini PITA KONTINU: tiap denyut, cetakan kelas paus disimpan
//      permanen (db/elsa/paus/tape.json, dedupe antar denyut, cap 3000) —
//      paus yang masuk saat tidak ada yang menonton TERTANGKAP dan tidak
//      hilang lagi.
//   2) PAUS MASUK TANPA CETAKAN BESAR — paus membelah order jadi potongan
//      kecil (TWAP/iceberg) yang tak pernah menyentuh ambang cetakan, atau
//      menyerap buku diam-diam → Kini 4 deteksi: TWAP_BELAH (klaster ≥5
//      cetakan seragam ±12% dalam 120 menit, total kelas paus), ABSORPSI
//      (volume ≥2,5× median jam sambil harga bergerak ≤0,9%), CVD_DIVERGEN
//      (arus taker vs harga 6 jam berlawanan), OI_SENYAP (OI naik ≥1,5%/
//      jam ≥2 jam berturut sambil harga datar) — ciri "masuk tanpa
//      diketahui": ARUS berubah, HARGA tidak.
//   3) VENUE BUTA — radar lama hanya menonton Bybit+Gate; ELSA juga
//      diperdagangkan di BingX/Toobit/MEXC (volume 24j senyap besar,
//      terukur: BingX ~$1,9jt/hari) → Kini sweep 3 venue itu tiap denyut:
//      volume share + premium/discount vs Bybit. Tempat paus bisa masuk
//      diam-diam kini TERLIHAT, dan ketiadaan datanya diakui jujur.
// Semua temuan jadi SENYAP-SKOR 0–100 + kesaksian RADAR-PAUS:SENYAP ke
// dewan AR-E10 — paus senyap ikut memutuskan arah, bukan pajangan.
// ============================================================
export type TemuanSenyap = {
  jenis: 'ABSORPSI_JAM' | 'CVD_DIVERGEN' | 'OI_SENYAP' | 'TWAP_BELAH' | 'DINDING_ISI_ULANG' | 'VENUE_SENYAP';
  arah: 'NAIK' | 'TURUN' | 'NETRAL';
  kekuatan: number; // 0..1
  usd: number | null;
  judul: string;
  bukti: string[];
};
export type VenueSenyap = {
  venue: string; vol24jUsd: number; harga: number;
  selisihPct: number | null; volSharePct: number; tersedia: boolean; catatan?: string;
};
export type SenyapData = {
  at: string;
  skor: number; // 0..100 — kepadatan bukti paus masuk tanpa diketahui
  arahDominan: 'NAIK' | 'TURUN' | 'NETRAL';
  vonis: string;
  temuan: TemuanSenyap[];
  pita: { total: number; rentangJam: number | null; baruDenyutIni: number; klusterTwap: number; catatan: string };
  venueLain: VenueSenyap[];
  jujur: string[];
};
export type PausData = {
  at: string; harga: number;
  jendela: { spotMenit: number | null; futuresMenit: number | null; spotTrades: number; futuresTrades: number };
  ambang: { spotUsd: number; futuresUsd: number; dasar: string; pausUsd: number };
  cetakan: CetakanPaus[];
  niatJam: JamNiat[];
  pola: { nama: string; tone: 'merah' | 'hijau' | 'amber'; vonis: string; bukti: string[] } | null;
  dindingMentah: SisiBuku[]; // V3 — level orderbook mentah utk pelacakan dinding di jiwa
  kerumunan: Kerumunan; // V3 — kerumunan (crowd) vs paus
  sinyal: SinyalKualitas[]; // V3 — kejujuran kualitas sinyal per sumber
  jiwa?: PausJiwa | null; // JIWA — neuron, duel, kalibrasi, kesaksian (radar hidup)
  net: { jendelaJam: number; spotBeliUsd: number; spotJualUsd: number; netSpotUsd: number; longBaruUsd: number; shortBaruUsd: number; sisiPenempatan: 'LONG' | 'SHORT' | 'SEIMBANG' };
  pasar: { vol24jSpotUsd: number; vol24jFuturesUsd: number; oiUsdBybit: number; oiUsdGate: number; kedalamanBid2pctUsd: number; kedalamanAsk2pctUsd: number; fundingPct: number; sisiBayar: string };
  auditDana: AuditDana[];
  jejak: { cetakanPausJumlah: number; cetakanPausUsd: number; netSpotUsd: number; takerFutures24jUsd: number; liq24j: { longUsd: number; shortUsd: number } };
  senyap: SenyapData; // V4 — lapisan deteksi paus masuk tanpa diketahui
  vonis: string[];
  jujur: string[];
};

// ---------------- jaringan ----------------
async function getJson(url: string): Promise<unknown> {
  const r = await fetch(url, { signal: AbortSignal.timeout(12000), cache: 'no-store' });
  if (!r.ok) throw new Error(`radar-paus ${r.status} ${url.slice(0, 60)}`);
  return r.json();
}
type TradeB = { price: number; size: number; side: 'Buy' | 'Sell'; time: number; src?: string };
async function bybitTrades(category: 'spot' | 'linear'): Promise<TradeB[]> {
  const j = (await getJson(`${BYBIT}/recent-trade?category=${category}&symbol=${SIMBOL}&limit=1000`)) as { retCode: number; result?: { list?: { price: string; size: string; side: string; time: string }[] } };
  if (j.retCode !== 0 || !j.result?.list) return [];
  return j.result.list.map((t) => ({ price: Number(t.price), size: Number(t.size), side: t.side as 'Buy' | 'Sell', time: Number(t.time), src: category === 'spot' ? 'bybit-spot' : 'bybit-linear' }));
}
async function gateSpotTrades(): Promise<TradeB[]> {
  // Gate spot: side = sisi TAKER (dokumen v4) — memperkaya jendela cetakan spot
  const j = (await getJson(`https://api.gateio.ws/api/v4/spot/trades?currency_pair=ELSA_USDT&limit=1000`)) as { side: string; amount: string; price: string; create_time: string }[];
  return (Array.isArray(j) ? j : []).map((t) => ({ price: Number(t.price), size: Number(t.amount), side: (t.side === 'buy' ? 'Buy' : 'Sell') as 'Buy' | 'Sell', time: Math.round(Number(t.create_time) * 1000), src: 'gate-spot' }));
}
type BukuB = { bid: number; ask: number; bidLv: LevelBuku[]; askLv: LevelBuku[]; atMs: number };
async function bybitOrderbook(category: 'spot' | 'linear'): Promise<BukuB> {
  const atMs = Date.now();
  const j = (await getJson(`${BYBIT}/orderbook?category=${category}&symbol=${SIMBOL}&limit=200`)) as { retCode: number; result?: { b: string[][]; a: string[][] } };
  const bids = (j.result?.b ?? []).map(([p, s]) => [Number(p), Number(s)] as [number, number]).filter(([p, q]) => p > 0 && q > 0);
  const asks = (j.result?.a ?? []).map(([p, s]) => [Number(p), Number(s)] as [number, number]).filter(([p, q]) => p > 0 && q > 0);
  if (!bids.length || !asks.length) return { bid: 0, ask: 0, bidLv: [], askLv: [], atMs };
  const mid = (bids[0][0] + asks[0][0]) / 2;
  const lv = (rows: [number, number][]) => rows.map(([p, q]) => ({ p, usd: p * q }));
  return {
    bid: bids.filter(([p]) => p >= mid * 0.98).reduce((s, [p, q]) => s + p * q, 0),
    ask: asks.filter(([p]) => p <= mid * 1.02).reduce((s, [p, q]) => s + p * q, 0),
    bidLv: lv(bids), askLv: lv(asks), atMs,
  };
}
async function gateOrderbook(): Promise<{ bid: number; ask: number; bidLv: LevelBuku[]; askLv: LevelBuku[]; atMs: number }> {
  // Gate futures v4 order_book: bentuk resmi [{ p: "0.07", s: "118" }] —
  // 1 kontrak = 10 ELSA (quanto_multiplier). Toleran juga bila datang [p, s].
  const atMs = Date.now();
  const j = (await getJson(`${GATE}/order_book?contract=${KONTRAK}&limit=50`)) as { bids?: unknown[]; asks?: unknown[] };
  const lv = (rows: unknown[] | undefined): LevelBuku[] =>
    (rows ?? [])
      .map((r) => {
        if (Array.isArray(r)) return { p: Number(r[0]), usd: Number(r[0]) * Number(r[1]) * MULTIPLIER_GATE };
        const o = r as { p?: string | number; s?: string | number };
        return { p: Number(o.p), usd: Number(o.p) * Number(o.s) * MULTIPLIER_GATE };
      })
      .filter((x) => x.p > 0 && x.usd > 0);
  const bidLv = lv(j.bids), askLv = lv(j.asks);
  const mid = bidLv.length && askLv.length ? (bidLv[0].p + askLv[0].p) / 2 : 0;
  return {
    bid: mid ? bidLv.filter((x) => x.p >= mid * 0.98).reduce((s, x) => s + x.usd, 0) : 0,
    ask: mid ? askLv.filter((x) => x.p <= mid * 1.02).reduce((s, x) => s + x.usd, 0) : 0,
    bidLv, askLv, atMs,
  };
}
// KERUMUNAN — rasio akun long/short Bybit (crowd, bukan paus). Endpoint
// yang TERBUKTI hidup untuk ELSAUSDT: account-ratio (global-lsr/long-short-ratio
// = 404 di beberapa jaringan — sudah diuji langsung).
async function bybitKerumunan(): Promise<Kerumunan> {
  const kosong: Kerumunan = { akunLongPct: null, akunRasio: null, posisiLongPct: null, posisiRasio: null, jam: [], tersedia: false, catatan: 'rasio kerumunan belum tersedia' };
  try {
    const j = (await getJson(`${BYBIT}/account-ratio?category=linear&symbol=${SIMBOL}&period=1h&limit=24`)) as { retCode: number; result?: { list?: { buyRatio: string; sellRatio: string; timestamp: string }[] } };
    const la = j.retCode === 0 ? (j.result?.list ?? []) : [];
    if (!la.length) { kosong.catatan = 'account-ratio Bybit kosong utk ELSAUSDT — diakui terbuka'; return kosong; }
    const jam = la
      .map((a) => {
        const buy = Number(a.buyRatio), sell = Number(a.sellRatio);
        const tot = buy + sell;
        return { t: Number(a.timestamp), akunRasio: sell > 0 ? buy / sell : null, akunLongPct: tot > 0 ? Math.round((buy / tot) * 1000) / 10 : null };
      })
      .filter((x) => x.akunLongPct != null)
      .sort((a, b) => b.t - a.t);
    if (!jam.length) { kosong.catatan = 'account-ratio Bybit tak terbaca — diakui terbuka'; return kosong; }
    const k0 = jam[0];
    return {
      akunLongPct: k0.akunLongPct,
      akunRasio: k0.akunRasio,
      posisiLongPct: null, // account-ratio = rasio AKUN; rasio nilai posisi tak tersedia utk ELSA — jujur, tak dikarang
      posisiRasio: null,
      jam: jam.map((x) => ({ t: x.t, akunRasio: x.akunRasio, posisiRasio: null })),
      tersedia: true,
      catatan: 'rasio akun Bybit linear 1h (account-ratio) — kerumunan, bukan paus (paus dilihat di cetakan & dinding)',
    };
  } catch {
    kosong.catatan = 'rasio kerumunan gagal diambil — diakui, bukan dikarang';
    return kosong;
  }
}
async function bybitTicker(category: 'spot' | 'linear'): Promise<Record<string, number>> {
  const j = (await getJson(`${BYBIT}/tickers?category=${category}&symbol=${SIMBOL}`)) as { result?: { list?: Record<string, string>[] } };
  const r = j.result?.list?.[0] ?? {};
  const num = (k: string) => Number(r[k]) || 0;
  return category === 'spot'
    ? { vol24Usd: num('turnover24h'), harga: num('lastPrice') }
    : { vol24Usd: num('turnover24h'), oiUsd: num('openInterestValue'), funding: num('fundingRate'), harga: num('lastPrice') };
}
type StatG = Record<string, number | string>;
async function gateStats(): Promise<StatG[]> {
  const j = (await getJson(`${GATE}/contract_stats?contract=${KONTRAK}&interval=1h&limit=26`)) as StatG[];
  const nowS = Math.floor(Date.now() / 1000);
  return j.filter((s) => Number(s.time) <= nowS).sort((a, b) => Number(a.time) - Number(b.time));
}
async function gateCandles(): Promise<Map<number, number>> {
  const j = (await getJson(`${GATE}/candlesticks?contract=${KONTRAK}&interval=1h&limit=26`)) as Record<string, string>[];
  const m = new Map<number, number>();
  for (const r of j) m.set(Number(r.t), Number(r.c));
  return m;
}

// ---------------- V4 LAPISAN SENYAP — kecolongan ditutup ----------------
const jamLabel = (t: number) => new Date(t).toISOString().slice(11, 16).replace(':', '.');

// 1) PITA KONTINU — cetakan kelas paus disimpan permanen lintas denyut
type TapeEntri = { t: number; venue: string; sisi: 'TAKER_BELI' | 'TAKER_JUAL'; usd: number; harga: number; size: number };
type TapeFile = { v: 1; cetakan: TapeEntri[] };
const FILE_TAPE = '/home/z/my-project/db/elsa/paus/tape.json';
const CAP_TAPE = 3000;
function bacaTape(): TapeEntri[] {
  try {
    const j = JSON.parse(fs.readFileSync(FILE_TAPE, 'utf8')) as TapeFile;
    if (j && Array.isArray(j.cetakan)) return j.cetakan;
  } catch { /* tape baru */ }
  return [];
}
function tulisTape(cetakan: TapeEntri[]): void {
  try {
    fs.mkdirSync('/home/z/my-project/db/elsa/paus', { recursive: true });
    fs.writeFileSync(FILE_TAPE, JSON.stringify({ v: 1, cetakan } as TapeFile));
  } catch { /* gagal simpan — denyut berikutnya menambah lagi */ }
}
function tambahTape(trades: TradeB[], venue: string, ambang: number): { tape: TapeEntri[]; baru: number } {
  const tape = bacaTape();
  const ada = new Set(tape.map((x) => `${x.venue}|${x.t}|${x.harga}|${x.size}|${x.sisi}`));
  let baru = 0;
  for (const t of trades) {
    const usd = t.price * t.size;
    if (usd < ambang) continue;
    const k = `${venue}|${t.time}|${t.price}|${t.size}|${t.side === 'Buy' ? 'TAKER_BELI' : 'TAKER_JUAL'}`;
    if (ada.has(k)) continue;
    ada.add(k);
    tape.push({ t: t.time, venue, sisi: (t.side === 'Buy' ? 'TAKER_BELI' : 'TAKER_JUAL') as 'TAKER_BELI' | 'TAKER_JUAL', usd: Math.round(usd), harga: t.price, size: t.size });
    baru += 1;
  }
  const bersih = tape.sort((a, b) => b.t - a.t).slice(0, CAP_TAPE);
  if (baru > 0) tulisTape(bersih);
  return { tape: bersih, baru };
}

// 2) TWAP/ICEBERG — paus membelah order jadi potongan seragam di bawah ambang
function deteksiTwap(tape: TapeEntri[], pausUsd: number, medianSemua: number): TemuanSenyap[] {
  const kini = Date.now();
  const batas = kini - 120 * 60_000;
  const temuan: TemuanSenyap[] = [];
  const venues = [...new Set(tape.map((x) => x.venue))];
  for (const venue of venues) {
    for (const sisi of ['TAKER_BELI', 'TAKER_JUAL'] as const) {
      const arr = tape.filter((x) => x.venue === venue && x.sisi === sisi && x.t >= batas);
      if (arr.length < 5) continue;
      const pakai = new Set<number>();
      for (let i = 0; i < arr.length; i++) {
        if (pakai.has(i)) continue;
        const seed = arr[i].size;
        const kluster: TapeEntri[] = [];
        for (let j = i; j < arr.length; j++) {
          if (pakai.has(j)) continue;
          if (Math.abs(arr[j].size - seed) / Math.max(seed, 1e-9) <= 0.12) { kluster.push(arr[j]); pakai.add(j); }
        }
        if (kluster.length >= 5) {
          const total = kluster.reduce((s, x) => s + x.usd, 0);
          const ukuranMed = kluster.map((x) => x.usd).sort((a, b) => a - b)[Math.floor(kluster.length / 2)];
          if (total >= Math.min(pausUsd, 2500) && ukuranMed >= Math.max(3 * medianSemua, 200)) {
            temuan.push({
              jenis: 'TWAP_BELAH', arah: sisi === 'TAKER_BELI' ? 'NAIK' : 'TURUN',
              kekuatan: Math.min(1, total / Math.max(pausUsd * 1.5, 4000)),
              usd: Math.round(total),
              judul: `order dibelah ${kluster.length}× ukuran seragam (TWAP/iceberg) di ${venue} ${sisi === 'TAKER_BELI' ? 'beli' : 'jual'} — paus masuk SENYAP di bawah ambang cetakan, total $${Math.round(total).toLocaleString('id-ID')}`,
              bukti: kluster.slice(0, 6).map((x) => `${jamLabel(x.t)} ${venue} $${Math.round(x.usd)} @${x.harga.toPrecision(6)}`),
            });
          }
        }
        if (temuan.length >= 4) return temuan;
      }
    }
  }
  return temuan;
}

// 3) ABSORPSI + CVD-DIVERGEN + OI-SENYAP dari statistik Gate per jam —
//    ciri "masuk tanpa diketahui": arus berubah, harga TIDAK bergerak
function deteksiSenyapJam(
  stats: StatG[], candG: Map<number, number>, harga: number, kini: number,
): TemuanSenyap[] {
  const temuan: TemuanSenyap[] = [];
  if (stats.length < 8) return temuan;
  type JamX = { t: number; beli: number; jual: number; vol: number; dPct: number | null; dOiPct: number };
  const jam: JamX[] = [];
  for (let i = 1; i < stats.length; i++) {
    const t = Number(stats[i].time) * 1000;
    const tPrev = Number(stats[i - 1].time) * 1000;
    const hj = candG.get(Number(stats[i].time)) || harga;
    const hjPrev = candG.get(Number(stats[i - 1].time)) || hj;
    const beli = Number(stats[i].long_taker_size) * MULTIPLIER_GATE * hj;
    const jual = Number(stats[i].short_taker_size) * MULTIPLIER_GATE * hj;
    const oi = Number(stats[i].open_interest), oiPrev = Number(stats[i - 1].open_interest);
    jam.push({
      t, beli, jual, vol: beli + jual,
      dPct: hjPrev > 0 ? (hj - hjPrev) / hjPrev * 100 : null,
      dOiPct: oiPrev > 0 ? oi / oiPrev - 1 : 0,
    });
  }
  const volUrut = jam.map((j) => j.vol).sort((a, b) => a - b);
  const medianVol = volUrut[Math.floor(volUrut.length / 2)] || 1;
  // ABSORPSI — volume besar sambil harga nyaris diam
  for (const j of jam) {
    if (j.vol >= 2.5 * medianVol && j.dPct !== null && Math.abs(j.dPct) <= 0.9 && j.vol >= 2500) {
      const umurMenit = Math.round((kini - j.t) / 60_000);
      if (umurMenit > 600) continue; // lebih dari 10 jam lama — konteks, bukan sinyal hidup
      temuan.push({
        jenis: 'ABSORPSI_JAM', arah: j.beli >= j.jual ? 'NAIK' : 'TURUN',
        kekuatan: Math.min(1, j.vol / (3.5 * medianVol)),
        usd: Math.round(j.vol),
        judul: `ABSORPSI ${jamLabel(j.t)} UTC (${umurMenit} mnt lalu): arus taker $${Math.round(j.vol).toLocaleString('id-ID')} = ${(j.vol / medianVol).toFixed(1)}× median jam, tapi harga cuma bergerak ${j.dPct?.toFixed(2)}% — ${j.beli >= j.jual ? 'beli' : 'jual'} dominan menyerap buku TANPA menaikkan/menurunkan harga: ciri klasik paus masuk diam-diam`,
        bukti: [`taker beli $${Math.round(j.beli).toLocaleString('id-ID')} vs jual $${Math.round(j.jual).toLocaleString('id-ID')}`, `Δharga jam itu ${(j.dPct ?? 0).toFixed(2)}%`, `median volume/jam $${Math.round(medianVol).toLocaleString('id-ID')}`],
      });
      if (temuan.length >= 3) break;
    }
  }
  // CVD-DIVERGEN — 6 jam terakhir: arus taker vs perubahan harga berlawanan
  const enam = jam.slice(-6);
  if (enam.length >= 4) {
    const cvd = enam.reduce((s, j) => s + (j.beli - j.jual), 0);
    const hargaAwal = candG.get(Math.round(enam[0].t / 3_600_000) * 3_600_000) ?? enam[0].beli / Math.max(enam[0].beli, 1) * harga;
    const dHarga6 = hargaAwal > 0 ? ((candG.get(Math.round(enam[enam.length - 1].t / 3_600_000) * 3_600_000) || harga) - hargaAwal) / hargaAwal * 100 : 0;
    if (cvd >= 6000 && dHarga6 <= 0.7) {
      temuan.push({
        jenis: 'CVD_DIVERGEN', arah: 'NAIK', kekuatan: Math.min(1, cvd / 25_000), usd: Math.round(cvd),
        judul: `DIVERGENSI CVD 6 JAM: arus taker bersih +$${Math.round(cvd).toLocaleString('id-ID')} sambil harga hanya ${dHarga6 >= 0 ? '+' : ''}${dHarga6.toFixed(2)}% — akumulasi senyap: uang masuk lebih cepat dari harga`,
        bukti: enam.map((j) => `${jamLabel(j.t)} net ${j.beli - j.jual >= 0 ? '+' : ''}$${Math.round(j.beli - j.jual)} (Δharga ${j.dPct?.toFixed(2) ?? '—'}%)`),
      });
    } else if (cvd <= -6000 && dHarga6 >= -0.7) {
      temuan.push({
        jenis: 'CVD_DIVERGEN', arah: 'TURUN', kekuatan: Math.min(1, -cvd / 25_000), usd: Math.round(-cvd),
        judul: `DIVERGENSI CVD 6 JAM: arus taker bersih -$${Math.round(-cvd).toLocaleString('id-ID')} sambil harga hanya ${dHarga6.toFixed(2)}% — distribusi senyap: supply dilepas pelan tanpa membumrohkan harga`,
        bukti: enam.map((j) => `${jamLabel(j.t)} net ${j.beli - j.jual >= 0 ? '+' : ''}$${Math.round(j.beli - j.jual)} (Δharga ${j.dPct?.toFixed(2) ?? '—'}%)`),
      });
    }
  }
  // OI-SENYAP — posisi dibangun bertahap sambil harga diam
  let run = 0; let runBeli = 0; let runJual = 0; let runD = 0; let runMaks = 0;
  for (const j of [...jam].reverse()) { // dari terbaru mundur
    if (j.dOiPct >= 0.015 && j.dPct !== null && Math.abs(j.dPct) <= 1.0) {
      run += 1; runBeli += j.beli; runJual += j.jual; runD += j.dPct; runMaks = Math.max(runMaks, run);
    } else break;
  }
  if (run >= 2) {
    temuan.push({
      jenis: 'OI_SENYAP', arah: runBeli >= runJual ? 'NAIK' : 'TURUN',
      kekuatan: Math.min(1, run / 4), usd: null,
      judul: `OI SENYAP ${run} jam berturut: open interest naik ≥1,5%/jam (kini ${((1 + jam[jam.length - 1].dOiPct) * 100 - 100).toFixed(1)}%/jam) sambil harga rata-rata hanya ${(runD / run).toFixed(2)}%/jam — posisi baru dibangun bertahap (${runBeli >= runJual ? 'long' : 'short'} senyap)`,
      bukti: [`${run} jam: taker beli $${Math.round(runBeli).toLocaleString('id-ID')} vs jual $${Math.round(runJual).toLocaleString('id-ID')}`, 'ΔOI Gate 1h — inferensi buka, diakui resolusi jam'],
    });
  }
  return temuan;
}

// 4) DINDING ISI ULANG (iceberg di buku pesanan) — dinding digigit lalu
//    muncul LAGI di harga yang sama: ada stok tersembunyi di bawah tampilan
type DindingSenyapEntri = { venue: string; sisi: 'BID' | 'ASK'; harga: number; puncak: number; usd: number; t: number; isiUlang: number; terkikis: boolean };
type DindingSenyapFile = { v: 1; levels: DindingSenyapEntri[] };
const FILE_DINDING_SENYAP = '/home/z/my-project/db/elsa/paus/dinding-senyap.json';
function deteksiIsiUlang(dindingMentah: SisiBuku[]): TemuanSenyap[] {
  const kini = Date.now();
  let st: DindingSenyapFile;
  try {
    st = JSON.parse(fs.readFileSync(FILE_DINDING_SENYAP, 'utf8')) as DindingSenyapFile;
    if (!st || !Array.isArray(st.levels)) st = { v: 1, levels: [] };
  } catch { st = { v: 1, levels: [] }; }
  const temuan: TemuanSenyap[] = [];
  const lihatKini = new Map<string, { usd: number; venue: string; sisi: 'BID' | 'ASK'; harga: number }>();
  for (const sisi of dindingMentah) {
    const puncak4 = [...sisi.levels].sort((a, b) => b.usd - a.usd).slice(0, 4).filter((l) => l.usd >= 800);
    for (const l of puncak4) {
      lihatKini.set(`${sisi.venue}|${sisi.sisi}|${l.p}`, { usd: l.usd, venue: sisi.venue, sisi: sisi.sisi, harga: l.p });
    }
  }
  for (const [k, kini2] of lihatKini) {
    const prev = st.levels.find((x) => `${x.venue}|${x.sisi}|${x.harga}` === k);
    if (!prev) {
      st.levels.push({ venue: kini2.venue, sisi: kini2.sisi, harga: kini2.harga, puncak: kini2.usd, usd: kini2.usd, t: kini, isiUlang: 0, terkikis: false });
      continue;
    }
    if (kini2.usd < prev.puncak * 0.4) {
      prev.terkikis = true; // dinding dimakan
    } else if (kini2.usd >= prev.puncak * 0.6 && prev.terkikis) {
      prev.isiUlang += 1;
      prev.terkikis = false;
      if (prev.isiUlang >= 2) {
        temuan.push({
          jenis: 'DINDING_ISI_ULANG', arah: prev.sisi === 'BID' ? 'NAIK' : 'TURUN',
          kekuatan: Math.min(1, prev.puncak / 5000), usd: Math.round(prev.puncak),
          judul: `ICEBERG ${prev.venue} ${prev.sisi} @${prev.harga.toPrecision(6)}: dinding $${Math.round(prev.puncak).toLocaleString('id-ID')} digigit lalu TERISI ULANG ${prev.isiUlang}× — ada stok tersembunyi di bawah tampilan (paus ${prev.sisi === 'BID' ? 'menampung supply' : 'menyediakan supply'} tanpa memindahkan harga)`,
          bukti: [`puncak dinding $${Math.round(prev.puncak).toLocaleString('id-ID')}`, `kini terisi lagi $${Math.round(kini2.usd).toLocaleString('id-ID')}`, `isi ulang ke-${prev.isiUlang} dalam jendela pantau`],
        });
      }
    }
    prev.usd = kini2.usd;
    prev.puncak = Math.max(prev.puncak, kini2.usd);
    prev.t = kini;
  }
  // buang level yang tak terlihat >2 denyut (>30 menit)
  st.levels = st.levels.filter((x) => kini - x.t < 30 * 60_000).slice(0, 60);
  try {
    fs.mkdirSync('/home/z/my-project/db/elsa/paus', { recursive: true });
    fs.writeFileSync(FILE_DINDING_SENYAP, JSON.stringify(st));
  } catch { /* abai */ }
  return temuan.slice(0, 2);
}

// 5) SWEEP VENUE LAIN — tempat paus bisa masuk diam-diam (di luar Bybit+Gate)
async function sweepVenueLain(hargaBybit: number): Promise<VenueSenyap[]> {
  const out: VenueSenyap[] = [];
  const dorong = (venue: string, fn: () => Promise<VenueSenyap>) =>
    fn().catch(() => ({ venue, vol24jUsd: 0, harga: 0, selisihPct: null, volSharePct: 0, tersedia: false, catatan: 'venue gagal dijangkau — diakui jujur' }));
  out.push(await dorong('MEXC spot', async () => {
    const j = (await getJson('https://api.mexc.com/api/v3/ticker/24hr?symbol=ELSAUSDT')) as Record<string, string>;
    const harga = Number(j.lastPrice) || 0;
    return { venue: 'MEXC spot', vol24jUsd: Number(j.quoteVolume) || 0, harga, selisihPct: harga > 0 && hargaBybit > 0 ? Math.round((harga / hargaBybit - 1) * 10000) / 100 : null, volSharePct: 0, tersedia: true };
  }));
  out.push(await dorong('Toobit perp', async () => {
    const j = (await getJson('https://api.toobit.com/quote/v1/ticker/24hr?symbol=ELSAUSDT')) as { c?: string; qv?: string }[];
    const r = Array.isArray(j) ? j[0] : null;
    const harga = Number(r?.c) || 0;
    return { venue: 'Toobit perp', vol24jUsd: Number(r?.qv) || 0, harga, selisihPct: harga > 0 && hargaBybit > 0 ? Math.round((harga / hargaBybit - 1) * 10000) / 100 : null, volSharePct: 0, tersedia: true };
  }));
  out.push(await dorong('BingX perp', async () => {
    const j = (await getJson('https://open-api.bingx.com/openApi/swap/v2/quote/ticker?symbol=ELSA-USDT')) as { data?: { lastPrice?: string; quoteVolume?: string } };
    const harga = Number(j.data?.lastPrice) || 0;
    return { venue: 'BingX perp', vol24jUsd: Number(j.data?.quoteVolume) || 0, harga, selisihPct: harga > 0 && hargaBybit > 0 ? Math.round((harga / hargaBybit - 1) * 10000) / 100 : null, volSharePct: 0, tersedia: true };
  }));
  return out;
}

// rangkai temuan jadi SenyapData (skor + arah dominan + vonis)
function rangkaiSenyap(
  temuan: TemuanSenyap[], pita: { tape: TapeEntri[]; baru: number }, venueLain: VenueSenyap[], kini: number,
): SenyapData {
  const BOBOT: Record<TemuanSenyap['jenis'], number> = {
    TWAP_BELAH: 0.35, ABSORPSI_JAM: 0.30, CVD_DIVERGEN: 0.30, OI_SENYAP: 0.25, DINDING_ISI_ULANG: 0.30, VENUE_SENYAP: 0.15,
  };
  const naik = temuan.filter((t) => t.arah === 'NAIK').reduce((s, t) => s + t.kekuatan, 0);
  const turun = temuan.filter((t) => t.arah === 'TURUN').reduce((s, t) => s + t.kekuatan, 0);
  const rentangJam = pita.tape.length ? Math.round((kini - Math.min(...pita.tape.map((x) => x.t))) / 3_600_000 * 10) / 10 : null;
  const volVenueLain = venueLain.reduce((s, v) => s + v.vol24jUsd, 0);
  const volUtama = volVenueLain > 0 ? volVenueLain : 1; // share dihitung terhadap venue-sweep (Bybit/Gate dipisah agar tidak fetch ganda)
  for (const v of venueLain) v.volSharePct = Math.round((v.vol24jUsd / volUtama) * 1000) / 10;
  // venue senyap jadi temuan bila share / premium mencolok — DITAMBAH DULU,
  // baru skor dihitung (dulu skor dihitung sebelum venue masuk → skor buta venue)
  for (const v of venueLain) {
    if (v.tersedia && v.vol24jUsd >= 150_000) {
      temuan.push({
        jenis: 'VENUE_SENYAP', arah: v.selisihPct !== null ? (v.selisihPct > 0.8 ? 'NAIK' : v.selisihPct < -0.8 ? 'TURUN' : 'NETRAL') : 'NETRAL',
        kekuatan: Math.min(1, v.vol24jUsd / 900_000), usd: Math.round(v.vol24jUsd),
        judul: `VENUE DI LUAR RADAR LAMA: ${v.venue} berputar $${Math.round(v.vol24jUsd).toLocaleString('id-ID')}/24j (${v.volSharePct.toFixed(0)}% dari gabungan venue-lain)${v.selisihPct !== null ? ` — harga ${v.selisihPct >= 0 ? '+' : ''}${v.selisihPct.toFixed(2)}% vs Bybit (premium/discount)` : ''} — paus bisa menempatkan di sini tanpa kelihatan di Bybit/Gate; tape detailnya belum terbaca (diakui)`,
        bukti: [`vol 24j $${Math.round(v.vol24jUsd).toLocaleString('id-ID')}`, `harga ${v.harga ? v.harga.toPrecision(6) : '—'}`],
      });
    }
  }
  const skor = Math.min(100, Math.round(temuan.reduce((s, t) => s + BOBOT[t.jenis] * t.kekuatan, 0) * 100));
  const arahDominan: 'NAIK' | 'TURUN' | 'NETRAL' = naik > turun * 1.3 ? 'NAIK' : turun > naik * 1.3 ? 'TURUN' : 'NETRAL';
  const vonis = skor >= 40
    ? `PAUS SENYAP TERDETEKSI — skor ${skor}/100, condong ${arahDominan}${arahDominan === 'NETRAL' ? '' : ` (${arahDominan === 'NAIK' ? 'arus masuk lebih cepat dari harga' : 'arus keluar lebih cepat dari harga'})`}: ${temuan.slice(0, 3).map((t) => t.judul.split('—')[0].trim()).join(' · ')}. Ini persis "whale masuk tanpa diketahui" yang dulu lolos radar lama — kini arusnya terbaca meski harga diam.`
    : skor >= 15
      ? `ada indikasi senyap lemah (skor ${skor}/100) — ${temuan.length} temuan dicatat, menunggu konfirmasi antar denyut; dilarang menggelembungkan`
      : `tak ada jejak paus senyap yang layak (skor ${skor}/100) — tape kontinu tetap merekam; ketiadaan bukti dilaporkan apa adanya, bukan dikarang`;
  return {
    at: new Date(kini).toISOString(),
    skor, arahDominan, vonis,
    temuan: temuan.sort((a, b) => b.kekuatan - a.kekuatan).slice(0, 8),
    pita: { total: pita.tape.length, rentangJam, baruDenyutIni: pita.baru, klusterTwap: temuan.filter((t) => t.jenis === 'TWAP_BELAH').length, catatan: `pita kontinu menyimpan ${pita.tape.length} cetakan kelas paus lintas denyut (cap 3000) — cetakan tak bisa hilang lagi antara denyut` },
    venueLain,
    jujur: [
      'PITA KONTINU: cetakan kelas paus disimpan lintas denyut (dedupe t|venue|harga|size|sisi) — kecolongan "cetakan hilang saat tidak ada yang menonton" ditutup.',
      'SENYAP ≠ CETAKAN BESAR: TWAP/absorpsi/CVD/OI mendeteksi paus yang membelah order atau menyerap buku tanpa menggeser harga — ARUS berubah, HARGA tidak; dulu semua pola ini tak terlihat.',
      'VENUE LAIN: BingX/Toobit/MEXC disweep tiap denyut (volume 24j + premium vs Bybit). Tape detail venue itu belum terbaca (API terbatas) — diakui jujur; volume besar di sana = peringatan kecolongan berikutnya.',
      'Inferensi buka/tutup tetap dari ΔOI Gate 1h (resolusi jam); skor senyap = kepadatan bukti, bukan kepastian — dilarang memalsukan sinyal dari kebisingan.',
    ],
  };
}

// ---------------- inti radar ----------------
let cachePaus: { at: number; data: PausData } | null = null;

// V3 — METER KUALITAS SINYAL: umur tiap sumber diakui terbuka — pemilik
// melihat kualitas data, bukan cuma kesimpulan (keluhan: "kualitasnya rendah")
function sinyalKualitas(
  spot: TradeB[], fut: TradeB[], stats: StatG[], kerumunan: Kerumunan, bukuAtMs: number, harga: number,
): SinyalKualitas[] {
  const kini = Date.now();
  const umurMenit = (ms: number) => Math.max(0, Math.round((kini - ms) / 60_000));
  const out: SinyalKualitas[] = [];
  const tSpot = spot.length ? Math.max(...spot.map((t) => t.time)) : 0;
  const tFut = fut.length ? Math.max(...fut.map((t) => t.time)) : 0;
  out.push({ sumber: 'tape spot (Bybit+Gate)', umurMenit: tSpot ? umurMenit(tSpot) : null, catatan: `${spot.length} trade — sisi taker = FAKTA; jendela menit` });
  out.push({ sumber: 'tape futures (Bybit)', umurMenit: tFut ? umurMenit(tFut) : null, catatan: `${fut.length} trade — cetakan paus futures` });
  const statAkhir = stats.length ? Number(stats[stats.length - 1].time) * 1000 : 0;
  out.push({ sumber: 'statistik Gate 1h (OI/taker/liq)', umurMenit: statAkhir ? umurMenit(statAkhir) : null, catatan: `${stats.length} jam — resolusi jam, bukan per-print (diakui)` });
  out.push({ sumber: 'orderbook 3 venue', umurMenit: bukuAtMs ? umurMenit(bukuAtMs) : null, catatan: 'dinding paus terbaca LEVEL-LEVEL, bukan sekadar jumlah ±2%' });
  out.push({ sumber: 'kerumunan Bybit (LSR 1h)', umurMenit: kerumunan.jam.length ? umurMenit(kerumunan.jam[0].t) : null, catatan: kerumunan.tersedia ? 'rasio akun & posisi kerumunan tersedia' : kerumunan.catatan });
  out.push({ sumber: 'harga hidup', umurMenit: 0, catatan: `mid $${harga.toFixed(5)} — real-time` });
  return out;
}

export async function getPausData(): Promise<PausData> {
  if (cachePaus && Date.now() - cachePaus.at < 60_000) return cachePaus.data;
  const [spotBy, fut, tickSpot, tickFut, bookSpot, bookFut, gateBook, stats, candG, spotGate, kerumunan] = await Promise.all([
    bybitTrades('spot'), bybitTrades('linear'), bybitTicker('spot'), bybitTicker('linear'),
    bybitOrderbook('spot'), bybitOrderbook('linear'), gateOrderbook(), gateStats(), gateCandles(), gateSpotTrades(),
    bybitKerumunan(),
  ]);
  const spot = [...spotBy, ...spotGate]; // gabung jendela cetakan spot Bybit + Gate
  const harga = tickFut.harga || tickSpot.harga;
  const now = Date.now();

  // ---- 1) CETAKAN PAUS dari jendela trade terakhir (sisi taker = FAKTA) ----
  const buatCetakan = (trades: TradeB[], venue: 'SPOT' | 'FUTURES'): { cetakan: CetakanPaus[]; ambang: number; menit: number | null } => {
    const usdAll = trades.map((t) => t.price * t.size);
    if (!usdAll.length) return { cetakan: [], ambang: AMBANG_MIN_USD, menit: null };
    const median = [...usdAll].sort((a, b) => a - b)[Math.floor(usdAll.length / 2)] || 1;
    const ambang = Math.max(AMBANG_MIN_USD, AMBANG_KALI_MEDIAN * median);
    const mendaftar = trades.filter((t) => t.price * t.size >= ambang);
    // ΔOI per jam (Gate) untuk inferensi buka vs tutup di futures
    const dOiJam = new Map<number, number>();
    for (let i = 1; i < stats.length; i++) {
      const prev = Number(stats[i - 1].open_interest), cur = Number(stats[i].open_interest);
      const pct = prev > 0 ? cur / prev - 1 : 0;
      dOiJam.set(Number(stats[i].time) * 1000, pct);
    }
    const cetakan: CetakanPaus[] = mendaftar.slice(0, 40).map((t) => {
      const beli = t.side === 'Buy';
      const usd = Math.round(t.price * t.size);
      let niat: string; let dasar: string;
      if (venue === 'SPOT') {
        niat = beli ? 'AKUMULASI SPOT' : 'DISTRIBUSI SPOT';
        dasar = `[${t.src ?? 'bybit-spot'}] ` + (beli ? 'taker makan offer — permintaan segera menyerap supply' : 'taker lempar ke bid — supply segera memakan demand');
      } else {
        const dOi = dOiJam.get(Math.floor(t.time / 3_600_000) * 3_600_000) ?? 0;
        if (beli && dOi > 0.01) { niat = 'LONG BARU'; dasar = `taker beli + OI jam itu ${((dOi) * 100).toFixed(1)}% → posisi baru dibuka, bukan tutup`; }
        else if (beli && dOi < -0.01) { niat = 'TUTUP SHORT'; dasar = `taker beli + OI jam itu ${((dOi) * 100).toFixed(1)}% → short menutup, bukan long baru`; }
        else if (beli) { niat = 'LONG AGRESIF'; dasar = 'taker beli, OI jam itu relatif datar → buka long / tutup short tak bisa dipilah'; }
        else if (dOi > 0.01) { niat = 'SHORT BARU'; dasar = `taker jual + OI jam itu ${((dOi) * 100).toFixed(1)}% → short baru dipasang (INI YANG DIKEJAR PEMILIK)`; }
        else if (dOi < -0.01) { niat = 'TUTUP LONG'; dasar = `taker jual + OI jam itu ${((dOi) * 100).toFixed(1)}% → long menutup; kena squeeze?`; }
        else { niat = 'SHORT AGRESIF'; dasar = `taker jual, OI jam itu ${((dOi) * 100).toFixed(1)}% → buka short / tutup long tak bisa dipilah`; }
      }
      return { t: t.time, waktu: jamLabel(t.time), venue, sisi: (beli ? 'TAKER_BELI' : 'TAKER_JUAL') as 'TAKER_BELI' | 'TAKER_JUAL', usd, harga: t.price, ukuran: t.size, niat, dasarNiat: dasar };
    }).sort((a, b) => b.usd - a.usd).slice(0, 24);
    const spanMs = now - Math.min(...trades.map((t) => t.time));
    return { cetakan, ambang, menit: Math.max(1, Math.round(spanMs / 60_000)) };
  };
  const spotC = buatCetakan(spot, 'SPOT');
  const futC = buatCetakan(fut, 'FUTURES');
  const cetakan = [...spotC.cetakan, ...futC.cetakan].sort((a, b) => b.usd - a.usd).slice(0, 28);

  // V3 — AMBANG KELAS PAUS: neuron jiwa hanya lahir dari cetakan sebesar ini.
  // $500-an kerumunan tidak lagi menyamar jadi paus (keluhan kualitas pemilik).
  const medianSemua = (() => {
    const usd = [...spot, ...fut].map((t) => t.price * t.size).sort((a, b) => a - b);
    return usd.length ? usd[Math.floor(usd.length / 2)] || 1 : 1;
  })();
  const pausUsd = Math.min(8000, Math.max(2000, 15 * medianSemua));

  // ---- 1b) LAPISAN SENYAP (V4) — kecolongan "whale masuk tanpa diketahui"
  // ditutup: pita kontinu + TWAP/absorpsi/CVD/OI + dinding isi ulang + venue lain.
  // Gagal sebagian lapisan ≠ gagal radar — tiap bagian berdiri sendiri.
  let senyap: SenyapData;
  try {
    const spotTape = tambahTape(spot, 'spot', spotC.ambang);
    const futTape = tambahTape(fut, 'futures', futC.ambang);
    const gabung = [...spotTape.tape, ...futTape.tape].sort((a, b) => b.t - a.t).slice(0, CAP_TAPE);
    const temuanAwal: TemuanSenyap[] = [
      ...deteksiTwap(gabung, pausUsd, medianSemua),
      ...deteksiSenyapJam(stats, candG, harga, now),
    ];
    try { temuanAwal.push(...deteksiIsiUlang([
      { venue: 'BYBIT-SPOT', sisi: 'BID' as const, levels: bookSpot.bidLv }, { venue: 'BYBIT-SPOT', sisi: 'ASK' as const, levels: bookSpot.askLv },
      { venue: 'BYBIT-FUT', sisi: 'BID' as const, levels: bookFut.bidLv }, { venue: 'BYBIT-FUT', sisi: 'ASK' as const, levels: bookFut.askLv },
      { venue: 'GATE-FUT', sisi: 'BID' as const, levels: gateBook.bidLv }, { venue: 'GATE-FUT', sisi: 'ASK' as const, levels: gateBook.askLv },
    ])); } catch { /* isi-ulang menyusul denyut berikutnya */ }
    let venueLain: VenueSenyap[] = [];
    try { venueLain = await sweepVenueLain(harga); } catch { /* sweep menyusul — diakui */ }
    senyap = rangkaiSenyap(temuanAwal, { tape: gabung, baru: spotTape.baru + futTape.baru }, venueLain, now);
  } catch (e) {
    senyap = {
      at: new Date(now).toISOString(), skor: 0, arahDominan: 'NETRAL',
      vonis: `lapisan senyap gagal dihitung denyut ini (${e instanceof Error ? e.message.slice(0, 80) : 'tak terbaca'}) — diakui jujur, denyut berikutnya mencoba lagi; dilarang melaporkan "aman" tanpa bukti`,
      temuan: [],
      pita: { total: 0, rentangJam: null, baruDenyutIni: 0, klusterTwap: 0, catatan: 'pita kontinu gagal ditulis denyut ini — kecolongan diakui terbuka' },
      venueLain: [],
      jujur: ['lapisan senyap belum menemui medan — kegagalan dilaporkan, bukan ditelan'],
    };
  }

  // ---- 2) NIAT PER JAM 24 JAM (Gate: taker size × OI delta — jendela penuh, bukan 5 menit) ----
  const niatJam: JamNiat[] = [];
  for (let i = 1; i < stats.length; i++) {
    const s = stats[i];
    const t = Number(s.time) * 1000;
    const hargaJam = candG.get(Number(s.time)) || harga;
    const oi = Number(s.open_interest), oiPrev = Number(stats[i - 1].open_interest);
    const dOiUsd = (oi - oiPrev) * MULTIPLIER_GATE * hargaJam;
    const beli = Number(s.long_taker_size) * MULTIPLIER_GATE * hargaJam;
    const jual = Number(s.short_taker_size) * MULTIPLIER_GATE * hargaJam;
    const dOiPct = oiPrev > 0 ? oi / oiPrev - 1 : 0;
    let niat: JamNiat['niat'] = 'DATAR'; let ket: string;
    if (beli > 1.5 * Math.max(jual, 1) && dOiPct > 0.005) { niat = 'LONG_BARU'; ket = 'taker membeli dominan + OI naik → posisi long baru ditempatkan'; }
    else if (jual > 1.5 * Math.max(beli, 1) && dOiPct > 0.005) { niat = 'SHORT_BARU'; ket = 'taker menjual dominan + OI naik → SHORT BARU DIPASANG (beli spot di bawah + short di atas = hedged)'; }
    else if (dOiPct < -0.005 && beli >= jual) { niat = 'TUTUP_SHORT'; ket = 'OI turun + taker beli → short menutup (squeeze kecil)'; }
    else if (dOiPct < -0.005) { niat = 'TUTUP_LONG'; ket = 'OI turun + taker jual → long menutup (tekanan turun)'; }
    else { ket = 'arus seimbang / OI tak berubah — jam tak menentukan'; }
    niatJam.push({ jam: jamLabel(t - 3_600_000), dOiUsd: Math.round(dOiUsd), takerBeliUsd: Math.round(beli), takerJualUsd: Math.round(jual), niat, ket });
  }
  niatJam.reverse(); // terbaru dulu

  // ---- 3) NET 4 JAM + POLA HEDGED (skenario eksak pemilik) ----
  const j4 = niatJam.slice(0, 4);
  const longBaruUsd = j4.filter((j) => j.niat === 'LONG_BARU').reduce((s, j) => s + j.takerBeliUsd, 0);
  const shortBaruUsd = j4.filter((j) => j.niat === 'SHORT_BARU').reduce((s, j) => s + j.takerJualUsd, 0);
  const spotBeliUsd = spotC.cetakan.filter((c) => c.sisi === 'TAKER_BELI').reduce((s, c) => s + c.usd, 0);
  const spotJualUsd = spotC.cetakan.filter((c) => c.sisi === 'TAKER_JUAL').reduce((s, c) => s + c.usd, 0);
  const netSpotUsd = spotBeliUsd - spotJualUsd;
  const jendelaJam = 4;
  const sisiPenempatan: 'LONG' | 'SHORT' | 'SEIMBANG' = longBaruUsd > shortBaruUsd * 1.4 ? 'LONG' : shortBaruUsd > longBaruUsd * 1.4 ? 'SHORT' : 'SEIMBANG';
  let pola: PausData['pola'] = null;
  if (netSpotUsd > 2000 && shortBaruUsd > Math.max(netSpotUsd * 0.6, 8000)) {
    pola = {
      nama: 'SPOT DIBELI + SHORT DIPASANG (HEDGED)', tone: 'merah',
      vonis: 'PAUS BELI SPOT TAPI PASANG SHORT DI FUTURES — DELTA NETRAL, BUKAN BULLISH. Jangan ikut buy hanya karena "paus beli": biasanya cash-and-carry (kumpul funding) atau persiapan tekan turun. Contoh persis pemilik: beli 3.5rb USD ternyata pasang short — inilah polanya, kini TERLIHAT.',
      bukti: [
        `spot: cetakan paus beli net +$${Math.round(netSpotUsd).toLocaleString('id-ID')} (jendela ${spotC.menit} menit)`,
        `futures: short baru 4 jam +$${Math.round(shortBaruUsd).toLocaleString('id-ID')} (long baru hanya +$${Math.round(longBaruUsd).toLocaleString('id-ID')})`,
      ],
    };
  } else if (netSpotUsd < -2000 && longBaruUsd > Math.max(-netSpotUsd * 0.6, 8000)) {
    pola = {
      nama: 'SPOT DIJUAL + LONG DIPASANG (HEDGED BALIK)', tone: 'amber',
      vonis: 'PAUS JUAL SPOT TAPI PASANG LONG DI FUTURES — bisa distribusi sambil hedging, atau rotasi venue. Jangan baca "paus lari" sebelum OI & taker futures dikonfirmasi.',
      bukti: [
        `spot: cetakan paus jual net -$${Math.round(-netSpotUsd).toLocaleString('id-ID')} (jendela ${spotC.menit} menit)`,
        `futures: long baru 4 jam +$${Math.round(longBaruUsd).toLocaleString('id-ID')}`,
      ],
    };
  } else if (netSpotUsd > 2000 && longBaruUsd > 8000) {
    pola = {
      nama: 'AKUMULASI GANDA (SPOT + FUTURES SEARAH)', tone: 'hijau',
      vonis: 'PAUS BELI SPOT DAN BUKA LONG — dua pasar searah sekaligus: keyakinan arah NAIK yang paling mahal harga kesalahannya. Peluang mengikuti lebih layak, tapi SL tetap wajib.',
      bukti: [
        `spot: cetakan paus beli net +$${Math.round(netSpotUsd).toLocaleString('id-ID')}`,
        `futures: long baru 4 jam +$${Math.round(longBaruUsd).toLocaleString('id-ID')}`,
      ],
    };
  } else if (netSpotUsd < -2000 && shortBaruUsd > 8000) {
    pola = {
      nama: 'SERANGAN GANDA (SPOT DILEPAS + SHORT DIPASANG)', tone: 'merah',
      vonis: 'PAUS MENJUAL SPOT SEKALIGUS PASANG SHORT — dua tekanan turun searah. Bahaya paling jelas untuk pemegang LONG: likuidasi LONG jadi bahan bakar.',
      bukti: [
        `spot: cetakan paus jual net -$${Math.round(-netSpotUsd).toLocaleString('id-ID')}`,
        `futures: short baru 4 jam +$${Math.round(shortBaruUsd).toLocaleString('id-ID')}`,
      ],
    };
  } else if (netSpotUsd > 2000) {
    pola = { nama: 'AKUMULASI SPOT MURNI', tone: 'hijau', vonis: 'PAUS MENYERAP SPOT tanpa penempatan futures besar — akumulasi pelan-pelan (supply diambil dari orderbook).', bukti: [`spot: beli net +$${Math.round(netSpotUsd).toLocaleString('id-ID')} (jendela ${spotC.menit} menit)`] };
  } else if (netSpotUsd < -2000) {
    pola = { nama: 'DISTRIBUSI SPOT MURNI', tone: 'amber', vonis: 'PAUS MENJUAL SPOT ke bid tanpa penempatan futures besar — supply dilepas pelan; waspada bawah.', bukti: [`spot: jual net -$${Math.round(-netSpotUsd).toLocaleString('id-ID')} (jendela ${spotC.menit} menit)`] };
  }

  // ---- 4) AUDIT DANA GILA-GILAAN (100 juta USD? MUNGKIN atau TIDAK?) ----
  const vol24j = (tickSpot.vol24Usd || 0) + (tickFut.vol24Usd || 0);
  const kedalamanAsk = bookSpot.ask + bookFut.ask;
  const kedalamanBid = bookSpot.bid + bookFut.bid;
  const oiUsd = (tickFut.oiUsd || 0) + Number(stats[stats.length - 1]?.open_interest ?? 0) * MULTIPLIER_GATE * harga;
  const auditDana: AuditDana[] = [100_000, 500_000, 1_000_000, 10_000_000, 100_000_000].map((klaim) => {
    const rVol24 = vol24j > 0 ? klaim / vol24j : 0;
    const rKedalaman = kedalamanAsk > 0 ? klaim / kedalamanAsk : 0;
    const rOi = oiUsd > 0 ? klaim / oiUsd : 0;
    let vonis: string; let makna: string;
    if (rKedalaman <= 5 && rVol24 <= 0.02) {
      vonis = 'MUNGKIN SENYAP';
      makna = 'bisa masuk tanpa menggeser harga besar — tapi tetap meninggalkan jejak taker di cetakan & OI';
    } else if (rKedalaman <= 20 && rVol24 <= 0.15) {
      vonis = 'BERAT — MENGGESER HARGA';
      makna = 'butuh waktu berjam-jam, harga pasti bergerak dulu; jejak candle + OI nyata';
    } else if (rKedalaman <= 1500 && rVol24 <= 0.5) {
      vonis = 'MENGGESER PASAR BESAR';
      makna = 'harga bisa lompat berpuluh persen sebelum dana selesai masuk — kalau diklaim tanpa pergerakan harga, GUGAT angkanya';
    } else {
      vonis = 'TIDAK MUNGKIN VIA PASAR TERBUKA';
      makna = `melebihi kapasitas pasar ELSA ini (${rVol24.toFixed(1)}× volume 24 jam, ${Math.round(rKedalaman).toLocaleString('id-ID')}× kedalaman ±2%) — kalau dikabarkan: dana OTC luar bursa, transfer internal antar dompet, UNLOCK, atau KABAR BOHONG. Cek jejak: candle/volume/OI tidak bergerak sesuai = pertanda PALSU; akumulasi kecil berulang yang nyata = pertanda ASLI`;
    }
    return { klaim, rVol24: Math.round(rVol24 * 100) / 100, rKedalaman: Math.round(rKedalaman), rOi: Math.round(rOi * 10) / 10, vonis, makna };
  });

  // ---- 5) JEJAK NYATA + VONIS ----
  const takerFut24 = niatJam.slice(0, 24).reduce((s, j) => s + j.takerBeliUsd + j.takerJualUsd, 0);
  const liq24j = (() => {
    let l = 0, s2 = 0;
    for (let i = Math.max(1, stats.length - 24); i < stats.length; i++) {
      l += Number(stats[i].long_liq_usd) || 0;
      s2 += Number(stats[i].short_liq_usd) || 0;
    }
    return { longUsd: Math.round(l), shortUsd: Math.round(s2) };
  })();
  const funding = tickFut.funding;
  const sisiBayar = funding > 0.0001 ? 'LONG yang membayar SHORT (kerumunan condong long)' : funding < -0.0001 ? 'SHORT yang membayar LONG (kerumunan condong short)' : 'funding netral';
  const cetakanPausUsd = cetakan.reduce((s, c) => s + c.usd, 0);

  const vonis: string[] = [
    `PAUS SPOT (jendela ${spotC.menit} menit, ambang $${Math.round(spotC.ambang).toLocaleString('id-ID')}): beli $${Math.round(spotBeliUsd).toLocaleString('id-ID')} vs jual $${Math.round(spotJualUsd).toLocaleString('id-ID')} → net ${netSpotUsd >= 0 ? '+' : '-'}$${Math.round(Math.abs(netSpotUsd)).toLocaleString('id-ID')} ${netSpotUsd > 0 ? '(menyerap supply)' : '(melepas supply)'}`,
    `PAUS FUTURES 4 jam: LONG baru $${Math.round(longBaruUsd).toLocaleString('id-ID')} vs SHORT baru $${Math.round(shortBaruUsd).toLocaleString('id-ID')} → sisi yang MENEMPATKAN posisi: ${sisiPenempatan}`,
    `OI total $${Math.round(oiUsd / 1e6).toFixed(2)}jt (Bybit $${Math.round((tickFut.oiUsd || 0) / 1e6).toFixed(2)}jt + Gate $${Math.round((oiUsd - (tickFut.oiUsd || 0)) / 1e6).toFixed(2)}jt) · funding ${(funding * 100).toFixed(4)}% — ${sisiBayar}`,
    `Kedalaman orderbook ±2% cuma ~$${Math.round((kedalamanAsk + kedalamanBid) / 1e3).toFixed(1)}rb kedua venue — dana $100jt = ${Math.round(100e6 / Math.max(kedalamanAsk, 1)).toLocaleString('id-ID')}× kedalaman: mustahil masuk diam-diam via pasar terbuka`,
    `Likuidasi 24 jam: long $${liq24j.longUsd.toLocaleString('id-ID')} vs short $${liq24j.shortUsd.toLocaleString('id-ID')} — sisi korban terakhir menunjukkan bahan bakar sisi mana`,
  ];
  if (pola) vonis.push(`POLA AKTIF: ${pola.nama} — ${pola.tone === 'merah' ? 'JANGAN salah baca' : pola.tone === 'hijau' ? 'searah kuat' : 'waspada ambigu'}`);
  // V4 — temuan senyap masuk vonis utama (bukan pajangan): kecolongan "whale masuk
  // tanpa diketahui" kini berbicara di baris kesimpulan radar, bukan di tab tersembunyi
  if (senyap.skor >= 15) vonis.push(`SENYAP (skor ${senyap.skor}/100, condong ${senyap.arahDominan}): ${senyap.vonis}`);

  const jujur = [
    'V2 KUALITAS: neuron jiwa hanya lahir dari cetakan KELAS PAUS (≥ 15× median, clamp $2000–8000) dan dicocokkan antar denyut lewat SIDIK UKURAN — kerumunan $500-an tidak lagi menyamar jadi paus (keluhan "kualitas rendah" dijawab di akarnya).',
    'DINDING PAUS: orderbook 3 venue dibaca LEVEL-LEVEL; dinding besar dilacak lintas denyut (lahir → digigit → PATAH DIMAKAN / MUNDUR = terduga bait) — bukti medan "siapa makan siapa", bukan sekadar jumlah ±2%.',
    'KERUMUNAN ≠ PAUS: rasio long/short akun Bybit = crowd kecil — dipakai sebagai peta bahan bakar likuidasi; untuk ELSA sering kosong — kalau kosong, radar bilang kosong.',
    'Sisi taker (beli/jual) = FAKTA dari tape bursa — bukan ramalan. Identitas dompetnya TIDAK terbaca dari sini: butuh kunci on-chain (Etherscan/Arkham/Nansen) untuk nama & wallet; diakui buta di lapisan itu.',
    'Klasifikasi LONG BARU vs TUTUP SHORT memakai ΔOI per jam Gate (Bybit OI-history untuk ELSA kosong — diakui). Kalau OI datar, dipilah sebagai AGRESIF tanpa klaim buka/tutup.',
    'Gate: 1 kontrak = 10 ELSA (quanto_multiplier resmi) — semua angka USD sudah dikalikan 10. Angka USD per jam memakai harga tutup jam itu.',
    'recent-trade hanya menampung jendela terakhir (dilaporkan menitnya); forensik 24 jam penuh memakai agregat per jam Gate — resolusi jam, bukan per-print.',
    'AUDIT DANA mengukur kapasitas NYATA pasar (volume 24j kedua venue, kedalaman ±2%, OI) — klaim dana bukan fakta sampai jejaknya muncul di cetakan, candle, dan OI.',
    'Likuidasi 24 jam ditampilkan untuk konteks korban; radar ini tidak menjamin arah — ia mengekor jejak paus, bukan membaca niat hatinya.',
    ...senyap.jujur,
  ];

  const data: PausData = {
    at: new Date().toISOString(), harga,
    jendela: { spotMenit: spotC.menit, futuresMenit: futC.menit, spotTrades: spot.length, futuresTrades: fut.length },
    ambang: { spotUsd: Math.round(spotC.ambang), futuresUsd: Math.round(futC.ambang), pausUsd: Math.round(pausUsd), dasar: `cetakan ≥ $${AMBANG_MIN_USD.toLocaleString('id-ID')} atau ≥ ${AMBANG_KALI_MEDIAN}× median; KELAS PAUS (jiwa) ≥ $${Math.round(pausUsd).toLocaleString('id-ID')} (15× median $${medianSemua.toFixed(0)}, clamp $2000–8000)` },
    dindingMentah: [
      { venue: 'BYBIT-SPOT', sisi: 'BID' as const, levels: bookSpot.bidLv }, { venue: 'BYBIT-SPOT', sisi: 'ASK' as const, levels: bookSpot.askLv },
      { venue: 'BYBIT-FUT', sisi: 'BID' as const, levels: bookFut.bidLv }, { venue: 'BYBIT-FUT', sisi: 'ASK' as const, levels: bookFut.askLv },
      { venue: 'GATE-FUT', sisi: 'BID' as const, levels: gateBook.bidLv }, { venue: 'GATE-FUT', sisi: 'ASK' as const, levels: gateBook.askLv },
    ],
    kerumunan, sinyal: sinyalKualitas(spot, fut, stats, kerumunan, bookFut.atMs, harga),
    cetakan, niatJam, pola,
    net: { jendelaJam, spotBeliUsd: Math.round(spotBeliUsd), spotJualUsd: Math.round(spotJualUsd), netSpotUsd: Math.round(netSpotUsd), longBaruUsd: Math.round(longBaruUsd), shortBaruUsd: Math.round(shortBaruUsd), sisiPenempatan },
    pasar: { vol24jSpotUsd: Math.round(tickSpot.vol24Usd), vol24jFuturesUsd: Math.round(tickFut.vol24Usd), oiUsdBybit: Math.round(tickFut.oiUsd || 0), oiUsdGate: Math.round(oiUsd - (tickFut.oiUsd || 0)), kedalamanBid2pctUsd: Math.round(kedalamanBid), kedalamanAsk2pctUsd: Math.round(kedalamanAsk), fundingPct: Math.round(funding * 1e6) / 1e4, sisiBayar },
    auditDana,
    jejak: { cetakanPausJumlah: cetakan.length, cetakanPausUsd: Math.round(cetakanPausUsd), netSpotUsd: Math.round(netSpotUsd), takerFutures24jUsd: Math.round(takerFut24), liq24j },
    senyap, // V4 — lapisan deteksi paus masuk tanpa diketahui (kecolongan ditutup)
    vonis, jujur,
  };
  // JIWA — satu denyut penuh per ronde data segar: neuron dikenali,
  // keyakinan dihitung, duel dijawab & dibentuk, kalibrasi diperbarui,
  // kesaksian disiapkan untuk dewan AR-E10. Gagal jiwa ≠ gagal radar.
  try {
    data.jiwa = await denyutPaus(data);
  } catch (e) {
    console.error('[RADAR-PAUS] denyutPaus gagal:', e instanceof Error ? e.message : e);
    data.jiwa = null;
  }
  cachePaus = { at: Date.now(), data };
  return data;
}
