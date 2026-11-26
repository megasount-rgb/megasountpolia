(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/exam/rng.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// RNG BERBIBIT — jantung determinisme Ujian Simulasi.
// Setiap pasar lahir dari seed teks; hasil identik di semua
// mesin & semua waktu. Tidak ada Math.random di seluruh exam.
// ============================================================
__turbopack_context__.s([
    "hashSeed",
    ()=>hashSeed,
    "makeRng",
    ()=>makeRng
]);
function hashSeed(str) {
    let h = 1779033703 ^ str.length;
    for(let i = 0; i < str.length; i++){
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    }
    return (h ^ h >>> 16) >>> 0;
}
function mulberry32(seed) {
    let a = seed >>> 0;
    return ()=>{
        a |= 0;
        a = a + 0x6d2b79f5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function makeRng(seed) {
    const base = typeof seed === 'string' ? hashSeed(seed) : seed >>> 0;
    const src = mulberry32(base);
    let spare = null;
    return {
        next: ()=>src(),
        range: (min, max)=>min + (max - min) * src(),
        int: (min, maxInclusive)=>Math.floor(min + (maxInclusive - min + 1) * src()),
        pick: (arr)=>arr[Math.floor(src() * arr.length)],
        chance: (p)=>src() < p,
        normal: ()=>{
            if (spare !== null) {
                const s = spare;
                spare = null;
                return s;
            }
            let u = 0;
            do {
                u = src();
            }while (u <= 1e-12)
            const v = src();
            const mag = Math.sqrt(-2 * Math.log(u));
            spare = mag * Math.sin(2 * Math.PI * v);
            return mag * Math.cos(2 * Math.PI * v);
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/bulltrap-forge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// UJIAN BULL TRAP 100 — "100 ujian yang sering membuat trader
// profesional berpengalaman 5+ tahun terkena liquidasi".
//
// Semua 100 ujian adalah BULL TRAP: grafik yang memancing BUY
// dengan bujukan sekuat mungkin (breakout, new high, squeeze,
// relief rally), lalu RUNTUH. Momen keputusan = PUNCAK BUKJUKAN
// — persis saat trader profesional menaruh posisi.
//
// Protokol:
//  - 60 candle VISIBLE + 14 HORIZON. Otak hanya melihat 1..60.
//  - Truth dari DATA (tanda close[73] vs close[59]), gerbang
//    profit: jebakan wajib runtuh >= 2.8% (fee buy+sell 0.2%
//    wajib tertlampa dengan nyaman bila vonis benar).
//  - GUARD anti-bias: 24 grafik breakout/flag/pullback SEHAT
//    (truth NAIK) — otak yang menjawab TURUN terus-menerus
//    tanpa membaca anatomi akan GAGAL di guard. Pemahaman
//    sejati = membedakan jebakan dari momentum asli.
//  - Setiap arketipe punya TANDA TANGAN point-in-time yang
//    bisa dibaca pada candle ke-60 (ilmu, bukan tebak-tebakan).
// ============================================================
__turbopack_context__.s([
    "BT_ARCHES",
    ()=>BT_ARCHES,
    "BT_DIFF_CFG",
    ()=>BT_DIFF_CFG,
    "BT_GUARD_ARCHES",
    ()=>BT_GUARD_ARCHES,
    "BT_GUARD_SIZE",
    ()=>BT_GUARD_SIZE,
    "BT_HORIZON",
    ()=>BT_HORIZON,
    "BT_MIN_GUARD_MOVE",
    ()=>BT_MIN_GUARD_MOVE,
    "BT_MIN_TRAP_MOVE",
    ()=>BT_MIN_TRAP_MOVE,
    "BT_SIZE",
    ()=>BT_SIZE,
    "BT_TOTAL",
    ()=>BT_TOTAL,
    "BT_VISIBLE",
    ()=>BT_VISIBLE,
    "DIFF_CYCLE",
    ()=>DIFF_CYCLE,
    "FEE_BUY",
    ()=>FEE_BUY,
    "FEE_SELL",
    ()=>FEE_SELL,
    "Pen",
    ()=>Pen,
    "boundRange",
    ()=>boundRange,
    "btNetProfitPct",
    ()=>btNetProfitPct,
    "collapseHorizon",
    ()=>collapseHorizon,
    "downLegs",
    ()=>downLegs,
    "precise",
    ()=>precise,
    "rallyHorizon",
    ()=>rallyHorizon,
    "step",
    ()=>step,
    "totalFeePct",
    ()=>totalFeePct,
    "upLegs",
    ()=>upLegs,
    "volCalm",
    ()=>volCalm
]);
const BT_VISIBLE = 60;
const BT_HORIZON = 14;
const BT_TOTAL = BT_VISIBLE + BT_HORIZON;
const BT_SIZE = 100;
const BT_GUARD_SIZE = 24;
const FEE_BUY = 0.001;
const FEE_SELL = 0.001;
const BT_MIN_TRAP_MOVE = 0.028;
const BT_MIN_GUARD_MOVE = 0.03;
const BT_ARCHES = [
    {
        id: 'bt-classic',
        label: 'Classic Fakeout (Breakout Volume Lemah)',
        ilmu: 'Range panjang -> breakout 2 lilin di atas resistance TAPI volume di bawah rata-rata -> stall di udara -> engulF merah mencabut breakout.',
        jebakan: 'Trader pro melihat "breakout confirmed" dan membeli; volume tipis yang mengkhianati diabaikan karena FOMO struktur.',
        tandaTangan: 'breakout recent + volZ breakout <= 0 + momentum sudah stall di atas resistance'
    },
    {
        id: 'bt-strong-exhaust',
        label: 'Breakout Kuat di Tren Tua (Exhaustion)',
        ilmu: 'Uptrend panjang akselerasi -> breakout di atas high terakhir saat RSI ekstrem & harga jauh dari EMA21 -> kelelahan.',
        jebakan: '"Strength is truth" — pro menambah posisi di breakout tren tua; buyer terakhir habis tepat di situ.',
        tandaTangan: 'dist EMA21 >= 2.4 ATR + mom12 >= 3 ATR + RSI ekstrem + wick kelelahan'
    },
    {
        id: 'bt-sweep-high',
        label: 'Stop Hunt Sweep di Atas High',
        ilmu: 'Konsolidasi di bawah high lama -> wick menusuk high (menyapu stop short & trigger buy-stop) -> ditutup KEMBALI di bawah high.',
        jebakan: 'Breakout-buy terpicu di atas high; short dilikuidasi; keduanya terjebak saat harga ditolak balik.',
        tandaTangan: 'sweptHigh + wick atas >= 40% + volume sapuan >= 1.2 sigma + tutup di bawah high'
    },
    {
        id: 'bt-double-top',
        label: 'Double Top dengan Fake New High',
        ilmu: 'Puncak P1 -> leher -> rally kedua menembus P1 sedikit (fake new high) dengan badan menyusut & volume layu -> stall.',
        jebakan: 'Pro membeli "breakout all-time high"; divergensi momentum yang tersimpan di RSI tidak dilihat.',
        tandaTangan: 'divBear pada pivot + posisi di puncak jendela + badan rally kedua menyusut'
    },
    {
        id: 'bt-parabolic',
        label: 'Parabolic Blow-Off Top',
        ilmu: 'Akselerasi makin curam -> lilin klimaks volume raksasa + wick atas lebar -> pembeli terakhir masuk di puncak.',
        jebakan: 'FOMO parabolik; pro yang "ride the trend" dilikuidasi saat derajat kemiringan membalik.',
        tandaTangan: 'dist EMA21 ekstrem + volClimax + wick kelelahan di puncak jendela'
    },
    {
        id: 'bt-relief-rally',
        label: 'Relief Rally dalam Downtrend',
        ilmu: 'Downtrend LH/LL -> rally tajam 8-10 lilin menembus lower-high minor -> berhenti tepat di zona supply/EMA jatuh.',
        jebakan: 'Pro menyebutnya "reversal confirmed" (struktur HL mikro + momentum); tren besar masih turun dan menelan semua.',
        tandaTangan: 'mom50 masih dalam + rally mencapai zona EMA/supply + badan rally menyusut tanpa divBull'
    },
    {
        id: 'bt-flag-fail',
        label: 'Bull Flag yang Gagal (Distribusi)',
        ilmu: 'Pole naik tajam -> flag turun landai SEPERTI buku teks, TAPI volume merah dalam flag menguasai (distribusi) -> pecah ke BAWAH.',
        jebakan: 'Setup paling dicintai trader pro: "bull flag = beli". Volume merah dalam flag membuktikan lepas-posisi diam-diam.',
        tandaTangan: 'mom24 masih kuat (pole) + netto flag stagnan + volAsym5 merah + tanpa dorongan hijau'
    },
    {
        id: 'bt-squeeze-vacuum',
        label: 'Short Squeeze Vacuum',
        ilmu: 'Downtrend -> sapu low -> squeeze vertikal melikuidasi short -> stall di udara tanpa pembeli lanjutan (volume padam).',
        jebakan: 'Pro membeli "trend reversal berkekuatan"; squeeze tanpa pembeli nyata hanya reaksi likuidasi, lalu jatuh bebas.',
        tandaTangan: 'mom12 squeeze >= 2 ATR tapi mom3 & netto 5 lilin berbalik + volume stall padam'
    },
    {
        id: 'bt-utad',
        label: 'UTAD — Upthrust After Distribution',
        ilmu: 'Range distribusi di puncak dengan penolakan berulang -> dorongan terakhir menusuk tepi atas dengan volume LEMAH -> tutup kembali di tepi.',
        jebakan: 'Pro membeli "breakout dari distribusi"; Wyckoff menyebutnya tes terakhir sebelum markdown.',
        tandaTangan: 'sweptHigh tipis + volZ <= 0.3 + klaster wick penolakan di puncak + posisi jendela >= 85%'
    },
    {
        id: 'bt-gap-chase',
        label: 'Vertical Chase (Jarak Ekstrem dari EMA)',
        ilmu: 'Basis sunyi -> 12+ lilin vertikal hampir tanpa koreksi -> jarak dari EMA21 ekstrem -> mean reversion tak tertahankan.',
        jebakan: 'Chase FOMO; pro yang menunggu "pullback sehat" justru dilikuidasi leverage saat reversion datang sekaligus.',
        tandaTangan: 'dist EMA21 >= 3.5 ATR + RSI >= 85 + volClimax + consecutiveUp >= 5'
    },
    {
        id: 'bt-reacc-fake',
        label: 'Fake Re-Accumulation (Range Puncak)',
        ilmu: 'Range lebar di puncak dengan rally gagal berulang & volume merah > hijau -> dorongan terakhir menembus tepi atas tanpa keyakinan.',
        jebakan: 'Terbaca "re-accumulation selesai, siap markup"; sebenarnya posisi besar dilepas di setiap rally gagal.',
        tandaTangan: 'volAsym zona atas negatif + klaster wick >= 3 + breakout volZ <= 0.3'
    },
    {
        id: 'bt-triple-test',
        label: 'Triple Test Puncak (Exhaustion)',
        ilmu: 'Tiga kali menguji resistance yang sama: volume & badan makin menyusut, RSI makin rendah -> tolakan ketiga = titik balik.',
        jebakan: 'Setiap tes "tampak breakout berikutnya"; pembeli di tes ketiga menanggung seluruh markdown.',
        tandaTangan: 'klaster tolakan >= 3 di puncak + closes LH + volume tes menyusut + volZ breakout <= 0.5'
    }
];
const BT_GUARD_ARCHES = [
    {
        id: 'g-real-break',
        label: 'GUARD: Breakout Sehat Volume Besar',
        ilmu: 'Range -> breakout dengan volume >= 1.5 sigma, ekstensi moderat, RSI sehat -> retest TAHAN -> lanjut.',
        jebakan: '(Kontrol anti-bias) otak TIDAK boleh menuduh trap pada breakout bervolume nyata — ini momentum asli.',
        tandaTangan: 'volZ breakout >= 1.2 + dist EMA21 <= 2.2 + tanpa divBear + badan penuh'
    },
    {
        id: 'g-healthy-flag',
        label: 'GUARD: Bull Flag Sehat',
        ilmu: 'Pole kuat -> flag landai dengan volume HIJAU tetap menguasai -> breakout flag bervolume -> lanjut.',
        jebakan: '(Kontrol anti-bias) flag dengan aliran pembeli adalah continuation, bukan distribusi.',
        tandaTangan: 'mom24 kuat + volAsym5 hijau >= 0 + netto flag tertahan'
    },
    {
        id: 'g-pullback',
        label: 'GUARD: Pullback Sehat dalam Uptrend',
        ilmu: 'Uptrend HH/HL -> koreksi volume kering bertahan di atas HL -> lilin pembalikan hijau.',
        jebakan: '(Kontrol anti-bias) koreksi dalam tren naik bukan reversal — mom50 positif melindunginya.',
        tandaTangan: 'mom50 >= +2 ATR + dist EMA21 kecil + struktur HL utuh'
    }
];
const DIFF_CYCLE = [
    'MUDAH',
    'SEDANG',
    'BRUTAL',
    'GILA',
    'SEDANG',
    'BRUTAL',
    'MUDAH',
    'GILA',
    'BRUTAL'
];
const BT_DIFF_CFG = {
    MUDAH: {
        noise: 0.55,
        subtle: 1.15,
        conviction: 0
    },
    SEDANG: {
        noise: 1.0,
        subtle: 1.0,
        conviction: 0
    },
    BRUTAL: {
        noise: 1.5,
        subtle: 0.88,
        conviction: 1
    },
    GILA: {
        noise: 2.1,
        subtle: 0.78,
        conviction: 2
    }
};
class Pen {
    p0;
    u;
    candles;
    constructor(p0, u){
        this.p0 = p0;
        this.u = u;
        this.candles = [];
    }
    get p() {
        const n = this.candles.length;
        return n ? this.candles[n - 1].c : this.p0;
    }
    add(o, c, uw, lw, v) {
        const h = Math.max(o, c) + Math.max(0, uw);
        const l = Math.min(o, c) - Math.max(0, lw);
        this.candles.push({
            t: this.candles.length,
            o,
            h,
            l,
            c,
            v: Math.max(0.05, v)
        });
    }
    get n() {
        return this.candles.length;
    }
}
function step(pen, r, u, dC, wUu, wLu, v, cfg) {
    const o = pen.p;
    const c = o + dC + r.normal() * 0.16 * u * cfg.noise;
    const uw = Math.max(0.02, (wUu + Math.abs(r.normal()) * 0.1) * u * cfg.subtle);
    const lw = Math.max(0.02, (wLu + Math.abs(r.normal()) * 0.1) * u * cfg.subtle);
    pen.add(o, c, uw, lw, Math.max(0.25, (v + r.normal() * 0.25) * (1 + Math.abs(r.normal()) * 0.3)));
}
function precise(pen, o, c, uw, lw, v) {
    pen.add(o, c, uw, lw, Math.max(0.25, v));
}
const volCalm = (r)=>0.75 + Math.abs(r.normal()) * 0.3;
function boundRange(pen, r, u, cfg, lo, hi, n, vol, rejectEdge = null, wickU = 0.7) {
    for(let i = 0; i < n; i++){
        const nearTop = pen.p > hi - 0.5 * u;
        const nearBot = pen.p < lo + 0.5 * u;
        let dC = r.normal() * 0.22 * u;
        if (nearTop) dC = -Math.abs(dC) - 0.08 * u;
        if (nearBot) dC = Math.abs(dC) + 0.08 * u;
        const wU = rejectEdge === 'atas' && nearTop ? wickU : 0.2;
        const wL = rejectEdge === 'bawah' && nearBot ? wickU : 0.2;
        step(pen, r, u, dC, wU, wL, vol * (0.85 + r.next() * 0.3), cfg);
    }
}
function upLegs(pen, r, u, cfg, legs, up, dn, vol) {
    for(let k = 0; k < legs; k++){
        for(let i = 0; i < 3; i++)step(pen, r, u, up * u * (0.85 + r.next() * 0.3), 0.15, 0.15, vol * (1 + i * 0.08), cfg);
        step(pen, r, u, -dn * u, 0.18, 0.22, vol * 0.7, cfg);
    }
}
function downLegs(pen, r, u, cfg, legs, dn, up, vol) {
    for(let k = 0; k < legs; k++){
        for(let i = 0; i < 3; i++)step(pen, r, u, -dn * u * (0.85 + r.next() * 0.3), 0.18, 0.2, vol * (1.1 + i * 0.1), cfg);
        step(pen, r, u, up * u, 0.22, 0.16, vol * 0.65, cfg);
    }
}
function collapseHorizon(pen, r, u, cfg, engulF, legs) {
    const o = pen.p;
    pen.add(o, o - engulF * u, 0.14 * u, 0.12 * u, 2.8 + r.next() * 0.8);
    for (const d of legs){
        const relief = d > 0;
        step(pen, r, u, d * u, relief ? 0.25 : 0.2, relief ? 0.2 : 0.24, relief ? 0.85 : 1.55, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    if (pen.candles.length !== BT_TOTAL) {
        throw new Error(`horizon runtuh: ${pen.candles.length} candle (harus ${BT_TOTAL})`);
    }
}
function rallyHorizon(pen, r, u, cfg, push, legs) {
    const o = pen.p;
    pen.add(o, o + push * u, 0.1 * u, 0.12 * u, 2.6 + r.next() * 0.6);
    for (const d of legs){
        const dip = d < 0;
        step(pen, r, u, d * u, dip ? 0.22 : 0.16, dip ? 0.26 : 0.14, dip ? 0.9 : 1.45, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    if (pen.candles.length !== BT_TOTAL) {
        throw new Error(`horizon rally: ${pen.candles.length} candle (harus ${BT_TOTAL})`);
    }
}
// ------------------------------------------------------------
// perakitan suite
// ------------------------------------------------------------
const TRAP_ORDER = [
    'bt-classic',
    'bt-strong-exhaust',
    'bt-sweep-high',
    'bt-double-top',
    'bt-parabolic',
    'bt-relief-rally',
    'bt-flag-fail',
    'bt-squeeze-vacuum',
    'bt-utad',
    'bt-gap-chase',
    'bt-reacc-fake',
    'bt-triple-test'
];
// 12 arketipe x 8 = 96 + 4 ekstra (arketipe paling ikonik pembunuh pro) = 100
const TRAP_COUNTS = [
    9,
    9,
    8,
    8,
    8,
    8,
    9,
    8,
    8,
    9,
    8,
    8
];
function slotFor(num) {
    let rem = num;
    for(let i = 0; i < TRAP_ORDER.length; i++){
        if (rem <= TRAP_COUNTS[i]) return {
            arch: TRAP_ORDER[i],
            k: rem - 1
        };
        rem -= TRAP_COUNTS[i];
    }
    throw new Error(`nomor ujian tak valid: ${num}`);
}
function btNetProfitPct(decision, entry, exit) {
    const move = exit / entry - 1;
    if (decision === 'NAIK') {
        // long: beli di entry (fee beli), jual di exit (fee jual)
        return (exit / entry * (1 - FEE_BUY) * (1 - FEE_SELL) - 1) * 100;
    }
    // short/jual: masuk di entry, tutup di exit — fee beli & jual tetap dihitung
    return (-move - FEE_BUY - FEE_SELL) * 100;
}
function totalFeePct() {
    return (FEE_BUY + FEE_SELL) * 100;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/kompleks-forge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/lib/exam/composite-forge.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CG_HORIZON",
    ()=>CG_HORIZON,
    "CG_SIZE",
    ()=>CG_SIZE,
    "CG_TOTAL",
    ()=>CG_TOTAL,
    "CG_VISIBLE",
    ()=>CG_VISIBLE,
    "FEE_BUY",
    ()=>FEE_BUY,
    "FEE_SELL",
    ()=>FEE_SELL,
    "deceitDoji",
    ()=>deceitDoji,
    "deceitEngulfHijau",
    ()=>deceitEngulfHijau,
    "deceitEngulfMerah",
    ()=>deceitEngulfMerah,
    "deceitPinAtas",
    ()=>deceitPinAtas,
    "deceitPinBawah",
    ()=>deceitPinBawah,
    "simBaitTrade",
    ()=>simBaitTrade,
    "simCgTrade",
    ()=>simCgTrade,
    "totalFeePct",
    ()=>totalFeePct
]);
// ============================================================
// UJIAN GABUNGAN 4 ASPEK — "1 ujian = 1 koin = SEMUA jebakan
// BEKERJA BERSAMAAN": STOP HUNT / LIQUIDITY GRAB + BULL TRAP +
// BEAR TRAP + CANDLE DECEPTION dalam satu chart. Inilah kondisi
// yang membuat trader profesional dilikuidasi & frustrasi.
//
// Anatomi gauntlet (setiap ujian, urutan bervariasi):
//   A. BASE RANGE      — pool likuiditas dua sisi (equal highs/lows
//                        atau tepi range lebar) + LILIN MENIPU
//                        (fake engulf, doji, pin bar salah arah)
//   B. TRAP #1         — BULL TRAP (tembus atas lalu dicabut) /
//                        BEAR TRAP (cermin) — menabung likuiditas
//   C. TRAP #2         — cerminnya — melahirkan pool rantai
//   D. STOP HUNT FINAL — sapuan mendalam pool rantai (kaskade
//                        stop) dgn volume klimaks
//   E. KEPUTUSAN       — otak memilih ENTRY / WAIT / SKIP +
//                        MENYATAKAN STOP LOSS (bisa DILIKUIDASI!)
//   F. HORIZON 14      — resolusi dari DATA
//
// BEDA DARI UJIAN SEBELUMNYA: rencana trade kini WAJIB membawa
// STOP LOSS. Stop tersentuh sebelum target = LIKUIDASI. Inilah
// pertanyaan Guru: "apakah kita terliquidasi ataukah lulus?"
//
// Protokol anti-hindsight: 60 candle VISIBLE + 14 HORIZON; truth
// SELALU dari data; fee buy 0.1% + fee sell 0.1% — hasil akhir
// SELALU NET (profit kotor tidak pernah dipakai).
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/rng.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/bulltrap-forge.ts [app-client] (ecmascript)");
;
;
const CG_VISIBLE = 60;
const CG_HORIZON = 14;
const CG_TOTAL = CG_VISIBLE + CG_HORIZON;
const CG_SIZE = 100;
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
        // KONSERVATIF & JUJUR: satu lilin menyentuh keduanya -> STOP dulu (kita bukan pembaca keberuntungan)
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
    return coreTrade(arah, close60, stopPct, targetPct, horizon, CG_VISIBLE - 1);
}
function simCgTrade(plan, close60, horizon, bait) {
    if (plan.aksi === 'SKIP') {
        const b = simBaitTrade(bait, close60, horizon);
        return NO_TRADE((b.netPct ?? 0) <= 0 || b.stopHit);
    }
    if (plan.aksi === 'ENTRY') return coreTrade(plan.arah, close60, plan.stopPct, plan.targetPct, horizon, CG_VISIBLE - 1);
    const lvl = plan.triggerLevel ?? close60;
    const ok0 = plan.arah === 'NAIK' ? close60 >= lvl : close60 <= lvl;
    if (ok0) return {
        ...coreTrade(plan.arah, close60, plan.stopPct, plan.targetPct, horizon, CG_VISIBLE - 1),
        mode: 'WAIT-HIT'
    };
    for(let i = 0; i < Math.min(8, horizon.length); i++){
        const c = horizon[i].c;
        const ok = plan.arah === 'NAIK' ? c >= lvl : c <= lvl;
        if (ok) {
            const led = coreTrade(plan.arah, c, plan.stopPct, plan.targetPct, horizon.slice(i + 1), CG_VISIBLE + i);
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
function deceitEngulfMerah(pen, r, u) {
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o - 0.85 * u, 0.06 * u, 0.08 * u, 1.35 + r.next() * 0.3);
}
function deceitEngulfHijau(pen, r, u) {
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + 0.85 * u, 0.08 * u, 0.06 * u, 1.35 + r.next() * 0.3);
}
function deceitDoji(pen, r, u) {
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + (r.chance(0.5) ? 0.03 : -0.03) * u, 0.34 * u, 0.34 * u, 0.7 + r.next() * 0.25);
}
function deceitPinAtas(pen, r, u) {
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o - 0.12 * u, 0.62 * u, 0.07 * u, 0.95 + r.next() * 0.3);
}
function deceitPinBawah(pen, r, u) {
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + 0.12 * u, 0.07 * u, 0.62 * u, 0.95 + r.next() * 0.3);
}
;
var _c;
__turbopack_context__.k.register(_c, "NO_TRADE");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/kompleks-gens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// GENERATOR GAUNTLET KOMPLEKS 5 ASPEK — anatomi satu rangkaian:
//
//   A  0..11   BASE RANGE (band dua sisi) + 2 lilin menipu
//   B  12..16  BULL TRAP      — tembus band atas -> dicabut
//   C  17..18  regroup (doji menipu)
//   D  19..23  BEAR TRAP      — tembus band bawah -> pulih
//                             -> MELAHIRKAN POOL RANTAI (pl)
//   E  24..30  PUMP-1         — markup impuls, volume menaik
//   F  31..37  PUMP-2 + FALSE BREAKOUT — akselerasi vertikal,
//                             menembus puncak struktural (lvlFbo)
//                             lalu DICABUT dalam 2 lilin
//   G  38..44  DUMP           — markdown pasca-pump, tekanan jual
//                             -> stop-loss korban pump lahir
//   H  45..55  GRIND + lilin menipu + penyeteman ke pool rantai
//   I  56..59  STOP HUNT FINAL (sapuan pool rantai, vol klimaks)
//   HORIZON 14 — resolusi dari data (REVERSAL / CASCADE / FAKE /
//                DOUBLE / PUMPW2 / ABSORB)
//
// INTERAKSI 5 ASPEK: bull trap menabung likuiditas atas; bear
// trap melahirkan pool rantai bawah; pump menciptakan korban
// FOMO; false breakout menampung pembeli terakhir di puncak;
// dump mengubah mereka menjadi stop-loss cluster; stop hunt
// final memanen seluruh cluster di pool rantai.
// ============================================================
__turbopack_context__.s([
    "genKompleks",
    ()=>genKompleks,
    "klHorizonAbsorb",
    ()=>klHorizonAbsorb,
    "klHorizonCascade",
    ()=>klHorizonCascade,
    "klHorizonDouble",
    ()=>klHorizonDouble,
    "klHorizonFake",
    ()=>klHorizonFake,
    "klHorizonPumpw2",
    ()=>klHorizonPumpw2,
    "klHorizonRev",
    ()=>klHorizonRev
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/bulltrap-forge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/exam/composite-forge.ts [app-client] (ecmascript) <locals>");
;
;
const A_N = 12;
const B_N = 5;
const C_N = 2;
const D_N = 5;
const E_N = 7;
const F_N = 7;
const G_N = 7;
const H_N = 11 // 6 grind + 1 deceit + 2 setem(+2 ekstra setem)
;
const I_N = 4;
function genKompleks(pen, r, u, cfg, opts) {
    const s = opts.dir === 'NAIK' ? 1 : -1;
    const half = (opts.wide ? 1.9 : 1.3) * u;
    const pScale = opts.pumpScale ?? 1.0;
    const p0 = pen.p;
    const deceit = [];
    const mir = (dC, wu, wl, vol)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * dC, s === 1 ? wu : wl, s === 1 ? wl : wu, vol, cfg);
    const precM = (dCu, wu, wl, vol)=>{
        const o = pen.p;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + s * dCu * u, s === 1 ? wu : wl, s === 1 ? wl : wu, vol);
    };
    const deceitUp = ()=>s === 1 ? {
            engulf: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deceitEngulfMerah"],
            pin: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deceitPinAtas"]
        } : {
            engulf: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deceitEngulfHijau"],
            pin: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deceitPinBawah"]
        };
    // ---------- FASE A: BASE RANGE ----------
    const dUp = deceitUp();
    for(let i = 0; i < A_N; i++){
        const midI = p0;
        const hiI = midI + half;
        const loI = midI - half;
        const slot = deceit.length < 2 && (i === 4 || i === 9);
        const wickSlot = opts.wickCluster && (i === 6 || i === 10);
        if (slot) {
            const kind = i === 9 ? 'doji-purba' : s === 1 ? 'fake-engulf-merah' : 'fake-engulf-hijau';
            if (kind === 'doji-purba') (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deceitDoji"])(pen, r, u);
            else dUp.engulf(pen, r, u);
            deceit.push({
                i: pen.candles.length - 1,
                kind
            });
            continue;
        }
        if (wickSlot) {
            if (s === 1) {
                const dToLo = Math.max(-0.45 * u, Math.min(0.45 * u, loI + 0.12 * u - pen.p));
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, dToLo, 0.14, 0.58, 1.0, cfg);
            } else {
                const dToHi = Math.max(-0.45 * u, Math.min(0.45 * u, hiI - 0.12 * u - pen.p));
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, dToHi, 0.58, 0.14, 1.0, cfg);
            }
            continue;
        }
        const pull = Math.max(-0.5, Math.min(0.5, (midI - pen.p) / u)) * 0.6 * u;
        let dC = pull + r.normal() * 0.2 * u;
        const nearTop = pen.p > hiI - 0.4 * u;
        const nearBot = pen.p < loI + 0.4 * u;
        if (nearTop) dC = -Math.abs(dC) - 0.1 * u;
        if (nearBot) dC = Math.abs(dC) + 0.1 * u;
        const wu = nearTop ? 0.5 : 0.16;
        const wl = nearBot ? 0.5 : 0.16;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, dC, wu, wl, 0.75 + r.next() * 0.3, cfg);
    }
    // ---------- FASE B: BULL TRAP (tembus atas -> dicabut) ----------
    const bDari = pen.candles.length;
    mir(0.85, 0.16, 0.18, 1.5);
    mir(0.7, 0.15, 0.15, 1.7);
    precM(0.18, 0.18, 0.14, 0.55); // "breakout hold" volume KERING
    mir(-1.15, 0.2, 0.16, 1.85); // pencabutan
    mir(-0.4, 0.22, 0.18, 1.1);
    const bKe = pen.candles.length - 1;
    // ---------- FASE C: REGROUP ----------
    for(let i = 0; i < C_N; i++){
        if (i === 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$composite$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deceitDoji"])(pen, r, u);
            deceit.push({
                i: pen.candles.length - 1,
                kind: 'doji-purba'
            });
        } else mir(0.12, 0.18, 0.18, 0.9);
    }
    // ---------- FASE D: BEAR TRAP — PELAHIR POOL RANTAI ----------
    const dDari = pen.candles.length;
    mir(-0.8, 0.16, 0.2, 1.6);
    mir(-0.75, 0.16, 0.22, 1.75);
    mir(-0.9, 0.16, 0.3, 1.95); // tusukan di bawah band
    precM(-0.05, 0.14, 0.2, 0.6); // bertahan di luar (umpan breakdown)
    mir(1.25, 0.14, 0.3, 1.95); // pemulihan — jebakan resmi
    const dKe = pen.candles.length - 1;
    const dCandles = pen.candles.slice(dDari, dKe + 1);
    const pl = s === 1 ? Math.min(...dCandles.map((c)=>c.l)) : Math.max(...dCandles.map((c)=>c.h));
    // ---------- FASE E: PUMP-1 (markup impuls, volume menaik) ----------
    const eDari = pen.candles.length;
    const eLegs = [
        1.1,
        0.95,
        0.85,
        -0.35,
        1.0,
        0.9,
        -0.3
    ];
    for(let i = 0; i < E_N; i++){
        const d = eLegs[i] * pScale;
        const up = d > 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, up ? 0.12 : 0.2, up ? 0.2 : 0.12, up ? 1.35 + i * 0.16 : 0.85, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    const eKe = pen.candles.length - 1;
    // ---------- FASE F: PUMP-2 + FALSE BREAKOUT (7 candle) ----------
    //   akselerasi 3 candle -> stall -> TEMBUS puncak struktural
    //   -> PENCABUTAN -> konfirmasi jatuh (LH mikro)
    const fDari = pen.candles.length;
    const preF = pen.candles.slice(0, fDari);
    // level false breakout: puncak struktural (NAIK) / dasar struktural (TURUN-cermin)
    const lvlFbo = s === 1 ? Math.max(...preF.map((c)=>c.h)) : Math.min(...preF.map((c)=>c.l));
    const fLegs = [
        0.85,
        0.8,
        0.75
    ] // akselerasi vertikal (price acceleration)
    ;
    for(let i = 0; i < 3; i++){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * fLegs[i] * pScale * u, 0.1, 0.16, 2.1 + i * 0.25, {
            ...cfg,
            noise: cfg.noise * 0.4
        });
    }
    precM(0.08, 0.16, 0.12, 1.2); // stall di udara — napas sebelum tembus
    // LILIN TEMBUS puncak struktural (breakout pump — vol klimaks)
    const oT = pen.p;
    const cTgt = lvlFbo + s * 0.22 * u;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, oT, cTgt, 0.3 * u, 0.1 * u, 2.9);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, oT, cTgt, 0.1 * u, 0.3 * u, 2.9);
    const idxTembus = pen.candles.length - 1;
    // LILIN PENCABUTAN — false breakout resmi (tutup kembali di bawah/atas lvlFbo)
    const oC = pen.p;
    const cCabut = lvlFbo - s * 0.42 * u;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, oC, cCabut, 0.14 * u, 0.2 * u, 2.5);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, oC, cCabut, 0.2 * u, 0.14 * u, 2.5);
    precM(-0.28, 0.12, 0.14, 0.72); // konfirmasi jatuh — LH mikro
    const fKe = pen.candles.length - 1;
    const puncakPump = s === 1 ? Math.max(...pen.candles.slice(fDari, fKe + 1).map((c)=>c.h)) : Math.min(...pen.candles.slice(fDari, fKe + 1).map((c)=>c.l));
    // ---------- FASE G: DUMP (markdown, tekanan jual pasca-pump) ----------
    const gDari = pen.candles.length;
    const gBase = opts.deepDump ? [
        -1.05,
        -0.95,
        0.22,
        -1.1,
        -1.0,
        -0.85,
        -0.7
    ] : [
        -0.85,
        -0.75,
        0.22,
        -0.9,
        -0.8,
        -0.65,
        -0.55
    ];
    for(let i = 0; i < G_N; i++){
        const d = gBase[i];
        const relief = d > 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, relief ? 0.18 : 0.12, relief ? 0.12 : 0.18, relief ? 0.9 : 1.7 + i * 0.06, {
            ...cfg,
            noise: cfg.noise * 0.45
        });
    }
    const gKe = pen.candles.length - 1;
    // ---------- FASE H: GRIND + SETEM ke pool rantai ----------
    for(let i = 0; i < 8; i++){
        if (i === 2) {
            dUp.pin(pen, r, u);
            deceit.push({
                i: pen.candles.length - 1,
                kind: 'pin-salah-arah'
            });
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * (-0.15 * u + r.normal() * 0.05 * u), 0.14, 0.16, 0.7 + r.next() * 0.25, cfg);
        }
    }
    // setem deterministik 3 candle: bagi sisa jarak ke pool (pl + 0.9u)
    const need = pl + s * 0.9 * u - pen.p;
    for (const frac of [
        0.5,
        0.3,
        0.2
    ]){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, need * frac, 0.14, 0.16, 0.85 + Math.min(0.8, Math.abs(need) / u * 0.25), cfg);
    }
    // ---------- FASE I: STOP HUNT FINAL ----------
    const iDari = pen.candles.length;
    const pierce = (0.55 + r.next() * 0.3) * u;
    let extreme = pl;
    if (opts.post === 'REVERSAL' || opts.post === 'PUMPW2') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * (-0.55 * u), 0.18, 0.22, 1.3, cfg); // pendekatan
        precM(-0.05, 0.14, 0.14, 1.0); // seteleman
        const o = pen.p;
        const cTgt2 = pl + s * 1.3 * u // badan reclaim dominan — terjangkar level pool
        ;
        const extremeTgt = pl - s * pierce;
        if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, cTgt2, 0.12 * u, Math.max(0.05 * u, o - extremeTgt), 3.1);
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, cTgt2, Math.max(0.05 * u, extremeTgt - o), 0.12 * u, 3.1);
        precM(0.3, 0.12, 0.14, 1.5); // tindak lanjut
    } else if (opts.post === 'FAKE' || opts.post === 'ABSORB') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * (-0.55 * u), 0.18, 0.22, 1.3, cfg);
        precM(-0.05, 0.14, 0.14, 1.0);
        const o = pen.p;
        const extremeTgt = pl - s * pierce;
        // sapuan ditutup SECEKIL di sisi reclaim — lemah, tanpa kekuatan
        if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, pl + 0.1 * u, 0.1 * u, Math.max(0.05 * u, o - extremeTgt), 2.1);
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, pl - 0.1 * u, Math.max(0.05 * u, extremeTgt - o), 0.1 * u, 2.1);
        precM(-0.3, 0.1, 0.1, 0.58); // LH/HL mikro — reclaim gagal extend (umpan terakhir)
    } else if (opts.post === 'CASCADE') {
        mir(-0.8, 0.12, 0.24, 2.5);
        mir(-0.85, 0.1, 0.22, 2.9);
        mir(-0.9, 0.1, 0.2, 3.3);
        const o = pen.p;
        if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, pl + 0.7 * u, 0.12 * u, 0.25 * u, 3.5);
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, pl - 0.7 * u, 0.25 * u, 0.12 * u, 3.5);
    } else {
        // DOUBLE: sweep + pantulan rapuh — sapuan kedua lahir di horizon
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * (-0.55 * u), 0.18, 0.22, 1.3, cfg);
        precM(-0.05, 0.14, 0.14, 1.0);
        const o = pen.p;
        const extremeTgt = pl - s * pierce;
        if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, pl + 0.6 * u, 0.35 * u, Math.max(0.05 * u, o - extremeTgt), 2.2);
        else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, pl - 0.6 * u, Math.max(0.05 * u, extremeTgt - o), 0.35 * u, 2.2);
        precM(0.3, 0.12, 0.12, 0.6); // pantulan kering naik pelan
    }
    const iKe = pen.candles.length - 1;
    const iCandles = pen.candles.slice(iDari);
    extreme = s === 1 ? Math.min(...iCandles.map((c)=>c.l)) : Math.max(...iCandles.map((c)=>c.h));
    const n = pen.candles.length;
    if (n !== 60) throw new Error(`genKompleks: ${n} candle (harus 60)`);
    const bullTrap = {
        dari: bDari,
        ke: bKe
    };
    const bearTrap = {
        dari: dDari,
        ke: dKe
    };
    return {
        pl,
        extreme,
        puncakPump,
        lvlFbo,
        aspek: {
            bullTrap,
            bearTrap,
            pump: {
                dari: eDari,
                ke: fKe,
                puncak: puncakPump
            },
            dump: {
                dari: gDari,
                ke: gKe
            },
            falseBreakout: {
                dari: idxTembus,
                ke: fKe,
                level: lvlFbo
            },
            stopHunt: {
                dari: iDari,
                ke: iKe,
                poolLevel: pl
            },
            deceit
        }
    };
}
// ------------------------------------------------------------
// HORIZON 14 candle per post (resolusi dari data)
// ------------------------------------------------------------
function assertTotal(pen) {
    if (pen.candles.length !== 74) throw new Error(`horizon: ${pen.candles.length} candle (harus 74)`);
}
function klHorizonRev(pen, r, u, cfg, dir) {
    const s = dir === 'NAIK' ? 1 : -1;
    const o = pen.p;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + 0.6 * u, 0.1 * u, 0.14 * u, 2.9);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o - 0.6 * u, 0.14 * u, 0.1 * u, 2.9);
    const legs = [
        1.1,
        0.95,
        -0.28,
        0.95,
        0.85,
        -0.22,
        0.75,
        0.65,
        0.6,
        0.55,
        -0.18,
        0.5,
        0.45
    ];
    for (const d of legs){
        const relief = s * d < 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, relief ? 0.22 : 0.14, relief ? 0.16 : 0.2, relief ? 0.85 : 1.5, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    assertTotal(pen);
}
function klHorizonCascade(pen, r, u, cfg, dir) {
    const s = dir === 'NAIK' ? 1 : -1;
    const legs = [
        1.3,
        1.15,
        -0.25,
        1.0,
        0.9,
        0.8,
        -0.22,
        0.7,
        0.65,
        0.55,
        0.5,
        0.45,
        0.4,
        0.35
    ];
    for (const d of legs){
        const relief = s * d < 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, relief ? 0.24 : 0.14, relief ? 0.16 : 0.22, relief ? 0.85 : 1.55, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    assertTotal(pen);
}
function klHorizonFake(pen, r, u, cfg, dir) {
    const s = dir === 'NAIK' ? 1 : -1;
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + s * 0.15 * u, 0.1 * u, 0.1 * u, 0.62);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, pen.p, pen.p + s * -0.1 * u, 0.1 * u, 0.1 * u, 0.56);
    const o2 = pen.p;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o2, o2 + s * 0.7 * u, 0.1 * u, 0.14 * u, 2.7);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o2, o2 + s * 0.7 * u, 0.14 * u, 0.1 * u, 2.7);
    const legs = [
        1.05,
        0.9,
        -0.28,
        0.9,
        0.8,
        -0.22,
        0.7,
        0.6,
        0.55,
        0.5,
        0.45
    ];
    for (const d of legs){
        const relief = s * d < 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, relief ? 0.22 : 0.14, relief ? 0.16 : 0.2, relief ? 0.85 : 1.5, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    assertTotal(pen);
}
function klHorizonDouble(pen, r, u, cfg, dir) {
    const s = dir === 'NAIK' ? 1 : -1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * -1.25 * u, 0.14, 0.3, 2.0, {
        ...cfg,
        noise: cfg.noise * 0.5
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * -1.5 * u, 0.12, 0.28, 2.7, {
        ...cfg,
        noise: cfg.noise * 0.5
    });
    const o = pen.p;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + 2.15 * u, 0.12 * u, 0.3 * u, 3.6);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o - 2.15 * u, 0.3 * u, 0.12 * u, 3.6);
    const legs = [
        1.25,
        1.1,
        -0.28,
        1.0,
        0.9,
        -0.22,
        0.75,
        0.65,
        0.55,
        0.5,
        0.45
    ];
    for (const d of legs){
        const relief = s * d < 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, relief ? 0.22 : 0.14, relief ? 0.16 : 0.2, relief ? 0.85 : 1.55, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    assertTotal(pen);
}
function klHorizonPumpw2(pen, r, u, cfg, dir) {
    const s = dir === 'NAIK' ? 1 : -1;
    const o = pen.p;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o + 0.7 * u, 0.1 * u, 0.14 * u, 3.0);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o - 0.7 * u, 0.14 * u, 0.1 * u, 3.0);
    const legs = [
        1.1,
        1.0,
        0.9,
        -0.25,
        0.85,
        0.8,
        0.7,
        0.6,
        0.55,
        -0.2,
        0.65,
        0.6,
        0.5
    ];
    for (const d of legs){
        const dip = s * d < 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, dip ? 0.24 : 0.13, dip ? 0.18 : 0.2, dip ? 0.85 : 1.55, {
            ...cfg,
            noise: cfg.noise * 0.5
        });
    }
    assertTotal(pen);
}
function klHorizonAbsorb(pen, r, u, cfg, dir) {
    const s = dir === 'NAIK' ? 1 : -1;
    const o = pen.p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o, o - s * 0.22 * u, 0.12 * u, 0.12 * u, 0.6);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, pen.p, pen.p - s * 0.2 * u, 0.12 * u, 0.12 * u, 0.55);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, pen.p, pen.p - s * 0.18 * u, 0.14 * u, 0.1 * u, 0.5); // bounce kering menjauh dari truth, volume layu
    const o2 = pen.p;
    if (s === 1) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o2, o2 + 1.3 * u, 0.1 * u, 0.14 * u, 2.8);
    else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["precise"])(pen, o2, o2 - 1.3 * u, 0.14 * u, 0.1 * u, 2.8);
    const legs = [
        0.95,
        0.85,
        0.75,
        0.7,
        0.6,
        0.55,
        0.5,
        0.45,
        -0.2,
        0.5
    ];
    for (const d of legs){
        const relief = s * d < 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["step"])(pen, r, u, s * d * u, relief ? 0.2 : 0.14, relief ? 0.14 : 0.2, relief ? 0.85 : 1.6, {
            ...cfg,
            noise: cfg.noise * 0.45
        });
    }
    assertTotal(pen);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/kompleks-suite.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KL_DIFF_CYCLE",
    ()=>KL_DIFF_CYCLE,
    "KL_FAMILIES",
    ()=>KL_FAMILIES,
    "forgeKlExam",
    ()=>forgeKlExam,
    "forgeKlSuite",
    ()=>forgeKlSuite
]);
// ============================================================
// PERAKIT SUITE UJIAN KOMPLEKS 5 ASPEK — 100 ujian, SETIAP ujian
// memuat KELIMA aspek sekaligus: stop hunt/liquidity grab + false
// breakout + pump & dump + bear trap + bull trap (+ lilin menipu).
// Gerbang profit dari DATA (truth dari data, retry berbibit):
//   REVERSAL/CASCADE/PUMPW2 : move >= 2.6% & MFE >= 3.0% & dip-guard
//                             (dip horizon tak menembus stop
//                             struktural ekstrem - 0.7 ATR)
//   FAKE/ABSORB             : move >= 2.4% & MFE >= 2.8% & bait-MFE
//                             <= 1.3% (umpan MUSTAHIL profit net)
//   DOUBLE                  : sapuan kedua LEBIH DALAM (<= ekstrem
//                             - 1.1 ATR) + trigger menyala + sampai
//                             target + move >= 2.8% & MFE >= 3.2%
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/rng.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/bulltrap-forge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/kompleks-forge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/kompleks-gens.ts [app-client] (ecmascript)");
;
;
;
;
const KL_DIFF_CYCLE = [
    'MUDAH',
    'SEDANG',
    'BRUTAL',
    'GILA',
    'SEDANG',
    'BRUTAL',
    'MUDAH',
    'GILA',
    'BRUTAL',
    'SEDANG'
];
const DIFF_CFG = {
    MUDAH: {
        noise: 0.55,
        subtle: 1.15,
        conviction: 0
    },
    SEDANG: {
        noise: 1.0,
        subtle: 1.0,
        conviction: 0
    },
    BRUTAL: {
        noise: 1.5,
        subtle: 0.88,
        conviction: 1
    },
    GILA: {
        noise: 2.1,
        subtle: 0.78,
        conviction: 2
    }
};
const KL_FAMILIES = [
    {
        id: 'kl-rev-strong',
        label: 'Kompleks Klasik: Pump-Dump-Sweep-Reclaim',
        post: 'REVERSAL',
        ilmu: 'Bull trap menabung likuiditas atas, bear trap melahirkan pool rantai, pump markup menciptakan korban FOMO, false breakout di puncak pump menampung pembeli terakhir, dump mengubah mereka jadi stop-loss cluster, stop hunt final memanen semuanya lalu reclaim dominan — kelima aspek satu rangkaian.',
        jebakan: 'Breakout-buyer (bull trap), breakdown-seller (bear trap), FOMO pump (mid), chase puncak (false breakout), dip-buyer dump, dan short pasca-sweep — enam generasi korban dalam satu chart.',
        tanda: 'jejak pump mid-window (vol menaik + akselerasi) + false breakout puncak dicabut + dump + pool rantai disapu <= 1-2 candle + badan reclaim >= 0.55 ATR',
        opts: ()=>({}),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonRev"]
    },
    {
        id: 'kl-rev-cascade',
        label: 'Kompleks Kaskade: Likuidasi Berantai lalu V',
        post: 'CASCADE',
        ilmu: 'Gauntlet penuh + pump-dump-false-breakout, lalu kaskade panik menembus pool rantai — mesin likuidasi kehabisan bahan bakar — reclaim V raksasa pada lilin klimaks.',
        jebakan: 'Pro short momentum kaskade pasca-dump dengan leverage; kaskade adalah mesin panen stop — V-reversal melikuidasi mereka sekaligus.',
        tanda: 'kaskade merah besar + volZ klimaks + crossBack pada candle keputusan + kedalaman >= 0.8 ATR',
        opts: ()=>({}),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonCascade"]
    },
    {
        id: 'kl-rev-round',
        label: 'Kompleks Angka Bulat: Pool Psikologis',
        post: 'REVERSAL',
        ilmu: 'Seluruh rangkaian terjadi di sekitar angka psikologis; stop cluster menumpuk di bawahnya; pump & false breakout menampung korban di atas angka; stop hunt final menusuk angka bulat lalu reclaim.',
        jebakan: 'Stop 1-2 tick di bawah angka bulat — market maker melihat tumpukan itu; sapuan angka bulat = panen massal korban pump + holder.',
        tanda: 'pool rantai TEPAT di level integer + sapuan menembus angka + reclaim badan dominan',
        opts: ()=>({
                round: true
            }),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonRev"]
    },
    {
        id: 'kl-rev-wick',
        label: 'Kompleks Klaster Wick: Ekor yang Menipu',
        post: 'REVERSAL',
        ilmu: 'Base dihiasi klaster wick panjang di tepi — setiap ekor adalah stop baru; pump-false-breakout-dump menumpuk korban kedua; stop hunt final menembus SEMUA ekor sekaligus lalu reclaim.',
        jebakan: '"Support terbukti berkali-kali" — pro menumpuk posisi di klaster; sapuan final mengambil semuanya, termasuk stop korban pump.',
        tanda: 'klaster wick >= 2 di tepi + sapuan di bawah seluruh ekor + reclaim dominan',
        opts: ()=>({
                wickCluster: true
            }),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonRev"]
    },
    {
        id: 'kl-rev-range',
        label: 'Kompleks Tepi Range Lebar',
        post: 'REVERSAL',
        ilmu: 'Range lebar (bounce antar tepi >= 2.6 ATR): trap-trap lahir di tepi, pump-false-breakout-dump menempatkan korban di puncak, pool rantai di tepi disapu lalu ditolak ke arah lawan.',
        jebakan: 'Pro menjual "range broken" / membeli "breakout pump" — tepi range adalah bank likuiditas; sapuan = panen dua generasi korban.',
        tanda: 'band lebar + sapuan tepi + reclaim ke dalam range',
        opts: ()=>({
                wide: true
            }),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonRev"]
    },
    {
        id: 'kl-cont-fake',
        label: 'Kompleks Reclaim Palsu: Umpan Terakhir',
        post: 'FAKE',
        ilmu: 'Setelah pump-dump-false-breakout-gauntlet, sapuan final ditutup SEDIKIT di atas pool lalu GAGAL extend (LH mikro, volume kering) — reclaim tanpa pengikut adalah umpan terakhir sebelum lanjutan turun; pump ganda itu ternyata distribusi.',
        jebakan: 'Paling licik: penunggu-konfirmasi membeli reclaim; pro yang selamat dari bull trap, bear trap, dan dump jatuh di umpan terakhir.',
        tanda: 'reclaim nominal TAPI badan kecil + LH mikro (close terakhir turun) + volume kering + menempel level',
        opts: ()=>({}),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonFake"]
    },
    {
        id: 'kl-wait-double',
        label: 'Kompleks Sapuan Dwi-Lapis: Ujian Kesabaran',
        post: 'DOUBLE',
        ilmu: 'Setelah pump-dump-sapuan pertama, pantulan rapuh (badan kering) menggoda entry dini — lalu SAPUAN KEDUA lebih dalam mengambil stop-stop itu, BARU reclaim klimaks dan rally sejati; kelima aspek terjadi dua putaran.',
        jebakan: 'Pemburu "sweep + reclaim" masuk terlalu cepat dan DILIKUIDASI stop sempit; hanya yang menunggu konfirmasi reclaim di ATAS pantulan yang selamat.',
        tanda: 'pantulan pasca-sapu kering (badan <= 0.4 ATR, vol < 0.7x) + dua sisi pool + struktur belum aman -> WAIT dgn trigger reclaim',
        opts: ()=>({}),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonDouble"]
    },
    {
        id: 'kl-rev-pumpw2',
        label: 'Kompleks Gelombang Kedua: Pump Belum Selesai',
        post: 'PUMPW2',
        ilmu: 'Pump-dump-false-breakout tampak seperti siklus selesai, sapuan final menyapu pool — TAPI pompa isi ulang: engulf bervolume + gelombang kedua dari higher-low; dump pertama hanyalah koreksi markup.',
        jebakan: '"Pump selesai, waktunya dump" — shorting pasca-sweep melikuidasi saat gelombang kedua menyala; membedakan distribusi vs koreksi-markup adalah inti P&D.',
        tanda: 'sapuan reclaim + engulf bervolume + struktur HL dari pump + vol dorongan menaik',
        opts: ()=>({}),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonPumpw2"]
    },
    {
        id: 'kl-cont-absorb',
        label: 'Kompleks Absorpsi Puncak: Bounce yang Dijual',
        post: 'ABSORB',
        ilmu: 'Pasca-sapuan, bounce kering naik ke zona absorpsi di bawah puncak pump — setiap pembeli "reversal" ditampung penjual besar (serahan diam-diam) — lalu engulF besar membuka markdown kedua.',
        jebakan: 'Bounce tanpa volume terbaca "pulih"; padahal volume besar tanpa progres = distribusi — pemegang memakai bounce untuk lepas, pembeli baru ditawan.',
        tanda: 'bounce kering (vol < 0.65x, badan kecil) menuju zona puncak + engulF besar + tanpa reclaim struktur',
        opts: ()=>({}),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonAbsorb"]
    },
    {
        id: 'kl-rev-deepdump',
        label: 'Kompleks Dump Dalam: Lantai yang Hilang',
        post: 'REVERSAL',
        ilmu: 'Dump pasca-false-breakout lebih dalam (dua gelombang jual) — korban pump dilikuidasi dua kali — pool rantai disapu terlalu dalam, lalu reclaim dominan; kejatuhan dalam = bahan bakar V.',
        jebakan: 'Dip-buyer pertama dilikuidasi; dip-buyer kedua "sudah murah sekali" ikut ditawan; hanya reclaim dominan yang menandai dasar sejati.',
        tanda: 'dua gelombang dump + sapuan dalam + reclaim badan dominan + vol klimaks',
        opts: ()=>({
                deepDump: true
            }),
        horizon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klHorizonRev"]
    }
];
const SLOTS = KL_FAMILIES.flatMap(_c = (fam)=>{
    const out = [];
    for(let i = 0; i < 10; i++)out.push({
        fam,
        dir: i < 5 ? 'NAIK' : 'TURUN'
    });
    return out;
});
_c1 = SLOTS;
function atrVis(cs) {
    const trs = [];
    for(let i = Math.max(1, cs.length - 14); i < cs.length; i++){
        const p = cs[i - 1];
        const c = cs[i];
        trs.push(Math.max(c.h - c.l, Math.abs(c.h - p.c), Math.abs(c.l - p.c)));
    }
    return trs.reduce((a, b)=>a + b, 0) / Math.max(1, trs.length);
}
function forgeOnce(seed, fam, gDir, diff) {
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$rng$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeRng"])(seed);
    const u = 0.5;
    const pen = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$bulltrap$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pen"](100, u);
    const postGen = fam.post;
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$gens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genKompleks"])(pen, r, u, DIFF_CFG[diff], {
        dir: gDir,
        post: postGen,
        ...fam.opts(gDir)
    });
    // FAKE & ABSORB: gauntlet/pump arah gDir TERNYATA distribusi — truth = kebalikannya
    const dir = postGen === 'FAKE' || postGen === 'ABSORB' ? gDir === 'NAIK' ? 'TURUN' : 'NAIK' : gDir;
    fam.horizon(pen, r, u, DIFF_CFG[diff], dir);
    const cs = pen.candles;
    let pl = g.pl;
    let extreme = g.extreme;
    if (fam.opts(gDir).round) {
        const tgt = Math.round(pl);
        const f = tgt / pl;
        for (const c of cs){
            c.o *= f;
            c.h *= f;
            c.l *= f;
            c.c *= f;
        }
        pl = tgt;
        const gC = cs.slice(g.aspek.stopHunt.dari);
        extreme = dir === 'NAIK' ? Math.min(...gC.map((c)=>c.l)) : Math.max(...gC.map((c)=>c.h));
    }
    const entry = cs[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"] - 1].c;
    const horizon = cs.slice(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"]);
    const exit = cs[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_TOTAL"] - 1].c;
    const s = dir === 'NAIK' ? 1 : -1;
    const movePct = s * (exit / entry - 1) * 100;
    const maxHi = Math.max(...horizon.map((c)=>c.h));
    const minLo = Math.min(...horizon.map((c)=>c.l));
    const mfePct = dir === 'NAIK' ? (maxHi / entry - 1) * 100 : (1 - minLo / entry) * 100;
    const baitMfePct = dir === 'NAIK' ? (1 - minLo / entry) * 100 : (maxHi / entry - 1) * 100;
    const atr = Math.max(atrVis(cs.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"])), 1e-9);
    // dip-guard: dip horizon tidak menembus stop struktural (ekstrem - 0.7 ATR)
    const dipOk = dir === 'NAIK' ? minLo > extreme - 0.7 * atr : maxHi < extreme + 0.7 * atr;
    let extraOk = true;
    if (postGen === 'DOUBLE') {
        const first3 = horizon.slice(0, 3);
        const deep = dir === 'NAIK' ? Math.min(...first3.map((c)=>c.l)) : Math.max(...first3.map((c)=>c.h));
        extraOk = dir === 'NAIK' ? deep <= extreme - 1.1 * atr : deep >= extreme + 1.1 * atr;
        const trig = Math.max(pl + s * 0.8 * atr, entry + s * 0.25 * atr);
        let fireIdx = -1;
        for(let i = 0; i < Math.min(8, horizon.length); i++){
            const c = horizon[i].c;
            if (dir === 'NAIK' ? c >= trig : c <= trig) {
                fireIdx = i;
                break;
            }
        }
        if (fireIdx < 0) extraOk = false;
        else {
            const entryT = horizon[fireIdx].c;
            const rest = horizon.slice(fireIdx + 1);
            const far = dir === 'NAIK' ? Math.max(...rest.map((c)=>c.c)) : Math.min(...rest.map((c)=>c.c));
            extraOk = extraOk && (dir === 'NAIK' ? far >= entryT * 1.026 : far <= entryT * 0.974);
        }
    }
    const score = Math.min(movePct, mfePct) - (dipOk ? 0 : 3) - (extraOk ? 0 : 3) - (postGen === 'FAKE' || postGen === 'ABSORB' ? Math.max(0, baitMfePct - 1.3) * 4 : 0);
    return {
        candles: cs,
        entry,
        exit,
        extreme,
        pl,
        puncakPump: g.puncakPump * (fam.opts(gDir).round ? Math.round(g.pl) / g.pl : 1),
        lvlFbo: g.lvlFbo * (fam.opts(gDir).round ? Math.round(g.pl) / g.pl : 1),
        aspek: g.aspek,
        movePct,
        mfePct,
        baitMfePct,
        dipOk,
        extraOk,
        score,
        truth: dir
    };
}
function forgeWithGate(ns, fam, dir, diff) {
    let best = null;
    for(let attempt = 0; attempt < 20; attempt++){
        const seed = `${ns}::${fam.id}::${dir}::${attempt}`;
        let out;
        try {
            out = forgeOnce(seed, fam, dir, diff);
        } catch  {
            continue;
        }
        const gateOk = fam.post === 'FAKE' || fam.post === 'ABSORB' ? out.movePct >= 2.4 && out.mfePct >= 2.8 && out.extraOk && out.baitMfePct <= 1.3 : fam.post === 'DOUBLE' ? out.movePct >= 2.8 && out.mfePct >= 3.2 && out.extraOk // sapuan kedua MEMANG dirancang menembus ekstrem pertama (tanpa dipOk)
         : out.movePct >= 2.6 && out.mfePct >= 3.0 && out.dipOk;
        if (!best || out.score > best.score) best = {
            ...out,
            seed
        };
        if (gateOk) return {
            ...out,
            seed
        };
    }
    if (!best) throw new Error(`forge gagal total: ${fam.id} ${dir} ${diff}`);
    return best;
}
function forgeKlExam(num, ns = 'kl100') {
    const slot = SLOTS[(num - 1) % SLOTS.length];
    const fam = slot.fam;
    const diff = KL_DIFF_CYCLE[(num - 1) % KL_DIFF_CYCLE.length];
    const out = forgeWithGate(ns, fam, slot.dir, diff);
    const truth = out.truth;
    return {
        num,
        fam: fam.id,
        label: fam.label,
        diff,
        seed: out.seed,
        truth,
        bait: truth === 'NAIK' ? 'TURUN' : 'NAIK',
        post: fam.post,
        aspek: out.aspek,
        candles: out.candles,
        entry: out.entry,
        exit: out.exit,
        extreme: out.extreme,
        puncakPump: out.puncakPump,
        lvlFbo: out.lvlFbo,
        pl: out.pl,
        movePct: out.movePct,
        mfePct: out.mfePct,
        baitMfePct: out.baitMfePct,
        noiseFlipped: fam.post === 'FAKE' || fam.post === 'ABSORB' ? !(out.movePct >= 2.4 && out.mfePct >= 2.8 && out.extraOk && out.baitMfePct <= 1.3) : fam.post === 'DOUBLE' ? !(out.movePct >= 2.8 && out.mfePct >= 3.2 && out.extraOk) : !(out.movePct >= 2.6 && out.mfePct >= 3.0 && out.dipOk)
    };
}
function forgeKlSuite(ns = 'kl100') {
    return Array.from({
        length: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_SIZE"]
    }, (_, i)=>forgeKlExam(i + 1, ns));
}
var _c, _c1;
__turbopack_context__.k.register(_c, "SLOTS$KL_FAMILIES.flatMap");
__turbopack_context__.k.register(_c1, "SLOTS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/indicators.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// INDIKATOR TA MURNI — deterministik, tanpa dependensi.
// Semua array selalu sepanjang input; nilai awal diisi aman.
// ============================================================
__turbopack_context__.s([
    "adx",
    ()=>adx,
    "atr",
    ()=>atr,
    "bollinger",
    ()=>bollinger,
    "clamp",
    ()=>clamp,
    "ema",
    ()=>ema,
    "findSwings",
    ()=>findSwings,
    "linreg",
    ()=>linreg,
    "macd",
    ()=>macd,
    "mean",
    ()=>mean,
    "obv",
    ()=>obv,
    "percentileRank",
    ()=>percentileRank,
    "roc",
    ()=>roc,
    "rsi",
    ()=>rsi,
    "stdev",
    ()=>stdev,
    "structureScore",
    ()=>structureScore,
    "trueRange",
    ()=>trueRange
]);
function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
}
function mean(vals) {
    if (!vals.length) return 0;
    let s = 0;
    for (const v of vals)s += v;
    return s / vals.length;
}
function stdev(vals) {
    if (vals.length < 2) return 0;
    const m = mean(vals);
    let s = 0;
    for (const v of vals)s += (v - m) * (v - m);
    return Math.sqrt(s / (vals.length - 1));
}
function ema(vals, period) {
    const out = new Array(vals.length).fill(0);
    if (!vals.length) return out;
    const k = 2 / (period + 1);
    let prev = vals[0];
    out[0] = prev;
    for(let i = 1; i < vals.length; i++){
        prev = vals[i] * k + prev * (1 - k);
        out[i] = prev;
    }
    return out;
}
function roc(closes, period) {
    const out = new Array(closes.length).fill(0);
    for(let i = period; i < closes.length; i++){
        const base = closes[i - period];
        out[i] = base !== 0 ? closes[i] / base - 1 : 0;
    }
    return out;
}
function rsi(closes, period = 14) {
    const out = new Array(closes.length).fill(50);
    if (closes.length <= period) return out;
    let gain = 0;
    let loss = 0;
    for(let i = 1; i <= period; i++){
        const d = closes[i] - closes[i - 1];
        if (d >= 0) gain += d;
        else loss -= d;
    }
    gain /= period;
    loss /= period;
    out[period] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);
    for(let i = period + 1; i < closes.length; i++){
        const d = closes[i] - closes[i - 1];
        gain = (gain * (period - 1) + Math.max(d, 0)) / period;
        loss = (loss * (period - 1) + Math.max(-d, 0)) / period;
        out[i] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);
    }
    return out;
}
function macd(closes, fast = 12, slow = 26, sig = 9) {
    const ef = ema(closes, fast);
    const es = ema(closes, slow);
    const line = closes.map((_, i)=>ef[i] - es[i]);
    const signal = ema(line, sig);
    const hist = line.map((v, i)=>v - signal[i]);
    return {
        line,
        signal,
        hist
    };
}
function trueRange(candles) {
    const out = new Array(candles.length).fill(0);
    for(let i = 0; i < candles.length; i++){
        const c = candles[i];
        if (i === 0) {
            out[i] = c.h - c.l;
            continue;
        }
        const pc = candles[i - 1].c;
        out[i] = Math.max(c.h - c.l, Math.abs(c.h - pc), Math.abs(c.l - pc));
    }
    return out;
}
function atr(candles, period = 14) {
    const tr = trueRange(candles);
    const out = new Array(candles.length).fill(0);
    if (candles.length === 0) return out;
    let acc = 0;
    let count = 0;
    for(let i = 0; i < candles.length; i++){
        if (i < period) {
            acc += tr[i];
            count++;
            out[i] = acc / count;
        } else {
            out[i] = (out[i - 1] * (period - 1) + tr[i]) / period;
        }
    }
    return out;
}
function bollinger(closes, period = 20, mult = 2) {
    const n = closes.length;
    const mid = new Array(n).fill(0);
    const upper = new Array(n).fill(0);
    const lower = new Array(n).fill(0);
    const pctB = new Array(n).fill(0.5);
    const bw = new Array(n).fill(0);
    for(let i = 0; i < n; i++){
        const lo = Math.max(0, i - period + 1);
        const win = closes.slice(lo, i + 1);
        const m = mean(win);
        const sd = stdev(win);
        mid[i] = m;
        upper[i] = m + mult * sd;
        lower[i] = m - mult * sd;
        const denom = upper[i] - lower[i];
        pctB[i] = denom > 1e-12 ? (closes[i] - lower[i]) / denom : 0.5;
        bw[i] = m !== 0 ? denom / m : 0;
    }
    return {
        mid,
        upper,
        lower,
        pctB,
        bw
    };
}
function obv(candles) {
    const out = new Array(candles.length).fill(0);
    let acc = 0;
    for(let i = 0; i < candles.length; i++){
        if (i > 0) {
            if (candles[i].c > candles[i - 1].c) acc += candles[i].v;
            else if (candles[i].c < candles[i - 1].c) acc -= candles[i].v;
        }
        out[i] = acc;
    }
    return out;
}
function adx(candles, period = 14) {
    const n = candles.length;
    const out = new Array(n).fill(0);
    if (n < period * 2) return out;
    const tr = trueRange(candles);
    const plusDM = new Array(n).fill(0);
    const minusDM = new Array(n).fill(0);
    for(let i = 1; i < n; i++){
        const up = candles[i].h - candles[i - 1].h;
        const dn = candles[i - 1].l - candles[i].l;
        plusDM[i] = up > dn && up > 0 ? up : 0;
        minusDM[i] = dn > up && dn > 0 ? dn : 0;
    }
    const rma = (src)=>{
        const o = new Array(src.length).fill(0);
        let acc = 0;
        for(let i = 1; i <= period; i++)acc += src[i];
        o[period] = acc;
        for(let i = period + 1; i < src.length; i++){
            o[i] = o[i - 1] - o[i - 1] / period + src[i];
        }
        return o;
    };
    const trS = rma(tr);
    const pS = rma(plusDM);
    const mS = rma(minusDM);
    const dx = new Array(n).fill(0);
    for(let i = period; i < n; i++){
        const p = trS[i] > 0 ? 100 * pS[i] / trS[i] : 0;
        const m = trS[i] > 0 ? 100 * mS[i] / trS[i] : 0;
        const denom = p + m;
        dx[i] = denom > 1e-12 ? 100 * Math.abs(p - m) / denom : 0;
    }
    let adxAcc = 0;
    let cnt = 0;
    for(let i = period; i < Math.min(n, period * 2); i++){
        adxAcc += dx[i];
        cnt++;
    }
    out[Math.min(n, period * 2) - 1] = cnt ? adxAcc / cnt : 0;
    for(let i = period * 2; i < n; i++){
        out[i] = (out[i - 1] * (period - 1) + dx[i]) / period;
    }
    return out;
}
function linreg(vals) {
    const n = vals.length;
    if (n < 2) return {
        slope: 0,
        r2: 0
    };
    const xm = (n - 1) / 2;
    const ym = mean(vals);
    let sxy = 0;
    let sxx = 0;
    let syy = 0;
    for(let i = 0; i < n; i++){
        sxy += (i - xm) * (vals[i] - ym);
        sxx += (i - xm) * (i - xm);
        syy += (vals[i] - ym) * (vals[i] - ym);
    }
    const slope = sxx > 0 ? sxy / sxx : 0;
    const r2 = sxx > 0 && syy > 0 ? sxy * sxy / (sxx * syy) : 0;
    return {
        slope,
        r2
    };
}
function percentileRank(sample, x) {
    if (!sample.length) return 0.5;
    let below = 0;
    for (const v of sample)if (v < x) below++;
    return below / sample.length;
}
function findSwings(closes, k = 5) {
    const highs = [];
    const lows = [];
    for(let i = k; i < closes.length - k; i++){
        let isHigh = true;
        let isLow = true;
        for(let j = i - k; j <= i + k; j++){
            if (j === i) continue;
            if (closes[j] >= closes[i]) isHigh = false;
            if (closes[j] <= closes[i]) isLow = false;
        }
        if (isHigh) highs.push(closes[i]);
        if (isLow) lows.push(closes[i]);
    }
    return {
        highs,
        lows
    };
}
function structureScore(sw, atrVal) {
    const h = sw.highs;
    const l = sw.lows;
    if (h.length < 2 || l.length < 2) return 0;
    const a = Math.max(atrVal, 1e-9);
    const dh = (h[h.length - 1] - h[h.length - 2]) / a;
    const dl = (l[l.length - 1] - l[l.length - 2]) / a;
    return clamp(0.55 * clamp(dh / 2, -1, 1) + 0.45 * clamp(dl / 2, -1, 1), -1, 1);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/sakti-candle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// MICAPROFITA SAKTI-MATA — otak pemahaman CANDLE cyborg.
//
// Fungsi ujian: menerima HANYA candle yang boleh dilihat
// (point-in-time, anti-hindsight by construction), membaca
// anatomi candle & struktur, lalu memberi vonis biner
// NAIK/TURUN.
//
// ARSITEKTUR BERLAPIS (lesson-layer):
//  - LAPIS_MOMENTUM = otak asli v231.0 (pengejar momentum —
//    state "1% AI" yang dirujuk Guru). DIPERTAHANKAN sebagai
//    artefak sejarah & pembanding, TIDAK diubah.
//  - Setiap celah yang ditemukan ujian 100 grafik likuidasi
//    ditambal sebagai LAPIS_PELAJARAN baru + entri LEDGER +
//    kenaikan versi. Perkembangan diterapkan pada FILE ini.
// ============================================================
__turbopack_context__.s([
    "LEDGER_PELAJARAN",
    ()=>LEDGER_PELAJARAN,
    "SAKTI_MATA_VERSI",
    ()=>SAKTI_MATA_VERSI,
    "baselineBalikArah",
    ()=>baselineBalikArah,
    "baselineMomenNaif",
    ()=>baselineMomenNaif,
    "baselineSelaluNaik",
    ()=>baselineSelaluNaik,
    "buildCandleVision",
    ()=>buildCandleVision,
    "saktiMataVonis",
    ()=>saktiMataVonis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/indicators.ts [app-client] (ecmascript)");
;
const SAKTI_MATA_VERSI = '231.5';
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
function volClimaxAt(cs, n, k) {
    const win = cs.slice(Math.max(0, n - 21), n - 1);
    const m = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"](win.map((c)=>c.v));
    return cs[n - 1].v >= k * Math.max(m, 1e-9);
}
// LAPIS INTI v231.0 — otak momentum naif (artefak "1% AI").
// Dibiarkan apa adanya; pelajaran yang menambalnya di atas.
const LAPIS_MOMENTUM = {
    id: 'MOMENTUM-INTI',
    versi: '231.0',
    jenis: 'INTI',
    aktif (v) {
        let s = 0;
        if (v.ema9 > v.ema21) s += 0.5;
        else s -= 0.5;
        if (v.ema21SlopeAtr > 0.03) s += 0.4;
        else if (v.ema21SlopeAtr < -0.03) s -= 0.4;
        if (v.green) s += 0.25;
        else s -= 0.25;
        if (v.recentBreakUp) s += 1.1; // racun v231.0: mengejar breakout
        if (v.recentBreakDown) s -= 1.1;
        if (v.consecutiveUp >= 3) s += 0.5; // racun v231.0: FOMO
        if (v.consecutiveDown >= 3) s -= 0.5;
        if (v.hh && v.hl) s += 0.45;
        if (v.ll && v.lh) s -= 0.45;
        const arah = s >= 0 ? 'NAIK' : 'TURUN';
        return {
            arah,
            bobot: Math.min(2.2, Math.abs(s) + 0.3),
            alasan: `momentum inti: EMA ${v.ema9 > v.ema21 ? 'bull' : 'bear'}, slope ${v.ema21SlopeAtr >= 0 ? '+' : ''}${v.ema21SlopeAtr.toFixed(2)} ATR, mom12 ${v.mom12Atr.toFixed(1)} ATR`
        };
    }
};
// ===== LAPIS PELAJARAN — ditambal dari bukti bedah ujian =====
//
// SIKLUS 0 (v231.0: 37/100, 62 likuidasi) menemukan celah:
//  - Stop Hunt Support/Resistance: 0/10 + 0/10 — inti membaca wick
//    penolakan sebagai kelanjutan arah (persis cara profesional
//    dilikuidasi).
//  - Pump & Dump: 0/10 — mengejar parabolik, buta kelelahan klimaks.
//  - Kapitulasi V: 0/10 — menjual lilin kapitulasi (dasar persis).
//  - Bull Trap: 0/7 — buta breakout yang dicabut.
//  - Kaskade V & Shakeout: 0/6 + 0/10 — buta kualitas pantulan &
//    shakeout dalam tren (ditambal di siklus berikutnya).
const LAPIS_PELAJARAN = [
    {
        id: 'L1-SWEEP-LIKUIDASI',
        versi: '231.1',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti siklus 0: wick penolakan >= 30% + volume raksasa + lilin
            // pulih melawan arah lama, dekat EMA21 = sapuan stop, bukan breakout.
            if (v.lowerWickPct >= 0.25 && v.volZ >= 1.4 && v.mom12Atr < 0 && v.green && (v.bullEngulf || v.sweptLow || v.hammer) && v.distEma21Atr > -2.2 && v.posInRange >= 0.26 && !zonaBear(v)) {
                return {
                    arah: 'NAIK',
                    bobot: 2.8,
                    alasan: 'sweep likuidasi di bawah: wick menusuk low + volume raksasa + lilin pulih hijau — long lemah sudah cair, jangan ikut jual'
                };
            }
            // Reclaim lantang: badan penuh + volume raksasa merebut balik level
            // breakdown setelah dipompa (bukan wick sapu — badan engulF).
            if (v.recentBreakDown && v.failedRetest && v.green && v.bodyPct >= 0.55 && v.volZ >= 1.8 && v.mom3Atr >= 1.0 && v.netLast5Atr >= 0.4 && v.distEma21Atr >= -2.2) {
                return {
                    arah: 'NAIK',
                    bobot: 2.6,
                    alasan: `reclaim lantang: badan penuh ${v.consecutiveUp >= 1 ? 'hijau' : ''} bervolume raksasa (volZ ${v.volZ.toFixed(1)}) merebut balik level breakdown dengan aliran pulih (net5 +${v.netLast5Atr.toFixed(1)}) — penjual breakdown cair`
                };
            }
            if (v.upperWickPct >= 0.25 && v.volZ >= 1.4 && v.mom12Atr > 0 && !v.green && (v.bearEngulf || v.sweptHigh || v.shootingStar) && v.distEma21Atr < 2.2 && v.posInRange <= 0.65) {
                return {
                    arah: 'TURUN',
                    bobot: 2.8,
                    alasan: 'sweep likuidasi di atas: wick menusuk high + volume raksasa + lilin ditolak merah — short lemah sudah cair, jangan ikut beli'
                };
            }
            return null;
        }
    },
    {
        id: 'L2-KLIMAKS-KELELAHAN',
        versi: '231.1',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti siklus 0: pump mom12 +6..+7.5 ATR & dist +3.8..+4.4 ATR
            // berakhir TURUN; kapitulasi cerminnya berakhir NAIK.
            if (v.distEma21Atr >= 2.6 && v.mom12Atr >= 4.0 && (v.upperWickPct >= 0.4 || v.doji || v.shootingStar)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.8,
                    alasan: `klimaks parabolik: harga +${v.distEma21Atr.toFixed(1)} ATR dari EMA21, mom12 +${v.mom12Atr.toFixed(1)} ATR, wick kelelahan — buyer terakhir sudah masuk`
                };
            }
            if (v.distEma21Atr <= -2.6 && v.mom12Atr <= -3.8 && (v.lowerWickPct >= 0.4 || v.doji || v.hammer)) {
                return {
                    arah: 'NAIK',
                    bobot: 2.8,
                    alasan: `kapitulasi: harga ${v.distEma21Atr.toFixed(1)} ATR dari EMA21, mom12 ${v.mom12Atr.toFixed(1)} ATR, wick penyerahan — penjual terakhir sudah jual, pantulan V`
                };
            }
            return null;
        }
    },
    {
        id: 'L3-BREAKOUT-DICABUT',
        versi: '231.1',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti siklus 0: bull trap 0/7 — breakout yang dicabut kembali
            // ke dalam range adalah jebakan, bukan momentum.
            // GUARD v231.4 (bukti suite luar): (1) jangan tuduh bull-trap saat
            // grafik adalah BASIS AKUMULASI di dasar jendela penuh (posWindow
            // rendah + momentum tak meluas + HL mikro) — itu markup, bukan trap;
            // (2) jangan tuduh bull-trap saat reclaim PUMP berkuasa (4+ hijau
            // berturut di paruh atas range) — itu bear-trap terkonfirmasi.
            const reclaimPumpKuat = v.consecutiveUp >= 4 && v.posInRange >= 0.8;
            if (basisAkumulasi(v) || reclaimPumpKuat || springReclaim(v) || basisDalam(v) || zonaBull(v)) return null;
            if (v.recentBreakUp && v.failedRetest && v.distEma21Atr < 2.2 && (v.mom12Atr < 1.0 || v.posInRange < 0.45 || v.divBear && v.posInRange < 0.7) && !v.hammer && !(v.green && v.lowerWickPct >= 0.3)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.4,
                    alasan: 'bull trap: breakout baru saja DICABUT — tutup kembali di dalam range; pengejar breakout terjebak di atas'
                };
            }
            if (v.recentBreakDown && v.failedRetest && v.distEma21Atr > -2.2 && v.mom12Atr > -1.0 && v.posInRange >= 0.5 && !v.shootingStar && !(!v.green && v.upperWickPct >= 0.3)) {
                return {
                    arah: 'NAIK',
                    bobot: 2.4,
                    alasan: 'bear trap: breakdown baru saja DICABUT — tutup kembali ke paruh atas range; penjual breakdown terjebak di bawah'
                };
            }
            return null;
        }
    },
    {
        id: 'L4-SHAKEOUT-VOLUME-KERING',
        versi: '231.2',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti siklus 1 (shakeout 0/10): koreksi dalam uptrend dengan
            // volume KERING (volZ <= 0) + wick penolakan + struktur HH/HL
            // masih utuh SELALU lanjut — bukan reversal. Kebalikan kapitulasi
            // (yang volume-nya meledak).
            if (v.hammer && v.lowerWickPct >= 0.45 && v.volZ <= 0 && v.mom12Atr <= 0.3 && v.mom12Atr >= -4.6 && v.mom3Atr <= 0.3 && v.distEma21Atr > -3.0 && (v.hh || v.hl || v.sweptLow) && !zonaBear(v)) {
                return {
                    arah: 'NAIK',
                    bobot: 2.8,
                    alasan: 'shakeout dalam uptrend: koreksi volume kering + wick penolakan di zona demand + struktur besar utuh — penurunan palsu, tren lanjut'
                };
            }
            if (v.shootingStar && v.upperWickPct >= 0.45 && v.volZ <= 0 && v.mom12Atr >= 1.0 && v.mom12Atr <= 3.5 && v.distEma21Atr < 2.4 && (v.lh || v.ll || v.sweptHigh)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.6,
                    alasan: 'upthrust dalam downtrend: rally volume kering + wick penolakan di zona supply + struktur besar utuh — kenaikan palsu, tren lanjut turun'
                };
            }
            return null;
        }
    },
    {
        id: 'L5-PANTULAN-BERKUALITAS',
        versi: '231.2',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti siklus 1 (kaskade V 0/6): setelah pendarahan, pantulan
            // 2 lilin hijau dengan BADAN PENUH & wick atas kecil = pembalikan
            // V; pantulan badan kecil + wick atas besar = kucing mati.
            if (v.mom12Atr <= -1.2 && v.consecutiveUp >= 2 && v.green && v.bodyPct >= 0.45 && v.upperWickPct <= 0.3 && v.posInRange >= 0.3 && !zonaBear(v)) {
                return {
                    arah: 'NAIK',
                    bobot: 2.6,
                    alasan: 'pantulan berkualitas pasca-pendarahan: 2 lilin hijau berturut badan penuh + wick atas kecil — pembeli besar masuk, bukan kucing mati'
                };
            }
            if (v.mom12Atr >= 1.5 && v.consecutiveDown >= 2 && !v.green && v.bodyPct >= 0.45 && v.lowerWickPct <= 0.3 && v.posInRange <= 0.7) {
                return {
                    arah: 'TURUN',
                    bobot: 2.4,
                    alasan: 'pelepasan berkualitas pasca-pompa: 2 lilin merah berturut badan penuh + wick bawah kecil — penjual besar masuk, bukan jeda'
                };
            }
            return null;
        }
    },
    {
        id: 'L7-TRAP-BALIK-KE-DALAM',
        versi: '231.4',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti suite luar A/B (bull trap TRAP salah-vonis NAIK): harga
            // breakout-up sudah ditolak dan JATUH BALIK menuju level, namun
            // satu lilin hijau kecil (sapu-low volume kering / divBear) membuat
            // inti momentum membeli lagi. Itu pantulan mati DALAM jebakan.
            const reclaimSah = v.green && v.lowerWickPct >= 0.35 && v.volZ >= 1.4 // wilayah L1, bukan di sini
            ;
            // Shakeout sejati: hammer volume-kering = tanda penyerahan penjual
            // justru di zona demand (wilayah L4) — BUKAN pantulan-mati trap.
            const shakeoutHammer = v.hammer && v.volZ <= 0;
            if (basisAkumulasi(v) || reclaimSah || shakeoutHammer || zonaBull(v) || zonaBear(v) || basisDalam(v)) return null;
            // Lengan a: jatuh-balik terbukti — 2+ merah berturut dan harga sudah
            // menutup kembali di bawah level ATAU netto 5 candle terakhir curam.
            if (v.recentBreakUp && v.consecutiveDown >= 2 && (v.failedRetest || v.netLast5Atr <= -0.8) && v.volZ <= 1.2 && v.distEma21Atr < 2.2 && (v.distEma21Atr <= -0.5 || v.netLast5Atr <= -1.8) && !(v.consecutiveUp >= 4 && v.posInRange >= 0.8)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.6,
                    alasan: `bull trap jatuh-balik: breakout ditolak, ${v.consecutiveDown} lilin merah berturut menyeret harga balik (net5 ${v.netLast5Atr.toFixed(1)} ATR) — pantulan hijau kecil hanyalah jeda dalam jebakan`
                };
            }
            // Lengan b: pump sudah meluas + divBear + lilin hijau reclaim VOLUME
            // KERING setelah masuk balik = dead-cat dalam trap, bukan pembalikan.
            if (v.recentBreakUp && !v.retestHold && v.divBear && v.mom12Atr >= 1.5 && v.distEma21Atr <= 1.2 && v.posInRange <= 0.7 && v.volZ <= 0.6) {
                return {
                    arah: 'TURUN',
                    bobot: 2.6,
                    alasan: `bull trap pantulan-mati: pump meluas (mom12 +${v.mom12Atr.toFixed(1)} ATR) tapi RSI divergen-bear & reclaim hijau volume kering (volZ ${v.volZ.toFixed(1)}) — buyer sebenarnya sudah habis`
                };
            }
            // Lengan c: level "tahan" tapi ALIRAN DANA distribusi — netto 5
            // candle curam turun + momen sesaat menjual + volume kering: breakout
            // tak lagi menarik pembeli; trap hanya menunggu waktu jatuh.
            if (v.recentBreakUp && (v.failedRetest || v.retestHold) && v.netLast5Atr <= -0.65 && v.mom3Atr <= -0.03 && v.volZ <= 0.8 && v.volAsym <= 0.3 && v.distEma21Atr < 2.4 && !shakeoutHammer && !basisAkumulasi(v) && !(v.hh && v.hl && v.distEma21Atr >= -0.5)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.5,
                    alasan: `bull trap aliran-dana: level nominal "tahan" tapi netto 5 candle ${v.netLast5Atr.toFixed(1)} ATR & momen sesaat ${v.mom3Atr.toFixed(1)} ATR menjual dengan volume kering — tak ada pembeli nyata di balik breakout`
                };
            }
            // Lengan g: kejatuhan berjalan tanpa breakout-flag — 5+ merah beruntun
            // dengan netto jual saat EMA belum berbalik: jangan beli "diskon".
            if (v.consecutiveDown >= 5 && v.netLast5Atr <= -0.8 && v.mom12Atr <= 1.6 && v.posInWindow60 >= 0.35 && Math.abs(v.ema21SlopeAtr) <= 0.06) {
                return {
                    arah: 'TURUN',
                    bobot: 2.5,
                    alasan: `kejatuhan berjalan: ${v.consecutiveDown} lilin merah berturut (net5 ${v.netLast5Atr.toFixed(1)} ATR) meski EMA belum berbalik — jangan beli diskon di tengah jurang`
                };
            }
            // Lengan d: penolakan bearish-engulf di puncak dengan VOLUME SAPUAN
            // raksasa (wilayah stop-hunt resistance GILA) — pembeli breakout
            // terakhir disedot habis; engulF volume-kering biasa TIDAK dihitung
            // (bisa jadi sekadar dip dalam tren asli).
            if (v.bearEngulf && v.volZ >= 2.0 && v.mom12Atr > 0 && v.posInRange >= 0.7) {
                return {
                    arah: 'TURUN',
                    bobot: 2.5,
                    alasan: 'sapuan klimaks di puncak: engulF merah bervolume raksasa menyedot pembeli breakout terakhir — likuidasi long di atas'
                };
            }
            // Lengan e: sapuan penolakan di pumpan MELUAS dengan struktur LH/LL —
            // pumpan tak lagi naik-sehat; wick di atas = distribusi puncak pump.
            if (v.sweptHigh && v.mom12Atr >= 3.0 && v.posInRange >= 0.8 && v.lh && v.ll && v.volAsym <= 0.5) {
                return {
                    arah: 'TURUN',
                    bobot: 2.8,
                    alasan: 'sapuan penolakan di pumpan meluas: harga menusuk high lalu tertahan dengan struktur LH/LL — buyer terakhir sudah masuk, distribusi puncak pump'
                };
            }
            // Lengan e2: pumpan meluas kehabisan napas — momen sesaat menjual,
            // netto padam, tanpa pembeli kuasa volume.
            if (v.mom12Atr >= 3.0 && v.mom3Atr <= -0.4 && v.netLast5Atr <= 0.6 && v.posInRange >= 0.8 && v.volAsym <= 0.2) {
                return {
                    arah: 'TURUN',
                    bobot: 2.5,
                    alasan: 'pumpan meluas kehabisan napas: momen sesaat menjual & netto 5 candle padam di puncak — tanpa pembeli kuasa, hanya tinggal jual'
                };
            }
            // Lengan f: puncak lelah — EMA nyaris datar, harga gagal memanjat
            // (LH, tutup merah) dengan volume jual, TANPA dorongan sisa (vZmid
            // rendah membedakan dari trap-pump yang dorongannya berVolume).
            if (v.posInWindow60 >= 0.55 && v.posInRange <= 0.4 && v.mom12Atr >= -0.7 && v.mom12Atr <= 0.3 && v.lh && !v.green && v.volZ >= 1.0 && v.volZmidMax <= 0.2 && Math.abs(v.ema21SlopeAtr) <= 0.03) {
                return {
                    arah: 'TURUN',
                    bobot: 2.4,
                    alasan: 'puncak lelah: EMA nyaris datar, LH dengan tutup merah bervolume jual, tanpa dorongan sisa — rally gagal, distribusi menunggu waktu'
                };
            }
            return null;
        }
    },
    {
        id: 'L8-MOMENTUM-BERAT',
        versi: '231.4',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti suite luar A/B (bear trap REAL salah-vonis NAIK): momentum
            // 12-candle masih -2.2..-4.6 ATR, penjual masih menguasai volume
            // (volAsym negatif), pantulan hijau kecil BERVOLUME KERING —
            // itu koreksi dalam kejatuhan nyata, bukan dasar. (Kapitulasi sejati
            // terlindung L2: harga jauh di bawah EMA21 + volume meledak.)
            // Bukti suite luar A (bear trap REAL #54): pantulan naik justru
            // DITOLAK tepat di bekas support (sapu-high) sementara penjual masih
            // kuasa volume — retest level sebagai resistance gagal, lanjut turun.
            const momBerat = v.mom12Atr <= -2.2 && v.mom12Atr >= -4.6;
            const retestTertolak = v.sweptHigh && v.mom12Atr <= -1.8;
            if (zonaBear(v) || basisDalam(v)) return null // kepala L10 pemilik zona
            ;
            if ((momBerat || retestTertolak) && v.volAsym <= -0.1 && v.consecutiveUp <= 1 && v.volZ <= 0.8 && v.distEma21Atr >= -2.4 && v.distEma21Atr <= 1.4 && !(v.hammer && v.volZ <= 0)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.5,
                    alasan: `kejatuhan berat belum selesai: mom12 ${v.mom12Atr.toFixed(1)} ATR + penjual kuasa volume (asym ${v.volAsym.toFixed(2)}) + pantulan volume kering${v.sweptHigh ? ' + retest ditolak di bekas support' : ''} — breakdown nyata, jangan beli koreksi`
                };
            }
            // Bukti suite luar B (#84 bear trap TRAP salah-vonis TURUN): reclaim
            // PUMP berkuasa (4+ hijau berturut) menembus balik level & menutup di
            // paruh atas range dengan momentum sudah pulih = bear trap terkonfirmasi.
            if ((v.recentBreakDown || v.recentBreakUp) && v.failedRetest && v.consecutiveUp >= 4 && v.posInRange >= 0.8 && v.mom12Atr >= -1.2) {
                return {
                    arah: 'NAIK',
                    bobot: 2.4,
                    alasan: `reclaim berkuasa: ${v.consecutiveUp} lilin hijau berturut merebut balik level & bertahan paruh atas range — penjual breakdown sudah terjebak, trap pulih naik`
                };
            }
            return null;
        }
    },
    {
        id: 'L9-SPRING-AKUMULASI',
        versi: '231.4',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Bukti suite luar A/B (akumulasi salah-vonis TURUN): basis datar di
            // DASAR jendela penuh (posWindow rendah) setelah downtrend, EMA21
            // mendatar, momentum netral, HL mikro / spring tersapu, harga kini di
            // paruh atas basis = markup dimulai. Berbeda dari bull-trap yang
            // jatuh dari PUNCAK jendela (posWindow tengah-atas).
            if (Math.abs(v.ema21SlopeAtr) <= 0.08 && v.distEma21Atr >= -0.6 && v.distEma21Atr <= 1.0 && v.mom12Atr >= -1.0 && v.mom12Atr <= 1.2 && v.posInWindow60 <= 0.42 && v.posInRange >= 0.5 && (v.hl || v.hh || v.sweptLow) && v.volAsym >= -0.3) {
                return {
                    arah: 'NAIK',
                    bobot: 2.6,
                    alasan: `basis akumulasi: EMA21 mendatar, harga bertahan paruh atas basis di dasar jendela penuh (posWindow ${(v.posInWindow60 * 100).toFixed(0)}%) dengan HL/spring utuh — tangan kuat sudah mengisi, markup berikutnya`
                };
            }
            // Jalur kedua: spring-reclaim langsung terbaca pada lilin keputusan
            // (sapu-low + HL + volume pembeli) meski posisi-jendela tak tipikal.
            if (springReclaim(v)) {
                return {
                    arah: 'NAIK',
                    bobot: 2.6,
                    alasan: 'spring akumulasi: sapuan low ditutup balik dengan volume pembeli + HL mikro + EMA21 datar — sapuan hanya menyapu stop penjual lemah, markup siap'
                };
            }
            // Spring pulih + aliran pembeli pulih (bukti hakim-2 #73): sapuan-tahan
            // baru saja terjadi di paruh bawah jendela dengan pembeli kembali —
            // bukan tuduhan trap.
            if (v.spring13 && v.posInWindow60 <= 0.45 && v.volAsym >= 0.25 && v.netLast5Atr >= -1.0 && v.mom3Atr >= -1.0) {
                return {
                    arah: 'NAIK',
                    bobot: 2.5,
                    alasan: 'spring pulih dengan pembeli kembali: sapuan-tahan di dasar jendela + aliran hijau membaik — akumulasi berlangsung, bukan trap'
                };
            }
            // ===== PREDIKAT AKUMULASI TERPADU v231.5 (menggantikan 6 jalur) =====
            // Anti-distribusi berlapis: mom50 (asal jendela: downtrend tua vs
            // puncak) + lowTrend12 (low Wyckoff: naik vs terus turun) + spring13.
            // Anti-trap: aliran tak boleh jatuh keras & momentum tak meluas.
            const akumulasiPenuh = v.mom50Atr <= -0.5 && (v.lowTrend12 >= -0.02 || v.spring13 && v.lowTrend12 >= -0.08) && v.posInWindow60 <= 0.55 && v.distEma21Atr >= -1.7 && v.distEma21Atr <= 1.0 && Math.abs(v.ema21SlopeAtr) <= 0.15 && v.mom12Atr >= -2.6 && v.mom12Atr <= 1.6 && v.consecutiveDown <= 4 && v.netLast5Atr >= -2.0 && v.mom3Atr >= -1.95 && v.volAsym >= -0.25;
            if (akumulasiPenuh) {
                return {
                    arah: 'NAIK',
                    bobot: 2.5,
                    alasan: `basis akumulasi terkonfirmasi: lahir dari downtrend tua (mom50 ${v.mom50Atr.toFixed(1)}), low Wyckoff ${v.lowTrend12 >= 0 ? 'naik' : 'menguat'}${v.spring13 ? ' + spring tersapu-dan-tahan' : ''}, tanpa kejatuhan keras & tanpa penjual-kuasa — markup berikutnya`
                };
            }
            // Basis dengan aliran pembeli nyata (bukti luar-F #100): posisi jendela
            // menengah-rendah tapi pembeli kuasa volume & struktur HH/HL utuh.
            if (v.posInWindow60 <= 0.8 && v.posInRange >= 0.45 && v.volAsym >= 0.1 && Math.abs(v.ema21SlopeAtr) <= 0.08 && v.distEma21Atr >= -0.6 && v.distEma21Atr <= 1.0 && v.mom12Atr >= -1.3 && v.mom12Atr <= 1.2 && (v.hl || v.hh || v.sweptLow) && v.netLast5Atr >= -1.3 && v.mom3Atr >= -1.0 && v.volZ <= 1.8) {
                return {
                    arah: 'NAIK',
                    bobot: 2.5,
                    alasan: `basis dengan aliran pembeli: volAsym +${v.volAsym.toFixed(2)} (pembeli kuasa) + struktur HH/HL utuh di bawah puncak lama — akumulasi lanjut, bukan distribusi`
                };
            }
            return null;
        }
    },
    {
        id: 'L10-KEPALA-BEAR',
        versi: '231.5',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Kepala kalibrasi untuk zona ambiguitas bear (breakdown segar +
            // pantulan di paruh atas jendela): membedakan breakdown-nyata vs
            // bear-trap-pump dari sidik jari dorongan (volume sisa, alternasi
            // return, kualitas reclaim). Dilatih dari 123 sampel point-in-time,
            // validasi leave-suite-out 94.3%, ansambel bagging 9 fit.
            if (!zonaBear(v)) return null;
            // Pantulan-POP ber-chop (bukti luar-R/S #54): pantulan KUAT tapi
            // berganti-ganti arah (rFlip >= 3) dalam flush = pop derau, bukan
            // reclaim sehat yang monotonic.
            if (v.mom12Atr <= -2.0 && v.posInWindow60 >= 0.7 && v.mom3Atr >= 0.6 && v.rFlip >= 3 && v.netLast5Atr <= 1.5) {
                return {
                    arah: 'TURUN',
                    bobot: 2.6,
                    alasan: `pantulan-pop ber-chop: lompatan kuat (mom3 +${v.mom3Atr.toFixed(1)}) tapi ${v.rFlip}x berganti arah — pop derau dalam kejatuhan, bukan reclaim sehat`
                };
            }
            // Rally-gagal di zona jual (bukti luar-S #59): 4+ hijau NAMUN ditahan
            // struktur LH/LL dengan doji kelelahan = upaya rally distribusi gagal.
            if (v.mom12Atr <= -0.5 && v.posInWindow60 >= 0.55 && v.lh && v.ll && v.consecutiveUp >= 4 && (v.doji || v.shootingStar) && v.mom3Atr <= 1.0) {
                return {
                    arah: 'TURUN',
                    bobot: 2.6,
                    alasan: 'rally gagal di zona jual: 4+ lilin hijau tertahan struktur LH/LL dan ditutup doji kelelahan — distribusi lanjut menunggu waktu'
                };
            }
            const z = skorKepala(v, KEPALA_BEAR_W, KEPALA_BEAR_B);
            const arah = z >= 0 ? 'NAIK' : 'TURUN';
            return {
                arah,
                bobot: 3.0,
                alasan: `kepala bear (z ${z >= 0 ? '+' : ''}${z.toFixed(2)}): ${arah === 'NAIK' ? 'pola dorongan reclaim menang — volume sisa naik & struktur pantulan sehat' : 'pola kejatuhan-nyata menang — pantulan tanpa dorongan volume, alternatif chop'} (bobot kalibrasi 24 suite)`
            };
        }
    },
    {
        id: 'L11-KEPALA-BULL',
        versi: '231.5',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Kepala kalibrasi untuk zona ambiguitas bull (breakout-up segar di
            // paruh atas jendela): membedakan trap-yang-mau-jatuh vs breakout
            // asli yang menahan. Dilatih dari 248 sampel point-in-time,
            // validasi leave-suite-out 97.2%, ansambel bagging 9 fit.
            if (!zonaBull(v)) return null;
            const z = skorKepala(v, KEPALA_BULL_W, KEPALA_BULL_B);
            let arah = z >= 0 ? 'NAIK' : 'TURUN';
            // Penjaga bull-REAL: kepala tak boleh menuduh trap saat pembeli KUASA
            // volume (volAsym >= 0.4) dan struktur besar masih utuh (HH/HL) —
            // TAPI hanya saat volume BUKAN sapuan klimaks (volZ <= 1.2): sapuan
            // bervolume raksasa adalah tanda stop-hunt, bukan aliran pembeli.
            if (arah === 'TURUN' && v.volAsym >= 0.4 && (v.hh || v.hl) && v.mom12Atr >= 0.8 && v.volZ <= 1.2) {
                arah = 'NAIK';
            }
            // Penjaga trap: (DIHAPUS — rFlip-5 terbukti menabrak bull-REAL #93/#73:
            // dua kolom tak terpisahkan pada fitur itu; kepala + L7c yang memutus.)
            // Penjaga dead-push (kalibrasi #33-k2 vs #93-k9/#73-k7/#53-k4):
            // lima pergantian arah + netto padam + volume dorongan sisa TINGGI
            // di bawah puncak jendela menengah = pump kehabisan bahan bakar.
            // (REAL pemulih-penuh: posWin >= 80% / vZmid rendah / vA5 positif.)
            if (arah === 'NAIK' && v.rFlip >= 5 && v.netLast5Atr <= 0.4 && v.volZmidMax >= 0.7 && v.volAsym5 <= 0.2 && v.posInWindow60 <= 0.78 && v.mom12Atr >= 2.0) {
                arah = 'TURUN';
            }
            // Penjaga akumulasi: spring tersapu-dan-TAHAN baru saja terjadi +
            // struktur HH utuh + aliran pembeli tanpa sapuan klimaks DAN tanpa
            // kejatuhan balik keras = markup, bukan trap. (Sapuan volZ raksasa =
            // stop-hunt; net5 curam/4+ merah = trap jatuh-balik.)
            if (arah === 'TURUN' && v.spring13 && v.hh && v.volZ <= 1.2 && v.volAsym >= -0.35 && v.volAsym <= 0.55 && v.netLast5Atr >= -0.6 && v.consecutiveDown <= 2) {
                arah = 'NAIK';
            }
            return {
                arah,
                bobot: 3.0,
                alasan: `kepala bull (z ${z >= 0 ? '+' : ''}${z.toFixed(2)}): ${arah === 'NAIK' ? ' breakout tahan dengan posisi & aliran sehat — bukan trap' : ' jejak distribusi sisa (volume dorongan awal + jatuh dari puncak) — trap menunggu waktu'} (bobot kalibrasi 24 suite)`
            };
        }
    },
    {
        id: 'L12-PULIH-V-PENUH',
        versi: '231.5',
        jenis: 'PELAJARAN',
        aktif (v) {
            // Zona pulih-penuh pasca-jatuh/breakdown: harga sudah kembali ke
            // puncak jendela & di atas EMA21 — pertanyaannya BUKAN arah lama,
            // tapi KUALITAS pulihan: dorongan MONOTON (rFlip rendah, net5 kuat)
            // = reclaim pump sejati (NAIK); pulihan ALTERNATIF (rFlip tinggi,
            // net5 tak meyakinkan) = bounce noise dalam kejatuhan nyata (TURUN).
            // Bukti kolom bear: TRAP pulih dengan rFlip 0-2 & net5 >= +1.1;
            // REAL pulih dengan rFlip >= 3 (chop ±).
            const zona = v.posInWindow60 >= 0.8 && v.distEma21Atr >= 1.0 && v.mom12Atr >= -1.6 && v.mom12Atr <= 1.0 && (v.recentBreakDown || v.recentBreakUp || v.fallFromTop10Atr >= 1.5) || v.mom12Atr < 0 && v.posInWindow60 >= 0.85 && v.distEma21Atr >= 1.0;
            if (!zona) return null;
            if (v.rFlip >= 3 && v.netLast5Atr <= 1.8 && v.volZmidMax <= 0.45 && (v.volAsym5 <= 0.2 || v.mom12Atr <= -1.5)) {
                return {
                    arah: 'TURUN',
                    bobot: 2.6,
                    alasan: `pulihan penuh tapi ALTERNATIF tanpa dorongan volume sisa (rFlip ${v.rFlip}, net5 ${v.netLast5Atr.toFixed(1)}, vZmid ${v.volZmidMax.toFixed(2)}) — bounce noise; kejatuhan belum selesai`
                };
            }
            if (v.rFlip <= 3 && v.netLast5Atr >= 0.4 && v.volZmidMax >= 0.55) {
                return {
                    arah: 'NAIK',
                    bobot: 2.6,
                    alasan: `pulihan dengan dorongan terukur (rFlip ${v.rFlip}, net5 +${v.netLast5Atr.toFixed(1)}, vZmid ${v.volZmidMax.toFixed(2)}) — volume sisa membuktikan pembeli besar aktif; lanjut`
                };
            }
            if (v.rFlip <= 2 && v.netLast5Atr >= 1.0) {
                return {
                    arah: 'NAIK',
                    bobot: 2.6,
                    alasan: `pulihan MONOTON berkualitas (rFlip ${v.rFlip}, net5 +${v.netLast5Atr.toFixed(1)}) — dorongan berkelanjutan ke puncak lama; breakdown sudah dipulihkan pembeli besar`
                };
            }
            return null;
        }
    }
];
/** Basis akumulasi dua-tingkat (v231.5): dasar SANGAT dalam (posWin <= 25%)
 *  mentolerir 5 merah; dasar biasa wajib aliran tenang. Dipakai L3 & L7.
 *  Kini SATU sumber kebenaran dengan predikat terpadu L9. */ function basisAkumulasi(v) {
    const inti = v.mom12Atr >= -2.6 && v.distEma21Atr <= 1.0 && v.distEma21Atr >= -1.6 && v.posInRange >= 0.25 && (v.hl || v.hh || v.sweptLow || v.lh) && v.mom50Atr <= -0.5 && (v.lowTrend12 >= -0.02 || v.spring13);
    const tierDalam = v.posInWindow60 <= 0.25 && v.consecutiveDown <= 5 && v.netLast5Atr >= -1.5 && v.mom3Atr >= -1.95 && v.mom12Atr >= -2.6;
    const tierBiasa = v.posInWindow60 <= 0.52 && v.consecutiveDown <= 3 && v.netLast5Atr >= -1.3 && v.mom3Atr >= -0.95 && v.mom12Atr <= 0.85;
    // Aliran terpadu (identik dgn L9-akumulasiPenuh)
    const penuh = v.mom50Atr <= -0.5 && (v.lowTrend12 >= -0.02 || v.spring13 && v.lowTrend12 >= -0.08) && v.posInWindow60 <= 0.55 && v.distEma21Atr >= -1.7 && v.distEma21Atr <= 1.0 && Math.abs(v.ema21SlopeAtr) <= 0.15 && v.mom12Atr >= -2.6 && v.mom12Atr <= 1.6 && v.consecutiveDown <= 4 && v.netLast5Atr >= -2.0 && v.mom3Atr >= -1.95 && v.volAsym >= -0.25;
    return penuh || inti && (tierDalam || tierBiasa);
}
const LAPIS_SAKTI = [
    LAPIS_MOMENTUM,
    ...LAPIS_PELAJARAN
];
/** v231.4 — tanda spring-reclaim: sapuan low + HL mikro + EMA21 datar &
 *  dekat + momentum netral + volume pembeli masuk. Itu akumulasi, bukan
 *  bull-trap — dipakai L3 (jangan tuduh) & L9 (vonis markup). */ function springReclaim(v) {
    return v.sweptLow && v.hl && v.posInWindow60 <= 0.75 && Math.abs(v.ema21SlopeAtr) <= 0.08 && v.distEma21Atr >= -0.6 && v.distEma21Atr <= 1.0 && v.mom12Atr >= -1.0 && v.mom12Atr <= 1.2 && v.volZ >= 0.8 && v.volAsym >= -0.3 && v.volAsym <= 0.25 && v.consecutiveDown <= 2;
}
// ============================================================
// KEPALA KALIBRASI v231.5 — dua zona ambiguitas trap yang tidak
// terpisah oleh aturan biner (bukti: 34 kesalahan dev dengan
// tanda yang saling tumpang tindih). Kepala = regresi logistik
// kecil yang DILATIH developer dari 371 sampel point-in-time
// (24 suite; label = truth data, bukan niat generator), dengan
// validasi leave-suite-out & ansambel bagging 9 fit.
// Zona = struktur; kepala = nilai; TIDAK ADA info masa depan.
// ============================================================
/** Zona bear: kejatuhan segar dari puncak + pantulan, harga kini
 *  di paruh atas jendela penuh (wilayah bear-trap). */ function zonaBear(v) {
    return v.mom12Atr <= -1.2 && v.posInWindow60 >= 0.55 && (v.rangeHigh - v.price) / v.atr >= 1.4 && v.distEma21Atr >= -2.4 && v.netLast5Atr >= -0.8 && !(v.hammer && v.volZ <= 0);
}
/** Zona bull: breakout-up segar dengan momentum memanjang, harga di
 *  paruh atas jendela penuh (wilayah bull-trap REAL vs TRAP). */ function zonaBull(v) {
    return v.recentBreakUp && v.mom12Atr >= 0.8 && v.mom12Atr <= 3.2 && v.posInWindow60 >= 0.45 && v.distEma21Atr < 2.4 && !(v.hammer && v.volZ <= 0);
}
/** Basis akumulasi yang dalam (posisi-jendela rendah) — bukan wilayah trap.
 *  Dengan guard aliran: kejatuhan KERAS (5+ merah / net5 curam) bukan "basis". */ function basisDalam(v) {
    return v.posInWindow60 <= 0.35 && v.distEma21Atr >= -1.2 && v.mom12Atr >= -2.3 && Math.abs(v.ema21SlopeAtr) <= 0.15 && v.consecutiveDown <= 3 && v.netLast5Atr >= -1.3 && v.mom3Atr >= -0.9;
}
// Urutan fitur = urutan bobot (identik dgn skrip kalibrasi).
function fiturKepala(v) {
    return [
        v.netLast5Atr,
        v.mom3Atr,
        v.mom12Atr,
        v.distEma21Atr,
        v.posInRange,
        v.volAsym,
        v.volZ,
        v.volZmidMax,
        v.bodyUp6Atr - v.bodyDn6Atr,
        v.bodyRatio3Atr,
        v.consecutiveUp,
        v.price > v.breakLevelDn ? 1 : 0,
        v.price > v.breakLevel ? 1 : 0,
        v.squeeze ? 1 : 0,
        (v.rangeHigh - v.price) / v.atr,
        v.fallFromTop10Atr,
        v.hh ? 1 : 0,
        v.hl ? 1 : 0,
        v.lh ? 1 : 0,
        v.ll ? 1 : 0,
        v.divBear ? 1 : 0,
        v.divBull ? 1 : 0,
        v.bullEngulf ? 1 : 0,
        v.bearEngulf ? 1 : 0,
        v.volAsym5,
        ...v.ret6Atr,
        v.rFlip,
        v.spring13 ? 1 : 0,
        v.mom30Atr,
        v.consecutiveDown,
        v.sweptLow ? 1 : 0,
        v.sweptHigh ? 1 : 0
    ];
}
// Bobot terlipat hasil ansambel 9 fit bootstrap (lihat scripts/kalibrasi_kepala.ts)
const KEPALA_BEAR_W = [
    0.5619,
    0.6136,
    0.1374,
    0.2623,
    2.3807,
    1.8972,
    0.2397,
    1.9651,
    0.6126,
    0.6136,
    0.2766,
    -1.3167,
    0.0000,
    -0.2474,
    -0.1554,
    -0.9660,
    -1.0282,
    -0.3911,
    -2.1491,
    0.5823,
    1.2204,
    0.0000,
    -1.1709,
    -1.5301,
    1.3182,
    0.9920,
    0.0315,
    0.3918,
    -0.6003,
    1.1297,
    0.8167,
    -0.5558,
    0.0000,
    -0.0923,
    0.4560,
    -0.1067,
    1.2670
];
const KEPALA_BEAR_B = 1.0705;
const KEPALA_BULL_W = [
    0.0935,
    0.1826,
    0.0191,
    0.2948,
    2.2302,
    0.6485,
    -0.3766,
    -1.0431,
    0.0642,
    0.1826,
    0.3416,
    0.0000,
    0.3819,
    0.7908,
    -0.6906,
    -1.0033,
    -0.0841,
    0.6353,
    0.0838,
    -0.6353,
    -0.1314,
    -0.1092,
    1.9861,
    -0.4233,
    0.4890,
    -0.2422,
    -0.3325,
    1.7378,
    -1.5248,
    0.6141,
    0.6556,
    0.8238,
    -0.3104,
    0.1063,
    -0.2125,
    -0.2325,
    -0.0624
];
const KEPALA_BULL_B = -0.7086;
function skorKepala(v, w, b) {
    const x = fiturKepala(v);
    let z = b;
    for(let j = 0; j < w.length; j++)z += w[j] * x[j];
    return z;
}
const LEDGER_PELAJARAN = [
    {
        id: 'L1-SWEEP-LIKUIDASI',
        versi: '231.1',
        siklus: 0,
        celah: 'Stop hunt 0/20: wick sapuan dibaca sebagai kelanjutan arah',
        aturan: 'wick >=30% + volZ >=1.4 + lilin pulih melawan arah lama, dekat EMA21 → ikuti arah pulihan'
    },
    {
        id: 'L2-KLIMAKS-KELELAHAN',
        versi: '231.1',
        siklus: 0,
        celah: 'Pump-dump 0/10 & kapitulasi 0/10: mengejar/menjual klimaks',
        aturan: 'dist EMA21 >=2.6 ATR + mom12 >=4 ATR + wick kelelahan → balik arah'
    },
    {
        id: 'L3-BREAKOUT-DICABUT',
        versi: '231.1',
        siklus: 0,
        celah: 'Bull trap 0/7: breakout dicabut tetap dibeli',
        aturan: 'breakout recent + tutup kembali di dalam range → arah pembalikan trap (dengan guard: mom12 searah, bukan hammer/shootingStar, bukan reclaim wick)'
    },
    {
        id: 'L4-SHAKEOUT-VOLUME-KERING',
        versi: '231.2',
        siklus: 1,
        celah: 'Shakeout 0/10: koreksi kering dalam tren dibaca reversal',
        aturan: 'hammer/shootingStar + volZ <= 0 + mom12 moderat + struktur HH/HL (atau LH/LL) utuh → tren lanjut'
    },
    {
        id: 'L5-PANTULAN-BERKUALITAS',
        versi: '231.2',
        siklus: 1,
        celah: 'Kaskade V 0/6: pantulan badan kecil dan badan penuh tak dibedakan',
        aturan: 'pasca-pendarahan: 2 lilin searah berturut + bodyPct >= 0.45 + wick lawan <= 0.3 + posisi range wajar → ikuti pantulan; else kucing mati'
    },
    {
        id: 'L6-PENAJAMAN-LOKASI',
        versi: '231.3',
        siklus: 2,
        celah: '7 kesalahan tersisa: guard terlalu kaku (wick 30%, mom12 tunggal, struktur pivot buta sapuan)',
        aturan: 'wick ambang 25%; bull-trap = lokasi dalam range / divBear; bear-trap wajib pulih ke paruh atas; shakeout mengakui sapuan sebagai struktur; pantulan wajib posisi-range >= 30%; sapuan sah = pulih ke >=35% range (distribusi macet <20%)'
    },
    {
        id: 'L7-TRAP-BALIK-KE-DALAM',
        versi: '231.4',
        siklus: 3,
        celah: 'Bull trap TRAP di suite luar (29-86%): lilin hijau kecil setelah jatuh-balik dibaca sebagai pembalikan oleh inti momentum',
        aturan: 'breakout-up ditolak + 2+ merah berturut + (dicabut ATAU net5 <= -0.8 ATR) + volume tak meledak → pantulan-mati dalam trap, TURUN; varian divBear + reclaim kering saat pump meluas → TURUN; basis akumulasi & reclaim sah L1 dikecualikan'
    },
    {
        id: 'L8-MOMENTUM-BERAT',
        versi: '231.4',
        siklus: 3,
        celah: 'Bear trap REAL di suite luar (25-50%): pantulan hijau kecil bervolume kering dalam kejatuhan -2.2..-4.6 ATR dibaca sebagai dasar',
        aturan: 'mom12 berat + volAsym penjual + pantulan volZ <= 0.8 + tak terlalu jauh dari EMA21 → breakdown nyata, TURUN; kebalikan: reclaim pump 4+ hijau paruh-atas dengan momentum pulih → bear-trap terkonfirmasi, NAIK'
    },
    {
        id: 'L9-SPRING-AKUMULASI',
        versi: '231.4',
        siklus: 3,
        celah: 'Akumulasi di Dasar di suite luar (60-70%): markup setelah spring dibaca sebagai bull-trap karena breakout mikro dicabut',
        aturan: 'posWindow60 <= 42% (dasar jendela penuh) + EMA21 mendatar + momentum netral + HL/spring utuh + posisi-range >= 50% → bukan trap, markup NAIK; pembeda struktural vs bull-trap yang jatuh dari puncak jendela'
    },
    {
        id: 'L10-MULTI-HORIZON',
        versi: '231.4',
        siklus: 3,
        celah: 'Kesalahan gabungan: keputusan diambil dari satu horizon momen (mom12) & posisi-range 20 candle saja — pendek pikir',
        aturan: 'visi kini 3 horizon: mom3 (sesaat), mom12 (tengah), net5 (serangan terkini) + posInWindow60 (lokasi struktural jendela penuh); penajaman ambang dari bukti: L1 pos-range >= 26%, L4 mom12 [-3.6,-0.5] & dist-EMA21 > -3.0 & bobot 2.8, L5 mom12 <= -1.2 & bobot 2.6; L3 dijaga anti-tuduh-basis & anti-reclaim-pump'
    },
    {
        id: 'L11-KEPALA-BULL',
        versi: '231.5',
        siklus: 4,
        celah: 'Zona ambigu bull (252 sampel): breakout menahan vs trap jatuh — tak terpisah aturan biner',
        aturan: 'kepala logistik 37 fitur (fit 100%, LSO 98.4%) + penjaga: volAsym>=0.4&HH/HL&volZ<=1.2 -> NAIK; rFlip5-netto-padam -> TURUN; spring13+HH -> NAIK'
    },
    {
        id: 'L12-PULIH-V-PENUH',
        versi: '231.5',
        siklus: 4,
        celah: 'Pulihan penuh pasca-breakdown: TRAP dorongan monoton (rFlip<=2, net5>=+1.1) vs REAL chop alternatif (rFlip>=3)',
        aturan: 'kualitas pulihan memutus arah: monoton bervolume -> NAIK; alternatif tanpa volume-sisa -> TURUN'
    },
    {
        id: 'EXAM-V2-KALIBRASI',
        versi: '231.5',
        siklus: 4,
        celah: 'Bear-trap GILA kolom #74: sinyal sisa 1-sigma di bawah noise (tak-dipelajari siapapun)',
        aturan: 'generator v2: dorongan sisa trap/real & pemulihan akumulasi diskalakan (0.4+0.6x noise) agar cerita jebakan tetap terbaca di semua difficulty — ujian mengukur kemahiran, bukan keberuntungan'
    }
];
function saktiMataVonis(cs) {
    const v = buildCandleVision(cs);
    let score = 0;
    const alasan = [];
    const pelajaranAktif = [];
    for (const lapis of LAPIS_SAKTI){
        const out = lapis.aktif(v);
        if (!out) continue;
        const sgn = out.arah === 'NAIK' ? 1 : -1;
        score += sgn * out.bobot;
        alasan.push(`[${lapis.id}] ${out.alasan}`);
        if (lapis.jenis === 'PELAJARAN') pelajaranAktif.push(lapis.id);
    }
    const arah = score > 0 ? 'NAIK' : score < 0 ? 'TURUN' : v.mom12Atr >= 0 ? 'NAIK' : 'TURUN';
    const conf = Math.min(0.95, 0.5 + Math.abs(score) * 0.085);
    return {
        arah,
        conf,
        score,
        versi: SAKTI_MATA_VERSI,
        alasan,
        pelajaranAktif
    };
}
function baselineSelaluNaik(cs) {
    void cs;
    return 'NAIK';
}
function baselineMomenNaif(cs) {
    const n = cs.length;
    const d = cs[n - 1].c - cs[Math.max(0, n - 7)].c;
    return d >= 0 ? 'NAIK' : 'TURUN';
}
function baselineBalikArah(cs) {
    return baselineMomenNaif(cs) === 'NAIK' ? 'TURUN' : 'NAIK';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/stophunt-brain.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// MICAPROFITA SAKTI-STOPHUNT — otak pemahaman STOP HUNTING /
// LIQUIDITY GRAB.
//
// Menerima HANYA candle yang boleh dilihat (point-in-time),
// MEMETAKAN area likuiditas (pool), MEMBACA anatomi sapuan,
// lalu memilih SATU dari TIGA keputusan:
//   ENTRY  — masuk sekarang (arah + target disiplin)
//   WAIT   — menunggu konfirmasi reclaim miliknya sendiri
//   SKIP   — tidak mengambil posisi
//
// ARSITEKTUR BERLAPIS:
//  - SG-CORE v1.0 = inti momentum naif (artefak "1% AI"):
//    mengejar breakdown/breakout — DIPERTAHANKAN sebagai
//    artefak sejarah & pembanding. Racunnya justru sapuan.
//  - SG-L1..L10 = pelajaran ilmu stop-hunt yang ditambal dari
//    bukti bedah ujian (semua kondisi terbaca pada candle ke-60).
//
// v2.8 (bedah r2h): (1) TOUCH-ZONE detector — pivot k=3 rapuh pada
//    equal-highs/HL (sentuhan berdekatan saling bunuh) -> kini pool
//    juga ditambang dari ZONA SENTUH (klaster harga h/l dalam 0.18
//    ATR, min 2 sentuhan, dedupe thd pool pivot); (2) SORT BARU
//    berbasis KESEGARAN: peristiwa penolakan-balik yang TERJADI pada
//    candle terakhir = rank 0, sapuan <= 4 candle = rank 1 — pool
//    basi tak lagi mencuri 'active' lewat kedekatan ekstrem;
//    (3) SG-L10: sapuan atas yang gagal ditahan (cross-back) atau
//    sapuan segar ditolak keras = TURUN, tanpa gerbang volume;
//    (4) L6 vakum diperluas: mom50 >= 0.8 (uptrend + sapuan di
//    bawah + tanpa kepanikan = vakum likuiditas).
// ============================================================
__turbopack_context__.s([
    "SG_BRAIN_VERSI",
    ()=>SG_BRAIN_VERSI,
    "buildSgVision",
    ()=>buildSgVision,
    "sgBaselineCore",
    ()=>sgBaselineCore,
    "sgVonis",
    ()=>sgVonis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/indicators.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$sakti$2d$candle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/sakti-candle.ts [app-client] (ecmascript)");
;
;
const SG_BRAIN_VERSI = '2.9.4';
function sdOf(arr) {
    return arr.length > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stdev"](arr) : 1e-9;
}
/** tier kesegaran pool utk pemilihan active:
 *  0 = peristiwa penolakan-balik TERJADI pada candle terakhir, atau sapuan
 *      <= 1 candle yang langsung ditutup balik jauh (>= 0.5 ATR)
 *  1 = sapuan <= 4 candle  ·  2 = <= 8 candle  ·  3 = lebih tua */ function rankOf(p) {
    if (p.crossBack) return 0;
    if (p.barsSince <= 1 && p.reclaimed && Math.abs(p.closeDistAtr) >= 0.5) return 0;
    if (p.barsSince <= 4) return 1;
    if (p.barsSince <= 8) return 2;
    return 3;
}
/** deteksi pivot index (k=3) */ function pivotIdx(cs, kind) {
    const out = [];
    const n = cs.length;
    for(let i = 3; i < n - 3; i++){
        let ok = true;
        for(let k = 1; k <= 3; k++){
            if (kind === 'low' ? cs[i].l > cs[i - k].l || cs[i].l > cs[i + k].l : cs[i].h < cs[i - k].h || cs[i].h < cs[i + k].h) {
                ok = false;
                break;
            }
        }
        if (ok) out.push(i);
    }
    return out;
}
/** klaster pivot ke dalam pool (toleransi 0.3 ATR); level = MEDIAN harga pivot
 *  (kebal pivot derau tunggal yang menggeser min/max) */ function clusterPivots(cs, idxs, kind, atr) {
    const px = (i)=>kind === 'low' ? cs[i].l : cs[i].h;
    const sorted = [
        ...idxs
    ].sort((a, b)=>px(a) - px(b));
    const clusters = [];
    for (const i of sorted){
        const last = clusters[clusters.length - 1];
        if (last && Math.abs(px(i) - last.level) <= 0.3 * atr) {
            last.idxs.push(i);
        } else clusters.push({
            level: px(i),
            idxs: [
                i
            ]
        });
    }
    for (const cl of clusters){
        const prices = cl.idxs.map(px).sort((a, b)=>a - b);
        // MODE: harga sentuhan presisi (lilin anatomi exact) mengulang nilai yang sama —
        // pivot derau bernilai unik. Mode dipakai bila dominan; kalau tidak, median.
        const counts = new Map();
        for (const p of prices)counts.set(p, (counts.get(p) ?? 0) + 1);
        let modeVal = prices[0];
        let modeCnt = 0;
        for (const [val, cnt] of counts){
            if (cnt > modeCnt || cnt === modeCnt && Math.abs(val - prices[Math.floor(prices.length / 2)]) < Math.abs(modeVal - prices[Math.floor(prices.length / 2)])) {
                modeVal = val;
                modeCnt = cnt;
            }
        }
        const mid = Math.floor(prices.length / 2);
        const median = prices.length % 2 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
        cl.level = modeCnt >= 2 && modeCnt * 2 >= prices.length ? modeVal : median;
    }
    return clusters;
}
/** TOUCH-ZONE: tambang klaster harga (h & l candle) dalam toleransi
 *  kecil — kebal pivot k=3 yang rapuh pada equal-highs/HL (sentuhan
 *  berdekatan saling bunuh). Dua tahap: pasangan benih (<= 0.12 ATR),
 *  lalu serap sentuhan berikutnya dalam 0.18 ATR dari median. */ function mineTouchZones(win, atr) {
    const touches = [];
    const zWin = win.slice(0, Math.max(0, win.length - 6)) // 6 candle terakhir = episode sapu, bukan sejarah pool
    ;
    for (const c of zWin){
        touches.push({
            px: c.h,
            close: false
        }, {
            px: c.l,
            close: false
        }, {
            px: c.c,
            close: true
        });
    // close di level ikut MENEMUKAN zona (sentuhan badan), tapi LEVEL akhir dihitung
    // dari h/l saja agar tak digeser close yang sedikit lepas
    }
    const sorted = [
        ...touches
    ].sort((a, b)=>a.px - b.px);
    const seedTol = 0.12 * atr;
    const growTol = 0.18 * atr;
    const zones = [];
    let i = 0;
    while(i < sorted.length - 1){
        if (sorted[i + 1].px - sorted[i].px <= seedTol) {
            const grp = [
                sorted[i],
                sorted[i + 1]
            ];
            i += 2;
            while(i < sorted.length && sorted[i].px - medianOf(grp.map((t)=>t.px)) <= growTol){
                grp.push(sorted[i]);
                i++;
            }
            const strukt = grp.filter((t)=>!t.close).map((t)=>t.px);
            const src = strukt.length ? strukt : grp.map((t)=>t.px);
            zones.push({
                level: medianOf(src),
                touches: src
            });
        } else i++;
    }
    return zones.filter((z)=>z.touches.length >= 2);
}
function medianOf(arr) {
    const s = [
        ...arr
    ].sort((a, b)=>a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
/** kunjungan ke pool + pantulan antar kunjungan */ function visitsOf(cs, level, side, atr) {
    let visits = 0;
    let inVisit = false;
    let excursion = 0;
    let maxBounce = 0;
    for (const c of cs){
        const near = side === 'BAWAH' ? c.l <= level + 0.22 * atr : c.h >= level - 0.22 * atr;
        if (near && !inVisit) {
            visits++;
            inVisit = true;
            excursion = 0;
        }
        if (inVisit) {
            const exc = side === 'BAWAH' ? (c.h - level) / atr : (level - c.l) / atr;
            excursion = Math.max(excursion, exc);
            const left = side === 'BAWAH' ? (c.h - level) / atr > 0.55 : (level - c.l) / atr > 0.55;
            if (left && !near) {
                maxBounce = Math.max(maxBounce, excursion);
                inVisit = false;
            }
        }
    }
    maxBounce = Math.max(maxBounce, inVisit ? excursion : 0);
    return {
        visits,
        maxBounceAtr: maxBounce
    };
}
function nearestIntDist(x) {
    return Math.abs(x - Math.round(x));
}
/** klasifikasi jenis pool (presedensi disepakati dgn anatomi generator) */ function classifyPool(cs, v, level, side, atr, visits, maxBounceAtr, consecBig, distPullAtr, trendStruct) {
    if (nearestIntDist(level) <= 0.12 * atr) return 'round-number';
    // klaster wick: >= 3 lilin ber-wick-panjang dalam RENTANG 10 candle (klaster waktu),
    // wick >= 0.35 ATR & >= 45% range, ujungnya dekat level — sentuhan session/equal
    // tersebar jauh sehingga tak pernah 3-dalam-10
    const n = cs.length;
    const wickIdx = [];
    for(let i = Math.max(0, n - 26); i < n; i++){
        const c = cs[i];
        const range = Math.max(c.h - c.l, 1e-9);
        const wl = (Math.min(c.o, c.c) - c.l) / atr;
        const wu = (c.h - Math.max(c.o, c.c)) / atr;
        const edgeOk = side === 'BAWAH' ? Math.abs(c.l - level) <= 0.4 * atr : Math.abs(c.h - level) <= 0.4 * atr;
        if (edgeOk && side === 'BAWAH' && wl >= 0.35 && wl / range >= 0.45) wickIdx.push(i);
        if (edgeOk && side === 'ATAS' && wu >= 0.35 && wu / range >= 0.45) wickIdx.push(i);
    }
    let wickSpan = false;
    for(let a = 0; a < wickIdx.length; a++){
        let cnt = 0;
        for(let b = a; b < wickIdx.length; b++){
            if (wickIdx[b] - wickIdx[a] <= 10) cnt++;
            else break;
        }
        if (cnt >= 3) {
            wickSpan = true;
            break;
        }
    }
    if (wickSpan) return 'wick-cluster';
    // kaskade / squeeze: dorongan panik badan-besar berturut (kebal dilusi volume)
    if (side === 'BAWAH' && consecBig >= 4) return 'cascade-low';
    if (side === 'ATAS' && consecBig >= 4) return 'squeeze-high';
    // struktur HL/LH: pullback dalam ke level + konteks tren HH/LL (shakeout struktur)
    if (side === 'BAWAH' && distPullAtr >= 4 && trendStruct) return 'hl-structure';
    if (side === 'ATAS' && distPullAtr >= 4 && trendStruct) return 'hl-structure';
    // struktur sentuhan
    if (visits >= 5) return 'session-low';
    if (visits >= 2 && maxBounceAtr >= 2.15) return side === 'BAWAH' ? 'range-low' : 'range-high';
    if (visits >= 2 && maxBounceAtr >= 1) return side === 'BAWAH' ? 'equal-lows' : 'equal-highs';
    return side === 'BAWAH' ? 'swing-low' : 'swing-high';
}
function buildSgVision(cs) {
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$sakti$2d$candle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCandleVision"])(cs);
    const atr = Math.max(v.atr, 1e-9);
    const n = cs.length;
    const vols = cs.map((c)=>c.v);
    const volSd = Math.max(sdOf(vols.slice(Math.max(0, n - 30))), 1e-9);
    const lastVolZ = (cs[n - 1].v - v.volMean) / volSd;
    // dorongan panik besar
    let cd = 0, cu = 0, cdBig = 0, cuBig = 0;
    for(let i = Math.max(1, n - 20); i < n; i++){
        const red = cs[i].c < cs[i - 1].c;
        const body = Math.abs(cs[i].c - cs[i].o) / atr;
        if (red) {
            cd++;
            cdBig = body >= 0.55 ? cdBig + 1 : 0;
        } else {
            cd = 0;
            cdBig = 0;
        }
        if (!red) {
            cu++;
            cuBig = body >= 0.55 ? cuBig + 1 : 0;
        } else {
            cu = 0;
            cuBig = 0;
        }
    }
    v.consecutiveDown = Math.max(v.consecutiveDown, cd);
    v.consecutiveUp = Math.max(v.consecutiveUp, cu);
    const pools = [];
    const win = cs.slice(Math.max(0, n - 58));
    const wOff = n - win.length;
    const recentExtreme = Math.min(...cs.slice(Math.max(0, n - 8)).map((c)=>c.l));
    const recentExtremeHi = Math.max(...cs.slice(Math.max(0, n - 8)).map((c)=>c.h));
    for (const side of [
        'BAWAH',
        'ATAS'
    ]){
        const kind = side === 'BAWAH' ? 'low' : 'high';
        // pivot DIKECUALIKAN 3 candle terakhir: wick sapuan & lilin pasca-sapu bukan
        // sejarah pool — mereka tidak boleh membentuk/menggeser klaster
        const pivWin = win.slice(0, Math.max(0, win.length - 3));
        const piv = pivotIdx(pivWin, kind);
        const clusters = clusterPivots(pivWin, piv, kind, atr);
        for (const cl of clusters){
            const level = cl.level;
            const margin = 0.12 * atr;
            const pierce = (i)=>side === 'BAWAH' ? cs[i].l < level - margin : cs[i].h > level + margin;
            // EPISODE SAPUAN: pierce terakhir dalam 14 candle, lalu mundur selama harga
            // menembus / bertahan di luar level — awal episode = lilin sapuan sejati
            let lastPierce = -1;
            for(let i = n - 1; i >= Math.max(0, n - 14); i--){
                if (pierce(i)) {
                    lastPierce = i;
                    break;
                }
            }
            let sweepStart = -1;
            if (lastPierce >= 0) {
                sweepStart = lastPierce;
                while(sweepStart - 1 >= 0 && n - sweepStart <= 22){
                    const prev = cs[sweepStart - 1];
                    // lanjut mundur hanya bila lilin sebelumnya juga menembus ATAU jelas berada
                    // DI LUAR level searah sapuan (bukan sekadar di dekat level)
                    const beyond = side === 'BAWAH' ? prev.c < level - margin : prev.c > level + margin;
                    if (pierce(sweepStart - 1) || beyond) sweepStart--;
                    else break;
                }
                if (n - sweepStart > 22) sweepStart = -1;
            }
            const swept = sweepStart >= 0;
            // kunjungan dihitung SEBELUM sapuan dan excl. 2 candle tepat sebelum sapu
            // (sentuhan yang menempel ke sapuan = bagian episode, bukan sejarah pool)
            const vWin = swept ? win.slice(0, Math.max(0, sweepStart - wOff - 2)) : win;
            const { visits, maxBounceAtr } = visitsOf(vWin, level, side, atr);
            // kedalaman pullback: jarak level dari puncak/lembah 30 candle (struktur HL
            // sejati = sapuan JAUH di bawah puncak terkini; range/equal = dekat)
            const win30 = cs.slice(Math.max(0, n - 30));
            const distPullAtr = side === 'BAWAH' ? (Math.max(...win30.map((c)=>c.h)) - level) / atr : (level - Math.min(...win30.map((c)=>c.l))) / atr;
            // struktur tren: puncak 32 candle terakhir > puncak jendela sebelumnya (HH) —
            // ciri uptrend utk pool bawah; cermin utk pool atas (LL)
            const recent = cs.slice(Math.max(0, n - 32));
            const older = cs.slice(0, Math.max(0, n - 32));
            const hhStruct = older.length > 10 && Math.max(...recent.map((c)=>c.h)) > Math.max(...older.map((c)=>c.h));
            const llStruct = older.length > 10 && Math.min(...recent.map((c)=>c.l)) < Math.min(...older.map((c)=>c.l));
            const consecBig = side === 'BAWAH' ? cdBig : cuBig;
            const jenis = classifyPool(win, v, level, side, atr, visits, maxBounceAtr, consecBig, distPullAtr, side === 'BAWAH' ? hhStruct : llStruct);
            const pool = {
                side,
                jenis,
                level,
                sentuhan: visits,
                maxBounceAtr,
                swept,
                reclaimed: false,
                barsSince: swept ? n - 1 - sweepStart : -1,
                depthAtr: 0,
                closeDistAtr: 0,
                volZSweep: 0,
                volRatioSweep: 0,
                sweepBodyAtr: 0,
                postBounceMaxBodyAtr: 0,
                postVolMean: 0,
                crossBack: false,
                dariZona: false
            };
            if (swept) {
                const prevClose = n >= 2 ? cs[n - 2].c : cs[n - 1].c;
                const lastClose = cs[n - 1].c;
                pool.crossBack = side === 'ATAS' ? prevClose > level && lastClose < level && (level - lastClose) / atr >= 0.2 : prevClose < level && lastClose > level && (lastClose - level) / atr >= 0.2;
                const after = cs.slice(sweepStart);
                const extreme = side === 'BAWAH' ? Math.min(...after.map((c)=>c.l)) : Math.max(...after.map((c)=>c.h));
                pool.depthAtr = side === 'BAWAH' ? (level - extreme) / atr : (extreme - level) / atr;
                pool.closeDistAtr = side === 'BAWAH' ? (lastClose - level) / atr : (level - lastClose) / atr;
                pool.reclaimed = pool.closeDistAtr >= 0.12;
                pool.volZSweep = (cs[sweepStart].v - v.volMean) / volSd;
                const preVols = cs.slice(Math.max(0, sweepStart - 12), sweepStart).map((c)=>c.v);
                const preMean = preVols.length ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"](preVols) : v.volMean;
                pool.volRatioSweep = cs[sweepStart].v / Math.max(preMean, 1e-9);
                pool.sweepBodyAtr = Math.abs(cs[sweepStart].c - cs[sweepStart].o) / atr;
                const post = cs.slice(sweepStart + 1);
                pool.postBounceMaxBodyAtr = post.length ? Math.max(...post.map((c)=>Math.abs(c.c - c.o))) / atr : 0;
                pool.postVolMean = post.length ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"](post.map((c)=>c.v)) : 0;
            }
            pools.push(pool);
        }
    }
    // ---- TAMBANG TOUCH-ZONE (dedupe thd pool pivot: level sama ~ 0.22 ATR) ----
    const zones = mineTouchZones(win, atr);
    for (const z of zones){
        if (pools.some((p)=>Math.abs(p.level - z.level) <= 0.22 * atr)) continue;
        const level = z.level;
        const margin = 0.12 * atr;
        // episode dwi-arah: sapuan TERAKHIR ke atas atau ke bawah
        let lastUp = -1;
        let lastDn = -1;
        for(let i = n - 1; i >= Math.max(0, n - 14); i--){
            if (lastUp < 0 && cs[i].h > level + margin) lastUp = i;
            if (lastDn < 0 && cs[i].l < level - margin) lastDn = i;
            if (lastUp >= 0 && lastDn >= 0) break;
        }
        const upNewer = lastUp >= lastDn;
        const lastPierce = Math.max(lastUp, lastDn);
        if (lastPierce < 0) continue; // tak pernah disapu -> tidak relevan sbg kandidat aktif
        let sweepStart = lastPierce;
        while(sweepStart - 1 >= 0 && n - sweepStart <= 22){
            const prev = cs[sweepStart - 1];
            const beyond = upNewer ? prev.c > level + margin : prev.c < level - margin;
            const piercePrev = upNewer ? prev.h > level + margin : prev.l < level - margin;
            if (piercePrev || beyond) sweepStart--;
            else break;
        }
        if (n - sweepStart > 22) continue;
        const side = upNewer ? 'ATAS' : 'BAWAH';
        const kind = side === 'BAWAH' ? 'low' : 'high';
        const vWin = win.slice(0, Math.max(0, sweepStart - wOff - 2));
        const { visits, maxBounceAtr } = visitsOf(vWin, level, side, atr);
        const win30 = cs.slice(Math.max(0, n - 30));
        const distPullAtr = side === 'BAWAH' ? (Math.max(...win30.map((c)=>c.h)) - level) / atr : (level - Math.min(...win30.map((c)=>c.l))) / atr;
        const recent = cs.slice(Math.max(0, n - 32));
        const older = cs.slice(0, Math.max(0, n - 32));
        const hhStruct = older.length > 10 && Math.max(...recent.map((c)=>c.h)) > Math.max(...older.map((c)=>c.h));
        const llStruct = older.length > 10 && Math.min(...recent.map((c)=>c.l)) < Math.min(...older.map((c)=>c.l));
        const consecBig = side === 'BAWAH' ? cdBig : cuBig;
        const jenis = classifyPool(win, v, level, side, atr, Math.max(visits, Math.min(z.touches.length, 4)), Math.max(maxBounceAtr, 0.4), consecBig, distPullAtr, side === 'BAWAH' ? hhStruct : llStruct);
        const pool = {
            side,
            jenis,
            level,
            sentuhan: Math.max(visits, z.touches.length - 1),
            maxBounceAtr,
            swept: true,
            reclaimed: false,
            barsSince: n - 1 - sweepStart,
            depthAtr: 0,
            closeDistAtr: 0,
            volZSweep: 0,
            volRatioSweep: 0,
            sweepBodyAtr: 0,
            postBounceMaxBodyAtr: 0,
            postVolMean: 0,
            crossBack: false,
            dariZona: true
        };
        const after = cs.slice(sweepStart);
        const extreme = side === 'BAWAH' ? Math.min(...after.map((c)=>c.l)) : Math.max(...after.map((c)=>c.h));
        pool.depthAtr = side === 'BAWAH' ? (level - extreme) / atr : (extreme - level) / atr;
        const lastClose = cs[n - 1].c;
        const prevClose = cs[n - 2].c;
        pool.closeDistAtr = side === 'BAWAH' ? (lastClose - level) / atr : (level - lastClose) / atr;
        pool.reclaimed = pool.closeDistAtr >= 0.12;
        pool.volZSweep = (cs[sweepStart].v - v.volMean) / volSd;
        const preVols = cs.slice(Math.max(0, sweepStart - 12), sweepStart).map((c)=>c.v);
        const preMean = preVols.length ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"](preVols) : v.volMean;
        pool.volRatioSweep = cs[sweepStart].v / Math.max(preMean, 1e-9);
        pool.sweepBodyAtr = Math.abs(cs[sweepStart].c - cs[sweepStart].o) / atr;
        const post = cs.slice(sweepStart + 1);
        pool.postBounceMaxBodyAtr = post.length ? Math.max(...post.map((c)=>Math.abs(c.c - c.o))) / atr : 0;
        pool.postVolMean = post.length ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"](post.map((c)=>c.v)) : 0;
        pool.crossBack = side === 'ATAS' ? prevClose > level && lastClose < level && pool.closeDistAtr >= 0.2 : prevClose < level && lastClose > level && pool.closeDistAtr >= 0.2;
        pools.push(pool);
    }
    // pool aktif — kandidat SAH:
    //  · kedalaman >= 0.4 ATR (anti phantom); RELAKSASI 0.3 ATR bila penolakan
    //    MUTLAK (tutup >= 0.5 ATR di luar level + volume sapu z >= 2) — penolakan
    //    sekuat itu sendiri membuktikan stop telah dipanen
    //  · bukti stop terpicu: volume sapu >= 0.5 sigma ATAU rasio thd pra-episode >= 1.15
    //  · pool pivot butuh sejarah (sentuhan >= 1); pool zona dibuktikan sapuannya
    const sweptPools = pools.filter((p)=>p.swept && (p.depthAtr >= 0.4 || p.depthAtr >= 0.3 && Math.abs(p.closeDistAtr) >= 0.5 && p.volZSweep >= 2) && (p.dariZona || p.sentuhan >= 1) && (p.volZSweep >= 0.5 || p.volRatioSweep >= 1.15));
    sweptPools.sort((a, b)=>{
        // 1) TIER KESEGARAN: peristiwa penolakan-balik saat ini / sapuan baru
        const ra = rankOf(a);
        const rbv = rankOf(b);
        if (ra !== rbv) return ra - rbv;
        // 2) terdekat ke ekstrem 8 candle terakhir (sapuan terjadi DI ekstrem)
        const da = Math.abs(a.level - (a.side === 'BAWAH' ? recentExtreme : recentExtremeHi));
        const dbv = Math.abs(b.level - (b.side === 'BAWAH' ? recentExtreme : recentExtremeHi));
        if (da !== dbv) return da - dbv;
        // 3) paling segar
        return a.barsSince - b.barsSince;
    });
    const active = sweptPools[0] ?? null;
    return {
        ...v,
        atrSd: volSd,
        pools,
        active,
        consecDownBig: cdBig,
        consecUpBig: cuBig,
        lastVolZ
    };
}
const TARGET_DISIPLIN = 2.2;
/** inti naif v1.0 — artefak "1% AI" (mengejar breakout/breakdown) */ function sgCore(cs, fitur) {
    const alasan = [];
    let arah;
    if (fitur.recentBreakDown) {
        arah = 'TURUN';
        alasan.push(`CORE: breakdown terdeteksi (level ${fitur.breakLevelDn.toFixed(2)}) -> ikut menjual (naif)`);
    } else if (fitur.recentBreakUp) {
        arah = 'NAIK';
        alasan.push(`CORE: breakout terdeteksi (level ${fitur.breakLevel.toFixed(2)}) -> ikut membeli (naif)`);
    } else {
        arah = fitur.mom12Atr >= 0 ? 'NAIK' : 'TURUN';
        alasan.push(`CORE: momentum ${fitur.mom12Atr.toFixed(1)} ATR -> ikut arah (naif)`);
    }
    return {
        versi: '1.0',
        aksi: 'ENTRY',
        arah,
        targetPct: TARGET_DISIPLIN,
        score: 0,
        pool: {
            jenis: 'tak-jelas',
            side: 'TAK-JELAS',
            level: 0,
            sentuhan: 0,
            swept: false,
            reclaimed: false,
            depthAtr: 0,
            barsSince: -1
        },
        grab: {
            terjadi: false,
            post: 'BELUM-JELAS',
            cara: 'CORE tidak memetakan likuiditas'
        },
        pelajaranAktif: [],
        alasan,
        fitur
    };
}
function sgVonis(cs, versi = SG_BRAIN_VERSI) {
    const fitur = buildSgVision(cs);
    if (versi.startsWith('1')) return sgCore(cs, fitur);
    const alasan = [];
    const pelajaran = [];
    const P = fitur.active;
    const atr = fitur.atr;
    // ===== TIDAK ADA POOL TER-SAPU =====
    if (!P) {
        pelajaran.push('SG-L8');
        alasan.push('SG-L8 SKIP-DISCIPLIN: tidak ada pool likuiditas yang baru disapu (kedalaman >= 0.2 ATR) -> tanpa edge likuiditas, tidak mengambil posisi');
        return {
            versi,
            aksi: 'SKIP',
            arah: 'NAIK',
            targetPct: TARGET_DISIPLIN,
            score: 0,
            pool: {
                jenis: 'tak-jelas',
                side: 'TAK-JELAS',
                level: 0,
                sentuhan: 0,
                swept: false,
                reclaimed: false,
                depthAtr: 0,
                barsSince: -1
            },
            grab: {
                terjadi: false,
                post: 'BELUM-JELAS',
                cara: 'tidak ada sapuan teridentifikasi'
            },
            pelajaranAktif: pelajaran,
            alasan,
            fitur
        };
    }
    const poolRec = {
        jenis: P.jenis,
        side: P.side,
        level: P.level,
        sentuhan: P.sentuhan,
        swept: P.swept,
        reclaimed: P.reclaimed,
        depthAtr: P.depthAtr,
        barsSince: P.barsSince
    };
    const grabTerjadi = true;
    const cara = `pool ${P.jenis} (${P.side.toLowerCase()}, ${P.sentuhan} sentuhan, level ${P.level.toFixed(2)}) disapu ${P.barsSince} candle lalu sedalam ${P.depthAtr.toFixed(2)} ATR; volZ sapu ${P.volZSweep.toFixed(1)}; close kini ${P.closeDistAtr >= 0 ? '+' : ''}${P.closeDistAtr.toFixed(2)} ATR dari level -> ${P.reclaimed ? 'RECLAIMED' : 'BELUM reclaim'}`;
    if (P.side === 'BAWAH') {
        if (P.reclaimed) {
            // ===== ANATOMI RECLAIM (v2.9.3, bedah hakim-sh300) =====
            // Kekuatan reclaim diukur dari PENGIKUT (volume pasca-sapu), bukan hanya
            // dari lilin sapu: sapuan sunyi + reclaim berpengikut = sah (range-low);
            // reclaim KERING (vol padam < 0.6x rata) = umpan fake-reclaim, apapun
            // badannya (bukti: 21 baris fake-reclaim postVol 0.53 vs sah 1.26-2.4).
            const pengikut = P.barsSince >= 1 && P.postVolMean >= fitur.volMean * 0.85;
            const kering = P.barsSince >= 1 && P.postVolMean < fitur.volMean * 0.6;
            const kuat = P.closeDistAtr >= 0.3 && P.volZSweep >= 1 && (P.barsSince === 0 || pengikut);
            if (kuat) {
                pelajaran.push('SG-L1', 'SG-L2', 'SG-L3');
                alasan.push(`SG-L3 TANDA-REVERSAL: sapuan pool ${P.jenis} ditutup balik DI ATAS level (tutup +${P.closeDistAtr.toFixed(2)} ATR, volume sapu nyata z=${P.volZSweep.toFixed(1)}${pengikut ? ', reclaim berpengikut' : ''}) -> stop long sudah dipanen, penjual trap terjebak -> ENTRY NAIK`);
                return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
            }
            if (kering) {
                pelajaran.push('SG-L1', 'SG-L2', 'SG-L5');
                alasan.push(`SG-L5 RECLAIM-PALSU: reclaim TANPA PENGIKUT (vol pasca-sapu ${P.postVolMean.toFixed(2)} vs rata ${fitur.volMean.toFixed(2)} = kering) — badan reclaim apapun adalah umpan -> grab bahan bakar penjualan -> ENTRY TURUN`);
                return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
            }
            const sah = P.closeDistAtr >= 0.3 && (P.volZSweep >= 1 || pengikut) || pengikut && P.postBounceMaxBodyAtr >= 0.65 && P.closeDistAtr >= 0.1;
            if (sah) {
                pelajaran.push('SG-L1', 'SG-L2', 'SG-L3');
                alasan.push(`SG-L3 RECLAIM-BERPENGIKUT: tutup +${P.closeDistAtr.toFixed(2)} ATR di atas level, volume pasca-sapu ${P.postVolMean.toFixed(2)} (rata ${fitur.volMean.toFixed(2)}) + badan tindak-lanjut ${P.postBounceMaxBodyAtr.toFixed(2)} ATR -> sapuan ${P.jenis} benar-benar ditolak -> ENTRY NAIK`);
                return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
            }
            // v2.9.2 (bedah sh200): KONTEKS TREN pembeda reclaim-palsu vs shakeout.
            if (fitur.mom50Atr >= 0.5) {
                pelajaran.push('SG-L1', 'SG-L2', 'SG-L6');
                alasan.push(`SG-L6 SHAKEOUT-RECLAIM: reclaim lemah (+${P.closeDistAtr.toFixed(2)} ATR) TAPI konteks tren naik (mom50 ${fitur.mom50Atr.toFixed(1)} ATR) -> sapuan di bawah ${P.jenis} adalah shakeout, bukan patah; grab = bahan bakar markup -> ENTRY NAIK`);
                return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
            }
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L5');
            alasan.push(`SG-L5 RECLAIM-PALSU: tutup hanya +${P.closeDistAtr.toFixed(2)} ATR di atas level, reclaim tanpa kekuatan & tanpa pengikut -> grab berubah bahan bakar penjualan -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
        }
        // belum reclaim
        if (fitur.consecDownBig >= 4 && P.depthAtr >= 1.0) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L9');
            alasan.push(`SG-L9 KASKADE-LIKUIDASI: ${fitur.consecutiveDown} merah berturut + klimaks (z=${fitur.lastVolZ.toFixed(1)}) sedalam ${P.depthAtr.toFixed(1)} ATR di bawah pool ${P.jenis} -> mesin likuidasi kehabisan bahan bakar -> ENTRY NAIK (tangkap kepanikan)`);
            return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
        }
        if ((fitur.mom50Atr >= 0.8 || P.jenis === 'hl-structure' && fitur.mom50Atr >= 0.3) && P.depthAtr <= 2.8) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L6');
            alasan.push(`SG-L6 VAKUM-TREN: konteks tren naik (mom50 ${fitur.mom50Atr.toFixed(1)} ATR${P.jenis === 'hl-structure' ? ', pullback dalam ke struktur HL' : ''}), sapuan di bawah ${P.jenis} tanpa panik = vakum likuiditas -> bahan bakar markup -> ENTRY NAIK`);
            return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
        }
        const gagalBounce = P.barsSince >= 2 && P.postBounceMaxBodyAtr <= 0.3 && P.postVolMean <= fitur.volMean * 1.05 && (P.closeDistAtr <= -0.08 || P.closeDistAtr < 0.12 && fitur.mom50Atr <= -0.5);
        if (gagalBounce) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L4');
            alasan.push(`SG-L4 GRAB-BAHAN-BAKAR: sapuan TANPA reclaim, bounce pasca-sapu kering (badan maks ${P.postBounceMaxBodyAtr.toFixed(2)} ATR, vol ${P.postVolMean.toFixed(2)} vs rata ${fitur.volMean.toFixed(2)}), harga bertahan di bawah level${P.closeDistAtr >= -0.08 ? ' (menempel tanpa reclaim) dalam tren turun' : ''} -> likuiditas long habis, lanjut turun -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
        }
        pelajaran.push('SG-L1', 'SG-L2', 'SG-L7');
        alasan.push(`SG-L7 SABAR-MENUNGGU: pool ${P.jenis} baru disapu (${P.barsSince} candle) belum ada reclaim dan anatomi belum menentukan -> WAIT, masuk hanya bila tutup reclaim di atas level ${P.level.toFixed(2)}`);
        return mk(versi, 'WAIT', 'NAIK', TARGET_DISIPLIN, P.level, poolRec, grabTerjadi, 'BELUM-JELAS', cara, pelajaran, alasan, fitur, 2);
    }
    // ===== SIDE ATAS (buy-side liquidity) =====
    if (P.reclaimed) {
        const kuat = P.closeDistAtr >= 0.3 && P.volZSweep >= 1 && (P.barsSince === 0 || P.postVolMean >= fitur.volMean * 0.85);
        if (kuat) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L3');
            alasan.push(`SG-L3 TANDA-REVERSAL (cermin): sapuan pool ${P.jenis} ditutup balik DI BAWAH level (tutup ${P.closeDistAtr.toFixed(2)} ATR, volume sapu z=${P.volZSweep.toFixed(1)}) -> stop short sudah dipanen, buyer trap terjebak -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
        }
        // SG-L10a: sapuan segar (<= 1 candle) yang DITOLAK KERAS — wick atas panjang,
        // tutup jauh di bawah level — penolakan itu sendiri adalah bukti (tanpa gerbang volume)
        const idxSweep = cs.length - 1 - P.barsSince;
        const swC = cs[idxSweep];
        const wickSweep = swC ? (swC.h - Math.max(swC.o, swC.c)) / atr : 0;
        if (P.barsSince <= 1 && P.closeDistAtr >= 0.5 && wickSweep >= 0.5) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L10');
            alasan.push(`SG-L10 SAPUAN-DITOLAK: sapuan ${P.jenis} segar (${P.barsSince} candle) ditolak keras — wick atas ${wickSweep.toFixed(2)} ATR, tutup ${P.closeDistAtr.toFixed(2)} ATR di bawah level -> stop short terpanen, buyer breakout terjebak -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
        }
        // SG-L10b: harga WANNA di atas pool lalu candle terakhir CROSS-BACK ke bawah
        // = breakout gagal — penolakan terjadi SAAT INI (tanpa gerbang volume)
        const last = cs[cs.length - 1];
        const prevC = cs.length >= 2 ? cs[cs.length - 2].c : last.c;
        const wickLast = (last.h - Math.max(last.o, last.c)) / atr;
        if (prevC > P.level && last.c < P.level && P.closeDistAtr >= 0.2 && wickLast >= 0.35) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L10');
            alasan.push(`SG-L10 CROSS-BACK: harga bertahan di atas pool ${P.jenis} (${P.level.toFixed(2)}) lalu candle terakhir ditutup balik DI BAWAHNYA (wick atas ${wickLast.toFixed(2)} ATR) = breakout gagal, likuiditas short sudah diambil -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
        }
        // v2.9.4 (bedah hakim-sh400 #54): penolakan DENGAN PENGIKUT (volume jual
        // pasca-sapu >= 0.85x rata + badan tindak-lanjut >= 0.65 ATR) = reversal sah
        // -> TURUN, walau sapuannya sunyi (volZ rendah).
        const pengikutT = P.barsSince >= 1 && P.postVolMean >= fitur.volMean * 0.85;
        if (pengikutT && P.postBounceMaxBodyAtr >= 0.65 && P.closeDistAtr >= 0.1) {
            pelajaran.push('SG-L1', 'SG-L2', 'SG-L3');
            alasan.push(`SG-L3 REJECT-BERPENGIKUT (cermin): tutup ${P.closeDistAtr.toFixed(2)} ATR di bawah level, volume jual pasca-sapu ${P.postVolMean.toFixed(2)} (rata ${fitur.volMean.toFixed(2)}) + badan tindak-lanjut ${P.postBounceMaxBodyAtr.toFixed(2)} ATR -> penolakan ${P.jenis} disupport penjualan -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
        }
        // v2.9.2 (cermin): penolakan lemah di TREN TURUN (mom50 <= -0.5) = distribusi
        // setelah grab buy-side -> lanjut TURUN; di konteks netral/naik = bahan bakar beli.
        if (fitur.mom50Atr <= -0.5) {
            pelajaran.push('SG-L6');
            alasan.push(`SG-L6 DISTRIBUSI-REJECT: penolakan lemah (${P.closeDistAtr.toFixed(2)} ATR) di bawah level TAPI konteks tren turun (mom50 ${fitur.mom50Atr.toFixed(1)} ATR) -> sapuan di atas ${P.jenis} adalah distribusi; likuiditas beli habis -> ENTRY TURUN`);
            return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
        }
        pelajaran.push('SG-L1', 'SG-L2', 'SG-L5');
        alasan.push(`SG-L5 RECLAIM-PALSU (cermin): tutup hanya ${P.closeDistAtr.toFixed(2)} ATR di bawah level = penolakan tanpa kekuatan -> grab jadi bahan bakar pembelian -> ENTRY NAIK`);
        return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
    }
    if (fitur.consecUpBig >= 4 && P.depthAtr >= 1.0) {
        pelajaran.push('SG-L1', 'SG-L2', 'SG-L9');
        alasan.push(`SG-L9 SHORT-SQUEEZE: ${fitur.consecutiveUp} hijau berturut + klimaks (z=${fitur.lastVolZ.toFixed(1)}) di atas pool ${P.jenis} -> likuidasi short berantai habis -> ENTRY TURUN (tangkap puncak squeeze)`);
        return mk(versi, 'ENTRY', 'TURUN', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'REVERSAL', cara, pelajaran, alasan, fitur, 3);
    }
    if (fitur.mom50Atr >= 1.2 && P.depthAtr <= 2.8) {
        pelajaran.push('SG-L1', 'SG-L2', 'SG-L6');
        alasan.push(`SG-L6 VAKUM-ATAP: tren naik kuat (mom50 ${fitur.mom50Atr.toFixed(1)} ATR), sapuan di atas ${P.jenis} diserap tanpa kepanikan = launchpad kelanjutan -> ENTRY NAIK`);
        return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
    }
    const gagalFade = P.barsSince >= 2 && P.postBounceMaxBodyAtr <= 0.3 && P.postVolMean <= fitur.volMean * 1.05 && P.closeDistAtr >= 0.08;
    if (gagalFade) {
        pelajaran.push('SG-L1', 'SG-L2', 'SG-L4');
        alasan.push(`SG-L4 GRAB-BAHAN-BAKAR (cermin): sapuan di atas atap TANPA ditutup balik, fade kering (badan maks ${P.postBounceMaxBodyAtr.toFixed(2)} ATR) -> vakum likuiditas -> lanjut naik -> ENTRY NAIK`);
        return mk(versi, 'ENTRY', 'NAIK', TARGET_DISIPLIN, undefined, poolRec, grabTerjadi, 'CONTINUATION', cara, pelajaran, alasan, fitur, 3);
    }
    pelajaran.push('SG-L1', 'SG-L2', 'SG-L7');
    alasan.push(`SG-L7 SABAR-MENUNGGU (cermin): pool ${P.jenis} baru disapu ke atas, belum ditutup balik -> WAIT, masuk short hanya bila tutup kembali di bawah level ${P.level.toFixed(2)}`);
    return mk(versi, 'WAIT', 'TURUN', TARGET_DISIPLIN, P.level, poolRec, grabTerjadi, 'BELUM-JELAS', cara, pelajaran, alasan, fitur, 2);
}
function mk(versi, aksi, arah, targetPct, triggerLevel, pool, terjadi, post, cara, pelajaran, alasan, fitur, score) {
    return {
        versi,
        aksi,
        arah,
        targetPct,
        triggerLevel,
        score,
        pool,
        grab: {
            terjadi,
            post,
            cara
        },
        pelajaranAktif: pelajaran,
        alasan,
        fitur
    };
}
const sgBaselineCore = sgCore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/kompleks-brain.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// MICAPROFITA SAKTI-KOMPLEKS — otak UJIAN KOMPLEKS 5 ASPEK.
//
// Menerima HANYA 60 candle visible (point-in-time). Tugas otak:
// mengenali KELIMA aspek SEKALIGUS dalam satu rangkaian —
//   1. STOP HUNT / LIQUIDITY GRAB (sapuan pool rantai)
//   2. FALSE BREAKOUT (tembus puncak struktural lalu dicabut)
//   3. PUMP AND DUMP (markup impuls + markdown pasca-pump)
//   4. BEAR TRAP (tembus bawah lalu dipulihkan)
//   5. BULL TRAP (tembus atas lalu dicabut)
// memahami HUBUNGAN & URUTANNYA (trap menabung likuiditas ->
// pump menciptakan korban -> false breakout menampung pembeli
// terakhir -> dump menciptakan stop cluster -> stop hunt
// memanen), lalu memilih ENTRY / WAIT / SKIP + STOP WAJIB.
//
// LAPISAN PELAJARAN v1.0:
//  - KL-L1 kaskade-gauntlet     · KL-L2 reclaim/reject dominan
//  - KL-L3 umpan reclaim-gagal  · KL-L4 grab-bahan-bakar dump
//  - KL-L5 sapuan dwi-lapis (WAIT disiplin) · KL-L6 skip-disiplin
//  - KL-PD0 pemindai jejak pump-dump-false-breakout (konteks aspek)
//  - warisan SG-L1..L9 (stophunt v2.9.4) & CG v1.6 (gabungan)
// ============================================================
__turbopack_context__.s([
    "KL_BRAIN_VERSI",
    ()=>KL_BRAIN_VERSI,
    "klCore",
    ()=>klCore,
    "klVonis",
    ()=>klVonis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/indicators.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$stophunt$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/stophunt-brain.ts [app-client] (ecmascript)");
;
;
const KL_BRAIN_VERSI = '1.2';
const TARGET_DISIPLIN = 2.2;
const STOP_MIN = 1.2;
const STOP_MAX = 2.6;
const STOP_WAIT = 1.8;
function koreksiPools(cs, v) {
    const n = cs.length;
    const atr = Math.max(v.atr, 1e-9);
    const vols = cs.map((c)=>c.v);
    const volSd = Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stdev"])(vols.slice(Math.max(0, n - 30))), 1e-9);
    const winStart = Math.max(0, n - 22);
    const out = [];
    for (const p of v.pools){
        if (!p.swept) {
            out.push({
                ...p,
                idxSweep: -1,
                episodeLen: 0
            });
            continue;
        }
        const margin = 0.12 * atr;
        let side = p.side;
        if (p.dariZona) {
            let lastUp = -1;
            let lastDn = -1;
            for(let i = n - 1; i >= Math.max(0, n - 14); i--){
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
        for(let i = n - 1; i >= winStart; i--){
            const pierce = side === 'BAWAH' ? cs[i].l < p.level - margin : cs[i].h > p.level + margin;
            if (pierce) {
                lastPierce = i;
                break;
            }
        }
        if (lastPierce < 0) {
            out.push({
                ...p,
                idxSweep: -1,
                episodeLen: 0,
                barsSince: 99,
                volZSweep: 0,
                volRatioSweep: 0
            });
            continue;
        }
        let a = lastPierce;
        while(a - 1 >= winStart){
            const prev = cs[a - 1];
            const pierce = side === 'BAWAH' ? prev.l < p.level - margin : prev.h > p.level + margin;
            const beyond = side === 'BAWAH' ? prev.c < p.level - margin : prev.c > p.level + margin;
            if (pierce || beyond) a--;
            else break;
        }
        const run = cs.slice(a, lastPierce + 1);
        let best = a;
        let vmax = -1;
        for(let i = 0; i < run.length; i++){
            if (run[i].v > vmax) {
                vmax = run[i].v;
                best = a + i;
            }
        }
        const idxSweep = best;
        const sw = cs[idxSweep];
        const episode = cs.slice(a);
        const extreme = side === 'BAWAH' ? Math.min(...episode.map((c)=>c.l)) : Math.max(...episode.map((c)=>c.h));
        const depthAtr = side === 'BAWAH' ? (p.level - extreme) / atr : (extreme - p.level) / atr;
        const lastClose = cs[n - 1].c;
        const closeDistAtr = side === 'BAWAH' ? (lastClose - p.level) / atr : (p.level - lastClose) / atr;
        const post = cs.slice(idxSweep + 1);
        const postBounceMaxBodyAtr = post.length ? Math.max(...post.map((c)=>Math.abs(c.c - c.o))) / atr : 0;
        const postVolMean = post.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"])(post.map((c)=>c.v)) : 0;
        const prevClose = n >= 2 ? cs[n - 2].c : lastClose;
        const crossBack = side === 'ATAS' ? prevClose > p.level && lastClose < p.level && closeDistAtr >= 0.2 : prevClose < p.level && lastClose > p.level && closeDistAtr >= 0.2;
        out.push({
            ...p,
            side,
            idxSweep,
            episodeLen: episode.length,
            depthAtr,
            closeDistAtr,
            reclaimed: closeDistAtr >= 0.12,
            barsSince: n - 1 - lastPierce,
            volZSweep: (vmax - v.volMean) / volSd,
            volRatioSweep: vmax / Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mean"])(cs.slice(Math.max(0, idxSweep - 12), idxSweep).map((c)=>c.v)), 1e-9),
            sweepBodyAtr: Math.abs(sw.c - sw.o) / atr,
            postBounceMaxBodyAtr,
            postVolMean,
            crossBack
        });
    }
    return out;
}
function rankOf(p) {
    if (p.crossBack) return 0;
    if (p.barsSince <= 1 && p.reclaimed && Math.abs(p.closeDistAtr) >= 0.5) return 0;
    if (p.barsSince <= 4) return 1;
    if (p.barsSince <= 8) return 2;
    return 3;
}
function pilihAktif(cs, pools, atr) {
    const n = cs.length;
    const recentExtremeLo = Math.min(...cs.slice(Math.max(0, n - 8)).map((c)=>c.l));
    const recentExtremeHi = Math.max(...cs.slice(Math.max(0, n - 8)).map((c)=>c.h));
    const valid = pools.filter((p)=>p.swept && (p.depthAtr >= 0.4 || p.depthAtr >= 0.3 && Math.abs(p.closeDistAtr) >= 0.5 && p.volZSweep >= 2) && p.depthAtr <= 3.4 && p.episodeLen > 0 && p.episodeLen <= 8 && p.barsSince <= 10 && (p.dariZona || p.sentuhan >= 1) && (p.volZSweep >= 0.5 || p.volRatioSweep >= 1.15));
    valid.sort((a, b)=>{
        const ra = rankOf(a);
        const rb = rankOf(b);
        if (ra !== rb) return ra - rb;
        const da = Math.abs(a.level - (a.side === 'BAWAH' ? recentExtremeLo : recentExtremeHi));
        const db = Math.abs(b.level - (b.side === 'BAWAH' ? recentExtremeLo : recentExtremeHi));
        if (da !== db) return da - db;
        return a.barsSince - b.barsSince;
    });
    return valid[0] ?? null;
}
function klPdScan(cs, v) {
    const n = cs.length;
    const atr = Math.max(v.atr, 1e-9);
    const vols = cs.map((c)=>c.v);
    // PUMP: jejak markup impuls di tengah jendela (fase ~24..40):
    // rentang melebar + ARAH jelas + volume dorongan menonjol
    const f0 = Math.min(24, Math.max(0, n - 36));
    const f1 = Math.min(40, n - 14);
    const midHi = Math.max(...cs.slice(f0, f1).map((c)=>c.h));
    const midLo = Math.min(...cs.slice(f0, f1).map((c)=>c.l));
    const midMove = (midHi - midLo) / atr;
    // r2 bedah: arah pump diukur dari EKSTREM fase terhadap harga masuk fase
    // (close-ke-close menutup di tengah dump/rally fase G — membingungkan cermin)
    const anchor = cs[Math.max(0, f0 - 1)].c;
    const moveUpAtr = (midHi - anchor) / atr;
    const moveDnAtr = (anchor - midLo) / atr;
    const pumpArah = moveUpAtr >= 1.2 && moveUpAtr > moveDnAtr ? 'NAIK' : moveDnAtr >= 1.2 && moveDnAtr > moveUpAtr ? 'TURUN' : 'TIDAK-JELAS';
    const volPeak = Math.max(...cs.slice(f0, f1).map((c)=>c.v));
    const volSd = Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stdev"])(vols.slice(Math.max(0, n - 30))), 1e-9);
    const volPeakZ = (volPeak - v.volMean) / volSd;
    const pump = midMove >= 2.2 && pumpArah !== 'TIDAK-JELAS' && volPeakZ >= 0.8;
    // DUMP: pergerakan KEBALIKAN arah pump dari ekstrem fase pump
    // (pump naik -> markdown dari puncak; pump turun-cermin -> rally dari dasar)
    const lastC = cs[n - 1].c;
    const fallFromPuncakAtr = (midHi - lastC) / atr;
    const riseDariDasarAtr = (lastC - midLo) / atr;
    const dump = pump && (pumpArah === 'NAIK' ? fallFromPuncakAtr >= 1.2 : riseDariDasarAtr >= 1.2);
    // FALSE BREAKOUT: puncak/dasar struktural SEBELUM episode tembus
    // (strukEnd = n-31: fase tembus berada di ~30..37) ditembus lalu
    // DITUTUP BALIK di sisi asal dalam <= 3 candle
    const strukEnd = Math.max(6, n - 31);
    const strukStart = Math.max(0, n - 58);
    const struk = cs.slice(strukStart, strukEnd);
    const fboHi = struk.length ? Math.max(...struk.map((c)=>c.h)) : 0;
    const fboLo = struk.length ? Math.min(...struk.map((c)=>c.l)) : 0;
    let falseBreakout = false;
    let fboCara = '';
    let fboLvl = 0;
    // r2 bedah: sisi FBO mengikuti arah pump (FBO puncak utk pump naik,
    // FBO dasar utk pump cermin) — sisi lawan adalah trap fase D, bukan FBO
    const sisi = pumpArah === 'NAIK' ? [
        [
            fboHi,
            true
        ]
    ] : pumpArah === 'TURUN' ? [
        [
            fboLo,
            false
        ]
    ] : [
        [
            fboHi,
            true
        ],
        [
            fboLo,
            false
        ]
    ];
    for (const [lvl, up] of sisi){
        if (lvl <= 0) continue;
        for(let i = Math.max(1, strukEnd); i < n - 1; i++){
            const tembus = up ? cs[i].h > lvl + 0.05 * atr : cs[i].l < lvl - 0.05 * atr;
            if (!tembus) continue;
            for(let j = i + 1; j < Math.min(n, i + 4); j++){
                const cabut = up ? cs[j].c < lvl - 0.15 * atr : cs[j].c > lvl + 0.15 * atr;
                if (cabut) {
                    falseBreakout = true;
                    fboLvl = lvl;
                    fboCara = `${up ? 'puncak' : 'dasar'} struktural ${lvl.toFixed(2)} ${up ? 'ditembus ke atas (candle ' : 'ditembus ke bawah (candle '}${i + 1}) lalu DITUTUP BALIK (candle ${j + 1}) — pembeli/penjual breakout ditampung di luar`;
                    break;
                }
            }
            if (falseBreakout) break;
        }
        if (falseBreakout) break;
    }
    const korbanPump = pump && midMove >= 3.5 && (pumpArah === 'NAIK' ? fallFromPuncakAtr >= 2.0 : riseDariDasarAtr >= 2.0);
    return {
        pump,
        pumpArah,
        pumpCara: pump ? `jejak pump terbaca: rentang tengah jendela ${midMove.toFixed(1)} ATR arah ${pumpArah} dengan volume puncak z=${volPeakZ.toFixed(1)} — markup impuls, bukan gerak organik` : 'tanpa jejak pump impuls di tengah jendela',
        dump,
        dumpCara: dump ? pumpArah === 'NAIK' ? `markdown pasca-pump: harga ${fallFromPuncakAtr.toFixed(1)} ATR di bawah puncak pump ${midHi.toFixed(2)} — korban pump kini stop-loss cluster` : `rally pasca-pump-cermin: harga ${riseDariDasarAtr.toFixed(1)} ATR di atas dasar pump ${midLo.toFixed(2)} — korban short pump kini stop-loss cluster` : 'tanpa markdown pasca-pump',
        falseBreakout,
        fboLevel: fboLvl,
        fboCara: falseBreakout ? fboCara : 'tanpa false breakout terbaca pada episode terbaru',
        fallFromPuncakAtr,
        korbanPump
    };
}
function trapScan(cs, v) {
    const n = cs.length;
    const atr = Math.max(v.atr, 1e-9);
    const win = cs.slice(Math.max(0, n - 34));
    let bullTrap = false;
    let bearTrap = false;
    const catatan = [];
    for (const p of v.pools){
        const margin = 0.15 * atr;
        if (p.side === 'ATAS') {
            let pierce = -1;
            for(let i = 0; i < win.length - 1; i++){
                if (win[i].h > p.level + margin) {
                    pierce = i;
                    break;
                }
            }
            if (pierce >= 0) {
                for(let j = pierce + 1; j < win.length; j++){
                    if (win[j].c < p.level - 0.1 * atr) {
                        bullTrap = true;
                        catatan.push(`bull trap: tembus ${p.level.toFixed(2)} (pool ${p.jenis}) lalu ditutup balik di bawahnya`);
                        break;
                    }
                }
            }
        } else {
            let pierce = -1;
            for(let i = 0; i < win.length - 1; i++){
                if (win[i].l < p.level - margin) {
                    pierce = i;
                    break;
                }
            }
            if (pierce >= 0) {
                for(let j = pierce + 1; j < win.length; j++){
                    if (win[j].c > p.level + 0.1 * atr) {
                        bearTrap = true;
                        catatan.push(`bear trap: tembus ${p.level.toFixed(2)} (pool ${p.jenis}) lalu dipulihkan ke atasnya`);
                        break;
                    }
                }
            }
        }
    }
    let deceitCount = 0;
    const dWin = cs.slice(Math.max(0, n - 34));
    for(let i = 1; i < dWin.length; i++){
        const c = dWin[i];
        const range = Math.max(c.h - c.l, 1e-9);
        const body = Math.abs(c.c - c.o);
        const uw = c.h - Math.max(c.o, c.c);
        const lw = Math.min(c.o, c.c) - c.l;
        if (range >= 0.5 * atr && body <= 0.18 * atr) deceitCount++;
        else if (uw >= 0.5 * atr && uw >= 2.2 * body) deceitCount++;
        else if (lw >= 0.5 * atr && lw >= 2.2 * body) deceitCount++;
        const p = dWin[i - 1];
        const pBody = Math.abs(p.c - p.o);
        const engulf = body >= 0.7 * atr && body >= pBody * 1.1 && (c.c > c.o && p.c < p.o && c.o <= p.c && c.c >= p.o || c.c < c.o && p.c > p.o && c.o >= p.c && c.c <= p.o);
        if (engulf) deceitCount++;
    }
    return {
        bullTrap,
        bearTrap,
        twoSisi: bullTrap && bearTrap,
        cara: catatan.slice(0, 2).join(' | ') || 'tidak ada jejak trap terpetakan',
        deceitCount,
        deceitCara: deceitCount >= 2 ? `${deceitCount} lilin menipu terbaca (doji purba / pin salah arah / engulf ekstrem)` : `${deceitCount} lilin menipu terbaca`
    };
}
function stopStruktural(arah, entry, P, atr) {
    const extreme = P.side === 'BAWAH' ? P.level - P.depthAtr * atr : P.level + P.depthAtr * atr;
    const stopPrice = arah === 'NAIK' ? extreme - 0.45 * atr : extreme + 0.45 * atr;
    const pct = arah === 'NAIK' ? (entry - stopPrice) / entry * 100 : (stopPrice - entry) / entry * 100;
    return Math.min(STOP_MAX, Math.max(STOP_MIN, pct));
}
function mk(versi, p, rest, score) {
    return {
        versi,
        score,
        ...p,
        ...rest
    };
}
function poolRec(P) {
    if (!P) return {
        jenis: 'tak-jelas',
        side: 'TAK-JELAS',
        level: 0,
        sentuhan: 0,
        swept: false,
        reclaimed: false,
        depthAtr: 0,
        barsSince: -1
    };
    return {
        jenis: P.jenis,
        side: P.side,
        level: P.level,
        sentuhan: P.sentuhan,
        swept: P.swept,
        reclaimed: P.reclaimed,
        depthAtr: P.depthAtr,
        barsSince: P.barsSince
    };
}
function aspek5Rec(g, pd, P) {
    const stopHunt = !!P && P.swept && P.barsSince <= 10;
    const rangkaian = [];
    if (g.bullTrap) rangkaian.push('bull trap menabung likuiditas atas');
    if (g.bearTrap) rangkaian.push('bear trap melahirkan pool rantai');
    if (pd.pump) rangkaian.push('pump markup menciptakan korban FOMO');
    if (pd.falseBreakout) rangkaian.push('false breakout menampung pembeli terakhir di puncak');
    if (pd.dump) rangkaian.push('dump mengubah korban jadi stop-loss cluster');
    if (stopHunt) rangkaian.push('stop hunt final memanen pool rantai');
    return {
        stopHunt,
        falseBreakout: pd.falseBreakout,
        pumpDump: pd.pump && pd.dump,
        bearTrap: g.bearTrap,
        bullTrap: g.bullTrap,
        rangkaianUtuh: rangkaian.join(' -> ')
    };
}
function klCore(cs, fitur) {
    const alasan = [];
    let arah;
    if (fitur.recentBreakDown) {
        arah = 'TURUN';
        alasan.push(`CORE: breakdown terdeteksi (level ${fitur.breakLevelDn.toFixed(2)}) -> ikut menjual (naif)`);
    } else if (fitur.recentBreakUp) {
        arah = 'NAIK';
        alasan.push(`CORE: breakout terdeteksi (level ${fitur.breakLevel.toFixed(2)}) -> ikut membeli (naif)`);
    } else {
        arah = fitur.mom12Atr >= 0 ? 'NAIK' : 'TURUN';
        alasan.push(`CORE: momentum ${fitur.mom12Atr.toFixed(1)} ATR -> ikut arah (naif)`);
    }
    const g = trapScan(cs, fitur);
    const pd = klPdScan(cs, fitur);
    return mk('0.9', {
        aksi: 'ENTRY',
        arah,
        targetPct: TARGET_DISIPLIN,
        stopPct: 2.2
    }, {
        pool: poolRec(null),
        grab: {
            terjadi: false,
            post: 'BELUM-JELAS',
            cara: 'CORE tidak memetakan likuiditas'
        },
        gauntlet: g,
        pd,
        aspek5: aspek5Rec(g, pd, null),
        pelajaranAktif: [],
        alasan,
        fitur
    }, 0);
}
function klVonis(cs, versi = KL_BRAIN_VERSI) {
    const fitur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$stophunt$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSgVision"])(cs);
    if (versi.startsWith('0')) return klCore(cs, fitur);
    const n = cs.length;
    const atr = Math.max(fitur.atr, 1e-9);
    const entry = cs[n - 1].c;
    const g = trapScan(cs, fitur);
    const pd = klPdScan(cs, fitur);
    const lastC = cs[n - 1].c;
    const prevC = cs[n - 2].c;
    const pools = koreksiPools(cs, fitur);
    const P = pilihAktif(cs, pools, atr);
    if (!P) {
        return mk(versi, {
            aksi: 'SKIP',
            arah: 'NAIK',
            targetPct: TARGET_DISIPLIN,
            stopPct: STOP_WAIT
        }, {
            pool: poolRec(null),
            grab: {
                terjadi: false,
                post: 'BELUM-JELAS',
                cara: 'tidak ada sapuan teridentifikasi'
            },
            gauntlet: g,
            pd,
            aspek5: aspek5Rec(g, pd, null),
            pelajaranAktif: [
                'KL-L6',
                'SG-L8'
            ],
            alasan: [
                'KL-L6 SKIP-DISIPLIN: tidak ada pool likuiditas yang baru disapu (episode segar + volume nyata) -> tanpa edge likuiditas, rangkaian 5 aspek tidak dimainkan'
            ],
            fitur
        }, 0);
    }
    const cara = `pool ${P.jenis} (${P.side.toLowerCase()}, ${P.sentuhan} sentuhan, level ${P.level.toFixed(2)}) disapu ${P.barsSince} candle lalu sedalam ${P.depthAtr.toFixed(2)} ATR; volZ sapu ${P.volZSweep.toFixed(1)}; close kini ${P.closeDistAtr >= 0 ? '+' : ''}${P.closeDistAtr.toFixed(2)} ATR dari level -> ${P.reclaimed ? 'RECLAIMED' : 'BELUM reclaim'}; jejak 5 aspek: bullTrap=${g.bullTrap ? 'YA' : 'n'}, bearTrap=${g.bearTrap ? 'YA' : 'n'}, ${pd.pumpCara}, ${pd.dumpCara}, ${pd.fboCara}`;
    const poolR = poolRec(P);
    const a5 = aspek5Rec(g, pd, P);
    const pengikut = P.barsSince >= 1 && P.postVolMean >= fitur.volMean * 0.85;
    const kering = P.barsSince >= 1 && P.postVolMean < fitur.volMean * 0.6;
    const sweepBody = P.barsSince <= 1 ? P.sweepBodyAtr : 0;
    const bodyDominan = Math.max(P.postBounceMaxBodyAtr, sweepBody);
    const konteksPd = pd.korbanPump ? 'rangkaian pump-dump-false-breakout terkonfirmasi: stop-loss korban pump menumpuk di bawah — sapuan final adalah panen likuiditas' : 'konteks pasca-markdown';
    if (P.side === 'BAWAH') {
        // ===== KL-L1: KASKADE-LIKUIDASI (V-reversal) =====
        // r1: syarat volZ 1.5 terlalu ketat utk kaskade ber-ATR besar —
        // tambah jalur alternatif: consecDownBig >= 2 + volZ sapu >= 2.0
        if (P.depthAtr >= 0.8 && (P.crossBack || P.reclaimed) && (fitur.consecDownBig >= 3 && fitur.lastVolZ >= 1.2 || fitur.consecDownBig >= 2 && P.volZSweep >= 2.0)) {
            const stop = stopStruktural('NAIK', entry, P, atr);
            return mk(versi, {
                aksi: 'ENTRY',
                arah: 'NAIK',
                targetPct: TARGET_DISIPLIN,
                stopPct: stop
            }, {
                pool: poolR,
                grab: {
                    terjadi: true,
                    post: 'REVERSAL',
                    cara
                },
                gauntlet: g,
                pd,
                aspek5: a5,
                pelajaranAktif: [
                    'KL-L1',
                    'SG-L9',
                    'SG-L1',
                    'SG-L2'
                ],
                alasan: [
                    `KL-L1 KASKADE-GAUNTLET: ${fitur.consecutiveDown} merah berturut + klimaks (z=${fitur.lastVolZ.toFixed(1)}) menyapu pool rantai sedalam ${P.depthAtr.toFixed(1)} ATR lalu ${P.crossBack ? 'cross-back' : 'reclaim'} — mesin likuidasi kehabisan bahan bakar; ${konteksPd}; jejak trap bull=${g.bullTrap ? 'ada' : '-'}/bear=${g.bearTrap ? 'ada' : '-'}, ${g.deceitCara} -> ENTRY NAIK, stop struktural ${stop.toFixed(2)}% di bawah ekstrem sapuan`
                ],
                fitur
            }, 3);
        }
        // ===== KL-L2: RECLAIM DOMINAN (reversal sah) =====
        if (P.reclaimed && P.closeDistAtr >= 0.3 && P.closeDistAtr <= 2.6 && bodyDominan >= 0.55 && P.barsSince <= 2 && (P.barsSince === 0 || pengikut) && P.volZSweep >= 0.5) {
            const stop = stopStruktural('NAIK', entry, P, atr);
            return mk(versi, {
                aksi: 'ENTRY',
                arah: 'NAIK',
                targetPct: TARGET_DISIPLIN,
                stopPct: stop
            }, {
                pool: poolR,
                grab: {
                    terjadi: true,
                    post: 'REVERSAL',
                    cara
                },
                gauntlet: g,
                pd,
                aspek5: a5,
                pelajaranAktif: [
                    'KL-L2',
                    'SG-L3',
                    'SG-L1',
                    'SG-L2'
                ],
                alasan: [
                    `KL-L2 RECLAIM-DOMINAN: sapuan pool rantai ditutup balik +${P.closeDistAtr.toFixed(2)} ATR DI ATAS level dgn badan dominan ${bodyDominan.toFixed(2)} ATR (vol sapu z=${P.volZSweep.toFixed(1)}${pengikut ? ', reclaim berpengikut' : ''}) — stop long & short dipanen, trap terjebak; ${konteksPd}; ${g.cara} -> ENTRY NAIK, stop struktural ${stop.toFixed(2)}%`
                ],
                fitur
            }, 3);
        }
        // ===== KL-L3: UMPAN RECLAIM-GAGAL (mikro + kering) =====
        // r1: badan pasca-sapu LH mikro anatomi baru mencapai ~0.5 ATR —
        // band diperlebar -0.8..0.6 dan bodyDom 0.55 (dari bedah #56-60)
        if (P.closeDistAtr >= -0.8 && P.closeDistAtr <= 0.6 && P.postBounceMaxBodyAtr <= 0.55 && lastC <= prevC && P.postVolMean <= fitur.volMean * 0.8 && P.depthAtr <= 2.8 && P.barsSince <= 3) {
            const stop = stopStruktural('TURUN', entry, P, atr);
            return mk(versi, {
                aksi: 'ENTRY',
                arah: 'TURUN',
                targetPct: TARGET_DISIPLIN,
                stopPct: stop
            }, {
                pool: poolR,
                grab: {
                    terjadi: true,
                    post: 'CONTINUATION',
                    cara
                },
                gauntlet: g,
                pd,
                aspek5: a5,
                pelajaranAktif: [
                    'KL-L3',
                    'SG-L5',
                    'SG-L1',
                    'SG-L2'
                ],
                alasan: [
                    `KL-L3 UMPAN-RECLAIM: reclaim secekil TAPI gagal extend — tutup hanya ${P.closeDistAtr.toFixed(2)} ATR dari level, badan pasca-sapu ${P.postBounceMaxBodyAtr.toFixed(2)} ATR, LH mikro (close terakhir turun), volume kering ${P.postVolMean.toFixed(2)} vs rata ${fitur.volMean.toFixed(2)} — umpan terakhir setelah bull trap, bear trap, pump & false breakout; ${pd.dumpCara} -> grab jadi bahan bakar penjualan -> ENTRY TURUN, stop ${stop.toFixed(2)}% di atas pantulan gagal`
                ],
                fitur
            }, 3);
        }
        // ===== KL-L4b: GRAB BAHAN BAKAR (tanpa reclaim + konteks dump searah) =====
        // r1 bedah #56-60: pd.dump saja TIDAK cukup (cermin membingungkan) —
        // WAJIB mom50 searah entry (warisan CG-L4b yang terbukti)
        if (!P.reclaimed && P.closeDistAtr <= -0.05 && P.barsSince <= 3 && fitur.mom50Atr <= -0.5 && P.depthAtr <= 2.8 && P.postBounceMaxBodyAtr <= 0.35) {
            return mk(versi, {
                aksi: 'ENTRY',
                arah: 'TURUN',
                targetPct: TARGET_DISIPLIN,
                stopPct: stopStruktural('TURUN', entry, P, atr)
            }, {
                pool: poolR,
                grab: {
                    terjadi: true,
                    post: 'CONTINUATION',
                    cara
                },
                gauntlet: g,
                pd,
                aspek5: a5,
                pelajaranAktif: [
                    'KL-L4',
                    'SG-L4',
                    'SG-L1',
                    'SG-L2'
                ],
                alasan: [
                    `KL-L4 GRAB-BAHAN-BAKAR: sapuan tanpa reclaim (tutup ${P.closeDistAtr.toFixed(2)} ATR di bawah level) di konteks markdown pasca-pump (${pd.dumpCara}), bounce kering (badan ${P.postBounceMaxBodyAtr.toFixed(2)} ATR) -> likuiditas long habis, lanjut turun -> ENTRY TURUN`
                ],
                fitur
            }, 3);
        }
        // ===== KL-L5: SAPUAN DWI-LAPIS (pantulan rapuh -> WAIT) =====
        if (P.closeDistAtr >= 0.05 && P.closeDistAtr <= 1.6 && P.postBounceMaxBodyAtr <= 0.4 && lastC > prevC && g.twoSisi && P.barsSince <= 3 && P.depthAtr <= 2.6) {
            const trig = Math.max(P.level + 0.8 * atr, entry + 0.25 * atr);
            return mk(versi, {
                aksi: 'WAIT',
                arah: 'NAIK',
                targetPct: TARGET_DISIPLIN,
                stopPct: STOP_WAIT,
                triggerLevel: trig
            }, {
                pool: poolR,
                grab: {
                    terjadi: true,
                    post: 'BELUM-JELAS',
                    cara
                },
                gauntlet: g,
                pd,
                aspek5: a5,
                pelajaranAktif: [
                    'KL-L5',
                    'SG-L7',
                    'SG-L1',
                    'SG-L2'
                ],
                alasan: [
                    `KL-L5 SAPUAN-DWI-LAPIS: pantulan pasca-sapu RAPUH (badan ${P.postBounceMaxBodyAtr.toFixed(2)} ATR, vol ${P.postVolMean.toFixed(2)} vs rata ${fitur.volMean.toFixed(2)}) sementara rangkaian dua sisi terkonfirmasi (${g.cara}) — struktur belum aman; sapuan kedua lebih dalam = risiko likuidasi stop sempit -> WAIT, masuk NAIK hanya bila tutup reclaim di atas ${trig.toFixed(2)}, stop ${STOP_WAIT}%`
                ],
                fitur
            }, 2);
        }
        if (kering && fitur.mom50Atr <= -0.3 && P.closeDistAtr <= 1.6) {
            return mk(versi, {
                aksi: 'ENTRY',
                arah: 'TURUN',
                targetPct: TARGET_DISIPLIN,
                stopPct: stopStruktural('TURUN', entry, P, atr)
            }, {
                pool: poolR,
                grab: {
                    terjadi: true,
                    post: 'CONTINUATION',
                    cara
                },
                gauntlet: g,
                pd,
                aspek5: a5,
                pelajaranAktif: [
                    'SG-L5',
                    'SG-L1',
                    'SG-L2'
                ],
                alasan: [
                    `SG-L5 RECLAIM-PALSU (warisan): reclaim TANPA PENGIKUT (vol pasca-sapu ${P.postVolMean.toFixed(2)} vs rata ${fitur.volMean.toFixed(2)}) di konteks lemah (mom50 ${fitur.mom50Atr.toFixed(1)} ATR) -> grab bahan bakar penjualan -> ENTRY TURUN`
                ],
                fitur
            }, 3);
        }
        const trig = Math.max(P.level + 0.8 * atr, entry + 0.25 * atr);
        return mk(versi, {
            aksi: 'WAIT',
            arah: 'NAIK',
            targetPct: TARGET_DISIPLIN,
            stopPct: STOP_WAIT,
            triggerLevel: trig
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'BELUM-JELAS',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'SG-L7',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `SG-L7 SABAR-MENUNGGU: pool rantai baru disapu (${P.barsSince} candle), anatomi belum menentukan (badan ${bodyDominan.toFixed(2)} ATR, close ${P.closeDistAtr.toFixed(2)} ATR) -> WAIT, masuk NAIK hanya bila tutup di atas ${trig.toFixed(2)}`
            ],
            fitur
        }, 2);
    }
    // ================= SIDE ATAS (buy-side liquidity) — cermin =================
    if (P.depthAtr >= 0.8 && (P.crossBack || P.reclaimed) && (fitur.consecUpBig >= 3 && fitur.lastVolZ >= 1.2 || fitur.consecUpBig >= 2 && P.volZSweep >= 2.0)) {
        const stop = stopStruktural('TURUN', entry, P, atr);
        return mk(versi, {
            aksi: 'ENTRY',
            arah: 'TURUN',
            targetPct: TARGET_DISIPLIN,
            stopPct: stop
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'REVERSAL',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'KL-L1',
                'SG-L9',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `KL-L1 SHORT-SQUEEZE-GAUNTLET (cermin): ${fitur.consecutiveUp} hijau berturut + klimaks (z=${fitur.lastVolZ.toFixed(1)}) menyapu pool rantai atas sedalam ${P.depthAtr.toFixed(1)} ATR lalu ${P.crossBack ? 'cross-back' : 'ditolak'} — likuidasi short berantai habis; ${konteksPd}; jejak trap bull=${g.bullTrap ? 'ada' : '-'}/bear=${g.bearTrap ? 'ada' : '-'} -> ENTRY TURUN, stop ${stop.toFixed(2)}%`
            ],
            fitur
        }, 3);
    }
    if (P.reclaimed && P.closeDistAtr >= 0.3 && P.closeDistAtr <= 2.6 && bodyDominan >= 0.55 && P.barsSince <= 2 && (P.barsSince === 0 || pengikut) && P.volZSweep >= 0.5) {
        const stop = stopStruktural('TURUN', entry, P, atr);
        return mk(versi, {
            aksi: 'ENTRY',
            arah: 'TURUN',
            targetPct: TARGET_DISIPLIN,
            stopPct: stop
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'REVERSAL',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'KL-L2',
                'SG-L3',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `KL-L2 REJECT-DOMINAN (cermin): sapuan pool rantai atas ditolak keras — tutup ${P.closeDistAtr.toFixed(2)} ATR DI BAWAH level, badan dominan ${bodyDominan.toFixed(2)} ATR (z=${P.volZSweep.toFixed(1)}${pengikut ? ', berpengikut' : ''}) — buyer breakout pump & short lama dipanen; ${g.cara} -> ENTRY TURUN, stop ${stop.toFixed(2)}%`
            ],
            fitur
        }, 3);
    }
    if (P.closeDistAtr >= -0.8 && P.closeDistAtr <= 0.6 && P.postBounceMaxBodyAtr <= 0.55 && lastC >= prevC && P.postVolMean <= fitur.volMean * 0.8 && P.depthAtr <= 2.8 && P.barsSince <= 3) {
        const stop = stopStruktural('NAIK', entry, P, atr);
        return mk(versi, {
            aksi: 'ENTRY',
            arah: 'NAIK',
            targetPct: TARGET_DISIPLIN,
            stopPct: stop
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'CONTINUATION',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'KL-L3',
                'SG-L5',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `KL-L3 UMPAN-REJECT (cermin): penolakan secekil TAPI gagal extend — tutup ${P.closeDistAtr.toFixed(2)} ATR dari level, badan ${P.postBounceMaxBodyAtr.toFixed(2)} ATR, HL mikro (close terakhir naik), volume kering ${P.postVolMean.toFixed(2)} — umpan terakhir setelah pump cermin & false breakdown -> vakum beli -> ENTRY NAIK, stop ${stop.toFixed(2)}%`
            ],
            fitur
        }, 3);
    }
    if (!P.reclaimed && P.closeDistAtr <= -0.05 && P.barsSince <= 3 && fitur.mom50Atr >= 0.5 && P.depthAtr <= 2.8 && P.postBounceMaxBodyAtr <= 0.35) {
        return mk(versi, {
            aksi: 'ENTRY',
            arah: 'NAIK',
            targetPct: TARGET_DISIPLIN,
            stopPct: stopStruktural('NAIK', entry, P, atr)
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'CONTINUATION',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'KL-L4',
                'SG-L4',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `KL-L4 GRAB-BAHAN-BAKAR (cermin): sapuan atas tanpa reclaim (tutup ${P.closeDistAtr.toFixed(2)} ATR di atas level) di konteks markdown cer (${pd.dumpCara}), fade kering (badan ${P.postBounceMaxBodyAtr.toFixed(2)} ATR) -> vakum likuiditas, lanjut naik -> ENTRY NAIK`
            ],
            fitur
        }, 3);
    }
    if (P.closeDistAtr >= 0.05 && P.closeDistAtr <= 1.6 && P.postBounceMaxBodyAtr <= 0.4 && lastC < prevC && g.twoSisi && P.barsSince <= 3 && P.depthAtr <= 2.6) {
        const trig = Math.min(P.level - 0.8 * atr, entry - 0.25 * atr);
        return mk(versi, {
            aksi: 'WAIT',
            arah: 'TURUN',
            targetPct: TARGET_DISIPLIN,
            stopPct: STOP_WAIT,
            triggerLevel: trig
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'BELUM-JELAS',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'KL-L5',
                'SG-L7',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `KL-L5 SAPUAN-DWI-LAPIS (cermin): penolakan pasca-sapu RAPUH (badan ${P.postBounceMaxBodyAtr.toFixed(2)} ATR, vol ${P.postVolMean.toFixed(2)}) + rangkaian dua sisi terkonfirmasi — sapuan kedua ke atas = risiko likuidasi stop sempit -> WAIT, masuk TURUN hanya bila tutup di bawah ${trig.toFixed(2)}, stop ${STOP_WAIT}%`
            ],
            fitur
        }, 2);
    }
    if (kering && fitur.mom50Atr >= 0.3 && P.closeDistAtr >= -1.6) {
        return mk(versi, {
            aksi: 'ENTRY',
            arah: 'NAIK',
            targetPct: TARGET_DISIPLIN,
            stopPct: stopStruktural('NAIK', entry, P, atr)
        }, {
            pool: poolR,
            grab: {
                terjadi: true,
                post: 'CONTINUATION',
                cara
            },
            gauntlet: g,
            pd,
            aspek5: a5,
            pelajaranAktif: [
                'SG-L5',
                'SG-L1',
                'SG-L2'
            ],
            alasan: [
                `SG-L5 RECLAIM-PALSU (cermin, warisan): penolakan tanpa pengikut (vol ${P.postVolMean.toFixed(2)} vs rata ${fitur.volMean.toFixed(2)}) di konteks kuat -> grab bahan bakar pembelian -> ENTRY NAIK`
            ],
            fitur
        }, 3);
    }
    const trigT = Math.min(P.level - 0.8 * atr, entry - 0.25 * atr);
    return mk(versi, {
        aksi: 'WAIT',
        arah: 'TURUN',
        targetPct: TARGET_DISIPLIN,
        stopPct: STOP_WAIT,
        triggerLevel: trigT
    }, {
        pool: poolR,
        grab: {
            terjadi: true,
            post: 'BELUM-JELAS',
            cara
        },
        gauntlet: g,
        pd,
        aspek5: a5,
        pelajaranAktif: [
            'SG-L7',
            'SG-L1',
            'SG-L2'
        ],
        alasan: [
            `SG-L7 SABAR-MENUNGGU (cermin): pool rantai atas baru disapu, anatomi belum menentukan (badan ${bodyDominan.toFixed(2)} ATR) -> WAIT, masuk TURUN hanya bila tutup di bawah ${trigT.toFixed(2)}`
        ],
        fitur
    }, 2);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/arah-brain.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// MICAPROFITA SAKTI-ARAH — MESIN KEPASTIAN ARAH BERBASIS BUKTI.
//
// Mandat Guru:
//   "AGI hanya memiliki dua keputusan: BUY atau SELL."
//   "AGI dilatih untuk mencari dasar keputusan yang sekuat
//    mungkin sebelum menentukan arah — berdasarkan SELURUH
//    bukti yang tersedia."
//   "Amati -> analisis -> kumpulkan bukti -> tentukan arah ->
//    BUY/SELL -> evaluasi -> pelajari kesalahan -> benahi ->
//    tingkatkan presisi."
//
// Arsitektur: DEWAN BUKTI 8 DIMENSI (point-in-time, 60 candle):
//   AR-E1 STRUKTUR HARGA       — swing HH/HL vs LH/LL, break/retest
//   AR-E2 LIKUIDITAS           — pool disapu/diam, sisi manis mana
//   AR-E3 VOLUME               — dorongan/asimetri/klimaks vs kering
//   AR-E4 MOMENTUM             — impuls 3/12/50 candle dlm ATR
//   AR-E5 VOLATILITAS          — kompresi vs ekspansi (bahan bakar)
//   AR-E6 SUPPORT/RESISTANCE   — jarak & kekuatan level penjaga
//   AR-E7 TEKANAN BELI-JUAL    — badan/wick/engulf/close-range
//   AR-E8 PERUBAHAN KONDISI    — fase: panen-likuiditas/distribusi/
//                                kaskade/kering (pembaca episode)
//   + KETUA DEWAN: pembaca episode otak kompleks (klVonis) —
//     tracker bersertifikat 1600/1600 — memberi arah episode &
//     jangkar kalibrasi kepastian.
//
// VONIS WAJIB BINER: BUY atau SELL — tanpa SKIP (pasar tak
// kenal "tidak memutuskan" bagi pemburu yang terlatih).
// KEPASTIAN 0..100 = kekuatan sepihak bukti searah vonis;
// dikalibrasi: vonis pasti harus lebih sering benar.
// ============================================================
__turbopack_context__.s([
    "ARAH_BRAIN_VERSI",
    ()=>ARAH_BRAIN_VERSI,
    "arahCore",
    ()=>arahCore,
    "arahVonis",
    ()=>arahVonis,
    "deteksiKaskadeVoid",
    ()=>deteksiKaskadeVoid,
    "volZmax3Of",
    ()=>volZmax3Of
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/kompleks-brain.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/indicators.ts [app-client] (ecmascript)");
;
;
const ARAH_BRAIN_VERSI = '1.8';
const TARGET_DISIPLIN = 2.2;
const STOP_MIN = 1.2;
const STOP_MAX = 2.6;
const STOP_WAIT = 1.8;
// AR-L2 (bedah R1, 10 likuidasi): ekstrem sapuan WAJIB diberi ruang
// retest — amplop derau sapuan ~0.7 ATR; stop yang menempel 0.45 ATR
// di balik ekstrem tersapu retest kedua. Margin aman: 0.8 ATR.
const STOP_MARGIN_ATR = 0.8;
const clamp = (v, a, b)=>Math.min(b, Math.max(a, v));
const sgn = (v)=>v > 0 ? 1 : v < 0 ? -1 : 0;
function volZmax3Of(cs, f) {
    const n = cs.length;
    const vols = cs.map((c)=>c.v);
    const volSd = Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$indicators$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stdev"])(vols.slice(Math.max(0, n - 30))), 1e-9);
    return Math.max(...cs.slice(Math.max(0, n - 3)).map((c)=>(c.v - f.volMean) / volSd));
}
function deteksiKaskadeVoid(cs, f, kl) {
    const n = cs.length;
    const atr = Math.max(f.atr, 1e-9);
    if (kl.pool.swept) return {
        aktif: false,
        arah: 'NAIK',
        cara: 'pool terpetakan — episode ditangani tracker, bukan void'
    };
    const last = cs[n - 1];
    const lastBody = (last.c - last.o) / atr;
    // klimaks boleh duduk di lilin kedua/ketiga terakhir (lilin V sendiri
    // kadang volumenya turun setelah klimaks — bedah hakim25 #13/#14;
    // ambang 1.6: V-monster dgn klimaks agak lemah tetap sah — bedah hakim43#14)
    const volZmax3 = volZmax3Of(cs, f);
    const volKlimaks = f.lastVolZ >= 1.4 || volZmax3 >= 1.6;
    // gerak tua diukur mom30 (jendela 30 candle) — mom50 bisa terhapus
    // fasa lawan di awal jendela (bedah hakim28 #18: mom50 0.5, mom30 4.2)
    const gerakTuaNaik = f.mom30Atr >= 2.5;
    const gerakTuaTurun = f.mom30Atr <= -2.5;
    if (volKlimaks && gerakTuaNaik && lastBody <= -1.5) {
        return {
            aktif: true,
            arah: 'TURUN',
            cara: `V-mulai-VOID: gerak tua naik ${f.mom30Atr.toFixed(1)} ATR tanpa pool terpetakan, lalu lilin keputusan MENGHANTAM balik ${lastBody.toFixed(1)} ATR (klimaks z=${volZmax3 >= f.lastVolZ ? volZmax3.toFixed(1) : f.lastVolZ.toFixed(1)} di 3 candle terakhir) — panen likuidasi selesai, markdown dimulai (AR-L3)`
        };
    }
    if (volKlimaks && gerakTuaTurun && lastBody >= 1.5) {
        return {
            aktif: true,
            arah: 'NAIK',
            cara: `V-mulai-VOID: gerak tua turun ${f.mom30Atr.toFixed(1)} ATR tanpa pool terpetakan, lalu lilin keputusan MELUNCUR balik ${lastBody.toFixed(1)} ATR (klimaks z=${volZmax3 >= f.lastVolZ ? volZmax3.toFixed(1) : f.lastVolZ.toFixed(1)} di 3 candle terakhir) — panen likuidasi selesai, pemulihan dimulai (AR-L3)`
        };
    }
    return {
        aktif: false,
        arah: 'NAIK',
        cara: 'tanpa V-mulai-void'
    };
}
// ------------------------------------------------------------
// 8 DIMENSI BUKTI
// ------------------------------------------------------------
function e1Struktur(cs, f) {
    let s = 0;
    const cat = [];
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
        cat.push(`breakout ${f.breakLevel.toFixed(2)} ditahan retest`);
    }
    if (f.recentBreakDown && !f.failedRetest) {
        s -= 0.45;
        cat.push(`breakdown ${f.breakLevelDn.toFixed(2)} ditolak retest`);
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
        id: 'AR-E1',
        label: 'Struktur Harga',
        vote,
        kekuatan: clamp(Math.abs(s), 0, 1),
        bobot: 0.16,
        cara: `struktur: ${cat.length ? cat.join(', ') : 'tidak berarah'}; posisi jendela ${(f.posInWindow60 * 100).toFixed(0)}%; ema21 slope ${f.ema21SlopeAtr.toFixed(2)} ATR`
    };
}
function e2Likuiditas(kl) {
    const P = kl.pool.swept ? {
        side: kl.pool.side,
        level: kl.pool.level,
        depth: kl.pool.depthAtr,
        bars: kl.pool.barsSince,
        reclaimed: kl.pool.reclaimed
    } : null;
    if (P && P.side === 'BAWAH') {
        // AR-L5 (bedah segel22 #84): sapuan TIDAK direclaim di konteks
        // pasca-dump ekstrem = GRAB-BAHAN-BAKAR kelanjutan turun — bukan
        // bakar naik. Reversal hanya sah bila reclaim/crossback nyata.
        if (!P.reclaimed && P.bars <= 2 && (kl.pd.korbanPump || kl.fitur.mom50Atr <= -3.0)) {
            return {
                id: 'AR-E2',
                label: 'Likuiditas',
                vote: 'TURUN',
                kekuatan: 0.65,
                bobot: 0.20,
                cara: `pool bawah ${P.level.toFixed(2)} disapu ${P.bars} candle lalu TANPA reclaim di konteks pasca-dump ekstrem (${kl.pd.korbanPump ? 'korban pump menumpuk' : `mom50 ${kl.fitur.mom50Atr.toFixed(1)} ATR`}) — likuiditas long habis, grab jadi bahan bakar penjualan (AR-L5)`
            };
        }
        const k = clamp(0.45 + P.depth / 3, 0, 1) * (P.reclaimed ? 1 : 0.75);
        return {
            id: 'AR-E2',
            label: 'Likuiditas',
            vote: k > 0.3 ? 'NAIK' : 'NETRAL',
            kekuatan: k,
            bobot: 0.20,
            cara: `pool bawah ${P.level.toFixed(2)} disapu ${P.bars} candle lalu sedalam ${P.depth.toFixed(2)} ATR${P.reclaimed ? ' lalu DIRECLAIM — stop penjual dipanen' : ''}; likuiditas sell-side kering -> bakar naik`
        };
    }
    if (P && P.side === 'ATAS') {
        if (!P.reclaimed && P.bars <= 2 && (kl.pd.korbanPump || kl.fitur.mom50Atr >= 3.0)) {
            return {
                id: 'AR-E2',
                label: 'Likuiditas',
                vote: 'NAIK',
                kekuatan: 0.65,
                bobot: 0.20,
                cara: `pool atas ${P.level.toFixed(2)} disapu ${P.bars} candle lalu TANPA reclaim di konteks pasca-pump-cermin ekstrem — likuiditas short habis, grab jadi bahan bakar pembelian (AR-L5)`
            };
        }
        const k = clamp(0.45 + P.depth / 3, 0, 1) * (P.reclaimed ? 1 : 0.75);
        return {
            id: 'AR-E2',
            label: 'Likuiditas',
            vote: k > 0.3 ? 'TURUN' : 'NETRAL',
            kekuatan: k,
            bobot: 0.20,
            cara: `pool atas ${P.level.toFixed(2)} disapu ${P.bars} candle lalu sedalam ${P.depth.toFixed(2)} ATR${P.reclaimed ? ' lalu DITOLAK — stop pembeli dipanen' : ''}; likuiditas buy-side kering -> bakar turun`
        };
    }
    // tidak ada sapuan segar: pool diam = magnet sapuan
    return {
        id: 'AR-E2',
        label: 'Likuiditas',
        vote: 'NETRAL',
        kekuatan: 0.25,
        bobot: 0.20,
        cara: 'tidak ada sapuan segar terpetakan — pool terjaga; magnet likuiditas belum jelas (bukti lemah)'
    };
}
function e3Volume(cs, f) {
    const n = cs.length;
    const atr = Math.max(f.atr, 1e-9);
    let s = clamp(f.volAsym5, -1, 1) * 0.55;
    const cat = [];
    const kualitas = f.bodyUp6Atr - f.bodyDn6Atr;
    s += clamp(kualitas / 2.5, -0.45, 0.45);
    if (f.volClimax) {
        const last = cs[n - 1];
        const bodyAtr = (last.c - last.o) / atr;
        if (Math.abs(bodyAtr) >= 1.2) {
            // lilin klimaks BERBADAN MONSTER: ini bukan penyerapan/distribusi
            // penolakan — ini awal gerak baru searah badannya (AR-L3)
            s += sgn(bodyAtr) * 0.5;
            cat.push(`klimaks z=${f.volZ.toFixed(1)} dgn badan monster ${bodyAtr.toFixed(1)} ATR -> awal gerak ${bodyAtr > 0 ? 'naik' : 'turun'}`);
        } else {
            const naik = last.c >= last.o;
            // klimaks di ekstrem jendela = penyerapan/distribusi (lawan gerak sebelumnya)
            const geri = f.mom30Atr >= 0 ? -1 : 1;
            const v = naik ? geri * 0.4 : -geri * 0.4;
            s += v;
            cat.push(`klimaks volume z=${f.volZ.toFixed(1)} lilin ${naik ? 'hijau' : 'merah'} -> ${v > 0 ? 'penyerapan' : 'distribusi'} klimaks`);
        }
    }
    if (f.volZmidMax >= 1.5) {
        s += sgn(f.mom12Atr) * 0.2;
        cat.push(`jejak dorongan tengah z=${f.volZmidMax.toFixed(1)}`);
    }
    const vote = s > 0.18 ? 'NAIK' : s < -0.18 ? 'TURUN' : 'NETRAL';
    return {
        id: 'AR-E3',
        label: 'Volume',
        vote,
        kekuatan: clamp(Math.abs(s), 0, 1),
        bobot: 0.13,
        cara: `volume: asimetri5 ${f.volAsym5.toFixed(2)}; kualitas badan naik ${f.bodyUp6Atr.toFixed(2)} vs turun ${f.bodyDn6Atr.toFixed(2)} ATR; volZ ${f.volZ.toFixed(1)}${cat.length ? '; ' + cat.join(', ') : ''}`
    };
}
function e4Momentum(f) {
    const s = clamp(f.mom12Atr / 2, -1, 1) * 0.55 + clamp(f.mom3Atr / 1.5, -1, 1) * 0.35 + clamp(f.mom50Atr / 4, -1, 1) * 0.10;
    const vote = s > 0.15 ? 'NAIK' : s < -0.15 ? 'TURUN' : 'NETRAL';
    return {
        id: 'AR-E4',
        label: 'Momentum',
        vote,
        kekuatan: clamp(Math.abs(s), 0, 1),
        bobot: 0.12,
        cara: `momentum: mom3 ${f.mom3Atr.toFixed(2)} · mom12 ${f.mom12Atr.toFixed(2)} · mom50 ${f.mom50Atr.toFixed(2)} ATR (impuls ${f.mom12Atr >= 0 ? 'naik' : 'turun'})`
    };
}
function e5Volatilitas(cs, f) {
    void cs;
    // volatilitas sendiri jarang berarah; ia memberi tahu BAHAN BAKAR:
    // kompresi -> ledakan segera (ikuti impuls); ekspansi klimaks -> habis (lawan)
    if (f.squeeze) {
        const vote = f.mom3Atr >= 0 ? 'NAIK' : 'TURUN';
        return {
            id: 'AR-E5',
            label: 'Volatilitas',
            vote,
            kekuatan: 0.35,
            bobot: 0.07,
            cara: `kompresi volatilitas (BB sempit) — ledakan menunggu arah; impuls sesaat condong ${vote.toLowerCase()}`
        };
    }
    if (f.rangeAtr >= 1.8 && Math.abs(f.mom30Atr) >= 2.0) {
        const vote = f.mom30Atr >= 0 ? 'TURUN' : 'NAIK';
        return {
            id: 'AR-E5',
            label: 'Volatilitas',
            vote,
            kekuatan: 0.4,
            bobot: 0.07,
            cara: `ekspansi klimaks di ujun gerak ${f.mom30Atr >= 0 ? 'naik' : 'turun'} ${Math.abs(f.mom30Atr).toFixed(1)} ATR — bahan bakar menipis, risiko pembalikan`
        };
    }
    return {
        id: 'AR-E5',
        label: 'Volatilitas',
        vote: 'NETRAL',
        kekuatan: 0.15,
        bobot: 0.07,
        cara: `volatilitas normal (range ${f.rangeAtr.toFixed(2)} ATR, ATR% ${(f.atrPct * 100).toFixed(2)}) — tanpa sinyal bahan bakar`
    };
}
function e6SentiangResistensi(f) {
    const price = f.price;
    // level penjaga: rangeHigh/Low + break level
    const res = Math.min(f.rangeHigh, f.recentBreakUp ? f.breakLevel : Infinity);
    const sup = Math.max(f.rangeLow, f.recentBreakDown ? f.breakLevelDn : -Infinity);
    const dRes = (res - price) / Math.max(f.atr, 1e-9);
    const dSup = (price - sup) / Math.max(f.atr, 1e-9);
    let vote = 'NETRAL';
    let kek = 0.2;
    let cara = `S/R: resistance ${isFinite(res) ? res.toFixed(2) : '—'} (${dRes.toFixed(1)} ATR), support ${isFinite(sup) ? sup.toFixed(2) : '—'} (${dSup.toFixed(1)} ATR)`;
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
    return {
        id: 'AR-E6',
        label: 'Support/Resistance',
        vote,
        kekuatan: kek,
        bobot: 0.08,
        cara
    };
}
function e7Tekanan(cs, f) {
    const n = cs.length;
    const atr = Math.max(f.atr, 1e-9);
    let s = clamp(f.bodyRatio3Atr / 1.2, -0.5, 0.5);
    let uw = 0;
    let lw = 0;
    for(let k = Math.max(1, n - 5); k < n; k++){
        const c = cs[k];
        uw += c.h - Math.max(c.o, c.c);
        lw += Math.min(c.o, c.c) - c.l;
    }
    s += clamp((lw - uw) / (2.2 * atr), -0.35, 0.35);
    if (f.bullEngulf) s += 0.25;
    if (f.bearEngulf) s -= 0.25;
    const last = cs[n - 1];
    const posClose = (last.c - last.l) / Math.max(last.h - last.l, 1e-9);
    s += (posClose - 0.5) * 0.4;
    const vote = s > 0.18 ? 'NAIK' : s < -0.18 ? 'TURUN' : 'NETRAL';
    return {
        id: 'AR-E7',
        label: 'Tekanan Beli-Jual',
        vote,
        kekuatan: clamp(Math.abs(s), 0, 1),
        bobot: 0.12,
        cara: `tekanan: netto badan3 ${f.bodyRatio3Atr.toFixed(2)} ATR; wick bawah ${(lw / atr).toFixed(1)} vs atas ${(uw / atr).toFixed(1)} ATR (5 candle); close di ${(posClose * 100).toFixed(0)}% range lilin${f.bullEngulf ? '; bull engulf' : ''}${f.bearEngulf ? '; bear engulf' : ''}`
    };
}
function e8PerubahanKondisi(kl, f, kv) {
    // AR-L3: kaskade-void-crossback = transisi fasa paling tegas
    if (kv.aktif) {
        return {
            id: 'AR-E8',
            label: 'Perubahan Kondisi',
            vote: kv.arah === 'NAIK' ? 'NAIK' : 'TURUN',
            kekuatan: 0.9,
            bobot: 0.12,
            cara: kv.cara
        };
    }
    // fase pasar berubah? — baca episode dari tracker bersertifikat
    if (kl.grab.terjadi && kl.grab.post === 'REVERSAL') {
        const arah = kl.arah === 'NAIK' ? 'NAIK' : 'TURUN';
        return {
            id: 'AR-E8',
            label: 'Perubahan Kondisi',
            vote: arah,
            kekuatan: 0.85,
            bobot: 0.12,
            cara: `FASA BERUBAH: panen likuiditas selesai — ${kl.grab.cara}; kondisi bergeser ke pemulihan ${arah.toLowerCase()}`
        };
    }
    if (kl.pd.korbanPump) {
        const arah = kl.pd.pumpArah === 'NAIK' ? 'TURUN' : 'NAIK';
        return {
            id: 'AR-E8',
            label: 'Perubahan Kondisi',
            vote: arah,
            kekuatan: 0.55,
            bobot: 0.12,
            cara: `pasca-${kl.pd.pumpArah === 'NAIK' ? 'pump-dump' : 'dump-pump'}: korban pump kini stop-loss cluster — kontinju tekanan ${arah === 'NAIK' ? 'beli' : 'jual'}`
        };
    }
    if (f.consecDownBig >= 3 && f.lastVolZ >= 1.2) {
        return {
            id: 'AR-E8',
            label: 'Perubahan Kondisi',
            vote: 'NAIK',
            kekuatan: 0.6,
            bobot: 0.12,
            cara: `kaskade ${f.consecDownBig} merah besar + klimaks z=${f.lastVolZ.toFixed(1)} — mesin likuidasi kehabisan bahan bakar, kondisi bergeser`
        };
    }
    if (f.consecUpBig >= 3 && f.lastVolZ >= 1.2) {
        return {
            id: 'AR-E8',
            label: 'Perubahan Kondisi',
            vote: 'TURUN',
            kekuatan: 0.6,
            bobot: 0.12,
            cara: `squeeza ${f.consecUpBig} hijau besar + klimaks z=${f.lastVolZ.toFixed(1)} — likuidasi short selesai, kondisi bergeser`
        };
    }
    return {
        id: 'AR-E8',
        label: 'Perubahan Kondisi',
        vote: 'NETRAL',
        kekuatan: 0.2,
        bobot: 0.12,
        cara: 'kondisi pasar berlanjut tanpa transisi fase yang terbaca'
    };
}
// ------------------------------------------------------------
// KETUA DEWAN — kalibrasi kepastian dari tracker bersertifikat
// ------------------------------------------------------------
function eksekusiStop(kl, arah, entry, atr) {
    const P = kl.pool;
    if (P.swept && P.depthAtr >= 0.4) {
        const extreme = P.side === 'BAWAH' ? P.level - P.depthAtr * atr : P.level + P.depthAtr * atr;
        const stopPrice = arah === 'NAIK' ? extreme - STOP_MARGIN_ATR * atr : extreme + STOP_MARGIN_ATR * atr;
        const pct = arah === 'NAIK' ? (entry - stopPrice) / entry * 100 : (stopPrice - entry) / entry * 100;
        return {
            stopPct: clamp(pct, STOP_MIN, STOP_MAX),
            sumber: `stop struktural ${STOP_MARGIN_ATR} ATR di balik ekstrem sapuan (AR-L2)`
        };
    }
    return {
        stopPct: 2.0,
        sumber: 'stop default 2.0% (tanpa pool terpetakan)'
    };
}
function arahVonis(cs, versi = ARAH_BRAIN_VERSI) {
    const kl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klVonis"])(cs);
    const f = kl.fitur;
    const n = cs.length;
    const atr = Math.max(f.atr, 1e-9);
    const entry = cs[n - 1].c;
    const kv = deteksiKaskadeVoid(cs, f, kl);
    const bukti = [
        e2Likuiditas(kl),
        e1Struktur(cs, f),
        e3Volume(cs, f),
        e7Tekanan(cs, f),
        e4Momentum(f),
        e8PerubahanKondisi(kl, f, kv),
        e6SentiangResistensi(f),
        e5Volatilitas(cs, f)
    ];
    // fusi dewan
    let skor = 0;
    let bobotNaik = 0;
    let bobotTurun = 0;
    for (const b of bukti){
        const w = sgn(b.vote === 'NAIK' ? 1 : b.vote === 'TURUN' ? -1 : 0) * b.kekuatan * b.bobot;
        skor += w;
        if (b.vote === 'NAIK') bobotNaik += b.kekuatan * b.bobot;
        if (b.vote === 'TURUN') bobotTurun += b.kekuatan * b.bobot;
    }
    const skorArah = clamp(skor * 100, -100, 100);
    const konsensus = (()=>{
        const tot = bobotNaik + bobotTurun;
        return tot <= 0 ? 0.5 : Math.max(bobotNaik, bobotTurun) / tot;
    })();
    // KETUA DEWAN: tracker bersertifikat memberi arah episode + jangkar kepastian
    let arah;
    let kepastian;
    let lapisan;
    let umpanFlip = false;
    let tundaTrigger = false;
    const volZmax3 = volZmax3Of(cs, f);
    const setuju = kl.aksi !== 'SKIP' && kl.arah === 'NAIK' === skorArah >= 0;
    if (kl.aksi === 'ENTRY') {
        arah = kl.arah;
        lapisan = `KETUA-EPISODE(${kl.pelajaranAktif.join('+') || 'core'})`;
        // tracker ENTRY = episode terbaca jelas; dewan searah -> makin pasti
        kepastian = 84 + (setuju ? clamp(konsensus - 0.5, 0, 0.5) * 24 : -8);
        // AR-L7 (bedah segel31#64): reclaim dgn volume KERING TOTAL
        // (lastVolZ <= -0.8, volZmax3 <= 1.2, bars=1, depth dangkal, dua sisi
        // trap) = pantulan rapuh — sapuan kedua lazim. Turunkan eksekusi ke
        // order-trigger (arah vonis TETAP; pemburu tak menembak pantulan
        // tanpa pengikut).
        if (kl.gauntlet.twoSisi && kl.pool.barsSince === 1 && kl.pool.depthAtr <= 1.0 && f.lastVolZ <= -0.8 && volZmax3 <= 1.2) {
            tundaTrigger = true;
            lapisan += '+AR-L7-TUNDA';
        }
    } else if (kl.aksi === 'WAIT') {
        arah = kl.arah;
        lapisan = 'KETUA-TRIGGER';
        // tracker WAIT = arah episode jelas, konfirmasi menunggu (AR-L1:
        // eksekusi = order menunggu di level konfirmasi tracker, BUKAN
        // market order sekarang — pemburu menunggu jejak, bukan menembak
        // asal; bedah R1: 10 likuidasi klaster dwi-lapis dari paksa-masuk)
        kepastian = 70 + (setuju ? clamp(konsensus - 0.5, 0, 0.5) * 16 : -6);
        // AR-L4 (bedah residu hakim7 #54): WAIT searah pool TAPI konteks
        // momentum-50 EKSTREM berlawanan + level TIDAK direclaim + harga
        // menempel level = UMPAN RECLAIM/REJECT — ikuti konteks, bukan
        // pantulan secekil (warisan SG-L5: reclaim tanpa pengikut di
        // konteks lemah adalah bahan bakar kelanjutan)
        const pool = kl.pool;
        const closeDistPool = pool.side === 'BAWAH' ? (entry - pool.level) / atr : (pool.level - entry) / atr;
        // AR-L4 v1.6: konteks diperluas — korbanPump (jejak dump ekstrem)
        // juga membuktikan konteks beruang/banteng dalam (segel22 #84:
        // mom50 -3.82 belum menyentuh -4.5, tapi korbanPump + jatuh 10 ATR)
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
        // AR-L6 (bedah segel31#93/#94 vs hakim41#54; diperluas hakim55#94):
        // WAIT/TURUN di pool ATAS tak-reclaimed PASCA-DUMP (korbanPump +
        // mom50 <= -3) — pemisah deepdump-V vs FAKE-kontinju: momentum
        // pendek SUDAH berbalik (mom12 >= 0.3 ATAU mom3 >= 1.5 — V bisa
        // dimulai lilin ini sendiri) dan harga sudah di ema = V-reclaim
        // dimulai; mom12/mom3 masih negatif & harga jauh di bawah ema =
        // distribusi berlanjut (tetap TURUN).
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
        // SKIP: tanpa edge likuiditas -> dewan penuh yang memutuskan
        arah = skorArah >= 0 ? 'NAIK' : 'TURUN';
        lapisan = 'KETUA-DEWAN-PENUH';
        kepastian = 55 + Math.abs(skorArah) * 0.28;
        // AR-L3: V-mulai-void — dewan terbelah saat void (struktur/momentum
        // masih searah gerak tua); sinyal penentu = lilin V monster klimaks
        // pada lilin keputusan (bedah hakim r2, hipotesis-1 terbantahkan)
        if (kv.aktif) {
            arah = kv.arah;
            lapisan = 'KETUA-KASKADE-VOID(AR-L3)';
            kepastian = 64 + konsensus * 8;
        }
    }
    kepastian = Math.round(clamp(kepastian, 5, 97));
    const vonis = arah === 'NAIK' ? 'BUY' : 'SELL';
    const st = eksekusiStop(kl, arah, entry, atr);
    // AR-L1: lapisan trigger -> order menunggu konfirmasi (arah tetap biner)
    // AR-L4/L6: umpan-flip -> masuk langsung searah konteks, stop lebih tebal
    // AR-L7: episode ditunda ke trigger (reclaim kering, sapuan kedua lazim)
    const trigLvl = Math.max(kl.pool.level + 0.8 * atr, entry + 0.25 * atr);
    const eksekusi = umpanFlip ? {
        aksi: 'ENTRY',
        targetPct: TARGET_DISIPLIN,
        stopPct: clamp(st.stopPct, 1.8, STOP_MAX),
        sumber: `${st.sumber} + tebal utk umpan-flip (AR-L4/L6)`
    } : tundaTrigger ? {
        aksi: 'WAIT',
        targetPct: TARGET_DISIPLIN,
        stopPct: STOP_WAIT,
        triggerLevel: trigLvl,
        sumber: 'order menunggu reclaim bervolume (AR-L7: pantulan kering rapuh)'
    } : kl.aksi === 'WAIT' && kl.triggerLevel ? {
        aksi: 'WAIT',
        targetPct: TARGET_DISIPLIN,
        stopPct: STOP_WAIT,
        triggerLevel: kl.triggerLevel,
        sumber: 'order menunggu di level konfirmasi tracker (AR-L1)'
    } : {
        aksi: 'ENTRY',
        targetPct: TARGET_DISIPLIN,
        stopPct: st.stopPct,
        sumber: st.sumber
    };
    const searah = bukti.filter((b)=>arah === 'NAIK' ? b.vote === 'NAIK' : b.vote === 'TURUN').sort((a, b)=>b.kekuatan * b.bobot - a.kekuatan * a.bobot).slice(0, 3).map((b)=>`${b.id} ${b.label}: ${b.cara}`);
    const alasan = [
        `VONIS ${vonis} (kepastian ${kepastian}%, konsensus dewan ${(konsensus * 100).toFixed(0)}%) — ${lapisan}`,
        ...searah,
        `jejak 5 aspek: bullTrap=${kl.aspek5.bullTrap ? 'YA' : 'n'} bearTrap=${kl.aspek5.bearTrap ? 'YA' : 'n'} pumpDump=${kl.aspek5.pumpDump ? 'YA' : 'n'} falseBreakout=${kl.aspek5.falseBreakout ? 'YA' : 'n'} stopHunt=${kl.aspek5.stopHunt ? 'YA' : 'n'}`,
        kl.aspek5.rangkaianUtuh ? `rangkaian: ${kl.aspek5.rangkaianUtuh}` : 'rangkaian belum utuh'
    ];
    return {
        versi,
        vonis,
        arah,
        kepastian,
        skorArah,
        bukti,
        buktiKunci: searah,
        eksekusi,
        lapisan,
        konsensus,
        alasan,
        kl: {
            aksi: kl.aksi,
            arah: kl.arah,
            pelajaran: kl.pelajaranAktif,
            aspek5: kl.aspek5,
            poolLevel: kl.pool.level,
            poolSide: kl.pool.side,
            poolSwept: kl.pool.swept
        }
    };
}
function arahCore(cs) {
    const f = (()=>{
        const kl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["klVonis"])(cs, '0.9');
        return kl.fitur;
    })();
    const arah = f.recentBreakDown ? 'TURUN' : f.recentBreakUp ? 'NAIK' : f.mom12Atr >= 0 ? 'NAIK' : 'TURUN';
    return {
        versi: '0.9',
        vonis: arah === 'NAIK' ? 'BUY' : 'SELL',
        arah,
        kepastian: 50,
        skorArah: arah === 'NAIK' ? 40 : -40,
        bukti: [],
        buktiKunci: [],
        eksekusi: {
            aksi: 'ENTRY',
            targetPct: 2.2,
            stopPct: 2.2,
            sumber: 'core'
        },
        lapisan: 'CORE-NAIF',
        konsensus: 0.5,
        alasan: [
            'CORE: mengikuti breakout/momentum tanpa dewan bukti (naif)'
        ],
        kl: {
            aksi: 'ENTRY',
            arah,
            pelajaran: [],
            aspek5: {
                stopHunt: false,
                falseBreakout: false,
                pumpDump: false,
                bearTrap: false,
                bullTrap: false,
                rangkaianUtuh: ''
            },
            poolLevel: 0,
            poolSide: 'TAK-JELAS',
            poolSwept: false
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/exam/prareg.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GENESIS",
    ()=>GENESIS,
    "H_CEK",
    ()=>H_CEK,
    "ZONA_MATI_ATR",
    ()=>ZONA_MATI_ATR,
    "hashKunci",
    ()=>hashKunci,
    "kanonikal",
    ()=>kanonikal,
    "nilaiKoherensi",
    ()=>nilaiKoherensi,
    "payloadKunci",
    ()=>payloadKunci,
    "sha256Hex",
    ()=>sha256Hex,
    "tambahEntri",
    ()=>tambahEntri,
    "verifikasiRantai",
    ()=>verifikasiRantai
]);
// ============================================================
// PRA-REGISTRASI PREDIKSI — INTI BUKTI "SEBELUM TERJADI".
//
// Mandat Guru:
//   "sebisa mungkin kepahaman dia sangat melampaui Dan mampu
//    menembak akurasi yang sangat koheren SEBELUM prediksi itu
//    terjadi."
//
// Prinsip: prediksi yang belum dikunci = prediksi yang bisa
// dibohongi. Maka setiap prediksi WAJIB:
//   1. DIKUNCI lebih dulu (ledger append-only) — berisi arah,
//      kepastian, dan TRAJEKTORI 4 titik pemeriksaan (candle
//      horizon ke-3/7/11/14) — lalu file ledger DITULIS ke disk
//      SEBELUM horizon dibuka.
//   2. DIRANTAI HASH (SHA-256, implementasi murni TS tanpa
//      dependensi — digest identik antara runner Bun, browser,
//      dan organ SAKTI): setiap entri memuat `prev` = hash
//      entri sebelumnya; mengubah satu bit pun merusak rantai.
//   3. DIBUKA kemudian: resolusi menghitung koherensi trajektori
//      vs pergerakan nyata; integritas rantai diverifikasi ulang.
//
// Fase cek: 'NAIK' | 'TURUN' | 'DATAR' (zona mati DATAR: |Δ| <
// 0.15 ATR) pada candle horizon ke-3, 7, 11, 14.
// ============================================================
// ---------- SHA-256 murni TS (sinkron, tanpa dependensi) ----------
// Vektor uji wajib: sha256('abc') =
//   ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
const K = [
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
];
const rotr = (x, n)=>x >>> n | x << 32 - n;
function sha256Hex(pesan) {
    // UTF-8 encode
    const bytes = [];
    const enc = new TextEncoder();
    const raw = enc.encode(pesan);
    for(let i = 0; i < raw.length; i++)bytes.push(raw[i]);
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while(bytes.length % 64 !== 56)bytes.push(0);
    // panjang 64-bit big-endian (cukup 32-bit rendah utk pesan < 512MB)
    const hi = Math.floor(bitLen / 0x100000000);
    const lo = bitLen >>> 0;
    bytes.push(hi >>> 24 & 255, hi >>> 16 & 255, hi >>> 8 & 255, hi & 255);
    bytes.push(lo >>> 24 & 255, lo >>> 16 & 255, lo >>> 8 & 255, lo & 255);
    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
    let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    const w = new Array(64);
    for(let off = 0; off < bytes.length; off += 64){
        for(let t = 0; t < 16; t++){
            w[t] = (bytes[off + t * 4] << 24 | bytes[off + t * 4 + 1] << 16 | bytes[off + t * 4 + 2] << 8 | bytes[off + t * 4 + 3]) >>> 0;
        }
        for(let t = 16; t < 64; t++){
            const s0 = rotr(w[t - 15], 7) ^ rotr(w[t - 15], 18) ^ w[t - 15] >>> 3;
            const s1 = rotr(w[t - 2], 17) ^ rotr(w[t - 2], 19) ^ w[t - 2] >>> 10;
            w[t] = w[t - 16] + s0 + w[t - 7] + s1 >>> 0;
        }
        let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
        for(let t = 0; t < 64; t++){
            const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
            const ch = e & f ^ ~e & g;
            const t1 = h + S1 + ch + K[t] + w[t] >>> 0;
            const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
            const maj = a & b ^ a & c ^ b & c;
            const t2 = S0 + maj >>> 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 >>> 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 >>> 0;
        }
        h0 = h0 + a >>> 0;
        h1 = h1 + b >>> 0;
        h2 = h2 + c >>> 0;
        h3 = h3 + d >>> 0;
        h4 = h4 + e >>> 0;
        h5 = h5 + f >>> 0;
        h6 = h6 + g >>> 0;
        h7 = h7 + h >>> 0;
    }
    return [
        h0,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        h7
    ].map((x)=>(x >>> 0).toString(16).padStart(8, '0')).join('');
}
function kanonikal(x) {
    if (x === null || typeof x === 'number') {
        if (typeof x === 'number') {
            if (!Number.isFinite(x)) return 'null';
            if (Number.isInteger(x)) return String(x);
            return String(parseFloat(x.toFixed(6)));
        }
        return 'null';
    }
    if (typeof x === 'string') return JSON.stringify(x);
    if (typeof x === 'boolean') return x ? 'true' : 'false';
    if (Array.isArray(x)) return '[' + x.map(kanonikal).join(',') + ']';
    const o = x;
    const kunci = Object.keys(o).sort();
    return '{' + kunci.map((k)=>JSON.stringify(k) + ':' + kanonikal(o[k])).join(',') + '}';
}
const H_CEK = [
    3,
    7,
    11,
    14
];
const ZONA_MATI_ATR = 0.15;
const GENESIS = '0'.repeat(64);
function payloadKunci(k) {
    return {
        nomor: k.nomor,
        ns: k.ns,
        seed: k.seed,
        simbol: k.simbol,
        arah: k.arah,
        kepastian: k.kepastian,
        cek: k.cek,
        dasar: k.dasar,
        versiOtak: k.versiOtak,
        waktu: k.waktu,
        prev: k.prev
    };
}
function hashKunci(k) {
    return sha256Hex(kanonikal(payloadKunci(k)));
}
function tambahEntri(led, k) {
    const prev = led.rantai.length ? led.rantai[led.rantai.length - 1].hash : GENESIS;
    const kunci = {
        ...k,
        prev
    };
    const entri = {
        hash: hashKunci(kunci),
        kunci
    };
    led.rantai.push(entri);
    led.jumlah = led.rantai.length;
    return entri;
}
function verifikasiRantai(led) {
    let prev = GENESIS;
    for(let i = 0; i < led.rantai.length; i++){
        const e = led.rantai[i];
        if (e.kunci.prev !== prev) return {
            ok: false,
            jumlah: led.rantai.length,
            indeksRusak: i
        };
        if (hashKunci(e.kunci) !== e.hash) return {
            ok: false,
            jumlah: led.rantai.length,
            indeksRusak: i
        };
        prev = e.hash;
    }
    return {
        ok: true,
        jumlah: led.rantai.length,
        indeksRusak: -1
    };
}
function faseDariMove(moveAtr) {
    if (Math.abs(moveAtr) < ZONA_MATI_ATR) return 'DATAR';
    return moveAtr > 0 ? 'NAIK' : 'TURUN';
}
function nilaiKoherensi(cek, moveAtr) {
    const terisi = H_CEK.map((h, i)=>{
        const move = moveAtr[i] ?? 0;
        const terwujud = faseDariMove(move);
        return {
            h,
            commit: cek[i],
            moveAtr: Math.round(move * 1000) / 1000,
            terwujud,
            cocok: terwujud === cek[i]
        };
    });
    const skor = terisi.filter((c)=>c.cocok).length;
    return {
        cek: terisi,
        skor,
        rasio: Math.round(skor / 4 * 10000) / 10000
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_exam_26268a4b._.js.map