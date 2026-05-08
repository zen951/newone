/**
 * ProtectedLayout component that combines authentication check and layout
 * Checks authentication and renders the layout with header/footer or redirects to login
 *
 * @returns {JSX.Element} Layout with header/footer if authenticated, otherwise redirects to login
 */

import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import classes from "./protectedLayout.module.css";

export default function ProtectedLayout() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to handle loading state during authentication check
  const [loading, setLoading] = useState(true);

  // Effect hook to check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make API request to check authentication status
        const response = await axios.get("/api/auth/check");
        // Update authentication state based on API response
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        // Handle authentication check failure
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        // Set loading to false regardless of success/failure
        setLoading(false);
      }
    };

    // Execute authentication check
    checkAuth();
  }, []); // Empty dependency array means this effect runs once on mount

  // Show nothing while checking authentication status
  if (loading) {
    // You might want to show a loading spinner here
    return null;
  }

  // Redirect to login page if user is logout
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected layout with header, main content, and footer
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.mainContent}>
        {/* Outlet renders the child routes */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
