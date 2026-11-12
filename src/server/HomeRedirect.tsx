import { href, type Locale, type Translator } from '@/i18n/core';

/** Static-host fallback; the local preview also sends a permanent HTTP redirect. */
export function HomeRedirect({ locale, t }: { locale: Locale; t: Translator }) {
  const target = href(locale, '/');
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(
            target
          )} + window.location.search + window.location.hash);`,
        }}
      />
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <section className="section">
        <div className="container">
          <h1>{t('平台简介')}</h1>
          <p>
            <a className="text-link" href={target}>
              {t('返回平台简介')}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
