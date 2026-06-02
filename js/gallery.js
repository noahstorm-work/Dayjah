const Gallery = {
  overlay: null,
  image: null,
  title: null,
  meta: null,
  closeBtn: null,
  openItems: [],

  init() {
    this.overlay = document.getElementById('gallery-overlay');
    this.image = this.overlay?.querySelector('.gallery-overlay__image');
    this.title = this.overlay?.querySelector('.gallery-overlay__title');
    this.meta = this.overlay?.querySelector('.gallery-overlay__meta');
    this.closeBtn = this.overlay?.querySelector('.gallery-overlay__close');

    if (!this.overlay) return;

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => this.open(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.open(item);
        }
      });
    });

    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Store.get('galleryOpen')) this.close();
    });
  },

  open(item) {
    const src = item.dataset.src || item.querySelector('.gallery-item__image')?.src;
    const title = item.dataset.title || item.querySelector('.gallery-item__title')?.textContent || 'Untitled';
    const meta = item.dataset.meta || item.querySelector('.gallery-item__meta')?.textContent || '';

    if (!src) return;

    Store.set('galleryOpen', true);
    Store.set('galleryData', { src, title, meta });

    if (this.image) this.image.src = src;
    if (this.image) this.image.alt = title;
    if (this.title) this.title.textContent = title;
    if (this.meta) this.meta.textContent = meta;

    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (this.closeBtn) {
      setTimeout(() => this.closeBtn.focus(), 100);
    }
  },

  close() {
    Store.set('galleryOpen', false);
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};
