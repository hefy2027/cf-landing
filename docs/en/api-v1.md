# External API Docs (`/v1`)

CF Manager exposes `/v1` endpoints compatible with the OpenAI API format, making it easy to connect locally with tools like Cursor, ChatGPT-Next-Web, Open WebUI, and other testing utilities.

> ⚠️ These endpoints are intended for **local/LAN development and debugging only**. Do not expose them to the public internet or provide them to third parties for commercial use. Exposing multi-account auto-scheduling APIs publicly violates Cloudflare Terms of Service and risks account bans. Use only for your own project's local integration debugging — no external compute sharing.

## Authentication

If `API_SECRET` is configured on the backend, all requests must include:

```
Authorization: Bearer <your API_SECRET>
```

## Base URL

```
http://<your-server-address>:<port>
```

Docker deployment default: `http://localhost:3000`. Local dev default: `http://localhost:3001`.

---

## AI Inference Endpoints

### List Models

```
GET /v1/models
```

Returns all currently available Cloudflare Workers AI models in OpenAI `/v1/models` compatible format.

**Example Response:**

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

### Chat Completions

```
POST /v1/chat/completions
```

OpenAI Chat Completions API compatible, supporting both streaming and non-streaming modes. Cache reuse is prioritized within a single account for Prompt Caching models (GLM-5.2 / Kimi K2.5 / K2.6 / K2.7-code) to reduce per-account neuron consumption. Automatic account switching is a technical scheduling mechanism only — do not use for cross-account quota sharing.

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | string | Yes | Model name, e.g. `@cf/meta/llama-3.1-8b-instruct` |
| `messages` | array | Yes | Message list, OpenAI format |
| `stream` | boolean | No | Enable streaming, default `false` |

> **Tip**: In streaming mode, `stream_options.include_usage` is automatically injected to ensure the response includes `usage` info.

**Example Request:**

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

**Non-Streaming Response Example:**

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

**Streaming Response:**

When `stream: true`, returns SSE (Server-Sent Events) format, consistent with OpenAI:

```
data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"delta":{"content":"Hello"},"index":0}]}

data: {"id":"chatcmpl-xxx","object":"chat.completion.chunk","choices":[{"delta":{"content":"!"},"index":0}]}

data: [DONE]
```

**Error Responses:**

| HTTP Status | Scenario |
|---|---|
| 401 | Missing or invalid Authorization header |
| 429 | All account quotas exhausted |
| 503 | No available accounts |

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

## Browser Rendering Endpoint

### Render Page

```
POST /v1/browser/render
```

Renders a web page using the Cloudflare Browser Rendering API, supporting screenshot, content extraction, and more.

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `url` | string | Yes | URL of the page to render |
| `mode` | string | No | Rendering mode, default `screenshot` |
| `accountId` | number | No | Specify account ID, auto-select if empty |

**Supported Modes:**

| mode | Return Field | Data Format |
|---|---|---|
| `screenshot` | `result.screenshot` | `data:image/png;base64,...` Data URL |
| `content` | `result.html` | Raw HTML string |
| `markdown` | `result.markdown` | Markdown text |
| `pdf` | `result.pdf` | `data:application/pdf;base64,...` Data URL |
| `links` | `result.links` | URL string array |

**Example Request:**

```json
{
  "url": "https://example.com",
  "mode": "markdown"
}
```

**Success Response - screenshot mode:**

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

**Success Response - content mode:**

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

**Success Response - markdown mode:**

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

**Success Response - pdf mode:**

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

**Success Response - links mode:**

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

> **Notes:**
> - `duration`: Total time in seconds (includes network + rendering)
> - `browserMsUsed`: Actual Cloudflare browser rendering time in milliseconds (for quota billing)
> - `screenshot` and `pdf` return Data URL format — usable directly in `<img>` tags or for download
> - Data URL prefixes include MIME type for easy frontend use

**Error Responses:**

| HTTP Status | Scenario |
|---|---|
| 400 | Missing `url` or invalid `mode` |
| 404 | Specified `accountId` not found |
| 429 | Rate limited or all account quotas exhausted |
| 500 | Rendering failed |

```json
{
  "success": false,
  "error": {
    "message": "All accounts have exhausted today's browser rendering quota",
    "code": "ALL_ACCOUNTS_EXHAUSTED"
  }
}
```

---

## Usage Examples

### Cursor Configuration

In Cursor settings, point the API address to this service's `/v1` endpoint:

```
Base URL: http://localhost:3000/v1
API Key:  <your API_SECRET, or leave empty if not configured>
```

### Python (openai SDK)

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:3000/v1",
    api_key="your-api-secret",  # Use any string if API_SECRET is not configured
)

response = client.chat.completions.create(
    model="@cf/meta/llama-3.1-8b-instruct",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)
```

### curl

```bash
# Non-streaming
curl http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-secret" \
  -d '{
    "model": "@cf/meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Streaming
curl http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-secret" \
  -d '{
    "model": "@cf/meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'

# Browser rendering
curl http://localhost:3000/v1/browser/render \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-secret" \
  -d '{"url": "https://example.com", "mode": "markdown"}'
```
