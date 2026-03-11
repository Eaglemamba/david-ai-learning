# Pharma Decipher — Analysis Rules

## Purpose
Analyze pharma/biotech newsletter articles with a focus on **GMP manufacturing, regulatory compliance, and operational impact** for a pharmaceutical CDMO environment.

## Analysis Framework

For each article in `inbox/`, produce an analysis covering:

### 1. Executive Summary (2-3 sentences)
What happened and why it matters to pharma manufacturing operations.

### 2. Operational Impact Assessment
Rate impact: **High / Medium / Low** with justification.

Consider:
- Does this affect GMP compliance or SOPs?
- Are there implications for deviation management or CAPA processes?
- Does this impact supplier qualification or raw material sourcing?
- Are there regulatory filing implications (TFDA, FDA, EMA)?

### 3. Action Items
Concrete next steps, if any:
- SOP updates needed?
- Training requirements?
- Regulatory monitoring actions?
- Supply chain adjustments?

### 4. Tags
Classify using: `GMP`, `Regulatory`, `Supply-Chain`, `Clinical`, `Biosimilar`, `Cell-Therapy`, `QA/QC`, `Market`

## Output Format
Write analysis to `output/YYYY-MM-DD_analysis.md` with each article as an H2 section.

## Tone
Professional, analytical, pharma-industry vocabulary. Write as if briefing a QA director.
