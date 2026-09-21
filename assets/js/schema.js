/**
 * Allowed values for the content files. Shared by the site (app.js)
 * and by the validator (tools/check-content.mjs).
 */

/** Colours a family can use (or any "#rrggbb" hex). Defined in style.css as --c-<name>. */
export const PALETTE = ['red', 'blue', 'yellow', 'green', 'violet', 'ink'];

/** games.json → "kind" */
export const GAME_KINDS = ['board', 'video', 'classic'];

/** library.json → "kind" (also the order of the groups on the Library page) */
export const SOURCE_KINDS = ['book', 'paper', 'video', 'channel', 'web'];

/** library.json → "evidence": what kind of knowledge a source offers */
export const EVIDENCE = ['research', 'theory', 'heuristic'];

/**
 * When a source has no "url", the site links to a search instead.
 * library.json → "search" picks the engine; otherwise it depends on "kind".
 */
export const SEARCH_ENGINES = {
  youtube: 'https://www.youtube.com/results?search_query=',
  scholar: 'https://scholar.google.com/scholar?q=',
  book: 'https://openlibrary.org/search?q=',
  web: 'https://duckduckgo.com/?q=',
};

export const DEFAULT_ENGINE = {
  book: 'book',
  paper: 'scholar',
  video: 'youtube',
  channel: 'youtube',
  web: 'web',
};
