const Entrance = {
  completed: false,

  init() {
    const wordmark = document.querySelector('.entrance__wordmark');
    const line = document.querySelector('.entrance__line');
    const sub = document.querySelector('.entrance__sub');
    const tagline = document.querySelector('.entrance__tagline');
    const invitation = document.querySelector('.entrance__invitation');
    const sofa = document.querySelector('.entrance__sofa');
    const entrance = document.querySelector('[data-room="entrance"]');

    if (!wordmark) return;

    const reducedMotion = ReducedMotion.prefersReduced;

    const reveal = () => {
      if (this.completed) return;
      this.completed = true;

      if (reducedMotion) {
        wordmark.classList.add('reveal');
        line.classList.add('reveal');
        sub.classList.add('reveal');
        tagline.classList.add('reveal');
        invitation.classList.add('reveal');
        sofa.classList.add('reveal');
        return;
      }

      wordmark.classList.add('reveal');
      setTimeout(() => {
        wordmark.classList.add('breathing');
      }, 3000);

      setTimeout(() => line.classList.add('reveal'), 500);
      setTimeout(() => sub.classList.add('reveal'), 1500);
      setTimeout(() => tagline.classList.add('reveal'), 2000);
      setTimeout(() => invitation.classList.add('reveal'), 2800);
      setTimeout(() => sofa.classList.add('reveal'), 3500);
    };

    if (!reducedMotion) {
      setTimeout(reveal, 800);
    } else {
      reveal();
    }

    if (invitation) {
      invitation.addEventListener('click', (e) => {
        e.stopPropagation();
        this.enter();
      });
      invitation.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.enter();
        }
      });
    }

    if (entrance) {
      entrance.addEventListener('click', (e) => {
        if (e.target === entrance && this.completed) {
          this.enter();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!this.completed) return;
        if (Store.get('currentRoom') === 'entrance') {
          this.enter();
        }
      }
    });
  },

  enter() {
    if (Store.get('isTransitioning')) return;
    Navigation.show();
    Router.goTo('rooms');
  }
};
