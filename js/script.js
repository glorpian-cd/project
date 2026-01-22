const eras = document.querySelectorAll('.era');
const timeline = document.querySelector('.timeline');
const themes = [
  'intro',
  'arpanet',
  'networks',
  'www',
  'web2',
  'mobile',
  'modern'
];

/* ===== ТЕМА ПРИ СКРОЛЛЕ ===== */
timeline.addEventListener('scroll', () => {
  const index = Math.round(timeline.scrollTop / window.innerHeight);
  document.body.className = 'theme-' + themes[index];
});

/* ===== КНОПКА СТАРТ ===== */
document.querySelector('.start-button')?.addEventListener('click', () => {
  timeline.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});
