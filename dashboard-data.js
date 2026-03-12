const documents = [
  {
    "date": "2026-03-12",
    "title": "偏鄉程式教育 - 蘇文鈺 Program the World",
    "source": "商業周刊第2000期 / 程倚華、陳盈螢",
    "tags": [
      "Analysis",
      "Framework",
      "Tool"
    ],
    "rating": 3.6,
    "summary": "成大教授蘇文鈺十年偏鄉程式教育，填補弱勢孩子的想像力斷層，建立自循環師資系統。",
    "lines": 556,
    "file": "2026-03-12_su-program-the-world.html"
  },
  {
    "date": "2026-03-11",
    "title": "Claude Code 互動模式 - Interactive Mode Reference",
    "source": "Anthropic / Claude Code Docs",
    "tags": [
      "Anthropic-Docs",
      "Tool",
      "API",
      "Framework"
    ],
    "rating": 4,
    "summary": "Claude Code 鍵盤快捷鍵、Vim 模式、內建指令、背景任務完整參考手冊。",
    "lines": 812,
    "file": "2026-03-11_claude-code-interactive-mode.html"
  },
  {
    "date": "2026-03-11",
    "title": "Skill-creator 史詩級更新 - 四大評估能力全解析",
    "source": "数字生命卡兹克 / @Khazix0918",
    "tags": [
      "Agent",
      "Tool",
      "Framework",
      "Automation"
    ],
    "rating": 4,
    "summary": "Anthropic Skills 生態基石更新：評估系統、基準測試、多代理並行、描述調優四大能力全面解析。",
    "lines": 650,
    "file": "2026-03-11_skill-creator-epic-update.html"
  },
  {
    "date": "2026-03-10",
    "title": "如何在混亂的未來中推理 - SystematicallyLS Messy Future",
    "source": "SystematicallyLS (@systematicls)",
    "tags": [
      "Analysis",
      "Framework",
      "Agent",
      "LLM"
    ],
    "rating": 3.6,
    "summary": "量化交易員轉創業者的 AI 未來推理框架。四大護城河、不對稱下注、行動即資訊。",
    "lines": 674,
    "file": "2026-03-10_reasoning-messy-future.html"
  },
  {
    "date": "2026-03-09",
    "title": "Claude Skill 建構完整指南 - Anthropic Official",
    "source": "Anthropic / resources.anthropic.com",
    "tags": [
      "Anthropic-Docs",
      "Agent",
      "Tool",
      "Framework",
      "API"
    ],
    "rating": 4.2,
    "summary": "Anthropic 官方 Skill 建構指南。涵蓋設計原則、YAML 規格、5 大 Pattern、MCP 整合與測試迭代。",
    "lines": 924,
    "file": "2026-03-09_building-skills-guide.html"
  },
  {
    "date": "2026-03-07",
    "title": "Claude 終極入門指南 - Yanhua 100hr 實測",
    "source": "Yanhua (@yanhua1010) / X (Twitter)",
    "tags": [
      "Tool",
      "LLM",
      "Framework",
      "Agent"
    ],
    "rating": 3.6,
    "summary": "Yanhua 百小時實測 Claude 指南。訂閱方案、Prompt 三段式、模型選擇、Code/Cowork/Skills 進階工具。",
    "lines": 700,
    "file": "2026-03-07_yanhua-claude-ultimate-guide.html"
  },
  {
    "date": "2026-03-06",
    "title": "AI 勞動市場影響 - Observed Exposure 新指標",
    "source": "Massenkoff & McCrory / Anthropic Research",
    "tags": [
      "Anthropic-Eng",
      "Research",
      "Analysis",
      "LLM",
      "Framework"
    ],
    "rating": 4.4,
    "summary": "Anthropic 提出 Observed Exposure 新指標，結合理論能力與實際使用數據衡量 AI 對就業市場影響。",
    "lines": 588,
    "file": "2026-03-06_labor-market-ai-impact.html"
  },
  {
    "date": "2026-03-06",
    "title": "發現天賦方法論 - Morris 認知優勢框架",
    "source": "Morris (@Morris_LT)",
    "tags": [
      "Framework",
      "Analysis"
    ],
    "rating": 3.6,
    "summary": "Morris 天賦發現三方法：注意力觀察、過度特質轉化、停不下來的事。認知優勢 × 持續投入 = 複利。",
    "lines": 535,
    "file": "2026-03-06_morris-discovering-talent.html"
  },
  {
    "date": "2026-03-05",
    "title": "AI 高管的子女職涯建議 - WSJ Career Advice",
    "source": "Lauren Weber / Wall Street Journal",
    "tags": [
      "Analysis",
      "Framework",
      "Agent",
      "LLM"
    ],
    "rating": 4,
    "summary": "五位 AI 高管對子女的職涯建議：彈性、能力組合、元認知、責任、同理心。",
    "lines": 564,
    "file": "2026-03-05_ai-execs-kids-career.html"
  },
  {
    "date": "2026-03-05",
    "title": "Claude Code 資料爬取九大方法 - Aniket Panjwani",
    "source": "Aniket Panjwani / @aniketapanjwani",
    "tags": [
      "Tool",
      "Agent",
      "API",
      "Automation"
    ],
    "rating": 4,
    "summary": "Claude Code 爬取資料完整指南：9 種方法從直接爬取到 Agent Browser 認證登入。",
    "lines": 724,
    "file": "2026-03-05_claude-code-scraping-nine-ways.html"
  },
  {
    "date": "2026-03-02",
    "title": "Claude Code 完整文件參考指南",
    "source": "Claude Code Docs / code.claude.com",
    "tags": [
      "Anthropic-Docs",
      "Tool",
      "Agent",
      "Automation"
    ],
    "rating": 4.5,
    "summary": "",
    "lines": 1003,
    "file": "2026-03-02_claude-code-complete-docs.html"
  },
  {
    "date": "2026-03-01",
    "title": "SkillsBench - Agent Skills 基準測試深度解析",
    "source": "Xiangyi Li et al. / arXiv:2602.12670",
    "tags": [
      "Agent",
      "Research",
      "Framework",
      "Tool"
    ],
    "rating": 4.5,
    "summary": "首個 Agent Skills 基準測試。Curated Skills +16.2pp，Self-generated 無效，2-3 Skills 最佳。",
    "lines": 601,
    "file": "2026-03-01_skillsbench-agent-skills.html"
  },
  {
    "date": "2026-02-28",
    "title": "AI 法律實務革命 - Skill 驅動精品律所",
    "source": "Zack Shapiro",
    "tags": [
      "Agent",
      "Tool",
      "Skill",
      "Framework",
      "Analysis"
    ],
    "rating": 4.5,
    "summary": "小型律所用 Claude Skills 擊敗大型事務所。Skill vs Prompt、判斷力不可取代、訂閱制商業模式。",
    "lines": 560,
    "file": "2026-02-28_ai-legal-practice-skills.html"
  },
  {
    "date": "2026-02-28",
    "title": "Anthropic vs Pentagon - Supply Chain Risk 事件分析",
    "source": "Anthropic Official Statement / Multi-source Analysis",
    "tags": [
      "Anthropic-Docs",
      "Analysis",
      "Agent",
      "Tool",
      "Security"
    ],
    "rating": 4.6,
    "summary": "Anthropic 拒絕 Pentagon 全面授權要求，被列為供應鏈風險。AI 產業紅線、法律爭議與企業啟示。",
    "lines": 647,
    "file": "2026-02-28_anthropic-pentagon-supply-chain.html"
  },
  {
    "date": "2026-02-28",
    "title": "Claude Code Agent 工具設計 - Seeing Like an Agent",
    "source": "Thariq (@trq212) / Anthropic",
    "tags": [
      "Anthropic-Eng",
      "Agent",
      "Tool",
      "Framework",
      "LLM"
    ],
    "rating": 4.4,
    "summary": "Claude Code 團隊分享 Agent 工具設計哲學：Action Space、Progressive Disclosure、工具演化。",
    "lines": 617,
    "file": "2026-02-28_claude-code-agent-tools.html"
  },
  {
    "date": "2026-02-27",
    "title": "Agent Skills - 模組化能力架構與漸進式揭露",
    "source": "Anthropic / Claude Documentation",
    "tags": [
      "Anthropic-Docs",
      "Agent",
      "Tool",
      "API",
      "Framework"
    ],
    "rating": 4,
    "summary": "Claude Agent Skills 三層漸進式載入架構、跨平台部署、自訂 Skill 建構指南。",
    "lines": 589,
    "file": "2026-02-27_agent-skills-architecture.html"
  },
  {
    "date": "2026-02-27",
    "title": "Anthropic 內部如何使用 Claude Code - 10 團隊實戰",
    "source": "Anthropic / Official Case Study",
    "tags": [
      "Anthropic-Docs",
      "Tool",
      "Agent",
      "Automation",
      "Framework"
    ],
    "rating": 4.3,
    "summary": "Anthropic 十個內部團隊使用 Claude Code 的實戰模式、影響評估與最佳實踐。",
    "lines": 820,
    "file": "2026-02-27_anthropic-claude-code-internal.html"
  },
  {
    "date": "2026-02-27",
    "title": "Block 裁員 40% - AI 驅動組織重構",
    "source": "Jack Dorsey / Block Inc. Shareholder Letter & X Post",
    "tags": [
      "Analysis",
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 4,
    "summary": "Block 裁員 4000 人，Dorsey 宣稱 AI 工具讓小團隊更高效。分析 AI 裁員敘事 vs 現實、領導決策框架、製藥業啟示。",
    "lines": 567,
    "file": "2026-02-27_block-ai-layoffs.html"
  },
  {
    "date": "2026-02-27",
    "title": "Claude Cowork 設定指南 - Nav Toor 五大功能解析",
    "source": "Nav Toor / @heynavtoor",
    "tags": [
      "Tool",
      "Agent",
      "Automation",
      "Framework"
    ],
    "rating": 3.8,
    "summary": "Cowork 五大功能完整解析：File System、AskUserQuestion、Plugins、Instructions、Connectors 設定與實戰。",
    "lines": 697,
    "file": "2026-02-27_claude-cowork-setup.html"
  },
  {
    "date": "2026-02-26",
    "title": "Skills 解密 - Markdown 資料夾的威力",
    "source": "Gabriel Chua / OpenAI DevRel",
    "tags": [
      "Agent",
      "Prompt",
      "Framework",
      "Tool"
    ],
    "rating": 4,
    "summary": "Skills 架構解析：Progressive Disclosure、模組化結構、資源整合三大優勢。",
    "lines": 523,
    "file": "2026-02-26_skills-markdown-folders.html"
  },
  {
    "date": "2026-02-25",
    "title": "AI Ethics - Fintech Psychological Profiling",
    "source": "Joel Salinas & Mila Agius / Substack",
    "tags": [
      "Agent",
      "Tool",
      "Framework",
      "Security",
      "Analysis"
    ],
    "rating": 4.3,
    "summary": "Fintech psychological profiling case study. PCL framework for ethical personalization without exploitation.",
    "lines": 548,
    "file": "2026-02-25_ai-ethics-fintech-profiling.html"
  },
  {
    "date": "2026-02-25",
    "title": "Cursor 非工程用途指南 - PM 設計師實戰",
    "source": "Rich Holmes / Department of Product",
    "tags": [
      "Tool",
      "Agent",
      "Automation",
      "Integration"
    ],
    "rating": 4,
    "summary": "Cursor 非工程師指南：視覺化架構、Browser 測試、Plugin Pipeline、Claude Code + Figma MCP 整合。",
    "lines": 485,
    "file": "2026-02-25_cursor-non-engineering.html"
  },
  {
    "date": "2026-02-25",
    "title": "GEO 實戰 - AI Visibility Framework",
    "source": "Darlene Killen / The Visible Practitioner via The AI Maker",
    "tags": [
      "Framework",
      "Tool",
      "Content",
      "Analysis"
    ],
    "rating": 3.6,
    "summary": "GEO 框架：Entity Recognition、Semantic Consistency、Cross-Platform 三信號讓 AI 推薦你。",
    "lines": 633,
    "file": "2026-02-25_geo-ai-visibility.html"
  },
  {
    "date": "2026-02-25",
    "title": "Shared AI Context Files - 團隊共享上下文",
    "source": "Joel Salinas & Hannah Stulberg / Superhuman AI",
    "tags": [
      "Tool",
      "Agent",
      "Automation",
      "Framework"
    ],
    "rating": 3.8,
    "summary": "CLAUDE.md 共享上下文檔案如何將個人 AI 使用轉化為團隊級知識複利效應。",
    "lines": 622,
    "file": "2026-02-25_shared-ai-context-files.html"
  },
  {
    "date": "2026-02-24",
    "title": "AI Abundance vs Doom - Kobeissi Counter-Narrative",
    "source": "The Kobeissi Letter / @KobeissiLetter",
    "tags": [
      "Analysis",
      "LLM",
      "Framework",
      "Agent"
    ],
    "rating": 3.6,
    "summary": "Kobeissi 反駁 AI 末日論。Abundance GDP 框架、價格崩跌非裁員才是核心、生產力擴張論。",
    "lines": 565,
    "file": "2026-02-24_kobeissi-ai-abundance.html"
  },
  {
    "date": "2026-02-23",
    "title": "2028 全球智慧危機 - AI Bull Case Gone Wrong",
    "source": "Citrini Research / Alap Shah",
    "tags": [
      "Analysis",
      "Agent",
      "Framework",
      "LLM"
    ],
    "rating": 4.5,
    "summary": "以 2028 回顧體裁推演 AI 導致白領失業、消費萎縮、房貸危機的負反饋螺旋。",
    "lines": 640,
    "file": "2026-02-23_global-intelligence-crisis.html"
  },
  {
    "date": "2026-02-23",
    "title": "Personal Brain OS - File System as AI Agent Memory",
    "source": "Muratcan Koylan / X Thread",
    "tags": [
      "Agent",
      "Framework",
      "Tool",
      "Automation"
    ],
    "rating": 4.2,
    "summary": "用 Git repo + 80 個檔案打造 AI Agent 個人 OS，實現 Progressive Disclosure 與 Context Engineering。",
    "lines": 626,
    "file": "2026-02-23_personal-brain-os.html"
  },
  {
    "date": "2026-02-22",
    "title": "Boris Tane Claude Code Workflow - Plan Before Code",
    "source": "Boris Tane / Personal Blog",
    "tags": [
      "Agent",
      "Tool",
      "Framework",
      "Prompt"
    ],
    "rating": 4.4,
    "summary": "Boris Tane 九個月 Claude Code 工作流：Research → Plan → Annotate → Implement 四階段紀律。",
    "lines": 566,
    "file": "2026-02-22_boris-tane-claude-code-workflow.html"
  },
  {
    "date": "2026-02-22",
    "title": "Claude Code Best Practices - 環境配置到平行擴展",
    "source": "Anthropic / Claude Code Documentation",
    "tags": [
      "Anthropic-Docs",
      "Tool",
      "Agent",
      "Automation",
      "Framework"
    ],
    "rating": 4.3,
    "summary": "Claude Code 完整最佳實踐：驗證迴路、Context 管理、CLAUDE.md、平行工作流。",
    "lines": 630,
    "file": "2026-02-22_claude-code-best-practices.html"
  },
  {
    "date": "2026-02-22",
    "title": "Claude Code 產品哲學 - Boris Cherny 訪談",
    "source": "Boris Cherny / The Lightcone (YC Podcast)",
    "tags": [
      "Agent",
      "Tool",
      "Framework",
      "Analysis"
    ],
    "rating": 4.5,
    "summary": "Boris Cherny 談 Claude Code 從終端原型到 10 億美元產品的旅程。潛在需求、為未來模型構建、永遠不要跟模型對賭。",
    "lines": 560,
    "file": "2026-02-22_claude-code-product-philosophy.html"
  },
  {
    "date": "2026-02-22",
    "title": "Claude Cowork 終極指南 - PM 桌面 Agent",
    "source": "Paweł Huryn / Product Compass",
    "tags": [
      "Agent",
      "Tool",
      "Automation",
      "Integration"
    ],
    "rating": 4.2,
    "summary": "Cowork 桌面 Agent 完整指南：Skills/Plugins、MCP 連接、跨 Session 記憶、與 Chat/Code 比較。",
    "lines": 576,
    "file": "2026-02-22_claude-cowork-guide.html"
  },
  {
    "date": "2026-02-22",
    "title": "個人業務 Agent 化 - 從時間槓桿到算法槓桿",
    "source": "XinGPT (@xingpt) / X (Twitter)",
    "tags": [
      "Agent",
      "Automation",
      "Framework",
      "Tool"
    ],
    "rating": 3.8,
    "summary": "投研 KOL 拆解個人業務 Agent 化：知識庫→Skills→CRON 三層架構，從時間槓桿到算法槓桿。",
    "lines": 579,
    "file": "2026-02-22_personal-business-agent.html"
  },
  {
    "date": "2026-02-20",
    "title": "Claude Cowork 終極指南：7 個進階 Agentic AI 工作流程",
    "source": "The AI Maker (Wyndo) / theaimaker.co",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "7 個進階 Agentic AI 工作流程教學，從基礎到高階的 Claude Cowork 應用指南",
    "lines": 694,
    "file": "2026-02-20_claude-cowork-agentic-workflows.html"
  },
  {
    "date": "2026-02-20",
    "title": "Prompt Caching 完全指南 - Claude Code 工程實戰",
    "source": "Thariq (@trq212) / Anthropic Claude Code Team",
    "tags": [
      "Anthropic-Eng",
      "LLM",
      "API",
      "Tool"
    ],
    "rating": 4.2,
    "summary": "Anthropic官方Prompt Caching工程實戰指南，涵蓋快取機制原理、工具穩定性設計與成本優化策略",
    "lines": 668,
    "file": "2026-02-20_prompt-caching-claude.html"
  },
  {
    "date": "2026-02-19",
    "title": "AI Amplification：用 AI 壓力測試策略假設",
    "source": "Joel Salinas / Leadership in Change",
    "tags": [
      "LLM",
      "Prompt",
      "Tool",
      "Agent"
    ],
    "rating": 3.8,
    "summary": "AI Amplification概念：用AI壓力測試策略假設，五個問題揭露跨領域決策盲點的四步驟框架",
    "lines": 572,
    "file": "2026-02-19_ai-amplification-strategy.html"
  },
  {
    "date": "2026-02-19",
    "title": "Claude CoWork 完全攻略：從聊天機器人到桌面代理人",
    "source": "@hooeem (X/Twitter)",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "從聊天機器人升級到桌面代理人的完整攻略，搭配 Sonnet + Opus 的使用指南",
    "lines": 696,
    "file": "2026-02-19_claude-cowork-desktop-agent.html"
  },
  {
    "date": "2026-02-19",
    "title": "Claude Sonnet 4.6 - AI Computer Use 的五倍躍進",
    "source": "Joel Salinas",
    "tags": [
      "LLM",
      "Tool",
      "Agent",
      "Automation"
    ],
    "rating": 3.6,
    "summary": "Anthropic發布Claude Sonnet 4.6，Computer Use能力16個月提升近五倍",
    "lines": 520,
    "file": "2026-02-19_claude-sonnet46-computer-use.html"
  },
  {
    "date": "2026-02-19",
    "title": "Sonnet 4.6 Dynamic Filtering - AI Agent Cost Revolution",
    "source": "Tom Crawshaw @tomcrawshaw01",
    "tags": [
      "LLM",
      "Agent",
      "Automation",
      "Tool"
    ],
    "rating": 4,
    "summary": "Sonnet 4.6的Dynamic Filtering功能讓AI Agent準確率提升11%、Token消耗降低24%，直接影響成本計算",
    "lines": 492,
    "file": "2026-02-19_sonnet46-dynamic-filtering.html"
  },
  {
    "date": "2026-02-18",
    "title": "AI 使用指南：代理時代 - Ethan Mollick",
    "source": "Ethan Mollick / One Useful Thing",
    "tags": [
      "LLM",
      "Agent",
      "Tool"
    ],
    "rating": 4,
    "summary": "Ethan Mollick的AI使用指南第八版：從聊天機器人到代理時代的三層框架（Models/Apps/Harnesses）",
    "lines": 631,
    "file": "2026-02-18_ai-guide-agentic-era.html"
  },
  {
    "date": "2026-02-18",
    "title": "研究初學九大惡 - AI 時代的研究基本功",
    "source": "Yen-Chi Chen / Facebook Post",
    "tags": [
      "Research",
      "Analysis"
    ],
    "rating": 3.6,
    "summary": "歸納研究初學者常犯的九大錯誤，從問題定義到方法論選擇，強調AI時代研究基本功的重要性",
    "lines": 491,
    "file": "2026-02-18_research-beginner-sins.html"
  },
  {
    "date": "2026-02-17",
    "title": "AI 圖表生成教學 - Nano Banana × Gemini",
    "source": "Nano Banana Infographic",
    "tags": [
      "Tool",
      "Prompt",
      "Automation"
    ],
    "rating": 2.2,
    "summary": "用Gemini圖片生成功能將素材轉化為結構化圖表的6步驟流程及可複用Prompt模板",
    "lines": 366,
    "file": "2026-02-17_ai-diagram-creation.html"
  },
  {
    "date": "2026-02-17",
    "title": "AI 時代的 PM 角色重定義：Builder Culture 回歸",
    "source": "Mike Krieger / Anthropic Labs",
    "tags": [
      "Anthropic-Eng",
      "Agent",
      "Tool",
      "LLM",
      "Automation"
    ],
    "rating": 3.2,
    "summary": "AI時代PM角色重定義：從協調者到建造者，Anthropic招募Research PM揭示的產業訊號",
    "lines": 589,
    "file": "2026-02-17_ai-pm-builder-culture.html"
  },
  {
    "date": "2026-02-17",
    "title": "AI Question-Generation System - 用提問取代答案的 5 步驟系統",
    "source": "Wyndo / AI Maker Labs",
    "tags": [
      "Prompt",
      "LLM",
      "Tool"
    ],
    "rating": 3.8,
    "summary": "用提問取代答案的5步驟系統：從基礎提問到問題轉化實驗，重塑AI使用心智模型",
    "lines": 595,
    "file": "2026-02-17_ai-questions-system.html"
  },
  {
    "date": "2026-02-12",
    "title": "Agent-to-Agent Commerce - Q1 2026 領導者必知",
    "source": "Joel Salinas & JHong / Substack",
    "tags": [
      "Agent",
      "API"
    ],
    "rating": 3.8,
    "summary": "Agent-to-Agent Commerce 協議與基礎設施。",
    "lines": 563,
    "file": "2026-02-12_a2a-commerce.html"
  },
  {
    "date": "2026-02-11",
    "title": "AI 產業劇變：從業者的第一手警告 - Matt Shumer",
    "source": "Matt Shumer (@mattshumer_)",
    "tags": [
      "LLM",
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "AI產業劇變從業者第一手警告：Matt Shumer對AI產業快速變化的分析與行動指南",
    "lines": 715,
    "file": "2026-02-11_ai-disruption-shumer.html"
  },
  {
    "date": "2026-02-11",
    "title": "OpenClaw 安全強化完整指南 - 三層防護實作",
    "source": "Wyndo & Fernando Lucktemberg / Next Kick Labs",
    "tags": [
      "Security",
      "Agent",
      "Tool"
    ],
    "rating": 4.2,
    "summary": "OpenClaw安全強化三層防護實作指南，涵蓋MCP Server權限控制、API Key分級管理與Allowlist思維",
    "lines": 927,
    "file": "2026-02-11_openclaw-security-hardening.html"
  },
  {
    "date": "2026-02-10",
    "title": "Claude Skills：每月省下 40+ 小時的文件自動化系統",
    "source": "Joel Salinas / Substack",
    "tags": [
      "Tool",
      "Automation",
      "Prompt"
    ],
    "rating": 3.6,
    "summary": "Claude Skills功能實戰入門，5個自訂Skill自動化提案簡報等文件",
    "lines": 537,
    "file": "2026-02-10_claude-skills-automation.html"
  },
  {
    "date": "2026-02-10",
    "title": "Import AI #444: LLM Societies, ChipBench, Erdos Problems",
    "source": "Jack Clark / Import AI",
    "tags": [
      "LLM",
      "Research",
      "Tool"
    ],
    "rating": 3.4,
    "summary": "LLM思維社會、晶片設計基準與AI科學研究瓶頸，生成vs判斷的差距",
    "lines": 563,
    "file": "2026-02-10_import-ai-444-societies.html"
  },
  {
    "date": "2026-02-10",
    "title": "Vibe Coding 實戰：Stripe 如何用 AI 重塑原型設計流程",
    "source": "Department of Product (DoP) / Rich Holmes",
    "tags": [
      "Tool",
      "Automation",
      "Prompt",
      "Agent"
    ],
    "rating": 3.8,
    "summary": "Stripe設計主管開發Protodash工具，讓設計師用真實元件即時原型設計，展示建構民主化的組織轉變",
    "lines": 508,
    "file": "2026-02-10_vibe-coding-protodash.html"
  },
  {
    "date": "2026-02-09",
    "title": "AI 驅動變革的 8 大差異 - 變革領導者必知",
    "source": "Tim Creasey / Prosci",
    "tags": [
      "Analysis",
      "Automation",
      "Framework"
    ],
    "rating": 3,
    "summary": "AI驅動變革的8大差異：Prosci調查1107位專業人士發現AI導入障礙主要是人員熟練度而非技術",
    "lines": 622,
    "file": "2026-02-09_ai-change-management.html"
  },
  {
    "date": "2026-02-06",
    "title": "OpenClaw 完整評測指南 - AI Agent 自託管實戰",
    "source": "Wyndo / AI Maker Labs",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "OpenClaw開源AI Agent框架完整評測，涵蓋架構解析、安全風險評估、五大VPS託管平台比較及實際使用案例",
    "lines": 636,
    "file": "2026-02-06_openclaw-agent-review.html"
  },
  {
    "date": "2026-02-05",
    "title": "AI 時代的隱私深度解析",
    "source": "Joel Salinas & Mohib Ur Rehman / SK NEXUS",
    "tags": [
      "LLM",
      "Tool",
      "Security"
    ],
    "rating": 3.6,
    "summary": "AI時代隱私深度解析：AI系統從資料中學習改變了安全定義，提出四項風險降低策略",
    "lines": 518,
    "file": "2026-02-05_ai-privacy-deep-dive.html"
  },
  {
    "date": "2026-02-05",
    "title": "Claude Cowork 實戰指南：為什麼專業人士正在轉換 AI 工作流程",
    "source": "Ruben Hassid Newsletter",
    "tags": [
      "Tool",
      "Agent",
      "Automation",
      "Prompt"
    ],
    "rating": 3.8,
    "summary": "記錄從 ChatGPT 轉到 Claude Cowork 的完整體驗，解決指令遵循與長對話穩定性問題",
    "lines": 548,
    "file": "2026-02-05_claude-cowork-practical-guide.html"
  },
  {
    "date": "2026-02-05",
    "title": "Claude 終極入門包：指南、工具、資源完整攻略",
    "source": "@aiedge_ on X",
    "tags": [
      "Tool",
      "Prompt",
      "Agent"
    ],
    "rating": 3.8,
    "summary": "Claude全面入門指南，涵蓋工具資源與最佳實踐攻略",
    "lines": 938,
    "file": "2026-02-05_claude-starter-pack.html"
  },
  {
    "date": "2026-02-03",
    "title": "Import AI 443: Agent Ecologies, AI R&D Automation, and the Internet in Transition",
    "source": "Jack Clark / Import AI Newsletter",
    "tags": [
      "Agent",
      "LLM",
      "Automation",
      "Tool"
    ],
    "rating": 4,
    "summary": "AI Agent生態系、AI研發自動化的國安意涵、O-ring自動化概念，涵蓋多個AI重塑人機邊界的前沿趨勢",
    "lines": 697,
    "file": "2026-02-03_agent-ecology-automation.html"
  },
  {
    "date": "2026-02-03",
    "title": "Anti-Prompts：用「不要做什麼」提升 AI 輸出品質的 8 個約束策略",
    "source": "@godofprompt (X/Twitter)",
    "tags": [
      "Prompt",
      "LLM",
      "Tool"
    ],
    "rating": 3.2,
    "summary": "分享 8 個負面約束提示技巧，透過告訴 AI 不該做什麼來精煉輸出品質",
    "lines": 448,
    "file": "2026-02-03_anti-prompts-constraints.html"
  },
  {
    "date": "2026-02-03",
    "title": "Claude Code Interactive Mode 完整參考指南",
    "source": "Claude Code Docs / code.claude.com",
    "tags": [
      "Anthropic-Docs",
      "Tool",
      "Agent",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "Claude Code 互動模式完整操作手冊：鍵盤快捷鍵、Vim 模式、背景指令與 Bash 模式",
    "lines": 550,
    "file": "2026-02-03_claude-code-interactive-mode.html"
  },
  {
    "date": "2026-02-03",
    "title": "用 Claude Code 打造世界級產品導師團",
    "source": "Rich Holmes / Knowledge Series #98",
    "tags": [
      "Agent",
      "Tool",
      "Prompt"
    ],
    "rating": 3.2,
    "summary": "示範用 Claude Code 建立 AI 產品導師系統，將名人思維轉化為可互動的角色檔",
    "lines": 555,
    "file": "2026-02-03_claude-code-product-mentors.html"
  },
  {
    "date": "2026-02-03",
    "title": "NotebookLM 進階指南：Source Control 消除 AI 幻覺",
    "source": "Joel Salinas / Leadership in Change",
    "tags": [
      "Tool",
      "LLM",
      "Prompt"
    ],
    "rating": 3.2,
    "summary": "介紹Google NotebookLM的Source Control核心功能，強制從上傳文件擷取資訊並附引用，消除AI幻覺",
    "lines": 694,
    "file": "2026-02-03_notebooklm-source-control.html"
  },
  {
    "date": "2026-02-01",
    "title": "Claude Code 進階生產力技巧 - Boris Cherny",
    "source": "@bcherny on X",
    "tags": [
      "Agent",
      "Tool",
      "Automation",
      "Prompt"
    ],
    "rating": 4.6,
    "summary": "Boris Cherny 分享 Claude Code 進階生產力技巧，提升 AI 輔助開發工作流效率",
    "lines": 836,
    "file": "2026-02-01_claude-code-power-tips.html"
  },
  {
    "date": "2026-02-01",
    "title": "讓 Claude 變成你的形狀：CLAUDE.md 持續改善方法論",
    "source": "社群文章",
    "tags": [
      "Agent",
      "Tool",
      "Automation",
      "Prompt"
    ],
    "rating": 4.2,
    "summary": "CLAUDE.md 的 PDCA 持續改善方法論，教你如何系統性優化 Claude Code 的行為設定",
    "lines": 763,
    "file": "2026-02-01_claude-md-pdca-optimization.html"
  },
  {
    "date": "2026-01-31",
    "title": "The Adolescence of Technology - Dario Amodei 深度解析",
    "source": "darioamodei.com / Dario Amodei",
    "tags": [
      "LLM",
      "Agent",
      "Analysis",
      "Research"
    ],
    "rating": 4.8,
    "summary": "Anthropic CEO Amodei 的 AI 風險與應對策略全面解析，拆解五大風險類別與防禦方案",
    "lines": 724,
    "file": "2026-01-31_amodei-technology-adolescence.html"
  },
  {
    "date": "2026-01-30",
    "title": "The Batch 解析：主權AI、購物協議、圖像文字生成、AI 評測與對齊風險",
    "source": "The Batch / DeepLearning.AI / Andrew Ng",
    "tags": [
      "LLM",
      "Agent",
      "Tool",
      "API"
    ],
    "rating": 4,
    "summary": "本期The Batch涵蓋主權AI趨勢、Google UCP購物協議、GLM-Image文字渲染、AI評測更新與對齊風險",
    "lines": 622,
    "file": "2026-01-30_batch-sovereign-ai.html"
  },
  {
    "date": "2026-01-30",
    "title": "Claude 提示工程黃金標準：10 步驟框架",
    "source": "@hooeem on X / Anthropic",
    "tags": [
      "Prompt",
      "LLM",
      "Tool"
    ],
    "rating": 4,
    "summary": "Anthropic官方提示工程指南轉化為10步驟即插即用Prompt Template框架",
    "lines": 566,
    "file": "2026-01-30_claude-prompt-engineering.html"
  },
  {
    "date": "2026-01-29",
    "title": "AI上司崛起：日本企業導入「AI本部長」實戰案例解析",
    "source": "經理人 / 陳書榕",
    "tags": [
      "Agent",
      "Automation",
      "Tool"
    ],
    "rating": 3.2,
    "summary": "日本企業導入AI本部長實戰案例：KDDI、三井住友、大東建託的AI管理者設計邏輯與組織影響",
    "lines": 572,
    "file": "2026-01-29_ai-boss-japan-enterprise.html"
  },
  {
    "date": "2026-01-28",
    "title": "快錢腦會讓你失去一切：加密貨幣週期生存心法",
    "source": "Pickle Cat (@0xPickleCat) / X",
    "tags": [
      "Analysis",
      "Content"
    ],
    "rating": 4.2,
    "summary": "13年加密貨幣老兵分享週期生存智慧，區分假復甦與真正Regime Shift",
    "lines": 737,
    "file": "2026-01-28_crypto-survival-mindset.html"
  },
  {
    "date": "2026-01-23",
    "title": "Claude Code 非技術領導者完全指南",
    "source": "Joel Salinas &amp; Alejandro Aboy",
    "tags": [
      "Tool",
      "Automation",
      "Agent"
    ],
    "rating": 4,
    "summary": "打破 Claude Code 只給工程師用的迷思，展示非技術主管如何用 AI 解決商業問題",
    "lines": 549,
    "file": "2026-01-23_claude-code-nontechnical-guide.html"
  },
  {
    "date": "2026-01-22",
    "title": "50 Underrated Claude Tips - 被低估的 Claude 實戰技巧",
    "source": "@aiedge_ on X",
    "tags": [
      "Tool",
      "Prompt"
    ],
    "rating": 4.2,
    "summary": "CLAUDE.md、Plan Mode、MCP 等 50 個被低估的 Claude 實戰技巧。",
    "lines": 630,
    "file": "2026-01-22_50-claude-tips.html"
  },
  {
    "date": "2026-01-22",
    "title": "AI Habit Tracker Vibe Coding - 用 Claude 打造改變生活的習慣追蹤器",
    "source": "Miles Deutscher (@milesdeutscher)",
    "tags": [
      "Automation",
      "Prompt",
      "Tool",
      "Agent"
    ],
    "rating": 3.8,
    "summary": "用Claude打造習慣追蹤器的Vibe Coding教學，展示非工程師如何用AI建構實用工具",
    "lines": 1039,
    "file": "2026-01-22_ai-habit-tracker-vibe-coding.html"
  },
  {
    "date": "2026-01-22",
    "title": "The Future of Work When Work Is Meaningless - Dan Koe 深度解讀",
    "source": "Dan Koe (@thedankoe)",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 4.2,
    "summary": "AI自動化時代人類創作者的最後防線是觀點，從意義危機到內在生成",
    "lines": 916,
    "file": "2026-01-22_future-of-work.html"
  },
  {
    "date": "2026-01-22",
    "title": "LinkedIn Carousel 自動化生成系統：從失敗到成功的三次迭代",
    "source": "Wyndo / Substack Newsletter",
    "tags": [
      "Automation",
      "Tool",
      "Prompt"
    ],
    "rating": 3.8,
    "summary": "用Claude Skill系統在5分鐘內生成LinkedIn Carousel，記錄三次迭代失敗經驗，展示摩擦點驅動的自動化思維",
    "lines": 960,
    "file": "2026-01-22_linkedin-carousel-skills.html"
  },
  {
    "date": "2026-01-22",
    "title": "X 平台成長策略：從 35 到 82,000 粉絲的實戰心法",
    "source": "@canghe / X (Twitter)",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 3.8,
    "summary": "從35粉絲成長到82000的完整策略，核心心法先互動後原創，借力打力的階段性社群成長方法論",
    "lines": 442,
    "file": "2026-01-22_x-platform-growth.html"
  },
  {
    "date": "2026-01-21",
    "title": "2026 Agentic Coding Trends Report - Anthropic",
    "source": "Anthropic",
    "tags": [
      "Anthropic-Docs",
      "Agent",
      "LLM",
      "Automation",
      "Tool",
      "API"
    ],
    "rating": 4.2,
    "summary": "Anthropic發布的Agentic Coding趨勢報告，識別八大趨勢，開發者60%工作已使用AI但完全委派僅0-20%",
    "lines": 632,
    "file": "2026-01-21_agentic-coding-trends.html"
  },
  {
    "date": "2026-01-21",
    "title": "Claude + n8n + Synta MCP：取代整個開發團隊的自動化技術棧",
    "source": "@NoahEpstein_ (Nozz) / X Thread",
    "tags": [
      "Automation",
      "Agent",
      "Tool"
    ],
    "rating": 4.2,
    "summary": "用 Claude Code + n8n + Synta MCP 三工具組合將 7 人團隊縮減到 5 人、產能提升 3 倍",
    "lines": 679,
    "file": "2026-01-21_claude-n8n-synta-stack.html"
  },
  {
    "date": "2026-01-20",
    "title": "A2UI：Google 的 Agent 驅動使用者介面框架解析",
    "source": "Department of Product Knowledge Series #97",
    "tags": [
      "Agent",
      "Tool"
    ],
    "rating": 3.8,
    "summary": "Google A2UI Agent 驅動使用者介面框架解析。",
    "lines": 1036,
    "file": "2026-01-20_a2ui-framework.html"
  },
  {
    "date": "2026-01-20",
    "title": "Biotech Compass 實戰教學 - AI 輔助生技投資分析工具",
    "source": "The Pharma Fox Substack",
    "tags": [
      "Tool",
      "Automation",
      "LLM",
      "API"
    ],
    "rating": 4,
    "summary": "示範用 AI 從 SEC 文件擷取數據並產出標準化生技投資分析圖表的完整流程",
    "lines": 762,
    "file": "2026-01-20_biotech-compass-walkthrough.html"
  },
  {
    "date": "2026-01-20",
    "title": "One Hour of Focus a Day Can Change Your Life",
    "source": "Dan Koe (@thedankoe)",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 4.2,
    "summary": "每天一小時深度工作協議，結合認知科學與實務框架的行動指南",
    "lines": 650,
    "file": "2026-01-20_one-hour-focus.html"
  },
  {
    "date": "2026-01-19",
    "title": "AI Context Setup - 一次設定，永久提升 90% AI 回應品質",
    "source": "Joel Salinas / Leadership in Change",
    "tags": [
      "LLM",
      "Prompt",
      "Tool",
      "Automation"
    ],
    "rating": 4.2,
    "summary": "一次設定永久提升90% AI回應品質的Context Setup指南，適合AI進階使用者",
    "lines": 719,
    "file": "2026-01-19_ai-context-setup.html"
  },
  {
    "date": "2026-01-17",
    "title": "Apple 選擇 Google Gemini 的戰略意義",
    "source": "Leadership in Change / Joel Salinas &amp; Ilia Karelin",
    "tags": [
      "LLM",
      "Agent",
      "Analysis",
      "Tool"
    ],
    "rating": 3.8,
    "summary": "分析 Apple 與 Google 合作用 Gemini 驅動 Siri 的戰略意義及企業 AI 工具選擇啟示",
    "lines": 571,
    "file": "2026-01-17_apple-gemini-strategy.html"
  },
  {
    "date": "2026-01-17",
    "title": "Claude Cowork 產品策略分析：現代產品管理的實戰教材",
    "source": "Department of Product Newsletter",
    "tags": [
      "Agent",
      "Tool",
      "Analysis"
    ],
    "rating": 4,
    "summary": "從產品管理角度分析 Claude Cowork 的策略決策，提供現代產品管理的實戰教材",
    "lines": 723,
    "file": "2026-01-17_claude-cowork-product-lessons.html"
  },
  {
    "date": "2026-01-15",
    "title": "AI 工具排毒指南 - 2026 開年必讀",
    "source": "Mia Kiraki & Joel Salinas / Leadership in Change",
    "tags": [
      "Tool",
      "Automation",
      "Agent"
    ],
    "rating": 3.8,
    "summary": "AI工具排毒指南：四步驟決策樹評估新工具，從工具收集者轉變為系統建構者",
    "lines": 664,
    "file": "2026-01-15_ai-tool-detox.html"
  },
  {
    "date": "2026-01-15",
    "title": "2026 六大 AI 趨勢 - 學習文件",
    "source": "AI Maker Labs Newsletter",
    "tags": [
      "LLM",
      "Agent",
      "Automation",
      "Tool"
    ],
    "rating": 3.8,
    "summary": "2026六大AI趨勢：模型商品化、工作流程勝過Agent、Context勝過Prompting等預測分析",
    "lines": 603,
    "file": "2026-01-15_ai-trends-2026.html"
  },
  {
    "date": "2026-01-15",
    "title": "如何清晰表達你的想法 - Dan Koe 三層表達框架",
    "source": "Dan Koe (@thedankoe)",
    "tags": [
      "Prompt",
      "Content",
      "LLM"
    ],
    "rating": 4,
    "summary": "Dan Koe 的三層表達框架，教你如何將模糊想法轉化為 AI 可執行的清晰指令",
    "lines": 806,
    "file": "2026-01-15_articulation-intelligence.html"
  },
  {
    "date": "2026-01-15",
    "title": "Email Triage AI Agent 自動化教學",
    "source": "Wyndo / AI Maker",
    "tags": [
      "Agent",
      "Automation",
      "Tool"
    ],
    "rating": 4.2,
    "summary": "主動式Email Triage Agent實作教學，Make.com結合Gmail與OpenAI",
    "lines": 603,
    "file": "2026-01-15_email-triage-agent.html"
  },
  {
    "date": "2026-01-15",
    "title": "交易心理學：比較陷阱 | Trading Psychology: The Comparison Trap",
    "source": "交易心理學專欄",
    "tags": [
      "Analysis"
    ],
    "rating": 4,
    "summary": "深入分析交易者常見的比較陷阱心理，提供框架化思維工具避免情緒決策對交易績效的負面影響",
    "lines": 1311,
    "file": "2026-01-15_trading-comparison-trap.html"
  },
  {
    "date": "2026-01-14",
    "title": "Claude Cowork 全面解析：AI 工具民主化的里程碑",
    "source": "Joel Salinas",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "全面解析 Claude Cowork 如何實現 AI 工具民主化，讓非技術用戶也能運用 AI 代理功能",
    "lines": 1189,
    "file": "2026-01-14_claude-cowork-guide.html"
  },
  {
    "date": "2026-01-13",
    "title": "ACT + BASE Agent Framework - 高壓溝通的行為穩定性設計",
    "source": "Wyndo & Judy Ossello",
    "tags": [
      "Agent",
      "Framework"
    ],
    "rating": 4.2,
    "summary": "ACT + BASE 框架：高壓溝通的行為穩定性設計。",
    "lines": 1180,
    "file": "2026-01-13_act-base-framework.html"
  },
  {
    "date": "2026-01-13",
    "title": "如何在一天內重塑你的人生",
    "source": "Dan Koe (@thedankoe)",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 4.2,
    "summary": "Dan Koe提出改變身份而非行為的一日協議，結合心理學與自我發展框架",
    "lines": 713,
    "file": "2026-01-13_dan-koe-fix-your-life.html"
  },
  {
    "date": "2026-01-12",
    "title": "多元興趣者的事業藍圖 - Dan Koe 深度解析",
    "source": "Dan Koe (@thedankoe)",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 3.8,
    "summary": "多元興趣作為AI時代競爭優勢，從Idea Museum到系統化產品的變現路徑",
    "lines": 529,
    "file": "2026-01-12_dan-koe-multiple-interests.html"
  },
  {
    "date": "2026-01-12",
    "title": "Forget About The Money 忘掉金錢",
    "source": "Vas (@vasuman)",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 3.4,
    "summary": "金錢是工作的副產品，非對稱風險策略與長期複利思維的職涯框架",
    "lines": 627,
    "file": "2026-01-12_forget-about-money.html"
  },
  {
    "date": "2026-01-10",
    "title": "Typeless Voice-to-Text 工具評測：遠端工作者的語音輸入革命",
    "source": "凱文馬拉穆 / vocus.cc",
    "tags": [
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "Typeless語音轉文字工具評測，AI語意最佳化、去贅詞、結構化輸出，解決語音輸入後端的編輯地獄",
    "lines": 504,
    "file": "2026-01-10_typeless-voice-review.html"
  },
  {
    "date": "2026-01-09",
    "title": "Claude Code 2.1.0 版本更新深度解析",
    "source": "Claude Code Docs / Anthropic",
    "tags": [
      "Anthropic-Docs",
      "Tool",
      "Agent",
      "LLM"
    ],
    "rating": 3.5,
    "summary": "Claude Code 2.1.0 版 110+ 項改進解析，涵蓋 Skills 熱重載、安全性修復、效能優化",
    "lines": 1068,
    "file": "2026-01-09_claude-code-210-update.html"
  },
  {
    "date": "2026-01-09",
    "title": "Gmail 進入 Gemini 時代：開發者對 AI Agents 的真實評價",
    "source": "Rich Holmes / Dept of Product",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.6,
    "summary": "AI產品競爭進入嵌入式階段，Gmail AI Inbox與Agent商業協議分析",
    "lines": 541,
    "file": "2026-01-09_gmail-gemini-ai-agents.html"
  },
  {
    "date": "2026-01-08",
    "title": "Context Engineering for AI Agents - 深度學習指南",
    "source": "Anthropic Engineering Blog",
    "tags": [
      "Anthropic-Eng",
      "Agent",
      "LLM",
      "Prompt",
      "Tool"
    ],
    "rating": 4.6,
    "summary": "Context Engineering從Prompt到Context的範式轉移，解決Agent上下文腐敗問題",
    "lines": 621,
    "file": "2026-01-08_context-engineering-agents.html"
  },
  {
    "date": "2026-01-08",
    "title": "The Enduring Necessity of HUMINT - 為何機器無法取代人類情報",
    "source": "Is It Propaganda & Joel Salinas",
    "tags": [
      "Agent",
      "Automation",
      "Security"
    ],
    "rating": 3.8,
    "summary": "HUMINT在AI時代的不可取代性，Human Authority Audit三問框架",
    "lines": 489,
    "file": "2026-01-08_humint-intelligence-ai.html"
  },
  {
    "date": "2026-01-08",
    "title": "Moonshots #220: Elon Musk 談 AGI、豐盛時代與人類未來",
    "source": "Moonshots Podcast / Peter Diamandis",
    "tags": [
      "LLM",
      "Agent",
      "Automation"
    ],
    "rating": 4,
    "summary": "Elon Musk預測AGI將於2026-2027實現，描繪AI、人形機器人和乾淨能源帶來的豐盛時代藍圖",
    "lines": 626,
    "file": "2026-01-08_musk-agi-abundance.html"
  },
  {
    "date": "2026-01-07",
    "title": "CES 2026 Jensen Huang Keynote - AI 產業全面解析",
    "source": "NVIDIA CES 2026 / Jensen Huang",
    "tags": [
      "LLM",
      "Agent",
      "Automation",
      "Tool",
      "Research"
    ],
    "rating": 4.4,
    "summary": "NVIDIA CES 2026 主題演講解析：Vera Rubin 晶片、Cosmos 世界基礎模型、Physical AI 產業藍圖",
    "lines": 966,
    "file": "2026-01-07_ces-jensen-huang-keynote.html"
  },
  {
    "date": "2026-01-06",
    "title": "Claude Projects 產品健康監測系統教學",
    "source": "Department of Product / Rich Holmes",
    "tags": [
      "Tool",
      "Automation",
      "Agent",
      "Prompt"
    ],
    "rating": 4,
    "summary": "用 Claude Projects 搭配 Skills 打造可重複使用的產品健康監測系統，涵蓋五大維度追蹤",
    "lines": 600,
    "file": "2026-01-06_claude-projects-product-health.html"
  },
  {
    "date": "2025-12-31",
    "title": "Deep: The UX of Search Explored - AI 學習指南",
    "source": "Department of Product / Rich Holmes",
    "tags": [
      "Tool",
      "Agent",
      "LLM"
    ],
    "rating": 4,
    "summary": "產品內搜尋從找東西演變成AI命令中心，20+實際案例分析混合搜尋、輪播探索與自然語言搜尋設計",
    "lines": 571,
    "file": "2025-12-31_ux-search-explored.html"
  },
  {
    "date": "2025-12-22",
    "title": "Import AI 438 學習指南 | AI 能力超額與隱形革命",
    "source": "Jack Clark / Import AI",
    "tags": [
      "LLM",
      "Agent",
      "Automation",
      "Tool"
    ],
    "rating": 4.2,
    "summary": "Capability Overhang概念，AI實際能力遠超可引出程度，Scaffold框架提升表現",
    "lines": 533,
    "file": "2025-12-22_import-ai-438-guide.html"
  },
  {
    "date": "2025-12-20",
    "title": "Claude Skills 深度解析：為什麼你的第一個 Skill 會失敗（以及如何修復）",
    "source": "Wyndo / AI Maker Labs",
    "tags": [
      "Tool",
      "Prompt",
      "Automation"
    ],
    "rating": 3.5,
    "summary": "Claude Skills建構實戰教學，診斷常見失敗原因與修復方法",
    "lines": 514,
    "file": "2025-12-20_claude-skills-deep-dive.html"
  },
  {
    "date": "2025-12-20",
    "title": "Skill Graphs：從單一技能檔到可遍歷知識網路",
    "source": "Heinrich @arscontexta / X Thread",
    "tags": [
      "Agent",
      "Prompt",
      "Tool"
    ],
    "rating": 3.8,
    "summary": "提出Skill Graph概念，用Markdown+Wikilinks+YAML frontmatter建構AI Agent可自主導航的結構化知識網路",
    "lines": 598,
    "file": "2025-12-20_skill-graphs-knowledge.html"
  },
  {
    "date": "2025-12-18",
    "title": "5 AI Books All Leaders Should Actually Read - 學習指南",
    "source": "AI Maker Labs / Paul Morrison",
    "tags": [
      "LLM",
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.8,
    "summary": "五本AI領導力書籍精選指南，為非技術背景企業領導者設計，涵蓋AI策略入門到組織設計",
    "lines": 817,
    "file": "2025-12-18_ai-books-leaders-guide.html"
  },
  {
    "date": "2025-12-16",
    "title": "Data Literacy Loop 學習指南",
    "source": "Wyndo & Hodman Murad / AI Maker",
    "tags": [
      "Prompt",
      "LLM",
      "Analysis"
    ],
    "rating": 3.5,
    "summary": "打造具數據素養的AI夥伴，超越提示詞的商業分析協作方法",
    "lines": 1457,
    "file": "2025-12-16_data-literacy-loop.html"
  },
  {
    "date": "2025-12-15",
    "title": "Claude Code 個人 AI Agent 作業系統完整指南",
    "source": "Wyndo / AI Maker Substack",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.5,
    "summary": "Claude Code作為個人AI Agent作業系統的完整操作指南",
    "lines": 1427,
    "file": "2025-12-15_claude-code-agent-os.html"
  },
  {
    "date": "2025-12-15",
    "title": "Skill Architecture: The 5 Layers Beyond the SKILL.md",
    "source": "The Boring Marketer @boringmarketer / X (Twitter)",
    "tags": [
      "Agent",
      "Prompt",
      "Automation"
    ],
    "rating": 4.1,
    "summary": "AI Skill架構五層設計：持久記憶、評分式context載入、schema契約、學習回饋迴圈、共用協定層",
    "lines": 578,
    "file": "2025-12-15_skill-architecture-layers.html"
  },
  {
    "date": "2025-12-10",
    "title": "The Batch Issue 331 學習指南 | AI 教學文件",
    "source": "The Batch / DeepLearning.AI",
    "tags": [
      "LLM",
      "Agent",
      "Tool"
    ],
    "rating": 4.2,
    "summary": "The Batch第331期深度學習指南，涵蓋AI產業最新動態、技術突破與實務應用案例分析",
    "lines": 1241,
    "file": "2025-12-10_batch-331-study-guide.html"
  },
  {
    "date": "2025-12-10",
    "title": "Claude Project Memory 完整指南",
    "source": "Wyndo / AI Maker Substack",
    "tags": [
      "Tool",
      "Prompt",
      "LLM"
    ],
    "rating": 3.5,
    "summary": "Claude Projects記憶系統完整指南，提升AI輸出一致性與品質",
    "lines": 857,
    "file": "2025-12-10_claude-project-memory.html"
  },
  {
    "date": "2025-12-09",
    "title": "AI 技能庫 vs AI 代理：Anthropic 的策略洞見",
    "source": "TechNews 科技新報",
    "tags": [
      "Agent",
      "Framework",
      "LLM",
      "Research"
    ],
    "rating": 3.5,
    "summary": "Anthropic 主張企業應建立單一通用代理搭配技能庫，而非部署多個獨立 AI 代理",
    "lines": 797,
    "file": "2025-12-09_anthropic-skills-agents.html"
  },
  {
    "date": "2025-12-04",
    "title": "AI 新聞代理系統學習指南 | AI News Agent Study Guide",
    "source": "Wyndo / AI Maker",
    "tags": [
      "Agent",
      "Tool",
      "Automation"
    ],
    "rating": 3.5,
    "summary": "AI新聞代理系統學習指南：用Perplexity建構自動化新聞蒐集與整理系統",
    "lines": 1038,
    "file": "2025-12-04_ai-news-agent-perplexity.html"
  },
  {
    "date": "2025-12-02",
    "title": "The 3-Prompt Pipeline 三提示詞管道系統",
    "source": "Wyndo & Benjamin Hies / The AI Maker",
    "tags": [
      "Prompt",
      "Automation",
      "Content"
    ],
    "rating": 3.6,
    "summary": "三提示詞管道系統，從 Substack 文章到 LinkedIn 自動轉換。",
    "lines": 996,
    "file": "2025-12-02_prompt-pipeline.html"
  },
  {
    "date": "2025-11-30",
    "title": "AI Second Brain：用語音備忘錄自動產出 Substack Notes 和商業點子",
    "source": "Wyndo / AI Maker Newsletter",
    "tags": [
      "Automation",
      "Agent",
      "Tool",
      "Prompt"
    ],
    "rating": 4.2,
    "summary": "用語音備忘錄自動產出Substack Notes和商業點子的AI Second Brain系統",
    "lines": 1479,
    "file": "2025-11-30_ai-second-brain-voice.html"
  },
  {
    "date": "2025-11-20",
    "title": "AI 生產力悖論 | 學習指南",
    "source": "AI Maker Substack",
    "tags": [
      "Analysis",
      "Tool",
      "LLM"
    ],
    "rating": 3.5,
    "summary": "AI生產力悖論：30秒決策框架判斷何時不該使用AI，避免工具過度使用的隱藏成本",
    "lines": 605,
    "file": "2025-11-20_ai-productivity-paradox.html"
  },
  {
    "date": "2025-11-15",
    "title": "AI 內容再利用自動化系統教學 | AI Content Repurposing Automation Guide",
    "source": "AI Maker Substack",
    "tags": [
      "Content",
      "Automation",
      "Tool"
    ],
    "rating": 3.5,
    "summary": "AI內容再利用自動化系統：從一篇電子報產出18篇平台優化內容的完整教學",
    "lines": 674,
    "file": "2025-11-15_ai-content-repurposing.html"
  },
  {
    "date": "2025-11-15",
    "title": "Newsletter Audit Playbook 深度學習筆記",
    "source": "The Digital Creator / Sharyph",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 3.5,
    "summary": "電子報稽核完整指南，從100到4500訂閱者的成長策略，涵蓋內容審計、受眾分析與變現模式",
    "lines": 1371,
    "file": "2025-11-15_newsletter-audit-playbook.html"
  },
  {
    "date": "2025-11-10",
    "title": "AI 領導力三角：區分成功與掙扎領導者的三項技能",
    "source": "Joel Salinas / AI Leadership Substack",
    "tags": [
      "Analysis",
      "Framework",
      "LLM"
    ],
    "rating": 3.8,
    "summary": "AI領導力三角：區分成功與掙扎領導者的三項技能，包含領導力策略與框架分析",
    "lines": 1304,
    "file": "2025-11-10_ai-leadership-triad.html"
  },
  {
    "date": "2025-11-10",
    "title": "Substack Notes 訂閱成長策略 - 每日 10-30 新訂閱者的系統方法",
    "source": "Creator's Playbook / Mark Wils",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 3.8,
    "summary": "Substack Notes三層演算法分發機制，透過每日3-5則互動策略持續觸及新受眾，一年累積2000訂閱者",
    "lines": 539,
    "file": "2025-11-10_substack-notes-growth.html"
  },
  {
    "date": "2025-11-04",
    "title": "四個 AI Prompts 將你從資訊收集者轉變為洞見創造者 | 教學文件",
    "source": "Wyndo & Eva Keiffenheim MSc",
    "tags": [
      "Prompt",
      "LLM",
      "Tool"
    ],
    "rating": 3.5,
    "summary": "四個AI Prompts將你從資訊收集者轉變為洞見創造者，解決第二大腦資訊囤積問題",
    "lines": 804,
    "file": "2025-11-04_ai-prompts-insight-creator.html"
  },
  {
    "date": "2025-08-26",
    "title": "Human 3.0 - 通往頂尖 1% 的人生地圖",
    "source": "Dan Koe / future-proof Substack",
    "tags": [
      "Content",
      "Analysis"
    ],
    "rating": 3.8,
    "summary": "整合AQAL框架與螺旋動力學的人類發展模型，四象限全方位發展導航",
    "lines": 621,
    "file": "2025-08-26_human30-life-map.html"
  },
  {
    "date": "2025-02-13",
    "title": "AI 時代的 Markdown 終極指南",
    "source": "AI Learning Guide",
    "tags": [
      "Tool",
      "Prompt",
      "LLM",
      "Framework"
    ],
    "rating": 3.8,
    "summary": "Markdown 在 AI 時代的戰略定位。90/10 核心語法、AI 友善文件格式、結構決定理解精度。",
    "lines": 1068,
    "file": "2025-02-13_markdown_ai_guide.html"
  }
];
