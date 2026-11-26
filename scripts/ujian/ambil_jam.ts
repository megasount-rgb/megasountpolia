// ============================================================
// UJIAN ELSA · ambil riwayat candle 1 jam penuh ELSAUSDT (spot
// Bybit) sejak listing — bahan VERIFIKASI-HASIL ujian: bila TP &
// SL tersentuh di candle harian yang sama, urutan kena diadili
// dari candle 1 jam nyata, bukan diasumsikan konservatif buta.
// Jalankan: bun scripts/ujian/ambil_jam.ts
// ============================================================
import fs from 'fs';

const OUT = '/home/z/my-project/db/elsa/riwayat_jam.json';
const SYM = 'ELSAUSDT';

type Candle = { t: number; o: number; h: number; l: number; c: number; v: number };

async function ambilJendela(end: number): Promise<Candle[]> {
  const url = `https://api.bybit.com/v5/market/kline?category=spot&symbol=${SYM}&interval=60&end=${end}&limit=1000`;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((s) => setTimeout(s, 1500 * (i + 1))); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      if (j.retCode !== 0) throw new Error(`retCode ${j.retCode} ${j.retMsg}`);
      const list: string[][] = j.result?.list ?? [];
      return list.map((x) => ({ t: Number(x[0]), o: Number(x[1]), h: Number(x[2]), l: Number(x[3]), c: Number(x[4]), v: Number(x[5]) }))
        .sort((a, b) => a.t - b.t);
    } catch (e) {
      if (i === 2) return []; // jendela ini gagal — lanjut, jangan menggantung
      await new Promise((s) => setTimeout(s, 1000 * (i + 1)));
    }
  }
  return [];
}

async function main() {
  const harian = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/riwayat_harian.json', 'utf8')) as { data: Candle[] };
  const awal = harian.data[0].t; // sejak listing
  const semua: Candle[] = [];
  let endKursor = Date.now();
  let halaman = 0;
  let kosong = 0;
  while (endKursor > awal && halaman < 40 && kosong < 3) {
    const cs = await ambilJendela(endKursor); // ≤1000 candle terbaru sebelum endKursor
    halaman++;
    if (!cs.length || cs[0].t >= endKursor) { kosong++; continue; }
    kosong = 0;
    semua.push(...cs);
    const tertua = cs[0].t;
    console.log(`halaman ${halaman}: ${cs.length} candle · ${new Date(cs[0].t).toISOString().slice(0, 16)} s/d ${new Date(cs[cs.length - 1].t).toISOString().slice(0, 16)}`);
    if (tertua <= awal) break; // sudah mencapai listing
    endKursor = tertua - 1; // maju mundur 1 ms sebelum candle terlama
    await new Promise((s) => setTimeout(s, 250));
  }
  // buang duplikat & urutkan
  const unik = new Map<number, Candle>();
  for (const c of semua) unik.set(c.t, c);
  const data = [...unik.values()].sort((a, b) => a.t - b.t);
  fs.mkdirSync('/home/z/my-project/db/elsa', { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), simbol: SYM, interval: '60', jumlah: data.length, awal: new Date(data[0].t).toISOString(), akhir: new Date(data[data.length - 1].t).toISOString(), data }));
  const hari = (t: number) => new Date(t).toISOString().slice(0, 10);
  const hariUnik = new Set(data.map((c) => hari(c.t)));
  console.log(`riwayat 1j tersimpan: ${data.length} candle · ${hariUnik.size} hari · ${new Date(data[0].t).toISOString()} s/d ${new Date(data[data.length - 1].t).toISOString()}`);
}

await main();
