let resultsElement, searchElement, pagesIndex, lunrIndex;

function initLunr() {
  const request = new XMLHttpRequest();
  request.open("GET", "js/lunr/PagesIndex.json", true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      pagesIndex = JSON.parse(request.responseText);
      // console.log("Index loaded:", pagesIndex);

      lunrIndex = lunr(function () {
        this.field("title", { boost: 10 });
        this.field("categories", { boost: 5 });
        this.field("content");
        this.ref("href");

        // Adding pages to the Lunr index
        pagesIndex.forEach((page) => this.add(page));
      });
    } else {
      // console.error("Error getting Hugo index file:", request.statusText);
    }
  };

  request.send();
}

function initUI() {
  resultsElement = document.querySelector(".results");
  searchElement = document.querySelector(".search");

  searchElement.addEventListener(
    "input",
    debounce(function () {
      const query = "programming";
      if (query.length < 2) return;

      const fuzzLength = Math.round(Math.min(Math.max(query.length / 4, 1), 3));
      const fuzzyQuery = query + "~" + fuzzLength;

      const results = search(fuzzyQuery);
      // console.log(results);
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
