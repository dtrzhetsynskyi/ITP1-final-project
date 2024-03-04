// Configuration constants
const BACKGROUND_MOUNTAINS_HEIGHT = 350;
const BACKGROUND_MOUNTAINS_WIDTH = 3000;

const HOPPER_POSITION_X = 250;
const HOPPER_POSITION_Y = 440;

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

  // Draw background moutains using Perlin noise algorithm.
  // Algorithm Reference: https://en.wikipedia.org/wiki/Perlin_noise
  drawBackgroundMountains(graphicsLayer) {
    let xoff1 = 0;
    let xoff2 = 5000;
    let xoff3 = 10000;

    // fill(150, 85, 29)
    graphicsLayer.fill(106, 104, 109);
    for (let x = 0; x < BACKGROUND_MOUNTAINS_WIDTH; x++) {
      let y = noise(xoff1) * BACKGROUND_MOUNTAINS_HEIGHT;
      graphicsLayer.rect(x, graphicsLayer.height - y, 1, y)

      xoff1 += 0.01;
    }

    // fill(119, 68, 20)
    graphicsLayer.fill(71, 69, 74);
    for (let x = 0; x < BACKGROUND_MOUNTAINS_WIDTH; x++) {
      let y = noise(xoff2) * (BACKGROUND_MOUNTAINS_HEIGHT - 100);
      graphicsLayer.rect(x, graphicsLayer.height - y, 1, y)

      xoff2 += 0.01;
    }

    // fill(89, 50, 17)
    graphicsLayer.fill(53, 53, 55);
    for (let x = 0; x < BACKGROUND_MOUNTAINS_WIDTH; x++) {
      let y = noise(xoff3) * (BACKGROUND_MOUNTAINS_HEIGHT - 200);
      graphicsLayer.rect(x, graphicsLayer.height - y, 1, y)

      xoff3 += 0.01;
    }
  }

  // Draw background stars
  drawBackgroundStars(graphicsLayer) {
    graphicsLayer.fill(255);
    graphicsLayer.noStroke();
    for (let i = 0; i < 30; i++) {
      const x = random() * 1024;
      const y = map(random(), 0, 1, 10, 150);
      const size = map(random(), 0, 1, 1, 4);

      graphicsLayer.drawingContext.shadowBlur = 32;
      graphicsLayer.drawingContext.shadowColor = color(255);
      graphicsLayer.ellipse(x, y, size, size)
    }
  }

  // Draw a static space hopper
  drawHopper() {
    // draw thrusters
    push()
    fill(255)
    stroke(0)
    strokeWeight(2)
    beginShape()
    vertex(HOPPER_POSITION_X - 25, HOPPER_POSITION_Y - 40)
    vertex(HOPPER_POSITION_X - 21, HOPPER_POSITION_Y - 62)
    vertex(HOPPER_POSITION_X - 5, HOPPER_POSITION_Y - 62)
    vertex(HOPPER_POSITION_X - 1, HOPPER_POSITION_Y - 40)
    endShape()

    beginShape()
    vertex(HOPPER_POSITION_X + 2, HOPPER_POSITION_Y - 40)
    vertex(HOPPER_POSITION_X + 6, HOPPER_POSITION_Y - 62)
    vertex(HOPPER_POSITION_X + 22, HOPPER_POSITION_Y - 62)
    vertex(HOPPER_POSITION_X + 26, HOPPER_POSITION_Y - 40)
    endShape()
    pop();

    // draw body
    fill(255)
    rect(HOPPER_POSITION_X - 30, this.floorPos_y - 250, 60, 200, 20)
    ellipse(HOPPER_POSITION_X, this.floorPos_y - 235, 60, 350)

    // draw tripod
    fill(0)
    triangle(HOPPER_POSITION_X - 30, HOPPER_POSITION_Y - 121, HOPPER_POSITION_X - 65, this.floorPos_y + 10, HOPPER_POSITION_X - 29, HOPPER_POSITION_Y - 70)
    triangle(HOPPER_POSITION_X + 30, HOPPER_POSITION_Y - 121, HOPPER_POSITION_X + 65, this.floorPos_y + 10, HOPPER_POSITION_X + 29, HOPPER_POSITION_Y - 70)
    ellipse(HOPPER_POSITION_X - 62, this.floorPos_y + 10, 30, 10)
    ellipse(HOPPER_POSITION_X + 63, this.floorPos_y + 10, 30, 10)

    // draw part
    rect(HOPPER_POSITION_X - 30, HOPPER_POSITION_Y - 290, 60, 30)

    // draw Ukrainian flag
    push();
    stroke(0)
    fill(0, 88, 181)
    rect(HOPPER_POSITION_X - 15, HOPPER_POSITION_Y - 200, 30, 10)
    fill(247, 206, 0)
    rect(HOPPER_POSITION_X - 15, HOPPER_POSITION_Y - 190, 30, 10)
    pop();
  }
}