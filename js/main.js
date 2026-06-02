(function() {
  'use strict';

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleObjectsForm(e) {
    e.preventDefault();
    const input = document.getElementById('objects-email');
    const email = input ? input.value.trim() : '';
    if (!email) {
      alert('Please enter your email address.');
      input?.focus();
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      input?.focus();
      return;
    }
    alert('Thank you. We will let you know when the first pieces arrive.');
    input.value = '';
  }

  function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    if (!name || !email || !message) return;
    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const messageVal = message.value.trim();
    if (!nameVal) {
      alert('Please enter your name.');
      name.focus();
      return;
    }
    if (!emailVal) {
      alert('Please enter your email address.');
      email.focus();
      return;
    }
    if (!isValidEmail(emailVal)) {
      alert('Please enter a valid email address.');
      email.focus();
      return;
    }
    if (!messageVal) {
      alert('Please enter a message.');
      message.focus();
      return;
    }
    alert('Thank you. Your message has been received.');
    name.value = '';
    email.value = '';
    message.value = '';
  }

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

    /* Form handlers */
    const objectsForm = document.querySelector('.objects__form');
    if (objectsForm) {
      objectsForm.addEventListener('submit', handleObjectsForm);
    }

    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactForm);
    }
  });
})();
