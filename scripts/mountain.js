class Mountain {
  x = 0;
  y = 0;
  width = 0;
  height = 0;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    fill(97, 103, 122);
    triangle(this.x, this.y, this.x + this.width, this.y, (2 * this.x + this.width) / 2, this.y - this.height);
    fill(255)
    push()
    translate((2 * this.x + this.width) / 2 * 0.8, (this.y - this.height) * 0.8)
    scale(0.2)
    triangle(this.x, this.y, this.x + this.width, this.y, (2 * this.x + this.width) / 2, this.y - this.height);
    translate(0, 0)
    pop()
  }
}