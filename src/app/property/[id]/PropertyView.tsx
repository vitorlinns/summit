'use client';

import React, { useState } from 'react';
import { MapPin, Maximize, BedDouble, Car, ArrowLeft, Phone, Mail } from 'lucide-react';
import TransitionLink from '@/components/common/TransitionLink';
import Button from '@/components/common/Button';
import Snackbar, { SnackbarType } from '@/components/common/Snackbar';
import styles from './page.module.css';

interface PropertyViewProps {
  property: any;
  displayPrice: string;
}

export default function PropertyView({ property, displayPrice }: PropertyViewProps) {
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: '',
    type: 'success' as SnackbarType
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbar({
      isVisible: true,
      message: 'Interesse registrado! Um de nossos consultores entrará em contato em breve.',
      type: 'success'
    });
  };

  return (
    <>
      <section className={styles.hero}>
        <img src={property.image} alt={property.title} className={styles.heroImage} />
        <TransitionLink href="/" className={styles.backBtn} style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10, backgroundColor: 'white', padding: '10px', borderRadius: '50%', display: 'flex', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <ArrowLeft size={20} color="#000" />
        </TransitionLink>
      </section>

      <div className={styles.container}>
        <div className={styles.layout}>
          <section className={styles.content}>
            <header className={styles.header}>
              <div className={styles.type}>{property.type}</div>
              <h1 className={styles.title}>{property.title}</h1>
              <div className={styles.location}>
                <MapPin size={20} strokeWidth={1.5} />
                <span>{property.location}</span>
              </div>
              <div className={styles.price}>{displayPrice}</div>
            </header>

            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Área Total</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Maximize size={20} strokeWidth={1} />
                  <span className={styles.specValue}>{property.specs.area} m²</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Suítes</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BedDouble size={20} strokeWidth={1} />
                  <span className={styles.specValue}>{property.specs.suites} dorms.</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vagas</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Car size={20} strokeWidth={1} />
                  <span className={styles.specValue}>{property.specs.parking} vagas</span>
                </div>
              </div>
            </div>

            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>Sobre a propriedade</h2>
              <p className={styles.descriptionText}>
                Esta magnífica propriedade representa o ápice da arquitetura contemporânea e do luxo discreto. 
                Projetada para oferecer uma experiência de moradia inigualável, cada detalhe foi meticulosamente 
                pensado para integrar sofisticação e conforto. 
                <br /><br />
                Com acabamentos de altíssimo padrão, amplos vãos livres e uma iluminação natural abundante, 
                o imóvel se destaca por sua fluidez espacial e conexão com o entorno. Localizado em um dos 
                endereços mais exclusivos, oferece total privacidade e segurança para quem busca não apenas 
                um imóvel, mas um novo estilo de vida.
              </p>
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.interestCard}>
              <h3 className={styles.cardTitle}>Tenho Interesse</h3>
              <p className={styles.cardSubtitle}>
                Preencha seus dados para receber uma apresentação completa deste imóvel.
              </p>

              <form className={styles.contactForm} onSubmit={handleContactSubmit}>
                <input type="text" placeholder="Seu Nome" className={styles.formInput} required />
                <input type="email" placeholder="E-mail" className={styles.formInput} required />
                <input type="tel" placeholder="Telefone" className={styles.formInput} required />
                <Button type="submit" variant="solid" className={styles.submitBtn}>
                  Solicitar Apresentação
                </Button>
              </form>

              <div className={styles.agentInfo}>
                <div className={styles.agentAvatar}>
                  <img 
                    src={property.agent?.image || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200"} 
                    alt={property.agent?.name || "Consultor"} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div>
                  <div className={styles.agentName}>{property.agent?.name || "Rodrigo Almeida"}</div>
                  <div className={styles.agentTitle}>{property.agent?.title || "Consultor Private"}</div>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <Button variant="outline" style={{ flex: 1, padding: '10px' }}>
                  <Phone size={18} />
                </Button>
                <Button variant="outline" style={{ flex: 1, padding: '10px' }}>
                  <Mail size={18} />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Snackbar 
        isVisible={snackbar.isVisible} 
        message={snackbar.message} 
        type={snackbar.type} 
        onClose={() => setSnackbar(prev => ({ ...prev, isVisible: false }))} 
      />
    </>
  );
}
