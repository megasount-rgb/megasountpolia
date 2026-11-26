// ============================================================
// API NEURON RUANG GURU — otak hidup AI (LLM + web_search)
// GET  → status neuron (cepat, tanpa LLM): hidup, harga, berita,
//        pemahaman terakhir, saran pertanyaan.
// POST → { action: 'denyut', paksa? }  : guru BERPIKIR MANDIRI
//        (panen berita segar + tulis pemahaman hari ini).
//        { action: 'tanya', pertanyaan, riwayat } : percakapan
//        multi-turn dengan data hidup + asal-usul + berita.
// ============================================================
import { NextResponse } from 'next/server';
import { denyutNeuron, tanyaGuru, statusNeuron } from '@/lib/elsa/guru';
import type { PesanGuru } from '@/lib/elsa/guru';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const SARAN_GURU = [
  'Bagaimana pemahamanmu tentang pasar ELSA hari ini?',
  'Apa asal usul ELSA?',
  'Ada kabar penting soal ELSA atau pasar kripto?',
  'Kenapa verdict otak sekarang begini?',
  'Apa risiko terbesar 24 jam ke depan?',
  'Jelaskan radar paus hari ini dengan bahasa sederhana',
  'Kalau saya entry sekarang, apa rencananya?',
  'Kenapa SELL dimatikan?',
];

export async function GET() {
  try {
    const s = statusNeuron();
    return NextResponse.json({ status: s, saran: SARAN_GURU });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'gagal baca status neuron' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      action?: string; pertanyaan?: string; riwayat?: PesanGuru[]; paksa?: boolean;
    };
    if (body.action === 'denyut') {
      const h = await denyutNeuron(body.paksa === true);
      return NextResponse.json(h);
    }
    if (body.action === 'tanya') {
      const q = typeof body.pertanyaan === 'string' ? body.pertanyaan.trim() : '';
      if (!q) return NextResponse.json({ error: 'pertanyaan kosong' }, { status: 400 });
      const riwayat = Array.isArray(body.riwayat)
        ? body.riwayat
            .filter((m) => m && (m.peran === 'saya' || m.peran === 'guru') && typeof m.teks === 'string' && m.teks.trim())
            .slice(-10)
            .map((m) => ({ peran: m.peran, teks: m.teks.slice(0, 2000), at: m.at }))
        : [];
      const j = await tanyaGuru(q, riwayat);
      return NextResponse.json(j);
    }
    return NextResponse.json({ error: 'action tidak dikenal (denyut | tanya)' }, { status: 400 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'neuron guru gagal — coba lagi' },
      { status: 500 },
    );
  }
}
