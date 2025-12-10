const STORAGE_KEY = "pr6_cart";

const cartWrap = document.getElementById("cartWrap");
const payBtn = document.getElementById("payBtn");

const modal = document.getElementById("modal");
const modalCard = document.getElementById("modalCard");

function loadCart() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
        const data = raw ? JSON.parse(raw) : [];
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function fmtMoney(n) {
    return `${n.toFixed(2)} грн`;
}

function openModal(html) {
    modalCard.innerHTML = html;
    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
    modalCard.innerHTML = "";
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

function showQtyEditModal(item, cart) {
    openModal(`
        <div class="modal-title">Кількість</div>
        <div class="modal-text">${item.name}</div>
        <div class="modal-row">
            <input class="modal-input" id="qtyInput" type="number" min="1" value="${item.qty}">
        </div>
        <div class="modal-row" style="margin-top:10px;">
            <button class="modal-btn" id="saveQty">Змінити</button>
            <button class="modal-btn secondary" id="cancelQty">Скасувати</button>
        </div>
    `);

    const qtyInput = document.getElementById("qtyInput");
    const saveBtn = document.getElementById("saveQty");
    const cancelBtn = document.getElementById("cancelQty");

    cancelBtn.addEventListener("click", closeModal);

    saveBtn.addEventListener("click", () => {
        const qty = Number(qtyInput.value);
        if (!qty || qty < 1) return;
        item.qty = qty;
        saveCart(cart);
        closeModal();
        render();
    });

    qtyInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveBtn.click();
    });
}

function render() {
    const cart = loadCart();

    if (!cart.length) {
        cartWrap.innerHTML = `<div class="empty">Корзина пуста</div>`;
        payBtn.addEventListener("click", (e) => e.preventDefault(), { once: true });
        return;
    }

    let total = 0;

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Назва товару</th>
                    <th>Ціна за од.</th>
                    <th>К-сть</th>
                    <th>Сума</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, idx) => {
        const sum = item.price * item.qty;
        total += sum;

        html += `
            <tr data-id="${item.id}">
                <td class="num">${idx + 1}.</td>
                <td>${item.name}</td>
                <td class="price">${fmtMoney(item.price)}</td>
                <td class="qty">
                    ${item.qty}
                    <span class="qty-link" data-action="edit">змінити к-сть</span>
                </td>
                <td class="sum">${fmtMoney(sum)}</td>
                <td class="actions">
                    <span class="del-link" data-action="delete">видалити</span>
                </td>
            </tr>
        `;
    });

    html += `
            <tr class="total-row">
                <td colspan="4">Разом до оплати:</td>
                <td colspan="2">${fmtMoney(total)}</td>
            </tr>
            </tbody>
        </table>
    `;

    cartWrap.innerHTML = html;

    cartWrap.querySelectorAll("tr[data-id]").forEach(row => {
        const id = row.dataset.id;
        const item = cart.find(i => i.id === id);

        row.querySelector('[data-action="edit"]').addEventListener("click", () => {
            showQtyEditModal(item, cart);
        });

        row.querySelector('[data-action="delete"]').addEventListener("click", () => {
            const next = cart.filter(i => i.id !== id);
            saveCart(next);
            render();
        });
    });
}

payBtn.addEventListener("click", (e) => {
    const cart = loadCart();
    if (!cart.length) {
        e.preventDefault();
        openModal(`
            <div class="modal-title">Корзина пуста</div>
            <div class="modal-row">
                <button class="modal-btn secondary" id="okEmpty">Ок</button>
            </div>
        `);
        document.getElementById("okEmpty").addEventListener("click", closeModal);
        return;
    }

    e.preventDefault();
    openModal(`
        <div class="modal-title">Оплата</div>
        <div class="modal-text">Дякую 💜</div>
        <div class="modal-row">
            <button class="modal-btn" id="clearCart">Очистити корзину</button>
            <button class="modal-btn secondary" id="closePay">Закрити</button>
        </div>
    `);

    document.getElementById("closePay").addEventListener("click", closeModal);
    document.getElementById("clearCart").addEventListener("click", () => {
        saveCart([]);
        closeModal();
        render();
    });
});

render();
