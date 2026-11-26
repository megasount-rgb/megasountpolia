// ============================================================
// MICAPROFITA-ELSA · OTAK LINTASAN — pembaca pola urutan magnet.
// (keluhan pemilik 2026-11-25): "formulanya seolah mentah — harusnya
//  bisa paham targetnya justru akan diarahkan ke mana. Magnet ada
//  kesekian, tapi mana DULU yang akan ditarik? Akankah kesana lalu
//  turunkan, atau dari sana naik lagi, atau malah turun? harusnya
//  kita TAHU, bukan justru masih bertanya 'hmm naik turun ya'.
//  Kita masih terasa seperti BAYI, bukan sistem neuron yang nyata,
//  karena paham bisa membaca SUATU POLA."
// Diagnosa jujur: peta-waktu mengurutkan waypoint pakai JARAK
//   terdekat dulu (mentah), dan modal-jiwa hanya menghakimi SATU
//   magnet portal satu-satu. Tidak ada otak yang menjawab URUTAN
//   dan BENTUK LINTASAN (naik-dulu-lalu-turun? turun-dulu-lalu-naik?)
// v1 memasang EMPAT organ:
//   1. FORMULA TARIKAN (terbuka) — tiap magnet dinilai daya tariknya,
//      bukan jaraknya saja:
//        T = 100×(0.26·kerapatanKorban + 0.22·gravitasi(jarak)
//              + 0.16·arahBensin + 0.12·sisiSesak + 0.10·arahOI
//              + 0.08·posisiWhale + 0.06·usiaDinding)
//      URUTAN M1→M2→… = sort TARIKAN lintas DUA sisi. M1 = magnet
//      yang paling dulu DITARIK — dengan rantai bukti per komponen.
//   2. POLA LINTASAN BERNAMA (pola yang bisa dibaca & dibuktikan
//      salah) — dari M1 + keadaan bensin/whale/funding:
//        SAPU-NAIK-LALU-ANTUK      (sentuh atas → bensin habis → antuk)
//        SISIR-NAIK-BERANTAI       (kaskade magnet atas, bensin padat)
//        SAPU-TURUN-LALU-REBOUND   (sentuh bawah → akumulasi menampung → mantul)
//        JATUH-BERANTAI            (kaskade magnet bawah, korban long beruntun)
//        GANTUNG-DUA-SISI          (tarikan dua sisi hampir sama — whip)
//      tiap pola = PREDIKSI DUA-KAKI yang bisa diadili candle 1j:
//      KAKI-1 urutan (M1 tersentuh SEBELUM magnet lawan), KAKI-2
//      lanjutan (ke M2 berantai / antuk ke level balik / rebound).
//   3. KEYAKINAN TERBUKA + KALIBRASI — tiap prediksi lahir dengan
//      formula keyakinan terbuka:
//        K = clamp(0.25 + 0.20·marginTarikan + 0.18·konsistensi
//                  + 0.15·akurasiPola + 0.12·buktiNyata
//                  + 0.10·kesegaran, 0.05, 0.92)
//      dan DIJAWAB candle 1j nyata: DITEPATI / GAGAL / URUT_SALAH /
//      MELEWAT (konservatif). Janji urutan yang tak terwujud = salah.
//   4. NEURON KEPAHAMAN PER POLA — n/benar/akurasi tiap pola tumbuh;
//      pola yang sering salah DIDISKON dari keyakinan baru dan dari
//      suara dewan. Kesaksian lintasan duduk di kursi AR-E12.
// Hukum jujur: urutan salah = SALAH penuh; MELEWAT dihitung salah;
//   pola muda (<4 sampel) tidak boleh memodulasi; magnet mentah
//   (belum pernah diuji harga) lebih kuat dari dinding bekas gigit.
// ============================================================
import fs from 'fs';
import type { Candle } from './indicators';
import { ema } from './indicators';
import type { Magnet } from './peta-waktu';

const DIR_LINTASAN = '/home/z/my-project/db/elsa/lintasan';
const FILE_STATE = `${DIR_LINTASAN}/neuron.json`;
const JAM = 3_600_000;
const CAP_TERBUKA = 6;
const CAP_SELESAI = 60;
const CAP_DIARY = 40;
const POLA_MIN = 4; // akurasi pola baru boleh memodulasi setelah ≥4 sampel

export type SisiMagnet = 'ATAS' | 'BAWAH';

export type MagnetBerat = {
  harga: number; jenis: string; sisi: SisiMagnet; usd: number;
  jarakPct: number; tarikan: number;
  komponen: { kerapatan: number; gravitasi: number; arahBensin: number; sisiSesak: number; arahOI: number; whale: number; usiaDinding: number };
  bukti: string[]; narasi: string;
};

export type PolaLintasan = {
  pola: string; judul: string; arahPertama: 'NAIK' | 'TURUN';
  marginTarikan: number;                       // tarikan M1 − tarikan lawan (poin)
  M1: { harga: number; jenis: string; sisi: SisiMagnet; tarikan: number; usd: number };
  lawan: { harga: number; jenis: string; tarikan: number } | null; // magnet sisi berlawanan terdekat (adil: kalau lawan kena dulu = urutan salah)
  lanjutan: { tipe: 'LANJUT_KE' | 'ANTUK_KE' | 'REBOUND_KE'; harga: number; label: string; dasar: string[] } | null;
  rantai: string[];                            // cerita pola — BUKAN "hmm naik turun"
  alasanTidakLain: string;                     // kenapa BUKAN pola lain
};

export type KeyakinanLintasan = {
  id: string; at: string; pola: string; arahPertama: 'NAIK' | 'TURUN';
  m1: { harga: number; jenis: string; sisi: SisiMagnet; tarikan: number };
  lawan: { harga: number; jenis: string } | null;
  lanjutan: { tipe: string; harga: number; label: string } | null;
  deadlineAt: string;
  keyakinan: number;
  komponen: { marginTarikan: number; konsistensi: number; akurasiPola: number; buktiNyata: number; kesegaran: number };
  dasar: string; aturan: string[];
  status: 'TERBUKA' | 'DITEPATI' | 'GAGAL' | 'URUT_SALAH' | 'MELEWAT';
  dijawabAt?: string; kaki1At?: string; hargaAkhir?: number; cerita?: string;
};

export type KesaksianLintasan = { dari: string; vote: 'NAIK' | 'TURUN' | 'NETRAL'; kekuatan: number; cara: string };

export type LintasanJiwa = {
  at: string; denyutKe: number;
  harga: number;
  urutan: MagnetBerat[];                       // M1..Mn — urutan DITARIK dulu
  tarikanAtas: number; tarikanBawah: number;
  pola: PolaLintasan | null;
  keyakinanTerbuka: KeyakinanLintasan[];
  keyakinanSelesai: KeyakinanLintasan[];
  kalibrasi: { nTerjawab: number; nBenar: number; akurasi: number };
  kepahaman: { kunci: string; judul: string; n: number; benar: number; akurasi: number }[];
  kesaksian: KesaksianLintasan[];
  diary: { at: string; teks: string }[];
  vitamin: { aktif: boolean; teks: string };
  jujur: string[];
};

export const POLA_DEFS: Record<string, string> = {
  'SAPU-NAIK-LALU-ANTUK': 'harga DITARIK ke magnet atas dulu, lalu bensin naik habis di situ — antuk turun ke level balik (sapu likuidasi dulu, baru markdown)',
  'SISIR-NAIK-BERANTAI': 'magnet atas beruntun padat — harga disisir naik dari M1 ke M2 (bensin short belum terbakar habis)',
  'SAPU-TURUN-LALU-REBOUND': 'harga DITARIK ke magnet bawah dulu (sapu long), lalu akumulasi menampung — rebound naik',
  'JATUH-BERANTAI': 'magnet bawah beruntun — jebol M1 lalu kaskade ke M2 (korban long di bawahnya menyesatkan harga)',
  'GANTUNG-DUA-SISI': 'tarikan dua sisi hampir sama kuat — harga mundur-maju (whip): sisi lebih kuat disentuh dulu lalu tertarik balik',
};

const ATURAN_DEFS: Record<string, string> = {
  'FUNDING-PANAS': 'funding ≥ 0,06%/interval — sisi long sesak, magnet bawah (sapu long) lebih dulu ditarik',
  'KERUMUNAN-SESAK': 'rasio akun long ≥ 58% — kerumunan satu arah adalah bensin magnet sisi lawannya',
  'WHALE-ANTI-KERUMUNAN': 'top-20 whale melawan kerumunan (Δtop ≥ 6%) — pemain besar menarik harga ke sisi korban',
  'SPOT-NEGATIF': 'netflow whale spot negatif — pump tanpa dana segar, antuk lebih cepat datang',
  'SPOT-POSITIF': 'netflow whale spot positif — dana segar menopang, rebound lebih berbobot',
  'OI-TUMBUH': 'OI 24j tumbuh — posisi baru nyata menambah bensin kaskade',
  'OI-SURUT': 'OI 24j surut — bensin penutupan; gerak lintasan rapuh',
  'AKUMULASI-SENYAP': 'akumulasi senyap spot terbaca — sapu bawah cenderung REBOUND, bukan jatuh berantai',
  'SQUEEZE-SKOR-TINGGI': 'skor squeeze tinggi — kejaran menutup posisi memaksa harga menyisir magnet atas',
  'MAGNET-MENTAH': 'magnet belum pernah diuji harga (likuiditas belum dipanen) — tarikan lebih kuat dari dinding bekas gigit',
  'BENSIN-TIPIS-DI-ATAS': 'sisa korban short di atas M1 tipis (<30%) — setelah M1 terbakar, dorongan naik habis → antuk',
  'KASKADE-KORBAN': 'model kaskade 500-soal menunjuk sisi korban — urutan magnet mengikuti jadwal likuidasi',
};

type ModalBaca = {
  likuidasi: { totalShortUsd: number; totalLongUsd: number; topShort: { harga: number; usd: number; jarakPct: number }[]; topLong: { harga: number; usd: number; jarakPct: number }[] } | null;
  funding: { sekarang: number };
  whaleTop: { klasifikasi: string };
  whale: { spotNet: number };
} | null;

export type MasukanLintasan = {
  harga: number;
  magnets: { atas: Magnet[]; bawah: Magnet[] };
  bensinNaik: number; bensinTurun: number;
  modal: ModalBaca;
  oiD24j: number | null; hargaDelta24j: number | null;
  orangRasioLong: number | null;
  squeezeSkor: number; squeezeAktif: boolean;
  akumulasiKlasifikasi: string | null;
  korbanKaskade: 'LONG' | 'SHORT' | null;
  ema21: number;
  candles1d: Candle[];
};

// ---------------- ingatan lintasan (bertahan restart) ----------------
type LintasanState = {
  v: 1; at: string; denyutKe: number; berikutId: number;
  terbuka: KeyakinanLintasan[]; selesai: KeyakinanLintasan[];
  kepahaman: Record<string, { n: number; benar: number }>;
  diary: { at: string; teks: string }[];
  tarikanTerakhir: { at: string; atas: number; bawah: number } | null;
};

function bacaState(): LintasanState {
  const def: LintasanState = {
    v: 1, at: '', denyutKe: 0, berikutId: 1,
    terbuka: [], selesai: [], kepahaman: {}, diary: [], tarikanTerakhir: null,
  };
  try {
    fs.mkdirSync(DIR_LINTASAN, { recursive: true });
    if (fs.existsSync(FILE_STATE)) {
      const j = JSON.parse(fs.readFileSync(FILE_STATE, 'utf8')) as Partial<LintasanState> & { v?: number };
      if (j && Array.isArray(j.terbuka)) {
        const campur = { ...def, ...j } as LintasanState;
        campur.kepahaman = campur.kepahaman ?? {};
        campur.diary = Array.isArray(campur.diary) ? campur.diary : [];
        campur.selesai = Array.isArray(campur.selesai) ? campur.selesai : [];
        campur.v = 1;
        return campur;
      }
    }
  } catch { /* ingatan rusak — mulai baru, jujur */ }
  return def;
}

function tulisState(st: LintasanState): void {
  try {
    fs.mkdirSync(DIR_LINTASAN, { recursive: true });
    fs.writeFileSync(FILE_STATE, JSON.stringify(st));
  } catch { /* gagal simpan — jiwa tetap hidup di memori proses */ }
}

function catat(st: LintasanState, teks: string): void {
  st.diary.unshift({ at: new Date().toISOString(), teks });
  if (st.diary.length > CAP_DIARY) st.diary.length = CAP_DIARY;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const log1p = (v: number) => Math.log1p(Math.max(0, v));
const fmtUsd = (v: number) => (v >= 1e6 ? `${(v / 1e6).toFixed(2)} jt` : v >= 1e3 ? `${(v / 1e3).toFixed(0)} rb` : `${Math.round(v)}`);

// usia dinding: berapa kali harga MENYENTUH level di 90 candle terakhir
// (untuk magnet likuidasi: sentuhan = likuiditas sudah dipanen sebagian)
function jumlahSentuhan(list: Magnet[], cs: Candle[], sisi: SisiMagnet): number {
  const win = cs.slice(-90);
  if (!win.length) return 0;
  let n = 0;
  for (const m of list) {
    for (const c of win) {
      if (sisi === 'ATAS' && c.h >= m.harga * 0.997) { n += 1; break; }
      if (sisi === 'BAWAH' && c.l <= m.harga * 1.003) { n += 1; break; }
    }
  }
  return n;
}

// ---------------- ORGAN 1 — FORMULA TARIKAN (terbuka) ----------------
function timbangTarikan(
  list: Magnet[], sisi: SisiMagnet, harga: number,
  m: MasukanLintasan, nSentuh: number,
): MagnetBerat[] {
  const totalBensin = m.bensinNaik + m.bensinTurun;
  const bensinSisi = sisi === 'ATAS' ? m.bensinNaik : m.bensinTurun;
  const bensinSisiPct = totalBensin > 0 ? bensinSisi / totalBensin : 0.5;
  // sisi sesak: funding positif → long membayar → magnet BAWAH kuat; negatif → magnet ATAS kuat
  const funding = m.modal?.funding.sekarang ?? 0;
  const sesakSisi = sisi === 'BAWAH'
    ? clamp((funding / 0.0009) * 0.6 + (m.orangRasioLong !== null ? (m.orangRasioLong - 0.5) * 2.4 : 0), 0, 1)
    : clamp((-funding / 0.0006) * 0.6 + (m.orangRasioLong !== null ? (0.5 - m.orangRasioLong) * 2.4 : 0), 0, 1);
  // arah OI: kombinasi ΔOI & Δharga (peta-waktu logika yang sama)
  let oiSisi = 0.3;
  if (m.oiD24j !== null) {
    const oiNaik = m.oiD24j > 0;
    const hargaNaik = (m.hargaDelta24j ?? 0) > 0;
    if (oiNaik && hargaNaik) oiSisi = sisi === 'ATAS' ? 1 : 0.15;
    else if (oiNaik && !hargaNaik) oiSisi = sisi === 'BAWAH' ? 1 : 0.15;
    else if (!oiNaik && hargaNaik) oiSisi = sisi === 'BAWAH' ? 0.6 : 0.35; // rally tanpa dana — rawan balik
    else oiSisi = sisi === 'ATAS' ? 0.6 : 0.35;
  }
  // whale: klasifikasi searah sisi
  const w = m.modal?.whaleTop.klasifikasi ?? null;
  const whaleSisi = sisi === 'ATAS'
    ? (w === 'PUMP_JUJUR' || w === 'MENGUMPULKAN' ? 0.9 : w === 'JEBAKAN' || w === 'WAR_POSISI' ? 0.1 : 0.4)
    : (w === 'JEBAKAN' || w === 'WAR_POSISI' ? 0.9 : w === 'PUMP_JUJUR' || w === 'MENGUMPULKAN' ? 0.1 : 0.4);
  // usia dinding: magnet MENTAH (0 sentuhan) = kuat; dinding bekas gigit melemah
  const usia = clamp(1 - nSentuh / 6, 0.15, 1);
  // korban kaskade 500-soal
  const kaskadeSisi = m.korbanKaskade
    ? (m.korbanKaskade === 'SHORT' ? (sisi === 'ATAS' ? 1 : 0.25) : (sisi === 'BAWAH' ? 1 : 0.25))
    : 0.4;

  return list.map((mg) => {
    const jarakPct = Math.abs(mg.harga / harga - 1) * 100;
    const kerapatan = clamp(log1p(mg.usd / 5e5) / 3, 0, 1);
    const gravitasi = clamp(1 - jarakPct / 12, 0, 1);
    const komponen = {
      kerapatan, gravitasi,
      arahBensin: bensinSisiPct,
      sisiSesak: sesakSisi,
      arahOI: oiSisi,
      whale: whaleSisi,
      usiaDinding: usia,
    };
    const W = { kerapatan: 0.26, gravitasi: 0.22, arahBensin: 0.16, sisiSesak: 0.12, arahOI: 0.10, whale: 0.08, usiaDinding: 0.06 };
    const tarikan = Math.round(100 * (W.kerapatan * kerapatan + W.gravitasi * gravitasi + W.arahBensin * bensinSisiPct
      + W.sisiSesak * sesakSisi + W.arahOI * oiSisi + W.whale * whaleSisi + W.usiaDinding * usia) * 10) / 10;
    const bukti: string[] = [
      `kerapatan korban ${fmtUsd(mg.usd)} di level ini → ${(kerapatan * 100).toFixed(0)}% (bobot 0.26)`,
      `jarak ${jarakPct.toFixed(2)}% → gravitasi ${(gravitasi * 100).toFixed(0)}% (bobot 0.22)`,
      `bensin ${sisi.toLowerCase()} ${bensinSisi}/${totalBensin} → ${(bensinSisiPct * 100).toFixed(0)}% (bobot 0.16)`,
      funding !== 0 || m.orangRasioLong !== null
        ? `sisi sesak: funding ${(funding * 100).toFixed(4)}%${m.orangRasioLong !== null ? ` · akun long ${(m.orangRasioLong * 100).toFixed(0)}%` : ''} → ${(sesakSisi * 100).toFixed(0)}% (bobot 0.12)`
        : `sisi sesak tak terbaca → default (bobot 0.12)`,
      `arah OI ${m.oiD24j !== null ? `${m.oiD24j > 0 ? '+' : ''}${m.oiD24j}% ΔOI (harga ${(m.hargaDelta24j ?? 0) > 0 ? '+' : ''}${m.hargaDelta24j ?? 0}%)` : 'tidak terbaca'} → ${(oiSisi * 100).toFixed(0)}% (bobot 0.10)`,
      `whale top-20 ${w ?? 'tidak terbaca'} → ${(whaleSisi * 100).toFixed(0)}% (bobot 0.08)`,
      `${nSentuh === 0 ? 'magnet MENTAH — belum pernah diuji harga 90 candle' : `sudah ${nSentuh}× disentuh 90 candle — dinding bekas gigit`} → ${(usia * 100).toFixed(0)}% (bobot 0.06)`,
      kaskadeSisi !== 0.4 ? `kaskade 500-soal korban ${m.korbanKaskade} → ${(kaskadeSisi * 100).toFixed(0)}% konteks` : `kaskade 500-soal netral → konteks tipis`,
    ];
    return {
      harga: mg.harga, jenis: mg.jenis, sisi, usd: mg.usd, jarakPct: Math.round(jarakPct * 100) / 100,
      tarikan, komponen, bukti, narasi: mg.narasi,
    };
  });
}

// ---------------- ORGAN 2 — POLA LINTASAN BERNAMA ----------------
function bacaPola(urutan: MagnetBerat[], m: MasukanLintasan): PolaLintasan | null {
  if (!urutan.length) return null;
  const atasMax = Math.max(...urutan.filter((u) => u.sisi === 'ATAS').map((u) => u.tarikan), 0);
  const bawahMax = Math.max(...urutan.filter((u) => u.sisi === 'BAWAH').map((u) => u.tarikan), 0);
  if (atasMax <= 0 || bawahMax <= 0) return null; // satu sisi kosong — bukan lintasan, cuma satu jalur
  const M1 = urutan[0];
  const sisiLawan: SisiMagnet = M1.sisi === 'ATAS' ? 'BAWAH' : 'ATAS';
  const lawanCand = urutan.filter((u) => u.sisi === sisiLawan).sort((a, b) => b.tarikan - a.tarikan)[0] ?? null;
  const marginTarikan = Math.round((atasMax - bawahMax) * 10) / 10;
  const funding = m.modal?.funding.sekarang ?? 0;
  const totalShort = m.modal?.likuidasi?.totalShortUsd ?? 0;
  const totalLong = m.modal?.likuidasi?.totalLongUsd ?? 0;
  const sisaFuelAtasM1 = M1.sisi === 'ATAS' && totalShort > 0
    ? (m.modal?.likuidasi?.topShort ?? []).filter((t) => t.harga > M1.harga).reduce((s, t) => s + t.usd, 0) / totalShort
    : 1;
  const sisaFuelBawahM1 = M1.sisi === 'BAWAH' && totalLong > 0
    ? (m.modal?.likuidasi?.topLong ?? []).filter((t) => t.harga < M1.harga).reduce((s, t) => s + t.usd, 0) / totalLong
    : 1;
  const akumAktif = !!m.akumulasiKlasifikasi && /AKUMULASI|SENYAP|TANDA/i.test(m.akumulasiKlasifikasi);
  const spotNet = m.modal?.whale.spotNet ?? 0;
  const wkl = m.modal?.whaleTop.klasifikasi ?? '';
  const emaBalik = m.ema21 > 0 ? m.ema21 : M1.harga;

  // GANTUNG-DUA-SISI: tarikan dua sisi nyaris sama
  if (Math.abs(marginTarikan) <= 8) {
    const lawan = lawanCand!;
    const balik = M1.sisi === 'ATAS'
      ? urutan.filter((u) => u.sisi === 'BAWAH').sort((a, b) => b.tarikan - a.tarikan)[0]
      : urutan.filter((u) => u.sisi === 'ATAS').sort((a, b) => b.tarikan - a.tarikan)[0];
    return {
      pola: 'GANTUNG-DUA-SISI', judul: POLA_DEFS['GANTUNG-DUA-SISI'], arahPertama: M1.sisi === 'ATAS' ? 'NAIK' : 'TURUN',
      marginTarikan, M1: { harga: M1.harga, jenis: M1.jenis, sisi: M1.sisi, tarikan: M1.tarikan, usd: M1.usd },
      lawan: { harga: lawan.harga, jenis: lawan.jenis, tarikan: lawan.tarikan },
      lanjutan: balik ? { tipe: 'REBOUND_KE', harga: balik.harga, label: `magnet sisi ${balik.sisi.toLowerCase()} ${balik.harga.toPrecision(5)}`, dasar: [`tarikan dua sisi cuma beda ${Math.abs(marginTarikan)} poin (<8) — pasar belum memilih sisi; setelah sisi kuat disentuh, sisi lain jadi tujuan balik`] } : null,
      rantai: [
        `tarikan atas ${atasMax.toFixed(1)} vs bawah ${bawahMax.toFixed(1)} — SELISIH TIPIS: ini bukan pasar satu arah, ini pasar mundur-maju`,
        `M1 = magnet ${M1.sisi.toLowerCase()} $${M1.harga.toPrecision(5)} (T ${M1.tarikan}) paling dulu tertarik karena ${M1.bukti[0]}`,
        `setelah M1 disentuh, tarikan berpindah ke sisi ${sisiLawan.toLowerCase()} (likuiditas sisi M1 sudah dipanen) — target balik $${balik?.harga.toPrecision(5) ?? '—'}`,
        `bukan pola berantai: tidak ada sisi dominan — kaskade butuh margin tarikan ≥8 poin`,
      ],
      alasanTidakLain: `margin tarikan ${Math.abs(marginTarikan)} poin < 8 — dua sisi sama kuat, pola berantai dilarang lahir (otak tidak memaksakan arah yang tidak ada buktinya)`,
    };
  }

  if (M1.sisi === 'ATAS') {
    const antukTarget = urutan.filter((u) => u.sisi === 'BAWAH').sort((a, b) => b.tarikan - a.tarikan)[0];
    const M2 = urutan.filter((u) => u.sisi === 'ATAS' && u.harga > M1.harga + 0.001).sort((a, b) => a.harga - b.harga)[0] ?? null;
    const bensinTipis = sisaFuelAtasM1 < 0.30 && totalShort > 0;
    const rallyTua = funding >= 0.0006 || wkl === 'JEBAKAN' || wkl === 'DISTRIBUSI' || m.squeezeAktif === false && (m.modal?.whale.spotNet ?? 0) < -5e4;
    if (bensinTipis || rallyTua) {
      return {
        pola: 'SAPU-NAIK-LALU-ANTUK', judul: POLA_DEFS['SAPU-NAIK-LALU-ANTUK'], arahPertama: 'NAIK',
        marginTarikan, M1: { harga: M1.harga, jenis: M1.jenis, sisi: 'ATAS', tarikan: M1.tarikan, usd: M1.usd },
        lawan: lawanCand ? { harga: lawanCand.harga, jenis: lawanCand.jenis, tarikan: lawanCand.tarikan } : null,
        lanjutan: antukTarget
          ? { tipe: 'ANTUK_KE', harga: antukTarget.harga, label: `magnet bawah $${antukTarget.harga.toPrecision(5)} (${antukTarget.jenis})`, dasar: bensinTipis
              ? [`sisa korban short di atas M1 tinggal ${(sisaFuelAtasM1 * 100).toFixed(0)}% — setelah M1 terbakar, dorongan naik HABIS di level itu`]
              : [funding >= 0.0006 ? `funding ${(funding * 100).toFixed(4)}% — rally menua saat M1 tercapai` : '', `whale top-20 ${wkl} — posisi besar melawan kelanjutan naik`].filter(Boolean) }
          : { tipe: 'ANTUK_KE', harga: Math.round(emaBalik * 1e7) / 1e7, label: `EMA21 $${emaBalik.toPrecision(5)}`, dasar: ['tidak ada magnet bawah dominan — antuk ke EMA21 (mean-reversion standar)'] },
        rantai: [
          `urutan tarikan: M1 magnet ${M1.jenis} $${M1.harga.toPrecision(5)} (T ${M1.tarikan}) ditarik DULU — gravitasi & korban terpadat`,
          `KAKI-1: harga diseret ke atas menyapu ${fmtUsd(M1.usd)} short — bukan karena bullish, tapi karena likuiditas menggantung di situ`,
          `KAKI-2: di M1 bensin naik tinggal ${(sisaFuelAtasM1 * 100).toFixed(0)}%${rallyTua ? ' + rally sudah tua (funding/whale/spot negatif)' : ''} — harga ANTUK turun ke $${(antukTarget?.harga ?? emaBalik).toPrecision(5)}`,
          `jawaban "naik lalu turun, atau turun dulu?" — TURUN DULU TIDAK: tarikan bawah ${bawahMax.toFixed(1)} < atas ${atasMax.toFixed(1)} (selisih ${Math.abs(marginTarikan)} poin), jadi sapu atas yang MULAI dulu, turunnya SETELAHnya`,
        ],
        alasanTidakLain: `bukan SISIR-NAIK-BERANTAI: sisa bensin di atas M1 ${(sisaFuelAtasM1 * 100).toFixed(0)}% ${bensinTipis ? '(<30% — tidak cukup untuk kaki kedua naik)' : 'dan rally tua'} — kaskade butuh bensin padat`,
      };
    }
    return {
      pola: 'SISIR-NAIK-BERANTAI', judul: POLA_DEFS['SISIR-NAIK-BERANTAI'], arahPertama: 'NAIK',
      marginTarikan, M1: { harga: M1.harga, jenis: M1.jenis, sisi: 'ATAS', tarikan: M1.tarikan, usd: M1.usd },
      lawan: lawanCand ? { harga: lawanCand.harga, jenis: lawanCand.jenis, tarikan: lawanCand.tarikan } : null,
      lanjutan: M2
        ? { tipe: 'LANJUT_KE', harga: M2.harga, label: `magnet atas kedua $${M2.harga.toPrecision(5)} (${M2.jenis})`, dasar: [`sisa korban short di atas M1 masih ${(sisaFuelAtasM1 * 100).toFixed(0)}% — bensin kaskade belum habis`, `bensin naik ${m.bensinNaik} vs turun ${m.bensinTurun} — pasar masih menyisir ke atas`] }
        : null,
      rantai: [
        `urutan tarikan: M1 magnet ${M1.jenis} $${M1.harga.toPrecision(5)} (T ${M1.tarikan}) — korban ${fmtUsd(M1.usd)}, magnet ${nSentuhAtas(M1)} dinding`,
        `KAKI-1: harga diseret naik menyapu M1 — squeeze bensinnya ada di sisi short yang tergantung`,
        M2 ? `KAKI-2: setelah M1 terbakar, magnet atas berikutnya $${M2.harga.toPrecision(5)} (T ${M2.tarikan}) jadi tarikan baru — SISIR berlanjut` : `KAKI-2: tidak ada magnet atas kedua — setelah M1 peta berhenti di ISTIRAHAT (bukan fantasi lanjut)`,
        `jawaban "turun dulu?" — TIDAK: tarikan bawah ${bawahMax.toFixed(1)} kalah ${Math.abs(marginTarikan)} poin dari atas, dan bensin bawah bukan sisi yang menyala hari ini`,
      ],
      alasanTidakLain: `bukan SAPU-NAIK-LALU-ANTUK: sisa bensin di atas M1 ${(sisaFuelAtasM1 * 100).toFixed(0)}% (≥30%), funding ${(funding * 100).toFixed(4)}%, whale ${wkl || '—'} — belum ada tanda bensin habis`,
    };
  }

  // M1 BAWAH
  const M2b = urutan.filter((u) => u.sisi === 'BAWAH' && u.harga < M1.harga - 0.001).sort((a, b) => b.harga - a.harga)[0] ?? null;
  const reboundTarget = urutan.filter((u) => u.sisi === 'ATAS').sort((a, b) => a.harga - b.harga)[0];
  const reboundAlasan: string[] = [];
  if (akumAktif) reboundAlasan.push(`akumulasi senyap spot ${m.akumulasiKlasifikasi} — orang besar MENAMPUNG saat harga diseret turun`);
  if (spotNet > 5e4) reboundAlasan.push(`netflow whale spot positif ${fmtUsd(spotNet)} — dana segar masuk, bukan kabur`);
  if (wkl === 'PUMP_JUJUR' || wkl === 'MENGUMPULKAN') reboundAlasan.push(`whale top-20 ${wkl} — pemain besar di sisi beli`);
  const jatuhBerantai = m.korbanKaskade === 'LONG' && !akumAktif && spotNet <= 0;
  if (jatuhBerantai || (!reboundAlasan.length && sisaFuelBawahM1 > 0.45 && totalLong > 0)) {
    return {
      pola: 'JATUH-BERANTAI', judul: POLA_DEFS['JATUH-BERANTAI'], arahPertama: 'TURUN',
      marginTarikan, M1: { harga: M1.harga, jenis: M1.jenis, sisi: 'BAWAH', tarikan: M1.tarikan, usd: M1.usd },
      lawan: lawanCand ? { harga: lawanCand.harga, jenis: lawanCand.jenis, tarikan: lawanCand.tarikan } : null,
      lanjutan: M2b ? { tipe: 'LANJUT_KE', harga: M2b.harga, label: `magnet bawah kedua $${M2b.harga.toPrecision(5)} (${M2b.jenis})`, dasar: [`sisa korban long di bawah M1 masih ${(sisaFuelBawahM1 * 100).toFixed(0)}% — kaskade level-2 terpasang`, m.korbanKaskade === 'LONG' ? `kaskade 500-soal: korban LONG (hukum kasus: banjir long → harga turun mayoritas)` : ''] } : null,
      rantai: [
        `urutan tarikan: M1 magnet ${M1.jenis} $${M1.harga.toPrecision(5)} (T ${M1.tarikan}) — korban ${fmtUsd(M1.usd)} long menggantung di bawah`,
        `KAKI-1: harga diseret TURUN dulu menyapu long — tarikan bawah ${bawahMax.toFixed(1)} menang ${Math.abs(marginTarikan)} poin dari atas ${atasMax.toFixed(1)}`,
        M2b ? `KAKI-2: jebol M1, korban berikutnya di $${M2b.harga.toPrecision(5)} tersapu (domino likuidasi)` : `KAKI-2: tidak ada magnet bawah kedua — setelah M1 cenderung berhenti/mantul (jujur: peta berhenti di ISTIRAHAT)`,
        `jawaban "naik dulu?" — TIDAK: tidak ada tanda akumulasi menampung (${akumAktif ? 'terdeteksi' : 'tidak terdeteksi'}), spot net ${fmtUsd(spotNet)}`,
      ],
      alasanTidakLain: `bukan SAPU-TURUN-LALU-REBOUND: ${akumAktif ? 'ternyata akumulasi aktif' : 'tidak ada akumulasi senyap, spot net tidak positif, whale tidak di sisi beli'} — sapuan tanpa penampung lanjut jatuh`,
    };
  }
  return {
    pola: 'SAPU-TURUN-LALU-REBOUND', judul: POLA_DEFS['SAPU-TURUN-LALU-REBOUND'], arahPertama: 'TURUN',
    marginTarikan, M1: { harga: M1.harga, jenis: M1.jenis, sisi: 'BAWAH', tarikan: M1.tarikan, usd: M1.usd },
    lawan: lawanCand ? { harga: lawanCand.harga, jenis: lawanCand.jenis, tarikan: lawanCand.tarikan } : null,
    lanjutan: reboundTarget
      ? { tipe: 'REBOUND_KE', harga: reboundTarget.harga, label: `magnet atas terdekat $${reboundTarget.harga.toPrecision(5)} (${reboundTarget.jenis})`, dasar: reboundAlasan }
      : { tipe: 'REBOUND_KE', harga: Math.round(emaBalik * 1e7) / 1e7, label: `EMA21 $${emaBalik.toPrecision(5)}`, dasar: [...reboundAlasan, 'tidak ada magnet atas dominan — rebound dikalibrasi ke EMA21'] },
    rantai: [
      `urutan tarikan: M1 magnet ${M1.jenis} $${M1.harga.toPrecision(5)} (T ${M1.tarikan}) ditarik DULU — ${fmtUsd(M1.usd)} long jadi bensin turun`,
      `KAKI-1: harga diseret turun menyapu M1 — ini sapu likuiditas, bukan patah struktur`,
      `KAKI-2: ${reboundAlasan.length ? reboundAlasan.join('; ') : 'penampung terbaca'} — harga REBOUND ke $${(reboundTarget?.harga ?? emaBalik).toPrecision(5)}`,
      `jawaban "malah turun terus?" — TIDAK: sisa korban long di bawah M1 ${(sisaFuelBawahM1 * 100).toFixed(0)}% + tanda penampung — turunnya BERHENTI di M1`,
    ],
    alasanTidakLain: `bukan JATUH-BERANTAI: ada penampung (${reboundAlasan.join(', ') || 'konteks akumulasi'}) — sapu bawah dengan penampung = bahan bakar rebound, bukan domino`,
  };
}

function nSentuhAtas(m: MagnetBerat): string {
  return m.komponen.usiaDinding >= 0.99 ? 'MENTAH (belum diuji)' : `bekas gigit ${Math.round((1 - m.komponen.usiaDinding) * 6)}×`;
}

// ---------------- ORGAN 3+4 — denyut: jawab, lahirkan, kesaksian ----------------
export async function denyutLintasan(m: MasukanLintasan): Promise<LintasanJiwa> {
  const st = bacaState();
  const now = Date.now();
  st.denyutKe += 1;
  st.at = new Date(now).toISOString();
  const jujur: string[] = [];

  // 1) jawab keyakinan terbuka pakai candle 1j nyata (kaki-1 urutan → kaki-2 lanjutan)
  const acara = jawabTerbuka(st, m.candles1d, now);

  // 2) timbang tarikan SEMUA magnet (dua sisi, satu formula)
  const nSentuhAtasL = jumlahSentuhan(m.magnets.atas, m.candles1d, 'ATAS');
  const nSentuhBawahL = jumlahSentuhan(m.magnets.bawah, m.candles1d, 'BAWAH');
  const beratAtas = timbangTarikan(m.magnets.atas, 'ATAS', m.harga, m, nSentuhAtasL);
  const beratBawah = timbangTarikan(m.magnets.bawah, 'BAWAH', m.harga, m, nSentuhBawahL);
  const urutan = [...beratAtas, ...beratBawah].sort((a, b) => b.tarikan - a.tarikan).slice(0, 6);
  const tarikanAtas = beratAtas.length ? Math.max(...beratAtas.map((b) => b.tarikan)) : 0;
  const tarikanBawah = beratBawah.length ? Math.max(...beratBawah.map((b) => b.tarikan)) : 0;
  st.tarikanTerakhir = { at: st.at, atas: tarikanAtas, bawah: tarikanBawah };

  // 3) baca pola lintasan
  const pola = bacaPola(urutan, m);

  // 4) lahirkan keyakinan baru (anti-dobel 4 jam per M1+polA)
  if (pola && M1Layak(pola)) {
    const aturan: string[] = [`POLA:${pola.pola}`];
    if ((m.modal?.funding.sekarang ?? 0) >= 0.0006) aturan.push('FUNDING-PANAS');
    if ((m.orangRasioLong ?? 0.5) >= 0.58) aturan.push('KERUMUNAN-SESAK');
    if ((m.modal?.whaleTop.klasifikasi ?? '') === 'JEBAKAN' || (m.modal?.whaleTop.klasifikasi ?? '') === 'DISTRIBUSI') aturan.push('WHALE-ANTI-KERUMUNAN');
    if ((m.modal?.whale.spotNet ?? 0) < 0) aturan.push('SPOT-NEGATIF');
    if ((m.modal?.whale.spotNet ?? 0) > 0) aturan.push('SPOT-POSITIF');
    if (m.oiD24j !== null && m.oiD24j > 0) aturan.push('OI-TUMBUH');
    if (m.oiD24j !== null && m.oiD24j < 0) aturan.push('OI-SURUT');
    if (aturan.includes('FUNDING-PANAS') || aturan.includes('KERUMUNAN-SESAK')) aturan.push('KASKADE-KORBAN');
    if (urutan[0] && urutan[0].komponen.usiaDinding >= 0.99) aturan.push('MAGNET-MENTAH');
    if (pola.pola === 'SAPU-NAIK-LALU-ANTUK') aturan.push('BENSIN-TIPIS-DI-ATAS');
    if (m.squeezeSkor >= 55 || m.squeezeAktif) aturan.push('SQUEEZE-SKOR-TINGGI');
    if (m.akumulasiKlasifikasi && /AKUMULASI|SENYAP/i.test(m.akumulasiKlasifikasi)) aturan.push('AKUMULASI-SENYAP');

    // komponen K terbuka
    const marginNorm = clamp(Math.abs(pola.marginTarikan) / 30, 0, 1);
    const konsistensi = ([
      m.oiD24j !== null, (m.orangRasioLong ?? 0) > 0, m.modal?.likuidasi !== null,
      Math.abs(m.modal?.whale.spotNet ?? 0) > 0, (m.modal?.whaleTop.klasifikasi ?? '') !== '',
      m.korbanKaskade !== null, m.magnets.atas.length + m.magnets.bawah.length >= 3,
    ].filter(Boolean).length) / 7;
    const rep = bacaAkurasiPola(st, pola.pola);
    const akurasiPola = rep.akurasi ?? 0.5;
    const buktiNyata = clamp(log1p(pola.M1.usd / 5e5) / 3, 0, 1);
    const lama = st.terbuka.find((x) => x.pola === pola.pola && Math.abs(x.m1.harga - pola.M1.harga) / pola.M1.harga < 0.002);
    const umurJam = lama ? (now - Date.parse(lama.at)) / JAM : 0;
    const kesegaran = umurJam === 0 ? 1 : Math.max(0, 1 - umurJam / 8);
    const K = Math.max(0.05, Math.min(0.92,
      0.25 + 0.20 * marginNorm + 0.18 * konsistensi + 0.15 * akurasiPola + 0.12 * buktiNyata + 0.10 * kesegaran));

    const id = `L${String(st.berikutId).padStart(3, '0')}`;
    const baru: KeyakinanLintasan = {
      id, at: st.at, pola: pola.pola, arahPertama: pola.arahPertama,
      m1: { harga: pola.M1.harga, jenis: pola.M1.jenis, sisi: pola.M1.sisi, tarikan: pola.M1.tarikan },
      lawan: pola.lawan ? { harga: pola.lawan.harga, jenis: pola.lawan.jenis } : null,
      lanjutan: pola.lanjutan ? { tipe: pola.lanjutan.tipe, harga: pola.lanjutan.harga, label: pola.lanjutan.label } : null,
      deadlineAt: new Date(now + 24 * JAM).toISOString(),
      keyakinan: Math.round(K * 1000) / 1000,
      komponen: {
        marginTarikan: Math.round(marginNorm * 1000) / 1000, konsistensi: Math.round(konsistensi * 1000) / 1000,
        akurasiPola: Math.round(akurasiPola * 1000) / 1000, buktiNyata: Math.round(buktiNyata * 1000) / 1000,
        kesegaran: Math.round(kesegaran * 1000) / 1000,
      },
      dasar: `${pola.pola}: M1 ${pola.M1.sisi} ${pola.M1.harga.toPrecision(5)} (T ${pola.M1.tarikan}) ditarik dulu, lalu ${pola.lanjutan ? `${pola.lanjutan.tipe} ${pola.lanjutan.harga.toPrecision(5)}` : 'berhenti (ISTIRAHAT)'}`,
      aturan: Array.from(new Set(aturan)), status: 'TERBUKA',
    };
    const dobel = st.terbuka.some((x) => x.pola === baru.pola && Math.abs(x.m1.harga - baru.m1.harga) / Math.max(baru.m1.harga, 1e-9) < 0.002 && now - Date.parse(x.at) < 4 * JAM);
    if (!dobel && st.terbuka.length < CAP_TERBUKA) {
      st.terbuka.push(baru);
      catat(st, `${id} LAHIR — ${baru.pola}: urutan M1 ${baru.m1.sisi} $${baru.m1.harga.toPrecision(5)} ditarik dulu (T ${baru.m1.tarikan}, margin ${pola.marginTarikan > 0 ? '+' : ''}${pola.marginTarikan} poin), lalu ${baru.lanjutan ? `${baru.lanjutan.tipe} $${baru.lanjutan.harga.toPrecision(5)}` : 'ISTIRAHAT'}; deadline 24j; K=${baru.keyakinan} (margin ${baru.komponen.marginTarikan} · konsistensi ${baru.komponen.konsistensi} · akurasi-pola ${baru.komponen.akurasiPola} · bukti ${baru.komponen.buktiNyata} · kesegaran ${baru.komponen.kesegaran})`);
    } else if (dobel) {
      catat(st, `${id} ditolak lahir — masih ada prediksi pola sama dengan M1 sama berumur <4 jam (anti-dobel)`);
    } else {
      catat(st, `${id} ditolak lahir — kapasitas keyakinan terbuka penuh (${CAP_TERBUKA}); yang lama diadili dulu`);
    }
  } else if (pola) {
    catat(st, `pola ${pola.pola} terbaca tapi tidak layak lahir — tarikan M1 ${pola.M1.tarikan} < 42 atau margin terlalu tipis; otak menolak menebak tanpa kekuatan`);
  }

  // 5) kalibrasi agregat + kepahaman
  const nTerjawab = st.selesai.length;
  const nBenar = st.selesai.filter((b) => b.status === 'DITEPATI').length;
  const kepahaman = kepahamanList(st);

  // 6) VITAMIN — kesaksian top-2 ke dewan AR-E12
  const kesaksian: KesaksianLintasan[] = [];
  const urutKey = [...st.terbuka].sort((a, b) => b.keyakinan - a.keyakinan).slice(0, 2);
  for (const b of urutKey) {
    const rep = bacaAkurasiPola(st, b.pola);
    const reputasi = rep.akurasi !== null ? Math.max(0.2, Math.min(0.9, rep.akurasi)) : 0.6;
    kesaksian.push({
      dari: `OTAK-LINTASAN:${b.id}`,
      vote: b.arahPertama === 'NAIK' ? 'NAIK' : 'TURUN',
      kekuatan: Math.round(b.keyakinan * (0.45 + 0.55 * reputasi) * 1000) / 1000,
      cara: `${b.pola} — urutan: ${b.m1.sisi} $${b.m1.harga.toPrecision(5)} (T ${b.m1.tarikan}) ditarik DULU sebelum ${b.lawan ? `lawan $${b.lawan.harga.toPrecision(5)}` : '—'}, lalu ${b.lanjutan ? `${b.lanjutan.tipe} $${b.lanjutan.harga.toPrecision(5)}` : 'ISTIRAHAT'} 24j, K=${b.keyakinan}, rekam jejak pola ${rep.akurasi !== null ? `${(rep.akurasi * 100).toFixed(0)}% (${rep.n} sampel)` : `${rep.n} sampel terjawab`} — prediksi urutan+lanjutan yang bisa DIBUKTIKAN salah (bukan "hmm naik turun ya")`,
    });
  }

  const vitamin = {
    aktif: kesaksian.length > 0,
    teks: kesaksian.length
      ? `${kesaksian.length} prediksi lintasan bersuara (${kesaksian.map((k) => `${k.dari.replace('OTAK-LINTASAN:', '')}=${k.vote}`).join(', ')}) dikirim ke dewan AR-E12 (bobot 0.09) · ${st.terbuka.length} prediksi terbuka diawasi · ${kepahaman.length} pola/aturan diberi rapor — urutan magnet & bentuk lintasan ikut memutuskan, bukan lagi "naik turun ya"`
      : 'tak ada prediksi lintasan layak saat ini (tarikan tipis / magnet satu sisi kosong) — otak lintasan tetap menimbang dan jujur menunggu, TIDAK memaksakan pola',
  };

  const jiwa: LintasanJiwa = {
    at: st.at, denyutKe: st.denyutKe, harga: m.harga,
    urutan, tarikanAtas: Math.round(tarikanAtas * 10) / 10, tarikanBawah: Math.round(tarikanBawah * 10) / 10,
    pola,
    keyakinanTerbuka: st.terbuka,
    keyakinanSelesai: st.selesai.slice(0, 12),
    kalibrasi: { nTerjawab, nBenar, akurasi: nTerjawab > 0 ? nBenar / nTerjawab : 0 },
    kepahaman,
    kesaksian,
    diary: st.diary,
    vitamin,
    jujur: [
      ...jujur,
      'URUT_SALAH dihitung salah penuh (magnet lawan tersentuh dulu = prediksi urutan gagal, bukan "hampir benar")',
      'MELEWAT dihitung SALAH (konservatif) — janji pola yang tak terwujud dianggap kegagalan, bukan dihapus',
      'pola muda (<4 sampel) TIDAK boleh memodulasi keyakinan — otak tidak berani pintar tanpa bukti',
      'magnet MENTAH (belum diuji harga 90 candle) menang atas dinding bekas gigit — likuiditas yang sudah dipanen tak menarik lagi',
      'margin tarikan <8 poin = GANTUNG-DUA-SISI — otak dilarang menebak arah tunggal saat dua sisi sama kuat',
    ],
  };
  tulisState(st);
  return jiwa;
}

function M1Layak(pola: PolaLintasan): boolean {
  return pola.M1.tarikan >= 42;
}

// ---------------- jawab keyakinan terbuka — candle 1j nyata ----------------
function jawabTerbuka(st: LintasanState, cs: Candle[], now: number): string[] {
  const acara: string[] = [];
  for (const b of st.terbuka) {
    if (b.status !== 'TERBUKA') continue;
    const mulai = Date.parse(b.at);
    const batas = Date.parse(b.deadlineAt);
    const win = cs.filter((c) => c.t > mulai);
    if (!win.length) continue;
    const kena = (harga: number, arah: 'ATAS' | 'BAWAH') => win.find((c) => (arah === 'ATAS' ? c.h >= harga : c.l <= harga));
    const m1Kena = kena(b.m1.harga, b.m1.sisi);
    const lawanKena = b.lawan ? kena(b.lawan.harga, b.m1.sisi === 'ATAS' ? 'BAWAH' : 'ATAS') : null;

    if (!m1Kena && lawanKena) {
      // magnet lawan tersentuh dulu — URUTAN SALAH
      b.status = 'URUT_SALAH';
      b.dijawabAt = new Date(lawanKena.t).toISOString();
      b.hargaAkhir = lawanKena.c;
      b.cerita = `URUTAN SALAH: magnet ${b.lawan!.jenis} $${b.lawan!.harga.toPrecision(5)} (${b.m1.sisi === 'ATAS' ? 'bawah' : 'atas'}) tersentuh DULU pada ${new Date(lawanKena.t).toLocaleString('id-ID')} sebelum M1 $${b.m1.harga.toPrecision(5)} — pasar menarik sisi lain; pola ${b.pola} gagal di kaki pertama`;
      for (const k of b.aturan) nilaiKepahaman(st, k, false);
      acara.push(`${b.id} (${b.pola}) URUT_SALAH — magnet lawan ditarik duluan`);
      continue;
    }
    if (m1Kena) {
      // KAKI-1 benar — lanjut adili KAKI-2 dari candle SETELAH sentuhan M1
      b.kaki1At = new Date(m1Kena.t).toISOString();
      const setelah = win.filter((c) => c.t > m1Kena.t);
      const lanj = b.lanjutan;
      const arahLanj: 'ATAS' | 'BAWAH' | null = lanj ? (lanj.tipe === 'ANTUK_KE' ? 'BAWAH' : lanj.tipe === 'REBOUND_KE' ? 'ATAS' : (b.arahPertama === 'NAIK' ? 'ATAS' : 'BAWAH')) : null;
      const lanjKena = lanj && arahLanj ? setelah.find((c) => (arahLanj === 'ATAS' ? c.h >= lanj.harga : c.l <= lanj.harga)) : null;
      const lawanLanj = b.lawan ? setelah.find((c) => (b.m1.sisi === 'ATAS' ? c.l <= b.lawan!.harga : c.h >= b.lawan!.harga)) : null;
      if (lanjKena && (!lawanLanj || lanjKena.t <= lawanLanj.t)) {
        b.status = 'DITEPATI';
        b.dijawabAt = new Date(lanjKena.t).toISOString();
        b.hargaAkhir = lanjKena.c;
        b.cerita = `DUA KAKI TERBAYAR: M1 ${b.m1.sisi} $${b.m1.harga.toPrecision(5)} disentuh ${new Date(m1Kena.t).toLocaleString('id-ID')}, lalu ${b.lanjutan?.tipe ?? 'lanjutan'} $${b.lanjutan?.harga.toPrecision(5)} tercapai pada ${new Date(lanjKena.t).toLocaleString('id-ID')} — pola ${b.pola} terbaca pasar`;
        for (const k of b.aturan) nilaiKepahaman(st, k, true);
        acara.push(`${b.id} (${b.pola}) DITEPATI — ${b.cerita}`);
      } else if (lawanLanj && (!lanjKena || lawanLanj.t < lanjKena.t)) {
        b.status = 'GAGAL';
        b.dijawabAt = new Date(lawanLanj.t).toISOString();
        b.hargaAkhir = lawanLanj.c;
        b.cerita = `KAKI-1 benar (M1 tersentuh), tapi lanjutan GAGAL: harga jebol sampai ${b.lawan!.jenis} $${b.lawan!.harga.toPrecision(5)} pada ${new Date(lawanLanj.t).toLocaleString('id-ID')} sebelum ${b.lanjutan ? b.lanjutan.harga.toPrecision(5) : '—'} — balikan arah ekstrem lebih dulu`;
        for (const k of b.aturan) nilaiKepahaman(st, k, false);
        acara.push(`${b.id} (${b.pola}) GAGAL — kaki-2 terpental ke sisi lawan`);
      } else if (now > batas) {
        b.status = 'MELEWAT';
        b.dijawabAt = new Date(now).toISOString();
        b.hargaAkhir = cs.length ? cs[cs.length - 1].c : b.m1.harga;
        b.cerita = `KAKI-1 benar tapi kedaluwarsa tanpa lanjutan ${b.lanjutan ? `$${b.lanjutan.harga.toPrecision(5)}` : ''} — dihitung SALAH konservatif: pola separuh terwujud tak dianggap menang`;
        for (const k of b.aturan) nilaiKepahaman(st, k, false);
        acara.push(`${b.id} (${b.pola}) MELEWAT — kaki-1 benar, kaki-2 tak terwujud`);
      }
      continue;
    }
    if (now > batas) {
      b.status = 'MELEWAT';
      b.dijawabAt = new Date(now).toISOString();
      b.hargaAkhir = cs.length ? cs[cs.length - 1].c : b.m1.harga;
      b.cerita = `kedaluwarsa 24j tanpa sentuhan M1 $${b.m1.harga.toPrecision(5)} (juga tanpa lawan) — prediksi urutan tidak terwujud, dihitung SALAH konservatif`;
      for (const k of b.aturan) nilaiKepahaman(st, k, false);
      acara.push(`${b.id} (${b.pola}) MELEWAT — M1 tak pernah tertarik`);
    }
  }
  // pindahkan selesai
  const selesaiBaru = st.terbuka.filter((b) => b.status !== 'TERBUKA');
  if (selesaiBaru.length) {
    st.selesai = [...selesaiBaru, ...st.selesai].slice(0, CAP_SELESAI);
    st.terbuka = st.terbuka.filter((b) => b.status === 'TERBUKA');
    for (const a of acara) catat(st, a);
  }
  return acara;
}

// ---------------- kepahaman ----------------
function nilaiKepahaman(st: LintasanState, kunci: string, menang: boolean): void {
  const kp = st.kepahaman[kunci] ?? { n: 0, benar: 0 };
  kp.n += 1;
  if (menang) kp.benar += 1;
  st.kepahaman[kunci] = kp;
}

function kepahamanList(st: LintasanState): LintasanJiwa['kepahaman'] {
  return Object.entries(st.kepahaman)
    .map(([kunci, v]) => ({ kunci, judul: POLA_DEFS[kunci] ?? ATURAN_DEFS[kunci] ?? kunci, n: v.n, benar: v.benar, akurasi: v.n > 0 ? v.benar / v.n : 0 }))
    .sort((a, b) => b.n - a.n);
}

export function bacaAkurasiPola(st: LintasanState, pola: string): { akurasi: number | null; n: number } {
  const kp = st.kepahaman[`POLA:${pola}`];
  if (!kp || kp.n < POLA_MIN || kp.n === 0) return { akurasi: null, n: kp?.n ?? 0 };
  return { akurasi: kp.benar / kp.n, n: kp.n };
}

// ---------------- baca jiwa tersimpan (untuk kesaksian pre-vonis) ----------------
export function bacaLintasanJiwa(): LintasanJiwa | null {
  try {
    const st = bacaState();
    if (!st.terbuka.length && !st.selesai.length && st.denyutKe === 0) return null;
    const urutKey = [...st.terbuka].sort((a, b) => b.keyakinan - a.keyakinan).slice(0, 2);
    const kesaksian: KesaksianLintasan[] = urutKey.map((b) => {
      const kp = st.kepahaman[`POLA:${b.pola}`];
      const rep = kp && kp.n >= POLA_MIN ? kp.benar / kp.n : null;
      const reputasi = rep !== null ? Math.max(0.2, Math.min(0.9, rep)) : 0.6;
      return {
        dari: `OTAK-LINTASAN:${b.id}`,
        vote: b.arahPertama === 'NAIK' ? 'NAIK' : 'TURUN',
        kekuatan: Math.round(b.keyakinan * (0.45 + 0.55 * reputasi) * 1000) / 1000,
        cara: `${b.pola} (tersimpan) — ${b.m1.sisi} $${b.m1.harga.toPrecision(5)} ditarik dulu, lalu ${b.lanjutan ? `${b.lanjutan.tipe} $${b.lanjutan.harga.toPrecision(5)}` : 'ISTIRAHAT'}; K=${b.keyakinan}`,
      };
    });
    const nTerjawab = st.selesai.length;
    const nBenar = st.selesai.filter((b) => b.status === 'DITEPATI').length;
    return {
      at: st.at, denyutKe: st.denyutKe, harga: st.terbuka[0]?.m1.harga ?? 0,
      urutan: [], tarikanAtas: 0, tarikanBawah: 0, pola: null,
      keyakinanTerbuka: st.terbuka,
      keyakinanSelesai: st.selesai.slice(0, 12),
      kalibrasi: { nTerjawab, nBenar, akurasi: nTerjawab > 0 ? nBenar / nTerjawab : 0 },
      kepahaman: kepahamanList(st),
      kesaksian,
      diary: st.diary.slice(0, 8),
      vitamin: { aktif: kesaksian.length > 0, teks: kesaksian.length ? `${kesaksian.length} prediksi lintasan tersimpan bersuara (kesaksian dewan dibaca dari ingatan — denyut penuh menyusul saat payload dibangun)` : 'tidak ada prediksi terbuka' },
      jujur: ['ini ingatan tersimpan — denyut penuh (jawab+lahir) berjalan di denyut payload berikutnya'],
    };
  } catch { return null; }
}

export const JUJUR_LINTASAN = [
  'formula tarikan: T = 100×(0.26 kerapatan korban + 0.22 gravitasi jarak + 0.16 arah bensin + 0.12 sisi sesak + 0.10 arah OI + 0.08 whale + 0.06 usia dinding) — setiap komponen tampil apa adanya',
  'urutan magnet lintas dua sisi dari SATU formula — bukan jarak terdekat, bukan praduga',
];
