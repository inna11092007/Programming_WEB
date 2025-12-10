// Функція, яка імітує асинхронну операцію (наприклад, запит на сервер)
function makeFakeRequest() {
    return new Promise((resolve, reject) => {
        // 2 секунди "очікування"
        setTimeout(() => {
            // випадково: успіх або помилка
            const isOk = Math.random() < 0.7; // 70% успіху

            if (isOk) {
                resolve("Операцію успішно виконано ✅");
            } else {
                reject("Сталася помилка при виконанні операції ❌");
            }
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start");
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");

    startBtn.addEventListener("click", () => {
        // перед запуском Promise – показуємо лоадер
        loader.style.display = "block";
        result.textContent = "";
        result.className = "";

        makeFakeRequest()
            .then(message => {
                result.textContent = message;
                result.classList.add("success");
            })
            .catch(errorMessage => {
                result.textContent = errorMessage;
                result.classList.add("error");
            })
            .finally(() => {
                // після завершення Promise – ховаємо лоадер
                loader.style.display = "none";
            });
    });
});
