import business from '@/content/business.json';
export type Module = { id: string; title: string; description: string; audience: string };
export type Group = { id: string; title: string; modules: Module[] };
export type Detail = {
  capabilities: string[][];
  workflow: string[][];
  question: string;
  answer: string;
  image?: string;
};
export type Solution = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  audience: string;
  needs: string[];
  modules: string[];
  workflow: string[][];
  deployment: string;
  image: string;
};
export const groups: Group[] = business.groups;
export const modules = groups.flatMap((group) =>
  group.modules.map((module) => ({ ...module, groupId: group.id, groupTitle: group.title }))
);
export const solutions: Solution[] = business.solutions;
export const principles = business.differentiators;
export const relationships: Record<string, { text: string; related: string[] }> =
  business.moduleDifferences;
export const details: Record<string, Detail> = business.details;
details['5.15'] = {
  image: 'security',
  capabilities: [
    ['外链分享', '检查分享对象、范围与有效期。'],
    ['下载', '根据资料类型和规则提示或限制。'],
    ['打印', '按内容规则决定是否进入后续处理。'],
    ['邮件外发', '将邮件相关外发纳入策略规划。'],
  ],
  workflow: [
    ['提交申请', '选择资料，填写用途和接收方。'],
    ['判断策略', '根据出口和内容规则判断是否进入审批。'],
    ['审批处理', '审批人查看申请并记录处理意见。'],
    ['审计追溯', '申请人查进度，管理员按条件追溯。'],
  ],
  question: '审批人如何确定？',
  answer: '审批条件、角色、撤回与驳回后的处理，等待业务规则确认。',
};
export function moduleRoute(id: string) {
  return id === '5.15' ? '/security/' : `/modules/${id}/`;
}
export function moduleImage(id: string) {
  return details[id]?.image || id;
}
export const routeLabels = {
  '/': '平台简介',
  '/product/': '技术体系',
  '/modules/': '能力矩阵',
  '/solutions/': '解决方案',
  '/deployment/': '交付与选型',
  '/security/': '内容安全与外发管控',
  '/pricing/': '价格方案',
  '/about/': '关于我们',
  '/home-preview/': '平台简介',
  '/home-previous/': '旧版首页',
  '/privacy/': '隐私政策',
  '/terms/': '用户协议',
  '/not-found/': '未找到页面',
};
export const routePaths = [
  ...Object.keys(routeLabels),
  ...modules.filter((m) => m.id !== '5.15').map((m) => moduleRoute(m.id)),
  ...solutions.map((s) => `/solutions/${s.slug}/`),
];
export function routeTitle(route: string) {
  return (
    routeLabels[route as keyof typeof routeLabels] ||
    modules.find((m) => moduleRoute(m.id) === route)?.title ||
    solutions.find((s) => `/solutions/${s.slug}/` === route)?.title ||
    '未找到页面'
  );
}
export const navigation = [
  { route: '/', title: '平台简介', groups: [] },
  {
    route: '/product/',
    title: '技术体系',
    groups: [
      {
        title: '平台',
        links: [
          ['平台全景', '/product/'],
          ['架构与资料流转', '/product/#architecture'],
          ['统一权限与审计', '/product/#governance'],
        ],
      },
      {
        title: '技术与配置',
        links: [
          ['AI 可选配置', '/product/#ai'],
          ['技术底座', '/product/#technology'],
          ['开源组件管理', '/product/#components'],
        ],
      },
    ],
  },
  {
    route: '/modules/',
    title: '能力矩阵',
    groups: groups.map((g) => ({
      title: g.title,
      links: g.modules.map((m) => [m.title, moduleRoute(m.id)]),
    })),
  },
  {
    route: '/solutions/',
    title: '解决方案',
    groups: [
      {
        title: '组织与环境',
        links: solutions.slice(0, 2).map((s) => [s.label, `/solutions/${s.slug}/`]),
      },
      {
        title: '业务场景',
        links: solutions.slice(2).map((s) => [s.label, `/solutions/${s.slug}/`]),
      },
    ],
  },
  {
    route: '/deployment/',
    title: '交付与选型',
    groups: [
      {
        title: '部署方案',
        links: [
          ['部署方案总览', '/deployment/'],
          ['单机与双机对比', '/deployment/#compare'],
          ['部署拓扑', '/deployment/#topology'],
          ['硬件与交付清单', '/deployment/#hardware'],
        ],
      },
    ],
  },
  { route: '/pricing/', title: '价格方案', groups: [] },
  {
    route: '/about/',
    title: '关于我们',
    groups: [
      {
        title: '关于我们',
        links: [
          ['平台介绍', '/about/'],
          ['公司与资质', '/about/#company'],
          ['联系与服务', '/about/#service'],
        ],
      },
    ],
  },
];
