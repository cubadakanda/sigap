const Report = require('../models/Report');
const { uploadFileLocally } = require('../helpers/localUpload');
const { uploadFileToS3 } = require('../helpers/s3Upload');
const { convertS3ToCloudFront } = require('../helpers/cloudfront');

/**
 * POST /api/reports
 * Create new report with file upload (S3 for production, local for dev)
 */
exports.createReport = async (req, res) => {
  try {
    const { pelapor_nama, jenis_gangguan, lokasi, deskripsi, latitude, longitude } = req.body;

    // Validate required fields
    if (!pelapor_nama || !jenis_gangguan || !lokasi) {
      return res.status(400).json({
        success: false,
        message: 'pelapor_nama, jenis_gangguan, and lokasi are required',
      });
    }

    let imageUrl = null;
    let uploadedVia = 'none';

    // Upload file if provided
    if (req.file) {
      try {
        // Use S3 in production, local storage in development
        if (process.env.NODE_ENV === 'production' && process.env.S3_BUCKET_NAME) {
          imageUrl = await uploadFileToS3(req.file);
          // Transform S3 URL to CloudFront URL
          if (process.env.CLOUDFRONT_URL) {
            imageUrl = convertS3ToCloudFront(imageUrl);
          }
          uploadedVia = 'S3 + CloudFront';
        } else {
          imageUrl = await uploadFileLocally(req.file);
          uploadedVia = 'Local Storage';
        }
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        // Don't fail report creation if upload fails
        console.warn('⚠️ File upload failed, continuing without image');
      }
    }

    // Create report in database
    const report = await Report.create({
      pelapor_nama,
      jenis_gangguan,
      lokasi,
      deskripsi,
      image_url: imageUrl,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: report.toJSON(),
      uploadedVia,
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating report',
      error: error.message,
    });
  }
};

/**
 * GET /api/reports
 * Get all reports with proper URLs
 */
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      order: [['created_at', 'DESC']],
    });

    // Transform S3 URLs to CloudFront if in production
    let transformedReports = reports.map(report => {
      const reportData = report.toJSON();
      if (reportData.image_url && process.env.NODE_ENV === 'production' && process.env.CLOUDFRONT_URL) {
        reportData.image_url = convertS3ToCloudFront(reportData.image_url);
      }
      return reportData;
    });

    res.status(200).json({
      success: true,
      message: 'Reports retrieved successfully',
      data: transformedReports,
      total: transformedReports.length,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      data: [],
      error: error.message,
    });
  }
};

/**
 * GET /api/reports/:id
 * Get single report by ID
 */
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    // Transform S3 URL to CloudFront
    const reportData = report.toJSON();
    if (reportData.image_url && process.env.NODE_ENV === 'production' && process.env.CLOUDFRONT_URL) {
      reportData.image_url = convertS3ToCloudFront(reportData.image_url);
    }

    res.status(200).json({
      success: true,
      message: 'Report retrieved successfully',
      data: reportData,
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching report',
      error: error.message,
    });
  }
};

/**
 * PATCH /api/reports/:id/status
 * Update report status (for officers/petugas)
 */
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Diproses', 'Selesai'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    // Find and update report
    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    await report.update({ status });

    res.status(200).json({
      success: true,
      message: 'Report status updated successfully',
      data: report.toJSON(),
    });
  } catch (error) {
    console.error('Error updating report status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating report status',
      error: error.message,
    });
  }
};

/**
 * GET /api/reports/status/:status
 * Get reports filtered by status
 */
exports.getReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    // Validate status
    const validStatuses = ['Pending', 'Diproses', 'Selesai'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const reports = await Report.findAll({
      where: { status },
      order: [['created_at', 'DESC']],
    });

    // Transform S3 URLs to CloudFront
    let transformedReports = reports.map(report => {
      const reportData = report.toJSON();
      if (reportData.image_url && process.env.NODE_ENV === 'production' && process.env.CLOUDFRONT_URL) {
        reportData.image_url = convertS3ToCloudFront(reportData.image_url);
      }
      return reportData;
    });

    res.status(200).json({
      success: true,
      message: `Reports with status '${status}' retrieved successfully`,
      data: transformedReports,
      total: transformedReports.length,
    });
  } catch (error) {
    console.error('Error fetching reports by status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message,
    });
  }
};
