const CHARACTER_STATES = {
  falling: "FALLING",
  jumpingTop: "JUMPING",
  jumpingLeft: "JUMPING_LEFT",
  jumpingRight: "JUMPING_RIGHT",
  walkingLeft: "WALKING_LEFT",
  walkingRight: "WALKING_RIGHT",
  standing: "STANDING",
  falling: "FALLING",
  plummeting: "PLUMMETING",
  runningLeft: "RUNNING_LEFT",
  runningRight: "RUNNING_RIGHT"
}

class Character {
  x = 0;
  y = 0;
  state = CHARACTER_STATES.standing;

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
    if (this.state === CHARACTER_STATES.plummeting) {
      this.updatePosition(this.x, this.y + 3)
    } else if (this.state === CHARACTER_STATES.falling) {
      this.updatePosition(this.x, this.y + 2)
    } else if (this.state === CHARACTER_STATES.jumping) {
      this.updatePosition(this.x, this.y - 100)
    }

    // update horizontal position
    if (this.state === CHARACTER_STATES.walkingLeft) {
      this.updatePosition(this.x - 3, this.y)
    } else if (this.state === CHARACTER_STATES.walkingRight) {
      this.updatePosition(this.x + 3, this.y)
    }
  }

  draw() {
    if (this.state === "jumping-left") {
      this.drawJumpingLeft();
    } else if (this.state === "jumping-right") {
      this.drawJumpingRight();
    } else if (this.state === "walking-left") {
      this.drawWalkingLeft();
    } else if (this.state === "walking-right") {
      this.drawWalkingRight();
    } else if (this.state === "jumping-top") {
      this.drawJumpingTop();
    } else if (this.state === CHARACTER_STATES.standing) {
      this.drawStanding();
    }
  }

  drawJumpingLeft() {
    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(this.x - 8, this.y - 58)
    rotate(40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(this.x - 1, this.y - 49)
    rotate(-30)
    rect(0, 0, 8, 33, 5)
    pop()

    rect(this.x - 5, this.y - 69, 15, 30, 5)

    push()
    translate(this.x - 2, this.y - 51)
    rotate(30)
    rect(0, 0, 8, 33, 5)
    pop()

    // Backpack
    fill(255)
    stroke(0)
    rect(this.x + 17, this.y - 107, 0.1, 50)
    rect(this.x + 10, this.y - 70, 10, 30, 5);

    // Helmet
    fill(255)
    stroke(0)
    ellipse(this.x + 2, this.y - 80, 25, 25);
    fill(0)
    ellipse(this.x - 3, this.y - 80, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(this.x, this.y - 82)
    rotate(150)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawJumpingRight() {
    noStroke()
    fill(244, 60, 31)
    // Right arm
    push()
    translate(this.x + 13, this.y - 60)
    rotate(-40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(this.x - 1, this.y - 49)
    rotate(-30)
    rect(0, 0, 8, 33, 5)
    pop()

    rect(this.x - 5, this.y - 69, 15, 30, 5)

    push()
    translate(this.x - 2, this.y - 51)
    rotate(30)
    rect(0, 0, 8, 33, 5)
    pop()

    // Backpack
    fill(255)
    stroke(0)
    rect(this.x - 12, this.y - 107, 0.1, 50)
    rect(this.x - 15, this.y - 70, 10, 30, 5);

    // Helmet
    fill(255)
    stroke(0)
    ellipse(this.x + 2, this.y - 80, 25, 25);
    fill(0)
    ellipse(this.x + 7, this.y - 80, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(this.x + 5, this.y - 82)
    rotate(30)
    ellipse(0, 0, 3, 5)
    pop()
  }

  drawWalkingLeft() {
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
  }

  drawWalkingRight() {
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

  drawJumpingTop() {
    fill(255)
    stroke(0)
    rect(this.x - 11, this.y - 107, 0.1, 50)
    rect(this.x - 17.5, this.y - 72, 35, 30, 5);

    // Left arm
    noStroke()
    fill(244, 60, 31)
    push()
    translate(this.x - 16, this.y - 60)
    rotate(40)
    ellipse(0, 0, 7, 30)
    pop()

    // Right arm
    push()
    translate(this.x + 17, this.y - 60)
    rotate(-40)
    ellipse(0, 0, 7, 30)
    pop()

    // Body and legs
    push()
    translate(this.x - 10, this.y - 51)
    rotate(10)
    rect(0, 0, 8, 33, 5)
    pop()

    push()
    translate(this.x + 3, this.y - 50)
    rotate(-10)
    rect(0, 0, 8, 33, 5)
    pop()
    rect(this.x - 11, this.y - 69, 23, 30, 5)

    // Helmet
    fill(255)
    stroke(0)
    ellipse(this.x, this.y - 80, 25, 25);
    fill(0)
    ellipse(this.x, this.y - 80, 15, 15);

    // Sun reflection on helmet
    fill(255)
    noStroke()
    push()
    translate(this.x + 3, this.y - 83)
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