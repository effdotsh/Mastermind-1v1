let gameSettings = {
  codeLength: 4,
  numGuesses: 10,
  pinTypes: 8,
  code: [0, 0, 0, 0],
};

var joinButton = document.getElementById("joinButton");
var hostButton = document.getElementById("hostButton");

joinButton.onclick = function () {
  revealID("joinGame");
  joinButton.style.display = "none";
  hostButton.style.display = "none";
};

hostButton.onclick = function () {
  revealID("hostSettings");

  joinButton.style.display = "none";
  hostButton.style.display = "none";
  // hostSettings();
};

function hostSettings() {
  var x = document.getElementById("hostSettings").elements;
  gameSettings.codeLength = int(x.codeLength.value);
  gameSettings.numGuesses = int(x.maxGuesses.value);

  gameSettings.code = createCode(
    gameSettings.codeLength,
    gameSettings.pinTypes
  );

  hideID("hostSettings");
  revealID("gameCode");
  resetBoard();
}

function createCode(len, pinTypes) {
  let code = [];
  for (let c = 0; c < len; c++) {
    code.push(Math.floor(Math.random() * pinTypes));
  }
  return code;
}
