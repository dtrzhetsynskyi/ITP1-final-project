/*

Recursive Tree

*/

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

    // Generate braches
    this.branches.push(new Branch(startVector, endVector));
    for (let i = 0; i < numberOfBranches; i++) {
      this.branches.push(...this.branches[i].getBranchesArray())
    }
  }

  // Render branches of the recursive trees
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

  // Render branch to the graphics layer
  renderTo(graphicsLayer) {
    push();
    graphicsLayer.stroke(16, 246, 77)
    graphicsLayer.strokeWeight(3)
    graphicsLayer.drawingContext.shadowBlur = 32;
    graphicsLayer.drawingContext.shadowColor = color(16, 246, 77);
    graphicsLayer.line(this.startVector.x, this.startVector.y, this.endVector.x, this.endVector.y);
    pop();
  }

  // Get branches of branch
  getBranchesArray() {
    const leftVector = p5.Vector.sub(this.endVector, this.startVector);
    const rightVector = p5.Vector.sub(this.endVector, this.startVector);

    leftVector.rotate(BRANCH_ROTATION_DEGREES);
    leftVector.mult(BRANCH_SHRINK);

    rightVector.rotate(-BRANCH_ROTATION_DEGREES);
    rightVector.mult(BRANCH_SHRINK);

    const leftBranch = new Branch(this.endVector, p5.Vector.add(this.endVector, leftVector));
    const rightBranch = new Branch(this.endVector, p5.Vector.add(this.endVector, rightVector));

    return [leftBranch, rightBranch];
  }
}