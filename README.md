# AI Learning Dashboard

**Pharma x AI x Leadership** — A curated collection of bilingual (Chinese/English) educational documents on AI, LLMs, Agents, Prompt Engineering, and Automation.

## What This Is

87 interactive HTML learning guides created from deep analysis of AI industry articles, research papers, and technical documentation. Each document transforms source material into structured educational content with:

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
├── search-index.js          ← Full-text search index (770 entries)
├── build-search-index.js    ← Index builder script
├── docs/                    ← 87 educational HTML documents
│   ├── 2026-02-20_claude-cowork-agentic-workflows.html
│   ├── 2026-02-20_prompt-caching-claude.html
│   └── ...
└── docs-workflow/           ← Build workflow documentation
    └── 2026-02-22_search-index-workflow.md
```

### Rebuilding the Search Index

When documents are added or updated:

```bash
node build-search-index.js
```

This parses all `docs/*.html`, extracts meta tags and h2/h3 sections, and regenerates `search-index.js`.

## License

Educational content for personal and non-commercial use. Original source articles remain property of their respective authors.
