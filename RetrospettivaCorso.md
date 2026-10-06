# Retrospettiva del corso e piano per la prossima edizione

Documento di lavoro per il docente. Raccoglie i feedback annotati a fine corso, riordinati per tema, e li trasforma in una proposta per l'anno prossimo. [ProgrammaCorso.md](ProgrammaCorso.md) resta il riferimento per i *contenuti*; questo documento cambia soprattutto l'*ordine* e il *modo* in cui si insegnano.

**In una riga:** meno teoria in anticipo, più cicli «gioca → smonta → rifai → testa», partendo da giochi semplicissimi e da temi molto specifici.

---

## 1. I feedback, riordinati

### 1.1 Teoria e pratica insieme

**Cosa ho notato.** La teoria spiegata in anticipo non attecchisce. Funziona spiegare solo quello che serve per l'attività immediatamente successiva, e poi farla subito.

**Cosa cambio.**
- Ogni blocco ha al massimo 20–30 minuti di teoria, seguiti da una pratica che usa *proprio* quella teoria.
- La teoria che non serve subito si sposta al momento in cui il problema compare nei prototipi degli studenti («teoria a chiamata»). Esempio: i feedback loop si spiegano quando un gruppo scopre che chi va in testa vince sempre, non prima.

### 1.2 Prima competenza: leggere un gioco (MDA + core loop)

**Cosa ho notato.** La prima cosa da imparare è giocare *capendo* le meccaniche di un gioco. La cosa che ha funzionato di più è stata **scomporre una meccanica nei pezzi che la rendono divertente**: se manca un pezzo, la meccanica non funziona più.

**Cosa cambio.**
- Si parte da MDA e core loop, e da giochi semplicissimi.
- Ogni gioco giocato in aula diventa materiale per l'esercitazione successiva: le meccaniche si giocano, si smontano e poi si «rubano».
- L'esercizio di scomposizione diventa un rito fisso: elenca i pezzi della meccanica, togline uno alla volta, guarda cosa si rompe. (Aggiunto al sito nel tema MDA, con l'esempio dell'asta di Modern Art.)

### 1.3 Seconda competenza: il playtest fatto bene

**Cosa ho notato.** È stata la cosa più difficile da far capire. Gli errori ricorrenti:
- testare «per vedere come va», senza un obiettivo;
- decidere *dopo* il test se ha funzionato (e quindi leggerci quello che si vuole);
- cambiare più cose insieme.

**Cosa cambio.**
- Regola fissa: **ogni playtest ha un obiettivo e un criterio di successo, scritti prima**. Si affronta un problema alla volta: si cambia una cosa, si ritesta, si controlla se il criterio è soddisfatto.
- **Report di playtest obbligatorio** ([template](assets/docs/playtest-report-it.md)): le sezioni «prima del test» vanno compilate prima di iniziare, altrimenti non si testa. Così il metodo non è più facoltativo.
- **Insegnare il playtest su un gioco che non è loro.** Il primo playtest si fa su un gioco esistente con una regola cambiata (per esempio Monopoli con una regola anti-runaway leader, obiettivo: «la partita resta aperta più a lungo?»). Non essendo attaccati al gioco, si concentrano sul metodo.

### 1.4 Dall'idea al prototipo, e come presentarlo

**Cosa ho notato.** Servono un metodo esplicito per trovare un'idea e una formula per presentarla.

**Trovare un'idea:** parti da una **fantasy** → ricava **pochissime meccaniche** (due o tre) che la fanno vivere → scrivi le **regole base** → **playtesta**.

**Presentare un'idea:** **Fantasy + Obiettivo + Game loop**, in tre righe.
- *Fantasy*: chi sei e cosa provi.
- *Obiettivo*: cosa devi ottenere per vincere.
- *Game loop*: cosa fai, turno dopo turno.

Se non sta in tre righe, l'idea non è ancora chiara. (Aggiunto al sito nei temi «Come trovare un'idea» e «Il pitch».)

### 1.5 Temi specifici, non generali

**Cosa ho notato.** I temi molto specifici funzionano meglio di quelli generali, perché esiste un gioco da giocare e da cui prendere le meccaniche. «Fai un gioco sullo spazio» non dà appigli; «fai un gioco di aste» ti manda dritto a Modern Art.

**Cosa cambio.** I brief del progetto diventano un catalogo di meccaniche, ognuna con il suo gioco di riferimento (vedi §4). I giochi nuovi sono stati scelti proprio per questo.

### 1.6 La progressione dei giochi

**Cosa ho notato.** Bisogna partire da giochi molto, molto semplici e salire gradualmente.

**Cosa cambio.** Una scala di complessità esplicita (vedi §3): non si passa al gradino successivo finché il gruppo non sa smontare i giochi di quello precedente.

### 1.7 Il buco: il bilanciamento

**Cosa ho notato.** Sul bilanciamento abbiamo visto poco: solo la regola del raddoppia o dimezza.

**Cosa cambio.** Un modulo con cinque metodi concreti, dal più veloce al più costoso (vedi §5). Sul sito il tema «Bilanciamento» ora li mette a confronto.

---

## 2. Sei regole per la prossima edizione

1. **Solo la teoria che serve adesso.** Poi subito pratica.
2. **Gioca → smonta → ruba.** Ogni gioco in aula alimenta l'esercitazione successiva.
3. **Dal semplicissimo al complesso.** Si sale di un gradino alla volta.
4. **Temi specifici.** Ogni brief ha un gioco di riferimento da giocare prima.
5. **Niente playtest senza obiettivo.** Obiettivo e criterio scritti prima, un problema alla volta, report sempre.
6. **Poche meccaniche.** Due o tre per la prima versione, quelle che fanno vivere la fantasy.

---

## 3. Proposta di scaletta

Blocchi in ordine; le ore si ripartiscono sulle 60 del corso partendo dai pesi del programma attuale.

| # | Blocco | Teoria (solo questa) | Si gioca | Pratica | Si consegna |
|---|---|---|---|---|---|
| 1 | Leggere un gioco | MDA, core loop | Shifting Stones, Perudo, Sasso-carta-forbice | Scomporre una meccanica e togliere un pezzo alla volta; core loop su un A4 | Scheda di analisi di un gioco |
| 2 | Il playtest | Obiettivo e criterio prima, un problema alla volta, ruoli, silenzio del designer | Monopoli (o un altro gioco noto) | Playtest di una variante con una regola cambiata | Report di playtest n. 1 |
| 3 | Dall'idea al prototipo | Fantasy → meccaniche → regole; la presentazione in tre righe | Il gioco di riferimento del proprio brief (§4) | Prototipo con 2–3 meccaniche prese dal gioco di riferimento | Idea in tre righe + report n. 2 |
| 4 | Iterare | A chiamata: decisioni interessanti, feedback loop, casualità e informazione | Patchwork, Heat, Camel Up, Cryptid, secondo i problemi dei gruppi | Cicli di playtest, un problema alla volta | Report n. 3, 4… |
| 5 | Bilanciare | I cinque metodi (§5) | Modern Art; il proprio prototipo | Raddoppia o dimezza, registro, rompere il gioco degli altri | Registro di 5 partite |
| 6 | Sistemi più grandi | Legacy, cooperativo/competitivo, mappe scoperte esplorando, narrazione emergente | Nemesis (la prima ora), Avalon, Kingdom Legacy (mostrato) | Discussione: cosa servirebbe per portare il proprio gioco su questa scala | — |
| 7 | Chiusura | Pitch | — | Prove di pitch cronometrate | Pitch + esame |

I moduli di contesto (processo di sviluppo, metriche, etica, accessibilità, industria) restano, ma in coda o distribuiti nei momenti morti dei playtest: non sono prerequisiti per fare.

---

## 4. Scala dei giochi e brief tematici

### 4.1 La scala

Durate indicative, da verificare con il gruppo.

| Gradino | Giochi | Perché a questo punto |
|---|---|---|
| 1 — Regole in un minuto | Sasso-carta-forbice, Shifting Stones, Perudo | Si vede tutto il sistema in una volta: perfetti per imparare MDA e core loop |
| 2 — Una meccanica centrale | Camel Up (scommessa), Patchwork (incastro + risorse), Codenames, Modern Art (asta) | Una meccanica forte da smontare e da rubare |
| 3 — Più sistemi che interagiscono | Heat (corsa), Cryptid (deduzione), Avalon, Monopoli (da rompere) | Le meccaniche si influenzano tra loro: nascono feedback loop e strategie |
| 4 — Sistemi lunghi | Nemesis (2–3 ore), Kingdom Legacy (campagna in solitario) | Da mostrare o giocare in parte: servono per parlare di mappe, coop/competitivo e legacy |

**Nota pratica.** Nemesis dura troppo per una lezione: meglio la prima ora, oppure una partita fuori orario. Kingdom Legacy si gioca da soli e la scatola si modifica giocando: conviene portare una copia già avviata e mostrare le carte prima e dopo.

### 4.2 I brief

Ogni brief ha un gioco di riferimento e i pezzi della meccanica che non possono mancare. I pezzi sono un punto di partenza per l'esercizio di scomposizione: vanno verificati in aula togliendoli uno alla volta.

| Brief | Gioco di riferimento | I pezzi che non possono mancare |
|---|---|---|
| Un'asta in cui il valore lo decidono i giocatori | Modern Art | Nessuno sa quanto varrà l'oggetto · i soldi sono pochi · chi vende incassa |
| Una scommessa su un esito che nessuno controlla | Camel Up | Esito incerto ma leggibile · chi scommette prima guadagna di più · sbagliare costa |
| Una corsa in cui andare veloce costa | Heat | Un costo per la velocità · limiti chiari e visibili (le curve) · ogni turno la scelta tra spingere e frenare |
| Un puzzle di incastri con risorse da bilanciare | Patchwork | Ogni pezzo ha più costi diversi · lo spazio è limitato · il tempo decide chi gioca |
| Trovare qualcosa con le informazioni divise tra i giocatori | Cryptid | Ognuno ha un pezzo d'informazione · c'è una sola soluzione · ogni domanda rivela qualcosa anche di chi la fa |
| Un gioco in cui la partita dopo ricorda quella prima | Kingdom Legacy | Cambiamenti permanenti · ogni partita ha senso anche da sola · i cambiamenti nascono dalle scelte del giocatore |
| Collaborare finché conviene | Nemesis | Una minaccia comune · obiettivi segreti che divergono · un momento in cui tradire diventa una tentazione |
| Poche regole, tanta profondità | Shifting Stones | Uno spazio condiviso · obiettivi diversi per ciascuno · ogni mossa aiuta anche qualcun altro |

**Da decidere:** un brief uguale per tutti (confronto più facile) o a scelta tra questi (più motivazione)?

---

## 5. Il modulo di bilanciamento, rifatto

**Messaggio di partenza:** bilanciare non vuol dire rendere tutto uguale, ma fare in modo che ogni opzione abbia senso in qualche situazione, e che la partita resti aperta abbastanza a lungo.

### 5.1 I cinque metodi

| Metodo | Come si fa | Quando usarlo |
|---|---|---|
| **Raddoppia o dimezza** | Il numero che non convince si cambia in modo estremo (×2 o ÷2), si gioca, poi si restringe verso il valore giusto | Sempre, come primo passo: scopre quali manopole contano davvero |
| **Valore di riferimento** | Una moneta comune per tutto il gioco («1 punto = 2 monete = 1 azione»): ogni carta, potere o mossa riceve un prezzo e deve costare quanto dà | Giochi con tante carte, poteri o acquisti |
| **Registro dei playtest** | In ogni partita si annotano sempre le stesse cose: vincitore e posto di partenza, durata, distacco tra primo e ultimo, opzioni mai scelte | Da subito, in ogni test: i problemi emergono dopo poche partite |
| **Rompere il gioco** | Una partita in cui l'unico obiettivo è vincere a ogni costo, cercando la strategia più sporca | Quando le regole sono stabili; meglio se lo fa un altro gruppo |
| **Simulazione (Monte Carlo)** | Le regole in un foglio di calcolo o in un piccolo programma, e migliaia di partite simulate | Giochi con molti dadi o carte; per chi programma |

### 5.2 Le domande da fare sempre al registro

- **Chi vince, e da che posto partiva?** Se vince quasi sempre chi gioca per primo, c'è un vantaggio di posizione.
- **C'è un'opzione che nessuno sceglie mai?** O è troppo debole, o è troppo difficile da capire: sono due problemi diversi.
- **La partita è decisa prima di finire?** Se il distacco cresce a ogni turno, c'è un feedback loop positivo (collegamento al tema dei feedback loop).
- **Quanto dura?** Se la durata cambia molto da partita a partita, qualcosa nel ritmo non è sotto controllo.

### 5.3 Sequenza in aula

1. 20 minuti di teoria: manopole, una alla volta, raddoppia o dimezza.
2. Sul proprio prototipo: scegliere la manopola che si pensa conti di più, giocarla raddoppiata e dimezzata.
3. Valore di riferimento: dare un prezzo a 6–10 elementi del proprio gioco nella stessa moneta; segnare quelli fuori scala.
4. Rompere il gioco: ogni gruppo prova per 30 minuti a rompere il gioco di un altro gruppo, e consegna la strategia trovata.
5. Compito: registro di 5 partite, con le domande del §5.2.
6. Facoltativo: dimostrazione di una simulazione Monte Carlo per chi programma.

---

## 6. Decisioni aperte

- **Report all'esame.** Oggi l'esame chiede 2 playtest documentati. Proposta: almeno 3, ognuno con un obiettivo diverso, sul template del corso.
- **Brief.** Uno per tutti o a scelta (vedi §4.2)?
- **«Cos'è un gioco».** Tenerlo come modulo a sé o ridurlo a una mezz'ora introduttiva prima di MDA?
- **Giochi da procurare.** Nemesis è costoso e lungo: vale la copia, o basta mostrarlo? Kingdom Legacy si modifica giocando: ne serve una copia dedicata al corso.
- **Moduli di contesto.** Metriche, etica, accessibilità, industria: in coda al corso o distribuiti durante i playtest?

---

## 7. Cosa è già stato aggiornato

**Sito (`content/`)**
- Giochi nuovi: Modern Art, Camel Up, Kingdom Legacy, Patchwork, Shifting Stones, Cryptid, Nemesis. Heat c'era già: la scheda ora lo presenta come gioco di riferimento per la corsa.
- Collegati ai temi: Shifting Stones → *Regole, obiettivi e feedback*; Patchwork → *Decisioni interessanti*; Kingdom Legacy → *Core loop*; Camel Up e Cryptid → *Casualità e informazione*; Modern Art → *Economia*; Nemesis → *Dinamiche sociali*.
- *Come trovare un'idea*: il metodo fantasy → poche meccaniche → regole base → playtest; nuovo errore tipico («troppe meccaniche»); esercizio di presentazione in tre righe.
- *Il pitch*: la formula Fantasy + Obiettivo + Game loop come primo punto.
- *Il playtest*: obiettivo e criterio decisi prima come primo punto; nuovo errore tipico; l'esercizio usa il report di playtest, che è anche tra le fonti.
- *MDA*: esercizio di scomposizione di una meccanica, con l'esempio dell'asta di Modern Art.
- *Bilanciamento*: raddoppia o dimezza nei punti chiave; confronto tra i cinque metodi; nuovo errore tipico; esercizio su raddoppia o dimezza e registro dei playtest.

**Documenti**
- Nuovo template: report di playtest ([IT](assets/docs/playtest-report-it.md) · [EN](assets/docs/playtest-report-en.md)), nella Biblioteca come «Report di playtest da compilare».
- [ProgrammaCorso.md](ProgrammaCorso.md): giochi nuovi nella mappa giochi → moduli (Appendice A); obiettivo, criterio e report nel modulo 2.3; i metodi pratici nel modulo 7.1.
