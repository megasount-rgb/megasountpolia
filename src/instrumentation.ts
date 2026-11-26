// ============================================================
// JANTUNG MICAPROFITA — register() jalan sekali per proses server.
// Begitu otak hidup (next dev / next start), jantung ujian mandiri
// langsung berdenyut: menyelidik pasar tiap 60 detik, berlaga penuh
// saat candle baru tutup atau jadwal 30 menit tiba — tanpa menunggu
// ada yang membuka panel. (keluhan pemilik: "ujian mandiri harusnya
// senantiasa aktif setiap saat… sistem ini makhluk yang hidup")
// V2 — MATRIKS SUMBER IKUT BERDENYUT: tiap 5 menit semua sumber
// (Bybit, CoinGecko, CMC, DEXScreener, GeckoTerminal) diperiksa
// hidup/mati, suaranya direkam, kesaksiannya disiapkan — jadi
// sumber bukan pajangan mati, tapi organ yang terus bekerja.
// V3 — JIWA RADAR PAUS IKUT BERDENYUT (keluhan pemilik: "radar paus
// masih mayat, tak ada ruh dan tak ada neuron"): tiap 3 menit radar
// paus membaca tape nyata dan berdenyut penuh — neuron siluet diakui,
// keyakinan dihitung, duel paus-vs-paus dijawab candle nyata,
// kalibrasi diperbarui. Radar paus kini organ yang terus bekerja,
// bukan mayat yang hanya tampil saat panel dibuka.
// V4 — JANTUNG DOMPET IKUT BERDENYUT (keluhan pemilik 2026-11-26: "tab modal
// 1000$ seakan terhenti tak melakukan aktivitas… kalau modal didiamkan kita
// tak akan pernah tau dimana kecacatan kita; banyak wait adalah kanker"):
// tiap 60 detik dompet $1000 berdenyut sendiri — TP/SL diadili langsung dari
// buku pesanan, rencana arena hari ini diadopsi secepat kilat, dan saat tak
// ada rencana aktif jantung mengambil pedang dari keyakinan modal-jiwa
// (hukum dua pedang — dilarang diam tanpa alasan tercatat).
// V5 — RADAR ANTI-KECOLONGAN + OTAK KASUS IKUT BERDENYUT (keluhan pemilik
// 2026-11-26: "kita kejebolan! whale bisa saja masuk tanpa diketahui!!" saat
// ELSA melonjak 0.0835→0.1166 dalam satu jam tanpa satu pun pola menyala):
//   • radar ignisi membaca tape/volume/velocity/OI tiap 60 detik — kaki
//     whale pecah-potongan TAK bisa lolos lagi tanpa lapisan menyala;
//   • otak kasus menyapu ledakan nyata tiap 10 menit: setiap ledakan jadi
//     berkas kasus (fase + sinyal tersedia + keputusan sistem + pelajaran)
//     dan diperdengarkan ke guru + dewan vonis — "ini gambar kasus!!"
// V6 — LIMA JANTUNG BARU (keluhan pemilik 2026-11-26: "pertumbuhan, nadi
//   gudang, briefing guru gak miliki neuron… amigdala mati" + "neuron
//   saling mencerdaskan bukannya saling cuek" + "ruang guru fokus ELSA"):
//   • BUS PERSILANGAN 15 mnt — neuron bertukar kiriman + reaksi wajib
//   • BRIEFING GURU 20 mnt — briefing ELSA hidup dari semua neuron
//   • OTAK PERTUMBUHAN 15 mnt — snapshot/delta/direktif tumbuh
//   • NADI & GUDANG 5 mnt — gali gudang + pantau semua jantung + alarm
//   • GURU LATAR 30 mnt — guru berpikir mandiri walau tak ada pembaca
// ============================================================
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PHASE !== 'phase-production-build') {
    try {
      const { denyutSekarang } = await import('./lib/elsa/denyut');
      denyutSekarang();
    } catch {
      /* jantung gagal menyala saat boot — muat payload pertama akan mencoba lagi */
    }
    try {
      const { getSumberData } = await import('./lib/elsa/sumber');
      const g = globalThis as unknown as { __elsaSumberTimer?: NodeJS.Timeout };
      if (!g.__elsaSumberTimer) {
        void getSumberData().catch(() => null); // denyut pertama saat server hidup
        g.__elsaSumberTimer = setInterval(() => { void getSumberData().catch(() => null); }, 5 * 60 * 1000);
      }
    } catch {
      /* denyut matriks gagal menyala saat boot — muat payload pertama mencoba lagi */
    }
    try {
      const { getPausData } = await import('./lib/elsa/paus');
      const g = globalThis as unknown as { __elsaPausTimer?: NodeJS.Timeout };
      if (!g.__elsaPausTimer) {
        void getPausData().catch(() => null); // denyut jiwa paus pertama saat server hidup
        g.__elsaPausTimer = setInterval(() => { void getPausData().catch(() => null); }, 3 * 60 * 1000);
      }
    } catch {
      /* denyut paus gagal menyala saat boot — muat payload pertama mencoba lagi */
    }
    try {
      const { denyutDompetSekarang } = await import('./lib/elsa/dompet-jantung');
      denyutDompetSekarang(); // jantung dompet menyala + denyut kickstart
    } catch {
      /* jantung dompet gagal menyala saat boot — muat payload pertama mencoba lagi */
    }
    try {
      const { mulaiRadarIgnisi } = await import('./lib/elsa/ignisi');
      mulaiRadarIgnisi(); // radar anti-kecolongan — denyut tiap 60 detik
    } catch {
      /* radar ignisi gagal menyala saat boot — denyut berikutnya mencoba */
    }
    try {
      const { denyutKasus } = await import('./lib/elsa/kasus');
      void denyutKasus().catch(() => null); // sapuan kasus pertama saat boot
      const g = globalThis as unknown as { __elsaKasusTimer?: NodeJS.Timeout };
      if (!g.__elsaKasusTimer) {
        g.__elsaKasusTimer = setInterval(() => { void denyutKasus().catch(() => null); }, 10 * 60 * 1000);
      }
    } catch {
      /* otak kasus gagal menyala saat boot — denyut berikutnya mencoba */
    }
    // V6 — BUS PERSILANGAN (keluhan pemilik 2026-11-26: "neuron saling
    // mencerdaskan bukannya malah saling cuek!"): tiap 15 menit neuron
    // bertukar kiriman bertanda tangan + reaksi wajib penerima.
    try {
      const { mulaiPersilangan } = await import('./lib/elsa/persilangan');
      mulaiPersilangan();
    } catch {
      /* bus persilangan gagal menyala saat boot — denyut berikutnya mencoba */
    }
    // V6 — BRIEFING GURU HIDUP (keluhan: "briefing guru gak miliki neuron"):
    // tiap 20 menit briefing ELSA ditulis dari semua neuron, tanpa halaman dibuka.
    try {
      const { mulaiBriefing } = await import('./lib/elsa/briefing');
      mulaiBriefing();
    } catch {
      /* briefing gagal menyala saat boot — denyut berikutnya mencoba */
    }
    // V6 — OTAK PERTUMBUHAN (keluhan: "pertumbuhan gak miliki neuron"):
    // tiap 15 menit snapshot 6 dimensi + delta jujur + direktif tumbuh.
    try {
      const { mulaiPertumbuhan } = await import('./lib/elsa/pertumbuhan');
      mulaiPertumbuhan();
    } catch {
      /* pertumbuhan gagal menyala saat boot — denyut berikutnya mencoba */
    }
    // V6 — NADI & GUDANG HIDUP (keluhan: "nadi gudang gak miliki neuron…
    // amigdala mereka mati"): tiap 5 menit seluruh gudang digali, semua
    // jantung dipantau, amigdala tidur di-ALARM-kan.
    try {
      const { mulaiNadi } = await import('./lib/elsa/nadi');
      mulaiNadi();
    } catch {
      /* nadi gagal menyala saat boot — denyut berikutnya mencoba */
    }
    // V6 — GURU BERPIKIR MANDIRI DI LATAR (dulu hanya saat halaman dibuka —
    // artinya guru mati ketika tak ada yang membuka panel): tiap 30 menit.
    try {
      const { denyutGuruLatar } = await import('./lib/elsa/guru');
      const g = globalThis as unknown as { __elsaGuruLatarTimer?: NodeJS.Timeout };
      if (!g.__elsaGuruLatarTimer) {
        setTimeout(() => { void denyutGuruLatar(); }, 45_000); // denyut pertama
        g.__elsaGuruLatarTimer = setInterval(() => { void denyutGuruLatar(); }, 30 * 60 * 1000);
      }
    } catch {
      /* guru latar gagal menyala saat boot — denyut berikutnya mencoba */
    }
  }
}
