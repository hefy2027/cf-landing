# 账户管理

CF Manager 的核心能力是多账户统一管理。本文介绍面板中账户的添加、编辑、切换、导入导出等操作。

## 账户列表

登录后在左侧导航进入「账户管理」，查看所有已添加的 Cloudflare 账户。

每个账户卡片展示：
- 账户名称（自定义）
- 认证类型（API Token / Global API Key）
- 功能支持状态（AI / Workers / Browser Render / DNS / Storage / R2）
- 连接状态（活跃/异常）

![账号管理](/screenshots/accounts.png)

---

## 添加账户

点击「添加账户」按钮，填写以下信息：

| 字段 | 说明 |
|------|------|
| 名称 | 自定义账户名，方便区分（如「生产环境」、「测试账户」） |
| 认证类型 | 选择 API Token（推荐）或 API Key + Email |
| API Token / API Key | 云凭证字符串 |
| Email | 仅 API Key 模式需要 |
| 功能开关 | 勾选该账户启用的功能（AI / Workers / Browser Render / DNS / Storage） |

> 凭证添加后自动 AES 加密存储，**添加前请确认源码中 `ENCRYPTION_KEY` 已配置**。
> 详细的认证凭证获取流程见 [账户认证文档](./account-auth.md)。

### 自动行为

添加成功后系统会自动：
1. 调用 Cloudflare API 验证凭证有效性
2. 拉取 Account ID 并存储
3. 探测 R2 可用性并缓存
4. 标记为「活跃」状态

---

## 编辑账户

支持原地修改已添加的账户：

- **修改名称**：重命名账户标识
- **切换认证方式**：API Token ↔ API Key + Email
- **更新凭证**：更换 Token 或 API Key
- **功能开关**：随时调整各功能的启用状态

> 编辑时凭证字段留空则保留原值，无需重新输入。

---

## 账户切换

多账户场景下的三种切换方式：

1. **全局切换**：顶部导航栏下拉选择当前活跃账户，后续所有操作以该账户为准
2. **页面级切换**：在 Workers、DNS、存储等页面顶部切换，不影响其他页面的当前账户
3. **自动切换**：AI 工作台和浏览器渲染在配额耗尽时自动轮换到下一可用账户

---

## 批量操作

### 批量测试连接

选择多个账户，点击「批量测试」，系统依次调用 Cloudflare API 验证各账户凭证有效性，并更新连接状态。

### 批量导入 / 导出

支持 CSV 格式的账户信息导入导出：

**导出**：将当前所有账户导出为 CSV（不含加密凭证），用于备份或迁移。

**导入**：上传 CSV 文件批量添加账户，CSV 列：
```
name,auth_type,token,email,features
生产环境,token,xxxxx,,ai|workers|dns
测试账户,apikey,xxxxx,test@example.com,storage|browser
```

> 导出文件不含加密凭证原文，仅导出名称、类型、功能等信息。

---

## 删除账户

删除账户前会有二次确认弹窗，防止误操作。

### 受保护账户

通过环境变量 `DEMO_ACCOUNT_IDS` 指定的账户不可删除或修改（演示站使用此机制保护共享演示账户）：
```bash
# .env
DEMO_ACCOUNT_IDS=1,2,3
```
