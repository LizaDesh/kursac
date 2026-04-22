document.addEventListener("DOMContentLoaded", () => {
  
  loadData();
  document.body.classList.add("loaded");
  
  const form = document.getElementById("bookForm");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = Number(document.getElementById("pages").value);
    const image = document.getElementById("image").value.trim();
    
    if (!title || !author || pages <= 0) {
      alert("Заполни поля правильно");
      return;
    }
    
    const book = {
      id: Date.now(),
      title,
      author,
      totalPages: pages,
      readPages: 0,
      status: "reading",
      image: image || "https://via.placeholder.com/200x300?text=No+Cover"
    };
    
    books.push(book);
    saveData();
    
    window.location.href = "index.html";
  });
  
});