#!/usr/bin/env node
/**
 * Build search-index.js from docs/*.html
 * Usage: node build-search-index.js [--limit N]
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs');
const OUTPUT_FILE = path.join(__dirname, 'search-index.js');
const MAX_CONTENT_LENGTH = 500;
const MAX_CONTENT_LENGTH_SINGLE = 1500;

// Parse command line args
const args = process.argv.slice(2);
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;

// Get all HTML files sorted by name
const htmlFiles = fs.readdirSync(DOCS_DIR)
  .filter(f => f.endsWith('.html'))
  .sort()
  .slice(0, LIMIT);

console.log(`Processing ${htmlFiles.length} files...`);

/**
 * Extract meta tag content by name attribute
 */
function getMeta(html, name) {
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i');
  const match = html.match(re);
  return match ? match[1] : null;
}

/**
 * Extract <title> content
 */
function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
}

/**
 * Strip HTML tags and normalize whitespace
 */
function stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate a slug from text for sectionId
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

/**
 * Extract the <body> content
 */
function getBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

/**
 * Find sections by h2/h3 headings.
 * Returns array of { sectionId, sectionTitle, content }
 */
function extractSections(bodyHtml) {
  const sections = [];

  // Match h2 or h3 tags and capture their content + position
  const headingRegex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(bodyHtml)) !== null) {
    const titleText = stripHtml(match[2]);
    // Skip empty or very short headings (like just emoji)
    if (titleText.length < 2) continue;
    headings.push({
      index: match.index,
      endIndex: match.index + match[0].length,
      level: parseInt(match[1]),
      title: titleText,
    });
  }

  if (headings.length === 0) {
    // No headings found — treat entire body as one section
    const text = stripHtml(bodyHtml);
    if (text.length > 10) {
      sections.push({
        sectionId: 'main',
        sectionTitle: 'Main Content',
        content: text,
      });
    }
    return sections;
  }

  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const nextStart = i + 1 < headings.length ? headings[i + 1].index : bodyHtml.length;
    const sectionHtml = bodyHtml.substring(h.endIndex, nextStart);
    const content = stripHtml(sectionHtml);

    // Skip sections with very little content
    if (content.length < 10) continue;

    sections.push({
      sectionId: slugify(h.title) || `section-${i + 1}`,
      sectionTitle: h.title,
      content: content,
    });
  }

  return sections;
}

// Process all files
const searchIndex = [];

for (const file of htmlFiles) {
  const filePath = path.join(DOCS_DIR, file);
  const html = fs.readFileSync(filePath, 'utf-8');

  // Extract metadata
  const docDate = getMeta(html, 'doc-date') || file.substring(0, 10);
  const docTitle = getMeta(html, 'doc-title') || getTitle(html) || file;
  const docSource = getMeta(html, 'doc-source') || '';
  const docRatingStr = getMeta(html, 'doc-rating') || '0';
  const docRating = parseFloat(docRatingStr);
  const docTagsStr = getMeta(html, 'doc-tags') || '';
  const docTags = docTagsStr ? docTagsStr.split(',').map(t => t.trim()) : [];
  const docFile = getMeta(html, 'doc-file') || file;

  // Extract body and sections
  const body = getBody(html);
  const sections = extractSections(body);

  // Single-section files get 1500 chars; multi-section files get 500
  const isSingle = sections.length <= 1;
  const contentLimit = isSingle ? MAX_CONTENT_LENGTH_SINGLE : MAX_CONTENT_LENGTH;

  if (sections.length === 0) {
    // Fallback: one entry for the whole doc
    const text = stripHtml(body);
    searchIndex.push({
      docFile,
      docTitle,
      docDate,
      docSource,
      docRating,
      docTags,
      sectionId: 'main',
      sectionTitle: docTitle,
      content: text.substring(0, contentLimit),
    });
  } else {
    for (const sec of sections) {
      searchIndex.push({
        docFile,
        docTitle,
        docDate,
        docSource,
        docRating,
        docTags,
        sectionId: sec.sectionId,
        sectionTitle: sec.sectionTitle,
        content: sec.content.substring(0, contentLimit),
      });
    }
  }

  console.log(`  ✓ ${file} → ${sections.length} sections`);
}

// Write output
const output = `const searchIndex = ${JSON.stringify(searchIndex, null, 2)};\n`;
fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

console.log(`\nDone! ${searchIndex.length} entries written to search-index.js`);
