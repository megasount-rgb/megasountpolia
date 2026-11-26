// ============================================================
// MICAPROFITA-ELSA · OTAK SUMBER — matriks sumber informasi HIDUP.
// Kelahiran: pemilik sadar kunci rahasia pasar = SUMBER DAYA
// INFORMASI. Likuidasi dan arah tidak boleh dibaca dari SATU
// pintu (info gate) — harus dari BANYAK sumber:
//   DERIVATIF : CoinGlass, Coinalyze, halaman futures exchange
//   ON-CHAIN  : Etherscan, Arkham/Nansen, Bubblemaps
//   HARGA/VOL : CoinGecko/CMC, DEXScreener, Tokenomist (unlock)
//   GELAP     : OTC/pasar hitam — TANPA sumber publik, diakui jujur
// V2 — RUH MATRIKS (keluhan pemilik: "matriks sumber layaknya
// benda mati, berdiam tanpa ruh — padahal otak yang DIPAKAI
// melahirkan kejeniusan dan inovasi"). Kini matriks ini makhluk
// hidup dengan empat organ:
//   1. DENYUT    — tiap sumber diperiksa hidup/mati tiap ronda
//                  (latensi, umur data, gagal-berturut, riwayat 24
//                  detak) dan diingat di db/elsa/sumber_denyut.json
//                  walau server restart. Jantung berdenyut sendiri
//                  tiap 5 menit dari instrumentation — tanpa
//                  menunggu ada yang membuka panel.
//   2. SUARA     — tiap sumber bicara apa yang ia LIHAT sekarang
//                  tentang ELSA, bukan teks pajangan statis.
//   3. KESAKSIAN — tiap sumber memberi voto NAIK/TURUN/NETRAL +
//                  kekuatan + cara, dikirim ke dewan bukti AR-E9
//                  arahVonis — sumber ikut MEMUTUSKAN arah.
//   4. BENTROKAN — validasi silang (harga Bybit vs CoinGecko,
//                  supply CMC vs CoinGecko, sumber terbelah arah):
//                  sumber yang saling menyangkal tidak ditelan
//                  mentah-mentah, keyakinan dipangkas nyata.
// Status jujur per sumber tetap:
//   HIDUP (data nyata masuk) · TERWAKILI (butuh kunci, tapi data
//   setara dibaca langsung dari sumber asalnya) · TERKUNCI (butuh
//   kunci/berbayar — buta diakui) · TIDAK_TERDAFTAR (venue tidak
//   listing ELSA) · MATI.
// ============================================================
import { ticker24h, SIMBOL, fmtHarga } from './bybit';

const KONTRAK_BASE = '0x29cC30f9D113B356Ce408667aa6433589CeCBDcA';

export type StatusSumber = 'HIDUP' | 'TERWAKILI' | 'TERKUNCI' | 'TIDAK_TERDAFTAR' | 'MATI';
export type BarisMatriks = {
  kategori: 'DERIVATIF' | 'ON-CHAIN' | 'HARGA-VOLUME' | 'GELAP';
  sumber: string;
  status: StatusSumber;
  apa: string;
  catatan: string;
};

// ---------------- RUH: denyut ----------------
export type DetakSumber = { at: string; ok: boolean; ms: number };
export type DenyutSumber = {
  id: string; label: string; status: 'HIDUP' | 'MATI';
  latencyMs: number | null; atTerakhir: string | null; umurDetik: number | null;
  gagalBerturut: number; riwayat: DetakSumber[];
};
// ---------------- RUH: suara, kesaksian, bentrokan ----------------
export type SuaraSumber = { dari: string; teks: string; at: string };
export type SumberKesaksian = { dari: string; vote: 'NAIK' | 'TURUN' | 'NETRAL'; kekuatan: number; cara: string };
export type BentrokanSumber = { topik: string; sumber: string[]; selisihPct: number | null; putusan: string };

export type UnlockData = {
  terbukaPct: number; terbukaToken: number; terkunciToken: number;
  berikutnya: {
    tanggal: string; hariDariSekarang: number; token: number; usd: number; pctTotal: number;
    pctVsBeredar: number; rincian: { alokasi: string; token: number; usd: number; tipe: string }[];
  } | null;
  selfReported: boolean;
  sumber: string;
};
export type SupplyData = {
  beredar: number; beredarSelfReported: number | null; total: number; maks: number | null;
  fdvUsd: number | null; mcapUsd: number | null; rasioFdvMcap: number | null;
  hargaUsd: number | null; ubah24j: number | null; ubah7d: number | null;
};
export type CexDexData = { cexUsd: number | null; dexUsd: number | null; dexSharePct: number | null; sumber: string };
export type TickerVenue = {
  venue: string; pasangan: string; harga: number; deviasiPct: number; vol24Usd: number;
  sharePct: number; trust: string; anomali: boolean;
};
export type DeksPair = {
  dex: string; pasangan: string; harga: number; likuidasiUsd: number; vol24Usd: number;
  beli: number; jual: number; tekananBeliPct: number | null; dibuat: string | null;
};
export type SumberData = {
  at: string;
  unlock: UnlockData | null;
  supply: SupplyData | null;
  cexDex: CexDexData | null;
  tickers: TickerVenue[];
  dislokasiHargaPct: number | null; // selisih harga venue termahal vs termurah (arga= harga agregat)
  venueMemimpin: string | null;
  dexPairs: DeksPair[];
  deksTekananBeliPct: number | null;
  matriks: BarisMatriks[];
  catatanJujur: string[];
  sumberHidup: number; sumberTerwakili: number; sumberTerkunci: number;
  // ---- RUH MATRIKS v2 ----
  hargaBybit: number | null; // jangkar harga hidup venue eksekusi
  ubah24jBybit: number | null;
  denyut: DenyutSumber[]; // hidup/mati tiap sumber + riwayat detak
  suara: SuaraSumber[]; // apa yang tiap sumber lihat SEKARANG
  kesaksian: SumberKesaksian[]; // voto tiap sumber → dewan AR-E9
  bentrokan: BentrokanSumber[]; // validasi silang antar sumber
  votoMasukVonis: { aktif: boolean; teks: string }; // bukti sumber dipakai verdict
};

// ---------------- cache 5 menit ----------------
let cache: { at: number; data: SumberData } | null = null;

async function getJson(url: string, timeoutMs = 11000): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ac.signal, cache: 'no-store', headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

const num = (v: unknown): number | null => {
  const n = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) ? n : null;
};
const fmtId = (v: number) => v.toLocaleString('id-ID', { maximumFractionDigits: 0 });
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ---------------- ingatan denyut (bertahan restart) ----------------
type DenyutStore = { riwayat: Record<string, DetakSumber[]>; updateTerakhir: string };
const CAP_RIWAYAT_DENYUT = 24;
function denyutPath() {
  return `${process.env.ELSA_DB_DIR ?? '/home/z/my-project/db'}/elsa/sumber_denyut.json`;
}
async function muatDenyut(): Promise<DenyutStore> {
  try {
    const fs = await import('fs');
    if (fs.existsSync(denyutPath())) {
      const j = JSON.parse(fs.readFileSync(denyutPath(), 'utf8')) as DenyutStore;
      if (j && typeof j.riwayat === 'object') return j;
    }
  } catch { /* ingatan rusak — mulai baru, jujur */ }
  return { riwayat: {}, updateTerakhir: '' };
}
async function simpanDenyut(store: DenyutStore): Promise<void> {
  try {
    const fs = await import('fs');
    const path = denyutPath();
    fs.mkdirSync(path.slice(0, path.lastIndexOf('/')), { recursive: true });
    fs.writeFileSync(path, JSON.stringify(store));
  } catch { /* gagal simpan — denyut tetap hidup di memori proses */ }
}
function catatDetak(store: DenyutStore, id: string, detak: DetakSumber): void {
  const arr = (store.riwayat[id] ??= []);
  arr.push(detak);
  if (arr.length > CAP_RIWAYAT_DENYUT) arr.splice(0, arr.length - CAP_RIWAYAT_DENYUT);
}
async function ukur<T>(store: DenyutStore, id: string, fn: () => Promise<T>): Promise<T | null> {
  const t0 = Date.now();
  try {
    const r = await fn();
    catatDetak(store, id, { at: new Date().toISOString(), ok: true, ms: Date.now() - t0 });
    return r;
  } catch {
    catatDetak(store, id, { at: new Date().toISOString(), ok: false, ms: Date.now() - t0 });
    return null;
  }
}
function bangunDenyut(store: DenyutStore, id: string, label: string): DenyutSumber {
  const arr = store.riwayat[id] ?? [];
  const lastOk = [...arr].reverse().find((d) => d.ok) ?? null;
  let gagal = 0;
  for (let i = arr.length - 1; i >= 0; i--) { if (arr[i].ok) break; gagal++; }
  return {
    id, label,
    status: lastOk ? 'HIDUP' : (arr.length ? 'MATI' : 'MATI'),
    latencyMs: lastOk?.ms ?? null,
    atTerakhir: lastOk?.at ?? null,
    umurDetik: lastOk ? Math.max(0, Math.round((Date.now() - Date.parse(lastOk.at)) / 1000)) : null,
    gagalBerturut: gagal,
    riwayat: arr.slice(-CAP_RIWAYAT_DENYUT),
  };
}

// ---------------- fetcher 1: CoinGecko (tickers per venue + market data) ----------------
type CGTicker = { market?: { name?: string }; coin_id?: string; base?: string; target?: string; converted_volume?: { usd?: number }; converted_last?: { usd?: number }; trust_score?: string; is_anomaly?: boolean };
type CGCoin = { market_data?: Record<string, unknown>; tickers?: CGTicker[] };
async function ambilCoinGecko(): Promise<{ supply: SupplyData; tickers: TickerVenue[] }> {
  const j = (await getJson('https://api.coingecko.com/api/v3/coins/elsa?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false')) as CGCoin;
  if (!j?.market_data) throw new Error('coingecko: market_data kosong');
  const md = j.market_data ?? {};
  const mcap = num(md.market_cap?.usd);
  const fdv = num(md.fully_diluted_valuation?.usd);
  const beredar = num(md.circulating_supply);
  const supply: SupplyData = {
    beredar: beredar ?? 0, beredarSelfReported: null,
    total: num(md.total_supply) ?? 0, maks: num(md.max_supply),
    fdvUsd: fdv, mcapUsd: mcap, rasioFdvMcap: fdv && mcap ? fdv / mcap : null,
    hargaUsd: num(md.current_price?.usd), ubah24j: num(md.price_change_percentage_24h),
    ubah7d: num(md.price_change_percentage_7d),
  };
  const tickersRaw = (j.tickers ?? []).filter((t) => (num(t.converted_volume?.usd) ?? 0) > 10_000);
  const totalVol = tickersRaw.reduce((s, t) => s + (num(t.converted_volume?.usd) ?? 0), 0);
  const medianHarga = (() => {
    const hs = tickersRaw.map((t) => num(t.converted_last?.usd)).filter((v): v is number => v !== null).sort((a, b) => a - b);
    return hs.length ? hs[Math.floor(hs.length / 2)] : null;
  })();
  const tickers: TickerVenue[] = tickersRaw
    .map((t) => {
      const harga = num(t.converted_last?.usd) ?? 0;
      return {
        venue: t.market?.name ?? '—', pasangan: `${t.base ?? ''}/${t.target ?? ''}`,
        harga, deviasiPct: medianHarga && harga ? (harga / medianHarga - 1) * 100 : 0,
        vol24Usd: num(t.converted_volume?.usd) ?? 0,
        sharePct: totalVol > 0 ? ((num(t.converted_volume?.usd) ?? 0) / totalVol) * 100 : 0,
        trust: t.trust_score ?? '—', anomali: !!t.is_anomaly,
      };
    })
    .sort((a, b) => b.vol24Usd - a.vol24Usd)
    .slice(0, 12);
  return { supply, tickers };
}

// ---------------- fetcher 2: CMC data-api (unlock schedule — padanan Tokenomist) ----------------
type CMCDetail = { data?: { tokenUnlockLatest?: Record<string, unknown>; supplyDetails?: Record<string, unknown>; cexVolume?: number; dexVolume?: number; statistics?: Record<string, unknown>; watchCount?: number; dateLaunched?: string } };
async function ambilCMC(): Promise<{ unlock: UnlockData; cexDex: CexDexData; sup: { beredarSelfReported: number | null; beredar: number | null; total: number | null; maks: number | null } }> {
  const j = (await getJson('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail?slug=heyelsa')) as CMCDetail;
  if (!j?.data) throw new Error('cmc: data kosong');
  const d = j.data ?? {};
  const u = d.tokenUnlockLatest ?? {};
  const beredar = num(d.supplyDetails?.circulatingSupply?.value);
  const next = (u.nextUnlocked ?? null) as Record<string, unknown> | null;
  const hariDariSekarang = next?.date ? Math.round((Number(next.date) - Date.now()) / 86_400_000) : 0;
  const rincianRaw = Array.isArray(u.nextUnlockedDetail) ? (u.nextUnlockedDetail as Record<string, unknown>[]) : [];
  const unlock: UnlockData = {
    terbukaPct: num(u.totalUnlockedPercentage) ?? 0,
    terbukaToken: num(u.tokenUnlockedAmount) ?? 0,
    terkunciToken: num(u.tokenLockedAmount) ?? 0,
    berikutnya: next
      ? {
          tanggal: new Date(Number(next.date)).toISOString().slice(0, 10),
          hariDariSekarang,
          token: num(next.tokenAmount) ?? 0,
          usd: num(next.tokenAmountUsd) ?? 0,
          pctTotal: num(next.tokenAmountPercentage) ?? 0,
          pctVsBeredar: beredar && num(next.tokenAmount) ? ((num(next.tokenAmount) ?? 0) / beredar) * 100 : 0,
          rincian: rincianRaw.map((r) => ({ alokasi: String(r.allocationName ?? '—'), token: num(r.tokenAmount) ?? 0, usd: num(r.tokenAmountUsd) ?? 0, tipe: String(r.vestingType ?? '—') })),
        }
      : null,
    selfReported: !!u.selfReported,
    sumber: 'CMC tokenUnlockLatest (data unlock setara Tokenomist, self-reported)',
  };
  const cexDex: CexDexData = {
    cexUsd: num(d.cexVolume), dexUsd: num(d.dexVolume),
    dexSharePct: num(d.cexVolume) && num(d.dexVolume) ? ((num(d.dexVolume) ?? 0) / ((num(d.cexVolume) ?? 0) + (num(d.dexVolume) ?? 0))) * 100 : null,
    sumber: 'CMC data-api volume split CEX vs DEX',
  };
  return {
    unlock, cexDex,
    sup: {
      beredarSelfReported: num(d.supplyDetails?.selfReportedCirculatingSupply?.value),
      beredar, total: num(d.supplyDetails?.totalSupply?.value), maks: num(d.supplyDetails?.maxSupply?.value),
    },
  };
}

// ---------------- fetcher 3: DEXScreener (aktivitas DEX on-chain) ----------------
type DSPair = { dexId?: string; baseToken?: { symbol?: string }; quoteToken?: { symbol?: string }; priceUsd?: string; liquidity?: { usd?: number }; volume?: { h24?: number }; txns?: { h24?: { buys?: number; sells?: number } }; pairCreatedAt?: number };
async function ambilDexScreener(): Promise<DeksPair[]> {
  const j = (await getJson(`https://api.dexscreener.com/tokens/v1/base/${KONTRAK_BASE}`)) as DSPair[];
  if (!Array.isArray(j)) throw new Error('dexscreener: respons bukan daftar');
  return j
    .filter((p) => (num(p.liquidity?.usd) ?? 0) > 1000)
    .sort((a, b) => (num(b.liquidity?.usd) ?? 0) - (num(a.liquidity?.usd) ?? 0))
    .slice(0, 8)
    .map((p) => {
      const beli = p.txns?.h24?.buys ?? 0, jual = p.txns?.h24?.sells ?? 0;
      return {
        dex: p.dexId ?? '—', pasangan: `${p.baseToken?.symbol ?? 'ELSA'}/${p.quoteToken?.symbol ?? '—'}`,
        harga: num(p.priceUsd) ?? 0, likuidasiUsd: num(p.liquidity?.usd) ?? 0,
        vol24Usd: num(p.volume?.h24) ?? 0, beli, jual,
        tekananBeliPct: beli + jual > 0 ? (beli / (beli + jual)) * 100 : null,
        dibuat: p.pairCreatedAt ? new Date(p.pairCreatedAt).toISOString().slice(0, 10) : null,
      };
    });
}

// ---------------- fetcher 4: GeckoTerminal (kedalaman likuiditas DEX) ----------------
type GTPool = { id?: string; attributes?: { name?: string; reserve_in_usd?: string; volume_usd?: { h24?: string } } };
async function ambilGeckoTerminal(): Promise<{ nama: string; likuidasiUsd: number; vol24Usd: number }[]> {
  const j = (await getJson(`https://api.geckoterminal.com/api/v2/networks/base/tokens/${KONTRAK_BASE}/pools?sort=h24_volume_usd_liquidity_desc`)) as { data?: GTPool[] };
  const arr = Array.isArray(j.data) ? j.data : [];
  if (!arr.length) throw new Error('geckoterminal: daftar pool kosong');
  return arr.slice(0, 6).map((p) => ({
    nama: p.attributes?.name ?? '—',
    likuidasiUsd: num(p.attributes?.reserve_in_usd) ?? 0,
    vol24Usd: num(p.attributes?.volume_usd?.h24) ?? 0,
  }));
}

// ---------------- matriks sumber (hukum kejujuran) ----------------
function bangunMatriks(hidup: { cg: boolean; cmc: boolean; ds: boolean; gt: boolean }): BarisMatriks[] {
  return [
    // ---------- DERIVATIF ----------
    { kategori: 'DERIVATIF', sumber: 'CoinGlass', status: 'TERWAKILI', apa: 'OI, funding, rasio long/short, likuidasi per exchange',
      catatan: 'API publik butuh kunci (endpoint tanpa kunci 404). TAPI data yang sama sudah dibaca LANGSUNG dari venue asalnya: OI+funding+likuidasi resmi Gate, OI+funding Bybit/Bitget/BingX/Toobit, jumlah akun long/short Gate — agregasi CoinGlass kini redundant untuk ELSA' },
    { kategori: 'DERIVATIF', sumber: 'Coinalyze', status: 'TERWAKILI', apa: 'banding OI & funding antar exchange',
      catatan: 'API butuh kunci (401). Perbandingan antar venue sudah dilakukan otak modal langsung: sensus lintas venue menghitung OI universe + funding per venue sendiri' },
    { kategori: 'DERIVATIF', sumber: 'Gate.io futures (resmi)', status: 'HIDUP', apa: 'OI, funding, jumlah akun long/short, likuidasi resmi, posisi whale top-20',
      catatan: 'satu-satunya venue yang membuka JUMLAH akun long/short nyata + likuidasi resmi — tulang punggung otak aliran' },
    { kategori: 'DERIVATIF', sumber: 'Bybit / Bitget / BingX / Toobit futures (resmi)', status: 'HIDUP', apa: 'OI, funding, ticker per venue',
      catatan: 'rasio akun Bybit terbatas (rasio, bukan jumlah); Bitget endpoint rasio akun 404 publik — jujur dicatat per venue di sensus' },
    { kategori: 'DERIVATIF', sumber: 'Binance / OKX futures', status: 'TIDAK_TERDAFTAR', apa: '—',
      catatan: 'ELSA tidak terdaftar di Binance (spot & futures Invalid symbol) dan OKX (instrument tidak ada) — bukan buta, memang tidak ada pasar' },
    // ---------- ON-CHAIN ----------
    { kategori: 'ON-CHAIN', sumber: 'Etherscan (top holder, jumlah holder, transfer besar)', status: 'TERKUNCI', apa: 'distribusi holder, transfer whale on-chain',
      catatan: 'ELSA kontrak di Base (0x29cC…DcA) & Mantle — plan gratis Etherscan hanya menjangkau eth mainnet (respon: "Free API access is not supported for this chain"); Blockscout Base diblok Cloudflare. BUTA diakui jujur: distribusi holder on-chain belum terbaca otomatis' },
    { kategori: 'ON-CHAIN', sumber: 'Arkham / Nansen (label dompet)', status: 'TERKUNCI', apa: 'label dompet (exchange, fund, market maker) & pergerakannya',
      catatan: 'butuh akun/kunci berbayar — belum terjangkau dari server ini; label dompet tetap titik buta' },
    { kategori: 'ON-CHAIN', sumber: 'Bubblemaps (graf dompet terkait, penguasaan supply)', status: 'TERKUNCI', apa: 'konsentrasi supply di segelintir dompet',
      catatan: 'endpoint map tanpa kunci tidak tersedia (404/timeout). Alternatif yang hidup: lastKnownBalance kontrak Mantle via CMC + likuiditas pool (GeckoTerminal) — bukan pengganti penuh graf dompet' },
    { kategori: 'ON-CHAIN', sumber: 'GeckoTerminal + DEXScreener (on-chain yang terbaca)', status: hidup.gt || hidup.ds ? 'HIDUP' : 'MATI', apa: 'likuiditas pool, volume DEX, jumlah transaksi beli vs jual',
      catatan: hidup.gt || hidup.ds ? 'tekanan beli/jual on-chain 24j terbaca per pool — proksi aktivitas holder di DEX' : 'kedua jalur DEX gagal kali ini — dicoba lagi berikutnya' },
    // ---------- HARGA / VOLUME ----------
    { kategori: 'HARGA-VOLUME', sumber: 'CoinGecko', status: hidup.cg ? 'HIDUP' : 'MATI', apa: 'volume per exchange & per pasangan, harga lintas venue, FDV, supply',
      catatan: hidup.cg ? 'tickers per venue masuk nyata: venue mana yang memimpin volume + dislokasi harga antar venue' : 'rate-limit / gagal kali ini — dicoba lagi berikutnya' },
    { kategori: 'HARGA-VOLUME', sumber: 'CoinMarketCap (data-api)', status: hidup.cmc ? 'HIDUP' : 'MATI', apa: 'volume CEX vs DEX, supply resmi vs self-reported, statistik pasar',
      catatan: hidup.cmc ? 'detail lengkap masuk tanpa kunci (slug heyelsa) — termasuk jadwal unlock' : 'gagal kali ini — dicoba lagi berikutnya' },
    { kategori: 'HARGA-VOLUME', sumber: 'DEXScreener', status: hidup.ds ? 'HIDUP' : 'MATI', apa: 'aktivitas DEX: pool, likuiditas, volume, buy/sell',
      catatan: hidup.ds ? 'pair ELSA/USDC Base masuk nyata — tekanan beli vs jual terbaca' : 'gagal kali ini' },
    { kategori: 'HARGA-VOLUME', sumber: 'Tokenomist (unlock tracker)', status: hidup.cmc ? 'TERWAKILI' : 'TERKUNCI', apa: 'jadwal unlock, cliff + vesting',
      catatan: hidup.cmc ? 'tokenomist.ai memblokir akses otomatis (403) & API-nya berbayar — TAPI data unlock setara sudah didapat via CMC tokenUnlockLatest (self-reported): ELSA ada cliff besar + vesting linear Seed/Pre-seed' : 'tokenomist.ai memblokir akses otomatis (403); data unlock belum terbaca kali ini' },
    // ---------- GELAP ----------
    { kategori: 'GELAP', sumber: 'Pasar hitam / OTC desk', status: 'TERKUNCI', apa: 'perdagangan di luar bursa, blok besar privat',
      catatan: 'TIDAK ADA sumber publik apa pun — titik buta permanen yang wajib diakui; dampaknya bisa berupa lonjakan supply tanpa jejak exchange' },
  ];
}

// ---------------- RUH: kesaksian sumber ----------------
type BahanKesaksian = {
  cg: { supply: SupplyData; tickers: TickerVenue[] } | null;
  cmc: { unlock: UnlockData; cexDex: CexDexData; sup: { beredarSelfReported: number | null; beredar: number | null; total: number | null; maks: number | null } } | null;
  ds: DeksPair[] | null;
  gt: { nama: string; likuidasiUsd: number; vol24Usd: number }[] | null;
  bt: { lastPrice: number; perubahan24jPct: number } | null;
  dislokasi: number | null;
  deksTekanan: number | null;
  kesaksian: SumberKesaksian[];
};
function hitungKesaksian(b: BahanKesaksian): SumberKesaksian[] {
  const ks: SumberKesaksian[] = [];
  // CoinGecko — tren harga agregat lintas venue + dislokasi
  if (b.cg) {
    const s7 = b.cg.supply.ubah7d ?? 0;
    const s24 = b.cg.supply.ubah24j ?? 0;
    let skor = clamp(s7 / 10, -1, 1) * 0.6 + clamp(s24 / 6, -1, 1) * 0.4;
    let cara = `tren harga agregat lintas venue: 7d ${s7 >= 0 ? '+' : ''}${s7.toFixed(2)}% · 24j ${s24 >= 0 ? '+' : ''}${s24.toFixed(2)}%`;
    if (b.dislokasi !== null && b.dislokasi > 3) { skor *= 0.7; cara += `; harga antar venue terpecah ${b.dislokasi.toFixed(2)}% — sinyal kurang solid, kekuatan dipangkas`; }
    const vote = skor > 0.22 ? 'NAIK' : skor < -0.22 ? 'TURUN' : 'NETRAL';
    ks.push({ dari: 'CoinGecko', vote, kekuatan: Math.round((vote === 'NETRAL' ? 3 : 2.5 + Math.abs(skor) * 9) * 10) / 10, cara });
  }
  // CMC — overhang unlock (tekanan jual terjadwal yang bisa dibaca di muka)
  if (b.cmc) {
    const u = b.cmc.unlock.berikutnya;
    if (!u) ks.push({ dari: 'CMC-unlock', vote: 'NETRAL', kekuatan: 2, cara: 'jadwal unlock belum terbaca kali ini — tidak bisa bersaksi soal overhang' });
    else if (u.hariDariSekarang > 45) ks.push({ dari: 'CMC-unlock', vote: 'NETRAL', kekuatan: 2, cara: `cliff berikutnya ${u.tanggal} (${u.hariDariSekarang} hari lagi, ${u.pctVsBeredar.toFixed(1)}% dari beredar) — overhang masih jauh, tidak menekan arah kini` });
    else ks.push({ dari: 'CMC-unlock', vote: 'TURUN', kekuatan: Math.round(clamp(3 + u.pctVsBeredar * 0.9 + (45 - u.hariDariSekarang) * 0.12, 3, 14) * 10) / 10, cara: `unlock ${Math.round(u.token).toLocaleString('id-ID')} ELSA (${u.pctVsBeredar.toFixed(1)}% dari beredar, ~$${fmtId(Math.round(u.usd))}) buka ${u.tanggal} — ${u.hariDariSekarang} hari lagi; cliff ganda vesting linear = overhang jual terjadwal, harga biasanya dibumbukan SEBELUM tanggalnya` });
  }
  // DEXScreener — tekanan beli/jual on-chain (proksi kerumunan rantai)
  if (b.ds && b.ds.length) {
    const p = b.deksTekanan;
    const totBeli = b.ds.reduce((s, x) => s + x.beli, 0);
    const totJual = b.ds.reduce((s, x) => s + x.jual, 0);
    if (p === null) ks.push({ dari: 'DEXScreener', vote: 'NETRAL', kekuatan: 2, cara: `pool DEX terbaca (${b.ds.length} pool) tapi transaksi beli/jual kosong 24j` });
    else if (p >= 58) ks.push({ dari: 'DEXScreener', vote: 'NAIK', kekuatan: Math.round(clamp((p - 50) * 0.6 + 2, 2, 10) * 10) / 10, cara: `tekanan beli on-chain ${p.toFixed(0)}% (${totBeli} beli vs ${totJual} jual 24j) — kerumunan rantai membeli lebih agresif` });
    else if (p <= 42) ks.push({ dari: 'DEXScreener', vote: 'TURUN', kekuatan: Math.round(clamp((50 - p) * 0.6 + 2, 2, 10) * 10) / 10, cara: `tekanan beli on-chain hanya ${p.toFixed(0)}% (${totBeli} beli vs ${totJual} jual 24j) — kerumunan rantai melepas` });
    else ks.push({ dari: 'DEXScreener', vote: 'NETRAL', kekuatan: 2, cara: `tekanan beli/jual on-chain seimbang (${p.toFixed(0)}% beli, ${totBeli} vs ${totJual} transaksi 24j)` });
  }
  // GeckoTerminal — kedalaman kolam (kolam tipis = harga gampang digoyang)
  if (b.gt && b.gt.length) {
    const lik = b.gt.reduce((s, x) => s + x.likuidasiUsd, 0);
    if (lik < 25_000) ks.push({ dari: 'GeckoTerminal', vote: 'TURUN', kekuatan: 5, cara: `likuiditas DEX total hanya $${fmtId(Math.round(lik))} di ${b.gt.length} pool — kolam tipis, pemegang besar gampang menggoyang harga` });
    else ks.push({ dari: 'GeckoTerminal', vote: 'NETRAL', kekuatan: 2, cara: `likuiditas DEX $${fmtId(Math.round(lik))} di ${b.gt.length} pool (terdalam ${b.gt[0].nama}) — cukup dalam, harga wajar terjaga` });
  }
  // Bybit — jangkar venue eksekusi (validator: momentum sudah dibaca dewan candle)
  if (b.bt) {
    const m = b.bt.perubahan24jPct;
    ks.push({
      dari: 'Bybit', vote: Math.abs(m) >= 8 ? (m > 0 ? 'NAIK' : 'TURUN') : 'NETRAL',
      kekuatan: Math.abs(m) >= 8 ? 3 : 2,
      cara: `harga hidup venue eksekusi $${fmtHarga(b.bt.lastPrice)} (24j ${m >= 0 ? '+' : ''}${m.toFixed(2)}%) — jangkar validasi silang; momentumnya sudah dibaca dewan candle, tidak doble menghitung`,
    });
  }
  return ks;
}

// ---------------- RUH: bentrokan antar sumber (validasi silang) ----------------
function hitungBentrokan(b: BahanKesaksian, supply: SupplyData | null): BentrokanSumber[] {
  const out: BentrokanSumber[] = [];
  // 1) harga: venue eksekusi (Bybit, harga yang benar-benar dipakai TP/SL) vs agregat CoinGecko
  if (b.bt && b.cg?.supply.hargaUsd) {
    const dev = (b.bt.lastPrice / b.cg.supply.hargaUsd - 1) * 100;
    if (Math.abs(dev) >= 1.2) {
      out.push({
        topik: 'HARGA-LINTAS-SUMBER', sumber: ['Bybit v5 (venue eksekusi)', 'CoinGecko (agregat)'],
        selisihPct: Math.round(dev * 100) / 100,
        putusan: 'harga hidup venue eksekusi yang memenangkan selisih — entry/TP/SL wajib memakai harga Bybit yang benar-benar terjadi; agregat CG dianggap telat, dislokasi diawasi (termahal memancing jual, termurah memancing beli)',
      });
    }
  }
  // 2) supply beredar: CMC vs CoinGecko — kalau beda jauh, semua hitungan dilusi menipu
  const supCmc = b.cmc?.sup.beredar ?? null;
  const supCg = b.cg?.supply.beredar ?? null;
  if (supCmc && supCg) {
    const dev = (supCmc / supCg - 1) * 100;
    if (Math.abs(dev) >= 5) {
      out.push({
        topik: 'SUPPLY-BEREDAR', sumber: ['CMC', 'CoinGecko'],
        selisihPct: Math.round(dev * 100) / 100,
        putusan: `dua sumber tidak sepakat beredar (${Math.round(supCmc).toLocaleString('id-ID')} vs ${Math.round(supCg).toLocaleString('id-ID')} ELSA) — dipakai angka CMC (supply resmi + self-reported dipisah jujur); selisih ini sendiri adalah sinyal: angka beredar yang direkayasa membuat FDV/dilusi menipu`,
      });
    }
  }
  // 3) arah terbelah — sumber saling melawan, tidak ada yang dibungkam
  const naik = b.kesaksian.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
  const turun = b.kesaksian.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
  if (naik >= 4 && turun >= 4) {
    out.push({
      topik: 'ARAH-TERBELAH', sumber: b.kesaksian.filter((k) => k.vote !== 'NETRAL').map((k) => k.dari),
      selisihPct: Math.round(Math.abs(naik - turun) * 10) / 10,
      putusan: `dewan sumber terbelah: sisi NAIK ${Math.round(naik * 10) / 10} vs sisi TURUN ${Math.round(turun * 10) / 10} — seluruh kesaksian tetap masuk dewan AR-E9 dan keyakinan vonis dipangkas; otak tidak boleh memilih sumber yang hanya menyenangkan`,
    });
  }
  // 4) unlock self-reported — angka proyek sendiri, dipakai tapi tak pernah jadi dasar tunggal
  if (b.cmc?.unlock.selfReported && (b.cmc.unlock.berikutnya?.pctVsBeredar ?? 0) >= 3) {
    out.push({
      topik: 'UNLOCK-SELF-REPORTED', sumber: ['CMC tokenUnlockLatest'],
      selisihPct: null,
      putusan: 'jadwal unlock berasal dari laporan proyek sendiri (self-reported) — diperlakukan best-effort: dipakai sebagai peringatan overhang, TIDAK dijadikan dasar tunggal keputusan',
    });
  }
  void supply;
  return out;
}

// ---------------- payload utama ----------------
export async function getSumberData(): Promise<SumberData> {
  if (cache && Date.now() - cache.at < 300_000) return cache.data;
  const store = await muatDenyut();
  const [cg, cmc, ds, gt, bt] = await Promise.all([
    ukur(store, 'coingecko', ambilCoinGecko),
    ukur(store, 'cmc', ambilCMC),
    ukur(store, 'dexscreener', ambilDexScreener),
    ukur(store, 'geckoterminal', ambilGeckoTerminal),
    ukur(store, 'bybit', async () => {
      const t = await ticker24h(SIMBOL);
      if (!t) throw new Error('bybit: ticker kosong');
      return t;
    }),
  ]);
  store.updateTerakhir = new Date().toISOString();
  await simpanDenyut(store);
  // supply: gabung CMC (unlock & self-reported) + CoinGecko (harga & FDV)
  let supply: SupplyData | null = null;
  if (cg || cmc) {
    const cgS = cg?.supply;
    supply = {
      beredar: cmc?.sup.beredar ?? cgS?.beredar ?? 0,
      beredarSelfReported: cmc?.sup.beredarSelfReported ?? null,
      total: cmc?.sup.total ?? cgS?.total ?? 0,
      maks: cmc?.sup.maks ?? cgS?.maks ?? null,
      fdvUsd: cgS?.fdvUsd ?? null,
      mcapUsd: cgS?.mcapUsd ?? null,
      rasioFdvMcap: cgS?.rasioFdvMcap ?? null,
      hargaUsd: cgS?.hargaUsd ?? null,
      ubah24j: cgS?.ubah24j ?? null,
      ubah7d: cgS?.ubah7d ?? null,
    };
  }
  // dislokasi harga lintas venue + venue pemimpin
  const tickers = cg?.tickers ?? [];
  const dislokasi = tickers.length >= 2
    ? Math.max(...tickers.map((t) => t.deviasiPct)) - Math.min(...tickers.map((t) => t.deviasiPct))
    : null;
  const venueMemimpin = tickers.length ? tickers[0].venue : null;
  // tekanan beli DEX agregat
  const dexPairs = ds ?? [];
  const totBeli = dexPairs.reduce((s, p) => s + p.beli, 0);
  const totJual = dexPairs.reduce((s, p) => s + p.jual, 0);
  const deksTekananBeliPct = totBeli + totJual > 0 ? (totBeli / (totBeli + totJual)) * 100 : null;
  // ===== RUH: suara — apa yang tiap sumber LIHAT sekarang =====
  const now = new Date().toISOString();
  const suara: SuaraSumber[] = [];
  if (bt) suara.push({ dari: 'Bybit v5 (venue eksekusi)', at: now, teks: `harga hidup $${fmtHarga(bt.lastPrice)} (24j ${bt.perubahan24jPct >= 0 ? '+' : ''}${bt.perubahan24jPct.toFixed(2)}%, turnover $${(bt.turnover24h / 1e6).toFixed(2)} jt) — semua entry/TP/SL diadili di harga ini` });
  if (cg) suara.push({ dari: 'CoinGecko', at: now, teks: `harga agregat $${fmtHarga(cg.supply.hargaUsd)} (24j ${(cg.supply.ubah24j ?? 0) >= 0 ? '+' : ''}${(cg.supply.ubah24j ?? 0).toFixed(2)}%, 7d ${(cg.supply.ubah7d ?? 0) >= 0 ? '+' : ''}${(cg.supply.ubah7d ?? 0).toFixed(2)}%); venue terbesar ${tickers[0]?.venue ?? '—'} (${(tickers[0]?.sharePct ?? 0).toFixed(1)}% volume)${dislokasi !== null ? `; dislokasi harga antar venue ${dislokasi.toFixed(2)}%` : ''}` });
  if (cmc) suara.push({ dari: 'CMC data-api', at: now, teks: (() => { const u = cmc.unlock.berikutnya; const cd = cmc.cexDex; return `${u ? `unlock berikutnya ${u.tanggal}: ${Math.round(u.token).toLocaleString('id-ID')} ELSA (${u.pctVsBeredar.toFixed(1)}% dari beredar, ~$${fmtId(Math.round(u.usd))}, ${u.hariDariSekarang} hari lagi)` : 'jadwal unlock tidak terbaca'}; volume 24j CEX $${fmtId(Math.round(cd.cexUsd ?? 0))} vs DEX $${fmtId(Math.round(cd.dexUsd ?? 0))} (porsi DEX ${cd.dexSharePct !== null ? `${cd.dexSharePct.toFixed(1)}%` : '—'})`; })() });
  if (ds && ds.length) suara.push({ dari: 'DEXScreener', at: now, teks: `pool terbesar ${ds[0].pasangan} di ${ds[0].dex}: likuiditas $${fmtId(Math.round(ds[0].likuidasiUsd))}, vol 24j $${fmtId(Math.round(ds[0].vol24Usd))}${deksTekananBeliPct !== null ? `; tekanan beli on-chain agregat ${deksTekananBeliPct.toFixed(0)}%` : ''}` });
  if (gt && gt.length) suara.push({ dari: 'GeckoTerminal', at: now, teks: `kedalaman ${gt.length} pool terbesar total $${fmtId(Math.round(gt.reduce((s, x) => s + x.likuidasiUsd, 0)))}; pool terdalam ${gt[0].nama} $${fmtId(Math.round(gt[0].likuidasiUsd))}` });
  // ===== RUH: kesaksian → dewan bukti AR-E9 =====
  const bahan: BahanKesaksian = { cg, cmc, ds, gt, bt: bt ? { lastPrice: bt.lastPrice, perubahan24jPct: bt.perubahan24jPct } : null, dislokasi, deksTekanan: deksTekananBeliPct, kesaksian: [] };
  const kesaksian = hitungKesaksian(bahan);
  bahan.kesaksian = kesaksian;
  // ===== RUH: bentrokan validasi silang =====
  const bentrokan = hitungBentrokan(bahan, supply);
  const matriks = bangunMatriks({ cg: !!cg, cmc: !!cmc, ds: !!ds, gt: !!gt });
  const catatanJujur: string[] = [];
  if (cmc?.unlock.berikutnya) {
    const u = cmc.unlock.berikutnya;
    catatanJujur.push(
      `UNLOCK OVERHANG: ${u.token.toLocaleString('id-ID')} ELSA (${u.pctTotal.toFixed(2)}% total supply ≈ ${u.pctVsBeredar.toFixed(1)}% dari beredar, ~$${fmtId(Math.round(u.usd))}) buka ${u.tanggal} (${u.hariDariSekarang} hari lagi) — rincian: ${u.rincian.map((r) => `${r.alokasi} ${fmtId(r.token)} (${r.tipe})`).join(' + ')}. Ini cliff ganda vesting linear: pasar tahu tanggalnya, harga bisa sudah dibumbukan SEBELUM tanggal itu`,
    );
    catatanJujur.push(`BARA TERKUNCI: ${(cmc.unlock.terkunciToken / 1e6).toFixed(1)} juta ELSA masih terkunci (unlocked ${(cmc.unlock.terbukaPct).toFixed(2)}%) — aliran token locked→circulating adalah tekanan jual terjadwal yang bisa dibaca di muka (self-reported: ${cmc.unlock.selfReported ? 'ya' : 'tidak'})`);
  } else {
    catatanJujur.push('jadwal unlock belum terbaca kali ini — cliff & vesting tetap risiko yang tidak boleh dilupakan');
  }
  if (dislokasi !== null) catatanJujur.push(`dislokasi harga lintas venue ${dislokasi.toFixed(2)}% (termahal vs termurah) — venue dengan harga tertinggi memancing jual, terendah memancing beli; arah biasanya ditentukan venue bervolume terbesar (${venueMemimpin ?? '—'})`);
  catatanJujur.push('titik buta yang diakui: distribusi holder on-chain (Etherscan Base), label dompet (Arkham/Nansen), graf dompet (Bubblemaps), dan pasar OTC — semua butuh kunci berbayar / tanpa sumber publik');
  const denyut = [
    bangunDenyut(store, 'bybit', 'Bybit v5 (venue eksekusi)'),
    bangunDenyut(store, 'coingecko', 'CoinGecko'),
    bangunDenyut(store, 'cmc', 'CMC data-api'),
    bangunDenyut(store, 'dexscreener', 'DEXScreener'),
    bangunDenyut(store, 'geckoterminal', 'GeckoTerminal'),
  ];
  const data: SumberData = {
    at: now,
    unlock: cmc?.unlock ?? null,
    supply,
    cexDex: cmc?.cexDex ?? null,
    tickers, dislokasiHargaPct: dislokasi, venueMemimpin,
    dexPairs, deksTekananBeliPct,
    matriks,
    catatanJujur,
    sumberHidup: matriks.filter((m) => m.status === 'HIDUP').length,
    sumberTerwakili: matriks.filter((m) => m.status === 'TERWAKILI').length,
    sumberTerkunci: matriks.filter((m) => m.status === 'TERKUNCI' || m.status === 'TIDAK_TERDAFTAR' || m.status === 'MATI').length,
    hargaBybit: bt?.lastPrice ?? null,
    ubah24jBybit: bt?.perubahan24jPct ?? null,
    denyut, suara, kesaksian, bentrokan,
    votoMasukVonis: { aktif: kesaksian.length > 0, teks: kesaksian.length ? `kesaksian ${kesaksian.length} sumber hidup dikirim ke dewan bukti AR-E9 arahVonis (bobot 0.08) — sumber ikut memutuskan, bukan pajangan` : 'tidak ada sumber bersuara kali ini — dewan arah berjalan dari candle saja' },
  };
  cache = { at: Date.now(), data };
  return data;
}
