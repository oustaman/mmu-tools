#!/usr/bin/env bash
# Prepare a publish of the Screen Design site. GitHub Pages serves main; the module is developed on
# screen-design-2026-27, which is never merged. This copies modules/sd from the branch onto a commit
# on top of origin/main, in a separate worktree, and stops: it does not push.
#   tools/publish_sd.sh "Screen Design: what changed"
# Then, once the owner has said yes:
#   git push origin publish-sd:main
set -euo pipefail
MSG=${1:?a commit message, please}
REPO=$(git rev-parse --show-toplevel)
SRC=screen-design-2026-27
WT=${SD_PUB:-${TMPDIR:-/tmp}/sd-publish}
# these four stay off main
OFF=(ScreenDesign202627-ModuleSpecification.docx Screen_Design_Assessment_Brief_CAF.2025-26.original.docx Screen_Design_Assessment_Brief_CAF.docx screen-design.docx)

git -C "$REPO" worktree prune
git -C "$REPO" fetch -q origin main
[ -d "$WT/.git" ] || [ -f "$WT/.git" ] || git -C "$REPO" worktree add -q --force -B publish-sd "$WT" origin/main
cd "$WT"
git checkout -q -B publish-sd origin/main
# mirror the branch's folder, deletions included, then put back what main keeps its own way
git rm -rq --ignore-unmatch modules/sd
git checkout "$SRC" -- modules/sd
for f in "${OFF[@]}"; do git rm -q --cached --ignore-unmatch "modules/sd/$f"; rm -f "modules/sd/$f"; done
git checkout origin/main -- modules/sd/.DS_Store 2>/dev/null || true
python3 modules/sd/tools/stamp_assets.py modules/sd
git add -A modules/sd
if git diff --cached --quiet; then echo "Nothing to publish."; exit 0; fi
git commit -q -m "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git --no-pager log --oneline -1
git --no-pager diff --stat origin/main HEAD -- | tail -30
echo
for f in "${OFF[@]}"; do git ls-files --error-unmatch "modules/sd/$f" >/dev/null 2>&1 && { echo "STOP: $f is on the publish commit"; exit 1; }; done
echo "Only modules/sd changed: $(git diff --name-only origin/main HEAD | grep -vc '^modules/sd/' || true) other files."
echo "Not pushed. To publish: git push origin publish-sd:main"
