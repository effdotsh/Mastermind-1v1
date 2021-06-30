let peer = new Peer();
let conn;

peer.on("open", function (id) {
  document.getElementById("gameCode").innerText = `Connection Code: ${id}`;
});

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
      resetBoard();
    } else {
      console.log(message);
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

function send(message) {
  conn.send(message);
}
