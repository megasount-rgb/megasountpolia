// ============================================================
// MICAPROFITA-ELSA · OTAK BRIEFING GURU — briefing HIDUP, bukan
// teks mati yang hanya terbentuk saat halaman dibuka.
// (keluhan pemilik, 2026-11-26): "pertumbuhan, nadi gudang, briefing
//  guru mereka gak miliki neuron sehingga kita kejebolan!!"
// dan (2026-11-26): "ruang guru kita harusnya fokus ke aspek koin
//  yang sedang dituju di dalam ini, bukan fokus ke aspek koin lain!"
// Jadi briefing guru punya JANTUNG sendiri (tiap 20 menit) dan
// HUKUM FOKUS MUTLAK: 100% barisnya bicara ELSA/USDT — angka dari
// organ ELSA (candle Bybit ELSA, radar paus ELSA, dompet ELSA,
// kasus ELSA, ujian ELSA 100). BTC/berita lain hanya boleh muncul
// SEJAUH MEmemengaruhi ELSA (beta) dan wajib dilabeli "konteks".
// Tiap denyut: 7 bagian (medan, vonis+sikap guru, radar, modal
// hidup, kasus, pertumbuhan, perintah) — semua dengan angka nyata,
// neuron tanpa data menyebutnya "belum terbaca" (dilarang mengarang).
// Sikap guru dihitung dari KONFLIK data nyata (modal melawan vonis,
// unlock dekat, squeeze aktif) — guru berjiwa: boleh melawan otak.
// ============================================================
import fs from 'fs';
import { getArenaPayload } from './arena';
import { catatOtonomi } from './otonomi';

const DIR_BRF = '/home/z/my-project/db/elsa/briefing';
const FILE_TERKINI = `${DIR_BRF}/terkini.json`;
const FILE_RIWAYAT = `${DIR_BRF}/riwayat.json`;
const JEDA_MS = 20 * 60_000;
const CAP_RIWAYAT = 60;

export type BriefingBaris = { bagian: string; teks: string };
export type SikapGuru = 'SEPAKAT' | 'MELAWAN' | 'BERBEDA-PENDAPAT-SEBAGIAN' | 'BUTUH-BUKTI';
export type Briefing = {
  at: string;
  hari: string;
  fokus: 'ELSA/USDT';
  judul: string;
  sikap: SikapGuru;
  alasanSikap: string;
  baris: BriefingBaris[];
  perintah: string;
  sumber: string[];
};

type Rec = Record<string, unknown>;
const r = (v: unknown): Rec | null => (v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Rec) : null);
const n = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const s = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v.trim() : null);
const xs = (v: unknown): unknown[] | null => (Array.isArray(v) ? v : null);

function bacaJson<T>(fp: string, def: T): T {
  try {
    fs.mkdirSync(DIR_BRF, { recursive: true });
    if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, 'utf8')) as T;
  } catch { /* rusak — mulai segar */ }
  return def;
}
function tulisJson(fp: string, v: unknown): void {
  try {
    fs.mkdirSync(DIR_BRF, { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(v));
  } catch { /* abai */ }
}

const hargaF = (v: number | null): string => (v === null ? '—' : `$${v < 0.1 ? v.toFixed(6) : v.toFixed(4)}`);
const pctF = (v: number | null): string => (v === null ? '—' : `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`);

function bacaGuruPemahaman(): { teks: string; umurMenit: number } | null {
  try {
    const j = JSON.parse(fs.readFileSync('/home/z/my-project/db/elsa/guru/pemahaman.json', 'utf8')) as Rec;
    const teks = s(j.teks);
    if (!teks || typeof j.at !== 'string') return null;
    return { teks, umurMenit: Math.round((Date.now() - Date.parse(j.at)) / 60000) };
  } catch { return null; }
}

// ---------------- satu denyut briefing ----------------
let berlagar = false;
export async function denyutBriefing(paksa = false): Promise<Briefing | null> {
  if (berlagar) return null;
  berlagar = true;
  try {
    const lama = bacaJson<Briefing | null>(FILE_TERKINI, null);
    if (!paksa && lama && Date.now() - Date.parse(lama.at) < JEDA_MS) return lama; // masih segar
    const p = (await getArenaPayload()) as Rec;
    const meta = r(p.meta), pil = r(p.pilihan), modal = r(p.modal), paus = r(p.paus);
    const ignisi = r(p.ignisi), dompet = r(p.dompet), ujianElsa = r(p.ujianElsa);
    const kasusArr = xs(p.kasus) ?? [], pert = r(p.pertumbuhan);
    const baris: BriefingBaris[] = [];

    // 1) MEDAN ELSA
    const harga = n(meta?.harga), c24 = n(meta?.perubahan24j);
    const rezim = s(meta?.rezimKet) ?? (r(meta?.rezim) ? s(r(meta?.rezim)?.ket) : null) ?? '—';
    baris.push({
      bagian: 'MEDAN ELSA',
      teks: `ELSA ${hargaF(harga)} (${pctF(c24)} 24 jam) · rezim ${rezim} · candle harian ke-${n(meta?.candle) ?? '—'} sejak TGE 20 Jan 2026 — SEMUA angka di briefing ini adalah ELSA, bukan koin lain.`,
    });

    // 2) VONIS OTAK + SIKAP GURU (dihitung dari konflik data nyata)
    const arah = s(pil?.arah) ?? '—';
    const key = n(pil?.keyakinan);
    const guard = s(pil?.guard) ?? '—';
    const garis = r(pil?.garis);
    const vonisModal = s(modal?.vonis);
    const unlockNext = r(r(r(p.sumber)?.unlock)?.berikutnya);
    const hariUnlock = n(unlockNext?.hariDariSekarang);
    const squeeze = modal?.squeezeAktif === true;
    let sikap: SikapGuru = 'SEPAKAT';
    const alasan: string[] = [];
    if (arah === 'BUY' && (vonisModal?.startsWith('JEBAKAN') || vonisModal === 'DISTRIBUSI')) {
      sikap = 'MELAWAN';
      alasan.push(`otak modal menilai ${vonisModal} — whale/pump yang menyamar; BUY disiplin tetap boleh, tapi guru menuntut stop lebih tegas`);
    }
    if (arah === 'SELL' && squeeze) {
      sikap = 'MELAWAN';
      alasan.push(`short-squeeze aktif (skor ${n(modal?.squeezeSkor) ?? '—'}) — bensin turunnya adalah penutupan short; SELL melawan gelombang likuidasi`);
    }
    if (hariUnlock !== null && hariUnlock <= 7) {
      if (sikap === 'SEPAKAT') sikap = 'BERBEDA-PENDAPAT-SEBAGIAN';
      alasan.push(`unlock ${unlockNext ? s(unlockNext.tanggal) ?? hariUnlock + ' hari lagi' : hariUnlock + ' hari lagi'} menekan sisi supply — keyakinan searah NAIK wajib dipangkas tipis`);
    }
    if ((key ?? 0) < 45) {
      sikap = 'BUTUH-BUKTI';
      alasan.push(`keyakinan otak baru ${key ?? '—'}% — guru menolak berdiri di atas bukti setipis itu`);
    }
    if (!alasan.length) alasan.push('tidak ada konflik data: modal, unlock, squeeze, dan dewan searah — guru berdiri di belakang vonis hari ini');
    const garisTeks = garis
      ? `garis: entry ${hargaF(n(garis.entry))} → TP ${hargaF(n(garis.target))} (${pctF(n(garis.targetPct))}) / SL ${hargaF(n(garis.stop))} (${pctF(n(garis.stopPct))})`
      : 'garis belum terbentuk';
    baris.push({
      bagian: 'VONIS OTAK & SIKAP GURU',
      teks: `otak: ${arah} (keyakinan ${key ?? '—'}%, guard ${guard}) ${garisTeks}. SIKAP GURU: ${sikap} — ${alasan.join(' · ')}.`,
    });

    // 3) RADAR (paus + ignisi — mata anti-kecolongan)
    const jejak = r(paus?.jejak), net = r(paus?.net);
    const negaraIg = s(ignisi?.negara) ?? '—', arahIg = s(ignisi?.arah) ?? '—', keyIg = n(ignisi?.keyakinan);
    const lapisIg = n(ignisi?.nLapisanAktif);
    const pausTeks = jejak
      ? `${n(jejak.cetakanPausJumlah) ?? 0} cetakan paus (≈$${((n(jejak.cetakanPausUsd) ?? 0) / 1000).toFixed(0)}rb) · penempatan ${s(net?.sisiPenempatan) ?? '—'} · net spot ${((n(net?.netSpotUsd) ?? 0) / 1000).toFixed(1)}rb`
      : 'radar paus belum terbaca denyut ini';
    baris.push({
      bagian: 'RADAR ELSA (PAUS + IGNISI)',
      teks: `${pausTeks}. Radar ignisi: ${negaraIg} arah ${arahIg} (keyakinan ${keyIg ?? 0}%, ${lapisIg ?? 0}/8 lapisan)${negaraIg !== 'TENANG' && negaraIg !== '—' ? ' — pedang melawan radar DIRAMPAS, gelombang searah DIPELIHARA (hukum luka 03:00)' : ' — pasar tenang, pedang bebas dari hukuman radar'}.`,
    });

    // 4) MODAL HIDUP (dompet $1000)
    const pos = r(dompet?.posisi);
    const dompetTeks = pos
      ? `dompet memegang ${s(pos.arah)} @ ${hargaF(n(pos.entryVwap))} → mark ${hargaF(n(pos.mark))} (uPnl ${pctF(n(pos.uPnlPct))}) · TP ${hargaF(n(pos.target))} / SL ${hargaF(n(pos.stop))} dijaga jantung ≤60 dtk`
      : `dompet FLAT — jantung memegang hukum dua pedang: mencari pedang dari vonis modal-jiwa (K≥0.5), magnet portal dekat (K≥0.55, 1–4.5%), ATAU memandu pedang mandiri dari momentum+ignisi+magnet ELSA sendiri; dilarang diam tanpa alasan tercatat`;
    baris.push({
      bagian: 'MODAL HIDUP ($1000)',
      teks: `ekuitas $${n(dompet?.ekuitas) ?? '—'} · pnl bersih ${pctF(n(dompet?.pnlBersihPct))} · top-up ke-${n(dompet?.topupKe) ?? 1}. ${dompetTeks}.`,
    });

    // 5) KASUS (luka yang tidak boleh dilupakan)
    const k0 = kasusArr.length ? r(kasusArr[0]) : null;
    baris.push({
      bagian: 'KASUS ELSA',
      teks: k0
        ? `kasus teratas "${s(k0.judul) ?? '—'}" (ledakan ${n(k0.ledakanPct) ?? '—'}%, ${s(k0.status) ?? '—'}) — ${(xs(k0.pelajaran) ?? []).length} pelajaran tertanam jadi neuron; guru & dompet membaca kasus ini tiap denyut agar luka 0.08→0.11 TIDAK BERULANG.`
        : 'belum ada berkas kasus — otak kasus menyapu ledakan ELSA tiap 10 menit.',
    });

    // 6) PERTUMBUHAN OTAK
    const kurikulum0 = r((xs(pert?.kurikulum) ?? [])[0]);
    baris.push({
      bagian: 'PERTUMBUHAN OTAK',
      teks: `ujian ELSA 100: ${s(ujianElsa?.status) ?? '—'} (lulus ${n(r(ujianElsa?.metrik)?.lulus) ?? 0}/100, pelajaran ${n(r(ujianElsa?.metrik)?.pelajaranJumlah) ?? 0} tertanam) · AGI ${n(pert?.agiPct) ?? '—'}% (P ${n(pert?.P) ?? '—'} · G ${n(pert?.G) ?? '—'} · A ${n(pert?.A) ?? '—'}) · kurikulum teratas: ${s(kurikulum0?.label) ?? '—'} (+${n(kurikulum0?.dAgiPp) ?? '—'} pp potensi).`,
    });

    // 7) GURU MANDIRI (pemahaman LLM terbaru)
    const guru = bacaGuruPemahaman();
    baris.push({
      bagian: 'PEMAHAMAN GURU MANDIRI',
      teks: guru
        ? `(${guru.umurMenit} menit lalu) ${guru.teks.replace(/\n+/g, ' ').slice(0, 220)}…`
        : 'guru belum berpikir mandiri denyut ini — denyut neuron guru menyusul (berjalan latar tiap 30 menit).',
    });

    // PERINTAH HARI INI
    const perintah = pos
      ? `JAGA POSISI: ${s(pos.arah)} — stop ${hargaF(n(pos.stop))} TIDAK BOLEH diendorong menjauh; bila radar ignisi melawan, stop ditarik SEKARANG.`
      : arah === 'BUY' || arah === 'SELL'
        ? `SIAP PEDANG SEARAH ${arah}: garis ${garisTeks} — masuk hanya bila guard LOLOS dan radar mengizinkan; bila flat lebih dari satu denyut, jantung mengangkat pedang mandiri dengan keyakinan tertulis.`
        : `DISIPLIN MENUNGGU BUKTI: guard ${guard} — tapi jantung tetap memindai tiap 60 dtk; kebodohan terbesar adalah diam tanpa alasan tercatat.`;

    const briefing: Briefing = {
      at: new Date().toISOString(),
      hari: s(meta?.hari) ?? new Date().toISOString().slice(0, 10),
      fokus: 'ELSA/USDT',
      judul: `Briefing ELSA — ${arah} ${key ?? '—'}% · sikap guru ${sikap}`,
      sikap,
      alasanSikap: alasan.join(' · '),
      baris,
      perintah,
      sumber: ['ARENA ELSA', 'RADAR PAUS+IGNISI', 'DOMPET HIDUP', 'OTAK KASUS', 'UJIAN ELSA 100', 'GURU MANDIRI'],
    };
    tulisJson(FILE_TERKINI, briefing);
    const riwayat = bacaJson<Briefing[]>(FILE_RIWAYAT, []);
    riwayat.unshift(briefing);
    tulisJson(FILE_RIWAYAT, riwayat.slice(0, CAP_RIWAYAT));
    catatOtonomi({
      mesin: 'BRIEFING', pemicu: paksa ? 'PEMILIK' : 'JANTUNG', mandiri: !paksa,
      hasil: `briefing ELSA ditulis — ${briefing.judul}`,
      bukti: `${baris.length} bagian · sikap ${sikap}: ${briefing.alasanSikap.slice(0, 120)}`,
    });
    return briefing;
  } catch {
    return null; // denyut berikutnya mencoba lagi — luka dicatat otonomi kalau terus
  } finally {
    berlagar = false;
  }
}

export function mulaiBriefing(): void {
  const g = globalThis as { __elsaBriefingTimer?: NodeJS.Timeout; __elsaBriefingAwal?: boolean };
  if (g.__elsaBriefingAwal) return;
  g.__elsaBriefingAwal = true;
  setTimeout(() => { void denyutBriefing(); }, 12_000);
  g.__elsaBriefingTimer = setInterval(() => { void denyutBriefing(); }, JEDA_MS);
}

// ---------------- payload UI ----------------
export function bacaBriefingPayload(): { terkini: Briefing | null; riwayat: Briefing[]; statistik: { jumlah: number; sikapTerakhir: string; umurMenit: number | null } } {
  const terkini = bacaJson<Briefing | null>(FILE_TERKINI, null);
  const riwayat = bacaJson<Briefing[]>(FILE_RIWAYAT, []);
  const umur = terkini ? Math.round((Date.now() - Date.parse(terkini.at)) / 60000) : null;
  return {
    terkini,
    riwayat: riwayat.slice(0, 12),
    statistik: { jumlah: riwayat.length, sikapTerakhir: terkini?.sikap ?? '—', umurMenit: umur },
  };
}
