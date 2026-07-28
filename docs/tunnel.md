# 隧道管理与回源向导

CF Manager 将 Cloudflare Tunnel（原 Argo Tunnel）的创建、配置、Ingress 管理可视化，并提供一键回源向导自动打通隧道与 DNS。

## 什么是 Cloudflare Tunnel

Cloudflare Tunnel 在你的服务器与 Cloudflare 边缘节点之间建立一条安全的加密隧道，无需在防火墙上开放任何入站端口。适合：

- 内网服务对外暴露（无需公网 IP）
- 自建服务通过 Cloudflare 边缘网络加速
- 替代传统端口转发 / VPN

## 功能概览

| 操作 | 说明 |
|------|------|
| 创建 Tunnel | 一键创建隧道，生成 `cloudflared` 配置与 Token |
| 删除 Tunnel | 归档与清理不再使用的隧道 |
| Ingress 编辑 | 可视化编辑域名 → 服务映射规则 |
| 回源向导 | 一键配置 DNS CNAME + Ingress，无需手写命令行 |

---

## Ingress 规则

Ingress 是 Cloudflare Tunnel 的核心——它定义了**哪个域名 / 路径**的请求转发到**哪个内网服务**。

### 规则格式

```
域名:端口 → 内网服务地址
```

例如：
```
app.example.com → localhost:8080
*.example.com   → localhost:3000
```

### 可视化编辑

CF Manager 提供结构化表单编辑 Ingress 规则：

- 添加 / 删除 / 修改路由规则
- 域名通配符 `*` 支持
- 实时规则预览
- JSON 源文件导出（高级用户）

---

## 一键回源向导

这是 CF Manager 的亮点功能之一。传统配置 Tunnel + DNS 需要：

1. 创建 Tunnel
2. 安装 `cloudflared`
3. 配置 Ingress YAML
4. 手动添加 DNS CNAME 记录

**一键回源向导**自动完成后两步：

1. 选择 Tunnel，输入源站地址（如 `http://10.0.0.5:3000`）
2. 系统自动生成 Ingress 规则
3. 系统自动创建 DNS CNAME 记录指向 Tunnel 端点
4. 一键保存，即刻生效

> 对于 `*.example.com` 的泛域名回源，向导会自动匹配已有 DNS 记录并避免冲突。

---

## 安全提醒

- Tunnel Token 是敏感凭证，泄露后他人可接入你的内网服务
- 建议定期轮换 Tunnel Token
- Ingress 规则应遵循**最小权限原则**，仅暴露必要的服务与路径
- 生产环境建议配合 Cloudflare Access 做身份验证
