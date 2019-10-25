let car;
let obstacles;
let gameover;
let points;

const ctx = document.querySelector('#game-board canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function draw() {
  ctx.clearRect(0,0,W,H); // 🧽

  //
  // Iteration 1: road drawing
  //

  ctx.fillStyle = '#3d8305';
  ctx.fillRect(0,0, W,H);

  ctx.fillStyle = '#808080';
  ctx.fillRect(70,0, W-2*70,H);

  ctx.fillStyle = 'white';
  ctx.fillRect(100,0, 25,H);
  ctx.fillStyle = 'white';
  ctx.fillRect(W-100-25,0, 25,H);

  ctx.beginPath();
  ctx.lineWidth = 13;
  ctx.strokeStyle = 'white';
  ctx.setLineDash([50, 40]);
  ctx.moveTo(500,0); ctx.lineTo(500,H);
  ctx.stroke();

  //
  // Iteration 2: car drawing
  //

  car.draw();

  //
  // Iteration #4: obstacles
  //

  if (frames % 150 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }

  obstacles.forEach(function (obstacle) {
    obstacle.y += 5;
    obstacle.draw();
  });

  //
  // Iteration #5: collisions
  //

  for (obstacle of obstacles) {
    if (obstacle.hits(car)) {
      console.log('crashed');
      gameover = true;
    }
  }

  //
  // Iteration #6: points
  //

  ctx.font = "50px Arial";
  ctx.textAlign = "right";
  ctx.fillStyle = "orange";
  ctx.fillText(`${points} pts`, W-50, 100);
  points++;

}

document.onkeydown = function (e) {
  if (!car) return;
  
  console.log('keydown');
  switch (e.keyCode) {
    case 37:
      // left
      car.moveLeft();
      break;
    case 39:
      //right
      car.moveRight();
      break;
  }
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
  gameover = false;
  points = 0;

  car = new Car();
  obstacles = [];

  requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
  startGame();
};

// auto-start
startGame();