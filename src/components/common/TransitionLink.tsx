'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { showPreloader } from './Preloader';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export default function TransitionLink({ href, children, className, style, 'aria-label': ariaLabel }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('#') ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    // Show preloader SYNCHRONOUSLY in the same click frame — before anything else
    showPreloader();
    // Navigate after the overlay is guaranteed to be visible
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
