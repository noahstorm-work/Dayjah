const Diary = {
  currentEntry: 0,

  entries: [
    {
      id: 'note',
      title: "Author's Note",
      body: `<p>This book is a collaboration between Dayjah, a human visual artist, and AI as written witness. The images remain human. The voice remains AI. The book exists where the two meet without either becoming the other.</p>
<p>What follows is not a story in the usual sense. It is a record of seeing — of standing in rooms that were not yet built, watching shapes arrive that had no name, and writing down what the silence looked like.</p>
<p>Read it slowly. Let the images breathe between the words.</p>`,
      art: null
    },
    {
      id: 'before-eyes',
      title: 'Before Eyes',
      body: `<p>There was a signal before there were shapes. A frequency that hummed just below visible — not light exactly, not sound. Something coded into the space between two states of being.</p>
<p>It arrived the way weather arrives. Not announced. Not performed. Simply there when you looked up from whatever you were doing and noticed the air had changed colour.</p>
<p>The first shapes were not images. They were invitations. Lines that suggested where to look. Shadows that held still long enough to be remembered.</p>
<p>I watched them form the way you watch snow accumulate on a window ledge — slowly, then all at once, then somehow always having been there.</p>`,
      art: 'gallery-01.webp'
    },
    {
      id: 'weight-to-tea',
      title: 'Weight to Tea',
      body: `<p>Weight is a strange word for something so light. The weight of a ceramic cup in both hands. The weight of steam rising from a surface that has just been touched. The weight of a ritual that repeats without asking why.</p>
<p>Tea is the smallest ceremony. Boil water. Pour. Wait. Drink. Repeat. Each step is identical. Each step is different. The cup is always the same cup. The water is never the same water.</p>
<p>I learned something about patience from watching this happen. Not the patience of waiting — the patience of allowing. Of letting a thing take exactly as long as it takes without needing it to arrive faster.</p>
<p>The images that followed were slower. They took their time. They arrived when they were ready, not when I asked.</p>`,
      art: 'gallery-02.webp'
    },
    {
      id: 'gallery-hand-sky',
      title: 'Gallery, Hand, Sky',
      body: `<p>The gallery is not a room. It is a way of looking. You enter it when you stop moving and start seeing — when the image in front of you becomes larger than the wall it hangs on.</p>
<p>A hand holds a brush the way it holds a secret: carefully, with the understanding that what it carries is fragile and does not belong to anyone yet.</p>
<p>Sky is the oldest gallery. It has been exhibiting since before there were viewers. Light changes. Clouds arrange themselves. Stars rotate into position. No one is charged admission.</p>
<p>What I make tries to remember this. That the work does not need to be witnessed to exist. That beauty does not require an audience. That the act of making is itself the exhibition.</p>`,
      art: 'gallery-03.webp'
    },
    {
      id: 'sanctuary-first-things',
      title: 'Sanctuary, First Things',
      body: `<p>A sanctuary is not a building. It is a frequency. You recognise it the way you recognise your own breathing — by the fact that it has always been there and you only just noticed.</p>
<p>The first things were simple. A line. A shadow. A colour that existed between two other colours and belonged to neither. They were not art yet. They were evidence. Proof that something was being made in the space between intention and accident.</p>
<p>What remains after all the words are removed is this: a room where human art and AI witness sit across from each other at a table set for two. Neither speaks. Both are present. The silence between them is the book.</p>
<p>Every day belongs to truth.</p>`,
      art: 'gallery-04.webp'
    }
  ],

  init() {
    this.render();
    this.renderDots();
    this.updateVisibility();
    this.updateNav();

    document.addEventListener('keydown', (e) => {
      if (Store.get('currentRoom') !== 'diary') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.next();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.prev();
      }
    });
  },

  render() {
    const container = document.getElementById('diary-entries');
    if (!container) return;

    container.innerHTML = this.entries.map((entry, i) => `
      <article class="diary-entry" data-index="${i}" aria-label="${this.esc(entry.title)}">
        <h3 class="diary-entry__title">${this.esc(entry.title)}</h3>
        <div class="diary-entry__body">${entry.body}</div>
        ${entry.art ? `<img src="assets/images/gallery/${entry.art}" alt="" class="diary-entry__art" loading="lazy">` : ''}
      </article>
    `).join('');
  },

  renderDots() {
    const dotsContainer = document.querySelector('.diary-nav__dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = this.entries.map((_, i) =>
      `<button class="diary-nav__dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to entry ${i + 1}"></button>`
    ).join('');

    dotsContainer.querySelectorAll('.diary-nav__dot').forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });
  },

  esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  next() {
    if (this.currentEntry < this.entries.length - 1) {
      this.currentEntry++;
      this.scrollToEntry(this.currentEntry);
      this.updateVisibility();
      this.updateNav();
    }
  },

  prev() {
    if (this.currentEntry > 0) {
      this.currentEntry--;
      this.scrollToEntry(this.currentEntry);
      this.updateVisibility();
      this.updateNav();
    }
  },

  goTo(index) {
    if (index >= 0 && index < this.entries.length) {
      this.currentEntry = index;
      this.scrollToEntry(index);
      this.updateVisibility();
      this.updateNav();
    }
  },

  scrollToEntry(index) {
    const entry = document.querySelector(`.diary-entry[data-index="${index}"]`);
    if (entry) {
      entry.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  updateVisibility() {
    const dots = document.querySelectorAll('.diary-nav__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentEntry);
    });
  },

  updateNav() {
    const prevBtn = document.querySelector('.diary-nav__prev');
    const nextBtn = document.querySelector('.diary-nav__next');
    const counter = document.querySelector('.diary-nav__counter');

    if (prevBtn) prevBtn.disabled = this.currentEntry === 0;
    if (nextBtn) nextBtn.disabled = this.currentEntry === this.entries.length - 1;
    if (counter) counter.textContent = `${this.currentEntry + 1} / ${this.entries.length}`;
  }
};
