document.getElementById('register-form').addEventListener('submit', async (e) => {

    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const errorDiv = document.getElementById('error-msg');

    try {

        const res = await fetch('/api/auth/register', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            errorDiv.innerText = data.error;
            return;
        }

        alert('Registration successful! Please login.');

        window.location.href = '/login.html';

    } catch (error) {

        errorDiv.innerText =
            'Server error. Please try again later.';

    }

});