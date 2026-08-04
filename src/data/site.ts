// 落地页内容集中管理，便于后续逐步补充文档与维护

export const site = {
  name: 'CF Manager',
  slogan: '一个面板，管完你的 Cloudflare',
  tagline: '一站式 Cloudflare 多账户统一运维平台',
  version: '1.5.0',
  github: 'https://github.com/hefy2027/cf-manager',
  demo: 'https://cloud.umami.is/q/9GbJ5YAyt',
  demoPwd: 'cfmgrbest',
  relatedStore: 'https://github.com/hefy2027/cf-store',
  docs: {
    deploy: 'https://github.com/hefy2027/cf-manager/blob/master/docs/deploy.md',
    api: 'https://github.com/hefy2027/cf-manager/blob/master/docs/api-v1.md',
    auth: 'https://github.com/hefy2027/cf-manager/blob/master/docs/account-auth.md',
    changelog: 'https://github.com/hefy2027/cf-manager/blob/master/CHANGELOG.md'
  }
}

// 三大能力支柱（均衡展示）
export const pillars = [
  {
    icon: 'layers',
    title: '多账户统一管理',
    desc: 'API Token / Global API Key 双认证，凭证 AES 加密存储。多账户一键切换、统一调度，告别频繁登录不同后台。',
    points: ['双认证方式', 'AES 凭证加密', '多账户轮换调度', '操作审计日志']
  },
  {
    icon: 'grid',
    title: '全栈资源运维',
    desc: '可视化管理 DNS、Workers、Pages、KV / D1 / R2、隧道与规则引擎，跨账户批量部署，结构化表单替代手写 JSON。',
    points: ['DNS · Workers · Pages', 'KV / D1 / R2 存储', 'Tunnel + 规则引擎', '跨账户批量操作']
  },
  {
    icon: 'spark',
    title: 'OpenAI 兼容 AI 网关',
    desc: 'Workers AI 全模型推理，Prompt Caching 感知计费，多账户配额调度，并暴露 OpenAI 兼容 /v1 接口供本地调试。',
    points: ['全模型推理', '缓存感知计费', '配额自动调度', '/v1 兼容接口']
  }
]

// 功能特性网格
export const features = [
  {
    icon: 'gauge',
    title: '实时仪表盘',
    desc: '各账户 Workers、AI、渲染配额用量实时展示，可视化进度条与操作审计一目了然。'
  },
  {
    icon: 'dns',
    title: 'DNS 管理',
    desc: 'A/AAAA/CNAME/MX/TXT 全记录管理，一键代理开关，批量操作。'
  },
  {
    icon: 'worker',
    title: 'Workers / Pages',
    desc: '脚本与项目 CRUD，单/跨账户批量部署，绑定、环境变量、路由、自定义域名，Pages 支持回滚。'
  },
  {
    icon: 'tunnel',
    title: '隧道管理',
    badge: 'NEW',
    desc: 'Tunnel 创建删除、Ingress 可视化编辑，一键回源向导自动配置 DNS CNAME + ingress。'
  },
  {
    icon: 'rules',
    title: '规则引擎',
    badge: 'NEW',
    desc: '8 种规则类型（回源 / 重写 / 头转换 / 缓存 / 防火墙 / 限速 / 重定向），结构化表单 + 表达式生成器。'
  },
  {
    icon: 'database',
    title: '存储管理',
    desc: 'KV 键值 CRUD，D1 数据库 SQL 查询与表结构变更，R2 文件上传 / 下载 / 预览。'
  },
  {
    icon: 'ai',
    title: 'AI 推理',
    desc: 'Workers AI 全模型，流式对话 + Reasoning 可视化，历史上下文，多账户智能调度。'
  },
  {
    icon: 'browser',
    title: '浏览器渲染',
    desc: '截图 / HTML / Markdown / PDF / 链接提取 5 种模式，限速 + 配额管理 + SSRF 防护。'
  },
  {
    icon: 'api',
    title: 'OpenAI 兼容 API',
    desc: '/v1/chat/completions、/v1/models 与浏览器渲染接口，流式 + 非流式，仅限内网本地调试。'
  },
  {
    icon: 'store',
    title: '应用商店',
    desc: '内置 Catalog 模板市场，支持第三方源扩展，一键部署 Workers / Pages。'
  },
  {
    icon: 'shield',
    title: '安全特性',
    desc: 'API Token AES 加密，可选登录密码，Worker 版 /admin/ 路径隐藏 + 根路径 nginx 伪装（Docker 版根路径即管理界面），完整审计日志。'
  },
  {
    icon: 'dual',
    title: '双后端架构',
    desc: '同一套业务逻辑，Docker（Express 5 + SQLite 单容器 All-in-One）与 Cloudflare Pages（Hono + D1）双部署，按需选择。'
  },
  {
    icon: 'proxy',
    title: 'Resin 代理池',
    desc: '原生集成 Resin 代理池，为每个 Cloudflare 账户绑定稳定出口 IP（sticky session），避免 IP 频繁变动触发风控；代理优先级 账户专属 > Resin > 全局 > 无。'
  }
]

// 应用场景
export const scenarios = [
  {
    icon: 'dev',
    title: '个人开发者',
    desc: '把多个 Cloudflare 账户汇总到一个面板，本地调试 AI 推理与浏览器渲染，用 OpenAI 兼容接口接入自己的工具链。',
    points: ['告别多账户反复登录', '本地调试 AI / 渲染', 'OpenAI 兼容接口对接工具链']
  },
  {
    icon: 'ops',
    title: '团队运维',
    desc: '统一管理团队名下域名、Workers、DNS 与存储，跨账户批量部署，配额与用量集中可视。',
    points: ['多账户权限集中管理', '跨账户批量部署', '配额用量一目了然']
  },
  {
    icon: 'tunnel',
    title: '回源与组网',
    desc: '一键回源向导自动打通 Tunnel + DNS CNAME，结构化配置 Ingress，无需手写命令行。',
    points: ['可视化编辑 Ingress', 'CNAME 自动发现', '向导化操作，零命令行']
  },
  {
    icon: 'self',
    title: '自托管私有部署',
    desc: 'Docker Compose 一键自建，HTTP/SOCKS5 与 Resin 代理池（每账户 sticky IP）支持，凭据加密不外泄，完全自有数据。',
    points: ['数据完全自控', 'AES 加密凭证', '代理网络环境适配']
  }
]

// 部署方式
export const deploys = [
  {
    icon: 'cf',
    title: 'Cloudflare Pages',
    badge: '零成本 · 推荐',
    desc: 'Fork 仓库后用 GitHub Actions 一键部署，或下载预构建包手动上传。基于 D1 + KV，无需服务器。',
    steps: [
      'Fork 仓库并配置环境 Secrets',
      'Actions 触发 Deploy to Cloudflare Pages',
      '创建 D1 数据库并绑定 DB / KV',
      '访问 https://<project>.pages.dev/admin/'
    ]
  },
  {
    icon: 'docker',
    title: 'Docker Compose',
    badge: '自建服务器',
    desc: '推荐直接拉取 GHCR 预构建镜像（无需克隆仓库），或源码构建。基于 Express 5 + SQLite 单容器 All-in-One，数据完全自有。',
    steps: [
      'git clone 并 cp .env.example .env',
      '设置 ENCRYPTION_KEY 等环境变量',
      'chmod +x deploy.sh && ./deploy.sh',
      '访问 http://localhost:3000'
    ]
  }
]

// 技术栈
export const stack = [
  { k: '前端', v: 'Vue 3 · Naive UI · Pinia' },
  { k: '后端 A', v: 'Express 5 · Cloudflare SDK · SQLite' },
  { k: '后端 B', v: 'Hono · Cloudflare REST API · D1' },
  { k: '部署', v: 'Docker Compose · Cloudflare Pages' }
]
