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
}
function keyPressed() {
  if (key === " ") {
    checkRow();
  }
}
function checkRow() {
  for (p of pins[currentRow]) {
    if (p === -1) {
      alert("hi");
      return;
    }
  }
  let guessGraph = new Array(8).fill(0);
  let codeGraph = new Array(8).fill(0);

  for (let c of pins[currentRow]) {
    guessGraph[c]++;
  }
  for (let c of gameSettings.code) {
    codeGraph[c]++;
  }

  let softHit = 0;
  let hardHit = 0;
  for (let c = 0; c < pins[currentRow].length; c++) {
    softHit += Math.min(guessGraph[c], codeGraph[c]);
  }

  for (let c = 0; c < pins[currentRow].length; c++) {
    if (pins[currentRow][c] === gameSettings.code[c]) {
      hardHit++;
      softHit--;
    }
  }
  console.log(guessGraph);
  console.log(codeGraph);
  console.log(hardHit, softHit);
  currentRow++;
}
