const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const canvasSize = 750;
const boxCount = canvasSize / box; // Number of boxes per row/column
const snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let gameSpeed = 150;
let score = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * boxCount),
            y: Math.floor(Math.random() * boxCount)
        };
        score += 1;
    } else {
        snake.pop();
    }
}

function collision() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.x >= boxCount ||
        head.y < 0 ||
        head.y >= boxCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function draw() {
    if (collision()) {
        clearInterval(game);
        alert("Game Over! Your score: " + score);
        location.reload();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();
        document.getElementById("score").innerText = score;
    }
}

document.addEventListener("keydown", e => {
    if (e.keyCode === 37 && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (e.keyCode === 38 && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (e.keyCode === 39 && dx === 0) {
        dx = 1;
        dy = 0;
    } else if (e.keyCode === 40 && dy === 0) {
        dx = 0;
        dy = 1;
    }
});

document.getElementById("upButton").addEventListener("click", () => {
    if (dy === 0) {
        dx = 0;
        dy = -1;
    }
});

document.getElementById("downButton").addEventListener("click", () => {
    if (dy === 0) {
        dx = 0;
        dy = 1;
    }
});

document.getElementById("leftButton").addEventListener("click", () => {
    if (dx === 0) {
        dx = -1;
        dy = 0;
    }
});

document.getElementById("rightButton").addEventListener("click", () => {
    if (dx === 0) {
        dx = 1;
        dy = 0;
    }
});

let game = setInterval(draw, gameSpeed);
