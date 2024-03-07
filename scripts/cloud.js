// Draw cloud using 2d Perlin noise algorithm.
// Algorithm Reference: https://en.wikipedia.org/wiki/Perlin_noise

const OFFSET_INCREMENT = 0.003;

class Cloud {
  // Render cloud to the graphics layer
  renderTo(graphicsLayer) {
    let density = pixelDensity();
    let yoff = 0;

    graphicsLayer.loadPixels();
    for (let y = 0; y < graphicsLayer.height * density; y++) {
      let xoff = 0;

      for (let x = 0; x < graphicsLayer.width * density; x++) {
        const id = (x + y * graphicsLayer.width * density) * 4;
        const r = noise(xoff, yoff) * 255;

        graphicsLayer.pixels[id + 0] = r;
        graphicsLayer.pixels[id + 1] = r;
        graphicsLayer.pixels[id + 2] = r;
        graphicsLayer.pixels[id + 3] = r;

        xoff += OFFSET_INCREMENT;
      }

      yoff += OFFSET_INCREMENT;
    }
    graphicsLayer.updatePixels();
  }
}