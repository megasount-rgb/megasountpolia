'use client';

// ============================================================
// MICAPROFITA · ARENA ELSA — halaman utama satu koin ELSA/USDT.
// Seluruh doktrin & organ arena situs sumber diterapkan pada
// satu koin. Data hidup: Bybit spot.
// ============================================================
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DOCTRINE } from '@/lib/elsa/doctrine-data';
import type { AliranData } from '@/lib/elsa/aliran';
import type { PahamData } from '@/lib/elsa/paham';
import type { SumberData } from '@/lib/elsa/sumber';
import type { PetaWaktuData } from '@/lib/elsa/peta-waktu';
import type { LintasanJiwa } from '@/lib/elsa/lintasan';
import type { UjianElsaData, SesiUjian } from '@/lib/elsa/ujian';
import type { UpgradeData, DominoAktif } from '@/lib/elsa/upgrade';
import type { DenyutData, Detak } from '@/lib/elsa/denyut';
import type { OtonomiData, EntriOtonomi } from '@/lib/elsa/otonomi';
import type { BarisUjianMandiri } from '@/lib/elsa/arena';
import type { PausData } from '@/lib/elsa/paus';
import type { IgnisiData } from '@/lib/elsa/ignisi';
import type { Kasus } from '@/lib/elsa/kasus';
import type { DompetData } from '@/lib/elsa/dompet';
import {
  Kartu, JudulKecil, Badge, BarSkor, GrafikGaris, GrafikCandle, PanelModul, cariDoktrin, fmtHarga, pct, GaugeArc, GrafikBatang, PetaLikuidasi, type Modul,
} from '@/components/elsa/panels';

type Bukti = { id: string; label: string; vote: string; kekuatan: number; bobot: number; cara: string };
type Payload = Record<string, unknown> & {
  meta?: { nama: string; gen: string; otak: string; hari: string; sumber: string; harga: number; perubahan24j: number | null; selisihTutupMs: number; rezim: { rezim: string; ket: string }; rezimKet: string; candle: number; adaptasi: string[] };
  pilihan?: {
    arah: 'BUY' | 'SELL'; keyakinan: number; guard: string; guardAlasan: string | null;
    labelArah?: string; // BUY (LONG) / SELL (SHORT) — hukum P-7
    garis?: { arah: 'BUY' | 'SELL'; labelArah: string; entry: number; target: number; stop: number; targetPct: number; stopPct: number; sanityOk: boolean; posisiTarget: string; posisiStop: string; ket: string; dibuat: string }; // hukum P-6
    zamanRencana?: number | null; waktuKunciRencana?: string | null;
    penaltiRincian?: { dari: string; poin: number; teks: string }[];
    arahRencana?: 'BUY' | 'SELL' | null; kepastianRencana?: number | null;
    raw: { mom7: number; mom30: number; rsi: number; atrPct: number; volSurge: number; distHigh: number; emaAlign: number; close: number; m4h: number; qv: number | null };
    faktor: Record<string, number>; topReasons: string[];
    duties: { name: string; pass: boolean; note: string }[];
    policy: string[]; rezim: string;
    mem: { level: string; n: number; edge: number; hit: number } | null;
    debat: { serangan: { dari: string; teks: string }[]; bertahan: { dari: string; teks: string }[]; tekanan: number; vonis: string };
    kortex: { C: number; O: number; R: number; T: number; E: number; X: number; skor: number; rumus: string };
    warisan: { sigma24jPct: number; modelVol: string; persistensi: number; beta: number; r2Beta: number; poc: number; profilVolume: string; divRSI: string; breadthPct: number; kejutPump: boolean; ketKejut: string; posisiRentang: number; volSpike: number };
    rencana: { entry: number; stop: number; target: number; highAmbisius: number; stopPct: number; targetPct: number; ambisiusPct: number; pTarget: number; pStop: number; pAmbisius: number; targetMediana: boolean; netUntungPct: number; sumberTarget: string; ketGuard: string; powerMax: number } | null;
    praRegistrasi: { waktuKunci: string; horizon: string; feePct: number; sumber: string; hash: string; nomor: number; cek: string[] } | null;
    disiplinCuan: string | null;
  };
  mc?: { lintasan: number; langkah: number; seedHex: string; pTarget: number; pStop: number; pAmbisius: number; pNaik: number; medianaEkskursiPct: number; ket: string };
  vonis?: { versi: string; vonis: string; arah: string; kepastian: number; skorArah: number; konsensus: number; lapisan: string; bukti: Bukti[]; buktiKunci: string[]; alasan: string[]; eksekusi: { aksi: string; targetPct: number; stopPct: number; sumber: string } };
  kl?: { aksi: string; arah: string; pelajaran: string[]; alasan: string[]; pool: { jenis: string; side: string; level: number; sentuhan: number; swept: boolean; reclaimed: boolean; depthAtr: number; barsSince: number }; grab: { terjadi: boolean; post: string; cara: string }; gauntlet: { bullTrap: boolean; bearTrap: boolean; twoSisi: boolean; cara: string; deceitCount: number; deceitCara: string }; pd: { pump: boolean; pumpArah: string; pumpCara: string; dump: boolean; dumpCara: string; falseBreakout: boolean; fboCara: string; korbanPump: boolean }; aspek5: { stopHunt: boolean; falseBreakout: boolean; pumpDump: boolean; bearTrap: boolean; bullTrap: boolean; rangkaianUtuh: string } };
  bukuCuan?: { hari: number; entri: { hari: string; arah: string; hasil: string; via: string; netPct: number; r: number; rezim: string; keyakinan: number; zaman?: number }[]; berlangsung: { hari: string; arah: string; entry: number; target: number; stop: number; ambisius: number; hash: string; zaman?: number; waktuKunci?: string } | null; metrik: { netKumulatif: number; winRate: number | null; ekspektansi: number | null; maxDD: number; menang: number; kalah: number; kedaluwarsa: number; batal: number }; kejujuran: string; rezimRugi: Record<string, { rugi: number; total: number; eks: number }> };
  ledger?: { jumlah: number; verifikasi: { ok: boolean; jumlah: number }; terakhir: { hash: string; kunci: { nomor: number; simbol: string; arah: string; kepastian: number; waktu: string; prev: string } }[] };
  events?: { day: string; kind: string; text: string; at: string }[];
  ingatan?: { baris: { at: string; level: string; kind: string; text: string }[]; total: number };
  genome?: { generation: number; v2: string[]; logs: { at: string; text: string }[] };
  sellOn?: boolean;
  ujian?: { n: number; akurasi: number; netTotal: number; brier: number; gates: { id: string; label: string; pass: boolean; detail: string }[]; A: { n: number; akurasi: number }; B: { n: number; akurasi: number }; terakhir: { hari: string; vonis: string; kepastian: number; benar: boolean; netPct: number }[]; semua: { hari: string; vonis: 'BUY' | 'SELL'; kepastian: number; benar: boolean; netPct: number; harga: number; tutup: number; streak: number }[]; streak: { kini: number; terpanjang: number } };
  ujianDenyut?: DenyutData | null;
  pertumbuhan?: { agiPct: number; P: number; G: number; A: number; rank: { id: string; name: string; desc: string }; kurikulum: { id: string; lever: string; label: string; why: string; action: string; dAgiPp: number }[]; akurasi: number; ekspektansi: number };
  riwayatPertumbuhan?: { day: string; net: number; eq: number }[];
  doktrin?: { modul: { id: string; label: string; short: string; sections: number }[]; totalSeksi: number; papers: number };
  chart?: { t: string; o: number; h: number; l: number; c: number; v: number }[];
  modal?: { vonis: string; skor: number; drivePct: number; driveLabel: string; squeezeSkor: number; squeezeAktif: boolean; whaleBias: string; perpNet: number; spotNet: number; basisPct: number; ket: string; at: string; orangLong: number | null; orangShort: number | null; orangRasioLong: number | null; whaleTopKlasifikasi: string; whaleTopCara: string; dTopLong: number | null; dTopShort: number | null; akumulasiKlasifikasi: string; akumulasiSkor: number; sidikJumlah: number; leverageDominan: { long: number | null; short: number | null; dominanTier: number; nKaskade: number }; sensus: { venuePerp: number; venueSpot: number; totalOiUsd: number | null; totalVolUsd: number | null; estUniverseAkun: number | null; akunGateHold: number | null }; portalTurun: { dPct: number; triggerHarga: number; prob24j: number; korbanUsd: number; hargaAkhir: number } | null; portalNaik: { dPct: number; triggerHarga: number; prob24j: number; korbanUsd: number; hargaAkhir: number } | null } | null;
  aliran?: AliranData | null;
  paham?: PahamData | null;
  sumber?: SumberData | null;
  paus?: PausData | null;
  ignisi?: IgnisiData | null;
  kasus?: Kasus[] | null;
  rekonsiliasiPaus?: string | null;
  petaWaktu?: PetaWaktuData | null;
  lintasan?: LintasanJiwa | null;
  ujianElsa?: UjianElsaData | null;
  otonomi?: OtonomiData | null;
  domino?: {
    hari: string;
    fp: { v0: string; v1: string; v2: string; v3: string };
    konsultasi: { ada: boolean; versi: string; aksi: string; targetPct: number | null; stopPct: number | null; nKasus: number; netBukti: number; asal: string; contohHari: string | null };
    sikap: string; poin: number;
    aktifDomino: DominoAktif | null;
    dasarKepastian: number; keyakinanFinal: number;
    neuron: { at: string; sourceJumlah: number; nV0: number; nV1: number; validasi: { soal: number; dijawabKonteks: number; lulus: number; gagal: number; netPct: number }; knob: { bobotKonteks: number; penaltiKonflikMaks: number; adopsiRencana: boolean; dasar: string } } | null;
  } | null;
  upgrade?: UpgradeData | null;
  dompet?: DompetData | null;
  pantau?: { at: string; hukum: string[]; cekTerakhir: string | null; slotHariIni: number; zamanAktif: number | null; waktuKunciAktif: string | null; nRekalkHariIni: number; sejarah: { at: string; text: string }[]; status: string };
  selaras?: { at: string; statusUmum: 'SELARAS' | 'PERINGATAN' | 'KONFLIK' | 'KRITIS'; ringkas: string; cek: { id: string; label: string; status: 'LOLOS' | 'PERINGATAN' | 'GAGAL' | 'INFO'; detail: string }[]; konflikArah: { rencanaArah: 'BUY' | 'SELL'; vonisHidup: 'BUY' | 'SELL'; sentuhTarget: boolean; keputusan: string } | null } | null;
  aktifStatus?: { sentuhTarget: boolean; sentuhStop: boolean; jarakTargetPct: number; jarakStopPct: number; urutan: 'TARGET' | 'STOP' | null; urutanSumber: 'candle-1j' | 'konservatif' | '—'; jamTarget: string | null; jamStop: string | null; nCandle60: number; hasilSementara: 'CUAN_MENGAMBANG' | 'KALAH_SEMENTARA' | 'MENANG_SEMENTARA' | 'BERJALAN'; netSementaraPct: number; zaman?: number; waktuKunci?: string } | null;
};

type ModalFull = {
  at: string;
  meta: { sumber: string; catatan: string[] };
  harga: { spot: number; perp: number; basisPct: number; perubahan24jPct: number; high24h: number; low24h: number };
  oi: { sekarang: number | null; oiUsd: number | null; delta1j: number | null; delta4j: number | null; delta24j: number | null; hargaDelta1j: number | null; hargaDelta4j: number | null; hargaDelta24j: number | null; jumlahSampel: number; keterangan: string; riwayat?: { at: number; oi: number }[] };
  orang: { long: number | null; short: number | null; hold: number | null; rasioLong: number | null; bybitAkun: { buy: number | null; sell: number | null; sejarah1j: { at: number; buy: number }[] }; riwayat: { at: number; long: number; short: number }[]; sumber: string };
  whaleTop: { topLongSize: number | null; topShortSize: number | null; topLsrSize: number | null; topLongAkun: number | null; topShortAkun: number | null; dTopLong: number | null; dTopShort: number | null; klasifikasi: string; cara: string; sumber: string };
  liqReal: { at: number; longUsd: number; shortUsd: number; harga: number }[];
  tape: { harga: number; beliUsd: number; jualUsd: number; whaleBeliUsd: number; whaleJualUsd: number; n: number }[];
  korban: { tier: { lev: number; longHarga: number; longJarakPct: number; shortHarga: number; shortJarakPct: number }[]; berikutnya: { sisi: 'long' | 'short'; jarakPct: number; harga: number; usd: number; narasi: string }[]; formula: string };
  funding: { sekarang: number; rata12: number; intervalJam: number; tinggi: boolean; sejarah: { at: number; rate: number }[] };
  lsRasio: { buyRatio: number | null; sellRatio: number | null; sejarah: { at: number; buy: number; sell: number }[] };
  volume: { perp24jUsd: number; spot24jUsd: number; bagianFuturesPct: number };
  taker: { perpBuyPct: number; spotBuyPct: number };
  drive: { pct: number; label: string; komponen: { k: string; v: number }[]; ket: string };
  squeeze: { skor: number; aktif: boolean; ket: string };
  likuidasi: { bands: { jarakPct: number; harga: number; longUsd: number; shortUsd: number }[]; totalLongUsd: number; totalShortUsd: number; topLong: { harga: number; usd: number; jarakPct: number }[]; topShort: { harga: number; usd: number; jarakPct: number }[]; magnet: { sisi: string; harga: number; usd: number; jarakPct: number } | null; ket: string };
  whale: { ambangPerp: number; ambangSpot: number; perpNet: number; spotNet: number; perpTotal: number; spotTotal: number; bias: number; biasLabel: string; konfirmasiSpot: number; print: { at: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; size: number; price: number; usd: number }[]; cluster: { at: string; mkt: string; side: string; jumlah: number; usd: number }[] };
  sidikWhale?: { akun: { id: string; mkt: 'perp' | 'spot'; side: 'Buy' | 'Sell'; nPrint: number; usdTotal: number; ukuranTipe: number; terakhir: string; pola: string }[]; ket: string };
  sensus?: { venues: { venue: string; jenis: 'perp' | 'spot'; oiElsa: number | null; oiUsd: number | null; vol24jUsd: number | null; harga: number | null; funding: number | null; intervalJam: number | null; ratioLong: number | null; ratioShort: number | null; sumberRatio: string; akunLong: number | null; akunShort: number | null; akunNyata: boolean; estAkun: number | null; catatan: string }[]; totalOiUsd: number | null; totalOiElsa: number | null; totalVolUsd: number | null; akunGate: { long: number | null; short: number | null; hold: number | null }; estUniverseAkun: number | null; metodeEstimasi: string; ket: string };
  leverage?: { longDominan: number | null; shortDominan: number | null; dominanTier: number; nKaskade: number; kaskade: { at: number; dP: number; dOI: number; lev: number; sisi: 'long' | 'short' }[]; metode: string };
  portal?: { skenario: { sisi: 'long' | 'short'; dPct: number; triggerHarga: number; prob24j: number; prob72j: number; korbanUsd: number; estAkunKorban: number | null; tierMati: number[]; hargaAkhir: number; dAkhirPct: number; dominoKe: number; narasi: string }[]; bencanaTurun: { dPct: number; triggerHarga: number; prob24j: number; korbanUsd: number; estAkunKorban: number | null; tierMati: number[]; hargaAkhir: number; dAkhirPct: number; dominoKe: number; narasi: string } | null; bencanaNaik: { dPct: number; triggerHarga: number; prob24j: number; korbanUsd: number; estAkunKorban: number | null; tierMati: number[]; hargaAkhir: number; dAkhirPct: number; dominoKe: number; narasi: string } | null; sigma24jPct: number; metode: string };
  akumulasi?: { band: { harga: number; usdSenyap: number; whaleUsd: number; nJam: number; venue: string; deltaPct: number; verdict: 'SENYAP' | 'AGRESIF' | 'SEDAKAN' }[]; verdict: string; skor: number; ket: string; perVenue: { bybit: number; gate: number; upbit: number }; whaleTampung: { at: string; price: number; usd: number; band: number }[]; metode: string };
  vonis: { vonis: string; pedang?: 'BUNUH_SHORT' | 'BUNUH_LONG'; skor: number; alasan: string[]; implikasi: string; at: string };
  jiwa?: JiwaModalData | null;
  acara: { at: string; kind: string; text: string }[];
  memoriOI: { at: number; oi: number; price: number }[];
};

// JIWA OTAK MODAL — neuron keyakinan pondasi dana (janji yang bisa dibuktikan salah)
type JiwaKeyakinan = {
  id: string; at: string; jenis: string; arah: 'NAIK' | 'TURUN'; asal: 'VONIS' | 'PORTAL';
  hargaAwal: number; targetPct: number; stopPct: number; hargaTarget: number; hargaStop: number;
  deadlineAt: string; keyakinan: number;
  komponen: { skor: number; konsistensi: number; akurasiAturan: number; kesegaran: number; buktiNyata: number };
  dasar: string; aturan: string[];
  status: 'TERBUKA' | 'DITEPATI' | 'GAGAL' | 'MELEWAT';
  dijawabAt?: string; hargaAkhir?: number; cerita?: string;
};
type JiwaModalData = {
  at: string; denyutKe: number;
  keyakinanTerbuka: JiwaKeyakinan[];
  keyakinanSelesai: JiwaKeyakinan[];
  kalibrasi: { nTerjawab: number; nBenar: number; akurasi: number };
  kepahaman: { kunci: string; judul: string; n: number; benar: number; akurasi: number }[];
  modulasi: { jenis: string; skorSebelum: number; skorSesudah: number; akurasiAturan: number | null; nAturan: number; efek: 'DORONG' | 'DISKON' | 'BIASA'; ket: string } | null;
  kesaksian: { dari: string; vote: 'NAIK' | 'TURUN' | 'NETRAL'; kekuatan: number; cara: string }[];
  diary: { at: string; teks: string }[];
  vitamin: { aktif: boolean; teks: string };
  jujur: string[];
};

const VONIS_LABEL: Record<string, string> = {
  PUMP_NYATA: 'PUMP NYATA — dana segar',
  SHORT_SQUEEZE: 'SHORT SQUEEZE',
  JEBAKAN_BULL: 'JEBAKAN BULL',
  JEBAKAN_BEAR: 'JEBAKAN BEAR',
  AKUMULASI: 'AKUMULASI WHALE',
  DISTRIBUSI: 'DISTRIBUSI WHALE',
  BUNUH_SHORT: 'PEDANG: BUNUH SHORT',
  BUNUH_LONG: 'PEDANG: BUNUH LONG',
  NETRAL: 'NETRAL (sudah dihapus — legacy)',
};
const VONIS_TONE: Record<string, 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral'> = {
  PUMP_NYATA: 'hijau', AKUMULASI: 'hijau', SHORT_SQUEEZE: 'ungu', BUNUH_SHORT: 'hijau',
  JEBAKAN_BULL: 'merah', JEBAKAN_BEAR: 'merah', DISTRIBUSI: 'merah', BUNUH_LONG: 'merah', NETRAL: 'netral',
};
const fmtUsd = (v: number): string => {
  const a = Math.abs(v);
  const s = v < 0 ? '−' : '+';
  if (a >= 1e6) return `${s}${(a / 1e6).toFixed(2)} jt USD`;
  if (a >= 1e3) return `${s}${(a / 1e3).toFixed(1)} rb USD`;
  return `${s}${a.toFixed(0)} USD`;
};

const TABS = [
  { id: 'arena', label: 'Arena Hari Ini' },
  { id: 'dompet', label: 'Dompet $1000' },
  { id: 'ignisi', label: 'Radar Anti-Kecolongan' },
  { id: 'peta', label: 'Peta Waktu' },
  { id: 'arah', label: 'Kepastian Arah' },
  { id: 'modal', label: 'Fundamen Modal' },
  { id: 'aliran', label: 'Aliran & Ujian 500' },
  { id: 'paus', label: 'Radar Paus' },
  { id: 'sumber', label: 'Matriks Sumber' },
  { id: 'ujian', label: 'Ujian Mandiri' },
  { id: 'ujianelsa', label: 'Ujian ELSA 100' },
  { id: 'tumbuh', label: 'Pertumbuhan' },
  { id: 'briefing', label: 'Briefing Guru' },
  { id: 'upgrade', label: 'Ujian & Upgrade' },
  { id: 'otak', label: 'Otak & Ingatan' },
  { id: 'mozaik', label: 'Arsitektur Kognitif' },
  { id: 'nadi', label: 'Nadi & Gudang' },
  { id: 'guru', label: 'Ruang Guru' },
];

export default function HalamanArena() {
  const [data, setData] = useState<Payload | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [tab, setTab] = useState('arena');
  const [modulAktif, setModulAktif] = useState<string | null>(null);
  const [cari, setCari] = useState('');
  const [berjalan, setBerjalan] = useState(false);
  const [modalData, setModalData] = useState<ModalFull | null>(null);

  const muat = useCallback(async () => {
    setBerjalan(true);
    try {
      const r = await fetch('/api/elsa', { cache: 'no-store' });
      const j = (await r.json()) as Payload;
      if (j.error) setErr(String(j.error));
      else {
        setData(j);
        setErr(null);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'gagal memuat');
    }
    try {
      const r2 = await fetch('/api/elsa/modal', { cache: 'no-store' });
      const j2 = (await r2.json()) as ModalFull & { error?: string };
      if (!j2.error) setModalData(j2);
    } catch {
      /* otak modal menyusul di poll berikutnya */
    }
    setBerjalan(false);
  }, []);

  useEffect(() => {
    const tm = setTimeout(muat, 0);
    const iv = setInterval(muat, 90_000);
    return () => {
      clearTimeout(tm);
      clearInterval(iv);
    };
  }, [muat]);

  const hasilCari = useMemo(() => cariDoktrin(cari), [cari]);
  const modulDipilih: Modul | null = modulAktif ? ((DOCTRINE.MODULS.find((m) => m.id === modulAktif) ?? null) as unknown as Modul) : null;

  const p = data?.pilihan;
  const v = data?.vonis;
  const meta = data?.meta;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-full shrink-0 border-b border-white/10 bg-black/40 p-4 max-h-[55vh] overflow-y-auto lg:sticky lg:top-0 lg:h-screen lg:max-h-none lg:w-80 lg:border-b-0 lg:border-r">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            <h1 className="text-lg font-black tracking-tight">MICAPROFITA · ARENA ELSA</h1>
          </div>
          <p className="mb-4 text-[12px] text-neutral-400">Cyborg pemburu profit harian — difokus satu koin: <span className="font-semibold text-amber-300">ELSA/USDT</span> · data hidup Bybit</p>
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari doktrin, paper, teori…"
            className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-neutral-500 focus:border-amber-400/50"
          />
          {cari.trim().length >= 2 && (
            <div className="mb-4 max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-black/40 p-2">
              {hasilCari.length === 0 && <p className="p-2 text-xs text-neutral-500">Tidak ada hasil untuk “{cari}”.</p>}
              {hasilCari.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setModulAktif(null);
                    setTab(h.jenis === 'paper' ? 'guru' : tab);
                    setCari('');
                  }}
                  className="mb-1 block w-full rounded-md p-2 text-left hover:bg-white/5"
                >
                  <div className="text-[10px] uppercase tracking-wider text-amber-300/80">{h.jenis === 'paper' ? 'PAPER' : (h.modul ?? 'SEKSI')}</div>
                  <div className="text-xs font-semibold text-neutral-200">{h.judul}</div>
                  <div className="text-[11px] text-neutral-500">{h.kutip}</div>
                </button>
              ))}
            </div>
          )}
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">Modul Cyborg (doktrin sumber)</div>
          <nav className="mb-4 space-y-1">
            {DOCTRINE.MODULS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setModulAktif(modulAktif === m.id ? null : m.id)}
                className={`w-full rounded-lg border p-2 text-left transition ${modulAktif === m.id ? 'border-amber-400/50 bg-amber-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-neutral-500">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold">{m.label}</span>
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-neutral-500">{m.short}</div>
              </button>
            ))}
          </nav>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-[11px] text-neutral-400">
            <div className="mb-1 font-bold uppercase tracking-widest text-neutral-500">Statistik</div>
            <p>{DOCTRINE.MODULS.length} modul doktrin · {DOCTRINE.MODULS.reduce((s, m) => s + m.sections.length, 0)} seksi · {DOCTRINE.PAPERS.length} paper terkurasi · 1 koin tempur</p>
          </div>
        </aside>

        {/* ================= KONSOL ================= */}
        <main className="min-w-0 w-full flex-1 p-4">
          <header className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-amber-300">{meta?.nama ?? 'MICAPROFITA · ARENA ELSA'}</h2>
              {meta && <Badge tone={meta.rezim.rezim === 'TREND_NAIK' ? 'hijau' : meta.rezim.rezim === 'SIDEWAYS' ? 'amber' : 'merah'}>rezim {meta.rezim.rezim}</Badge>}
              {p && <Badge tone={p.arah === 'BUY' ? 'hijau' : 'merah'}>{p.labelArah ?? p.arah} {p.keyakinan}%</Badge>}
              <button onClick={muat} className="ml-auto rounded-md border border-white/15 px-3 py-1 text-xs text-neutral-300 hover:bg-white/5">
                {berjalan ? 'memuat…' : 'segarkan'}
              </button>
            </div>
            <p className="mt-1 text-[12px] text-neutral-400">
              {meta ? `${meta.gen} · otak ${meta.otak} · hari pertarungan ${meta.hari} UTC · ${meta.candle} candle harian · sumber ${meta.sumber}` : 'Menyiapkan arena…'}
            </p>
          </header>

          {err && <div className="mb-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300">Error: {err}</div>}
          {!data && !err && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="mb-2 text-sm text-neutral-300">Menyiapkan arena — membaca 200 candle ELSA/USDT + BTC iklim, menjalankan dewan bukti 8 dimensi…</p>
              <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-amber-400" />
              </div>
            </div>
          )}

          {data && (
            <>
              <nav className="mb-4 flex flex-wrap gap-1.5">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${tab === t.id ? 'border-amber-400/60 bg-amber-500/15 text-amber-200' : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:bg-white/5'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>

              {modulDipilih && (
                <Kartu className="mb-4 border-amber-400/30">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge tone="amber">doktrin sumber · {modulDipilih.label}</Badge>
                    <button onClick={() => setModulAktif(null)} className="text-xs text-neutral-400 hover:text-neutral-200">tutup</button>
                  </div>
                  <PanelModul modul={modulDipilih} />
                </Kartu>
              )}

              {/* ============ TAB: ARENA HARI INI ============ */}
              {tab === 'arena' && meta && p && (
                <div className="space-y-4">
                  {data.selaras && data.selaras.statusUmum !== 'SELARAS' && (
                    <div className={`rounded-xl border p-3 ${data.selaras.statusUmum === 'PERINGATAN' ? 'border-amber-400/50 bg-amber-500/10' : 'border-rose-400/60 bg-rose-500/10'}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={data.selaras.statusUmum === 'PERINGATAN' ? 'amber' : 'merah'}>audit selaras: {data.selaras.statusUmum}</Badge>
                        <span className="text-sm font-semibold text-neutral-100">{data.selaras.ringkas}</span>
                      </div>
                      {data.selaras.konflikArah && (
                        <p className="mt-2 text-[12px] leading-snug text-neutral-200"><b>putusan aturan tertulis:</b> {data.selaras.konflikArah.keputusan}</p>
                      )}
                      <p className="mt-1 text-[11px] text-neutral-400">14 pemeriksaan penuh ada di kartu AUDIT SELARAS di bawah — kontradiksi dilarang diam.</p>
                    </div>
                  )}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Kartu>
                      <JudulKecil>harga hidup</JudulKecil>
                      <div className="text-2xl font-black">${fmtHarga(meta.harga)}</div>
                      <div className={`text-sm ${ (meta.perubahan24j ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pct(meta.perubahan24j)} 24 jam</div>
                      <div className="mt-2 text-[11px] text-neutral-500">
                        horizon candle harian: tutup dalam {Math.max(0, Math.floor((meta.selisihTutupMs ?? 0) / 3_600_000))} j {Math.max(0, Math.floor(((meta.selisihTutupMs ?? 0) % 3_600_000) / 60_000))} m — <span className="text-amber-300">INFO saja, sistem TIDAK menunggu ini</span>
                      </div>
                      <div className="mt-1 text-[11px] font-semibold text-emerald-300">
                        pantau terus AKTIF: harga diadili tiap segarkan — TP/SL kena dinilai LANGSUNG + rekalkulasi mandiri otomatis (kena stop loss = candle telah berubah → metode lain dihitung sekarang, bukan tunggu besok; kena TP = catatan lalu hitung arah berikutnya). Bukan satu hari satu entry.
                      </div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>vonis otak — hidup, dihitung ulang tiap segarkan</JudulKecil>
                      <div className={`text-2xl font-black ${p.arah === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>{p.arah}</div>
                      <div className="text-sm text-neutral-300">keyakinan {p.keyakinan}% · konsensus {(Math.round((v?.konsensus ?? 0) * 100))}%</div>
                      {p.penaltiRincian && p.penaltiRincian.length > 0 && (
                        <div className="mt-1 text-[11px] text-neutral-500">dasar {v?.kepastian ?? p.keyakinan}% − penalti: {p.penaltiRincian.map((x) => `${x.dari} −${x.poin}`).join(', ')}</div>
                      )}
                      {data.selaras?.konflikArah && (
                        <div className="mt-2"><Badge tone="merah">berlawanan dgn rencana terkunci {data.selaras.konflikArah.rencanaArah} — lihat audit selaras</Badge></div>
                      )}
                      <div className="mt-2 text-[11px] text-neutral-500">{v?.lapisan}</div>
                      {/* ISI VONIS — koreksi keluhan pemilik "SELL tapi isinya gak ada":
                          vonis apapun (BUY/SELL) WAJIB membawa buktinya di kartu ini */}
                      {v && (
                        <div className="mt-2 rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">isi vonis — dewan 8 suara · bukti searah</div>
                          <ul className="mt-1 space-y-0.5 text-[11px] leading-snug">
                            {(v.buktiKunci ?? []).length ? (v.buktiKunci ?? []).map((r, i) => (
                              <li key={i} className={p.arah === 'BUY' ? 'text-emerald-200' : 'text-rose-200'}>▸ {r}</li>
                            )) : <li className="text-neutral-400">tak ada bukti searah kuat — vonis lahir dari skor dewan tipis ({(v.skorArah ?? 0).toFixed(1)})</li>}
                          </ul>
                          {(() => {
                            const lawan = (v.bukti ?? []).filter((b) => (p.arah === 'BUY' ? b.vote === 'TURUN' : b.vote === 'NAIK')).sort((a, b) => b.kekuatan * b.bobot - a.kekuatan * a.bobot);
                            if (!lawan.length) return null;
                            return (
                              <div className="mt-1 text-[11px] text-amber-200">suara melawan: {lawan.length} suara — terkuat {lawan[0].id} {lawan[0].label}: {lawan[0].cara}</div>
                            );
                          })()}
                          {data.aliran?.vonis && (
                            <div className="mt-1 text-[11px] text-neutral-300">kaskade likuidasi 6j: korban {data.aliran.vonis.korban ?? '—'} (skor {data.aliran.vonis.skorKorban}, alarm {data.aliran.vonis.alarmLevel}) · bias arah {data.aliran.vonis.arah} (p {data.aliran.vonis.pArah})</div>
                          )}
                          {data.kl && (
                            <div className="mt-1 text-[11px] text-neutral-400">tracker episode: aksi {data.kl.aksi} · arah episode {data.kl.arah} · pool {data.kl.pool.side} @{fmtHarga(data.kl.pool.level ?? null)}{data.kl.pool.swept ? ` — disapu ${data.kl.pool.barsSince} candle lalu${data.kl.pool.reclaimed ? ', lalu direclaim' : ''}` : ' — diam'}</div>
                          )}
                        </div>
                      )}
                      {data.modal && (
                        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                          <Badge tone={data.modal.vonis === 'PUMP_NYATA' || data.modal.vonis === 'AKUMULASI' || data.modal.vonis === 'BUNUH_SHORT' ? 'hijau' : data.modal.vonis === 'NETRAL' ? 'netral' : 'merah'}>pondasi dana: {VONIS_LABEL[data.modal.vonis] ?? data.modal.vonis}</Badge>
                          <Badge tone="amber">futures {data.modal.drivePct.toFixed(0)}% · {data.modal.driveLabel}</Badge>
                          {data.modal.squeezeAktif && <Badge tone="ungu">squeeze aktif</Badge>}
                        </div>
                      )}
                    </Kartu>
                    <Kartu>
                      <JudulKecil>slot tempur V301</JudulKecil>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-2xl font-black">{p.guard === 'LOLOS' ? 'LOLOS' : 'TOLAK'}</div>
                        {p.arahRencana && <Badge tone={p.arahRencana === 'BUY' ? 'hijau' : 'merah'}>rencana terkunci: {p.arahRencana === 'BUY' ? 'BUY (LONG)' : 'SELL (SHORT)'}{p.zamanRencana ? ` · zaman #${p.zamanRencana}` : ''}</Badge>}
                        {p.kepastianRencana != null && <Badge>kepastian saat kunci {p.kepastianRencana}%</Badge>}
                      </div>
                      <div className="text-sm text-neutral-300">{p.guard === 'LOLOS' ? 'K=1 · rencana pra-registrasi aktif' : p.guardAlasan}</div>
                      {data.modal && (
                        <div className="mt-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-2 text-[11px] leading-snug text-cyan-100">
                          <b>dasar fundamental dana (bukan buta info):</b> vonis otak modal {VONIS_LABEL[data.modal.vonis] ?? data.modal.vonis} (skor {data.modal.skor}) · leverage terpasang est. long {data.modal.leverageDominan.long ?? `~${data.modal.leverageDominan.dominanTier}`}x / short {data.modal.leverageDominan.short ?? `~${data.modal.leverageDominan.dominanTier}`}x ({data.modal.leverageDominan.nKaskade} kaskade terukur) · sensus {data.modal.sensus.venuePerp} venue perp + {data.modal.sensus.venueSpot} spot, OI universe ≈ {data.modal.sensus.totalOiUsd !== null ? `${(data.modal.sensus.totalOiUsd / 1e6).toFixed(1)} jt USD` : '—'}, est. {data.modal.sensus.estUniverseAkun !== null ? `${data.modal.sensus.estUniverseAkun.toLocaleString('id-ID')} akun-posisi` : '—'} · akumulasi senyap spot: {data.modal.akumulasiKlasifikasi.toLowerCase().replace(/_/g, ' ')} (skor {data.modal.akumulasiSkor}){data.modal.portalTurun ? ` · korban long terdekat −${data.modal.portalTurun.dPct.toFixed(2)}% (p24j ${(data.modal.portalTurun.prob24j * 100).toFixed(0)}%)` : ''}{data.modal.portalNaik ? ` · korban short terdekat +${data.modal.portalNaik.dPct.toFixed(2)}% (p24j ${(data.modal.portalNaik.prob24j * 100).toFixed(0)}%)` : ''} — {p.guard === 'LOLOS' ? ((data.selaras && (data.selaras.cek.find((c) => c.id === 'SL-4')?.status === 'GAGAL' || data.selaras.cek.find((c) => c.id === 'SL-5')?.status === 'GAGAL')) ? ' PERINGATAN AUDIT: arah rencana BERLAWANAN dengan pondasi dana yang ditampilkan — jangan ambil posisi buta; baca audit selaras' : ' arah rencana duduk di atas pondasi dana (SL-4/SL-5 lolos di audit selaras)') : ' TOLAK = disiplin guard, BUKAN karena tak bisa membaca dana; bukti penuh di tab Fundamen Modal'}
                        </div>
                      )}
                      {p.disiplinCuan && <div className="mt-2 text-[11px] text-amber-300">{p.disiplinCuan}</div>}
                    </Kartu>
                  </div>

                  {p.garis && (
                    <Kartu className="border-emerald-400/30">
                      <JudulKecil>garis vonis &amp; pantau terus — TP &amp; SL SELALU tertera, digambar dari harga hidup SEKARANG (bukan angka sisa lama)</JudulKecil>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge tone={p.garis.arah === 'BUY' ? 'hijau' : 'merah'}>{p.garis.labelArah}</Badge>
                        {p.garis.sanityOk ? (
                          <Badge tone="hijau">geometri benar: {p.garis.arah === 'SELL' ? 'SL di ATAS pasar · TP di BAWAH pasar' : 'TP di ATAS pasar · SL di BAWAH pasar'}</Badge>
                        ) : (
                          <Badge tone="merah">geometri level rusak — dilarang dieksekusi, segarkan untuk hitung ulang</Badge>
                        )}
                        {p.garis.arah === 'SELL' && data.sellOn === false && <Badge tone="amber">knob sellOn MATI — garis tetap dihitung agar sistem TAHU arah TP/SL sell (hukum P-6), tanpa rencana tempur</Badge>}
                      </div>
                      <div className="grid gap-3 text-sm sm:grid-cols-3">
                        <div><div className="text-[11px] text-neutral-500">ENTRY = harga hidup sekarang</div><div className="font-mono font-bold">${fmtHarga(p.garis.entry)}</div></div>
                        <div><div className="text-[11px] text-neutral-500">TAKE PROFIT (sasaran) — {p.garis.posisiTarget === 'ATAS_PASAR' ? 'DI ATAS pasar' : 'DI BAWAH pasar'}</div><div className="font-mono font-bold text-emerald-400">${fmtHarga(p.garis.target)} <span className="text-[11px]">({pct(p.garis.targetPct)} dari entry)</span></div></div>
                        <div><div className="text-[11px] text-neutral-500">STOP LOSS (pelindung) — {p.garis.posisiStop === 'ATAS_PASAR' ? 'DI ATAS pasar' : 'DI BAWAH pasar'}</div><div className="font-mono font-bold text-rose-400">${fmtHarga(p.garis.stop)} <span className="text-[11px]">({pct(p.garis.stopPct)} dari entry)</span></div></div>
                      </div>
                      <p className="mt-2 text-[11px] text-neutral-400">{p.garis.ket}</p>
                      {data.pantau && (
                        <div className="mt-2 rounded-lg border border-white/10 bg-black/30 p-2 text-[11px]">
                          <div className="font-semibold text-emerald-300">{data.pantau.status}</div>
                          <div className="mt-1 text-neutral-400">
                            audit harga hidup terakhir {data.pantau.cekTerakhir ? new Date(data.pantau.cekTerakhir).toLocaleTimeString('id-ID') : '—'} · slot/zaman hari ini: {data.pantau.slotHariIni} · rekalkulasi mandiri hari ini: {data.pantau.nRekalkHariIni}×
                          </div>
                          <ul className="mt-1 space-y-0.5 text-neutral-500">
                            {data.pantau.hukum.slice(0, 5).map((h, i) => <li key={i}>▸ {h}</li>)}
                          </ul>
                          {data.pantau.sejarah.length > 0 && (
                            <div className="mt-1">
                              <div className="font-semibold text-amber-300">catatan rekalkulasi mandiri (terbaru dulu) — &quot;kena stop loss → hitung lagi; kena TP → catat lalu hitung arah berikutnya&quot;</div>
                              <ul className="mt-0.5 space-y-0.5 text-neutral-400">
                                {data.pantau.sejarah.slice(0, 6).map((x, i) => <li key={i}>{x.at.slice(11, 19)} — {x.text}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </Kartu>
                  )}

                  {p.rencana ? (
                    <Kartu className="border-amber-400/30">
                      <JudulKecil>rencana pra-registrasi E → T → S (after-fee {(p.praRegistrasi?.feePct ?? 0.4).toFixed(1)}%)</JudulKecil>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge tone={p.arahRencana === 'SELL' ? 'merah' : 'hijau'}>arah rencana: {p.arahRencana === 'BUY' ? 'BUY (LONG)' : 'SELL (SHORT)'}{p.zamanRencana ? ` · zaman #${p.zamanRencana}` : ''}</Badge>
                        {/* VERIFIKASI-HASIL — status ganda TP+SL dilarang tampil tanpa putusan:
                            urutan kena dijawab dari candle 1j nyata + hasil sementara ditulis */}
                        {(() => {
                          const a = data.aktifStatus;
                          if (!a) return null;
                          if (a.urutan === 'TARGET') return <Badge tone="hijau">verifikasi-hasil: TARGET kena DULUAN pukul {a.jamTarget} UTC (candle 1j) — dinilai MENANG {pct(a.netSementaraPct)} saat tutup</Badge>;
                          if (a.urutan === 'STOP') return <Badge tone="merah">verifikasi-hasil: STOP kena DULUAN pukul {a.jamStop} UTC ({a.urutanSumber}) — rencana gagal, net sementara {pct(a.netSementaraPct)}{a.jamTarget ? ` (sasaran tersentuh pukul ${a.jamTarget} tak mengubah vonis)` : ' (sasaran hanya tersentuh pra-kunci — tak diakreditasi)'}</Badge>;
                          if (a.sentuhTarget) return <Badge tone="hijau">sasaran tersentuh intraday pukul {a.jamTarget} UTC — cuan mengambang {pct(a.netSementaraPct)}, dinilai jujur di tutup hari</Badge>;
                          if (a.sentuhStop) return <Badge tone="merah">stop tersentuh intraday pukul {a.jamStop} UTC — net sementara {pct(a.netSementaraPct)}, dikonfirmasi di tutup hari</Badge>;
                          return <Badge tone="amber">harga hidup: {pct(a.jarakTargetPct)} menuju sasaran · {pct(a.jarakStopPct)} ke stop · float {pct(a.netSementaraPct)}</Badge>;
                        })()}
                        {(() => {
                          const r = p.rencana;
                          if (!r) return null;
                          const hidup = meta?.harga ?? r.entry;
                          const drift = ((hidup - r.entry) / r.entry) * 100;
                          return <Badge tone={Math.abs(drift) > 3 ? 'amber' : 'netral'}>entry terkunci ${fmtHarga(r.entry)} · harga hidup ${fmtHarga(hidup)} ({drift >= 0 ? '+' : ''}{drift.toFixed(2)}%){p.waktuKunciRencana ? ` · dikunci ${new Date(p.waktuKunciRencana).toLocaleTimeString('id-ID')}` : ''}</Badge>;
                        })()}
                        {p.arahRencana === 'SELL' && data.sellOn === false && <Badge tone="amber">knob sellOn kini MATI — rencana dikunci saat ON, tetap jalan sampai horizon</Badge>}
                        {data.selaras?.konflikArah && <Badge tone="merah">vonis hidup {data.selaras.konflikArah.vonisHidup} berlawanan — putusan di audit selaras</Badge>}
                      </div>
                      <div className="grid gap-3 text-sm sm:grid-cols-4">
                        <div><div className="text-[11px] text-neutral-500">ENTRY (E)</div><div className="font-mono font-bold">${fmtHarga(p.rencana.entry)}</div></div>
                        <div><div className="text-[11px] text-neutral-500">TARGET (T) {p.rencana.targetMediana ? '· mediana MC' : ''}</div><div className="font-mono font-bold text-emerald-400">${fmtHarga(p.rencana.target)} <span className="text-[11px]">({pct(p.rencana.targetPct)} · P {(p.rencana.pTarget * 100).toFixed(0)}%)</span></div></div>
                        <div><div className="text-[11px] text-neutral-500">STOP (S)</div><div className="font-mono font-bold text-rose-400">${fmtHarga(p.rencana.stop)} <span className="text-[11px]">({pct(p.rencana.stopPct)} · P {(p.rencana.pStop * 100).toFixed(0)}%)</span></div></div>
                        <div><div className="text-[11px] text-neutral-500">{p.arahRencana === 'SELL' ? 'TEBUS AMBISIUS (beli kembali)' : 'JUAL AMBISIUS'}</div><div className="font-mono font-bold text-violet-300">${fmtHarga(p.rencana.highAmbisius)} <span className="text-[11px]">({pct(p.rencana.ambisiusPct)} · sentuh {(p.rencana.pAmbisius * 100).toFixed(0)}%)</span></div></div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <Badge tone="hijau">NET {pct(p.rencana.netUntungPct)}</Badge>
                        {data.aktifStatus && (data.aktifStatus.hasilSementara === 'KALAH_SEMENTARA' || data.aktifStatus.hasilSementara === 'MENANG_SEMENTARA') && (
                          <Badge tone={data.aktifStatus.hasilSementara === 'KALAH_SEMENTARA' ? 'merah' : 'hijau'}>HASIL SEKARANG {pct(data.aktifStatus.netSementaraPct)} — laporan dihakimi ulang dari candle 1j, bukan diulang dari data lama</Badge>
                        )}
                        <Badge tone="ungu">power max {p.rencana.powerMax.toFixed(2)}</Badge>
                        <Badge>{data.mc?.lintasan} lintasan × {data.mc?.langkah} langkah</Badge>
                        <Badge>seed {data.mc?.seedHex}</Badge>
                      </div>
                      <p className="mt-2 text-[11px] text-neutral-400">{p.rencana.ketGuard}</p>
                      {p.praRegistrasi && (
                        <p className="mt-1 text-[11px] text-neutral-500">
                          dikunci {new Date(p.praRegistrasi.waktuKunci).toLocaleString('id-ID')} · ledger #{p.praRegistrasi.nomor} · hash <span className="font-mono">{p.praRegistrasi.hash.slice(0, 16)}…</span> — ditulis SEBELUM medan dibuka (SHA-256 append-only)
                        </p>
                      )}
                    </Kartu>
                  ) : (
                    <Kartu className="border-rose-400/30">
                      <JudulKecil warna="text-rose-300">tanpa rencana tempur hari ini</JudulKecil>
                      <p className="text-sm text-neutral-300">{p.guardAlasan}</p>
                      <p className="mt-2 text-[11px] text-neutral-500">Arah tetap dihitung & dipantau penuh; knob sellOn bisa dinyalakan di Ruang Guru (dengan peringatan hasil lab sumber).</p>
                    </Kartu>
                  )}

                  {data.selaras && (
                    <Kartu className={data.selaras.statusUmum === 'SELARAS' ? '' : 'border-rose-400/40'}>
                      <JudulKecil warna={data.selaras.statusUmum === 'SELARAS' ? 'text-emerald-300' : 'text-rose-300'}>audit selaras — 14 pemeriksaan anti-kontradiksi</JudulKecil>
                      <p className="mb-3 text-[12px] text-neutral-300">{data.selaras.ringkas}</p>
                      <div className="grid gap-1.5 text-[12px] md:grid-cols-2">
                        {data.selaras.cek.map((c) => (
                          <div key={c.id} className={`rounded-lg border p-2 ${c.status === 'GAGAL' ? 'border-rose-500/40 bg-rose-500/5' : c.status === 'PERINGATAN' ? 'border-amber-500/40 bg-amber-500/5' : c.status === 'LOLOS' ? 'border-emerald-500/25 bg-emerald-500/[0.04]' : 'border-white/10 bg-black/20'}`}>
                            <div className="flex items-center gap-2">
                              <span className={c.status === 'GAGAL' ? 'text-rose-400' : c.status === 'PERINGATAN' ? 'text-amber-400' : c.status === 'LOLOS' ? 'text-emerald-400' : 'text-neutral-500'}>{c.status === 'GAGAL' ? '✗' : c.status === 'PERINGATAN' ? '⚠' : c.status === 'LOLOS' ? '✓' : '·'}</span>
                              <span className="font-mono text-[10px] text-neutral-500">{c.id}</span>
                              <span className="font-semibold text-neutral-200">{c.label}</span>
                            </div>
                            <p className="mt-1 text-[11px] leading-snug text-neutral-400">{c.detail}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-neutral-500">Lahir dari kekeliaruan yang ditangkap pemilik: vonis BUY tampil damai di samping rencana SELL tanpa satu kata pun. Kini tidak ada label, formula, atau angka yang boleh berlawanan diam-diam — setiap konflik diumumkan, diputuskan aturan tertulis, dan dicatat ledger SEBELUM hasil.</p>
                    </Kartu>
                  )}

                  <div className="grid gap-4 lg:grid-cols-2">
                    <Kartu>
                      <JudulKecil>dewan tugas (11 pemeriksaan)</JudulKecil>
                      <ul className="space-y-1.5 text-[12px]">
                        {p.duties.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className={d.pass ? 'text-emerald-400' : 'text-rose-400'}>{d.pass ? '✓' : '✗'}</span>
                            <span className="text-neutral-300">
                              <span className="font-semibold">{d.name}</span> — <span className="text-neutral-400">{d.note}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>faktor komposit 9 dimensi</JudulKecil>
                      <div className="space-y-2">
                        {Object.entries(p.faktor).map(([k, vv]) => (
                          <BarSkor key={k} label={k} v={vv} />
                        ))}
                      </div>
                      <div className="mt-3 text-[11px] text-neutral-400">{p.topReasons.join(' · ')}</div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>debat tim merah (V278) — {p.debat.tekanan} serangan</JudulKecil>
                      {p.debat.serangan.length === 0 && <p className="text-sm text-neutral-400">Tidak ada serangan — vonis bersih.</p>}
                      <ul className="space-y-1.5 text-[12px]">
                        {p.debat.serangan.map((a, i) => (
                          <li key={i} className="text-rose-300"><span className="font-semibold">{a.dari}:</span> <span className="text-neutral-300">{a.teks}</span></li>
                        ))}
                        {p.debat.bertahan.map((a, i) => (
                          <li key={`b${i}`} className="text-emerald-300"><span className="font-semibold">{a.dari}:</span> <span className="text-neutral-300">{a.teks}</span></li>
                        ))}
                      </ul>
                      <p className="mt-2 text-[11px] text-amber-300">{p.debat.vonis}</p>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>KORTEX (V279) — skor {p.kortex.skor}/100</JudulKecil>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {(['C', 'O', 'R', 'T', 'E', 'X'] as const).map((k) => (
                          <div key={k} className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                            <div className="text-lg font-bold text-amber-300">{k}</div>
                            <div className="font-mono text-xs text-neutral-300">{p.kortex[k].toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-neutral-500">{p.kortex.rumus}</p>
                    </Kartu>
                  </div>

                  <Kartu>
                    <JudulKecil>7 mesin warisan SAKTI</JudulKecil>
                    <div className="grid gap-2 text-[12px] sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">GARCH(1,1)</div><div className="text-neutral-400">σ24j {p.warisan.sigma24jPct}% · persistensi {p.warisan.persistensi}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">Beta vs BTC</div><div className="text-neutral-400">{p.warisan.beta} · R² {p.warisan.r2Beta}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">POC / VA</div><div className="text-neutral-400">{p.warisan.profilVolume}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">Divergensi RSI</div><div className="text-neutral-400">{p.warisan.divRSIKet}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">Kejut 6 jam</div><div className="text-neutral-400">{p.warisan.ketKejut}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">Posisi rentang 60h</div><div className="text-neutral-400">{(p.warisan.posisiRentang * 100).toFixed(0)}% · volSpike {p.warisan.volSpike}x</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">Breadth (adaptasi 1 koin)</div><div className="text-neutral-400">{p.warisan.breadthPct.toFixed(1)}%</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold text-neutral-200">Monte Carlo (vonis hidup {p.arah})</div><div className="text-neutral-400">pNaik {( (data.mc?.pNaik ?? 0) * 100).toFixed(0)}%{p.arahRencana && p.arahRencana !== p.arah ? ' — beda arah dgn rencana terkunci; P rencana memakai MC saat kunci' : ''}</div></div>
                    </div>
                  </Kartu>

                  <Kartu>
                    <JudulKecil>grafik 90 hari ELSA/USDT (Bybit)</JudulKecil>
                    <GrafikCandle candle={(data.chart ?? []).map((c) => ({ t: c.t, o: c.o, h: c.h, l: c.l, c: c.c }))} />
                  </Kartu>

                  <BukuCuan data={data} />
                  <Kronik data={data} />
                  <p className="text-center text-[11px] text-neutral-500">Profit PASTI tidak ada di pasar — yang mengaku pasti sedang berbohong. Yang dijamin mesin ini: rencana dinilai nyata candle hari-D after-fee, keteledoran dicatat, rantai hash terverifikasi. Bukan nasihat keuangan.</p>
                </div>
              )}

              {/* ============ TAB: DOMPET $1000 — simulasi nyata-rasa ============ */}
              {tab === 'dompet' && data.dompet && <TabDompet d={data.dompet} onAksi={muat} berjalan={berjalan} />}
              {tab === 'dompet' && !data.dompet && (
                <Kartu><p className="text-sm text-neutral-400">otak dompet belum terbaca — menunggu orderbook Bybit hidup…</p></Kartu>
              )}

              {/* ============ TAB: KEPASTIAN ARAH ============ */}
              {tab === 'peta' && data.petaWaktu && <TabPeta p={data.petaWaktu} l={data.lintasan ?? null} />}
              {tab === 'peta' && !data.petaWaktu && (
                <Kartu><p className="text-sm text-neutral-400">otak peta waktu belum terbaca — menunggu data likuidasi/funding/unlock hidup…</p></Kartu>
              )}

              {tab === 'arah' && v && p && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Kartu>
                      <JudulKecil>vonis biner</JudulKecil>
                      <div className={`text-3xl font-black ${v.vonis === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>{v.vonis}</div>
                      <div className="text-sm text-neutral-300">posisi = {v.vonis === 'BUY' ? 'LONG' : 'SHORT'} · kepastian {v.kepastian}% · skor arah {v.skorArah.toFixed(0)}</div>
                      <div className="mt-2 text-[11px] text-neutral-500">{v.lapisan}</div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>konsensus dewan</JudulKecil>
                      <div className="text-3xl font-black text-amber-300">{Math.round(v.konsensus * 100)}%</div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${v.konsensus * 100}%` }} />
                      </div>
                      <div className="mt-2 text-[11px] text-neutral-500">otak arah v{v.versi} · tracker {data.kl?.aksi} / {data.kl?.arah}</div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>eksekusi</JudulKecil>
                      <div className="text-sm text-neutral-300">{v.eksekusi.aksi} · target {v.eksekusi.targetPct}% · stop {v.eksekusi.stopPct}%</div>
                      <p className="mt-2 text-[11px] text-neutral-500">{v.eksekusi.sumber}</p>
                    </Kartu>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {v.bukti.map((b) => (
                      <Kartu key={b.id} className={b.vote === 'NAIK' ? 'border-emerald-500/30' : b.vote === 'TURUN' ? 'border-rose-500/30' : ''}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-200">{b.id} · {b.label}</span>
                          <Badge tone={b.vote === 'NAIK' ? 'hijau' : b.vote === 'TURUN' ? 'merah' : 'netral'}>{b.vote}</Badge>
                        </div>
                        <div className="mb-2 text-[11px] text-neutral-500">kekuatan {b.kekuatan.toFixed(2)} · bobot {b.bobot}</div>
                        <p className="text-[12px] leading-snug text-neutral-300">{b.cara}</p>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full ${b.vote === 'NAIK' ? 'bg-emerald-400' : b.vote === 'TURUN' ? 'bg-rose-400' : 'bg-neutral-500'}`} style={{ width: `${b.kekuatan * 100}%` }} />
                        </div>
                      </Kartu>
                    ))}
                  </div>
                  <Kartu>
                    <JudulKecil>tracker episode 5-aspek (kompleks v1.2)</JudulKecil>
                    <div className="mb-2 flex flex-wrap gap-2 text-[11px]">
                      <Badge tone={data.kl?.aspek5.stopHunt ? 'ungu' : 'netral'}>stop hunt {data.kl?.aspek5.stopHunt ? 'YA' : 'n'}</Badge>
                      <Badge tone={data.kl?.aspek5.falseBreakout ? 'ungu' : 'netral'}>false breakout {data.kl?.aspek5.falseBreakout ? 'YA' : 'n'}</Badge>
                      <Badge tone={data.kl?.aspek5.pumpDump ? 'ungu' : 'netral'}>pump &amp; dump {data.kl?.aspek5.pumpDump ? 'YA' : 'n'}</Badge>
                      <Badge tone={data.kl?.aspek5.bearTrap ? 'ungu' : 'netral'}>bear trap {data.kl?.aspek5.bearTrap ? 'YA' : 'n'}</Badge>
                      <Badge tone={data.kl?.aspek5.bullTrap ? 'ungu' : 'netral'}>bull trap {data.kl?.aspek5.bullTrap ? 'YA' : 'n'}</Badge>
                    </div>
                    {data.kl?.aspek5.rangkaianUtuh && <p className="mb-2 text-[12px] text-amber-300">rangkaian: {data.kl.aspek5.rangkaianUtuh}</p>}
                    <ul className="space-y-1 text-[12px] text-neutral-300">
                      {(data.kl?.alasan ?? []).map((a, i) => <li key={i}>· {a}</li>)}
                    </ul>
                    <div className="mt-3 grid gap-2 text-[12px] sm:grid-cols-3">
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold">pool likuiditas</div><div className="text-neutral-400">{data.kl?.pool.jenis} · {data.kl?.pool.side} · level {fmtHarga(data.kl?.pool.level ?? null)} · {data.kl?.pool.sentuhan} sentuhan · {data.kl?.pool.swept ? `disapu ${data.kl?.pool.barsSince} candle lalu sedalam ${data.kl?.pool.depthAtr} ATR` : 'diam'}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold">grab</div><div className="text-neutral-400">{data.kl?.grab.terjadi ? `YA · post ${data.kl?.grab.post}` : 'tidak'} — {data.kl?.grab.cara}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold">gauntlet lilin menipu</div><div className="text-neutral-400">{data.kl?.gauntlet.deceitCara}</div></div>
                    </div>
                  </Kartu>
                  <Kartu>
                    <JudulKecil>certifikasi lab otak (warisan situs sumber)</JudulKecil>
                    <div className="grid gap-2 text-[12px] sm:grid-cols-4">
                      {[['v237-FBO', 'False Breakout', '744/744 hakim'], ['v238-PD', 'Pump &amp; Dump', '1600/1600'], ['v239-KL', 'Kompleks 5 Aspek', '1600/1600'], ['v240-AR', 'Kepastian Arah v1.8', '10600/10600']].map(([id, nama, skor]) => (
                        <div key={id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="font-mono text-[10px] text-neutral-500">{id}</div>
                          <div className="font-semibold text-neutral-200">{nama}</div>
                          <div className="text-neutral-400">{skor}</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] text-neutral-500">Point-in-time: 60 candle visible + 14 horizon · fee 0.1%+0.1% di lab · vonis wajib biner tanpa SKIP bagi pemburu terlatih.</p>
                  </Kartu>
                </div>
              )}

              {/* ============ TAB: FUNDAMEN MODAL ============ */}
              {tab === 'modal' && !modalData && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-neutral-300">Otak modal sedang menyaring futures, likuidasi &amp; whale ELSA…</p>
                </div>
              )}
              {tab === 'modal' && modalData && (() => {
                const m = modalData;
                const oiDeltaRows: [string, number | null, number | null][] = [
                  ['1 jam', m.oi.delta1j, m.oi.hargaDelta1j],
                  ['4 jam', m.oi.delta4j, m.oi.hargaDelta4j],
                  ['24 jam', m.oi.delta24j, m.oi.hargaDelta24j],
                ];
                return (
                  <div className="space-y-4">
                    {/* banner vonis jebakan vs pump — HUKUM DUA PEDANG (keluhan pemilik
                        2026-11-25: "pasar hanya punya dua pedang — bunuh short atau bunuh
                        long, bukan berdiam di tempat"): vonis dilarang netral */}
                    <Kartu className={
                      m.vonis.vonis === 'PUMP_NYATA' || m.vonis.vonis === 'AKUMULASI' || m.vonis.vonis === 'BUNUH_SHORT' ? 'border-emerald-400/40 bg-emerald-500/5'
                        : m.vonis.vonis === 'SHORT_SQUEEZE' ? 'border-violet-400/40 bg-violet-500/5'
                          : m.vonis.vonis === 'NETRAL' ? '' : 'border-rose-400/40 bg-rose-500/5'
                    }>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge tone={VONIS_TONE[m.vonis.vonis] ?? 'netral'}>otak modal · vonis</Badge>
                        <span className="text-2xl font-black tracking-tight">{VONIS_LABEL[m.vonis.vonis] ?? m.vonis.vonis}</span>
                        {m.vonis.pedang && (
                          <Badge tone={m.vonis.pedang === 'BUNUH_SHORT' ? 'hijau' : 'merah'}>pedang: {m.vonis.pedang === 'BUNUH_SHORT' ? 'BUNUH SHORT (naik menyapu short)' : 'BUNUH LONG (turun menyapu long)'}</Badge>
                        )}
                        <Badge tone="amber">skor {m.vonis.skor}/100</Badge>
                        <span className="ml-auto text-[11px] text-neutral-500">{new Date(m.vonis.at).toLocaleTimeString('id-ID')}</span>
                      </div>
                      <p className="mt-2 text-sm text-neutral-200">{m.vonis.implikasi}</p>
                      <ul className="mt-2 space-y-1 text-[12px] text-neutral-300">
                        {m.vonis.alasan.map((a, i) => <li key={i}>· {a}</li>)}
                      </ul>
                    </Kartu>

                    {/* JIWA OTAK MODAL — neuron keyakinan: pondasi dana punya otak
                        (keluhan pemilik: "fundamen modal gak ada ruh, gak ada neuron,
                        bodoh karena gak ada otak") */}
                    {m.jiwa && (() => {
                      const j = m.jiwa;
                      const toneStatus = (s: JiwaKeyakinan['status']) => s === 'DITEPATI' ? 'hijau' : s === 'GAGAL' ? 'merah' : s === 'MELEWAT' ? 'amber' : 'ungu';
                      return (
                        <>
                          <div className="grid gap-4 lg:grid-cols-2">
                            <Kartu className="border-violet-400/30">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <JudulKecil warna="text-violet-300">jiwa otak modal — neuron keyakinan (janji yang bisa dibuktikan salah)</JudulKecil>
                                <Badge tone="ungu">denyut ke-{j.denyutKe}</Badge>
                                <Badge tone="netral">{j.keyakinanTerbuka.length} terbuka</Badge>
                              </div>
                              <p className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-2 font-mono text-[11px] leading-snug text-violet-100">
                                formula keyakinan: K = clamp(0,30 + 0,22·|skor−50|/50 + 0,18·konsistensi + 0,15·akurasi-aturan + 0,08·kesegaran + 0,07·bukti-nyata, 0, 0,95)
                              </p>
                              <p className="mt-1 text-[11px] text-neutral-400">tiap vonis (hukum dua pedang: SELALU ada arah — dilarang diam) &amp; magnet portal ditulis sebagai keyakinan TERBUKA — target &amp; stop dari σ24j candle nyata, deadline 24 jam, lalu DIJAWAB pasar. keyakinan yang tak bisa dibuktikan salah = bukan keyakinan.</p>
                              {j.keyakinanTerbuka.length ? (
                                <div className="mt-2 space-y-2">
                                  {j.keyakinanTerbuka.slice(0, 6).map((b) => (
                                    <div key={b.id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[12px] font-bold text-neutral-100">{b.id}</span>
                                        <Badge tone={toneStatus(b.status)}>{b.asal === 'PORTAL' ? 'magnet' : 'vonis'}</Badge>
                                        <span className="text-[12px] font-semibold text-neutral-200">{b.jenis}</span>
                                        <span className={`text-[12px] font-bold ${b.arah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}`}>{b.arah === 'NAIK' ? '▲ NAIK' : '▼ TURUN'}</span>
                                        <Badge tone="amber">K {b.keyakinan.toFixed(2)}</Badge>
                                        <span className="ml-auto text-[10px] text-neutral-500">deadline {new Date(b.deadlineAt).toLocaleTimeString('id-ID')}</span>
                                      </div>
                                      <div className="mt-1 grid grid-cols-3 gap-2 text-center">
                                        <div><div className="font-mono text-[11px] text-neutral-300">{b.hargaAwal.toFixed(5)}</div><div className="text-[9px] text-neutral-500">harga awal</div></div>
                                        <div><div className="font-mono text-[11px] text-emerald-300">{b.hargaTarget.toFixed(5)}</div><div className="text-[9px] text-neutral-500">target {b.asal === 'PORTAL' ? 'magnet' : `+${b.targetPct}%`}</div></div>
                                        <div><div className="font-mono text-[11px] text-rose-300">{b.asal === 'PORTAL' ? '—' : b.hargaStop.toFixed(5)}</div><div className="text-[9px] text-neutral-500">{b.asal === 'PORTAL' ? 'magnet tunggal' : `stop −${b.stopPct}%`}</div></div>
                                      </div>
                                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-violet-400/80" style={{ width: `${Math.round(b.keyakinan * 100)}%` }} /></div>
                                      <p className="mt-1 text-[10px] leading-snug text-neutral-500">{b.dasar}</p>
                                      <p className="text-[10px] text-neutral-500">komponen K: skor {b.komponen.skor.toFixed(2)} · konsistensi {b.komponen.konsistensi.toFixed(2)} · akurasi-aturan {b.komponen.akurasiAturan.toFixed(2)} · kesegaran {b.komponen.kesegaran.toFixed(2)} · bukti {b.komponen.buktiNyata.toFixed(2)}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="mt-2 text-sm text-neutral-400">tak ada keyakinan terbuka — semua sudah dijawab pasar; keyakinan berikut lahir saat pedang berganti. otak tak memalsukan janji demi kelihatan sibuk.</p>
                              )}
                            </Kartu>
                            <Kartu>
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <JudulKecil warna="text-amber-300">akuntabilitas — janji lama dinilai candle nyata</JudulKecil>
                                <Badge tone={j.kalibrasi.nTerjawab === 0 ? 'netral' : j.kalibrasi.akurasi >= 0.6 ? 'hijau' : j.kalibrasi.akurasi >= 0.4 ? 'amber' : 'merah'}>
                                  {j.kalibrasi.nTerjawab} terjawab · {j.kalibrasi.nBenar} benar · akurasi {(j.kalibrasi.akurasi * 100).toFixed(0)}%
                                </Badge>
                              </div>
                              <p className="text-[11px] text-neutral-400">kalibrasi mandiri: tiap denyut, keyakinan terbuka dicek candle perp 1 jam — DITEPATI (target duluan), GAGAL (stop duluan), MELEWAT (kedaluwarsa = dihitung SALAH konservatif). dulu vonis dibuang tanpa nilai; kini semua janji diberi rapor.</p>
                              {j.keyakinanSelesai.length ? (
                                <div className="mt-2 space-y-2">
                                  {j.keyakinanSelesai.slice(0, 7).map((b) => (
                                    <div key={b.id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[12px] font-bold text-neutral-100">{b.id}</span>
                                        <Badge tone={toneStatus(b.status)}>{b.status}</Badge>
                                        <span className="text-[11px] text-neutral-300">{b.jenis}</span>
                                        <span className="ml-auto font-mono text-[10px] text-neutral-500">{b.hargaAwal.toFixed(5)} → {b.hargaAkhir?.toFixed(5)}</span>
                                      </div>
                                      {b.cerita && <p className="mt-1 text-[10px] leading-snug text-neutral-400">{b.cerita}</p>}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="mt-2 text-sm text-neutral-400">belum ada janji selesai dijawab — neuron baru lahir; dari sekarang setiap vonis &amp; magnet dicatat dan dihakimi pasar.</p>
                              )}
                            </Kartu>
                          </div>
                          <div className="grid gap-4 lg:grid-cols-2">
                            <Kartu>
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <JudulKecil warna="text-emerald-300">kepahaman tertambang — vonis yang belajar dari rekam jejak</JudulKecil>
                                <Badge tone="netral">{j.kepahaman.length} aturan</Badge>
                              </div>
                              {j.modulasi && (
                                <div className={`mb-2 rounded-lg border p-2 ${j.modulasi.efek === 'DORONG' ? 'border-emerald-500/40 bg-emerald-500/5' : j.modulasi.efek === 'DISKON' ? 'border-rose-500/40 bg-rose-500/5' : 'border-white/10 bg-black/20'}`}>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Badge tone={j.modulasi.efek === 'DORONG' ? 'hijau' : j.modulasi.efek === 'DISKON' ? 'merah' : 'netral'}>modulasi {j.modulasi.efek}</Badge>
                                    <span className="font-mono text-[12px] font-bold text-neutral-100">skor {j.modulasi.skorSebelum} → {j.modulasi.skorSesudah}</span>
                                    <span className="text-[10px] text-neutral-500">{j.modulasi.jenis} · rekam jejak {j.modulasi.nAturan} sampel</span>
                                  </div>
                                  <p className="mt-1 text-[11px] leading-snug text-neutral-300">{j.modulasi.ket}</p>
                                </div>
                              )}
                              <p className="text-[11px] text-neutral-400">aturan yang hadir saat keyakinan menang dapat BENAR, saat kalah dicatat SALAH — akurasi tiap aturan menyusun kepahaman; vonis baru dikalibrasi aturan yang sama (modulasi menyala ≥4 sampel terjawab). otak yang tak belajar dari kesalahan sendiri = bodoh, dan itu yang dulu terjadi.</p>
                              {j.kepahaman.length ? (
                                <div className="mt-2 space-y-1.5">
                                  {j.kepahaman.slice(0, 10).map((k) => (
                                    <div key={k.kunci} className="flex items-center gap-2">
                                      <div className="w-44 shrink-0">
                                        <div className="truncate font-mono text-[10px] text-neutral-300">{k.kunci}</div>
                                        <div className="truncate text-[9px] text-neutral-500">{k.judul}</div>
                                      </div>
                                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                                        <div className={`h-full ${k.akurasi >= 0.6 ? 'bg-emerald-400/80' : k.akurasi >= 0.4 ? 'bg-amber-400/80' : 'bg-rose-400/80'}`} style={{ width: `${Math.round(k.akurasi * 100)}%` }} />
                                      </div>
                                      <span className="w-20 shrink-0 text-right font-mono text-[10px] text-neutral-400">{(k.akurasi * 100).toFixed(0)}% · n{k.n}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="mt-2 text-sm text-neutral-400">gudang kepahaman masih kosong — isi terisi otomatis begitu keyakinan pertama dijawab pasar.</p>
                              )}
                            </Kartu>
                            <Kartu className="border-cyan-400/30">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <JudulKecil warna="text-cyan-300">suara ke dewan arah AR-E11 — pondasi modal ikut memutuskan</JudulKecil>
                                <Badge tone={j.vitamin.aktif ? 'hijau' : 'netral'}>{j.vitamin.aktif ? 'vitamin aktif' : 'menunggu'}</Badge>
                              </div>
                              <p className="text-[11px] text-cyan-100">{j.vitamin.teks}</p>
                              {j.kesaksian.length > 0 && (
                                <div className="mt-2 space-y-1.5">
                                  {j.kesaksian.map((k, i) => (
                                    <div key={i} className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-2">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-[11px] font-bold text-cyan-200">{k.dari.replace('OTAK-MODAL:', '')}</span>
                                        <span className={`text-[11px] font-bold ${k.vote === 'NAIK' ? 'text-emerald-300' : k.vote === 'TURUN' ? 'text-rose-300' : 'text-neutral-300'}`}>{k.vote}</span>
                                        <span className="font-mono text-[10px] text-neutral-400">kekuatan {k.kekuatan.toFixed(2)} · bobot dewan 0,09</span>
                                      </div>
                                      <p className="mt-1 text-[10px] leading-snug text-neutral-300">{k.cara}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {j.diary.length > 0 && (
                                <div className="mt-2">
                                  <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">diary otak (terbaru dulu)</div>
                                  <ul className="mt-1 space-y-1">
                                    {j.diary.slice(0, 6).map((d, i) => (
                                      <li key={i} className="text-[10px] leading-snug text-neutral-400"><span className="font-mono text-neutral-500">{new Date(d.at).toLocaleTimeString('id-ID')}</span> — {d.teks}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              <details className="mt-2">
                                <summary className="cursor-pointer text-[10px] text-neutral-500">hukum jujur jiwa modal</summary>
                                <ul className="mt-1 space-y-1">
                                  {j.jujur.map((t, i) => <li key={i} className="text-[10px] text-neutral-500">· {t}</li>)}
                                </ul>
                              </details>
                            </Kartu>
                          </div>
                        </>
                      );
                    })()}

                    {/* DAFTAR ORANG PASANG POSISI + WHALE TOP-20 (permintaan pemilik) */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Kartu>
                        <div className="mb-2 flex items-center gap-2">
                          <JudulKecil warna="text-cyan-300">daftar orang pasang posisi — long vs short</JudulKecil>
                          <Badge tone="netral">jumlah akun nyata</Badge>
                        </div>
                        {m.orang.hold !== null ? (() => {
                          const L = m.orang.long ?? 0;
                          const S = m.orang.short ?? 0;
                          const tot = Math.max(1, L + S);
                          const pL = (L / tot) * 100;
                          const pS = (S / tot) * 100;
                          return (
                            <>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                                  <div className="text-xl font-black text-emerald-300">{L.toLocaleString('id-ID')}</div>
                                  <div className="text-[10px] text-neutral-400">orang pasang LONG</div>
                                  <div className="text-[11px] font-mono text-emerald-400/80">{pL.toFixed(1)}%</div>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                                  <div className="text-xl font-black text-neutral-100">{(L + S).toLocaleString('id-ID')}</div>
                                  <div className="text-[10px] text-neutral-400">orang HOLD (pegang posisi)</div>
                                  <div className="text-[11px] font-mono text-neutral-400">rasio L/S 1 : {(L / Math.max(S, 1)).toFixed(2)}</div>
                                </div>
                                <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2">
                                  <div className="text-xl font-black text-rose-300">{S.toLocaleString('id-ID')}</div>
                                  <div className="text-[10px] text-neutral-400">orang pasang SHORT</div>
                                  <div className="text-[11px] font-mono text-rose-400/80">{pS.toFixed(1)}%</div>
                                </div>
                              </div>
                              <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-white/5">
                                <div className="bg-emerald-400/80" style={{ width: `${pL}%` }} />
                                <div className="bg-rose-400/80" style={{ width: `${pS}%` }} />
                              </div>
                              <p className="mt-2 text-[11px] text-neutral-500">{m.orang.sumber} · pembanding kerumunan Bybit (rasio akun): {m.orang.bybitAkun.buy !== null ? `${(m.orang.bybitAkun.buy * 100).toFixed(0)}% long / ${((m.orang.bybitAkun.sell ?? 0) * 100).toFixed(0)}% short` : '—'}</p>
                              <p className="text-[11px] text-neutral-500">makna: sisi yang penuh sesak = sisi yang dilikuidasi lebih dulu saat harga berbalik (otak arah memakai ini sebagai serangan KERUMUNAN).</p>
                              {m.sensus && (
                                <p className="mt-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-2 text-[11px] leading-snug text-cyan-100">
                                  jawaban gali A1 — &quot;masa hanya segitu?&quot;: Gate hanya <b>1 dari {m.sensus.venues.filter((v) => v.jenis === 'perp').length} venue perp</b> yang mempublikasi jumlah akun. Sensus lintas venue: total OI perp ≈ {m.sensus.totalOiUsd !== null ? `${(m.sensus.totalOiUsd / 1e6).toFixed(2)} jt USD` : '—'}, volume semua venue ≈ {m.sensus.totalVolUsd !== null ? `${(m.sensus.totalVolUsd / 1e6).toFixed(1)} jt USD/24j` : '—'} → skala universe ≈ <b>{m.sensus.estUniverseAkun !== null ? `${m.sensus.estUniverseAkun.toLocaleString('id-ID')} akun-posisi` : '—'}</b> (estimasi; detail di kartu GALI DALAM A1 di bawah).
                                </p>
                              )}
                            </>
                          );
                        })() : <p className="text-sm text-neutral-400">Menunggu data jumlah akun Gate.io…</p>}
                        {m.orang.riwayat.length >= 3 && (
                          <div className="mt-2">
                            <GrafikGaris data={m.orang.riwayat.map((r) => r.long)} label={`riwayat jumlah orang LONG (${m.orang.riwayat.length} titik — Gate 1 jam + memori otak)`} warna="#34d399" />
                          </div>
                        )}
                      </Kartu>
                      <Kartu>
                        <div className="mb-2 flex items-center gap-2">
                          <JudulKecil warna="text-violet-300">whale top-20 — jebakan atau sengaja pump?</JudulKecil>
                          <Badge tone={m.whaleTop.klasifikasi === 'PUMP_JUJUR' ? 'hijau' : m.whaleTop.klasifikasi === 'JEBAKAN' ? 'merah' : m.whaleTop.klasifikasi === 'WAR_POSISI' ? 'amber' : 'netral'}>{m.whaleTop.klasifikasi}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="rounded-lg border border-emerald-500/30 bg-black/30 p-2">
                            <div className="font-mono text-sm font-bold text-emerald-300">{m.whaleTop.topLongSize !== null ? (m.whaleTop.topLongSize * 10).toLocaleString('id-ID') : '—'}</div>
                            <div className="text-[10px] text-neutral-400">≈ ELSA posisi top-20 LONG {m.whaleTop.topLongAkun !== null ? `· ${m.whaleTop.topLongAkun} akun` : ''}</div>
                            {m.whaleTop.dTopLong !== null && <div className={`text-[11px] font-mono ${m.whaleTop.dTopLong >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{m.whaleTop.dTopLong >= 0 ? '+' : ''}{m.whaleTop.dTopLong.toFixed(1)}% / 3 jam</div>}
                          </div>
                          <div className="rounded-lg border border-rose-500/30 bg-black/30 p-2">
                            <div className="font-mono text-sm font-bold text-rose-300">{m.whaleTop.topShortSize !== null ? (m.whaleTop.topShortSize * 10).toLocaleString('id-ID') : '—'}</div>
                            <div className="text-[10px] text-neutral-400">≈ ELSA posisi top-20 SHORT {m.whaleTop.topShortAkun !== null ? `· ${m.whaleTop.topShortAkun} akun` : ''}</div>
                            {m.whaleTop.dTopShort !== null && <div className={`text-[11px] font-mono ${m.whaleTop.dTopShort >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{m.whaleTop.dTopShort >= 0 ? '+' : ''}{m.whaleTop.dTopShort.toFixed(1)}% / 3 jam</div>}
                          </div>
                        </div>
                        <p className="mt-2 text-[12px] leading-snug text-neutral-200">{m.whaleTop.cara}</p>
                        <p className="mt-1 text-[11px] text-neutral-500">{m.whaleTop.sumber}</p>
                      </Kartu>
                    </div>

                    {/* drive + squeeze + ringkasan modal */}
                    <div className="grid gap-4 lg:grid-cols-3">
                      <Kartu>
                        <GaugeArc pct={m.drive.pct} label="penggerak futures" sub={m.drive.label} />
                        <p className="mt-1 text-[11px] leading-snug text-neutral-400">{m.drive.ket}</p>
                        <div className="mt-2 space-y-1.5">
                          {m.drive.komponen.map((k) => <BarSkor key={k.k} label={k.k} v={k.v} />)}
                        </div>
                      </Kartu>
                      <Kartu>
                        <JudulKecil>ringkasan modal 24 jam</JudulKecil>
                        <ul className="space-y-2 text-[12px]">
                          <li className="flex justify-between"><span className="text-neutral-400">volume perp</span><span className="font-mono text-neutral-200">{(m.volume.perp24jUsd / 1e6).toFixed(1)} jt USD</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">volume spot</span><span className="font-mono text-neutral-200">{(m.volume.spot24jUsd / 1e6).toFixed(1)} jt USD</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">porsi futures</span><span className="font-mono text-amber-300">{(m.volume.bagianFuturesPct * 100).toFixed(0)}%</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">basis perp−spot</span><span className={`font-mono ${m.harga.basisPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{pct(m.harga.basisPct, 2)}</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">taker beli perp</span><span className="font-mono text-neutral-200">{(m.taker.perpBuyPct * 100).toFixed(0)}%</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">taker beli spot</span><span className="font-mono text-neutral-200">{(m.taker.spotBuyPct * 100).toFixed(0)}%</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">funding ({m.funding.intervalJam}j)</span><span className={`font-mono ${m.funding.tinggi ? 'text-rose-300' : 'text-neutral-200'}`}>{(m.funding.sekarang * 100).toFixed(4)}%</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">funding rata 48j</span><span className="font-mono text-neutral-200">{(m.funding.rata12 * 100).toFixed(4)}%</span></li>
                          <li className="flex justify-between"><span className="text-neutral-400">akun long vs short</span><span className="font-mono text-neutral-200">{m.lsRasio.buyRatio !== null ? `${(m.lsRasio.buyRatio * 100).toFixed(0)}% / ${(m.lsRasio.sellRatio * 100).toFixed(0)}%` : '—'}</span></li>
                        </ul>
                      </Kartu>
                      <Kartu>
                        <GaugeArc pct={m.squeeze.skor} label="short squeeze" sub={m.squeeze.aktif ? 'AKTIF' : 'tidak aktif'} />
                        <p className="mt-1 text-[11px] leading-snug text-neutral-400">{m.squeeze.ket}</p>
                        <JudulKecil warna="text-teal-300">open interest (memori otak)</JudulKecil>
                        <div className="text-lg font-black text-neutral-100">{m.oi.sekarang !== null ? `${(m.oi.sekarang / 1e6).toFixed(1)} jt ELSA` : '—'}</div>
                        <div className="text-[11px] text-neutral-500">{m.oi.oiUsd !== null ? `≈ ${(m.oi.oiUsd / 1e6).toFixed(2)} jt USD` : ''} · {m.oi.jumlahSampel} sampel</div>
                        <ul className="mt-2 space-y-1 text-[12px]">
                          {oiDeltaRows.map(([lbl, dOI, dP]) => (
                            <li key={lbl} className="flex justify-between">
                              <span className="text-neutral-400">ΔOI {lbl}</span>
                              <span className="font-mono">
                                {dOI === null ? <span className="text-neutral-500">mengumpulkan…</span> : (
                                  <><span className={dOI >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{pct(dOI, 2)}</span><span className="text-neutral-500"> (harga {pct(dP ?? 0, 2)})</span></>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Kartu>
                    </div>

                    {/* peta likuidasi */}
                    <Kartu>
                      <JudulKecil>peta likuidasi ELSA (estimasi koridor magnet)</JudulKecil>
                      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                        <PetaLikuidasi bands={m.likuidasi.bands} harga={m.harga.perp} topLong={m.likuidasi.topLong} topShort={m.likuidasi.topShort} magnet={m.likuidasi.magnet} />
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                              <div className="font-mono text-sm font-bold text-emerald-300">{(m.likuidasi.totalLongUsd / 1e6).toFixed(1)} jt</div>
                              <div className="text-[10px] text-neutral-400">est. likuidasi LONG (di bawah)</div>
                            </div>
                            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2">
                              <div className="font-mono text-sm font-bold text-rose-300">{(m.likuidasi.totalShortUsd / 1e6).toFixed(1)} jt</div>
                              <div className="text-[10px] text-neutral-400">est. likuidasi SHORT (di atas)</div>
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-emerald-300">cluster long terbesar</div>
                            <table className="w-full text-left text-[12px]">
                              <thead className="text-neutral-500"><tr><th>harga</th><th>est. nilai</th><th>jarak</th></tr></thead>
                              <tbody className="font-mono text-neutral-300">
                                {m.likuidasi.topLong.map((t, i) => (
                                  <tr key={i} className="border-t border-white/5"><td>${fmtHarga(t.harga)}</td><td>{(t.usd / 1e6).toFixed(2)} jt</td><td className="text-rose-300">−{t.jarakPct.toFixed(1)}%</td></tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-rose-300">cluster short terbesar</div>
                            <table className="w-full text-left text-[12px]">
                              <thead className="text-neutral-500"><tr><th>harga</th><th>est. nilai</th><th>jarak</th></tr></thead>
                              <tbody className="font-mono text-neutral-300">
                                {m.likuidasi.topShort.map((t, i) => (
                                  <tr key={i} className="border-t border-white/5"><td>${fmtHarga(t.harga)}</td><td>{(t.usd / 1e6).toFixed(2)} jt</td><td className="text-emerald-300">+{t.jarakPct.toFixed(1)}%</td></tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p className="text-[11px] leading-snug text-neutral-500">{m.likuidasi.ket}</p>
                        </div>
                      </div>
                    </Kartu>

                    {/* SIAPA BELI DI HARGA BERAPA + FORMULA KORBAN LIKUIDASI */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Kartu>
                        <JudulKecil warna="text-cyan-300">siapa beli di harga berapa — tape per tingkat harga (±2%)</JudulKecil>
                        <p className="mb-2 text-[11px] text-neutral-500">Bucket 0,25% dari tape 30 menit perp+spot Bybit (diakumulasi otak tiap poll). Print ≥ ambang whale ({fmtUsd(m.whale.ambangPerp).replace('+', '')} perp / {fmtUsd(m.whale.ambangSpot).replace('+', '')} spot) ditandai <span className="font-bold text-violet-300">WHALE</span> — begitu pula akun-akun whale lain yang menampung di level itu.</p>
                        <div className="max-h-72 overflow-y-auto rounded-lg border border-white/10">
                          <table className="w-full text-left text-[11px]">
                            <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">harga</th><th>beli</th><th>jual</th><th>whale beli</th><th>whale jual</th><th>n</th></tr></thead>
                            <tbody className="font-mono text-neutral-300">
                              {m.tape.map((t, i) => {
                                const whale = t.whaleBeliUsd > 0 || t.whaleJualUsd > 0;
                                return (
                                  <tr key={i} className={`border-t border-white/5 ${whale ? 'bg-violet-500/5' : ''}`}>
                                    <td className="px-2 py-1">${fmtHarga(t.harga)}</td>
                                    <td className="text-emerald-300/90">{fmtUsd(t.beliUsd).replace('+', '')}</td>
                                    <td className="text-rose-300/90">{fmtUsd(t.jualUsd).replace('+', '')}</td>
                                    <td className={t.whaleBeliUsd > 0 ? 'font-bold text-violet-300' : 'text-neutral-600'}>{t.whaleBeliUsd > 0 ? fmtUsd(t.whaleBeliUsd).replace('+', '') : '—'}</td>
                                    <td className={t.whaleJualUsd > 0 ? 'font-bold text-violet-300' : 'text-neutral-600'}>{t.whaleJualUsd > 0 ? fmtUsd(t.whaleJualUsd).replace('+', '') : '—'}</td>
                                    <td className="text-neutral-500">{t.n}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </Kartu>
                      <Kartu>
                        <JudulKecil warna="text-amber-300">formula: mana yang akan terliquidasi</JudulKecil>
                        <div className="max-h-40 overflow-y-auto rounded-lg border border-white/10">
                          <table className="w-full text-left text-[11px]">
                            <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">leverage</th><th>likuidasi LONG di</th><th>jarak</th><th>likuidasi SHORT di</th><th>jarak</th></tr></thead>
                            <tbody className="font-mono text-neutral-300">
                              {m.korban.tier.map((t, i) => (
                                <tr key={i} className="border-t border-white/5">
                                  <td className="px-2 py-1 font-bold">{t.lev}x</td>
                                  <td className="text-rose-300">${fmtHarga(t.longHarga)}</td>
                                  <td className="text-rose-400/80">−{t.longJarakPct.toFixed(1)}%</td>
                                  <td className="text-emerald-300">${fmtHarga(t.shortHarga)}</td>
                                  <td className="text-emerald-400/80">+{t.shortJarakPct.toFixed(1)}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <ul className="mt-2 space-y-1.5 text-[12px]">
                          {m.korban.berikutnya.map((k, i) => (
                            <li key={i} className={k.sisi === 'long' ? 'text-rose-200' : 'text-emerald-200'}>{k.narasi}</li>
                          ))}
                        </ul>
                        <p className="mt-2 text-[11px] leading-snug text-neutral-500">{m.korban.formula}</p>
                      </Kartu>
                    </div>

                    {/* RIWAYAT LIKUIDASI NYATA */}
                    <Kartu>
                      <JudulKecil warna="text-rose-300">riwayat likuidasi nyata ELSA (agregat resmi Gate.io)</JudulKecil>
                      {m.liqReal.length === 0 ? (
                        <p className="text-sm text-neutral-400">Jendela data ~30 jam terakhir bersih — tidak ada likuidasi besar tercatat di Gate. Riwayat Bybit-level likuidasi ELSA tidak dipublikasi publik; peta estimasi di atas dipakai sebagai koridornya.</p>
                      ) : (() => {
                        const totL = m.liqReal.reduce((s, x) => s + x.longUsd, 0);
                        const totS = m.liqReal.reduce((s, x) => s + x.shortUsd, 0);
                        return (
                          <>
                            <div className="mb-2 grid grid-cols-3 gap-2 text-center">
                              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2"><div className="font-mono text-sm font-bold text-rose-300">{fmtUsd(totL).replace('+', '')}</div><div className="text-[10px] text-neutral-400">total likuidasi LONG tercatat</div></div>
                              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2"><div className="font-mono text-sm font-bold text-emerald-300">{fmtUsd(totS).replace('+', '')}</div><div className="text-[10px] text-neutral-400">total likuidasi SHORT tercatat</div></div>
                              <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-neutral-200">{m.liqReal.length} kejadian</div><div className="text-[10px] text-neutral-400">dalam jendela ~30 jam</div></div>
                            </div>
                            <div className="max-h-52 overflow-y-auto rounded-lg border border-white/10">
                              <table className="w-full text-left text-[11px]">
                                <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">waktu</th><th>likuidasi LONG</th><th>likuidasi SHORT</th><th>harga mark saat itu</th></tr></thead>
                                <tbody className="font-mono text-neutral-300">
                                  {m.liqReal.map((x, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                      <td className="px-2 py-1 text-neutral-500">{new Date(x.at).toLocaleString('id-ID', { hour12: false })}</td>
                                      <td className="text-rose-300">{x.longUsd > 0 ? fmtUsd(x.longUsd).replace('+', '') : '—'}</td>
                                      <td className="text-emerald-300">{x.shortUsd > 0 ? fmtUsd(x.shortUsd).replace('+', '') : '—'}</td>
                                      <td className="text-neutral-400">${fmtHarga(x.harga)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        );
                      })()}
                    </Kartu>

                    {/* GALI DALAM A1 — SENSUS LINTAS VENUE (jawaban "masa hanya segitu?") */}
                    {m.sensus && (
                      <Kartu>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <JudulKecil warna="text-cyan-300">gali dalam A1 — sensus lintas venue ELSA</JudulKecil>
                          <Badge tone="netral">{m.sensus.venues.filter((v) => v.jenis === 'perp').length} perp + {m.sensus.venues.filter((v) => v.jenis === 'spot').length} spot</Badge>
                          <Badge tone="amber">est. universe {m.sensus.estUniverseAkun !== null ? m.sensus.estUniverseAkun.toLocaleString('id-ID') : '—'} akun-posisi</Badge>
                        </div>
                        <div className="mb-2 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
                          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-amber-300">{m.sensus.totalOiUsd !== null ? `${(m.sensus.totalOiUsd / 1e6).toFixed(2)} jt` : '—'}</div><div className="text-[10px] text-neutral-400">total OI perp (USD)</div></div>
                          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-neutral-100">{m.sensus.totalOiElsa !== null ? `${(m.sensus.totalOiElsa / 1e6).toFixed(1)} jt` : '—'}</div><div className="text-[10px] text-neutral-400">total OI (ELSA)</div></div>
                          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-neutral-100">{m.sensus.totalVolUsd !== null ? `${(m.sensus.totalVolUsd / 1e6).toFixed(1)} jt` : '—'}</div><div className="text-[10px] text-neutral-400">volume semua venue 24j (USD)</div></div>
                          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2"><div className="font-mono text-sm font-bold text-cyan-300">{m.sensus.akunGate.hold !== null ? m.sensus.akunGate.hold.toLocaleString('id-ID') : '—'}</div><div className="text-[10px] text-neutral-400">akun Gate (satu-satunya nyata)</div></div>
                        </div>
                        <div className="max-h-80 overflow-y-auto rounded-lg border border-white/10">
                          <table className="w-full min-w-[640px] text-left text-[11px]">
                            <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">venue</th><th>jenis</th><th>OI ELSA</th><th>OI USD</th><th>vol 24j</th><th>funding</th><th>long/short (akun / rasio)</th><th>est. akun-posisi</th></tr></thead>
                            <tbody className="font-mono text-neutral-300">
                              {m.sensus.venues.map((v, i) => (
                                <tr key={i} className="border-t border-white/5">
                                  <td className="px-2 py-1 font-semibold text-neutral-200" title={v.catatan}>{v.venue}</td>
                                  <td className="uppercase text-neutral-400">{v.jenis}</td>
                                  <td>{v.oiElsa !== null ? `${(v.oiElsa / 1e6).toFixed(2)} jt` : '—'}</td>
                                  <td>{v.oiUsd !== null ? fmtUsd(v.oiUsd).replace('+', '') : '—'}</td>
                                  <td>{v.vol24jUsd !== null ? fmtUsd(v.vol24jUsd).replace('+', '') : '—'}</td>
                                  <td>{v.funding !== null ? `${(v.funding * 100).toFixed(4)}%` : '—'}</td>
                                  <td>{v.akunNyata ? `${(v.akunLong ?? 0).toLocaleString('id-ID')} / ${(v.akunShort ?? 0).toLocaleString('id-ID')}` : v.ratioLong !== null ? `${(v.ratioLong * 100).toFixed(0)}% / ${((1 - v.ratioLong) * 100).toFixed(0)}%` : '—'}</td>
                                  <td>{v.estAkun !== null ? <span className="text-cyan-300">±{v.estAkun.toLocaleString('id-ID')}</span> : <span className="text-neutral-600">—</span>}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-[11px] leading-snug text-neutral-400">{m.sensus.ket}</p>
                        <p className="text-[11px] leading-snug text-neutral-500">{m.sensus.metodeEstimasi}</p>
                      </Kartu>
                    )}

                    {/* PORTAL WAKTU — time traveler likuidasi */}
                    {m.portal && (
                      <Kartu>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <JudulKecil warna="text-violet-300">portal waktu — time traveler likuidasi (dibaca SEBELUM kejadian)</JudulKecil>
                          <Badge tone="netral">sigma 24j {m.portal.sigma24jPct.toFixed(2)}%</Badge>
                        </div>
                        <div className="mb-3 grid gap-2 sm:grid-cols-2">
                          {m.portal.bencanaTurun && (
                            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3">
                              <div className="text-[10px] font-bold uppercase tracking-widest text-rose-300">bencana JATUH (likuidasi long) paling mungkin</div>
                              <p className="mt-1 text-[12px] leading-snug text-rose-100">{m.portal.bencanaTurun.narasi}</p>
                              <div className="mt-1 font-mono text-[11px] text-neutral-300">prob 24j {(m.portal.bencanaTurun.prob24j * 100).toFixed(0)}% · 72j {(m.portal.bencanaTurun.prob72j * 100).toFixed(0)}% · tier mati {m.portal.bencanaTurun.tierMati.join('/')}x</div>
                            </div>
                          )}
                          {m.portal.bencanaNaik && (
                            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3">
                              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">bencana PANAS (likuidasi short / squeeze) paling mungkin</div>
                              <p className="mt-1 text-[12px] leading-snug text-emerald-100">{m.portal.bencanaNaik.narasi}</p>
                              <div className="mt-1 font-mono text-[11px] text-neutral-300">prob 24j {(m.portal.bencanaNaik.prob24j * 100).toFixed(0)}% · 72j {(m.portal.bencanaNaik.prob72j * 100).toFixed(0)}% · tier mati {m.portal.bencanaNaik.tierMati.join('/')}x</div>
                            </div>
                          )}
                        </div>
                        <div className="max-h-96 overflow-y-auto rounded-lg border border-white/10">
                          <table className="w-full min-w-[680px] text-left text-[11px]">
                            <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">sisi korban</th><th>Δ harga</th><th>trigger</th><th>prob 24j</th><th>prob 72j</th><th>korban USD</th><th>est. akun</th><th>tier mati</th><th>harga akhir kaskade</th></tr></thead>
                            <tbody className="font-mono text-neutral-300">
                              {m.portal.skenario.slice(0, 14).map((s, i) => (
                                <tr key={i} className={`border-t border-white/5 ${s.sisi === 'long' ? 'bg-rose-500/[0.04]' : 'bg-emerald-500/[0.04]'}`}>
                                  <td className={`px-2 py-1 font-bold ${s.sisi === 'long' ? 'text-rose-300' : 'text-emerald-300'}`}>{s.sisi === 'long' ? 'LONG' : 'SHORT'}</td>
                                  <td className={s.sisi === 'long' ? 'text-rose-300' : 'text-emerald-300'}>{s.sisi === 'long' ? '−' : '+'}{s.dPct.toFixed(2)}%</td>
                                  <td>${fmtHarga(s.triggerHarga)}</td>
                                  <td>{(s.prob24j * 100).toFixed(1)}%</td>
                                  <td className="text-neutral-500">{(s.prob72j * 100).toFixed(1)}%</td>
                                  <td>{fmtUsd(s.korbanUsd).replace('+', '')}</td>
                                  <td>{s.estAkunKorban !== null ? s.estAkunKorban.toLocaleString('id-ID') : '—'}</td>
                                  <td className="text-neutral-400">{s.tierMati.join('/')}x</td>
                                  <td>${fmtHarga(s.hargaAkhir)} <span className={s.dAkhirPct >= 0 ? 'text-emerald-400/80' : 'text-rose-400/80'}>({s.dAkhirPct >= 0 ? '+' : ''}{s.dAkhirPct.toFixed(1)}%)</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-[11px] leading-snug text-neutral-500">{m.portal.metode}</p>
                      </Kartu>
                    )}

                    {/* ESTIMASI LEVERAGE + AKUMULASI SENYAP SPOT */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      {m.leverage && (
                        <Kartu>
                          <JudulKecil warna="text-amber-300">estimasi leverage terpasang — posisi dipasang kali berapa?</JudulKecil>
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                              <div className="font-mono text-lg font-black text-emerald-300">{m.leverage.longDominan !== null ? `${m.leverage.longDominan}x` : `~${m.leverage.dominanTier}x`}</div>
                              <div className="text-[10px] text-neutral-400">dominan LONG {m.leverage.longDominan === null ? '(tebakan tier)' : '(dari kaskade nyata)'}</div>
                            </div>
                            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2">
                              <div className="font-mono text-lg font-black text-rose-300">{m.leverage.shortDominan !== null ? `${m.leverage.shortDominan}x` : `~${m.leverage.dominanTier}x`}</div>
                              <div className="text-[10px] text-neutral-400">dominan SHORT {m.leverage.shortDominan === null ? '(tebakan tier)' : '(dari kaskade nyata)'}</div>
                            </div>
                          </div>
                          {m.leverage.kaskade.length > 0 && (
                            <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-white/10">
                              <table className="w-full text-left text-[11px]">
                                <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">waktu</th><th>sisi dipaksa tutup</th><th>Δ harga</th><th>Δ OI</th><th>lev. implisit</th></tr></thead>
                                <tbody className="font-mono text-neutral-300">
                                  {[...m.leverage.kaskade].reverse().map((k, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                      <td className="px-2 py-1 text-neutral-500">{new Date(k.at).toLocaleTimeString('id-ID')}</td>
                                      <td className={k.sisi === 'long' ? 'text-rose-300' : 'text-emerald-300'}>{k.sisi.toUpperCase()}</td>
                                      <td>{k.dP >= 0 ? '+' : ''}{k.dP.toFixed(2)}%</td>
                                      <td className="text-neutral-400">{k.dOI.toFixed(2)}%</td>
                                      <td className="font-bold text-amber-300">{k.lev}x</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          <p className="mt-2 text-[11px] leading-snug text-neutral-500">{m.leverage.metode}</p>
                        </Kartu>
                      )}
                      {m.akumulasi && (
                        <Kartu>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <JudulKecil warna="text-teal-300">akumulasi senyap spot — siapa menampung diam-diam?</JudulKecil>
                            <Badge tone={m.akumulasi.verdict === 'AKUMULASI_SENYAP_AKTIF' ? 'hijau' : m.akumulasi.verdict === 'ADA_TANDA_MENAMPUNG' ? 'amber' : 'netral'}>{m.akumulasi.verdict.replace(/_/g, ' ').toLowerCase()}</Badge>
                            <span className="font-mono text-[11px] text-neutral-500">skor {m.akumulasi.skor}/100</span>
                          </div>
                          <div className="mb-2 grid grid-cols-3 gap-2 text-center">
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-neutral-100">{fmtUsd(m.akumulasi.perVenue.bybit).replace('+', '')}</div><div className="text-[10px] text-neutral-400">Bybit spot</div></div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-neutral-100">{fmtUsd(m.akumulasi.perVenue.gate).replace('+', '')}</div><div className="text-[10px] text-neutral-400">Gate spot</div></div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-mono text-sm font-bold text-neutral-100">{fmtUsd(m.akumulasi.perVenue.upbit).replace('+', '')}</div><div className="text-[10px] text-neutral-400">Upbit (KRW→USD)</div></div>
                          </div>
                          {m.akumulasi.band.length > 0 && (
                            <div className="max-h-44 overflow-y-auto rounded-lg border border-white/10">
                              <table className="w-full min-w-[560px] text-left text-[11px]">
                                <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">harga menampung</th><th>usd senyap</th><th>whale di level</th><th>n jam</th><th>venue</th><th>Δ rata²</th><th>tanda</th></tr></thead>
                                <tbody className="font-mono text-neutral-300">
                                  {m.akumulasi.band.map((b, i) => (
                                    <tr key={i} className={`border-t border-white/5 ${b.verdict === 'SENYAP' ? 'bg-teal-500/[0.06]' : ''}`}>
                                      <td className="px-2 py-1">${fmtHarga(b.harga)}</td>
                                      <td>{fmtUsd(b.usdSenyap).replace('+', '')}</td>
                                      <td className={b.whaleUsd > 0 ? 'font-bold text-violet-300' : 'text-neutral-600'}>{b.whaleUsd > 0 ? fmtUsd(b.whaleUsd).replace('+', '') : '—'}</td>
                                      <td className="text-neutral-500">{b.nJam}</td>
                                      <td className="text-neutral-400">{b.venue}</td>
                                      <td>{b.deltaPct >= 0 ? '+' : ''}{b.deltaPct.toFixed(2)}%</td>
                                      <td className={b.verdict === 'SENYAP' ? 'text-teal-300' : b.verdict === 'AGRESIF' ? 'text-amber-300' : 'text-neutral-500'}>{b.verdict.toLowerCase()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          {m.akumulasi.whaleTampung.length > 0 && (
                            <ul className="mt-2 space-y-1 text-[11px] text-neutral-300">
                              {m.akumulasi.whaleTampung.map((w, i) => (
                                <li key={i}>· whale MENAMPUNG spot <span className="font-mono">${fmtHarga(w.price)}</span> ≈ {fmtUsd(w.usd).replace('+', '')} · {new Date(w.at).toLocaleTimeString('id-ID')}</li>
                              ))}
                            </ul>
                          )}
                          <p className="mt-2 text-[11px] leading-snug text-neutral-500">{m.akumulasi.ket}</p>
                          <p className="text-[11px] leading-snug text-neutral-600">{m.akumulasi.metode}</p>
                        </Kartu>
                      )}
                    </div>

                    {/* radar whale */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Kartu>
                        <div className="mb-2 flex items-center gap-2">
                          <JudulKecil warna="text-violet-300">radar whale</JudulKecil>
                          <Badge tone={m.whale.biasLabel === 'AKUMULASI' ? 'hijau' : m.whale.biasLabel === 'DISTRIBUSI' ? 'merah' : 'netral'}>{m.whale.biasLabel}</Badge>
                          <span className="font-mono text-[11px] text-neutral-500">bias {m.whale.bias >= 0 ? '+' : ''}{m.whale.bias.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                            <div className={`font-mono text-sm font-bold ${m.whale.perpNet >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmtUsd(m.whale.perpNet)}</div>
                            <div className="text-[10px] text-neutral-400">arus whale perp (net)</div>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                            <div className={`font-mono text-sm font-bold ${m.whale.spotNet >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{fmtUsd(m.whale.spotNet)}</div>
                            <div className="text-[10px] text-neutral-400">arus whale spot (net)</div>
                          </div>
                        </div>
                        <p className="mt-2 text-[11px] text-neutral-400">konfirmasi spot {(m.whale.konfirmasiSpot * 100).toFixed(0)}% — makin positif, makin besar dana spot nyata mendukung gerak · ambang whale: perp {fmtUsd(m.whale.ambangPerp).replace('+', '')} / spot {fmtUsd(m.whale.ambangSpot).replace('+', '')} per print</p>
                        <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-white/10">
                          <table className="w-full text-left text-[11px]">
                            <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">waktu</th><th>pasar</th><th>sisi</th><th>ukuran</th><th>nilai</th></tr></thead>
                            <tbody className="font-mono text-neutral-300">
                              {m.whale.print.map((pr, i) => (
                                <tr key={i} className="border-t border-white/5">
                                  <td className="px-2 py-1 text-neutral-500">{new Date(pr.at).toLocaleTimeString('id-ID')}</td>
                                  <td className="uppercase text-neutral-400">{pr.mkt}</td>
                                  <td className={pr.side === 'Buy' ? 'text-emerald-300' : 'text-rose-300'}>{pr.side}</td>
                                  <td>{pr.size.toLocaleString('id-ID')} ELSA</td>
                                  <td>{fmtUsd(pr.usd).replace('+', '')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {m.sidikWhale && m.sidikWhale.akun.length > 0 && (
                          <div className="mt-2">
                            <JudulKecil warna="text-violet-300">sidik akun whale — akun berbeda yang terbaca</JudulKecil>
                            <div className="max-h-44 overflow-y-auto rounded-lg border border-white/10">
                              <table className="w-full min-w-[540px] text-left text-[11px]">
                                <thead className="bg-white/5 text-neutral-400"><tr><th className="px-2 py-1">id</th><th>pasar</th><th>sisi</th><th>n print</th><th>total</th><th>tiket tipe</th><th>pola</th><th>terakhir</th></tr></thead>
                                <tbody className="font-mono text-neutral-300">
                                  {m.sidikWhale.akun.map((a, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                      <td className="px-2 py-1 font-bold text-violet-300">{a.id}</td>
                                      <td className="uppercase text-neutral-400">{a.mkt}</td>
                                      <td className={a.side === 'Buy' ? 'text-emerald-300' : 'text-rose-300'}>{a.side}</td>
                                      <td>{a.nPrint}</td>
                                      <td>{fmtUsd(a.usdTotal).replace('+', '')}</td>
                                      <td>{fmtUsd(a.ukuranTipe).replace('+', '')}</td>
                                      <td className="text-neutral-400">{a.pola}</td>
                                      <td className="text-neutral-500">{new Date(a.terakhir).toLocaleTimeString('id-ID')}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <p className="mt-1 text-[11px] text-neutral-500">{m.sidikWhale.ket}</p>
                          </div>
                        )}
                      </Kartu>
                      <div className="space-y-4">
                        <Kartu>
                          <JudulKecil warna="text-violet-300">cluster posisi whale (entry terprogram)</JudulKecil>
                          {m.whale.cluster.length === 0 && <p className="text-sm text-neutral-400">Belum ada cluster ≥3 print atau ≥3× ambang — whale belum memasang posisi besar terdeteksi.</p>}
                          <ul className="space-y-1.5 text-[12px]">
                            {m.whale.cluster.map((c, i) => (
                              <li key={i} className="text-neutral-300">
                                <span className={c.side === 'Buy' ? 'text-emerald-300' : 'text-rose-300'}>{c.side}</span> <span className="uppercase text-neutral-500">{c.mkt}</span> ×{c.jumlah} print ≈ {fmtUsd(c.usd)} · {new Date(c.at).toLocaleTimeString('id-ID')}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-2 text-[11px] text-neutral-500">Cluster buy dekat dasar + funding dingin = pola pasang-posisi untuk pump. Cluster sell saat harga di puncak + funding panas = pola jebakan.</p>
                        </Kartu>
                        <Kartu>
                          <JudulKecil warna="text-amber-300">catatan jujur metode</JudulKecil>
                          <ul className="space-y-1.5 text-[11px] text-neutral-400">
                            {m.meta.catatan.map((c, i) => <li key={i}>· {c}</li>)}
                          </ul>
                        </Kartu>
                      </div>
                    </div>

                    {/* grafik funding, L/S, memori OI + log acara */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Kartu>
                        <GrafikBatang
                          data={m.funding.sejarah.map((x) => x.rate * 100)}
                          label="riwayat funding (24 interval terakhir)"
                          satuan={`terakhir ${(m.funding.sekarang * 100).toFixed(4)}% / ${m.funding.intervalJam}j`}
                        />
                        <p className="mt-1 text-[11px] text-neutral-500">Funding panas (&gt;0,06%) = kerumunan long padat → rawan jebakan bull; funding negatif = short membayar → bensin squeeze.</p>
                      </Kartu>
                      <Kartu>
                        <GrafikGaris data={m.lsRasio.sejarah.map((x) => x.buy * 100)} label="rasio akun long (global L/S, harian)" warna="#2dd4bf" />
                        <p className="mt-1 text-[11px] text-neutral-500">{m.lsRasio.buyRatio !== null ? `hari ini: long ${(m.lsRasio.buyRatio * 100).toFixed(1)}% vs short ${(m.lsRasio.sellRatio * 100).toFixed(1)}% — kerumunan condong ${m.lsRasio.buyRatio! >= 0.5 ? 'LONG' : 'SHORT'} (kontra-gerak saat ekstrem)` : 'menunggu data'}</p>
                      </Kartu>
                      <Kartu>
                        {(m.oi.riwayat && m.oi.riwayat.length >= 3) || m.memoriOI.length >= 3 ? (
                          <>
                            <GrafikGaris
                              data={(m.oi.riwayat && m.oi.riwayat.length >= 3 ? m.oi.riwayat : m.memoriOI).map((s) => s.oi)}
                              label={m.oi.riwayat && m.oi.riwayat.length >= 3 ? `OI riwayat resmi Bybit (${m.oi.riwayat.length} jam)` : `memori OI otak (${m.oi.jumlahSampel} sampel — dicatat sendiri tiap poll)`}
                              warna="#a78bfa"
                            />
                            <p className="mt-1 text-[11px] text-neutral-500">OI turun saat harga naik = squeeze/penutupan · OI naik mengikuti harga = posisi baru (tren kuat) · OI turun saat harga turun = likuidasi long.</p>
                          </>
                        ) : (
                          <>
                            <JudulKecil warna="text-violet-300">riwayat OI</JudulKecil>
                            <p className="text-sm text-neutral-300">Mengumpulkan sampel OI ({m.oi.jumlahSampel}) — riwayat resmi Bybit (1 jam) + memori otak 5 menit. Grafik muncul dalam beberapa menit.</p>
                          </>
                        )}
                      </Kartu>
                      <Kartu>
                        <JudulKecil>log acara modal (ledger otak)</JudulKecil>
                        {m.acara.length === 0 && <p className="text-sm text-neutral-400">Belum ada acara tercatat.</p>}
                        <ul className="space-y-1.5 text-[12px]">
                          {m.acara.map((a, i) => (
                            <li key={i} className="text-neutral-300">
                              <Badge tone={a.kind === 'VONIS' ? 'amber' : a.kind === 'WHALE' ? 'ungu' : 'merah'}>{a.kind}</Badge>{' '}
                              {a.text} <span className="text-[10px] text-neutral-500">· {new Date(a.at).toLocaleTimeString('id-ID')}</span>
                            </li>
                          ))}
                        </ul>
                      </Kartu>
                    </div>
                  </div>
                );
              })()}

              {/* ============ TAB: ALIRAN & UJIAN 500 ============ */}
              {tab === 'aliran' && !data.aliran && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-neutral-300">Otak aliran menyaring derivatif ELSA (Gate.io: orang, whale, OI, likuidasi)…</p>
                </div>
              )}
              {tab === 'aliran' && data.aliran && <TabAliran a={data.aliran} paham={data.paham ?? null} />}

              {/* ============ TAB: RADAR PAUS ============ */}
              {tab === 'paus' && !data.paus && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-neutral-300">Radar paus membaca tape nyata (Bybit spot+linear, Gate spot & stats)…</p>
                </div>
              )}
              {tab === 'paus' && data.paus && <TabPaus p={data.paus} />}

              {/* ============ TAB: RADAR ANTI-KECOLONGAN (IGNISI + KASUS) ============ */}
              {tab === 'ignisi' && !data.ignisi && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-neutral-300">Radar anti-kecolongan menyala: membaca candle per-menit Gate+Bybit, tape taker, OI futures, rotasi venue… (denyut tiap 60 detik)</p>
                </div>
              )}
              {tab === 'ignisi' && data.ignisi && <TabIgnisi ign={data.ignisi} kasus={data.kasus ?? []} rekonsiliasi={data.rekonsiliasiPaus ?? null} />}

              {/* ============ TAB: MATRIKS SUMBER ============ */}
              {tab === 'sumber' && !data.sumber && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-sm text-neutral-300">Otak sumber menyaring matriks sumber informasi (CoinGecko, CMC unlock, DEXScreener, GeckoTerminal)…</p>
                </div>
              )}
              {tab === 'sumber' && data.sumber && <TabSumber s={data.sumber} />}

              {/* ============ TAB: UJIAN MANDIRI — organ hidup berdenyut ============ */}
              {tab === 'ujian' && data.ujian && <TabUjianMandiri u={data.ujian} denyut={data.ujianDenyut ?? null} paham={data.paham ?? null} />}

              {/* ============ TAB: UJIAN ELSA 100 — dari kemunculan hingga kini ============ */}
              {tab === 'ujianelsa' && data.ujianElsa && <TabUjianElsa u={data.ujianElsa} onUlang={muat} berjalan={berjalan} otonomi={data.otonomi ?? null} denyut={data.ujianDenyut ?? null} />}

              {/* ============ TAB: PERTUMBUHAN ============ */}
              {tab === 'tumbuh' && data.pertumbuhan && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <Kartu>
                      <JudulKecil>AGI%</JudulKecil>
                      <div className="text-3xl font-black text-amber-300">{data.pertumbuhan.agiPct}%</div>
                      <div className="text-[11px] text-neutral-400">skala 0-10 · evolusi tiap vonis</div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>dimensi P · G · A</JudulKecil>
                      <div className="text-sm text-neutral-300">P kepastian {data.pertumbuhan.P}%</div>
                      <div className="text-sm text-neutral-300">G luas {data.pertumbuhan.G}%</div>
                      <div className="text-sm text-neutral-300">A akurasi {data.pertumbuhan.A}%</div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>peringkat</JudulKecil>
                      <div className="text-lg font-black">{data.pertumbuhan.rank.id} {data.pertumbuhan.rank.name}</div>
                      <div className="text-[11px] text-neutral-400">{data.pertumbuhan.rank.desc}</div>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>mesin dasar</JudulKecil>
                      <div className="text-sm text-neutral-300">akurasi {(data.pertumbuhan.akurasi * 100).toFixed(0)}%</div>
                      <div className="text-sm text-neutral-300">ekspektansi R {data.pertumbuhan.ekspektansi}</div>
                    </Kartu>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Kartu>
                      <JudulKecil>kurikulum pertumbuhan (teratas dulu)</JudulKecil>
                      <ul className="space-y-2 text-[12px]">
                        {data.pertumbuhan.kurikulum.map((k) => (
                          <li key={k.id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                            <div className="font-semibold text-neutral-200">{k.label} <span className="ml-1 text-[10px] text-amber-300">+{k.dAgiPp} pp AGI potensi</span></div>
                            <div className="text-neutral-400">{k.why}</div>
                            <div className="text-neutral-500">{k.action}</div>
                          </li>
                        ))}
                      </ul>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>ekuitas model majemuk (per rencana after-fee)</JudulKecil>
                      <GrafikGaris label="equity 1 unit majemuk" data={(data.riwayatPertumbuhan ?? []).map((r) => (r.eq - 1) * 100)} />
                      <p className="mt-2 text-[11px] text-neutral-500">Setiap rencana dinilai satu-unit after-fee 0.4% — model bukti, bukan simulasi ukuran nyata.</p>
                    </Kartu>
                  </div>
                  <PertumbuhanHidup />
                </div>
              )}

              {/* ============ TAB: BRIEFING GURU (HIDUP + statis) ============ */}
              {tab === 'briefing' && meta && p && v && (
                <div className="space-y-4">
                  <BriefingHidup />
                  <Kartu className="border-amber-400/30">
                    <JudulKecil>briefing guru — {meta.hari}</JudulKecil>
                    <div className="space-y-3 text-sm leading-relaxed text-neutral-300">
                      <p>
                        <strong>Medan:</strong> ELSA/USDT ${fmtHarga(meta.harga)} ({pct(meta.perubahan24j)} 24 jam), rezim <strong>{meta.rezim.rezim}</strong> — {meta.rezimKet}.
                      </p>
                      <p>
                        <strong>Vonis dewan:</strong> {v.vonis} dengan kepastian {v.kepastian}% ({v.lapisan}). Ketua dewan: konsensus {(v.konsensus * 100).toFixed(0)}%, tiga bukti terkuat: {(v.buktiKunci[0] ?? '—')}.
                      </p>
                      {p.rencana ? (
                        <p>
                          <strong>Rencana:</strong> masuk ${fmtHarga(p.rencana.entry)}, sasaran ${fmtHarga(p.rencana.target)} ({p.rencana.sumberTarget}), stop ${fmtHarga(p.rencana.stop)} ({v.eksekusi.sumber}). Jual ambisius ${fmtHarga(p.rencana.highAmbisius)}. Guard Monte Carlo: {p.rencana.ketGuard}.
                        </p>
                      ) : (
                        <p><strong>Rencana:</strong> tidak ada — {p.guardAlasan}. Arah tetap dipantau; disiplin lebih mahal dari dorongan.</p>
                      )}
                      <p>
                        <strong>Pelajaran hari ini:</strong> {data.kl?.aspek5.rangkaianUtuh ? `tracker membaca rangkaian ${data.kl.aspek5.rangkaianUtuh}.` : 'rangkaian 5 aspek belum utuh — likuiditas belum dipanen.'} {data.kl?.pool.swept ? `Pool ${data.kl.pool.jenis} ${data.kl.pool.side} baru disapu ${data.kl.pool.barsSince} candle lalu sedalam ${data.kl.pool.depthAtr} ATR.` : 'Tidak ada sapuan segar — magnet likuiditas belum jelas.'}
                      </p>
                      <p className="text-neutral-400">
                        Guru: setiap keteledoran yang tak dicatat adalah keteledoran yang berulang. Ingatan berjenjang hari ini: {p.mem ? `n=${p.mem.n}, edge ${p.mem.edge.toFixed(2)}%, hit ${(p.mem.hit * 100).toFixed(0)}%` : 'belum ada episode — ingatan masih kosong, biarkan bukti menulis.'}
                      </p>
                    </div>
                  </Kartu>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Kartu>
                      <JudulKecil>atasan &amp; garis medan</JudulKecil>
                      <ul className="space-y-1 text-[12px] text-neutral-300">
                        <li>· Rezim ELSA: {meta.rezimKet}</li>
                        <li>· GARCH σ24j: {p.warisan.sigma24jPct}% ({p.warisan.modelVol})</li>
                        <li>· Beta BTC: {p.warisan.beta} (R² {p.warisan.r2Beta})</li>
                        <li>· POC: {fmtHarga(p.warisan.poc ?? null)} · {p.warisan.profilVolume}</li>
                        <li>· {p.warisan.ketKejut}</li>
                      </ul>
                    </Kartu>
                    <Kartu>
                      <JudulKecil>aturan pemuatan (policy arena)</JudulKecil>
                      <ul className="space-y-1 text-[12px] text-neutral-300">
                        {p.policy.map((x, i) => <li key={i}>· {x}</li>)}
                      </ul>
                    </Kartu>
                  </div>
                </div>
              )}

              {/* ============ TAB: UJIAN & UPGRADE (RANTAI DOMINO HIDUP) ============ */}
              {tab === 'upgrade' && data.genome && <TabUpgrade d={data} />}

              {/* ============ TAB: OTAK & INGATAN (hidup: persilangan + ingatan) ============ */}
              {tab === 'otak' && data.ingatan && data.ledger && (
                <div className="space-y-4">
                  <PersilanganHidup />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Kartu><JudulKecil>baris ingatan</JudulKecil><div className="text-2xl font-black">{data.ingatan.total}</div></Kartu>
                    <Kartu><JudulKecil>entri ledger SHA-256</JudulKecil><div className="text-2xl font-black">{data.ledger.jumlah}</div><div className={`text-[11px] ${data.ledger.verifikasi.ok ? 'text-emerald-400' : 'text-rose-400'}`}>rantai {data.ledger.verifikasi.ok ? 'TERVERIFIKASI utuh' : `RUSAK di indeks ${data.ledger.verifikasi.jumlah}`}</div></Kartu>
                    <Kartu><JudulKecil>ingatan simbol</JudulKecil><div className="text-sm text-neutral-300">{p?.mem ? `n=${p.mem.n} · edge ${p.mem.edge.toFixed(2)}% · hit ${(p.mem.hit * 100).toFixed(0)}%` : 'kosong — menunggu episode pertama ditutup'}</div></Kartu>
                  </div>
                  <Kartu>
                    <JudulKecil>ingatan berjenjang — keteledoran yang dicatat</JudulKecil>
                    {data.ingatan.baris.length === 0 && <p className="text-sm text-neutral-400">Belum ada keteledoran tercatat. Stop pertama akan ditulis di sini — pelajaran, bukan luka.</p>}
                    <ul className="space-y-1.5 text-[12px]">
                      {data.ingatan.baris.map((r, i) => (
                        <li key={i} className="rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500">{r.level} · {r.kind} · {new Date(r.at).toLocaleString('id-ID')}</div>
                          <div className="text-neutral-200">{r.text}</div>
                        </li>
                      ))}
                    </ul>
                  </Kartu>
                  <Kartu>
                    <JudulKecil>ledger pra-registrasi (5 entri terakhir)</JudulKecil>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[520px] text-left text-[12px]">
                        <thead className="text-neutral-400"><tr><th className="py-1">#</th><th>simbol</th><th>arah</th><th>kepastian</th><th>waktu kunci</th><th>hash</th></tr></thead>
                        <tbody className="font-mono">
                          {data.ledger.terakhir.slice().reverse().map((e) => (
                            <tr key={e.hash} className="border-t border-white/5">
                              <td className="py-1">{e.kunci.nomor}</td>
                              <td>{e.kunci.simbol}</td>
                              <td className={e.kunci.arah === 'BUY' ? 'text-emerald-300' : 'text-rose-300'}>{e.kunci.arah}</td>
                              <td>{e.kunci.kepastian}%</td>
                              <td className="text-neutral-400">{new Date(e.kunci.waktu).toLocaleString('id-ID')}</td>
                              <td className="text-neutral-500">{e.hash.slice(0, 14)}…</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-[11px] text-neutral-500">Prediksi yang belum dikunci = prediksi yang bisa dibohongi. Setiap entri memuat prev-hash entri sebelumnya — mengubah satu bit merusak rantai.</p>
                  </Kartu>
                </div>
              )}

              {/* ============ TAB: ARSITEKTUR KOGNITIF (HIDUP) ============ */}
              {tab === 'mozaik' && <MozaikHidup />}

              {/* ============ TAB: NADI & GUDANG (HIDUP) ============ */}
              {tab === 'nadi' && meta && (
                <div className="space-y-4">
                  <NadiHidup />
                  <div className="grid gap-4 md:grid-cols-3">
                    <Kartu><JudulKecil>nadi data</JudulKecil><div className="text-sm text-neutral-300">{meta.candle} candle harian Bybit spot</div><div className="text-[11px] text-neutral-500">cache memori 90 detik · refresh manual tersedia</div></Kartu>
                    <Kartu><JudulKecil>gudang</JudulKecil><div className="text-sm text-neutral-300">ledger, buku cuan, events, ingatan, genome</div><div className="text-[11px] text-neutral-500">persisten di db/elsa (JSON append-safe)</div></Kartu>
                    <Kartu><JudulKecil>audit kebocoran</JudulKecil><div className="text-sm text-emerald-300">LOLOS</div><div className="text-[11px] text-neutral-500">semua vonis point-in-time 60 candle; penilaian hanya dari candle tertutup</div></Kartu>
                  </div>
                  <Kartu>
                    <JudulKecil>iklim konteks</JudulKecil>
                    <div className="grid gap-2 text-[12px] sm:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold">BTC (iklim, bukan koin tempur)</div><div className="text-neutral-400">beta ELSA {p?.warisan.beta} · R² {p?.warisan.r2Beta}</div></div>
                      <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="font-semibold">Detak arena</div><div className="text-neutral-400">candle tutup berikutnya {Math.max(0, Math.floor((meta.selisihTutupMs ?? 0) / 3_600_000))} j {Math.max(0, Math.floor(((meta.selisihTutupMs ?? 0) % 3_600_000) / 60_000))} m</div></div>
                    </div>
                  </Kartu>
                  <Kartu>
                    <JudulKecil>kejujuran pengukuran</JudulKecil>
                    <p className="text-sm text-neutral-300">{data.bukuCuan?.kejujuran}</p>
                    <p className="mt-1 text-[11px] text-neutral-500">Fee 0,2% × 2 = 0,4% dipakai konservatif — Bybit spot taker 0,1% per sisi sebenarnya lebih murah; angka sumber dipertahankan agar buku cuan tak pernah manis palsu.</p>
                  </Kartu>
                </div>
              )}

              {/* ============ TAB: RUANG GURU ============ */}
              {tab === 'guru' && (
                <div className="space-y-4">
                  <RuangGuru data={data} muat={muat} />
                  <Kartu>
                    <JudulKecil>41 paper inti (database referensi)</JudulKecil>
                    <div className="max-h-96 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin]">
                      {DOCTRINE.PAPERS.map((pp) => (
                        <div key={pp.id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                          <div className="text-sm font-semibold text-neutral-100">{pp.title}</div>
                          <div className="text-[11px] text-neutral-400">{pp.authors} · {pp.year} · {pp.venue}</div>
                          <p className="mt-1 text-[12px] text-neutral-300">{pp.claim}</p>
                          <a href={pp.url} target="_blank" rel="noreferrer" className="text-[11px] text-teal-300 hover:underline">{pp.url}</a>
                        </div>
                      ))}
                    </div>
                  </Kartu>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <footer className="border-t border-white/10 bg-black/40 px-4 py-3 text-center text-[11px] text-neutral-500">
        MICAPROFITA — Arena ELSA · arah biner BUY/SELL · data hidup Bybit spot · evolusi tanpa henti · bukan nasihat keuangan · {DOCTRINE.PAPERS.length} paper doktrin · arena dinilai per candle UTC
      </footer>
    </div>
  );
}

function BukuCuan({ data }: { data: Payload }) {
  const bc = data.bukuCuan;
  if (!bc) return null;
  const m = bc.metrik;
  return (
    <Kartu>
      <JudulKecil>buku cuan — hasil nyata rencana pra-registrasi (after-fee 0.4%)</JudulKecil>
      <div className="grid gap-3 text-center sm:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-xl font-black ${m.netKumulatif >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{pct(m.netKumulatif)}</div><div className="text-[11px] text-neutral-400">net kumulatif (majemuk)</div></div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black">{m.winRate === null ? '—' : `${m.winRate}%`}</div><div className="text-[11px] text-neutral-400">win rate (net &gt; 0)</div></div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black">{m.ekspektansi === null ? '—' : pct(m.ekspektansi)}</div><div className="text-[11px] text-neutral-400">ekspektansi / rencana</div></div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black text-rose-300">{pct(m.maxDD)}</div><div className="text-[11px] text-neutral-400">max drawdown</div></div>
      </div>
      <p className="mt-2 text-[12px] text-neutral-400">{bc.hari} rencana dinilai · {m.menang} sasaran kena · {m.kalah} kena stop · {m.kedaluwarsa} kedaluwarsa (keluar di tutup, tetap kena fee){m.batal ? ` · ${m.batal} BATAL (pembatalan selaras — keluar di harga hidup saat vonis hidup berbalik; tidak dihitung win-rate, tetap masuk ekuitas)` : ''}</p>
      {Object.keys(bc.rezimRugi ?? {}).length > 0 && (
        <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-4">
          {Object.entries(bc.rezimRugi).map(([r, s]) => (
            <div key={r} className="rounded-lg border border-white/10 bg-black/30 p-2">
              <div className="font-semibold text-neutral-200">{r}</div>
              <div className="text-neutral-400">{s.rugi} rugi dari {s.total} rencana · ekspektansi {pct(s.total ? s.eks / s.total : 0)}</div>
            </div>
          ))}
        </div>
      )}
      {bc.entri.length > 0 && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[12px]">
            <thead className="text-neutral-400"><tr><th className="py-1">hari</th><th>zaman</th><th>arah</th><th>hasil</th><th>via</th><th>net</th><th>R</th><th>rezim</th></tr></thead>
            <tbody>
              {bc.entri.slice(0, 12).map((e, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="py-1 text-neutral-400">{e.hari}</td>
                  <td className="text-neutral-300">{e.zaman ? `#${e.zaman}` : '—'}</td>
                  <td className={e.arah === 'BUY' ? 'text-emerald-300' : 'text-rose-300'}>{e.arah === 'BUY' ? 'BUY (LONG)' : 'SELL (SHORT)'}</td>
                  <td className={e.hasil === 'MENANG' ? 'text-emerald-300' : e.hasil === 'KALAH' ? 'text-rose-300' : 'text-amber-300'}>{e.hasil}</td>
                  <td className="text-neutral-400">{e.via}</td>
                  <td className={e.netPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{pct(e.netPct)}</td>
                  <td className="text-neutral-300">{e.r}</td>
                  <td className="text-neutral-500">{e.rezim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {bc.berlangsung && (
        <p className="mt-2 text-[11px] text-neutral-400">
          Berlangsung: {bc.berlangsung.arah === 'BUY' ? 'BUY (LONG)' : 'SELL (SHORT)'} zaman #{bc.berlangsung.zaman ?? 1} {bc.berlangsung.hari} (T {pct(((bc.berlangsung.target - bc.berlangsung.entry) / bc.berlangsung.entry) * 100)} / S {pct(((bc.berlangsung.stop - bc.berlangsung.entry) / bc.berlangsung.entry) * 100)}) — TP/SL kena dinilai LANGSUNG saat itu juga (pantau terus); hanya bila tak kena, dinilai di tutup candle.
        </p>
      )}
    </Kartu>
  );
}

function Kronik({ data }: { data: Payload }) {
  const ev = data.events ?? [];
  return (
    <Kartu>
      <JudulKecil>kronik arena</JudulKecil>
      <ul className="space-y-1.5 text-[12px]">
        {ev.length === 0 && <li className="text-neutral-400">Belum ada peristiwa — hari pertama arena.</li>}
        {ev.map((e, i) => (
          <li key={i}>
            <span className={`mr-1 font-semibold ${e.kind === 'CUAN' ? 'text-emerald-300' : e.kind === 'UPGRADE' ? 'text-violet-300' : 'text-amber-300'}`}>{e.kind}</span>
            <span className="text-neutral-500">{e.day} — </span>
            <span className="text-neutral-300">{e.text}</span>
          </li>
        ))}
      </ul>
    </Kartu>
  );
}

// ================= TAB: DOMPET $1000 — nyata-rasa, bukan angin =================
// Permintaan pemilik: sistem dianggap punya $1000, ALL-IN tiap keputusan, eksekusi
// dirasakan dampaknya (orderbook nyata, fee, slippage), habis → top-up $1000, dan
// semuanya jadi catatan akuntansi agar "kita tau dimana salahnya".
function TabDompet({ d, onAksi, berjalan }: { d: DompetData; onAksi: () => void; berjalan: boolean }) {
  const [busy, setBusy] = useState<string | null>(null);
  const aksi = async (action: string) => {
    if (action === 'dompetTutupPaksa' && !window.confirm('Tutup posisi dompet SEKARANG di harga hidup? Hasil akan dicatat di buku akuntansi.')) return;
    if (action === 'dompetReset' && !window.confirm('RESET dompet: buku akuntansi lama dibuang, mulai $1000 baru. Analisis kesalahan dipertahankan. Yakin?')) return;
    setBusy(action);
    try {
      await fetch('/api/elsa', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action }) });
    } catch { /* poll berikutnya */ }
    onAksi();
    setBusy(null);
  };
  const jam = (iso: string) => iso.slice(11, 19).replace('T', ' ');
  const pnlTone = (v: number) => (v > 0 ? 'text-emerald-300' : v < 0 ? 'text-rose-300' : 'text-neutral-300');
  const JENIS_TONE: Record<string, 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral'> = {
    SETORAN: 'hijau', BUKA: 'ungu', TUTUP: 'amber', CATATAN: 'netral', RESET: 'merah',
  };
  return (
    <div className="space-y-4">
      {/* ==== STATUS DOMPET ==== */}
      <Kartu>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <JudulKecil>dompet $1000 — all-in tiap keputusan, dampak nyata diukur, bukan angin</JudulKecil>
          <div className="ml-auto flex gap-2">
            <button onClick={() => aksi('dompetUjiDampak')} disabled={busy !== null || berjalan} className="rounded-md border border-amber-400/50 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/20 disabled:opacity-40">
              {busy === 'dompetUjiDampak' ? 'mengukur buku…' : 'Uji Dampak $1000 Sekarang'}
            </button>
            {d.posisi && (
              <button onClick={() => aksi('dompetTutupPaksa')} disabled={busy !== null || berjalan} className="rounded-md border border-rose-400/50 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/20 disabled:opacity-40">
                {busy === 'dompetTutupPaksa' ? 'menutup…' : 'Tutup Posisi Paksa'}
              </button>
            )}
            <button onClick={() => aksi('dompetReset')} disabled={busy !== null || berjalan} className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 disabled:opacity-40">
              {busy === 'dompetReset' ? 'mereset…' : 'Reset'}
            </button>
          </div>
        </div>
        <div className="grid gap-3 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-xl font-black text-amber-300">{d.ekuitas.toFixed(2)} USD</div>
            <div className="text-[11px] text-neutral-400">ekuitas (saldo + posisi mengambang)</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-xl font-black">{d.saldo.toFixed(2)} USD</div>
            <div className="text-[11px] text-neutral-400">saldo {d.posisi ? '— all-in terkunci di posisi' : '— siap all-in kapan pun rencana terkunci'}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className={`text-xl font-black ${pnlTone(d.pnlBersih)}`}>{d.pnlBersih >= 0 ? '+' : ''}{d.pnlBersih.toFixed(2)} USD</div>
            <div className="text-[11px] text-neutral-400">pnl bersih vs total setoran {d.totalSetoran.toFixed(0)} USD ({pct(d.pnlBersihPct)})</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-xl font-black">{d.topupKe}×</div>
            <div className="text-[11px] text-neutral-400">setoran $1000 (top-up otomatis saat habis)</div>
          </div>
        </div>
        <ul className="mt-3 space-y-1 text-[11px] text-neutral-400">
          {d.hukum.map((h, i) => (
            <li key={i}>· {h}</li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-neutral-500">Jujur: dana tidak benar-benar masuk pasar — tapi VWAP, slippage, dampak harga-sendiri, fee taker 0.1% & funding diukur dari orderbook/regulasi Bybit yang sebenarnya pada saat eksekusi. Ini yang membuat $1000 tidak terasa kayak angin.</p>
      </Kartu>

      {/* ==== JANTUNG DOMPET — denyut 60 detik: modal yang BERAKTIVITAS ==== */}
      {d.jantung && (() => {
        const j = d.jantung;
        const AKSI_TONE: Record<string, 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral'> = {
          JAGA: 'netral', TUTUP: 'amber', ADOPSI: 'ungu', BUKA: 'ungu', TUNGGU: 'netral', IDLE: 'netral', 'BERJAGA-JAGA': 'merah',
        };
        const STATUS_K: Record<string, 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral'> = {
          TERBUKA: 'ungu', MENANG: 'hijau', KALAH: 'merah', BATAL: 'netral', MELEWAT: 'netral',
        };
        return (
          <Kartu className={j.aksiTerakhir === 'BERJAGA-JAGA' ? 'border-rose-500/40 bg-rose-500/[0.04]' : ''}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <JudulKecil warna="text-emerald-300">jantung dompet — modal beraktivitas tiap {j.jedaDetik} detik (dulu seakan terhenti; wait adalah kanker)</JudulKecil>
              <Badge tone={j.status === 'AKTIF' ? 'hijau' : 'amber'}>{j.status} · denyut ke-{j.detakKe}</Badge>
              <Badge tone={AKSI_TONE[j.aksiTerakhir] ?? 'netral'}>{j.aksiTerakhir}</Badge>
              {j.atTerakhir && <span className="text-[10px] text-neutral-500">detak terakhir {jam(j.atTerakhir)} UTC · berikutnya {j.atBerikutnya ? jam(j.atBerikutnya) : '—'}</span>}
              <button onClick={() => aksi('dompetDenyutPaksa')} disabled={busy !== null || berjalan} className="ml-auto rounded-md border border-emerald-400/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20 disabled:opacity-40">
                {busy === 'dompetDenyutPaksa' ? 'berdenyut…' : 'Denyut Sekarang'}
              </button>
            </div>
            <p className="rounded-lg border border-white/10 bg-black/30 p-2 text-[12px] text-neutral-200">{j.aksiTeks}</p>
            {j.keputusan.length > 0 && (
              <div className="mt-3">
                <JudulKecil warna="text-violet-300">pedang yang jantung angkat sendiri (hukum dua pedang — dompet kosong + tanpa rencana arena)</JudulKecil>
                <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                  {j.keputusan.map((k, i) => (
                    <div key={i} className="rounded-lg border border-violet-500/30 bg-violet-500/[0.06] p-2 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={k.arah === 'BUY' ? 'hijau' : 'merah'}>{k.arah} ALL-IN</Badge>
                        <Badge tone={STATUS_K[k.status] ?? 'netral'}>{k.status}</Badge>
                        <span className="text-neutral-400">{k.id} · K {k.K.toFixed(2)} (sebelum neuron {k.KSebelumNeuron.toFixed(2)}) · target/stop ±{k.targetPct}%</span>
                        {k.netPct !== null && k.netPct !== undefined && <span className={`ml-auto font-mono ${pnlTone(k.netPct)}`}>{k.netPct >= 0 ? '+' : ''}{k.netPct.toFixed(2)}%</span>}
                      </div>
                      <p className="mt-1 text-neutral-400">{k.sinyal}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <div>
                <JudulKecil warna="text-amber-300">diary denyut — tiap aktivitas dicatat (modal didiamkan = kecacatan tak terlihat)</JudulKecil>
                <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
                  {j.jurnal.length === 0 && <p className="text-[11px] text-neutral-500">jurnal baru lahir — denyut berikutnya menulis.</p>}
                  {j.jurnal.map((b, i) => (
                    <div key={i} className="text-[11px]">
                      <span className="text-neutral-600">{b.at.slice(5, 16).replace('T', ' ')}</span>{' '}
                      <Badge tone={AKSI_TONE[b.aksi] ?? 'netral'}>{b.aksi}</Badge>{' '}
                      <span className="text-neutral-300">{b.teks}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <JudulKecil warna="text-emerald-300">neuron dompet — riwayat eksekusi jadi diskon/dorong keyakinan</JudulKecil>
                {j.neuron ? (
                  <div className="space-y-1 text-[11px]">
                    <p className="text-neutral-300">
                      win rate keseluruhan <b>{j.neuron.winRate === null ? '—' : `${Math.round(j.neuron.winRate * 100)}%`}</b> ({j.neuron.nTutup} tutup) · fee taker total <b className="text-rose-300">${j.neuron.feeTotal.toFixed(2)}</b> — biaya hidup diukur, bukan dikira
                    </p>
                    {Object.entries(j.neuron.perArah).map(([k, v]) => (
                      <p key={k} className="text-neutral-400">· {k}: {v.n} kali, {Math.round((v.win / Math.max(v.n, 1)) * 100)}% menang, net {v.sumNet >= 0 ? '+' : ''}{v.sumNet}%</p>
                    ))}
                    {Object.entries(j.neuron.perSumber).map(([k, v]) => (
                      <p key={k} className="text-neutral-400">· sumber {k}: {v.n} kali, {Math.round((v.win / Math.max(v.n, 1)) * 100)}% menang, net {v.sumNet >= 0 ? '+' : ''}{v.sumNet}%</p>
                    ))}
                    {j.neuron.pelajaran.slice(0, 4).map((p, i) => (
                      <p key={i} className="text-neutral-500"><span className="text-neutral-600">{p.at.slice(5, 16).replace('T', ' ')}</span> — {p.pelajaran}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-500">neuron dompet masih kosong — pelajaran lahir dari tutup pertama.</p>
                )}
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-[11px] text-neutral-500">
              {j.hukum.map((h, i) => <li key={i}>· {h}</li>)}
            </ul>
          </Kartu>
        );
      })()}

      {/* ==== POSISI AKTIF ==== */}
      {d.posisi ? (
        <Kartu>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <JudulKecil>posisi aktif — seluruh saldo all-in</JudulKecil>
            <Badge tone={d.posisi.arah === 'LONG' ? 'hijau' : 'merah'}>{d.posisi.arah} {d.posisi.venue === 'perp' ? 'perp 1x' : 'spot'}</Badge>
            {d.posisi.adopsi && <Badge tone="amber">ADOPSI TERLAMBAT</Badge>}
            <span className={`ml-auto text-lg font-black ${pnlTone(d.posisi.uPnl)}`}>{d.posisi.uPnl >= 0 ? '+' : ''}{d.posisi.uPnl.toFixed(2)} USD ({pct(d.posisi.uPnlPct)})</span>
          </div>
          <div className="grid gap-2 text-[12px] sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-neutral-400">entry VWAP</div><div className="font-mono text-neutral-100">{fmtHarga(d.posisi.entryVwap)}</div><div className="text-[10px] text-neutral-500">mid saat itu {fmtHarga(d.posisi.midMasuk)}</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-neutral-400">slippage masuk</div><div className={`font-mono ${Math.abs(d.posisi.slippageMasukPct) >= 0.3 ? 'text-rose-300' : 'text-neutral-100'}`}>{d.posisi.slippageMasukPct.toFixed(3)}%</div><div className="text-[10px] text-neutral-500">{d.posisi.levelTerpakai} level tersapu</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-neutral-400">dampak sendiri</div><div className="font-mono text-neutral-100">{d.posisi.dampakSendiriPct.toFixed(3)}%</div><div className="text-[10px] text-neutral-500">harga terdorong order kita</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-neutral-400">qty / nilai</div><div className="font-mono text-neutral-100">{d.posisi.qty} ELSA</div><div className="text-[10px] text-neutral-500">≈ {d.posisi.nilaiPosisi.toFixed(2)} USD (mark {fmtHarga(d.posisi.mark)})</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-neutral-400">target / stop</div><div className="font-mono text-neutral-100">{fmtHarga(d.posisi.target)} · {fmtHarga(d.posisi.stop)}</div><div className="text-[10px] text-neutral-500">jarak {pct(d.posisi.jarakTargetPct)} / {pct(d.posisi.jarakStopPct)}</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-neutral-400">fee masuk</div><div className="font-mono text-neutral-100">{d.posisi.feeMasuk.toFixed(2)} USD</div><div className="text-[10px] text-neutral-500">buka {jam(d.posisi.waktuBuka)} · arena #{d.posisi.nomor}</div></div>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">Rencana arena: {d.posisi.arah} keyakinan {d.posisi.keyakinan}% di rezim {d.posisi.rezim}{d.posisi.komposit !== null ? ` · komposit ${d.posisi.komposit.toFixed(2)}` : ''} — dompet ikut sampai candle tutup menentukan target/stop (verifikasi-hasil), lalu keluar di buku nyata.</p>
          {d.posisi.serangan.length > 0 && (
            <p className="mt-1 text-[11px] text-rose-300">Peringatan yang sudah diangkat saat buka: {d.posisi.serangan.join(' | ')}</p>
          )}
        </Kartu>
      ) : (
        <Kartu>
          <JudulKecil>posisi — dompet kosong, menunggu rencana terkunci</JudulKecil>
          <p className="text-[12px] text-neutral-400">Begitu arena mengunci rencana baru (guard lolos), seluruh saldo {d.saldo.toFixed(2)} USD langsung ALL-IN: order menyapu orderbook nyata level demi level — fee, slippage & dampak harga-sendiri tercatat apa adanya.</p>
        </Kartu>
      )}

      {/* ==== UJI DAMPAK $1000 ==== */}
      {d.ujiDampak && (
        <Kartu>
          <JudulKecil>uji dampak $1000 — order beneran masuk akan begini rasanya (diukur {jam(d.ujiDampak.spot.at)} UTC)</JudulKecil>
          <div className="grid gap-3 lg:grid-cols-2">
            {(['spot', 'perp'] as const).map((v) => {
              const u = d.ujiDampak![v];
              return (
                <div key={v} className="rounded-lg border border-white/10 bg-black/30 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge tone={v === 'spot' ? 'hijau' : 'ungu'}>{v.toUpperCase()}</Badge>
                    <span className="text-[11px] text-neutral-400">beli $1000 menyapu {u.levelTerpakai}/{u.levelTotal} level ask</span>
                    {u.estimasiDeep && <Badge tone="amber">buku tampil habis</Badge>}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[12px] sm:grid-cols-3">
                    <div><div className="text-neutral-400">mid</div><div className="font-mono text-neutral-100">{fmtHarga(u.mid)}</div></div>
                    <div><div className="text-neutral-400">VWAP eksekusi</div><div className="font-mono text-amber-300">{fmtHarga(u.vwap)}</div></div>
                    <div><div className="text-neutral-400">slippage</div><div className={`font-mono ${Math.abs(u.slippagePct) >= 0.3 ? 'text-rose-300' : 'text-neutral-100'}`}>{u.slippagePct.toFixed(3)}%</div></div>
                    <div><div className="text-neutral-400">dampak sendiri</div><div className="font-mono text-neutral-100">+{u.dampakSendiriPct.toFixed(3)}%</div></div>
                    <div><div className="text-neutral-400">likuiditas ±0.5%</div><div className="font-mono text-neutral-100">{(u.kedalaman05Usd / 1e3).toFixed(1)} rb</div></div>
                    <div><div className="text-neutral-400">likuiditas ±1%</div><div className="font-mono text-neutral-100">{(u.kedalaman1PctUsd / 1e3).toFixed(1)} rb</div></div>
                  </div>
                  {u.level.length > 0 && (
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full min-w-[300px] text-left text-[11px]">
                        <thead className="text-neutral-500"><tr><th className="py-0.5">level harga</th><th>qty (ELSA)</th><th>USD</th><th>kumulatif</th></tr></thead>
                        <tbody>
                          {u.level.slice(0, 6).map((l, i) => (
                            <tr key={i} className="border-t border-white/5">
                              <td className="py-0.5 font-mono text-neutral-300">{fmtHarga(l.harga)}</td>
                              <td className="font-mono text-neutral-400">{l.qty}</td>
                              <td className="font-mono text-neutral-400">{l.usd.toFixed(0)}</td>
                              <td className="font-mono text-amber-300/80">{l.kumulatifUsd.toFixed(0)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {u.turnover24jUsd !== null && (
                    <p className="mt-2 text-[10px] text-neutral-500">$1000 = {((1000 / u.turnover24jUsd) * 100).toFixed(3)}% dari turnover 24 jam {(u.turnover24jUsd / 1e6).toFixed(1)} jt USD — jejak kita ke pasar bisa dibaca angka, bukan dikira-kira.</p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">{d.ujiDampak.spot.ket}</p>
        </Kartu>
      )}

      {/* ==== KURVA EKUITAS + METRIK ==== */}
      {d.kurva.length > 1 && (
        <Kartu>
          <JudulKecil>kurva ekuitas dompet (tiap peristiwa akuntansi)</JudulKecil>
          <GrafikGaris data={d.kurva.map((k) => k.ekuitas)} warna="#fbbf24" label="ekuitas USD" />
        </Kartu>
      )}
      <Kartu>
        <JudulKecil>metrik eksekusi — biaya yang dulu tidak pernah dihitung</JudulKecil>
        <div className="grid gap-2 text-center sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-lg font-black">{d.metrik.nBuka}</div><div className="text-[10px] text-neutral-400">posisi dibuka</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-lg font-black">{d.metrik.nTutup}</div><div className="text-[10px] text-neutral-400">ditutup nyata</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-lg font-black">{d.metrik.winRate === null ? '—' : `${d.metrik.winRate}%`}</div><div className="text-[10px] text-neutral-400">win rate dompet ({d.metrik.menang}W/{d.metrik.kalah}L)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className={`text-lg font-black ${pnlTone(d.metrik.pnlTotal)}`}>{d.metrik.pnlTotal >= 0 ? '+' : ''}{d.metrik.pnlTotal.toFixed(2)}</div><div className="text-[10px] text-neutral-400">pnl terealisasi USD</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-lg font-black text-rose-300">{d.metrik.feeTotal.toFixed(2)}</div><div className="text-[10px] text-neutral-400">fee taker terbayar USD</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-lg font-black">{d.metrik.slipRataPct === null ? '—' : `${d.metrik.slipRataPct.toFixed(3)}%`}</div><div className="text-[10px] text-neutral-400">slippage rata-rata terukur</div></div>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">median slippage: beli {d.metrik.slipMedianBeli === null ? '—' : `${d.metrik.slipMedianBeli.toFixed(3)}%`} · jual {d.metrik.slipMedianJual === null ? '—' : `${d.metrik.slipMedianJual.toFixed(3)}%`} — dipakai untuk estimasi jujur eksekusi keluar historis (diakui sebagai ESTIMASI-SAMPEL, bukan angka karangan).</p>
      </Kartu>

      {/* ==== ANALISIS KESALAHAN ==== */}
      {d.analisis.length > 0 && (
        <Kartu>
          <JudulKecil warna="text-rose-300">analisis kesalahan — "kita tau dimana salahnya"</JudulKecil>
          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {d.analisis.map((a, i) => (
              <div key={i} className="rounded-lg border border-rose-500/30 bg-rose-500/[0.06] p-3">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px]">
                  <Badge tone="merah">{a.arah} {a.pnl >= 0 ? '+' : ''}{a.pnl.toFixed(2)} USD ({pct(a.netPct)})</Badge>
                  <span className="text-neutral-500">{a.hari} · rezim {a.rezim} · {jam(a.at)} {a.ref ? `· ${a.ref}` : ''}</span>
                </div>
                <ul className="space-y-1 text-[12px] text-neutral-300">
                  {a.diagnosis.map((x, j) => <li key={j}>· {x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Kartu>
      )}

      {/* ==== BUKU AKUNTANSI ==== */}
      <Kartu>
        <JudulKecil>buku akuntansi dompet — setiap dolar punya riwayat</JudulKecil>
        {d.buku.length === 0 ? (
          <p className="text-[12px] text-neutral-400">Buku masih kosong — menunggu peristiwa pertama.</p>
        ) : (
          <div className="max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[11px]">
              <thead className="sticky top-0 bg-neutral-950 text-neutral-400">
                <tr><th className="py-1">waktu</th><th>jenis</th><th>arah</th><th>harga/qty</th><th>fee</th><th>slip</th><th>pnl</th><th>saldo</th><th>ekuitas</th><th>alasan</th></tr>
              </thead>
              <tbody>
                {d.buku.map((b) => (
                  <tr key={b.id} className="border-t border-white/5 align-top">
                    <td className="py-1.5 whitespace-nowrap text-neutral-500">{jam(b.at)}</td>
                    <td><Badge tone={JENIS_TONE[b.jenis] ?? 'netral'}>{b.jenis}</Badge></td>
                    <td className={b.arah === 'LONG' ? 'text-emerald-300' : b.arah === 'SHORT' ? 'text-rose-300' : 'text-neutral-500'}>{b.arah ?? '—'}</td>
                    <td className="whitespace-nowrap font-mono text-neutral-300">{b.harga ? fmtHarga(b.harga) : '—'}{b.qty ? ` × ${b.qty}` : ''}</td>
                    <td className="whitespace-nowrap font-mono text-neutral-400">{b.fee ? `${b.fee.toFixed(2)}` : '—'}</td>
                    <td className="whitespace-nowrap font-mono text-neutral-400">{b.slippagePct !== null && b.slippagePct !== undefined ? `${b.slippagePct.toFixed(3)}%` : '—'}</td>
                    <td className={`whitespace-nowrap font-mono ${b.pnl !== null && b.pnl !== undefined ? pnlTone(b.pnl) : 'text-neutral-500'}`}>{b.pnl !== null && b.pnl !== undefined ? `${b.pnl >= 0 ? '+' : ''}${b.pnl.toFixed(2)}` : '—'}</td>
                    <td className="whitespace-nowrap font-mono text-neutral-300">{b.saldo.toFixed(0)}</td>
                    <td className="whitespace-nowrap font-mono text-amber-300/80">{b.ekuitas.toFixed(0)}</td>
                    <td className="max-w-[320px] text-neutral-400" title={b.alasan}>
                      <span className="line-clamp-2">{b.alasan}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-2 text-[11px] text-neutral-500">Buku ini bukan pajangan: tiap tutup rugi wajib menulis ANALISIS KESALAHAN, tiap top-up tercatat SETORAN, tiap eksekusi menyimpan VWAP/slippage/dampak/fee yang sesungguhnya diukur. Modal majemuk profesional dibangun dari buku yang jujur.</p>
      </Kartu>
    </div>
  );
}

const VONIS_KORBAN_TONE: Record<string, 'merah' | 'hijau' | 'netral' | 'ungu'> = { SHORT: 'hijau', LONG: 'merah' };

// ================= TAB: RADAR PAUS — SPOT/FUTURES × LONG/SHORT + AUDIT DANA GILA =================
// TAB: RADAR ANTI-KECOLONGAN — mata per-menit yang menutup kecolongan
// "whale bisa saja masuk tanpa diketahui!!" (pemilik, 2026-11-26).
// Luka nyata 03:00 UTC: ELSA melonjak 0.0835 → 0.1166 (+37%) dalam satu
// jam — verdict harian buta, dompet SHORT di puncak. Kini: 8 lapisan
// radar + mesin negara + hukum keras dompet + berkas kasus dengan soal.
function TabIgnisi({ ign, kasus, rekonsiliasi }: { ign: IgnisiData; kasus: Kasus[]; rekonsiliasi: string | null }) {
  const negaraTone: Record<string, 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral'> = {
    PARABOLIK: 'merah', MENYALA: 'merah', KONVERSI: 'amber', MERANGKAK: 'amber', TENANG: 'netral',
  };
  const negaraWarna: Record<string, string> = {
    PARABOLIK: 'text-rose-300', MENYALA: 'text-rose-300', KONVERSI: 'text-amber-300', MERANGKAK: 'text-amber-300', TENANG: 'text-neutral-300',
  };
  const arahTone = (a: string): 'hijau' | 'merah' | 'netral' => (a === 'NAIK' ? 'hijau' : a === 'TURUN' ? 'merah' : 'netral');
  const jam = (iso: string | null) => (iso ? iso.slice(11, 19).replace('T', ' ') : '—');
  const jatuh = (ms: number) => new Date(ms).toISOString().slice(11, 16);
  const penilaianTone: Record<string, 'hijau' | 'merah' | 'amber' | 'netral'> = {
    TEPAT: 'hijau', SALAH: 'merah', TERLAMBAT: 'amber', 'TERLAMBAT-TP-KECEPETAN': 'amber', 'TAK BISA MELIHAT': 'netral',
  };
  return (
    <div className="space-y-4">
      {/* ==== MESIN NEGARA RADAR ==== */}
      <Kartu className={ign.negara === 'MENYALA' || ign.negara === 'PARABOLIK' ? 'border-rose-500/50 bg-rose-500/[0.06]' : ign.negara === 'MERANGKAK' || ign.negara === 'KONVERSI' ? 'border-amber-500/40 bg-amber-500/[0.05]' : ''}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-rose-300">radar anti-kecolongan — whale pecah-potongan TIDAK BISA lolos diam-diam lagi</JudulKecil>
          <Badge tone={negaraTone[ign.negara] ?? 'netral'}>negara: {ign.negara}</Badge>
          <Badge tone={arahTone(ign.arah)}>arah {ign.arah}</Badge>
          <Badge tone="ungu">keyakinan {ign.keyakinan}%</Badge>
          <Badge tone="netral">{ign.nLapisanAktif}/8 lapisan hidup</Badge>
          <Badge tone="netral">denyut ke-{ign.denyutKe}</Badge>
          <Badge tone="netral">{jam(ign.at)} UTC</Badge>
        </div>
        <p className="mb-3 text-sm text-neutral-200">{ign.cerita}</p>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
          {['TENANG', 'MERANGKAK', 'MENYALA', 'PARABOLIK', 'KONVERSI'].map((n, i, a) => (
            <React.Fragment key={n}>
              <span className={`rounded-md border px-2 py-1 font-bold ${ign.negara === n ? 'border-rose-400/60 bg-rose-500/20 text-rose-200' : 'border-white/10 bg-white/[0.02] text-neutral-500'}`}>{n}</span>
              {i < a.length - 1 && <span className="text-neutral-600">→</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="grid gap-3 text-center sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-sm font-black text-neutral-100">{fmtHarga(ign.harga)}</div><div className="text-[10px] text-neutral-400">harga kini</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-sm font-black text-cyan-300">{fmtHarga(ign.hargaAnchor)}</div><div className="text-[10px] text-neutral-400">anchor ignisi</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className={`text-sm font-black ${Math.abs(ign.metrik.velocityPct) >= 1 ? 'text-rose-300' : 'text-neutral-200'}`}>{ign.metrik.velocityPct.toFixed(2)}%/mnt</div><div className="text-[10px] text-neutral-400">velocity 3m</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className={`text-sm font-black ${Math.abs(ign.metrik.volZ) >= 3 ? 'text-amber-300' : 'text-neutral-200'}`}>{ign.metrik.volZ.toFixed(1)}×</div><div className="text-[10px] text-neutral-400">volume vs baseline</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className={`text-sm font-black ${ign.metrik.cvdUsd >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{ign.metrik.cvdUsd >= 0 ? '+' : ''}${ign.metrik.cvdUsd.toLocaleString('id-ID')}</div><div className="text-[10px] text-neutral-400">CVD taker 5m</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-2"><div className="text-sm font-black text-violet-300">{ign.latensiDeteksiMenit === null ? '—' : `${ign.latensiDeteksiMenit} mnt`}</div><div className="text-[10px] text-neutral-400">latensi radar (tanda→MENYALA)</div></div>
        </div>
        {(ign.laranganShort || ign.laranganLong) && (
          <div className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 p-2 text-[11px] text-rose-200">
            HUKUM KERAS AKTIF: {ign.laranganShort ? 'SHORT DIRAMPAS RADAR (ignisi NAIK menyala) — ' : ''}{ign.laranganLong ? 'BUY DIRAMPAS RADAR (ignisi TURUN menyala)' : ''} jantung dompet menolak membuka posisi melawan; posisi melawan yang sudah hidup → stop ditarik mendekat SEKARANG.
          </div>
        )}
      </Kartu>

      {/* ==== DELAPAN LAPISAN ==== */}
      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">delapan lapisan anti-kecolongan — semuanya dari data per-menit nyata, bukan cetakan besar saja</JudulKecil>
          <Badge tone="netral">whale modern memecah pesanan jadi potongan kecil — lapisan L1/L7 khusus menangkap itu</Badge>
        </div>
        <div className="space-y-2">
          {ign.lapisan.map((l) => (
            <div key={l.id} className={`rounded-lg border p-2 text-[11px] ${l.aktif ? (l.arah === 'NAIK' ? 'border-emerald-500/40 bg-emerald-500/[0.06]' : 'border-rose-500/40 bg-rose-500/[0.06]') : 'border-white/10 bg-white/[0.02]'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={l.aktif ? arahTone(l.arah) : 'netral'}>{l.id} · {l.nama}</Badge>
                {l.aktif && <Badge tone="ungu">kekuatan {Math.round(l.kekuatan * 100)}%</Badge>}
                <span className="font-mono text-neutral-500">{l.angka}</span>
              </div>
              <p className={`mt-1 ${l.aktif ? 'text-neutral-100' : 'text-neutral-500'}`}>{l.bukti}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-2">
          <div className="text-[11px] font-bold text-neutral-300">titik buta — jujur: apa yang TETAP bisa lolos (radar tidak mengaku serba bisa)</div>
          <ul className="mt-1 space-y-0.5 text-[10px] text-neutral-500">
            {ign.titikButa.map((b, i) => <li key={i}>· {b}</li>)}
          </ul>
          {rekonsiliasi && <p className="mt-2 text-[10px] text-amber-300/80">rekonsiliasi jiwa paus: {rekonsiliasi}</p>}
        </div>
      </Kartu>

      {/* ==== JEJAK TRANSISI ==== */}
      <Kartu>
        <JudulKecil warna="text-violet-300">jejak mesin negara — setiap transisi bertimestamp (keterlambatan radar DIUKUR, tidak dipoles)</JudulKecil>
        <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
          {ign.transisi.length === 0 && <p className="text-[11px] text-neutral-500">belum ada transisi — radar baru menyala; jejak pertama akan tercatat saat pasar berubah negara.</p>}
          {ign.transisi.map((t, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2 text-[11px]">
              <span className="font-mono text-neutral-400">{jam(t.at)}</span>
              <Badge tone={negaraTone[t.ke] ?? 'netral'}>{t.dari} → {t.ke}</Badge>
              <Badge tone={arahTone(t.arah)}>{t.arah}</Badge>
              <span className="text-neutral-400">keyakinan {t.keyakinan}% · pemicu lapisan {t.lapisanPemicu}</span>
            </div>
          ))}
        </div>
      </Kartu>

      {/* ==== BERKAS KASUS ==== */}
      <Kartu className="border-amber-400/30">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">berkas kasus — &quot;ini gambar kasus!!&quot;: tiap ledakan nyata direkonstruksi dari data menit, diperiksa kesalahannya, dijadikan pelajaran &amp; soal</JudulKecil>
          <Badge tone="amber">{kasus.length} kasus terdaftar</Badge>
        </div>
        {kasus.length === 0 && <p className="text-[11px] text-neutral-500">otak kasus menyapu ledakan tiap 10 menit — berkas pertama lahir otomatis saat ledakan ≥10%/jam terdeteksi.</p>}
        <div className="space-y-3">
          {kasus.map((k) => (
            <div key={k.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone="amber">{k.id}</Badge>
                <Badge tone={k.jendela.arah === 'NAIK' ? 'hijau' : 'merah'}>{k.judul}</Badge>
                <Badge tone="netral">status {k.status}</Badge>
              </div>
              <p className="mb-2 text-[11px] text-neutral-300">{k.luka.cetak}</p>
              <p className="mb-2 text-[10px] text-neutral-500">kalimat pemilik: &quot;{k.kalimatPemilik}&quot;</p>
              {/* fase */}
              <div className="mb-2">
                <div className="text-[10px] font-bold text-neutral-400">fase pasar (rekonstruksi data menit)</div>
                <div className="mt-1 space-y-1">
                  {k.fase.map((f, i) => (
                    <div key={i} className="rounded-md border border-white/10 bg-white/[0.02] p-2 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={f.chgPct >= 0 ? 'hijau' : 'merah'}>{f.nama}</Badge>
                        <span className="font-mono text-neutral-500">{jatuh(f.dariMs)}–{jatuh(f.keMs)} UTC ({f.durasiMenit} mnt)</span>
                        <span className={`font-bold ${f.chgPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{f.chgPct >= 0 ? '+' : ''}{f.chgPct.toFixed(2)}%</span>
                        <span className="font-mono text-neutral-500">{fmtHarga(f.hargaDari)} → {fmtHarga(f.hargaKe)}</span>
                      </div>
                      <p className="mt-1 text-neutral-300">{f.bukti}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* sinyal tersedia */}
              <div className="mb-2">
                <div className="text-[10px] font-bold text-neutral-400">sinyal yang TERSEDIA (apa yang bisa ditangkap, dan radar mana yang bisu)</div>
                <div className="mt-1 space-y-1">
                  {k.sinyalTersedia.map((s, i) => (
                    <div key={i} className={`rounded-md border p-2 text-[11px] ${s.kategori === 'RADAR-ANTI-KECOLONGAN' ? 'border-emerald-500/30 bg-emerald-500/[0.04]' : 'border-rose-500/30 bg-rose-500/[0.04]'}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={s.kategori === 'RADAR-ANTI-KECOLONGAN' ? 'hijau' : 'merah'}>{s.kategori}</Badge>
                        <span className="font-mono text-neutral-500">{jam(s.at)} UTC{s.menitSebelumLedakan !== null ? ` · ${s.menitSebelumLedakan} mnt dari tuntas` : ''}</span>
                      </div>
                      <p className="mt-1 text-neutral-200">{s.sinyal}</p>
                      <p className="font-mono text-[10px] text-neutral-500">{s.angka}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* keputusan sistem */}
              <div className="mb-2">
                <div className="text-[10px] font-bold text-neutral-400">apa yang sistem LAKUKAN saat itu (buku dompet nyata)</div>
                <div className="mt-1 space-y-1">
                  {k.keputusanSistem.length === 0 && <p className="text-[11px] text-neutral-500">tidak ada keputusan dompet di jendela ini — dicatat apa adanya.</p>}
                  {k.keputusanSistem.map((d, i) => (
                    <div key={i} className="rounded-md border border-white/10 bg-white/[0.02] p-2 text-[11px]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-neutral-500">{jam(d.at)} UTC</span>
                        <Badge tone="ungu">{d.tindakan}</Badge>
                        <Badge tone={penilaianTone[d.penilaian] ?? 'netral'}>{d.penilaian}</Badge>
                        <span className="text-neutral-300">{d.nilai}</span>
                      </div>
                      <p className="mt-1 text-neutral-300">{d.catatan}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* pelajaran */}
              <div className="mb-2">
                <div className="text-[10px] font-bold text-emerald-300">pelajaran ditanam (neuron kasus)</div>
                <ul className="mt-1 space-y-1 text-[11px]">
                  {k.pelajaran.map((p, i) => (
                    <li key={i} className="rounded-md border border-emerald-500/20 bg-emerald-500/[0.04] p-2 text-neutral-200">
                      <b className="text-emerald-300">{p.id}</b> — {p.isi} <span className="text-neutral-500">(menanam ke: {p.menanamKe})</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* soal */}
              <div>
                <div className="text-[10px] font-bold text-violet-300">ujian kasus — sistem menjawab sendiri dari data</div>
                <div className="mt-1 space-y-1">
                  {k.soal.map((s, i) => (
                    <div key={i} className="rounded-md border border-violet-500/25 bg-violet-500/[0.05] p-2 text-[11px]">
                      <div className="font-bold text-violet-200">{i + 1}. {s.soal}</div>
                      <div className="mt-1 text-neutral-200">jawaban: {s.jawaban}</div>
                      <div className="mt-0.5 text-[10px] text-neutral-500">dasar: {s.dasar}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Kartu>
    </div>
  );
}

function TabPaus({ p }: { p: PausData }) {
  const usd = (v: number) => `$${Math.round(v).toLocaleString('id-ID')}`;
  const jt = (v: number) => `$${(v / 1e6).toFixed(2)}jt`;
  const niatTone = (n: string): 'hijau' | 'merah' | 'amber' | 'netral' =>
    n.includes('LONG_BARU') || n === 'AKUMULASI SPOT' ? 'hijau' : n.includes('SHORT_BARU') || n === 'DISTRIBUSI SPOT' ? 'merah' : n.includes('TUTUP') ? 'amber' : 'netral';
  return (
    <div className="space-y-4">
      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">radar paus — spot atau futures? long atau short? dijawab dari jejak NYATA, bukan kabar</JudulKecil>
          <Badge tone="netral">harga {fmtHarga(p.harga)}</Badge>
          <Badge tone="ungu">jendela cetakan: spot {p.jendela.spotMenit}m ({p.jendela.spotTrades} trade) · futures {p.jendela.futuresMenit}m ({p.jendela.futuresTrades} trade)</Badge>
          <Badge tone="amber">ambang paus {usd(p.ambang.spotUsd)} / {p.ambang.dasar}</Badge>
        </div>
        <p className="mb-3 text-sm text-neutral-300">
          Tiap cetakan besar dibedah: <b>di pasar mana</b> (SPOT/FUTURES), <b>sisi taker apa</b> (beli menyerap offer / jual memakan bid), lalu <b>niatnya</b> — LONG baru, SHORT baru, tutup posisi — dijawab dari ΔOI per jam. Kalau paus beli spot TAPI pasang short futures → pola hedged ditandai MERAH: jangan ikut buy hanya karena &quot;paus beli&quot;.
        </p>
        <div className="grid gap-3 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-emerald-300">{jt(p.pasar.vol24jSpotUsd)}</div><div className="text-[11px] text-neutral-400">volume 24j SPOT (2 venue)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-rose-300">{jt(p.pasar.vol24jFuturesUsd)}</div><div className="text-[11px] text-neutral-400">volume 24j FUTURES (Bybit linear)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-amber-300">{jt(p.pasar.oiUsdBybit + p.pasar.oiUsdGate)}</div><div className="text-[11px] text-neutral-400">OI total (Bybit + Gate)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-neutral-200">{usd(p.pasar.kedalamanBid2pctUsd)} / {usd(p.pasar.kedalamanAsk2pctUsd)}</div><div className="text-[11px] text-neutral-400">kedalaman ±2% (bid / ask) — seminim itu</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-cyan-300">{p.pasar.fundingPct.toFixed(4)}%</div><div className="text-[11px] text-neutral-400">funding — {p.pasar.sisiBayar}</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-violet-300">{usd(p.jejak.takerFutures24jUsd)}</div><div className="text-[11px] text-neutral-400">arus taker futures 24j (semua peserta)</div></div>
        </div>
      </Kartu>

      {/* ==== LAPISAN SENYAP (V4) — kecolongan "whale masuk tanpa diketahui" ditutup ==== */}
      <Kartu className={p.senyap.skor >= 40 ? 'border-rose-500/40 bg-rose-500/[0.05]' : ''}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-rose-300">deteksi senyap — paus masuk TANPA diketahui: arus berubah sambil harga diam</JudulKecil>
          <Badge tone={p.senyap.skor >= 40 ? 'merah' : p.senyap.skor >= 15 ? 'amber' : 'netral'}>skor senyap {p.senyap.skor}/100</Badge>
          <Badge tone={p.senyap.arahDominan === 'NAIK' ? 'hijau' : p.senyap.arahDominan === 'TURUN' ? 'merah' : 'netral'}>condong {p.senyap.arahDominan}</Badge>
          <Badge tone="ungu">pita kontinu {p.senyap.pita.total} cetakan ({p.senyap.pita.rentangJam === null ? '—' : `${p.senyap.pita.rentangJam} jam`}) · +{p.senyap.pita.baruDenyutIni} baru denyut ini</Badge>
        </div>
        <p className="mb-2 text-sm text-neutral-200">{p.senyap.vonis}</p>
        <p className="mb-3 text-[11px] text-neutral-400">Tiga kecolongan radar lama yang kini ditutup: (1) cetakan paus bisa HILANG antara denyut 3 menit — kini disimpan permanen di pita kontinu; (2) paus membelah order jadi potongan kecil (TWAP/iceberg) yang tak pernah menyentuh ambang — kini klaster seragam, absorpsi, divergensi CVD & OI senyap dibaca; (3) radar lama buta di venue lain — kini BingX/Toobit/MEXC disweep tiap denyut.</p>
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <JudulKecil warna="text-amber-300">temuan senyap ({p.senyap.temuan.length})</JudulKecil>
            {p.senyap.temuan.length === 0 ? (
              <p className="text-[11px] text-neutral-500">belum ada temuan — ketiadaan bukti dilaporkan apa adanya, pita kontinu tetap merekam.</p>
            ) : (
              <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {p.senyap.temuan.map((t, i) => (
                  <div key={i} className="rounded-lg border border-amber-500/25 bg-amber-500/[0.05] p-2 text-[11px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={t.jenis === 'VENUE_SENYAP' ? 'ungu' : t.arah === 'NAIK' ? 'hijau' : t.arah === 'TURUN' ? 'merah' : 'netral'}>{t.jenis}</Badge>
                      <span className="text-neutral-500">kekuatan {Math.round(t.kekuatan * 100)}%{t.usd !== null ? ` · $${Math.round(t.usd).toLocaleString('id-ID')}` : ''}</span>
                    </div>
                    <p className="mt-1 text-neutral-200">{t.judul}</p>
                    {t.bukti.length > 0 && <p className="mt-0.5 font-mono text-[10px] text-neutral-500">{t.bukti.slice(0, 4).join(' | ')}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <JudulKecil warna="text-violet-300">venue di luar radar lama — tempat paus bisa masuk diam-diam</JudulKecil>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-[11px]">
                <thead className="text-neutral-500"><tr><th className="py-1">venue</th><th>vol 24j</th><th>harga</th><th>vs Bybit</th></tr></thead>
                <tbody>
                  {p.senyap.venueLain.length === 0 && (
                    <tr><td colSpan={4} className="py-2 text-neutral-500">sweep venue gagal denyut ini — diakui jujur, mencoba lagi di denyut berikutnya</td></tr>
                  )}
                  {p.senyap.venueLain.map((v, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="py-1 text-neutral-200">{v.venue}{!v.tersedia && <span className="text-rose-300"> (tak terjangkau)</span>}</td>
                      <td className="font-mono text-amber-300/80">{v.vol24jUsd > 0 ? usd(v.vol24jUsd) : '—'}</td>
                      <td className="font-mono text-neutral-300">{v.harga > 0 ? fmtHarga(v.harga) : '—'}</td>
                      <td className={`font-mono ${(v.selisihPct ?? 0) > 0.5 ? 'text-emerald-300' : (v.selisihPct ?? 0) < -0.5 ? 'text-rose-300' : 'text-neutral-400'}`}>{v.selisihPct === null ? '—' : `${v.selisihPct >= 0 ? '+' : ''}${v.selisihPct.toFixed(2)}%`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-2 space-y-1 text-[10px] text-neutral-500">
              {p.senyap.jujur.map((jx, i) => <li key={i}>· {jx}</li>)}
            </ul>
          </div>
        </div>
      </Kartu>

      {p.jiwa ? (
        <>
          {/* OTAK PAUS — neuron hidup v2 (keluhan pemilik: kualitas rendah → PAUS-ASLI lewat sidik ukuran) */}
          <Kartu className="border-violet-500/40 bg-violet-500/5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <JudulKecil warna="text-violet-300">otak paus hidup v2 — {p.jiwa.neurons.length} paus teridentifikasi · denyut ke-{p.jiwa.denyutKe}</JudulKecil>
              <Badge tone="ungu">duel aktif {p.jiwa.duelAktif.length}</Badge>
              <Badge tone={(p.jiwa.dinding?.aktif?.length ?? 0) > 0 ? 'amber' : 'netral'}>dinding orderbook aktif {p.jiwa.dinding?.aktif?.length ?? 0}</Badge>
              <Badge tone="ungu">kepahaman {p.jiwa.kepahaman?.length ?? 0} aturan</Badge>
              <Badge tone={p.jiwa.kalibrasi.nTerjawab > 0 ? (p.jiwa.kalibrasi.akurasi >= 0.6 ? 'hijau' : p.jiwa.kalibrasi.akurasi >= 0.4 ? 'amber' : 'merah') : 'netral'}>formula keyakinan: {p.jiwa.kalibrasi.nTerjawab} duel terjawab · akurasi {Math.round(p.jiwa.kalibrasi.akurasi * 100)}%</Badge>
              <Badge tone={p.jiwa.vitamin.aktif ? 'hijau' : 'netral'}>{p.jiwa.vitamin.aktif ? 'vitamin dikirim ke dewan AR-E10' : 'suara paus netral kali ini — tetap berdenyut'}</Badge>
            </div>
            <p className="mb-3 text-sm text-neutral-300">
              Kualitas v2 — paus benar-benar PAUS, bukan kerumunan: neuron hanya lahir dari cetakan <b>KELAS PAUS</b> (≥ 15× median, clamp $2000–8000) dan dicocokkan antar denyut lewat <b>SIDIK UKURAN</b> (0,4×–2,5× median ukurannya) — cetakan $500-an tidak lagi menyamar jadi paus. Tiap paus punya <b>REKAM JEJAK</b> duel (W/L) yang masuk formula keyakinan — paus yang sering salah DIDEMOT. Dari medan lahir <b>kepahaman tertambang</b>: rapor n/benar/akurasi per aturan (funding, OI, dinding, kerumunan).
            </p>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[960px] text-left text-[11.5px]">
                <thead className="bg-white/5 text-neutral-300">
                  <tr><th className="px-2 py-1.5">paus</th><th>sifat</th><th>rekam jejak</th><th>ukuran khas</th><th>keyakinan</th><th>tenaga</th><th>net 24j</th><th>denyut</th><th>siluet DNA</th><th>terakhir</th></tr>
                </thead>
                <tbody className="font-mono">
                  {p.jiwa.neurons.slice(0, 12).map((n) => {
                    const sifatTone: 'hijau' | 'merah' | 'amber' | 'netral' | 'ungu' = n.sifat === 'AKUMULATOR SPOT' || n.sifat === 'PENGUASA LONG' ? 'hijau' : n.sifat === 'DISTRIBUTOR SPOT' || n.sifat === 'PENGUASA SHORT' ? 'merah' : n.sifat === 'PENJAGA HEDGED' ? 'amber' : 'ungu';
                    const rekam = n.benar + n.salah;
                    return (
                      <tr key={n.nama} className={`border-t border-white/5 ${n.tidur ? 'opacity-40' : ''}`}>
                        <td className="px-2 py-1 text-neutral-100">{n.nama}{n.tidur ? ' (tidur)' : ''}</td>
                        <td><Badge tone={sifatTone}>{n.sifat}</Badge></td>
                        <td>
                          {rekam ? <Badge tone={n.benar > n.salah ? 'hijau' : n.salah > n.benar ? 'merah' : 'netral'}>{n.benar}W / {n.salah}L</Badge> : <span className="text-neutral-600">—</span>}
                        </td>
                        <td className="text-neutral-400">~{usd(n.ukuranMedian)}</td>
                        <td className="text-violet-300">{Math.round(n.keyakinan * 100)}%</td>
                        <td>
                          <div className="h-1.5 w-24 rounded bg-black/50"><div className="h-1.5 rounded bg-violet-400" style={{ width: `${Math.round(n.tenaga * 100)}%` }} /></div>
                          <span className="text-[10px] text-neutral-500">{n.tenaga.toFixed(2)}</span>
                        </td>
                        <td className={n.net24jUsd >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{usd(n.net24jUsd)}</td>
                        <td className="text-neutral-400">{n.denyut}×</td>
                        <td className="max-w-[220px] truncate text-neutral-500" title={`${n.siluet} · niat ${n.dna.niatDominan} · jam ${n.dna.jamAktif.join(',')}`}>{n.dna.venueDominan}/{n.dna.kelasDominan} · {n.dna.niatDominan} · {n.dna.jamAktif.join(',')}</td>
                        <td className="text-neutral-400">{n.terakhir.slice(5, 16).replace('T', ' ')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-neutral-500">kelas nilai: K &lt;$5rb · P $5–50rb · R $50–500rb · S &gt;$500rb — tapi neuron v2 HANYA dari cetakan kelas paus (ambang ditampilkan di baris ambang di bawah). Identitas = SIDIK PERILAKU (venue × sisi × ukuran khas × rentang jam), bukan alamat dompet — tanpa kunci on-chain nama asli tak terbaca (jujur). Paus &quot;tidur&quot; = tak terlihat &gt;48 jam; rekam jejaknya tetap disimpan. Jantung jiwa berdenyut tiap 3 menit, walau tak ada yang membuka panel.</p>
          </Kartu>

          {/* DUEL PAUS VS PAUS — "paus ini akan kalah dimakan paus itu" */}
          <Kartu className={p.jiwa.duelAktif.length ? 'border-amber-500/40 bg-amber-500/5' : ''}>
            <JudulKecil warna="text-amber-300">duel paus-vs-paus — &quot;paus ini akan kalah dimakan paus itu&quot;</JudulKecil>
            <p className="mb-3 text-sm text-neutral-300">
              Formula keyakinan menghitung <b>tenaga tempur</b> tiap paus — net 24j · porsi futures · dukungan funding · percepatan jejak · keandalan pola — lalu p(menang) = sigmoid(3,4 × selisih tenaga). Tiap duel <b>dijawab candle 1j nyata</b> (ambang 0,85×ATR 1j, batas 24 jam): MENANG/KALAH/SERAH dicatat apa adanya, dan hasilnya menyetel keandalan komponen formula — inilah akumulasi kepahaman yang tumbuh dari medan, bukan dari keinginan.
            </p>
            {p.jiwa.duelAktif.length ? (
              <div className="space-y-2">
                {p.jiwa.duelAktif.map((d) => {
                  const pemenang = d.pDari >= 0.5 ? d.dari : d.lawan;
                  return (
                    <div key={d.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[12px] font-bold text-amber-200">{d.dari}</span>
                        <span className="text-[11px] text-neutral-500">tenaga {d.tenagaDari.toFixed(2)}</span>
                        <Badge tone="netral">vs</Badge>
                        <span className="font-mono text-[12px] font-bold text-amber-200">{d.lawan}</span>
                        <span className="text-[11px] text-neutral-500">tenaga {d.tenagaLawan.toFixed(2)}</span>
                        <Badge tone={d.prediksiArah === 'NAIK' ? 'hijau' : d.prediksiArah === 'TURUN' ? 'merah' : 'netral'}>prediksi {d.prediksiArah} · {pemenang} menang (p={Math.round(d.pDari * 100)}%)</Badge>
                        <Badge tone="ungu">keyakinan {Math.round(d.keyakinanDuel * 100)}%</Badge>
                        <Badge tone="netral">mulai {d.mulaiAt.slice(5, 16).replace('T', ' ')} @ {fmtHarga(d.mulaiHarga)}</Badge>
                      </div>
                      {d.bukti?.length ? (
                        <div className="mt-2 text-[11px] text-sky-200/90">· bukti medan: {d.bukti.map((b, i) => <span key={i}>{i > 0 ? ' · ' : ''}{b}</span>)}</div>
                      ) : null}
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[10.5px] text-neutral-400 sm:grid-cols-5">
                        {Object.entries(d.komponen).map(([k, v]) => (
                          <div key={k}><span className="text-neutral-300">{k}</span>: {v[0].toFixed(2)} vs {v[1].toFixed(2)}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-neutral-400">Belum ada duel aktif: belum ada pasangan paus berlawanan arah dengan tenaga ≥ 0,25 — radar menunggu siluet berikutnya menempatkan kapital. Jujur lebih baik daripada mengarang duel.</p>
            )}
            <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3">
              <JudulKecil warna="text-violet-300">akumulasi kepahaman — kalibrasi mandiri dari {p.jiwa.kalibrasi.nTerjawab} duel terjawab</JudulKecil>
              <p className="text-[12px] text-neutral-300">
                akurasi formula: <b>{Math.round(p.jiwa.kalibrasi.akurasi * 100)}%</b> ({p.jiwa.kalibrasi.nBenar} menang dari {p.jiwa.kalibrasi.nTerjawab} terjawab) — keandalan komponen (1,00 = netral): {Object.entries(p.jiwa.kalibrasi.keandalan).map(([k, v]) => `${k} ${v.toFixed(2)}`).join(' · ')} · komponen yang terbukti menyesatkan diturunkan otomatis, yang menepat dinaikkan.
              </p>
            </div>
            {p.jiwa.duelSelesai.length ? (
              <div className="mt-2 max-h-[220px] overflow-auto rounded-lg border border-white/10">
                <table className="w-full min-w-[640px] text-left text-[11px]">
                  <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
                    <tr><th className="px-2 py-1.5">duel</th><th>prediksi</th><th>hasil</th><th>cerita jawaban</th></tr>
                  </thead>
                  <tbody className="font-mono">
                    {p.jiwa.duelSelesai.map((d) => (
                      <tr key={d.id + (d.selesaiAt ?? '')} className="border-t border-white/5">
                        <td className="px-2 py-1 text-neutral-300">{d.id}</td>
                        <td className={d.prediksiArah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}>{d.prediksiArah}</td>
                        <td><Badge tone={d.status === 'MENANG' ? 'hijau' : d.status === 'KALAH' ? 'merah' : 'netral'}>{d.status}</Badge></td>
                        <td className="max-w-[420px] text-neutral-500">{d.hasilCerita ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </Kartu>

          {/* DINDING PAUS — bukti medan orderbook nyata (v2) */}
          <Kartu className={(p.jiwa.dinding?.aktif?.length ?? 0) ? 'border-sky-500/40 bg-sky-500/5' : ''}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <JudulKecil warna="text-sky-300">dinding paus — pertahanan orderbook nyata dilacak lintas denyut</JudulKecil>
              <Badge tone={(p.jiwa.dinding?.aktif?.length ?? 0) ? 'amber' : 'netral'}>{p.jiwa.dinding?.aktif?.length ?? 0} dinding aktif</Badge>
              <Badge tone={(p.jiwa.dinding?.selesai ?? []).some((w) => w.status === 'PATAH') ? 'merah' : 'netral'}>{(p.jiwa.dinding?.selesai ?? []).filter((w) => w.status === 'PATAH').length} patah tercatat</Badge>
              <Badge tone="netral">{(p.jiwa.dinding?.selesai ?? []).filter((w) => w.status === 'MUNDUR').length} mundur (bait terduga)</Badge>
            </div>
            <p className="mb-3 text-sm text-neutral-300">
              Dinding = level orderbook besar (≥ 10× level tipikal, min $1000) di Bybit spot/futures + Gate futures — bukan jumlah kabur ±2%, tapi level PERSIS dengan harga PERSIS. Dilacak tiap denyut 3 menit: <b>DIGIGIT</b> (ukurannya dimakan penyerang), <b>PATAH DIMAKAN</b> (harga tembus — paus penjaga KALAH dimakan penyerang), <b>MUNDUR</b> (dicabut tanpa kontak — terduga bait/spoof). Inilah bukti medan &quot;paus kalah dimakan paus&quot; dari orderbook, bukan cuma angka tenaga.
            </p>
            {(p.jiwa.dinding?.aktif?.length ?? 0) ? (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full min-w-[760px] text-left text-[11px]">
                  <thead className="bg-white/5 text-neutral-300">
                    <tr><th className="px-2 py-1.5">dinding</th><th>venue</th><th>sisi</th><th>harga</th><th>nilai</th><th>puncak</th><th>digigit</th><th>umur</th><th>status</th></tr>
                  </thead>
                  <tbody className="font-mono">
                    {(p.jiwa.dinding?.aktif ?? []).slice(0, 10).map((w) => (
                      <tr key={w.id} className="border-t border-white/5">
                        <td className="px-2 py-1 text-neutral-200">{w.id}</td>
                        <td className="text-neutral-400">{w.venue}</td>
                        <td className={w.sisi === 'BID' ? 'text-emerald-300' : 'text-rose-300'}>{w.sisi}</td>
                        <td className="text-neutral-100">{fmtHarga(w.harga)}</td>
                        <td className={w.sisi === 'BID' ? 'text-emerald-300' : 'text-rose-300'}>{usd(Math.round(w.usd))}</td>
                        <td className="text-neutral-400">{usd(Math.round(w.puncakUsd))}</td>
                        <td className={w.makanUsd > 300 ? 'text-amber-300' : 'text-neutral-500'}>{w.makanUsd > 0 ? usd(Math.round(w.makanUsd)) : '—'}</td>
                        <td className="text-neutral-400">{Math.max(1, Math.round((Date.now() - Date.parse(w.lahir)) / 60000))}m</td>
                        <td><Badge tone={w.status === 'HIDUP' ? 'hijau' : w.status === 'GIGIT' ? 'amber' : 'merah'}>{w.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-400">Belum ada dinding besar di buku 3 venue (atau belum 2 denyut terlihat) — radar tidak mengarang dinding yang tak ada.</p>
            )}
            {(p.jiwa.dinding?.selesai ?? []).filter((w) => w.status === 'PATAH' || w.status === 'MUNDUR').length ? (
              <div className="mt-2 space-y-1 text-[11px]">
                {(p.jiwa.dinding?.selesai ?? []).filter((w) => w.status === 'PATAH' || w.status === 'MUNDUR').slice(0, 6).map((w) => (
                  <div key={w.id + (w.selesaiAt ?? '')}>
                    · <b className={w.status === 'PATAH' ? 'text-rose-300' : 'text-amber-300'}>{w.id} {w.status}</b> {w.venue} {w.sisi} @ {fmtHarga(w.harga)} (puncak {usd(Math.round(w.puncakUsd))}) — {w.cerita ?? ''}
                  </div>
                ))}
              </div>
            ) : null}
          </Kartu>

          {/* KERUMUNAN vs PAUS — bahan bakar likuidasi (v2) */}
          <Kartu className="border-cyan-500/40 bg-cyan-500/5">
            <JudulKecil warna="text-cyan-300">kerumunan vs paus — siapa sesak, siapa jadi makanan</JudulKecil>
            {!p.kerumunan.tersedia ? (
              <p className="text-sm text-neutral-400">Bybit tidak menyediakan rasio long/short akun untuk ELSAUSDT — radar jujur: peta kerumunan kosong untuk koin ini, dan TIDAK dikarang. Bahan bakar likuidasi masih dibaca dari funding + likuidasi 24 jam + sisi paus di atas.</p>
            ) : (
              <>
                <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-[11px] text-neutral-400">kerumunan akun long: <b className="text-cyan-200">{p.kerumunan.akunLongPct ?? '—'}%</b></p>
                    <div className="h-2 w-full rounded bg-black/50">
                      <div className={`h-2 rounded ${((p.kerumunan.akunLongPct ?? 50) >= 58 || (p.kerumunan.akunLongPct ?? 50) <= 42) ? 'bg-cyan-400' : 'bg-cyan-700'}`} style={{ width: `${Math.min(100, Math.max(0, p.kerumunan.akunLongPct ?? 50))}%` }} />
                    </div>
                    <p className="mt-1 text-[10.5px] text-neutral-500">≥58% = long sesak (bahan bakar squeeze turun) · ≤42% = short sesak (bahan bakar squeeze naik)</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] text-neutral-400">kerumunan posisi long: <b className="text-cyan-200">{p.kerumunan.posisiLongPct ?? '—'}%</b></p>
                    <div className="h-2 w-full rounded bg-black/50">
                      <div className="h-2 rounded bg-cyan-600" style={{ width: `${Math.min(100, Math.max(0, p.kerumunan.posisiLongPct ?? 50))}%` }} />
                    </div>
                    <p className="mt-1 text-[10.5px] text-neutral-500">rasio nilai posisi (bukan akun) Bybit 1h terakhir</p>
                  </div>
                </div>
                {p.kerumunan.akunLongPct != null && ((p.kerumunan.akunLongPct >= 58 && p.net.sisiPenempatan === 'SHORT') || (p.kerumunan.akunLongPct <= 42 && p.net.sisiPenempatan === 'LONG')) ? (
                  <p className="rounded-lg border border-cyan-500/40 bg-black/30 p-2 text-[12px] text-cyan-100">
                    <b>PAUS MELAWAN ARUS:</b> kerumunan sesak {p.kerumunan.akunLongPct >= 58 ? 'LONG' : 'SHORT'} ({p.kerumunan.akunLongPct}%) tapi paus menempatkan di sisi {p.net.sisiPenempatan} — ini kombinasi &quot;paus berdiri di sisi lawan kerumunan&quot; yang jadi bahan bakar squeeze paling klasik.
                  </p>
                ) : (
                  <p className="text-[11.5px] text-neutral-400">paus menempatkan sisi {p.net.sisiPenempatan}; kerumunan tidak ekstrem ({p.kerumunan.akunLongPct}%) — tanpa bahan bakar sesak ekstrem, tanpa klaim berlebih.</p>
                )}
              </>
            )}
          </Kartu>

          {/* KEPAHAMAN TERTAMBANG — rapor aturan (v2) */}
          <Kartu className="border-violet-500/40">
            <JudulKecil warna="text-violet-300">kepahaman tertambang — rapor tiap aturan dari medan</JudulKecil>
            <p className="mb-2 text-sm text-neutral-300">
              Tiap duel dijawab candle nyata → aturan yang HADIR saat duel dinilai: prediksi MENANG = benar, KALAH = salah. Akurasi tiap aturan tumbuh lintas denyut dan tersimpan — inilah akumulasi kepahaman yang terbaca manusia, bukan sekadar angka keandalan.
            </p>
            {(p.jiwa.kepahaman?.length ?? 0) ? (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full min-w-[640px] text-left text-[11px]">
                  <thead className="bg-white/5 text-neutral-300">
                    <tr><th className="px-2 py-1.5">aturan</th><th>artinya</th><th>n duel</th><th>benar</th><th>akurasi</th></tr>
                  </thead>
                  <tbody className="font-mono">
                    {(p.jiwa.kepahaman ?? []).map((l) => (
                      <tr key={l.kunci} className="border-t border-white/5">
                        <td className="px-2 py-1 text-neutral-200">{l.kunci}</td>
                        <td className="max-w-[360px] text-neutral-500">{l.judul}</td>
                        <td className="text-neutral-300">{l.n}</td>
                        <td className="text-emerald-300">{l.benar}</td>
                        <td>
                          <div className="h-1.5 w-20 rounded bg-black/50"><div className={`h-1.5 rounded ${l.akurasi >= 0.6 ? 'bg-emerald-400' : l.akurasi >= 0.45 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${Math.round(l.akurasi * 100)}%` }} /></div>
                          <span className="text-[10px] text-neutral-500">{Math.round(l.akurasi * 100)}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-400">Belum ada duel terjawab — rapor aturan mulai tumbuh begitu duel pertama selesai dijawab candle nyata. Jujur: kepahaman tak bisa dipaksakan lahir.</p>
            )}
          </Kartu>

          {/* KUALITAS SINYAL — umur tiap sumber diakui (v2) */}
          <Kartu>
            <JudulKecil warna="text-neutral-300">kualitas sinyal — umur tiap sumber, diakui terbuka</JudulKecil>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[620px] text-left text-[11px]">
                <thead className="bg-white/5 text-neutral-300">
                  <tr><th className="px-2 py-1.5">sumber</th><th>umur data</th><th>catatan</th></tr>
                </thead>
                <tbody className="font-mono">
                  {p.sinyal.map((s, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="px-2 py-1 text-neutral-200">{s.sumber}</td>
                      <td className={s.umurMenit == null ? 'text-neutral-600' : s.umurMenit <= 5 ? 'text-emerald-300' : s.umurMenit <= 65 ? 'text-amber-300' : 'text-rose-300'}>{s.umurMenit == null ? 'kosong' : `${s.umurMenit} menit`}</td>
                      <td className="text-neutral-500">{s.catatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-1 text-[10.5px] text-neutral-500">keluhan &quot;kualitas rendah&quot; dijawab juga dengan kejujuran: kesimpulan paus hanya sekuat sumber di bawahnya — umur data per sumber tampil apa adanya (hijau ≤ 5 menit · amber ≤ 65 menit · merah lebih tua / kosong diakui).</p>
          </Kartu>

          {/* VITAMIN UNTUK OTAK + PREDIKSI NASIB */}
          <Kartu className="border-emerald-500/40 bg-emerald-500/5">
            <JudulKecil warna="text-emerald-300">vitamin untuk otak + prediksi nasib — radar paus ikut memutuskan</JudulKecil>
            <p className="mb-2 text-sm text-neutral-200">{p.jiwa.vitamin.teks}</p>
            <ul className="mb-2 space-y-1 text-[11.5px] text-neutral-300">
              {p.jiwa.kesaksian.map((k, i) => (
                <li key={i}>· <b className={k.vote === 'NAIK' ? 'text-emerald-300' : k.vote === 'TURUN' ? 'text-rose-300' : 'text-neutral-400'}>{k.dari.replace('RADAR-PAUS:', '')}={k.vote}</b> (kekuatan {Math.round(k.kekuatan * 100) / 100}) — {k.cara}</li>
              ))}
            </ul>
            {p.jiwa.prediksiNasib.length ? (
              <div className="space-y-2">
                {p.jiwa.prediksiNasib.map((n) => (
                  <div key={n.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <div className="flex flex-wrap items-center gap-2"><span className="text-[12px] font-bold text-emerald-200">{n.judul}</span><Badge tone="ungu">keyakinan {Math.round(n.keyakinan * 100)}%</Badge></div>
                    <p className="mt-1 text-[12px] text-neutral-300">{n.teks}</p>
                    <p className="mt-1 text-[10.5px] text-neutral-500">dasar: {n.dasar}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-neutral-400">belum ada prediksi nasib yang layak — kondisi (distributor/akumulator aktif, funding sesak) belum terpenuhi; jujur lebih baik daripada mengarang.</p>
            )}
            <ul className="mt-2 space-y-0.5 text-[10.5px] text-neutral-500">
              {p.jiwa.jujur.map((j, i) => <li key={i}>· {j}</li>)}
            </ul>
          </Kartu>

          {/* DIARY JIWA */}
          {p.jiwa.diary.length ? (
            <Kartu>
              <JudulKecil warna="text-neutral-300">diary jiwa paus — radar yang ingat apa yang ia pelajari</JudulKecil>
              <div className="max-h-[200px] space-y-1 overflow-auto text-[11px] text-neutral-400">
                {p.jiwa.diary.map((d, i) => <div key={i}><span className="text-neutral-600">{d.at.slice(5, 16).replace('T', ' ')}</span> — {d.teks}</div>)}
              </div>
            </Kartu>
          ) : null}
        </>
      ) : (
        <Kartu>
          <JudulKecil warna="text-neutral-400">jiwa radar paus</JudulKecil>
          <p className="text-sm text-neutral-400">Jiwa belum menyala kali ini (denyut pertama atau jaringan gagal) — neuron menunggu cetakan besar pertama untuk lahir. Radar tetap membaca tape; denyut berikutnya (jantung jiwa tiap 3 menit) akan menghidupkannya.</p>
        </Kartu>
      )}

      {p.pola ? (
        <Kartu className={p.pola.tone === 'merah' ? 'border-rose-500/50 bg-rose-500/10' : p.pola.tone === 'hijau' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-amber-500/50 bg-amber-500/10'}>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <JudulKecil warna={p.pola.tone === 'merah' ? 'text-rose-300' : p.pola.tone === 'hijau' ? 'text-emerald-300' : 'text-amber-300'}>pola aktif: {p.pola.nama}</JudulKecil>
          </div>
          <p className="mb-2 text-sm text-neutral-200">{p.pola.vonis}</p>
          <ul className="space-y-1 text-[11px] text-neutral-300">
            {p.pola.bukti.map((b, i) => <li key={i}>· {b}</li>)}
          </ul>
        </Kartu>
      ) : (
        <Kartu>
          <JudulKecil warna="text-neutral-400">pola hedged</JudulKecil>
          <p className="text-sm text-neutral-400">Belum ada pola &quot;beli spot + pasang short&quot; (atau kebalikannya) yang nyata di jendela sekarang: spot net {p.net.netSpotUsd >= 0 ? '+' : '-'}{usd(Math.abs(p.net.netSpotUsd))} ({p.jendela.spotMenit} menit) · futures long baru {usd(p.net.longBaruUsd)} vs short baru {usd(p.net.shortBaruUsd)} (4 jam) → sisi penempatan: <b>{p.net.sisiPenempatan}</b>. Radar menunggu cetakan besar berikutnya.</p>
        </Kartu>
      )}

      <Kartu>
        <JudulKecil warna="text-cyan-300">vonis radar — jejak paus yang benar-benar terlihat</JudulKecil>
        <ul className="space-y-1.5 text-sm text-neutral-300">
          {p.vonis.map((v, i) => <li key={i}>· {v}</li>)}
        </ul>
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-amber-300">cetakan paus terbesar di jendela ({p.cetakan.length}) — SPOT/FUTURES × niat</JudulKecil>
        <div className="max-h-[420px] overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left text-[11.5px]">
            <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
              <tr><th className="px-2 py-1.5">waktu</th><th>pasar</th><th>sisi taker</th><th>nilai</th><th>harga</th><th>niat</th><th>dasar</th></tr>
            </thead>
            <tbody className="font-mono">
              {p.cetakan.map((c, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-2 py-1 text-neutral-400">{c.waktu}</td>
                  <td><Badge tone={c.venue === 'SPOT' ? 'hijau' : 'ungu'}>{c.venue}</Badge></td>
                  <td className={c.sisi === 'TAKER_BELI' ? 'text-emerald-300' : 'text-rose-300'}>{c.sisi === 'TAKER_BELI' ? 'BELI' : 'JUAL'} <span className="text-neutral-500">(taker)</span></td>
                  <td className="text-neutral-100">{usd(c.usd)}</td>
                  <td className="text-neutral-400">{fmtHarga(c.harga)}</td>
                  <td><Badge tone={niatTone(c.niat)}>{c.niat}</Badge></td>
                  <td title={c.dasarNiat} className="max-w-[280px] truncate text-neutral-500">{c.dasarNiat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">sisi taker = fakta tape; niat LONG/SHORT baru = inferensi ΔOI per jam (lihat catatan jujur di bawah). Contoh pemilik: &quot;beli 3.5rb USD ternyata pasang short&quot; — cetakan seperti itu kini muncul di sini dengan niatnya, bukan cuma &quot;ada yang beli&quot;.</p>
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-cyan-300">niat pasar per jam (24 jam, Gate stats × ΔOI) — siapa yang menempatkan posisi</JudulKecil>
        <div className="max-h-[420px] overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[640px] text-left text-[11.5px]">
            <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
              <tr><th className="px-2 py-1.5">jam (UTC)</th><th>ΔOI</th><th>taker beli</th><th>taker jual</th><th>niat</th><th>ket</th></tr>
            </thead>
            <tbody className="font-mono">
              {p.niatJam.map((j, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-2 py-1 text-neutral-400">{j.jam}</td>
                  <td className={j.dOiUsd >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{usd(j.dOiUsd)}</td>
                  <td className="text-emerald-400/80">{usd(j.takerBeliUsd)}</td>
                  <td className="text-rose-400/80">{usd(j.takerJualUsd)}</td>
                  <td><Badge tone={niatTone(j.niat)}>{j.niat.replace('_', ' ')}</Badge></td>
                  <td className="max-w-[300px] truncate text-neutral-500" title={j.ket}>{j.ket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-rose-300">audit dana gila-gilaan — &quot;tiba-tiba dana masuk 100 juta dolar?&quot;</JudulKecil>
        <p className="mb-3 text-sm text-neutral-300">Klaim dana diuji ke kapasitas NYATA pasar: volume 24 jam ({jt(p.pasar.vol24jSpotUsd + p.pasar.vol24jFuturesUsd)}), kedalaman ±2% ({usd(p.pasar.kedalamanAsk2pctUsd)} sisi beli), OI total ({jt(p.pasar.oiUsdBybit + p.pasar.oiUsdGate)}). Gugap (gagal paham) di sini memang bahaya — makanya dihitung, bukan ditebak.</p>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left text-[12px]">
            <thead className="bg-white/5 text-neutral-300">
              <tr><th className="px-2 py-1.5">klaim</th><th>× volume 24j</th><th>× kedalaman ±2%</th><th>× OI</th><th>vonis</th><th>makna</th></tr>
            </thead>
            <tbody className="font-mono">
              {p.auditDana.map((a, i) => {
                const ekstrem = a.klaim >= 100_000_000;
                return (
                  <tr key={i} className={`border-t border-white/5 ${ekstrem ? 'bg-rose-500/10' : ''}`}>
                    <td className="px-2 py-1.5 text-neutral-100">{jt(a.klaim)}{ekstrem ? ' (contoh pemilik)' : ''}</td>
                    <td className={a.rVol24 > 1 ? 'text-rose-300' : 'text-neutral-300'}>{a.rVol24}×</td>
                    <td className={a.rKedalaman > 20 ? 'text-rose-300' : a.rKedalaman > 5 ? 'text-amber-300' : 'text-neutral-300'}>{a.rKedalaman.toLocaleString('id-ID')}×</td>
                    <td className="text-neutral-300">{a.rOi}×</td>
                    <td><Badge tone={a.vonis.startsWith('MUNGKIN') ? 'hijau' : a.vonis.startsWith('BERAT') ? 'amber' : a.vonis.startsWith('MENGGESER') ? 'amber' : 'merah'}>{a.vonis}</Badge></td>
                    <td className="max-w-[320px] text-neutral-400" title={a.makna}>{a.makna}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">Angka 100jt ≈ {p.auditDana[4]?.rVol24 ?? '—'}× volume 24 jam dua venue dan {(p.auditDana[4]?.rKedalaman ?? 0).toLocaleString('id-ID')}× kedalaman ±2%: kalau tidak ada candle meledak + volume + OI yang meneguk sesuai — itu pertanda PALSU. Kalau akumulasi kecil berulang yang nyata (cetakan naik, OI naik, harga tahan) — itu pertanda ASLI: panik justru bahaya.</p>
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-violet-300">catatan jujur radar</JudulKecil>
        <ul className="space-y-1 text-[11px] text-neutral-400">
          {p.jujur.map((s, i) => <li key={i}>· {s}</li>)}
        </ul>
      </Kartu>
    </div>
  );
}


// ================= TAB: UJIAN ELSA 100 — dari kemunculan hingga kini =================
// ============================================================
// TAB UJIAN & UPGRADE — RANTAI DOMINO HIDUP (ruh ujian, bukan piagam)
// (keluhan pemilik 2026-11-24: ujian & upgrade "semacam piagam… hiasan
// tak ada efek domino apapun"). Kini tiap mata rantai tampil HIDUP:
//   ujian menempa → pelajaran difus jadi neuron → knob + konsultasi
//   dipakai keputusan hidup → hasil nyata mengadili rantai kembali.
// ============================================================
// ============================================================
// TAB: UJIAN MANDIRI — organ hidup dengan jantung berdenyut
// (keluhan pemilik 2026-11-25): "ujian mandiri harusnya senantiasa
// aktif setiap saat… listnya terpampang kumplit bukan hanya data
// sedikit… tiap ujian mandiri harusnya miliki ruh." Jawaban:
//  1) JANTUNG — denyut nyata (detak ke-N, pemicu, countdown denyut
//     berikutnya, cerita terakhir) — server berdenyut 24/7 walau
//     tak ada yang membuka panel.
//  2) KUMPLIT — SEMUA hari diuji tampil (bukan 30 baris), tiap
//     baris lengkap harga/tutup/net/streak + filter.
//  3) RUH — diary denyut & sesi ujian ELSA 100 dimuat penuh dari
//     /api/elsa/ujian-mandiri: ujian yang ingat hidupnya sendiri.
// ============================================================
const PEJICU_LABEL: Record<string, string> = {
  PERTAMA: 'jantung pertama', CANDLE_BARU: 'candle baru tutup', JADWAL: 'jadwal 30 menit', PEMILIK: 'perintah pemilik', JANTUNG: 'jantung denyut', PANEL: 'panel',
};
const pemicuTone = (p: string): 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral' =>
  p === 'CANDLE_BARU' ? 'hijau' : p === 'JADWAL' ? 'ungu' : p === 'PERTAMA' ? 'amber' : p === 'PEMILIK' ? 'merah' : 'netral';

// OTAK OTONOMI — papan bukti nyala mandiri (hukum pemilik 2026-11-26:
// "dua tombol itu pertanda mereka tidak berjalan memiliki ruh… saat diklik
// tak ada efek apapun — kecolongan bisa datang dari sini"). Dulu upgrade
// diam saat tak ada pelajaran baru dan ujian-ulang menggantung sampai HTTP
// mati — keduanya tampak seperti mesin mati yang butuh tangan manusia.
// Kini: TANPA TOMBOL. Jantung menyalakan kedua mesin tiap denyut (30 menit/
// candle baru/domino), dan SETIAP nyala — termasuk cek "belum perlu refusi" —
// tertulis di buku ini. Kalau jantung mati, papan ini JUJUR membeku dan
// kesaksian jantung (d.ujianDenyut.atTerakhir) memperlihatkan umurnya.
const MESIN_LABEL: Record<string, string> = { JANTUNG: 'jantung denyut', UJIAN100: 'ujian ELSA 100', UPGRADE: 'upgrade neuron', PAHAM: 'neuron paham', DOMPET: 'jantung dompet' };
const mesinTone = (m: string): 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral' =>
  m === 'UJIAN100' ? 'amber' : m === 'UPGRADE' ? 'ungu' : m === 'PAHAM' ? 'hijau' : m === 'JANTUNG' ? 'hijau' : m === 'DOMPET' ? 'ungu' : 'netral';

function PapanOtonomi({ otonomi, denyut }: { otonomi: OtonomiData | null; denyut: DenyutData | null }) {
  const r = otonomi?.ringkas;
  const uji = r?.ujianTerakhir ?? null;
  const upCek = r?.upgradeCekTerakhir ?? null;
  const upBaru = r?.upgradeBaruTerakhir ?? null;
  const detakLamaMenit = denyut?.atTerakhir ? Math.round((Date.now() - Date.parse(denyut.atTerakhir)) / 60000) : null;
  const jantungHidup = detakLamaMenit !== null && detakLamaMenit <= 35; // jadwal denyut penuh 30 menit + toleransi
  return (
    <Kartu>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <JudulKecil warna="text-cyan-300">papan otonomi — bukti nyala mandiri, tanpa tombol</JudulKecil>
        <Badge tone={jantungHidup ? 'hijau' : 'merah'}>
          {jantungHidup ? `jantung hidup · denyut ke-${denyut?.detakKe ?? '—'} · ${detakLamaMenit ?? '—'} mnt lalu` : `jantung TERHENTI ${detakLamaMenit === null ? '(tak pernah menyala)' : `${detakLamaMenit} mnt tidak berdenyut`} — diperlihatkan apa adanya, bukan disembunyikan`}
        </Badge>
        <Badge tone="netral">{r?.mandiri24j ?? 0} nyala mandiri 24 jam terakhir</Badge>
        <Badge tone="netral">{r?.total ?? 0} entri buku</Badge>
      </div>
      <p className="mb-3 text-[12px] leading-snug text-neutral-300">
        Di tab ini <b>dulu ada dua tombol manual</b> (&ldquo;jalankan upgrade&rdquo; &amp; &ldquo;ujian ulang&rdquo;) — diklik pun sering <b>tak ada efek apapun</b>: upgrade diam saat belum ada pelajaran baru, ujian ulang menggantung sampai koneksi mati. Itu <b>oknum pemalas</b> yang mengajari kita bergantung pada tangan sendiri. Kini tombol dihapus seluruhnya: <b>jantung denyut yang menyalakan kedua mesin</b> — tiap candle harian tutup, tiap 30 menit, dan sesudah tiap ujian tuntas — dan setiap nyala dicatat di buku di bawah, <b>termasuk cek yang kesimpulannya &ldquo;belum perlu refusi&rdquo;</b> (yang dulu diam tanpa jejak). Pasar kejam &amp; bergerak tiap detik — otak yang harus diklik manusia adalah otak yang mati.
      </p>
      <div className="grid gap-2 text-[12px] sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500">ujian ELSA 100 — nyala terakhir</div>
          {uji ? (
            <>
              <div className="mt-1 text-neutral-200">{uji.hasil}</div>
              <div className="text-[11px] text-neutral-500">{new Date(uji.at).toLocaleString('id-ID')} · pemicu {PEJICU_LABEL[uji.pemicu] ?? uji.pemicu}</div>
              <div className="mt-1 text-[11px] text-neutral-400">{uji.bukti}</div>
            </>
          ) : <div className="mt-1 text-[11px] text-neutral-500">belum ada nyala tercatat — denyut jantung berikutnya akan mengisi</div>}
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500">upgrade — cek mandiri terakhir</div>
          {upCek ? (
            <>
              <div className="mt-1 text-neutral-200">{upCek.hasil}</div>
              <div className="text-[11px] text-neutral-500">{new Date(upCek.at).toLocaleString('id-ID')} · pemicu {PEJICU_LABEL[upCek.pemicu] ?? upCek.pemicu}</div>
              <div className="mt-1 text-[11px] text-neutral-400">{upBaru ? `terakhir diterbitkan: ${upBaru.hasil} — ${new Date(upBaru.at).toLocaleString('id-ID')}` : upCek.bukti}</div>
            </>
          ) : <div className="mt-1 text-[11px] text-neutral-500">belum ada cek tercatat — denyut jantung berikutnya akan mengisi</div>}
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500">jantung — denyut terakhir</div>
          {r?.jantungTerakhir ? (
            <>
              <div className="mt-1 text-neutral-200">{r.jantungTerakhir.hasil}</div>
              <div className="text-[11px] text-neutral-500">{new Date(r.jantungTerakhir.at).toLocaleString('id-ID')} · pemicu {PEJICU_LABEL[r.jantungTerakhir.pemicu] ?? r.jantungTerakhir.pemicu}</div>
              <div className="mt-1 text-[11px] text-neutral-400">{r.jantungTerakhir.bukti}</div>
            </>
          ) : <div className="mt-1 text-[11px] text-neutral-500">belum ada denyut tercatat</div>}
        </div>
      </div>
      {(otonomi?.entri.length ?? 0) > 0 && (
        <div className="mt-3 max-h-[230px] overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[520px] text-left text-[11.5px]">
            <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
              <tr><th className="px-2 py-1.5">waktu</th><th>mesin</th><th>pemicu</th><th>hasil</th><th>bukti</th></tr>
            </thead>
            <tbody className="font-mono">
              {otonomi!.entri.map((e, i) => (
                <tr key={`${e.at}-${i}`} className="border-t border-white/5">
                  <td className="px-2 py-1 text-neutral-500">{new Date(e.at).toLocaleString('id-ID')}</td>
                  <td><Badge tone={mesinTone(e.mesin)}>{MESIN_LABEL[e.mesin] ?? e.mesin}</Badge></td>
                  <td className="text-neutral-400">{PEJICU_LABEL[e.pemicu] ?? e.pemicu}</td>
                  <td className="text-neutral-200">{e.hasil}</td>
                  <td className="text-[10.5px] text-neutral-500">{e.bukti}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-[11px] text-neutral-400">
        Buku ini satu-satunya bukti yang kita percaya: bukan kata &ldquo;hidup&rdquo;, tapi <b>jejak nyala bertanggal</b>. Entri mandiri = menyala tanpa satu pun sentuhan manusia (candle baru / jadwal 30 menit / domino ujian). Kalau baris baru berhenti muncul &gt;35 menit, papan menyeret jantung sebagai TERHENTI — kecolongan tidak diberi tempat bersembunyi.
      </p>
    </Kartu>
  );
}

function TabUjianMandiri({ u, denyut, paham }: { u: NonNullable<Payload['ujian']>; denyut: DenyutData | null; paham: PahamData | null }) {
  const [saring, setSaring] = useState<'SEMUA' | 'BENAR' | 'MELESET'>('SEMUA');
  const [detakSemua, setDetakSemua] = useState<Detak[]>([]);
  const [sesiSemua, setSesiSemua] = useState<SesiUjian[]>([]);
  const [daftarSemua, setDaftarSemua] = useState<BarisUjianMandiri[]>([]);
  const [kini, setKini] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setKini(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    // RUH — diary penuh denyut + sesi + DAFTAR PENUH hari diadili (memori
    // penuh sejak listing, bertambah satu baris tiap hari — bukan jendela 200)
    fetch('/api/elsa/ujian-mandiri').then((r) => r.json()).then((j: { riwayatSemua?: Detak[]; sesiUjianElsa?: SesiUjian[]; daftarSemua?: BarisUjianMandiri[] }) => {
      setDetakSemua(j.riwayatSemua ?? []);
      setSesiSemua(j.sesiUjianElsa ?? []);
      setDaftarSemua(j.daftarSemua ?? []);
    }).catch(() => { /* keadaan dari payload tetap tampil */ });
  }, []);
  const semua: BarisUjianMandiri[] = daftarSemua.length ? daftarSemua : (u.semua ?? []);
  const baris = semua.filter((h) => (saring === 'SEMUA' ? true : saring === 'BENAR' ? h.benar : !h.benar));
  const hariDiadili = Math.max(u.n, semua.length);
  const detak = denyut?.detakTerakhir ?? detakSemua[0] ?? null;
  const sisaMs = denyut?.atBerikutnya ? Math.max(0, Date.parse(denyut.atBerikutnya) - kini) : null;
  const sisaTeks = sisaMs === null ? '—' : `${Math.floor(sisaMs / 60000)} mnt ${Math.floor((sisaMs % 60000) / 1000)} dtk`;
  const berlagar = denyut?.status === 'BERLAGA';
  return (
    <div className="space-y-4">
      <Kartu>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="relative flex h-3.5 w-3.5">
            <span className={`absolute inline-flex h-full w-full rounded-full ${berlagar ? 'bg-amber-400' : 'bg-emerald-400'} opacity-60 animate-ping`} />
            <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${berlagar ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          </span>
          <JudulKecil warna={berlagar ? 'text-amber-300' : 'text-emerald-300'}>
            jantung ujian mandiri {berlagar ? '— SEDANG BERLAGA (menghakimi seluruh riwayat)…' : '— AKTIF, berdenyut setiap saat tanpa perintah manusia'}
          </JudulKecil>
          <Badge tone={berlagar ? 'amber' : 'hijau'}>{berlagar ? 'BERLAGA' : 'AKTIF'}</Badge>
          {denyut && <Badge tone="ungu">detak ke-{denyut.detakKe}</Badge>}
          {denyut?.pemicuTerakhir && denyut.pemicuTerakhir !== '—' && <Badge tone={pemicuTone(denyut.pemicuTerakhir)}>{PEJICU_LABEL[denyut.pemicuTerakhir] ?? denyut.pemicuTerakhir}</Badge>}
        </div>
        <p className="mb-3 text-sm text-neutral-300">
          Ujian mandiri kini <b>makhluk yang hidup</b>: jantung menyelidik pasar tiap {denyut?.jedaDetik ?? 60} detik;
          begitu candle harian baru <b>tutup</b>, candle itu otomatis masuk memori riwayat (ELSA + BTC) dan <b>seluruh ujian berlaga ulang saat itu juga</b> —
          dan <b>daftar ini bertambah</b>: +1 hari diadili (kini <b className="font-mono">{hariDiadili}</b>) + 1 soal ujian ELSA 100 (100 → 101 → …). Ujian sedang berlangsung, bukan piagam — besok daftar ini bertambah lagi tanpa perintah.
          {denyut?.atTerakhir ? ` Denyut terakhir ${new Date(denyut.atTerakhir).toLocaleString('id-ID')}` : ''}.
          Latihan penuh juga diulang tiap 30 menit (drill tanpa henti). Denyut berikutnya dalam <b className="font-mono">{sisaTeks}</b>.
        </p>
        {detak && (
          <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/5 p-3">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
              <Badge tone={pemicuTone(detak.pemicu)}>{PEJICU_LABEL[detak.pemicu] ?? detak.pemicu}</Badge>
              <span className="font-mono">{new Date(detak.at).toLocaleString('id-ID')}</span>
              <span>{(detak.durasiMs / 1000).toFixed(1)} dtk</span>
              {detak.deltaAkurasiPp !== null && <span className={detak.deltaAkurasiPp >= 0 ? 'text-emerald-300' : 'text-rose-300'}>akurasi {detak.deltaAkurasiPp >= 0 ? '+' : ''}{detak.deltaAkurasiPp} pp vs denyut lalu</span>}
              {detak.deltaNetPp !== null && <span className={detak.deltaNetPp >= 0 ? 'text-emerald-300' : 'text-rose-300'}>net {detak.deltaNetPp >= 0 ? '+' : ''}{detak.deltaNetPp} pp vs denyut lalu</span>}
              {detak.memoriTumbuh > 0 && <span className="text-violet-300">memori +{detak.memoriTumbuh} candle</span>}
            </div>
            <p className="text-[13px] leading-relaxed text-neutral-200">{detak.cerita}</p>
          </div>
        )}
        <ul className="mt-2 space-y-1 text-[11px] text-neutral-400">
          {(denyut?.catatan ?? []).map((c, i) => <li key={i}>· {c}</li>)}
        </ul>
      </Kartu>

      {/* ===== OTAK PAHAM — neuron kepahaman ELSA dari setiap hari diadili ===== */}
      <PapanPaham p={paham} tab="ujian" />

      <Kartu>
        <JudulKecil>ujian mandiri walk-forward — otak dibekukan di tiap titik riwayat ELSA nyata</JudulKecil>
        <p className="mb-3 text-sm text-neutral-300">Setiap hari historis: otak hanya melihat 60 candle sebelumnya (point-in-time), memvonis BUY/SELL, lalu dihakimi candle berikutnya. Tanpa data masa depan, tanpa sintetis — medan ELSA sendiri.</p>
        <div className="grid gap-3 text-center sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-amber-300">{hariDiadili}</div><div className="text-[11px] text-neutral-400">hari diuji — memori penuh sejak listing, +1 tiap candle tutup</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-emerald-300">{(u.akurasi * 100).toFixed(0)}%</div><div className="text-[11px] text-neutral-400">akurasi arah</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-neutral-200">{u.brier}</div><div className="text-[11px] text-neutral-400">brier (koin 0.25)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-2xl font-black ${u.netTotal >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{pct(u.netTotal, 1)}</div><div className="text-[11px] text-neutral-400">net after-fee 0.4%</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-cyan-300">{u.streak?.kini ?? 0}</div><div className="text-[11px] text-neutral-400">streak benar berjalan</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-violet-300">{u.streak?.terpanjang ?? 0}</div><div className="text-[11px] text-neutral-400">streak benar terpanjang sepanjang riwayat</div></div>
        </div>
      </Kartu>

      <div className="grid gap-4 lg:grid-cols-2">
        <Kartu>
          <JudulKecil>gerbang integritas (G1-G4)</JudulKecil>
          <ul className="space-y-2 text-[12px]">
            {u.gates.map((g) => (
              <li key={g.id} className="flex items-start gap-2">
                <span className={g.pass ? 'text-emerald-400' : 'text-rose-400'}>{g.pass ? 'LOLOS' : 'GAGAL'}</span>
                <span><span className="font-semibold text-neutral-200">{g.label}</span> — <span className="text-neutral-400">{g.detail}</span></span>
              </li>
            ))}
          </ul>
        </Kartu>
        <Kartu>
          <JudulKecil>suite A/B</JudulKecil>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black">{(u.A.akurasi * 100).toFixed(0)}%</div><div className="text-[11px] text-neutral-400">suite A ({u.A.n} hari)</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black">{(u.B.akurasi * 100).toFixed(0)}%</div><div className="text-[11px] text-neutral-400">suite B — out-of-sample ({u.B.n} hari)</div></div>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">Gagah di riwayat awal tapi pincang di hari segar = otak hafalan, bukan kecerdasan — dua suite diuji terpisah di sini.</p>
        </Kartu>
      </div>

      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">daftar lengkap {semua.length} hari diuji — KUMPLIT & BERTAMBAH TIAP HARI (memori penuh sejak listing)</JudulKecil>
          <div className="flex gap-1">
            {(['SEMUA', 'BENAR', 'MELESET'] as const).map((k) => (
              <button key={k} onClick={() => setSaring(k)} className={`rounded-md border px-2 py-0.5 text-[11px] ${saring === k ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300' : 'border-white/15 text-neutral-300 hover:bg-white/5'}`}>{k}</button>
            ))}
          </div>
          <span className="ml-auto text-[11px] text-neutral-500">menampilkan {baris.length} dari {semua.length} hari · streak = rentetan benar saat itu · daftar tumbuh +1 tiap candle tutup</span>
        </div>
        <div className="max-h-[520px] overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[680px] text-left text-[11.5px]">
            <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
              <tr><th className="px-2 py-1.5">hari diadili</th><th>harga saat vonis</th><th>tutup nyata besok</th><th>vonis</th><th>keyakinan</th><th>hakim</th><th>net</th><th>streak</th></tr>
            </thead>
            <tbody className="font-mono">
              {baris.map((h) => (
                <tr key={h.hari} className="border-t border-white/5">
                  <td className="px-2 py-1 text-neutral-400">{h.hari}</td>
                  <td className="text-neutral-300">{fmtHarga(h.harga)}</td>
                  <td className="text-neutral-300">{fmtHarga(h.tutup)}</td>
                  <td className={h.vonis === 'BUY' ? 'text-emerald-300' : 'text-rose-300'}>{h.vonis}</td>
                  <td className="text-neutral-300">{h.kepastian}%</td>
                  <td className={h.benar ? 'text-emerald-400' : 'text-rose-400'}>{h.benar ? 'BENAR' : 'MELESET'}</td>
                  <td className={h.netPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{pct(h.netPct)}</td>
                  <td className={h.streak >= 3 ? 'text-cyan-300' : 'text-neutral-500'}>{h.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">Daftar ini KUMPLIT dari memori penuh (bukan jendela 200 candle): semua hari yang pernah diuji sejak listing, tampil penuh — dan BERTAMBAH SATU BARIS SETIAP HARI begitu candle tutup, karena ujian sedang berlangsung. Dulu hanya 30 baris terakhir yang tampil dan memori tak pernah tumbuh (itu yang diadukan pemilik).</p>
      </Kartu>

      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-violet-300">diary denyut — {detakSemua.length ? `${detakSemua.length} denyut tercatat` : 'denyut tercatat oleh jantung (memuat diary penuh…)'}</JudulKecil>
          <span className="ml-auto text-[11px] text-neutral-500">tiap denyut = satu kali berlaga penuh + cerita pembanding denyut sebelumnya</span>
        </div>
        <div className="max-h-[460px] space-y-2 overflow-auto">
          {(detakSemua.length ? detakSemua : (denyut?.riwayat ?? [])).map((d) => (
            <div key={`${d.detakKe}-${d.at}`} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="font-black text-neutral-200">#{d.detakKe}</span>
                <Badge tone={pemicuTone(d.pemicu)}>{PEJICU_LABEL[d.pemicu] ?? d.pemicu}</Badge>
                <span className="font-mono text-neutral-400">{new Date(d.at).toLocaleString('id-ID')}</span>
                <span className="text-neutral-500">{(d.durasiMs / 1000).toFixed(1)} dtk</span>
                <span className={d.deltaAkurasiPp !== null && d.deltaAkurasiPp < 0 ? 'text-rose-300' : d.deltaAkurasiPp !== null ? 'text-emerald-300' : 'text-neutral-500'}>Δakurasi {d.deltaAkurasiPp !== null ? `${d.deltaAkurasiPp >= 0 ? '+' : ''}${d.deltaAkurasiPp}pp` : 'pertama'}</span>
                <span className={d.deltaNetPp !== null && d.deltaNetPp < 0 ? 'text-rose-300' : d.deltaNetPp !== null ? 'text-emerald-300' : 'text-neutral-500'}>Δnet {d.deltaNetPp !== null ? `${d.deltaNetPp >= 0 ? '+' : ''}${d.deltaNetPp}pp` : '—'}</span>
                {d.gerbangBerubah && <span className="text-amber-300">gerbang {d.gerbangBerubah}</span>}
                {d.memoriTumbuh > 0 && <span className="text-violet-300">memori +{d.memoriTumbuh}</span>}
                {!!d.daftarTumbuh && <span className="text-violet-300">daftar hari diadili +{d.daftarTumbuh} → {d.daftarJumlah ?? '—'}</span>}
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-300">{d.cerita}</p>
            </div>
          ))}
        </div>
      </Kartu>

      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-cyan-300">diary sesi ujian ELSA 100 — {sesiSemua.length ? `${sesiSemua.length} sesi tercatat` : 'memuat diary penuh…'}</JudulKecil>
          <span className="ml-auto text-[11px] text-neutral-500">tiap denyut jantung juga memperdengarkan ujian ELSA 100 — sesi lengkap tampil di sini (kumplit)</span>
        </div>
        <div className="max-h-[380px] overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[760px] text-left text-[11.5px]">
            <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
              <tr><th className="px-2 py-1.5">#</th><th>waktu</th><th>pemicu</th><th>durasi</th><th>ronde dijalankan</th><th>hasil</th><th>lulus tanpa kasus</th><th>pelajaran baru</th><th>buku pelajaran</th></tr>
            </thead>
            <tbody className="font-mono">
              {sesiSemua.map((s) => (
                <tr key={`${s.sesiKe}-${s.at}`} className="border-t border-white/5">
                  <td className="px-2 py-1 text-neutral-500">{s.sesiKe}</td>
                  <td className="text-neutral-400">{new Date(s.at).toLocaleString('id-ID')}</td>
                  <td><Badge tone={pemicuTone(s.pemicu)}>{PEJICU_LABEL[s.pemicu] ?? s.pemicu}</Badge></td>
                  <td className="text-neutral-400">{(s.durasiMs / 1000).toFixed(1)} dtk</td>
                  <td className="text-neutral-300">{s.rondeDijalankan}</td>
                  <td className={s.status === 'LULUS_SEMPURNA' ? 'text-emerald-300' : 'text-amber-300'}>{s.status === 'LULUS_SEMPURNA' ? `${s.lulus}/${s.soalSesudah ?? 100} nol kesalahan` : `${s.lulus}/${s.soalSesudah ?? 100} (${s.gagal} gagal)`}</td>
                  <td className="text-cyan-300">{s.lulusTanpaKasus}/{s.soalSesudah ?? 100}</td>
                  <td className={s.pelajaranBaru > 0 ? 'text-violet-300' : 'text-neutral-500'}>{s.pelajaranBaru > 0 ? `+${s.pelajaranBaru}` : '—'}</td>
                  <td className="text-neutral-500">{s.pelajaranSesudah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">Dulu sesi ujian tak tercatat apa pun — 100/100 tampil seperti piagam tanpa jejak. Kini tiap tarikan napas ujian (dari jantung, panel, atau perintah pemilik) tercatat lengkap: siapa memicu, berapa lama, berapa pelajaran baru lahir, dan buku pelajaran bertambah berapa — inilah jejak hidupnya.</p>
      </Kartu>
    </div>
  );
}

function TabUpgrade({ d }: { d: Payload }) {
  const u = d.ujianElsa ?? null;
  const up = d.upgrade ?? null;
  const dom = d.domino ?? null;
  const gen = d.genome?.generation ?? 1;
  const nKonteks = up ? up.nV0 + up.nV1 + up.nV2 + up.nV3 : 0;
  const nKasus = up ? up.pelajaranJumlah - nKonteks : 0;
  const sikapTone = (s: string) => (s === 'SESELARAS' ? 'hijau' : s === 'KONFLIK' || s === 'MENOLAK' ? 'merah' : 'netral') as 'hijau' | 'merah' | 'netral';
  const aksiTone = (s: string) => (s === 'BUY' ? 'hijau' : s === 'SELL' ? 'merah' : 'amber') as 'hijau' | 'merah' | 'amber';
  const nodeKelas = 'rounded-lg border border-white/10 bg-black/30 p-3';
  const upCek = d.otonomi?.ringkas.upgradeCekTerakhir ?? null;
  return (
    <div className="space-y-4">
      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-violet-300">rantai domino hidup — ujian menempa → neuron → keputusan hidup → hasil mengadili kembali</JudulKecil>
          <Badge tone={up ? (up.segar ? 'hijau' : 'amber') : 'netral'}>{up ? (up.segar ? 'neuron segar' : 'neuron BASI — refusi otomatis menyusul di denyut berikutnya') : 'neuron belum dibangun — denyut jantung berikutnya membangunnya'}</Badge>
          {d.ujianDenyut && (
            <Badge tone={d.ujianDenyut.status === 'BERLAGA' ? 'amber' : 'ungu'}>
              jantung ujian: {d.ujianDenyut.status === 'BERLAGA' ? 'BERLAGA…' : `AKTIF · detak ke-${d.ujianDenyut.detakKe}`}
            </Badge>
          )}
          <Badge tone="ungu">OTONOMI — tanpa tombol, jantung menyalakan sendiri</Badge>
          {upCek && <span className="text-[11px] text-neutral-400">cek terakhir: {upCek.hasil} · {new Date(upCek.at).toLocaleString('id-ID')}</span>}
        </div>
        <p className="mb-3 text-sm text-neutral-300">
          Ujian & upgrade kini punya ruh: tiap pelajaran konteks hasil ujian ELSA 100 <b>difus jadi neuron index</b> yang <b>dipakai keputusan hidup</b> (penalti keyakinan saat konflik, adopsi target/stop terbukti saat searah), dan tiap hasil hidup <b>kembali dicatat sebagai bukti domino</b>. Generasi otak sekarang: <b>G{gen}</b>{up?.neuron ? ` — neuron dibangun dari ${up.neuron.sourceJumlah} pelajaran` : ''}.
        </p>
        <div className="grid gap-2 text-[12px] sm:grid-cols-2 lg:grid-cols-5">
          <div className={nodeKelas}>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500">1 · ujian menempa</div>
            <div className={`text-xl font-black ${u?.status === 'LULUS_SEMPURNA' ? 'text-emerald-300' : 'text-amber-300'}`}>{u ? `${u.metrik.lulus}/100` : '—'}</div>
            <div className="text-[11px] text-neutral-400">{u?.metrik.rondeSampaiNol ? `nol kesalahan di ronde ${u.metrik.rondeSampaiNol}` : 'drill berjalan'}</div>
            <div className="mt-1 text-[11px] text-cyan-300">lulus tanpa buku kasus: {u?.metrik.lulusTanpaKasus ?? '—'}/100</div>
          </div>
          <div className={nodeKelas}>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500">2 · pelajaran ditempa</div>
            <div className="text-xl font-black text-violet-300">{up?.pelajaranJumlah ?? u?.metrik.pelajaranJumlah ?? '—'}</div>
            <div className="text-[11px] text-neutral-400">buku kasus riwayat: {nKasus}</div>
            <div className="text-[11px] text-neutral-400">konteks lintas-hari: v0 {up?.nV0 ?? 0} · v1 {up?.nV1 ?? 0} · v2 {up?.nV2 ?? 0} · v3 {up?.nV3 ?? 0}</div>
          </div>
          <div className={nodeKelas}>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500">3 · upgrade → neuron</div>
            {up?.neuron ? (
              <>
                <div className="text-xl font-black text-amber-300">{up.neuron.validasi.dijawabKonteks}/{up.neuron.validasi.soal}</div>
                <div className="text-[11px] text-neutral-400">soal dijawab konteks (tanpa kasus)</div>
                <div className="mt-1 text-[11px] text-neutral-400">lulus {up.neuron.validasi.lulus} · net {pct(up.neuron.validasi.netPct, 1)}</div>
              </>
            ) : <div className="text-[11px] text-neutral-400">neuron belum dibangun — denyut jantung berikutnya membangunnya sendiri (tanpa tombol)</div>}
          </div>
          <div className={nodeKelas}>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500">4 · dikonsumsi hidup</div>
            {dom?.konsultasi.ada ? (
              <>
                <div className={`text-xl font-black ${dom.sikap === 'SESELARAS' ? 'text-emerald-300' : dom.sikap === 'TANPA_BUKTI' ? 'text-neutral-300' : 'text-rose-300'}`}>{dom.sikap}</div>
                <div className="text-[11px] text-neutral-400">{dom.konsultasi.versi}: konteks {dom.konsultasi.aksi} · {dom.konsultasi.nKasus} kasus · bukti net {pct(dom.konsultasi.netBukti, 1)}</div>
                {dom.poin > 0 && <div className="mt-1 text-[11px] text-rose-300">penalti keyakinan −{dom.poin} poin</div>}
              </>
            ) : <div className="text-[11px] text-neutral-400">hari ini tanpa pengalaman konteks yang cocok — otak berdiri sendiri</div>}
          </div>
          <div className={nodeKelas}>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500">5 · umpan balik hidup</div>
            <div className="text-xl font-black text-emerald-300">{up?.umpanBalik.length ?? 0}</div>
            <div className="text-[11px] text-neutral-400">hasil nyata tercatat mengadili rantai</div>
            {up?.umpanBalik[0] && <div className="mt-1 text-[11px] text-neutral-400">terakhir: {up.umpanBalik[0].hari} {up.umpanBalik[0].arah} {up.umpanBalik[0].hasil} {pct(up.umpanBalik[0].netPct)}</div>}
          </div>
        </div>
        <p className="mt-3 text-[11px] text-neutral-400">
          Garis pemisah yang tetap absolut: <b>buku kasus riwayat (v4) tidak pernah menyentuh keputusan hidup</b> — yang dikonsumsi hidup hanya pengalaman konteks lintas-hari (v0 iklim → v3 halus) yang sengaja ditempa ujian untuk hari yang belum terlihat. Drill riwayat dan kecerdasan generalisasi berjalan berdampingan tanpa bocor.
        </p>
      </Kartu>

      <PapanOtonomi otonomi={d.otonomi ?? null} denyut={d.ujianDenyut ?? null} />

      {dom && (
        <Kartu>
          <JudulKecil warna="text-cyan-300">keputusan hidup hari ini — konsultasi neuron konteks</JudulKecil>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-[12px]">
                <div className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">sidik-jari hari ini (satu standar dengan ujian)</div>
                <div className="font-mono text-[11px] text-neutral-300 break-all">v0 {dom.fp.v0}</div>
                <div className="font-mono text-[10px] text-neutral-500 break-all">v1 {dom.fp.v1}</div>
                <div className="font-mono text-[10px] text-neutral-600 break-all">v2 {dom.fp.v2}</div>
                <div className="font-mono text-[10px] text-neutral-700 break-all">v3 {dom.fp.v3}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-[12px]">
                <div className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">dampak ke keyakinan hidup</div>
                <div className="flex flex-wrap items-center gap-2 text-neutral-200">
                  <span>dasar vonis {dom.dasarKepastian}%</span>
                  {dom.poin > 0 && <span className="text-rose-300">− {dom.poin} poin (PELAJARAN-KONTEKS)</span>}
                  <span className="text-neutral-500">→</span>
                  <span className={dom.keyakinanFinal >= dom.dasarKepastian ? 'text-emerald-300' : 'text-amber-300'}>final {dom.keyakinanFinal}%</span>
                </div>
                {dom.aktifDomino && (
                  <div className="mt-2 text-[11px] text-neutral-400">
                    saat slot dikunci: neuron {dom.aktifDomino.versi} bilang <Badge tone={aksiTone(dom.aktifDomino.aksiKonteks)}>{dom.aktifDomino.aksiKonteks}</Badge> sikap {dom.aktifDomino.sikap} → tindakan <b>{dom.aktifDomino.tindakan}</b>
                    {dom.aktifDomino.poinPenalti > 0 ? ` (−${dom.aktifDomino.poinPenalti} poin saat kunci)` : ''}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className={`rounded-lg border p-3 text-[12px] ${dom.konsultasi.ada ? 'border-violet-400/30 bg-violet-500/5' : 'border-white/10 bg-black/30'}`}>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500">vonis neuron konteks</span>
                  {dom.konsultasi.ada ? <Badge tone={aksiTone(dom.konsultasi.aksi)}>{dom.konsultasi.aksi}{dom.konsultasi.targetPct ? ` ${dom.konsultasi.targetPct}%/${dom.konsultasi.stopPct}%` : ''}</Badge> : <Badge tone="netral">tanpa bukti</Badge>}
                </div>
                <p className="text-neutral-300">{dom.konsultasi.asal}</p>
              </div>
              {dom.neuron && (
                <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-[12px]">
                  <div className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">knob hidup (dihitung dari validasi nyata, bukan karangan)</div>
                  <ul className="space-y-1 text-[11px] text-neutral-300">
                    <li>· bobot konteks: {dom.neuron.knob.bobotKonteks}</li>
                    <li>· penalti konflik maksimal: {dom.neuron.knob.penaltiKonflikMaks} poin</li>
                    <li>· adopsi rencana terbukti: {dom.neuron.knob.adopsiRencana ? 'AKTIF' : 'MATI'}</li>
                  </ul>
                  <p className="mt-1 text-[10px] leading-snug text-neutral-500">{dom.neuron.knob.dasar}</p>
                </div>
              )}
            </div>
          </div>
        </Kartu>
      )}

      <Kartu>
        <JudulKecil warna="text-cyan-300">neuron konteks — pengalaman ujian yang kini dipakai hidup (terbanyak bukti)</JudulKecil>
        {up?.neuronSampel.length ? (
          <div className="max-h-[340px] overflow-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[720px] text-left text-[11.5px]">
              <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
                <tr><th className="px-2 py-1.5">konteks</th><th>versi</th><th>vonis neuron</th><th>kasus</th><th>bukti net</th><th>t / s terbukti</th><th>contoh hari asal</th></tr>
              </thead>
              <tbody className="font-mono">
                {up.neuronSampel.map((n) => (
                  <tr key={n.kunci} className="border-t border-white/5">
                    <td className="max-w-[280px] truncate px-2 py-1 text-neutral-400" title={n.kunci}>{n.kunci}</td>
                    <td className="text-neutral-500">{n.kunci.split('|')[0]}</td>
                    <td className={n.aksi === 'BUY' ? 'text-emerald-300' : n.aksi === 'SELL' ? 'text-rose-300' : 'text-amber-300'}>{n.aksi}</td>
                    <td className="text-neutral-300">{n.n}</td>
                    <td className={n.net >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{pct(n.net, 1)}</td>
                    <td className="text-neutral-400">{n.targetPct !== null ? `${n.targetPct}% / ${n.stopPct}%` : '—'}</td>
                    <td className="text-neutral-500">{n.contohHari}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="text-sm text-neutral-400">Neuron belum dibangun — denyut jantung berikutnya membangunnya sendiri: pelajaran ujian difus, divalidasi 100-soal tanpa buku kasus, lalu diterbitkan jadi knob hidup. Tanpa tombol, tanpa menunggu manusia.</p>}
        <p className="mt-2 text-[11px] text-neutral-400">Tiap baris = pengalaman lintas-hari hasil penempaan ujian ELSA 100: saat keputusan hidup berada di konteks yang sama, baris ini menyerang (konflik → penalti) atau membela (searah → bertahan + adopsi target/stop terbukti) vonis otak.</p>
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-emerald-300">umpan balik hidup — hasil nyata yang mengadili rantai kembali</JudulKecil>
        {up?.umpanBalik.length ? (
          <ul className="space-y-1.5 text-[12px]">
            {up.umpanBalik.map((e, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-black/30 p-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={e.hasil === 'MENANG' ? 'hijau' : e.hasil === 'KALAH' ? 'merah' : 'netral'}>{e.hasil} {pct(e.netPct)}</Badge>
                  <Badge tone={sikapTone(e.sikapSaatKunci)}>neuron saat kunci: {e.sikapSaatKunci}</Badge>
                  <span className="font-mono text-[11px] text-neutral-500">{e.hari} · {e.arah} · {e.versi} ({e.nKasus} kasus, bukti net {pct(e.netBukti, 1)})</span>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-neutral-400">{e.cerita}</p>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-neutral-400">Belum ada slot yang ditutup sejak neuron hidup — begitu TP/SL/kedaluwarsa terjadi, sikap neuron saat kunci dicatat bersama hasil nyata di sini (bukti domino, bukan klaim).</p>}
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-violet-300">log upgrade (nyata — tiap entri = perubahan perilaku otak dengan angka)</JudulKecil>
        <ul className="space-y-1 text-[12px] text-neutral-300">
          {(d.genome.logs ?? []).map((l, i) => <li key={i} className="rounded-lg border border-white/10 bg-black/30 p-2"><span className="text-[10px] text-neutral-500">{new Date(l.at).toLocaleString('id-ID')}</span><br />{l.text}</li>)}
        </ul>
      </Kartu>

      <Kartu>
        <JudulKecil>adaptasi satu koin (organ V-ELSA)</JudulKecil>
        <ul className="space-y-1 text-[12px] text-neutral-300">
          {(d.genome.v2 ?? []).map((a, i) => <li key={i}>· {a}</li>)}
        </ul>
      </Kartu>
      {d.ujian && (
        <Kartu>
          <JudulKecil>gerbang promosi (hasil terkini)</JudulKecil>
          <ul className="space-y-1 text-[12px]">
            {d.ujian.gates.map((g) => (
              <li key={g.id} className={g.pass ? 'text-emerald-300' : 'text-rose-300'}>{g.pass ? 'LOLOS' : 'GAGAL'} — {g.label}: {g.detail}</li>
            ))}
          </ul>
        </Kartu>
      )}
    </div>
  );
}

function TabUjianElsa({ u, onUlang, berjalan, otonomi, denyut }: { u: UjianElsaData; onUlang: () => void; berjalan: boolean; otonomi: OtonomiData | null; denyut: DenyutData | null }) {
  const [hanyaGagal, setHanyaGagal] = useState(false);
  const [buka, setBuka] = useState<number[]>([]); // ruh soal yang dibuka (soul per-soal)
  const autoRef = useRef(false); // hukum pemilik: TANPA MENUNGGU — kalau belum tuntas, langsung diujikan sendiri
  const total = u.hasil.length; // daftar TUMBUH — 100 dasar → 101 → 102 → … tiap candle tutup
  const toggleBuka = (id: number) => setBuka((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));
  const statusTone = u.status === 'LULUS_SEMPURNA' ? 'hijau' : u.status === 'MASIH_DITEMPA' ? 'amber' : 'netral';
  const statusTeks = u.status === 'LULUS_SEMPURNA'
    ? `TUNTAS ${u.metrik.lulus}/${total} — NOL KESALAHAN (ronde ${u.metrik.rondeSampaiNol || u.rondeTerakhir})`
    : u.status === 'MASIH_DITEMPA' ? `MASIH DITEMPA — ${u.metrik.gagal} gagal, dilanjutkan otomatis…` : 'BELUM DIUJIKAN — mengujikan sekarang…';
  const baris = hanyaGagal ? u.hasil.filter((h) => h.status === 'GAGAL') : u.hasil;
  const baseline = u.ronde[0];
  const ujianUlang = async () => {
    // BUKAN TOMBOL — fungsi ini hanya dijalankan otomatis: oleh efek-lanjut
    // di bawah (status MASIH_DITEMPA) dan oleh jantung denyut via POST
    // fire-and-forget (API merespons seketika; hasil nyata tampil di buku
    // otonomi + daftar sesi pada GET berikutnya — tanpa gantung, tanpa mati diam)
    try {
      await fetch('/api/elsa', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action: 'runUjianElsa' }) });
      onUlang();
    } catch { /* denyut berikutnya mencoba lagi */ }
  };
  // HUKUM PEMILIK (v3): "Malah nunggu dan apa-apaan — 11/100 itu berarti gak cerdas.
  // Harus langsung diujikan." Kalau status bukan TUNTAS, ujian DILANJUTKAN otomatis
  // tanpa tombol, tanpa menunggu — per 100 terus diulang sampai nol kesalahan.
  useEffect(() => {
    if (u.status !== 'LULUS_SEMPURNA' && !autoRef.current && !berjalan) {
      autoRef.current = true;
      ujianUlang();
    }
    if (u.status === 'LULUS_SEMPURNA') autoRef.current = false;
  }, [u.status, berjalan]);
  return (
    <div className="space-y-4">
      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">ujian ELSA — {total} soal (tumbuh setiap hari) — dari kemunculan (listing {u.rentang.awal}) hingga kini</JudulKecil>
          <Badge tone={statusTone}>{statusTeks}</Badge>
          {u.tumbuh && u.tumbuh.soalBaru > 0 && <Badge tone="ungu">+{u.tumbuh.soalBaru} soal baru sesi ini</Badge>}
          {u.tumbuhMenunggu && u.tumbuhMenunggu.soalAkanTumbuh > 0 && <Badge tone="amber">{u.tumbuhMenunggu.soalAkanTumbuh} soal baru sedang ditempa…</Badge>}
          <Badge tone="ungu">OTONOMI — tanpa tombol, jantung memperdengarkan sendiri</Badge>
          {(() => {
            const nyala = otonomi?.ringkas.ujianTerakhir ?? null;
            return nyala ? <span className="text-[11px] text-neutral-400">nyala mandiri terakhir: {nyala.hasil} · {new Date(nyala.at).toLocaleString('id-ID')}</span> : null;
          })()}
        </div>
        <p className="mb-3 text-sm text-neutral-300">
          Ujian dibangun dari hari-hari <b>riwayat nyata</b> ELSA ({u.rentang.nCandle} candle harian sejak listing {u.rentang.awal} hingga {u.rentang.akhir}). Tiap soal: otak hanya boleh melihat data ≤ hari soal, lalu memvonis & menjahit rencana. TP/SL-nya <b>dihakimi candle nyata sesudahnya</b> (horizon {u.konfig.horizon} hari); LULUS hanya jika net &gt; 0 after-fee {u.konfig.feePct}%. Kalau satu saja gagal → pengalaman ditempa → <b>ujian diulang TANPA BERHENTI sampai nol kesalahan</b>. Dan hukum tumbuhnya: <b>setiap candle harian yang tutup = satu soal baru</b> — daftar ini terus bertambah (100 dasar → kini {total} soal) karena ujian <b>sedang berlangsung</b>, tidak pernah tamat selagi pasar tidak pernah tamat.
        </p>
        <div className="grid gap-3 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-2xl font-black ${u.metrik.gagal === 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{u.metrik.lulus}/{total}</div><div className="text-[11px] text-neutral-400">lulus teruji ({u.metrik.gagal} gagal)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-amber-300">{u.metrik.rondeSampaiNol ? `ronde ${u.metrik.rondeSampaiNol}` : `${u.rondeTerakhir} ronde`}</div><div className="text-[11px] text-neutral-400">{u.metrik.rondeSampaiNol ? 'nol kesalahan tercapai' : 'ronde dijalankan — lanjut otomatis'}</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-violet-300">{u.metrik.pelajaranJumlah}</div><div className="text-[11px] text-neutral-400">pengalaman ditempa (kasus riwayat + konteks lintas-hari)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-2xl font-black ${u.metrik.netKumulatif >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{pct(u.metrik.netKumulatif, 1)}</div><div className="text-[11px] text-neutral-400">net ujian after-fee (retrospektif — bukan proyeksi)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-cyan-300">{u.metrik.lulusTanpaKasus}/{total}</div><div className="text-[11px] text-neutral-400">lulus TANPA buku kasus — murni otak + pengalaman konteks (kecerdasan untuk hari yang belum terlihat)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-2xl font-black text-neutral-200">{baseline ? baseline.lulus : '—'}</div><div className="text-[11px] text-neutral-400">baseline otak mentah (ronde pertama tanpa pengalaman)</div></div>
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">
          PENYALA UJIAN INI = <b>JANTUNG DENYUT</b>, bukan tombol: berlaga sendiri tiap candle harian tutup, tiap 30 menit (jadwal drill), dan sesudah tiap denyut penuh — bukti nyala bertanggal terpampang di <b>papan otonomi</b> di bawah. Panel yang meminta diklik adalah panel yang mati; ujian ini menolak jadi panel mati.
        </p>
      </Kartu>

      <PapanOtonomi otonomi={otonomi} denyut={denyut} />

      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-violet-300">pertumbuhan ujian — setiap hari bertambah (ujian sedang berlangsung)</JudulKecil>
          <Badge tone="ungu">{total} soal kini</Badge>
          <Badge tone="netral">dasar 100 (seed tetap) + 1 soal per candle tutup</Badge>
          {u.metrik.horizonMatang !== undefined && <Badge tone={u.metrik.horizonMatang === total ? 'hijau' : 'amber'}>{u.metrik.horizonMatang} matang (horizon 5 candle penuh)</Badge>}
        </div>
        <p className="mb-3 text-sm text-neutral-300">
          Ujian ini <b>tidak pernah tamat</b> — justru itu ruhnya. Begitu candle harian baru tutup dan masuk memori, hari itu langsung menjadi <b>soal baru</b> (id lanjut, tanpa mengubah soal lama): dijawab dari pengalaman konteks, dihakimi candle nyata, dan bila gagal menempa pelajaran baru sebelum diulang. Soal muda yang horizon 5 candle-nya belum penuh tetap dihakimi apa adanya dan <b>mematang sendiri</b> di ronde berikutnya — tiap candle baru, penghakimannya diadili ulang. Besok daftar ini bertambah lagi: tanpa perintah, tanpa menunggu, tanpa nunggu panel dibuka.
        </p>
        {(u.tumbuh?.riwayat?.length ?? 0) > 0 ? (
          <div className="max-h-[220px] overflow-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[460px] text-left text-[11.5px]">
              <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
                <tr><th className="px-2 py-1.5">hari jadi soal</th><th>saat ditambahkan</th><th>total soal saat itu</th><th>memori (candle)</th></tr>
              </thead>
              <tbody className="font-mono">
                {[...(u.tumbuh?.riwayat ?? [])].reverse().map((t, i) => (
                  <tr key={`${t.hari}-${i}`} className="border-t border-white/5">
                    <td className="px-2 py-1 text-neutral-300">{t.hari}</td>
                    <td className="text-neutral-500">{new Date(t.at).toLocaleString('id-ID')}</td>
                    <td className="text-violet-300">{t.nSoal}</td>
                    <td className="text-neutral-400">{t.nCandle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[12px] text-neutral-400">Log pertumbuhan kosong — soal baru lahir otomatis begitu ada candle harian yang tutup dan masuk memori (jantung memantau pasar tiap 60 detik, ujian berlaga saat itu juga).</p>
        )}
      </Kartu>

      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-fuchsia-300">neuron formula — sinaps hidup yang terus berkembang (pasar terus dipelajari)</JudulKecil>
          <Badge tone="ungu">formula v{u.neuron?.formulaVersi ?? 1}</Badge>
          <Badge tone="netral">{u.neuron?.sinapsAktif ?? 0} sinaps menembak dari {u.neuron?.sinapsJumlah ?? 0} jalur</Badge>
          <Badge tone="netral">{u.neuron?.tembakTotal ?? 0} tembakan · {u.neuron?.lulusTotal ?? 0} LULUS dihakimi medan</Badge>
        </div>
        <p className="mb-3 text-sm text-neutral-300">
          Ini yang membuat ujian {total} soal <b>neuron yang hidup</b>, bukan piagam: tiap jawaban yang lahir dari pengalaman (kasus/konteks) adalah <b>tembakan sinaps</b> — lalu medan mengadilinya dengan candle nyata. <b>LULUS memperkuat sinaps, GAGAL melemahkannya</b> (Hebbian: bersama-sama menyala = menguat). Bobot sinaps langsung dipakai agregasi pelajaran <b>di ujian dan di keputusan hidup</b> — satu standar — jadi <b>formula yang menjawab hari ini bukan lagi formula minggu lalu</b>. Versi formula naik hanya saat bobot benar-benar berubah, dan tiap kenaikan tercatat dengan sebab nyatanya: itu bukti formula benar-benar berkembang setiap pasar dipelajari, bukan klaim.
        </p>
        {(u.neuron?.sinapsDaftar?.length ?? 0) > 0 && u.neuron ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-widest text-neutral-500">papan sinaps — kekuatan tiap jalur pengalaman (tier × arah)</div>
              <div className="max-h-[240px] overflow-auto rounded-lg border border-white/10">
                <table className="w-full min-w-[420px] text-left text-[11.5px]">
                  <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
                    <tr><th className="px-2 py-1.5">sinaps</th><th>tembakan</th><th>L/G</th><th>tingkat lulus</th><th>net</th><th>bobot</th></tr>
                  </thead>
                  <tbody className="font-mono">
                    {u.neuron.sinapsDaftar.map((s) => {
                      const rate = s.nTembak ? (s.nLulus / s.nTembak) * 100 : 0;
                      return (
                        <tr key={s.kunci} className="border-t border-white/5">
                          <td className="px-2 py-1 text-neutral-300">{s.kunci}</td>
                          <td className="text-neutral-400">{s.nTembak}</td>
                          <td className="text-neutral-400">{s.nLulus}/{s.nGagal}</td>
                          <td className={rate >= 60 ? 'text-emerald-300' : rate >= 40 ? 'text-amber-300' : 'text-rose-300'}>{rate.toFixed(0)}%</td>
                          <td className={s.netTotal >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{pct(s.netTotal, 1)}</td>
                          <td className={s.bobot > 1 ? 'text-emerald-300' : s.bobot < 1 ? 'text-rose-300' : 'text-neutral-400'}>×{s.bobot}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-1 text-[10px] leading-snug text-neutral-500">bobot = 1 + (0.4 + 1.6×tingkat lulus − 1) × min(1, tembakan/5) — sampel kecil menyusut ke netral; tanpa rekam jejak = ×1. Sinaps v4 = buku kasus (hanya drill ujian); sinaps v0–v3 ikut menguat/melemahkan keputusan HIDUP juga.</p>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-widest text-neutral-500">log evolusi formula — tiap perubahan punya sebab nyata</div>
              <div className="max-h-[240px] space-y-1.5 overflow-auto">
                {u.neuron.evolusiTerakhir.map((e, i) => (
                  <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2 text-[11.5px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={e.perubahan.length ? 'ungu' : 'netral'}>formula v{e.formulaVersi}</Badge>
                      <span className="font-mono text-[10px] text-neutral-500">{e.pemicu} · {new Date(e.at).toLocaleString('id-ID')}</span>
                      <span className="text-[10px] text-neutral-500">{e.tembakBaru} tembakan ({e.lulusBaru}L/{e.gagalBaru}G)</span>
                    </div>
                    <p className="mt-1 leading-snug text-neutral-400">{e.sebab}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[12px] text-neutral-400">Sinaps belum pernah menembak — denyut jantung berikutnya (tiap 30 menit / candle baru tutup) akan melahirkan tembakan pertama, tanpa tombol dan tanpa menunggu panel dibuka; bobot mulai berkembang dari hasil dihakimi medan, dan versi formula mulai mencatat perjalanannya.</p>
        )}
      </Kartu>

      <div className="grid gap-4 lg:grid-cols-2">
        <Kartu>
          <JudulKecil warna="text-cyan-300">riwayat ronde — ujian → tempa → ulang</JudulKecil>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[12px]">
              <thead className="text-neutral-400"><tr><th className="py-1">ronde</th><th>lulus</th><th>gagal</th><th>pelajaran baru</th><th>net kum</th></tr></thead>
              <tbody className="font-mono">
                {u.ronde.map((r) => (
                  <tr key={r.ronde} className="border-t border-white/5">
                    <td className="py-1 text-neutral-400">{r.ronde}</td>
                    <td className={r.gagal === 0 ? 'text-emerald-300' : 'text-neutral-300'}>{r.lulus}</td>
                    <td className={r.gagal > 0 ? 'text-rose-300' : 'text-neutral-500'}>{r.gagal}</td>
                    <td className="text-violet-300">{r.pelajaranBaru}</td>
                    <td className={r.netKumulatif >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{pct(r.netKumulatif, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">Ronde 1 = kejujuran otak mentah di medannya sendiri (tanpa pengalaman). Tiap gagal menempa dua tier sekaligus: BUKU KASUS RIWAYAT (studi hari soal itu sendiri — sejarah adalah fakta, sah untuk drill penguasaan riwayat) + KONTEKS LINTAS-HARI (sidik-jari v0 iklim → v3 halus dari hari lain — kecerdasan untuk hari yang belum terlihat). Lalu diuji ulang — TANPA BERHENTI — sampai nol kesalahan, persis perintah pemilik: per 100 terus dilakukan untuk tanamkan kepahaman.</p>
        </Kartu>
        <Kartu>
          <JudulKecil warna="text-cyan-300">distribusi keputusan & hasil penghakiman</JudulKecil>
          <div className="mb-3">
            <div className="mb-1 text-[11px] uppercase tracking-widest text-neutral-500">sumber keputusan</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(u.metrik.sumberDistribusi).map(([k, v]) => (
                <Badge key={k} tone={k === 'OTAK' ? 'hijau' : k === 'PELAJARAN' ? 'ungu' : k === 'KASUS' ? 'amber' : 'netral'}>{k}: {v}</Badge>
              ))}
            </div>
            <p className="mt-1 text-[10px] leading-snug text-neutral-500">KASUS = buku latihan riwayat (hanya untuk soal ujian — tidak pernah menyentuh keputusan hidup) · OTAK = vonis murni otak mentah · PELAJARAN = pengalaman konteks hari lain · GUARD = rem likuiditas/ATR</p>
          </div>
          <div className="mb-3">
            <div className="mb-1 text-[11px] uppercase tracking-widest text-neutral-500">hasil simulasi TP/SL candle nyata</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(u.metrik.viaDistribusi).map(([k, v]) => (
                <Badge key={k} tone={k === 'SASARAN' ? 'hijau' : k === 'STOP' ? 'merah' : k === 'KEDALUWARSA' ? 'amber' : 'netral'}>{k}: {v}</Badge>
              ))}
            </div>
          </div>
          <ul className="space-y-1 text-[11px] text-neutral-400">
            {u.jujur.map((s, i) => <li key={i}>· {s}</li>)}
          </ul>
        </Kartu>
      </div>

      <Kartu>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">daftar {total} soal — KUMPLIT, TUMBUH TIAP HARI — keputusan vs penghakiman medan</JudulKecil>
          <button onClick={() => setHanyaGagal(!hanyaGagal)} className={`rounded-md border px-2 py-0.5 text-[11px] ${hanyaGagal ? 'border-rose-400/50 bg-rose-500/10 text-rose-300' : 'border-white/15 text-neutral-300 hover:bg-white/5'}`}>
            {hanyaGagal ? 'menampilkan gagal saja' : 'tampilkan gagal saja'}
          </button>
          <span className="ml-auto text-[11px] text-neutral-500">arah badge = keputusan yang dilaksanakan · sel otak = vonis dasar otak sebelum pelajaran · <b className="text-amber-300/90">tekan baris untuk membuka ruh soal</b></span>
        </div>
        <div className="max-h-[560px] overflow-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[860px] text-left text-[11.5px]">
            <thead className="sticky top-0 bg-neutral-900/95 text-neutral-300">
              <tr><th className="px-2 py-1.5">#</th><th>hari</th><th>harga</th><th>otak dasar</th><th>keputusan</th><th>t / s</th><th>penghakiman</th><th>net</th><th>bertahan</th><th>status</th></tr>
            </thead>
            <tbody className="font-mono">
              {baris.map((h) => (
                <React.Fragment key={h.id}>
                  <tr className={`border-t border-white/5 cursor-pointer ${buka.includes(h.id) ? 'bg-white/5' : 'hover:bg-white/5'}`} onClick={() => toggleBuka(h.id)}>
                    <td className="px-2 py-1 text-neutral-500">{h.id}</td>
                    <td className="text-neutral-400">{h.hari}</td>
                    <td className="text-neutral-300">{fmtHarga(h.harga)}</td>
                    <td title={h.otakLapisan} className="text-neutral-500">{h.otakVonis} {h.otakKepastian}% <span className="text-neutral-600">{h.otakRezim}</span></td>
                    <td>
                      <span className={h.keputusan === 'BUY' ? 'text-emerald-300' : h.keputusan === 'SELL' ? 'text-rose-300' : 'text-amber-300'}>{h.keputusan}</span>
                      <span className={`ml-1 text-[10px] ${h.sumber === 'PELAJARAN' ? 'text-violet-300' : h.sumber === 'KASUS' ? 'text-amber-300' : h.sumber === 'OTAK' ? 'text-emerald-400/70' : 'text-neutral-400/70'}`}>{h.sumber}</span>
                    </td>
                    <td className="text-neutral-400">{h.keputusan === 'TOLAK' ? '—' : `${h.targetPct}% / ${h.stopPct}%`}</td>
                    <td title={h.via} className={h.hasilSim === 'SASARAN' ? 'text-emerald-300' : h.hasilSim === 'STOP' ? 'text-rose-300' : 'text-neutral-400'}>
                      {h.hasilSim === 'SASARAN' ? 'TP dulu' : h.hasilSim === 'STOP' ? 'SL kena' : h.hasilSim === 'KEDALUWARSA' ? 'kedaluwarsa' : 'tidak melakukan'}
                      <span className="ml-1 text-neutral-600">({h.hariKeluar ?? '—'})</span>
                    </td>
                    <td className={h.netPct > 0 ? 'text-emerald-300' : h.netPct < 0 ? 'text-rose-300' : 'text-neutral-400'}>{pct(h.netPct)}</td>
                    <td className="text-neutral-500">{h.bertahan}h</td>
                    <td className={h.status === 'LULUS' ? 'text-emerald-400' : 'text-rose-400'}>{h.status}</td>
                  </tr>
                  {buka.includes(h.id) && (
                    <tr className="border-t border-white/5 bg-black/40">
                      <td colSpan={10} className="px-3 py-2.5">
                        <div className="space-y-1.5 text-[11.5px] leading-relaxed text-neutral-300 font-sans">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300/90">ruh soal #{h.id} · {h.hari}</span>
                            <Badge tone={h.sumber === 'OTAK' ? 'hijau' : h.sumber === 'PELAJARAN' ? 'ungu' : h.sumber === 'KASUS' ? 'amber' : 'netral'}>asal keputusan: {h.sumber}</Badge>
                            <Badge tone={h.horizonPenuh !== false ? 'hijau' : 'amber'}>{h.horizonPenuh !== false ? 'horizon 5 candle penuh — soal matang' : 'horizon masih matang — dihakimi ulang tiap candle baru'}</Badge>
                            <Badge tone={h.status === 'LULUS' ? 'hijau' : 'merah'}>{h.status}</Badge>
                          </div>
                          <p><span className="text-neutral-500">otak dasar:</span> {h.otakVonis} {h.otakKepastian}% · lapisan {h.otakLapisan} · rezim {h.otakRezim} → <span className="text-neutral-500">keputusan:</span> <b className={h.keputusan === 'BUY' ? 'text-emerald-300' : h.keputusan === 'SELL' ? 'text-rose-300' : 'text-amber-300'}>{h.keputusan}</b>{h.keputusan !== 'TOLAK' ? <> @ {fmtHarga(h.entry)} — target {h.targetPct}% / stop {h.stopPct}%</> : ''}</p>
                          <p><span className="text-neutral-500">penghakiman medan:</span> {h.via} · keluar {h.hariKeluar ?? '—'} ({h.bertahan} candle) · net <b className={h.netPct > 0 ? 'text-emerald-300' : h.netPct < 0 ? 'text-rose-300' : 'text-neutral-400'}>{pct(h.netPct)}</b> after-fee</p>
                          {h.catatan && <p className="text-neutral-400">{h.catatan}</p>}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">
          "SL kena / TP gak kena" (tragedi yang dilaporkan pemilik) dihakimi apa adanya di sini: sasaran+stop tersentuh lilin yang sama dihitung KALAH konservatif.
          Menolak (TOLAK) dihakimi juga: menolak LULUS hanya jika terbukti tak ada rencana searah/berlawanan yang untung; menolak padahal ada jalan untung = GAGAL.
          Dan daftar ini BERTAMBAH SETIAP HARI: begitu candle harian tutup, hari itu menjadi soal baru di baris terbawah — tekan barisnya untuk membuka ruh soal.
        </p>
      </Kartu>

      <Kartu>
        <JudulKecil warna="text-violet-300">pelajaran terakhir yang ditempa ({u.pelajaranSampel.length} dari {u.metrik.pelajaranJumlah})</JudulKecil>
        <div className="grid gap-2 md:grid-cols-2">
          {u.pelajaranSampel.map((p) => (
            <div key={p.id} className="rounded-lg border border-white/10 bg-black/30 p-2 text-[12px]">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={p.aksi === 'BUY' ? 'hijau' : p.aksi === 'SELL' ? 'merah' : 'amber'}>{p.aksi}{p.targetPct ? ` ${p.targetPct}%/${p.stopPct}%` : ''}</Badge>
                <span className="font-mono text-[11px] text-neutral-500">{p.hariAsal} · sidik v{p.fpVersi}</span>
                <span className="text-[11px] text-neutral-500">otak {p.otakVonisAsal} → {p.simAsal} {pct(p.netAsal)} · perbaikan {pct(p.netPerbaikan)}</span>
              </div>
              <p className="mt-1 text-[11px] leading-snug text-neutral-400">{p.alasan}</p>
            </div>
          ))}
        </div>
      </Kartu>
    </div>
  );
}

// ============================================================
// OTAK PAHAM — papan neuron pemahaman koin ELSA (keluhan pemilik
// 2026-11-26: "tab aliran & ujian 500 dan ujian mandiri masih tak
// miliki neuron — seakan amigdala yang gak aktif; dia tidak
// benar-benar pahami pasar koin yang ditentukan, harusnya kuasai;
// bisa jadi tumor kalau tidak diarahkan ke koin yang dituju").
// Papan ini menampilkan NYATA: rekam jejak vonis yang diadili
// candle+likuidasi ELSA, kepahaman per regime medan yang ditambang
// tiap denyut, profil medan koin yang diukur dari data ELSA sendiri,
// dan pelajaran hidup yang mengalir balik ke keyakinan.
// ============================================================
function PapanPaham({ p, tab }: { p: PahamData | null; tab: 'aliran' | 'ujian' }) {
  if (!p) {
    return (
      <Kartu>
        <JudulKecil warna="text-lime-300">otak paham ELSA — neuron pemahaman koin</JudulKecil>
        <p className="text-sm text-neutral-400">neuron paham belum terbaca pada payload ini — denyut jantung berikutnya menghidupkannya sendiri (tanpa tombol, tanpa menunggu halaman dibuka).</p>
      </Kartu>
    );
  }
  const r = p.rekam;
  const ph = p.profil.harian;
  const pj = p.profil.jam;
  const arahTone = (h: string | null): 'hijau' | 'merah' | 'netral' => h === 'BENAR' ? 'hijau' : h === 'SALAH' ? 'merah' : 'netral';
  return (
    <Kartu className="border-lime-400/30">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <JudulKecil warna="text-lime-300">otak paham ELSA — neuron pemahaman koin (amigdala yang menyala)</JudulKecil>
        <Badge tone="hijau">denyut ke-{p.denyutKe}</Badge>
        <Badge tone="netral">{r.nVonis} vonis dicatat</Badge>
        <Badge tone={r.diadili > 0 ? 'ungu' : 'netral'}>{r.diadili} diadili candle+likuidasi nyata</Badge>
        {r.benarArah !== null && <Badge tone={r.benarArah >= 0.55 ? 'hijau' : r.benarArah >= 0.45 ? 'amber' : 'merah'}>arah benar {(r.benarArah * 100).toFixed(0)}%</Badge>}
        {r.benarKorban !== null && <Badge tone={r.benarKorban >= 0.55 ? 'hijau' : r.benarKorban >= 0.45 ? 'amber' : 'merah'}>korban benar {(r.benarKorban * 100).toFixed(0)}% (n={r.benarKorbanN})</Badge>}
        <Badge tone="netral">{p.regime.length} regime medan dipetakan</Badge>
        <Badge tone="amber">{p.pelajaran.length} pelajaran hidup</Badge>
      </div>
      <p className="mb-2 text-[12px] leading-snug text-neutral-300">
        {tab === 'aliran'
          ? <>Tab ini dulu cuma model statis warisan koin lama (EVAA · PIEVERSE · AGT) — tiap vonis dihitung lalu <b>dibuang tanpa dicek candle nyata</b>: amigdala mati, koin yang dituju tak pernah dikuasai, dan itu <b>tumor</b> bagi sistem. Kini neuron paham mencatat setiap vonis, mengadilinya 6 jam kemudian dengan candle + likuidasi NYATA ELSA, dan rekam jejaknya <b>mengoreksi keyakinan vonis berikutnya</b> — pengalaman koin ini sendiri yang bicara, bukan warisan koin lama.</>
          : <>Ujian mandiri dulu hanya mengadili hari dan mencatatnya — <b>tidak ada kepahaman yang tertambang</b>, jadi ia punya ingatan tapi tak punya neuron. Kini setiap denyut jantung menambang seluruh hari yang diadili menjadi <b>kepahaman per regime medan ELSA</b> (momentum × volatilitas, diukur dari candle ELSA sendiri) + profil medan koin + pelajaran yang tampil di sini dan mengalir balik ke keyakinan aliran.</>}
      </p>
      <ul className="mb-3 space-y-1 text-[11.5px] text-neutral-400">
        {p.catatan.map((s, i) => <li key={i}>· {s}</li>)}
      </ul>

      {/* rekam jejak inti */}
      <div className="grid gap-2 text-center sm:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black text-lime-300">{r.diadili}/{r.nVonis}</div><div className="text-[11px] text-neutral-400">vonis diadili / dicatat — tidak ada vonis dibuang</div></div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-xl font-black ${r.benarArah === null ? 'text-neutral-500' : r.benarArah >= 0.55 ? 'text-emerald-300' : 'text-amber-300'}`}>{r.benarArah === null ? '—' : `${(r.benarArah * 100).toFixed(0)}%`}</div><div className="text-[11px] text-neutral-400">arah 6 jam benar (diadili candle nyata ELSA)</div></div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-xl font-black ${r.benarKorban === null ? 'text-neutral-500' : r.benarKorban >= 0.55 ? 'text-emerald-300' : 'text-amber-300'}`}>{r.benarKorban === null ? '—' : `${(r.benarKorban * 100).toFixed(0)}%`}</div><div className="text-[11px] text-neutral-400">sisi korban benar (diadili likuidasi nyata, n={r.benarKorbanN})</div></div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black text-violet-300">{p.regime.length}</div><div className="text-[11px] text-neutral-400">regime medan ELSA dipetakan dari hari diadili</div></div>
      </div>

      {/* profil medan — pengukuran koin yang dituju */}
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500">profil medan ELSA — harian (diukur, bukan klaim)</div>
          {ph.at ? (
            <ul className="mt-1 space-y-0.5 text-[12px] text-neutral-300">
              <li>· {ph.nHari} hari memori tumbuh — median geseran harian <b>{ph.medianPct?.toFixed(1)}%</b>, p90 <b>{ph.p90Pct?.toFixed(1)}%</b></li>
              <li>· hari naik <b>{ph.naikPct?.toFixed(0)}%</b> vs hari turun <b>{ph.turunPct?.toFixed(0)}%</b> — dua pedang selalu bergarap, tidak ada hari yang diam selamanya</li>
              <li>· hari terburuk <b className="text-rose-300">{ph.terburuk?.hari} ({ph.terburuk?.pct}%)</b> · hari terbaik <b className="text-emerald-300">{ph.terbaik?.hari} ({ph.terbaik?.pct}%)</b></li>
              <li className="text-[10.5px] text-neutral-500">{ph.metode}</li>
            </ul>
          ) : <p className="mt-1 text-[12px] text-neutral-500">belum diukur — denyut jantung berikutnya mengukur dari candle ELSA sendiri</p>}
        </div>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <div className="text-[10px] uppercase tracking-widest text-neutral-500">profil medan ELSA — jam kontrak (Gate.io, diukur)</div>
          {pj.at ? (
            <ul className="mt-1 space-y-0.5 text-[12px] text-neutral-300">
              <li>· {pj.nJam} jam tutup terakhir — jam naik <b>{pj.jamNaikPct?.toFixed(0)}%</b></li>
              <li>· funding median <b>{pj.fundingMedian !== null ? `${(pj.fundingMedian * 100).toFixed(4)}%` : '—'}</b> · jam funding negatif <b>{pj.fundingNegatifPct?.toFixed(0)}%</b> (bensin squeeze)</li>
              <li>· likuidasi 24j terakhir: long <b className="text-rose-300">${pj.liq24jLongUsd?.toLocaleString('id-ID')}</b> vs short <b className="text-emerald-300">${pj.liq24jShortUsd?.toLocaleString('id-ID')}</b></li>
              <li className="text-[10.5px] text-neutral-500">{pj.metode}</li>
            </ul>
          ) : <p className="mt-1 text-[12px] text-neutral-500">belum diukur — bernapasnya otak aliran (tiap denyut 30 menit) akan mengukurnya</p>}
        </div>
      </div>

      {/* rekam jejak vonis terakhir */}
      {r.terakhir.length > 0 ? (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-[12px]">
            <thead className="text-neutral-400"><tr><th className="py-1">waktu vonis</th><th>arah</th><th>korban</th><th>alarm</th><th>harga</th><th>regime medan</th><th>adil arah</th><th>adil korban</th><th>net 6j</th></tr></thead>
            <tbody>
              {r.terakhir.map((v, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="py-1 text-neutral-400">{new Date(v.at).toLocaleString('id-ID', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className={v.arah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}>{v.arah}</td>
                  <td className={v.korban === 'SHORT' ? 'text-emerald-300' : v.korban === 'LONG' ? 'text-rose-300' : 'text-neutral-500'}>{v.korban ?? '—'}</td>
                  <td className="text-neutral-400">{v.alarmLevel}</td>
                  <td className="text-neutral-300">${fmtHarga(v.harga)}</td>
                  <td className="text-neutral-500">{v.regime}</td>
                  <td><Badge tone={arahTone(v.hasilArah)}>{v.hasilArah ?? 'menunggu medan'}</Badge></td>
                  <td><Badge tone={arahTone(v.hasilKorban === 'BENAR' ? 'BENAR' : v.hasilKorban === 'SALAH' ? 'SALAH' : null)}>{v.hasilKorban ?? 'menunggu'}</Badge></td>
                  <td className={v.net6jPct === null ? 'text-neutral-500' : v.net6jPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{v.net6jPct === null ? '—' : `${v.net6jPct >= 0 ? '+' : ''}${v.net6jPct.toFixed(1)}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-3 text-[12px] text-neutral-500">Belum ada vonis yang diadili — candle + likuidasi nyata mulai menghakimi 6 jam setelah vonis pertama dicatat. Papan ini terisi sendiri tiap denyut, tanpa tombol.</p>
      )}

      {/* kepahaman per regime */}
      {p.regime.length > 0 && (
        <div className="mt-3">
          <JudulKecil warna="text-violet-300">kepahaman per regime medan — di medan mana formula sehat / rapuh di ELSA</JudulKecil>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[12px]">
              <thead className="text-neutral-400"><tr><th className="py-1">regime (momentum sebelumnya × volatilitas)</th><th>n hari diadili</th><th>vonis benar</th><th>net rerata</th><th>bacaan</th></tr></thead>
              <tbody>
                {p.regime.map((g, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="py-1 text-neutral-200">{g.kunci}</td>
                    <td className="text-neutral-400">{g.n}</td>
                    <td className={g.rate >= 0.6 ? 'text-emerald-300' : g.rate >= 0.4 ? 'text-amber-300' : 'text-rose-300'}>{(g.rate * 100).toFixed(0)}%</td>
                    <td className={g.netPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{g.netPct >= 0 ? '+' : ''}{g.netPct.toFixed(1)}%</td>
                    <td className="text-neutral-500">{g.n < 4 ? 'sampel menunggu medan bicara' : g.rate >= 0.67 ? 'tanah sehat — kepastian boleh berdiri tegak' : g.rate <= 0.34 ? 'titik rapuh — keyakinan besar dijaga curiga' : 'medan campuran'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* pelajaran hidup */}
      {p.pelajaran.length > 0 && (
        <div className="mt-3">
          <JudulKecil warna="text-amber-300">pelajaran hidup — kepahaman tertambang yang mengalir balik</JudulKecil>
          <div className="mt-1 space-y-1.5">
            {p.pelajaran.map((l, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2 text-[12px]">
                <span className="text-neutral-200">{l.teks}</span>
                <div className="text-[10.5px] text-neutral-500">{new Date(l.at).toLocaleString('id-ID')} · asal {l.asal} · {l.bukti}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* kalibrasi balik */}
      {r.koreksi && (
        <p className="mt-3 rounded-lg border border-lime-400/30 bg-lime-500/5 p-2 text-[12px] text-lime-200">
          EFEK DOMINO TERUKUR: {r.koreksi.dasar}
        </p>
      )}
    </Kartu>
  );
}

function TabAliran({ a, paham }: { a: AliranData; paham: PahamData | null }) {
  const pL = a.orang.total > 0 ? (a.orang.long / a.orang.total) * 100 : 50;
  const pS = 100 - pL;
  const totTop = a.whaleTop.topLong + a.whaleTop.topShort;
  const pTopL = totTop > 0 ? (a.whaleTop.topLong / totTop) * 100 : 50;
  const liq6 = a.liq6j.longUsd + a.liq6j.shortUsd;
  const liq24 = a.liq6j.liq24j.longUsd + a.liq6j.liq24j.shortUsd;
  const ronde = a.ujian.ronde ?? [];
  const totalSoal = 500 + ronde.length * 500 + (a.ujian.elsaButa.nKor > 0 ? 3504 : 0) + 500;
  return (
    <div className="space-y-4">
      {/* ===== banner vonis kaskade (time traveler) ===== */}
      <Kartu className={a.vonis.alarm ? (a.vonis.korban === 'SHORT' ? 'border-emerald-400/40 bg-emerald-500/5' : 'border-rose-400/40 bg-rose-500/5') : ''}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="ungu">model kaskade · teruji ujian 500-soal</Badge>
          {a.vonis.korban && <Badge tone={a.vonis.alarm ? (VONIS_KORBAN_TONE[a.vonis.korban] ?? 'netral') : 'netral'}>{a.vonis.alarm ? 'korban berikutnya' : 'monitor'}: {a.vonis.korban}</Badge>}
          <Badge tone={a.vonis.alarm ? 'amber' : 'netral'}>alarm {a.vonis.alarmLevel}</Badge>
          <Badge tone={a.vonis.arah === 'NAIK' ? 'hijau' : 'merah'}>bias arah {a.vonis.arah} · p {(a.vonis.pArah * 100).toFixed(1)}%</Badge>
          <span className="ml-auto text-[11px] text-neutral-500">{new Date(a.at).toLocaleTimeString('id-ID')} · harga ${fmtHarga(a.harga)}</span>
        </div>
        <p className="mt-2 text-sm text-neutral-100">
          {a.vonis.korban
            ? <>Sisi <b className={a.vonis.korban === 'SHORT' ? 'text-emerald-300' : 'text-rose-300'}>{a.vonis.korban}</b> berisiko TERLIQUIDASI dalam 6 jam ke depan (skor {a.vonis.skorKorban}). {a.vonis.korban === 'SHORT' ? 'Short yang cair = bensin squeeze naik' : 'Long yang cair = bensin drop turun'} — hukum kasus nyata:</>
            : <>Tanpa sisi yang menonjol — model menolak membaca yang tidak bisa dibaca (di luar episode kaskade, arah 6 jam sebagian besar noise). Skor korban {a.vonis.skorKorban} di bawah ambang alarm.</>}
        </p>
        {a.vonis.hukumRujuk.length > 0 && (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {a.vonis.hukumRujuk.map((h, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2 text-[12px]">
                <span className="font-bold text-amber-300">{(h.rate * 100).toFixed(1)}%</span> <span className="text-neutral-300">{h.nama}</span> <span className="text-neutral-500">(n={h.n} episode nyata 180 hari)</span>
              </div>
            ))}
          </div>
        )}
        <ul className="mt-3 space-y-1 text-[12px] text-neutral-300">
          {a.vonis.alasan.map((s, i) => <li key={i}>· {s}</li>)}
        </ul>
      </Kartu>

      {/* ===== daftar orang + whale (permintaan pemilik: berapa banyak orang long/short) ===== */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Kartu>
          <div className="mb-2 flex items-center gap-2">
            <JudulKecil warna="text-cyan-300">daftar orang pasang posisi — Gate.io (jumlah akun nyata)</JudulKecil>
            <Badge tone="netral">per jam terakhir</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3"><div className="text-xl font-black text-emerald-300">{a.orang.long.toLocaleString('id-ID')}</div><div className="text-[11px] text-neutral-400">orang LONG</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black">{a.orang.total.toLocaleString('id-ID')}</div><div className="text-[11px] text-neutral-400">total akun berposisi</div></div>
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3"><div className="text-xl font-black text-rose-300">{a.orang.short.toLocaleString('id-ID')}</div><div className="text-[11px] text-neutral-400">orang SHORT</div></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-neutral-400"><span>long {pL.toFixed(0)}%</span><span>short {pS.toFixed(0)}%</span></div>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-rose-500/30"><div className="h-full bg-emerald-400" style={{ width: `${pL}%` }} /></div>
            <p className="mt-2 text-[11px] text-neutral-400">
              geser 4 jam: {a.orang.dLongShare4 === null ? '—' : `${a.orang.dLongShare4 >= 0 ? '+' : ''}${(a.orang.dLongShare4 * 100).toFixed(1)} poin porsi long`} · pemegang posisi tanpa bolak-balik (hold-estimasi) dihitung di tab Fundamen Modal (akun Gate hold + sensus venue)
            </p>
          </div>
        </Kartu>
        <Kartu>
          <JudulKecil warna="text-violet-300">whale top-20 — posisi & akun (Gate.io)</JudulKecil>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3"><div className="text-xl font-black text-emerald-300">{(a.whaleTop.topLong / 1e3).toFixed(0)}k</div><div className="text-[11px] text-neutral-400">size whale LONG ({a.whaleTop.topLongAkun} akun)</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black">{(pTopL).toFixed(0)}%</div><div className="text-[11px] text-neutral-400">porsi whale long (topShare)</div></div>
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3"><div className="text-xl font-black text-rose-300">{(a.whaleTop.topShort / 1e3).toFixed(0)}k</div><div className="text-[11px] text-neutral-400">size whale SHORT ({a.whaleTop.topShortAkun} akun)</div></div>
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-neutral-400"><span>whale long {pTopL.toFixed(0)}%</span><span>whale short {(100 - pTopL).toFixed(0)}%</span></div>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-rose-500/30"><div className="h-full bg-violet-400" style={{ width: `${pTopL}%` }} /></div>
            <p className="mt-2 text-[11px] text-neutral-400">
              whale vs kerumunan: {((a.whaleTop.topShare - (a.orang.rasioLong ?? 0.5)) * 100).toFixed(1)} poin {a.whaleTop.topShare - (a.orang.rasioLong ?? 0.5) >= 0 ? 'condong long' : 'condong short'} — posisi besar berlawanan kerumunan = bahan vonis jebakan/pump di tab Fundamen Modal
            </p>
          </div>
        </Kartu>
      </div>

      {/* ===== likuidasi nyata + aliran OI/taker/funding ===== */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Kartu>
          <JudulKecil>likuidasi NYATA terjadi (Gate.io, USD)</JudulKecil>
          <div className="space-y-2 text-[12px]">
            <div className="flex items-center justify-between"><span className="text-neutral-400">6 jam terakhir</span><span>long <b className="text-rose-300">${Math.round(a.liq6j.longUsd).toLocaleString('id-ID')}</b> · short <b className="text-emerald-300">${Math.round(a.liq6j.shortUsd).toLocaleString('id-ID')}</b></span></div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-emerald-500/30"><div className="h-full bg-rose-400" style={{ width: `${liq6 > 0 ? (a.liq6j.longUsd / liq6) * 100 : 50}%` }} /></div>
            <div className="flex items-center justify-between"><span className="text-neutral-400">24 jam terakhir</span><span>long <b className="text-rose-300">${Math.round(a.liq6j.liq24j.longUsd).toLocaleString('id-ID')}</b> · short <b className="text-emerald-300">${Math.round(a.liq6j.liq24j.shortUsd).toLocaleString('id-ID')}</b></span></div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-emerald-500/30"><div className="h-full bg-rose-400" style={{ width: `${liq24 > 0 ? (a.liq6j.liq24j.longUsd / liq24) * 100 : 50}%` }} /></div>
            {a.liq6j.dominan && <p className="text-[11px] text-amber-300">dominasi korban 6 jam terakhir: sisi {a.liq6j.dominan} — cek hukum kasus di bawah</p>}
          </div>
        </Kartu>
        <Kartu>
          <JudulKecil>aliran posisi &amp; tekanan</JudulKecil>
          <div className="space-y-1.5 text-[12px] text-neutral-300">
            <div>OI: <b>{a.oi.toLocaleString('id-ID')}</b> kontrak ({a.oiD24 === null ? '—' : `${a.oiD24 >= 0 ? '+' : ''}${(a.oiD24 * 100).toFixed(1)}%`} 24j)</div>
            <div>funding sekarang: <b>{(a.funding * 100).toFixed(4)}%</b> · rata-3j {(a.fundingMa3 * 100).toFixed(4)}% {a.fundingMa3 < 0.00005 ? '(dingin — bensin squeeze)' : a.fundingMa3 > 0.0002 ? '(panas — bensin long-flush)' : '(netral)'}</div>
            <div>taker beli−jual: <b>{(a.taker.imb * 100).toFixed(0)}%</b> · rata-3j {(a.taker.imbMa3 * 100).toFixed(0)}%</div>
            <div className="text-[11px] text-neutral-500">OI naik + harga naik = posisi long baru; OI turun + harga naik = penutupan short (squeeze); OI turun + harga turun = long-flush</div>
          </div>
        </Kartu>
        <Kartu>
          <JudulKecil>hukum kasus — 180 hari, 4 koin, ≈17.000 jam</JudulKecil>
          <div className="space-y-1 text-[11px]">
            {a.hukum.slice(0, 6).map((h, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className={`font-bold ${h.rate >= 0.6 ? 'text-emerald-300' : h.rate <= 0.45 ? 'text-rose-300' : 'text-amber-300'}`}>{(h.rate * 100).toFixed(0)}%</span>
                <span className="text-neutral-400">{h.nama} <span className="text-neutral-600">(n={h.n})</span></span>
              </div>
            ))}
            <p className="mt-1 text-[10px] text-neutral-500">≥60% = hukum terbaca · ≤45% = justru berlawanan (fallacy terbukti) · penuh di bawah</p>
          </div>
        </Kartu>
      </div>

      {/* ===== OTAK PAHAM — neuron pemahaman koin (jawaban keluhan "tak punya neuron, tak kuasai koin yang dituju") ===== */}
      <PapanPaham p={paham} tab="aliran" />

      {/* ===== hukum kasus penuh ===== */}
      <Kartu>
        <JudulKecil>hukum kasus lengkap — apa yang benar-benar bisa dibaca dari derivatif</JudulKecil>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[12px]">
            <thead className="text-neutral-400"><tr><th className="py-1">pola</th><th>n episode</th><th>rate</th><th>bacaan</th></tr></thead>
            <tbody>
              {a.hukum.map((h, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="py-1 text-neutral-200">{h.nama}</td>
                  <td className="text-neutral-400">{h.n}</td>
                  <td className={h.rate >= 0.6 ? 'text-emerald-300' : h.rate <= 0.45 ? 'text-rose-300' : 'text-amber-300'}>{(h.rate * 100).toFixed(1)}%</td>
                  <td className="text-neutral-500">{h.ket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">Sinyal naive (kerumunan ekstrem, whale tilt, OI tumbuh) hanya 44-61% — itu fallacy yang Anda tuduhkan. Yang terbaca sungguhan: BANJIR LIKUIDASI itu sendiri (73-75%) dan kaskade yang diprediksi model.</p>
      </Kartu>

      {/* ===== scoreboard ujian 500 ===== */}
      <Kartu className="border-amber-400/30">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <JudulKecil warna="text-amber-300">scoreboard ujian 500-soal — guru masa lalu: tragedi EVAA · PIEVERSE · AGT (warisan statis)</JudulKecil>
          <Badge tone="amber">{totalSoal.toLocaleString('id-ID')} soal nyata dinilai</Badge>
          <Badge tone="hijau">lapisan hidup ELSA: rekam jejak vonis diadili di papan otak paham di atas</Badge>
        </div>
        <div className="grid gap-2 text-center sm:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-xl font-black ${a.ujian.rerata.korban >= 0.6 ? 'text-emerald-300' : 'text-amber-300'}`}>{(a.ujian.rerata.korban * 100).toFixed(1)}%</div><div className="text-[11px] text-neutral-400">SISI KASKADE — 10 ronde × 500 soal segar (buta)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black text-emerald-300">{(a.ujian.rerata.alarmArah * 100).toFixed(1)}%</div><div className="text-[11px] text-neutral-400">arah benar pasca-alarm kaskade (buta)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className={`text-xl font-black ${a.ujian.walkforward.korban >= 0.55 ? 'text-emerald-300' : 'text-amber-300'}`}>{(a.ujian.walkforward.korban * 100).toFixed(1)}%</div><div className="text-[11px] text-neutral-400">ELSA walk-forward (500 jam terakhir, tanpa bocor)</div></div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-xl font-black text-amber-300">{(a.ujian.elsaButa.korban * 100).toFixed(1)}%</div><div className="text-[11px] text-neutral-400">ELSA buta total (tanpa riwayat ELSA — jujur dilaporkan)</div></div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[12px]">
            <thead className="text-neutral-400"><tr><th className="py-1">ronde (500 soal baru per ronde)</th><th>arah sentuh</th><th>sisi kaskade</th><th>n kaskade</th><th>alarm→kaskade</th><th>arah pasca-alarm</th></tr></thead>
            <tbody>
              <tr className="border-t border-white/5 bg-white/[0.02]"><td className="py-1 text-neutral-300">kalibrasi (threshold dikunci di sini)</td><td>{(a.ujian.kalibrasi.sentuh * 100).toFixed(1)}%</td><td>{(a.ujian.kalibrasi.korban * 100).toFixed(1)}%</td><td>{a.ujian.kalibrasi.nKor}</td><td>—</td><td>—</td></tr>
              {ronde.map((r) => (
                <tr key={r.n} className="border-t border-white/5">
                  <td className="py-1 text-neutral-300">ronde {r.n}</td>
                  <td className={r.sentuh >= 0.5 ? 'text-emerald-300' : 'text-amber-300'}>{(r.sentuh * 100).toFixed(1)}%</td>
                  <td className={r.korban >= 0.6 ? 'text-emerald-300' : r.korban >= 0.5 ? 'text-amber-300' : 'text-rose-300'}>{r.nKor > 0 ? `${(r.korban * 100).toFixed(1)}%` : '—'}</td>
                  <td className="text-neutral-400">{r.nKor}</td>
                  <td className="text-neutral-400">{(r.alarmPresisi * 100).toFixed(1)}%</td>
                  <td className={r.alarmArah >= 0.8 ? 'text-emerald-300' : 'text-amber-300'}>{r.alarmArah > 0 ? `${(r.alarmArah * 100).toFixed(1)}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-400">
          Protokol: soal = satu jam pasar nyata; model hanya boleh lihat data ≤ jam itu, dihakimi 6 jam berikutnya. Kalibrasi ronde-0 mengunci threshold; ronde 1-{ronde.length} = soal segar yang belum pernah dipakai (hukum anti-bocor: blok waktu 48 jam terpisah). Model produksi yang hidup di panel ini dilatih-ulang dengan seluruh masa lalu ({a.ujian.dilatih.toLocaleString('id-ID')} baris + {a.ujian.episodeKaskade.toLocaleString('id-ID')} episode kaskade) — walk-forward ELSA di atas adalah uji kejujurannya.
        </p>
        <ul className="mt-2 space-y-1 text-[11px] text-neutral-300">
          {a.catatanJujur.map((s, i) => <li key={i}>· {s}</li>)}
        </ul>
      </Kartu>
    </div>
  );
}

// ============================================================
// MOZAIK HIDUP — arsitektur kognitif yang benar-benar punya ruh
// (keluhan pemilik, 2026-11-24): arsitektur lama = 12 kartu teks
// statis yang tak pernah berubah — "tak ada ruh, sekadar kaya
// tulisan… kelemahan & premature jadinya". Benar. Sekarang peta
// saraf NYATA, bukan brosur:
//   · tiap organ: aktifasi dihitung dari sinyal payload SAAT INI
//   · saluran = kabel data sungguhan antar organ (bukan dekorasi)
//   · jurnal denyut = peristiwa nyata: pengadilan TP/SL, rekalku-
//     lasi pantau, kunci pra-registrasi, ronde ujian, mutasi dompet,
//     denyut guru — bukan teks pemanis
//   · tekan organ → inspektor membuka isi hidupnya SEKARANG
//   · MATI/BLOKIR diakui jujur — organ tanpa data tak dipakaikan hidup
// Organ server: src/lib/elsa/sinaps.ts · /api/elsa/sinaps
// ============================================================
type SinapsOrgan = {
  id: string; nama: string; lapisan: string; tugas: string;
  aktifasi: number; status: string;
  metrik: { label: string; nilai: string; tonus?: string }[];
  keluaran: string; terakhir: string | null; denyut24j: number; sumber: string[];
};
type SinapsPayload = {
  at: string; organ: SinapsOrgan[];
  saluran: { dari: string; ke: string; bobot: number }[];
  denyut: { at: string; organ: string; jenis: string; teks: string }[];
  statistik: { organTotal: number; organHidup: number; organAktif: number; denyut24j: number; denyutTotal: number; harga: number | null; vonis: string; labelArah: string; keyakinan: number; guard: string };
  error?: string;
};

// posisi peta saraf (SVG) — aliran sensorik → kognisi → memori/aksi, fundamen dari bawah, guru di atas
const SINAPS_POS: Record<string, { x: number; y: number }> = {
  guru: { x: 560, y: 40 },
  nadi: { x: 90, y: 130 },
  penglihatan: { x: 90, y: 250 },
  pemeta: { x: 90, y: 370 },
  tracker: { x: 90, y: 490 },
  debat: { x: 310, y: 130 },
  dewan: { x: 310, y: 250 },
  montecarlo: { x: 310, y: 370 },
  ketua: { x: 560, y: 250 },
  prareg: { x: 810, y: 130 },
  hakim: { x: 810, y: 250 },
  pantau: { x: 810, y: 370 },
  dompet: { x: 810, y: 490 },
  ingatan: { x: 1030, y: 190 },
  ujianelsa: { x: 1030, y: 310 },
  pertumbuhan: { x: 1030, y: 430 },
  modal: { x: 90, y: 560 },
  aliran: { x: 310, y: 560 },
  sumber: { x: 560, y: 560 },
  paus: { x: 810, y: 560 },
  peta: { x: 1030, y: 560 },
  // V6 — organ baru: bus persilangan, briefing hidup, neuron pertumbuhan
  persilangan: { x: 310, y: 490 },
  briefing: { x: 560, y: 490 },
  'pertumbuhan-neuron': { x: 1030, y: 70 },
};
const SINAPS_STATUS_HEX: Record<string, string> = {
  AKTIF: '#10b981', MENYALA: '#f59e0b', IDLE: '#525252', BLOKIR: '#f43f5e', MATI: '#262626',
};
const SINAPS_STATUS_CSS: Record<string, string> = {
  AKTIF: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200',
  MENYALA: 'border-amber-400/50 bg-amber-500/10 text-amber-200',
  IDLE: 'border-white/15 bg-black/40 text-neutral-400',
  BLOKIR: 'border-rose-400/50 bg-rose-500/10 text-rose-200',
  MATI: 'border-white/10 bg-black/60 text-neutral-600',
};
const LAPISAN_WARNA: Record<string, string> = {
  SENSORIK: 'text-cyan-300', KOGNISI: 'text-amber-300', MEMORI: 'text-violet-300',
  FUNDAMEN: 'text-lime-300', AKSI: 'text-emerald-300',
};

// ============================================================
// V6 — EMPAT ORGAN BARU TAMPILAN (keluhan pemilik 2026-11-26:
// "pertumbuhan, nadi gudang, briefing guru gak miliki neuron…
// amigdala mereka mati" + "neuron saling mencerdaskan bukannya
// saling cuek" + "dompet harus terus bermain"). Semua komponen ini
// hidup: fetch API organ masing-masing otomatis, menampilkan denyut
// nyata dari gudang, dan punya tombol denyut paksa.
// ============================================================
type JantungPantau = { id: string; nama: string; file: string; jedaTargetMenit: number; detakKe: number; atTerakhir: string | null; umurMenit: number | null; hidup: boolean; alarm: string | null; aksiTeks: string };
type BerkasGudang = { file: string; ukuranB: number; umurTulisMenit: number | null; makanSiapa: string; berdenyut: boolean };
type DenyutNadi = { at: string; detakKe: number; jantung: JantungPantau[]; gudang: BerkasGudang[]; alarm: string[]; cerita: string };
type NadiPayload = { at: string; detakKe: number; atTerakhir: string | null; terkini: DenyutNadi | null; riwayat: DenyutNadi[] };
type BriefingBaris = { bagian: string; teks: string };
type Briefing = { at: string; hari: string; fokus: string; judul: string; sikap: string; alasanSikap: string; baris: BriefingBaris[]; perintah: string; sumber: string[] };
type BriefingPayload = { terkini: Briefing | null; riwayat: Briefing[]; statistik: { jumlah: number; sikapTerakhir: string; umurMenit: number | null } };
type DimensiG = { id: string; label: string; nilai: number; bukti: string };
type DirektifG = { id: string; label: string; mengapa: string; ukur: string; potensiPp: number };
type SnapshotG = { at: string; detakKe: number; agi: number; dimensi: DimensiG[]; delta: { id: string; label: string; pp: number }[]; naik: string[]; turun: string[]; direktif: DirektifG[]; cerita: string };
type PertumbuhanPayload = { neuron: { detakKe: number; atTerakhir: string | null; terkini: SnapshotG | null } | null; riwayat: SnapshotG[]; statistik: { umurMenit: number | null; dimensiTerlemah: string | null } };
type KirimanP = { id: string; dari: string; ke: string; jenis: string; isi: string; angka: string[]; reaksi: string };
type PersilanganPayload = { denyutKe: number; atTerakhir: string | null; rondeTerakhir: { ke: number; at: string; kirim: KirimanP[]; cerita: string } | null; ronde: { ke: number; at: string; kirim: KirimanP[]; cerita: string }[]; statistik: { totalKirim: number; neuronPengirim: number; neuronPenerima: number } };

function umurTeks(menit: number | null): string {
  if (menit === null) return '—';
  if (menit < 1) return 'baru saja';
  if (menit < 60) return `${menit} mnt`;
  return `${Math.floor(menit / 60)}j ${menit % 60}m`;
}

// ---------- TAB NADI & GUDANG: papan denyut SEMUA jantung + gudang ----------
function NadiHidup() {
  const [nadi, setNadi] = useState<NadiPayload | null>(null);
  const [busy, setBusy] = useState(false);
  const muat = useCallback(async () => {
    try {
      const r = await fetch('/api/elsa/nadi', { cache: 'no-store' });
      setNadi(await r.json() as NadiPayload);
    } catch { /* denyut berikutnya */ }
  }, []);
  useEffect(() => {
    muat();
    const iv = setInterval(muat, 30_000);
    return () => clearInterval(iv);
  }, [muat]);
  const t = nadi?.terkini;
  const paksa = async () => {
    setBusy(true);
    try { await fetch('/api/elsa/nadi', { method: 'POST', body: JSON.stringify({ action: 'denyutPaksa' }) }); await muat(); } finally { setBusy(false); }
  };
  return (
    <>
      <Kartu>
        <JudulKecil warna="text-lime-300">nadi hidup — galian ke-{t?.detakKe ?? nadi?.detakKe ?? 0} · {t?.jantung.filter((j) => j.hidup).length ?? '…'}/{t?.jantung.length ?? '…'} jantung hidup</JudulKecil>
        <p className="mb-2 text-[12px] text-neutral-300">{t?.cerita ?? 'nadi menggali gudang tiap 5 menit — galian pertama menyusul…'}</p>
        <div className="grid gap-2 md:grid-cols-2">
          {(t?.jantung ?? []).map((j) => (
            <div key={j.id} className={`rounded-lg border p-2 ${j.hidup ? 'border-white/10 bg-black/30' : 'border-rose-500/40 bg-rose-500/10'}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block h-2 w-2 rounded-full ${j.hidup ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                  <span className="text-[12px] font-semibold text-neutral-100">{j.nama}</span>
                </div>
                <span className="text-[10px] text-neutral-400">detak #{j.detakKe} · {umurTeks(j.umurMenit)} lalu</span>
              </div>
              <div className="mt-1 line-clamp-2 text-[11px] text-neutral-400">{j.aksiTeks}</div>
              {j.alarm && <div className="mt-1 text-[10px] font-semibold text-rose-300">{j.alarm}</div>}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={paksa} disabled={busy} className="rounded-md border border-lime-400/30 bg-lime-500/10 px-2 py-1 text-[11px] text-lime-200 hover:bg-lime-500/20 disabled:opacity-50">{busy ? 'menggali…' : 'gali sekarang'}</button>
          <span className="text-[10px] text-neutral-500">nadi bekerja sendiri tiap 5 menit — tanpa menunggu halaman dibuka (keluhan pemilik: &quot;nadi gudang gak miliki neuron, amigdala mati&quot;)</span>
        </div>
      </Kartu>
      <Kartu>
        <JudulKecil warna="text-lime-300">gudang nyata — {t?.gudang.filter((g) => g.berdenyut).length ?? '…'}/{t?.gudang.length ?? '…'} berkas berdenyut 24 jam</JudulKecil>
        <div className="max-h-72 overflow-y-auto pr-1 [scrollbar-width:thin]">
          <table className="w-full min-w-[520px] text-left text-[11px]">
            <thead className="text-neutral-500"><tr><th className="py-1">berkas</th><th>ukuran</th><th>tulis terakhir</th><th>diberi makan ke</th></tr></thead>
            <tbody className="font-mono">
              {(t?.gudang ?? []).map((g) => (
                <tr key={g.file} className={`border-t border-white/5 ${g.berdenyut ? '' : 'text-neutral-600'}`}>
                  <td className="py-1">db/{g.file}</td>
                  <td>{g.ukuranB > 0 ? `${(g.ukuranB / 1024).toFixed(1)} kb` : '—'}</td>
                  <td>{g.umurTulisMenit === null ? 'belum pernah' : umurTeks(g.umurTulisMenit)}</td>
                  <td className="font-sans text-neutral-400">{g.makanSiapa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10px] text-neutral-500">berkas yang tak pernah ditulis = organ yang tak pernah hidup — dilabeli apa adanya, bukan dipakaikan status hidup.</p>
      </Kartu>
    </>
  );
}

// ---------- TAB BRIEFING GURU: briefing HIDUP fokus ELSA ----------
function BriefingHidup() {
  const [brf, setBrf] = useState<BriefingPayload | null>(null);
  const [busy, setBusy] = useState(false);
  const muat = useCallback(async () => {
    try {
      const r = await fetch('/api/elsa/briefing', { cache: 'no-store' });
      setBrf(await r.json() as BriefingPayload);
    } catch { /* denyut berikutnya */ }
  }, []);
  useEffect(() => {
    muat();
    const iv = setInterval(muat, 60_000);
    return () => clearInterval(iv);
  }, [muat]);
  const t = brf?.terkini;
  const sikapTone = t?.sikap === 'SEPAKAT' ? 'hijau' : t?.sikap === 'MELAWAN' ? 'merah' : 'amber';
  const paksa = async () => {
    setBusy(true);
    try { await fetch('/api/elsa/briefing', { method: 'POST', body: JSON.stringify({ action: 'denyut' }) }); await muat(); } finally { setBusy(false); }
  };
  return (
    <>
      <Kartu className="border-amber-400/30">
        <JudulKecil warna="text-amber-300">briefing HIDUP — fokus {t?.fokus ?? 'ELSA/USDT'} · ditulis otomatis tiap 20 menit</JudulKecil>
        {t ? (
          <div className="space-y-2 text-sm text-neutral-200">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={sikapTone}>sikap guru: {t.sikap}</Badge>
              <span className="text-[11px] text-neutral-400">{umurTeks(brf?.statistik.umurMenit ?? null)} lalu · {t.hari}</span>
            </div>
            <p className="text-[12px] text-neutral-300">{t.alasanSikap}</p>
            {t.baris.map((b, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">{b.bagian}</div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-200">{b.teks}</p>
              </div>
            ))}
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">perintah hari ini</div>
              <p className="mt-0.5 text-[12px] text-emerald-100">{t.perintah}</p>
            </div>
          </div>
        ) : (
          <p className="text-[12px] text-neutral-400">briefing belum lahir — jantung briefing menulis pertama ≤20 menit (atau tekan tombol di bawah).</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <button onClick={paksa} disabled={busy} className="rounded-md border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-[11px] text-amber-200 hover:bg-amber-500/20 disabled:opacity-50">{busy ? 'guru menulis…' : 'berlaga sekarang'}</button>
          <span className="text-[10px] text-neutral-500">briefing membaca SEMUA neuron ELSA (radar, modal, kasus, ujian, dompet, pertumbuhan) — bukan teks statis; riwayat {brf?.statistik.jumlah ?? 0} briefing</span>
        </div>
      </Kartu>
      {(brf?.riwayat.length ?? 0) > 1 && (
        <Kartu>
          <JudulKecil>waktu briefing sebelumnya</JudulKecil>
          <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
            {brf?.riwayat.slice(1, 9).map((b, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2 text-[11px]">
                <div className="text-neutral-500">{new Date(b.at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} · sikap {b.sikap}</div>
                <div className="text-neutral-300">{b.judul}</div>
              </div>
            ))}
          </div>
        </Kartu>
      )}
    </>
  );
}

// ---------- TAB PERTUMBUHAN: diary + delta jujur + direktif ----------
function PertumbuhanHidup() {
  const [per, setPer] = useState<PertumbuhanPayload | null>(null);
  const [busy, setBusy] = useState(false);
  const muat = useCallback(async () => {
    try {
      const r = await fetch('/api/elsa/pertumbuhan', { cache: 'no-store' });
      setPer(await r.json() as PertumbuhanPayload);
    } catch { /* denyut berikutnya */ }
  }, []);
  useEffect(() => {
    muat();
    const iv = setInterval(muat, 60_000);
    return () => clearInterval(iv);
  }, [muat]);
  const t = per?.neuron?.terkini ?? null;
  const paksa = async () => {
    setBusy(true);
    try { await fetch('/api/elsa/pertumbuhan', { method: 'POST', body: JSON.stringify({ action: 'denyut' }) }); await muat(); } finally { setBusy(false); }
  };
  return (
    <Kartu>
      <JudulKecil warna="text-violet-300">neuron pertumbuhan — snapshot ke-{t?.detakKe ?? 0} · AGI otak {t?.agi.toFixed(2) ?? '—'}%</JudulKecil>
      {t ? (
        <div className="space-y-2">
          <p className="text-[12px] text-neutral-300">{t.cerita}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {t.dimensi.map((d) => (
              <div key={d.id} className="rounded-lg border border-white/10 bg-black/30 p-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-neutral-200">{d.label}</span>
                  <span className="font-mono text-cyan-300">{(d.nilai * 100).toFixed(0)}%</span>
                </div>
                <div className="text-[10px] text-neutral-500">{d.bukti}</div>
              </div>
            ))}
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {t.direktif.map((d) => (
              <div key={d.id} className="rounded-lg border border-violet-400/30 bg-violet-500/10 p-2">
                <div className="text-[11px] font-bold text-violet-200">{d.label} <span className="text-violet-300">+{d.potensiPp} pp</span></div>
                <div className="text-[10px] text-neutral-300">{d.mengapa}</div>
                <div className="text-[10px] text-neutral-500">ukur: {d.ukur}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[12px] text-neutral-400">otak pertumbuhan belum berdenyut — snapshot pertama ≤15 menit.</p>
      )}
      <div className="mt-2 flex items-center gap-2">
        <button onClick={paksa} disabled={busy} className="rounded-md border border-violet-400/30 bg-violet-500/10 px-2 py-1 text-[11px] text-violet-200 hover:bg-violet-500/20 disabled:opacity-50">{busy ? 'menimbang diri…' : 'timbang sekarang'}</button>
        <span className="text-[10px] text-neutral-500">delta jujur: naik {t?.naik.length ?? 0} · turun {t?.turun.length ?? 0} — yang memundur DIAKUI, bukan disembunyikan (diary {per?.riwayat.length ?? 0} snapshot)</span>
      </div>
    </Kartu>
  );
}

// ---------- TAB OTAK & INGATAN: bus persilangan (saling mencerdaskan) ----------
function PersilanganHidup() {
  const [per, setPer] = useState<PersilanganPayload | null>(null);
  const [busy, setBusy] = useState(false);
  const muat = useCallback(async () => {
    try {
      const r = await fetch('/api/elsa/persilangan', { cache: 'no-store' });
      setPer(await r.json() as PersilanganPayload);
    } catch { /* denyut berikutnya */ }
  }, []);
  useEffect(() => {
    muat();
    const iv = setInterval(muat, 60_000);
    return () => clearInterval(iv);
  }, [muat]);
  const t = per?.rondeTerakhir ?? null;
  const paksa = async () => {
    setBusy(true);
    try { await fetch('/api/elsa/persilangan', { method: 'POST', body: JSON.stringify({ action: 'denyut' }) }); await muat(); } finally { setBusy(false); }
  };
  return (
    <Kartu>
      <JudulKecil warna="text-cyan-300">persilangan neuron — bus &quot;saling mencerdaskan&quot; ronde ke-{per?.denyutKe ?? 0}</JudulKecil>
      <p className="mb-2 text-[12px] text-neutral-300">{t?.cerita ?? 'bus akan mengantar kiriman neuron ronde pertama ≤15 menit…'}</p>
      <div className="max-h-80 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {(t?.kirim ?? []).map((k) => (
          <div key={k.id} className="rounded-lg border border-white/10 bg-black/30 p-2 text-[11px]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 font-bold text-cyan-300">{k.dari} → {k.ke}</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-neutral-300">{k.jenis}</span>
            </div>
            <p className="mt-1 text-neutral-200">{k.isi}</p>
            <p className="mt-0.5 text-emerald-300">reaksi wajib penerima: {k.reaksi}</p>
          </div>
        ))}
        {t && t.kirim.length === 0 && <p className="text-[12px] text-neutral-500">ronde ini sepi — tak ada neuron dengan data segar; bus jujur, tidak mengarang kiriman.</p>}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button onClick={paksa} disabled={busy} className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-200 hover:bg-cyan-500/20 disabled:opacity-50">{busy ? 'mengantar…' : 'antar sekarang'}</button>
        <span className="text-[10px] text-neutral-500">{per?.statistik.totalKirim ?? 0} kiriman terarsip · {per?.statistik.neuronPengirim ?? 0} pengirim → {per?.statistik.neuronPenerima ?? 0} penerima · guru &amp; jantung dompet MEMBACA kiriman ini beneran (modulasi K pedang)</span>
      </div>
    </Kartu>
  );
}

function MozaikHidup() {
  const [sin, setSin] = useState<SinapsPayload | null>(null);
  const [pilih, setPilih] = useState<string | null>(null);
  const [errSin, setErrSin] = useState<string | null>(null);
  const [segarkan, setSegarkan] = useState(0);

  const muatSinaps = useCallback(async () => {
    try {
      const r = await fetch('/api/elsa/sinaps', { cache: 'no-store' });
      const j = (await r.json()) as SinapsPayload;
      if (j.error) throw new Error(j.error);
      setSin(j);
      setErrSin(null);
    } catch (e) {
      setErrSin(e instanceof Error ? e.message : 'bus sinaps gagal');
    }
  }, []);

  useEffect(() => {
    muatSinaps();
    const iv = setInterval(muatSinaps, 30_000); // denyut bus tiap 30 detik
    return () => clearInterval(iv);
  }, [muatSinaps, segarkan]);

  const organMap = useMemo(() => new Map((sin?.organ ?? []).map((o) => [o.id, o])), [sin]);
  const dipilih = pilih ? organMap.get(pilih) ?? null : null;
  const st = sin?.statistik;

  return (
    <div className="space-y-4">
      {/* ===== denyut jantung + statistik hidup ===== */}
      <Kartu>
        <JudulKecil warna="text-emerald-300">
          arsitektur kognitif HIDUP — peta saraf nyata, bukan teks mati
        </JudulKecil>
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <p className="text-[12px] text-neutral-300">
            {st
              ? `${st.organHidup}/${st.organTotal} organ terbaca · ${st.organAktif} AKTIF · ${st.denyut24j} denyut nyata 24 jam terakhir · bus segarkan tiap 30 detik`
              : 'menghubungkan bus saraf — membaca semua organ dari payload hidup…'}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-neutral-300">harga {st?.harga != null ? fmtHarga(st.harga) : '…'}</span>
          <span className={`rounded-md border px-2 py-1 ${st?.vonis === 'BUY' ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : st?.vonis === 'SELL' ? 'border-rose-400/30 bg-rose-500/10 text-rose-200' : 'border-white/10 bg-black/30 text-neutral-300'}`}>
            vonis {st?.vonis ?? '—'} ({st?.labelArah ?? '—'}) · keyakinan {st?.keyakinan ?? '—'}%
          </span>
          <span className={`rounded-md border px-2 py-1 ${st?.guard === 'LOLOS' ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-amber-400/30 bg-amber-500/10 text-amber-200'}`}>guard {st?.guard ?? '—'}</span>
          <button onClick={() => setSegarkan((v) => v + 1)} className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-cyan-200 hover:bg-cyan-500/20">segarkan bus saraf</button>
        </div>
        {errSin && <p className="mt-2 text-[11px] text-rose-300">{errSin}</p>}
      </Kartu>

      {/* ===== peta saraf (SVG hidup) ===== */}
      <Kartu>
        <JudulKecil>peta saraf — sensorik → kognisi → memori/aksi · fundamen menopang dari bawah · guru membaca dari atas</JudulKecil>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 1120 600" className="min-w-[900px]" style={{ width: '100%' }}>
            {/* saluran kabel — digambar dulu, node menutupi ujungnya */}
            {(sin?.saluran ?? []).map((s, i) => {
              const a = SINAPS_POS[s.dari], b = SINAPS_POS[s.ke];
              if (!a || !b) return null;
              const src = organMap.get(s.dari);
              const hex = SINAPS_STATUS_HEX[src?.status ?? 'IDLE'] ?? '#525252';
              const putus = s.ke === 'guru' || s.dari === 'guru';
              return (
                <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={hex} strokeOpacity={0.3 + s.bobot * 0.25}
                  strokeWidth={0.8 + s.bobot * 1.2}
                  strokeDasharray={putus ? '3 7' : '6 5'}
                  className="sinaps-alir"
                  style={{ animationDuration: `${Math.max(0.8, 2.2 - (src?.aktifasi ?? 0.3) * 1.5).toFixed(2)}s` }} />
              );
            })}
            {/* label lapisan */}
            <text x={90} y={22} fontSize={10} fill="#67e8f9" fontWeight={700}>SENSORIK</text>
            <text x={310} y={22} fontSize={10} fill="#fcd34d" fontWeight={700}>KOGNISI</text>
            <text x={470} y={590} fontSize={10} fill="#bef264" fontWeight={700}>FUNDAMEN</text>
            <text x={810} y={22} fontSize={10} fill="#d8b4fe" fontWeight={700}>MEMORI & AKSI</text>
            {(!sin) ? (
              <text x={560} y={310} textAnchor="middle" fontSize={14} fill="#525252">bus saraf menyala — membaca organ…</text>
            ) : (
              sin.organ.map((o) => {
                const pos = SINAPS_POS[o.id];
                if (!pos) return null;
                const hex = SINAPS_STATUS_HEX[o.status] ?? '#525252';
                const w = 134, h = 44;
                const dur = Math.max(0.9, 2.6 - o.aktifasi * 1.8);
                const dipilihNode = pilih === o.id;
                return (
                  <g key={o.id} onClick={() => setPilih(dipilihNode ? null : o.id)} style={{ cursor: 'pointer' }}>
                    <rect x={pos.x - w / 2} y={pos.y - h / 2} width={w} height={h} rx={10}
                      fill={o.status === 'MATI' ? '#0a0a0a' : '#0d0d0d'}
                      stroke={dipilihNode ? '#fafafa' : hex} strokeWidth={dipilihNode ? 2 : 1.2} />
                    {o.status !== 'MATI' && (
                      <rect x={pos.x - w / 2} y={pos.y - h / 2} width={w} height={h} rx={10} fill="none" stroke={hex}
                        className="sinaps-pulsar" style={{ animationDuration: `${dur}s` }} />
                    )}
                    <text x={pos.x} y={pos.y - 5} textAnchor="middle" fontSize={9.5} fontWeight={700}
                      fill={dipilihNode ? '#fafafa' : o.status === 'MATI' ? '#525252' : '#e5e5e5'}>
                      {o.nama.length > 17 ? o.nama.slice(0, 16) + '…' : o.nama}
                    </text>
                    <text x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize={7.5} fill={hex}>
                      {o.status} · {(o.aktifasi * 100).toFixed(0)}%{o.denyut24j > 0 ? ` · ${o.denyut24j}×/24j` : ''}
                    </text>
                    <rect x={pos.x - 40} y={pos.y + 11} width={80} height={3} rx={1.5} fill="#262626" />
                    <rect x={pos.x - 40} y={pos.y + 11} width={Math.max(1, 80 * o.aktifasi)} height={3} rx={1.5} fill={hex} />
                  </g>
                );
              })
            )}
          </svg>
        </div>
        {/* legenda */}
        <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-neutral-400">
          <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />AKTIF ≥66%</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />MENYALA 35-65%</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-neutral-600" />IDLE &lt;35%</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-500" />BLOKIR (guard/debat merah)</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-neutral-800" />MATI (data tak terbaca — diakui jujur)</span>
          <span className="text-neutral-500">· kecepatan kedip & aliran kabel = aktifasi nyata organ · tekan organ untuk membuka isinya</span>
        </div>
      </Kartu>

      {/* ===== inspektor organ ===== */}
      <Kartu>
        <JudulKecil>inspektor organ {dipilih ? `— ${dipilih.nama}` : '— tekan satu organ di peta'}</JudulKecil>
        {dipilih ? (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${SINAPS_STATUS_CSS[dipilih.status] ?? 'border-white/10 bg-black/40 text-neutral-300'}`}>{dipilih.status}</span>
              <span className={`text-[11px] font-semibold ${LAPISAN_WARNA[dipilih.lapisan] ?? 'text-neutral-300'}`}>lapisan {dipilih.lapisan}</span>
              <span className="text-[11px] text-neutral-400">aktifasi {(dipilih.aktifasi * 100).toFixed(0)}% · denyut 24j {dipilih.denyut24j}× · terakhir {dipilih.terakhir ? waktuPendek(dipilih.terakhir) : '—'}</span>
            </div>
            <p className="text-[12px] text-neutral-300">{dipilih.tugas}</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {dipilih.metrik.map((m, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">{m.label}</div>
                  <div className={`text-[13px] font-bold ${m.tonus === 'hijau' ? 'text-emerald-300' : m.tonus === 'merah' ? 'text-rose-300' : m.tonus === 'amber' ? 'text-amber-300' : m.tonus === 'cyan' ? 'text-cyan-300' : m.tonus === 'ungu' ? 'text-violet-300' : 'text-neutral-200'}`}>{m.nilai}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-white/10 bg-black/40 p-2 text-[12px] text-neutral-200">
              <span className="text-neutral-500">keluaran sesaat ini: </span>{dipilih.keluaran}
            </div>
            <p className="text-[10px] text-neutral-500">diberi makan oleh: {dipilih.sumber.map((s) => s).join(' · ')}</p>
          </div>
        ) : (
          <p className="text-[12px] text-neutral-500">Setiap kartu di peta adalah organ nyata: angka aktifasi dihitung dari sinyal payload sekarang — RSI, duty guard, ledger, rekalkulasi pantau, cetakan paus, denyut guru. Bukan deskripsi statis. Tekan salah satu untuk membuka isi hidupnya.</p>
        )}
      </Kartu>

      {/* ===== jurnal denyut nyata ===== */}
      <Kartu>
        <JudulKecil warna="text-cyan-300">jurnal denyut — peristiwa nyata semua organ ({sin?.denyut.length ?? 0} terakhir)</JudulKecil>
        <div className="max-h-80 space-y-1.5 overflow-y-auto pr-1">
          {(sin?.denyut ?? []).map((d, i) => {
            const o = organMap.get(d.organ);
            return (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/30 p-2">
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${SINAPS_STATUS_CSS[o?.status ?? 'IDLE'] ?? 'border border-white/10 bg-black/40 text-neutral-300'}`}>{d.jenis}</span>
                <span className="shrink-0 text-[10px] text-neutral-500" style={{ width: 68 }}>{waktuPendek(d.at)}</span>
                <p className="min-w-0 text-[11px] leading-relaxed text-neutral-300">{d.teks}</p>
              </div>
            );
          })}
          {sin && sin.denyut.length === 0 && <p className="text-[12px] text-neutral-500">belum ada denyut tercatat — organ baru menyala, tunggu peristiwa pertama (kunci slot, pengadilan TP/SL, ronde ujian, denyut guru).</p>}
          {!sin && <p className="text-[12px] text-neutral-500">membaca jurnal dari gudang nyata…</p>}
        </div>
        <p className="mt-2 text-[10px] text-neutral-500">Semua baris berasal dari gudang nyata: events arena, trail pantau-terus, ledger SHA-256, buku cuan, ronde ujian ELSA, buku akuntansi dompet, denyut neuron guru. Tidak ada teks karangan.</p>
      </Kartu>
    </div>
  );
}

// ============================================================
// RUANG GURU — NEURON HIDUP (keluhan pemilik: "ruang guru belum
// punya neuron yang dapat aktif mandiri… ditanya pemahaman pasar
// ELSA masih buntu, berita fresh/hot market gak tahu, asal usul
// ELSA gak tahu… dia tidak punya ruh, seakan benda mati").
// Sekarang guru punya LLM hidup + web_search berita segar +
// pengetahuan asal-usul ELSA + PEMAHAMAN MANDIRI (berpikir tanpa
// ditanya). Organ server: src/lib/elsa/guru.ts · /api/elsa/guru
// ============================================================
type Berita = { judul: string; url: string; host: string; tanggal: string; ringkas: string; kata: 'ELSA' | 'PASAR' };
type PemahamanGuru = { at: string; teks: string; beritaDipakai: string[] };
type PesanObrolan = { peran: 'saya' | 'guru'; teks: string; at?: string; sumberData?: string[] };
type NeuronStatus = {
  hidup: boolean; at: string; harga: number | null; nCandle: number;
  beritaJumlah: number; beritaAt: string | null; pemahamanAt: string | null;
  sumberData: string[]; catatan: string;
};
const SARAN_LOKAL = [
  'Bagaimana pemahamanmu tentang pasar ELSA hari ini?',
  'Apa asal usul ELSA?',
  'Ada kabar penting soal ELSA atau pasar kripto?',
  'Kenapa verdict otak sekarang begini?',
  'Apa risiko terbesar 24 jam ke depan?',
  'Jelaskan radar paus hari ini dengan bahasa sederhana',
  'Kalau saya entry sekarang, apa rencananya?',
  'Kenapa SELL dimatikan?',
];
const waktuPendek = (iso: string | null | undefined): string => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' }) + ' WIB';
  } catch {
    return '—';
  }
};

function RuangGuru({ data, muat }: { data: Payload; muat: () => void }) {
  const [obrolan, setObrolan] = useState<PesanObrolan[]>([]);
  const [tanya, setTanya] = useState('');
  const [busy, setBusy] = useState(false);
  const [neuron, setNeuron] = useState<NeuronStatus | null>(null);
  const [pemahaman, setPemahaman] = useState<PemahamanGuru | null>(null);
  const [berita, setBerita] = useState<Berita[]>([]);
  const [denyutBusy, setDenyutBusy] = useState(false);
  const [saran, setSaran] = useState<string[]>(SARAN_LOKAL);
  const [err, setErr] = useState<string | null>(null);
  const autoDenyut = useRef(false);
  const refObrolan = useRef<HTMLDivElement | null>(null);

  // status neuron (cepat, tanpa LLM)
  useEffect(() => {
    let batal = false;
    (async () => {
      try {
        const r = await fetch('/api/elsa/guru');
        const j = await r.json();
        if (batal) return;
        if (j.status) setNeuron(j.status as NeuronStatus);
        if (Array.isArray(j.saran) && j.saran.length) setSaran(j.saran as string[]);
      } catch { /* neuron tetap hidup tanpa status awal */ }
    })();
    return () => { batal = true; };
  }, []);

  // DENYUT NEURON — guru berpikir MANDIRI (berita segar + pemahaman)
  const denyut = async (paksa = false) => {
    setDenyutBusy(true);
    setErr(null);
    try {
      const r = await fetch('/api/elsa/guru', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'denyut', paksa }),
      });
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      if (j.pemahaman) setPemahaman(j.pemahaman as PemahamanGuru);
      if (Array.isArray(j.berita)) setBerita(j.berita as Berita[]);
      setNeuron((n) => (n
        ? {
            ...n,
            hidup: true,
            beritaJumlah: Array.isArray(j.berita) ? j.berita.length : n.beritaJumlah,
            beritaAt: Array.isArray(j.berita) && j.berita.length ? new Date().toISOString() : n.beritaAt,
            pemahamanAt: j.pemahaman?.at ?? n.pemahamanAt,
            catatan: typeof j.catatan === 'string' ? j.catatan : n.catatan,
          }
        : n));
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'guru gagal berpikir — coba lagi');
    }
    setDenyutBusy(false);
  };

  // kalau belum ada pemahaman segar → guru berpikir OTOMATIS saat ruang dibuka
  useEffect(() => {
    if (!autoDenyut.current && neuron && !pemahaman && !denyutBusy) {
      autoDenyut.current = true;
      denyut(false);
    }
  }, [neuron, pemahaman, denyutBusy]);

  // obrolan ikut scroll ke bawah
  useEffect(() => {
    const el = refObrolan.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [obrolan, busy]);

  const kirim = async (q: string) => {
    const teks = q.trim();
    if (!teks || busy) return;
    setTanya('');
    const pesanSaya: PesanObrolan = { peran: 'saya', teks, at: new Date().toISOString() };
    const riwayat = [...obrolan.filter((m) => !m.teks.startsWith('…')), pesanSaya];
    setObrolan([...riwayat, { peran: 'guru', teks: '…guru sedang berpikir dengan data hidup + berita segar…' }]);
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch('/api/elsa/guru', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'tanya', pertanyaan: teks, riwayat: riwayat.slice(-10) }),
      });
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      setObrolan([...riwayat, { peran: 'guru', teks: j.jawaban as string, at: j.at as string, sumberData: j.sumberData as string[] }]);
    } catch (e) {
      setObrolan([...riwayat, { peran: 'guru', teks: `GURU GAGAP: ${e instanceof Error ? e.message : 'neuron bermasalah'} — tanya lagi sebentar.` }]);
    }
    setBusy(false);
  };

  const toggleSell = async (on: boolean) => {
    setBusy(true);
    await fetch('/api/elsa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'setSellOn', sellOn: on }) });
    await muat();
    setBusy(false);
  };

  return (
    <>
      {/* ===== status neuron ===== */}
      <Kartu>
        <JudulKecil warna="text-emerald-300">neuron guru — <span className="text-emerald-300">HIDUP</span> · bukan buku FAQ mati</JudulKecil>
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className={`absolute inline-flex h-full w-full rounded-full ${denyutBusy ? 'bg-amber-400' : 'bg-emerald-400'} opacity-60 animate-ping`} />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${denyutBusy ? 'bg-amber-400' : 'bg-emerald-500'}`} />
          </span>
          <p className="text-[12px] text-neutral-300">
            {denyutBusy
              ? 'guru sedang berpikir mandiri — membaca data hidup, memanen berita segar, menyusun pemahaman…'
              : neuron?.catatan ?? 'neuron menyala — guru membaca data hidup, berita internet, dan asal-usul ELSA'}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-neutral-300">harga hidup {neuron?.harga != null ? fmtHarga(neuron.harga) : '…'}</span>
          <span className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-neutral-300">{neuron?.nCandle ?? '…'} candle riwayat sejak TGE</span>
          <span className={`rounded-md border px-2 py-1 ${berita.length ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-black/30 text-neutral-400'}`}>berita segar ×{berita.length || neuron?.beritaJumlah || 0}</span>
          <span className={`rounded-md border px-2 py-1 ${pemahaman ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-black/30 text-neutral-400'}`}>pemahaman mandiri {pemahaman ? waktuPendek(pemahaman.at) : 'menunggu denyut'}</span>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">
          organ neuron: data hidup arena · asal-usul ELSA (riset 24-11-2026) · mata pasar web_search (cache 30 menit) · LLM multi-turn. Guru boleh SETUJU atau MELAWAN verdict otak — asalkan dari data; kalau tidak ada data, guru bilang JUJUR tidak ada.
        </p>
      </Kartu>

      {/* ===== pemahaman mandiri — guru berpikir tanpa ditanya ===== */}
      <Kartu>
        <JudulKecil warna="text-emerald-300">pemahaman mandiri guru {pemahaman ? `— ${waktuPendek(pemahaman.at)}` : '— denyut pertama'}</JudulKecil>
        {pemahaman ? (
          <>
            <div className="whitespace-pre-line rounded-lg border border-emerald-400/20 bg-black/40 p-3 text-[13px] leading-relaxed text-neutral-200">{pemahaman.teks}</div>
            {pemahaman.beritaDipakai.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {pemahaman.beritaDipakai.map((h) => <span key={h} className="rounded-md border border-cyan-400/20 bg-cyan-500/5 px-1.5 py-0.5 text-[10px] text-cyan-200">{h}</span>)}
              </div>
            )}
          </>
        ) : (
          <p className="text-[12px] text-neutral-500">{denyutBusy ? 'guru sedang menyusun pemahaman hari ini…' : 'guru belum berpikir mandiri di sesi ini — denyut neuron sedang berjalan…'}</p>
        )}
        <div className="mt-3">
          <button disabled={denyutBusy} onClick={() => denyut(true)} className="rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/25 disabled:opacity-40">
            {denyutBusy ? 'berpikir…' : 'suruh guru berpikir ulang'}
          </button>
          <span className="ml-2 text-[11px] text-neutral-500">guru membaca ulang pasar + memanen berita baru</span>
        </div>
        {err && <p className="mt-2 text-[11px] text-rose-300">{err}</p>}
      </Kartu>

      {/* ===== berita segar yang guru baca ===== */}
      <Kartu>
        <JudulKecil warna="text-cyan-300">berita segar yang guru baca (internet, cache 30 menit)</JudulKecil>
        {berita.length ? (
          <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {berita.map((b) => (
              <a key={b.url} href={b.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-white/10 bg-black/30 p-2.5 hover:border-cyan-400/30 hover:bg-cyan-500/5">
                <div className="flex items-start gap-2">
                  <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${b.kata === 'ELSA' ? 'bg-amber-500/20 text-amber-200' : 'bg-white/10 text-neutral-300'}`}>{b.kata}</span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold text-neutral-200">{b.judul}</p>
                    <p className="text-[11px] text-neutral-400">{b.host} · {b.tanggal}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-neutral-500">{denyutBusy ? 'memanen berita dari internet…' : 'belum ada berita terpanen — tekan "suruh guru berpikir ulang" untuk memanen ulang.'}</p>
        )}
      </Kartu>

      {/* ===== tanya guru — obrolan multi-turn ===== */}
      <Kartu>
        <JudulKecil>tanya guru — jawaban dari data hidup + asal-usul + berita</JudulKecil>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {saran.map((q) => (
            <button key={q} disabled={busy} onClick={() => kirim(q)} className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-neutral-300 hover:bg-white/5 disabled:opacity-40">{q}</button>
          ))}
        </div>
        {obrolan.length > 0 && (
          <div ref={refObrolan} className="mb-3 max-h-96 space-y-2 overflow-y-auto pr-1">
            {obrolan.map((m, i) => (
              <div key={i} className={`rounded-lg border p-3 text-[13px] leading-relaxed ${m.peran === 'saya' ? 'border-amber-400/25 bg-amber-500/10 text-amber-100' : 'border-white/10 bg-black/40 text-neutral-200'}`}>
                <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide">
                  <span className={m.peran === 'saya' ? 'text-amber-300' : 'text-emerald-300'}>{m.peran === 'saya' ? 'saya' : 'guru'}</span>
                  {m.at && <span className="text-neutral-500">{waktuPendek(m.at)}</span>}
                </div>
                <div className="whitespace-pre-line">{m.teks}</div>
                {m.sumberData && m.sumberData.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.sumberData.map((s) => <span key={s} className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-400">{s}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={tanya}
            onChange={(e) => setTanya(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && tanya.trim() && !busy) kirim(tanya); }}
            placeholder="Tanya apa saja soal ELSA: pasar, berita, asal usul, verdict, paus…"
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-neutral-500 focus:border-emerald-400/50"
          />
          <button disabled={busy || !tanya.trim()} onClick={() => kirim(tanya)} className="rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-4 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25 disabled:opacity-40">{busy ? 'berpikir…' : 'tanya'}</button>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">hukum guru: angka hanya dari data nyata — kalau tidak ada, guru bilang tidak ada, bukan mengarang.</p>
      </Kartu>

      <Kartu className={data?.sellOn ? 'border-rose-400/40' : ''}>
        <JudulKecil warna={data?.sellOn ? 'text-rose-300' : 'text-amber-300'}>knob sellOn — kebijakan arah SELL</JudulKecil>
        <p className="mb-3 text-[12px] text-neutral-300">
          Status: <strong>{data?.sellOn ? 'AKTIF' : 'MATI'}</strong> — hasil lab situs sumber: SELL menggerus profit. Arah SELL tetap selalu dihitung &amp; ditampilkan; knob hanya menentukan boleh-tidaknya jadi rencana tempur.
        </p>
        <div className="flex gap-2">
          <button disabled={busy || !!data?.sellOn} onClick={() => toggleSell(true)} className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-200 disabled:opacity-40">nyalakan (berisiko)</button>
          <button disabled={busy || !data?.sellOn} onClick={() => toggleSell(false)} className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 disabled:opacity-40">matikan (disiplin sumber)</button>
        </div>
      </Kartu>
    </>
  );
}

const STATUS_SUMBER_TONE: Record<string, 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral'> = {
  HIDUP: 'hijau', TERWAKILI: 'ungu', TERKUNCI: 'amber', TIDAK_TERDAFTAR: 'netral', MATI: 'merah',
};
const fmtToken = (v: number): string => {
  if (Math.abs(v) >= 1e9) return `${(v / 1e9).toFixed(2)} M`;
  if (Math.abs(v) >= 1e6) return `${(v / 1e6).toFixed(2)} jt`;
  if (Math.abs(v) >= 1e3) return `${(v / 1e3).toFixed(1)} rb`;
  return v.toFixed(0);
};

function TabSumber({ s }: { s: SumberData }) {
  const u = s.unlock?.berikutnya ?? null;
  const katOrder: SumberData['matriks'][number]['kategori'][] = ['DERIVATIF', 'ON-CHAIN', 'HARGA-VOLUME', 'GELAP'];
  return (
    <div className="space-y-4">
      {/* ===== RUH MATRIKS v2 — denyut: setiap sumber diperiksa hidup/mati tiap ronda ===== */}
      <Kartu className="border-amber-400/30 bg-amber-500/5">
        <JudulKecil warna="text-amber-300">denyut matriks — setiap sumber diperiksa hidup/mati tiap ronda (jantung sendiri tiap 5 menit, walau panel tak dibuka)</JudulKecil>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {s.denyut.map((d) => (
            <div key={d.id} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  {d.status === 'HIDUP' && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
                  <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${d.status === 'HIDUP' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                </span>
                <span className="text-[12px] font-bold text-neutral-100">{d.label}</span>
                <span className={`ml-auto text-[10px] font-black ${d.status === 'HIDUP' ? 'text-emerald-300' : 'text-rose-300'}`}>{d.status}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-neutral-400">
                <span>latensi {d.latencyMs !== null ? `${d.latencyMs} ms` : '—'}</span>
                <span>umur data {d.umurDetik !== null ? (d.umurDetik < 90 ? `${d.umurDetik} dtk` : `${Math.round(d.umurDetik / 60)} mnt`) : '—'}</span>
                {d.gagalBerturut > 0 && <span className="text-rose-300">gagal ×{d.gagalBerturut} berturut</span>}
              </div>
              <div className="mt-1.5 flex h-3.5 items-end gap-[3px]">
                {d.riwayat.slice(-18).map((r, i) => (
                  <span key={i} title={`${r.at} — ${r.ok ? 'hidup' : 'mati'} (${r.ms} ms)`} className={`w-1.5 rounded-sm ${r.ok ? 'bg-emerald-500/70' : 'bg-rose-600/80'}`} style={{ height: `${Math.max(3, Math.min(14, Math.round((r.ms / 4000) * 12 + 3)))}px` }} />
                ))}
                {d.riwayat.length === 0 && <span className="text-[9px] text-neutral-500">riwayat denyut kosong — ronda berikutnya mulai merekam</span>}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-neutral-500">batang = riwayat 18 ronda pemeriksaan terakhir (tinggi ≈ latensi; hijau = hidup, merah = gagal). Ingatan denyut disimpan di db/elsa/sumber_denyut.json — tidak hilang walau server restart.</p>
      </Kartu>

      {/* ===== RUH MATRIKS v2 — suara + kesaksian ===== */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Kartu>
          <JudulKecil warna="text-teal-300">suara sumber — apa yang masing-masing LIHAT sekarang tentang ELSA</JudulKecil>
          <div className="space-y-2">
            {s.suara.length ? s.suara.map((v, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-amber-200">{v.dari}</span>
                  <span className="ml-auto text-[9px] text-neutral-500">{v.at.slice(11, 19)} UTC</span>
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-300">&ldquo;{v.teks}&rdquo;</p>
              </div>
            )) : <p className="text-[12px] text-neutral-400">semua sumber bisu kali ini (rate-limit / jaringan) — jantung mencoba lagi otomatis tiap 5 menit.</p>}
          </div>
        </Kartu>
        <Kartu>
          <JudulKecil warna="text-fuchsia-300">kesaksian → dewan verdict — sumber ikut MEMUTUSKAN arah, bukan hanya dipandang</JudulKecil>
          <div className="space-y-2">
            {s.kesaksian.length ? s.kesaksian.map((k, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-neutral-100">{k.dari}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black ${k.vote === 'NAIK' ? 'bg-emerald-500/20 text-emerald-300' : k.vote === 'TURUN' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/10 text-neutral-300'}`}>{k.vote}</span>
                  <span className="ml-auto text-[10px] text-neutral-400">kekuatan {k.kekuatan}</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-400">{k.cara}</p>
              </div>
            )) : <p className="text-[12px] text-neutral-400">belum ada kesaksian — sumber hidup belum bersuara kali ini.</p>}
          </div>
          {s.votoMasukVonis.aktif && <p className="mt-2 rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/5 p-2 text-[11px] leading-relaxed text-fuchsia-200">{s.votoMasukVonis.teks}</p>}
          <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">kesaksian agregat menjadi bukti AR-E9 &ldquo;Matriks Sumber&rdquo; (bobot 0.08) di dewan arahVonis — bila sumber melawan vonis, keyakinan dipangkas nyata; bila sumber saling menyangkal, semua dibaca tanpa ada yang dibungkam.</p>
        </Kartu>
      </div>

      {/* ===== RUH MATRIKS v2 — bentrokan validasi silang ===== */}
      {s.bentrokan.length > 0 && (
        <Kartu className="border-rose-400/30 bg-rose-500/5">
          <JudulKecil warna="text-rose-300">bentrokan antar sumber — validasi silang: bila sumber saling menyangkal, otak menolak menelan mentah-mentah</JudulKecil>
          <div className="space-y-2">
            {s.bentrokan.map((b, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-black text-rose-300">{b.topik}</span>
                  <span className="text-[10px] text-neutral-400">{b.sumber.join('  vs  ')}</span>
                  {b.selisihPct !== null && <span className="ml-auto text-[10px] font-black text-amber-300">selisih {b.selisihPct}%</span>}
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-300">{b.putusan}</p>
              </div>
            ))}
          </div>
        </Kartu>
      )}

      {/* ===== banner unlock — cliff & vesting ===== */}
      <Kartu className={u && u.hariDariSekarang <= 14 ? 'border-rose-400/40 bg-rose-500/5' : ''}>
        <JudulKecil warna="text-rose-300">jadwal unlock (cliff + vesting) — tekanan jual terjadwal yang bisa dibaca di muka</JudulKecil>
        {u ? (
          <>
            <div className="grid gap-3 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black text-rose-300">{u.hariDariSekarang}</div>
                <div className="mt-1 text-[11px] text-neutral-400">hari lagi menuju unlock berikutnya ({u.tanggal})</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black text-amber-300">{fmtToken(u.token)}</div>
                <div className="mt-1 text-[11px] text-neutral-400">ELSA akan buka ({u.pctTotal.toFixed(2)}% total supply)</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black text-neutral-100">${fmtToken(u.usd)}</div>
                <div className="mt-1 text-[11px] text-neutral-400">nilai overhang ≈ {u.pctVsBeredar.toFixed(1)}% dari beredar</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black text-emerald-300">{(s.unlock?.terbukaPct ?? 0).toFixed(1)}%</div>
                <div className="mt-1 text-[11px] text-neutral-400">sudah terbuka · {fmtToken(s.unlock?.terkunciToken ?? 0)} masih terkunci</div>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[420px] text-left text-[12px]">
                <thead className="bg-white/5 text-neutral-300"><tr><th className="px-2 py-1.5">alokasi</th><th>token</th><th>nilai</th><th>jenis vesting</th></tr></thead>
                <tbody className="text-neutral-400">
                  {u.rincian.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="px-2 py-1.5 text-neutral-200">{r.alokasi}</td>
                      <td>{fmtToken(r.token)}</td>
                      <td>${fmtToken(r.usd)}</td>
                      <td>{r.tipe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-neutral-500">Hukum bacaan: cliff besar tidak biasa menunggu tanggalnya — bumbukan jual bisa terjadi SEBELUM unlock (pasar mengantisipasi). Sumber: CMC tokenUnlockLatest (setara Tokenomist, self-reported: {s.unlock?.selfReported ? 'ya' : 'tidak'}).</p>
          </>
        ) : (
          <p className="text-sm text-neutral-300">jadwal unlock belum terbaca kali ini — cliff &amp; vesting tetap diawasi manual.</p>
        )}
      </Kartu>

      {/* ===== supply & CEX/DEX ===== */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Kartu>
          <JudulKecil>supply &amp; dilusi — FDV vs kapitalisasi beredar</JudulKecil>
          <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-amber-300">{fmtToken(s.supply?.beredar ?? 0)}</div><div className="text-[11px] text-neutral-400">beredar</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black">{fmtToken(s.supply?.total ?? 0)}</div><div className="text-[11px] text-neutral-400">total supply</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black">{s.supply?.maks ? fmtToken(s.supply.maks) : '—'}</div><div className="text-[11px] text-neutral-400">maks supply</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-neutral-100">{s.supply?.rasioFdvMcap !== null && s.supply?.rasioFdvMcap !== undefined ? `${s.supply.rasioFdvMcap.toFixed(1)}×` : '—'}</div><div className="text-[11px] text-neutral-400">FDV / mcap</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black">{s.supply?.fdvUsd ? `$${fmtToken(s.supply.fdvUsd)}` : '—'}</div><div className="text-[11px] text-neutral-400">FDV</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black">{s.supply?.mcapUsd ? `$${fmtToken(s.supply.mcapUsd)}` : '—'}</div><div className="text-[11px] text-neutral-400">market cap</div></div>
          </div>
          {s.supply?.beredarSelfReported ? <p className="mt-2 text-[11px] text-neutral-500">self-reported beredar {fmtToken(s.supply.beredarSelfReported)} vs angka bursa {fmtToken(s.supply.beredar)} — selisih dilusi bila proyek mengaku lebih kecil dari realita.</p> : null}
          <p className="mt-1 text-[11px] text-neutral-500">harga agregat ${s.supply?.hargaUsd ? fmtHarga(s.supply.hargaUsd) : '—'} · 24j {pct(s.supply?.ubah24j ?? null)} · 7d {pct(s.supply?.ubah7d ?? null)}</p>
        </Kartu>
        <Kartu>
          <JudulKecil>warna dana: CEX vs DEX — di mana volume berputar</JudulKecil>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-amber-300">${fmtToken(s.cexDex?.cexUsd ?? 0)}</div><div className="text-[11px] text-neutral-400">volume CEX 24j</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black text-teal-300">${fmtToken(s.cexDex?.dexUsd ?? 0)}</div><div className="text-[11px] text-neutral-400">volume DEX 24j</div></div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3"><div className="text-lg font-black">{s.cexDex?.dexSharePct !== null && s.cexDex?.dexSharePct !== undefined ? `${s.cexDex.dexSharePct.toFixed(1)}%` : '—'}</div><div className="text-[11px] text-neutral-400">porsi DEX</div></div>
          </div>
          <p className="mt-2 text-[11px] text-neutral-500">tekanan beli on-chain (jumlah transaksi buy vs sell di DEX 24j): <strong className={s.deksTekananBeliPct !== null && s.deksTekananBeliPct >= 50 ? 'text-emerald-300' : 'text-rose-300'}>{s.deksTekananBeliPct !== null ? `${s.deksTekananBeliPct.toFixed(0)}% beli` : '—'}</strong> — proksi kerumunan retail di rantai. Venue pemimpin volume CEX: <strong className="text-amber-300">{s.venueMemimpin ?? '—'}</strong> · dislokasi harga lintas venue {s.dislokasiHargaPct !== null ? `${s.dislokasiHargaPct.toFixed(2)}%` : '—'}.</p>
          <p className="mt-1 text-[10px] text-neutral-600">{s.cexDex?.sumber}</p>
        </Kartu>
      </div>

      {/* ===== tickers lintas venue ===== */}
      <Kartu>
        <JudulKecil warna="text-cyan-300">tickers lintas venue — venue mana memimpin &amp; harga mana paling mahal</JudulKecil>
        <div className="max-h-80 overflow-y-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[640px] text-left text-[11px]">
            <thead className="bg-white/5 text-neutral-300 sticky top-0">
              <tr><th className="px-2 py-1.5">venue</th><th>pasangan</th><th>harga</th><th>deviasi</th><th>vol 24j</th><th>share</th><th>trust</th></tr>
            </thead>
            <tbody className="font-mono">
              {s.tickers.map((t, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-2 py-1.5 text-neutral-200">{t.venue}{t.anomali ? ' ⚠' : ''}</td>
                  <td className="text-neutral-400">{t.pasangan}</td>
                  <td className="text-neutral-200">${fmtHarga(t.harga)}</td>
                  <td className={t.deviasiPct >= 0.2 ? 'text-emerald-300' : t.deviasiPct <= -0.2 ? 'text-rose-300' : 'text-neutral-400'}>{pct(t.deviasiPct, 2)}</td>
                  <td className="text-neutral-300">${fmtToken(t.vol24Usd)}</td>
                  <td className="text-neutral-400">{t.sharePct.toFixed(1)}%</td>
                  <td className={t.trust === 'green' ? 'text-emerald-400' : t.trust === 'yellow' ? 'text-amber-400' : 'text-neutral-500'}>{t.trust}</td>
                </tr>
              ))}
              {s.tickers.length === 0 && <tr><td className="px-2 py-3 text-neutral-500" colSpan={7}>tickers belum terbaca (rate-limit CoinGecko) — dicoba lagi otomatis</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">harga venue termahal memancing jual, termurah memancing beli — arah biasanya ditentukan venue bervolume terbesar. Sumber: CoinGecko tickers.</p>
      </Kartu>

      {/* ===== DEX pairs ===== */}
      <Kartu>
        <JudulKecil warna="text-teal-300">aktivitas DEX (Base chain) — likuiditas &amp; tekanan beli/jual per pool</JudulKecil>
        <div className="max-h-72 overflow-y-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[640px] text-left text-[11px]">
            <thead className="bg-white/5 text-neutral-300 sticky top-0">
              <tr><th className="px-2 py-1.5">dex</th><th>pool</th><th>likuiditas</th><th>vol 24j</th><th>buy/sell</th><th>tekanan beli</th><th>sejak</th></tr>
            </thead>
            <tbody className="font-mono">
              {s.dexPairs.map((p, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-2 py-1.5 text-neutral-200">{p.dex}</td>
                  <td className="text-neutral-400">{p.pasangan}</td>
                  <td className="text-neutral-300">${fmtToken(p.likuidasiUsd)}</td>
                  <td className="text-neutral-300">${fmtToken(p.vol24Usd)}</td>
                  <td className="text-neutral-400">{p.beli.toLocaleString('id-ID')}/{p.jual.toLocaleString('id-ID')}</td>
                  <td className={p.tekananBeliPct !== null && p.tekananBeliPct >= 50 ? 'text-emerald-300' : 'text-rose-300'}>{p.tekananBeliPct !== null ? `${p.tekananBeliPct.toFixed(0)}%` : '—'}</td>
                  <td className="text-neutral-500">{p.dibuat ?? '—'}</td>
                </tr>
              ))}
              {s.dexPairs.length === 0 && <tr><td className="px-2 py-3 text-neutral-500" colSpan={7}>pool DEX belum terbaca kali ini</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">Sumber: DEXScreener + GeckoTerminal (kontrak {s.dexPairs.length ? '0x29cC…DcA di Base' : '—'}).</p>
      </Kartu>

      {/* ===== matriks sumber ===== */}
      <Kartu>
        <JudulKecil>warna matriks sumber — {s.sumberHidup} HIDUP · {s.sumberTerwakili} TERWAKILI · {s.sumberTerkunci} terkunci/mati (jujur)</JudulKecil>
        <p className="mb-3 text-[12px] text-neutral-400">
          Hukum panel ini: sumber yang butuh kunci tidak boleh pura-pura ada. <span className="text-emerald-300">HIDUP</span> = data nyata masuk. <span className="text-violet-300">TERWAKILI</span> = API-nya terkunci, tapi data yang sama sudah dibaca LANGSUNG dari venue asalnya (lebih baik daripada agregator). <span className="text-amber-300">TERKUNCI</span> = titik buta yang diakui. <span className="text-neutral-400">TIDAK_TERDAFTAR</span> = venue memang tidak memasangkan ELSA.
        </p>
        <div className="space-y-4">
          {katOrder.map((kat) => {
            const baris = s.matriks.filter((m) => m.kategori === kat);
            if (!baris.length) return null;
            return (
              <div key={kat}>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">{kat}</div>
                <div className="space-y-1.5">
                  {baris.map((m, i) => (
                    <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[12px] font-semibold text-neutral-100">{m.sumber}</span>
                        <Badge tone={STATUS_SUMBER_TONE[m.status]}>{m.status.replace('_', ' ')}</Badge>
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-neutral-400">{m.apa}</div>
                      <div className="mt-1 text-[11px] leading-snug text-neutral-500">{m.catatan}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Kartu>

      {/* ===== catatan jujur ===== */}
      <Kartu className="border-amber-400/30">
        <JudulKecil>catatan jujur otak sumber — kunci rahasia &amp; titik buta</JudulKecil>
        <ul className="space-y-2 text-[12px] leading-relaxed text-neutral-300">
          {s.catatanJujur.map((c, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-amber-400">▸</span><span>{c}</span></li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-neutral-500">diperbarui {new Date(s.at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} · cache 5 menit per sumber · sumber mati dicoba lagi otomatis tiap segarkan.</p>
      </Kartu>
    </div>
  );
}

// ============================================================
// TAB PETA WAKTU — time traveler roadmap.
// Menjawab permintaan pemilik: "di 0.05 harusnya kita bisa tau dia
// akan ke 0.1 pada TANGGAL sekian; di 0.1 juga harus tau akan ke
// mana — turun curam atau naik." Tiga lapisan: ke mana (waypoint),
// kapan (tanggal kedatangan), sesudahnya (LANJUT/JATUH_CURAM/ISTIRAHAT)
// + uji mundur pada sejarah nyata ELSA (kasus 0.05 → 0.1 ada di tabel).
// ============================================================
function TabPeta({ p, l }: { p: PetaWaktuData; l: LintasanJiwa | null }) {
  const hariIni = new Date().toISOString().slice(0, 10);
  const labelMagnet: Record<string, string> = {
    'likuidasi-short': 'likuidasi short', 'likuidasi-long': 'likuidasi long',
    'portal-waktu': 'portal waktu', resistensi: 'resistensi 90h',
    'level-bulat': 'level bulat', poc: 'poc volume', ema: 'EMA', unlock: 'unlock',
  };
  const toneTitik = (n: string) => (n === 'LANJUT' ? { b: 'border-emerald-400/40', t: 'text-emerald-300', i: '▸ LANJUT NAIK' } : n === 'JATUH_CURAM' ? { b: 'border-rose-400/40', t: 'text-rose-300', i: '▾ JATUH CURAM' } : { b: 'border-amber-400/40', t: 'text-amber-300', i: '◆ ISTIRAHAT' });
  return (
    <div className="space-y-4">
      {/* ===== OTAK LINTASAN — urutan magnet & pola (lintasan-v1) ===== */}
      {l && <PanelLintasan l={l} />}

      {/* ===== arah yang sedang digerakan ===== */}
      <Kartu className={p.arahDominan === 'NAIK' ? 'border-emerald-400/40' : p.arahDominan === 'TURUN' ? 'border-rose-400/40' : 'border-amber-400/40'}>
        <JudulKecil warna={p.arahDominan === 'NAIK' ? 'text-emerald-300' : p.arahDominan === 'TURUN' ? 'text-rose-300' : 'text-amber-300'}>arah yang sedang digerakan (bukan sekadar &quot;akan naik ke sekian&quot;)</JudulKecil>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-400/20 bg-black/30 p-3">
            <div className="text-[11px] text-neutral-400">bensin NAIK</div>
            <div className="text-3xl font-black text-emerald-300">{p.bensinNaik.skor}</div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.min(100, p.bensinNaik.skor)}%` }} /></div>
            <div className="mt-1 text-[10px] text-neutral-500">{p.bensinNaik.ket}</div>
          </div>
          <div className="rounded-lg border border-rose-400/20 bg-black/30 p-3">
            <div className="text-[11px] text-neutral-400">bensin TURUN</div>
            <div className="text-3xl font-black text-rose-300">{p.bensinTurun.skor}</div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-rose-400" style={{ width: `${Math.min(100, p.bensinTurun.skor)}%` }} /></div>
            <div className="mt-1 text-[10px] text-neutral-500">{p.bensinTurun.ket}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-[11px] text-neutral-400">kecepatan terukur</div>
            <div className="text-2xl font-black text-neutral-100">{p.kecepatan.pctPerHariNaik.toFixed(2)}%/hr</div>
            <div className="text-[11px] text-neutral-400">turun: {p.kecepatan.pctPerHariTurun.toFixed(2)}%/hr</div>
            <div className="mt-1 text-[10px] leading-snug text-neutral-500">{p.kecepatan.sumber}</div>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-neutral-200">{p.narasiArah}</p>
        <p className="mt-1 text-[11px] text-neutral-500">harga saat peta digambar ${fmtHarga(p.harga)} · margin bensin {p.marginArah > 0 ? '+' : ''}{p.marginArah} poin</p>
      </Kartu>

      {/* ===== komponen bensin (sumber diperlihatkan) ===== */}
      <div className="grid gap-4 lg:grid-cols-2">
        {(['naik', 'turun'] as const).map((sisi) => {
          const b = sisi === 'naik' ? p.bensinNaik : p.bensinTurun;
          return (
            <Kartu key={sisi} className={sisi === 'naik' ? 'border-emerald-400/20' : 'border-rose-400/20'}>
              <JudulKecil warna={sisi === 'naik' ? 'text-emerald-300' : 'text-rose-300'}>komponen bensin {sisi.toUpperCase()} — setiap angka punya sumber</JudulKecil>
              <div className="space-y-1.5">
                {b.komponen.map((k, i) => (
                  <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] font-semibold text-neutral-100">{k.k}</span>
                      <span className={`font-mono text-[12px] font-bold ${sisi === 'naik' ? 'text-emerald-300' : 'text-rose-300'}`}>+{k.v}</span>
                    </div>
                    <div className="mt-0.5 text-[10px] leading-snug text-neutral-500">{k.sumber}</div>
                  </div>
                ))}
              </div>
            </Kartu>
          );
        })}
      </div>

      {/* ===== unlock gate ===== */}
      {p.unlockGate && (
        <Kartu className={p.unlockGate.hariDariSekarang <= 14 && p.unlockGate.pctVsBeredar >= 3 ? 'border-rose-400/40 bg-rose-500/5' : ''}>
          <JudulKecil warna="text-rose-300">tembok unlock di jalur waktu — satu-satunya peristiwa ber-TANGGAL pasti</JudulKecil>
          <p className="text-[13px] text-neutral-200">
            unlock <strong className="text-rose-300">{p.unlockGate.tanggal}</strong> ({p.unlockGate.hariDariSekarang} hari lagi) · {p.unlockGate.pctVsBeredar.toFixed(1)}% dari beredar ≈ ${Math.round(p.unlockGate.usd).toLocaleString('id-ID')} — {p.unlockGate.efek}
          </p>
        </Kartu>
      )}

      {/* ===== jalur utama — roadmap vertikal ===== */}
      <Kartu>
        <JudulKecil warna={p.arahDominan === 'TURUN' ? 'text-rose-300' : 'text-emerald-300'}>
          jalur utama — ke mana &amp; tiba kapan; di tiap waypoint: lanjut, curam, atau istirahat
        </JudulKecil>
        <div className="mt-2 space-y-0">
          {/* titik sekarang */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 shrink-0 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
            <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-[12px]">
              <strong className="text-amber-300">SEKARANG {hariIni} · ${fmtHarga(p.harga)}</strong> — titik nol semua tanggal di bawah dihitung dari sini
            </div>
          </div>
          {p.kaki.map((k, i) => {
            const t = p.titik[i];
            const tone = t ? toneTitik(t.negara) : null;
            return (
              <div key={i} className="ml-[5px] border-l-2 border-white/10 pl-6">
                {/* kaki */}
                <div className="relative py-3">
                  <div className={`absolute -left-[9px] top-5 h-4 w-4 rounded-full border-2 ${k.jenisMagnet.startsWith('likuidasi') ? 'border-violet-400 bg-violet-400/30' : k.jenisMagnet === 'portal-waktu' ? 'border-cyan-400 bg-cyan-400/30' : 'border-white/40 bg-white/10'}`} />
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-lg font-black text-neutral-100">${fmtHarga(k.ke)}</span>
                      <Badge tone="ungu">{labelMagnet[k.jenisMagnet] ?? k.jenisMagnet}</Badge>
                      <span className="font-mono text-[12px] text-emerald-300">+{k.jarakPct.toFixed(1)}%</span>
                      <span className="text-[12px] text-neutral-300">tiba <strong className="text-amber-300">{k.tanggalKedatangan}</strong> (hari ke-{k.hariKumulatif} · rentang {k.rentangTanggal})</span>
                      <span className="text-[12px] text-neutral-300">peluang <strong className={k.peluang >= 0.5 ? 'text-emerald-300' : 'text-amber-300'}>{(k.peluang * 100).toFixed(0)}%</strong></span>
                    </div>
                    <p className="mt-1 text-[12px] leading-snug text-neutral-400">{k.narasi}</p>
                    <p className="mt-1 text-[10px] text-neutral-500">sumber: {k.sumberBensin.join(' · ')}</p>
                  </div>
                </div>
                {/* keputusan di waypoint */}
                {t && tone && (
                  <div className={`rounded-xl border ${tone.b} bg-black/20 p-3`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className={`text-[13px] ${tone.t}`}>DI LEVEL ${fmtHarga(t.harga)} → {tone.i}</strong>
                      {t.negara === 'JATUH_CURAM' && t.sasaranCuram && (
                        <span className="text-[12px] text-rose-200">jatuh ke <strong>${fmtHarga(t.sasaranCuram)}</strong> ≈ {t.hariCuram} hr ({t.tanggalCuram}) · p curam {(t.pCuram * 100).toFixed(0)}%</span>
                      )}
                    </div>
                    <ul className="mt-1.5 space-y-1 text-[11px] leading-snug text-neutral-400">
                      {t.alasan.map((a, j) => <li key={j} className="flex items-start gap-1.5"><span className={tone.t}>▸</span><span>{a}</span></li>)}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          {p.kaki.length === 0 && <p className="py-3 text-[12px] text-neutral-400">jalur utama belum punya magnet — bensin arah dominan terlalu tipis hari ini.</p>}
        </div>
        <p className="mt-3 text-[10px] leading-snug text-neutral-500">{p.metode}</p>
      </Kartu>

      {/* ===== skenario risiko berlawanan ===== */}
      {p.kakiTurun && (
        <Kartu className="border-rose-400/40">
          <JudulKecil warna="text-rose-300">skenario risiko — kalau bensin turun yang picut (dipamerkan, tidak disembunyikan)</JudulKecil>
          <div className="rounded-xl border border-rose-400/30 bg-black/30 p-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-lg font-black text-neutral-100">${fmtHarga(p.kakiTurun.ke)}</span>
              <Badge tone="merah">{labelMagnet[p.kakiTurun.jenisMagnet] ?? p.kakiTurun.jenisMagnet}</Badge>
              <span className="font-mono text-[12px] text-rose-300">{p.kakiTurun.jarakPct.toFixed(1)}%</span>
              <span className="text-[12px] text-neutral-300">tiba <strong className="text-rose-300">{p.kakiTurun.tanggalKedatangan}</strong> (rentang {p.kakiTurun.rentangTanggal}) · peluang <strong>{(p.kakiTurun.peluang * 100).toFixed(0)}%</strong></span>
            </div>
            <p className="mt-1 text-[12px] text-neutral-400">{p.kakiTurun.narasi}</p>
          </div>
          {p.titikTurun && (
            <div className="mt-2 rounded-xl border border-rose-400/20 bg-black/20 p-3">
              <div className="text-[12px] text-neutral-200">
                DI LEVEL ${fmtHarga(p.titikTurun.harga)} → <strong className={p.titikTurun.negara === 'JATUH_CURAM' ? 'text-rose-300' : 'text-amber-300'}>{p.titikTurun.negara.replace('_', ' ')}</strong>
                {p.titikTurun.sasaranCuram && <> — kaskade lanjut ke <strong>${fmtHarga(p.titikTurun.sasaranCuram)}</strong> ({p.titikTurun.hariCuram} hr lagi)</>}
              </div>
              <ul className="mt-1 space-y-1 text-[11px] text-neutral-400">
                {p.titikTurun.alasan.map((a, j) => <li key={j}>▸ {a}</li>)}
              </ul>
            </div>
          )}
        </Kartu>
      )}

      {/* ===== uji mundur — bukti pada sejarah nyata ===== */}
      <Kartu>
        <JudulKecil warna="text-cyan-300">uji mundur — engine yang sama dijalankan BUTA pada sejarah nyata ELSA (kasus &quot;0.05 → 0.1&quot; ada di sini)</JudulKecil>
        <div className="mb-2 flex flex-wrap gap-2 text-[12px]">
          <Badge tone="hijau">TEPAT (0.75–1.33× ETA): {p.ujiMundur.tepat}</Badge>
          <Badge tone="amber">DEKAT (0.6–2.0×): {p.ujiMundur.dekat}</Badge>
          <Badge tone="merah">MELESET: {p.ujiMundur.meleset}</Badge>
          {p.ujiMundur.rerataSelisihHari !== null && <Badge tone="netral">rerata selisih {p.ujiMundur.rerataSelisihHari} hari</Badge>}
        </div>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[720px] text-left text-[11px]">
            <thead className="bg-white/5 text-neutral-300">
              <tr><th className="px-2 py-1.5">mulai</th><th>harga</th><th>sasaran</th><th>eta (prediksi)</th><th>nyata</th><th>selisih</th><th>hasil</th><th>kelanjutan yang peta tangkap</th></tr>
            </thead>
            <tbody className="font-mono">
              {p.ujiMundur.baris.map((b, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-2 py-1.5 text-neutral-300">{b.mulaiHari}</td>
                  <td className="text-neutral-200">${fmtHarga(b.mulaiHarga)}</td>
                  <td className="text-neutral-200">${fmtHarga(b.sasaran)} (+{b.sasaranPct.toFixed(0)}%)</td>
                  <td className="text-amber-300">{b.etaTanggal} ({b.etaHari} hr)</td>
                  <td className="text-emerald-300">{b.nyataHari ?? '—'}</td>
                  <td className={b.selisihHari !== null && Math.abs(b.selisihHari) <= 3 ? 'text-emerald-300' : b.selisihHari !== null && Math.abs(b.selisihHari) <= 7 ? 'text-amber-300' : 'text-rose-300'}>{b.selisihHari === null ? '—' : `${b.selisihHari > 0 ? '+' : ''}${b.selisihHari} hr`}</td>
                  <td><Badge tone={b.hasil === 'TEPAT' ? 'hijau' : b.hasil === 'DEKAT' ? 'amber' : b.hasil === 'MELESET' ? 'merah' : 'netral'}>{b.hasil.replace('_', ' ')}</Badge></td>
                  <td className="font-sans text-[11px] text-neutral-400">{b.lanjutanPeta}</td>
                </tr>
              ))}
              {p.ujiMundur.baris.length === 0 && <tr><td colSpan={8} className="px-2 py-3 text-neutral-500">belum ada pivot yang memenuhi syarat pada 200 candle harian.</td></tr>}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">{p.ujiMundur.ket}</p>
      </Kartu>

      {/* ===== kejujuran ===== */}
      <Kartu className="border-amber-400/30">
        <JudulKecil>kejujuran peta waktu — apa yang dijanjikan &amp; apa yang tidak</JudulKecil>
        <ul className="space-y-2 text-[12px] leading-relaxed text-neutral-300">
          {p.kejujuran.map((c, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-amber-400">▸</span><span>{c}</span></li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] text-neutral-500">diperbarui {new Date(p.at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} · cache 60 detik · selaras dengan vonis diawasi SL-15 otak selaras.</p>
      </Kartu>
    </div>
  );
}

// ============================================================
// PANEL OTAK LINTASAN (lintasan-v1) — jawaban keluhan pemilik:
// "magnet ada kesekian, tapi mana DULU yang akan ditarik? lalu naik
// atau turun? harusnya TAHU, bukan masih bertanya 'hmm naik turun ya'."
// Menampilkan: urutan tarikan (formula terbuka), pola lintasan bernama
// (dua kaki), prediksi terbuka + rekam jejak kalibrasi + kepahaman pola.
// ============================================================
function PanelLintasan({ l }: { l: LintasanJiwa }) {
  const statusBadge = (s: string) =>
    s === 'DITEPATI' ? { tone: 'hijau' as const, t: s } :
    s === 'GAGAL' ? { tone: 'merah' as const, t: s } :
    s === 'URUT_SALAH' ? { tone: 'merah' as const, t: 'URUTAN SALAH' } :
    s === 'MELEWAT' ? { tone: 'amber' as const, t: 'MELEWAT' } : { tone: 'ungu' as const, t: s };
  const labelLanjut = (t: string) => (t === 'LANJUT_KE' ? 'LANJUT ke' : t === 'ANTUK_KE' ? 'ANTUK ke' : 'REBOUND ke');
  return (
    <Kartu className="border-cyan-400/40">
      <JudulKecil warna="text-cyan-300">
        otak lintasan — mana magnet DITARIK DULU, lalu harga jadi apa (bukan lagi &quot;hmm naik turun ya&quot;)
      </JudulKecil>
      <p className="mt-1 text-[12px] text-neutral-300">{l.vitamin.teks}</p>

      {/* urutan tarikan */}
      <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-[12px] font-semibold text-neutral-100">URUTAN TARIKAN — tarikan atas <strong className="text-emerald-300">{l.tarikanAtas}</strong> vs bawah <strong className="text-rose-300">{l.tarikanBawah}</strong></span>
          <span className="ml-auto text-[10px] text-neutral-500">T = 100×(0.26 kerapatan + 0.22 gravitasi + 0.16 bensin + 0.12 sisi sesak + 0.10 OI + 0.08 whale + 0.06 usia dinding)</span>
        </div>
        <div className="mt-2 space-y-2">
          {l.urutan.map((m, i) => (
            <div key={i} className={`rounded-lg border p-2.5 ${i === 0 ? (m.sisi === 'ATAS' ? 'border-emerald-400/50 bg-emerald-500/5' : 'border-rose-400/50 bg-rose-500/5') : 'border-white/10 bg-black/20'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-black ${i === 0 ? 'bg-cyan-400 text-black' : 'bg-white/10 text-neutral-300'}`}>M{i + 1}</span>
                <span className="font-mono text-[14px] font-bold text-neutral-100">${fmtHarga(m.harga)}</span>
                <Badge tone={m.sisi === 'ATAS' ? 'hijau' : 'merah'}>{m.sisi}</Badge>
                <span className="text-[11px] text-neutral-400">{m.jenis} · korban {m.usd >= 1000 ? `$${(m.usd / 1000).toFixed(0)}rb` : '$0'}</span>
                <span className="ml-auto font-mono text-[13px] font-black text-cyan-300">T {m.tarikan}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-400/80" style={{ width: `${Math.min(100, m.tarikan)}%` }} /></div>
              {i === 0 && (
                <ul className="mt-1.5 space-y-0.5 text-[10px] leading-snug text-neutral-400">
                  {m.bukti.map((b, j) => <li key={j}>▸ {b}</li>)}
                </ul>
              )}
            </div>
          ))}
          {l.urutan.length === 0 && <p className="text-[12px] text-neutral-400">belum ada magnet terbaca — peta likuidasi menyusul.</p>}
        </div>
      </div>

      {/* pola lintasan */}
      {l.pola && (
        <div className={`mt-3 rounded-xl border p-3 ${l.pola.arahPertama === 'NAIK' ? 'border-emerald-400/30 bg-emerald-500/5' : 'border-rose-400/30 bg-rose-500/5'}`}>
          <div className="flex flex-wrap items-center gap-2">
            <strong className={`text-[14px] ${l.pola.arahPertama === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}`}>POLA: {l.pola.pola}</strong>
            <Badge tone="netral">margin tarikan {l.pola.marginTarikan > 0 ? '+' : ''}{l.pola.marginTarikan} poin</Badge>
          </div>
          <p className="mt-1 text-[12px] text-neutral-200">{l.pola.judul}</p>
          <ol className="mt-2 space-y-1 text-[12px] leading-relaxed text-neutral-300">
            {l.pola.rantai.map((r, j) => <li key={j} className="flex items-start gap-1.5"><span className="text-cyan-400">{j + 1}.</span><span>{r}</span></li>)}
          </ol>
          {l.pola.lanjutan && (
            <div className="mt-2 rounded-lg border border-white/10 bg-black/30 p-2 text-[11px] text-neutral-300">
              <strong className="text-amber-300">{labelLanjut(l.pola.lanjutan.tipe)} ${fmtHarga(l.pola.lanjutan.harga)}</strong> — {l.pola.lanjutan.label}
              <ul className="mt-1 space-y-0.5 text-[10px] text-neutral-400">{l.pola.lanjutan.dasar.map((d, j) => <li key={j}>▸ {d}</li>)}</ul>
            </div>
          )}
          <p className="mt-2 text-[11px] text-neutral-500">kenapa bukan pola lain: {l.pola.alasanTidakLain}</p>
        </div>
      )}

      {/* prediksi terbuka + kalibrasi */}
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="text-[12px] font-semibold text-neutral-100">prediksi terbuka ({l.keyakinanTerbuka.length}) · kalibrasi {l.kalibrasi.nBenar}/{l.kalibrasi.nTerjawab} = {Math.round(l.kalibrasi.akurasi * 100)}%</div>
          <div className="mt-2 space-y-2">
            {l.keyakinanTerbuka.map((b) => (
              <div key={b.id} className="rounded-lg border border-cyan-400/20 bg-black/30 p-2.5">
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="font-mono text-cyan-300">{b.id}</span>
                  <strong className="text-neutral-100">{b.pola}</strong>
                  <span className="text-neutral-400">K={b.keyakinan}</span>
                  <span className="ml-auto text-neutral-500">deadline {new Date(b.deadlineAt).toLocaleTimeString('id-ID')}</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-300">{b.dasar}</p>
                <div className="mt-1 flex flex-wrap gap-1 text-[9px] font-mono text-neutral-500">
                  {Object.entries(b.komponen).map(([k, v]) => <span key={k} className="rounded bg-white/5 px-1 py-0.5">{k}={v}</span>)}
                </div>
                <p className="mt-1 text-[10px] text-neutral-500">diadili candle 1j: kaki-1 urutan (M1 sebelum lawan), kaki-2 lanjutan — URUT_SALAH/MELEWAT dihitung salah</p>
              </div>
            ))}
            {l.keyakinanTerbuka.length === 0 && <p className="text-[11px] text-neutral-400">tak ada prediksi terbuka — tarikan tipis/magnet kosong; otak jujur menunggu, tidak memaksakan pola.</p>}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="text-[12px] font-semibold text-neutral-100">kepahaman pola &amp; aturan (n/benar/akurasi)</div>
          <div className="mt-2 space-y-1">
            {l.kepahaman.slice(0, 8).map((k) => (
              <div key={k.kunci} className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 p-2">
                <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${k.akurasi >= 0.6 ? 'bg-emerald-400/20 text-emerald-300' : k.akurasi <= 0.4 ? 'bg-rose-400/20 text-rose-300' : 'bg-white/10 text-neutral-300'}`}>{k.benar}/{k.n} = {Math.round(k.akurasi * 100)}%</span>
                <span className="text-[10px] leading-snug text-neutral-400">{k.judul}</span>
              </div>
            ))}
            {l.kepahaman.length === 0 && <p className="text-[11px] text-neutral-400">belum ada pola yang diadili candle — rapor terisi otomatis tiap prediksi selesai.</p>}
          </div>
        </div>
      </div>

      {/* selesai + diary */}
      {l.keyakinanSelesai.length > 0 && (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="text-[12px] font-semibold text-neutral-100">riwayat prediksi dijawab candle 1j (12 terakhir)</div>
          <div className="mt-2 space-y-1.5">
            {l.keyakinanSelesai.map((b) => {
              const sb = statusBadge(b.status);
              return (
                <div key={b.id} className="rounded-lg border border-white/10 bg-black/20 p-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="font-mono text-neutral-400">{b.id}</span>
                    <strong className="text-neutral-100">{b.pola}</strong>
                    <Badge tone={sb.tone}>{sb.t}</Badge>
                    <span className="ml-auto text-[10px] text-neutral-500">{b.dijawabAt ? new Date(b.dijawabAt).toLocaleString('id-ID') : '—'}</span>
                  </div>
                  {b.cerita && <p className="mt-0.5 text-[10px] leading-snug text-neutral-400">{b.cerita}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {l.diary.length > 0 && (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="text-[12px] font-semibold text-neutral-100">diary otak lintasan (terbaru dulu)</div>
          <ul className="mt-1.5 space-y-1">
            {l.diary.slice(0, 6).map((d, i) => (
              <li key={i} className="text-[10px] leading-snug text-neutral-400"><span className="font-mono text-neutral-500">{new Date(d.at).toLocaleTimeString('id-ID')}</span> — {d.teks}</li>
            ))}
          </ul>
        </div>
      )}

      <ul className="mt-3 space-y-1 text-[11px] text-neutral-400">
        {l.jujur.map((j, i) => <li key={i} className="flex items-start gap-1.5"><span className="text-amber-400">▸</span><span>{j}</span></li>)}
      </ul>
      <p className="mt-2 text-[11px] text-neutral-500">denyut ke-{l.denyutKe} · {new Date(l.at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} · kesaksian duduk di dewan arah AR-E12 (bobot 0.09) — E12 DIPAKAI memutuskan, bukan pajangan.</p>
    </Kartu>
  );
}
