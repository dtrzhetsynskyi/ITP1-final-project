const JUMP_HEIGHT = 70;

class Character {
  x = 0;
  y = 0;

  jumpHeight = 0;
  isJumping = false;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  isShift = false;

  armRotationAngle = 0;

  constructor(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  changeState(state) {
    this.state = state;
  }

  move() {
    // update vertical position
    if (this.isPlummeting) {
      this.updatePosition(this.x, this.y + 3)
    } else if (this.isFalling) {
      this.updatePosition(this.x, this.y + 2);
    } else if (this.isJumping) {
      this.updatePosition(this.x, this.y - 5)
      this.jumpHeight += 5;
    }

    // update horizontal position
    if (this.isLeft) {
      this.updatePosition(this.x - 3, this.y)
    } else if (this.isRight) {
      this.updatePosition(this.x + 3, this.y)
    }
  }

  draw() {
    if (this.isLeft && this.isFalling) {
      this.drawFallingTo("left")
    } else if (this.isRight && this.isFalling) {
      this.drawFallingTo("right");
    } else if (this.isLeft) {
      this.drawWalkingTo("left")
    } else if (this.isRight) {
      this.drawWalkingTo("right")
    } else if (this.isFalling) {
      this.drawFalling();
    } else if (this.isPlummeting) {
      this.drawPlummeting();
    } else {
      this.drawStanding();
    }
  }

  drawFallingTo(direction) {
    if (direction === "left") {
      // Left arm
      noStroke()
      fill(244, 60, 31)
      push()
      translate(this.x - 8, this.y - 42)
      rotate(60)
      ellipse(0, 0, 7, 20)
      pop()

      push()
      translate(this.x - 16, this.y - 40)
      rotate(85)
      ellipse(0, 0, 7, 15)
      pop()

      // Body and legs
      push()
      translate(this.x - 1, this.y - 29)
      rotate(-30)
      rect(0, 0, 8, 33, 5)
      pop()

      rect(this.x - 5, this.y - 49, 15, 30, 5)

      push()
      translate(this.x - 3, this.y - 27)
      rotate(50)
      rect(0, 0, 8, 16, 5)
      pop()
      rect(this.x - 14, this.y - 20, 8, 15, 5);

      // Backpack
      fill(255)
      stroke(0)
      rect(this.x + 17, this.y - 87, 0.1, 50)
      rect(this.x + 10, this.y - 50, 10, 30, 5);

      // Helmet
      fill(255)
      stroke(0)
      ellipse(this.x + 2, this.y - 60, 25, 25);
      fill(0)
      ellipse(this.x - 3, this.y - 60, 15, 15);

      // Sun reflection on helmet
      fill(255)
      noStroke()
      push()
      translate(this.x, this.y - 62)
      rotate(150)
      ellipse(0, 0, 3, 5)
      pop()
    } else if (direction === "right") {
      noStroke()
      fill(244, 60, 31)
      // Right arm
      push()
      translate(this.x + 13, this.y - 42)
      rotate(-60)
      ellipse(0, 0, 7, 20)
      pop()
      rect(this.x + 9, this.y - 20, 8, 15, 5);

      push()
      translate(this.x + 20, this.y - 39)
      rotate(-85)
      ellipse(0, 0, 7, 15)
      pop()

      // Body and legs
      push()
      translate(this.x + 1, this.y - 22)
      rotate(-50)
      rect(0, 0, 8, 16, 5)
      pop()

      rect(this.x - 5, this.y - 49, 15, 30, 5)

      push()
      translate(this.x - 2, this.y - 31)
      rotate(30)
      rect(0, 0, 8, 33, 5)
      pop()

      // Backpack
      fill(255)
      stroke(0)
      rect(this.x - 12, this.y - 87, 0.1, 50)
      rect(this.x - 15, this.y - 50, 10, 30, 5);

      // Helmet
      fill(255)
      stroke(0)
      ellipse(this.x + 2, this.y - 60, 25, 25);
      fill(0)
      ellipse(this.x + 7, this.y - 60, 15, 15);

      // Sun reflection on helmet
      fill(255)
      noStroke()
      push()
      translate(this.x + 5, this.y - 62)
      rotate(30)
      ellipse(0, 0, 3, 5)
      pop()
    }
  }

  drawWalkingTo(direction) {
    if (direction === "left") {
      // Left arm
      noStroke()
      fill(244, 60, 31)
      push()
      translate(this.x - 8, this.y - 35)
      rotate(30)
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

      // Backpack
      fill(255)
      stroke(0)
      rect(this.x + 17, this.y - 87, 0.1, 50)
      rect(this.x + 10, this.y - 50, 10, 30, 5);

      // Helmet
      fill(255)
      stroke(0)
      ellipse(this.x + 2, this.y - 60, 25, 25);
      fill(0)
      ellipse(this.x - 3, this.y - 60, 15, 15);

      // Sun reflection on helmet
      fill(255)
      noStroke()
      push()
      translate(this.x, this.y - 62)
      rotate(150)
      ellipse(0, 0, 3, 5)
      pop()
    } else if (direction === "right") {
      noStroke()
      fill(244, 60, 31)
      // Right arm
      push()
      translate(this.x + 13, this.y - 37)
      rotate(-30)
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

      // Backpack
      fill(255)
      stroke(0)
      rect(this.x - 12, this.y - 87, 0.1, 50)
      rect(this.x - 15, this.y - 50, 10, 30, 5);

      // Helmet
      fill(255)
      stroke(0)
      ellipse(this.x + 2, this.y - 60, 25, 25);
      fill(0)
      ellipse(this.x + 7, this.y - 60, 15, 15);

      // Sun reflection on helmet
      fill(255)
      noStroke()
      push()
      translate(this.x + 5, this.y - 62)
      rotate(30)
      ellipse(0, 0, 3, 5)
      pop()
    }
  }

  drawFalling() {
    fill(255)
    stroke(0)
    rect(this.x - 11, this.y - 89, 0.1, 50)
    rect(this.x - 17.5, this.y - 54, 35, 30, 5);

    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(this.x - 16, this.y - 42)
    rotate(40)
    ellipse(0, 0, 7, 30)
    pop()

    // Right arm
    push()
    translate(this.x + 17, this.y - 42)
    rotate(-40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(this.x - 10, this.y - 33)
    rotate(10)
    rect(0, 0, 8, 33, 5)
    pop()

    push()
    translate(this.x + 3, this.y - 32)
    rotate(-10)
    rect(0, 0, 8, 33, 5)
    pop()
    rect(this.x - 11, this.y - 51, 23, 30, 5)

    // Helmet
    fill(255)
    stroke(0)
    ellipse(this.x, this.y - 62, 25, 25);
    fill(0)
    ellipse(this.x, this.y - 63, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(this.x + 3, this.y - 66)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawPlummeting() {
    fill(255)
    stroke(0)
    rect(this.x - 11, this.y - 89, 0.1, 50)
    rect(this.x - 17.5, this.y - 54, 35, 30, 5);

    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(this.x - 16, this.y - 50)
    rotate(120)
    ellipse(0, 0, 7, 30)
    pop()

    // Right arm
    push()
    translate(this.x + 17, this.y - 50)
    rotate(-120)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(this.x - 10, this.y - 33)
    rotate(10)
    rect(0, 0, 8, 33, 5)
    pop()

    push()
    translate(this.x + 3, this.y - 32)
    rotate(-10)
    rect(0, 0, 8, 33, 5)
    pop()
    rect(this.x - 11, this.y - 51, 23, 30, 5)

    // Helmet
    fill(255)
    stroke(0)
    ellipse(this.x, this.y - 62, 25, 25);
    fill(0)
    ellipse(this.x, this.y - 63, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(this.x + 3, this.y - 66)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawStanding() {
    // Backpack
    fill(255)
    stroke(0)
    rect(this.x - 11, this.y - 87, 0.1, 50)
    rect(this.x - 17.5, this.y - 52, 35, 30, 5);

    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(this.x - 12, this.y - 35)
    rotate(20)
    ellipse(0, 0, 7, 30)
    pop()

    // Right arm
    push()
    translate(this.x + 12.7, this.y - 35)
    rotate(-20)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    rect(this.x - 11, this.y - 31, 8, 33, 5)
    rect(this.x + 4, this.y - 31, 8, 33, 5)
    rect(this.x - 11, this.y - 49, 23, 30, 5)

    // Helmet
    fill(255)
    stroke(0)
    ellipse(this.x, this.y - 60, 25, 25);
    fill(0)
    ellipse(this.x, this.y - 59, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(this.x + 3, this.y - 62)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }
}