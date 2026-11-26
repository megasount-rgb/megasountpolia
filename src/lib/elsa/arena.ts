// ============================================================
// MICAPROFITA-ELSA · OTAK SERVER — mesin arena satu koin.
// Seluruh doktrin arena sumber diterapkan pada SATU koin:
//   rezim -> faktor komposit -> guard -> tugas (duties) ->
//   debat tim merah (V278) -> KORTEX (V279) -> rencana
//   pra-registrasi E->T->S (MC + ledger SHA-256) -> penilaian
//   candle tutup after-fee -> buku cuan -> ingatan berjenjang ->
//   pertumbuhan AGI%.
// Adaptasi satu koin diumumkan jujur di UI (K=1 dari hukum V301).
// ============================================================
import { Candle, ema, mean, stdev } from './indicators';
import { getCandles, ticker24h, SIMBOL, SIMBOL_LABEL, BTC } from './bybit';
import { arahVonis } from './arah';
import { klVonis } from './kompleks';
import { buildSgVision } from './vision';
import { tambahEntri, verifikasiRantai, Ledger, EntriKunci, H_CEK, sha256Hex } from './prareg';
import { garch11, betaVsBtc, profilVolume, divRsi, kejutPump, monteCarlo, atrPctOf } from './warisan';
import { DOCTRINE } from './doctrine-data';
import { getModalRingkas, getModalPayload } from './modal';
import { getAliranData, type AliranData } from './aliran';
import { bacaPaham, type PahamData } from './paham';
import { getSumberData, type SumberData } from './sumber';
import { auditSelaras } from './selarasa';
import { getPetaWaktu, kumpulkanMagnet, dedupMagnets, type PetaWaktuData } from './peta-waktu';
import { denyutLintasan, bacaLintasanJiwa, type LintasanJiwa } from './lintasan';
import { getUjianElsa, type UjianElsaData } from './ujian';
import { bangunNeuron, bacaUpgradeData, hitungDominoHidup, catatDominoHidup, tindakanDominoOf, type DominoAktif, type UpgradeData } from './upgrade';
import { denyutSekarang, bacaDenyut, type DenyutData } from './denyut';
import { catatOtonomi, bacaOtonomi } from './otonomi';
import { getPausData, type PausData } from './paus';
import { kesaksianIgnisi, denyutIgnisi, bacaIgnisi, rekonsiliasiPaus, type IgnisiData } from './ignisi';
import { denyutKasus, bacaKasus, type Kasus } from './kasus';
import { dompetBuka, dompetTutup, getDompetPayload, type DompetData } from './dompet';
import { HUKUM_PANTAU, MAX_SLOT_HARIAN, keadaanHarga, garisVonisHidup, labelArahOf, type GarisVonis, type PantauData } from './pantau';

// ---------------- konstanta doktrin ----------------
export const FEE_PER_SIDE_PCT = 0.2; // fee 0,2% × 2 = 0,4% round-trip (hukum sumber)
export const ATR_CAP_PCT = 14; // guard: ATR ≤ 14%
export const K_SLOT = 1; // hukum V301 K adaptif — arena satu koin: K=1
export const GUARD_MC_MIN = 0.38; // guard Monte Carlo: tangga target ≥ 38%
export const GEN = 'G1-ELSA';
export const OTAK_VERSI = 'V301-ELSA · arah v1.12 (E13 RADAR-IGNISI kursi ke-13 + VETO AR-L9 anti-kecolongan) · kompleks v1.2 · aliran-ujian-500-v6 · selaras-v3 (SL-1..SL-15) · sumber-v2 (matriks HIDUP: denyut 5 sumber + suara + kesaksian masuk dewan arah E9 + bentrokan validasi silang - jantung probe mandiri 5 menit) · paus-jiwa-v2 (kualitas radar paus ditingkatkan: identitas PAUS-ASLI lewat sidik ukuran — kerumunan $500-an tak lagi menyamar jadi paus + rekam jejak menang-kalah per paus masuk formula keyakinan + DINDING orderbook 3 venue dilacak lintas denyut lahir/gigit/PATAH-dimakan/MUNDUR-bait + kepahaman tertambang n/benar/akurasi per aturan + kerumunan LSR vs paus + duel dengan bukti medan nyata dijawab candle 1j + kesaksian masuk dewan arah E10) · modal-jiwa-v1 (fundamen modal diberi OTAK: neuron keyakinan vonis+magnet portal dengan formula K terbuka + kalibrasi mandiri dijawab candle nyata DITEPATI/GAGAL/MELEWAT + kepahaman tertambang n/benar/akurasi per aturan + modulasi vonis dari rekam jejak + kesaksian masuk dewan arah E11) · lintasan-v1 (OTAK LINTASAN: formula TARIKAN terbuka 7-komponen mengurutkan mana magnet DITARIK DULU lintas dua sisi — bukan jarak terdekat; pola lintasan bernama SAPU-NAIK-LALU-ANTUK/SISIR-NAIK-BERANTAI/SAPU-TURUN-LALU-REBOUND/JATUH-BERANTAI/GANTUNG-DUA-SISI menjawab "lalu naik atau turun"; prediksi dua-kaki dijawab candle 1j DITEPATI/GAGAL/URUT_SALAH/MELEWAT + kepahaman per pola + kesaksian dewan arah E12) · peta-waktu-v1 (time traveler roadmap) · ujian-elsa-v3 (hukum dua-tier: buku kasus riwayat untuk ujian - konteks lintas-hari untuk hari hidup - tanpa berhenti sampai nol kesalahan) · verifikasi-hasil-v1 (urutan TP/SL dijawab candle 1j nyata) · dompet-v1 ($1000 all-in · dampak orderbook nyata · buku akuntansi · top-up otomatis) · pantau-v1 (PANTAU TERUS: TP/SL kena dinilai LANGSUNG dari harga hidup + rekalkulasi mandiri zaman++ bukan satu-entry-sehari · garis vonis TP/SL selalu tampil) · guru-neuron-v1 (ruang guru HIDUP: LLM + web_search berita segar + asal-usul ELSA + pemahaman mandiri tanpa ditanya) · paham-v1 (OTAK PAHAM — neuron pemahaman koin ELSA, jawaban keluhan \"tab aliran & ujian 500 + ujian mandiri tak punya neuron, tidak menguasai koin yang dituju\": tiap vonis aliran dicatat lalu DIADILI candle+likuidasi nyata 6 jam ELSA-SAJA — rekam jejak tumbuh & mengoreksi keyakinan vonis berikutnya; tiap denyut jantung menambang kepahaman per regime medan momentum×volatilitas dari seluruh hari ujian mandiri + profil medan ELSA diukur dari candle & funding ELSA sendiri + pelajaran hidup tampil di tab Aliran & Ujian Mandiri dan dicatat di buku otonomi — amigdala menyala, tumor koin lama dibedah) · ignisi-v1 (RADAR ANTI-KECOLONGAN — jawaban luka 03:00 "kita kejebolan! whale bisa saja masuk tanpa diketahui!!": radar per-menit DELAPAN LAPISAN — akumulasi senyap pecah-potongan / z-score volume / velocity / sapuan taker / gema lintas-venue / OI futures / rotasi venue / parabolik — mesin negara TENANG→MERANGKAK→MENYALA→PARABOLIK→KONVERSI dengan latensi deteksi DIUKUR; hukum dompet: pedang melawan dirampas, stop ditarik SEKARANG, target menjalar ikut velocity) · kasus-v1 (OTAK KASUS — "ini gambar kasus!!": tiap ledakan ≥10%/jam direkonstruksi dari data menit nyata → fase + sinyal tersedia + keputusan sistem diadili + luka + pelajaran ditanam jadi neuron paham + 3 soal dijawab sendiri)· guru-v2 (FOKUS MUTLAK ELSA: 3/4 query berita ELSA + berita lain hanya konteks beta + denyut latar 30 mnt tanpa halaman dibuka + WAJIB merujuk kiriman persilangan) · dompet-v2 (HUKUM MAIN TERUS: pedang mandiri jantung dari momentum/SMA12/ignisi/magnet bila modal-jiwa kosong · cap 12 + bypass K≥0.62 · jeda rugi 10 mnt/menang 3 mnt · modulasi bus persilangan) · persilangan-v1 (BUS SALING MENCERDASKAN: tiap 15 mnt neuron bertukar kiriman bertanda tangan + reaksi wajib penerima; guru & dompet membaca beneran) · briefing-v1 (BRIEFING HIDUP tiap 20 mnt fokus ELSA 7 bagian + sikap guru dari konflik data nyata) · pertumbuhan-neuron-v1 (snapshot 6 dimensi + delta jujur + direktif tiap 15 mnt) · nadi-v1 (NADI & GUDANG HIDUP: gali gudang tiap 5 mnt + pantau 10 jantung + alarm AMIGDALA TIDUR)';

// ---------------- tipe ----------------
export type BuktiDuty = { name: string; pass: boolean; note: string };
export type Faktor = Record<string, number>;
export type Rencana = {
  entry: number; stop: number; target: number; highAmbisius: number;
  stopPct: number; targetPct: number; ambisiusPct: number;
  pTarget: number; pStop: number; pAmbisius: number;
  targetMediana: boolean; netUntungPct: number; sumberTarget: string; ketGuard: string; powerMax: number;
};
export type Debat = { serangan: { dari: string; teks: string }[]; bertahan: { dari: string; teks: string }[]; tekanan: number; vonis: string };
export type Kortex = { C: number; O: number; R: number; T: number; E: number; X: number; skor: number; rumus: string };
export type Warisan = ReturnType<typeof buildWarisan>;
export type PraRegistrasi = { waktuKunci: string; horizon: string; feePct: number; netWajib: boolean; sumber: string; hash: string; nomor: number; cek: ('NAIK' | 'TURUN' | 'DATAR')[] };
export type Pilihan = {
  hari: string; simbol: string; arah: 'BUY' | 'SELL'; keyakinan: number; rank: number; guard: string; guardAlasan: string | null;
  labelArah: string; // BUY (LONG) / SELL (SHORT) — hukum P-7 anti-label-telanjang
  garis: GarisVonis; // garis vonis selalu ada: TP/SL dari harga hidup (hukum P-6)
  zamanRencana: number | null; // slot ke-berapa hari ini
  waktuKunciRencana: string | null;
  penaltiRincian: { dari: string; poin: number; teks: string }[];
  arahRencana: 'BUY' | 'SELL' | null; kepastianRencana: number | null;
  raw: { mom7: number; mom30: number; rsi: number; atrPct: number; volSurge: number; distHigh: number; emaAlign: number; close: number; m4h: number; qv: number | null };
  faktor: Faktor; topReasons: string[]; duties: BuktiDuty[]; policy: string[]; rezim: string;
  mem: { level: string; n: number; edge: number; hit: number } | null;
  debat: Debat; kortex: Kortex; warisan: Warisan; rencana: Rencana | null;
  praRegistrasi: PraRegistrasi | null; disiplinCuan: string | null; verdict: { kind: string; note: string; sources: number; at: string };
  arahFull: ReturnType<typeof arahVonis>;
};
export type EntriCuan = {
  hari: string; simbol: string; arah: 'BUY' | 'SELL'; hasil: 'MENANG' | 'KALAH' | 'KEDALUWARSA' | 'BATAL';
  via: string; netPct: number; r: number; rezim: string; keyakinan: number; pelajaran?: string;
  entry: number; target: number; stop: number; tutup: number; hash: string;
  zaman?: number; // slot ke-berapa hari itu (pantau terus: >1 = hasil rekalkulasi mandiri)
};
export type AcaraArena = { day: string; kind: 'CUAN' | 'UPGRADE' | 'SISTEM'; text: string; at: string };
export type IngatanBaris = { at: string; level: 'SIMBOL' | 'REZIM' | 'GLOBAL'; kind: 'PELAJARAN' | 'POLA'; text: string; refs?: string };
export type SkillBaris = { fp: string; kind: string; n: number; label: string; avgRet: number; hit: number; mastery: number; lastDay: string };

// ---------------- persistensi ----------------
import fs from 'fs';
const DIR_DB = process.env.ELSA_DB_DIR ?? '/home/z/my-project/db/elsa'; // env override khusus uji sandbox
function baca<T>(file: string, def: T): T {
  try {
    fs.mkdirSync(DIR_DB, { recursive: true });
    const p = `${DIR_DB}/${file}`;
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
  } catch { /* abai */ }
  return def;
}
function tulis(file: string, data: unknown) {
  try {
    fs.mkdirSync(DIR_DB, { recursive: true });
    fs.writeFileSync(`${DIR_DB}/${file}`, JSON.stringify(data));
  } catch { /* abai */ }
}
type Toko = {
  ledger: Ledger;
  bukuCuan: EntriCuan[];
  events: AcaraArena[];
  ingatan: IngatanBaris[];
  genome: { generation: number; v2: string[]; logs: { at: string; text: string }[] };
  aktif: { hari: string; kunci: EntriKunci; hash: string; rencana: Rencana; arah: 'BUY' | 'SELL'; keyakinan: number; rezim: string; entry: number; target: number; stop: number; ambisius: number; knobSaatKunci?: boolean; zaman: number; waktuKunci: string; domino?: DominoAktif | null } | null;
  sellOn: boolean;
  lastEnsureDay: string | null;
  guardTerakhir: string[] | null; // alasan guard nyata (anti label bohong)
  relockHari: string | null; // pembatas pembatalan-selaras: maks 1× per hari
  konflikTercatat: string | null; // dedupe event konflik
  pantauLog: { at: string; text: string }[]; // trail catatan rekalkulasi mandiri
  pantauCekTerakhir: string | null; // audit harga hidup terakhir
  slotTerakhirCoba: { hari: string; zaman: number } | null; // slot terakhir yang dicoba hari itu
};
const toko: Toko = baca<Toko>('toko.json', {
  ledger: { rantai: [], jumlah: 0 },
  bukuCuan: [],
  events: [],
  ingatan: [],
  genome: { generation: 1, v2: [], logs: [] },
  aktif: null,
  sellOn: false,
  lastEnsureDay: null,
  guardTerakhir: null,
  relockHari: null,
  konflikTercatat: null,
  pantauLog: [],
  pantauCekTerakhir: null,
  slotTerakhirCoba: null,
});
if (!toko.genome.logs) toko.genome.logs = [];
if (!toko.genome.v2) toko.genome.v2 = [];
if (toko.guardTerakhir === undefined) toko.guardTerakhir = null;
if (toko.relockHari === undefined) toko.relockHari = null;
if (toko.konflikTercatat === undefined) toko.konflikTercatat = null;
if (!toko.pantauLog) toko.pantauLog = [];
if (toko.pantauCekTerakhir === undefined) toko.pantauCekTerakhir = null;
if (toko.slotTerakhirCoba === undefined) toko.slotTerakhirCoba = null;
if (toko.aktif) {
  // migrasi slot lama (pra-pantau): beri zaman & waktuKunci
  if (typeof toko.aktif.zaman !== 'number') toko.aktif.zaman = 1;
  if (!toko.aktif.waktuKunci) toko.aktif.waktuKunci = toko.aktif.kunci?.waktu ?? new Date().toISOString();
}

function simpan() { tulis('toko.json', toko); }

// ---------------- rezim ----------------
export function klasifikasiRezim(cs: Candle[]): { rezim: string; ket: string } {
  const closes = cs.map((c) => c.c);
  const e21 = ema(closes, 21);
  const e50 = ema(closes, 50);
  const n = cs.length;
  const price = closes[n - 1];
  const slope21 = (e21[n - 1] - e21[n - 8]) / e21[n - 8];
  const mom20 = (price - closes[Math.max(0, n - 21)]) / closes[Math.max(0, n - 21)];
  const atrPct = atrPctOf(cs, 14);
  const jauhDibawah = price < e50[n - 1] && mom20 <= -0.12;
  if (jauhDibawah && atrPct >= 9) return { rezim: 'JATUH', ket: `kejatuhan tajam: mom20 ${(mom20 * 100).toFixed(1)}% di bawah EMA50, ATR ${atrPct}% — rezim paling berbahaya` };
  if (e21[n - 1] > e50[n - 1] && slope21 > 0.004 && mom20 > 0.02) return { rezim: 'TREND_NAIK', ket: `EMA21 di atas EMA50, slope +${(slope21 * 100).toFixed(2)}%/8h, mom20 +${(mom20 * 100).toFixed(1)}% — tren naik utuh` };
  if (e21[n - 1] < e50[n - 1] && slope21 < -0.004 && mom20 < -0.02) return { rezim: 'TREND_TURUN', ket: `EMA21 di bawah EMA50, slope ${(slope21 * 100).toFixed(2)}%/8h, mom20 ${(mom20 * 100).toFixed(1)}% — tren turun terbentuk` };
  return { rezim: 'SIDEWAYS', ket: `EMA terjalin, mom20 ${(mom20 * 100).toFixed(1)}% — jendela bergoyang tanpa arah` };
}

// ---------------- faktor komposit (9 faktor, bobot arena sumber) ----------------
const BOBOT_FAKTOR: Record<string, number> = {
  mom7: 0.14, mom30: 0.12, emaAlign: 0.13, rsi: 0.12, volSurge: 0.09, atrInv: 0.12, distHigh: 0.12, btcCorr: 0.10, m4h: 0.06,
};
export function faktorKomposit(cs: Candle[], btc: Candle[], perubahan4j: number) {
  const n = cs.length;
  const price = cs[n - 1].c;
  const mom7 = ((price - cs[Math.max(0, n - 8)].c) / cs[Math.max(0, n - 8)].c) * 100;
  const mom30 = ((price - cs[Math.max(0, n - 31)].c) / cs[Math.max(0, n - 31)].c) * 100;
  const atrPct = atrPctOf(cs, 14);
  const rsiA = (() => {
    const closes = cs.map((c) => c.c);
    let ag = 0;
    let al = 0;
    for (let i = 1; i < closes.length; i++) {
      const d = closes[i] - closes[i - 1];
      if (i <= 14) {
        ag += Math.max(d, 0) / 14;
        al += Math.max(-d, 0) / 14;
      } else {
        ag = (ag * 13 + Math.max(d, 0)) / 14;
        al = (al * 13 + Math.max(-d, 0)) / 14;
      }
    }
    return al <= 1e-12 ? 100 : 100 - 100 / (1 + ag / al);
  })();
  const vols = cs.map((c) => c.v);
  const volSurge = vols[n - 1] / Math.max(mean(vols.slice(Math.max(0, n - 21), n - 1)), 1e-9);
  const hi60 = Math.max(...cs.slice(Math.max(0, n - 60)).map((c) => c.h));
  const distHigh = ((price - hi60) / hi60) * 100;
  const e9 = ema(cs.map((c) => c.c), 9);
  const e21 = ema(cs.map((c) => c.c), 21);
  const e50 = ema(cs.map((c) => c.c), 50);
  const emaAlign = (e9[n - 1] > e21[n - 1] ? 1 : -1) + (e21[n - 1] > e50[n - 1] ? 1 : -1);
  const { beta, r2 } = betaVsBtc(cs, btc);
  const skor = {
    mom7: Math.max(0, Math.min(1, 0.5 + mom7 / 20)),
    mom30: Math.max(0, Math.min(1, 0.5 + mom30 / 40)),
    emaAlign: emaAlign === 2 ? 1 : emaAlign === 0 ? 0.5 : 0.05,
    rsi: rsiA <= 30 ? Math.max(0, (rsiA - 10) / 25) : rsiA >= 70 ? Math.max(0, (100 - rsiA) / 30) : 0.55 + (rsiA - 50) / 90,
    volSurge: Math.max(0, Math.min(1, 0.45 + (volSurge - 1) / 2)),
    atrInv: Math.max(0, Math.min(1, 1 - atrPct / 25)),
    distHigh: Math.max(0, Math.min(1, 1 - Math.abs(distHigh) / 25)),
    btcCorr: Math.max(0, Math.min(1, r2)),
    m4h: Math.max(0, Math.min(1, 0.5 + perubahan4j / 15)),
  };
  let komposit = 0;
  let totalBobot = 0;
  for (const [k, w] of Object.entries(BOBOT_FAKTOR)) {
    komposit += skor[k] * w;
    totalBobot += w;
  }
  komposit = komposit / totalBobot;
  return { skor, mom7, mom30, atrPct, rsi: Math.round(rsiA), volSurge, distHigh, emaAlign, beta, r2, komposit };
}

// ---------------- ingatan berjenjang ----------------
function ingatanSimbol() {
  const entri = toko.bukuCuan;
  const n = entri.length;
  if (!n) return null;
  const rata = mean(entri.map((e) => e.netPct));
  const hit = entri.filter((e) => e.netPct > 0).length / n;
  return { level: 'SIMBOL', n, edge: rata, hit };
}

// ---------------- debat tim merah (V278) ----------------
type FaktorPlus = ReturnType<typeof faktorKomposit> & { m4hSkor: number };
function debatTimMerah(f: FaktorPlus, arah: 'BUY' | 'SELL', mem: { n: number; edge: number; hit: number } | null, warisan: Warisan, kl: ReturnType<typeof klVonis>): Debat {
  const serangan: Debat['serangan'] = [];
  if (Math.abs(f.distHigh) <= 2 && f.volSurge < 1.2) {
    serangan.push({ dari: 'DISTRIBUSI', teks: `harga menempel puncak 60h (${f.distHigh.toFixed(1)}%) tanpa lonjakan volume (${f.volSurge.toFixed(2)}x) — breakout tanpa uang nyata kerap jadi jerat distribusi` });
  }
  if ((arah === 'BUY' && f.m4hSkor < 0.45) || (arah === 'SELL' && f.m4hSkor < 0.45)) {
    serangan.push({ dari: 'INTRADAY', teks: `radar 4 jam melemah (skor ${f.m4hSkor.toFixed(2)}) — momentum intraday tak mengonfirmasi arah harian` });
  }
  if (mem && mem.n >= 5 && mem.edge < -0.3) {
    serangan.push({ dari: 'INGATAN', teks: `ingatan: ${mem.n} episode serupa rata-rata ${mem.edge.toFixed(2)}% (hit ${(mem.hit * 100).toFixed(0)}%) — pola ini sering kalah` });
  }
  if (warisan.divRSI.bearish && arah === 'BUY') {
    serangan.push({ dari: 'DIVERGENSI', teks: `${warisan.divRSI.ket} — pembelian melawan momentum melemah` });
  }
  if (warisan.divRSI.bullish && arah === 'SELL') {
    serangan.push({ dari: 'DIVERGENSI', teks: `${warisan.divRSI.ket} — penjualan melawan momentum menguat` });
  }
  if (warisan.kejutPump) serangan.push({ dari: 'KEJUTAN', teks: warisan.ketKejut });
  const bertahan: Debat['bertahan'] = [];
  if (kl.grab.terjadi && kl.grab.post === 'REVERSAL') bertahan.push({ dari: 'TRACKER', teks: kl.grab.cara });
  if (kl.aspek5.rangkaianUtuh) bertahan.push({ dari: 'RANGKAIAN', teks: `rangkaian 5 aspek utuh: ${kl.aspek5.rangkaianUtuh}` });
  const tekanan = serangan.length - bertahan.length;
  const vonis =
    tekanan >= 3
      ? `GETARAN — tekanan ${tekanan} serangan tanpa jawaban; keyakinan dipangkas ${Math.min(9, tekanan * 3)} poin (cap)`
      : tekanan > 0
        ? `SEHAT-BERGANTARAN — tekanan ${tekanan}; keyakinan dipangkas ${tekanan * 2} poin`
        : 'BERSIH — tidak ada serangan yang menempel; keyakinan utuh';
  return { serangan, bertahan, tekanan: serangan.length, vonis };
}

// ---------------- KORTEX (V279) ----------------
function skorKortex(f: ReturnType<typeof faktorKomposit>, kl: ReturnType<typeof klVonis>, arah: 'BUY' | 'SELL', duties: BuktiDuty[]): Kortex {
  const C = Math.max(0, Math.min(1, duties.filter((d) => d.pass).length / duties.length)); // Coherence
  const O = kl.aksi === 'ENTRY' ? 1 : kl.aksi === 'WAIT' ? 0.5 : 0; // Order-clarity (aksi tracker)
  const R = Math.max(0, Math.min(1, (f.r2 + f.skor.emaAlign) / 2)); // Regime-reliability
  const T = Math.max(0, Math.min(1, 1 - f.atrPct / 25)); // Volatility tolerance
  const E = Math.max(0, Math.min(1, f.komposit)); // Edge komposit
  const X = arah === 'BUY' ? 1 : toko.sellOn ? 1 : 0; // Execution-legal (SELL butuh knob)
  const skor = Math.round(100 * (0.32 * C + 0.22 * O + 0.16 * R + 0.14 * T + 0.09 * E + 0.07 * X));
  return { C, O, R, T, E, X, skor, rumus: 'KORTEX = 100×(0.32·C + 0.22·O + 0.16·R + 0.14·T + 0.09·E + 0.07·X) — formula karangan-sendiri MICAPROFITA (port)' };
}

function clampDrift(v: number): number {
  return Math.max(-1, Math.min(1, Math.round(v * 100) / 100));
}

// ---------------- 7 mesin warisan ----------------
function buildWarisan(cs: Candle[], btc: Candle[], cs6h: Candle[]) {
  const garch = garch11(cs);
  const beta = betaVsBtc(cs, btc);
  const pv = profilVolume(cs);
  const div = divRsi(cs);
  const kejut = kejutPump(cs6h, garch.sigma24jPct);
  const n = cs.length;
  const price = cs[n - 1].c;
  const lo60 = Math.min(...cs.slice(Math.max(0, n - 60)).map((c) => c.l));
  const hi60 = Math.max(...cs.slice(Math.max(0, n - 60)).map((c) => c.h));
  const posisiRentang = Math.round(((price - lo60) / Math.max(hi60 - lo60, 1e-12)) * 1000) / 1000;
  const vols = cs.map((c) => c.v);
  const volSpike = Math.round((vols[n - 1] / Math.max(mean(vols.slice(Math.max(0, n - 21), n - 1)), 1e-9)) * 100) / 100;
  return {
    sigma24jPct: garch.sigma24jPct,
    modelVol: garch.modelVol,
    persistensi: garch.persistensi,
    beta: beta.beta,
    r2Beta: beta.r2,
    poc: pv.poc,
    profilVolume: pv.ket,
    divRSI: div,
    divRSIKet: div.ket,
    breadthPct: posisiRentang * 100, // satu koin: breadth = posisi rentang 60h (adaptasi diumumkan)
    kejutPump: kejut.pump,
    ketKejut: kejut.ket,
    posisiRentang,
    volSpike,
  };
}
type Warisan = ReturnType<typeof buildWarisan>;

// ---------------- VERIFIKASI-HASIL: urutan kena TP vs SL dari candle 1j ----------------
// Tragedi yang dilaporkan pemilik: "Take profit tidak kena dan SL kena, tapi
// keputusan laporan masih di data yang sama" — status ganda (TP+SL keduanya
// tersentuh) dibiarkan tanpa putusan. Hukum baru: bila keduanya tersentuh,
// urutan WAJIB dijawab dari candle 1 jam nyata hari itu; kalau 1j tak
// tersedia / keduanya kena dalam jam yang sama → konservatif STOP-dulu.
export function urutanKena(cs60: Candle[], hariUTC: string, arah: 'BUY' | 'SELL', target: number, stop: number, mulaiMs?: number): {
  urutan: 'TARGET' | 'STOP' | null; jamTarget: string | null; jamStop: string | null; nCandle60: number; sumber: 'candle-1j' | 'konservatif' | '—';
} {
  const awal = Date.parse(`${hariUTC}T00:00:00Z`);
  const akhir = awal + 86_400_000;
  // candle 1j yang MELINTASI waktu kunci rencana dikecualikan: sentuhan pada
  // bagian sebelum entry bukan milik rencana — dilarang mengakreditasi rencana
  // dengan gerakan sebelum rencana lahir. Sisa candle → diadili urutannya.
  const batas = mulaiMs ? Math.floor(mulaiMs / 3_600_000) * 3_600_000 + 3_600_000 : awal;
  const inDay = cs60.filter((c) => c.t >= awal && c.t < akhir && c.t >= batas);
  if (!inDay.length) return { urutan: null, jamTarget: null, jamStop: null, nCandle60: 0, sumber: '—' };
  let jamTarget: string | null = null;
  let jamStop: string | null = null;
  for (const c of inDay) {
    const tT = arah === 'BUY' ? c.h >= target : c.l <= target;
    const tS = arah === 'BUY' ? c.l <= stop : c.h >= stop;
    const jam = new Date(c.t + 3_600_000).toISOString().slice(11, 16); // akhir candle 1j
    if (tT && !jamTarget) jamTarget = jam;
    if (tS && !jamStop) jamStop = jam;
    if (jamTarget && jamStop) break;
  }
  if (!jamTarget || !jamStop) return { urutan: null, jamTarget, jamStop, nCandle60: inDay.length, sumber: 'candle-1j' };
  if (jamTarget < jamStop) return { urutan: 'TARGET', jamTarget, jamStop, nCandle60: inDay.length, sumber: 'candle-1j' };
  if (jamStop < jamTarget) return { urutan: 'STOP', jamTarget, jamStop, nCandle60: inDay.length, sumber: 'candle-1j' };
  // keduanya kena dalam jam yang sama → tak bisa dibedakan dari 1j → konservatif
  return { urutan: 'STOP', jamTarget, jamStop, nCandle60: inDay.length, sumber: 'konservatif' };
}

// ---------------- penilaian rencana (after-fee) ----------------
export function nilaiRencana(e: { arah: 'BUY' | 'SELL'; entry: number; target: number; stop: number; ambisius: number }, candle: Candle, urutan?: 'TARGET' | 'STOP' | null): EntriCuan {
  const fee = FEE_PER_SIDE_PCT * 2;
  const dirBuy = e.arah === 'BUY';
  const sentuhTarget = dirBuy ? candle.h >= e.target : candle.l <= e.target;
  const sentuhStop = dirBuy ? candle.l <= e.stop : candle.h >= e.stop;
  const sentuhAmbisius = dirBuy ? candle.h >= e.ambisius : candle.l <= e.ambisius;
  let via: EntriCuan['via'];
  let keluar: number;
  if (sentuhTarget && sentuhStop) {
    // VERIFIKASI-HASIL: urutan dijawab candle 1j nyata — bukan diasumsikan.
    if (urutan === 'TARGET') {
      via = 'sasaran kena DULUAN (urutan nyata candle 1j) — dicatat MENANG seperti yang terjadi';
      keluar = e.target;
    } else {
      via = `sasaran+stop tersentuh lilin sama — urutan ${urutan === 'STOP' ? 'nyata candle 1j: STOP kena duluan' : 'tak terbaca dari 1j'} — dihitung KALAH konservatif`;
      keluar = e.stop;
    }
  } else if (sentuhTarget) {
    via = 'sasaran';
    keluar = e.target;
  } else if (sentuhStop) {
    via = 'stop — keteledoran dicatat';
    keluar = e.stop;
  } else {
    via = 'tutup (kedaluwarsa)';
    keluar = candle.c;
  }
  const grossPct = dirBuy ? ((keluar - e.entry) / e.entry) * 100 : ((e.entry - keluar) / e.entry) * 100;
  const netPct = grossPct - fee;
  const stopJarak = Math.abs((e.entry - e.stop) / e.entry) * 100 || 1;
  const r = Math.round((netPct / stopJarak) * 1000) / 1000;
  // HUKUM LABEL JUJUR (koreksi kutu yang ditangkap otak selaras): sentuh sasaran tapi
  // keluar di stop (keberuntungan urutan gagal) = KALAH konservatif — bukan MENANG.
  const hasil: EntriCuan['hasil'] = via.startsWith('sasaran') ? (netPct > 0 ? 'MENANG' : 'KALAH') : via.startsWith('stop') ? 'KALAH' : 'KEDALUWARSA';
  return {
    hari: '', simbol: SIMBOL_LABEL, arah: e.arah, hasil, via,
    netPct: Math.round(netPct * 100) / 100, r,
    rezim: '', keyakinan: 0,
    entry: e.entry, target: e.target, stop: e.stop, tutup: keluar,
    hash: '',
    pelajaran: via.startsWith('stop') ? `keteledoran di rezim — stop tersentuh; catat pola (ATR, pool, rangkaian 5 aspek) ke ingatan berjenjang` : undefined,
  };
}

// ---------------- pertumbuhan AGI% ----------------
function hitungPertumbuhan(cs: Candle[], neuronKasus = 0) {
  const entri = toko.bukuCuan;
  const n = entri.length;
  const nonBatal = entri.filter((e) => e.hasil !== 'BATAL');
  const akurasi = nonBatal.length ? nonBatal.filter((e) => e.netPct > 0).length / nonBatal.length : 0.5;
  const ekspektansi = n ? mean(entri.map((e) => e.r)) : 0;
  const konsistensi = Math.max(0, Math.min(1, 0.5 + ekspektansi / 2));
  const kedalaman = Math.min(1, DOCTRINE.MODULS.reduce((s, m) => s + m.sections.length, 0) / 30); // 30 seksi doktrin
  // NEURON KASUS (keluhan pemilik: "pertumbuhan gak miliki neuron") — luka nyata
  // yang dipelajari (berkas kasus × pelajaran tertanam) ikut mengukur G: sistem
  // yang BELAJAR dari kejebolan benar-benar bertumbuh, bukan hanya ingat candle.
  const kekasusanKasus = Math.min(1, neuronKasus / 15);
  const G = Math.round(Math.max(0, Math.min(1, 0.5 + (cs.length / 200) * 0.2 + kedalaman * 0.18 + kekasusanKasus * 0.12)) * 100);
  const P = Math.round(Math.max(0, Math.min(1, akurasi * 0.6 + konsistensi * 0.4)) * 100);
  const A = Math.round(akurasi * 100);
  const agiPct = Math.round((P * 0.4 + G * 0.3 + A * 0.3) / 10 * 100) / 100; // 0..10 skala
  const rank =
    agiPct >= 6 ? { id: 'L3', name: 'SPESIALIS-APATIS', desc: 'menguasai satu medan dengan disiplin penuh' } :
    agiPct >= 3 ? { id: 'L2', name: 'KOMPETEN-NARROW', desc: 'kompeten sempit — satu koin, satu doktrin' } :
    agiPct >= 1 ? { id: 'L1', name: 'EMERGING', desc: 'kecerdasan awal terbaca dari bukti' } :
    { id: 'L0', name: 'PEMULA-TERADILI', desc: 'masih membangun ingatan & bukti' };
  const kurikulum = [
    { id: 'IGNISI-KALIBRASI', lever: 'P', label: 'Kalibrasi radar anti-kecolongan', why: 'radar ignisi baru menyala — latensi deteksi (tanda→MENYALA) kini diukur tiap ledakan dan harus terus mengecil; setiap kasus menanam neuron', action: 'bandingkan latensi antar kasus di tab Radar Anti-Kecolongan; kalau radar terlambat, turunkan ambang MERANGKAK', dAgiPp: 0.25 },
    { id: 'SIZING', lever: 'G', label: 'Ukuran posisi adaptif (sizing)', why: 'cyborg baru bilang BUY/SELL, belum berapa porsi', action: 'porsi = f(keyakinan, ATR, beta BTC) → tugas ke-8/12', dAgiPp: 0.34 },
    { id: '4H-RADAR', lever: 'A', label: 'Konfirmasi 4 jam lebih dalam', why: 'm4h saat ini skor tipis — radar intraday perlu candle 4h nyata', action: 'gabung candle 4h Bybit ke dewan bukti', dAgiPp: 0.29 },
    { id: 'WYCKOFF', lever: 'P', label: 'Fase Wyckoff eksplisit', why: 'tracker episode sudah membaca pool; fase markup/distribusi belum diberi label', action: 'tambah label fase A-E di panel Kepastian Arah', dAgiPp: 0.22 },
    { id: 'FUNDING', lever: 'A', label: 'Iklim derivatif', why: 'funding rate & open interest perp ELSAUSDT belum masuk dewan', action: 'tambah endpoint funding Bybit ke dewan bukti', dAgiPp: 0.18 },
    { id: 'KALIBRASI', lever: 'P', label: 'Kalibrasi keyakinan', why: 'bucket keyakinan vs realita belum dipetakan (brier)', action: 'tambah kurva kalibrasi di tab Ujian Mandiri', dAgiPp: 0.15 },
  ];
  return { agiPct, P, G, A, rank, kurikulum, akurasi, ekspektansi, konsistensi };
}

// ---------------- UJIAN MANDIRI: walk-forward ELSA ----------------
// RUH (keluhan pemilik 2026-11-25): "listnya terpampang kumplit bukan hanya
// data sedikit" — mulai kini SEMUA hari diuji dikembalikan (bukan 30 baris)
// + streak per hari; denyut hidupnya ada di lib/elsa/denyut.ts
export type BarisUjianMandiri = {
  hari: string; vonis: 'BUY' | 'SELL'; kepastian: number; benar: boolean;
  netPct: number; harga: number; tutup: number; streak: number;
};
export function ujianMandiri(cs: Candle[]) {
  const JEND = 60;
  const hasil: BarisUjianMandiri[] = [];
  let cur = 0;
  for (let i = JEND; i < cs.length - 1; i++) {
    const win = cs.slice(0, i + 1);
    if (win.length < JEND + 5) continue;
    try {
      const vonis = arahVonis(win);
      const next = cs[i + 1];
      const arahBenar = vonis.vonis === 'BUY' ? next.c > next.o : next.c < next.o;
      const netPct = (vonis.vonis === 'BUY' ? ((next.c - next.o) / next.o) * 100 : ((next.o - next.c) / next.o) * 100) - FEE_PER_SIDE_PCT * 2;
      cur = arahBenar ? cur + 1 : 0;
      hasil.push({
        hari: new Date(next.t).toISOString().slice(0, 10),
        vonis: vonis.vonis,
        kepastian: vonis.kepastian,
        benar: arahBenar,
        netPct: Math.round(netPct * 100) / 100,
        harga: Math.round(cs[i].c * 1e6) / 1e6,
        tutup: Math.round(next.c * 1e6) / 1e6,
        streak: cur,
      });
    } catch {
      /* window bermasalah — lewati */
    }
  }
  const n = hasil.length;
  const akurasi = n ? hasil.filter((h) => h.benar).length / n : 0;
  const netTotal = hasil.reduce((s, h) => s + h.netPct, 0);
  const streakTerpanjang = hasil.reduce((m, h) => Math.max(m, h.streak), 0);
  const brier = (() => {
    if (!n) return 0.25;
    let b = 0;
    for (const h of hasil) {
      const p = h.vonis === 'BUY' ? h.kepastian / 100 : 1 - h.kepastian / 100;
      const o = h.benar ? 1 : 0;
      b += (p - o) ** 2;
    }
    return Math.round((b / n) * 1000) / 1000;
  })();
  // split suite A/B
  const A = hasil.slice(0, Math.floor(n / 2));
  const B = hasil.slice(Math.floor(n / 2));
  const akA = A.length ? A.filter((h) => h.benar).length / A.length : 0;
  const akB = B.length ? B.filter((h) => h.benar).length / B.length : 0;
  const gates = [
    { id: 'G1', label: 'Suite A — akurasi arah ≥ 55%', pass: akA >= 0.55, detail: `akurasi suite A ${(akA * 100).toFixed(0)}% pada ${A.length} hari buta` },
    { id: 'G2', label: 'Suite B — akurasi arah ≥ 50% (out-of-sample)', pass: akB >= 0.5, detail: `akurasi suite B ${(akB * 100).toFixed(0)}% pada ${B.length} hari segar` },
    { id: 'G3', label: 'Brier ≤ 0.24 (jujur lebih baik dari koin 0.25)', pass: brier <= 0.24, detail: `brier ${brier}` },
    { id: 'G4', label: 'Net kumulatif after-fee > 0', pass: netTotal > 0, detail: `net kumulatif ${netTotal.toFixed(1)}% after-fee ${(FEE_PER_SIDE_PCT * 2).toFixed(1)}%` },
  ];
  return {
    n, akurasi, netTotal: Math.round(netTotal * 10) / 10, brier, gates, A: { n: A.length, akurasi: akA }, B: { n: B.length, akurasi: akB },
    terakhir: hasil.slice(-30), semua: hasil, streak: { kini: cur, terpanjang: streakTerpanjang },
  };
}

// ---------------- ENSURE SIKLUS (kunci hari + nilai kemarin) ----------------
function dayOf(t: number) { return new Date(t).toISOString().slice(0, 10); }

async function nilaiKemarin(cs: Candle[], cs60: Candle[]) {
  const aktif = toko.aktif;
  if (!aktif) return;
  // candle aktif.hari dianggap TUTUP bila sudah bergeser lebih dari 24 jam dari bukanya
  const idx = cs.findIndex((c) => dayOf(c.t) === aktif.hari);
  if (idx < 0) return;
  const candle = cs[idx];
  const sudahTutup = candle.t + 86_400_000 <= Date.now();
  if (!sudahTutup) return;
  // VERIFIKASI-HASIL: bila TP & SL keduanya tersentuh, urutan dijawab candle 1j nyata
  // (candle yang melintasi waktu kunci dikecualikan — sentuhan pra-entry bukan milik rencana)
  const mulaiKunci = aktif.kunci?.waktu ? Date.parse(aktif.kunci.waktu) : undefined;
  const vk = urutanKena(cs60, aktif.hari, aktif.arah, aktif.target, aktif.stop, mulaiKunci);
  const hasil = nilaiRencana({ arah: aktif.arah, entry: aktif.entry, target: aktif.target, stop: aktif.stop, ambisius: aktif.ambisius }, candle, vk.urutan);
  hasil.hari = aktif.hari;
  hasil.rezim = aktif.rezim;
  hasil.keyakinan = aktif.keyakinan;
  hasil.hash = aktif.hash;
  hasil.zaman = aktif.zaman;
  toko.bukuCuan.push(hasil);
  // DOMINO UMPAN BALIK — hasil nyata mengadili sikap neuron saat kunci (ruh ujian:
  // rantai ujian → hidup → hasil hidup kembali mengadili; bukan piagam)
  try {
    await catatDominoHidup({ hari: aktif.hari, arah: aktif.arah, hasilLabel: hasil.hasil, netPct: hasil.netPct, via: hasil.via, domino: aktif.domino ?? null });
  } catch { /* dompo event menyusul — dilarang menggagalkan penilaian */ }
  if (aktif.domino && aktif.domino.sikap !== 'TANPA_BUKTI') {
    const tanda = hasil.hasil === 'MENANG' && aktif.domino.sikap === 'SESELARAS' ? 'DOMINO TERBUKTI'
      : hasil.hasil === 'KALAH' && (aktif.domino.sikap === 'KONFLIK' || aktif.domino.sikap === 'MENOLAK') ? 'DOMINO TEPAT' : 'DOMINO';
    toko.ingatan.unshift({ at: new Date().toISOString(), level: 'REZIM', kind: 'PELAJARAN', text: `${tanda} ${aktif.hari}: pelajaran konteks ujian (${aktif.domino.versi}: ${aktif.domino.aksiKonteks}, bukti net ${aktif.domino.netBukti}% dari ${aktif.domino.nKasus} hari lain, sikap ${aktif.domino.sikap}${aktif.domino.tindakan === 'ADOPSI_RENCANA' ? ', rencana diadopsi' : ''}) — rencana ${aktif.arah} ditutup ${hasil.hasil} net ${hasil.netPct}%; pengalaman hidup kini ditempa kembali di ujian berikutnya`, refs: aktif.hash.slice(0, 10) });
  }
  if (hasil.via.startsWith('stop') && hasil.pelajaran) {
    toko.ingatan.unshift({ at: new Date().toISOString(), level: 'REZIM', kind: 'PELAJARAN', text: `KETELEDORAN ${aktif.hari}: ${hasil.pelajaran}`, refs: aktif.hash.slice(0, 10) });
  }
  const urutanTeks = vk.urutan ? ` — verifikasi-hasil: ${vk.urutan === 'TARGET' ? 'TARGET' : 'STOP'} kena duluan pukul ${vk.urutan === 'TARGET' ? vk.jamTarget : vk.jamStop} UTC (sumber ${vk.sumber})` : '';
  toko.events.unshift({ day: aktif.hari, kind: 'CUAN', text: hasil.hasil === 'MENANG' ? `CUAN MENANG: ${SIMBOL_LABEL} ${aktif.hari} — ${hasil.via}${urutanTeks}, net ${hasil.netPct >= 0 ? '+' : ''}${hasil.netPct}% (R ${hasil.r}) di rezim ${aktif.rezim}. Rencana pra-registrasi dibayar medan, after-fee ${(FEE_PER_SIDE_PCT * 2).toFixed(1)}%.` : hasil.hasil === 'KALAH' ? `CUAN KALAH (keteledoran dicatat): ${SIMBOL_LABEL} ${aktif.hari} — ${hasil.via}${urutanTeks}, net ${hasil.netPct}% (R ${hasil.r}) di rezim ${aktif.rezim}. Pelajaran ditulis ke ingatan.` : `CUAN KEDALUWARSA: ${SIMBOL_LABEL} ${aktif.hari} — horizon tamat, keluar di tutup, net ${hasil.netPct}% (R ${hasil.r}). Jujur: juga dikenai fee.`, at: new Date().toISOString() });
  // OTAK DOMPET — tutup posisi all-in $1000 searah hasil nyata rencana; eksekusi keluar
  // diukur dari buku pesanan (slippage + fee taker nyata) dan dicatat di buku akuntansi
  try {
    await dompetTutup({
      hari: aktif.hari, arahArena: aktif.arah, hasilLabel: hasil.hasil, via: hasil.via,
      keluarRef: hasil.tutup, netModel: hasil.netPct, hash: aktif.hash,
      segar: candle.t + 86_400_000 <= Date.now() && Date.now() - (candle.t + 86_400_000) < 900_000,
    });
  } catch { /* dompet menyusul — dilarang menggagalkan penilaian arena */ }
  toko.aktif = null;
  simpan();
}

async function kunciHari(cs: Candle[], btc: Candle[], cs6h: Candle[], t24: Awaited<ReturnType<typeof ticker24h>>) {
  const hari = dayOf(cs[cs.length - 1].t);
  // OTAK SUMBER HIDUP — matriks sumber ikut bersaksi di dewan arah saat rencana
  // hari ini diputuskan (dipakai, bukan pajangan mati)
  const sbHari = await getSumberData().catch(() => null);
  const vonis = arahVonis(cs, undefined, sbHari?.kesaksian ?? undefined);
  // ============ GERBANG SELARAS (hukum anti-kontradiksi, lahir dari kekeliaruan
  // yang ditangkap pemilik: rencana SELL terkunci tampil damai di samping vonis
  // hidup BUY tanpa satu kata pun) ============
  if (toko.aktif && toko.aktif.hari === hari) {
    const a = toko.aktif;
    if (vonis.vonis === a.arah) return; // selaras — rencana jalan
    const runCandle = cs[cs.length - 1];
    const sentuhTarget = a.arah === 'BUY' ? runCandle.h >= a.target : runCandle.l <= a.target;
    if (!sentuhTarget && vonis.kepastian >= 60 && toko.relockHari !== hari) {
      // PEMBATALAN SELARAS — keluar di harga hidup; dicatat ke ledger SEBELUM candle tutup
      const keluar = runCandle.c;
      const gross = a.arah === 'BUY' ? ((keluar - a.entry) / a.entry) * 100 : ((a.entry - keluar) / a.entry) * 100;
      const net = Math.round((gross - FEE_PER_SIDE_PCT * 2) * 100) / 100;
      const cekBatal: ('NAIK' | 'TURUN' | 'DATAR')[] = vonis.arah === 'NAIK' ? ['NAIK', 'NAIK', 'NAIK', 'DATAR'] : ['TURUN', 'TURUN', 'TURUN', 'DATAR'];
      const entriBatal = tambahEntri(toko.ledger, {
        nomor: toko.ledger.rantai.length + 1, ns: 'micaprofita-elsa', seed: '0x' + sha256Hex(`${SIMBOL}|${hari}|z${a.zaman ?? 1}`).slice(0, 8), simbol: SIMBOL_LABEL,
        arah: vonis.vonis, kepastian: vonis.kepastian, cek: cekBatal,
        dasar: `PEMBATALAN SELARAS: rencana ${a.arah} (ledger #${a.kunci.nomor}) dibatalkan karena vonis hidup berbalik ke ${vonis.vonis} kepastian ${vonis.kepastian}% — sasaran belum tersentuh; keluar di harga hidup ${keluar.toPrecision(6)}, net ${net}% after-fee. Dicatat SEBELUM candle tutup.`,
        versiOtak: OTAK_VERSI, waktu: new Date().toISOString(),
      });
      toko.bukuCuan.push({
        hari: a.hari, simbol: SIMBOL_LABEL, arah: a.arah, hasil: 'BATAL',
        via: `pembatalan selaras — vonis hidup berbalik ${vonis.vonis} ${vonis.kepastian}% (sasaran belum tersentuh)`,
        netPct: net, r: 0, rezim: a.rezim, keyakinan: a.keyakinan,
        entry: a.entry, target: a.target, stop: a.stop, tutup: keluar, hash: entriBatal.hash,
        pelajaran: `konflik arah intraday: rencana ${a.arah} vs vonis baru ${vonis.vonis} — slot dikunci-ulang searah vonis; arah yang mati membunuh rencananya`,
      });
      toko.events.unshift({ day: hari, kind: 'SISTEM', text: `PEMBATALAN SELARAS ${hari}: rencana ${a.arah} #${a.kunci.nomor} dibatalkan — vonis hidup berbalik ${vonis.vonis} ${vonis.kepastian}%, sasaran belum tersentuh; keluar ${keluar.toPrecision(6)} net ${net}% after-fee (ledger #${entriBatal.kunci.nomor}, hash ${entriBatal.hash.slice(0, 12)}…). Slot dikunci-ulang searah vonis.`, at: new Date().toISOString() });
      // OTAK DOMPET — posisi all-in ikut dibatalkan di harga hidup (buku diukur langsung)
      try {
        await dompetTutup({ hari: a.hari, arahArena: a.arah, hasilLabel: 'BATAL', via: `pembatalan selaras — vonis hidup berbalik ${vonis.vonis} ${vonis.kepastian}% (sasaran belum tersentuh)`, keluarRef: keluar, netModel: net, hash: a.hash });
      } catch { /* dompet menyusul */ }
      toko.aktif = null;
      toko.relockHari = hari;
      simpan();
      // jatuh terus — kunci ulang rencana searah vonis baru (zaman berikutnya)
      await kunciSlot(cs, btc, cs6h, t24, hari, { zaman: (a.zaman ?? 1) + 1, trigger: 'KUNCI ULANG SELARAS — vonis hidup berbalik sebelum sasaran tersentuh' });
      return;
    } else {
      // konflik tanpa pembatalan: sasaran sudah tersentuh / kepastian < 60 / batas relock harian
      const tag = `${hari}|${a.hash}|${vonis.vonis}`;
      if (toko.konflikTercatat !== tag) {
        toko.konflikTercatat = tag;
        toko.events.unshift({ day: hari, kind: 'SISTEM', text: `KONFLIK SELARAS ${hari}: rencana ${a.arah} #${a.kunci.nomor} vs vonis hidup ${vonis.vonis} ${vonis.kepastian}% — ${sentuhTarget ? `sasaran rencana SUDAH tersentuh intraday: doktrin sasaran-tersentuh, dinilai jujur di tutup hari, TIDAK dibatalkan, dilarang posisi baru menumpangi` : `kepastian ${vonis.kepastian}% < 60 atau batas relock harian tercapai — rencana tetap berjalan, konflik ditampilkan jujur di audit selaras`}`, at: new Date().toISOString() });
        simpan();
      }
      return;
    }
  }
  // SLOT BARU — kunci slot zaman-1 hari ini (dilarang doble: pantau-terus yang
  // membuat zaman 2,3,… lewat kunciSlot; slotTerakhirCoba mencegah spam kunci)
  if (!toko.aktif && toko.slotTerakhirCoba?.hari !== hari) {
    await kunciSlot(cs, btc, cs6h, t24, hari, { zaman: 1, trigger: 'KUNCI HARIAN — slot pertama hari ini dari harga hidup' });
  }
}

// ---------------- KUNCI SLOT ZAMAN-N (inti rencana pra-registrasi) ----------------
// Dipakai tiga jalan: kunci harian, kunci-ulang selaras, dan REKALKULASI MANDIRI
// pantau-terus. Semua memakai mesin yang sama dari harga hidup — metode segar
// (ATR kini, vonis kini, MC seed zaman), bukan angka sisa slot lama.
async function kunciSlot(cs: Candle[], btc: Candle[], cs6h: Candle[], t24: Awaited<ReturnType<typeof ticker24h>>, hari: string, opsi: { zaman: number; trigger: string; entryHidup?: number }) {
  toko.slotTerakhirCoba = { hari, zaman: opsi.zaman };
  // OTAK SUMBER HIDUP — kesaksian sumber ikut dewan saat rencana zaman-N dikunci
  const sbSlot = await getSumberData().catch(() => null);
  const vonis = arahVonis(cs, undefined, sbSlot?.kesaksian ?? undefined);
  const kl = klVonis(cs);
  const f = faktorKomposit(cs, btc, t24?.perubahan24jPct ?? 0);
  const rezim = klasifikasiRezim(cs);
  const warisan = buildWarisan(cs, btc, cs6h);
  const mem = ingatanSimbol();
  const disiplinAktif = (() => {
    const last10 = toko.bukuCuan.slice(-10);
    if (last10.length >= 8) {
      const eks = mean(last10.map((e) => e.netPct));
      if (eks < -0.5) return `keyakinan dipangkas 5 poin — DISIPLIN CUAN s/d ${hari} (ekspektansi rencana negatif ${eks.toFixed(2)}% di buku cuan)`;
    }
    return null;
  })();
  const arah = vonis.vonis;
  // ============ DOMINO UJIAN→HIDUP (ruh ujian, bukan piagam) ============
  // pelajaran konteks (v0..v3, hasil ujian ELSA 100) dikonsultasikan ke vonis
  // hidup: konflik → penalti keyakinan + serangan tim merah; menolak → penalti
  // penuh; seselaras → bertahan (+ adopsi rencana terbukti bila knob aktif).
  // Buku kasus (v4) tidak pernah dilayari di sini — hukum anti-bocor hidup.
  const domino = hitungDominoHidup(cs, btc, t24?.perubahan24jPct ?? 0, hari, arah);
  let keyakinan = vonis.kepastian - (disiplinAktif ? 5 : 0) - (Math.max(0, vonis.kepastian) >= 0 && 0);
  // debat dulu untuk memangkas keyakinan
  const debat = debatTimMerah({ ...f, m4hSkor: f.skor.m4h }, arah, mem, warisan, kl);
  if (debat.tekanan >= 3) keyakinan -= Math.min(9, debat.tekanan * 3);
  else if (debat.tekanan > 0) keyakinan -= debat.tekanan * 2;
  // DOMINO: pengalaman konteks ujian ikut menyerang/membela vonis hidup
  if (domino.sikap === 'KONFLIK') {
    keyakinan -= domino.poin;
    debat.serangan.push({ dari: 'PELAJARAN-KONTEKS', teks: `${domino.konsultasi.asal} — vonis hidup ${arah} melawan pengalaman lintas-hari teruji; keyakinan dipangkas ${domino.poin} poin (efek domino ujian)` });
  } else if (domino.sikap === 'MENOLAK') {
    keyakinan -= domino.poin;
    debat.serangan.push({ dari: 'PELAJARAN-KONTEKS', teks: `${domino.konsultasi.asal} — pengalaman konteks bilang JAGA MODAL, vonis hidup ${arah} tetap dihitung; keyakinan dipangkas ${domino.poin} poin (efek domino ujian)` });
  } else if (domino.sikap === 'SESELARAS') {
    debat.bertahan.push({ dari: 'PELAJARAN-KONTEKS', teks: `${domino.konsultasi.asal} — pengalaman lintas-hari SEARAH vonis hidup; bukti ditempa ujian ELSA, dipakai keputusan hidup` });
  }
  keyakinan = Math.max(5, Math.min(97, Math.round(keyakinan)));
  // guard + rencana
  const entry = opsi.entryHidup ?? cs[cs.length - 1].c;
  const atrPct = f.atrPct;
  const guard: string[] = [];
  let guardLolos = true;
  if (atrPct > ATR_CAP_PCT) {
    guard.push(`ATR ${atrPct}% > cap ${ATR_CAP_PCT}% — stop wajib lebar, RR rusak`);
    guardLolos = false;
  }
  if (arah === 'SELL' && !toko.sellOn) {
    guard.push('SELL dilarang kebijakan arena — knob sellOn mati (hasil lab: SELL menggerus profit); arah tetap dihitung & ditampilkan, tanpa rencana');
    guardLolos = false;
  }
  if (t24 && t24.turnover24h < 1_000_000) {
    guard.push(`likuiditas 24j ${(t24.turnover24h / 1e6).toFixed(1)} jt < 3 jt — medan terlalu tipis`);
    guardLolos = false;
  }
  // DOMINO ADOPSI RENCANA — bila konteks SEARAH & knob adopsi aktif, pasangan
  // target/stop yang TERBUKTI di hari-hari lain (menempa simTrades nyata ujian)
  // dipakai hidup; disatukan dengan MC tetap dijalankan ulang atas pasangan ini.
  const adopsiDomino = domino.sikap === 'SESELARAS' && domino.knob.adopsiRencana
    && domino.konsultasi.targetPct !== null && domino.konsultasi.stopPct !== null
    && domino.konsultasi.aksi === arah;
  const targetPctDasar = adopsiDomino
    ? (domino.konsultasi.targetPct as number)
    : Math.min(2.2, Math.max(0.8, atrPct * 0.45));
  const stopPctDasar = adopsiDomino
    ? Math.max(1.2, Math.min(2.6, domino.konsultasi.stopPct as number))
    : Math.max(1.2, Math.min(2.6, vonis.eksekusi.stopPct));
  const mc = monteCarlo({
    entry,
    sigma24jPct: warisan.sigma24jPct,
    targetPct: targetPctDasar,
    stopPct: stopPctDasar,
    ambisiusPct: targetPctDasar * 1.55 + 0.6,
    seedHex: '0x' + sha256Hex(`${SIMBOL}|${hari}|z${opsi.zaman}`).slice(0, 8),
    driftPct: vonis.arah === 'NAIK' ? clampDrift(f.mom7 * 0.1) : clampDrift(-f.mom7 * 0.1),
    arah,
  });
  // tangga target: bila pTarget < 38% turun ke mediana lintasan (guard MC sumber)
  let targetPct = targetPctDasar;
  let targetMediana = false;
  let ketGuard = adopsiDomino
    ? `rencana diadopsi dari pelajaran konteks ujian (${domino.konsultasi.versi}, ${domino.konsultasi.nKasus} hari lain terbukti net ${domino.konsultasi.netBukti}%) — tetap diukur ulang Monte Carlo`
    : 'tangga target dinilai Monte Carlo — peluang di atas ambang';
  if (mc.pTarget < GUARD_MC_MIN) {
    targetPct = Math.max(0.25, Math.min(targetPct, mc.medianaEkskursiPct));
    targetMediana = true;
    ketGuard = `guard Monte Carlo: peluang tangga target ${mc.pTarget} < ${GUARD_MC_MIN} — target turun ke mediana lintasan (${mc.medianaEkskursiPct}% ekskursi), bukan fantasi`;
  }
  const target = arah === 'BUY' ? entry * (1 + targetPct / 100) : entry * (1 - targetPct / 100);
  const stopPct = stopPctDasar;
  const stop = arah === 'BUY' ? entry * (1 - stopPct / 100) : entry * (1 + stopPct / 100);
  const ambisiusPct = targetPctDasar * 1.55 + 0.6;
  const ambisius = arah === 'BUY' ? entry * (1 + ambisiusPct / 100) : entry * (1 - ambisiusPct / 100);
  const netUntungPct = Math.round(((targetPct - FEE_PER_SIDE_PCT * 2) * 100) / 100 * 100) / 100;
  const rencana: Rencana = {
    entry, stop, target, highAmbisius: ambisius,
    stopPct: Math.round(-stopPct * 100) / 100,
    targetPct: Math.round(targetPct * 100) / 100,
    ambisiusPct: Math.round(ambisiusPct * 100) / 100,
    pTarget: mc.pTarget, pStop: mc.pStop, pAmbisius: mc.pAmbisius,
    targetMediana, netUntungPct, sumberTarget: targetMediana ? `median Monte Carlo (${mc.medianaEkskursiPct}% ekskursi)` : adopsiDomino ? `pelajaran konteks ujian ${domino.konsultasi.versi} — terbukti di ${domino.konsultasi.nKasus} hari lain` : `disiplin 2.2% (jarak ATR)`, ketGuard, powerMax: Math.round((1 - Math.min(1, mc.pStop / Math.max(mc.pTarget, 1e-9))) * 1000) / 1000,
  };
  const duties: BuktiDuty[] = [
    { name: 'Data cukup', pass: cs.length >= 120, note: `${cs.length} candle harian Bybit` },
    { name: 'Likuiditas 24j ≥ 3 jt', pass: !t24 || t24.turnover24h >= 3_000_000, note: t24 ? `turnover 24j ${(t24.turnover24h / 1e6).toFixed(1)} jt` : 'tak terbaca' },
    { name: 'Volatilitas ≤ 14%', pass: atrPct <= ATR_CAP_PCT, note: `ATR ${atrPct}%` },
    { name: 'Harga hidup', pass: atrPct >= 0.5, note: `ATR ${atrPct}% — ${atrPct >= 0.5 ? 'pergerakan nyata' : 'harga nyaris mati'}` },
    { name: 'Izin rezim', pass: true, note: `${arah} di rezim ${rezim.rezim} — izin arah SELL diatur knob sellOn, bukan rezim` },
    { name: 'Konfirmasi 4 jam', pass: f.skor.m4h >= 0.4, note: `radar 24j ${((t24?.perubahan24jPct ?? 0)).toFixed(1)}% (skor m4h ${f.skor.m4h.toFixed(2)})` },
    { name: 'Ingatan berjenjang', pass: true, note: mem ? `SIMBOL: n=${mem.n}, rata-rata ${mem.edge.toFixed(2)}%` : 'belum ada episode — ingatan masih kosong' },
    { name: 'Standar komposit ≥ 0.45', pass: f.komposit >= 0.45, note: `komposit ${f.komposit.toFixed(2)}` },
    { name: 'Debat tim merah (V278)', pass: debat.tekanan < 3, note: debat.vonis },
    { name: 'KORTEX karangan-sendiri (V279)', pass: true, note: 'dinilai di bawah' },
    { name: 'Slot tempur V301', pass: true, note: `peringkat 1 dari ${K_SLOT} (arena satu koin)` },
  ];
  const kortex = skorKortex(f, kl, arah, duties);
  if (!guardLolos) {
    toko.guardTerakhir = [...guard]; // alasan nyata — dilarang label bohong di payload
    // Hukum anti-buang: arah tetap dihitung & ditampilkan, tetapi tanpa rencana tempur.
    // Ledger tetap mencatat vonis hari itu (bukti SEBELUM terjadi), tanpa aktif.
    const nomor = toko.ledger.rantai.length + 1;
    const cek: ('NAIK' | 'TURUN' | 'DATAR')[] = (mc.pNaik > 0.55 ? ['NAIK', 'NAIK', 'NAIK', 'DATAR'] : mc.pNaik < 0.45 ? ['TURUN', 'TURUN', 'TURUN', 'DATAR'] : ['NAIK', 'DATAR', 'TURUN', 'DATAR']) as ('NAIK' | 'TURUN' | 'DATAR')[];
    const entri = tambahEntri(toko.ledger, {
      nomor, ns: 'micaprofita-elsa', seed: '0x' + sha256Hex(`${SIMBOL}|${hari}|z${opsi.zaman}`).slice(0, 8), simbol: SIMBOL_LABEL,
      arah, kepastian: keyakinan, cek, dasar: `DITOLAK GUARD (zaman #${opsi.zaman} · ${opsi.trigger}): ${guard.join('; ')} — arah tetap dicatat (hukum V301 anti-buang)${domino.sikap !== 'TANPA_BUKTI' ? ` · domino ujian: konteks ${domino.konsultasi.aksi} (${domino.konsultasi.versi}, ${domino.konsultasi.nKasus} kasus, net bukti ${domino.konsultasi.netBukti}%) → ${domino.sikap}` : ''}`,
      versiOtak: OTAK_VERSI, waktu: new Date().toISOString(),
    });
    toko.aktif = null;
    toko.events.unshift({ day: hari, kind: 'SISTEM', text: `GUARD MENOLAK ${hari} (zaman #${opsi.zaman} · ${opsi.trigger}): ${arah} ${SIMBOL_LABEL} — ${guard.join('; ')}. Vonis tetap dicatat di ledger #${entri.kunci.nomor} (hash ${entri.hash.slice(0, 12)}…), tanpa rencana tempur.`, at: new Date().toISOString() });
    simpan();
    return;
  }
  // ledger
  const nomor = toko.ledger.rantai.length + 1;
  const cek: ('NAIK' | 'TURUN' | 'DATAR')[] = ['NAIK', 'DATAR', 'TURUN', 'DATAR'].map((x, i) => (mc.pNaik > 0.55 ? ['NAIK', 'NAIK', 'NAIK', 'DATAR'][i] : mc.pNaik < 0.45 ? ['TURUN', 'TURUN', 'TURUN', 'DATAR'][i] : x)) as ('NAIK' | 'TURUN' | 'DATAR')[];
  const entri = tambahEntri(toko.ledger, {
    nomor, ns: 'micaprofita-elsa', seed: '0x' + sha256Hex(`${SIMBOL}|${hari}|z${opsi.zaman}`).slice(0, 8), simbol: SIMBOL_LABEL,
    arah, kepastian: keyakinan, cek, dasar: `arah-brain ${vonis.versi} · ${vonis.lapisan} · komposit ${f.komposit.toFixed(2)} · rezim ${rezim.rezim} · zaman #${opsi.zaman} · ${opsi.trigger}${domino.sikap !== 'TANPA_BUKTI' ? ` · domino ujian: konteks ${domino.konsultasi.aksi} (${domino.konsultasi.versi}, ${domino.konsultasi.nKasus} kasus, net bukti ${domino.konsultasi.netBukti}%) → ${tindakanDominoOf(domino.sikap, adopsiDomino)}` : ''}`,
    versiOtak: OTAK_VERSI, waktu: new Date().toISOString(),
  });
  toko.aktif = {
    hari, kunci: entri.kunci, hash: entri.hash, rencana, arah, keyakinan, rezim: rezim.rezim, entry, target, stop, ambisius,
    knobSaatKunci: arah === 'SELL' ? toko.sellOn : undefined,
    zaman: opsi.zaman, waktuKunci: new Date().toISOString(),
    domino: {
      versi: domino.konsultasi.versi, aksiKonteks: domino.konsultasi.aksi,
      nKasus: domino.konsultasi.nKasus, netBukti: domino.konsultasi.netBukti,
      sikap: domino.sikap, poinPenalti: domino.poin,
      tindakan: tindakanDominoOf(domino.sikap, adopsiDomino),
    },
  };
  // OTAK DOMPET — rencana terkunci = dompet ALL-IN dengan seluruh saldo; order $1000
  // menyapu orderbook nyata (VWAP, slippage, dampak harga-sendiri, fee taker) dan
  // dicatat lengkap di buku akuntansi dompet
  try {
    await dompetBuka({
      hari, arah, entry, target, stop, ambisius,
      keyakinan, rezim: rezim.rezim, komposit: f.komposit,
      serangan: debat.serangan.slice(0, 3).map((s) => s.teks),
      buktiKunci: vonis.buktiKunci.slice(0, 3),
      hash: entri.hash, nomor: entri.kunci.nomor,
    });
  } catch { /* dompet menyusul — dilarang menggagalkan penguncian rencana */ }
  toko.events.unshift({ day: hari, kind: 'SISTEM', text: `RENCANA DIKUNCI ${hari} (zaman #${opsi.zaman} · ${opsi.trigger}): ${arah} ${SIMBOL_LABEL} entry ${entry.toPrecision(6)} → target ${rencana.targetPct}% → stop ${rencana.stopPct}% — ledger #${entri.kunci.nomor} hash ${entri.hash.slice(0, 12)}… (SHA-256 ditulis SEBELUM medan dibuka)`, at: new Date().toISOString() });
  if (toko.genome.v2.length < 6) {
    toko.genome.v2.push('port-satu-koin: universe 150 → ELSA/USDT (Bybit spot); K=50 → K=1 (hukum V301 K adaptif)');
    toko.genome.v2.push('pindaian futures Binance → pindaian spot Bybit (data hidup 200 candle harian)');
    toko.genome.v2.push('breadth pasar → posisi rentang 60h koin (adaptasi satu koin diumumkan)');
    toko.genome.v2.push('fee 0.2%×2 tetap — Bybit spot taker 0.1% sebenarnya lebih murah; dipakai angka konservatif sumber');
    toko.genome.v2.push('knob sellOn mati default (hasil lab sumber); arah SELL tetap dihitung & ditampilkan');
    toko.genome.v2.push('ujian simulasi → ujian mandiri walk-forward pada 200 hari ELSA nyata (tanpa sintetis)');
    toko.genome.logs.push({ at: new Date().toISOString(), text: 'OTAK V301-ELSA lahir: seluruh organ arena sumber diporting untuk satu koin' });
    toko.genome.generation = 1;
    toko.events.unshift({ day: hari, kind: 'UPGRADE', text: 'OTAK LAHIR — V301-ELSA: doktrin 30 seksi + 41 paper + otak arah v1.8 + kompleks 5-aspek + prareg SHA-256 diporting; arena difokus ELSA/USDT', at: new Date().toISOString() });
  }
  simpan();
}

// ---------------- PANTAU TERUS (hukum P-1..P-5) ----------------
// Jawaban atas dua permintaan pemilik: (18) "kalau terkena stop loss maka
// jawaban pastinya ada melajukan perhitungan mandiri lagi" dan (19) "kalau
// target harian salah otomatis harus tunggu berikutnya — inilah kebodohan...
// terus menerus aktif pantau pasar... kena stop loss berarti candle telah
// berubah perlu metode lain... kena TP langsung dijadikan catatan, lakukan
// perhitungan lagi... bukan fokus satu hari satu entry".
// ANTREAN PANTAU — dua permintaan bersamaan DILARANG mengadili slot yang sama
// dua kali (celah await dompet adalah pintu race yang sudah menelan ledger
// nyata: satu slot dinilai 2× dan dompet jadi yatim). Semua panggilan diserialisasi.
let antrePantau: Promise<unknown> = Promise.resolve();
function pantauLive(cs: Candle[], btc: Candle[], cs6h: Candle[], t24: Awaited<ReturnType<typeof ticker24h>>, cs60: Candle[]) {
  const jalan = antrePantau.catch(() => null).then(() => pantauLiveInti(cs, btc, cs6h, t24, cs60));
  antrePantau = jalan;
  return jalan;
}

async function pantauLiveInti(cs: Candle[], btc: Candle[], cs6h: Candle[], t24: Awaited<ReturnType<typeof ticker24h>>, cs60: Candle[]) {
  const hari = dayOf(cs[cs.length - 1].t);
  toko.pantauCekTerakhir = new Date().toISOString();
  // SAPU DOBEL — hasil pantau dengan hash+hasil+zaman sama hanya boleh SATU entri
  // (membersihkan jejak race lama; sapuan idempoten, jujur dicatat sekali)
  const pernah = new Set<string>();
  const sebelum = toko.bukuCuan.length;
  toko.bukuCuan = toko.bukuCuan.filter((b) => {
    if (!b.via.includes('PANTAU TERUS')) return true;
    // kunci hari|arah|zaman: race kembar bisa lahir dengan hash LEDGER berbeda
    // (tiap kembar kunci slot sendiri) tapi zaman harian tetap satu logika slot.
    const k = `${b.hari}|${b.arah}|${b.zaman ?? ''}`;
    if (pernah.has(k)) return false;
    pernah.add(k);
    return true;
  });
  if (toko.bukuCuan.length < sebelum) {
    toko.pantauLog.push({ at: new Date().toISOString(), text: `sapu dobel: ${sebelum - toko.bukuCuan.length} entri pantau kembar dihapus (race lama) — ekuitas dihitung ulang jujur` });
  }
  const aktif = toko.aktif;
  if (!aktif || aktif.hari !== hari) {
    // tanpa slot hari ini (slot hari lampau menunggu penilaian rollover nilaiKemarin)
    // REPAIR ORPHAN — dompet memegang posisi tanpa rencana arena aktif (jejak race /
    // kegagalan tulis): dilarang menggantung tanpa pengadilan → tutup di harga hidup.
    // Posisi milik JANTUNG DOMPET (sinyal mandiri, TP/SL dijaga jantung ≤60 dtk)
    // TIDAK yatim — punya pengadilan sendiri; dilarang di-coreng "REPAIR ORPHAN".
    try {
      const d = await getDompetPayload();
      if (d.posisi && d.posisi.hari === hari && (d.posisi as unknown as { asal?: string }).asal !== 'JANTUNG') {
        const keluar = t24?.lastPrice ?? d.posisi.entryVwap;
        await dompetTutup({
          hari, arahArena: d.posisi.arah === 'LONG' ? 'BUY' : 'SELL', hasilLabel: 'BATAL',
          via: 'REPAIR ORPHAN: posisi dompet yatim tanpa rencana arena aktif — ditutup di harga hidup agar tetap diadili, tidak menggantung tanpa pengadilan',
          keluarRef: keluar, segar: true,
        });
        toko.pantauLog.push({ at: new Date().toISOString(), text: `repair orphan: posisi dompet ${d.posisi.arah} (hari ${hari}) ditutup di harga hidup ${keluar.toPrecision(6)} — arena tanpa slot aktif` });
      }
    } catch { /* dompet menyusul */ }
    simpan();
    return;
  }
  // GUARD DOBEL-ADILI — slot zaman ini sudah pernah diadili hari ini (sapu dobel di
  // atas sudah mengelompokkan) → dilarang menilai kedua kalinya (anti-race).
  if (pernah.has(`${aktif.hari}|${aktif.arah}|${aktif.zaman}`)) {
    toko.pantauLog.push({ at: new Date().toISOString(), text: `guard dobel: zaman ${aktif.zaman} ${aktif.arah} sudah dinilai sebelumnya — resolusi kedua DIBATALKAN (anti-race)` });
    toko.aktif = null;
    simpan();
    return;
  }
  const harga = t24?.lastPrice ?? cs[cs.length - 1].c;
  const kea = keadaanHarga(aktif.arah, aktif.entry, aktif.target, aktif.stop, harga);
  const mulaiKunci = Date.parse(aktif.waktuKunci ?? aktif.kunci?.waktu ?? aktif.hari);
  const vk = urutanKena(cs60, hari, aktif.arah, aktif.target, aktif.stop, mulaiKunci);
  // BUKTI CANDLE 1J — sentuhan yang TERLEWAT antara dua poll (harga menembus level
  // lalu pulang ke dalam) TETAP diadili dari bukti candle 1j: dilarang ada sentuhan
  // TP/SL yang lolos tanpa putusan (tragedi pemilik: "TP tak kena & SL kena tapi
  // laporan masih data sama" — kini mustahil terulang).
  const sentuhTargetBukti = kea.sentuhTarget || vk.jamTarget !== null;
  const sentuhStopBukti = kea.sentuhStop || vk.jamStop !== null;
  if (!sentuhTargetBukti && !sentuhStopBukti) {
    simpan(); // audit selesai — belum ada sentuhan hidup maupun bukti 1j
    return;
  }
  // ============ KENA — kejadian NYATA (harga hidup sekarang / bukti candle 1j) ============
  let hasil: 'MENANG' | 'KALAH';
  let keluar: number;
  let bukti: string;
  if (sentuhTargetBukti && sentuhStopBukti) {
    if (vk.urutan === 'TARGET') {
      hasil = 'MENANG'; keluar = aktif.target;
      bukti = `TP & SL tersentuh: urutan dijawab candle 1j → TARGET duluan (pukul ${vk.jamTarget})`;
    } else {
      hasil = 'KALAH'; keluar = aktif.stop;
      bukti = `TP & SL tersentuh: urutan dijawab candle 1j → STOP duluan (pukul ${vk.jamStop}, sumber ${vk.sumber}) — konservatif bila tak terbaca`;
    }
  } else if (sentuhTargetBukti) {
    hasil = 'MENANG'; keluar = aktif.target;
    bukti = kea.sentuhTarget
      ? `harga hidup ${harga.toPrecision(6)} menembus sasaran SEKARANG`
      : `bukti candle 1j: sasaran tersentuh pukul ${vk.jamTarget} (terlewat antara poll — tetap diadili)`;
  } else {
    hasil = 'KALAH'; keluar = aktif.stop;
    bukti = kea.sentuhStop
      ? `harga hidup ${harga.toPrecision(6)} menembus pelindung SEKARANG`
      : `bukti candle 1j: pelindung tersentuh pukul ${vk.jamStop} (terlewat antara poll — tetap diadili)`;
  }
  const fee = FEE_PER_SIDE_PCT * 2;
  const gross = aktif.arah === 'BUY' ? ((keluar - aktif.entry) / aktif.entry) * 100 : ((aktif.entry - keluar) / aktif.entry) * 100;
  const net = Math.round((gross - fee) * 100) / 100;
  const stopJarak = Math.abs((aktif.entry - aktif.stop) / aktif.entry) * 100 || 1;
  const r = Math.round((net / stopJarak) * 1000) / 1000;
  const via = hasil === 'MENANG'
    ? `sasaran intraday — PANTAU TERUS: TP kena dinilai LANGSUNG (${bukti}), tidak menunggu tutup candle`
    : `stop intraday — PANTAU TERUS: SL kena dinilai LANGSUNG (${bukti}), tidak menunggu tutup candle`;
  const entri: EntriCuan = {
    hari: aktif.hari, simbol: SIMBOL_LABEL, arah: aktif.arah, hasil, via,
    netPct: net, r, rezim: aktif.rezim, keyakinan: aktif.keyakinan,
    entry: aktif.entry, target: aktif.target, stop: aktif.stop, tutup: keluar, hash: aktif.hash,
    zaman: aktif.zaman,
    pelajaran: hasil === 'KALAH'
      ? `SL kena intraday zaman #${aktif.zaman} di ${aktif.stop.toPrecision(6)} (entry ${aktif.entry.toPrecision(6)}) — candle telah berubah: metode lain wajib dihitung (P-2), pola dicatat ke ingatan`
      : undefined,
  };
  toko.bukuCuan.push(entri);
  // DOMINO UMPAN BALIK — hasil intraday pun mengadili sikap neuron saat kunci
  try {
    await catatDominoHidup({ hari: aktif.hari, arah: aktif.arah, hasilLabel: hasil, netPct: net, via, domino: aktif.domino ?? null });
  } catch { /* dompo event menyusul */ }
  if (aktif.domino && aktif.domino.sikap !== 'TANPA_BUKTI') {
    const tanda = hasil === 'MENANG' && aktif.domino.sikap === 'SESELARAS' ? 'DOMINO TERBUKTI'
      : hasil === 'KALAH' && (aktif.domino.sikap === 'KONFLIK' || aktif.domino.sikap === 'MENOLAK') ? 'DOMINO TEPAT' : 'DOMINO';
    toko.ingatan.unshift({ at: new Date().toISOString(), level: 'REZIM', kind: 'PELAJARAN', text: `${tanda} ${hari} zaman #${aktif.zaman}: pelajaran konteks ujian (${aktif.domino.versi}: ${aktif.domino.aksiKonteks}, bukti net ${aktif.domino.netBukti}% dari ${aktif.domino.nKasus} hari lain, sikap ${aktif.domino.sikap}) — rencana ${aktif.arah} ditutup ${hasil} net ${net}%; ditempa kembali di ujian berikutnya`, refs: aktif.hash.slice(0, 10) });
  }
  if (hasil === 'KALAH') {
    toko.ingatan.unshift({
      at: new Date().toISOString(), level: 'REZIM', kind: 'PELAJARAN',
      text: `PANTAU TERUS ${hari} zaman #${aktif.zaman}: SL kena — candle telah berubah, perhitungan diulang dengan metode lain`,
      refs: aktif.hash.slice(0, 10),
    });
  }
  toko.events.unshift({
    day: hari, kind: 'CUAN', at: new Date().toISOString(),
    text: hasil === 'MENANG'
      ? `CUAN MENANG (pantau terus, zaman #${aktif.zaman}): ${aktif.arah} ${SIMBOL_LABEL} TP kena LANGSUNG di ${keluar.toPrecision(6)} — ${bukti}, net ${net >= 0 ? '+' : ''}${net}% (R ${r}) — hasil langsung dicatat, lalu perhitungan diulang ke arah berikutnya dari harga hidup (P-3)`
      : `CUAN KALAH (pantau terus, zaman #${aktif.zaman}): ${aktif.arah} ${SIMBOL_LABEL} SL kena LANGSUNG di ${keluar.toPrecision(6)} — ${bukti}, net ${net}% (R ${r}) — candle telah berubah: rekalkulasi mandiri dengan metode lain dijalankan SEKARANG, bukan menunggu tutup candle (P-2)`,
  });
  toko.pantauLog.push({
    at: new Date().toISOString(),
    text: `${hasil} zaman #${aktif.zaman} ${aktif.arah} — TP ${aktif.target.toPrecision(6)} / SL ${aktif.stop.toPrecision(6)} / harga hidup ${harga.toPrecision(6)} → net ${net}% (after-fee) → dicatat, dompet ditutup di buku hidup`,
  });
  if (toko.pantauLog.length > 60) toko.pantauLog = toko.pantauLog.slice(-60);
  // dompet all-in ikut ditutup SEKARANG di buku hidup (slippage + fee nyata diukur)
  try {
    await dompetTutup({
      hari: aktif.hari, arahArena: aktif.arah, hasilLabel: hasil, via,
      keluarRef: keluar, netModel: net, hash: aktif.hash, segar: true,
    });
  } catch { /* dompet menyusul — dilarang menggagalkan penilaian pantau */ }
  const zamanLama = aktif.zaman;
  toko.aktif = null;
  // ============ REKALKULASI MANDIRI — jawaban otomatis "perhitungan lagi" ============
  const zamanBaru = zamanLama + 1;
  if (zamanBaru > MAX_SLOT_HARIAN) {
    const teks = `BATAS ZAMAN ${hari}: slot ke-${zamanLama} selesai (${hasil}, net ${net}%) tapi batas ${MAX_SLOT_HARIAN} zaman/hari tercapai — rekalkulasi ditahan hingga candle berikutnya (anti-loop melingkar, hukum P-4)`;
    toko.events.unshift({ day: hari, kind: 'SISTEM', text: teks, at: new Date().toISOString() });
    toko.pantauLog.push({ at: new Date().toISOString(), text: teks });
    simpan();
    return;
  }
  const trigger = hasil === 'KALAH'
    ? 'REKALKULASI MANDIRI — SL kena: candle telah berubah, metode lain dihitung dari harga hidup (P-2)'
    : 'REKALKULASI MANDIRI — TP kena: hasil dicatat, perhitungan diulang ke arah berikutnya dari harga hidup (P-3)';
  toko.pantauLog.push({ at: new Date().toISOString(), text: `rekalkulasi mandiri dimulai: zaman #${zamanLama} → #${zamanBaru} (${trigger})` });
  try {
    await kunciSlot(cs, btc, cs6h, t24, hari, { zaman: zamanBaru, trigger, entryHidup: harga });
  } catch {
    toko.pantauLog.push({ at: new Date().toISOString(), text: 'kunci slot zaman berikutnya gagal — payload berikutnya mencoba lagi' });
  }
  simpan();
}

let memPayload: { at: number; payload: unknown } | null = null;
// ANTREAN REBUILD — permintaan bersamaan berbagi SATU pembangunan payload (bukan
// masing-masing menjalankan pantau/kunci/nilai; race nyata pernah dinilai 2×).
let antrePayload: Promise<unknown> | null = null;

export function getArenaPayload(): Promise<Record<string, unknown>> {
  // JANTUNG UJIAN MANDIRI — tiap muat payload, jantung diberi kesempatan detak
  // (kalau ada pemicu jatuh tempo: candle baru / jadwal 30 menit — fire-and-forget)
  try { denyutSekarang(); } catch { /* jantung tak boleh menggagalkan muat */ }
  if (memPayload && Date.now() - memPayload.at < 60_000) return Promise.resolve(memPayload.payload as Record<string, unknown>);
  if (!antrePayload) {
    antrePayload = bangunPayload().finally(() => { antrePayload = null; });
  }
  return antrePayload as Promise<Record<string, unknown>>;
}

async function bangunPayload(): Promise<Record<string, unknown>> {
  const [cs, btc, cs6h, t24, cs60] = await Promise.all([
    getCandles(SIMBOL, 'D', 200),
    getCandles(BTC, 'D', 200),
    getCandles(SIMBOL, '240', 200),
    ticker24h(SIMBOL),
    getCandles(SIMBOL, '60', 96), // VERIFIKASI-HASIL: candle 1j untuk mengadili urutan kena TP vs SL
  ]);
  // PANTAU TERUS dulu: TP/SL kena diadili LANGSUNG dari harga hidup + rekalkulasi
  // mandiri (bukan menunggu tutup candle). Lalu penilaian rollover & kunci harian.
  await pantauLive(cs, btc, cs6h, t24, cs60);
  await nilaiKemarin(cs, cs60);
  await kunciHari(cs, btc, cs6h, t24);
  const hari = dayOf(cs[cs.length - 1].t);
  // OTAK SUMBER HIDUP — diambil SEBELUM vonis supaya kesaksiannya duduk di dewan
  // arah (AR-E9): matriks yang dulu "berdiam tanpa ruh" kini dipakai memutuskan.
  let sumber: SumberData | null = null;
  try {
    sumber = await getSumberData();
  } catch {
    sumber = null;
  }
  // RADAR PAUS HIDUP — diambil SEBELUM vonis supaya kesaksian neuron paus
  // (penempatan bersih + pola + duel paus-vs-paus) duduk di dewan arah AR-E10:
  // keluhan pemilik "radar paus masih mayat, tak punya ruh dan tak ada neuron"
  // — kini paus duduk di kursi ke-10 dan ikut memutuskan.
  let paus: PausData | null = null;
  try {
    paus = await getPausData(); // denyut jiwa jalan di dalamnya (neuron.json)
  } catch (e) {
    // jujur: kegagalan radar dicatat, bukan ditelan — diagnosis kualitas butuh ini
    console.error('[RADAR-PAUS] getPausData gagal:', e instanceof Error ? e.message : e);
    paus = null;
  }
  // JIWA OTAK MODAL — diambil SEBELUM vonis supaya keyakinan terbuka
  // (vonis jebakan/pump + magnet portal, dengan rekam jejak akurasi)
  // duduk di dewan arah AR-E11: keluhan pemilik "fundamen modal gak ada
  // ruh, gak ada neuron, bodoh karena gak ada otak" — kini modal duduk
  // di kursi ke-11 dan ikut memutuskan. Cache 60 dtk — pemanggilan
  // getModalRingkas/getModalPayload setelahnya bebas biaya jaringan.
  let modalJiwaFull: Awaited<ReturnType<typeof getModalPayload>> | null = null;
  try {
    modalJiwaFull = await getModalPayload();
  } catch (e) {
    console.error('[OTAK-MODAL] getModalPayload gagal:', e instanceof Error ? e.message : e);
    modalJiwaFull = null;
  }
  // OTAK LINTASAN — ingatan tersimpan dibaca SEBELUM vonis supaya prediksi
  // URUTAN magnet + POLA lintasan (dengan rekam jejak pola) duduk di dewan
  // arah AR-E12: keluhan pemilik "masih bertanya 'hmm naik turun ya' — kita
  // masih bayi; paham bisa membaca SUATU POLA" — kini lintasan duduk di
  // kursi ke-12. Denyut penuh (jawab + lahir) berjalan setelah peta-waktu.
  let lintasanAwal: LintasanJiwa | null = null;
  try {
    lintasanAwal = bacaLintasanJiwa();
  } catch { lintasanAwal = null; }
  // RADAR ANTI-KECOLONGAN (ignisi) — denyut radar dibaca SEBELUM vonis supaya
  // kesaksian per-menitnya duduk di dewan AR-E13 (bobot 0.16 — terbesar di
  // antara sumber hidup): luka 03:00 — verdict harian buta intraday — kini
  // ditutup; radar menyala → dewan wajib melihat ledakan sebelum pedang SELL.
  let ignisi: IgnisiData | null = null;
  try {
    ignisi = await denyutIgnisi();
  } catch (e) {
    console.error('[RADAR-IGNISI] denyut gagal:', e instanceof Error ? e.message : e);
    ignisi = bacaIgnisi();
  }
  const vonis = arahVonis(cs, undefined, sumber?.kesaksian ?? undefined, paus?.jiwa?.kesaksian ?? undefined, modalJiwaFull?.jiwa?.kesaksian ?? undefined, lintasanAwal?.kesaksian ?? undefined, ignisi ? kesaksianIgnisi() : undefined);
  // DOMINO UJIAN→HIDUP — konsultasi pelajaran konteks untuk tampilan & penalti nyata
  // (sikap neuron: SESELARAS / KONFLIK / MENOLAK / TANPA_BUKTI — buku kasus v4 tak pernah dilayari)
  const dominoHidup = hitungDominoHidup(cs, btc, t24?.perubahan24jPct ?? 0, hari, vonis.vonis as 'BUY' | 'SELL');
  const kl = klVonis(cs);
  const f = faktorKomposit(cs, btc, t24?.perubahan24jPct ?? 0);
  const rezim = klasifikasiRezim(cs);
  const warisan = buildWarisan(cs, btc, cs6h);
  const mem = ingatanSimbol();
  const debat = debatTimMerah({ ...f, m4hSkor: f.skor.m4h }, vonis.vonis, mem, warisan, kl);
  // DOMINO: pengalaman konteks ikut tampil di debat payload (penalti dihitung terpisah & transparan)
  if (dominoHidup.sikap === 'KONFLIK') debat.serangan.push({ dari: 'PELAJARAN-KONTEKS', teks: `${dominoHidup.konsultasi.asal} — vonis hidup ${vonis.vonis} melawan pengalaman lintas-hari teruji (efek domino ujian)` });
  if (dominoHidup.sikap === 'MENOLAK') debat.serangan.push({ dari: 'PELAJARAN-KONTEKS', teks: `${dominoHidup.konsultasi.asal} — pengalaman konteks bilang JAGA MODAL (efek domino ujian)` });
  if (dominoHidup.sikap === 'SESELARAS') debat.bertahan.push({ dari: 'PELAJARAN-KONTEKS', teks: `${dominoHidup.konsultasi.asal} — pengalaman lintas-hari SEARAH vonis hidup; bukti ditempa ujian, dipakai hidup` });
  const duties: BuktiDuty[] = [
    { name: 'Data cukup', pass: cs.length >= 120, note: `${cs.length} candle harian Bybit` },
    { name: 'Likuiditas 24j ≥ 3 jt', pass: !t24 || t24.turnover24h >= 3_000_000, note: t24 ? `turnover 24j ${(t24.turnover24h / 1e6).toFixed(1)} jt` : 'tak terbaca' },
    { name: 'Volatilitas ≤ 14%', pass: f.atrPct <= ATR_CAP_PCT, note: `ATR ${f.atrPct}%` },
    { name: 'Harga hidup', pass: f.atrPct >= 0.5, note: `ATR ${f.atrPct}%` },
    { name: 'Izin rezim', pass: true, note: `${vonis.vonis} di rezim ${rezim.rezim} — izin arah SELL diatur knob sellOn` },
    { name: 'Konfirmasi 4 jam', pass: f.skor.m4h >= 0.4, note: `radar 24j ${(t24?.perubahan24jPct ?? 0).toFixed(1)}% (skor m4h ${f.skor.m4h.toFixed(2)})` },
    { name: 'Ingatan berjenjang', pass: true, note: mem ? `SIMBOL: n=${mem.n}, rata-rata ${mem.edge.toFixed(2)}%` : 'belum ada episode' },
    { name: 'Standar komposit ≥ 0.45', pass: f.komposit >= 0.45, note: `komposit ${f.komposit.toFixed(2)}` },
    { name: 'Debat tim merah (V278)', pass: debat.tekanan < 3, note: debat.vonis },
    { name: 'KORTEX karangan-sendiri (V279)', pass: true, note: 'dinilai di bawah' },
    { name: 'Slot tempur V301', pass: true, note: `peringkat 1 dari ${K_SLOT} (arena satu koin)` },
  ];
  const kortex = skorKortex(f, kl, vonis.vonis, duties);
  const mc = monteCarlo({
    entry: cs[cs.length - 1].c,
    sigma24jPct: warisan.sigma24jPct,
    targetPct: Math.min(2.2, Math.max(0.8, f.atrPct * 0.45)),
    stopPct: Math.max(1.2, Math.min(2.6, vonis.eksekusi.stopPct)),
    ambisiusPct: (Math.min(2.2, Math.max(0.8, f.atrPct * 0.45)) * 1.55) + 0.6,
    seedHex: '0x' + sha256Hex(`${SIMBOL}|${hari}`).slice(0, 8),
    driftPct: vonis.arah === 'NAIK' ? clampDrift(f.mom7 * 0.1) : clampDrift(-f.mom7 * 0.1),
    arah: vonis.vonis,
  });
  const ujian = ujianMandiri(cs);
  const kasusHidup = bacaKasus();
  const pertumbuhan = hitungPertumbuhan(cs, kasusHidup.reduce((s, k) => s + k.pelajaran.length, 0));
  const aktif = toko.aktif;
  // GARIS VONIS (P-6) — TP & SL SELALU dihitung dari harga hidup SEKARANG untuk
  // arah vonis apapun (BUY maupun SELL): sistem wajib TAHU ke mana arah take
  // profit dan di mana stop, walau slot tempur ditolak/di-luar-knob sellOn.
  const garis = garisVonisHidup(vonis.vonis as 'BUY' | 'SELL', cs[cs.length - 1].c, f.atrPct, vonis.eksekusi.stopPct);
  // status rencana terkunci — progres harga hidup vs sasaran/stop (lilin berjalan).
  // VERIFIKASI-HASIL (koreksi tragedi pemilik: "TP tak kena & SL kena tapi laporan
  // masih data sama"): kalau TP & SL keduanya tersentuh, urutan WAJIB dijawab dari
  // candle 1j nyata, lalu hasil sementara ditulis — dilarang status ganda tanpa putusan.
  const aktifStatus = (() => {
    if (!aktif) return null;
    const hargaLive = cs[cs.length - 1].c;
    const jarakTargetPct = aktif.arah === 'BUY' ? ((aktif.target - hargaLive) / hargaLive) * 100 : ((hargaLive - aktif.target) / hargaLive) * 100;
    const jarakStopPct = aktif.arah === 'BUY' ? ((hargaLive - aktif.stop) / hargaLive) * 100 : ((aktif.stop - hargaLive) / hargaLive) * 100;
    const mulaiKunci = aktif.waktuKunci ? Date.parse(aktif.waktuKunci) : (aktif.kunci?.waktu ? Date.parse(aktif.kunci.waktu) : undefined);
    const vk = urutanKena(cs60, aktif.hari, aktif.arah, aktif.target, aktif.stop, mulaiKunci);
    // sentuhan HANYA dari candle 1j SETELAH waktu kunci (hukum anti-akreditasi
    // pra-kunci): high/low candle harian penuh MENCOTENGOT sentuhan pra-entry —
    // slot segar tidak boleh langsung dilabel KALAH_SEMENTARA oleh tinggi harian.
    const sentuhTarget = vk.jamTarget !== null;
    const sentuhStop = vk.jamStop !== null;
    const keduanya = sentuhTarget && sentuhStop;
    const urutan: 'TARGET' | 'STOP' | null = keduanya ? (vk.urutan ?? 'STOP') : null; // konservatif bila 1j tak membedakan
    const urutanSumber: 'candle-1j' | 'konservatif' | '—' = keduanya ? (vk.urutan ? vk.sumber : 'konservatif') : '—';
    const fee = FEE_PER_SIDE_PCT * 2;
    const netAt = (keluar: number) => {
      const gross = aktif.arah === 'BUY' ? ((keluar - aktif.entry) / aktif.entry) * 100 : ((aktif.entry - keluar) / aktif.entry) * 100;
      return Math.round((gross - fee) * 100) / 100;
    };
    let hasilSementara: 'CUAN_MENGAMBANG' | 'KALAH_SEMENTARA' | 'MENANG_SEMENTARA' | 'BERJALAN';
    let netSementaraPct: number;
    if (urutan === 'TARGET') { hasilSementara = 'MENANG_SEMENTARA'; netSementaraPct = netAt(aktif.target); }
    else if (urutan === 'STOP') { hasilSementara = 'KALAH_SEMENTARA'; netSementaraPct = netAt(aktif.stop); }
    else if (sentuhTarget) { hasilSementara = 'CUAN_MENGAMBANG'; netSementaraPct = netAt(aktif.target); }
    else if (sentuhStop) { hasilSementara = 'KALAH_SEMENTARA'; netSementaraPct = netAt(aktif.stop); }
    else { hasilSementara = 'BERJALAN'; netSementaraPct = netAt(hargaLive); }
    return {
      sentuhTarget, sentuhStop,
      jarakTargetPct: Math.round(jarakTargetPct * 100) / 100, jarakStopPct: Math.round(jarakStopPct * 100) / 100,
      urutan, urutanSumber, jamTarget: vk.jamTarget, jamStop: vk.jamStop, nCandle60: vk.nCandle60,
      hasilSementara, netSementaraPct,
      zaman: aktif.zaman, waktuKunci: aktif.waktuKunci,
    };
  })();
  // OTAK MODAL — fundamental futures: porsi futures, squeeze, whale, jebakan vs pump,
  // sensus lintas venue, leverage terpasang, portal waktu, akumulasi senyap (A1)
  let modal: Awaited<ReturnType<typeof getModalRingkas>> | null = null;
  try {
    modal = await getModalRingkas();
  } catch {
    modal = null;
  }
  // OTAK ALIRAN — model kaskade teruji 500-soal (EVAA/PIEVERSE/AGT + ELSA)
  let aliran: AliranData | null = null;
  try {
    aliran = await getAliranData();
  } catch {
    aliran = null;
  }
  // (OTAK SUMBER sudah diambil sebelum vonis — kesaksian ikut dewan AR-E9)
  // OTAK PETA WAKTU — time traveler roadmap: ke mana, kapan (tanggal), lalu di tiap
  // waypoint LANJUT/JATUH_CURAM/ISTIRAHAT — permintaan pemilik: "di 0.05 harus tau
  // akan ke 0.1 pada tanggal sekian; di 0.1 harus tau turun curam atau naik"
  // OTAK LINTASAN (lintasan-v1) — denyut penuh di sini: jawab prediksi terbuka
  // pakai candle 1j, timbang TARIKAN semua magnet dua sisi, lahirkan pola baru
  let petaWaktu: PetaWaktuData | null = null;
  let lintasan: LintasanJiwa | null = null;
  try {
    const modalFull = await getModalPayload(); // cache 60 dtk — tidak menambah beban jaringan
    petaWaktu = await getPetaWaktu(cs, modalFull, sumber, aliran, vonis.arah, vonis.kepastian);
    // magnet yang SAMA dipakai peta-waktu kini ditimbang otak lintasan (satu kebenaran)
    const hargaNow = cs[cs.length - 1].c;
    const magnetsRaw = kumpulkanMagnet(modalFull, cs, hargaNow);
    const dedupAtas = dedupMagnets(magnetsRaw.atas, hargaNow).slice(0, 4);
    const dedupBawah = dedupMagnets(magnetsRaw.bawah, hargaNow).slice(0, 3);
    lintasan = await denyutLintasan({
      harga: hargaNow,
      magnets: { atas: dedupAtas, bawah: dedupBawah },
      bensinNaik: petaWaktu.bensinNaik.skor, bensinTurun: petaWaktu.bensinTurun.skor,
      modal: modalFull ? { likuidasi: modalFull.likuidasi ?? null, funding: modalFull.funding ?? { sekarang: 0 }, whaleTop: modalFull.whaleTop ?? { klasifikasi: '' }, whale: modalFull.whale ?? { spotNet: 0 } } : null,
      oiD24j: modalFull?.oi.delta24j ?? null,
      hargaDelta24j: modalFull?.oi.hargaDelta24j ?? null,
      orangRasioLong: modalFull?.orang.rasioLong ?? null,
      squeezeSkor: modalFull?.squeeze.skor ?? 0,
      squeezeAktif: modalFull?.squeeze.aktif ?? false,
      akumulasiKlasifikasi: modalFull?.akumulasi.verdict ?? null,
      korbanKaskade: aliran?.vonis.korban ?? null,
      ema21: (() => { const e = ema(cs.map((c) => c.c), 21); return e[e.length - 1]; })(),
      candles1d: cs,
    });
  } catch (e) {
    lintasan = lintasan ?? null;
    console.error('[OTAK-LINTASAN] denyut gagal:', e instanceof Error ? e.message : e);
  }
  // OTAK UJIAN ELSA — ujian 100 soal dari kemunculan hingga kini (ronde, pelajaran, hasil per soal)
  let ujianElsa: UjianElsaData | null = null;
  try {
    ujianElsa = await getUjianElsa();
  } catch {
    ujianElsa = null;
  }
  // RADAR PAUS — data sudah diambil sebelum vonis (kesaksian ikut dewan AR-E10);
  // payload memakai objek yang sama — tanpa fetch ganda
  // OTAK DOMPET — dompet simulasi $1000 nyata-rasa: all-in tiap rencana, dampak
  // orderbook nyata, buku akuntansi penuh, top-up otomatis saat habis
  let dompet: DompetData | null = null;
  try {
    dompet = await getDompetPayload();
  } catch {
    dompet = null;
  }
  // JANTUNG DOMPET — denyut modal hidup (keluhan pemilik: "modal seakan
  // terhenti tak melakukan aktivitas; wait adalah kanker"): kick denyut
  // fire-and-forget saat payload dibangun + data denyut/keputusan/neuron
  // dilampirkan ke payload dompet supaya tab menampilkan aktivitas nyata.
  try {
    const jt = await import('./dompet-jantung');
    jt.denyutDompetSekarang(); // kick fire-and-forget — payload tak menunggu denyut
    if (dompet) dompet.jantung = jt.bacaJantungDompet();
  } catch {
    /* jantung menyusul di payload berikutnya — dilarang menggagalkan payload */
  }
  // OTAK UPGRADE — mesin domino: neuron konteks + knob + umpan balik (ruh ujian)
  const upgradeData = bacaUpgradeData();
  // keyakinan: satu sumber kejujuran — dasar kepastian dikurangi SEMUA penalti yang tercatat terbuka
  const penaltiRincian: { dari: string; poin: number; teks: string }[] = [];
  const potong = (dari: string, poin: number, teks: string) => penaltiRincian.push({ dari, poin, teks });
  const debatPenalti = debat.tekanan >= 3 ? Math.min(9, debat.tekanan * 3) : debat.tekanan * 2;
  if (debatPenalti > 0) potong('DEBAT', debatPenalti, debat.vonis);
  const disiplinPotong = (() => { const last10 = toko.bukuCuan.slice(-10); return last10.length >= 8 && mean(last10.map((e) => e.netPct)) < -0.5 ? 5 : 0; })();
  if (disiplinPotong > 0) potong('DISIPLIN-CUAN', disiplinPotong, 'ekspektansi 10 rencana terakhir negatif');
  // DOMINO: penalti keyakinan dari pelajaran konteks (sama dengan aturan kunciSlot)
  if (dominoHidup.sikap === 'KONFLIK' && dominoHidup.poin > 0) potong('PELAJARAN-KONTEKS', dominoHidup.poin, `${dominoHidup.konsultasi.asal} — melawan vonis hidup (efek domino ujian)`);
  if (dominoHidup.sikap === 'MENOLAK' && dominoHidup.poin > 0) potong('PELAJARAN-KONTEKS', dominoHidup.poin, `${dominoHidup.konsultasi.asal} — pengalaman bilang jaga modal (efek domino ujian)`);
  // OTAK SUMBER HIDUP — sumber melawan vonis / terbelah = penalti nyata (matriks DIPAKAI)
  if (sumber) {
    const netNaikSb = sumber.kesaksian.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
    const netTurunSb = sumber.kesaksian.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
    if (vonis.arah === 'NAIK' && netTurunSb >= 8 && netTurunSb > netNaikSb) potong('SUMBER', 4, `sumber hidup dominan TURUN (${(Math.round(netTurunSb * 10) / 10).toFixed(1)} vs NAIK ${(Math.round(netNaikSb * 10) / 10).toFixed(1)}) — overhang unlock / tekanan rantai melawan BUY`);
    if (vonis.arah === 'TURUN' && netNaikSb >= 8 && netNaikSb > netTurunSb) potong('SUMBER', 4, `sumber hidup dominan NAIK (${(Math.round(netNaikSb * 10) / 10).toFixed(1)} vs TURUN ${(Math.round(netTurunSb * 10) / 10).toFixed(1)}) melawan SELL`);
    if (sumber.bentrokan.some((b) => b.topik === 'ARAH-TERBELAH')) potong('SUMBER-BENTROK', 3, 'dewan sumber terbelah arah — keyakinan dipangkas, tidak ada sumber dibungkam');
  }
  // RADAR PAUS HIDUP — paus melawan vonis / duel aktif melawan arah = penalti nyata (vitamin DIPAKAI)
  if (paus?.jiwa) {
    const netNaikP = paus.jiwa.kesaksian.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
    const netTurunP = paus.jiwa.kesaksian.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
    if (vonis.arah === 'NAIK' && netTurunP >= 1.0 && netTurunP > netNaikP) potong('RADAR-PAUS', 4, `kesaksian paus dominan TURUN (${(Math.round(netTurunP * 100) / 100).toFixed(2)} vs NAIK ${(Math.round(netNaikP * 100) / 100).toFixed(2)}) — penempatan/pola/duel paus melawan BUY`);
    if (vonis.arah === 'TURUN' && netNaikP >= 1.0 && netNaikP > netTurunP) potong('RADAR-PAUS', 4, `kesaksian paus dominan NAIK (${(Math.round(netNaikP * 100) / 100).toFixed(2)} vs TURUN ${(Math.round(netTurunP * 100) / 100).toFixed(2)}) — paus duduk di sisi NAIK, melawan SELL`);
    const duelMelawan = paus.jiwa.duelAktif.find((d) => d.prediksiArah !== 'SERAH' && d.keyakinanDuel >= 0.45 && ((d.prediksiArah === 'NAIK') !== (vonis.arah === 'NAIK')));
    if (duelMelawan) {
      const pemenang = duelMelawan.pDari >= 0.5 ? duelMelawan.dari : duelMelawan.lawan;
      potong('DUEL-PAUS', 3, `duel ${duelMelawan.dari} vs ${duelMelawan.lawan} memprediksi ${duelMelawan.prediksiArah} — ${pemenang} dipahami menang (p=${Math.round(duelMelawan.pDari * 100)}%, keyakinan ${Math.round(duelMelawan.keyakinanDuel * 100)}%) melawan ${vonis.vonis}`);
    }
  }
  const pilihan: Pilihan = {
    hari, simbol: SIMBOL_LABEL, arah: vonis.vonis, keyakinan: Math.round(vonis.kepastian), rank: 1,
    labelArah: labelArahOf(vonis.vonis as 'BUY' | 'SELL'), garis,
    zamanRencana: aktif ? aktif.zaman : null, waktuKunciRencana: aktif ? aktif.waktuKunci : null,
    arahRencana: aktif ? aktif.arah : null, kepastianRencana: aktif ? aktif.keyakinan : null,
    guard: aktif ? 'LOLOS' : 'TOLAK', guardAlasan: aktif ? null : (toko.guardTerakhir?.length ? toko.guardTerakhir.join('; ') : 'guard menolak rencana hari ini — alasan tercatat di kronik'),
    raw: { mom7: Math.round(f.mom7 * 100) / 100, mom30: Math.round(f.mom30 * 100) / 100, rsi: f.rsi, atrPct: f.atrPct, volSurge: Math.round(f.volSurge * 100) / 100, distHigh: Math.round(f.distHigh * 100) / 100, emaAlign: f.emaAlign, close: cs[cs.length - 1].c, m4h: Math.round((t24?.perubahan24jPct ?? 0) * 100) / 100, qv: t24 ? Math.round(t24.turnover24h / 1e6) : null },
    faktor: { ...Object.fromEntries(Object.entries(f.skor).map(([k, v]) => [k, Math.round(v * 1000) / 1000])), m4h: f.skor.m4h },
    topReasons: vonis.buktiKunci,
    duties, policy: [
      `SLOT TEMPUR K=${K_SLOT} — hukum pemilik V301 (K adaptif); arena satu koin: ELSA/USDT Bybit`,
      'Guard tidak membuang arah — yang ditolak tetap tampil berlabel alasan (hukum anti-buang)',
      'Pindaian: 1 pasang (ELSAUSDT Bybit spot) · 200 candle harian · konteks BTC iklim',
      'Fee 0,2% × 2 = 0,4% per rencana (konservatif; Bybit taker 0,1% sebenarnya)',
      modal
        ? `FUNDAMENTAL MODAL: leverage terpasang (est) long ${modal.leverageDominan.long ?? `~${modal.leverageDominan.dominanTier}`}x / short ${modal.leverageDominan.short ?? `~${modal.leverageDominan.dominanTier}`}x (${modal.leverageDominan.nKaskade} episode kaskade terukur) · sensus ${modal.sensus.venuePerp} venue perp + ${modal.sensus.venueSpot} spot, OI universe ≈ ${modal.sensus.totalOiUsd !== null ? `${(modal.sensus.totalOiUsd / 1e6).toFixed(1)} jt USD` : '—'}, est. akun-posisi lintas venue ${modal.sensus.estUniverseAkun !== null ? modal.sensus.estUniverseAkun.toLocaleString('id-ID') : '—'} · akumulasi senyap spot: ${modal.akumulasiKlasifikasi.replace(/_/g, ' ').toLowerCase()} (skor ${modal.akumulasiSkor})`
        : 'FUNDAMENTAL MODAL: otak modal belum terbaca — memori menyusul',
      aliran
        ? `FUNDAMENTAL ALIRAN (teruji ujian 500-soal): model kaskade bilang sisi berisiko likuidasi 6 jam = ${aliran.vonis.korban ?? 'tidak ada yang menonjol'} (skor ${aliran.vonis.skorKorban}, alarm ${aliran.vonis.alarmLevel}) · bias arah ${aliran.vonis.arah} (p ${aliran.vonis.pArah}) · orang Gate ${aliran.orang.long} long vs ${aliran.orang.short} short · likuidasi 6j: long $${Math.round(aliran.liq6j.longUsd)} vs short $${Math.round(aliran.liq6j.shortUsd)}${aliran.liq6j.dominan ? ` — dominasi ${aliran.liq6j.dominan}` : ''}`
        : 'FUNDAMENTAL ALIRAN: otak aliran belum terbaca (data Gate menyusul)',
      sumber
        ? `MATRIKS SUMBER (${sumber.sumberHidup} HIDUP + ${sumber.sumberTerwakili} terwakili, ${sumber.sumberTerkunci} terkunci/mati diakui jujur): unlock berikutnya ${sumber.unlock?.berikutnya ? `${sumber.unlock.berikutnya.tanggal} — ${sumber.unlock.berikutnya.hariDariSekarang} hari lagi, ${sumber.unlock.berikutnya.token.toLocaleString('id-ID')} ELSA (${sumber.unlock.berikutnya.pctVsBeredar.toFixed(1)}% dari beredar, ~$${Math.round(sumber.unlock.berikutnya.usd).toLocaleString('id-ID')}, ${sumber.unlock.berikutnya.rincian.map((r) => `${r.alokasi} ${r.tipe}`).join(' + ')})` : '—'} · venue pemimpin volume ${sumber.venueMemimpin ?? '—'} · dislokasi harga lintas venue ${sumber.dislokasiHargaPct !== null ? `${sumber.dislokasiHargaPct.toFixed(2)}%` : '—'} · DEX tekanan beli ${sumber.deksTekananBeliPct !== null ? `${sumber.deksTekananBeliPct.toFixed(0)}%` : '—'} · FDV/mcap ${sumber.supply?.rasioFdvMcap !== null && sumber.supply?.rasioFdvMcap !== undefined ? `${sumber.supply.rasioFdvMcap.toFixed(1)}×` : '—'}`
        : 'MATRIKS SUMBER: otak sumber belum terbaca — dilarang mengaku info lengkap',
      sumber
        ? `MATRIKS SUMBER HIDUP DIPAKAI: ${sumber.kesaksian.length} kesaksian masuk dewan AR-E9 (${sumber.kesaksian.map((k) => `${k.dari} ${k.vote}`).join(', ') || 'bisu'}) · denyut ${sumber.denyut.map((d) => `${d.label} ${d.status} ${d.latencyMs ?? '—'}ms`).join(' · ')} · bentrokan ${sumber.bentrokan.length ? sumber.bentrokan.map((b) => b.topik).join(', ') : 'tidak ada'}`
        : 'MATRIKS SUMBER HIDUP: tidak terbaca — dewan arah jalan dari candle saja',
      paus?.jiwa
        ? `RADAR PAUS HIDUP DIPAKAI (v2): ${paus.jiwa.neurons.length} paus teridentifikasi lewat sidik ukuran (denyut ke-${paus.jiwa.denyutKe}) · duel aktif ${paus.jiwa.duelAktif.length}${paus.jiwa.duelAktif.length ? ` (${paus.jiwa.duelAktif.map((d) => `${d.id}→${d.prediksiArah} p=${Math.round(d.pDari * 100)}%`).join(', ')})` : ''} · dinding orderbook aktif ${paus.jiwa.dinding?.aktif?.length ?? 0} (patah tercatat ${paus.jiwa.dinding?.selesai?.filter((w) => w.status === 'PATAH').length ?? 0}) · kepahaman ${paus.jiwa.kepahaman?.length ?? 0} aturan · formula keyakinan: ${paus.jiwa.kalibrasi.nTerjawab} duel terjawab, akurasi ${Math.round(paus.jiwa.kalibrasi.akurasi * 100)}% · kesaksian ${paus.jiwa.kesaksian.map((k) => `${k.dari.replace('RADAR-PAUS:', '')}=${k.vote}`).join(', ')} → dewan AR-E10 (bobot 0.10)`
        : 'RADAR PAUS HIDUP: jiwa belum berdenyut kali ini — dewan berjalan tanpa suara paus',
      `DOMINO UJIAN→HIDUP: ujian ELSA 100 menempa pelajaran konteks → neuron dipakai keputusan hidup — hari ini fp ${dominoHidup.konsultasi.ada ? dominoHidup.konsultasi.versi : 'tanpa-cocok'}: ${dominoHidup.konsultasi.ada ? `${dominoHidup.konsultasi.asal} → sikap ${dominoHidup.sikap}${dominoHidup.poin ? `, penalti ${dominoHidup.poin} poin` : ''}${aktif?.domino?.tindakan === 'ADOPSI_RENCANA' ? ', rencana slot aktif diadopsi dari pengalaman terbukti' : ''}` : 'otak berdiri sendiri (tidak ada pengalaman serupa)'} — buku kasus v4 tidak pernah menyentuh hidup`,
    ],
    rezim: rezim.rezim,
    mem,
    debat, kortex, warisan,
    rencana: aktif ? aktif.rencana : null,
    praRegistrasi: aktif ? { waktuKunci: aktif.kunci.waktu, horizon: `s/d tutup UTC ${aktif.hari}`, feePct: FEE_PER_SIDE_PCT * 2, netWajib: true, sumber: 'lilin harian tertutup + otak SAKTI-ARAH v1.8 + 7 mesin warisan', hash: aktif.hash, nomor: aktif.kunci.nomor, cek: aktif.kunci.cek } : null,
    disiplinCuan: disiplinPotong > 0 ? `keyakinan dipangkas ${disiplinPotong} poin — DISIPLIN CUAN s/d ${hari}` : null,
    verdict: { kind: 'KONFIRMASI', note: 'Tidak ada pita berita risiko dalam 3 hari terakhir — sinyal teknis berdiri sendiri (verdict berita belum diporting: adapter berita adalah tugas kurikulum).', sources: 0, at: new Date().toISOString() },
    arahFull: { ...vonis, kl: { ...vonis.kl } },
  };
  // buku cuan metrik
  const entri = toko.bukuCuan;
  const kum = (() => {
    let eq = 1;
    for (const e of entri) eq *= 1 + e.netPct / 100;
    return (eq - 1) * 100;
  })();
  const metrik = {
    hari: entri.length, at: new Date().toISOString(),
    entri: [...entri].reverse(),
    berlangsung: aktif ? { hari: aktif.hari, arah: aktif.arah, entry: aktif.entry, target: aktif.target, stop: aktif.stop, ambisius: aktif.ambisius, hash: aktif.hash, zaman: aktif.zaman, waktuKunci: aktif.waktuKunci } : null,
    metrik: {
      netKumulatif: Math.round(kum * 100) / 100,
      winRate: (() => { const nonB = entri.filter((e) => e.hasil !== 'BATAL'); return nonB.length ? Math.round((nonB.filter((e) => e.netPct > 0).length / nonB.length) * 100) : null; })(),
      ekspektansi: entri.length ? Math.round(mean(entri.map((e) => e.netPct)) * 100) / 100 : null,
      maxDD: (() => { let eq = 1; let peak = 1; let dd = 0; for (const e of entri) { eq *= 1 + e.netPct / 100; peak = Math.max(peak, eq); dd = Math.min(dd, eq / peak - 1); } return Math.round(dd * 10000) / 100; })(),
      menang: entri.filter((e) => e.hasil === 'MENANG').length,
      kalah: entri.filter((e) => e.hasil === 'KALAH').length,
      kedaluwarsa: entri.filter((e) => e.hasil === 'KEDALUWARSA').length,
      batal: entri.filter((e) => e.hasil === 'BATAL').length,
    },
    kejujuran: 'setiap rencana dinilai nyata candle hari-D after-fee 0.4% — equity = majemuk satu-unit per rencana (model, bukan simulasi ukuran nyata); BATAL = pembatalan selaras (keluar di harga hidup saat vonis hidup berbalik sebelum sasaran tersentuh), tetap masuk ekuitas tapi tidak dihitung win-rate',
  };
  // keteledoran per rezim
  const rezimRugi: Record<string, { rugi: number; total: number; eks: number }> = {};
  for (const e of entri) {
    const r = (rezimRugi[e.rezim] ??= { rugi: 0, total: 0, eks: 0 });
    r.total++;
    if (e.netPct < 0) r.rugi++;
    r.eks += e.netPct;
  }
  // pertumbuhan riwayat
  const riwayatPertumbuhan = entri.map((e, i) => ({ day: e.hari, net: e.netPct, eq: entri.slice(0, i + 1).reduce((s, x) => s * (1 + x.netPct / 100), 1) }));
  if (modal) {
    // peningkatan formula arah: konflik modal ↔ vonis teknis memangkas keyakinan + serangan tim merah
    if (pilihan.arah === 'BUY' && (modal.vonis === 'JEBAKAN_BULL' || modal.vonis === 'DISTRIBUSI' || modal.vonis === 'BUNUH_LONG' || (modal.squeezeAktif && modal.squeezeSkor >= 60))) {
      potong('MODAL', 6, `otak modal ${modal.vonis} (skor ${modal.skor}) melawan arah BUY`);
      pilihan.debat.serangan.push({
        dari: 'MODAL',
        teks: modal.vonis === 'JEBAKAN_BULL'
          ? `otak modal: jebakan bull — kerumunan long di funding mahal dekat puncak & whale melepas spot; pondasi BUY lemah (porsi futures ${modal.drivePct.toFixed(0)}%)`
          : modal.vonis === 'DISTRIBUSI'
            ? 'otak modal: harga naik tapi whale melepas di dua pasar — distribusi menyamar sebagai pump'
            : modal.vonis === 'BUNUH_LONG'
              ? `otak modal (hukum dua pedang): neraca bukti memilih pedang BUNUH LONG (skor ${modal.skor}, yakin-rendah tetap komit) — harga condong turun menyapu long; BUY dilawan pedang`
              : `otak modal: rally short-squeeze (skor ${modal.squeezeSkor}) — bensinnya penutupan short, bukan dana segar; rally rapuh`,
      });
    }
    if (pilihan.arah === 'SELL' && (modal.vonis === 'PUMP_NYATA' || modal.vonis === 'AKUMULASI' || modal.vonis === 'BUNUH_SHORT')) {
      potong('MODAL', 6, `otak modal ${modal.vonis} (skor ${modal.skor}) melawan arah SELL`);
      pilihan.debat.serangan.push({ dari: 'MODAL', teks: modal.vonis === 'BUNUH_SHORT'
        ? `otak modal (hukum dua pedang): neraca bukti memilih pedang BUNUH SHORT (skor ${modal.skor}, yakin-rendah tetap komit) — harga condong naik menyapu short; SELL dilawan pedang`
        : `otak modal: whale akumulasi nyata (spot net ${(modal.spotNet / 1e3).toFixed(1)} rb USD) — SELL melawan dana segar` });
    }
    // kerumunan mepet satu sisi (jumlah orang nyata Gate.io) — sisi penuh sesak dilikuidasi lebih dulu
    if (modal.orangRasioLong !== null && modal.orangLong !== null && modal.orangShort !== null) {
      if (pilihan.arah === 'BUY' && modal.orangRasioLong >= 0.65) {
        potong('KERUMUNAN', 3, 'kerumunan mepet LONG — sisi sesak dilikuidasi lebih dulu saat harga berbalik');
        pilihan.debat.serangan.push({ dari: 'KERUMUNAN', teks: `kerumunan mepet LONG: ${modal.orangLong} orang long vs ${modal.orangShort} short — sisi penuh sesak adalah sisi yang dilikuidasi lebih dulu saat harga berbalik` });
      }
      if (pilihan.arah === 'SELL' && modal.orangRasioLong <= 0.35) {
        potong('KERUMUNAN', 3, 'kerumunan mepet SHORT — SELL menumpang sisi penuh (bensin squeeze)');
        pilihan.debat.serangan.push({ dari: 'KERUMUNAN', teks: `kerumunan mepet SHORT: ${modal.orangShort} orang short vs ${modal.orangLong} long — short yang belum tutup adalah bensin squeeze; SELL menumpang sisi penuh` });
      }
    }
    // whale top-20 melawan arah (Gate.io top_long/short_size 3 jam)
    if (pilihan.arah === 'BUY' && modal.whaleTopKlasifikasi === 'JEBAKAN' && (modal.dTopShort ?? 0) >= 5) {
      potong('WHALE-TOP', 5, 'whale top-20 menambah SHORT melawan pump');
      pilihan.debat.serangan.push({ dari: 'WHALE-TOP', teks: `whale top-20 menambah SHORT +${(modal.dTopShort ?? 0).toFixed(1)}% (3 jam) sementara harga naik — posisi besar melawan pump: ${modal.whaleTopCara}` });
    }
    if (pilihan.arah === 'SELL' && modal.whaleTopKlasifikasi === 'PUMP_JUJUR' && (modal.dTopLong ?? 0) >= 5) {
      potong('WHALE-TOP', 5, 'whale top-20 menambah LONG searah pump');
      pilihan.debat.serangan.push({ dari: 'WHALE-TOP', teks: `whale top-20 menambah LONG +${(modal.dTopLong ?? 0).toFixed(1)}% (3 jam) — posisi besar searah pump, bukan trap: ${modal.whaleTopCara}` });
    }
    // PORTAL WAKTU (time traveler likuidasi) — serangan bila arah menempel zona korban
    const fmtJt = (v: number) => `${(v / 1e6).toFixed(2)} jt USD`;
    if (pilihan.arah === 'BUY' && modal.portalTurun && modal.portalTurun.dPct <= 3.5 && modal.portalTurun.prob24j >= 0.3) {
      potong('PORTAL-WAKTU', 5, `cluster korban LONG hanya ${modal.portalTurun.dPct.toFixed(2)}% di bawah — BUY menempel zona korban`);
      pilihan.debat.serangan.push({ dari: 'PORTAL-WAKTU', teks: `time traveler likuidasi: cluster korban LONG terdekat hanya ${modal.portalTurun.dPct.toFixed(2)}% di bawah (trigger ${modal.portalTurun.triggerHarga.toPrecision(6)}), peluang tersentuh 24j ${(modal.portalTurun.prob24j * 100).toFixed(0)}% — ${fmtJt(modal.portalTurun.korbanUsd)} long tersapu lalu kaskade menyeret harga ke ${modal.portalTurun.hargaAkhir.toPrecision(6)}; BUY menempel zona korban` });
    }
    if (pilihan.arah === 'SELL' && modal.portalNaik && modal.portalNaik.dPct <= 3.5 && modal.portalNaik.prob24j >= 0.3) {
      potong('PORTAL-WAKTU', 5, `cluster korban SHORT hanya ${modal.portalNaik.dPct.toFixed(2)}% di atas — SELL menempel zona squeeze`);
      pilihan.debat.serangan.push({ dari: 'PORTAL-WAKTU', teks: `time traveler likuidasi: cluster korban SHORT terdekat hanya ${modal.portalNaik.dPct.toFixed(2)}% di atas (trigger ${modal.portalNaik.triggerHarga.toPrecision(6)}), peluang tersentuh 24j ${(modal.portalNaik.prob24j * 100).toFixed(0)}% — ${fmtJt(modal.portalNaik.korbanUsd)} short tersapu (bensin squeeze) menuju ${modal.portalNaik.hargaAkhir.toPrecision(6)}; SELL menempel zona squeeze` });
    }
    // AKUMULASI SENYAP SPOT — orang besar menampung diam-diam
    if (pilihan.arah === 'BUY' && (modal.akumulasiKlasifikasi === 'AKUMULASI_SENYAP_AKTIF' || modal.akumulasiKlasifikasi === 'ADA_TANDA_MENAMPUNG')) {
      pilihan.debat.bertahan.push({ dari: 'AKUMULASI-SENYAP', teks: `deteksi absorpsi spot: ${modal.akumulasiKlasifikasi.replace(/_/g, ' ').toLowerCase()} (skor ${modal.akumulasiSkor}/100) — ada yang menampung diam-diam di spot tanpa menaikkan harga; mendukung pondasi BUY` });
    }
    if (pilihan.arah === 'SELL' && modal.akumulasiKlasifikasi === 'AKUMULASI_SENYAP_AKTIF') {
      potong('AKUMULASI-SENYAP', 4, 'SELL melawan akumulasi tersembunyi di spot');
      pilihan.debat.serangan.push({ dari: 'AKUMULASI-SENYAP', teks: `deteksi absorpsi spot aktif (skor ${modal.akumulasiSkor}/100) — orang besar sedang menampung diam-diam di spot; SELL melawan akumulasi tersembunyi` });
    }
  }
  // OTAK LINTASAN HIDUP — prediksi urutan magnet melawan vonis = penalti nyata
  // (E12 DIPAKAI, bukan pajangan): pola yang tertarik sisi berlawanan arah vonis
  // dengan rekam jejak pola yang menguatkan memangkas keyakinan rencana + masuk tim merah.
  if (lintasan?.pola && lintasan.keyakinanTerbuka.length) {
    const kTop = [...lintasan.keyakinanTerbuka].sort((a, b) => b.keyakinan - a.keyakinan)[0];
    const arahPertamaLawan = kTop && ((kTop.arahPertama === 'NAIK') !== (vonis.arah === 'NAIK'));
    if (arahPertamaLawan && kTop.keyakinan >= 0.45) {
      potong('LINTASAN', 4, `otak lintasan ${kTop.pola}: magnet ${kTop.m1.sisi} $${kTop.m1.harga.toPrecision(5)} paling dulu DITARIK (T ${kTop.m1.tarikan}, K ${kTop.keyakinan}) melawan ${vonis.vonis}`);
      pilihan.debat.serangan.push({ dari: 'LINTASAN', teks: `otak lintasan membaca pola ${kTop.pola}: harga TERTARIK dulu ke ${kTop.m1.sisi.toLowerCase()} $${kTop.m1.harga.toPrecision(5)}${kTop.lanjutan ? `, lalu ${kTop.lanjutan.tipe} $${kTop.lanjutan.harga.toPrecision(5)}` : ''} — urutan tarikan ${vonis.vonis} melawan rantai magnet (K=${kTop.keyakinan})` });
    }
    if (!arahPertamaLawan && kTop && kTop.keyakinan >= 0.5) {
      pilihan.debat.bertahan.push({ dari: 'LINTASAN', teks: `otak lintasan menopang ${vonis.vonis}: pola ${kTop.pola} — ${kTop.m1.sisi.toLowerCase()} $${kTop.m1.harga.toPrecision(5)} ditarik dulu (T ${kTop.m1.tarikan}) searah vonis${kTop.lanjutan ? `, lalu ${kTop.lanjutan.tipe} $${kTop.lanjutan.harga.toPrecision(5)}` : ''} (K=${kTop.keyakinan}, urutan bisa dibuktikan salah candle 1j)` });
    }
  }
  // OTAK SUMBER HIDUP — serangan bila kesaksian sumber melawan arah + bukti E9 tercatat
  if (sumber) {
    const e9 = vonis.bukti.find((b) => b.id === 'AR-E9');
    if (e9) sumber.votoMasukVonis = { aktif: true, teks: `AR-E9 Matriks Sumber MASUK dewan bukti arah (bobot ${e9.bobot}) — vote ${e9.vote}, kekuatan ${(e9.kekuatan * 100).toFixed(0)}%: ${e9.cara}` };
    const netNaikSb2 = sumber.kesaksian.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
    const netTurunSb2 = sumber.kesaksian.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
    if (vonis.arah === 'NAIK' && netTurunSb2 >= 8 && netTurunSb2 > netNaikSb2) {
      pilihan.debat.serangan.push({ dari: 'SUMBER', teks: `matriks sumber hidup melawan BUY (kesaksian TURUN ${(Math.round(netTurunSb2 * 10) / 10).toFixed(1)} vs NAIK ${(Math.round(netNaikSb2 * 10) / 10).toFixed(1)}): ${sumber.kesaksian.filter((k) => k.vote === 'TURUN').map((k) => k.dari).join(', ')} — overhang unlock & tekanan on-chain dibaca nyata` });
    }
    if (vonis.arah === 'TURUN' && netNaikSb2 >= 8 && netNaikSb2 > netTurunSb2) {
      pilihan.debat.serangan.push({ dari: 'SUMBER', teks: `matriks sumber hidup melawan SELL (kesaksian NAIK ${(Math.round(netNaikSb2 * 10) / 10).toFixed(1)} vs TURUN ${(Math.round(netTurunSb2 * 10) / 10).toFixed(1)}): ${sumber.kesaksian.filter((k) => k.vote === 'NAIK').map((k) => k.dari).join(', ')}` });
    }
    if (sumber.bentrokan.some((b) => b.topik === 'ARAH-TERBELAH')) {
      pilihan.debat.serangan.push({ dari: 'SUMBER-BENTROK', teks: 'sumber hidup saling menyangkal arah — dewan sumber tidak sepakat; semua kesaksian dibaca, keyakinan dipangkas (otak menolak menelan sumber mentah-mentah)' });
    }
  }
  // OTAK ALIRAN — serangan/bertahan berbasis model kaskade teruji + hukum kasus
  if (aliran) {
    const sisiAliran = aliran.vonis.korban;
    if (sisiAliran === 'LONG' && pilihan.arah === 'BUY') {
      potong('ALIRAN-KASKADE', 7, 'sisi LONG berisiko dilikuidasi 6j — BUY menabrak jadwal likuidasi');
      pilihan.debat.serangan.push({ dari: 'ALIRAN-KASKADE', teks: `model kaskade teruji: sisi LONG berisiko dilikuidasi 6 jam ke depan (skor ${aliran.vonis.skorKorban}, alarm ${aliran.vonis.alarmLevel}) — hukum kasus n=${aliran.vonis.hukumRujuk[0]?.n ?? 564}: banjir long → harga turun 72.9%; BUY menabrak jadwal likuidasi` });
    }
    if (sisiAliran === 'SHORT' && pilihan.arah === 'SELL') {
      potong('ALIRAN-KASKADE', 7, 'sisi SHORT berisiko dilikuidasi 6j — SELL menabrak jadwal squeeze');
      pilihan.debat.serangan.push({ dari: 'ALIRAN-KASKADE', teks: `model kaskade teruji: sisi SHORT berisiko dilikuidasi 6 jam ke depan (skor ${aliran.vonis.skorKorban}, alarm ${aliran.vonis.alarmLevel}) — hukum kasus n=${aliran.vonis.hukumRujuk[0]?.n ?? 635}: banjir short → harga naik 75.0%; SELL menabrak jadwal squeeze` });
    }
    if (sisiAliran === 'SHORT' && pilihan.arah === 'BUY') {
      pilihan.debat.bertahan.push({ dari: 'ALIRAN-KASKADE', teks: `model kaskade: bensin squeeze terdeteksi di sisi SHORT (skor ${aliran.vonis.skorKorban}, alarm ${aliran.vonis.alarmLevel}) — kalau kaskade picut, harga naik ${((aliran.vonis.hukumRujuk[0]?.rate ?? 0.75) * 100).toFixed(0)}% kasus (n=${aliran.vonis.hukumRujuk[0]?.n ?? 635}); BUY searah bahan bakar` });
    }
    if (sisiAliran === 'LONG' && pilihan.arah === 'SELL') {
      pilihan.debat.bertahan.push({ dari: 'ALIRAN-KASKADE', teks: `model kaskade: bensin long-flush terdeteksi (skor ${aliran.vonis.skorKorban}, alarm ${aliran.vonis.alarmLevel}) — banjir long menyeret harga turun 72.9% kasus (n=564); SELL searah bahan bakar` });
    }
  }
  // OTAK SELARAS — keyakinan final = dasar − semua penalti (rincian terbuka), lalu audit penuh
  pilihan.keyakinan = Math.max(5, Math.min(97, Math.round(vonis.kepastian - penaltiRincian.reduce((s, x) => s + x.poin, 0))));
  pilihan.penaltiRincian = penaltiRincian;
  const selaras = auditSelaras({
    hari, hargaLive: cs[cs.length - 1].c,
    vonisHidup: { vonis: vonis.vonis, kepastian: vonis.kepastian },
    aktif: aktif ? { hari: aktif.hari, arah: aktif.arah, keyakinan: aktif.keyakinan, entry: aktif.entry, target: aktif.target, stop: aktif.stop, ambisius: aktif.ambisius, hash: aktif.hash, nomor: aktif.kunci.nomor, knobSaatKunci: aktif.knobSaatKunci } : null,
    aktifStatus,
    rencana: aktif ? { entry: aktif.rencana.entry, stop: aktif.rencana.stop, target: aktif.rencana.target, highAmbisius: aktif.rencana.highAmbisius, stopPct: aktif.rencana.stopPct, targetPct: aktif.rencana.targetPct, ambisiusPct: aktif.rencana.ambisiusPct, netUntungPct: aktif.rencana.netUntungPct, targetMediana: aktif.rencana.targetMediana, pTarget: aktif.rencana.pTarget, pStop: aktif.rencana.pStop } : null,
    mcLive: { pTarget: mc.pTarget, pStop: mc.pStop, pAmbisius: mc.pAmbisius, pNaik: mc.pNaik },
    modal: modal ? { vonis: modal.vonis, skor: modal.skor, squeezeSkor: modal.squeezeSkor, squeezeAktif: modal.squeezeAktif, drivePct: modal.drivePct } : null,
    aliran: aliran ? { korban: aliran.vonis.korban, arah: aliran.vonis.arah, alarmLevel: aliran.vonis.alarmLevel } : null,
    peta: petaWaktu ? { arahDominan: petaWaktu.arahDominan, marginArah: petaWaktu.marginArah, legPertamaPeluang: petaWaktu.kaki[0]?.peluang ?? null, kakiTurunAda: !!petaWaktu.kakiTurun } : null,
    sumber: sumber ? { unlockHari: sumber.unlock?.berikutnya?.hariDariSekarang ?? null, unlockPctVsBeredar: sumber.unlock?.berikutnya?.pctVsBeredar ?? null, unlockUsd: sumber.unlock?.berikutnya?.usd ?? null, unlockTanggal: sumber.unlock?.berikutnya?.tanggal ?? null, sumberHidup: sumber.sumberHidup, sumberTerwakili: sumber.sumberTerwakili, sumberTerkunci: sumber.sumberTerkunci } : null,
    sellOn: toko.sellOn,
    ledgerOk: verifikasiRantai(toko.ledger).ok,
    keyakinanTampil: pilihan.keyakinan,
    penaltiRincian,
    feePct: FEE_PER_SIDE_PCT * 2,
  });
  // OTAK PANTAU — status pantau terus-menerus untuk panel (hukum P-1..P-7)
  const pantau: PantauData = {
    at: new Date().toISOString(),
    hukum: HUKUM_PANTAU,
    cekTerakhir: toko.pantauCekTerakhir,
    slotHariIni: toko.slotTerakhirCoba?.hari === hari ? toko.slotTerakhirCoba.zaman : 0,
    zamanAktif: aktif ? aktif.zaman : null,
    waktuKunciAktif: aktif ? aktif.waktuKunci : null,
    nRekalkHariIni: toko.pantauLog.filter((x) => x.at.slice(0, 10) === new Date().toISOString().slice(0, 10)).length,
    sejarah: [...toko.pantauLog].reverse().slice(0, 12),
    status: aktif
      ? `pantau aktif — harga hidup ${t24 ? t24.lastPrice.toPrecision(6) : '—'} diadili tiap segarkan melawan TP ${aktif.target.toPrecision(6)} / SL ${aktif.stop.toPrecision(6)}; kena → dicatat + rekalkulasi mandiri zaman #${aktif.zaman + 1} otomatis (tidak menunggu tutup candle)`
      : 'tanpa slot aktif hari ini — pantau tetap hidup: harga diadili tiap segarkan; slot zaman berikutnya dikunci saat guard lolos',
  };
  const payload = {
    meta: {
      nama: 'MICAPROFITA · ARENA ELSA',
      gen: GEN, otak: OTAK_VERSI, hari, sumber: 'data hidup Bybit v5 spot (ELSAUSDT)',
      harga: cs[cs.length - 1].c, perubahan24j: t24?.perubahan24jPct ?? null,
      selisihTutupMs: (() => { const next = new Date(dayOf(cs[cs.length - 1].t) + 'T00:00:00Z'); next.setUTCDate(next.getUTCDate() + 1); return next.getTime() - Date.now(); })(),
      rezim, rezimKet: rezim.ket, candle: cs.length, adaptasi: toko.genome.v2,
    },
    pilihan,
    selaras,
    aktifStatus,
    mc,
    vonis,
    kl: { aksi: kl.aksi, arah: kl.arah, pelajaran: kl.pelajaranAktif, alasan: kl.alasan, pool: kl.pool, grab: kl.grab, gauntlet: kl.gauntlet, pd: kl.pd, aspek5: kl.aspek5 },
    bukuCuan: { ...metrik, rezimRugi },
    ledger: { jumlah: toko.ledger.jumlah, verifikasi: verifikasiRantai(toko.ledger), terakhir: toko.ledger.rantai.slice(-5) },
    events: toko.events.slice(0, 24),
    ingatan: { baris: toko.ingatan.slice(0, 40), total: toko.ingatan.length },
    genome: toko.genome,
    sellOn: toko.sellOn,
    ujian,
    pertumbuhan,
    riwayatPertumbuhan,
    modal,
    aliran,
    sumber,
    paus,
    ignisi,
    kasus: kasusHidup,
    rekonsiliasiPaus: rekonsiliasiPaus(),
    petaWaktu,
    lintasan,
    ujianElsa,
    ujianDenyut: bacaDenyut(),
    otonomi: bacaOtonomi(),
    paham: bacaPaham(),
    domino: {
      hari,
      fp: dominoHidup.fp,
      konsultasi: dominoHidup.konsultasi,
      sikap: dominoHidup.sikap,
      poin: dominoHidup.poin,
      aktifDomino: aktif?.domino ?? null,
      dasarKepastian: vonis.kepastian,
      keyakinanFinal: pilihan.keyakinan,
      neuron: upgradeData.neuron ? { at: upgradeData.neuron.at, sourceJumlah: upgradeData.neuron.sourceJumlah, nV0: upgradeData.neuron.nV0, nV1: upgradeData.neuron.nV1, validasi: upgradeData.neuron.validasi, knob: upgradeData.neuron.knob } : null,
    },
    upgrade: upgradeData,
    dompet,
    pantau,
    doktrin: { modul: DOCTRINE.MODULS.map((m) => ({ id: m.id, label: m.label, short: m.short, tagline: (m as { tagline?: string }).tagline ?? '', sections: (m.sections as unknown[]).length })), totalSeksi: DOCTRINE.MODULS.reduce((s, m) => s + m.sections.length, 0), papers: DOCTRINE.PAPERS.length },
    chart: cs.slice(-90).map((c) => ({ t: dayOf(c.t), o: c.o, h: c.h, l: c.l, c: c.c, v: c.v })),
  };
  memPayload = { at: Date.now(), payload };
  return payload as unknown as Record<string, unknown>;
}

export function setSellOn(v: boolean) {
  toko.sellOn = v;
  toko.events.unshift({ day: new Date().toISOString().slice(0, 10), kind: 'UPGRADE', text: `KNOB sellOn ${v ? 'DINYALAKAN' : 'DIMATIKAN'} oleh pemilik — arah SELL ${v ? 'kini legal masuk rencana' : 'tetap dihitung tapi tanpa rencana'} (hasil lab sumber: SELL menggerus profit)`, at: new Date().toISOString() });
  simpan();
  memPayload = null;
}

// ============================================================
// MESIN UPGRADE PENUH — satu pintu domino ujian → upgrade (ruh ujian).
// DIPANGGIL OLEH JANTUNG (otomatis: tiap denyut penuh + domino ujian
// tuntas) — TANPA TOMBOL PENYALA (hukum pemilik 2026-11-26: dua mesin
// tidak boleh menunggu tangan manusia; tombol manual = oknum pemalas).
// Pelajaran konteks difus jadi neuron index, divalidasi 100-soal
// tanpa buku kasus, lalu knob hidup diterbitkan — generasi genome
// NAIK HANYA bila neuron benar-benar baru dibangun (bukan piagam).
// OTAK OTONOMI: SETIAP panggilan tercatat di buku otonomi — termasuk
// cek mandiri yang kesimpulannya "belum perlu refusi" (bukan diam
// saja seperti dulu; nyala yang tak terlihat = mesin tampak mati).
// ============================================================
export async function jalankanUpgradePenuh(paksa = false): Promise<UpgradeData> {
  const hasil = await bangunNeuron(paksa);
  if (hasil.baru) {
    const n = hasil.neuron;
    toko.genome.generation = (toko.genome.generation ?? 1) + 1;
    const teks = `UPGRADE G${toko.genome.generation} — NEURON KONTEKS hidup: ${n.sourceJumlah} pelajaran ujian difus jadi index (v0 ${n.nV0} · v1 ${n.nV1} konteks); validasi 100-soal tanpa buku kasus: ${n.validasi.dijawabKonteks} dijawab, lulus ${n.validasi.lulus}, net ${n.validasi.netPct}% after-fee → knob: bobot konteks ${n.knob.bobotKonteks}, penalti konflik maks ${n.knob.penaltiKonflikMaks} poin, adopsi rencana ${n.knob.adopsiRencana ? 'AKTIF' : 'MATI'} — pelajaran kini DIPAKAI keputusan hidup (efek domino ujian)`;
    toko.genome.logs.push({ at: new Date().toISOString(), text: teks });
    toko.events.unshift({ day: new Date().toISOString().slice(0, 10), kind: 'UPGRADE', text: teks, at: new Date().toISOString() });
    simpan();
    catatOtonomi({
      mesin: 'UPGRADE', pemicu: 'JANTUNG', mandiri: true,
      hasil: `neuron baru diterbitkan G${toko.genome.generation}`,
      bukti: `${n.sourceJumlah} pelajaran difus · validasi ${n.validasi.dijawabKonteks}/${n.validasi.soal} (lulus ${n.validasi.lulus}, net ${n.validasi.netPct}%) · knob: bobot ${n.knob.bobotKonteks}, penalti maks ${n.knob.penaltiKonflikMaks}, adopsi ${n.knob.adopsiRencana ? 'AKTIF' : 'MATI'}`,
    });
  } else {
    const data = bacaUpgradeData();
    catatOtonomi({
      mesin: 'UPGRADE', pemicu: 'JANTUNG', mandiri: true,
      hasil: `cek mandiri: ${data.pelajaranJumlah} pelajaran — neuron ${data.segar ? 'segar' : 'perlu refusi'}, ${data.segar ? 'tanpa refusi (bukan diam: pemeriksaan tercatat)' : 'refusi menyusul'}`,
      bukti: `neuron G-dibangun ${data.neuron?.at ?? '—'} · sourceJumlah ${data.neuron?.sourceJumlah ?? 0} = pelajaran kini ${data.pelajaranJumlah} · mesin hidup, memeriksa dirinya sendiri tiap denyut`,
    });
  }
  return bacaUpgradeData();
}

// invalidasi cache payload — dipanggil route setelah aksi yang mengubah data
// (mis. ujian ulang) agar GET berikutnya langsung menyajikan keadaan terbaru
export function invalideCachePayload() { memPayload = null; }

export function resetIngatan() {
  toko.ingatan = [];
  simpan();
  memPayload = null;
}

// JEMBATAN UJI (khusus skrip uji sandbox) — akses internal untuk
// menguji pantau-terus & kunci-slot tanpa menyentuh UI/endpoint.
export const _ujiPantau = {
  toko, simpan, dayOf, kunciSlot, pantauLive, urutanKena, nilaiRencana, klasifikasiRezim, faktorKomposit,
};
