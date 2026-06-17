#!/usr/bin/env node

/**
 * Simple SRI generator for Next.js static export
 * Adds integrity hashes to CSS and JS files in the built HTML
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUT_DIR = path.join(__dirname, '..', 'out');
const HTML_FILE = path.join(OUT_DIR, 'index.html');

function generateHash(content) {
  return 'sha384-' + crypto.createHash('sha384').update(content).digest('base64');
}

function processHtml() {
  if (!fs.existsSync(HTML_FILE)) {
    console.error('index.html not found in out/ directory');
    process.exit(1);
  }

  let html = fs.readFileSync(HTML_FILE, 'utf8');

  // Find all CSS links
  const cssRegex = /<link[^>]*href="([^"]+\.css)"[^>]*>/g;
  html = html.replace(cssRegex, (match, href) => {
    const filePath = path.join(OUT_DIR, href.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const hash = generateHash(content);
      return match.replace('>', ` integrity="${hash}" crossorigin="anonymous">`);
    }
    return match;
  });

  // Find all script tags with src
  const scriptRegex = /<script[^>]*src="([^"]+)"[^>]*>/g;
  html = html.replace(scriptRegex, (match, src) => {
    const filePath = path.join(OUT_DIR, src.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const hash = generateHash(content);
      return match.replace('>', ` integrity="${hash}" crossorigin="anonymous">`);
    }
    return match;
  });

  fs.writeFileSync(HTML_FILE, html);
  console.log('SRI hashes added successfully to index.html');
}

processHtml();
