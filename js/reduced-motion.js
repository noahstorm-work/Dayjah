const ReducedMotion = {
  get prefersReduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  init() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      document.body.classList.toggle('reduced-motion', mediaQuery.matches);
    });
    if (mediaQuery.matches) {
      document.body.classList.add('reduced-motion');
    }
  }
};
