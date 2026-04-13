#!/usr/bin/env node
/**
 * auto-classify.js — Auto-classify new docs into curriculum-data.js
 *
 * Finds docs in docs/ that are NOT yet in curriculum-data.js,
 * scores them using keyword matching, and inserts them automatically.
 *
 * Usage:
 *   node auto-classify.js              # classify and update
 *   node auto-classify.js --dry-run    # preview only
 *
 * Designed to run in GitHub Actions CI after new docs are pushed.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DOCS_DIR = path.join(ROOT, 'docs');
const PROCESSED_DIR = path.join(DOCS_DIR, 'processed');
const CURRICULUM_DATA = path.join(ROOT, 'curriculum-data.js');

// ─── Stage definitions (same as add-doc.js) ───
const STAGES = [
  {
    id: 1, title: 'AI 基礎認知',
    keywords: ['基礎', 'fundamentals', 'introduction', 'beginner', 'privacy', 'risk', 'trends',
               'books', 'leaders', 'adolescence', 'paradox', 'guide', 'agentic era', 'productivity paradox'],
    tags: ['Analysis', 'Research'], tagWeight: 0.3
  },
  {
    id: 2, title: 'Prompt 與溝通技巧',
    keywords: ['prompt', 'context', 'articulation', 'expression', 'anti-prompt', 'question',
               'insight', 'data literacy', 'context engineering', 'context setup',
               'prompt engineering', 'prompt pipeline', '提問', '表達', '溝通'],
    tags: ['Prompt'], tagWeight: 0.7
  },
  {
    id: 3, title: 'AI 工具實戰',
    keywords: ['claude code', 'claude cowork', 'starter', 'tips', 'interactive mode',
               'voice', 'typeless', 'notebooklm', 'tool', 'tutorial', 'guide',
               '入門', '技巧', '攻略', '指南', '評測', '操作', 'cursor', 'release', 'update',
               'certification', 'architect'],
    tags: ['Tool'], tagWeight: 0.5
  },
  {
    id: 4, title: 'Agent 架構與自動化',
    keywords: ['agent', 'automation', 'framework', 'skill', 'n8n', 'pipeline', 'workflow',
               'agentic', 'act', 'base', 'triage', 'vibe coding', 'habit tracker',
               'second brain', 'pdca', 'claude.md', 'skill graph', 'skill architecture',
               'context compaction', 'handoff', 'successor', 'governance'],
    tags: ['Agent', 'Automation', 'Framework'], tagWeight: 0.6
  },
  {
    id: 5, title: '組織導入與領導力',
    keywords: ['leadership', 'change management', 'organization', 'enterprise', 'security',
               'hardening', 'strategy', 'product', 'pm', 'amplification', 'humint',
               'future of work', 'detox', '領導', '組織', '變革', '安全', '策略'],
    tags: ['Security'], tagWeight: 0.5
  }
];

// ─── Topic cluster definitions (same as add-doc.js) ───
const TOPIC_CLUSTERS = [
  { id: 'claude-code', heading: 'Claude Code', parent: 'Claude 工具生態',
    keywords: ['claude code', 'interactive mode', 'agent os', 'product mentors', 'claude-code', 'code power',
               'release', 'architecture governance', 'v2.1'], tags: [] },
  { id: 'claude-cowork', heading: 'Claude Cowork', parent: 'Claude 工具生態',
    keywords: ['cowork', 'claude cowork', 'desktop agent'], tags: [] },
  { id: 'claude-skills', heading: 'Claude Skills & Projects', parent: 'Claude 工具生態',
    keywords: ['skill', 'skills', 'project memory', 'projects', 'project health'], tags: [] },
  { id: 'claude-tips', heading: 'Claude 使用技巧', parent: 'Claude 工具生態',
    keywords: ['claude tips', 'starter pack', 'context setup', '50 claude', '50-claude',
               'certification', 'architect certification'], tags: [] },
  { id: 'prompt-frameworks', heading: '框架與方法論', parent: 'Prompt 工程',
    keywords: ['prompt engineering', 'anti-prompt', 'question system', 'prompt caching',
               'prompt pipeline', 'insight creator', 'prompts', 'successor prompt', 'handoff'], tags: ['Prompt'] },
  { id: 'context-engineering', heading: 'Context Engineering', parent: 'Prompt 工程',
    keywords: ['context engineering', 'notebooklm', 'source control', 'context compaction', 'compaction'], tags: [] },
  { id: 'agent-frameworks', heading: '框架設計', parent: 'Agent 架構',
    keywords: ['act', 'base', 'a2ui', 'agent framework', 'skills vs agents'], tags: ['Framework'] },
  { id: 'agent-apps', heading: 'Agent 應用', parent: 'Agent 架構',
    keywords: ['email triage', 'gmail', 'news agent', 'ai boss', 'openclaw agent', 'openclaw review'], tags: [] },
  { id: 'agent-commerce', heading: 'Agent 商務', parent: 'Agent 架構',
    keywords: ['a2a', 'commerce', 'agent ecology', 'agent ecologies'], tags: [] },
  { id: 'automation', heading: '自動化 & 整合', parent: '自動化 & 整合',
    keywords: ['n8n', 'synta', 'habit tracker', 'content repurposing', 'second brain',
               'linkedin carousel', 'vibe coding', 'diagram'], tags: ['Automation'] },
  { id: 'llm-claude', heading: 'Claude 模型', parent: 'LLM 模型 & 技術',
    keywords: ['sonnet', 'opus', 'haiku', 'dynamic filtering', 'computer use'], tags: [] },
  { id: 'other-tools', heading: '其他工具', parent: 'LLM 模型 & 技術',
    keywords: ['typeless', 'biotech compass', 'ux search', 'tool detox', 'data literacy', 'cursor'], tags: [] },
  { id: 'industry-trends', heading: '大勢判讀', parent: 'AI 產業趨勢',
    keywords: ['amodei', 'jensen', 'ces', 'agentic coding', 'trends', 'musk', 'agi',
               'disruption', 'shumer', 'agentic era'], tags: [] },
  { id: 'industry-analysis', heading: '產業分析', parent: 'AI 產業趨勢',
    keywords: ['apple', 'gemini strategy', 'amplification', 'sovereign', 'import ai', 'batch'], tags: [] },
  { id: 'security', heading: '安全 & 隱私', parent: '安全 & 隱私',
    keywords: ['security', 'hardening', 'privacy', 'humint', 'ethics', 'pentagon'], tags: ['Security'] },
  { id: 'leadership', heading: '職場 & 領導力', parent: '職場 & 領導力',
    keywords: ['pm', 'change management', 'leadership', 'productivity paradox',
               'future of work', 'books leaders', 'layoffs', 'labor market'], tags: [] },
  { id: 'content-brand', heading: '內容創作 & 個人品牌', parent: '內容創作 & 個人品牌',
    keywords: ['substack', 'newsletter', 'x platform', 'articulation', 'carousel', 'geo'], tags: ['Content'] },
  { id: 'personal-growth', heading: '個人成長 & 心態', parent: '個人成長 & 心態',
    keywords: ['human 3.0', 'dan koe', 'fix your life', 'multiple interests', 'focus',
               'forget money', 'comparison trap', 'crypto survival', 'talent', 'morris'], tags: [] },
  { id: 'research', heading: '研究方法', parent: '研究方法',
    keywords: ['research', '研究', 'beginner sins'], tags: ['Research'] }
];

// ─── Helpers ───

function getMeta(html, name) {
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

function getBodyText(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  return body.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
}

function scoreMatch(entry, title, tags, summary, bodyText) {
  let score = 0;
  const titleLower = title.toLowerCase();
  const summaryLower = summary.toLowerCase();
  for (const kw of entry.keywords) {
    if (titleLower.includes(kw)) score += 10;
    if (summaryLower.includes(kw)) score += 5;
    if (bodyText.includes(kw)) score += 2;
  }
  if (entry.tags) {
    for (const t of entry.tags) {
      if (tags.includes(t)) score += 3 * (entry.tagWeight || 1);
    }
  }
  return score;
}

function bestStage(title, tags, summary, bodyText) {
  let best = { id: 1, score: 0 };
  for (const stage of STAGES) {
    const score = scoreMatch(stage, title, tags, summary, bodyText);
    if (score > best.score) best = { id: stage.id, score };
  }
  return best;
}

function bestTopic(title, tags, summary, bodyText) {
  let best = { id: TOPIC_CLUSTERS[0].id, score: 0 };
  for (const tc of TOPIC_CLUSTERS) {
    const score = scoreMatch(tc, title, tags, summary, bodyText);
    if (score > best.score) best = { id: tc.id, score };
  }
  return best;
}

// ─── Find docs not in curriculum-data.js ───

function findNewDocs() {
  const currSrc = fs.readFileSync(CURRICULUM_DATA, 'utf-8');
  // Only scan docs/ root — processed/ files are already classified
  const docFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.html'));
  const newDocs = [];

  for (const file of docFiles) {
    if (!currSrc.includes(file)) {
      const html = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
      const title = getMeta(html, 'doc-title') || file;
      const tags = (getMeta(html, 'doc-tags') || '').split(',').map(t => t.trim()).filter(Boolean);
      const rating = getMeta(html, 'doc-rating') || '0';
      const summary = getMeta(html, 'doc-summary') || '';
      const bodyText = getBodyText(html);

      const stage = bestStage(title, tags, summary, bodyText);
      const topic = bestTopic(title, tags, summary, bodyText);

      newDocs.push({ file, title, tags, rating, summary, bodyText, stage, topic });
    }
  }

  return newDocs;
}

// ─── Insert into curriculum-data.js ───

function insertStageDoc(src, doc) {
  const stageId = doc.stage.id;
  // Store with processed/ prefix since file will be moved there
  const entry = `      { file: 'processed/${doc.file}', title: '${doc.title.replace(/'/g, "\\'")} ★${doc.rating}', required: false, why: '${doc.summary.slice(0, 60).replace(/'/g, "\\'")}' },`;

  // Find the stage's docs array closing bracket
  const stagePattern = new RegExp(`id:\\s*${stageId},`);
  const stageMatch = stagePattern.exec(src);
  if (!stageMatch) return src;

  const docsStart = src.indexOf('docs: [', stageMatch.index);
  if (docsStart === -1) return src;

  let bracketCount = 0;
  let docsEnd = -1;
  for (let i = docsStart + 7; i < src.length; i++) {
    if (src[i] === '[') bracketCount++;
    if (src[i] === ']') {
      if (bracketCount === 0) { docsEnd = i; break; }
      bracketCount--;
    }
  }
  if (docsEnd === -1) return src;

  return src.slice(0, docsEnd) + '\n' + entry + '\n    ' + src.slice(docsEnd);
}

function insertTopicDoc(src, doc) {
  const tc = TOPIC_CLUSTERS.find(t => t.id === doc.topic.id);
  if (!tc) return src;

  // Store with processed/ prefix since file will be moved there
  const entry = `          { title: '${doc.title.replace(/'/g, "\\'")} ★${doc.rating}', file: 'processed/${doc.file}' },`;

  // Find the subcluster by heading name
  let searchName = `name: '${tc.heading}'`;
  let idx = src.indexOf(searchName);

  // For flat clusters (name: null), find by parent
  if (idx === -1) {
    searchName = `name: '${tc.parent}'`;
    idx = src.indexOf(searchName);
  }
  if (idx === -1) return src;

  const docsStart = src.indexOf('docs: [', idx);
  if (docsStart === -1) return src;

  let bracketCount = 0;
  let docsEnd = -1;
  for (let i = docsStart + 7; i < src.length; i++) {
    if (src[i] === '[') bracketCount++;
    if (src[i] === ']') {
      if (bracketCount === 0) { docsEnd = i; break; }
      bracketCount--;
    }
  }
  if (docsEnd === -1) return src;

  return src.slice(0, docsEnd) + '\n' + entry + '\n        ' + src.slice(docsEnd);
}

// ─── Main ───

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const newDocs = findNewDocs();

  if (newDocs.length === 0) {
    console.log('No new docs to classify.');
    return;
  }

  console.log(`Found ${newDocs.length} new doc(s) to classify:\n`);

  for (const doc of newDocs) {
    const stageName = STAGES.find(s => s.id === doc.stage.id)?.title || '?';
    const tc = TOPIC_CLUSTERS.find(t => t.id === doc.topic.id);
    const topicName = tc ? `${tc.parent} > ${tc.heading}` : '?';
    console.log(`  ${doc.file}`);
    console.log(`    Stage ${doc.stage.id} (${stageName}) score=${doc.stage.score}`);
    console.log(`    Topic: ${topicName} score=${doc.topic.score}`);
    console.log();
  }

  if (dryRun) {
    console.log('DRY RUN — no files modified.');
    return;
  }

  let src = fs.readFileSync(CURRICULUM_DATA, 'utf-8');

  for (const doc of newDocs) {
    src = insertStageDoc(src, doc);
    src = insertTopicDoc(src, doc);
  }

  fs.writeFileSync(CURRICULUM_DATA, src, 'utf-8');

  // Validate by running a quick syntax check via the JS runner
  const { execSync: execSyncValidate } = require('child_process');
  const validationRunner = (() => {
    try { execSyncValidate('node --version', { stdio: 'ignore' }); return 'node'; } catch {}
    try { execSyncValidate('bun --version', { stdio: 'ignore' }); return 'bun'; } catch {}
    return null;
  })();
  if (validationRunner) {
    try {
      execSyncValidate(
        `${validationRunner} -e "const fs=require('fs');const src=fs.readFileSync('./curriculum-data.js','utf8');const fn=new Function(src+'; return {stages,topicClusters};');const r=fn();if(!Array.isArray(r.stages)||r.stages.length===0)throw new Error('stages missing');if(!Array.isArray(r.topicClusters)||r.topicClusters.length===0)throw new Error('topicClusters missing');console.log('valid: '+r.stages.length+' stages');"`,
        { cwd: ROOT, stdio: 'pipe' }
      );
      console.log(`Successfully classified ${newDocs.length} doc(s) into curriculum-data.js`);
    } catch (e) {
      console.error(`Validation failed: ${e.stderr ? e.stderr.toString() : e.message}`);
      process.exit(1);
    }
  } else {
    console.log(`Successfully classified ${newDocs.length} doc(s) into curriculum-data.js (validation skipped — no runner found)`);
  }

  // Move processed files to docs/processed/
  if (!fs.existsSync(PROCESSED_DIR)) fs.mkdirSync(PROCESSED_DIR, { recursive: true });
  for (const doc of newDocs) {
    const src = path.join(DOCS_DIR, doc.file);
    const dest = path.join(PROCESSED_DIR, doc.file);
    fs.renameSync(src, dest);
    console.log(`  → Moved ${doc.file} to processed/`);
  }

  // Rebuild dashboard-data.js and search-index.js
  // Use 'bun' if 'node' is not available (Windows without Node.js in PATH)
  const { execSync } = require('child_process');
  const runner = (() => {
    try { execSync('node --version', { stdio: 'ignore' }); return 'node'; } catch {}
    try { execSync('bun --version', { stdio: 'ignore' }); return 'bun'; } catch {}
    throw new Error('Neither node nor bun found in PATH');
  })();
  try {
    execSync(`${runner} build-dashboard-data.js`, { cwd: ROOT, stdio: 'inherit' });
    execSync(`${runner} build-search-index.js`, { cwd: ROOT, stdio: 'inherit' });
    console.log('Indexes rebuilt successfully.');
  } catch (e) {
    console.error(`Index rebuild failed: ${e.message}`);
    process.exit(1);
  }
}

main();
