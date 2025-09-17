let basket = [];

function init() {
    renderMenu();
    renderBasket();
}

function renderMenu() {
    const menuContainer = document.querySelector(".content_restaurant_navbar");
    menuContainer.innerHTML = "";


    /* eine for-Schleife finde ich unpassend weil länger
    for (let i = 0; i < myDishes.length; i++) {
    const dish = myDishes[i]; */

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

function addToBasket(index) {
    const dish = myDishes[index];
    const existing = basket.find(item => item.name === dish.name);

    if (existing) {
        existing.amount++;
    } else {
        basket.push({ ...dish, amount: 1 });

        /* kürzer und finde ich besser als:

        basket.push({
        name: dish.name,
        price: dish.price,
        description: dish.description,
        amount: 1
        }); */
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


    /* eine for-Schleife finde ich unpassend weil länger
    for (let i = 0; i < basket.length; i++) {
    const item = basket[i]; */

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
}

function decreaseAmount(basketIndex) {
    if (basket[basketIndex].amount > 1) {
        basket[basketIndex].amount--;
    } else {
        basket.splice(basketIndex, 1);
    }
    renderBasket();
}

function removeFromBasket(basketIndex) {
    basket.splice(basketIndex, 1);
    renderBasket();
}

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
    document.querySelector(".order-popup").remove();
    basket = []; // Warenkorb leeren
    renderBasket();
}

window.onload = init;