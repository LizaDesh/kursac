document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("booksContainer");

  if (!container) {
    console.error("❌ booksContainer не найден");
    return;
  }

  loadData();
  document.body.classList.add("loaded");

  renderBooks();

  // ===== УДАЛЕНИЕ =====
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;

    deleteBook(Number(btn.dataset.id));
    saveData();
    renderBooks();
  });

  if (typeof initTheme === "function") {
    initTheme();
  }

  // ===== РЕНДЕР =====
  function renderBooks() {

    container.innerHTML = "";

    if (!Array.isArray(books) || books.length === 0) {
      container.innerHTML = `<p class="no-books">Книг пока нет. Добавьте первую!</p>`;
      return;
    }

    const isHome = window.location.pathname.includes("index");
    const list = isHome ? books.slice(0, 3) : books;

    list.forEach(book => {

      const percent = book.totalPages
        ? Math.round((book.readPages / book.totalPages) * 100)
        : 0;

      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <div class="book-cover-wrapper">
          <img src="${book.image}" class="book-cover">
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

          <div class="book-actions">
            <button class="delete-btn" data-id="${book.id}">
              🗑️ Удалить
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // ===== + КАРТОЧКА =====
    if (isHome && books.length > 3) {

      const moreCount = books.length - 3;

      const moreCard = document.createElement("div");
      moreCard.className = "book-card more-card";

      moreCard.innerHTML = `
        <div class="more-content">
          <div class="plus">＋</div>
          <div class="text">Остальные книги</div>
          <div class="subtext">${moreCount} книг</div>
        </div>
      `;

      moreCard.addEventListener("click", () => {
        window.location.href = "library.html";
      });

      container.appendChild(moreCard);
    }
  }

});