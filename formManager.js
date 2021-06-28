function connectForm() {
  var x = document.getElementById("joinGame").elements;
  connect(x.gameCode.value);
}

function sendMessage() {
  var x = document.getElementById("sendMessage").elements;

  send(x.mssg.value);
}
