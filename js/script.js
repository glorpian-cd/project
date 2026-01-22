const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era:not(.intro)');
const timelineItems = document.querySelectorAll('.timeline-item');
const progressBar = document.querySelector('.progress-bar');
const startButton = document.querySelector('.start-button');

/* ===== DESKTOP WHEEL ===== */
timeline.addEventListener('wheel', (e) => {
  e.preventDefault();
  timeline.scrollLeft += e.deltaY;
}, { passive: false });

/* ===== PROGRESS BAR ===== */
function updateProgress() {
  const max = timeline.scrollWidth - timeline.clientWidth;
  progressBar.style.width = (timeline.scrollLeft / max) * 100 + '%';
}
timeline.addEventListener('scroll', updateProgress);

/* ===== COLORS ===== */
const themeColors = {
  arpanet: ['#00ff00', '#00aa00'],
  networks: ['#e0ffe9', '#0bff88'],
  www: ['#ccc', '#888'],
  web2: ['#1e90ff', '#00bfff'],
  mobile: ['#ff7f50', '#ffdd57'],
  modern: ['#0f172a', '#3b82f6']
};

/* ===== OBSERVER ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const era = entry.target.dataset.era;
      document.body.className = 'theme-' + era;

      eras.forEach(e => e.classList.remove('active'));
      entry.target.classList.add('active');

      timelineItems.forEach(item => {
        item.classList.toggle('active', item.dataset.target === era);
        if (item.dataset.target === era) {
          item.style.color = themeColors[era][1];
        }
      });

      progressBar.style.background =
        `linear-gradient(90deg, ${themeColors[era][0]}, ${themeColors[era][1]})`;
    }
  });
}, { threshold: 0.6 });

eras.forEach(e => observer.observe(e));

/* ===== TOP TIMELINE CLICK ===== */
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.querySelector(`.era[data-era="${item.dataset.target}"]`);
    timeline.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  });
});

/* ===== START BUTTON ===== */
startButton?.addEventListener('click', () => {
  timeline.scrollTo({ left: eras[0].offsetLeft, behavior: 'smooth' });
});

/* ===== MOBILE: CONTROLLED SWIPE ===== */

let currentIndex = 0;
let startX = 0;
let isSwiping = false;

const screens = document.querySelectorAll('.era');
const maxIndex = screens.length - 1;

timeline.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
}, { passive: true });

timeline.addEventListener('touchend', (e) => {
  if (!isSwiping) return;

  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  const threshold = 50; // минимальная длина свайпа

  if (deltaX < -threshold && currentIndex < maxIndex) {
    currentIndex++;
  } else if (deltaX > threshold && currentIndex > 0) {
    currentIndex--;
  }

  timeline.scrollTo({
    left: currentIndex * timeline.clientWidth,
    behavior: 'smooth'
  });

  isSwiping = false;
});
