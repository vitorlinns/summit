import Link from 'next/link';
import { Search, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Lado Esquerdo: Logo */}
        <div className={styles.left}>
          <Link href="/">
            <img src="/brand/logo.png" alt="Summit Logo" className={styles.logo} />
          </Link>
          <div className={styles.divider} />
          <nav className={styles.nav}>
            <Link href="/admin" className={styles.navLink}>Administração</Link>
            <Link href="/locatario" className={styles.navLink}>Locatário</Link>
            <Link href="/proprietario" className={styles.navLink}>Proprietário</Link>
            <Link href="/anunciar" className={styles.navLink}>Anunciar meu imóvel</Link>
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
            />
          </div>
          <button className={styles.userButton} aria-label="Área do Usuário">
            <User size={20} />
            <span className={styles.userText}>Entrar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
