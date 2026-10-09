# Simple E-Commerce Store

A beginner-friendly full-stack e-commerce web application developed as Task 1 for the CodeAlpha Full Stack Development Internship.

The application provides a simple online shopping experience with product browsing, product details, shopping cart management, user authentication, and checkout functionality.

## Features

* Browse available products and view product details
* Add products to the shopping cart
* Increase or decrease product quantities
* Remove products from the cart
* Automatically calculate cart totals
* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* SQLite database integration
* Automatic database initialization and sample product setup
* Checkout and order-related functionality

## Tech Stack

**Frontend**

* HTML5
* CSS3
* Vanilla JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* SQLite

**Authentication and Security**

* JSON Web Token (JWT)
* bcrypt

## Project Structure

```text
ecommerce-store/
├── middleware/
│   └── auth.js
├── public/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   └── success.html
├── routes/
│   ├── auth.js
│   ├── orders.js
│   ├── products.js
│   └── reset-password.js
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

* Node.js and npm installed
* Git installed

### 1. Clone the repository

```bash
git clone https://github.com/ritikpandeya/ecommerce-store.git
```

### 2. Navigate to the project directory

```bash
cd ecommerce-store
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

### 5. Open in your browser

Visit:

```text
http://localhost:3000
```

The application uses SQLite for data storage. Database initialization and sample data setup are handled by the application.

## Authentication and Security

* JWT is used for authentication.
* bcrypt is used to hash passwords.
* Protected routes use authentication middleware.
* Sensitive environment configuration and local database files are excluded through `.gitignore`.

## Future Improvements

* Online payment gateway integration
* Product search and filtering
* Product categories and reviews
* Admin dashboard
* Improved responsive design
* Order history and tracking

## Author

**Ritik Pandeya**

B.Tech in Computer Science and Engineering (AI/ML)

GitHub: [ritikpandeya](https://github.com/ritikpandeya)

## Acknowledgement

Developed as a project for the CodeAlpha Full Stack Development Internship.
