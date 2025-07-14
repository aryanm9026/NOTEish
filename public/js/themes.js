document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Loading localStorage theme preferences
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️ Light Mode";
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
});
