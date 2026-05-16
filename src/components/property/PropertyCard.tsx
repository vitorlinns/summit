import TransitionLink from '@/components/common/TransitionLink';
import { MapPin, BedDouble, Maximize, Car } from 'lucide-react';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    purpose: string;
    type: string;
    specs: {
      area: number;
      suites: number;
      parking: number;
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
    <TransitionLink href={`/property/${property.id}`} className={styles.cardLink}>
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
            <div className={styles.viewBtn}>Ver Detalhes</div>
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
            <div className={styles.spec}>
              <Car size={16} />
              <span>{property.specs.parking} Vagas</span>
            </div>
          </div>

          <div className={styles.price}>{displayPrice}</div>
        </div>
      </div>
    </TransitionLink>
  );
}
