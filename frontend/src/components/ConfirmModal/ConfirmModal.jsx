import classes from "./confirmModal.module.css";

/**
 * ConfirmModal component - Modal for confirmation dialogs
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onConfirm - Function to call when confirmed
 * @param {string} props.title - Modal title
 * @param {string} props.message - Modal message
 * @returns {JSX.Element} Confirmation modal
 */
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={handleOverlayClick}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose}>
          ×
        </button>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={classes.actions}>
          <button className={classes.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={classes.confirmButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
