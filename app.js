let container;

document.addEventListener("DOMContentLoaded", () => {
  container = document.getElementById("booksContainer");

  if (!container) return;

  loadData();

  document.body.classList.add("loaded");

  renderBooks();

  // ===== УДАЛЕНИЕ (глобально, 100% работает) =====
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    deleteBook(id);
    renderBooks();
  });

  // тема (если есть функция)
  if (typeof initTheme === "function") {
    initTheme();
  }
});


// ===== РЕНДЕР =====
function renderBooks() {
  if (!container) return;

  container.innerHTML = "";

  if (!Array.isArray(books) || books.length === 0) {
    container.innerHTML = `<p class="no-books">Книг пока нет. Добавьте первую!</p>`;
    return;
  }

  books.forEach(book => {
    const percent = book.totalPages
      ? Math.round((book.readPages / book.totalPages) * 100)
      : 0;

    let statusText = "Не начинал";

    if (book.readPages > 0 && book.readPages < book.totalPages) {
      statusText = "Читаю";
    } else if (book.readPages >= book.totalPages) {
      statusText = "Прочитано";
    }

    const card = document.createElement("div");
    card.className = "book-card";

card.innerHTML = `
  
  <div class="book-cover-wrapper">
    <img src="${book.image}" class="book-cover" alt="${book.title}">
  </div>

  <div class="book-content">
    <div class="book-title">${book.title}</div>
    <div class="book-author">${book.author}</div>

    <div class="book-progress-text">
      ${book.readPages} / ${book.totalPages} стр.
    </div>

    <div class="progress-bar">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>

    <div class="book-status">${statusText}</div>

    <div class="book-actions">
      <button class="delete-btn" data-id="${book.id}">
        🗑️ Удалить
      </button>
    </div>
  </div>
`;

    container.appendChild(card);
  });
}