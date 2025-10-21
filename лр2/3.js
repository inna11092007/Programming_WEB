function askAndSum() {
  // 1) ім'я
  let name = prompt("Введіть ваше ім'я:");
  if (name === null) return;        // скасували
  name = name.trim();
  if (name === "") name = "Anonymous";

  // 2) перше число
  const aStr = prompt("Введіть перше число:");
  if (aStr === null) return;
  const a = Number(aStr.trim());

  // 3) друге число
  const bStr = prompt("Введіть друге число:");
  if (bStr === null) return;
  const b = Number(bStr.trim());

  // Перевірка валідності
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    alert("Потрібно ввести саме числа.");
    return;
  }

  const sum = a + b;

  // Вивід У КОНСОЛЬ з КОНКАТЕНАЦІЄЮ через '+'
  console.log("Hello, " + name + "! The sum of " + a + " and " + b + " is " + sum + ".");
}

document.getElementById("run3").addEventListener("click", askAndSum);