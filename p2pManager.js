let peer = new Peer();
let conn;

peer.on("open", function (id) {
  document.getElementById("gameCode").innerText = `Connection Code: ${id}`;
});
let rematchSent = false;
let rematchReceived = false;
let c_open = () => {
  hideID("gameCode");
  hideID("joinGame");

  conn.on("data", function (message) {
    if (message.type === "connected") {
      console.log("sent");
      conn.send({ type: "settings", data: gameSettings });
      revealID("gameBoard");
      startGame();
    } else if (message.type === "settings") {
      console.log("sent");
      gameSettings = message.data;
      gameSettings.isHost = !gameSettings.isHost;
      gameSettings.myPoints = [
        gameSettings.theirPoints,
        (gameSettings.theirPoints = gameSettings.myPoints),
      ][0];
      gameSettings.code = gameSettings.nextCode;
      resetBoard();
    } else if (message.type === "done") {
      gameSettings.theirPoints++;

      alert(`You Lose - Time Elapsed: ${(message.data / 1000).toFixed(1)}`);
      endGame();
    } else if (message.type === "rematch") {
      rematchReceived = true;
    } else if (message.type === "score") {
      gameSettings.myPoints = message.p2;
      gameSettings.theirPoints = message.p1;
    }
  });
};

peer.on("connection", function (c) {
  conn = c;
  c_open();
});

function connect(destID) {
  conn = peer.connect(destID);

  conn.on("open", function () {
    c_open();
    conn.send({ type: "connected", data: {} });
    revealID("gameBoard");
    startGame();
  });
}
