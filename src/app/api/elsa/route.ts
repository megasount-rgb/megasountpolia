import { NextResponse } from 'next/server';
import { getArenaPayload, setSellOn, invalideCachePayload, jalankanUpgradePenuh } from '@/lib/elsa/arena';
import { jalankanUjian } from '@/lib/elsa/ujian';
import { dompetReset, dompetTutupPaksa, dompetUjiDampak } from '@/lib/elsa/dompet';
import { denyutPaksa } from '@/lib/elsa/denyut';
import { nyalakanJantungV6 } from '@/lib/elsa/nyalakan-v6';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    nyalakanJantungV6(); // penyala cadangan — idempoten (jantung V6 hidup walau proses boot sebelum pembaruan)
    const payload = await getArenaPayload();
    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'gagal memuat arena' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { action?: string; sellOn?: boolean; paksa?: boolean };
    if (body.action === 'setSellOn' && typeof body.sellOn === 'boolean') {
      setSellOn(body.sellOn);
    }
    if (body.action === 'runUjianElsa') {
      // HUKUM OTONOMI (keluhan pemilik 2026-11-26: "klik justru tak ada efek
      // apapun — oknum pemalas"): penyala sah mesin ini ADALAH JANTUNG denyut
      // (instrumentation.ts + denyut.ts domino tiap 30 menit/candle baru), bukan
      // tombol di panel — tombol sudah DIHAPUS dari UI. Endpoint ini tinggal
      // jalur darurat pemilik & lanjutan-otomatis saat status MASIH_DITEMPA:
      // dinyalakan TANPA MENUNGGU (fire-and-forget) supaya respons tak menggantung
      // ber-menit sampai HTTP mati diam; hasil nyata muncul di buku otonomi +
      // daftar sesi pada GET berikutnya (panel menyegarkan tiap 90 detik).
      void (async () => {
        try {
          await jalankanUjian({ maxRonde: 60, pemicu: 'PEMILIK' });
          // DOMINO UJIAN→UPGRADE — ruh ujian: begitu ujian tuntas, neuron konteks
          // langsung difus + divalidasi + knob diterbitkan (bukan piagam)
          await jalankanUpgradePenuh(false);
        } catch { /* denyut berikutnya mencoba lagi */ }
        invalideCachePayload();
      })();
    }
    if (body.action === 'jalankanUpgrade') {
      // mesin upgrade hidup — penyalanya jantung (tiap denyut); jalur darurat
      // ini juga fire-and-forget: cek mandiri/refusi tercatat di buku otonomi
      void (async () => {
        try {
          await jalankanUpgradePenuh(body.paksa === true);
        } catch { /* denyut berikutnya mencoba lagi */ }
        invalideCachePayload();
      })();
    }
    // PERINTAH PEMILIK — jantung ujian mandiri berlaga SEKARANG (tanpa menunggu jadwal)
    if (body.action === 'denyutPaksa') {
      await denyutPaksa();
      invalideCachePayload();
    }
    // OTAK DOMPET — kendali pemilik atas dompet $1000
    if (body.action === 'dompetUjiDampak') {
      // uji dampak $1000 ke orderbook nyata saat ini — TANPA menyentuh saldo
      await dompetUjiDampak(1000);
      invalideCachePayload();
    }
    if (body.action === 'dompetTutupPaksa') {
      await dompetTutupPaksa();
      invalideCachePayload();
    }
    if (body.action === 'dompetReset') {
      await dompetReset();
      invalideCachePayload();
    }
    // JANTUNG DOMPET — perintah pemilik: denyut modal hidup SEKARANG
    // (kalau modal didiamkan kita tak pernah tahu dimana kecacatan kita)
    if (body.action === 'dompetDenyutPaksa') {
      const { denyutDompetPaksa } = await import('@/lib/elsa/dompet-jantung');
      await denyutDompetPaksa();
      invalideCachePayload();
    }
    const payload = await getArenaPayload();
    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'gagal' }, { status: 500 });
  }
}
