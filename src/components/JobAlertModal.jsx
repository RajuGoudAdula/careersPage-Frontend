import React from "react";
import styles from "../styles/JobAlertModal.module.css";

export default function JobAlertModal({ isOpen, onClose, children, onSubmit }) {
  if (!isOpen) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <h2>Create Job Alert</h2>
        </div>

        <div className={styles.divider}></div>

        {/* Body */}
        <div className={styles.body}>
          {children}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
          <button className={styles.submitBtn} onClick={onSubmit}>
            Save Alert
          </button>
        </div>

      </div>
    </div>
  );
}
