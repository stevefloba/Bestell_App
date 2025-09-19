/* -----------------------------
   Templates
----------------------------- */

function dishTemplate(dish, index) {
    return `
        <div class="menu-item" onclick="addToBasketFromDishes(${index})">
            <div class="menu-info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
                <p class="price">${dish.price.toFixed(2).replace(".", ",")} €</p>
            </div>
            <div class="menu-add">+</div>
        </div>
    `;
}

function supplementTemplate(supplement, index) {
    return `
        <div class="menu-item" onclick="addToBasketFromSupplements(${index})">
            <div class="menu-info">
                <h3>${supplement.name}</h3>
                <p>${supplement.description}</p>
                <p class="price">${supplement.price.toFixed(2).replace(".", ",")} €</p>
            </div>
            <div class="menu-add">+</div>
        </div>
    `;
}

function basketItemTemplate(item, basketIndex, totalPrice) {
    return `
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
}

function responsiveBasketItemTemplate(item, basketIndex, totalPrice) {
    return `
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
}

function basketSummaryTemplate(subtotal, delivery, total) {
    return `
        <div class="basket-summary">
            <p>Zwischensumme: ${subtotal.toFixed(2).replace(".", ",")} €</p>
            <p>Lieferkosten: ${delivery.toFixed(2).replace(".", ",")} €</p>
            <p><strong>Gesamt: ${total.toFixed(2).replace(".", ",")} €</strong></p>
            <button class="order-btn" onclick="placeOrder()">Bestellen</button>
        </div>
    `;
}

function emptyBasketTemplate() {
    return `<p>Dein Warenkorb ist leer.</p>`;
}

function emptyResponsiveBasketTemplate() {
    return `
        <p>Dein Warenkorb ist leer.</p>
        <button class="back-to-menu-btn" onclick="closeResponsiveBasket()">Zurück zur Auswahl</button>
    `;
}