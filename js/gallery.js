const Gallery = {
  data: [
    { title: 'Horizon Study', meta: 'Digital pigment on canvas, 2026', src: 'assets/images/long-gallery/horizon-study.svg', alt: 'Horizon Study — Abstract landscape with warm earth tones and atmospheric light' },
    { title: 'Field of Form', meta: 'Mixed media on paper, 2025', src: 'assets/images/long-gallery/field-of-form.svg', alt: 'Field of Form — Abstract organic composition in earth and moss tones' },
    { title: 'Face Study', meta: 'Ink on paper, 2025', src: 'assets/images/drawing-room/face-study.svg', alt: 'Face Study — Continuous line portrait in warm charcoal' },
    { title: 'Line Form', meta: 'Charcoal on paper, 2025', src: 'assets/images/drawing-room/line-form.svg', alt: 'Line Form — Abstract flowing line composition in warm tones' },
    { title: 'Botanical Study', meta: 'Graphite on paper, 2025', src: 'assets/images/cabinet/botanical-study.svg', alt: 'Botanical Study — Delicate botanical line study in warm earth tones' },
    { title: 'Geometric Study', meta: 'Ink and pigment on paper, 2026', src: 'assets/images/cabinet/geometric-study.svg', alt: 'Geometric Study — Abstract geometric composition in warm clay and charcoal' }
  ],

  overlay: null,
  image: null,
  titleEl: null,
  metaEl: null,
  closeBtn: null,

  init() {
    this.overlay = document.getElementById('gallery-overlay');
    if (!this.overlay) {
      console.warn('Gallery: overlay element not found');
      return;
    }
    this.image = this.overlay.querySelector('.gallery-overlay__image');
    this.titleEl = this.overlay.querySelector('.gallery-overlay__title');
    this.metaEl = this.overlay.querySelector('.gallery-overlay__meta');
    this.closeBtn = this.overlay.querySelector('.gallery-overlay__close');

    this.render();

    const grid = document.getElementById('gallery-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) this.open(item);
      });
    }

    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Store.get('galleryOpen')) this.close();
    });
  },

  render() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = this.data.map((item, i) =>
      `<div class="gallery-item" role="listitem" tabindex="0"
            data-title="${this.esc(item.title)}"
            data-meta="${this.esc(item.meta)}"
            data-src="${this.esc(item.src)}"
            aria-label="${this.esc(item.title)} — ${this.esc(item.meta)}">
        <img src="${this.esc(item.src)}"
             alt="${this.esc(item.alt)}"
             class="gallery-item__image"
             loading="lazy">
        <div class="gallery-item__info">
          <span class="gallery-item__title">${this.esc(item.title)}</span>
          <span class="gallery-item__meta">${this.esc(item.meta)}</span>
        </div>
      </div>`
    ).join('');

    grid.querySelectorAll('.gallery-item__image').forEach(img => {
      img.addEventListener('error', function() {
        this.parentElement.classList.add('gallery-item--broken');
      });
    });
  },

  esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  },

  open(item) {
    const src = item.dataset.src || item.querySelector('.gallery-item__image')?.src;
    const title = item.dataset.title || 'Untitled';
    const meta = item.dataset.meta || '';
    if (!src) return;

    Store.set('galleryOpen', true);
    if (this.image) {
      this.image.src = src;
      this.image.alt = title;
      this.image.onerror = () => { this.image.alt = 'Image failed to load'; };
    }
    if (this.titleEl) this.titleEl.textContent = title;
    if (this.metaEl) this.metaEl.textContent = meta;

    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (this.closeBtn) setTimeout(() => this.closeBtn.focus(), 100);
  },

  close() {
    Store.set('galleryOpen', false);
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};
