import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Toast.module.css";

export default function Toast({ message, type = "default", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration || duration <= 0) return;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => onClose && onClose(), 250);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const toastContent = (
    <div className={styles.container}>
      <div className={`${styles.toast} ${styles[type]} ${visible ? styles.enter : styles.exit}`}>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeBtn} onClick={() => setVisible(false)}>
          ✕
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(toastContent, document.body);
}
