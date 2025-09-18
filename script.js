let basket = [];

function init() {
    renderMenu();
    renderBasket();
}

/* -----------------------------
   Menü rendern
----------------------------- */
function renderMenu() {
    const menuContainer = document.querySelector(".content_restaurant_navbar");
    menuContainer.innerHTML = "";

    myDishes.forEach((dish, index) => {
        menuContainer.innerHTML += `
            <div class="menu-item">
                <div class="menu-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <p class="price">${dish.price.toFixed(2).replace(".", ",")} €</p>
                </div>
                <div class="menu-add" onclick="addToBasket(${index})">+</div>
            </div>
        `;
    });
}

/* -----------------------------
   Basket Funktionen
----------------------------- */
function addToBasket(index) {
    const dish = myDishes[index];
    const existing = basket.find(item => item.name === dish.name);

    if (existing) {
        existing.amount++;
    } else {
        basket.push({ ...dish, amount: 1 });
    }

    renderBasket();
}

function renderBasket() {
    const basketDiv = document.querySelector(".basket");
    basketDiv.innerHTML = "<h2>Warenkorb</h2>";

    if (basket.length === 0) {
        basketDiv.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
        return;
    }

    let subtotal = 0;

    basket.forEach((item, basketIndex) => {
        const totalPrice = item.price * item.amount;
        subtotal += totalPrice;

        basketDiv.innerHTML += `
        <div class="basket-item">
            <div class="basket-name">${item.name}</div>
            <div class="basket-controls">
                <button onclick="decreaseAmount(${basketIndex})">-</button>
                <span>${item.amount}</span>
                <button onclick="increaseAmount(${basketIndex})">+</button>
                <span>${totalPrice.toFixed(2).replace(".", ",")} €</span>
                <button onclick="removeFromBasket(${basketIndex})">🗑️</button>
            </div>
        </div>
    `;
    });

    const delivery = 5.0;
    const total = subtotal + delivery;

    basketDiv.innerHTML += `
    <div class="basket-summary">
        <p>Zwischensumme: ${subtotal.toFixed(2).replace(".", ",")} €</p>
        <p>Lieferkosten: ${delivery.toFixed(2).replace(".", ",")} €</p>
        <p><strong>Gesamt: ${total.toFixed(2).replace(".", ",")} €</strong></p>
        <button class="order-btn" onclick="placeOrder()">Bestellen</button>
    </div>
`;
}

function increaseAmount(basketIndex) {
    basket[basketIndex].amount++;
    renderBasket();
    if (window.innerWidth <= 790) renderResponsiveBasket();
}

function decreaseAmount(basketIndex) {
    if (basket[basketIndex].amount > 1) {
        basket[basketIndex].amount--;
    } else {
        basket.splice(basketIndex, 1);
    }
    renderBasket();
    if (window.innerWidth <= 790) renderResponsiveBasket();
}

function removeFromBasket(basketIndex) {
    basket.splice(basketIndex, 1);
    renderBasket();
    if (window.innerWidth <= 790) renderResponsiveBasket();
}

/* -----------------------------
   Responsive Basket
----------------------------- */
function openResponsiveBasket() {
    const basketResponsive = document.getElementById("basket_responsive");
    basketResponsive.classList.remove("basket_responsive_closed");
    basketResponsive.classList.add("basket_responsive_open");
    renderResponsiveBasket();
}

function closeResponsiveBasket() {
    const basketResponsive = document.getElementById("basket_responsive");
    basketResponsive.classList.remove("basket_responsive_open");
    basketResponsive.classList.add("basket_responsive_closed");
    basketResponsive.innerHTML = "";
}

function renderResponsiveBasket() {
    const basketResponsive = document.getElementById("basket_responsive");
    basketResponsive.innerHTML = "<h2>Warenkorb</h2>";

    if (basket.length === 0) {
        basketResponsive.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
        basketResponsive.innerHTML += `<button class="back-to-menu-btn" onclick="closeResponsiveBasket()">Zurück zur Auswahl</button>`;
        return;
    }

    let subtotal = 0;

    basket.forEach((item, basketIndex) => {
        const totalPrice = item.price * item.amount;
        subtotal += totalPrice;

        basketResponsive.innerHTML += `
        <div class="basket-item">
            <div class="basket-name">${item.name}</div>
            <div class="basket-controls">
                <button onclick="decreaseAmount(${basketIndex}); renderResponsiveBasket();">-</button>
                <span>${item.amount}</span>
                <button onclick="increaseAmount(${basketIndex}); renderResponsiveBasket();">+</button>
                <span>${totalPrice.toFixed(2).replace(".", ",")} €</span>
                <button onclick="removeFromBasket(${basketIndex}); renderResponsiveBasket();">🗑️</button>
            </div>
        </div>
    `;
    });

    const delivery = 5.0;
    const total = subtotal + delivery;

    basketResponsive.innerHTML += `
    <div class="basket-summary">
        <p>Zwischensumme: ${subtotal.toFixed(2).replace(".", ",")} €</p>
        <p>Lieferkosten: ${delivery.toFixed(2).replace(".", ",")} €</p>
        <p><strong>Gesamt: ${total.toFixed(2).replace(".", ",")} €</strong></p>
        <button class="order-btn" onclick="placeOrder()">Bestellen</button>
    </div>
    <button class="back-to-menu-btn" onclick="closeResponsiveBasket()">Zurück zur Auswahl</button>
`;
}

/* -----------------------------
   Bestellung & Popup
----------------------------- */
function placeOrder() {
    if (basket.length === 0) {
        return;
    }

    let orderText = "";
    basket.forEach(item => {
        orderText += `${item.amount}x ${item.name} - ${(item.price * item.amount).toFixed(2).replace(".", ",")} €\n`;
    });

    const subtotal = basket.reduce((sum, item) => sum + item.price * item.amount, 0);
    const delivery = 5.0;
    const total = subtotal + delivery;

    const message = `
${orderText}
---------------------------
Zwischensumme: ${subtotal.toFixed(2).replace(".", ",")} €
Lieferkosten: ${delivery.toFixed(2).replace(".", ",")} €
Gesamt: ${total.toFixed(2).replace(".", ",")} €
    `;

    showOrderPopup(message);
}

function showOrderPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("order-popup");
    popup.innerHTML = `
        <div class="order-popup-content">
            <h2>Bestellung eingegangen ✅</h2>
            <pre>${message}</pre>
            <button onclick="closeOrderPopup()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function closeOrderPopup() {
    const popup = document.querySelector(".order-popup");
    if (popup) {
        popup.remove();
    }

    basket = []; // Warenkorb leeren
    renderBasket();

    // Falls mobiler Warenkorb offen ist → nach Leeren nochmal rendern
    const basketResponsive = document.getElementById("basket_responsive");
    if (basketResponsive.classList.contains("basket_responsive_open")) {
        renderResponsiveBasket();
    }
}

function openBurgerMenu() {
    const overlay = document.getElementById("burgerOverlay");
    overlay.style.display = "flex";
}

function closeBurgerMenu() {
    const overlay = document.getElementById("burgerOverlay");
    overlay.style.display = "none";
}

window.onload = init;