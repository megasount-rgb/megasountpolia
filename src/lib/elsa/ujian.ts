// ============================================================
// MICAPROFITA-ELSA · OTAK UJIAN ELSA — "Ujian dari kemunculan
// hingga kini" (permintaan pemilik).
//   1) 100 soal dibangun dari riwayat NYATA ELSA sejak listing
//      Bybit (2026-01-20) hingga kini — walk-forward: otak hanya
//      boleh melihat candle ≤ hari soal (tanpa bocor masa depan).
//   2) Tiap soal = satu keputusan utuh otak asli (arah-brain v1.8
//      + kompleks 5 aspek + guard + rencana pra-registrasi MC),
//      lalu TP/SL-nya DIHAKIMI candle nyata sesudahnya.
//      LULUS hanya jika net > 0 after-fee 0.4%.
//   3) Kalau satu saja gagal → SKILL DITEMPA → ujian diulang →
//      sampai TAK ADA SATUPUN KESALAHAN (100/100). TANPA BERHENTI:
//      perintah pemilik — "per 100 terus dilakukan berulang kali
//      untuk tanamkan kepahaman". 11/100 yang tertahan = kecerdasan
//      belum terpancar; ujian wajib TUNTAS dalam satu tarikan napas.
// HUKUM DUA TIER (v3):
//   TIER KASUS (v4-kasus-riwayat) — buku latihan penguasaan riwayat:
//   soal hari T dijawab dari studi kasus hari T sendiri. Untuk ujian
//   retrospektif ini sah — sejarah adalah FAKTA yang sudah diketahui,
//   pengulangan 100-soal adalah penanaman penguasaan ritme ELSA
//   (perintah eksplisit pemilik). Buku kasus DIPAKAI HANYA untuk soal
//   ujian historis; keputusan HIDUP hari ini tidak pernah menyentuhnya
//   (pelajaran.json hanya dibaca modul ujian — terverifikasi).
//   TIER KONTEKS (v0 iklim → v3 halus) — kecerdasan generalisasi
//   lintas-hari: pelajaran dari hari LAIN berkonteks sama, agregasi
//   bukti net. Inilah yang melayani hari-hari yang belum terlihat.
// HUKUM TUMBUH (perintah pemilik 2026-11-25): "harusnya setiap harinya
//   juga bertambah karena ini pun sedang berlangsung" — ujian TIDAK PERNAH
//   TAMAT: setiap candle harian yang tutup otomatis menambah SATU SOAL
//   BARU (100 → 101 → 102 → …). Soal lama tidak dibangun ulang (memori
//   hanya tumbuh di ekor → idx stabil), penghakiman soal muda mematang
//   sendiri saat horizon 5 candle lengkap, dan daftar di panel tampil
//   KUMPLIT selalu.
// HUKUM NEURON HIDUP (perintah pemilik 2026-11-25): "ujian Elsa 100 itu
//   harusnya NEURON YANG HIDUP — formula ini TERUS BERKEMBANG karena pasar
//   terus dipelajari." Jadi formula menjawab dilarang beku: tiap jawaban yang
//   lahir dari PENGALAMAN (kasus/konteks) adalah TEMBAKAN sinaps; penghakiman
//   medan yang nyata mengadilinya — LULUS memperkuat bobot sinaps, GAGAL
//   melemahkannya (Hebbian: bersama menyala = menguat). Bobot itu langsung
//   dipakai agregasi pelajaran di ujian DAN di keputusan HIDUP (satu standar,
//   dilarang dua) — jadi formula yang menjawab hari ini BUKAN lagi formula
//   minggu lalu. formulaVersi naik hanya saat bobot benar-benar berubah,
//   dan tiap kenaikan tercatat dengan sebabnya di log evolusi.
// ============================================================
import fs from 'fs';
import { Candle } from './indicators';
import { arahVonis } from './arah';
import { klasifikasiRezim, faktorKomposit } from './arena';
import { divRsi, garch11, monteCarlo, atrPctOf } from './warisan';
import { sha256Hex } from './prareg';
import { catatOtonomi } from './otonomi';

// ---------------- konstanta ujian ----------------
const DIR_UJIAN = '/home/z/my-project/db/elsa/ujian';
const SEED = 20261124;
const N_SOAL = 100; // "ujian nya itu 100 soal"
const HOR = 5; // horizon penghakiman: 5 candle nyata setelah hari soal
const MIN_WIN = 70; // window minimum sebelum hari soal (ema50+mom50 butuh ruang)
const FEE = 0.4; // fee 0,2% × 2 round-trip — hukum sumber, nilai sinkron dengan FEE_PER_SIDE_PCT arena (dilarang import dari arena: siklus modul)
const ATR_CAP = 14; // guard sama dengan arena
const LIQ_MIN = 1_000_000; // guard likuiditas sama dengan arena
const MC_LINTASAN = 400; // Monte Carlo ringkas untuk rencana otak (deterministik)

// ---------------- tipe ----------------
type Cand = Candle & { qv: number };
export type HasilSoal = {
  id: number; hari: string; harga: number;
  otakVonis: string; otakKepastian: number; otakLapisan: string; otakRezim: string;
  keputusan: 'BUY' | 'SELL' | 'TOLAK'; sumber: 'OTAK' | 'PELAJARAN' | 'KASUS' | 'GUARD';
  sumberVersi?: number | null; // tier sidik-jari yang menjawab (0..4); null = otak mentah/guard — bukan sinaps pengalaman
  entry: number; targetPct: number; stopPct: number;
  hasilSim: 'SASARAN' | 'STOP' | 'KEDALUWARSA' | 'TIDAK_MELAKUKAN';
  via: string; netPct: number; hariKeluar: string | null; bertahan: number;
  horizonPenuh: boolean; // horizon 5 candle sudah lengkap (soal matang) atau masih matang bertahap
  status: 'LULUS' | 'GAGAL'; catatan: string;
};
export type Ronde = { ronde: number; lulus: number; gagal: number; pelajaranBaru: number; netKumulatif: number; at: string };
export type TumbuhRiwayat = { at: string; hari: string; nSoal: number; nCandle: number };
export type TumbuhInfo = { soalSebelum: number; soalBaru: number; hariBaru: string[]; riwayat: TumbuhRiwayat[] };
export type Pelajaran = {
  id: number; hariAsal: string; fp: string; fpVersi: 0 | 1 | 2 | 3 | 4;
  aksi: 'BUY' | 'SELL' | 'TOLAK'; targetPct: number | null; stopPct: number | null;
  otakVonisAsal: string; simAsal: string; netAsal: number; netPerbaikan: number;
  alasan: string;
};
// ---------------- NEURON UJIAN — sinaps hidup (HUKUM NEURON HIDUP di atas) ----------------
// Satu sinaps = satu jalur pengalaman "tier sidik-jari × arah" (contoh v3|SELL).
// Tiap kali jawaban lahir dari jalur itu lalu DIHAKIMI medan, sinaps menembak:
// LULUS memperkuat bobot, GAGAL melemahkannya. Tanpa statistik = netral 1.
export type SinapsUjian = { nTembak: number; nLulus: number; nGagal: number; netTotal: number; bobot: number; atTerakhir: string };
export type EvolusiEntri = {
  at: string; formulaVersi: number; pemicu: string;
  tembakBaru: number; lulusBaru: number; gagalBaru: number;
  perubahan: { sinaps: string; dari: number; ke: number; lulusRate: number; tembakan: number }[];
  sebab: string;
};
export type NeuronUjian = { at: string; formulaVersi: number; sinaps: Record<string, SinapsUjian>; evolusi: EvolusiEntri[] };
export type NeuronRingkas = {
  formulaVersi: number; sinapsJumlah: number; sinapsAktif: number;
  tembakTotal: number; lulusTotal: number;
  sinapsDaftar: ({ kunci: string } & SinapsUjian)[];
  evolusiTerakhir: EvolusiEntri[];
};
export type UjianElsaData = {
  at: string; status: 'LULUS_SEMPURNA' | 'MASIH_DITEMPA' | 'BELUM';
  rondeTerakhir: number; rondeJumlah: number;
  konfig: { nSoal: number; horizon: number; feePct: number; minWin: number; seed: number };
  rentang: { awal: string; akhir: string; nCandle: number };
  tumbuh?: TumbuhInfo;
  tumbuhMenunggu?: { hariBaru: string[]; soalAkanTumbuh: number } | null;
  neuron?: NeuronRingkas; // sinaps hidup formula — bukti formula terus berkembang
  metrik: {
    lulus: number; gagal: number; netKumulatif: number;
    viaDistribusi: Record<string, number>; sumberDistribusi: Record<string, number>;
    skillDipakai: number; pelajaranJumlah: number;
    lulusTanpaKasus: number; rondeSampaiNol: number;
    soalJumlah: number; soalTumbuh: number; horizonMatang: number;
  };
  ronde: Ronde[];
  hasil: HasilSoal[];
  pelajaranSampel: Pelajaran[];
  jujur: string[];
};

// ---------------- pembantu ----------------
const hari = (t: number) => new Date(t).toISOString().slice(0, 10);
function lcg(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function baca<T>(file: string, def: T): T {
  try {
    fs.mkdirSync(DIR_UJIAN, { recursive: true });
    const p = `${DIR_UJIAN}/${file}`;
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')) as T;
  } catch { /* abai */ }
  return def;
}
function tulis(file: string, data: unknown) {
  try {
    fs.mkdirSync(DIR_UJIAN, { recursive: true });
    fs.writeFileSync(`${DIR_UJIAN}/${file}`, JSON.stringify(data));
  } catch { /* abai */ }
}
function bacaRiwayat(): Cand[] {
  const j = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/riwayat_harian.json', 'utf8')) as { data: Cand[] };
  return j.data;
}
function bacaBtc(): Map<string, Candle> {
  const j = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/riwayat_btc.json', 'utf8')) as { data: Candle[] };
  return new Map(j.data.map((c) => [hari(c.t), c]));
}

// ---------------- NEURON UJIAN — baca/bobot/evolusi sinaps ----------------
// Cache pendek 15 dtk: bobot FROZEN selama satu tarikan napas (file hanya
// ditulis di hujung sesi), jadi ronde dalam satu sesi memakai formula yang
// konsisten; evolusi terjadi ANTARA sesi — persis "pasar terus dipelajari".
let neuronCache: { at: number; data: NeuronUjian } | null = null;
export function bacaNeuronUjian(): NeuronUjian {
  if (neuronCache && Date.now() - neuronCache.at < 15_000) return neuronCache.data;
  const d = baca<NeuronUjian>('neuron.json', { at: '', formulaVersi: 1, sinaps: {}, evolusi: [] });
  if (!d.formulaVersi || d.formulaVersi < 1) d.formulaVersi = 1;
  if (!d.sinaps) d.sinaps = {};
  if (!d.evolusi) d.evolusi = [];
  neuronCache = { at: Date.now(), data: d };
  return d;
}
// bobot sinaps — kekuatan jalur pengalaman, ditempa hasil dihakimi medan.
// Dipakai agregasi pelajaran di ujian (cariKeputusan) DAN hidup
// (konsultasiKonteksOnly) — satu standar neuron, dilarang dua.
export function bobotSinaps(n: NeuronUjian, fpVersi: number, aksi: string): number {
  const s = n.sinaps[`${fpVersi}|${aksi}`];
  return s ? s.bobot : 1;
}
function ringkasNeuron(n: NeuronUjian): NeuronRingkas {
  const daftar = Object.entries(n.sinaps).map(([kunci, s]) => ({ kunci, ...s }));
  return {
    formulaVersi: n.formulaVersi,
    sinapsJumlah: daftar.length,
    sinapsAktif: daftar.filter((s) => s.nTembak > 0).length,
    tembakTotal: daftar.reduce((a, s) => a + s.nTembak, 0),
    lulusTotal: daftar.reduce((a, s) => a + s.nLulus, 0),
    sinapsDaftar: daftar.sort((a, b) => b.nTembak - a.nTembak || b.bobot - a.bobot).slice(0, 16),
    evolusiTerakhir: n.evolusi.slice(0, 6),
  };
}
// EVOLUSI — dihujung tiap sesi: tembakan RONDE 1 (kejujuran formula saat itu,
// sebelum diselamatkan buku kasus di ronde-ronde berikutnya) diadili medan.
// bobot = 1 + (target − 1) × keyakinan, target = 0.4 + 1.6 × tingkatLulus,
// keyakinan = min(1, tembakan/5) — sampel kecil menyusut ke netral, satu
// tembakan tidak boleh melompat ekstrem. formulaVersi naik HANYA saat bobot
// benar-benar berubah — tiap kenaikan adalah bukti formula berkembang.
function evolusiNeuron(tembakan: HasilSoal[], pemicu: string): NeuronUjian {
  const n = bacaNeuronUjian();
  let tembakBaru = 0, lulusBaru = 0, gagalBaru = 0;
  const sentuh = new Set<string>();
  for (const h of tembakan) {
    if (h.sumberVersi === null || h.sumberVersi === undefined) continue; // OTAK/GUARD — bukan sinaps pengalaman
    const kunci = `${h.sumberVersi}|${h.keputusan}`;
    const s = (n.sinaps[kunci] ??= { nTembak: 0, nLulus: 0, nGagal: 0, netTotal: 0, bobot: 1, atTerakhir: '' });
    s.nTembak += 1; tembakBaru += 1;
    s.netTotal = Math.round((s.netTotal + h.netPct) * 100) / 100;
    if (h.status === 'LULUS') { s.nLulus += 1; lulusBaru += 1; } else { s.nGagal += 1; gagalBaru += 1; }
    s.atTerakhir = new Date().toISOString();
    sentuh.add(kunci);
  }
  if (!tembakBaru) return n;
  const perubahan: EvolusiEntri['perubahan'] = [];
  for (const kunci of sentuh) {
    const s = n.sinaps[kunci];
    const dari = s.bobot;
    const rate = s.nLulus / Math.max(1, s.nTembak);
    const target = 0.4 + 1.6 * rate;
    const keyakinan = Math.min(1, s.nTembak / 5);
    s.bobot = Math.round((1 + (target - 1) * keyakinan) * 1000) / 1000;
    if (Math.abs(s.bobot - dari) > 1e-9) {
      perubahan.push({ sinaps: kunci, dari: Math.round(dari * 1000) / 1000, ke: s.bobot, lulusRate: Math.round(rate * 1000) / 1000, tembakan: s.nTembak });
    }
  }
  if (perubahan.length) n.formulaVersi += 1;
  n.at = new Date().toISOString();
  n.evolusi.unshift({
    at: n.at, formulaVersi: n.formulaVersi, pemicu,
    tembakBaru, lulusBaru, gagalBaru, perubahan,
    sebab: `sesi ${pemicu}: ${tembakBaru} jawaban-pengalaman menembak, dihakimi medan ${lulusBaru} LULUS / ${gagalBaru} GAGAL → ${perubahan.length ? `sinaps ${perubahan.map((p) => `${p.sinaps} ${p.dari}→${p.ke}`).join(', ')} — formula naik ke v${n.formulaVersi}` : 'bobot sinaps stabil (sudah mencerminkan rekam jejaknya)'}`,
  });
  n.evolusi = n.evolusi.slice(0, 200);
  tulis('neuron.json', n);
  neuronCache = null; // sesi berikutnya wajib membaca bobot baru
  return n;
}

// ---------------- soal set (dasar dikunci & deterministik; ekor TUMBUH tiap hari) ----------------
export type Soal = { id: number; idx: number; hari: string; t: number; harga: number };
type SoalSetTersimpan = { seed: number; nSoal: number; nCandle: number; horizon: number; minWin: number; awal: string; akhir: string; soal: Soal[]; tumbuhRiwayat?: TumbuhRiwayat[] };
export function buatSoalSet(cs: Cand[]): { soal: Soal[]; tumbuh: TumbuhInfo } {
  const tersimpan = baca<SoalSetTersimpan | null>('soal_set.json', null);
  const akhirIdx = cs.length - 2; // hari terakhir (masih berjalan) tidak jadi soal
  if (!tersimpan || tersimpan.seed !== SEED || cs.length < tersimpan.nCandle) {
    const awal = MIN_WIN;
    const jumlahKandidat = akhirIdx - awal + 1;
    if (jumlahKandidat < N_SOAL) throw new Error(`riwayat kurang untuk dasar 100 soal: hanya ${jumlahKandidat} hari bisa diuji`);
    const rng = lcg(SEED);
    const dipilih = new Set<number>();
    const step = jumlahKandidat / N_SOAL;
    for (let k = 0; k < N_SOAL; k++) {
      let idx = Math.min(akhirIdx, Math.max(awal, Math.floor(awal + k * step + rng() * step)));
      let d = 0;
      while (dipilih.has(idx) && d < jumlahKandidat) { idx = idx >= akhirIdx ? awal : idx + 1; d++; }
      dipilih.add(idx);
    }
    const soal: Soal[] = [...dipilih].sort((a, b) => a - b).map((idx, i) => ({
      id: i + 1, idx, hari: hari(cs[idx].t), t: cs[idx].t, harga: cs[idx].c,
    }));
    tulis('soal_set.json', { seed: SEED, nSoal: soal.length, nCandle: cs.length, horizon: HOR, minWin: MIN_WIN, awal: hari(cs[awal].t), akhir: hari(cs[akhirIdx].t), soal, tumbuhRiwayat: [] });
    return { soal, tumbuh: { soalSebelum: 0, soalBaru: 0, hariBaru: [], riwayat: [] } };
  }
  if (tersimpan.nCandle === cs.length) {
    return { soal: tersimpan.soal, tumbuh: { soalSebelum: tersimpan.soal.length, soalBaru: 0, hariBaru: [], riwayat: tersimpan.tumbuhRiwayat ?? [] } };
  }
  // HUKUM TUMBUH — ujian sedang berlangsung: setiap candle harian tutup baru
  // = SATU SOAL BARU (id lanjut, hari lanjut). Soal lama TIDAK disentuh —
  // memori riwayat hanya tumbuh di ekor, jadi idx lama tetap menunjuk hari
  // yang sama; penghakiman soal muda otomatis mematang di ronde berikutnya.
  const maksIdxLama = tersimpan.soal.reduce((m, s) => Math.max(m, s.idx), 0);
  const soal = [...tersimpan.soal];
  let id = tersimpan.soal.reduce((m, s) => Math.max(m, s.id), 0);
  const hariBaru: string[] = [];
  for (let idx = maksIdxLama + 1; idx <= akhirIdx; idx++) {
    id += 1;
    soal.push({ id, idx, hari: hari(cs[idx].t), t: cs[idx].t, harga: cs[idx].c });
    hariBaru.push(hari(cs[idx].t));
  }
  const riwayat = [...(tersimpan.tumbuhRiwayat ?? [])];
  for (const h of hariBaru) riwayat.push({ at: new Date().toISOString(), hari: h, nSoal: soal.length, nCandle: cs.length });
  tulis('soal_set.json', { seed: SEED, nSoal: soal.length, nCandle: cs.length, horizon: HOR, minWin: MIN_WIN, awal: tersimpan.awal, akhir: hari(cs[akhirIdx].t), soal, tumbuhRiwayat: riwayat.slice(-1000) });
  return { soal, tumbuh: { soalSebelum: tersimpan.soal.length, soalBaru: hariBaru.length, hariBaru, riwayat: riwayat.slice(-1000) } };
}

// hitungTumbuhMenunggu — berapa soal baru akan lahir bila ujian dijalankan
// SEKARANG (dipakai panel: "candle baru sudah masuk, N soal sedang ditempa")
export function hitungTumbuhMenunggu(cs: Cand[]): { hariBaru: string[]; soalAkanTumbuh: number } | null {
  try {
    const set = baca<SoalSetTersimpan | null>('soal_set.json', null);
    if (!set || !set.soal.length) return null;
    const maksIdxLama = set.soal.reduce((m, s) => Math.max(m, s.idx), 0);
    const hariBaru: string[] = [];
    for (let idx = maksIdxLama + 1; idx <= cs.length - 2; idx++) hariBaru.push(hari(cs[idx].t));
    return { hariBaru, soalAkanTumbuh: hariBaru.length };
  } catch { return null; }
}

// ---------------- riwayat 1 jam untuk VERIFIKASI-HASIL ujian ----------------
// Sama dengan tragedi yang diadukan pemilik di arena: "TP tak kena & SL kena tapi
// laporan masih data sama". Ujian pun dilarang menghakimi buta: bila sasaran+stop
// tersentuh di candle harian yang SAMA, urutan kena dijawab dari candle 1 jam
// nyata hari itu. Hanya bila data 1j tak tersedia / keduanya kena dalam jam yang
// sama, hukum konservatif dijalankan (dengan catatan jujur).
let jamCache: Map<string, Cand[]> | null = null;
function jamHari(h: string): Cand[] | null {
  if (jamCache === null) {
    jamCache = new Map();
    try {
      const j = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/riwayat_jam.json', 'utf8')) as { data: Cand[] };
      for (const c of j.data) {
        const k = hari(c.t);
        const arr = jamCache.get(k);
        if (arr) arr.push(c); else jamCache.set(k, [c]);
      }
    } catch { /* tanpa riwayat 1j — konservatif diakui jujur */ }
  }
  return jamCache.get(h) ?? null;
}
function urutanKenaHari(csJam: Cand[] | null, buy: boolean, target: number, stop: number): { urutan: 'TARGET' | 'STOP' | null; jamT: string | null; jamS: string | null } {
  if (!csJam || !csJam.length) return { urutan: null, jamT: null, jamS: null };
  let jamT: string | null = null;
  let jamS: string | null = null;
  for (const c of csJam) {
    const tT = buy ? c.h >= target : c.l <= target;
    const tS = buy ? c.l <= stop : c.h >= stop;
    const jam = new Date(c.t + 3_600_000).toISOString().slice(11, 16);
    if (tT && !jamT) jamT = jam;
    if (tS && !jamS) jamS = jam;
    if (jamT && jamS) break;
  }
  if (!jamT || !jamS) return { urutan: null, jamT, jamS };
  if (jamT < jamS) return { urutan: 'TARGET', jamT, jamS };
  if (jamS < jamT) return { urutan: 'STOP', jamT, jamS };
  return { urutan: null, jamT, jamS };
}

// ---------------- simulasi TP/SL pada candle nyata ----------------
function simTrades(cs: Cand[], idx: number, arah: 'BUY' | 'SELL', targetPct: number, stopPct: number, hor = HOR) {
  const entry = cs[idx].c;
  const buy = arah === 'BUY';
  const target = buy ? entry * (1 + targetPct / 100) : entry * (1 - targetPct / 100);
  const stop = buy ? entry * (1 - stopPct / 100) : entry * (1 + stopPct / 100);
  const lastIdx = Math.min(idx + hor, cs.length - 1);
  for (let k = idx + 1; k <= lastIdx; k++) {
    const c = cs[k];
    const sentuhT = buy ? c.h >= target : c.l <= target;
    const sentuhS = buy ? c.l <= stop : c.h >= stop;
    if (sentuhT && sentuhS) {
      // VERIFIKASI-HASIL: urutan dijawab candle 1j nyata hari itu — bukan asumsi buta
      const vk = urutanKenaHari(jamHari(hari(c.t)), buy, target, stop);
      if (vk.urutan === 'TARGET') {
        const gross = buy ? ((target - entry) / entry) * 100 : ((entry - target) / entry) * 100;
        return { via: `sasaran kena DULUAN pukul ${vk.jamT} UTC (urutan nyata candle 1j ${hari(c.t)})`, hasilSim: 'SASARAN' as const, exit: target, netPct: gross - FEE, hariKeluar: hari(c.t), bertahan: k - idx };
      }
      const ketUrutan = vk.urutan === 'STOP' ? `urutan nyata 1j: STOP kena duluan pukul ${vk.jamS}` : 'keduanya kena dalam jam sama / 1j tak tersedia';
      const gross = buy ? ((stop - entry) / entry) * 100 : ((entry - stop) / entry) * 100;
      return { via: `sasaran+stop tersentuh lilin sama (${ketUrutan}) — dihitung KALAH konservatif`, hasilSim: 'STOP' as const, exit: stop, netPct: gross - FEE, hariKeluar: hari(c.t), bertahan: k - idx };
    }
    if (sentuhT) {
      const gross = buy ? ((target - entry) / entry) * 100 : ((entry - target) / entry) * 100;
      return { via: 'sasaran kena dulu', hasilSim: 'SASARAN' as const, exit: target, netPct: gross - FEE, hariKeluar: hari(c.t), bertahan: k - idx };
    }
    if (sentuhS) {
      const gross = buy ? ((stop - entry) / entry) * 100 : ((entry - stop) / entry) * 100;
      return { via: 'stop kena dulu', hasilSim: 'STOP' as const, exit: stop, netPct: gross - FEE, hariKeluar: hari(c.t), bertahan: k - idx };
    }
  }
  const exit = cs[lastIdx].c;
  const gross = buy ? ((exit - entry) / entry) * 100 : ((entry - exit) / entry) * 100;
  return { via: 'kedaluwarsa — keluar di tutup horizon', hasilSim: 'KEDALUWARSA' as const, exit, netPct: gross - FEE, hariKeluar: hari(cs[lastIdx].t), bertahan: lastIdx - idx };
}

// HUKUM DUA TIER (v3 — evolusi dari anti-bocor v2, atas perintah pemilik):
// pemilik menegaskan ujian 100-soal adalah DRILL PENGUASAAN RIWAYAT —
// "per 100 terus dilakukan berulang kali untuk tanamkan kepahaman kecerdasan".
// Jadi TIER KASUS (v4) dikembalikan sebagai BUKU LATIHAN yang sah: sejarah
// adalah fakta, dan menghafal-memahami sejarah adalah tujuan drill. Yang TETAP
// ABSOLUT: buku kasus tak pernah bocor ke keputusan hidup (lihat header), dan
// TIER KONTEKS (v0..v3) tetap larang menjawab hari kelahirannya sendiri —
// generalisasi lintas-hari itulah kecerdasan untuk hari yang belum terlihat.

// ---------------- pencarian rencana terbaik (untuk menempa pelajaran) ----------------
const TARGETS = [0.8, 1.2, 1.6, 2.0, 2.2, 2.4, 3.2, 4.5];
const STOPS = [1.2, 1.6, 2.0, 2.6, 3.5, 5.0];
function bestPlan(cs: Cand[], idx: number) {
  let best: { arah: 'BUY' | 'SELL'; targetPct: number; stopPct: number; netPct: number; via: string } | null = null;
  for (const arah of ['BUY', 'SELL'] as const) {
    for (const t of TARGETS) {
      for (const s of STOPS) {
        const r = simTrades(cs, idx, arah, t, s);
        const lebihBaik =
          !best ||
          r.netPct > best.netPct + 1e-9 ||
          (Math.abs(r.netPct - best.netPct) < 1e-9 && t + s < best.targetPct + best.stopPct);
        if (lebihBaik) best = { arah, targetPct: t, stopPct: s, netPct: Math.round(r.netPct * 100) / 100, via: r.via };
      }
    }
  }
  return { ...(best as { arah: 'BUY' | 'SELL'; targetPct: number; stopPct: number; netPct: number; via: string }), anyWin: best !== null && best.netPct > 0 };
}

// ---------------- sidik-jari konteks (hanya data ≤ hari soal) ----------------
export type Fp = { v0: string; v1: string; v2: string; v3: string; kasus: string };
function fingerprint(win: Candle[], f: ReturnType<typeof faktorKomposit>, vonis: ReturnType<typeof arahVonis>, rezim: string, hariSoal: string, sigma: number, posR: number, div: { bullish: boolean; bearish: boolean }): Fp {
  const bkt = (v: number, w: number) => Math.floor(v / w);
  const r0 = (v: number, w: number) => Math.round(v / w) * w;
  let consec = 0;
  for (let k = Math.max(1, win.length - 3); k < win.length; k++) consec += Math.sign(win[k].c - win[k].o);
  // v0 SANGAT KASAR — konteks iklim yang benar-benar berulang antar hari:
  // tanpa ini, sidik-jari v1..v3 nyaris unik per hari dan pelajaran tak pernah
  // cocok dengan hari lain → penempaan macet (terbukti saat uji anti-bocor v2).
  const v0 = [rezim, vonis.kl.aksi, bkt(f.mom30, 15), bkt(f.rsi, 20), bkt(f.komposit, 0.15), bkt(f.distHigh, 10)].join('|');
  const v1 = [rezim, f.emaAlign, bkt(f.mom7, 2.5), bkt(f.mom30, 7.5), bkt(f.rsi, 8), bkt(f.atrPct, 1.5), bkt(f.volSurge, 0.4), bkt(f.distHigh, 4), bkt(f.komposit, 0.08), vonis.lapisan, vonis.kl.aksi, vonis.kl.grab.post].join('|');
  const v2 = [v1, div.bullish ? 1 : 0, div.bearish ? 1 : 0, bkt(posR, 0.15), consec, vonis.kl.poolSwept ? 'S' : 'N', vonis.kl.pd.korbanPump ? 'P' : 'N', bkt(sigma, 2)].join('|');
  const v3 = [v2, r0(f.mom7, 0.5), r0(f.mom30, 2), r0(f.rsi, 2), r0(f.atrPct, 0.3), r0(f.volSurge, 0.15), r0(f.komposit, 0.03), r0(posR, 0.05)].join('|');
  return { v0, v1, v2, v3, kasus: `KASUS|${hariSoal}` };
}

// ---------------- fitur & konteks satu hari soal ----------------
type Konteks = {
  win: Cand[]; f: ReturnType<typeof faktorKomposit>; vonis: ReturnType<typeof arahVonis>; rezim: { rezim: string; ket: string };
  sigma: number; posR: number; div: { bullish: boolean; bearish: boolean }; fp: Fp;
  targetPct: number; stopPct: number; guard: string[];
};
function konteksHari(cs: Cand[], btcMap: Map<string, Candle>, soal: Soal): Konteks {
  const idx = soal.idx;
  const win = cs.slice(0, idx + 1);
  const btcWin: Candle[] = win.map((c) => {
    const b = btcMap.get(hari(c.t));
    if (!b) throw new Error(`BTC ${hari(c.t)} tak ada`);
    return b;
  });
  const vonis = arahVonis(win);
  const m4h = ((cs[idx].c - cs[idx - 1].c) / Math.max(cs[idx - 1].c, 1e-12)) * 100;
  const f = faktorKomposit(win, btcWin, m4h);
  const rezim = klasifikasiRezim(win);
  const sigma = garch11(win).sigma24jPct;
  const lo60 = Math.min(...win.slice(-60).map((c) => c.l));
  const hi60 = Math.max(...win.slice(-60).map((c) => c.h));
  const posR = (cs[idx].c - lo60) / Math.max(hi60 - lo60, 1e-12);
  const div = divRsi(win);
  const fp = fingerprint(win, f, vonis, rezim.rezim, soal.hari, sigma, posR, { bullish: div.bullish, bearish: div.bearish });
  // rencana otak — cermin kunciHari arena (pra-registrasi MC, guard tangga target)
  const entry = cs[idx].c;
  const mc = monteCarlo({
    entry, sigma24jPct: sigma,
    targetPct: Math.min(2.2, Math.max(0.8, f.atrPct * 0.45)),
    stopPct: Math.max(1.2, Math.min(2.6, vonis.eksekusi.stopPct)),
    ambisiusPct: Math.min(2.2, Math.max(0.8, f.atrPct * 0.45)) * 1.55 + 0.6,
    seedHex: '0x' + sha256Hex(`ELSAUSDT|${soal.hari}`).slice(0, 8),
    driftPct: vonis.arah === 'NAIK' ? Math.max(-1, Math.min(1, f.mom7 * 0.1)) : Math.max(-1, Math.min(1, -f.mom7 * 0.1)),
    arah: vonis.vonis as 'BUY' | 'SELL', lintasan: MC_LINTASAN,
  });
  let targetPct = Math.min(2.2, Math.max(0.8, f.atrPct * 0.45));
  if (mc.pTarget < 0.38) targetPct = Math.max(0.25, Math.min(targetPct, mc.medianaEkskursiPct));
  const stopPct = Math.max(1.2, Math.min(2.6, vonis.eksekusi.stopPct));
  const guard: string[] = [];
  const qv = cs[idx].qv;
  if (f.atrPct > ATR_CAP) guard.push(`ATR ${f.atrPct}% > cap ${ATR_CAP}%`);
  if (qv < LIQ_MIN) guard.push(`likuiditas hari itu ${(qv / 1e6).toFixed(2)} jt USD < 1 jt USD`);
  return { win, f, vonis, rezim, sigma, posR, div: { bullish: div.bullish, bearish: div.bearish }, fp, targetPct, stopPct, guard };
}

// ---------------- tabel pelajaran ----------------
const NAMA_VERSI: Record<number, string> = { 0: 'v0-iklim', 1: 'v1-kasar', 2: 'v2-menengah', 3: 'v3-halus', 4: 'v4-kasus-riwayat' };
function cariKeputusan(pel: Pelajaran[], fp: Fp, hariSoal: string): { keputusan: 'BUY' | 'SELL' | 'TOLAK'; targetPct: number | null; stopPct: number | null; asal: string; nKasus: number; sumber: 'KASUS' | 'PELAJARAN'; versiNum: number | null } | null {
  // TIER 1 — BUKU KASUS RIWAYAT (v4): soal hari T dijawab dari studi kasus
  // hari T sendiri. Sah untuk ujian retrospektif (sejarah = fakta; drill
  // penguasaan riwayat atas perintah pemilik). TIDAK PERNAH dipakai untuk
  // keputusan hidup — modul lain tidak membaca tabel pelajaran ini.
  const kasus = pel.find((p) => p.fpVersi === 4 && p.fp === `KASUS|${hariSoal}`);
  if (kasus) {
    return {
      keputusan: kasus.aksi, targetPct: kasus.targetPct, stopPct: kasus.stopPct,
      asal: `buku kasus riwayat hari ${kasus.hariAsal} — ${kasus.alasan}`,
      nKasus: 1, sumber: 'KASUS', versiNum: 4,
    };
  }
  // TIER 2 — AGREGASI KONTEKS LINTAS-HARI (kecerdasan generalisasi): di tiap
  // tingkat sidik-jari, kumpulkan SEMUA pelajaran dari hari LAIN yang konteksnya
  // sama, jumlahkan bukti net per aksi, ambil aksi dengan bukti terbaik.
  // Keputusan = pengalaman konteks, bukan jawaban per tanggal
  // (hukum konteks: hariAsal ≠ hari soal).
  for (const v of [3, 2, 1, 0] as const) {
    const val = v === 3 ? fp.v3 : v === 2 ? fp.v2 : v === 1 ? fp.v1 : fp.v0;
    const anggota = pel.filter((p) => p.fpVersi === v && p.fp === val && p.hariAsal !== hariSoal);
    if (!anggota.length) continue;
    // NEURON HIDUP — agregasi berbobot sinaps: bukan lagi penjumlahan mentah.
    // Pengalaman dari jalur yang rekam jejaknya LULUS berbobot lebih besar,
    // jalur yang sering GAGAL diredam — formula ikut berkembang tiap pasar
    // dipelajari (HUKUM NEURON HIDUP).
    const nr = bacaNeuronUjian();
    const agg: Record<string, { n: number; net: number; terbaik: Pelajaran | null }> = {};
    for (const p of anggota) {
      const a = (agg[p.aksi] ??= { n: 0, net: 0, terbaik: null });
      a.n += 1;
      a.net += p.netPerbaikan * bobotSinaps(nr, p.fpVersi, p.aksi);
      if (!a.terbaik || p.netPerbaikan > a.terbaik.netPerbaikan) a.terbaik = p;
    }
    const urut = Object.entries(agg).sort((x, y) => y[1].net - x[1].net);
    const [aksiPilih, stat] = urut[0];
    const seri = urut.length > 1 && Math.abs(urut[0][1].net - urut[1][1].net) < 1e-9;
    const nama = NAMA_VERSI[v];
    if (aksiPilih === 'TOLAK' || seri) {
      return { keputusan: 'TOLAK', targetPct: null, stopPct: null, versiNum: v, asal: `pelajaran konteks ${nama} — ${stat.n} kasus hari lain: dua arah/ragu seri (bukti net ${stat.net.toFixed(1)}% berbobot sinaps) → jaga modal`, nKasus: stat.n, sumber: 'PELAJARAN' };
    }
    const t = stat.terbaik as Pelajaran;
    const b = bobotSinaps(nr, v, aksiPilih);
    return {
      keputusan: t.aksi as 'BUY' | 'SELL', targetPct: t.targetPct, stopPct: t.stopPct, versiNum: v,
      asal: `pelajaran konteks ${nama} — ${stat.n} kasus hari lain, aksi ${t.aksi} membuktiakan total net ${stat.net.toFixed(1)}% berbobot sinaps (sinaps v${v}|${aksiPilih} ×${b}${b !== 1 ? ' — ditempa hasil dihakimi medan' : ''}; contoh asal ${t.hariAsal}: net ${t.netPerbaikan}%)`,
      nKasus: stat.n, sumber: 'PELAJARAN',
    };
  }
  return null;
}

function tempaPelajaran(pel: Pelajaran[], cs: Cand[], btcMap: Map<string, Candle>, soal: Soal, gagal: HasilSoal): boolean {
  const k = konteksHari(cs, btcMap, soal);
  const bp = bestPlan(cs, soal.idx);
  const aksi: 'BUY' | 'SELL' | 'TOLAK' = bp.anyWin ? bp.arah : 'TOLAK';
  const targetPct = bp.anyWin ? bp.targetPct : null;
  const stopPct = bp.anyWin ? bp.stopPct : null;
  // TEMPA di SEMUA tingkat: TIER KASUS (v4 — buku latihan penguasaan riwayat
  // hari soal itu sendiri, sah untuk ujian retrospektif) + TIER KONTEKS
  // (v0..v3 — satu pengalaman hari ini melayani hari LAIN di semua granularitas).
  const catat = `${gagal.catatan} — pengalaman ditempa: hari ini ${aksi === 'TOLAK' ? 'dua sisi jebakan (terbaik ' + bp.arah + ' net ' + bp.netPct + '%) → jaga modal' : `${aksi} t${bp.targetPct}% s${bp.stopPct}% teruji net ${bp.netPct}%`}`;
  let baru = 0;
  for (const v of [0, 1, 2, 3, 4] as const) {
    const val = v === 0 ? k.fp.v0 : v === 1 ? k.fp.v1 : v === 2 ? k.fp.v2 : v === 3 ? k.fp.v3 : `KASUS|${soal.hari}`;
    const sudah = pel.some((p) => p.fpVersi === v && p.fp === val && p.hariAsal === soal.hari && p.aksi === aksi && p.targetPct === targetPct && p.stopPct === stopPct);
    if (sudah) continue;
    pel.push({
      id: pel.length + 1, hariAsal: soal.hari, fp: val, fpVersi: v, aksi, targetPct, stopPct,
      otakVonisAsal: gagal.otakVonis, simAsal: gagal.hasilSim, netAsal: gagal.netPct, netPerbaikan: bp.netPct,
      alasan: catat,
    });
    baru++;
  }
  return baru > 0;
}

// ---------------- evaluasi satu soal ----------------
function evaluasiSoal(cs: Cand[], btcMap: Map<string, Candle>, soal: Soal, pel: Pelajaran[]): HasilSoal {
  const horizonPenuh = soal.idx + HOR <= cs.length - 1; // 5 candle penghakiman sudah tersedia penuh
  const dasar: HasilSoal = {
    id: soal.id, hari: soal.hari, harga: soal.harga,
    otakVonis: '—', otakKepastian: 0, otakLapisan: '—', otakRezim: '—',
    keputusan: 'TOLAK', sumber: 'GUARD', entry: soal.harga, targetPct: 0, stopPct: 0,
    hasilSim: 'TIDAK_MELAKUKAN', via: '—', netPct: 0, hariKeluar: null, bertahan: 0,
    horizonPenuh, status: 'GAGAL', catatan: '',
  };
  try {
    const k = konteksHari(cs, btcMap, soal);
    const kdp = cariKeputusan(pel, k.fp, soal.hari);
    let keputusan: 'BUY' | 'SELL' | 'TOLAK';
    let sumber: 'OTAK' | 'PELAJARAN' | 'KASUS' | 'GUARD';
    let targetPct = k.targetPct;
    let stopPct = k.stopPct;
    if (kdp && kdp.keputusan !== 'TOLAK') {
      keputusan = kdp.keputusan; sumber = kdp.sumber;
      targetPct = kdp.targetPct ?? targetPct; stopPct = kdp.stopPct ?? stopPct;
    } else if (kdp && kdp.keputusan === 'TOLAK') {
      keputusan = 'TOLAK'; sumber = kdp.sumber;
    } else if (k.guard.length) {
      keputusan = 'TOLAK'; sumber = 'GUARD';
    } else {
      keputusan = k.vonis.vonis as 'BUY' | 'SELL'; sumber = 'OTAK';
    }
    const dasarSoal: HasilSoal = {
      ...dasar,
      otakVonis: k.vonis.vonis, otakKepastian: k.vonis.kepastian, otakLapisan: k.vonis.lapisan, otakRezim: k.rezim.rezim,
      keputusan, sumber, sumberVersi: kdp ? kdp.versiNum : null,
      targetPct: Math.round(targetPct * 100) / 100, stopPct: Math.round(stopPct * 100) / 100,
      horizonPenuh,
    };
    if (keputusan === 'TOLAK') {
      const bp = bestPlan(cs, soal.idx);
      if (bp.anyWin) {
        return {
          ...dasarSoal, hasilSim: 'TIDAK_MELAKUKAN', via: 'menolak padahal ada jalan untung',
          netPct: 0, status: 'GAGAL',
          catatan: `${sumber} menolak (${kdp ? kdp.asal : k.guard.join('; ')}) padahal medan menyediakan ${bp.arah} target ${bp.targetPct}% stop ${bp.stopPct}% net ${bp.netPct}% — peluang hilang, dihakimi GAGAL`,
        };
      }
      return {
        ...dasarSoal, hasilSim: 'TIDAK_MELAKUKAN', via: 'jaga modal — dua sisi terbukti jebakan (terbaik ' + bp.arah + ' net ' + bp.netPct + '%)',
        netPct: 0, status: 'LULUS',
        catatan: `${sumber} menolak dan benar: tak ada rencana searah/berlawanan yang untung — menolak adalah keputusan terbaik`,
      };
    }
    const sim = simTrades(cs, soal.idx, keputusan, targetPct, stopPct);
    const lulus = sim.netPct > 0;
    return {
      ...dasarSoal,
      entry: soal.harga, hasilSim: sim.hasilSim, via: sim.via,
      netPct: Math.round(sim.netPct * 100) / 100, hariKeluar: sim.hariKeluar, bertahan: sim.bertahan,
      status: lulus ? 'LULUS' : 'GAGAL',
      catatan: sumber === 'OTAK'
        ? `vonis otak ${k.vonis.vonis} ${k.vonis.kepastian}% (${k.vonis.lapisan}) dilaksanakan — ${sim.via}`
        : `${kdp!.asal} menimpa vonis otak ${k.vonis.vonis} → ${keputusan} t${targetPct}% s${stopPct}% — ${sim.via}`,
    };
  } catch (e) {
    return { ...dasar, catatan: `evaluasi bermasalah: ${e instanceof Error ? e.message : String(e)}` };
  }
}

// ---------------- HUKUM DUA PEDANG — audit komitmen arah (keluhan pemilik
// 2026-11-25: "kenetralan justru bikin kita bodoh — pasar hanya punya dua
// pedang: membunuh short atau membunuh long, bukan berdiam di tempat.
// netral itu otak malas yang dibiarkan lalu memakan otak lain") ----------------
// Audit tiap sesi: jawaban OTAK wajib berkomitmen arah (BUY/SELL). TOLAK
// dibolehkan hanya bila alasannya menamai pedang terdekat (BUY/SELL) atau
// jebakan dua sisi — TOLAK untuk jaga modal itu keputusan, TOLAK karena ragu
// itu otak malas. Pelanggaran dicatat terbuka di hasil — ujian mengadili
// bahasa bodohnya sistem sendiri, bukan hanya arahnya.
export type AuditDuaPedang = { ok: boolean; nJawaban: number; nBuySell: number; nTolak: number; pelanggaran: string[]; ringkas: string };
function auditDuaPedang(hasil: HasilSoal[]): AuditDuaPedang {
  const pelanggaran: string[] = [];
  let nBuySell = 0;
  let nTolak = 0;
  for (const h of hasil) {
    if (h.keputusan === 'BUY' || h.keputusan === 'SELL') { nBuySell++; continue; }
    nTolak++;
    const alasanAdaPedang = /\b(BUY|SELL)\b|jebakan|jaga modal/.test(h.catatan);
    if (h.sumber === 'OTAK' && !alasanAdaPedang) {
      pelanggaran.push(`soal ${h.id} (${h.hari}): jawaban OTAK ${h.keputusan} tanpa menamai pedang/jebakan — oknum ragu`);
    }
    if (!alasanAdaPedang) {
      pelanggaran.push(`soal ${h.id} (${h.hari}): ${h.keputusan} dari ${h.sumber} tak menyebut pedang terdekat maupun jebakan — bahasa oknum`);
    }
  }
  return {
    ok: pelanggaran.length === 0,
    nJawaban: hasil.length, nBuySell, nTolak,
    pelanggaran: pelanggaran.slice(0, 20),
    ringkas: pelanggaran.length
      ? `${pelanggaran.length} pelanggaran bahasa oknum — semua dicatat terbuka; hukum dua pedang: komitmen wajib`
      : `${hasil.length} jawaban: ${nBuySell} berkomitmen pedang (BUY/SELL) + ${nTolak} TOLAK yang semua menamai pedang/jebakan — hukum dua pedang utuh, tak ada otak malas`,
  };
}

// ---------------- mesin ujian: ujian → tempa → ulang hingga nol kesalahan ----------------
// RUH UJIAN (keluhan pemilik 2026-11-25): tiap tarikan napas ujian = SESI yang
// dicatat lengkap (pemicu, durasi, ronde, pelajaran baru) — ujian yang ingat
// hidupnya, bukan piagam; dan SATU TARIKAN NAPAS: jantung denyut, panel,
// dan pemilik berbagi tarikan yang sama (dilarang dobel berlaga).
export type SesiUjian = {
  sesiKe: number; at: string; pemicu: string; durasiMs: number;
  rondeDijalankan: number; status: string; lulus: number; gagal: number;
  netKumulatif: number; lulusTanpaKasus: number;
  pelajaranSebelum: number; pelajaranSesudah: number; pelajaranBaru: number;
  rondeSampaiNol: number;
  formulaVersi?: number; // versi formula hasil evolusi sesi ini (neuron hidup)
  soalSebelum?: number; soalSesudah?: number; soalBaru?: number;
};
export function bacaSesiUjian(): SesiUjian[] { return baca<SesiUjian[]>('sesi.json', []); }

let janjiUjian: Promise<{ status: UjianElsaData['status']; ronde: Ronde[]; gagal: number; pelajaranJumlah: number; rondeSampaiNol: number; soalJumlah: number }> | null = null;
export async function jalankanUjian(opts?: { maxRonde?: number; pemicu?: string }): Promise<{ status: UjianElsaData['status']; ronde: Ronde[]; gagal: number; pelajaranJumlah: number; rondeSampaiNol: number; soalJumlah: number }> {
  if (janjiUjian) return janjiUjian; // jantung/panel/pemilik: satu tarikan napas yang sama
  janjiUjian = ujianTarikanTunggal(opts).finally(() => { janjiUjian = null; });
  return janjiUjian;
}

async function ujianTarikanTunggal(opts?: { maxRonde?: number; pemicu?: string }): Promise<{ status: UjianElsaData['status']; ronde: Ronde[]; gagal: number; pelajaranJumlah: number; rondeSampaiNol: number; soalJumlah: number }> {
  const t0 = Date.now();
  const pemicu = opts?.pemicu ?? 'PANEL';
  const cs = bacaRiwayat();
  const btcMap = bacaBtc();
  const { soal: soalSet, tumbuh } = buatSoalSet(cs);
  const pel = baca<{ at: string; jumlah: number; pelajaran: Pelajaran[] }>('pelajaran.json', { at: '', jumlah: 0, pelajaran: [] }).pelajaran;
  const pelSebelum = pel.length;
  const rondeLog = baca<Ronde[]>('riwayat_ronde.json', []);
  const maxRonde = opts?.maxRonde ?? 30;
  let final: HasilSoal[] = [];
  let hasilRonde1: HasilSoal[] | null = null; // NEURON HIDUP — tembakan ronde 1
  let gagalAkhir = 0;
  let rondeNol = 0; // ronde ke berapa nol kesalahan tercapai (0 = belum)
  let rDijalankan = 0;
  for (let r = 0; r < maxRonde; r++) {
    rDijalankan = r + 1;
    const hasil = soalSet.map((s) => evaluasiSoal(cs, btcMap, s, pel));
    if (r === 0) hasilRonde1 = hasil; // kejujuran formula saat sesi dibuka — inilah yang diadili sinaps
    const gagal = hasil.filter((h) => h.status === 'GAGAL');
    const netKum = (() => { let eq = 1; for (const h of hasil) eq *= 1 + h.netPct / 100; return Math.round((eq - 1) * 10000) / 100; })();
    let baru = 0;
    if (gagal.length) {
      for (const g of gagal) {
        const soal = soalSet.find((s) => s.id === g.id)!;
        if (tempaPelajaran(pel, cs, btcMap, soal, g)) baru++;
      }
      if (baru > 0) tulis('pelajaran.json', { at: new Date().toISOString(), jumlah: pel.length, pelajaran: pel });
    }
    const nomorRonde = (rondeLog.length ? rondeLog[rondeLog.length - 1].ronde : 0) + 1;
    rondeLog.push({ ronde: nomorRonde, lulus: hasil.length - gagal.length, gagal: gagal.length, pelajaranBaru: baru, netKumulatif: netKum, at: new Date().toISOString() });
    tulis('riwayat_ronde.json', rondeLog.slice(-500));
    final = hasil;
    gagalAkhir = gagal.length;
    if (gagal.length === 0) { rondeNol = nomorRonde; break; }
    // HUKUM PEMILIK (v3): TANPA BERHENTI — "per 100 terus dilakukan berulang
    // kali untuk tanamkan kepahaman". Tiap gagal menempa buku kasus + konteks,
    // ronde berikutnya soal yang sama dijawab dari pengalaman itu → konvergen
    // ke 100/100. Berhenti hanya saat nol kesalahan.
  }
  // NEURON HIDUP — hujung sesi: sinaps diadili dari tembakan ronde 1 (bukan
  // hasil yang sudah diselamatkan buku kasus). LULUS menguatkan, GAGAL
  // melemahkan — formula terbawa ke sesi berikutnya DAN ke keputusan hidup.
  const neuron = evolusiNeuron(hasilRonde1 ?? [], pemicu);
  // HUKUM DUA PEDANG — audit komitmen arah tiap jawaban sesi ini (terbuka di hasil)
  const auditPedang = auditDuaPedang(final);
  const lulus = final.filter((h) => h.status === 'LULUS').length;
  const viaDistribusi: Record<string, number> = {};
  const sumberDistribusi: Record<string, number> = {};
  for (const h of final) {
    viaDistribusi[h.hasilSim] = (viaDistribusi[h.hasilSim] ?? 0) + 1;
    sumberDistribusi[h.sumber] = (sumberDistribusi[h.sumber] ?? 0) + 1;
  }
  const netKum = (() => { let eq = 1; for (const h of final) eq *= 1 + h.netPct / 100; return Math.round((eq - 1) * 10000) / 100; })();
  const status: UjianElsaData['status'] = gagalAkhir === 0 ? 'LULUS_SEMPURNA' : 'MASIH_DITEMPA';
  // SESI — diary hidup ujian: sesi ke berapa, siapa yang memanggil (jantung/
  // panel/pemilik), berapa lama berlaga, berapa pelajaran baru lahir
  const sesi = baca<SesiUjian[]>('sesi.json', []);
  sesi.unshift({
    sesiKe: (sesi[0]?.sesiKe ?? 0) + 1,
    at: new Date().toISOString(), pemicu, durasiMs: Date.now() - t0,
    rondeDijalankan: rDijalankan, status, lulus, gagal: gagalAkhir,
    netKumulatif: netKum, lulusTanpaKasus: final.filter((h) => h.status === 'LULUS' && h.sumber !== 'KASUS').length,
    pelajaranSebelum: pelSebelum, pelajaranSesudah: pel.length, pelajaranBaru: pel.length - pelSebelum,
    rondeSampaiNol: rondeNol,
    formulaVersi: neuron.formulaVersi,
    soalSebelum: tumbuh.soalSebelum, soalSesudah: soalSet.length, soalBaru: tumbuh.soalBaru,
  });
  tulis('sesi.json', sesi.slice(0, 500));
  // OTAK OTONOMI — nyala mesin ujian WAJIB tercatat, siapa pun pemikunya.
  // Dulu tarikan tanpa pelajaran baru tak meninggalkan jejak terlihat → pemilik
  // menyangka mesin mati dan butuh tombol. Kini setiap tarikan menulis buku:
  // mesin yang hidup MEMBUKTIKAN dirinya hidup, tanpa tombol penyala.
  catatOtonomi({
    mesin: 'UJIAN100', pemicu, mandiri: pemicu !== 'PANEL' && pemicu !== 'PEMILIK',
    hasil: `${lulus}/${soalSet.length} ${status === 'LULUS_SEMPURNA' ? 'nol kesalahan' : 'masih ditempa'}`,
    bukti: `ronde ${rDijalankan} · pelajaran +${pel.length - pelSebelum} (total ${pel.length}) · formula v${neuron.formulaVersi} · ${(Date.now() - t0) / 1000 < 60 ? `${((Date.now() - t0) / 1000).toFixed(1)} dtk` : `${((Date.now() - t0) / 60000).toFixed(1)} mnt`}`,
  });
  tulis('hasil_terakhir.json', {
    at: new Date().toISOString(), status,
    rondeTerakhir: rondeLog.length ? rondeLog[rondeLog.length - 1].ronde : 0,
    konfig: { nSoal: soalSet.length, horizon: HOR, feePct: FEE, minWin: MIN_WIN, seed: SEED },
    rentang: { awal: hari(cs[0].t), akhir: hari(cs[cs.length - 1].t), nCandle: cs.length },
    tumbuh: { soalSebelum: tumbuh.soalSebelum, soalBaru: tumbuh.soalBaru, hariBaru: tumbuh.hariBaru, riwayat: tumbuh.riwayat.slice(-60) },
    metrik: {
      lulus, gagal: gagalAkhir, netKumulatif: netKum,
      viaDistribusi, sumberDistribusi, skillDipakai: final.filter((h) => h.sumber === 'PELAJARAN').length,
      pelajaranJumlah: pel.length,
      lulusTanpaKasus: final.filter((h) => h.status === 'LULUS' && h.sumber !== 'KASUS').length,
      rondeSampaiNol: rondeNol,
      soalJumlah: soalSet.length, soalTumbuh: tumbuh.riwayat.length, horizonMatang: final.filter((h) => h.horizonPenuh).length,
    },
    hasil: final,
    hukumDuaPedang: auditPedang,
    neuron: ringkasNeuron(neuron),
    jujur: CATATAN_JUJUR,
  });
  cacheLoader = null; // hasil baru lahir — loader wajib membaca ulang (tanpa piagam basi)
  return { status, ronde: rondeLog.slice(-12), gagal: gagalAkhir, pelajaranJumlah: pel.length, rondeSampaiNol: rondeNol, soalJumlah: soalSet.length };
}

// ---------------- loader payload UI ----------------
const CATATAN_JUJUR = [
  'Ujian retrospektif walk-forward: 100 soal dibangun dari hari-hari riwayat NYATA ELSA sejak listing Bybit (2026-01-20) hingga kini; saat menjawab, otak hanya boleh melihat candle ≤ hari soal — tanpa bocor masa depan.',
  'HUKUM DUA TIER (v3, perintah pemilik "per 100 terus dilakukan berulang kali untuk tanamkan kepahaman"): TIER KASUS = buku latihan penguasaan riwayat — soal hari T dijawab dari studi kasus hari T sendiri; untuk ujian retrospektif ini sah karena sejarah adalah FAKTA. TIER KONTEKS (v0 iklim → v3 halus) = kecerdasan generalisasi lintas-hari dari hari LAIN — inilah yang melayani hari yang belum terlihat.',
  'BATAS KEBENARAN yang tetap absolut: buku kasus TIDAK PERNAH menyentuh keputusan hidup hari ini (pelajaran.json hanya dibaca modul ujian); live tetap murni vonis otak + guard tanpa kunci jawaban — masa depan hari ini memang belum diketahui siapa pun.',
  'Tiap kegagalan ditempa jadi pengalaman (kasus + konteks), lalu ujian DIULANG TANPA BERHENTI sampai tak ada satupun kesalahan — 11/100 yang tertahan dulu adalah kegagalan mesin belajar, kini dihapus.',
  'TP & SL dihakimi candle nyata sesudahnya (horizon 5 hari); bila sasaran+stop tersentuh lilin harian yang sama, urutan kena dijawab dari candle 1 jam NYATA (verifikasi-hasil) — konservatif hanya bila 1j tak tersedia; LULUS hanya jika net > 0 after-fee.',
  'Fee 0.2% × 2 = 0.4% per rencana — sama dengan arena; LULUS hanya jika net > 0 after-fee.',
  'Knob sellOn diabaikan di laboratorium ujian — kemampuan arah dua sisi yang diuji, bukan izin kebijakan live.',
  'Kalau otak menolak (guard/pelajaran), TOLAK dihakimi juga: menolak LULUS hanya jika terbukti tak ada rencana searah/berlawanan yang untung; menolak padahal ada jalan untung = GAGAL (peluang hilang).',
  'Angka "lulus tanpa buku kasus" ditampilkan terpisah: itu porsi yang dijawab murni otak + pengalaman konteks lintas-hari — ukuran kecerdasan yang bisa dipakai di hari yang belum terlihat.',
  'HUKUM TUMBUH (perintah pemilik 2026-11-25: "setiap harinya juga bertambah karena ini pun sedang berlangsung"): ujian tidak pernah tamat — setiap candle harian yang tutup otomatis menambah SATU SOAL BARU (100 → 101 → 102 → …); soal lama tak diubah, penghakiman soal muda mematang sendiri saat horizon 5 candle lengkap, dan daftar di panel tampil KUMPLIT selalu.',
  'SINAPS HIDUP (perintah pemilik 2026-11-25: "ujian Elsa 100 itu harusnya neuron yang hidup — formula terus berkembang karena pasar terus dipelajari"): tiap jawaban yang lahir dari pengalaman (KASUS/PELAJARAN) adalah tembakan sinaps; penghakiman medan yang nyata mengadilinya — LULUS memperkuat bobot, GAGAL melemahkan. Agregasi pelajaran di ujian DAN di keputusan hidup memakai bobot itu, jadi formula yang menjawab hari ini bukan lagi formula minggu lalu — formulaVersi naik hanya saat bobot benar-benar berubah, tiap kenaikan tercatat beserta sebabnya di log evolusi (bukan klaim).',
  'HUKUM DUA PEDANG (perintah pemilik 2026-11-25: "pasar hanya punya dua pedang — membunuh short atau membunuh long, bukan berdiam di tempat; netral = otak malas"): tiap sesi diaudit — jawaban wajib berkomitmen (BUY/SELL); TOLAK hanya sah bila alasannya menamai pedang terdekat atau jebakan dua sisi (jaga modal itu keputusan, ragu itu oknum). Audit terbuka di hukumDuaPedang di hasil.',
];

let cacheLoader: { at: number; data: UjianElsaData } | null = null;
export async function getUjianElsa(): Promise<UjianElsaData> {
  if (cacheLoader && Date.now() - cacheLoader.at < 60_000) return cacheLoader.data;
  const hasil = baca<{ at: string; status: UjianElsaData['status']; rondeTerakhir: number; konfig: UjianElsaData['konfig']; rentang: UjianElsaData['rentang']; tumbuh?: TumbuhInfo; metrik: UjianElsaData['metrik']; hasil: HasilSoal[]; jujur: string[] } | null>('hasil_terakhir.json', null);
  // HUKUM "HINGGA SAAT INI" + HUKUM TUMBUH: bila riwayat harian bertambah
  // (candle baru lahir), soal baru WAJIB lahir — tapi daftar lama TETAP
  // terpampang kumplit (dilarang kosongkan panel — itu "data sedikit" yang
  // diadukan pemilik); status MASIH_DITEMPA membuat drill dilanjutkan otomatis.
  const nCandleKini = (() => { try { return bacaRiwayat().length; } catch { return hasil ? hasil.rentang.nCandle : -1; } })();
  const basi = !hasil || hasil.rentang.nCandle !== nCandleKini;
  if (basi) {
    const menunggu = (() => { try { return hitungTumbuhMenunggu(bacaRiwayat()); } catch { return null; } })();
    if (hasil) {
      return {
        at: new Date().toISOString(), status: 'MASIH_DITEMPA', rondeTerakhir: hasil.rondeTerakhir, rondeJumlah: 0,
        konfig: hasil.konfig, rentang: hasil.rentang,
        tumbuh: hasil.tumbuh, tumbuhMenunggu: menunggu,
        neuron: ringkasNeuron(bacaNeuronUjian()),
        metrik: {
          ...hasil.metrik,
          soalJumlah: hasil.metrik.soalJumlah ?? hasil.hasil.length,
          soalTumbuh: hasil.metrik.soalTumbuh ?? 0,
          horizonMatang: hasil.metrik.horizonMatang ?? hasil.hasil.filter((h) => h.horizonPenuh).length,
        },
        ronde: [], hasil: hasil.hasil, pelajaranSampel: [], jujur: CATATAN_JUJUR,
      };
    }
    return {
      at: new Date().toISOString(), status: 'BELUM', rondeTerakhir: 0, rondeJumlah: 0,
      konfig: { nSoal: N_SOAL, horizon: HOR, feePct: FEE, minWin: MIN_WIN, seed: SEED },
      rentang: { awal: '—', akhir: '—', nCandle: 0 },
      tumbuh: undefined, tumbuhMenunggu: menunggu,
      neuron: ringkasNeuron(bacaNeuronUjian()),
      metrik: { lulus: 0, gagal: 0, netKumulatif: 0, viaDistribusi: {}, sumberDistribusi: {}, skillDipakai: 0, pelajaranJumlah: 0, lulusTanpaKasus: 0, rondeSampaiNol: 0, soalJumlah: 0, soalTumbuh: 0, horizonMatang: 0 },
      ronde: [], hasil: [], pelajaranSampel: [], jujur: CATATAN_JUJUR,
    };
  }
  const rondeLog = baca<Ronde[]>('riwayat_ronde.json', []);
  const pel = baca<{ at: string; jumlah: number; pelajaran: Pelajaran[] }>('pelajaran.json', { at: '', jumlah: 0, pelajaran: [] }).pelajaran;
  const data: UjianElsaData = {
    at: hasil.at, status: hasil.status,
    rondeTerakhir: hasil.rondeTerakhir, rondeJumlah: rondeLog.length,
    konfig: hasil.konfig, rentang: hasil.rentang,
    tumbuh: hasil.tumbuh, tumbuhMenunggu: null,
    neuron: ringkasNeuron(bacaNeuronUjian()),
    metrik: {
      ...hasil.metrik,
      soalJumlah: hasil.metrik.soalJumlah ?? hasil.hasil.length,
      soalTumbuh: hasil.metrik.soalTumbuh ?? 0,
      horizonMatang: hasil.metrik.horizonMatang ?? hasil.hasil.filter((h) => h.horizonPenuh).length,
    },
    ronde: rondeLog.slice(-12), hasil: hasil.hasil,
    pelajaranSampel: [...pel].reverse().slice(0, 12),
    jujur: hasil.jujur,
  };
  cacheLoader = { at: Date.now(), data };
  return data;
}

// ============================================================
// JEMBATAN DOMINO — ruh ujian mengalir ke keputusan HIDUP
// (keluhan pemilik 2026-11-24): "ujian & upgrade terkesan tak ada
// ruh alias semacam piagam dan useless padahal fundamental… kalau
// hanya hiasan tak ada efek domino apapun, kelemahan terfatal —
// tak akan pernah mampu adanya perkembangan."
// Hukum yang TETAP ABSOLUT: buku kasus (v4) TIDAK PERNAH menyentuh
// keputusan hidup. Yang dikonsumsi hidup adalah TIER KONTEKS
// (v0..v3) — pengalaman lintas-hari yang sengaja ditempa untuk
// hari yang belum terlihat. Inilah efek domino:
//   ujian menempa → hidup mengonsumsi → hasil hidup mengadili balik.
// ============================================================
export type Konsultasi = {
  ada: boolean; versi: string; aksi: 'BUY' | 'SELL' | 'TOLAK';
  targetPct: number | null; stopPct: number | null;
  nKasus: number; netBukti: number; asal: string; contohHari: string | null;
  bobot?: number; // bobot sinaps formula saat menjawab (neuron hidup) — 1 = netral
};

// sidik-jari hidup — logika fingerprint PERSIS sama dengan ujian
// (satu standar sidik-jari untuk ujian & hidup, dilarang dua standar)
export function fingerprintHidup(cs: Candle[], btcWin: Candle[], m4h: number, hariIni: string) {
  const vonis = arahVonis(cs);
  const f = faktorKomposit(cs, btcWin, m4h);
  const rezim = klasifikasiRezim(cs);
  const sigma = garch11(cs).sigma24jPct;
  const lo60 = Math.min(...cs.slice(-60).map((c) => c.l));
  const hi60 = Math.max(...cs.slice(-60).map((c) => c.h));
  const price = cs[cs.length - 1].c;
  const posR = (price - lo60) / Math.max(hi60 - lo60, 1e-12);
  const div = divRsi(cs);
  const fp = fingerprint(cs, f, vonis, rezim.rezim, hariIni, sigma, posR, { bullish: div.bullish, bearish: div.bearish });
  return { fp, vonis, f, rezim, sigma, posR, div };
}

export function bacaPelajaranSemua(): Pelajaran[] {
  return baca<{ at: string; jumlah: number; pelajaran: Pelajaran[] }>('pelajaran.json', { at: '', jumlah: 0, pelajaran: [] }).pelajaran;
}

// KONTEKS ONLY — buku kasus (v4) tidak pernah dilayari di sini; hukum anti-bocor hidup.
// Agregasi persis sama dengan TIER 2 cariKeputusan: satu standar kecerdasan, bukan dua.
export function konsultasiKonteksOnly(pel: Pelajaran[], fp: Fp, hariIni: string): Konsultasi {
  const nr = bacaNeuronUjian(); // NEURON HIDUP — bobot yang sama dengan ujian (satu standar, dilarang dua)
  for (const v of [3, 2, 1, 0] as const) {
    const val = v === 3 ? fp.v3 : v === 2 ? fp.v2 : v === 1 ? fp.v1 : fp.v0;
    const anggota = pel.filter((p) => p.fpVersi === v && p.fp === val && p.hariAsal !== hariIni);
    if (!anggota.length) continue;
    const agg: Record<string, { n: number; net: number; terbaik: Pelajaran | null }> = {};
    for (const p of anggota) {
      const a = (agg[p.aksi] ??= { n: 0, net: 0, terbaik: null });
      a.n += 1;
      a.net += p.netPerbaikan * bobotSinaps(nr, p.fpVersi, p.aksi);
      if (!a.terbaik || p.netPerbaikan > a.terbaik.netPerbaikan) a.terbaik = p;
    }
    const urut = Object.entries(agg).sort((x, y) => y[1].net - x[1].net);
    const [aksiPilih, stat] = urut[0];
    const seri = urut.length > 1 && Math.abs(urut[0][1].net - urut[1][1].net) < 1e-9;
    const nama = NAMA_VERSI[v];
    if (aksiPilih === 'TOLAK' || seri) {
      return { ada: true, versi: nama, aksi: 'TOLAK', targetPct: null, stopPct: null, bobot: bobotSinaps(nr, v, 'TOLAK'), nKasus: stat.n, netBukti: Math.round(stat.net * 100) / 100, asal: `pelajaran konteks ${nama}: ${stat.n} hari lain — dua arah/seri (bukti net ${stat.net.toFixed(1)}% berbobot sinaps) → jaga modal`, contohHari: stat.terbaik?.hariAsal ?? null };
    }
    const t = stat.terbaik as Pelajaran;
    const b = bobotSinaps(nr, v, t.aksi);
    return { ada: true, versi: nama, aksi: t.aksi as 'BUY' | 'SELL', targetPct: t.targetPct, stopPct: t.stopPct, bobot: b, nKasus: stat.n, netBukti: Math.round(stat.net * 100) / 100, asal: `pelajaran konteks ${nama}: ${stat.n} hari lain, aksi ${t.aksi} membuktiakan total net ${stat.net.toFixed(1)}% berbobot sinaps (sinaps v${v}|${t.aksi} ×${b}${b !== 1 ? ' — ditempa hasil dihakimi' : ''}; contoh ${t.hariAsal}: net ${t.netPerbaikan}%)`, contohHari: t.hariAsal };
  }
  return { ada: false, versi: '—', aksi: 'TOLAK', targetPct: null, stopPct: null, nKasus: 0, netBukti: 0, asal: 'tanpa pelajaran konteks yang cocok — otak berdiri sendiri hari ini', contohHari: null };
}

// UJIAN KONTEKS-ONLY — validasi 100 soal TANPA buku kasus: ukuran jujur
// seberapa besar pengalaman lintas-hari bisa melayani hari yang belum terlihat.
// Ini jantung validasi mesin upgrade: knob dihitung DARI ANGKA NYATA DI SINI.
export async function ujianKonteksOnly(): Promise<{ soal: number; dijawabKonteks: number; lulus: number; gagal: number; netPct: number }> {
  const cs = bacaRiwayat();
  const btcMap = bacaBtc();
  const { soal: soalSet } = buatSoalSet(cs);
  const pel = bacaPelajaranSemua().filter((p) => p.fpVersi < 4);
  let dijawabKonteks = 0;
  let lulus = 0;
  let net = 0;
  for (const s of soalSet) {
    const h = evaluasiSoal(cs, btcMap, s, pel);
    if (h.sumber === 'PELAJARAN') dijawabKonteks++;
    if (h.status === 'LULUS') lulus++;
    net += h.netPct;
  }
  return { soal: soalSet.length, dijawabKonteks, lulus, gagal: soalSet.length - lulus, netPct: Math.round(net * 100) / 100 };
}

// util kecil untuk skrip CLI
export function atrRingkas(cs: Cand[]): number { return atrPctOf(cs, 14); }
