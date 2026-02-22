# Claude Code 進階生產力技巧 — 速查表

> **來源:** Boris Cherny | **日期:** 2026-02-01 | **評分:** ★★★★☆ 4.0/5
> **標籤:** `Tool` `Automation` `Agent`
> **全文:** [HTML](../docs/2026-02-01_claude-code-power-tips.html)

## 一句話總結

用 Git Worktrees 並行、Plan Mode 先想再做、CLAUDE.md 持續迭代、重複任務封裝成 Skills。

## 快速指令

| 指令 / 操作 | 用途 | 備註 |
|------------|------|------|
| `git worktree add ../wt-b main` | 建立新工作樹 | 每個跑獨立 Claude session |
| `alias za='cd ~/wt-a && claude'` | 一鍵切換工作樹 | 放 .zshrc |
| `Enter plan mode.` | 複雜任務先規劃 | 不要直接讓 Claude 動手 |
| `Update your CLAUDE.md so you don't make that mistake again.` | 讓 Claude 自己寫規則 | 每次修正後追加 |
| `/techdebt` | 自建 Skill：找重複程式碼 | 每次 session 結束跑一次 |
| `fix` | 貼上 bug thread 後直接說 | 搭配 Slack MCP |
| `Go fix the failing CI tests.` | 不微觀管理 | 給情境，不給步驟 |

## 核心工作流（依序）

1. **Parallel** — 開 3-5 個 Git Worktrees，每個跑獨立 Claude，真正的並行而非多工
2. **Plan** — 複雜任務先進 Plan Mode，規劃完才執行。Claude 打轉時立刻切回 Plan Mode
3. **Iterate** — 每次修正錯誤後讓 Claude 更新 CLAUDE.md，持續降低錯誤率
4. **Automate** — 一天做超過一次的事→封裝成 Skill，提交 Git 跨專案重用

## 實用 Prompt / 設定片段

```
Enter plan mode. Before implementing:
1. Outline your approach
2. List potential risks
3. Define success criteria
4. Wait for my approval
```

```
Good work fixing that. Now update your CLAUDE.md
with a rule to prevent this mistake in the future.
Be specific about:
- What went wrong
- How to detect it
- How to avoid it
```

```
Knowing everything you know now, scrap this
and implement the elegant solution.
```

## 常見坑 & 解法

| 問題 | 原因 | 解法 |
|------|------|------|
| Claude 打轉、品質下降 | 硬推不回頭 | 立刻切回 Plan Mode 重新規劃 |
| 同樣的錯一犯再犯 | CLAUDE.md 沒更新 | 每次修正後追加規則 |
| 工作樹太多搞混 | 沒命名管理 | Shell alias (za, zb, zc) |
| 給太細的步驟 | 微觀管理 | 給情境和目標，不給步驟 |

## 一條規則記住這篇

> "If you do something more than once a day, turn it into a skill or command."

---
*速查版 — 完整雙欄對照請看 [HTML 全文](../docs/2026-02-01_claude-code-power-tips.html)*
