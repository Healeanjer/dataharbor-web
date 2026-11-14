import { sitePath, withoutBasePath } from '@/lib/site-path';
import english from '@/content/en.json';
import traditional from '@/content/zh-hant.json';
import additions from '@/content/additions.json';
export const locales = ['zh-CN', 'en', 'zh-hant'] as const;
export type Locale = (typeof locales)[number];
export type Translator = (text: string) => string;
export const languageOptions = [
  { code: 'zh-CN' as Locale, name: '简体中文', flag: '/flags/cn.svg' },
  { code: 'en' as Locale, name: 'English', flag: '/flags/gb.svg' },
  { code: 'zh-hant' as Locale, name: '繁體中文', flag: '/flags/hk.svg' },
];
export function dictionary(locale: Locale): Record<string, string> {
  const existing = locale === 'en' ? english : locale === 'zh-hant' ? traditional : {};
  return {
    ...existing,
    ...Object.fromEntries(Object.entries(additions).map(([key, value]) => [key, value[locale]])),
  };
}
export function translator(locale: Locale, words = dictionary(locale)): Translator {
  return (text) => {
    if (locale === 'zh-CN' || !/[\u3400-\u9fff]/.test(text)) return text;
    if (!(text in words)) throw new Error(`Missing ${locale} translation: ${text}`);
    return words[text];
  };
}
export function href(locale: Locale, route = '/', hash = '') {
  const boundary = route.search(/[?#]/);
  const plain = boundary < 0 ? route : route.slice(0, boundary);
  const suffix = boundary < 0 ? '' : route.slice(boundary);
  const path = plain === '/' ? '/' : `/${plain.replace(/^\/+|\/+$/g, '')}/`;
  return sitePath(`${locale === 'zh-CN' ? '' : `/${locale}`}${path}${suffix}${hash}`);
}
export function parsePath(path: string): { locale: Locale; route: string } {
  const parts = withoutBasePath(path).split('/').filter(Boolean);
  const first = parts[0];
  const locale: Locale = first === 'en' ? 'en' : first === 'zh-hant' ? 'zh-hant' : 'zh-CN';
  if (locale !== 'zh-CN') parts.shift();
  return { locale, route: parts.length ? `/${parts.join('/')}/` : '/' };
}
export function documentLanguage(locale: Locale) {
  return locale === 'zh-hant' ? 'zh-Hant' : locale;
}
