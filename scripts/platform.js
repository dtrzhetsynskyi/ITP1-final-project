const PLATFORM_MOVEMENT_INCREMENT = 1;

class Platform {
  x = 0;
  y = 0;
  width = 50;

  moveDistance = 0;
  currentMoveDistance = 0;
  moveDirection = 1;

  constructor(x, y, width, moveDistance) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.moveDistance = moveDistance;
  }

  draw() {
    push();
    fill(215, 148, 94);
    rect(this.x - this.width / 2, this.y, this.width, 20, 10);
    fill(0);
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