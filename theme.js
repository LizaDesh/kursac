document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  // Устанавливаем сохранённую тему при загрузке
  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (themeBtn) themeBtn.textContent = "🌙"; // кнопка для тёмной
  } else {
    if (themeBtn) themeBtn.textContent = "☀️"; // кнопка для светлой
  }

  // Если есть кнопка на странице
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      if (document.body.classList.contains("light")) {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
      } else {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      }
    });
  }
});