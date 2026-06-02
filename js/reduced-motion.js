const ReducedMotion = {
  get prefersReduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
};
