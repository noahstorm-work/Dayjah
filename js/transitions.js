const Transitions = {
  switchRoom(fromId, toId) {
    try {
      const from = document.querySelector(`[data-room="${fromId}"]`);
      const to = document.querySelector(`[data-room="${toId}"]`);
      if (!from || !to) return;

      from.classList.remove('active');
      to.classList.add('active');

      document.body.style.backgroundColor = this.getRoomBg(toId);
      Navigation.updateActive(toId);
      this.manageFocus(toId);
    } catch(e) {
      console.error('switchRoom error:', e);
    }
  },

  getRoomBg(roomId) {
    const map = {
      home: 'var(--c-body)',
      diary: 'var(--c-body)',
      gallery: 'var(--c-body)',
      'reading-room': 'var(--c-bone)',
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
        try { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); } catch(e) {}
      }
    }
  }
};
