const products = [
    { name: 'Ноутбук', category: 'Електроніка', price: 25000, inStock: 3 },
    { name: 'Смартфон', category: 'Електроніка', price: 18000, inStock: 0 },
    { name: 'Навушники', category: 'Аксесуари', price: 1200, inStock: 15 },
    { name: 'Рюкзак', category: 'Аксесуари', price: 900, inStock: 5 },
    { name: 'Монітор', category: 'Електроніка', price: 8000, inStock: 2 },
    { name: 'Планшет', category: 'Електроніка', price: 15000, inStock: 1 }
];

function getAvailableProducts() {
    return products.filter(product => product.inStock > 0);
}

function findProductByName(name) {
    const trimmedName = name.trim().toLowerCase();
    if (!trimmedName) return null;

    return products.find(product => product.name.toLowerCase() === trimmedName) || null;
}

document.addEventListener('DOMContentLoaded', () => {
    const showAvailableBtn = document.getElementById('showAvailableBtn');
    const productsBody = document.getElementById('productsBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchName');
    const searchResult = document.getElementById('searchResult');

    showAvailableBtn.addEventListener('click', () => {
        const available = getAvailableProducts();
        productsBody.innerHTML = '';

        if (available.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="4">Немає товарів в наявності</td>`;
            productsBody.appendChild(tr);
            return;
        }

        available.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price} грн</td>
                <td>${product.inStock}</td>
            `;
            productsBody.appendChild(tr);
        });
    });

    searchBtn.addEventListener('click', () => {
        const name = searchInput.value;
        const product = findProductByName(name);

        if (!name.trim()) {
            searchResult.innerHTML = `<span class="not-found">Введіть назву товару</span>`;
            return;
        }

        if (!product) {
            searchResult.innerHTML = `<span class="not-found">Товар не знайдено</span>`;
        } else {
            searchResult.innerHTML = `
                <div class="found">
                    <strong>${product.name}</strong> (${product.category}) – 
                    ${product.price} грн, на складі: ${product.inStock}.
                </div>
            `;
        }
    });
});
