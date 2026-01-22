const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era');
const years = document.querySelectorAll('.year');
const startBtn = document.getElementById('startBtn');

let currentIndex = 0;

/* UPDATE STATE */
function update() {
  eras.forEach((era, i) => {
    era.classList.toggle('active', i === currentIndex);
  });

  years.forEach((year, i) => {
    year.classList.toggle('active', i === currentIndex);
  });

  document.body.className =
    currentIndex === 0 ? 'intro' : `era-${currentIndex}`;
}

/* START BUTTON */
startBtn.addEventListener('click', () => {
  currentIndex = 1;
  timeline.scrollTo({
    left: window.innerWidth,
    behavior: 'smooth'
  });
  update();
});

/* SCROLL */
timeline.addEventListener('scroll', () => {
  const index = Math.round(timeline.scrollLeft / window.innerWidth);
  if (index !== currentIndex) {
    currentIndex = index;
    update();
  }
});

/* INIT */
update();
