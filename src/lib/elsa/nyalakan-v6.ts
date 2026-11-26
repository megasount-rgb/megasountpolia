// ============================================================
// MICAPROFITA-ELSA · NYALAKAN-V6 — penyala cadangan jantung baru.
// instrumentation.ts menyala sekali saat proses boot; kalau proses
// diboot SEBELUM organ V6 ditulis (pembaruan panas), lima jantung
// baru (persilangan, briefing, pertumbuhan, nadi, guru-latar) bisa
// tidak berjalan sebagai timer. Maka /api/elsa GET memanggil fungsi
// ini tiap muat — semua mulai*() IDEMPOTEN (guard globalThis), jadi
// dipanggil seribu kali pun hanya menyala sekali per proses.
// ============================================================
import { mulaiPersilangan } from './persilangan';
import { mulaiBriefing } from './briefing';
import { mulaiPertumbuhan } from './pertumbuhan';
import { mulaiNadi } from './nadi';
import { denyutGuruLatar } from './guru';

export function nyalakanJantungV6(): void {
  mulaiPersilangan();
  mulaiBriefing();
  mulaiPertumbuhan();
  mulaiNadi();
  const g = globalThis as { __elsaGuruLatarTimer?: NodeJS.Timeout };
  if (!g.__elsaGuruLatarTimer) {
    g.__elsaGuruLatarTimer = setInterval(() => { void denyutGuruLatar(); }, 30 * 60 * 1000);
    setTimeout(() => { void denyutGuruLatar(); }, 30_000); // denyut pertama
  }
}
