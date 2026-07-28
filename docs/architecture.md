# 技术架构

CF Manager 采用双后端架构，同一套业务逻辑分别适配 Docker 自建服务器与 Cloudflare Pages 边缘计算环境。

## 整体架构

```
                      ┌─────────────────────┐
                      │     Vue 3 前端        │
                      │  Naive UI · Pinia    │
                      │  base=/admin/        │
                      └──────────┬──────────┘
                                 │ /api/* /v1/*
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼───────┐        ┌───────▼──────────┐
            │  Docker 版      │        │  Worker (Pages) 版│
            │  Express 5      │        │  Hono             │
            │  Cloudflare SDK  │        │  CF REST API      │
            │  SQLite          │        │  D1 + KV           │
            └───────┬───────┘        └───────┬──────────┘
                    │                         │
            ┌───────▼───────┐        ┌───────▼──────────┐
            │  Cloudflare API │        │  Cloudflare API   │
            │  (通过代理)     │        │  (CF 内网直达)    │
            └───────────────┘        └──────────────────┘
```

## 技术栈对比

| 层级 | Docker 版 | Worker (Pages) 版 |
|------|-----------|-------------------|
| 前端 | Vue 3 · Naive UI · Pinia | 同左 |
| 后端框架 | Express 5 | Hono |
| API 调用 | Cloudflare SDK (Node.js) | Cloudflare REST API (fetch) |
| 数据库 | SQLite (better-sqlite3) | Cloudflare D1 |
| 缓存 | Node Cache (内存) | KV Namespace + D1 |
| 加密 | Node.js crypto (AES-GCM) | Web Crypto API (AES-GCM) |
| 代理 | 支持 HTTP / SOCKS5 | 不需要（CF 内网） |
| 定时任务 | node-cron | 不支持 |
| 日志 | 文件日志 + winston | console.log + Logpush |
| 部署方式 | Docker Compose | Wrangler / Pages Upload |

---

## 项目结构

```
cf-manager/
├── backend/                  # Docker 版后端 (Express 5)
│   └── src/
│       ├── index.ts          # Express 入口 + 中间件
│       ├── config.ts         # 环境变量配置
│       ├── db.ts             # SQLite 数据库管理
│       ├── middleware/       # 认证、错误处理、响应包装
│       ├── models/           # 数据模型（账户、KV、D1 等）
│       ├── routes/           # API 路由（accounts、workers、dns 等）
│       └── services/         # 业务逻辑层（Cloudflare SDK 封装）
├── frontend/                 # Vue 3 前端
│   └── src/
│       ├── api/              # API 调用封装
│       ├── views/            # 页面组件（Dashboard、Workers、DNS 等）
│       ├── components/       # 可复用组件
│       ├── stores/           # Pinia 状态管理
│       └── utils/            # 工具函数
├── worker/                   # Cloudflare Pages 版
│   ├── src/                  # Hono API 路由 + D1 模型
│   ├── build.js              # 一键构建脚本
│   └── wrangler.toml         # Wrangler 配置
├── docker/                   # Docker 构建配置
│   ├── backend/Dockerfile
│   └── frontend/
│       ├── Dockerfile
│       ├── nginx.conf.template
│       └── entrypoint.sh
├── shared/                   # 双端共享配置
│   ├── model-pricing.json    # AI 模型定价（含缓存价格）
│   ├── catalog.schema.json   # Catalog 模板 JSON Schema
│   └── catalogValidator.ts   # Catalog 校验器
├── docs/                     # 项目文档
├── docker-compose.yml        # Docker 编排
└── deploy.sh                 # 一键部署脚本
```

---

## 核心设计决策

### 为什么双后端

- **Docker 版**适合已有服务器的用户，数据完全自控，支持 SQLite 事务与定时任务
- **Worker 版**适合无服务器用户，零运维成本，利用 CF 内网直连避免网络问题

### catalog 校验共享

`shared/catalogValidator.ts` 与 `shared/catalog.schema.json` 被 backend、worker、前端构建脚本三方共用，通过 Ajv standalone 预编译消除 Workers 环境 `new Function()` 不支持的问题。

### 多账户调度策略

AI 推理与浏览器渲染的账户调度逻辑如下：

- **轮询 + 配额检查**：按顺序尝试各活跃账户，跳过已耗尽（4006）的账户
- **Prompt Caching 粘性**：缓存模型优先复用最近使用的账户，仅在用量偏差 > 10,000 神经元时切换
- **乐观预估 + 精确纠偏**：请求开始时做乐观配额预估（避免并发冲突），响应返回后以实际用量纠正

### 部署产物统一

`worker/build.js` 将前端 SPA 静态资源 + Hono 后端打包到一个 ZIP，实现单文件 Pages 部署，`_worker.js` 路由 `/api/*` 到 Hono 后端，其余路径由静态资源层处理。

---

## 扩展点

| 扩展方向 | 接入方式 |
|----------|----------|
| 新增 API 路由 | backend/src/routes/ + worker 同步实现 |
| 新增前端页面 | frontend/src/views/ + 路由 + 侧栏菜单 |
| 自定义 Catalog 源 | 符合 schema 的第三方模板源 URL |
| 模型定价更新 | 编辑 shared/model-pricing.json |
| 自定义密钥加密 | 修改 AES 加密/解密函数，保持 ENCRYPTION_KEY 不变 |

---

## 相关项目

- [cf-store](https://github.com/hefy2027/cf-store) —— 应用商店 Catalog 模板仓库
- [cf-landing](https://github.com/hefy2027/cf-landing) —— 本落地页项目
