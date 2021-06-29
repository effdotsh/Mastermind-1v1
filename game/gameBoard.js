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
  // "#252425",
  "#c920c7",
  "#d0d3da",
];

let pins = [];

function setup() {
  size = [800, 1600];
  scaler = min((windowWidth * 0.9) / size[0], (windowHeight * 0.9) / size[1]);
  cnv = createCanvas(size[0] * scaler, size[1] * scaler);
  cnv.parent("gameBoard");
  pg = createGraphics(size[0], size[1]);
  ellipseMode(RADIUS);
  for (let i = 0; i < gameSettings.numGuesses; i++) {
    pins.push([-1, -1, -1, -1]);
  }
}
function draw() {
  image(pg, 0, 0, size[0] * scaler, size[1] * scaler);
  pg.background("#c78660");

  pg.line(20, size[1] - 220, size[0] - 20, size[1] - 220);

  displayPinChoices();
  displayPins();
}

function mouse() {
  return [mouseX / scaler, mouseY / scaler];
}
