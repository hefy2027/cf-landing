export default {
  nav: {
    coreFeatures: '核心能力',
    features: '功能特性',
    scenarios: '应用场景',
    deploy: '部署方式',
    docs: '文档',
    demo: '在线演示',
    menu: '菜单'
  },
  hero: {
    eyebrow: '全栈 Cloudflare 运维',
    desc: '别再在多个 Cloudflare 页面之间切换了。一个面板，管完所有账户的 DNS、Workers、存储与 AI 工作台，可视化操作，无需手写命令行。',
    readDocs: '阅读文档',
    demo: '在线演示',
    alt: 'CF Manager 管理面板仪表盘',
    statsModules: '功能模块',
    statsDeploy: '部署方式',
    statsArch: '后端架构',
    statsOpenSource: '开源',
    aiImageCard: 'AI 绘图',
    i18nCard: '中英双语'
  },
  pillars: {
    sectionTitle: '一个平台，三大核心能力',
    sectionLead:
      'CF Manager 把分散在多个 Cloudflare 后台的运维工作收拢到统一面板，从账户到资源再到 AI 工作台，端到端覆盖。'
  },
  features: {
    sectionTitle: '覆盖 Cloudflare 运维全链路',
    sectionLead:
      '从域名 DNS 到边缘计算，从对象存储到 AI 工作台，14 大模块一站式管理，结构化表单替代手写 JSON 与命令行。'
  },
  scenarios: {
    sectionTitle: '谁在用 CF Manager',
    sectionLead:
      '无论你是独立开发者还是团队运维，CF Manager 都能适配你的 Cloudflare 工作流。'
  },
  deploy: {
    sectionTitle: '两种部署，按需选择',
    sectionLead: '同一套业务逻辑，双后端架构。零成本上云或完全自建，都能开箱即用。',
    stackLabel: '技术栈'
  },
  cta: {
    eyebrow: '开源 \u00B7 MIT 协议',
    title: '现在就开始管理你的 Cloudflare',
    desc: 'Fork 仓库一键部署到 Cloudflare Pages，或用 Docker 自建。几分钟即可拥有一个统一的多账户运维面板。',
    demo: '在线演示',
    demoNote: '演示站密码',
    demoNoteSuffix: '\u00B7 仅限体验，请勿用于真实业务'
  },
  footer: {
    groupProduct: '产品',
    groupDocs: '文档',
    groupResources: '资源',
    linkCoreFeatures: '核心能力',
    linkFeatures: '功能特性',
    linkScenarios: '应用场景',
    linkDeploy: '部署方式',
    linkIntro: '什么是 CF Manager',
    linkQuickStart: '快速开始',
    linkDeployDoc: '部署文档',
    linkAuth: '账户认证',
    linkApi: '外部 API',
    linkGitHub: 'GitHub 仓库',
    linkDemo: '在线演示',
    linkStore: '应用商店模板 (cf-store)',
    warn: '本工具仅供学习、技术研究与已授权账户的自有运维管理使用。请遵守 Cloudflare 服务条款，禁止用于对外公共 AI / 渲染中转或转售。',
    copyright: 'Contributors \u00B7 MIT License'
  },
  doc: {
    home: '文档首页',
    breadcrumb: '文档',
    notFound: '未找到该文档。',
    backToDocs: '返回文档',
    prev: '上一篇',
    next: '下一篇',
    titleSuffix: '· CF Manager 文档',
    groups: {
      intro: '入门',
      account: '账户',
      features: '功能',
      store: '商店',
      api: '接口',
      security: '安全',
      troubleshooting: '排查',
      reference: '参考'
    }
  },
  lang: {
    switchTo: 'English'
  },
  site: {
    name: 'CF Manager',
    slogan: '一个面板，管完你的 Cloudflare',
    tagline: '一站式 Cloudflare 多账户统一运维平台',
    version: '2.0.0'
  },
  data: {
    pillars: [
      {
        title: '多账户统一管理',
        desc: 'API Token / Global API Key 双认证，凭证 AES 加密存储。多账户一键切换、统一调度，告别频繁登录不同后台。',
        points: ['双认证方式', 'AES 凭证加密', '多账户轮换调度', '操作审计日志']
      },
      {
        title: '全栈资源运维',
        desc: '可视化管理 DNS、Workers、Pages、KV / D1 / R2、隧道与规则引擎，跨账户批量部署，结构化表单替代手写 JSON。',
        points: ['DNS \u00B7 Workers \u00B7 Pages', 'KV / D1 / R2 存储', 'Tunnel + 规则引擎', '跨账户批量操作']
      },
      {
        title: 'OpenAI 兼容 AI 网关',
        desc: 'Workers AI 全模型推理，对话 / 图片生成 / 语音合成 / 翻译四大能力，Prompt Caching 感知计费，多账户配额调度，并暴露 OpenAI 兼容 /v1 接口供本地调试。',
        points: ['全模型推理', '图片/TTS/翻译', '缓存感知计费', '/v1 兼容接口']
      }
    ],
    features: [
      { title: '实时仪表盘', desc: '各账户 Workers、AI、渲染配额用量实时展示，可视化进度条与操作审计一目了然。' },
      { title: 'DNS 管理', desc: 'A/AAAA/CNAME/MX/TXT 全记录管理，Zone 批量创建/删除、Zone 设置（SSL/缓存/安全）、缓存清除、暂停/激活。' },
      { title: 'Workers / Pages', desc: '脚本与项目 CRUD，单/跨账户批量部署，环境变量（明文/机密）与绑定（KV/D1/R2/AI/DO），仅更新配置重部署，Pages 回滚。' },
      { title: '隧道管理', desc: 'Tunnel 创建删除、Ingress 可视化编辑，一键回源向导自动配置 DNS CNAME + ingress。' },
      { title: '规则引擎', desc: '8 种规则类型（回源 / 重写 / 头转换 / 缓存 / 防火墙 / 限速 / 重定向），结构化表单 + 表达式生成器。' },
      { title: '存储管理', desc: 'KV 键值 CRUD，D1 数据库 SQL 查询与表结构变更，R2 文件上传 / 下载 / 预览。' },
      { title: 'AI 工作台', desc: '统一 AI 控制台：对话 / 图片生成（文生图+图生图）/ 语音合成（TTS）/ 翻译 + 账户维度用量统计，多账户智能调度。' },
      { title: '浏览器渲染', desc: '截图 / HTML / Markdown / PDF / 链接提取 5 种模式，限速 + 配额管理 + SSRF 防护。' },
      { title: 'OpenAI 兼容 API', desc: '/v1/chat/completions、/v1/images/generations、/v1/audio/speech、/v1/translations、/v1/models 与浏览器渲染接口，流式 + 非流式，仅限内网本地调试。' },
      { title: '应用商店', desc: '内置 Catalog 模板市场，支持第三方源扩展，一键部署 Workers / Pages。' },
      { title: '安全特性', desc: 'API Token AES 加密，可选登录密码，Worker 版 /admin/ 路径隐藏 + 根路径 nginx 伪装（Docker 版根路径即管理界面），完整审计日志。' },
      { title: '双后端架构', desc: '同一套业务逻辑，Docker（Express 5 + SQLite 单容器 All-in-One）与 Cloudflare Pages（Hono + D1）双部署，按需选择。' },
      { title: 'Resin 代理池', desc: '原生集成 Resin 代理池，为每个 Cloudflare 账户绑定稳定出口 IP（sticky session），避免 IP 频繁变动触发风控；代理优先级 账户专属 > Resin > 全局 > 无。' },
      { title: '国际化（i18n）', desc: '内置中文（zh-CN）与英文（en）双语界面，1000+ 词条，自动检测浏览器语言并持久化，全站视图与组件国际化。' }
    ],
    scenarios: [
      { title: '个人开发者', desc: '把多个 Cloudflare 账户汇总到一个面板，本地调试 AI 工作台（对话/绘图/语音/翻译）与浏览器渲染，用 OpenAI 兼容接口接入自己的工具链。', points: ['告别多账户反复登录', '本地调试 AI / 渲染', 'OpenAI 兼容接口对接工具链'] },
      { title: '团队运维', desc: '统一管理团队名下域名、Workers、DNS 与存储，跨账户批量部署，配额与用量集中可视。', points: ['多账户权限集中管理', '跨账户批量部署', '配额用量一目了然'] },
      { title: '回源与组网', desc: '一键回源向导自动打通 Tunnel + DNS CNAME，结构化配置 Ingress，无需手写命令行。', points: ['可视化编辑 Ingress', 'CNAME 自动发现', '向导化操作，零命令行'] },
      { title: '自托管私有部署', desc: 'Docker Compose 一键自建，HTTP/SOCKS5 与 Resin 代理池（每账户 sticky IP）支持，凭据加密不外泄，完全自有数据。', points: ['数据完全自控', 'AES 加密凭证', '代理网络环境适配'] }
    ],
    deploys: [
      { title: 'Cloudflare Pages', badge: '零成本 \u00B7 推荐', desc: 'Fork 仓库后用 GitHub Actions 一键部署，或下载预构建包手动上传。基于 D1 + KV，无需服务器。', steps: ['Fork 仓库并配置环境 Secrets', 'Actions 触发 Deploy to Cloudflare Pages', '创建 D1 数据库并绑定 DB / KV', '访问 https://<project>.pages.dev/admin/'] },
      { title: 'Docker Compose', badge: '自建服务器', desc: '推荐直接拉取 GHCR 预构建镜像（无需克隆仓库），或源码构建。基于 Express 5 + SQLite 单容器 All-in-One，数据完全自有。', steps: ['docker pull ghcr.io/hefy2027/cf-manager:latest', 'docker run -d -p 3000:3000 -v ./data:/app/data', '  配置 ENCRYPTION_KEY / API_SECRET', '访问 http://localhost:3000'] }
    ],
    stack: [
      { k: '前端', v: 'Vue 3 \u00B7 Naive UI \u00B7 Pinia' },
      { k: '后端 A', v: 'Express 5 \u00B7 Cloudflare SDK \u00B7 SQLite' },
      { k: '后端 B', v: 'Hono \u00B7 Cloudflare REST API \u00B7 D1' },
      { k: '部署', v: 'Docker Compose \u00B7 Cloudflare Pages' }
    ],
    docs: [
      { slug: 'intro', title: '什么是 CF Manager', desc: '项目定位、三大核心能力、双后端架构与安全特性。', group: '入门' },
      { slug: 'quick-start', title: '快速开始', desc: '三种部署方式，最快 3 分钟拥有统一运维面板。', group: '入门' },
      { slug: 'deploy', title: '部署文档', desc: 'Fork 一键部署、Cloudflare Pages 手动部署、Docker 部署的完整细节。', group: '入门' },
      { slug: 'account-auth', title: '账户认证', desc: 'API Token 与 Global API Key 两种认证方式的区别与配置。', group: '账户' },
      { slug: 'account-management', title: '账户管理', desc: '多账户添加、编辑、切换、CSV 导入导出与批量测试的操作指南。', group: '账户' },
      { slug: 'dns', title: 'DNS 管理', desc: '记录 CRUD、Zone 批量创建/删除、Zone 设置（SSL/缓存/安全）、缓存清除与暂停/激活。', group: '功能' },
      { slug: 'workers-pages', title: 'Workers 与 Pages', desc: '脚本与项目管理、跨账户批量部署、环境变量与绑定、仅更新配置重部署。', group: '功能' },
      { slug: 'tunnel', title: '隧道与回源', desc: 'Cloudflare Tunnel 创建、Ingress 可视化编辑、一键回源向导。', group: '功能' },
      { slug: 'storage', title: '存储管理', desc: 'KV 键值存储、D1 数据库 SQL 查询、R2 对象存储的统一可视化操作。', group: '功能' },
      { slug: 'ai-rendering', title: 'AI 工作台与渲染', desc: 'Workers AI 统一工作台：对话 / 图片生成 / TTS / 翻译 + 浏览器渲染五种模式。', group: '功能' },
      { slug: 'app-store', title: '应用商店', desc: '内置 Catalog 模板市场、第三方源接入、一键部署与模板开发指南。', group: '商店' },
      { slug: 'api-v1', title: '外部 API 文档', desc: 'OpenAI 兼容 /v1 接口的认证、调用与流式响应。', group: '接口' },
      { slug: 'security', title: '安全最佳实践', desc: '凭证加密、访问控制、路由隐藏、代理安全与操作审计的完整指南。', group: '安全' },
      { slug: 'troubleshooting', title: '故障排查', desc: '常见部署与运行问题的诊断与解决，包含日志查看与审计说明。', group: '排查' },
      { slug: 'architecture', title: '技术架构', desc: '双后端架构设计、项目结构说明、核心设计决策与扩展点指南。', group: '参考' },
      { slug: 'changelog', title: '更新日志', desc: 'CF Manager 各版本的更新内容摘要与完整 Changelog 链接。', group: '参考' }
    ],
    docGroups: ['入门', '账户', '功能', '商店', '接口', '安全', '排查', '参考'],
    siteFeatures: ['14+', '2', '2', '100%'],
    badges: {
      aiWorkspace: 'NEW',
      i18n: 'NEW',
      cf: '零成本 \u00B7 推荐',
      docker: '自建服务器'
    }
  }
}
