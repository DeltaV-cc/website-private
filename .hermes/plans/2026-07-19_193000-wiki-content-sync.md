# Obsidian Vault — Website Content Sync Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Sync the Obsidian vault (`C:\Users\Admin\DeltaV\wiki\`) with the new website content — catalog all blog posts, tutorials, service pages, design system, and deployment setup.

**Architecture:** Read-only inspection of the website repo, then write structured markdown docs into the Obsidian vault under `wiki/services/`, `wiki/design-system/`, `wiki/deployment/`, and `wiki/content/`.

**Tech Stack:** Bash for repo inspection, Obsidian-flavored markdown for vault docs.

---

### Task 1: Create directory structure in wiki

**Objective:** Create the subdirectories for new documentation sections.

**Files:**
- Create: `C:\Users\Admin\DeltaV\wiki\content\README.md`
- Create: `C:\Users\Admin\DeltaV\wiki\services\README.md`
- Create: `C:\Users\Admin\DeltaV\wiki\design-system\README.md`
- Create: `C:\Users\Admin\DeltaV\wiki\deployment\README.md`

**Step 1: Create directories**

```bash
mkdir -p /c/Users/Admin/DeltaV/wiki/{content,services,design-system,deployment}
```

**Step 2: Create placeholder READMEs**

Write a minimal YAML-frontmatter index for each directory, e.g.:

```markdown
---
title: Content Index
created: 2026-07-19
owner: chiefstaff
status: active
---

# Website Content Index

Complete catalog of all published content on deltav.cc and the private IntelHub.
```

**Verification:** `find /c/Users/Admin/DeltaV/wiki -type d | sort` shows the 4 new dirs.

---

### Task 2: Catalog all blog posts

**Objective:** Read every blog directory, extract title, date, category, excerpt, and write `wiki/content/blog-index.md`.

**Files:**
- Create: `C:\Users\Admin\DeltaV\wiki\content\blog-index.md`
- Read: `C:\Users\Admin\DeltaV\website\app\blog\*/` (14 directories)

**Step 1: Extract blog metadata**

Run a bash loop to extract title/date/category from each blog page:

```bash
for d in /c/Users/Admin/DeltaV/website/app/blog/*/; do
  slug=$(basename "$d")
  title=$(grep -m1 'title="' "$d/page.tsx" | sed 's/.*title="\([^"]*\)".*/\1/')
  date=$(grep -m1 'date="' "$d/page.tsx" | sed 's/.*date="\([^"]*\)".*/\1/')
  cat=$(grep -m1 'category="' "$d/page.tsx" | sed 's/.*category="\([^"]*\)".*/\1/')
  echo "| $slug | $title | $date | $cat |"
done
```

**Step 2: Write `blog-index.md`**

Format a table with columns: Slug, Title, Date, Category, Status.

```markdown
---
title: Blog Index
created: 2026-07-19
owner: chiefstaff
status: active
---

# Blog Content Catalog

| # | Title | Date | Category | Slug |
|---|-------|------|----------|------|
```

**Verification:** Table has 14+ rows matching `ls app/blog/*/ | wc -l`.

---

### Task 3: Catalog tutorials

**Objective:** Same as Task 2 but for tutorials.

**Files:**
- Create: `C:\Users\Admin\DeltaV\wiki\content\tutorial-index.md`
- Read: `C:\Users\Admin\DeltaV\website\app\tutorials\*/`

**Step 1: Extract tutorial metadata**

```bash
for d in /c/Users/Admin/DeltaV/website/app/tutorials/*/; do
  slug=$(basename "$d")
  title=$(grep -m1 'title="' "$d/page.tsx" 2>/dev/null | sed 's/.*title="\([^"]*\)".*/\1/')
  echo "| $slug | $title |"
done
```

**Step 2: Write table**

**Verification:** 4 tutorials found (hermes-qwen-dgx-spark, langchain-chatchat-ollama, muscriptor-music-to-midi, x402-sota-setup).

---

### Task 4: Catalog service pages

**Objective:** Document the 3 pillar pages (AI, Web3, OpSec) + Forge + Research.

**Files:**
- Create: `C:\Users\Admin\DeltaV\wiki\services\pillars.md`

**Step 1: Extract page descriptions**

Read the hero/description from each page:
- `app/ai/page.tsx` → title, description, offerings
- `app/web3/page.tsx` → title, description, offerings
- `app/forge/page.tsx` → title, description
- `app/opsec/page.tsx` → title, description
- `app/research/page.tsx` → title, description

**Step 2: Write structured doc**

```markdown
---
title: Service Pillars
created: 2026-07-19
owner: chiefstaff
---

# Service Pillars

| Pillar | URL | Description | Offerings |
|--------|-----|-------------|-----------|
| AI Engineering | /ai/ | ... | Multi-agent, inference, retainer |
| Web3 | /web3/ | ... | SOTA setup, OSINT, growth |
| Forge | /forge/ | ... | Blog, tutorials, courses |
| OpSec | /opsec/ | ... | Linux/Mac/Windows guides |
| Research | /research/ | ... | Searchable content index |
```

**Verification:** 5 pillars documented with accurate descriptions from source.

---

### Task 5: Document the design system

**Objective:** Catalog all shared components, CSS variables, and visual primitives.

**Files:**
- Create: `C:\Users\Admin\DeltaV\wiki\design-system\components.md`
- Create: `C:\Users\Admin\DeltaV\wiki\design-system\tokens.md`
- Read: `C:\Users\Admin\DeltaV\website\app\components\*/`
- Read: `C:\Users\Admin\DeltaV\website\app\globals.css`

**Step 1: List all components**

```bash
ls /c/Users/Admin/DeltaV/website/app/components/*.tsx
```

Extract the export name from each file (first line matching `export default function`).

**Step 2: Extract CSS tokens**

```bash
grep -o 'var(--[a-z-]*' /c/Users/Admin/DeltaV/website/app/globals.css | sort -u
```

**Step 3: Write components.md**

Table: Component Name | File | Purpose

**Step 4: Write tokens.md**

Group CSS variables: accent colors, background colors, text colors, border colors, glow effects.

**Verification:** 20+ components listed. 14 accent colors documented.

---

### Task 6: Document deployment

**Objective:** Capture the full deployment pipeline — repos, branches, hosting, workflows.

**Files:**
- Create: `C:\Users\Admin\DeltaV\wiki\deployment\hosting.md`
- Create: `C:\Users\Admin\DeltaV\wiki\deployment\repos.md`
- Read: `C:\Users\Admin\DeltaV\website\.github\workflows\deploy.yml`
- Read: `C:\Users\Admin\DeltaV\website\wrangler.toml`

**Step 1: Write repos.md**

```markdown
# Repositories

| Repo | URL | Visibility | Content |
|------|-----|-----------|---------|
| DeltaV-cc/website | github.com/DeltaV-cc/website | Public | Original deltav.cc static site |
| DeltaV-cc/website-private | github.com/DeltaV-cc/website-private | Private | Full IntelHub + new site |
```

**Step 2: Write hosting.md**

```markdown
# Hosting

| Component | Host | URL | Config |
|-----------|------|-----|--------|
| Public site | Cloudflare Pages | deltav.cc | ... |
| IntelHub | GitHub Pages | deltav-cc.github.io/website-private/ | deploy.yml |
| CORS proxy | Cloudflare Workers | proxy.hub.deltav.cc (planned) | wrangler.toml |
```

**Step 3: Document build pipeline**

Steps from `deploy.yml`: checkout → python pre-build → pnpm build → deploy to Pages.

**Verification:** Both docs accurately reflect current state.

---

### Task 7: Update wiki index

**Objective:** Update `wiki/index.md` to link all new docs and remove "Known Gaps".

**Files:**
- Modify: `C:\Users\Admin\DeltaV\wiki\index.md`

**Step 1: Add new sections**

Add "Content", "Services", "Design System", "Deployment" to the index table.

**Step 2: Update total count**

Change "Total pages: 77" to the new count (77 + ~8 new docs = ~85).

**Step 3: Remove resolved gaps**

Remove items now covered by new docs from "Known Gaps".

**Verification:** Index links to all new docs. No broken links.

---

### Task 8: Commit all wiki changes

**Objective:** Track changes to the wiki vault.

**Step 1:** (Wiki is not a git repo — skip commit. Everything lives in Obsidian which auto-saves.)

**Verification:** `find /c/Users/Admin/DeltaV/wiki -name "*.md" | wc -l` shows 85+ files.

---

## Risks & Notes

- **Obsidian is not a git repo** — changes are durable on disk but have no version history. Consider `git init` in the wiki directory.
- **3 missing cron scripts** (defi_weekly_collect, wiki-backup, macro-pull) remain unresolved — not part of this content sync plan.
- **Website is actively evolving** — this sync captures a snapshot. Schedule weekly updates via `zhc-wiki-lint`.

---

## Total: 8 tasks, ~30 minutes
