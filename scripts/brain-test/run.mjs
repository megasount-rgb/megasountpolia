import { getCandles, SIMBOL, BTC } from '../../src/lib/elsa/bybit.ts';
import { klVonis } from '../../src/lib/elsa/kompleks.ts';
import { arahVonis } from '../../src/lib/elsa/arah.ts';
const cs = await getCandles(SIMBOL, 'D', 200);
console.log('candles:', cs.length, 'last:', cs[cs.length-1]);
try {
  const kl = klVonis(cs);
  console.log('kl aksi:', kl.aksi, kl.arah, 'pool:', kl.pool.jenis, kl.pool.side, kl.pool.swept);
} catch (e) { console.error('KL ERR', e); }
try {
  const v = arahVonis(cs);
  console.log('arah vonis:', v.vonis, v.kepastian, v.lapisan);
} catch (e) { console.error('ARAH ERR', e); }
