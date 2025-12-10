function askAndSum() {
  let name = prompt("Введіть ваше ім'я:");
  if (name === null) return;
  name = name.trim();
  if (name === "") name = "Інна";

  const aStr = prompt("Введіть перше число:");
  if (aStr === null) return;
  const a = Number(aStr.trim());

  const bStr = prompt("Введіть друге число:");
  if (bStr === null) return;
  const b = Number(bStr.trim());

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    alert("Потрібно ввести саме числа.");
    return;
  }

  const sum = a + b;

  console.log("Hello, " + name + "! The sum of " + a + " and " + b + " is " + sum);
}

document.getElementById("run3").addEventListener("click", askAndSum);
