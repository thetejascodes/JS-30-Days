let slides = document.querySelectorAll('.slides');
let dots = document.querySelectorAll('.dot');
let counter = document.getElementById('counter');
let currentSlide = 0;
let autoSlideInterval;
let slider = document.getElementById('slider');


function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active-dot', i === index);
  });
  counter.textContent = `Slide ${index + 1} of ${slides.length}`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
});


function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);


let startX = 0;
slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slider.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prevSlide();
  else if (startX - endX > 50) nextSlide();
});


document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
});


showSlide(currentSlide);
startAutoSlide();
