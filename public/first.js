let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    // Remove default data from HTML

    // Add new data
    if (products.length > 0) { // If there is data
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">$${info.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    // Get product data
    fetch('animal.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // Get cart data from memory
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    });
};
initApp();

// Add a checkout button event listener
document.querySelector('.checkOut').addEventListener('click', () => {
    displayCheckoutPage();
});

const displayCheckoutPage = () => {
    body.innerHTML = `
    <div class="checkoutPage">
        <h1>Checkout</h1>
        <div class="cartDetails">
            ${cart.map(item => {
                let product = products.find(p => p.id == item.product_id);
                return `
                <div class="cartItem">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cartItemDetails">
                        <h3>${product.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Total Price: $${product.price * item.quantity}</p>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
        <div class="paymentOptions">
            <h3>Payment Options</h3>
            <label>
                <input type="radio" name="payment" value="cod" checked> Cash on Delivery
                <input type="radio" name="payment" value="cod" checked> Pay Online
            </label>
        </div>
        <button class="orderButton">Order</button>
    </div>
    `;

    document.querySelector('.orderButton').addEventListener('click', async () => {
        const response = await fetch('/checkOut', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({cart})
        });

        const message = await response.text();
        // alert(message);
        if (response.ok) {
            // Clear the cart after successful checkout
            cart = [];
            addCartToHTML();
            addCartToMemory();
            displayCongratulationsMessage();
        }
    });
};

const displayCongratulationsMessage = () => {
    body.innerHTML = `
    <div class="congratulationsMessage">
        <h1>Congratulations!</h1>
        <p>Your order has been placed successfully.</p><br><br><br>
        <div><a href="/index.html"><h4>HOME</h4></a></div>
    </div>
    `;
};


