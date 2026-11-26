// ============================================================
// MICAPROFITA-ELSA · OTAK PERTUMBUHAN — pertumbuhan punya NEURON.
// (keluhan pemilik, 2026-11-26): "pertumbuhan… gak miliki neuron…
//  harusnya mereka hidup dan terus berkembang."
// Dulu: AGI% hanya dihitung saat payload dibangun — angka di layar
// tanpa ingatan, tanpa delta, tanpa arah tumbuh. Kini tiap 15 menit
// organ ini BERDENYUT MANDIRI:
//   1) SNAPSHOT — menimbang dirinya dari bukti nyata: buku cuan
//      (akurasi & ekspektansi rencana teradili), ujian ELSA 100,
//      ujian mandiri (akurasi & brier walk-forward), memori candle
//      (riwayat harian yang tumbuh), otak kasus (pelajaran),
//      persilangan (pertukaran neuron), dompet hidup (ekuitas).
//   2) DELTA JUJUR — dibandingkan snapshot sebelumnya: apa yang
//      TUMBUH, apa yang MEMUNDUR — dilarang memanggil semua
//      perubahan "tumbuh" (kebocoran AGI lama: angka naik bukan
//      karena belajar, tapi karena angka diganti).
//   3) DIREKTIF — 3 arah tumbuh berikutnya ditarik dari KELEMAHAN
//      nyata snapshot (dimensi terendah dulu), masing-masing dengan
//      mengapa + cara ukur (bisa terbukti salah).
//   4) DIARY + OTONOMI — snapshot disimpan berantai (cap 240) dan
//      nyala dicatat di buku otonomi; guru membaca direktif teratas.
// ============================================================
import fs from 'fs';
import { catatOtonomi } from './otonomi';

const DIR_PER = '/home/z/my-project/db/elsa/pertumbuhan';
const FILE_NEURON = `${DIR_PER}/neuron.json`;
const FILE_RIWAYAT = `${DIR_PER}/riwayat.json`;
const JEDA_MS = 15 * 60_000;
const CAP_RIWAYAT = 240;

type Rec = Record<string, unknown>;
const r = (v: unknown): Rec | null => (v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Rec) : null);
const n = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const s = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v.trim() : null);
const xs = (v: unknown): unknown[] | null => (Array.isArray(v) ? v : null);

function baca<T>(fp: string): T | null {
  try {
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { return null; }
}
function tulis(fp: string, v: unknown): void {
  try {
    fs.mkdirSync(DIR_PER, { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(v));
  } catch { /* abai */ }
}

export type Dimensi = { id: string; label: string; nilai: number; bukti: string };
export type Direktif = { id: string; label: string; mengapa: string; ukur: string; potensiPp: number };
export type Snapshot = {
  at: string;
  detakKe: number;
  agi: number; // 0..100 dari 6 dimensi (rata geometri berbobot — satu nol menghukum)
  dimensi: Dimensi[];
  delta: { id: string; label: string; pp: number }[];
  naik: string[]; // yang tumbuh sejak snapshot lalu
  turun: string[]; // yang memundur — diakui terbuka
  direktif: Direktif[];
  cerita: string;
};
export type NeuronPertumbuhan = { v: 1; detakKe: number; atTerakhir: string | null; terkini: Snapshot | null };

function bacaToko(): Rec | null { return baca<Rec>('/home/z/my-project/db/elsa/toko.json'); }

function ukur(): { dimensi: Dimensi[]; agi: number; buktiLain: Record<string, number> } {
  const dim: Dimensi[] = [];
  // D1 Laba kumulatif dompet hidup (modal yang benar-benar dijalani)
  // ekuitas dibaca dari ENTRI LEDGER TERAKHIR (dompet.json tidak menyimpan
  // ekuitas top-level — setiap SETORAN/BUKA/TUTUP dicatat beserta ekuitasnya)
  const dom = baca<Rec>('/home/z/my-project/db/elsa/dompet.json');
  const bukuDom = (xs(dom?.buku) ?? []).map(r).filter((x): x is Rec => !!x);
  const entriTerakhir = bukuDom.length ? bukuDom[bukuDom.length - 1] : null;
  const ek = n(entriTerakhir?.ekuitas) ?? n(dom?.saldo) ?? 0;
  const setoran = n(dom?.totalSetoran) ?? 1000;
  const pnlPct = ((ek - setoran) / Math.max(setoran, 1)) * 100;
  dim.push({
    id: 'laba', label: 'Laba modal hidup',
    nilai: Math.max(0, Math.min(1, 0.5 + pnlPct / 40)), // ±40% → 0..1
    bukti: `ekuitas ledger $${ek.toFixed(2)} vs setoran $${setoran.toFixed(0)} (${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)${dom?.posisi ? ' · posisi hidup mengambang, ekuitas = catatan terakhir' : ''}`,
  });
  // D2 Akurasi rencana teradili (buku cuan)
  const toko = bacaToko();
  const buku = xs(toko?.bukuCuan) ?? [];
  const nonBatal = buku.map(r).filter((x): x is Rec => !!x && s(x.hasil) !== 'BATAL');
  const menang = nonBatal.filter((x) => (n(x.netPct) ?? 0) > 0).length;
  const akurasi = nonBatal.length ? menang / nonBatal.length : 0.5;
  dim.push({
    id: 'akurasi', label: 'Akurasi rencana',
    nilai: Math.max(0.05, akurasi),
    bukti: `${menang}/${nonBatal.length} rencana menang after-fee`,
  });
  // D3 Ekspektansi (kualitas R)
  const eks = nonBatal.length ? (nonBatal.reduce((acc, x) => acc + (n(x.netPct) ?? 0), 0) / nonBatal.length) : 0;
  dim.push({
    id: 'ekspektansi', label: 'Ekspektansi R',
    nilai: Math.max(0, Math.min(1, 0.5 + eks / 6)),
    bukti: `rata-rata net ${eks.toFixed(2)}%/rencana`,
  });
  // D4 Ujian mandiri walk-forward (akurasi harian)
  const daftar = baca<Rec[]>('/home/z/my-project/db/elsa/ujian-mandiri/daftar.json');
  const dArr = (daftar ?? []).map(r).filter((x): x is Rec => !!x && x.benar !== undefined);
  const akUjian = dArr.length ? dArr.filter((x) => x.benar === true).length / dArr.length : 0.5;
  dim.push({
    id: 'ujian-mandiri', label: 'Akurasi ujian mandiri',
    nilai: Math.max(0.05, akUjian),
    bukti: `${dArr.length} hari diadili — akurasi ${(akUjian * 100).toFixed(1)}%`,
  });
  // D5 Ujian ELSA 100 (lulus /100)
  const uji = baca<Rec>('/home/z/my-project/db/elsa/ujian/hasil_terakhir.json');
  const lulus = n(r(uji?.metrik)?.lulus) ?? 0;
  dim.push({
    id: 'ujian-100', label: 'Ujian ELSA 100',
    nilai: lulus / 100,
    bukti: `${lulus}/100 lulus (${s(uji?.status) ?? '—'})`,
  });
  // D6 Ingatan hidup: memori candle + pelajaran kasus + pertukaran neuron
  const memori = (() => { try { return (baca<Rec>('/home/z/my-project/db/elsa/riwayat_harian.json')?.data as unknown[]) ?? []; } catch { return []; } })();
  const kasus = baca<Rec>('/home/z/my-project/db/elsa/kasus/kasus.json');
  const nPelajaran = ((xs(kasus?.kasus) ?? []).map(r).reduce((acc, k) => acc + (xs(k?.pelajaran)?.length ?? 0), 0)) || 0;
  const bus = baca<Rec>('/home/z/my-project/db/elsa/persilangan/bus.json');
  const nKirim = ((xs(bus?.ronde) ?? []).map(r).reduce((acc, x) => acc + (xs(x?.kirim)?.length ?? 0), 0)) || 0;
  const ingat = Math.min(1, (memori.length / 320) * 0.4 + (nPelajaran / 15) * 0.3 + (nKirim / 80) * 0.3);
  dim.push({
    id: 'ingatan', label: 'Ingatan & neuron hidup',
    nilai: Math.max(0.05, ingat),
    bukti: `${memori.length} candle · ${nPelajaran} pelajaran kasus · ${nKirim} kiriman persilangan`,
  });
  // rata geometri berbobot — sifat AGI yang benar: satu dimensi nol menghukum
  const bobot: Record<string, number> = { laba: 0.25, akurasi: 0.2, ekspektansi: 0.15, 'ujian-mandiri': 0.2, 'ujian-100': 0.1, ingatan: 0.1 };
  const agi = dim.reduce((acc, d) => acc * Math.pow(Math.max(Math.min(d.nilai, 1), 0.001), bobot[d.id] ?? 0.1), 1) * 100;
  return { dimensi: dim, agi: Math.round(agi * 100) / 100, buktiLain: { pnlPct, memori: memori.length } };
}

function direktifDari(dim: Dimensi[], lama: Snapshot | null): Direktif[] {
  const urut = [...dim].sort((a, b) => a.nilai - b.nilai).slice(0, 3);
  const PETA: Record<string, { label: string; mengapa: string; ukur: string; potensi: number }> = {
    laba: {
      label: 'Kualitas pedang dompet: R>1 dulu, frekuensi kemudian',
      mengapa: 'modal hidup adalah dimensi paling mahal — rugi bukan angka, ini biaya pendidikan yang terlalu besar',
      ukur: 'rata R posisi jantung naik ≥1.1 dalam 20 tutup berikutnya',
      potensi: 2.2,
    },
    akurasi: {
      label: 'Perketat dewan: duty gagal yang paling sering lolos diaudit',
      mengapa: 'akurasi rencana di bawah 50% berarti guard terlalu manis terhadap sinyal lemah',
      ukur: 'hit-rate 20 rencana berikutnya ≥55%',
      potensi: 1.8,
    },
    ekspektansi: {
      label: 'Target menjalar lebih agresif saat ignisi searah (velocity × 2.5 → 3)',
      mengapa: 'ekspektansi tipis = profit dibuang di TP σ kecepetan (pelajaran 03:00)',
      ukur: 'net rata-rata/rencana naik ≥0.5 pp',
      potensi: 1.4,
    },
    'ujian-mandiri': {
      label: 'Latih otak arah pada hari-hari yang GAGAL saja (anti-lupa)',
      mengapa: 'akurasi walk-forward adalah akurasi sesungguhnya — hari gagal adalah guru paling jujur',
      ukur: 'akurasi ujian mandiri +3 pp dalam 7 denyut',
      potensi: 1.6,
    },
    'ujian-100': {
      label: 'Dua-tier dijalankan penuh: buku kasus untuk ujian, konteks untuk hari hidup',
      mengapa: 'lulus <100 berarti masih ada soal yang otak tak bisa jelaskan — kebodohan yang belum ditanam',
      ukur: 'lulusTanpaKasus naik ≥2 soal',
      potensi: 1.2,
    },
    ingatan: {
      label: 'Konsolidasi memori: episode → pola (dedup) tiap candle baru',
      mengapa: 'ingatan mentah yang menumpuk bukan kepahaman — kompresi yang membuatnya dibaca saat keputusan',
      ukur: 'jumlah pola terverifikasi +≥3 dalam 24 jam',
      potensi: 1.1,
    },
  };
  const out: Direktif[] = urut.map((d) => {
    const peta = PETA[d.id];
    const gagalLama = lama?.direktif.find((x) => x.id === d.id);
    return {
      id: d.id,
      label: peta?.label ?? `Angkat dimensi ${d.label}`,
      mengapa: `${peta?.mengapa ?? 'dimensi terendah'} — bukti sekarang: ${d.bukti}`,
      ukur: `${peta?.ukur ?? 'nilai dimensi naik dalam 24 jam'}${gagalLama ? ' · direktif sama muncul lagi = pelajaran belum dikerjakan (jujur, diberi tanda)' : ''}`,
      potensiPp: peta?.potensi ?? 1,
    };
  });
  return out;
}

let berjalan = false;
export async function denyutPertumbuhan(): Promise<Snapshot | null> {
  if (berjalan) return null;
  berjalan = true;
  try {
    const lama = baca<NeuronPertumbuhan>(FILE_NEURON)?.terkini ?? null;
    const { dimensi, agi } = ukur();
    const delta = lama
      ? dimensi.map((d) => {
        const l = lama.dimensi.find((x) => x.id === d.id);
        return { id: d.id, label: d.label, pp: l ? Math.round((d.nilai - l.nilai) * 10000) / 100 : 0 };
      })
      : [];
    const naik = delta.filter((d) => d.pp > 0.001).map((d) => `${d.label} +${d.pp.toFixed(2)} pp`);
    const turun = delta.filter((d) => d.pp < -0.001).map((d) => `${d.label} ${d.pp.toFixed(2)} pp`);
    const direktif = direktifDari(dimensi, lama);
    const cerita = lama
      ? `denyut ke-${(baca<NeuronPertumbuhan>(FILE_NEURON)?.detakKe ?? 0) + 1}: AGI ${(lama.agi).toFixed(2)}% → ${agi.toFixed(2)}% (${agi >= lama.agi ? 'TUMBUH' : 'MEMUNDUR — diakui, bukan disembunyikan'}) · naik: ${naik.join(', ') || '—'} · turun: ${turun.join(', ') || '—'} · direktif teratas: ${direktif[0]?.label ?? '—'}`
      : `snapshot pertama otak pertumbuhan: AGI ${agi.toFixed(2)}% dari ${dimensi.length} dimensi berbobot — dari sinilah tumbuhnya diukur`;
    const snap: Snapshot = {
      at: new Date().toISOString(),
      detakKe: (baca<NeuronPertumbuhan>(FILE_NEURON)?.detakKe ?? 0) + 1,
      agi, dimensi, delta, naik, turun, direktif, cerita,
    };
    const neuron: NeuronPertumbuhan = { v: 1, detakKe: snap.detakKe, atTerakhir: snap.at, terkini: snap };
    tulis(FILE_NEURON, neuron);
    const riwayat = baca<Snapshot[]>(FILE_RIWAYAT) ?? [];
    riwayat.unshift(snap);
    tulis(FILE_RIWAYAT, riwayat.slice(0, CAP_RIWAYAT));
    catatOtonomi({
      mesin: 'PERTUMBUHAN', pemicu: 'JANTUNG', mandiri: true,
      hasil: `snapshot ke-${snap.detakKe}: AGI ${agi.toFixed(2)}% (${agi >= (lama?.agi ?? agi) ? 'tumbuh/stabil' : 'memundur'}) — ${naik.length} naik, ${turun.length} turun`,
      bukti: `${dimensi.map((d) => `${d.id} ${(d.nilai * 100).toFixed(0)}%`).join(' · ')}`,
    });
    return snap;
  } finally {
    berjalan = false;
  }
}

export function mulaiPertumbuhan(): void {
  const g = globalThis as { __elsaPertumbuhanTimer?: NodeJS.Timeout; __elsaPertumbuhanAwal?: boolean };
  if (g.__elsaPertumbuhanAwal) return;
  g.__elsaPertumbuhanAwal = true;
  setTimeout(() => { void denyutPertumbuhan(); }, 9000);
  g.__elsaPertumbuhanTimer = setInterval(() => { void denyutPertumbuhan(); }, JEDA_MS);
}

// payload UI + bacaan guru
export function bacaPertumbuhanPayload(): { neuron: NeuronPertumbuhan | null; riwayat: Snapshot[]; statistik: { umurMenit: number | null; dimensiTerlemah: string | null } } {
  const neuron = baca<NeuronPertumbuhan>(FILE_NEURON);
  const riwayat = baca<Snapshot[]>(FILE_RIWAYAT) ?? [];
  const umur = neuron?.terkini ? Math.round((Date.now() - Date.parse(neuron.terkini.at)) / 60000) : null;
  const terlemah = neuron?.terkini
    ? [...neuron.terkini.dimensi].sort((a, b) => a.nilai - b.nilai)[0]?.label ?? null
    : null;
  return { neuron, riwayat: riwayat.slice(0, 24), statistik: { umurMenit: umur, dimensiTerlemah: terlemah } };
}
