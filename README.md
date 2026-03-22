# AI Learning Dashboard

**Pharma x AI x Leadership** — A curated collection of bilingual (Chinese/English) educational documents on AI, LLMs, Agents, Prompt Engineering, and Automation.

## What This Is

120+ interactive HTML learning guides created from deep analysis of AI industry articles, research papers, and technical documentation. Each document transforms source material into structured educational content with:

- Bilingual content (Traditional Chinese + English)
- Executive summaries with article ratings
- Visual frameworks and concept maps
- Practice questions for active recall
- Actionable takeaways for regulated industry contexts

## Browse

**[Open the Dashboard](https://eaglemamba.github.io/david-ai-learning/)** to search, filter, and explore all documents.

### Full-Text Search

The dashboard includes a deep search feature powered by a pre-built index of 770 section-level entries. Search covers not just titles and tags, but the full content of every document section.

- **Relevance ranking** — results auto-sort by match strength
- **Match-type badges** — see where your query matched (Title / Tag / Summary / Content)
- **Content snippets** — highlighted keyword previews from matching sections
- **Visual indicators** — relevance bars, rank numbers, and border highlights

## Categories

| Tag | Focus Area |
|-----|-----------|
| Agent | AI agents, multi-agent systems, Claude Code, Cowork |
| Tool | Platform comparisons, feature analysis, setup guides |
| LLM | Model architectures, benchmarks, capability analysis |
| Prompt | Prompt engineering, context engineering, instruction design |
| Framework | Mental models, decision frameworks, career development |
| Analysis | Industry trends, market signals, critical evaluation |
| Automation | Workflow automation, Make.com, n8n, integration patterns |
| Security | AI security, privacy, deployment hardening |
| API | API design, token economics, prompt caching |

## About

Created by an Operations Director in pharmaceutical manufacturing (CDMO), exploring the intersection of AI implementation and regulated industry operations. All content applies a critical lens informed by GMP compliance, data integrity principles, and practical operational constraints.

## Structure

```
david-ai-learning/
├── index.html               ← Dashboard with search UI
├── learning-path.html       ← 5-stage structured learning progression
├── mindmap.html             ← Interactive knowledge mind map (11 topic clusters)
├── curriculum-data.js       ← Single source of truth for stages + topic clusters
├── dashboard-data.js        ← Generated document metadata array
├── search-index.js          ← Full-text search index (770+ entries)
├── add-doc.js               ← Smart doc insertion with ML classification
├── build-search-index.js    ← Search index builder
├── build-dashboard-data.js  ← Dashboard data builder
├── normalize_html.py        ← Batch HTML normalization
├── test-integrity.js        ← Integration tests
├── CLAUDE.md                ← Project rules & document revision chain
├── docs/                    ← 120+ educational HTML documents
│   ├── styles.css               ← Shared stylesheet for all docs
│   └── YYYY-MM-DD_slug.html     ← Individual doc files
└── docs-workflow/           ← Templates & workflow documentation
    ├── essence-template.md
    ├── cheatsheet-template.md
    └── newsletter-pipeline/     ← Experimental daily digest automation
```

## Development

### Adding a new document

The recommended workflow uses `add-doc.js`, which reads meta tags, classifies the doc, and updates all data files:

```bash
npm run add docs/2026-03-15_new-article.html        # interactive
npm run add docs/2026-03-15_new-article.html --dry-run  # preview only
```

This will:
1. Read meta tags from the HTML file
2. Score and suggest a learning-path stage and mindmap topic cluster
3. Update `curriculum-data.js` (single source for both learning-path + mindmap)
4. Rebuild `dashboard-data.js` and `search-index.js`
5. Validate the result — auto-rollback if invalid

### Rebuilding generated files

```bash
npm run build              # Rebuild search-index.js
npm run build:dashboard    # Rebuild dashboard-data.js
npm run normalize          # Batch-normalize HTML docs (fixes styles, classes, lang)
npm run test               # Run integration tests
```

### Running tests

```bash
npm test
```

Validates: meta tag completeness, file reference integrity, doc counts, curriculum-data.js validity.

### Document requirements

Every HTML file in `docs/` must include these meta tags:

```html
<meta name="doc-date" content="2026-03-15">
<meta name="doc-title" content="Article Title">
<meta name="doc-source" content="Source Name">
<meta name="doc-tags" content="Agent,Tool,Framework">
<meta name="doc-rating" content="4.0">
<meta name="doc-summary" content="One-line summary">
<meta name="doc-file" content="2026-03-15_slug.html">
```

### File naming convention

```
YYYY-MM-DD_slug.html
```

Example: `2026-03-15_claude-code-tips.html`

## License

Educational content for personal and non-commercial use. Original source articles remain property of their respective authors.
