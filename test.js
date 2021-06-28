let peer = new Peer();
let conn;

peer.on("open", function (id) {
  document.getElementById("gameCode").innerHTML = `Connection Code: ${id}`;
});

let c_open = () => {
  console.log("OPENED CONNECTION");

  //hide join and display send
  document.getElementById("gameCode").style.display = "none";
  document.getElementById("joinGame").style.display = "none";
  document.getElementById("chatLog").style.display = "inherit";
  document.getElementById("sendMessage").style.display = "inherit";

  conn.on("data", function (message) {
    addMessage(`Them`, message);
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
  addMessage("Me", message);

  conn.send(message);
}

function addMessage(author, msg) {
  let chat = document.getElementById("chatLog");
  var user = document.createElement("b");
  var text = document.createElement("p");
  user.innerText = `\n ${author}: `;
  text.innerText = msg;
  chat.appendChild(user);
  chat.appendChild(text);
}
