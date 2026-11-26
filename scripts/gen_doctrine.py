#!/usr/bin/env python3
"""Generate src/lib/elsa/doctrine-data.ts from scraped doctrine.json"""
import json

with open('/home/z/my-project/scrape/doctrine.json') as f:
    raw = json.load(f)

papers = raw['src/data/papers.ts']['PAPERS']
mods = []
for key, name in [
    ('src/data/mod-beranda.ts', 'modBeranda'),
    ('src/data/mod-definisi.ts', 'modDefinisi'),
    ('src/data/mod-arsitektur.ts', 'modArsitektur'),
    ('src/data/mod-kronologi.ts', 'modKronologi'),
    ('src/data/mod-aktor.ts', 'modAktor'),
    ('src/data/mod-bukti.ts', 'modBukti'),
    ('src/data/mod-blueprint.ts', 'modBlueprint'),
]:
    m = raw[key][name]
    mods.append(m)

kron = raw['src/data/mod-kronologi.ts'].get('KRONOLOGI_EVENTS', [])
orgs = raw['src/data/mod-aktor.ts'].get('ORGS', [])
people = raw['src/data/mod-aktor.ts'].get('PEOPLE', [])
nodes = raw['src/data/mod-blueprint.ts'].get('BLUEPRINT_NODES', [])

# modAktor embeds ORGS/PEOPLE references in blocks; replace with inline JSON strings
out = {
    'PAPERS': papers,
    'MODULS': mods,
    'KRONOLOGI_EVENTS': kron,
    'ORGS': orgs,
    'PEOPLE': people,
    'BLUEPRINT_NODES': nodes,
}

ts = '// AUTO-GENERATED dari scrape situs MICAPROFITA sumber — doktrin 9 modul + 41 paper.\n'
ts += '// Jangan edit manual; jalankan scripts/gen_doctrine.py untuk regenerasi.\n\n'
ts += 'export const DOCTRINE = '
ts += json.dumps(out, ensure_ascii=False, separators=(',', ':'))
ts += ' as const;\n\nexport type Paper = (typeof DOCTRINE.PAPERS)[number];\nexport type Modul = (typeof DOCTRINE.MODULS)[number];\n'

with open('/home/z/my-project/src/lib/elsa/doctrine-data.ts', 'w') as f:
    f.write(ts)
print('written', len(ts), 'bytes;', len(papers), 'papers,', len(mods), 'modules, sections:', sum(len(m.get('sections', [])) for m in mods))
