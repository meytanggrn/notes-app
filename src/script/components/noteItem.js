export class NoteItem extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id');
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const createdAt = this.getAttribute('created-at');

    this.innerHTML = `
      <h3>${title}</h3>
      <p>${body}</p>
      <small>Dibuat pada: ${new Date(createdAt).toLocaleString()}</small><br>
      <button id="deleteBtn">Hapus Catatan</button>
    `;

    this.querySelector('#deleteBtn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: { id },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }
}
customElements.define('note-item', NoteItem);
