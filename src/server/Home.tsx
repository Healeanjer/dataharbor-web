import { modules, moduleImage, moduleRoute, solutions } from '@/lib/catalog';
import { href, type Locale, type Translator } from '@/i18n/core';
import { Action, Section } from '@/components/Primitives';
import { NotebookHero, ModuleParallax } from '@/components/HomeMotion';
import { Accordion, Count } from '@/components/Interactions';
import { DataSphere } from '@/components/DataSphere';
import { Icon } from '@/components/Icon';
import { Architecture } from '@/components/Diagrams';
import { WorkflowJourney } from '@/components/WorkflowJourney';

export function Home({ locale, t }: { locale: Locale; t: Translator }) {
  return (
    <div className="home-preview">
      <NotebookHero>
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="status-dot" />
            {t('私有化部署 · 企业数据管理平台')}
          </p>
          <p className="hero-wordmark">DATAHARBOR</p>
          <h1>{t('把企业的数据，管在自己机房里')}</h1>
          <p className="hero-description">
            {t(
              '把分散的文档、合同、邮件附件和档案集中起来，让资料从协作、归档到外发和审计都有迹可循。'
            )}
          </p>
          <div className="button-row">
            <Action locale={locale} route="/modules/">
              {t('浏览能力矩阵')}
            </Action>
            <Action locale={locale} route="/#workflow" secondary>
              {t('业务如何运转')}
            </Action>
          </div>
          <div className="hero-note">
            <Icon name="shield" size={16} />
            {t('资料始终在企业自己的边界内流转。')}
          </div>
        </div>
      </NotebookHero>
      <section className="trust-band" aria-label={t('从资料接入到安全流转')}>
        <div className="marquee-track" aria-hidden>
          {[0, 1].map((copy) => (
            <div key={copy}>
              {[
                '统一存储',
                '访问权限',
                '外发审批',
                '审计追溯',
                '档案保管',
                '系统接入',
                '资料归档',
                '知识复用',
              ].map((label) => (
                <span key={label}>
                  <i />
                  {t(label)}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">
          {[
            '统一存储',
            '访问权限',
            '外发审批',
            '审计追溯',
            '档案保管',
            '系统接入',
            '资料归档',
            '知识复用',
          ]
            .map(t)
            .join(' · ')}
        </p>
      </section>
      <div className="hp-facts">
        <div className="container">
          {[
            [15, '业务模块'],
            [4, '外发渠道'],
            [2, '主部署方案'],
          ].map(([value, label]) => (
            <div key={label}>
              <Count value={Number(value)} />
              <span>{t(String(label))}</span>
            </div>
          ))}
          <span className="hp-fact-note">
            <Icon name="shield" size={17} />
            {t('资料始终在企业自己的边界内流转。')}
          </span>
        </div>
      </div>
      <Section className="hp-needs" kicker={t('资料管理需求')} title={t('让每天的协作少一点分散')}>
        <div className="hp-need-grid">
          {[
            ['资料分散', '文件服务器、邮箱和个人电脑各有资料，交接时需要反复查找。'],
            ['流转难管', '资料经由分享、下载或邮件离开团队，需要明确处理规则。'],
            ['责任难查', '资料归谁维护、谁处理过，需要有连贯的记录。'],
          ].map(([title, text], i) => (
            <article data-reveal key={title}>
              <span className="mono">0{i + 1}</span>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="workflow"
        tone="mist"
        kicker={t('业务如何运转')}
        title={t('一份资料，贯穿业务全过程')}
        description={t('选择环节，查看资料如何流转。')}
      >
        <WorkflowJourney />
      </Section>
      <Section kicker={t('三个核心优势')} title={t('部署自主，管理有据')}>
        <div className="hp-strengths">
          {[
            [
              '部署在自己的机房',
              '围绕内网和离线环境规划部署，把资料留在企业自有环境中。',
              'server',
            ],
            ['统一数据与权限', '资料集中组织，业务模块沿用统一的访问管理规则。', 'layers'],
            ['全流程留痕', '从日常使用到外发和归档，连贯记录资料的处理过程。', 'shield'],
          ].map(([title, text, icon]) => (
            <article key={title} data-reveal>
              <div className="icon-box">
                <Icon name={icon} size={24} />
              </div>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="architecture"
        tone="night"
        className="hp-architecture"
        kicker={t('平台全景')}
        title={t('一套底座，连接日常业务')}
      >
        <Architecture t={t} />
        <div className="section-action">
          <Action locale={locale} route="/product/" secondary>
            {t('了解技术体系')}
          </Action>
        </div>
      </Section>
      <div className="hp-matrix-frame">
        <ModuleParallax
          title={t('按业务任务浏览 15 个模块')}
          description={t('从资料接入、业务协同，到知识复用与数据治理。')}
          items={modules.map((module) => ({
            id: module.id,
            title: t(module.title),
            category: t(module.groupTitle),
            image: moduleImage(module.id),
            url: href(locale, moduleRoute(module.id)),
          }))}
        >
          <Action locale={locale} route="/modules/">
            {t('浏览能力矩阵')}
          </Action>
        </ModuleParallax>
      </div>
      <Section
        tone="mist"
        className="hp-scenario-restore"
        kicker={t('解决方案')}
        title={t('从一件实际的工作出发')}
        description={t('选择场景，看看角色和资料如何在平台上衔接。')}
      >
        <div className="scenario-grid">
          {solutions.map((solution, i) => (
            <a
              key={solution.slug}
              className={`scenario-card scenario-${i}`}
              href={href(locale, `/solutions/${solution.slug}/`)}
              data-reveal
            >
              <span className="mono">0{i + 1} / SCENARIO</span>
              <h3>{t(solution.title)}</h3>
              <p>{t(solution.summary)}</p>
              <Icon name="out" size={21} />
            </a>
          ))}
        </div>
      </Section>
      <Section
        tone="mist"
        kicker={t('交付与选型')}
        title={t('按企业条件规划部署与投入')}
        description={t('正式报价按配置、授权范围与交付要求评估。')}
      >
        <div className="hp-plans">
          {[
            ['单机标准版', '集中部署', 'server'],
            ['双机高可用集群版', '连续性规划', 'layers'],
            ['外置数据分析服务器', '独立选配', 'chart'],
          ].map(([title, kind, icon]) => (
            <a key={title} href={href(locale, '/pricing/')} data-reveal>
              <span className="eyebrow">{t(kind)}</span>
              <Icon name={icon} size={25} />
              <h3>{t(title)}</h3>
              <span className="hp-consult">
                {t('联系咨询')}
                <Icon name="arrow" size={16} />
              </span>
            </a>
          ))}
        </div>
        <div className="section-action">
          <Action locale={locale} route="/deployment/">
            {t('了解交付与选型')}
          </Action>
          <Action locale={locale} route="/pricing/" secondary>
            {t('查看价格方案')}
          </Action>
        </div>
      </Section>
      <Section kicker={t('常见问题')} title={t('关于产品与部署')}>
        <Accordion
          items={[
            {
              q: t('平台部署在哪里？'),
              a: t('当前方案按企业自有机房部署设计，可在交付与选型页比较单机与双机。'),
            },
            {
              q: t('外发管控主要覆盖什么？'),
              a: t('概念设计覆盖外链、下载、打印和邮件等渠道，具体策略以确认后的业务规则为准。'),
            },
            {
              q: t('分析服务器怎么选？'),
              a: t('它是独立选配，适合需要隔离分析与办公业务资源的场景。'),
            },
          ]}
        />
      </Section>
      <section className="closing-section">
        <div className="container">
          <div className="closing-card">
            <div>
              <p className="eyebrow">{t('准备好下一步了吗？')}</p>
              <h2>{t('从自己的机房出发')}</h2>
              <p>{t('浏览能力矩阵与交付方案，了解平台如何适配企业的资料管理流程。')}</p>
              <div className="button-row">
                <Action locale={locale} route="/deployment/">
                  {t('了解交付与选型')}
                </Action>
                <Action locale={locale} route="/about/#service" secondary>
                  {t('服务咨询')}
                </Action>
              </div>
            </div>
            <DataSphere />
          </div>
        </div>
      </section>
    </div>
  );
}
