// 文档元数据与内容加载。
// 以 ?raw 形式导入仓库根 docs/ 下的 markdown，作为文档单一来源。
import introRaw from '../../docs/intro.md?raw'
import quickStartRaw from '../../docs/quick-start.md?raw'
import deployRaw from '../../docs/deploy.md?raw'
import authRaw from '../../docs/account-auth.md?raw'
import accountMgmtRaw from '../../docs/account-management.md?raw'
import dnsRaw from '../../docs/dns.md?raw'
import workersPagesRaw from '../../docs/workers-pages.md?raw'
import tunnelRaw from '../../docs/tunnel.md?raw'
import storageRaw from '../../docs/storage.md?raw'
import aiRenderingRaw from '../../docs/ai-rendering.md?raw'
import appStoreRaw from '../../docs/app-store.md?raw'
import apiRaw from '../../docs/api-v1.md?raw'
import securityRaw from '../../docs/security.md?raw'
import troubleshootingRaw from '../../docs/troubleshooting.md?raw'
import changelogRaw from '../../docs/changelog.md?raw'
import architectureRaw from '../../docs/architecture.md?raw'

export interface DocMeta {
  slug: string
  title: string
  desc: string
  group: string
  order: number
  content: string
}

// 按工作流分组：入门 → 账户 → 功能 → 商店 → 接口 → 安全 → 排查 → 参考
export const docs: DocMeta[] = [
  // ===== 入门 =====
  {
    slug: 'intro',
    title: '什么是 CF Manager',
    desc: '项目定位、三大核心能力、双后端架构与安全特性。',
    group: '入门',
    order: 1,
    content: introRaw
  },
  {
    slug: 'quick-start',
    title: '快速开始',
    desc: '三种部署方式，最快 3 分钟拥有统一运维面板。',
    group: '入门',
    order: 2,
    content: quickStartRaw
  },
  {
    slug: 'deploy',
    title: '部署文档',
    desc: 'Fork 一键部署、Cloudflare Pages 手动部署、Docker 部署的完整细节。',
    group: '入门',
    order: 3,
    content: deployRaw
  },

  // ===== 账户 =====
  {
    slug: 'account-auth',
    title: '账户认证',
    desc: 'API Token 与 Global API Key 两种认证方式的区别与配置。',
    group: '账户',
    order: 4,
    content: authRaw
  },
  {
    slug: 'account-management',
    title: '账户管理',
    desc: '多账户添加、编辑、切换、CSV 导入导出与批量测试的操作指南。',
    group: '账户',
    order: 5,
    content: accountMgmtRaw
  },

  // ===== 功能 =====
  {
    slug: 'dns',
    title: 'DNS 管理',
    desc: 'A/AAAA/CNAME/MX/TXT 记录 CRUD、代理开关、批量操作与跨 Zone 管理。',
    group: '功能',
    order: 6,
    content: dnsRaw
  },
  {
    slug: 'workers-pages',
    title: 'Workers 与 Pages',
    desc: 'Workers 脚本与 Pages 项目管理、跨账户批量部署、绑定与路由配置。',
    group: '功能',
    order: 7,
    content: workersPagesRaw
  },
  {
    slug: 'tunnel',
    title: '隧道与回源',
    desc: 'Cloudflare Tunnel 创建、Ingress 可视化编辑、一键回源向导。',
    group: '功能',
    order: 8,
    content: tunnelRaw
  },
  {
    slug: 'storage',
    title: '存储管理',
    desc: 'KV 键值存储、D1 数据库 SQL 查询、R2 对象存储的统一可视化操作。',
    group: '功能',
    order: 9,
    content: storageRaw
  },
  {
    slug: 'ai-rendering',
    title: 'AI 推理与渲染',
    desc: 'Workers AI 多模型对话、Prompt Caching 计费、浏览器渲染五种模式。',
    group: '功能',
    order: 10,
    content: aiRenderingRaw
  },

  // ===== 商店 =====
  {
    slug: 'app-store',
    title: '应用商店',
    desc: '内置 Catalog 模板市场、第三方源接入、一键部署与模板开发指南。',
    group: '商店',
    order: 11,
    content: appStoreRaw
  },

  // ===== 接口 =====
  {
    slug: 'api-v1',
    title: '外部 API 文档',
    desc: 'OpenAI 兼容 /v1 接口的认证、调用与流式响应。',
    group: '接口',
    order: 12,
    content: apiRaw
  },

  // ===== 安全 =====
  {
    slug: 'security',
    title: '安全最佳实践',
    desc: '凭证加密、访问控制、路由隐藏、代理安全与操作审计的完整指南。',
    group: '安全',
    order: 13,
    content: securityRaw
  },

  // ===== 排查 =====
  {
    slug: 'troubleshooting',
    title: '故障排查',
    desc: '常见部署与运行问题的诊断与解决，包含日志查看与审计说明。',
    group: '排查',
    order: 14,
    content: troubleshootingRaw
  },

  // ===== 参考 =====
  {
    slug: 'architecture',
    title: '技术架构',
    desc: '双后端架构设计、项目结构说明、核心设计决策与扩展点指南。',
    group: '参考',
    order: 15,
    content: architectureRaw
  },
  {
    slug: 'changelog',
    title: '更新日志',
    desc: 'CF Manager 各版本的更新内容摘要与完整 Changelog 链接。',
    group: '参考',
    order: 16,
    content: changelogRaw
  }
]

export const groups = ['入门', '账户', '功能', '商店', '接口', '安全', '排查', '参考']

export function getDoc(slug: string): DocMeta | undefined {
  return docs.find((d) => d.slug === slug)
}
