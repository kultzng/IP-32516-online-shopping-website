document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const deliveryName = document.getElementById("delivery-name");
    const deliveryAddress = document.getElementById("delivery-address");
    const deliveryContact = document.getElementById("delivery-contact");
    const deliveryEmail = document.getElementById("delivery-email");
  
    // Get data from sessionStorage
    const orderData = JSON.parse(sessionStorage.getItem("orderData")) || {};
    const cart = orderData.cart || [];
    const delivery = orderData.delivery || {};
  
    // Display delivery info
    deliveryName.textContent = delivery.name || "N/A";
    deliveryAddress.textContent = delivery.address || "N/A";
    deliveryContact.textContent = delivery.phone || "N/A";
    deliveryEmail.textContent = delivery.email || "N/A";
  
    // Display order summary
    if (cart.length > 0) {
        cart.forEach(item => {
            const subTotal = (item.quantity * item.price).toFixed(2);

            const container = document.createElement("div");
            container.classList.add("order-item");

            const nameEl = document.createElement("p");
            nameEl.textContent = item.name;

            const quantityEl = document.createElement("p");
            quantityEl.textContent = `Quantity: ${item.quantity}`;

            const totalEl = document.createElement("p");
            totalEl.textContent = `Sub Total: $${subTotal}`;          
            
            container.appendChild(nameEl);
            container.appendChild(quantityEl);
            container.appendChild(totalEl);           

            orderSummary.appendChild(container);
        });

        // total price for all items in the cart
        const totalPrice = document.createElement("p");
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
        totalPrice.textContent = `Total Price: $${total}`;
        totalPrice.style.fontWeight = "bold";
        totalPrice.classList.add("total-price");   

        orderSummary.appendChild(totalPrice);
    } else {
        orderSummary.innerHTML = "<p>No items found in the order.</p>";
    } 
    
  });
  