const Transitions = {
  switchRoom(fromId, toId) {
    if (Store.get('isTransitioning')) return;
    Store.set('isTransitioning', true);

    const from = document.querySelector(`[data-room="${fromId}"]`);
    const to = document.querySelector(`[data-room="${toId}"]`);
    if (!from || !to) {
      Store.set('isTransitioning', false);
      return;
    }

    from.classList.remove('active');
    const duration = ReducedMotion.prefersReduced ? 0 : 600;

    setTimeout(() => {
      to.classList.add('active');
      this.afterTransition(fromId, toId);
    }, duration + 50);
  },

  afterTransition(fromId, toId) {
    document.body.style.backgroundColor = this.getRoomBg(toId);
    Navigation.updateActive(toId);
    Store.set('isTransitioning', false);
    this.manageFocus(toId);
  },

  getRoomBg(roomId) {
    const map = {
      home: 'var(--c-body)',
      diary: 'var(--c-body)',
      gallery: 'var(--c-body)',
      sanctuary: 'var(--c-body)',
      editions: 'var(--c-body)',
      enquiries: 'var(--c-body)'
    };
    return map[roomId] || 'var(--c-body)';
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
