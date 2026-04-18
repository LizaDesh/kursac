/* ===== ХРАНИЛИЩЕ ===== */

// ключ для localStorage (лучше не просто "books")
const STORAGE_KEY = "bookTracker_books";

/* массив книг */
let books = [];

/* ===== СОХРАНЕНИЕ ===== */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error("Ошибка сохранения:", error);
  }
}

/* ===== ЗАГРУЗКА ===== */
function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      books = [];
      return;
    }

    books = JSON.parse(data);

    // защита: если вдруг данные повреждены
    if (!Array.isArray(books)) {
      books = [];
    }

  } catch (error) {
    console.error("Ошибка загрузки:", error);
    books = [];
  }
}

/* ===== ДОБАВЛЕНИЕ КНИГИ ===== */
function addBook(book) {
  books.push(book);
  saveData();
}

/* ===== УДАЛЕНИЕ КНИГИ ===== */
function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  saveData();
}

/* ===== ОБНОВЛЕНИЕ КНИГИ ===== */
function updateBook(id, updatedData) {
  books = books.map(book => 
    book.id === id ? { ...book, ...updatedData } : book
  );
  saveData();
}