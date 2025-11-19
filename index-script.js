document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, attempting to fetch products...");
    
    fetch('get-products.php')
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            console.log("Products data:", products);
            const container = document.getElementById('products-container');
            
            if (!products || products.length === 0) {
                container.innerHTML = '<p>No products available at this time.</p>';
                return;
            }
            
            container.innerHTML = ''; // Clear any existing content
            
            products.forEach(product => {
                console.log("Processing product:", product);
                const productCard = `
                    <div class="product-card">  
                        <img src="images/logo.png" alt="${product.name || 'Product'}" class="product-image">
                        <h3 class="product-name">${product.name || 'Unnamed Product'}</h3>
                        <p class="product-name">${product.description || 'No description available'}</p>
                        <p class="product-size">${product.size || ''}</p>
                        ${product.inStock > 0 ? '<p class="in-stock">In Stock</p>' : '<p class="out-of-stock">Out of Stock</p>'}
                        <p class="product-price">$${product.price || '0.00'}</p>
                        <button class="add-to-cart">Add to Cart</button>    <span>                    
                        <p class="cart-message" style="display:none;">Added to cart!</p>  
                    </div>
                `;
                container.innerHTML += productCard;
            });
            
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            document.getElementById('products-container').innerHTML = 
                '<p>Failed to load products. Please check the console for errors.</p>';
        });
});


// Show/hide subcategories when clicking on a category
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
        // toggle active class
        document.querySelectorAll('.category-item').forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
        // fetch product by catefory
        const category = item.getAttribute('data-category'); // safer than textContent
        const container = document.getElementById('products-container');
        container.innerHTML = '<p>Loading products...</p>'; // Optional: loading message

        fetch(`get-products.php?category=${encodeURIComponent(category)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                if (!products || products.length === 0 || products.error) {
                    container.innerHTML = '<p>No products found for this category.</p>';
                    return;
                }

                container.innerHTML = '';
                products.forEach(product => {
                    const productCard = `
                        <div class="product-card">  
                            <img src="images/logo.png" alt="${product.name || 'Product'}" class="product-image">
                            <h3 class="product-name">${product.name || 'Unnamed Product'}</h3>
                            <p class="product-name">${product.description || 'No description available'}</p>
                            <p class="product-size">${product.size || ''}</p>
                            ${product.inStock > 0 ? '<p class="in-stock">In Stock</p>' : '<p class="out-of-stock">Out of Stock</p>'}
                            <p class="product-price">$${product.price || '0.00'}</p>
                            <button class="add-to-cart">Add to Cart</button>
                            <p class="cart-message" style="display:none;">Added to cart!</p>                             
                        </div>
                    `;
                    container.innerHTML += productCard;
                });
            })
            .catch(error => {
                console.error('Error fetching products by category:', error);
                container.innerHTML = '<p>Failed to load products for this category.</p>';
            });
    });
});

// Highlight subcategory on click
document.querySelectorAll('.subcategory-item').forEach(sub => {
    sub.addEventListener('click', (e) => {
        // Prevent click from triggering the parent category toggle
        e.stopPropagation();

        // Optional: remove 'clicked' from all other subcategories
        document.querySelectorAll('.subcategory-item').forEach(s => s.classList.remove('clicked'));

        // Add 'clicked' to the one selected
        sub.classList.add('clicked');

        // You can add your product loading logic here if needed
        console.log('Clicked subcategory:', sub.textContent);
        const subcategory = sub.getAttribute('data-subcategory'); // safer than textContent
        const container = document.getElementById('products-container');
        container.innerHTML = '<p>Loading products...</p>'; // Optional: loading message

        fetch(`get-products.php?subcategory=${encodeURIComponent(subcategory)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                if (!products || products.length === 0 || products.error) {
                    container.innerHTML = '<p>No products found for this subcategory.</p>';
                    return;
                }

                container.innerHTML = ''; // Clear previous
                

                products.forEach(product => {                     
                    const productCard = `
                        <div class="product-card">  
                            <img src="images/logo.png" alt="${product.name || 'Product'}" class="product-image">
                            <h3 class="product-name">${product.name || 'Unnamed Product'}</h3>
                            <p class="product-name">${product.description || 'No description available'}</p>
                            <p class="product-size">${product.size || ''}</p>
                            ${product.inStock > 0 ? '<p class="in-stock">In Stock</p>' : '<p class="out-of-stock">Out of Stock</p>'}
                            <p class="product-price">$${product.price || '0.00'}</p>
                            <button class="add-to-cart">Add to Cart</button>
                            <p class="cart-message" style="display:none;">Added to cart!</p>                             
                        </div>
                    `;  
                    container.innerHTML += productCard;
                });
            })
            .catch(error => {
                console.error('Error fetching filtered products:', error);
                container.innerHTML = '<p>Something went wrong while loading products.</p>';
            });
    });
});

// Add to cart button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');

        const product = {
            name: productCard.querySelector('.product-name')?.textContent || '',
            description: productCard.querySelectorAll('.product-name')[1]?.textContent || '',
            size: productCard.querySelector('.product-size')?.textContent || '',
            price: parseFloat(productCard.querySelector('.product-price')?.textContent.replace('$', '') || 0),
            image: productCard.querySelector('img')?.getAttribute('src') || '',
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        const message = productCard.querySelector('.cart-message');
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 1000);
    }
});



// Handle search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim();
    const container = document.getElementById('products-container');

    if (!searchInput) {
        container.innerHTML = '<p>Please enter a keyword to search.</p>';
        return;
    }

    container.innerHTML = '<p>Searching products...</p>';

    fetch(`get-products.php?search=${encodeURIComponent(searchInput)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            if (!products || products.length === 0 || products.error) {
                container.innerHTML = '<p>No matching products found.</p>';
                return;
            }

            container.innerHTML = '';

            products.forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="images/chacha.jpg" alt="${product.name || 'Product'}" class="product-image">
                        <h3 class="product-name">${product.name || 'Unnamed Product'}</h3>
                        <p class="product-name">${product.description || 'No description available'}</p>
                        <p class="product-size">${product.size || ''}</p>
                        ${product.inStock > 0 ? '<p class="in-stock">In Stock</p>' : '<p class="out-of-stock">Out of Stock</p>'}
                        <p class="product-price">$${product.price || '0.00'}</p>
                        <button class="add-to-cart">Add to Cart</button>
                        <p class="cart-message" style="display:none;">Added to cart!</p>                        
                    </div>
                `;
                container.innerHTML += productCard;
            });
        })
        .catch(error => {
            console.error('Error during search:', error);
            container.innerHTML = '<p>Something went wrong while searching for products.</p>';
        });
});

// allow pressing Enter to trigger search
document.getElementById('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});

// smoothie button
document.getElementById('smoothie-btn').addEventListener('click', () => {
    const container = document.getElementById('products-container');
    container.innerHTML = '<p>Loading smoothie products...</p>';

    fetch('get-products.php?subcategory=Smoothie')
        .then(response => response.json())
        .then(products => {
            if (!products || products.length === 0 || products.error) {
                container.innerHTML = '<p>No smoothie products found.</p>';
                return;
            }

            container.innerHTML = '';
            products.forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="images/logo.png" alt="${product.name}" class="product-image">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-name">${product.description}</p>
                        <p class="product-size">${product.size}</p>
                        ${product.inStock > 0 ? '<p class="in-stock">In Stock</p>' : '<p class="out-of-stock">Out of Stock</p>'}
                        <p class="product-price">$${product.price}</p>
                        <button class="add-to-cart">Add to Cart</button>
                        <p class="cart-message" style="display:none;">Added to cart!</p>
                    </div>
                `;
                container.innerHTML += productCard;
            });
        })
        .catch(error => {
            console.error('Error loading smoothie products:', error);
            container.innerHTML = '<p>Failed to load smoothie products.</p>';
        });
});
// scroll to products section when clicking on the smoothie button
document.getElementById('smoothie-btn').addEventListener('click', () => {
    const productsSection = document.getElementById('products-container');
    productsSection.scrollIntoView({ behavior: 'smooth' });
});


// scroll to products section to see results when clicking on the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const productsSection = document.getElementById('products-container');
    productsSection.scrollIntoView({ behavior: 'smooth' });
});
