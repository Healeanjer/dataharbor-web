import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';
import { href, type Locale, type Translator } from '@/i18n/core';
export function Action({
  locale,
  route,
  children,
  secondary = false,
  small = false,
}: {
  locale: Locale;
  route: string;
  children: ReactNode;
  secondary?: boolean;
  small?: boolean;
}) {
  return (
    <a
      href={href(locale, route)}
      className={`button ${secondary ? 'button-outline' : 'button-brand'} ${
        small ? 'button-small' : ''
      }`}
    >
      {children}
      <Icon name="arrow" size={16} />
    </a>
  );
}
export function Section({
  id,
  kicker,
  title,
  description,
  children,
  tone = 'white',
  className = '',
}: {
  id?: string;
  kicker?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`section section-${tone} ${className}`}>
      <div className="container">
        <div className="section-heading" data-reveal>
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h2>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
export function Breadcrumb({
  items,
  label,
}: {
  items: { text: string; url?: string }[];
  label: string;
}) {
  return (
    <nav className="breadcrumb" aria-label={label}>
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {i > 0 && <span aria-hidden>/</span>}
            {item.url ? (
              <a href={item.url}>{item.text}</a>
            ) : (
              <span aria-current="page">{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function PageIntro({
  kicker,
  title,
  description,
  children,
  breadcrumb,
  visual,
}: {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
  breadcrumb?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className={`page-intro ${visual ? 'with-visual' : ''}`}>
      <div className="intro-grid" aria-hidden />
      <div className="container">
        <div className="page-intro-layout">
          <div>
            {breadcrumb}
            <p className="eyebrow">{kicker}</p>
            <h1>{title}</h1>
            <p className="intro-description">{description}</p>
            {children && <div className="button-row">{children}</div>}
          </div>
          {visual && <div className="intro-visual">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
export function StepList({ items, t }: { items: string[][]; t: Translator }) {
  return (
    <ol className="step-list">
      {items.map(([title, text], i) => (
        <li key={title} data-reveal style={{ '--reveal-delay': `${i * 55}ms` } as CSSProperties}>
          <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{t(title)}</h3>
            <p>{t(text)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
export function FeatureGrid({ items, t }: { items: string[][]; t: Translator }) {
  const icons = ['folder', 'shield', 'network', 'chart'];
  return (
    <div className="feature-grid">
      {items.map(([title, text], i) => (
        <article
          className="feature-card"
          key={title}
          data-reveal
          style={{ '--reveal-delay': `${i * 55}ms` } as CSSProperties}
        >
          <div className="icon-box">
            <Icon name={icons[i % icons.length]} size={24} />
          </div>
          <h3>{t(title)}</h3>
          <p>{t(text)}</p>
        </article>
      ))}
    </div>
  );
}
