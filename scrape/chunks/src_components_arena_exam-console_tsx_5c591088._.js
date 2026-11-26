(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/arena/exam-console.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamConsole",
    ()=>ExamConsole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// UJIAN SIMULASI — 100 pasar buta per suite.
// Filosofi (kata Guru): kecerdasan sejati bukan yang terlihat benar
// setelah kejadian, melainkan yang menembak akurat dengan informasi
// terbatas saat itu. Karena itu mesin HANYA menerima 144 jam pertama;
// 24 jam penilaian tidak pernah bocor ke keputusan.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.js [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const pct = (v, d = 0)=>`${(v * 100).toFixed(d)}%`;
const sgn = (v, d = 1)=>`${v >= 0 ? '+' : ''}${(v * 100).toFixed(d)}%`;
const metaArch = (id, st)=>st?.meta.archetypes.find((a)=>a.id === id);
const SEV_TONE = {
    FATAL: 'border-rose-500/50 bg-rose-500/10 text-rose-200',
    SERIUS: 'border-orange-500/50 bg-orange-500/10 text-orange-200',
    PERINGATAN: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
    KUAT: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
};
// ---------------- grafik candle SVG ----------------
function CandleChart({ vis, hor, entry, revealed, horLabel }) {
    const W = 840;
    const H = 250;
    const pad = 6;
    const all = revealed ? [
        ...vis,
        ...hor
    ] : vis;
    const lo = Math.min(...all.map((c)=>c[3]));
    const hi = Math.max(...all.map((c)=>c[2]));
    const span = hi - lo || 1;
    const y = (p)=>pad + (1 - (p - lo) / span) * (H - 2 * pad);
    const n = vis.length + hor.length;
    const step = W / n;
    const bw = Math.max(1.6, step * 0.62);
    const x = (i)=>i * step + step / 2;
    const candle = (c, i, dim)=>{
        const [t, o, h, l, cl] = c;
        const up = cl >= o;
        const col = up ? '#34d399' : '#fb7185';
        const op = dim ? 0.45 : 0.95;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            opacity: op,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: x(i),
                    x2: x(i),
                    y1: y(h),
                    y2: y(l),
                    stroke: col,
                    strokeWidth: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: x(i) - bw / 2,
                    y: y(Math.max(o, cl)),
                    width: bw,
                    height: Math.max(1, Math.abs(y(o) - y(cl))),
                    fill: col,
                    rx: 0.5
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this)
            ]
        }, t, true, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${W} ${H}`,
        className: "w-full rounded-lg border border-slate-800 bg-slate-950/60",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: 0,
                x2: W,
                y1: y(entry),
                y2: y(entry),
                stroke: "#f59e0b",
                strokeDasharray: "4 3",
                strokeWidth: 1,
                opacity: 0.8
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            vis.map((c, i)=>candle(c, i, false)),
            revealed && hor.map((c, i)=>candle(c, vis.length + i, true)),
            !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: x(vis.length) - 2,
                        y: pad,
                        width: W - x(vis.length) + 2,
                        height: H - 2 * pad,
                        fill: "#0f172a",
                        opacity: 0.85
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: (x(vis.length) + W) / 2,
                        y: H / 2,
                        textAnchor: "middle",
                        fill: "#64748b",
                        fontSize: 12,
                        fontFamily: "ui-sans-serif",
                        children: horLabel ?? 'HORIZON 24 JAM — tersembunyi sampai vonis dibuka'
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this),
            revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: x(vis.length),
                x2: x(vis.length),
                y1: pad,
                y2: H - pad,
                stroke: "#475569",
                strokeDasharray: "3 3",
                strokeWidth: 1
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 211,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_c = CandleChart;
function FactorBar({ label, value, weight }) {
    const w = Math.min(1, Math.abs(value)) * 50;
    const pos = value >= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 text-[11px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-24 shrink-0 text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-3 flex-1 rounded bg-slate-800/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-0 h-full w-px bg-slate-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute top-0 h-full rounded ${pos ? 'bg-emerald-500/80' : 'bg-rose-500/80'}`,
                        style: pos ? {
                            left: '50%',
                            width: `${w}%`
                        } : {
                            right: '50%',
                            width: `${w}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-16 shrink-0 text-right font-mono text-slate-300",
                children: [
                    sgn(value, 2),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-500",
                        children: [
                            "×",
                            weight.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 230,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_c1 = FactorBar;
function ExamConsole() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [suite, setSuite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('A');
    const [openId, setOpenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filterArch, setFilterArch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [filterRes, setFilterRes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [contestant, setContestant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('MICAPROFITA-V3');
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExamConsole.useCallback[load]": async ()=>{
            try {
                setErr(null);
                const res = await fetch('/api/exam', {
                    cache: 'no-store'
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setState(await res.json());
            } catch (e) {
                setErr(e.message);
            }
        }
    }["ExamConsole.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamConsole.useEffect": ()=>{
            load();
        }
    }["ExamConsole.useEffect"], [
        load
    ]);
    const s = state?.suites[suite];
    const v3Board = s?.leaderboard.find((b)=>b.id === 'MICAPROFITA-V3');
    const v1Board = s?.leaderboard.find((b)=>b.id === 'MICAPROFITA');
    const tests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ExamConsole.useMemo[tests]": ()=>{
            if (!s) return [];
            const pickArr = s.picks[contestant] ?? [];
            return s.tests.map({
                "ExamConsole.useMemo[tests]": (t, i)=>({
                        t,
                        p: pickArr[i]
                    })
            }["ExamConsole.useMemo[tests]"]).filter({
                "ExamConsole.useMemo[tests]": ({ p })=>!!p
            }["ExamConsole.useMemo[tests]"]).filter({
                "ExamConsole.useMemo[tests]": ({ t })=>filterArch === 'ALL' || t.archId === filterArch
            }["ExamConsole.useMemo[tests]"]).filter({
                "ExamConsole.useMemo[tests]": ({ p })=>filterRes === 'ALL' || (filterRes === 'BENAR' ? p.correct : !p.correct)
            }["ExamConsole.useMemo[tests]"]);
        }
    }["ExamConsole.useMemo[tests]"], [
        s,
        contestant,
        filterArch,
        filterRes
    ]);
    if (err) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-rose-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this),
                    " Gagal memuat ujian: ",
                    err,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        variant: "outline",
                        onClick: load,
                        className: "ml-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 281,
                                columnNumber: 79
                            }, this),
                            " Ulangi"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 278,
            columnNumber: 7
        }, this);
    }
    if (!state || !s) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3 py-16 text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-6 w-6 animate-spin text-amber-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: "Membangkitkan 100 pasar buatan & menjalankan ujian buta…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-500",
                        children: "perhitungan pertama memakan ±10-30 detik — semua deterministik dari seed"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 288,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-start justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-3xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-amber-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-bold tracking-wide",
                                            children: [
                                                "UJIAN SIMULASI — ",
                                                state.meta.suiteSize,
                                                " Pasar Buta per Suite"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 306,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm italic leading-relaxed text-slate-300",
                                    children: "“Yang benar-benar cerdas bukan yang selalu terlihat benar setelah kejadian, melainkan yang kuat membuat prediksi dengan informasi yang tersedia saat itu — dan akurat dengan batasan informasi yang ada.”"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-slate-500",
                                    children: [
                                        "Ujian ini untuk menemukan celah cyborg. Setiap pasar dibangkitkan dari seed deterministik: mesin hanya melihat ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            className: "text-slate-300",
                                            children: [
                                                state.meta.visible,
                                                " jam pertama"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 314,
                                            columnNumber: 35
                                        }, this),
                                        ", vonis dinilai dari",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            className: "text-slate-300",
                                            children: [
                                                state.meta.horizon,
                                                " jam sesudahnya"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this),
                                        ". Mustahil bocor — masa depan tidak pernah masuk ke keputusan."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid shrink-0 grid-cols-2 gap-2 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                    label: "Jam / pasar",
                                    val: String(state.meta.total)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 319,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                    label: "Arketipe",
                                    val: String(state.meta.archetypes.length)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 320,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                    label: "Terlihat",
                                    val: `${state.meta.visible}j`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                    label: "Vonis",
                                    val: `${state.meta.horizon}j`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                children: state.gates.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-xl border p-4 ${g.pass ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs font-semibold",
                                children: [
                                    g.pass ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-4 w-4 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 332,
                                        columnNumber: 25
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        className: "h-4 w-4 text-rose-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 332,
                                        columnNumber: 81
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: g.pass ? 'text-emerald-300' : 'text-rose-300',
                                        children: [
                                            g.id,
                                            " — ",
                                            g.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-slate-400",
                                children: g.detail
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this)
                        ]
                    }, g.id, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CandleSection, {
                st: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BeartrapSection, {
                st: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StophuntSection, {
                st: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    [
                        'A',
                        'B'
                    ].map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSuite(x),
                            className: `rounded-lg border px-4 py-1.5 text-sm font-semibold transition ${suite === x ? 'border-amber-500/60 bg-amber-500/10 text-amber-300' : 'border-slate-800 text-slate-400 hover:text-slate-200'}`,
                            children: [
                                "Suite ",
                                x
                            ]
                        }, x, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 348,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 text-xs text-slate-500",
                        children: [
                            "Suite ",
                            suite,
                            " — ",
                            state.meta.suiteSize,
                            " pasar, seed ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "text-slate-400",
                                children: 'MICAPROFITA/UJIAN-SIM/' + suite + '/*'
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 359,
                                columnNumber: 62
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                title: "Papan Hasil — menembak sebaik mana?",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 364,
                    columnNumber: 68
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full min-w-[760px] text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-3",
                                                children: "Kontestan"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 369,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Akurasi"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 370,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Brier ↓"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 371,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Skor yakin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 372,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Bias naik"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Yakin-salah"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Streak"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 368,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: s.leaderboard.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            onClick: ()=>setContestant(b.id),
                                            className: `cursor-pointer border-b border-slate-800/60 transition hover:bg-slate-800/30 ${contestant === b.id ? 'bg-slate-800/40' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 pr-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "h-2.5 w-2.5 rounded-full",
                                                                    style: {
                                                                        background: b.color
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold",
                                                                    style: {
                                                                        color: b.color
                                                                    },
                                                                    children: b.short
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                    lineNumber: 388,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-slate-500",
                                                                    children: b.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                    lineNumber: 389,
                                                                    columnNumber: 23
                                                                }, this),
                                                                b.id === 'MICAPROFITA-V3' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    className: "border-amber-500/50 bg-amber-500/10 text-amber-300",
                                                                    children: "KITA"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 53
                                                                }, this),
                                                                b.id === 'DADU' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    className: "border-slate-700 text-slate-400",
                                                                    children: "lantai"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 43
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 max-w-md text-xs text-slate-500",
                                                            children: b.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 393,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-2 w-20 overflow-hidden rounded bg-slate-800",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-full rounded",
                                                                    style: {
                                                                        width: `${b.acc * 100}%`,
                                                                        background: b.color
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-mono text-xs ${b.acc >= 0.6 ? 'text-emerald-300' : b.acc >= 0.5 ? 'text-slate-200' : 'text-rose-300'}`,
                                                                children: pct(b.acc, 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: `px-3 font-mono text-xs ${b.brier < 0.25 ? 'text-emerald-300' : 'text-slate-300'}`,
                                                    children: b.brier.toFixed(3)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 font-mono text-xs",
                                                    title: "skor akumulasi benar/salah tertimbang keyakinan",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: b.convTotal > 0 ? 'text-emerald-300' : 'text-rose-300',
                                                        children: [
                                                            b.convTotal > 0 ? '+' : '',
                                                            b.convTotal.toFixed(1)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 font-mono text-xs text-slate-300",
                                                    children: pct(b.upShare)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: `px-3 font-mono text-xs ${b.hardFails === 0 ? 'text-slate-400' : 'text-orange-300'}`,
                                                    children: b.hardFails
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 font-mono text-xs text-slate-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-emerald-400",
                                                            children: b.streakBest
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 21
                                                        }, this),
                                                        " / ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-rose-400",
                                                            children: b.streakWorst
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 80
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, b.id, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 380,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs text-slate-500",
                        children: "Akurasi = benar/100 · Brier = kejujuran probabilitas (koin 0,250) · Skor yakin = akumulasi benar/salah tertimbang keyakinan · Yakin-salah = vonis conf ≥72% yang meleset. Klik baris untuk memakai kontestan itu di penjelajah."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                title: "Peta Kemahiran per Arketipe — v1 vs v3",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 424,
                    columnNumber: 71
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full min-w-[680px] text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-2 pr-3",
                                                children: "Arketipe pasar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Keluarga"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Sulit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 431,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "v1 naluri"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "CYBORG v3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 433,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Δ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3",
                                                children: "Vonis"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 428,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: (()=>{
                                        const m1 = new Map((s.byRegime['MICAPROFITA'] ?? []).map((r)=>[
                                                r.archId,
                                                r
                                            ]));
                                        const m3 = new Map((s.byRegime['MICAPROFITA-V3'] ?? []).map((r)=>[
                                                r.archId,
                                                r
                                            ]));
                                        const rows = [
                                            ...m3.values()
                                        ].map((r3)=>({
                                                r3,
                                                r1: m1.get(r3.archId)
                                            })).sort((a, b)=>a.r3.acc - b.r3.acc);
                                        return rows.map(({ r3, r1 })=>{
                                            const d = r3.acc - (r1?.acc ?? 0);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-slate-800/60",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-2 pr-3 font-medium text-slate-200",
                                                        children: r3.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 text-xs text-slate-400",
                                                        children: r3.family
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 text-xs text-amber-500/80",
                                                        title: `kesulitan ${metaArch(r3.archId, state)?.kesulitan ?? '?'} dari 3`,
                                                        children: '★'.repeat(metaArch(r3.archId, state)?.kesulitan ?? 1)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3 font-mono text-xs text-slate-400",
                                                        children: r1 ? pct(r1.acc) : '—'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-block rounded px-2 py-0.5 font-mono text-xs font-bold",
                                                            style: {
                                                                background: r3.acc >= 0.7 ? 'rgba(52,211,153,0.15)' : r3.acc >= 0.55 ? 'rgba(245,158,11,0.12)' : 'rgba(251,113,133,0.15)',
                                                                color: r3.acc >= 0.7 ? '#6ee7b7' : r3.acc >= 0.55 ? '#fbbf24' : '#fda4af'
                                                            },
                                                            children: pct(r3.acc)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: `px-3 font-mono text-xs ${d > 0.02 ? 'text-emerald-300' : d < -0.02 ? 'text-rose-300' : 'text-slate-500'}`,
                                                        children: sgn(d)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: r3.verdict === 'KUAT' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : r3.verdict === 'LEMAH' ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' : 'border-slate-700 text-slate-300',
                                                            children: r3.verdict
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 466,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, r3.archId, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 446,
                                                columnNumber: 21
                                            }, this);
                                        });
                                    })()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 438,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs text-slate-500",
                        children: [
                            "Diurutkan dari yang terlemah — celah selalu di depan. n = ",
                            Math.round(state.meta.suiteSize / state.meta.archetypes.length),
                            "–8 ujian per arketipe per suite."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                        title: "Kalibrasi Keyakinan (v3)",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                            className: "h-4 w-4 text-amber-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 482,
                            columnNumber: 59
                        }, void 0),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: (s.cal['MICAPROFITA-V3'] ?? []).map((b)=>{
                                    const gap = b.n ? b.avgConf - b.acc : 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-20 shrink-0 font-mono text-slate-400",
                                                children: b.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 488,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-10 shrink-0 text-slate-500",
                                                children: [
                                                    "n=",
                                                    b.n
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 489,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative h-3 flex-1 rounded bg-slate-800/80",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute left-0 h-full rounded bg-sky-500/70",
                                                        style: {
                                                            width: `${b.avgConf * 100}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute left-0 h-full rounded border-r-2 border-emerald-400 bg-emerald-500/25",
                                                        style: {
                                                            width: `${b.acc * 100}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 490,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-40 shrink-0 text-right font-mono text-slate-400",
                                                children: [
                                                    "klaim ",
                                                    pct(b.avgConf),
                                                    " · real ",
                                                    b.n ? pct(b.acc) : '—',
                                                    b.n >= 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: gap > 0.12 ? ' text-rose-300' : gap < -0.1 ? ' text-amber-300' : ' text-emerald-300',
                                                        children: [
                                                            " (",
                                                            sgn(-gap),
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 34
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 494,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, b.label, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 487,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 483,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-slate-500",
                                children: "Biru = klaim keyakinan, hijau = realita. Selisih besar = sombong (mahal) atau terlalu rendah hati (ketinggalan profit)."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 482,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                        title: "Celah yang Ditemukan & Resepnya",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                            className: "h-4 w-4 text-amber-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 505,
                            columnNumber: 66
                        }, void 0),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-72 space-y-2 overflow-y-auto pr-1",
                            children: (s.findings['MICAPROFITA-V3'] ?? []).map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-lg border p-3 ${SEV_TONE[f.severity]}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold uppercase tracking-wide",
                                            children: [
                                                f.severity,
                                                " — ",
                                                f.title
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 509,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs leading-relaxed opacity-90",
                                            children: f.detail
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 510,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs italic leading-relaxed opacity-75",
                                            children: [
                                                "Resep: ",
                                                f.rec
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 511,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 506,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 481,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                title: "Eksperimen: Kepala Belajar (regresi logistik)",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 519,
                    columnNumber: 78
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm",
                                children: [
                                    s.head.adopted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "h-4 w-4 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 522,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        className: "h-4 w-4 text-orange-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 522,
                                        columnNumber: 87
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: s.head.adopted ? 'text-emerald-300' : 'text-orange-300',
                                        children: s.head.adopted ? 'DIADOPSI' : 'TIDAK DIADOPSI'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 523,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 521,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 font-mono text-xs text-slate-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "train 1–50: ",
                                            (s.head.trainAcc * 100).toFixed(0),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 526,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "buta 51–100 terlatih: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-sky-300",
                                                children: pct(s.head.heldout.acc)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 527,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 527,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "buta 51–100 naluri: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: pct(s.head.naluri.acc)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 528,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 525,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 520,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs leading-relaxed text-slate-400",
                        children: s.head.note
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 531,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 space-y-1",
                        children: s.head.w.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-24 shrink-0 text-slate-400",
                                        children: [
                                            "fitur#",
                                            i + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 535,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative h-2.5 flex-1 rounded bg-slate-800/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-1/2 top-0 h-full w-px bg-slate-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 537,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-0 h-full rounded ${w >= 0 ? 'bg-sky-500/80' : 'bg-rose-500/80'}`,
                                                style: w >= 0 ? {
                                                    left: '50%',
                                                    width: `${Math.min(50, Math.abs(w) * 28)}%`
                                                } : {
                                                    right: '50%',
                                                    width: `${Math.min(50, Math.abs(w) * 28)}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 538,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 536,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-14 shrink-0 text-right font-mono text-slate-300",
                                        children: w.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 543,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 534,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 532,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 519,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                title: "Bukti Luas — 5 Suite × 100 Pasar (500 ujian)",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 550,
                    columnNumber: 77
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: state.multi.suites.map((nm, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-14 shrink-0 font-semibold text-slate-300",
                                        children: [
                                            "Suite ",
                                            nm
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 554,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bar, {
                                        v: state.multi.v1[i],
                                        color: "#94a3b8",
                                        label: `v1 ${pct(state.multi.v1[i])}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 555,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bar, {
                                        v: state.multi.v3[i],
                                        color: "#fbbf24",
                                        label: `v3 ${pct(state.multi.v3[i])}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 556,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bar, {
                                        v: state.multi.dadu[i],
                                        color: "#fb7185",
                                        label: `dadu ${pct(state.multi.dadu[i])}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 557,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `w-24 shrink-0 text-right font-mono ${state.multi.v3[i] > state.multi.v1[i] ? 'text-emerald-300' : 'text-rose-300'}`,
                                        children: state.multi.v3[i] > state.multi.v1[i] ? 'v3 menang' : 'v3 kalah'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, nm, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 553,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs text-slate-500",
                        children: [
                            "Rata-rata v3 ",
                            pct(state.multi.v3.reduce((a, b)=>a + b, 0) / 5, 1),
                            " vs v1 ",
                            pct(state.multi.v1.reduce((a, b)=>a + b, 0) / 5, 1),
                            " — kemenangan",
                            ' ',
                            state.multi.v3.filter((x, i)=>x > state.multi.v1[i]).length,
                            "/5 suite pada 500 pasar yang berbeda."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 564,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 550,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
                title: `Penjelajah Ujian — ${s.tests.length} pasar`,
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                    className: "h-4 w-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 571,
                    columnNumber: 77
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 pb-3 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: filterArch,
                                onChange: (e)=>setFilterArch(e.target.value),
                                className: "rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ALL",
                                        children: "Semua arketipe"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this),
                                    state.meta.archetypes.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: a.id,
                                            children: a.label
                                        }, a.id, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 576,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 573,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: filterRes,
                                onChange: (e)=>setFilterRes(e.target.value),
                                className: "rounded border border-slate-700 bg-slate-900 px-2 py-1 text-slate-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ALL",
                                        children: "Semua hasil"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 580,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "BENAR",
                                        children: "Hanya benar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 581,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "SALAH",
                                        children: "Hanya salah"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 582,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: [
                                    "kontestan: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        style: {
                                            color: v3Board?.color
                                        },
                                        children: s.leaderboard.find((b)=>b.id === contestant)?.short ?? contestant
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 584,
                                        columnNumber: 55
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 572,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid max-h-96 grid-cols-10 gap-1.5 overflow-y-auto pb-1 sm:grid-cols-12 md:grid-cols-20",
                        children: tests.map(({ t, p })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpenId(t.id),
                                title: `${t.id} · ${t.archLabel} · vonis ${p.dir} ${pct(p.conf)} · jawaban ${t.label}`,
                                className: `rounded border px-1 py-1.5 text-[10px] font-mono transition hover:scale-105 ${p.correct ? 'border-emerald-600/50 bg-emerald-500/10 text-emerald-300' : 'border-rose-600/50 bg-rose-500/10 text-rose-300'}`,
                                children: String(t.num).padStart(2, '0')
                            }, t.id, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 588,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 586,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pt-3 text-xs text-slate-500",
                        children: "Hijau = tepat, merah = meleset (untuk kontestan terpilih). Klik nomor untuk membuka ruang ujian: lihat candle, vonis, bukti, lalu buka amplop jawaban."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 600,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 571,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestDialog, {
                suite: suite,
                openId: openId,
                onClose: ()=>setOpenId(null)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 603,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 299,
        columnNumber: 5
    }, this);
}
_s(ExamConsole, "z3mGofaygOfLdcpnhPMv661WEtc=");
_c2 = ExamConsole;
function Bar({ v, color, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-w-0 flex-1 items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2.5 flex-1 overflow-hidden rounded bg-slate-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded",
                    style: {
                        width: `${v * 100}%`,
                        background: color
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 612,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 611,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-24 shrink-0 font-mono",
                style: {
                    color
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 614,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 610,
        columnNumber: 5
    }, this);
}
_c3 = Bar;
function Mech({ label, val }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-sm font-bold text-amber-300",
                children: val
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] uppercase tracking-wide text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 623,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 621,
        columnNumber: 5
    }, this);
}
_c4 = Mech;
function CardShell({ title, icon, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5",
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center gap-2 text-sm font-bold text-slate-200",
                children: [
                    icon,
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 632,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 630,
        columnNumber: 5
    }, this);
}
_c5 = CardShell;
// ---------------- dialog satu ujian ----------------
function TestDialog({ suite, openId, onClose }) {
    _s1();
    const [d, setD] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sel, setSel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestDialog.useEffect": ()=>{
            if (!openId) return;
            let alive = true;
            fetch(`/api/exam?suite=${suite}&id=${openId}`, {
                cache: 'no-store'
            }).then({
                "TestDialog.useEffect": (r)=>{
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                }
            }["TestDialog.useEffect"]).then({
                "TestDialog.useEffect": (j)=>{
                    if (alive) {
                        setD(j);
                        setRevealed(false);
                        setSel(0);
                        setErr(null);
                    }
                }
            }["TestDialog.useEffect"]).catch({
                "TestDialog.useEffect": (e)=>{
                    if (alive) {
                        setErr(e.message);
                        setD(null);
                    }
                }
            }["TestDialog.useEffect"]);
            return ({
                "TestDialog.useEffect": ()=>{
                    alive = false;
                }
            })["TestDialog.useEffect"];
        }
    }["TestDialog.useEffect"], [
        suite,
        openId
    ]);
    const p = d?.preds[sel];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: !!openId,
        onOpenChange: (v)=>!v && onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-h-[92vh] max-w-4xl overflow-y-auto border-slate-800 bg-slate-950 text-slate-200",
            "aria-describedby": undefined,
            children: [
                !d && !err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "text-base text-slate-200",
                                    children: "Ruang ujian"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 668,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Menyiapkan candle 168 jam & vonis para kontestan…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 669,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 667,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-2 py-10 text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 671,
                                    columnNumber: 90
                                }, this),
                                " membuka ruang ujian…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 671,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 666,
                    columnNumber: 11
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-base text-rose-300",
                                children: "Gagal membuka ujian"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 677,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: err
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 678,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 676,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 675,
                    columnNumber: 11
                }, this),
                d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "flex flex-wrap items-center gap-2 text-base",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-amber-400",
                                            children: d.test.id
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 686,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-slate-300",
                                            children: d.test.symbol
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 687,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-slate-700 text-slate-300",
                                            children: d.test.arch.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 688,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-slate-800 text-slate-400",
                                            children: d.test.arch.family
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 689,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-slate-500",
                                            children: '★'.repeat(d.test.arch.kesulitan)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 690,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs leading-relaxed text-slate-400",
                                        children: d.test.arch.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 693,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 692,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 684,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CandleChart, {
                            vis: d.visible,
                            hor: d.horizon,
                            entry: d.test.entry,
                            revealed: revealed
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 697,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>setRevealed(true),
                                    disabled: revealed,
                                    className: "bg-amber-500/90 text-slate-950 hover:bg-amber-400",
                                    children: [
                                        revealed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 701,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 701,
                                            columnNumber: 63
                                        }, this),
                                        revealed ? 'Jawaban terbuka' : 'Buka amplop jawaban'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 700,
                                    columnNumber: 15
                                }, this),
                                revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-slate-300",
                                            children: [
                                                "Jawaban: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    className: d.test.label === 'NAIK' ? 'text-emerald-300' : 'text-rose-300',
                                                    children: d.test.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 75
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 706,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-slate-400",
                                            children: [
                                                "ret 24j ",
                                                sgn(d.test.outcomeRet),
                                                " · MFE ",
                                                sgn(d.test.mfe),
                                                " · MAE ",
                                                sgn(d.test.mae)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 707,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 705,
                                    columnNumber: 17
                                }, this),
                                !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Lihat dulu vonis para kontestan di bawah — baru buka amplopnya."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 711,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 699,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-1.5",
                            children: d.preds.map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSel(i),
                                    className: `rounded border px-2 py-1 text-[11px] font-semibold transition ${i === sel ? 'border-amber-500/60 bg-amber-500/10' : 'border-slate-800 hover:border-slate-600'}`,
                                    style: {
                                        color: x.color
                                    },
                                    children: [
                                        x.short,
                                        " ",
                                        revealed && (x.correct ? '✓' : '✗')
                                    ]
                                }, x.id, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 717,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 715,
                            columnNumber: 13
                        }, this),
                        p && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-2xl font-black ${p.dir === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: p.dir === 'NAIK' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 731,
                                                columnNumber: 138
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 731,
                                                columnNumber: 175
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 731,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold",
                                                    style: {
                                                        color: p.color
                                                    },
                                                    children: [
                                                        p.name,
                                                        " vonis: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: p.dir === 'NAIK' ? 'text-emerald-300' : 'text-rose-300',
                                                            children: p.dir
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 97
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400",
                                                    children: [
                                                        "keyakinan ",
                                                        pct(p.conf),
                                                        " · rezim terbaca: ",
                                                        p.regime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 732,
                                            columnNumber: 19
                                        }, this),
                                        revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: p.correct ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/40 bg-rose-500/10 text-rose-300',
                                            children: p.correct ? 'TEPAT' : 'MELESET'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 737,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 730,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: p.factors.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FactorBar, {
                                            label: f.label,
                                            value: f.value,
                                            weight: f.weight
                                        }, f.key, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 743,
                                            columnNumber: 41
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 742,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: p.reasons.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "• ",
                                                r
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 746,
                                            columnNumber: 44
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 745,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 729,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 664,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 663,
        columnNumber: 5
    }, this);
}
_s1(TestDialog, "NT/Xz8mUePsZWztUOUPviiolO1Y=");
_c6 = TestDialog;
// ---------------- ujian candle likuidasi (SAKTI-MATA) ----------------
function CandleDialog({ openNum, onClose }) {
    _s2();
    const [d, setD] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CandleDialog.useEffect": ()=>{
            if (!openNum) return;
            let alive = true;
            fetch(`/api/exam?candle=${openNum}`, {
                cache: 'no-store'
            }).then({
                "CandleDialog.useEffect": (r)=>{
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                }
            }["CandleDialog.useEffect"]).then({
                "CandleDialog.useEffect": (j)=>{
                    if (alive) {
                        setD(j);
                        setRevealed(false);
                        setErr(null);
                    }
                }
            }["CandleDialog.useEffect"]).catch({
                "CandleDialog.useEffect": (e)=>{
                    if (alive) {
                        setErr(e.message);
                        setD(null);
                    }
                }
            }["CandleDialog.useEffect"]);
            return ({
                "CandleDialog.useEffect": ()=>{
                    alive = false;
                }
            })["CandleDialog.useEffect"];
        }
    }["CandleDialog.useEffect"], [
        openNum
    ]);
    const ok = d ? d.vonis.arah === d.exam.truth : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: !!openNum,
        onOpenChange: (v)=>!v && onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-h-[92vh] max-w-4xl overflow-y-auto border-slate-800 bg-slate-950 text-slate-200",
            "aria-describedby": undefined,
            children: [
                !d && !err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "text-base text-slate-200",
                                    children: "Ruang ujian candle"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Menyiapkan 72 candle & vonis SAKTI-MATA…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 783,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 781,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-2 py-10 text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 785,
                                    columnNumber: 90
                                }, this),
                                " membuka grafik…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 785,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 780,
                    columnNumber: 11
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-base text-rose-300",
                                children: "Gagal membuka ujian"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 791,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: err
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 792,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 790,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 789,
                    columnNumber: 11
                }, this),
                d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "flex flex-wrap items-center gap-2 text-base",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-amber-400",
                                            children: [
                                                "#",
                                                d.exam.num
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 800,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-slate-700 text-slate-300",
                                            children: d.exam.arch.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 801,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-slate-800 text-slate-400",
                                            children: d.exam.arch.family
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 802,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: d.exam.diff === 'GILA' ? 'border-rose-500/40 text-rose-300' : d.exam.diff === 'BRUTAL' ? 'border-orange-500/40 text-orange-300' : 'border-slate-700 text-slate-400',
                                            children: d.exam.diff
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 803,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-violet-500/40 text-violet-300",
                                            children: [
                                                "varian ",
                                                d.exam.variant
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 804,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 799,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs leading-relaxed text-slate-400",
                                        children: [
                                            d.exam.arch.desc,
                                            " — ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-rose-300/80",
                                                children: [
                                                    "Jebakan: ",
                                                    d.exam.arch.jebakan
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 808,
                                                columnNumber: 40
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 807,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 806,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 798,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CandleChart, {
                            vis: d.visible,
                            hor: d.horizon,
                            entry: d.exam.entry,
                            revealed: revealed,
                            horLabel: "HORIZON 12 CANDLE — tersembunyi sampai vonis dibuka"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 813,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>setRevealed(true),
                                    disabled: revealed,
                                    className: "bg-amber-500/90 text-slate-950 hover:bg-amber-400",
                                    children: [
                                        revealed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 817,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 817,
                                            columnNumber: 63
                                        }, this),
                                        revealed ? 'Jawaban terbuka' : 'Buka amplop jawaban'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 816,
                                    columnNumber: 15
                                }, this),
                                revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-slate-300",
                                            children: [
                                                "Jawaban: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    className: d.exam.truth === 'NAIK' ? 'text-emerald-300' : 'text-rose-300',
                                                    children: d.exam.truth
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 822,
                                                    columnNumber: 75
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 822,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-slate-400",
                                            children: [
                                                "gerak ",
                                                d.exam.moveAtr >= 0 ? '+' : '',
                                                d.exam.moveAtr.toFixed(1),
                                                " ATR dalam 12 candle"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 823,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 821,
                                    columnNumber: 17
                                }, this),
                                !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Baca dulu fakta saat itu & vonis mesin — baru buka amplopnya."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 826,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 815,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-2xl font-black ${d.vonis.arah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: d.vonis.arah === 'NAIK' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 832,
                                                columnNumber: 46
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 832,
                                                columnNumber: 83
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 831,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold text-amber-300",
                                                    children: [
                                                        "SAKTI-MATA v",
                                                        d.vonis.versi,
                                                        " vonis: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: d.vonis.arah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300',
                                                            children: d.vonis.arah
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 102
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400",
                                                    children: [
                                                        "keyakinan ",
                                                        pct(d.vonis.conf),
                                                        " · skor lapisan ",
                                                        d.vonis.score.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 836,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 834,
                                            columnNumber: 17
                                        }, this),
                                        revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/40 bg-rose-500/10 text-rose-300',
                                            children: ok ? 'TEPAT' : 'MELESET'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 839,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 830,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1 font-semibold text-slate-400",
                                            children: "Fakta yang TERLIHAT saat keputusan (anti-hindsight):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 846,
                                            columnNumber: 17
                                        }, this),
                                        d.fakta
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 845,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: d.vonis.alasan.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "• ",
                                                r
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 851,
                                            columnNumber: 47
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 850,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 829,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 778,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 777,
        columnNumber: 5
    }, this);
}
_s2(CandleDialog, "nw2oghUzFG1C7IVwy7F4n2hQ/aM=");
_c7 = CandleDialog;
function CandleSection({ st }) {
    _s3();
    const [openNum, setOpenNum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const c = st.candle;
    const total = c.rows.length;
    const benar = c.rows.filter((r)=>r.correct).length;
    const likuidasi = c.rows.filter((r)=>r.liquidated).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
        title: undefined,
        icon: undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-violet-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 873,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-bold tracking-wide",
                                        children: "UJIAN CANDLE LIKUIDASI — 100 Grafik Pembunuh Trader Profesional"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 874,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 872,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm italic leading-relaxed text-slate-300",
                                children: "“Grafik-grafik ini dirancang persis seperti pasar crypto nyata yang mencairkan profesional: sapuan stop, jebakan breakout, klimaks parabolik, kaskade likuidasi. Beberapa punya VARIAN hasil — trap atau asli, pantulan-V atau kucing mati — otak tidak bisa menghafal; ia harus MEMBACA CANDLE.”"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 876,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: [
                                    "60 candle terlihat · 12 candle vonis · kebenaran dihitung dari data, bukan niat generator · SAKTI-MATA v",
                                    c.versi
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 881,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 871,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid shrink-0 grid-cols-3 gap-2 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Vonis benar",
                                val: `${benar}/${total}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 886,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Likuidasi",
                                val: String(likuidasi)
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 887,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Pelajaran",
                                val: `L1-L${c.ledger.length}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 888,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 885,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 870,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Siklus ujian → bedah → upgrade (in-sample)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 895,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: c.ringkas.inSample.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-52 shrink-0 text-slate-400",
                                                children: s.siklus
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 899,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 flex-1 overflow-hidden rounded bg-slate-800",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded bg-gradient-to-r from-amber-600 to-amber-400",
                                                    style: {
                                                        width: s.skor
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 900,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-12 text-right font-mono text-xs text-amber-300",
                                                children: s.skor
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 903,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-24 text-right text-xs text-rose-300/80",
                                                children: [
                                                    s.likuidasi,
                                                    " likuidasi"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 904,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 898,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 896,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 894,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Ujian out-of-sample (grafik segar yang belum pernah dilihat saat tuning)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 910,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: c.ringkas.luar.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-52 shrink-0 text-slate-400",
                                                children: s.suite
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 914,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 flex-1 overflow-hidden rounded bg-slate-800",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded bg-gradient-to-r from-violet-600 to-violet-400",
                                                    style: {
                                                        width: s.skor
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 916,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 915,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-12 text-right font-mono text-xs text-violet-300",
                                                children: s.skor
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 918,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-24 text-right text-xs text-rose-300/80",
                                                children: [
                                                    s.likuidasi,
                                                    " likuidasi"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 919,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 913,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 911,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-slate-500",
                                children: [
                                    "Baseline naif: SELALU-NAIK ",
                                    c.ringkas.baseline.selaluNaik,
                                    "% · MOMEN ",
                                    c.ringkas.baseline.momenNaif,
                                    "% · BALIK-ARAH ",
                                    c.ringkas.baseline.balikArah,
                                    "% · DADU ",
                                    c.ringkas.baseline.dadu,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 923,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 909,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 893,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 931,
                                columnNumber: 114
                            }, this),
                            " Ledger pelajaran — setiap celah jadi aturan permanen (di-upgrade juga ke file Micaprofita_V231_SAKTI.html sebagai organ V232)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 931,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 lg:grid-cols-2",
                        children: c.ledger.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-amber-300",
                                        children: [
                                            l.id,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-normal text-slate-500",
                                                children: [
                                                    "· v",
                                                    l.versi,
                                                    " · siklus ",
                                                    l.siklus
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 935,
                                                columnNumber: 66
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 935,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-rose-300/80",
                                        children: [
                                            "Celah: ",
                                            l.celah
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 936,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-emerald-300/80",
                                        children: [
                                            "Aturan: ",
                                            l.aturan
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 937,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l.id, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 934,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 932,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 930,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                        children: "Peta kemahiran per arketipe [varian] — terlemah dulu"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 945,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-1.5 md:grid-cols-2",
                        children: c.perArch.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-56 shrink-0 truncate text-slate-400",
                                        children: a.k
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 949,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 flex-1 overflow-hidden rounded bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-full rounded ${a.pct >= 90 ? 'bg-emerald-500' : a.pct >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`,
                                            style: {
                                                width: `${a.pct}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 951,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 950,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-16 text-right font-mono text-slate-300",
                                        children: [
                                            a.benar,
                                            "/",
                                            a.n,
                                            " · ",
                                            a.pct.toFixed(0),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 953,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, a.k, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 948,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 946,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 944,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                        children: "Penjelajah 100 grafik — klik untuk membuka ruang ujian (jawaban tetap tersembunyi sampai amplop dibuka)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 961,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-10 gap-1 sm:grid-cols-20",
                        children: c.rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpenNum(r.num),
                                title: `#${r.num} ${r.archLabel} [${r.variant}] ${r.diff}`,
                                className: `rounded border px-0 py-1 text-[10px] font-mono transition ${r.correct ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20' : r.liquidated ? 'border-rose-500/50 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25' : 'border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'}`,
                                children: r.num
                            }, r.num, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 964,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 962,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 960,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CandleDialog, {
                openNum: openNum,
                onClose: ()=>setOpenNum(null)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 978,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 869,
        columnNumber: 5
    }, this);
}
_s3(CandleSection, "v2eg6yc0HnvdH5lQeUsDrkthoPc=");
_c8 = CandleSection;
// ---------------- ujian bear trap 100 (SAKTI-BEARTRAP) ----------------
function BeartrapDialog({ openNum, onClose }) {
    _s4();
    const [d, setD] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BeartrapDialog.useEffect": ()=>{
            if (!openNum) return;
            let alive = true;
            fetch(`/api/exam?beartrap=${openNum}`, {
                cache: 'no-store'
            }).then({
                "BeartrapDialog.useEffect": (r)=>{
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                }
            }["BeartrapDialog.useEffect"]).then({
                "BeartrapDialog.useEffect": (j)=>{
                    if (alive) {
                        setD(j);
                        setRevealed(false);
                        setErr(null);
                    }
                }
            }["BeartrapDialog.useEffect"]).catch({
                "BeartrapDialog.useEffect": (e)=>{
                    if (alive) {
                        setErr(e.message);
                        setD(null);
                    }
                }
            }["BeartrapDialog.useEffect"]);
            return ({
                "BeartrapDialog.useEffect": ()=>{
                    alive = false;
                }
            })["BeartrapDialog.useEffect"];
        }
    }["BeartrapDialog.useEffect"], [
        openNum
    ]);
    const ok = d ? d.vonis.arah === d.exam.truth : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: !!openNum,
        onOpenChange: (v)=>!v && onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-h-[92vh] max-w-4xl overflow-y-auto border-slate-800 bg-slate-950 text-slate-200",
            "aria-describedby": undefined,
            children: [
                !d && !err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "text-base text-slate-200",
                                    children: "Ruang ujian bear trap"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1008,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Menyiapkan 74 candle & rencana trade SAKTI-BEARTRAP…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1009,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1007,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-2 py-10 text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1011,
                                    columnNumber: 90
                                }, this),
                                " membuka grafik…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1011,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 1006,
                    columnNumber: 11
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-base text-rose-300",
                                children: "Gagal membuka ujian"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1017,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: err
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1018,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1016,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 1015,
                    columnNumber: 11
                }, this),
                d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "flex flex-wrap items-center gap-2 text-base",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-amber-400",
                                            children: [
                                                "#",
                                                d.exam.num
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1026,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-slate-700 text-slate-300",
                                            children: d.exam.arch.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1027,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: d.exam.kind === 'GUARD' ? 'border-sky-500/40 text-sky-300' : 'border-rose-500/40 text-rose-300',
                                            children: d.exam.kind === 'GUARD' ? 'GUARD ANTI-BIAS' : 'BEAR TRAP'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1028,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: d.exam.diff === 'GILA' ? 'border-rose-500/40 text-rose-300' : d.exam.diff === 'BRUTAL' ? 'border-orange-500/40 text-orange-300' : 'border-slate-700 text-slate-400',
                                            children: d.exam.diff
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1029,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1025,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs leading-relaxed text-slate-400",
                                        children: [
                                            d.exam.arch.ilmu,
                                            " — ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-rose-300/80",
                                                children: [
                                                    "Jebakan: ",
                                                    d.exam.arch.jebakan
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1033,
                                                columnNumber: 40
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1032,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1031,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1024,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CandleChart, {
                            vis: d.visible,
                            hor: d.horizon,
                            entry: d.exam.entry,
                            revealed: revealed,
                            horLabel: "HORIZON 14 CANDLE — tersembunyi sampai amplop dibuka"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1038,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>setRevealed(true),
                                    disabled: revealed,
                                    className: "bg-amber-500/90 text-slate-950 hover:bg-amber-400",
                                    children: [
                                        revealed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1042,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1042,
                                            columnNumber: 63
                                        }, this),
                                        revealed ? 'Jawaban terbuka' : 'Buka amplop jawaban'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1041,
                                    columnNumber: 15
                                }, this),
                                revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-slate-300",
                                            children: [
                                                "Jawaban: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    className: d.exam.truth === 'NAIK' ? 'text-emerald-300' : 'text-rose-300',
                                                    children: d.exam.truth
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 1047,
                                                    columnNumber: 75
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-slate-400",
                                            children: [
                                                "gerak ",
                                                d.exam.movePct >= 0 ? '+' : '',
                                                d.exam.movePct.toFixed(1),
                                                "% dalam 14 candle"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1048,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 17
                                }, this),
                                !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Baca dulu fakta saat itu & rencana trade mesin — baru buka amplopnya."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1051,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1040,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-2xl font-black ${d.vonis.arah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: d.vonis.arah === 'NAIK' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1057,
                                                columnNumber: 46
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1057,
                                                columnNumber: 83
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1056,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold text-amber-300",
                                                    children: [
                                                        "SAKTI-BEARTRAP v",
                                                        d.vonis.versi,
                                                        " rencana: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: d.vonis.arah === 'NAIK' ? 'text-emerald-300' : 'text-rose-300',
                                                            children: d.vonis.arah
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 1060,
                                                            columnNumber: 108
                                                        }, this),
                                                        " · target ",
                                                        d.vonis.targetPct.toFixed(1),
                                                        "% (harga ",
                                                        d.vonis.targetPrice.toFixed(2),
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 1060,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400",
                                                    children: [
                                                        "keyakinan ",
                                                        pct(d.vonis.conf),
                                                        " · skor lapisan ",
                                                        d.vonis.score.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 1061,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1059,
                                            columnNumber: 17
                                        }, this),
                                        revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/40 bg-rose-500/10 text-rose-300',
                                            children: ok ? 'TEPAT' : 'MELESET'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1064,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1055,
                                    columnNumber: 15
                                }, this),
                                revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "sm:col-span-2 mb-1 font-semibold text-slate-400",
                                            children: "Ledger trade — fee buy + fee sell dihitung wajib (hasil akhir = NET):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1072,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Entry price"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1073,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.entry.toFixed(3)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1073,
                                            columnNumber: 70
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Exit price"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1074,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: [
                                                d.ledger.exit.toFixed(3),
                                                d.ledger.targetHit ? ` (target tersentuh @c${d.ledger.hitCandle})` : ' (akhir horizon)'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1074,
                                            columnNumber: 69
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Fee buy (0.1%)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.feeBuy.toFixed(4)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 73
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Fee sell (0.1%)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1076,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.feeSell.toFixed(4)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1076,
                                            columnNumber: 74
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Gross P/L"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-mono ${d.ledger.grossPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: [
                                                d.ledger.grossPct >= 0 ? '+' : '',
                                                d.ledger.grossPct.toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1077,
                                            columnNumber: 68
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-slate-300",
                                            children: "Net P/L (hasil akhir)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-mono font-bold ${d.ledger.netPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: [
                                                d.ledger.netPct >= 0 ? '+' : '',
                                                d.ledger.netPct.toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 94
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "Hasil"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1079,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-bold ${d.ledger.berhasil ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: d.ledger.berhasil ? 'BERHASIL (net profit)' : 'GAGAL (rugi after fee)'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1080,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1071,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1 font-semibold text-slate-400",
                                            children: "Fakta yang TERLIHAT saat keputusan (anti-hindsight):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1085,
                                            columnNumber: 17
                                        }, this),
                                        d.fakta
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1084,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: d.vonis.alasan.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "• ",
                                                r
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 47
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1089,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1054,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 1004,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 1003,
        columnNumber: 5
    }, this);
}
_s4(BeartrapDialog, "nw2oghUzFG1C7IVwy7F4n2hQ/aM=");
_c9 = BeartrapDialog;
function BeartrapSection({ st }) {
    _s5();
    const [openNum, setOpenNum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const b = st.beartrap;
    const traps = b.rows.filter((r)=>r.kind === 'TRAP');
    const guards = b.rows.filter((r)=>r.kind === 'GUARD');
    const benar = traps.filter((r)=>r.correct).length;
    const profit = traps.filter((r)=>r.berhasil).length;
    const netTotal = traps.reduce((s, r)=>s + r.netPct, 0);
    const guardBenar = guards.filter((r)=>r.correct).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
        title: undefined,
        icon: undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-rose-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-bold tracking-wide",
                                        children: "UJIAN BEAR TRAP — 100 Skenario Penjebak Trader Profesional"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm italic leading-relaxed text-slate-300",
                                children: "“Seluruh 100 skenario adalah bear trap: fake breakdown, sapuan stop di bawah low, kapitulasi panik, bear flag palsu — bujukan turun sekuat mungkin lalu melantai balik ke atas. Otak harus MENENTUKAN ENTRY, MEMASANG TARGET KEUNTUNGAN, dan menanggung hasil akhirnya. Setiap posisi membayar fee buy 0.1% + fee sell 0.1% — profit kotor tidak pernah dipakai.”"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: [
                                    "60 candle terlihat · 14 horizon · truth dari data · fee ",
                                    b.feeModel.buy,
                                    " + ",
                                    b.feeModel.sell,
                                    " = ",
                                    b.feeModel.total,
                                    " per posisi · SAKTI-BEARTRAP v",
                                    b.versi
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid shrink-0 grid-cols-3 gap-2 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Vonis benar",
                                val: `${benar}/${traps.length}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Net profit",
                                val: `${profit}/${traps.length}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Guard benar",
                                val: `${guardBenar}/${guards.length}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Siklus latih → uji → bedah → perbaiki"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: b.ringkas.siklus.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-56 shrink-0 text-slate-400",
                                                        children: s.versi
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1143,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto font-mono text-xs text-amber-300",
                                                        children: s.skor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1144,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1142,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: s.catatan
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1146,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1141,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Hasil akhir per ronde (net profit SETELAH fee buy + fee sell)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: b.ringkas.hasil.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-56 shrink-0 text-slate-400",
                                                        children: s.ronde
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1157,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto font-mono text-xs text-emerald-300",
                                                        children: s.skor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1158,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1156,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: s.net
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1160,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1155,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-slate-500",
                                children: [
                                    "Kumulatif ujian: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-slate-300",
                                        children: [
                                            benar,
                                            "/",
                                            traps.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1164,
                                        columnNumber: 71
                                    }, this),
                                    " trap benar · total net trap ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-emerald-300",
                                        children: sgn(netTotal)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1164,
                                        columnNumber: 156
                                    }, this),
                                    " · ",
                                    b.feeModel.catatan
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-xl border border-rose-500/25 bg-rose-500/5 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1170,
                                columnNumber: 113
                            }, this),
                            " Ledger pelajaran bear trap — setiap celah jadi aturan permanen (di-upgrade juga ke file Micaprofita_V231_SAKTI.html sebagai organ V234)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 lg:grid-cols-2",
                        children: b.ledger.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-rose-300",
                                        children: [
                                            l.id,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-normal text-slate-500",
                                                children: [
                                                    "· v",
                                                    l.versi
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1174,
                                                columnNumber: 65
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-rose-300/80",
                                        children: [
                                            "Celah: ",
                                            l.celah
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1175,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-emerald-300/80",
                                        children: [
                                            "Aturan: ",
                                            l.aturan
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1176,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l.id, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1173,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                        children: "Peta kemahiran per arketipe bear trap — terlemah dulu"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-1.5 md:grid-cols-2",
                        children: b.perArch.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-56 shrink-0 truncate text-slate-400",
                                        children: a.k
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1188,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 flex-1 overflow-hidden rounded bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-full rounded ${a.pct >= 90 ? 'bg-emerald-500' : a.pct >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`,
                                            style: {
                                                width: `${a.pct}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1190,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-24 text-right font-mono text-slate-300",
                                        children: [
                                            a.benar,
                                            "/",
                                            a.n,
                                            " · net ",
                                            sgn(a.net)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1192,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, a.k, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1187,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                        children: "Penjelajah 100 skenario bear trap + 24 guard (G101-G124) — klik untuk ruang ujian: grafik, rencana trade, ledger fee, alasan"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-10 gap-1 sm:grid-cols-20",
                        children: b.rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpenNum(r.num),
                                title: `#${r.num} ${r.archLabel} [${r.diff}] vonis ${r.vonis} · net ${r.netPct.toFixed(2)}%`,
                                className: `rounded border px-0 py-1 text-[10px] font-mono transition ${r.kind === 'GUARD' ? r.correct ? 'border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20' : 'border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25' : r.berhasil ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20' : 'border-rose-500/50 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25'}`,
                                children: r.kind === 'GUARD' ? `G${r.num - 100}` : r.num
                            }, r.num, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1203,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BeartrapDialog, {
                openNum: openNum,
                onClose: ()=>setOpenNum(null)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 1111,
        columnNumber: 5
    }, this);
}
_s5(BeartrapSection, "v2eg6yc0HnvdH5lQeUsDrkthoPc=");
_c10 = BeartrapSection;
// ---------------- ujian stop hunt / liquidity grab 100 (SAKTI-SH) ----------------
function StophuntDialog({ openNum, onClose }) {
    _s6();
    const [d, setD] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StophuntDialog.useEffect": ()=>{
            if (!openNum) return;
            let alive = true;
            fetch(`/api/exam?stophunt=${openNum}`, {
                cache: 'no-store'
            }).then({
                "StophuntDialog.useEffect": (r)=>{
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                }
            }["StophuntDialog.useEffect"]).then({
                "StophuntDialog.useEffect": (j)=>{
                    if (alive) {
                        setD(j);
                        setRevealed(false);
                        setErr(null);
                    }
                }
            }["StophuntDialog.useEffect"]).catch({
                "StophuntDialog.useEffect": (e)=>{
                    if (alive) {
                        setErr(e.message);
                        setD(null);
                    }
                }
            }["StophuntDialog.useEffect"]);
            return ({
                "StophuntDialog.useEffect": ()=>{
                    alive = false;
                }
            })["StophuntDialog.useEffect"];
        }
    }["StophuntDialog.useEffect"], [
        openNum
    ]);
    const ok = d ? d.ledger.mode === 'NO-TRADE' ? d.ledger.noTradeAman ?? false : (d.ledger.netPct ?? -1) > 0 : false;
    const aksiTone = d?.keputusan.aksi === 'ENTRY' ? 'border-emerald-500/40 text-emerald-300' : d?.keputusan.aksi === 'WAIT' ? 'border-amber-500/40 text-amber-300' : 'border-slate-600 text-slate-300';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: !!openNum,
        onOpenChange: (v)=>!v && onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-h-[92vh] max-w-4xl overflow-y-auto border-slate-800 bg-slate-950 text-slate-200",
            "aria-describedby": undefined,
            children: [
                !d && !err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "text-base text-slate-200",
                                    children: "Ruang ujian stop hunt"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Menyiapkan 74 candle & keputusan 3-pilih SAKTI-SH…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1251,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1249,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-2 py-10 text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1253,
                                    columnNumber: 90
                                }, this),
                                " membuka grafik…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1253,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 1248,
                    columnNumber: 11
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-base text-rose-300",
                                children: "Gagal membuka ujian"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1259,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: err
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1260,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1258,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/exam-console.tsx",
                    lineNumber: 1257,
                    columnNumber: 11
                }, this),
                d && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    className: "flex flex-wrap items-center gap-2 text-base",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-amber-400",
                                            children: [
                                                "#",
                                                d.exam.num
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1268,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-slate-700 text-slate-300",
                                            children: d.exam.arch.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1269,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "border-violet-500/40 text-violet-300",
                                            children: d.exam.postGrab === 'REVERSAL' ? 'SWEEP → BALIK' : 'SWEEP → LANJUT'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1270,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: d.exam.diff === 'GILA' ? 'border-rose-500/40 text-rose-300' : d.exam.diff === 'BRUTAL' ? 'border-orange-500/40 text-orange-300' : 'border-slate-700 text-slate-400',
                                            children: d.exam.diff
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1271,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1267,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs leading-relaxed text-slate-400",
                                        children: [
                                            d.exam.arch.ilmu,
                                            " — ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-rose-300/80",
                                                children: [
                                                    "Jebakan: ",
                                                    d.exam.arch.jebakan
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1275,
                                                columnNumber: 40
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1274,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1273,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1266,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CandleChart, {
                            vis: d.visible,
                            hor: d.horizon,
                            entry: d.exam.entry,
                            revealed: revealed,
                            horLabel: "HORIZON 14 CANDLE — tersembunyi sampai amplop dibuka"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1280,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>setRevealed(true),
                                    disabled: revealed,
                                    className: "bg-amber-500/90 text-slate-950 hover:bg-amber-400",
                                    children: [
                                        revealed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1284,
                                            columnNumber: 29
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1284,
                                            columnNumber: 63
                                        }, this),
                                        revealed ? 'Jawaban terbuka' : 'Buka amplop jawaban'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1283,
                                    columnNumber: 15
                                }, this),
                                revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-slate-300",
                                            children: [
                                                "Pasca-grab: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    className: d.exam.postGrab === 'REVERSAL' ? 'text-emerald-300' : 'text-amber-300',
                                                    children: d.exam.postGrab
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                                    lineNumber: 1289,
                                                    columnNumber: 78
                                                }, this),
                                                " (",
                                                d.exam.truth,
                                                " ",
                                                d.exam.movePct >= 0 ? '+' : '',
                                                d.exam.movePct.toFixed(1),
                                                "%)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1289,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-slate-500",
                                            children: [
                                                "jebakan ",
                                                d.exam.bait,
                                                " MFE hanya ",
                                                d.exam.baitMfePct.toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1290,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1288,
                                    columnNumber: 17
                                }, this),
                                !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-slate-500",
                                    children: "Baca dulu fakta likuiditas & keputusan mesin — baru buka amplopnya."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1293,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1282,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: aksiTone,
                                            children: [
                                                "KEPUTUSAN: ",
                                                d.keputusan.aksi,
                                                d.keputusan.aksi !== 'SKIP' ? ` ${d.keputusan.arah}` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1299,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-300",
                                            children: [
                                                d.keputusan.aksi === 'ENTRY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        "entry di close60, target disiplin ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            className: "text-amber-300",
                                                            children: [
                                                                d.keputusan.targetPct.toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 1301,
                                                            columnNumber: 88
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                d.keputusan.aksi === 'WAIT' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        "menunggu tutup reclaim ",
                                                        d.keputusan.arah === 'NAIK' ? 'di atas' : 'di bawah',
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            className: "text-amber-300",
                                                            children: d.keputusan.triggerLevel?.toFixed(2) ?? '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                                            lineNumber: 1302,
                                                            columnNumber: 131
                                                        }, this),
                                                        " (maks 8 candle)"
                                                    ]
                                                }, void 0, true),
                                                d.keputusan.aksi === 'SKIP' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: "tanpa sapuan likuiditas baru — tidak mengambil posisi"
                                                }, void 0, false)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1300,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto font-mono text-[10px] text-slate-500",
                                            children: [
                                                "SAKTI-SH v",
                                                d.keputusan.versi,
                                                " · skor ",
                                                d.keputusan.score.toFixed(1)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1305,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1298,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-x-4 gap-y-1.5 rounded-lg border border-violet-500/25 bg-violet-500/5 p-3 text-xs sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "sm:col-span-2 mb-1 font-semibold text-violet-300",
                                            children: "Catatan wajib per ujian (11 field):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1310,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "1 · Entry price"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1311,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.entry !== null ? d.ledger.entry.toFixed(3) : '— (no trade)'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "2 · Exit price"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1313,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.exit !== null ? `${d.ledger.exit.toFixed(3)}${d.ledger.targetHit ? ` (target @c${d.ledger.hitCandle})` : d.ledger.mode === 'NO-TRADE' ? '' : ' (akhir horizon)'}` : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1314,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "3 · Fee buy (0.1%)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1315,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.feeBuy !== null ? d.ledger.feeBuy.toFixed(4) : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1316,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "4 · Fee sell (0.1%)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1317,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.ledger.feeSell !== null ? d.ledger.feeSell.toFixed(4) : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1318,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "5 · Gross P/L (tidak dipakai sbg hasil)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1319,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-mono ${d.ledger.grossPct !== null ? d.ledger.grossPct >= 0 ? 'text-emerald-300' : 'text-rose-300' : 'text-slate-500'}`,
                                            children: d.ledger.grossPct !== null ? `${d.ledger.grossPct >= 0 ? '+' : ''}${d.ledger.grossPct.toFixed(2)}%` : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-slate-300",
                                            children: "6 · NET P/L (hasil akhir)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1321,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-mono font-bold ${d.ledger.netPct !== null ? d.ledger.netPct >= 0 ? 'text-emerald-300' : 'text-rose-300' : 'text-slate-500'}`,
                                            children: d.ledger.netPct !== null ? `${d.ledger.netPct >= 0 ? '+' : ''}${d.ledger.netPct.toFixed(2)}%` : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1322,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "7 · Persentase return"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1323,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-mono ${d.ledger.returnPct !== null ? 'text-slate-200' : 'text-slate-500'}`,
                                            children: d.ledger.returnPct !== null ? `${d.ledger.returnPct >= 0 ? '+' : ''}${d.ledger.returnPct.toFixed(2)}%` : '—'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1324,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "8 · Hasil"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-right font-bold ${ok ? 'text-emerald-300' : 'text-rose-300'}`,
                                            children: d.ledger.mode === 'NO-TRADE' ? d.ledger.noTradeAman ? 'BERHASIL (no-trade aman — jebakan akan rugi)' : 'GAGAL (kelewatan peluang)' : ok ? 'BERHASIL (net profit)' : 'GAGAL (rugi after fee)'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1326,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "10 · Area likuiditas dianalisis"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1329,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.keputusan.pool.side === 'TAK-JELAS' ? 'tak-jelas' : `${d.keputusan.pool.jenis}/${d.keputusan.pool.side} @${d.keputusan.pool.level.toFixed(2)} · ${d.keputusan.pool.sentuhan}x sentuh`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1330,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400",
                                            children: "11 · Stop hunting / grab?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1333,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right font-mono text-slate-200",
                                            children: d.keputusan.grab.terjadi ? `YA — pasca-grab: ${d.keputusan.grab.post}` : 'tidak teridentifikasi'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1334,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1309,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1 font-semibold text-slate-400",
                                            children: "Bagaimana mesin mengidentifikasi sapuannya (point-in-time):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1339,
                                            columnNumber: 17
                                        }, this),
                                        d.keputusan.grab.cara,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 font-semibold text-slate-400",
                                            children: "Fakta pasar saat keputusan:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1341,
                                            columnNumber: 17
                                        }, this),
                                        d.fakta
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1338,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs leading-relaxed text-slate-300",
                                    children: d.keputusan.alasan.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: [
                                                "• ",
                                                r
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1346,
                                            columnNumber: 51
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/exam-console.tsx",
                                    lineNumber: 1345,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/exam-console.tsx",
                            lineNumber: 1296,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/exam-console.tsx",
            lineNumber: 1246,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 1245,
        columnNumber: 5
    }, this);
}
_s6(StophuntDialog, "nw2oghUzFG1C7IVwy7F4n2hQ/aM=");
_c11 = StophuntDialog;
function StophuntSection({ st }) {
    _s7();
    const [openNum, setOpenNum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const s = st.stophunt;
    const berhasil = s.rows.filter((r)=>r.berhasil === 'BERHASIL').length;
    const entries = s.rows.filter((r)=>r.mode !== 'NO-TRADE');
    const netTotal = entries.reduce((acc, r)=>acc + (r.netPct ?? 0), 0);
    const noTrade = s.rows.length - entries.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardShell, {
        title: undefined,
        icon: undefined,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-3xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-violet-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1369,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-bold tracking-wide",
                                        children: "UJIAN STOP HUNT / LIQUIDITY GRAB — 100 Skenario Pemburu Stop-Loss"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1370,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm italic leading-relaxed text-slate-300",
                                children: "“Seluruh 100 skenario adalah stop hunt: harga MENYAPU area likuiditas (stop cluster di bawah low / di atas high), memicu stop-loss berantai, lalu BERBALIK arah atau MELANJUTKAN arah. Sebelum memutuskan, otak memetakan struktur harga & likuiditas lalu memilih SATU dari TIGA keputusan: ENTRY, MENUNGGU KONFIRMASI, atau TIDAK MENGAMBIL POSISI. Setiap transaksi membayar fee buy 0.1% + fee sell 0.1% — hasil akhir hanya diterima sebagai NET profit.”"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1372,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: [
                                    "60 candle terlihat · 14 horizon · truth dari data · fee ",
                                    s.feeModel.buy,
                                    " + ",
                                    s.feeModel.sell,
                                    " = ",
                                    s.feeModel.total,
                                    " · SAKTI-SH v",
                                    s.versi,
                                    " · ",
                                    s.keputusan
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1378,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid shrink-0 grid-cols-3 gap-2 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Berhasil",
                                val: `${berhasil}/${s.rows.length}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "Posisi diambil",
                                val: `${entries.length}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1384,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mech, {
                                label: "No-trade",
                                val: `${noTrade}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1385,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1382,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1366,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Siklus uji → ukur → analisis → benahi → uji kembali"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1392,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: s.ringkas.siklus.map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-64 shrink-0 text-slate-400",
                                                        children: x.versi
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1397,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto font-mono text-xs text-amber-300",
                                                        children: x.skor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1398,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: x.catatan
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1400,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1395,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1393,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-slate-500",
                                children: [
                                    "Baseline jujur — ",
                                    s.ringkas.baseline.naif,
                                    ": ",
                                    s.ringkas.baseline.catatan
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1404,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Hakim tersegel — 1100 ujian, otak beku (bukti terukur, bukan kebetulan)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1407,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: s.ringkas.hasil.map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-64 shrink-0 text-slate-400",
                                                        children: x.ronde
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1412,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto font-mono text-xs text-emerald-300",
                                                        children: x.skor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                                        lineNumber: 1413,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1411,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: x.net
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                                lineNumber: 1415,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1410,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-slate-500",
                                children: [
                                    "Kumulatif suite web ini: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-slate-300",
                                        children: [
                                            berhasil,
                                            "/",
                                            s.rows.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1419,
                                        columnNumber: 79
                                    }, this),
                                    " berhasil · total net posisi ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-emerald-300",
                                        children: sgn(netTotal)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1419,
                                        columnNumber: 168
                                    }, this),
                                    " · ",
                                    s.feeModel.catatan
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1419,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1406,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1390,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-xl border border-violet-500/25 bg-violet-500/5 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1425,
                                columnNumber: 115
                            }, this),
                            " Ledger pelajaran stop hunt — setiap celah jadi aturan permanen (di-upgrade juga ke file Micaprofita_V231_SAKTI.html sebagai organ V235)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 lg:grid-cols-2",
                        children: s.ledger.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-violet-300",
                                        children: l.id
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1429,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-rose-300/80",
                                        children: [
                                            "Celah: ",
                                            l.celah
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1430,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-emerald-300/80",
                                        children: [
                                            "Aturan: ",
                                            l.aturan
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1431,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l.id, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1428,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1424,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                        children: "Peta kemahiran per arketipe stop hunt — terlemah dulu"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1439,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-1.5 md:grid-cols-2",
                        children: s.perArch.map((a)=>{
                            const p = a.ok / a.n * 100;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-56 shrink-0 truncate text-slate-400",
                                        children: a.k
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1445,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 flex-1 overflow-hidden rounded bg-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-full rounded ${p >= 100 ? 'bg-emerald-500' : p >= 80 ? 'bg-amber-500' : 'bg-rose-500'}`,
                                            style: {
                                                width: `${p}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/exam-console.tsx",
                                            lineNumber: 1447,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1446,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-28 text-right font-mono text-slate-300",
                                        children: [
                                            a.ok,
                                            "/",
                                            a.n,
                                            " · net ",
                                            sgn(a.net)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/exam-console.tsx",
                                        lineNumber: 1449,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, a.k, true, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1444,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1440,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1438,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",
                        children: "Penjelajah 100 skenario — klik untuk ruang ujian: grafik, keputusan 3-pilih, 11 field catatan wajib, amplop jawaban"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1458,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-10 gap-1 sm:grid-cols-20",
                        children: s.rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpenNum(r.num),
                                title: `#${r.num} ${r.archLabel} [${r.diff}] ${r.aksi}${r.aksi !== 'SKIP' ? ' ' + r.arah : ''} · ${r.berhasil}${r.netPct !== null ? ` · net ${r.netPct.toFixed(2)}%` : ''}`,
                                className: `rounded border px-0 py-1 text-[10px] font-mono transition ${r.mode === 'NO-TRADE' ? r.berhasil === 'BERHASIL' ? 'border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20' : 'border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25' : r.berhasil === 'BERHASIL' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20' : 'border-rose-500/50 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25'}`,
                                children: r.num
                            }, r.num, false, {
                                fileName: "[project]/src/components/arena/exam-console.tsx",
                                lineNumber: 1461,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1459,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[10px] text-slate-600",
                        children: "hijau = net profit · biru = no-trade aman (jebakan terhindar) · kuning = kelewatan · merah = likuidasi"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/exam-console.tsx",
                        lineNumber: 1475,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1457,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StophuntDialog, {
                openNum: openNum,
                onClose: ()=>setOpenNum(null)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/exam-console.tsx",
                lineNumber: 1478,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/exam-console.tsx",
        lineNumber: 1365,
        columnNumber: 5
    }, this);
}
_s7(StophuntSection, "v2eg6yc0HnvdH5lQeUsDrkthoPc=");
_c12 = StophuntSection;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12;
__turbopack_context__.k.register(_c, "CandleChart");
__turbopack_context__.k.register(_c1, "FactorBar");
__turbopack_context__.k.register(_c2, "ExamConsole");
__turbopack_context__.k.register(_c3, "Bar");
__turbopack_context__.k.register(_c4, "Mech");
__turbopack_context__.k.register(_c5, "CardShell");
__turbopack_context__.k.register(_c6, "TestDialog");
__turbopack_context__.k.register(_c7, "CandleDialog");
__turbopack_context__.k.register(_c8, "CandleSection");
__turbopack_context__.k.register(_c9, "BeartrapDialog");
__turbopack_context__.k.register(_c10, "BeartrapSection");
__turbopack_context__.k.register(_c11, "StophuntDialog");
__turbopack_context__.k.register(_c12, "StophuntSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_arena_exam-console_tsx_5c591088._.js.map