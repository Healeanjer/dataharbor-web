'use client';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { translator, type Locale, type Translator } from './core';
const Language = createContext<{ locale: Locale; t: Translator } | null>(null);
export function LanguageProvider({
  locale,
  words,
  children,
}: {
  locale: Locale;
  words: Record<string, string>;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: translator(locale, words) }), [locale, words]);
  return <Language.Provider value={value}>{children}</Language.Provider>;
}
export function useLanguage() {
  const value = useContext(Language);
  if (!value) throw new Error('LanguageProvider is required');
  return value;
}
