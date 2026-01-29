const timeline = document.querySelector('.timeline');
const startBtn = document.getElementById('startBtn');

startBtn?.addEventListener('click', () => {
  timeline.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});