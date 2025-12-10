const products = [
    { productId: 1, name: "Ноутбук", price: 25000 },
    { productId: 2, name: "Смартфон", price: 18000 },
    { productId: 3, name: "Навушники", price: 2500 },
    { productId: 4, name: "Планшет", price: 15000 }
];

const purchases = [
    { purchaseId: 101, productId: 1, quantity: 2 },
    { purchaseId: 102, productId: 2, quantity: 1 },
    { purchaseId: 103, productId: 3, quantity: 5 },
    { purchaseId: 104, productId: 1, quantity: 1 },
    { purchaseId: 105, productId: 4, quantity: 3 }
];

function getTotalSales(productsArray, purchasesArray) {
    return purchasesArray.reduce((acc, purchase) => {
        const product = productsArray.find(item => item.productId === purchase.productId);
        if (!product) return acc;

        const revenue = product.price * purchase.quantity;
        acc[product.name] = (acc[product.name] || 0) + revenue;

        return acc;
    }, {});
}

function showTotalSales() {
    const resultDiv = document.getElementById("result");
    const totals = getTotalSales(products, purchases);
    const names = Object.keys(totals);

    if (names.length === 0) {
        resultDiv.textContent = "Немає даних.";
        return;
    }

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Загальний дохід (грн)</th>
                </tr>
            </thead>
            <tbody>
    `;

    names.forEach(name => {
        tableHTML += `
            <tr>
                <td>${name}</td>
                <td>${totals[name]}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    resultDiv.innerHTML = tableHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calcBtn").addEventListener("click", showTotalSales);
});
