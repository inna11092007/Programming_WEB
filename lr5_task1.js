const fahrenheitInput = document.getElementById("fahrenheit");
const celsiusInput = document.getElementById("celsius");

let lock = false;

function normalizeNumber(value) {
    const v = value.replace(",", ".").trim();
    if (v === "") return null;
    const num = Number(v);
    if (!Number.isFinite(num)) return null;
    return num;
}

function formatNumber(num) {
    const rounded = Math.round(num * 100) / 100;
    return String(rounded);
}

function fahrenheitToCelsius(f) {
    return (5 / 9) * (f - 32);
}

function celsiusToFahrenheit(c) {
    return (9 / 5) * c + 32;
}

function handleFahrenheitInput() {
    if (lock) return;

    const f = normalizeNumber(fahrenheitInput.value);
    lock = true;

    if (f === null) {
        celsiusInput.value = "";
        lock = false;
        return;
    }

    const c = fahrenheitToCelsius(f);
    celsiusInput.value = formatNumber(c);

    lock = false;
}

function handleCelsiusInput() {
    if (lock) return;

    const c = normalizeNumber(celsiusInput.value);
    lock = true;

    if (c === null) {
        fahrenheitInput.value = "";
        lock = false;
        return;
    }

    const f = celsiusToFahrenheit(c);
    fahrenheitInput.value = formatNumber(f);

    lock = false;
}

fahrenheitInput.addEventListener("input", handleFahrenheitInput);
celsiusInput.addEventListener("input", handleCelsiusInput);
