const Navigation = {
  buttons: [],

  updateActive(roomId) {
    this.buttons = document.querySelectorAll('.site-nav__btn');
    this.buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.room === roomId);
      if (btn.dataset.room === roomId) {
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  }
};
