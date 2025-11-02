document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.querySelector(".slider-wrapper");

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (!sliderWrapper || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;
  function goToSlide(index) {
    if (index < 0) {
      index = totalSlides - 1;
    } else if (index >= totalSlides) {
      index = 0;
    }

    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  nextBtn.addEventListener("click", function () {
    goToSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", function () {
    goToSlide(currentIndex - 1);
  });
  setInterval(function () {
    goToSlide(currentIndex + 1);
  }, 5000);
});
