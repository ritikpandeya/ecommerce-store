const bcrypt = require('bcrypt');
const db = require('./database');

const email = 'YOUR_EMAIL_HERE';
const newPassword = '123456';

bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
        console.error('Password hashing failed:', err);
        return;
    }

    db.run(
        `UPDATE users SET password = ? WHERE email = ?`,
        [hash, email],
        function (err) {
            if (err) {
                console.error('Password reset failed:', err.message);
                return;
            }

            if (this.changes === 0) {
                console.log('No user found with this email.');
            } else {
                console.log('Password reset successfully!');
                console.log('New password:', newPassword);
            }

            db.close();
        }
    );
});