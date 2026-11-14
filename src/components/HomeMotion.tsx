'use client';
import { sitePath } from '@/lib/site-path';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLanguage } from '@/i18n/context';
import { Screenshot } from './Interactions';
import { Icon } from './Icon';

const keyboardRows: [string, number?, string?][][] = [
  [
    ['esc', 1.2],
    ['☀|F1'],
    ['☼|F2'],
    ['▦|F3'],
    ['⌕|F4'],
    ['♩|F5'],
    ['☾|F6'],
    ['◀◀|F7'],
    ['▶Ⅱ|F8'],
    ['▶▶|F9'],
    ['◁|F10'],
    ['◀|F11'],
    ['◀))|F12'],
    ['◉', 1, 'touch-id'],
  ],
  [
    ['~|`'],
    ['!|1'],
    ['@|2'],
    ['#|3'],
    ['$|4'],
    ['%|5'],
    ['^|6'],
    ['&|7'],
    ['*|8'],
    ['(|9'],
    [')|0'],
    ['_|-'],
    ['+|='],
    ['delete', 1.5],
  ],
  [
    ['tab', 1.5],
    ['Q'],
    ['W'],
    ['E'],
    ['R'],
    ['T'],
    ['Y'],
    ['U'],
    ['I'],
    ['O'],
    ['P'],
    ['{|['],
    ['}|]'],
    ['\\|\\'],
  ],
  [
    ['caps lock', 1.8],
    ['A'],
    ['S'],
    ['D'],
    ['F'],
    ['G'],
    ['H'],
    ['J'],
    ['K'],
    ['L'],
    [':|;'],
    ['"|\x27'],
    ['return', 1.8],
  ],
  [
    ['shift', 2.3],
    ['Z'],
    ['X'],
    ['C'],
    ['V'],
    ['B'],
    ['N'],
    ['M'],
    ['<|,'],
    ['>|.'],
    ['?|/'],
    ['shift', 2.3],
  ],
  [
    ['fn|◎'],
    ['⌃|control'],
    ['⌥|option'],
    ['⌘|command', 1.25],
    ['', 5.3],
    ['⌘|command', 1.25],
    ['⌥|option'],
    ['arrows', 2.4, 'arrow-key'],
  ],
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

export function NotebookHero({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const machine = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = root.current,
      text = copy.current,
      laptop = machine.current;
    if (!section || !text || !laptop) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let textBottom = 0;
    function measure() {
      textBottom = text!.offsetTop + text!.offsetHeight;
      update();
    }
    function paint() {
      frame = 0;
      const width = document.documentElement.clientWidth,
        height = innerHeight;
      const box = section!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > height) return;
      const p = clamp(-box.top / Math.max(1, box.height - height));
      const center = smooth(p / 0.18),
        unfold = smooth((p - 0.12) / 0.73),
        mobile = width <= 900;
      const mobileY = Math.max(textBottom + 24, height * 0.43);
      const startScale = mobile
        ? Math.min((width - 32) / 1000, Math.max(170, height - mobileY - 65) / 1045)
        : Math.min((width * 0.43) / 1000, (height - 155) / 1045, 0.62);
      const endScale = Math.min(
        (width - (mobile ? 24 : 100)) / 1000,
        (height - (mobile ? 190 : 160)) / 625,
        1.18
      );
      const startX = mobile ? (width - 1000 * startScale) / 2 : width * 0.76 - 500 * startScale;
      const centerX = (width - 1000 * startScale) / 2;
      const initialY = mobile ? mobileY : (height - 1045 * startScale) / 2 + 34;
      const centerY = mobile ? Math.max(110, (height - 1045 * startScale) / 2 + 38) : initialY;
      const finalX = (width - 1000 * endScale) / 2,
        finalY = (height - 625 * endScale) / 2 + 25;
      const scale = reduced.matches ? startScale : startScale + (endScale - startScale) * unfold;
      const x = reduced.matches
        ? startX
        : (startX + (centerX - startX) * center) * (1 - unfold) + finalX * unfold;
      const y = reduced.matches
        ? initialY
        : (initialY + (centerY - initialY) * center) * (1 - unfold) + finalY * unfold;
      laptop!.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      section!.style.setProperty('--nh-center', String(reduced.matches ? 0 : center));
      section!.style.setProperty('--nh-unfold', String(reduced.matches ? 0 : unfold));
      section!.style.setProperty(
        '--nh-copy-opacity',
        String(reduced.matches ? 1 : clamp(1 - p / 0.11))
      );
      text!.inert = !reduced.matches && p > 0.115;
      text!.setAttribute('aria-hidden', String(text!.inert));
    }
    function update() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    observer.observe(section);
    measure();
    paint();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', measure);
    reduced.addEventListener('change', update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener('scroll', update);
      removeEventListener('resize', measure);
      reduced.removeEventListener('change', update);
    };
  }, []);
  return (
    <section className="notebook-hero" ref={root}>
      <div className="nh-pin">
        <div className="hero-aura" aria-hidden />
        <div className="hero-grid" aria-hidden />
        <div className="nh-copy" ref={copy}>
          {children}
        </div>
        <p className="nh-caption">{t('产品工作台 · 概念界面示意')}</p>
        <div className="nh-laptop" ref={machine}>
          <div className="nh-display">
            <Screenshot name="workspace" alt={t('企业数据平台工作台概念界面')} />
          </div>
          <div className="nh-keyboard-base" aria-hidden="true">
            <div className="nh-hinge" />
            <div className="nh-speaker nh-speaker-left" />
            <div className="nh-speaker nh-speaker-right" />
            <div className="nh-keyboard-bed">
              <div className="nh-keys">
                {keyboardRows.map((row, i) => (
                  <div className={`nh-key-row nh-key-row-${i}`} key={i}>
                    {row.map(([label, weight = 1, kind = ''], j) => (
                      <div
                        key={j}
                        className={`nh-key ${kind ? `nh-${kind}` : ''}`}
                        style={{ flex: weight }}
                      >
                        {kind === 'arrow-key' ? (
                          <>
                            <span className="nh-arrow-up">▲</span>
                            <span className="nh-arrow-down">◀　▼　▶</span>
                          </>
                        ) : (
                          label.split('|').map((part, k) => <span key={k}>{part}</span>)
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="nh-trackpad" />
            <div className="nh-front-notch" />
          </div>
        </div>
        <div className="nh-foot">
          <span className="nh-scroll-cue" aria-hidden="true">
            <i />↓
          </span>
          <span>{t('产品工作台 · 概念界面示意')}</span>
          <span className="mono">DATAHARBOR / WORKSPACE</span>
        </div>
      </div>
    </section>
  );
}

type ModulePreview = { id: string; title: string; category: string; image: string; url: string };
export function ModuleParallax({
  items,
  title,
  description,
  children,
}: {
  items: ModulePreview[];
  title: string;
  description: string;
  children: ReactNode;
}) {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const media = matchMedia(
      '(min-width: 901px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'
    );
    let frame = 0;
    function paint() {
      frame = 0;
      if (!media.matches) return;
      const box = el!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) return;
      const progress = clamp((76 - box.top) / Math.max(1, box.height - (innerHeight - 76)));
      rows.current.forEach((row, i) => {
        if (!row || row.contains(document.activeElement)) return;
        row.scrollLeft = (row.scrollWidth - row.clientWidth) * (i % 2 ? 1 - progress : progress);
      });
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
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener('change', configure);
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);
  return (
    <section className="module-parallax" data-enhanced={enhanced} ref={root}>
      <div className="mp-sticky">
        <div className="container mp-heading">
          <div>
            <p className="eyebrow">{t('能力矩阵')}</p>
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
        </div>
        <div className={`mp-wall${enhanced ? ' container' : ''}`}>
          {[0, 1, 2].map((row) => (
            <div
              className="mp-row"
              key={row}
              ref={(el) => {
                rows.current[row] = el;
              }}
            >
              {items.slice(row * 5, row * 5 + 5).map((item) => (
                <a className="mp-card" href={item.url} key={item.id}>
                  <img
                    src={sitePath(`/media/screens/${item.image}-720.webp`)}
                    decoding="async"
                    alt={item.title}
                    width={1440}
                    height={930}
                    loading="lazy"
                  />
                  <div className="mp-card-label">
                    <div>
                      <span>{item.category}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <Icon name="out" size={16} />
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="container mp-action">{children}</div>
      </div>
    </section>
  );
}
