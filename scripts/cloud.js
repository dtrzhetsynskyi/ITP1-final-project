class Cloud {
  renderTo(graphicsLayer) {
    let d = pixelDensity();
    let inc = 0.003;
    let yoff = 0;
    graphicsLayer.loadPixels();
    for (let y = 0; y < graphicsLayer.height * d; y++) {
      let xoff = 0;
      for (let x = 0; x < graphicsLayer.width * d; x++) {
        const index = (x + y * graphicsLayer.width * d) * 4;
        const r = noise(xoff, yoff) * 255;
        graphicsLayer.pixels[index + 0] = r;
        graphicsLayer.pixels[index + 1] = r;
        graphicsLayer.pixels[index + 2] = r;
        graphicsLayer.pixels[index + 3] = r;

        xoff += inc;
      }
      yoff += inc;
    }
    graphicsLayer.updatePixels();
  }
}