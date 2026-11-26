// ============================================================
// API BUS PERSILANGAN — neuron saling mencerdaskan
// GET  → ronde pertukaran terakhir (kiriman bertanda tangan dari
//        ignisi/paus/lintasan/kasus/dompet/guru/ujian/paham/sumber/
//        pertumbuhan + reaksi WAJIB penerima) + statistik bus.
// POST { action: 'denyut' } → antar kiriman SEKARANG.
// ============================================================
import { NextResponse } from 'next/server';
import { bacaPersilanganPayload, denyutPersilangan } from '@/lib/elsa/persilangan';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = bacaPersilanganPayload();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'bus persilangan gagal dibaca — coba lagi' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { action?: string };
    if (body.action === 'denyut') {
      const r = await denyutPersilangan();
      return NextResponse.json({ ok: !!r, ronde: r });
    }
    return NextResponse.json({ error: 'action tidak dikenal (denyut)' }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'bus persilangan gagal berdenyut — coba lagi' },
      { status: 500 },
    );
  }
}
