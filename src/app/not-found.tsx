'use client';

import React from 'react';
import Button from '@/components/common/Button';
import TransitionLink from '@/components/common/TransitionLink';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.subtitle}>
          O endereço que você acessou não existe ou foi movido. 
          Retorne ao início para continuar explorando nosso portfólio exclusivo.
        </p>
        <div className={styles.actions}>
          <TransitionLink href="/">
            <Button variant="solid">Voltar para a Home</Button>
          </TransitionLink>
          <TransitionLink href="/contato">
            <Button variant="outline">Falar com um Consultor</Button>
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
