// ============================================================
// MICAPROFITA-ELSA · OTAK PANTAU — terus-menerus aktif pantau pasar.
// Dua permintaan pemilik (2026-11-24) yang dilahirkan di sini:
//   18) "Namanya sistem cerdas harusnya kalau misal terkena stop loss
//       maka jawaban pastinya ada melajukan perhitungan mandiri lagi."
//       + "label sell tapi entry-nya di atas pasar terkini dan take
//          profit-nya di berapa gak tertera — masa kena stop loss dia
//          gak tau pasar... dia gak tau ke mana arah take profit sell,
//          dan stop loss di mana."
//   19) "kalau target harian salah otomatis harus tunggu berikutnya —
//       inilah dinamakan kebodohan. Harusnya adaptif cerdas: terus
//       menerus aktif pantau pasar. Kena stop loss berarti candle
//       telah berubah, perlu metode lain. Kena TP berarti perhitungan
//       dikoreksi → langsung jadi catatan → lakukan perhitungan lagi
//       ke arah pasti. Bukan fokus satu hari satu entry — kalau bisa
//       ada info harga terus & target terus, gak masalah!"
// HUKUM PANTAU (ditulis terbuka):
//   P-1 HARGA HIDUP DIADILI TIAP SEGARKAN — TP/SL tidak menunggu tutup
//       candle harian. Kena = kejadian NYATA saat itu juga.
//   P-2 KENAPA BERARTI GANTI GERAK — SL kena → candle telah berubah →
//       otak WAJIB menghitung ulang (metode segar: ATR, MC seed zaman,
//       vonis baru) dan mengunci slot baru SEJAM itu juga.
//   P-3 TP KENA JUGA DIKOREKSI — hasil dicatat (catatan), lalu
//       perhitungan diulang ke arah berikutnya dari harga hidup.
//   P-4 BUKAN SATU HARI SATU ENTRY — slot bertumpuk sebagai ZAMAN
//       (zaman 1, 2, 3... hari itu); tiap zaman punya ledger SHA-256
//       sendiri. Batas jujur: 20 zaman/hari (anti-loop melingkar).
//   P-5 URUTAN TP vs SL DIJAWAB CANDLE 1J — keduanya tersentuh →
//       verifikasi-hasil (konservatif: STOP dulu bila tak terbaca).
//   P-6 GARIS VONIS SELALU ADA — apapun vonisnya (BUY/SELL), panel
//       WAJIB menampilkan entry + TP + SL dihitung dari harga hidup
//       SEKARANG; geometri diuji: SELL → SL di ATAS, TP di BAWAH;
//       BUY → TP di ATAS, SL di BAWAH. Label: BUY = LONG, SELL = SHORT.
// ============================================================

export const HUKUM_PANTAU: string[] = [
  'P-1 harga hidup diadili tiap segarkan — TP/SL kena = kejadian NYATA saat itu juga, TIDAK menunggu tutup candle harian',
  'P-2 SL kena → candle telah berubah → perhitungan mandiri diulang dengan metode segar (ATR/vonis/MC seed zaman baru) dan slot baru dikunci sejam itu juga',
  'P-3 TP kena → hasil langsung dicatat di buku, lalu perhitungan diulang ke arah berikutnya dari harga hidup',
  'P-4 bukan satu hari satu entry — tiap slot baru = ZAMAN berikutnya (zaman 1, 2, 3…) dengan ledger SHA-256 sendiri; batas jujur 20 zaman/hari anti-loop',
  'P-5 TP & SL keduanya tersentuh → urutan dijawab candle 1j nyata; tak terbaca → konservatif STOP-dulu (verifikasi-hasil)',
  'P-6 garis vonis selalu ada: apapun arahnya, panel wajib menampilkan TP & SL dihitung dari harga hidup sekarang — SELL → SL di atas, TP di bawah; BUY → TP di atas, SL di bawah',
  'P-7 label arah selalu lengkap: BUY = (LONG), SELL = (SHORT) — dilarang label telanjang yang menyesatkan posisi',
];

export const MAX_SLOT_HARIAN = 20; // P-4 batas anti-loop (jujur diumumkan)

// ---------------- label arah lengkap (P-7) ----------------
export function labelArahOf(arah: 'BUY' | 'SELL'): string {
  return arah === 'BUY' ? 'BUY (LONG)' : 'SELL (SHORT)';
}

// ---------------- keadaan harga vs rencana (murni, mudah diuji) ----------------
export type KeadaanHarga = {
  sentuhTarget: boolean;
  sentuhStop: boolean;
  keduanya: boolean;
  jarakTargetPct: number; // positif = masih jauh menuju target (arah rencana)
  jarakStopPct: number;
};

export function keadaanHarga(
  arah: 'BUY' | 'SELL',
  entry: number,
  target: number,
  stop: number,
  harga: number,
): KeadaanHarga {
  const dirBuy = arah === 'BUY';
  const sentuhTarget = dirBuy ? harga >= target : harga <= target;
  const sentuhStop = dirBuy ? harga <= stop : harga >= stop;
  const jarakTargetPct = dirBuy
    ? ((target - harga) / harga) * 100
    : ((harga - target) / harga) * 100;
  const jarakStopPct = dirBuy
    ? ((harga - stop) / harga) * 100
    : ((stop - harga) / harga) * 100;
  return {
    sentuhTarget,
    sentuhStop,
    keduanya: sentuhTarget && sentuhStop,
    jarakTargetPct: Math.round(jarakTargetPct * 100) / 100,
    jarakStopPct: Math.round(jarakStopPct * 100) / 100,
  };
}

// ---------------- garis vonis (P-6) — selalu dihitung, selalu tampil ----------------
export type GarisVonis = {
  arah: 'BUY' | 'SELL';
  labelArah: string;
  entry: number; // = harga hidup saat garis dihitung
  target: number;
  stop: number;
  targetPct: number;
  stopPct: number;
  sanityOk: boolean;
  posisiTarget: 'ATAS_PASAR' | 'BAWAH_PASAR';
  posisiStop: 'ATAS_PASAR' | 'BAWAH_PASAR';
  ket: string;
  dibuat: string;
};

// Policy jarak sama dengan slot tempur: target ≤ 2.2% ≥ 0.8% (0.45×ATR),
// stop dari vonis eksekusi dibatasi 1.2–2.6% — digambar dari HARGA HIDUP.
export function garisVonisHidup(
  arah: 'BUY' | 'SELL',
  hargaHidup: number,
  atrPct: number,
  stopPctDasar: number,
): GarisVonis {
  const targetPct = Math.min(2.2, Math.max(0.8, atrPct * 0.45));
  const stopPct = Math.max(1.2, Math.min(2.6, stopPctDasar));
  const entry = hargaHidup;
  const dirBuy = arah === 'BUY';
  const target = dirBuy ? entry * (1 + targetPct / 100) : entry * (1 - targetPct / 100);
  const stop = dirBuy ? entry * (1 - stopPct / 100) : entry * (1 + stopPct / 100);
  const sanityOk = dirBuy ? (stop < entry && entry < target) : (target < entry && entry < stop);
  const posisiTarget = dirBuy ? 'ATAS_PASAR' : 'BAWAH_PASAR';
  const posisiStop = dirBuy ? 'BAWAH_PASAR' : 'ATAS_PASAR';
  const ket = dirBuy
    ? `vonis BUY = posisi LONG: sasaran (TP) ${targetPct.toFixed(2)}% DI ATAS harga hidup, pelindung (SL) ${stopPct.toFixed(2)}% DI BAWAH — digambar segar dari harga hidup tiap segarkan, bukan dari angka lama`
    : `vonis SELL = posisi SHORT: sasaran (TP) ${targetPct.toFixed(2)}% DI BAWAH harga hidup (arah sell mengejar turun), pelindung (SL) ${stopPct.toFixed(2)}% DI ATAS — sistem TAHU ke mana TP sell dan di mana SL, dihitung dari harga hidup sekarang`;
  return {
    arah,
    labelArah: labelArahOf(arah),
    entry: Math.round(entry * 1e7) / 1e7,
    target: Math.round(target * 1e7) / 1e7,
    stop: Math.round(stop * 1e7) / 1e7,
    targetPct: Math.round(targetPct * 100) / 100,
    stopPct: Math.round(stopPct * 100) / 100,
    sanityOk,
    posisiTarget,
    posisiStop,
    ket,
    dibuat: new Date().toISOString(),
  };
}

// ---------------- data pantau untuk panel ----------------
export type PantauData = {
  at: string;
  hukum: string[];
  cekTerakhir: string | null; // audit harga hidup terakhir dijalankan
  slotHariIni: number; // zaman slot terakhir hari ini (0 = belum ada slot hari ini)
  zamanAktif: number | null;
  waktuKunciAktif: string | null;
  nRekalkHariIni: number;
  sejarah: { at: string; text: string }[]; // trail catatan rekalkulasi mandiri
  status: string;
};
