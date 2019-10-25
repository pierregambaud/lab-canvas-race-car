class Car {
  constructor() {
    // this.img
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth/img.naturalHeight;

      //
      // Iteration #2
      //

      this.w = 100;
      this.h = this.w/imgRatio; // use ratio to compute `carHeight`

      this.x = W/2-this.w/2;
      this.y = H-this.h-100;
    }
    img.src = "images/car.png";
  }

  draw() {
    if (!this.img) return; // if `this.img` is not loaded yet => don't draw

    //
    // Iteration #2
    //
    
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  //
  // Iteration #3: moves
  //

  moveLeft() {
    this.x += -20;
  }
  moveRight() {
    this.x += 20;
  }
}