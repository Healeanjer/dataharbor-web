'use client';
import { sitePath } from '@/lib/site-path';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/catalog';
import { href, languageOptions, parsePath } from '@/i18n/core';
import { useLanguage } from '@/i18n/context';
import { Icon } from './Icon';

export function Navigation() {
  const { locale, t } = useLanguage();
  const path = usePathname();
  const current = parsePath(path).route;
  const active = current === '/security/' ? '/modules/' : current;
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [content, setContent] = useState<string>('language');
  const [shown, setShown] = useState(false);
  const [suffix, setSuffix] = useState('');
  const [position, setPosition] = useState({ left: 24, width: 300 });
  const [scrolled, setScrolled] = useState(false);
  const controls = useRef<Record<string, HTMLButtonElement | null>>({});
  const popover = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusOrigin = useRef<string | null>(null);
  const item = navigation.find((n) => n.route === content);
  const selectedLanguage = languageOptions.find((l) => l.code === locale)!;
  const groups = item?.groups || [];
  function cancelClose() {
    if (timer.current) clearTimeout(timer.current);
  }
  function close() {
    cancelClose();
    setShown(false);
    setMobile(false);
    setExpanded(null);
  }
  function open(key: string) {
    cancelClose();
    setMobile(false);
    setContent(key);
    setShown(true);
    focusOrigin.current = key;
    setSuffix(window.location.search + window.location.hash);
  }
  function deferredClose() {
    if (content !== 'language') timer.current = setTimeout(() => setShown(false), 160);
  }
  function isActive(route: string) {
    return route === '/' ? active === '/' : active.startsWith(route);
  }
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.menuOpen = 'true';
    const background = [document.querySelector('main'), document.querySelector('footer')].filter(
      (el): el is HTMLElement => el instanceof HTMLElement
    );
    const previousInert = background.map((el) => el.inert);
    background.forEach((el) => {
      el.inert = true;
    });
    return () => {
      document.body.style.overflow = before;
      delete document.documentElement.dataset.menuOpen;
      background.forEach((el, i) => {
        el.inert = previousInert[i];
      });
    };
  }, [mobile]);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key !== 'Escape' || (!shown && !mobile)) return;
      close();
      if (focusOrigin.current) controls.current[focusOrigin.current]?.focus();
    }
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  });
  useLayoutEffect(() => {
    function measure() {
      const control = controls.current[content];
      if (!control) return;
      const bounds = control.getBoundingClientRect();
      const desired =
        content === 'language' ? 284 : groups.length > 2 ? 1060 : groups.length === 2 ? 650 : 310;
      const width = Math.min(desired, window.innerWidth - 32);
      const left = Math.min(
        window.innerWidth - width - 16,
        Math.max(16, bounds.left + bounds.width / 2 - width / 2)
      );
      setPosition({ left, width });
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [content, shown, groups.length]);
  function rowControl(key: string) {
    return `menu-${key.replace(/\W/g, '')}`;
  }
  return (
    <>
      {(shown || mobile) && (
        <button className="nav-scrim" aria-label={t('关闭导航菜单')} onClick={close} />
      )}
      <header
        className="site-header"
        data-scrolled={scrolled || mobile || shown}
        onMouseEnter={cancelClose}
      >
        <div className="header-surface" aria-hidden />
        <div className="header-inner">
          <a
            className="brand"
            href={href(locale)}
            aria-label={`${t('企业数据平台')} · ${t('平台简介')}`}
            onClick={close}
          >
            <img src={sitePath('/mark.svg')} width="35" height="35" alt="" />
            <span className="brand-full">{t('企业数据平台')}</span>
            <span className="brand-short">{t('数据平台')}</span>
          </a>
          <nav className="desktop-nav" aria-label={t('顶部导航')} onMouseLeave={deferredClose}>
            {navigation.map((n) => (
              <div
                className="nav-item"
                data-active={isActive(n.route)}
                data-expanded={shown && content === n.route}
                key={n.route}
                onMouseEnter={() => (n.groups.length ? open(n.route) : setShown(false))}
              >
                <a
                  href={href(locale, n.route)}
                  aria-current={isActive(n.route) ? 'location' : undefined}
                  onClick={close}
                >
                  {t(n.title)}
                </a>
                {n.groups.length > 0 && (
                  <button
                    ref={(el) => {
                      controls.current[n.route] = el;
                    }}
                    aria-label={`${t('展开')}${t(n.title)}${t('菜单')}`}
                    aria-expanded={shown && content === n.route}
                    aria-controls="desktop-popover"
                    onClick={() => open(n.route)}
                  >
                    <Icon name="down" size={12} />
                  </button>
                )}
              </div>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="language-trigger"
              ref={(el) => {
                controls.current.language = el;
              }}
              aria-label={`${t('选择语言')}: ${selectedLanguage.name}`}
              aria-expanded={shown && content === 'language'}
              aria-controls="desktop-popover"
              onClick={() => (shown && content === 'language' ? setShown(false) : open('language'))}
            >
              <Icon name="globe" size={18} />
              <span>{selectedLanguage.name}</span>
              <Icon name="down" size={11} className="language-chevron" />
            </button>
            <a
              href={href(locale, '/modules/')}
              className="button button-brand button-small"
              onClick={close}
            >
              {t('试用产品')}
              <Icon name="out" size={14} />
            </a>
            <button
              className="mobile-trigger"
              aria-label={t(mobile ? '关闭菜单' : '打开菜单')}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              ref={(el) => {
                controls.current.mobile = el;
              }}
              onClick={() => {
                cancelClose();
                setShown(false);
                setMobile(!mobile);
                focusOrigin.current = 'mobile';
              }}
            >
              <Icon name={mobile ? 'close' : 'menu'} size={23} />
            </button>
          </div>
        </div>
      </header>
      <section
        ref={popover}
        id="desktop-popover"
        className={`nav-popover ${content === 'language' ? 'language-popover' : ''}`}
        aria-label={t(content === 'language' ? '选择语言' : item?.title || '导航')}
        style={{
          left: position.left,
          width: position.width,
          backdropFilter: 'blur(26px) saturate(125%)',
          WebkitBackdropFilter: 'blur(26px) saturate(125%)',
        }}
        data-open={shown}
        aria-hidden={!shown}
        inert={!shown}
        onMouseEnter={cancelClose}
        onMouseLeave={deferredClose}
      >
        {content === 'language' ? (
          <>
            <p className="popover-kicker">{t('选择语言')}</p>
            {languageOptions.map((l) =>
              l.code === locale ? (
                <button
                  key={l.code}
                  className="language-option current"
                  aria-current="true"
                  onClick={close}
                >
                  <span>
                    <span className="flag" aria-hidden>
                      <img src={sitePath(l.flag)} width="24" height="16" alt="" />
                    </span>
                    <span lang={l.code === 'zh-hant' ? 'zh-Hant' : l.code}>{l.name}</span>
                  </span>
                  <Icon name="check" size={17} />
                </button>
              ) : (
                <a
                  className="language-option"
                  key={l.code}
                  href={href(l.code, current) + suffix}
                  hrefLang={l.code === 'zh-hant' ? 'zh-Hant' : l.code}
                  lang={l.code === 'zh-hant' ? 'zh-Hant' : l.code}
                  onClick={close}
                >
                  <span>
                    <span className="flag" aria-hidden>
                      <img src={sitePath(l.flag)} width="24" height="16" alt="" />
                    </span>
                    {l.name}
                  </span>
                  <Icon name="out" size={13} />
                </a>
              )
            )}
            <p className="language-more">{t('更多语言，敬请期待')}</p>
          </>
        ) : (
          <>
            <div className="popover-intro">
              <span>{t(item?.title || '平台')}</span>
              <a href={href(locale, item?.route || '/')} onClick={close}>
                {t('查看')}
                {t(item?.title || '平台')}
                <Icon name="out" size={14} />
              </a>
            </div>
            <div
              className="popover-columns"
              style={{ gridTemplateColumns: `repeat(${Math.max(groups.length, 1)},minmax(0,1fr))` }}
            >
              {groups.map((g) => (
                <nav key={g.title} aria-label={t(g.title)}>
                  <p className="popover-kicker">{t(g.title)}</p>
                  {g.links.map(([label, target]) => (
                    <a key={target} href={href(locale, target)} onClick={close}>
                      {t(label)}
                      <Icon name="out" size={13} />
                    </a>
                  ))}
                </nav>
              ))}
            </div>
          </>
        )}
      </section>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        data-open={mobile}
        aria-label={t('手机导航')}
        aria-hidden={!mobile}
        inert={!mobile}
        style={{
          backdropFilter: 'blur(26px) saturate(125%)',
          WebkitBackdropFilter: 'blur(26px) saturate(125%)',
        }}
      >
        {navigation.map((n) => (
          <div className="mobile-menu-item" key={n.route}>
            {n.groups.length ? (
              <button
                className="mobile-menu-row"
                data-active={isActive(n.route)}
                aria-expanded={expanded === n.route}
                aria-controls={rowControl(n.route)}
                onClick={() => setExpanded(expanded === n.route ? null : n.route)}
              >
                {t(n.title)}
                <Icon name="down" size={18} />
              </button>
            ) : (
              <a
                className="mobile-menu-row"
                data-active={isActive(n.route)}
                href={href(locale, n.route)}
                aria-current={isActive(n.route) ? 'location' : undefined}
                onClick={close}
              >
                {t(n.title)}
              </a>
            )}
            {n.groups.length > 0 && (
              <div
                id={rowControl(n.route)}
                className="accordion-body"
                data-open={expanded === n.route}
                aria-hidden={expanded !== n.route}
                inert={expanded !== n.route}
              >
                <div className="accordion-clip">
                  <div className="mobile-submenu">
                    <a className="mobile-overview" href={href(locale, n.route)} onClick={close}>
                      {t('查看')}
                      {t(n.title)}
                      <Icon name="out" size={14} />
                    </a>
                    {n.groups.map((g) => (
                      <div key={g.title}>
                        <p className="popover-kicker">{t(g.title)}</p>
                        {g.links.map(([label, target]) => (
                          <a href={href(locale, target)} key={target} onClick={close}>
                            {t(label)}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
