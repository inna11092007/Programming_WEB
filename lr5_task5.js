let captchaValue = "";
let captchaLength = 2;

const patterns = {
    0: [
        1,1,1,
        1,0,1,
        1,0,1,
        1,0,1,
        1,1,1
    ],
    1: [
        0,1,0,
        1,1,0,
        0,1,0,
        0,1,0,
        1,1,1
    ],
    2: [
        1,1,1,
        0,0,1,
        1,1,1,
        1,0,0,
        1,1,1
    ],
    3: [
        1,1,1,
        0,0,1,
        1,1,1,
        0,0,1,
        1,1,1
    ],
    4: [
        1,0,1,
        1,0,1,
        1,1,1,
        0,0,1,
        0,0,1
    ],
    5: [
        1,1,1,
        1,0,0,
        1,1,1,
        0,0,1,
        1,1,1
    ],
    6: [
        1,1,1,
        1,0,0,
        1,1,1,
        1,0,1,
        1,1,1
    ],
    7: [
        1,1,1,
        0,0,1,
        0,1,0,
        1,0,0,
        1,0,0
    ],
    8: [
        1,1,1,
        1,0,1,
        1,1,1,
        1,0,1,
        1,1,1
    ],
    9: [
        1,1,1,
        1,0,1,
        1,1,1,
        0,0,1,
        1,1,1
    ]
};

function generateCaptcha(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function renderDigit(digit) {
    const d = document.createElement("div");
    d.className = "digit";

    const map = patterns[digit];
    for (let i = 0; i < map.length; i++) {
        const p = document.createElement("span");
        p.className = map[i] ? "pixel on" : "pixel";
        d.appendChild(p);
    }
    return d;
}

function renderCaptcha(value) {
    const display = document.getElementById("captcha-display");
    display.innerHTML = "";

    [...value].forEach(ch => {
        display.appendChild(renderDigit(Number(ch)));
    });
}

function setMessage(text, type) {
    const msg = document.getElementById("captcha-message");
    msg.textContent = text;
    msg.className = "message " + (type || "");
}

function initCaptcha(length) {
    captchaLength = Number(length);
    if (!Number.isInteger(captchaLength) || captchaLength < 1) captchaLength = 2;

    captchaValue = generateCaptcha(captchaLength);
    renderCaptcha(captchaValue);

    const input = document.getElementById("captcha-input");
    input.value = "";
    input.maxLength = captchaLength;

    setMessage("", "");
}

function checkCaptcha() {
    const input = document.getElementById("captcha-input");
    const userValue = input.value.trim();

    if (userValue.length !== captchaLength) {
        setMessage(`Введіть ${captchaLength} цифр`, "error");
        return false;
    }

    if (userValue === captchaValue) {
        setMessage("Вірно", "success");
        return true;
    }

    setMessage("Помилка", "error");
    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    initCaptcha(2);

    const input = document.getElementById("captcha-input");
    const checkBtn = document.getElementById("check-btn");
    const refreshBtn = document.getElementById("refresh-btn");

    checkBtn.addEventListener("click", checkCaptcha);

    refreshBtn.addEventListener("click", () => {
        initCaptcha(captchaLength);
    });

    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "");
        if (input.value.length === captchaLength) {
            checkCaptcha();
        } else {
            setMessage("", "");
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            checkCaptcha();
        }
    });
});
