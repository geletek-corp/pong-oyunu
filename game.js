const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const FPS = 60;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 5;

function drawFillRect(x, y, width, height, color) {
    context.fillStyle = color;
    
    context.fillRect(x, y, width, height);
}

function drawFillCircle(x, y, radius, color) {
    context.fillStyle = color;
    
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
}

function drawrFillText(x, y, text, color) {
    context.fillStyle = color;
    context.font = "48px sans-serif";
    
    context.fillText(text, x, y);
}

var player1 = {
    x: canvas.width / 32,
    y: canvas.height / 2,
    width: canvas.width / 50,
    height: canvas.width / 10,
    score: 0
};

var player2 = {
    x: 30 * (canvas.width / 32),
    y: canvas.height / 2,
    width: canvas.width / 50,
    height: canvas.width / 10,
    score: 0
};

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: (canvas.width / 200) + (canvas.height / 100),
    speed: canvas.width / 25 * 0.1,
    velocityX: -1,
    velocityY: 1
};

function update() {
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;
    
    // Collide edge check
    if (ball.y - (ball.radius / 2) < 0) {
        ball.velocityY *= -1;
    }
    else if (ball.y + (ball.radius / 2) > canvas.height) {
        ball.velocityY *= -1;
    }
    
    // Collide player check
    if (ball.x - (ball.radius / 2) <= player1.x + player1.width &&
        ball.y - (ball.radius / 2) >= player1.y &&
        ball.y + (ball.radius / 2) <= player1.y + player1.height)
    {
        ball.velocityX *= -1;
    }
    else if (ball.x - (ball.radius / 2) >= player2.x - player2.width &&
        ball.y - (ball.radius / 2) >= player2.y &&
        ball.y + (ball.radius / 2) <= player2.y + player2.height)
    {
        ball.velocityX *= -1;
    }
    
    // Check goalll
    if (ball.x > canvas.width) {
        player1.score++;
        
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        
        ball.speed += 0.1;
    }
    else if (ball.x < 0) {
        player2.score++;
        
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        
        ball.speed += 0.1;
    }
    
    // This is multi super mega ultra pro ai
    player2.y = ball.y - (player2.height / 2);
}

function render() {
    
    // update canvas size for window resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 10;
    
    drawFillRect(0, 0, canvas.width, canvas.height, '#000000');
    
    // player1
    drawFillRect(player1.x, player1.y, player1.width, player1.height, '#ffffff');
    // player2
    drawFillRect(player2.x, player2.y, player2.width, player2.height, '#ffffff');
    
    // draw ball
    drawFillCircle(ball.x, ball.y, ball.radius, '#ffffff');
    
    // draw score text
    drawrFillText(canvas.width / 4, canvas.height / 2 * 0.5, player1.score, '#ffffff');
    drawrFillText((canvas.width / 4) * 3, canvas.height / 2 * 0.5, player2.score, '#ffffff');
}

document.addEventListener('mousemove', (e) => {
    player1.y = e.clientY - (player1.height / 2);
});
/*
document.addEventListener('keypress', (e) => {
    if (e.code == "KeyW") {
        player2.velocityY = -10;
    }
    else if (e.code == "KeyS") {
        player2.velocityY = 10;
    }
});*/

setInterval(update, 1000/60);
setInterval(render, 1000/FPS);