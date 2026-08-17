document.addEventListener(
    'DOMContentLoaded',
    async () => {

        const productList =
            document.getElementById('product-list');

        try {

            const response =
                await fetch('/api/products');

            const products =
                await response.json();

            if (products.length === 0) {

                productList.innerHTML =
                    '<p>No products available.</p>';

                return;
            }

            productList.innerHTML = '';

            products.forEach(product => {

                const card =
                    document.createElement('div');

                card.className =
                    'product-card';

                card.innerHTML = `
                    <img
                        src="${product.image_url}"
                        alt="${product.name}"
                    >

                    <h3>${product.name}</h3>

                    <div class="price">
                        $${product.price.toFixed(2)}
                    </div>

                    <div class="actions">

                        <a
                            href="/product.html?id=${product.id}"
                            class="btn btn-outline btn-small">
                            Details
                        </a>

                        <button
                            class="btn btn-small"
                            onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>

                    </div>
                `;

                productList.appendChild(card);
            });

        } catch (error) {

            productList.innerHTML =
                '<p class="error-msg">' +
                'Failed to load products.' +
                '</p>';
        }
    }
);