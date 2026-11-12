import type { Locale, Translator } from '@/i18n/core';
import { href } from '@/i18n/core';
import { Icon } from './Icon';
export function PricingCards({ locale, t }: { locale: Locale; t: Translator }) {
  const plans = [
    {
      title: '单机标准版',
      kind: '集中部署',
      description: '从一台设备开始，把企业资料和日常协作集中起来。',
      icon: 'server',
      anchor: 'single-inquiry',
      items: [
        '1 台一体机的部署形态',
        '按数据容量与使用规模评估配置',
        '按业务需要确认模块开通范围',
        '明确备份、安装与运维交接要求',
      ],
    },
    {
      title: '双机高可用集群版',
      kind: '连续性规划',
      description: '围绕业务连续性，规划节点冗余与故障切换。',
      icon: 'layers',
      anchor: 'cluster-inquiry',
      items: [
        '2 台服务器的部署形态',
        '按连续性目标评估节点与网络',
        '按实际方案确认切换与授权规则',
        '明确备份、验证与交付验收范围',
      ],
    },
  ];
  return (
    <>
      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <article
            className={`pricing-card ${i ? 'pricing-dark' : ''}`}
            key={plan.title}
            data-reveal
          >
            <div className="pricing-card-top">
              <Icon name={plan.icon} size={28} />
              <span className="tag">{t(plan.kind)}</span>
            </div>
            <h3>{t(plan.title)}</h3>
            <p className="pricing-description">{t(plan.description)}</p>
            <div className="pricing-amount">
              <strong>{t('联系咨询')}</strong>
              <span>{t('按硬件配置、授权范围与交付要求评估报价')}</span>
            </div>
            <p className="eyebrow">{t('方案评估范围')}</p>
            <ul>
              {plan.items.map((text) => (
                <li key={text}>
                  <Icon name="check" size={16} />
                  {t(text)}
                </li>
              ))}
            </ul>
            <a
              className={`button ${i ? 'button-white' : 'button-brand'}`}
              href={href(locale, `/pricing/#${plan.anchor}`)}
            >
              {t('咨询')}
              {t(plan.title)}
              <Icon name="out" size={15} />
            </a>
          </article>
        ))}
      </div>
      <div className="analytics-option" data-reveal>
        <div className="icon-box">
          <Icon name="chart" size={25} />
        </div>
        <div>
          <p className="eyebrow">{t('独立选配')}</p>
          <h3>{t('外置数据分析服务器')}</h3>
          <p>{t('需要隔离分析与办公资源时，单独评估算力、只读接入和数据授权范围。')}</p>
        </div>
        <a className="text-link" href={href(locale, '/pricing/#analysis-inquiry')}>
          {t('咨询选配费用')}
          <Icon name="out" size={16} />
        </a>
      </div>
      <p className="fine-print">
        {t('正式价格与授权条款待确认；以上为方案评估范围，具体交付内容以最终确认方案为准。')}
      </p>
    </>
  );
}
