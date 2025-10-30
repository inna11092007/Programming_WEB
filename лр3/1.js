const min = Number(prompt("Введіть мінімальне число:"));
const max = Number(prompt("Введіть максимальне число:"));

function* randomGenerator(min, max) {
  while (true) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    yield randomNumber; 
  }
}

const generator = randomGenerator(min, max);

const btn = document.getElementById("next");
const out = document.getElementById("out");

btn.addEventListener("click", () => {
  const nextValue = generator.next().value; 
  out.textContent = "Наступне число: " + nextValue;
});
