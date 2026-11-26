
"use strict";

// ============================================================
// UJIAN KOMPLEKS 5 ASPEK — "1 ujian = 1 rangkaian pasar
// KOMPLEKS: KELIMA aspek bekerja BERSAMAAN dan BERURUTAN":
//   1. STOP HUNT / LIQUIDITY GRAB — sapuan final pool rantai
//   2. FALSE BREAKOUT             — tembus puncak struktural lalu dicabut
//   3. PUMP AND DUMP              — markup impuls volume + markdown
//   4. BEAR TRAP                  — tembus bawah lalu dipulihkan
//   5. BULL TRAP                  — tembus atas lalu dicabut
//   + LILIN MENIPU (deceit) sebagai perekat antar fase.
//
// Otak wajib mengenali HUBUNGAN, URUTAN, dan INTERAKSI kelimanya:
// bull trap menabung likuiditas di atas -> bear trap melahirkan
// pool rantai di bawah -> pump menciptakan korban FOMO + likuiditas
// breakout -> FALSE BREAKOUT di puncak pump menampung pembeli
// terakhir -> DUMP menciptakan stop-loss korban pump -> grind
// menekan semuanya ke pool rantai -> STOP HUNT FINAL memanen
// seluruh stop cluster -> resolusi dari data (reclaim atau lanjut).
//
// Protokol anti-hindsight: 60 candle VISIBLE + 14 HORIZON.
// Fee buy 0.1% + fee sell 0.1% — hasil akhir SELALU NET.
// Rencana WAJIB membawa STOP LOSS (stop tersentuh = LIKUIDASI).
// ============================================================
__turbopack_context__.s([
    "FEE_BUY",
    ()=>FEE_BUY,
    "FEE_SELL",
    ()=>FEE_SELL,
    "KL_HORIZON",
    ()=>KL_HORIZON,
    "KL_SIZE",
    ()=>KL_SIZE,
    "KL_TOTAL",
    ()=>KL_TOTAL,
    "KL_VISIBLE",
    ()=>KL_VISIBLE,
    "simBaitTrade",
    ()=>simBaitTrade,
    "simKlTrade",
    ()=>simKlTrade,
    "totalFeePct",
    ()=>totalFeePct
]);
const KL_VISIBLE = 60;
const KL_HORIZON = 14;
const KL_TOTAL = KL_VISIBLE + KL_HORIZON;
const KL_SIZE = 100;
const FEE_BUY = 0.001;
const FEE_SELL = 0.001;
function walkWithStop(arah, entry, stopPct, targetPct, horizon, baseIdx) {
    const sign = arah === 'NAIK' ? 1 : -1;
    const stop = entry * (1 - sign * stopPct / 100);
    const target = entry * (1 + sign * targetPct / 100);
    for(let i = 0; i < horizon.length; i++){
        const c = horizon[i];
        const stopTouched = arah === 'NAIK' ? c.l <= stop : c.h >= stop;
        const targetTouched = arah === 'NAIK' ? c.h >= target : c.l <= target;
        // KONSERVATIF & JUJUR: satu lilin menyentuh keduanya -> STOP dulu
        if (stopTouched) return {
            exit: stop,
            stopHit: true,
            targetHit: false,
            hitCandle: baseIdx + i + 1
        };
        if (targetTouched) return {
            exit: target,
            stopHit: false,
            targetHit: true,
            hitCandle: baseIdx + i + 1
        };
    }
    return {
        exit: horizon[horizon.length - 1].c,
        stopHit: false,
        targetHit: false,
        hitCandle: 0
    };
}
function coreTrade(arah, entry, stopPct, targetPct, horizon, baseIdx) {
    const w = walkWithStop(arah, entry, stopPct, targetPct, horizon, baseIdx);
    const stop = entry * (1 - (arah === 'NAIK' ? 1 : -1) * stopPct / 100);
    const target = entry * (1 + (arah === 'NAIK' ? 1 : -1) * targetPct / 100);
    const feeBuy = entry * FEE_BUY;
    const feeSell = w.exit * FEE_SELL;
    const grossPct = arah === 'NAIK' ? (w.exit / entry - 1) * 100 : (1 - w.exit / entry) * 100;
    const netPct = arah === 'NAIK' ? (w.exit * (1 - FEE_SELL) / (entry * (1 + FEE_BUY)) - 1) * 100 : (entry * (1 - FEE_BUY) / (w.exit * (1 + FEE_SELL)) - 1) * 100;
    return {
        aksi: 'ENTRY',
        mode: 'ENTRY',
        arah,
        entry,
        stop,
        target,
        exit: w.exit,
        targetHit: w.targetHit,
        stopHit: w.stopHit,
        hitCandle: w.hitCandle,
        feeBuy,
        feeSell,
        grossPct,
        netPct,
        returnPct: netPct,
        berhasil: netPct > 0 && !w.stopHit,
        noTradeAman: null,
        noTradeLabel: null
    };
}
const NO_TRADE = (aman)=>({
        aksi: 'SKIP',
        mode: 'NO-TRADE',
        arah: 'NAIK',
        entry: null,
        stop: null,
        target: null,
        exit: null,
        targetHit: false,
        stopHit: false,
        hitCandle: 0,
        feeBuy: null,
        feeSell: null,
        grossPct: null,
        netPct: null,
        returnPct: null,
        berhasil: null,
        noTradeAman: aman,
        noTradeLabel: aman ? 'AMAN-HINDARI' : 'KELEWAT-PELUANG'
    });
_c = NO_TRADE;
function simBaitTrade(arah, close60, horizon, targetPct = 2.2, stopPct = 2.2) {
    return coreTrade(arah, close60, stopPct, targetPct, horizon, KL_VISIBLE - 1);
}
function simKlTrade(plan, close60, horizon, bait) {
    if (plan.aksi === 'SKIP') {
        const b = simBaitTrade(bait, close60, horizon);
        return NO_TRADE((b.netPct ?? 0) <= 0 || b.stopHit);
    }
    if (plan.aksi === 'ENTRY') return coreTrade(plan.arah, close60, plan.stopPct, plan.targetPct, horizon, KL_VISIBLE - 1);
    const lvl = plan.triggerLevel ?? close60;
    const ok0 = plan.arah === 'NAIK' ? close60 >= lvl : close60 <= lvl;
    if (ok0) return {
        ...coreTrade(plan.arah, close60, plan.stopPct, plan.targetPct, horizon, KL_VISIBLE - 1),
        mode: 'WAIT-HIT'
    };
    for(let i = 0; i < Math.min(8, horizon.length); i++){
        const c = horizon[i].c;
        const ok = plan.arah === 'NAIK' ? c >= lvl : c <= lvl;
        if (ok) {
            const led = coreTrade(plan.arah, c, plan.stopPct, plan.targetPct, horizon.slice(i + 1), KL_VISIBLE + i);
            return {
                ...led,
                mode: 'WAIT-HIT'
            };
        }
    }
    const b = simBaitTrade(bait, close60, horizon);
    return NO_TRADE((b.netPct ?? 0) <= 0 || b.stopHit);
}
function totalFeePct() {
    return (FEE_BUY + FEE_SELL) * 100;
}
var _c;
__turbopack_context__.k.register(_c, "NO_TRADE");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
