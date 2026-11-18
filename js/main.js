// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-right-stagger, .reveal-step-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => io.observe(el));

// Parallax
const parallaxEls = document.querySelectorAll('[data-parallax]');
let ticking = false;
function updateParallax() {
  const scrollY = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    const rect = el.getBoundingClientRect();
    const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
    el.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
}, { passive: true });
updateParallax();

// Header shrink
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}, { passive: true });

// Smooth anchor offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
