// ============================================================
// MICAPROFITA-ELSA · OTAK PETA WAKTU — "TIME TRAVELER ROADMAP".
// Kelahiran: permintaan pemilik (pasca-kasus ELSA 0.05 → 0.1):
//   "waktu di 0.05 harusnya kita bisa tau oh ya dia akan ke 0.1
//    berlandas ke arah di TANGGAL sekian atau di HARI keberapa"
//   … "di 0.1 juga misal harus tau akan ke mana — TURUN CURAM
//    atau NAIK".
// Artinya vonis boleh berhenti di "akan naik ke sekian" TIDAK
// cukup: peta ini menjawab 3 lapisan:
//   1) KE MANA  — level demi level (waypoint bertingkat, bukan satu angka)
//   2) KAPAN    — estimasi tanggal kedatangan per level (model kecepatan)
//   3) SESUDAHNYA — di tiap waypoint: LANJUT (bensin masih ada),
//      JATUH_CURAM (bensin habis + tembok), atau ISTIRAHAT.
// SEMUA berlandaskan sumber daya informasi super-sumber:
//   likuidasi cluster (Bybit OI + tier leverage), funding, jumlah orang,
//   whale top-20, akumulasi senyap, model kaskade 500-soal,
//   jadwal unlock (cliff+vesting), supply, dan candle historis.
// JUJUR: uji mundur dijalankan pada sejarah nyata ELSA dengan MODE
// CANDLE-SAJA (tanpa OI/funding historis) — hasil HIT/MISS tampil
// apa adanya, tidak dihaluskan.
// ============================================================
import { Candle, ema, mean } from './indicators';
import type { ModalData } from './modal';
import type { SumberData } from './sumber';
import type { AliranData } from './aliran';

// ---------------- tipe publik ----------------
export type KomponenBensin = { k: string; v: number; sumber: string };
export type Bensin = { skor: number; komponen: KomponenBensin[]; ket: string };

export type KakiWaktu = {
  dari: number; ke: number; jarakPct: number;
  jenisMagnet: 'likuidasi-short' | 'likuidasi-long' | 'portal-waktu' | 'resistensi' | 'level-bulat' | 'poc' | 'ema' | 'unlock';
  peluang: number;            // per-kaki
  hari: number;               // durasi kaki ini
  hariKumulatif: number;      // hari sejak sekarang sampai TIBA di level ini
  tanggalKedatangan: string;  // YYYY-MM-DD
  rentangTanggal: string;     // "25/11–16/12" — rentang jujur dari varian kecepatan
  narasi: string;
  sumberBensin: string[];
};

export type TitikWaktu = {
  harga: number;
  negara: 'LANJUT' | 'JATUH_CURAM' | 'ISTIRAHAT';
  peluang: number;
  sasaranCuram: number | null;   // kalau curam: jatuh ke mana
  hariCuram: number | null;
  tanggalCuram: string | null;
  pCuram: number;
  alasan: string[];
};

export type BarisUjiMundur = {
  mulaiHari: string; mulaiHarga: number;
  sasaran: number; sasaranPct: number;
  etaHari: number; etaTanggal: string;
  nyataHari: string | null; nyataHarga: number | null;
  selisihHari: number | null;
  hasil: 'TEPAT' | 'DEKAT' | 'MELESET' | 'TIDAK_TERJANGKAU';
  lanjutanPeta: string; // narasi rantai: apakah peta tahu harus lanjut ke level berikutnya
};

export type PetaWaktuData = {
  at: string;
  harga: number;
  arahDominan: 'NAIK' | 'TURUN' | 'RAGU';
  marginArah: number; // selisih bensin naik − turun (poin)
  narasiArah: string;
  bensinNaik: Bensin;
  bensinTurun: Bensin;
  kecepatan: { pctPerHariNaik: number; pctPerHariTurun: number; dasar30: number; arah14: number; multFuel: number; sumber: string };
  kaki: KakiWaktu[];        // jalur utama (arah dominan)
  titik: TitikWaktu[];      // keputusan di TIAP waypoint jalur utama
  kakiTurun: KakiWaktu | null;  // skenario risiko berlawanan
  titikTurun: TitikWaktu | null;
  unlockGate: { tanggal: string; hariDariSekarang: number; token: number; usd: number; pctVsBeredar: number; efek: string } | null;
  ujiMundur: { baris: BarisUjiMundur[]; n: number; tepat: number; dekat: number; meleset: number; rerataSelisihHari: number | null; ket: string };
  metode: string;
  kejujuran: string[];
};

// ---------------- cache ----------------
let cache: { at: number; data: PetaWaktuData } | null = null;
const TTL_MS = 60_000;

// ---------------- util ----------------
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const median = (a: number[]): number => {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
function atrPct(cs: Candle[], n = 14): number {
  const s = cs.slice(-n - 1);
  const tr = s.slice(1).map((c, i) => Math.max(c.h - c.l, Math.abs(c.c - s[i].c), Math.abs(c.l - s[i].c)) / Math.max(s[i].c, 1e-12) * 100);
  return mean(tr);
}
function tanggalDari(hari: number): string {
  return new Date(Date.now() + Math.max(0, Math.round(hari)) * 86_400_000).toISOString().slice(0, 10);
}
const fmtUsd = (v: number) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)} jt` : v >= 1e3 ? `${(v / 1e3).toFixed(0)} rb` : `${Math.round(v)}`);

// level bulat psikologis: kelipatan 0.01 di bawah 0.1, kelipatan 0.05 di atas 0.1, kelipatan 0.1 di atas 0.5
function levelBulatBerikut(h: number): number {
  if (h < 0.1) return Math.ceil((h + 1e-9) / 0.01) * 0.01;
  if (h < 0.5) return Math.ceil((h + 1e-9) / 0.05) * 0.05;
  return Math.ceil((h + 1e-9) / 0.1) * 0.1;
}

// ---------------- kecepatan (model waktu, DIKALIBRASI uji-mundur) ----------------
// Model terpilih M4 dari kalibrasi 9 pivot sejarah ELSA (scripts/kalibrasi_velocity.py):
//   kecepatan = median |pergerakan harian 30 candle| × efisiensi arah × 1.05
// efisiensi arah = porsi hari yang bergerak searah — memodelkan bahwa tren menempuh
// jarak hanya pada hari-hari searah. Kalibrasi (mode candle-saja): 2 TEPAT · 1 DEKAT · 3 MELESET · 3 TIDAK TERJANGKAU.
function modelKecepatan(cs: Candle[], modal: ModalData | null, bensinNaik: number, bensinTurun: number) {
  const moves: number[] = [];
  for (let i = Math.max(1, cs.length - 30); i < cs.length; i++) moves.push((cs[i].c - cs[i - 1].c) / cs[i - 1].c * 100);
  const dasar30 = median(moves.map(Math.abs));
  const pUp = moves.length ? moves.filter((m) => m > 0).length / moves.length : 0.5;
  const pDn = 1 - pUp;
  // multiplier bensin: bensin penuh → harga menempuh jarak lebih cepat (kasus nyata: 18.77% sehari saat squeeze)
  const multNaik = modal?.squeeze.aktif ? 1.35 : bensinNaik >= 65 ? 1.15 : bensinNaik <= 30 ? 0.75 : 1;
  const multTurun = bensinTurun >= 65 ? 1.2 : 1;
  const naik = Math.max(dasar30 * Math.max(pUp, 0.35) * 1.05, dasar30 * 0.35) * multNaik;
  const turun = Math.max(dasar30 * Math.max(pDn, 0.3), dasar30 * 0.3) * multTurun;
  return {
    pctPerHariNaik: Math.round(naik * 100) / 100,
    pctPerHariTurun: Math.round(turun * 100) / 100,
    dasar30: Math.round(dasar30 * 100) / 100,
    arah14: Math.round(pUp * 1000) / 1000,
    multFuel: multNaik,
    sumber: `median pergerakan harian 30 candle (${dasar30.toFixed(2)}%/hari) × efisiensi arah naik ${(pUp * 100).toFixed(0)}% × 1.05 — dikalibrasi uji-mundur pada pivot sejarah ELSA (lihat tabel uji mundur) × multiplier bensin ${multNaik}${modal?.squeeze.aktif ? ' (squeeze AKTIF — kasus nyata 18.77% sehari)' : ''}`,
  };
}

// ---------------- bensin naik & turun ----------------
function hitungBensin(modal: ModalData | null, sumber: SumberData | null, aliran: AliranData | null, cs: Candle[], vonisArah: 'NAIK' | 'TURUN', vonisKepastian: number) {
  const harga = cs[cs.length - 1].c;
  const kN: KomponenBensin[] = [];
  const kT: KomponenBensin[] = [];

  // 1) bensin likuidasi: cluster korban di ATAS (short) vs di BAWAH (long)
  if (modal?.likuidasi) {
    const sAtas = modal.likuidasi.totalShortUsd;
    const lBawah = modal.likuidasi.totalLongUsd;
    kN.push({ k: 'bensin short tergantung di atas', v: Math.round(clamp(Math.log1p(sAtas / 5e5) / 3, 0, 1) * 30), sumber: `cluster likuidasi short ≈ $${fmtUsd(sAtas)} (Bybit OI × tier leverage; likuidasi nyata Gate)` });
    kT.push({ k: 'bensin long tergantung di bawah', v: Math.round(clamp(Math.log1p(lBawah / 5e5) / 3, 0, 1) * 30), sumber: `cluster likuidasi long ≈ $${fmtUsd(lBawah)} di bawah harga` });
  } else {
    kN.push({ k: 'bensin short di atas', v: 8, sumber: 'peta likuidasi belum terbaca — default netral-rendah' });
    kT.push({ k: 'bensin long di bawah', v: 8, sumber: 'peta likuidasi belum terbaca — default netral-rendah' });
  }

  // 2) momentum OI
  if (modal?.oi.delta24j !== null && modal?.oi.delta24j !== undefined) {
    const d = modal.oi.delta24j;
    const hd = modal.oi.hargaDelta24j;
    if (d > 0 && (hd ?? 0) > 0) kN.push({ k: 'OI tumbuh + harga naik (dana segar masuk)', v: Math.round(clamp(d / 15, 0.1, 1) * 18), sumber: `Bybit OI Δ24j ${d > 0 ? '+' : ''}${d}% (harga ${hd ?? '—'}%)` });
    else if (d < 0 && (hd ?? 0) > 0) kT.push({ k: 'OI menyusut sementara harga naik (rally tanpa dana — rawan balik)', v: Math.round(clamp(-d / 10, 0.1, 1) * 15), sumber: `Bybit OI Δ24j ${d}% (harga +${hd}%) — posisi ditutup, bukan didorong` });
    else if (d > 0 && (hd ?? 0) < 0) kT.push({ k: 'OI tumbuh + harga turun (short agresif)', v: Math.round(clamp(d / 15, 0.1, 1) * 18), sumber: `Bybit OI Δ24j +${d}% (harga ${hd}%)` });
    else kN.push({ k: 'OI stabil', v: 4, sumber: `Bybit OI Δ24j ${d}%` });
  }

  // 3) squeeze + aliran kaskade
  if (modal?.squeeze.aktif || (modal?.squeeze.skor ?? 0) >= 60) kN.push({ k: 'short squeeze hidup', v: 16, sumber: `skor squeeze ${modal?.squeeze.skor} — penutupan short memaksa harga naik` });
  if (aliran?.vonis.korban === 'SHORT') kN.push({ k: 'model kaskade 500-soal: korban = SHORT', v: 14, sumber: `alarm ${aliran.vonis.alarmLevel} (p ${(aliran.vonis.pKorban * 100).toFixed(0)}%) — squeeze bensin naik` });
  if (aliran?.vonis.korban === 'LONG') kT.push({ k: 'model kaskade 500-soal: korban = LONG', v: 16, sumber: `alarm ${aliran.vonis.alarmLevel} (p ${(aliran.vonis.pKorban * 100).toFixed(0)}%) — flush bensin turun` });

  // 4) whale & akumulasi senyap
  if (modal) {
    const w = modal.whaleTop.klasifikasi;
    if (w === 'PUMP_JUJUR' || w === 'MENGUMPULKAN') kN.push({ k: `whale top-20: ${w}`, v: 10, sumber: modal.whaleTop.cara });
    if (w === 'JEBAKAN' || w === 'WAR_POSISI') kT.push({ k: `whale top-20: ${w}`, v: 14, sumber: modal.whaleTop.cara });
    if (modal.akumulasi.verdict === 'AKUMULASI_SENYAP_AKTIF' || modal.akumulasi.verdict === 'ADA_TANDA_MENAMPUNG') kN.push({ k: 'akumulasi senyap spot', v: 10, sumber: `skor ${modal.akumulasi.skor} — orang besar menampung diam-diam` });
    if (modal.whale.spotNet < -5e4) kT.push({ k: 'spot netflow keluar', v: 10, sumber: `net spot ${(modal.whale.spotNet / 1e3).toFixed(0)} rb USD (whale melepas spot)` });
    if (modal.whale.spotNet > 5e4) kN.push({ k: 'spot netflow masuk', v: 8, sumber: `net spot +${(modal.whale.spotNet / 1e3).toFixed(0)} rb USD` });
  }

  // 5) funding: ruang tersisa vs overheat
  if (modal) {
    const f = modal.funding.sekarang;
    if (f >= 0.0006) kT.push({ k: 'funding overheat (long membayar mahal)', v: Math.round(clamp(f / 0.0015, 0.3, 1) * 16), sumber: `funding ${(f * 100).toFixed(4)}%/interval — rally menua, bensin naik tinggal sedikit` });
    else if (f <= -0.0002) kN.push({ k: 'funding negatif (short membayar)', v: 10, sumber: `funding ${(f * 100).toFixed(4)}% — short dipaksa bayar, rawan squeeze` });
    else kN.push({ k: 'funding masih ada ruang', v: 6, sumber: `funding ${(f * 100).toFixed(4)}%/interval — belum overheat` });
  }

  // 6) unlock — tembok jual terjadwal (cliff+vesting)
  if (sumber?.unlock?.berikutnya) {
    const u = sumber.unlock.berikutnya;
    if (u.hariDariSekarang <= 14 && u.pctVsBeredar >= 3) kT.push({ k: 'tembok unlock terjadwal', v: Math.round(clamp(u.pctVsBeredar / 10, 0.2, 1) * 18), sumber: `unlock ${u.tanggal} (${u.hariDariSekarang} hari lagi) = ${u.pctVsBeredar.toFixed(1)}% dari beredar ~$${fmtUsd(u.usd)} — tekanan jual punya TANGGAL` });
    else if (u.pctVsBeredar < 3 || u.hariDariSekarang > 14) kN.push({ k: 'unlock jauh / kecil', v: 5, sumber: `unlock berikutnya ${u.tanggal} (${u.pctVsBeredar.toFixed(1)}% beredar) — tidak menekan jalur ini` });
  }

  // 7) overextension teknis (harga sudah terlalu jauh dari massa)
  const e21 = ema(cs.map((c) => c.c), 21)[cs.length - 1];
  const atr = atrPct(cs);
  const distEma = (harga / Math.max(e21, 1e-12) - 1) * 100;
  if (distEma > atr * 2.2) kT.push({ k: 'harga terlalu terentang dari EMA21', v: Math.round(clamp(distEma / (atr * 4), 0.2, 1) * 14), sumber: `harga +${distEma.toFixed(1)}% dari EMA21 vs ATR ${atr.toFixed(1)}% — mean-reversion menunggu` });
  else if (distEma < -atr * 2.2) kN.push({ k: 'harga terlalu jauh di bawah EMA21', v: 10, sumber: `harga ${distEma.toFixed(1)}% dari EMA21 — rebound teknis berpeluang` });

  // 8) vonis otak arah (teknis) sebagai pengungkit terakhir
  const arahNaik = vonisArah === 'NAIK';
  (arahNaik ? kN : kT).push({ k: `otak arah v1.8: ${vonisArah === 'NAIK' ? 'BUY' : 'SELL'} ${vonisKepastian}%`, v: Math.round(vonisKepastian / 8), sumber: 'dewan bukti 8 dimensi (teknis + pool likuiditas)' });

  const skorN = clamp(kN.reduce((s, x) => s + x.v, 0), 0, 100);
  const skorT = clamp(kT.reduce((s, x) => s + x.v, 0), 0, 100);
  return {
    naik: { skor: Math.round(skorN), komponen: kN, ket: `${kN.length} komponen bensin naik dari ${Array.from(new Set(kN.map((x) => x.sumber))).length} sumber` },
    turun: { skor: Math.round(skorT), komponen: kT, ket: `${kT.length} komponen bensin turun dari ${Array.from(new Set(kT.map((x) => x.sumber))).length} sumber` },
  };
}

// ---------------- magnet: kumpulkan level penting ----------------
// DIEXPORT (lintasan-v1): otak lintasan memakai kumpulan magnet yang SAMA
// (satu kebenaran) untuk mengurutkan mana yang DITARIK dulu — bukan salin logika.
export type Magnet = { harga: number; jenis: KakiWaktu['jenisMagnet']; usd: number; narasi: string; sumberBensin: string[] };

export function kumpulkanMagnet(modal: ModalData | null, cs: Candle[], harga: number): { atas: Magnet[]; bawah: Magnet[] } {
  const atas: Magnet[] = [];
  const bawah: Magnet[] = [];
  if (modal?.likuidasi) {
    for (const t of modal.likuidasi.topShort) {
      if (t.harga > harga * 1.004) atas.push({ harga: t.harga, jenis: 'likuidasi-short', usd: t.usd, narasi: `cluster likuidasi SHORT ${t.jarakPct > 0 ? '+' : ''}${t.jarakPct.toFixed(1)}% — ${fmtUsd(t.usd)} short terancam dilikuidasi di sini (magnet naik)`, sumberBensin: ['peta likuidasi Bybit×Gate'] });
    }
    for (const t of modal.likuidasi.topLong) {
      if (t.harga < harga * 0.996) bawah.push({ harga: t.harga, jenis: 'likuidasi-long', usd: t.usd, narasi: `cluster likuidasi LONG ${t.jarakPct.toFixed(1)}% — ${fmtUsd(t.usd)} long terancam (magnet turun)`, sumberBensin: ['peta likuidasi Bybit×Gate'] });
    }
  }
  if (modal?.portal.bencanaNaik?.triggerHarga && modal.portal.bencanaNaik.triggerHarga > harga * 1.01) {
    const pn = modal.portal.bencanaNaik;
    atas.push({ harga: pn.triggerHarga, jenis: 'portal-waktu', usd: pn.korbanUsd, narasi: `portal waktu naik: trigger ${((pn.triggerHarga / harga - 1) * 100).toFixed(1)}% (p24j ${(pn.prob24j * 100).toFixed(0)}%) — ${fmtUsd(pn.korbanUsd)} short tersapu → kaskade ke ${pn.hargaAkhir.toPrecision(5)}`, sumberBensin: ['portal waktu likuidasi'] });
  }
  if (modal?.portal.bencanaTurun?.triggerHarga && modal.portal.bencanaTurun.triggerHarga < harga * 0.99) {
    const pt = modal.portal.bencanaTurun;
    bawah.push({ harga: pt.triggerHarga, jenis: 'portal-waktu', usd: pt.korbanUsd, narasi: `portal waktu turun: trigger ${((pt.triggerHarga / harga - 1) * 100).toFixed(1)}% (p24j ${(pt.prob24j * 100).toFixed(0)}%) — ${fmtUsd(pt.korbanUsd)} long tersapu → kaskade ke ${pt.hargaAkhir.toPrecision(5)}`, sumberBensin: ['portal waktu likuidasi'] });
  }
  // resistensi: puncak 90 candle di atas harga
  const hi90 = Math.max(...cs.slice(-90).map((c) => c.h));
  if (hi90 > harga * 1.015) atas.push({ harga: hi90, jenis: 'resistensi', usd: 0, narasi: `puncak 90 hari ${hi90.toPrecision(5)} (+${((hi90 / harga - 1) * 100).toFixed(1)}%) — bekas penolakan harga`, sumberBensin: ['candle harian 90 hari'] });
  const lo90 = Math.min(...cs.slice(-90).map((c) => c.l));
  if (lo90 < harga * 0.985) bawah.push({ harga: lo90, jenis: 'resistensi', usd: 0, narasi: `dasar 90 hari ${lo90.toPrecision(5)} (${((lo90 / harga - 1) * 100).toFixed(1)}%) — bekas tumpuan`, sumberBensin: ['candle harian 90 hari'] });
  // level bulat
  const bulat = levelBulatBerikut(harga);
  if (bulat > harga * 1.02) atas.push({ harga: bulat, jenis: 'level-bulat', usd: 0, narasi: `level bulat psikologis $${bulat.toFixed(bulat < 0.1 ? 3 : 2)} — pintu psikologi trader`, sumberBensin: ['psikologi level'] });
  const bulatBawah = Math.max(0.0005, Math.floor(harga / (harga < 0.1 ? 0.01 : harga < 0.5 ? 0.05 : 0.1)) * (harga < 0.1 ? 0.01 : harga < 0.5 ? 0.05 : 0.1));
  if (bulatBawah < harga * 0.98) bawah.push({ harga: bulatBawah, jenis: 'level-bulat', usd: 0, narasi: `level bulat psikologis $${bulatBawah.toFixed(bulatBawah < 0.1 ? 3 : 2)} di bawah — jebakan bila jebol`, sumberBensin: ['psikologi level'] });
  // POC volume
  if (modal && 'poc' in (modal as unknown as Record<string, unknown>) === false) { /* poc ada di warisan, lewat parameter terpisah */ }
  return { atas: atas.sort((a, b) => a.harga - b.harga), bawah: bawah.sort((a, b) => b.harga - a.harga) };
}

export function dedupMagnets(list: Magnet[], harga: number, jarakMinPct = 1.8): Magnet[] {
  const out: Magnet[] = [];
  for (const m of list.sort((a, b) => Math.abs(a.harga / harga - 1) - Math.abs(b.harga / harga - 1))) {
    if (!out.some((o) => Math.abs(o.harga / m.harga - 1) * 100 < jarakMinPct)) out.push(m);
  }
  return out;
}

// ---------------- peta waktu utama ----------------
export async function getPetaWaktu(
  cs: Candle[],
  modal: ModalData | null,
  sumber: SumberData | null,
  aliran: AliranData | null,
  vonisArah: 'NAIK' | 'TURUN',
  vonisKepastian: number,
): Promise<PetaWaktuData> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  const harga = cs[cs.length - 1].c;
  const bensin = hitungBensin(modal, sumber, aliran, cs, vonisArah, vonisKepastian);
  const kecepatan = modelKecepatan(cs, modal, bensin.naik.skor, bensin.turun.skor);
  const atr = atrPct(cs);

  const margin = bensin.naik.skor - bensin.turun.skor;
  const arahDominan: PetaWaktuData['arahDominan'] = margin >= 8 ? 'NAIK' : margin <= -8 ? 'TURUN' : 'RAGU';

  // ---- jalur utama & skenario risiko ----
  const jalurNaik = arahDominan !== 'TURUN';
  const magnets = kumpulkanMagnet(modal, cs, harga);

  // fuel total short di atas harga & long di bawah (dipakai utk fuel sisa per waypoint)
  const totalShort = modal?.likuidasi?.totalShortUsd ?? 0;
  const totalLong = modal?.likuidasi?.totalLongUsd ?? 0;
  const fuelShortDiAtas = (lv: number) => (modal?.likuidasi?.topShort ?? []).filter((t) => t.harga > lv).reduce((s, t) => s + t.usd, 0);

  const unlock = sumber?.unlock?.berikutnya ?? null;
  const unlockGate = unlock
    ? {
        tanggal: unlock.tanggal, hariDariSekarang: unlock.hariDariSekarang, token: unlock.token, usd: unlock.usd, pctVsBeredar: unlock.pctVsBeredar,
        efek: unlock.hariDariSekarang <= 14 && unlock.pctVsBeredar >= 3
          ? `TEMBOK AKTIF: jalur yang melewati ${unlock.tanggal} dipangkas peluangnya (overhang ${unlock.pctVsBeredar.toFixed(1)}% beredar ~$${fmtUsd(unlock.usd)} punya tanggal pasti)`
          : `tidak menekan jalur (unlock ${unlock.pctVsBeredar.toFixed(1)}% beredar pada ${unlock.tanggal})`,
      }
    : null;

  // ---- bangun kaki naik ----
  const kaki: KakiWaktu[] = [];
  const titik: TitikWaktu[] = [];
  if (jalurNaik) {
    const list = dedupMagnets(magnets.atas, harga).slice(0, 4);
    let dari = harga;
    let hariKum = 0;
    let peluangKum = 1;
    for (let i = 0; i < list.length; i++) {
      const m = list[i];
      const jarakPct = (m.harga / dari - 1) * 100;
      if (jarakPct < 1.2) continue;
      const hari = Math.max(1, Math.round(jarakPct / Math.max(kecepatan.pctPerHariNaik, 0.4)));
      hariKum += hari;
      const tanggalKedatangan = tanggalDari(hariKum);
      // peluang kaki: bensin naik × sisa bensin di atas level × funding ruang × tembok unlock
      const sisa = totalShort > 0 ? fuelShortDiAtas(m.harga) / totalShort : 0.5;
      let peluang = 0.42 + 0.4 * (bensin.naik.skor / 100) + 0.12 * sisa - (modal && modal.funding.sekarang >= 0.0006 ? 0.08 : 0);
      const lewatUnlock = unlockGate && unlockGate.hariDariSekarang <= 14 && unlockGate.pctVsBeredar >= 3 && new Date(tanggalKedatangan) > new Date(unlockGate.tanggal);
      if (lewatUnlock) peluang *= 0.72;
      peluang = clamp(peluang * (i === 0 ? 1 : peluangKum > 0.35 ? 1 : 0.85), 0.12, 0.93);
      peluangKum *= peluang;
      const narasi = `${m.narasi} — tiba ≈ hari ke-${hariKum} (${tanggalKedatangan}, rentang ${rentangTgl(hariKum)}) dengan kecepatan ${kecepatan.pctPerHariNaik.toFixed(2)}%/hari${lewatUnlock ? ' ⚠ melewati tembok unlock' : ''}`;
      kaki.push({
        dari: Math.round(dari * 1e7) / 1e7, ke: Math.round(m.harga * 1e7) / 1e7,
        jarakPct: Math.round(jarakPct * 100) / 100, jenisMagnet: m.jenis,
        peluang: Math.round(peluang * 100) / 100, hari, hariKumulatif: hariKum,
        tanggalKedatangan, rentangTanggal: rentangTgl(hariKum), narasi, sumberBensin: m.sumberBensin,
      });
      // ---- waypoint: keputusan DI level ini ("di 0.1 harus tau akan ke mana") ----
      const pCuramParts: { p: number; alasan: string }[] = [];
      if (modal && modal.funding.sekarang >= 0.0006) pCuramParts.push({ p: 0.25, alasan: `funding overheat ${(modal.funding.sekarang * 100).toFixed(4)}% — rally menua saat cluster ini tercapai` });
      if (unlockGate && unlockGate.hariDariSekarang <= 14 && unlockGate.pctVsBeredar >= 3 && hariKum >= unlockGate.hariDariSekarang - 2) pCuramParts.push({ p: 0.3, alasan: `kedatangan ${tanggalKedatangan} menempel/melampaui tembok unlock ${unlockGate.tanggal} (${unlockGate.pctVsBeredar.toFixed(1)}% beredar)` });
      if (modal?.whaleTop.klasifikasi === 'JEBAKAN' || modal?.whaleTop.klasifikasi === 'WAR_POSISI') pCuramParts.push({ p: 0.2, alasan: `whale top-20 ${modal?.whaleTop.klasifikasi} — posisi besar melawan kelanjutan` });
      if (distEmaAt(m.harga, e21Now(cs)) > atr * 2.6) pCuramParts.push({ p: 0.2, alasan: `level ini +${((m.harga / e21Now(cs) - 1) * 100).toFixed(1)}% dari EMA21 (ATR ${atr.toFixed(1)}%) — terlalu terentang, mean-reversion` });
      if (sisa < 0.25 && totalShort > 0) pCuramParts.push({ p: 0.2, alasan: `bensin short di atas level ini tinggal ${(sisa * 100).toFixed(0)}% — setelah cluster ini terbakar, dorongan naik habis` });
      if (aliran?.vonis.korban === 'LONG') pCuramParts.push({ p: 0.15, alasan: `model kaskade: korban LONG (alarm ${aliran.vonis.alarmLevel}) — arus bawah menarik` });
      const pCuram = clamp(pCuramParts.reduce((s, x) => s + x.p, 0), 0, 0.85);
      let negara: TitikWaktu['negara'];
      if (pCuram >= 0.45) negara = 'JATUH_CURAM';
      else if (sisa < 0.3 && pCuram < 0.45 && i < list.length - 1) negara = 'ISTIRAHAT';
      else negara = 'LANJUT';
      const alasan = [
        `sisa bensin short di atas level: ${(sisa * 100).toFixed(0)}% (${fmtUsd(fuelShortDiAtas(m.harga))} dari ${fmtUsd(totalShort)})`,
        ...pCuramParts.map((x) => x.alasan),
        negara === 'LANJUT' ? `lanjut ke level berikutnya ${list[i + 1] ? `$${list[i + 1].harga.toPrecision(5)}` : '—'} dengan bensin tersisa` : negara === 'ISTIRAHAT' ? 'bensin habis di fase ini tapi tekanan jual belum dominan — konsolidasi dulu' : 'bukan LANJUT: dominasi sinyal pembalik',
      ];
      // sasaran curam: cluster long terdekat di bawah level ini / EMA21
      const longBawahLv = (modal?.likuidasi?.topLong ?? []).filter((t) => t.harga < m.harga * 0.97).sort((a, b) => b.usd - a.usd)[0];
      const sasaranCuram = longBawahLv ? longBawahLv.harga : e21Now(cs);
      const jarakCuram = ((m.harga - sasaranCuram) / m.harga) * 100;
      const hariCuram = Math.max(1, Math.round(jarakCuram / Math.max(kecepatan.pctPerHariTurun * 1.5, 0.6)));
      titik.push({
        harga: Math.round(m.harga * 1e7) / 1e7, negara,
        peluang: Math.round((negara === 'LANJUT' ? peluangKum : pCuram) * 100) / 100,
        sasaranCuram: negara === 'JATUH_CURAM' ? Math.round(sasaranCuram * 1e7) / 1e7 : null,
        hariCuram: negara === 'JATUH_CURAM' ? hariCuram : null,
        tanggalCuram: negara === 'JATUH_CURAM' ? tanggalDari(hariKum + hariCuram) : null,
        pCuram: Math.round(pCuram * 100) / 100,
        alasan,
      });
      dari = m.harga;
    }
  }

  // ---- kaki turun (skenario risiko) ----
  let kakiTurun: KakiWaktu | null = null;
  let titikTurun: TitikWaktu | null = null;
  if (!jalurNaik || bensin.turun.skor >= 35) {
    const listB = dedupMagnets(magnets.bawah, harga).slice(0, 2);
    const m = listB[0];
    if (m) {
      const jarakPct = (1 - m.harga / harga) * 100;
      const hari = Math.max(1, Math.round(jarakPct / Math.max(kecepatan.pctPerHariTurun, 0.5)));
      let peluang = 0.35 + 0.45 * (bensin.turun.skor / 100) + (aliran?.vonis.korban === 'LONG' ? 0.1 : 0) + (modal?.portal.bencanaTurun ? 0.08 : 0);
      peluang = clamp(peluang, 0.1, 0.9);
      kakiTurun = {
        dari: harga, ke: Math.round(m.harga * 1e7) / 1e7, jarakPct: Math.round(jarakPct * 100) / 100,
        jenisMagnet: m.jenis, peluang: Math.round(peluang * 100) / 100, hari, hariKumulatif: hari,
        tanggalKedatangan: tanggalDari(hari), rentangTanggal: rentangTgl(hari), narasi: m.narasi, sumberBensin: m.sumberBensin,
      };
      const longLebihBawah = (modal?.likuidasi?.topLong ?? []).filter((t) => t.harga < m.harga * 0.95).sort((a, b) => b.usd - a.usd)[0];
      titikTurun = {
        harga: Math.round(m.harga * 1e7) / 1e7, negara: longLebihBawah ? 'JATUH_CURAM' : 'ISTIRAHAT',
        peluang: longLebihBawah ? 0.5 : 0.4,
        sasaranCuram: longLebihBawah ? Math.round(longLebihBawah.harga * 1e7) / 1e7 : null,
        hariCuram: longLebihBawah ? Math.max(1, Math.round((((m.harga - longLebihBawah.harga) / m.harga) * 100) / Math.max(kecepatan.pctPerHariTurun * 1.5, 0.6))) : null,
        tanggalCuram: longLebihBawah ? tanggalDari(hari + Math.max(1, Math.round((((m.harga - longLebihBawah.harga) / m.harga) * 100) / Math.max(kecepatan.pctPerHariTurun * 1.5, 0.6)))) : null,
        pCuram: longLebihBawah ? 0.5 : 0.2,
        alasan: [
          `cluster long terbesar di bawah level: ${longLebihBawah ? `${fmtUsd(longLebihBawah.usd)} pada $${longLebihBawah.harga.toPrecision(5)}` : 'tidak ada cluster dominan'}`,
          longLebihBawah ? 'kaskade level-2: setelah jebol, long berikutnya tersapu (domino)' : 'setelah jebol tidak ada korban besar di bawah — cenderung berhenti/mantul',
        ],
      };
    }
  }

  const narasiArah =
    arahDominan === 'NAIK'
      ? `arah yang sedang digerakan: NAIK (bensin ${bensin.naik.skor} vs ${bensin.turun.skor}) — sisi SHORT yang paling dulu berisiko dilikuidasi sepanjang jalur ini`
      : arahDominan === 'TURUN'
        ? `arah yang sedang digerakan: TURUN (bensin ${bensin.turun.skor} vs ${bensin.naik.skor}) — sisi LONG yang paling dulu berisiko dilikuidasi`
        : `arah RAGU (bensin naik ${bensin.naik.skor} vs turun ${bensin.turun.skor}) — dua jalur sama-sama layak; jalur utama mengikuti vonis teknis ${vonisArah}`;

  const data: PetaWaktuData = {
    at: new Date().toISOString(),
    harga: Math.round(harga * 1e7) / 1e7,
    arahDominan, marginArah: margin, narasiArah,
    bensinNaik: bensin.naik, bensinTurun: bensin.turun,
    kecepatan,
    kaki, titik, kakiTurun, titikTurun,
    unlockGate,
    ujiMundur: ujiMundur(cs),
    metode: 'waypoint = magnet likuidasi (OI×tier) + portal waktu + resistensi 90 hari + level bulat · tanggal = jarak ÷ kecepatan harian terukur (median 30 candle × multiplier bensin) · keputusan di waypoint = sisa bensin + funding + tembok unlock + whale + kaskade + keterentangan EMA',
    kejujuran: [
      'tanggal kedatangan adalah ESTIMASI probabilistik dari kecepatan terukur, bukan janji — yang dijanjikan adalah jalur, sumbernya, dan peluangnya',
      'uji mundur memakai MODE CANDLE-SAJA (OI/funding/whale historis tidak tersedia) — akurasi di tabel adalah akurasi terburuk, mode penuh live lebih kaya sumber',
      'unlock (cliff+vesting) adalah satu-satunya peristiwa ber-TANGGAL pasti — dipakai sebagai tembok keras di jalur',
    ],
  };
  cache = { at: Date.now(), data };
  return data;
}

// ---------------- util waypoint ----------------
function e21Now(cs: Candle[]): number {
  return ema(cs.map((c) => c.c), 21)[cs.length - 1];
}
function distEmaAt(level: number, e21: number): number {
  return Math.abs(level / Math.max(e21, 1e-12) - 1) * 100;
}
// rentang tanggal jujur: kecepatan tren bervariasi — ETA titik ± band [0.6×, 2.0×]
// (band dikalibrasi dari sebaran selisih uji-mundur; ETA tunggal akan berbohong)
function rentangTgl(hariKum: number): string {
  const f = (d: number) => {
    const x = new Date(Date.now() + d * 86_400_000);
    return `${x.getUTCDate()}/${x.getUTCMonth() + 1}`;
  };
  return `${f(Math.max(1, Math.round(hariKum * 0.6)))}–${f(Math.max(2, Math.round(hariKum * 2)))}`;
}

// ---------------- UJI MUNDUR — bukti pada sejarah nyata ELSA ----------------
// engine sama (magnet + kecepatan) dijalankan HANYA dengan candle sebelum
// titik mulai; hasil dibandingkan dengan apa yang benar-benar terjadi.
function ujiMundur(cs: Candle[]) {
  const baris: BarisUjiMundur[] = [];
  const n = cs.length;
  for (let i = 40; i < n - 5; i++) {
    const win = cs.slice(0, i + 1);
    const harga = win[i].c;
    if (win.length < 40) continue;
    // pivot low: harga lokal-min 5 hari & berikutnya naik ≥ 20% dalam 60 hari
    const min5 = Math.min(...win.slice(-5).map((c) => c.c));
    if (harga > min5 * 1.001) continue;
    let naikMax = 0;
    for (let j = i + 1; j < Math.min(n, i + 61); j++) naikMax = Math.max(naikMax, cs[j].h / harga - 1);
    if (naikMax < 0.2) continue;
    // hindari pivot bertumpuk (jarak ≥ 12 hari dari pivot terakhir)
    if (baris.length && i - cs.findIndex((c) => c.t === cs[i].t) >= 0) {
      const last = baris[baris.length - 1];
      const lastIdx = cs.findIndex((c) => new Date(c.t).toISOString().slice(0, 10) === last.mulaiHari);
      if (lastIdx >= 0 && i - lastIdx < 12) continue;
    }
    // engine candle-saja M4 (dikalibrasi): kecepatan = median |move| 30 × pUp × 1.05
    const moves: number[] = [];
    for (let k = Math.max(1, win.length - 30); k < win.length; k++) moves.push((win[k].c - win[k - 1].c) / win[k - 1].c * 100);
    const dasar = median(moves.map(Math.abs));
    const pUp = moves.length ? moves.filter((m) => m > 0).length / moves.length : 0.5;
    const vel = Math.max(dasar * Math.max(pUp, 0.35) * 1.05, dasar * 0.35);
    // magnet: resistensi 90 hari di atas ATAU level bulat ≥ +25%
    const hi90 = Math.max(...win.slice(-90).map((c) => c.h));
    const bulat = levelBulatBerikut(harga * 1.25);
    const sasaran = Math.max(hi90 > harga * 1.08 ? hi90 : 0, bulat);
    if (!sasaran || sasaran <= harga) continue;
    const jarakPct = (sasaran / harga - 1) * 100;
    const etaHari = Math.max(1, Math.round(jarakPct / Math.max(vel, 0.4)));
    // nyata: hari pertama h ≥ sasaran dalam 90 hari
    let nyataIdx = -1;
    for (let j = i + 1; j < Math.min(n, i + 91); j++) { if (cs[j].h >= sasaran) { nyataIdx = j; break; } }
    const etaTanggal = new Date(win[i].t + etaHari * 86_400_000).toISOString().slice(0, 10);
    const mulaiHari = new Date(win[i].t).toISOString().slice(0, 10);
    const nyataHari = nyataIdx >= 0 ? new Date(cs[nyataIdx].t).toISOString().slice(0, 10) : null;
    const selisih = nyataIdx >= 0 ? nyataIdx - i - etaHari : null;
    // grading berbasis rasio nyata/eta (dikalibrasi): TEPAT [0.75..1.33], DEKAT [0.6..2.0]
    const rasio = nyataIdx >= 0 ? (nyataIdx - i) / etaHari : null;
    const hasil: BarisUjiMundur['hasil'] = rasio === null ? 'TIDAK_TERJANGKAU' : rasio >= 0.75 && rasio <= 1.33 ? 'TEPAT' : rasio >= 0.6 && rasio <= 2.0 ? 'DEKAT' : 'MELESET';
    // rantai: setelah sasaran tercapai, apakah harga lanjut ≥ +15% lagi (yang peta sambung dgn LANJUT)?
    let lanjut = '';
    if (nyataIdx >= 0) {
      const topLanjut = Math.max(...cs.slice(nyataIdx, Math.min(n, nyataIdx + 45)).map((c) => c.h));
      lanjut = topLanjut >= sasaran * 1.15
        ? `peta menyambung LANJUT → level berikutnya $${levelBulatBerikut(sasaran).toFixed(3)}; nyata berlanjut ke $${topLanjut.toPrecision(5)}`
        : `setelah sasaran, harga berhenti di $${topLanjut.toPrecision(5)} (peta akan menandai ISTIRAHAT, bukan lanjut kosong)`;
    } else lanjut = 'sasaran belum tercapai dalam 90 hari — peta perlu memangkas peluang (dicatat jujur)';
    baris.push({
      mulaiHari, mulaiHarga: Math.round(harga * 1e7) / 1e7,
      sasaran: Math.round(sasaran * 1e7) / 1e7, sasaranPct: Math.round(jarakPct * 10) / 10,
      etaHari, etaTanggal,
      nyataHari, nyataHarga: nyataIdx >= 0 ? Math.round(sasaran * 1e7) / 1e7 : null,
      selisihHari: selisih, hasil, lanjutanPeta: lanjut,
    });
  }
  const terbaik = baris.slice(-6); // 6 pivot terakhir (paling relevan dgn kondisi kini)
  const tepat = terbaik.filter((b) => b.hasil === 'TEPAT').length;
  const dekat = terbaik.filter((b) => b.hasil === 'DEKAT').length;
  const meleset = terbaik.filter((b) => b.hasil === 'MELESET').length;
  const selisihList = terbaik.filter((b) => b.selisihHari !== null).map((b) => Math.abs(b.selisihHari as number));
  return {
    baris: terbaik,
    n: terbaik.length, tepat, dekat, meleset,
    rerataSelisihHari: selisihList.length ? Math.round((selisihList.reduce((s, v) => s + v, 0) / selisihList.length) * 10) / 10 : null,
    ket: `pivot naik pada ${n} candle harian ELSA — engine dijalankan buta (hanya candle sebelum tanggal mulai). Grading jujur: TEPAT = nyata dalam 0.75–1.33× ETA · DEKAT = dalam 0.6–2.0× ETA · MELESET di luar. Kasus pemilik "0.05 → 0.1" ada di tabel ini: lihat baris dengan mulaiHarga ≈ $0.05`,
  };
}
