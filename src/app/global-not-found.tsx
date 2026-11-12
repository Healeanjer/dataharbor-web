import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import './site.css';
export const metadata: Metadata = {
  title: '404 · DataHarbor',
  robots: { index: false, follow: false },
};
export default function GlobalNotFound() {
  return (
    <html lang="zh-CN">
      <body>
        <main className="standalone-error">
          <a href={sitePath('/')}>
            <img src={sitePath('/mark.svg')} width="48" height="48" alt="DataHarbor" />
          </a>
          <p className="eyebrow">404</p>
          <h1>未找到页面 / Page not found</h1>
          <p>请选择站点语言 / Choose your language</p>
          <nav>
            <a className="button button-brand" href={sitePath('/')}>
              简体中文
            </a>
            <a className="button button-outline" href={sitePath('/en/')}>
              English
            </a>
            <a className="button button-outline" href={sitePath('/zh-hant/')}>
              繁體中文
            </a>
          </nav>
        </main>
      </body>
    </html>
  );
}
