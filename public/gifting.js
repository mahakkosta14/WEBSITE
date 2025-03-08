// let listProductHTML = document.querySelector('.listProduct');
// let listCartHTML = document.querySelector('.listCart');
// let iconCart = document.querySelector('.icon-cart');
// let iconCartSpan = document.querySelector('.icon-cart span');
// let body = document.querySelector('body');
// let closeCart = document.querySelector('.close');
// let products = [];
// let cart = [];


// iconCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })
// closeCart.addEventListener('click', () => {
//     body.classList.toggle('showCart');
// })

//     const addDataToHTML = () => {
//     // remove datas default from HTML

//         // add new datas
//         if(products.length > 0) // if has data
//         {
//             products.forEach(product => {
//                 let newProduct = document.createElement('div');
//                 newProduct.dataset.id = product.id;
//                 newProduct.classList.add('item');
//                 newProduct.innerHTML = 
//                 `<img src="${product.image}" alt="">
//                 <h2>${product.name}</h2>
//                 <div class="price">$${product.price}</div>
//                 <button class="addCart">Add To Cart</button>`;
//                 listProductHTML.appendChild(newProduct);
//             });
//         }
//     }
//     listProductHTML.addEventListener('click', (event) => {
//         let positionClick = event.target;
//         if(positionClick.classList.contains('addCart')){
//             let id_product = positionClick.parentElement.dataset.id;
//             addToCart(id_product);
//         }
//     })
// const addToCart = (product_id) => {
//     let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(cart.length <= 0){
//         cart = [{
//             product_id: product_id,
//             quantity: 1
//         }];
//     }else if(positionThisProductInCart < 0){
//         cart.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     }else{
//         cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
//     }
//     addCartToHTML();
//     addCartToMemory();
// }
// const addCartToMemory = () => {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }
// const addCartToHTML = () => {
//     listCartHTML.innerHTML = '';
//     let totalQuantity = 0;
//     if(cart.length > 0){
//         cart.forEach(item => {
//             totalQuantity = totalQuantity +  item.quantity;
//             let newItem = document.createElement('div');
//             newItem.classList.add('item');
//             newItem.dataset.id = item.product_id;

//             let positionProduct = products.findIndex((value) => value.id == item.product_id);
//             let info = products[positionProduct];
//             listCartHTML.appendChild(newItem);
//             newItem.innerHTML = `
//             <div class="image">
//                     <img src="${info.image}">
//                 </div>
//                 <div class="name">
//                 ${info.name}
//                 </div>
//                 <div class="totalPrice">$${info.price * item.quantity}</div>
//                 <div class="quantity">
//                     <span class="minus"><</span>
//                     <span>${item.quantity}</span>
//                     <span class="plus">></span>
//                 </div>
//             `;
//         })
//     }
//     iconCartSpan.innerText = totalQuantity;
// }

// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//         let product_id = positionClick.parentElement.parentElement.dataset.id;
//         let type = 'minus';
//         if(positionClick.classList.contains('plus')){
//             type = 'plus';
//         }
//         changeQuantityCart(product_id, type);
//     }
// })
// const changeQuantityCart = (product_id, type) => {
//     let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(positionItemInCart >= 0){
//         let info = cart[positionItemInCart];
//         switch (type) {
//             case 'plus':
//                 cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
//                 break;
        
//             default:
//                 let changeQuantity = cart[positionItemInCart].quantity - 1;
//                 if (changeQuantity > 0) {
//                     cart[positionItemInCart].quantity = changeQuantity;
//                 }else{
//                     cart.splice(positionItemInCart, 1);
//                 }
//                 break;
//         }
//     }
//     addCartToHTML();
//     addCartToMemory();
// }

// const initApp = () => {
//     // get data product
//     fetch('GIFTING.json')
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         addDataToHTML();

//         // get data cart from memory
//         if(localStorage.getItem('cart')){
//             cart = JSON.parse(localStorage.getItem('cart'));
//             addCartToHTML();
//         }
//     })
// }
// initApp();
// //11111111111111111111111111111111111111111111111111111111111111111111111111111

// document.querySelector('.checkout-button').addEventListener('click', () => {
//     displayCheckoutPage();
// });

// const displayCheckoutPage = () => {
//     document.body.innerHTML = `
//     <div class="checkout-page">
//         <h1>Checkout</h1>
//         <div class="cart-details">
//             ${shoppingCart.map(item => {
//                 let product = productData.find(p => p.id == item.product_id);
//                 return `
//                 <div class="checkout-cart-item">
//                     <img src="${product.image}" alt="${product.name}">
//                     <div class="checkout-cart-item-details">
//                         <h2>${product.name}</h2>
//                         <p>Quantity: ${item.quantity}</p>
//                         <p>Total Price: $${product.price * item.quantity}</p>
//                     </div>
//                 </div>
//                 `;
//             }).join('')}
//         </div>
//         <div class="payment-options">
//             <h2>Payment Options</h2>
//             <label>
//                 <input type="radio" name="payment" value="cod" checked> Cash on Delivery
//             </label>
//         </div>
//         <button class="order-button">Order</button>
//     </div>
//     `;

//     document.querySelector('.order-button').addEventListener('click', async () => {
//         const response = await fetch('/checkout', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ cart: shoppingCart })
//         });

//         const message = await response.text();
//         alert(message);
//         if (response.ok) {
//             // Clear the cart after successful checkout
//             shoppingCart = [];
//             updateCartHTML();
//             saveCartToLocalStorage();
//             displayCongratulationsMessage();
//         }
//     });
// };

// const displayCongratulationsMessage = () => {
//     document.body.innerHTML = `
//     <div class="congratulations-message">
//         <h1>Congratulations!</h1>
//         <p>Your order has been placed successfully.</p>
//     </div>
//     `;
// };
