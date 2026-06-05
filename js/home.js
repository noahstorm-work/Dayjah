const Home = {
  completed: false,

  init() {
    const wordmark = document.querySelector('.home__wordmark');
    const spine = document.querySelector('.home__spine');
    const subtitle = document.querySelector('.home__subtitle');
    const ctaGroup = document.querySelector('.home__cta-group');
    const home = document.querySelector('[data-room="home"]');

    if (!wordmark) return;

    const reducedMotion = ReducedMotion.prefersReduced;

    const reveal = () => {
      if (this.completed) return;
      this.completed = true;

      if (reducedMotion) {
        wordmark.classList.add('reveal');
        spine.classList.add('reveal');
        subtitle.classList.add('reveal');
        ctaGroup.classList.add('reveal');
        return;
      }

      wordmark.classList.add('reveal');
      setTimeout(() => spine.classList.add('reveal'), 600);
      setTimeout(() => subtitle.classList.add('reveal'), 1200);
      setTimeout(() => ctaGroup.classList.add('reveal'), 1800);
    };

    if (!reducedMotion) {
      setTimeout(reveal, 600);
    } else {
      reveal();
    }

    // Hero CTA buttons
    if (ctaGroup) {
      ctaGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.home__cta');
        if (btn && btn.dataset.room) {
          Navigation.show();
          Router.goTo(btn.dataset.room);
        }
      });
    }

    // Section CTA buttons
    document.querySelectorAll('.home-section__cta').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.room) {
          Navigation.show();
          Router.goTo(btn.dataset.room);
        }
      });
    });

    if (home) {
      home.addEventListener('click', (e) => {
        if (e.target === home && this.completed) {
          Navigation.show();
        }
      });
    }
  }
};
