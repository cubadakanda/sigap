const Report = require('../models/Report');
const { uploadFileLocally } = require('../helpers/localUpload');

/**
 * POST /api/reports
 * Create new report with file upload to S3
 */
exports.createReport = async (req, res) => {
  try {
    const { pelapor_nama, jenis_gangguan, lokasi, deskripsi } = req.body;

    // Validate required fields
    if (!pelapor_nama || !jenis_gangguan || !lokasi) {
      return res.status(400).json({
        success: false,
        message: 'pelapor_nama, jenis_gangguan, and lokasi are required',
      });
    }

    let imageUrl = null;

    // Upload file locally if exists
    if (req.file) {
      try {
        imageUrl = await uploadFileLocally(req.file);
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: 'Failed to upload file',
          error: uploadError.message,
        });
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
 * Get all reports with CloudFront URLs
 */
exports.getAllReports = async (req, res) => {
  try {
    // Check if database is available
    if (!Report.sequelize || !Report.sequelize.authenticate) {
      return res.status(503).json({
        success: false,
        message: 'Database is not available',
        data: [], // Return empty array for frontend
        note: 'Backend is running but database connection failed. Check server logs.',
      });
    }

    const reports = await Report.findAll({
      order: [['created_at', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'Reports retrieved successfully',
      data: reports,
      total: reports.length,
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

    res.status(200).json({
      success: true,
      message: 'Report retrieved successfully',
      data: report.toJSON(),
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

    res.status(200).json({
      success: true,
      message: `Reports with status '${status}' retrieved successfully`,
      data: reports,
      total: reports.length,
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
