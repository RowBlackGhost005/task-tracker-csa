import React from 'react';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.confirmOverlay}>
      <div className={styles.confirmDialog}>
        <p>{message}</p>
        <div className={styles.confirmButtons}>
          <button onClick={onConfirm} className={styles.confirmYes}>Yes</button>
          <button onClick={onCancel} className={styles.confirmNo}>Cancel</button>
        </div>
      </div>
    </div>
  );
}