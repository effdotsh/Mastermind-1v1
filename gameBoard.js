let cnv;
let pg;
let scaler;
let size;
function setup() {
  size = [400, 800];
  scaler = min((windowWidth * 0.9) / size[0], (windowHeight * 0.9) / size[1]);
  cnv = createCanvas(size[0] * scaler, size[1] * scaler);
  cnv.parent("gameBoard");
  pg = createGraphics(size[0], size[1]);

  pg.background(0, 100, 0);
}
function draw() {
  image(pg, 0, 0, size[0] * scaler, size[1] * scaler);
}

function mouse() {
  return [mouseX / scaler, mouseY / scaler];
}
