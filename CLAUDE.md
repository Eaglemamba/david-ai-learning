# Project Rules — david-ai-learning

## Document Revision Chain

When any document is updated, check and update all related downstream files:

| Trigger | Must Also Update |
|---------|-----------------|
| Add/remove HTML in `docs/` | `node build-search-index.js` to rebuild `search-index.js` |
| Add/remove HTML in `docs/` | `node build-dashboard-data.js` to rebuild `dashboard-data.js` |
| Add/remove HTML in `docs/` | Add/remove entry in `mindmap.html` |
| Add/remove HTML in `docs/` | Add/remove entry in `learning-path.html` |
| Change doc metadata (title, tags, rating) | Rebuild search index + update mindmap entry + update learning-path entry |
| Change doc date or year | Grep all related files for stale dates |
| Add new tag category | Add tag color in `docs/styles.css` (when created) + update README Categories table |
| Update `docs-workflow/` templates | Check if examples still match template structure |

## File Relationships

```
docs/*.html (120 source files)
  ├── index.html          loads dashboard-data.js (built via build-dashboard-data.js)
  ├── dashboard-data.js   built from docs/ via build-dashboard-data.js
  ├── search-index.js     built from docs/ via build-search-index.js
  ├── mindmap.html         manually curated topic clusters
  ├── learning-path.html   structured learning progression
  └── docs-workflow/       MD essence/cheatsheet summaries
```

## Conventions

- HTML doc filenames: `YYYY-MM-DD_slug.html`
- All dates in doc content must match the file's year (e.g., `2026-01-*` files must not contain `2025-01`)
- `lang="zh-TW"` for all HTML files
- Google Fonts: Noto Sans TC + Source Code Pro only
- Do NOT manually edit `index.html` or `dashboard-data.js` — run `node build-dashboard-data.js` instead
- Do NOT commit `.DS_Store`
