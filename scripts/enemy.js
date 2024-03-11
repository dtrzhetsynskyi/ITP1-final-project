/*

Enemy

*/

class Enemy {
  x = 0;
  y = 0;
  patrolRadius = 0;
  currentPatrolRadius = 0;
  moveDirection = 1;

  isEliminated = false;

  constructor(x, y, patrolRadius, moveDirection) {
    this.x = x;
    this.y = y;
    this.patrolRadius = patrolRadius;
    this.moveDirection = moveDirection;
  }

  // Render enemy
  render() {
    if (this.moveDirection === -1) {
      // Left arm
      noStroke()
      fill(225, 30, 2)
      push()
      translate(this.x - 10, this.y - 44)
      rotate(90)
      ellipse(0, 0, 7, 30)
      pop()

      // Body and legs
      push()
      translate(this.x - 1, this.y - 29)
      rotate(-20)
      rect(0, 0, 8, 33, 5)
      pop()

      rect(this.x - 5, this.y - 49, 15, 30, 5)

      push()
      translate(this.x - 2, this.y - 31)
      rotate(20)
      rect(0, 0, 8, 33, 5)
      pop()

      // Helmet
      fill(255)
      stroke(0)
      ellipse(this.x + 2, this.y - 60, 25, 25);

      fill(0)
      ellipse(this.x - 2, this.y - 63, 5, 5);
    } else if (this.moveDirection === 1) {
      noStroke();
      fill(225, 30, 2);
      // Right arm
      push()
      translate(this.x + 17, this.y - 45)
      rotate(-90)
      ellipse(0, 0, 7, 30)
      pop()

      // Body and legs
      push()
      translate(this.x - 1, this.y - 29)
      rotate(-20)
      rect(0, 0, 8, 33, 5)
      pop()

      rect(this.x - 5, this.y - 49, 15, 30, 5)

      push()
      translate(this.x - 2, this.y - 31)
      rotate(20)
      rect(0, 0, 8, 33, 5)
      pop()

      // Helmet
      fill(255)
      stroke(0)
      ellipse(this.x + 2, this.y - 60, 25, 25);

      fill(0)
      ellipse(this.x + 5, this.y - 63, 5, 5);
    }
  }

  // Move enemy
  move() {
    if (this.patrolRadius === 0) return;

    this.currentPatrolRadius += 2 * this.moveDirection;
    this.x += 2 * this.moveDirection;

    if (abs(this.currentPatrolRadius) >= this.patrolRadius) {
      this.moveDirection *= -1;
    }
  }
}