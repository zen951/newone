import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./authForm.module.css";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

/**
 * AuthForm component - Handles both login and registration functionality
 *
 * @param {string} props.type - Form type ('login' or 'register')
 * @returns {JSX.Element} Authentication form component
 */
export default function AuthForm({ type }) {
  const navigate = useNavigate();

  // State management
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState(""); // Store error messages
  const [formData, setFormData] = useState({
    email: "",
    name: type === "register" ? "" : undefined,
    password: "",
    phone: type === "register" ? "" : undefined,
    city: type === "register" ? "" : undefined,
  });

  // Handles input field changes and updates the form state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear any existing error when user types
  };

  /**
   * Validates form data before submission
   * Checks for:
   * - Valid name format (for registration)
   * - Valid email format
   * - Password requirements (3-8 chars, at least one letter and number)
   *
   * @returns {boolean} True if validation passes, false otherwise
   */
  const validateForm = () => {
    const { email, name, password } = formData;
    // Validate name for registration
    if (
      type === "register" &&
      (!name || name.length < 2 || !/^[A-Za-z\s]+$/.test(name))
    ) {
      setError(
        "🔤 Name must contain at least 2 letters and only alphabetic characters"
      );
      return false;
    }
    // Validate email format
    if (!email || !email.includes("@")) {
      setError("❌📧 Please enter a valid email address");
      return false;
    }
    // Validate password requirements
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(password)) {
      setError(
        "🔐 Password must be 3-8 characters with at least one letter and one number"
      );
      return false;
    }
    return true;
  };

  /**
   * Handles form submission
   * Performs validation, makes API request, and handles response
   * Redirects user on success, displays error on failure
   *
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      // Determine API endpoint based on form type
      const endpoint =
        type === "login" ? "/api/users/login" : "/api/users/register";
      await axios.post(endpoint, formData);
      // Redirect based on form type
      navigate(type === "login" ? "/home" : "/login");
    } catch (err) {
      // Define error messages for different errors
      const errorMessages = {
        login: {
          404: "⚠️ Email not found. Please check your email or register a new account.",
          401: "❌ Incorrect password. Please try again.",
        },
        register: {
          409: "🔒 🚫 This email is already registered. Please use a different email.",
        },
      };
      setError(
        errorMessages[type]?.[err.response?.status] ||
          `${
            type === "login" ? "Connection" : "Registration"
          } error. Please try again later.`
      );
    }
  };

  // Render the form component
  return (
    <div className={classes.authContainer}>
      <div className={classes.authForm}>
        <h2>
          TechStock <br />
          {type === "login" ? "Login" : "Create an Account"}
        </h2>

        {/* Display error message if any */}
        {error && <div className={classes.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name field - only shown for registration */}
          {type === "register" && (
            <div className={classes.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email field - required for both login and registration */}
          <div className={classes.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          {/* Password field with visibility toggle */}
          <div className={classes.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={classes.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete={
                  type === "login" ? "current-password" : "new-password"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={classes.passwordToggle}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>

            {/* Password requirements hint for registration */}
            {type === "register" && (
              <small>3-8 characters, at least one letter and one number</small>
            )}
          </div>

          {/* Optional fields for registration */}
          {type === "register" && (
            <>
              <div className={classes.formGroup}>
                <label htmlFor="phone">Phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={classes.formGroup}>
                <label htmlFor="city">City (optional)</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Submit button */}
          <button type="submit" className={classes.submitButton}>
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>

        {/* Navigation section for switching between login and register */}
        <div className={classes.redirectSection}>
          <p>
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            onClick={() => navigate(type === "login" ? "/register" : "/login")}
            className={classes.redirectButton}
          >
            {type === "login" ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
