#!/usr/bin/env node
/**
 * add-doc.js — Add a new doc to all three pages + rebuild search index
 *
 * Usage:
 *   node add-doc.js docs/2026-03-15_new-article.html
 *   node add-doc.js docs/2026-03-15_new-article.html --dry-run
 *
 * What it does:
 *   1. Reads meta tags from the HTML file
 *   2. Evaluates which learning-path stage and mindmap topic cluster to place it in
 *   3. Prompts you to confirm / override
 *   4. Appends entries to index.html, mindmap.html, learning-path.html
 *   5. Runs build-search-index.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─── Paths ───
const ROOT = __dirname;
const DOCS_DIR = path.join(ROOT, 'docs');
const PROCESSED_DIR = path.join(DOCS_DIR, 'processed');
const INDEX_HTML = path.join(ROOT, 'index.html');
const CURRICULUM_DATA = path.join(ROOT, 'curriculum-data.js');

// ─── Stage definitions (mirrors learning-path.html) ───
const STAGES = [
  {
    id: 1,
    title: 'AI 基礎認知',
    keywords: ['基礎', 'fundamentals', 'introduction', 'beginner', 'privacy', 'risk', 'trends',
               'books', 'leaders', 'adolescence', 'paradox', 'guide', 'agentic era', 'productivity paradox'],
    tags: ['Analysis', 'Research'],
    tagWeight: 0.3, // low — many tags overlap
    description: 'AI/LLM fundamentals, risks, industry overview'
  },
  {
    id: 2,
    title: 'Prompt 與溝通技巧',
    keywords: ['prompt', 'context', 'articulation', 'expression', 'anti-prompt', 'question',
               'insight', 'data literacy', 'context engineering', 'context setup',
               'prompt engineering', 'prompt pipeline', '提問', '表達', '溝通'],
    tags: ['Prompt'],
    tagWeight: 0.7,
    description: 'Prompt engineering, context engineering, communication'
  },
  {
    id: 3,
    title: 'AI 工具實戰',
    keywords: ['claude code', 'claude cowork', 'starter', 'tips', 'interactive mode',
               'voice', 'typeless', 'notebooklm', 'tool', 'tutorial', 'guide',
               '入門', '技巧', '攻略', '指南', '評測', '操作'],
    tags: ['Tool'],
    tagWeight: 0.5,
    description: 'Hands-on tools — Claude Code, Cowork, Claude tips'
  },
  {
    id: 4,
    title: 'Agent 架構與自動化',
    keywords: ['agent', 'automation', 'framework', 'skill', 'n8n', 'pipeline', 'workflow',
               'agentic', 'act', 'base', 'triage', 'vibe coding', 'habit tracker',
               'second brain', 'pdca', 'claude.md', 'skill graph', 'skill architecture'],
    tags: ['Agent', 'Automation', 'Framework'],
    tagWeight: 0.6,
    description: 'Agent design, automation workflows, Skills architecture'
  },
  {
    id: 5,
    title: '組織導入與領導力',
    keywords: ['leadership', 'change management', 'organization', 'enterprise', 'security',
               'hardening', 'strategy', 'product', 'pm', 'amplification', 'humint',
               'future of work', 'detox', '領導', '組織', '變革', '安全', '策略'],
    tags: ['Security'],
    tagWeight: 0.5,
    description: 'Organization adoption, leadership, security, strategy'
  }
];

// ─── Topic cluster definitions (mirrors mindmap.html mdTopic) ───
const TOPIC_CLUSTERS = [
  {
    id: 'claude-code',
    heading: 'Claude Code',
    parent: 'Claude 工具生態',
    keywords: ['claude code', 'interactive mode', 'agent os', 'product mentors', 'claude-code', 'code power'],
    tags: []
  },
  {
    id: 'claude-cowork',
    heading: 'Claude Cowork',
    parent: 'Claude 工具生態',
    keywords: ['cowork', 'claude cowork', 'desktop agent'],
    tags: []
  },
  {
    id: 'claude-skills',
    heading: 'Claude Skills & Projects',
    parent: 'Claude 工具生態',
    keywords: ['skill', 'skills', 'project memory', 'projects', 'project health'],
    tags: []
  },
  {
    id: 'claude-tips',
    heading: 'Claude 使用技巧',
    parent: 'Claude 工具生態',
    keywords: ['claude tips', 'starter pack', 'context setup', '50 claude', '50-claude'],
    tags: []
  },
  {
    id: 'prompt-frameworks',
    heading: '框架與方法論',
    parent: 'Prompt 工程',
    keywords: ['prompt engineering', 'anti-prompt', 'question system', 'prompt caching',
               'prompt pipeline', 'insight creator', 'prompts'],
    tags: ['Prompt']
  },
  {
    id: 'context-engineering',
    heading: 'Context Engineering',
    parent: 'Prompt 工程',
    keywords: ['context engineering', 'notebooklm', 'source control'],
    tags: []
  },
  {
    id: 'agent-frameworks',
    heading: '框架設計',
    parent: 'Agent 架構',
    keywords: ['act', 'base', 'a2ui', 'agent framework', 'skills vs agents'],
    tags: ['Framework']
  },
  {
    id: 'agent-apps',
    heading: 'Agent 應用',
    parent: 'Agent 架構',
    keywords: ['email triage', 'gmail', 'news agent', 'ai boss', 'openclaw agent', 'openclaw review'],
    tags: []
  },
  {
    id: 'agent-commerce',
    heading: 'Agent 商務',
    parent: 'Agent 架構',
    keywords: ['a2a', 'commerce', 'agent ecology', 'agent ecologies'],
    tags: []
  },
  {
    id: 'automation',
    heading: '自動化 & 整合',
    parent: '自動化 & 整合',
    keywords: ['n8n', 'synta', 'habit tracker', 'content repurposing', 'second brain',
               'linkedin carousel', 'vibe coding', 'diagram'],
    tags: ['Automation']
  },
  {
    id: 'llm-claude',
    heading: 'Claude 模型',
    parent: 'LLM 模型 & 技術',
    keywords: ['sonnet', 'opus', 'haiku', 'dynamic filtering', 'computer use'],
    tags: []
  },
  {
    id: 'other-tools',
    heading: '其他工具',
    parent: 'LLM 模型 & 技術',
    keywords: ['typeless', 'biotech compass', 'ux search', 'tool detox', 'data literacy'],
    tags: []
  },
  {
    id: 'industry-trends',
    heading: '大勢判讀',
    parent: 'AI 產業趨勢',
    keywords: ['amodei', 'jensen', 'ces', 'agentic coding', 'trends', 'musk', 'agi',
               'disruption', 'shumer', 'agentic era'],
    tags: []
  },
  {
    id: 'industry-analysis',
    heading: '產業分析',
    parent: 'AI 產業趨勢',
    keywords: ['apple', 'gemini strategy', 'amplification', 'sovereign', 'import ai', 'batch'],
    tags: []
  },
  {
    id: 'security',
    heading: '安全 & 隱私',
    parent: '安全 & 隱私',
    keywords: ['security', 'hardening', 'privacy', 'humint'],
    tags: ['Security']
  },
  {
    id: 'leadership',
    heading: '職場 & 領導力',
    parent: '職場 & 領導力',
    keywords: ['pm', 'change management', 'leadership', 'productivity paradox',
               'future of work', 'books leaders'],
    tags: []
  },
  {
    id: 'content-brand',
    heading: '內容創作 & 個人品牌',
    parent: '內容創作 & 個人品牌',
    keywords: ['substack', 'newsletter', 'x platform', 'articulation', 'carousel'],
    tags: ['Content']
  },
  {
    id: 'personal-growth',
    heading: '個人成長 & 心態',
    parent: '個人成長 & 心態',
    keywords: ['human 3.0', 'dan koe', 'fix your life', 'multiple interests', 'focus',
               'forget money', 'comparison trap', 'crypto survival'],
    tags: []
  },
  {
    id: 'research',
    heading: '研究方法',
    parent: '研究方法',
    keywords: ['research', '研究', 'beginner sins'],
    tags: ['Research']
  }
];

// ─── Helpers ───

function getMeta(html, name) {
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

function getTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : '';
}

function getBodyText(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;
  return body
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function countLines(html) {
  return html.split('\n').length;
}

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// ─── Scoring engine ───

/**
 * Score a doc against a stage/topic using keywords + tags.
 * Returns a numeric score (higher = better match).
 */
function scoreMatch(entry, docTitle, docTags, docSummary, bodyText) {
  let score = 0;
  const titleLower = docTitle.toLowerCase();
  const summaryLower = docSummary.toLowerCase();

  // Keyword matches in title (strongest signal)
  for (const kw of entry.keywords) {
    if (titleLower.includes(kw)) score += 10;
    if (summaryLower.includes(kw)) score += 5;
    if (bodyText.includes(kw)) score += 2;
  }

  // Tag matches
  if (entry.tags) {
    for (const t of entry.tags) {
      if (docTags.includes(t)) score += 3 * (entry.tagWeight || 1);
    }
  }

  return score;
}

/**
 * Evaluate which stage (1–5) fits best, plus a "supplementary" option.
 * Returns ranked array of { stage, score, reason }.
 */
function evaluateStage(docTitle, docTags, docSummary, bodyText) {
  const results = STAGES.map(stage => {
    const score = scoreMatch(stage, docTitle, docTags, docSummary, bodyText);
    return { stage, score };
  });

  results.sort((a, b) => b.score - a.score);

  // Add reasons
  return results.map(r => {
    const matchedKw = r.stage.keywords.filter(kw =>
      docTitle.toLowerCase().includes(kw) ||
      docSummary.toLowerCase().includes(kw)
    );
    const matchedTags = (r.stage.tags || []).filter(t => docTags.includes(t));
    const reasons = [];
    if (matchedKw.length) reasons.push(`keywords: ${matchedKw.slice(0, 3).join(', ')}`);
    if (matchedTags.length) reasons.push(`tags: ${matchedTags.join(', ')}`);
    return { ...r, reason: reasons.join(' | ') || 'weak match' };
  });
}

/**
 * Evaluate which topic cluster fits best.
 * Returns ranked array of { topic, score, reason }.
 */
function evaluateTopic(docTitle, docTags, docSummary, bodyText) {
  const results = TOPIC_CLUSTERS.map(topic => {
    const score = scoreMatch(topic, docTitle, docTags, docSummary, bodyText);
    return { topic, score };
  });

  results.sort((a, b) => b.score - a.score);

  return results.map(r => {
    const matchedKw = r.topic.keywords.filter(kw =>
      docTitle.toLowerCase().includes(kw) ||
      docSummary.toLowerCase().includes(kw)
    );
    const reasons = [];
    if (matchedKw.length) reasons.push(`keywords: ${matchedKw.slice(0, 3).join(', ')}`);
    return { ...r, reason: reasons.join(' | ') || 'weak match' };
  });
}

// ─── File updaters ───

/**
 * Append to index.html documents[] array
 */
function updateIndexHtml(meta) {
  let html = fs.readFileSync(INDEX_HTML, 'utf-8');

  const entry = `{date:"${meta.date}",title:"${meta.title.replace(/"/g, '\\"')}",source:"${meta.source.replace(/"/g, '&amp;')}",tags:[${meta.tags.map(t => `"${t}"`).join(',')}],rating:${meta.rating},summary:"${meta.summary.replace(/"/g, '\\"')}",lines:${meta.lines},file:"${meta.file}"}`;

  // Insert as first item in the documents array (newest first)
  const insertPoint = 'const documents=[';
  const idx = html.indexOf(insertPoint);
  if (idx === -1) throw new Error('Cannot find documents array in index.html');
  const insertAt = idx + insertPoint.length;
  html = html.slice(0, insertAt) + entry + ',' + html.slice(insertAt);

  fs.writeFileSync(INDEX_HTML, html, 'utf-8');
  return true;
}

/**
 * Append to curriculum-data.js stages[].docs (feeds both learning-path + mindmap)
 */
function updateCurriculumStage(meta, stageId, required) {
  let src = fs.readFileSync(CURRICULUM_DATA, 'utf-8');

  const docEntry = `      { file: '${meta.file}', title: '${meta.title.replace(/'/g, "\\'")} ★${meta.rating}', required: ${required}, why: '${meta.summary.slice(0, 60).replace(/'/g, "\\'")}' },`;

  // Find the stage's docs array and append before the closing ]
  const stagePattern = new RegExp(`id:\\s*${stageId},`);
  const stageMatch = stagePattern.exec(src);
  if (!stageMatch) throw new Error(`Cannot find stage ${stageId} in curriculum-data.js`);

  // Find "docs: [" after this stage id
  const docsStart = src.indexOf('docs: [', stageMatch.index);
  if (docsStart === -1) throw new Error(`Cannot find docs array for stage ${stageId}`);

  // Find the closing "]" for this docs array
  let bracketCount = 0;
  let docsEnd = -1;
  for (let i = docsStart + 6; i < src.length; i++) {
    if (src[i] === '[') bracketCount++;
    if (src[i] === ']') {
      if (bracketCount === 0) { docsEnd = i; break; }
      bracketCount--;
    }
  }
  if (docsEnd === -1) throw new Error(`Cannot find end of docs array for stage ${stageId}`);

  // Insert before the closing ]
  src = src.slice(0, docsEnd) + '\n' + docEntry + '\n    ' + src.slice(docsEnd);

  fs.writeFileSync(CURRICULUM_DATA, src, 'utf-8');
  return true;
}

/**
 * Append to curriculum-data.js topicClusters
 */
function updateCurriculumTopic(meta, topicClusterId) {
  let src = fs.readFileSync(CURRICULUM_DATA, 'utf-8');
  const tc = TOPIC_CLUSTERS.find(t => t.id === topicClusterId);
  if (!tc) throw new Error(`Unknown topic cluster: ${topicClusterId}`);

  const docEntry = `          { title: '${meta.title.replace(/'/g, "\\'")} ★${meta.rating}', file: '${meta.file}' },`;

  // Find the subcluster heading in the file
  const headingPattern = `name: '${tc.heading}'`;
  let tcIdx = src.indexOf(headingPattern);
  if (tcIdx === -1) {
    // Try with the parent name for flat clusters (name: null)
    const parentPattern = `name: '${tc.parent}'`;
    tcIdx = src.indexOf(parentPattern);
  }
  if (tcIdx === -1) throw new Error(`Cannot find topic cluster '${tc.heading}' in curriculum-data.js`);

  // Find "docs: [" after this point
  const docsStart = src.indexOf('docs: [', tcIdx);
  if (docsStart === -1) throw new Error(`Cannot find docs array for topic '${tc.heading}'`);

  // Find the closing "]"
  let bracketCount = 0;
  let docsEnd = -1;
  for (let i = docsStart + 6; i < src.length; i++) {
    if (src[i] === '[') bracketCount++;
    if (src[i] === ']') {
      if (bracketCount === 0) { docsEnd = i; break; }
      bracketCount--;
    }
  }
  if (docsEnd === -1) throw new Error(`Cannot find end of docs array for topic '${tc.heading}'`);

  src = src.slice(0, docsEnd) + '\n' + docEntry + '\n        ' + src.slice(docsEnd);

  fs.writeFileSync(CURRICULUM_DATA, src, 'utf-8');
  return true;
}

/**
 * Validate curriculum-data.js after mutation — ensures the file is still valid JS.
 */
function validateCurriculumData() {
  // Clear require cache to force re-read
  delete require.cache[require.resolve(CURRICULUM_DATA)];
  try {
    const data = require(CURRICULUM_DATA);
    const errors = [];

    // Check stages exist and have docs
    if (!Array.isArray(data.stages) || data.stages.length === 0) {
      errors.push('stages array is missing or empty');
    } else {
      for (const stage of data.stages) {
        if (!stage.id || !stage.title) errors.push(`Stage missing id/title`);
        if (!Array.isArray(stage.docs)) errors.push(`Stage ${stage.id} missing docs array`);
        for (const doc of stage.docs || []) {
          if (!doc.file) errors.push(`Stage ${stage.id}: doc missing file field`);
          if (!doc.title) errors.push(`Stage ${stage.id}: doc missing title field`);
        }
      }
    }

    // Check topic clusters
    if (!Array.isArray(data.topicClusters) || data.topicClusters.length === 0) {
      errors.push('topicClusters array is missing or empty');
    }

    // Check markdown generation works
    if (typeof data.generatePathMarkdown !== 'function') {
      errors.push('generatePathMarkdown function missing');
    } else {
      const md = data.generatePathMarkdown();
      if (!md || md.length < 100) errors.push('generatePathMarkdown produced empty/short output');
    }

    if (typeof data.generateTopicMarkdown !== 'function') {
      errors.push('generateTopicMarkdown function missing');
    } else {
      const md = data.generateTopicMarkdown();
      if (!md || md.length < 100) errors.push('generateTopicMarkdown produced empty/short output');
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }
    return { valid: true, errors: [] };
  } catch (e) {
    return { valid: false, errors: [`Failed to parse curriculum-data.js: ${e.message}`] };
  }
}

// ─── Main ───

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const filePath = args.find(a => !a.startsWith('--'));

  if (!filePath) {
    console.log('Usage: node add-doc.js <path-to-html> [--dry-run]');
    console.log('Example: node add-doc.js docs/2026-03-15_new-article.html');
    process.exit(1);
  }

  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  // Read and parse the doc
  const html = fs.readFileSync(fullPath, 'utf-8');
  const fileName = path.basename(fullPath);
  // Determine if file is in docs/ root (unprocessed) or already in processed/
  const isInProcessed = fullPath.includes(path.sep + 'processed' + path.sep);

  const meta = {
    date: getMeta(html, 'doc-date') || fileName.substring(0, 10),
    title: getMeta(html, 'doc-title') || getTitle(html) || fileName,
    source: getMeta(html, 'doc-source') || '',
    tags: (getMeta(html, 'doc-tags') || '').split(',').map(t => t.trim()).filter(Boolean),
    rating: parseFloat(getMeta(html, 'doc-rating') || '0'),
    summary: getMeta(html, 'doc-summary') || '',
    // Always store as processed/filename.html so links resolve correctly
    file: isInProcessed ? `processed/${fileName}` : `processed/${fileName}`,
    lines: countLines(html)
  };

  const bodyText = getBodyText(html);

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║              add-doc.js — New Article Helper             ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('📄 Document metadata:');
  console.log(`   File:    ${meta.file}`);
  console.log(`   Title:   ${meta.title}`);
  console.log(`   Date:    ${meta.date}`);
  console.log(`   Source:  ${meta.source}`);
  console.log(`   Tags:    ${meta.tags.join(', ')}`);
  console.log(`   Rating:  ${meta.rating}`);
  console.log(`   Lines:   ${meta.lines}`);
  console.log(`   Summary: ${meta.summary.slice(0, 80)}...`);

  // ─── Evaluate stage ───
  console.log('\n─── Learning Path Stage Evaluation ───\n');
  const stageResults = evaluateStage(meta.title, meta.tags, meta.summary, bodyText);
  const topStage = stageResults[0];
  const topStageScore = topStage.score;

  stageResults.forEach((r, i) => {
    const bar = '█'.repeat(Math.min(Math.round(r.score / 2), 20)) || '░';
    const marker = i === 0 ? ' ← RECOMMENDED' : '';
    console.log(`   Stage ${r.stage.id}: ${r.stage.title.padEnd(20)} score=${String(r.score).padStart(3)} ${bar}${marker}`);
    if (r.reason && r.reason !== 'weak match') console.log(`           ${r.reason}`);
  });

  // If top score is very low, suggest supplementary
  const isSupplementary = topStageScore < 5;
  if (isSupplementary) {
    console.log('\n   ⚠ Low confidence — may belong in 📖 補充學習 (supplementary)');
  }

  // ─── Evaluate topic cluster ───
  console.log('\n─── Mindmap Topic Cluster Evaluation ───\n');
  const topicResults = evaluateTopic(meta.title, meta.tags, meta.summary, bodyText);
  const topTopic = topicResults[0];

  topicResults.slice(0, 6).forEach((r, i) => {
    const bar = '█'.repeat(Math.min(Math.round(r.score / 2), 20)) || '░';
    const marker = i === 0 ? ' ← RECOMMENDED' : '';
    console.log(`   ${(r.topic.parent + ' > ' + r.topic.heading).padEnd(35)} score=${String(r.score).padStart(3)} ${bar}${marker}`);
    if (r.reason && r.reason !== 'weak match') console.log(`           ${r.reason}`);
  });

  // ─── Interactive confirmation ───
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log('\n─── Confirmation ───\n');

  // Stage selection
  const defaultStage = isSupplementary ? '0' : String(topStage.stage.id);
  const stageInput = await ask(rl,
    `   Learning Path Stage [${defaultStage}] (1-5, 0=supplementary, s=skip): `);
  const chosenStage = stageInput.trim() || defaultStage;

  let stageId = null;
  if (chosenStage !== 's') {
    stageId = parseInt(chosenStage, 10);
  }

  // Required/optional
  let required = false;
  if (stageId >= 1 && stageId <= 5) {
    const reqInput = await ask(rl, `   Required reading? [n] (y/n): `);
    required = reqInput.trim().toLowerCase() === 'y';
  }

  // Topic cluster selection
  const defaultTopic = topTopic.topic.id;
  console.log(`\n   Top topic suggestion: ${topTopic.topic.parent} > ${topTopic.topic.heading}`);
  const topicInput = await ask(rl,
    `   Topic cluster [${defaultTopic}] (enter ID, or s=skip): `);
  const chosenTopic = topicInput.trim() || defaultTopic;

  rl.close();

  // ─── Summary before applying ───
  console.log('\n─── Changes to apply ───\n');
  console.log(`   1. dashboard-data.js → Rebuild via build-dashboard-data.js`);
  if (stageId !== null && stageId >= 1 && stageId <= 5) {
    console.log(`   2. curriculum-data.js → Stage ${stageId} (${STAGES[stageId-1].title}), ${required ? '必讀' : '選讀'}`);
  } else {
    console.log(`   2. curriculum-data.js → (skipped for stages)`);
  }
  if (chosenTopic !== 's') {
    const tc = TOPIC_CLUSTERS.find(t => t.id === chosenTopic);
    console.log(`   3. curriculum-data.js → Topic: ${tc ? tc.parent + ' > ' + tc.heading : chosenTopic}`);
  } else {
    console.log(`   3. curriculum-data.js → (skipped for topics)`);
  }
  console.log(`   4. search-index.js   → Rebuild via build-search-index.js`);
  console.log(`   5. Validation        → Parse and validate curriculum-data.js`);

  if (dryRun) {
    console.log('\n   🔍 DRY RUN — no files modified.\n');
    process.exit(0);
  }

  console.log('\n   Applying changes...\n');

  // Backup curriculum-data.js before mutations
  const backupSrc = fs.readFileSync(CURRICULUM_DATA, 'utf-8');

  // 1. Update curriculum-data.js — stage
  if (stageId >= 1 && stageId <= 5) {
    try {
      updateCurriculumStage(meta, stageId, required);
      console.log(`   ✅ curriculum-data.js stage ${stageId} updated`);
    } catch (e) {
      console.error(`   ❌ curriculum-data.js stage update failed: ${e.message}`);
    }
  } else {
    console.log('   ⏭  curriculum stage skipped');
  }

  // 2. Update curriculum-data.js — topic cluster
  if (chosenTopic !== 's') {
    try {
      updateCurriculumTopic(meta, chosenTopic);
      console.log(`   ✅ curriculum-data.js topic cluster updated`);
    } catch (e) {
      console.error(`   ❌ curriculum-data.js topic update failed: ${e.message}`);
    }
  } else {
    console.log('   ⏭  curriculum topic skipped');
  }

  // 3. Validate curriculum-data.js
  const validation = validateCurriculumData();
  if (!validation.valid) {
    console.error('\n   ❌ VALIDATION FAILED — rolling back curriculum-data.js:');
    validation.errors.forEach(e => console.error(`      - ${e}`));
    fs.writeFileSync(CURRICULUM_DATA, backupSrc, 'utf-8');
    console.log('   ↩  curriculum-data.js restored from backup');
    process.exit(1);
  }
  console.log('   ✅ curriculum-data.js validation passed');

  // Detect available JS runner (node or bun)
  const { execSync } = require('child_process');
  const runner = (() => {
    try { execSync('node --version', { stdio: 'ignore' }); return 'node'; } catch {}
    try { execSync('bun --version', { stdio: 'ignore' }); return 'bun'; } catch {}
    return null;
  })();

  // 4. Rebuild dashboard-data.js
  if (runner) {
    try {
      execSync(`${runner} build-dashboard-data.js`, { cwd: ROOT, stdio: 'inherit' });
      console.log('   ✅ dashboard-data.js rebuilt');
    } catch (e) {
      console.error(`   ❌ dashboard-data.js rebuild failed: ${e.message}`);
    }
  }

  // 5. Rebuild search index
  if (runner) {
    try {
      execSync(`${runner} build-search-index.js`, { cwd: ROOT, stdio: 'inherit' });
      console.log('   ✅ search-index.js rebuilt');
    } catch (e) {
      console.error(`   ❌ search-index.js rebuild failed: ${e.message}`);
    }
  }

  // Move file to docs/processed/ if it's currently in docs/ root
  if (!isInProcessed) {
    if (!fs.existsSync(PROCESSED_DIR)) fs.mkdirSync(PROCESSED_DIR, { recursive: true });
    const dest = path.join(PROCESSED_DIR, fileName);
    fs.renameSync(fullPath, dest);
    console.log(`   ✅ Moved ${fileName} → docs/processed/`);
  }

  console.log('\n   🎉 Done! All files updated.\n');
  console.log('   Note: learning-path.html and mindmap.html auto-load from curriculum-data.js — no direct edits needed.\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
