const journalNumber = 7;
const secretNumber = journalNumber % 10;

function checkSecret() {
  const input = prompt("Введіть число від 0 до 9:");
  if (input === null) return;

  const userNum = Number(input.trim());
  if (!Number.isInteger(userNum) || userNum < 0 || userNum > 9) {
    alert("Введіть ціле число від 0 до 9");
    return;
  }

  alert(userNum === secretNumber ? "Correct!" : "Wrong!");
}

document.getElementById("run2").addEventListener("click", checkSecret);
