// ============================================================
// MICAPROFITA-ELSA · NADI & GUDANG HIDUP — tab yang dulu MAYAT.
// (keluhan pemilik, 2026-11-26): "pertumbuhan, nadi gudang, briefing
//  guru mereka gak miliki neuron sehingga amigdala mereka mati!"
// Dulu tab "Nadi & Gudang" hanya tiga kartu teks statis ("ledger,
// buku cuan, events… persisten di db/elsa") — tidak satu pun angka
// berubah, tidak satu pun jantung dipantau. Kini organ ini MENGGALI
// SELURUH GUDANG tiap 5 menit:
//   1) JANTUNG DIPANTAU — semua jantung (ujian mandiri, dompet,
//      ignisi, paus, kasus, sumber, guru, persilangan, briefing,
//      pertumbuhan) dibaca state file-nya: detak ke berapa, kapan
//      terakhir, umur denyut. Jantung yang telat melewati batas
//      toleransinya di-ALARM-kan "AMIGDALA TIDUR" — inilah neuron
//      nadi: ia mendeteksi mayat SEBELUM mayatnya berbahaya
//      (kecolongan 0.08→0.11 terjadi karena tak ada yang mendengar
//      amigdala mati di antara denyut).
//   2) GUDANG DIGALI — inventaris file nyata db/elsa + db (ukuran,
//      umur tulis terakhir, siapa yang diberi makan) — gudang yang
//      tak pernah ditulis = organ yang tak pernah hidup, dilabeli.
//   3) DENYUT NADI — tiap galinya dicatat (diary) + otonomi; guru
//      menerima alarm kalau ada jantung mati.
// ============================================================
import fs from 'fs';
import { catatOtonomi } from './otonomi';

const DIR_NADI = '/home/z/my-project/db/elsa/nadi-gudang';
const FILE_DENYUT = `${DIR_NADI}/denyut.json`;
const JEDA_MS = 5 * 60_000;
const CAP_RIWAYAT = 120;

type Rec = Record<string, unknown>;
const n = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const s = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v.trim() : null);

function baca<T>(fp: string): T | null {
  try {
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { return null; }
}
function tulis(fp: string, v: unknown): void {
  try {
    fs.mkdirSync(DIR_NADI, { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(v));
  } catch { /* abai */ }
}

export type JantungPantau = {
  id: string;
  nama: string;
  file: string;
  jedaTargetMenit: number; // berapa lama denyut boleh telat
  detakKe: number;
  atTerakhir: string | null;
  umurMenit: number | null;
  hidup: boolean;
  alarm: string | null; // non-null = AMIGDALA TIDUR
  aksiTeks: string;
};
export type BerkasGudang = {
  file: string; // path relatif db/
  ukuranB: number;
  umurTulisMenit: number | null;
  makanSiapa: string;
  berdenyut: boolean; // ditulis <24 jam terakhir
};
export type DenyutNadi = {
  at: string;
  detakKe: number;
  jantung: JantungPantau[];
  gudang: BerkasGudang[];
  alarm: string[]; // daftar amigdala tidur (bahasa jujur)
  cerita: string;
};
export type NadiGudangData = { at: string; detakKe: number; atTerakhir: string | null; terkini: DenyutNadi | null; riwayat: DenyutNadi[] };

// JANTUNG registry — file state + toleransi telat (menit)
const JANTUNG: { id: string; nama: string; file: string; jeda: number; detakKey: string; atKey: string; aksiKey?: string; eventDriven?: boolean }[] = [
  { id: 'ujian-mandiri', nama: 'Jantung Ujian Mandiri', file: 'elsa/ujian-mandiri/denyut.json', jeda: 35, detakKey: 'detakKe', atKey: 'atTerakhir', aksiKey: 'pemicuTerakhir' },
  { id: 'dompet-jantung', nama: 'Jantung Dompet $1000', file: 'elsa/dompet-jantung/denyut.json', jeda: 3, detakKey: 'detakKe', atKey: 'atTerakhir', aksiKey: 'aksiTeks' },
  { id: 'ignisi', nama: 'Radar Ignisi (anti-kecolongan)', file: 'elsa/paus/ignisi.json', jeda: 3, detakKey: 'keadaan.denyutKe', atKey: 'at', aksiKey: 'keadaan.negara' },
  { id: 'paus-jiwa', nama: 'Jiwa Radar Paus', file: 'elsa/paus/neuron.json', jeda: 6, detakKey: 'denyutKe', atKey: 'at' },
  { id: 'kasus', nama: 'Otak Kasus', file: 'elsa/kasus/kasus.json', jeda: 120, detakKey: null, atKey: 'kasus.0.atDibuat', eventDriven: true },
  { id: 'sumber', nama: 'Denyut Matriks Sumber', file: 'elsa/sumber_denyut.json', jeda: 10, detakKey: null, atKey: 'updateTerakhir' },
  { id: 'guru', nama: 'Neuron Guru (LLM)', file: 'elsa/guru/pemahaman.json', jeda: 35, detakKey: null, atKey: 'at' },
  { id: 'persilangan', nama: 'Bus Persilangan', file: 'elsa/persilangan/bus.json', jeda: 20, detakKey: 'denyutKe', atKey: 'atTerakhir' },
  { id: 'briefing', nama: 'Briefing Guru', file: 'elsa/briefing/terkini.json', jeda: 25, detakKey: null, atKey: 'at' },
  { id: 'pertumbuhan', nama: 'Otak Pertumbuhan', file: 'elsa/pertumbuhan/neuron.json', jeda: 20, detakKey: 'detakKe', atKey: 'atTerakhir' },
];

// GUDANG inventory — file nyata + siapa yang diberi makan
const GUDANG: { file: string; makan: string }[] = [
  { file: 'elsa/dompet.json', makan: 'Dompet $1000 · Sinaps DOMPET · Guru' },
  { file: 'elsa/toko.json', makan: 'Arena (buku cuan, events, aktif)' },
  { file: 'elsa/ujian/hasil_terakhir.json', makan: 'Ujian ELSA 100 · Guru · Pertumbuhan' },
  { file: 'elsa/ujian/soal_set.json', makan: 'Ujian ELSA 100 (set soal tumbuh)' },
  { file: 'elsa/ujian-mandiri/daftar.json', makan: 'Daftar hari diadili · Pertumbuhan' },
  { file: 'elsa/riwayat_harian.json', makan: 'Memori candle ELSA (tumbuh sendiri)' },
  { file: 'elsa/riwayat_btc.json', makan: 'Memori iklim BTC (konteks beta)' },
  { file: 'elsa/paus/ignisi.json', makan: 'Radar ignisi · Dompet · Guru' },
  { file: 'elsa/paus/neuron.json', makan: 'Jiwa paus · Guru · Persilangan' },
  { file: 'elsa/lintasan/neuron.json', makan: 'Otak lintasan · Dompet' },
  { file: 'elsa/modal-jiwa/neuron.json', makan: 'Modal-jiwa (pedang K) · Dompet' },
  { file: 'elsa/paham/neuron.json', makan: 'Otak paham (regime medan) · Guru' },
  { file: 'elsa/kasus/kasus.json', makan: 'Otak kasus · Guru · Dompet' },
  { file: 'elsa/otonomi/otonomi.json', makan: 'Buku nyala mandiri semua mesin' },
  { file: 'elsa/persilangan/bus.json', makan: 'Bus persilangan · Guru · Dompet' },
  { file: 'elsa/briefing/riwayat.json', makan: 'Briefing guru hidup' },
  { file: 'elsa/pertumbuhan/riwayat.json', makan: 'Diary pertumbuhan · Guru' },
  { file: 'elsa/nadi-gudang/denyut.json', makan: 'Nadi & gudang (sendiri)' },
  { file: 'elsa/guru/pemahaman.json', makan: 'Pemahaman mandiri guru' },
  { file: 'elsa/guru/berita.json', makan: 'Mata pasar guru' },
  { file: 'elsa/dompet-jantung/jurnal.json', makan: 'Diary jantung dompet' },
  { file: 'elsa/dompet-jantung/neuron.json', makan: 'Neuron dompet (pelajaran tutup)' },
  { file: 'elsa/ujian-mandiri/denyut.json', makan: 'Jantung ujian mandiri' },
  { file: 'elsa/sumber_denyut.json', makan: 'Denyut matriks sumber' },
];

function ambilPath(a: Record<string, unknown>, path: string): unknown {
  let cur: unknown = a;
  for (const seg of path.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[seg];
  }
  return cur;
}

function galiliJantung(now: number): { jantung: JantungPantau[]; alarm: string[] } {
  const jantung: JantungPantau[] = [];
  const alarm: string[] = [];
  for (const j of JANTUNG) {
    const full = `/home/z/my-project/db/${j.file}`;
    const d = baca<Rec>(full);
    const detak = j.detakKey ? (n(ambilPath(d ?? {}, j.detakKey)) ?? 0) : (d ? 1 : 0);
    const atRaw = j.atKey ? ambilPath(d ?? {}, j.atKey) : null;
    const at = typeof atRaw === 'string' && atRaw ? atRaw : null;
    const umur = at ? Math.round((now - Date.parse(at)) / 60000) : null;
    const tidur = umur === null || umur > j.jeda;
    const aksi = j.aksiKey ? (s(ambilPath(d ?? {}, j.aksiKey)) ?? '—') : '—';
    const alarmTeks = tidur
      ? j.eventDriven
        ? `AMIGDALA TENANG (event-driven): ${j.nama} tak menulis berkas ${umur === null ? 'sepanjang catatan tersedia' : `${umur} menit`} — organ ini hanya menulis SAAT PERISTIWA (kasus baru); pindaian tetap berjalan latar. Pantau terus bila melewati ${j.jeda} mnt`
        : `AMIGDALA TIDUR: ${j.nama} tak berdenyut ${umur === null ? 'sepanjang catatan tersedia' : `${umur} menit`} (batas ${j.jeda} mnt) — kecolongan berbahaya lahir dari jantung mati yang tak terdengar`
      : null;
    if (alarmTeks) alarm.push(alarmTeks);
    jantung.push({
      id: j.id, nama: j.nama, file: j.file, jedaTargetMenit: j.jeda,
      detakKe: detak, atTerakhir: at, umurMenit: umur, hidup: !tidur, alarm: alarmTeks,
      aksiTeks: aksi,
    });
  }
  return { jantung, alarm };
}

function galiliGudang(now: number): BerkasGudang[] {
  const out: BerkasGudang[] = [];
  for (const g of GUDANG) {
    const full = `/home/z/my-project/db/${g.file}`;
    try {
      if (!fs.existsSync(full)) {
        out.push({ file: g.file, ukuranB: 0, umurTulisMenit: null, makanSiapa: g.makan, berdenyut: false });
        continue;
      }
      const st = fs.statSync(full);
      const umur = Math.round((now - st.mtimeMs) / 60000);
      out.push({
        file: g.file, ukuranB: st.size, umurTulisMenit: umur,
        makanSiapa: g.makan, berdenyut: umur <= 24 * 60,
      });
    } catch {
      out.push({ file: g.file, ukuranB: 0, umurTulisMenit: null, makanSiapa: g.makan, berdenyut: false });
    }
  }
  return out;
}

let berjalan = false;
export async function denyutNadi(): Promise<DenyutNadi | null> {
  if (berjalan) return null;
  berjalan = true;
  try {
    const now = Date.now();
    const lama = baca<NadiGudangData>(FILE_DENYUT);
    const detakKe = (lama?.detakKe ?? 0) + 1;
    const { jantung, alarm } = galiliJantung(now);
    const gudang = galiliGudang(now);
    const nHidup = jantung.filter((j) => j.hidup).length;
    const nGudangHidup = gudang.filter((g) => g.berdenyut).length;
    const cerita = alarm.length
      ? `galian ke-${detakKe}: ${nHidup}/${jantung.length} jantung hidup, ${nGudangHidup}/${gudang.length} berkas gudang berdenyut 24 jam — ${alarm.length} AMIGDALA TIDUR: ${alarm.map((a) => a.split(':')[0].replace('AMIGDALA TIDUR: ', '')).join(', ')}. Nadi yang bekerja adalah vitamin otak: tanpa galian ini kecolongan datang diam-diam.`
      : `galian ke-${detakKe}: SEMUA ${jantung.length}/${jantung.length} jantung hidup · ${nGudangHidup}/${gudang.length} berkas gudang berdenyut — amigdala tiap organ menyala; nadi mendengar semuanya.`;
    const denyut: DenyutNadi = { at: new Date(now).toISOString(), detakKe, jantung, gudang, alarm, cerita };
    const data: NadiGudangData = {
      at: denyut.at, detakKe, atTerakhir: denyut.at, terkini: denyut,
      riwayat: [denyut, ...(lama?.riwayat ?? [])].slice(0, CAP_RIWAYAT),
    };
    tulis(FILE_DENYUT, data);
    catatOtonomi({
      mesin: 'NADI', pemicu: 'JANTUNG', mandiri: true,
      hasil: `galian ke-${detakKe}: ${nHidup}/${jantung.length} jantung hidup${alarm.length ? ` — ${alarm.length} amigdala tidur` : ''}`,
      bukti: alarm.length ? alarm[0] : `jantung ${jantung.map((j) => `${j.id}:${j.umurMenit ?? '?'}m`).join(' · ')}`.slice(0, 200),
    });
    return denyut;
  } finally {
    berjalan = false;
  }
}

export function mulaiNadi(): void {
  const g = globalThis as { __elsaNadiTimer?: NodeJS.Timeout; __elsaNadiAwal?: boolean };
  if (g.__elsaNadiAwal) return;
  g.__elsaNadiAwal = true;
  setTimeout(() => { void denyutNadi(); }, 15_000);
  g.__elsaNadiTimer = setInterval(() => { void denyutNadi(); }, JEDA_MS);
}

export function bacaNadiGudang(): NadiGudangData {
  const d = baca<NadiGudangData>(FILE_DENYUT);
  if (d) return d;
  // belum pernah berdenyut — galikan sekali (sinkron, file kecil)
  const now = Date.now();
  const { jantung, alarm } = galiliJantung(now);
  const denyut: DenyutNadi = {
    at: new Date(now).toISOString(), detakKe: 0, jantung, gudang: galiliGudang(now), alarm,
    cerita: 'nadi belum berdenyut jadwal — galian pertama langsung saat dibaca (jujur dilabel)',
  };
  return { at: denyut.at, detakKe: 0, atTerakhir: null, terkini: denyut, riwayat: [denyut] };
}
