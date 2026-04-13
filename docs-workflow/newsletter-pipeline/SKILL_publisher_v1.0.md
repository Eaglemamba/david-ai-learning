# Post-Digest Bilingual Publisher (v1.0)

> **Trigger:** "publish digest" | "build bilingual docs" | "build docs from digest" | "發布今天的新聞"
> **Runs in:** Claude Code (local), with `david-ai-learning` repo at working directory
> **Follows:** Daily Digest SKILL_v6.1.5 — run after user exports selected articles

---

## Prerequisites

- Working directory: `C:\Users\david.kuo\david-ai-learning` (or wherever repo is cloned)
- Git remote `origin` pointing to `Eaglemamba/david-ai-learning`
- Pre-commit hook installed (`npm run setup-hooks` done at least once)
- Input: Export text from Daily Digest (clipboard paste), or user describes selected articles

---

## CRITICAL RULES

1. **One HTML file per article** — never combine multiple articles into one doc
2. **Filename:** `YYYY-MM-DD_[category]-[slug].html` — use today's TST date
3. **Write to `docs/` root** — NOT `docs/processed/` (auto-classify will move them)
4. **Do NOT commit manually** — pre-commit hook handles classify + index rebuild
5. **Always fire RemoteTrigger last** — after git push, trigger `trig_01E8UJR1c7FsrJ7A3fxxiGtx`

---

## Step-by-Step Workflow

### Step 1 — Parse Export Input

Read the Daily Digest export text (user pastes, or from previous session). Extract:

```
For each article:
  - title (EN headline)
  - source (newsletter name, e.g. "Endpoints News")
  - category (FDA+, Deals, AI, Strategy, etc.)
  - agent_route (pharma-decipher | hbr-review | ai-articles)
  - url (original article link)
  - summary (brief from newsletter, if available)
  - date (from email header, TST)
```

If the user hasn't pasted the export, ask: "請貼上 Daily Digest 的 Export 輸出，或告訴我今天選了哪些文章。"

---

### Step 2 — Generate Bilingual HTML per Article

For each article, generate an HTML file using the template below.

**Filename convention:**
```
pharma-decipher articles → YYYY-MM-DD_pharma-[slug].html
hbr-review articles      → YYYY-MM-DD_leadership-[slug].html  
ai-articles articles     → YYYY-MM-DD_ai-[slug].html
```

Slug rule: lowercase, hyphens only, max 5 words from the title.  
Example: `2026-04-13_pharma-endpoints-fda-approval.html`

**Tag mapping by category:**

| Digest Category | doc-tags |
|----------------|----------|
| FDA+ | Regulatory,Pharma,Industry |
| Quality/Compliance | Quality,Pharma,Regulatory |
| Deals | Pharma,Business,Industry |
| Clinical | Clinical,Pharma,Pipeline |
| Financing | Pharma,Industry,Business |
| Pipeline | Pipeline,Pharma,Drug-Development |
| Policy | Policy,Pharma,Regulatory |
| Strategy | Strategy,Leadership,Framework |
| Product | Product,Management,Strategy |
| Productivity | Productivity,Personal-Development |
| AI | AI,Agent,Industry |
| Leadership | Leadership,Framework,Strategy |

**Rating:** Use `3.5` as default for newsletter digest articles.

---

### Step 3 — Write Files to `docs/`

Use the Write tool to write each generated HTML file to:
```
docs/YYYY-MM-DD_[category]-[slug].html
```

After writing all files, confirm the list with the user:
```
已建立 N 個雙語文件：
  ✔ docs/2026-04-13_pharma-endpoints-fda-approval.html
  ✔ docs/2026-04-13_ai-claude-background-agents.html
  ...
準備 commit + push？
```

---

### Step 4 — Commit and Push

```bash
cd /path/to/david-ai-learning

# Stage only the new HTML files
git add docs/*.html

# Commit — pre-commit hook will auto-run auto-classify.js,
# move files to docs/processed/, rebuild search-index.js and dashboard-data.js
git commit -m "Add: digest articles YYYY-MM-DD (N docs)"

# Push
git push origin main
```

Expected commit output:
```
[pre-commit] Detected N new file(s) in docs/
[pre-commit] Running auto-classify.js...
[pre-commit] Classified: 2026-04-13_pharma-... → Stage 3 / Pharma
[pre-commit] Classified: 2026-04-13_ai-...     → Stage 2 / AI-Agents
[pre-commit] Rebuilt search-index.js + dashboard-data.js
✔ Commit complete
```

If pre-commit hook is not installed, run manually:
```bash
node auto-classify.js
git add docs/processed/ dashboard-data.js search-index.js curriculum-data.js
git commit -m "Add: digest articles YYYY-MM-DD (N docs)"
git push origin main
```

---

### Step 5 — Fire Scheduled Trigger (Verification Pass)

After push, call `RemoteTrigger` to fire `trig_01E8UJR1c7FsrJ7A3fxxiGtx`.

This serves as a **safety net**: if any files were missed by the pre-commit hook, the scheduled agent will catch and classify them. Expected response if hook worked: "Nothing to process today."

```
RemoteTrigger(action="run", trigger_id="trig_01E8UJR1c7FsrJ7A3fxxiGtx")
```

Report the result to user. Done.

---

## Bilingual HTML Template

Use this template for EVERY document generated. Replace all `[PLACEHOLDER]` values.

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="doc-date" content="[YYYY-MM-DD]">
    <meta name="doc-title" content="[中文標題：EN Title 的繁中翻譯]">
    <meta name="doc-source" content="[Newsletter Name] / Daily Digest">
    <meta name="doc-tags" content="[TAG1],[TAG2],[TAG3]">
    <meta name="doc-rating" content="3.5">
    <meta name="doc-summary" content="[30字以內的中文摘要，說明這篇的核心發展]">
    <meta name="doc-file" content="[YYYY-MM-DD_category-slug.html]">
    <title>[中文標題]</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Noto Sans TC', sans-serif; line-height: 1.7; color: #1e293b; background: #f8fafc; }

        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #334155 100%);
            color: white; text-align: center; padding: 2.5rem 2rem 2rem; position: relative;
        }
        .header::after {
            content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
            background: linear-gradient(90deg, #f59e0b, #10b981, #8b5cf6);
        }
        .source-badge {
            display: inline-block; background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.3); color: #e2e8f0;
            padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem;
            margin-bottom: 0.75rem;
        }
        .header h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 0.5rem; }
        .header-sub { font-size: 0.85rem; color: #94a3b8; }

        .container { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; }

        .meta-bar {
            display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;
            background: white; border: 1px solid #e2e8f0; border-radius: 8px;
            padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: 0.8rem; color: #64748b;
        }
        .tag {
            background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569;
            padding: 0.15rem 0.6rem; border-radius: 12px; font-size: 0.75rem;
        }

        .summary-box {
            background: linear-gradient(135deg, #eff6ff, #f0fdf4);
            border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0;
            padding: 1rem 1.25rem; margin-bottom: 1.5rem;
            font-size: 1rem; font-weight: 500; color: #1e3a5f;
        }

        .section { background: white; border-radius: 10px; border: 1px solid #e2e8f0; padding: 1.25rem 1.5rem; margin-bottom: 1.25rem; }
        .section h2 { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; }

        .bilingual-block { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 0.75rem; }
        @media (max-width: 600px) { .bilingual-block { grid-template-columns: 1fr; } }

        .lang-en { background: #f8fafc; border-left: 3px solid #3b82f6; padding: 0.75rem 1rem; border-radius: 0 6px 6px 0; }
        .lang-zh { background: #f0fdf4; border-left: 3px solid #10b981; padding: 0.75rem 1rem; border-radius: 0 6px 6px 0; }
        .lang-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 0.3rem; text-transform: uppercase; }
        .lang-en p, .lang-zh p { font-size: 0.875rem; color: #374151; margin: 0; }

        .insight-box { background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 0.75rem 1rem; margin-top: 1rem; }
        .insight-box .label { font-size: 0.75rem; font-weight: 700; color: #92400e; margin-bottom: 0.25rem; }
        .insight-box p { font-size: 0.875rem; color: #78350f; }

        .action-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem 1rem; }
        .action-box .label { font-size: 0.75rem; font-weight: 700; color: #166534; margin-bottom: 0.25rem; }
        .action-box p { font-size: 0.875rem; color: #15803d; }

        .read-btn {
            display: inline-block; background: #482A77; color: white;
            padding: 0.5rem 1.25rem; border-radius: 6px; text-decoration: none;
            font-size: 0.85rem; font-weight: 500; margin-top: 1rem;
        }
        .read-btn:hover { background: #6B4A9E; }
        .footer { text-align: center; padding: 1.5rem; color: #94a3b8; font-size: 0.8rem; }
    </style>
</head>
<body>

<div class="header">
    <div class="source-badge">[NEWSLETTER_SOURCE] · Daily Digest [YYYY-MM-DD]</div>
    <h1>[中文標題]</h1>
    <p class="header-sub">[EN Title — Original Headline]</p>
</div>

<div class="container">

    <div class="meta-bar">
        <span>📅 [YYYY-MM-DD] TST</span>
        <span>📰 [Newsletter Source]</span>
        <span>⭐ 3.5 / 5</span>
        <span class="tag">[TAG1]</span>
        <span class="tag">[TAG2]</span>
        <span class="tag">[TAG3]</span>
    </div>

    <div class="summary-box">
        💡 [一句話總結：用一句繁中說清楚這篇在講什麼、為什麼重要]
    </div>

    <!-- Section: 核心發展 / Key Development -->
    <div class="section">
        <h2>核心發展 / Key Development</h2>
        <div class="bilingual-block">
            <div class="lang-en">
                <div class="lang-label">EN — What happened</div>
                <p>[2-3 sentences describing the core news/development in English]</p>
            </div>
            <div class="lang-zh">
                <div class="lang-label">ZH — 發生什麼事</div>
                <p>[上述英文的繁中翻譯，2-3句]</p>
            </div>
        </div>
    </div>

    <!-- Section: 為什麼重要 / Why It Matters -->
    <div class="section">
        <h2>為什麼重要 / Why It Matters</h2>
        <div class="bilingual-block">
            <div class="lang-en">
                <div class="lang-label">EN — Industry significance</div>
                <p>[1-2 sentences on why this matters — implications for the industry/field]</p>
            </div>
            <div class="lang-zh">
                <div class="lang-label">ZH — 產業意義</div>
                <p>[上述英文的繁中翻譯]</p>
            </div>
        </div>

        <div class="insight-box">
            <div class="label">🔑 核心洞察</div>
            <p>[從這篇抽出的一個關鍵觀點或啟示，用繁中]</p>
        </div>
    </div>

    <!-- Section: 行動結論 / Action Takeaway -->
    <div class="section">
        <h2>行動結論 / Action Takeaway</h2>
        <div class="action-box">
            <div class="label">✅ 立即應用</div>
            <p>[這篇資訊如何應用到工作或決策中？一個具體的行動點]</p>
        </div>

        <a href="[ORIGINAL_ARTICLE_URL]" target="_blank" class="read-btn">Read Original →</a>
    </div>

</div>

<div class="footer">
    Daily Digest Export — <a href="https://github.com/Eaglemamba/Daily-digest" style="color:#94a3b8">amaran-daily</a>
    · Routed via [AGENT_ROUTE]
</div>

</body>
</html>
```

---

## Complete Session Example

**User input:**
```
📋 Daily Digest Export — 2026-04-13

▶ PHARMA-DECIPHER
[FDA+] FDA Approves Novo's Oral Semaglutide for T2D
Source: Endpoints News
https://endpointsnews.com/...

▶ AI-ARTICLES
[AI] Anthropic Releases Background Agents to All Claude Code Users
Source: The Batch
https://deeplearning.ai/the-batch/...
```

**Expected output:**

Two files written to `docs/`:
1. `docs/2026-04-13_pharma-fda-novo-semaglutide.html`
2. `docs/2026-04-13_ai-anthropic-background-agents.html`

Then git commit (hook auto-classifies), git push, RemoteTrigger fired.

---

## Error Handling

| Situation | Action |
|-----------|--------|
| Pre-commit hook not installed | Run `npm run setup-hooks` first, then retry |
| Hook fails to classify | Run `node auto-classify.js` manually, then `git add` + `git commit --no-edit` |
| `git push` rejected (not up to date) | Run `git pull --rebase origin main` then push again |
| RemoteTrigger reports "Nothing to process" | Normal — means hook handled everything correctly |
| RemoteTrigger reports N files processed | Safety net kicked in — hook had missed those files |

---

## Changelog

### v1.0 (2026-04-13)
- Initial design: post-digest bilingual publisher pipeline
- Integrates Daily Digest SKILL_v6.1.5 export with david-ai-learning intake workflow
- Fires scheduled trigger `trig_01E8UJR1c7FsrJ7A3fxxiGtx` as final verification step
