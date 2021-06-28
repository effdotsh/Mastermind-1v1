let gameSettings = {
  codeLength: 4,
  numGuesses: 10,
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
};

function hostSettings() {
  var x = document.getElementById("sendMessage").elements;
  hideID("hostSettings");
  revealID("gameCode");
}
