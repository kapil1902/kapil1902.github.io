(() => {
  'use strict';
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  let paused = preference.matches;
  function applyMotion() {
    root.classList.toggle('paused', paused);
    toggle.textContent = paused ? 'Play motion' : 'Pause motion';
    toggle.setAttribute('aria-pressed', String(paused));
  }
  toggle.addEventListener('click', () => { paused = !paused; applyMotion(); });
  preference.addEventListener('change', event => { paused = event.matches; applyMotion(); });
  applyMotion();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    root.classList.add('js');
  }
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
