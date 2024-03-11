/*

Stars

*/

const STARS_AMOUNT = 50;

class Stars {
  // Draw background stars randomly
  renderTo(graphicsLayer) {
    graphicsLayer.fill(255);
    graphicsLayer.noStroke();
    for (let i = 0; i < STARS_AMOUNT; i++) {
      const x = random() * 1024;
      const y = map(random(), 0, 1, 10, 150);
      const size = map(random(), 0, 1, 1, 4);

      // Add glowing effect
      graphicsLayer.drawingContext.shadowBlur = 32;
      graphicsLayer.drawingContext.shadowColor = color(255);
      graphicsLayer.ellipse(x, y, size, size)
    }
  }
}