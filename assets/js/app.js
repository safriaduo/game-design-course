/**
 * Game Design — i mattoncini
 *
 * A single-page site with no build step. All content lives in /content/*.json.
 * Any text field there can be:
 *   - a plain string            → same text in every language
 *   - { "it": "…", "en": "…" }  → one text per language (missing ones fall back
 *                                  to the default language declared in site.json)
 * Text supports a tiny bit of Markdown: *italic*, **bold**, `code`, [link](https://…).
 *
 * Routes (hash-based, so they work on GitHub Pages without server config):
 *   #/<lang>/                 home
 *   #/<lang>/topics           all topics   (?family=…&q=…)
 *   #/<lang>/topic/<id>       one topic
 *   #/<lang>/games            games to try (?kind=…&focus=<game id>)
 *   #/<lang>/library          books, papers, talks (?kind=…)
 *   #/<lang>/showcase         student projects
 *   #/<lang>/career           where to go next: jams, communities, launching
 *   #/<lang>/about            teacher, course, contacts
 */

import { glyph, suit, gameIcon, sourceIcon, linkIcon, icon, heroArt, cover } from './glyphs.js';
import { PALETTE, GAME_KINDS, SOURCE_KINDS, EVIDENCE, SEARCH_ENGINES, DEFAULT_ENGINE } from './schema.js';

const CONTENT = ['site', 'ui', 'topics', 'games', 'library', 'students', 'career'];
const state = { lang: '', data: null, idx: null, booted: false };
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function remember(key, value) {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}
function recall(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

/* =============================================================
   Text: localisation, escaping, mini-markdown
   ============================================================= */

function localize(value, lang = state.lang) {
  if (value == null) return '';
  if (Array.isArray(value)) return value.map((item) => localize(item, lang));
  if (typeof value === 'object') {
    if (value[lang] != null) return localize(value[lang], lang);
    const fallback = state.data.site.defaultLanguage;
    if (value[fallback] != null) return localize(value[fallback], lang);
    const first = Object.values(value).find((v) => v != null);
    return first == null ? '' : localize(first, lang);
  }
  return value;
}
const L = (value) => localize(value);
const list = (value) => {
  const out = localize(value);
  return Array.isArray(out) ? out : out ? [out] : [];
};

/** Interface string from ui.json, with {placeholders}. */
function t(key, vars = {}) {
  const entry = state.data.ui[key];
  let text = entry == null ? key : String(localize(entry));
  for (const [name, value] of Object.entries(vars)) text = text.split(`{${name}}`).join(value);
  return text;
}
/** "{n} topics" / "1 topic": ui.json has "<key>.one" and "<key>.other". */
const plural = (key, n) => t(n === 1 ? `${key}.one` : `${key}.other`, { n });

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function md(text, { links = true } = {}) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      if (!links || !/^(https?:|mailto:|#|assets\/)/.test(url)) return label;
      const ext = /^(https?:|assets\/)/.test(url) ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${url}"${ext}>${label}</a>`;
    });
}

const norm = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Inline style that sets the family colour (--fam) from a palette name or a hex value. */
function paint(color) {
  if (/^#[0-9a-f]{3,8}$/i.test(color || '')) return `--fam:${color}`;
  return `--fam:var(--c-${PALETTE.includes(color) ? color : 'ink'})`;
}

/* =============================================================
   Content
   ============================================================= */

async function loadContent() {
  const entries = await Promise.all(CONTENT.map(async (name) => {
    const res = await fetch(`content/${name}.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`content/${name}.json → HTTP ${res.status}`);
    try {
      return [name, await res.json()];
    } catch (err) {
      throw new Error(`content/${name}.json: ${err.message}`);
    }
  }));
  return Object.fromEntries(entries);
}

function indexContent(data) {
  const byId = (items = []) => new Map(items.map((item) => [item.id, item]));
  const idx = {
    families: byId(data.topics.families),
    topics: byId(data.topics.topics),
    games: byId(data.games.games),
    sources: byId(data.library.sources),
    topicsByGame: new Map(),
    topicsBySource: new Map(),
  };
  const add = (map, key, topic) => {
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(topic);
  };
  for (const topic of data.topics.topics) {
    const games = new Set(examplesOf(topic).map((ex) => ex.game).filter(Boolean));
    games.forEach((id) => add(idx.topicsByGame, id, topic));
    (topic.sources || []).forEach((id) => add(idx.topicsBySource, id, topic));
  }
  return idx;
}

/** A topic's examples. Older content may still list plain game ids in "games". */
function examplesOf(topic) {
  if (topic.examples) return topic.examples;
  return (topic.games || []).map((game) => ({ game }));
}

const familyOf = (topic) => state.idx.families.get(topic?.family) || { shape: 'square', color: 'ink', name: '' };

/* =============================================================
   Routing
   ============================================================= */

const languages = () => state.data.site.languages.map((l) => l.code);

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean).map((p) => {
    try { return decodeURIComponent(p); } catch { return p; }
  });
  return { parts, params: new URLSearchParams(query) };
}

function preferredLanguage() {
  const codes = languages();
  const saved = recall('gd-lang');
  if (codes.includes(saved)) return saved;
  for (const tag of navigator.languages || [navigator.language]) {
    const code = String(tag || '').slice(0, 2).toLowerCase();
    if (codes.includes(code)) return code;
  }
  return state.data.site.defaultLanguage;
}

function href(view = '', id = '', params = null, lang = state.lang) {
  let out = `#/${lang}/${[view, id].filter(Boolean).map(encodeURIComponent).join('/')}`;
  if (params) {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null && v !== '' && v !== 'all'));
    const query = new URLSearchParams(clean).toString();
    if (query) out += `?${query}`;
  }
  return out;
}

const VIEWS = {
  home: viewHome,
  topics: viewTopics,
  topic: viewTopic,
  games: viewGames,
  library: viewLibrary,
  showcase: viewShowcase,
  career: viewCareer,
  about: viewAbout,
};

function route() {
  const { parts, params } = parseHash();
  if (!languages().includes(parts[0])) {
    const query = params.toString();
    location.replace(`#/${preferredLanguage()}/${parts.map(encodeURIComponent).join('/')}${query ? `?${query}` : ''}`);
    return;
  }

  state.lang = parts[0];
  remember('gd-lang', state.lang);
  document.documentElement.lang = state.lang;

  const view = parts[1] || 'home';
  const render = VIEWS[view] || viewNotFound;
  const page = render(parts[2] || '', params);

  const main = $('#main');
  main.innerHTML = page.html;
  main.dataset.view = view;

  const siteTitle = state.data.site.title;
  document.title = page.title ? `${page.title} · ${siteTitle}` : `${siteTitle} — ${t('site.tagline')}`;
  const description = $('meta[name="description"]');
  if (description) description.content = page.description || L(state.data.site.description);

  renderChrome(view === 'topic' ? 'topics' : view);
  // Mount on the freshly rendered page, not on <main>: <main> outlives routes,
  // so listeners attached to it would pile up.
  page.mount?.(main.firstElementChild);

  if (state.booted) {
    window.scrollTo({ top: 0 });
    main.focus({ preventScroll: true });
  }
  state.booted = true;
}

/** Keep the URL in sync with filters without re-rendering the page. */
function replaceQuery(view, params) {
  history.replaceState(null, '', href(view, '', params));
  renderLanguageSwitch();
}

/* =============================================================
   Chrome: header, footer
   ============================================================= */

function renderChrome(active) {
  const nav = ['topics', 'games', 'library', 'showcase', 'career', 'about'];
  const navEl = $('#nav');
  navEl.setAttribute('aria-label', t('nav.label'));
  navEl.innerHTML = nav.map((view) => `<a href="${href(view)}"${view === active ? ' aria-current="page"' : ''}>${esc(t(`nav.${view}`))}</a>`).join('');

  $('#brand').href = href();
  $('#brand-tag').textContent = t('site.tagline');
  const skip = $('[data-skip]');
  skip.textContent = t('a11y.skip');

  renderLanguageSwitch();
  renderThemeButton();
  renderFooter();
}

function renderLanguageSwitch() {
  const { parts } = parseHash();
  const rest = parts.slice(1).map(encodeURIComponent).join('/');
  const query = location.hash.includes('?') ? `?${location.hash.split('?')[1]}` : '';
  const el = $('#lang');
  el.setAttribute('aria-label', t('lang.label'));
  el.innerHTML = state.data.site.languages.map((l) => `<a href="#/${l.code}/${rest}${query}" hreflang="${l.code}" lang="${l.code}" title="${esc(l.name)}"${l.code === state.lang ? ' aria-current="true"' : ''}>${esc(l.label)}</a>`).join('');
}

function currentTheme() {
  return document.documentElement.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function renderThemeButton() {
  const btn = $('#theme-toggle');
  const dark = currentTheme() === 'dark';
  btn.innerHTML = icon(dark ? 'sun' : 'moon');
  btn.setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
  btn.title = btn.getAttribute('aria-label');
}

function renderFooter() {
  const { site } = state.data;
  const year = new Date().getFullYear();
  const suits = state.data.topics.families.map((f) => `<span style="${paint(f.color)}">${suit(f.shape)}</span>`).join('');
  $('#footer').innerHTML = `
    <div class="wrap footer-inner">
      <div>
        <p><strong>${esc(site.title)}</strong> — ${esc(t('site.tagline'))}</p>
        <p>© ${year} ${esc(site.teacher.name)} · ${md(t('footer.license', { content: `[${site.license.content}](${site.license.contentUrl})`, code: site.license.code }))}</p>
        <p><a href="${esc(site.repository)}" target="_blank" rel="noopener">${esc(t('footer.source'))}</a> · <a href="mailto:${esc(site.teacher.email)}">${esc(site.teacher.email)}</a></p>
      </div>
      <div class="footer-suits" aria-hidden="true">${suits}</div>
    </div>`;
}

/* =============================================================
   Shared pieces
   ============================================================= */

function card(topic, i = 0) {
  const fam = familyOf(topic);
  return `<li><a class="card" href="${href('topic', topic.id)}" style="${paint(fam.color)};--i:${i}" aria-labelledby="card-${topic.id}">
    <span class="card-top">${suit(fam.shape)}${esc(L(fam.name))}</span>
    <span class="card-art">${glyph(topic.glyph)}</span>
    <span class="card-title" id="card-${topic.id}">${esc(L(topic.title))}</span>
    <span class="card-lead">${md(L(topic.lead), { links: false })}</span>
    <span class="card-foot" aria-hidden="true">${suit(fam.shape)}</span>
  </a></li>`;
}

function topicLinks(topics) {
  if (!topics?.length) return '';
  return `<ul class="topic-links">${topics.map((tp) => {
    const fam = familyOf(tp);
    return `<li><a class="topic-link" href="${href('topic', tp.id)}" style="${paint(fam.color)}">${suit(fam.shape)}${esc(L(tp.title))}</a></li>`;
  }).join('')}</ul>`;
}

function sourceLink(source) {
  if (source.file) {
    // "file" can differ per language. With "download": true the file is downloaded as is;
    // otherwise Markdown opens in GitHub's rendered view (tables, headings) and anything else directly.
    const file = L(source.file);
    if (source.download) return { url: file, engine: null, download: file.split('/').pop() };
    const { repository, branch = 'main' } = state.data.site;
    const url = /\.md$/i.test(file) ? `${repository}/blob/${branch}/${file}` : file;
    return { url, engine: null };
  }
  if (source.url) return { url: source.url, engine: null };
  const engine = SEARCH_ENGINES[source.search] ? source.search : DEFAULT_ENGINE[source.kind] || 'web';
  const title = L(source.title);
  const query = engine === 'scholar' ? `"${title}" ${source.by || ''}` : `${title} ${source.by || ''}`;
  return { url: SEARCH_ENGINES[engine] + encodeURIComponent(query.trim()), engine };
}

function sourceItem(source, { citedIn = false } = {}) {
  const { url, engine, download } = sourceLink(source);
  const meta = [L(source.by), source.year, L(source.publisher)].filter(Boolean).map(esc).join(' · ');
  const target = download ? ` download="${esc(download)}"` : ' target="_blank" rel="noopener"';
  const saving = download ? `<span class="badge badge-dl">${icon('download')}${esc(t('src.download'))}</span>` : '';
  const evidence = EVIDENCE.includes(source.evidence)
    ? `<span class="badge ev-${source.evidence}" title="${esc(t(`ev.${source.evidence}.desc`))}">${esc(t(`ev.${source.evidence}`))}</span>`
    : '';
  const search = engine
    ? `<span class="badge badge-search" title="${esc(t('search.hint'))}">${icon('search')}${esc(t(`search.${engine}`))}</span>`
    : '';
  const topics = citedIn ? topicLinks(state.idx.topicsBySource.get(source.id)) : '';
  return `<li class="source">
    ${sourceIcon(source.kind)}
    <div>
      <a class="source-title" href="${esc(url)}"${target}>${esc(L(source.title))}</a>
      ${meta ? `<div class="meta">${meta}</div>` : ''}
      ${source.note ? `<p class="source-note">${md(L(source.note))}</p>` : ''}
      ${topics}
    </div>
    <div class="source-badges">${saving}${evidence}${search}</div>
  </li>`;
}

function gameMeta(game) {
  return [L(game.aka), game.year, game.designer].filter(Boolean).map(esc).join(' · ');
}

const drawButton = (exclude = '', extra = '') =>
  `<button class="btn ${extra}" type="button" data-draw${exclude ? ` data-exclude="${esc(exclude)}"` : ''} title="${esc(t('action.drawHint'))}">${icon('shuffle')}${esc(t(exclude ? 'action.drawAnother' : 'action.draw'))}</button>`;

/* =============================================================
   Views
   ============================================================= */

function viewHome() {
  const { topics, families } = state.data.topics;
  const projects = state.data.students.projects.filter((p) => !p.placeholder).length;
  const featured = (state.data.site.featured || []).map((id) => state.idx.topics.get(id)).filter(Boolean);

  const box = [
    { n: topics.length, key: 'topics', view: 'topics', color: 'red' },
    { n: state.data.games.games.length, key: 'games', view: 'games', color: 'blue' },
    { n: state.data.library.sources.length, key: 'sources', view: 'library', color: 'yellow' },
    { n: projects || '—', key: 'projects', view: 'showcase', color: 'green' },
  ];

  const html = `
  <div class="wrap">
    <section class="hero">
      <div>
        <p class="eyebrow">${esc(t('home.eyebrow'))}</p>
        <h1 class="display">${md(t('home.title'))}</h1>
        <p class="lead">${md(t('home.lead'))}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${href('topics')}">${esc(t('home.cta'))}${icon('arrow')}</a>
          ${drawButton()}
        </div>
      </div>
      <div class="hero-art">${heroArt()}</div>
    </section>

    <section class="section" aria-labelledby="box-title">
      <h2 class="section-title" id="box-title">${esc(t('home.box.title'))}</h2>
      <div class="box">
        ${box.map((c) => `<a class="component" href="${href(c.view)}" style="${paint(c.color)}">
          <span class="num">${c.n}</span>
          <span class="label">${esc(t(`home.box.${c.key}`))}</span>
          <span class="go">${esc(t(`nav.${c.view}`))}${icon('arrow')}</span>
        </a>`).join('')}
      </div>
    </section>

    <section class="section" aria-labelledby="fam-title">
      <h2 class="section-title" id="fam-title">${esc(t('home.families.title'))}</h2>
      <p class="section-lead">${md(t('home.families.lead'))}</p>
      <div class="families">
        ${families.map((f) => {
          const n = topics.filter((tp) => tp.family === f.id).length;
          return `<a class="family" href="${href('topics', '', { family: f.id })}" style="${paint(f.color)}">
            ${suit(f.shape)}
            <strong>${esc(L(f.name))}<span class="meta">${n}</span></strong>
            <p>${md(L(f.description), { links: false })}</p>
          </a>`;
        }).join('')}
      </div>
    </section>

    ${featured.length ? `<section class="section" aria-labelledby="start-title">
      <h2 class="section-title" id="start-title">${esc(t('home.start.title'))}</h2>
      <p class="section-lead">${md(t('home.start.lead'))}</p>
      <ul class="deck">${featured.map(card).join('')}</ul>
    </section>` : ''}
  </div>`;

  return { title: '', html };
}

function topicHaystack(topic) {
  const fam = familyOf(topic);
  const examples = examplesOf(topic).flatMap((ex) => [L(state.idx.games.get(ex.game)?.name), L(ex.title), L(ex.text)]);
  const compared = (topic.compare || []).flatMap((c) => [L(c.name), L(c.text), ...list(c.pros), ...list(c.cons)]);
  const exercises = (topic.exercises || []).flatMap((ex) => [L(ex.text), L(ex.bonus)]);
  return norm([L(topic.title), L(topic.lead), ...list(topic.key), ...list(topic.mistakes), L(fam.name), ...compared, ...examples, ...exercises].join(' '));
}

function viewTopics(_, params) {
  const { topics, families } = state.data.topics;
  let query = params.get('q') || '';
  let family = state.idx.families.has(params.get('family')) ? params.get('family') : 'all';
  const haystacks = new Map(topics.map((tp) => [tp.id, topicHaystack(tp)]));

  const chip = (id, label, extra = '', style = '') =>
    `<button class="chip" type="button" data-family="${id}" aria-pressed="${id === family}"${style ? ` style="${style}"` : ''}>${extra}${esc(label)}</button>`;

  const html = `
  <div class="wrap">
    <header class="page-head">
      <p class="eyebrow">${esc(plural('topics.count', topics.length))}</p>
      <h1>${esc(t('topics.title'))}</h1>
      <p class="lead">${md(t('topics.lead'))}</p>
    </header>
    <div class="toolbar">
      <label class="search">${icon('search')}<span class="sr-only">${esc(t('topics.search'))}</span>
        <input id="topic-search" type="search" autocomplete="off" placeholder="${esc(t('topics.search'))}" value="${esc(query)}">
      </label>
      ${drawButton()}
    </div>
    <div class="chips" role="group" aria-label="${esc(t('topic.family'))}">
      ${chip('all', t('filter.all'))}
      ${families.map((f) => chip(f.id, L(f.name), suit(f.shape), paint(f.color))).join('')}
    </div>
    <p class="count" id="topic-count" aria-live="polite"></p>
    <ul class="deck" id="deck"></ul>
  </div>`;

  const mount = (root) => {
    const input = $('#topic-search', root);
    const deck = $('#deck', root);
    const count = $('#topic-count', root);
    const update = () => {
      const q = norm(query.trim());
      const shown = topics.filter((tp) => (family === 'all' || tp.family === family) && (!q || haystacks.get(tp.id).includes(q)));
      deck.innerHTML = shown.length
        ? shown.map(card).join('')
        : `<li class="empty"><p>${esc(t('topics.empty'))}</p><button class="btn" type="button" data-reset>${esc(t('action.reset'))}</button></li>`;
      count.textContent = plural('topics.count', shown.length);
      $$('[data-family]', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.family === family)));
      replaceQuery('topics', { q: query.trim(), family });
    };
    input.addEventListener('input', () => { query = input.value; update(); });
    root.addEventListener('click', (e) => {
      const chipBtn = e.target.closest('[data-family]');
      if (chipBtn) { family = chipBtn.dataset.family; update(); }
      if (e.target.closest('[data-reset]')) { query = ''; family = 'all'; input.value = ''; update(); input.focus(); }
    });
    update();
  };

  return { title: t('topics.title'), html, mount };
}

function viewTopic(id) {
  const topic = state.idx.topics.get(id);
  if (!topic) return viewNotFound(id);
  const fam = familyOf(topic);
  const key = list(topic.key);
  const mistakes = list(topic.mistakes);
  const examples = examplesOf(topic);
  const exercises = topic.exercises || [];
  const sources = (topic.sources || []).map((s) => state.idx.sources.get(s)).filter(Boolean);
  const toRead = sources.filter((s) => !['video', 'channel'].includes(s.kind));
  const toWatch = sources.filter((s) => ['video', 'channel'].includes(s.kind));
  const related = (topic.related || []).map((r) => state.idx.topics.get(r)).filter(Boolean);
  const section = (name, body) => `<section class="section"><h2 class="section-title">${esc(t(`topic.${name}`))}</h2>${body}</section>`;

  const example = (ex) => {
    const game = ex.game ? state.idx.games.get(ex.game) : null;
    const text = L(ex.text) || L(game?.note);
    const body = `${game ? gameIcon(game.kind) : '<span></span>'}
      <span><strong>${esc(game ? L(game.name) : L(ex.title))}</strong>${game && gameMeta(game) ? ` <span class="meta">${gameMeta(game)}</span>` : ''}
      <small>${md(text, { links: !game })}</small></span>`;
    return game
      ? `<li><a class="token" href="${href('games', '', { focus: game.id })}">${body}</a></li>`
      : `<li><div class="token">${body}</div></li>`;
  };

  const compare = topic.compare || [];
  const compareCard = (c) => {
    const pros = list(c.pros);
    const cons = list(c.cons);
    return `<li class="compare-card">
      <h3>${esc(L(c.name))}</h3>
      ${c.text ? `<p>${md(L(c.text))}</p>` : ''}
      <div class="pc">
        ${pros.length ? `<div><span class="pc-label pc-pro">${esc(t('topic.pros'))}</span><ul class="pc-list pro">${pros.map((p) => `<li><span>${md(p)}</span></li>`).join('')}</ul></div>` : ''}
        ${cons.length ? `<div><span class="pc-label pc-con">${esc(t('topic.cons'))}</span><ul class="pc-list con">${cons.map((p) => `<li><span>${md(p)}</span></li>`).join('')}</ul></div>` : ''}
      </div>
    </li>`;
  };

  const exercise = (ex, i) => `<li class="exercise">
    <span class="exercise-badge">${icon('pencil')}${esc(t('topic.exercise'))}${exercises.length > 1 ? ` ${i + 1}` : ''}</span>
    ${list(ex.text).map((p) => `<p>${md(p)}</p>`).join('')}
    ${ex.list ? `<ul>${list(ex.list).map((item) => `<li>${md(item)}</li>`).join('')}</ul>` : ''}
    ${ex.bonus ? `<p class="bonus"><span class="bonus-tag">${esc(t('topic.bonus'))}</span><span>${md(L(ex.bonus))}</span></p>` : ''}
  </li>`;

  const deeper = [
    toRead.length ? `<h3 class="deeper-title">${icon('book')}${esc(t('topic.read'))}</h3><ul class="sources">${toRead.map((s) => sourceItem(s)).join('')}</ul>` : '',
    toWatch.length ? `<h3 class="deeper-title">${icon('play')}${esc(t('topic.watch'))}</h3><ul class="sources">${toWatch.map((s) => sourceItem(s)).join('')}</ul>` : '',
  ].join('');

  const html = `
  <div class="wrap">
    <nav class="crumbs" aria-label="breadcrumb"><a href="${href('topics')}">${icon('back')}${esc(t('action.back'))}</a></nav>
    <article class="topic" style="${paint(fam.color)}">
      <aside class="topic-aside">
        <div class="card" aria-hidden="true">
          <span class="card-top">${suit(fam.shape)}${esc(L(fam.name))}</span>
          <span class="card-art">${glyph(topic.glyph)}</span>
          <span class="card-title">${esc(L(topic.title))}</span>
          <span class="card-foot">${suit(fam.shape)}</span>
        </div>
        ${drawButton(topic.id, 'btn-block')}
      </aside>
      <div class="topic-body">
        <p class="eyebrow">${suit(fam.shape)}${esc(L(fam.name))}</p>
        <h1 class="topic-title">${esc(L(topic.title))}</h1>
        <p class="lead">${md(L(topic.lead))}</p>

        ${key.length ? section('key', `<ol class="rules">${key.map((k) => `<li><span>${md(k)}</span></li>`).join('')}</ol>`) : ''}

        ${compare.length ? section('compare', `<ul class="compare">${compare.map(compareCard).join('')}</ul>`) : ''}

        ${mistakes.length ? `<section class="section pitfalls"><h2 class="section-title">${esc(t('topic.mistakes'))}</h2>
          <ul>${mistakes.map((m) => `<li><span>${md(m)}</span></li>`).join('')}</ul></section>` : ''}

        ${examples.length ? section('examples', `<ul class="tokens">${examples.map(example).join('')}</ul>`) : ''}

        ${exercises.length ? section('exercises', `<ol class="exercises">${exercises.map(exercise).join('')}</ol>`) : ''}

        ${deeper ? section('sources', deeper) : ''}

        ${related.length ? section('related', `<ul class="deck deck--mini">${related.map(card).join('')}</ul>`) : ''}
      </div>
    </article>
  </div>`;

  return { title: L(topic.title), description: L(topic.lead), html };
}

function viewGames(_, params) {
  const games = [...state.data.games.games].sort((a, b) => String(L(a.name)).localeCompare(L(b.name), state.lang));
  let kind = GAME_KINDS.includes(params.get('kind')) ? params.get('kind') : 'all';
  const focus = params.get('focus');

  const chip = (id) => {
    const n = id === 'all' ? games.length : games.filter((g) => g.kind === id).length;
    return `<button class="chip" type="button" data-kind="${id}" aria-pressed="${id === kind}">${id === 'all' ? '' : gameIcon(id)}${esc(t(`games.kind.${id}`))}<span class="n">${n}</span></button>`;
  };

  const tile = (g, i) => `<li><article class="game${g.id === focus ? ' is-focus' : ''}" id="game-${esc(g.id)}" style="--i:${i}">
    <div class="game-head">${gameIcon(g.kind)}<div>
      <h2>${esc(L(g.name))}</h2>
      <div class="meta">${[t(`games.kind1.${g.kind}`), gameMeta(g)].filter(Boolean).join(' · ')}</div>
    </div></div>
    <p>${md(L(g.note))}</p>
    ${topicLinks(state.idx.topicsByGame.get(g.id))}
  </article></li>`;

  const html = `
  <div class="wrap">
    <header class="page-head">
      <p class="eyebrow">${esc(plural('games.count', games.length))}</p>
      <h1>${esc(t('games.title'))}</h1>
      <p class="lead">${md(t('games.lead'))}</p>
    </header>
    <div class="toolbar"><div class="chips" role="group" aria-label="${esc(t('games.filter'))}">${['all', ...GAME_KINDS].map(chip).join('')}</div></div>
    <ul class="games-grid" id="games"></ul>
  </div>`;

  const mount = (root) => {
    const grid = $('#games', root);
    const update = (keepFocus) => {
      grid.innerHTML = games.filter((g) => kind === 'all' || g.kind === kind).map(tile).join('');
      $$('[data-kind]', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kind === kind)));
      replaceQuery('games', { kind, focus: keepFocus ? focus : null });
    };
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-kind]');
      if (b) { kind = b.dataset.kind; update(false); }
    });
    update(true);
    const target = focus && document.getElementById(`game-${focus}`);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'center', behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
  };

  return { title: t('games.title'), html, mount };
}

function viewLibrary(_, params) {
  const sources = state.data.library.sources;
  let kind = SOURCE_KINDS.includes(params.get('kind')) ? params.get('kind') : 'all';

  const chip = (id) => {
    const n = id === 'all' ? sources.length : sources.filter((s) => s.kind === id).length;
    return `<button class="chip" type="button" data-kind="${id}" aria-pressed="${id === kind}">${id === 'all' ? '' : sourceIcon(id)}${esc(t(id === 'all' ? 'filter.all' : `src.${id}`))}<span class="n">${n}</span></button>`;
  };

  const groups = () => SOURCE_KINDS
    .filter((k) => kind === 'all' || k === kind)
    .map((k) => {
      const items = sources.filter((s) => s.kind === k);
      if (!items.length) return '';
      return `<section class="lib-group">
        <h2>${sourceIcon(k)}${esc(t(`src.${k}`))}<span class="meta">${items.length}</span></h2>
        <ul class="sources">${items.map((s) => sourceItem(s, { citedIn: true })).join('')}</ul>
      </section>`;
    }).join('');

  const html = `
  <div class="wrap">
    <header class="page-head">
      <p class="eyebrow">${esc(plural('library.count', sources.length))}</p>
      <h1>${esc(t('library.title'))}</h1>
      <p class="lead">${md(t('library.lead'))}</p>
    </header>
    <section class="section" style="margin-top:32px" aria-labelledby="ev-title">
      <h2 class="section-title" id="ev-title">${esc(t('library.evidence'))}</h2>
      <div class="legend">
        ${EVIDENCE.map((e) => `<div class="legend-item"><span class="badge ev-${e}">${esc(t(`ev.${e}`))}</span><p>${md(t(`ev.${e}.desc`))}</p></div>`).join('')}
      </div>
    </section>
    <div class="toolbar" style="margin-top:48px"><div class="chips" role="group" aria-label="${esc(t('library.filter'))}">${['all', ...SOURCE_KINDS].map(chip).join('')}</div></div>
    <div id="groups"></div>
  </div>`;

  const mount = (root) => {
    const box = $('#groups', root);
    const update = () => {
      box.innerHTML = groups();
      $$('[data-kind]', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.kind === kind)));
      replaceQuery('library', { kind });
    };
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-kind]');
      if (b) { kind = b.dataset.kind; update(); }
    });
    update();
  };

  return { title: t('library.title'), html, mount };
}

const imageSrc = (img) => (typeof img === 'string' ? img : img?.src || '');
const imageAlt = (project, img, i) => (typeof img === 'object' && img?.alt ? L(img.alt) : `${L(project.title)} — ${i + 1}`);

function viewShowcase() {
  const projects = state.data.students.projects;
  const { site } = state.data;
  const colours = PALETTE.filter((c) => c !== 'ink');

  const shot = (p, i) => {
    const images = p.images || [];
    const media = images.length
      ? `<button class="shot-media" type="button" data-project="${esc(p.id)}" aria-label="${esc(t('showcase.open', { title: L(p.title) }))}">
          <img src="${esc(imageSrc(images[0]))}" alt="${esc(imageAlt(p, images[0], 0))}" loading="lazy" decoding="async" data-seed="${esc(p.id)}">
          ${images.length > 1 ? `<span class="shot-count">${esc(plural('showcase.photos', images.length))}</span>` : ''}
          ${p.placeholder ? `<span class="ribbon">${esc(t('showcase.example'))}</span>` : ''}
        </button>`
      : `<div class="shot-media">${cover(p.id)}${p.placeholder ? `<span class="ribbon">${esc(t('showcase.example'))}</span>` : ''}</div>`;
    const authors = (p.authors || []).map(esc).join(', ');
    return `<li><article class="shot" style="${paint(p.color || colours[i % colours.length])};--i:${i}">
      ${media}
      <div class="shot-body">
        <h2>${esc(L(p.title))}</h2>
        <div class="meta">${[authors && `${esc(t('showcase.by'))} ${authors}`, esc(p.year)].filter(Boolean).join(' · ')}</div>
        ${p.description ? `<p>${md(L(p.description))}</p>` : ''}
        ${p.tags?.length ? `<ul class="tags">${list(p.tags).map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>` : ''}
        ${p.link ? `<a class="shot-link" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(t('showcase.link'))} ↗</a>` : ''}
      </div>
    </article></li>`;
  };

  const html = `
  <div class="wrap">
    <header class="page-head">
      <p class="eyebrow">${esc(t('showcase.eyebrow'))}</p>
      <h1>${esc(t('showcase.title'))}</h1>
      <p class="lead">${md(t('showcase.lead'))}</p>
    </header>
    ${projects.length
      ? `<ul class="gallery" style="margin-top:36px">${projects.map(shot).join('')}</ul>`
      : `<p class="empty" style="margin-top:36px">${esc(t('showcase.empty'))}</p>`}
    <div class="callout">
      <p>${md(t('showcase.submit'))}</p>
      <a class="btn" href="mailto:${esc(site.teacher.email)}">${icon('mail')}${esc(t('about.email'))}</a>
    </div>
  </div>`;

  const mount = (root) => {
    // A missing photo falls back to a generated cover instead of a broken image.
    $$('img[data-seed]', root).forEach((img) => img.addEventListener('error', () => {
      img.replaceWith(document.createRange().createContextualFragment(cover(img.dataset.seed)));
    }, { once: true }));
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-project]');
      if (!btn) return;
      const project = projects.find((p) => p.id === btn.dataset.project);
      if (project) openLightbox(project, btn);
    });
  };

  return { title: t('showcase.title'), html, mount };
}

function openLightbox(project, opener) {
  const images = project.images || [];
  if (!images.length) return;
  let i = 0;
  let dialog = $('#lightbox');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'lightbox';
    dialog.className = 'lightbox';
    document.body.append(dialog);
  }
  const draw = (focusName) => {
    const img = images[i];
    const multi = images.length > 1;
    dialog.setAttribute('aria-label', L(project.title));
    dialog.innerHTML = `<figure class="lb-figure">
      <img src="${esc(imageSrc(img))}" alt="${esc(imageAlt(project, img, i))}">
      <div class="lb-bar">
        <figcaption><strong>${esc(L(project.title))}</strong>${multi ? `<span class="meta">${i + 1} / ${images.length}</span>` : ''}</figcaption>
        ${multi ? `<button class="icon-btn" type="button" data-lb="prev" aria-label="${esc(t('action.prev'))}">${icon('prev')}</button>
                   <button class="icon-btn" type="button" data-lb="next" aria-label="${esc(t('action.next'))}">${icon('next')}</button>` : ''}
        <button class="icon-btn" type="button" data-lb="close" aria-label="${esc(t('action.close'))}">${icon('close')}</button>
      </div>
    </figure>`;
    $(`[data-lb="${focusName || 'close'}"]`, dialog)?.focus();
  };
  const step = (d) => { i = (i + d + images.length) % images.length; draw(d < 0 ? 'prev' : 'next'); };
  dialog.onclick = (e) => {
    if (e.target === dialog) return dialog.close();
    const action = e.target.closest('[data-lb]')?.dataset.lb;
    if (action === 'close') dialog.close();
    if (action === 'prev') step(-1);
    if (action === 'next') step(1);
  };
  dialog.onkeydown = (e) => {
    if (images.length < 2) return;
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  };
  dialog.onclose = () => opener?.focus();
  draw();
  dialog.showModal();
}

function viewCareer() {
  const { career } = state.data;
  const steps = list(career.steps);
  const related = (career.related || []).map((id) => state.idx.topics.get(id)).filter(Boolean);
  const colours = PALETTE.filter((c) => c !== 'ink');

  const linkCard = (link) => {
    const tags = list(link.tags);
    return `<li><a class="link-card" href="${esc(link.url)}" target="_blank" rel="noopener">
      <span class="link-head">${linkIcon(link.kind)}<strong>${esc(L(link.name))}</strong><span class="meta">${esc(t(`career.kind.${link.kind}`))}</span></span>
      <p>${md(L(link.note), { links: false })}</p>
      ${tags.length ? `<ul class="tags">${tags.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>` : ''}
      <span class="link-go">${esc(t(link.kind === 'discord' ? 'career.join' : 'career.visit'))}${icon('external')}</span>
    </a></li>`;
  };

  const html = `
  <div class="wrap">
    <header class="page-head">
      <p class="eyebrow">${esc(t('career.eyebrow'))}</p>
      <h1>${esc(t('career.title'))}</h1>
      <p class="lead">${md(t('career.lead'))}</p>
    </header>

    ${steps.length ? `<section class="section" style="margin-top:40px;${paint('red')}">
      <h2 class="section-title">${esc(t('career.steps'))}</h2>
      <ol class="rules">${steps.map((s) => `<li><span>${md(s)}</span></li>`).join('')}</ol>
    </section>` : ''}

    ${(career.groups || []).map((group, i) => `<section class="section" style="${paint(group.color || colours[i % colours.length])}">
      <h2 class="section-title">${esc(L(group.title))}</h2>
      ${group.lead ? `<p class="section-lead">${md(L(group.lead))}</p>` : ''}
      <ul class="links-grid">${(group.links || []).map(linkCard).join('')}</ul>
    </section>`).join('')}

    ${related.length ? `<section class="section">
      <h2 class="section-title">${esc(t('career.related'))}</h2>
      <ul class="deck deck--mini">${related.map(card).join('')}</ul>
    </section>` : ''}
  </div>`;

  return { title: t('career.title'), html };
}

function viewAbout() {
  const { site } = state.data;
  const { teacher, course } = site;
  const shapes = state.data.topics.families;
  const exam = list(course.exam);
  const syllabus = `${site.repository}/blob/${site.branch || 'main'}/${site.syllabus}`;

  const html = `
  <div class="wrap">
    <header class="page-head">
      <p class="eyebrow">${esc(t('about.eyebrow'))}</p>
      <h1>${esc(t('about.title'))}</h1>
    </header>
    <div class="about">
      <div class="prose">
        <section class="section" aria-labelledby="teacher-title">
          <h2 class="section-title" id="teacher-title">${esc(t('about.teacher'))}</h2>
          <p class="teacher-name">${esc(teacher.name)}</p>
          <p class="teacher-role meta">${[L(teacher.role), L(teacher.affiliation)].filter(Boolean).map(esc).join(' · ')}</p>
          ${list(teacher.bio).map((p) => `<p>${md(p)}</p>`).join('')}
        </section>

        <section class="section" aria-labelledby="course-title">
          <h2 class="section-title" id="course-title">${esc(t('about.course'))}</h2>
          ${list(course.description).map((p) => `<p>${md(p)}</p>`).join('')}
          <h3>${esc(t('about.exam'))}</h3>
          <ul class="exam">${exam.map((item, i) => {
            const f = shapes[i % shapes.length];
            return `<li><span style="${paint(f.color)}">${suit(f.shape)}</span><span>${md(item)}</span></li>`;
          }).join('')}</ul>
          ${course.examNote ? `<p class="note">${md(L(course.examNote))}</p>` : ''}
          <p><a class="btn" href="${esc(syllabus)}" target="_blank" rel="noopener">${esc(t('about.syllabus'))}${icon('external')}</a></p>
          ${t('about.syllabus.note') ? `<p class="meta">${esc(t('about.syllabus.note'))}</p>` : ''}
        </section>

        <section class="section" aria-labelledby="site-title">
          <h2 class="section-title" id="site-title">${esc(t('about.site'))}</h2>
          <p>${md(t('about.site.body'))}</p>
          <p><a class="btn" href="${esc(site.repository)}" target="_blank" rel="noopener">${icon('github')}${esc(t('about.repo'))}</a></p>
        </section>
      </div>

      <aside class="contact-card" aria-labelledby="contact-title">
        <h2 id="contact-title">${esc(t('about.contact'))}</h2>
        <p>${md(t('about.contact.lead'))}</p>
        <a class="btn btn-primary" href="mailto:${esc(teacher.email)}">${icon('mail')}${esc(teacher.email)}</a>
        ${teacher.links?.length ? `<ul class="contact-links">${teacher.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(L(l.label))} ↗</a></li>`).join('')}</ul>` : ''}
      </aside>
    </div>
  </div>`;

  return { title: t('about.title'), html };
}

function viewNotFound(id = '') {
  const html = `
  <div class="wrap notfound" style="${paint('red')}">
    ${glyph('draft')}
    <h1>${esc(t('notfound.title'))}</h1>
    <p>${md(t('notfound.body'))}${id ? ` <code>${esc(id)}</code>` : ''}</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="${href()}">${esc(t('notfound.home'))}</a>
      ${drawButton()}
    </div>
  </div>`;
  return { title: t('notfound.title'), html };
}

/* =============================================================
   Global behaviour
   ============================================================= */

function drawTopic(button) {
  const pool = state.data.topics.topics.filter((tp) => tp.id !== button.dataset.exclude);
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  button.classList.add('is-shuffling');
  setTimeout(() => { location.hash = href('topic', pick.id); }, reducedMotion.matches ? 0 : 260);
}

function bindGlobalEvents() {
  document.addEventListener('click', (e) => {
    const draw = e.target.closest('[data-draw]');
    if (draw) { e.preventDefault(); drawTopic(draw); return; }
    const skip = e.target.closest('[data-skip]');
    if (skip) { e.preventDefault(); $('#main').focus(); }
  });

  $('#theme-toggle').addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    remember('gd-theme', next);
    renderThemeButton();
  });

  window.addEventListener('hashchange', route);
}

function showError(err) {
  console.error(err);
  const local = location.protocol === 'file:';
  $('#main').innerHTML = `<div class="wrap notfound" style="${paint('red')}">
    ${glyph('draft')}
    <h1>Oops.</h1>
    <p>Non è stato possibile caricare i contenuti · The content could not be loaded.</p>
    <p><code>${esc(err.message)}</code></p>
    ${local ? '<p>Apri il sito con un server locale: <code>node tools/serve.mjs</code> · Open the site through a local server: <code>node tools/serve.mjs</code></p>' : ''}
  </div>`;
}

async function boot() {
  try {
    state.data = await loadContent();
    state.idx = indexContent(state.data);
  } catch (err) {
    showError(err);
    return;
  }
  bindGlobalEvents();
  route();
}

boot();
