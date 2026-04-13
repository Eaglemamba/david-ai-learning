---
name: validate
description: Run full integrity checks on the knowledge base — verifies doc counts, file references, meta tags, and curriculum-data.js validity.
allowed-tools: Bash, Read, Glob, Grep
---

# Validate Knowledge Base Integrity

Run comprehensive checks to ensure all files in the knowledge base are consistent.

## Steps

### 1. Run test-integrity.js
```bash
node test-integrity.js
```
Report any failures clearly. This covers: meta tags, doc counts, file references, orphan detection, and curriculum-data.js validation.

### 2. Check if generated files are stale
```bash
node build-dashboard-data.js & node build-search-index.js & wait
git diff --stat dashboard-data.js search-index.js
```
If there are diffs, warn that generated files need to be committed.

### 3. Summary
Print a clear pass/fail summary with actionable next steps for any failures.
