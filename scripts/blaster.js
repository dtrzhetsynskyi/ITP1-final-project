const BLASTER_MOVEMENT_INCREMENT = 0.3;

const BLASTER_DIRECTIONS = {
  right: "RIGHT",
  left: "LEFT",
  down: "DOWN",
  fallingDown: "FALLING_DOWN"
}

class Blaster {
  x = 0;
  y = 0;
  isFound = false;

  blasterDirection = BLASTER_DIRECTIONS.right;

  moveHeight = 0;
  moveDirection = -1;

  bullet;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    this.drawBlaster();
    this.drawBullet();
  }

  drawBlaster() {
    if (this.blasterDirection === BLASTER_DIRECTIONS.right || this.blasterDirection === BLASTER_DIRECTIONS.fallingDown) {
      noFill();
      stroke(255);
      rect(this.x + 2, this.y - 10, 6, 6, 2);

      fill(128, 128, 128)
      noStroke();
      rect(this.x - 3.5, this.y - 15, 7, 18);
      fill(255, 152, 1)
      rect(this.x - 6, this.y - 15.5, 20, 7, 5);
      rect(this.x + 7, this.y - 14, 16, 3, 5);
    } else if (this.blasterDirection === BLASTER_DIRECTIONS.left) {
      noFill();
      stroke(255);
      rect(this.x - 8, this.y - 10, 6, 6, 2);

      fill(128, 128, 128)
      noStroke();
      rect(this.x - 3.5, this.y - 15, 7, 18);
      fill(255, 152, 1)
      rect(this.x - 12, this.y - 15.5, 20, 7, 5);
      rect(this.x - 21, this.y - 14, 16, 3, 5);
    } else if (this.blasterDirection === BLASTER_DIRECTIONS.down) {
      ellipse(this.x, this.y, 5, 5);
      noStroke();
      fill(255, 152, 1)
      rect(this.x - 3.5, this.y - 10, 7, 20, 5);
      rect(this.x - 1.5, this.y + 3, 3, 16, 5);
    }
  }

  drawBullet() {
    if (!this.bullet) return;

    push();
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(246, 0, 2);
    fill(246, 0, 2);

    rect(this.bullet.x, this.bullet.y, 20, 5, 3);

    pop();
  }

  move() {
    if (!this.isFound) {
      this.y += BLASTER_MOVEMENT_INCREMENT * this.moveDirection;
      this.moveHeight += BLASTER_MOVEMENT_INCREMENT * this.moveDirection;

      if (abs(this.moveHeight) >= 10) {
        this.moveDirection *= -1;
        this.shoot();
      }
    } else if (this.isFound && this.blasterDirection === BLASTER_DIRECTIONS.fallingDown && this.y < height + 10) {
      this.y += 2;
    }

    if (this.bullet && this.bullet.distance <= 300) {
      this.bullet.distance += 10;
      this.bullet.x += 10 * this.bullet.direction;
    } else {
      this.bullet = null;
    }
  };

  shoot() {
    if (this.bullet !== null || this.blasterDirection === BLASTER_DIRECTIONS.down) return;

    if (this.blasterDirection === BLASTER_DIRECTIONS.right) {
      this.bullet = { x: this.x + 20, y: this.y - 15, distance: 0, direction: 1 };
    } else {
      this.bullet = { x: this.x - 35, y: this.y - 15, distance: 0, direction: -1 };
    }
  }
}