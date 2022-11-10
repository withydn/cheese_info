// 베스트 리뷰
var slides = document.querySelector(".slides"),
  slide2 = document.querySelectorAll(".slides li"),
  currentIdx = 0,
  slideCount = slide2.length,
  slideWidth = 300,
  slideMargin = 50,
  prevBtn = document.querySelector(".prev2"),
  nextBtn = document.querySelector(".next2");

makeClone();

function makeClone() {
  for (var i = 0; i < slideCount; i++) {
    //a.cloneNode(), a.cloneNode(true)
    var cloneSlide = slide2[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    //a.appendChild(b)
    slides.appendChild(cloneSlide);
  }
  for (var i = slideCount - 1; i >= 0; i--) {
    var cloneSlide = slide2[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    //a.prepend(b)
    slides.prepend(cloneSlide);
  }
  updatewidth();
  setInitialPos();
  slides.classList.add("animated");
}

function updatewidth() {
  var currentSlides = document.querySelectorAll(".slides li");
  var newSlideCount = currentSlides.length;

  var newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}
function setInitialPos() {
  var initialTransLateValue = -(slideWidth + slideMargin) * slideCount;
  // slides (transform:transLateX(-1000px);)
  slides.style.transform = "translateX(" + initialTransLateValue + "px)";
}

// slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + "px";

// function moveSlide(num) {
//   slides.style.left = -num * 350 + "px";
//   currentIdx = num;
// }

nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});

function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "px";
  currentIdx = num;
  console.log(currentIdx, slideCount);

  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      slides.classList.add("animated");
    }, 600);
  }
}
