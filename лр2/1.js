function calculate() {
  let result = "Значення ззовні";           // зовнішня змінна result
  console.log("Поза if, result =", result);

  if (true) {
    let result = "Значення всередині if";  // НОВА змінна result, тільки для блоку if
    console.log("Всередині if, result =", result);
  }

  console.log("Після if, зовнішнє result =", result);
}

calculate();