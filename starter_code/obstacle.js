function random(from, to) {
  return Math.floor(from + Math.random()*(to - from));
}

class Obstacle {
  constructor() {
    this.w = random(W/3, 2/3*W); // between 1/3 and 2/3 of W
    this.h = 100;

    this.x = random(0, W-this.w);
    this.y = -this.h;
  }

  draw() {
    ctx.fillRect(this.x,this.y, this.w,this.h);
  }

  hits(car) {
    return (
      (car.x+car.w >= this.x && car.x <= this.x+this.w) // ---|🚗|---
      &&
      (car.y <= this.y+this.h && car.y+car.h >= this.y)
    );
  }
}