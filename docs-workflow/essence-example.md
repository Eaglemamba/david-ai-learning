# CLAUDE.md 持續改善方法論

> **來源:** 社群文章 | **日期:** 2026-02-01 | **評分:** ★★★★☆ 4.2/5
> **標籤:** `Agent` `Tool` `Automation` `Prompt`
> **全文:** [HTML](../docs/2026-02-01_claude-md-pdca-optimization.html)

## 一句話總結

CLAUDE.md 不是寫一次的靜態文件，而是需要 PDCA 循環、用數據驅動持續優化的「活系統」。

## 核心觀念（3 個）

### 1. 階層式 CLAUDE.md = 空間隔離
- **白話解釋：** 把規則按目錄分層，Claude 只載入當前工作需要的那層，避免無關規則塞滿 Context Window
- **類比：** 心臟手術時不會把骨科、眼科、牙科的 SOP 全攤在手術台上
- **金句：** "寫越多，Claude 反而越笨"

### 2. /Lesson = 即時病歷
- **白話解釋：** 任務結束後讓 Claude 回顧對話、分析走錯的路、把教訓寫進對應層級的 CLAUDE.md
- **類比：** 看完診後趁記憶新鮮寫病歷，下次遇到類似症狀翻病歷就好
- **金句：** "通用教訓寫根目錄，專屬踩坑寫子目錄"

### 3. /project-insights = 數據驅動的定期健檢
- **白話解釋：** Python 腳本從幾百 MB 對話紀錄濃縮成 JSON，分析摩擦點排名，產出 CLAUDE.md 改進建議
- **金句：** "「憑感覺」變成「靠數據」"

## 行動結論

- **核心洞察：** 我的 Master Prompt 迭代靠主觀感受，缺少量化的摩擦點分析
- **立即應用：** 把 Master Prompt 拆成「核心方法（永遠載入）」和「特定模板（按需引用）」兩層
- **注意事項：** 整套系統依賴 Claude Code 本機存儲，GMP 環境中 AI 建議的規則變更需經過 Change Control

---
*精華版 — 完整雙欄對照請看 [HTML 全文](../docs/2026-02-01_claude-md-pdca-optimization.html)*
