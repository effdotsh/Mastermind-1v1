let gameSettings = {
  codeLength: 4,
  numGuesses: 10,
  numColors: 8,
  nextCode: [0, 0, 0, 0],
  code: [0, 0, 0, 0],
  myPoints: 0,
  theirPoints: 0,
  isHost: true,
  isSinglePlayer: false,
};

var joinButton = document.getElementById("joinButton");
var hostButton = document.getElementById("hostButton");

joinButton.onclick = function () {
  revealID("joinGame", "flex");
  joinButton.style.display = "none";
  hostButton.style.display = "none";
};

hostButton.onclick = function () {
  revealID("hostSettings", "flex");

  joinButton.style.display = "none";
  hostButton.style.display = "none";
  // hostSettings();
};

function hostSettings() {
  var x = document.getElementById("hostSettings").elements;
  gameSettings.codeLength = int(x.codeLength.value);
  gameSettings.numColors = int(x.numColors.value);

  gameSettings.numGuesses = int(x.maxGuesses.value);

  gameSettings.nextCode = createCode(
    gameSettings.codeLength,
    gameSettings.numColors
  );

  gameSettings.isSinglePlayer = Boolean(x.isSinglePlayer.checked);
  console.log(gameSettings.isSinglePlayer);
  hideID("hostSettings");
  resetBoard();
  if (!gameSettings.isSinglePlayer) {
    revealID("gameCode");
  } else {
    revealID("gameBoard");
    startGame();
  }
}

function createCode(len, numColors) {
  let code = [];
  for (let c = 0; c < len; c++) {
    code.push(Math.floor(Math.random() * numColors));
  }
  return code;
}
