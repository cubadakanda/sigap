const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize connection to Amazon RDS or local MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+07:00', // Jakarta timezone
    retry: {
      max: 3,
      timeout: 5000,
    },
  }
);

// Test connection (non-blocking)
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
  })
  .catch((err) => {
    console.warn('⚠️  Database connection failed:');
    console.warn('   Error:', err.message);
    console.warn('   Host:', process.env.DB_HOST);
    console.warn('   Port:', process.env.DB_PORT || 3306);
    console.warn('\n💡 Quick fixes:');
    console.warn('   Option 1: Install MySQL locally');
    console.warn('   Option 2: Use Docker: docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:8.0');
    console.warn('   Option 3: Update DB credentials in .env');
  });

module.exports = sequelize;
