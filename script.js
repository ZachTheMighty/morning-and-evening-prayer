let counter = document.querySelector(".counter");
let body = document.querySelector("body");
let prayers = document.querySelectorAll(".prayer");

let i = 0;
body.addEventListener("click", () => {
  if (i === prayers.length + 1) window.location.href = "index.html";

  counter.textContent = ++counter.textContent;

  while (i < prayers.length) {
    if (+counter.textContent === +prayers[i].firstElementChild.textContent) {
      prayers[i].remove();
      counter.textContent = 0;
      i++;
    }
    break;
  }
  if (i === prayers.length) {
    printFinalMessage();
    i = prayers.length + 1;
  }
});

function printFinalMessage() {
  counter.remove();
  let congrats = document.createElement("div");
  congrats.textContent = "تقبل الله طاعتكم";
  congrats.classList.add("congrats");
  body.append(congrats);
}
