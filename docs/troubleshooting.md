# 故障排查与日志

运行 CF Manager 时可能遇到的常见问题及其解决方案。

## 部署相关

### Docker 版：Cloudflare API 请求 socket hang up

**现象**：批量操作或并发请求时，部分 API 调用失败，报 `socket hang up`。

**原因**：多账户并发时，网络代理无法处理所有连接。

**解决**：
- 更换更稳定的代理服务
- 在**系统设置**中临时关闭代理测试
- 减少同一时间的并发请求数量
- 改用 **Worker 版本**（Worker 在 CF 内网直接调用 API，无需外部代理）

### Worker 版：CPU 时间超限 (1102/1101)

**现象**：复杂批量操作失败，日志显示 `exceeded CPU time limit`。

**原因**：Free 计划限制 10ms CPU/请求。

**解决**：
- 升级到 Workers Paid 计划（取消 CPU 限制）
- 减少单次请求的并发账户数量
- 拆分大操作为多个小请求

### Fork 部署：Action 构建失败

**现象**：GitHub Actions 部署失败。

**常见原因与解决**：

| 原因 | 解决 |
|------|------|
| Secrets 未配置 | 检查 Environment Secrets 中 `CF_API_KEY`、`CF_EMAIL`、`ENCRYPTION_KEY` 是否已设置 |
| D1 创建失败 | 检查 Cloudflare 账户是否有 D1 使用权限 |
| Workflow 权限不足 | Settings → Actions → General → Workflow permissions → Read and write permissions |

---

## 账户相关

### 账户连接测试失败

**现象**：添加账户后测试连接显示失败。

**排查步骤**：

1. **API Token 权限不足**：确认 Token 权限覆盖所需资源（参考 [账户认证文档](./account-auth.md) 中的权限列表）
2. **Token 过期或撤销**：在 Cloudflare Dashboard 中检查 Token 状态
3. **网络代理问题**：如果使用代理，检查代理是否可达
4. **IP 被限制**：检查 Cloudflare 是否对当前 IP 做了访问限制

### 凭证加密相关问题

**现象**：重启后之前添加的账户无法使用。

**原因**：`ENCRYPTION_KEY` 变更导致已有凭证无法解密。

**解决**：务必保持 `ENCRYPTION_KEY` 不变。如果确实需要更换密钥，需重新添加所有账户。

---

## AI 推理相关

### 配额耗尽 (All accounts exhausted)

**现象**：AI 对话返回 429，提示 `All accounts have reached daily neuron limit`。

**解决**：
- 等待次日配额重置
- 添加更多 Cloudflare 账户分散配额
- 检查是否开启了 Prompt Caching，缓存命中可减少神经元消耗

### 流式响应中断

**现象**：长文本生成时流式输出中断。

**可能原因**：
- 网络不稳定（检查代理连接）
- Worker 版本 CPU 超时（长文本生成耗时较长）
- 模型自身限制

**建议**：减少单次请求的 `max_tokens` 或对长文本分多次请求。

---

## 日志查看

### Docker 版

```bash
# 实时查看容器日志
docker compose logs -f

# 查看后端日志文件
tail -f backend/data/logs/app.log
```

### Worker 版

- Dashboard → Workers & Pages → cf-manager → **Logs** 查看实时日志
- 通过 Wrangler CLI：`npx wrangler pages deployment tail`
- CF Manager 管理面板中进入 **操作审计** 查看平台内的操作日志

---

## 审计日志

CF Manager 记录所有通过管理面板执行的关键操作：

- 账户添加 / 删除 / 修改
- Workers / Pages 部署与回滚
- DNS 记录增删改
- 存储数据修改（KV / D1 / R2）
- 系统设置变更

在 **仪表盘 → 操作审计** 中可以按时间、操作类型、账户筛选查看。
