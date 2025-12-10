function* passwordGenerator() {
    let password = "";
    while (true) {
        const ch = yield password;
        if (ch === "done") return password;
        if (typeof ch === "string" && ch.length > 0) password += ch;
    }
}

const output = document.getElementById("password-output");
const startBtn = document.getElementById("start");
const clearBtn = document.getElementById("clear");

function runPasswordFlow() {
    const gen = passwordGenerator();
    let state = gen.next();

    while (true) {
        const input = prompt("Введіть символ(и) або done для завершення:");
        if (input === null) {
            output.textContent = state.value || "—";
            break;
        }

        const cleaned = input.trim();
        state = gen.next(cleaned);

        if (state.done) {
            output.textContent = state.value || "—";
            alert("Пароль згенеровано!");
            break;
        }
    }
}

startBtn.addEventListener("click", runPasswordFlow);

clearBtn.addEventListener("click", () => {
    output.textContent = "—";
});
