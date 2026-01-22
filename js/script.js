const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era');
const startBtn = document.getElementById('startBtn');

/* ===== THEME SWITCH ===== */
timeline.addEventListener('scroll', () => {
  const index = Math.round(timeline.scrollTop / window.innerHeight);
  const era = eras[index];
  if (!era) return;

  const theme = era.dataset.theme;
  document.body.className = theme ? `theme-${theme}` : '';
});

/* ===== START BUTTON ===== */
startBtn.addEventListener('click', () => {
  timeline.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});
