# Project Rules — david-ai-learning

## Quick Commands

| Task | Command |
|------|---------|
| Add new article | `npm run add <filename>` |
| Rebuild search index | `npm run build` |
| Normalize HTML batch | `npm run normalize` |
| Standard commit (single doc) | `git commit -m "Add: <slug> (<date>)"` |
| Standard commit (batch) | `git commit -m "Batch: <N> articles (<date-range>)"` |
| Standard commit (fix) | `git commit -m "Fix: <what>"` |
| Standard commit (feature) | `git commit -m "Feature: <what>"` |

## Context Efficiency

- **NEVER read `index.html`** unless the task specifically requires editing dashboard JS logic. It is 52K with a hardcoded 108-doc array — reading it wastes context on almost every task.
- Read `docs-workflow/` templates to understand doc format; do not infer format by reading existing docs in `docs/`.
- `search-index.js` is a generated 981K file — never read it directly.

## Document Revision Chain

When any document is updated, check and update all related downstream files:

| Trigger | Must Also Update |
|---------|-----------------|
| Add/remove HTML in `docs/` | `node build-search-index.js` to rebuild `search-index.js` |
| Add/remove HTML in `docs/` | `node build-dashboard-data.js` to rebuild `dashboard-data.js` |
| Add/remove HTML in `docs/` | Add/remove entry in `curriculum-data.js` (feeds both mindmap + learning-path) |
| Change doc metadata (title, tags, rating) | Rebuild search index + update entry in `curriculum-data.js` |
| Change doc date or year | Grep all related files for stale dates |
| Add new tag category | Add tag color in `docs/styles.css` (when created) + update README Categories table |
| Add/remove HTML in `docs/` | Update "Last updated" date in `index.html` header to today's date |
| Update `docs-workflow/` templates | Check if examples still match template structure |

## File Relationships

```
docs/*.html (126 source files)
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
- Do NOT commit `.DS_Store`
