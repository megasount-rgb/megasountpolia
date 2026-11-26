// ============================================================
// MICAPROFITA-ELSA · OTAK DOMPET — dompet simulasi $1000 nyata-rasa.
// Permintaan pemilik (2026-11-24):
//   "sistem kita anggap memiliki 1000$ Dan ikut melajukan all in dalam
//    keputusan ... gmn caranya agar 1000$ ini gak terasa kayak angin,
//    karena dipasar nyata justru 1000$ dipasar Elsa itu akan berdampak
//    juga ke market ... jikalau kelak habis maka akan ditambah 1000$ lagi
//    ... ini akan dijadikan catatan akuntasi juga agar kelak jadi
//    profesional Dan kita Tau dimana salahnya ... walau kita gak masuk
//    ke pasar nyata 1000$ ini tapi justru kita bisa merasaka dampak
//    nyata kalau 1000$ ini beneran ada"
// HUKUM HIDUP DOMPET (ditulis terbuka):
//  1. ALL-IN — tiap rencana arena yang terkunci (toko.aktif) dieksekusi
//     dompet dengan SELURUH saldo. Bukan persen, bukan model satuan.
//  2. BUKAN ANGIN — eksekusi diukur dari ORDERBOOK NYATA Bybit: order
//     $1000 berjalan menyapu level ask/bid satu per satu (VWAP), fee
//     taker 0.1% per sisi dihitung, slippage & dampak harga-sendiri
//     (order kita menggeser harga terbaik) diukur, bukan dikarang.
//     BUY menyapu orderbook SPOT; SHORT menyapu orderbook PERP linear
//     dan dikenai funding nyata Bybit saat tutup.
//  3. TOP-UP — saat dompet habis (saldo < $100 ketika hendak buka),
//     $1000 baru disetor otomatis dan dicatat SETORAN di buku akuntansi.
//  4. CATATAN AKUNTANSI — SETORAN/BUKA/TUTUP dicatat lengkap (harga,
//     qty, fee, slippage, dampak, pnl, saldo, ekuitas). Setiap tutup
//     rugi wajib menghasilkan ANALISIS KESALAHAN post-mortem — "kita
//     tau dimana salahnya".
// JUJUR: dana memang tidak benar-benar masuk pasar, tetapi SEMUA angka
// eksekusi (VWAP, slippage, dampak, fee, funding) diukur dari buku
// pesanan & peraturan pasar yang sebenarnya pada saat itu.
// ============================================================
import fs from 'fs';
import { SIMBOL, ticker24h } from './bybit';
import type { DompetJantungData } from './dompet-jantung';

const DIR_DB = process.env.ELSA_DB_DIR ?? '/home/z/my-project/db/elsa'; // env override khusus uji sandbox
const FILE_STATE = `${DIR_DB}/dompet.json`;
const FEE_TAKER = 0.001; // fee taker nyata Bybit spot/perp: 0.1% per sisi
const MODAL_AWAL = 1000; // USD
const AMBANG_TOPUP = 100; // saldo di bawah ini saat mau buka → setor ulang $1000
const BUKU_CAP = 400;
const KURVA_CAP = 600;
const SAMPEL_CAP = 40;
const ANALISIS_CAP = 20;

// ---------------- tipe ----------------
type Level = { harga: number; qty: number }; // qty dalam koin

export type DompetPosisi = {
  arah: 'LONG' | 'SHORT';
  venue: 'spot' | 'perp';
  entryVwap: number; // harga rata-rata eksekusi (after slippage)
  midMasuk: number; // harga tengah saat order datang
  qty: number; // koin
  notionalAwal: number; // USDT dikommit (all-in)
  feeMasuk: number;
  slippageMasukPct: number;
  dampakSendiriPct: number; // harga terbaik bergeser karena order kita sendiri
  levelTerpakai: number;
  waktuBuka: string;
  hari: string; // hari rencana arena
  hash: string; // hash ledger arena (prareg SHA-256)
  nomor: number; // nomor ledger arena
  target: number;
  stop: number;
  ambisius: number;
  keyakinan: number;
  rezim: string;
  komposit: number | null;
  serangan: string[]; // peringatan tim merah yang sudah diangkat saat buka
  buktiKunci: string[];
  adopsi: boolean; // true = rencana yang diadopsi saat dompet baru lahir
  asal: 'ARENA' | 'JANTUNG'; // JANTUNG = keputusan mandiri jantung dompet (dilarang ditutup hasil arena)
};

export type EntriBuku = {
  id: number;
  at: string;
  jenis: 'SETORAN' | 'BUKA' | 'TUTUP' | 'CATATAN' | 'RESET';
  arah?: 'LONG' | 'SHORT' | '—';
  harga?: number | null; // vwap eksekusi
  qty?: number | null;
  notional?: number | null;
  fee?: number | null;
  slippagePct?: number | null;
  dampakPct?: number | null;
  pnl?: number | null;
  netPct?: number | null;
  saldo: number;
  ekuitas: number;
  alasan: string;
  ref?: string;
};

export type UjiDampak = {
  at: string;
  venue: 'spot' | 'perp';
  sisi: 'beli' | 'jual';
  usd: number;
  mid: number;
  vwap: number;
  qty: number;
  slippagePct: number;
  dampakSendiriPct: number;
  levelTerpakai: number;
  levelTotal: number;
  kedalaman05Usd: number; // likuiditas dalam ±0.5% dari mid
  kedalaman1PctUsd: number; // ±1%
  turnover24jUsd: number | null;
  estimasiDeep: boolean; // sisa order menembus melewati buku tampil
  level: { harga: number; qty: number; usd: number; kumulatifUsd: number }[]; // yang tersapu
  ket: string;
};

type DompetToko = {
  saldo: number;
  posisi: DompetPosisi | null;
  totalSetoran: number;
  topupKe: number;
  buku: EntriBuku[];
  kurva: { at: string; ekuitas: number }[];
  sampelSlip: { sisi: 'beli' | 'jual'; pct: number; at: string }[];
  analisis: { at: string; hari: string; arah: string; pnl: number; netPct: number; rezim: string; diagnosis: string[]; ref?: string }[];
  ujiDampakTerakhir: { spot: UjiDampak; perp: UjiDampak } | null;
  idUrut: number;
  dibuat: string;
};

export type DompetData = {
  at: string;
  modalAwal: number;
  saldo: number;
  ekuitas: number;
  mark: number | null;
  totalSetoran: number;
  topupKe: number;
  pnlBersih: number; // ekuitas − total setoran
  pnlBersihPct: number;
  posisi: (DompetPosisi & {
    mark: number; uPnl: number; uPnlPct: number; nilaiPosisi: number;
    jarakTargetPct: number; jarakStopPct: number;
  }) | null;
  buku: EntriBuku[]; // terbaru dulu (panel)
  kurva: { at: string; ekuitas: number }[];
  analisis: DompetToko['analisis'];
  ujiDampak: { spot: UjiDampak; perp: UjiDampak } | null;
  jantung?: DompetJantungData | null; // JANTUNG DOMPET — denyut & keputusan modal hidup
  metrik: {
    nBuka: number; nTutup: number; menang: number; kalah: number;
    winRate: number | null; pnlTotal: number;
    slipMedianBeli: number | null; slipMedianJual: number | null;
    feeTotal: number; slipRataPct: number | null;
  };
  hukum: string[];
};

// ---------------- persistensi ----------------
function tulisToko(t: DompetToko) {
  try {
    fs.mkdirSync(DIR_DB, { recursive: true });
    fs.writeFileSync(FILE_STATE, JSON.stringify(t));
    domTulisAt = Date.now(); // tulisan proses ini = cache tetap sah
  } catch {
    /* abai */
  }
}

// Cache dompet lintas-MODULE-GRAPH: Next.js (Turbopack) mengompilasi
// instrumentation.ts dan route API dalam DUA graph terpisah — masing-masing
// punya salinan modul ini + cache `dom` sendiri. Dulu: graph jantung menahan
// cache basi (posisi=null) selagi graph API membuka posisi → beat jantung
// memasang “TAK ADA PEDANG” padahal pedang sudah terangkat, bahkan bisa
// dobel-buka. Kini toko() MEMBANDINGKAN mtime file vs waktu tulis cache —
// file yang lebih baru selalu menang: dua graph melihat dompet yang sama.
let dom: DompetToko | null = null;
let domTulisAt = 0;
function toko(): DompetToko {
  try {
    if (fs.existsSync(FILE_STATE)) {
      const mtime = fs.statSync(FILE_STATE).mtimeMs;
      if (dom && mtime <= domTulisAt) return dom; // cache masih segar
      const j = JSON.parse(fs.readFileSync(FILE_STATE, 'utf8')) as DompetToko;
      if (j && Array.isArray(j.buku)) {
        dom = j;
        domTulisAt = Date.now();
        return dom;
      }
    }
  } catch {
    /* file rusak/terbaca gagal — pakai cache proses ini */
  }
  if (dom) return dom;
  dom = {
    saldo: MODAL_AWAL,
    posisi: null,
    totalSetoran: MODAL_AWAL,
    topupKe: 1,
    buku: [],
    kurva: [],
    sampelSlip: [],
    analisis: [],
    ujiDampakTerakhir: null,
    idUrut: 0,
    dibuat: new Date().toISOString(),
  };
  catat(dom, 'SETORAN', 'MODAL AWAL dompet $1000 — dana tidak benar-benar masuk pasar, tapi seluruh eksekusi dihitung dari orderbook nyata (fee taker 0.1%, slippage & dampak diukur).', null, { notional: MODAL_AWAL });
  tulisToko(dom);
  return dom;
}

// ekuitas = saldo + nilai posisi mengambang (mark-to-market)
function ekuitas(t: DompetToko, mark: number | null): number {
  if (!t.posisi) return t.saldo;
  const p = t.posisi;
  if (!mark || !Number.isFinite(mark)) return t.saldo + p.notionalAwal;
  if (p.arah === 'LONG') return t.saldo + p.qty * mark;
  // SHORT 1x: margin terkunci + uPnL − fee masuk yang sudah keluar dari margin
  return t.saldo + p.notionalAwal + (p.entryVwap - mark) * p.qty - p.feeMasuk;
}

// catat ke buku akuntansi + kurva ekuitas (SELALU lewat sini)
function catat(
  t: DompetToko,
  jenis: EntriBuku['jenis'],
  alasan: string,
  mark: number | null,
  o: Partial<Omit<EntriBuku, 'id' | 'at' | 'jenis' | 'alasan' | 'saldo' | 'ekuitas'>> = {},
) {
  t.idUrut += 1;
  const e: EntriBuku = {
    id: t.idUrut,
    at: new Date().toISOString(),
    jenis,
    arah: t.posisi ? t.posisi.arah : '—',
    alasan,
    saldo: Math.round(t.saldo * 100) / 100,
    ekuitas: Math.round(ekuitas(t, mark) * 100) / 100,
    ...o,
  };
  t.buku.push(e);
  if (t.buku.length > BUKU_CAP) t.buku = t.buku.slice(-BUKU_CAP);
  t.kurva.push({ at: e.at, ekuitas: e.ekuitas });
  if (t.kurva.length > KURVA_CAP) t.kurva = t.kurva.slice(-KURVA_CAP);
}

// ---------------- orderbook nyata Bybit ----------------
type Buku = { asks: Level[]; bids: Level[]; at: number };
const memBuku = new Map<string, Buku>();
async function ambilOrderbook(venue: 'spot' | 'perp'): Promise<Buku> {
  const hit = memBuku.get(venue);
  if (hit && Date.now() - hit.at < 20_000) return hit;
  const url =
    venue === 'spot'
      ? `https://api.bybit.com/v5/market/orderbook?category=spot&symbol=${SIMBOL}&limit=200`
      : `https://api.bybit.com/v5/market/orderbook?category=linear&symbol=${SIMBOL}&limit=200`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`orderbook ${venue} ${res.status}`);
  const j = (await res.json()) as { retCode: number; retMsg?: string; result?: { b?: string[][]; a?: string[][] } };
  if (j.retCode !== 0) throw new Error(`orderbook retCode ${j.retCode}: ${j.retMsg ?? ''}`);
  const asks: Level[] = (j.result?.a ?? []).map((r) => ({ harga: Number(r[0]), qty: Number(r[1]) })).sort((x, y) => x.harga - y.harga);
  const bids: Level[] = (j.result?.b ?? []).map((r) => ({ harga: Number(r[0]), qty: Number(r[1]) })).sort((x, y) => y.harga - x.harga);
  if (!asks.length || !bids.length) throw new Error(`orderbook ${venue} kosong`);
  const buku = { asks, bids, at: Date.now() };
  memBuku.set(venue, buku);
  return buku;
}

let memTicker: { at: number; last: number; turnover: number } | null = null;
async function hargaKini(): Promise<{ last: number; turnover: number } | null> {
  if (memTicker && Date.now() - memTicker.at < 30_000) return { last: memTicker.last, turnover: memTicker.turnover };
  const t = await ticker24h(SIMBOL);
  if (!t) return null;
  memTicker = { at: Date.now(), last: t.lastPrice, turnover: t.turnover24h };
  return { last: t.lastPrice, turnover: t.turnover24h };
}

// ---------------- mesin sapu buku (market impact) ----------------
// Order $1000 TIDAK diisi di satu harga — ia menyapu level demi level.
// Inilah yang membuat $1000 terasa nyata: slippage & dampak harga-sendiri
// keluar dari geometri likuiditas, bukan dari angka karangan.
// slippagePct bertanda relatif mid: beli → positif (mahal), jual → negatif.
function jalanUsd(levels: Level[], usd: number, mid: number): {
  qty: number; vwap: number; slippagePct: number; dampakSendiriPct: number; levelTerpakai: number; estimasiDeep: boolean;
} {
  let sisa = usd;
  let qtyTotal = 0;
  let usdTotal = 0;
  let hargaTerakhir = levels[0].harga;
  let levelTerpakai = 0;
  for (const lv of levels) {
    if (sisa <= 0.000001) break;
    const notional = lv.harga * lv.qty;
    const ambilUsd = Math.min(notional, sisa);
    qtyTotal += ambilUsd / lv.harga;
    usdTotal += ambilUsd;
    sisa -= ambilUsd;
    hargaTerakhir = lv.harga;
    levelTerpakai += 1;
  }
  let estimasiDeep = false;
  if (sisa > 0.000001) {
    // buku tampil habis — sisa diasumsikan menembus level lebih dalam:
    // 0.1% harga ekstra per $100 sisa, cap 5% (estimasi jujur, ditandai)
    estimasiDeep = true;
    const ekstra = Math.min(0.05, 0.001 * (sisa / 100));
    hargaTerakhir = hargaTerakhir * (1 + ekstra);
    qtyTotal += sisa / hargaTerakhir;
    usdTotal += sisa;
  }
  const vwap = usdTotal / Math.max(qtyTotal, 1e-12);
  const slippagePct = ((vwap - mid) / mid) * 100;
  // dampak sendiri: harga terbaik SETELAH order kita = level terakhir yang tersentuh
  const dampakSendiriPct = (Math.abs(hargaTerakhir - mid) / mid) * 100;
  return { qty: qtyTotal, vwap, slippagePct, dampakSendiriPct, levelTerpakai, estimasiDeep };
}

function jalanQty(levels: Level[], qtyTarget: number, mid: number): {
  usd: number; vwap: number; slippagePct: number; dampakSendiriPct: number; levelTerpakai: number; estimasiDeep: boolean;
} {
  let sisaQty = qtyTarget;
  let usdTotal = 0;
  let hargaTerakhir = levels[0].harga;
  let levelTerpakai = 0;
  for (const lv of levels) {
    if (sisaQty <= 0.0000001) break;
    const q = Math.min(lv.qty, sisaQty);
    usdTotal += q * lv.harga;
    sisaQty -= q;
    hargaTerakhir = lv.harga;
    levelTerpakai += 1;
  }
  let estimasiDeep = false;
  if (sisaQty > 0.0000001) {
    estimasiDeep = true;
    const ekstra = Math.min(0.05, 0.001 * ((sisaQty * hargaTerakhir) / 100));
    hargaTerakhir = hargaTerakhir * (1 + ekstra);
    usdTotal += sisaQty * hargaTerakhir;
    sisaQty = 0;
  }
  const vwap = usdTotal / Math.max(qtyTarget, 1e-12);
  const slippagePct = ((vwap - mid) / mid) * 100;
  const dampakSendiriPct = (Math.abs(hargaTerakhir - mid) / mid) * 100;
  return { usd: usdTotal, vwap, slippagePct, dampakSendiriPct, levelTerpakai, estimasiDeep };
}

function kedalaman(levels: Level[], mid: number, band: number): number {
  return levels
    .filter((l) => Math.abs(l.harga - mid) / mid <= band)
    .reduce((s, l) => s + l.harga * l.qty, 0);
}

function sampelSlip(t: DompetToko, sisi: 'beli' | 'jual', pctAbs: number) {
  t.sampelSlip.push({ sisi, pct: Math.round(pctAbs * 10000) / 10000, at: new Date().toISOString() });
  if (t.sampelSlip.length > SAMPEL_CAP) t.sampelSlip = t.sampelSlip.slice(-SAMPEL_CAP);
}
function medianSlip(t: DompetToko, sisi: 'beli' | 'jual'): number | null {
  const arr = t.sampelSlip.filter((s) => s.sisi === sisi).map((s) => s.pct).sort((a, b) => a - b);
  if (!arr.length) return null;
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}

// ---------------- uji dampak (tanpa menyentuh saldo) ----------------
export async function dompetUjiDampak(usd = MODAL_AWAL): Promise<{ spot: UjiDampak; perp: UjiDampak }> {
  const tk = toko();
  const hargaInfo = await hargaKini().catch(() => null);
  const hasil: { spot: UjiDampak; perp: UjiDampak } = {} as { spot: UjiDampak; perp: UjiDampak };
  for (const venue of ['spot', 'perp'] as const) {
    const buku = await ambilOrderbook(venue);
    const mid = (buku.asks[0].harga + buku.bids[0].harga) / 2;
    const j = jalanUsd(buku.asks, usd, mid);
    let kum = 0;
    const levelTampil = buku.asks.slice(0, j.levelTerpakai).map((l) => {
      const u = l.harga * l.qty;
      kum += u;
      return { harga: l.harga, qty: Math.round(l.qty * 100) / 100, usd: Math.round(u * 100) / 100, kumulatifUsd: Math.round(kum * 100) / 100 };
    });
    const ket =
      `Order ${usd} USD beli menyapu ${j.levelTerpakai}/${buku.asks.length} level ask ${venue.toUpperCase()} — ` +
      `VWAP ${j.vwap.toPrecision(6)} vs mid ${mid.toPrecision(6)} (slippage ${Math.abs(j.slippagePct).toFixed(3)}%), ` +
      `harga terbaik terdorong +${j.dampakSendiriPct.toFixed(3)}% oleh order sendiri` +
      (j.estimasiDeep ? ' — buku tampil HABIS, sisanya diestimasi menembus lebih dalam' : '') +
      `. Likuiditas ±0.5%: ${(kedalaman(buku.asks, mid, 0.005) / 1e3).toFixed(1)} rb USD, ±1%: ${(kedalaman(buku.asks, mid, 0.01) / 1e3).toFixed(1)} rb USD` +
      (hargaInfo ? ` · turnover 24j ${(hargaInfo.turnover / 1e6).toFixed(1)} jt USD — order ${usd} USD = ${((usd / hargaInfo.turnover) * 100).toFixed(3)}% dari volume harian` : '') +
      `. INI yang akan dialami $1000 beneran kalau masuk sekarang.`;
    hasil[venue] = {
      at: new Date().toISOString(),
      venue,
      sisi: 'beli',
      usd,
      mid: Math.round(mid * 1e7) / 1e7,
      vwap: Math.round(j.vwap * 1e7) / 1e7,
      qty: Math.round(j.qty * 100) / 100,
      slippagePct: Math.round(j.slippagePct * 10000) / 10000,
      dampakSendiriPct: Math.round(j.dampakSendiriPct * 10000) / 10000,
      levelTerpakai: j.levelTerpakai,
      levelTotal: buku.asks.length,
      kedalaman05Usd: Math.round(kedalaman(buku.asks, mid, 0.005)),
      kedalaman1PctUsd: Math.round(kedalaman(buku.asks, mid, 0.01)),
      turnover24jUsd: hargaInfo ? Math.round(hargaInfo.turnover) : null,
      estimasiDeep: j.estimasiDeep,
      level: levelTampil,
      ket,
    };
  }
  tk.ujiDampakTerakhir = hasil;
  tulisToko(tk);
  return hasil;
}

// ---------------- top-up ----------------
function topUp(t: DompetToko, mark: number | null, alasan: string) {
  t.saldo += MODAL_AWAL;
  t.totalSetoran += MODAL_AWAL;
  t.topupKe += 1;
  catat(t, 'SETORAN', alasan, mark, { notional: MODAL_AWAL });
}

// ---------------- BUKA posisi (all-in) ----------------
export async function dompetBuka(a: {
  hari: string;
  arah: 'BUY' | 'SELL';
  entry: number;
  target: number;
  stop: number;
  ambisius: number;
  keyakinan: number;
  rezim: string;
  komposit: number | null;
  serangan: string[];
  buktiKunci: string[];
  hash: string;
  nomor: number;
  adopsi?: boolean;
  asal?: 'ARENA' | 'JANTUNG'; // JANTUNG = keputusan mandiri jantung dompet (label buku jujur)
  label?: string; // teks alasan khusus utk asal JANTUNG
}): Promise<void> {
  const t = toko();
  const markInfo = await hargaKini().catch(() => null);
  const mark = markInfo?.last ?? null;
  // dedupe: satu rencana arena hanya boleh dieksekusi sekali
  if (t.buku.some((b) => b.jenis === 'BUKA' && b.ref?.includes(a.hash.slice(0, 12)))) return;
  const jantung = a.asal === 'JANTUNG';
  const refHash = jantung ? `jantung#K ${a.hash.slice(0, 12)}` : `arena#${a.nomor} ${a.hash.slice(0, 12)}`;
  const labelTeks = jantung && a.label ? a.label : `Rencana arena #${a.nomor} ${a.arah} keyakinan ${a.keyakinan}% rezim ${a.rezim}`;
  if (t.posisi) {
    catat(t, 'CATATAN', `Rencana baru ${a.arah} (ledger #${a.nomor}) terkunci tapi dompet masih memegang posisi ${t.posisi.arah} — HUKUM anti-dobel: satu dompet satu posisi; rencana baru tidak dieksekusi dompet.`, mark, { ref: refHash });
    tulisToko(t);
    return;
  }
  while (t.saldo < AMBANG_TOPUP) {
    topUp(t, mark, `DOMPET HABIS saat hendak all-in ${a.arah} — setor ulang $1000 otomatis (top-up ke-${t.topupKe}); hukum pemilik: "jikalau kelak habis maka akan ditambah 1000$ lagi"`);
  }
  const venue = a.arah === 'BUY' ? 'spot' : 'perp';
  const buku = await ambilOrderbook(venue);
  const mid = (buku.asks[0].harga + buku.bids[0].harga) / 2;
  const adopsiTeks = a.adopsi ? ' · ADOPSI TERLAMBAT: dieksekusi sekarang di buku hidup, bukan saat rencana dikunci' : '';
  if (a.arah === 'BUY') {
    // LONG spot: seluruh saldo dipakai termasuk cadangan fee taker 0.1%
    const budget = t.saldo / (1 + FEE_TAKER);
    const j = jalanUsd(buku.asks, budget, mid);
    const fee = budget * FEE_TAKER;
    const posisi: DompetPosisi = {
      arah: 'LONG', venue,
      entryVwap: Math.round(j.vwap * 1e7) / 1e7,
      midMasuk: Math.round(mid * 1e7) / 1e7,
      qty: Math.round(j.qty * 100) / 100,
      notionalAwal: Math.round(t.saldo * 100) / 100,
      feeMasuk: Math.round(fee * 100) / 100,
      slippageMasukPct: Math.round(j.slippagePct * 10000) / 10000,
      dampakSendiriPct: Math.round(j.dampakSendiriPct * 10000) / 10000,
      levelTerpakai: j.levelTerpakai,
      waktuBuka: new Date().toISOString(),
      hari: a.hari, hash: a.hash, nomor: a.nomor,
      target: a.target, stop: a.stop, ambisius: a.ambisius,
      keyakinan: a.keyakinan, rezim: a.rezim, komposit: a.komposit,
      serangan: a.serangan, buktiKunci: a.buktiKunci,
      adopsi: !!a.adopsi,
      asal: jantung ? 'JANTUNG' : 'ARENA',
    };
    t.saldo = 0;
    t.posisi = posisi;
    sampelSlip(t, 'beli', Math.abs(j.slippagePct));
    catat(t, 'BUKA', `ALL-IN BUY → LONG ${venue.toUpperCase()}: $${posisi.notionalAwal} menyapu ${j.levelTerpakai} level ask — VWAP ${posisi.entryVwap.toPrecision(6)} (slippage ${posisi.slippageMasukPct.toFixed(3)}%, dampak sendiri +${posisi.dampakSendiriPct.toFixed(3)}%, fee $${posisi.feeMasuk.toFixed(2)}). qty ${posisi.qty} ELSA. ${labelTeks} · target ${a.target.toPrecision(6)} / stop ${a.stop.toPrecision(6)}${adopsiTeks}${j.estimasiDeep ? ' · buku tampil habis, sisanya estimasi menembus lebih dalam' : ''}. "1000$ ini gak terasa kayak angin": tiap dolar mengalami geometri likuiditas yang sama.`, mark, {
      arah: 'LONG', harga: posisi.entryVwap, qty: posisi.qty, notional: posisi.notionalAwal,
      fee: posisi.feeMasuk, slippagePct: posisi.slippageMasukPct, dampakPct: posisi.dampakSendiriPct, ref: refHash,
    });
  } else {
    // SHORT perp linear 1x: margin = seluruh saldo, notional = saldo — jual menyapu bid
    const j = jalanUsd(buku.bids, t.saldo, mid);
    const fee = t.saldo * FEE_TAKER;
    const posisi: DompetPosisi = {
      arah: 'SHORT', venue,
      entryVwap: Math.round(j.vwap * 1e7) / 1e7,
      midMasuk: Math.round(mid * 1e7) / 1e7,
      qty: Math.round(j.qty * 100) / 100,
      notionalAwal: Math.round(t.saldo * 100) / 100,
      feeMasuk: Math.round(fee * 100) / 100,
      slippageMasukPct: Math.round(j.slippagePct * 10000) / 10000,
      dampakSendiriPct: Math.round(j.dampakSendiriPct * 10000) / 10000,
      levelTerpakai: j.levelTerpakai,
      waktuBuka: new Date().toISOString(),
      hari: a.hari, hash: a.hash, nomor: a.nomor,
      target: a.target, stop: a.stop, ambisius: a.ambisius,
      keyakinan: a.keyakinan, rezim: a.rezim, komposit: a.komposit,
      serangan: a.serangan, buktiKunci: a.buktiKunci,
      adopsi: !!a.adopsi,
      asal: jantung ? 'JANTUNG' : 'ARENA',
    };
    t.saldo = 0; // margin terkunci di posisi
    t.posisi = posisi;
    sampelSlip(t, 'jual', Math.abs(j.slippagePct));
    catat(t, 'BUKA', `ALL-IN SELL → SHORT ${venue.toUpperCase()} 1x: margin $${posisi.notionalAwal} — menjual menyapu ${j.levelTerpakai} level bid — VWAP ${posisi.entryVwap.toPrecision(6)} (slippage ${posisi.slippageMasukPct.toFixed(3)}%, dampak sendiri −${posisi.dampakSendiriPct.toFixed(3)}%, fee $${posisi.feeMasuk.toFixed(2)}). qty ${posisi.qty} ELSA. Funding nyata dikenai saat tutup. ${labelTeks} · target ${a.target.toPrecision(6)} / stop ${a.stop.toPrecision(6)}${adopsiTeks}${j.estimasiDeep ? ' · buku tampil habis, sisanya estimasi menembus lebih dalam' : ''}.`, mark, {
      arah: 'SHORT', harga: posisi.entryVwap, qty: posisi.qty, notional: posisi.notionalAwal,
      fee: posisi.feeMasuk, slippagePct: posisi.slippageMasukPct, dampakPct: -posisi.dampakSendiriPct, ref: refHash,
    });
  }
  tulisToko(t);
}

// ---------------- TUTUP posisi ----------------
export async function dompetTutup(a: {
  hari: string;
  arahArena?: 'BUY' | 'SELL';
  hasilLabel: 'MENANG' | 'KALAH' | 'KEDALUWARSA' | 'BATAL';
  via: string;
  keluarRef: number; // harga keluar model arena (target/stop/tutup)
  netModel?: number; // netPct versi arena (model satuan) untuk perbandingan jujur
  hash?: string;
  segar?: boolean; // true = tutup baru terjadi (boleh ukur buku hidup)
  paksa?: boolean;
  dariJantung?: boolean; // true = penutupnya jantung dompet sendiri (TP/SL 60 dtk)
}): Promise<void> {
  const t = toko();
  const p = t.posisi;
  const markInfo = await hargaKini().catch(() => null);
  const mark = markInfo?.last ?? null;
  if (!p) {
    catat(t, 'CATATAN', `Perintah tutup dompet diterima (${a.hasilLabel} hari ${a.hari}, via ${a.via}) tapi dompet kosong — tidak ada posisi yang mengambang; tidak ada uang yang hilang di sini.`, mark);
    tulisToko(t);
    return;
  }
  const buku = await ambilOrderbook(p.venue);
  const mid = (buku.asks[0].harga + buku.bids[0].harga) / 2;
  // HUKUM KEPEMILIKAN POSISI — hasil arena dilarang menutup posisi milik
  // JANTUNG DOMPET (lahir dari sinyal jantung sendiri, TP/SL-nya dijaga jantung
  // ≤60 dtk): dulu posisi jantung tercoreng “REPAIR ORPHAN” 1 detik setelah
  // dibuka — kecolongan silang antar mesin; kini tiap mesin menutup miliknya.
  if (p.asal === 'JANTUNG' && !a.dariJantung && !a.paksa) {
    catat(t, 'CATATAN', `Hasil arena (${a.hasilLabel} hari ${a.hari} via ${a.via.slice(0, 80)}) DITOLAK menutup posisi JANTUNG DOMPET ${p.arah} — posisi itu lahir dari sinyal jantung sendiri (TP ${p.target.toPrecision(6)} / SL ${p.stop.toPrecision(6)} dijaga ≤60 dtk); dilarang menutup dengan hasil arena yang bukan miliknya.`, mark, { ref: 'jantung#K' });
    tulisToko(t);
    return;
  }
  // UKUR-LANGSUNG bila tutup segar (<15 menit) atau paksa/batal (terjadi sekarang);
  // kalau tutup historis → ESTIMASI-SAMPEL dari median slippage terukur, jujur dilabeli.
  const hidup = !!a.segar || !!a.paksa || a.hasilLabel === 'BATAL';
  let exitVwap: number;
  let feeKeluar: number;
  let slipKeluarPct: number;
  let dampakKeluarPct: number;
  let levelTerpakai: number;
  let sumber: string;
  if (p.arah === 'LONG') {
    if (hidup) {
      const j = jalanQty(buku.bids, p.qty, mid); // menjual → menyapu bid
      exitVwap = j.vwap;
      feeKeluar = j.usd * FEE_TAKER;
      slipKeluarPct = j.slippagePct;
      dampakKeluarPct = j.dampakSendiriPct;
      levelTerpakai = j.levelTerpakai;
      sumber = 'UKUR-LANGSUNG buku hidup sekarang';
      sampelSlip(t, 'jual', Math.abs(j.slippagePct));
    } else {
      const slip = medianSlip(t, 'jual') ?? 0.08;
      exitVwap = a.keluarRef * (1 - slip / 100);
      feeKeluar = p.qty * exitVwap * FEE_TAKER;
      slipKeluarPct = -slip;
      dampakKeluarPct = 0;
      levelTerpakai = 0;
      sumber = `ESTIMASI-SAMPEL (median slippage jual terukur ${(slip * 100).toFixed(3)}%) — eksekusi historis tak dapat diukur ulang`;
    }
    const proceeds = p.qty * exitVwap;
    const saldoMasuk = t.saldo + proceeds - feeKeluar;
    const pnl = saldoMasuk - p.notionalAwal;
    const netPct = (pnl / p.notionalAwal) * 100;
    t.saldo = Math.round(saldoMasuk * 100) / 100;
    const netModelTxt = a.netModel !== undefined ? ` vs model arena ${a.netModel >= 0 ? '+' : ''}${a.netModel}% (selisih eksekusi ${Math.round((netPct - a.netModel) * 100) / 100} poin)` : '';
    catat(t, 'TUTUP', `TUTUP LONG ${p.venue.toUpperCase()} ${a.hasilLabel} hari ${a.hari} — ${a.via}. ${sumber}: keluar VWAP ${exitVwap.toPrecision(6)} (slippage ${slipKeluarPct.toFixed(3)}%, ${levelTerpakai} level bid, fee keluar $${feeKeluar.toFixed(2)}). pnl $${pnl.toFixed(2)} = ${netPct.toFixed(2)}%${netModelTxt}. Saldo kembali ke $${t.saldo}.`, mark, {
      arah: 'LONG', harga: Math.round(exitVwap * 1e7) / 1e7, qty: p.qty, notional: Math.round(proceeds * 100) / 100,
      fee: Math.round(feeKeluar * 100) / 100, slippagePct: Math.round(slipKeluarPct * 10000) / 10000, dampakPct: Math.round(dampakKeluarPct * 10000) / 10000,
      pnl: Math.round(pnl * 100) / 100, netPct: Math.round(netPct * 100) / 100,
      ref: `arena#${p.nomor} ${p.hash.slice(0, 12)}`,
    });
    if (pnl < 0) analisisRugi(t, p, a.via, pnl, netPct, a.hari, mark);
    t.posisi = null;
  } else {
    // SHORT: beli-balik menyapu ask
    if (hidup) {
      const j = jalanQty(buku.asks, p.qty, mid);
      exitVwap = j.vwap;
      feeKeluar = j.usd * FEE_TAKER;
      slipKeluarPct = j.slippagePct;
      dampakKeluarPct = j.dampakSendiriPct;
      levelTerpakai = j.levelTerpakai;
      sumber = 'UKUR-LANGSUNG buku hidup sekarang';
      sampelSlip(t, 'beli', Math.abs(j.slippagePct));
    } else {
      const slip = medianSlip(t, 'beli') ?? 0.08;
      exitVwap = a.keluarRef * (1 + slip / 100);
      feeKeluar = p.qty * exitVwap * FEE_TAKER;
      slipKeluarPct = slip;
      dampakKeluarPct = 0;
      levelTerpakai = 0;
      sumber = `ESTIMASI-SAMPEL (median slippage beli terukur ${(slip * 100).toFixed(3)}%) — eksekusi historis tak dapat diukur ulang`;
    }
    // funding nyata Bybit perp selama posisi hidup (rate>0 → short MENERIMA)
    let funding = 0;
    let fundingTxt = 'funding tak terbaca (diakui jujur)';
    try {
      const res = await fetch(`https://api.bybit.com/v5/market/funding/history?category=linear&symbol=${SIMBOL}&limit=200`, { cache: 'no-store' });
      if (res.ok) {
        const j = (await res.json()) as { retCode: number; result?: { list?: { fundingRate: string; fundingTime: string }[] } };
        const dari = Date.parse(p.waktuBuka);
        const list = (j.result?.list ?? []).filter((r) => Number(r.fundingTime) > dari);
        funding = list.reduce((s, r) => s + Number(r.fundingRate), 0) * p.notionalAwal;
        fundingTxt = `funding ${list.length} periode × rate = ${funding >= 0 ? '+' : ''}$${funding.toFixed(2)} ${funding >= 0 ? '(short menerima)' : '(short membayar)'}`;
      }
    } catch {
      /* funding diakui tak terbaca */
    }
    const uPnl = (p.entryVwap - exitVwap) * p.qty;
    const pnl = uPnl - p.feeMasuk - feeKeluar + funding;
    const saldoMasuk = t.saldo + p.notionalAwal + pnl;
    const netPct = (pnl / p.notionalAwal) * 100;
    t.saldo = Math.round(saldoMasuk * 100) / 100;
    const netModelTxt = a.netModel !== undefined ? ` vs model arena ${a.netModel >= 0 ? '+' : ''}${a.netModel}% (selisih eksekusi ${Math.round((netPct - a.netModel) * 100) / 100} poin)` : '';
    catat(t, 'TUTUP', `TUTUP SHORT ${p.venue.toUpperCase()} ${a.hasilLabel} hari ${a.hari} — ${a.via}. ${sumber}: beli-balik VWAP ${exitVwap.toPrecision(6)} (slippage ${slipKeluarPct.toFixed(3)}%, ${levelTerpakai} level ask, fee keluar $${feeKeluar.toFixed(2)}). ${fundingTxt}. pnl $${pnl.toFixed(2)} = ${netPct.toFixed(2)}%${netModelTxt}. Margin kembali — saldo $${t.saldo}.`, mark, {
      arah: 'SHORT', harga: Math.round(exitVwap * 1e7) / 1e7, qty: p.qty, notional: Math.round(p.qty * exitVwap * 100) / 100,
      fee: Math.round((p.feeMasuk + feeKeluar) * 100) / 100, slippagePct: Math.round(slipKeluarPct * 10000) / 10000, dampakPct: Math.round(dampakKeluarPct * 10000) / 10000,
      pnl: Math.round(pnl * 100) / 100, netPct: Math.round(netPct * 100) / 100,
      ref: `arena#${p.nomor} ${p.hash.slice(0, 12)}`,
    });
    if (pnl < 0) analisisRugi(t, p, a.via, pnl, netPct, a.hari, mark);
    t.posisi = null;
  }
  tulisToko(t);
}

// ---------------- ANALISIS KESALAHAN (post-mortem) ----------------
// "agar kelak jadi profesional dan kita tau dimana salahnya"
function analisisRugi(t: DompetToko, p: DompetPosisi, via: string, pnl: number, netPct: number, hari: string, mark: number | null) {
  const d: string[] = [];
  d.push(`Arah ${p.arah} dibuka di rezim ${p.rezim} dengan keyakinan ${p.keyakinan}% — hasil ${netPct.toFixed(2)}% ($${pnl.toFixed(2)}), keluar via: ${via}.`);
  if (p.komposit !== null) {
    d.push(p.komposit >= 0.45
      ? `Komposit saat buka ${p.komposit.toFixed(2)} ≥ standar 0.45 — sinyal teknis memang di atas ambang: yang mungkin salah BOBOT faktornya, bukan ambangnya.`
      : `Komposit saat buka ${p.komposit.toFixed(2)} < standar 0.45 — rencana ini seharusnya tertahan guard; kerahian guard perlu diaudit.`);
  }
  if (p.serangan.length) {
    d.push(`PERINGATAN YANG SUDAH DIANGKAT TAPI TETAP DIBUKA: ${p.serangan.join(' | ')}`);
  } else {
    d.push('Tidak ada serangan tim merah yang diangkat saat buka — tidak ada yang menolong: faktor dominan saat itu perlu ditinjau ulang.');
  }
  const stopJarak = Math.abs((p.entryVwap - p.stop) / p.entryVwap) * 100;
  const biayaTetap = Math.abs(p.slippageMasukPct) + 0.2;
  d.push(`Jarak stop ${stopJarak.toFixed(2)}% vs biaya masuk+keluar (slippage ${p.slippageMasukPct.toFixed(3)}% + fee 0.2% RT ≈ ${biayaTetap.toFixed(2)}%) — edge kotor harus menang biaya dulu di medan ${p.venue}.`);
  if (p.adopsi) d.push('Posisi ini ADOPSI TERLAMBAT — eksekusi tidak terjadi saat rencana dikunci; harga masuk menyimpang dari asumsi rencana. Pembelajaran: dompet harus hidup sebelum rencana terkunci.');
  t.analisis.unshift({ at: new Date().toISOString(), hari, arah: p.arah, pnl: Math.round(pnl * 100) / 100, netPct: Math.round(netPct * 100) / 100, rezim: p.rezim, diagnosis: d, ref: `arena#${p.nomor} ${p.hash.slice(0, 12)}` });
  if (t.analisis.length > ANALISIS_CAP) t.analisis = t.analisis.slice(0, ANALISIS_CAP);
  catat(t, 'CATATAN', `ANALISIS KESALAHAN ditulis (pnl $${pnl.toFixed(2)}): ${d[0]}`, mark, { ref: `arena#${p.nomor}` });
}

// ---------------- paksa tutup di harga hidup (kendali pemilik) ----------------
export async function dompetTutupPaksa(): Promise<void> {
  const t = toko();
  if (!t.posisi) {
    const markInfo = await hargaKini().catch(() => null);
    catat(t, 'CATATAN', 'Tutup paksa diminta tapi tidak ada posisi.', markInfo?.last ?? null);
    tulisToko(t);
    return;
  }
  const keluar = (await hargaKini().catch(() => null))?.last ?? t.posisi.entryVwap;
  await dompetTutup({
    hari: t.posisi.hari,
    hasilLabel: 'BATAL',
    via: 'TUTUP PAKSA oleh pemilik — keluar sekarang di harga hidup (buku nyata diukur langsung)',
    keluarRef: keluar,
    paksa: true,
  });
}

// ---------------- reset (mulai dompet baru $1000) ----------------
export async function dompetReset(): Promise<void> {
  const t = toko();
  const markInfo = await hargaKini().catch(() => null);
  const mark = markInfo?.last ?? null;
  if (t.posisi) await dompetTutupPaksa();
  const tBaru: DompetToko = {
    saldo: MODAL_AWAL,
    posisi: null,
    totalSetoran: MODAL_AWAL,
    topupKe: 1,
    buku: [],
    kurva: [],
    sampelSlip: t.sampelSlip,
    analisis: t.analisis,
    ujiDampakTerakhir: t.ujiDampakTerakhir,
    idUrut: 0,
    dibuat: new Date().toISOString(),
  };
  dom = tBaru;
  catat(tBaru, 'RESET', 'Dompet DIRESET pemilik — buku akuntansi lama dibuang mulai dari sini; analisis kesalahan & sampel slippage dipertahankan (pengetahuan pasar tidak boleh ikut terbuang).', mark);
  catat(tBaru, 'SETORAN', 'MODAL BARU $1000 — dompet segar siap all-in pada rencana terkunci berikutnya.', mark, { notional: MODAL_AWAL });
  tulisToko(tBaru);
}

// ---------------- ADOPSI rencana lama (dompet lahir saat rencana sudah terkunci) ----------------
async function adopsiRencanaAktif(): Promise<void> {
  try {
    const tokoArena = JSON.parse(fs.readFileSync(`${DIR_DB}/toko.json`, 'utf8')) as {
      aktif: {
        hari: string; hash: string;
        rencana: { entry: number; target: number; stop: number; highAmbisius: number };
        arah: 'BUY' | 'SELL'; keyakinan: number; rezim: string;
        kunci: { nomor: number; dasar: string };
      } | null;
    };
    const aktif = tokoArena.aktif;
    if (!aktif || aktif.hari !== new Date().toISOString().slice(0, 10)) return; // hanya adopsi rencana hari ini
    const t = toko();
    if (t.posisi) return;
    if (t.buku.some((b) => b.jenis === 'BUKA' && b.ref?.includes(aktif.hash.slice(0, 12)))) return;
    const komposit = Number(aktif.kunci.dasar.match(/komposit ([\d.]+)/)?.[1] ?? 0) || null;
    await dompetBuka({
      hari: aktif.hari, arah: aktif.arah,
      entry: aktif.rencana.entry, target: aktif.rencana.target, stop: aktif.rencana.stop, ambisius: aktif.rencana.highAmbisius,
      keyakinan: aktif.keyakinan, rezim: aktif.rezim, komposit,
      serangan: [], buktiKunci: [],
      hash: aktif.hash, nomor: aktif.kunci.nomor,
      adopsi: true,
    });
  } catch {
    /* arena belum punya aktif — biarkan dompet menunggu */
  }
}

// ---------------- payload panel ----------------
export async function getDompetPayload(): Promise<DompetData> {
  const t = toko();
  const markInfo = await hargaKini().catch(() => null);
  const mark = markInfo?.last ?? null;
  await adopsiRencanaAktif();
  const tk = toko();
  const ek = ekuitas(tk, mark);
  let posisiTampil: DompetData['posisi'] = null;
  if (tk.posisi) {
    const p = tk.posisi;
    const m = mark ?? p.entryVwap;
    const nilaiPosisi = p.arah === 'LONG' ? p.qty * m : p.notionalAwal + (p.entryVwap - m) * p.qty - p.feeMasuk;
    const uPnl = p.arah === 'LONG' ? p.qty * m - p.notionalAwal : (p.entryVwap - m) * p.qty - p.feeMasuk;
    posisiTampil = {
      ...p,
      mark: m,
      nilaiPosisi: Math.round(nilaiPosisi * 100) / 100,
      uPnl: Math.round(uPnl * 100) / 100,
      uPnlPct: Math.round((uPnl / p.notionalAwal) * 10000) / 100,
      jarakTargetPct: Math.round(((p.target - m) / m) * 10000) / 100 * (p.arah === 'SHORT' ? -1 : 1),
      jarakStopPct: Math.round(((p.stop - m) / m) * 10000) / 100 * (p.arah === 'SHORT' ? -1 : 1),
    };
  }
  const tutup = tk.buku.filter((b) => b.jenis === 'TUTUP');
  const buka = tk.buku.filter((b) => b.jenis === 'BUKA');
  const pnlTotal = tutup.reduce((s, b) => s + (b.pnl ?? 0), 0);
  const feeTotal = [...buka, ...tutup].reduce((s, b) => s + (b.fee ?? 0), 0);
  const menang = tutup.filter((b) => (b.pnl ?? 0) > 0).length;
  const kalah = tutup.filter((b) => (b.pnl ?? 0) < 0).length;
  return {
    at: new Date().toISOString(),
    modalAwal: MODAL_AWAL,
    saldo: Math.round(tk.saldo * 100) / 100,
    ekuitas: Math.round(ek * 100) / 100,
    mark,
    totalSetoran: tk.totalSetoran,
    topupKe: tk.topupKe,
    pnlBersih: Math.round((ek - tk.totalSetoran) * 100) / 100,
    pnlBersihPct: Math.round(((ek - tk.totalSetoran) / tk.totalSetoran) * 10000) / 100,
    posisi: posisiTampil,
    buku: [...tk.buku].reverse().slice(0, 80),
    kurva: tk.kurva,
    analisis: tk.analisis,
    ujiDampak: tk.ujiDampakTerakhir,
    metrik: {
      nBuka: buka.length,
      nTutup: tutup.length,
      menang,
      kalah,
      winRate: tutup.length ? Math.round((menang / tutup.length) * 100) : null,
      pnlTotal: Math.round(pnlTotal * 100) / 100,
      slipMedianBeli: medianSlip(tk, 'beli'),
      slipMedianJual: medianSlip(tk, 'jual'),
      feeTotal: Math.round(feeTotal * 100) / 100,
      slipRataPct: tk.sampelSlip.length ? Math.round((tk.sampelSlip.reduce((s, x) => s + Math.abs(x.pct), 0) / tk.sampelSlip.length) * 10000) / 10000 : null,
    },
    hukum: [
      'ALL-IN: tiap rencana arena terkunci dieksekusi dompet dengan SELURUH saldo — bukan persen, bukan model satuan',
      'BUKAN ANGIN: eksekusi diukur dari orderbook nyata Bybit — order menyapu level demi level (VWAP), fee taker 0.1% per sisi, slippage & dampak harga-sendiri diukur',
      'TOP-UP: dompet habis saat hendak buka → $1000 disetor ulang otomatis, dicatat SETORAN di buku akuntansi',
      'AKUNTANSI: SETORAN/BUKA/TUTUP dicatat lengkap + ANALISIS KESALAHAN wajib untuk tiap tutup rugi — "kita tau dimana salahnya"',
      'SHORT (knob sellOn) dieksekusi di perp linear 1x dan dikenai funding nyata Bybit saat tutup',
    ],
  };
}

// ---------------- PINTU UNTUK JANTUNG DOMPET (dompet-jantung.ts) ----------------
// adopsiRencanaAktif diekspor sebagai fungsi publik: jantung mengeksekusi
// rencana arena hari ini dalam ≤60 detik setelah terkunci — tanpa menunggu
// halaman dibuka (keluhan pemilik: "modal seakan terhenti").
export async function dompetAdopsiAktif(): Promise<void> {
  await adopsiRencanaAktif();
}

// baca keadaan dompet untuk jantung (tanpa efek samping selain memuat toko)
export function dompetBacaToko(): { saldo: number; posisi: DompetPosisi | null; buku: EntriBuku[] } {
  const t = toko();
  return { saldo: t.saldo, posisi: t.posisi, buku: t.buku };
}

// HUKUM IGNISI (luka 2026-11-26 03:00) — posisi melawan ledakan:
// stop WAJIB ditarik mendekat SEKARANG (dari jantung), bukan menunggu
// SL σ jauh — dan saat harga melonjak searah posisi, target MENJALAR
// (trailing) mengikuti pasar, bukan TP σ kecepetan yang membuang gelombang.
function catatPerubahanGaris(t: DompetToko, arahPos: 'LONG' | 'SHORT', teks: string): void {
  catat(t, 'CATATAN', teks, null, { arah: arahPos, ref: 'HUKUM-IGNISI' });
}

export function dompetTarikStop(stopBaru: number, alasan: string): boolean {
  const t = toko();
  if (!t.posisi) return false;
  const p = t.posisi;
  // tarik = stop mendekat harga (LONG: stop naik ke atas; SHORT: stop turun ke bawah)
  const lebihTegas = p.arah === 'LONG' ? stopBaru > p.stop : stopBaru < p.stop;
  if (!lebihTegas) return false;
  const lama = p.stop;
  p.stop = stopBaru;
  catatPerubahanGaris(t, p.arah, `STOP DITARIK ${p.arah}: ${lama.toPrecision(6)} → ${stopBaru.toPrecision(6)} — ${alasan}`);
  tulisToko(t);
  return true;
}

export function dompetPerpanjangTarget(targetBaru: number, alasan: string): boolean {
  const t = toko();
  if (!t.posisi) return false;
  const p = t.posisi;
  // menjalar = target menjauhi entry (LONG: target naik; SHORT: target turun)
  const lebihJauh = p.arah === 'LONG' ? targetBaru > p.target : targetBaru < p.target;
  if (!lebihJauh) return false;
  const lama = p.target;
  p.target = targetBaru;
  p.ambisius = p.arah === 'LONG' ? Math.max(p.ambisius, targetBaru * 1.02) : Math.min(p.ambisius, targetBaru * 0.98);
  catatPerubahanGaris(t, p.arah, `TARGET MENJALAR ${p.arah}: ${lama.toPrecision(6)} → ${targetBaru.toPrecision(6)} — ${alasan}`);
  tulisToko(t);
  return true;
}

// harga keluar hidup (bid terbaik utk LONG keluar, ask terbaik utk SHORT beli-balik)
export async function dompetHargaKeluar(venue: 'spot' | 'perp'): Promise<{ bid: number; ask: number } | null> {
  try {
    const b = await ambilOrderbook(venue);
    return { bid: b.bids[0].harga, ask: b.asks[0].harga };
  } catch {
    return null;
  }
}
