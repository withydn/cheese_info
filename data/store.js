var open = document.querySelector("#open");
var desc = document.querySelector("#desc");
var close = document.querySelector("#close");

open.onclick = function () {
  desc.style.display = "block";
};

close.onclick = function () {
  desc.style.display = "none";
  open.sytle.display = "block";
};
