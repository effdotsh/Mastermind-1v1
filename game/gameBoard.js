let cnv;
let pg;
let scaler;
let size;

let pinColors = [
  "#b60200",
  "#20ab34",
  "#3a33c4",
  "#bab403",
  "#957542",
  "#d76d33",
  "#c920c7",
  "#d0d3da",
];

let pins = [];

let timer = -3000;
let lastTime = Date.now();

function setup() {
  size = [800, 1600];
  scaler = min((windowWidth * 0.9) / size[0], (windowHeight * 0.9) / size[1]);
  cnv = createCanvas(size[0] * scaler, size[1] * scaler);
  cnv.parent("gameBoard");
  pg = createGraphics(size[0], size[1]);
  pg.textAlign(CENTER);
  for (let i = 0; i < gameSettings.numGuesses; i++) {
    pins.push([-1, -1, -1, -1]);
  }
  pg.stroke(0);
}
function draw() {
  image(pg, 0, 0, size[0] * scaler, size[1] * scaler);
  pg.background("#c78660");

  pg.line(20, size[1] - 220, size[0] - 20, size[1] - 220);

  displayPinChoices();
  displayPins();
  pg.textAlign(CENTER);
  if (timer < 0) {
    gameInProgress = false;
    pg.strokeWeight(5);
    pg.fill(255);
    pg.textSize(400);
    pg.text(Math.ceil(-timer / 1000), size[0] / 2, size[1] / 2);
  } else {
    gameInProgress = true;
  }

  if (gameInProgress) {
    pg.strokeWeight(1);
    pg.fill(255);
    pg.textSize(60);
    pg.text((timer / 1000).toFixed(1), size[0] / 2, 75);
  }
  if (!rematchSent) {
    timer += Date.now() - lastTime;
    lastTime = Date.now();
  }

  if (rematchSent && rematchReceived) {
    startGame();
  }

  ////////////////////
  // Display Scores //
  ////////////////////
  pg.textSize(40);
  pg.strokeWeight(1);

  pg.textAlign(LEFT);
  pg.fill(255);
  pg.text(gameSettings.myPoints, 100, 75);

  pg.textAlign(RIGHT);
  pg.fill(255);
  pg.text(gameSettings.theirPoints, size[0] - 100, 75);

  pg.strokeWeight(2);
}

function mouse() {
  return [mouseX / scaler, mouseY / scaler];
}
