
# 🌐 AWS URL Shortener - Serverless Project

🚀 A serverless URL shortener built using AWS services, allowing users to convert long URLs into short, shareable links.

🔗 **Live Demo**: [https://web.theshortly.xyz](https://web.theshortly.xyz)

---

## 📌 1. Overview

This project is a fully serverless URL shortener built using:

- **Frontend**:  
  Hosted on **S3 + CloudFront**  
  - HTTPS enabled  
  - Custom domain: `web.theshortly.xyz`

- **Backend**:
  - **AWS Lambda (Node.js)** – Two functions:
    - `create-url`: Generates short URLs
    - `redirect-url`: Handles redirects to original URLs
  - **DynamoDB** – Stores short code mappings
  - **API Gateway** – Exposes Lambda as REST API (`api.theshortly.xyz`)
  - **Throttling** – API Gateway rate limiting to prevent abuse

---

## 🖥️ 2. Frontend Deployment (S3 + CloudFront)

Static website hosted using:

- **S3 Bucket**
  - Static website hosting enabled
  - Public read access via Bucket Policy

- **CloudFront Distribution**:
  - Origin: S3 bucket
  - HTTPS enforced via AWS ACM SSL Certificate
  - Custom subdomain `web.theshortly.xyz` mapped via **CNAME** record

---

## 🧠 3. Lambda Functions (Backend Logic)

### 🔹 Create URL Lambda
- Generates 8-character short code (hash)
- Stores mapping in **DynamoDB**

### 🔹 Redirect URL Lambda
- Looks up short code in **DynamoDB**
- Returns **301 redirect** to original URL

### Required IAM Permissions
- `dynamodb:PutItem` (for `create-url`)
- `dynamodb:GetItem` (for `redirect-url`)

---

## 🌐 4. API Gateway Setup

### Endpoints:
- `GET /create?url=<longUrl>` → Invokes `create-url` Lambda
- `GET /{shortCode}` → Invokes `redirect-url` Lambda

### CORS Configuration:
- Enabled via API Gateway Console
- Response headers include:  
  `Access-Control-Allow-Origin: *`


---

## 🛡️ 5. Throttling Configuration

To prevent abuse:

- API Gateway throttling:  
  Setup **Burst limit** and **Rate limit** per client
- Configured at **API Gateway stage level**

---

## 🚀 Future Improvements

- Add **AWS WAF** for IP-based rate limiting
- **User authentication** via Cognito
- **Analytics dashboard** for click tracking
- Support **custom short URLs** (user-defined paths)

