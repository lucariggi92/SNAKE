# Snake Game — Design Spec

## Overview

Classic Snake game implemented with HTML5 Canvas, CSS, and vanilla JavaScript. The snake moves on a 20x20 grid, eats fruits to grow, and speeds up as the score increases. Retro/pixel art visual style.

## Tech Stack

- HTML5 (structure)
- CSS3 (styling)
- Vanilla JavaScript (game logic, Canvas rendering)

## Files

- `snake.html` — HTML structure, loads CSS and JS
- `snake-style.css` — page styling, retro aesthetic
- `snake-script.js` — all game logic and rendering

## Grid & Rendering

- **Canvas size:** 400x400 pixels
- **Grid:** 20x20 cells
- **Cell size:** 20px (400 / 20)
- **Rendering:** HTML5 Canvas 2D context, `fillRect` for each cell

## Visual Style (Retro/Pixel Art)

- Background: black (#000000)
- Grid lines: dark gray (#1a1a1a), 1px
- Snake body: bright green (#00ff00)
- Snake head: lighter green (#33ff33) to distinguish from body
- Fruit: red (#ff0000)
- Text: white, monospace font
- Borders: sharp, no rounded corners, no gradients

## Game State

```
snake = [{x: 10, y: 10}]    // array of segments, index 0 = head
direction = {x: 1, y: 0}    // current movement direction
nextDirection = {x: 1, y: 0} // buffered direction (prevents 180° reversal)
fruit = {x: 15, y: 10}      // fruit position
score = 0                     // current score
speed = 150                   // ms between ticks (starts at 150)
gameOver = false              // game state flag
loopId = null                 // setInterval ID
```

## Game Loop (each tick)

1. Apply buffered direction: `direction = nextDirection`
2. Calculate new head position: `newHead = {x: head.x + direction.x, y: head.y + direction.y}`
3. **Wall collision:** if `newHead.x < 0 || >= 20 || newHead.y < 0 || >= 20` → Game Over
4. **Self collision:** if `newHead` overlaps any segment in `snake[]` → Game Over
5. Prepend `newHead` to `snake[]`
6. **If head == fruit:**
   - `score++`
   - Generate new fruit (not on any snake segment)
   - Reduce `speed` by `SPEED_INCREMENT` (5ms), restart timer
   - Do NOT remove last segment (snake grows)
7. **Else:** `snake.pop()` (remove tail, snake moves without growing)
8. Call `draw()` to render

## Speed Progression

- `INITIAL_SPEED = 150ms`
- `SPEED_INCREMENT = 5ms` per fruit eaten
- `MIN_SPEED = 50ms` (maximum speed cap)
- Timer is restarted when speed changes

## Fruit Generation

- Collect all cells not occupied by snake segments
- Pick one randomly
- If no free cells → player wins (filled entire grid)

## Input Handling

- `keydown` event listener
- Arrow keys: ↑↓←→
- `nextDirection` is set on keydown (not `direction` directly)
- Prevents 180° reversal: if moving right, cannot immediately go left (and vice versa, up/down)
- Direction is applied on next game tick

## UI Layout

```
┌─────────────────────────────┐
│         SNAKE               │
│     Punteggio: 0            │
├─────────────────────────────┤
│                             │
│       [Canvas 400x400]      │
│                             │
├─────────────────────────────┤
│    (game over overlay)      │
└─────────────────────────────┘
```

## Game Over

- Overlay appears: semi-transparent black with "GAME OVER" text
- Game loop stops
- Score is displayed
- Click or key press restarts the game (resets all state)

## Constants Summary

| Constant | Value | Description |
|----------|-------|-------------|
| GRID_SIZE | 20 | Cells per side |
| CELL_SIZE | 20 | Pixels per cell |
| CANVAS_SIZE | 400 | Canvas width/height in px |
| INITIAL_SPEED | 150 | Starting ms between ticks |
| SPEED_INCREMENT | 5 | ms reduction per fruit |
| MIN_SPEED | 50 | Maximum speed cap |
