# Search Index & Dashboard Search Feature — Workflow Summary

**Date:** 2026-02-22
**Repo:** [Eaglemamba/david-ai-learning](https://github.com/Eaglemamba/david-ai-learning)

---

## What We Built

A full-text search system for 87 educational HTML documents, consisting of two parts:

1. **`build-search-index.js`** — Node.js script that parses all HTML docs and generates a search index
2. **Dashboard search UI** — Enhanced `index.html` with deep content search, relevance ranking, and visual indicators

---

## Part 1: Search Index Builder

### How It Works

```
docs/*.html  →  build-search-index.js  →  search-index.js
(87 files)       (Node.js parser)         (770 entries)
```

### What It Extracts

From each HTML file's `<head>`:
```html
<meta name="doc-date" content="2026-01-10">
<meta name="doc-title" content="Document Title">
<meta name="doc-source" content="Author / Source">
<meta name="doc-tags" content="Prompt,LLM,Tool">
<meta name="doc-rating" content="4.4">
<meta name="doc-file" content="filename.html">
```

From each HTML file's `<body>`:
- Splits content by `<h2>` and `<h3>` headings
- Each heading becomes a **section** with:
  - `sectionId` — slugified heading text
  - `sectionTitle` — original heading text
  - `content` — plain text (HTML stripped), max 500 chars

### Output Format (`search-index.js`)

```javascript
const searchIndex = [
  {
    docFile: "2026-01-10_context-engineering.html",
    docTitle: "Context Engineering - Anthropic",
    docDate: "2026-01-10",
    docSource: "Anthropic",
    docRating: 4.4,
    docTags: ["Prompt", "LLM"],
    sectionId: "part-1",
    sectionTitle: "Part I: Context Engineering vs Prompt Engineering",
    content: "Plain text content..."
  },
  // ... 770 entries total
];
```

### Special Rule: Single-Section Files

- Files with only 1 section (no h2/h3 headings): content limit **1500 chars**
- Files with multiple sections: content limit **500 chars** per section
- 17 out of 87 files are single-section

### Usage

```bash
# Build for all files
node build-search-index.js

# Build for first N files (for testing)
node build-search-index.js --limit 5
```

---

## Part 2: Dashboard Search Enhancement

### Architecture

```
index.html
  ├── <script src="search-index.js">     ← 770 pre-built entries
  ├── documents[] array                   ← 87 doc metadata (inline)
  └── sectionsByFile{}                    ← lookup: filename → sections
```

### Search Flow

```
User types query
  ↓
1. Check metadata (title, source, tags, summary)
  ↓
2. Check searchIndex content (section-level full text)
  ↓
3. Calculate relevance score per document
  ↓
4. Auto-sort by relevance
  ↓
5. Render cards with visual indicators
```

### Scoring System

| Match Type | Score | Badge Color |
|------------|-------|-------------|
| Title      | +10   | Blue        |
| Tag        | +5    | Yellow      |
| Summary    | +3    | Green       |
| Source      | +2    | Blue        |
| Content (per section, max 8) | +1 each | Purple |

### Visual Features Added

1. **Auto Relevance Sort** — Automatically switches to relevance sort when typing
2. **Match-Type Badges** — `Title` `Tag` `Summary` `Content` color-coded badges
3. **Relevance Bar** — Purple progress bar showing relative score
4. **Rank Number** — `#1`, `#2`, `#3`... on each card
5. **Border Highlight** — Purple border for top results, light purple for mid, gray for low
6. **Content Snippets** — Expandable panel showing matched sections with keyword highlighting
7. **Result Count** — "N results" shown next to search box
8. **150ms Debounce** — Smooth search input handling

### Key Code Sections

**Loading the index:**
```html
<script src="search-index.js"></script>
```

**Building the lookup:**
```javascript
const sectionsByFile = {};
searchIndex.forEach(e => {
    if (!sectionsByFile[e.docFile]) sectionsByFile[e.docFile] = [];
    sectionsByFile[e.docFile].push(e);
});
```

**Snippet extraction with highlight:**
```javascript
function getSnippet(content, query) {
    const idx = content.toLowerCase().indexOf(query);
    const start = Math.max(0, idx - 40);
    const end = Math.min(content.length, idx + query.length + 60);
    let snippet = (start > 0 ? '…' : '') + content.substring(start, end) + '…';
    snippet = snippet.replace(new RegExp('(' + query + ')', 'gi'), '<mark>$1</mark>');
    return snippet;
}
```

---

## File Structure

```
david-ai-learning/
├── index.html                 ← Dashboard with search UI
├── search-index.js            ← Generated index (770 entries, 832KB)
├── build-search-index.js      ← Builder script
└── docs/
    ├── 2025-08-26_human30-life-map.html
    ├── ...
    └── 2026-02-20_prompt-caching-claude.html  (87 files)
```

---

## Git Commits

| Commit | Description |
|--------|-------------|
| `8114fa6` | Add search index builder and generated search-index.js |
| `4d1deef` | Add deep full-text search with relevance ranking to dashboard |
| `eeb9ce4` | Lighten category bar colors for softer visual appearance |

---

## How to Reuse This Pattern

### For a new project with HTML docs:

1. **Add meta tags** to each HTML doc's `<head>`:
   ```html
   <meta name="doc-date" content="YYYY-MM-DD">
   <meta name="doc-title" content="Title">
   <meta name="doc-source" content="Source">
   <meta name="doc-tags" content="Tag1,Tag2">
   <meta name="doc-rating" content="4.0">
   <meta name="doc-file" content="filename.html">
   ```

2. **Copy `build-search-index.js`** and adjust:
   - `DOCS_DIR` path
   - `MAX_CONTENT_LENGTH` / `MAX_CONTENT_LENGTH_SINGLE` values
   - Meta tag names if different

3. **Run the builder:**
   ```bash
   node build-search-index.js
   ```

4. **Add to dashboard HTML:**
   - `<script src="search-index.js"></script>`
   - Build `sectionsByFile` lookup
   - Enhance filter function to search `sectionsByFile[file]`
   - Add snippet display in card rendering

### When docs change:

```bash
# Rebuild the index after adding/editing docs
node build-search-index.js

# Commit and push
git add search-index.js && git commit -m "Rebuild search index" && git push
```

---

## Lessons Learned

- **Incremental approach works** — Process 5 files first, verify, then run all 87
- **Section-level indexing** is more useful than doc-level for search relevance
- **Single-section files need special handling** — larger content limit compensates for lack of structure
- **Auto-sort by relevance** is essential UX — users shouldn't have to manually switch
- **Visual relevance indicators** (bars, badges, borders) make search results scannable at a glance
- **GitHub Pages has cache delay** (1-3 min) — test locally first with `open index.html`
