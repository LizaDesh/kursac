document.addEventListener("DOMContentLoaded", () => {

  loadData();
  document.body.classList.add("loaded");

  const container = document.getElementById("bookPage");

  if (!container) {
    console.error("❌ bookPage не найден");
    return;
  }

  const id = Number(new URLSearchParams(location.search).get("id"));

  const book = getBookById(id);

  console.log("ID:", id);
  console.log("BOOK:", book);

  if (!book) {
    container.innerHTML = "<h2>Книга не найдена</h2>";
    return;
  }

  if (!book.history) book.history = [];

  render();

  function render() {

    const percent = book.totalPages
      ? Math.round((book.readPages / book.totalPages) * 100)
      : 0;

    container.innerHTML = `
      <div class="book-detail">

        <img src="${book.image}" class="detail-cover">

        <div class="detail-info">

          <h2>${book.title}</h2>
          <p>${book.author}</p>

          <p>${book.readPages} / ${book.totalPages} (${percent}%)</p>

          <select id="status">
            <option value="reading">Читаю</option>
            <option value="done">Прочитал</option>
            <option value="planned">Отложил</option>
          </select>

          <input type="range"
            id="progress"
            min="0"
            max="${book.totalPages || 1}"
            value="${book.readPages}">

          <input id="pagesToday" type="number" placeholder="+ страницы">
          <button id="addBtn">Добавить</button>

          <div id="history"></div>

        </div>
      </div>
    `;

    bind();
    renderHistory();
  }

  function bind() {

    document.getElementById("status").value = book.status;

    document.getElementById("status").onchange = (e) => {
      book.status = e.target.value;
      saveData();
    };

    document.getElementById("progress").oninput = (e) => {
      book.readPages = Number(e.target.value);
      saveData();
      render();
    };

    document.getElementById("addBtn").onclick = () => {

      const input = document.getElementById("pagesToday");
      const pages = Number(input.value);

      if (!pages) return;

      book.readPages += pages;
      book.history.push({ pages });

      saveData();
      render();
    };
  }

  function renderHistory() {
    document.getElementById("history").innerHTML =
      book.history.map(h => `+${h.pages} стр.`).join("<br>");
  }

});