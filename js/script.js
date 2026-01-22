/* ===== ЭЛЕМЕНТЫ ===== */
const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era:not(.intro)');
const timelineItems = document.querySelectorAll('.timeline-item');
const progressBar = document.querySelector('.progress-bar');
const startButton = document.querySelector('.start-button');

/* ===== ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ КОЛЕСОМ ===== */
timeline.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    timeline.scrollLeft += e.deltaY;
  },
  { passive: false }
);

/* ===== ФУНКЦИЯ ПРОВЕРКИ ПРОГРЕСС-БАРА ===== */
function updateProgressBar() {
  const maxScroll = timeline.scrollWidth - timeline.clientWidth;
  const progress = (timeline.scrollLeft / maxScroll) * 100;
  progressBar.style.width = progress + '%';
}

/* ===== ПОДСВЕТКА АКТИВНОГО ГОДА ===== */
function updateActiveTimelineItem(activeEra) {
  timelineItems.forEach(item => {
    const isActive = item.dataset.target === activeEra;
    item.classList.toggle('active', isActive);
    if (isActive && themeColors[activeEra]) {
      item.style.color = themeColors[activeEra][1];
    }
  });
}

/* ===== ТЕМЫ И ЦВЕТА ГРАДИЕНТА ===== */
const themeColors = {
  arpanet: ['#00ff00', '#00aa00'],
  networks: ['#e0ffe9', '#0bff88'],
  www: ['#e5e5e5', '#999999'],
  web2: ['#1e90ff', '#00bfff'],
  mobile: ['#ff7f50', '#ffdd57'],
  modern: ['#0f172a', '#3b82f6']
};

/* ===== OBSERVER ДЛЯ СМЕНЫ ЭПОХ ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const era = entry.target.dataset.era;

        document.body.className = 'theme-' + era;

        updateActiveTimelineItem(era);

        eras.forEach(e => e.classList.remove('active'));
        entry.target.classList.add('active');

        if (themeColors[era]) {
          progressBar.style.background = `linear-gradient(90deg, ${themeColors[era][0]}, ${themeColors[era][1]})`;
        }
      }
    });
  },
  { threshold: 0.6 }
);

eras.forEach(era => observer.observe(era));

/* ===== ПРОГРЕСС-БАР ПРИ СКРОЛЛЕ ===== */
timeline.addEventListener('scroll', updateProgressBar);
updateProgressBar();

/* ===== КЛИК ПО ВЕРХНЕЙ ШКАЛЕ ===== */
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetEra = document.querySelector(`.era[data-era="${item.dataset.target}"]`);
    if (targetEra) {
      timeline.scrollTo({
        left: targetEra.offsetLeft,
        behavior: 'smooth'
      });
    }
  });
});

/* ===== КНОПКА СТАРТОВОГО ЭКРАНА ===== */
if (startButton) {
  startButton.addEventListener('click', () => {
    const firstEra = document.querySelector('.era:not(.intro)');
    if (firstEra) {
      timeline.scrollTo({
        left: firstEra.offsetLeft,
        behavior: 'smooth'
      });
    }
  });
}

let touchStartX = 0;
let touchEndX = 0;

timeline.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

timeline.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;

  if (Math.abs(swipeDistance) < 50) return;

  const currentIndex = Math.round(
    timeline.scrollLeft / timeline.clientWidth
  );

  let targetIndex = currentIndex;

  if (swipeDistance > 0) {
    targetIndex += 1; // свайп влево → следующая эпоха
  } else {
    targetIndex -= 1; // свайп вправо → предыдущая эпоха
  }

  targetIndex = Math.max(0, Math.min(targetIndex, timeline.children.length - 1));

  timeline.scrollTo({
    left: targetIndex * timeline.clientWidth,
    behavior: 'smooth'
  });
}
