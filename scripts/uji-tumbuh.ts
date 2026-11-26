// ============================================================
// UJI MESIN TUMBUH — simulasi "candle baru tutup" (hukum pemilik
// 2026-11-25: "setiap harinya juga bertambah karena ini pun sedang
// berlangsung"). CATATAN: skrip ini MENULIS ke db/elsa (candle sintetis
// untuk SATU hari uji) — WAJIB diikuti restore backup (lihat catatan
// di output). Dijalankan: bun scripts/uji-tumbuh.ts
// ============================================================
import fs from 'fs';

const DIR = '/home/z/my-project/db/elsa';
type Cand = { t: number; o: number; h: number; l: number; c: number; v: number; qv: number };

function baca(file: string): { data: Cand[] } {
  return JSON.parse(fs.readFileSync(`${DIR}/${file}`, 'utf8'));
}

async function utama() {
  const rh = baca('riwayat_harian.json');
  const rb = baca('riwayat_btc.json');
  const esla = rh.data[rh.data.length - 1];
  const btc = rb.data[rb.data.length - 1];
  console.log('memori sebelum: ELSA', rh.data.length, '| BTC terakhir', new Date(btc.t).toISOString());

  const hariBaru = new Date(esla.t + 86_400_000).toISOString().slice(0, 10);
  if (hariBaru !== new Date(Date.now()).toISOString().slice(0, 10)) {
    throw new Error(`hari sintetis ${hariBaru} bukan hari ini — simulasi hanya boleh menambah hari yang belum lahir`);
  }
  // candle sintetis: variasi kecil dari candle terakhir (cukup untuk menguji
  // MESIN TUMBUH — bukan untuk kebenaran harga; file direstore setelah uji)
  const eslaBaru: Cand = { t: esla.t + 86_400_000, o: esla.c, h: esla.c * 1.02, l: esla.c * 0.975, c: esla.c * 0.995, v: esla.v, qv: esla.qv };
  const btcBaru: Cand = { t: btc.t + 86_400_000, o: btc.c, h: btc.c * 1.01, l: btc.c * 0.99, c: btc.c * 1.003, v: btc.v, qv: btc.qv };
  fs.writeFileSync(`${DIR}/riwayat_harian.json`, JSON.stringify({ data: [...rh.data, eslaBaru] }));
  fs.writeFileSync(`${DIR}/riwayat_btc.json`, JSON.stringify({ data: [...rb.data, btcBaru] }));
  console.log(`candle sintetis ${hariBaru} ditambahkan (ELSA + BTC) — memori kini 310`);

  const { jalankanUjian } = await import('../src/lib/elsa/ujian');
  const r = await jalankanUjian({ maxRonde: 60, pemicu: 'UJI-TUMBUH' });
  console.log('hasil ujian:', JSON.stringify(r));
  const set = JSON.parse(fs.readFileSync(`${DIR}/ujian/soal_set.json`, 'utf8'));
  const soalTerakhir = set.soal[set.soal.length - 1];
  console.log('soal_set: nSoal', set.nSoal, '| soal terakhir', JSON.stringify(soalTerakhir), '| tumbuhRiwayat', JSON.stringify(set.tumbuhRiwayat));
  const hasil = JSON.parse(fs.readFileSync(`${DIR}/ujian/hasil_terakhir.json`, 'utf8'));
  console.log('hasil_terakhir: status', hasil.status, '| lulus', hasil.metrik.lulus, '/', hasil.metrik.soalJumlah, '| soalBaru', hasil.tumbuh.soalBaru, '| hariBaru', JSON.stringify(hasil.tumbuh.hariBaru));
  const sesi = JSON.parse(fs.readFileSync(`${DIR}/ujian/sesi.json`, 'utf8'));
  console.log('sesi terakhir: soalSebelum', sesi[0].soalSebelum, '→ soalSesudah', sesi[0].soalSesudah, '(+' + sesi[0].soalBaru + ')', '| status', sesi[0].status);

  // ekspektasi: maksIdx soal lama = 305 (11-21); memori 310 → akhirIdx = 308
  // → 3 soal baru (11-22, 11-23, 11-24) → 103 soal total, LULUS_SEMPURNA
  const hariSoalBaru = set.soal.map((s: { hari: string }) => s.hari);
  const ok = set.nSoal === 103 && hasil.status === 'LULUS_SEMPURNA' && hasil.tumbuh.soalBaru === 3
    && hariSoalBaru.includes('2026-11-24') && set.soal[102].idx === 308;
  console.log(ok ? `✅ MESIN TUMBUH LOLOS: 100 → ${set.nSoal} soal, LULUS_SEMPURNA, soal baru = ${hasil.tumbuh.hariBaru.join(', ')}` : '❌ MESIN TUMBUH GAGAL');
  console.log('Sekarang WAJIB restore backup (db/elsa) agar data sintetis tidak tinggal.');
  process.exit(ok ? 0 : 1);
}

utama().catch((e) => { console.error('UJI GAGAL:', e); process.exit(1); });
