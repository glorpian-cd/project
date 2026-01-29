const timeline = document.querySelector('.timeline');
const startBtn = document.getElementById('startBtn');
const eras = document.querySelectorAll('.era');

startBtn?.addEventListener('click', () => {
  timeline.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.4
  }
);

eras.forEach(era => observer.observe(era));