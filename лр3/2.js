function* passwordGenerator() {
  let password = ""; 
  while (true) {
    const input = yield; 
    if (input === "done") {
      return password;
    }
    password += input; 
  }
}

const generator = passwordGenerator();

generator.next();

while (true) {
  const char = prompt("Введіть символ для паролю (або напишіть 'done' для завершення):");
  const result = generator.next(char); 

  if (result.done) {
    alert("Ваш пароль: " + result.value);
    break;
  }
}
