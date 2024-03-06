const TREE_HEIGHT = 6;
const BRANCH_ROTATION_DEGREES = 30;
const BRANCH_SHRINK = 0.67;

class RecursiveTree {
  x = 0;
  y = 0;
  branches = [];

  constructor(x, y) {
    this.x = x;
    this.y = y;

    const startVector = createVector(x, y);
    const endVector = createVector(x, y - 100);
    const numberOfBranches = (pow(2, TREE_HEIGHT) - 1);

    this.branches.push(new Branch(startVector, endVector));
    for (let i = 0; i < numberOfBranches; i++) {
      this.branches.push(this.branches[i].getLeft());
      this.branches.push(this.branches[i].getRight());
    }
  }

  render() {
    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].render();
    }
  };
}

class Branch {
  startVector;
  endVector;

  constructor(startVector, endVector) {
    this.startVector = startVector;
    this.endVector = endVector;
  }

  render() {
    push();
    stroke(228, 12, 235)
    strokeWeight(3)
    drawingContext.shadowBlur = 32;
    drawingContext.shadowColor = color(228, 12, 235);
    line(this.startVector.x, this.startVector.y, this.endVector.x, this.endVector.y);
    pop();
  }

  getLeft() {
    const dirL = p5.Vector.sub(this.endVector, this.startVector);
    dirL.rotate(BRANCH_ROTATION_DEGREES);
    dirL.mult(BRANCH_SHRINK);
    const newEndL = p5.Vector.add(this.endVector, dirL);
    const branchL = new Branch(this.endVector, newEndL);
    return branchL;
  };
  getRight() {
    const dirL = p5.Vector.sub(this.endVector, this.startVector);
    dirL.rotate(-BRANCH_ROTATION_DEGREES);
    dirL.mult(BRANCH_SHRINK);
    const newEndL = p5.Vector.add(this.endVector, dirL);
    const branchL = new Branch(this.endVector, newEndL);
    return branchL;
  };
}