// ============================================================
// API BRIEFING GURU — briefing HIDUP fokus ELSA
// GET  → briefing terkini (7 bagian: medan ELSA, vonis+sikap guru,
//        radar, modal hidup, kasus, pertumbuhan, pemahaman guru)
//        + perintah hari ini + riwayat briefing.
// POST { action: 'denyut' } → guru menulis briefing SEKARANG.
// ============================================================
import { NextResponse } from 'next/server';
import { bacaBriefingPayload, denyutBriefing } from '@/lib/elsa/briefing';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function GET() {
  try {
    const data = bacaBriefingPayload();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'briefing gagal dibaca — coba lagi' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { action?: string };
    if (body.action === 'denyut') {
      const b = await denyutBriefing(true);
      return NextResponse.json({ ok: !!b, briefing: b });
    }
    return NextResponse.json({ error: 'action tidak dikenal (denyut)' }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'briefing gagal berdenyut — coba lagi' },
      { status: 500 },
    );
  }
}
