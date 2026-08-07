# DNS 管理

CF Manager 统一管理多个 Cloudflare 账户下所有域名的 DNS 记录与 Zone 设置，支持记录 CRUD、Zone 批量创建/删除、Zone 设置管理、缓存清除、暂停/激活与批量操作。

## Zone 概览

DNS 管理页面展示当前账户下所有域名的 Zone 列表，以及对应 DNS 记录数量和代理状态。v2.0.0 新增账户过滤器（默认选上次使用账户，localStorage 记忆）、域名搜索框、Zone 状态指示器（彩色圆点）、按账户分组折叠列表。点击 Zone 进入该域名的记录详情页。

![DNS 管理](/screenshots/dns.png)

---

## Zone 管理

### 批量创建 Zone

v2.0.0 新增批量创建 Zone 功能：

1. 点击「创建 Zone」按钮
2. 在 textarea 中每行输入一个域名
3. 选择目标账户和 Zone 类型（Full / Partial）
4. 提交后系统使用并发池（concurrency=3）批量创建
5. 创建成功后展示 Cloudflare 分配的 NS 信息，支持一键复制

### 批量删除 Zone

- 域名列表支持 checkbox 多选
- 选中后点击「批量删除」
- 删除前二次确认防误操作
- 使用并发池批量删除，避免 CF API 速率限制

### Zone 设置管理

v2.0.0 新增 Zone 级别设置面板，支持查看和修改以下设置项：

| 设置项 | 说明 |
|------|------|
| SSL/TLS 模式 | Off / Flexible / Full / Full (Strict) |
| Always HTTPS | 开启后所有 HTTP 请求自动重定向到 HTTPS |
| 自动 HTTPS 重写 | 自动重写页面中的 HTTP 链接为 HTTPS |
| 安全等级 | Off / Essentially Off / Low / Medium / High |
| Auto Minify | HTML / CSS / JS 压缩 |
| Brotli 压缩 | 启用 Brotli 压缩算法 |
| 0-RTT | 0-RTT 连接恢复 |

### Zone 缓存管理

- **清除全部缓存**：一键清除 Zone 下所有缓存
- **按 URL 清除缓存**：输入指定 URL 清除对应缓存
- **缓存级别**：查看和修改缓存级别（No Query String / Ignore Query String / Standard / Aggressive）
- **浏览器缓存 TTL**：查看和修改浏览器缓存 TTL
- **开发模式**：临时绕过缓存，直接访问源站

### Zone 状态管理

- 支持在 CF Manager 中暂停 / 激活 Zone
- 暂停前二次确认警告（暂停后该 Zone 的所有 Cloudflare 服务将停止）
- 创建/删除 Zone 后自动清除 zones 缓存，确保列表数据实时性

---

## DNS 记录管理

### 支持的记录类型

| 类型 | 说明 | 典型值 |
|------|------|--------|
| A | IPv4 地址 | `192.0.2.1` |
| AAAA | IPv6 地址 | `2001:db8::1` |
| CNAME | 别名指向 | `app.example.com` |
| MX | 邮件交换 | `mail.example.com` + 优先级 |
| TXT | 文本记录 | SPF / DKIM / 验证记录 |
| NS | 名称服务器 | 通常由 Cloudflare 管理 |
| SRV | 服务记录 | 端口 + 目标 + 优先级 |
| CAA | 证书颁发机构授权 | 限制可签发 SSL 证书的 CA |

### 添加记录

1. 进入目标 Zone 的 DNS 详情页
2. 点击「添加记录」
3. 选择记录类型
4. 填写主机名（如 `@`、`www`、`api`）
5. 填写记录值
6. 选择是否开启代理（橙色云朵）
7. 可选设置 TTL

### 编辑与删除

- 点击记录行即可编辑
- 勾选多条记录可批量删除
- 删除操作有二次确认

---

## 代理开关（橙色云朵）

Cloudflare 代理是 DNS 管理中最常用的功能。

| 状态 | 图标 | 说明 |
|------|------|------|
| 已代理 | 🟠 橙色云朵 | 流量经过 Cloudflare 边缘节点，享受 CDN / DDoS 防护 / SSL |
| 仅 DNS | ⚪ 灰色云朵 | 流量直连源站，不经过 Cloudflare 代理 |

### 一键切换

CF Manager 支持对单条或批量选中记录一键开关代理，无需逐条进入详情页。

> 开启代理后，Cloudflare 会自动签发并管理 SSL 证书（需域名的 DNS 托管在 Cloudflare）。

---

## 批量操作

### 批量添加

适合一次性创建多条格式相似的 DNS 记录：

1. 点击「批量添加」
2. 在编辑器中按表格格式填写（类型 | 主机名 | 值 | TTL | 代理）
3. 预览确认后一键提交

### 批量编辑 / 删除

勾选多条记录后：
- **批量切换代理**：同时开启或关闭所有选中记录的代理
- **批量删除**：删除所有选中记录

### 跨 Zone 管理

在 Zone 列表中切换不同域名，无需退出 DNS 管理页面。

---

## CNAME 自动发现（隧道回源）

在隧道管理功能中配置回源向导时，系统会自动扫描 DNS 记录中的 CNAME，帮助快速匹配隧道端点与已有域名。

详见 [隧道与回源文档](./tunnel.md)。

---

## 注意事项

- DNS 变更可能需要一定时间在全球生效（取决于 TTL 设置）
- 开启代理后，源站 IP 被隐藏，访问者看到的是 Cloudflare 的边缘 IP
- 修改 NS 记录可能影响域名解析，请谨慎操作
