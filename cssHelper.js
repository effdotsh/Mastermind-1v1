function revealID(name, display = "table") {
  document.getElementById(name).style.display = display;

  // document.getElementById(name).style.display = "flex";

  // document.getElementById(name).style.position = "absolute";
  // document.getElementById(name).style.left = "0";
  // document.getElementById(name).style.right = "0";
  // document.getElementById(name).style.up = "0";
  // document.getElementById(name).style.down = "0";

  document.getElementById(name).style.margin = "auto";
}

function hideID(name) {
  document.getElementById(name).style.display = "none";
}
