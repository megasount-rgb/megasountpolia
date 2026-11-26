// ============================================================
// MICAPROFITA-ELSA · SAKTI-KOMPLEKS — otak ujian kompleks 5 aspek
// (port setia dari src/lib/exam/kompleks-brain.ts situs sumber).
// Mengenali lima aspek sekaligus: stop hunt, false breakout,
// pump & dump, bear trap, bull trap — lalu memilih ENTRY / WAIT /
// SKIP + stop wajib.
// ============================================================
import { Candle, mean, stdev } from './indicators';
import { buildSgVision, Pool, SgVision } from './vision';

export const KL_BRAIN_VERSI = '1.2';
const TARGET_DISIPLIN = 2.2;
const STOP_MIN = 1.2;
const STOP_MAX = 2.6;
const STOP_WAIT = 1.8;

export type Aspek5 = {
  stopHunt: boolean;
  falseBreakout: boolean;
  pumpDump: boolean;
  bearTrap: boolean;
  bullTrap: boolean;
  rangkaianUtuh: string;
};

export type KlResult = {
  versi: string;
  score: number;
  aksi: 'ENTRY' | 'WAIT' | 'SKIP';
  arah: 'NAIK' | 'TURUN';
  targetPct: number;
  stopPct: number;
  triggerLevel?: number;
  pool: { jenis: string; side: string; level: number; sentuhan: number; swept: boolean; reclaimed: boolean; depthAtr: number; barsSince: number };
  grab: { terjadi: boolean; post: string; cara: string };
  gauntlet: { bullTrap: boolean; bearTrap: boolean; twoSisi: boolean; cara: string; deceitCount: number; deceitCara: string };
  pd: { pump: boolean; pumpArah: string; pumpCara: string; dump: boolean; dumpCara: string; falseBreakout: boolean; fboLevel: number; fboCara: string; fallFromPuncakAtr: number; korbanPump: boolean };
  aspek5: Aspek5;
  pelajaranAktif: string[];
  alasan: string[];
  fitur: SgVision;
};

function klPdScan(cs: Candle[], v: SgVision) {
  const n = cs.length;
  const atrV = Math.max(v.atr, 1e-9);
  const f0 = Math.min(24, Math.max(0, n - 36));
  const f1 = Math.min(40, n - 14);
  const midHi = Math.max(...cs.slice(f0, f1).map((c) => c.h));
  const midLo = Math.min(...cs.slice(f0, f1).map((c) => c.l));
  const midMove = (midHi - midLo) / atrV;
  const anchor = cs[Math.max(0, f0 - 1)].c;
  const moveUpAtr = (midHi - anchor) / atrV;
  const moveDnAtr = (anchor - midLo) / atrV;
  const pumpArah = moveUpAtr >= 1.2 && moveUpAtr > moveDnAtr ? 'NAIK' : moveDnAtr >= 1.2 && moveDnAtr > moveUpAtr ? 'TURUN' : 'TIDAK-JELAS';
  const volPeak = Math.max(...cs.slice(f0, f1).map((c) => c.v));
  const volSd = Math.max(stdev(cs.map((c) => c.v).slice(Math.max(0, n - 30))), 1e-9);
  const volPeakZ = (volPeak - v.volMean) / volSd;
  const pump = midMove >= 2.2 && pumpArah !== 'TIDAK-JELAS' && volPeakZ >= 0.8;
  const lastC = cs[n - 1].c;
  const fallFromPuncakAtr = (midHi - lastC) / atrV;
  const riseDariDasarAtr = (lastC - midLo) / atrV;
  const dump = pump && (pumpArah === 'NAIK' ? fallFromPuncakAtr >= 1.2 : riseDariDasarAtr >= 1.2);
  const strukEnd = Math.max(6, n - 31);
  const strukStart = Math.max(0, n - 58);
  const struk = cs.slice(strukStart, strukEnd);
  const fboHi = struk.length ? Math.max(...struk.map((c) => c.h)) : 0;
  const fboLo = struk.length ? Math.min(...struk.map((c) => c.l)) : 0;
  let falseBreakout = false;
  let fboCara = '';
  let fboLvl = 0;
  const sisi: [number, boolean][] = pumpArah === 'NAIK' ? [[fboHi, true]] : pumpArah === 'TURUN' ? [[fboLo, false]] : [[fboHi, true], [fboLo, false]];
  for (const [lvl, up] of sisi) {
    if (lvl <= 0) continue;
    for (let i = Math.max(1, strukEnd); i < n - 1; i++) {
      const tembus = up ? cs[i].h > lvl + 0.05 * atrV : cs[i].l < lvl - 0.05 * atrV;
      if (!tembus) continue;
      for (let j = i + 1; j < Math.min(n, i + 4); j++) {
        const cabut = up ? cs[j].c < lvl - 0.15 * atrV : cs[j].c > lvl + 0.15 * atrV;
        if (cabut) {
          falseBreakout = true;
          fboLvl = lvl;
          fboCara = `${up ? 'puncak' : 'dasar'} struktural ${lvl.toFixed(4)} ${up ? 'ditembus ke atas (candle ' : 'ditembus ke bawah (candle '}${i + 1}) lalu DITUTUP BALIK (candle ${j + 1}) — pembeli/penjual breakout ditampung di luar`;
          break;
        }
      }
      if (falseBreakout) break;
    }
    if (falseBreakout) break;
  }
  const korbanPump = pump && midMove >= 3.5 && (pumpArah === 'NAIK' ? fallFromPuncakAtr >= 2.0 : riseDariDasarAtr >= 2.0);
  return {
    pump, pumpArah,
    pumpCara: pump ? `jejak pump terbaca: rentang tengah jendela ${midMove.toFixed(1)} ATR arah ${pumpArah} dengan volume puncak z=${volPeakZ.toFixed(1)} — markup impuls, bukan gerak organik` : 'tanpa jejak pump impuls di tengah jendela',
    dump,
    dumpCara: dump ? (pumpArah === 'NAIK' ? `markdown pasca-pump: harga ${fallFromPuncakAtr.toFixed(1)} ATR di bawah puncak pump ${midHi.toFixed(4)} — korban pump kini stop-loss cluster` : `rally pasca-pump-cermin: harga ${riseDariDasarAtr.toFixed(1)} ATR di atas dasar pump ${midLo.toFixed(4)} — korban short pump kini stop-loss cluster`) : 'tanpa markdown pasca-pump',
    falseBreakout, fboLevel: fboLvl, fboCara: falseBreakout ? fboCara : 'tanpa false breakout terbaca pada episode terbaru',
    fallFromPuncakAtr, korbanPump,
  };
}

function trapScan(cs: Candle[], v: SgVision) {
  const n = cs.length;
  const atrV = Math.max(v.atr, 1e-9);
  const win = cs.slice(Math.max(0, n - 34));
  let bullTrap = false;
  let bearTrap = false;
  const catatan: string[] = [];
  for (const p of v.pools) {
    const margin = 0.15 * atrV;
    if (p.side === 'ATAS') {
      let pierce = -1;
      for (let i = 0; i < win.length - 1; i++) {
        if (win[i].h > p.level + margin) {
          pierce = i;
          break;
        }
      }
      if (pierce >= 0) {
        for (let j = pierce + 1; j < win.length; j++) {
          if (win[j].c < p.level - 0.1 * atrV) {
            bullTrap = true;
            catatan.push(`bull trap: tembus ${p.level.toFixed(4)} (pool ${p.jenis}) lalu ditutup balik di bawahnya`);
            break;
          }
        }
      }
    } else if (p.side === 'BAWAH') {
      let pierce = -1;
      for (let i = 0; i < win.length - 1; i++) {
        if (win[i].l < p.level - margin) {
          pierce = i;
          break;
        }
      }
      if (pierce >= 0) {
        for (let j = pierce + 1; j < win.length; j++) {
          if (win[j].c > p.level + 0.1 * atrV) {
            bearTrap = true;
            catatan.push(`bear trap: tembus ${p.level.toFixed(4)} (pool ${p.jenis}) lalu dipulihkan ke atasnya`);
            break;
          }
        }
      }
    }
  }
  let deceitCount = 0;
  const dWin = cs.slice(Math.max(0, n - 34));
  for (let i = 1; i < dWin.length; i++) {
    const c = dWin[i];
    const rangeV = Math.max(c.h - c.l, 1e-9);
    const body = Math.abs(c.c - c.o);
    const uw = c.h - Math.max(c.o, c.c);
    const lw = Math.min(c.o, c.c) - c.l;
    if (rangeV >= 0.5 * atrV && body <= 0.18 * atrV) deceitCount++;
    else if (uw >= 0.5 * atrV && uw >= 2.2 * body) deceitCount++;
    else if (lw >= 0.5 * atrV && lw >= 2.2 * body) deceitCount++;
    const p = dWin[i - 1];
    const pBody = Math.abs(p.c - p.o);
    const engulf = body >= 0.7 * atrV && body >= pBody * 1.1 && ((c.c > c.o && p.c < p.o && c.o <= p.c && c.c >= p.o) || (c.c < c.o && p.c > p.o && c.o >= p.c && c.c <= p.o));
    if (engulf) deceitCount++;
  }
  return {
    bullTrap, bearTrap, twoSisi: bullTrap && bearTrap,
    cara: catatan.slice(0, 2).join(' | ') || 'tidak ada jejak trap terpetakan',
    deceitCount,
    deceitCara: deceitCount >= 2 ? `${deceitCount} lilin menipu terbaca (doji purba / pin salah arah / engulf ekstrem)` : `${deceitCount} lilin menipu terbaca`,
  };
}

function koreksiPools(cs: Candle[], v: SgVision): Pool[] {
  const n = cs.length;
  const atrV = Math.max(v.atr, 1e-9);
  const vols = cs.map((c) => c.v);
  const volSd = Math.max(stdev(vols.slice(Math.max(0, n - 30))), 1e-9);
  const winStart = Math.max(0, n - 22);
  const out: Pool[] = [];
  for (const p of v.pools) {
    const q: Pool = { ...p };
    if (!p.swept) {
      out.push({ ...q, idxSweep: -1, episodeLen: 0 });
      continue;
    }
    const margin = 0.12 * atrV;
    let side = p.side as 'BAWAH' | 'ATAS';
    if (p.dariZona) {
      let lastUp = -1;
      let lastDn = -1;
      for (let i = n - 1; i >= Math.max(0, n - 14); i--) {
        if (lastUp < 0 && cs[i].h > p.level + margin) lastUp = i;
        if (lastDn < 0 && cs[i].l < p.level - margin) lastDn = i;
        if (lastUp >= 0 && lastDn >= 0) break;
      }
      if (lastUp >= 0 && lastDn >= 0 && lastUp !== lastDn) side = lastUp > lastDn ? 'ATAS' : 'BAWAH';
      else if (lastUp >= 0 && lastUp === lastDn) {
        const c = cs[lastUp];
        side = p.level - c.l >= c.h - p.level ? 'BAWAH' : 'ATAS';
      }
    }
    let lastPierce = -1;
    for (let i = n - 1; i >= winStart; i--) {
      const pierce = side === 'BAWAH' ? cs[i].l < p.level - margin : cs[i].h > p.level + margin;
      if (pierce) {
        lastPierce = i;
        break;
      }
    }
    if (lastPierce < 0) {
      out.push({ ...q, side, idxSweep: -1, episodeLen: 0, barsSince: 99, volZSweep: 0, volRatioSweep: 0 });
      continue;
    }
    let a = lastPierce;
    while (a - 1 >= winStart) {
      const prevC = cs[a - 1];
      const pierce = side === 'BAWAH' ? prevC.l < p.level - margin : prevC.h > p.level + margin;
      const beyond = side === 'BAWAH' ? prevC.c < p.level - margin : prevC.c > p.level + margin;
      if (pierce || beyond) a--;
      else break;
    }
    const run = cs.slice(a, lastPierce + 1);
    let best = a;
    let vmax = -1;
    for (let i = 0; i < run.length; i++) {
      if (run[i].v > vmax) {
        vmax = run[i].v;
        best = a + i;
      }
    }
    const idxSweep = best;
    const sw = cs[idxSweep];
    const episode = cs.slice(a);
    const extreme = side === 'BAWAH' ? Math.min(...episode.map((c) => c.l)) : Math.max(...episode.map((c) => c.h));
    const depthAtr = side === 'BAWAH' ? (p.level - extreme) / atrV : (extreme - p.level) / atrV;
    const lastClose = cs[n - 1].c;
    const closeDistAtr = side === 'BAWAH' ? (lastClose - p.level) / atrV : (p.level - lastClose) / atrV;
    const post = cs.slice(idxSweep + 1);
    const postBounceMaxBodyAtr = post.length ? Math.max(...post.map((c) => Math.abs(c.c - c.o))) / atrV : 0;
    const postVolMean = post.length ? mean(post.map((c) => c.v)) : 0;
    const prevClose = n >= 2 ? cs[n - 2].c : lastClose;
    const crossBack = side === 'ATAS'
      ? prevClose > p.level && lastClose < p.level && closeDistAtr >= 0.2
      : prevClose < p.level && lastClose > p.level && closeDistAtr >= 0.2;
    out.push({
      ...q, side, idxSweep, episodeLen: episode.length, depthAtr, closeDistAtr,
      reclaimed: closeDistAtr >= 0.12,
      barsSince: n - 1 - lastPierce,
      volZSweep: (vmax - v.volMean) / volSd,
      volRatioSweep: vmax / Math.max(mean(cs.slice(Math.max(0, idxSweep - 12), idxSweep).map((c) => c.v)), 1e-9),
      sweepBodyAtr: Math.abs(sw.c - sw.o) / atrV,
      postBounceMaxBodyAtr, postVolMean, crossBack,
    });
  }
  return out;
}

function pilihAktif(cs: Candle[], pools: Pool[], atrV: number): Pool | null {
  const n = cs.length;
  const recentExtremeLo = Math.min(...cs.slice(Math.max(0, n - 8)).map((c) => c.l));
  const recentExtremeHi = Math.max(...cs.slice(Math.max(0, n - 8)).map((c) => c.h));
  const valid = pools.filter(
    (p) => p.swept && ((p.depthAtr ?? 0) >= 0.4 || ((p.depthAtr ?? 0) >= 0.3 && Math.abs(p.closeDistAtr ?? 0) >= 0.5 && (p.volZSweep ?? 0) >= 2)) &&
      (p.depthAtr ?? 0) <= 3.4 && (p.episodeLen ?? 0) > 0 && (p.episodeLen ?? 0) <= 8 && (p.barsSince ?? 99) <= 10 &&
      (p.dariZona || p.sentuhan >= 1) && ((p.volZSweep ?? 0) >= 0.5 || (p.volRatioSweep ?? 0) >= 1.15),
  );
  valid.sort((a, b) => {
    const ra = (a.crossBack ? 0 : (a.barsSince ?? 9) <= 1 && a.reclaimed ? 0 : (a.barsSince ?? 9) <= 4 ? 1 : (a.barsSince ?? 9) <= 8 ? 2 : 3);
    const rb = (b.crossBack ? 0 : (b.barsSince ?? 9) <= 1 && b.reclaimed ? 0 : (b.barsSince ?? 9) <= 4 ? 1 : (b.barsSince ?? 9) <= 8 ? 2 : 3);
    if (ra !== rb) return ra - rb;
    const da = Math.abs(a.level - (a.side === 'BAWAH' ? recentExtremeLo : recentExtremeHi));
    const db = Math.abs(b.level - (b.side === 'BAWAH' ? recentExtremeLo : recentExtremeHi));
    if (da !== db) return da - db;
    return (a.barsSince ?? 0) - (b.barsSince ?? 0);
  });
  return valid[0] ?? null;
}

function stopStruktural(arah: 'NAIK' | 'TURUN', entry: number, P: Pool, atrV: number): number {
  const extreme = P.side === 'BAWAH' ? P.level - (P.depthAtr ?? 0) * atrV : P.level + (P.depthAtr ?? 0) * atrV;
  const stopPrice = arah === 'NAIK' ? extreme - 0.45 * atrV : extreme + 0.45 * atrV;
  const pct = arah === 'NAIK' ? ((entry - stopPrice) / entry) * 100 : ((stopPrice - entry) / entry) * 100;
  return Math.min(STOP_MAX, Math.max(STOP_MIN, pct));
}

function poolRec(P: Pool | null) {
  if (!P) return { jenis: 'tak-jelas', side: 'TAK-JELAS', level: 0, sentuhan: 0, swept: false, reclaimed: false, depthAtr: 0, barsSince: -1 };
  return {
    jenis: P.jenis, side: P.side, level: P.level, sentuhan: P.sentuhan, swept: P.swept,
    reclaimed: !!P.reclaimed, depthAtr: P.depthAtr ?? 0, barsSince: P.barsSince ?? -1,
  };
}

function aspek5Rec(g: ReturnType<typeof trapScan>, pd: ReturnType<typeof klPdScan>, P: Pool | null): Aspek5 {
  const stopHunt = !!P && P.swept && (P.barsSince ?? 99) <= 10;
  const rangkaian: string[] = [];
  if (g.bullTrap) rangkaian.push('bull trap menabung likuiditas atas');
  if (g.bearTrap) rangkaian.push('bear trap melahirkan pool rantai');
  if (pd.pump) rangkaian.push('pump markup menciptakan korban FOMO');
  if (pd.falseBreakout) rangkaian.push('false breakout menampung pembeli terakhir di puncak');
  if (pd.dump) rangkaian.push('dump mengubah korban jadi stop-loss cluster');
  if (stopHunt) rangkaian.push('stop hunt final memanen pool rantai');
  return {
    stopHunt, falseBreakout: pd.falseBreakout, pumpDump: pd.pump && pd.dump,
    bearTrap: g.bearTrap, bullTrap: g.bullTrap,
    rangkaianUtuh: rangkaian.join(' -> '),
  };
}

const mk = (versi: string, p: { aksi: KlResult['aksi']; arah: KlResult['arah']; targetPct: number; stopPct: number; triggerLevel?: number }, rest: Omit<KlResult, 'versi' | 'score' | 'aksi' | 'arah' | 'targetPct' | 'stopPct' | 'triggerLevel'>, score: number): KlResult =>
  ({ versi, score, ...p, ...rest });

export function klVonis(cs: Candle[], versi = KL_BRAIN_VERSI): KlResult {
  const fitur = buildSgVision(cs);
  const n = cs.length;
  const atrV = Math.max(fitur.atr, 1e-9);
  const entry = cs[n - 1].c;
  const g = trapScan(cs, fitur);
  const pd = klPdScan(cs, fitur);
  const lastC = cs[n - 1].c;
  const prevC = cs[n - 2].c;
  const pools = koreksiPools(cs, fitur);
  const P = pilihAktif(cs, pools, atrV);
  if (!P) {
    return mk(versi, { aksi: 'SKIP', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: STOP_WAIT }, {
      pool: poolRec(null),
      grab: { terjadi: false, post: 'BELUM-JELAS', cara: 'tidak ada sapuan teridentifikasi' },
      gauntlet: g, pd,
      aspek5: aspek5Rec(g, pd, null),
      pelajaranAktif: ['KL-L6', 'SG-L8'],
      alasan: ['KL-L6 SKIP-DISIPLIN: tidak ada pool likuiditas yang baru disapu (episode segar + volume nyata) -> tanpa edge likuiditas, rangkaian 5 aspek tidak dimainkan'],
      fitur,
    }, 0);
  }
  const cara = `pool ${P.jenis} (${(P.side as string).toLowerCase()}, ${P.sentuhan} sentuhan, level ${P.level.toFixed(4)}) disapu ${P.barsSince} candle lalu sedalam ${(P.depthAtr ?? 0).toFixed(2)} ATR; volZ sapu ${(P.volZSweep ?? 0).toFixed(1)}; close kini ${(P.closeDistAtr ?? 0) >= 0 ? '+' : ''}${(P.closeDistAtr ?? 0).toFixed(2)} ATR dari level -> ${P.reclaimed ? 'RECLAIMED' : 'BELUM reclaim'}; jejak 5 aspek: bullTrap=${g.bullTrap ? 'YA' : 'n'}, bearTrap=${g.bearTrap ? 'YA' : 'n'}, ${pd.pumpCara}, ${pd.dumpCara}, ${pd.fboCara}`;
  const poolR = poolRec(P);
  const a5 = aspek5Rec(g, pd, P);
  const pengikut = (P.barsSince ?? 9) >= 1 && (P.postVolMean ?? 0) >= fitur.volMean * 0.85;
  const kering = (P.barsSince ?? 9) >= 1 && (P.postVolMean ?? 0) < fitur.volMean * 0.6;
  const sweepBody = (P.barsSince ?? 9) <= 1 ? (P.sweepBodyAtr ?? 0) : 0;
  const bodyDominan = Math.max(P.postBounceMaxBodyAtr ?? 0, sweepBody);
  const konteksPd = pd.korbanPump
    ? 'rangkaian pump-dump-false-breakout terkonfirmasi: stop-loss korban pump menumpuk di bawah — sapuan final adalah panen likuiditas'
    : 'konteks pasca-markdown';
  if (P.side === 'BAWAH') {
    if ((P.depthAtr ?? 0) >= 0.8 && (P.crossBack || P.reclaimed) && (fitur.consecDownBig >= 3 && fitur.lastVolZ >= 1.2 || fitur.consecDownBig >= 2 && (P.volZSweep ?? 0) >= 2.0)) {
      const stop = stopStruktural('NAIK', entry, P, atrV);
      return mk(versi, { aksi: 'ENTRY', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: stop }, {
        pool: poolR, grab: { terjadi: true, post: 'REVERSAL', cara }, gauntlet: g, pd, aspek5: a5,
        pelajaranAktif: ['KL-L1', 'SG-L9', 'SG-L1', 'SG-L2'],
        alasan: [`KL-L1 KASKADE-GAUNTLET: ${fitur.consecutiveDown} merah berturut + klimaks (z=${fitur.lastVolZ.toFixed(1)}) menyapu pool rantai sedalam ${(P.depthAtr ?? 0).toFixed(1)} ATR lalu ${P.crossBack ? 'cross-back' : 'reclaim'} — mesin likuidasi kehabisan bahan bakar; ${konteksPd}; jejak trap bull=${g.bullTrap ? 'ada' : '-'}/bear=${g.bearTrap ? 'ada' : '-'}, ${g.deceitCara} -> ENTRY NAIK, stop struktural ${stop.toFixed(2)}% di bawah ekstrem sapuan`],
        fitur,
      }, 3);
    }
    if (P.reclaimed && (P.closeDistAtr ?? 0) >= 0.3 && (P.closeDistAtr ?? 0) <= 2.6 && bodyDominan >= 0.55 && (P.barsSince ?? 9) <= 2 && ((P.barsSince ?? 0) === 0 || pengikut) && (P.volZSweep ?? 0) >= 0.5) {
      const stop = stopStruktural('NAIK', entry, P, atrV);
      return mk(versi, { aksi: 'ENTRY', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: stop }, {
        pool: poolR, grab: { terjadi: true, post: 'REVERSAL', cara }, gauntlet: g, pd, aspek5: a5,
        pelajaranAktif: ['KL-L2', 'SG-L3', 'SG-L1', 'SG-L2'],
        alasan: [`KL-L2 RECLAIM-DOMINAN: sapuan pool rantai ditutup balik +${(P.closeDistAtr ?? 0).toFixed(2)} ATR DI ATAS level dgn badan dominan ${bodyDominan.toFixed(2)} ATR (vol sapu z=${(P.volZSweep ?? 0).toFixed(1)}${pengikut ? ', reclaim berpengikut' : ''}) — stop long & short dipanen, trap terjebak; ${konteksPd}; ${g.cara} -> ENTRY NAIK, stop struktural ${stop.toFixed(2)}%`],
        fitur,
      }, 3);
    }
    if ((P.closeDistAtr ?? 0) >= -0.8 && (P.closeDistAtr ?? 0) <= 0.6 && (P.postBounceMaxBodyAtr ?? 0) <= 0.55 && lastC <= prevC && (P.postVolMean ?? 0) <= fitur.volMean * 0.8 && (P.depthAtr ?? 0) <= 2.8 && (P.barsSince ?? 9) <= 3) {
      const stop = stopStruktural('TURUN', entry, P, atrV);
      return mk(versi, { aksi: 'ENTRY', arah: 'TURUN', targetPct: TARGET_DISIPLIN, stopPct: stop }, {
        pool: poolR, grab: { terjadi: true, post: 'CONTINUATION', cara }, gauntlet: g, pd, aspek5: a5,
        pelajaranAktif: ['KL-L3', 'SG-L5', 'SG-L1', 'SG-L2'],
        alasan: [`KL-L3 UMPAN-RECLAIM: reclaim secekil TAPI gagal extend — tutup hanya ${(P.closeDistAtr ?? 0).toFixed(2)} ATR dari level, badan pasca-sapu ${(P.postBounceMaxBodyAtr ?? 0).toFixed(2)} ATR, LH mikro (close terakhir turun), volume kering ${(P.postVolMean ?? 0).toFixed(2)} vs rata ${fitur.volMean.toFixed(2)} — umpan terakhir setelah bull trap, bear trap, pump & false breakout; ${pd.dumpCara} -> grab jadi bahan bakar penjualan -> ENTRY TURUN, stop ${stop.toFixed(2)}% di atas pantulan gagal`],
        fitur,
      }, 3);
    }
    if (!P.reclaimed && (P.closeDistAtr ?? 0) <= -0.05 && (P.barsSince ?? 9) <= 3 && fitur.mom50Atr <= -0.5 && (P.depthAtr ?? 0) <= 2.8 && (P.postBounceMaxBodyAtr ?? 0) <= 0.35) {
      return mk(versi, { aksi: 'ENTRY', arah: 'TURUN', targetPct: TARGET_DISIPLIN, stopPct: stopStruktural('TURUN', entry, P, atrV) }, {
        pool: poolR, grab: { terjadi: true, post: 'CONTINUATION', cara }, gauntlet: g, pd, aspek5: a5,
        pelajaranAktif: ['KL-L4', 'SG-L4', 'SG-L1', 'SG-L2'],
        alasan: [`KL-L4 GRAB-BAHAN-BAKAR: sapuan tanpa reclaim (tutup ${(P.closeDistAtr ?? 0).toFixed(2)} ATR di bawah level) di konteks markdown pasca-pump (${pd.dumpCara}), bounce kering (badan ${(P.postBounceMaxBodyAtr ?? 0).toFixed(2)} ATR) -> likuiditas long habis, lanjut turun -> ENTRY TURUN`],
        fitur,
      }, 3);
    }
    if ((P.closeDistAtr ?? 0) >= 0.05 && (P.closeDistAtr ?? 0) <= 1.6 && (P.postBounceMaxBodyAtr ?? 0) <= 0.4 && lastC > prevC && g.twoSisi && (P.barsSince ?? 9) <= 3 && (P.depthAtr ?? 0) <= 2.6) {
      const trig = Math.max(P.level + 0.8 * atrV, entry + 0.25 * atrV);
      return mk(versi, { aksi: 'WAIT', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: STOP_WAIT, triggerLevel: trig }, {
        pool: poolR, grab: { terjadi: true, post: 'BELUM-JELAS', cara }, gauntlet: g, pd, aspek5: a5,
        pelajaranAktif: ['KL-L5', 'SG-L7', 'SG-L1', 'SG-L2'],
        alasan: [`KL-L5 SAPUAN-DWI-LAPIS: pantulan pasca-sapu RAPUH (badan ${(P.postBounceMaxBodyAtr ?? 0).toFixed(2)} ATR, vol ${(P.postVolMean ?? 0).toFixed(2)} vs rata ${fitur.volMean.toFixed(2)}) sementara rangkaian dua sisi terkonfirmasi (${g.cara}) — struktur belum aman; sapuan kedua lebih dalam = risiko likuidasi stop sempit -> WAIT, masuk NAIK hanya bila tutup reclaim di atas ${trig.toFixed(4)}, stop ${STOP_WAIT}%`],
        fitur,
      }, 2);
    }
    if (kering && fitur.mom50Atr <= -0.3 && (P.closeDistAtr ?? 0) <= 1.6) {
      return mk(versi, { aksi: 'ENTRY', arah: 'TURUN', targetPct: TARGET_DISIPLIN, stopPct: stopStruktural('TURUN', entry, P, atrV) }, {
        pool: poolR, grab: { terjadi: true, post: 'CONTINUATION', cara }, gauntlet: g, pd, aspek5: a5,
        pelajaranAktif: ['SG-L5', 'SG-L1', 'SG-L2'],
        alasan: [`SG-L5 RECLAIM-PALSU (warisan): reclaim TANPA PENGIKUT (vol pasca-sapu ${(P.postVolMean ?? 0).toFixed(2)} vs rata ${fitur.volMean.toFixed(2)}) di konteks lemah (mom50 ${fitur.mom50Atr.toFixed(1)} ATR) -> grab bahan bakar penjualan -> ENTRY TURUN`],
        fitur,
      }, 3);
    }
    const trig = Math.max(P.level + 0.8 * atrV, entry + 0.25 * atrV);
    return mk(versi, { aksi: 'WAIT', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: STOP_WAIT, triggerLevel: trig }, {
      pool: poolR, grab: { terjadi: true, post: 'BELUM-JELAS', cara }, gauntlet: g, pd, aspek5: a5,
      pelajaranAktif: ['SG-L7', 'SG-L1', 'SG-L2'],
      alasan: [`SG-L7 SABAR-MENUNGGU: pool rantai baru disapu (${P.barsSince} candle), anatomi belum menentukan (badan ${bodyDominan.toFixed(2)} ATR, close ${(P.closeDistAtr ?? 0).toFixed(2)} ATR) -> WAIT, masuk NAIK hanya bila tutup di atas ${trig.toFixed(4)}`],
      fitur,
    }, 2);
  }
  // SIDE ATAS — cermin
  if ((P.depthAtr ?? 0) >= 0.8 && (P.crossBack || P.reclaimed) && (fitur.consecUpBig >= 3 && fitur.lastVolZ >= 1.2 || fitur.consecUpBig >= 2 && (P.volZSweep ?? 0) >= 2.0)) {
    const stop = stopStruktural('TURUN', entry, P, atrV);
    return mk(versi, { aksi: 'ENTRY', arah: 'TURUN', targetPct: TARGET_DISIPLIN, stopPct: stop }, {
      pool: poolR, grab: { terjadi: true, post: 'REVERSAL', cara }, gauntlet: g, pd, aspek5: a5,
      pelajaranAktif: ['KL-L1', 'SG-L9', 'SG-L1', 'SG-L2'],
      alasan: [`KL-L1 KASKADE-GAUNTLET (cermin): ${fitur.consecutiveUp} hijau berturut + klimaks (z=${fitur.lastVolZ.toFixed(1)}) menyapu pool ATAS sedalam ${(P.depthAtr ?? 0).toFixed(1)} ATR lalu ${P.crossBack ? 'cross-back' : 'ditolak'} — likuidasi short selesai; ${konteksPd} -> ENTRY TURUN, stop struktural ${stop.toFixed(2)}%`],
      fitur,
    }, 3);
  }
  if (P.reclaimed && (P.closeDistAtr ?? 0) <= -0.3 && (P.closeDistAtr ?? 0) >= -2.6 && bodyDominan >= 0.55 && (P.barsSince ?? 9) <= 2 && ((P.barsSince ?? 0) === 0 || pengikut) && (P.volZSweep ?? 0) >= 0.5) {
    const stop = stopStruktural('TURUN', entry, P, atrV);
    return mk(versi, { aksi: 'ENTRY', arah: 'TURUN', targetPct: TARGET_DISIPLIN, stopPct: stop }, {
      pool: poolR, grab: { terjadi: true, post: 'REVERSAL', cara }, gauntlet: g, pd, aspek5: a5,
      pelajaranAktif: ['KL-L2', 'SG-L3', 'SG-L1', 'SG-L2'],
      alasan: [`KL-L2 REJECT-DOMINAN: sapuan pool ATAS ditolak keras ${(P.closeDistAtr ?? 0).toFixed(2)} ATR DI BAWAH level dgn badan dominan ${bodyDominan.toFixed(2)} ATR (vol sapu z=${(P.volZSweep ?? 0).toFixed(1)}) — stop pembeli dipanen, bull trap terjebak; ${konteksPd} -> ENTRY TURUN, stop struktural ${stop.toFixed(2)}%`],
      fitur,
    }, 3);
  }
  if ((P.closeDistAtr ?? 0) <= 0.8 && (P.closeDistAtr ?? 0) >= -0.6 && (P.postBounceMaxBodyAtr ?? 0) <= 0.55 && lastC >= prevC && (P.postVolMean ?? 0) <= fitur.volMean * 0.8 && (P.depthAtr ?? 0) <= 2.8 && (P.barsSince ?? 9) <= 3) {
    const stop = stopStruktural('NAIK', entry, P, atrV);
    return mk(versi, { aksi: 'ENTRY', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: stop }, {
      pool: poolR, grab: { terjadi: true, post: 'CONTINUATION', cara }, gauntlet: g, pd, aspek5: a5,
      pelajaranAktif: ['KL-L3', 'SG-L5', 'SG-L1', 'SG-L2'],
      alasan: [`KL-L3 UMPAN-REJECT (cermin): penolakan secekil gagal extend — tutup ${(P.closeDistAtr ?? 0).toFixed(2)} ATR dari level ATAS, badan pasca-sapu ${(P.postBounceMaxBodyAtr ?? 0).toFixed(2)} ATR, volume kering -> umpan terakhir setelah bull trap & false breakout; ${pd.pumpCara} -> grab jadi bahan bakar pembelian -> ENTRY NAIK, stop ${stop.toFixed(2)}%`],
      fitur,
    }, 3);
  }
  if (!P.reclaimed && (P.closeDistAtr ?? 0) >= 0.05 && (P.barsSince ?? 9) <= 3 && fitur.mom50Atr >= 0.5 && (P.depthAtr ?? 0) <= 2.8 && (P.postBounceMaxBodyAtr ?? 0) <= 0.35) {
    return mk(versi, { aksi: 'ENTRY', arah: 'NAIK', targetPct: TARGET_DISIPLIN, stopPct: stopStruktural('NAIK', entry, P, atrV) }, {
      pool: poolR, grab: { terjadi: true, post: 'CONTINUATION', cara }, gauntlet: g, pd, aspek5: a5,
      pelajaranAktif: ['KL-L4', 'SG-L4', 'SG-L1', 'SG-L2'],
      alasan: [`KL-L4 GRAB-BAHAN-BAKAR (cermin): sapuan ATAS tanpa reclaim (tutup ${(P.closeDistAtr ?? 0).toFixed(2)} ATR di atas level) di konteks rally pasca-pump-cermin, bounce kering -> likuiditas short habis, lanjut naik -> ENTRY NAIK`],
      fitur,
    }, 3);
  }
  const trigDn = Math.min(P.level - 0.8 * atrV, entry - 0.25 * atrV);
  return mk(versi, { aksi: 'WAIT', arah: 'TURUN', targetPct: TARGET_DISIPLIN, stopPct: STOP_WAIT, triggerLevel: trigDn }, {
    pool: poolR, grab: { terjadi: true, post: 'BELUM-JELAS', cara }, gauntlet: g, pd, aspek5: a5,
    pelajaranAktif: ['SG-L7', 'SG-L1', 'SG-L2'],
    alasan: [`SG-L7 SABAR-MENUNGGU (cermin): pool ATAS baru disapu (${P.barsSince} candle), anatomi belum menentukan -> WAIT, masuk TURUN hanya bila tutup di bawah ${trigDn.toFixed(4)}`],
    fitur,
  }, 2);
}
