### **Updated Plan for Phase 3: Frontend Integration**
Since **React was causing issues**, we are switching to a **PHP + HTML/CSS/JS** frontend. This allows **quick development, smooth API calls**, and **easy deployment**.

---

## **🚀 Phase 3: Frontend Integration (Adjusted)**
### **Phase 3.1 - UI Setup & Backend Integration**
#### **Frontend Technology:**
✅ **PHP with HTML, CSS, and JavaScript**  
✅ **Bootstrap/Tailwind for styling**  
✅ **Session-based JWT handling (PHP) + fetch API calls (JavaScript)**  

### **🚀 Features in Phase 3.1**
1. **Login Page (index.php)**
   - User enters **username & password** → PHP sends request to `auth-service`
   - If **successful**, store JWT **in session** and redirect to Vault.
   - If **failed**, show error.

2. **Vault Page (vault.php)**
   - Fetch stored passwords from `vault-service` using **fetch API**.
   - Display passwords **in a clean table with copy-to-clipboard**.
   - Add button to **generate new password** (calls `utility-service`).

3. **Logout (logout.php)**
   - Clears JWT session and redirects to login.

4. **API Integration**
   - Calls:
     - **POST /auth/login** (Authentication)
     - **GET /vault** (Retrieve stored passwords)
     - **POST /vault** (Save new password)
     - **GET /util/generate** (Generate strong password)
   - Uses `fetch()` in JavaScript, **passes JWT in headers**.

---

## **Phase 3.2 - CI/CD & Deployment**
✅ **Dockerization**  
- Dockerfile for `frontend/`  
- Option A: Deploy as separate container  
- Option B: Copy PHP frontend into `auth-service` container  
✅ **GitHub Actions**
- **Test if frontend loads correctly** (simple curl check)
- **CI/CD pipeline builds and deploys** frontend along with backend  
✅ **Deployment to Google Cloud**
- **Option A**: Deploy as separate service on **Cloud Run/App Engine**  
- **Option B**: Multi-stage build with backend, deploy everything as **Docker container**  

---

## **Next Steps 🚀**
1️⃣ **I generate the PHP-based frontend (login, vault, API calls)**  
2️⃣ **You test it locally** (make sure API calls work)  
3️⃣ **We refine styling & confirm JWT handling works**  
4️⃣ **Push to dev → GitHub Actions → Merge to main**  
5️⃣ **Phase 3.2 → Dockerize, CI/CD, and deploy**