# Project Rules — david-ai-learning

## Document Revision Chain

When any document is updated, check and update all related downstream files:

| Trigger | Must Also Update |
|---------|-----------------|
| Add/remove HTML in `docs/` | `node build-search-index.js` to rebuild `search-index.js` |
| Add/remove HTML in `docs/` | Add/remove entry in `mindmap.html` |
| Add/remove HTML in `docs/` | Add/remove entry in `learning-path.html` |
| Add/remove HTML in `docs/` | Dashboard (`index.html`) auto-reads meta tags — verify new docs appear correctly |
| Change doc metadata (title, tags, rating) | Rebuild search index + update mindmap entry + update learning-path entry |
| Change doc date or year | Grep all related files for stale dates |
| Add new tag category | Add tag color in `docs/styles.css` (when created) + update README Categories table |
| Update `docs-workflow/` templates | Check if examples still match template structure |

## File Relationships

```
docs/*.html (108 source files)
  ├── index.html          reads doc-* meta tags for dashboard (auto)
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
- Do NOT modify `index.html` (Tailwind dashboard) when changing docs
- Do NOT commit `.DS_Store`
