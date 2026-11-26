# GOLDEN ELSA — OTAK ELSA/USDT

Port MICAPROFITA yang dikhususkan untuk **satu pair saja: ELSA/USDT** — arsitektur kognitif pasar yang hidup: verdict arah, radar paus (whale), stophunt, dompet virtual, ujian mandiri atas seluruh riwayat, Ruang Guru, dan sistem upgrade neuron.

Repositori ini adalah **salinan lengkap satu-satunya sumber kebenaran** proyek: semua kode, semua data riwayat, semua hasil ujian, dan semua pengetahuan yang telah ditempa masuk ke sini. Tidak ada bagian proyek yang disimpan di luar folder ini.

---

## 1. Cara Menjalankan

Prasyarat: Node.js 20+ / Bun, dan package manager (bun atau npm).

```bash
# 1) salin env contoh
cp .env.example .env

# 2) pasang dependensi
bun install        # atau: npm install

# 3) siapkan prisma client
bunx prisma generate

# 4) jalankan mode pengembangan (port 3000)
npm run dev        # buka http://localhost:3000

# produksi (opsional)
npm run build
npm run start
```

Database memakai SQLite lokal (`db/custom.db`) — tidak butuh server database eksternal.

## 2. Peta Arsitektur Otak (`src/lib/elsa/`)

| Modul | Peran |
| --- | --- |
| `arah.ts` | Arah-brain: engine verdict utama (TOLAK/BUY/SELL) berbasis kepastian arah |
| `kompleks.ts` | Kompleks-brain: vonis struktur pasar kompleks (klVonis) |
| `paus.ts` | Radar paus: forensik cetakan whale nyata (SPOT/FUTURES × LONG/SHORT) + audit dana gila-gilaan + level orderbook mentah 3 venue (bahan dinding) + kerumunan (account-ratio Bybit) + meter kualitas sinyal |
| `paus-jiwa.ts` | **Jiwa radar paus v2** — kualitas ditingkatkan: identitas **PAUS-ASLI** (hanya cetakan kelas paus ≥ 15× median, dicocokkan antar denyut lewat sidik ukuran — kerumunan kecil tak lagi menyamar jadi paus), **rekam jejak W/L per paus** masuk formula keyakinan (paus sering salah didemot), **DINDING orderbook 3 venue** dilacak lintas denyut (lahir → digigit → PATAH DIMAKAN / MUNDUR-bait — bukti medan nyata), **kepahaman tertambang** (rapor n/benar/akurasi per aturan: tenaga/funding/OI/dinding/kerumunan), **kerumunan vs paus** (bahan bakar likuidasi + paus lawan arus), duel paus-vs-paus dijawab candle 1j nyata dengan bukti medan, kesaksian NET/POLA/DUEL/KERUMUNAN/DINDING → dewan **AR-E10** (bobot 0,10) |
| `aliran.ts` | Aliran-brain: model aliran dana & kandidat (ELSA/EVAA/PIEVERSE/AGT) |
| `prareg.ts` | Prareg: ledger keputusan dengan hash SHA-256 (jejak anti-revisi) |
| `indicators.ts` | Indikator teknikal (EMA, RSI, MACD, dsb.) |
| `sakti-candle` / `vision.ts` | Visi candle: pembacaan bentuk & karakter candle |
| `peta-waktu.ts` | Peta waktu: trajektori prediksi lintas tanggal (arah + tanggal) |
| `dompet.ts` | Dompet virtual $1.000: eksekusi orderbook (slippage per tingkat), ledger akuntansi |
| `pantau.ts` | Pemantauan berkelanjutan: bukan hitungan hari, tapi pantau langsung terus-menerus |
| `denyut.ts` | Denyut: denyut jantung sistem (ujian mandiri yang terus aktif) |
| `ujian.ts` | Mesin ujian ELSA: soal dari candle riwayat nyata + peledakan pelajaran dua-tier |
| `arena.ts` | Arena: identitas versi otak + kompetisi antarversi |
| `guru.ts` | Ruang Guru: pemahaman pasar ELSA + penyerapan berita panas |
| `sinaps.ts` | Sinaps: penghubung antarmodul (jalur penalaran lintas-otak) |
| `upgrade.ts` | Upgrade neuron: pengetahuan baru ditempa jadi neuron yang dipakai |
| `warisan.ts` | Warisan: pengetahuan lintas generasi otak |
| `selarasa.ts` | Selarasa: konsistensi verdict vs seluruh field (anti-verdict-kosong) |
| `sumber.ts` | Matriks sumber HIDUP: denyut per sumber (probe mandiri), suara, kesaksian → dewan verdict (AR-E9), bentrokan validasi silang |
| `bybit.ts` | Klien data pasar (Bybit: kline, orderbook, dsb.) |
| `modal.ts` | Manajemen modal pengguna (dompet tiap user) |
| `doctrine-data.ts` | Doktrin: kumpulan hukum pengambilan keputusan |

## 3. API Utama

| Rute | Fungsi |
| --- | --- |
| `GET/POST /api/elsa` | Otak utama: verdict live + seluruh panel |
| `/api/elsa/ujian-mandiri` | Ujian mandiri: daftar soal lengkap + denyut |
| `/api/elsa/guru` | Ruang Guru: pemahaman & berita |
| `/api/elsa/sinaps` | Penalaran lintas modul |
| `/api/elsa/modal` | Dompet/modal pengguna |
| `GET /api` | Cek denyut server |

## 4. Data (`db/`)

| File | Isi |
| --- | --- |
| `db/elsa/riwayat_harian.json` | 309 candle harian ELSA/USDT (20 Jan – 24 Nov 2026, terus bertambah) |
| `db/elsa/riwayat_jam.json` | Riwayat per jam |
| `db/elsa/riwayat_btc.json` | Candle BTC (iklim pasar global) |
| `db/elsa/ujian/` | `soal_set.json`, `sesi.json`, `riwayat_ronde.json`, `hasil_terakhir.json`, `pelajaran.json` (pengetahuan dua-tier) |
| `db/elsa/ujian-mandiri/` | `daftar.json` (daftar soal lengkap), `denyut.json`, `riwayat.json` |
| `db/elsa/guru/` | `pemahaman.json`, `berita.json` |
| `db/elsa/sumber_denyut.json` | Ingatan denyut matriks sumber (riwayat hidup/mati tiap sumber, tahan restart) |
| `db/elsa/upgrade/` | `neuron.json` (hasil penempaan) |
| `db/elsa/dompet.json`, `toko.json` | Dompet virtual & toko |
| `db/aliran/` | Model & statistik EVAA / PIEVERSE / AGT / ELSA |
| `db/custom.db` | SQLite Prisma |

## 5. Hukum Dua Tier Ujian

1. **TIER KASUS** (`fpVersi=4`, penanda `KASUS|<hari>`): buku kasus riwayat — soal hari lampau boleh dijawab memakai catatan hari itu (latihan perbendaharaan). **Tidak pernah masuk keputusan live.**
2. **TIER KONTEKS** (`v0` iklim → `v3` halus): kecerdasan lintas-hari — dipakai untuk hari yang belum pernah dilihat. Inilah yang melayani verdict live.

Ujian tidak pernah dinyatakan "selesai": begitu candle baru lahir, soal baru lahir — jumlah soal bertambah setiap hari bersama riwayat.

## 6. Dompet Virtual & Sirkuit Mandiri

- Modal awal **$1.000**, eksekusi simulasi **melalui orderbook nyata** (slippage dihitung per tingkat buku), fee 0,4%.
- Setiap SL kena → sistem **menghitung ulang secara mandiri** dengan metode lain, mencatat di ledger, lalu langsung mencari peluang berikutnya (bisa lebih dari satu entry per hari).
- TP/SL selalu memakai harga candle nyata sebagai hakim.

## 7. Cara Memperbarui (alur wajib tiap perkembangan)

```bash
bash scripts/github-update.sh "pesan perkembangan: jelaskan apa yang berubah"
```

Skrip ini otomatis: add semua perubahan → commit dengan pesan → push ke GitHub.
Disiplin proyek: **setiap perkembangan = 1 commit + 1 baris baru di `docs/RIWAYAT-PERKEMBANGAN.md`** agar ada bukti nyata yang terekam jelas.

## 8. Keamanan

- `.env` **tidak pernah** ikut ke repo (sudah di-ignore); contoh tersedia di `.env.example`.
- Token GitHub/akses apa pun **tidak pernah** ditulis di dalam file proyek.
- `tool-results/` dan `upload/` adalah artefak internal sementara — tidak ikut ke repo.

## 9. Struktur Singkat

```
├── src/app/            # UI (tab-tab panel ELSA) + API routes
├── src/lib/elsa/       # seluruh modul otak (lihat peta di atas)
├── src/components/     # komponen UI (shadcn/ui)
├── db/                 # data riwayat, hasil ujian, pengetahuan, dompet
├── scripts/            # CLI: ujian tuntas, penempaan, sinkronisasi GitHub
├── docs/               # riwayat perkembangan (bukti nyata)
├── scrape/             # materi asli hasil porting MICAPROFITA
└── prisma/             # skema database
```
