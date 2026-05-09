const express = require('express');
const upload = require('../middleware/upload');
const reportController = require('../controllers/reportController');

const router = express.Router();

/**
 * POST /api/reports
 * Create new report with file upload
 */
router.post('/', upload.single('image'), reportController.createReport);

/**
 * GET /api/reports
 * Get all reports
 */
router.get('/', reportController.getAllReports);

/**
 * GET /api/reports/:id
 * Get single report by ID
 */
router.get('/:id', reportController.getReportById);

/**
 * GET /api/reports/status/:status
 * Get reports by status
 */
router.get('/status/:status', reportController.getReportsByStatus);

/**
 * PATCH /api/reports/:id/status
 * Update report status (for officers)
 */
router.patch('/:id/status', reportController.updateReportStatus);

router.delete('/:id', reportController.deleteReport);

module.exports = router;
