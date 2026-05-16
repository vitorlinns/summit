'use client';

import React, { useState, useRef, useEffect } from 'react';
import TransitionLink from '@/components/common/TransitionLink';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';
import Button from '@/components/common/Button';
import Snackbar, { SnackbarType } from '@/components/common/Snackbar';

const USER_TYPES = [
  'Proprietário',
  'Locatário',
  'Consultor / Parceiro',
  'Administrador'
];

export default function LoginPage() {
  const [userType, setUserType] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: '',
    type: 'success' as SnackbarType
  });

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ isVisible: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password || !userType) {
      showSnackbar('Por favor, preencha todos os campos e selecione seu perfil.', 'error');
      return;
    }

    showSnackbar(`Acesso autorizado para ${userType}. Redirecionando...`, 'success');
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Acesse sua conta</h1>
            <p className={styles.subtitle}>Selecione seu perfil e entre no portal exclusivo Summit.</p>
          </div>

          <form className={styles.form} onSubmit={handleLogin} noValidate>
            <div className={styles.formGroup}>
              <label className={styles.label}>Perfil de Acesso</label>
              <div className={styles.customSelect} ref={dropdownRef}>
                <div 
                  className={`${styles.selectTrigger} ${isDropdownOpen ? styles.active : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={userType ? styles.selectedText : styles.placeholder}>
                    {userType || 'Selecione seu perfil'}
                  </span>
                  <ChevronDown className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`} size={18} />
                </div>

                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    {USER_TYPES.map((type) => (
                      <div 
                        key={type} 
                        className={`${styles.option} ${userType === type ? styles.selected : ''}`}
                        onClick={() => {
                          setUserType(type);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>E-mail</label>
              <input 
                type="email" 
                name="email"
                placeholder="exemplo@email.com" 
                className={styles.input}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Senha</label>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                className={styles.input}
                required 
              />
            </div>

            <div className={styles.footerActions}>
              <TransitionLink href="#" className={styles.forgotPass}>Esqueceu a senha?</TransitionLink>
            </div>

            <Button type="submit" variant="solid" className={styles.submitBtn}>
              Entrar na Plataforma
            </Button>
          </form>
        </div>
      </div>

      <div className={styles.rightSection}>
        <TransitionLink href="/" className={styles.brandLink}>
          <img src="/brand/logo.png" alt="Summit" className={styles.logo} style={{ filter: 'brightness(0) invert(1)' }} />
        </TransitionLink>
        <img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury House" 
          className={styles.bgImage}
        />
      </div>

      <Snackbar 
        isVisible={snackbar.isVisible} 
        message={snackbar.message} 
        type={snackbar.type} 
        onClose={closeSnackbar} 
      />
    </main>
  );
}
