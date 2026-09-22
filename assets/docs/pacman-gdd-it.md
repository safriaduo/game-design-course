# Pac-Man — Gameplay principale (inseguimento nel labirinto)

> **Stato (Status)**: Approvato — esempio didattico
> **Autore (Author)**: Corso di Game Design · ricostruzione di *Pac-Man* (Namco, 1980; design di Toru Iwatani) a scopo di studio
> **Ultimo aggiornamento (Last Updated)**: 2026-09-22
> **Note di revisione (Revision notes)**: v1 — prima versione. Tutti i numeri si riferiscono al gioco arcade originale, livello 1, salvo dove indicato.
> **Pilastri (Implements Pillar)**: Inseguimento leggibile (principale); Percorso con rischio e ricompensa (secondario); Si gioca subito (terzo) — *pilastri ricostruiti a scopo didattico*

## Panoramica (Overview)

Questo documento descrive il ciclo di gioco momento per momento di Pac-Man: il movimento nel labirinto, il cibo, i quattro fantasmi, la morte e la fine del livello. Punteggi, tabelle dei livelli, audio e modalità dimostrativa hanno i loro documenti; questo li richiama (vedi Dipendenze).

Il giocatore guida Pac-Man nel labirinto con un joystick a 4 direzioni. L'obiettivo è mangiare tutti i 240 puntini e le 4 super pillole. Quattro fantasmi lo inseguono, e toccarne uno costa una vita. Mangiare una super pillola ribalta l'inseguimento per qualche secondo: i fantasmi diventano blu, scappano e si possono mangiare per punti sempre più alti. Quando il labirinto è vuoto parte il livello successivo, un po' più veloce e con meno tempo per cacciare.

## Fantasy del giocatore (Player Fantasy)

Sei la preda, finché non mangi una super pillola. Allora, per sei secondi, il cacciatore sei tu. La fantasy è questo ribaltamento di potere, e te lo guadagni con il percorso: lasci avvicinare i fantasmi, e solo allora ti giri. Il tema del mangiare è voluto: Iwatani lo scelse per raggiungere chi non era interessato ai giochi in cui si spara.

**Design test:** se un giocatore dice *«ho aspettato che si avvicinassero prima di prendere la super pillola»*, il loop funziona. Se dice *«sono morto e non ho capito perché»*, è saltata la leggibilità.

## Design dettagliato (Detailed Design)

### Regole principali (Core Rules)

1. **Movimento.** Pac-Man continua nella direzione attuale finché non incontra un muro. Il comando di svolta viene ricordato e applicato alla prima apertura. Può tagliare leggermente le curve («cornering») e guadagnare distanza sui fantasmi, che non possono farlo.
2. **Mangiare.** Un puntino vale 10 punti, una super pillola 50. Pac-Man si ferma per 1 frame a ogni puntino e per 3 a ogni super pillola: mangiare rallenta, quindi i puntini sono un costo oltre che una ricompensa.
3. **Fantasmi.** Quattro fantasmi, ognuno con il suo modo di inseguire (bersagli nelle Formule): Blinky (rosso) insegue direttamente; Pinky (rosa) tende un'imboscata davanti a Pac-Man; Inky (azzurro) aggira, usando la posizione di Blinky; Clyde (arancione) insegue da lontano ma si allontana quando è vicino.
4. **Dispersione e inseguimento.** I fantasmi alternano Dispersione (ognuno va verso il suo angolo) e Inseguimento a tempo: al livello 1, 7 s di dispersione, 20 s di inseguimento, 7 / 20, 5 / 20, 5, poi inseguimento per sempre. A ogni cambio tutti i fantasmi invertono la direzione: è il segnale visibile che il modo è cambiato.
5. **Paura.** Mangiare una super pillola rende blu per 6 s tutti i fantasmi non ancora mangiati: invertono la direzione, rallentano e girano a caso agli incroci, e lampeggiano di bianco poco prima di tornare normali. I fantasmi mangiati con una stessa super pillola valgono 200, 400, 800 e 1.600 punti. Un fantasma mangiato diventa un paio di occhi che torna alla casa ed esce di nuovo normale.
6. **Morte.** Toccare un fantasma non blu costa una vita. Pac-Man e i fantasmi tornano alle posizioni di partenza; i puntini già mangiati restano mangiati. Senza vite: Game Over. A 10.000 punti si guadagna una vita extra, una sola volta.
7. **Casa dei fantasmi.** Blinky parte fuori; Pinky esce subito; Inky dopo che Pac-Man ha mangiato 30 puntini; Clyde dopo 60. Se Pac-Man smette di mangiare per 4 s, il fantasma successivo esce comunque.
8. **Tunnel.** I tunnel laterali fanno uscire da un lato e rientrare dall'altro. I fantasmi lì dentro rallentano, Pac-Man no: sono una via di fuga.
9. **Frutto.** Un frutto compare sotto la casa dei fantasmi due volte per livello, dopo 70 e dopo 170 puntini, per circa 10 secondi. Il valore dipende dal livello: ciliegia 100, fragola 300, arancia 500, mela 700, melone 1.000, astronave Galaxian 2.000, campana 3.000, chiave 5.000.
10. **Fine livello.** Quando tutti i 244 tra puntini e super pillole sono mangiati, il labirinto lampeggia e parte il livello successivo. Dopo i livelli 2, 5, 9, 13 e 17 c'è un breve intermezzo comico.
11. **Velocità (livello 1).** Pac-Man si muove all'80% della velocità massima (90% mentre i fantasmi sono blu); i fantasmi al 75%, al 50% quando sono blu, al 40% nei tunnel. Quando restano 20 puntini Blinky accelera («Cruise Elroy»): 80%, poi 85% a 10 puntini.

### Stati e transizioni (States and Transitions)

**Partita**

| Stato | Si entra quando | Si esce verso |
|---|---|---|
| Dimostrazione (Attract) | Accensione, o dopo il Game Over | Moneta + Start → Pronto |
| Pronto (Ready) | Nuova partita, nuova vita o nuovo livello | Dopo qualche secondo → In gioco |
| In gioco | Finisce il Pronto | Tocca un fantasma → Morte · Ultimo puntino → Livello completato |
| Morte | Pac-Man tocca un fantasma non blu | Restano vite → Pronto · Nessuna vita → Game Over |
| Livello completato | Labirinto vuoto | Intermezzo (dopo i livelli 2, 5, 9, 13, 17) oppure Pronto |
| Game Over | Persa l'ultima vita | Dimostrazione |

**Fantasma**

| Stato | Si entra quando | Si esce verso |
|---|---|---|
| In casa | Inizio livello, o gli occhi arrivano alla casa | Regola di uscita soddisfatta → Dispersione/Inseguimento |
| Dispersione ⇄ Inseguimento | Timer dei modi | Super pillola mangiata → Paura |
| Paura | Super pillola mangiata | Fine timer → Dispersione/Inseguimento · Mangiato → Occhi |
| Occhi | Mangiato mentre è blu | Arriva alla casa → In casa |

### Interazioni con gli altri sistemi (Interactions with Other Systems)

| Sistema | Cosa gli diamo | Cosa ci restituisce |
|---|---|---|
| Input | — | Direzione del joystick (4 direzioni) |
| Punteggio | Eventi «puntino / super pillola / fantasma / frutto mangiato» | Totale punti, vita extra |
| Progressione dei livelli | Livello attuale | Velocità, durata della paura, timer dei modi, tipo di frutto |
| Audio | Stato della partita e dei fantasmi | Suono del mangiare, sirena, suono della paura, musica della morte |
| UI / HUD | Punteggio, vite, livello, stato | Quello che vede il giocatore (vedi UI/UX) |

## Formule (Formulas)

**Formula 1 — Combo dei fantasmi.** Il *k*-esimo fantasma mangiato con una stessa super pillola vale `P(k) = 200 × 2^(k−1)`, cioè 200, 400, 800, 1.600. Massimo per super pillola: 3.000.

**Formula 2 — Punteggio di un livello, senza frutti.**
`S = 10 × puntini + 50 × super pillole + Σ P(k)` → massimo `2.400 + 200 + 4 × 3.000 = 14.600`.

**Formula 3 — Bersagli dell'inseguimento.** Ogni fantasma punta a una casella bersaglio. `P` = casella di Pac-Man, `d` = la sua direzione (lunga una casella), `B` = casella di Blinky.

| Fantasma | Bersaglio in Inseguimento | Angolo in Dispersione |
|---|---|---|
| Blinky | `P` | in alto a destra |
| Pinky | `P + 4d` | in alto a sinistra |
| Inky | `2 × (P + 2d) − B` | in basso a destra |
| Clyde | `P` se è a più di 8 caselle, altrimenti il suo angolo | in basso a sinistra |

A ogni incrocio un fantasma prende l'uscita più vicina al bersaglio in linea d'aria (a parità: su, sinistra, giù, destra) e non torna mai indietro di sua iniziativa.

## Casi limite (Edge Cases)

- **Se Pac-Man è rivolto verso l'alto:** il punto «davanti» di Pinky e Inky si sposta anche a sinistra dello stesso numero di caselle (un bug del codice originale, mai corretto).
- **Se Pac-Man e un fantasma si scambiano di casella nello stesso frame:** si attraversano senza toccarsi. Succede di rado, ma succede: le collisioni si controllano per casella.
- **Se si mangia una super pillola mentre alcuni fantasmi sono occhi:** gli occhi non cambiano e continuano a tornare alla casa.
- **Se la durata della paura di un livello è 0 (livelli avanzati):** la super pillola fa comunque invertire i fantasmi, ma non diventano blu e non si possono mangiare.
- **Se il giocatore arriva al livello 256:** il contatore dei livelli va in overflow, la metà destra del labirinto si riempie di simboli senza senso e il livello non si può finire (il «kill screen»).
- **In quattro punti** (due sopra la casa dei fantasmi, due sopra la partenza di Pac-Man) i fantasmi non possono svoltare verso l'alto in Dispersione o Inseguimento: i giocatori esperti li usano come rifugi.

## Dipendenze (Dependencies)

**A monte** (sistemi di cui questo ha bisogno): Input; disegno del labirinto; tabelle della Progressione dei livelli.

**A valle** (sistemi che hanno bisogno di questo): Punteggio; Audio; UI/HUD; Flusso di gioco (dimostrazione, crediti, turni a due giocatori).

## Manopole di bilanciamento (Tuning Knobs)

| Manopola | Valore al livello 1 | Troppo basso | Troppo alto |
|---|---|---|---|
| Durata della paura | 6 s (0 nei livelli avanzati) | Le super pillole non servono | Sparisce la tensione |
| Tempi Dispersione/Inseguimento | 7/20/7/20/5/20/5 s | Pressione continua, sfiancante | Fantasmi troppo innocui |
| Velocità Pac-Man vs fantasmi | 80% vs 75% | Non si scappa: ingiusto | I fantasmi non ti prendono mai |
| Cruise Elroy | 20 e 10 puntini rimasti | Gli ultimi puntini sono troppo facili | Gli ultimi puntini sono un muro |
| Uscita dei fantasmi | 0 / 30 / 60 puntini | Tutti e quattro insieme: caos | Inizio del livello vuoto e noioso |
| Vite e vita extra | 3 vite, +1 a 10.000 | Un errore e finisce tutto | Nessuna pressione a giocare bene |

L'ultima riga la sceglie il gestore della sala giochi con i DIP switch: 1, 2, 3 o 5 vite; vita extra a 10.000, 15.000 o 20.000 punti, oppure nessuna.

## Requisiti visivi e audio (Visual/Audio Requirements)

- Ogni fantasma ha il suo colore, sempre lo stesso. **Blu = lo puoi mangiare**, **bianco lampeggiante = sta per tornare normale.** Questi colori non si usano per nient'altro.
- Ogni puntino mangiato fa un suono («waka»): il giocatore sente il ritmo del proprio percorso.
- Una sirena di sottofondo sale man mano che il labirinto si svuota; mentre i fantasmi sono blu la sostituisce un altro suono. Il giocatore capisce lo stato della partita senza staccare gli occhi da Pac-Man.

## UI/UX

### Wireframe

```
+--------------------------------------------+
| 1UP                HIGH SCORE              |  A punteggio   B record
| 2350               10000                   |
| +----------------------------------------+ |
| | O . . . . . . . . . . . . . . . . . O  | |  C labirinto (O = super pillola)
| | . +----+ . +------+ . +------+ . +--+  | |
| | . . . . . . . . . . . . . . . . . . .  | |
| |                   M                    | |  E fantasmi (M)
| |          +-------====-------+          | |  F casa dei fantasmi
| | <==      |   M    M    M    |      ==> | |  G tunnel laterali
| |          +------------------+          | |
| |                 READY!                 | |  H testo di stato
| |                 (frutto)               | |  I posto del frutto
| | . . . . . . . . . C . . . . . . . . .  | |  D Pac-Man (C)
| | O . . . . . . . . . . . . . . . . . O  | |
| +----------------------------------------+ |
| C C                        [cherry][key]   |  J vite   K frutti del livello
+--------------------------------------------+
```

### Elementi (Elements)

| ID | Elemento | Cosa mostra / cosa fa | Priorità | Quando si vede |
|---|---|---|---|---|
| D | Pac-Man | Il giocatore | 1 | Sempre |
| E | Fantasmi | Le minacce; il colore è il loro stato (normale, blu, lampeggiante, occhi) | 1 | Sempre |
| C | Labirinto e puntini | Il livello; i puntini rimasti sono la barra di avanzamento | 2 | Sempre |
| H | Testo di stato | «READY!» (giallo) prima di giocare, «GAME OVER» (rosso) alla fine, «PLAYER ONE/TWO» | 2 | Solo tra una fase e l'altra |
| A | Punteggio 1UP | Punti della partita; «1UP» lampeggia mentre gioca quel giocatore | 3 | Sempre |
| J | Vite | Un'icona di Pac-Man per ogni vita rimasta | 3 | Sempre |
| I | Frutto | Un bonus da prendere prima che sparisca | 3 | Circa 10 s, due volte per livello |
| B | Record | Il punteggio da battere | 4 | Sempre |
| K | Frutti del livello | I frutti degli ultimi livelli: quanto sei arrivato lontano | 4 | Sempre |
| F | Casa dei fantasmi | Dove partono i fantasmi e dove tornano gli occhi | 4 | Sempre |
| G | Tunnel | Via di fuga: esci a sinistra, rientri a destra | 4 | Sempre |

### Gerarchia delle informazioni (Information hierarchy)

1. **Dove sono Pac-Man e i fantasmi, e se i fantasmi sono blu.** È l'unica cosa che guardi mentre giochi, per questo tutto il resto sta ai bordi.
2. **Dove sono i puntini rimasti.** È il labirinto stesso a mostrarti quanto manca: nessuna barra serve.
3. **Punteggio e vite**, in alto e in basso, mai sopra il labirinto.
4. **Record, livello e frutti**, per il momento tra una partita e l'altra.

Durante il gioco nessun testo compare sopra il labirinto: i cambi di stato si comunicano solo con colori e suoni.

### Comandi (Controls)

| Comando | Azione | Feedback |
|---|---|---|
| Moneta | Aggiunge un credito | «CREDIT 1» sullo schermo e un suono |
| 1 PLAYER / 2 PLAYERS | Fa partire la partita | «PLAYER ONE», musica, «READY!» |
| Joystick a 4 direzioni | Cambia direzione (ricordata fino alla prima apertura) | Pac-Man gira; «waka» mentre mangia |

## Criteri di accettazione (Acceptance Criteria)

**AC-01** Dato Pac-Man su un puntino, quando lo mangia, il punteggio aumenta di 10 e lui si ferma per 1 frame. *Verificato con:* controllo fotogramma per fotogramma.

**AC-02** Data una super pillola mangiata al livello 1, tutti i fantasmi che non sono occhi diventano blu, invertono la direzione e restano blu per 6 s, lampeggiando prima di tornare normali. *Verificato con:* cronometro su una registrazione video.

**AC-03** Dati quattro fantasmi mangiati con una stessa super pillola, valgono 200, 400, 800 e 1.600 punti, in quest'ordine. *Verificato con:* test automatico.

**AC-04** Dato il timer che passa da Dispersione a Inseguimento o viceversa, tutti i fantasmi fuori dalla casa invertono la direzione nel momento del cambio. *Verificato con:* osservazione a 7 s e a 27 s dall'inizio del livello 1.

**AC-05** Dato Pac-Man che tocca un fantasma non blu, si perde una vita e le posizioni si azzerano, mentre i puntini mangiati restano mangiati. *Verificato con:* playtest.

**AC-06** Dato Pac-Man in un tunnel laterale, esce dal lato opposto, e un fantasma nello stesso tunnel si muove al 40% della velocità. *Verificato con:* osservazione.

**AC-07** Dato un giocatore che non ha mai giocato, dopo una partita sa spiegare cosa significano i fantasmi blu senza che nessuno glielo dica. *Verificato con:* playtest alla cieca con 5 giocatori.

## Domande aperte (Open Questions)

**OQ-1** Correggiamo le collisioni «attraverso» (pass-through)? Correggerle è più giusto; tenerle crea momenti rari e leggendari. *(Scelta originale: non corrette.)*

**OQ-2** Mostriamo il livello anche con un numero? Le icone dei frutti (K) hanno più fascino ma sono meno chiare. *(Scelta originale: solo frutti.)*
