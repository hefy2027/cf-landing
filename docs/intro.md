# 什么是 CF Manager

CF Manager 是面向开发者与运维的**一站式 Cloudflare 多账户统一运维管理平台**，解决多账号频繁切换后台、资源批量运维繁琐的问题。

支持可视化管理域名 DNS、Workers、Pages 与 KV / D1 / R2 存储，附带内置 AI 推理、网页渲染的本地调试能力，并提供**仅限内网本地使用**的 OpenAI 兼容适配接口。

![仪表盘](/screenshots/dashboard.png)

## 三大核心能力

| 能力 | 说明 |
|------|------|
| **多账户统一管理** | API Token / Global API Key 双认证，凭证 AES 加密存储，多账户一键切换与调度 |
| **全栈资源运维** | DNS、Workers、Pages、KV / D1 / R2、隧道与规则引擎，跨账户批量部署，结构化表单替代手写 JSON |
| **OpenAI 兼容 AI 网关** | Workers AI 全模型推理，Prompt Caching 感知计费，多账户配额调度，暴露 `/v1` 接口供本地调试 |

## 双后端架构

同一套业务逻辑，分别用两种方式部署：

- **Docker 版**：Express 5 + Cloudflare SDK + SQLite，自建服务器部署
- **Worker 版**：Hono + Cloudflare REST API + D1，Cloudflare Pages 部署

前端共享同一套 Vue 3 + Naive UI 界面。

## 安全特性

- API Token / Global API Key 采用 AES 加密存储
- 可选登录密码保护管理界面
- 路径隐藏：Worker 版 `/admin/` 路径 + 根路径伪装 nginx 默认页；Docker 版根路径即管理界面
- 完整操作审计日志

> ⚠️ **免责声明**：本工具仅供学习、技术研究与已授权账户的自有运维管理使用。请严格遵守 [Cloudflare 服务条款](https://www.cloudflare.com/terms/)，禁止用于对外提供公共 AI / 渲染中转服务、转售或分摊算力。仅添加你本人或已明确授权的 Cloudflare 账户。

## 技术栈

| 层级 | Docker 版 | Worker 版 |
|------|-----------|-----------|
| 前端 | Vue 3 · Naive UI · Pinia | 同左 |
| 后端 | Express 5 · Cloudflare SDK | Hono · Cloudflare REST API |
| 数据库 | SQLite (better-sqlite3) | Cloudflare D1 |
| 部署 | Docker Compose | Cloudflare Pages |

## 相关项目

- [cf-store](https://github.com/hefy2027/cf-store)：CF Manager「应用商店」的 Catalog 模板仓库（应用 / Worker 部署模板源）。
