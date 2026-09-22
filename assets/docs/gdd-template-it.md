# [Nome del gioco] — [Nome del sistema]

> **Stato (Status)**: Bozza · In revisione · Approvato · Da rivedere
> **Autore (Author)**: [nomi]
> **Ultimo aggiornamento (Last Updated)**: AAAA-MM-GG
> **Note di revisione (Revision notes)**: [cosa è cambiato e perché]
> **Pilastri (Implements Pillar)**: [quali pilastri del gioco serve questo sistema]

> **Come usare questo template.** Scrivi un documento per ogni sistema (combattimento, economia, livelli…), come le pagine di una wiki. Tienilo corto: se una sezione non serve, scrivi «Non applicabile» e spiega perché. Le righe in *corsivo* sono istruzioni: cancellale quando compili. Gli esempi vengono dal GDD di Pac-Man del corso.

## Panoramica (Overview)

*Cosa fa questo sistema e di cosa è responsabile, in 3–5 frasi: chi legge deve capirlo in 30 secondi. Scrivi anche cosa NON fa, e quale documento se ne occupa.*

*Esempio: «Questo documento descrive il ciclo di gioco di Pac-Man: movimento nel labirinto, cibo, fantasmi, morte e fine del livello. Punteggi, tabelle dei livelli e audio hanno i loro documenti.»*

## Fantasy del giocatore (Player Fantasy)

*Cosa deve provare il giocatore grazie a questo sistema? Scrivilo dal suo punto di vista, non da quello delle regole. Chiudi con un «design test»: una frase che, se la dice un giocatore, conferma che il sistema funziona, e una che conferma che non funziona.*

*Esempio: «Sei la preda, finché non mangi la super pillola: allora il cacciatore sei tu.» Design test: «Ho aspettato che si avvicinassero prima di prenderla.»*

## Design dettagliato (Detailed Design)

### Regole principali (Core Rules)

*Regole numerate, una per punto, abbastanza precise da poterle programmare o testare senza chiederti niente. Metti i numeri veri, anche se sono provvisori.*

1. *Esempio: «Un puntino vale 10 punti; mangiandolo Pac-Man si ferma per 1 frame.»*
2.
3.

### Stati e transizioni (States and Transitions)

*In quali stati può trovarsi il sistema, o un suo oggetto (un nemico, la partita, una carta), e cosa lo fa passare da uno stato all'altro.*

| Stato | Si entra quando | Si esce verso |
|---|---|---|
| *Paura* | *Pac-Man mangia una super pillola* | *Fine timer → Inseguimento · Mangiato → Occhi* |
| | | |

### Interazioni con gli altri sistemi (Interactions with Other Systems)

*Con quali altri sistemi parla questo, e cosa si scambiano.*

| Sistema | Cosa gli diamo | Cosa ci restituisce |
|---|---|---|
| *Punteggio* | *Evento «fantasma mangiato»* | *Totale punti, vita extra* |
| | | |

## Formule (Formulas)

*Ogni calcolo del sistema: la formula, cosa significa ogni variabile, i valori possibili e un esempio con i numeri. Se non ci sono formule, scrivi «Nessuna».*

**Formula 1 — [nome].** `[formula]`

| Variabile | Significato | Valori possibili |
|---|---|---|
| | | |

*Esempio: `P(k) = 200 × 2^(k−1)`, dove k è l'n-esimo fantasma mangiato con una stessa super pillola (da 1 a 4). Il terzo fantasma vale 200 × 2² = 800.*

## Casi limite (Edge Cases)

*Le situazioni strane o rare, ognuna con il risultato esatto. Formato: «Se [condizione]: [cosa succede].» Sono le domande che farebbe un giocatore pignolo, o un programmatore.*

- *Esempio: «Se si mangia una super pillola mentre alcuni fantasmi sono già occhi: gli occhi non cambiano e tornano alla casa.»*
-

## Dipendenze (Dependencies)

*Quali sistemi servono a questo per funzionare (a monte) e quali sistemi hanno bisogno di questo (a valle). Se cambi questo documento, sono quelli da ricontrollare.*

**A monte:**

**A valle:**

*Esempio: a monte Input e tabelle dei livelli; a valle Punteggio, Audio e UI.*

## Manopole di bilanciamento (Tuning Knobs)

*I numeri che puoi cambiare per bilanciare il sistema, e cosa succede se esageri in una direzione o nell'altra.*

| Manopola | Valore attuale | Troppo basso | Troppo alto |
|---|---|---|---|
| *Durata della paura* | *6 s* | *Le super pillole non servono* | *Sparisce la tensione* |
| | | | |

## Requisiti visivi e audio (Visual/Audio Requirements)

*Cosa deve vedere e sentire il giocatore perché il sistema si capisca: colori, forme, suoni, animazioni. Solo quello che serve al gameplay, non lo stile artistico.*

- *Esempio: «Blu = fantasma mangiabile. Questo colore non si usa per nient'altro.»*
-

## UI/UX

### Wireframe

*Disegna la schermata (o il tavolo, per un gioco da tavolo) con dei rettangoli, e dai una lettera a ogni elemento. Va bene un disegno a mano fotografato, oppure uno schema a caratteri come questo:*

```
+------------------------------------+
| A punteggio              B record  |
|                                    |
|                                    |
|           C area di gioco          |
|                                    |
|                                    |
| D vite                 E pulsante  |
+------------------------------------+
```

### Elementi (Elements)

*Per ogni lettera del wireframe: cos'è, cosa mostra o cosa fa, quanto è importante (1 = massimo) e quando si vede.*

| ID | Elemento | Cosa mostra / cosa fa | Priorità | Quando si vede |
|---|---|---|---|---|
| *A* | *Punteggio* | *Punti della partita in corso* | *3* | *Sempre* |
| | | | | |

### Gerarchia delle informazioni (Information hierarchy)

*Metti in ordine le informazioni dalla più importante alla meno importante. La prima è quella che il giocatore guarda mentre gioca: deve stare al centro ed essere la più visibile. Le altre vanno verso i bordi.*

1. *Esempio: «Dove sono Pac-Man e i fantasmi, e se i fantasmi sono blu.»*
2.
3.

### Comandi (Controls)

*Ogni pulsante, tasto o gesto: cosa fa e che risposta dà. Se un'azione non dà nessun feedback, il giocatore penserà che non abbia funzionato.*

| Comando | Azione | Feedback |
|---|---|---|
| *Joystick* | *Cambia direzione* | *Pac-Man gira; suono mentre mangia* |
| | | |

## Criteri di accettazione (Acceptance Criteria)

*Come capisci che il sistema funziona? Frasi verificabili nel formato «Dato… quando… allora…», ognuna con il modo per verificarla. Mettine almeno una sull'esperienza del giocatore, non solo sulle regole.*

**AC-01** *Esempio: Dato un fantasma blu, quando Pac-Man lo tocca, il fantasma diventa occhi e il punteggio aumenta di 200. Verificato con: test manuale.*

**AC-02**

## Domande aperte (Open Questions)

*Le decisioni ancora da prendere, con le opzioni possibili e cosa le sbloccherà (un playtest, un'altra decisione…). Quando ne risolvi una, scrivi cosa hai deciso e la data.*

**OQ-1** *Esempio: «Mostriamo il numero del livello o solo i frutti? Lo decidiamo dopo un playtest con 5 giocatori nuovi.»*
