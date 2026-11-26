// ============================================================
// MICAPROFITA-ELSA · JIWA RADAR PAUS V2 — kualitas dinaikkan
// (keluhan pemilik 2026-11-25, lanjutan): "Jujur saja radar paus masih
// perlu ditingkatkan karena masih terasa kualitasnya rendah."
// Diagnosa jujur jiwa v1: PAUS-01 dulu = BUCKET kerumunan (semua cetakan
// $500–5rb digabung jadi satu "paus") — itulah asal rasanya murahan.
// v2 memperbaiki lima organ:
//   1. IDENTITAS PAUS-ASLI — neuron hanya lahir dari cetakan KELAS PAUS
//      (≥ ambang paus $2000–8000 ≈ 15× median), dan dicocokkan antar
//      denyut lewat SIDIK UKURAN (0,4×–2,5× median ukurannya + venue +
//      sisi + umur < 90 menit). Kerumunan $500-an TIDAK LAGI menyamar
//      jadi paus.
//   2. REKAM JEJAK PER PAUS — tiap paus mencatat duel benar/salah;
//      reputasi masuk formula keyakinan: paus yang sering salah DIDEMOT,
//      paus yang menepat naik kelas:
//        K = clamp(0,30 + 0,14·ln(1+denyut) + 0,35·konsistensi
//                  + 0,20·kesegaran + 0,10·reputasi, 0, 0,95)
//   3. DINDING PAUS — dinding bid/ask besar di orderbook 3 venue
//      dilacak lintas denyut: lahir, digigit, PATAH DIMAKAN (harga
//      tembus = paus penjaga KALAH dimakan penyerang), MUNDUR (bait).
//      Ini bukti medan NYATA "siapa makan siapa" — bukan cuma angka.
//   4. KEPAHAMAN TERTAMBANG — tiap duel dijawab candle nyata; aturan
//      (funding/OI/dinding/kerumunan/tenaga) dinilai: aturan yang ada
//      saat MENANG dapat benar, saat KALAH dicatat salah. Akurasi tiap
//      aturan tumbuh & tersimpan — kepahaman yang terbaca manusia.
//   5. KERUMUNAN vs PAUS — rasio long/short akun Bybit (crowd) diadu
//      dengan sisi paus: kerumunan sesak = bahan bakar likuidasi;
//      paus di sisi lawan kerumunan = prediksi squeeze.
// Hukum jujur tetap: identitas = SIDIK PERILAKU (bukan alamat dompet);
// dinding = orderbook nyata tapi PEMILIK dinding tak terbaca; LSR =
// kerumunan bukan paus; semua salah diakui terbuka.
// ============================================================
import fs from 'fs';
import { getCandles, SIMBOL } from './bybit';
import type { PausData, SisiBuku } from './paus';

const DIR_JIWA = '/home/z/my-project/db/elsa/paus';
const FILE_STATE = `${DIR_JIWA}/neuron.json`;
const JAM = 3_600_000;
const CAP_MEMORI = 30; // per neuron — cukup untuk sidik ukuran
const CAP_NEURON = 48;
const CAP_DUEL_SELESAI = 24;
const CAP_DINDING_AKTIF = 20;
const CAP_DINDING_SELESAI = 30;
const CAP_DIARY = 40;
const TENAGA_MIN_DUEL = 0.25;
const UMUR_DINDING_MAX_MS = 12 * JAM;
const COCOK_HARGA_DINDING = 0.0015; // band pencocokan level antar denyut (0,15%)
const DEKAT_DINDING = 0.01; // dinding dianggap "dekat harga" bila dalam 1%
const BOBOT_DASAR: Record<string, number> = {
  netUsd: 1.0, deltaFutures: 0.45, bahanBakar: 0.35, momentumJejak: 0.3, keyakinan: 0.55,
};

export type SifatPaus =
  | 'AKUMULATOR SPOT' | 'DISTRIBUTOR SPOT'
  | 'PENGUASA LONG' | 'PENGUASA SHORT'
  | 'PENJAGA HEDGED' | 'PEMBURU DUA-ARAH';

export type NeuronPaus = {
  nama: string; siluet: string; sifat: SifatPaus;
  lahir: string; terakhir: string; denyut: number; tidur: boolean;
  netUsd: number; net24jUsd: number; totalAbsUsd: number;
  ukuranMedian: number; // V2 — sidik ukuran untuk pencocokan entitas
  benar: number; salah: number; // V2 — rekam jejak duel per paus
  konsistensi: number; keyakinan: number; tenaga: number; reputasi: number;
  dna: { venueDominan: string; kelasDominan: string; niatDominan: string; jamAktif: string[] };
  memori: { t: number; venue: string; sisi: string; usd: number; harga: number; niat: string }[];
};

export type Dinding = {
  id: string; venue: string; sisi: 'BID' | 'ASK'; harga: number;
  usd: number; puncakUsd: number; makanUsd: number;
  lahir: string; terakhir: string; denyutSeen: number;
  status: 'HIDUP' | 'GIGIT' | 'PATAH' | 'MUNDUR' | 'SELESAI';
  selesaiAt?: string; cerita?: string;
};

export type Pelajaran = { kunci: string; judul: string; n: number; benar: number; akurasi: number };

export type KomponenDuel = {
  netUsd: [number, number]; deltaFutures: [number, number]; bahanBakar: [number, number];
  momentumJejak: [number, number]; keyakinan: [number, number];
};

export type DuelPaus = {
  id: string; dari: string; lawan: string; sisiDari: 'NAIK' | 'TURUN';
  mulaiAt: string; mulaiHarga: number;
  tenagaDari: number; tenagaLawan: number; pDari: number;
  prediksiArah: 'NAIK' | 'TURUN' | 'SERAH'; keyakinanDuel: number;
  komponen: KomponenDuel;
  bukti: string[]; // V2 — bukti medan nyata saat duel dibentuk
  aturan: string[]; // V2 — kunci aturan yang hadir (untuk kepahaman)
  status: 'AKTIF' | 'MENANG' | 'KALAH' | 'SERAH';
  selesaiAt?: string; selesaiHarga?: number; hasilCerita?: string;
};

export type KalibrasiDuel = {
  nTerjawab: number; nBenar: number; akurasi: number;
  keandalan: Record<string, number>;
  keandalanN: Record<string, number>;
};

export type PrediksiNasib = { id: string; judul: string; teks: string; dasar: string; keyakinan: number };

export type KesaksianPaus = { dari: string; vote: 'NAIK' | 'TURUN' | 'NETRAL'; kekuatan: number; cara: string };

export type PausJiwa = {
  at: string; denyutKe: number;
  neurons: NeuronPaus[];
  duelAktif: DuelPaus[];
  duelSelesai: DuelPaus[];
  kalibrasi: KalibrasiDuel;
  dinding: { aktif: Dinding[]; selesai: Dinding[] }; // V2
  kepahaman: Pelajaran[]; // V2
  prediksiNasib: PrediksiNasib[];
  diary: { at: string; teks: string }[];
  kesaksian: KesaksianPaus[];
  vitamin: { aktif: boolean; teks: string };
  jujur: string[];
};

type PausState = {
  v: 2;
  at: string; atDataTerakhir: string; berikutNama: number; denyutKe: number; berikutDinding: number;
  neurons: NeuronPaus[]; duelAktif: DuelPaus[]; duelSelesai: DuelPaus[];
  kalibrasi: KalibrasiDuel;
  dindingAktif: Dinding[]; dindingSelesai: Dinding[];
  menungguDinding: { id: string; arah: 'NAIK' | 'TURUN'; patok: number; tempo: number }[];
  kepahaman: Record<string, { n: number; benar: number }>;
  diary: { at: string; teks: string }[];
};

// ---------------- judul aturan kepahaman (terbaca manusia) ----------------
const KEPAHAMAN_DEFS: Record<string, string> = {
  'TENAGA-DOMINAN': 'selisih tenaga besar (≥0,15) menandai pemenang duel',
  'FUNDING-DUKUNG': 'funding mendukung sisi pemenang (sisi sesak jadi bahan bakar)',
  'OI-SEARAH': 'OI 2 jam searah prediksi (posisi baru mengikuti pemenang)',
  'DINDING-DUKUNG': 'pemenang punya dinding pertahanan dekat harga',
  'KERUMUNAN-LAWAN': 'kerumunan sesak di sisi yang KALAH (paus melawan arus)',
  'DINDING-LAWAN-PATAH': 'dinding sisi kalah PATAH dimakan saat duel berlangsung',
  'DINDING-PATAH-LANJUT': 'harga LANJUT searah saat dinding patah (bukan rebound palsu)',
};

// ---------------- ingatan jiwa (bertahan restart) ----------------
function bacaState(): PausState {
  const def: PausState = {
    v: 2,
    at: '', atDataTerakhir: '', berikutNama: 1, denyutKe: 0, berikutDinding: 1,
    neurons: [], duelAktif: [], duelSelesai: [],
    kalibrasi: { nTerjawab: 0, nBenar: 0, akurasi: 0, keandalan: { netUsd: 1, deltaFutures: 1, bahanBakar: 1, momentumJejak: 1, keyakinan: 1 }, keandalanN: { netUsd: 0, deltaFutures: 0, bahanBakar: 0, momentumJejak: 0, keyakinan: 0 } },
    dindingAktif: [], dindingSelesai: [], menungguDinding: [], kepahaman: {}, diary: [],
  };
  try {
    fs.mkdirSync(DIR_JIWA, { recursive: true });
    if (fs.existsSync(FILE_STATE)) {
      const j = JSON.parse(fs.readFileSync(FILE_STATE, 'utf8')) as Partial<PausState> & { v?: number };
      if (j && Array.isArray(j.neurons)) {
        const campur = { ...def, ...j, kalibrasi: { ...def.kalibrasi, ...(j.kalibrasi ?? {}) } } as PausState;
        if (j.v !== 2) {
          // MIGRASI v1→v2: neuron bucket kerumunan dibuang jujur — dulu
          // "paus" adalah gabungan cetakan kecil; v2 menuntut kelas paus.
          const nLama = campur.neurons.length;
          campur.neurons = [];
          campur.dindingAktif = campur.dindingAktif ?? [];
          campur.dindingSelesai = campur.dindingSelesai ?? [];
          campur.menungguDinding = campur.menungguDinding ?? [];
          campur.kepahaman = campur.kepahaman ?? {};
          campur.diary = Array.isArray(campur.diary) ? campur.diary : [];
          campur.v = 2;
          campur.diary.unshift({
            at: new Date().toISOString(),
            teks: `MIGRASI v1→v2: ${nLama} neuron kerumunan dibuang (dulu bucket $500–5rb disebut "paus" — kualitas rendah); kini hanya cetakan KELAS PAUS yang jadi neuron + dinding orderbook dilacak + rekam jejak per paus + kepahaman tertambang`,
          });
        }
        return campur;
      }
    }
  } catch { /* ingatan rusak — mulai baru, jujur */ }
  return def;
}
function tulisState(st: PausState): void {
  try {
    fs.mkdirSync(DIR_JIWA, { recursive: true });
    fs.writeFileSync(FILE_STATE, JSON.stringify(st));
  } catch { /* gagal simpan — jiwa tetap hidup di memori proses */ }
}

// v1→v2: duel lama belum punya bukti/aturan — dinormalkan agar tak crash
function normalkanDuel(st: PausState): void {
  for (const d of [...st.duelAktif, ...st.duelSelesai]) {
    if (!Array.isArray(d.bukti)) d.bukti = [];
    if (!Array.isArray(d.aturan)) d.aturan = [];
  }
}

// PEMULIHAN MANDIRI: neuron yang ditulis proses lama (tanpa field v2) dipulihkan
// di setiap denyut — jiwa tak boleh cacat gara-gara modul basi/htl reload
function pulihkanNeuron(st: PausState): number {
  let diperbaiki = 0;
  for (const n of st.neurons) {
    if (n.ukuranMedian == null || !Number.isFinite(n.ukuranMedian) || n.ukuranMedian <= 0) {
      const med = medianOf((n.memori ?? []).map((m) => Math.abs(m.usd)));
      n.ukuranMedian = med > 0 ? Math.round(med) : Math.max(1, Math.round(Math.abs(n.netUsd) || 1000));
      diperbaiki += 1;
    }
    if (n.benar == null || !Number.isFinite(n.benar)) { n.benar = 0; diperbaiki += 1; }
    if (n.salah == null || !Number.isFinite(n.salah)) { n.salah = 0; diperbaiki += 1; }
    if (n.reputasi == null || !Number.isFinite(n.reputasi)) n.reputasi = 0;
  }
  // neuron di bawah ambang kelas paus (peninggalan proses lama) dibuang jujur
  const sebelum = st.neurons.length;
  st.neurons = st.neurons.filter((n) => n.totalAbsUsd >= 2000 || n.memori.some((m) => Math.abs(m.usd) >= 2000));
  return diperbaiki + (sebelum - st.neurons.length);
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const kelasOf = (usd: number): string => (usd < 5_000 ? 'K' : usd < 50_000 ? 'P' : usd < 500_000 ? 'R' : 'S');
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

function modeOf(arr: string[]): string {
  const c = new Map<string, number>();
  for (const s of arr) c.set(s, (c.get(s) ?? 0) + 1);
  let best = '—'; let n = 0;
  for (const [k, v] of c) if (v > n) { best = k; n = v; }
  return best;
}
function medianOf(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

// ---------------- 1) NEURON PAUS-ASLI: sidik ukuran, bukan bucket ----------------
function tangkapCetakan(st: PausState, data: PausData): { baru: number; gabung: number; namaBaru: string[]; namaGabung: string[]; kelasPaus: number } {
  if (st.atDataTerakhir === data.at) return { baru: 0, gabung: 0, namaBaru: [], namaGabung: [], kelasPaus: 0 }; // data replay — jangan dobel hitung
  st.atDataTerakhir = data.at;
  let baru = 0; let gabung = 0; let kelasPaus = 0;
  const namaBaru: string[] = []; const namaGabung: string[] = [];
  const kini = Date.now();
  const ambangPaus = Math.max(1000, data.ambang.pausUsd || 2000);
  for (const c of data.cetakan) {
    if (c.usd < ambangPaus) continue; // KERUMUNAN — tidak lagi menyamar jadi paus (kualitas v2)
    kelasPaus += 1;
    const kelas = kelasOf(c.usd);
    const siluet = `${c.venue}|${c.sisi}|${kelas}`;
    const signed = c.sisi === 'TAKER_BELI' ? c.usd : -c.usd;
    // pencocokan entitas: venue+sisi sama, SIDIK UKURAN 0,4×–2,5× median,
    // umur < 90 menit — paus nyata cenderung cetak dengan ukuran khasnya
    let target: NeuronPaus | null = null;
    let skorTerbaik = Infinity;
    for (const n of st.neurons) {
      if (!n.siluet.startsWith(`${c.venue}|${c.sisi}|`)) continue;
      const umur = kini - Date.parse(n.terakhir);
      if (umur >= 90 * 60_000) continue;
      const bandOk = n.ukuranMedian > 0 && c.usd >= 0.4 * n.ukuranMedian && c.usd <= 2.5 * n.ukuranMedian;
      if (!bandOk) continue;
      // semakin dekat ukuran & semakin segar, semakin layak digabung
      const skor = Math.abs(c.usd / Math.max(n.ukuranMedian, 1) - 1) + umur / (90 * 60_000);
      if (skor < skorTerbaik) { target = n; skorTerbaik = skor; }
    }
    if (!target) {
      target = {
        nama: `PAUS-${String(st.berikutNama).padStart(2, '0')}`,
        siluet, sifat: 'PEMBURU DUA-ARAH',
        lahir: new Date(c.t || kini).toISOString(), terakhir: new Date(c.t || kini).toISOString(),
        denyut: 0, tidur: false,
        netUsd: 0, net24jUsd: 0, totalAbsUsd: 0,
        ukuranMedian: c.usd, benar: 0, salah: 0,
        konsistensi: 0, keyakinan: 0, tenaga: 0, reputasi: 0,
        dna: { venueDominan: c.venue, kelasDominan: kelas, niatDominan: c.niat, jamAktif: [] },
        memori: [],
      };
      st.berikutNama += 1;
      st.neurons.push(target);
      namaBaru.push(target.nama); baru += 1;
    } else { gabung += 1; if (!namaGabung.includes(target.nama)) namaGabung.push(target.nama); }
    target.denyut += 1;
    target.terakhir = new Date(Math.max(c.t || kini, Date.parse(target.terakhir))).toISOString();
    target.netUsd += signed;
    target.totalAbsUsd += c.usd;
    target.memori.unshift({ t: c.t || kini, venue: c.venue, sisi: c.sisi, usd: signed, harga: c.harga, niat: c.niat });
    if (target.memori.length > CAP_MEMORI) target.memori.length = CAP_MEMORI;
    target.ukuranMedian = Math.round(medianOf(target.memori.map((m) => Math.abs(m.usd))));
    target.dna.venueDominan = modeOf(target.memori.map((m) => m.venue));
    target.dna.kelasDominan = modeOf(target.memori.map((m) => kelasOf(Math.abs(m.usd))));
    target.dna.niatDominan = modeOf(target.memori.map((m) => m.niat));
    target.dna.jamAktif = (() => {
      const c2 = new Map<number, number>();
      for (const m of target.memori) c2.set(new Date(m.t).getUTCHours(), (c2.get(new Date(m.t).getUTCHours()) ?? 0) + 1);
      return [...c2.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([h]) => `${String(h).padStart(2, '0')}Z`);
    })();
  }
  // tidur & pemangkasan
  for (const n of st.neurons) n.tidur = kini - Date.parse(n.terakhir) > 48 * JAM;
  if (st.neurons.length > CAP_NEURON) {
    const urut = [...st.neurons].sort((a, b) => Date.parse(a.terakhir) - Date.parse(b.terakhir));
    for (const n of urut) {
      if (st.neurons.length <= CAP_NEURON) break;
      st.neurons = st.neurons.filter((x) => x.nama !== n.nama);
    }
  }
  return { baru, gabung, namaBaru, namaGabung, kelasPaus };
}

// ---------------- 2) FORMULA KEYAKINAN + TENAGA (+ REPUTASI) ----------------
function hitungKeyakinanTenaga(st: PausState, data: PausData, kini: number): void {
  const vol24j = Math.max(1, data.pasar.vol24jSpotUsd + data.pasar.vol24jFuturesUsd);
  const funding = data.pasar.fundingPct / 100; // fundingPct dalam persen → fraksi
  for (const n of st.neurons) {
    const m24 = n.memori.filter((m) => kini - m.t <= 24 * JAM);
    const net24 = m24.reduce((s, m) => s + m.usd, 0);
    const abs24 = m24.reduce((s, m) => s + Math.abs(m.usd), 0);
    const spotUsd24 = m24.filter((m) => m.venue === 'SPOT').reduce((s, m) => s + Math.abs(m.usd), 0);
    const futUsd24 = m24.filter((m) => m.venue === 'FUTURES').reduce((s, m) => s + Math.abs(m.usd), 0);
    const spotBeli24 = m24.filter((m) => m.venue === 'SPOT' && m.usd > 0).reduce((s, m) => s + m.usd, 0);
    const spotJual24 = -m24.filter((m) => m.venue === 'SPOT' && m.usd < 0).reduce((s, m) => s + m.usd, 0);
    const futBeli24 = m24.filter((m) => m.venue === 'FUTURES' && m.usd > 0).reduce((s, m) => s + m.usd, 0);
    const futJual24 = -m24.filter((m) => m.venue === 'FUTURES' && m.usd < 0).reduce((s, m) => s + m.usd, 0);
    n.net24jUsd = Math.round(net24);
    n.konsistensi = abs24 > 0 ? Math.abs(net24) / abs24 : 0;
    const jamSejak = (kini - Date.parse(n.terakhir)) / JAM;
    const kesegaran = Math.exp(-jamSejak / 6);
    n.reputasi = n.benar + n.salah > 0 ? (n.benar - n.salah) / (n.benar + n.salah) : 0;
    n.keyakinan = clamp(
      0.30 + 0.14 * Math.log(1 + n.denyut) + 0.35 * n.konsistensi + 0.20 * kesegaran + 0.10 * n.reputasi,
      0, 0.95,
    );
    // sifat (prioritas: hedged → dua-arah → venue dominan)
    const hedged = spotBeli24 > 1200 && futJual24 > 1200 && spotBeli24 > 1.6 * Math.max(futBeli24, 1) && futJual24 > 1.6 * Math.max(spotJual24, 1);
    if (hedged) n.sifat = 'PENJAGA HEDGED';
    else if (n.konsistensi < 0.35 && m24.length >= 2) n.sifat = 'PEMBURU DUA-ARAH';
    else if (spotUsd24 >= futUsd24) n.sifat = net24 > 0 ? 'AKUMULATOR SPOT' : 'DISTRIBUTOR SPOT';
    else n.sifat = net24 > 0 ? 'PENGUASA LONG' : 'PENGUASA SHORT';
    // tenaga tempur — tiap komponen 0..1, dikalikan keandalan hasil belajar
    const netKuat = Math.min(1, Math.abs(net24) / Math.max(9_000, 0.004 * vol24j));
    const deltaFutures = abs24 > 0 ? futUsd24 / abs24 : 0;
    const arahLong = net24 > 0;
    const bahanBakar = arahLong
      ? (funding < -0.0001 ? 1 : funding > 0.0002 ? 0.15 : 0.5)
      : (funding > 0.0001 ? 1 : funding < -0.0002 ? 0.15 : 0.5);
    const n2h = n.memori.filter((m) => kini - m.t <= 2 * JAM).length;
    const momentumJejak = Math.min(1, n2h / Math.max(2, m24.length / 6));
    const komponen: Record<string, number> = { netUsd: netKuat, deltaFutures, bahanBakar, momentumJejak, keyakinan: n.keyakinan };
    let num = 0; let den = 0;
    for (const k of Object.keys(BOBOT_DASAR)) {
      const w = BOBOT_DASAR[k] * (st.kalibrasi.keandalan[k] ?? 1);
      num += w * komponen[k]; den += w;
    }
    n.tenaga = den > 0 ? clamp(num / den, 0, 1) : 0;
    (n as NeuronPaus & { __komponen?: Record<string, number> }).__komponen = komponen;
  }
}

// ---------------- 3) DINDING PAUS — pelacakan lintas denyut ----------------
function deteksiDinding(st: PausState, data: PausData, kini: number, catat: (teks: string) => void): void {
  const harga = data.harga;
  for (const sisi of data.dindingMentah as SisiBuku[]) {
    const lv = sisi.levels.filter((x) => x.usd > 0 && x.p > 0);
    if (!lv.length) continue;
    const med = medianOf(lv.map((x) => x.usd));
    const ambangDinding = Math.max(1000, 10 * med);
    const puncakBuku = [...lv].sort((a, b) => b.usd - a.usd).slice(0, 4); // 4 dinding terbesar per sisi
    for (const level of puncakBuku) {
      if (level.usd < ambangDinding) continue;
      // cocokkan dinding aktif lama (venue+sisi sama, harga dalam band)
      let target: Dinding | null = null;
      for (const w of st.dindingAktif) {
        if (w.venue !== sisi.venue || w.sisi !== sisi.sisi) continue;
        if (Math.abs(level.p - w.harga) / Math.max(w.harga, 1e-9) <= COCOK_HARGA_DINDING) { target = w; break; }
      }
      if (target) {
        const prev = target.usd;
        target.usd = level.usd;
        target.puncakUsd = Math.max(target.puncakUsd, level.usd);
        target.terakhir = new Date(kini).toISOString();
        target.denyutSeen += 1;
        if (level.usd < prev * 0.95) {
          target.makanUsd += Math.max(0, prev - level.usd);
          if (level.usd < prev * 0.7 && target.makanUsd > 300) {
            target.status = 'GIGIT';
            catat(`dinding ${target.venue} ${target.sisi} @${target.harga} DIGIGIT $${Math.round(prev - level.usd).toLocaleString('id-ID')} tersisa $${Math.round(level.usd).toLocaleString('id-ID')} — penyerang sedang makan penjaga`);
          }
        }
      } else {
        const d: Dinding = {
          id: `W-${String(st.berikutDinding).padStart(3, '0')}`,
          venue: sisi.venue, sisi: sisi.sisi, harga: level.p,
          usd: level.usd, puncakUsd: level.usd, makanUsd: 0,
          lahir: new Date(kini).toISOString(), terakhir: new Date(kini).toISOString(),
          denyutSeen: 1, status: 'HIDUP',
        };
        st.berikutDinding += 1;
        st.dindingAktif.push(d);
        if (level.usd >= 2500) catat(`dinding baru terlihat: ${d.id} ${sisi.venue} ${sisi.sisi} @${level.p} sebesar $${Math.round(level.usd).toLocaleString('id-ID')} — paus penjaga memasang pertahanan`);
      }
    }
  }
  // nasib dinding yang HILANG dari buku denyut ini
  const masihAda: Dinding[] = [];
  for (const w of st.dindingAktif) {
    const terlihat = data.dindingMentah.some((s) =>
      s.venue === w.venue && s.sisi === w.sisi &&
      s.levels.some((x) => Math.abs(x.p - w.harga) / Math.max(w.harga, 1e-9) <= COCOK_HARGA_DINDING && x.usd >= Math.max(1000, w.puncakUsd * 0.12)));
    const umur = kini - Date.parse(w.lahir);
    const tertembus = w.sisi === 'BID' ? harga < w.harga : harga > w.harga;
    if (!terlihat) {
      w.selesaiAt = new Date(kini).toISOString();
      if (tertembus) {
        if (w.denyutSeen >= 2) {
          w.status = 'PATAH';
          w.cerita = `PATAH DIMAKAN: harga TEMBUS ${w.harga} — dinding ${w.sisi} $${Math.round(w.puncakUsd).toLocaleString('id-ID')} tak sanggup menahan penyerang; paus penjaga KALAH`;
          catat(`${w.id} dinding ${w.venue} ${w.sisi} @${w.harga} PATAH DIMAKAN — paus penjaga kalah dari penyerang (harga tembus)`);
          st.menungguDinding.push({ id: w.id, arah: w.sisi === 'BID' ? 'TURUN' : 'NAIK', patok: harga, tempo: kini + 6 * JAM });
        } else {
          w.status = 'SELESAI';
          w.cerita = 'hilang cepat saat harga mendekat — dinding tipis / bait terpakai; tak dihitung patah';
        }
      } else if (w.usd < w.puncakUsd * 0.4) {
        w.status = 'MUNDUR';
        w.cerita = `dicabut TANPA harga menyentuh (puncak $${Math.round(w.puncakUsd).toLocaleString('id-ID')} → tinggal $${Math.round(w.usd).toLocaleString('id-ID')}) — terduga bait/spoof: penjaga tak mau tempur`;
        catat(`${w.id} dinding ${w.venue} ${w.sisi} @${w.harga} MUNDUR tanpa kontak — terduga bait/spoof, kepahaman: jangan percaya dinding yang tak teruji`);
      } else {
        w.status = 'SELESAI';
        w.cerita = 'hilang dari buku (dicabut penjaga / terisi lewat level lain) — tanpa klaim menang-kalah';
      }
      st.dindingSelesai.unshift(w);
      if (st.dindingSelesai.length > CAP_DINDING_SELESAI) st.dindingSelesai.length = CAP_DINDING_SELESAI;
    } else if (umur > UMUR_DINDING_MAX_MS) {
      w.status = 'SELESAI';
      w.selesaiAt = new Date(kini).toISOString();
      w.cerita = 'lewat 12 jam dipantau — masa monitor habis, dinding masih bertahan (penjaga disiplin)';
      st.dindingSelesai.unshift(w);
      if (st.dindingSelesai.length > CAP_DINDING_SELESAI) st.dindingSelesai.length = CAP_DINDING_SELESAI;
    } else {
      if (w.status === 'HIDUP' && w.makanUsd > 300) w.status = 'GIGIT';
      masihAda.push(w);
    }
  }
  st.dindingAktif = masihAda;
  if (st.dindingAktif.length > CAP_DINDING_AKTIF) st.dindingAktif = st.dindingAktif.sort((a, b) => b.usd - a.usd).slice(0, CAP_DINDING_AKTIF);
}

// dinding aktif terdekat di sisi tertentu (untuk bukti duel & kesaksian)
function dindingDekat(st: PausState, sisi: 'BID' | 'ASK', harga: number): Dinding | null {
  let best: Dinding | null = null;
  for (const w of st.dindingAktif) {
    if (w.sisi !== sisi) continue;
    const jauh = Math.abs(w.harga - harga) / Math.max(harga, 1e-9);
    if (jauh <= DEKAT_DINDING && (!best || w.usd > best.usd)) best = w;
  }
  return best;
}

// ---------------- 4) DUEL PAUS-VS-PAUS (+ BUKTI MEDAN & ATURAN) ----------------
function pilihDuel(st: PausState, data: PausData, kini: number, catat: (teks: string) => void): void {
  const layar = st.neurons.filter((n) => !n.tidur && n.tenaga >= TENAGA_MIN_DUEL && n.net24jUsd !== 0);
  const long = layar.filter((n) => n.net24jUsd > 0 || n.sifat === 'PENJAGA HEDGED').sort((a, b) => b.tenaga - a.tenaga)[0] ?? null;
  const short = layar.filter((n) => n.net24jUsd < 0 && n.sifat !== 'PENJAGA HEDGED').sort((a, b) => b.tenaga - a.tenaga)[0] ?? null;
  if (long && short && long.nama !== short.nama) {
    const id = `${long.nama}~${short.nama}`;
    let duel = st.duelAktif.find((d) => d.id === id);
    const funding = data.pasar.fundingPct;
    const fundingFrac = funding / 100;
    const dOi2j = data.niatJam.slice(0, 2).reduce((s, j) => s + j.dOiUsd, 0);
    const dindingBid = dindingDekat(st, 'BID', data.harga);
    const dindingAsk = dindingDekat(st, 'ASK', data.harga);
    const kr = data.kerumunan;
    // BUKTI MEDAN — bukan angka kosong: funding, OI, dinding, kerumunan
    const bukti: string[] = [];
    const aturan: string[] = [];
    bukti.push(`funding ${funding.toFixed(4)}% (${data.pasar.sisiBayar})`);
    if (Math.abs(dOi2j) > 500) bukti.push(`OI 2 jam terakhir ${dOi2j > 0 ? '+' : '-'}$${Math.round(Math.abs(dOi2j)).toLocaleString('id-ID')}`);
    if (dindingBid) { bukti.push(`dinding BID ${dindingBid.venue} @${dindingBid.harga} $${Math.round(dindingBid.usd).toLocaleString('id-ID')} (pertahanan long)`); aturan.push('DINDING-DUKUNG'); }
    if (dindingAsk) { bukti.push(`dinding ASK ${dindingAsk.venue} @${dindingAsk.harga} $${Math.round(dindingAsk.usd).toLocaleString('id-ID')} (pertahanan short)`); aturan.push('DINDING-DUKUNG'); }
    if (kr.tersedia && kr.akunLongPct != null) {
      bukti.push(`kerumunan long ${kr.akunLongPct}% akun`);
      if (kr.akunLongPct >= 58 || kr.akunLongPct <= 42) aturan.push('KERUMUNAN-LAWAN');
    }
    if (fundingFrac > 0.0001 || fundingFrac < -0.0001) aturan.push('FUNDING-DUKUNG');
    if (Math.abs(dOi2j) > 500) aturan.push('OI-SEARAH');
    if (Math.abs(long.tenaga - short.tenaga) >= 0.15) aturan.push('TENAGA-DOMINAN');
    const rekam = (n: typeof long) => (n.benar + n.salah > 0 ? `, rekam ${n.benar}W/${n.salah}L` : '');
    if (!duel) {
      duel = {
        id, dari: long.nama, lawan: short.nama, sisiDari: 'NAIK',
        mulaiAt: new Date(kini).toISOString(), mulaiHarga: data.harga,
        tenagaDari: long.tenaga, tenagaLawan: short.tenaga, pDari: 0.5,
        prediksiArah: 'SERAH', keyakinanDuel: 0,
        komponen: { netUsd: [0, 0], deltaFutures: [0, 0], bahanBakar: [0, 0], momentumJejak: [0, 0], keyakinan: [0, 0] },
        bukti, aturan,
        status: 'AKTIF',
      };
      st.duelAktif.push(duel);
      catat(`duel baru lahir: ${id} — ${long.nama} (${long.sifat}, tenaga ${long.tenaga.toFixed(2)}${rekam(long)}) vs ${short.nama} (${short.sifat}, tenaga ${short.tenaga.toFixed(2)}${rekam(short)}); bukti: ${bukti.slice(0, 3).join(' · ')}`);
    }
    duel.tenagaDari = long.tenaga; duel.tenagaLawan = short.tenaga;
    duel.pDari = sigmoid(3.4 * (long.tenaga - short.tenaga));
    duel.prediksiArah = duel.pDari >= 0.62 ? 'NAIK' : duel.pDari <= 0.38 ? 'TURUN' : 'SERAH';
    duel.bukti = bukti;
    duel.aturan = [...new Set(aturan)];
    duel.komponen = {
      netUsd: [komp(long, 'netUsd'), komp(short, 'netUsd')],
      deltaFutures: [komp(long, 'deltaFutures'), komp(short, 'deltaFutures')],
      bahanBakar: [komp(long, 'bahanBakar'), komp(short, 'bahanBakar')],
      momentumJejak: [komp(long, 'momentumJejak'), komp(short, 'momentumJejak')],
      keyakinan: [komp(long, 'keyakinan'), komp(short, 'keyakinan')],
    };
    duel.keyakinanDuel = clamp(
      Math.min(long.keyakinan, short.keyakinan)
      * (2 * Math.abs(duel.pDari - 0.5))
      * (0.85 + 0.05 * duel.bukti.length) // bukti medan menaikkan keyakinan, bukan karangan
      * (st.kalibrasi.nTerjawab >= 5 ? 0.55 + 0.9 * st.kalibrasi.akurasi : 0.85),
      0, 0.9,
    );
    // maks 3 duel aktif — terlebih tua diserahterimakan
    if (st.duelAktif.length > 3) {
      const tua = [...st.duelAktif].sort((a, b) => Date.parse(a.mulaiAt) - Date.parse(b.mulaiAt))[0];
      if (tua && tua.id !== id) {
        tua.status = 'SERAH';
        tua.selesaiAt = new Date(kini).toISOString();
        tua.hasilCerita = 'pasar tidak memutuskan dalam batas — duel diserahkan, kapital duel dihitung ulang pada denyut berikutnya';
        st.duelAktif = st.duelAktif.filter((d) => d.id !== tua.id);
        st.duelSelesai.unshift(tua);
        if (st.duelSelesai.length > CAP_DUEL_SELESAI) st.duelSelesai.length = CAP_DUEL_SELESAI;
      }
    }
  }
  for (const d of [...st.duelAktif]) {
    if (kini - Date.parse(d.mulaiAt) > 36 * JAM) {
      d.status = 'SERAH';
      d.selesaiAt = new Date(kini).toISOString();
      d.hasilCerita = 'lewat 36 jam tanpa keputusan tegas — diserahkan, bukan dipaksakan';
      st.duelAktif = st.duelAktif.filter((x) => x.id !== d.id);
      st.duelSelesai.unshift(d);
    }
  }
}

function komp(n: NeuronPaus, k: string): number {
  return ((n as NeuronPaus & { __komponen?: Record<string, number> }).__komponen ?? {})[k] ?? 0;
}

function nilaiKepahaman(st: PausState, kunci: string, menang: boolean): void {
  const kp = st.kepahaman[kunci] ?? { n: 0, benar: 0 };
  kp.n += 1;
  if (menang) kp.benar += 1;
  st.kepahaman[kunci] = kp;
}

async function jawabDuel(st: PausState, data: PausData, kini: number, catat: (teks: string) => void): Promise<void> {
  const matang = st.duelAktif.filter((d) => kini - Date.parse(d.mulaiAt) >= 2 * JAM);
  // KEPAHAMAN DINDING-PATAH — cek lanjutan harga setelah dinding patah
  if (st.menungguDinding.length) {
    let cs0: { c: number }[] = [];
    let atr = 0;
    try {
      const r = await getCandles(SIMBOL, '60', 48);
      cs0 = r.map((c) => ({ c: c.c }));
      atr = (r.slice(-12).reduce((s, c) => s + (c.h - c.l) / Math.max(c.c, 1e-9), 0) / Math.min(12, r.length)) * 100;
    } catch { /* candle gagal — kepahaman menunggu denyut berikutnya */ }
    if (cs0.length >= 4 && atr > 0) {
      const hargaKini = cs0[cs0.length - 1].c;
      const ambangLanjut = Math.max(1.0, 0.85 * atr);
      const sisa: typeof st.menungguDinding = [];
      for (const m of st.menungguDinding) {
        const movePct = ((hargaKini - m.patok) / Math.max(m.patok, 1e-9)) * 100;
        const naik = m.arah === 'NAIK';
        const lanjut = naik ? movePct >= ambangLanjut : movePct <= -ambangLanjut;
        const lawan = naik ? movePct <= -ambangLanjut : movePct >= ambangLanjut;
        if (lanjut || lawan || kini > m.tempo) {
          if (lanjut || lawan) {
            nilaiKepahaman(st, 'DINDING-PATAH-LANJUT', lanjut);
            catat(`kepahaman dinding: setelah ${m.id} patah, harga ${lanjut ? 'LANJUT' : 'BALIK ARAH'} ${movePct >= 0 ? '+' : ''}${movePct.toFixed(2)}% — aturan "patah berlanjut" ${lanjut ? 'terbukti' : 'gugur'} kali ini`);
          }
        } else sisa.push(m);
      }
      st.menungguDinding = sisa.slice(-10);
    }
  }
  if (!matang.length) return;
  let cs1h: { o: number; h: number; l: number; c: number }[] = [];
  if (!st.menungguDinding.length) {
    try {
      const r = await getCandles(SIMBOL, '60', 48);
      cs1h = r.map((c) => ({ o: c.o, h: c.h, l: c.l, c: c.c }));
    } catch { /* candle gagal — duel menunggu denyut berikutnya */ }
  }
  if (cs1h.length < 4) return;
  const atr1hPct = (cs1h.slice(-12).reduce((s, c) => s + (c.h - c.l) / Math.max(c.c, 1e-9), 0) / Math.min(12, cs1h.length)) * 100;
  const ambang = Math.max(1.0, 0.85 * atr1hPct);
  const hargaKini = cs1h[cs1h.length - 1].c;
  for (const d of matang) {
    const movePct = ((hargaKini - d.mulaiHarga) / Math.max(d.mulaiHarga, 1e-9)) * 100;
    const predNaise = d.prediksiArah === 'NAIK';
    const menang = predNaise ? movePct >= ambang : movePct <= -ambang;
    const kalah = predNaise ? movePct <= -ambang : movePct >= ambang;
    const lewat = kini - Date.parse(d.mulaiAt) > 24 * JAM;
    if (!menang && !kalah && !lewat) continue;
    d.status = menang ? 'MENANG' : kalah ? 'KALAH' : 'SERAH';
    d.selesaiAt = new Date(kini).toISOString();
    d.selesaiHarga = hargaKini;
    // REKAM JEJAK PER PAUS — pemenang naik kelas, yang kalah didemot
    if (d.status !== 'SERAH' && d.prediksiArah !== 'SERAH') {
      const namaPemenang = predNaise ? d.dari : d.lawan;
      const namaKalah = predNaise ? d.lawan : d.dari;
      const w = st.neurons.find((x) => x.nama === namaPemenang);
      const l = st.neurons.find((x) => x.nama === namaKalah);
      if (menang) { if (w) w.benar += 1; if (l) l.salah += 1; }
      else { if (w) w.salah += 1; if (l) l.benar += 1; } // formula salah — sisi prediksi dihukum
    }
    // KEPAHAMAN TERTAMBANG — nilai aturan yang hadir saat duel dibentuk
    if (d.status !== 'SERAH') {
      const menangPred = d.status === 'MENANG';
      for (const kunci of d.aturan ?? []) nilaiKepahaman(st, kunci, menangPred);
      // DINDING-LAWAN-PATAH — dinding sisi kalah patah saat duel berjalan?
      const sisiKalah = predNaise ? 'ASK' : 'BID';
      const dindingPatah = st.dindingSelesai.find((w) =>
        w.status === 'PATAH' && w.sisi === sisiKalah &&
        Date.parse(w.selesaiAt ?? '') >= Date.parse(d.mulaiAt));
      if (dindingPatah) {
        nilaiKepahaman(st, 'DINDING-LAWAN-PATAH', menangPred);
        d.hasilCerita = (d.hasilCerita ?? '') + ` BUKTI MEDAN: ${dindingPatah.id} dinding ${dindingPatah.venue} ${dindingPatah.sisi} @${dindingPatah.harga} patah dimakan saat duel — penjaga sisi kalah benar-benar tumbang`;
        catat(`bukti medan duel ${d.id}: dinding sisi kalah patah — "paus kalah dimakan paus" TERKONFIRMASI dari orderbook, bukan cuma candle`);
      }
    }
    d.hasilCerita = d.hasilCerita ?? '';
    if (!d.hasilCerita) {
      d.hasilCerita = menang
        ? `formula MENANG: prediksi ${d.prediksiArah}, harga bergerak ${movePct >= 0 ? '+' : ''}${movePct.toFixed(2)}% ≥ ambang ${ambang.toFixed(2)}% (0,85×ATR 1j) — ${predNaise ? d.dari : d.lawan} dipahami sebagai pemenang`
        : kalah
          ? `formula KALAH (diakui terbuka): prediksi ${d.prediksiArah}, harga justru ${movePct >= 0 ? '+' : ''}${movePct.toFixed(2)}% melawan ambang ${ambang.toFixed(2)}% — tenaga bukan segalanya; keandalan komponen menyesatkan akan diturunkan`
          : `SERAH: harga ${movePct >= 0 ? '+' : ''}${movePct.toFixed(2)}% di bawah ambang ${ambang.toFixed(2)}% dalam 24 jam — pasar belum memutuskan`;
    }
    // kalibrasi mandiri: keandalan komponen diperbarui dari hasil nyata
    if (d.status !== 'SERAH') {
      const hasil = menang ? (predNaise ? 1 : -1) : (predNaise ? -1 : 1);
      for (const k of Object.keys(BOBOT_DASAR)) {
        const a = d.komponen[k as keyof KomponenDuel][0];
        const b = d.komponen[k as keyof KomponenDuel][1];
        if (Math.abs(a - b) <= 0.05) continue; // sinyal terlalu tipis — dianggap bisu, tidak dihukum
        const menunjuk = a > b ? 1 : -1;
        st.kalibrasi.keandalanN[k] = (st.kalibrasi.keandalanN[k] ?? 0) + 1;
        const nK = st.kalibrasi.keandalanN[k];
        const benar = (menunjuk === hasil ? 1 : 0);
        const prev = st.kalibrasi.keandalan[k] ?? 1;
        const rasio = clamp(0.55 + 0.95 * (benar + (nK - 1) * 0.5) / nK, 0.5, 1.5);
        st.kalibrasi.keandalan[k] = Math.round((0.7 * prev + 0.3 * rasio) * 1000) / 1000;
      }
      st.kalibrasi.nTerjawab += 1;
      if (menang) st.kalibrasi.nBenar += 1;
      st.kalibrasi.akurasi = Math.round((st.kalibrasi.nBenar / Math.max(1, st.kalibrasi.nTerjawab)) * 1000) / 1000;
      catat(`duel ${d.id} TERJAWAB ${d.status}: ${d.hasilCerita} · kalibrasi kini akurasi ${Math.round(st.kalibrasi.akurasi * 100)}% dari ${st.kalibrasi.nTerjawab} duel`);
    } else {
      catat(`duel ${d.id} SERAH: ${d.hasilCerita}`);
    }
    st.duelAktif = st.duelAktif.filter((x) => x.id !== d.id);
    st.duelSelesai.unshift(d);
    if (st.duelSelesai.length > CAP_DUEL_SELESAI) st.duelSelesai.length = CAP_DUEL_SELESAI;
  }
}

// ---------------- 5) PREDIKSI NASIB (+ BAHAN BAKAR KERUMUNAN) ----------------
function nasibPaus(st: PausState, data: PausData, kini: number): PrediksiNasib[] {
  const out: PrediksiNasib[] = [];
  const vol24j = Math.max(1, data.pasar.vol24jSpotUsd + data.pasar.vol24jFuturesUsd);
  const distributor = st.neurons.filter((n) => !n.tidur && n.sifat === 'DISTRIBUTOR SPOT' && n.net24jUsd < 0).sort((a, b) => Math.abs(b.net24jUsd) - Math.abs(a.net24jUsd))[0];
  const akumulator = st.neurons.filter((n) => !n.tidur && n.sifat === 'AKUMULATOR SPOT' && n.net24jUsd > 0).sort((a, b) => b.net24jUsd - a.net24jUsd)[0];
  const lajuJual = distributor ? Math.abs(distributor.net24jUsd) / 24 : 0;
  if (distributor && lajuJual > 200) {
    const ask = Math.max(1, data.pasar.kedalamanAsk2pctUsd);
    const jamHabis = ask / lajuJual;
    out.push({
      id: 'AMUNISI-DISTRIBUTOR',
      judul: `${distributor.nama} (distributor) — kapan amunisi jualnya habis?`,
      teks: `${distributor.nama} menjual $${Math.abs(distributor.net24jUsd).toLocaleString('id-ID')} dalam 24 jam (≈$${Math.round(lajuJual).toLocaleString('id-ID')}/jam). Supply ask ±2% cuma $${Math.round(ask).toLocaleString('id-ID')}: pada laju ini supply terdekat habis ≈${jamHabis < 1 ? '<1' : Math.round(jamHabis)} jam — setelah itu tekanan jualnya kehabisan bahan. Jangan benci dia; TAHU kapan dia lelah.`,
      dasar: `laju = net 24j / 24 jam dari memori neuron; ask ±2% = orderbook Bybit+Gate sekarang`,
      keyakinan: clamp(0.25 + 0.25 * distributor.keyakinan, 0, 0.5),
    });
  }
  if (akumulator) {
    const bid = Math.max(1, data.pasar.kedalamanBid2pctUsd);
    const lajuBeli = akumulator.net24jUsd / 24;
    if (lajuBeli > 200) {
      const jamSedot = bid / lajuBeli;
      out.push({
        id: 'SERAPAN-AKUMULATOR',
        judul: `${akumulator.nama} (akumulator) — supply yang bisa disedot`,
        teks: `${akumulator.nama} menyerap $${akumulator.net24jUsd.toLocaleString('id-ID')} dalam 24 jam (≈$${Math.round(lajuBeli).toLocaleString('id-ID')}/jam). Bid ±2% cuma $${Math.round(bid).toLocaleString('id-ID')}: pada laju ini demand terdekat habis ≈${jamSedot < 1 ? '<1' : Math.round(jamSedot)} jam — harga makin sulit turun selama dia masih menyerap.`,
        dasar: `laju = net 24j / 24 jam; bid ±2% = orderbook Bybit+Gate sekarang`,
        keyakinan: clamp(0.25 + 0.25 * akumulator.keyakinan, 0, 0.5),
      });
    }
  }
  // korban likuidasi berikutnya — funding + kerumunan + liq24j + paus lawan
  const liq = data.jejak.liq24j;
  const fundingPct = data.pasar.fundingPct;
  const fundingFrac = fundingPct / 100;
  const kr = data.kerumunan;
  const sisiPenuh = fundingFrac > 0.0001 ? 'LONG' : fundingFrac < -0.0001 ? 'SHORT' : null;
  const sisiKerumunan = kr.tersedia && kr.akunLongPct != null ? (kr.akunLongPct >= 58 ? 'LONG' : kr.akunLongPct <= 42 ? 'SHORT' : null) : null;
  const sisiSesak = sisiKerumunan ?? sisiPenuh;
  const dasarSesak = sisiKerumunan ? `kerumunan long ${kr.akunLongPct}% akun Bybit` : sisiPenuh ? `funding ${fundingPct.toFixed(4)}%` : '';
  if (sisiSesak) {
    const korban = sisiSesak === 'LONG' ? 'kerumunan LONG' : 'kerumunan SHORT';
    const pembayar = sisiSesak === 'LONG' ? 'LONG membayar SHORT' : 'SHORT membayar LONG';
    const penyerang = st.neurons.filter((n) => !n.tidur && n.net24jUsd !== 0 && ((sisiSesak === 'LONG' && n.net24jUsd < 0) || (sisiSesak === 'SHORT' && n.net24jUsd > 0))).sort((a, b) => b.tenaga - a.tenaga)[0];
    out.push({
      id: 'KORBAN-BERIKUT',
      judul: `siapa jadi makanan berikutnya?`,
      teks: `${dasarSesak} — ${pembayar}, kerumunan condong ${sisiSesak} (24j terakhir likuidasi: long $${liq.longUsd.toLocaleString('id-ID')} vs short $${liq.shortUsd.toLocaleString('id-ID')}). ${penyerang ? `${penyerang.nama} (${penyerang.sifat}, tenaga ${penyerang.tenaga.toFixed(2)}, rekam ${penyerang.benar}W/${penyerang.salah}L) berdiri di sisi lawan` : 'belum ada paus menonjol di sisi lawan'} — ${korban} kecil adalah bahan bakar likuidasi berikutnya jika harga diseret ke arah ${sisiSesak === 'LONG' ? 'bawah' : 'atas'}. Sisi yang sesak = sisi yang jadi makanan.`,
      dasar: `${sisiKerumunan ? 'LSR akun Bybit 1h + ' : ''}funding Bybit linear + likuidasi 24j Gate + neuron lawan dari formula tenaga`,
      keyakinan: clamp(0.3 + (penyerang ? 0.2 * penyerang.tenaga : 0), 0, 0.55),
    });
  }
  if (!kr.tersedia) {
    out.push({
      id: 'KERUMUNAN-TAK-TERBACA',
      judul: 'kerumunan (LSR) tidak tersedia untuk ELSA',
      teks: `Bybit tidak menyediakan rasio long/short akun untuk ELSAUSDT — radar jujur: prediksi "siapa jadi makanan" di sini hanya memakai funding + likuidasi, TANPA data kerumunan. Kualitas prediksi kelas ini lebih rendah — diakui, bukan disembunyikan.`,
      dasar: 'global-long-short-account-ratio Bybit mengembalikan kosong utk ELSAUSDT',
      keyakinan: 0.2,
    });
  }
  return out;
}

// ---------------- 6) VITAMIN: kesaksian paus → dewan AR-E10 ----------------
function kesaksianPaus(st: PausState, data: PausData): KesaksianPaus[] {
  const out: KesaksianPaus[] = [];
  const vol24j = Math.max(1, data.pasar.vol24jSpotUsd + data.pasar.vol24jFuturesUsd);
  // NET — penempatan bersih (futures penuh, spot setengah bobot)
  const netPlacement = data.net.longBaruUsd - data.net.shortBaruUsd + 0.5 * data.net.netSpotUsd;
  if (Math.abs(netPlacement) > 3000) {
    const kek = clamp(Math.abs(netPlacement) / Math.max(12_000, 0.006 * vol24j), 0, 0.75);
    out.push({
      dari: 'RADAR-PAUS:NET',
      vote: netPlacement > 0 ? 'NAIK' : 'TURUN',
      kekuatan: kek,
      cara: `penempatan paus bersih ${netPlacement > 0 ? '+' : '-'}$${Math.round(Math.abs(netPlacement)).toLocaleString('id-ID')} (long baru $${Math.round(data.net.longBaruUsd).toLocaleString('id-ID')} vs short baru $${Math.round(data.net.shortBaruUsd).toLocaleString('id-ID')} + net spot 0,5×) → paus duduk di sisi ${netPlacement > 0 ? 'NAIK' : 'TURUN'}`,
    });
  } else {
    out.push({ dari: 'RADAR-PAUS:NET', vote: 'NETRAL', kekuatan: 0.15, cara: `penempatan paus nyaris datar (${Math.round(netPlacement).toLocaleString('id-ID')}) — paus belum memilih arah` });
  }
  // POLA
  if (data.pola) {
    const p = data.pola;
    if (p.nama.includes('HEDGED')) out.push({ dari: 'RADAR-PAUS:POLA', vote: 'TURUN', kekuatan: 0.5, cara: `${p.nama}: beli spot ≠ bullish — delta netral/persiapan tekan; dewan dilarang membaca "paus beli" sebagai buy` });
    else if (p.nama.includes('SERANGAN GANDA')) out.push({ dari: 'RADAR-PAUS:POLA', vote: 'TURUN', kekuatan: 0.6, cara: `${p.nama}: spot dilepas + short dipasang searah — likuidasi long jadi bahan bakar` });
    else if (p.nama.includes('AKUMULASI GANDA')) out.push({ dari: 'RADAR-PAUS:POLA', vote: 'NAIK', kekuatan: 0.55, cara: `${p.nama}: spot + futures searah beli — keyakinan arah yang paling mahal salahnya` });
    else if (p.nama.includes('AKUMULASI SPOT')) out.push({ dari: 'RADAR-PAUS:POLA', vote: 'NAIK', kekuatan: 0.35, cara: `${p.nama}: supply diserap pelan dari orderbook` });
    else if (p.nama.includes('DISTRIBUSI SPOT')) out.push({ dari: 'RADAR-PAUS:POLA', vote: 'TURUN', kekuatan: 0.35, cara: `${p.nama}: supply dilepas pelan ke bid` });
    else out.push({ dari: 'RADAR-PAUS:POLA', vote: 'NETRAL', kekuatan: 0.2, cara: `${p.nama}: pola ambigu — tidak dipakai menekan dewan` });
  } else {
    out.push({ dari: 'RADAR-PAUS:POLA', vote: 'NETRAL', kekuatan: 0.1, cara: 'tanpa pola hedged/serangan/akumulasi yang menonjol di jendela ini' });
  }
  // DUEL — "paus ini akan kalah dimakan paus itu" + bukti medan + rekam jejak
  const duelUtama = st.duelAktif.filter((d) => d.prediksiArah !== 'SERAH' && Math.abs(d.pDari - 0.5) >= 0.12).sort((a, b) => b.keyakinanDuel - a.keyakinanDuel)[0];
  if (duelUtama) {
    const pemenang = duelUtama.pDari >= 0.5 ? duelUtama.dari : duelUtama.lawan;
    const pausMenang = st.neurons.find((n) => n.nama === pemenang);
    const rekam = pausMenang && pausMenang.benar + pausMenang.salah > 0 ? `, rekam jejak pemenang ${pausMenang.benar}W/${pausMenang.salah}L` : '';
    const arahPred: 'NAIK' | 'TURUN' = duelUtama.prediksiArah === 'NAIK' ? 'NAIK' : 'TURUN';
    const kalibrasiTeks = st.kalibrasi.nTerjawab >= 5
      ? `, formula terjawab ${st.kalibrasi.nTerjawab} duel (akurasi ${Math.round(st.kalibrasi.akurasi * 100)}%)`
      : ', formula masih muda — belum cukup duel terjawab untuk mengklaim akurasi';
    out.push({
      dari: 'RADAR-PAUS:DUEL',
      vote: arahPred,
      kekuatan: duelUtama.keyakinanDuel,
      cara: `duel paus-vs-paus: ${duelUtama.dari} (tenaga ${duelUtama.tenagaDari.toFixed(2)}) vs ${duelUtama.lawan} (tenaga ${duelUtama.tenagaLawan.toFixed(2)}) → ${pemenang} dipahami menang, harga ${duelUtama.prediksiArah} (p=${Math.round(duelUtama.pDari * 100)}%, keyakinan ${Math.round(duelUtama.keyakinanDuel * 100)}%${rekam}${kalibrasiTeks}); bukti: ${(duelUtama.bukti ?? []).slice(0, 2).join(' · ') || 'tape saja'}`,
    });
  } else {
    out.push({ dari: 'RADAR-PAUS:DUEL', vote: 'NETRAL', kekuatan: 0.1, cara: 'belum ada duel aktif yang layak dipercaya (tenaga < ambang atau terlalu seimbang)' });
  }
  // KERUMUNAN vs PAUS — crowd sesak = bahan bakar; paus lawan arus = sinyal
  const kr = data.kerumunan;
  if (!kr.tersedia) {
    out.push({ dari: 'RADAR-PAUS:KERUMUNAN', vote: 'NETRAL', kekuatan: 0.1, cara: 'LSR akun ELSA tidak tersedia di Bybit — jujur: suara kerumunan absen, tidak dikarang' });
  } else if (kr.akunLongPct != null && (kr.akunLongPct >= 58 || kr.akunLongPct <= 42)) {
    const sisiKerumunan = kr.akunLongPct >= 58 ? 'LONG' : 'SHORT';
    const vote: 'NAIK' | 'TURUN' = sisiKerumunan === 'LONG' ? 'TURUN' : 'NAIK';
    const pausLawan = (sisiKerumunan === 'LONG' && data.net.sisiPenempatan === 'SHORT') || (sisiKerumunan === 'SHORT' && data.net.sisiPenempatan === 'LONG');
    out.push({
      dari: 'RADAR-PAUS:KERUMUNAN',
      vote,
      kekuatan: pausLawan ? 0.5 : 0.35,
      cara: `kerumunan sesak ${sisiKerumunan} (${kr.akunLongPct}% akun long) — sisi sesak = bahan bakar likuidasi${pausLawan ? `, dan paus justru menempatkan di sisi LAWAN (${data.net.sisiPenempatan}): paus melawan arus, sinyal terkuat keluarga ini` : ''}`,
    });
  } else {
    out.push({ dari: 'RADAR-PAUS:KERUMUNAN', vote: 'NETRAL', kekuatan: 0.12, cara: `kerumunan seimbang (${kr.akunLongPct ?? '—'}% akun long) — tak ada bahan bakar ekstrem` });
  }
  // DINDING — pertahanan dekat harga bicara ke dewan
  const dindingBid = dindingDekat(st, 'BID', data.harga);
  const dindingAsk = dindingDekat(st, 'ASK', data.harga);
  if (dindingBid && dindingAsk) {
    out.push({ dari: 'RADAR-PAUS:DINDING', vote: 'NETRAL', kekuatan: 0.15, cara: `dua dinding saling mengunci: BID ${dindingBid.venue} @${dindingBid.harga} ($${Math.round(dindingBid.usd).toLocaleString('id-ID')}) vs ASK ${dindingAsk.venue} @${dindingAsk.harga} ($${Math.round(dindingAsk.usd).toLocaleString('id-ID')}) — pasar ditarik dua penjaga, tunggu yang patah dulu` });
  } else if (dindingBid) {
    out.push({ dari: 'RADAR-PAUS:DINDING', vote: 'NAIK', kekuatan: 0.3, cara: `dinding BID ${dindingBid.venue} @${dindingBid.harga} $${Math.round(dindingBid.usd).toLocaleString('id-ID')} berdiri dekat harga — penjaga turun belum tumbang (dinding bisa bait: status ${dindingBid.status})` });
  } else if (dindingAsk) {
    out.push({ dari: 'RADAR-PAUS:DINDING', vote: 'TURUN', kekuatan: 0.3, cara: `dinding ASK ${dindingAsk.venue} @${dindingAsk.harga} $${Math.round(dindingAsk.usd).toLocaleString('id-ID')} menahan di atas — penjaga naik belum tumbang (dinding bisa bait: status ${dindingAsk.status})` });
  } else {
    out.push({ dari: 'RADAR-PAUS:DINDING', vote: 'NETRAL', kekuatan: 0.1, cara: 'tak ada dinding penjaga dalam 1% dari harga — medan terbuka' });
  }
  // V4 SENYAP — paus yang masuk TANPA DIKETAHUI (TWAP/absorpsi/CVD/OI/venue luar)
  // kini duduk di kursi dewan: inilah kecolongan "whale bisa masuk tanpa
  // diketahui" yang dulu lolos — arusnya terbaca meski harga diam
  const senyap = data.senyap;
  if (senyap && senyap.skor >= 45 && senyap.arahDominan !== 'NETRAL') {
    const top = senyap.temuan.filter((t) => t.arah === senyap.arahDominan).slice(0, 2);
    out.push({
      dari: 'RADAR-PAUS:SENYAP',
      vote: senyap.arahDominan,
      kekuatan: Math.min(0.6, (senyap.skor / 100) * 0.7),
      cara: `paus senyap skor ${senyap.skor}/100 condong ${senyap.arahDominan} — ${top.map((t) => t.judul).join(' · ') || senyap.vonis.slice(0, 120)}; arus berubah sambil harga diam = masuk tanpa diketahui yang kini TERBACA dan ikut memutuskan`,
    });
  } else if (senyap && senyap.skor >= 20) {
    out.push({ dari: 'RADAR-PAUS:SENYAP', vote: 'NETRAL', kekuatan: 0.12, cara: `indikasi senyap lemah (skor ${senyap.skor}/100, ${senyap.temuan.length} temuan) — menunggu konfirmasi antar denyut sebelum menekan dewan; tidak menggelembungkan` });
  } else {
    out.push({ dari: 'RADAR-PAUS:SENYAP', vote: 'NETRAL', kekuatan: 0.1, cara: `tak ada jejak paus senyap layak (skor ${senyap?.skor ?? 0}/100) — pita kontinu tetap merekam; ketiadaan bukti dilaporkan apa adanya` });
  }
  return out;
}

const JUJUR_JIWA = [
  'Identitas paus = SIDIK PERILAKU (venue × sisi taker × SIDIK UKURAN 0,4–2,5× median × rentang jam) — BUKAN alamat dompet: tanpa kunci on-chain nama asli tak terbaca, diakui terbuka. Kualitas v2: hanya cetakan KELAS PAUS (≥ 15× median, clamp $2000–8000) yang jadi neuron — kerumunan $500-an tidak lagi menyamar jadi paus.',
  'REKAM JEJAK PER PAUS: tiap duel benar/salah dicatat per nama — paus yang sering salah DIDEMOT lewat reputasi di formula keyakinan (bobot 0,10); paus menepat naik kelas. Rapor paus terbuka di kartu neuron.',
  'DINDING PAUS = orderbook NYATA 3 venue (Bybit spot/fut + Gate fut) dilacak lintas denyut: lahir → digigit → PATAH DIMAKAN / MUNDUR (bait). Pemilik dinding tetap tak terbaca; dinding juga bisa manipulasi — status MUNDUR dicatat sebagai terduga bait, bukan fakta niat.',
  'KEPAHAMAN TERTAMBANG: tiap duel dijawab candle 1j NYATA; aturan (funding/OI/dinding/kerumunan/tenaga) diberi rapor n/benar/akurasi yang tumbuh & tersimpan — akumulasi kepahaman yang terbaca manusia, salah pun diakui.',
  'KERUMUNAN ≠ PAUS: rasio long/short akun Bybit adalah CROWD (individu kecil) — dipakai sebagai peta bahan bakar likuidasi, bukan sebagai jejak paus. Untuk ELSA LSR sering kosong — kalau kosong, radar bilang kosong.',
  'Prediksi nasib (amunisi distributor / serapan akumulator / korban likuidasi) = ESTIMASI LAJU dari jendela teramati + orderbook sekarang — bukan janji; jendela recent-trade terbatas (menit), forensik jam dari Gate.',
  'V4 SENYAP: "whale masuk tanpa diketahui" kini dikejar — pita kontinu menyimpan cetakan lintas denyut (tak bisa hilang lagi), TWAP/absorpsi/CVD/OI membaca paus yang membelah order sambil harga diam, dan venue luar (BingX/Toobit/MEXC) disweep tiap denyut. Skor = kepadatan bukti, bukan kepastian; tape detail venue luar belum terbaca (diakui).',
];

// ---------------- denyut jiwa: satu napas penuh ----------------
export async function denyutPaus(data: PausData): Promise<PausJiwa> {
  const st = bacaState();
  normalkanDuel(st);
  const pulih = pulihkanNeuron(st);
  const kini = Date.now();
  st.denyutKe += 1;
  const diary: string[] = [];
  const catat = (teks: string) => { if (teks) diary.push(teks); };
  if (pulih > 0) catat(`pemulihan mandiri: ${pulih} neuron lama diperbaiki/dibuang (peninggalan proses lama di bawah kelas paus) — jiwa v2 tidak mewarisi mayat`);
  const tangkap = tangkapCetakan(st, data);
  if (tangkap.namaBaru.length) catat(`paus baru lahir: ${tangkap.namaBaru.join(', ')} — cetakan kelas paus (≥ $${Math.round(data.ambang.pausUsd || 2000).toLocaleString('id-ID')}) diakui lewat sidik ukuran dan mulai diingat`);
  if (tangkap.namaGabung.length) catat(`paus lama berdenyut lagi: ${tangkap.namaGabung.join(', ')} (${tangkap.gabung} cetakan cocok sidik ukurannya)`);
  deteksiDinding(st, data, kini, catat);
  hitungKeyakinanTenaga(st, data, kini);
  await jawabDuel(st, data, kini, catat);
  pilihDuel(st, data, kini, catat);
  const nasib = nasibPaus(st, data, kini);
  const kesaksian = kesaksianPaus(st, data);
  if (diary.length) {
    st.diary.unshift({ at: new Date(kini).toISOString(), teks: diary.join(' · ') });
    if (st.diary.length > CAP_DIARY) st.diary.length = CAP_DIARY;
  }
  st.at = new Date(kini).toISOString();
  tulisState(st);
  const neuronsUrut = [...st.neurons].sort((a, b) => b.tenaga - a.tenaga);
  const kepahaman: Pelajaran[] = Object.entries(st.kepahaman)
    .map(([kunci, v]) => ({ kunci, judul: KEPAHAMAN_DEFS[kunci] ?? kunci, n: v.n, benar: v.benar, akurasi: Math.round((v.benar / Math.max(1, v.n)) * 1000) / 1000 }))
    .sort((a, b) => b.n - a.n);
  const suaraKasat = kesaksian.filter((k) => k.vote !== 'NETRAL');
  const dindingPatah = st.dindingSelesai.filter((w) => w.status === 'PATAH').length;
  const vitaminTeks = suaraKasat.length
    ? `${suaraKasat.length} kesaksian paus bersuara (${suaraKasat.map((k) => `${k.dari.replace('RADAR-PAUS:', '')}=${k.vote}`).join(', ')}) dikirim ke dewan bukti AR-E10 arahVonis (bobot 0.10) · ${st.dindingAktif.length} dinding aktif dipantau (${dindingPatah} patah tercatat) · ${kepahaman.length} aturan kepahaman diberi rapor — radar paus ikut memutuskan, bukan mayat`
    : 'kesaksian paus kali ini netral — radar tetap berdenyut dan tetap mengirim suara (bobot dewan tetap dihitung)';
  return {
    at: st.at, denyutKe: st.denyutKe,
    neurons: neuronsUrut.slice(0, 40),
    duelAktif: st.duelAktif,
    duelSelesai: st.duelSelesai.slice(0, 12),
    kalibrasi: st.kalibrasi,
    dinding: { aktif: st.dindingAktif, selesai: st.dindingSelesai.slice(0, 16) },
    kepahaman,
    prediksiNasib: nasib,
    diary: st.diary,
    kesaksian,
    vitamin: { aktif: suaraKasat.length > 0, teks: vitaminTeks },
    jujur: JUJUR_JIWA,
  };
}

// baca jiwa tersimpan (untuk payload tanpa memicu fetch ulang)
export function bacaJiwaTersimpan(): PausJiwa | null {
  try {
    const st = bacaState();
    normalkanDuel(st);
    pulihkanNeuron(st);
    if (!st.neurons.length && !st.duelAktif.length) return null;
    const neuronsUrut = [...st.neurons].sort((a, b) => b.tenaga - a.tenaga);
    const kepahaman: Pelajaran[] = Object.entries(st.kepahaman)
      .map(([kunci, v]) => ({ kunci, judul: KEPAHAMAN_DEFS[kunci] ?? kunci, n: v.n, benar: v.benar, akurasi: Math.round((v.benar / Math.max(1, v.n)) * 1000) / 1000 }))
      .sort((a, b) => b.n - a.n);
    return {
      at: st.at, denyutKe: st.denyutKe,
      neurons: neuronsUrut.slice(0, 40),
      duelAktif: st.duelAktif,
      duelSelesai: st.duelSelesai.slice(0, 12),
      kalibrasi: st.kalibrasi,
      dinding: { aktif: st.dindingAktif, selesai: st.dindingSelesai.slice(0, 16) },
      kepahaman,
      prediksiNasib: [],
      diary: st.diary,
      kesaksian: [],
      vitamin: { aktif: false, teks: 'jiwa tersimpan dibaca dari neuron.json — denyut segar menyusul di denyut berikutnya' },
      jujur: JUJUR_JIWA,
    };
  } catch { return null; }
}
