'use client';
import { useId, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/i18n/context';
import { href } from '@/i18n/core';
import { Icon } from './Icon';

const stages = [
  {
    title: '资料接入',
    icon: 'folder',
    description: '文件共享、邮件资料和业务附件统一归集。',
    tags: ['文件共享', '邮件资料', '业务附件'],
    route: '/modules/5.5/',
  },
  {
    title: '协同使用',
    icon: 'layers',
    description: '围绕日常任务处理资料，沿用统一的访问权限。',
    tags: ['访问权限', '工单系统', '合同与法务管理'],
    route: '/modules/5.3/',
  },
  {
    title: '安全外发',
    icon: 'shield',
    description: '按外发渠道与内容规则设计申请、审批和处理记录。',
    tags: ['外链分享', '邮件外发', '审批处理'],
    route: '/security/',
  },
  {
    title: '归档追溯',
    icon: 'book',
    description: '归档资料可查找、可调阅，并保留使用与流转记录。',
    tags: ['资料归档', '审计追溯', '电子档案管理'],
    route: '/modules/5.16/',
  },
];
export function WorkflowJourney() {
  const { locale, t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const seed = useId();
  const stage = stages[selected];
  return (
    <div className="workflow-journey" style={{ '--wf-progress': selected / 3 } as CSSProperties}>
      <div className="wf-stations" role="tablist" aria-label={t('业务如何运转')}>
        <div className="wf-track" aria-hidden="true">
          <span />
        </div>
        {stages.map((item, i) => (
          <button
            key={item.title}
            id={`${seed}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={selected === i}
            aria-controls={`${seed}-detail`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(event) => {
              let next = i;
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
                next = (i + 1) % stages.length;
              else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
                next = (i + stages.length - 1) % stages.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = stages.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              document.getElementById(`${seed}-tab-${next}`)?.focus();
            }}
          >
            <span className="wf-node">
              <Icon name={item.icon} size={22} />
              <span className="wf-node-check" aria-hidden="true">
                {i < selected ? '✓' : String(i + 1).padStart(2, '0')}
              </span>
            </span>
            <strong>{t(item.title)}</strong>
          </button>
        ))}
      </div>
      <div
        className="wf-detail"
        role="tabpanel"
        id={`${seed}-detail`}
        aria-labelledby={`${seed}-tab-${selected}`}
      >
        <div className="wf-document-scene" aria-hidden="true">
          <div className="wf-orbit wf-orbit-one" />
          <div className="wf-orbit wf-orbit-two" />
          <div className="wf-document">
            <div className="wf-document-head">
              <span className="wf-file-icon">
                <Icon name="file" size={25} />
              </span>
              <span className="mono">DATA / 001</span>
            </div>
            <strong>{t('企业文档')}</strong>
            <span className="wf-file-line" />
            <span className="wf-file-line" />
            <span className="wf-file-line" />
            <div className="wf-document-bottom">
              <span>{t('同一份资料')}</span>
              <span className="wf-document-stage">
                <Icon name={stage.icon} size={15} />
              </span>
            </div>
          </div>
          <div className="wf-data-path">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="wf-explanation" key={selected}>
          <span className="wf-step-code mono">0{selected + 1} / 04</span>
          <h3>{t(stage.title)}</h3>
          <p>{t(stage.description)}</p>
          <ul className="wf-tags">
            {stage.tags.map((tag) => (
              <li key={tag}>
                <span />
                {t(tag)}
              </li>
            ))}
          </ul>
          <a className="text-link" href={href(locale, stage.route)}>
            {t('了解相关模块')}
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
      <div className="wf-foot">
        <span>
          <Icon name="shield" size={15} />
          {t('同一套资料管理规则贯穿业务与治理。')}
        </span>
        <span>{t('资料流转概念示意')}</span>
      </div>
    </div>
  );
}
