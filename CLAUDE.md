# Project Rules — david-ai-learning

## Quick Commands

| Task | Command |
|------|---------|
| Add new article (interactive) | `npm run add docs/<filename>.html` |
| Auto-classify new docs (batch) | `npm run classify` |
| Rebuild search index | `npm run build` |
| Rebuild dashboard data | `npm run build:dashboard` |
| Normalize HTML batch | `npm run normalize` |
| Setup git hooks (first time) | `npm run setup-hooks` |
| Standard commit (single doc) | `git commit -m "Add: transformer-attention (2026-03-29)"` |
| Standard commit (batch) | `git commit -m "Batch: 5 articles (2026-03-25~29)"` |
| Standard commit (fix) | `git commit -m "Fix: broken sidebar links in RAG doc"` |
| Standard commit (feature) | `git commit -m "Feature: add tag filter to dashboard"` |

## docs/processed/ Workflow

All HTML articles live in **`docs/processed/`** after indexing. The root `docs/` folder is the intake zone for new, unprocessed files.

| State | Location | Action |
|-------|----------|--------|
| New (unprocessed) | `docs/*.html` | Drop file here |
| Processed | `docs/processed/*.html` | Auto-moved here after indexing |

**Automatic processing (git pre-commit hook):**
1. Stage a new `.html` file anywhere in `docs/` root
2. Run `git commit` — the pre-commit hook detects unprocessed files
3. Hook runs `auto-classify.js` → classifies → moves to `docs/processed/` → rebuilds indexes → stages changes
4. Commit completes with everything indexed

**Manual processing:**
```bash
# Interactive (asks for stage/topic confirmation)
npm run add docs/2026-04-15_my-article.html

# Non-interactive batch (auto-classifies all new docs in docs/ root)
npm run classify
```

**File path convention:** All entries in `dashboard-data.js`, `search-index.js`, and `curriculum-data.js` store file paths as `processed/filename.html` (relative to `docs/`). Links resolve as `docs/processed/filename.html`.

## Context Efficiency

- **NEVER read `index.html`** unless the task specifically requires editing dashboard JS logic. It is 52K+ with a large hardcoded doc array — reading it wastes context on almost every task.
- Read `docs-workflow/` templates to understand doc format; do not infer format by reading existing docs in `docs/`.
- `search-index.js` is a large generated file — never read it directly.

## Document Revision Chain

When any document is updated, check and update all related downstream files:

| Trigger | Must Also Update |
|---------|-----------------|
| Add/remove HTML in `docs/` | 1. `node build-search-index.js` to rebuild `search-index.js` 2. `node build-dashboard-data.js` to rebuild `dashboard-data.js` 3. Add/remove entry in `curriculum-data.js` 4. Update "Last updated" date in `index.html` header to today's date |
| Change doc metadata (title, tags, rating) | Rebuild search index + update entry in `curriculum-data.js` |
| Change doc date or year | Grep all related files for stale dates |
| Add new tag category | Add tag color in `docs/styles.css` (when created) + update README Categories table |
| Update `docs-workflow/` templates | Check if examples still match template structure |

## File Relationships

```
docs/*.html (source files)
  ├── index.html          loads dashboard-data.js (built via build-dashboard-data.js)
  ├── dashboard-data.js   built from docs/ via build-dashboard-data.js
  ├── search-index.js     built from docs/ via build-search-index.js
  ├── curriculum-data.js   single source of truth for stages + topic clusters
  ├── mindmap.html         loads curriculum-data.js → generates markmap
  ├── learning-path.html   loads curriculum-data.js → renders progress tracker
  └── docs-workflow/       MD essence/cheatsheet summaries
```

## Terminal / Code Block Layout Rule

When a `content-grid` section has a large terminal or code block on the right side, do **not** put it in `content-right` if the block is wider than ~50% of the page (i.e., more than ~60 characters per line, or the block has multiple long lines).

Instead, restructure the section so the code block spans both columns:

```html
<div class="content-grid">
  <div class="content-left"><!-- text / bilingual block --></div>
  <div class="content-right"><!-- small callout or leave empty --></div>
  <div class="col-full">
    <div class="code-block">...</div>
  </div>
</div>
```

If there is no meaningful content for `content-right`, omit it entirely and place the code block in `col-full` directly after `content-left`:

```html
<div class="content-grid">
  <div class="content-left"><!-- text --></div>
  <div class="col-full">
    <div class="code-block">...</div>
  </div>
</div>
```

**Rule of thumb**: a terminal/code block that would make the right column taller than the left column → move it to `col-full`.

## Conventions

- HTML doc filenames: `YYYY-MM-DD_slug.html`
- All dates in doc content must match the file's year (e.g., `2026-01-*` files must not contain `2025-01`)
- `lang="zh-TW"` for all HTML files
- Google Fonts: Noto Sans TC + Source Code Pro only
- Do NOT manually edit `index.html` or `dashboard-data.js` — run `node build-dashboard-data.js` instead
- Do NOT commit `.DS_Store` (should also be in `.gitignore`)
