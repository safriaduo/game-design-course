#!/usr/bin/env node
/**
 * Validates everything in /content before it goes online:
 *   - JSON syntax
 *   - unique ids, and references between files (topic → games, sources, related…)
 *   - missing translations for every language declared in site.json
 *   - interface strings used by the site but missing from ui.json
 *   - photos listed in students.json that don't exist on disk
 *
 * Usage:  node tools/check-content.mjs      (or: npm run check)
 * Exit code 1 on errors; warnings don't fail the check.
 */

import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GLYPHS, SHAPES } from '../assets/js/glyphs.js';
import { PALETTE, GAME_KINDS, SOURCE_KINDS, EVIDENCE, SEARCH_ENGINES } from '../assets/js/schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const error = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

async function loadJson(name) {
  try {
    return JSON.parse(await readFile(path.join(root, 'content', `${name}.json`), 'utf8'));
  } catch (err) {
    error(`content/${name}.json`, err.message);
    return null;
  }
}

const exists = (file) => access(path.join(root, file)).then(() => true, () => false);

function report() {
  const pad = (list, mark) => list.map((line) => `  ${mark} ${line}`).join('\n');
  if (warnings.length) console.log(`\n${warnings.length} warning(s):\n${pad(warnings, '•')}`);
  if (errors.length) console.log(`\n${errors.length} error(s):\n${pad(errors, '✗')}`);
  if (!errors.length) console.log(`\n✓ Content OK${warnings.length ? ' (see warnings above)' : ''}.`);
  process.exit(errors.length ? 1 : 0);
}

const names = ['site', 'ui', 'topics', 'games', 'library', 'students'];
const [site, ui, topicsFile, gamesFile, library, students] = await Promise.all(names.map(loadJson));
if (errors.length) report();

/* ---------- languages ---------- */

const langs = (site.languages || []).map((l) => l.code);
if (!langs.length) error('site.json', 'no languages declared');
if (!langs.includes(site.defaultLanguage)) error('site.json', `defaultLanguage "${site.defaultLanguage}" is not in languages`);

const LANG_CODE = /^[a-z]{2,3}(-[A-Za-z]{2,4})?$/;
const isLocalized = (v) =>
  v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0 && Object.keys(v).every((k) => LANG_CODE.test(k));

/** Walk any value and check every { it, en, … } object it contains. */
function checkTranslations(value, where) {
  if (Array.isArray(value)) return value.forEach((item, i) => checkTranslations(item, `${where}[${i}]`));
  if (!value || typeof value !== 'object') return;
  if (isLocalized(value)) {
    for (const code of Object.keys(value)) {
      if (!langs.includes(code)) warn(where, `language "${code}" is not declared in site.json`);
    }
    const present = langs.filter((code) => value[code] != null);
    for (const code of langs) {
      if (value[code] == null) warn(where, `missing "${code}" translation (falls back to "${site.defaultLanguage}")`);
    }
    const lengths = present.filter((c) => Array.isArray(value[c])).map((c) => `${c}:${value[c].length}`);
    if (lengths.length > 1 && new Set(lengths.map((s) => s.split(':')[1])).size > 1) {
      warn(where, `lists have different lengths across languages (${lengths.join(', ')})`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) checkTranslations(child, `${where}.${key}`);
}

/* ---------- ids ---------- */

function indexById(items, where) {
  const map = new Map();
  (items || []).forEach((item, i) => {
    if (!item?.id) return error(`${where}[${i}]`, 'missing "id"');
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.id)) warn(`${where} › ${item.id}`, 'ids should be lowercase-with-dashes (they appear in URLs)');
    if (map.has(item.id)) error(`${where} › ${item.id}`, 'duplicate id');
    map.set(item.id, item);
  });
  return map;
}

const families = indexById(topicsFile.families, 'topics.json › families');
const topics = indexById(topicsFile.topics, 'topics.json › topics');
const games = indexById(gamesFile.games, 'games.json');
const sources = indexById(library.sources, 'library.json');
const projects = indexById(students.projects, 'students.json');

/* ---------- families & topics ---------- */

for (const [id, fam] of families) {
  const where = `topics.json › families › ${id}`;
  if (!SHAPES[fam.shape]) error(where, `unknown shape "${fam.shape}" (use: ${Object.keys(SHAPES).join(', ')})`);
  if (!PALETTE.includes(fam.color) && !/^#[0-9a-f]{3,8}$/i.test(fam.color || '')) {
    error(where, `unknown color "${fam.color}" (use: ${PALETTE.join(', ')} or a #hex value)`);
  }
  if (!fam.name) error(where, 'missing "name"');
}

for (const [id, topic] of topics) {
  const where = `topics.json › ${id}`;
  if (!families.has(topic.family)) error(where, `unknown family "${topic.family}"`);
  if (!GLYPHS[topic.glyph]) error(where, `unknown glyph "${topic.glyph}" (use: ${Object.keys(GLYPHS).join(', ')})`);
  for (const field of ['title', 'lead']) if (!topic[field]) error(where, `missing "${field}"`);
  (topic.games || []).forEach((g) => games.has(g) || error(where, `unknown game "${g}" (add it to games.json)`));
  (topic.sources || []).forEach((s) => sources.has(s) || error(where, `unknown source "${s}" (add it to library.json)`));
  (topic.related || []).forEach((r) => {
    if (r === id) warn(where, 'a topic is related to itself');
    else if (!topics.has(r)) error(where, `unknown related topic "${r}"`);
  });
}

/* ---------- games & sources ---------- */

const referencedGames = new Set(topicsFile.topics.flatMap((t) => t.games || []));
for (const [id, game] of games) {
  const where = `games.json › ${id}`;
  if (!game.name) error(where, 'missing "name"');
  if (!GAME_KINDS.includes(game.kind)) error(where, `unknown kind "${game.kind}" (use: ${GAME_KINDS.join(', ')})`);
  if (!referencedGames.has(id)) warn(where, 'not used by any topic (it still appears on the Games page)');
}

for (const [id, src] of sources) {
  const where = `library.json › ${id}`;
  if (!src.title) error(where, 'missing "title"');
  if (!SOURCE_KINDS.includes(src.kind)) error(where, `unknown kind "${src.kind}" (use: ${SOURCE_KINDS.join(', ')})`);
  if (src.evidence != null && !EVIDENCE.includes(src.evidence)) error(where, `unknown evidence "${src.evidence}" (use: ${EVIDENCE.join(', ')})`);
  if (src.url != null && !/^https?:\/\//.test(src.url)) error(where, `url must start with http:// or https://`);
  if (src.search != null && !SEARCH_ENGINES[src.search]) error(where, `unknown search "${src.search}" (use: ${Object.keys(SEARCH_ENGINES).join(', ')})`);
}

/* ---------- students ---------- */

let placeholders = 0;
for (const [id, p] of projects) {
  const where = `students.json › ${id}`;
  if (!p.title) error(where, 'missing "title"');
  if (p.placeholder) placeholders++;
  for (const img of p.images || []) {
    const src = typeof img === 'string' ? img : img?.src;
    if (!src) { error(where, 'image without a path'); continue; }
    if (/^https?:\/\//.test(src)) continue;
    if (!(await exists(src))) error(where, `image not found: ${src}`);
  }
}
if (placeholders) warn('students.json', `${placeholders} example project(s) still marked "placeholder": remove them when real projects arrive`);

/* ---------- site ---------- */

(site.featured || []).forEach((id) => topics.has(id) || error('site.json › featured', `unknown topic "${id}"`));
if (/esempio|example/i.test(site.teacher?.email || '')) warn('site.json › teacher.email', 'still the placeholder address');
if (/^Nome Cognome$/.test(site.teacher?.name || '')) warn('site.json › teacher.name', 'still the placeholder name');

/* ---------- ui strings used in code ---------- */

const code = await readFile(path.join(root, 'assets', 'js', 'app.js'), 'utf8');
const used = new Set();
for (const m of code.matchAll(/\bt\(\s*'([\w.-]+)'/g)) used.add(m[1]);
for (const m of code.matchAll(/\bplural\(\s*'([\w.-]+)'/g)) { used.add(`${m[1]}.one`); used.add(`${m[1]}.other`); }
for (const key of used) if (!(key in ui)) error('ui.json', `missing key "${key}" (used in app.js)`);
// keys built dynamically in app.js
const dynamic = [
  ...['topics', 'games', 'library', 'showcase', 'about'].map((v) => `nav.${v}`),
  ...EVIDENCE.flatMap((e) => [`ev.${e}`, `ev.${e}.desc`]),
  ...SOURCE_KINDS.map((k) => `src.${k}`),
  ...Object.keys(SEARCH_ENGINES).map((e) => `search.${e}`),
  ...['all', ...GAME_KINDS].map((k) => `games.kind.${k}`),
  ...GAME_KINDS.map((k) => `games.kind1.${k}`),
  ...['topics', 'games', 'sources', 'projects'].map((k) => `home.box.${k}`),
  ...['key', 'mistakes', 'games', 'sources', 'related'].map((k) => `topic.${k}`),
];
for (const key of dynamic) if (!(key in ui)) error('ui.json', `missing key "${key}"`);

/* ---------- translations everywhere ---------- */

checkTranslations(site, 'site.json');
for (const [key, value] of Object.entries(ui)) {
  if (!isLocalized(value) && typeof value !== 'string') error(`ui.json › ${key}`, 'must be a string or a { "it": …, "en": … } object');
  else checkTranslations(value, `ui.json › ${key}`);
}
checkTranslations(topicsFile, 'topics.json');
checkTranslations(gamesFile, 'games.json');
checkTranslations(library, 'library.json');
checkTranslations(students, 'students.json');

console.log(`Checked ${topics.size} topics, ${families.size} families, ${games.size} games, ${sources.size} sources, ${projects.size} projects in ${langs.length} languages (${langs.join(', ')}).`);
report();
