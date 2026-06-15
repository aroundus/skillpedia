'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@primer/react';

interface PrimerThemeProviderProps {
  children: ReactNode;
}

export const PrimerThemeProvider = ({ children }: PrimerThemeProviderProps) => {
  return (
    <ThemeProvider colorMode="auto" contextOnly>
      {children}
    </ThemeProvider>
  );
};
