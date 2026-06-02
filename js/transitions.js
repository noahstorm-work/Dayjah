const Transitions = {
  switchRoom(fromId, toId) {
    Store.set('isTransitioning', true);

    const from = document.querySelector(`[data-room="${fromId}"]`);
    const to = document.querySelector(`[data-room="${toId}"]`);

    if (!from || !to) {
      Store.set('isTransitioning', false);
      return;
    }

    const reducedMotion = ReducedMotion.prefersReduced;

    if (reducedMotion) {
      from.classList.remove('active');
      to.classList.add('active');
      this.afterTransition(fromId, toId);
      return;
    }

    from.classList.remove('active');

    const onTransitionEnd = () => {
      from.removeEventListener('transitionend', onTransitionEnd);
      to.classList.add('active');
      setTimeout(() => {
        this.afterTransition(fromId, toId);
      }, 100);
    };

    from.addEventListener('transitionend', onTransitionEnd);

    setTimeout(() => {
      if (from.classList.contains('active')) {
        from.removeEventListener('transitionend', onTransitionEnd);
        to.classList.add('active');
        setTimeout(() => this.afterTransition(fromId, toId), 100);
      }
    }, 800);
  },

  afterTransition(fromId, toId) {
    document.body.style.backgroundColor = this.getRoomBg(toId);
    Navigation.updateActive(toId);
    Store.set('isTransitioning', false);
    this.manageFocus(toId);
  },

  getRoomBg(roomId) {
    const map = {
      entrance: 'var(--c-dusk)',
      rooms: 'var(--c-bone)',
      gallery: 'var(--c-warm-white)',
      garden: 'var(--c-warm-white)',
      objects: 'var(--c-charcoal)',
      about: 'var(--c-bone)',
      contact: 'var(--c-bone)'
    };
    return map[roomId] || 'var(--c-bone)';
  },

  manageFocus(roomId) {
    const room = document.querySelector(`[data-room="${roomId}"]`);
    if (room) {
      const heading = room.querySelector('h2') || room.querySelector('h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }
  }
};
