// ============================================================
// UJIAN ELSA · ambil riwayat PENUH ELSAUSDT dari kemunculan
// (listing Bybit spot) + BTC konteks. Dipaginasi mentah langsung
// ke /v5/market/kline (bukan getCandles 200-limit) supaya soal
// ujian mencakup SELURUH masa hidup koin.
// Jalankan: bun scripts/ujian/ambil_riwayat.ts
// ============================================================
import fs from 'fs';

type Candle = { t: number; o: number; h: number; l: number; c: number; v: number; qv: number };

async function klinePenuh(symbol: string, interval = 'D'): Promise<Candle[]> {
  const semua: Candle[] = [];
  let end = Date.now();
  for (let halaman = 0; halaman < 40; halaman++) {
    const url = `https://api.bybit.com/v5/market/kline?category=spot&symbol=${symbol}&interval=${interval}&limit=1000&end=${end}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`bybit ${res.status} ${symbol}`);
    const j = (await res.json()) as { retCode: number; retMsg: string; result?: { list?: string[][] } };
    if (j.retCode !== 0) throw new Error(`bybit retCode ${j.retCode}: ${j.retMsg}`);
    const list = j.result?.list ?? [];
    if (!list.length) break;
    for (const r of list) {
      semua.push({ t: Number(r[0]), o: Number(r[1]), h: Number(r[2]), l: Number(r[3]), c: Number(r[4]), v: Number(r[5]), qv: Number(r[6] ?? 0) });
    }
    const tertua = Math.min(...list.map((r) => Number(r[0])));
    if (list.length < 1000) break; // sudah sampai candle pertama
    end = tertua - 1;
  }
  semua.sort((a, b) => a.t - b.t);
  // buang duplikat
  const unik: Candle[] = [];
  for (const c of semua) {
    if (!unik.length || unik[unik.length - 1].t !== c.t) unik.push(c);
  }
  return unik;
}

const elsa = await klinePenuh('ELSAUSDT');
const btc = await klinePenuh('BTCUSDT');

fs.mkdirSync('/home/z/my-project/db/elsa', { recursive: true });
fs.writeFileSync('/home/z/my-project/db/elsa/riwayat_harian.json', JSON.stringify({
  simbol: 'ELSAUSDT', interval: 'D', n: elsa.length,
  awal: new Date(elsa[0].t).toISOString(), akhir: new Date(elsa[elsa.length - 1].t).toISOString(),
  data: elsa,
}));
fs.writeFileSync('/home/z/my-project/db/elsa/riwayat_btc.json', JSON.stringify({
  simbol: 'BTCUSDT', interval: 'D', n: btc.length,
  awal: new Date(btc[0].t).toISOString(), akhir: new Date(btc[btc.length - 1].t).toISOString(),
  data: btc,
}));
console.log(`ELSA: ${elsa.length} candle harian (${new Date(elsa[0].t).toISOString().slice(0, 10)} → ${new Date(elsa[elsa.length - 1].t).toISOString().slice(0, 10)})`);
console.log(`BTC : ${btc.length} candle harian (${new Date(btc[0].t).toISOString().slice(0, 10)} → ${new Date(btc[btc.length - 1].t).toISOString().slice(0, 10)})`);
