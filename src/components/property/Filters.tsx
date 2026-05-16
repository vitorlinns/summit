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

export interface FilterState {
  location: string;
  type: string;
  price: string;
  suites: string;
}

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  locations: string[];
  types: string[];
}

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
                className={`${styles.dropdownOption} ${value === option ? styles.selected : ''}`}
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

const PRICE_OPTIONS = [
  'Até R$ 10M',
  'Até R$ 20M',
  'Até R$ 30M',
  'Acima de R$ 30M',
];

const SUITES_OPTIONS = [
  '1+ Suítes',
  '3+ Suítes',
  '5+ Suítes',
  '7+ Suítes',
];

export default function Filters({ onFilterChange, locations, types }: FiltersProps) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [suites, setSuites] = useState('');

  const applyFilter = (updated: Partial<FilterState>) => {
    const next: FilterState = {
      location,
      type,
      price,
      suites,
      ...updated,
    };
    onFilterChange(next);
  };

  const handleReset = () => {
    setLocation('');
    setType('');
    setPrice('');
    setSuites('');
    onFilterChange({ location: '', type: '', price: '', suites: '' });
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
            onChange={(val) => { setLocation(val); applyFilter({ location: val }); }}
            options={locations}
          />

          <div className={styles.divider} />

          <CustomDropdown 
            label="Tipo"
            icon={<Home size={16} />}
            placeholder="Qualquer Tipo"
            value={type}
            onChange={(val) => { setType(val); applyFilter({ type: val }); }}
            options={types}
          />

          <div className={styles.divider} />

          <CustomDropdown 
            label="Preço Máximo"
            icon={<DollarSign size={16} />}
            placeholder="Sem Limite"
            value={price}
            onChange={(val) => { setPrice(val); applyFilter({ price: val }); }}
            options={PRICE_OPTIONS}
          />

          <div className={styles.divider} />

          <CustomDropdown 
            label="Suítes"
            icon={<Bed size={16} />}
            placeholder="Qualquer"
            value={suites}
            onChange={(val) => { setSuites(val); applyFilter({ suites: val }); }}
            options={SUITES_OPTIONS}
          />

          <div className={styles.actions}>
            <button className={styles.advancedBtn} onClick={handleReset}>
              <X size={18} />
              <span>Limpar</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
