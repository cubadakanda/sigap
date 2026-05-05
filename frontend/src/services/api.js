import axios from 'axios';

// API base URL - dapat diubah di environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor untuk error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Get all reports
 */
export const getReports = async () => {
  try {
    const response = await apiClient.get('/reports');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single report by ID
 */
export const getReportById = async (id) => {
  try {
    const response = await apiClient.get(`/reports/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new report with file upload
 */
export const createReport = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/reports`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

/**
 * Get reports by status
 */
export const getReportsByStatus = async (status) => {
  try {
    const response = await apiClient.get(`/reports/status/${status}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update report status (for officers)
 */
export const updateReportStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/reports/${id}/status`, {
      status,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Check backend health
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/health`, {
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Backend health check failed:', error.message);
    throw error;
  }
};

export default apiClient;
