const desc = document.querySelectorAll(".desc");
const open = document.querySelectorAll(".open");
const close = document.querySelectorAll(".close");

open.forEach((item, index) => {
  item.onclick = () => {
    desc[index].classList.toggle("active");
  };
});

close.forEach((item, index) => {
  item.onclick = () => {
    desc[index].classList.remove("active");

  };
});
