const Home = {
  completed: false,

  init() {
    const wordmark = document.querySelector('.home__wordmark');
    const spine = document.querySelector('.home__spine');
    const subtitle = document.querySelector('.home__subtitle');
    const law = document.querySelector('.home__sanctuary-law');
    const ctaGroup = document.querySelector('.home__cta-group');

    if (!wordmark) return;

    const reducedMotion = ReducedMotion.prefersReduced;

    const reveal = () => {
      if (this.completed) return;
      this.completed = true;

      if (reducedMotion) {
        wordmark.classList.add('reveal');
        spine.classList.add('reveal');
        subtitle.classList.add('reveal');
        if (law) law.classList.add('reveal');
        ctaGroup.classList.add('reveal');
        return;
      }

      wordmark.classList.add('reveal');
      setTimeout(() => spine.classList.add('reveal'), 600);
      setTimeout(() => subtitle.classList.add('reveal'), 1200);
      setTimeout(() => { if (law) law.classList.add('reveal'); }, 1800);
      setTimeout(() => ctaGroup.classList.add('reveal'), 2400);
    };

    if (!reducedMotion) {
      setTimeout(reveal, 600);
    } else {
      reveal();
    }
  }
};
