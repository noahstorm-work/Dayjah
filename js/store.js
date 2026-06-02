const Store = {
  state: {
    currentRoom: 'entrance',
    previousRoom: null,
    isTransitioning: false,
    galleryOpen: false,
    galleryData: null,
    rooms: ['entrance', 'rooms', 'gallery', 'garden', 'objects', 'about', 'contact']
  },

  get(key) {
    return this.state[key];
  },

  set(key, value) {
    this.state[key] = value;
  }
};
