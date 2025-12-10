function checkNumber(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 10) resolve("Число більше 10");
            else reject("Число менше або дорівнює 10");
        }, 1000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const numberInput = document.getElementById("numberInput");
    const checkBtn = document.getElementById("checkBtn");
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");

    checkBtn.addEventListener("click", () => {
        const raw = numberInput.value;

        if (raw.trim() === "") {
            resultDiv.textContent = "Введи число 🙂";
            resultDiv.className = "result error";
            return;
        }

        const value = Number(raw);

        if (!Number.isFinite(value)) {
            resultDiv.textContent = "Некоректне число.";
            resultDiv.className = "result error";
            return;
        }

        checkBtn.disabled = true;
        loader.style.display = "flex";
        resultDiv.textContent = "";
        resultDiv.className = "result";

        checkNumber(value)
            .then(msg => {
                resultDiv.textContent = msg;
                resultDiv.className = "result success";
            })
            .catch(err => {
                resultDiv.textContent = err;
                resultDiv.className = "result error";
            })
            .finally(() => {
                loader.style.display = "none";
                checkBtn.disabled = false;
            });
    });
});
