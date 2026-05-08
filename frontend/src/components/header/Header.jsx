/**
 * Header Component
 *
 * A responsive header component that provides navigation and user authentication functionality.
 * Features:
 * - Responsive navigation menu with mobile support
 * - User authentication status display
 * - Dynamic navigation based on authentication state
 * - Session-based authentication check
 * - Logout functionality
 */

import { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import classes from "./header.module.css";

/**
 * Navigation links configuration
 * Defines the main navigation routes and their labels
 */
const navLinks = [
  {
    path: "/home",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
];

/**
 * Header Component
 * @returns {JSX.Element} Rendered header with navigation
 */
export default function Header() {
  // Navigation and routing hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [user, setUser] = useState(null); // Stores authenticated user data
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile menu visibility

  /**
   * Checks user authentication status
   * Makes an API call to verify if user is logged in
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check");

        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  /**
   * Handles user logout
   * - Makes API call to destroy session
   * - Clears user state
   * - Redirects to login page
   * - Closes mobile menu
   */
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      setUser(null);
      navigate("/login");
      closeMenu(); // Close menu after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Toggles mobile menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Closes the mobile navigation menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Don't show navigation on login and register pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Render simplified header for auth pages
  if (isAuthPage) {
    return (
      <header className={classes.header}>
        <div className={classes.logo}>
          <h1>TechStock</h1>
        </div>
      </header>
    );
  }

  // Main header render with navigation
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to={'/home'}><h1>TechStock</h1></NavLink>
      </div>

      {/* Mobile menu toggle button */}
      <button
        className={classes.mobileMenuButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation menu */}
      <nav className={`${classes.nav} ${menuOpen ? classes.open : ""}`}>
        <ul className={classes.navList}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? classes.active : "")}
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User authentication section */}
        {user && (
          <div className={classes.userInfo}>
            <button onClick={handleLogout} className={classes.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
