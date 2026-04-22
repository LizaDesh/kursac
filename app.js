// ===== ЗАГРУЗКА ДАННЫХ =====
loadData(); // Загружаем книги из localStorage

// ===== ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ =====
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded"); // Добавляем анимацию появления страницы
  renderBooks(); // Отображаем книги
  initTheme(); // Инициализируем тему (тёмную или светлую)
});

// ===== КОНТЕЙНЕР ДЛЯ КНИГ =====
const container = document.getElementById("booksContainer");

/* ===== ФУНКЦИЯ РЕНДЕРА КНИГ ===== */
function renderBooks() {
  container.innerHTML = ""; // Очищаем контейнер перед рендером
  
  // Если книг нет
  if (books.length === 0) {
    container.innerHTML = `<p class="no-books">Книг пока нет. ➕ Добавьте первую!</p>`;
    return;
  }
  
  // Перебираем все книги
  books.forEach(book => {
    const percent = Math.round((book.readPages / book.totalPages) * 100) || 0; // Вычисляем процент прочитанного
    
    const card = document.createElement("div");
    card.className = "book-card";
    
    // Определяем текст статуса книги
    let statusText = "Не начинал"; // Если ничего не прочитано
    if (book.readPages > 0 && book.readPages < book.totalPages) statusText = "Читаю"; // Если читается
    if (book.readPages >= book.totalPages && book.totalPages > 0) statusText = "Прочитано"; // Если закончено
    
    // Формируем HTML карточки
    card.innerHTML = `
      <img src="${book.image}" class="book-img" alt="Обложка книги ${book.title}">

      <div class="book-content">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>

        <div class="book-progress-text">
          ${book.readPages} / ${book.totalPages} стр.
        </div>

        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>

        <div class="book-status">${statusText}</div>

        <div class="book-actions">
          <button class="delete-btn" data-id="${book.id}">🗑️ Удалить</button>
        </div>
      </div>
    `;
    
    // Добавляем карточку в контейнер
    container.appendChild(card);
  });
  
  // ===== ОБРАБОТКА КНОПКИ УДАЛЕНИЯ =====
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id); // Получаем ID книги
      deleteBook(id); // Удаляем книгу из массива и localStorage
      renderBooks(); // Перерисовываем книги
    });
  });
}
