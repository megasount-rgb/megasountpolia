// ============================================================
// UJIAN ELSA · MESIN UJI 100 SOAL DARI KEMUNCULAN HINGGA KINI.
// Ujian → kalau satu saja gagal → skill ditempa (pelajaran) →
// ujian ulang → ... hingga TAK ADA SATUPUN KESALAHAN (100/100).
// Jalankan: bun scripts/ujian/mesin_elsa.ts
// ============================================================
import { jalankanUjian } from '../../src/lib/elsa/ujian';

const t0 = Date.now();
const r = await jalankanUjian({ maxRonde: 60 });
const durasi = ((Date.now() - t0) / 1000).toFixed(1);
console.log('=== UJIAN ELSA 100 SOAL (dari kemunculan hingga kini) ===');
for (const rr of r.ronde) {
  console.log(`ronde ${String(rr.ronde).padStart(3)} · lulus ${String(rr.lulus).padStart(3)}/100 · gagal ${String(rr.gagal).padStart(3)} · pelajaran baru ${rr.pelajaranBaru} · net kum ${rr.netKumulatif}%`);
}
console.log(`STATUS: ${r.status} · gagal ${r.gagal} · pelajaran total ${r.pelajaranJumlah} · durasi ${durasi}s`);
if (r.status === 'LULUS_SEMPURNA') console.log('SEMUA BENAR — TERARAH — TERcapai — TERUJI: nol kesalahan dalam ujian.');
else console.log('MASIH ADA KESALAHAN — pelajaran ditempa, jalankan ulang skrip ini.');
