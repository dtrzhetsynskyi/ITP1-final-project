// Draw collectable

const COLLECTABLE_MOVEMENT_INCREMENT = 0.5;

class Collectable {
  x = 0;
  y = 0;
  size = 30;
  isFound = false;

  moveHeight = 0;
  moveDirection = -1;

  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  // Draw collectable
  draw() {
    stroke(0)
    fill(233, 184, 36);
    ellipse(this.x, this.y, this.size, this.size);
    noStroke();
    fill(238, 147, 34)
    ellipse(this.x, this.y, 0.7 * this.size, 0.7 * this.size);

    fill(255);
    textSize(16);
    text("$", this.x - 5, this.y + 5);
  };

  move() {
    if (!this.isFound) {
      this.y += COLLECTABLE_MOVEMENT_INCREMENT * this.moveDirection;
      this.moveHeight += COLLECTABLE_MOVEMENT_INCREMENT * this.moveDirection;

      if (abs(this.moveHeight) >= 10) {
        this.moveDirection *= -1;
      }
    }
  }
}