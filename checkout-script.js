document.getElementById("delivery-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const recipient = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const errorMsg = document.getElementById("form-error-msg");
  
    // Validate phone (AU numbers start with 04 and have 10 digits)
    const phoneRegex = /^04\d{8}$/;
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Clear any previous error
    errorMsg.textContent = "";
  
    if (!recipient || !address || !phone || !email) {
      errorMsg.textContent = "Please fill in all fields.";
      return;
    }
  
    if (!phoneRegex.test(phone)) {
      errorMsg.textContent = "Please enter a valid Australian mobile number (e.g., 04xxxxxxxx).";
      return;
    }
  
    if (!emailRegex.test(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      return;
    }

    // Get cart data from localStorage (simulate)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Save delivery + cart data to sessionStorage for confirm page
    const orderData = {
        cart: cart,
        delivery: {
            name: recipient,
            address: address,
            phone: phone,
            email: email
        }
    };
    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    
    // Simulate placing order
    
    //window.location.href = "confirm.html";
});  
  
  // place order button is disabled if delivery form is not filled out
  const placeOrderBtn = document.getElementById("place-order-btn");
  const deliveryForm = document.getElementById("delivery-form");  
  const formInputs = deliveryForm.querySelectorAll("input[type='text'], input[type='tel'], input[type='email'], select");
  const checkFormFilled = () => {
    let allFilled = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
        }
    });
    if (allFilled) {
        placeOrderBtn.classList.remove("disabled");
        placeOrderBtn.disabled = false;
    } else {
        placeOrderBtn.classList.add("disabled");
        placeOrderBtn.disabled = true;
    }
};

// 🔁 Call checkFormFilled on every input/select change
formInputs.forEach(input => {
  input.addEventListener("input", checkFormFilled);
  input.addEventListener("change", checkFormFilled); // for select dropdowns
});

// 🔁 Run once on page load too
checkFormFilled();

// Redirect to confirm page when place order button is clicked
document.getElementById("place-order-btn").addEventListener("click", function () {
  window.location.href = "confirm.html";
  localStorage.removeItem("cart");
  //console.log("Order placed successfully!"); // Simulate order placement
});