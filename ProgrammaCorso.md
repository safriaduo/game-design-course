# Programma corso di Game Design — 60 ore

Documento di lavoro per il docente. I moduli sono ordinati per dipendenza logica e difficoltà crescente, non per giornate: ogni modulo indica un peso orario indicativo (frontale + pratica) così da poterli impacchettare liberamente in giornate da 8 ore.

**Totale: 60 ore.** Frontale ≈ 27 h, pratica ≈ 33 h.

**Legenda blocchi:**
- *Obiettivo* — cosa deve saper fare lo studente alla fine del modulo
- *Cosa trattare* — contenuto della lezione
- *Punti chiave* — le cose che, se passano solo quelle, il modulo ha funzionato
- *Errori tipici* — cosa sbagliano regolarmente gli studenti su questo tema
- *Pratica* — gioco o esercizio associato
- *Fonti* — con distinzione esplicita tra ricerca e euristica di designer

---

## LIVELLO 0 — Inquadramento

### Modulo 0.1 — Il corso e il mestiere (1 h frontale)

**Obiettivo:** capire cosa si sta per studiare e con quale metro verranno valutati.

**Cosa trattare:**
- Introduzione di chi sono e cosa ho fatto
- Presentazioni loro di chi sono, che cosa giocano
- Chi è il game designer e cosa fa concretamente in una giornata di lavoro
- I ruoli reali dell'industria: systems designer, content designer, level designer, narrative designer, technical designer, e dove finisce il designer e inizia il producer
- Cosa NON è il game designer: non è "quello che ha le idee", non è il creative director, non è necessariamente chi programma
- Struttura del corso e struttura dell'esame finale

**Punti chiave:**
- Il design è un mestiere di decisioni tracciabili, non di ispirazione. Ogni scelta deve essere difendibile con un "perché".
- Le idee valgono poco; l'esecuzione e l'iterazione valgono tutto. Dillo subito perché ti servirà come argomento per tutto il corso.
- Anticipa l'esame il primo giorno: se sanno che dovranno consegnare un prototipo giocabile + documentazione, ogni modulo successivo viene letto con occhi diversi.

**Esame:** gioco da tavolo fisico giocabile in 10 minuti + one-pager + report di 2 playtest documentati + pitch di 5 minuti. Valuta il processo (report di playtest e iterazioni) almeno quanto il risultato: è l'unico modo per premiare il metodo invece del talento grezzo.

---

## LIVELLO 1 — Fondamenti: cos'è un gioco e di cosa è fatto

### Modulo 1.1 — Cos'è un gioco (1,5 h frontale + 1,5 h pratica)

**Obiettivo:** avere una definizione operativa di gioco e saper riconoscere i tipi di sfida.

**Cosa trattare:**
- "Giocare è il tentativo volontario di superare ostacoli non necessari."
- Obiettivo prelusorio — lo stato di cose descrivibile senza nominare il gioco. "Far entrare una palla in una buca."
- Mezzi lusori — solo alcuni mezzi sono ammessi per raggiungerlo.
- Regole costitutive — le regole proibiscono i mezzi più efficienti a favore di quelli meno efficienti. Potresti prendere la palla e metterla nella buca con la mano: sarebbe più efficiente, e il regolamento te lo vieta.
- Atteggiamento lusorio — accetti quelle regole proprio perché rendono possibile l'attività. Non le subisci: le vuoi.
- Definizioni a confronto: Suits (attività volontaria con ostacoli non necessari), Salen & Zimmerman (sistema con conflitto artificiale, regole, esito quantificabile), Caillois (agôn, alea, mimicry, ilinx), Huizinga (magic circle)
- Perché nessuna definizione funziona del tutto: casi limite come i walking simulator, gli idle game, i sandbox senza obiettivi
- Tassonomia delle sfide: strategia, destrezza, conoscenza, deduzione, sociale, risorse, riflessi (e molti altri!)
- Gioco vs giocattolo 

**Punti chiave:**
- La definizione non serve a vincere dibattiti, serve a decidere: se non sai che tipo di sfida stai progettando, non sai cosa bilanciare.
- La destrezza fisica è design tanto quanto le regole. Serve a rompere il pregiudizio degli studenti che "design = regole scritte".
- Il magic circle è un concetto utile ma criticato: gli studenti tendono a usarlo come scusa per ignorare il contesto reale del giocatore (soldi, tempo, socialità).

**Errori tipici:** confondere "gioco" con "videogioco"; pensare che i giochi astratti siano più semplici da progettare.

**Pratica:** **Viking See-Saw**. Serve a dimostrare in dieci minuti che esiste design nell'equilibrio fisico degli oggetti. Poi esercizio in aula: classificare 10 giochi noti secondo Caillois e secondo il tipo di sfida, e discutere i casi in cui non si riesce.

**Fonti:** Salen & Zimmerman, *Rules of Play* (2003); Caillois, *Les jeux et les hommes* (1958); Suits, *The Grasshopper* (1978). Tutte teoria formale citabile, non ricerca empirica.

---

### Modulo 1.2 — Regole, obiettivi e feedback (1,5 h frontale + 1 h pratica)

**Obiettivo:** saper scomporre qualsiasi gioco nella sua struttura minima.

**Cosa trattare:**
- Le tre gambe: regole (cosa puoi fare), obiettivi (cosa devi ottenere), feedback (come sai come stai andando)
- Regole costitutive / operative / implicite (il "gentlemen's agreement" nei giochi da tavolo, il galateo online)
- Stati di vittoria, sconfitta, e condizioni di fine partita (che non coincidono)
- Feedback immediato vs differito; feedback diegetico vs non diegetico
- Leggibilità: se il giocatore non capisce lo stato del sistema, tutto il resto è inutile

**Punti chiave:**
- Un gioco senza feedback non è difficile, è ingiocabile. Fai provare un gioco privato del feedback (es. giocare a tris senza vedere la griglia) per farlo sentire sulla pelle.
- Obiettivo e condizione di fine sono cose separate: molti giochi finiscono per esaurimento risorse, non per raggiungimento obiettivo.
- Le regole implicite sono spesso ciò che tiene in piedi il gioco. Quando digitalizzi un boardgame le perdi tutte, ed è lì che i giochi si rompono.

**Errori tipici:** scrivere regolamenti ambigui; dare per scontato che il giocatore sappia cosa fare.

**Pratica:** scomposizione scritta di un gioco noto nelle tre gambe, poi riscrittura del regolamento di un gioco semplice in modo che sia eseguibile da chi non l'ha mai visto. Esercizio brutale e formativo.

---

### Modulo 1.3 — Decisioni interessanti e agency (1,5 h frontale + 1,5 h pratica)

**Obiettivo:** saper distinguere una scelta reale da una finta, e capire cosa rende una scelta interessante.

**Cosa trattare:**
- Cos'è una decisione interessante: incertezza sull'esito, conseguenze percepibili, trade-off reale, informazione sufficiente per ragionare ma non per calcolare
- Le non-decisioni: scelte ovvie (una opzione domina), scelte cieche (nessuna informazione per decidere), scelte irrilevanti (l'esito non cambia)
- Agency: la differenza tra avere opzioni e sentire che le proprie scelte contano. Agency percepita vs agency reale
- Decisioni tattiche vs strategiche; orizzonte decisionale
- Il costo cognitivo: più opzioni non significa più agency, oltre una soglia significa paralisi

**Punti chiave:**
- La formula pratica da lasciare loro: una scelta è interessante se, dopo averla fatta, il giocatore riesce a immaginare come sarebbe andata l'altra strada.
- Il caso limite di RPS: tre opzioni, zero informazione, eppure il gioco funziona — perché l'informazione è l'avversario, non il sistema. Questo apre già il tema della lettura del giocatore.
- Illusione di scelta: molti giochi narrativi convergono comunque. Funziona finché il giocatore non se ne accorge, e quando se ne accorge il danno alla fiducia è permanente.

**Errori tipici:** progettare alberi di scelte dove un ramo è palesemente migliore; confondere "tante opzioni" con "buon design"; dare scelte prima che il giocatore abbia l'informazione per capirle.

**Pratica:** **Rock Paper Scissors**. Prima si gioca, poi si analizza perché non è banale come sembra. Poi esercizio a squadre: modificare RPS per introdurre decisioni interessanti (risorse limitate, punteggio asimmetrico, informazione parziale, RPS a 5/7 elementi) e testare le varianti in aula. È l'esercizio che apre il corso perché dimostra che con tre regole si può già fare design vero.

**Fonti:** "una serie di decisioni interessanti" è un aforisma di Sid Meier, non un risultato di ricerca — presentalo come tale, è utile ma non dimostrato. Per una trattazione rigorosa: Elias, Garfield, Gutschera, *Characteristics of Games* (2012).

---

## LIVELLO 2 — Metodo: come si lavora davvero

### Modulo 2.1 — Il processo di sviluppo (2 h frontale + 0,5 h pratica)

**Obiettivo:** conoscere il ciclo di vita reale di un progetto, in digitale e su cartone, e sapere in quale fase serve cosa.

**Cosa trattare — videogioco:**
- Fasi: concept → pre-produzione → vertical slice → produzione → alpha → beta → gold/launch → live ops
- Cosa deve dimostrare una vertical slice e perché è il momento di verità del progetto
- Milestone e gate decisionali: quando si decide di continuare o uccidere un progetto
- I documenti nelle varie fasi: one-pager, pitch deck, GDD (e perché il GDD monolitico è morto — oggi si lavora a wiki vive e spec per feature)
- Ruoli e dipendenze: perché il designer non lavora mai da solo e cosa significa "bloccare" un artista o un programmatore
- Validazione prima dello sviluppo: capsule, wishlist, demo, smoke test — approccio che vale la pena raccontare con dati reali
- Scope: come si taglia, e perché il taglio è la competenza più preziosa

**Cosa trattare — boardgame:**
- Fasi: concept → prototipo grezzo → blind playtest → sviluppo → pitch a publisher o autoproduzione → sviluppo editoriale → produzione fisica
- Le differenze sostanziali dal digitale: costo di iterazione bassissimo all'inizio, costo di errore altissimo alla fine (una tiratura non si patcha)
- Il blind playtest: perché nel cartaceo è un obbligo e nel digitale è un lusso
- Component cost e vincoli produttivi: il numero di carte, i colori, la dimensione della scatola sono vincoli di design, non di logistica
- Pitch a publisher: sell sheet, regolamento, prototipo spedibile

**Punti chiave:**
- Il confronto tra i due processi è il vero contenuto del modulo: nel digitale puoi patchare e quindi tendi a rimandare le decisioni; nel cartaceo non puoi, e quindi il design si chiude prima e meglio. Il boardgame insegna disciplina al designer digitale.
- L'iterazione costa poco all'inizio e tantissimo alla fine — vale in entrambi i mondi, ed è il motivo per cui si prototipa su carta anche per fare un videogioco.
- Nessun progetto sopravvive al primo contatto con i giocatori. Il processo esiste per scoprirlo presto.

**Errori tipici:** scrivere un GDD di 80 pagine prima di aver testato niente; progettare come se le risorse fossero infinite; pensare che "poi lo bilanciamo".

**Pratica:** breve esercizio di scoping — prendere un'idea ambiziosa proposta da loro e ridurla a qualcosa realizzabile in 3 mesi da 2 persone, motivando ogni taglio.

---

### Modulo 2.2 — Prototipazione e iterazione (1 h frontale + 3 h pratica)

**Obiettivo:** saper costruire un prototipo che risponde a una domanda precisa, in poche ore.

**Cosa trattare:**
- Cosa dimostra un prototipo: ogni prototipo risponde a UNA domanda. "È divertente?" non è una domanda valida.
- Tipi: paper prototype, prototipo di meccanica isolata, prototipo di feel, prototipo grafico (e perché non vanno mescolati)
- Fedeltà: perché il prototipo brutto è un vantaggio — i playtester criticano quello che vedono, e se vedono grafica criticano la grafica
- Il ciclo: ipotesi → prototipo → test → lettura dei risultati → decisione (iterare, pivotare, uccidere)
- Kill your darlings: come si decide di buttare via qualcosa, e perché è più difficile di quanto sembri

**Punti chiave:**
- La domanda prima del prototipo. Se lo studente non sa scrivere in una riga cosa vuole scoprire, non è pronto a costruire.
- La fedeltà bassa non è pigrizia, è una scelta metodologica per proteggere il test.
- L'iterazione senza misura è solo rifacimento. Serve un criterio deciso prima del test per sapere se il cambiamento ha funzionato.

**Errori tipici:** innamorarsi del primo prototipo; rifinire prima di validare; cambiare cinque cose insieme e non sapere quale ha funzionato.

**Pratica:** sprint di prototipazione a coppie, 90 minuti, tema vincolato (es. "un gioco a due giocatori con un mazzo di carte francesi e 20 segnalini, che dura 5 minuti"). Al termine ogni coppia deve dichiarare la domanda a cui il prototipo risponde. Questo pomeriggio è il fondamento pratico di tutto il corso: se salta, gli studenti arrivano in fondo senza mani.

---

### Modulo 2.3 — Il playtest (1,5 h frontale + 2,5 h pratica)

**Obiettivo:** saper condurre un playtest che produce informazione utilizzabile.

**Cosa trattare:**
- Tipi di test e a cosa servono: interno, blind, focus test, test di usabilità, test di bilanciamento
- Preparazione: definire la domanda, scegliere i tester giusti, preparare la sessione, decidere cosa osservare
- Durante: non spiegare, non difendersi, non suggerire. Il silenzio del designer è una competenza.
- Think-aloud protocol: far parlare il giocatore mentre gioca
- Osservare vs ascoltare: cosa fa il giocatore conta più di cosa dice. I giocatori sono ottimi a segnalare problemi e pessimi a proporre soluzioni.
- Dopo: debrief, questionario, e soprattutto interpretazione — separare il sintomo dalla causa
- Il bias del designer: sai troppo, vuoi troppo, e sentirai quello che vuoi sentire

**Punti chiave:**
- "Quando un giocatore ti dice che qualcosa non va, ha quasi sempre ragione. Quando ti dice come aggiustarlo, ha quasi sempre torto." È un'euristica di mestiere, non un risultato di ricerca, ma è l'insegnamento più utile del modulo.
- Un playtest senza ipotesi è intrattenimento.
- Il numero di tester necessario per trovare i problemi grossi è basso; per bilanciare è altissimo. Distinzione importante e che tornerà nel modulo su metriche.

**Errori tipici:** spiegare le regole a voce invece di far leggere il regolamento (e non accorgersi mai che il regolamento è illeggibile); intervenire quando il giocatore si blocca; chiedere "ti è piaciuto?".

**Pratica:** playtest incrociato dei prototipi del modulo 2.2, con griglia di osservazione strutturata, ruoli separati (chi gioca, chi osserva, chi prende appunti) e un'iterazione documentata subito dopo. Ogni gruppo consegna: cosa hanno osservato, cosa hanno concluso, cosa hanno cambiato e perché.

---

## LIVELLO 3 — Linguaggio analitico: come si legge un gioco

### Modulo 3.1 — MDA framework (1,5 h frontale + 2,5 h pratica)

**Obiettivo:** saper analizzare qualsiasi gioco separando meccaniche, dinamiche ed estetiche.

**Cosa trattare:**
- Meccaniche (le regole), dinamiche (i comportamenti che emergono in partita), estetiche (le risposte emotive)
- La doppia lettura: il designer progetta da M verso A, il giocatore esperisce da A verso M. È il cuore del framework.
- Le 8 estetiche di LeBlanc: sensation, fantasy, narrative, challenge, fellowship, discovery, expression, submission
- Limiti del framework: è descrittivo, non generativo; non ti dice come progettare, ti dà un vocabolario per parlarne

**Punti chiave:**
- Il framework serve a capire che non si progetta il divertimento direttamente: si progettano regole e si spera nelle dinamiche giuste. Questo è il motivo per cui si playtesta.
- Poche meccaniche possono generare dinamiche profondissime — ed è quasi sempre meglio di tante meccaniche che generano poco.
- Usalo come lingua comune del corso: da qui in poi, quando discutete un gioco, si discute su tre livelli.

**Errori tipici:** confondere dinamiche con meccaniche; elencare le estetiche senza collegarle a una meccanica precisa.

**Pratica:** **Perudo** e **Codenames**, giocati e poi analizzati per iscritto con MDA. Perudo è il caso perfetto: tre regole e un bicchiere producono bluff, lettura degli avversari, gestione del rischio e metagioco. Codenames mostra estetiche completamente diverse (fellowship, discovery) con complessità ancora inferiore. Il confronto tra le due analisi in aula è il momento didattico.

**Fonti:** Hunicke, LeBlanc, Zubek, *MDA: A Formal Approach to Game Design and Game Research*, AAAI Workshop on Challenges in Game AI, 2004 — paper accademico vero, citabile. Le 8 estetiche sono una tassonomia proposta da LeBlanc senza validazione empirica: presentale come strumento utile, non come classificazione dimostrata.

---

### Modulo 3.2 — Flow e cos'è il divertimento (1,5 h frontale + 1 h pratica)

**Obiettivo:** avere modelli per ragionare sul divertimento, sapendo quanto valgono.

**Cosa trattare:**
- Flow: bilanciamento tra sfida percepita e abilità percepita, obiettivi chiari, feedback immediato, perdita dell'autocoscienza
- Il canale di flow e le curve di difficoltà: perché una curva lineare non funziona e perché serve un andamento a denti di sega (tensione/rilascio)
- La teoria di Koster: il divertimento come piacere dell'apprendimento; la noia come pattern già masticato
- Il problema dell'abilità variabile: giocatori diversi, stesso gioco. Difficoltà dinamica, opzioni di difficoltà, difficoltà scelta dal giocatore.
- Perché "divertimento" è una parola povera: ci sono giochi che funzionano senza essere divertenti (horror, giochi di lutto, giochi di frustrazione controllata)

**Punti chiave:**
- Flow spiega bene alcuni giochi (arcade, azione) e male altri (strategia a turni, giochi sociali, narrativa). Dillo esplicitamente, altrimenti gli studenti lo applicano ovunque.
- Il pacing è design: la difficoltà costante è la forma di difficoltà peggiore.
- Distingui tra il gioco troppo difficile e il gioco illeggibile — il secondo viene percepito come il primo ma si risolve con il feedback, non con i numeri.

**Errori tipici:** usare "flow" come sinonimo di "divertente"; progettare curve di difficoltà solo crescenti.

**Pratica:** analisi collettiva della curva di difficoltà di un gioco che conoscono tutti, disegnata su lavagna; poi identificazione dei momenti di rilascio. Buon punto per i video di Jonas Tyroller.

**Fonti:** Csikszentmihalyi, *Flow: The Psychology of Optimal Experience* (1990) — psicologia con base empirica solida, ma nata fuori dai giochi: la sua applicazione al game design è estrapolazione dei designer, non ricerca sui giochi. Koster, *A Theory of Fun for Game Design* (2004) — proposta teorica affascinante e non testata; presentala come tale.

---

## LIVELLO 4 — Strutture: come si tiene insieme un sistema

### Modulo 4.1 — Game loop e core loop (1,5 h frontale + 1 h pratica)

**Obiettivo:** saper disegnare il loop di un gioco a più scale temporali.

**Cosa trattare:**
- Il core loop: l'azione che il giocatore ripete e perché la ripete (azione → feedback → ricompensa → nuova capacità/nuova situazione)
- Loop annidati a scale diverse: loop del secondo (input), loop del minuto (scontro), loop della sessione, loop della meta-progressione, loop del giorno (retention nei F2P)
- Perché il core loop deve essere divertente da solo, prima di ogni contenuto
- Loop di compulsione e dove finisce il design e comincia la manipolazione (si riprende nel modulo etica)

**Punti chiave:**
- Se il core loop non regge 30 secondi senza contenuto, nessuna quantità di contenuto lo salverà.
- Disegnare i loop su carta è un'attività concreta, non un esercizio teorico. Pretendi il diagramma.
- I loop a scala lunga (progressione, meta) servono a dare senso ai loop brevi, non a sostituirli.

**Errori tipici:** confondere il core loop con la struttura della partita; progettare la meta-progressione prima del loop base.

**Pratica:** disegnare il diagramma dei loop annidati di tre giochi molto diversi tra loro (un roguelike, un gestionale, un competitivo) e confrontarli.

---

### Modulo 4.2 — Feedback loop positivi, negativi e dominanza (1,5 h frontale + 2,5 h pratica)

**Obiettivo:** riconoscere i loop di rinforzo in un sistema e saperli correggere.

**Cosa trattare:**
- Loop positivo (rinforzo): chi è avanti va più avanti. Loop negativo (correzione): chi è indietro recupera.
- Runaway leader e il momento in cui la partita è decisa ma non finita — il peggior difetto strutturale possibile
- Catch-up mechanics e come dosarle senza svilire l'abilità (il problema dell'elastico: se recuperare è gratis, giocare bene non conta)
- Kingmaking: quando un giocatore che non può vincere decide chi vince
- Dominanza: strategie dominanti e dominate, opzioni mai usate, il "solved game"
- Nozioni base di teoria dei giochi utili al designer: payoff matrix, equilibrio di Nash, giochi a somma zero e non, il dilemma del prigioniero come modello di cooperazione instabile
- Perché una strategia dominante uccide lo spazio decisionale: ricollega al modulo 1.3

**Punti chiave:**
- Il loop positivo non è sempre un male: in alcuni giochi serve a chiudere le partite. Il male è il loop positivo non compensato che rende la fine prevedibile.
- La domanda da porsi su ogni sistema: cosa succede a chi vince il primo scambio? E a chi lo perde?
- Ogni opzione che nessun giocatore esperto sceglie mai è codice morto nel design.

**Errori tipici:** aggiungere catch-up a caso invece di rimuovere la causa; non accorgersi che il proprio gioco ha una strategia dominante perché nessuno ha giocato abbastanza.

**Pratica:** **Monopoli**. Si gioca davvero (30-40 minuti bastano per far emergere il problema), poi si analizza: dove sta il loop positivo, dove stanno le non-decisioni, perché la partita è decisa molto prima di finire. Esercizio: riprogettare massimo 3 regole per eliminare il runaway leader senza toccare il tema. Confronto delle soluzioni in aula — questo esercizio insegna che il design è chirurgia su un sistema, non aggiunta di contenuti.

**Fonti:** Elias, Garfield, Gutschera, *Characteristics of Games* (2012) è la trattazione più rigorosa di dominanza, catch-up, kingmaking e lunghezza della partita. Per la teoria dei giochi: qualunque manuale introduttivo, ma resta al livello concettuale — non ti serve la matematica, ti serve il vocabolario.

---

## LIVELLO 5 — Incertezza e informazione

### Modulo 5.1 — Randomness e informazione (2 h frontale + 2 h pratica)

**Obiettivo:** saper scegliere che tipo di incertezza mettere in un gioco e perché.

**Cosa trattare:**
- **Input randomness vs output randomness.** Input: la casualità arriva prima della decisione e diventa materiale su cui ragionare (la mano di carte, il seed della run). Output: la casualità arriva dopo la decisione e ne determina l'esito (il tiro per colpire). L'input randomness genera decisioni, l'output randomness genera tensione ed esiti ingiusti.
- Perché i giochi moderni spostano casualità dall'output all'input, e i casi in cui l'output randomness è invece giusta (giochi di tensione, giochi corti, giochi sociali)
- Varianza e distribuzione: 2d6 non è 1d12. Come si usa la forma della distribuzione per rendere i risultati prevedibili ma non certi.
- Casualità percepita vs reale: la gambler's fallacy, i sistemi pity, lo shuffle "onesto" che sembra ingiusto, la casualità addomesticata (bag randomizer di Tetris)
- Ruolo della fortuna nella longevità: un po' di fortuna permette al principiante di battere l'esperto ogni tanto, ed è ciò che tiene in vita i giochi sociali
- **Informazione:** perfetta (scacchi), imperfetta (poker), nascosta, asimmetrica, incompleta. Fog of war, mani chiuse, ruoli segreti.
- Informazione deducibile vs informazione inaccessibile: la differenza tra un gioco di deduzione e un gioco di indovinelli
- Come l'informazione nascosta crea bluff, lettura dell'avversario e metagioco — cioè trasferisce la profondità dal sistema alle persone

**Punti chiave:**
- La domanda progettuale è: voglio che il giocatore ragioni sull'incertezza (input) o che la subisca (output)? Entrambe sono valide, ma vanno scelte.
- L'informazione nascosta è il modo più economico per creare profondità: non aggiunge regole, aggiunge giocatori.
- La casualità non è il nemico dell'abilità. L'abilità in presenza di casualità è la gestione del rischio, che è una competenza diversa e altrettanto profonda.
- Attenzione al bilanciamento percepito: un sistema statisticamente equo che *sembra* ingiusto è un sistema rotto.

**Errori tipici:** usare 1dN ovunque senza ragionare sulla distribuzione; mettere output randomness su decisioni strategiche importanti (frustrazione garantita); nascondere informazione che il giocatore non ha modo di dedurre, ottenendo un gioco di fortuna travestito da gioco di deduzione.

**Pratica:** rilettura di **Perudo** alla luce dell'informazione (la propria mano è informazione asimmetrica, la dichiarazione è segnale, il bluff è rumore introdotto volontariamente). In alternativa o in aggiunta **Hanabi** (informazione limitata e comunicazione vincolata: fortissimo dopo Codenames) o **Love Letter** (deduzione completa con 16 carte). Esercizio: prendere un gioco del gruppo e produrre due varianti, una a informazione perfetta e una a informazione nascosta, testandole entrambe.

**Fonti:** la distinzione input/output randomness è terminologia di design ormai standard, diffusa soprattutto da Geoff Engelstein (*GameTek*) e dal design boardgame anglosassone — è una categorizzazione utile e condivisa, non un risultato sperimentale. *Characteristics of Games* ha il trattamento più serio della fortuna e della sua misurazione.

---

### Modulo 5.2 — Teoria dei giochi applicata e dinamiche sociali (1 h frontale + 2 h pratica)

**Obiettivo:** capire come le persone diventano parte del sistema.

**Cosa trattare:**
- Il giocatore come avversario imprevedibile: quando il gioco ottimale non è quello matematicamente ottimale
- Strategie miste e perché in RPS l'unica strategia imbattibile è quella casuale — e perché nessuno la usa
- Metagioco: il gioco attorno al gioco, la reputazione tra le partite, il "tu bluffi sempre"
- Alleanze, tradimenti, negoziazione; il problema dell'alpha player nei cooperativi
- Deduzione sociale: come si progetta un gioco in cui l'informazione sta nelle facce delle persone
- Bilanciamento asimmetrico: quando i ruoli non sono uguali, cosa significa "equo"

**Punti chiave:**
- Nei giochi sociali il designer progetta le condizioni della conversazione, non la conversazione.
- La teoria dice cosa è ottimale; il design deve rendere interessante il fatto che nessuno giocherà in modo ottimale.
- I giochi sociali sono estremamente sensibili al gruppo: lo stesso gioco è ottimo con 6 amici e pessimo con 6 sconosciuti. È un vincolo di design, non un difetto.

**Errori tipici:** progettare giochi sociali che puniscono i timidi; eliminare giocatori a metà partita senza dargli nulla da fare.

**Pratica:** **Avalon**. Due partite consecutive con lo stesso gruppo, per far vedere come il metagioco cambia la seconda partita a regole identiche — dimostrazione perfetta che il sistema include le persone. Debrief su cosa ha prodotto la regola dei ruoli segreti e su cosa hanno prodotto i giocatori.

---

## LIVELLO 6 — Esperienza: fantasy e narrazione

### Modulo 6.1 — Fantasy del gioco e narrazione interattiva (2 h frontale + 2 h pratica)

**Obiettivo:** saper progettare la promessa del gioco e capire come le regole raccontano.

**Cosa trattare:**
- **Fantasy:** cosa promette il gioco al giocatore prima ancora delle regole (essere un pilota, un investigatore, un sopravvissuto, un dio). La fantasy guida ogni scelta successiva.
- Coerenza tra fantasy e meccaniche: se la fantasy è "sopravvivere", ogni sistema deve costare qualcosa
- Il tema non è una vernice: cambiare tema a regole invariate cambia il gioco percepito, la difficoltà di apprendimento e il pubblico
- **Tipi di narrazione:** embedded (scritta prima, uguale per tutti), emergente (prodotta dal sistema in partita), environmental (raccontata dallo spazio), retroattiva (la storia che il giocatore racconta dopo)
- Struttura narrativa interattiva: lineare, ramificata, a collo di bottiglia, a nodi, sandbox narrativa
- Il costo combinatorio della ramificazione e i trucchi per contenerlo
- Ludonarrative dissonance: quando quello che il gioco dice e quello che il gioco fa fare non coincidono
- Agency narrativa vs agency meccanica: il giocatore vuole cambiare la storia o vuole sentirsi dentro la storia? Non è la stessa cosa e non costa uguale.

**Punti chiave:**
- La narrazione più potente nei giochi è quasi sempre quella emergente, perché è l'unica di cui il giocatore si sente autore. Le storie che i giocatori raccontano agli amici quasi mai sono quelle scritte dagli sceneggiatori.
- La fantasy fa metà del lavoro di insegnamento: se il giocatore sa di essere un ladro, sa già cosa provare a fare. Il tema coerente riduce il carico di regole.
- Quando progetti un sistema, chiediti che storie produce. Se produce sempre la stessa, è un problema di design, non di scrittura.

**Errori tipici:** scrivere la storia prima di avere il gioco; usare il tema come decorazione applicata alla fine; progettare 12 finali quando ne servivano 3 buoni.

**Pratica:** esercizio di reskin — prendere un gioco astratto semplice e applicargli tre fantasy diverse cambiando solo nomi e finzione, poi far giocare e discutere quanto cambia la percezione a regole identiche. È il modo più rapido per dimostrare che il tema è design. Buon punto per i video di Fractal Philosophy.

---

## LIVELLO 7 — Sistemi avanzati

### Modulo 7.1 — Bilanciamento e tuning knobs (2 h frontale + 2 h pratica)

**Obiettivo:** saper mettere le mani sui numeri di un sistema con un metodo.

**Cosa trattare:**
- Cosa significa bilanciare: non "rendere tutto uguale", ma rendere tutte le opzioni sensate in qualche contesto
- Tipi di bilanciamento: simmetrico, asimmetrico, per progressione (PvE), competitivo (PvP), economico
- **Tuning knobs:** identificare le manopole di un sistema e capire quali sono sensibili e quali no. Danno, HP, costo, cooldown, rarità, cadenza di fuoco, capacità del caricatore, velocità di movimento.
- La differenza tra cambiare un numero e cambiare una regola: i numeri si tunano, le regole si riprogettano. Sapere quando serve quale è la competenza chiave.
- Economie: sink e faucet, inflazione, valute multiple e a cosa servono
- Bilanciare su foglio di calcolo: modelli semplici, time-to-kill, damage per second, curve di costo/beneficio
- Bilanciamento intenzionale vs sbilanciamento intenzionale (opzioni volutamente forti come ricompensa)

**Punti chiave:**
- Un singolo numero può ridefinire il genere di un gioco. È il punto del confronto **Resident Evil vs Doom**: stesse azioni di base (muoversi, sparare, ricaricare), ma il numero di proiettili, la velocità di movimento e il tempo di ricarica producono horror da una parte e power fantasy dall'altra. Le munizioni scarse rendono ogni proiettile una decisione; le munizioni abbondanti rendono il combattimento un flusso.
- Bilancia sempre verso l'esperienza che vuoi, non verso l'equità astratta.
- Prima di toccare i numeri, scrivi cosa dovrebbe succedere se il cambiamento funziona. Altrimenti non saprai leggere il test.

**Errori tipici:** tunare più manopole insieme; bilanciare sul proprio livello di abilità; confondere "troppo forte" con "troppo noioso da affrontare".

**Pratica:** sessioni comparate di **Resident Evil** e **Doom** con focus sul caricatore e sulla gestione delle munizioni, poi esercizio su foglio di calcolo: dato un piccolo combat system, raggiungere due target opposti (tesa/horror e power fantasy) toccando solo i numeri, e giustificare ogni modifica.

---

### Modulo 7.2 — Emergenza e complessità (1,5 h frontale + 2,5 h pratica)

**Obiettivo:** capire come regole semplici producono profondità e come si progetta perché accada.

**Cosa trattare:**
- Emergenza: comportamenti non previsti dal designer che nascono dall'interazione delle regole
- Complessità vs complicazione: poche regole che interagiscono molto (profondo) contro molte regole che interagiscono poco (complicato e superficiale)
- Depth vs breadth: profondità di una singola opzione contro ampiezza delle opzioni disponibili
- Spazio di stato e spazio decisionale; perché il numero di configurazioni non misura la qualità
- Interazione tra sistemi: ortogonalità delle meccaniche, sistemi che si moltiplicano invece di sommarsi (l'approccio "immersive sim")
- Emergenza controllata: come si lascia spazio senza perdere il controllo del gioco
- Exploit e degenerazione: quando l'emergenza produce strategie che uccidono il gioco, e quando invece diventa il gioco (combo, speedrun, tech)
- Leggibilità di un sistema emergente: se il giocatore non capisce perché è successo, l'emergenza è rumore

**Punti chiave:**
- La profondità non si aggiunge, si libera. Quasi sempre si ottiene togliendo regole e aumentando le interazioni tra quelle che restano.
- Gli scacchi hanno sei pezzi e regole che stanno in una pagina. È l'argomento più forte che hai contro l'istinto degli studenti di aggiungere meccaniche.
- Non puoi progettare l'emergenza, puoi progettare le condizioni perché avvenga — e poi devi playtestare per scoprire cosa è emerso. Ricollega al livello 2.

**Errori tipici:** aggiungere meccaniche per aggiungere profondità; considerare ogni exploit un bug da chiudere; confondere "tante possibilità" con "possibilità significative".

**Pratica:** **Chess**, giocato e analizzato — con varianti (Chess960, King of the Hill, o una variante inventata in aula) per mostrare quanto poco basta a cambiare l'intero spazio strategico. Poi esercizio: progettare un sistema con massimo 4 regole che produca almeno 3 strategie distinte non previste dal progettista, verificato facendolo giocare agli altri gruppi.

---

## LIVELLO 8 — Misurare e chiudere

### Modulo 8.1 — Metriche e telemetria (1,5 h frontale + 1 h pratica)

**Obiettivo:** saper decidere cosa misurare e come leggere i dati senza farsi ingannare.

**Cosa trattare:**
- Qualitativo vs quantitativo: cosa risponde a "perché" e cosa risponde a "quanto". Servono entrambi e rispondono a domande diverse.
- Cosa si misura in un gioco: punti di abbandono, tempo per livello, tasso di completamento, curva di morte, utilizzo delle opzioni (quali armi/carte/personaggi nessuno usa), durata sessione, retention D1/D7/D30, funnel di onboarding
- Metriche di bilanciamento: win rate per fazione/carta/personaggio, pick rate, ban rate, e perché win rate e pick rate vanno letti insieme
- Come si strumenta un gioco: definire gli eventi prima di costruirli, non dopo
- Il problema del sopravvissuto: i dati li generano quelli che sono rimasti, non quelli che se ne sono andati — e sono proprio quelli che se ne sono andati che ti servono
- Vanity metrics contro metriche azionabili: se un numero non cambia una decisione, non serve
- A/B test: quando ha senso, quando è sovradimensionato, quali trappole ha (dimensione campione, significatività, ottimizzazione locale)
- **Il limite grosso:** le metriche dicono cosa è successo, mai perché. Ti dicono che il 60% abbandona al livello 4; il perché lo scopri solo guardando qualcuno giocare il livello 4.
- Etica dei dati: cosa si può raccogliere, consenso, GDPR, e la differenza tra ottimizzare l'esperienza e ottimizzare l'estrazione

**Punti chiave:**
- Definisci la domanda prima della metrica, sempre — è lo stesso principio del prototipo e del playtest, e a questo punto del corso devono riconoscerlo come pattern.
- Le metriche trovano i problemi, i playtest li spiegano. Usarne una sola delle due è il modo classico di sbagliare.
- Ottimizzare ciò che si misura significa smettere di progettare ciò che non si misura. Vale soprattutto per il divertimento, che nessuna metrica cattura.

**Errori tipici:** raccogliere tutto e non guardare niente; inseguire la retention senza chiedersi se il gioco è buono; cambiare design sulla base di differenze statisticamente irrilevanti.

**Pratica:** dato un set di dati sintetici di un gioco (curva di abbandono, win rate per personaggio, tempo per livello), formulare ipotesi sui problemi di design e proporre il playtest qualitativo che le verificherebbe. L'esercizio deve finire con una domanda da testare, non con una conclusione.

---

### Modulo 8.2 — Produzione, etica, accessibilità e industria (2 h frontale)

**Obiettivo:** collocare tutto quanto visto nel contesto professionale reale.

**Cosa trattare:**
- **Scope e vincoli:** stimare, tagliare, negoziare con il team. Perché il design è sempre design sotto vincolo.
- **Onboarding:** insegnare senza tutorial testuali, introdurre una meccanica alla volta, il livello che insegna giocando. Se avanza tempo questo merita un modulo a sé — è il buco più comune nei progetti degli studenti.
- **Accessibilità:** opzioni di difficoltà, daltonismo, dimensioni testo, input alternativi, sottotitoli. Non è carità, è pubblico.
- **Etica e monetizzazione:** dark pattern, loop di compulsione, gacha, pay-to-win, premium vs F2P. Dove finisce il design persuasivo e comincia lo sfruttamento.
- **Mercato:** come si posiziona un gioco, analisi dei competitor, validare la domanda prima di costruire, cosa significa lanciare su Steam
- **Il mestiere:** come si entra, portfolio, design test, cosa cercano i team

**Punti chiave:**
- Un designer che non sa tagliare non spedisce niente.
- L'etica non è un modulo separato dal design: le stesse tecniche che rendono un gioco coinvolgente possono renderlo predatorio, e la differenza sta nell'intenzione e nel beneficiario.
- Il gioco migliore che non trova giocatori non esiste. Il posizionamento è parte del design.

**Fonti:** Zagal, Björk, Lewis, *Dark Patterns in the Design of Games*, Foundations of Digital Games 2013 — paper peer-reviewed, è la fonte giusta per dare rigore al modulo etica.

---

### Modulo 8.3 — Esame e pitch finale (3,5 h pratica)

- Presentazione dei prototipi: 5 minuti di pitch + 10 minuti di gioco o dimostrazione + critica strutturata in aula
- Griglia di critica data in anticipo, costruita sul vocabolario del corso: core loop, decisioni, informazione, bilanciamento, fantasy, evidenze dai playtest
- Chiedi esplicitamente a ogni gruppo: qual è stata l'ipotesi iniziale, cosa ha detto il playtest, cosa avete cambiato. Il processo va valutato quanto il prodotto.

---

## Appendice A — Mappa giochi → moduli

| Gioco | Modulo | Cosa dimostra |
|---|---|---|
| Rock Paper Scissors | 1.3 | Decisioni interessanti con tre regole; lettura dell'avversario; strategie miste |
| Viking See-Saw | 1.1 | Il design della destrezza fisica; ampiezza della definizione di gioco |
| Perudo | 3.1, 5.1 | MDA minimo → dinamiche profonde; informazione asimmetrica e bluff |
| Codenames | 3.1 | Estetiche diverse (fellowship, discovery) con complessità minima |
| Monopoli | 4.2 | Loop positivo, runaway leader, non-decisioni |
| Avalon | 5.2 | Metagioco sociale, deduzione, narrazione emergente |
| Resident Evil vs Doom | 7.1 | Tuning knobs: un numero che cambia il genere |
| Chess | 7.2 | Emergenza e profondità da poche regole |
| Hanabi *(opzionale)* | 5.1 | Informazione limitata e comunicazione vincolata |
| Love Letter *(opzionale)* | 5.1 | Deduzione completa con 16 carte |
| Pandemic *(opzionale)* | 5.2 | Cooperativo e problema dell'alpha player |
| Vampire Survivors *(opzionale)* | 4.1, 3.2 | Core loop e feedback puro |

---

## Appendice B — Riepilogo orario

| Livello | Moduli | Frontale | Pratica | Totale |
|---|---|---|---|---|
| 0 — Inquadramento | 0.1 | 1 | 0 | 1 |
| 1 — Fondamenti | 1.1, 1.2, 1.3 | 4,5 | 4 | 8,5 |
| 2 — Metodo | 2.1, 2.2, 2.3 | 4,5 | 6 | 10,5 |
| 3 — Linguaggio analitico | 3.1, 3.2 | 3 | 3,5 | 6,5 |
| 4 — Strutture | 4.1, 4.2 | 3 | 3,5 | 6,5 |
| 5 — Incertezza e informazione | 5.1, 5.2 | 3 | 4 | 7 |
| 6 — Esperienza | 6.1 | 2 | 2 | 4 |
| 7 — Sistemi avanzati | 7.1, 7.2 | 3,5 | 4,5 | 8 |
| 8 — Misurare e chiudere | 8.1, 8.2, 8.3 | 3,5 | 4,5 | 8 |
| **Totale** | | **28** | **32** | **60** |

---

## Appendice C — Fonti, e cosa vale cosa

**Ricerca o testi accademici citabili**
- Hunicke, LeBlanc, Zubek, *MDA: A Formal Approach to Game Design and Game Research*, AAAI Workshop, 2004
- Csikszentmihalyi, *Flow: The Psychology of Optimal Experience*, 1990 — psicologia con base empirica solida, applicazione ai giochi estrapolata
- Salen & Zimmerman, *Rules of Play*, 2003 — teoria formale
- Elias, Garfield, Gutschera, *Characteristics of Games*, 2012 — il testo più rigoroso su dominanza, fortuna, catch-up, lunghezza
- Zagal, Björk, Lewis, *Dark Patterns in the Design of Games*, FDG 2013 — peer-reviewed
- Swink, *Game Feel*, 2008 — se tratti il feedback a livello di frame

**Euristiche di mestiere, utili ma non dimostrate — vale la pena dirlo in aula**
- Le 8 estetiche di LeBlanc: tassonomia proposta, mai validata empiricamente
- "Una serie di decisioni interessanti" (Sid Meier): aforisma, non risultato
- Koster, *A Theory of Fun*: proposta teorica non testata
- La tassonomia di Bartle (1996) è influente ma poco validata; se tratti le motivazioni dei giocatori, il Gamer Motivation Model di Quantic Foundry ha almeno un'analisi fattoriale su larga scala dietro
- Input vs output randomness: categorizzazione di design condivisa (diffusa da Geoff Engelstein e dal design boardgame anglosassone), non un risultato sperimentale
- "Il giocatore ha ragione sul problema e torto sulla soluzione": regola empirica di mestiere, molto utile, senza studi a supporto

**Mia euristica, non provata**
La ripartizione oraria dei moduli e l'ordine dei livelli. La dipendenza più rigida è che il Livello 2 (metodo) preceda tutto ciò che viene dopo: se gli studenti non hanno prototipato e playtestato presto, i moduli avanzati diventano teoria. Il rischio principale del programma è il Livello 2: se lo sprint di prototipazione va male, tieni un cuscinetto per riprendere la pratica nei pomeriggi successivi.