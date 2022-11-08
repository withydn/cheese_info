const desc = document.querySelectorAll('.desc');
const open = document.querySelectorAll('.open');

open.forEach((item, index) => {
  item.onclick = () => {
    desc[index].classList.toggle('active');
  };
});
