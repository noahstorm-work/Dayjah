const Router = {
  init() {
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.room) {
        this.goTo(e.state.room, true);
      }
    });
  },

  goTo(roomId, isPop = false) {
    if (Store.get('currentRoom') === roomId) return;
    if (!Store.get('rooms').includes(roomId)) return;

    const prev = Store.get('currentRoom');
    Store.set('previousRoom', prev);
    Store.set('currentRoom', roomId);

    if (!isPop && roomId !== 'home') {
      window.history.pushState({ room: roomId }, '', `#${roomId}`);
    }

    Transitions.switchRoom(prev, roomId);
  }
};
