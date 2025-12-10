function randomNumber() {
    return new Promise(resolve => {
        const delay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => {
            const number = Math.floor(Math.random() * 100) + 1;
            resolve({ number, delay });
        }, delay);
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

        const started = Date.now();

        randomNumber()
            .then(({ number, delay }) => {
                const real = Date.now() - started;
                result.textContent = `Випадкове число: ${number}. Час роботи: ${(real/1000).toFixed(2)} с.`;
                result.classList.add("success");
            })
            .finally(() => {
                loader.classList.remove("visible");
                startBtn.disabled = false;
            });
    });
});
