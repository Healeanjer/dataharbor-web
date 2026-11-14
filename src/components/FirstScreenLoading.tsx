'use client';
import { useEffect, useState } from 'react';
import { sitePath } from '@/lib/site-path';
import { useLanguage } from '@/i18n/context';

/** Cosmetic gate only: CSS removes it even if hydration or a request fails. */
export function FirstScreenLoading() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);
  const [removed, setRemoved] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let removal: ReturnType<typeof setTimeout>;
    let finished = false;
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      setReady(true);
      removal = setTimeout(() => {
        if (!cancelled) setRemoved(true);
      }, 350);
    };
    const deadline = setTimeout(finish, 3500);
    const minimum = new Promise((resolve) => setTimeout(resolve, 280));
    const images = [...document.querySelectorAll<HTMLImageElement>('.notebook-hero img')];
    const assets = Promise.allSettled([
      document.fonts.ready,
      ...images.map((image) => image.decode().catch(() => undefined)),
    ]);
    Promise.all([assets, minimum]).then(() => {
      clearTimeout(deadline);
      finish();
    });
    return () => {
      cancelled = true;
      clearTimeout(deadline);
      clearTimeout(removal);
    };
  }, []);
  if (removed) return null;
  return (
    <div
      className="first-screen-loading"
      data-ready={ready}
      role="status"
      aria-live="polite"
      aria-hidden={ready ? true : undefined}
    >
      <div className="first-screen-loading-brand">
        <img src={sitePath('/mark.svg')} width="44" height="44" alt="" />
        <strong>{t('企业数据平台')}</strong>
      </div>
      <div className="first-screen-loading-track" aria-hidden="true">
        <span />
      </div>
      <p>{t('正在准备页面，请稍候')}</p>
    </div>
  );
}
