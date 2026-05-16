'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

// Singleton ref — accessible by TransitionLink without React context
export let showPreloader: () => void = () => {};
export let hidePreloader: () => void = () => {};

const MIN_DISPLAY_TIME = 1200;

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const showTime = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Expose imperative controls — bypass React state entirely
    showPreloader = () => {
      if (!overlayRef.current) return;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      showTime.current = Date.now();
      overlayRef.current.classList.add(styles.visible);
    };

    hidePreloader = () => {
      if (!overlayRef.current) return;
      const elapsed = showTime.current ? Date.now() - showTime.current : MIN_DISPLAY_TIME;
      const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        overlayRef.current?.classList.remove(styles.visible);
        showTime.current = null;
      }, remaining);
    };

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // Hide when pathname actually changes (new page has loaded)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      hidePreloader();
    }
  }, [pathname]);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.logoWrapper}>
        <img src="/brand/logo.png" alt="Summit" className={styles.logo} />
        <div className={styles.loadingLine}>
          <div className={styles.loadingProgress} />
        </div>
      </div>
    </div>
  );
}
