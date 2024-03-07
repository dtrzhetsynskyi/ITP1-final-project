const TREE_HEIGHT = 6;
const BRANCH_ROTATION_DEGREES = 30;
const BRANCH_SHRINK = 0.67;

class RecursiveTree {
  branches = [];
  graphicsLayer;

  constructor(graphicsLayer) {
    this.graphicsLayer = graphicsLayer;

    const x = graphicsLayer.width / 2;
    const y = graphicsLayer.height / 2;

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
      this.branches[i].renderTo(this.graphicsLayer);
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

  renderTo(graphicsLayer) {
    push();
    graphicsLayer.stroke(228, 12, 235)
    graphicsLayer.strokeWeight(3)
    graphicsLayer.drawingContext.shadowBlur = 32;
    graphicsLayer.drawingContext.shadowColor = color(228, 12, 235);
    graphicsLayer.line(this.startVector.x, this.startVector.y, this.endVector.x, this.endVector.y);
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