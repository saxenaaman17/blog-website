const mode = localStorage.getItem("mode") || "";
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");

document.body.className = mode;

toggle.addEventListener("click", () => {
  localStorage.setItem("mode", mode === "light" ? "" : "dark");
  body.classList.toggle("light");
});
