function buildCandleVision(cs) {
    const n = cs.length;
    const last = cs[n - 1];
    const price = last.c;
    const closes = cs.map((c)=>c.c);
    const vols = cs.map((c)=>c.v);
    const atrA = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atr"](cs, 14);
    const atr = Math.max(atrA[n - 1], price * 0.0006);
    const ema9A = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ema"](closes, 9);
    const ema21A = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ema"](closes, 21);
    const ema50A = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ema"](closes, 50);
    const rsiA = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rsi"](closes, 14);
    const range = Math.max(last.h - last.l, 1e-9);
    const body = last.c - last.o;
    const bodyPct = Math.abs(body) / range;
    const upperWickPct = (last.h - Math.max(last.o, last.c)) / range;
    const lowerWickPct = (Math.min(last.o, last.c) - last.l) / range;
    // volume
    const volWin = vols.slice(Math.max(0, n - 21), n - 1);
    const volMean = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"](volWin);
    const volSd = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stdev"](volWin), 1e-9);
    const volZ = (last.v - volMean) / volSd;
    const volClimax = last.v >= 2.2 * Math.max(volMean, 1e-9);
    let upV = 0;
    let downV = 0;
    let totV = 0;
    for(let i = Math.max(0, n - 10); i < n; i++){
        totV += cs[i].v;
        if (cs[i].c >= cs[i].o) upV += cs[i].v;
        else downV += cs[i].v;
    }
    const volAsym = totV > 0 ? (upV - downV) / totV : 0;
    // pivot fraktal k=2
    const pivotHighs = [];
    const pivotLows = [];
    const phIdx = [];
    const plIdx = [];
    for(let i = 2; i < n - 2; i++){
        const h = cs[i].h;
        const l = cs[i].l;
        if (h > cs[i - 1].h && h > cs[i - 2].h && h > cs[i + 1].h && h > cs[i + 2].h) {
            pivotHighs.push(h);
            phIdx.push(i);
        }
        if (l < cs[i - 1].l && l < cs[i - 2].l && l < cs[i + 1].l && l < cs[i + 2].l) {
            pivotLows.push(l);
            plIdx.push(i);
        }
    }
    const hh = pivotHighs.length >= 2 ? pivotHighs[pivotHighs.length - 1] > pivotHighs[pivotHighs.length - 2] : false;
    const lh = pivotHighs.length >= 2 ? pivotHighs[pivotHighs.length - 1] < pivotHighs[pivotHighs.length - 2] : false;
    const hl = pivotLows.length >= 2 ? pivotLows[pivotLows.length - 1] > pivotLows[pivotLows.length - 2] : false;
    const ll = pivotLows.length >= 2 ? pivotLows[pivotLows.length - 1] < pivotLows[pivotLows.length - 2] : false;
    // range & posisi
    const win20 = cs.slice(Math.max(0, n - 22), n - 1);
    const rangeHigh = Math.max(...win20.map((c)=>c.h));
    const rangeLow = Math.min(...win20.map((c)=>c.l));
    const posInRange = Math.max(-0.3, Math.min(1.3, (price - rangeLow) / Math.max(rangeHigh - rangeLow, 1e-9)));
    // sweep: lilin terakhir menusuk low/high 8 candle sebelumnya lalu menutup balik
    const priorLows = cs.slice(Math.max(0, n - 9), n - 1).map((c)=>c.l);
    const priorHighs = cs.slice(Math.max(0, n - 9), n - 1).map((c)=>c.h);
    const minPriorLow = Math.min(...priorLows);
    const maxPriorHigh = Math.max(...priorHighs);
    const sweptLow = last.l < minPriorLow && last.c > minPriorLow;
    const sweptHigh = last.h > maxPriorHigh && last.c < maxPriorHigh;
    // konteks breakout: level = range 10 candle sesudahnya vs 10 candle lebih lama
    const older = cs.slice(Math.max(0, n - 20), Math.max(0, n - 10));
    const recent = cs.slice(Math.max(0, n - 10), n);
    const breakLevel = older.length ? Math.max(...older.map((c)=>c.h)) : price;
    const breakLevelDn = older.length ? Math.min(...older.map((c)=>c.l)) : price;
    const recentBreakUp = recent.length ? Math.max(...recent.map((c)=>c.h)) > breakLevel : false;
    const recentBreakDown = recent.length ? Math.min(...recent.map((c)=>c.l)) < breakLevelDn : false;
    const retestHold = recentBreakUp && last.l > breakLevel && last.c > breakLevel && !volClimaxAt(cs, n, 2.4) || recentBreakDown && last.h < breakLevelDn && last.c < breakLevelDn && !volClimaxAt(cs, n, 2.4);
    const failedRetest = recentBreakUp && last.c < breakLevel || recentBreakDown && last.c > breakLevelDn;
    // streak & momentum
    let consecutiveUp = 0;
    let consecutiveDown = 0;
    for(let i = n - 1; i >= 0; i--){
        if (cs[i].c > cs[i].o) {
            if (consecutiveDown > 0) break;
            consecutiveUp++;
        } else if (cs[i].c < cs[i].o) {
            if (consecutiveUp > 0) break;
            consecutiveDown++;
        } else break;
    }
    const back12 = cs[Math.max(0, n - 13)].c;
    const mom12Atr = (price - back12) / atr;
    // v231.4 — horizon pendek & netto serangan (multi-horizon, anti pendek-pikir)
    const mom3Atr = (price - cs[Math.max(0, n - 4)].c) / atr;
    const netLast5Atr = (price - cs[Math.max(0, n - 6)].c) / atr;
    const winLow60 = Math.min(...cs.map((c)=>c.l));
    const winHigh60 = Math.max(...cs.map((c)=>c.h));
    const posInWindow60 = Math.max(-0.3, Math.min(1.3, (price - winLow60) / Math.max(winHigh60 - winLow60, 1e-9)));
    // v231.5 — anatomi dorongan: badan naik/turun 6 candle & volume zona sisa
    let bodyUp6 = 0;
    let bodyDn6 = 0;
    for(let i = Math.max(0, n - 6); i < n; i++){
        const b = cs[i].c - cs[i].o;
        if (b >= 0) bodyUp6 += b;
        else bodyDn6 += -b;
    }
    const volZat = (idx)=>(vols[idx] - volMean) / volSd;
    const volZmidMax = Math.max(...[
        n - 5,
        n - 4,
        n - 3
    ].filter((i)=>i >= 0).map(volZat), -9);
    const top10 = Math.max(...cs.slice(Math.max(0, n - 10)).map((c)=>c.h));
    const fallFromTop10Atr = (top10 - price) / atr;
    const ret6Atr = [];
    for(let i = Math.max(1, n - 6); i < n; i++)ret6Atr.push((cs[i].c - cs[i - 1].c) / atr);
    let up3 = 0;
    let dn3 = 0;
    for(let i = Math.max(0, n - 3); i < n; i++){
        const b = cs[i].c - cs[i].o;
        if (b >= 0) up3 += b;
        else dn3 += -b;
    }
    let upV5 = 0;
    let dnV5 = 0;
    for(let i = Math.max(0, n - 5); i < n; i++){
        if (cs[i].c >= cs[i].o) upV5 += cs[i].v;
        else dnV5 += cs[i].v;
    }
    const volAsym5 = upV5 + dnV5 > 0 ? (upV5 - dnV5) / (upV5 + dnV5) : 0;
    const mom30Atr = (price - cs[Math.max(0, n - 31)].c) / atr;
    let lowTrend12 = 0;
    const mom50Atr = (price - cs[Math.max(0, n - 51)].c) / atr;
    // lowTrend12: regresi-linier low 12 candle terakhir (robust noise)
    {
        const st = Math.max(0, n - 12);
        const m = cs.slice(st);
        const k = m.length;
        const xm = (k - 1) / 2;
        const ym = m.reduce((s, c)=>s + c.l, 0) / k;
        let sxy = 0;
        let sxx = 0;
        for(let i = 0; i < k; i++){
            sxy += (i - xm) * (m[i].l - ym);
            sxx += (i - xm) ** 2;
        }
        lowTrend12 = sxx > 0 ? sxy / sxx / atr : 0;
    }
    // spring13 (Wyckoff): sapuan-recover TERAKHIR di c(n-23)..c(n-7) yang
    // LANTAINYA TAHAN — tidak ada low baru di bawah low sapuan setelahnya.
    // (Dalam drift-turun/distribusi: sapuan terus berlanjut atau tak pulih
    //  → bukan spring. Hanya basis akumulasi yang menyapu SEKALI lalu tahan.)
    let spring13 = false;
    for(let i = n - 8; i >= Math.max(17, n - 24); i--){
        let priorMin = Infinity;
        for(let j = Math.max(0, i - 17); j < i; j++)priorMin = Math.min(priorMin, cs[j].l);
        if (cs[i].l < priorMin && cs[i].c > priorMin) {
            let hold = true;
            for(let j = i + 1; j < n; j++){
                if (cs[j].l < cs[i].l) {
                    hold = false;
                    break;
                }
            }
            if (hold) spring13 = true;
            break; // hanya sapuan terakhir yang dinilai
        }
    }
    // rFlip: pergantian tanda return 6 candle terakhir (0 = dorongan monoton)
    let rFlip = 0;
    for(let i = 1; i < ret6Atr.length; i++){
        if (ret6Atr[i] !== 0 && ret6Atr[i - 1] !== 0 && Math.sign(ret6Atr[i]) !== Math.sign(ret6Atr[i - 1])) rFlip++;
    }
    // squeeze: ATR sekarang di persentil rendah jendela 40
    let squeeze = false;
    if (n >= 41) {
        const win = atrA.slice(n - 40, n);
        const mn = Math.min(...win);
        const mx = Math.max(...win);
        squeeze = mx > mn && (atr - mn) / (mx - mn) < 0.25;
    }
    // pola lilin
    const prev = cs[n - 2] ?? last;
    const bullEngulf = prev.c < prev.o && last.c > last.o && last.c > prev.o && last.o <= prev.c && Math.abs(body) > Math.abs(prev.c - prev.o) * 1.05;
    const bearEngulf = prev.c > prev.o && last.c < last.o && last.c < prev.o && last.o >= prev.c && Math.abs(body) > Math.abs(prev.c - prev.o) * 1.05;
    const doji = bodyPct < 0.15 && range / atr > 0.7;
    const hammer = lowerWickPct > 0.5 && bodyPct < 0.4 && upperWickPct < 0.25;
    const shootingStar = upperWickPct > 0.5 && bodyPct < 0.4 && lowerWickPct < 0.25;
    // divergensi RSI pada pivot
    let divBear = false;
    let divBull = false;
    if (phIdx.length >= 2) {
        const a = phIdx[phIdx.length - 2];
        const b = phIdx[phIdx.length - 1];
        if (closes[b] > closes[a] && rsiA[b] < rsiA[a] - 2) divBear = true;
    }
    if (plIdx.length >= 2) {
        const a = plIdx[plIdx.length - 2];
        const b = plIdx[plIdx.length - 1];
        if (closes[b] < closes[a] && rsiA[b] > rsiA[a] + 2) divBull = true;
    }
    const ema21SlopeAtr = (ema21A[n - 1] - ema21A[Math.max(0, n - 4)]) / (3 * atr);
    return {
        n,
        last,
        price,
        atr,
        atrPct: atr / price,
        ema9: ema9A[n - 1],
        ema21: ema21A[n - 1],
        ema50: ema50A[n - 1],
        ema21SlopeAtr,
        rsi: rsiA[n - 1],
        distEma21Atr: (price - ema21A[n - 1]) / atr,
        green: body > 0,
        bodyPct,
        upperWickPct,
        lowerWickPct,
        rangeAtr: range / atr,
        volZ,
        volMean,
        volClimax,
        volAsym,
        pivotHighs,
        pivotLows,
        hh,
        lh,
        hl,
        ll,
        rangeHigh,
        rangeLow,
        posInRange,
        sweptLow,
        sweptHigh,
        recentBreakUp,
        recentBreakDown,
        breakLevel,
        retestHold,
        failedRetest,
        consecutiveUp,
        consecutiveDown,
        squeeze,
        bullEngulf,
        bearEngulf,
        hammer,
        shootingStar,
        doji,
        divBull,
        divBear,
        mom12Atr,
        mom3Atr,
        netLast5Atr,
        posInWindow60,
        breakLevelDn,
        bodyUp6Atr: bodyUp6 / atr,
        bodyDn6Atr: bodyDn6 / atr,
        volZmidMax,
        fallFromTop10Atr,
        ret6Atr,
        bodyRatio3Atr: (up3 - dn3) / atr,
        volAsym5,
        mom30Atr,
        mom50Atr,
        lowTrend12,
        spring13,
        rFlip
    };
}
