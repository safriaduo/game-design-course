/**
 * Geometric building blocks: topic glyphs, family suits, icons, hero art.
 *
 * Glyphs are drawn on a 120×120 grid with a few classes:
 *   .a  fill in the family colour     .sa stroke in the family colour
 *   .b  fill in ink                   .sb stroke in ink
 *   .c  fill in paper (cut-outs)      .g0 faint ink (empty cells)
 * To add a glyph, add an entry to GLYPHS and use its key in topics.json → "glyph".
 */

const glider = () => {
  const on = new Set(['2,1', '3,2', '1,3', '2,3', '3,3']);
  let cells = '';
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const key = `${col},${row}`;
      const cls = !on.has(key) ? 'g0' : key === '3,3' ? 'b' : 'a';
      cells += `<rect x="${7 + col * 22}" y="${7 + row * 22}" width="18" height="18" class="${cls}"/>`;
    }
  }
  return cells;
};

export const GLYPHS = {
  // the magic circle, with a block inside
  ring: '<circle cx="60" cy="60" r="46" class="sb" stroke-dasharray="7 8"/><rect x="41" y="41" width="38" height="38" class="a"/>',
  // a stool on three legs: rules, goals, feedback
  stool: '<rect x="14" y="24" width="92" height="16" class="b"/><rect x="20" y="44" width="16" height="60" class="a"/><rect x="52" y="44" width="16" height="60" class="a"/><rect x="84" y="44" width="16" height="60" class="a"/>',
  // a fork in the road; the road not taken is only an outline
  fork: '<path d="M60 80 L30 34 M60 80 L90 34" class="sb"/><rect x="48" y="78" width="24" height="28" class="b"/><circle cx="28" cy="28" r="15" class="a"/><circle cx="92" cy="28" r="12" class="sa"/>',
  steps: '<rect x="10" y="80" width="22" height="26" class="a" style="opacity:.35"/><rect x="36" y="62" width="22" height="44" class="a" style="opacity:.55"/><rect x="62" y="42" width="22" height="64" class="a" style="opacity:.8"/><rect x="88" y="18" width="22" height="88" class="b"/>',
  // a rough block over a dashed idea
  draft: '<rect x="14" y="14" width="68" height="68" class="sb" stroke-dasharray="8 7"/><rect x="42" y="42" width="64" height="64" class="a"/><path d="M42 42 H68 L42 68 Z" class="c"/><path d="M42 68 L68 42" class="sb" style="stroke-width:3"/>',
  eye: '<path d="M8 60 Q60 12 112 60 Q60 108 8 60 Z" class="sb"/><circle cx="60" cy="60" r="21" class="a"/><circle cx="60" cy="60" r="8" class="b"/>',
  // mechanics → dynamics → aesthetics
  chain: '<path d="M28 90 L60 60 L92 34" class="sb" style="stroke-width:3" stroke-dasharray="3 7"/><rect x="10" y="72" width="36" height="36" class="b"/><circle cx="60" cy="60" r="18" class="a" style="opacity:.6"/><path d="M92 10 L114 50 L70 50 Z" class="a"/>',
  // tension and release
  wave: '<path d="M8 106 H112" class="sb" style="stroke-width:3"/><path d="M10 92 L30 62 L40 76 L62 42 L72 58 L94 22 L104 36" class="sa" style="stroke-width:9"/><circle cx="94" cy="22" r="8" class="b"/>',
  loop: '<path d="M60 22 A40 40 0 1 1 25.4 42" class="sa" style="stroke-width:12;stroke-linecap:butt"/><path d="M36 22 L37 51 L12 38 Z" class="a"/><rect x="48" y="50" width="24" height="24" class="b"/>',
  // the runaway leader
  snowball: '<path d="M6 106 H114" class="sb" style="stroke-width:3"/><circle cx="18" cy="97" r="7" class="a" style="opacity:.4"/><circle cx="42" cy="88" r="16" class="a" style="opacity:.7"/><circle cx="82" cy="70" r="34" class="a"/>',
  // a die with two pips you cannot see
  die: '<rect x="16" y="16" width="88" height="88" rx="16" class="sb"/><circle cx="38" cy="38" r="9" class="a"/><circle cx="60" cy="60" r="9" class="a"/><circle cx="38" cy="82" r="9" class="a"/><circle cx="82" cy="38" r="8" class="sb" style="stroke-width:3" stroke-dasharray="3 4"/><circle cx="82" cy="82" r="8" class="sb" style="stroke-width:3" stroke-dasharray="3 4"/>',
  players: '<path d="M60 48 L80 80 L40 80 Z" class="sb" style="stroke-width:4"/><circle cx="60" cy="24" r="14" class="a"/><circle cx="22" cy="94" r="14" class="b"/><circle cx="98" cy="94" r="14" class="a" style="opacity:.55"/>',
  portal: '<path d="M22 108 V58 A38 38 0 0 1 98 58 V108 Z" class="a"/><path d="M44 108 V66 A16 16 0 0 1 76 66 V108 Z" class="b"/><circle cx="106" cy="16" r="7" class="sb" style="stroke-width:4"/>',
  seesaw: '<path d="M60 74 L80 106 L40 106 Z" class="b"/><g transform="rotate(-9 60 70)"><rect x="8" y="66" width="104" height="8" class="b"/><rect x="14" y="36" width="30" height="30" class="a"/><circle cx="92" cy="53" r="13" class="a" style="opacity:.6"/></g>',
  // Conway's glider: rules that move on their own
  glider: glider(),
  chart: '<path d="M12 10 V108 H112" class="sb" style="stroke-width:4"/><rect x="24" y="66" width="16" height="40" class="a"/><rect x="48" y="44" width="16" height="62" class="a"/><rect x="72" y="82" width="16" height="24" class="b"/><rect x="96" y="24" width="16" height="82" class="a"/>',
  // one thing at a time, from the inside out
  nest: '<rect x="10" y="10" width="100" height="100" class="sb" style="stroke-width:4"/><rect x="28" y="28" width="64" height="64" class="sa" style="stroke-width:5;opacity:.55"/><rect x="45" y="45" width="30" height="30" class="a"/>',
  contrast: '<circle cx="60" cy="60" r="46" class="sb"/><path d="M60 14 A46 46 0 0 1 60 106 Z" class="b"/><circle cx="60" cy="60" r="17" class="a"/>',
  // a coin on a line: the bait
  bait: '<path d="M60 4 V28" class="sb" style="stroke-width:3"/><circle cx="60" cy="68" r="40" class="a"/><circle cx="60" cy="68" r="30" class="sb" style="stroke-width:2;opacity:.3"/><rect x="48" y="56" width="24" height="24" class="c"/>',
  tower: '<rect x="16" y="82" width="88" height="24" class="b"/><rect x="32" y="56" width="56" height="24" class="a"/><path d="M60 10 L86 54 L34 54 Z" class="a" style="opacity:.6"/>',
  // an idea: a bulb with a remixed block inside
  spark: '<path d="M60 4 V13 M21 19 L28 26 M99 19 L92 26 M8 52 H17 M103 52 H112" class="sb" style="stroke-width:4"/><circle cx="60" cy="52" r="29" class="a"/><rect x="49" y="41" width="22" height="22" class="c" transform="rotate(45 60 52)"/><rect x="46" y="85" width="28" height="10" rx="2" class="b"/><rect x="51" y="99" width="18" height="9" rx="2" class="b"/>',
  // four areas of the mind: two in flow, two at rest
  zones: '<path d="M56 56 H14 A42 42 0 0 1 56 14 Z" class="a"/><path d="M64 56 V14 A42 42 0 0 1 106 56 Z" class="g0"/><path d="M64 64 H106 A42 42 0 0 1 64 106 Z" class="b"/><path d="M56 64 V106 A42 42 0 0 1 14 64 Z" class="g0"/>',
  // a level: start, a telegraphed hazard, the goal
  map: '<path d="M25 80 V56 H62 V27 H80" class="sb" stroke-dasharray="7 7"/><rect x="10" y="80" width="30" height="30" class="b"/><path d="M76 66 L90 90 H62 Z" class="a" style="opacity:.55"/><rect x="80" y="12" width="30" height="30" class="a"/>',
  // a speech bubble: the pitch
  bubble: '<path d="M12 16 H108 V80 H52 L30 104 V80 H12 Z" class="a"/><rect x="26" y="32" width="68" height="9" class="c"/><rect x="26" y="52" width="44" height="9" class="c"/><circle cx="96" cy="100" r="9" class="b"/>',
  // a tank with a tap and a drain: taps and sinks
  tank: '<path d="M18 12 H54 V28" class="sb" style="stroke-width:7"/><circle cx="54" cy="40" r="5" class="a"/><path d="M22 48 V100 H98 V48" class="sb"/><rect x="25" y="68" width="70" height="30" class="a"/><path d="M60 100 V114" class="sb" style="stroke-width:7"/>',
  square: '<rect x="24" y="24" width="72" height="72" class="a"/>',
};

const SVG_HIDDEN = 'aria-hidden="true" focusable="false"';

export function glyph(name) {
  return `<svg class="glyph" viewBox="0 0 120 120" ${SVG_HIDDEN}>${GLYPHS[name] || GLYPHS.square}</svg>`;
}

/* ---------- suits: one shape per family ---------- */

export const SHAPES = {
  square: '<rect x="3" y="3" width="14" height="14"/>',
  triangle: '<path d="M10 2 L18.5 17 H1.5 Z"/>',
  circle: '<circle cx="10" cy="10" r="7.5"/>',
  rhombus: '<path d="M10 1.5 L18.5 10 L10 18.5 L1.5 10 Z"/>',
  arch: '<path d="M2 17.5 V10 A8 8 0 0 1 18 10 V17.5 Z"/>',
  plus: '<path d="M7 2 H13 V7 H18 V13 H13 V18 H7 V13 H2 V7 H7 Z"/>',
};

export function suit(shape) {
  return `<svg class="suit" viewBox="0 0 20 20" ${SVG_HIDDEN}>${SHAPES[shape] || SHAPES.square}</svg>`;
}

/* ---------- kind icons (games and sources) ---------- */

const GAME_ICONS = {
  board: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.6" class="f"/><circle cx="12" cy="12" r="1.6" class="f"/><circle cx="15.5" cy="15.5" r="1.6" class="f"/>',
  video: '<rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5 V14.5 M5 12.5 H9"/><circle cx="16" cy="11.3" r="1.2" class="f"/><circle cx="18.2" cy="13.8" r="1.2" class="f"/>',
  classic: '<circle cx="12" cy="6.5" r="3"/><path d="M9.5 11 H14.5 L16 19 H8 Z"/><path d="M6 21 H18"/>',
};

const SOURCE_ICONS = {
  book: '<path d="M4 4.5 A1.5 1.5 0 0 1 5.5 3 H19 V18 H5.5 A1.5 1.5 0 0 0 4 19.5 Z"/><path d="M4 19.5 A1.5 1.5 0 0 0 5.5 21 H19 V18"/>',
  paper: '<path d="M6 2.5 H14 L19 7.5 V21.5 H6 Z"/><path d="M14 2.5 V7.5 H19"/><path d="M9 12 H16 M9 15.5 H16 M9 19 H13"/>',
  video: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M10 9 L15 12 L10 15 Z" class="f"/>',
  channel: '<rect x="2.5" y="7" width="19" height="13" rx="3"/><path d="M5 3.8 H19"/><path d="M10 11 L15 13.5 L10 16 Z" class="f"/>',
  web: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12 H21.5"/><path d="M12 2.5 C8.5 6 8.5 18 12 21.5 C15.5 18 15.5 6 12 2.5 Z"/>',
};

export function gameIcon(kind) {
  return `<svg class="kind-icon" viewBox="0 0 24 24" ${SVG_HIDDEN}>${GAME_ICONS[kind] || GAME_ICONS.board}</svg>`;
}

export function sourceIcon(kind) {
  return `<svg class="kind-icon" viewBox="0 0 24 24" ${SVG_HIDDEN}>${SOURCE_ICONS[kind] || SOURCE_ICONS.web}</svg>`;
}

/* ---------- interface icons ---------- */

const ICONS = {
  shuffle: '<path d="M3 7 H7 C11 7 13 17 17 17 H21"/><path d="M3 17 H7 C8.8 17 10 15 11 13"/><path d="M13 11 C14 9 15.2 7 17 7 H21"/><path d="M18 4 L21 7 L18 10"/><path d="M18 14 L21 17 L18 20"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 L21 21"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6 L12 13 L20.5 6"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2 V4 M12 20 V22 M2 12 H4 M20 12 H22 M4.9 4.9 L6.3 6.3 M17.7 17.7 L19.1 19.1 M4.9 19.1 L6.3 17.7 M17.7 6.3 L19.1 4.9"/>',
  moon: '<path d="M20 14.5 A8.5 8.5 0 1 1 9.5 4 A7 7 0 0 0 20 14.5 Z"/>',
  close: '<path d="M6 6 L18 18 M18 6 L6 18"/>',
  prev: '<path d="M15 5 L8 12 L15 19"/>',
  next: '<path d="M9 5 L16 12 L9 19"/>',
  arrow: '<path d="M4 12 H20 M14 6 L20 12 L14 18"/>',
  back: '<path d="M20 12 H4 M10 6 L4 12 L10 18"/>',
  external: '<path d="M14 4 H20 V10 M20 4 L11 13 M18 14 V20 H4 V6 H10"/>',
  pencil: '<path d="M4 20 L5 15 L16 4 L20 8 L9 19 Z"/><path d="M14 6 L18 10"/>',
  book: '<path d="M4 5 A2 2 0 0 1 6 3 H20 V17 H6 A2 2 0 0 0 4 19 Z"/><path d="M4 19 A2 2 0 0 0 6 21 H20 V17"/>',
  play: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M10 9 L15 12 L10 15 Z"/>',
  github:'<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
};

export function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" ${SVG_HIDDEN}>${ICONS[name] || ''}</svg>`;
}

/* ---------- hero: blocks balancing inside a magic circle ---------- */

export function heroArt() {
  return `<svg class="hero-svg" viewBox="0 0 480 460" ${SVG_HIDDEN}>
    <circle cx="240" cy="236" r="214" class="hero-ring"/>
    <g class="piece" style="--d:0"><rect x="40" y="390" width="400" height="24" rx="3" class="p-ink"/></g>
    <g class="piece" style="--d:1"><path d="M60 390 A80 80 0 0 1 220 390 Z" class="p-blue"/></g>
    <g class="piece" style="--d:2"><rect x="252" y="230" width="158" height="158" class="p-red"/></g>
    <g class="piece" style="--d:3"><path d="M140 308 L186 262 L140 216 L94 262 Z" class="p-violet"/></g>
    <g class="piece" style="--d:4"><circle cx="331" cy="178" r="50" class="p-yellow"/></g>
    <g class="piece" style="--d:5"><circle cx="70" cy="112" r="7" class="p-ink"/><circle cx="96" cy="112" r="7" class="p-ink"/><circle cx="122" cy="112" r="7" class="p-ink"/></g>
    <g class="bob"><g class="piece" style="--d:6"><path d="M214 58 L268 150 L160 150 Z" class="p-green" transform="rotate(14 214 115)"/></g></g>
  </svg>`;
}

/* ---------- generated covers for projects without photos ---------- */

export function cover(seed = 'game') {
  let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  let a = h >>> 0;
  const rnd = () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const colours = ['red', 'blue', 'yellow', 'green', 'violet', 'ink'];
  let out = '<rect width="400" height="300" class="cv-bg"/>';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const x = col * 100, y = row * 100;
      const cls = `cv-${colours[Math.floor(rnd() * colours.length)]}`;
      const turn = `rotate(${Math.floor(rnd() * 4) * 90} ${x + 50} ${y + 50})`;
      switch (Math.floor(rnd() * 6)) {
        case 0: out += `<rect x="${x}" y="${y}" width="100" height="100" class="${cls}"/>`; break;
        case 1: out += `<circle cx="${x + 50}" cy="${y + 50}" r="42" class="${cls}"/>`; break;
        case 2: out += `<path d="M${x} ${y} H${x + 100} A100 100 0 0 1 ${x} ${y + 100} Z" class="${cls}" transform="${turn}"/>`; break;
        case 3: out += `<path d="M${x} ${y} L${x + 100} ${y + 100} H${x} Z" class="${cls}" transform="${turn}"/>`; break;
        case 4: out += `<path d="M${x} ${y + 100} A50 50 0 0 1 ${x + 100} ${y + 100} Z" class="${cls}" transform="${turn}"/>`; break;
        default: break;
      }
    }
  }
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" ${SVG_HIDDEN}>${out}</svg>`;
}
