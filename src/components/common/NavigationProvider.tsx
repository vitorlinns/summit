'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface NavigationContextType {
  isLoading: boolean;
  navigateTo: (href: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isLoading: false,
  navigateTo: () => {},
});

export function useNavigation() {
  return useContext(NavigationContext);
}

const MIN_DISPLAY_TIME = 600; // ms — mínimo para o preloader aparecer e ser visto

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const loadingStartTime = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When pathname actually changes, hide loader (respecting min display time)
  useEffect(() => {
    if (prevPathname.current === pathname) return; // skip on first mount
    prevPathname.current = pathname;

    if (loadingStartTime.current === null) return;

    const elapsed = Date.now() - loadingStartTime.current;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setIsLoading(false);
      loadingStartTime.current = null;
    }, remaining);

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pathname]);

  const navigateTo = useCallback((href: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    loadingStartTime.current = Date.now();
    setIsLoading(true);
    // Small delay so React can flush the isLoading=true render before navigating
    setTimeout(() => {
      router.push(href);
    }, 50);
  }, [router]);

  return (
    <NavigationContext.Provider value={{ isLoading, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
