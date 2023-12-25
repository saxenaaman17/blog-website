let resultsElement, searchElement, pagesIndex, lunrIndex;

function initLunr() {
  fetch("js/lunr/PagesIndex.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      pagesIndex = data;
      // console.log("Index loaded:", pagesIndex);

      lunrIndex = lunr(function () {
        this.field("title", { boost: 10 });
        this.field("categories", { boost: 5 });
        this.field("content");
        this.ref("href");

        // Adding pages to the Lunr index
        pagesIndex.forEach((page) => this.add(page));
      });
    })
    .catch((error) => {
      // console.error("Error getting Hugo index file:", error);
    });
}

function initUI() {
  resultsElement = document.querySelector(".results");
  searchElement = document.querySelector(".search");

  searchElement.addEventListener(
    "input",
    debounce(function () {
      const query = searchElement.value.trim();
      if (query.length < 2) return;

      const fuzzLength = Math.round(Math.min(Math.max(query.length / 4, 1), 3));
      const fuzzyQuery = query + "~" + fuzzLength;

      const results = search(fuzzyQuery);
      renderResults(results);
    }, 1000)
  );
}

function search(query) {
  return lunrIndex.search(query).map((result) => {
    return pagesIndex.find((page) => page.href === result.ref);
  });
}

function renderResults(results) {
  resultsElement.innerHTML = "";

  results.slice(0, 10).forEach((result) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = result.href;
    a.textContent = "» " + result.title;
    li.appendChild(a);
    resultsElement.appendChild(li);
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  initLunr();
  initUI();
});
