/**
 * Product Routes Module
 *
 * This module handles all CRUD (Create, Read, Update, Delete) operations for products
 * Base Route: /api/products/
 *
 */

const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

// Get database connection once for all routes
const connection = dbSingleton.getConnection();

/**
 * Get all products with category and supplier information
 * @route GET /
 * @returns {Object[]} Array of products with category and supplier details
 * @returns {number} 200 - Success response with products array
 * @returns {number} 500 - Server error if database query fails
 */
router.get("/", (req, res) => {
  const query = `
    SELECT p.*, c.name as category_name, s.name as supplier_name 
    FROM Products p
    JOIN Category c ON p.category_id = c.id
    JOIN Suppliers s ON p.supplier_id = s.id
    ORDER BY p.unit_in_stock ASC  
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res
        .status(500)
        .json({ error: "Database error while fetching products" });
    }

    res.status(200).json(results);
  });
});

/**
 * Adds and Create a new product in the database
 * @route POST /
 * @param {Object} req - Request object with product details
 * @returns {Object} 201 - Success response with product ID
 * @returns {number} 400 - Bad request if required fields are missing
 * @returns {number} 500 - Server error if database operation fails
 */
router.post("/", (req, res) => {
  const {
    name,
    image,
    description,
    price,
    unit_in_stock,
    supplier_id,
    category_id,
  } = req.body;

  // Validate required fields (For Postman testing)
  if (!name || !price || !supplier_id || !category_id) {
    return res.status(400).json({
      error:
        "Missing required fields: name, price, supplier_id, and category_id are required",
    });
  }

  // Insert new product query
  const query = `
    INSERT INTO Products (name, image, description, price, unit_in_stock, supplier_id, category_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      name,
      image,
      description,
      price,
      unit_in_stock || 0,
      supplier_id,
      category_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding product:", err);
        return res
          .status(500)
          .json({ error: "Database error while adding product" });
      }

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId,
      });
    }
  );
});

/**
 * Existing prod
 * @route PUT /:id
 * @param {string} req.params.id - Product ID to update
 * @param {Object} req.body - Updated product details
 * @returns {Object} 200 - Success response
 * @returns {number} 400 - Bad request if required fields are missing
 * @returns {number} 500 - Server error if database operation fails
 */
router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const {
    name,
    image,
    description,
    price,
    unit_in_stock,
    supplier_id,
    category_id,
  } = req.body;

  // Validate required fields (For Postman testing)
  if (!name || !price || !supplier_id || !category_id) {
    return res.status(400).json({
      error:
        "Missing required fields: name, price, supplier_id, and category_id are required",
    });
  }

  // Update product
  const query = `
    UPDATE Products 
    SET name = ?, image = ?, description = ?, price = ?, unit_in_stock = ?, supplier_id = ?, category_id = ?
    WHERE id = ?
  `;

  connection.query(
    query,
    [
      name,
      image,
      description,
      price,
      unit_in_stock,
      supplier_id,
      category_id,
      productId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        return res
          .status(500)
          .json({ error: "Database error while updating product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    }
  );
});

/**
 * Delete a product by ID
 * @route DELETE /:id
 * @param {string} req.params.id - Product ID to delete
 * @returns {Object} 200 - Success response
 * @returns {number} 404 - Not found if product doesn't exist
 * @returns {number} 500 - Server error if database operation fails
 */
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  // Delete product
  connection.query(
    "DELETE FROM Products WHERE id = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res
          .status(500)
          .json({ error: "Database error while deleting product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
});

module.exports = router;
