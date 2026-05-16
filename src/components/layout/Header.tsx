'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TransitionLink from '@/components/common/TransitionLink';
import { Search, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  // Sincroniza o input se a URL mudar externamente (ex: limpando filtros)
  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (val: string) => {
    setSearchValue(val);
    const params = new URLSearchParams(searchParams.toString());
    
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }

    // Se não estiver na home, navega para home com a busca
    // Se estiver na home, apenas atualiza a URL sem scroll
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
              placeholder="Buscar por nome ou local..." 
              className={styles.searchInput}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <TransitionLink href="/login" className={styles.userButton} aria-label="Área do Usuário">
            <User size={20} />
            <span className={styles.userText}>Entrar</span>
          </TransitionLink>
        </div>
      </div>
    </header>
  );
}
