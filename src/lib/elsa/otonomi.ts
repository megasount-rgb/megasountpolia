// ============================================================
// MICAPROFITA-ELSA · OTAK OTONOMI — buku nyala mandiri (keluhan
// pemilik 2026-11-26): "dua tombol jalankan upgrade / ujian ulang
// itu pertanda mereka tidak berjalan memiliki ruh — masih perlu
// dicatat dan diklik; paling bahaya, saat diklik tak ada efek
// apapun → jadi oknum pemalas dan kecolongan datang dari sini."
// Hukum baru: DUA MESIN (UJIAN ELSA 100 + UPGRADE) TIDAK BOLEH
// menunggu tangan manusia. Jantung denyut yang menyalakan keduanya
// (candle baru tutup / jadwal / domino ujian), dan SETIAP nyala —
// termasuk cek mandiri yang kesimpulannya "belum perlu refusi" —
// WAJIB TERCATAT di buku ini. Dulu cek tanpa pelajaran baru
// diam saja → tampak seperti mati → terlihat perlu tombol. Kini:
// tidak ada satu pun nyala yang tak terlihat; tidak ada satu pun
// tombol penyala. Kalau mesin gagal menyala, buku ini JUJUR
// memperlihatkan luka itu — bukti hidup, bukan piagam.
// ============================================================
import fs from 'fs';

const DIR_OTO = '/home/z/my-project/db/elsa/otonomi';
const FILE = `${DIR_OTO}/otonomi.json`;
const CAP = 200;

export type MesinOtonomi =
  | 'JANTUNG' | 'UJIAN100' | 'UPGRADE' | 'PAHAM' | 'DOMPET'
  // V6 — organ persilangan/briefing/pertumbuhan/nadi (keluhan pemilik:
  // "mereka gak miliki neuron" — kini tiap organ punya denyut tercatat)
  | 'PERSILANGAN' | 'BRIEFING' | 'PERTUMBUHAN' | 'NADI';
export type EntriOtonomi = {
  at: string; mesin: MesinOtonomi; pemicu: string; mandiri: boolean;
  hasil: string; bukti: string;
};
export type OtonomiData = {
  at: string;
  entri: EntriOtonomi[];
  ringkas: {
    total: number;
    mandiri24j: number;
    ujianTerakhir: EntriOtonomi | null;
    upgradeCekTerakhir: EntriOtonomi | null;
    upgradeBaruTerakhir: EntriOtonomi | null;
    jantungTerakhir: EntriOtonomi | null;
  };
};

function bacaOto(): EntriOtonomi[] {
  try {
    fs.mkdirSync(DIR_OTO, { recursive: true });
    if (fs.existsSync(FILE)) return JSON.parse(fs.readFileSync(FILE, 'utf8')) as EntriOtonomi[];
  } catch { /* abai */ }
  return [];
}

function tulisOto(d: EntriOtonomi[]) {
  try {
    fs.mkdirSync(DIR_OTO, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(d.slice(0, CAP)));
  } catch { /* abai */ }
}

// catatOtonomi — satu-satunya pintu: setiap nyala/cek mesin WAJIB lewat sini.
// mandiri = menyala tanpa tangan pemilik (jantung/domino/jadwal/candle).
export function catatOtonomi(e: { mesin: MesinOtonomi; pemicu: string; mandiri: boolean; hasil: string; bukti?: string }): void {
  const entri: EntriOtonomi = {
    at: new Date().toISOString(),
    mesin: e.mesin, pemicu: e.pemicu, mandiri: e.mandiri,
    hasil: e.hasil, bukti: e.bukti ?? '—',
  };
  const d = bacaOto();
  d.unshift(entri);
  tulisOto(d);
}

export function bacaOtonomi(): OtonomiData {
  const d = bacaOto();
  const batas = Date.now() - 24 * 3600 * 1000;
  const cari = (mesin: MesinOtonomi, filter?: (x: EntriOtonomi) => boolean) =>
    d.find((x) => x.mesin === mesin && (filter ? filter(x) : true)) ?? null;
  return {
    at: new Date().toISOString(),
    entri: d.slice(0, 60),
    ringkas: {
      total: d.length,
      mandiri24j: d.filter((x) => x.mandiri && Date.parse(x.at) >= batas).length,
      ujianTerakhir: cari('UJIAN100'),
      upgradeCekTerakhir: cari('UPGRADE'),
      upgradeBaruTerakhir: cari('UPGRADE', (x) => !x.hasil.startsWith('cek mandiri')),
      jantungTerakhir: cari('JANTUNG'),
    },
  };
}
