function random(from, to) {
  return from+Math.random()*(to-from);
}

class Obstacle {
  constructor() {
    this.w = random(1/4*W, 1/2*W);
    this.h = H/20;
    this.x = random(greenWidth, W-greenWidth-this.w);
    this.y = 0;
    this.color = `yellow`;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  hits(car) {
    var bottomCar = topCar + car.h;
    var leftCar = car.x;
    var rightCar = car.x + car.w;

    var topObstacle = this.y;
    var bottomObstacle = this.y + this.h;
    var leftObstacle = this.x;
    var rightObstacle = this.x + this.w;
    
    if ((bottomObstacle < bottomCar && bottomObstacle > topCar) ||
      (topObstacle < bottomCar && topObstacle > topCar)) {

      return (
        (leftCar < rightObstacle && rightCar > leftObstacle) ||
        (rightCar > leftObstacle && rightCar < rightObstacle)
      );
    }
  }
}