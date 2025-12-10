function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) resolve("Перше число більше");
            else if (num1 < num2) resolve("Друге число більше");
            else reject("Числа рівні");
        }, 1000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const num1Input = document.getElementById("num1");
    const num2Input = document.getElementById("num2");
    const compareBtn = document.getElementById("compareBtn");
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");

    compareBtn.addEventListener("click", () => {
        const v1 = num1Input.value;
        const v2 = num2Input.value;

        if (v1.trim() === "" || v2.trim() === "") {
            resultDiv.textContent = "Введи обидва числа.";
            resultDiv.className = "result error";
            return;
        }

        const num1 = Number(v1);
        const num2 = Number(v2);

        if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
            resultDiv.textContent = "Некоректні дані.";
            resultDiv.className = "result error";
            return;
        }

        compareBtn.disabled = true;
        loader.style.display = "flex";
        resultDiv.textContent = "";
        resultDiv.className = "result";

        compareNumbers(num1, num2)
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
                compareBtn.disabled = false;
            });
    });
});
