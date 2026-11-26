// ============================================================
// VERIFIKASI NEURON HIDUP — jalankan 2 sesi ujian berurutan dan
// tunjukkan formula benar-benar berkembang (formulaVersi, sinaps).
// Pemakaian: bun /home/z/my-project/scripts/verifikasi-neuron.ts
// ============================================================
import { jalankanUjian, bacaNeuronUjian } from '../src/lib/elsa/ujian';

const s1 = await jalankanUjian({ maxRonde: 60, pemicu: 'VERIFIKASI-1' });
console.log('SESI 1 :', JSON.stringify(s1));
const n1 = bacaNeuronUjian();
console.log('formulaVersi sesudah sesi 1 :', n1.formulaVersi);
console.log('sinaps sesudah sesi 1       :', JSON.stringify(Object.fromEntries(Object.entries(n1.sinaps).map(([k, v]) => [k, { t: v.nTembak, L: v.nLulus, G: v.nGagal, bobot: v.bobot }])), null, 0));
console.log('evolusi terakhir            :', n1.evolusi[0]?.sebab ?? '—');

const s2 = await jalankanUjian({ maxRonde: 60, pemicu: 'VERIFIKASI-2' });
console.log('SESI 2 :', JSON.stringify(s2));
const n2 = bacaNeuronUjian();
console.log('formulaVersi sesudah sesi 2 :', n2.formulaVersi);
console.log('evolusi terakhir            :', n2.evolusi[0]?.sebab ?? '—');
console.log('TOTAL evolusi tercatat      :', n2.evolusi.length);
