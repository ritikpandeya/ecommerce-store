document.addEventListener('DOMContentLoaded', () => {

    // User must be logged in
    if (!getToken()) {
        window.location.href = '/login.html';
        return;
    }

    // Cart cannot be empty
    if (getCart().length === 0) {
        window.location.href = '/cart.html';
        return;
    }
});


document.getElementById('checkout-form')
    .addEventListener('submit', async (e) => {

        e.preventDefault();

        const btn =
            document.getElementById('place-order-btn');

        const errorDiv =
            document.getElementById('error-msg');

        const shipping_name =
            document.getElementById('shipping_name').value.trim();

        const shipping_address =
            document.getElementById('shipping_address').value.trim();

        const items = getCart();

        btn.innerText = 'Processing...';
        btn.disabled = true;

        try {

            const res = await fetch('/api/orders', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':
                        `Bearer ${getToken()}`
                },

                body: JSON.stringify({
                    items,
                    shipping_name,
                    shipping_address
                })
            });

            const data = await res.json();

            if (!res.ok) {

                errorDiv.innerText =
                    data.error || 'Failed to place order.';

                btn.innerText = 'Place Order';
                btn.disabled = false;

                return;
            }

            // Order successful
            localStorage.removeItem('cart');

            window.location.href =
                `/success.html?id=${data.order_id}`;

        } catch (error) {

            console.error(error);

            errorDiv.innerText =
                'Server error. Please try again later.';

            btn.innerText = 'Place Order';
            btn.disabled = false;
        }

    });