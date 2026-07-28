# 应用商店使用指南

CF Manager 内置应用商店（Catalog），提供 Workers 与 Pages 的一键部署模板。你可以直接从内置 Catalog 选择模板部署，也可以接入第三方模板源。

## 内置 Catalog

内置 Catalog 包含常用的部署模板，覆盖以下场景：

- **AI 应用**：聊天机器人、图像生成、向量搜索等
- **数据工具**：短链接、文件分享、表单收集等
- **运维工具**：状态监控、Webhook 转发、API 代理等
- **开发工具**：代码运行器、正则测试、JSON 格式化等

每个模板包含：
- 名称与描述
- 部署类型（Workers / Pages）
- 所需绑定（KV / D1 / R2 等）
- 环境变量说明
- 源码仓库链接

### 一键部署流程

1. 进入 **应用商店** 页面
2. 浏览或搜索目标模板
3. 点击「部署」，选择目标账户
4. 填写必要配置（环境变量、KV 绑定等）
5. 点击「确认部署」，等待完成

系统会自动完成：
- 克隆模板源码
- 创建并配置绑定
- 设置环境变量
- 构建并部署到 Workers / Pages

---

## 第三方模板源

除了内置 Catalog，你还可以接入第三方模板源来扩展可选模板。

### 接入方式

1. 进入 **应用商店** → **管理模板源**
2. 添加第三方源 URL，需符合 [Catalog JSON Schema](https://github.com/hefy2027/cf-store)
3. 系统自动校验并拉取模板列表
4. 接入后即可在商店中浏览和部署第三方模板

### cf-store

[cf-store](https://github.com/hefy2027/cf-store) 是 CF Manager 的官方 Catalog 模板仓库，包含：

- 内置 Catalog 的所有模板源码
- 社区贡献的模板
- Catalog 校验与版本管理

如果你有好的 Workers / Pages 模板想分享，可以向 cf-store 提交 PR。

---

## 模板开发

如果你想自己创建模板供商店使用，需准备：

| 文件 | 说明 |
|------|------|
| `manifest.json` | 模板元数据（名称、描述、类型、所需绑定） |
| `src/` | Workers / Pages 源码 |
| `wrangler.toml` | Wrangler 部署配置（如适用） |

模板规范参考 [cf-store 仓库文档](https://github.com/hefy2027/cf-store)。
