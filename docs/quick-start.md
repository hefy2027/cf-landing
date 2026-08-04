# 快速开始

CF Manager 提供三种部署方式，从易到难任选其一。最快 3 分钟即可拥有一个统一的多账户运维面板。

| 方式 | 难度 | 需要 | 适合场景 |
|------|------|------|----------|
| Fork 一键部署 | ⭐ | GitHub 账号 | 最简单，无需任何工具 |
| Cloudflare Pages 手动部署 | ⭐⭐ | Node.js 或浏览器 | 无服务器，零成本 |
| Docker 部署 | ⭐⭐⭐ | VPS + Docker | 自建服务器，完全自主 |

> 完整部署细节见 [部署文档](./deploy.md)。

---

## 方式一：Fork 一键部署（推荐）

全程在浏览器中操作，无需安装任何工具。

### 1. Fork 仓库

点击 [cf-manager 仓库](https://github.com/hefy2027/cf-manager) 右上角 **Fork** 按钮。

### 2. 配置 Secrets

进入 Fork 仓库 → **Settings** → **Environments** → **New environment**（如 `production`），添加 4 个 secret：

| Secret | 说明 |
|--------|------|
| `CF_API_KEY` | Cloudflare Global API Key（建议改用细粒度 API Token，见 [账户认证](./account-auth.md)） |
| `CF_EMAIL` | Cloudflare 账号邮箱 |
| `ENCRYPTION_KEY` | 加密密钥（高强度随机字符串，至少 16 位） |
| `API_SECRET` | 管理界面访问密码（高强度随机字符串） |

### 3. 触发部署

进入 **Actions** → 选择 **Deploy to Cloudflare Pages (Secrets)** → **Run workflow**，输入环境名如 `production`。

### 4. 访问管理界面

部署完成后访问 `https://<your-project>.pages.dev/admin/`。

> 多账户可建多个 Environment 分别配密钥，部署时输入对应环境名即可。

---

## 方式二：Docker 部署

适合自建服务器，数据完全自有。最快方式是直接拉取预构建镜像（无需克隆仓库）：

```bash
docker run -d --name cf-manager -p 3000:3000 \
  -e ENCRYPTION_KEY="改成你的强密钥" \
  -e API_SECRET="改成你的强密码" \
  -v ./data:/app/data \
  --restart unless-stopped \
  ghcr.io/hefy2027/cf-manager:latest
```

访问 `http://localhost:3000`。

> 如需从源码构建或配置代理等，见 [部署文档](./deploy.md)。

---

## 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `ENCRYPTION_KEY` | 是 | 加密存储 API Token 的密钥（至少 16 位随机字符串） |
| `API_SECRET` | 否 | 管理界面访问密码，留空则无需登录 |
| `PROXY_URL` | 否 | HTTP/SOCKS5 代理地址 |
| `APP_PORT` | 否 | 对外端口，默认 `3000` |
| `DEMO_ACCOUNT_IDS` | 否 | 演示模式保护的账户 ID（逗号分隔），受保护账户不可删除/修改 |
| `KV` (Binding) | 否 | KV Namespace 绑定（仅 Pages 部署），用于并发保护与缓存路由 |

---

## 本地开发

```bash
# 后端（http://localhost:3001）
cd backend
npm install
ENCRYPTION_KEY="dev-key" npm run dev

# 前端（http://localhost:5173，自动代理 /api 到后端）
cd frontend
npm install
npm run dev
```

---

## 下一步

- [账户认证方式](./account-auth.md)：了解 API Token 与 Global API Key 的区别
- [部署文档](./deploy.md)：三种部署方式的完整细节
- [外部 API 文档](./api-v1.md)：OpenAI 兼容接口的调用方式
