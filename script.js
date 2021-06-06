let canvas;
let context;
let gameLoop;
const points = document.querySelector('.points');
const gameOver = document.querySelector('.gameOver');


const boardX = 300;
const boardY = 300;
const paddleH = 10;
const paddleD = boardY - paddleH;
const paddleW = 150;

let paddleX = 150;
let ballX = 150;
let ballY = 150;
let ballDX = randomBall();
let ballDY = randomBall();
let cont = 0;


function drawGameCanvas() {
    canvas = document.getElementById('gameBoard');

    if (canvas.getContext) {
        context = canvas.getContext('2d');
        gameLoop = setInterval(draw, 16);
        window.addEventListener('keydown', ketInput, true);
    }
}

function randomBall() {
    let myarray = [-4, -3, -2, 2, 3, 4];
    return myarray[Math.floor(Math.random() * myarray.length)];
}

function resetGame() {
    paddleX = 150;
    ballX = 150;
    ballY = 150;
    ballDX = randomBall();
    ballDY = randomBall();
    cont = 0;
    gameOver.textContent = '';
    document.getElementById("resetButton").style.display = 'none';
    points.textContent = '';

    drawGameCanvas();
}

function draw() {
    context.clearRect(0, 0, boardX, boardY);

    context.fillStyle = 'thistle';
    context.beginPath();
    context.rect(0, 0, boardX, boardY);
    context.closePath();
    context.fill();

    context.fillStyle = 'tomato';
    context.beginPath();
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    context.fillStyle = 'navy';
    context.beginPath();
    context.rect(paddleX, paddleD, paddleW, paddleH);
    context.closePath();
    context.fill();

    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballDX > boardX - 15 || ballX + ballDX < 15) {
        ballDX = -ballDX;
    }

    if (ballY + ballDY < 15) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > boardY - 15) {
        if (ballX > paddleX && ballX < paddleX + paddleW) {
            ballDY = -ballDY;
            cont += 1;
            points.textContent = 'Points: ' + cont;
        } else {
            clearInterval(gameLoop);
            gameOver.textContent = 'Game Over!';
            document.getElementById("resetButton").style.display = 'inline';
            document.getElementById("resetButton").addEventListener('click', resetGame);
        }
    }
}


function ketInput(e) {
    switch (e.keyCode) {
        case 37:
            paddleX -= 20;
            if (paddleX < 0) {
                paddleX = 0;
            }
            break;

        case 39:
            paddleX += 20;
            if (paddleX > boardX - paddleW) {
                paddleX + boardX - paddleW;
            }
            break;
    }
}
drawGameCanvas();

