# Contribuire · Contributing

**🇮🇹** Grazie se vuoi migliorare questi materiali! Ci sono tre modi, dal più semplice al più tecnico.

1. **Scrivi al docente** — l'email è nella pagina *Info* del sito. Va benissimo per segnalare un errore o proporre un libro, un video, un gioco.
2. **Apri una issue** su GitHub (scheda *Issues → New issue*): descrivi cosa cambieresti e perché.
3. **Apri una pull request** modificando direttamente i file in `content/`. Si può fare anche dal browser: apri il file su GitHub, clicca sulla matita, modifica, e scegli *Propose changes*.

### Aggiungere il tuo gioco allo showcase

- Foto: 2–4 immagini orizzontali (4:3 è l'ideale), JPG o WebP, lato lungo ~1600 px, meno di 500 KB ciascuna. Si vede il gioco *in uso*: carte sul tavolo, mani, segnalini. Chiedi il permesso a chi compare nelle foto.
- Nomi dei file: `titolo-del-gioco-1.jpg`, `titolo-del-gioco-2.jpg`… in `assets/img/showcase/`.
- Una voce in `content/students.json` (c'è un esempio completo nel README), con descrizione in italiano e, se puoi, in inglese.
- Pubblicando le foto accetti che siano mostrate sul sito; restano tue.

### Prima di aprire una pull request

```bash
npm run check
```

Il controllo gira comunque in automatico su ogni pull request: se qualcosa non va, GitHub te lo segnala con la riga esatta da correggere.

Qualche regola per le fonti: preferisci link stabili (DOI, pagine ufficiali, archivio GDC), indica autore e anno, e scegli onestamente l'etichetta `evidence` — un talk di un designer è un'euristica di mestiere anche quando è bellissimo.

---

**🇬🇧** Thanks for helping improve these materials! Three ways, from simplest to most technical:

1. **Email the teacher** (address on the site's *About* page) to report a mistake or suggest a book, video or game.
2. **Open an issue** on GitHub describing what you'd change and why.
3. **Open a pull request** editing the files in `content/` — you can do it in the browser with the pencil icon.

**Adding your game to the showcase:** 2–4 landscape photos (4:3 ideally), JPG or WebP, ~1600 px on the long side, under 500 KB each, showing the game being played; ask permission from anyone who appears in them. Put them in `assets/img/showcase/` and add an entry to `content/students.json` (full example in the README). The photos remain yours.

Run `npm run check` before opening a pull request (it also runs automatically on GitHub). For sources, prefer stable links, include author and year, and pick the `evidence` label honestly.
