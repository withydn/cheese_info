// 베스트 리뷰
var slides = document.querySelector(".slides"),
  slide2 = document.querySelectorAll(".slides li"),
  currentIdx = 0,
  slideCount = slide2.length,
  prevBtn = document.querySelector(".prev2"),
  slideWidth = 300,
  slideMargin = 50,
  nextBtn = document.querySelector(".next2");

slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + "px";

function moveSlide(num) {
  slides.style.left = -num * 350 + "px";
  currentIdx = num;
}

nextBtn.addEventListener("click", function () {
  if (currentIdx < slideCount - 6) {
    moveSlide(currentIdx + 1);
    console.log(currentIdx);
  } else {
    moveSlide(0);
  }
});

prevBtn.addEventListener("click", function () {
  if (currentIdx > 0) {
    moveSlide(currentIdx - 1);
  } else {
    moveSlide(slideCount - 6);
  }
});
