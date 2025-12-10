function* chatBot() {
    const name = yield "Hi! What is your name?";
    yield `Nice to meet you, ${name}! How are you?`;
    yield "Goodbye!";
}

function addLogEntry(label, text, type) {
    const log = document.getElementById("dialogLog");
    const p = document.createElement("p");
    p.className = "log-entry";

    const spanLabel = document.createElement("span");
    spanLabel.className = "label-span";
    spanLabel.textContent = label + ":";

    const spanText = document.createElement("span");
    spanText.textContent = " " + text;

    if (type === "bot") spanText.className = "bot";
    if (type === "user") spanText.className = "user";

    p.appendChild(spanLabel);
    p.appendChild(spanText);
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

const startBtn = document.getElementById("startChat");
const clearBtn = document.getElementById("clearLog");
const logBox = document.getElementById("dialogLog");

startBtn.addEventListener("click", () => {
    const bot = chatBot();
    let step = bot.next();

    while (!step.done) {
        const question = step.value;
        addLogEntry("Bot", question, "bot");

        const answer = prompt(question);
        const safeAnswer = answer === null ? "" : String(answer);

        addLogEntry("You", safeAnswer, "user");

        step = bot.next(safeAnswer);
    }
});

clearBtn.addEventListener("click", () => {
    logBox.innerHTML = "";
});
