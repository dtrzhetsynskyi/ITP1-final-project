class Scenery {
  floorPos_y = 0;

  constructor(floorPos_y) {
    this.floorPos_y = floorPos_y;
  }

  // Draw static scenery
  drawStatic() {
    // add a gradient background
    this.drawGradientBackground();

    // draw ground
    this.drawGround();
  }

  // Draw gradient background using drawing context
  drawGradientBackground() {
    const c1 = color(4, 81, 56)
    const c2 = color(36, 120, 87)

    push()
    const gradient = drawingContext.createLinearGradient(width / 2, 0, width / 2, height);
    gradient.addColorStop(0, c2);
    gradient.addColorStop(1, c1);
    drawingContext.fillStyle = gradient;

    rect(0, 0, width, height);
    pop()
  }

  // Draw sand ground
  drawGround() {
    noStroke();
    fill(209, 119, 41)
    rect(0, this.floorPos_y, width, height - this.floorPos_y);

    fill(223, 157, 96)
    rect(0, this.floorPos_y, width, 20)
  }
}