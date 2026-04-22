/* ===== ХРАНИЛИЩЕ ===== */

const STORAGE_KEY = "bookTracker_books";
let books = [];

/* ===== ID ===== */
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

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

    books = data ? JSON.parse(data) : [];

    if (!Array.isArray(books)) {
      books = [];
    }

  } catch (error) {
    console.error("Ошибка загрузки:", error);
    books = [];
  }
}

/* ===== ДОБАВЛЕНИЕ ===== */
function addBook(bookData) {
  const book = {
    id: generateId(),
    title: bookData.title || "Без названия",
    author: bookData.author || "Неизвестный автор",
    totalPages: Number(bookData.totalPages) || 0,
    readPages: Number(bookData.readPages) || 0,
    status: bookData.status || "reading",
    image: bookData.image || "https://via.placeholder.com/200x300?text=No+Cover"
  };

  books.push(book);
  saveData();
  return book;
}

/* ===== УДАЛЕНИЕ (ВАЖНО ИСПРАВЛЕНО) ===== */
function deleteBook(id) {
  id = Number(id); // 🔥 FIX

  books = books.filter(book => Number(book.id) !== id);
  saveData();
}

/* ===== ОБНОВЛЕНИЕ ===== */
function updateBook(id, updatedData) {
  id = Number(id);

  let updated = false;

  books = books.map(book => {
    if (Number(book.id) === id) {
      updated = true;
      return { ...book, ...updatedData };
    }
    return book;
  });

  if (updated) saveData();
  return updated;
}

/* ===== ПОЛУЧЕНИЕ ===== */
function getAllBooks() {
  return [...books];
}