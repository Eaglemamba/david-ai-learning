#!/usr/bin/env node
/**
 * Build dashboard-data.js from docs/*.html meta tags
 * Usage: node build-dashboard-data.js
 *
 * Reads all docs/*.html files, extracts doc-* meta tags,
 * counts lines, and outputs a sorted (newest-first) JS array.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs');
const OUTPUT_FILE = path.join(__dirname, 'dashboard-data.js');

// Get all HTML files
const htmlFiles = fs.readdirSync(DOCS_DIR)
  .filter(f => f.endsWith('.html'))
  .sort();

console.log(`Processing ${htmlFiles.length} files for dashboard...`);

/**
 * Extract meta tag content by name attribute
 */
function getMeta(html, name) {
  // Support both name="..." content="..." and content="..." name="..." attribute orders
  const re1 = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i');
  const re2 = new RegExp(`<meta\\s+content="([^"]*)"\\s+name="${name}"`, 'i');
  const match = html.match(re1) || html.match(re2);
  return match ? match[1] : null;
}

/**
 * Extract <title> content
 */
function getTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
}

// Process all files
const documents = [];

for (const file of htmlFiles) {
  const filePath = path.join(DOCS_DIR, file);
  const html = fs.readFileSync(filePath, 'utf-8');
  const lines = html.split('\n').length;

  const docDate = getMeta(html, 'doc-date') || file.substring(0, 10);
  const docTitle = getMeta(html, 'doc-title') || getTitle(html) || file;
  const docSource = getMeta(html, 'doc-source') || '';
  const docRating = parseFloat(getMeta(html, 'doc-rating') || '0');
  const docTagsStr = getMeta(html, 'doc-tags') || '';
  const docTags = docTagsStr ? docTagsStr.split(',').map(t => t.trim()) : [];
  const docSummary = getMeta(html, 'doc-summary') || '';
  const docFile = getMeta(html, 'doc-file') || file;

  documents.push({
    date: docDate,
    title: docTitle,
    source: docSource,
    tags: docTags,
    rating: docRating,
    summary: docSummary,
    lines,
    file: docFile,
  });

  console.log(`  ✓ ${file} (${lines} lines)`);
}

// Sort by date descending (newest first)
documents.sort((a, b) => b.date.localeCompare(a.date));

// Write output
const output = `const documents = ${JSON.stringify(documents, null, 2)};\n`;
fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

console.log(`\nDone! ${documents.length} documents written to dashboard-data.js`);
