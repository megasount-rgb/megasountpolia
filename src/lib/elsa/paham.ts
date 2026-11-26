// ============================================================
// MICAPROFITA-ELSA · OTAK PAHAM — NEURON PEMAHAMAN KOIN ELSA
// (keluhan pemilik 2026-11-26): "tab aliran & ujian 500 dan ujian
// mandiri masih tak miliki neuron — seakan amigdala yang gak aktif,
// padahal harusnya miliki ruh. Dia tidak benar-benar pahami pasar
// koin yang ditentukan, harusnya dia kuasai. Ini bahaya — bisa jadi
// tumor kalau mereka tidak diarahkan ke koin yang dituju."
// Diagnosa jujur yang ditemukan di kode:
//   · otak aliran memakai model statis (dilatih koin lama EVAA/
//     PIEVERSE/AGT = TUMOR yang dimaksud pemilik), tiap vonis
//     dihitung lalu DIBUANG — tak pernah dicek candle nyata,
//     tak pernah belajar.
//   · ujian mandiri mengadili hari demi hari tapi hasilnya hanya
//     jadi daftar — tak ada kepahaman yang tertambang per regime,
//     tak ada yang mengalir balik ke keyakinan.
// Hukum organ ini (amigdala yang MENYALA):
//   1) MENGINGAT  — tiap vonis aliran dicatat lengkap (arah, korban,
//      alarm, skor, regime medan) — tidak ada vonis yang dibuang.
//   2) DIADILI    — 6 jam kemudian candle + likuidasi NYATA ELSA
//      menghakimi janji itu: arah benar/salah, sisi korban benar/
//      salah. Rekam jejak tumbuh sendiri, ELSA-SAJA (koin yang
//      dituju) — bukan warisan koin lama.
//   3) MENGERTI   — tiap hari yang diadili ujian mandiri ditambang
//      jadi kepahaman PER REGIME medan ELSA (momentum × volatilitas,
//      diukur dari candle ELSA sendiri): di regime mana formula
//      sehat, di mana rapuh.
//   4) KUASAI KOIN — profil medan ELSA diukur dari data ELSA sendiri
//      (harian + jam): seberapa besar geseran harian, seberapa sering
//      funding dingin, siapa yang cair. Bukan klaim — pengukuran.
//   5) MENGALIR BALIK — rekam jejak yang sudah diadili MENGOREKSI
//      keyakinan vonis aliran berikutnya (delta + dasar terbuka),
//      pelajaran tampil di kedua tab dan dicatat di buku otonomi.
//   6) SENANTIASA MENYALA — jantung denyut yang menambang tiap 30
//      menit & tiap candle tutup; aliran mengadili tiap kali bernapas.
//      Tidak menunggu halaman dibuka. Tanpa tombol.
// Kosakata: neuron · kepahaman tertambang · regime medan · rekam
// jejak · diadili candle nyata · efek domino (semua terdaftar).
// ============================================================
import fs from 'fs';
import { catatOtonomi } from './otonomi';

const DIR = '/home/z/my-project/db/elsa/paham';
const FILE_NEURON = `${DIR}/neuron.json`;
const FILE_VONIS = `${DIR}/aliran_vonis.json`;
const RIWAYAT_HARIAN = '/home/z/my-project/db/elsa/riwayat_harian.json';
const CAP_VONIS = 400;
const CAP_PELAJARAN = 60;

// ---------------- tipe ----------------
export type VonisAliran = {
  at: string; barT: number;
  arah: 'NAIK' | 'TURUN'; korban: 'SHORT' | 'LONG' | null;
  alarm: boolean; alarmLevel: string;
  harga: number; skorArah: number; skorKorban: number;
  regime: string;
  hasil?: {
    diadiliAt: string; net6jPct: number; arahReal: 'NAIK' | 'TURUN'; arahBenar: boolean;
    korbanReal: 'SHORT' | 'LONG' | 'TANPA_DOMINAN' | null; korbanBenar: boolean | null;
    liqLongUsd: number; liqShortUsd: number;
  };
};
type Pelajaran = { id: string; at: string; asal: string; teks: string; bukti: string };
type RegimeStat = { n: number; benar: number; netPct: number; minedN: number };
type ProfilHarian = { at: string | null; nHari: number; medianPct: number | null; p90Pct: number | null; naikPct: number | null; turunPct: number | null; terburuk: { hari: string; pct: number } | null; terbaik: { hari: string; pct: number } | null; metode: string };
type ProfilJam = { at: string | null; nJam: number; fundingMedian: number | null; fundingNegatifPct: number | null; liq24jLongUsd: number | null; liq24jShortUsd: number | null; jamNaikPct: number | null; metode: string };
type NeuronFile = {
  versi: number; at: string; denyutKe: number;
  profilHarian: ProfilHarian; profilJam: ProfilJam;
  regime: Record<string, RegimeStat>;
  pelajaran: Pelajaran[];
  akurasiTerakhir: number | null;
};
export type PahamData = {
  at: string; denyutKe: number;
  rekam: {
    nVonis: number; diadili: number;
    benarArah: number | null; benarKorban: number | null; benarKorbanN: number;
    koreksi: { nilai: number; delta: number; dasar: string } | null;
    terakhir: { at: string; arah: string; korban: string | null; alarmLevel: string; harga: number; regime: string; hasilArah: string | null; hasilKorban: string | null; net6jPct: number | null }[];
  };
  profil: { harian: ProfilHarian; jam: ProfilJam };
  regime: { kunci: string; n: number; rate: number; netPct: number }[];
  pelajaran: Pelajaran[];
  catatan: string[];
};

// ---------------- io ----------------
function baca<T>(file: string, def: T): T {
  try {
    fs.mkdirSync(DIR, { recursive: true });
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch { /* abai */ }
  return def;
}
function tulis(file: string, d: unknown) {
  try {
    fs.mkdirSync(DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(d));
  } catch { /* abai */ }
}
function neuron(): NeuronFile {
  return baca<NeuronFile>(FILE_NEURON, {
    versi: 1, at: new Date().toISOString(), denyutKe: 0,
    profilHarian: { at: null, nHari: 0, medianPct: null, p90Pct: null, naikPct: null, turunPct: null, terburuk: null, terbaik: null, metode: 'geseran tutup-ke-tutup candle harian ELSA (memori riwayat yang tumbuh)' },
    profilJam: { at: null, nJam: 0, fundingMedian: null, fundingNegatifPct: null, liq24jLongUsd: null, liq24jShortUsd: null, jamNaikPct: null, metode: 'stats jam kontrak ELSA Gate.io (240 jam tutup terakhir)' },
    regime: {}, pelajaran: [], akurasiTerakhir: null,
  });
}
function tulisNeuron(n: NeuronFile) {
  n.at = new Date().toISOString();
  tulis(FILE_NEURON, n);
}

// ---------------- pelajaran — satu pintu, id stabil (perbarui, bukan menumpuk) ----------------
function tempelPelajaran(n: NeuronFile, p: Pelajaran) {
  const ada = n.pelajaran.findIndex((x) => x.id === p.id);
  if (ada >= 0) n.pelajaran[ada] = p; else n.pelajaran.unshift(p);
  n.pelajaran.sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  n.pelajaran = n.pelajaran.slice(0, CAP_PELAJARAN);
}

// ============================================================
// (0b) TANAM PELAJARAN KASUS — otak kasus ("ini gambar kasus!!") menanam
// neuron langsung ke akumulasi kepahaman: setiap pelajaran ledakan nyata
// jadi Pelajaran berasal KASUS-IGNISI yang tampil di panel paham & dibaca
// guru. Satu pintu: id stabil KASUS-<id> — diperbarui, bukan menumpuk.
// ============================================================
export function tanamPelajaranKasus(daftar: { id: string; isi: string; bukti: string }[]): number {
  const n = neuron();
  let berubah = 0;
  for (const p of daftar) {
    const ada = n.pelajaran.findIndex((x) => x.id === p.id);
    if (ada < 0) {
      tempelPelajaran(n, {
        id: p.id, at: new Date().toISOString(),
        asal: 'KASUS-IGNISI',
        teks: p.isi, bukti: p.bukti,
      });
      berubah += 1;
    } else if (n.pelajaran[ada].teks !== p.isi) {
      n.pelajaran[ada].teks = p.isi;
      n.pelajaran[ada].bukti = p.bukti;
      n.pelajaran[ada].at = new Date().toISOString();
      berubah += 1;
    }
  }
  if (berubah > 0) tulisNeuron(n);
  return berubah;
}

// ============================================================
// (1) CATAT VONIS ALIRAN — tidak ada vonis yang dibuang lagi
// ============================================================
export function catatVonisAliran(v: VonisAliran): void {
  const log = baca<VonisAliran[]>(FILE_VONIS, []);
  if (log.some((x) => x.barT === v.barT)) return; // bar sama = vonis sama, jangan duplikat
  log.unshift(v);
  tulis(FILE_VONIS, log.slice(0, CAP_VONIS));
}

// ============================================================
// (2) ADILI VONIS LAMA — candle + likuidasi NYATA ELSA menghakimi
// ============================================================
type BarAdil = { t: number; c: number; liqLong: number; liqShort: number };
export function adiliVonisAliran(bars: BarAdil[]): { baru: number; ringkas: string | null } {
  if (bars.length < 8) return { baru: 0, ringkas: null };
  const log = baca<VonisAliran[]>(FILE_VONIS, []);
  const idxOf = new Map<number, number>();
  bars.forEach((b, i) => idxOf.set(b.t, i));
  let baru = 0;
  const hasilBaru: string[] = [];
  for (const v of log) {
    if (v.hasil) continue;
    const i = idxOf.get(v.barT);
    if (i === undefined || i + 6 >= bars.length) continue; // 6 jam berikutnya belum tutup — menunggu medan
    const segmen = bars.slice(i + 1, i + 7);
    const hargaAkhir = bars[i + 6].c;
    const net6jPct = (hargaAkhir / v.harga - 1) * 100;
    const arahReal: 'NAIK' | 'TURUN' = hargaAkhir >= v.harga ? 'NAIK' : 'TURUN';
    const arahBenar = arahReal === v.arah;
    // sisi yang cair di 6 jam itu — aturan dominan sama dgn panel: 2.5×
    let lLiq = 0, sLiq = 0;
    for (const b of segmen) { lLiq += b.liqLong; sLiq += b.liqShort; }
    const korbanReal: 'SHORT' | 'LONG' | 'TANPA_DOMINAN' | null =
      sLiq >= 2.5 * Math.max(lLiq, 1) ? 'SHORT' : lLiq >= 2.5 * Math.max(sLiq, 1) ? 'LONG' : 'TANPA_DOMINAN';
    const korbanBenar = korbanReal === 'TANPA_DOMINAN' || v.korban === null ? null : korbanReal === v.korban;
    v.hasil = {
      diadiliAt: new Date().toISOString(), net6jPct: Math.round(net6jPct * 100) / 100,
      arahReal, arahBenar, korbanReal, korbanBenar,
      liqLongUsd: Math.round(lLiq), liqShortUsd: Math.round(sLiq),
    };
    baru += 1;
    hasilBaru.push(`vonis ${new Date(v.barT * 1000).toISOString().slice(5, 16)} arah ${v.arah}→${arahBenar ? 'BENAR' : 'SALAH'} (net 6j ${net6jPct.toFixed(1)}%)${v.korban && korbanReal !== 'TANPA_DOMINAN' ? `, korban ${v.korban}→${korbanBenar ? 'BENAR' : 'SALAH'} (yang cair: ${korbanReal} $${Math.round(korbanReal === 'SHORT' ? sLiq : lLiq)})` : ', tanpa sisi dominan'}`);
  }
  if (baru > 0) {
    tulis(FILE_VONIS, log);
    const n2 = neuron();
    // luka harus dicatat — vonis alarm yang salah = pelajaran paling mahal
    for (const v of log.filter((x) => x.hasil && x.hasil.arahBenar === false && x.alarm).slice(0, 3)) {
      tempelPelajaran(n2, {
        id: `ALIRAN|LUKA|${v.barT}`, at: new Date().toISOString(), asal: 'ALIRAN',
        teks: `vonis alarm ${v.alarmLevel} arah ${v.arah} meleset di regime ${v.regime} — candle nyata bergerak ${v.hasil!.arahReal} (net 6j ${v.hasil!.net6jPct.toFixed(1)}%)`,
        bukti: `harga vonis $${v.harga.toPrecision(5)} · skor arah ${v.skorArah} · skor korban ${v.skorKorban} · diadili ${v.hasil!.diadiliAt}`,
      });
    }
    tulisNeuron(n2);
    if (hasilBaru.length) {
      catatOtonomi({
        mesin: 'PAHAM', pemicu: 'ALIRAN', mandiri: true,
        hasil: `${baru} vonis aliran diadili candle+likuidasi nyata ELSA: ${hasilBaru[0]}${hasilBaru.length > 1 ? ` (+${hasilBaru.length - 1} lain)` : ''}`,
        bukti: `rekam jejak aliran kini ${log.filter((x) => x.hasil).length} vonis diadili — koreksi keyakinan berikutnya dihitung dari angka ini`,
      });
    }
  }
  return { baru, ringkas: hasilBaru.length ? hasilBaru.join(' · ') : null };
}

// ============================================================
// (3) REKAM JEJAK + KOREKSI KEYAKINAN — pengalaman mengalir balik
// ============================================================
export function koreksiKeyakinanAliran(): { nilai: number; delta: number; dasar: string } | null {
  const log = baca<VonisAliran[]>(FILE_VONIS, []);
  const diadili = log.filter((x) => x.hasil);
  if (diadili.length < 3) return null; // medan belum bicara cukup — tanpa koreksi, tanpa klaim
  const benar = diadili.filter((x) => x.hasil!.arahBenar).length;
  const rate = benar / diadili.length;
  const delta = Math.max(-12, Math.min(12, Math.round((rate - 0.5) * 60)));
  const dasar = `neuron paham (rekam jejak ELSA nyata): ${benar}/${diadili.length} vonis teradili arahnya benar (${(rate * 100).toFixed(0)}%) → keyakinan vonis aliran dikoreksi ${delta >= 0 ? '+' : ''}${delta} poin — pengalaman koin ini sendiri, bukan warisan koin lama`;
  return { nilai: rate, delta, dasar };
}

// ============================================================
// (4) TAMBAH KOPRAH UJIAN MANDIRI → KEPAMAHAN PER REGIME MEDAN
// ============================================================
export type BarisTambang = { hari: string; vonis: string; kepastian: number; benar: boolean; netPct: number };
type CandlePaham = { t: number; o: number; h: number; l: number; c: number; v: number };
const hariOf = (t: number) => new Date(t).toISOString().slice(0, 10);
const medianOf = (a: number[]): number | null => {
  if (!a.length) return null;
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor((s.length - 1) / 2)];
};

export function belajarDariUjianMandiri(rows: BarisTambang[], cs: CandlePaham[]): void {
  if (!rows.length || cs.length < 30) return;
  const n = neuron();
  // ---- regime tiap hari diadili: momentum & volatilitas HARI SEBELUMNYA
  // (yang tahu sebelum vonis lahir — anti bocor) — diukur dari candle ELSA sendiri.
  // DIBANGUN ULANG dari nol tiap tambang (denyut mengadili ulang semua hari —
  // statistik regime harus idempotent, tidak boleh menghitung ganda).
  const minedNLama = new Map<string, number>();
  for (const [k, s] of Object.entries(n.regime)) minedNLama.set(k, s.minedN);
  const reg: Record<string, RegimeStat> = {};
  const petaHari = new Map<string, number>();
  cs.forEach((c, i) => petaHari.set(hariOf(c.t), i));
  const geseran = cs.slice(1).map((c, i) => (c.c / cs[i].c - 1) * 100);
  const medianGeser = medianOf(geseran.map(Math.abs)) ?? 3;
  let terpakai = 0;
  for (const r of rows) {
    const i = petaHari.get(r.hari);
    if (i === undefined || i < 2) continue;
    const momPrev = (cs[i - 1].c / cs[i - 2].c - 1) * 100;
    const mom = Math.abs(momPrev) >= medianGeser * 2 ? (momPrev > 0 ? 'TREN_NAIK' : 'TREN_TURUN') : 'DATAR';
    const vol = Math.abs(momPrev) >= medianGeser * 1.5 ? 'VOL_TINGGI' : 'VOL_RENDAH';
    const kunci = `${mom}|${vol}`;
    const s = (reg[kunci] ??= { n: 0, benar: 0, netPct: 0, minedN: minedNLama.get(kunci) ?? 0 });
    s.n += 1; s.benar += r.benar ? 1 : 0; s.netPct += r.netPct;
    terpakai += 1;
  }
  if (!terpakai) return;
  n.regime = reg;
  // ---- profil medan ELSA (harian) — pengukuran, bukan klaim
  const naik = geseran.filter((g) => g > 0).length;
  let terburuk: { hari: string; pct: number } | null = null;
  let terbaik: { hari: string; pct: number } | null = null;
  for (let i = 1; i < cs.length; i++) {
    const pct = (cs[i].c / cs[i - 1].c - 1) * 100;
    const hari = hariOf(cs[i].t);
    if (!terburuk || pct < terburuk.pct) terburuk = { hari, pct: Math.round(pct * 100) / 100 };
    if (!terbaik || pct > terbaik.pct) terbaik = { hari, pct: Math.round(pct * 100) / 100 };
  }
  const sAbs = [...geseran.map(Math.abs)].sort((a, b) => a - b);
  n.profilHarian = {
    at: new Date().toISOString(), nHari: geseran.length,
    medianPct: medianGeser, p90Pct: sAbs[Math.floor((sAbs.length - 1) * 0.9)],
    naikPct: Math.round((naik / geseran.length) * 1000) / 10,
    turunPct: Math.round(((geseran.length - naik) / geseran.length) * 1000) / 10,
    terburuk, terbaik,
    metode: 'geseran tutup-ke-tutup candle harian ELSA (memori riwayat yang tumbuh)',
  };
  // ---- pelajaran per regime (perbarui entri id sama — tumbuh, bukan menumpuk)
  for (const [kunci, s] of Object.entries(reg)) {
    if (s.n < 4 || s.n === s.minedN) continue;
    const rate = s.benar / s.n;
    const net = s.netPct / s.n;
    if (rate <= 0.34) {
      tempelPelajaran(n, {
        id: `UJIAN_MANDIRI|RAPUH|${kunci}`, at: new Date().toISOString(), asal: 'UJIAN_MANDIRI',
        teks: `regime medan ${kunci} = titik rapuh formula di ELSA: vonis benar hanya ${s.benar}/${s.n} hari (${(rate * 100).toFixed(0)}%), net rerata ${net.toFixed(1)}% — di medan begini keyakinan besar harus dijaga curiga`,
        bukti: `ditambang dari ${terpakai} hari diadili ujian mandiri; geseran median harian ELSA ${medianGeser.toFixed(1)}% sebagai ambang regime`,
      });
    } else if (rate >= 0.67) {
      tempelPelajaran(n, {
        id: `UJIAN_MANDIRI|SEHAT|${kunci}`, at: new Date().toISOString(), asal: 'UJIAN_MANDIRI',
        teks: `regime medan ${kunci} = tanah sehat formula di ELSA: vonis benar ${s.benar}/${s.n} hari (${(rate * 100).toFixed(0)}%), net rerata ${net.toFixed(1)}% — di medan begini kepastian boleh berdiri tegak`,
        bukti: `ditambang dari ${terpakai} hari diadili ujian mandiri; geseran median harian ELSA ${medianGeser.toFixed(1)}% sebagai ambang regime`,
      });
    }
    s.minedN = s.n;
  }
  // ---- luka global: akurasi keseluruhan berubah > 5pp dari tambang sebelumnya
  const benarTotal = rows.filter((r) => r.benar).length;
  const akurasi = benarTotal / rows.length;
  if (n.akurasiTerakhir !== null && Math.abs(akurasi - n.akurasiTerakhir) > 0.05) {
    const naik2 = akurasi > n.akurasiTerakhir;
    tempelPelajaran(n, {
      id: 'UJIAN_MANDIRI|GESER_AKURASI', at: new Date().toISOString(), asal: 'UJIAN_MANDIRI',
      teks: `akurasi keseluruhan vonis pada seluruh hari diadili bergeser ${naik2 ? 'naik' : 'turun'} ${(n.akurasiTerakhir * 100).toFixed(1)}% → ${(akurasi * 100).toFixed(1)}% — medan ELSA berubah sifat; formula harus diuji ulang regime per regime`,
      bukti: `${benarTotal}/${rows.length} hari benar pada tambang ini`,
    });
  }
  n.akurasiTerakhir = akurasi;
  tulisNeuron(n);
  const pelBaru = Object.values(reg).filter((s) => s.minedN > 0).length;
  catatOtonomi({
    mesin: 'PAHAM', pemicu: 'JANTUNG', mandiri: true,
    hasil: `kepahaman ELSA ditambang ulang: ${Object.keys(reg).length} regime medan dipetakan (${terpakai} hari diadili), ${n.pelajaran.length} pelajaran hidup, akurasi keseluruhan ${(akurasi * 100).toFixed(1)}%`,
    bukti: `profil medan: median geseran harian ${medianGeser.toFixed(1)}%, naik ${(n.profilHarian.naikPct ?? 0).toFixed(0)}% hari / turun ${(n.profilHarian.turunPct ?? 0).toFixed(0)}% hari · terburuk ${n.profilHarian.terburuk?.hari ?? '—'} (${n.profilHarian.terburuk?.pct ?? 0}%)`,
  });
}

// ============================================================
// (5) PROFIL MEDAN (JAM) — dari stats Gate saat aliran bernapas
// ============================================================
export function perbaruiProfilJam(p: { nJam: number; funding: number[]; liq24jLongUsd: number; liq24jShortUsd: number; jamNaik: number }): void {
  const n = neuron();
  n.profilJam = {
    at: new Date().toISOString(), nJam: p.nJam,
    fundingMedian: medianOf(p.funding), 
    fundingNegatifPct: p.funding.length ? Math.round((p.funding.filter((f) => f < 0).length / p.funding.length) * 1000) / 10 : null,
    liq24jLongUsd: Math.round(p.liq24jLongUsd), liq24jShortUsd: Math.round(p.liq24jShortUsd),
    jamNaikPct: p.nJam ? Math.round((p.jamNaik / p.nJam) * 1000) / 10 : null,
    metode: 'stats jam kontrak ELSA Gate.io (240 jam tutup terakhir)',
  };
  tulisNeuron(n);
}

export function tandaiDenyutPaham(detakKe: number): void {
  const n = neuron();
  n.denyutKe = detakKe;
  tulisNeuron(n);
}

// ============================================================
// (6) PAYLOAD UI — papan neuron paham (jujur: n kecil tampil apa adanya)
// ============================================================
export function bacaPaham(): PahamData {
  const n = neuron();
  const log = baca<VonisAliran[]>(FILE_VONIS, []);
  const diadili = log.filter((x) => x.hasil);
  const benarArah = diadili.length ? diadili.filter((x) => x.hasil!.arahBenar).length / diadili.length : null;
  const berKorban = diadili.filter((x) => x.hasil!.korbanBenar !== null);
  const benarKorban = berKorban.length ? berKorban.filter((x) => x.hasil!.korbanBenar === true).length / berKorban.length : null;
  const koreksi = koreksiKeyakinanAliran();
  const catatan: string[] = [
    'Organs ini amigdala yang MENYALA: tiap vonis aliran dicatat, tiap 6 jam candle+likuidasi nyata ELSA mengadilinya, tiap denyut jantung menambang kepahaman dari hari yang diadili — tanpa menunggu halaman dibuka.',
    'Rekam jejak & koreksi keyakinan dihitung HANYA dari ELSA (koin yang dituju) — model lama warisan EVAA/PIEVERSE/AGT tetap dipakai sebagai prior masa lalu, tapi lapisan hidup inilah yang kini menguasai koin ini.',
    koreksi
      ? `Kepahaman mengalir balik: ${koreksi.dasar}.`
      : 'Belum ada koreksi keyakinan: rekam jejak diadili kurang dari 3 vonis — medan mulai menghakimi 6 jam setelah vonis pertama dicatat; papan ini terisi sendiri, tanpa tombol.',
  ];
  return {
    at: new Date().toISOString(), denyutKe: n.denyutKe,
    rekam: {
      nVonis: log.length, diadili: diadili.length,
      benarArah: benarArah === null ? null : Math.round(benarArah * 1000) / 1000,
      benarKorban: benarKorban === null ? null : Math.round(benarKorban * 1000) / 1000,
      benarKorbanN: berKorban.length,
      koreksi,
      terakhir: log.slice(0, 12).map((v) => ({
        at: v.at, arah: v.arah, korban: v.korban, alarmLevel: v.alarmLevel,
        harga: v.harga, regime: v.regime,
        hasilArah: v.hasil ? (v.hasil.arahBenar ? 'BENAR' : 'SALAH') : null,
        hasilKorban: v.hasil ? (v.hasil.korbanBenar === null ? (v.hasil.korbanReal === 'TANPA_DOMINAN' ? 'TANPA_DOMINAN' : '—') : v.hasil.korbanBenar ? 'BENAR' : 'SALAH') : null,
        net6jPct: v.hasil?.net6jPct ?? null,
      })),
    },
    profil: { harian: n.profilHarian, jam: n.profilJam },
    regime: Object.entries(n.regime).map(([kunci, s]) => ({ kunci, n: s.n, rate: s.n ? s.benar / s.n : 0, netPct: Math.round((s.n ? s.netPct / s.n : 0) * 100) / 100 })).sort((a, b) => b.n - a.n),
    pelajaran: n.pelajaran.slice(0, 14),
    catatan,
  };
}
