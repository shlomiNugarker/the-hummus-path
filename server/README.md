# expense-tracker-application-server

This repository contains the backend implementation of a simple but functional personal expense tracker application. The backend is built using Node.js with Express.js and MongoDB for data storage. It provides RESTful API endpoints for managing user authentication and expenses.

## Features

- **User Authentication:** Users can create accounts, log in securely, and manage their expenses.

- **Expense Management:** Users can add, retrieve, update, and delete expenses, categorize them, and add optional notes.

- **Security:** Basic authentication is implemented to protect user data and ensure secure access to expenses.

## Setup Instructions

### 1. Clone this repository to your local machine.

```bash
git clone https://github.com/shlomiNugarker/expense-tracker-application-server.git
cd expense-tracker-application-server
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up environment variables:

- Create a .env file in the root directory.

- Define the following variables:

- PORT: Port number for the server (default: 3030).

- TOKEN_SECRET: Secret key for JWT token generation.

- DB_PASSWORD: Password for MongoDB Atlas connection.

### 4. Start the server:

```bash
npm run dev
```

This will start the server and listen for incoming requests on the specified port.

## API Endpoints

- User Authentication:

  - POST /api/auth/login: User login.
  - POST /api/auth/signup: User signup.
  - DELETE /api/auth/logout: User logout.

- Expense Management:

  - GET /api/expense: Retrieve all expenses.
  - GET /api/expense/:id: Retrieve an expense by ID.
  - POST /api/expense: Add a new expense.
  - PUT /api/expense/:id: Update an expense.
  - DELETE /api/expense/:id: Delete an expense.

## Additional Information

- Tech Stack:

  - Node.js

  - Express.js

  - MongoDB

  - JWT (JSON Web Tokens)
