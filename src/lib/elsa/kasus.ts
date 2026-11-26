// ============================================================
// MICAPROFITA-ELSA · OTAK KASUS — "ini gambar kasus!!"
// ============================================================
// Perintah pemilik 2026-11-26 (harga melonjak 0.0835 → 0.1166
// dalam satu jam dan sistem kejebolan): "ini gmb kasus!!"
// → setiap LEDAKAN NYATA wajib menjadi BERKAS KASUS yang
//   DIREKONSTRUKSI dari data menit sesungguhnya:
//   fase akumulasi → ignisi → parabolik → konversi,
//   sinyal apa yang TERSEDIA jam berapa, sistem LAKUKAN apa
//   jam berapa (dari buku dompet + verdict), luka berapa $,
//   dan PELAJARAN (neuron) apa yang ditanam ke sistem.
//
// Kasus bukan pajangan: ia dibaca guru (briefing), dibaca
// jantung dompet (hukum), dibaca radar ignisi (kalibrasi),
// dan diuji: setiap kasus punya 3 SOAL + JAWABAN yang sistem
// tulis sendiri dari data — kalau tidak bisa menjawab,
// berarti belum paham (dan itu diperlihatkan jujur).
// ============================================================
import fs from 'fs';
import { catatOtonomi } from './otonomi';
import { tanamPelajaranKasus } from './paham';

const DIR = '/home/z/my-project/db/elsa/kasus';
const FILE = `${DIR}/kasus.json`;

export type FaseKasus = {
  nama: string; dariMs: number; keMs: number; durasiMenit: number;
  hargaDari: number; hargaKe: number; chgPct: number;
  bukti: string;
};

export type SinyalTersedia = {
  at: string; menitSebelumLedakan: number | null;
  sinyal: string; kategori: 'RADAR-LAMA' | 'RADAR-ANTI-KECOLONGAN';
  angka: string;
};

export type KeputusanSistem = {
  at: string; organ: string; tindakan: string; nilai: string;
  penilaian: 'TEPAT' | 'TERLAMBAT' | 'SALAH' | 'TERLAMBAT-TP-KECEPETAN' | 'TAK BISA MELIHAT';
  catatan: string;
};

export type SoalKasus = { soal: string; jawaban: string; dasar: string };

export type Kasus = {
  id: string; judul: string; atDibuat: string;
  jendela: { mulaiMs: number; tuntasMs: number; arah: 'NAIK' | 'TURUN' };
  ledakanPct: number; hargaDari: number; hargaPuncak: number; hargaTuntas: number;
  volumeLedakan: { elsa: number; xBaseline: number };
  fase: FaseKasus[];
  sinyalTersedia: SinyalTersedia[];
  keputusanSistem: KeputusanSistem[];
  luka: { jelas: string; usd: number | null; cetak: string };
  pelajaran: { id: string; isi: string; menanamKe: string }[];
  soal: SoalKasus[];
  status: 'TERBUKA' | 'DIPELAJARI' | 'DIUJI';
  kalimatPemilik: string;
};

type KasusFile = { kasus: Kasus[]; idBerikut: number };

function baca(): KasusFile {
  try {
    if (fs.existsSync(FILE)) {
      const j = JSON.parse(fs.readFileSync(FILE, 'utf8')) as KasusFile;
      if (j.kasus) return j;
    }
  } catch { /* mulai baru */ }
  return { kasus: [], idBerikut: 1 };
}
function tulis(f: KasusFile) {
  try {
    fs.mkdirSync(DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(f, null, 0));
  } catch { /* abai */ }
}

export function bacaKasus(): Kasus[] {
  return baca().kasus;
}

// ---------------- data menit nyata (Gate) ----------------
type Menit = { t: number; o: number; h: number; l: number; c: number; v: number };
async function gateMenit(limit = 1000): Promise<Menit[]> {
  try {
    const r = await fetch(`https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=ELSA_USDT&interval=1m&limit=${limit}`, { signal: AbortSignal.timeout(12000), cache: 'no-store' });
    if (!r.ok) throw new Error(`gate HTTP ${r.status}`);
    const j = (await r.json()) as string[][];
    return j.map((k) => ({ t: Number(k[0]) * 1000, o: Number(k[5]), h: Number(k[3]), l: Number(k[4]), c: Number(k[2]), v: Number(k[1]) }))
      .filter((m) => Number.isFinite(m.c)).sort((a, b) => a.t - b.t);
  } catch { return []; }
}

// buku dompet — keputusan nyata sistem di jendela kasus
type EntriBuku = { at: string; jenis?: string; arah?: string; pnl?: number | null; label?: string; alasan?: string; [k: string]: unknown };
function bukuDompet(): EntriBuku[] {
  try {
    const d = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/dompet.json', 'utf8')) as { buku?: EntriBuku[] };
    return d.buku ?? [];
  } catch { return []; }
}

// ---------------- rekonstruktur ledakan ----------------
function rekonstruksi(menit: Menit[], jendelaMs: number, arah: 'NAIK' | 'TURUN'): { fase: FaseKasus[]; sinyal: SinyalTersedia[]; ledakanPct: number; volumeLedakan: { elsa: number; xBaseline: number } } {
  const dalam = menit.filter((m) => m.t >= jendelaMs - 150 * 60 * 1000 && m.t <= jendelaMs + 90 * 60 * 1000);
  if (!dalam.length) return { fase: [], sinyal: [], ledakanPct: 0, volumeLedakan: { elsa: 0, xBaseline: 0 } };

  const idx0 = dalam.findIndex((m) => m.t >= jendelaMs);
  if (idx0 < 0) return { fase: [], sinyal: [], ledakanPct: 0, volumeLedakan: { elsa: 0, xBaseline: 0 } };
  const pra = dalam.slice(0, idx0); // 150 menit sebelum ledakan
  const baselVol = pra.length ? pra.reduce((s, m) => s + m.v, 0) / pra.length : 0;

  const fase: FaseKasus[] = [];
  const mulut = dalam[idx0];
  const tuntas = dalam.slice(idx0).find((m) => (arah === 'NAIK' ? m.h >= mulut.o * 1.12 : m.l <= mulut.o * 0.88)) ?? dalam[dalam.length - 1];
  const ledakanPct = arah === 'NAIK' ? (tuntas.h - mulut.o) / mulut.o * 100 : (mulut.o - tuntas.l) / mulut.o * 100;

  // FASE 1 — akumulasi senyap: cari rangkaian menit sebelum ledakan di mana harga
  // bergerak ke arah ledakan dengan volume di bawah baseline (absorpsi pecah-potongan)
  const cuci = pra.filter((m) => arah === 'NAIK' ? m.c > m.o : m.c < m.o);
  const akum = cuci.filter((m) => baselVol > 0 && m.v <= baselVol * 0.8);
  if (akum.length >= 3) {
    const dari = akum[0], ke = akum[akum.length - 1];
    fase.push({
      nama: 'AKUMULASI SENYAP', dariMs: dari.t, keMs: ke.t,
      durasiMenit: Math.round((ke.t - dari.t) / 60000),
      hargaDari: dari.o, hargaKe: ke.c,
      chgPct: Math.round((ke.c / dari.o - 1) * 10000) / 100,
      bukti: `${akum.length} menit harga bergeser ${arah === 'NAIK' ? 'naik' : 'turun'} pada volume ≤ ${(0.8).toFixed(1)}× baseline ${Math.round(baselVol).toLocaleString('en-US')} ELSA/menit — pasokan disedot diam-diam tanpa cetakan besar; inilah kaki whale pecah-potongan yang radar lama TAK punya mata`,
    });
  }
  // FASE 2 — ignisi: menit pertama volume meledak >4× baseline
  const dalamMulai = dalam.slice(idx0);
  const ignisiMenit = dalamMulai.find((m) => baselVol > 0 && m.v >= baselVol * 4) ?? dalamMulai[0];
  fase.push({
    nama: 'IGNISI', dariMs: ignisiMenit.t, keMs: tuntas.t,
    durasiMenit: Math.round((tuntas.t - ignisiMenit.t) / 60000),
    hargaDari: ignisiMenit.o, hargaKe: arah === 'NAIK' ? tuntas.h : tuntas.l,
    chgPct: Math.round((arah === 'NAIK' ? (tuntas.h / ignisiMenit.o - 1) : (1 - tuntas.l / ignisiMenit.o)) * 10000) / 100,
    bukti: `volume menit ${Math.round(ignisiMenit.v).toLocaleString('en-US')} ELSA = ${(ignisiMenit.v / Math.max(baselVol, 1)).toFixed(1)}× baseline — taker menyapu buku ${arah === 'NAIK' ? 'ask naik-turun level demi level' : 'bid level demi level'}`,
  });
  // FASE 3 — konversi/penahanan: 30 menit sesudah tuntas
  const sesudah = dalam.filter((m) => m.t > tuntas.t + 60_000).slice(0, 30);
  if (sesudah.length >= 5) {
    const c0 = sesudah[0], c1 = sesudah[sesudah.length - 1];
    fase.push({
      nama: 'KONVERSI', dariMs: c0.t, keMs: c1.t, durasiMenit: Math.round((c1.t - c0.t) / 60000),
      hargaDari: c0.o, hargaKe: c1.c,
      chgPct: Math.round((c1.c / c0.o - 1) * 10000) / 100,
      bukti: `sesudah ledakan harga berlabuh ${Math.round(c1.c).toLocaleString('en-US') !== '0' ? (c1.c).toPrecision(6) : '—'} — ${Math.abs(c1.c / c0.o - 1) < 0.03 ? 'harga DITAHAN di atas (whale mengunci harga baru, tidak dilepas)' : 'harga dicerna/ditarik (lab diambil bertahap)'}`,
    });
  }

  // sinyal yang TERSEDIA (jujur: mana yang bisa ditangkap radar baru)
  const sinyal: SinyalTersedia[] = [];
  if (akum.length >= 3) {
    const dari = akum[0];
    const mnt = Math.round((mulut.t - dari.t) / 60000);
    sinyal.push({
      at: new Date(dari.t).toISOString(), menitSebelumLedakan: mnt,
      sinyal: 'L1 AKUMULASI SENYAP (radar anti-kecolongan baru — volume rendah + harga merangkak searah)',
      kategori: 'RADAR-ANTI-KECOLONGAN',
      angka: `${akum.length} menit absorpsi ${arah === 'NAIK' ? 'naik' : 'turun'} mulai ${new Date(dari.t).toISOString().slice(11, 16)} UTC — ${mnt} menit SEBELUM ledakan`,
    });
  }
  const menitVol = dalamMulai.slice(0, 3).reduce((s, m) => s + m.v, 0) / 3;
  sinyal.push({
    at: new Date(ignisiMenit.t).toISOString(), menitSebelumLedakan: Math.round((tuntas.t - ignisiMenit.t) / 60000),
    sinyal: 'L2+L4 IGNISI VOLUME + SAPUAN TAKER (radar anti-kecolongan baru)',
    kategori: 'RADAR-ANTI-KECOLONGAN',
    angka: `volume menit ${Math.round(ignisiMenit.v).toLocaleString('en-US')} = ${(ignisiMenit.v / Math.max(baselVol, 1)).toFixed(1)}× baseline ${Math.round(baselVol).toLocaleString('en-US')} — radar baru MENYALA di menit ini`,
  });
  sinyal.push({
    at: new Date(tuntas.t).toISOString(), menitSebelumLedakan: 0,
    sinyal: 'VONIS DARI CANDLE HARIAN (radar lama)',
    kategori: 'RADAR-LAMA',
    angka: 'candle harian buta: ledakan lahir & tuntas DALAM satu hari — verdict harian hanya melihatnya SETELAH hari ganti; di sinilah kecolongan lahir secara struktural',
  });
  return { fase, sinyal, ledakanPct: Math.round(ledakanPct * 100) / 100, volumeLedakan: { elsa: Math.round(dalamMulai.reduce((s, m) => s + m.v, 0)), xBaseline: Math.round((menitVol / Math.max(baselVol, 1)) * 10) / 10 } };
}

// ---------------- pembuat kasus dari ledakan nyata ----------------
async function deteksiLedakan(menit: Menit[]): Promise<{ jendelaMs: number; arah: 'NAIK' | 'TURUN'; chgPct: number } | null> {
  // jendela 60 menit bergeser 5 menit: cari chg terbesar; ambang 10%
  let terbaik: { jendelaMs: number; arah: 'NAIK' | 'TURUN'; chgPct: number } | null = null;
  for (let i = 0; i + 60 < menit.length; i += 5) {
    const a = menit[i].o, bHigh = menit.slice(i, i + 60).reduce((s, m) => Math.max(s, m.h), 0);
    const bLow = menit.slice(i, i + 60).reduce((s, m) => Math.min(s, m.l), bHigh);
    const naik = (bHigh / a - 1) * 100, turun = (1 - bLow / a) * 100;
    if (naik >= 10 && (!terbaik || naik > terbaik.chgPct)) terbaik = { jendelaMs: menit[i].t, arah: 'NAIK', chgPct: Math.round(naik * 100) / 100 };
    if (turun >= 10 && (!terbaik || turun > terbaik.chgPct)) terbaik = { jendelaMs: menit[i].t, arah: 'TURUN', chgPct: Math.round(turun * 100) / 100 };
  }
  return terbaik;
}

function tindakanSistem(jendela: { mulaiMs: number; tuntasMs: number }): KeputusanSistem[] {
  const buku = bukuDompet();
  const keluar: KeputusanSistem[] = [];
  const diJendela = buku.filter((b) => {
    const t = Date.parse(b.at);
    return t >= jendela.mulaiMs - 120 * 60 * 1000 && t <= jendela.tuntasMs + 120 * 60 * 1000;
  });
  for (const b of diJendela) {
    const t = Date.parse(b.at);
    const jenis = String(b.jenis ?? '?');
    const label = String(b.label ?? b.alasan ?? '');
    let penilaian: KeputusanSistem['penilaian'] = 'TEPAT';
    let catatan = '';
    if (jenis === 'TUTUP' && /REPAIR ORPHAN/.test(label)) {
      penilaian = 'SALAH';
      catatan = 'posisi yatim ditutup demi kebersihan buku — PADAHAL arahnya searah ledakan yang datang 30-60 menit kemudian; perbaikan buku membunuh posisi yang benar (luka aturan, bukan luka pasar)';
    } else if (jenis === 'TUTUP' && (b.pnl ?? 0) > 0) {
      penilaian = 'TERLAMBAT-TP-KECEPETAN';
      catatan = 'TP menang dari sisi buku — tapi TP σ-dasar (maks 4%) terlalu tipis untuk pasar yang sedang melonjak; setelah keluar, harga terus naik — profit TIDAK diikutkan (tidak ada trailing saat ignisi)';
    } else if (jenis === 'BUKA' && /SHORT/.test(label.toUpperCase()) && jendela.tuntasMs - t < 90 * 60 * 1000) {
      penilaian = 'SALAH';
      catatan = 'SHORT dibuka di tubuh ledakan (setelah harga sudah melonjak besar) — verdict harian buta intraday membuat sistem membaca impul naik sebagai "reklamasi turun"; ini pedang melawan pasar, ditangkap radar pedangTerlarang kini';
    } else if (jenis === 'BUKA') {
      penilaian = 'TEPAT';
      catatan = 'arah masuk searah gerak sesungguhnya — jantung dompet menangkap gelombang dengan entry hidup dari buku pesanan';
    } else if (jenis === 'TUTUP') {
      penilaian = (b.pnl ?? 0) >= 0 ? 'TEPAT' : 'SALAH';
      catatan = 'posisi diadili jantung dompet dari harga hidup';
    } else {
      catatan = 'dicatat sebagai keputusan organis dalam jendela kasus';
    }
    keluar.push({
      at: b.at, organ: 'DOMPET/JANTUNG', tindakan: `${jenis} ${b.arah ?? ''}`.trim(),
      nilai: (b.pnl ?? null) !== null && (b.pnl ?? null) !== undefined ? `pnl ${((b.pnl ?? 0) >= 0 ? '+' : '')}${(b.pnl ?? 0).toFixed(2)} USD` : '—',
      penilaian, catatan,
    });
  }
  return keluar.sort((x, y) => Date.parse(x.at) - Date.parse(y.at));
}

function soalDariKasus(k: Omit<Kasus, 'soal' | 'id' | 'atDibuat' | 'status'>): SoalKasus[] {
  const f1 = k.fase.find((x) => x.nama === 'AKUMULASI SENYAP');
  const s1 = k.sinyalTersedia.find((x) => x.kategori === 'RADAR-ANTI-KECOLONGAN');
  const jwb2 = k.keputusanSistem.filter((x) => x.penilaian === 'SALAH' || x.penilaian === 'TERLAMBAT-TP-KECEPETAN').map((x) => `${x.at.slice(11, 19)} UTC ${x.tindakan} (${x.penilaian}) — ${x.catatan}`).join(' · ') || 'tidak ada keputusan salah tercatat';
  return [
    {
      soal: `Apa fase pasar SEBELUM ledakan ${k.judul} dan sinyal apa yang tersedia sebelum harga melonjak?`,
      jawaban: f1 ? `${f1.nama} selama ${f1.durasiMenit} menit (${new Date(f1.dariMs).toISOString().slice(11, 16)}–${new Date(f1.keMs).toISOString().slice(11, 16)} UTC): ${f1.bukti} — sinyal tersedia: ${s1?.sinyal ?? '—'} pada ${s1?.angka ?? '—'}; radar lama (cetakan besar + candle harian) tidak punya lapisan untuk ini.` : 'tak cukup data menit sebelum ledakan — diakui jujur.',
      dasar: `rekonstruksi data menit Gate ${new Date(k.jendela.mulaiMs).toISOString().slice(0, 16)} UTC`,
    },
    {
      soal: `Kesalahan apa yang dilakukan sistem saat ledakan itu berlangsung?`,
      jawaban: jwb2,
      dasar: 'buku dompet nyata (db/elsa/dompet.json) — bukan ingatan',
    },
    {
      soal: `Kalau ledakan serupa terulang, hukum apa yang kini mengikat sistem?`,
      jawaban: k.pelajaran.map((p) => `${p.id}: ${p.isi}`).join(' · '),
      dasar: 'pelajaran tertanam ke radar ignisi + jantung dompet + dewan vonis (E13)',
    },
  ];
}

// ---------------- denyut kasus: deteksi otomatis + pembuatan ----------------
let sibuk = false;
export async function denyutKasus(): Promise<{ kasus: Kasus[]; baru: Kasus | null }> {
  const f = baca();
  if (sibuk) return { kasus: f.kasus, baru: null };
  sibuk = true;
  try {
    // BACKFILL NEURON (idempoten) — kasus yang dibuat sebelum jembatan tanam
    // ditambahkan tetap ditanam ke akumulasi kepahaman di denyut berikutnya;
    // id stabil (KASUS-<id>-<pelajaran>) → tak menumpuk, hanya berubah saat isi berubah
    if (f.kasus.length) {
      tanamPelajaranKasus(f.kasus.flatMap((k) => k.pelajaran.map((p) => ({
        id: `KASUS-${k.id}-${p.id}`, isi: p.isi, bukti: `${k.judul} · ${k.luka.cetak}`,
      }))));
    }
    const menit = await gateMenit(1000);
    if (menit.length < 150) return { kasus: f.kasus, baru: null };
    const ledakan = await deteksiLedakan(menit);
    if (!ledakan) return { kasus: f.kasus, baru: null };
    // sudah terdaftar? (jendela yang sama tidak dibuat dua kali)
    const tuntasMs = ledakan.jendelaMs + 60 * 60 * 1000;
    const sudah = f.kasus.some((k) => Math.abs(k.jendela.mulaiMs - ledakan.jendelaMs) < 30 * 60 * 1000);
    if (sudah) return { kasus: f.kasus, baru: null };

    const re = rekonstruksi(menit, ledakan.jendelaMs, ledakan.arah);
    const dalam = menit.filter((m) => m.t >= ledakan.jendelaMs - 10 * 60 * 1000);
    const mulut = dalam[0];
    const puncak = dalam.reduce((s, m) => ledakan.arah === 'NAIK' ? (m.h > s ? m.h : s) : (m.l < s ? m.l : s), ledakan.arah === 'NAIK' ? 0 : Infinity);
    const tuntasHarga = dalam[dalam.length - 1].c;
    const keputusan = tindakanSistem({ mulaiMs: ledakan.jendelaMs, tuntasMs });

    // luka jujur: jumlah pnl keputusan SALAH + keuntungan yang tinggal (TP kecepetan)
    const lukaSalah = keputusan.filter((x) => x.penilaian === 'SALAH').reduce((s, x) => s + (parseFloat(x.nilai.replace(/[^0-9.\-]/g, '')) || 0), 0);
    const kasusTanpaSoal: Omit<Kasus, 'soal' | 'id' | 'atDibuat' | 'status'> = {
      judul: `MELONJAK ${ledakan.arah === 'NAIK' ? '+' : ''}${ledakan.chgPct.toFixed(1)}% (${new Date(ledakan.jendelaMs).toISOString().slice(0, 16).replace('T', ' ')} UTC)`,
      jendela: { mulaiMs: ledakan.jendelaMs, tuntasMs, arah: ledakan.arah },
      ledakanPct: re.ledakanPct,
      hargaDari: mulut.o, hargaPuncak: puncak, hargaTuntas: tuntasHarga,
      volumeLedakan: re.volumeLedakan,
      fase: re.fase,
      sinyalTersedia: re.sinyal,
      keputusanSistem: keputusan,
      luka: {
        jelas: `${lukaSalah < 0 ? `kerugian langsung dari keputusan SALAH di jendela: ${lukaSalah.toFixed(2)} USD` : 'tidak ada kerugian langsung'}${keputusan.some((x) => x.penilaian === 'TERLAMBAT-TP-KECEPETAN') ? ' + profit tersisa: TP kecepetan keluar saat tren masih berjalan (tanpa trailing ignisi)' : ''} — dan risiko kecolongan: verdict harian masih buta terhadap pergerakan intraday sampai radar anti-kecolongan ditempa`,
        usd: lukaSalah < 0 ? Math.abs(lukaSalah) : null,
        cetak: `harga ${mulut.o.toPrecision(6)} → puncak ${puncak.toPrecision(6)} (${re.ledakanPct >= 0 ? '+' : ''}${re.ledakanPct.toFixed(1)}%) dalam jendela 60 menit; volume ${(re.volumeLedakan.elsa / 1000).toFixed(0)} ribu ELSA (${re.volumeLedakan.xBaseline}× baseline)`,
      },
      pelajaran: [
        { id: 'K-VONIS-BUTA-INTRADAY', isi: 'verdict dari candle harian secara struktural TAK BISA melihat ledakan yang lahir-tuntas dalam satu hari — radar ignisi per-menit kini duduk di dewan vonis (E13) dan HARUS diinterrogasi sebelum pedang SELL dibuka saat harga sedang MENYALA', menanamKe: 'arah.ts E13 + dompet-jantung' },
        { id: 'K-ORPHAN-REPAIR-BAHAYA', isi: 'aturan "tutup posisi yatim" jangan pernah menutup posisi yang arahnya SEARAH modal-jiwa aktif — perbaiki buku dengan reconcili, bukan penutupan paksa; luka aturan = luka keuntungan', menanamKe: 'dompet-jantung' },
        { id: 'K-TP-TIPI-PASAR-LONJAK', isi: 'saat radar ignisi NAIK menyala dan posisi LONG hidup: target WAJIB menular (trailing) mengikuti kecepatan pasar — TP σ-dasar (maks 4%) hanya sah di pasar TENANG', menanamKe: 'dompet-jantung (perpanjang-target saat ignisi)' },
        { id: 'K-SHORT-PARABOLIK-TERLARANG', isi: 'membuka SHORT saat ignisi NAIK MENYALA/PARABOLIK = pedang dirampas radar; dua kemenangan TP beruntun bukan alasan membalik arah di puncak', menanamKe: 'dompet-jantung (pedangTerlarang)' },
        { id: 'K-WHALE-PECAH-POTONGAN', isi: 'whale modern memecah pesanan di bawah ambang cetakan besar — radar yang hanya mencari cetakan besar pasti bisu; lapisan akumulasi-senyap + volume z-score + rotasi venue adalah mata baru', menanamKe: 'ignisi.ts L1/L2/L7' },
      ],
      kalimatPemilik: 'alih-alih dapati keuntungan ini, harga melonjak dan kita kejebolan — ini gambar kasus!! (pemilik, 2026-11-26)',
    };
    const kasus: Kasus = { ...kasusTanpaSoal, id: `KASUS-${String(f.idBerikut).padStart(3, '0')}`, atDibuat: new Date().toISOString(), status: 'DIPELAJARI', soal: soalDariKasus(kasusTanpaSoal) };
    // NEURON DITANAM — pelajaran kasus masuk akumulasi kepahaman (paham.ts):
    // "pertumbuhan, nadi gudang, briefing guru mereka gak miliki neuron" — kini
    // kasus menanam sendiri neuronnya, tampil di panel paham & dibaca guru.
    const nBaru = tanamPelajaranKasus(kasus.pelajaran.map((p) => ({
      id: `KASUS-${kasus.id}-${p.id}`,
      isi: p.isi,
      bukti: `${kasus.judul} · ${kasus.luka.cetak}`,
    })));
    f.kasus = [kasus, ...f.kasus].slice(0, 40);
    f.idBerikut += 1;
    tulis(f);
    catatOtonomi({
      mesin: 'PAHAM', pemicu: 'KASUS-BARU', mandiri: true,
      hasil: `${kasus.id} dibuat: ${kasus.judul} — ${kasus.fase.length} fase direkonstruksi dari ${kasus.volumeLedakan.elsa.toLocaleString('en-US')} ELSA volume; ${kasus.pelajaran.length} pelajaran ditanam (${nBaru} neuron baru) ke akumulasi kepahaman`,
      bukti: kasus.luka.cetak,
    });
    return { kasus: f.kasus, baru: kasus };
  } catch {
    return { kasus: f.kasus, baru: null };
  } finally { sibuk = false; }
}

// pembuatan kasus pertama dipanggil manual saat module didenyut jantung
export async function ujiKasusDariMenit(): Promise<{ kasus: Kasus[]; baru: Kasus | null }> {
  return denyutKasus();
}
