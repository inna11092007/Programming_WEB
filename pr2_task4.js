const betInput = document.getElementById("betInput");
const playBtn = document.getElementById("playBtn");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

function randomMinus5To5() {
    return Math.floor(Math.random() * 11) - 5;
}

function resetUI() {
    statusDiv.textContent = "";
    resultDiv.textContent = "";
    resultDiv.className = "result";
}

playBtn.addEventListener("click", () => {
    resetUI();

    const bet = Number(betInput.value);

    if (!betInput.value.trim() || Number.isNaN(bet) || bet <= 0) {
        statusDiv.textContent = "Введи коректну суму ставки.";
        return;
    }

    playBtn.disabled = true;
    statusDiv.textContent = "Генеруємо результат...";

    const value = randomMinus5To5();

    setTimeout(() => {
        statusDiv.textContent = `Випало число: ${value}`;

        if (value <= 0) {
            resultDiv.textContent = "Не вгадала — ставка програна.";
            resultDiv.classList.add("lose");
        } else {
            const win = bet * value;
            resultDiv.textContent = `Виграш: ${win.toFixed(2)} грн`;
            resultDiv.classList.add("win");
        }

        playBtn.disabled = false;
    }, 1000);
});
