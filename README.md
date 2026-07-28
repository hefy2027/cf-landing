# CF Manager Landing

CF Manager 落地页（独立静态站）。深色科技风营销页，基于 Vite + Vue 3。

## 开发

```bash
cd landing
npm install
npm run dev      # http://localhost:5174
```

## 构建

```bash
npm run build    # 输出到 dist/
npm run preview  # 预览构建产物
```

`dist/` 为纯静态产物，可部署到任意静态托管（Cloudflare Pages / Vercel / GitHub Pages / Nginx）。
`vite.config.ts` 中 `base: '/'` 使用根路径以支持 history 路由，部署到子路径时改为对应前缀。

## 结构

```
landing/
├── docs/                      # 文档 Markdown 单一来源（项目内自包含副本）
│   ├── intro.md               #   什么是 CF Manager
│   ├── quick-start.md         #   快速开始
│   ├── deploy.md              #   部署文档
│   ├── account-auth.md        #   账户认证
│   └── api-v1.md              #   外部 API 文档
├── index.html
├── public/favicon.svg
├── vite.config.ts
└── src/
    ├── main.ts                # 入口（挂载 router）
    ├── App.vue                # 导航栏 + router-view 容器
    ├── router.ts              # 路由：/ 落地页、/docs 重定向到首篇、/docs/:slug 详情
    ├── style.css              # 全局深色主题样式 + CSS 变量 + .markdown-body
    ├── env.d.ts
    ├── composables/useReveal.ts     # 滚动入场动效（IntersectionObserver）
    ├── data/site.ts           # 内容集中管理（链接/功能/场景/部署）
    ├── content/docs.ts        # 文档元数据，以 ?raw 导入 docs/*.md
    ├── utils/markdown.ts      # markdown-it + DOMPurify 渲染
    ├── components/            # TheNavbar / HeroSection / PillarsSection /
    │                           #   FeaturesSection / ScenariosSection / DeploySection /
    │                           #   CtaSection / TheFooter / AppIcon / DocSidebar
    └── views/                 # HomeView（落地页）、DocArticleView（文档详情）
```

## 文档

文档为项目内**自包含副本**，位于 `landing/docs/`，构建时通过 `src/content/docs.ts` 以 `?raw` 导入并渲染。
新增/修改文档：直接在 `landing/docs/` 编辑 `.md`，并在 `src/content/docs.ts` 的 `docs` 数组中维护标题、描述、分组与排序。

## 定制

- 内容文案、链接、版本号集中在 `src/data/site.ts`。
- 主题色（Cloudflare 橙红 `#f38020`）与深色基调定义在 `src/style.css` 的 `:root` CSS 变量中。
