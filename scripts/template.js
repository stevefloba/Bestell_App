/* -----------------------------
   Menü rendern (Hauptgerichte)
----------------------------- */
function renderMenu() {
    const menuContainer = document.querySelector(".content_restaurant_navbar");
    menuContainer.innerHTML = "";

    myDishes.forEach((dish, index) => {
        menuContainer.innerHTML += `
            <div class="menu-item" onclick="addToBasketFromDishes(${index})">
                <div class="menu-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <p class="price">${dish.price.toFixed(2).replace(".", ",")} €</p>
                </div>
                <div class="menu-add">+</div>
            </div>
        `;
    });
}

/* -----------------------------
   Menü rendern (Beilagen)
----------------------------- */
function renderSupplements() {
    const supplementsContainer = document.querySelector(".content_restaurant_supplements");
    supplementsContainer.innerHTML = "";

    mySupplements.forEach((supplement, index) => {
        supplementsContainer.innerHTML += `
            <div class="menu-item" onclick="addToBasketFromSupplements(${index})">
                <div class="menu-info">
                    <h3>${supplement.name}</h3>
                    <p>${supplement.description}</p>
                    <p class="price">${supplement.price.toFixed(2).replace(".", ",")} €</p>
                </div>
                <div class="menu-add">+</div>
            </div>
        `;
    });
}

/* -----------------------------
   Warenkorb rendern (Desktop)
----------------------------- */
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

/* -----------------------------
   Warenkorb rendern (Mobile)
----------------------------- */
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