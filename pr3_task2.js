function getWeekDay(date) {
    const days = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    return days[date.getDay()];
}

const date = new Date(2012, 0, 3);

document.getElementById("date").textContent = date.toLocaleDateString();
document.getElementById("weekday").textContent = getWeekDay(date);
