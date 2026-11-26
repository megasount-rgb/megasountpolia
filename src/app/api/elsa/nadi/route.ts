// ============================================================
// API NADI & GUDANG — jantung yang memantau SEMUA jantung
// GET  → keadaan galian terakhir: papan denyut semua jantung
//        (ujian mandiri, dompet, ignisi, paus, kasus, sumber, guru,
//        persilangan, briefing, pertumbuhan) + alarm AMIGDALA TIDUR
//        + inventaris gudang db/elsa (ukuran, umur, diberi-makan-siapa).
// POST { action: 'denyutPaksa' } → gali SEKARANG (perintah pemilik).
// ============================================================
import { NextResponse } from 'next/server';
import { bacaNadiGudang, denyutNadi } from '@/lib/elsa/nadi';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = bacaNadiGudang();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'nadi gagal dibaca — coba lagi' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { action?: string };
    if (body.action === 'denyutPaksa') {
      const d = await denyutNadi();
      return NextResponse.json({ ok: !!d, detakKe: d?.detakKe ?? 0, alarm: d?.alarm ?? [] });
    }
    return NextResponse.json({ error: 'action tidak dikenal (denyutPaksa)' }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'nadi gagal berdenyut — coba lagi' },
      { status: 500 },
    );
  }
}
