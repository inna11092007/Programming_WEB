function getLastDayOfMonth(year, month) {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}

function getSecondsToTomorrow() {
    const now = new Date();
    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 0
    );
    const diffMs = tomorrow - now;
    return Math.round(diffMs / 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const yearInput = document.getElementById("year");
    const monthInput = document.getElementById("month");
    const lastDayResult = document.getElementById("lastDayResult");
    const secondsResult = document.getElementById("secondsResult");

    document.getElementById("btnLastDay").addEventListener("click", () => {
        const year = Number(yearInput.value);
        const month = Number(monthInput.value);

        if (!Number.isFinite(year) || !Number.isFinite(month)) {
            lastDayResult.textContent = "Введіть коректний рік і місяць.";
            return;
        }

        if (month < 0 || month > 11) {
            lastDayResult.textContent = "Місяць має бути від 0 до 11.";
            return;
        }

        lastDayResult.textContent = `Останній день місяця: ${getLastDayOfMonth(year, month)}`;
    });

    document.getElementById("btnSeconds").addEventListener("click", () => {
        const seconds = getSecondsToTomorrow();
        secondsResult.textContent = `До завтра залишилось ${seconds} секунд.`;
    });
});
