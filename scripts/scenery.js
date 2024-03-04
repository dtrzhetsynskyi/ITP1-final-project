const BACKGROUND_MOUNTAINS_HEIGHT = 350;
const BACKGROUND_MOUNTAINS_WIDTH = 3000;

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

  drawGradientBackground() {
    const c2 = color(36, 120, 87)
    const c1 = color(4, 81, 56)

    push()
    const gradient = drawingContext.createLinearGradient(width / 2, 0, width / 2, height);
    gradient.addColorStop(0, c2);
    gradient.addColorStop(1, c1);
    drawingContext.fillStyle = gradient;
    rect(0, 0, width, height);
    pop()
  }

  drawGround() {
    noStroke();
    fill(209, 119, 41)
    rect(0, this.floorPos_y, width, height - this.floorPos_y);

    fill(223, 157, 96)
    rect(0, this.floorPos_y, width, 20)
  }

  drawBackgroundMountains() {
    let xoff1 = 0;
    let xoff2 = 5000;
    let xoff3 = 10000;

    // fill(150, 85, 29)
    fill(106, 104, 109)
    for (let x = -400; x < BACKGROUND_MOUNTAINS_WIDTH - 400; x++) {
      let y = noise(xoff1) * BACKGROUND_MOUNTAINS_HEIGHT;
      rect(x, this.floorPos_y - y, 1, y)

      xoff1 += 0.01;
    }

    // fill(119, 68, 20)
    fill(71, 69, 74)
    for (let x = -400; x < BACKGROUND_MOUNTAINS_WIDTH - 400; x++) {
      let y = noise(xoff2) * (BACKGROUND_MOUNTAINS_HEIGHT - 100);
      rect(x, this.floorPos_y - y, 1, y)

      xoff2 += 0.01;
    }

    // fill(89, 50, 17)
    fill(53, 53, 55)
    for (let x = -400; x < BACKGROUND_MOUNTAINS_WIDTH - 400; x++) {
      let y = noise(xoff3) * (BACKGROUND_MOUNTAINS_HEIGHT - 200);
      rect(x, this.floorPos_y - y, 1, y)

      xoff3 += 0.01;
    }
  }

  drawBackgroundStars() {
    fill(255)
    for (let i = 0; i < 100; i++) {
      const x = random() * 1024;
      const y = random() * 200;
      const size = random() * 3;
      ellipse(x, y, size, size)
    }
  }

  // drawBackgroundPlanet() {

  // }

  drawHopper() {
    push()
    fill(255)
    stroke(0)
    strokeWeight(2)
    beginShape()
    vertex(65, 400)
    vertex(69, 378)
    vertex(85, 378)
    vertex(89, 400)
    endShape()

    beginShape()
    vertex(92, 400)
    vertex(96, 378)
    vertex(112, 378)
    vertex(116, 400)
    endShape()
    pop();

    fill(255)
    rect(60, this.floorPos_y - 250, 60, 200, 20)
    ellipse(90, this.floorPos_y - 235, 60, 350)

    fill(0)
    triangle(60, 319, 25, this.floorPos_y + 10, 61, 370)
    triangle(120, 319, 155, this.floorPos_y + 10, 119, 370)

    ellipse(28, this.floorPos_y + 10, 30, 10)
    ellipse(153, this.floorPos_y + 10, 30, 10)


    rect(60, 150, 60, 30)

    push();
    stroke(0)
    fill(0, 88, 181)
    rect(75, 240, 30, 10)
    fill(247, 206, 0)
    rect(75, 250, 30, 10)
    pop();
  }
}