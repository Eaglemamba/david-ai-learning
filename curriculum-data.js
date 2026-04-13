/**
 * curriculum-data.js — Single source of truth for learning path stages and mindmap topic clusters.
 *
 * Both learning-path.html and mindmap.html consume this file.
 * When adding a new doc, only update THIS file — both views auto-update.
 *
 * Usage: add-doc.js modifies this file instead of editing learning-path.html and mindmap.html directly.
 */

const stages = [
  {
    id: 1,
    title: 'AI 基礎認知',
    subtitle: 'Week 1 — 理解 AI 是什麼、能做什麼、風險在哪',
    color: '#2563eb',
    icon: '🧠',
    description: '建立 AI 與 LLM 基本認知，了解風險框架，培養正確心態',
    docs: [
      { file: 'processed/2026-01-31_amodei-technology-adolescence.html', title: 'Dario Amodei — Technology Adolescence ★4.8', required: true, why: 'AI 風險與應對的全局觀，建立正確心態' },
      { file: 'processed/2026-02-18_ai-guide-agentic-era.html', title: 'AI 使用指南：代理時代 ★4.0', required: true, why: '三層框架理解 AI 從聊天到代理的演進' },
      { file: 'processed/2025-11-20_ai-productivity-paradox.html', title: 'AI 生產力悖論 ★3.5', required: true, why: '學會判斷何時該用 AI、何時不該' },
      { file: 'processed/2026-02-05_ai-privacy-deep-dive.html', title: 'AI 隱私深度解析 ★3.6', required: true, why: '了解 AI 時代的資料安全風險' },
      { file: 'processed/2025-12-18_ai-books-leaders-guide.html', title: '5 AI Books All Leaders Should Read ★3.8', required: false, why: '延伸閱讀書單' },
      { file: 'processed/2026-01-15_ai-trends-2026.html', title: '2026 六大 AI 趨勢 ★3.8', required: false, why: '掌握產業脈動' },
      { file: 'processed/2026-01-07_ces-jensen-huang-keynote.html', title: 'CES 2026 Jensen Huang 全面解析 ★4.4', required: false, why: '了解 AI 硬體與生態演進' },
      { file: 'processed/2026-03-05_ai-execs-kids-career.html', title: 'AI 高管的子女職涯建議 ★4.0', required: false, why: 'AI 時代職涯韌性的五大支柱' },
      { file: 'processed/2026-03-10_reasoning-messy-future.html', title: '混亂未來推理框架 SystematicallyLS ★3.6', required: false, why: '量化交易員的 AI 未來推理框架：四大護城河與不對稱下注' },
      { file: 'processed/2026-03-12_su-program-the-world.html', title: '偏鄉程式教育 蘇文鈺 Program the World ★3.6', required: false, why: '成大教授十年偏鄉程式教育，填補弱勢孩子的想像力斷層' },
      { file: 'processed/2026-03-14_apple-ai-affordable-strategy.html', title: '蘋果 AI 平價戰略 ★3.4', required: false, why: '蘋果用低價硬體搶佔 AI 生態入口的策略分析' },
      { file: 'processed/2026-04-01_sid-founder-mode-cancer.html', title: 'Sid Founder Mode 抗癌 — AI 個人化醫療 ★4.5', required: false, why: 'GitLab 創辦人以工程思維+AI 對抗骨癌，展示 AI 在醫療領域的突破潛力' },
    ]
  },
  {
    id: 2,
    title: 'Prompt 與溝通技巧',
    subtitle: 'Week 2 — 學會跟 AI 有效溝通',
    color: '#7c3aed',
    icon: '💬',
    description: '掌握 Prompt Engineering 基本功，學會設定 Context，寫出高品質指令',
    docs: [
      { file: 'processed/2026-01-30_claude-prompt-engineering.html', title: 'Claude 提示工程 10 步驟框架 ★4.0', required: true, why: '系統性學習 Prompt 撰寫' },
      { file: 'processed/2026-01-19_ai-context-setup.html', title: 'AI Context 一次設定，永久提升 90% ★4.2', required: true, why: '建立個人 AI 設定檔' },
      { file: 'processed/2026-01-08_context-engineering-agents.html', title: 'Context Engineering 深度指南 ★4.6', required: true, why: '從 Prompt 到 Context 的關鍵思維轉變' },
      { file: 'processed/2026-01-15_articulation-intelligence.html', title: '清晰表達三層框架 ★4.0', required: true, why: '把模糊想法轉化為 AI 可執行指令' },
      { file: 'processed/2026-02-03_anti-prompts-constraints.html', title: 'Anti-Prompts 約束策略 ★3.2', required: false, why: '用「不要做什麼」提升輸出品質' },
      { file: 'processed/2026-02-17_ai-questions-system.html', title: '用提問取代答案 5 步驟 ★3.8', required: false, why: '進階提問技巧' },
      { file: 'processed/2025-11-04_ai-prompts-insight-creator.html', title: '四個 Prompts 洞見創造者 ★3.5', required: false, why: '從資訊收集到洞見創造' },
      { file: 'processed/2025-12-16_data-literacy-loop.html', title: 'Data Literacy Loop ★3.5', required: false, why: '打造具數據素養的 AI 協作' },
      { file: 'processed/2025-02-13_markdown_ai_guide.html', title: 'Markdown 終極指南 ★3.8', required: false, why: 'Markdown 是 AI 的母語，掌握格式提升溝通效率' },
      { file: 'processed/2026-03-16_agent-handoff-successor-prompt.html', title: 'Agent 繼任者 Prompt ★4.0', required: false, why: '長上下文退化時的 Agent 交接 Prompt 模板' },
      { file: 'processed/2026-03-16_yc-founder-strategic-prompting.html', title: 'YC 創辦人戰略提問框架 ★3.6', required: false, why: '3 小時完成 3 個月研究的戰略級提問設計' },
    ]
  },
  {
    id: 3,
    title: 'AI 工具實戰',
    subtitle: 'Week 3–4 — 上手 Claude 全家桶及實用工具',
    color: '#059669',
    icon: '🛠',
    description: '動手使用 Claude Code、Cowork、Skills，整合進日常工作流程',
    docs: [
      { file: 'processed/2026-02-05_claude-starter-pack.html', title: 'Claude 入門攻略 ★3.8', required: true, why: 'Claude 全面功能概覽' },
      { file: 'processed/2026-02-01_claude-code-power-tips.html', title: 'Claude Code 進階生產力技巧 ★4.6', required: true, why: '高效使用 Claude Code 的核心技巧' },
      { file: 'processed/2026-01-23_claude-code-nontechnical-guide.html', title: 'Claude Code 非技術領導者指南 ★4.0', required: true, why: '非工程師也能用 Claude Code' },
      { file: 'processed/2026-01-22_50-claude-tips.html', title: '50 個被低估的 Claude 技巧 ★4.2', required: true, why: '快速查閱的實用技巧集' },
      { file: 'processed/2026-02-05_claude-cowork-practical-guide.html', title: 'Claude Cowork 實戰指南 ★3.8', required: true, why: '從 ChatGPT 轉到 Cowork 的完整體驗' },
      { file: 'processed/2026-03-02_claude-code-complete-docs.html', title: 'Claude Code 完整文件參考指南 ★4.5', required: true, why: 'Claude Code 官方文件全面參考' },
      { file: 'processed/2026-01-14_claude-cowork-guide.html', title: 'Claude Cowork 全面解析 ★3.8', required: false, why: 'Cowork 深入功能解析' },
      { file: 'processed/2026-02-03_claude-code-interactive-mode.html', title: 'Claude Code Interactive Mode ★3.8', required: false, why: '互動模式操作手冊' },
      { file: 'processed/2025-12-15_claude-code-agent-os.html', title: 'Claude Code Agent OS 指南 ★3.5', required: false, why: '將 Claude Code 當作個人 AI OS' },
      { file: 'processed/2026-01-10_typeless-voice-review.html', title: 'Typeless 語音輸入評測 ★3.8', required: false, why: '語音輸入生產力工具' },
      { file: 'processed/2026-02-03_notebooklm-source-control.html', title: 'NotebookLM Source Control ★3.2', required: false, why: '消除 AI 幻覺的文件工具' },
      { file: 'processed/2026-02-27_anthropic-claude-code-internal.html', title: 'Anthropic 內部使用 Claude Code ★4.3', required: false, why: 'Anthropic 十個團隊的實戰模式' },
      { file: 'processed/2026-02-27_claude-cowork-setup.html', title: 'Cowork 設定指南 Nav Toor ★3.8', required: false, why: 'Cowork 五大功能完整設定' },
      { file: 'processed/2026-03-05_claude-code-scraping-nine-ways.html', title: 'Claude Code 資料爬取九大方法 ★4.0', required: false, why: '9 種資料爬取方法從基礎到 Agent Browser' },
      { file: 'processed/2026-03-07_yanhua-claude-ultimate-guide.html', title: 'Claude 終極入門指南 Yanhua ★3.6', required: false, why: '百小時實測的 Claude 全方位入門' },
      { file: 'processed/2026-03-11_claude-code-interactive-mode.html', title: 'Claude Code 互動模式完全指南 ★4.0', required: false, why: '鍵盤快捷鍵、Vim 模式、內建指令、背景任務完整參考' },
      { file: 'processed/2026-03-16_claude-architect-certification.html', title: 'Claude Architect 認證自學 ★4.3', required: false, why: 'Claude Certified Architect 五大 Domain 完整拆解' },
      { file: 'processed/2026-03-16_claude-code-release-evolution.html', title: 'Claude Code v2.1.49-76 釋出演進 ★4.2', required: false, why: '28 版本深度分析：Multi-Agent、記憶體工程、Plugin 生態' },
      { file: 'processed/2026-04-08_claude-code-release-evolution.html', title: 'Claude Code v2.1.77-96 釋出演進 ★4.3', required: false, why: '20 版本深度分析：Hooks 成熟、Plugin 生態完整化、企業就緒、Bedrock 整合' },
      { file: 'processed/2026-03-18_notebooklm-hidden-features.html', title: 'NotebookLM 三大隱藏連接 ★3.4', required: false, why: '從研究工具到 AI 指揮中心：三大隱藏整合功能' },
    ]
  },
  {
    id: 4,
    title: 'Agent 架構與自動化',
    subtitle: 'Week 5–6 — 從使用者進化到建構者',
    color: '#d97706',
    icon: '🤖',
    description: '理解 Agent 架構，學會建構自動化工作流程，從手動操作進化到系統設計',
    docs: [
      { file: 'processed/2026-01-21_agentic-coding-trends.html', title: '2026 Agentic Coding Trends ★4.2', required: true, why: '理解 Agentic 開發的全貌' },
      { file: 'processed/2026-01-13_act-base-framework.html', title: 'ACT + BASE Agent Framework ★4.2', required: true, why: 'Agent 行為穩定性設計' },
      { file: 'processed/2026-02-01_claude-md-pdca-optimization.html', title: 'CLAUDE.md PDCA 持續改善 ★4.2', required: true, why: '系統性優化 AI 行為設定' },
      { file: 'processed/2026-01-21_claude-n8n-synta-stack.html', title: 'Claude + n8n + Synta 技術棧 ★4.2', required: true, why: '自動化工具組合實戰' },
      { file: 'processed/2026-01-15_email-triage-agent.html', title: 'Email Triage Agent 自動化 ★4.2', required: true, why: '動手建構第一個 Agent' },
      { file: 'processed/2025-12-20_claude-skills-deep-dive.html', title: 'Claude Skills 深度解析 ★3.5', required: false, why: 'Skills 建構實戰教學' },
      { file: 'processed/2025-12-15_skill-architecture-layers.html', title: 'Skill Architecture 五層設計 ★4.1', required: false, why: '進階 Skill 架構設計' },
      { file: 'processed/2025-12-20_skill-graphs-knowledge.html', title: 'Skill Graphs 知識網路 ★3.8', required: false, why: '建構可導航的知識圖譜' },
      { file: 'processed/2026-02-20_claude-cowork-agentic-workflows.html', title: 'Cowork 終極指南：7 個工作流 ★3.8', required: false, why: '進階 Agentic 工作流程' },
      { file: 'processed/2025-11-30_ai-second-brain-voice.html', title: 'AI Second Brain 語音系統 ★4.2', required: false, why: '語音驅動的知識管理' },
      { file: 'processed/2026-01-22_ai-habit-tracker-vibe-coding.html', title: 'AI Habit Tracker Vibe Coding ★3.8', required: false, why: '非工程師 Vibe Coding 教學' },
      { file: 'processed/2026-02-26_skills-markdown-folders.html', title: 'Skills 解密 Markdown 資料夾 ★4.0', required: false, why: 'Skills 模組化結構與 Progressive Disclosure' },
      { file: 'processed/2026-02-27_agent-skills-architecture.html', title: 'Agent Skills 模組化架構 ★4.0', required: true, why: 'Claude Agent Skills 三層漸進式載入核心設計' },
      { file: 'processed/2026-02-28_ai-legal-practice-skills.html', title: 'AI 法律實務 Skill 驅動 ★4.5', required: false, why: 'Skills 跨產業應用案例' },
      { file: 'processed/2026-02-28_claude-code-agent-tools.html', title: 'Claude Code Agent 工具設計 ★4.4', required: true, why: 'Agent 工具設計哲學：Action Space 與 Progressive Disclosure' },
      { file: 'processed/2026-03-01_skillsbench-agent-skills.html', title: 'SkillsBench Agent Skills 基準測試 ★4.5', required: false, why: '首個 Agent Skills 評測基準' },
      { file: 'processed/2026-03-09_building-skills-guide.html', title: 'Claude Skill 建構完整指南 ★4.2', required: false, why: 'Anthropic 官方 Skill 設計原則與 5 大 Pattern' },
      { file: 'processed/2026-03-11_skill-creator-epic-update.html', title: 'Skill-creator 史詩級更新 四大評估能力 ★4.0', required: false, why: '評估系統、基準測試、多代理並行、描述調優全面解析' },
      { file: 'processed/2026-03-13_claude-code-architecture-governance.html', title: 'Claude Code 架構治理 Tw93 ★4.5', required: false, why: '六層架構、上下文治理、Skills/Hooks/Subagents 設計' },
      { file: 'processed/2026-03-16_1m-context-compaction.html', title: '1M Context Compaction Runbook ★4.0', required: false, why: 'Context rot 失敗模式與 Compaction API 實戰操作' },
      { file: 'processed/2026-03-16_karpathy-autoresearch.html', title: 'Karpathy autoresearch Agent 自主研究 ★4.5', required: false, why: 'Agent 自主研究的 Feedback Loop 設計典範' },
      { file: 'processed/2026-03-18_claude-code-skills-lessons.html', title: 'Lessons from Building Claude Code Skills ★4.4', required: false, why: 'Anthropic Engineering：Skills 設計原則與 Pattern 實戰' },
    ]
  },
  {
    id: 5,
    title: '組織導入與領導力',
    subtitle: 'Week 7–8 — 在組織中推動 AI 採用',
    color: '#dc2626',
    icon: '🏢',
    description: '將個人技能轉化為組織能力，安全評估、變革管理、團隊賦能',
    docs: [
      { file: 'processed/2026-02-09_ai-change-management.html', title: 'AI 變革管理 8 大差異 ★3.0', required: true, why: '理解 AI 導入的組織挑戰' },
      { file: 'processed/2025-11-10_ai-leadership-triad.html', title: 'AI 領導力三角 ★3.8', required: true, why: '成功 AI 領導者的三項核心技能' },
      { file: 'processed/2026-02-11_openclaw-security-hardening.html', title: 'OpenClaw 安全強化三層防護 ★4.2', required: true, why: '企業 AI 安全防護實作' },
      { file: 'processed/2026-01-15_ai-tool-detox.html', title: 'AI 工具排毒指南 ★3.8', required: true, why: '評估新工具的決策框架' },
      { file: 'processed/2026-01-17_claude-cowork-product-lessons.html', title: 'Cowork 產品策略分析 ★4.0', required: true, why: '產品管理角度的 AI 策略' },
      { file: 'processed/2026-02-19_ai-amplification-strategy.html', title: 'AI Amplification 策略壓力測試 ★3.8', required: false, why: '用 AI 壓力測試策略假設' },
      { file: 'processed/2025-12-09_anthropic-skills-agents.html', title: 'Anthropic Skills vs Agents 策略 ★3.5', required: false, why: '企業 Agent 架構選擇' },
      { file: 'processed/2026-01-08_humint-intelligence-ai.html', title: 'HUMINT：機器無法取代人類 ★3.8', required: false, why: '人類在 AI 時代的不可取代性' },
      { file: 'processed/2026-01-22_future-of-work.html', title: 'Future of Work ★4.2', required: false, why: 'AI 時代工作意義的思考' },
      { file: 'processed/2026-02-17_ai-pm-builder-culture.html', title: 'AI PM 角色重定義 ★3.2', required: false, why: 'PM 從協調者到建造者' },
      { file: 'processed/2026-01-20_biotech-compass-walkthrough.html', title: 'Biotech Compass 生技分析 ★4.0', required: false, why: '產業應用：生技投資分析' },
      { file: 'processed/2026-02-27_block-ai-layoffs.html', title: 'Block 裁員 40% AI 組織重構 ★4.0', required: false, why: 'AI 裁員敘事 vs 現實的領導決策框架' },
      { file: 'processed/2026-02-28_anthropic-pentagon-supply-chain.html', title: 'Anthropic vs Pentagon ★4.6', required: false, why: 'AI 產業倫理紅線與供應鏈風險' },
      { file: 'processed/2026-03-06_labor-market-ai-impact.html', title: 'AI 勞動市場影響 Observed Exposure ★4.4', required: false, why: 'Anthropic 新指標衡量 AI 對就業市場實際影響' },
    ]
  }
];

// ─── Topic Clusters (for mindmap topic view) ───
const topicClusters = [
  {
    name: 'Claude 工具生態',
    color: '#2563eb',
    subclusters: [
      {
        name: 'Claude Code',
        docs: [
          { title: '進階生產力技巧 ★4.6', file: 'processed/2026-02-01_claude-code-power-tips.html' },
          { title: 'CLAUDE.md PDCA 持續改善 ★4.2', file: 'processed/2026-02-01_claude-md-pdca-optimization.html' },
          { title: 'Interactive Mode 參考指南 ★3.8', file: 'processed/2026-02-03_claude-code-interactive-mode.html' },
          { title: 'Agent OS 完整指南 ★3.5', file: 'processed/2025-12-15_claude-code-agent-os.html' },
          { title: '2.1.0 版本更新解析 ★3.5', file: 'processed/2026-01-09_claude-code-210-update.html' },
          { title: 'v2.1.74–v2.1.84 版本更新總覽 ★4.0', file: 'processed/2026-03-27_claude-code-version-changelog.html' },
          { title: '非技術領導者指南 ★4.0', file: 'processed/2026-01-23_claude-code-nontechnical-guide.html' },
          { title: '產品導師團 ★3.2', file: 'processed/2026-02-03_claude-code-product-mentors.html' },
          { title: 'Boris Tane Workflow — Plan Before Code ★4.4', file: 'processed/2026-02-22_boris-tane-claude-code-workflow.html' },
          { title: 'Best Practices 環境配置到平行擴展 ★4.3', file: 'processed/2026-02-22_claude-code-best-practices.html' },
          { title: '產品哲學 — Boris Cherny 訪談 ★4.5', file: 'processed/2026-02-22_claude-code-product-philosophy.html' },
          { title: 'Anthropic 內部使用 Claude Code ★4.3', file: 'processed/2026-02-27_anthropic-claude-code-internal.html' },
          { title: 'Agent 工具設計 Seeing Like an Agent ★4.4', file: 'processed/2026-02-28_claude-code-agent-tools.html' },
          { title: '完整文件參考指南 ★4.5', file: 'processed/2026-03-02_claude-code-complete-docs.html' },
          { title: '資料爬取九大方法 ★4.0', file: 'processed/2026-03-05_claude-code-scraping-nine-ways.html' },
          { title: '互動模式完全指南 ★4.0', file: 'processed/2026-03-11_claude-code-interactive-mode.html' },
          { title: '架構治理與工程實踐 Tw93 ★4.5', file: 'processed/2026-03-13_claude-code-architecture-governance.html' },
          { title: 'v2.1.49-76 釋出演進 28 版本分析 ★4.2', file: 'processed/2026-03-16_claude-code-release-evolution.html' },
          { title: 'v2.1.77-96 釋出演進 20 版本分析 ★4.3', file: 'processed/2026-04-08_claude-code-release-evolution.html' },
        ]
      },
      {
        name: 'Claude Cowork',
        docs: [
          { title: 'Cowork 終極指南：7 個工作流 ★3.8', file: 'processed/2026-02-20_claude-cowork-agentic-workflows.html' },
          { title: 'Cowork 桌面代理人攻略 ★3.8', file: 'processed/2026-02-19_claude-cowork-desktop-agent.html' },
          { title: 'Cowork 實戰指南 ★3.8', file: 'processed/2026-02-05_claude-cowork-practical-guide.html' },
          { title: 'Cowork 全面解析 ★3.8', file: 'processed/2026-01-14_claude-cowork-guide.html' },
          { title: 'Cowork 產品策略分析 ★4.0', file: 'processed/2026-01-17_claude-cowork-product-lessons.html' },
          { title: 'Cowork 終極指南 PM 桌面 Agent ★4.2', file: 'processed/2026-02-22_claude-cowork-guide.html' },
          { title: 'Cowork 設定指南 Nav Toor ★3.8', file: 'processed/2026-02-27_claude-cowork-setup.html' },
        ]
      },
      {
        name: 'Claude Skills & Projects',
        docs: [
          { title: 'Skills 深度解析 ★3.5', file: 'processed/2025-12-20_claude-skills-deep-dive.html' },
          { title: 'Skills 自動化省 40+ 小時 ★3.6', file: 'processed/2026-02-10_claude-skills-automation.html' },
          { title: 'Skill Architecture 五層 ★4.1', file: 'processed/2025-12-15_skill-architecture-layers.html' },
          { title: 'Skill Graphs 知識網路 ★3.8', file: 'processed/2025-12-20_skill-graphs-knowledge.html' },
          { title: 'Project Memory 指南 ★3.5', file: 'processed/2025-12-10_claude-project-memory.html' },
          { title: 'Projects 產品健康監測 ★4.0', file: 'processed/2026-01-06_claude-projects-product-health.html' },
          { title: 'Skills 解密 Markdown 資料夾 ★4.0', file: 'processed/2026-02-26_skills-markdown-folders.html' },
          { title: 'Agent Skills 模組化架構 ★4.0', file: 'processed/2026-02-27_agent-skills-architecture.html' },
          { title: 'Claude Skill 建構完整指南 ★4.2', file: 'processed/2026-03-09_building-skills-guide.html' },
          { title: 'Skill-creator 史詩級更新 ★4.0', file: 'processed/2026-03-11_skill-creator-epic-update.html' },
          { title: 'Lessons from Building Claude Code Skills ★4.4', file: 'processed/2026-03-18_claude-code-skills-lessons.html' },
          { title: 'Claude Dispatch 生態系統 ★3.6', file: 'processed/2026-03-19_claude-dispatch-ecosystem.html' },
          { title: '頂級 Skill 解剖 Garry Tan gstack ★4.5', file: 'processed/2026-03-20_garry-tan-gstack-skill-anatomy.html' },
          { title: 'Claude Code Channels vs OpenClaw ★3.6', file: 'processed/2026-03-21_claude-code-channels-vs-openclaw.html' },
          { title: 'Claude Code 配置文件四層架構 ★3.8', file: 'processed/2026-03-21_claude-code-config-files.html' },
          { title: '.claude/ 資料夾完整解析 ★4.0', file: 'processed/2026-03-24_claude-code-dot-claude-folder.html' },
          { title: 'Claude Code Power User Van Horn ★4.5', file: 'processed/2026-03-24_claude-code-power-user.html' },
          { title: 'Claude Code Auto Mode ★4.5', file: 'processed/2026-03-26_claude-code-auto-mode.html' },
          { title: '10 Claude Workflows 省 10+ 小時 ★3.6', file: 'processed/2026-03-28_claude-10-workflows.html' },
          { title: 'Claw Code 開源 CLI 架構深度解析 ★4.2', file: 'processed/2026-04-04_claw-code-open-source-cli.html' },
        ]
      },
      {
        name: 'Claude 使用技巧',
        docs: [
          { title: '50 個被低估的技巧 ★4.2', file: 'processed/2026-01-22_50-claude-tips.html' },
          { title: 'Starter Pack 入門攻略 ★3.8', file: 'processed/2026-02-05_claude-starter-pack.html' },
          { title: 'AI Context 一次設定 ★4.2', file: 'processed/2026-01-19_ai-context-setup.html' },
          { title: 'Shared AI Context Files 團隊共享 ★3.8', file: 'processed/2026-02-25_shared-ai-context-files.html' },
          { title: 'Claude 終極入門指南 Yanhua ★3.6', file: 'processed/2026-03-07_yanhua-claude-ultimate-guide.html' },
          { title: 'Claude Architect 認證自學 ★4.3', file: 'processed/2026-03-16_claude-architect-certification.html' },
          { title: 'Claude Code 最佳實踐完整指南 ★4.2', file: 'processed/2025-03-25_claude-code-best-practices.html' },
          { title: 'Markdown AI 時代通用語言 ★3.5', file: 'processed/2025-03-25_markdown-ai-era.html' },
          { title: 'Obsidian + Claude Code 知識引擎 ★3.2', file: 'processed/2026-03-23_obsidian-claude-code-stack.html' },
        ]
      }
    ]
  },
  {
    name: 'Prompt 工程',
    color: '#7c3aed',
    subclusters: [
      {
        name: '框架與方法論',
        docs: [
          { title: 'Claude 提示工程 10 步驟 ★4.0', file: 'processed/2026-01-30_claude-prompt-engineering.html' },
          { title: 'Anti-Prompts 約束策略 ★3.2', file: 'processed/2026-02-03_anti-prompts-constraints.html' },
          { title: '用提問取代答案 5 步驟 ★3.8', file: 'processed/2026-02-17_ai-questions-system.html' },
          { title: 'Prompt Caching 工程實戰 ★4.2', file: 'processed/2026-02-20_prompt-caching-claude.html' },
          { title: '3-Prompt Pipeline 管道系統 ★3.6', file: 'processed/2025-12-02_prompt-pipeline.html' },
          { title: '四個 Prompts 洞見創造者 ★3.5', file: 'processed/2025-11-04_ai-prompts-insight-creator.html' },
          { title: 'Markdown 終極指南 ★3.8', file: 'processed/2025-02-13_markdown_ai_guide.html' },
          { title: 'YC 創辦人戰略提問框架 ★3.6', file: 'processed/2026-03-16_yc-founder-strategic-prompting.html' },
          { title: '健身 Prompt 模板化結構分析 ★3.4', file: 'processed/2026-03-27_fitness-prompt-engineering.html' },
        ]
      },
      {
        name: 'Context Engineering',
        docs: [
          { title: 'Context Engineering 深度指南 ★4.6', file: 'processed/2026-01-08_context-engineering-agents.html' },
          { title: 'NotebookLM Source Control ★3.2', file: 'processed/2026-02-03_notebooklm-source-control.html' },
          { title: '1M Context Compaction Runbook ★4.0', file: 'processed/2026-03-16_1m-context-compaction.html' },
          { title: 'Agent 繼任者 Prompt ★4.0', file: 'processed/2026-03-16_agent-handoff-successor-prompt.html' },
        ]
      }
    ]
  },
  {
    name: 'Agent 架構',
    color: '#059669',
    subclusters: [
      {
        name: '框架設計',
        docs: [
          { title: 'ACT + BASE Agent Framework ★4.2', file: 'processed/2026-01-13_act-base-framework.html' },
          { title: 'A2UI 使用者介面框架 ★3.8', file: 'processed/2026-01-20_a2ui-framework.html' },
          { title: 'Anthropic Skills vs Agents ★3.5', file: 'processed/2025-12-09_anthropic-skills-agents.html' },
        ]
      },
      {
        name: 'Agent 應用',
        docs: [
          { title: 'Email Triage Agent 自動化 ★4.2', file: 'processed/2026-01-15_email-triage-agent.html' },
          { title: 'Gmail Gemini AI Agents ★3.6', file: 'processed/2026-01-09_gmail-gemini-ai-agents.html' },
          { title: 'AI News Agent (Perplexity) ★3.5', file: 'processed/2025-12-04_ai-news-agent-perplexity.html' },
          { title: 'AI 上司：日本企業 AI 本部長 ★3.2', file: 'processed/2026-01-29_ai-boss-japan-enterprise.html' },
          { title: 'OpenClaw Agent 自託管評測 ★3.8', file: 'processed/2026-02-06_openclaw-agent-review.html' },
          { title: '個人業務 Agent 化 ★3.8', file: 'processed/2026-02-22_personal-business-agent.html' },
          { title: 'Personal Brain OS ★4.2', file: 'processed/2026-02-23_personal-brain-os.html' },
          { title: 'AI 法律實務 Skill 驅動 ★4.5', file: 'processed/2026-02-28_ai-legal-practice-skills.html' },
        ]
      },
      {
        name: 'Agent 研究',
        docs: [
          { title: 'SkillsBench Agent Skills 基準測試 ★4.5', file: 'processed/2026-03-01_skillsbench-agent-skills.html' },
          { title: 'Karpathy autoresearch Agent 自主研究 ★4.5', file: 'processed/2026-03-16_karpathy-autoresearch.html' },
          { title: 'Tw93 Agent 工程實踐 ★4.6', file: 'processed/2026-03-23_tw93-agent-engineering.html' },
          { title: 'Harness Design GAN 式多代理人架構 ★4.5', file: 'processed/2026-03-25_harness-design-long-running-apps.html' },
          { title: 'Harness Engineering 韁繩工程學 ★4.3', file: 'processed/2026-03-28_harness-engineering.html' },
        ]
      },
      {
        name: 'Agent 商務',
        docs: [
          { title: 'A2A Commerce — Agent 商務協議 ★3.8', file: 'processed/2026-02-12_a2a-commerce.html' },
          { title: 'Agent Ecologies & Automation ★4.0', file: 'processed/2026-02-03_agent-ecology-automation.html' },
        ]
      }
    ]
  },
  {
    name: '自動化 & 整合',
    color: '#d97706',
    subclusters: [
      {
        name: null,
        docs: [
          { title: 'Claude + n8n + Synta 技術棧 ★4.2', file: 'processed/2026-01-21_claude-n8n-synta-stack.html' },
          { title: 'AI Habit Tracker Vibe Coding ★3.8', file: 'processed/2026-01-22_ai-habit-tracker-vibe-coding.html' },
          { title: 'AI 內容再利用自動化 ★3.5', file: 'processed/2025-11-15_ai-content-repurposing.html' },
          { title: 'AI Second Brain 語音系統 ★4.2', file: 'processed/2025-11-30_ai-second-brain-voice.html' },
          { title: 'LinkedIn Carousel 自動化 ★3.8', file: 'processed/2026-01-22_linkedin-carousel-skills.html' },
          { title: 'Vibe Coding：Stripe 原型設計 ★3.8', file: 'processed/2026-02-10_vibe-coding-protodash.html' },
          { title: 'AI 圖表生成教學 ★2.2', file: 'processed/2026-02-17_ai-diagram-creation.html' },
          { title: 'Browser Use CLI 瀏覽器自動化 ★4.0', file: 'processed/2026-03-21_browser-use-cli.html' },
        ]
      }
    ]
  },
  {
    name: 'LLM 模型 & 技術',
    color: '#dc2626',
    subclusters: [
      {
        name: 'Claude 模型',
        docs: [
          { title: 'Sonnet 4.6 Dynamic Filtering ★4.0', file: 'processed/2026-02-19_sonnet46-dynamic-filtering.html' },
          { title: 'Sonnet 4.6 Computer Use 五倍躍進 ★3.6', file: 'processed/2026-02-19_claude-sonnet46-computer-use.html' },
        ]
      },
      {
        name: '其他工具',
        docs: [
          { title: 'Typeless 語音輸入評測 ★3.8', file: 'processed/2026-01-10_typeless-voice-review.html' },
          { title: 'Biotech Compass 生技分析 ★4.0', file: 'processed/2026-01-20_biotech-compass-walkthrough.html' },
          { title: 'UX of Search 搜尋體驗 ★4.0', file: 'processed/2025-12-31_ux-search-explored.html' },
          { title: 'AI 工具排毒指南 ★3.8', file: 'processed/2026-01-15_ai-tool-detox.html' },
          { title: 'Data Literacy Loop ★3.5', file: 'processed/2025-12-16_data-literacy-loop.html' },
          { title: 'Cursor 非工程用途指南 ★4.0', file: 'processed/2026-02-25_cursor-non-engineering.html' },
          { title: 'NotebookLM 三大隱藏連接 ★3.4', file: 'processed/2026-03-18_notebooklm-hidden-features.html' },
        ]
      }
    ]
  },
  {
    name: 'AI 產業趨勢',
    color: '#0891b2',
    subclusters: [
      {
        name: '大勢判讀',
        docs: [
          { title: 'Dario Amodei — Technology Adolescence ★4.8', file: 'processed/2026-01-31_amodei-technology-adolescence.html' },
          { title: 'CES 2026 Jensen Huang 全面解析 ★4.4', file: 'processed/2026-01-07_ces-jensen-huang-keynote.html' },
          { title: '2026 Agentic Coding Trends ★4.2', file: 'processed/2026-01-21_agentic-coding-trends.html' },
          { title: '2026 六大 AI 趨勢 ★3.8', file: 'processed/2026-01-15_ai-trends-2026.html' },
          { title: 'Elon Musk 談 AGI 與豐盛時代 ★4.0', file: 'processed/2026-01-08_musk-agi-abundance.html' },
          { title: 'AI 產業劇變：Matt Shumer 警告 ★3.8', file: 'processed/2026-02-11_ai-disruption-shumer.html' },
          { title: 'Agentic Era 使用指南 ★4.0', file: 'processed/2026-02-18_ai-guide-agentic-era.html' },
          { title: '2028 全球智慧危機 ★4.5', file: 'processed/2026-02-23_global-intelligence-crisis.html' },
          { title: 'AI Abundance vs Doom — Kobeissi ★3.6', file: 'processed/2026-02-24_kobeissi-ai-abundance.html' },
        ]
      },
      {
        name: '產業分析',
        docs: [
          { title: 'Apple 選擇 Gemini 戰略 ★3.8', file: 'processed/2026-01-17_apple-gemini-strategy.html' },
          { title: 'AI Amplification 策略壓力測試 ★3.8', file: 'processed/2026-02-19_ai-amplification-strategy.html' },
          { title: 'Batch：主權AI & 購物協議 ★4.0', file: 'processed/2026-01-30_batch-sovereign-ai.html' },
          { title: 'Import AI 438：AI 能力超額 ★4.2', file: 'processed/2025-12-22_import-ai-438-guide.html' },
          { title: 'Import AI 444：LLM Societies ★3.4', file: 'processed/2026-02-10_import-ai-444-societies.html' },
          { title: 'Batch 331 學習指南 ★4.2', file: 'processed/2025-12-10_batch-331-study-guide.html' },
          { title: 'AI 勞動市場影響 Observed Exposure ★4.4', file: 'processed/2026-03-06_labor-market-ai-impact.html' },
          { title: '混亂未來推理框架 SystematicallyLS ★3.6', file: 'processed/2026-03-10_reasoning-messy-future.html' },
          { title: '蘋果 AI 平價戰略 ★3.4', file: 'processed/2026-03-14_apple-ai-affordable-strategy.html' },
          { title: 'Roche × Nvidia AI 工廠製藥業 ★4.0', file: 'processed/2026-03-23_roche-nvidia-ai-factory-pharma.html' },
          { title: '2030 大預言 AI 新貴族與數位農奴 ★3.6', file: 'processed/2026-03-28_ai-2030-prediction.html' },
          { title: '財富大重洗 AI 隱形冠軍 ★3.6', file: 'processed/2025-03-28_ai-wealth-redistribution.html' },
          { title: 'Sid Founder Mode 抗癌 AI 個人化醫療 ★4.5', file: 'processed/2026-04-01_sid-founder-mode-cancer.html' },
        ]
      }
    ]
  },
  {
    name: '安全 & 隱私',
    color: '#be123c',
    subclusters: [
      {
        name: null,
        docs: [
          { title: 'OpenClaw 安全強化三層防護 ★4.2', file: 'processed/2026-02-11_openclaw-security-hardening.html' },
          { title: 'AI 隱私深度解析 ★3.6', file: 'processed/2026-02-05_ai-privacy-deep-dive.html' },
          { title: 'HUMINT：機器無法取代人類情報 ★3.8', file: 'processed/2026-01-08_humint-intelligence-ai.html' },
          { title: 'AI Ethics Fintech Profiling ★4.3', file: 'processed/2026-02-25_ai-ethics-fintech-profiling.html' },
          { title: 'Anthropic vs Pentagon Supply Chain ★4.6', file: 'processed/2026-02-28_anthropic-pentagon-supply-chain.html' },
        ]
      }
    ]
  },
  {
    name: '職場 & 領導力',
    color: '#ca8a04',
    subclusters: [
      {
        name: null,
        docs: [
          { title: 'AI PM 角色重定義 ★3.2', file: 'processed/2026-02-17_ai-pm-builder-culture.html' },
          { title: 'AI 變革管理 8 大差異 ★3.0', file: 'processed/2026-02-09_ai-change-management.html' },
          { title: 'AI 領導力三角 ★3.8', file: 'processed/2025-11-10_ai-leadership-triad.html' },
          { title: 'AI 生產力悖論 ★3.5', file: 'processed/2025-11-20_ai-productivity-paradox.html' },
          { title: 'Future of Work ★4.2', file: 'processed/2026-01-22_future-of-work.html' },
          { title: '5 AI Books All Leaders Should Read ★3.8', file: 'processed/2025-12-18_ai-books-leaders-guide.html' },
          { title: 'Block 裁員 40% AI 組織重構 ★4.0', file: 'processed/2026-02-27_block-ai-layoffs.html' },
          { title: 'AI 高管的子女職涯建議 ★4.0', file: 'processed/2026-03-05_ai-execs-kids-career.html' },
        ]
      }
    ]
  },
  {
    name: '內容創作 & 個人品牌',
    color: '#9333ea',
    subclusters: [
      {
        name: null,
        docs: [
          { title: 'Substack Notes 訂閱成長 ★3.8', file: 'processed/2025-11-10_substack-notes-growth.html' },
          { title: 'X 平台成長策略 ★3.8', file: 'processed/2026-01-22_x-platform-growth.html' },
          { title: 'Newsletter Audit Playbook ★3.5', file: 'processed/2025-11-15_newsletter-audit-playbook.html' },
          { title: '清晰表達三層框架 ★4.0', file: 'processed/2026-01-15_articulation-intelligence.html' },
          { title: 'GEO 實戰 AI Visibility ★3.6', file: 'processed/2026-02-25_geo-ai-visibility.html' },
        ]
      }
    ]
  },
  {
    name: '個人成長 & 心態',
    color: '#0d9488',
    subclusters: [
      {
        name: null,
        docs: [
          { title: 'Human 3.0 人生地圖 ★3.8', file: 'processed/2025-08-26_human30-life-map.html' },
          { title: '如何在一天內重塑人生 ★4.2', file: 'processed/2026-01-13_dan-koe-fix-your-life.html' },
          { title: '多元興趣者事業藍圖 ★3.8', file: 'processed/2026-01-12_dan-koe-multiple-interests.html' },
          { title: 'One Hour of Focus ★4.2', file: 'processed/2026-01-20_one-hour-focus.html' },
          { title: '忘掉金錢 ★3.4', file: 'processed/2026-01-12_forget-about-money.html' },
          { title: '交易心理學：比較陷阱 ★4.0', file: 'processed/2026-01-15_trading-comparison-trap.html' },
          { title: '加密貨幣生存心法 ★4.2', file: 'processed/2026-01-28_crypto-survival-mindset.html' },
          { title: '發現天賦方法論 Morris ★3.6', file: 'processed/2026-03-06_morris-discovering-talent.html' },
          { title: '偏鄉程式教育 蘇文鈺 ★3.6', file: 'processed/2026-03-12_su-program-the-world.html' },
          { title: '創造力回歸指南 Dan Koe ★3.6', file: 'processed/2026-03-26_koe-creativity-protocol.html' },
          { title: '交易員補劑指南 臨床證據分析 ★N/A', file: 'processed/2026-03-26_trader-supplement-guide.html' },
        ]
      }
    ]
  },
  {
    name: '研究方法',
    color: '#6366f1',
    subclusters: [
      {
        name: null,
        docs: [
          { title: '研究初學九大惡 ★3.6', file: 'processed/2026-02-18_research-beginner-sins.html' },
        ]
      }
    ]
  }
];

// ─── Supplemental docs (in learning path but not in 5 main stages) ───
const supplemental = [
  {
    name: 'AI 產業深度',
    docs: [
      { title: 'Elon Musk 談 AGI ★4.0', file: 'processed/2026-01-08_musk-agi-abundance.html' },
      { title: 'AI 產業劇變 Matt Shumer ★3.8', file: 'processed/2026-02-11_ai-disruption-shumer.html' },
      { title: 'Apple 選擇 Gemini 戰略 ★3.8', file: 'processed/2026-01-17_apple-gemini-strategy.html' },
      { title: 'Batch：主權AI ★4.0', file: 'processed/2026-01-30_batch-sovereign-ai.html' },
      { title: 'Import AI 438 ★4.2', file: 'processed/2025-12-22_import-ai-438-guide.html' },
      { title: 'Import AI 444 ★3.4', file: 'processed/2026-02-10_import-ai-444-societies.html' },
      { title: 'Batch 331 學習指南 ★4.2', file: 'processed/2025-12-10_batch-331-study-guide.html' },
      { title: 'A2A Commerce ★3.8', file: 'processed/2026-02-12_a2a-commerce.html' },
      { title: 'Agent Ecologies ★4.0', file: 'processed/2026-02-03_agent-ecology-automation.html' },
      { title: 'Sid Founder Mode 抗癌 AI 個人化醫療 ★4.5', file: 'processed/2026-04-01_sid-founder-mode-cancer.html' },
    ]
  },
  {
    name: 'Agent 應用案例',
    docs: [
      { title: 'Gmail Gemini AI Agents ★3.6', file: 'processed/2026-01-09_gmail-gemini-ai-agents.html' },
      { title: 'AI News Agent ★3.5', file: 'processed/2025-12-04_ai-news-agent-perplexity.html' },
      { title: 'AI 上司：日本企業 ★3.2', file: 'processed/2026-01-29_ai-boss-japan-enterprise.html' },
      { title: 'OpenClaw Agent 評測 ★3.8', file: 'processed/2026-02-06_openclaw-agent-review.html' },
      { title: 'A2UI 框架 ★3.8', file: 'processed/2026-01-20_a2ui-framework.html' },
    ]
  },
  {
    name: '工具與技術',
    docs: [
      { title: 'Sonnet 4.6 Dynamic Filtering ★4.0', file: 'processed/2026-02-19_sonnet46-dynamic-filtering.html' },
      { title: 'Sonnet 4.6 Computer Use ★3.6', file: 'processed/2026-02-19_claude-sonnet46-computer-use.html' },
      { title: 'Claude Code 2.1.0 更新 ★3.5', file: 'processed/2026-01-09_claude-code-210-update.html' },
      { title: 'v2.1.74–v2.1.84 版本 Changelog ★4.0', file: 'processed/2026-03-27_claude-code-version-changelog.html' },
      { title: '產品導師團 ★3.2', file: 'processed/2026-02-03_claude-code-product-mentors.html' },
      { title: 'Prompt Caching ★4.2', file: 'processed/2026-02-20_prompt-caching-claude.html' },
      { title: '3-Prompt Pipeline ★3.6', file: 'processed/2025-12-02_prompt-pipeline.html' },
      { title: 'Skills 自動化 ★3.6', file: 'processed/2026-02-10_claude-skills-automation.html' },
      { title: 'Project Memory ★3.5', file: 'processed/2025-12-10_claude-project-memory.html' },
      { title: 'Projects 產品健康監測 ★4.0', file: 'processed/2026-01-06_claude-projects-product-health.html' },
      { title: 'Cowork 桌面代理人 ★3.8', file: 'processed/2026-02-19_claude-cowork-desktop-agent.html' },
      { title: 'UX of Search ★4.0', file: 'processed/2025-12-31_ux-search-explored.html' },
      { title: 'Biotech Compass ★4.0', file: 'processed/2026-01-20_biotech-compass-walkthrough.html' },
    ]
  },
  {
    name: '自動化實作',
    docs: [
      { title: 'AI 內容再利用 ★3.5', file: 'processed/2025-11-15_ai-content-repurposing.html' },
      { title: 'LinkedIn Carousel ★3.8', file: 'processed/2026-01-22_linkedin-carousel-skills.html' },
      { title: 'Vibe Coding Protodash ★3.8', file: 'processed/2026-02-10_vibe-coding-protodash.html' },
      { title: 'AI 圖表生成 ★2.2', file: 'processed/2026-02-17_ai-diagram-creation.html' },
    ]
  },
  {
    name: '內容創作 & 個人品牌',
    docs: [
      { title: 'GEO 實戰 AI Visibility ★3.6', file: 'processed/2026-02-25_geo-ai-visibility.html' },
      { title: 'Substack Notes 成長 ★3.8', file: 'processed/2025-11-10_substack-notes-growth.html' },
      { title: 'X 平台成長策略 ★3.8', file: 'processed/2026-01-22_x-platform-growth.html' },
      { title: 'Newsletter Audit ★3.5', file: 'processed/2025-11-15_newsletter-audit-playbook.html' },
    ]
  },
  {
    name: '個人成長 & 心態',
    docs: [
      { title: 'Human 3.0 人生地圖 ★3.8', file: 'processed/2025-08-26_human30-life-map.html' },
      { title: '一天內重塑人生 ★4.2', file: 'processed/2026-01-13_dan-koe-fix-your-life.html' },
      { title: '多元興趣者藍圖 ★3.8', file: 'processed/2026-01-12_dan-koe-multiple-interests.html' },
      { title: 'One Hour of Focus ★4.2', file: 'processed/2026-01-20_one-hour-focus.html' },
      { title: '忘掉金錢 ★3.4', file: 'processed/2026-01-12_forget-about-money.html' },
      { title: '交易心理學 ★4.0', file: 'processed/2026-01-15_trading-comparison-trap.html' },
      { title: '加密貨幣生存心法 ★4.2', file: 'processed/2026-01-28_crypto-survival-mindset.html' },
      { title: '發現天賦方法論 Morris ★3.6', file: 'processed/2026-03-06_morris-discovering-talent.html' },
      { title: '偏鄉程式教育 蘇文鈺 Program the World ★3.6', file: 'processed/2026-03-12_su-program-the-world.html' },
    ]
  },
  {
    name: '研究方法',
    docs: [
      { title: '研究初學九大惡 ★3.6', file: 'processed/2026-02-18_research-beginner-sins.html' },
    ]
  }
];

// ─── Helper: Generate mindmap markdown from stages ───
function generatePathMarkdown() {
  let md = '# David AI Learning Path\n';
  for (const stage of stages) {
    md += `\n## ${stage.icon} Stage ${stage.id}：${stage.title}\n`;
    const required = stage.docs.filter(d => d.required);
    const optional = stage.docs.filter(d => !d.required);
    if (required.length) {
      md += `### 必讀 — ${stage.description.split('，')[0]}\n`;
      for (const d of required) {
        md += `- [${d.title}](docs/${d.file})\n`;
      }
    }
    if (optional.length) {
      md += `### 選讀 — 延伸學習\n`;
      for (const d of optional) {
        md += `- [${d.title}](docs/${d.file})\n`;
      }
    }
  }
  // Supplemental
  md += '\n## 📖 補充學習\n';
  for (const group of supplemental) {
    md += `### ${group.name}\n`;
    for (const d of group.docs) {
      md += `- [${d.title}](docs/${d.file})\n`;
    }
  }
  return md;
}

// ─── Helper: Generate mindmap markdown from topic clusters ───
function generateTopicMarkdown() {
  let md = '# David AI Learning\n';
  for (const cluster of topicClusters) {
    md += `## ${cluster.name}\n`;
    for (const sub of cluster.subclusters) {
      if (sub.name) {
        md += `### ${sub.name}\n`;
      }
      for (const d of sub.docs) {
        md += `- [${d.title}](docs/${d.file})\n`;
      }
    }
  }
  return md;
}

// Export for Node.js (add-doc.js) or browser use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { stages, topicClusters, supplemental, generatePathMarkdown, generateTopicMarkdown };
}
