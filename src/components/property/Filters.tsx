'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Filters.module.css';

interface DropdownProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

function CustomDropdown({ label, icon, options, placeholder, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.filterGroup} ref={dropdownRef}>
      <div className={styles.label}>
        {icon}
        <span>{label}</span>
      </div>
      <div 
        className={styles.customSelectTrigger} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.selectedText : styles.placeholder}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={14} 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <li 
              className={styles.dropdownOption}
              onClick={() => { onChange(''); setIsOpen(false); }}
            >
              {placeholder}
            </li>
            {options.map((option) => (
              <li 
                key={option} 
                className={styles.dropdownOption}
                onClick={() => { onChange(option); setIsOpen(false); }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Filters() {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [suites, setSuites] = useState('');

  const handleReset = () => {
    setLocation('');
    setType('');
    setPrice('');
    setSuites('');
  };

  return (
    <section className={styles.filtersSection}>
      <div className={styles.container}>
        <div className={styles.filterBar}>
          
          <CustomDropdown 
            label="Localização"
            icon={<MapPin size={16} />}
            placeholder="Todos os Locais"
            value={location}
            onChange={setLocation}
            options={["São Paulo, SP", "Rio de Janeiro, RJ", "Balneário Camboriú, SC", "Trancoso, BA", "Angra dos Reis, RJ", "Gramado, RS"]}
          />

          <div className={styles.divider} />

          <CustomDropdown 
            label="Tipo"
            icon={<Home size={16} />}
            placeholder="Qualquer Tipo"
            value={type}
            onChange={setType}
            options={["Mansões", "Penthouses", "Casas de Praia", "Fazendas de Luxo"]}
          />

          <div className={styles.divider} />

          <CustomDropdown 
            label="Preço Máximo"
            icon={<DollarSign size={16} />}
            placeholder="Sem Limite"
            value={price}
            onChange={setPrice}
            options={["Até R$ 5M", "Até R$ 10M", "Até R$ 50M", "R$ 100M+"]}
          />

          <div className={styles.divider} />

          <CustomDropdown 
            label="Suítes"
            icon={<Bed size={16} />}
            placeholder="Qualquer"
            value={suites}
            onChange={setSuites}
            options={["2+ Suítes", "4+ Suítes", "6+ Suítes", "8+ Suítes"]}
          />

          <div className={styles.actions}>
            <button className={styles.advancedBtn} onClick={handleReset}>
              <X size={18} />
              <span>Limpar</span>
            </button>
            <button className={styles.searchBtn}>
              Buscar
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
