// ============================================================
// PENGIKAT UJIAN ELSA 100 — jalankan drill penguasaan riwayat
// sampai TUNTAS (nol kesalahan) dalam satu tarikan napas.
// Pemakaian: bun /home/z/my-project/scripts/ujian-elsa-tuntas.ts
// ============================================================
import { jalankanUjian } from '../src/lib/elsa/ujian';

const hasil = await jalankanUjian({ maxRonde: 30 });
console.log(JSON.stringify(hasil, null, 2));
if (hasil.status !== 'LULUS_SEMPURNA') {
  console.error('UJIAN BELUM TUNTAS — gagal tersisa:', hasil.gagal);
  process.exit(1);
}
console.log('UJIAN TUNTAS: nol kesalahan.');
