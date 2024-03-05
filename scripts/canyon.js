class Canyon {
  x = 0;
  y = 0;
  width = 0;
  height = 0;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Draw canyon using Perlin noise algorithm.
  // Algorithm Reference: https://en.wikipedia.org/wiki/Perlin_noise
  draw() {
    fill(148, 84, 36);
    rect(this.x, this.y, this.width, this.height);

    let xoff = 0;

    fill(209, 119, 41)
    for (let crackY = this.y; crackY < height; crackY++) {
      let crackWidth = noise(xoff) * 30;
      rect(this.x, crackY, crackWidth, 1);

      rect(this.width + this.x - crackWidth, crackY, crackWidth, 1);

      xoff += 0.03;
    }
  }
}