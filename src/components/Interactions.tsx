'use client';
import { sitePath } from '@/lib/site-path';
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useLanguage } from '@/i18n/context';
import { href } from '@/i18n/core';
import { Icon } from './Icon';
import dimensions from '@/content/image-sizes.json';

export function MotionSystem() {
  useEffect(() => {
    // Decode nearby images ahead of scrolling, with at most two active jobs.
    let cancelled = false;
    let active = 0;
    const queue: HTMLImageElement[] = [];
    const pump = () => {
      while (!cancelled && active < 2 && queue.length) {
        const image = queue.shift()!;
        active++;
        image.loading = 'eager';
        image.decoding = 'async';
        image
          .decode()
          .catch(() => undefined)
          .finally(() => {
            image.dataset.prepared = 'true';
            active--;
            pump();
          });
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          queue.push(entry.target as HTMLImageElement);
        }
        pump();
      },
      { rootMargin: '1000px 0px', threshold: 0 }
    );
    document
      .querySelectorAll<HTMLImageElement>('img[loading="lazy"]')
      .forEach((image) => observer.observe(image));
    return () => {
      cancelled = true;
      queue.length = 0;
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (!el.style.getPropertyValue('--reveal-delay')) {
        const siblings = Array.from(el.parentElement?.children || []);
        el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el) % 5, 4) * 75}ms`);
      }
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.dataset.revealPending = 'true';
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
export function Screenshot({
  name,
  alt,
  compact = false,
}: {
  name: string;
  alt: string;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const size = (dimensions as Record<string, number[]>)[name] || [1440, 930];
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
  return (
    <>
      <figure className={`screenshot ${compact ? 'screenshot-compact' : ''}`}>
        <button
          type="button"
          className="screenshot-open"
          aria-label={t('查看大图：') + alt}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <img
            src={sitePath(`/media/screens/${name}.webp`)}
            srcSet={`${sitePath(`/media/screens/${name}-720.webp`)} 720w, ${sitePath(
              `/media/screens/${name}.webp`
            )} ${size[0]}w`}
            sizes={compact ? '(max-width: 700px) 92vw, 48vw' : '(max-width: 700px) 94vw, 70vw'}
            decoding="async"
            alt={alt}
            width={size[0]}
            height={size[1]}
            loading={name === 'workspace' && !compact ? 'eager' : 'lazy'}
            fetchPriority={name === 'workspace' && !compact ? 'high' : 'auto'}
          />
          <span className="image-expand" aria-hidden>
            <Icon name="out" size={18} />
          </span>
        </button>
        <figcaption>{t('概念界面示意 · 查看大图 ↗')}</figcaption>
      </figure>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-labelledby={id}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="image-dialog-bar">
          <p id={id}>{alt}</p>
          <button type="button" aria-label={t('关闭预览')} onClick={() => dialog.current?.close()}>
            <Icon name="close" size={23} />
          </button>
        </div>
        {open && <img src={sitePath(`/media/screens/${name}.png`)} alt={alt} />}
      </dialog>
    </>
  );
}
export function ScrollDisplay({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="workspace-window" data-reveal>
      <div className="workspace-window-bar" aria-hidden>
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mono">DATAHARBOR / WORKSPACE</span>
        <span className="window-status">
          <span className="status-dot" />
          {t('企业内网')}
        </span>
      </div>
      <div className="workspace-window-content">{children}</div>
    </div>
  );
}
export function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [number, setNumber] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        function tick(now: number) {
          const p = Math.min((now - start) / 1000, 1);
          setNumber(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref} className="count-number" aria-label={String(value)}>
      {number}
    </span>
  );
}
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const seed = useId();
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div className="faq-item" key={item.q}>
          <h3>
            <button
              aria-expanded={selected === i}
              aria-controls={`${seed}-${i}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              {item.q}
              <Icon name="plus" size={20} />
            </button>
          </h3>
          <div
            id={`${seed}-${i}`}
            className="accordion-body"
            data-open={selected === i}
            aria-hidden={selected !== i}
            inert={selected !== i}
          >
            <div className="accordion-clip">
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export type TabItem = { title: string; description: string; image: string; route: string };
export function CapabilityTabs({ items }: { items: TabItem[] }) {
  const { locale, t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const seed = useId();
  const item = items[selected];
  return (
    <div className="capability-tabs">
      <div className="capability-options" role="tablist" aria-label={t('平台能力')}>
        {items.map((tab, i) => (
          <button
            key={tab.title}
            type="button"
            role="tab"
            aria-selected={i === selected}
            aria-controls={`${seed}-panel`}
            id={`${seed}-tab-${i}`}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
                next = (i + 1) % items.length;
              else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
                next = (i + items.length - 1) % items.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = items.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              document.getElementById(`${seed}-tab-${next}`)?.focus();
            }}
          >
            <span className="tab-order">0{i + 1}</span>
            <span>
              <strong>{tab.title}</strong>
              <span>{tab.description}</span>
            </span>
            <Icon name="out" size={16} />
          </button>
        ))}
      </div>
      <div
        className="capability-preview"
        role="tabpanel"
        id={`${seed}-panel`}
        aria-labelledby={`${seed}-tab-${selected}`}
      >
        <div key={item.image} className="preview-change">
          <Screenshot name={item.image} alt={item.title} compact />
        </div>
        <a className="text-link" href={href(locale, item.route)}>
          {t('了解相关模块')}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </div>
  );
}

/** Scroll advances the narrative without capturing wheel or touch input. */
export function ScrollStory({ items }: { items: TabItem[] }) {
  const { locale, t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 1000px) and (prefers-reduced-motion: no-preference)'
    );
    let frame = 0;
    function paint() {
      frame = 0;
      if (!media.matches || !root.current) return;
      const steps = Array.from(root.current.querySelectorAll<HTMLElement>('[data-story-step]'));
      const target = window.innerHeight * 0.49;
      let nearest = 0;
      let distance = Infinity;
      steps.forEach((step, i) => {
        const box = step.getBoundingClientRect();
        const delta = Math.abs(box.top + box.height / 2 - target);
        if (delta < distance) {
          nearest = i;
          distance = delta;
        }
      });
      setActive(nearest);
    }
    function update() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    function configure() {
      setEnhanced(media.matches);
      update();
    }
    configure();
    media.addEventListener('change', configure);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      media.removeEventListener('change', configure);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
    };
  }, []);
  const item = items[active];
  return (
    <div className="scroll-story" ref={root} data-enhanced={enhanced}>
      <div className="story-desktop">
        <ol className="story-steps">
          {items.map((step, i) => (
            <li key={step.title} data-story-step data-active={active === i}>
              <div className="story-step-copy">
                <span className="story-index mono">
                  {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <a className="text-link" href={href(locale, step.route)}>
                  {t('了解相关模块')}
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </li>
          ))}
        </ol>
        <div className="story-stage">
          <div className="story-stage-glow" aria-hidden />
          <div className="story-stage-top">
            <span className="mono">DATAHARBOR / {String(active + 1).padStart(2, '0')}</span>
            <span className="status-dot" />
          </div>
          <div className="story-image-stack">
            {items.map((slide, i) => (
              <div
                key={slide.image}
                className="story-image-layer"
                data-active={i === active}
                aria-hidden={i !== active}
                inert={i !== active}
                style={{ '--slide-side': i < active ? -1 : 1 } as CSSProperties}
              >
                <Screenshot name={slide.image} alt={slide.title} compact />
              </div>
            ))}
          </div>
          <div className="story-stage-bottom">
            <strong>{item.title}</strong>
            <div className="story-pagination" aria-label={t('平台能力')}>
              {items.map((step, i) => (
                <button
                  key={step.title}
                  aria-label={step.title}
                  aria-current={i === active ? 'step' : undefined}
                  onClick={() =>
                    root.current
                      ?.querySelectorAll<HTMLElement>('[data-story-step]')
                      [i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="story-compact">
        <CapabilityTabs items={items} />
      </div>
    </div>
  );
}

/** Center-led, looping gallery. No autoplay; pointer, keyboard and touch share one selection. */
export function Showcase({
  items,
}: {
  items: { title: string; text: string; image: string; route: string }[];
}) {
  const { locale, t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);
  const id = useId();
  function select(index: number) {
    setSelected((index + items.length) % items.length);
  }
  function offset(index: number) {
    const relative = (index - selected + items.length) % items.length;
    return relative > items.length / 2 ? relative - items.length : relative;
  }
  return (
    <div className="center-gallery">
      <div className="gallery-toolbar">
        <span>{t('浏览平台界面示意')}</span>
        <div className="gallery-arrows">
          <span className="mono" aria-hidden>
            {String(selected + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <button
            aria-label={t('往左浏览')}
            aria-controls={id}
            onClick={() => select(selected - 1)}
          >
            <Icon name="left" size={20} />
          </button>
          <button
            aria-label={t('往右浏览')}
            aria-controls={id}
            onClick={() => select(selected + 1)}
          >
            <Icon name="right" size={20} />
          </button>
        </div>
      </div>
      <div
        className="gallery-stage"
        id={id}
        tabIndex={0}
        role="group"
        aria-label={t('概念界面')}
        onKeyDown={(event) => {
          if ((event.target as HTMLElement).closest('dialog')) return;
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            select(selected - 1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            select(selected + 1);
          }
          if (event.key === 'Home') {
            event.preventDefault();
            select(0);
          }
          if (event.key === 'End') {
            event.preventDefault();
            select(items.length - 1);
          }
        }}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          swipe.current = { x: event.clientX, y: event.clientY };
          moved.current = false;
        }}
        onPointerMove={(event) => {
          if (swipe.current && Math.abs(event.clientX - swipe.current.x) > 12) moved.current = true;
        }}
        onPointerUp={(event) => {
          if (!swipe.current) return;
          const dx = event.clientX - swipe.current.x,
            dy = event.clientY - swipe.current.y;
          swipe.current = null;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25)
            select(selected + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          swipe.current = null;
          moved.current = false;
        }}
        onPointerLeave={() => {
          swipe.current = null;
        }}
        onClickCapture={(event) => {
          if (moved.current) {
            event.preventDefault();
            event.stopPropagation();
            moved.current = false;
          }
        }}
      >
        {items.map((item, i) => {
          const position = offset(i);
          return (
            <article
              className="gallery-card"
              key={item.route}
              data-active={i === selected}
              data-near={Math.abs(position) <= 1}
              style={
                {
                  '--card-offset': position,
                  '--card-distance': Math.abs(position),
                } as CSSProperties
              }
            >
              <div
                className="gallery-card-content"
                inert={i !== selected}
                aria-hidden={i !== selected}
              >
                <div className="gallery-card-top">
                  <span className="mono">{String(i + 1).padStart(2, '0')} / DATAHARBOR</span>
                  <Icon name="out" size={17} />
                </div>
                <Screenshot name={item.image} alt={item.title} compact />
                <div className="gallery-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <a href={href(locale, item.route)} className="text-link">
                  {t('查看详情 ↗')}
                </a>
              </div>
              {i !== selected && Math.abs(position) === 1 && (
                <button
                  className="gallery-select"
                  aria-label={item.title}
                  onClick={() => select(i)}
                  tabIndex={-1}
                />
              )}
            </article>
          );
        })}
      </div>
      <div className="gallery-dots" aria-label={t('概念界面')}>
        {items.map((item, i) => (
          <button
            key={item.route}
            aria-label={item.title}
            aria-pressed={i === selected}
            onClick={() => select(i)}
          >
            <span />
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {selected + 1} / {items.length} · {items[selected].title}
      </p>
    </div>
  );
}
export function ReturnTop({ floating = false }: { floating?: boolean }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!floating) return;
    const update = () => setVisible(window.scrollY > Math.max(500, window.innerHeight * 0.85));
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [floating]);
  return (
    <button
      type="button"
      className={floating ? 'floating-top' : 'inline-top'}
      data-visible={floating ? visible : undefined}
      aria-label={t('返回顶部')}
      aria-hidden={floating ? !visible : undefined}
      inert={floating ? !visible : undefined}
      style={
        floating
          ? {
              backdropFilter: 'blur(24px) saturate(125%)',
              WebkitBackdropFilter: 'blur(24px) saturate(125%)',
            }
          : undefined
      }
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        })
      }
    >
      {floating && <Icon name="up" size={21} />}
      <span>{t('返回顶部')}</span>
      {!floating && <Icon name="up" size={14} />}
    </button>
  );
}
