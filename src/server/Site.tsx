import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dictionary, documentLanguage, href, translator, type Locale } from '@/i18n/core';
import { LanguageProvider } from '@/i18n/context';
import { modules, moduleRoute, routePaths, routeTitle, solutions } from '@/lib/catalog';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MotionSystem, ReturnTop } from '@/components/Interactions';
import { Home } from './Home';
import { HomePrevious } from './HomePrevious';
import { HomeRedirect } from './HomeRedirect';
import {
  About,
  Deployment,
  Legal,
  Missing,
  ModuleDetail,
  ModuleDirectory,
  Pricing,
  SolutionDetail,
  SolutionDirectory,
  Technology,
} from './Templates';
import '@/app/site.css';

export type PageParams = { params: Promise<{ slug?: string[] }> };
export function staticPaths() {
  return routePaths.map((route) => ({ slug: route.split('/').filter(Boolean) }));
}
function canonical(slug: string[] = []) {
  return slug.length ? `/${slug.join('/')}/` : '/';
}
export async function pageMetadata(
  locale: Locale,
  params: PageParams['params']
): Promise<Metadata> {
  const { slug } = await params;
  const route = canonical(slug);
  const t = translator(locale);
  const title = t(routeTitle(route));
  const meta: Metadata = {
    title: { absolute: `${title} · ${t('企业数据平台')}` },
    description: t('从资料接入、业务协同，到知识复用与数据治理，找到你需要的能力。'),
  };
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const base = new URL(process.env.NEXT_PUBLIC_SITE_URL);
    const canonicalRoute = route === '/home-preview/' ? '/' : route;
    meta.alternates = {
      canonical: new URL(href(locale, canonicalRoute), base),
      languages: Object.fromEntries(
        (['zh-CN', 'en', 'zh-hant'] as Locale[]).map((l) => [
          documentLanguage(l),
          new URL(href(l, canonicalRoute), base),
        ])
      ),
    };
  }
  if (route === '/home-previous/' || route === '/home-preview/')
    meta.robots = { index: false, follow: true };
  return meta;
}
export function rootMetadata(locale: Locale): Metadata {
  const t = translator(locale);
  return {
    title: { default: t('企业数据平台'), template: `%s · ${t('企业数据平台')}` },
    applicationName: t('企业数据平台'),
    description: t('了解企业数据平台的架构、资料流转、AI 配置和技术底座。'),
    icons: { icon: sitePath('/mark.svg') },
    robots: { index: false, follow: false },
  };
}
export function SiteDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = translator(locale);
  return (
    <html lang={documentLanguage(locale)}>
      <body>
        <a className="skip-link" href="#main-content">
          {locale === 'en'
            ? 'Skip to content'
            : locale === 'zh-hant'
            ? '跳至主要內容'
            : '跳至主要内容'}
        </a>
        <LanguageProvider locale={locale} words={dictionary(locale)}>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer locale={locale} t={t} />
          <ReturnTop floating />
          <MotionSystem />
        </LanguageProvider>
      </body>
    </html>
  );
}
export async function renderPage(locale: Locale, params: PageParams['params']) {
  const { slug } = await params;
  const route = canonical(slug);
  if (!routePaths.includes(route)) notFound();
  const props = { locale, t: translator(locale) };
  switch (route) {
    case '/':
      return <Home {...props} />;
    case '/home-preview/':
      return <HomeRedirect locale={locale} t={props.t} />;
    case '/home-previous/':
      return <HomePrevious {...props} />;
    case '/product/':
      return <Technology {...props} />;
    case '/modules/':
      return <ModuleDirectory {...props} />;
    case '/solutions/':
      return <SolutionDirectory {...props} />;
    case '/deployment/':
      return <Deployment {...props} />;
    case '/pricing/':
      return <Pricing {...props} />;
    case '/about/':
      return <About {...props} />;
    case '/privacy/':
      return <Legal {...props} privacy />;
    case '/terms/':
      return <Legal {...props} privacy={false} />;
    case '/not-found/':
      return <Missing {...props} />;
  }
  const module = modules.find((item) => moduleRoute(item.id) === route);
  if (module) return <ModuleDetail {...props} id={module.id} />;
  const solution = solutions.find((item) => `/solutions/${item.slug}/` === route);
  if (solution) return <SolutionDetail {...props} solution={solution} />;
  notFound();
}
