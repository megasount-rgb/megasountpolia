// ============================================================
// UJIAN · pengambil korpus historis derivatif — Gate.io v4.
// 4 koin kasus: ELSA_USDT (koin tempur), EVAA_USDT, PIEVERSE_USDT,
// AGT_USDT (koin pelajaran). Jendela: 180 hari terakhir (batas
// keras API). Output: db/aliran/{COIN}_stats.json & _candles.json
// Jalankan: bun scripts/ujian/ambil.ts
// ============================================================
const GATE = 'https://api.gateio.ws/api/v4/futures/usdt';
const OUT = '/home/z/my-project/db/aliran';
const KOIN = ['ELSA_USDT', 'EVAA_USDT', 'PIEVERSE_USDT', 'AGT_USDT'] as const;
const JENDELA_180D = 180 * 86400;

type Stat = Record<string, number | string>;
type Candle = { t: number; o: number; c: number; h: number; l: number; v: number };

async function getJson(url: string, tries = 4): Promise<unknown> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((s) => setTimeout(s, 2000 * (i + 1))); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((s) => setTimeout(s, 1200 * (i + 1)));
    }
  }
  throw new Error('unreachable');
}

async function ambilStats(kontrak: string, dari: number, sampai: number): Promise<Stat[]> {
  const out: Stat[] = [];
  let from = dari;
  while (from < sampai) {
    const url = `${GATE}/contract_stats?contract=${kontrak}&interval=1h&from=${from}&limit=1000`;
    const chunk = (await getJson(url)) as Stat[];
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    out.push(...chunk);
    const tTerakhir = Number(chunk[chunk.length - 1].time);
    const tAwal = Number(chunk[0].time);
    if (chunk.length < 1000) break;
    from = tTerakhir + 3600;
    if (tTerakhir <= tAwal) break; // anti-macet
    await new Promise((s) => setTimeout(s, 350));
  }
  return out;
}

async function ambilCandles(kontrak: string, dari: number, sampai: number): Promise<Candle[]> {
  const out: Candle[] = [];
  let from = dari;
  while (from < sampai) {
    const url = `${GATE}/candlesticks?contract=${kontrak}&interval=1h&from=${from}&limit=2000`;
    const chunk = (await getJson(url)) as Record<string, string>[];
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    for (const r of chunk) {
      out.push({ t: Number(r.t), o: Number(r.o), c: Number(r.c), h: Number(r.h), l: Number(r.l), v: Number(r.v) });
    }
    const tTerakhir = Number(chunk[chunk.length - 1].t);
    if (chunk.length < 2000) break;
    from = tTerakhir + 3600;
    await new Promise((s) => setTimeout(s, 350));
  }
  return out;
}

async function utama() {
  const now = Math.floor(Date.now() / 1000);
  const dari = now - JENDELA_180D;
  for (const kontrak of KOIN) {
    const tag = kontrak.replace('_USDT', '');
    process.stdout.write(`[${tag}] ambil stats… `);
    const stats = await ambilStats(kontrak, dari, now);
    process.stdout.write(`${stats.length} bar · candles… `);
    const candles = await ambilCandles(kontrak, dari, now);
    process.stdout.write(`${candles.length} bar\n`);
    const fs = await import('fs');
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(`${OUT}/${tag}_stats.json`, JSON.stringify(stats));
    fs.writeFileSync(`${OUT}/${tag}_candles.json`, JSON.stringify(candles));
    if (stats.length) {
      console.log(`  stats ${new Date(Number(stats[0].time) * 1000).toISOString()} -> ${new Date(Number(stats[stats.length - 1].time) * 1000).toISOString()}`);
    }
  }
  console.log('SELESAI');
}
utama().catch((e) => { console.error('GAGAL:', e); process.exit(1); });
