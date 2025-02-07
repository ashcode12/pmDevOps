## 📌 **Phase 4: Deployment to Google Cloud Run** 🚀  

### 🎯 **Objective**  
To deploy the **backend microservices** (**Auth Service, Vault Service**) and ensure they work seamlessly in the cloud while maintaining **security, CI/CD integration, and scalability**.

---

## 🏗️ **1. Deployment Strategy**  

### **🌍 Services Deployed on Google Cloud Run**  
| Service        | Cloud Run URL |
|---------------|--------------------------------------------------------------------------------|
| **Auth Service** | [https://auth-service-1074737666429.europe-west1.run.app](https://auth-service-1074737666429.europe-west1.run.app) |
| **Vault Service** | [https://vault-service-1074737666429.europe-west1.run.app](https://vault-service-1074737666429.europe-west1.run.app) |

💡 **Why Google Cloud Run?**  
- **Serverless & Scalable**: No need to manage infrastructure; it scales automatically.  
- **Secure**: Built-in authentication, HTTPS, and Google-managed service accounts.  
- **Cost-Effective**: Only pays for what is used, ideal for the **free-tier** constraints.  

### **🛠️ Steps Taken**
✅ **Enabled Required GCP Services**  
```bash
gcloud services enable compute.googleapis.com cloudresourcemanager.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com run.googleapis.com sqladmin.googleapis.com secretmanager.googleapis.com
```
✅ **Authenticated Docker with GCP**  
```bash
gcloud auth configure-docker
```
✅ **Built & Tagged Docker Images**  
```bash
docker build -t gcr.io/pmdevops/auth-service:v1 ./auth-service
docker build -t gcr.io/pmdevops/vault-service:v1 ./vault-service
```
✅ **Pushed Images to Google Container Registry**  
```bash
docker push gcr.io/pmdevops/auth-service:v1
docker push gcr.io/pmdevops/vault-service:v1
```
✅ **Deployed to Google Cloud Run**  
```bash
gcloud run deploy auth-service --image gcr.io/pmdevops/auth-service:v1 --platform managed --region europe-west1 --allow-unauthenticated
gcloud run deploy vault-service --image gcr.io/pmdevops/vault-service:v1 --platform managed --region europe-west1 --allow-unauthenticated
```
✅ **Verified Deployed Services**  
```bash
gcloud run services list
```

---

## 🔍 **2. Testing & Results**  

### **🛠️ Login API Test**
```bash
curl -X POST https://auth-service-1074737666429.europe-west1.run.app/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password123"}'
```
✅ **Response** (Successful Login)  
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### **🛠️ Vault Service API Test**
✅ **Store a password**
```bash
curl -X POST https://vault-service-1074737666429.europe-west1.run.app/vault \
     -H "Authorization: Bearer <VALID_JWT_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"site":"github.com", "password":"mypassword123"}'
```
✅ **Response**
```json
{
  "message": "Password stored successfully"
}
```
✅ **Retrieve stored passwords**
```bash
curl -X GET https://vault-service-1074737666429.europe-west1.run.app/vault \
     -H "Authorization: Bearer <VALID_JWT_TOKEN>"
```
✅ **Response**
```json
{
  "passwords": [
    {
      "site": "github.com",
      "password": "mypassword123"
    }
  ]
}
```

💡 **Error Encountered & Solution**  
❌ **Initial token expired → Caused "Invalid Token" error.**  
✅ **Solution: Always generate a fresh token from `/login` before making further requests.**

---

## 🔒 **3. Security & CI/CD**  

### **🔑 Authentication & Security**
- **JWT Authentication** is used to **secure API calls**.
- **Tokens must be passed in `Authorization` headers**.
- **Secrets & credentials are managed with Google Cloud Secret Manager** (to be configured).

### **🤖 CI/CD Pipeline (GitHub Actions + Cloud Build)**
- GitHub Actions **automates builds & testing** before deploying.
- Cloud Build **compiles Docker images & deploys to Cloud Run**.
- Future improvements:  
  ✅ Automate deployments on `main` branch pushes.  
  ✅ Implement **Terraform** for Infrastructure as Code.

---

## ✅ **Next Steps**  
### **1️⃣ Finalize Secret Manager & Env Variables**
- Secure environment variables using Google Cloud Secret Manager.
- Ensure **JWT_SECRET & DB credentials are securely stored**.

### **2️⃣ Fix & Deploy Frontend**
- Integrate UI with backend microservices.
- Deploy **Frontend Service** to Cloud Run.

### **3️⃣ Improve CI/CD & Security**
- Add **GitHub Actions pipeline** to automate deployments.
- Improve **IAM Roles & Access Controls**.

---

🎉 **Phase 4 Deployment = SUCCESS!** ✅  
🔥 **Now let’s finalize security & deploy the frontend.** 🚀