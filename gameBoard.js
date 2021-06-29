let pinRadius = 60;

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
  "#252425",
  "#d0d3da",
];

function setup() {
  size = [800, 1600];
  scaler = min((windowWidth * 0.9) / size[0], (windowHeight * 0.9) / size[1]);
  cnv = createCanvas(size[0] * scaler, size[1] * scaler);
  cnv.parent("gameBoard");
  pg = createGraphics(size[0], size[1]);
  ellipseMode(RADIUS);
}
function draw() {
  image(pg, 0, 0, size[0] * scaler, size[1] * scaler);
  pg.background("#c78660");

  //   Display colors at the bottom
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

function mouse() {
  return [mouseX / scaler, mouseY / scaler];
}
