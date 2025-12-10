function makeFakePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.7
                ? resolve("Операцію виконано успішно ✅")
                : reject("Сталася помилка ❌");
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start");
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");

    startBtn.addEventListener("click", () => {
        startBtn.disabled = true;
        result.textContent = "";
        result.className = "result";
        loader.classList.add("visible");

        makeFakePromise()
            .then(msg => {
                result.textContent = msg;
                result.classList.add("success");
            })
            .catch(err => {
                result.textContent = err;
                result.classList.add("error");
            })
            .finally(() => {
                loader.classList.remove("visible");
                startBtn.disabled = false;
            });
    });
});
