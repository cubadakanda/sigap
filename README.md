# 🚨 SIGAP - Sistem Informasi Gangguan & Pantauan Jalan

**Cloud Computing - Evaluasi 2**  
**NRP:** 152023141  
**Nama:** Parisan Apro  
**Kelas:** AA  
**ITENAS Bandung**

---

## 📋 Project Overview

**SIGAP** adalah aplikasi berbasis web untuk pelaporan dan pemantauan gangguan jalan (kemacetan, jalan rusak, kecelakaan) yang dibangun dengan arsitektur cloud-native menggunakan AWS.

### ✨ Features
- 📱 User dapat melaporkan gangguan jalan dengan foto
- 👮 Officer dapat memantau dan update status laporan
- 📊 Real-time dashboard untuk monitoring
- ☁️ Cloud-based infrastructure (AWS)
- 🐳 Containerized dengan Docker & ECS
- 🔄 Automated CI/CD dengan GitHub Actions

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React.js)             │
│      http://localhost:5173              │
└──────────────┬──────────────────────────┘
               │ (HTTP/REST)
┌──────────────▼──────────────────────────┐
│        Backend (Node.js/Express)        │
│      http://localhost:5000              │
├──────────────┬───────┬──────────────────┤
│              │       │                  │
├──────────────▼──┐  ┌─▼──────────────────┤
│   Amazon RDS    │  │  Amazon S3 + CDN   │
│     (MySQL)     │  │   (CloudFront)     │
└─────────────────┘  └────────────────────┘
```

---

## 🚀 Quick Start

### Opsi 1: Local Development (Recommended)

#### Prerequisites
- Node.js v18+ 
- npm v8+

#### Setup (5 menit)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Server: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

**Expected Result:**
- Backend running: ✅
- Frontend running: ✅
- Backend Status pada UI: 🟢 Connected

---

### Opsi 2: Docker Compose (All-in-one)

```bash
# Pastikan Docker sudah install

docker-compose up -d

# Tunggu semua service siap (~30 detik)
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# Database: localhost:3306

# Stop
docker-compose down
```

---

## 📂 Project Structure

```
sigap/
├── backend/
│   ├── config/              # Database & AWS config
│   ├── controllers/         # API logic
│   ├── models/              # Sequelize models
│   ├── routes/              # API routes
│   ├── middleware/          # Multer, etc
│   ├── helpers/             # S3, CloudFront helpers
│   ├── .env                 # Environment variables
│   ├── .env.example         # Template
│   ├── Dockerfile           # Container image
│   ├── server.js            # Main app
│   ├── package.json         # Dependencies
│   └── README.md            # Backend docs
│
├── frontend/
│   ├── src/
│   │   ├── services/        # API client
│   │   ├── App.jsx          # Main component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Frontend env
│   ├── .env.example         # Template
│   ├── Dockerfile           # Container image
│   ├── vite.config.js       # Vite config
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend docs
│
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline
│
├── docker-compose.yml       # Local docker setup
├── LOCAL_SETUP_GUIDE.md     # Detailed setup guide
└── README.md               # This file
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reports` | Create new report |
| GET | `/reports` | Get all reports |
| GET | `/reports/:id` | Get single report |
| GET | `/reports/status/:status` | Filter by status |
| PATCH | `/reports/:id/status` | Update status |

### Example: Create Report
```bash
curl -X POST http://localhost:5000/api/reports \
  -F "pelapor_nama=Budi Santoso" \
  -F "jenis_gangguan=Jalan Rusak" \
  -F "lokasi=Jl. Sudirman, Jakarta" \
  -F "image=@photo.jpg"
```

---

## 🔧 Environment Setup

### Backend `.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=sigap_db
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET_NAME=sigap-storage
CLOUDFRONT_URL=https://d12345.cloudfront.net
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🐳 Docker Deployment

### Build Images
```bash
# Backend
docker build -t sigap-backend:latest ./backend

# Frontend  
docker build -t sigap-frontend:latest ./frontend
```

### Run Containers
```bash
# Backend
docker run -p 5000:5000 \
  -e DB_HOST=localhost \
  -e NODE_ENV=development \
  sigap-backend:latest

# Frontend
docker run -p 5173:5173 \
  -e VITE_API_BASE_URL=http://localhost:5000/api \
  sigap-frontend:latest
```

---

## 🔄 CI/CD Pipeline

**GitHub Actions workflow:** `.github/workflows/deploy.yml`

**Triggers on:**
- Push ke `main` branch
- Push ke `develop` branch

**Steps:**
1. ✅ Build backend Docker image
2. ✅ Build frontend Docker image
3. ✅ Push ke Amazon ECR
4. ✅ Update ECS service
5. ✅ Deploy application

**Setup:**
1. Add GitHub Secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
2. Push to GitHub
3. Actions akan auto-trigger

---

## 📊 Tech Stack

### Backend
- **Runtime:** Node.js 18
- **Framework:** Express.js 4.18
- **Database:** MySQL (Sequelize ORM)
- **Storage:** AWS S3
- **CDN:** AWS CloudFront
- **Containerization:** Docker

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Package Manager:** npm

### DevOps
- **Containerization:** Docker + Docker Compose
- **Orchestration:** AWS ECS/Fargate
- **Registry:** AWS ECR
- **CI/CD:** GitHub Actions
- **VCS:** GitHub

---

## ❌ Troubleshooting

### Backend Connection Error
```
Backend Status: 🔴 Disconnected
```
**Solution:**
- Pastikan backend running: `npm run dev`
- Check di http://localhost:5000/health
- Verify port 5000 tidak digunakan app lain

### Database Connection Error
```
❌ Unable to connect to the database
```
**Solution:**
- Setup MySQL lokal atau gunakan docker-compose
- Verify DB credentials di `.env`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify `CORS_ORIGIN` di backend `.env` include frontend URL
- Default: `http://localhost:5173`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

## 📚 Documentation

- **[LOCAL_SETUP_GUIDE.md](./LOCAL_SETUP_GUIDE.md)** - Detailed local setup
- **[backend/README.md](./backend/README.md)** - Backend documentation
- **[frontend/README.md](./frontend/README.md)** - Frontend documentation
- **[backend/SETUP_GUIDE.md](./backend/SETUP_GUIDE.md)** - Backend deployment guide
- **[backend/CHECKLIST.md](./backend/CHECKLIST.md)** - Completion checklist

---

## 🎯 Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/nama-fitur

# 2. Make changes
# - Edit backend di folder /backend
# - Edit frontend di folder /frontend

# 3. Test locally
npm run dev  # di masing-masing folder

# 4. Commit & push
git add .
git commit -m "feat: deskripsi fitur"
git push origin feature/nama-fitur

# 5. Create Pull Request di GitHub
# 6. After merge ke main → GitHub Actions deploy otomatis
```

---

## 📝 Requirements Fulfilled

✅ **Backend:**
- [x] Node.js + Express.js
- [x] MySQL dengan Sequelize
- [x] File upload ke S3
- [x] CloudFront integration
- [x] CRUD endpoints
- [x] Docker ready
- [x] CI/CD configured

✅ **Frontend:**
- [x] React.js dengan Vite
- [x] Tailwind CSS
- [x] API integration
- [x] Backend status check
- [x] Reports display
- [x] Docker ready

✅ **DevOps:**
- [x] Docker containers
- [x] GitHub Actions CI/CD
- [x] AWS ECR/ECS ready
- [x] Environment configuration
- [x] Local development setup

---

## 🚢 Ready for Deployment

- [x] Backend & Frontend local testing
- [x] Docker images created
- [x] CI/CD pipeline ready
- [x] AWS architecture documented
- [x] Environment variables configured

**Next steps:**
1. Push to GitHub
2. Setup AWS resources (RDS, S3, CloudFront, ECR, ECS)
3. Add GitHub Secrets
4. Deploy!

---

## 📞 Support & References

| Referensi | Link |
|-----------|------|
| Tailwind CSS | https://tailwindcss.com |
| React Docs | https://react.dev |
| Express.js | https://expressjs.com |
| AWS Documentation | https://docs.aws.amazon.com |
| Docker | https://docker.com |
| Vite | https://vitejs.dev |

---

## 📄 License

MIT License - Cloud Computing Assignment 2

---

**Status:** ✅ Ready for Local Testing & Deployment

**Last Updated:** May 5, 2026

---

💡 **Pro Tips:**
- Buka 2 terminal untuk backend & frontend secara bersamaan
- Use `npm run dev` untuk development dengan auto-reload
- Check console browser (F12) untuk debug API calls
- Gunakan docker-compose untuk setup yang lebih mudah

Selamat mengembangkan SIGAP! 🚀
