let peer = new Peer();
let conn;

peer.on("open", function (id) {
  console.log("My peer ID is: " + id);
});

let c_open = () => {
  console.log("OPENED CONNECTION");
  conn.on("data", function (data) {
    console.log(data);
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
  });
}

function send(message) {
  conn.send(message);
}
