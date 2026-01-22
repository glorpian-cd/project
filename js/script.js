const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era');
const timelineItems = document.querySelectorAll('.timeline-item');
const progressBar = document.querySelector('.progress-bar');
const startButton = document.querySelector('.start-button');

let currentIndex = 0;
const themes = ['arpanet', 'networks', 'www', 'web2', 'mobile', 'modern'];

/* ===== Инициализация позиций ===== */
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

/* ===== Прогресс ===== */
function updateProgress() {
  const percent = (currentIndex / (eras.length - 1)) * 100;
  progressBar.style.width = percent + '%';
}

/* ===== Верхняя шкала ===== */
function updateTimelineItems() {
  timelineItems.forEach(item => {
    item.classList.toggle('active', Number(item.dataset.index) === currentIndex);
  });
}

/* ===== Темы ===== */
function updateTheme() {
  document.body.className = 'theme-' + themes[currentIndex];
}

/* ===== Кнопка старт ===== */
startButton?.addEventListener('click', () => {
  currentIndex = 0;
  updatePositions();
});

/* ===== Клик по верхней шкале ===== */
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = Number(item.dataset.index);
    updatePositions();
  });
});

/* ===== Свайп для мобильных ===== */
let startX = 0;
timeline.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
}, { passive: true });

timeline.addEventListener('touchend', e => {
  const delta = e.changedTouches[0].clientX - startX;
  const threshold = 50;
  if (delta < -threshold && currentIndex < eras.length - 1) currentIndex++;
  if (delta > threshold && currentIndex > 0) currentIndex--;
  updatePositions();
});

/* ===== Инициализация ===== */
updatePositions();
