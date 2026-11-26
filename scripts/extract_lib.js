// Extract every src/lib/exam + src/lib module from the lib chunk and save each body
const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync('/home/z/my-project/scrape/chunks/src_lib_exam_26268a4b._.js', 'utf8');
const re = /"\[project\]\/(src\/lib\/[^"]+?)\s\[app-client\] \(ecmascript\)", \(\(__turbopack_context__\) => \{/g;
let m;
const segs = [];
while ((m = re.exec(src)) !== null) segs.push({ name: m[1], start: m.index + m[0].length });

const out = {};
for (let i = 0; i < segs.length; i++) {
  const seg = segs[i];
  // brace match to end of module function body
  let depth = 1, j = seg.start, instr = null;
  while (depth > 0 && j < src.length) {
    const ch = src[j];
    if (instr) {
      if (ch === '\\') { j += 2; continue; }
      if (ch === instr) instr = null;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') instr = ch;
      else if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    j++;
  }
  const body = src.slice(seg.start, j - 1);
  const file = '/home/z/my-project/scrape/lib_' + seg.name.replace(/[\/\.]/g, '_') + '.js';
  fs.writeFileSync(file, body);
  out[seg.name] = body.length;
}
console.log(out);
