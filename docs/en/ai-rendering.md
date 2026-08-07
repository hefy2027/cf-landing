# AI Workspace & Browser Rendering

CF Manager includes a unified AI workspace integrating chat, image generation, text-to-speech, and translation, along with a browser rendering engine, with intelligent scheduling and quota management across multiple accounts.

## AI Workspace

v2.0.0 merges AI chat, image, audio, translation, and stats into a unified menu with top Tab switching.

### Feature Overview

| Tab | Capability | Description |
|------|------|------|
| **Stats** | Usage Stats | Per-account AI usage summary (neuron consumption, request count, etc.) |
| **Chat** | AI Chat | Full Workers AI models, streaming output + Reasoning visualization, multi-turn context |
| **Image** | Image Generation | Text-to-Image (T2I) and Image-to-Image (I2I), supports Flux-1-Schnell, SDXL, etc. |
| **Audio** | TTS | Text-to-speech, supports Deepgram Aura models |
| **Translation** | Text Translation | Supports M2M100 models, multi-language translation |

### AI Chat

| Feature | Description |
|------|------|
| Model Support | Full Cloudflare Workers AI models (LLaMA / Qwen / Mistral / DeepSeek, etc.) |
| Streaming Chat | Real-time streaming output + Reasoning (chain-of-thought) visualization |
| Context Management | Multi-turn conversation history with manual clear / auto-truncation |
| Prompt Caching | Cache reuse reduces neuron consumption with billing awareness |
| Multi-Account Scheduling | Auto-switch to next available account when quota is exhausted |
| Model Comparison | Send the same prompt to multiple models simultaneously, compare results |

### AI Image Generation

Supports Cloudflare Workers AI Text-to-Image and Image-to-Image models:

| Feature | Description |
|------|------|
| Text-to-Image (T2I) | Generate images from text prompts, supports Flux-1-Schnell, Stable Diffusion XL, etc. |
| Image-to-Image (I2I) | Upload reference image + prompt to generate, supported by select models (Flux 2, SDXL) |
| Advanced Parameters | Width/height, steps, guidance strength, negative prompt |
| Model Capability Detection | Auto-detects model-supported generation modes, shows toggle button only when both modes are supported |
| I2I Default Strength | Default `strength` = 0.6, preserves more original image features |
| History Gallery | Generated image gallery with preview / download / reuse |
| Reuse Function | Click "Reuse" to auto-switch to I2I mode using the generated image as reference |
| Usage Display | Each image returns and displays neuron consumption (⚡ neurons badge) |

### AI Text-to-Speech (TTS)

| Feature | Description |
|------|------|
| Model Support | Cloudflare Workers AI Deepgram Aura models |
| Voice Selection | Multiple preset voices available |
| Output Format | JSON base64 audio, directly playable / downloadable |
| Operations | Play / download / reuse / delete |
| Usage Tracking | Neuron consumption tracking (per-character billing) |

### AI Translation

| Feature | Description |
|------|------|
| Model Support | Cloudflare Workers AI M2M100 models |
| Language Selection | Source / target language dropdowns |
| Operations | Translation result display / copy / neuron consumption display |
| Usage Tracking | Neuron consumption tracking |

### Prompt Caching-Aware Billing

Some models (GLM-5.2 / Kimi K2.5 / K2.6 / K2.7-code, etc.) support Prompt Caching. The system prioritizes cache reuse within the same account, significantly reducing inference cost:

- **First call**: Full billing
- **Cache hit**: Billed at cached token rate (typically 1/4 to 1/10 the price)
- **Cache TTL**: Typically expires after 5-10 minutes of inactivity

CF Manager's chat UI usage stats distinguish between **uncached tokens** and **cached tokens**, helping you understand actual neuron consumption.

---

## Browser Rendering

Uses the Cloudflare Browser Rendering API to render web pages into multiple formats.

### Five Rendering Modes

| Mode | Output | Description |
|------|------|------|
| **Screenshot** | `data:image/png;base64` | Full page or region screenshot |
| **HTML** | Raw HTML string | Get the post-render DOM |
| **Markdown** | Markdown text | Extract page content as Markdown |
| **PDF** | `data:application/pdf;base64` | Web page to PDF |
| **Link Extraction** | URL string list | Extract all links from the page |

### Usage

**UI Operation**:

1. Go to "Browser Rendering" page
2. Enter target URL
3. Select rendering mode
4. Click "Render" to view results
5. Download or copy results

**API Call**: Via `/v1/browser/render` endpoint. See [External API Docs](./api-v1.md).

---

## Multi-Account Quota Scheduling

CF Manager implements automatic quota scheduling for both AI workspace and browser rendering:

```
Request → Account A available? → Yes → Return result
           ↓ No (quota exhausted)
          Account B available? → Yes → Return result
           ↓ No
          Account C ...
           ↓ All exhausted
          Return 429 (All account quotas exhausted)
```

Scheduling strategies:
- **Round-robin**: Default — try active accounts in order
- **Low-usage priority**: Optionally prioritize accounts with lower quota usage
- **Exclusion rules**: Manually mark certain accounts to not participate in auto-scheduling

---

## Security Protection

### SSRF Protection (Browser Rendering)

Browser rendering accesses external URLs. Built-in protections:

- Block internal IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`)
- Block `localhost` and `0.0.0.0`
- DNS rebinding attack protection

### Rate Limiting

- Browser rendering supports concurrency limits and rate limits
- Exceeding limits returns 429 to prevent quota exhaustion

---

## Quota Reference

| Plan | Workers AI | Browser Rendering |
|------|------------|------------|
| Free | Free neurons/day | Limited calls/day |
| Paid | Per-neuron billing | Per rendering ms billing |

> Actual quotas subject to [Cloudflare Official Pricing](https://www.cloudflare.com/pricing/).
