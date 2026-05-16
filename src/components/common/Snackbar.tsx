'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import styles from './Snackbar.module.css';

export type SnackbarType = 'success' | 'error' | 'info';

interface SnackbarProps {
  isVisible: boolean;
  message: string;
  type: SnackbarType;
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({ 
  isVisible, 
  message, 
  type, 
  onClose, 
  duration = 5000 
}: SnackbarProps) {
  
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={styles.snackbarWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30 
            }}
            className={`${styles.snackbar} ${styles[type]}`}
          >
            <div className={styles.icon}>
              {type === 'success' ? (
                <CheckCircle size={20} color="#52c41a" />
              ) : (
                <AlertCircle size={20} color="#ff4d4f" />
              )}
            </div>
            
            <div className={styles.message}>{message}</div>
            
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
              <X size={16} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
