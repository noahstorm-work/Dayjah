(function() {
  'use strict';

  /* ---- Reduced Motion ---- */
  function initReducedMotion() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = (e) => document.body.classList.toggle('reduced-motion', e.matches);
    mq.addEventListener('change', update);
    if (mq.matches) document.body.classList.add('reduced-motion');
  }

  /* ---- Email Validation ---- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Rooms Data ---- */
  const RoomsData = [
    { target: 'gallery', icon: '∿', name: 'The Gallery', desc: 'One piece at a time. Space to look closely.', ariaLabel: 'Enter The Gallery' },
    { target: 'garden',  icon: '⌒', name: 'The Garden',  desc: 'Outside. Breathing. Words and stillness.',  ariaLabel: 'Enter The Garden' },
    { target: 'objects', icon: '◇', name: 'Objects',     desc: 'Curiosities, clothing, things made and found.', ariaLabel: 'Enter Objects' },
    { target: 'about',   icon: '○', name: 'About',       desc: 'The maker, the mission, the why.',         ariaLabel: 'About Dayjah' }
  ];

  function renderRooms() {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;
    grid.innerHTML = RoomsData.map(r =>
      `<button class="room-card" data-room-target="${r.target}" role="listitem" aria-label="${r.ariaLabel}">
        <span class="room-card__icon" aria-hidden="true">${r.icon}</span>
        <span class="room-card__name">${r.name}</span>
        <span class="room-card__desc">${r.desc}</span>
        <span class="room-card__arrow" aria-hidden="true">→</span>
      </button>`
    ).join('');
  }

  /* ---- Form Handlers ---- */
  function handleObjectsForm(e) {
    e.preventDefault();
    const input = document.getElementById('objects-email');
    const email = input ? input.value.trim() : '';
    if (!email) { alert('Please enter your email address.'); input?.focus(); return; }
    if (!isValidEmail(email)) { alert('Please enter a valid email address.'); input?.focus(); return; }
    alert('Thank you. We will let you know when the first pieces arrive.');
    input.value = '';
  }

  function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    if (!name || !email || !message) return;
    const n = name.value.trim(), em = email.value.trim(), msg = message.value.trim();
    if (!n) { alert('Please enter your name.'); name.focus(); return; }
    if (!em) { alert('Please enter your email address.'); email.focus(); return; }
    if (!isValidEmail(em)) { alert('Please enter a valid email address.'); email.focus(); return; }
    if (!msg) { alert('Please enter a message.'); message.focus(); return; }
    alert('Thank you. Your message has been received.');
    name.value = ''; email.value = ''; message.value = '';
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initReducedMotion();
    Router.init();
    Navigation.init();
    Gallery.init();
    Entrance.init();
    renderRooms();

    const hash = window.location.hash.slice(1);
    if (hash && Store.get('rooms').includes(hash) && hash !== 'entrance') {
      Navigation.show();
      setTimeout(() => Router.goTo(hash, true), 50);
    } else {
      Store.set('currentRoom', 'entrance');
      document.querySelector('[data-room="entrance"]')?.classList.add('active');
    }

    /* Event delegation: room cards */
    document.getElementById('rooms-grid')?.addEventListener('click', (e) => {
      const card = e.target.closest('.room-card');
      if (card) Router.goTo(card.dataset.roomTarget);
    });

    /* Form handlers */
    document.querySelector('.objects__form')?.addEventListener('submit', handleObjectsForm);
    document.querySelector('.contact__form')?.addEventListener('submit', handleContactForm);
  });
})();
