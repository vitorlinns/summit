import React from 'react';
import { Metadata } from 'next';
import properties from '@/data/properties.json';
import PropertyView from './PropertyView';
import styles from './page.module.css';
import TransitionLink from '@/components/common/TransitionLink';
import Button from '@/components/common/Button';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Função para gerar metadados dinâmicos (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = properties.find(p => p.id === resolvedParams.id);

  if (!property) {
    return {
      title: 'Imóvel não encontrado | Summit Luxury Real Estate',
    };
  }

  return {
    title: `${property.title} | ${property.location} | Summit`,
    description: `Descubra este magnífico ${property.type} em ${property.location}. ${property.specs.area}m², ${property.specs.suites} suítes. Luxo e exclusividade Summit.`,
    openGraph: {
      title: property.title,
      description: property.location,
      images: [{ url: property.image }],
    },
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const property = properties.find(p => p.id === resolvedParams.id);

  if (!property) {
    return (
      <div className={styles.main} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>Imóvel não encontrado</h1>
          <TransitionLink href="/">
            <Button variant="outline">Voltar para a Home</Button>
          </TransitionLink>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(property.price);

  const displayPrice = property.purpose === 'rent' ? `${formattedPrice}/mês` : formattedPrice;

  return (
    <main className={styles.main}>
      <PropertyView property={property} displayPrice={displayPrice} />
    </main>
  );
}
