const students = [
    { name: "Інна", age: 19, grade: 95, group: "ПІ-22-03" },
    { name: "Андрій", age: 18, grade: 82, group: "ПІ-22-01" },
    { name: "Марія", age: 20, grade: 74, group: "ПІ-22-01" },
    { name: "Олег", age: 19, grade: 88, group: "ПІ-22-01" },
    { name: "Софія", age: 18, grade: 91, group: "АК-22-02" },
    { name: "Денис", age: 21, grade: 67, group: "ПІ-22-01" }
];

function groupBy(studentsArray, key) {
    return studentsArray.reduce((groups, student) => {
        const groupName = student[key];
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(student);
        return groups;
    }, {});
}

function sortStudentsByGrade(studentsArray) {
    return [...studentsArray].sort((a, b) => b.grade - a.grade);
}

function renderStudentsTable(container, studentsArray) {
    if (!studentsArray.length) {
        container.textContent = "Список порожній";
        return;
    }

    let html = "<table><thead><tr>" +
        "<th>Ім'я</th><th>Вік</th><th>Оцінка</th><th>Група</th>" +
        "</tr></thead><tbody>";

    studentsArray.forEach(s => {
        html += `<tr>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.grade}</td>
            <td>${s.group}</td>
        </tr>`;
    });

    html += "</tbody></table>";
    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    const studentsListDiv = document.getElementById("students-list");
    const groupResultDiv = document.getElementById("groupResult");
    const sortResultDiv = document.getElementById("sortResult");

    const groupBtn = document.getElementById("groupBtn");
    const sortBtn = document.getElementById("sortBtn");

    renderStudentsTable(studentsListDiv, students);

    groupBtn.addEventListener("click", () => {
        const grouped = groupBy(students, "group");
        let html = "";

        for (const groupName in grouped) {
            html += `<div class="group-block">
                <div class="group-title">Група: ${groupName}</div>
                <ul>
                    ${grouped[groupName].map(s => `<li>${s.name} (${s.age} р., оцінка: ${s.grade})</li>`).join("")}
                </ul>
            </div>`;
        }

        groupResultDiv.innerHTML = html || "Немає даних для групування.";
    });

    sortBtn.addEventListener("click", () => {
        const sorted = sortStudentsByGrade(students);
        renderStudentsTable(sortResultDiv, sorted);
    });
});
