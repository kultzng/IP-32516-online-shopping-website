document.addEventListener("DOMContentLoaded", () => {
    fetch('get-products.php')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('products-container');
            products.forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="${product.image_url}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <span>$${product.price}</span>
                    </div>
                `;
                container.innerHTML += productCard;
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
