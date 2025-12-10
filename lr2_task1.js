function calculate() {
  let result = "Цимбаліста Інна — outer";
  console.log("Зовні до if:", result);

  if (true) {
    let result = "Цимбаліста Інна — inner";
    console.log("Всередині if:", result);
  }

  console.log("Після if (зовні):", result);
}

document.getElementById("run").addEventListener("click", calculate);
