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

### 4. Update curriculum-data.js
Add each new doc to `curriculum-data.js` (single source of truth for both mindmap + learning-path):

**Stage entry** — classify into Stage 1-5 using `doc-tags`:
| Primary Tag Pattern | Learning Path Stage |
|---|---|
| Anthropic-Docs, Tool (Claude-related) | Stage 3: AI Tools |
| Agent, Automation, Skills | Stage 4: Agent Architecture |
| Analysis, Framework (AI industry) | Stage 1: AI Basics (optional) |
| Prompt, Context | Stage 2: Prompt & Communication |
| Security, Leadership, Change Mgmt | Stage 5: Organization |

Add to the stage's `docs` array:
- `file`: filename
- `title`: from meta tag with star rating
- `required: false` (default for new docs)
- `why`: one-line reason from summary

**Topic cluster entry** — classify into the matching subcluster's `docs` array:
- `title`: from meta tag with star rating
- `file`: filename

> Note: `mindmap.html` and `learning-path.html` auto-load from `curriculum-data.js` — do NOT edit them directly.

### 5. Commit and push
- Stage all changed files: `curriculum-data.js`, `dashboard-data.js`, `search-index.js`
- Commit with message: `$ARGUMENTS` (or auto-generate: "Add N new docs to dashboard, mindmap, learning-path & search-index")
- Push to current branch

### 6. Summary
Print a table of all processed docs with: filename, rating, stage placement, topic cluster.
