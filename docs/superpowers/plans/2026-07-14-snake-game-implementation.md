# Snake Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a classic Snake game with HTML5 Canvas, CSS, and vanilla JS on a 20x20 grid with retro pixel art style.

**Architecture:** Single-page game with three files (HTML structure, CSS styling, JS game logic). Canvas-based rendering for performance and pixel-perfect retro aesthetic. Game loop uses setInterval with adaptive speed.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Canvas 2D API

## Global Constraints

- Grid: 20x20 cells, 20px per cell, 400x400 canvas
- Speed: starts at 150ms, reduces by 5ms per fruit, min 50ms
- Retro style: black background, green snake (#00ff00), red fruit (#ff0000)
- No external libraries, no frameworks, pure vanilla

---

## File Structure

| File | Responsibility |
|------|----------------|
| `snake.html` | HTML structure, canvas element, score display, game over overlay |
| `snake-style.css` | Page layout, retro styling, game over overlay, fonts |
| `snake-script.js` | Game state, input handling, game loop, collision detection, fruit generation, Canvas rendering |

---

### Task 1: Create HTML Structure

**Files:**
- Create: `snake.html`

**Interfaces:**
- Consumes: None (first task)
- Produces: DOM structure with canvas, score element, game over overlay

- [ ] **Step 1: Create snake.html with full structure**

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake</title>
  <link rel="stylesheet" href="snake-style.css">
</head>
<body>
  <div class="game-container">
    <div class="header">
      <h1>SNAKE</h1>
      <span id="score">Punteggio: 0</span>
    </div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div id="gameOver" class="hidden">
      <div class="game-over-content">
        <h2>GAME OVER</h2>
        <p id="finalScore">Punteggio: 0</p>
        <p class="restart-hint">Premi un tasto per ricominciare</p>
      </div>
    </div>
  </div>
  <script src="snake-script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify HTML loads correctly**

Open `snake.html` in browser. Should see a black page with "SNAKE" title, "Punteggio: 0", and a black 400x400 canvas area. Game over overlay should be hidden.

- [ ] **Step 3: Commit**

```bash
git add snake.html
git commit -m "feat: add Snake game HTML structure"
```

---

### Task 2: Create CSS Styling

**Files:**
- Create: `snake-style.css`

**Interfaces:**
- Consumes: HTML elements from Task 1 (game-container, header, canvas, gameOver, etc.)
- Produces: Retro pixel art visual style

- [ ] **Step 1: Create snake-style.css with retro styling**

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Courier New', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
}

h1 {
  font-size: 24px;
  letter-spacing: 4px;
  color: #00ff00;
}

#score {
  font-size: 16px;
  color: #ffffff;
}

#gameCanvas {
  border: 2px solid #333333;
  display: block;
  image-rendering: pixelated;
}

#gameOver {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.85);
  z-index: 10;
}

#gameOver.hidden {
  display: none;
}

.game-over-content {
  text-align: center;
}

.game-over-content h2 {
  font-size: 48px;
  color: #ff0000;
  margin-bottom: 16px;
  letter-spacing: 4px;
}

.game-over-content #finalScore {
  font-size: 20px;
  margin-bottom: 12px;
}

.restart-hint {
  font-size: 14px;
  color: #888888;
}
```

- [ ] **Step 2: Verify CSS applies correctly**

Open `snake.html` in browser. Should see green "SNAKE" title, white score, black canvas with dark gray border, retro monospace font throughout.

- [ ] **Step 3: Commit**

```bash
git add snake-style.css
git commit -m "feat: add Snake game retro CSS styling"
```

---

### Task 3: Create JS Game Constants and State

**Files:**
- Create: `snake-script.js`

**Interfaces:**
- Consumes: DOM elements from Task 1 (gameCanvas, score, gameOver, finalScore)
- Produces: Game constants, state variables, canvas context reference

- [ ] **Step 1: Create snake-script.js with constants and initial state**

```javascript
(function() {
  'use strict';

  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const INITIAL_SPEED = 150;
  const SPEED_INCREMENT = 5;
  const MIN_SPEED = 50;

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const gameOverElement = document.getElementById('gameOver');
  const finalScoreElement = document.getElementById('finalScore');

  let snake;
  let direction;
  let nextDirection;
  let fruit;
  let score;
  let speed;
  let gameOver;
  let loopId;

  function init() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    fruit = { x: 15, y: 10 };
    score = 0;
    speed = INITIAL_SPEED;
    gameOver = false;
    scoreElement.textContent = 'Punteggio: 0';
    gameOverElement.classList.add('hidden');
  }

  init();
})();
```

- [ ] **Step 2: Verify JS loads without errors**

Open browser console (F12). Should see no errors. Variables are scoped inside IIFE.

- [ ] **Step 3: Commit**

```bash
git add snake-script.js
git commit -m "feat: add Snake game constants and initial state"
```

---

### Task 4: Implement Canvas Rendering

**Files:**
- Modify: `snake-script.js`

**Interfaces:**
- Consumes: State from Task 3 (snake, fruit, GRID_SIZE, CELL_SIZE)
- Produces: `draw()` function that renders game to canvas

- [ ] **Step 1: Add draw() function after init()**

```javascript
  function draw() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    snake.forEach(function(segment, index) {
      ctx.fillStyle = index === 0 ? '#33ff33' : '#00ff00';
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
      fruit.x * CELL_SIZE + 1,
      fruit.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
  }

  draw();
```

- [ ] **Step 2: Verify rendering works**

Open browser. Should see black canvas with dark grid lines, a green snake (1 segment) at (10,10), and a red fruit at (15,10).

- [ ] **Step 3: Commit**

```bash
git add snake-script.js
git commit -m "feat: add Canvas rendering with grid, snake, and fruit"
```

---

### Task 5: Implement Game Loop and Movement

**Files:**
- Modify: `snake-script.js`

**Interfaces:**
- Consumes: State and draw() from Tasks 3-4
- Produces: `update()` function, `startLoop()` function, basic movement

- [ ] **Step 1: Add update() and startLoop() functions**

```javascript
  function update() {
    direction = { x: nextDirection.x, y: nextDirection.y };

    var head = snake[0];
    var newHead = {
      x: head.x + direction.x,
      y: head.y + direction.y
    };

    if (newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE) {
      endGame();
      return;
    }

    for (var i = 0; i < snake.length; i++) {
      if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
        endGame();
        return;
      }
    }

    snake.unshift(newHead);

    if (newHead.x === fruit.x && newHead.y === fruit.y) {
      score++;
      scoreElement.textContent = 'Punteggio: ' + score;
      generateFruit();
      if (speed > MIN_SPEED) {
        speed -= SPEED_INCREMENT;
        clearInterval(loopId);
        loopId = setInterval(gameLoop, speed);
      }
    } else {
      snake.pop();
    }

    draw();
  }

  function gameLoop() {
    update();
  }

  function startLoop() {
    clearInterval(loopId);
    loopId = setInterval(gameLoop, speed);
  }

  startLoop();
```

- [ ] **Step 2: Verify snake moves**

Open browser. Snake should move right continuously. When it hits the right wall, game should end (even though endGame() isn't implemented yet, the setInterval will keep trying — this is expected for now).

- [ ] **Step 3: Commit**

```bash
git add snake-script.js
git commit -m "feat: add game loop, movement, and wall collision"
```

---

### Task 6: Implement Input Handling

**Files:**
- Modify: `snake-script.js`

**Interfaces:**
- Consumes: `nextDirection` state from Task 3
- Produces: `keydown` event listener that sets `nextDirection`

- [ ] **Step 1: Add input handler before startLoop()**

```javascript
  document.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) {
          nextDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (direction.y !== -1) {
          nextDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) {
          nextDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (direction.x !== -1) {
          nextDirection = { x: 1, y: 0 };
        }
        break;
    }
  });
```

- [ ] **Step 2: Verify arrow key controls work**

Open browser. Use arrow keys to change direction. Snake should respond. Cannot reverse direction (e.g., going right → pressing left does nothing).

- [ ] **Step 3: Commit**

```bash
git add snake-script.js
git commit -m "feat: add arrow key input handling with reversal prevention"
```

---

### Task 7: Implement Fruit Generation

**Files:**
- Modify: `snake-script.js`

**Interfaces:**
- Consumes: `snake` array from Task 3
- Produces: `generateFruit()` function that places fruit on empty cell

- [ ] **Step 1: Add generateFruit() function**

```javascript
  function generateFruit() {
    var emptyCells = [];
    for (var x = 0; x < GRID_SIZE; x++) {
      for (var y = 0; y < GRID_SIZE; y++) {
        var occupied = false;
        for (var i = 0; i < snake.length; i++) {
          if (snake[i].x === x && snake[i].y === y) {
            occupied = true;
            break;
          }
        }
        if (!occupied) {
          emptyCells.push({ x: x, y: y });
        }
      }
    }
    if (emptyCells.length === 0) {
      endGame();
      return;
    }
    fruit = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
```

- [ ] **Step 2: Verify fruit generation works**

Open browser. Eat the fruit (move snake to fruit position). New fruit should appear on a random empty cell, never on the snake. Score should increment.

- [ ] **Step 3: Commit**

```bash
git add snake-script.js
git commit -m "feat: add safe fruit generation on empty cells"
```

---

### Task 8: Implement Game Over and Restart

**Files:**
- Modify: `snake-script.js`

**Interfaces:**
- Consumes: All state from Tasks 3-7
- Produces: `endGame()` function, restart functionality

- [ ] **Step 1: Add endGame() function and restart listener**

```javascript
  function endGame() {
    gameOver = true;
    clearInterval(loopId);
    finalScoreElement.textContent = 'Punteggio: ' + score;
    gameOverElement.classList.remove('hidden');
  }

  document.addEventListener('keydown', function restartHandler(e) {
    if (gameOver) {
      init();
      draw();
      startLoop();
    }
  });
```

- [ ] **Step 2: Verify game over and restart work**

Open browser. Let snake hit wall. "GAME OVER" overlay should appear with final score. Press any key. Game should restart with score 0 and snake at starting position.

- [ ] **Step 3: Commit**

```bash
git add snake-script.js
git commit -m "feat: add game over screen and restart functionality"
```

---

### Task 9: Final Polish and Verification

**Files:**
- Review: `snake.html`, `snake-style.css`, `snake-script.js`

**Interfaces:**
- Consumes: All previous tasks
- Produces: Final tested, polished game

- [ ] **Step 1: Test complete gameplay loop**

Open browser and play through:
1. Snake moves correctly with arrow keys
2. Snake grows when eating fruit
3. Score increments correctly
4. Speed increases with score
5. Wall collision triggers game over
6. Self-collision triggers game over
7. Fruit never spawns on snake
8. Game restarts correctly after game over
9. Retro visual style looks correct

- [ ] **Step 2: Test edge cases**

1. Snake fills entire grid (should trigger endGame via emptyCells.length === 0)
2. Rapid direction changes (should not allow 180° reversal)
3. Speed caps at MIN_SPEED (50ms)

- [ ] **Step 3: Final commit**

```bash
git add snake.html snake-style.css snake-script.js
git commit -m "feat: complete Snake game with retro pixel art style"
```
