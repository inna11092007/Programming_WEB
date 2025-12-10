const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next");

let total = 0;
let correct = 0;
let rightAnswer = null;
let locked = true;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildScoreText() {
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    return `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
}

function updateScore() {
    scoreEl.textContent = buildScoreText();
}

function setResult(text, state) {
    resultEl.textContent = text;
    resultEl.classList.remove("ok", "bad");
    if (state) resultEl.classList.add(state);
}

function clearUIForNext() {
    answersEl.innerHTML = "";
    setResult("");
    locked = false;
}

function generateQuestion() {
    const a = randomInt(2, 9);
    const b = randomInt(2, 9);
    rightAnswer = a * b;
    questionEl.textContent = `${a} × ${b} =`;
}

function generateOptions() {
    const options = new Set();
    options.add(rightAnswer);

    while (options.size < 4) {
        const delta = randomInt(-10, 10);
        const candidate = rightAnswer + delta;
        if (candidate > 0 && candidate !== rightAnswer) {
            options.add(candidate);
        }
    }

    return shuffle([...options]);
}

function createAnswerNode(value) {
    const label = document.createElement("label");
    label.className = "answer-item";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = String(value);

    const span = document.createElement("span");
    span.className = "answer-text";
    span.textContent = String(value);

    radio.addEventListener("change", handleAnswerChange);

    label.appendChild(radio);
    label.appendChild(span);

    return label;
}

function renderOptions(values) {
    values.forEach(v => {
        answersEl.appendChild(createAnswerNode(v));
    });
}

function disableAnswers() {
    const radios = answersEl.querySelectorAll('input[name="answer"]');
    radios.forEach(r => r.disabled = true);
}

function checkAnswer(value) {
    if (locked) return;

    locked = true;
    total++;

    const user = Number(value);

    if (user === rightAnswer) {
        correct++;
        setResult("Правильно!", "ok");
    } else {
        setResult(`Помилка, правильна відповідь «${rightAnswer}».`, "bad");
    }

    disableAnswers();
    updateScore();
}

function handleAnswerChange(e) {
    checkAnswer(e.target.value);
}

function buildTask() {
    clearUIForNext();
    generateQuestion();
    const options = generateOptions();
    renderOptions(options);
}

function handleNextClick() {
    buildTask();
}

nextBtn.addEventListener("click", handleNextClick);
updateScore();
