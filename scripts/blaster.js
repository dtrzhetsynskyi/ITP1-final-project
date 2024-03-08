const BLASTER_MOVEMENT_INCREMENT = 0.3;

class Blaster {
  x = 0;
  y = 0;
  isFound = false;

  moveHeight = 0;
  moveDirection = -1;

  bullet;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    noFill();
    stroke(255);
    rect(this.x + 7, this.y - 3, 10, 10, 2);

    fill(128, 128, 128)
    noStroke();
    rect(this.x - 2.5, this.y - 5, 10, 20);
    fill(255, 152, 1)
    rect(this.x - 8, this.y - 10, 30, 10, 5);
    rect(this.x + 20, this.y - 8, 20, 5, 5);
    rect(this.x + 25, this.y - 13, 5, 15, 5);

    if (this.bullet && this.bullet.distance <= 200) {
      push();
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color(246, 0, 2);
      fill(246, 0, 2);
      rect(this.bullet.x + this.bullet.distance, this.bullet.y, 20, 5, 3);
      pop();
    } else {
      this.bullet = null;
    }
  }

  move() {
    if (!this.isFound) {
      this.y += BLASTER_MOVEMENT_INCREMENT * this.moveDirection;
      this.moveHeight += BLASTER_MOVEMENT_INCREMENT * this.moveDirection;

      if (abs(this.moveHeight) >= 10) {
        this.moveDirection *= -1;
        this.shoot();
      }
    }


    if (this.bullet && this.bullet.distance <= 200) {
      this.bullet.x += 4;
      this.bullet.distance += 5;
    } else {
      this.bullet = null;
    }
  };

  shoot() {
    if (this.bullet) return;
    this.bullet = { x: this.x + 40, y: this.y - 8, distance: 0 };
  }
}