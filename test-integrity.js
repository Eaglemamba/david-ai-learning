#!/usr/bin/env node
/**
 * test-integrity.js — Basic integration tests for david-ai-learning
 *
 * Verifies:
 *   1. All docs in docs/ have valid meta tags
 *   2. Search index entry count roughly matches doc count
 *   3. Dashboard-data doc count matches docs/ file count
 *   4. curriculum-data.js is valid and all referenced files exist
 *   5. No broken file references across the system
 *
 * Usage: node test-integrity.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DOCS_DIR = path.join(ROOT, 'docs');

let passed = 0;
let failed = 0;
const errors = [];

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    errors.push(message);
    console.log(`   FAIL: ${message}`);
  }
}

function run() {
  console.log('\n=== david-ai-learning integrity tests ===\n');

  // ─── 1. Docs directory: meta tag validation ───
  console.log('1. Checking docs/ meta tags...');
  const docFiles = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith('.html') && f !== 'styles.css');
  const REQUIRED_METAS = ['doc-date', 'doc-title', 'doc-tags', 'doc-rating', 'doc-summary', 'doc-file'];

  let docsWithMissingMeta = 0;
  for (const file of docFiles) {
    const html = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
    for (const meta of REQUIRED_METAS) {
      const re = new RegExp(`<meta\\s+name="${meta}"\\s+content="[^"]*"`, 'i');
      if (!re.test(html)) {
        docsWithMissingMeta++;
        assert(false, `${file}: missing meta tag '${meta}'`);
      }
    }
  }
  if (docsWithMissingMeta === 0) {
    assert(true, `All ${docFiles.length} docs have complete meta tags`);
    console.log(`   PASS: All ${docFiles.length} docs have complete meta tags`);
  }

  // ─── 2. Dashboard-data.js doc count ───
  console.log('\n2. Checking dashboard-data.js...');
  const dashSrc = fs.readFileSync(path.join(ROOT, 'dashboard-data.js'), 'utf-8');
  const dashDocCount = (dashSrc.match(/"file":\s*"/g) || []).length;
  assert(
    dashDocCount === docFiles.length,
    `dashboard-data.js has ${dashDocCount} docs, but docs/ has ${docFiles.length} files`
  );
  if (dashDocCount === docFiles.length) {
    console.log(`   PASS: dashboard-data.js count (${dashDocCount}) matches docs/ (${docFiles.length})`);
  }

  // ─── 3. Search index entry count ───
  console.log('\n3. Checking search-index.js...');
  const searchSrc = fs.readFileSync(path.join(ROOT, 'search-index.js'), 'utf-8');
  const searchEntryCount = (searchSrc.match(/"file":\s*"/g) || []).length;
  // Search index has multiple entries per doc (one per H2/H3), so should be >= doc count
  assert(
    searchEntryCount >= docFiles.length,
    `search-index.js has ${searchEntryCount} entries but expected >= ${docFiles.length} docs`
  );
  if (searchEntryCount >= docFiles.length) {
    console.log(`   PASS: search-index.js has ${searchEntryCount} entries (>= ${docFiles.length} docs)`);
  }

  // ─── 4. curriculum-data.js validation ───
  console.log('\n4. Checking curriculum-data.js...');
  try {
    delete require.cache[require.resolve(path.join(ROOT, 'curriculum-data.js'))];
    const curriculum = require(path.join(ROOT, 'curriculum-data.js'));

    assert(Array.isArray(curriculum.stages), 'stages should be an array');
    assert(curriculum.stages.length === 5, `Expected 5 stages, got ${curriculum.stages.length}`);

    // Check all stage doc files exist
    let stageDocCount = 0;
    let missingStageFiles = 0;
    for (const stage of curriculum.stages) {
      for (const doc of stage.docs) {
        stageDocCount++;
        const docPath = path.join(DOCS_DIR, doc.file);
        if (!fs.existsSync(docPath)) {
          missingStageFiles++;
          assert(false, `Stage ${stage.id}: referenced file not found: ${doc.file}`);
        }
      }
    }
    if (missingStageFiles === 0) {
      console.log(`   PASS: All ${stageDocCount} stage doc references are valid`);
      assert(true, 'All stage doc files exist');
    }

    // Check topic cluster doc files exist
    let topicDocCount = 0;
    let missingTopicFiles = 0;
    for (const cluster of curriculum.topicClusters) {
      for (const sub of cluster.subclusters) {
        for (const doc of sub.docs) {
          topicDocCount++;
          const docPath = path.join(DOCS_DIR, doc.file);
          if (!fs.existsSync(docPath)) {
            missingTopicFiles++;
            assert(false, `Topic '${cluster.name}': referenced file not found: ${doc.file}`);
          }
        }
      }
    }
    if (missingTopicFiles === 0) {
      console.log(`   PASS: All ${topicDocCount} topic cluster doc references are valid`);
      assert(true, 'All topic cluster doc files exist');
    }

    // Check markdown generation
    const mdPath = curriculum.generatePathMarkdown();
    assert(mdPath.length > 500, `generatePathMarkdown output too short (${mdPath.length} chars)`);
    if (mdPath.length > 500) console.log(`   PASS: generatePathMarkdown works (${mdPath.length} chars)`);

    const mdTopic = curriculum.generateTopicMarkdown();
    assert(mdTopic.length > 500, `generateTopicMarkdown output too short (${mdTopic.length} chars)`);
    if (mdTopic.length > 500) console.log(`   PASS: generateTopicMarkdown works (${mdTopic.length} chars)`);

  } catch (e) {
    assert(false, `curriculum-data.js failed to load: ${e.message}`);
  }

  // ─── 5. Dashboard-data file references ───
  console.log('\n5. Checking dashboard-data.js file references...');
  const dashFileRefs = dashSrc.match(/"file":\s*"([^"]+)"/g) || [];
  let missingDashFiles = 0;
  for (const ref of dashFileRefs) {
    const fileName = ref.match(/"file":\s*"([^"]+)"/)[1];
    if (!fs.existsSync(path.join(DOCS_DIR, fileName))) {
      missingDashFiles++;
      assert(false, `dashboard-data.js references missing file: ${fileName}`);
    }
  }
  if (missingDashFiles === 0) {
    console.log(`   PASS: All ${dashFileRefs.length} dashboard file references are valid`);
    assert(true, 'All dashboard file references exist');
  }

  // ─── 6. Check for orphan docs (in docs/ but not in dashboard-data.js) ───
  console.log('\n6. Checking for orphan docs...');
  const dashFiles = new Set(dashFileRefs.map(ref => ref.match(/"file":\s*"([^"]+)"/)[1]));
  const orphans = docFiles.filter(f => !dashFiles.has(f));
  if (orphans.length > 0) {
    assert(false, `${orphans.length} orphan doc(s) not in dashboard-data.js: ${orphans.slice(0, 5).join(', ')}`);
  } else {
    console.log(`   PASS: No orphan docs found`);
    assert(true, 'No orphan docs');
  }

  // ─── Results ───
  console.log('\n' + '='.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (errors.length > 0) {
    console.log('\nFailures:');
    errors.forEach(e => console.log(`  - ${e}`));
  }
  console.log();

  process.exit(failed > 0 ? 1 : 0);
}

run();
