const orders = [
    {
        orderId: 1,
        customer: { name: "Alice", email: "alice@example.com" },
        items: [
            { name: "Ноутбук", price: 1200 },
            { name: "Мишка", price: 25 }
        ],
        total: 1225
    },
    {
        orderId: 2,
        customer: { name: "Bob", email: "bob@example.com" },
        items: [
            { name: "Смартфон", price: 800 }
        ],
        total: 800
    },
    {
        orderId: 3,
        customer: { name: "Alice", email: "alice@example.com" },
        items: [
            { name: "Навушники", price: 100 },
            { name: "Чохол", price: 20 }
        ],
        total: 120
    },
    {
        orderId: 4,
        customer: { name: "Inna", email: "inna@example.com" },
        items: [
            { name: "Планшет", price: 600 },
            { name: "Стилус", price: 45 }
        ],
        total: 645
    }
];

function getTotalSpentByCustomer(ordersArray, customerName) {
    const normalizedName = customerName.trim().toLowerCase();
    if (!normalizedName) return 0;

    const customerOrders = ordersArray.filter(order =>
        order.customer.name.toLowerCase() === normalizedName
    );

    return customerOrders.reduce((sum, order) => sum + order.total, 0);
}

function renderOrdersList() {
    const container = document.getElementById("ordersList");
    let html = "";

    orders.forEach(order => {
        html += `
            <div class="order-item">
                <div class="order-header">
                    Замовлення #${order.orderId} — ${order.customer.name} (${order.customer.email}),
                    сума: ${order.total} грн
                </div>
                <div class="order-items">
                    <ul>
                        ${order.items.map(item => `<li>${item.name} – ${item.price} грн</li>`).join("")}
                    </ul>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function initPage() {
    renderOrdersList();

    const btn = document.getElementById("calcBtn");
    const input = document.getElementById("customerName");
    const resultDiv = document.getElementById("result");

    btn.addEventListener("click", () => {
        const name = input.value;
        const total = getTotalSpentByCustomer(orders, name);

        resultDiv.classList.remove("error", "success");

        if (!name.trim()) {
            resultDiv.textContent = "Введіть ім'я клієнта.";
            resultDiv.classList.add("error");
            return;
        }

        if (total === 0) {
            resultDiv.textContent = "Для цього клієнта замовлень не знайдено.";
            resultDiv.classList.add("error");
        } else {
            resultDiv.textContent = `Клієнт "${name}" витратив загалом: ${total} грн.`;
            resultDiv.classList.add("success");
        }
    });
}

document.addEventListener("DOMContentLoaded", initPage);
