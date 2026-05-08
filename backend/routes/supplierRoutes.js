/**
 * Supplier Routes Module
 *
 * This module handles operations related to suppliers
 * Base Route: /api/suppliers/
 */

const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

// Get database connection once for all routes
const connection = dbSingleton.getConnection();

/**
 * Get all suppliers for product form dropdown
 * @route GET /
 * @returns {Object[]} Array of suppliers
 * @returns {number} 200 - Success response with suppliers array
 * @returns {number} 500 - Server error if database query fails
 */
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Suppliers ORDER BY name", (err, results) => {
    if (err) {
      console.error("Error fetching suppliers:", err);
      return res
        .status(500)
        .json({ error: "Database error while fetching suppliers" });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
