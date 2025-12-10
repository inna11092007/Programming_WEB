const textInput = document.getElementById("textInput");
const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");

const defaultText = "Приклад ефекту друкарської машинки.";

let typingInterval = null;
let cursorInterval = null;
let startDelayTimeout = null;

function stopTimers() {
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
    if (cursorInterval) {
        clearInterval(cursorInterval);
        cursorInterval = null;
    }
    if (startDelayTimeout) {
        clearTimeout(startDelayTimeout);
        startDelayTimeout = null;
    }
}

function startCursor(baseText) {
    let visible = true;

    cursorInterval = setInterval(() => {
        visible = !visible;
        output.textContent = visible ? baseText + " ▌" : baseText + " ";
    }, 400);
}

function startTypewriter(text) {
    stopTimers();
    output.textContent = "";

    let index = 0;

    startDelayTimeout = setTimeout(() => {
        typingInterval = setInterval(() => {
            output.textContent += text.charAt(index);
            index++;

            if (index >= text.length) {
                clearInterval(typingInterval);
                typingInterval = null;

                const base = output.textContent;
                startDelayTimeout = setTimeout(() => startCursor(base), 150);
            }
        }, 90);
    }, 250);
}

function handleStart() {
    const userText = textInput.value.trim();
    const text = userText !== "" ? userText : defaultText;
    startTypewriter(text);
}

function handleClear() {
    stopTimers();
    output.textContent = "";
    textInput.value = "";
}

startBtn.addEventListener("click", handleStart);
clearBtn.addEventListener("click", handleClear);
