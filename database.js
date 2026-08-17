const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./ecommerce.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.serialize(() => {

    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    // Products table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image_url TEXT NOT NULL
        )
    `);

    // Orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            shipping_name TEXT NOT NULL,
            shipping_address TEXT NOT NULL,
            total_amount REAL NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    // Order items table
    db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `);

    // Add sample products
    db.get(
        `SELECT COUNT(*) AS count FROM products`,
        [],
        (err, row) => {

            if (err) {
                console.error(err.message);
                return;
            }

            if (row.count === 0) {

                const products = [
                    {
                        name: "Wireless Headphones",
                        description: "High-quality noise-canceling wireless headphones.",
                        price: 99.99,
                        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "Smart Watch",
                        description: "Track your fitness and stay connected on the go.",
                        price: 149.99,
                        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "Mechanical Keyboard",
                        description: "RGB backlit mechanical keyboard.",
                        price: 79.99,
                        image_url: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "Gaming Mouse",
                        description: "Ergonomic gaming mouse with programmable buttons.",
                        price: 49.99,
                        image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "4K Monitor",
                        description: "Crystal clear 27-inch 4K UHD monitor.",
                        price: 299.99,
                        image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "Laptop Backpack",
                        description: "Water-resistant backpack with anti-theft design.",
                        price: 39.99,
                        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "Bluetooth Speaker",
                        description: "Portable Bluetooth speaker with deep bass.",
                        price: 59.99,
                        image_url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60"
                    },
                    {
                        name: "Web Camera",
                        description: "1080p HD webcam with built-in microphone.",
                        price: 29.99,
                        image_url: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=500&q=60"
                    }

                    
                ];
                // Make sure Web Camera exists
db.run(
    `UPDATE products
     SET description = ?, image_url = ?
     WHERE name = ?`,
    [
        "1080p HD webcam with built-in microphone.",
        "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=500&q=60",
        "Web Camera"
    ],
    function (err) {
        if (err) {
            console.error("Error updating Web Camera:", err.message);
            return;
        }

        // If Web Camera does not exist, insert it
        if (this.changes === 0) {
            db.run(
                `INSERT INTO products
                (name, description, price, image_url)
                VALUES (?, ?, ?, ?)`,
                [
                    "Web Camera",
                    "1080p HD webcam with built-in microphone.",
                    29.99,
                    "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=500&q=60"
                ],
                (err) => {
                    if (err) {
                        console.error("Error inserting Web Camera:", err.message);
                    } else {
                        console.log("Web Camera added successfully.");
                    }
                }
            );
        }
    }
);

                const stmt = db.prepare(`
                    INSERT INTO products
                    (name, description, price, image_url)
                    VALUES (?, ?, ?, ?)
                `);

                products.forEach(product => {
                    stmt.run(
                        product.name,
                        product.description,
                        product.price,
                        product.image_url
                    );
                });

                stmt.finalize();

                console.log("8 sample products inserted.");
            }
        }
    );
});

module.exports = db;