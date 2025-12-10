// Генератор паролів
function* passwordGenerator() {
    let password = "";

    while (true) {
        // чекаємо символ від next(value)
        const char = yield password;

        if (char === "done") {
            // завершуємо генератор та повертаємо готовий пароль
            return password;
        }

        // додаємо символ до пароля
        password += char;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start");
    const output = document.getElementById("password-output");

    startBtn.addEventListener("click", () => {
        // створюємо новий генератор при кожному запуску
        const gen = passwordGenerator();

        // перший виклик next() запускає генератор до першого yield
        gen.next();

        while (true) {
            const input = prompt(
                "Введіть наступний символ для пароля.\n" +
                "Щоб завершити і зібрати пароль, введіть: done"
            );

            if (input === null) {
                alert("Введення скасовано.");
                output.textContent = "—";
                return;
            }

            const { value, done } = gen.next(input);

            if (done) {
                // генератор завершився, value – готовий пароль
                if (value === "") {
                    output.textContent = "Пароль порожній 😅";
                } else {
                    output.textContent = value;
                }
                break;
            }
        }
    });
});
