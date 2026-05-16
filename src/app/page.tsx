'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Filters from "@/components/property/Filters";
import PropertyCard from "@/components/property/PropertyCard";
import Button from "@/components/common/Button";
import { CreditCard, ShieldCheck, Award } from "lucide-react";
import properties from "@/data/properties.json";
import styles from "./page.module.css";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=2000"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className={styles.heroBg}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${HERO_IMAGES[currentImage]}')` }}
          />
        </AnimatePresence>
        
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={styles.title}
          >
            Summit
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className={styles.subtitle}
          >
            Curadoria de Imóveis de Alto Padrão
          </motion.p>
        </div>
      </section>
      
      <Filters />

      <section className={styles.recentSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Imóveis em Destaque</h2>
            <p className={styles.sectionSubtitle}>Uma seleção rigorosa do que há de melhor no mercado brasileiro</p>
          </div>

          <div className={styles.grid}>
            {properties.filter(p => p.purpose === 'sale').map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className={styles.viewMoreWrapper}>
            <Button>Ver todos imóveis a venda</Button>
          </div>
        </div>
      </section>

      <section className={styles.rentalSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Locação de Alto Padrão</h2>
            <p className={styles.sectionSubtitle}>Experiências exclusivas e estadias inesquecíveis</p>
          </div>

          <div className={styles.grid}>
            {properties.filter(p => p.purpose === 'rent').map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className={styles.viewMoreWrapper}>
            <Button>Ver todos imóveis para locação</Button>
          </div>
        </div>
      </section>
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.whiteText}`}>Serviços & Concierge</h2>
            <p className={styles.serviceDesc}>Excelência em cada detalhe da sua jornada patrimonial</p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <CreditCard size={32} strokeWidth={1} />
              </div>
              <h3 className={styles.serviceTitle}>Assessoria Financeira</h3>
              <p className={styles.serviceDesc}>
                Conexão direta com as divisões de Private Banking dos principais bancos nacionais e internacionais para estruturação de crédito personalizado.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <ShieldCheck size={32} strokeWidth={1} />
              </div>
              <h3 className={styles.serviceTitle}>Segurança Jurídica</h3>
              <p className={styles.serviceDesc}>
                Análise minuciosa de toda a documentação e histórico do imóvel por nossa banca jurídica especializada em transações de alto valor.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <Award size={32} strokeWidth={1} />
              </div>
              <h3 className={styles.serviceTitle}>Gestão de Patrimônio</h3>
              <p className={styles.serviceDesc}>
                Serviço de concierge para manutenção, administração de locação e valorização do seu ativo imobiliário com total discrição.
              </p>
            </div>
          </div>
          
          <div className={styles.viewMoreWrapper}>
            <Button variant="outline" className={styles.whiteBtn}>Falar com um especialista</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
