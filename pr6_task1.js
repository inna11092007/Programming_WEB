const STORAGE_KEY = "pr6_cart";

const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const addButtons = document.querySelectorAll(".add-to-cart");
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

function uniqueCount(cart) {
    return cart.length;
}

function updateBadge() {
    const cart = loadCart();
    cartCount.textContent = String(uniqueCount(cart));
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

function showEmptyCartModal() {
    openModal(`
        <div class="modal-title">Корзина пуста</div>
        <div class="modal-row">
            <button class="modal-btn secondary" id="closeEmpty">Ок</button>
        </div>
    `);
    document.getElementById("closeEmpty").addEventListener("click", closeModal);
}

function showQtyModal(product) {
    openModal(`
        <div class="modal-title">Вкажіть кількість</div>
        <div class="modal-text">${product.name}</div>
        <div class="modal-row">
            <input class="modal-input" id="qtyInput" type="number" min="1" value="1">
        </div>
        <div class="modal-row" style="margin-top:10px;">
            <button class="modal-btn" id="addQtyBtn">Додати</button>
            <button class="modal-btn secondary" id="cancelQtyBtn">Скасувати</button>
        </div>
    `);

    const qtyInput = document.getElementById("qtyInput");
    const addQtyBtn = document.getElementById("addQtyBtn");
    const cancelQtyBtn = document.getElementById("cancelQtyBtn");

    cancelQtyBtn.addEventListener("click", closeModal);

    addQtyBtn.addEventListener("click", () => {
        const qty = Number(qtyInput.value);
        if (!qty || qty < 1) return;

        const cart = loadCart();
        const existing = cart.find(i => i.id === product.id);

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ ...product, qty });
        }

        saveCart(cart);
        updateBadge();
        showAddedModal();
    });

    qtyInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addQtyBtn.click();
    });
}

function showAddedModal() {
    openModal(`
        <div class="modal-title">Товар додано</div>
        <div class="modal-row">
            <button class="modal-btn" id="goCart">Перейти у корзину</button>
            <button class="modal-btn secondary" id="stayShop">Повернутись до покупок</button>
        </div>
    `);

    document.getElementById("goCart").addEventListener("click", () => {
        window.location.href = "pr6_cart.html";
    });

    document.getElementById("stayShop").addEventListener("click", closeModal);
}

addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price)
        };
        showQtyModal(product);
    });
});

function handleCartClick() {
    const cart = loadCart();
    if (!cart.length) {
        showEmptyCartModal();
        return;
    }
    window.location.href = "pr6_cart.html";
}

cartIcon.addEventListener("click", handleCartClick);
cartIcon.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCartClick();
});

updateBadge();
