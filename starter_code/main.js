let car;
let obstacles;
let gameover;
let points;

const ctx = document.querySelector('canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

let greyWidth = W/20;
let greenWidth = W/10;
let whiteWidth = W/40;

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
  // Iteration 2: car drawing
  //

  car.draw();


  //
  // Iteration #4: obstacles
  //

  obstacles.draw();

  //
  // Iteration #5: collisions
  //

  // TODO

  //
  // Iteration #6: points
  //

  // TODO

}

document.onkeydown = function (e) {
  if (!car) return;
  
  // TODO
}

let frames = 0;
function animLoop() {
  frames++;

  draw();
  
  if (!gameover) {
    requestAnimationFrame(animLoop);
  }
}

function startGame() {
  // TODO
  car = new Car();
  obstacles = new Obstacle();
  requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
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