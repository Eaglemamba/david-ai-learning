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
const INDEX_HTML = path.join(ROOT, 'index.html');
const MINDMAP_HTML = path.join(ROOT, 'mindmap.html');
const LEARNING_PATH_HTML = path.join(ROOT, 'learning-path.html');

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
 * Append to learning-path.html stages[].docs
 */
function updateLearningPath(meta, stageId, required) {
  let html = fs.readFileSync(LEARNING_PATH_HTML, 'utf-8');

  const docEntry = `      { file: '${meta.file}', title: '${meta.title.replace(/'/g, "\\'")} ★${meta.rating}', required: ${required}, why: '${meta.summary.slice(0, 30).replace(/'/g, "\\'")}' },`;

  // Find the stage's docs array and append before the closing ]
  // Strategy: find "id: N," then find the next "]" that closes that stage's docs
  const stagePattern = new RegExp(`id:\\s*${stageId},`);
  const stageMatch = stagePattern.exec(html);
  if (!stageMatch) throw new Error(`Cannot find stage ${stageId} in learning-path.html`);

  // Find "docs: [" after this stage id
  const docsStart = html.indexOf('docs: [', stageMatch.index);
  if (docsStart === -1) throw new Error(`Cannot find docs array for stage ${stageId}`);

  // Find the closing "]" for this docs array
  let bracketCount = 0;
  let docsEnd = -1;
  for (let i = docsStart + 6; i < html.length; i++) {
    if (html[i] === '[') bracketCount++;
    if (html[i] === ']') {
      if (bracketCount === 0) { docsEnd = i; break; }
      bracketCount--;
    }
  }
  if (docsEnd === -1) throw new Error(`Cannot find end of docs array for stage ${stageId}`);

  // Insert before the closing ]
  html = html.slice(0, docsEnd) + '\n' + docEntry + '\n    ' + html.slice(docsEnd);

  fs.writeFileSync(LEARNING_PATH_HTML, html, 'utf-8');
  return true;
}

/**
 * Append to mindmap.html — both mdPath and mdTopic
 */
function updateMindmap(meta, stageId, topicCluster, required) {
  let html = fs.readFileSync(MINDMAP_HTML, 'utf-8');
  const linkText = `- [${meta.title} ★${meta.rating}](docs/${meta.file})`;

  // ─── Update mdPath (learning path view) ───
  // Find the stage section in mdPath, then the 必讀/選讀 subsection
  const stageHeadings = {
    1: '## 🧠 Stage 1：AI 基礎認知',
    2: '## 💬 Stage 2：Prompt 與溝通技巧',
    3: '## 🛠 Stage 3：AI 工具實戰',
    4: '## 🤖 Stage 4：Agent 架構與自動化',
    5: '## 🏢 Stage 5：組織導入與領導力'
  };

  if (stageId >= 1 && stageId <= 5) {
    const stageHeading = stageHeadings[stageId];
    const stageIdx = html.indexOf(stageHeading);
    if (stageIdx !== -1) {
      // Find the subsection (必讀 or 選讀)
      const subsection = required ? '### 必讀' : '### 選讀';
      let subIdx = html.indexOf(subsection, stageIdx);
      if (subIdx === -1) {
        // Fallback: use 必讀 if 選讀 not found
        subIdx = html.indexOf('### 必讀', stageIdx);
      }
      if (subIdx !== -1) {
        // Find the next heading (## or ###) after this subsection to determine end
        const nextHeading = html.substring(subIdx + subsection.length).search(/\n##/);
        let insertPos;
        if (nextHeading !== -1) {
          insertPos = subIdx + subsection.length + nextHeading;
        } else {
          // End of mdPath string — find the closing backtick
          insertPos = html.indexOf('`;', subIdx);
        }
        html = html.slice(0, insertPos) + '\n' + linkText + html.slice(insertPos);
      }
    }
  } else {
    // Stage 6+ → supplementary section (## 📖 補充學習)
    // Put under the most relevant sub-heading or at the end
    const suppIdx = html.indexOf('## 📖 補充學習');
    if (suppIdx !== -1) {
      const nextSection = html.indexOf('\n## ', suppIdx + 5);
      const insertPos = nextSection !== -1 ? nextSection : html.indexOf('`;', suppIdx);
      html = html.slice(0, insertPos) + '\n' + linkText + html.slice(insertPos);
    }
  }

  // ─── Update mdTopic (topic clusters view) ───
  if (topicCluster) {
    const tc = TOPIC_CLUSTERS.find(t => t.id === topicCluster);
    if (tc) {
      // Find the heading line in mdTopic
      // Try "### heading" first, then "## heading"
      let headingPattern = `### ${tc.heading}`;
      let tcIdx = html.indexOf(headingPattern);
      if (tcIdx === -1) {
        headingPattern = `## ${tc.heading}`;
        tcIdx = html.indexOf(headingPattern);
      }
      if (tcIdx === -1) {
        headingPattern = `## ${tc.parent}`;
        tcIdx = html.indexOf(headingPattern);
      }

      if (tcIdx !== -1) {
        // Find next heading after this one
        const afterHeading = tcIdx + headingPattern.length;
        const nextH = html.substring(afterHeading).search(/\n##/);
        let insertPos;
        if (nextH !== -1) {
          insertPos = afterHeading + nextH;
        } else {
          insertPos = html.indexOf('`;', afterHeading);
        }
        html = html.slice(0, insertPos) + '\n' + linkText + html.slice(insertPos);
      }
    }
  }

  fs.writeFileSync(MINDMAP_HTML, html, 'utf-8');
  return true;
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

  const meta = {
    date: getMeta(html, 'doc-date') || fileName.substring(0, 10),
    title: getMeta(html, 'doc-title') || getTitle(html) || fileName,
    source: getMeta(html, 'doc-source') || '',
    tags: (getMeta(html, 'doc-tags') || '').split(',').map(t => t.trim()).filter(Boolean),
    rating: parseFloat(getMeta(html, 'doc-rating') || '0'),
    summary: getMeta(html, 'doc-summary') || '',
    file: getMeta(html, 'doc-file') || fileName,
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
  console.log(`   1. index.html       → Add to documents[] array`);
  if (stageId !== null) {
    if (stageId >= 1 && stageId <= 5) {
      console.log(`   2. learning-path.html → Stage ${stageId} (${STAGES[stageId-1].title}), ${required ? '必讀' : '選讀'}`);
    } else {
      console.log(`   2. learning-path.html → (skip — supplementary articles not in learning path)`);
    }
  } else {
    console.log(`   2. learning-path.html → (skipped)`);
  }
  if (chosenTopic !== 's') {
    const tc = TOPIC_CLUSTERS.find(t => t.id === chosenTopic);
    console.log(`   3. mindmap.html      → Path: Stage ${stageId || 'supp'} | Topic: ${tc ? tc.parent + ' > ' + tc.heading : chosenTopic}`);
  } else {
    console.log(`   3. mindmap.html      → (skipped)`);
  }
  console.log(`   4. search-index.js   → Rebuild via build-search-index.js`);

  if (dryRun) {
    console.log('\n   🔍 DRY RUN — no files modified.\n');
    process.exit(0);
  }

  console.log('\n   Applying changes...\n');

  // 1. Update index.html
  try {
    updateIndexHtml(meta);
    console.log('   ✅ index.html updated');
  } catch (e) {
    console.error(`   ❌ index.html failed: ${e.message}`);
  }

  // 2. Update learning-path.html
  if (stageId >= 1 && stageId <= 5) {
    try {
      updateLearningPath(meta, stageId, required);
      console.log('   ✅ learning-path.html updated');
    } catch (e) {
      console.error(`   ❌ learning-path.html failed: ${e.message}`);
    }
  } else {
    console.log('   ⏭  learning-path.html skipped');
  }

  // 3. Update mindmap.html
  if (chosenTopic !== 's') {
    try {
      updateMindmap(meta, stageId || 0, chosenTopic, required);
      console.log('   ✅ mindmap.html updated');
    } catch (e) {
      console.error(`   ❌ mindmap.html failed: ${e.message}`);
    }
  } else {
    console.log('   ⏭  mindmap.html skipped');
  }

  // 4. Rebuild search index
  try {
    const { execSync } = require('child_process');
    execSync('node build-search-index.js', { cwd: ROOT, stdio: 'inherit' });
    console.log('   ✅ search-index.js rebuilt');
  } catch (e) {
    console.error(`   ❌ search-index.js rebuild failed: ${e.message}`);
  }

  // 5. Update doc count in mindmap stats
  try {
    let mm = fs.readFileSync(MINDMAP_HTML, 'utf-8');
    const docCount = fs.readdirSync(path.join(ROOT, 'docs')).filter(f => f.endsWith('.html')).length;
    mm = mm.replace(/\d+ 篇/g, `${docCount} 篇`);
    fs.writeFileSync(MINDMAP_HTML, mm, 'utf-8');
    console.log(`   ✅ mindmap stats updated (${docCount} 篇)`);
  } catch (e) {
    // non-critical
  }

  console.log('\n   🎉 Done! All files updated.\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
