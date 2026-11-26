// ============================================================
// MICAPROFITA-ELSA · OTAK PERSILANGAN — bus "saling mencerdaskan"
// (keluhan pemilik, 2026-11-26): "otak & ingatan ini juga harusnya
//  fokus untuk kembangkan mandiri independen, dan neuron dan saling
//  mencerdaskan bukannya malah saling cuek!"
// Diagnosa jujur: organ-organ sudah punya denyut masing-masing
// (ignisi 60 dtk, paus 3 mnt, dompet 60 dtk, guru 30 mnt, kasus 10
// mnt, ujian 30 mnt) tetapi mereka PENGEMBAR — hasil kerja satu
// organ tidak pernah ditandatangani dan diserahkan ke organ lain
// secara eksplisit; saluran sinaps hanyalah gambar kabel tanpa
// kendaraan. PERSILANGAN memperbaikinya dengan BUS NYATA:
//   1) KIRIMAN — tiap 15 menit setiap neuron MENYIAPKAN insight
//      bertanda tangan dari state file-nya sendiri (angka nyata,
//      tanpa karangan; neuron tanpa data itu ronde ini DIAM, jujur).
//   2) ANTAR — bus mengantar kiriman ke neuron penerima sesuai
//      rute (ignisi→dompet, paus→dompet, lintasan→dompet, kasus→guru,
//      dompet→pertumbuhan, ujian→guru, paham→guru, sumber→guru…).
//   3) REAKSI WAJIB — penerima TIDAK BOLEH cuek: tiap kiriman
//      dapat reaksi tertulis APA YANG AKAN KUPAKAI, dan reaksi itu
//      BENAR-BENAR TERWIRING: guru membaca bus ke konteks LLM-nya,
//      jantung dompet memodulasi keyakinan pedang dari kiriman
//      paus/lintasan, briefing membaca sikap guru, pertumbuhan
//      membaca ekuitas dompet untuk diary tumbuhnya.
//   4) ARSIP + OTONOMI — tiap ronde diarsip (cap 48 ronde) dan
//      dicatat di buku otonomi: persilangan adalah aktivitas
//      otak yang bisa diaudit, bukan slogan.
// ============================================================
import fs from 'fs';
import { catatOtonomi } from './otonomi';

const DIR_PS = '/home/z/my-project/db/elsa/persilangan';
const FILE_BUS = `${DIR_PS}/bus.json`;
const JEDA_MS = 15 * 60_000;
const CAP_RONDE = 48;

export type Kiriman = {
  id: string;
  dari: string;
  ke: string;
  jenis: string;
  isi: string;
  angka: string[];
  reaksi: string; // reaksi WAJIB penerima — bukan cuek
};
export type Ronde = { ke: number; at: string; kirim: Kiriman[]; cerita: string };
export type Bus = { v: 1; denyutKe: number; atTerakhir: string | null; ronde: Ronde[] };

function bacaJson<T>(fp: string, def: T): T {
  try {
    fs.mkdirSync(DIR_PS, { recursive: true });
    if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { /* rusak — mulai segar, jujur */ }
  return def;
}
function tulisJson(fp: string, v: unknown): void {
  try {
    fs.mkdirSync(DIR_PS, { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(v));
  } catch { /* gagal simpan — bus tetap hidup di memori ronde ini */ }
}

export function bacaBus(): Bus {
  return bacaJson<Bus>(FILE_BUS, { v: 1, denyutKe: 0, atTerakhir: null, ronde: [] });
}

const A = (s: string): string => (s.length > 240 ? s.slice(0, 239) + '…' : s);

// ---------------- MATA per neuron (semua baca file, tanpa fetch) ----------------
function baca<T>(fp: string): T | null {
  try {
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { return null; }
}
type Rec = Record<string, unknown>;
const r = (v: unknown): Rec | null => (v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Rec) : null);
const n = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const s = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v.trim() : null);
const xs = (v: unknown): unknown[] | null => (Array.isArray(v) ? v : null);

// IGNISI → DOMPET + GURU: negara radar anti-kecolongan
function mataIgnisi(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/paus/ignisi.json');
  const k = r(d?.keadaan);
  const negara = s(k?.negara);
  if (!k || !negara) return [];
  const arah = s(k?.arah) ?? '—';
  const key = n(k?.keyakinan) ?? 0;
  const denyut = n(k?.denyutKe) ?? 0;
  const trans = xs(k?.transisi);
  const t0 = trans && trans.length ? r(trans[0]) : null;
  const out: Kiriman[] = [{
    id: 'IGN→DOM', dari: 'ignisi', ke: 'dompet', jenis: 'RADAR-IGNISI',
    isi: `radar anti-kecolongan negara ${negara} arah ${arah} (keyakinan ${key}%, denyut ke-${denyut}${t0 ? `, transisi terakhir ${s(t0.dari)}→${s(t0.ke)} ${s(t0.at)?.slice(11, 19) ?? ''}` : ''})`,
    angka: [`keyakinan ${key}%`, `negara ${negara}`],
    reaksi: negara === 'TENANG'
      ? `dompet mencatat: radar TENANG — pedang boleh diangkat dari sinyal mana pun tanpa hukuman radar; kewaspadaan tetap 60 dtk`
      : `dompet mengunci hukum: pedang MELAWAN ${arah} DIRAMPAS; posisi melawan radar dihukum stop ditarik SEKARANG; posisi searah ${arah} target MENJALAR ikut velocity`,
  }];
  if (negara !== 'TENANG') {
    out.push({
      id: 'IGN→GRU', dari: 'ignisi', ke: 'guru', jenis: 'RADAR-IGNISI',
      isi: `ledakan berpotensi: ignisi ${negara} arah ${arah} keyakinan ${key}%`,
      angka: [`${key}%`],
      reaksi: `guru wajib menyebut state radar ini dalam pemahaman berikutnya — kalimat pembuka PASAR ELSA tidak boleh melewati ${negara} ${arah}`,
    });
  }
  return out;
}

// PAUS → DOMPET: sisi penempatan paus asli (neuron siluet hidup)
function mataPaus(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/paus/neuron.json');
  const neurons = xs(d?.neurons);
  if (!neurons || !neurons.length) return [];
  const hidup = neurons.map(r).filter((x): x is Rec => !!x && x.tidur !== true);
  if (!hidup.length) return [];
  const net24 = hidup.map((p) => ({ p, v: n(p.net24jUsd) ?? 0 }));
  const total = net24.reduce((acc, x) => acc + x.v, 0);
  const sisi = total > 25000 ? 'LONG' : total < -25000 ? 'SHORT' : null;
  if (!sisi) return [];
  const teratas = net24.sort((a, b2) => Math.abs(b2.v) - Math.abs(a.v))[0];
  return [{
    id: 'PAU→DOM', dari: 'paus', ke: 'dompet', jenis: 'PAUS-ASLI',
    isi: `${hidup.length} paus asli terpantau — net 24j paus ${total >= 0 ? '+' : '−'}$${Math.abs(Math.round(total / 1000))}rb (terberat ${s(teratas.p.nama)} ${teratas.v >= 0 ? '+' : '−'}$${Math.abs(Math.round(teratas.v / 1000))}rb) — sisi penempatan dominan ${sisi}`,
    angka: [`net24j ${Math.round(total)} USD`, `paus ${hidup.length}`],
    reaksi: `dompet memodulasi pedang: arah SEARAH penempatan paus (${sisi}) keyakinan +0.03; pedang MELAWAN paus didiskon 0.05 — dana besar menentukan arah gelombang, bukan sebaliknya`,
  }];
}

// LINTASAN → DOMPET: magnet yang DITARIK DULU
function mataLintasan(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/lintasan/neuron.json');
  const terbuka = xs(d?.terbuka);
  if (!terbuka || !terbuka.length) return [];
  const p = r(terbuka[0]);
  const m1 = r(p?.m1);
  const harga = n(m1?.harga), tarikan = n(m1?.tarikan);
  const arah = s(p?.arahPertama), pola = s(p?.pola), key = n(p?.keyakinan);
  if (!harga || !arah || !pola) return [];
  const lanj = r(p?.lanjutan);
  return [{
    id: 'LIN→DOM', dari: 'lintasan', ke: 'dompet', jenis: 'TARIKAN-MAGNET',
    isi: `pola ${pola}: magnet ${s(m1?.sisi) ?? '—'} ${harga.toPrecision(6)} (tarikan ${tarikan ?? '—'}) paling dulu DITARIK, arah kaki pertama ${arah}${lanj ? `, lalu ${s(lanj.tipe)} ${n(lanj.harga)?.toPrecision(6) ?? ''}` : ''} (K ${key ?? '—'})`,
    angka: [`K ${key ?? '—'}`],
    reaksi: `dompet memodulasi pedang: ${arah === 'NAIK' ? 'BUY' : 'SELL'} searah tarikan kaki pertama +0.04; target pedang mengikuti ${lanj ? `kaki lanjutan ${s(lanj.tipe)} ${n(lanj.harga)?.toPrecision(6) ?? ''}` : 'magnet M1'}, bukan angka karangan`,
  }];
}

// KASUS → GURU + DOMPET: pelajaran luka nyata
function mataKasus(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/kasus/kasus.json');
  const kasus = xs(d?.kasus);
  if (!kasus || !kasus.length) return [];
  const k = r(kasus[0]);
  const pel = xs(k?.pelajaran);
  const p0 = pel && pel.length ? r(pel[0]) : null;
  const judul = s(k?.judul) ?? '—';
  const ledak = n(k?.ledakanPct);
  const out: Kiriman[] = [{
    id: 'KAS→GRU', dari: 'kasus', ke: 'guru', jenis: 'PELAJARAN-LUKA',
    isi: `kasus teratas "${judul}" (ledakan ${ledak ?? '—'}%) — pelajaran terdepan: ${A(s(p0?.teks) ?? s(p0?.isi) ?? '—')}`,
    angka: [`kasus ${kasus.length}`],
    reaksi: `guru wajib mengaitkan vonis hari ini dengan kasus ini di bagian VONIS OTAK — luka yang tak disebut guru adalah luka yang berulang`,
  }];
  const larangan = (pel ?? []).map(r).filter((x): x is Rec => !!x && s(x.aturan) === 'DILARANG');
  if (larangan.length) {
    out.push({
      id: 'KAS→DOM', dari: 'kasus', ke: 'dompet', jenis: 'LARANGAN-LUKA',
      isi: `${larangan.length} larangan dari luka nyata tertanam (kasus "${judul}")`,
      angka: [`larangan ${larangan.length}`],
      reaksi: `dompet menghormati semua larangan kasus: ${larangan.map((x) => A(s(x.rincian) ?? s(x.teks) ?? '—').slice(0, 70)).join(' · ')}`,
    });
  }
  return out;
}

// DOMPET → PERTUMBUHAN + GURU: keadaan modal hidup
function mataDompet(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/dompet.json');
  if (!d) return [];
  const saldo = n(d.saldo), eq = n(d.ekuitas), topup = n(d.topupKe);
  const pos = r(d.posisi);
  const out: Kiriman[] = [{
    id: 'DOM→PER', dari: 'dompet', ke: 'pertumbuhan', jenis: 'EKUITAS-HIDUP',
    isi: `ekuitas $${eq ?? saldo ?? '—'} (top-up ke-${topup ?? 1})${pos ? `, posisi ${s(pos.arah)} @ ${n(pos.entryVwap)?.toPrecision(6) ?? '—'}` : ', flat — jantung sedang mencari pedang'}`,
    angka: [`ekuitas $${eq ?? saldo ?? 0}`],
    reaksi: `pertumbuhan menulis ekuitas ini ke diary tumbuh — kurva modal hidup adalah dimensi BARU dari P: profit yang tak dijalani modal adalah teori`,
  }];
  const jt = baca<Rec>('/home/z/my-project/db/elsa/dompet-jantung/denyut.json');
  const aksi = s(jt?.aksiTeks);
  if (aksi) {
    out.push({
      id: 'DOM→GRU', dari: 'dompet', ke: 'guru', jenis: 'MODAL-HIDUP',
      isi: `jantung dompet denyut ke-${n(jt?.detakKe) ?? '?'}: ${A(aksi)}`,
      angka: [`detak ${n(jt?.detakKe) ?? 0}`],
      reaksi: `guru membaca aksi modal terakhir — sikap guru tentang entry hari ini WAJIB konsisten dengan posisi yang benar-benar dipegang dompet (bukan teori doang)`,
    });
  }
  return out;
}

// GURU → BRIEFING: pemahaman mandiri terbaru
function mataGuru(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/guru/pemahaman.json');
  const teks = s(d?.teks);
  if (!teks) return [];
  const umurMenit = d?.at && typeof d.at === 'string' ? Math.round((Date.now() - Date.parse(d.at)) / 60000) : null;
  return [{
    id: 'GRU→BRF', dari: 'guru', ke: 'briefing', jenis: 'PEMAHAMAN-GURU',
    isi: `pemahaman mandiri guru (${umurMenit !== null ? `${umurMenit} menit lalu` : 'waktu tak terbaca'}): ${A(teks.replace(/\n+/g, ' '))}`,
    angka: [`umur ${umurMenit ?? '?'} mnt`],
    reaksi: `briefing menyuntik pemahaman ini ke bagian SIKAP GURU — briefing dan guru TIDAK boleh berbeda pendapat diam-diam; kalau beda, briefing menyebut bedanya terang-terangan`,
  }];
}

// UJIAN → GURU: hasil penempaan
function mataUjian(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/ujian/hasil_terakhir.json');
  const lulus = r(d?.metrik)?.lulus;
  const stat = s(d?.status);
  if (lulus === undefined) return [];
  const pel = n(r(d?.metrik)?.pelajaranJumlah);
  return [{
    id: 'UJI→GRU', dari: 'ujianelsa', ke: 'guru', jenis: 'UJIAN-100',
    isi: `ujian ELSA 100: ${stat ?? '—'} — lulus ${lulus}/100${pel !== undefined ? `, ${pel} pelajaran tertanam` : ''}`,
    angka: [`lulus ${lulus}/100`],
    reaksi: `guru menyebut kualitas otak ini saat menjawab soal keyakinan — guru tahu seberapa layak percaya pada otak arah hari ini`,
  }];
}

// PAHAM → GURU: regime medan ELSA
function mataPaham(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/paham/neuron.json');
  const reg = r(d?.regime);
  const nama = s(reg?.regime) ?? s(reg?.nama);
  if (!nama) return [];
  const pel = xs(d?.pelajaran)?.length ?? 0;
  return [{
    id: 'PAH→GRU', dari: 'paham', ke: 'guru', jenis: 'MEDAN-ELSA',
    isi: `otak paham: medan ELSA sekarang regime ${nama}${pel ? ` · ${pel} pelajaran hidup` : ''}`,
    angka: [`pelajaran ${pel}`],
    reaksi: `guru memakai label regime ini sebagai kacamata PASAR ELSA — momentum×volatilitas yang diukur dari candle ELSA sendiri, bukan teori generik`,
  }];
}

// SUMBER → GURU: kesehatan sumber data
function mataSumber(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/sumber_denyut.json');
  const riw = r(d?.riwayat);
  if (!riw) return [];
  const hidup: string[] = [];
  const mati: string[] = [];
  for (const [k, v] of Object.entries(riw)) {
    const arr = xs(v);
    const t0 = arr && arr.length ? r(arr[0]) : null;
    if (t0?.ok === true) hidup.push(k); else mati.push(k);
  }
  if (!hidup.length && !mati.length) return [];
  return [{
    id: 'SUM→GRU', dari: 'sumber', ke: 'guru', jenis: 'SUMBER-DATA',
    isi: `matriks sumber denyut: ${hidup.length} HIDUP (${hidup.join(', ') || '—'})${mati.length ? ` · ${mati.length} MATI (${mati.join(', ')})` : ''}`,
    angka: [`hidup ${hidup.length}`, `mati ${mati.length}`],
    reaksi: `guru jujur soal sumber: kalau ada sumber MATI, guru menyebutnya sebelum menjawab — jawaban tak boleh pura-pura lengkap`,
  }];
}

// PERTUMBUHAN → GURU: direktif tumbuh teratas
function mataPertumbuhan(): Kiriman[] {
  const d = baca<Rec>('/home/z/my-project/db/elsa/pertumbuhan/neuron.json');
  const dir = xs(d?.direktif);
  const d0 = dir && dir.length ? r(dir[0]) : null;
  const label = s(d0?.label);
  if (!label) return [];
  return [{
    id: 'PER→GRU', dari: 'pertumbuhan', ke: 'guru', jenis: 'DIREKTIF-TUMBUH',
    isi: `direktif pertumbuhan teratas: ${label} — ${A(s(d0?.mengapa) ?? '')}`,
    angka: [],
    reaksi: `guru menutup pemahaman dengan mengingatkan pemilik arah tumbuh otak — guru bukan hanya pelaporan, ia pembina`,
  }];
}

// ---------------- rute & ronde ----------------
const MATA: { neuron: string; ekor: () => Kiriman[] }[] = [
  { neuron: 'ignisi', ekor: mataIgnisi },
  { neuron: 'paus', ekor: mataPaus },
  { neuron: 'lintasan', ekor: mataLintasan },
  { neuron: 'kasus', ekor: mataKasus },
  { neuron: 'dompet', ekor: mataDompet },
  { neuron: 'guru', ekor: mataGuru },
  { neuron: 'ujianelsa', ekor: mataUjian },
  { neuron: 'paham', ekor: mataPaham },
  { neuron: 'sumber', ekor: mataSumber },
  { neuron: 'pertumbuhan', ekor: mataPertumbuhan },
];

let berjalan = false;
export async function denyutPersilangan(): Promise<Ronde | null> {
  if (berjalan) return null;
  berjalan = true;
  try {
    const bus = bacaBus();
    const kirim = MATA.flatMap((m) => {
      try { return m.ekor(); } catch { return []; }
    });
    const ke = bus.denyutKe + 1;
    const cerita = kirim.length
      ? `${kirim.length} kiriman ditukar lintas ${new Set(kirim.map((k) => k.dari)).size} neuron pengirim → ${new Set(kirim.map((k) => k.ke)).size} penerima — saling mencerdaskan, bukan saling cuek`
      : 'ronde ini SEPI: tidak ada neuron yang punya data segar untuk ditandatangani — jujur, bus tidak mengarang kiriman';
    const ronde: Ronde = { ke, at: new Date().toISOString(), kirim, cerita };
    bus.denyutKe = ke;
    bus.atTerakhir = ronde.at;
    bus.ronde = [ronde, ...bus.ronde].slice(0, CAP_RONDE);
    tulisJson(FILE_BUS, bus);
    catatOtonomi({
      mesin: 'PERSILANGAN', pemicu: 'BUS', mandiri: true,
      hasil: `ronde persilangan ke-${ke}: ${cerita}`,
      bukti: kirim.slice(0, 4).map((k) => `${k.id} ${k.jenis} (${k.dari}→${k.ke})`).join(' · ') || 'sepif',
    });
    return ronde;
  } finally {
    berjalan = false;
  }
}

export function mulaiPersilangan(): void {
  const g = globalThis as { __elsaPersilanganTimer?: NodeJS.Timeout; __elsaPersilanganAwal?: boolean };
  if (g.__elsaPersilanganAwal) return;
  g.__elsaPersilanganAwal = true;
  setTimeout(() => { void denyutPersilangan(); }, 5000);
  g.__elsaPersilanganTimer = setInterval(() => { void denyutPersilangan(); }, JEDA_MS);
}

// ---------------- bacaan untuk penerima (GURU / DOMPET / UI) ----------------
export type BarisKonteksPersilangan = string[];

// untuk guru.ts: baris konteks dari kiriman yang menuju guru + umur bus
export function bacaKirimUntukGuru(): string[] {
  const bus = bacaBus();
  const r0 = bus.ronde[0];
  if (!r0) return [];
  const out = r0.kirim.filter((k) => k.ke === 'guru').map((k) => `${k.dari.toUpperCase()}→GURU [${k.jenis}]: ${k.isi} || reaksi wajib: ${k.reaksi}`);
  if (out.length) out.push(`BUS PERSILANGAN ronde ke-${r0.ke} (${new Date(r0.at).toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' })} WIB): ${r0.cerita}`);
  return out;
}

// untuk dompet-jantung.ts: modulasi keyakinan pedang dari kiriman menuju dompet
export function modulasiPedangDariBus(arah: 'BUY' | 'SELL'): { delta: number; catatan: string } {
  const bus = bacaBus();
  const r0 = bus.ronde[0];
  if (!r0) return { delta: 0, catatan: 'bus persilangan belum berdenyut — modulasi nol' };
  let delta = 0;
  const cat: string[] = [];
  const segar = Date.now() - Date.parse(r0.at) < 45 * 60_000; // kiriman >45 mnt dianggap basi
  if (!segar) return { delta: 0, catatan: 'kiriman bus basi (>45 mnt) — modulasi nol, jujur' };
  for (const k of r0.kirim.filter((x) => x.ke === 'dompet')) {
    const isi = `${k.isi} ${k.reaksi}`;
    const searah = k.isi.includes(arah === 'BUY' ? 'NAIK' : 'TURUN') || (arah === 'BUY' ? /LONG/.test(k.reaksi) : /SHORT/.test(k.reaksi));
    if (k.jenis === 'PAUS-ASLI') {
      const d = searah ? 0.03 : /MELAWAN|dihindari/.test(k.reaksi) ? -0.05 : 0;
      if (d !== 0) cat.push(`paus ${d > 0 ? '+' : ''}${d} (net penempatan searah=${searah})`);
      delta += d;
    }
    if (k.jenis === 'TARIKAN-MAGNET') {
      const d = searah ? 0.04 : -0.02;
      if (d !== 0) cat.push(`magnet ${d > 0 ? '+' : ''}${d}`);
      delta += d;
    }
    if (k.jenis === 'RADAR-IGNISI' && /MELAWAN|DIRAMPAS/.test(isi)) {
      const d = -0.06;
      cat.push(`ignisi melawan ${d}`);
      delta += d;
    }
    if (k.jenis === 'LARANGAN-LUKA') {
      const d = -0.03;
      cat.push(`larangan kasus ${d}`);
      delta += d;
    }
  }
  delta = Math.max(-0.15, Math.min(0.08, delta));
  return { delta: Math.round(delta * 1000) / 1000, catatan: cat.length ? `modulasi bus persilangan: ${cat.join(' · ')}` : 'tidak ada kiriman yang menyentuh pedang ini — modulasi nol' };
}

// untuk UI payload
export function bacaPersilanganPayload(): {
  denyutKe: number; atTerakhir: string | null;
  rondeTerakhir: Ronde | null;
  ronde: Ronde[];
  statistik: { totalKirim: number; neuronPengirim: number; neuronPenerima: number };
} {
  const bus = bacaBus();
  const semua = bus.ronde.flatMap((x) => x.kirim);
  return {
    denyutKe: bus.denyutKe,
    atTerakhir: bus.atTerakhir,
    rondeTerakhir: bus.ronde[0] ?? null,
    ronde: bus.ronde.slice(0, 12),
    statistik: {
      totalKirim: semua.length,
      neuronPengirim: new Set(semua.map((k) => k.dari)).size,
      neuronPenerima: new Set(semua.map((k) => k.ke)).size,
    },
  };
}
