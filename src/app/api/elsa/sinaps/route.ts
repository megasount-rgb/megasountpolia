// ============================================================
// API SINAPS — bus saraf hidup arsitektur kognitif
// GET → peta organ (aktifasi/metrik/keluaran NYATA), saluran
//       kabel antar organ, jurnal denyut aktivitas nyata,
//       statistik denyut 24 jam.
// ============================================================
import { NextResponse } from 'next/server';
import { getSinapsData } from '@/lib/elsa/sinaps';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getSinapsData();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'bus sinaps gagal — coba lagi' },
      { status: 500 },
    );
  }
}
