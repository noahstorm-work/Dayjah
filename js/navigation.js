const Navigation = {
  nav: null,
  buttons: [],

  init() {
    this.nav = document.querySelector('.compass-nav');
    this.buttons = this.nav?.querySelectorAll('.compass-nav__btn');

    if (!this.nav) return;

    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.dataset.room;
        if (roomId && roomId !== Store.get('currentRoom')) {
          Router.goTo(roomId);
        }
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const roomId = btn.dataset.room;
          if (roomId && roomId !== Store.get('currentRoom')) {
            Router.goTo(roomId);
          }
        }
      });
    });
  },

  show() {
    if (this.nav) {
      this.nav.classList.add('visible');
    }
  },

  updateActive(roomId) {
    this.buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.room === roomId);
      btn.setAttribute('aria-current', btn.dataset.room === roomId ? 'page' : 'false');
    });
  }
};
