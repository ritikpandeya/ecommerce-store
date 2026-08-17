document.addEventListener('DOMContentLoaded', async () => {

    const container = document.getElementById('product-container');

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        container.innerHTML =
            '<p class="error-msg">Product not found.</p>';
        return;
    }

    try {

        const response =
            await fetch(`/api/products/${productId}`);

        if (!response.ok) {
            throw new Error('Product not found');
        }

        const product = await response.json();

        container.innerHTML = `
            <div class="product-details">

                <img
                    src="${product.image_url}"
                    alt="${product.name}"
                >

                <div class="details-info">

                    <h1>${product.name}</h1>

                    <div class="price">
                        $${product.price.toFixed(2)}
                    </div>

                    <p>
                        ${product.description}
                    </p>

                    <div class="qty-selector">

                        <label>Quantity:</label>

                        <input
                            type="number"
                            id="qty-input"
                            value="1"
                            min="1"
                            max="10"
                        >

                    </div>

                    <button
                        class="btn"
                        id="add-btn">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        document
            .getElementById('add-btn')
            .addEventListener('click', () => {

                const qty = parseInt(
                    document.getElementById('qty-input').value
                );

                if (qty > 0) {
                    addToCart(product.id, qty);
                }

            });

    } catch (error) {

        container.innerHTML =
            '<p class="error-msg">Error loading product details.</p>';

    }

});