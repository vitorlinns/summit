import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'solid';
  className?: string;
}

export default function Button({ children, onClick, variant = 'outline', className = '' }: ButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}
