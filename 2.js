const myNumber = 17;

const secretNumber = myNumber % 10;

let userInput = prompt("Введіть число від 0 до 9:");

userInput = Number(userInput);

if (userInput === secretNumber) {
  alert("Correct!");
} else {
  alert("Wrong!");
}
