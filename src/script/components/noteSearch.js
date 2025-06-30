export class NoteSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <input type="text" id="searchInput" placeholder="Cari catatan..." />
    `;

    const input = this.querySelector('#searchInput');
    input.addEventListener('input', () => {
      const keyword = input.value.toLowerCase();
      const allNotes = document.querySelectorAll('note-item');

      allNotes.forEach((note) => {
        const title = note.getAttribute('title').toLowerCase();
        const body = note.getAttribute('body').toLowerCase();

        if (title.includes(keyword) || body.includes(keyword)) {
          note.style.display = 'block';
        } else {
          note.style.display = 'none';
        }
      });
    });
  }
}
customElements.define('note-search', NoteSearch);
