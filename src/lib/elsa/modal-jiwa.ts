// ============================================================
// MICAPROFITA-ELSA · JIWA OTAK MODAL — modal diberi OTAK
// (keluhan pemilik 2026-11-25): "fundamen modal ini gimana gak ada
// ruhnya, dan kesannya gak ada neuron, makanya bodoh ini kita
// sistemnya karena gak ada otak."
// Diagnosa jujur: modal.ts adalah MESIN HITUNG hebat tapi MAYAT —
//   vonis dibuang tiap poll tanpa pernah dinilai kebenarannya;
//   portal waktu memprediksi prob24j tapi tak ada yang memeriksa
//   apakah magnet benar tersentuh; sidik whale W1..Wn lahir lalu
//   hilang; vonis jenis X tidak pernah belajar dari X sebelumnya.
// v1 memasang LIMA organ + satu tambalan akuntabilitas:
//   1. NEURON KEYAKINAN — tiap vonis (hukum dua pedang: SELALU ada arah,
//      dilarang diam) yang berubah jenis, atau refresh tiap 4 jam, ditulis
//      sebagai keyakinan TERBUKA dengan formula terbuka:
//        K = clamp(0,30 + 0,22·|skor−50|/50 + 0,18·konsistensi
//                  + 0,15·akurasiAturan + 0,08·kesegaran
//                  + 0,07·buktiNyata, 0, 0,95)
//      target & stop DARI DATA (0,7·σ24j, clamp 1,2–4,0%) + deadline
//      24 jam — keyakinan yang bisa DINILAI BENAR/SALAH, bukan
//      pajangan angka.
//   2. KALIBRASI MANDIRI — tiap denyut, keyakinan terbuka dijawab
//      candle perp 1 jam NYATA: DITEPATI (target kena duluan),
//      GAGAL (stop kena duluan), MELEWAT (kedaluwarsa tanpa keduanya
//      — dihitung SALAH konservatif: janji gerak tak terwujud).
//   3. KEPAHAMAN TERTAMBANG — tiap keyakinan membawa kunci aturan
//      (funding panas, OI searah, magnet likuidasi, whale-vs-
//      kerumunan, basis, akumulasi senyap…). n/benar/akurasi per
//      aturan tumbuh & tersimpan — kepahaman terbaca manusia.
//   4. MODULASI VONIS (otak pakai rekam jejak) — skor vonis baru
//      dikalibrasi akurasi historis jenis tsb: aturan yang sering
//      salah DIDISKON, yang menepat DIDORONG. Vonis makin pintar
//      setiap hari — bukan mengulang kebodohan yang sama.
//   5. VITAMIN: kesaksian → dewan AR-E11 — keyakinan berkeyakinan
//      tertinggi bersuara di dewan arah (bobot 0,09): pondasi modal
//      ikut memutuskan arah, bukan sekadar menempel di tab.
//   6. PORTAL DIVERIFIKASI — bencana turun/naik portal waktu dicatat
//      juga sebagai keyakinan ("magnet tertarik") dan dijawab candle
//      — prediksi prob24j tak lagi bebas tanpa pertanggungan.
// Hukum jujur: akurasi < 4 sampel TIDAK memodulasi; MELEWAT dihitung
// salah (konservatif); semua kegagalan dicatat terbuka di diary.
// ============================================================
import fs from 'fs';
import type { Candle } from './indicators';

const DIR_JIWA = '/home/z/my-project/db/elsa/modal-jiwa';
const FILE_STATE = `${DIR_JIWA}/neuron.json`;
const JAM = 3_600_000;
const CAP_TERBUKA = 12;
const CAP_SELESAI = 60;
const CAP_DIARY = 40;
const MODULASI_MIN = 4; // akurasi baru boleh mengubah vonis setelah ≥4 sampel

export type KeyakinanModal = {
  id: string; at: string; jenis: string; arah: 'NAIK' | 'TURUN';
  asal: 'VONIS' | 'PORTAL';
  hargaAwal: number; targetPct: number; stopPct: number;
  hargaTarget: number; hargaStop: number; deadlineAt: string;
  keyakinan: number;
  komponen: { skor: number; konsistensi: number; akurasiAturan: number; kesegaran: number; buktiNyata: number };
  dasar: string; aturan: string[];
  status: 'TERBUKA' | 'DITEPATI' | 'GAGAL' | 'MELEWAT';
  dijawabAt?: string; hargaAkhir?: number; cerita?: string;
};

export type ModulasiVonis = {
  jenis: string; skorSebelum: number; skorSesudah: number;
  akurasiAturan: number | null; nAturan: number;
  efek: 'DORONG' | 'DISKON' | 'BIASA'; ket: string;
};

export type KesaksianModal = { dari: string; vote: 'NAIK' | 'TURUN' | 'NETRAL'; kekuatan: number; cara: string };

export type ModalJiwa = {
  at: string; denyutKe: number;
  keyakinanTerbuka: KeyakinanModal[];
  keyakinanSelesai: KeyakinanModal[];
  kalibrasi: { nTerjawab: number; nBenar: number; akurasi: number };
  kepahaman: { kunci: string; judul: string; n: number; benar: number; akurasi: number }[];
  modulasi: ModulasiVonis | null;
  kesaksian: KesaksianModal[];
  diary: { at: string; teks: string }[];
  vitamin: { aktif: boolean; teks: string };
  jujur: string[];
};

type ModalState = {
  v: 1;
  at: string; denyutKe: number; berikutId: number;
  terbuka: KeyakinanModal[]; selesai: KeyakinanModal[];
  kepahaman: Record<string, { n: number; benar: number }>;
  vonisTerakhir: { jenis: string; at: string } | null;
  diary: { at: string; teks: string }[];
};

// ---------------- judul aturan kepahaman (terbaca manusia) ----------------
export const KEPAHAMAN_DEFS: Record<string, string> = {
  'VONIS:SHORT_SQUEEZE': 'naik murni bensin penutupan short (OI turun saat harga naik) — rally curam tapi rapuh',
  'VONIS:PUMP_NYATA': 'whale akumulasi dua pasar / top-20 tambah long sebelum kerumunan — pump berpondasi dana',
  'VONIS:JEBAKAN_BULL': 'funding panas + kerumunan long sesak + whale melepas — pump jebakan sebelum dibanting',
  'VONIS:JEBAKAN_BEAR': 'whale menimbun short di perp saat harga belum naik — drop eksplosif menunggu pemicu',
  'VONIS:AKUMULASI': 'whale menampung di spot jauh dari puncak, funding dingin — pola siap-pump',
  'VONIS:DISTRIBUSI': 'harga masih naik tapi whale melepas di dua pasar — penguras saat pump',
  'VONIS:BUNUH_SHORT': 'hukum dua pedang: tanpa pola besar, neraca bukti memilih pedang bunuh-SHORT (naik menyapu short) — komitmen yakin-rendah yang tetap diadili pasar',
  'VONIS:BUNUH_LONG': 'hukum dua pedang: tanpa pola besar, neraca bukti memilih pedang bunuh-LONG (turun menyapu long) — komitmen yakin-rendah yang tetap diadili pasar',
  'FUNDING-PANAS': 'funding ≥ 0,06%/interval menandai sisi sesak yang rawan dibanting',
  'KERUMUNAN-SESAK': 'rasio long akun ≥ 58% (kerumunan satu arah) menandai bahan bakar likuidasi',
  'WHALE-ANTI-KERUMUNAN': 'top-20 whale berlawanan arah kerumunan (Δtop ≥ 6% dalam 3 jam) — pemain besar menang',
  'SPOT-NEGATIF': 'netflow whale spot negatif saat harga naik = pump tanpa dukungan dana segar',
  'SPOT-POSITIF': 'netflow whale spot positif = dana segar menopang arah',
  'OI-TUMBUH': 'OI 24j tumbuh = posisi baru nyata, bukan penutupan',
  'OI-SURUT': 'OI 24j surut = bensin penutupan; gerak harga rapuh',
  'BASIS-PANAS': 'perp premium (basis) positif tinggi = spekulasi perp dominan',
  'AKUMULASI-SENYAP': 'akumulasi senyap spot terbaca (beli diam-diam sebelum pump)',
  'MAGNET-SHORT': 'portal waktu: magnet likuidasi short di atas tertarik harga (squeeze ke atas)',
  'MAGNET-LONG': 'portal waktu: magnet likuidasi long di bawah tertarik harga (jatuh ke korban long)',
  'SQUEEZE-SKOR-TINGGI': 'skor squeeze tinggi — kejaran menutup posisi menggerakkan harga',
};

const ARAH_VONIS: Record<string, 'NAIK' | 'TURUN'> = {
  PUMP_NYATA: 'NAIK', AKUMULASI: 'NAIK', SHORT_SQUEEZE: 'NAIK', BUNUH_SHORT: 'NAIK',
  JEBAKAN_BULL: 'TURUN', JEBAKAN_BEAR: 'TURUN', DISTRIBUSI: 'TURUN', BUNUH_LONG: 'TURUN',
};

// ---------------- ingatan jiwa (bertahan restart) ----------------
function bacaState(): ModalState {
  const def: ModalState = {
    v: 1, at: '', denyutKe: 0, berikutId: 1,
    terbuka: [], selesai: [], kepahaman: {}, vonisTerakhir: null, diary: [],
  };
  try {
    fs.mkdirSync(DIR_JIWA, { recursive: true });
    if (fs.existsSync(FILE_STATE)) {
      const j = JSON.parse(fs.readFileSync(FILE_STATE, 'utf8')) as Partial<ModalState> & { v?: number };
      if (j && Array.isArray(j.terbuka)) {
        const campur = { ...def, ...j } as ModalState;
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
function tulisState(st: ModalState): void {
  try {
    fs.mkdirSync(DIR_JIWA, { recursive: true });
    fs.writeFileSync(FILE_STATE, JSON.stringify(st));
  } catch { /* gagal simpan — jiwa tetap hidup di memori proses */ }
}
function catat(st: ModalState, teks: string): void {
  st.diary.unshift({ at: new Date().toISOString(), teks });
  if (st.diary.length > CAP_DIARY) st.diary.length = CAP_DIARY;
}

// ---------------- bacaan kepahaman (tanpa menulis) ----------------
export function bacaAkurasiAturan(jenis: string): { akurasi: number | null; n: number } {
  const st = bacaState();
  const kp = st.kepahaman[`VONIS:${jenis}`];
  if (!kp || kp.n < MODULASI_MIN || kp.n === 0) return { akurasi: null, n: kp?.n ?? 0 };
  return { akurasi: kp.benar / kp.n, n: kp.n };
}

// ORGAN 4 — MODULASI VONIS: rekam jejak mengubah skor vonis baru.
// Dipanggil modal.ts SEBELUM payload terbentuk; hasilnya ikut payload.
export function hitungModulasiVonis(jenis: string, skorSebelum: number): ModulasiVonis {
  const { akurasi, n } = bacaAkurasiAturan(jenis);
  if (akurasi === null || n < MODULASI_MIN) {
    return { jenis, skorSebelum, skorSesudah: skorSebelum, akurasiAturan: akurasi, nAturan: n, efek: 'BIASA', ket: `rekam jejak ${jenis}: ${n} sampel terjawab (modulasi menyala di ${MODULASI_MIN}) — skor ${skorSebelum} berdiri apa adanya; sampel ke-${n + 1} langsung menyetir skor. HUKUM: pasar hanya punya dua pedang — otak wajib berdiri di SATU pedang, tidak bersembunyi di netral` };
  }
  let delta = 0;
  let efek: ModulasiVonis['efek'] = 'BIASA';
  if (akurasi >= 0.60) { delta = Math.min(8, 2 + (akurasi - 0.60) * 20 + n * 0.15); efek = 'DORONG'; }
  else if (akurasi <= 0.40) { delta = -Math.min(12, 3 + (0.40 - akurasi) * 25 + n * 0.2); efek = 'DISKON'; }
  const skorSesudah = Math.max(1, Math.min(100, Math.round(skorSebelum + delta)));
  const ket = efek === 'DORONG'
    ? `rekam jejak ${jenis}: ${n} keyakinan lama, akurasi ${(akurasi * 100).toFixed(0)}% — aturan ini SERING MENEPAT, skor didorong ${delta >= 0 ? '+' : ''}${delta.toFixed(1)} (otak modal pakai pengalamannya)`
    : efek === 'DISKON'
      ? `rekam jejak ${jenis}: ${n} keyakinan lama, akurasi ${(akurasi * 100).toFixed(0)}% — aturan ini SERING SALAH, skor didiskon ${delta.toFixed(1)} (otak menurunkan percaya diri pada aturan yang terbukti menipu)`
      : `rekam jejak ${jenis}: akurasi ${(akurasi * 100).toFixed(0)}% dari ${n} sampel — seimbang, skor utuh`;
  return { jenis, skorSebelum, skorSesudah, akurasiAturan: akurasi, nAturan: n, efek, ket };
}

// ORGAN 3 — nilai kepahaman satu kunci aturan
function nilaiKepahaman(st: ModalState, kunci: string, menang: boolean): void {
  const kp = st.kepahaman[kunci] ?? { n: 0, benar: 0 };
  kp.n += 1;
  if (menang) kp.benar += 1;
  st.kepahaman[kunci] = kp;
}

function kepahamanList(st: ModalState): ModalJiwa['kepahaman'] {
  return Object.entries(st.kepahaman)
    .map(([kunci, v]) => ({ kunci, judul: KEPAHAMAN_DEFS[kunci] ?? kunci, n: v.n, benar: v.benar, akurasi: v.n > 0 ? v.benar / v.n : 0 }))
    .sort((a, b) => b.n - a.n);
}

// ---------------- ORGAN 1+5+6 — denyut utama ----------------
export type MasukanJiwa = {
  vonis: { vonis: string; skor: number; alasan: string[]; implikasi: string; modulasi: ModulasiVonis | null };
  harga: number; sigma24jPct: number;
  portalTurun: { dPct: number; triggerHarga: number; prob24j: number } | null;
  portalNaik: { dPct: number; triggerHarga: number; prob24j: number } | null;
  candles: Candle[];
  bukti: {
    nPrint: number; nCluster: number; oiD24j: number | null;
    dTopLong: number | null; dTopShort: number | null;
    funding: number; perpNet: number; spotNet: number; basisPct: number;
    orangRasioLong: number | null; squeezeSkor: number;
    akumulasiKlasifikasi: string; sumberHidup: number;
  };
};

export async function denyutModal(m: MasukanJiwa): Promise<ModalJiwa> {
  const st = bacaState();
  const now = Date.now();
  st.denyutKe += 1;
  st.at = new Date(now).toISOString();
  const jujur: string[] = [];

  // 1) jawab keyakinan terbuka pakai candle nyata
  const jawab = jawabKeyakinanInner(st, m.candles, now);
  const baruSelesai = st.terbuka.filter((b) => b.status !== 'TERBUKA');
  if (baruSelesai.length) {
    st.selesai = [...baruSelesai, ...st.selesai].slice(0, CAP_SELESAI);
    st.terbuka = st.terbuka.filter((b) => b.status === 'TERBUKA');
    for (const a of jawab.acara) catat(st, a);
  }

  // 2) lahirkan keyakinan baru dari VONIS (jenis berubah ATAU refresh 4 jam)
  const arahV = ARAH_VONIS[m.vonis.vonis];
  const lamaV = st.vonisTerakhir;
  const perluLahir = arahV !== undefined && (!lamaV || lamaV.jenis !== m.vonis.vonis || now - Date.parse(lamaV.at) >= 4 * JAM);
  if (perluLahir && arahV) {
    const targetPct = Math.max(1.2, Math.min(4.0, 0.7 * m.sigma24jPct));
    const stopPct = targetPct;
    // komponen formula keyakinan — semua terbuka
    const komSkor = Math.abs(m.vonis.skor - 50) / 50;
    const konsistensi = ([
      m.bukti.oiD24j !== null, (m.bukti.orangRasioLong ?? 0) > 0,
      Math.abs(m.bukti.spotNet) > 0, Math.abs(m.bukti.perpNet) > 0,
      m.bukti.dTopLong !== null || m.bukti.dTopShort !== null,
      m.bukti.nCluster > 0, m.bukti.sumberHidup >= 2,
    ].filter(Boolean).length) / 7;
    const rep = bacaAkurasiAturan(m.vonis.vonis);
    const akurasiAturan = rep.akurasi ?? 0.5;
    const umurJam = lamaV && lamaV.jenis === m.vonis.vonis ? (now - Date.parse(lamaV.at)) / JAM : 0;
    const kesegaran = umurJam === 0 ? 1 : Math.max(0, 1 - umurJam / 8);
    const buktiNyata = Math.min(1, (m.bukti.nPrint + 3 * m.bukti.nCluster) / 12);
    const K = Math.max(0, Math.min(0.95,
      0.30 + 0.22 * komSkor + 0.18 * konsistensi + 0.15 * akurasiAturan + 0.08 * kesegaran + 0.07 * buktiNyata));
    // kunci aturan yang hadir saat keyakinan lahir
    const aturan: string[] = [`VONIS:${m.vonis.vonis}`];
    if (m.bukti.funding >= 0.0006) aturan.push('FUNDING-PANAS');
    if ((m.bukti.orangRasioLong ?? 0.5) >= 0.58) aturan.push('KERUMUNAN-SESAK');
    if (m.bukti.dTopShort !== null && m.bukti.dTopShort >= 6) aturan.push('WHALE-ANTI-KERUMUNAN');
    if (m.bukti.dTopLong !== null && m.bukti.dTopLong >= 6) aturan.push('WHALE-ANTI-KERUMUNAN');
    if (m.bukti.spotNet < 0) aturan.push('SPOT-NEGATIF');
    if (m.bukti.spotNet > 0) aturan.push('SPOT-POSITIF');
    if (m.bukti.oiD24j !== null && m.bukti.oiD24j > 0) aturan.push('OI-TUMBUH');
    if (m.bukti.oiD24j !== null && m.bukti.oiD24j < 0) aturan.push('OI-SURUT');
    if (m.bukti.basisPct > 0.15) aturan.push('BASIS-PANAS');
    if (m.bukti.squeezeSkor >= 55) aturan.push('SQUEEZE-SKOR-TINGGI');
    if (m.bukti.akumulasiKlasifikasi && /AKUMULASI|SENYAP|SILENT/i.test(m.bukti.akumulasiKlasifikasi)) aturan.push('AKUMULASI-SENYAP');
    const id = `K${String(st.berikutId).padStart(3, '0')}`;
    st.berikutId += 1;
    const b: KeyakinanModal = {
      id, at: st.at, jenis: m.vonis.vonis, arah: arahV, asal: 'VONIS',
      hargaAwal: m.harga, targetPct: Math.round(targetPct * 100) / 100, stopPct: Math.round(stopPct * 100) / 100,
      hargaTarget: m.harga * (arahV === 'NAIK' ? 1 + targetPct / 100 : 1 - targetPct / 100),
      hargaStop: m.harga * (arahV === 'NAIK' ? 1 - stopPct / 100 : 1 + stopPct / 100),
      deadlineAt: new Date(now + 24 * JAM).toISOString(),
      keyakinan: Math.round(K * 1000) / 1000,
      komponen: {
        skor: Math.round(komSkor * 1000) / 1000, konsistensi: Math.round(konsistensi * 1000) / 1000,
        akurasiAturan: Math.round(akurasiAturan * 1000) / 1000, kesegaran: Math.round(kesegaran * 1000) / 1000,
        buktiNyata: Math.round(buktiNyata * 1000) / 1000,
      },
      dasar: `${m.vonis.vonis} skor ${m.vonis.skor} — ${m.vonis.implikasi}`,
      aturan, status: 'TERBUKA',
    };
    // dedupe: jangan dobel bila sudah ada keyakinan sejenis TERBUKA frsuh <1 jam
    const dobel = st.terbuka.some((x) => x.jenis === b.jenis && x.asal === 'VONIS' && now - Date.parse(x.at) < 1 * JAM);
    if (!dobel && st.terbuka.length < CAP_TERBUKA) {
      st.terbuka.push(b);
      catat(st, `${id} LAHIR — keyakinan ${b.jenis} ${b.arah} @${b.hargaAwal.toFixed(5)} target ${b.targetPct}% stop ${b.stopPct}% deadline 24j; K=${b.keyakinan} (skor ${b.komponen.skor} · konsistensi ${b.komponen.konsistensi} · akurasi-aturan ${b.komponen.akurasiAturan} · kesegaran ${b.komponen.kesegaran} · bukti ${b.komponen.buktiNyata})`);
    } else if (dobel) {
      catat(st, `${id} ditolak lahir — masih ada keyakinan sejenis berumur <1 jam (anti-dobel)`);
    }
  }
  if (arahV !== undefined) st.vonisTerakhir = { jenis: m.vonis.vonis, at: st.at };

  // 3) lahirkan keyakinan PORTAL (magnet likuidasi — prediksi yang dulu bebas tanpa akuntabilitas)
  const portalPasang = (p: { triggerHarga: number; prob24j: number; dPct: number } | null, arah: 'NAIK' | 'TURUN', kunci: string) => {
    if (!p || p.triggerHarga <= 0) return;
    const dobel = st.terbuka.some((x) => x.asal === 'PORTAL' && x.arah === arah && Math.abs((x.hargaTarget - p.triggerHarga) / Math.max(p.triggerHarga, 1e-9)) < 0.0015);
    if (dobel || st.terbuka.length >= CAP_TERBUKA) return;
    const id = `M${String(st.berikutId).padStart(3, '0')}`;
    st.berikutId += 1;
    const K = Math.max(0.15, Math.min(0.9, 0.30 + p.prob24j * 0.5 + 0.10));
    const b: KeyakinanModal = {
      id, at: st.at, jenis: kunci, arah, asal: 'PORTAL',
      hargaAwal: m.harga, targetPct: Math.abs(p.dPct), stopPct: 0,
      hargaTarget: p.triggerHarga, hargaStop: 0,
      deadlineAt: new Date(now + 24 * JAM).toISOString(),
      keyakinan: Math.round(K * 1000) / 1000,
      komponen: { skor: 0, konsistensi: 0, akurasiAturan: 0, kesegaran: 1, buktiNyata: Math.round(p.prob24j * 1000) / 1000 },
      dasar: `portal waktu: magnet likuidasi ${arah === 'NAIK' ? 'atas' : 'bawah'} ${p.triggerHarga.toFixed(5)} (${p.dPct.toFixed(2)}%), korban est. — prob 24j ${(p.prob24j * 100).toFixed(0)}%`,
      aturan: [kunci], status: 'TERBUKA',
    };
    st.terbuka.push(b);
    catat(st, `${id} LAHIR — keyakinan portal ${kunci}: harga ${arah === 'NAIK' ? 'naik ke' : 'jatuh ke'} ${p.triggerHarga.toFixed(5)} dalam 24j (prob ${(p.prob24j * 100).toFixed(0)}%) — magnet kini punya akuntabilitas`);
  };
  portalPasang(m.portalNaik, 'NAIK', 'MAGNET-SHORT');
  portalPasang(m.portalTurun, 'TURUN', 'MAGNET-LONG');

  // 4) kalibrasi agregat + kepahaman
  const nTerjawab = st.selesai.length;
  const nBenar = st.selesai.filter((b) => b.status === 'DITEPATI').length;

  // 5) VITAMIN — kesaksian ke dewan AR-E11 (top-2 keyakinan + reputasi)
  const kesaksian: KesaksianModal[] = [];
  const urut = [...st.terbuka].sort((a, b) => b.keyakinan - a.keyakinan).slice(0, 2);
  for (const b of urut) {
    const rep = bacaAkurasiAturan(b.jenis);
    const reputasi = rep.akurasi !== null ? Math.max(0.2, Math.min(0.9, rep.akurasi)) : 0.6;
    kesaksian.push({
      dari: `OTAK-MODAL:${b.id}`,
      vote: b.arah === 'NAIK' ? 'NAIK' : 'TURUN',
      kekuatan: Math.round(b.keyakinan * (0.45 + 0.55 * reputasi) * 1000) / 1000,
      cara: `${b.asal === 'PORTAL' ? 'magnet portal' : 'vonis'} ${b.jenis} ${b.arah} @${b.hargaAwal.toFixed(5)} → target ${b.arah === 'NAIK' ? '+' : '−'}${b.targetPct}% 24j, K=${b.keyakinan}, rekam jejak ${rep.akurasi !== null ? `${(rep.akurasi * 100).toFixed(0)}% (${rep.n} sampel)` : `${rep.n} sampel terjawab`} — keyakinan terbuka yang bisa DIBUKTIKAN salah (modal punya neuron, bukan mesin)`,
    });
  }

  const kepahaman = kepahamanList(st);
  const vitamin = {
    aktif: kesaksian.length > 0,
    teks: kesaksian.length
      ? `${kesaksian.length} keyakinan modal bersuara (${kesaksian.map((k) => `${k.dari.replace('OTAK-MODAL:', '')}=${k.vote}`).join(', ')}) dikirim ke dewan bukti AR-E11 arahVonis (bobot 0,09) · ${st.terbuka.length} keyakinan terbuka diawasi · ${kepahaman.length} aturan kepahaman diberi rapor — pondasi modal ikut memutuskan arah, bukan mayat`
      : 'tak ada keyakinan terbuka saat ini (semua sudah dijawab — keyakinan berikut lahir saat pedang berganti jenis) — otak modal tetap berdenyut dan jujur menunggu, TIDAK memalsukan janji',
  };

  const jiwa: ModalJiwa = {
    at: st.at, denyutKe: st.denyutKe,
    keyakinanTerbuka: st.terbuka,
    keyakinanSelesai: st.selesai.slice(0, 12),
    kalibrasi: { nTerjawab, nBenar, akurasi: nTerjawab > 0 ? nBenar / nTerjawab : 0 },
    kepahaman,
    modulasi: m.vonis.modulasi,
    kesaksian,
    diary: st.diary,
    vitamin,
    jujur: [
      ...jujur,
      'HUKUM DUA PEDANG (perintah pemilik 2026-11-25): pasar hanya punya dua pedang — bunuh short atau bunuh long; vonis dilarang diam, komitmen wajib walau bukti tipis (skor rendah menandai yakin-rendah, BUKAN izin netral)',
      'MELEWAT dihitung SALAH (konservatif) — janji gerak yang tak terwujud dianggap kegagalan, bukan dihapus',
      'modulasi vonis menyala setelah ≥4 sampel terjawab per jenis — akurasi muda tak boleh menyetir skor, tapi tak boleh menghalangi komitmen pedang',
      'target/stop keyakinan dari σ24j candle nyata — bukan angka yang dipilih agar selalu menang',
      'satu candle menyentuh target & stop sekaligus dihitung GAGAL (konservatif — tak memberi diri sendiri angka bagus)',
    ],
  };
  tulisState(st);
  return jiwa;
}

// versi internal jawab yang mengembalikan acara (dipanggil dari denyutModal)
function jawabKeyakinanInner(st: ModalState, cs: Candle[], now: number): { acara: string[] } {
  const acara: string[] = [];
  for (const b of st.terbuka) {
    if (b.status !== 'TERBUKA') continue;
    const batas = Date.parse(b.deadlineAt);
    const mulai = Date.parse(b.at);
    const win = cs.filter((c) => c.t > mulai);
    if (b.asal === 'PORTAL') {
      const naik = b.arah === 'NAIK';
      const kena = win.find((c) => (naik ? c.h >= b.hargaTarget : c.l <= b.hargaTarget));
      if (kena) {
        b.status = 'DITEPATI';
        b.dijawabAt = new Date(kena.t).toISOString();
        b.hargaAkhir = kena.c;
        b.cerita = `magnet ${naik ? 'atas' : 'bawah'} ${b.hargaTarget.toFixed(5)} DISENTUH candle ${new Date(kena.t).toLocaleString('id-ID')} — prediksi portal dibayar oleh pasar`;
        for (const k of b.aturan) nilaiKepahaman(st, k, true);
        acara.push(`${b.id} (${b.jenis}) DITEPATI — magnet portal tersentuh`);
      } else if (now > batas) {
        b.status = 'GAGAL';
        b.dijawabAt = new Date(now).toISOString();
        b.hargaAkhir = cs.length ? cs[cs.length - 1].c : b.hargaAwal;
        b.cerita = `kedaluwarsa tanpa sentuhan — magnet TIDAK tertarik; prob portal diuji dan kalah`;
        for (const k of b.aturan) nilaiKepahaman(st, k, false);
        acara.push(`${b.id} (${b.jenis}) GAGAL — magnet portal tak tersentuh`);
      }
      continue;
    }
    const targetKena = win.findIndex((c) => (b.arah === 'NAIK' ? c.h >= b.hargaTarget : c.l <= b.hargaTarget));
    const stopKena = win.findIndex((c) => (b.arah === 'NAIK' ? c.l <= b.hargaStop : c.h >= b.hargaStop));
    if (targetKena >= 0 && (stopKena < 0 || targetKena < stopKena)) {
      const c = win[targetKena];
      b.status = 'DITEPATI';
      b.dijawabAt = new Date(c.t).toISOString();
      b.hargaAkhir = c.c;
      b.cerita = `target ${b.targetPct.toFixed(2)}% dicapai (${b.arah === 'NAIK' ? 'naik' : 'jatuh'}) pada candle ${new Date(c.t).toLocaleString('id-ID')} sebelum stop — janji gerak terbayar`;
      for (const k of b.aturan) nilaiKepahaman(st, k, true);
      acara.push(`${b.id} (${b.jenis}) DITEPATI — ${b.cerita}`);
    } else if (stopKena >= 0) {
      const c = win[stopKena];
      b.status = 'GAGAL';
      b.dijawabAt = new Date(c.t).toISOString();
      b.hargaAkhir = c.c;
      b.cerita = `stop dicapai dulu (${b.arah === 'NAIK' ? 'harga sapu ke bawah' : 'harga dorong ke atas'}) pada candle ${new Date(c.t).toLocaleString('id-ID')} — vonis ini salah arah`;
      for (const k of b.aturan) nilaiKepahaman(st, k, false);
      acara.push(`${b.id} (${b.jenis}) GAGAL — ${b.cerita}`);
    } else if (now > batas) {
      b.status = 'MELEWAT';
      b.dijawabAt = new Date(now).toISOString();
      b.hargaAkhir = cs.length ? cs[cs.length - 1].c : b.hargaAwal;
      const dPct = ((b.hargaAkhir - b.hargaAwal) / b.hargaAwal) * 100;
      b.cerita = `kedaluwarsa 24 jam tanpa kena target/stop (harga ${dPct >= 0 ? '+' : ''}${dPct.toFixed(2)}%) — dihitung SALAH konservatif: janji gerak tak terwujud`;
      for (const k of b.aturan) nilaiKepahaman(st, k, false);
      acara.push(`${b.id} (${b.jenis}) MELEWAT — kedaluwarsa tanpa terwujud`);
    }
  }
  return { acara };
}
