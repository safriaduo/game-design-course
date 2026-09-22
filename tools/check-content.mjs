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

const names = ['site', 'ui', 'topics', 'games', 'library', 'students', 'career'];
const [site, ui, topicsFile, gamesFile, library, students, career] = await Promise.all(names.map(loadJson));
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
  (topic.examples || []).forEach((ex, i) => {
    const at = `${where} › examples[${i}]`;
    if (ex.game && !games.has(ex.game)) error(at, `unknown game "${ex.game}" (add it to games.json)`);
    if (!ex.game && !ex.title) error(at, 'needs a "game" id or a "title"');
    if (!ex.text && !ex.game) error(at, 'missing "text"');
  });
  (topic.exercises || []).forEach((ex, i) => {
    if (!ex.text) error(`${where} › exercises[${i}]`, 'missing "text"');
  });
  (topic.compare || []).forEach((c, i) => {
    const at = `${where} › compare[${i}]`;
    if (!c.name) error(at, 'missing "name"');
    if (!c.pros && !c.cons) warn(at, 'no "pros" or "cons"');
  });
  if (!topic.examples?.length && !topic.games?.length) warn(where, 'no examples');
  if (!topic.exercises?.length) warn(where, 'no exercises');
  (topic.sources || []).forEach((s) => sources.has(s) || error(where, `unknown source "${s}" (add it to library.json)`));
  (topic.related || []).forEach((r) => {
    if (r === id) warn(where, 'a topic is related to itself');
    else if (!topics.has(r)) error(where, `unknown related topic "${r}"`);
  });
}

/* ---------- games & sources ---------- */

for (const [id, game] of games) {
  const where = `games.json › ${id}`;
  if (!game.name) error(where, 'missing "name"');
  if (!GAME_KINDS.includes(game.kind)) error(where, `unknown kind "${game.kind}" (use: ${GAME_KINDS.join(', ')})`);
}

for (const [id, src] of sources) {
  const where = `library.json › ${id}`;
  if (!src.title) error(where, 'missing "title"');
  if (!SOURCE_KINDS.includes(src.kind)) error(where, `unknown kind "${src.kind}" (use: ${SOURCE_KINDS.join(', ')})`);
  if (src.evidence != null && !EVIDENCE.includes(src.evidence)) error(where, `unknown evidence "${src.evidence}" (use: ${EVIDENCE.join(', ')})`);
  if (src.file != null) {
    // "file" is a path, or one path per language: { "it": "…", "en": "…" }
    const files = typeof src.file === 'string' ? [src.file] : Object.values(src.file);
    for (const file of files) {
      if (!String(file).startsWith('assets/')) error(where, `"file" must point to a file in assets/ (got "${file}")`);
      else if (!(await exists(file))) error(where, `file not found: ${file}`);
    }
    if (src.url != null) warn(where, 'has both "file" and "url": "file" wins');
  }
  if (src.download != null && typeof src.download !== 'boolean') error(where, '"download" must be true or false');
  if (src.download && src.file == null) error(where, '"download" needs a "file"');
  if (src.url != null && !/^https?:\/\//.test(src.url)) {
    // Local files (e.g. a PDF in assets/docs/) are allowed, as long as they exist.
    if (!src.url.startsWith('assets/')) error(where, 'url must start with http(s):// or point to a file in assets/');
    else if (!(await exists(src.url))) error(where, `file not found: ${src.url}`);
  }
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

/* ---------- career ---------- */

const LINK_KINDS = ['site', 'discord'];
(career.groups || []).forEach((group, gi) => {
  const where = `career.json › groups[${gi}]${group.id ? ` (${group.id})` : ''}`;
  if (!group.title) error(where, 'missing "title"');
  (group.links || []).forEach((link, li) => {
    const at = `${where} › ${link.id || `links[${li}]`}`;
    if (!link.name) error(at, 'missing "name"');
    if (!/^https?:\/\//.test(link.url || '')) error(at, 'url must start with http:// or https://');
    if (!LINK_KINDS.includes(link.kind)) error(at, `unknown kind "${link.kind}" (use: ${LINK_KINDS.join(', ')})`);
  });
});
(career.related || []).forEach((id) => topics.has(id) || error('career.json › related', `unknown topic "${id}"`));

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
  ...['topics', 'games', 'library', 'showcase', 'career', 'about'].map((v) => `nav.${v}`),
  ...LINK_KINDS.map((k) => `career.kind.${k}`),
  ...EVIDENCE.flatMap((e) => [`ev.${e}`, `ev.${e}.desc`]),
  ...SOURCE_KINDS.map((k) => `src.${k}`),
  ...Object.keys(SEARCH_ENGINES).map((e) => `search.${e}`),
  ...['all', ...GAME_KINDS].map((k) => `games.kind.${k}`),
  ...GAME_KINDS.map((k) => `games.kind1.${k}`),
  ...['topics', 'games', 'sources', 'projects'].map((k) => `home.box.${k}`),
  ...['key', 'compare', 'mistakes', 'examples', 'exercises', 'sources', 'related'].map((k) => `topic.${k}`),
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
checkTranslations(career, 'career.json');

console.log(`Checked ${topics.size} topics, ${families.size} families, ${games.size} games, ${sources.size} sources, ${projects.size} projects in ${langs.length} languages (${langs.join(', ')}).`);
report();
