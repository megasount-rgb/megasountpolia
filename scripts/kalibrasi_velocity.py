#!/usr/bin/env python3
"""Kalibrasi model kecepatan ETA untuk Peta Waktu — tanpa lookahead.
Setiap model hanya boleh pakai data candle SEBELUM tanggal pivot.
Grade: TEPAT bila hari-nyata dalam [0.75, 1.33]×ETA; DEKAT bila dalam [0.6, 2.0]×ETA."""
import json, statistics, datetime

d = json.load(open('/home/z/my-project/db/elsa_cache_ELSAUSDT_D_200.json'))
cs = d['data']
n = len(cs)
C = [c['c'] for c in cs]
H = [c['h'] for c in cs]
L = [c['l'] for c in cs]
T = [c['t'] / 1000 for c in cs]

def median(a):
    return statistics.median(a) if a else 0

def atr_pct(i, n_=14):
    s = max(0, i - n_)
    trs = []
    for j in range(s + 1, i + 1):
        trs.append(max(H[j] - L[j], abs(C[j] - C[j-1]), abs(L[j] - C[j-1])) / C[j-1] * 100)
    return statistics.mean(trs)

# pivots (hasil deteksi sama seperti engine: local-min 5d & naik >= 20% dalam 60 hari, jarak >= 12 hr)
pivots = []
for i in range(40, n - 5):
    if C[i] > min(C[max(0, i-4):i+1]) * 1.001:
        continue
    naik = max(H[j] / C[i] - 1 for j in range(i + 1, min(n, i + 61)))
    if naik < 0.2:
        continue
    if pivots and i - pivots[-1] < 12:
        continue
    pivots.append(i)

def level_bulat(h):
    if h < 0.1: return -(-h // 0.01) * 0.01
    if h < 0.5: return -(-h // 0.05) * 0.05
    return -(-h // 0.1) * 0.1

def sasaran_of(i):
    harga = C[i]
    hi90 = max(H[max(0, i-89):i+1])
    bulat = level_bulat(harga * 1.25)
    return max(hi90 if hi90 > harga * 1.08 else 0, bulat)

def nyata_hari(i, sasaran):
    for j in range(i + 1, min(n, i + 91)):
        if H[j] >= sasaran:
            return j - i
    return None

models = {}
def reg(nama, fn):
    models[nama] = fn

def m1(i):  # current: max(medianUp14, dasar30*0.55) * 0.85
    moves = [(C[k]-C[k-1])/C[k-1]*100 for k in range(max(1, i-29), i+1)]
    up14 = [m for m in moves[-14:] if m > 0]
    return max(median(up14), median([abs(m) for m in moves]) * 0.55) * 0.85

def m2(i):  # directional efficiency x ATR
    moves = [(C[k]-C[k-1])/C[k-1]*100 for k in range(max(1, i-29), i+1)]
    p = sum(1 for m in moves if m > 0) / len(moves)
    return p * 0.62 * atr_pct(i)

def m3(i):  # blend 0.5 M1 + 0.5 M2
    return 0.5 * m1(i) + 0.5 * m2(i)

def m4(i):  # dasar30 * p_up
    moves = [(C[k]-C[k-1])/C[k-1]*100 for k in range(max(1, i-29), i+1)]
    p = sum(1 for m in moves if m > 0) / len(moves)
    return median([abs(m) for m in moves]) * p * 1.05

def m5(i):  # ATR*0.5
    return atr_pct(i) * 0.5

def m6(i):  # median |move| up-side days only x damping, min floor ATR*0.4
    moves = [(C[k]-C[k-1])/C[k-1]*100 for k in range(max(1, i-29), i+1)]
    ups = [m for m in moves if m > 0]
    return max(median(ups) * 0.75, atr_pct(i) * 0.4)

for nm, fn in [('M1-cur', m1), ('M2-eff-atr', m2), ('M3-blend', m3), ('M4-dasr-p', m4), ('M5-atr.5', m5), ('M6-up.75', m6)]:
    reg(nm, fn)

hasil = {nm: [] for nm in models}
for i in pivots:
    sas = sasaran_of(i)
    if not sas or sas <= C[i]:
        continue
    jarak = (sas / C[i] - 1) * 100
    ny = nyata_hari(i, sas)
    for nm, fn in models.items():
        eta = max(1, round(jarak / max(fn(i), 0.4)))
        if ny is None:
            hasil[nm].append(('TIDAK_TERJANGKAU', None))
        else:
            r = ny / eta
            g = 'TEPAT' if 0.75 <= r <= 1.33 else ('DEKAT' if 0.6 <= r <= 2.0 else 'MELESET')
            hasil[nm].append((g, ny - eta))

print(f"{'model':12} {'TEPAT':>6} {'DEKAT':>6} {'MELESET':>8} {'T.JANGK':>8} rerata|selisih|")
best = None
for nm in models:
    gs = [g for g, _ in hasil[nm]]
    sel = [abs(s) for _, s in hasil[nm] if s is not None]
    t = gs.count('TEPAT'); dk = gs.count('DEKAT'); ml = gs.count('MELESET'); tj = gs.count('TIDAK_TERJANGKAU')
    rr = statistics.mean(sel) if sel else None
    print(f"{nm:12} {t:>6} {dk:>6} {ml:>8} {tj:>8} {rr if rr is not None else '-':>10}")
    score = t * 2 + dk
    if best is None or score > best[1]:
        best = (nm, score)

print('\nBEST:', best)
print('\ndetail per pivot (model terbaik):')
nm = best[0]
for (i, (g, s)) in zip(pivots, hasil[nm]):
    sas = sasaran_of(i)
    ny = nyata_hari(i, sas)
    eta = max(1, round(((sas / C[i] - 1) * 100) / max(models[nm](i), 0.4)))
    print(f"  {datetime.datetime.utcfromtimestamp(T[i]).date()} @{C[i]:.4f} -> {sas:.4f} eta {eta}hr nyata {ny}hr selisih {s} {g}")
