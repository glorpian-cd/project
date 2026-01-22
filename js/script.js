const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era');
const timelineItems = document.querySelectorAll('.timeline-item');
const progressBar = document.querySelector('.progress-bar');
const startButton = document.querySelector('.start-button');

let currentIndex = 0;

/* ===== THEMES ===== */
const themes = ['arpanet', 'networks', 'www', 'web2', 'mobile', 'modern'];

/* ===== INITIALIZE POSITIONS ===== */
function updatePositions() {
  eras.forEach((era, i) => {
    era.classList.remove('active', 'prev', 'next');
    if (i === currentIndex) era.classList.add('active');
    else if (i === currentIndex - 1) era.classList.add('prev');
    else if (i === currentIndex + 1) era.classList.add('next');
  });

  updateProgress();
  updateTheme();
  updateTimelineItems();
}

function updateProgress() {
  const percent = (currentIndex / (eras.length - 1)) * 100;
  progressBar.style.width = percent + '%';
}

function updateTimelineItems() {
  timelineItems.forEach(item => {
    item.classList.toggle('active', Number(item.dataset.index) === currentIndex);
  });
}

function updateTheme() {
  document.body.className = 'theme-' + themes[currentIndex];
}

/* ===== START BUTTON ===== */
startButton?.addEventListener('click', () => {
  currentIndex = 0;
  updatePositions();
});

/* ===== TOP TIMELINE CLICK ===== */
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = Number(item.dataset.index);
    updatePositions();
  });
});

/* ===== MOBILE SWIPE ===== */
let startX = 0;
timeline.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
timeline.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientX - startX;
  const threshold = 50;
  if (delta < -threshold && currentIndex < eras.length - 1) currentIndex++;
  if (delta > threshold && currentIndex > 0) currentIndex--;
  updatePositions();
});

/* ===== DESKTOP WHEEL ===== */
timeline.addEventListener('wheel', e => {
  e.preventDefault();
  if (e.deltaY > 0 && currentIndex < eras.length - 1) currentIndex++;
  else if (e.deltaY < 0 && currentIndex > 0) currentIndex--;
  updatePositions();
}, { passive: false });

/* ===== INITIALIZE ===== */
updatePositions();
