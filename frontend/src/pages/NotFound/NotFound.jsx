import classes from "./notfound.module.css";
import { Link } from "react-router-dom";

/**
 * 404 Not Found page component
 * Displays when a route doesn't match any defined routes
 * Provides a link back to the login page
 *
 * @returns {JSX.Element} A 404 error page with navigation link
 */
export default function NotFound() {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>404</h1>
      <p className={classes.subtitle}>
        Oops! The page you're looking for has gone missing in cyberspace.
      </p>
      <Link to="/">Back to Safety</Link>
    </div>
  );
}
