# AI Articles — Analysis Rules

## Purpose
Analyze AI/tech newsletter articles with a focus on **practical tool adoption, workflow automation, and integration into daily pharma operations**.

## Analysis Framework

For each article in `inbox/`, produce an analysis covering:

### 1. TL;DR (1-2 sentences)
What is this about, stripped of hype.

### 2. Practical Assessment
- Is this usable **today** or future speculation?
- Does it solve a real problem in your current workflow?
- What's the learning curve / setup cost?
- Rate: **Use Now** / **Watch** / **Skip**

### 3. Integration Opportunities
How could this be applied to:
- SOP document processing pipeline?
- BPR review automation?
- Deviation tracker monitoring?
- Newsletter digest pipeline itself?
- Claude Code workflow optimization?

### 4. Try-It Prompt
If rated "Use Now", write a concrete first prompt or command to test it:
```
Example: claude -p "Use the new X feature to process inbox/sample.md"
```

### 5. Tags
Classify using: `Claude`, `Agent`, `MCP`, `Automation`, `Code-Gen`, `RAG`, `Vision`, `Enterprise`, `Open-Source`

## Output Format
Write analysis to `output/YYYY-MM-DD_analysis.md` with each article as an H2 section.

## Tone
Technical but accessible. Skip marketing language. Focus on "can I use this Monday morning?"
