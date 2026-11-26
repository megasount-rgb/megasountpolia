(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/arena/guru-chat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuruChat",
    ()=>GuruChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/swords.js [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Markdown({ text, tone }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `text-sm leading-relaxed ${tone === 'amber' ? 'text-zinc-100 [&_strong]:text-amber-200 [&_strong]:font-bold' : 'text-zinc-300 [&_strong]:text-sky-200'} [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-0.5 [&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:hidden [&_h2]:hidden [&_h3]:mt-2 [&_h3]:text-xs [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-wider [&_p]:my-1.5`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
            children: text
        }, void 0, false, {
            fileName: "[project]/src/components/arena/guru-chat.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/arena/guru-chat.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Markdown;
const CONTOH = [
    'Koin apa yang paling layak dibeli hari ini dan kenapa?',
    'Bagaimana kondisi rezim pasar crypto sekarang?',
    'Berita terbaru apa yang menggerakkan pasar crypto?',
    'Kapan sebaiknya aku SELL posisiku?',
    'Bandingkan SOL vs BNB untuk minggu ini'
];
function GuruChat() {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [duel, setDuel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [turns, setTurns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const ask = async (q)=>{
        const question = q.trim();
        if (!question || busy) return;
        setInput('');
        setBusy(true);
        setError(null);
        try {
            const res = await fetch('/api/guru', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question,
                    duel
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Gagal menjawab');
            setTurns((t)=>[
                    {
                        question,
                        cyborg: data.cyborg,
                        plain: data.plain,
                        sources: data.sources ?? [],
                        at: new Date().toISOString()
                    },
                    ...t
                ]);
        } catch (e) {
            setError(e.message);
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 sm:flex-row sm:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-zinc-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                className: "h-4 w-4 text-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/guru-chat.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            "Mode pertanyaan:"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDuel(false),
                                className: `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${!duel ? 'border-amber-500/60 bg-amber-500/15 text-amber-300' : 'border-zinc-700 text-zinc-400 hover:text-zinc-200'}`,
                                children: "Guru saja"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/guru-chat.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setDuel(true),
                                className: `flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${duel ? 'border-rose-500/60 bg-rose-500/15 text-rose-300' : 'border-zinc-700 text-zinc-400 hover:text-zinc-200'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    "DUEL ILMU: MICAPROFITA vs AI Umum"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/guru-chat.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/guru-chat.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') ask(input);
                        },
                        placeholder: "Tanya gurumu… (hanya dunia kripto)",
                        className: "h-11 bg-zinc-900/80 border-zinc-800",
                        disabled: busy
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>ask(input),
                        disabled: busy || !input.trim(),
                        className: "h-11 px-4 bg-amber-500 text-black hover:bg-amber-400",
                        children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "h-4 w-4 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                            lineNumber: 102,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                            lineNumber: 102,
                            columnNumber: 66
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/guru-chat.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5",
                children: CONTOH.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>ask(c),
                        disabled: busy,
                        className: "rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 disabled:opacity-50",
                        children: c
                    }, c, false, {
                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/arena/guru-chat.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/arena/guru-chat.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this),
            turns.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-wider text-zinc-500",
                                    children: "Pertanyaan"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-zinc-200",
                                    children: t.question
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-2 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/guru-chat.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-bold text-amber-300",
                                            children: "MICAPROFITA"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: "border-amber-500/40 text-[10px] text-amber-400",
                                            children: "guru + doktrin + data hidup"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm leading-relaxed text-zinc-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Markdown, {
                                        text: t.cyborg,
                                        tone: "amber"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                                        lineNumber: 142,
                                        columnNumber: 68
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                t.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 border-t border-amber-500/20 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-bold uppercase tracking-widest text-amber-500/70",
                                            children: "Sumber berita hidup"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-1 space-y-0.5",
                                            children: t.sources.slice(0, 4).map((s, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "truncate text-[11px] text-zinc-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: s.url,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "hover:text-amber-300",
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/guru-chat.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 23
                                                    }, this)
                                                }, j, false, {
                                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        t.plain !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-amber-500/30 bg-zinc-900/60 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1.5 text-xs font-bold text-amber-300",
                                            children: "MICAPROFITA (cyborg)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Markdown, {
                                            text: t.cyborg,
                                            tone: "amber"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 161,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-sky-500/30 bg-zinc-900/60 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-1.5 flex items-center gap-1.5 text-xs font-bold text-sky-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this),
                                                " AI Umum (tanpa doktrin, tanpa data hidup)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Markdown, {
                                            text: t.plain ?? '',
                                            tone: "plain"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-zinc-500 md:col-span-2",
                                    children: "Nilai sendiri kedalaman keduanya — cyborg membaca pasar hidup Binance, doktrin dari kegagalan nyata, dan pola pemenang rival."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/guru-chat.tsx",
                            lineNumber: 158,
                            columnNumber: 13
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/arena/guru-chat.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)),
            turns.length === 0 && !busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "py-6 text-center text-xs text-zinc-600",
                children: "Guru siap. Ajukan pertanyaan kripto pertamamu — jawaban selalu berbasis data & doktrin."
            }, void 0, false, {
                fileName: "[project]/src/components/arena/guru-chat.tsx",
                lineNumber: 178,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/guru-chat.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(GuruChat, "DtQQfLl7O+x/P2w35kmqWl2MpNw=");
_c1 = GuruChat;
var _c, _c1;
__turbopack_context__.k.register(_c, "Markdown");
__turbopack_context__.k.register(_c1, "GuruChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/arena/arah-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArahPanel",
    ()=>ArahPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ============================================================
// PANEL KEPASTIAN ARAH — fisika tampilan OTAK-ARAH v1.8.
// Laboratorium interaktif: pilih skenario kompleks 5-aspek,
// saksikan DEWAN BUKTI 8 DIMENSI berbicara satu per satu,
// vonis biner BUY/SELL + gauge kepastian, lalu buka tirai
// horizon: benar/salah + NET profit/loss (fee wajib).
// Semua berjalan LANGSUNG di browser memakai otak ujian
// bersertifikat yang sama (arah-brain v1.8 + forge kompleks).
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wind.js [app-client] (ecmascript) <export default as Wind>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript) <export default as Waves>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shuffle.js [app-client] (ecmascript) <export default as Shuffle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.js [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$suite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/kompleks-suite.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/kompleks-forge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$arah$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/arah-brain.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const ORGAN_BOARD = [
    {
        id: 'v237-FBO',
        nama: 'False Breakout',
        versi: 'v1.38',
        skor: '744/744',
        ujian: 'hakim segel-seged',
        warna: '#38bdf8'
    },
    {
        id: 'v238-PD',
        nama: 'Pump & Dump',
        versi: 'v1.7',
        skor: '1600/1600',
        ujian: 'latihan + hakim + segel',
        warna: '#f472b6'
    },
    {
        id: 'v239-KL',
        nama: 'Kompleks 5 Aspek',
        versi: 'v1.0',
        skor: '1600/1600',
        ujian: 'latihan + hakim + segel',
        warna: '#a78bfa'
    },
    {
        id: 'v240-AR',
        nama: 'Kepastian Arah',
        versi: `v${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$arah$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARAH_BRAIN_VERSI"]}`,
        skor: '10600/10600',
        ujian: 'latihan + 11 hakim + 10 segel',
        warna: '#fbbf24'
    }
];
const DIM_ICON = {
    'AR-E1': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__["Waves"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 27,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E2': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 28,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E3': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 29,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E4': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wind$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wind$3e$__["Wind"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 30,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E5': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 31,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E6': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 32,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E7': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 33,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    'AR-E8': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"], {
        className: "h-3.5 w-3.5"
    }, void 0, false, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 34,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0))
};
const voteTone = (vote)=>vote === 'NAIK' ? {
        teks: 'text-emerald-300',
        bar: 'bg-emerald-500',
        border: 'border-emerald-500/40',
        bg: 'bg-emerald-500/10',
        label: 'NAIK'
    } : vote === 'TURUN' ? {
        teks: 'text-rose-300',
        bar: 'bg-rose-500',
        border: 'border-rose-500/40',
        bg: 'bg-rose-500/10',
        label: 'TURUN'
    } : {
        teks: 'text-zinc-400',
        bar: 'bg-zinc-600',
        border: 'border-zinc-700',
        bg: 'bg-zinc-800/40',
        label: 'NETRAL'
    };
function ArahPanel() {
    _s();
    const [ns, setNs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ar-live1');
    const [num, setNum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [exam, setExam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [vonis, setVonis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ledger, setLedger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tahap, setTahap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pilih');
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gambar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArahPanel.useCallback[gambar]": (eks, vn, buka)=>{
            const cv = canvasRef.current;
            if (!cv) return;
            const ctx = cv.getContext('2d');
            if (!ctx) return;
            const W = cv.width;
            const H = cv.height;
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#0c0c0f';
            ctx.fillRect(0, 0, W, H);
            if (!eks) return;
            const visible = eks.candles.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"]);
            const horizon = eks.candles.slice(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"]);
            const data = buka ? eks.candles : visible;
            const lo = Math.min(...data.map({
                "ArahPanel.useCallback[gambar].lo": (c)=>c.l
            }["ArahPanel.useCallback[gambar].lo"]));
            const hi = Math.max(...data.map({
                "ArahPanel.useCallback[gambar].hi": (c)=>c.h
            }["ArahPanel.useCallback[gambar].hi"]));
            const pad = (hi - lo) * 0.08 || 1;
            const y = {
                "ArahPanel.useCallback[gambar].y": (p)=>H - 14 - (p - lo + pad) / (hi - lo + 2 * pad) * (H - 28)
            }["ArahPanel.useCallback[gambar].y"];
            const nTot = data.length;
            const cw = W / nTot;
            // garis level kunci
            if (vn) {
                const garis = [
                    [
                        eks.entry,
                        '#fbbf24',
                        'ENTRY'
                    ]
                ];
                if (vn.eksekusi.triggerLevel) garis.push([
                    vn.eksekusi.triggerLevel,
                    '#22d3ee',
                    'TRIGGER'
                ]);
                for (const [p, warna, label] of garis){
                    ctx.strokeStyle = warna + '88';
                    ctx.setLineDash([
                        4,
                        4
                    ]);
                    ctx.beginPath();
                    ctx.moveTo(0, y(p));
                    ctx.lineTo(W, y(p));
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.fillStyle = warna;
                    ctx.font = '9px monospace';
                    ctx.fillText(label, 4, y(p) - 3);
                }
            }
            data.forEach({
                "ArahPanel.useCallback[gambar]": (c, i)=>{
                    const x = i * cw + cw / 2;
                    const naik = c.c >= c.o;
                    ctx.strokeStyle = naik ? '#34d399' : '#fb7185';
                    ctx.fillStyle = naik ? '#34d399' : '#fb7185';
                    ctx.beginPath();
                    ctx.moveTo(x, y(c.h));
                    ctx.lineTo(x, y(c.l));
                    ctx.stroke();
                    const bw = Math.max(1.5, cw * 0.62);
                    const yo = y(Math.max(c.o, c.c));
                    const yc = y(Math.min(c.o, c.c));
                    ctx.fillRect(x - bw / 2, yo, bw, Math.max(1, yc - yo));
                    if (!buka && i === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"] - 1) {
                        ctx.strokeStyle = '#fbbf24';
                        ctx.lineWidth = 1.2;
                        ctx.strokeRect(x - bw / 2 - 2, y(c.h) - 4, bw + 4, y(c.l) - y(c.h) + 8);
                        ctx.lineWidth = 1;
                    }
                }
            }["ArahPanel.useCallback[gambar]"]);
            // pembatas visible | horizon
            if (buka) {
                ctx.strokeStyle = '#52525b';
                ctx.setLineDash([
                    2,
                    3
                ]);
                ctx.beginPath();
                ctx.moveTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"] * cw, 0);
                ctx.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"] * cw, H);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = '#a1a1aa';
                ctx.font = '9px monospace';
                ctx.fillText('HORIZON 14', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"] * cw + 4, 12);
            } else {
                ctx.fillStyle = '#71717a';
                ctx.font = '9px monospace';
                ctx.fillText('60 CANDLE VISIBLE — horizon tersembunyi (anti-hindsight)', 8, 12);
            }
            void horizon;
        }
    }["ArahPanel.useCallback[gambar]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArahPanel.useEffect": ()=>{
            gambar(exam, vonis, tahap === 'buka');
        }
    }["ArahPanel.useEffect"], [
        exam,
        vonis,
        tahap,
        gambar
    ]);
    const jalankan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArahPanel.useCallback[jalankan]": ()=>{
            setErr(null);
            setTahap('menganalisis');
            setVonis(null);
            setLedger(null);
            // beri kesempatan UI render "menganalisis" dulu
            setTimeout({
                "ArahPanel.useCallback[jalankan]": ()=>{
                    try {
                        const eks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$suite$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forgeKlExam"])(num, ns.trim() || 'ar-live1');
                        const vis = eks.candles.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"]);
                        const vn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$arah$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arahVonis"])(vis);
                        const led = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["simKlTrade"])({
                            aksi: vn.eksekusi.aksi,
                            arah: vn.arah,
                            targetPct: vn.eksekusi.targetPct,
                            stopPct: vn.eksekusi.stopPct,
                            triggerLevel: vn.eksekusi.triggerLevel
                        }, eks.entry, eks.candles.slice(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$kompleks$2d$forge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KL_VISIBLE"]), eks.bait);
                        setExam(eks);
                        setVonis(vn);
                        setLedger(led);
                        setTahap('vonis');
                    } catch (e) {
                        setErr(`gagal membangun skenario: ${e.message}`);
                        setTahap('pilih');
                    }
                }
            }["ArahPanel.useCallback[jalankan]"], 60);
        }
    }["ArahPanel.useCallback[jalankan]"], [
        ns,
        num
    ]);
    const acak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArahPanel.useCallback[acak]": ()=>{
            setNum(1 + Math.floor(Math.random() * 100));
            setNs(`ar-live${1 + Math.floor(Math.random() * 999)}`);
        }
    }["ArahPanel.useCallback[acak]"], []);
    const bukaTirai = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArahPanel.useCallback[bukaTirai]": ()=>setTahap('buka')
    }["ArahPanel.useCallback[bukaTirai]"], []);
    const ulang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArahPanel.useMemo[ulang]": ()=>({
                "ArahPanel.useMemo[ulang]": ()=>{
                    setTahap('pilih');
                    setVonis(null);
                    setLedger(null);
                    setExam(null);
                }
            })["ArahPanel.useMemo[ulang]"]
    }["ArahPanel.useMemo[ulang]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.06] via-zinc-900/60 to-zinc-900/60 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/15 text-amber-400",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
                                    className: "h-4.5 w-4.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/arah-panel.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base font-extrabold tracking-tight text-zinc-50",
                                        children: [
                                            "OTAK-ARAH ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-amber-400",
                                                children: "·"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 184,
                                                columnNumber: 92
                                            }, this),
                                            " Kepastian Arah Berbasis Bukti"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-zinc-500",
                                        children: "AGI hanya punya dua keputusan: BUY atau SELL — setiap vonis wajib berdiri di atas dewan bukti 8 dimensi"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2.5 lg:grid-cols-4",
                        children: ORGAN_BOARD.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/60 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                className: "h-3.5 w-3.5",
                                                style: {
                                                    color: o.warna
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-mono font-bold",
                                                style: {
                                                    color: o.warna
                                                },
                                                children: o.id
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-[10px] font-mono text-zinc-500",
                                                children: o.versi
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1.5 text-xs font-bold text-zinc-200",
                                        children: o.nama
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 font-mono text-[11px] font-bold text-emerald-400",
                                        children: o.skor
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] leading-tight text-zinc-600",
                                        children: o.ujian
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, o.id, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap items-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs text-zinc-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mb-1 block text-[10px] font-bold uppercase tracking-widest text-zinc-600",
                                        children: "Seed skenario"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: ns,
                                        onChange: (e)=>setNs(e.target.value),
                                        className: "h-9 w-44 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 font-mono text-xs text-zinc-200 outline-none focus:border-amber-500/50",
                                        spellCheck: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs text-zinc-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mb-1 block text-[10px] font-bold uppercase tracking-widest text-zinc-600",
                                        children: "Skenario #1-100"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 1,
                                        max: 100,
                                        value: num,
                                        onChange: (e)=>setNum(Math.min(100, Math.max(1, parseInt(e.target.value || '1', 10) || 1))),
                                        className: "h-9 w-24 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 font-mono text-xs text-zinc-200 outline-none focus:border-amber-500/50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: acak,
                                className: "flex h-9 items-center gap-1.5 rounded-lg border border-zinc-800 px-3 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shuffle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shuffle$3e$__["Shuffle"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    " Acak"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: jalankan,
                                disabled: tahap === 'menganalisis',
                                className: "flex h-9 items-center gap-1.5 rounded-lg bg-amber-500 px-4 text-xs font-bold text-zinc-950 transition-colors hover:bg-amber-400 disabled:opacity-60",
                                children: [
                                    tahap === 'menganalisis' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-3.5 w-3.5 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 238,
                                        columnNumber: 41
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 238,
                                        columnNumber: 92
                                    }, this),
                                    tahap === 'menganalisis' ? 'Menganalisis…' : 'Jalankan Otak'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            tahap === 'pilih' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ulang,
                                className: "flex h-9 items-center gap-1.5 rounded-lg border border-zinc-800 px-3 text-xs text-zinc-400 hover:border-zinc-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this),
                                    " Reset"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this),
                            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-rose-400",
                                children: err
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 246,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 lg:grid-cols-[1.15fr_1fr]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0f]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        width: 640,
                                        height: 330,
                                        className: "h-auto w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between border-t border-zinc-800/80 px-3 py-2 text-[10px] text-zinc-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "point-in-time: 60 visible + 14 horizon · fee buy 0.1% + sell 0.1% · stop wajib"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 254,
                                                columnNumber: 15
                                            }, this),
                                            exam && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono",
                                                children: [
                                                    exam.fam,
                                                    " · ",
                                                    exam.diff,
                                                    " · truth=",
                                                    exam.truth,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 rounded border border-zinc-800 px-1.5 py-0.5",
                                                        children: exam.seed.split('::').slice(0, 3).join('::')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    !vonis && tahap !== 'menganalisis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-full min-h-56 items-center justify-center rounded-xl border border-dashed border-zinc-800 p-6 text-center text-xs leading-relaxed text-zinc-500",
                                        children: [
                                            "Tekan ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mx-1 font-bold text-amber-400",
                                                children: "Jalankan Otak"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 268,
                                                columnNumber: 23
                                            }, this),
                                            " — otak v",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$arah$2d$brain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARAH_BRAIN_VERSI"],
                                            " akan membaca struktur, likuiditas, volume, momentum, volatilitas, S/R, tekanan beli-jual, dan perubahan kondisi pasar sebelum memutuskan arah."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this),
                                    tahap === 'menganalisis' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-full min-h-56 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm text-amber-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-4 w-4 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this),
                                                " Dewan bukti sedang membaca 60 candle…"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/arah-panel.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this),
                                    vonis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `rounded-xl border p-4 ${vonis.vonis === 'BUY' ? 'border-emerald-500/40 bg-emerald-500/[0.07]' : 'border-rose-500/40 bg-rose-500/[0.07]'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `flex h-16 w-24 shrink-0 items-center justify-center rounded-lg text-xl font-black tracking-tight ${vonis.vonis === 'BUY' ? 'bg-emerald-500 text-emerald-950' : 'bg-rose-500 text-rose-950'}`,
                                                                children: vonis.vonis
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GaugeKepastian, {
                                                                nilai: vonis.kepastian
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0 flex-1 text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[10px] uppercase tracking-widest text-zinc-500",
                                                                        children: "konsensus dewan"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 290,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-mono text-sm font-bold text-zinc-200",
                                                                        children: [
                                                                            (vonis.konsensus * 100).toFixed(0),
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 291,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[10px] text-zinc-500",
                                                                        children: [
                                                                            "skor arah ",
                                                                            vonis.skorArah > 0 ? '+' : '',
                                                                            vonis.skorArah
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 292,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2.5 truncate font-mono text-[10px] text-zinc-500",
                                                        title: vonis.lapisan,
                                                        children: [
                                                            "lapisan: ",
                                                            vonis.lapisan,
                                                            " · otak v",
                                                            vonis.versi
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-[11px] text-zinc-400",
                                                        children: [
                                                            "eksekusi: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-zinc-200",
                                                                children: vonis.eksekusi.aksi === 'WAIT' ? 'order menunggu konfirmasi' : 'masuk langsung'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 31
                                                            }, this),
                                                            ' ',
                                                            "· target ",
                                                            vonis.eksekusi.targetPct,
                                                            "% · stop ",
                                                            vonis.eksekusi.stopPct.toFixed(1),
                                                            "%",
                                                            vonis.eksekusi.triggerLevel ? ` · trigger ${vonis.eksekusi.triggerLevel.toFixed(2)}` : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: vonis.bukti.map((b, i)=>{
                                                    const tone = voteTone(b.vote);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `rounded-lg border px-3 py-2 ${tone.border} ${tone.bg}`,
                                                        style: {
                                                            animation: `arah-muncul 0.45s ease-out ${i * 0.14}s both`
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: tone.teks,
                                                                        children: DIM_ICON[b.id]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 315,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-bold text-zinc-200",
                                                                        children: [
                                                                            b.id,
                                                                            " ",
                                                                            b.label
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 316,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `ml-auto rounded px-1.5 py-0.5 text-[9px] font-black ${tone.teks} border ${tone.border}`,
                                                                        children: tone.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 317,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-14 shrink-0",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block h-1 overflow-hidden rounded-full bg-zinc-800",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `block h-full rounded-full ${tone.bar}`,
                                                                                style: {
                                                                                    width: `${Math.round(b.kekuatan * 100)}%`,
                                                                                    animation: `arah-bar 0.5s ease-out ${i * 0.14 + 0.15}s both`
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                                lineNumber: 320,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                            lineNumber: 319,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-8 shrink-0 text-right font-mono text-[9px] text-zinc-500",
                                                                        children: (b.kekuatan * 100).toFixed(0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                        lineNumber: 323,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-[10px] leading-snug text-zinc-500",
                                                                children: b.cara
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, b.id, true, {
                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 305,
                                                columnNumber: 17
                                            }, this),
                                            tahap === 'vonis' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: bukaTirai,
                                                className: "flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-xs font-bold text-cyan-300 transition-colors hover:bg-cyan-500/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Buka tirai horizon — vonis diadili pasar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this) : ledger && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VonisAkhir, {
                                                exam: exam,
                                                vonis: vonis,
                                                ledger: ledger,
                                                onUlang: ulang
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                                lineNumber: 340,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes arah-muncul { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes arah-bar { from { width: 0; } }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 348,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_s(ArahPanel, "DvUTJmMQtpOvC9uIKSY7COO7Brg=");
_c = ArahPanel;
// ---------- gauge kepastian (SVG arc) ----------
function GaugeKepastian({ nilai }) {
    const R = 30;
    const C = Math.PI * R // setengah lingkaran
    ;
    const isi = nilai / 100 * C;
    const warna = nilai >= 80 ? '#34d399' : nilai >= 65 ? '#fbbf24' : '#fb7185';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shrink-0 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "76",
                height: "46",
                viewBox: "0 0 76 46",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M 8 42 A ${R} ${R} 0 0 1 68 42`,
                        fill: "none",
                        stroke: "#27272a",
                        strokeWidth: "8",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M 8 42 A ${R} ${R} 0 0 1 68 42`,
                        fill: "none",
                        stroke: warna,
                        strokeWidth: "8",
                        strokeLinecap: "round",
                        strokeDasharray: `${isi} ${C}`,
                        style: {
                            transition: 'stroke-dasharray 0.8s ease-out'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "38",
                        y: "38",
                        textAnchor: "middle",
                        fill: "#f4f4f5",
                        fontSize: "15",
                        fontWeight: "800",
                        fontFamily: "ui-monospace, monospace",
                        children: nilai
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "-mt-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500",
                children: "kepastian"
            }, void 0, false, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 363,
        columnNumber: 5
    }, this);
}
_c1 = GaugeKepastian;
// ---------- vonis akhir: benar/salah + net P/L ----------
function VonisAkhir({ exam, vonis, ledger, onUlang }) {
    const benar = vonis.arah === exam.truth;
    const net = ledger.netPct ?? 0;
    const noTrade = ledger.mode === 'NO-TRADE';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border p-4 ${benar ? 'border-emerald-500/40 bg-emerald-500/[0.07]' : 'border-rose-500/40 bg-rose-500/[0.07]'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `rounded-lg px-3 py-1.5 text-sm font-black ${benar ? 'bg-emerald-500 text-emerald-950' : 'bg-rose-500 text-rose-950'}`,
                        children: benar ? 'ARAH BENAR' : 'ARAH SALAH'
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-zinc-400",
                                children: [
                                    "truth pasar ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-zinc-200",
                                        children: exam.truth
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 395,
                                        columnNumber: 25
                                    }, this),
                                    " · vonis ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-zinc-200",
                                        children: vonis.vonis
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 395,
                                        columnNumber: 95
                                    }, this),
                                    noTrade && ' · order trigger tak tersentuh → NO-TRADE (dievaluasi jujur)'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `font-mono text-lg font-black ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`,
                                children: [
                                    "NET ",
                                    net >= 0 ? '+' : '',
                                    net.toFixed(2),
                                    "%",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-[10px] font-normal text-zinc-500",
                                        children: "setelah fee buy + sell 0.2%"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                                        lineNumber: 400,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/arah-panel.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 389,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 grid grid-cols-3 gap-2 text-center font-mono text-[10px] text-zinc-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded border border-zinc-800 py-1",
                        children: [
                            "entry ",
                            exam.entry.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded border border-zinc-800 py-1",
                        children: [
                            "exit ",
                            (ledger.exit ?? 0).toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded border border-zinc-800 py-1",
                        children: ledger.stopHit ? 'STOP TERSentuh' : ledger.targetHit ? 'TARGET TERCAPAI' : 'EXIT AKHIR HORIZON'
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 404,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onUlang,
                className: "mt-3 flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 text-xs font-bold text-zinc-300 transition-colors hover:border-zinc-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                        className: "h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/arah-panel.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, this),
                    " Skenario lain"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/arah-panel.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/arah-panel.tsx",
        lineNumber: 388,
        columnNumber: 5
    }, this);
}
_c2 = VonisAkhir;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ArahPanel");
__turbopack_context__.k.register(_c1, "GaugeKepastian");
__turbopack_context__.k.register(_c2, "VonisAkhir");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/arena/nadi-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NadiPanel",
    ()=>NadiPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// ============================================================
// TAB: NADI & GUDANG — Advanced Interface utk organ V241.
// Menampilkan: (1) NADI terus-hidup, (2) PRAKIRA pra-registrasi
// (akurasi SEBELUM terjadi) + bukti sertifikasi, (3) GUDANG
// 4 tingkat + kapsul live dari server, (4) lab rantai hash
// yang berjalan sungguhan di browser (implementasi identik
// dgn organ SAKTI & runner ujian — prareg.ts murni TS).
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2d$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDriveDownload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive-download.js [app-client] (ecmascript) <export default as HardDriveDownload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-client] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$prareg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/exam/prareg.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ORGAN_BUKTI = {
    file: 'download/Micaprofita_V231_SAKTI.html',
    ukuran: '15.614.366 byte',
    organSebelumnya: 'v237-FBO · v238-PD · v239-KOMPLEKS · v240-ARAH (semua utuh)',
    selfTest: '11/11 PASS (headless) + ekivalensi hash organ-JS ≡ prareg.ts terbukti',
    sha256: 'ca790c3ea8a5cc8e4d3f060bfc62067b…'
};
const SERTIFIKASI = [
    {
        tag: 'r2 · pr100f (segar murni)',
        arah: '100/100',
        koh: '97,50%',
        min: '3/4',
        vonis: 'LULUS ✔'
    },
    {
        tag: 'segel · pr100g (segar lagi)',
        arah: '100/100',
        koh: '97,50%',
        min: '3/4',
        vonis: 'LULUS ✔'
    }
];
function Kartu({ judul, ikon, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-center gap-2 text-sm font-bold text-amber-300",
                children: [
                    ikon,
                    judul
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/nadi-panel.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c = Kartu;
function NadiPanel() {
    _s();
    const [kapsul, setKapsul] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pesan, setPesan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [muat, setMuat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const muatKapsul = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NadiPanel.useCallback[muatKapsul]": async ()=>{
            setMuat(true);
            try {
                const r = await fetch('/api/gudang', {
                    cache: 'no-store'
                });
                const j = await r.json();
                setKapsul(j.kapsul || []);
            } catch  {
                setKapsul([]);
            }
            setMuat(false);
        }
    }["NadiPanel.useCallback[muatKapsul]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NadiPanel.useEffect": ()=>{
            void Promise.resolve().then(muatKapsul);
        }
    }["NadiPanel.useEffect"], [
        muatKapsul
    ]);
    const ujiTulisKapsul = async ()=>{
        setPesan('mengunci kapsul uji…');
        try {
            // rantai hash sungguhan di browser — implementasi sama dgn organ
            const waktu = new Date().toISOString();
            const kunci = {
                nomor: 1,
                ns: 'LIVE-DEMO',
                seed: 'demo-' + Date.now(),
                simbol: 'BTCUSDT',
                arah: 'NAIK',
                kepastian: 78,
                cek: [
                    'TURUN',
                    'NAIK',
                    'NAIK',
                    'NAIK'
                ],
                dasar: 'demo rantai pra-registrasi dari tab Nadi & Gudang',
                versiOtak: '1.1',
                waktu,
                prev: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$prareg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GENESIS"]
            };
            const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$prareg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256Hex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$exam$2f$prareg$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kanonikal"])(kunci));
            const isi = {
                protokol: 'KAPSUL-MICAPROFITA',
                organ: 'arena-nadi-panel',
                versi: '1.0',
                waktu,
                denyut: 1,
                rantai: {
                    denyut: [],
                    prakira: [
                        {
                            hash,
                            ...kunci
                        }
                    ]
                }
            };
            const r = await fetch('/api/gudang', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    nama: 'kapsul-demo-arena',
                    isi
                })
            });
            const j = await r.json();
            setPesan(j.ok ? `kapsul tersimpan: data/gudang/${j.nama} (${j.byte} byte) — hash ${hash.slice(0, 16)}…` : `ditolak server: ${j.error || '?'}`);
            muatKapsul();
        } catch (e) {
            setPesan('gagal: ' + e.message);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Kartu, {
                judul: "NADI — TERUS-HIDUP DI BROWSER PEMILIK",
                ikon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"], {
                    className: "h-4 w-4 text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                    lineNumber: 89,
                    columnNumber: 66
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-xs leading-relaxed text-zinc-400",
                        children: [
                            "Organ ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-emerald-300",
                                children: "V241 SAKTI-NADI v1.0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 91,
                                columnNumber: 17
                            }, this),
                            " hidup di dalam satu file single HTML: denyut tiap",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-200",
                                children: " 15 detik"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            " (sadar-visibility — latar 45 detik, denyut pembangkit saat tab kembali), uptime berjalan, setiap ~150 detik denyut dicatat ke ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-200",
                                children: "ledger berantai hash"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 93,
                                columnNumber: 64
                            }, this),
                            " (anti-rekayasa: mengubah satu bit pun merusak rantai dan terdeteksi). Jantung punya fault isolation sendiri — galat jaringan/prakira tidak boleh menghentikan denyut."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2 text-xs md:grid-cols-4",
                        children: [
                            [
                                'Denyut',
                                '15 dtk · depan / 45 dtk latar'
                            ],
                            [
                                'Ledger denyut',
                                'rantai SHA-256 append-only'
                            ],
                            [
                                'Recovery',
                                'ekor rusak dipotong + dilaporkan jujur'
                            ],
                            [
                                'Self-test organ',
                                ORGAN_BUKTI.selfTest
                            ]
                        ].map(([a, b])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/50 p-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold text-zinc-200",
                                        children: a
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-0.5 text-zinc-500",
                                        children: b
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, a, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Kartu, {
                judul: "PRAKIRA — AKURASI DIKUNCI SEBELUM TERJADI",
                ikon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                    className: "h-4 w-4 text-violet-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                    lineNumber: 113,
                    columnNumber: 70
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-xs leading-relaxed text-zinc-400",
                        children: [
                            "Otak ARAH (organ v240) membaca 60 candle live (failover 3 host nol-biaya: Binance → OKX → Bybit), lalu prediksi",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "text-zinc-200",
                                children: " DIKUNCI dulu"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            " ke ledger berantai hash: arah + kepastian + bukti, ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                children: "sebelum"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 116,
                                columnNumber: 109
                            }, this),
                            " jendela 15 menit berjalan. Baru saat jendela tuntas prediksi dinilai BENAR/SALAH. Akurasi dihitung HANYA dari prediksi terkunci — tidak ada ruang untuk omongan belakangan."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-zinc-800 text-left text-zinc-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-1.5 pr-3",
                                                children: "Ronde sertifikasi (2 fase: ledger → buka)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-1.5 pr-3",
                                                children: "Arah"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-1.5 pr-3",
                                                children: "Koherensi trajektori"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-1.5 pr-3",
                                                children: "Min skor cek"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-1.5",
                                                children: "Vonis bar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: SERTIFIKASI.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-zinc-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-1.5 pr-3 text-zinc-300",
                                                    children: s.tag
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-1.5 pr-3 font-mono text-emerald-300",
                                                    children: s.arah
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-1.5 pr-3 font-mono text-emerald-300",
                                                    children: s.koh
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-1.5 pr-3 font-mono text-zinc-300",
                                                    children: s.min
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-1.5 font-semibold text-emerald-300",
                                                    children: s.vonis
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, s.tag, true, {
                                            fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/arena/nadi-panel.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] leading-relaxed text-zinc-500",
                        children: [
                            "Trajektori 4 titik cek (candle horizon ke-3/7/11/14) = bentuk perjalanan yang diunci, bukan hanya ujungnya. Sertifikasi lewat protokol dua file: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "text-zinc-400",
                                children: "ledger-pr100f-r2.json"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 146,
                                columnNumber: 48
                            }, this),
                            " (terkunci dulu, rantai SHA-256, horizon tak disentuh) lalu ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "text-zinc-400",
                                children: "hasil-pr100f-r2.json"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 147,
                                columnNumber: 54
                            }, this),
                            " (dibuka kemudian, rantai diverifikasi ulang + vonis-ulang-beku harus identik). Zona kabut fake/absorb diakui jujur: sisa 10×3/4 adalah kabut terukur yang TIDAK dipaksa — mencegah overfit."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Kartu, {
                judul: "GUDANG 4 TINGKAT — PENYIMPANAN EKSTERNAL",
                ikon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                    className: "h-4 w-4 text-sky-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                    lineNumber: 154,
                    columnNumber: 69
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 grid grid-cols-2 gap-2 text-xs md:grid-cols-4",
                        children: [
                            [
                                'L1 · localStorage',
                                'cepat, selalu ada, kapasitas kecil'
                            ],
                            [
                                'L2 · IndexedDB',
                                'besar, ledger penuh, tahan ratusan ribu entri'
                            ],
                            [
                                'E1 · Folder Eksternal',
                                'File System Access: JSONL nyata di disk pemilik (nadi/, prakira/, snapshot/)'
                            ],
                            [
                                'E2 · Kapsul',
                                'ekspor/impor .json — bekerja di semua browser + redundansi server'
                            ]
                        ].map(([a, b])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/50 p-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold text-sky-300",
                                        children: a
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-0.5 text-zinc-500",
                                        children: b
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, a, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ujiTulisKapsul,
                                className: "flex min-h-[36px] items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2d$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDriveDownload$3e$__["HardDriveDownload"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    " Uji Tulis Kapsul ke Server"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: muatKapsul,
                                className: "flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-zinc-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    " Segarkan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            pesan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-emerald-300",
                                children: pesan
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 181,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 text-xs",
                        children: muat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-zinc-500",
                            children: "memuat…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/nadi-panel.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, this) : kapsul.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-zinc-500",
                            children: "gudang server kosong — kapsul dari browser SAKTI (tombol Ekspor → server) akan tampil di sini"
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/nadi-panel.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-zinc-800 text-left text-zinc-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "py-1.5 pr-3",
                                                    children: "Kapsul"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "py-1.5 pr-3",
                                                    children: "Protokol"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "py-1.5 pr-3",
                                                    children: "Byte"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "py-1.5",
                                                    children: "Waktu"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: kapsul.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-zinc-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-1.5 pr-3 font-mono text-zinc-300",
                                                        children: k.nama
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-1.5 pr-3 text-zinc-500",
                                                        children: k.protokol || '—'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-1.5 pr-3 font-mono text-zinc-400",
                                                        children: k.byte.toLocaleString('id-ID')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-1.5 text-zinc-500",
                                                        children: k.waktu.slice(0, 19).replace('T', ' ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, k.nama, true, {
                                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                                lineNumber: 201,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 199,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/arena/nadi-panel.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Kartu, {
                judul: "BUKTI ORGAN DI TUBUH SAKTI",
                ikon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                    className: "h-4 w-4 text-lime-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/arena/nadi-panel.tsx",
                    lineNumber: 216,
                    columnNumber: 55
                }, void 0),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 text-xs md:grid-cols-2",
                        children: [
                            [
                                'File',
                                `${ORGAN_BUKTI.file} — ${ORGAN_BUKTI.ukuran}`
                            ],
                            [
                                'Organ di dalam tubuh',
                                ORGAN_BUKTI.organSebelumnya + ' + V241-NADI'
                            ],
                            [
                                'SHA256 tubuh baru',
                                ORGAN_BUKTI.sha256
                            ],
                            [
                                'Verifikasi injeksi',
                                'marker v241 OK · 4 organ lama utuh · DOCTYPE + </html> utuh'
                            ]
                        ].map(([a, b])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-zinc-800 bg-zinc-900/50 p-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold text-lime-300",
                                        children: a
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-0.5 break-all text-zinc-500",
                                        children: b
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, a, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-start gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-3 text-[11px] text-emerald-200/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    'Lab di tab ini (tombol "Uji Tulis Kapsul") memakai implementasi hash yang sama persis dengan organ SAKTI dan runner ujian — ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        children: "prareg.ts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                        lineNumber: 234,
                                        columnNumber: 28
                                    }, this),
                                    " murni TS tanpa dependensi. Tiga implementasi independen (runner Bun, organ browser, server route) telah diverifikasi menghasilkan digest identik."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/arena/nadi-panel.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/arena/nadi-panel.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/arena/nadi-panel.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(NadiPanel, "Ykx4tIKHZNb8r6QHFoSQkU6uQkY=");
_c1 = NadiPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Kartu");
__turbopack_context__.k.register(_c1, "NadiPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_arena_6839bfe3._.js.map