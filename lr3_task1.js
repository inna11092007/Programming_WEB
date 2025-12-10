let generator = null;
let min = 1;
let max = 10;

function* randomGenerator(a, b) {
    while (true) {
        const rand = Math.floor(Math.random() * (b - a + 1)) + a;
        yield rand;
    }
}

function setRangeText() {
    const rangeSpan = document.getElementById("range");
    if (rangeSpan) rangeSpan.textContent = `${min} .. ${max}`;
}

function resetOut() {
    const out = document.getElementById("out");
    if (out) out.textContent = "Натисніть кнопку, щоб отримати число";
}

function askRange() {
    let a = prompt("Введіть мінімальне значення (min):", String(min));
    let b = prompt("Введіть максимальне значення (max):", String(max));

    if (a === null || b === null) {
        min = 1;
        max = 10;
        setRangeText();
        generator = randomGenerator(min, max);
        resetOut();
        return;
    }

    const n1 = Number(String(a).trim());
    const n2 = Number(String(b).trim());

    if (!Number.isFinite(n1) || !Number.isFinite(n2)) {
        min = 1;
        max = 10;
    } else {
        min = n1;
        max = n2;
        if (min > max) [min, max] = [max, min];
    }

    setRangeText();
    generator = randomGenerator(min, max);
    resetOut();
}

document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("next");
    const changeBtn = document.getElementById("changeRange");
    const out = document.getElementById("out");

    askRange();

    nextBtn.addEventListener("click", () => {
        if (!generator) return;
        const { value } = generator.next();
        out.textContent = value;
    });

    changeBtn.addEventListener("click", askRange);
});
