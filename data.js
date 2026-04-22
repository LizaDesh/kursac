/* ===== ХРАНИЛИЩЕ ===== */

const STORAGE_KEY = "bookTracker_books";  // ключ для localStorage
let books = [];                           // массив книг

/* ===== ГЕНЕРАЦИЯ УНИКАЛЬНОГО ID ===== */
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/* ===== СОХРАНЕНИЕ ===== */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    notifyChange();
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

    const parsed = JSON.parse(data);
    books = Array.isArray(parsed) ? parsed : [];
    
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    books = [];
  }
}

/* ===== ДОБАВЛЕНИЕ КНИГИ ===== */
function addBook(bookData) {
  const book = {
    id: generateId(),
    title: bookData.title || "Без названия",
    author: bookData.author || "Неизвестный автор",
    totalPages: bookData.totalPages || 0,
    readPages: bookData.readPages || 0,
    status: bookData.status || "reading",
    image: bookData.image || "https://via.placeholder.com/200x300?text=No+Cover"
  };
  
  books.push(book);
  saveData();
  return book;
}

/* ===== УДАЛЕНИЕ КНИГИ ===== */
function deleteBook(id) {
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  if (books.length !== initialLength) saveData();
}

/* ===== ОБНОВЛЕНИЕ КНИГИ ===== */
function updateBook(id, updatedData) {
  let updated = false;
  
  books = books.map(book => {
    if (book.id === id) {
      updated = true;
      return { ...book, ...updatedData };
    }
    return book;
  });

  if (updated) saveData();
  return updated;
}

/* ===== УВЕДОМЛЕНИЯ ДЛЯ UI ===== */
function notifyChange() {
  document.dispatchEvent(new Event('booksUpdated'));
}

/* ===== ПОЛУЧЕНИЕ ВСЕХ КНИГ ===== */
function getAllBooks() {
  return [...books]; // возвращаем копию, чтобы не было прямого доступа
}I 