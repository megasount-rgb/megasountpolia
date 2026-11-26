
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
