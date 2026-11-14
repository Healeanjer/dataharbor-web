'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/context';

const companies = [
  ['示例集团', 'GROUP'],
  ['示例科技', 'TECHNOLOGY'],
  ['示例制造', 'INDUSTRIES'],
  ['示例能源', 'ENERGY'],
  ['示例物流', 'LOGISTICS'],
  ['示例服务', 'SERVICES'],
  ['示例建设', 'ENGINEERING'],
  ['示例研究院', 'RESEARCH'],
  ['示例医疗', 'HEALTHCARE'],
  ['示例教育', 'EDUCATION'],
  ['示例通信', 'NETWORKS'],
  ['示例商业', 'COMMERCE'],
];
const marks = [
  'M5 29V11l13-6 13 6v18l-13 6Z M5 11l13 7 13-7 M18 18v17',
  'M6 30 18 6l12 24Z M11 22h14 M18 6v24',
  'M5 10h10v10H5Z M21 10h10v10H21Z M13 24h10v10H13Z',
  'M21 4 8 22h10l-3 14 14-20H19Z',
  'M4 13h19v15H4Z M23 18h6l4 6v4H23 M8 28a3 3 0 1 0 6 0 M25 28a3 3 0 1 0 6 0',
  'M6 18a12 12 0 0 1 24 0 M6 18v10h5V18Z M25 18h5v10h-5Z M25 30l-7 4',
  'M5 32V15l13-9 13 9v17 M12 32V20h12v12 M2 32h32',
  'M11 5h14 M15 5v12L6 31q-1 3 3 3h18q4-1 1-4l-9-13V5 M11 25h14',
  'M13 5h10v9h9v10h-9v9H13v-9H4V14h9Z',
  'M3 13 18 6l15 7-15 8Z M9 17v11q9 7 18 0V17 M33 13v15',
  'M18 7v24 M6 19h24 M5 6l26 26 M31 6 5 32 M12 19a6 6 0 1 0 12 0 6 6 0 1 0-12 0',
  'M6 13h24l-2 20H8Z M12 13V9a6 6 0 0 1 12 0v4',
];

export function PartnerLogos() {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className="partner-logos"
      ref={root}
      data-paused={paused || !visible}
      aria-labelledby="partner-logo-title"
    >
      <div className="container">
        <div className="partner-logo-heading">
          <div>
            <div className="partner-logo-title-row">
              <h2 id="partner-logo-title">{t('客户与合作伙伴')}</h2>
              <span className="partner-demo-badge">{t('占位演示')}</span>
            </div>
            <p>{t('示例标识，仅展示排版与动效，正式名单确认后替换。')}</p>
          </div>
          <button
            type="button"
            className="partner-pause"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
          >
            <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
            {t(paused ? '继续滚动' : '暂停滚动')}
          </button>
        </div>
        <div className="partner-logo-window">
          {[0, 1].map((row) => (
            <div className={`partner-logo-track partner-logo-row-${row}`} key={row}>
              {[0, 1].map((copy) => (
                <ul
                  className="partner-logo-group"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {companies.slice(row * 6, row * 6 + 6).map(([name, label], index) => (
                    <li className="partner-logo" key={name}>
                      <svg
                        viewBox="0 0 38 40"
                        width="40"
                        height="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={marks[row * 6 + index]} />
                      </svg>
                      <span>
                        <strong>{t(name)}</strong>
                        <small>DEMO / {label}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
