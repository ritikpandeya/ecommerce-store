const API_URL = '/api';

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Cart management
function getCart() {
    const cartStr = localStorage.getItem('cart');
    return cartStr ? JSON.parse(cartStr) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();

    const existing = cart.find(
        item => item.product_id === productId
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            product_id: productId,
            quantity: quantity
        });
    }

    saveCart(cart);

    alert('Item added to cart!');
}

function updateCartBadge() {
    const cart = getCart();

    const count = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const badge = document.getElementById('nav-cart-count');

    if (badge) {
        badge.innerText = count;
    }
}

// Update navbar based on login status
function updateNavbar() {

    const token = getToken();
    const user = getUser();

    const loginLink =
        document.getElementById('nav-login');

    const registerLink =
        document.getElementById('nav-register');

    const logoutLink =
        document.getElementById('nav-logout');

    if (token && user) {

        if (loginLink) {
            loginLink.style.display = 'none';
        }

        if (registerLink) {
            registerLink.style.display = 'none';
        }

        if (logoutLink) {

            logoutLink.style.display = 'inline-block';

            logoutLink.innerHTML =
                `Logout (${user.name})`;

            logoutLink.addEventListener('click', (e) => {

                e.preventDefault();

                localStorage.removeItem('token');
                localStorage.removeItem('user');

                window.location.href =
                    '/index.html';
            });
        }
    }

    updateCartBadge();
}

document.addEventListener(
    'DOMContentLoaded',
    updateNavbar
);