let pinRadius = 60;
let selectedPin = -1;
let currentRow = 0;

function displayPinChoices() {
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
  ////////////////
  // Select pin //
  ////////////////
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
  ///////////////
  // Place Pin //
  ///////////////
  let r = pins.length - 1 - currentRow;
  for (let p = 0; p < pins[r].length; p++) {
    if (
      dist(
        mouseX,
        mouseY,
        pg.width / 8 + (p * pg.width) / 6,
        150 + r * 2 * pinRadius
      ) < pinRadius &&
      selectedPin != -1
    ) {
      pins[r][p] = selectedPin;
    }
  }
}

function displayChoices() {
  for (let row = 0; row < pins.length; row++) {
    let r = pins.length - row - 1;
    for (let p = 0; p < pins[r].length; p++) {
      if (pins[r][p] != -1) {
        pg.fill(pinColors[pins[r][p]]);
      } else {
        pg.fill(0);
      }
      pg.ellipse(
        pg.width / 8 + (p * pg.width) / 6,
        150 + r * 2 * pinRadius,
        pinRadius,
        pinRadius
      );
    }
  }
}
