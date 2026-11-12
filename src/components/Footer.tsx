import { sitePath } from '@/lib/site-path';
import { href, type Locale, type Translator } from '@/i18n/core';
import { groups, solutions } from '@/lib/catalog';
import { Icon } from './Icon';
import { ReturnTop } from './Interactions';
const sections = [
  {
    title: '平台导航',
    links: [
      ['平台简介', '/'],
      ['技术体系', '/product/'],
      ['能力矩阵', '/modules/'],
      ['关于我们', '/about/'],
    ],
  },
  {
    title: '方案与部署',
    links: [
      ['解决方案', '/solutions/'],
      ['交付与选型', '/deployment/'],
      ['价格方案', '/pricing/'],
      ['单机与双机对比', '/deployment/#compare'],
      ['部署拓扑', '/deployment/#topology'],
    ],
  },
  {
    title: '常用能力',
    links: [
      ['内容安全与外发管控', '/security/'],
      ['企业知识库', '/modules/5.11/'],
      ['合同与法务管理', '/modules/5.12/'],
      ['工单系统', '/modules/5.2/'],
    ],
  },
  { title: '典型场景', links: solutions.map((s) => [s.title, `/solutions/${s.slug}/`]) },
];
export function Footer({ locale, t }: { locale: Locale; t: Translator }) {
  const channels = [
    { title: '商务咨询', description: '方案与报价沟通', qr: process.env.NEXT_PUBLIC_BUSINESS_QR },
    { title: '技术支持', description: '部署与使用沟通', qr: process.env.NEXT_PUBLIC_SUPPORT_QR },
    { title: '产品动态', description: '平台与能力更新', qr: process.env.NEXT_PUBLIC_UPDATES_QR },
  ];
  return (
    <footer id="service" className="site-footer">
      <div className="container">
        <div className="footer-invite">
          <div>
            <p className="eyebrow">{t('让数据连接业务，让管理有据可循')}</p>
            <h2>{t('规划适合企业的数据管理方案')}</h2>
            <p>{t('从业务需求、数据规模与机房条件出发，了解平台能力与部署选择。')}</p>
          </div>
          <div className="button-row">
            <a href={href(locale, '/pricing/')} className="button button-brand">
              {t('查看价格方案')}
              <Icon name="arrow" size={16} />
            </a>
            <a href={href(locale, '/deployment/')} className="button button-outline">
              {t('了解交付与选型')}
              <Icon name="out" size={16} />
            </a>
          </div>
        </div>
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href={href(locale)}>
              <img src={sitePath('/mark.svg')} alt="" width="38" height="38" />
              {t('企业数据平台')}
            </a>
            <p>
              {t(
                '把分散的企业资料归集在自己的机房，让日常协作、知识复用与安全流转落在同一套平台里。'
              )}
            </p>
            <div className="footer-tags">
              {[
                ['server', '私有化部署'],
                ['layers', '统一数据底座'],
                ['shield', '权限与留痕'],
              ].map(([icon, label]) => (
                <span key={label}>
                  <Icon name={icon} size={13} />
                  {t(label)}
                </span>
              ))}
            </div>
            <a className="text-link" href={href(locale, '/about/')}>
              {t('了解我们')}
              <Icon name="out" size={14} />
            </a>
          </div>
          <div className="footer-columns">
            {sections.map((section) => (
              <nav key={section.title} aria-label={t(section.title)}>
                <h3>{t(section.title)}</h3>
                <ul>
                  {section.links.map(([label, route]) => (
                    <li key={route}>
                      <a href={href(locale, route)}>{t(label)}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <section className="footer-channels" aria-labelledby="contact-title">
          <div>
            <h3 id="contact-title">{t('与我们保持联系')}</h3>
            <p>
              {t('商务、技术与平台动态，按你的需要选择沟通渠道。')}
              <br />
              {t('正式联系方式与服务二维码待补充。')}
            </p>
            <div className="footer-contact-links">
              <a href={href(locale, '/about/#company')}>{t('公司与资质')} ↗</a>
              <a href={href(locale, '/about/#service')}>{t('联系与服务')} ↗</a>
            </div>
          </div>
          <div className="channel-list">
            {channels.map((channel) => (
              <figure key={channel.title}>
                {channel.qr ? (
                  <img
                    src={sitePath(channel.qr)}
                    width="66"
                    height="66"
                    alt={`${t(channel.title)}${t('二维码')}`}
                  />
                ) : (
                  <div className="qr-placeholder" aria-label={t('二维码待配置')}>
                    <Icon name="qr" size={29} />
                  </div>
                )}
                <figcaption>
                  <strong>{t(channel.title)}</strong>
                  <span>{t(channel.description)}</span>
                  {!channel.qr && <small>{t('二维码待配置')}</small>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <div className="footer-legal">
          <div className="footer-legal-main">
            <span>
              © {new Date().getFullYear()} {t('企业数据平台')}
            </span>
            <nav aria-label={t('法律条款')}>
              <a href={href(locale, '/privacy/')}>{t('隐私政策')}</a>
              <a href={href(locale, '/terms/')}>{t('用户协议')}</a>
              <small>{t('正式文本待补充')}</small>
              <ReturnTop />
            </nav>
          </div>
          <div className="footer-registration">
            <div>
              <span>{t('ICP备案：备案号待补充')}</span>
              <span>{t('公安联网备案：备案号及链接待确认')}</span>
            </div>
            <span>{t('官网概念预览 · 正式企业信息待补充')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
