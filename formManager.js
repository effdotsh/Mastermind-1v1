function connectForm() {
  var x = document.getElementById("joinGame").elements;
  connect(x.gameCode.value);
}

document.getElementById("numColors").onkeypress = function (e) {
  var ev = e || window.event;
  if (ev.charCode < 48 || ev.charCode > 57) {
    return false; // not a digit
  } else if (this.min > this.value * 10 + ev.charCode - 48 > this.max) {
    return false;
  } else {
    return true;
  }
};
