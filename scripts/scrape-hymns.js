/**
 * Script to scrape all hymns from himnosycanticosdelevangelio.org
 * and generate the hymns.json data file.
 *
 * Usage: node scripts/scrape-hymns.js
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.himnosycanticosdelevangelio.org";
const INDEX_URL = `${BASE_URL}/himnos/`;
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "hymns.json");

const DELAY_MS = 300;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function getHymnUrls() {
  const html = await fetchPage(INDEX_URL);
  const regex = /href="(https:\/\/www\.himnosycanticosdelevangelio\.org\/himnos\/(\d{3})-[^"]+)"/g;
  const urls = [];
  const seen = new Set();
  let match;

  while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    const num = parseInt(match[2], 10);
    if (!seen.has(num)) {
      seen.add(num);
      urls.push({ id: num, url });
    }
  }

  urls.sort((a, b) => a.id - b.id);
  return urls;
}

function parseHymn(html, id) {
  // Extract title from h1
  const titleMatch = html.match(
    /<h1[^>]*class="elementor-heading-title[^"]*"[^>]*>(.*?)<\/h1>/
  );
  const title = titleMatch
    ? titleMatch[1].replace(/<[^>]+>/g, "").trim()
    : `Himno ${id}`;

  // Extract lyrics from elementor-text-editor div
  const contentMatch = html.match(
    /elementor-text-editor elementor-clearfix">([\s\S]*?)<\/div>/
  );
  if (!contentMatch) return null;

  const content = contentMatch[1];

  // Split into paragraphs
  const paragraphs = content
    .split(/<\/p>\s*<p>|<p>|<\/p>/)
    .map((p) =>
      p
        .replace(/<br\s*\/?>/g, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&#8217;/g, "\u2019")
        .replace(/&#8216;/g, "\u2018")
        .replace(/&#8220;/g, "\u201C")
        .replace(/&#8221;/g, "\u201D")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\n{2,}/g, "\n")
        .trim()
    )
    .filter((p) => p.length > 0);

  const verses = [];
  let chorus = null;

  for (const p of paragraphs) {
    if (/^Coro:/i.test(p)) {
      chorus = p.replace(/^Coro:\s*/i, "").trim();
    } else {
      verses.push(p);
    }
  }

  const hymn = { id, title, verses };
  if (chorus) hymn.chorus = chorus;
  return hymn;
}

async function main() {
  console.log("Fetching hymn index...");
  const hymnUrls = await getHymnUrls();
  console.log(`Found ${hymnUrls.length} hymns\n`);

  const hymns = [];
  let errors = 0;

  for (const { id, url } of hymnUrls) {
    try {
      const html = await fetchPage(url);
      const hymn = parseHymn(html, id);
      if (hymn) {
        hymns.push(hymn);
        process.stdout.write(`\r✓ ${id}/${hymnUrls.length} - ${hymn.title}`);
      } else {
        console.log(`\n✗ ${id} - Could not parse content`);
        errors++;
      }
    } catch (err) {
      console.log(`\n✗ ${id} - ${err.message}`);
      errors++;
    }
    await sleep(DELAY_MS);
  }

  hymns.sort((a, b) => a.id - b.id);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(hymns, null, 2), "utf-8");
  console.log(`\n\nDone! ${hymns.length} hymns saved to ${OUTPUT_PATH}`);
  if (errors > 0) console.log(`${errors} errors encountered`);
}

main().catch(console.error);
