
const STORAGE_KEY = "bookTracker_books";
let books = [];

/* ===================== */
/* ===== ID ===== */
/* ===================== */
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/* ===================== */
/* ===== СОХРАНЕНИЕ ===== */
/* ===================== */
function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error("❌ Ошибка сохранения:", error);
  }
}

/* ===================== */
/* ===== ЗАГРУЗКА ===== */
/* ===================== */
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
    console.error("❌ Ошибка загрузки localStorage:", error);
    books = [];
  }
}

/* ===================== */
/* ===== ДОБАВЛЕНИЕ ===== */
/* ===================== */
function addBook(bookData) {
  const book = {
    id: generateId(),
    title: bookData.title?.trim() || "Без названия",
    author: bookData.author?.trim() || "Неизвестный автор",
    totalPages: Number(bookData.totalPages) || 0,
    readPages: Number(bookData.readPages) || 0,
    status: bookData.status || "reading",
    image: bookData.image?.trim() || "https://via.placeholder.com/200x300?text=No+Cover"
  };

  books.push(book);
  saveData();

  return book;
}

/* ===================== */
/* ===== УДАЛЕНИЕ ===== */
/* ===================== */
function deleteBook(id) {
  const numId = Number(id);

  books = books.filter(book => Number(book.id) !== numId);

  saveData();
}

/* ===================== */
/* ===== ОБНОВЛЕНИЕ ===== */
/* ===================== */
function updateBook(id, updatedData) {
  const numId = Number(id);
  let updated = false;

  books = books.map(book => {
    if (Number(book.id) === numId) {
      updated = true;
      return { ...book, ...updatedData };
    }
    return book;
  });

  if (updated) saveData();

  return updated;
}

/* ===================== */
/* ===== ПОЛУЧЕНИЕ ===== */
/* ===================== */
function getAllBooks() {
  return [...books];
}