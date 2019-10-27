let car;
let obstacles = [];
let gameover;
let points = 0;

const ctx = document.querySelector('canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

let greyWidth = W/20;
let greenWidth = W/10;
let whiteWidth = W/40;
let topCar = H * 8/10;  

function draw() {
  //
  // Iteration 1: road drawing
  //

  ctx.clearRect(0,0,W,H);

  ctx.fillStyle = `grey`;
  ctx.fillRect(0,0,W,H);

  ctx.fillStyle = `green`;
  ctx.fillRect(0,0,greenWidth,H);
  ctx.fillRect(W-greenWidth,0,greenWidth,H);

  ctx.fillStyle = `white`;
  ctx.fillRect(greenWidth+greyWidth,0,whiteWidth,H);
  ctx.fillRect(W-greenWidth-greyWidth-whiteWidth,0,whiteWidth,H);

  // dotted white line
  ctx.beginPath();
  ctx.strokeStyle = `white`;
  ctx.lineWidth = whiteWidth/2;
  ctx.setLineDash([50,55]);
  ctx.moveTo(W/2, 0);
  ctx.lineTo(W/2, H);
  ctx.stroke();


  //
  // Iteration #4: obstacles
  //

  obstacles.forEach(obstacle => {
    obstacle.y += 2;
    obstacle.draw();
  });


  //
  // Iteration 2: car drawing
  // ORDER CHANGE: ordered after drawing obstacles to be always displayed on top position on the canvas
  //

  car.draw();
  
  
  //
  // Iteration #5: collisions
  //

  if(obstacles.length !== 0) {
    obstacles.forEach(obstacle => {
      if (obstacle.hits(car)) return gameover = true;
    });
  }


  //
  // Iteration #6: points
  //

  var scoreText;
  if(points !== 0) {
    scoreText = `Score: ${points}`;
  } else {
    scoreText = `Score: 0`;
  }

  ctx.fillStyle = "#870007";
  ctx.fillRect(0,0, 300, 90);
  ctx.font = "50px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(scoreText, 150, 60);
}

document.onkeydown = function (e) {
  if (!car) return;
}

let frames = 0;
function animLoop() {
  frames++;
  points = Math.floor(frames / 100);

  if(frames % 300 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }

  draw();
  
  if (!gameover) {
    requestAnimationFrame(animLoop);
  } else {
    ctx.fillStyle = "#870007";
    ctx.fillRect(0,0, W, 90);
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    scoreText = `Game over: your final score is ${points}!`;
    ctx.fillText(scoreText, W/2, 60);
  }
}

function startGame() {
  car = new Car();
  
  requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
  frames = 0;
  points = 0;
  obstacles = [];
  gameover = false;
  startGame();
};

document.onkeydown = function(e) {
  switch(e.keyCode){
    case 37: // move left
      car.moveLeft();
      break;
    case 39: // move right
      car.moveRight();
      break;
  }
};

// auto-start
startGame();