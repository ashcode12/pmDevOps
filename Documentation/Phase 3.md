### **Phase 3.2: Frontend Integration**
**Objective:**
To integrate the frontend UI with the backend services (Auth Service, Vault Service, Utility Service) and implement a seamless flow for user interaction, focusing on login, vault management, and utility functionalities.

---

### **Steps Taken:**

#### 1. **Frontend Setup**
- Created a **frontend service** using basic **HTML, CSS, and JavaScript** for simplicity and compatibility with Docker and GitHub Actions.
- Built a minimal UI with the following pages:
  1. **Login Page:** (`index.html`)
     - Allows users to log in with their credentials.
     - Upon successful login, stores the JWT in localStorage for further API calls.
  2. **Vault Page:** (`vault.html`)
     - Enables users to add and view stored passwords.
  3. **Error Handling:**
     - Provided feedback on invalid login credentials or other failures.

---

#### 2. **Backend Adjustments**
- **CORS Support:**
  - Added `cors` middleware to both `auth-service` and `vault-service` to allow cross-origin requests from the frontend.
  - Ensured the `Access-Control-Allow-Origin` header is set to permit requests from `localhost:8080`.

- **Hardcoded Users:**
  - Continued using hardcoded user credentials for the **Auth Service** to simplify development and testing.

---

#### 3. **Integration Testing**
- Verified frontend interactions with backend APIs:
  - **Login API (`POST /login`)**: Successful login retrieves a JWT, which is stored in `localStorage`.
  - **Vault API (`POST /vault`, `GET /vault`)**:
    - Users can add a new site-password pair.
    - Users can view all stored passwords, decrypted on the client side for clarity.
  - **Utility Service APIs (Optional)**:
    - These endpoints were prepared for Phase 4 integration.

- Used `curl` commands and browser developer tools to debug and validate:
  - Response data from APIs.
  - Correct JWT usage in requests.

---

#### 4. **Challenges and Resolutions**
- **CORS Errors:**
  - **Issue:** Initial failures due to the absence of CORS headers in the backend.
  - **Resolution:** Installed and configured the `cors` package in `auth-service` and `vault-service`.
- **Service Availability:**
  - Ensured all services (frontend, auth-service, vault-service) were running correctly in Docker.
- **Frontend Debugging:**
  - Encountered issues with missing responses and improper redirections, which were resolved by improving error handling and debugging JavaScript logic.

---

#### 5. **Docker Integration**
- Created a Dockerfile for the frontend and included it in the `docker-compose.yml` file.
- Frontend service now serves the application on `localhost:8080`.
- Verified that the backend services (auth, vault, and utility) and the database (`Postgres`) worked seamlessly with the frontend.

---

#### 6. **CI/CD Setup**
- Updated GitHub Actions to include tests for the frontend.
- Added steps for:
  - Building the frontend Docker image.
  - Running automated tests for JavaScript functionality.
  - Verifying compatibility with backend services.

---

### **Results**
- **Login Workflow:**
  - Users can log in successfully, with the JWT securely stored for subsequent API calls.
- **Vault Management:**
  - Users can add and view stored passwords, with real-time updates.
- **Responsive UI:**
  - Basic styling and functionality ensure a user-friendly experience.

---

### **Next Steps**
1. Push changes to the `dev` branch and verify GitHub Actions.
2. Merge into the `main` branch once tests are successful.
3. Prepare for **Phase 4: Deployment**:
   - Host the application on Google Cloud or an equivalent provider.
   - Ensure CI/CD pipelines are configured for automatic builds and deployments.
