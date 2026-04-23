const STORAGE_KEY = "bookTracker_books";
window.books = window.books || [];

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  window.books = data ? JSON.parse(data) : [];
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(window.books));
}

function addBook(bookData) {
  const book = {
    id: Date.now(),
    title: bookData.title,
    author: bookData.author,
    totalPages: Number(bookData.totalPages) || 0,
    readPages: 0,
    status: "reading",
    image: bookData.image || "https://via.placeholder.com/200x300",
    history: []
  };

  window.books.push(book);
  saveData();
}

function getBookById(id) {
  return window.books.find(b => Number(b.id) === Number(id));
}