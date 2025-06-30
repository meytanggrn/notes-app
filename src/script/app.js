const baseUrl = 'https://notes-api.dicoding.dev/v2';

export const addNote = async (note) => {
  try {
    Swal.fire({
      title: 'Menyimpan...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });

    const responseJson = await response.json();

    if (!response.ok) throw new Error(responseJson.message);

    Swal.fire({
      icon: 'success',
      title: 'Catatan berhasil ditambahkan!',
      showConfirmButton: false,
      timer: 1500,
    });

    await loadNotes();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal Menyimpan',
      text: error.message,
    });
  }
};

export const loadNotes = async () => {
  showLoad();
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();
    const notes = responseJson.data;
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    if (notes.length > 0) {
      notes.forEach((note) => addNoteToList(note));
    } else {
      showResponseMessage('Tidak ada catatan.');
    }
  } catch (error) {
    showResponseMessage('Gagal mengambil catatan: ' + error.message);
  } finally {
    hideLoad();
  }
};
const deleteNote = async (noteId) => {
  try {
    Swal.fire({
      title: 'Menghapus catatan...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
    });

    const responseJson = await response.json();
    if (!response.ok) throw new Error(responseJson.message);
    Swal.close();
    Swal.fire({
      icon: 'success',
      title: 'Catatan berhasil dihapus',
      timer: 1500,
      showConfirmButton: false,
    });
    await loadNotes();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal Menghapus',
      text: error.message,
    });
  }
};

document.getElementById('noteList').addEventListener('delete-note', (event) => {
  const noteId = event.detail.id;
  deleteNote(noteId);
});

export function addNoteToList(note) {
  const noteList = document.getElementById('noteList');
  const noteElement = document.createElement('note-item');
  noteElement.setAttribute('id', note.id);
  noteElement.setAttribute('title', note.title);
  noteElement.setAttribute('body', note.body);
  noteElement.setAttribute('created-at', note.createdAt);
  noteElement.setAttribute('archived', note.archived);
  noteList.prepend(noteElement);
}

const showLoad = () => {
  const loadElement = document.getElementById('load');
  if (loadElement) {
    loadElement.classList.add('active');
    loadElement.style.display = 'flex'; 
  }
};
function hideLoad() {
  const loadElement = document.getElementById('load');
  if (loadElement) {
    loadElement.classList.remove('active');

    setTimeout(() => {
      if (!loadElement.classList.contains('active')) {
        loadElement.style.display = 'none';
      }
    }, 400);
  }
};

const showResponseMessage = (message = 'Check your internet connection') => {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = `<div style="text-align:center; color:gray; margin:16px;">${message}</div>`;
};

export function main() {
  document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
  });
}
