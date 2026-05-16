import Image from 'next/image';
import { MapPin, BedDouble, Maximize } from 'lucide-react';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    type: string;
    specs: {
      area: number;
      suites: number;
    };
    image: string;
    tags?: string[];
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(property.price);

  const displayPrice = property.purpose === 'rent' ? `${formattedPrice}/mês` : formattedPrice;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={property.image} 
          alt={property.title} 
          className={styles.image}
        />
        <div className={styles.tags}>
          {property.tags?.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.overlay}>
          <button className={styles.viewBtn}>Ver Detalhes</button>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.type}>{property.type}</div>
        <h3 className={styles.title}>{property.title}</h3>
        
        <div className={styles.location}>
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <Maximize size={16} />
            <span>{property.specs.area} m²</span>
          </div>
          <div className={styles.spec}>
            <BedDouble size={16} />
            <span>{property.specs.suites} Suítes</span>
          </div>
        </div>

        <div className={styles.price}>{displayPrice}</div>
      </div>
    </div>
  );
}
