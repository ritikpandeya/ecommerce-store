document.getElementById('login-form').addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-msg');

    try {

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            errorDiv.innerText = data.error || 'Login failed.';
            return;
        }

        // Save login information
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert('Login successful!');

        window.location.href = '/index.html';

    } catch (error) {

        errorDiv.innerText =
            'Server error. Please try again later.';

    }

});