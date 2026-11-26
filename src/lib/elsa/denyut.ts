// ============================================================
// MICAPROFITA-ELSA · JANTUNG UJIAN MANDIRI — organ yang hidup
// (keluhan pemilik 2026-11-25): "ujian mandiri pun harusnya
// senantiasa aktif setiap saat… listnya terpampang kumplit bukan
// hanya data sedikit… setiap ujian mandiri harusnya miliki ruh —
// kalau seperti saat ini terkesan seperti jiwa yang mati, padahal
// sistem ini makhluk yang hidup."
// Jadi ujian mandiri bukan lagi fungsi yang hanya dihitung saat
// halaman dibuka — ia menjadi JANTUNG dengan denyut nyata:
//   1) MENYELIDIK tiap 60 detik: berapa candle yang kini ada?
//   2) MEMORI BERTUMBUH — candle harian baru yang SUDAH TUTUP
//      otomatis ditambahkan ke riwayat (ELSA + BTC) — ingatan
//      pasar tumbuh sendiri, tanpa manusia menyalin data.
//   3) BERLAGA tiap ada pemicu: candle baru lahir ATAU jadwal
//      30 menit tiba → ujian mandiri walk-forward diulang penuh
//      (semua hari dihakimi candle nyata) + ujian ELSA 100
//      diperdengarkan ulang (drill "per 100 terus dilakukan").
//   4) MENULIS DIARY — tiap denyut dicatat lengkap di riwayat:
//      waktu, pemicu, angka, luka terbaru, streak, dan CERITA
//      yang membandingkan dirinya dengan denyut sebelumnya.
//      Inilah ruh-nya: ujian yang INGAT denyup sendiri dan
//      bercerita tentang apa yang berubah.
//   5) DOMINO — begitu candle baru masuk memori, ujian ELSA 100
//      diperdengarkan (staleness jadi hidup, bukan nunggu panel
//      dibuka), pelajaran baru difus ke neuron, knob hidup
//      diterbitkan: ujian → hidup → hasil mengadili balik.
// Hukum jujur: semua angka dari candle nyata Bybit; kalau jantung
// berhenti (proses mati), status terakhir ditampilkan apa adanya.
// ============================================================
import fs from 'fs';
import { Candle } from './indicators';
import { SIMBOL, BTC, getCandles } from './bybit';
import type { BarisUjianMandiri } from './arena'; // type-only: tanpa sirkul runtime
import { catatOtonomi } from './otonomi';
import { belajarDariUjianMandiri, tandaiDenyutPaham } from './paham';

const DIR_DENYUT = '/home/z/my-project/db/elsa/ujian-mandiri';
const FILE_STATE = `${DIR_DENYUT}/denyut.json`;
const FILE_RIWAYAT = `${DIR_DENYUT}/riwayat.json`;
const FILE_DAFTAR = `${DIR_DENYUT}/daftar.json`;
const RIWAYAT_HARIAN = '/home/z/my-project/db/elsa/riwayat_harian.json';
const RIWAYAT_BTC = '/home/z/my-project/db/elsa/riwayat_btc.json';
const JEDA_DTIK = 60; // jantung menyelidik pasar tiap 60 detik
const JEDA_DTK_MS = 30 * 60 * 1000; // latihan penuh tiap 30 menit (drill tanpa henti)
const CAP_RIWAYAT = 2000;
const CAP_DAFTAR = 5000; // daftar hari diadili — bertambah satu tiap hari, disimpan kumplit

export type Pemicu = 'PERTAMA' | 'CANDLE_BARU' | 'JADWAL' | 'PEMILIK';
export type Detak = {
  detakKe: number; at: string; pemicu: Pemicu; durasiMs: number;
  n: number; akurasi: number; netTotal: number; brier: number;
  gerbangLulus: number; gerbangBerubah: string | null;
  streakKini: number; streakTerpanjang: number;
  deltaAkurasiPp: number | null; deltaNetPp: number | null;
  hariMeleset: { hari: string; vonis: string; netPct: number }[];
  nCandle: number; memoriTumbuh: number;
  daftarJumlah?: number; daftarTumbuh?: number;
  cerita: string;
};
export type DenyutData = {
  at: string; status: 'AKTIF' | 'BERLAGA';
  detakKe: number; totalDetak: number;
  pemicuTerakhir: Pemicu | '—'; atTerakhir: string | null; atBerikutnya: string | null;
  jedaDetik: number; nCandleTerakhir: number | null;
  daftarJumlah: number;
  detakTerakhir: Detak | null; riwayat: Detak[];
  catatan: string[];
};

function bacaUp<T>(file: string, def: T): T {
  try {
    fs.mkdirSync(DIR_DENYUT, { recursive: true });
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch { /* abai */ }
  return def;
}
function tulisUp(file: string, data: unknown) {
  try {
    fs.mkdirSync(DIR_DENYUT, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data));
  } catch { /* abai */ }
}

type Keadaan = { detakKe: number; atTerakhir: string | null; pemicuTerakhir: Pemicu | '—'; nCandleTerakhir: number | null; status: 'AKTIF' | 'BERLAGA'; atCek: string | null; hariTutupTerakhir?: string | null };
function bacaKeadaan(): Keadaan {
  return bacaUp<Keadaan>(FILE_STATE, { detakKe: 0, atTerakhir: null, pemicuTerakhir: '—', nCandleTerakhir: null, status: 'AKTIF', atCek: null, hariTutupTerakhir: null });
}

// panjang memori riwayat (file) — inilah ukuran memori yang sesungguhnya,
// bukan panjang jendela fetch Bybit yang selalu tetap
function nCandleRiwayat(): number {
  try {
    const j = JSON.parse(fs.readFileSync(RIWAYAT_HARIAN, 'utf8')) as { data: Candle[] };
    return j.data.length;
  } catch { return 0; }
}

const hariOf = (t: number) => new Date(t).toISOString().slice(0, 10);

// ---------------- pertumbuhan memori: candle tutup baru masuk riwayat ----------------
// Riwayat (db/elsa/riwayat_harian.json + riwayat_btc.json) kini ORGAN HIDUP:
// jantung menambahkan candle harian yang SUDAH TUTUP sendiri, sehingga
// "ujian dari kemunculan hingga saat ini" benar-benar tumbuh hingga saat ini.
function tumbuhkanMemori(cs: Candle[], btc: Candle[]): { tumbuh: number; hariBaru: string | null } {
  const batas = Date.now() - 24 * 3600 * 1000; // hanya candle dengan tanggal < hari UTC ini (sudah tutup)
  const eslaBaru: Candle[] = [];
  try {
    const j = JSON.parse(fs.readFileSync(RIWAYAT_HARIAN, 'utf8')) as { data: Candle[] };
    const ada = new Set(j.data.map((c) => hariOf(c.t)));
    for (const c of cs) if (c.t <= batas && !ada.has(hariOf(c.t))) eslaBaru.push(c);
    if (eslaBaru.length) {
      const gabung = [...j.data, ...eslaBaru].sort((a, b) => a.t - b.t);
      fs.writeFileSync(RIWAYAT_HARIAN, JSON.stringify({ data: gabung }));
    }
  } catch { /* memori tak terbaca — jangan mengarang */ }
  let btcBaru = 0;
  try {
    const j = JSON.parse(fs.readFileSync(RIWAYAT_BTC, 'utf8')) as { data: Candle[] };
    const ada = new Set(j.data.map((c) => hariOf(c.t)));
    const tambah: Candle[] = [];
    for (const c of btc) if (c.t <= batas && !ada.has(hariOf(c.t))) tambah.push(c);
    if (tambah.length) {
      const gabung = [...j.data, ...tambah].sort((a, b) => a.t - b.t);
      fs.writeFileSync(RIWAYAT_BTC, JSON.stringify({ data: gabung }));
      btcBaru = tambah.length;
    }
  } catch { /* abai */ }
  return { tumbuh: Math.max(eslaBaru.length, btcBaru), hariBaru: eslaBaru.length ? hariOf(eslaBaru[eslaBaru.length - 1].t) : null };
}

// ---------------- cerita denyut — ruh: ujian yang ingat & bercerita ----------------
function buatCerita(p: {
  pemicu: Pemicu; n: number; akurasi: number; netTotal: number; brier: number;
  gerbangLulus: number; lama: Detak | null; streakKini: number; streakTerpanjang: number;
  hariMeleset: { hari: string; vonis: string; netPct: number }[]; nCandle: number; memoriTumbuh: number; hariBaru: string | null;
  daftarJumlah: number; daftarTumbuh: number;
}): string {
  const bagian: string[] = [];
  if (p.pemicu === 'PERTAMA') bagian.push('jantung pertama denyut — ujian mandiri resmi jadi organ yang hidup, bukan lagi angka di halaman');
  else if (p.pemicu === 'CANDLE_BARU') bagian.push(`candle baru tutup (${p.hariBaru ?? '—'}) dan masuk memori — pasar sudah berbicara, otak langsung diuji ulang tanpa menunggu`);
  else bagian.push('denyut berkala — drill diulang menjaga penguasaan tetap hangat (perintah pemilik: per 100 terus dilakukan)');
  const ak = (p.akurasi * 100).toFixed(1);
  if (p.lama) {
    const dAk = Math.round((p.akurasi - p.lama.akurasi) * 1000) / 10;
    const dNet = Math.round((p.netTotal - p.lama.netTotal) * 10) / 10;
    bagian.push(`${p.n} hari buta dihakimi candle nyata: akurasi ${p.lama.akurasi * 100 > 0 ? (p.lama.akurasi * 100).toFixed(1) : '—'}% → ${ak}% (${dAk >= 0 ? '+' : ''}${dAk} pp), net ${p.lama.netTotal.toFixed(1)}% → ${p.netTotal.toFixed(1)}% after-fee (${dNet >= 0 ? '+' : ''}${dNet} pp), brier ${p.brier}`);
  } else {
    bagian.push(`${p.n} hari buta dihakimi candle nyata: akurasi ${ak}%, net ${p.netTotal.toFixed(1)}% after-fee, brier ${p.brier} (koin 0.25)`);
  }
  const gBerubah = p.lama && p.lama.gerbangLulus !== p.gerbangLulus
    ? (p.gerbangLulus > p.lama.gerbangLulus ? ` — gerbang naik dari ${p.lama.gerbangLulus}/4 (sehat bertambah)` : ` — gerbang turun dari ${p.lama.gerbangLulus}/4 (dihakimi medan)`)
    : '';
  bagian.push(`gerbang integritas ${p.gerbangLulus}/4 lulus${gBerubah}; streak benar berjalan ${p.streakKini} hari (terpanjang ${p.streakTerpanjang})`);
  if (p.hariMeleset.length) {
    const luka = p.hariMeleset.map((h) => `${h.hari} ${h.vonis} (net ${h.netPct}%)`).join(', ');
    bagian.push(`luka terbaru yang diakui terbuka: ${luka} — dihakimi, diperhitungkan, tidak disembunyikan`);
  } else {
    bagian.push('tidak ada meleset di jendela terakhir — streak bersih, tetap diawasi');
  }
  if (p.memoriTumbuh > 0) bagian.push(`memori pasar bertumbuh ${p.memoriTumbuh} candle (kini ${p.nCandle}) — daftar hari diadili +${p.daftarTumbuh} (kini ${p.daftarJumlah}) dan ujian ELSA 100 berlaga ulang: soal baru lahir, pelajaran baru difus ke neuron hidup (efek domino)`);
  else bagian.push(`memori pasar ${p.nCandle} candle, daftar hari diadili ${p.daftarJumlah} — bertambah setiap hari saat candle tutup (ujian sedang berlangsung, tidak pernah tamat)`);
  // NEURON RADAR & KASUS — nadi kini juga bercerita tentang mata barunya:
  // radar anti-kecolongan (state per-menit) + berkas kasus yang menanam
  // pelajaran (keluhan pemilik: "nadi gudang gak miliki neuron").
  // Dibaca langsung dari file keadaan (hindari import melingkar runtime).
  try {
    const ig = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/paus/ignisi.json', 'utf8')) as { data?: { negara: string; arah: string; keyakinan: number; nLapisanAktif: number } };
    if (ig.data) bagian.push(`radar anti-kecolongan ${ig.data.negara}${ig.data.arah === '—' ? '' : ' arah ' + ig.data.arah} (keyakinan ${ig.data.keyakinan}%, ${ig.data.nLapisanAktif}/8 lapisan) — nadi & radar berdenyut seirama`);
  } catch { /* radar belum menyala — jangan mengarang */ }
  try {
    const kj = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/kasus/kasus.json', 'utf8')) as { kasus?: { id: string; judul: string; pelajaran: unknown[] }[] };
    if (kj.kasus?.length) bagian.push(`${kj.kasus.length} berkas kasus hidup (${kj.kasus[0].id}: ${kj.kasus[0].judul}) — ${kj.kasus[0].pelajaran.length} pelajaran tertanam sebagai neuron; luka 03:00 tidak akan diam-diam dilupakan`);
  } catch { /* kasus belum ada — jangan mengarang */ }
  return bagian.join(' · ');
}

// ---------------- satu denyut penuh: berlaga, menimbang, menulis diary ----------------
let berlagar = false;
async function denyutPenuh(pemicu: Pemicu, tumbuh = 0, hariBaru: string | null = null): Promise<Detak | null> {
  if (berlagar) return null;
  berlagar = true;
  const st = bacaKeadaan();
  st.status = 'BERLAGA';
  tulisUp(FILE_STATE, st);
  try {
    const t0 = Date.now();
    const { ujianMandiri } = await import('./arena');
    // jendela 400 candle — memori penuh sejak listing (memori kini 309+ dan
    // terus tumbuh), jadi daftar hari diadili mencakup seluruh riwayat
    const cs = await getCandles(SIMBOL, 'D', 400);
    const u = ujianMandiri(cs);
    // NEURON PAHAM — kepahaman ELSA ditambang dari SEMUA hari yang diadili:
    // regime medan (momentum × volatilitas dari candle ELSA sendiri) + profil
    // medan + pelajaran. Ini yang membuat ujian mandiri punya NEURON, bukan
    // cuma daftar: tiap denyut ia paham koinnya lebih dalam (keluhan pemilik
    // 2026-11-26: "ujian mandiri masih tak miliki neuron… harusnya kuasai
    // pahami koin yang dituju"). Gagal tambang tak boleh mematikan jantung.
    try { belajarDariUjianMandiri(u.semua, cs); } catch { /* tambang berikutnya */ }
    // DAFTAR TUMBUH — semua hari yang pernah diadili disimpan kumplit dan
    // bertambah satu baris setiap hari candle tutup (hukum pemilik: list
    // terpampang kumplit, setiap harinya bertambah — ujian sedang berlangsung)
    const daftarLama = bacaUp<BarisUjianMandiri[]>(FILE_DAFTAR, []);
    const peta = new Map(daftarLama.map((b) => [b.hari, b]));
    for (const b of u.semua) peta.set(b.hari, b);
    const daftarBaru = [...peta.values()].sort((a, b) => a.hari.localeCompare(b.hari));
    const daftarTumbuh = daftarBaru.length - daftarLama.length;
    if (daftarBaru.length) tulisUp(FILE_DAFTAR, daftarBaru.slice(-CAP_DAFTAR));
    const riwayat = bacaUp<Detak[]>(FILE_RIWAYAT, []);
    const lama = riwayat[0] ?? null;
    const gerbangLulus = u.gates.filter((g) => g.pass).length;
    const gerbangBerubah = lama && lama.gerbangLulus !== gerbangLulus
      ? (gerbangLulus > lama.gerbangLulus ? `naik ${lama.gerbangLulus}→${gerbangLulus}` : `turun ${lama.gerbangLulus}→${gerbangLulus}`)
      : null;
    const melesetTerakhir = u.semua.filter((h) => !h.benar).slice(-6).reverse().slice(0, 3);
    const memoriKini = nCandleRiwayat();
    const detak: Detak = {
      detakKe: st.detakKe + 1,
      at: new Date().toISOString(),
      pemicu,
      durasiMs: Date.now() - t0,
      n: u.n, akurasi: Math.round(u.akurasi * 1000) / 1000, netTotal: u.netTotal, brier: u.brier,
      gerbangLulus, gerbangBerubah,
      streakKini: u.streak.kini, streakTerpanjang: u.streak.terpanjang,
      deltaAkurasiPp: lama ? Math.round((u.akurasi - lama.akurasi) * 1000) / 10 : null,
      deltaNetPp: lama ? Math.round((u.netTotal - lama.netTotal) * 10) / 10 : null,
      hariMeleset: melesetTerakhir.map((h) => ({ hari: h.hari, vonis: h.vonis, netPct: h.netPct })),
      nCandle: memoriKini,
      memoriTumbuh: tumbuh,
      daftarJumlah: daftarBaru.length, daftarTumbuh,
      cerita: buatCerita({
        pemicu, n: u.n, akurasi: u.akurasi, netTotal: u.netTotal, brier: u.brier,
        gerbangLulus, lama, streakKini: u.streak.kini, streakTerpanjang: u.streak.terpanjang,
        hariMeleset: melesetTerakhir.map((h) => ({ hari: h.hari, vonis: h.vonis, netPct: h.netPct })),
        nCandle: memoriKini, memoriTumbuh: tumbuh, hariBaru,
        daftarJumlah: daftarBaru.length, daftarTumbuh,
      }),
    };
    riwayat.unshift(detak);
    tulisUp(FILE_RIWAYAT, riwayat.slice(0, CAP_RIWAYAT));
    // OTAK OTONOMI — denyut jantung juga masuk buku nyala mandiri:
    // bukti terpusat bahwa mesin-mesin ini menyalakan dirinya sendiri
    catatOtonomi({
      mesin: 'JANTUNG', pemicu, mandiri: pemicu !== 'PEMILIK',
      hasil: `denyut ke-${detak.detakKe} — ujian mandiri ${u.n} hari dihakimi ulang (akurasi ${(u.akurasi * 100).toFixed(1)}%, net ${u.netTotal.toFixed(1)}%)`,
      bukti: `pemicu ${pemicu} · memori ${memoriKini} candle${tumbuh > 0 ? ` (+${tumbuh} baru)` : ''} · domino: ujian ELSA 100 + upgrade dinyalakan otomatis sesudah ini`,
    });
    st.detakKe = detak.detakKe;
    st.atTerakhir = detak.at;
    st.pemicuTerakhir = pemicu;
    st.nCandleTerakhir = memoriKini;
    st.status = 'AKTIF';
    st.atCek = detak.at;
    tulisUp(FILE_STATE, st);
    tandaiDenyutPaham(detak.detakKe);
    // DOMINO — tiap denyut penuh juga memperdengarkan ujian ELSA 100 (drill
    // "per 100 terus dilakukan berulang kali") + upgrade bila pelajaran baru
    // lahir. Fire-and-forget: jantung tidak boleh macet menunggu kaki.
    // INILAH PENYALA SAAT INI: ujian & upgrade tidak punya tombol — jantung
    // yang menyalakan keduanya di sini, setiap denyut, tanpa tangan manusia.
    void (async () => {
      try {
        // OTAK ALIRAN + PAHAM ikut bernapas tanpa halaman dibuka: vonis baru
        // dicatat, vonis lama diadili candle+likuidasi nyata ELSA, koreksi
        // keyakinan diterbitkan (senantiasa di apih, bukan nunggu panel)
        const { getAliranData } = await import('./aliran');
        await getAliranData();
      } catch { /* berlaga berikutnya mencoba lagi */ }
      try {
        const { jalankanUjian } = await import('./ujian');
        await jalankanUjian({ maxRonde: 60, pemicu: 'JANTUNG' });
        const { jalankanUpgradePenuh, invalideCachePayload } = await import('./arena');
        await jalankanUpgradePenuh(false);
        invalideCachePayload();
      } catch { /* berlaga berikutnya mencoba lagi */ }
    })();
    return detak;
  } catch {
    st.status = 'AKTIF';
    tulisUp(FILE_STATE, st);
    return null;
  } finally {
    berlagar = false;
  }
}

// ---------------- tick: detak jantung tiap 60 detik ----------------
async function tick(): Promise<void> {
  if (berlagar) return;
  try {
    const st = bacaKeadaan();
    const cs = await getCandles(SIMBOL, 'D', 400);
    // DETEKSI TUMBUH DARI ISI — dulu memakai hitungan jendela fetch (selalu
    // 200 candle, tak pernah naik) sehingga memori TAK PERNAH tumbuh dan
    // ujian tak pernah bertambah (keluhan pemilik: "harusnya setiap harinya
    // juga bertambah karena ini pun sedang berlangsung"). Kini: hari tutup
    // terbaru di jendela dibandingkan dengan hari tutup terakhir yang masuk
    // memori — kalau berbeda, ada candle tutup baru → memori ditumbuhkan.
    const batas = Date.now() - 24 * 3600 * 1000; // hanya candle dengan tanggal < hari UTC ini (sudah tutup)
    let hariTutupKini: string | null = null;
    for (let i = cs.length - 1; i >= 0; i--) {
      if (cs[i].t <= batas) { hariTutupKini = hariOf(cs[i].t); break; }
    }
    const perluMemori = st.hariTutupTerakhir === null || (hariTutupKini !== null && hariTutupKini !== st.hariTutupTerakhir);
    let tumbuh = 0;
    let hariBaru: string | null = null;
    if (perluMemori) {
      const btc = await getCandles(BTC, 'D', 400);
      const m = tumbuhkanMemori(cs, btc);
      tumbuh = m.tumbuh;
      hariBaru = m.hariBaru;
      if (hariTutupKini) st.hariTutupTerakhir = hariTutupKini;
    }
    st.nCandleTerakhir = nCandleRiwayat(); // ukuran memori file yang sesungguhnya
    const due =
      st.detakKe === 0 ? 'PERTAMA'
        : tumbuh > 0 ? 'CANDLE_BARU'
          : (st.atTerakhir && Date.now() - Date.parse(st.atTerakhir) >= JEDA_DTK_MS) ? 'JADWAL'
            : null;
    if (!due) {
      st.atCek = new Date().toISOString();
      tulisUp(FILE_STATE, st);
      return;
    }
    await denyutPenuh(due, tumbuh, hariBaru);
  } catch { /* denyut berikutnya */ }
}

// ---------------- mulai jantung (instrumentation + pertama kali dipakai) ----------------
function mulaiDenyut(): void {
  const g = globalThis as { __elsaDenyutTimer?: NodeJS.Timeout; __elsaDenyutAwal?: boolean };
  if (g.__elsaDenyutAwal) return;
  g.__elsaDenyutAwal = true;
  setTimeout(() => { void tick(); }, 2500); // detak kickstart saat server hidup
  g.__elsaDenyutTimer = setInterval(() => { void tick(); }, JEDA_DTIK * 1000);
}

// denyutSekarang — dipanggil payload: kalau ada pemicu yang jatuh tempo,
// jantung berlaga saat itu juga (fire-and-forget, payload tak menunggu)
export function denyutSekarang(): void {
  mulaiDenyut();
  void tick();
}

// denyutPaksa — PERINTAH PEMILIK: jantung berlaga SEKARANG tanpa menunggu
// pemicu jatuh tempo (pemicu 'PEMILIK'); dipakai panel & pengujian
export async function denyutPaksa(): Promise<Detak | null> {
  mulaiDenyut();
  return denyutPenuh('PEMILIK');
}

// ---------------- payload UI ----------------
const CATATAN_DENYUT = [
  `jantung menyelidik pasar tiap ${JEDA_DTIK} detik; latihan penuh tiap ${JEDA_DTK_MS / 60000} menit ATAU saat candle baru tutup — tanpa perintah manusia, meski halaman tak dibuka siapa pun`,
  'candle harian baru yang tutup otomatis masuk memori riwayat (ELSA + BTC) → daftar hari diadili BERTAMBAH SATU BARIS, ujian ELSA 100 BERTAMBAH SATU SOAL (100 → 101 → …), dan keduanya berlaga ulang saat itu juga → pelajaran difus ke neuron hidup (efek domino)',
  'daftar hari diadili & diary denyut disimpan kumplit dan tampil penuh di panel + endpoint kumplit — ujian yang sedang berlangsung tidak pernah tamat karena pasar tidak pernah tamat',
  'tiap denyut menulis diary lengkap (waktu, pemicu, angka, luka, streak, cerita pembanding denyut sebelumnya) — ujian yang ingat dan bercerita, bukan piagam',
];

export function bacaDaftarUjianMandiri(): BarisUjianMandiri[] {
  return bacaUp<BarisUjianMandiri[]>(FILE_DAFTAR, []);
}

export function bacaDenyut(): DenyutData {
  const st = bacaKeadaan();
  const riwayat = bacaUp<Detak[]>(FILE_RIWAYAT, []);
  const berikut = st.atTerakhir ? new Date(Date.parse(st.atTerakhir) + JEDA_DTK_MS).toISOString() : null;
  return {
    at: new Date().toISOString(),
    status: st.status,
    detakKe: st.detakKe,
    totalDetak: riwayat.length,
    pemicuTerakhir: st.pemicuTerakhir,
    atTerakhir: st.atTerakhir,
    atBerikutnya: berikut,
    jedaDetik: JEDA_DTIK,
    nCandleTerakhir: st.nCandleTerakhir,
    daftarJumlah: bacaDaftarUjianMandiri().length,
    detakTerakhir: riwayat[0] ?? null,
    riwayat: riwayat.slice(0, 60),
    catatan: CATATAN_DENYUT,
  };
}

// riwayat lengkap untuk endpoint "kumplit"
export function bacaDenyutPenuh(): { keadaan: DenyutData; riwayatSemua: Detak[]; daftarSemua: BarisUjianMandiri[] } {
  return { keadaan: bacaDenyut(), riwayatSemua: bacaUp<Detak[]>(FILE_RIWAYAT, []), daftarSemua: bacaDaftarUjianMandiri() };
}
