'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import InstagramLineIcon from 'remixicon-react/InstagramLineIcon';
import LinkedinBoxLineIcon from 'remixicon-react/LinkedinBoxLineIcon';
import YoutubeLineIcon from 'remixicon-react/YoutubeLineIcon';
import styles from './page.module.css';
import Button from '@/components/common/Button';
import Snackbar, { SnackbarType } from '@/components/common/Snackbar';

export default function ContatoPage() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !phone || !message) {
      showSnackbar('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (!email.includes('@')) {
      showSnackbar('Por favor, insira um e-mail válido.', 'error');
      return;
    }

    // Success logic
    showSnackbar('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    e.currentTarget.reset();
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Contato</h1>
          <p className={styles.subtitle}>
            Estamos à disposição para oferecer um atendimento personalizado e discreto. 
            Inicie sua jornada no mercado de luxo conosco.
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nome Completo</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Como gostaria de ser chamado?" 
                  className={styles.input}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>E-mail Corporativo ou Pessoal</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="exemplo@email.com" 
                  className={styles.input}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+55 (11) 99999-9999" 
                  className={styles.input}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Mensagem</label>
                <textarea 
                  name="message"
                  placeholder="Conte-nos sobre o imóvel de seu interesse ou como podemos ajudar." 
                  className={styles.textarea}
                  required
                ></textarea>
              </div>

              <Button type="submit" variant="solid" className={styles.submitBtn}>Enviar Mensagem</Button>
            </form>
          </section>

          <aside className={styles.infoSection}>
            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>Escritório Central</h4>
              <div className={styles.infoText}>
                <MapPin size={18} style={{ marginBottom: '-3px', marginRight: '8px', display: 'inline' }} />
                Av. Brigadeiro Faria Lima, 4500<br/>
                Itaim Bibi, São Paulo - SP
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>Atendimento Direto</h4>
              <div className={styles.infoText}>
                <Phone size={18} style={{ marginBottom: '-3px', marginRight: '8px', display: 'inline' }} />
                +55 (11) 99876-5432
              </div>
              <div className={styles.infoText}>
                <Mail size={18} style={{ marginBottom: '-3px', marginRight: '8px', display: 'inline' }} />
                contato@summit.com.br
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>Redes Exclusivas</h4>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink}><InstagramLineIcon size={20} /></a>
                <a href="#" className={styles.socialLink}><LinkedinBoxLineIcon size={20} /></a>
                <a href="#" className={styles.socialLink}><YoutubeLineIcon size={20} /></a>
              </div>
            </div>
          </aside>
        </div>
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
