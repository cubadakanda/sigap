const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`✅ Created uploads directory: ${uploadsDir}`);
}

/**
 * Process file uploaded by multer (already saved to disk)
 * @param {Object} file - Multer file object (from diskStorage)
 * @returns {Promise<string>} - Local file URL
 */
const uploadFileLocally = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // File already saved by multer diskStorage, just return URL
    const fileUrl = `/uploads/${file.filename}`;
    console.log(`✅ File uploaded successfully: ${fileUrl}`);

    return fileUrl;
  } catch (error) {
    console.error('❌ Error processing file:', error);
    throw new Error(`Failed to process file: ${error.message}`);
  }
};

module.exports = {
  uploadFileLocally,
};
