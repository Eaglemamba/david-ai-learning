# Validation Summary Template

> 通用模板 — 適用於 VPHP Cycle Validation、Equipment Qualification 等驗證文件摘要。
> 從 Protocol + Report 對照填寫。

---

## 1. Document Identification

| Field | Value |
|-------|-------|
| Protocol # | |
| Protocol Title | |
| Protocol Effective Date | |
| Report # | |
| Report Title | |
| Report Effective Date | |
| Equipment / System | |
| Equipment ID | |
| Location | |
| Revision History | (見下表) |

### Revision History

| Rev | Date | Description | Author |
|-----|------|-------------|--------|
| | | | |

---

## 2. Purpose & Scope (from Protocol)

| Field | Value |
|-------|-------|
| Purpose (1-2 sentences) | |
| Scope | |
| Validation Type | ☐ IQ ☐ OQ ☐ PQ ☐ Cycle Validation ☐ Other: ___ |

---

## 3. Reference Documents

| Document # | Title | Relationship |
|------------|-------|-------------|
| | | (e.g., Temperature Mapping, Cycle Development, SOP) |

---

## 4. System Description (from Protocol §3)

| Field | Value |
|-------|-------|
| System / Equipment Model | |
| Manufacturer | |
| Key Components | |
| Decontamination Agent | |
| Agent Concentration | |
| Kill Criteria | |
| BI Incubation | |

---

## 5. Test Configuration

### 5.1 Process Parameters (from Protocol)

| Parameter | Setting Value | Units | Source Table |
|-----------|--------------|-------|-------------|
| | | | |

> 範例 (VPHP):
> - Evaporator Temperature Set-point: 165.0 °C
> - Environment Temp: 20.5 ~ 23.5 °C
> - Environment Humidity: 42.0% ~ 50.0%

### 5.2 Cycle Parameters (per cycle type)

| Cycle Type | Dispense Volume | Fan Speed | Dwell Time | Other |
|------------|----------------|-----------|------------|-------|
| | | | | |

### 5.3 BI Placement

| Location # | Description | Worst-case Rationale |
|------------|-------------|---------------------|
| | | |

---

## 6. Acceptance Criteria (from Protocol)

| Criterion | Requirement |
|-----------|------------|
| BI Result | e.g., All BIs show no growth after 7-day incubation |
| Positive Control | e.g., Positive control shows growth |
| Cycle Completion | e.g., Cycle completes without error/abort |
| Environment | e.g., Temp & humidity within specified range |

---

## 7. Execution Summary (from Report)

### 7.1 Test Runs

| Run # | Cycle Type | Date | Operator | Status |
|-------|-----------|------|----------|--------|
| | | | | ☐ Pass ☐ Fail |

### 7.2 BI Results

| Run # | Total BIs | Pass | Fail | Positive Control |
|-------|----------|------|------|-----------------|
| | | | | ☐ Growth confirmed |

### 7.3 Process Parameter Verification

| Parameter | Acceptance Range | Actual Value | Pass/Fail |
|-----------|-----------------|--------------|-----------|
| | | | |

---

## 8. Deviations & Observations

| Deviation # | Description | Impact Assessment | Resolution |
|-------------|-------------|-------------------|------------|
| | | | |
| (None) | | | |

---

## 9. Conclusion

| Field | Value |
|-------|-------|
| Overall Result | ☐ PASS ☐ FAIL |
| Summary Statement | |
| Approved By | |
| Approval Date | |

---

## Usage Notes

1. **Protocol → Sections 1-6**: 從 Protocol 提取，定義「要驗什麼、怎麼判定」
2. **Report → Sections 7-9**: 從 Report 提取，記錄「實際結果」
3. **填寫順序**: 先填 Section 1 (Document ID)，再照 Protocol 填 2-6，最後照 Report 填 7-9
4. **多 cycle type**: 如果一份 Protocol 涵蓋多種 cycle (e.g., DSI + FS)，Section 5.2 / 7.1 / 7.2 每種各一列
5. **Cross-reference**: Section 6 的 acceptance criteria 必須能在 Section 7 找到對應的實際結果
