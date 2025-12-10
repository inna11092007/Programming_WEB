function delayedRandom(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            const value = Math.floor(Math.random() * 10) + 1;
            resolve(value);
        }, ms);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");

    startBtn.addEventListener("click", () => {
        startBtn.disabled = true;
        loader.style.display = "flex";
        resultDiv.textContent = "";
        resultDiv.className = "result";

        const p1 = delayedRandom(1000);
        const p2 = delayedRandom(2000);
        const p3 = delayedRandom(3000);

        Promise.all([p1, p2, p3])
            .then(values => {
                const sum = values.reduce((a, b) => a + b, 0);
                resultDiv.textContent = `Значення: ${values.join(", ")}\nСума: ${sum}`;
                resultDiv.className = "result success";
            })
            .catch(err => {
                resultDiv.textContent = String(err);
                resultDiv.className = "result error";
            })
            .finally(() => {
                loader.style.display = "none";
                startBtn.disabled = false;
            });
    });
});
