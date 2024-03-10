class Rocket {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Draw a static space hopper
  render() {
    // draw thrusters
    push()
    fill(255)
    stroke(0)
    strokeWeight(2)
    beginShape()
    vertex(this.x - 25, this.y - 40)
    vertex(this.x - 21, this.y - 62)
    vertex(this.x - 5, this.y - 62)
    vertex(this.x - 1, this.y - 40)
    endShape()

    beginShape()
    vertex(this.x + 2, this.y - 40)
    vertex(this.x + 6, this.y - 62)
    vertex(this.x + 22, this.y - 62)
    vertex(this.x + 26, this.y - 40)
    endShape()
    pop();

    // draw body
    fill(255)
    rect(this.x - 30, this.y - 250, 60, 200, 20)
    ellipse(this.x, this.y - 235, 60, 350)

    // draw tripod
    fill(0)
    triangle(this.x - 30, this.y - 121, this.x - 90, this.y + 10, this.x - 30, this.y - 65)
    triangle(this.x + 30, this.y - 121, this.x + 90, this.y + 10, this.x + 30, this.y - 65)
    ellipse(this.x - 88, this.y + 10, 30, 10)
    ellipse(this.x + 88, this.y + 10, 30, 10)

    // draw part
    rect(this.x - 30, this.y - 270, 60, 30)

    // draw Ukrainian flag
    push();
    stroke(0)
    fill(0, 88, 181)
    rect(this.x - 15, this.y - 200, 30, 10)
    fill(247, 206, 0)
    rect(this.x - 15, this.y - 190, 30, 10)
    pop();
  }
}