import { addNote } from '../app.js';

export class NoteForm extends HTMLElement {
  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }
  connectedCallback() {
    this.innerHTML = `
        <form id="form">
            <input type="text" id="title" placeholder="Judul" required />
            <textarea id="body" rows="4" placeholder="Isi Catatan" required></textarea>
            <button type="submit">Tambah Catatan</button>
        </form>
    `;

    const form = this.querySelector('#form');
    const titleInput = this.querySelector('#title');
    const bodyInput = this.querySelector('#body');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title && body) {
        const newNote = {
          title,
          body,
        };
        addNote(newNote);
        form.reset();
      }
    });
  }
}
customElements.define('note-form', NoteForm);
