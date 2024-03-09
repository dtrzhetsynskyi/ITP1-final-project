const PLATFORM_MOVEMENT_INCREMENT = 0.5;

class Platform {
  x = 0;
  y = 0;

  moveDistance = 0;
  currentMoveDistance = 0;
  moveDirection = 1;

  constructor(x, y, moveDistance) {
    this.x = x;
    this.y = y;
    this.moveDistance = moveDistance;
  }

  draw() {
    push();
    fill(215, 148, 94);
    rect(this.x - 50, this.y, 100, 20, 10);
    fill(0)
    ellipse(this.x, this.y, 5, 5);
    pop();
  }

  move() {
    if (this.moveDistance === 0) return;

    this.currentMoveDistance += PLATFORM_MOVEMENT_INCREMENT * this.moveDirection;
    this.x += PLATFORM_MOVEMENT_INCREMENT * this.moveDirection;

    if (abs(this.currentMoveDistance) >= this.moveDistance) {
      this.moveDirection *= -1;
    }
  }
}