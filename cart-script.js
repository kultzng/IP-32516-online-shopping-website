document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-sidebar-total');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    //const checkoutBtn = document.getElementById('checkout-btn');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
            totalDisplay.textContent = '$0.00';            
            checkoutBtn.classList.add('disabled');
            checkoutBtn.disabled = true;
            return;
        } else {
            checkoutBtn.classList.remove('disabled');
            checkoutBtn.disabled = false;
        } 
        
        let total = 0;

        cart.forEach((item, index) => {
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p>${item.description}</p>
                        <p>${item.size}</p>
                        <p class="cart-quantity">Quantity: 
                            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input" />
                        </p>
                        <p class="sub-total">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            total += item.price * item.quantity;
        });

        totalDisplay.textContent = `$${total.toFixed(2)}`;
    }

    // Handle quantity changes
    cartItemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart[index].quantity = parseInt(e.target.value) || 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    });

    // Handle remove button
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    });

    // Clear cart
    clearCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        loadCart();
    });

    // Checkout button disabled if cart is empty
    const checkoutBtn = document.getElementById('checkout-btn');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];    
    
    loadCart();
});

document.getElementById("checkout-btn").addEventListener("click", function () {
    window.location.href = "checkout.html";
});
