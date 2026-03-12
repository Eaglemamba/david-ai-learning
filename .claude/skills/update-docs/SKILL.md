---
name: update-docs
description: Process new HTML docs in docs/ and update all related files (dashboard, search index, mindmap, learning path). Use when new docs have been added to the docs/ directory.
disable-model-invocation: true
argument-hint: "[commit message (optional)]"
allowed-tools: Read, Glob, Grep, Bash, Edit, Write
---

# Update Docs Pipeline

Process all new/changed HTML docs in `docs/` and update every related file.

## Steps

### 1. Detect new docs
- Run `git status` and `git diff --name-only origin/main..HEAD` to find new `docs/*.html` files
- If new docs came from `origin/main`, merge first: `git merge origin/main --no-edit`
- If no new docs found, inform the user and stop

### 2. Read metadata from each new doc
Extract from `<meta>` tags: `doc-date`, `doc-title`, `doc-source`, `doc-tags`, `doc-rating`, `doc-summary`, `doc-file`

### 3. Rebuild automated indexes
```bash
node build-search-index.js
node build-dashboard-data.js
```

### 4. Update mindmap.html (both views)
For each new doc, add entries to:
- **Learning Path view** (`mdPath`): classify into the correct Stage (1-5) and section (required/optional)
- **Topic Cluster view** (`mdTopic`): classify into the correct topic group
- Update the stats count in both views

Use these classification rules based on `doc-tags`:
| Primary Tag Pattern | Learning Path Stage | Topic Cluster |
|---|---|---|
| Anthropic-Docs, Tool (Claude-related) | Stage 3: AI Tools | Claude tools |
| Agent, Automation, Skills | Stage 4: Agent Architecture | Agent architecture or Claude Skills |
| Analysis, Framework (AI industry) | Stage 1: AI Basics (optional) | AI industry trends |
| Prompt, Context | Stage 2: Prompt & Communication | Prompt engineering |
| Security, Leadership, Change Mgmt | Stage 5: Organization | Security or Leadership |
| Content, Personal Growth | Supplementary | Personal growth or Content |

### 5. Update learning-path.html
Add each new doc to the appropriate stage's `docs` array with:
- `file`: filename
- `title`: from meta tag with star rating
- `required: false` (default for new docs)
- `why`: one-line reason from summary

### 6. Commit and push
- Stage all changed files: `dashboard-data.js`, `search-index.js`, `mindmap.html`, `learning-path.html`
- Commit with message: `$ARGUMENTS` (or auto-generate: "Add N new docs to dashboard, mindmap, learning-path & search-index")
- Push to current branch

### 7. Summary
Print a table of all processed docs with: filename, rating, stage placement, topic cluster.
