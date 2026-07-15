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

  function endGame() {
    gameOver = true;
    clearInterval(loopId);
    finalScoreElement.textContent = 'Punteggio: ' + score;
    gameOverElement.classList.remove('hidden');
  }

  document.addEventListener('keydown', function(e) {
    if (gameOver) {
      init();
      draw();
      startLoop();
      return;
    }

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

  init();
  draw();
  startLoop();
})();
