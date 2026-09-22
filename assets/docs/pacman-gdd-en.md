# Pac-Man — Core Gameplay (Maze Chase)

> **Status**: Approved — teaching example
> **Author**: Game Design course · reconstruction of *Pac-Man* (Namco, 1980; designed by Toru Iwatani) for study purposes
> **Last Updated**: 2026-09-22
> **Revision notes**: v1 — first version. All numbers refer to the original arcade game, level 1, unless stated otherwise.
> **Implements Pillar**: Readable Chase (primary); Risk-and-Reward Routing (secondary); Instant Play (third) — *pillars reconstructed for teaching*

## Overview

This document owns the moment-to-moment loop of Pac-Man: moving through the maze, eating, the four ghosts, dying and clearing a level. Score values, level tables, audio and the attract mode have their own documents; this one calls them (see Dependencies).

The player steers Pac-Man through a maze with a 4-way joystick. The goal is to eat all 240 dots and 4 energizers. Four ghosts chase him, and touching one costs a life. Eating an energizer flips the chase for a few seconds: the ghosts turn blue, run away and can be eaten for escalating points. When the maze is empty the next level starts, a little faster and with less time to hunt.

## Player Fantasy

You are the prey — until you eat an energizer. Then, for six seconds, the hunter is you. The fantasy is that flip of power, and you earn it by routing: you let the ghosts close in, and only then do you turn on them. Eating is the theme on purpose: Iwatani chose it to reach players who weren't interested in shooting games.

**Design test:** if a player says *"I waited for them to get close before taking the energizer"*, the loop works. If they say *"I died and didn't see it coming"*, readability has failed.

## Detailed Design

### Core Rules

1. **Movement.** Pac-Man keeps moving in his current direction until he hits a wall. A turn input is remembered and applied at the next opening. He can take corners slightly early ("cornering"), gaining distance on the ghosts, who can't.
2. **Eating.** A dot is worth 10 points, an energizer 50. Pac-Man stops for 1 frame per dot and 3 per energizer: eating slows you down, so dots are a cost as well as a reward.
3. **Ghosts.** Four ghosts, each chasing in its own way (targets in Formulas): Blinky (red) chases directly; Pinky (pink) ambushes ahead of Pac-Man; Inky (cyan) flanks, using Blinky's position; Clyde (orange) chases from afar but retreats when close.
4. **Scatter and Chase.** Ghosts alternate between Scatter (each heads for its own corner) and Chase on a timer: at level 1, 7 s Scatter, 20 s Chase, 7 / 20, 5 / 20, 5, then Chase forever. On every switch all ghosts reverse direction — the visible sign that the mode changed.
5. **Frightened.** Eating an energizer turns every ghost that hasn't been eaten blue for 6 s: they reverse, slow down and turn randomly at intersections, and flash white shortly before recovering. Ghosts eaten during one energizer are worth 200, 400, 800 and 1,600 points. An eaten ghost becomes a pair of eyes that goes back to the house and comes out normal.
6. **Death.** Touching a ghost that isn't blue costs a life. Pac-Man and the ghosts go back to their starting positions; dots already eaten stay eaten. With no lives left: Game Over. One extra life is awarded at 10,000 points.
7. **Ghost house.** Blinky starts outside; Pinky leaves at once; Inky after Pac-Man has eaten 30 dots; Clyde after 60. If Pac-Man stops eating for 4 s, the next ghost comes out anyway.
8. **Tunnels.** The side tunnels wrap around the screen. Ghosts slow down inside them, Pac-Man doesn't: they are an escape route.
9. **Fruit.** A fruit appears below the ghost house twice per level, after 70 and 170 dots, for about 10 seconds. Its value depends on the level: cherry 100, strawberry 300, orange 500, apple 700, melon 1,000, Galaxian 2,000, bell 3,000, key 5,000.
10. **Level clear.** When all 244 dots and energizers are eaten, the maze flashes and the next level starts. Short comic intermissions play after levels 2, 5, 9, 13 and 17.
11. **Speed (level 1).** Pac-Man moves at 80% of maximum speed (90% while the ghosts are blue); ghosts at 75%, 50% when blue, 40% in the tunnels. When only 20 dots are left, Blinky speeds up ("Cruise Elroy"): 80%, then 85% at 10 dots.

### States and Transitions

**Game**

| State | Enter when | Exit to |
|---|---|---|
| Attract | Power on, or after Game Over | Coin + Start → Ready |
| Ready | New game, new life or new level | After a few seconds → Playing |
| Playing | Ready ends | Touches a ghost → Dying · Last dot eaten → Level Clear |
| Dying | Pac-Man touches a ghost that isn't blue | Lives left → Ready · No lives → Game Over |
| Level Clear | Maze empty | Intermission (after levels 2, 5, 9, 13, 17) or Ready |
| Game Over | Last life lost | Attract |

**Ghost**

| State | Enter when | Exit to |
|---|---|---|
| In House | Level start, or eyes reach the house | Release rule met → Scatter/Chase |
| Scatter ⇄ Chase | Mode timer | Energizer eaten → Frightened |
| Frightened | Energizer eaten | Timer ends → Scatter/Chase · Eaten → Eyes |
| Eyes | Eaten while blue | Reaches the house → In House |

### Interactions with Other Systems

| System | This system sends | It gives back |
|---|---|---|
| Input | — | Joystick direction (4-way) |
| Scoring | "Dot / energizer / ghost / fruit eaten" events | Score total, extra-life trigger |
| Level Progression | Current level | Speeds, frightened time, mode timers, fruit type |
| Audio | Game and ghost states | Munch, siren, frightened sound, death jingle |
| UI / HUD | Score, lives, level, status | What the player sees (see UI/UX) |

## Formulas

**Formula 1 — Ghost combo.** The *k*-th ghost eaten during a single energizer is worth `P(k) = 200 × 2^(k−1)`, so 200, 400, 800, 1,600. Maximum per energizer: 3,000.

**Formula 2 — Level score, without fruit.**
`S = 10 × dots + 50 × energizers + Σ P(k)` → maximum `2,400 + 200 + 4 × 3,000 = 14,600`.

**Formula 3 — Chase targets.** Each ghost aims at a target tile. `P` = Pac-Man's tile, `d` = his direction (one tile long), `B` = Blinky's tile.

| Ghost | Target in Chase | Scatter corner |
|---|---|---|
| Blinky | `P` | top right |
| Pinky | `P + 4d` | top left |
| Inky | `2 × (P + 2d) − B` | bottom right |
| Clyde | `P` if more than 8 tiles away, otherwise his corner | bottom left |

At each intersection a ghost takes the exit that is closest to its target in a straight line (ties: up, left, down, right) and never turns back on its own.

## Edge Cases

- **If Pac-Man is facing up:** Pinky's and Inky's "ahead" point is also shifted left by the same number of tiles (a bug in the original code, never fixed).
- **If Pac-Man and a ghost swap tiles in the same frame:** they pass through each other without colliding. It's rare, but it happens: collisions are checked by tile.
- **If an energizer is eaten while some ghosts are eyes:** the eyes are unaffected and keep heading home.
- **If a level's frightened time is 0 (late levels):** the energizer still makes the ghosts reverse, but they don't turn blue and can't be eaten.
- **If the player reaches level 256:** the level counter overflows, the right half of the maze fills with garbage and the level can't be completed (the "kill screen").
- **In four spots** (two above the ghost house, two above Pac-Man's start) ghosts can't turn upwards in Scatter or Chase: expert players use them as safe spots.

## Dependencies

**Upstream** (this system needs): Input; maze layout; Level Progression tables.

**Downstream** (these need this system): Scoring; Audio; UI/HUD; Game Flow (attract mode, credits, two-player turns).

## Tuning Knobs

| Knob | Level 1 value | Too low | Too high |
|---|---|---|---|
| Frightened time | 6 s (0 in late levels) | Energizers become worthless | The tension disappears |
| Scatter/Chase timings | 7/20/7/20/5/20/5 s | Constant pressure, exhausting | Ghosts too harmless |
| Pac-Man vs ghost speed | 80% vs 75% | You can't escape: unfair | Ghosts never catch you |
| Cruise Elroy | 20 and 10 dots left | The last dots are too easy | The last dots are a wall |
| Ghost release | 0 / 30 / 60 dots | All four at once: chaos | Empty, boring level start |
| Lives and bonus life | 3 lives, +1 at 10,000 | One mistake ends the game | No pressure to play well |

The last row is set by the arcade operator with DIP switches: 1, 2, 3 or 5 lives; bonus at 10,000, 15,000 or 20,000 points, or none.

## Visual/Audio Requirements

- Every ghost has its own colour, always the same. **Blue = you can eat it**, **flashing white = it's about to recover.** These colours are never used for anything else.
- Every dot eaten makes a sound ("waka"): the player hears the rhythm of their own route.
- A background siren rises as the maze empties; while the ghosts are blue, a different sound replaces it. The player knows the state of the game without looking away from Pac-Man.

## UI/UX

### Wireframe

```
+--------------------------------------------+
| 1UP                HIGH SCORE              |  A score   B high score
| 2350               10000                   |
| +----------------------------------------+ |
| | O . . . . . . . . . . . . . . . . . O  | |  C maze (O = energizer)
| | . +----+ . +------+ . +------+ . +--+  | |
| | . . . . . . . . . . . . . . . . . . .  | |
| |                   M                    | |  E ghosts (M)
| |          +-------====-------+          | |  F ghost house
| | <==      |   M    M    M    |      ==> | |  G side tunnels
| |          +------------------+          | |
| |                 READY!                 | |  H status text
| |                 (fruit)                | |  I fruit spot
| | . . . . . . . . . C . . . . . . . . .  | |  D Pac-Man (C)
| | O . . . . . . . . . . . . . . . . . O  | |
| +----------------------------------------+ |
| C C                        [cherry][key]   |  J lives   K level fruit
+--------------------------------------------+
```

### Elements

| ID | Element | What it shows / does | Priority | Visible |
|---|---|---|---|---|
| D | Pac-Man | The player | 1 | Always |
| E | Ghosts | The threats; their colour is their state (normal, blue, flashing, eyes) | 1 | Always |
| C | Maze and dots | The level; the dots left are the progress bar | 2 | Always |
| H | Status text | "READY!" (yellow) before play, "GAME OVER" (red) at the end, "PLAYER ONE/TWO" | 2 | Only between phases |
| A | 1UP score | Current score; "1UP" blinks while that player is playing | 3 | Always |
| J | Lives | One Pac-Man icon per life left | 3 | Always |
| I | Fruit | A bonus to grab before it disappears | 3 | About 10 s, twice per level |
| B | High score | The record to beat | 4 | Always |
| K | Level fruit | Fruit of the latest levels: how far you've come | 4 | Always |
| F | Ghost house | Where ghosts start and where eyes return | 4 | Always |
| G | Tunnels | Escape route: exit left, come back right | 4 | Always |

### Information hierarchy

1. **Where Pac-Man and the ghosts are, and whether the ghosts are blue.** It's the only thing you look at while playing, so everything else stays at the edges.
2. **Where the remaining dots are.** The maze itself shows your progress: no bar needed.
3. **Score and lives**, at the top and the bottom, never over the maze.
4. **Record, level and fruit**, for between one game and the next.

No text appears over the maze during play: state changes are shown only with colour and sound.

### Controls

| Input | Action | Feedback |
|---|---|---|
| Coin | Adds a credit | "CREDIT 1" on screen and a sound |
| 1 PLAYER / 2 PLAYERS | Starts the game | "PLAYER ONE", jingle, "READY!" |
| 4-way joystick | Changes direction (remembered until the next opening) | Pac-Man turns; "waka" as he eats |

## Acceptance Criteria

**AC-01** Given Pac-Man on a dot, when he eats it, the score increases by 10 and he pauses for 1 frame. *Verified by:* frame-by-frame inspection.

**AC-02** Given an energizer eaten at level 1, all ghosts that aren't eyes turn blue, reverse and stay blue for 6 s, flashing before they recover. *Verified by:* stopwatch on a video capture.

**AC-03** Given four ghosts eaten during one energizer, they are worth 200, 400, 800 and 1,600 points, in that order. *Verified by:* scripted test.

**AC-04** Given the mode timer switching between Scatter and Chase, all ghosts outside the house reverse direction at the moment of the switch. *Verified by:* observation at 7 s and 27 s into level 1.

**AC-05** Given Pac-Man touching a ghost that isn't blue, a life is lost and positions reset, while eaten dots stay eaten. *Verified by:* playtest.

**AC-06** Given Pac-Man in a side tunnel, he comes out on the opposite side, and a ghost in the same tunnel moves at 40% speed. *Verified by:* observation.

**AC-07** Given a player who has never played, after one game they can explain what blue ghosts mean without being told. *Verified by:* blind playtest with 5 players.

## Open Questions

**OQ-1** Should the pass-through collision be fixed? Fixing it is fairer; keeping it creates rare, legendary moments. *(Original choice: not fixed.)*

**OQ-2** Should the level also be shown as a number? The fruit icons (K) have more charm but are less clear. *(Original choice: fruit only.)*
