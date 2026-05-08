// React Router imports for handling navigation and routing
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// Import CSS module for styling
import classes from "./app.module.css";

// Import page components
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import NotFound from "../pages/NotFound/NotFound";
// Import layout component for protected routes
import ProtectedLayout from "../components/ProtectedLayout/ProtectedLayout";

/**
 * Main App component that handles routing and authentication
 *
 * This component sets up the application's routing structure with:
 * - Public routes (login, register)
 * - Protected routes (home, products) wrapped in ProtectedLayout
 * - A catch-all route for 404 pages
 *
 * @returns {JSX.Element} The main application component with routing configuration
 */
function App() {
  return (
    <Router>
      <div className={classes.app}>
        <Routes>
          {/* Public routes - accessible without authentication */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes - require authentication */}
          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Route>

          {/* 404 route - handles undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
