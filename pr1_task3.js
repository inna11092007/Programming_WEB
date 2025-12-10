const employees = [
    { name: "Цимбаліста Інна", position: "Front-end", salary: 32000, years: 2 },
    { name: "Марія Петренко", position: "Back-end", salary: 38000, years: 4 },
    { name: "Олег Коваль", position: "QA", salary: 25000, years: 3 },
    { name: "Анна Шевченко", position: "PM", salary: 42000, years: 6 }
];

function getAverageSalary(employeesArray) {
    if (employeesArray.length === 0) return 0;
    const total = employeesArray.reduce((sum, employee) => sum + employee.salary, 0);
    return total / employeesArray.length;
}

function findMostExperiencedEmployee(employeesArray) {
    if (employeesArray.length === 0) return null;
    return employeesArray.reduce((best, cur) => cur.years > best.years ? cur : best, employeesArray[0]);
}

document.addEventListener("DOMContentLoaded", () => {
    const employeesListEl = document.getElementById("employees-list");
    const avgSalaryEl = document.getElementById("avg-salary");
    const mostExperiencedEl = document.getElementById("most-experienced");

    const avgBtn = document.getElementById("avg-salary-btn");
    const mostExpBtn = document.getElementById("most-exp-btn");

    employeesListEl.textContent = JSON.stringify(employees, null, 2);

    avgBtn.addEventListener("click", () => {
        const avg = getAverageSalary(employees);
        avgSalaryEl.textContent = avg.toFixed(2) + " грн";
    });

    mostExpBtn.addEventListener("click", () => {
        const most = findMostExperiencedEmployee(employees);
        mostExperiencedEl.textContent = most ? JSON.stringify(most, null, 2) : "Немає працівників.";
    });
});
