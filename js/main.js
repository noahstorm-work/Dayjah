(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    ReducedMotion.init();
    Router.init();
    Navigation.init();
    Gallery.init();
    Entrance.init();

    const hash = window.location.hash.slice(1);
    if (hash && Store.get('rooms').includes(hash) && hash !== 'entrance') {
      setTimeout(() => {
        Navigation.show();
        Router.goTo(hash, true);
      }, 100);
    }

    Store.set('currentRoom', 'entrance');
    document.querySelector('[data-room="entrance"]')?.classList.add('active');

    /* Room card click handlers */
    document.querySelectorAll('.room-card').forEach(card => {
      card.addEventListener('click', () => {
        const target = card.dataset.roomTarget;
        if (target) Router.goTo(target);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = card.dataset.roomTarget;
          if (target) Router.goTo(target);
        }
      });
    });
  });
})();
