# Project Rules — david-ai-learning

## Quick Commands

| Task | Command |
|------|---------|
| Add new article | `npm run add <filename>` |
| Rebuild search index | `npm run build` |
| Normalize HTML batch | `npm run normalize` |
| Standard commit (single doc) | `git commit -m "Add: transformer-attention (2026-03-29)"` |
| Standard commit (batch) | `git commit -m "Batch: 5 articles (2026-03-25~29)"` |
| Standard commit (fix) | `git commit -m "Fix: broken sidebar links in RAG doc"` |
| Standard commit (feature) | `git commit -m "Feature: add tag filter to dashboard"` |

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

## Conventions

- HTML doc filenames: `YYYY-MM-DD_slug.html`
- All dates in doc content must match the file's year (e.g., `2026-01-*` files must not contain `2025-01`)
- `lang="zh-TW"` for all HTML files
- Google Fonts: Noto Sans TC + Source Code Pro only
- Do NOT manually edit `index.html` or `dashboard-data.js` — run `node build-dashboard-data.js` instead
- Do NOT commit `.DS_Store` (should also be in `.gitignore`)
