import React from "react";
import styles from "../styles/JobAlertModal.module.css";

export default function JobAlertModal({
  isOpen,
  onClose,
  isUpdate,
  isDirty,
  saving,
  onSubmit,
  alertType, // 👈 new prop
  children,
}) {
  if (!isOpen) return null;
 
  const disableSubmit = saving || (isUpdate && !isDirty);

  const typeLabel = alertType === "government" ? "Government" : "IT";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h2>
            {isUpdate
              ? isDirty
                ? `Update Job Alert`
                : `Job Alert`
              : `Create Job Alert`}
          </h2>
        </div>

        <div className={styles.divider} />

        {/* BODY */}
        <div className={styles.body}>{children}</div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={onSubmit}
            disabled={disableSubmit}
          >
            {saving
              ? "Saving..."
              : isUpdate
              ? "Update Alert"
              : "Save Alert"}
          </button>
        </div>
      </div>
    </div>
  );
}