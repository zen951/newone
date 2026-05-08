/**
 * Authentication Routes Module
 *
 * This module defines the authentication-related API endpoints for the application.
 * It handles user session management, authentication status checks, and logout functionality.
 *
 * Base Route: /api/auth/
 *
 */

const express = require("express");
const router = express.Router();

/**
 * Authentication Status Check Endpoint
 *
 * @route GET /check
 * @returns {Object} JSON response containing:
 *   - isAuthenticated: {boolean} - Whether the user is logged in
 *   - user: {Object} - User information if authenticated (only included if logged in)
 */
router.get("/check", (req, res) => {
  if (req.session.user) {
    return res.json({ isAuthenticated: true, user: req.session.user });
  }
  res.json({ isAuthenticated: false });
});

/**
 * User Logout Endpoint
 * Destroys the session and logs the user out

 * @route POST /logout
 * @returns {Object} JSON response containing:
 *   - message: {string} - Success message if logout successful
 *   - error: {string} - Error message if logout fails
 * @throws {Error} 500 if session destruction fails
 */
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router; // Export the router for use in app.js
