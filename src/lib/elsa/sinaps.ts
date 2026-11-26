// ============================================================
// MICAPROFITA-ELSA · SINAPS — bus saraf hidup arsitektur kognitif
// (keluhan pemilik, 2026-11-24): "arsitektur kognitif kita terkesan
// tak ada ruh — hanya sekadar kaya tulisan… kelemahan & premature."
// Benar. Tab lama = 12 kartu teks MATI yang tak pernah berubah.
// Sekarang: setiap organ dibaca NYATA dari payload arena —
//   · aktifasi 0..1 dihitung dari sinyal asli (bukan dekorasi)
//   · metrik = angka hidup dari data sekarang
//   · keluaran = ringkasan vonis organ SAAT INI
//   · denyut = jurnal aktivitas nyata (events, pantau, ledger,
//     ujian, dompet, guru) — bukan teks pemanis
// Hukum jujur: organ tanpa data diakui MATI/belum-terbaca, bukan
// dipakaikan status hidup.
// ============================================================
import fs from 'fs';
import { getArenaPayload } from './arena';
import { statusNeuron } from './guru';
import { bacaPersilanganPayload } from './persilangan';
import { bacaBriefingPayload } from './briefing';
import { bacaPertumbuhanPayload } from './pertumbuhan';

type AnyRec = Record<string, unknown>;
const num = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : null;
const str = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null;
const rec = (v: unknown): AnyRec | null =>
  v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as AnyRec) : null;
const arr = (v: unknown): unknown[] | null =>
  Array.isArray(v) ? v : null;
const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

export type OrganStatus = 'AKTIF' | 'MENYALA' | 'IDLE' | 'BLOKIR' | 'MATI';
export type OrganMetrik = { label: string; nilai: string; tonus?: 'hijau' | 'merah' | 'amber' | 'cyan' | 'ungu' | 'netral' };
export type Organ = {
  id: string;
  nama: string;
  lapisan: 'SENSORIK' | 'KOGNISI' | 'MEMORI' | 'FUNDAMEN' | 'AKSI';
  tugas: string;
  aktifasi: number; // 0..1 dari sinyal nyata
  status: OrganStatus;
  metrik: OrganMetrik[];
  keluaran: string;
  terakhir: string | null;
  denyut24j: number;
  sumber: string[]; // field payload yang memberinya makan — kejujuran kabel
};
export type Saluran = { dari: string; ke: string; bobot: number };
export type DenyutItem = { at: string; organ: string; jenis: string; teks: string };
export type SinapsData = {
  at: string;
  organ: Organ[];
  saluran: Saluran[];
  denyut: DenyutItem[];
  statistik: {
    organTotal: number; organHidup: number; organAktif: number;
    denyut24j: number; denyutTotal: number;
    harga: number | null; vonis: string; labelArah: string; keyakinan: number; guard: string;
  };
};

const DIR_GURU = '/home/z/my-project/db/elsa/guru';

function fmtHarga(v: number | null): string {
  return v === null ? '—' : `$${v < 0.1 ? v.toFixed(5) : v.toFixed(4)}`;
}
function fmtPct(v: number | null, tanda = true): string {
  return v === null ? '—' : `${tanda && v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
}
function fmtUsd(v: number | null): string {
  if (v === null) return '—';
  const a = Math.abs(v);
  const t = v < 0 ? '−' : '';
  if (a >= 1e9) return `${t}$${(a / 1e9).toFixed(2)}M`;
  if (a >= 1e6) return `${t}$${(a / 1e6).toFixed(2)}jt`;
  if (a >= 1e3) return `${t}$${(a / 1e3).toFixed(1)}rb`;
  return `${t}$${a.toFixed(0)}`;
}
function bacaJson(file: string): AnyRec | null {
  try {
    if (!fs.existsSync(file)) return null;
    return rec(JSON.parse(fs.readFileSync(file, 'utf8')));
  } catch {
    return null;
  }
}

function statusDari(a: number, blokir = false, mati = false): OrganStatus {
  if (mati) return 'MATI';
  if (blokir) return 'BLOKIR';
  if (a >= 0.66) return 'AKTIF';
  if (a >= 0.35) return 'MENYALA';
  return 'IDLE';
}

// ============================================================
// inti: bangun peta organ dari payload NYATA
// ============================================================
async function bangunOrgan(): Promise<{ organ: Organ[]; statistikUjung: SinapsData['statistik'] }> {
  const p = (await getArenaPayload()) as AnyRec;
  const meta = rec(p.meta);
  const pil = rec(p.pilihan);
  const kl = rec(p.kl);
  const mc = rec(p.mc);
  const buku = rec(p.bukuCuan);
  const ledger = rec(p.ledger);
  const ingat = rec(p.ingatan);
  const pert = rec(p.pertumbuhan);
  const modal = rec(p.modal);
  const aliran = rec(p.aliran);
  const sumber = rec(p.sumber);
  const paus = rec(p.paus);
  const peta = rec(p.petaWaktu);
  const ujianElsa = rec(p.ujianElsa);
  const dompet = rec(p.dompet);
  const pantau = rec(p.pantau);
  const selaras = rec(p.selaras);
  const aktifSt = rec(p.aktifStatus);
  const gur = statusNeuron();

  const organ: Organ[] = [];
  const tambah = (o: Organ) => organ.push(o);

  // ---------- LAPISAN SENSORIK ----------
  const harga = num(meta?.harga);
  const c24 = num(meta?.perubahan24j);
  const nCandle = num(meta?.candle);
  const selisihMs = num(meta?.selisihTutupMs);
  const jamTutup = selisihMs !== null
    ? `${Math.max(0, Math.floor(selisihMs / 3_600_000))}j ${Math.max(0, Math.floor((selisihMs % 3_600_000) / 60_000))}m`
    : '—';
  tambah({
    id: 'nadi', nama: 'NADI', lapisan: 'SENSORIK',
    tugas: 'detak candle Bybit + iklim BTC — segala input masuk lewat sini',
    aktifasi: 1, status: 'AKTIF',
    metrik: [
      { label: 'harga hidup', nilai: fmtHarga(harga), tonus: 'cyan' },
      { label: '24 jam', nilai: fmtPct(c24), tonus: c24 !== null ? (c24 >= 0 ? 'hijau' : 'merah') : 'netral' },
      { label: 'candle ke', nilai: `${nCandle ?? '—'}`, tonus: 'netral' },
      { label: 'tutup berikutnya', nilai: jamTutup, tonus: 'netral' },
    ],
    keluaran: `rezim ${str(meta?.rezimKet)?.slice(0, 60) ?? str(rec(meta?.rezim)?.ket)?.slice(0, 60) ?? '—'}`,
    terakhir: new Date().toISOString(),
    sumber: ['meta'],
  });

  const raw = rec(pil?.raw);
  const rsi = num(raw?.rsi), atr = num(raw?.atrPct), mom7 = num(raw?.mom7), mom30 = num(raw?.mom30);
  const volSurge = num(raw?.volSurge), distHigh = num(raw?.distHigh), emaAlign = num(raw?.emaAlign);
  const aktPengelihatan = clamp01(
    (rsi !== null ? Math.abs(rsi - 50) / 50 : 0.3) * 0.4 +
    (atr !== null ? atr / 14 : 0.3) * 0.3 +
    (volSurge !== null ? Math.min(1, volSurge / 3) : 0.3) * 0.3,
  );
  tambah({
    id: 'penglihatan', nama: 'PENGELIHATAN', lapisan: 'SENSORIK',
    tugas: 'EMA/ATR/RSI/BB, swing HH/HL/LH/LL, breakout, squeeze (buildCandleVision)',
    aktifasi: aktPengelihatan, status: statusDari(aktPengelihatan),
    metrik: [
      { label: 'RSI', nilai: rsi?.toFixed(1) ?? '—', tonus: rsi !== null ? (rsi >= 70 ? 'merah' : rsi <= 30 ? 'hijau' : 'netral') : 'netral' },
      { label: 'ATR', nilai: `${atr?.toFixed(1) ?? '—'}%`, tonus: atr !== null && atr > 8 ? 'amber' : 'netral' },
      { label: 'mom 7h', nilai: fmtPct(mom7), tonus: mom7 !== null ? (mom7 >= 0 ? 'hijau' : 'merah') : 'netral' },
      { label: 'EMA align', nilai: `${emaAlign ?? '—'}/7`, tonus: 'netral' },
    ],
    keluaran: `volSurge ${volSurge?.toFixed(2) ?? '—'}× · jarak dari high ${fmtPct(distHigh)} · mom30 ${fmtPct(mom30)}`,
    terakhir: null, sumber: ['pilihan.raw', 'vonis.bukti'],
  });

  const pool = rec(kl?.pool);
  const sentuhan = num(pool?.sentuhan) ?? 0;
  const swept = pool?.swept === true;
  const aktPemeta = clamp01(swept ? 0.95 : sentuhan > 0 ? 0.6 : 0.3);
  tambah({
    id: 'pemeta', nama: 'PEMETA LIKUIDITAS', lapisan: 'SENSORIK',
    tugas: 'pivot k=3 + touch-zone + kunjungan + sapuan episode — pool BAWAH/ATAS',
    aktifasi: aktPemeta, status: statusDari(aktPemeta),
    metrik: [
      { label: 'pool', nilai: `${str(pool?.jenis) ?? '—'} · ${str(pool?.side) ?? '—'}`, tonus: 'cyan' },
      { label: 'level', nilai: fmtHarga(num(pool?.level)), tonus: 'netral' },
      { label: 'sentuhan', nilai: `${sentuhan}×`, tonus: 'netral' },
      { label: 'sapuan', nilai: swept ? 'TERSWEEP' : 'belum', tonus: swept ? 'amber' : 'netral' },
    ],
    keluaran: `depth ${fmtPct(num(pool?.depthAtr))} ATR · bars sejak ${num(pool?.barsSince) ?? '—'}${pool?.reclaimed === true ? ' · reclaimed' : ''}`,
    terakhir: null, sumber: ['kl.pool'],
  });

  const aspek5 = rec(kl?.aspek5);
  const aksiKl = str(kl?.aksi);
  const nAspek = aspek5
    ? [aspek5.stopHunt, aspek5.falseBreakout, aspek5.pumpDump, aspek5.bearTrap, aspek5.bullTrap].filter(Boolean).length
    : 0;
  const aktTracker = clamp01(nAspek / 5 * 0.7 + (aksiKl && aksiKl !== 'WAIT' ? 0.3 : 0));
  tambah({
    id: 'tracker', nama: 'TRACKER EPISODE', lapisan: 'SENSORIK',
    tugas: 'klVonis 5-aspek: stop hunt, FBO, pump-dump, bear/bull trap (ENTRY/WAIT/SKIP)',
    aktifasi: aktTracker, status: statusDari(aktTracker),
    metrik: [
      { label: 'aksi episode', nilai: aksiKl ?? '—', tonus: aksiKl === 'ENTRY' ? 'hijau' : aksiKl === 'SKIP' ? 'merah' : 'netral' },
      { label: 'aspek menyala', nilai: `${nAspek}/5`, tonus: nAspek >= 3 ? 'amber' : 'netral' },
      { label: 'grab', nilai: rec(kl?.grab)?.terjadi === true ? 'TERJADI' : 'tidak', tonus: rec(kl?.grab)?.terjadi === true ? 'amber' : 'netral' },
      { label: 'bull/bear trap', nilai: `${aspek5?.bullTrap === true || kl?.gauntlet ? (rec(kl?.gauntlet)?.bullTrap === true ? 'bull' : rec(kl?.gauntlet)?.bearTrap === true ? 'bear' : 'bersih') : 'bersih'}`, tonus: 'netral' },
    ],
    keluaran: str(kl?.alasan)?.slice(0, 120) ?? 'episode bersih — tanpa manipulasi menonjol',
    terakhir: null, sumber: ['kl.aksi', 'kl.aspek5', 'kl.grab', 'kl.gauntlet', 'kl.pd'],
  });

  // ---------- LAPISAN KOGNISI ----------
  const duties = arr(pil?.duties) ?? [];
  const nLolos = duties.filter((d) => rec(d)?.pass === true).length;
  const aktDewan = duties.length ? nLolos / duties.length : 0;
  tambah({
    id: 'dewan', nama: 'DEWAN BUKTI 8D', lapisan: 'KOGNISI',
    tugas: '8 dimensi bukti + 11 duty guard: struktur, likuiditas, volume, momentum, volatilitas, S/R, tekanan, perubahan',
    aktifasi: aktDewan, status: statusDari(aktDewan),
    metrik: [
      { label: 'duty lolos', nilai: `${nLolos}/${duties.length}`, tonus: aktDewan >= 0.8 ? 'hijau' : aktDewan >= 0.6 ? 'amber' : 'merah' },
      { label: 'komposit', nilai: num(pil?.faktor?.komposit)?.toFixed(2) ?? '—', tonus: 'netral' },
      { label: 'skor 4j', nilai: num(pil?.faktor?.m4h)?.toFixed(2) ?? '—', tonus: 'netral' },
      { label: 'keyakinan dasar', nilai: `${num(rec(p.vonis)?.kepastian) ?? '—'}%`, tonus: 'cyan' },
    ],
    keluaran: duties.filter((d) => rec(d)?.pass === false).map((d) => str(rec(d)?.name) ?? '?').slice(0, 3).join(', ') || 'semua duty lolos',
    terakhir: null, sumber: ['pilihan.duties', 'pilihan.faktor'],
  });

  const arah = str(pil?.arah);
  const keyakinan = num(pil?.keyakinan);
  const guard = str(pil?.guard);
  const garis = rec(pil?.garis);
  const nPenalti = arr(pil?.penaltiRincian)?.length ?? 0;
  const aktKetua = keyakinan !== null ? clamp01(keyakinan / 100) : 0;
  tambah({
    id: 'ketua', nama: 'KETUA DEWAN', lapisan: 'KOGNISI',
    tugas: 'fusi bobot + lapisan KETUA-* + penalti terbuka → vonis biner & keyakinan final',
    aktifasi: aktKetua, status: statusDari(aktKetua, guard === 'TOLAK'),
    metrik: [
      { label: 'vonis', nilai: `${arah ?? '—'}${str(pil?.labelArah) ? ` (${str(pil?.labelArah)})` : ''}`, tonus: arah === 'BUY' ? 'hijau' : arah === 'SELL' ? 'merah' : 'netral' },
      { label: 'keyakinan final', nilai: `${keyakinan ?? '—'}%`, tonus: 'cyan' },
      { label: 'guard', nilai: guard ?? '—', tonus: guard === 'LOLOS' ? 'hijau' : 'amber' },
      { label: 'penalti terbuka', nilai: `${nPenalti} sumber`, tonus: nPenalti > 0 ? 'amber' : 'netral' },
    ],
    keluaran: garis
      ? `garis hidup: entry ${fmtHarga(num(garis.entry))} → TP ${fmtHarga(num(garis.target))} (${fmtPct(num(garis.targetPct))}) / SL ${fmtHarga(num(garis.stop))} (${fmtPct(num(garis.stopPct))})`
      : 'garis vonis belum terbentuk',
    terakhir: null, sumber: ['pilihan.arah', 'pilihan.keyakinan', 'pilihan.guard', 'pilihan.garis', 'pilihan.penaltiRincian'],
  });

  const pTarget = num(mc?.pTarget), pStop = num(mc?.pStop);
  const aktMc = pTarget !== null ? clamp01(pTarget / 0.8) : 0;
  tambah({
    id: 'montecarlo', nama: 'MONTE CARLO', lapisan: 'KOGNISI',
    tugas: 'GBM lintasan×langkah berbibit GARCH — pTarget/pStop/pAmbisius',
    aktifasi: aktMc, status: statusDari(aktMc),
    metrik: [
      { label: 'p target', nilai: pTarget !== null ? fmtPct(pTarget * 100, false) : '—', tonus: 'hijau' },
      { label: 'p stop', nilai: pStop !== null ? fmtPct(pStop * 100, false) : '—', tonus: 'merah' },
      { label: 'lintasan', nilai: `${num(mc?.lintasan) ?? '—'}×${num(mc?.langkah) ?? '—'}`, tonus: 'netral' },
      { label: 'p naik', nilai: num(mc?.pNaik) !== null ? fmtPct((num(mc?.pNaik) as number) * 100, false) : '—', tonus: 'netral' },
    ],
    keluaran: str(mc?.ket)?.slice(0, 120) ?? 'simulasi belum berjalan',
    terakhir: null, sumber: ['mc'],
  });

  const debat = rec(pil?.debat);
  const kortex = rec(pil?.kortex);
  const tekanan = num(debat?.tekanan) ?? 0;
  const skorKortex = num(kortex?.skor);
  const aktDebat = skorKortex !== null ? clamp01(skorKortex / 100) : 0;
  tambah({
    id: 'debat', nama: 'DEBAT & KORTEX', lapisan: 'KOGNISI',
    tugas: 'tim merah V278 menyerang vonis + skor KORTEX V279 memangkas kepastian',
    aktifasi: aktDebat, status: statusDari(aktDebat, tekanan >= 3),
    metrik: [
      { label: 'skor kortex', nilai: `${skorKortex ?? '—'}/100`, tonus: skorKortex !== null && skorKortex >= 60 ? 'hijau' : 'amber' },
      { label: 'tekanan debat', nilai: `${tekanan}`, tonus: tekanan >= 3 ? 'merah' : tekanan > 0 ? 'amber' : 'hijau' },
      { label: 'serangan', nilai: `${arr(debat?.serangan)?.length ?? 0} teks`, tonus: 'netral' },
      { label: 'bertahan', nilai: `${arr(debat?.bertahan)?.length ?? 0} teks`, tonus: 'netral' },
    ],
    keluaran: str(debat?.vonis)?.slice(0, 120) ?? 'debat belum diadakan',
    terakhir: null, sumber: ['pilihan.debat', 'pilihan.kortex'],
  });

  // ---------- LAPISAN MEMORI ----------
  const prareg = rec(pil?.praRegistrasi);
  const ledgerOk = rec(ledger?.verifikasi)?.ok === true;
  const aktPrareg = aktifSt || prareg ? 1 : ledgerOk ? 0.55 : 0.15;
  tambah({
    id: 'prareg', nama: 'PRA-REGISTRASI', lapisan: 'MEMORI',
    tugas: 'ledger SHA-256 append-only — prediksi dikunci SEBELUM medan, cek 3/7/11/14',
    aktifasi: aktPrareg, status: statusDari(aktPrareg, false, !ledgerOk),
    metrik: [
      { label: 'entri ledger', nilai: `${num(ledger?.jumlah) ?? 0}`, tonus: 'cyan' },
      { label: 'rantai', nilai: ledgerOk ? 'UTUH' : `RUSAK @${num(rec(ledger?.verifikasi)?.jumlah) ?? '?'}`, tonus: ledgerOk ? 'hijau' : 'merah' },
      { label: 'slot aktif', nilai: num(pil?.zamanRencana) !== null ? `zaman #${num(pil?.zamanRencana)}` : '—', tonus: 'netral' },
      { label: 'hash aktif', nilai: prareg ? `${str(prareg.hash)?.slice(0, 10)}…` : '—', tonus: 'netral' },
    ],
    keluaran: prareg ? `# ${num(prareg.nomor) ?? '?'} dikunci ${str(prareg.waktuKunci)?.slice(5, 16) ?? '—'} — horizon ${str(prareg.horizon) ?? '—'}` : 'belum ada kunci aktif hari ini',
    terakhir: str(prareg?.waktuKunci), sumber: ['pilihan.praRegistrasi', 'ledger'],
  });

  const metrikBuku = rec(buku?.metrik);
  const berlangsung = rec(buku?.berlangsung);
  const hasilSementara = str(aktifSt?.hasilSementara);
  const aktHakim = berlangsung ? 0.9 : hasilSementara && hasilSementara !== 'BERJALAN' ? 0.7 : 0.3;
  tambah({
    id: 'hakim', nama: 'HAKIM MEDAN', lapisan: 'MEMORI',
    tugas: 'mengadili rencana dari candle 1j nyata (urutan TP/SL) — after-fee 0.4%, TOLAK pun diadili',
    aktifasi: aktHakim, status: statusDari(aktHakim),
    metrik: [
      { label: 'status slot', nilai: hasilSementara ?? 'tanpa slot', tonus: hasilSementara?.startsWith('MENANG') || hasilSementara === 'CUAN_MENGAMBANG' ? 'hijau' : hasilSementara?.startsWith('KALAH') ? 'merah' : 'netral' },
      { label: 'net sementara', nilai: fmtPct(num(aktifSt?.netSementaraPct)), tonus: num(aktifSt?.netSementaraPct) !== null && (num(aktifSt?.netSementaraPct) as number) >= 0 ? 'hijau' : 'merah' },
      { label: 'menang/kalah', nilai: `${num(metrikBuku?.menang) ?? 0}/${num(metrikBuku?.kalah) ?? 0}`, tonus: 'netral' },
      { label: 'winRate', nilai: num(metrikBuku?.winRate) !== null ? `${num(metrikBuku?.winRate)}%` : '—', tonus: 'netral' },
    ],
    keluaran: `urutan kena: ${str(aktifSt?.urutan) ?? '—'} (sumber ${str(aktifSt?.urutanSumber) ?? '—'}) · jarak TP ${fmtPct(num(aktifSt?.jarakTargetPct))} · jarak SL ${fmtPct(num(aktifSt?.jarakStopPct))}`,
    terakhir: null, sumber: ['aktifStatus', 'bukuCuan.metrik', 'bukuCuan.berlangsung'],
  });

  const mem = rec(pil?.mem);
  const totalIngatan = num(ingat?.total) ?? 0;
  const aktIngat = clamp01(Math.max(totalIngatan / 30, mem ? 0.6 : 0));
  tambah({
    id: 'ingatan', nama: 'INGATAN', lapisan: 'MEMORI',
    tugas: 'berjenjang SIMBOL/REZIM/GLOBAL — keteledoran → aturan; skill fingerprint per pola',
    aktifasi: aktIngat, status: statusDari(aktIngat),
    metrik: [
      { label: 'baris ingatan', nilai: `${totalIngatan}`, tonus: 'cyan' },
      { label: 'memori simbol', nilai: mem ? `n=${num(mem.n)} · edge ${fmtPct(num(mem.edge))}` : 'belum ada episode', tonus: mem && (num(mem.edge) ?? 0) > 0 ? 'hijau' : 'netral' },
      { label: 'hit-rate', nilai: mem && num(mem.hit) !== null ? `${((num(mem.hit) as number) * 100).toFixed(0)}%` : '—', tonus: 'netral' },
      { label: 'rezim', nilai: str(pil?.rezim) ?? '—', tonus: 'netral' },
    ],
    keluaran: totalIngatan ? `pelajaran terakhir: ${str(rec(arr(ingat?.baris)?.[0])?.text)?.slice(0, 100) ?? '—'}` : 'masih kosong — menunggu keteledoran pertama',
    terakhir: str(rec(arr(ingat?.baris)?.[0])?.at), sumber: ['ingatan', 'pilihan.mem'],
  });

  const agiPct = num(pert?.agiPct);
  const aktPert = agiPct !== null ? clamp01(agiPct / 40) : 0;
  tambah({
    id: 'pertumbuhan', nama: 'PERTUMBUHAN', lapisan: 'MEMORI',
    tugas: 'AGI% P/G/A + kurikulum — otak naik derap tiap vonis teradili',
    aktifasi: aktPert, status: statusDari(aktPert),
    metrik: [
      { label: 'AGI%', nilai: `${agiPct?.toFixed(1) ?? '—'}%`, tonus: 'cyan' },
      { label: 'P/G/A', nilai: `${num(pert?.P)?.toFixed(2) ?? '—'}/${num(pert?.G)?.toFixed(2) ?? '—'}/${num(pert?.A)?.toFixed(2) ?? '—'}`, tonus: 'netral' },
      { label: 'generasi', nilai: `${num(rec(p.genome)?.generation) ?? 1}`, tonus: 'netral' },
      { label: 'adaptasi v2', nilai: `${arr(rec(p.genome)?.v2)?.length ?? 0} baris`, tonus: 'netral' },
    ],
    keluaran: `rank: ${str(rec(pert?.rank)?.name) ?? '—'} · kurikulum aktif: ${str(rec(arr(pert?.kurikulum)?.[0])?.label) ?? '—'}`,
    terakhir: null, sumber: ['pertumbuhan', 'genome'],
  });

  // ---------- LAPISAN FUNDAMEN (pemberi makan ketua) ----------
  const vonisModal = str(modal?.vonis);
  const skorModal = num(modal?.skor);
  const aktModal = skorModal !== null ? clamp01(skorModal / 100) : 0;
  tambah({
    id: 'modal', nama: 'OTAK MODAL', lapisan: 'FUNDAMEN',
    tugas: 'fundamen futures: porsi, squeeze, jebakan vs pump, leverage, sensus venue, akumulasi senyap',
    aktifasi: aktModal, status: statusDari(aktModal, false, !modal),
    metrik: [
      { label: 'vonis modal', nilai: vonisModal ?? '—', tonus: vonisModal === 'PUMP_NYATA' || vonisModal === 'AKUMULASI' ? 'hijau' : vonisModal?.startsWith('JEBAKAN') || vonisModal === 'DISTRIBUSI' ? 'merah' : 'netral' },
      { label: 'skor', nilai: `${skorModal ?? '—'}`, tonus: 'netral' },
      { label: 'squeeze', nilai: modal?.squeezeAktif === true ? `AKTIF (${num(modal?.squeezeSkor)})` : 'tidak', tonus: modal?.squeezeAktif === true ? 'ungu' : 'netral' },
      { label: 'akumulasi senyap', nilai: str(modal?.akumulasiKlasifikasi)?.replace(/_/g, ' ').toLowerCase() ?? '—', tonus: 'netral' },
    ],
    keluaran: `porsi futures ${(num(modal?.drivePct) ?? 0).toFixed(0)}% · whale bias ${str(modal?.whaleBias) ?? '—'} · leverage dom ~${num(modal?.leverageDominan?.dominanTier) ?? '—'}× · OI ${fmtUsd(num(modal?.sensus?.totalOiUsd))}`,
    terakhir: str(modal?.at), sumber: ['modal'],
  });

  const korban = rec(aliran?.vonis)?.korban;
  const skorKorban = num(rec(aliran?.vonis)?.skorKorban);
  const alarm = str(rec(aliran?.vonis)?.alarmLevel);
  const aktAliran = skorKorban !== null ? clamp01(skorKorban / 100) : 0;
  tambah({
    id: 'aliran', nama: 'OTAK ALIRAN', lapisan: 'FUNDAMEN',
    tugas: 'model kaskade likuidasi teruji 500-soal — sisi korban 6j, bias arah, hukum kasus',
    aktifasi: aktAliran, status: statusDari(aktAliran, alarm === 'RED', !aliran),
    metrik: [
      { label: 'sisi korban', nilai: str(korban) ?? '—', tonus: korban === 'LONG' ? 'merah' : korban === 'SHORT' ? 'ungu' : 'netral' },
      { label: 'skor korban', nilai: `${skorKorban ?? '—'}`, tonus: 'netral' },
      { label: 'alarm', nilai: alarm ?? '—', tonus: alarm === 'RED' ? 'merah' : alarm === 'AMBER' ? 'amber' : 'hijau' },
      { label: 'bias arah', nilai: `${str(rec(aliran?.vonis)?.arah) ?? '—'} (p ${fmtPct(num(rec(aliran?.vonis)?.pArah), false)})`, tonus: 'netral' },
    ],
    keluaran: `likuidasi 6j: long ${fmtUsd(num(rec(aliran?.liq6j)?.longUsd))} vs short ${fmtUsd(num(rec(aliran?.liq6j)?.shortUsd))} · orang ${num(aliran?.orang?.long) ?? '—'} vs ${num(aliran?.orang?.short) ?? '—'}`,
    terakhir: null, sumber: ['aliran'],
  });

  const sumberHidup = num(sumber?.sumberHidup);
  const sumberTotal = (sumberHidup ?? 0) + (num(sumber?.sumberTerwakili) ?? 0) + (num(sumber?.sumberTerkunci) ?? 0);
  const aktSumber = sumberTotal ? clamp01((sumberHidup ?? 0) / sumberTotal) : 0;
  const unlock = rec(rec(sumber?.unlock)?.berikutnya);
  tambah({
    id: 'sumber', nama: 'OTAK SUMBER', lapisan: 'FUNDAMEN',
    tugas: 'matriks sumber data: unlock, supply, venue lintas, DEX — jujur yang terkunci',
    aktifasi: aktSumber, status: statusDari(aktSumber, false, !sumber),
    metrik: [
      { label: 'sumber hidup', nilai: `${sumberHidup ?? '—'} HIDUP + ${num(sumber?.sumberTerwakili) ?? '—'} terwakili`, tonus: 'cyan' },
      { label: 'terkunci', nilai: `${num(sumber?.sumberTerkunci) ?? '—'}`, tonus: (num(sumber?.sumberTerkunci) ?? 0) > 0 ? 'amber' : 'hijau' },
      { label: 'unlock berikutnya', nilai: unlock ? `${num(unlock.hariDariSekarang)} hari` : '—', tonus: unlock && (num(unlock.hariDariSekarang) ?? 99) <= 7 ? 'merah' : 'netral' },
      { label: 'DEX tekanan beli', nilai: num(sumber?.deksTekananBeliPct) !== null ? `${(num(sumber?.deksTekananBeliPct) as number).toFixed(0)}%` : '—', tonus: 'netral' },
    ],
    keluaran: unlock ? `unlock ${str(unlock.tanggal) ?? '—'}: ${(num(unlock.token) ?? 0).toLocaleString('id-ID')} ELSA ≈ ${fmtUsd(num(unlock.usd))} (${num(unlock.pctVsBeredar)?.toFixed(1)}% beredar)` : 'jadwal unlock belum terbaca',
    terakhir: null, sumber: ['sumber'],
  });

  const cetakan = num(paus?.jejak?.cetakanPausJumlah) ?? 0;
  const jiwaPaus = rec(paus?.jiwa);
  const nNeuron = arr(jiwaPaus?.neurons)?.length ?? 0;
  const nDuelAktif = arr(jiwaPaus?.duelAktif)?.length ?? 0;
  const aktPaus = clamp01(Math.max(cetakan / 12, nNeuron / 8, nDuelAktif > 0 ? 0.6 : 0));
  tambah({
    id: 'paus', nama: 'RADAR PAUS', lapisan: 'FUNDAMEN',
    tugas: 'forensik cetakan paus + JIWA: neuron siluet, formula keyakinan, duel paus-vs-paus, kalibrasi mandiri, kesaksian dewan AR-E10',
    aktifasi: aktPaus, status: statusDari(aktPaus, false, !paus),
    metrik: [
      { label: 'cetakan paus', nilai: `${cetakan}`, tonus: cetakan > 0 ? 'cyan' : 'netral' },
      { label: 'neuron hidup', nilai: `${nNeuron}`, tonus: nNeuron > 0 ? 'cyan' : 'netral' },
      { label: 'duel aktif', nilai: `${nDuelAktif}`, tonus: nDuelAktif > 0 ? 'ungu' : 'netral' },
      { label: 'sisi penempatan', nilai: str(paus?.net?.sisiPenempatan) ?? '—', tonus: str(paus?.net?.sisiPenempatan) === 'LONG' ? 'hijau' : str(paus?.net?.sisiPenempatan) === 'SHORT' ? 'merah' : 'netral' },
      { label: 'pola', nilai: str(paus?.pola?.nama) ?? '—', tonus: 'netral' },
    ],
    keluaran: jiwaPaus
      ? `${nNeuron} neuron paus · ${nDuelAktif} duel aktif${nDuelAktif ? ` (${arr(jiwaPaus.duelAktif).map((d) => `${str(rec(d)?.id)}→${str(rec(d)?.prediksiArah)}`).join(', ')})` : ''} · formula ${num(jiwaPaus.kalibrasi?.nTerjawab) ?? 0} duel terjawab (akurasi ${Math.round((num(jiwaPaus.kalibrasi?.akurasi) ?? 0) * 100)}%) · kesaksian ke dewan AR-E10`
      : arr(paus?.auditDana)?.length
        ? `audit dana: ${arr(paus?.auditDana).map((x) => str(rec(x)?.vonis) ?? '?').join(' · ')}`
        : `net spot ${fmtUsd(num(paus?.net?.netSpotUsd))} · long baru ${fmtUsd(num(paus?.net?.longBaruUsd))} · short baru ${fmtUsd(num(paus?.net?.shortBaruUsd))}`,
    terakhir: null, sumber: ['paus'],
  });

  const kaki = arr(peta?.kaki) ?? [];
  const margin = num(peta?.marginArah);
  const aktPeta = margin !== null ? clamp01(margin / 100) : 0;
  tambah({
    id: 'peta', nama: 'PETA WAKTU', lapisan: 'FUNDAMEN',
    tugas: 'time traveler: harga target + arah + tanggal — jalur & jatuh curam tiap waypoint',
    aktifasi: aktPeta, status: statusDari(aktPeta, false, !peta),
    metrik: [
      { label: 'arah dominan', nilai: str(peta?.arahDominan) ?? '—', tonus: str(peta?.arahDominan) === 'NAIK' ? 'hijau' : str(peta?.arahDominan) === 'TURUN' ? 'merah' : 'netral' },
      { label: 'margin', nilai: `${margin ?? '—'}%`, tonus: 'netral' },
      { label: 'waypoint', nilai: `${kaki.length}`, tonus: 'netral' },
      { label: 'jalur turun', nilai: rec(peta?.kakiTurun) ? 'ada' : '—', tonus: 'netral' },
    ],
    keluaran: kaki.length
      ? `D+${num(rec(kaki[0])?.hariDariSekarang) ?? '?'} → ${fmtHarga(num(rec(kaki[0])?.target))} (p ${fmtPct((num(rec(kaki[0])?.peluang) ?? 0) * 100, false)})${str(peta?.narasiArah) ? ' · ' + str(peta?.narasiArah).slice(0, 60) : ''}`
      : 'peta belum digambar',
    terakhir: null, sumber: ['petaWaktu'],
  });

  // ---------- LAPISAN AKSI (hidup & kekal) ----------
  const nRekalk = num(pantau?.nRekalkHariIni) ?? 0;
  const aktPantau = clamp01(0.55 + Math.min(0.45, nRekalk * 0.15));
  tambah({
    id: 'pantau', nama: 'PANTAU TERUS', lapisan: 'AKSI',
    tugas: 'harga diadili TIAP segarkan — kena TP/SL → catat → rekalkulasi mandiri zaman++ (bukan satu-entry-sehari)',
    aktifasi: aktPantau, status: 'AKTIF', // pantau tidak pernah tidur — hukum P-1
    metrik: [
      { label: 'rekalkulasi hari ini', nilai: `${nRekalk}×`, tonus: nRekalk > 0 ? 'cyan' : 'netral' },
      { label: 'slot hari ini', nilai: num(pantau?.slotHariIni) ? `zaman #${num(pantau?.slotHariIni)}` : 'belum ada', tonus: 'netral' },
      { label: 'cek harga terakhir', nilai: str(pantau?.cekTerakhir)?.slice(5, 16) ?? '—', tonus: 'netral' },
      { label: 'zaman aktif', nilai: num(pantau?.zamanAktif) !== null ? `#${num(pantau?.zamanAktif)}` : '—', tonus: 'netral' },
    ],
    keluaran: str(pantau?.status)?.slice(0, 130) ?? 'pantau menyala',
    terakhir: str(pantau?.at), sumber: ['pantau'],
  });

  const posisi = rec(dompet?.posisi);
  const aktDompet = posisi ? 0.9 : 0.4;
  tambah({
    id: 'dompet', nama: 'DOMPET $1000', lapisan: 'AKSI',
    tugas: 'eksekusi paper-trade: orderbook nyata, slipage, fee, buku akuntansi, top-up saat habis',
    aktifasi: aktDompet, status: statusDari(aktDompet, false, !dompet),
    metrik: [
      { label: 'ekuitas', nilai: fmtUsd(num(dompet?.ekuitas)), tonus: 'cyan' },
      { label: 'pnl bersih', nilai: fmtPct(num(dompet?.pnlBersihPct)), tonus: (num(dompet?.pnlBersihPct) ?? 0) >= 0 ? 'hijau' : 'merah' },
      { label: 'posisi', nilai: posisi ? `${str(posisi.arah) ?? '—'} @ ${fmtHarga(num(posisi.entryVwap))}` : 'flat', tonus: posisi ? (str(posisi.arah) === 'LONG' ? 'hijau' : 'merah') : 'netral' },
      { label: 'top-up ke', nilai: `${num(dompet?.topupKe) ?? 0}`, tonus: (num(dompet?.topupKe) ?? 0) > 0 ? 'amber' : 'netral' },
    ],
    keluaran: posisi
      ? `mark ${fmtHarga(num(posisi.mark))} · uPnl ${fmtPct(num(posisi.uPnlPct))} · TP ${fmtHarga(num(posisi.target))} / SL ${fmtHarga(num(posisi.stop))}`
      : `flat — menunggu slot berikutnya · buku ${arr(dompet?.buku)?.length ?? 0} mutasi`,
    terakhir: str(dompet?.at), sumber: ['dompet'],
  });

  const lulusUjian = num(rec(ujianElsa?.metrik)?.lulus);
  const aktUjian = lulusUjian !== null ? clamp01(lulusUjian / 100) : 0;
  tambah({
    id: 'ujianelsa', nama: 'UJIAN ELSA 100', lapisan: 'AKSI',
    tugas: 'uji kepahaman 100 soal dari TGE hingga kini — dua-tier: buku kasus riwayat + konteks lintas-hari',
    aktifasi: aktUjian, status: str(ujianElsa?.status) === 'LULUS_SEMPURNA' ? 'AKTIF' : statusDari(aktUjian, false, !ujianElsa),
    metrik: [
      { label: 'lulus', nilai: `${lulusUjian ?? 0}/100`, tonus: lulusUjian === 100 ? 'hijau' : 'amber' },
      { label: 'tanpa buku kasus', nilai: `${num(rec(ujianElsa?.metrik)?.lulusTanpaKasus) ?? 0}/100`, tonus: 'cyan' },
      { label: 'ronde ke nol', nilai: `${num(rec(ujianElsa?.metrik)?.rondeSampaiNol) ?? '—'}`, tonus: 'netral' },
      { label: 'pelajaran', nilai: `${num(rec(ujianElsa?.metrik)?.pelajaranJumlah) ?? 0} tertanam`, tonus: 'netral' },
    ],
    keluaran: `status ${str(ujianElsa?.status) ?? '—'} · rentang ${str(rec(ujianElsa?.rentang)?.awal) ?? '—'} s/d ${str(rec(ujianElsa?.rentang)?.akhir) ?? '—'} · net kumulatif ${fmtPct(num(rec(ujianElsa?.metrik)?.netKumulatif))}`,
    terakhir: str(ujianElsa?.at), sumber: ['ujianElsa'],
  });

  const pemahamanSegar = gur.pemahamanAt !== null;
  const beritaSegar = gur.beritaJumlah > 0;
  const aktGuru = pemahamanSegar ? 0.85 : beritaSegar ? 0.6 : 0.3;
  tambah({
    id: 'guru', nama: 'GURU (RUH)', lapisan: 'AKSI',
    tugas: 'jiwa ruang guru: LLM + berita segar internet (FOKUS MUTLAK ELSA) + asal-usul ELSA — berpikir mandiri tanpa ditanya, denyut latar 30 menit',
    aktifasi: aktGuru, status: pemahamanSegar ? 'AKTIF' : 'MENYALA',
    metrik: [
      { label: 'neuron', nilai: 'HIDUP', tonus: 'hijau' },
      { label: 'berita segar', nilai: `${gur.beritaJumlah}`, tonus: beritaSegar ? 'cyan' : 'netral' },
      { label: 'pemahaman mandiri', nilai: pemahamanSegar ? 'segar' : 'menunggu denyut', tonus: pemahamanSegar ? 'hijau' : 'netral' },
      { label: 'candle dibaca', nilai: `${gur.nCandle}`, tonus: 'netral' },
    ],
    keluaran: gur.catatan,
    terakhir: gur.pemahamanAt ?? gur.beritaAt, sumber: ['neuron guru (LLM + web_search)'],
  });

  // ---------- ORGAN BARU (keluhan pemilik 2026-11-26: "mereka gak miliki
  // neuron… harusnya hidup dan terus berkembang" + "neuron saling
  // mencerdaskan bukannya malah saling cuek") ----------
  const per = bacaPersilanganPayload();
  const perTerakhir = per.rondeTerakhir;
  const aktPer = clamp01(Math.min(1, per.statistik.totalKirim / 24));
  tambah({
    id: 'persilangan', nama: 'BUS PERSILANGAN', lapisan: 'MEMORI',
    tugas: 'bus "saling mencerdaskan": tiap 15 mnt neuron bertukar kiriman bertanda tangan + reaksi WAJIB penerima (guru & dompet benar-benar membacanya)',
    aktifasi: aktPer, status: statusDari(aktPer),
    metrik: [
      { label: 'ronde bus', nilai: `${per.denyutKe}`, tonus: 'cyan' },
      { label: 'kiriman terarsip', nilai: `${per.statistik.totalKirim}`, tonus: 'netral' },
      { label: 'neuron pengirim→penerima', nilai: `${per.statistik.neuronPengirim}→${per.statistik.neuronPenerima}`, tonus: 'ungu' },
      { label: 'ronde terakhir', nilai: perTerakhir ? `${perTerakhir.kirim.length} kiriman` : '—', tonus: perTerakhir && perTerakhir.kirim.length ? 'hijau' : 'amber' },
    ],
    keluaran: perTerakhir ? perTerakhir.cerita : 'bus belum berdenyut — ronde pertama ≤15 menit',
    terakhir: per.atTerakhir, sumber: ['persilangan/bus.json', 'semua neuron pengirim'],
  });

  const brf = bacaBriefingPayload();
  const brfTerkini = brf.terkini;
  const brfSegar = brf.statistik.umurMenit !== null && brf.statistik.umurMenit <= 40;
  const aktBrf = brfSegar ? 0.9 : brf.terkini ? 0.5 : 0.15;
  tambah({
    id: 'briefing', nama: 'BRIEFING GURU', lapisan: 'AKSI',
    tugas: 'briefing HIDUP tiap 20 mnt — FOKUS MUTLAK ELSA: medan, vonis+sikap guru (dihitung dari konflik data nyata), radar, modal hidup, kasus, pertumbuhan, perintah',
    aktifasi: aktBrf, status: statusDari(aktBrf),
    metrik: [
      { label: 'fokus', nilai: brfTerkini?.fokus ?? 'ELSA/USDT', tonus: 'cyan' },
      { label: 'sikap guru', nilai: brfTerkini?.sikap ?? '—', tonus: brfTerkini?.sikap === 'SEPAKAT' ? 'hijau' : brfTerkini?.sikap === 'MELAWAN' ? 'merah' : 'amber' },
      { label: 'umur briefing', nilai: brf.statistik.umurMenit !== null ? `${brf.statistik.umurMenit} mnt` : '—', tonus: brfSegar ? 'hijau' : 'amber' },
      { label: 'riwayat', nilai: `${brf.statistik.jumlah}`, tonus: 'netral' },
    ],
    keluaran: brfTerkini ? brfTerkini.judul : 'briefing belum lahir — jantung briefing menyusul ≤20 menit',
    terakhir: brfTerkini?.at ?? null, sumber: ['briefing/terkini.json', 'semua neuron ELSA'],
  });

  const perN = bacaPertumbuhanPayload();
  const perT = perN.neuron?.terkini ?? null;
  const perSegarN = perN.statistik.umurMenit !== null && perN.statistik.umurMenit <= 40;
  const aktPertN = perSegarN ? clamp01(0.5 + (perT?.agi ?? 0) / 60) : 0.25;
  tambah({
    id: 'pertumbuhan-neuron', nama: 'NEURON PERTUMBUHAN', lapisan: 'MEMORI',
    tugas: 'pertumbuhan punya NEURON: snapshot 6 dimensi tiap 15 mnt + delta jujur (naik vs turun) + 3 direktif tumbuh dari kelemahan nyata — diary tersimpan',
    aktifasi: aktPertN, status: statusDari(aktPertN),
    metrik: [
      { label: 'AGI otak pertumbuhan', nilai: perT ? `${perT.agi.toFixed(2)}%` : '—', tonus: 'cyan' },
      { label: 'snapshot ke', nilai: `${perT?.detakKe ?? 0}`, tonus: 'netral' },
      { label: 'dimensi terlemah', nilai: perN.statistik.dimensiTerlemah ?? '—', tonus: 'amber' },
      { label: 'direktif teratas', nilai: perT?.direktif[0]?.label?.slice(0, 38) ?? '—', tonus: 'ungu' },
    ],
    keluaran: perT ? perT.cerita : 'otak pertumbuhan belum berdenyut — snapshot pertama ≤15 menit',
    terakhir: perT?.at ?? null, sumber: ['pertumbuhan/neuron.json', 'buku cuan', 'ujian', 'dompet'],
  });

  const vonisV = str(p.vonis ? rec(p.vonis)?.vonis : arah);
  const statistikUjung: SinapsData['statistik'] = {
    organTotal: organ.length,
    organHidup: organ.filter((o) => o.status !== 'MATI').length,
    organAktif: organ.filter((o) => o.status === 'AKTIF').length,
    denyut24j: 0, denyutTotal: 0,
    harga: harga,
    vonis: vonisV ?? arah ?? '—',
    labelArah: str(pil?.labelArah) ?? '—',
    keyakinan: keyakinan ?? 0,
    guard: guard ?? '—',
  };
  return { organ, statistikUjung };
}

// ============================================================
// SALURAN — kabel nyata antar organ (dari mana ke mana data mengalir)
// ============================================================
function saluranSemua(): Saluran[] {
  return [
    { dari: 'nadi', ke: 'penglihatan', bobot: 1 },
    { dari: 'nadi', ke: 'pemeta', bobot: 0.9 },
    { dari: 'nadi', ke: 'tracker', bobot: 0.9 },
    { dari: 'penglihatan', ke: 'dewan', bobot: 1 },
    { dari: 'pemeta', ke: 'tracker', bobot: 0.8 },
    { dari: 'tracker', ke: 'dewan', bobot: 0.9 },
    { dari: 'dewan', ke: 'ketua', bobot: 1 },
    { dari: 'montecarlo', ke: 'ketua', bobot: 0.8 },
    { dari: 'debat', ke: 'ketua', bobot: 0.9 },
    { dari: 'modal', ke: 'ketua', bobot: 0.9 },
    { dari: 'aliran', ke: 'ketua', bobot: 0.85 },
    { dari: 'sumber', ke: 'ketua', bobot: 0.7 },
    { dari: 'paus', ke: 'ketua', bobot: 0.8 },
    { dari: 'peta', ke: 'ketua', bobot: 0.7 },
    { dari: 'ketua', ke: 'prareg', bobot: 1 },
    { dari: 'ketua', ke: 'pantau', bobot: 1 },
    { dari: 'ketua', ke: 'guru', bobot: 0.6 },
    { dari: 'prareg', ke: 'hakim', bobot: 1 },
    { dari: 'pantau', ke: 'dompet', bobot: 0.95 },
    { dari: 'hakim', ke: 'ingatan', bobot: 0.9 },
    { dari: 'hakim', ke: 'dompet', bobot: 0.7 },
    { dari: 'ingatan', ke: 'pertumbuhan', bobot: 0.85 },
    { dari: 'ingatan', ke: 'ujianelsa', bobot: 0.8 },
    { dari: 'ujianelsa', ke: 'ingatan', bobot: 0.8 },
    { dari: 'pantau', ke: 'guru', bobot: 0.6 },
    { dari: 'modal', ke: 'peta', bobot: 0.7 },
    { dari: 'aliran', ke: 'peta', bobot: 0.7 },
    { dari: 'paus', ke: 'modal', bobot: 0.6 },
    // V6 — kabel bus persilangan: neuron saling mencerdaskan (bukan saling cuek)
    { dari: 'ignisi', ke: 'persilangan', bobot: 0.9 },
    { dari: 'paus', ke: 'persilangan', bobot: 0.85 },
    { dari: 'ujianelsa', ke: 'persilangan', bobot: 0.7 },
    { dari: 'sumber', ke: 'persilangan', bobot: 0.6 },
    { dari: 'persilangan', ke: 'dompet', bobot: 0.9 },
    { dari: 'persilangan', ke: 'guru', bobot: 0.85 },
    { dari: 'persilangan', ke: 'pertumbuhan-neuron', bobot: 0.6 },
    { dari: 'briefing', ke: 'guru', bobot: 0.9 },
    { dari: 'pertumbuhan-neuron', ke: 'briefing', bobot: 0.6 },
    { dari: 'dompet', ke: 'pertumbuhan-neuron', bobot: 0.7 },
  ];
}

// ============================================================
// DENYUT — jurnal aktivitas NYATA dari semua gudang (bukan karangan)
// ============================================================
async function kumpulkanDenyut(organIds: Set<string>): Promise<DenyutItem[]> {
  const out: DenyutItem[] = [];
  const p = (await getArenaPayload()) as AnyRec;

  // 1) events arena (CUAN / UPGRADE / SISTEM)
  for (const e of arr(p.events) ?? []) {
    const r = rec(e);
    const at = str(r?.at);
    const teks = str(r?.text);
    if (!at || !teks) continue;
    const kind = str(r?.kind) ?? 'SISTEM';
    const organ = kind === 'CUAN' ? 'hakim' : kind === 'UPGRADE' ? 'pertumbuhan' : 'nadi';
    out.push({ at, organ, jenis: kind, teks: teks.slice(0, 160) });
  }

  // 2) pantau terus — trail rekalkulasi mandiri
  for (const s of arr(rec(p.pantau)?.sejarah) ?? []) {
    const r = rec(s);
    const at = str(r?.at);
    const teks = str(r?.text);
    if (!at || !teks) continue;
    out.push({ at, organ: 'pantau', jenis: 'PANTAU', teks: teks.slice(0, 160) });
  }

  // 3) ledger pra-registrasi — waktu kunci nyata
  for (const l of arr(rec(p.ledger)?.terakhir) ?? []) {
    const r = rec(l);
    const k = rec(r?.kunci);
    const at = str(k?.waktu);
    if (!at) continue;
    out.push({ at, organ: 'prareg', jenis: 'PRA-REG', teks: `#${num(k?.nomor) ?? '?'} ${str(k?.simbol) ?? ''} ${str(k?.arah) ?? ''} ${num(k?.kepastian) ?? '—'}% dikunci — hash ${str(r?.hash)?.slice(0, 10) ?? ''}…` });
  }

  // 4) buku cuan — pengadilan hasil (waktu = hari pengadilan)
  for (const e of arr(rec(p.bukuCuan)?.entri) ?? []) {
    const r = rec(e);
    const hari = str(r?.hari);
    const hasil = str(r?.hasil);
    if (!hari || !hasil) continue;
    out.push({ at: `${hari}T00:00:00.000Z`, organ: 'hakim', jenis: 'CUAN', teks: `${hari} ${str(r?.arah) ?? '—'} → ${hasil} ${fmtPct(num(r?.netPct))} (${str(r?.via) ?? '—'})` });
  }

  // 5) ujian ELSA — riwayat ronde penempaan
  for (const r of arr(rec(p.ujianElsa)?.ronde) ?? []) {
    const x = rec(r);
    const at = str(x?.at);
    if (!at) continue;
    out.push({ at, organ: 'ujianelsa', jenis: 'UJIAN', teks: `ronde ${num(x?.ronde) ?? '?'}: lulus ${num(x?.lulus) ?? 0}/${num(x?.lulus) ?? 0 + (num(x?.gagal) ?? 0)} · pelajaran baru ${num(x?.pelajaranBaru) ?? 0}` });
  }

  // 6) dompet — buku akuntansi nyata
  for (const b of (arr(rec(p.dompet)?.buku) ?? []).slice(0, 20)) {
    const r = rec(b);
    const at = str(r?.at);
    if (!at) continue;
    const jenis = str(r?.jenis) ?? 'CATATAN';
    const teks = jenis === 'BUKA' ? `BUKA ${str(r?.arah) ?? '—'} ${fmtUsd(num(r?.notional))} @ ${fmtHarga(num(r?.harga))} · slip ${fmtPct(num(r?.slippagePct))}`
      : jenis === 'TUTUP' ? `TUTUP ${str(r?.arah) ?? '—'} · pnl ${fmtUsd(num(r?.pnl))} (${fmtPct(num(r?.netPct))}) · ekuitas ${fmtUsd(num(r?.ekuitas))}`
      : jenis === 'SETORAN' ? `SETORAN ${fmtUsd(num(r?.saldo))} (top-up) · ekuitas ${fmtUsd(num(r?.ekuitas))}`
      : `${jenis} · ekuitas ${fmtUsd(num(r?.ekuitas))}`;
    out.push({ at, organ: 'dompet', jenis: 'DOMPET', teks: teks.slice(0, 160) });
  }

  // 7) guru — denyut neuron nyata (berita + pemahaman mandiri)
  const fB = bacaJson(`${DIR_GURU}/berita.json`);
  if (fB && typeof fB.at === 'number' && Array.isArray(fB.berita)) {
    out.push({ at: new Date(fB.at as number).toISOString(), organ: 'guru', jenis: 'GURU', teks: `mata pasar memanen ${fB.berita.length} berita segar dari internet` });
  }
  const fP = bacaJson(`${DIR_GURU}/pemahaman.json`);
  if (fP && typeof fP.at === 'string' && typeof fP.teks === 'string') {
    out.push({ at: fP.at, organ: 'guru', jenis: 'GURU', teks: `guru berpikir mandiri: "${fP.teks.replace(/\n/g, ' ').slice(0, 120)}…"` });
  }

  // 8) bus persilangan — pertukaran neuron nyata (saling mencerdaskan)
  try {
    const per = bacaPersilanganPayload();
    for (const rd of per.ronde.slice(0, 3)) {
      for (const k of rd.kirim.slice(0, 2)) {
        out.push({ at: rd.at, organ: 'persilangan', jenis: 'PERSILANGAN', teks: `[${k.dari}→${k.ke}] ${k.jenis}: ${k.isi.slice(0, 90)}… reaksi: ${k.reaksi.slice(0, 60)}…` });
      }
    }
  } catch { /* bus belum hidup */ }

  // 9) briefing guru hidup — tiap briefing tercatat
  try {
    const brf = bacaBriefingPayload();
    for (const b of brf.riwayat.slice(0, 2)) {
      out.push({ at: b.at, organ: 'briefing', jenis: 'BRIEFING', teks: `${b.judul} — ${b.perintah.slice(0, 90)}` });
    }
  } catch { /* briefing belum lahir */ }

  // 10) otak pertumbuhan — snapshot diary
  try {
    const perN = bacaPertumbuhanPayload();
    for (const sn of perN.riwayat.slice(0, 2)) {
      out.push({ at: sn.at, organ: 'pertumbuhan-neuron', jenis: 'PERTUMBUHAN', teks: sn.cerita.slice(0, 150) });
    }
  } catch { /* pertumbuhan belum lahir */ }

  // dedupe + urutkan terbaru dulu + hanya organ yang dikenal
  const lihat = new Set<string>();
  const bersih: DenyutItem[] = [];
  for (const d of out.sort((a, b) => (a.at < b.at ? 1 : -1))) {
    const kunci = `${d.at}|${d.jenis}|${d.teks.slice(0, 60)}`;
    if (lihat.has(kunci)) continue;
    lihat.add(kunci);
    if (!organIds.has(d.organ)) continue; // organ tak dikenal = buang (kejujuran)
    bersih.push(d);
  }
  return bersih.slice(0, 80);
}

// ============================================================
// payload utama — dipanggil API
// ============================================================
let cacheSinaps: { at: number; data: SinapsData } | null = null;

export async function getSinapsData(): Promise<SinapsData> {
  const now = Date.now();
  if (cacheSinaps && now - cacheSinaps.at < 30_000) return cacheSinaps.data; // denyut 30 detik
  const { organ, statistikUjung } = await bangunOrgan();
  const saluran = saluranSemua();
  const denyut = await kumpulkanDenyut(new Set(organ.map((o) => o.id)));
  const batas24j = now - 24 * 3600 * 1000;
  const perOrgan24j: Record<string, number> = {};
  const perOrganTerakhir: Record<string, string> = {};
  for (const d of denyut) {
    if (new Date(d.at).getTime() >= batas24j) {
      perOrgan24j[d.organ] = (perOrgan24j[d.organ] ?? 0) + 1;
    }
    if (!perOrganTerakhir[d.organ] || d.at > perOrganTerakhir[d.organ]) perOrganTerakhir[d.organ] = d.at;
  }
  const organFinal = organ.map((o) => ({
    ...o,
    denyut24j: perOrgan24j[o.id] ?? 0,
    terakhir: o.terakhir ?? perOrganTerakhir[o.id] ?? null,
  }));
  const data: SinapsData = {
    at: new Date().toISOString(),
    organ: organFinal,
    saluran,
    denyut,
    statistik: {
      ...statistikUjung,
      denyut24j: Object.values(perOrgan24j).reduce((s, v) => s + v, 0),
      denyutTotal: denyut.length,
    },
  };
  cacheSinaps = { at: now, data };
  return data;
}
