function random(from, to) {
  // TODO
  var from = from;
  var to = to;

  return from+Math.random()*(to-from);
}

class Obstacle {
  constructor() {
    // TODO
    this.w = random(1/4*W, 1/2*W);
    this.h = H/20;
    this.x = random(greenWidth, W-greenWidth-this.w);
    this.y = 0;
    this.color = `yellow`;
  }

  draw() {
    // TODO
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    console.log(this.x, this.y, this.w, this.h);
  }

  hits(car) {
    // TODO
  }
}