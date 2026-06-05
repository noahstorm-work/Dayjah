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

  /* ---- Form Submission ---- */
  async function submitForm(endpoint, data) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch {
      return { error: 'Could not reach the server. Please try again.' };
    }
  }

  function showStatus(form, message, isError) {
    let el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-status';
      form.appendChild(el);
    }
    el.textContent = message;
    el.className = 'form-status' + (isError ? ' form-status--error' : '');
  }

  function clearStatus(form) {
    const el = form.querySelector('.form-status');
    if (el) el.textContent = '';
  }

  function setButtonLoading(btn, loading) {
    if (loading) {
      btn.dataset.origText = btn.textContent;
      btn.textContent = 'Sending\u2026';
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.origText || btn.textContent;
      btn.disabled = false;
    }
  }

  /* ---- Enquiries Form ---- */
  function handleEnquiriesForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('.btn');
    const name = document.getElementById('enquiry-name');
    const email = document.getElementById('enquiry-email');
    const type = document.getElementById('enquiry-type');
    const message = document.getElementById('enquiry-message');
    if (!name || !email || !message) return;
    const n = name.value.trim(), em = email.value.trim(), t = type.value, msg = message.value.trim();
    clearStatus(form);
    if (!n) { showStatus(form, 'Please enter your name.', true); name.focus(); return; }
    if (!em) { showStatus(form, 'Please enter your email address.', true); email.focus(); return; }
    if (!isValidEmail(em)) { showStatus(form, 'Please enter a valid email address.', true); email.focus(); return; }
    if (!msg) { showStatus(form, 'Please enter a message.', true); message.focus(); return; }
    setButtonLoading(btn, true);
    submitForm('/api/contact', { name: n, email: em, type: t || 'general', message: msg }).then(result => {
      if (result.success) {
        showStatus(form, 'Thank you. Your message has been received.');
        name.value = ''; email.value = ''; message.value = '';
      } else {
        showStatus(form, result.error || 'Something went wrong.', true);
      }
    }).finally(() => setButtonLoading(btn, false));
  }

  /* ---- Editions Form ---- */
  function handleEditionsForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector('.btn');
    const input = document.getElementById('editions-email');
    const email = input ? input.value.trim() : '';
    clearStatus(form);
    if (!email) { showStatus(form, 'Please enter your email address.', true); input?.focus(); return; }
    if (!isValidEmail(email)) { showStatus(form, 'Please enter a valid email address.', true); input?.focus(); return; }
    setButtonLoading(btn, true);
    submitForm('/api/contact', { email, type: 'editions' }).then(result => {
      if (result.success) {
        showStatus(form, 'Thank you. We will let you know when the first editions arrive.');
        input.value = '';
      } else {
        showStatus(form, result.error || 'Something went wrong.', true);
      }
    }).finally(() => setButtonLoading(btn, false));
  }

  /* ---- Diary Navigation ---- */
  function initDiaryNav() {
    document.querySelector('.diary-nav__prev')?.addEventListener('click', () => Diary.prev());
    document.querySelector('.diary-nav__next')?.addEventListener('click', () => Diary.next());

    document.querySelectorAll('.diary-nav__dots .diary-nav__dot').forEach((dot, i) => {
      dot.addEventListener('click', () => Diary.goTo(i));
    });
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initReducedMotion();
    Router.init();
    Navigation.init();
    Gallery.init();
    Home.init();
    Diary.init();
    initDiaryNav();

    const hash = window.location.hash.slice(1);
    if (hash && Store.get('rooms').includes(hash) && hash !== 'home') {
      Navigation.show();
      setTimeout(() => Router.goTo(hash, true), 50);
    } else {
      Store.set('currentRoom', 'home');
      document.querySelector('[data-room="home"]')?.classList.add('active');
    }

    document.querySelector('.enquiries__form')?.addEventListener('submit', handleEnquiriesForm);
    document.querySelector('.editions__form')?.addEventListener('submit', handleEditionsForm);
  });
})();
