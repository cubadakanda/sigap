require('dotenv').config();

/**
 * Convert S3 URL to CloudFront URL
 * Example: https://sigap-storage.s3.amazonaws.com/file.jpg 
 *         → https://d12345.cloudfront.net/file.jpg
 */
const convertS3ToCloudFront = (s3Url) => {
  if (!s3Url) return null;

  const cloudFrontUrl = process.env.CLOUDFRONT_URL;
  
  // Extract the object key from S3 URL
  // S3 URL format: https://bucket.s3.amazonaws.com/key or https://s3.amazonaws.com/bucket/key
  let objectKey = '';

  if (s3Url.includes('.s3.amazonaws.com')) {
    // Format: https://bucket.s3.amazonaws.com/key
    objectKey = s3Url.split('.s3.amazonaws.com/')[1];
  } else if (s3Url.includes('s3.amazonaws.com')) {
    // Format: https://s3.amazonaws.com/bucket/key
    const parts = s3Url.split('s3.amazonaws.com/')[1].split('/');
    objectKey = parts.slice(1).join('/');
  }

  if (!objectKey || !cloudFrontUrl) {
    return s3Url; // Return original if conversion fails
  }

  return `${cloudFrontUrl}/${objectKey}`;
};

/**
 * Transform report object to use CloudFront URLs
 */
const transformReportUrls = (report) => {
  if (!report) return null;

  const reportData = report.toJSON ? report.toJSON() : report;

  if (reportData.image_url) {
    reportData.image_url = convertS3ToCloudFront(reportData.image_url);
  }

  return reportData;
};

/**
 * Transform array of reports to use CloudFront URLs
 */
const transformReportsUrls = (reports) => {
  return reports.map((report) => transformReportUrls(report));
};

module.exports = {
  convertS3ToCloudFront,
  transformReportUrls,
  transformReportsUrls,
};
