const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Report model
const Report = sequelize.define(
  'Report',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pelapor_nama: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    jenis_gangguan: {
      type: DataTypes.ENUM('Jalan Rusak', 'Kemacetan', 'Kecelakaan', 'Lainnya'),
      allowNull: false,
      defaultValue: 'Lainnya',
    },
    lokasi: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      comment: 'S3 URL akan dikonversi ke CloudFront saat response',
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Diproses', 'Selesai'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: 'reports',
    timestamps: true,
    underscored: true, // Use snake_case for columns
  }
);

module.exports = Report;
