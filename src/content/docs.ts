// 文档元数据与内容加载。
// 以 ?raw 形式导入仓库根 docs/ 下的 markdown，作为文档单一来源。
import introRaw from '../../docs/intro.md?raw'
import quickStartRaw from '../../docs/quick-start.md?raw'
import deployRaw from '../../docs/deploy.md?raw'
import apiRaw from '../../docs/api-v1.md?raw'
import authRaw from '../../docs/account-auth.md?raw'

export interface DocMeta {
  slug: string
  title: string
  desc: string
  group: string
  order: number
  content: string
}

// 按工作流分组：入门 → 配置 → 接口
export const docs: DocMeta[] = [
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
  {
    slug: 'account-auth',
    title: '账户认证',
    desc: 'API Token 与 Global API Key 两种认证方式的区别与配置。',
    group: '配置',
    order: 4,
    content: authRaw
  },
  {
    slug: 'api-v1',
    title: '外部 API 文档',
    desc: 'OpenAI 兼容 /v1 接口的认证、调用与流式响应。',
    group: '接口',
    order: 5,
    content: apiRaw
  }
]

export const groups = ['入门', '配置', '接口']

export function getDoc(slug: string): DocMeta | undefined {
  return docs.find((d) => d.slug === slug)
}
