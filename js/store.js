const desc = document.querySelectorAll(".desc");
const open = document.querySelectorAll(".open");

open.forEach((item, index) => {
  item.onclick = () => {
    desc[index].classList.toggle("active");
    if (desc[index].classList.contains("active")) {
      open[index].style.transform = "rotate(270deg)";
      open[index].style.color = "#fc9b00";
    } else {
      open[index].style.transform = "rotate(0deg)";
      open[index].style.color = "black";
    }
  };
});
