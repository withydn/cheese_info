var open = document.getElementById("open");
var desc = document.getElementById("desc");
var close = document.getElementById("close");

open.onclick = function () {
  desc.style.display = "block";
};

close.onclick = function () {
  desc.style.display = "none";
  open.sytle.display = "block";
};
