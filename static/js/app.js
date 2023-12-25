let mode = localStorage.getItem("mode") || "dark";
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");

body.classList.add(mode);

toggle.addEventListener("click", () => {
  mode = mode === "light" ? "dark" : "light";
  body.className = mode;
  localStorage.setItem("mode", mode);
});
