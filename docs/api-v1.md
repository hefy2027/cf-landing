# External API 文档 (`/v1`)

CF Manager 暴露 `/v1` 系列接口，兼容 OpenAI API 格式，方便本地对接 Cursor、ChatGPT-Next-Web、Open WebUI 等自研测试工具。

> ⚠️ 该接口仅推荐**局域网本地开发调试**使用：禁止直接公网暴露、对外提供给第三方商用；公网开放多账户自动调度接口会违反 Cloudflare 服务条款，存在账号封禁风险；仅用于自有项目本地对接调试，不支持对外分发算力服务。

## 认证

如果后端配置了 `API_SECRET`，所有请求需要在 Header 中携带：

```
Authorization: Bearer <你的 API_SECRET>
```

## Base URL

```
http://<你的服务器地址>:<端口>
```

Docker 部署默认为 `http://localhost:3000`，本地开发为 `http://localhost:3001`。

---

## AI 接口

### 获取模型列表

```
GET /v1/models
```

返回当前可用的所有 Cloudflare Workers AI 模型，格式兼容 OpenAI `/v1/models`。

**响应示例：**

```json
{
  "object": "list",
  "data": [
    {
      "id": "@cf/meta/llama-3.1-8b-instruct",
      "object": "model",
      "created": 1718179200,
      "owned_by": "cloudflare"
    },
    {
      "id": "@cf/qwen/qwen2.5-coder-32b-instruct",
      "object": "model",
      "created": 1718179200,
      "owned_by": "cloudflare"
    }
  ]
}
```

---

### 聊天补全

```
POST /v1/chat/completions
```

兼容 OpenAI Chat Completions API，支持流式和非流式模式。默认在单账户内对请求做缓存复用（Prompt Caching 模型 GLM-5.2 / Kimi K2.5 / K2.6 / K2.7-code 优先复用同一账户的缓存），以降低单账号自身神经元消耗；自动账户切换仅为技术调度逻辑，请勿用于跨账号分摊配额。

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `model` | string | 是 | 模型名称，如 `@cf/meta/llama-3.1-8b-instruct` |
| `messages` | array | 是 | 消息列表，OpenAI 格式 |
| `stream` | boolean | 否 | 是否开启流式返回，默认 `false` |

> **提示**：流式模式下 `stream_options.include_usage` 会被自动注入，确保响应包含 `usage` 信息。

**请求示例：**

```json
{
  "model": "@cf/meta/llama-3.1-8b-instruct",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ],
  "stream": false
}
```

**非流式响应示例：**

```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1718179200,
  "model": "@cf/meta/llama-3.1-8b-instruct",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 10,
    "total_tokens": 30,
    "prompt_tokens_details": {
      "cached_tokens": 0
    }
  }
}
```

**流式响应：**

当 `stream: true` 时，返回 SSE（Server-Sent Events）格式，与 OpenAI 流式格式一致：

```
data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"delta":{"content":"Hello"},"index":0}]}

data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"delta":{"content":"!"},"index":0}]}

data: [DONE]
```

**错误响应：**

| HTTP 状态码 | 场景 |
|---|---|
| 401 | 缺少或无效的 Authorization Header |
| 429 | 所有账户配额已耗尽 |
| 503 | 没有可用账户 |

```json
{
  "error": {
    "message": "All accounts have reached daily neuron limit",
    "type": "quota_exceeded",
    "code": "ALL_ACCOUNTS_EXHAUSTED"
  }
}
```

---

### 图片生成

```
POST /v1/images/generations
```

兼容 OpenAI Images API，支持 Cloudflare Workers AI 的 Text-to-Image 和 Image-to-Image 模型。支持账户轮换、神经元消耗追踪。

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `model` | string | 是 | 模型名称，如 `@cf/black-forest-labs/flux-1-schnell` |
| `prompt` | string | 是 | 生成图片的提示词 |
| `image` | string | 否 | 图生图模式：base64 编码的参考图片 |
| `strength` | number | 否 | 图生图引导强度，默认 `0.6` |
| `width` | number | 否 | 图片宽度，默认 `1024` |
| `height` | number | 否 | 图片高度，默认 `1024` |
| `num_steps` | number | 否 | 生成步数 |
| `negative_prompt` | string | 否 | 反向提示词 |

**请求示例（文生图）：**

```json
{
  "model": "@cf/black-forest-labs/flux-1-schnell",
  "prompt": "a cute cat sitting on a windowsill, watercolor style"
}
```

**响应示例：**

```json
{
  "created": 1718179200,
  "data": [
    {
      "url": "data:image/png;base64,iVBORw0KGgo..."
    }
  ],
  "usage": {
    "neurons_used": 1234
  }
}
```

> **提示**：图生图模式（I2I）仅在部分模型上可用（Flux 2、SDXL）。系统会自动检测模型能力，仅当模型同时支持两种模式时才显示模式切换按钮。

---

### 语音合成（TTS）

```
POST /v1/audio/speech
```

兼容 OpenAI Audio API，支持 Cloudflare Workers AI 的 Deepgram Aura 系列模型。返回 JSON base64 音频格式。

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `model` | string | 是 | 模型名称，如 `@cf/deepgram/aura-2` |
| `input` | string | 是 | 要合成语音的文本 |
| `voice` | string | 否 | 语音名称 |

**请求示例：**

```json
{
  "model": "@cf/deepgram/aura-2",
  "input": "Hello, welcome to CF Manager!",
  "voice": "aura-2-thalia-en"
}
```

**响应示例：**

```json
{
  "audio": "base64编码的音频数据",
  "usage": {
    "neurons_used": 567
  }
}
```

> 音频以 JSON base64 格式返回，可直接在前端播放或下载。

---

### 翻译

```
POST /v1/translations
```

支持 Cloudflare Workers AI 的 M2M100 系列模型，多语言互译。支持账户轮换、神经元消耗追踪。

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `model` | string | 是 | 模型名称，如 `@cf/meta/m2m100-1.2b` |
| `input` | string | 是 | 要翻译的文本 |
| `source_lang` | string | 是 | 源语言代码（如 `en`、`zh`） |
| `target_lang` | string | 是 | 目标语言代码 |

**请求示例：**

```json
{
  "model": "@cf/meta/m2m100-1.2b",
  "input": "Hello, world!",
  "source_lang": "en",
  "target_lang": "zh"
}
```

**响应示例：**

```json
{
  "translated_text": "你好，世界！",
  "usage": {
    "neurons_used": 89
  }
}
```

---

## 浏览器渲染接口

### 渲染页面

```
POST /v1/browser/render
```

使用 Cloudflare Browser Rendering API 渲染指定 URL 的网页，支持截图、内容提取等多种模式。

**请求体：**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `url` | string | 是 | 要渲染的网页 URL |
| `mode` | string | 否 | 渲染模式，默认 `screenshot` |
| `accountId` | number | 否 | 指定账户 ID，不填则自动选择 |

**支持的渲染模式：**

| mode | 返回字段 | 数据格式 |
|---|---|---|
| `screenshot` | `result.screenshot` | `data:image/png;base64,...` Data URL |
| `content` | `result.html` | 原始 HTML 字符串 |
| `markdown` | `result.markdown` | Markdown 文本 |
| `pdf` | `result.pdf` | `data:application/pdf;base64,...` Data URL |
| `links` | `result.links` | URL 字符串数组 |

**请求示例：**

```json
{
  "url": "https://example.com",
  "mode": "markdown"
}
```

**成功响应 - screenshot 模式：**

```json
{
  "success": true,
  "result": {
    "mode": "screenshot",
    "screenshot": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "duration": 2.345,
    "browserMsUsed": 2345
  }
}
```

**成功响应 - content 模式：**

```json
{
  "success": true,
  "result": {
    "mode": "content",
    "html": "<!DOCTYPE html><html><head><title>Example Domain</title></head><body>...</body></html>",
    "duration": 1.234,
    "browserMsUsed": 1234
  }
}
```

**成功响应 - markdown 模式：**

```json
{
  "success": true,
  "result": {
    "mode": "markdown",
    "markdown": "# Example Domain\n\nThis domain is for use in illustrative examples in documents...",
    "duration": 1.567,
    "browserMsUsed": 1567
  }
}
```

**成功响应 - pdf 模式：**

```json
{
  "success": true,
  "result": {
    "mode": "pdf",
    "pdf": "data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAv...",
    "duration": 3.456,
    "browserMsUsed": 3456
  }
}
```

**成功响应 - links 模式：**

```json
{
  "success": true,
  "result": {
    "mode": "links",
    "links": [
      "https://www.iana.org/domains/example",
      "https://example.com/about",
      "https://example.com/contact"
    ],
    "duration": 1.890,
    "browserMsUsed": 1890
  }
}
```

> **说明：**
> - `duration`：总耗时（秒），包含网络请求和浏览器渲染
> - `browserMsUsed`：Cloudflare 浏览器实际渲染耗时（毫秒），用于配额计费
> - `screenshot` 和 `pdf` 返回 Data URL 格式，可直接用于 `<img>` 标签或下载
> - Data URL 前缀包含 MIME 类型，方便前端直接使用

**错误响应：**

| HTTP 状态码 | 场景 |
|---|---|
| 400 | 缺少 url 或无效的 mode |
| 404 | 指定的 accountId 不存在 |
| 429 | 请求频率过高或所有账户配额耗尽 |
| 500 | 渲染失败 |

```json
{
  "success": false,
  "error": {
    "message": "所有账户今日浏览器渲染配额已耗尽",
    "code": "ALL_ACCOUNTS_EXHAUSTED"
  }
}
```

---

## 使用示例

### Cursor 配置

在 Cursor 设置中将 API 地址配置为本服务的 `/v1` 端点：

```
Base URL: http://localhost:3000/v1
API Key:  <你的 API_SECRET，没配置则留空>
```

### Python (openai SDK)

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:3000/v1",
    api_key="your-api-secret",  # 没配置 API_SECRET 则随意填
)

response = client.chat.completions.create(
    model="@cf/meta/llama-3.1-8b-instruct",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)
```

### curl

```bash
# 非流式
curl http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-secret" \
  -d '{
    "model": "@cf/meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# 流式
curl http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-secret" \
  -d '{
    "model": "@cf/meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'

# 浏览器渲染
curl http://localhost:3000/v1/browser/render \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-secret" \
  -d '{"url": "https://example.com", "mode": "markdown"}'
```
