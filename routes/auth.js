const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: 'All fields are required.'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [name, email, hashedPassword], function (err) {

            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({
                        error: 'Email already exists.'
                    });
                }

                return res.status(500).json({
                    error: 'Database error.'
                });
            }

            res.status(201).json({
                message: 'User registered successfully!'
            });
        });

    } catch (error) {
        res.status(500).json({
            error: 'Server error.'
        });
    }
});

// Login
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'All fields are required.'
        });
    }

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        async (err, user) => {

            if (err) {
                return res.status(500).json({
                    error: 'Database error.'
                });
            }

            if (!user) {
                return res.status(400).json({
                    error: 'Invalid email or password.'
                });
            }

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {
                return res.status(400).json({
                    error: 'Invalid email or password.'
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            res.json({
                message: 'Logged in successfully',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    );
});

module.exports = router;