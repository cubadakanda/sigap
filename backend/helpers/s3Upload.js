const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/aws');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs'); // WAJIB TAMBAHKAN INI untuk membaca file dari hardisk
require('dotenv').config();

/**
 * Upload file to AWS S3
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - S3 URL of uploaded file
 */
const uploadFileToS3 = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Generate unique filename
    const timestamp = Date.now();
    const uuid = uuidv4();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `laporan/${timestamp}-${uuid}.${fileExtension}`;

    // KUNCI PERBAIKAN 1: Baca file dari lokasi hardisk (file.path), bukan dari RAM (file.buffer)
    const fileStream = fs.createReadStream(file.path);

    // Upload to S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: fileStream, // Menggunakan fileStream
      ContentType: file.mimetype,
      // KUNCI PERBAIKAN 2: Baris ACL ini WAJIB DIHAPUS/DICOMMENT agar tidak diblokir oleh sistem keamanan S3
      // ACL: 'public-read', 
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Return S3 URL
    const s3Url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    console.log(`✅ File uploaded to S3: ${s3Url}`);

    return s3Url;
  } catch (error) {
    console.error('❌ Error uploading file to S3:', error);
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
};

module.exports = {
  uploadFileToS3,
};