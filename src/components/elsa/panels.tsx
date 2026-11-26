'use client';

// ============================================================
// MICAPROFITA · ARENA ELSA — komponen konsol satu koin.
// Port tampilan doktrin & arena dari situs sumber, difokus
// pada satu koin: ELSA/USDT (Bybit).
// ============================================================
import React from 'react';
import { DOCTRINE } from '@/lib/elsa/doctrine-data';

export const fmtHarga = (v: number | null | undefined): string => {
  if (v === null || v === undefined || !Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1000) return v.toFixed(2);
  if (a >= 1) return v.toFixed(4);
  if (a >= 0.01) return v.toFixed(5);
  return v.toFixed(7);
};
export const pct = (v: number | null | undefined, d = 2): string =>
  v === null || v === undefined || !Number.isFinite(v) ? '—' : `${v >= 0 ? '+' : ''}${v.toFixed(d)}%`;

export function Kartu({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur ${className}`}>{children}</div>
  );
}

export function JudulKecil({ children, warna = 'text-amber-300' }: { children: React.ReactNode; warna?: string }) {
  return <h4 className={`mb-2 text-[11px] font-bold uppercase tracking-[0.18em] ${warna}`}>{children}</h4>;
}

export function Badge({ children, tone = 'netral' }: { children: React.ReactNode; tone?: 'hijau' | 'merah' | 'amber' | 'ungu' | 'netral' }) {
  const m: Record<string, string> = {
    hijau: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    merah: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    ungu: 'bg-violet-500/15 text-violet-300 border-violet-500/40',
    netral: 'bg-white/10 text-neutral-300 border-white/20',
  };
  return <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${m[tone]}`}>{children}</span>;
}

export function BarSkor({ label, v }: { label: string; v: number }) {
  const p = Math.max(0, Math.min(1, v)) * 100;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-neutral-400">{label}</span>
        <span className="font-mono text-neutral-200">{v.toFixed(2)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${p >= 60 ? 'bg-emerald-400' : p >= 35 ? 'bg-amber-400' : 'bg-rose-400'}`}
          style={{ width: `${p}%` }}
        />
      </div>
    </div>
  );
}

// ---------------- grafik garis SVG (equity / harga) ----------------
export function GrafikGaris({ data, tinggi = 160, warna = '#34d399', label }: { data: number[]; tinggi?: number; warna?: string; label: string }) {
  if (!data.length) return null;
  const min = Math.min(...data, 0);
  const max = Math.max(...data, 0.0001);
  const w = 560;
  const x = (i: number) => (i / Math.max(data.length - 1, 1)) * (w - 8) + 4;
  const y = (v: number) => tinggi - 8 - ((v - min) / Math.max(max - min, 1e-9)) * (tinggi - 16);
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const zero = y(0);
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-widest text-neutral-400">{label}</div>
      <svg viewBox={`0 0 ${w} ${tinggi}`} className="w-full">
        <line x1={0} x2={w} y1={zero} y2={zero} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
        <path d={path} fill="none" stroke={warna} strokeWidth={2} />
        <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r={3} fill={warna} />
      </svg>
    </div>
  );
}

// ---------------- candlestick SVG ----------------
export function GrafikCandle({ candle }: { candle: { o: number; h: number; l: number; c: number; t: string }[] }) {
  if (!candle.length) return null;
  const w = 720;
  const h = 200;
  const lo = Math.min(...candle.map((c) => c.l));
  const hi = Math.max(...candle.map((c) => c.h));
  const y = (v: number) => h - 10 - ((v - lo) / Math.max(hi - lo, 1e-9)) * (h - 20);
  const bw = (w - 16) / candle.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {candle.map((c, i) => {
        const cx = 8 + i * bw + bw / 2;
        const naik = c.c >= c.o;
        const col = naik ? '#34d399' : '#fb7185';
        const bodyTop = y(Math.max(c.o, c.c));
        const bodyBot = y(Math.min(c.o, c.c));
        return (
          <g key={c.t}>
            <line x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} stroke={col} strokeWidth={1} opacity={0.8} />
            <rect x={cx - Math.max(bw * 0.32, 1.2)} y={bodyTop} width={Math.max(bw * 0.64, 2.4)} height={Math.max(bodyBot - bodyTop, 1)} fill={col} />
          </g>
        );
      })}
    </svg>
  );
}

// ---------------- gauge busur (0-100) ----------------
export function GaugeArc({ pct, label, sub }: { pct: number; label: string; sub?: string }) {
  const p = Math.max(0, Math.min(100, pct));
  const w = 200;
  const h = 110;
  const cx = w / 2;
  const cy = 96;
  const r = 78;
  const a = Math.PI * (1 - p / 100);
  const nx = cx + r * Math.cos(a);
  const ny = cy - r * Math.sin(a);
  const warna = p >= 70 ? '#34d399' : p >= 45 ? '#fbbf24' : '#fb7185';
  const arc = (dari: number, ke: number, col: string, wd: number) => {
    const a1 = Math.PI * (1 - dari / 100);
    const a2 = Math.PI * (1 - ke / 100);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy - r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy - r * Math.sin(a2);
    return <path d={`M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}`} fill="none" stroke={col} strokeWidth={wd} strokeLinecap="round" />;
  };
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-widest text-neutral-400">{label}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
        {arc(0, 100, 'rgba(255,255,255,0.08)', 10)}
        {arc(0, Math.max(p, 0.5), warna, 10)}
        <circle cx={nx} cy={ny} r={5} fill={warna} />
        <text x={cx} y={72} textAnchor="middle" className="fill-neutral-100" style={{ fontSize: 26, fontWeight: 900 }}>{p.toFixed(0)}%</text>
        {sub && <text x={cx} y={h - 6} textAnchor="middle" className="fill-neutral-400" style={{ fontSize: 10 }}>{sub}</text>}
      </svg>
    </div>
  );
}

// ---------------- grafik batang +/- (funding, arus whale) ----------------
export function GrafikBatang({ data, tinggi = 110, label, satuan }: { data: number[]; tinggi?: number; label: string; satuan?: string }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((v) => Math.abs(v)), 1e-9);
  const w = 560;
  const bw = (w - 8) / data.length;
  const zero = tinggi / 2;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400">
        <span>{label}</span>
        {satuan && <span className="font-mono text-neutral-500">{satuan}</span>}
      </div>
      <svg viewBox={`0 0 ${w} ${tinggi}`} className="w-full">
        <line x1={0} x2={w} y1={zero} y2={zero} stroke="rgba(255,255,255,0.15)" />
        {data.map((v, i) => {
          const hh = (Math.abs(v) / max) * (tinggi / 2 - 6);
          return (
            <rect key={i} x={4 + i * bw} width={Math.max(bw * 0.6, 2)} y={v >= 0 ? zero - hh : zero} height={Math.max(hh, 1)} fill={v >= 0 ? '#34d399' : '#fb7185'} opacity={0.85} rx={1} />
          );
        })}
      </svg>
    </div>
  );
}

// ---------------- peta likuidasi (miror: long di bawah, short di atas) ----------------
export function PetaLikuidasi({ bands, harga, topLong, topShort, magnet }: {
  bands: { jarakPct: number; harga: number; longUsd: number; shortUsd: number }[];
  harga: number;
  topLong: { harga: number; usd: number; jarakPct: number }[];
  topShort: { harga: number; usd: number; jarakPct: number }[];
  magnet: { sisi: string; harga: number; usd: number; jarakPct: number } | null;
}) {
  if (!bands.length) return null;
  const H = 560;
  const W = 620;
  const mid = H / 2;
  const maxUsd = Math.max(...bands.map((b) => Math.max(b.longUsd, b.shortUsd)), 1);
  const barH = (H - 24) / bands.length;
  const y = (jarakPct: number) => mid - (jarakPct / 15) * (mid - 12) - barH / 2;
  const wBar = (usd: number) => (usd / maxUsd) * 210;
  const hargaFmt = (v: number) => (v < 0.01 ? v.toFixed(6) : v.toFixed(4));
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* sisi short (atas) */}
        {bands.map((b, i) => b.shortUsd > 0 ? (
          <rect key={`s${i}`} x={W / 2 + 6} y={y(b.jarakPct)} width={Math.max(wBar(b.shortUsd), 1)} height={Math.max(barH * 0.8, 1)} fill="#fb7185" opacity={0.75} rx={1} />
        ) : null)}
        {/* sisi long (bawah) */}
        {bands.map((b, i) => b.longUsd > 0 ? (
          <rect key={`l${i}`} x={W / 2 - 6 - Math.max(wBar(b.longUsd), 1)} y={y(b.jarakPct)} width={Math.max(wBar(b.longUsd), 1)} height={Math.max(barH * 0.8, 1)} fill="#34d399" opacity={0.75} rx={1} />
        ) : null)}
        {/* garis harga sekarang */}
        <line x1={W / 2 - 226} x2={W / 2 + 226} y1={mid} y2={mid} stroke="#fbbf24" strokeWidth={1.5} />
        <text x={W / 2 + 228} y={mid + 4} className="fill-amber-300" style={{ fontSize: 11, fontWeight: 700 }}>harga {hargaFmt(harga)}</text>
        {/* label jarak */}
        {[-15, -10, -5, 5, 10, 15].map((d) => {
          const yy = mid - (d / 15) * (mid - 12);
          return (
            <g key={d}>
              <line x1={W / 2 - 232} x2={W / 2 - 226} y1={yy} y2={yy} stroke="rgba(255,255,255,0.25)" />
              <text x={W / 2 - 238} y={yy + 3} textAnchor="end" className="fill-neutral-500" style={{ fontSize: 9 }}>{d > 0 ? `+${d}%` : `${d}%`}</text>
            </g>
          );
        })}
        {/* label cluster terbesar */}
        {[...topLong.slice(0, 1), ...topShort.slice(0, 1)].map((t, i) => (
          <text key={i} x={t.jarakPct === 0 ? W / 2 + 8 : W / 2 - 8} y={mid - (t.jarakPct / 15) * (mid - 12) + 3}
            textAnchor={t.jarakPct === 0 ? 'start' : 'end'}
            className="fill-neutral-300" style={{ fontSize: 9, fontWeight: 600 }}>
            {t.jarakPct === 0 ? `+${(t.usd / 1e6).toFixed(1)}jt` : `−${(t.usd / 1e6).toFixed(1)}jt @ ${hargaFmt(t.harga)}`}
          </text>
        ))}
      </svg>
      <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-neutral-400">
        <span><span className="mr-1 inline-block h-2 w-3 rounded-sm bg-emerald-400" />likuidasi LONG di bawah harga (bahan bakar drop)</span>
        <span><span className="mr-1 inline-block h-2 w-3 rounded-sm bg-rose-400" />likuidasi SHORT di atas harga (bahan bakar squeeze)</span>
        {magnet && <span className="text-amber-300">magnet terbesar: {magnet.sisi === 'long' ? 'LONG' : 'SHORT'} @ {hargaFmt(magnet.harga)} ({magnet.sisi === 'long' ? '−' : '+'}{magnet.jarakPct.toFixed(1)}%) ≈ {(magnet.usd / 1e6).toFixed(1)} jt USD</span>}
      </div>
    </div>
  );
}
type Blok = { type: string; text?: string; title?: string; tone?: string; value?: string; label?: string; items?: unknown[]; headers?: string[]; rows?: string[][]; ids?: string[]; ordered?: boolean; source?: string };
type Seksi = { id: string; title: string; kicker?: string; blocks: Blok[]; source?: string };
export type Modul = { id: string; label: string; short: string; tagline?: string; sections: Seksi[]; color?: string };

const TONE_CALL: Record<string, string> = {
  amber: 'border-amber-500/40 bg-amber-500/10',
  rose: 'border-rose-500/40 bg-rose-500/10',
  violet: 'border-violet-500/40 bg-violet-500/10',
  teal: 'border-teal-500/40 bg-teal-500/10',
  emerald: 'border-emerald-500/40 bg-emerald-500/10',
};
const papersById = new Map(DOCTRINE.PAPERS.map((p) => [p.id, p]));

export function RenderBlok({ b }: { b: Blok }) {
  if (b.type === 'paragraph') return <p className="mb-3 text-sm leading-relaxed text-neutral-300">{b.text}</p>;
  if (b.type === 'quote')
    return (
      <blockquote className="mb-3 border-l-2 border-amber-400/60 pl-3 text-sm italic text-neutral-300">
        {b.text}
        {b.source ? <footer className="mt-1 text-[11px] not-italic text-neutral-500">— {b.source}</footer> : null}
      </blockquote>
    );
  if (b.type === 'callout')
    return (
      <div className={`mb-3 rounded-lg border p-3 ${TONE_CALL[b.tone ?? 'amber'] ?? TONE_CALL.amber}`}>
        {b.title ? <div className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-100">{b.title}</div> : null}
        <p className="text-sm text-neutral-300">{b.text}</p>
      </div>
    );
  if (b.type === 'stats')
    return (
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {(b.items as { value: string; label: string }[]).map((s, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-lg font-bold text-amber-300">{s.value}</div>
            <div className="mt-1 text-[11px] leading-snug text-neutral-400">{s.label}</div>
          </div>
        ))}
      </div>
    );
  if (b.type === 'list')
    return (
      <ul className={`mb-3 space-y-1 text-sm text-neutral-300 ${b.ordered ? 'list-decimal' : 'list-disc'} pl-5`}>
        {(b.items as string[]).map((it, i) => (
          <li key={i} className="leading-relaxed">{it}</li>
        ))}
      </ul>
    );
  if (b.type === 'table')
    return (
      <div className="mb-3 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[420px] text-left text-[12px]">
          <thead className="bg-white/5 text-neutral-300">
            <tr>{(b.headers ?? []).map((hd, i) => <th key={i} className="px-2 py-1.5 font-semibold">{hd}</th>)}</tr>
          </thead>
          <tbody className="text-neutral-400">
            {(b.rows ?? []).map((r, i) => (
              <tr key={i} className="border-t border-white/5">
                {r.map((c, j) => <td key={j} className="px-2 py-1.5">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.type === 'papers')
    return (
      <div className="mb-3 space-y-2">
        {(b.ids ?? []).map((id) => {
          const p = papersById.get(id);
          if (!p) return null;
          return (
            <div key={id} className="rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="text-sm font-semibold text-neutral-100">{p.title}</div>
              <div className="mt-0.5 text-[11px] text-neutral-400">
                {p.authors} · {p.year} · {p.venue}
              </div>
              <p className="mt-1 text-[12px] leading-snug text-neutral-300">{p.claim}</p>
              <a href={p.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[11px] text-teal-300 hover:underline">
                {p.url}
              </a>
            </div>
          );
        })}
      </div>
    );
  return null;
}

export function PanelModul({ modul }: { modul: Modul }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">{modul.label}</div>
      {modul.tagline ? <p className="mb-4 text-sm text-neutral-400">{modul.tagline}</p> : null}
      {modul.sections.map((s) => (
        <section key={s.id} className="mb-6">
          {s.kicker ? <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">{s.kicker}</div> : null}
          <h3 className="mb-3 text-base font-bold text-neutral-100">{s.title}</h3>
          {s.blocks.map((b, i) => (
            <RenderBlok key={i} b={b} />
          ))}
        </section>
      ))}
    </div>
  );
}

export function cariDoktrin(q: string) {
  const qq = q.trim().toLowerCase();
  if (qq.length < 2) return [];
  const out: { jenis: 'seksi' | 'paper'; modul?: string; judul: string; kutip: string; id?: string }[] = [];
  for (const m of DOCTRINE.MODULS) {
    for (const s of m.sections) {
      if (s.title.toLowerCase().includes(qq) || (s.kicker ?? '').toLowerCase().includes(qq)) {
        out.push({ jenis: 'seksi', modul: m.label, judul: s.title, kutip: (s.blocks[0]?.text ?? '').slice(0, 160) });
      }
      for (const b of s.blocks) {
        const txt = (typeof b.text === 'string' ? b.text : '') || b.title || '';
        if (txt && txt.toLowerCase().includes(qq)) {
          out.push({ jenis: 'seksi', modul: m.label, judul: s.title, kutip: txt.slice(0, 160) });
          break;
        }
      }
    }
  }
  for (const p of DOCTRINE.PAPERS) {
    if (p.title.toLowerCase().includes(qq) || p.claim.toLowerCase().includes(qq) || p.authors.toLowerCase().includes(qq)) {
      out.push({ jenis: 'paper', judul: `${p.title} (${p.year})`, kutip: p.claim, id: p.id });
    }
  }
  return out.slice(0, 12);
}
