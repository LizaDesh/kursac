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

          <div class="big-progress">
  <div class="big-progress-fill" style="width:${percent}%"></div>
</div>

          <input id="pagesToday" type="number" placeholder="+ страницы">
          <button id="addBtn">Добавить</button>

          <canvas id="chart" height="120"></canvas>

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

   document.getElementById("addBtn").onclick = () => {

  const input = document.getElementById("pagesToday");
  let pages = Number(input.value);

  // ❌ пусто или не число
  if (!pages || isNaN(pages)) {
    alert("Введите количество страниц");
    return;
  }

  // ❌ нельзя отрицательные
  if (pages <= 0) {
    alert("Нельзя добавлять отрицательные или нулевые страницы");
    return;
  }

  // ❌ нельзя больше чем есть
  if (book.readPages + pages > book.totalPages) {
    alert("Нельзя прочитать больше, чем есть в книге");
    return;
  }

  // ✅ всё ок
  book.readPages += pages;
  book.history.push({ pages });

  input.value = "";

  saveData();
  render();
};
  }

  function renderHistory() {
    document.getElementById("history").innerHTML =
      book.history.map(h => `+${h.pages} стр.`).join("<br>");
  }

  function renderChart() {

  const ctx = document.getElementById("chart");

  if (!ctx) return;

  const data = book.history.map((h, i) => i + 1);
  const pages = book.history.map(h => h.pages);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data,
      datasets: [{
        label: "Прогресс чтения",
        data: pages,
        tension: 0.3
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
  renderChart();
}
});