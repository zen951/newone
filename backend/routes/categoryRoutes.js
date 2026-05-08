/**
 * Category Routes Module
 *
 * This module handles operations related to categories
 * Base Route: /api/categories/
 */

const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

// Get database connection once for all routes
const connection = dbSingleton.getConnection();

/**
 * Get all categories for product form dropdown
 * @route GET /
 * @returns {Object[]} Array of categories
 * @returns {number} 200 - Success response with categories array
 * @returns {number} 500 - Server error if database query fails
 */
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Category ORDER BY name", (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res
        .status(500)
        .json({ error: "Database error while fetching categories" });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
