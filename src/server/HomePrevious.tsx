import { modules, principles, moduleRoute, solutions, moduleImage } from '@/lib/catalog';
import { href, type Locale, type Translator } from '@/i18n/core';
import { Icon } from '@/components/Icon';
import { Action, Section } from '@/components/Primitives';
import { Architecture } from '@/components/Diagrams';
import { NotebookHero, ModuleParallax } from '@/components/HomeMotion';
import { Accordion, ScrollStory, Count, Showcase } from '@/components/Interactions';
import { PricingCards } from '@/components/Pricing';
import { DataSphere } from '@/components/DataSphere';
export function HomePrevious({ locale, t }: { locale: Locale; t: Translator }) {
  const tabs = [
    [
      '资料集中管理',
      '将日常协作产生的文件纳入统一的存储与访问管理。',
      'workspace',
      '/modules/5.5/',
    ],
    [
      '外发有规则，处理有记录',
      '按外发渠道与内容策略设计审批，保留处理过程。',
      'security',
      '/security/',
    ],
    [
      '把经验变成可复用的知识',
      '通过目录、条目和源文件关系沉淀资料。',
      'knowledge',
      '/modules/5.11/',
    ],
    [
      '合同进度和关键节点集中查看',
      '围绕台账、版本和到期提醒梳理合同资料。',
      'contracts',
      '/modules/5.12/',
    ],
    ['业务资料有序归档', '按分类整理并管理档案的保管与调阅。', 'archives', '/modules/5.16/'],
  ];
  return (
    <div className="experience-home">
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
              {t('试用产品')}
            </Action>
            <Action locale={locale} route="/product/" secondary>
              {t('了解技术体系')}
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
      <div className="container stats-strip">
        {[
          [15, '业务模块', '覆盖从存储接入到业务治理'],
          [4, '外发渠道', '外链、下载、打印与邮件的策略设计'],
          [2, '主部署方案', '单机集中部署与双机高可用规划'],
        ].map(([value, title, desc]) => (
          <div key={title as string}>
            <Count value={value as number} />
            <div>
              <strong>{t(title as string)}</strong>
              <p>{t(desc as string)}</p>
            </div>
          </div>
        ))}
      </div>
      <Section
        kicker={t('资料管理需求')}
        title={t('让每天的协作少一点分散')}
        description={t('从资料接入、业务协同，到安全流转。')}
      >
        <div className="pain-grid">
          {[
            ['资料分散', '文件服务器、邮箱和个人电脑各有资料，交接时需要反复查找。'],
            ['流转难管', '资料经由分享、下载或邮件离开团队，需要明确处理规则。'],
            ['责任难查', '资料归谁维护、谁处理过，需要有连贯的记录。'],
          ].map(([title, text], i) => (
            <article key={title} data-reveal>
              <span className="mono">0{i + 1}</span>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        tone="mist"
        kicker={t('平台能力')}
        title={t('从资料归集到安全流转')}
        description={t('同一套资料管理规则贯穿业务与治理。')}
      >
        <ScrollStory
          items={tabs.map(([title, description, image, route]) => ({
            title: t(title),
            description: t(description),
            image,
            route,
          }))}
        />
      </Section>
      <Section kicker={t('六个产品方向')} title={t('把数据管理规则落在整个平台里')}>
        <div className="principle-grid">
          {principles.map((item, i) => (
            <article key={item.title} data-reveal>
              <div>
                <span className="mono">0{i + 1}</span>
                <Icon
                  name={['server', 'shield', 'network', 'folder', 'layers', 'chart'][i]}
                  size={24}
                />
              </div>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="architecture"
        tone="night"
        className="architecture-chapter"
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
      <Section
        tone="mist"
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
        className="showcase-chapter"
        kicker={t('概念界面')}
        title={t('浏览平台界面示意')}
        description={t('以下画面取自当前交接包的产品原型。')}
      >
        <Showcase
          items={[
            {
              title: t('外发管控'),
              text: t('外发申请与审批'),
              image: 'security',
              route: '/security/',
            },
            {
              title: t('工单系统'),
              text: t('从提交工单、分派和处理，到查阅处理记录。'),
              image: 'tickets',
              route: '/modules/5.2/',
            },
            {
              title: t('企业知识库'),
              text: t('把经验变成可复用的知识'),
              image: 'knowledge',
              route: '/modules/5.11/',
            },
            {
              title: t('合同与法务管理'),
              text: t('围绕合同版本和意见组织审核记录。'),
              image: 'contracts',
              route: '/modules/5.12/',
            },
            {
              title: t('电子档案管理'),
              text: t('把资料收集、编目和利用串成一条流程。'),
              image: 'archives',
              route: '/modules/5.16/',
            },
          ]}
        />
      </Section>
      <Section
        id="pricing"
        tone="mist"
        kicker={t('价格方案')}
        title={t('选择部署方案，按需评估投入')}
        description={t('从单机集中部署，到双机高可用规划；独立分析资源可按需选配。')}
      >
        <PricingCards locale={locale} t={t} />
        <div className="section-action">
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
                <Action locale={locale} route="/modules/">
                  {t('浏览能力矩阵')}
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
