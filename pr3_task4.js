function pad2(num) {
    return num.toString().padStart(2, "0");
}

function formatDate(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 1) return "прямо зараз";
    if (diffSec < 60) return `${diffSec} сек. назад`;

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} хв. назад`;

    const day = pad2(date.getDate());
    const month = pad2(date.getMonth() + 1);
    const year = pad2(date.getFullYear() % 100);
    const hours = pad2(date.getHours());
    const minutes = pad2(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("dateInput");
    const btn = document.getElementById("formatBtn");
    const out = document.getElementById("output");

    btn.addEventListener("click", () => {
        if (!input.value) {
            out.textContent = "Виберіть дату та час.";
            return;
        }

        const date = new Date(input.value);
        out.textContent = formatDate(date);
    });
});
