import classes from "./footer.module.css";

/**
 * Footer component for TechStock project
 * @returns {JSX.Element} Footer with copyright and links
 */
export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.copyright}>
          <p>
            <span>&copy;</span> {date} TechStock - Inventory Management System
          </p>
        </div>
        <div className={classes.developer}>
          <p>Developed with ❤️ by BK  </p>
        </div>
      </div>
    </footer>
  );
}
