// Draw background moutains using Perlin noise algorithm.
// Algorithm Reference: https://en.wikipedia.org/wiki/Perlin_noise

const BACKGROUND_MOUNTAINS_HEIGHT = 350;
const BACKGROUND_MOUNTAINS_WIDTH = 3000;

class BackgroundMountains {

  // render the background mountains using Perlin noise to graphics layer
  renderTo(graphicsLayer) {
    let xoff1 = 0;
    let xoff2 = 5000;
    let xoff3 = 10000;

    graphicsLayer.noStroke();

    graphicsLayer.fill(106, 104, 109);
    for (let x = 0; x < graphicsLayer.width; x++) {
      let y = noise(xoff1) * graphicsLayer.height;
      graphicsLayer.rect(x, graphicsLayer.height - y, 1, y)

      xoff1 += 0.01;
    }

    graphicsLayer.fill(71, 69, 74);
    for (let x = 0; x < graphicsLayer.width; x++) {
      let y = noise(xoff2) * (graphicsLayer.height - 100);
      graphicsLayer.rect(x, graphicsLayer.height - y, 1, y)

      xoff2 += 0.01;
    }

    graphicsLayer.fill(53, 53, 55);
    for (let x = 0; x < graphicsLayer.width; x++) {
      let y = noise(xoff3) * (graphicsLayer.height - 200);
      graphicsLayer.rect(x, graphicsLayer.height - y, 1, y)

      xoff3 += 0.01;
    }
  }
}