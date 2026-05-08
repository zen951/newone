/**
 * Password hashing utility module using bcrypt
 * This module provides functions for securely hashing passwords and comparing them
 */

const bcrypt = require("bcrypt");

// Number of salt rounds for bcrypt
const SALT_ROUNDS = 10; // 10 is a good balance between security and performance

/**
 * Hash a password using bcrypt
 * This function takes a plain text password and returns a secure hash
 * The hash includes the salt and can be safely stored in a database
 *
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 * @throws {Error} If hashing fails
 */
const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

/**
 * Compare a password with a hash
 * This function securely compares a plain text password against a stored hash
 *
 * @param {string} password - The plain text password to check
 * @param {string} hash - The hashed password to compare against
 * @returns {Promise<boolean>} - True if the password matches, false otherwise
 * @throws {Error} If comparison fails
 */
const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
