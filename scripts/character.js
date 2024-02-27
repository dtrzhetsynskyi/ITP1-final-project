class Character {
  constructor(initialX, initialY) {
    this.x = initialX;
    this.y = initialY;
  }

  draw(direction) {
    if (direction === "jumping-left") {
      this.drawJumpingLeft();
    } else if (direction === "jumping-right") {
      this.drawJumpingRight();
    } else if (direction === "walking-left") {
      this.drawWalkingLeft();
    } else if (direction === "walking-right") {
      this.drawWalkingRight();
    } else if (direction === "jumping-top") {
      this.drawJumpingTop();
    } else if (direction === "standing") {
      this.drawStanding();
    }
  }

  drawJumpingLeft() {
    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(gameChar_x - 8, gameChar_y - 58)
    rotate(40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(gameChar_x - 1, gameChar_y - 49)
    rotate(-30)
    rect(0, 0, 8, 33, 5)
    pop()

    rect(gameChar_x - 5, gameChar_y - 69, 15, 30, 5)

    push()
    translate(gameChar_x - 2, gameChar_y - 51)
    rotate(30)
    rect(0, 0, 8, 33, 5)
    pop()

    // Backpack
    fill(255)
    stroke(0)
    rect(gameChar_x + 17, gameChar_y - 107, 0.1, 50)
    rect(gameChar_x + 10, gameChar_y - 70, 10, 30, 5);

    // Helmet
    fill(255)
    stroke(0)
    ellipse(gameChar_x + 2, gameChar_y - 80, 25, 25);
    fill(0)
    ellipse(gameChar_x - 3, gameChar_y - 80, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(gameChar_x, gameChar_y - 82)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawJumpingRight() {
    noStroke()
    fill(244, 60, 31)
    // Right arm
    push()
    translate(gameChar_x + 13, gameChar_y - 60)
    rotate(-40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(gameChar_x - 1, gameChar_y - 49)
    rotate(-30)
    rect(0, 0, 8, 33, 5)
    pop()

    rect(gameChar_x - 5, gameChar_y - 69, 15, 30, 5)

    push()
    translate(gameChar_x - 2, gameChar_y - 51)
    rotate(30)
    rect(0, 0, 8, 33, 5)
    pop()

    // Backpack
    fill(255)
    stroke(0)
    rect(gameChar_x - 12, gameChar_y - 107, 0.1, 50)
    rect(gameChar_x - 15, gameChar_y - 70, 10, 30, 5);

    // Helmet
    fill(255)
    stroke(0)
    ellipse(gameChar_x + 2, gameChar_y - 80, 25, 25);
    fill(0)
    ellipse(gameChar_x + 7, gameChar_y - 80, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(gameChar_x + 5, gameChar_y - 82)
    rotate(30)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawWalkingLeft() {
    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(gameChar_x - 8, gameChar_y - 35)
    rotate(30)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(gameChar_x - 1, gameChar_y - 29)
    rotate(-20)
    rect(0, 0, 8, 33, 5)
    pop()

    rect(gameChar_x - 5, gameChar_y - 49, 15, 30, 5)

    push()
    translate(gameChar_x - 2, gameChar_y - 31)
    rotate(20)
    rect(0, 0, 8, 33, 5)
    pop()

    // Backpack
    fill(255)
    stroke(0)
    rect(gameChar_x + 17, gameChar_y - 87, 0.1, 50)
    rect(gameChar_x + 10, gameChar_y - 50, 10, 30, 5);

    // Helmet
    fill(255)
    stroke(0)
    ellipse(gameChar_x + 2, gameChar_y - 60, 25, 25);
    fill(0)
    ellipse(gameChar_x - 3, gameChar_y - 60, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(gameChar_x, gameChar_y - 62)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawWalkingRight() {
    noStroke()
    fill(244, 60, 31)
    // Right arm
    push()
    translate(gameChar_x + 13, gameChar_y - 37)
    rotate(-30)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(gameChar_x - 1, gameChar_y - 29)
    rotate(-20)
    rect(0, 0, 8, 33, 5)
    pop()

    rect(gameChar_x - 5, gameChar_y - 49, 15, 30, 5)

    push()
    translate(gameChar_x - 2, gameChar_y - 31)
    rotate(20)
    rect(0, 0, 8, 33, 5)
    pop()

    // Backpack
    fill(255)
    stroke(0)
    rect(gameChar_x - 12, gameChar_y - 87, 0.1, 50)
    rect(gameChar_x - 15, gameChar_y - 50, 10, 30, 5);

    // Helmet
    fill(255)
    stroke(0)
    ellipse(gameChar_x + 2, gameChar_y - 60, 25, 25);
    fill(0)
    ellipse(gameChar_x + 7, gameChar_y - 60, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(gameChar_x + 5, gameChar_y - 62)
    rotate(30)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawJumpingTop() {
    fill(255)
    stroke(0)
    rect(gameChar_x - 11, gameChar_y - 107, 0.1, 50)
    rect(gameChar_x - 17.5, gameChar_y - 72, 35, 30, 5);

    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(gameChar_x - 16, gameChar_y - 60)
    rotate(40)
    ellipse(0, 0, 7, 30)
    pop()

    // Right arm
    push()
    translate(gameChar_x + 17, gameChar_y - 60)
    rotate(-40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(gameChar_x - 10, gameChar_y - 51)
    rotate(10)
    rect(0, 0, 8, 33, 5)
    pop()

    push()
    translate(gameChar_x + 3, gameChar_y - 50)
    rotate(-10)
    rect(0, 0, 8, 33, 5)
    pop()
    rect(gameChar_x - 11, gameChar_y - 69, 23, 30, 5)

    // Helmet
    fill(255)
    stroke(0)
    ellipse(gameChar_x, gameChar_y - 80, 25, 25);
    fill(0)
    ellipse(gameChar_x, gameChar_y - 80, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(gameChar_x + 3, gameChar_y - 83)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawStanding() {
    // Backpack
    fill(255)
    stroke(0)
    rect(gameChar_x - 11, gameChar_y - 87, 0.1, 50)
    rect(gameChar_x - 17.5, gameChar_y - 52, 35, 30, 5);

    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(gameChar_x - 12, gameChar_y - 35)
    rotate(20)
    ellipse(0, 0, 7, 30)
    pop()

    // Right arm
    push()
    translate(gameChar_x + 12.7, gameChar_y - 35)
    rotate(-20)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    rect(gameChar_x - 11, gameChar_y - 31, 8, 33, 5)
    rect(gameChar_x + 4, gameChar_y - 31, 8, 33, 5)
    rect(gameChar_x - 11, gameChar_y - 49, 23, 30, 5)

    // Helmet
    fill(255)
    stroke(0)
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    fill(0)
    ellipse(gameChar_x, gameChar_y - 59, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(gameChar_x + 3, gameChar_y - 62)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }
}