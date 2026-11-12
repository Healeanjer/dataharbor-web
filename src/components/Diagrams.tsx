import { groups } from '@/lib/catalog';
import type { Translator } from '@/i18n/core';
import { Icon } from './Icon';
export function FlowIllustration({ t }: { t: Translator }) {
  return (
    <div className="flow-illustration" role="img" aria-label={t('数据流转示意')}>
      <div className="flow-caption">
        <span className="status-dot" />
        <span>{t('企业内网')}</span>
        <span className="mono">DATAHARBOR</span>
      </div>
      <div className="flow-inputs">
        {[
          ['file', '企业文档'],
          ['folder', '业务附件'],
          ['book', '知识复用'],
        ].map(([icon, label]) => (
          <div className="flow-node" key={label}>
            <Icon name={icon} size={18} />
            <span>{t(label)}</span>
          </div>
        ))}
      </div>
      <div className="flow-rail" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="flow-core">
        <div className="flow-core-icon">
          <Icon name="layers" size={34} />
        </div>
        <strong>{t('统一存储底座')}</strong>
        <p>{t('资料、版本与保留策略')}</p>
        <div className="core-orbit" aria-hidden />
      </div>
      <div className="flow-rail flow-rail-out" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="flow-outputs">
        {['访问权限', '外发审批', '审计追溯'].map((label) => (
          <div className="flow-node" key={label}>
            <Icon name="check" size={14} />
            {t(label)}
          </div>
        ))}
      </div>
      <p className="flow-footnote">
        <Icon name="shield" size={14} />
        {t('资料始终在企业自己的边界内流转。')}
      </p>
    </div>
  );
}
export function Architecture({ t }: { t: Translator }) {
  return (
    <figure className="architecture" aria-label={t('平台架构示意，从资料接入到存储、业务和治理')}>
      <div className="diagram-heading">
        <strong>{t('企业数据平台')}</strong>
        <span className="tag">{t('架构概念示意')}</span>
      </div>
      <div className="architecture-intake" data-reveal>
        <span className="eyebrow">{t('资料接入')}</span>
        <div>
          {['文件共享', '邮件资料', '业务附件', '外部 OA／档案系统'].map((label) => (
            <span key={label}>{t(label)}</span>
          ))}
        </div>
      </div>
      <div className="diagram-connector" aria-hidden>
        <span />
      </div>
      <div className="architecture-core" data-reveal>
        <Icon name="server" size={25} />
        <strong>{t('统一存储底座')}</strong>
        <span>{t('资料、版本与保留策略')}</span>
      </div>
      <div className="diagram-connector" aria-hidden>
        <span />
      </div>
      <div className="architecture-groups">
        {groups.map((group, i) => (
          <div key={group.id} data-reveal>
            <span className="mono">0{i + 1}</span>
            <h3>{t(group.title)}</h3>
            <p>{group.modules.map((m) => t(m.title)).join(' · ')}</p>
          </div>
        ))}
      </div>
      <div className="architecture-governance" data-reveal>
        <Icon name="shield" size={20} />
        <strong>{t('贯穿各层的治理')}</strong>
        <span>{t('身份与权限 · 分类与责任 · 外发规则 · 审计追溯')}</span>
      </div>
      <figcaption>
        {t('各模块沿用统一的数据与访问管理规则，具体接入范围按实际方案确认。')}
      </figcaption>
    </figure>
  );
}
export function Topologies({ t }: { t: Translator }) {
  return (
    <div className="topologies">
      {[false, true].map((dual) => (
        <figure
          className="topology"
          key={String(dual)}
          aria-label={t(dual ? '双机部署拓扑示意' : '单机部署拓扑示意')}
        >
          <figcaption>{t(dual ? '双机高可用集群版' : '单机标准版')}</figcaption>
          <div className="topology-access">{t('员工与授权业务系统')}</div>
          <div className="diagram-connector" aria-hidden>
            <span />
          </div>
          <div className="topology-network">
            <Icon name="network" size={18} />
            {t(dual ? '统一访问入口／内网网络' : '企业内网')}
          </div>
          <div className="diagram-connector" aria-hidden>
            <span />
          </div>
          <div className={`topology-nodes ${dual ? 'dual' : ''}`}>
            {(dual ? ['节点 A', '节点 B'] : ['一体机']).map((label) => (
              <div key={label}>
                <Icon name="server" size={25} />
                <strong>{t(label)}</strong>
                <span>{t('平台应用与数据服务')}</span>
              </div>
            ))}
          </div>
          <div className="topology-analytics">
            <Icon name="chart" size={16} />
            {t('独立分析服务器可按需选配')}
          </div>
          <p>
            {t(
              dual
                ? '节点冗余与切换方式需结合网络和数据服务方案验证。'
                : '容量、备份和恢复方式按部署条件规划。'
            )}
          </p>
        </figure>
      ))}
    </div>
  );
}
