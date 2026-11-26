
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
