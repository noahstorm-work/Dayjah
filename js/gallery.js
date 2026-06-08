const Gallery = {
  data: Array.from({ length: 36 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    const titles = [
      'Fractured Presence', 'Hidden Architecture', 'Witness Signal', 'Stone Memory',
      'Sanctuary Light', 'Inner Circuit', 'Silent Pattern', 'Breath Structure',
      'Shadow Atlas', 'Threshold', 'Memory Surface', 'Living Archive',
      'Signal Path', 'Deep Root', 'Weather Bone', 'Still Current',
      'Ghost Thread', 'Warm Geometry', 'Edge Language', 'Ground Signal',
      'Quiet Force', 'Skin Map', 'Dust Pattern', 'Light Fracture',
      'Iron Whisper', 'Salt Memory', 'Clay Voice', 'Ash Signal',
      'Ember Thread', 'Root Atlas', 'Stone Breath', 'Dark Bloom',
      'Still Circuit', 'Warm Archive', 'Shadow Threshold', 'Inner Weather'
    ];
    return {
      title: titles[i] || `Gallery ${n}`,
      meta: 'Digital work, 2026',
      src: `assets/images/gallery/gallery-${n}.webp`,
      alt: `${titles[i] || 'Artwork'} — digital artwork by Dayjah`
    };
  }),

  overlay: null,
  image: null,
  titleEl: null,
  metaEl: null,
  closeBtn: null,
  triggerItem: null,

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

      // Keyboard activation for gallery items
      grid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const item = e.target.closest('.gallery-item');
          if (item) {
            e.preventDefault();
            this.open(item);
          }
        }
      });

      grid.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.gallery-item')) e.preventDefault();
      });
    }

    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Store.get('galleryOpen')) this.close();
      // Focus trap
      if (Store.get('galleryOpen') && e.key === 'Tab') {
        this.trapFocus(e);
      }
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
             loading="lazy"
             draggable="false">
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
      img.addEventListener('dragstart', e => e.preventDefault());
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

    // Store trigger for focus restore
    this.triggerItem = item;

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
    // Restore focus to triggering item
    if (this.triggerItem) {
      this.triggerItem.focus();
      this.triggerItem = null;
    }
  },

  trapFocus(e) {
    const focusable = this.overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};
