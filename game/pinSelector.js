let pinRadius = 60;
let selectedPin = -1;
let currentRow = 0;

let gameInProgress = false;
function displayPinChoices() {
  for (let c = 0; c < gameSettings.numColors; c++) {
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
  if (gameInProgress) {
    ////////////////
    // Select pin //
    ////////////////
    for (let c = 0; c < gameSettings.numColors; c++) {
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
          pg.width / 8 +
            (p * pg.width) /
              (gameSettings.codeLength + 2) /
              (gameSettings.codeLength / 4),
          150 + (r * 1200) / gameSettings.numGuesses
        ) < pinRadius &&
        selectedPin != -1
      ) {
        pins[currentRow][p] = selectedPin;
      }
    }
  }
}

function displayPins() {
  pg.fill(255);
  pg.ellipse(
    20,
    150 + ((pins.length - 1 - currentRow) * 1200) / gameSettings.numGuesses,
    10,
    10
  );
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
        pg.width / 8 +
          (p * pg.width) /
            (gameSettings.codeLength + 2) /
            (gameSettings.codeLength / 4),
        150 + (r * 1200) / gameSettings.numGuesses,
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
        150 + ((pins.length - 1 - r) * 1200) / gameSettings.numGuesses,
        pinRadius / 4,
        pinRadius / 4
      );
    }
    if (check[0] == gameSettings.codeLength && !rematchSent) {
      if (!gameSettings.isSinglePlayer) {
        conn.send({ type: "done", data: timer });
      }
      alert(`You Win - Time Elapsed: ${(timer / 1000).toFixed(1)}`);
      gameSettings.myPoints++;

      endGame();
    }
  }
}
function keyPressed() {
  if (key === " ") {
    incIfFull();
  }
}
function checkRow(r) {
  let guessGraph = new Array(gameSettings.numColors).fill(0);
  let codeGraph = new Array(gameSettings.numColors).fill(0);

  for (let c of pins[r]) {
    guessGraph[c]++;
  }
  for (let c of gameSettings.code) {
    codeGraph[c]++;
  }

  let softHit = 0;
  let hardHit = 0;
  for (let c = 0; c < guessGraph.length; c++) {
    softHit += Math.min(guessGraph[c], codeGraph[c]);
  }

  for (let c = 0; c < pins[r].length; c++) {
    if (pins[r][c] === gameSettings.code[c]) {
      hardHit++;
      softHit--;
    }
  }

  return [hardHit, softHit];
}

function incIfFull() {
  for (p of pins[currentRow]) {
    if (p === -1) {
      return false;
    }
  }
  currentRow++;
}

function resetBoard() {
  currentRow = 0;
  pins = new Array(gameSettings.numGuesses).fill(-1);
  for (let r = 0; r < pins.length; r++) {
    pins[r] = new Array(gameSettings.codeLength).fill(-1);
  }
  pinRadius = 60 - 10 * (gameSettings.codeLength - 4);
}

function startGame() {
  rematchReceived = false;
  rematchSent = false;
  timer = -3000;
  resetBoard();
  lastTime = Date.now();
}

function endGame() {
  if (gameSettings.isHost) {
    gameSettings.code = createCode(
      gameSettings.codeLength,
      gameSettings.numColors
    );
  }
  if (!gameSettings.isSinglePlayer) {
    conn.send({ type: "settings", data: gameSettings });

    conn.send({ type: "rematch" });
    rematchSent = true;
  } else {
    resetBoard();
    startGame();
  }
}
