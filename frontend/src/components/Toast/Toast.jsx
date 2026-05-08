/**
 * Toast Component
 * A reusable notification component that displays temporary messages to users.
 * Automatically disappears after 3 seconds.
 *
 * @param {string} message - The text message to display in the toast
 * @param {string} type - The type of toast (defaults to "success"). Affects styling.
 * @param {function} onClose - Callback function to be called when the toast closes
 */
import { useEffect } from "react";
import classes from "./toast.module.css";

export default function Toast({ message, type = "success", onClose }) {
  // Set up auto-close timer when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.(); // Call onClose callback if provided
    }, 3000); // Auto-close after 3 seconds

    // Cleanup: clear the timer when component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  // Render toast with dynamic styling based on type
  return (
    <div className={`${classes.toast} ${classes[type]}`}>
      <div className={classes.message}>{message}</div>
    </div>
  );
}
