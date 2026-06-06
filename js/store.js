const Store = {
  state: {
    currentRoom: 'home',
    previousRoom: null,
    isTransitioning: false,
    galleryOpen: false,
    galleryData: null,
    rooms: ['home', 'diary', 'gallery', 'reading-room', 'sanctuary', 'editions', 'enquiries']
  },

  get(key) {
    return this.state[key];
  },

  set(key, value) {
    this.state[key] = value;
  }
};
