(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/arena/arena-console.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArenaConsole",
    ()=>ArenaConsole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarRadiusAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$guru$2d$chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/arena/guru-chat.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/swords.js [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleDot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-dot.js [app-client] (ecmascript) <export default as CircleDot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-minus.js [app-client] (ecmascript) <export default as MinusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flask-conical.js [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sprout.js [app-client] (ecmascript) <export default as Sprout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/network.js [app-client] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-client] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$exam$2d$console$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/arena/exam-console.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$arah$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/arena/arah-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$otak$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/arena/otak-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$nadi$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/arena/nadi-panel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
// ---------------- konstanta tampilan ----------------
const COMP = {
    MICAPROFITA: {
        label: 'MICAPROFITA',
        color: '#f59e0b',
        desc: 'Cyborg kita — genome berevolusi tiap hari'
    },
    AI_ANALIS: {
        label: 'AI ANALIS (GLM)',
        color: '#38bdf8',
        desc: 'LLM sekelas z.ai 5.2 membaca snapshot + berita'
    },
    MOMENTUM: {
        label: 'Momentum Naif',
        color: '#a78bfa',
        desc: 'Beli apa yang naik paling keras'
    },
    MEANREV: {
        label: 'Mean-Reversion',
        color: '#2dd4bf',
        desc: 'Beli jatuh terdalam, harap memantul'
    },
    BNH_BTC: {
        label: 'Beli-Tahan BTC',
        color: '#94a3b8',
        desc: 'Patokan pasar'
    },
    ACAK: {
        label: 'Dadu Acak',
        color: '#fb7185',
        desc: 'Dadu berbibit — dasar keberuntungan'
    }
};
const TABS = [
    {
        id: 'arena',
        label: 'Arena Hari Ini',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"]
    },
    {
        id: 'arah',
        label: 'Kepastian Arah',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"]
    },
    {
        id: 'simulasi',
        label: 'Ujian Simulasi',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"]
    },
    {
        id: 'tumbuh',
        label: 'Pertumbuhan',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__["Sprout"]
    },
    {
        id: 'briefing',
        label: 'Briefing Guru',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
    },
    {
        id: 'ujian',
        label: 'Ujian & Upgrade',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"]
    },
    {
        id: 'otak',
        label: 'Otak & Ingatan',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"]
    },
    {
        id: 'mozaik',
        label: 'Arsitektur Kognitif',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"]
    },
    {
        id: 'nadi',
        label: 'Nadi & Gudang',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"]
    },
    {
        id: 'guru',
        label: 'Ruang Guru',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
    }
];
const REGIME_TONE = {
    TREND_NAIK: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
    TREND_TURUN: 'text-rose-300 border-rose-500/40 bg-rose-500/10',
    SIDEWAYS: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
    JATUH: 'text-rose-200 border-rose-400/50 bg-rose-500/20'
};
const fmtPct = (v, digits = 2)=>v === null || v === undefined ? '—' : `${v >= 0 ? '+' : ''}${(v * 100).toFixed(digits)}%`;
const fmtX = (v)=>`×${v.toFixed(1)}`;
function ArenaConsole() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('arena');
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const timer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArenaConsole.useEffect": ()=>{
            let alive = true;
            let inflight = false;
            const load = {
                "ArenaConsole.useEffect.load": async ()=>{
                    // V300-ANTISTUCK — tanpa fetch bertumpuk + batas waktu keras: kalau satu
                    // jawaban lambat/macet, poll berikutnya tetap jalan & UI tak pernah beku.
                    if (inflight) return;
                    inflight = true;
                    const ctrl = new AbortController();
                    const t = setTimeout({
                        "ArenaConsole.useEffect.load.t": ()=>ctrl.abort()
                    }["ArenaConsole.useEffect.load.t"], 12_000);
                    try {
                        const res = await fetch('/api/arena', {
                            cache: 'no-store',
                            signal: ctrl.signal
                        });
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        const data = await res.json();
                        if (alive) {
                            setState(data);
                            setErr(null);
                        }
                    } catch (e) {
                        if (alive) setErr(e.message);
                    } finally{
                        clearTimeout(t);
                        inflight = false;
                    }
                }
            }["ArenaConsole.useEffect.load"];
            load();
            timer.current = setInterval(load, 6000);
            return ({
                "ArenaConsole.useEffect": ()=>{
                    alive = false;
                    if (timer.current) clearInterval(timer.current);
                }
            })["ArenaConsole.useEffect"];
        }
    }["ArenaConsole.useEffect"], []);
    if (err && !state) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-300",
            children: [
                "Arena gagal dihubungi: ",
                err,
                ". Menunggu percobaan berikutnya…"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 215,
            columnNumber: 7
        }, this);
    }
    if (!state) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-sm text-zinc-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                    className: "h-4 w-4 animate-spin text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this),
                "Membuka saluran ke arena…"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 222,
            columnNumber: 7
        }, this);
    }
    const booting = state.bootstrap.status !== 'selesai';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-zinc-900/60 to-zinc-900/60",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse rounded-full bg-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-extrabold tracking-tight text-zinc-50",
                                                children: [
                                                    "MICAPROFITA ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-amber-400",
                                                        children: "·"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 29
                                                    }, this),
                                                    " ARENA AGI KRIPTO"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-zinc-400",
                                                children: [
                                                    "Generasi ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-amber-300",
                                                        children: [
                                                            "G",
                                                            state.genome.generation
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 26
                                                    }, this),
                                                    ' · ',
                                                    "Hari pertarungan ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-zinc-200",
                                                        children: state.today
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 41
                                                    }, this),
                                                    " UTC",
                                                    state.regime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            " · Rezim ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded border px-1.5 py-0.5 text-[10px] font-bold ${REGIME_TONE[state.regime] ?? ''}`,
                                                                children: state.regime
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 30
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-[11px] text-zinc-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleDot$3e$__["CircleDot"], {
                                        className: "h-3.5 w-3.5 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    "Data hidup Binance · universe dinamis ",
                                    state.universe.symbols,
                                    "/hari dari pool ",
                                    state.universe.pool ?? 120,
                                    "+ · ",
                                    state.universe.scoredDays,
                                    " hari teradili"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    state.stale && state.dataDay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-amber-500/25 bg-amber-500/[0.07] px-5 py-2.5 text-[11px] leading-relaxed text-amber-300",
                        children: [
                            "⏳ Hari sistem sudah ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "font-mono",
                                children: state.today
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 263,
                                columnNumber: 33
                            }, this),
                            ", tapi data sasaran terakhir masih milik ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "font-mono",
                                children: state.dataDay
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 263,
                                columnNumber: 116
                            }, this),
                            typeof state.dataLagHari === 'number' && state.dataLagHari > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    " (tertinggal ",
                                    state.dataLagHari,
                                    " hari)"
                                ]
                            }, void 0, true),
                            ".",
                            ' ',
                            "Arena otomatis sinkron di belakang — sumber data sedang terhalang/lambat. Tanggal tidak lagi tertukar."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this),
                    booting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-amber-500/20 bg-black/30 px-5 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1.5 flex items-center justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-2 text-amber-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                                className: "h-3.5 w-3.5 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this),
                                            state.bootstrap.status === 'berjalan' ? 'Mengadili sejarah & menyiapkan sasaran hari ini… (mesin sedang bekerja)' : 'Menyiapkan arena…'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-zinc-400",
                                        children: [
                                            state.bootstrap.progress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                value: state.bootstrap.progress,
                                className: "h-1.5 bg-zinc-800 [&>div]:bg-amber-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            state.bootstrap.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1.5 text-[11px] text-rose-400",
                                children: state.bootstrap.error
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 282,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5",
                children: TABS.map((t)=>{
                    const Icon = t.icon;
                    const active = tab === t.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab(t.id),
                        className: `flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${active ? 'border-amber-500/50 bg-amber-500/15 text-amber-300' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 301,
                                columnNumber: 15
                            }, this),
                            t.label
                        ]
                    }, t.id, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 294,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            tab === 'arena' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabArena, {
                state: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 308,
                columnNumber: 27
            }, this),
            tab === 'arah' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$arah$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArahPanel"], {}, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 309,
                columnNumber: 26
            }, this),
            tab === 'simulasi' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$exam$2d$console$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExamConsole"], {}, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 310,
                columnNumber: 30
            }, this),
            tab === 'tumbuh' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabTumbuh, {}, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 311,
                columnNumber: 28
            }, this),
            tab === 'briefing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabBriefing, {
                state: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 312,
                columnNumber: 30
            }, this),
            tab === 'ujian' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabUjian, {
                state: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 313,
                columnNumber: 27
            }, this),
            tab === 'otak' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabOtak, {
                state: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 314,
                columnNumber: 26
            }, this),
            tab === 'mozaik' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$otak$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OtakPanel"], {}, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 315,
                columnNumber: 28
            }, this),
            tab === 'nadi' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$nadi$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NadiPanel"], {}, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 316,
                columnNumber: 26
            }, this),
            tab === 'guru' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$arena$2f$guru$2d$chat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GuruChat"], {}, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 317,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
_s(ArenaConsole, "21n1xxXUYM4jQHoyaAaKpAbNDCQ=");
_c = ArenaConsole;
// ================= TAB: ARENA HARI INI =================
function TabArena({ state }) {
    const todayMine = state.todayPicks;
    const mica = state.standings.find((s)=>s.competitor === 'MICAPROFITA');
    // V300 — FOKUS PENGEMBANGAN: arena murni menampilkan MICAPROFITA.
    // Perbandingan vs GLM/momentum dipensiunkan dari tampilan; energi penuh ke otak kita.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            state.pulse && state.pulse.items.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.06] via-zinc-900/60 to-zinc-900/60 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        className: "h-4 w-4 animate-pulse text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    " NADIR — Denyut Intraday Pick Cyborg"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    state.climate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FngChip, {
                                                fng: state.climate.fng,
                                                cls: state.climate.fngClass
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this),
                                            state.climate.mcapChange24h !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `rounded-lg border px-2 py-1 text-[10px] font-semibold ${state.climate.mcapChange24h >= 0 ? 'border-emerald-500/40 text-emerald-300' : 'border-rose-500/40 text-rose-300'}`,
                                                children: [
                                                    "MCap 24j ",
                                                    state.climate.mcapChange24h >= 0 ? '+' : '',
                                                    state.climate.mcapChange24h.toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 343,
                                                columnNumber: 21
                                            }, this),
                                            state.climate.btcDominance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-lg border border-zinc-700 px-2 py-1 text-[10px] font-semibold text-zinc-300",
                                                children: [
                                                    "BTC dom ",
                                                    state.climate.btcDominance.toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 348,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NadirCountdown, {
                                        ms: state.pulse.utcClosesInMs
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 354,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-2",
                        children: state.pulse.items.map((x, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DirectionBadge, {
                                                dir: x.direction
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 361,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-sm font-bold text-zinc-100",
                                                children: x.symbol.replace('USDT', '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this),
                                            typeof x.fundingPct === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded border border-zinc-700 px-1.5 py-0.5 text-[9px] text-zinc-400",
                                                title: "Funding rate futures — info posisi massa (bukan filter, hasil lab Ujian #2-#4)",
                                                children: [
                                                    "fund ",
                                                    x.fundingPct >= 0 ? '+' : '',
                                                    x.fundingPct.toFixed(3),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 364,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto font-mono text-lg font-extrabold",
                                                children: x.liveRetPct === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-zinc-500",
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 46
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: x.liveRetPct >= 0 ? 'text-emerald-400' : 'text-rose-400',
                                                    children: [
                                                        x.liveRetPct >= 0 ? '+' : '',
                                                        x.liveRetPct.toFixed(2),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 368,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 360,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1.5 flex items-end justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-[10px] text-zinc-500",
                                                children: [
                                                    "keputusan ",
                                                    x.entryClose > 0 ? x.entryClose.toPrecision(6) : '—',
                                                    " → hidup ",
                                                    x.livePrice !== null ? x.livePrice.toPrecision(6) : '—',
                                                    x.spark && x.spark.length >= 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-zinc-600",
                                                        children: [
                                                            "· 48j: ",
                                                            x.spark[0] !== 0 ? ((x.spark[x.spark.length - 1] - x.spark[0]) / x.spark[0] * 100).toFixed(1) : '—',
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 56
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 377,
                                                columnNumber: 19
                                            }, this),
                                            x.spark && x.spark.length >= 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sparkline, {
                                                data: x.spark,
                                                up: (x.liveRetPct ?? 0) >= 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 381,
                                                columnNumber: 54
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 376,
                                        columnNumber: 17
                                    }, this),
                                    x.verdict && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VonisChip, {
                                        kind: x.verdict.kind,
                                        note: x.verdict.note,
                                        sources: x.verdict.sources
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 383,
                                        columnNumber: 31
                                    }, this),
                                    x.rencana && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WarisanPanel, {
                                        dir: x.direction,
                                        conf: 0,
                                        symbol: x.symbol,
                                        rencana: x.rencana,
                                        warisan: x.warisan,
                                        daya: x.daya,
                                        pra: x.praRegistrasi,
                                        sadardiri: x.sadardiri,
                                        compact: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 385,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 359,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-[10px] leading-relaxed text-zinc-500",
                        children: "P&L hidup = harga pasar sekarang vs harga keputusan (close T-1). Sparkline = candle 1 jam 48 jam terakhir. Vonis berita dibaca mesin vonis dari pita berita 3 hari terakhir — hanya untuk hari hidup, hari historis tetap murni kuant (bebas kebocoran). Funding = info posisi massa, bukan filter. Panel WARISAN V250 = tangga harga + peluang Monte Carlo 2.000 lintasan berbibit + GARCH/beta/POC — pra-registrasi pada momen kunci, wajib NET after fee."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 391,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 333,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-zinc-800 px-5 py-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "h-4 w-4 text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 401,
                                        columnNumber: 13
                                    }, this),
                                    " Barisan Hari ",
                                    state.today,
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-normal text-zinc-500",
                                        children: "(dinilai saat candle tutup besok)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 401,
                                        columnNumber: 83
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 400,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "border-amber-500/40 text-[10px] text-amber-400",
                                children: "PENDING"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DaftarTempur, {
                        picks: todayMine,
                        slotHariIni: state.slotHariIni,
                        today: state.today
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BukuCuanPanel, {
                        buku: state.bukuCuan ?? null
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 p-4 md:grid-cols-2",
                        children: [
                            'MICAPROFITA'
                        ].map((comp)=>{
                            const picks = todayMine.filter((p)=>p.competitor === comp);
                            const meta = COMP[comp];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-xl border p-4 ${comp === 'MICAPROFITA' ? 'border-amber-500/30 bg-amber-500/[0.05]' : 'border-sky-500/30 bg-sky-500/[0.04]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-2.5 flex items-center gap-2 text-xs font-bold",
                                        style: {
                                            color: meta?.color
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 w-2 rounded-full",
                                                style: {
                                                    background: meta?.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, this),
                                            meta?.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, this),
                                    picks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-zinc-500",
                                        children: "Menunggu keputusan…"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 420,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: picks.slice(0, 6).map((p, i)=>{
                                            const ev = evOf(p);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DirectionBadge, {
                                                                dir: p.direction
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-semibold text-zinc-200",
                                                                children: p.symbol.replace('USDT', '')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-500",
                                                                children: [
                                                                    "keyakinan ",
                                                                    Math.round(p.confidence),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                lineNumber: 430,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-auto truncate text-[10px] text-zinc-500",
                                                                children: String(p.evidence.reason ?? p.evidence.note ?? '')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                lineNumber: 431,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 25
                                                    }, this),
                                                    ev.rencana && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LevelRingkas, {
                                                        dir: p.direction,
                                                        rencana: ev.rencana
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 40
                                                    }, this),
                                                    !ev.rencana && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-[10px] text-zinc-600",
                                                        children: "rencana pra-registrasi menyusul pada denyut berikutnya"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 426,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, comp, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 415,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                            className: "h-4 w-4 text-amber-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 450,
                            columnNumber: 17
                        }, void 0),
                        label: "Profit kumulatif",
                        value: mica ? fmtPct(mica.cumRet) : '—',
                        sub: mica ? `${mica.days} hari tempur · terbaik ${fmtPct(mica.bestDay)} · terburuk ${fmtPct(mica.worstDay)}` : 'menunggu vonis'
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                            className: "h-4 w-4 text-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 456,
                            columnNumber: 17
                        }, void 0),
                        label: "Akurasi kumulatif",
                        value: mica ? `${(mica.hitRate * 100).toFixed(0)}%` : '—',
                        sub: mica ? `${mica.picks} pick teradili · berevolusi tiap vonis` : 'menunggu pick pertama'
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 455,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                            className: "h-4 w-4 text-violet-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 462,
                            columnNumber: 17
                        }, void 0),
                        label: "Masa tempur",
                        value: `${state.universe.scoredDays} hari`,
                        sub: `generasi G${state.genome.generation} · memori ${state.memory?.storedRows ?? 0} baris`
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 461,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-4 flex items-center gap-2 text-sm font-bold text-zinc-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "h-4 w-4 text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this),
                            " Perjalanan Profit Kumulatif (%)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 471,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-64",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                data: state.chart,
                                margin: {
                                    top: 4,
                                    right: 8,
                                    left: -12,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        stroke: "#27272a",
                                        strokeDasharray: "3 3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "day",
                                        tick: {
                                            fill: '#71717a',
                                            fontSize: 10
                                        },
                                        tickLine: false,
                                        axisLine: {
                                            stroke: '#3f3f46'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                        tick: {
                                            fill: '#71717a',
                                            fontSize: 10
                                        },
                                        tickLine: false,
                                        axisLine: {
                                            stroke: '#3f3f46'
                                        },
                                        unit: "%",
                                        width: 52
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        contentStyle: {
                                            background: '#18181b',
                                            border: '1px solid #3f3f46',
                                            borderRadius: 12,
                                            fontSize: 12
                                        },
                                        labelStyle: {
                                            color: '#a1a1aa'
                                        },
                                        formatter: (value)=>`${Number(value).toFixed(2)}%`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                        wrapperStyle: {
                                            fontSize: 11
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 485,
                                        columnNumber: 15
                                    }, this),
                                    state.standings.filter((s)=>s.competitor === 'MICAPROFITA').map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                            type: "monotone",
                                            dataKey: s.competitor,
                                            name: s.competitor,
                                            stroke: "#f59e0b",
                                            strokeWidth: 2.6,
                                            dot: false,
                                            connectNulls: true
                                        }, s.competitor, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 487,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 476,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 475,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 470,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-zinc-800 px-5 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                        className: "h-4 w-4 text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 507,
                                        columnNumber: 13
                                    }, this),
                                    " Rekor Diri MICAPROFITA"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "border-zinc-700 text-[10px] text-zinc-500",
                                children: "kumulatif · evolusi harian"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 509,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y divide-zinc-800/40",
                        children: [
                            state.standings.filter((s)=>s.competitor === 'MICAPROFITA').map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2 px-5 py-3 text-xs sm:grid-cols-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                                    children: "Profit kumulatif"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `font-mono font-bold ${s.cumRet >= 0 ? 'text-emerald-400' : 'text-rose-400'}`,
                                                    children: fmtPct(s.cumRet)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 109
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 514,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                                    children: "Akurasi"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono font-bold text-zinc-200",
                                                    children: [
                                                        (s.hitRate * 100).toFixed(0),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 515,
                                                    columnNumber: 100
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 515,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                                    children: "Hari tempur"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono font-bold text-zinc-200",
                                                    children: s.days
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 104
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 516,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                                    children: "Hari terbaik"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono font-bold text-emerald-400",
                                                    children: fmtPct(s.bestDay)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 105
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                                    children: "Hari terburuk"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono font-bold text-rose-400",
                                                    children: fmtPct(s.worstDay)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 106
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 518,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.competitor, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 513,
                                    columnNumber: 15
                                }, this)),
                            state.standings.filter((s)=>s.competitor === 'MICAPROFITA').length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-5 py-8 text-center text-xs text-zinc-500",
                                children: "Belum ada hari teradili — tunggu sinkronisasi…"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-3 text-sm font-bold text-zinc-100",
                        children: "Kronik Arena"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            state.events.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2.5 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventChip, {
                                            kind: e.kind
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 533,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "leading-relaxed text-zinc-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-zinc-600",
                                                    children: e.day
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 17
                                                }, this),
                                                " — ",
                                                e.text
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 532,
                                    columnNumber: 13
                                }, this)),
                            state.events.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500",
                                children: "Belum ada peristiwa."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 539,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 528,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
_c1 = TabArena;
// ================= TAB: UJIAN & UPGRADE =================
// Laporan Ujian #1–#5 (sebelum UPGRADE PREDATOR V2) — fakta terukur, dibekukan.
const UJIAN_BEFORE = {
    periode: '21 hari (2026-08-29 → 2026-09-18), data candle Binance riil',
    standingsBefore: [
        {
            name: 'MOMENTUM (naif)',
            ret: 82.5
        },
        {
            name: 'AI_ANALIS (GLM)',
            ret: 61.1
        },
        {
            name: 'MICAPROFITA (lama)',
            ret: 30.5
        },
        {
            name: 'MEANREV (naif)',
            ret: 25.6
        },
        {
            name: 'BNH_BTC',
            ret: 4.3
        },
        {
            name: 'ACAK',
            ret: -27.9
        }
    ],
    findings: [
        {
            title: 'Faktor "volatilitas terkendali" = ANTI-ALPHA',
            detail: 'Pick ATR rendah rata-rata −1.3%/hari, pick ATR tinggi +4.4% — skor lama memberi hadiah pada koin yang kalah. Kini jadi kewajiban veto, bukan komponen skor.'
        },
        {
            title: 'Momentum terencerkan oleh 8 faktor',
            detail: 'Emas arena = pelari mom7 teratas (parapol berlanjut 1–3 hari: SYN +77%, ONE +80%). Skor lama mendorongnya keluar antrian + filter ATR 12% memblokirnya.'
        },
        {
            title: 'Universe beku = pumper baru tak terlihat',
            detail: 'DASH +31.9% dipilih MOMENTUM karena ada di universe bootstrap; koin yang meledak masuk-keluar daftar likuiditas tiap hari. Kini universe DINAMIS top-40 per hari dari pool 120+.'
        },
        {
            title: 'Slot SELL menggerus profit di bull',
            detail: 'SELL rata-rata +0.4% vs BUY +1.8% — satu slot terbuang saat pelari melaju. Kini SELL hanya knob evolusi (mati secara default, terbukti lab).'
        },
        {
            title: 'Kegagalan beruntun tak diingat',
            detail: 'INJ gagal 5× berturut-turut dgn keyakinan tinggi tanpa penalti. Kini memori episode + knob K/kualitas menahan pick kembar sial.'
        }
    ],
    lab: [
        {
            v: 'V0 otak lama',
            ret: 36.0,
            note: 'reproduksi baseline (8-faktor campur)'
        },
        {
            v: 'V5 sensor funding+taker',
            ret: 5.8,
            note: 'sensor DITOLAK — mengencerkan sinyal'
        },
        {
            v: 'W1 mom murni + univ. dinamis',
            ret: 90.4,
            note: 'menembus MOMENTUM +82.5'
        },
        {
            v: 'X3 + breadth guard',
            ret: 145.4,
            note: 'pasar lemah → K=1 fokus leader'
        },
        {
            v: 'X5 + mode parabolik',
            ret: 146.6,
            note: 'DIPASANG = PREDATOR V2'
        },
        {
            v: 'X7 + SELL rezim turun',
            ret: 90.7,
            note: 'SELL DITOLAK — menggerus'
        }
    ]
};
function TabUjian({ state }) {
    const mica = state.standings.find((s)=>s.competitor === 'MICAPROFITA');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "flex items-center gap-2 p-5 pb-0 text-sm font-bold text-amber-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 583,
                                columnNumber: 11
                            }, this),
                            " Siklus UJIAN → BEDAH KELEMAHAN → UPGRADE → UJIAN LAGI"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 582,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 px-5 text-xs leading-relaxed text-zinc-300",
                        children: [
                            "Evolusi cyborg tidak ditunggu — ia ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "dikerjakan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 586,
                                columnNumber: 46
                            }, this),
                            ". Setiap hasil arena dibedah: kelemahan diidentifikasi lewat lab simulasi bebas-kebocoran, di-upgrade oleh pengembang, lalu diuji ulang. Fokus kini murni pengembangan MICAPROFITA."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 585,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid gap-2 p-5 pt-0 sm:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                        children: "Sebelum upgrade"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-sm font-bold text-rose-300",
                                        children: "+30.5% · akurasi lemah"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 591,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                        children: "Sekarang (hidup)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 594,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-sm font-bold text-emerald-300",
                                        children: mica ? `${(mica.cumRet * 100).toFixed(1)}% · akurasi ${(mica.hitRate * 100).toFixed(0)}%` : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 595,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 593,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                        children: "Target lab (21 hari)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 598,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-sm font-bold text-amber-300",
                                        children: "+146.6% (target lab)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 599,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 597,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 581,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-1 flex items-center gap-2 text-sm font-bold text-zinc-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                className: "h-4 w-4 text-rose-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 607,
                                columnNumber: 11
                            }, this),
                            " Ujian #1 — bedah forensik kekalahan (+30.5% vs MOMENTUM +82.5%)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 606,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] text-zinc-500",
                        children: UJIAN_BEFORE.periode
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 609,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2.5",
                        children: UJIAN_BEFORE.findings.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800/70 bg-zinc-900/40 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-zinc-200",
                                        children: [
                                            i + 1,
                                            ". ",
                                            f.title
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 613,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-[11px] leading-relaxed text-zinc-400",
                                        children: f.detail
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 614,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 612,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 610,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 605,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-1 flex items-center gap-2 text-sm font-bold text-zinc-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                className: "h-4 w-4 text-violet-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, this),
                            " Ujian #2–#5 — laboratorium strategi (simulasi bebas kebocoran)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] text-zinc-500",
                        children: "8+ varian otak diuji pada 21 hari yang sama, faktor hanya dari candle sebelum hari-D. Yang menang dipasang, yang gagal dibuang."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: UJIAN_BEFORE.lab.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-3 rounded-lg border px-3.5 py-2 text-xs ${l.v.includes('PREDATOR') || l.v.includes('DIPASANG') ? 'border-amber-500/40 bg-amber-500/[0.07]' : 'border-zinc-800/60 bg-zinc-900/40'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 text-zinc-300",
                                        children: l.v
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 629,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden text-[10px] text-zinc-500 sm:inline",
                                        children: l.note
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `w-16 text-right font-mono font-bold ${l.ret > 80 ? 'text-emerald-400' : l.ret > 0 ? 'text-amber-300' : 'text-rose-400'}`,
                                        children: [
                                            l.ret >= 0 ? '+' : '',
                                            l.ret.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 628,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 626,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 621,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-sky-500/30 bg-sky-500/[0.04] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-2 flex items-center gap-2 text-sm font-bold text-sky-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 640,
                                columnNumber: 11
                            }, this),
                            " Upgrade terpasang: PREDATOR V2 (oleh pengembang)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1.5 text-xs leading-relaxed text-zinc-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Universe dinamis"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 643,
                                        columnNumber: 17
                                    }, this),
                                    " — top-40 likuiditas dihitung ULANG tiap hari dari pool 120+ simbol; pumper baru masuk radar hari itu juga."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 643,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Antrian kepemimpinan momentum"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 644,
                                        columnNumber: 17
                                    }, this),
                                    " — pelari teratas diuriutkan; komposit 8 faktor hanya menjadi tie-break + bukti briefing."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 644,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Konsentrasi adaptif"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 645,
                                        columnNumber: 17
                                    }, this),
                                    " — breadth lemah → K=1 fokus leader absolut; mode parabolik (mom7 leader > ambang) → K=2 naiki pelari."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 645,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Genome knob struktural"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 646,
                                        columnNumber: 17
                                    }, this),
                                    " — evolusi kini mengubah KEBIJAKAN (K, ambang breadth, ambang parabolik, ATR cap), bukan sekadar bobot."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 646,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Sensor ditolak hasil lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 647,
                                        columnNumber: 17
                                    }, this),
                                    " — funding/taker flow & SELL dipensiunkan karena terukur menggerus profit; data tetap dipantau utk riset lanjut."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 647,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 642,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 638,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-violet-500/30 bg-violet-500/[0.05] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-2 flex items-center gap-2 text-sm font-bold text-violet-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 654,
                                columnNumber: 11
                            }, this),
                            " Ujian #7 → Upgrade V3: radar 4 jam + vonis LLM + denyut NADIR"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 653,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] leading-relaxed text-zinc-400",
                        children: [
                            "Bedah terbaru (56 pick terakhir): momentum 24 jam dari candle 4 jam terbukti memisahkan pick bagus dan pick berdarah — yang ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "melemah (−5..0%)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 657,
                                columnNumber: 135
                            }, this),
                            " rata-rata ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-rose-300",
                                children: "−2.7% hit 38%"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 657,
                                columnNumber: 169
                            }, this),
                            ", yang ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "tenang/akselerasi"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 657,
                                columnNumber: 222
                            }, this),
                            " rata-rata ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-emerald-300",
                                children: "+9–10% hit 58%"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 657,
                                columnNumber: 257
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 text-xs leading-relaxed text-zinc-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Sumber informasi baru: uplink candle 4 jam"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 660,
                                        columnNumber: 39
                                    }, this),
                                    " — radar intraday “leader mati” yang tak terlihat dari candle harian; masuk bukti briefing + kewajiban Konfirmasi 4 jam + penyetel keyakinan."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 660,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Kejujuran lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 661,
                                        columnNumber: 39
                                    }, this),
                                    " — hard-reject leader mati diuji 3 ambang (−3/−5/−8) pada 21 hari riil: semuanya MENGURANGI profit (213.0% → 200–211.7%) karena memangkas pemenang besar. Guard dipasang sebagai knob DORMAN (bisa dinyalakan evolusi bila rezim berubah), bukan dipaksakan."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 661,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Lapisan vonis berita"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 662,
                                        columnNumber: 39
                                    }, this),
                                    " — sebelum pick hari hidup disimpan, berita 3 hari terakhir tiap kandidat dibaca mesin vonis: KONFIRMASI berdiri, PERINGATAN pangkas keyakinan −15, VETO mencabut pick & mengganti kandidat berikutnya (dicatat di Kronik)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 662,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "NADIR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 663,
                                        columnNumber: 39
                                    }, this),
                                    " — denyut intraday di Arena Hari Ini: P&L hidup tiap pick + hitung mundur tutup candle UTC. Arena kini bernapas sepanjang hari, bukan sekadar menunggu vonis besok."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Integritas tetap"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 664,
                                        columnNumber: 39
                                    }, this),
                                    " — vonis berita hanya untuk hari hidup; hari historis murni kuant (berita hari ini tak boleh menyusup ke sejarah = kebocoran)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 664,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 659,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 652,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-2 flex items-center gap-2 text-sm font-bold text-emerald-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 671,
                                columnNumber: 11
                            }, this),
                            " Ujian #8 → Upgrade V4: SADAR-INGATAN + sumber informasi baru"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 670,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] leading-relaxed text-zinc-400",
                        children: [
                            "Bedah forensik menemukan masalah paling dalam sejauh ini: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-rose-300",
                                children: "ingatan adalah organ mati"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 674,
                                columnNumber: 69
                            }, this),
                            " — episode & pola dipanen tiap hari, TAPI tidak pernah dibaca saat keputusan. Akar teknisnya: bucket 8-faktor menghasilkan 6561 kombinasi, ingatan tak pernah cukup padat (n≥3 hampir mustahil) untuk dipakai."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 673,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 text-xs leading-relaxed text-zinc-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Memori BERJENJANG"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 677,
                                        columnNumber: 39
                                    }, this),
                                    " — SIMBOL (episode koin sama) → BUCKET3 (27 kombinasi momentum/volume/struktur) → REZIM. Ingatan kini cukup padat dan benar-benar dibaca otak."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 677,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Tiga pemakaian nyata"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 678,
                                        columnNumber: 39
                                    }, this),
                                    " — tie-break antrian (setelah mom7 & radar 4 jam), penyetel keyakinan (±8), dan MEMVETO surgikal: kandidat di-skip saat ingatan bilang pola ini biasanya gagal (n≥4, rata ≤ −3%, hit < 30%)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 678,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Lab jujur 21 hari"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 679,
                                        columnNumber: 39
                                    }, this),
                                    " — V3 buta ingatan ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-amber-300",
                                        children: "+212.9%"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 679,
                                        columnNumber: 82
                                    }, this),
                                    " vs V4 sadar-ingatan ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-emerald-300",
                                        children: "+233.7%"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 679,
                                        columnNumber: 144
                                    }, this),
                                    ": 2 MEMVETO di 09-18 mengganti leader layu dengan kandidat kuat (+20.8 poin). Diag: pick ber-ingatan-positif rata-rata +6.25%."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 679,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Sumber informasi baru"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 680,
                                        columnNumber: 39
                                    }, this),
                                    " — Fear & Greed (alternative.me), market cap global & dominasi BTC (CoinGecko), funding rate futures (chip info — lab menolaknya sebagai filter, jadi kami tampilkan transparan), sparkline 1 jam di NADIR."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 680,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "list-none",
                                children: [
                                    "• ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Integritas"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 681,
                                        columnNumber: 39
                                    }, this),
                                    " — ingatan hanya ditulis SETELAH hari dinilai; pick hari-D hanya membaca memori hari < D. Bibit memori disebar dari sejarah teradili (idempoten, tanpa kebocoran)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 681,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 676,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 669,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-2 text-sm font-bold text-zinc-100",
                        children: "Syarat kelulusan ujian berikutnya"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 687,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 text-xs text-zinc-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 689,
                                        columnNumber: 49
                                    }, this),
                                    " Akurasi & profit naik konsisten — setiap kelemahan yang terbaca wajib jadi upgrade nyata."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 689,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 690,
                                        columnNumber: 49
                                    }, this),
                                    " Ukuran keberhasilan = perkembangan diri vs kemarin, bukan perbandingan dgn pihak luar."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 691,
                                        columnNumber: 49
                                    }, this),
                                    " Setiap kegagalan hari → bedah faktor → knob/weights berubah (log di tab Otak & Ingatan)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 691,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 688,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 686,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 579,
        columnNumber: 5
    }, this);
}
_c2 = TabUjian;
function EventChip({ kind }) {
    const map = {
        REVOLUSI: {
            cls: 'border-rose-500/50 bg-rose-500/15 text-rose-300',
            label: 'REVOLUSI'
        },
        UPGRADE: {
            cls: 'border-sky-500/50 bg-sky-500/15 text-sky-300',
            label: 'UPGRADE'
        },
        VONIS: {
            cls: 'border-violet-500/50 bg-violet-500/15 text-violet-300',
            label: 'VONIS'
        },
        MILESTONE: {
            cls: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300',
            label: 'SIAP'
        },
        BOOTSTRAP: {
            cls: 'border-amber-500/50 bg-amber-500/15 text-amber-300',
            label: 'LAHIR'
        },
        PERTUMBUHAN: {
            cls: 'border-lime-500/50 bg-lime-500/15 text-lime-300',
            label: 'TUMBUH'
        },
        EMEREN: {
            cls: 'border-fuchsia-500/50 bg-fuchsia-500/15 text-fuchsia-300',
            label: 'EMEREN'
        },
        SISTEM: {
            cls: 'border-zinc-600 bg-zinc-800 text-zinc-300',
            label: 'SISTEM'
        }
    };
    const m = map[kind] ?? map.SISTEM;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold ${m.cls}`,
        children: m.label
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 710,
        columnNumber: 10
    }, this);
}
_c3 = EventChip;
function NadirCountdown({ ms }) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded-lg border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 font-mono text-[10px] text-zinc-300",
        children: [
            "candle tutup dalam ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-bold text-amber-300",
                children: [
                    h,
                    "j ",
                    String(m).padStart(2, '0'),
                    "m"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 718,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 717,
        columnNumber: 5
    }, this);
}
_c4 = NadirCountdown;
function VonisChip({ kind, note, sources }) {
    if (kind === 'KONFIRMASI') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.07] px-2.5 py-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] font-bold text-emerald-300",
                    children: [
                        "VONIS LLM: KONFIRMASI ",
                        sources > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-normal text-zinc-500",
                            children: [
                                "· ",
                                sources,
                                " pita berita"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 727,
                            columnNumber: 101
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 727,
                    columnNumber: 9
                }, this),
                note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] leading-relaxed text-zinc-400",
                    children: note
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 728,
                    columnNumber: 18
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 726,
            columnNumber: 7
        }, this);
    }
    if (kind === 'PERINGATAN') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-lg border border-amber-500/40 bg-amber-500/[0.08] px-2.5 py-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] font-bold text-amber-300",
                    children: [
                        "VONIS LLM: PERINGATAN ",
                        sources > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-normal text-zinc-500",
                            children: [
                                "· ",
                                sources,
                                " pita"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 735,
                            columnNumber: 99
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 735,
                    columnNumber: 9
                }, this),
                note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] leading-relaxed text-zinc-400",
                    children: note
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 736,
                    columnNumber: 18
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 734,
            columnNumber: 7
        }, this);
    }
    if (kind === 'VETO') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-2 rounded-lg border border-rose-500/40 bg-rose-500/[0.08] px-2.5 py-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] font-bold text-rose-300",
                    children: "VONIS LLM: VETO"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 743,
                    columnNumber: 9
                }, this),
                note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] leading-relaxed text-zinc-400",
                    children: note
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 744,
                    columnNumber: 18
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 742,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] text-zinc-500",
            children: [
                "VONIS LLM: TANPA VONIS — ",
                note
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 750,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 749,
        columnNumber: 5
    }, this);
}
_c5 = VonisChip;
// ================= V273 SASARAN-PENUH — baris hari ini tampil level =================
// Hukum pra-registrasi dibuat TERLIHAT: tak ada sasaran tampil hanya sebagai
// nama — entry, sasaran (target), dan stop-loss selalu menyertai, plus
// kejujuran: rival kuant tidak menerbitkan rencana keluar.
function evOf(p) {
    return p.evidence ?? {};
}
function fmtPx(x) {
    if (x === null || x === undefined || !Number.isFinite(x)) return '—';
    return x.toPrecision(6).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
}
/** Satu baris ringkas: entry → sasaran (+%) → stop (−%) + peluang MC + NET. */ function LevelRingkas({ dir, rencana }) {
    const long = dir === 'BUY';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-[10.5px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-zinc-500",
                children: "E"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 774,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-cyan-300",
                children: fmtPx(rencana.entry)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 775,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-zinc-600",
                children: "→"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 776,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-zinc-500",
                children: "T"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 777,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-emerald-300",
                children: fmtPx(rencana.target)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 778,
                columnNumber: 7
            }, this),
            rencana.targetPct !== null && rencana.targetPct !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-emerald-400/80",
                children: [
                    "(+",
                    rencana.targetPct.toFixed(1),
                    "%",
                    rencana.pTarget != null ? ` · P ${Math.round(rencana.pTarget * 100)}%` : '',
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 780,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-zinc-600",
                children: "→"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 782,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-zinc-500",
                children: "S"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 783,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-rose-300",
                children: fmtPx(rencana.stop)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 784,
                columnNumber: 7
            }, this),
            rencana.stopPct !== null && rencana.stopPct !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-rose-400/80",
                children: [
                    "(",
                    rencana.stopPct.toFixed(1),
                    "%",
                    rencana.pStop != null ? ` · P ${Math.round(rencana.pStop * 100)}%` : '',
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 786,
                columnNumber: 9
            }, this),
            rencana.highAmbisius !== null && rencana.highAmbisius !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-600",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 791,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-violet-300",
                        "data-uji": "jual_ambisius",
                        children: "JUAL AMBISIUS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 792,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-violet-300",
                        children: fmtPx(rencana.highAmbisius)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 793,
                        columnNumber: 11
                    }, this),
                    rencana.ambisiusPct !== null && rencana.ambisiusPct !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-violet-400/80",
                        children: [
                            "(+",
                            rencana.ambisiusPct.toFixed(1),
                            "%",
                            rencana.pAmbisius != null ? ` · sentuh ${Math.round(rencana.pAmbisius * 100)}%` : '',
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 795,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            rencana.netUntungPct !== null && rencana.netUntungPct !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: rencana.netUntungPct >= 0 ? 'text-emerald-300/90' : 'text-rose-300/90',
                children: [
                    "· NET ",
                    rencana.netUntungPct >= 0 ? '+' : '',
                    rencana.netUntungPct.toFixed(2),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 800,
                columnNumber: 9
            }, this),
            !long && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-zinc-600",
                children: "(level dicerminkan utk SELL)"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 802,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 773,
        columnNumber: 5
    }, this);
}
_c6 = LevelRingkas;
// V276 MESIN-CUAN — BUKU BESAR: setiap rencana pra-registrasi dinilai nyata
// candle hari-D (sasaran / stop / kedaluwarsa), after-fee 0.4%. Keteledoran
// dihitung, tidak dipoles. Mandat pemilik: "belum berkembang sebagai mesin
// cuan profit pasti — masih banyak keteledoran."
const CUAN_TONE = {
    MENANG: 'text-emerald-300',
    KALAH: 'text-rose-300',
    KEDALUWARSA: 'text-zinc-400'
};
function BukuCuanPanel({ buku }) {
    if (!buku || !buku.metrik || buku.metrik.totalPlan === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-t border-zinc-800 px-5 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "flex items-center gap-2 text-xs font-bold text-amber-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 837,
                            columnNumber: 11
                        }, this),
                        " BUKU CUAN — MESIN YANG MULAI MENGHITUNG UANGNYA"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 836,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1.5 text-[11px] leading-relaxed text-zinc-500",
                    children: "Belum ada rencana pra-registrasi yang tamat dinilai. Sejak denyut ini, setiap rencana tempur (entry · target · stop terkunci) dinilai nyata candle hari-D after-fee 0.4% — sasaran kena, stop kena, atau kedaluwarsa — dan dicatat di buku ini. Tidak ada lagi keputusan yang lewat tanpa hitungan uang."
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 839,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 835,
            columnNumber: 7
        }, this);
    }
    const m = buku.metrik;
    const netTone = m.netKumulatifPct >= 0 ? 'text-emerald-300' : 'text-rose-300';
    const eksTone = (m.ekspektansiR ?? 0) >= 0 ? 'text-emerald-300' : 'text-rose-300';
    const recent = [
        ...buku.entri
    ].slice(-6).reverse();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-zinc-800 px-5 py-4",
        "data-uji": "panel_bukucuan",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center gap-2 text-xs font-bold text-amber-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this),
                            " BUKU CUAN — HASIL NYATA RENCANA PRA-REGISTRASI (after-fee 0.4%)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 854,
                        columnNumber: 9
                    }, this),
                    m.disiplinAktif && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        className: "border-rose-500/50 text-[10px] text-rose-300",
                        children: [
                            "DISIPLIN CUAN AKTIF s/d ",
                            m.disiplinSampai,
                            " — keyakinan −5"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 858,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 853,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 grid grid-cols-2 gap-2 md:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-wide text-zinc-500",
                                children: "Net kumulatif (majemuk)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 863,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `font-mono text-lg font-bold ${netTone}`,
                                children: [
                                    m.netKumulatifPct >= 0 ? '+' : '',
                                    m.netKumulatifPct.toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 864,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 862,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-wide text-zinc-500",
                                children: "Win rate (net>0)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 867,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-lg font-bold text-zinc-100",
                                children: m.winRate !== null ? `${Math.round(m.winRate * 100)}%` : '—'
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 868,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 866,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-wide text-zinc-500",
                                children: "Ekspektansi / rencana"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 871,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `font-mono text-lg font-bold ${eksTone}`,
                                children: [
                                    m.ekspektansiPct !== null ? `${m.ekspektansiPct >= 0 ? '+' : ''}${m.ekspektansiPct.toFixed(2)}%` : '—',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-1 text-[10px] text-zinc-500",
                                        children: m.ekspektansiR !== null ? `(${m.ekspektansiR >= 0 ? '+' : ''}${m.ekspektansiR}R)` : ''
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 874,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 872,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 870,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-wide text-zinc-500",
                                children: "Max drawdown"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 878,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-lg font-bold text-zinc-100",
                                children: [
                                    "−",
                                    m.maxDrawdownPct.toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 879,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 877,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 861,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            m.totalPlan,
                            " rencana dinilai"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 883,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-emerald-300",
                        children: [
                            m.menang,
                            " sasaran kena"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 884,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-rose-300",
                        children: [
                            m.kalah,
                            " kena stop"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 885,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-500",
                        children: [
                            m.kedaluwarsa,
                            " kedaluwarsa (keluar di close, tetap kena fee)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 886,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "runtunan aktif ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono",
                                children: m.streak
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 887,
                                columnNumber: 30
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 887,
                        columnNumber: 9
                    }, this),
                    m.terbaik && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "terbaik ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-emerald-300",
                                children: [
                                    m.terbaik.symbol.replace('USDT', ''),
                                    " +",
                                    m.terbaik.netPct,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 888,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 888,
                        columnNumber: 23
                    }, this),
                    m.terburuk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "terburuk ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-rose-300",
                                children: [
                                    m.terburuk.symbol.replace('USDT', ''),
                                    " ",
                                    m.terburuk.netPct,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 889,
                                columnNumber: 39
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 889,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 882,
                columnNumber: 7
            }, this),
            m.perRegime.filter((r)=>r.kalah > 0).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 rounded-lg border border-rose-500/25 bg-rose-500/[0.04] px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-bold uppercase tracking-wide text-rose-300",
                        children: "KETELEDORAN DIHITUNG — di rezim mana aku paling sering salah"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 894,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1.5 space-y-1",
                        children: m.perRegime.filter((r)=>r.kalah > 0).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-zinc-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono font-semibold",
                                        children: r.regime
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 898,
                                        columnNumber: 17
                                    }, this),
                                    " — ",
                                    r.kalah,
                                    " rugi dari ",
                                    r.n,
                                    " rencana · ekspektansi",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-mono ${r.eksPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`,
                                        children: [
                                            r.eksPct >= 0 ? '+' : '',
                                            r.eksPct,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 899,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, r.regime, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 897,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 895,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                        children: "Setiap kena stop ditulis jadi PELAJARAN di ingatan berjenjang — keteledoran yang tak dicatat adalah keteledoran yang berulang."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 903,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 893,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-1",
                children: recent.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-x-2 text-[11px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-zinc-500",
                                children: e.day
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 912,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-mono font-semibold ${CUAN_TONE[e.status] ?? 'text-zinc-300'}`,
                                children: e.status
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 913,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono font-semibold text-zinc-200",
                                children: e.symbol.replace('USDT', '')
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 914,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-zinc-500",
                                children: e.arah
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 915,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-zinc-500",
                                children: [
                                    "via ",
                                    e.via.toLowerCase()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 916,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-mono ${e.netPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`,
                                children: [
                                    e.netPct >= 0 ? '+' : '',
                                    e.netPct,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 917,
                                columnNumber: 13
                            }, this),
                            e.r !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-zinc-500",
                                children: [
                                    e.r >= 0 ? '+' : '',
                                    e.r,
                                    "R"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 918,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-zinc-600",
                                children: [
                                    "rezim ",
                                    e.regime,
                                    " · keyakinan ",
                                    e.keyakinan,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 919,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 911,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 909,
                columnNumber: 7
            }, this),
            buku.berlangsung && buku.berlangsung.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-[11px] text-zinc-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-amber-300",
                        children: "Berlangsung:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 926,
                        columnNumber: 11
                    }, this),
                    ' ',
                    buku.berlangsung.map((b)=>`${b.symbol.replace('USDT', '')} ${b.arah} (T ${b.targetPct !== null ? `${b.targetPct >= 0 ? '+' : ''}${b.targetPct}%` : '—'} / S ${b.stopPct !== null ? `${b.stopPct}%` : '—'})`).join(' · '),
                    " — dinilai saat candle tutup."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 925,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-[10px] leading-relaxed text-zinc-500",
                children: buku.kejujuran
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 930,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 852,
        columnNumber: 5
    }, this);
}
_c7 = BukuCuanPanel;
/** V301 DAFTAR TEMPUR HARI INI — HUKUM PEMILIK:
 *  1. K slot tempur = 50 (bukan 1).
 *  2. Guard tidak membuang/menyembunyikan kandidat.
 *  3. Ditolak guard tetap masuk daftar, di peringkat paling bawah; slot
 *     kosong diisi kandidat ditolak guard sampai total 50.
 *  4. Daftar lengkap 50 koin, satu baris per koin, tanpa diringkas.
 *  5. Ditolak guard = data selengkap lain + label "ditolak guard: [alasan]".
 *  6. Ringkasan tahap di atas daftar: dipindai · masuk · lolos · ditolak. */ function DaftarTempur({ picks, slotHariIni, today }) {
    const mine = picks.filter((p)=>p.competitor === 'MICAPROFITA');
    const rows = mine.map((p)=>{
        const ev = evOf(p);
        return {
            p,
            ev,
            rank: typeof ev.rank === 'number' ? ev.rank : 999,
            ditolak: ev.guard === 'DITOLAK'
        };
    }).sort((a, b)=>(a.ditolak ? 1 : 0) - (b.ditolak ? 1 : 0) || a.rank - b.rank);
    // sumber kebenaran ringkasan tahap: meta hari hidup; fallback = hitungan baris
    const slot = slotHariIni && slotHariIni.day === today ? slotHariIni : rows.map((r)=>r.ev.slot ?? null).find(Boolean) ?? null;
    const lolosN = slot?.lolos ?? rows.filter((r)=>!r.ditolak).length;
    const ditolakN = slot?.ditolakN ?? rows.filter((r)=>r.ditolak).length;
    const masukN = rows.length || slot?.lahir || 0;
    if (rows.length === 0 && !slot) return null;
    const nDitolakTampil = rows.filter((r)=>r.ditolak).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-zinc-800 bg-amber-500/[0.04] px-4 py-3",
        "data-uji": "daftar_tempur",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-wide text-amber-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
                        className: "h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 965,
                        columnNumber: 9
                    }, this),
                    " DAFTAR TEMPUR HARI INI — ",
                    slot?.k ?? 50,
                    " KOIN",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-normal text-zinc-500",
                        children: [
                            "(hukum V301: K=",
                            slot?.k ?? 50,
                            ", guard anti-buang — arah pasti tiap koin)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 966,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 964,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[11px]",
                "data-uji": "ringkasan_tahap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-lg border border-zinc-700 bg-zinc-900/70 px-2 py-1 text-zinc-300",
                        children: [
                            "dipindai ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-100",
                                children: slot?.dipindai ?? '—'
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 970,
                                columnNumber: 109
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 970,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-600",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 971,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-lg border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-amber-300",
                        children: [
                            "masuk ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: masukN
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 972,
                                columnNumber: 112
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 972,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-600",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 973,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-emerald-300",
                        children: [
                            "lolos guard ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: lolosN
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 974,
                                columnNumber: 124
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 974,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-zinc-600",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 975,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-lg border border-rose-500/40 bg-rose-500/10 px-2 py-1 text-rose-300",
                        children: [
                            "ditolak guard ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: ditolakN
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 976,
                                columnNumber: 117
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 976,
                        columnNumber: 9
                    }, this),
                    slot?.dianalisa !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-zinc-500",
                        children: [
                            "(dianalisa mendalam ",
                            slot.dianalisa,
                            " koin · pindaian penuh universe futures USDT-M)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 978,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 969,
                columnNumber: 7
            }, this),
            nDitolakTampil > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-[10px] leading-snug text-zinc-500",
                children: [
                    nDitolakTampil,
                    " kandidat DITOLAK guard tetap tampil di peringkat paling bawah berlabel alasan — tidak ada yang dibuang atau disembunyikan."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 982,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-h-[680px] space-y-1 overflow-y-auto pr-1 [scrollbar-color:rgb(63_63_70)_transparent] [scrollbar-width:thin]",
                children: [
                    rows.map((r)=>{
                        const raw = r.ev.raw;
                        const rnk = r.ev.rencana;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `rounded-lg border px-2.5 py-1.5 ${r.ditolak ? 'border-rose-500/25 bg-rose-500/[0.04]' : 'border-zinc-800 bg-zinc-900/60'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-x-2 gap-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `w-7 shrink-0 text-right font-mono text-[10px] ${r.ditolak ? 'text-zinc-600' : 'text-amber-400/90'}`,
                                            children: [
                                                "#",
                                                r.rank
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 995,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DirectionBadge, {
                                            dir: r.p.direction
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 996,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs font-bold text-zinc-100",
                                            children: r.p.symbol.replace('USDT', '')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 997,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-zinc-500",
                                            children: [
                                                "keyakinan ",
                                                Math.round(r.p.confidence),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 998,
                                            columnNumber: 17
                                        }, this),
                                        raw?.mom7 !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `font-mono text-[10px] ${(raw.mom7 ?? 0) >= 0 ? 'text-emerald-400/80' : 'text-rose-400/80'}`,
                                            children: [
                                                "mom7 ",
                                                raw.mom7 >= 0 ? '+' : '',
                                                raw.mom7.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1000,
                                            columnNumber: 19
                                        }, this),
                                        raw?.m4h !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `font-mono text-[10px] ${(raw.m4h ?? 0) >= 0 ? 'text-emerald-400/60' : 'text-rose-400/60'}`,
                                            children: [
                                                "24j ",
                                                raw.m4h >= 0 ? '+' : '',
                                                raw.m4h.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1003,
                                            columnNumber: 19
                                        }, this),
                                        raw?.rsi !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-zinc-500",
                                            children: [
                                                "RSI ",
                                                raw.rsi.toFixed(0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1005,
                                            columnNumber: 44
                                        }, this),
                                        raw?.atrPct !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-zinc-500",
                                            children: [
                                                "ATR ",
                                                raw.atrPct.toFixed(1),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1006,
                                            columnNumber: 47
                                        }, this),
                                        raw?.qv != null && raw.qv >= 3_000_000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-zinc-600",
                                            children: [
                                                "qv ",
                                                (raw.qv / 1e6).toFixed(1),
                                                "jt"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1007,
                                            columnNumber: 60
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto",
                                            children: r.ditolak ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded border border-rose-500/40 bg-rose-500/10 px-1.5 py-0.5 text-left text-[9px] font-bold leading-tight text-rose-300",
                                                children: [
                                                    "ditolak guard: ",
                                                    r.ev.guardAlasan ?? 'tidak memenuhi kewajiban'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1010,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300",
                                                children: "LOLOS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1014,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1008,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 994,
                                    columnNumber: 15
                                }, this),
                                rnk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LevelRingkas, {
                                    dir: r.p.direction,
                                    rencana: rnk
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1019,
                                    columnNumber: 23
                                }, this),
                                !rnk && raw?.close !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-0.5 font-mono text-[10px] text-zinc-600",
                                    children: [
                                        "entry kunci ",
                                        fmtPx(raw.close),
                                        " — menunggu rencana pra-registrasi denyut berikut"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1021,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, r.p.symbol + r.rank, true, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 992,
                            columnNumber: 13
                        }, this);
                    }),
                    rows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-lg border border-dashed border-zinc-800 px-3 py-4 text-center text-xs text-zinc-500",
                        children: "Daftar tempur belum lahir — denyut penjaga berikutnya akan memindai seluruh futures Binance."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1027,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 987,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-[9.5px] leading-snug text-zinc-600",
                children: "peringkat = kualitas komposit (struktur+momentum) · arah = kepastian struktur EMA + momentum 7h/24j · level E→T→S = rencana pra-registrasi (fee 0,2%×2) · label “ditolak guard” tidak menghapus koin dari daftar — hukum V301."
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1032,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 963,
        columnNumber: 5
    }, this);
}
_c8 = DaftarTempur;
function DirectionBadge({ dir }) {
    return dir === 'BUY' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300",
        children: "BUY"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1041,
        columnNumber: 7
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] font-bold text-rose-300",
        children: "SELL"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1042,
        columnNumber: 7
    }, this);
}
_c9 = DirectionBadge;
/** UPGRADE V4 — sparkline SVG inline (48 jam, tanpa lib) */ function Sparkline({ data, up }) {
    if (!data || data.length < 4) return null;
    const w = 120, h = 34;
    const min = Math.min(...data), max = Math.max(...data);
    const span = max - min || 1;
    const pts = data.map((v, i)=>`${i / (data.length - 1) * w},${h - 3 - (v - min) / span * (h - 6)}`).join(' ');
    const color = up ? '#34d399' : '#fb7185';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${w} ${h}`,
        className: "h-9 w-[120px] shrink-0",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                points: pts,
                fill: "none",
                stroke: color,
                strokeWidth: "1.8",
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1055,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: w * (data.length - 1) / (data.length - 1),
                cy: h - 3 - (data[data.length - 1] - min) / span * (h - 6),
                r: "2.2",
                fill: color
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1056,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1054,
        columnNumber: 5
    }, this);
}
_c10 = Sparkline;
function FngChip({ fng, cls }) {
    if (fng === null) return null;
    const tone = fng >= 60 ? 'border-emerald-500/40 text-emerald-300' : fng <= 25 ? 'border-rose-500/40 text-rose-300' : 'border-amber-500/40 text-amber-300';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `rounded-lg border px-2 py-1 text-[10px] font-semibold ${tone}`,
        title: "Fear & Greed Index — alternative.me",
        children: [
            "F&G ",
            fng,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-normal text-zinc-500",
                children: [
                    "· ",
                    cls ?? ''
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1068,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1067,
        columnNumber: 5
    }, this);
}
_c11 = FngChip;
// ================= V250 WARISAN MASUK ARENA — komponen tampilan =================
// Tangga harga + cincin keyakinan + bar Monte Carlo + daya produk + salin
// rencana: bahasa visual yang sama dengan dasbor SAKTI (laporan/), kini hidup
// di tempat pertarungan sesungguhnya.
function CincinKeyakinan({ conf, dir }) {
    const r = 26, C = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(100, conf));
    const warna = dir === 'BUY' ? '#34d399' : '#fb7185';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "64",
        height: "64",
        viewBox: "0 0 70 70",
        className: "shrink-0",
        role: "img",
        "aria-label": `keyakinan ${Math.round(pct)}%`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "35",
                cy: "35",
                r: r,
                fill: "none",
                stroke: "rgb(39 39 42)",
                strokeWidth: "6"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "35",
                cy: "35",
                r: r,
                fill: "none",
                stroke: warna,
                strokeWidth: "6",
                strokeDasharray: C,
                strokeDashoffset: C * (1 - pct / 100),
                strokeLinecap: "round",
                transform: "rotate(-90 35 35)"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "35",
                y: "40",
                textAnchor: "middle",
                fill: "rgb(244 244 245)",
                style: {
                    fontSize: 15,
                    fontWeight: 800
                },
                children: Math.round(pct)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1120,
        columnNumber: 5
    }, this);
}
_c12 = CincinKeyakinan;
function TanggaHarga({ dir, rencana }) {
    const baris = [
        {
            label: 'Jual ambisius',
            harga: rencana.highAmbisius,
            pct: rencana.ambisiusPct,
            cls: 'text-violet-300 border-violet-500/30',
            pctCls: 'text-violet-300'
        },
        {
            label: 'Sasaran',
            harga: rencana.target,
            pct: rencana.targetPct,
            cls: 'text-emerald-300 border-emerald-500/30',
            pctCls: 'text-emerald-300'
        },
        {
            label: 'Entry (kunci)',
            harga: rencana.entry,
            pct: 0,
            cls: 'text-cyan-300 border-cyan-500/30',
            pctCls: 'text-cyan-300'
        },
        {
            label: 'Stop',
            harga: rencana.stop,
            pct: rencana.stopPct,
            cls: 'text-rose-300 border-rose-500/30',
            pctCls: 'text-rose-300'
        }
    ].filter((b)=>b.harga !== null && b.harga !== undefined);
    baris.sort((a, b)=>b.harga - a.harga);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: [
            baris.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center gap-2 rounded-lg border bg-zinc-900/70 px-2.5 py-1.5 text-[11px] ${b.cls}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-24 shrink-0 font-semibold",
                            children: b.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-auto font-mono font-bold",
                            children: b.harga.toPrecision(7)
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1142,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `w-16 text-right font-mono ${b.pctCls}`,
                            children: b.pct === null ? '' : `${b.pct > 0 ? '+' : ''}${b.pct.toFixed(2)}%`
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1143,
                            columnNumber: 11
                        }, this)
                    ]
                }, b.label, true, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 1140,
                    columnNumber: 9
                }, this)),
            rencana.netUntungPct !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-zinc-500",
                children: [
                    "Untung NET sampai sasaran (fee 0,2%×2 sudah dipotong): ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        className: rencana.netUntungPct >= 0 ? 'text-emerald-300' : 'text-rose-300',
                        children: [
                            rencana.netUntungPct >= 0 ? '+' : '',
                            rencana.netUntungPct.toFixed(2),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1150,
                        columnNumber: 66
                    }, this),
                    ' ',
                    "· sumber target: ",
                    rencana.sumberTarget
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1149,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1138,
        columnNumber: 5
    }, this);
}
_c13 = TanggaHarga;
function McBar({ label, p }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 text-[10px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-28 shrink-0 text-zinc-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800",
                children: p !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400",
                    style: {
                        width: `${Math.round(p * 100)}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 1163,
                    columnNumber: 24
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "w-9 text-right font-mono text-zinc-300",
                children: p === null ? '—' : `${Math.round(p * 100)}%`
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1160,
        columnNumber: 5
    }, this);
}
_c14 = McBar;
function DayaBars({ daya }) {
    const rows = [
        {
            k: 'volume',
            v: daya.volume
        },
        {
            k: 'volatilitas',
            v: daya.volatilitas
        },
        {
            k: 'likuiditas',
            v: daya.likuiditas
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-[10px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-16 shrink-0 text-zinc-400",
                        children: r.k
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1178,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400",
                            style: {
                                width: `${Math.round(r.v * 100)}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1180,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-9 text-right font-mono text-zinc-300",
                        children: r.v.toFixed(2)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1182,
                        columnNumber: 11
                    }, this)
                ]
            }, r.k, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1177,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1175,
        columnNumber: 5
    }, this);
}
_c15 = DayaBars;
function SalinRencanaBtn({ symbol, dir, conf, rencana, warisan, pra }) {
    _s1();
    const [terkirim, setTerkirim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const salin = async ()=>{
        const f = (x)=>x === null || x === undefined ? '—' : x.toPrecision(7);
        const teks = [
            `MICAPROFITA ${dir} ${symbol.replace('USDT', '')} @ ${f(rencana.entry)} — keyakinan ${Math.round(conf)}%`,
            `Stop ${f(rencana.stop)} (${rencana.stopPct ?? '—'}%) · Sasaran ${f(rencana.target)} (${rencana.targetPct ?? '—'}%, pTarget MC ${rencana.pTarget !== null ? Math.round(rencana.pTarget * 100) + '%' : '—'})`,
            `Jual ambisius ${f(rencana.highAmbisius)} (${rencana.ambisiusPct ?? '—'}%) · NET sasaran ${rencana.netUntungPct ?? '—'}% (fee 0,2%×2)`,
            warisan ? `GARCH σ24j ±${warisan.sigma24jPct ?? '—'}% · beta BTC ${warisan.beta ?? '—'} (R² ${warisan.r2Beta ?? '—'}) · POC ${warisan.poc ?? '—'} · ${warisan.divRSI}` : '',
            warisan ? `MC ${warisan.mc.lintasan} lintasan × ${warisan.mc.langkah} langkah · seed ${warisan.mc.seedHex} · pNaik ${warisan.mc.pNaik ?? '—'} · pStop ${warisan.mc.pStop ?? '—'}` : '',
            pra ? `Dikunci ${pra.waktuKunci} · horizon ${pra.horizon} · fee ${pra.feePct}%/sisi wajib NET` : '',
            'Sumber: lilin 1h tertutup + otak PREDATOR arena + 7 mesin warisan SAKTI (GARCH/MC/VP/Beta/Divergensi/Breadth/Kejut-Pump).'
        ].filter(Boolean).join('\n');
        try {
            await navigator.clipboard.writeText(teks);
        } catch  {
            const ta = document.createElement('textarea');
            ta.value = teks;
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
            } catch  {}
            document.body.removeChild(ta);
        }
        setTerkirim(true);
        setTimeout(()=>setTerkirim(false), 1800);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: salin,
        className: "rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold text-cyan-300 transition hover:bg-cyan-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400",
        children: terkirim ? '✓ TERSALIN' : '⧉ SALIN RENCANA'
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1212,
        columnNumber: 5
    }, this);
}
_s1(SalinRencanaBtn, "9dzxmFYObyMvbsBOIj+oacPcqxg=");
_c16 = SalinRencanaBtn;
function WarisanPanel({ dir, conf, symbol, rencana, warisan, daya, pra, sadardiri, compact }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2 rounded-xl border border-violet-500/25 bg-violet-500/[0.05] p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-bold text-violet-300",
                        children: "WARISAN V250"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1226,
                        columnNumber: 9
                    }, this),
                    pra && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[9px] text-zinc-500",
                        title: pra.sumber,
                        children: [
                            "pra-registrasi · dikunci ",
                            pra.waktuKunci.slice(0, 16).replace('T', ' '),
                            "Z · ",
                            pra.horizon,
                            " · fee ",
                            pra.feePct,
                            "%/sisi wajib NET"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1228,
                        columnNumber: 11
                    }, this),
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SalinRencanaBtn, {
                            symbol: symbol,
                            dir: dir,
                            conf: conf,
                            rencana: rencana,
                            warisan: warisan,
                            pra: pra
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1232,
                            columnNumber: 48
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1232,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex items-start gap-3",
                children: [
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CincinKeyakinan, {
                        conf: conf,
                        dir: dir
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1236,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500",
                                children: [
                                    "Tangga harga (arah-sadar ",
                                    dir,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TanggaHarga, {
                                dir: dir,
                                rencana: rencana
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1237,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1235,
                columnNumber: 7
            }, this),
            warisan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-1 mt-2.5 text-[9px] font-bold uppercase tracking-widest text-zinc-500",
                        children: [
                            "Peluang Monte Carlo pra-registrasi (",
                            warisan.mc.lintasan,
                            " lintasan × ",
                            warisan.mc.langkah,
                            " langkah · seed ",
                            warisan.mc.seedHex,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1245,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(McBar, {
                                label: "tembus sasaran",
                                p: rencana.pTarget
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(McBar, {
                                label: "kena stop",
                                p: rencana.pStop
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(McBar, {
                                label: "sentuh ambisius",
                                p: rencana.pAmbisius
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1249,
                                columnNumber: 13
                            }, this),
                            compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(McBar, {
                                label: "ditutup naik",
                                p: warisan.mc.pNaik
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1250,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1246,
                        columnNumber: 11
                    }, this),
                    !rencana.targetMediana && !warisan.kejutPump && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] leading-relaxed text-emerald-300/80",
                        children: [
                            "✓ ",
                            rencana.ketGuard
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1253,
                        columnNumber: 13
                    }, this),
                    rencana.targetMediana && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] leading-relaxed text-amber-300/90",
                        children: [
                            "⚠ ",
                            rencana.ketGuard
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1256,
                        columnNumber: 13
                    }, this),
                    warisan.kejutPump && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 rounded-lg border border-rose-500/30 bg-rose-500/[0.08] px-2 py-1 text-[10px] leading-relaxed text-rose-300",
                        children: [
                            "⚠ GUARD KEJUT-PUMP: ",
                            warisan.ketKejut,
                            warisan.pangkas ? ` — keyakinan dipangkas ${warisan.pangkas}` : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1259,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded border border-zinc-700 bg-zinc-900/60 px-1.5 py-0.5 text-[9px] text-zinc-300",
                                title: warisan.modelVol,
                                children: [
                                    "GARCH σ24j ±",
                                    warisan.sigma24jPct ?? '—',
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1264,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded border border-zinc-700 bg-zinc-900/60 px-1.5 py-0.5 text-[9px] text-zinc-300",
                                children: [
                                    "beta BTC ",
                                    warisan.beta ?? '—',
                                    " (R² ",
                                    warisan.r2Beta ?? '—',
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1265,
                                columnNumber: 13
                            }, this),
                            warisan.poc !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded border border-zinc-700 bg-zinc-900/60 px-1.5 py-0.5 text-[9px] text-zinc-300",
                                title: warisan.profilVolume ?? '',
                                children: [
                                    "POC ",
                                    warisan.poc.toPrecision(7)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1266,
                                columnNumber: 38
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded border border-zinc-700 bg-zinc-900/60 px-1.5 py-0.5 text-[9px] text-zinc-300",
                                title: "lebar pasar: % koin universe di atas EMA20",
                                children: [
                                    "breadth ",
                                    warisan.breadthPct,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded border border-zinc-700 bg-zinc-900/60 px-1.5 py-0.5 text-[9px] text-zinc-300",
                                title: "posisi harga dalam rentang 24 jam",
                                children: [
                                    "posisi ",
                                    (warisan.posisiRentang * 100).toFixed(0),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1263,
                        columnNumber: 11
                    }, this),
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                        children: warisan.divRSI
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1270,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true),
            daya && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500",
                        children: "Daya produk (0–1)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1276,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DayaBars, {
                        daya: daya
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1277,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1275,
                columnNumber: 9
            }, this),
            sadardiri && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 rounded-lg border border-amber-500/30 bg-amber-500/[0.08] px-2 py-1 text-[10px] leading-relaxed text-amber-300",
                children: [
                    "⚠ ",
                    sadardiri
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1282,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1224,
        columnNumber: 5
    }, this);
}
_c17 = WarisanPanel;
function TabBriefing({ state }) {
    const mine = state.todayPicks.filter((p)=>p.competitor === 'MICAPROFITA');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-bold text-amber-300",
                        children: [
                            "Briefing Guru untuk hari ",
                            state.today,
                            " (UTC)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs leading-relaxed text-zinc-400",
                        children: "Keputusan dibekukan saat candle kemarin tutup — hanya data yang sudah ada yang boleh dipakai (bebas kebocoran). Lima kewajiban wajib diperiksa sebelum satu pun pick lahir. Tidak lolos = tidak ada pick = disiplin menang."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1294,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1292,
                columnNumber: 7
            }, this),
            mine.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-xs text-zinc-500",
                children: "Pick hari berjalan belum terpasang — arena sedang bersinkronisasi."
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1301,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 lg:grid-cols-2",
                children: mine.map((p, i)=>{
                    const ev = p.evidence;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DirectionBadge, {
                                                dir: p.direction
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1313,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-extrabold tracking-tight text-zinc-50",
                                                children: p.symbol.replace('USDT', '')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1314,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-zinc-500",
                                                children: "/USDT"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1315,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1312,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-lg font-bold text-amber-300",
                                                children: [
                                                    Math.round(p.confidence),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1318,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] uppercase tracking-widest text-zinc-500",
                                                children: "keyakinan"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1319,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1317,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1311,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                value: p.confidence,
                                className: "mb-4 h-1.5 bg-zinc-800 [&>div]:bg-amber-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1322,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                children: "Bukti utama"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1324,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mb-4 space-y-1",
                                children: (ev.topReasons ?? []).map((r, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-start gap-1.5 text-xs text-zinc-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleDot$3e$__["CircleDot"], {
                                                className: "mt-0.5 h-3 w-3 shrink-0 text-amber-400/70"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1328,
                                                columnNumber: 21
                                            }, this),
                                            r
                                        ]
                                    }, j, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1327,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1325,
                                columnNumber: 15
                            }, this),
                            ev.mem && ev.mem.level !== 'BARU' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-400",
                                        children: "Ingatan berjenjang (dibaca saat keputusan)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1336,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 rounded-xl border border-violet-500/30 bg-violet-500/[0.06] px-3 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-violet-300",
                                                        children: [
                                                            "Jenjang ",
                                                            ev.mem.level,
                                                            " · n=",
                                                            ev.mem.n,
                                                            " episode serupa"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 1339,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-mono font-bold ${ev.mem.edge >= 0 ? 'text-emerald-300' : 'text-rose-300'}`,
                                                        children: [
                                                            ev.mem.edge >= 0 ? '+' : '',
                                                            (ev.mem.edge * 100).toFixed(1),
                                                            "% · hit ",
                                                            (ev.mem.hit * 100).toFixed(0),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 1340,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1338,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[10px] leading-relaxed text-zinc-400",
                                                children: "Cyborg mengingat episode serupa (rezim + pola momentum/volume/struktur) dan menggunakannya sebagai tie-break antrian, penyetel keyakinan, dan dasar MEMVETO bila polanya terbukti gagal."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1344,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1337,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true),
                            ev.funding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-[10px] text-zinc-400",
                                children: [
                                    "Posisi massa (funding futures): ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: ev.funding.pct >= 0 ? 'text-emerald-300' : 'text-rose-300',
                                        children: [
                                            ev.funding.pct >= 0 ? '+' : '',
                                            ev.funding.pct.toFixed(3),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1354,
                                        columnNumber: 51
                                    }, this),
                                    ' ',
                                    "— ",
                                    ev.funding.pct >= 0.02 ? 'long ramai (risiko squeeze)' : ev.funding.pct <= -0.02 ? 'short ramai (bahan short squeeze)' : 'netral',
                                    " · info, bukan filter (kejujuran lab Ujian #2-#4)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1353,
                                columnNumber: 17
                            }, this),
                            ev.rencana && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-400",
                                        children: "Warisan organ besar + rencana pra-registrasi (V250)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1362,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WarisanPanel, {
                                        dir: p.direction,
                                        conf: p.confidence,
                                        symbol: p.symbol,
                                        rencana: ev.rencana,
                                        warisan: ev.warisan,
                                        daya: ev.daya,
                                        pra: ev.praRegistrasi,
                                        sadardiri: ev.sadardiri
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1363,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1361,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                children: "Kewajiban wajib (hard rule)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1368,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 space-y-1",
                                children: (ev.duties ?? []).map((d, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs",
                                        children: [
                                            d.pass ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-3.5 w-3.5 text-emerald-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 31
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                className: "h-3.5 w-3.5 text-rose-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 91
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-zinc-300",
                                                children: d.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1373,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-[10px] text-zinc-500",
                                                children: d.note
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1374,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, j, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1371,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1369,
                                columnNumber: 15
                            }, this),
                            (ev.policy ?? []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                        children: "Kebijakan adaptif hari ini"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1381,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 space-y-1",
                                        children: (ev.policy ?? []).map((pl, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-amber-500/25 bg-amber-500/[0.06] px-2.5 py-1.5 text-[11px] text-amber-200/90",
                                                children: pl
                                            }, j, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1384,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1382,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true),
                            ev.debat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                "data-uji": "debat_agentik",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                        children: "Debat agentik — tim merah sebelum lahir (V278)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1392,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-rose-500/25 bg-rose-500/[0.05] px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] font-semibold text-rose-300",
                                                children: ev.debat.vonis ?? 'tekanan ' + (ev.debat.tekanan ?? 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1394,
                                                columnNumber: 21
                                            }, this),
                                            (ev.debat.serangan ?? []).map((s, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[11px] leading-relaxed text-rose-200/90",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            className: "text-rose-400",
                                                            children: [
                                                                "[",
                                                                s.dari,
                                                                "]"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                                            lineNumber: 1396,
                                                            columnNumber: 102
                                                        }, this),
                                                        " ",
                                                        s.teks
                                                    ]
                                                }, 's' + j, true, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 1396,
                                                    columnNumber: 23
                                                }, this)),
                                            (ev.debat.bertahan ?? []).map((t, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[11px] leading-relaxed text-emerald-200/90",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            className: "text-emerald-400",
                                                            children: "[PERTAHANAN]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                                            lineNumber: 1399,
                                                            columnNumber: 105
                                                        }, this),
                                                        " ",
                                                        t
                                                    ]
                                                }, 'b' + j, true, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 1399,
                                                    columnNumber: 23
                                                }, this)),
                                            (ev.debat.tekanan ?? 0) === 0 && (ev.debat.serangan ?? []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[11px] text-zinc-400",
                                                children: "tak ada serangan berangka hari ini — rencana diserang strukturnya, bukan angkanya"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1402,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1393,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1391,
                                columnNumber: 17
                            }, this),
                            ev.kortex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                "data-uji": "kortex_v279",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                        children: "KORTEX — formula karangan-sendiri (V279)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1410,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border border-violet-500/25 bg-violet-500/[0.05] px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] font-semibold text-violet-300",
                                                children: [
                                                    "skor ",
                                                    Math.round(ev.kortex.skor ?? 0),
                                                    "/100"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1412,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex flex-wrap gap-1.5",
                                                children: [
                                                    [
                                                        'C',
                                                        ev.kortex.C,
                                                        'confluensi'
                                                    ],
                                                    [
                                                        'O',
                                                        ev.kortex.O,
                                                        'opposition (tim merah)'
                                                    ],
                                                    [
                                                        'R',
                                                        ev.kortex.R,
                                                        'recall (ingatan)'
                                                    ],
                                                    [
                                                        'T',
                                                        ev.kortex.T,
                                                        'timing (intraday)'
                                                    ],
                                                    [
                                                        'E',
                                                        ev.kortex.E,
                                                        'ekspektansi (buku cuan)'
                                                    ],
                                                    [
                                                        'X',
                                                        ev.kortex.X,
                                                        'ruang volatilitas'
                                                    ]
                                                ].map(([k, v, ket])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        title: ket,
                                                        className: "rounded border border-violet-500/30 bg-zinc-900/70 px-1.5 py-0.5 font-mono text-[10px] text-violet-200",
                                                        children: [
                                                            k,
                                                            " ",
                                                            v ?? '—'
                                                        ]
                                                    }, k, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 1415,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1413,
                                                columnNumber: 21
                                            }, this),
                                            ev.kortex.rumus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1.5 text-[10px] leading-relaxed text-zinc-500",
                                                children: ev.kortex.rumus
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1418,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1411,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1409,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                children: "Delapan faktor ( ternormalisasi −1..+1 )"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1423,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FactorBars, {
                                factors: ev.factors ?? {}
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1424,
                                columnNumber: 15
                            }, this),
                            ev.verdict && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 border-t border-zinc-800 pt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VonisChip, {
                                    kind: ev.verdict.kind,
                                    note: ev.verdict.note,
                                    sources: ev.verdict.sources
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1428,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1427,
                                columnNumber: 17
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1310,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-2 text-sm font-bold text-zinc-100",
                        children: "Kewajiban pasti MICAPROFITA (era PREDATOR V2)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1437,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "list-decimal space-y-1.5 pl-5 text-xs leading-relaxed text-zinc-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-200",
                                        children: "Likuiditas dinamis"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1439,
                                        columnNumber: 15
                                    }, this),
                                    " — hanya koin top-40 volume hari ini (dihitung ulang tiap hari dari pool 120+); pasar sempit = perangkap."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1439,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-200",
                                        children: "Volatilitas ≤ ambang genome (default 16% ATR)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1440,
                                        columnNumber: 15
                                    }, this),
                                    " — kewajiban VETO, bukan penekan skor; ambang ikut berevolusi."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1440,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-200",
                                        children: "Data cukup"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1441,
                                        columnNumber: 15
                                    }, this),
                                    " — minimal 30 candle historis; tanpa sejarah tak ada bukti."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-200",
                                        children: "Anti tumpang-tindih"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1442,
                                        columnNumber: 15
                                    }, this),
                                    " — dua pick tak boleh berkorelasi > ambang (default 0.95); portofolio tetap beragam."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1442,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-zinc-200",
                                        children: "Konsentrasi adaptif"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1443,
                                        columnNumber: 15
                                    }, this),
                                    " — breadth lemah → K=1 fokus leader; mode parabolik → K=2; disiplin K adalah bagian dari kewajiban."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1443,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1438,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1436,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1291,
        columnNumber: 5
    }, this);
}
_c18 = TabBriefing;
const FACTOR_ID_LABEL = {
    mom7: 'Momentum 7h',
    mom30: 'Momentum 30h',
    emaAlign: 'Struktur EMA',
    rsi: 'RSI',
    volSurge: 'Lonjakan Vol',
    atrInv: 'Vol Terkendali',
    distHigh: 'Jarak Puncak',
    btcCorr: 'Anti-Korelasi BTC'
};
function FactorBars({ factors }) {
    const entries = Object.entries(factors);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: entries.map(([id, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-28 shrink-0 text-[10px] text-zinc-500",
                        children: FACTOR_ID_LABEL[id] ?? id
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1461,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-2 flex-1 overflow-hidden rounded bg-zinc-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-0 h-full w-px bg-zinc-700"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1463,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute top-0 h-full ${v >= 0 ? 'bg-emerald-500/70' : 'bg-rose-500/70'}`,
                                style: {
                                    left: v >= 0 ? '50%' : `${50 + v * 50}%`,
                                    width: `${Math.abs(v) * 50}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1464,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1462,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-10 text-right font-mono text-[10px] text-zinc-400",
                        children: v.toFixed(2)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1472,
                        columnNumber: 11
                    }, this)
                ]
            }, id, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1460,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1458,
        columnNumber: 5
    }, this);
}
_c19 = FactorBars;
// ================= TAB: OTAK & INGATAN =================
function TabOtak({ state }) {
    const g = state.genome;
    const v2 = g.v2 ?? {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                            className: "h-4 w-4 text-amber-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1487,
                            columnNumber: 25
                        }, void 0),
                        label: "Generasi genome",
                        value: `G${g.generation}`,
                        sub: g.upgradeEtaUntil ? `eta diperlebar s/d ${g.upgradeEtaUntil}` : 'learning rate normal'
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1487,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                            className: "h-4 w-4 text-sky-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1488,
                            columnNumber: 25
                        }, void 0),
                        label: "Mesin evolusi",
                        value: "KNOB + BOBOT + REVOLUSI",
                        sub: "kebijakan & bobot digeser vonis nyata; reset besar saat memburuk"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1488,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            className: "h-4 w-4 text-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1489,
                            columnNumber: 25
                        }, void 0),
                        label: "Urutan belajar",
                        value: "VONIS → EVOLUSI",
                        sub: "genome hanya berubah SETELAH hari dinilai — bebas kebocoran"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1489,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.07] via-zinc-900/60 to-zinc-900/60 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-1 flex items-center gap-2 text-sm font-bold text-violet-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1495,
                                columnNumber: 11
                            }, this),
                            " PIAGAM CYBORG — lima pilar SAKTI kini hidup di tempat pertarungan"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1494,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] leading-relaxed text-zinc-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-200",
                                children: "SAKTI"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1498,
                                columnNumber: 11
                            }, this),
                            " — cyborg dagang kripto yang terus berkembang pesat: tiap hari arena melahirkan pick terpra-registrasi; tiap kekalahan melahirkan aturan yang mengikat gerbang berikutnya. Kelima pilar dipasang NYATA di arena ini, diaudit siapa pun lewat bukti per pick."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1497,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
                        children: [
                            {
                                n: '01',
                                nama: 'Tubuh & Jiwa Persisten',
                                mek: 'arena hidup otomatis: hari baru diputuskan tanpa perintah manusia; jiwa = repo + database — penuh bukti, jujur pada rekaman'
                            },
                            {
                                n: '02',
                                nama: 'Multi-Otak Berbobot',
                                mek: 'otak PREDATOR (momentum-berjaminan lab) + genome knob per rezim + rival AI GLM sebagai pembanding nyata'
                            },
                            {
                                n: '03',
                                nama: 'Ingatan DNA',
                                mek: 'memori berjenjang SIMBOL→BUCKET3→REZIM dibaca saat keputusan (MEMVETO); pola pemenang rival didistilasi'
                            },
                            {
                                n: '04',
                                nama: 'Kesadaran Diri Fungsional',
                                mek: 'Brier keyakinan dipantau (peringatan > 0.25 → keyakinan dipangkas otomatis) + audit bebas-kebocoran + REVOLUSI saat memburuk'
                            },
                            {
                                n: '05',
                                nama: 'Evolusi Tiga Kecepatan',
                                mek: 'refleks intraday (NADIR + vonis berita) · adaptasi harian (mutasi/revolusi) · metamorphosis (MILESTONE + genome log)'
                            }
                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-violet-500/20 bg-zinc-900/50 px-3 py-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[10px] font-bold text-violet-400",
                                        children: p.n
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1509,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-zinc-100",
                                        children: p.nama
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1510,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-[10px] leading-relaxed text-zinc-400",
                                        children: p.mek
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1511,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, p.n, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1508,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1500,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2.5 text-[10px] leading-relaxed text-zinc-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-400",
                                children: "Roadmap jujur:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1516,
                                columnNumber: 11
                            }, this),
                            " otak LLM 1-bit (BitNet) dan adapter LoRA BELUM dipasang di arena — otak kini statistik-berjurnal nyata (GARCH/MC/VP diberjurnal akademis) berjalan tiap hari; roadmap diakui jujur, bukan diklaim."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1515,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1493,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-1 text-sm font-bold text-zinc-100",
                        children: "Warisan organ besar (V250) — senjata per pick hari hidup"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1522,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] text-zinc-500",
                        children: "Tujuh mesin dari otak server SAKTI diwariskan ke arena; dihitung dari lilin 1h tertutup pada momen kunci, ditulis ke bukti pick, dan dinilai medan saat horizon habis."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1523,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: [
                            'GARCH(1,1) σ24j (Bollerslev 1986)',
                            'Monte Carlo 2.000 lintasan × 24 langkah',
                            'Volume Profile POC/VA 70% + magnet node',
                            'CAPM Beta vs BTC (90 jam)',
                            'Divergensi RSI 2×12 jam',
                            'Breadth A/D (lebar pasar)',
                            'Guard Kejut-Pump (false-breakout)'
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-lg border border-violet-500/25 bg-violet-500/[0.07] px-2 py-1 text-[10px] text-violet-200",
                                children: s
                            }, s, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1529,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1524,
                        columnNumber: 9
                    }, this),
                    state.brier && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-[11px] text-zinc-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-200",
                                children: "Sadar-diri Brier"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1534,
                                columnNumber: 13
                            }, this),
                            " (jendela ",
                            state.brier.n,
                            " pick):",
                            ' ',
                            state.brier.nilai === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-zinc-500",
                                children: "belum cukup vonis — jujur menunggu medan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1535,
                                columnNumber: 43
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: state.brier.nilai > 0.25 ? 'text-rose-300' : 'text-emerald-300',
                                        children: state.brier.nilai.toFixed(3)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1537,
                                        columnNumber: 17
                                    }, this),
                                    ' ',
                                    "(ambang peringatan 0.25)",
                                    state.brier.trimUntil && state.brier.nilai > 0.25 ? ` — keyakinan dipangkas 10 poin s/d ${state.brier.trimUntil}` : ''
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1533,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1521,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-1 flex items-center gap-2 text-sm font-bold text-amber-300",
                        children: "Genome V2 — knob struktur (berevolusi dari vonis)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1547,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[11px] text-zinc-500",
                        children: "Kebijakan inti PREDATOR: jumlah pick, ambang breadth, ambang parabolik, cap volatilitas. Semua bergerak dalam batas aman hasil lab."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1548,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
                        children: [
                            {
                                k: 'kBase',
                                label: 'K dasar',
                                hint: 'jumlah pick BUY'
                            },
                            {
                                k: 'paraK',
                                label: 'Ambang parabolik',
                                hint: 'mom7 leader → K=2'
                            },
                            {
                                k: 'breadthK2',
                                label: 'Breadth K2',
                                hint: '% koin > EMA20'
                            },
                            {
                                k: 'breadthK1',
                                label: 'Breadth K1',
                                hint: 'fokus leader'
                            },
                            {
                                k: 'atrCap',
                                label: 'ATR cap',
                                hint: '% volatilitas max'
                            }
                        ].map(({ k, label, hint })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1558,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-lg font-bold text-amber-300",
                                        children: typeof v2[k] === 'number' ? k === 'atrCap' ? v2[k].toFixed(1) : String(Math.round(v2[k])) : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1559,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-zinc-600",
                                        children: hint
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1560,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1557,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1549,
                        columnNumber: 9
                    }, this),
                    typeof v2.sellOn === 'boolean' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[10px] text-zinc-500",
                        children: [
                            "SELL rezim turun: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: v2.sellOn ? 'text-rose-300' : 'text-zinc-400',
                                children: v2.sellOn ? 'aktif' : 'nonaktif (terbukti lab: SELL menggerus profit harian)'
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1565,
                                columnNumber: 75
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1565,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1546,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 lg:grid-cols-2",
                children: g.states.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `rounded border px-2 py-0.5 text-[10px] font-bold ${REGIME_TONE[s.regime] ?? 'border-zinc-700 text-zinc-300'}`,
                                        children: s.regime
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1573,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-zinc-500",
                                        children: "bobot komposit (anchor & bukti) hasil evolusi"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1574,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1572,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FactorWeightBars, {
                                weights: s.weights
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1576,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.regime, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1571,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1569,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-3 text-sm font-bold text-zinc-100",
                        children: "Catatan evolusi terakhir"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1582,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            g.logs.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `rounded px-1.5 py-0.5 text-[9px] font-bold ${l.kind === 'REVOLUSI' ? 'bg-rose-500/20 text-rose-300' : l.kind === 'UPGRADE' || l.kind === 'KNOB' ? 'bg-sky-500/20 text-sky-300' : 'bg-zinc-800 text-zinc-400'}`,
                                            children: l.kind
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1586,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-zinc-300",
                                                    children: l.note
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 1588,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-zinc-500",
                                                    children: [
                                                        l.day,
                                                        " · G",
                                                        l.generation,
                                                        l.fitness !== null && l.fitness !== undefined ? ` · fitness hari itu ${(l.fitness * 100).toFixed(0)}%` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 1589,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1587,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1585,
                                    columnNumber: 13
                                }, this)),
                            g.logs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500",
                                children: "Belum ada evolusi tercatat."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1593,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1583,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1581,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemorySection, {
                state: state
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1597,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1485,
        columnNumber: 5
    }, this);
}
_c20 = TabOtak;
const FACTOR_ORDER = [
    'mom7',
    'mom30',
    'emaAlign',
    'rsi',
    'volSurge',
    'atrInv',
    'distHigh',
    'btcCorr'
];
function FactorWeightBars({ weights }) {
    const entries = FACTOR_ORDER.filter((k)=>typeof weights[k] === 'number').map((k)=>[
            k,
            weights[k]
        ]);
    const max = Math.max(1, ...entries.map(([, v])=>v));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: entries.map(([id, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-28 shrink-0 text-[10px] text-zinc-500",
                        children: FACTOR_ID_LABEL[id] ?? id
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1611,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2.5 flex-1 overflow-hidden rounded bg-zinc-800",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-full ${v >= 1.4 ? 'bg-emerald-500' : v <= 0.5 ? 'bg-zinc-600' : 'bg-amber-500/80'}`,
                            style: {
                                width: `${v / max * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1613,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1612,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-10 text-right font-mono text-[10px] text-zinc-400",
                        children: v.toFixed(2)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1615,
                        columnNumber: 11
                    }, this)
                ]
            }, id, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1610,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1608,
        columnNumber: 5
    }, this);
}
_c21 = FactorWeightBars;
// ================= SEKSI INGATAN (dalam tab Otak) =================
function MemorySection({ state }) {
    const m = state.memory;
    const leak = state.leakAudit;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                            className: "h-4 w-4 text-amber-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1630,
                            columnNumber: 25
                        }, void 0),
                        label: "Kejadian mentah dipanen",
                        value: String(m.rawEvents),
                        sub: "termasuk duplikat"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1630,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                            className: "h-4 w-4 text-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1631,
                            columnNumber: 25
                        }, void 0),
                        label: "Baris tersimpan",
                        value: String(m.storedRows),
                        sub: `${m.dedupMerges} duplikat melebur`
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1631,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                            className: "h-4 w-4 text-sky-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1632,
                            columnNumber: 25
                        }, void 0),
                        label: "Rasio kompresi",
                        value: fmtX(m.compressionRatio),
                        sub: `byte: ${fmtX(m.byteRatio)}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1632,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                            className: "h-4 w-4 text-violet-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 1633,
                            columnNumber: 25
                        }, void 0),
                        label: "Total pemakaian memori",
                        value: String(m.totalHits),
                        sub: "state sama dipakai ulang"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1633,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1629,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-emerald-300",
                                children: [
                                    leak?.verdict === 'BEBAS-KEBOCOGAN' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1639,
                                        columnNumber: 52
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1639,
                                        columnNumber: 90
                                    }, this),
                                    "Audit Bebas-Kebocoran"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1638,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs leading-relaxed text-zinc-300",
                                children: leak ? `${leak.verdict} — ${leak.pass}/${leak.checked} hari sampel terverifikasi. Metode: ${leak.method}.` : 'Audit belum dijalankan.'
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1642,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] leading-relaxed text-zinc-500",
                                children: "Kebocoran = memakai data masa depan untuk memutuskan masa lalu. Arena menutup candle hari-D untuk semua keputusan, dan bukti pick historis direproduksi ulang untuk membuktikannya."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1647,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1637,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-violet-500/30 bg-violet-500/[0.05] p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-violet-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusCircle$3e$__["MinusCircle"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1653,
                                        columnNumber: 13
                                    }, this),
                                    " Jaminan Tanpa-Tumpang-Tindih"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1652,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs leading-relaxed text-zinc-300",
                                children: "Setiap ingatan beralamat sidik jari FNV-1a dan jadi PRIMARY KEY — dua state identik mustahil punya dua baris; duplikat melebur menjadi satu dengan agregat (n, total return)."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1655,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] leading-relaxed text-zinc-500",
                                children: "Karena itu memori makin padat, bukan makin gemuk: pengalaman baru memperdalam ingatan lama, bukan menumpuknya."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1658,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1651,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1636,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-3 text-sm font-bold text-zinc-100",
                        children: "Ingatan terakhir dipakai"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1665,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-[10px] leading-relaxed text-zinc-500",
                        children: [
                            "UPGRADE V4: ingatan kini BERJENJANG (EPISODE koin → POLA 8-faktor → POLA_COARSE 3-faktor → POLA_REGIME) dan ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-violet-300",
                                children: "dibaca saat keputusan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1667,
                                columnNumber: 119
                            }, this),
                            " — tie-break antrian, penyetel keyakinan, MEMVETO. Bukan lagi organ mati."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1666,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            m.recent.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3 py-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: `text-[9px] ${r.kind === 'PELAJARAN' ? 'border-rose-500/40 text-rose-300' : r.kind === 'POLA_RIVAL' ? 'border-sky-500/40 text-sky-300' : r.kind === 'POLA_COARSE' || r.kind === 'POLA_REGIME' ? 'border-violet-500/40 text-violet-300' : 'border-zinc-700 text-zinc-400'}`,
                                            children: r.kind
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1672,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 flex-1 truncate text-zinc-300",
                                            children: String(r.payload.note ?? (r.payload.symbol ? `${r.payload.symbol} ${r.payload.direction}` : r.kind === 'POLA_REGIME' ? `REZIM ${r.payload.direction} — agregat seluruh pick` : `POLA ${r.payload.direction} [${r.payload.bucket}]`))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1673,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 font-mono text-[10px] text-zinc-500",
                                            children: [
                                                "n=",
                                                String(r.payload.n ?? 0),
                                                " · retΣ ",
                                                fmtPct(Number(r.payload.sumRet ?? 0), 1),
                                                " · ×",
                                                r.hits
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1680,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, r.fingerprint, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1671,
                                    columnNumber: 13
                                }, this)),
                            m.recent.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500",
                                children: "Ingatan masih kosong."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1683,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1669,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1664,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1628,
        columnNumber: 5
    }, this);
}
_c22 = MemorySection;
function StatCard({ icon, label, value, sub }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                children: [
                    icon,
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1693,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-xl font-extrabold tracking-tight text-zinc-50",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1696,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-0.5 text-[10px] text-zinc-500",
                children: sub
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1697,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1692,
        columnNumber: 5
    }, this);
}
_c23 = StatCard;
function TabTumbuh() {
    _s2();
    const [g, setG] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TabTumbuh.useEffect": ()=>{
            let alive = true;
            const load = {
                "TabTumbuh.useEffect.load": async ()=>{
                    try {
                        const res = await fetch('/api/growth', {
                            cache: 'no-store'
                        });
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        const d = await res.json();
                        if (alive) {
                            setG(d);
                            setErr(null);
                        }
                    } catch (e) {
                        if (alive) setErr(e.message);
                    }
                }
            }["TabTumbuh.useEffect.load"];
            load();
            const t = setInterval(load, 15000);
            return ({
                "TabTumbuh.useEffect": ()=>{
                    alive = false;
                    clearInterval(t);
                }
            })["TabTumbuh.useEffect"];
        }
    }["TabTumbuh.useEffect"], []);
    if (err && !g) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-sm text-rose-300",
            children: [
                "Sistem Pertumbuhan gagal dimuat: ",
                err
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 1754,
            columnNumber: 7
        }, this);
    }
    if (!g) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-sm text-zinc-400",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                    className: "h-4 w-4 animate-spin text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 1762,
                    columnNumber: 9
                }, this),
                "Menghitung tingkat kecerdasan dari seluruh riwayat arena…"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/arena/arena-console.tsx",
            lineNumber: 1761,
            columnNumber: 7
        }, this);
    }
    const next = g.rank.next;
    const gap = next ? Math.max(0, next.min - g.agiPct) : 0;
    const rankBase = next ? next.min : 100;
    const prevMin = next ? ({
        L1: 0,
        L2: 0.5,
        L3: 2,
        L4: 4,
        L5: 7,
        L6: 12
    })[next.id] ?? 0 : 100;
    const rankProgress = next ? Math.min(100, Math.max(2, (g.agiPct - prevMin) / Math.max(0.001, rankBase - prevMin) * 100)) : 100;
    const leverChip = (lever)=>lever === 'P' ? 'border-amber-500/50 bg-amber-500/15 text-amber-300' : lever === 'G' ? 'border-violet-500/50 bg-violet-500/15 text-violet-300' : 'border-sky-500/50 bg-sky-500/15 text-sky-300';
    const leverName = (lever)=>lever === 'P' ? 'PERFORMA' : lever === 'G' ? 'GENERALITAS' : 'OTONOMI';
    const chartData = g.history.map((h)=>({
            ...h,
            d: h.day.slice(5)
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-zinc-900/60 to-zinc-900/60 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold uppercase tracking-widest text-zinc-500",
                                        children: "Tingkat AGI terukur — performa × generalitas × otonomi (Levels of AGI, DeepMind 2024)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1788,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 flex flex-wrap items-baseline gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-5xl font-extrabold tracking-tight text-amber-300",
                                                children: [
                                                    g.agiPct.toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1792,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300",
                                                children: [
                                                    g.rank.id,
                                                    " · ",
                                                    g.rank.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1793,
                                                columnNumber: 15
                                            }, this),
                                            g.growth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-lg border border-lime-500/40 bg-lime-500/10 px-2 py-0.5 text-[11px] font-semibold text-lime-300",
                                                children: [
                                                    "naik ×",
                                                    g.growth.mult.toFixed(1),
                                                    " sejak hari pertama teradili"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1797,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1791,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1.5 max-w-2xl text-[11px] leading-relaxed text-zinc-400",
                                        children: [
                                            g.rank.desc,
                                            ". Angka ini jujur: cyborg kita kuat di niche kripto (P), tetapi masih sempit (G — 1 dari ~10 domain ekonomi) dan upgrade strukturalnya masih dikerjakan pengembang (A). Justru di situlah ruang pertumbuhan terbesarnya."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1802,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-3 py-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold uppercase tracking-widest text-amber-400/80",
                                                children: "P · Performa"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1810,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-lg font-bold text-amber-300",
                                                children: [
                                                    g.p.level.toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1811,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-zinc-500",
                                                children: "kemahiran kripto"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1812,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1809,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-violet-500/30 bg-violet-500/[0.06] px-3 py-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold uppercase tracking-widest text-violet-400/80",
                                                children: "G · Generalitas"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1815,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-lg font-bold text-violet-300",
                                                children: [
                                                    (g.g.breadth * 100).toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1816,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-zinc-500",
                                                children: [
                                                    g.g.task.on,
                                                    "/",
                                                    g.g.task.total,
                                                    " tugas · ",
                                                    g.g.modality.on,
                                                    "/",
                                                    g.g.modality.total,
                                                    " sumber"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1817,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1814,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-sky-500/30 bg-sky-500/[0.06] px-3 py-2 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] font-bold uppercase tracking-widest text-sky-400/80",
                                                children: "A · Otonomi"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1820,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-lg font-bold text-sky-300",
                                                children: [
                                                    g.a.score.toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1821,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[9px] text-zinc-500",
                                                children: "siklus & vonis mandiri"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1822,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1819,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1808,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1786,
                        columnNumber: 9
                    }, this),
                    next && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 border-t border-amber-500/15 pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-400",
                                        children: [
                                            "Menuju ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-zinc-200",
                                                children: [
                                                    next.id,
                                                    " · ",
                                                    next.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1831,
                                                columnNumber: 54
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1831,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-zinc-400",
                                        children: [
                                            "kurang ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300",
                                                children: [
                                                    gap.toFixed(2),
                                                    " poin AGI"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1832,
                                                columnNumber: 64
                                            }, this),
                                            " (",
                                            g.agiPct.toFixed(2),
                                            "% → ",
                                            next.min,
                                            "%)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1832,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1830,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                value: rankProgress,
                                className: "mt-1.5 h-1.5 bg-zinc-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-lime-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1834,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1829,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1785,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-5 lg:grid-cols-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 lg:col-span-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "h-4 w-4 text-lime-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1843,
                                        columnNumber: 13
                                    }, this),
                                    " Kurva Pertumbuhan (walk-forward, bebas kebocoran)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1842,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 mt-1 text-[11px] text-zinc-500",
                                children: "AGI% & P% dihitung ulang murni dari pick yang sudah teradili s/d tiap hari — tidak ada masa-depan yang bocor ke masa-lalu."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1845,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                                        data: chartData,
                                        margin: {
                                            top: 4,
                                            right: 8,
                                            left: -18,
                                            bottom: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                stroke: "#3f3f46",
                                                strokeDasharray: "3 3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1851,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "d",
                                                tick: {
                                                    fill: '#a1a1aa',
                                                    fontSize: 10
                                                },
                                                tickLine: false
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1852,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                yAxisId: "l",
                                                tick: {
                                                    fill: '#a1a1aa',
                                                    fontSize: 10
                                                },
                                                tickLine: false,
                                                unit: "%",
                                                width: 52
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1853,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                yAxisId: "r",
                                                orientation: "right",
                                                tick: {
                                                    fill: '#71717a',
                                                    fontSize: 10
                                                },
                                                tickLine: false,
                                                unit: "%",
                                                width: 52
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1854,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                contentStyle: {
                                                    background: '#18181b',
                                                    border: '1px solid #3f3f46',
                                                    borderRadius: 12,
                                                    fontSize: 11
                                                },
                                                labelStyle: {
                                                    color: '#e4e4e7'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1855,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                wrapperStyle: {
                                                    fontSize: 10
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1859,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                yAxisId: "l",
                                                type: "monotone",
                                                dataKey: "agi",
                                                name: "AGI%",
                                                stroke: "#fbbf24",
                                                strokeWidth: 2.5,
                                                dot: false
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1860,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                yAxisId: "l",
                                                type: "monotone",
                                                dataKey: "p",
                                                name: "P — kemahiran kripto",
                                                stroke: "#34d399",
                                                strokeWidth: 1.5,
                                                dot: false
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1861,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                yAxisId: "r",
                                                type: "monotone",
                                                dataKey: "cum",
                                                name: "Profit kumulatif",
                                                stroke: "#a78bfa",
                                                strokeWidth: 1.5,
                                                dot: false,
                                                strokeDasharray: "5 3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1862,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1850,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1849,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1848,
                                columnNumber: 11
                            }, this),
                            g.growth?.doublingDays && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] text-zinc-500",
                                children: [
                                    "Tempo pertumbuhan: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-lime-300",
                                        children: [
                                            "melipatgandakan AGI tiap ~",
                                            g.growth.doublingDays,
                                            " hari teradili"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1868,
                                        columnNumber: 34
                                    }, this),
                                    " (patokan riset: agen AI umum melipatgandakan rentang tugas tiap ~4–7 bulan)."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1867,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1841,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-4 w-4 text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1875,
                                        columnNumber: 13
                                    }, this),
                                    " Anatomika P — 6 Dimensi Kemahiran"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1874,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 mt-1 text-[11px] text-zinc-500",
                                children: "Rata-rata geometri berbobot: satu dimensi nol menghukum seluruh P (sifat AGI yang benar)."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1877,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                        data: g.p.dims.map((d)=>({
                                                dim: d.label,
                                                skor: Math.round(d.score * 100)
                                            })),
                                        outerRadius: "82%",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {
                                                stroke: "#3f3f46"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1881,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                dataKey: "dim",
                                                tick: {
                                                    fill: '#a1a1aa',
                                                    fontSize: 9
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1882,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarRadiusAxis"], {
                                                domain: [
                                                    0,
                                                    100
                                                ],
                                                tick: false,
                                                axisLine: false
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1883,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                dataKey: "skor",
                                                stroke: "#fbbf24",
                                                fill: "#fbbf24",
                                                fillOpacity: 0.35
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1884,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                contentStyle: {
                                                    background: '#18181b',
                                                    border: '1px solid #3f3f46',
                                                    borderRadius: 12,
                                                    fontSize: 11
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1885,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1880,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1879,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1878,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 space-y-1.5",
                                children: g.p.dims.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-2 text-[11px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-zinc-300",
                                                children: [
                                                    d.label,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-600",
                                                        children: [
                                                            "·",
                                                            Math.round(d.w * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 1892,
                                                        columnNumber: 59
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1892,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: `font-mono ${d.score >= 0.6 ? 'text-emerald-300' : d.score >= 0.35 ? 'text-amber-300' : 'text-rose-300'}`,
                                                        children: [
                                                            Math.round(d.score * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 1894,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden text-zinc-600 sm:inline",
                                                        children: [
                                                            " — ",
                                                            d.detail
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                                        lineNumber: 1895,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1893,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, d.id, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1891,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1889,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1873,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1840,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-lime-500/25 bg-lime-500/[0.03] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "flex items-center gap-2 text-sm font-bold text-lime-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__["Sprout"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1906,
                                columnNumber: 11
                            }, this),
                            " Kurikulum Pertumbuhan — hasil tambang kelemahan, diurut potensi kenaikan AGI"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1905,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 mt-1 text-[11px] text-zinc-500",
                        children: "Loop self-improvement (riset 2026): kelemahan ditambang otomatis → setiap butir adalah upgrade berikutnya yang saya kerjakan (pengembang), divalidasi lab bebas-kebocoran, lalu dipasang → AGI% naik terukur."
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1908,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: g.curriculum.slice(0, 5).map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800/80 bg-zinc-900/50 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-5 w-5 items-center justify-center rounded-full bg-lime-500/20 text-[10px] font-bold text-lime-300",
                                                children: i + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1916,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `rounded border px-1.5 py-0.5 text-[9px] font-bold ${leverChip(c.lever)}`,
                                                children: leverName(c.lever)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1917,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-zinc-100",
                                                children: c.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1918,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto font-mono text-xs font-bold text-emerald-300",
                                                children: [
                                                    "+",
                                                    c.dAgiPp.toFixed(2),
                                                    " poin AGI"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1919,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1915,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[11px] text-zinc-400",
                                        children: c.why
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1921,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-[11px] leading-relaxed text-zinc-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-zinc-400",
                                                children: "Aksi:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1922,
                                                columnNumber: 79
                                            }, this),
                                            " ",
                                            c.action
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1922,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1914,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1912,
                        columnNumber: 9
                    }, this),
                    g.curriculum.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase tracking-widest text-zinc-600",
                                children: "Backlog:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1928,
                                columnNumber: 13
                            }, this),
                            g.curriculum.slice(5).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-lg border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-[10px] text-zinc-400",
                                    children: [
                                        c.label,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-emerald-400/80",
                                            children: [
                                                "+",
                                                c.dAgiPp.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1931,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                    lineNumber: 1930,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1927,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1904,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-5 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                        className: "h-4 w-4 text-violet-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1942,
                                        columnNumber: 13
                                    }, this),
                                    " Kemahiran Terverifikasi (skill library ala Voyager)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1941,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 mt-1 text-[11px] text-zinc-500",
                                children: "Pola ingatan dengan n≥2 pengalaman — keterampilan yang benar-benar dibaca otak saat keputusan. Mastery naik seiring n."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1944,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-72 space-y-2 overflow-y-auto pr-1",
                                children: [
                                    g.skills.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-zinc-500",
                                        children: "Belum ada pola dengan n≥2 — konsolidasi memori berjalan tiap hari."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1948,
                                        columnNumber: 39
                                    }, this),
                                    g.skills.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border border-zinc-800/70 bg-zinc-900/40 px-3 py-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-semibold text-zinc-200",
                                                            children: s.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                                            lineNumber: 1952,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[11px]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-zinc-500",
                                                                    children: [
                                                                        "n=",
                                                                        s.n
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                    lineNumber: 1954,
                                                                    columnNumber: 21
                                                                }, this),
                                                                ' ',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    className: s.avgRet >= 0 ? 'text-emerald-300' : 'text-rose-300',
                                                                    children: [
                                                                        s.avgRet >= 0 ? '+' : '',
                                                                        s.avgRet.toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                    lineNumber: 1955,
                                                                    columnNumber: 21
                                                                }, this),
                                                                ' ',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-zinc-500",
                                                                    children: [
                                                                        "hit ",
                                                                        s.hit.toFixed(0),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                                    lineNumber: 1956,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                                            lineNumber: 1953,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 1951,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                                    value: s.mastery * 100,
                                                    className: "mt-1.5 h-1 bg-zinc-800 [&>div]:bg-violet-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arena-console.tsx",
                                                    lineNumber: 1959,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, s.fp, true, {
                                            fileName: "[project]/src/components/arena/arena-console.tsx",
                                            lineNumber: 1950,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1947,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1940,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "h-4 w-4 text-fuchsia-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1967,
                                        columnNumber: 13
                                    }, this),
                                    " Kemampuan Emeren — kecerdasan yang muncul saat skala cukup"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1966,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 mt-1 text-[11px] text-zinc-500",
                                children: "Seperti kemampuan emergen di scaling laws: kemampuan baru menyala begitu akumulasi pengalaman melewati ambang — bukan dipasang manual."
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1969,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: g.emergent.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center gap-2.5 rounded-lg border px-3 py-2 ${e.active ? 'border-fuchsia-500/40 bg-fuchsia-500/[0.06]' : 'border-zinc-800/70 bg-zinc-900/40'}`,
                                        children: [
                                            e.active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-3.5 w-3.5 shrink-0 text-fuchsia-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1975,
                                                columnNumber: 29
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleDot$3e$__["CircleDot"], {
                                                className: "h-3.5 w-3.5 shrink-0 text-zinc-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1975,
                                                columnNumber: 98
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[11px] ${e.active ? 'text-zinc-200' : 'text-zinc-500'}`,
                                                children: e.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1976,
                                                columnNumber: 17
                                            }, this),
                                            e.active && e.sinceDay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto font-mono text-[10px] text-fuchsia-300/80",
                                                children: [
                                                    "menyala ",
                                                    e.sinceDay
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 1977,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, e.id, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1974,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1972,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1965,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1939,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sprout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sprout$3e$__["Sprout"], {
                                className: "h-4 w-4 text-lime-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1987,
                                columnNumber: 11
                            }, this),
                            " Kronik Pertumbuhan"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1986,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 max-h-72 space-y-1.5 overflow-y-auto pr-1",
                        children: g.log.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventChip, {
                                        kind: l.kind
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1992,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-zinc-600",
                                        children: l.day
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1993,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 text-[11px] leading-relaxed text-zinc-300",
                                        children: l.text.length > 220 ? `${l.text.slice(0, 220)}…` : l.text
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 1994,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 1991,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 1989,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 1985,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "flex items-center gap-2 text-sm font-bold text-zinc-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "h-4 w-4 text-sky-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 2003,
                                columnNumber: 11
                            }, this),
                            " Bagaimana AI Tumbuh — 7 mekanisme dari riset, terpasang di cyborg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 2002,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 mt-1 text-[11px] text-zinc-500",
                        children: [
                            "Hasil studi sistem pertumbuhan AI (10 topik riset web, tersimpan di ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono",
                                children: "research/growth_systems.json"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 2006,
                                columnNumber: 79
                            }, this),
                            ")."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 2005,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2.5 md:grid-cols-2",
                        children: g.researchMap.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800/70 bg-zinc-900/40 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-zinc-100",
                                        children: r.concept
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 2011,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-[10px] uppercase tracking-wider text-zinc-600",
                                        children: r.source
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 2012,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[11px] leading-relaxed text-zinc-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-amber-300/90",
                                                children: "Di cyborg:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                                lineNumber: 2013,
                                                columnNumber: 77
                                            }, this),
                                            " ",
                                            r.ours
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arena-console.tsx",
                                        lineNumber: 2013,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/arena/arena-console.tsx",
                                lineNumber: 2010,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arena-console.tsx",
                        lineNumber: 2008,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 2001,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] leading-relaxed text-zinc-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            className: "text-zinc-500",
                            children: "Metodologi jujur:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/arena-console.tsx",
                            lineNumber: 2022,
                            columnNumber: 11
                        }, this),
                        " P = rata-rata geometri berbobot 6 dimensi dari ",
                        g.scoredDays,
                        " hari teradili (profit, akurasi, kalibrasi Brier, ingatan hidup, cakupan radar, adaptasi) — dihitung walk-forward, hanya pick teradili s/d hari-D. G = (1/10 domain ekonomi) × tugas terkuasai × modalitas informasi — peta kemampuan eksplisit di atas. A = rata-rata 5 organ otonomi. AGI% = P×G×A×100 mengikuti kerangka Levels of AGI (DeepMind): performa × generalitas × otonomi. Memori: ",
                        g.memorySummary.rawEvents,
                        " kejadian mentah → ",
                        g.memorySummary.storedRows,
                        " baris terkompresi (dedup FNV-1a), ",
                        g.memorySummary.verifN,
                        " pola terverifikasi."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/arena/arena-console.tsx",
                    lineNumber: 2021,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arena-console.tsx",
                lineNumber: 2020,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arena-console.tsx",
        lineNumber: 1783,
        columnNumber: 5
    }, this);
}
_s2(TabTumbuh, "ePspNT9zaGNreApfCEuAiiOopeg=");
_c24 = TabTumbuh;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24;
__turbopack_context__.k.register(_c, "ArenaConsole");
__turbopack_context__.k.register(_c1, "TabArena");
__turbopack_context__.k.register(_c2, "TabUjian");
__turbopack_context__.k.register(_c3, "EventChip");
__turbopack_context__.k.register(_c4, "NadirCountdown");
__turbopack_context__.k.register(_c5, "VonisChip");
__turbopack_context__.k.register(_c6, "LevelRingkas");
__turbopack_context__.k.register(_c7, "BukuCuanPanel");
__turbopack_context__.k.register(_c8, "DaftarTempur");
__turbopack_context__.k.register(_c9, "DirectionBadge");
__turbopack_context__.k.register(_c10, "Sparkline");
__turbopack_context__.k.register(_c11, "FngChip");
__turbopack_context__.k.register(_c12, "CincinKeyakinan");
__turbopack_context__.k.register(_c13, "TanggaHarga");
__turbopack_context__.k.register(_c14, "McBar");
__turbopack_context__.k.register(_c15, "DayaBars");
__turbopack_context__.k.register(_c16, "SalinRencanaBtn");
__turbopack_context__.k.register(_c17, "WarisanPanel");
__turbopack_context__.k.register(_c18, "TabBriefing");
__turbopack_context__.k.register(_c19, "FactorBars");
__turbopack_context__.k.register(_c20, "TabOtak");
__turbopack_context__.k.register(_c21, "FactorWeightBars");
__turbopack_context__.k.register(_c22, "MemorySection");
__turbopack_context__.k.register(_c23, "StatCard");
__turbopack_context__.k.register(_c24, "TabTumbuh");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_arena_arena-console_tsx_8fbcbe66._.js.map