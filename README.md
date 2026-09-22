# Game Design — i mattoncini

**🇮🇹 [Italiano](#italiano) · 🇬🇧 [English](#english)**

Materiali aperti di un corso universitario di game design: temi, giochi da provare, libri, paper, talk e i progetti degli studenti.
Open materials from a university game design course: topics, games to try, books, papers, talks and student projects.

**→ https://safriaduo.github.io/game-design/**

---

## Italiano

Un sito unico, senza un ordine di lezioni: ogni tema del corso è una *carta* di un mazzo, con i punti chiave, gli errori tipici, i giochi da provare e le fonti per approfondire (libri, paper, talk, canali YouTube). C'è anche la vetrina dei giochi fatti dagli studenti e una pagina con i contatti del docente.

Il sito è statico, senza framework e senza build: HTML, CSS e JavaScript puri, con tutti i contenuti in file JSON. Si pubblica con GitHub Pages.

### Struttura

```
index.html              la pagina (unica) del sito
assets/css/style.css    grafica: colori, font e misure sono variabili in cima al file
assets/js/app.js        pagine, navigazione, filtri
assets/js/glyphs.js     le forme geometriche dei temi e delle famiglie
assets/img/showcase/    le foto dei giochi degli studenti
content/                ← TUTTI I CONTENUTI: si modifica quasi solo qui
  site.json             nome, email, bio, descrizione del corso, lingue
  ui.json               le scritte dell'interfaccia (menu, pulsanti…)
  topics.json           famiglie e temi
  games.json            giochi da provare
  library.json          libri, paper, talk, canali, siti
  students.json         progetti degli studenti
  career.json           pagina "Carriera": siti, community e primi passi dopo il corso
tools/check-content.mjs controlla i contenuti (traduzioni, riferimenti, foto)
tools/serve.mjs         server locale per l'anteprima
ProgrammaCorso.md       il programma dettagliato del corso
```

### Come funzionano le traduzioni

Ogni testo nei file `content/*.json` può essere:

- una stringa semplice, uguale in tutte le lingue: `"name": "Hanabi"`
- un oggetto con una voce per lingua: `"title": { "it": "Il playtest", "en": "Playtesting" }`

La traduzione sta **accanto all'originale**, quindi quando modifichi un testo vedi subito anche l'altra lingua. Se una traduzione manca, il sito mostra la lingua predefinita (`defaultLanguage` in `site.json`).

Nei testi puoi usare un po' di Markdown: `*corsivo*`, `**grassetto**`, `` `codice` ``, `[link](https://…)`.

**Aggiungere una lingua** (ad esempio lo spagnolo):

1. in `content/site.json` aggiungi `{ "code": "es", "label": "ES", "name": "Español" }` a `languages`;
2. aggiungi `"es": "…"` accanto a `"it"` ed `"en"` nei testi che vuoi tradurre, partendo da `ui.json`;
3. lancia `npm run check`: ti elenca tutti i testi ancora senza traduzione.

### Modificare i contenuti

**I tuoi dati** (nome, email, bio, università): `content/site.json`, voce `teacher`.

**Un tema**: in `content/topics.json` ogni tema ha

| campo | cosa contiene |
|---|---|
| `id` | identificativo nell'URL, minuscolo-con-trattini |
| `family` | la famiglia (il "seme"): `foundations`, `method`, `lenses`, `systems`, `experience`, `craft` |
| `glyph` | la forma disegnata sulla carta (vedi `GLYPHS` in `assets/js/glyphs.js`) |
| `title`, `lead` | titolo e introduzione (2 frasi) |
| `key` | punti chiave: 3–5, un'idea per punto, parole semplici |
| `compare` | facoltativo, "A confronto": `{ "name": …, "text": …, "pros": [ … ], "cons": [ … ] }` per mettere a confronto strumenti o approcci |
| `mistakes` | errori tipici: 2–3, brevi |
| `examples` | esempi: `{ "game": "<id da games.json>", "text": … }`, oppure `{ "title": …, "text": … }` se non è un gioco |
| `exercises` | esercizi: `{ "text": …, "list": [ … ], "bonus": … }` (`list` e `bonus` sono facoltativi) |
| `sources` | id delle fonti da `library.json`: al massimo 2 da leggere e 3 da guardare. Il sito le divide da solo in "Da leggere" (libri, articoli, siti) e "Da guardare" (video, canali) |
| `related` | id di altri temi |

Stile: niente nomi di autori nei punti chiave, e un termine tecnico solo se si usa davvero nel mestiere, spiegato la prima volta tra parentesi. Tutto il resto sta nella Biblioteca.

**Una fonte** (libro, paper, video…): aggiungila a `content/library.json` e metti il suo `id` nei `sources` dei temi. Campi utili:

- `kind`: `book`, `paper`, `video`, `channel`, `web`
- `evidence`: che tipo di conoscenza è — `research` (ricerca empirica), `theory` (teoria accademica), `heuristic` (euristica di mestiere). Si può omettere.
- `url`: il link diretto. **Se manca**, il sito crea un link di ricerca (YouTube per i video, Google Scholar per i paper, Open Library per i libri) e lo segnala con una lente. Per molti talk il link è una ricerca: quando trovi il video giusto, basta aggiungere `"url"`.

**Un sito o una community per la pagina Carriera**: in `content/career.json` aggiungi un link a uno dei gruppi (`publish`, `community`, `launch`) oppure crea un gruppo nuovo. Ogni link ha `name`, `url`, `kind` (`site` o `discord`), una `note` e dei `tags` facoltativi.

**Un documento del corso** (un GDD d'esempio, un template, un regolamento, un PDF…): mettilo in `assets/docs/` e in `library.json` indica il percorso con `"file"`, anche uno per lingua: `"file": { "it": "assets/docs/pacman-gdd-it.md", "en": "assets/docs/pacman-gdd-en.md" }`. I file Markdown (`.md`) si aprono nella vista di GitHub, con tabelle e titoli formattati; gli altri file si aprono direttamente. Aggiungi `"download": true` se vuoi che il link scarichi il file (come per il template di GDD). Il controllo verifica che i file esistano.

In `assets/docs/` trovi già il GDD d'esempio di Pac-Man e il template di GDD da compilare, in italiano e in inglese.

**Un gioco**: `content/games.json`, con `kind` = `board`, `video` o `classic`, e una `note` su cosa insegna. Per citarlo in un tema, aggiungi un esempio con `"game": "<id>"` negli `examples` del tema: la pagina Giochi mostrerà da sola in quali temi compare.

**Un progetto degli studenti**:

1. metti le foto in `assets/img/showcase/` (JPG o WebP, lato lungo ~1600 px, meno di 500 KB; vedi il README in quella cartella);
2. aggiungi una voce in `content/students.json`:

```json
{
  "id": "torre-di-carte",
  "title": "Torre di Carte",
  "authors": ["Nome Cognome", "Nome Cognome"],
  "year": "2025/26",
  "images": ["assets/img/showcase/torre-di-carte-1.jpg", "assets/img/showcase/torre-di-carte-2.jpg"],
  "description": { "it": "…", "en": "…" },
  "tags": [{ "it": "cooperativo", "en": "co-op" }],
  "link": "https://…"
}
```

La prima foto è la copertina; cliccandola si sfogliano tutte. Senza foto, il sito genera una copertina geometrica. Le tre voci con `"placeholder": true` sono esempi: cancellale quando arrivano i progetti veri.

### Anteprima in locale

Serve [Node.js](https://nodejs.org) (18 o successivo), nessuna dipendenza da installare.

```bash
npm run serve        # oppure: node tools/serve.mjs  → http://localhost:8000
npm run check        # controlla i contenuti prima di pubblicare
```

Aprire `index.html` con un doppio clic non funziona: il browser blocca la lettura dei file JSON dal disco.

Il controllo segnala JSON non validi, id duplicati, riferimenti a giochi/fonti/temi inesistenti, traduzioni mancanti e foto non trovate. Gira anche su GitHub a ogni push (scheda *Actions*).

### Pubblicazione su GitHub Pages

1. Crea su GitHub una repository pubblica chiamata **`game-design`** (il nome determina l'indirizzo).
2. Collegala e carica i file:
   ```bash
   git remote add origin https://github.com/safriaduo/game-design.git
   git push -u origin main
   ```
3. Su GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, cartella `/ (root)` → Save**.

Dopo un minuto il sito è online su `https://safriaduo.github.io/game-design/`. Ogni push su `main` lo aggiorna.

### Contribuire

Studenti ed ex studenti possono proporre correzioni, fonti o il proprio gioco: vedi [CONTRIBUTING.md](CONTRIBUTING.md).

### Licenza

- **Contenuti** (testi in `content/`, `ProgrammaCorso.md`, immagini): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — vedi [LICENSE](LICENSE). Le foto dei progetti restano degli studenti che le hanno fornite.
- **Codice** (`assets/`, `tools/`, `index.html`): [MIT](LICENSE-CODE).

---

## English

A single site with no lesson order: every topic in the course is a *card* in a deck, with key points, common mistakes, games to try and sources to go deeper (books, papers, talks, YouTube channels). There's also a showcase of games made by students and a page with the teacher's contact details.

The site is static — no framework, no build step: plain HTML, CSS and JavaScript, with all content in JSON files. It's published with GitHub Pages.

### Translations

Any text in `content/*.json` is either a plain string (same in every language) or an object with one entry per language: `{ "it": "Il playtest", "en": "Playtesting" }`. Translations sit next to the original; missing ones fall back to `defaultLanguage` from `site.json`. Texts support a little Markdown: `*italic*`, `**bold**`, `` `code` ``, `[link](https://…)`.

**Adding a language:** add it to `languages` in `content/site.json`, add the new key next to `"it"`/`"en"` wherever you translate (start with `ui.json`), then run `npm run check` to list everything still untranslated.

### Editing content

- **Teacher details:** `content/site.json` → `teacher`.
- **Topics:** `content/topics.json`. Each page is intro (`lead`), key points (`key`), common mistakes (`mistakes`), examples (`examples`, each pointing at a game in `games.json`), exercises (`exercises`, with optional `list` and `bonus`), sources (`sources`, split automatically into "Read" and "Watch") and `related` topics. Keep it plain: 3–5 key points, no author names, jargon only when it's real industry vocabulary.
- **Sources:** `content/library.json`. `kind` is `book`, `paper`, `video`, `channel` or `web`; `evidence` is `research`, `theory` or `heuristic`. Without a `url`, the site links to a search (YouTube, Google Scholar or Open Library) and marks it with a magnifier — add a `url` once you have the exact link.
- **Games:** `content/games.json` (`kind`: `board`, `video`, `classic`).
- **Student projects:** photos in `assets/img/showcase/`, entry in `content/students.json` (example above). Entries with `"placeholder": true` are samples to delete.

### Local preview and checks

Requires Node.js 18+, no dependencies:

```bash
npm run serve   # http://localhost:8000
npm run check   # validate content before publishing
```

### Publishing

Create a public GitHub repository named **`game-design`**, push `main`, then go to **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**. The site will be at `https://safriaduo.github.io/game-design/`.

### License

Content: [CC BY-SA 4.0](LICENSE). Code: [MIT](LICENSE-CODE). Student project photos remain the property of the students who provided them.
