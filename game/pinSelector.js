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
      pins[currentRow][p] = selectedPin;
    }
  }
}

function displayPins() {
  //////////////////
  // Display Pins //
  //////////////////
  for (let row = 0; row < pins.length; row++) {
    let r = row;
    for (let p = 0; p < pins[r].length; p++) {
      if (pins[pins.length - 1 - row][p] != -1) {
        pg.fill(pinColors[pins[pins.length - 1 - row][p]]);
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

  ////////////////////
  // Display Checks //
  ////////////////////
  for (let r = 0; r < currentRow; r++) {
    let check = checkRow(r);
    for (let p = 0; p < check[0] + check[1]; p++) {
      pg.fill(0);
      if (p < check[1]) {
        pg.fill(255);
      }
      pg.ellipse(
        size[0] - pinRadius - (pinRadius / 2) * p,
        150 + (pins.length - 1 - r) * 2 * pinRadius,
        pinRadius / 4,
        pinRadius / 4
      );
    }
  }
}
function keyPressed() {
  if (key === " ") {
    incIfFull();
  }
}
function checkRow(r) {
  let guessGraph = new Array(8).fill(0);
  let codeGraph = new Array(8).fill(0);

  for (let c of pins[r]) {
    guessGraph[c]++;
  }
  for (let c of gameSettings.code) {
    codeGraph[c]++;
  }

  let softHit = 0;
  let hardHit = 0;
  for (let c = 0; c < pins[r].length; c++) {
    softHit += Math.min(guessGraph[c], codeGraph[c]);
  }

  for (let c = 0; c < pins[r].length; c++) {
    if (pins[r][c] === gameSettings.code[c]) {
      hardHit++;
      softHit--;
    }
  }

  return [hardHit, max(softHit, 0)];
}

function incIfFull() {
  for (p of pins[currentRow]) {
    if (p === -1) {
      return false;
    }
  }
  currentRow++;
}
