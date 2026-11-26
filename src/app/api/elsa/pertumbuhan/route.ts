// ============================================================
// API OTAK PERTUMBUHAN — pertumbuhan punya NEURON
// GET  → snapshot terkini (AGI 6 dimensi + delta jujur + direktif)
//        + diary snapshot sebelumnya.
// POST { action: 'denyut' } → timbang diri SEKARANG.
// ============================================================
import { NextResponse } from 'next/server';
import { bacaPertumbuhanPayload, denyutPertumbuhan } from '@/lib/elsa/pertumbuhan';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = bacaPertumbuhanPayload();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'otak pertumbuhan gagal dibaca — coba lagi' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { action?: string };
    if (body.action === 'denyut') {
      const s = await denyutPertumbuhan();
      return NextResponse.json({ ok: !!s, snapshot: s });
    }
    return NextResponse.json({ error: 'action tidak dikenal (denyut)' }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'otak pertumbuhan gagal berdenyut — coba lagi' },
      { status: 500 },
    );
  }
}
