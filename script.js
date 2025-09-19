let basket = [];

function init() {
    renderMenu();
    renderSupplements();
    renderBasket();
}

/* -----------------------------
   Basket Funktionen
----------------------------- */
function addToBasketFromDishes(index) {
    const dish = myDishes[index];
    addItemToBasket(dish);
}

function addToBasketFromSupplements(index) {
    const supplement = mySupplements[index];
    addItemToBasket(supplement);
}

function addItemToBasket(item) {
    const existing = basket.find(entry => entry.name === item.name);

    if (existing) {
        existing.amount++;
    } else {
        basket.push({ ...item, amount: 1 });
    }

    renderBasket();
    if (window.innerWidth <= 790) renderResponsiveBasket();
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

/* -----------------------------
   Burger Menü
----------------------------- */
function openBurgerMenu() {
    const overlay = document.getElementById("burgerOverlay");
    overlay.style.display = "flex";
}

function closeBurgerMenu() {
    const overlay = document.getElementById("burgerOverlay");
    overlay.style.display = "none";
}

window.onload = init;