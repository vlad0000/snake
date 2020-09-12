const canvas = document.getElementById('game'),
  ctx = canvas.getContext('2d'),
  ground = new Image(),
  foodImg = new Image()
let box = 32,
    score = 0;
let speed = 500;


let game = setInterval(drawGame, speed);

let food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
}


ground.src = "/img/ground.png";
foodImg.src = "/img/food.png"

document.addEventListener("keydown", direction);
let dir;

function direction(event) {
  if ((event.keyCode == 37 || event.keyCode == 65) && dir != 'right')
    dir = 'left';
  else if ((event.keyCode == 39 || event.keyCode == 68) && dir != 'left')
    dir = 'right';
  else if ((event.keyCode == 38 || event.keyCode == 87) && dir != 'down')
    dir = 'up';
  else if ((event.keyCode == 40 || event.keyCode == 83) && dir != 'up')
    dir = 'down';
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x,
      snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y){
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    speed -= score *10;
    console.log(speed);
  }else{
    snake.pop();
  }
  
  if (dir == 'left') snakeX -= box;
  if (dir == 'right') snakeX += box;
  if (dir == 'up') snakeY -= box;
  if (dir == 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  if (snakeX > box*18) {alert('game over d'); dir = ''}
  if (snakeX < 0) {alert('game over a'); dir = ''}
  if (snakeY < box*2) {alert('game over w'); dir = ''}
  if (snakeY > box*18) {alert('game over s'); dir = ''}
  snake.unshift(newHead)

  console.log(game);
}

