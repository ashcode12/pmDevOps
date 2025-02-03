### **Phase 2.1 Documentation – Microservices Restructure & Database Setup**  

#### **Overview**  
In **Phase 2.1**, we began refactoring the monolithic architecture into a **microservices-based** design. The goal was to split responsibilities between **authentication (auth-service)** and **password vault management (vault-service)** while maintaining a shared PostgreSQL database.  

---

## **1️⃣ Repository Restructure**
We restructured the project into separate services, each with its own folder, `package.json`, `Dockerfile`, and tests.  

📁 **Project Structure after Phase 2.1**  
```
pmDevOps/
├── auth-service/        # Handles user authentication
│   ├── src/
│   │   ├── db.js       # Handles DB connection & setup for users
│   │   ├── index.js    # Express server entry point
│   ├── tests/          # Jest tests for authentication
│   ├── package.json    # Dependencies & scripts
│   ├── Dockerfile      # Containerization setup
│   ├── .env            # Environment variables
│
├── vault-service/       # Manages stored passwords
│   ├── src/
│   │   ├── db.js       # Handles DB connection & setup for vault
│   │   ├── index.js    # Express server entry point
│   ├── tests/          # Jest tests for vault
│   ├── package.json    # Dependencies & scripts
│   ├── Dockerfile      # Containerization setup
│   ├── .env            # Environment variables
│
├── utility-service/     # (Optional) Utility microservice for password generation
│   ├── src/index.js    # Express server entry point
│   ├── package.json    # Dependencies
│   ├── Dockerfile      # Containerization setup
│
├── .github/workflows/   # GitHub Actions for CI/CD
│   ├── ci.yml
│
├── docker-compose.yml   # Orchestrates all services in development
└── README.md
```

---

## **2️⃣ Docker Setup & Running the Services**
We configured **Docker Compose** to orchestrate the microservices:

### **`docker-compose.yml` (Updated)**
```yaml
services:
  auth-service:
    build: ./auth-service
    ports:
      - "4000:4000"
    environment:
      - DB_USER=postgres
      - DB_PASS=postgres
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=pmdevops
      - JWT_SECRET=superSecret
    depends_on:
      - db

  vault-service:
    build: ./vault-service
    ports:
      - "4001:4001"
    environment:
      - DB_USER=postgres
      - DB_PASS=postgres
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=pmdevops
      - JWT_SECRET=superSecret
      - ENCRYPTION_KEY=12345678901234567890123456789012
    depends_on:
      - auth-service
      - db

  utility-service:
    build: ./utility-service
    ports:
      - "4002:4002"
    environment:
      - PORT=4002
    depends_on:
      - auth-service
      - vault-service

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
```

---

## **3️⃣ Database Initialization**
The `pmdevops` database was missing, so we manually created it inside the **PostgreSQL container**:

1️⃣ **Access PostgreSQL container:**
```sh
docker exec -it pmdevops-db-1 psql -U postgres
```

2️⃣ **Create the database manually:**
```sql
CREATE DATABASE pmdevops;
```

3️⃣ **Verify that the database exists:**
```sql
\l
```

4️⃣ **Check if tables exist (after running the services):**
```sh
docker exec -it pmdevops-db-1 psql -U postgres -d pmdevops -c "\dt"
```

Both `users` and `vault_entries` tables were successfully created.

---

## **4️⃣ Testing Microservices**
After database setup, we tested the services:

✅ **Unit Tests Passed**:  
- `npm test` successfully ran sample tests in `auth-service` and `vault-service`.

✅ **Container Status**:  
```sh
docker ps
```
- `auth-service`, `vault-service`, and `utility-service` were running.
- `db` container was initialized successfully.

✅ **API Check**:  
```sh
curl http://localhost:4000   # Auth service
curl http://localhost:4001   # Vault service
curl http://localhost:4002   # Utility service
```
- `Cannot GET /` response confirmed Express servers were running.

---

## **📌 Summary of Phase 2.1**
### **✅ Completed**
✔️ Split monolithic codebase into **microservices** (`auth-service`, `vault-service`, `utility-service`).  
✔️ Set up **Docker Compose** to manage services.  
✔️ Created **PostgreSQL database (`pmdevops`) and tables** inside the DB container.  
✔️ Verified that all services **run inside containers** and are accessible via ports.  
✔️ Ran **unit tests** successfully for both services.  
✔️ Pushed all changes to the **`dev` branch**.  

### **🔜 Next in Phase 2.2**
🔹 Implement **authentication routes** inside `auth-service`:
   - **POST /register** (user signup)
   - **POST /login** (JWT token generation)
   - **GET /profile** (fetch user details)

🔹 Implement **password vault API** inside `vault-service`:
   - **GET /vault** (fetch stored passwords)
   - **POST /vault** (store encrypted password)
   - **DELETE /vault/:id** (delete stored password)

🔹 Write **integration tests** to verify microservices communication.  
🔹 Ensure **JWT authentication** works across services.  

---

## **Next Steps: Phase 2.2 (Authentication & Vault API)**
Since **Phase 2.1 is now fully documented**, we can **move to Phase 2.2** where we will **add authentication and vault functionality**.
