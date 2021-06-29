let pinRadius = 60;
let selectedPin = -1;
function displayPins() {
  for (let c = 0; c < 8; c++) {
    pg.fill(pinColors[c]);
    if (c < 4) {
      pg.ellipse(
        pg.width / 8 + (c * pg.width) / 4,
        size[1] - 2.5 * pinRadius,
        pinRadius,
        pinRadius
      );
    } else {
      pg.ellipse(
        pg.width / 8 + ((c - 4) * pg.width) / 4,
        size[1] - pinRadius,
        pinRadius,
        pinRadius
      );
    }
  }
}

function mousePressed() {
  let mouseX = mouse()[0];
  let mouseY = mouse()[1];
  for (let c = 0; c < 8; c++) {
    pg.fill(pinColors[c]);
    if (c < 4) {
      if (
        dist(
          pg.width / 8 + (c * pg.width) / 4,
          size[1] - 2.5 * pinRadius,
          mouseX,
          mouseY
        ) <= pinRadius
      ) {
        selectedPin = c;
      }
    } else {
      if (
        dist(
          pg.width / 8 + ((c - 4) * pg.width) / 4,
          size[1] - pinRadius,
          mouseX,
          mouseY
        ) <= pinRadius
      ) {
        selectedPin = c;
      }
    }
  }

  if (selectedPin != -1) {
    console.log(selectedPin);
    cursor(`cursors/${selectedPin}.png`, 16, 16);
  }
}
