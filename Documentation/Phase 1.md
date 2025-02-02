### **Phase 1 Documentation: Initial Monolithic Setup and DevOps Integration**

## **📌 Overview**
Phase 1 of the **pmDevOps Password Manager** project establishes a **monolithic** backend application using **Node.js, Express, PostgreSQL, and Sequelize**. This phase focuses on **core functionality, authentication, and DevOps automation** before transitioning to microservices in later phases.

---

## **🎯 Goals of Phase 1**
1. ✅ **Develop a functional backend** that supports:
   - User authentication (register & login using JWT).
   - Secure storage of encrypted passwords.
   - CRUD operations for managing stored passwords.
2. ✅ **Implement PostgreSQL as the database** using Sequelize ORM.
3. ✅ **Dockerize the application** to ensure portability.
4. ✅ **Set up GitHub Actions for CI/CD**:
   - Automatically test and build Docker images on each push.
5. ✅ **Test the API using Postman** to validate functionality.

---

## **🛠️ Technologies Used**
| Component         | Technology Used |
|------------------|----------------|
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL 17 |
| **ORM** | Sequelize |
| **Authentication** | JWT (JSON Web Tokens) |
| **Encryption** | Node.js `crypto` module (AES-256) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |

---

## **📌 Project Structure**
```
pmdevops/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── vaultController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── userModel.js
│   │   └── vaultModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── vaultRoutes.js
│   └── index.js
├── tests/
│   ├── auth.test.js
│   └── vault.test.js
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── .github/workflows/ci.yml
```

---

## **🔹 Step 1: Backend Development (Node.js + Express + PostgreSQL)**
The backend is responsible for:
1. **User authentication (register/login)**
2. **Securely storing user passwords**
3. **Allowing users to manage stored passwords**
4. **Exposing API endpoints for future frontend interaction**

### **1.1 Setting Up Node.js and Dependencies**
Initialized the project with:
```bash
npm init -y
```
Installed necessary packages:
```bash
npm install express bcrypt jsonwebtoken dotenv
npm install sequelize pg pg-hstore
```
- **Express.js** → Handles API routes.
- **bcrypt** → Encrypts passwords before storing them.
- **jsonwebtoken** → Implements JWT authentication.
- **Sequelize** → ORM for PostgreSQL.
- **pg** → PostgreSQL driver.

### **1.2 Database Configuration (`src/config/db.js`)**
```js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;
```
- Uses `.env` variables to configure the database connection.

### **1.3 User Model (`src/models/userModel.js`)**
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
```

### **1.4 Vault Model (`src/models/vaultModel.js`)**
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VaultEntry = sequelize.define('VaultEntry', {
  title: { type: DataTypes.STRING, allowNull: false },
  encryptedPassword: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = VaultEntry;
```

### **1.5 Authentication & JWT**
#### **Register User (`src/controllers/authController.js`)**
```js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, passwordHash });

  res.json({ message: 'User registered', userId: newUser.id });
};
```

#### **Login User**
```js
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};
```

---

## **🔹 Step 2: Dockerization**
### **2.1 Create `Dockerfile`**
```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

### **2.2 Create `docker-compose.yml`**
```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_USER=postgres
      - DB_PASS=postgres
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=pmdevops
      - JWT_SECRET=superSecret
      - ENCRYPTION_KEY=12345678901234567890123456789012
    depends_on:
      - db

  db:
    image: postgres:17
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
```

### **2.3 Build and Run Containers**
```bash
docker-compose up --build
```

---

## **🔹 Step 3: CI/CD with GitHub Actions**
### **3.1 `.github/workflows/ci.yml`**
```yaml
name: CI

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: pmdevops
        ports:
          - "5432:5432"

    steps:
      - name: Check out code
        uses: actions/checkout@v2

      - name: Use Node.js 22
        uses: actions/setup-node@v3
        with:
          node-version: 22.13.1

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: docker build -t myuser/pmdevops:${{ github.sha }} .
```
✅ **Runs on every push** → installs dependencies, tests, and builds Docker images.

---

## **📌 Summary**
🔹 Developed a **monolithic backend** with Express & PostgreSQL  
🔹 Implemented **JWT authentication** & **password encryption**  
🔹 **Dockerized** the app for consistent environments  
🔹 Created a **CI/CD pipeline with GitHub Actions**  
🔹 **Ready for Phase 2 (Microservices)!**

---

### **🚀 Next Steps**
✅ If everything works → Start **Phase 2 (splitting into microservices)**  
❌ If any issues → Debug before proceeding
