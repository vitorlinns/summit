import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'solid';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'outline', 
  className = '',
  type = 'button',
  style
}: ButtonProps) {
  return (
    <button 
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`} 
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
