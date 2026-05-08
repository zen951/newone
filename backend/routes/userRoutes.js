/**
 *  User Routes Module
 * This module contains all routes related to user including:
 * - User login
 * - User registration
 * Base Route: /api/users/
 */

const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const { hashPassword, comparePassword } = require("../auth/hashPassword");

// Get database connection once for all routes
const connection = dbSingleton.getConnection();

/**
 * Authenticates a user by checking credentials against the database
 * @route POST /login

 * @param {Object} req - Request object with User's email address and password
 * @returns {Object} JSON response with user data and session info
 * @throws {400} If email or password is missing
 * @throws {404} If email is not found
 * @throws {401} If password is incorrect
 * @throws {500} If database error occurs
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // First check if email exists
  const query = "SELECT * FROM Users WHERE email = ?";

  connection.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error during login" });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error:
          "Email not found. Please check your email or register a new account.",
      });
    }

    const user = results[0];

    try {
      // Compare password with stored hash
      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Incorrect password. Please try again." });
      }

      // Store user info in session
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        isManager: user.is_manager,
      };

      res.status(200).json({
        message: "Login successful",
        user: req.session.user,
        sessionId: req.sessionID,
      });
    } catch (error) {
      console.error("Password comparison error:", error);
      res.status(500).json({ error: "Error during login" });
    }
  });
});

/**
* Registers a new user in the system
* @route POST /register

 * @param {Object} req - Request object with User's:
                          - email address full name
                          - password (will be hashed)
                          - hone number (optional)
                          - city (optional)
                          
 * @returns {Object} JSON response with success message and user ID
 * @throws {400} If required fields are missing
 * @throws {409} If email is already registered
 * @throws {500} If database error occurs
 */
router.post("/register", async (req, res) => {
  const { email, name, password, phone, city } = req.body;

  // Validate input
  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ error: "Email, name, and password are required" });
  }

  // Check if user already exists
  connection.query(
    "SELECT 1 FROM Users WHERE email = ? LIMIT 1",
    [email],
    async (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error during registration" });
      }

      if (results.length > 0) {
        return res.status(409).json({
          error:
            "This email is already registered. Please use a different email.",
        });
      }

      try {
        // Hash password before storing
        const hashedPassword = await hashPassword(password);

        // Insert new user with hashed password
        const insertQuery =
          "INSERT INTO Users (email, name, password, phone, city) VALUES (?, ?, ?, ?, ?)";

        connection.query(
          insertQuery,
          [email, name, hashedPassword, phone, city],
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Error creating user" });
            }

            res.status(201).json({
              message: "User registered successfully",
              userId: result.insertId,
            });
          }
        );
      } catch (error) {
        console.error("Password hashing error:", error);
        res.status(500).json({ error: "Error during registration" });
      }
    }
  );
});

module.exports = router;
