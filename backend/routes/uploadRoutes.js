/**
 * Upload Routes Module
 * This module handles file upload functionality using multer middleware
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

/**
 * Multer Storage Configuration
 * Configures where and how uploaded files should be stored
 * - destination: Specifies the upload directory (../uploads)
 * - filename: Generates unique filenames using timestamp + original extension
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, "../uploads");
    cb(null, uploadsDir); // Use absolute path Folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  },
});

/**
 * File Type Validation Middleware
 * Ensures only specific image types are allowed for upload
 *
 * @param {Object} req - Express request object
 * @param {Object} file - The uploaded file object containing metadata
 * @param {Function} cb - Callback function to handle validation result
 *
 * @throws {Error} If file type is not allowed
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

/**
 * Upload Single Image Endpoint
 * Handles POST requests for single image uploads
 *
 * @route POST /api/upload
 * @param {Object} req - Request object containing the image file
 * @param {Object} res - Response object
 *
 * @returns {Object} JSON response containing:
 *   - Success (200): { imageUrl: string } - URL of uploaded image
 *   - Error (400): { message: string } - If no file provided
 *   - Error (500): { error: string } - If server error occurs
 *
 * @throws {Error} If file upload fails
 */
router.post("/", upload.single("image"), (req, res) => {
  try {
    // Check if the file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required!" });
    }
    // Return the file path relative to the public directory
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

module.exports = router;
