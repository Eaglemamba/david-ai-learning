# Remote Agent Usage Patterns & /loop Scheduling — Workflow Summary

**Date:** 2026-03-11
**Source:** Claude Daily Digest / Personal Workflow Analysis
**Tags:** Agent, Automation, Tool, Productivity

---

## Core Concept: Sleep-Deploy Pattern

Use Claude Code as an **asynchronous workforce** — fire tasks during idle moments (before bed, before commute), let agents complete them while you're away.

### Max 5x Plan Budget Math

| Window | Time | Use Case |
|--------|------|----------|
| Before bed | ~10-11pm | SOP batch conversion, BPR scan validation |
| Before work | ~7-8am | BPR verification, amaran_fill.py batch |
| Work hours | ~9am-6pm | Interactive development, debugging |

- Each 5-hour window: ~225 messages or 50-200 prompts
- Each SOP task: ~5-15 messages → **15-45 pipeline tasks per window**
- Three windows/day = **45-135 pipeline tasks/day**
- Opus → Sonnet switch at 20% usage. Save Opus for reasoning-heavy work.

### Subagent Parallelization (Before Bed Example)

```
Subagent 1: sop_to_markdown.py   — batch convert PDF folder
Subagent 2: gemini_heading_scan.py — parallel heading recovery
Subagent 3: cross-reference validation on completed MDs
→ Ctrl+B to background, close laptop. All finish in minutes.
```

---

## /loop Scheduling Command

### What It Is

A bundled Claude Code skill for scheduling recurring prompts using natural language.

### Syntax

```bash
/loop 5m check if the deployment finished
/loop 2h /review-pr 1234
/loop 15m scan error logs and create PRs for fixable bugs
/loop 1d at 7:00am run the daily news digest

# One-shot reminder
remind me at 3pm to push the release branch
```

### Under the Hood

- Three tools: `CronCreate`, `CronList`, `CronDelete`
- Each task gets an 8-char ID
- Max 50 scheduled tasks per session
- Time units: `s` (seconds), `m` (minutes), `h` (hours), `d` (days)
- Seconds rounded up to nearest minute (cron granularity)
- Default interval: every 10 minutes

### Critical Constraints

| Constraint | Detail |
|------------|--------|
| **Session-scoped** | Computer must stay awake + connected + Claude Code session running |
| **No persistence** | Restart Claude Code = all tasks gone |
| **No catch-up** | Missed runs fire once when idle, not per missed interval |
| **Auto-expiry** | Recurring tasks expire after 3 days |
| **Usage cost** | Each run counts as a full Claude Code session |

### CLI /loop vs Desktop Scheduled Tasks vs GitHub Actions

| Feature | CLI /loop | Desktop Tasks | GitHub Actions |
|---------|-----------|---------------|----------------|
| Persistence | Session only | Survives restart | Fully durable |
| Requires | Terminal open | App open | Nothing (cloud) |
| Best for | Short-term monitoring | Recurring desktop workflows | Unattended scheduling |

---

## /loop Use Cases for Amaran Daily Ops

```bash
# Deviation tracker monitoring (BEST FIRST CANDIDATE)
/loop 2h check the deviation tracker for NOE/DEV items approaching due date

# SOP gap detection
/loop 4h scan SOP markdown folder, compare against PDF source, list unconverted

# BPR inbox monitor
/loop 1h check BPR scan folder for new files and summarize pending review

# Daily newsletter digest
/loop 1d at 7:00am search Gmail newsletters, filter 24hr, generate HTML digest
```

**Key insight:** /loop is designed for **polling/monitoring** (like a security camera), not batch jobs. Your SOP tasks are fire-and-forget — just run them directly.

---

## Newsletter Automation Pipeline

### Current State (v6.1.5 Skill in Claude.ai)

```
Gmail (10 sources) → 24hr filter → categorize → interactive HTML artifact
                                                  ↓
                                    Manual copy-paste to 3 Claude Projects:
                                    - pharma-decipher
                                    - hbr-review
                                    - ai-articles
```

**Time:** ~15 min/day (5 min extraction + 10 min review/routing)

### Target State (Automated Pipeline)

```
7:00am  /loop fires → digest HTML saved to ~/amaran-daily/digest-output/
7:30am  You open HTML, check articles (3 min)
7:33am  Click "Route Selected" → files auto-push to 3 GitHub repos
7:33am  3 subagents (or GitHub Actions) start parallel processing
8:00am  Arrive at office → 3 analysis reports waiting
```

**Time:** ~3 min active (down from 15 min)

### Architecture

```
~/amaran-daily/
  CLAUDE.md                 ← describes newsletter workflow
  newsletter-inbox/         ← where raw newsletters land
  digest-output/            ← generated HTML digests
  route-selected.sh         ← routes checked articles to repos

~/github/pharma-decipher/
  CLAUDE.md                 ← pharma analysis rules
  inbox/2026-03-11.md       ← auto-routed articles

~/github/hbr-review/
  CLAUDE.md                 ← leadership/strategy analysis rules
  inbox/2026-03-11.md

~/github/ai-articles/
  CLAUDE.md                 ← AI/tech analysis rules
  inbox/2026-03-11.md
```

### Two Trigger Options

**Option A: Subagent dispatch (manual trigger)**
After selection, main agent dispatches 3 background subagents, each processing its repo's inbox. Requires active Claude Code session.

**Option B: GitHub Actions (fully unattended)**
Each repo has a GitHub Action watching `/inbox/`. New file via `git push` triggers `claude -p "process today's inbox"`. Fully automated.

### Prerequisites

1. Restructure 3 Claude Projects → GitHub repos with CLAUDE.md
2. Modify digest HTML export: clipboard text → write to repo inbox + git push (~50 lines)
3. Configure Gmail MCP in Claude Code environment

---

## Action Items

- [ ] **Tonight:** Practice Sleep-Deploy — run one SOP batch task before bed, wait 10 min, verify
- [ ] **This week:** Evaluate effort to restructure pharma-decipher, hbr-review, ai-articles as GitHub repos
- [ ] **Next:** Test /loop with deviation tracker as first polling use case
- [ ] **Later:** Build route-selected.sh for newsletter pipeline automation
- [ ] **Investigate:** Gmail MCP setup in Claude Code, /loop actual usage cost on Max 5x
