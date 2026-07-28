# 安全最佳实践

CF Manager 提供多层安全机制来保护你的 Cloudflare 账户凭证与运维操作。

## 凭证安全

### 加密存储

所有 API Token 与 Global API Key 在存储前均采用 **AES 加密**，密钥为你设置的 `ENCRYPTION_KEY`。

| 存储位置 | 加密方式 |
|----------|----------|
| Docker 版 SQLite | AES 加密后存入数据库 |
| Worker 版 D1 | AES 加密后存入 D1 |
| 环境变量 Secret | 使用 Wrangler Secrets（加密 at rest） |

> ⚠️ `ENCRYPTION_KEY` 是加密的根基，务必使用**高强度的随机字符串**（至少 16 位），不要使用弱密码。更换 `ENCRYPTION_KEY` 后所有已存储的凭证将无法解密。

### 凭证类型选择

| 场景 | 推荐认证方式 |
|------|------------|
| 日常运维 | **API Token**（细粒度权限） |
| 初次快速体验 | Global API Key |
| 生产环境 | **API Token** + 最小权限 |

API Token 应仅授予**实际需要的权限**，详见 [账户认证文档](./account-auth.md) 中的推荐权限列表。

---

## 访问控制

### 登录密码

在 `.env` 或环境变量中设置 `API_SECRET` 后，所有管理界面操作都需要输入密码：

```bash
# .env
API_SECRET="your-strong-password"
```

密码存储在服务端，每次 API 请求通过 `Authorization: Bearer <token>` 验证。

演示站使用了固定密码（`cfmgrbest`），**生产环境请务必使用强密码**。

### 路径隐藏

管理界面默认通过 `/admin/` 子路径访问，根路径 `/` 显示伪装的 nginx 欢迎页面，对外部扫描者隐藏管理入口。

> **Docker 版**：可在 `.env` 中配置 `BASE_URL` 自定义管理路径。
> **Worker 版**：管理路径固定为 `/admin/`。

---

## 网络与代理

### 代理安全

如果通过代理访问 Cloudflare API：

- 使用 HTTPS 代理，避免明文传输
- 代理地址存储在 `.env` 中，不要提交到代码仓库
- 定期检查代理的访问日志，确认无异常请求

### 公网暴露风险

> ⚠️ CF Manager **不建议直接暴露到公网**。

如果必须从外部访问：
- 务必配置强密码（`API_SECRET`）
- 建议配合 Cloudflare Access 做身份验证
- 通过 Cloudflare Tunnel 做安全隧道代理，而非直接开放端口

---

## 操作安全

### 多账户隔离

- 不同用途（开发/测试/生产）的账户建议分别添加，便于管理和追踪
- 演示账户用 `DEMO_ACCOUNT_IDS` 环境变量保护，防止误删除或修改

### 敏感操作确认

以下操作在执行前需要二次确认：
- 删除 Workers 脚本
- 删除 DNS 记录
- 删除 D1 数据库
- 删除 R2 文件（批量）
- 回滚 Pages 部署

### 审计日志

所有关键操作均记录审计日志，包括操作人（管理员/API）、操作类型、目标资源与时间戳，便于事后追溯。

---

## 合规声明

> 本工具仅供**学习、技术研究与已授权账户的自有运维管理**使用。请严格遵循 [Cloudflare 服务条款](https://www.cloudflare.com/terms/)，禁止对外提供公共 AI 中转服务、转售算力或跨账号分摊配额。仅添加你本人或已明确授权的账户。
