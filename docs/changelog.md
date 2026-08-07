# 更新日志

CF Manager 的完整版本记录。以下是近期主要更新摘要，完整内容见 [GitHub CHANGELOG](https://github.com/hefy2027/cf-manager/blob/master/CHANGELOG.md)。

## v2.0.0 (2026-08-07)

### 🚀 重大更新

- **AI 图片生成（文生图/图生图）**：新增 AI 图片生成功能，支持 Cloudflare Workers AI 的 Text-to-Image 和 Image-to-Image 模型（Flux-1-Schnell、Stable Diffusion XL 等），新增 `POST /v1/images/generations` 端点（OpenAI 兼容格式）
- **AI 语音合成（TTS）**：新增文字转语音功能，支持 Deepgram Aura 系列模型，新增 `POST /v1/audio/speech` 端点（OpenAI 兼容格式）
- **AI 翻译**：新增文本翻译功能，支持 M2M100 系列模型，新增 `POST /v1/translations` 端点
- **AI 工作台统一视图**：将 AI 对话、绘图、语音、翻译、统计合并为统一菜单，顶部 Tab 切换，路由 `/ai` 指向统一视图
- **前端国际化（i18n）**：引入 vue-i18n，支持中文（zh-CN）与英文（en）双语界面（1000+ 词条），自动检测浏览器语言并持久化
- **Zone 管理（创建/删除）**：DNS 管理页面新增批量创建和删除 Zone 功能，支持 textarea 每行一个域名批量添加
- **Zone 设置管理**：新增 Zone 级别设置面板，支持 SSL/TLS 模式、Always HTTPS、自动 HTTPS 重写、安全等级、Auto Minify、Brotli 压缩、0-RTT 等
- **Zone 缓存管理**：支持清除 Zone 全部缓存或按 URL 清除缓存，可查看和修改缓存级别、浏览器缓存 TTL、开发模式
- **Zone 状态管理**：支持在 CF Manager 中暂停/激活 Zone
- **DNS View UI 重构**：DNS 管理页面全面重构，新增账户过滤器、域名搜索框、Zone 状态指示器、按账户分组折叠列表、DNS 记录分页等

### 🔧 优化

- **Workers & Pages 部署增强**：支持环境变量（明文/机密）与绑定（KV/D1/R2/AI/DO/Service/Queue），仅更新配置重部署（secrets 变更走独立 API 不重传代码）
- **菜单优化**：「AI 推理」→「AI 工作台」重命名
- **模型能力检测**：基于 CF 官方文档精确识别模型支持的生成模式
- **Worker KV 缓存**：Worker 端 `getAllZones()` 新增 KV 缓存（5 分钟 TTL）
- **批量操作并发池**：Zone 批量创建/删除使用并发池（concurrency=3）

## v1.5.0 (2026-08-04)

### 🚀 新特性

- **Resin 代理池集成**：原生支持 [Resin](https://github.com/Resinat/Resin) 代理池网关，为每个 CF 账户构建 `http://Platform.{accountId}:Token@resin-host:port` 格式代理 URL，通过 sticky session 将每个账户绑定到稳定出口 IP，避免 Cloudflare 因 IP 频繁变动触发风控
- **代理优先级链**：账户专属代理（已启用）> Resin（已启用）> 全局代理（已启用）> 无代理。账户专属代理可覆盖 Resin，允许个别账户不走代理池
- **Docker 合并为单容器（All-in-One）**：原双容器（Nginx 前端 + Node.js 后端）合并为单一 Node.js 容器，Express 直接通过 `express.static` + `compression` 提供前端静态文件（gzip、30 天缓存、SPA 回退），不再依赖 Nginx
- **预构建镜像发布到 GHCR**：Release 打 tag 时自动构建多架构（amd64 + arm64）镜像并推送至 `ghcr.io/hefy2027/cf-manager`，直接 `docker pull` 即可使用

### 🐛 Bug 修复

- 修复 Worker 端批量部署缺少 `db` 参数导致审计日志丢失
- 修复部署 Modal 账户预选不一致（分页数据源导致误部署到错误账户）
- 修复 Settings 定时任务表单账户下拉选项不全
- 修复 Workers 页面部署按钮在分页翻页后被错误禁用

### 🔧 优化

- `proxyFetch` 支持自动使用 Resin / 账户代理，修复重试时丢失代理的 bug
- 部署结果新增 `accountName` / `accountId` 字段，成功弹窗展示部署目标账户名
- Docker 部署简化：`docker-compose.yml` 单服务；移除 `BASE_URL` 环境变量（Docker 版路径固定 `/`）
- `.dockerignore` 适配新的 `docker/Dockerfile` 路径

## v1.4.1 (2026-07-27)

### 🚀 账户管理增强

- **账户级独立代理**：每个账号可分配独立代理 URL 与启用开关，优先级为「账户代理 > 全局代理 > 环境变量」，互不干扰
- **审计日志筛选**：支持按操作类型与日期范围筛选审计日志，便于事后追溯与排查
- **账户批量操作**：账户列表支持批量勾选、批量删除、批量设置代理
- **账户设置优化**：新增账户代理独立弹窗，操作列收纳为「更多」下拉，适配移动端窄屏

## v1.4.0 (2026-07-24)

### 🚀 隧道与规则引擎

- **隧道管理**：Cloudflare Tunnel CRUD + 连接状态 + Ingress 可视化编辑
- **通用规则引擎**：统一管理 8 种 Cloudflare Rulesets 规则类型（回源 / URL 重写 / 头转换 / 缓存 / 防火墙 / 限速 / 重定向）
- **一键回源向导**：新建/复用隧道 + 自动 CNAME + 自动 Ingress，支持部分失败回滚
- **结构化规则表单**：每种规则类型提供直观表单，表达式生成器实时预览
- **高级模式**：支持直接编辑原始 JSON 规则

## v1.3.7 (2026-07-23)

### 🚀 部署与商店增强

- **两阶段部署**：新增预检端点，部署前自动检查配置差异与 Secrets 覆盖
- **ZIP 多模块部署**：自动解包多模块 ZIP，推断主模块
- **自定义域名 Zone 选择器**：Zone 下拉 + 子域名输入 + 实时预览
- **Pages 批量删除**：部署历史支持全选/批量删除
- **SSRF 安全加固**：全链路 URL 安全校验与 Content-Type 验证

## v1.3.6 (2026-07-21)

### 🚀 功能扩展

- **账户编辑**：支持原地修改账户名、凭证、认证方式
- **R2 可用性缓存**：加速存储管理页面的账户切换
- **Worker with Assets**：支持静态资源三阶段上传部署
- **Catalog Store 增强**：模板 Markdown 渲染、仓库入口按钮

## v1.3.5 (2026-07-11)

### 🚀 应用商店

- **Catalog Store**：完整的模板市场，浏览并一键部署 Workers / Pages
- **Pages 部署**：新增 Pages 项目创建与部署能力
- **SSRF 修复**：北邮网安学院报告的漏洞修复（感谢 Liu Huan 与 Zifeng Kang）

## v1.1.2 (2026-07-07)

### 🔒 安全加固

- Worker 部署全量 SSRF 防护（协议 / IP / 重定向 / Content-Type / 大小校验）
- 认证中间件：未配置密码时自动生成随机临时密钥并告警
- 审计日志增强：记录部署来源 URL

## v1.1.1 (2026-07-05)

### 🚀 稳定性提升

- 浏览器渲染限流器、SSE 心跳机制
- Wrangler v4 兼容性全面适配
- 仪表盘响应式布局优化

## v1.1.0 (2026-07-03)

### 🚀 AI 推理增强

- **Prompt Caching 感知计费**：区分缓存命中/未命中 Token，准确估算神经元消耗
- **缓存模型智能路由**：优先复用已缓存的账户，提升命中率
- Worker KV 绑定：跨请求缓存持久化

## v1.0.0 (2026-06)

### 🎉 首次发布

- 多账户统一管理、仪表盘、Workers / Pages / DNS / 存储运维
- OpenAI 兼容 AI 网关、浏览器渲染
- Docker + Cloudflare Pages 双部署方案
