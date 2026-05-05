const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database & models
const sequelize = require('./config/database');
const Report = require('./models/Report');

// Import routes
const reportRoutes = require('./routes/reportRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ===========================
// Middleware
// ===========================

// CORS Configuration
const corsOptions = {
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===========================
// Routes
// ===========================

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SIGAP Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/reports', reportRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size exceeds 10MB limit',
    });
  }

  // Multer file type error
  if (err.message.includes('Only image files are allowed')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ===========================
// Database Sync & Server Start
// ===========================

const startServer = async () => {
  try {
    // Try to sync database (create tables if not exist)
    try {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synchronized successfully');
    } catch (dbError) {
      console.warn('⚠️  Database connection failed, continuing without database...');
      console.warn('   Error:', dbError.message);
      console.warn('   💡 Solution: Run MySQL or use Docker: docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:8.0');
    }

    // Start server (with or without database)
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   SIGAP Backend Server Started        ║
╠════════════════════════════════════════╣
║ 🚀 Server: http://localhost:${PORT}        ║
║ 📊 Database: ${process.env.DB_NAME || 'sigap_db'}                ║
║ 🌍 Environment: ${process.env.NODE_ENV || 'development'}       ║
║                                        ║
║ 📝 API Endpoints:                     ║
║  • GET  /health                       ║
║  • GET  /api/reports                  ║
║  • POST /api/reports (with file)      ║
║  • PATCH /api/reports/:id/status      ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
