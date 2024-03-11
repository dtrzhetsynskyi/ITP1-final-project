/*

Flagpole

*/

class Flagpole {
  x = 0;
  y = 0;
  isReached = false;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  // Draw flagpole
  draw() {
    push();
    strokeWeight(5);
    stroke(180);
    line(this.x, this.y, this.x, this.y - 250);

    stroke(0)
    strokeWeight(1);
    if (this.isReached) {
      fill(0, 88, 181)
      rect(this.x + 2, this.y - 250, 60, 20)
      fill(247, 206, 0)
      rect(this.x + 2, this.y - 230, 60, 20)
    } else {
      fill(0, 88, 181)
      rect(this.x + 2, this.y - 50, 60, 20)
      fill(247, 206, 0)
      rect(this.x + 2, this.y - 30, 60, 20)
    }
    pop();
  }
}