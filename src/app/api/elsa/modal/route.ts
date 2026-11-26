import { NextResponse } from 'next/server';
import { getModalPayload } from '@/lib/elsa/modal';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getModalPayload();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'gagal memuat modal' }, { status: 500 });
  }
}
