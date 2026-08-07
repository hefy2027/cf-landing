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

## AI Endpoints

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

### Image Generation

```
POST /v1/images/generations
```

OpenAI Images API compatible, supporting Cloudflare Workers AI Text-to-Image and Image-to-Image models. Supports account rotation and neuron consumption tracking.

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | string | Yes | Model name, e.g. `@cf/black-forest-labs/flux-1-schnell` |
| `prompt` | string | Yes | Text prompt for image generation |
| `image` | string | No | I2I mode: base64-encoded reference image |
| `strength` | number | No | I2I guidance strength, default `0.6` |
| `width` | number | No | Image width, default `1024` |
| `height` | number | No | Image height, default `1024` |
| `num_steps` | number | No | Number of generation steps |
| `negative_prompt` | string | No | Negative prompt |

**Example Request (T2I):**

```json
{
  "model": "@cf/black-forest-labs/flux-1-schnell",
  "prompt": "a cute cat sitting on a windowsill, watercolor style"
}
```

**Example Response:**

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

> **Tip**: Image-to-Image (I2I) mode is only available on select models (Flux 2, SDXL). The system auto-detects model capabilities and only shows the mode toggle button when both modes are supported.

---

### Text-to-Speech (TTS)

```
POST /v1/audio/speech
```

OpenAI Audio API compatible, supporting Cloudflare Workers AI Deepgram Aura models. Returns JSON base64 audio format.

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | string | Yes | Model name, e.g. `@cf/deepgram/aura-2` |
| `input` | string | Yes | Text to synthesize |
| `voice` | string | No | Voice name |

**Example Request:**

```json
{
  "model": "@cf/deepgram/aura-2",
  "input": "Hello, welcome to CF Manager!",
  "voice": "aura-2-thalia-en"
}
```

**Example Response:**

```json
{
  "audio": "base64-encoded audio data",
  "usage": {
    "neurons_used": 567
  }
}
```

> Audio is returned in JSON base64 format, directly playable or downloadable in the frontend.

---

### Translation

```
POST /v1/translations
```

Supports Cloudflare Workers AI M2M100 models for multi-language translation. Supports account rotation and neuron consumption tracking.

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | string | Yes | Model name, e.g. `@cf/meta/m2m100-1.2b` |
| `input` | string | Yes | Text to translate |
| `source_lang` | string | Yes | Source language code (e.g. `en`, `zh`) |
| `target_lang` | string | Yes | Target language code |

**Example Request:**

```json
{
  "model": "@cf/meta/m2m100-1.2b",
  "input": "Hello, world!",
  "source_lang": "en",
  "target_lang": "zh"
}
```

**Example Response:**

```json
{
  "translated_text": "你好，世界！",
  "usage": {
    "neurons_used": 89
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
