// ============================================================
// MICAPROFITA-ELSA · SAKTI-ARAH — mesin kepastian arah berbasis
// bukti (port setia dari src/lib/exam/arah-brain.ts v1.8 situs
// sumber). Dewan bukti 8 dimensi candle + E9 MATRIKS SUMBER HIDUP
// (kesaksian CoinGecko/CMC/DEXScreener/GeckoTerminal/Bybit masuk
// nyata — matriks sumber DIPAKAI memutuskan, bukan pajangan mati)
// + E10 RADAR PAUS HIDUP (kesaksian neuron paus: penempatan bersih,
// pola hedged, duel paus-vs-paus — asupan vitamin ke otak)
// + E11 JIWA OTAK MODAL (kesaksian keyakinan terbuka: vonis + magnet
// portal dengan rekam jejak akurasi — pondasi modal ikut memutuskan)
// + E12 OTAK LINTASAN (kesaksian prediksi URUTAN magnet & POLA
// lintasan dengan rekam jejak pola — jawaban "mana magnet ditarik
// dulu, lalu naik/turun" ikut memutuskan)
// + E13 RADAR ANTI-KECOLONGAN IGNISI (kesaksian radar per-menit:
// akumulasi senyap/velocity/sapuan/OI/rotasi venue — dewan vonis
// kini punya MATA pada ledakan intraday yang candle harian buta;
// luka 2026-11-26 03:00: verdict tetap BUNUH_LONG saat harga
// melonjak +37% — kecolongan struktural yang kini ditutup)
// + ketua dewan bersertifikat. Vonis wajib biner: BUY atau SELL.
// ============================================================
import { clamp, sgn } from './indicators';
import { klVonis } from './kompleks';
import type { SumberKesaksian } from './sumber';

export const ARAH_BRAIN_VERSI = '1.12';
const TARGET_DISIPLIN = 2.2;
const STOP_MIN = 1.2;
const STOP_MAX = 2.6;
const STOP_WAIT = 1.8;
const STOP_MARGIN_ATR = 0.8;

type Bukti = { id: string; label: string; vote: 'NAIK' | 'TURUN' | 'NETRAL'; kekuatan: number; bobot: number; cara: string };

function volZmax3Of(cs: { v: number }[], f: { volMean: number; atrSd: number }): number {
  const n = cs.length;
  return Math.max(...cs.slice(Math.max(0, n - 3)).map((c) => (c.v - f.volMean) / Math.max(f.atrSd, 1e-9)));
}

function deteksiKaskadeVoid(cs: import('./indicators').Candle[], f: ReturnType<typeof import('./vision').buildCandleVision> & { atrSd: number }, kl: ReturnType<typeof klVonis>) {
  const n = cs.length;
  const atrV = Math.max(f.atr, 1e-9);
  if (kl.pool.swept) return { aktif: false, arah: 'NAIK' as const, cara: 'pool terpetakan — episode ditangani tracker, bukan void' };
  const last = cs[n - 1];
  const lastBody = (last.c - last.o) / atrV;
  const volZmax3 = volZmax3Of(cs, f);
  const volKlimaks = f.lastVolZ >= 1.4 || volZmax3 >= 1.6;
  const gerakTuaNaik = f.mom30Atr >= 2.5;
  const gerakTuaTurun = f.mom30Atr <= -2.5;
  if (volKlimaks && gerakTuaNaik && lastBody <= -1.5) {
    return { aktif: true, arah: 'TURUN' as const, cara: `V-mulai-VOID: gerak tua naik ${f.mom30Atr.toFixed(1)} ATR tanpa pool terpetakan, lalu lilin keputusan MENGHANTAM balik ${lastBody.toFixed(1)} ATR (klimaks z=${(volZmax3 >= f.lastVolZ ? volZmax3 : f.lastVolZ).toFixed(1)} di 3 candle terakhir) — panen likuidasi selesai, markdown dimulai (AR-L3)` };
  }
  if (volKlimaks && gerakTuaTurun && lastBody >= 1.5) {
    return { aktif: true, arah: 'NAIK' as const, cara: `V-mulai-VOID: gerak tua turun ${f.mom30Atr.toFixed(1)} ATR tanpa pool terpetakan, lalu lilin keputusan MELUNCUR balik ${lastBody.toFixed(1)} ATR (klimaks z=${(volZmax3 >= f.lastVolZ ? volZmax3 : f.lastVolZ).toFixed(1)} di 3 candle terakhir) — panen likuidasi selesai, pemulihan dimulai (AR-L3)` };
  }
  return { aktif: false, arah: 'NAIK' as const, cara: 'tanpa V-mulai-void' };
}

function e1Struktur(cs: import('./indicators').Candle[], f: ReturnType<typeof import('./vision').buildCandleVision>): Bukti {
  let s = 0;
  const cat: string[] = [];
  if (f.hh || f.hl) {
    s += 0.35;
    cat.push(f.hh ? 'higher-high' : 'higher-low');
  }
  if (f.lh || f.ll) {
    s -= 0.35;
    cat.push(f.lh ? 'lower-high' : 'lower-low');
  }
  if (f.recentBreakUp && !f.failedRetest) {
    s += 0.45;
    cat.push(`breakout ${f.breakLevel.toFixed(4)} ditahan retest`);
  }
  if (f.recentBreakDown && !f.failedRetest) {
    s -= 0.45;
    cat.push(`breakdown ${f.breakLevelDn.toFixed(4)} ditolak retest`);
  }
  if (f.failedRetest) {
    s -= sgn(s || 1) * 0.4;
    cat.push('retest GAGAL — struktur menipu');
  }
  s += clamp(f.ema21SlopeAtr, -0.6, 0.6) * 0.8;
  if (f.lowTrend12 >= 0.02) {
    s += 0.3;
    cat.push('low menaik (akumulasi)');
  } else if (f.lowTrend12 <= -0.02) {
    s -= 0.3;
    cat.push('low menurun (distribusi)');
  }
  const vote = s > 0.15 ? 'NAIK' : s < -0.15 ? 'TURUN' : 'NETRAL';
  return {
    id: 'AR-E1', label: 'Struktur Harga', vote,
    kekuatan: clamp(Math.abs(s), 0, 1), bobot: 0.16,
    cara: `struktur: ${cat.length ? cat.join(', ') : 'tidak berarah'}; posisi jendela ${(f.posInWindow60 * 100).toFixed(0)}%; ema21 slope ${f.ema21SlopeAtr.toFixed(2)} ATR`,
  };
}

function e2Likuiditas(kl: ReturnType<typeof klVonis>): Bukti {
  const P = kl.pool.swept ? { side: kl.pool.side, level: kl.pool.level, depth: kl.pool.depthAtr, bars: kl.pool.barsSince, reclaimed: kl.pool.reclaimed } : null;
  if (P && P.side === 'BAWAH') {
    if (!P.reclaimed && P.bars <= 2 && (kl.pd.korbanPump || kl.fitur.mom50Atr <= -3.0)) {
      return { id: 'AR-E2', label: 'Likuiditas', vote: 'TURUN', kekuatan: 0.65, bobot: 0.20, cara: `pool bawah ${P.level.toFixed(4)} disapu ${P.bars} candle lalu TANPA reclaim di konteks pasca-dump ekstrem (${kl.pd.korbanPump ? 'korban pump menumpuk' : `mom50 ${kl.fitur.mom50Atr.toFixed(1)} ATR`}) — likuiditas long habis, grab jadi bahan bakar penjualan (AR-L5)` };
    }
    const k = clamp(0.45 + P.depth / 3, 0, 1) * (P.reclaimed ? 1 : 0.75);
    return { id: 'AR-E2', label: 'Likuiditas', vote: k > 0.3 ? 'NAIK' : 'NETRAL', kekuatan: k, bobot: 0.20, cara: `pool bawah ${P.level.toFixed(4)} disapu ${P.bars} candle lalu sedalam ${P.depth.toFixed(2)} ATR${P.reclaimed ? ' lalu DIRECLAIM — stop penjual dipanen' : ''}; likuiditas sell-side kering -> bakar naik` };
  }
  if (P && P.side === 'ATAS') {
    if (!P.reclaimed && P.bars <= 2 && (kl.pd.korbanPump || kl.fitur.mom50Atr >= 3.0)) {
      return { id: 'AR-E2', label: 'Likuiditas', vote: 'NAIK', kekuatan: 0.65, bobot: 0.20, cara: `pool atas ${P.level.toFixed(4)} disapu ${P.bars} candle lalu TANPA reclaim di konteks pasca-pump-cermin ekstrem — likuiditas short habis, grab jadi bahan bakar pembelian (AR-L5)` };
    }
    const k = clamp(0.45 + P.depth / 3, 0, 1) * (P.reclaimed ? 1 : 0.75);
    return { id: 'AR-E2', label: 'Likuiditas', vote: k > 0.3 ? 'TURUN' : 'NETRAL', kekuatan: k, bobot: 0.20, cara: `pool atas ${P.level.toFixed(4)} disapu ${P.bars} candle lalu sedalam ${P.depth.toFixed(2)} ATR${P.reclaimed ? ' lalu DITOLAK — stop pembeli dipanen' : ''}; likuiditas buy-side kering -> bakar turun` };
  }
  return { id: 'AR-E2', label: 'Likuiditas', vote: 'NETRAL', kekuatan: 0.25, bobot: 0.20, cara: 'tidak ada sapuan segar terpetakan — pool terjaga; magnet likuiditas belum jelas (bukti lemah)' };
}

function e3Volume(cs: import('./indicators').Candle[], f: ReturnType<typeof import('./vision').buildCandleVision> & { atrSd: number; lastVolZ: number }): Bukti {
  const n = cs.length;
  const atrV = Math.max(f.atr, 1e-9);
  let s = clamp(f.volAsym5, -1, 1) * 0.55;
  const cat: string[] = [];
  const kualitas = f.bodyUp6Atr - f.bodyDn6Atr;
  s += clamp(kualitas / 2.5, -0.45, 0.45);
  if (f.volClimax) {
    const last = cs[n - 1];
    const bodyAtr = (last.c - last.o) / atrV;
    if (Math.abs(bodyAtr) >= 1.2) {
      s += sgn(bodyAtr) * 0.5;
      cat.push(`klimaks z=${f.lastVolZ.toFixed(1)} dgn badan monster ${bodyAtr.toFixed(1)} ATR -> awal gerak ${bodyAtr > 0 ? 'naik' : 'turun'}`);
    } else {
      const naik = last.c >= last.o;
      const geri = f.mom30Atr >= 0 ? -1 : 1;
      const vv = naik ? geri * 0.4 : -geri * 0.4;
      s += vv;
      cat.push(`klimaks volume z=${f.lastVolZ.toFixed(1)} lilin ${naik ? 'hijau' : 'merah'} -> ${vv > 0 ? 'penyerapan' : 'distribusi'} klimaks`);
    }
  }
  if (f.volZmidMax >= 1.5) {
    s += sgn(f.mom12Atr) * 0.2;
    cat.push(`jejak dorongan tengah z=${f.volZmidMax.toFixed(1)}`);
  }
  const vote = s > 0.18 ? 'NAIK' : s < -0.18 ? 'TURUN' : 'NETRAL';
  return { id: 'AR-E3', label: 'Volume', vote, kekuatan: clamp(Math.abs(s), 0, 1), bobot: 0.13, cara: `volume: asimetri5 ${f.volAsym5.toFixed(2)}; kualitas badan naik ${f.bodyUp6Atr.toFixed(2)} vs turun ${f.bodyDn6Atr.toFixed(2)} ATR; volZ ${f.lastVolZ.toFixed(1)}${cat.length ? '; ' + cat.join(', ') : ''}` };
}

function e4Momentum(f: ReturnType<typeof import('./vision').buildCandleVision>): Bukti {
  const s = clamp(f.mom12Atr / 2, -1, 1) * 0.55 + clamp(f.mom3Atr / 1.5, -1, 1) * 0.35 + clamp(f.mom50Atr / 4, -1, 1) * 0.10;
  const vote = s > 0.15 ? 'NAIK' : s < -0.15 ? 'TURUN' : 'NETRAL';
  return { id: 'AR-E4', label: 'Momentum', vote, kekuatan: clamp(Math.abs(s), 0, 1), bobot: 0.12, cara: `momentum: mom3 ${f.mom3Atr.toFixed(2)} · mom12 ${f.mom12Atr.toFixed(2)} · mom50 ${f.mom50Atr.toFixed(2)} ATR (impuls ${f.mom12Atr >= 0 ? 'naik' : 'turun'})` };
}

function e5Volatilitas(cs: import('./indicators').Candle[], f: ReturnType<typeof import('./vision').buildCandleVision>): Bukti {
  void cs;
  if (f.squeeze) {
    const vote = f.mom3Atr >= 0 ? 'NAIK' : 'TURUN';
    return { id: 'AR-E5', label: 'Volatilitas', vote, kekuatan: 0.35, bobot: 0.07, cara: `kompresi volatilitas (BB sempit) — ledakan menunggu arah; impuls sesaat condong ${vote.toLowerCase()}` };
  }
  if (f.rangeAtr >= 1.8 && Math.abs(f.mom30Atr) >= 2.0) {
    const vote = f.mom30Atr >= 0 ? 'TURUN' : 'NAIK';
    return { id: 'AR-E5', label: 'Volatilitas', vote, kekuatan: 0.4, bobot: 0.07, cara: `ekspansi klimaks di ujun gerak ${f.mom30Atr >= 0 ? 'naik' : 'turun'} ${Math.abs(f.mom30Atr).toFixed(1)} ATR — bahan bakar menipis, risiko pembalikan` };
  }
  return { id: 'AR-E5', label: 'Volatilitas', vote: 'NETRAL', kekuatan: 0.15, bobot: 0.07, cara: `volatilitas normal (range ${f.rangeAtr.toFixed(2)} ATR, ATR% ${(f.atrPct * 100).toFixed(2)}) — tanpa sinyal bahan bakar` };
}

function e6SentiangResistensi(f: ReturnType<typeof import('./vision').buildCandleVision>): Bukti {
  const price = f.price;
  const res = Math.min(f.rangeHigh, f.recentBreakUp ? f.breakLevel : Infinity);
  const sup = Math.max(f.rangeLow, f.recentBreakDown ? f.breakLevelDn : -Infinity);
  const dRes = (res - price) / Math.max(f.atr, 1e-9);
  const dSup = (price - sup) / Math.max(f.atr, 1e-9);
  let vote: Bukti['vote'] = 'NETRAL';
  let kek = 0.2;
  let cara = `S/R: resistance ${isFinite(res) ? res.toFixed(4) : '—'} (${dRes.toFixed(1)} ATR), support ${isFinite(sup) ? sup.toFixed(4) : '—'} (${dSup.toFixed(1)} ATR)`;
  if (dRes >= 1.2 && dSup <= 0.8) {
    vote = 'NAIK';
    kek = 0.45;
    cara += ' — menempel support, ruang ke atas terbuka';
  } else if (dSup >= 1.2 && dRes <= 0.8) {
    vote = 'TURUN';
    kek = 0.45;
    cara += ' — menempel resistance, ruang ke bawah terbuka';
  } else if (f.posInRange <= 0.25 && dRes >= 1.0) {
    vote = 'NAIK';
    kek = 0.3;
    cara += ' — posisi rendah band, jarak ke puncak cukup';
  } else if (f.posInRange >= 0.75 && dSup >= 1.0) {
    vote = 'TURUN';
    kek = 0.3;
    cara += ' — posisi tinggi band, jarak ke dasar cukup';
  }
  return { id: 'AR-E6', label: 'Support/Resistance', vote, kekuatan: kek, bobot: 0.08, cara };
}

function e7Tekanan(cs: import('./indicators').Candle[], f: ReturnType<typeof import('./vision').buildCandleVision>): Bukti {
  const n = cs.length;
  const atrV = Math.max(f.atr, 1e-9);
  let s = clamp(f.bodyRatio3Atr / 1.2, -0.5, 0.5);
  let uw = 0;
  let lw = 0;
  for (let k = Math.max(1, n - 5); k < n; k++) {
    const c = cs[k];
    uw += c.h - Math.max(c.o, c.c);
    lw += Math.min(c.o, c.c) - c.l;
  }
  s += clamp((lw - uw) / (2.2 * atrV), -0.35, 0.35);
  if (f.bullEngulf) s += 0.25;
  if (f.bearEngulf) s -= 0.25;
  const last = cs[n - 1];
  const posClose = (last.c - last.l) / Math.max(last.h - last.l, 1e-9);
  s += (posClose - 0.5) * 0.4;
  const vote = s > 0.18 ? 'NAIK' : s < -0.18 ? 'TURUN' : 'NETRAL';
  return { id: 'AR-E7', label: 'Tekanan Beli-Jual', vote, kekuatan: clamp(Math.abs(s), 0, 1), bobot: 0.12, cara: `tekanan: netto badan3 ${f.bodyRatio3Atr.toFixed(2)} ATR; wick bawah ${(lw / atrV).toFixed(1)} vs atas ${(uw / atrV).toFixed(1)} ATR (5 candle); close di ${(posClose * 100).toFixed(0)}% range lilin${f.bullEngulf ? '; bull engulf' : ''}${f.bearEngulf ? '; bear engulf' : ''}` };
}

function e8PerubahanKondisi(kl: ReturnType<typeof klVonis>, f: ReturnType<typeof import('./vision').buildCandleVision> & { lastVolZ: number }, kv: ReturnType<typeof deteksiKaskadeVoid>): Bukti {
  if (kv.aktif) {
    return { id: 'AR-E8', label: 'Perubahan Kondisi', vote: kv.arah === 'NAIK' ? 'NAIK' : 'TURUN', kekuatan: 0.9, bobot: 0.12, cara: kv.cara };
  }
  if (kl.grab.terjadi && kl.grab.post === 'REVERSAL') {
    const arah = kl.arah === 'NAIK' ? 'NAIK' : 'TURUN';
    return { id: 'AR-E8', label: 'Perubahan Kondisi', vote: arah, kekuatan: 0.85, bobot: 0.12, cara: `FASA BERUBAH: panen likuiditas selesai — ${kl.grab.cara}; kondisi bergeser ke pemulihan ${arah.toLowerCase()}` };
  }
  if (kl.pd.korbanPump) {
    const arah = kl.pd.pumpArah === 'NAIK' ? 'TURUN' : 'NAIK';
    return { id: 'AR-E8', label: 'Perubahan Kondisi', vote: arah, kekuatan: 0.55, bobot: 0.12, cara: `pasca-${kl.pd.pumpArah === 'NAIK' ? 'pump-dump' : 'dump-pump'}: korban pump kini stop-loss cluster — kontinju tekanan ${arah === 'NAIK' ? 'beli' : 'jual'}` };
  }
  if (f.consecDownBig >= 3 && f.lastVolZ >= 1.2) {
    return { id: 'AR-E8', label: 'Perubahan Kondisi', vote: 'NAIK', kekuatan: 0.6, bobot: 0.12, cara: `kaskade ${f.consecDownBig} merah besar + klimaks z=${f.lastVolZ.toFixed(1)} — mesin likuidasi kehabisan bahan bakar, kondisi bergeser` };
  }
  if (f.consecUpBig >= 3 && f.lastVolZ >= 1.2) {
    return { id: 'AR-E8', label: 'Perubahan Kondisi', vote: 'TURUN', kekuatan: 0.6, bobot: 0.12, cara: `squeeza ${f.consecUpBig} hijau besar + klimaks z=${f.lastVolZ.toFixed(1)} — likuidasi short selesai, kondisi bergeser` };
  }
  return { id: 'AR-E8', label: 'Perubahan Kondisi', vote: 'NETRAL', kekuatan: 0.2, bobot: 0.12, cara: 'kondisi pasar berlanjut tanpa transisi fase yang terbaca' };
}

// E9 — MATRIKS SUMBER HIDUP: kesaksian lintas sumber (tren venue,
// overhang unlock, tekanan beli on-chain, kedalaman kolam, jangkar
// venue eksekusi) diagregasi jadi SATU bukti dewan. Sumber melawan
// harga → kekuatan besar; sumber netral → suara tipis.
function e9SumberMatriks(ks: SumberKesaksian[]): Bukti {
  const naik = ks.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
  const turun = ks.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
  const net = naik - turun;
  const vote = net > 4 ? 'NAIK' : net < -4 ? 'TURUN' : 'NETRAL';
  const kekuatan = clamp(Math.abs(net) / 24, 0, 0.75);
  return {
    id: 'AR-E9', label: 'Matriks Sumber', vote, kekuatan, bobot: 0.08,
    cara: `matriks sumber hidup bersuara (${ks.length} sumber): ${ks.map((k) => `${k.dari}=${k.vote}(${k.kekuatan})`).join(' · ')} — netto ${net > 0 ? '+' : ''}${Math.round(net * 10) / 10}; sumber ikut memutuskan (dipakai, bukan pajangan)`,
  };
}

// E10 — RADAR PAUS HIDUP: kesaksian neuron paus (penempatan bersih
// NET, pola hedged/serangan/akumulasi POLA, duel paus-vs-paus DUEL)
// diagregasi jadi SATU bukti dewan. Ini asupan vitamin keluhan
// pemilik: "radar paus tak boleh mayat — harusnya jadi pemicu
// kecerdasan". Kapital paus yang ditempatkan nyata → suara nyata.
function e10PausRadar(ks: SumberKesaksian[]): Bukti {
  const naik = ks.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
  const turun = ks.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
  const net = naik - turun;
  const vote = net > 0.35 ? 'NAIK' : net < -0.35 ? 'TURUN' : 'NETRAL';
  const kekuatan = clamp(Math.abs(net) / 1.6, 0, 0.8);
  return {
    id: 'AR-E10', label: 'Radar Paus', vote, kekuatan, bobot: 0.10,
    cara: `radar paus hidup bersuara (${ks.length} kesaksian): ${ks.map((k) => `${k.dari.replace('RADAR-PAUS:', '')}=${k.vote}(${Math.round(k.kekuatan * 100) / 100})`).join(' · ')} — netto ${net >= 0 ? '+' : ''}${Math.round(net * 100) / 100}; kapital paus nyata ikut memutuskan (dipakai, bukan mayat)`,
  };
}

// E11 — JIWA OTAK MODAL: kesaksian keyakinan terbuka dari pondasi modal
// (vonis jebakan/pump + magnet portal waktu — semuanya punya rekam jejak
// akurasi dan bisa dibuktikan salah). Keluhan pemilik: "fundamen modal gak
// ada ruh, gak ada neuron, bodoh karena gak ada otak" — kini modal duduk
// di kursi ke-11 dewan, membawa keyakinan yang bisa DINILAI kebenarannya.
function e11ModalOtak(ks: SumberKesaksian[]): Bukti {
  const naik = ks.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
  const turun = ks.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
  const net = naik - turun;
  const vote = net > 0.3 ? 'NAIK' : net < -0.3 ? 'TURUN' : 'NETRAL';
  const kekuatan = clamp(Math.abs(net) / 1.5, 0, 0.8);
  return {
    id: 'AR-E11', label: 'Otak Modal', vote, kekuatan, bobot: 0.09,
    cara: `pondasi modal bersuara (${ks.length} kesaksian): ${ks.map((k) => `${k.dari.replace('OTAK-MODAL:', '')}=${k.vote}(${Math.round(k.kekuatan * 100) / 100})`).join(' · ')} — netto ${net >= 0 ? '+' : ''}${Math.round(net * 100) / 100}; keyakinan modal punya rekam jejak akurasi & bisa dibuktikan salah (dipakai, bukan mayat)`,
  };
}

// E12 — OTAK LINTASAN: kesaksian prediksi URUTAN magnet (mana yang
// DITARIK dulu — formula tarikan lintas dua sisi) dan POLA lintasan
// (sapu-naik-lalu-antuk / sisir-berantai / sapu-turun-rebound /
// jatuh-berantai / gantung-dua-sisi) dengan rekam jejak akurasi per
// pola. Keluhan pemilik: "masih bertanya 'hmm naik turun ya' — kita
// masih bayi; paham itu bisa membaca SUATU POLA". Kini prediksi
// urutan + bentuk lintasan duduk di kursi ke-12 dan bisa dibuktikan
// salah oleh candle 1j.
function e12Lintasan(ks: SumberKesaksian[]): Bukti {
  const naik = ks.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
  const turun = ks.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
  const net = naik - turun;
  const vote = net > 0.3 ? 'NAIK' : net < -0.3 ? 'TURUN' : 'NETRAL';
  const kekuatan = clamp(Math.abs(net) / 1.5, 0, 0.8);
  return {
    id: 'AR-E12', label: 'Otak Lintasan', vote, kekuatan, bobot: 0.09,
    cara: `otak lintasan bersuara (${ks.length} kesaksian): ${ks.map((k) => `${k.dari.replace('OTAK-LINTASAN:', '')}=${k.vote}(${Math.round(k.kekuatan * 100) / 100})`).join(' · ')} — netto ${net >= 0 ? '+' : ''}${Math.round(net * 100) / 100}; prediksi urutan magnet + pola lintasan punya rekam jejak pola & bisa dibuktikan salah (membaca pola, bukan bertanya naik-turun)`,
  };
}

// E13 — RADAR ANTI-KECOLONGAN (IGNISI): kesaksian radar per-menit.
// Luka struktural 2026-11-26 03:00: verdict dihitung dari candle harian
// sehingga ledakan +37% yang lahir-tuntas dalam satu jam TAK PERNAH
// terlihat dewan — BUNUH_LONG tetap berdiri, dompet SHORT di puncak.
// Radar ignisi kini duduk di kursi ke-13: saat pasar MERANGKAK/MENYALA/
// PARABOLIK, suaranya berat (sampai 0.95) dan mampu MEMBALIK arah
// dewan sebelum luka berulang.
function e13Ignisi(ks: SumberKesaksian[]): Bukti {
  const naik = ks.filter((k) => k.vote === 'NAIK').reduce((s, k) => s + k.kekuatan, 0);
  const turun = ks.filter((k) => k.vote === 'TURUN').reduce((s, k) => s + k.kekuatan, 0);
  const net = naik - turun;
  const vote = net > 0.25 ? 'NAIK' : net < -0.25 ? 'TURUN' : 'NETRAL';
  const kekuatan = clamp(Math.abs(net), 0, 0.95);
  return {
    id: 'AR-E13', label: 'Radar Ignisi', vote, kekuatan, bobot: 0.16,
    cara: `radar anti-kecolongan bersuara (${ks.length} kesaksian): ${ks.map((k) => `${k.dari}=${k.vote}(${Math.round(k.kekuatan * 100) / 100})`).join(' · ')} — netto ${net >= 0 ? '+' : ''}${Math.round(net * 100) / 100}; data per-menit (akumulasi senyap · velocity · sapuan taker · OI · rotasi venue) menutup kecolongan candle harian — ledakan intraday kini MASUK dewan sebelum pedang diangkat`,
  };
}

function eksekusiStop(kl: ReturnType<typeof klVonis>, arah: 'NAIK' | 'TURUN', entry: number, atrV: number) {
  const P = kl.pool;
  if (P.swept && P.depthAtr >= 0.4) {
    const extreme = P.side === 'BAWAH' ? P.level - P.depthAtr * atrV : P.level + P.depthAtr * atrV;
    const stopPrice = arah === 'NAIK' ? extreme - STOP_MARGIN_ATR * atrV : extreme + STOP_MARGIN_ATR * atrV;
    const pct = arah === 'NAIK' ? ((entry - stopPrice) / entry) * 100 : ((stopPrice - entry) / entry) * 100;
    return { stopPct: clamp(pct, STOP_MIN, STOP_MAX), sumber: `stop struktural ${STOP_MARGIN_ATR} ATR di balik ekstrem sapuan (AR-L2)` };
  }
  return { stopPct: 2.0, sumber: 'stop default 2.0% (tanpa pool terpetakan)' };
}

export type ArahResult = ReturnType<typeof arahVonis>;

export function arahVonis(cs: import('./indicators').Candle[], versi = ARAH_BRAIN_VERSI, sumberVoto?: SumberKesaksian[], pausVoto?: SumberKesaksian[], modalVoto?: SumberKesaksian[], lintasanVoto?: SumberKesaksian[], ignisiVoto?: SumberKesaksian[]) {
  const kl = klVonis(cs);
  const f = kl.fitur;
  const n = cs.length;
  const atrV = Math.max(f.atr, 1e-9);
  const entry = cs[n - 1].c;
  const kv = deteksiKaskadeVoid(cs, f, kl);
  const bukti: Bukti[] = [
    e2Likuiditas(kl), e1Struktur(cs, f), e3Volume(cs, f), e7Tekanan(cs, f),
    e4Momentum(f), e8PerubahanKondisi(kl, f, kv), e6SentiangResistensi(f), e5Volatilitas(cs, f),
  ];
  // E9 — sumber hidup ikut duduk di dewan (hanya saat dipanggil dengan kesaksian;
  // ujian mundur/riwayat sengaja murni candle — anti bocor data masa depan)
  if (sumberVoto && sumberVoto.length) bukti.push(e9SumberMatriks(sumberVoto));
  // E10 — radar paus hidup ikut duduk di dewan (kesaksian neuron paus;
  // ujian/riwayat tetap murni candle — anti bocor data masa depan)
  if (pausVoto && pausVoto.length) bukti.push(e10PausRadar(pausVoto));
  // E11 — jiwa otak modal ikut duduk di dewan (keyakinan terbuka vonis+magnet
  // portal dengan rekam jejak akurasi; ujian/riwayat tetap murni candle)
  if (modalVoto && modalVoto.length) bukti.push(e11ModalOtak(modalVoto));
  // E12 — otak lintasan ikut duduk di dewan (prediksi urutan magnet & pola
  // lintasan dengan rekam jejak; ujian/riwayat tetap murni candle)
  if (lintasanVoto && lintasanVoto.length) bukti.push(e12Lintasan(lintasanVoto));
  // E13 — radar ignisi hidup ikut duduk di dewan (kesaksian per-menit;
  // ujian/riwayat tetap murni candle — anti bocor data masa depan)
  if (ignisiVoto && ignisiVoto.length) bukti.push(e13Ignisi(ignisiVoto));
  let skor = 0;
  let bobotNaik = 0;
  let bobotTurun = 0;
  for (const b of bukti) {
    const w = sgn(b.vote === 'NAIK' ? 1 : b.vote === 'TURUN' ? -1 : 0) * b.kekuatan * b.bobot;
    skor += w;
    if (b.vote === 'NAIK') bobotNaik += b.kekuatan * b.bobot;
    if (b.vote === 'TURUN') bobotTurun += b.kekuatan * b.bobot;
  }
  const skorArah = clamp(skor * 100, -100, 100);
  const konsensus = (() => {
    const tot = bobotNaik + bobotTurun;
    return tot <= 0 ? 0.5 : Math.max(bobotNaik, bobotTurun) / tot;
  })();
  let arah: 'NAIK' | 'TURUN';
  let kepastian: number;
  let lapisan: string;
  let umpanFlip = false;
  let tundaTrigger = false;
  const volZmax3 = volZmax3Of(cs, f);
  const setuju = kl.aksi !== 'SKIP' && (kl.arah === 'NAIK') === skorArah >= 0;
  // AR-L9 IGNISI-OVERRIDE — hukum anti-kecolongan (luka 2026-11-26 03:00):
  // radar per-menit MENYALA/PARABOLIK searah NAIK/TURUN dengan suara ≥ 0,6
  // tapi ketua episode harian memilih arah LAWAN → ketua DILARANG mengangkat
  // pedang melawan ledakan hidup: arah dibalik, lapisan ditandai AR-L9.
  // (ujian/riwayat tanpa ignisiVoto — jalur ini tak pernah menyala di ujian,
  // jadi 100-soal tetap murni candle; di hidup, radar memegang veto.)
  const ignNet = ignisiVoto && ignisiVoto.length
    ? ignisiVoto.reduce((s, k) => s + (k.vote === 'NAIK' ? k.kekuatan : k.vote === 'TURUN' ? -k.kekuatan : 0), 0)
    : 0;
  const ignVetoAktif = Math.abs(ignNet) >= 0.6;
  if (kl.aksi === 'ENTRY') {
    arah = kl.arah;
    lapisan = `KETUA-EPISODE(${kl.pelajaranAktif.join('+') || 'core'})`;
    kepastian = 84 + (setuju ? clamp(konsensus - 0.5, 0, 0.5) * 24 : -8);
    if (ignVetoAktif && ((ignNet > 0 && arah === 'TURUN') || (ignNet < 0 && arah === 'NAIK'))) {
      arah = ignNet > 0 ? 'NAIK' : 'TURUN';
      lapisan = `KETUA-IGNISI-OVERRIDE(AR-L9) dari ${lapisan}`;
      kepastian = 68;
      umpanFlip = true;
    }
    if (kl.gauntlet.twoSisi && kl.pool.barsSince === 1 && kl.pool.depthAtr <= 1.0 && f.lastVolZ <= -0.8 && volZmax3 <= 1.2) {
      tundaTrigger = true;
      lapisan += '+AR-L7-TUNDA';
    }
  } else if (kl.aksi === 'WAIT') {
    arah = kl.arah;
    lapisan = 'KETUA-TRIGGER';
    kepastian = 70 + (setuju ? clamp(konsensus - 0.5, 0, 0.5) * 16 : -6);
    const pool = kl.pool;
    const closeDistPool = pool.side === 'BAWAH' ? (entry - pool.level) / atrV : (pool.level - entry) / atrV;
    const konteksBear = f.mom50Atr <= -3.0 && (f.distEma21Atr <= -1.5 || kl.pd.korbanPump);
    const konteksBull = f.mom50Atr >= 3.0 && (f.distEma21Atr >= 1.5 || kl.pd.korbanPump);
    if (!pool.reclaimed && pool.barsSince <= 2 && Math.abs(closeDistPool) <= 0.6 && konteksBear && arah === 'NAIK') {
      arah = 'TURUN';
      lapisan = 'KETUA-UMPAN-RECLAIM(AR-L4)';
      kepastian = 66;
      umpanFlip = true;
    } else if (!pool.reclaimed && pool.barsSince <= 2 && Math.abs(closeDistPool) <= 0.6 && konteksBull && arah === 'TURUN') {
      arah = 'NAIK';
      lapisan = 'KETUA-UMPAN-REJECT(AR-L4)';
      kepastian = 66;
      umpanFlip = true;
    }
    const mom12SudahNaik = (f.mom12Atr >= 0.3 || f.mom3Atr >= 1.5) && f.distEma21Atr >= -0.5;
    const mom12SudahTurun = (f.mom12Atr <= -0.3 || f.mom3Atr <= -1.5) && f.distEma21Atr <= 0.5;
    if (!pool.reclaimed && pool.barsSince <= 2 && kl.pd.korbanPump && f.mom50Atr <= -3.0 && arah === 'TURUN' && mom12SudahNaik) {
      arah = 'NAIK';
      lapisan = 'KETUA-V-RECLAIM(AR-L6)';
      kepastian = 66;
      umpanFlip = true;
    } else if (!pool.reclaimed && pool.barsSince <= 2 && kl.pd.korbanPump && f.mom50Atr >= 3.0 && arah === 'NAIK' && mom12SudahTurun) {
      arah = 'TURUN';
      lapisan = 'KETUA-V-REJECT(AR-L6)';
      kepastian = 66;
      umpanFlip = true;
    }
  } else {
    arah = skorArah >= 0 ? 'NAIK' : 'TURUN';
    lapisan = 'KETUA-DEWAN-PENUH';
    kepastian = 55 + Math.abs(skorArah) * 0.28;
    if (kv.aktif) {
      arah = kv.arah === 'NAIK' ? 'NAIK' : 'TURUN';
      lapisan = 'KETUA-KASKADE-VOID(AR-L3)';
      kepastian = 64 + konsensus * 8;
    }
  }
  // VETO UNIVERSAL AR-L9 — di SEMUA lapisan ketua (ENTRY/WAIT/DEWAN-PENUH):
  // radar ignisi menyala (|suara| ≥ 0,6) → pedang melawan ledakan hidup
  // DILARANG dibangkitkan; ini yang gagal terjadi 03:00 (BUNUH_LONG saat
  // harga melonjak +37%) — kecolongan struktural kini ditutup dua arah.
  if (ignVetoAktif && ((ignNet > 0 && arah === 'TURUN') || (ignNet < 0 && arah === 'NAIK'))) {
    arah = ignNet > 0 ? 'NAIK' : 'TURUN';
    lapisan += '+AR-L9-VETO-IGNISI';
    kepastian = Math.max(kepastian, 66);
    umpanFlip = true;
  }
  kepastian = Math.round(clamp(kepastian, 5, 97));
  const vonis = arah === 'NAIK' ? 'BUY' : 'SELL';
  const st = eksekusiStop(kl, arah, entry, atrV);
  const trigLvl = Math.max(kl.pool.level + 0.8 * atrV, entry + 0.25 * atrV);
  const eksekusi = umpanFlip
    ? { aksi: 'ENTRY' as const, targetPct: TARGET_DISIPLIN, stopPct: clamp(st.stopPct, 1.8, STOP_MAX), sumber: `${st.sumber} + tebal utk umpan-flip (AR-L4/L6)` }
    : tundaTrigger
      ? { aksi: 'WAIT' as const, targetPct: TARGET_DISIPLIN, stopPct: STOP_WAIT, triggerLevel: trigLvl, sumber: 'order menunggu reclaim bervolume (AR-L7: pantulan kering rapuh)' }
      : kl.aksi === 'WAIT' && kl.triggerLevel
        ? { aksi: 'WAIT' as const, targetPct: TARGET_DISIPLIN, stopPct: STOP_WAIT, triggerLevel: kl.triggerLevel, sumber: 'order menunggu di level konfirmasi tracker (AR-L1)' }
        : { aksi: 'ENTRY' as const, targetPct: TARGET_DISIPLIN, stopPct: st.stopPct, sumber: st.sumber };
  const searah = bukti
    .filter((b) => (arah === 'NAIK' ? b.vote === 'NAIK' : b.vote === 'TURUN'))
    .sort((a, b) => b.kekuatan * b.bobot - a.kekuatan * a.bobot)
    .slice(0, 3)
    .map((b) => `${b.id} ${b.label}: ${b.cara}`);
  const alasan = [
    `VONIS ${vonis} (kepastian ${kepastian}%, konsensus dewan ${(konsensus * 100).toFixed(0)}%) — ${lapisan}`,
    ...searah,
    `jejak 5 aspek: bullTrap=${kl.aspek5.bullTrap ? 'YA' : 'n'} bearTrap=${kl.aspek5.bearTrap ? 'YA' : 'n'} pumpDump=${kl.aspek5.pumpDump ? 'YA' : 'n'} falseBreakout=${kl.aspek5.falseBreakout ? 'YA' : 'n'} stopHunt=${kl.aspek5.stopHunt ? 'YA' : 'n'}`,
    kl.aspek5.rangkaianUtuh ? `rangkaian: ${kl.aspek5.rangkaianUtuh}` : 'rangkaian belum utuh',
  ];
  return {
    versi, vonis, arah, kepastian, skorArah, bukti, buktiKunci: searah, eksekusi, lapisan, konsensus, alasan,
    kl: { aksi: kl.aksi, arah: kl.arah, pelajaran: kl.pelajaranAktif, aspek5: kl.aspek5, poolLevel: kl.pool.level, poolSide: kl.pool.side, poolSwept: kl.pool.swept, alasan: kl.alasan, grab: kl.grab, pd: kl.pd, gauntlet: kl.gauntlet },
  };
}
