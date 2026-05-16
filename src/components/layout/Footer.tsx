'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import InstagramLineIcon from 'remixicon-react/InstagramLineIcon';
import LinkedinBoxLineIcon from 'remixicon-react/LinkedinBoxLineIcon';
import YoutubeLineIcon from 'remixicon-react/YoutubeLineIcon';
import TransitionLink from '@/components/common/TransitionLink';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <TransitionLink href="/">
              <Image 
                src="/brand/logo.png" 
                alt="Summit Logo" 
                width={120} 
                height={24} 
                className={styles.logo}
              />
            </TransitionLink>
            <p className={styles.tagline}>
              Curadoria exclusiva de imóveis de alto padrão. Elevando o conceito de moradia e investimento no mercado brasileiro.
            </p>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Navegação</h4>
            <ul className={styles.linkList}>
              <li><TransitionLink href="/">Home</TransitionLink></li>
              <li><TransitionLink href="/#">Imóveis à Venda</TransitionLink></li>
              <li><TransitionLink href="/#">Locação de Luxo</TransitionLink></li>
              <li><TransitionLink href="/login">Anunciar Imóvel</TransitionLink></li>
              <li><TransitionLink href="/login">Serviços & Concierge</TransitionLink></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Áreas do Cliente</h4>
            <ul className={styles.linkList}>
              <li><TransitionLink href="/login">Área do Proprietário</TransitionLink></li>
              <li><TransitionLink href="/login">Portal do Locatário</TransitionLink></li>
              <li><TransitionLink href="/login">Administração</TransitionLink></li>
              <li><TransitionLink href="/contato">Falar com Consultor</TransitionLink></li>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h4 className={styles.columnTitle}>Contato</h4>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} className={styles.contactIcon} />
                <span>Av. Brigadeiro Faria Lima, 4500<br/>São Paulo, SP - Brasil</span>
              </li>
              <li>
                <Phone size={18} className={styles.contactIcon} />
                <span>+55 (11) 99876-5432</span>
              </li>
              <li>
                <Mail size={18} className={styles.contactIcon} />
                <span>contato@summit.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright} suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Summit Luxury Real Estate. Todos os direitos reservados.
          </div>
          <div className={styles.legalLinks}>
            <TransitionLink href="/politicas">Termos e políticas</TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
