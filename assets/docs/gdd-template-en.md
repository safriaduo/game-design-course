# [Game name] — [System name]

> **Status**: Draft · In review · Approved · Needs revision
> **Author**: [names]
> **Last Updated**: YYYY-MM-DD
> **Revision notes**: [what changed and why]
> **Implements Pillar**: [which of the game's pillars this system serves]

> **How to use this template.** Write one document per system (combat, economy, levels…), like the pages of a wiki. Keep it short: if a section doesn't apply, write "Not applicable" and say why. Lines in *italics* are instructions: delete them as you fill the document in. The examples come from the course's Pac-Man GDD.

## Overview

*What this system does and what it's responsible for, in 3–5 sentences: a reader should get it in 30 seconds. Also say what it does NOT do, and which document handles that.*

*Example: "This document owns Pac-Man's gameplay loop: moving through the maze, eating, ghosts, dying and clearing a level. Scores, level tables and audio have their own documents."*

## Player Fantasy

*What should the player feel thanks to this system? Write it from their point of view, not the rules'. End with a "design test": a sentence that, if a player says it, confirms the system works, and one that confirms it doesn't.*

*Example: "You are the prey — until you eat the energizer: then the hunter is you." Design test: "I waited for them to get close before taking it."*

## Detailed Design

### Core Rules

*Numbered rules, one per item, precise enough to be programmed or tested without asking you anything. Use real numbers, even provisional ones.*

1. *Example: "A dot is worth 10 points; eating it makes Pac-Man stop for 1 frame."*
2.
3.

### States and Transitions

*Which states the system — or one of its objects (an enemy, the match, a card) — can be in, and what moves it from one state to another.*

| State | Enter when | Exit to |
|---|---|---|
| *Frightened* | *Pac-Man eats an energizer* | *Timer ends → Chase · Eaten → Eyes* |
| | | |

### Interactions with Other Systems

*Which other systems this one talks to, and what they exchange.*

| System | This system sends | It gives back |
|---|---|---|
| *Scoring* | *"Ghost eaten" event* | *Score total, extra life* |
| | | |

## Formulas

*Every calculation in the system: the formula, what each variable means, its possible values and a worked example with numbers. If there are no formulas, write "None".*

**Formula 1 — [name].** `[formula]`

| Variable | Meaning | Possible values |
|---|---|---|
| | | |

*Example: `P(k) = 200 × 2^(k−1)`, where k is the k-th ghost eaten during one energizer (1 to 4). The third ghost is worth 200 × 2² = 800.*

## Edge Cases

*Odd or rare situations, each with its exact outcome. Format: "If [condition]: [what happens]." These are the questions a picky player — or a programmer — would ask.*

- *Example: "If an energizer is eaten while some ghosts are already eyes: the eyes are unaffected and keep heading home."*
-

## Dependencies

*Which systems this one needs in order to work (upstream) and which systems need this one (downstream). If you change this document, those are the ones to re-check.*

**Upstream:**

**Downstream:**

*Example: upstream, Input and level tables; downstream, Scoring, Audio and UI.*

## Tuning Knobs

*The numbers you can change to balance the system, and what happens if you push them too far either way.*

| Knob | Current value | Too low | Too high |
|---|---|---|---|
| *Frightened time* | *6 s* | *Energizers become worthless* | *The tension disappears* |
| | | | |

## Visual/Audio Requirements

*What the player must see and hear for the system to be understood: colours, shapes, sounds, animations. Only what gameplay needs, not the art style.*

- *Example: "Blue = eatable ghost. This colour is never used for anything else."*
-

## UI/UX

### Wireframe

*Draw the screen (or the table, for a board game) with boxes, and give each element a letter. A photo of a hand drawing is fine, or a text sketch like this one:*

```
+------------------------------------+
| A score              B high score  |
|                                    |
|                                    |
|            C play area             |
|                                    |
|                                    |
| D lives                  E button  |
+------------------------------------+
```

### Elements

*For each letter in the wireframe: what it is, what it shows or does, how important it is (1 = most) and when it's visible.*

| ID | Element | What it shows / does | Priority | Visible |
|---|---|---|---|---|
| *A* | *Score* | *Points in the current game* | *3* | *Always* |
| | | | | |

### Information hierarchy

*Rank the information from most to least important. The first item is what the player looks at while playing: it belongs in the centre and must be the most visible. The rest goes towards the edges.*

1. *Example: "Where Pac-Man and the ghosts are, and whether the ghosts are blue."*
2.
3.

### Controls

*Every button, key or gesture: what it does and how the game responds. If an action gives no feedback, the player will think it didn't work.*

| Input | Action | Feedback |
|---|---|---|
| *Joystick* | *Changes direction* | *Pac-Man turns; sound while eating* |
| | | |

## Acceptance Criteria

*How do you know the system works? Testable statements in the form "Given… when… then…", each with how to verify it. Include at least one about the player's experience, not just the rules.*

**AC-01** *Example: Given a blue ghost, when Pac-Man touches it, the ghost turns into eyes and the score goes up by 200. Verified by: manual test.*

**AC-02**

## Open Questions

*Decisions still to be made, with the options and what will unblock them (a playtest, another decision…). When you resolve one, write down what you decided and the date.*

**OQ-1** *Example: "Do we show the level as a number, or only as fruit? We'll decide after a playtest with 5 new players."*
