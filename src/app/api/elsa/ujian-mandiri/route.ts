// ============================================================
// API UJIAN MANDIRI — riwayat denyut LENGKAP (bukan potongan).
// keluhan pemilik 2026-11-25: "listnya terpampang kumplit bukan
// hanya data sedikit" — endpoint ini menyajikan semua detak +
// semua sesi ujian ELSA 100 + DAFTAR PENUH hari diadili (yang
// bertambah satu baris setiap hari candle tutup) tanpa dipangkas.
// ============================================================
import { NextResponse } from 'next/server';
import { bacaDenyutPenuh } from '@/lib/elsa/denyut';
import { bacaSesiUjian } from '@/lib/elsa/ujian';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { keadaan, riwayatSemua, daftarSemua } = bacaDenyutPenuh();
    return NextResponse.json({
      keadaan,
      riwayatSemua,
      daftarSemua,
      daftarJumlah: daftarSemua.length,
      sesiUjianElsa: bacaSesiUjian(),
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'gagal membaca denyut' }, { status: 500 });
  }
}
