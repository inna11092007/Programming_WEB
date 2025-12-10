const scoreEl = document.getElementById("score");
const taskEl = document.getElementById("task");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const checkBtn = document.getElementById("check-btn");

let total = 0;
let correct = 0;
let current = null;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildTask() {
    const a = randomInt(1, 9);
    const b = randomInt(1, 9);
    current = { a, b, value: a * b };
    taskEl.textContent = `${a} × ${b} =`;
    answerEl.value = "";
    answerEl.focus();
    setResultText("");
}

function calculateScoreText() {
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    return `Загальний рахунок: ${percent}% (${correct} правильних відповідей з ${total})`;
}

function updateScore() {
    scoreEl.textContent = calculateScoreText();
}

function normalizeAnswer(value) {
    const v = value.trim();
    if (v === "") return null;
    const num = Number(v);
    if (!Number.isFinite(num)) return null;
    return num;
}

function setResultText(text, state) {
    resultEl.textContent = text;
    resultEl.classList.remove("ok", "bad");
    if (state) resultEl.classList.add(state);
}

function checkCurrentAnswer() {
    if (!current) {
        setResultText("Спочатку натисніть «Наступне завдання».","bad");
        return;
    }

    const userNum = normalizeAnswer(answerEl.value);

    if (userNum === null) {
        setResultText("Введіть число у поле відповіді.","bad");
        return;
    }

    total++;

    if (userNum === current.value) {
        correct++;
        setResultText("Правильно!","ok");
    } else {
        setResultText(`Помилка, правильна відповідь «${current.value}».`,"bad");
    }

    updateScore();
    current = null;
}

function handleNext() {
    buildTask();
}

function handleCheck() {
    checkCurrentAnswer();
}

function handleEnter(e) {
    if (e.key === "Enter") handleCheck();
}

nextBtn.addEventListener("click", handleNext);
checkBtn.addEventListener("click", handleCheck);
answerEl.addEventListener("keydown", handleEnter);

updateScore();
