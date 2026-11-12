import {
  groups,
  modules,
  details,
  moduleImage,
  moduleRoute,
  relationships,
  solutions,
  type Solution,
} from '@/lib/catalog';
import { href, type Locale, type Translator } from '@/i18n/core';
import {
  Action,
  Breadcrumb,
  FeatureGrid,
  PageIntro,
  Section,
  StepList,
} from '@/components/Primitives';
import { Icon } from '@/components/Icon';
import { Accordion, Screenshot } from '@/components/Interactions';
import { Architecture, Topologies } from '@/components/Diagrams';
import { PricingCards } from '@/components/Pricing';
type Common = { locale: Locale; t: Translator };

function Comparison({
  headers,
  rows,
  label,
  t,
}: {
  headers: string[];
  rows: string[][];
  label: string;
  t: Translator;
}) {
  return (
    <div className="table-scroll" role="region" aria-label={t(label)} tabIndex={0}>
      <table>
        <caption className="sr-only">{t(label)}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {t(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, ...values]) => (
            <tr key={name}>
              <th scope="row">{t(name)}</th>
              {values.map((value, i) => (
                <td key={i}>{t(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Technology({ locale, t }: Common) {
  return (
    <>
      <PageIntro
        kicker={t('技术体系')}
        title={t('让业务与资料，落在同一套平台里')}
        description={t(
          '把企业文档、邮件资料、会议素材、工单附件、合同和档案纳入统一的存储与权限体系，在同一底座上开展协作、归档和安全治理。'
        )}
        visual={<Screenshot name="workspace" alt={t('企业数据平台工作台概念界面')} compact />}
      >
        <Action locale={locale} route="/product/#architecture">
          {t('查看平台架构')}
        </Action>
        <Action locale={locale} route="/modules/" secondary>
          {t('浏览能力矩阵')}
        </Action>
      </PageIntro>
      <Section
        id="architecture"
        kicker={t('平台架构')}
        title={t('从资料接入到业务使用')}
        description={t('统一组织资料、访问规则与业务记录。')}
      >
        <Architecture t={t} />
      </Section>
      <Section id="flow" tone="mist" kicker={t('资料流转')} title={t('一份资料如何走完整个过程')}>
        <StepList
          t={t}
          items={[
            ['接入归集', '通过文件共享、业务附件或系统网关接收资料。'],
            ['业务使用', '关联项目、客户、合同等业务记录。'],
            ['整理保管', '按目录、版本和保留要求整理归档。'],
            ['受控流转', '按外发规则处理申请，并保留审计记录。'],
          ]}
        />
      </Section>
      <Section id="governance" kicker={t('统一治理')} title={t('把访问规则放进业务过程')}>
        <FeatureGrid
          t={t}
          items={[
            ['统一身份与权限', '按角色与资料范围组织访问，业务模块沿用同一套权限体系。'],
            ['分类与责任', '通过数据资产目录整理分类、责任归属和来源。'],
            ['出口与留痕', '围绕外链、下载、打印和邮件设计出口策略、审批与操作记录。'],
          ]}
        />
      </Section>
      <Section
        id="ai"
        tone="mist"
        kicker={t('AI 可选配置')}
        title={t('按自己的条件选择 AI')}
        description={t('AI 是可选配置。具体能力和接入范围随产品及部署方案确认。')}
      >
        <div className="ai-grid">
          {[
            ['关闭', '出厂默认状态，按平台业务流程管理资料。'],
            ['平台内置', '按交付配置启用平台提供的 AI 能力。'],
            ['企业自有模型', '按企业环境对接已有模型服务。'],
            ['用户自配', '按授权与配置范围接入用户选择的服务。'],
          ].map(([title, text], i) => (
            <article key={title} data-reveal>
              <span className={`ai-indicator ${i === 0 ? 'ai-default' : ''}`}>
                {String(i).padStart(2, '0')}
              </span>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </article>
          ))}
        </div>
        <p className="fine-print">
          {t('本地模型服务需要匹配的推理算力。模型与分析资源的配置，应结合企业现有环境单独评估。')}
        </p>
      </Section>
      <Section
        id="technology"
        kicker={t('技术底座')}
        title={t('面向私有化部署的技术方案')}
        description={t('以下为交接资料中的平台产品技术设计。')}
      >
        <FeatureGrid
          t={t}
          items={[
            ['业务服务', 'Go 业务服务，围绕单机与双机部署组织服务。'],
            ['产品前端', 'Vue 3 与 TypeScript，统一组件和界面规范。'],
            ['存储', '分布式对象存储，按节点和容量规划副本与保管策略。'],
            ['数据库', 'MariaDB 与 openGauss 两类方案，按部署环境评估。'],
            ['容器部署', '以容器组织组件，结合业务资源优先级安排任务。'],
            ['离线任务', '统一调度后台任务，按时间或事件触发。'],
          ]}
        />
      </Section>
      <Section
        id="components"
        tone="mist"
        kicker={t('开源组件管理')}
        title={t('让交付材料可以核对')}
      >
        <div className="prose">
          <p>
            {t(
              '产品设计将自研业务与第三方组件分别组织，通过清晰的服务接口协同。部署方案需说明组件的用途、版本和接入关系。'
            )}
          </p>
          <p>
            {t(
              '随交付准备开源组件清单与对应许可证，便于客户核对使用条件。正式的组件范围与授权材料将在交付前确认。'
            )}
          </p>
        </div>
        <div className="section-action">
          <Action locale={locale} route="/deployment/">
            {t('了解交付与选型')}
          </Action>
        </div>
      </Section>
    </>
  );
}
export function ModuleDirectory({ locale, t }: Common) {
  return (
    <>
      <PageIntro
        kicker={t('能力矩阵')}
        title={t('按业务任务浏览模块')}
        description={t('从资料接入、业务协同，到知识复用与数据治理，找到你需要的能力。')}
      >
        <Action locale={locale} route="/product/" secondary>
          {t('了解技术体系')}
        </Action>
      </PageIntro>
      <div className="category-bar">
        <nav className="container" aria-label={t('模块分组')}>
          {groups.map((group, i) => (
            <a href={`#${group.id}`} key={group.id}>
              <span>0{i + 1}</span>
              {t(group.title)}
            </a>
          ))}
        </nav>
      </div>
      {groups.map((group, i) => (
        <Section
          key={group.id}
          id={group.id}
          tone={i % 2 ? 'mist' : 'white'}
          kicker={`0${i + 1}`}
          title={t(group.title)}
        >
          <div className="module-directory">
            {group.modules.map((module) => (
              <article key={module.id} className="module-card" data-reveal>
                <div className="module-card-top">
                  <Icon name={['server', 'layers', 'book', 'shield'][i]} size={25} />
                  <span className="mono">{module.id}</span>
                </div>
                <h3>{t(module.title)}</h3>
                <p>{t(module.description)}</p>
                <a
                  href={href(locale, moduleRoute(module.id))}
                  className="text-link"
                  aria-label={`${t('查看')}${t(module.title)}${t('详情')}`}
                >
                  {t('查看详情 ↗')}
                </a>
              </article>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
export function ModuleDetail({ locale, t, id }: Common & { id: string }) {
  const module = modules.find((m) => m.id === id)!;
  const detail = details[id];
  const index = modules.findIndex((m) => m.id === id);
  const related = relationships[id];
  return (
    <>
      <PageIntro
        kicker={`${t(module.groupTitle)} · ${id}`}
        title={t(module.title)}
        description={t(
          id === '5.15'
            ? '把外发申请、审批处理和操作记录放进同一条链路，帮助管理员看清资料如何离开组织。'
            : module.description
        )}
        breadcrumb={
          <Breadcrumb
            label={t('面包屑')}
            items={[
              { text: t('能力矩阵'), url: href(locale, '/modules/') },
              { text: t(module.groupTitle), url: href(locale, `/modules/#${module.groupId}`) },
              { text: t(module.title) },
            ]}
          />
        }
        visual={
          <Screenshot name={moduleImage(id)} alt={`${t(module.title)}${t('概念界面')}`} compact />
        }
      >
        <Action locale={locale} route={`${moduleRoute(id)}#process`}>
          {t('查看使用流程')}
        </Action>
        <Action locale={locale} route={`/modules/#${module.groupId}`} secondary>
          {t('返回能力矩阵')}
        </Action>
      </PageIntro>
      <Section
        kicker={t('核心能力')}
        title={t(id === '5.15' ? '按出口定义处理方式' : '这个模块能做什么')}
        description={
          id === '5.15'
            ? t('下列四类出口来自概念设计，实际通道和策略以确认后的范围为准。')
            : undefined
        }
      >
        <FeatureGrid items={detail.capabilities} t={t} />
      </Section>
      <Section id="process" tone="mist" kicker={t('流程示意')} title={t('典型使用流程')}>
        <StepList items={detail.workflow} t={t} />
      </Section>
      <Section kicker={t('平台协同')} title={t('这个模块如何与平台连接')}>
        <div className="connection-panel">
          <div className="icon-box">
            <Icon name="network" size={28} />
          </div>
          <p>{t(related.text)}</p>
          <div className="related-links">
            {related.related.map((relatedId) => {
              const entry = modules.find((m) => m.id === relatedId)!;
              return (
                <a href={href(locale, moduleRoute(relatedId))} key={relatedId}>
                  {t(entry.title)}
                  <Icon name="out" size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </Section>
      <Section tone="mist" kicker={t('产品说明')} title={t('适用场景与常见问题')}>
        <Accordion
          items={[
            { q: t('适合哪些团队或场景？'), a: t(module.audience) },
            { q: t(detail.question), a: t(detail.answer) },
            ...(id === '5.15'
              ? [
                  {
                    q: t('水印如何配置？'),
                    a: t('概念资料包含策略和模板配置，实际渲染方式和适用范围待确认。'),
                  },
                ]
              : []),
          ]}
        />
      </Section>
      <nav className="container module-pagination" aria-label={t('相邻模块')}>
        {index > 0 ? (
          <a href={href(locale, moduleRoute(modules[index - 1].id))}>
            <span>{t('← 上一个模块')}</span>
            <strong>{t(modules[index - 1].title)}</strong>
          </a>
        ) : (
          <span />
        )}
        {index < modules.length - 1 && (
          <a className="next-module" href={href(locale, moduleRoute(modules[index + 1].id))}>
            <span>{t('下一个模块 →')}</span>
            <strong>{t(modules[index + 1].title)}</strong>
          </a>
        )}
      </nav>
    </>
  );
}
export function SolutionDirectory({ locale, t }: Common) {
  return (
    <>
      <PageIntro
        kicker={t('解决方案')}
        title={t('从工作场景出发，组织平台能力')}
        description={t('按资料类型、业务角色和部署环境，组合存储接入、协同与治理模块。')}
      >
        <Action locale={locale} route="/modules/">
          {t('浏览能力矩阵')}
        </Action>
        <Action locale={locale} route="/deployment/" secondary>
          {t('比较部署方案')}
        </Action>
      </PageIntro>
      <Section
        kicker={t('场景目录')}
        title={t('找到与你的团队相近的场景')}
        description={t('这些方案基于产品概念资料整理，可用于讨论首批模块与具体业务流程。')}
      >
        <div className="scenario-directory">
          {solutions.map((solution, i) => (
            <a
              href={href(locale, `/solutions/${solution.slug}/`)}
              key={solution.slug}
              className="scenario-directory-card"
              data-reveal
            >
              <div>
                <span className="mono">0{i + 1} / SCENARIO</span>
                <h3>{t(solution.title)}</h3>
                <p>{t(solution.summary)}</p>
                <span className="text-link">{t('查看场景方案 ↗')}</span>
              </div>
              <Icon name={['shield', 'network', 'folder', 'server', 'file'][i]} size={44} />
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
export function SolutionDetail({ locale, t, solution }: Common & { solution: Solution }) {
  return (
    <>
      <PageIntro
        kicker={`${t('解决方案')} · ${t(solution.label)}`}
        title={t(solution.title)}
        description={t(solution.summary)}
        breadcrumb={
          <Breadcrumb
            label={t('面包屑')}
            items={[
              { text: t('解决方案'), url: href(locale, '/solutions/') },
              { text: t(solution.label) },
            ]}
          />
        }
        visual={<Screenshot name={solution.image} alt={t('相关产品概念界面')} compact />}
      >
        <Action locale={locale} route={`/solutions/${solution.slug}/#workflow`}>
          {t('查看典型流程')}
        </Action>
        <Action locale={locale} route="/solutions/" secondary>
          {t('返回解决方案')}
        </Action>
      </PageIntro>
      <Section
        kicker={t('适用需求')}
        title={t('团队需要解决哪些问题')}
        description={t(solution.audience)}
      >
        <div className="need-list">
          {solution.needs.map((need, i) => (
            <article key={need} data-reveal>
              <span className="step-number">0{i + 1}</span>
              <p>{t(need)}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="mist" kicker={t('模块组合')} title={t('围绕这条业务链路协同')}>
        <div className="module-directory">
          {solution.modules.map((id) => {
            const module = modules.find((m) => m.id === id)!;
            return (
              <article className="module-card" key={id} data-reveal>
                <span className="mono">{id}</span>
                <h3>{t(module.title)}</h3>
                <p>{t(module.description)}</p>
                <a className="text-link" href={href(locale, moduleRoute(id))}>
                  {t('了解模块 ↗')}
                </a>
              </article>
            );
          })}
        </div>
      </Section>
      <Section id="workflow" kicker={t('典型流程')} title={t('按实际工作顺序推进')}>
        <StepList t={t} items={solution.workflow} />
      </Section>
      <Section tone="mist" kicker={t('部署建议')} title={t('结合企业条件确认交付')}>
        <div className="prose">
          <p>{t(solution.deployment)}</p>
        </div>
        <div className="section-action">
          <Action locale={locale} route="/deployment/">
            {t('查看交付与选型')}
          </Action>
          <Action locale={locale} route="/about/#service" secondary>
            {t('联系与服务')}
          </Action>
        </div>
      </Section>
    </>
  );
}
export function Deployment({ locale, t }: Common) {
  return (
    <>
      <PageIntro
        kicker={t('交付与选型')}
        title={t('把平台部署在自己的机房')}
        description={t(
          '单机适合集中部署，双机面向更高的业务连续性要求。需要隔离分析资源时，可选配独立分析服务器。'
        )}
      >
        <Action locale={locale} route="/deployment/#compare">
          {t('比较部署方案')}
        </Action>
        <Action locale={locale} route="/pricing/" secondary>
          {t('查看价格方案')}
        </Action>
      </PageIntro>
      <Section kicker={t('部署形态')} title={t('两种主方案，一项独立选配')}>
        <FeatureGrid
          t={t}
          items={[
            ['单机标准版', '一台一体机，面向集中部署和日常运维。'],
            ['双机高可用集群版', '两台服务器，按业务连续性目标规划冗余。'],
            ['外置数据分析服务器', '按授权范围规划内网只读接入与分析算力。'],
          ]}
        />
      </Section>
      <Section id="compare" tone="mist" kicker={t('方案对比')} title={t('单机和双机怎么选')}>
        <Comparison
          t={t}
          label="单机与双机部署方案对比"
          headers={['对比项', '单机标准版', '双机高可用集群版']}
          rows={[
            ['设备数量', '1 台一体机', '2 台服务器'],
            ['适用场景', '中小企业、分支机构集中部署', '对业务连续性要求更高的单位'],
            ['设计重点', '简化部署和日常运维', '节点冗余与故障切换'],
            ['选型前确认', '数据容量、保留周期、备份要求', '数据容量、切换目标、网络与备份要求'],
          ]}
        />
      </Section>
      <Section id="topology" kicker={t('部署拓扑')} title={t('按机房条件规划节点')}>
        <Topologies t={t} />
      </Section>
      <Section
        id="hardware"
        tone="mist"
        kicker={t('硬件与交付')}
        title={t('把选型参数逐项确认')}
        description={t('正式设备型号与配置尚未提供，以下列出选型需要核对的项目。')}
      >
        <Comparison
          t={t}
          label="硬件选型参数"
          headers={['选型项', '需要确认的内容', '当前状态']}
          rows={[
            ['计算资源', '处理器与内存，按启用模块和使用量评估。', '待选型确认'],
            ['数据容量', '可用容量、增长量与保留周期。', '待选型确认'],
            ['网络接口', '机房网络、分支访问与隔离条件。', '待选型确认'],
            ['冗余与备份', '节点切换、备份范围与恢复要求。', '待选型确认'],
            ['分析资源', '独立服务器与授权数据接入范围。', '待选型确认'],
          ]}
        />
        <div className="delivery-items">
          <FeatureGrid
            t={t}
            items={[
              ['部署与软件范围', '确认设备数量、安装组件、首批模块及授权范围。'],
              ['交付材料', '整理部署说明、配置清单、开源组件与许可证。'],
              ['验证与交接', '按访问、备份和连续性要求安排验收与运维交接。'],
            ]}
          />
        </div>
        <p className="fine-print">
          {t(
            '单机与双机的授权、切换方式及模块开通规则，按最终交付方案确认。单模块独立部署需单独确认交付条件。'
          )}
        </p>
      </Section>
      <Section
        kicker={t('选型准备')}
        title={t('把部署条件一起评估')}
        description={t(
          '准备机房和网络条件、预计数据容量、连续性目标，以及首批要启用的模块。设备型号、配置参数和报价待确认。'
        )}
      >
        <div className="section-action">
          <Action locale={locale} route="/modules/">
            {t('查看能力矩阵')}
          </Action>
        </div>
      </Section>
    </>
  );
}
export function Pricing({ locale, t }: Common) {
  const questions = [
    [
      '为什么没有直接标价？',
      '硬件配置、数据规模、模块授权和交付要求尚需逐项确认。当前先提供方案咨询入口，正式价格以确认后的报价为准。',
    ],
    [
      '费用是否包含硬件、安装和维护？',
      '这些项目需要分别确认。评估时应明确硬件与软件范围、安装与迁移内容、培训安排，以及维护期限和服务边界。',
    ],
    [
      '可以只采购某一个模块吗？',
      '平台按模块组织能力，但单模块独立打包、部署和计费条件仍需单独确认。本页不预设单模块的价格与交付承诺。',
    ],
    [
      '外置分析服务器包含在主方案中吗？',
      '外置数据分析服务器属于独立选配，需要单独评估算力、内网只读接入和数据授权范围。',
    ],
    [
      '采用年付还是永久授权？',
      '授权期限、计费单位、续费和升级规则尚未确定，待正式商务资料确认后补充。',
    ],
  ];
  return (
    <>
      <PageIntro
        kicker={t('价格方案')}
        title={t('从实际需求出发，选择合适的投入')}
        description={t(
          '两种主部署方案，一项独立分析选配。把硬件、软件授权与交付范围说清楚，再确认适合企业的报价。'
        )}
        breadcrumb={
          <Breadcrumb
            label={t('面包屑')}
            items={[{ text: t('平台简介'), url: href(locale) }, { text: t('价格方案') }]}
          />
        }
      >
        <Action locale={locale} route="/pricing/#plans">
          {t('查看价格方案')}
        </Action>
        <Action locale={locale} route="/deployment/" secondary>
          {t('了解交付与选型')}
        </Action>
      </PageIntro>
      <Section
        id="plans"
        kicker={t('价格方案')}
        title={t('按部署形态，评估企业方案')}
        description={t('结合企业规模、数据容量与服务需求，沟通适合的配置与报价。')}
      >
        <PricingCards locale={locale} t={t} />
      </Section>
      <Section id="compare" tone="mist" kicker={t('方案对比')} title={t('先明确范围，再确认报价')}>
        <Comparison
          label="价格方案评估范围对比"
          t={t}
          headers={['评估项目', '单机标准版', '双机高可用集群版']}
          rows={[
            ['部署设备', '1 台一体机', '2 台服务器'],
            ['重点评估', '集中管理与日常运维', '节点冗余与故障切换'],
            ['软件范围', '按启用模块与授权范围确认', '按启用模块与授权范围确认'],
            ['数据容量', '按容量、增长量与保留周期选型', '按容量、增长量与保留周期选型'],
            ['分析资源', '可单独评估分析服务器', '可单独评估分析服务器'],
            ['安装与服务', '部署、迁移、培训和维护范围待确认', '部署、迁移、培训和维护范围待确认'],
            ['金额与计费', '联系咨询，授权方式待确认', '联系咨询，授权方式待确认'],
          ]}
        />
      </Section>
      <Section
        kicker={t('方案咨询')}
        title={t('带上这些信息，沟通更高效')}
        description={t(
          '正式咨询渠道正在准备中。可以先查看联系与服务页面，或整理需求用于后续沟通。'
        )}
      >
        <div className="inquiry-grid">
          {[
            [
              'single-inquiry',
              '单机方案咨询',
              '预计使用规模、数据容量、保留周期、首批启用模块，以及机房网络和备份条件。',
            ],
            [
              'cluster-inquiry',
              '双机方案咨询',
              '除基础规模外，还需要确认业务连续性目标、节点网络、切换和恢复要求。',
            ],
            [
              'analysis-inquiry',
              '分析选配咨询',
              '需要接入的数据、只读授权范围、分析任务和算力条件。',
            ],
          ].map(([id, title, text]) => (
            <article className="feature-card" id={id} key={id}>
              <div className="icon-box">
                <Icon name="file" size={23} />
              </div>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
              <a className="text-link" href={href(locale, '/about/#service')}>
                {t('查看联系与服务')}
                <Icon name="out" size={14} />
              </a>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="mist" kicker={t('常见问题')} title={t('关于费用与授权')}>
        <Accordion items={questions.map(([q, a]) => ({ q: t(q), a: t(a) }))} />
      </Section>
    </>
  );
}
export function About({ locale, t }: Common) {
  return (
    <>
      <PageIntro
        kicker={t('关于我们')}
        title={t('让企业资料有序管理、安全流转')}
        description={t(
          '我们把企业散落在文件服务器、邮件、网盘、个人电脑里的文档、邮件和音视频，归集到部署在客户机房的平台，统一管理存储、权限、审计和检索入口，并在数据外发时做管控与留痕。'
        )}
      >
        <Action locale={locale} route="/modules/">
          {t('浏览能力矩阵')}
        </Action>
        <Action locale={locale} route="/deployment/" secondary>
          {t('查看交付与选型')}
        </Action>
      </PageIntro>
      <Section kicker={t('平台介绍')} title={t('围绕企业自己的数据开展协作')}>
        <div className="prose">
          {[
            '企业数据平台是一套可私有化部署的非结构化数据一体化系统。平台以统一存储为底座，将企业文档、邮件资料、会议素材、工单附件、合同和档案等纳入同一套存储与权限体系。',
            '在这套底座上，文件协同、工单、项目、会议、合同、客户、知识库、检索、档案和资产等业务模块共同承接日常工作，让业务过程产生的资料集中归集、按权查阅。',
            '平台围绕资料的访问与流转设计权限控制和操作记录，并把外发审批与审计追溯纳入管理流程。交付方案包括单机、双机高可用规划，以及独立选配的数据分析服务器。',
          ].map((text) => (
            <p key={text}>{t(text)}</p>
          ))}
        </div>
      </Section>
      <Section
        id="company"
        tone="mist"
        kicker={t('公司与联系信息')}
        title={t('公司信息待补充')}
        description={t('以下位置将在正式资料确认后更新。')}
      >
        <div className="placeholder-grid">
          {[
            ['公司简介', '待补充正式公司名称、公司介绍和团队信息。'],
            ['资质信息', '待补充可公开展示的资质名称、证书和说明。'],
            ['联系方式', '待补充商务邮箱、联系电话、联系地址和服务二维码。'],
          ].map(([title, text], i) => (
            <article key={title}>
              <Icon name={['layers', 'shield', 'file'][i]} size={28} />
              <h3>{t(title)}</h3>
              <span className="tag">{t('待提供正式资料')}</span>
              <p>{t(text)}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
export function Legal({ locale, t, privacy }: Common & { privacy: boolean }) {
  const title = t(privacy ? '隐私政策' : '用户协议');
  return (
    <>
      <PageIntro
        kicker={t('法律与条款')}
        title={title}
        description={`${t('本页为')}${title}${t('预留的独立页面，正式文本待补充。')}`}
        breadcrumb={
          <Breadcrumb
            label={t('面包屑')}
            items={[{ text: t('平台简介'), url: href(locale) }, { text: title }]}
          />
        }
      >
        <Action locale={locale} route="/">
          {t('返回平台简介')}
        </Action>
        <Action locale={locale} route={privacy ? '/terms/' : '/privacy/'} secondary>
          {t('查看')}
          {t(privacy ? '用户协议' : '隐私政策')}
        </Action>
      </PageIntro>
      <section className="section">
        <div className="container">
          <div className="legal-notice">
            <Icon name="file" size={32} />
            <span className="tag">{t('正式文本待补充')}</span>
            <h2>{t('内容正在准备中')}</h2>
            <p>
              {t('当前仅展示页面占位说明，尚未发布正式')}
              {title}
              {t('。待企业提供并确认正式文本后，将在此页面更新完整内容。')}
            </p>
            <p>{t('适用主体、条款内容、生效日期与联系方式等信息，均以之后发布的正式文本为准。')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
export function Missing({ locale, t }: Common) {
  return (
    <PageIntro kicker="404" title={t('未找到页面')} description={t('当前语言的页面不存在。')}>
      <Action locale={locale} route="/">
        {t('返回平台简介')}
      </Action>
    </PageIntro>
  );
}
