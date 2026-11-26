#!/usr/bin/env bash
# GOLDEN ELSA — sinkronisasi perkembangan ke GitHub
# Struktur GitHub: seluruh proyek berada DI DALAM folder "Elsa/" (tidak ada di luar).
# Pemakaian: bash scripts/github-update.sh "pesan perkembangan: apa yang berubah"
# Disiplin: tiap perkembangan juga dicatat 1 baris di docs/RIWAYAT-PERKEMBANGAN.md
set -euo pipefail
cd "$(dirname "$0")/.."

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "Pemakaian: bash scripts/github-update.sh \"pesan perkembangan\""
  exit 1
fi

# 1) Commit di sejarah utama (lokal, struktur datar)
git add -A
if git diff --cached --quiet; then
  echo "(lokal: tidak ada perubahan baru untuk commit)"
else
  git commit -m "$MSG"
fi

# 2) Mirror ke folder Elsa/ di worktree .git-deploy (cabang gh-main)
WT=".git-deploy"
if [ ! -d "$WT/Elsa" ]; then
  echo "Worktree $WT belum siap. Setup sekali:"
  echo "  git worktree add -b gh-main $WT"
  exit 1
fi
rm -rf "$WT/Elsa"
mkdir -p "$WT/Elsa"
git archive HEAD | tar -x -C "$WT/Elsa"

git -C "$WT" add -A
if ! git -C "$WT" diff --cached --quiet; then
  git -C "$WT" commit -m "GitHub: $MSG"
fi

# 3) Push cabang gh-main -> main GitHub (folder Elsa/ tetap utuh)
git -C "$WT" push origin gh-main:main

echo ""
echo "Selesai: perkembangan tersimpan DI DALAM folder Elsa/ di GitHub."
echo "Jangan lupa tambahkan 1 baris di docs/RIWAYAT-PERKEMBANGAN.md bila belum."
