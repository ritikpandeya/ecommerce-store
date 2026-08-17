# Simple E-Commerce Store

A beginner-friendly full-stack e-commerce web application developed as **Task 1** for the **CodeAlpha Full Stack Development Internship**.

The application provides a simple online shopping experience where users can browse products, manage their shopping cart, and interact with the e-commerce system through a clean web interface.

## 🚀 Features

* 🛍️ Browse available products
* 🔎 View product details
* 🛒 Add products to the shopping cart
* ➕ Increase or decrease product quantity
* ❌ Remove products from the cart
* 💰 Automatic cart total calculation
* 👤 User authentication
* 🔐 Secure password hashing using bcrypt
* 🎟️ JWT-based authentication
* 💾 SQLite database for storing application data
* 📦 Automatically creates the database and sample products on first run
* 📱 Simple and beginner-friendly user interface

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt

## 📁 Project Structure

```text
CodeAlpha_EcommerceStore/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── ecommerce.db
```

> The exact file structure may vary depending on the final project files in the repository.

## ⚙️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/snigdhasumman3110/CodeAlpha_EcommerceStore.git
```

### 2. Open the Project Directory

```bash
cd CodeAlpha_EcommerceStore
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```

### 5. Open the Application

Open your browser and visit:

```text
http://localhost:3000
```

The SQLite database (`ecommerce.db`) and sample products will be generated automatically when the application is run for the first time.

## 🗄️ Database

This project uses **SQLite** as its database.

The application automatically initializes the database and creates sample product data during the first run, making the project easy to set up without requiring a separate database server.

## 🔐 Authentication

The application uses:

* **JWT (JSON Web Tokens)** for user authentication and authorization.
* **bcrypt** for securely hashing user passwords before storing them.

## 📸 Screenshots

Add screenshots of the application here to demonstrate the user interface.

Example:

```text
![Home Page](screenshots/home.png)
![Shopping Cart](screenshots/cart.png)
![Login Page](screenshots/login.png)
```

## 🔮 Future Enhancements

Some features that can be added in future versions include:

* Online payment integration
* Product search and filtering
* Product categories
* Product reviews and ratings
* Admin dashboard
* Order history
* Wishlist functionality
* Responsive design improvements
* Order tracking
* Cloud database integration

## 🎓 Internship Project

This project was developed as part of **Task 1 – E-Commerce Store** for the **CodeAlpha Full Stack Development Internship**.

The project demonstrates the implementation of a full-stack web application using a JavaScript-based technology stack, including frontend development, backend APIs, database integration, authentication, and basic e-commerce functionality.

## 👨‍💻 Author

**Ritik Pandey**

B.Tech CSE (AI/ML)

## ⭐ Acknowledgement

Thanks to **CodeAlpha** for providing the opportunity to work on this project as part of the Full Stack Development Internship.
