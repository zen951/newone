/**
 * Home page component - Displays project information and developer details
 * @returns {JSX.Element} Home page
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./home.module.css";

export default function Home() {
  const navigate = useNavigate();
  // State to store authenticated user information
  const [user, setUser] = useState(null);

  // Check if user is logged in using session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make API call to check authentication status
        const response = await axios.get("/api/auth/check");

        if (!response.data.isAuthenticated) {
          navigate("/login");
          return;
        }

        // Update user state with authenticated user data
        setUser(response.data.user);
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // Don't render anything until we check authentication
  if (!user) {
    return null;
  }

  return (
    <div className={classes.homeContainer}>
      <main className={classes.mainContent}>
        {/* Welcome Section - Displays greeting and user's name */}
        <section className={classes.welcomeSection}>
          <h1>Welcome to TechStock</h1>
          <h2>Inventory Management System</h2>
          <p>Hello, {user.name}!</p>
        </section>

        {/* About Section - Project description and key features */}
        <section className={classes.aboutSection}>
          <h2>About the Project</h2>
          <p>
            TechStock is a comprehensive inventory management system designed
            for technology retailers and distributors. Our platform helps
            businesses track their inventory, manage suppliers, and organize
            products by categories.
          </p>
          <p>
            With TechStock, you can easily add new products, update existing
            inventory, and keep track of stock levels to ensure you never run
            out of popular items.
          </p>

          {/* Feature Cards - Highlighting key system capabilities */}
          <div className={classes.features}>
            <div className={classes.featureCard}>
              <h3>Product Management</h3>
              <p>
                Add, update, and remove products from your inventory with ease.
              </p>
            </div>

            <div className={classes.featureCard}>
              <h3>Category Organization</h3>
              <p>
                Organize products by categories for better inventory management.
              </p>
            </div>

            <div className={classes.featureCard}>
              <h3>Supplier Tracking</h3>
              <p>Keep track of your suppliers and their contact information.</p>
            </div>
          </div>
        </section>

        {/* Developer Section - Information about the project creators */}
        <section className={classes.developerSection}>
          <h2>About the Developer</h2>
          <div className={classes.developerInfo}>
            <div className={classes.developerCard}>
              <h3>Bshara Karkaby</h3>
              <p>
                Full-stack developer with expertise in React, Node.js, and
                MySQL.
              </p>
              <p>
                Created this inventory management system as a final project.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
