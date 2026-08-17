const express = require('express');
const router = express.Router();
const db = require('../database');
const verifyToken = require('../middleware/auth');

// Create an order
router.post('/', verifyToken, (req, res) => {
    const { items, shipping_name, shipping_address } = req.body;
    const user_id = req.user.id;

    // Validate cart
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: 'Cart is empty.'
        });
    }

    // Validate shipping information
    if (!shipping_name || !shipping_address) {
        return res.status(400).json({
            error: 'Shipping details are required.'
        });
    }

    // Validate quantities
    for (const item of items) {
        if (
            !Number.isInteger(item.product_id) ||
            !Number.isInteger(item.quantity) ||
            item.quantity <= 0
        ) {
            return res.status(400).json({
                error: 'Invalid cart item.'
            });
        }
    }

    const productIds = items.map(item => item.product_id);

    // Create placeholders for the SQL IN clause
    const placeholders = productIds.map(() => '?').join(',');

    db.all(
        `SELECT id, price FROM products WHERE id IN (${placeholders})`,
        productIds,
        (err, products) => {

            if (err) {
                return res.status(500).json({
                    error: 'Database error.'
                });
            }

            let total_amount = 0;
            const validItems = [];

            for (const cartItem of items) {

                const product = products.find(
                    product => product.id === cartItem.product_id
                );

                if (!product) {
                    return res.status(400).json({
                        error: `Product ${cartItem.product_id} not found.`
                    });
                }

                total_amount += product.price * cartItem.quantity;

                validItems.push({
                    product_id: product.id,
                    quantity: cartItem.quantity,
                    price: product.price
                });
            }

            // Create order
            db.run(
                `
                INSERT INTO orders
                (user_id, shipping_name, shipping_address, total_amount)
                VALUES (?, ?, ?, ?)
                `,
                [
                    user_id,
                    shipping_name,
                    shipping_address,
                    total_amount
                ],
                function (err) {

                    if (err) {
                        return res.status(500).json({
                            error: 'Failed to create order.'
                        });
                    }

                    const order_id = this.lastID;

                    // Insert order items
                    const stmt = db.prepare(`
                        INSERT INTO order_items
                        (order_id, product_id, quantity, price)
                        VALUES (?, ?, ?, ?)
                    `);

                    validItems.forEach(item => {
                        stmt.run(
                            order_id,
                            item.product_id,
                            item.quantity,
                            item.price
                        );
                    });

                    stmt.finalize((err) => {

                        if (err) {
                            return res.status(500).json({
                                error: 'Failed to save order items.'
                            });
                        }

                        res.status(201).json({
                            message: 'Order placed successfully!',
                            order_id
                        });
                    });
                }
            );
        }
    );
});

module.exports = router;