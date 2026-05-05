# SIGAP Backend - Node.js Express REST API

Backend API untuk **SIGAP (Sistem Informasi Gangguan & Pantauan Jalan)** - Aplikasi pelaporan jalan rusak, kemacetan, dan kecelakaan berbasis cloud.

## 📋 Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js     # Sequelize DB config (RDS)
│   └── aws.js          # AWS S3 client config
├── models/             # Sequelize models
│   └── Report.js       # Report model
├── controllers/        # Business logic
│   └── reportController.js
├── routes/             # API endpoints
│   └── reportRoutes.js
├── middleware/         # Custom middleware
│   └── upload.js       # Multer file upload
├── helpers/            # Helper functions
│   ├── cloudfront.js   # CloudFront URL conversion
│   └── s3Upload.js     # S3 upload logic
├── .github/workflows/  # CI/CD pipeline
│   └── deploy-backend.yml
├── Dockerfile          # Container image
├── server.js           # Main server file
├── package.json        # Dependencies
└── .env.example        # Environment variables template
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` dengan credentials AWS dan RDS Anda:

```env
# Database (Amazon RDS)
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_USER=admin
DB_PASS=your-secure-password
DB_NAME=sigap_db

# AWS Configuration
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=sigap-storage
CLOUDFRONT_URL=https://d12345.cloudfront.net

# Server
PORT=5000
NODE_ENV=production
```

### 3. Run Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

## 📡 API Endpoints

### 1. Health Check
```http
GET /health
```

Response:
```json
{
  "success": true,
  "message": "SIGAP Backend is running"
}
```

### 2. Create Report (dengan file upload)
```http
POST /api/reports
Content-Type: multipart/form-data

Form Data:
- pelapor_nama: string (required)
- jenis_gangguan: string (required) - enum: Jalan Rusak, Kemacetan, Kecelakaan, Lainnya
- lokasi: string (required)
- deskripsi: string (optional)
- image: file (optional, max 10MB)
```

Response:
```json
{
  "success": true,
  "message": "Report created successfully",
  "data": {
    "id": "uuid",
    "pelapor_nama": "Budi Santoso",
    "jenis_gangguan": "Jalan Rusak",
    "lokasi": "Jl. Sudirman, Jakarta",
    "deskripsi": "Ada lubang besar di tengah jalan",
    "image_url": "https://d12345.cloudfront.net/laporan/1234567890-uuid.jpg",
    "status": "Pending",
    "created_at": "2026-05-05T10:00:00Z"
  }
}
```

### 3. Get All Reports
```http
GET /api/reports
```

Response:
```json
{
  "success": true,
  "message": "Reports retrieved successfully",
  "data": [...],
  "total": 5
}
```

### 4. Get Single Report
```http
GET /api/reports/{id}
```

### 5. Get Reports by Status
```http
GET /api/reports/status/{status}
```

Status: `Pending`, `Diproses`, `Selesai`

### 6. Update Report Status (Officer Only)
```http
PATCH /api/reports/{id}/status
Content-Type: application/json

{
  "status": "Diproses"
}
```

## 🐳 Docker & ECS Deployment

### Build Docker Image

```bash
docker build -t sigap-backend:latest .
```

### Run Container Locally

```bash
docker run -p 5000:5000 \
  -e DB_HOST=your-rds-host \
  -e AWS_REGION=ap-southeast-1 \
  -e S3_BUCKET_NAME=sigap-storage \
  sigap-backend:latest
```

### Push to Amazon ECR

```bash
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com

docker tag sigap-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/sigap-backend:latest

docker push YOUR_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/sigap-backend:latest
```

## 🔄 CI/CD Pipeline

GitHub Actions workflow otomatis:
1. Trigger: Push ke branch `main` atau `develop`
2. Build Docker image
3. Login ke Amazon ECR
4. Push image ke ECR
5. Update ECS service

**Setup secrets di GitHub:**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## 🔐 AWS IAM Permissions

Backend membutuhkan IAM permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::sigap-storage/*"
    }
  ]
}
```

## 📚 Tech Stack

- **Runtime:** Node.js 18
- **Framework:** Express.js
- **Database:** MySQL (Amazon RDS)
- **Storage:** Amazon S3
- **CDN:** Amazon CloudFront
- **ORM:** Sequelize
- **File Upload:** Multer
- **AWS SDK:** @aws-sdk/client-s3 (v3)
- **Containerization:** Docker + ECS
- **CI/CD:** GitHub Actions

## 📝 License

MIT License - Tugas Cloud Computing ITENAS
