// Extract all doctrine module exports from the Turbopack chunk
const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync('/home/z/my-project/scrape/chunks/src_data_4611600a._.js', 'utf8');

const registry = {};

// Find each module segment: "[project]/src/data/xxx.ts [app-client] (ecmascript)", ((__turbopack_context__) => { ... })
const re = /"\[project\]\/(src\/data\/[^"]+?)\s\[app-client\] \(ecmascript\)", \(\(__turbopack_context__\) => \{/g;
let m;
const segments = [];
while ((m = re.exec(src)) !== null) {
  segments.push({ name: m[1], start: m.index + m[0].length });
}

for (let i = 0; i < segments.length; i++) {
  const seg = segments[i];
  // Find the matching closing brace of the module function body by brace counting
  let depth = 1, j = seg.start;
  let inStr = null;
  while (j < src.length && depth > 0) {
    const ch = src[j];
    if (inStr) {
      if (ch === '\\') { j += 2; continue; }
      if (ch === inStr) inStr = null;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') inStr = ch;
      else if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    j++;
  }
  const body = src.slice(seg.start, j - 1); // exclude final closing brace
  const mod = { exports: {} };
  const lazyGetters = [];
  const ctx = {
    globalThis: { TURBOPACK: [] },
    document: undefined,
    __turbopack_context__: {
      s: (defs) => {
        for (let i = 0; i < defs.length; i += 2) {
          const name = defs[i];
          const getter = defs[i + 1];
          lazyGetters.push([mod.exports, name, getter]);
        }
      },
      i: () => {},
      r: () => {},
      k: { registerExports: () => {} },
      m: mod,
      x: () => {},
    },
  };
  try {
    vm.runInNewContext(body, ctx, { timeout: 30000 });
    for (const [target, name, getter] of lazyGetters) {
      try { target[name] = getter(); } catch (e) { target[name] = undefined; }
    }
    registry[seg.name] = mod.exports;
  } catch (e) {
    registry[seg.name] = { __error: e.message };
  }
}

fs.writeFileSync('/home/z/my-project/scrape/doctrine.json', JSON.stringify(registry, null, 1));
const summary = {};
for (const [k, v] of Object.entries(registry)) {
  if (v && v.__error) { summary[k] = 'ERROR: ' + v.__error; continue; }
  const keys = Object.keys(v);
  summary[k] = keys.map(n => {
    const val = v[n];
    if (val && val.sections) return `${n}: module with ${val.sections.length} sections (id=${val.id}, label=${val.label})`;
    if (Array.isArray(val)) return `${n}: array[${val.length}]`;
    return `${n}: ${typeof val}`;
  });
}
console.log(JSON.stringify(summary, null, 1));
