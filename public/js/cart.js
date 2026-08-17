document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

async function renderCart() {

    const cartContainer =
        document.getElementById('cart-content');

    const cart = getCart();

    if (cart.length === 0) {

        cartContainer.innerHTML =
            '<p>Your cart is empty. ' +
            '<a href="/index.html">Go shopping!</a></p>';

        return;
    }

    try {

        const res =
            await fetch('/api/products');

        const allProducts =
            await res.json();

        let tableHTML = `
            <table class="cart-table">

                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
        `;

        let grandTotal = 0;

        cart.forEach((cartItem, index) => {

            const product =
                allProducts.find(
                    p => p.id === cartItem.product_id
                );

            if (product) {

                const subtotal =
                    product.price * cartItem.quantity;

                grandTotal += subtotal;

                tableHTML += `
                    <tr>

                        <td>
                            <img
                                src="${product.image_url}"
                                alt="${product.name}"
                            >
                            ${product.name}
                        </td>

                        <td>
                            $${product.price.toFixed(2)}
                        </td>

                        <td>

                            <button
                                onclick="updateQty(${index}, -1)">
                                -
                            </button>

                            ${cartItem.quantity}

                            <button
                                onclick="updateQty(${index}, 1)">
                                +
                            </button>

                        </td>

                        <td>
                            $${subtotal.toFixed(2)}
                        </td>

                        <td>
                            <button
                                class="btn-danger"
                                onclick="removeItem(${index})">
                                Remove
                            </button>
                        </td>

                    </tr>
                `;
            }
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        tableHTML += `
            <div class="cart-summary">

                <h3>
                    Total: $${grandTotal.toFixed(2)}
                </h3>

                <button
                    class="btn"
                    style="width: 200px"
                    onclick="proceedToCheckout()">
                    Proceed to Checkout
                </button>

            </div>
        `;

        cartContainer.innerHTML = tableHTML;

    } catch (error) {

        cartContainer.innerHTML =
            '<p class="error-msg">' +
            'Failed to load cart details.' +
            '</p>';
    }
}

function updateQty(index, change) {

    const cart = getCart();

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);

    renderCart();
}

function removeItem(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    renderCart();
}

function proceedToCheckout() {

    if (!getToken()) {

        alert(
            'You must be logged in to checkout.'
        );

        window.location.href =
            '/login.html';

        return;
    }

    window.location.href =
        '/checkout.html';
}