document.addEventListener('DOMContentLoaded', () => {

    const params =
        new URLSearchParams(window.location.search);

    const orderId =
        params.get('id');

    const display =
        document.getElementById('order-id-display');

    if (orderId) {
        display.innerText = '#' + orderId;
    } else {
        display.innerText = 'Unknown';
    }

});