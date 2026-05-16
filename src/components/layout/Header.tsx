'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TransitionLink from '@/components/common/TransitionLink';
import { Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fecha o menu ao mudar de rota ou redimensionar
  useEffect(() => {
    setIsMenuOpen(false);
  }, [searchParams]);

  const handleSearch = (val: string) => {
    setSearchValue(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('q', val);
    else params.delete('q');
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Lado Esquerdo: Logo */}
        <div className={styles.left}>
          <TransitionLink href="/">
            <img src="/brand/logo.png" alt="Summit Logo" className={styles.logo} />
          </TransitionLink>
          <div className={styles.divider} />
          <nav className={styles.nav}>
            <TransitionLink href="/login" className={styles.navLink}>Administração</TransitionLink>
            <TransitionLink href="/login" className={styles.navLink}>Locatário</TransitionLink>
            <TransitionLink href="/login" className={styles.navLink}>Proprietário</TransitionLink>
            <TransitionLink href="/login" className={styles.navLink}>Anunciar meu imóvel</TransitionLink>
          </nav>
        </div>

        {/* Lado Direito: Pesquisa + Botão User */}
        <div className={styles.right}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <div className={styles.desktopActions}>
            <TransitionLink href="/login" className={styles.userButton} aria-label="Área do Usuário">
              <User size={20} />
              <span className={styles.userText}>Entrar</span>
            </TransitionLink>
          </div>

          <button 
            className={styles.mobileToggle} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileSearch}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text" 
                  placeholder="O que você procura?" 
                  className={styles.mobileSearchInput}
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <nav className={styles.mobileNav}>
                <TransitionLink href="/login" className={styles.mobileNavLink}>Administração</TransitionLink>
                <TransitionLink href="/login" className={styles.mobileNavLink}>Locatário</TransitionLink>
                <TransitionLink href="/login" className={styles.mobileNavLink}>Proprietário</TransitionLink>
                <TransitionLink href="/login" className={styles.mobileNavLink}>Anunciar meu imóvel</TransitionLink>
                <div className={styles.mobileMenuDivider} />
                <TransitionLink href="/login" className={styles.mobileNavLink}>
                  <User size={20} />
                  <span>Área do Cliente</span>
                </TransitionLink>
              </nav>

              <div className={styles.mobileMenuFooter}>
                <img src="/brand/logo.png" alt="Summit" className={styles.mobileLogo} />
                <p>Summit Luxury Real Estate © 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
