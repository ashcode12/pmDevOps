### **📌 Documentation Update: Deployment Fixes & Improvements**  

---

## **1️⃣ Deployment Fixes & Issues Encountered**  

### **🚨 Problem: GitHub Actions Failing on `main`**
After successfully testing on `dev`, pushing to `main` triggered **deployment failures**. The primary issue was:

- **Missing Image Name** when pushing to **Google Artifact Registry**.
- This caused **Cloud Run deployment to fail**, preventing successful deployment.

#### **🔍 Solution:**
1. Updated **GitHub Actions YAML (`deploy.yml`)** to include the correct **image name** for:
   - **`auth-service`**
   - **`vault-service`**
2. Pushed the fix to `dev`, verified that tests passed.
3. Merged `dev` into `main`, and deployment **succeeded**! ✅  

---

## **2️⃣ GitHub Actions Fixes & Improvements**  

### **🤖 Problem: Manual Testing**  
Previously, we had to **manually run `npm test`** after deployment.  

#### **✅ Solution: Automating Tests in GitHub Actions**
- Updated **GitHub Actions** to run **automated tests** before deploying.  
- Now, tests will **fail the workflow** if a microservice does not pass **unit tests** before deployment.

---

## **3️⃣ Final Status of Services**  

| **Service**      | **Status** | **URL** |
|-----------------|-----------|---------|
| `auth-service`  | ✅ **Live** | [auth-service](https://auth-service-1074737666429.europe-west1.run.app) |
| `vault-service` | ✅ **Live** | [vault-service](https://vault-service-1074737666429.europe-west1.run.app) |

### **🛠 How to Check Service Health**
Run the following `curl` commands:

```bash
# Test login
curl -X POST https://auth-service-1074737666429.europe-west1.run.app/login \
     -d '{"username": "admin", "password": "password123"}' \
     -H "Content-Type: application/json"

# Test protected route (replace <TOKEN> with the actual JWT token)
curl -X GET https://auth-service-1074737666429.europe-west1.run.app/profile \
     -H "Authorization: Bearer <TOKEN>"
```

---

## **4️⃣ Next Steps (Future Features & Development)**  

### **🛡 Security Enhancements**
- Implement **password hashing improvements**.
- Add **rate-limiting** to prevent brute-force attacks.
- Implement **JWT token expiration & refresh**.

### **🛠 New Microservices**
- ✅ **Password Strength API**: Check password strength dynamically.
- 🔜 **Logging & Monitoring**: Track failed login attempts.

### **🖥 Fixing the Frontend**
- React **wasn't working** previously, so we used HTML/CSS/JS.  
- We need to **debug frontend issues** OR build a simple UI for testing.

---

### **✅ Next Steps:**
1️⃣ **Commit & Push Documentation Update**  
2️⃣ **Start Developing the Password Strength Microservice**  