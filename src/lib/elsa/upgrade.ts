// ============================================================
// MICAPROFITA-ELSA · MESIN UPGRADE & DOMINO — ruh ujian yang hidup
// (keluhan pemilik 2026-11-24): "ujian & upgrade terkesan tak ada
// ruh alias semacam piagam dan nampak useless padahal fundamental;
// kalau ini hanya hiasan tak ada efek domino apapun, ini kelemahan
// terfatal — tak akan pernah mampu adanya perkembangan."
// Jadi ujian WAJIB mengalir (bukan piagam):
//   1) TEMPA  — pelajaran konteks v0..v3 hasil ujian difus jadi
//               NEURON INDEX (db/elsa/upgrade/neuron.json).
//   2) UPGRADE — validasi 100-soal TANPA buku kasus dijalankan;
//               knob hidup (bobot, penalti maks, adopsi rencana)
//               dihitung DARI ANGKA NYATA validasi itu.
//   3) HIDUP  — kunciSlot & payload mengonsumsi konsultasi konteks:
//               konflik → penalti keyakinan + serangan tim merah;
//               seselaras → bertahan + adopsi target/stop terbukti
//               (buku kasus v4 TETAP tidak pernah menyentuh hidup).
//   4) UMPAN BALIK — tiap slot ditutup (TP/SL/kedaluwarsa/batal),
//               sikap neuron saat kunci dicatat bersama hasil nyata:
//               domino.json — bukti rantai "ujian → hidup → adili".
// Hukum jujur: tanpa validasi → knob paling konservatif; neuron basi
// (pelajaran bertambah) → ditandai BASI, upgrade dijalankan ulang.
// ============================================================
import fs from 'fs';
import { Candle } from './indicators';
import { fingerprintHidup, konsultasiKonteksOnly, ujianKonteksOnly, bacaPelajaranSemua } from './ujian';

const DIR_UP = '/home/z/my-project/db/elsa/upgrade';
function bacaUp<T>(file: string, def: T): T {
  try {
    fs.mkdirSync(DIR_UP, { recursive: true });
    const p = `${DIR_UP}/${file}`;
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
  } catch { /* abai */ }
  return def;
}
function tulisUp(file: string, data: unknown) {
  try {
    fs.mkdirSync(DIR_UP, { recursive: true });
    fs.writeFileSync(`${DIR_UP}/${file}`, JSON.stringify(data));
  } catch { /* abai */ }
}

// ---------------- tipe ----------------
export type NeuronEntry = {
  aksi: 'BUY' | 'SELL' | 'TOLAK'; n: number; net: number;
  targetPct: number | null; stopPct: number | null;
  contohHari: string; asal: string;
};
export type NeuronKnob = {
  bobotKonteks: number; penaltiKonflikMaks: number; adopsiRencana: boolean; dasar: string;
};
export type NeuronData = {
  at: string; sourceJumlah: number;
  index: Record<string, NeuronEntry>;
  nV0: number; nV1: number;
  validasi: { soal: number; dijawabKonteks: number; lulus: number; gagal: number; netPct: number };
  knob: NeuronKnob;
};
export type DominoSikap = 'SESELARAS' | 'KONFLIK' | 'MENOLAK' | 'TANPA_BUKTI';
export type DominoTindakan = 'ADOPSI_RENCANA' | 'PENALTI_KEYAKINAN' | 'BERTAHAN' | 'TANPA_BUKTI';
export type DominoAktif = {
  versi: string; aksiKonteks: 'BUY' | 'SELL' | 'TOLAK'; nKasus: number; netBukti: number;
  sikap: DominoSikap; poinPenalti: number; tindakan: DominoTindakan;
};
export type DominoEvent = {
  at: string; hari: string; arah: 'BUY' | 'SELL'; hasil: string; netPct: number;
  sikapSaatKunci: DominoSikap; konteksAksi: string; nKasus: number; netBukti: number;
  versi: string; tindakan: DominoTindakan; cerita: string;
};
export type UpgradeData = {
  at: string;
  neuron: NeuronData | null;
  segar: boolean;
  pelajaranJumlah: number;
  nV0: number; nV1: number; nV2: number; nV3: number;
  neuronSampel: ({ kunci: string } & NeuronEntry)[];
  umpanBalik: DominoEvent[];
};

const KNOB_MATA: NeuronKnob = { bobotKonteks: 0.3, penaltiKonflikMaks: 4, adopsiRencana: false, dasar: 'neuron belum dibangun — knob paling konservatif; konteks hanya keterangan' };

export function bacaNeuron(): NeuronData | null {
  return bacaUp<NeuronData | null>('neuron.json', null);
}

// ---------------- build neuron index dari pelajaran ujian ----------------
function difusIndex(pel: { fpVersi: 0 | 1 | 2 | 3 | 4; fp: string; aksi: string; targetPct: number | null; stopPct: number | null; netPerbaikan: number; hariAsal: string; alasan: string }[], versi: 0 | 1): Record<string, NeuronEntry> {
  const idx: Record<string, NeuronEntry> = {};
  const anggota = pel.filter((p) => p.fpVersi === versi);
  const konteks: Record<string, typeof anggota> = {};
  for (const p of anggota) (konteks[p.fp] ??= []).push(p);
  for (const [fp, rows] of Object.entries(konteks)) {
    const agg: Record<string, { n: number; net: number; terbaik: (typeof rows)[number] | null }> = {};
    for (const p of rows) {
      const a = (agg[p.aksi] ??= { n: 0, net: 0, terbaik: null });
      a.n += 1;
      a.net += p.netPerbaikan;
      if (!a.terbaik || p.netPerbaikan > a.terbaik.netPerbaikan) a.terbaik = p;
    }
    const urut = Object.entries(agg).sort((x, y) => y[1].net - x[1].net);
    const [aksi, stat] = urut[0];
    const seri = urut.length > 1 && Math.abs(urut[0][1].net - urut[1][1].net) < 1e-9;
    const t = stat.terbaik;
    idx[`v${versi}|${fp}`] = {
      aksi: (aksi === 'TOLAK' || seri ? 'TOLAK' : aksi) as 'BUY' | 'SELL' | 'TOLAK',
      n: stat.n, net: Math.round(stat.net * 100) / 100,
      targetPct: aksi === 'TOLAK' || seri || !t ? null : t.targetPct,
      stopPct: aksi === 'TOLAK' || seri || !t ? null : t.stopPct,
      contohHari: t?.hariAsal ?? '—', asal: t?.alasan.slice(0, 160) ?? '',
    };
  }
  return idx;
}

function turunkanKnob(val: { soal: number; dijawabKonteks: number; lulus: number; netPct: number }): NeuronKnob {
  const cakupan = val.dijawabKonteks / Math.max(1, val.soal);
  const akurasiKonteks = val.dijawabKonteks > 0 ? val.lulus / val.dijawabKonteks : 0;
  const bobot = val.netPct > 0 && cakupan >= 0.3 ? 1 : val.netPct > 0 ? 0.6 : 0.3;
  const penalti = val.netPct >= 8 && cakupan >= 0.3 ? 9 : val.netPct > 0 ? 6 : 4;
  const adopsi = val.netPct > 0 && cakupan >= 0.2 && akurasiKonteks >= 0.55;
  const dasar = `dihitung dari validasi nyata: cakupan konteks ${(cakupan * 100).toFixed(0)}% (${val.dijawabKonteks}/${val.soal} soal), lulus ${val.lulus} (akurasi ${(akurasiKonteks * 100).toFixed(0)}% di soal yang dijawab konteks), net ${val.netPct}% after-fee → bobot konteks ${bobot}, penalti konflik maks ${penalti} poin, adopsi rencana terbukti ${adopsi ? 'AKTIF' : 'MATI'} (butuh net>0, cakupan≥20%, akurasi≥55%)`;
  return { bobotKonteks: bobot, penaltiKonflikMaks: penalti, adopsiRencana: adopsi, dasar };
}

// DIPANGGIL arena.jalankanUpgradePenuh (satu pintu; genome+events ditulis arena)
export async function bangunNeuron(paksa = false): Promise<{ baru: boolean; neuron: NeuronData }> {
  const pel = bacaPelajaranSemua();
  const lama = bacaNeuron();
  if (!paksa && lama && lama.sourceJumlah === pel.length) return { baru: false, neuron: lama };
  const validasi = await ujianKonteksOnly();
  const neuron: NeuronData = {
    at: new Date().toISOString(),
    sourceJumlah: pel.length,
    index: { ...difusIndex(pel, 0), ...difusIndex(pel, 1) },
    nV0: pel.filter((p) => p.fpVersi === 0).length,
    nV1: pel.filter((p) => p.fpVersi === 1).length,
    validasi,
    knob: turunkanKnob(validasi),
  };
  tulisUp('neuron.json', neuron);
  return { baru: true, neuron };
}

// ---------------- konsultasi hidup (dipanggil kunciSlot & payload) ----------------
export function hitungDominoHidup(cs: Candle[], btcWin: Candle[], m4h: number, hariIni: string, vonisVonis: 'BUY' | 'SELL') {
  const { fp } = fingerprintHidup(cs, btcWin, m4h, hariIni);
  const pel = bacaPelajaranSemua();
  const konsultasi = konsultasiKonteksOnly(pel, fp, hariIni);
  const neuron = bacaNeuron();
  const knob = neuron?.knob ?? KNOB_MATA;
  const sikap: DominoSikap = !konsultasi.ada
    ? 'TANPA_BUKTI'
    : konsultasi.aksi === 'TOLAK'
      ? 'MENOLAK'
      : konsultasi.aksi === vonisVonis
        ? 'SESELARAS'
        : 'KONFLIK';
  const poin = sikap === 'KONFLIK'
    ? Math.min(knob.penaltiKonflikMaks, 3 + Math.min(konsultasi.nKasus, 5))
    : sikap === 'MENOLAK'
      ? Math.min(knob.penaltiKonflikMaks, 4 + Math.min(konsultasi.nKasus, 5))
      : 0;
  return { fp, konsultasi, sikap, poin, knob, neuronAt: neuron?.at ?? null };
}

export function tindakanDominoOf(sikap: DominoSikap, adopsiTerpakai: boolean): DominoTindakan {
  if (sikap === 'TANPA_BUKTI') return 'TANPA_BUKTI';
  if (sikap === 'SESELARAS') return adopsiTerpakai ? 'ADOPSI_RENCANA' : 'BERTAHAN';
  return 'PENALTI_KEYAKINAN';
}

// ---------------- umpan balik: hasil hidup mengadili rantai ----------------
export async function catatDominoHidup(e: {
  hari: string; arah: 'BUY' | 'SELL'; hasilLabel: string; netPct: number; via: string;
  domino: DominoAktif | null | undefined;
}) {
  const d = e.domino;
  let cerita: string;
  if (!d || d.sikap === 'TANPA_BUKTI') {
    cerita = `slot ${e.arah} ditutup ${e.hasilLabel} net ${e.netPct}% — saat kunci belum ada pelajaran konteks yang cocok; pengalaman hari ini akan ditempa ujian berikutnya`;
  } else if (d.sikap === 'KONFLIK' || d.sikap === 'MENOLAK') {
    cerita = d.sikap === 'MENOLAK'
      ? `pelajaran konteks sudah memperingatkan JAGA MODAL (${d.versi}, ${d.nKasus} hari lain, bukti net ${d.netBukti}%) — rencana ${e.arah} tetap jalan lalu ${e.hasilLabel} net ${e.netPct}%: pengalaman ujian mengadili hidup`
      : `pelajaran konteks melawan (${d.versi}: konteks bilang ${d.konteksAksi}, bukti net ${d.netBukti}% dari ${d.nKasus} hari lain) — rencana ${e.arah} tetap jalan lalu ${e.hasilLabel} net ${e.netPct}%; keyakinan dipangkas ${d.poinPenalti} poin saat kunci`;
  } else if (e.hasilLabel === 'MENANG') {
    cerita = `pelajaran konteks SEARAH (${d.versi}: ${d.konteksAksi}, bukti net ${d.netBukti}% dari ${d.nKasus} hari lain${d.tindakan === 'ADOPSI_RENCANA' ? ', target/stop rencana diadopsi dari pengalaman terbukti' : ''}) — rencana ${e.arah} MENANG net ${e.netPct}%: rantai ujian→hidup terbukti membayar`;
  } else {
    cerita = `pelajaran konteks searah (${d.versi}: ${d.konteksAksi}, bukti net ${d.netBukti}% dari ${d.nKasus} hari lain) — rencana ${e.arah} tetap ${e.hasilLabel} net ${e.netPct}%: bukti searah pun dihakimi medan; pengalaman diperbarui di ujian berikutnya`;
  }
  const ev: DominoEvent = {
    at: new Date().toISOString(), hari: e.hari, arah: e.arah, hasil: e.hasilLabel, netPct: e.netPct,
    sikapSaatKunci: d?.sikap ?? 'TANPA_BUKTI', konteksAksi: d?.aksiKonteks ?? '—',
    nKasus: d?.nKasus ?? 0, netBukti: d?.netBukti ?? 0, versi: d?.versi ?? '—',
    tindakan: d?.tindakan ?? 'TANPA_BUKTI', cerita,
  };
  const daftar = bacaUp<DominoEvent[]>('domino.json', []);
  daftar.unshift(ev);
  tulisUp('domino.json', daftar.slice(0, 60));
}

// ---------------- payload UI ----------------
export function bacaUpgradeData(): UpgradeData {
  const pel = bacaPelajaranSemua();
  const neuron = bacaNeuron();
  const nV = (v: number) => pel.filter((p) => p.fpVersi === v).length;
  const sampel = neuron
    ? Object.entries(neuron.index)
        .map(([kunci, e]) => ({ kunci, ...e }))
        .sort((a, b) => b.n - a.n || Math.abs(b.net) - Math.abs(a.net))
        .slice(0, 14)
    : [];
  return {
    at: new Date().toISOString(),
    neuron,
    segar: !!neuron && neuron.sourceJumlah === pel.length,
    pelajaranJumlah: pel.length,
    nV0: nV(0), nV1: nV(1), nV2: nV(2), nV3: nV(3),
    neuronSampel: sampel,
    umpanBalik: bacaUp<DominoEvent[]>('domino.json', []).slice(0, 12),
  };
}
