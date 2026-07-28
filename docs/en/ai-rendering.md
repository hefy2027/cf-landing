# AI Inference & Browser Rendering

CF Manager includes built-in AI inference chat and browser rendering engine, with intelligent scheduling and quota management across multiple accounts.

## AI Inference

### Feature Overview

| Feature | Description |
|------|------|
| Model Support | Full Cloudflare Workers AI models (LLaMA / Qwen / Mistral / DeepSeek, etc.) |
| Streaming Chat | Real-time streaming output + Reasoning (chain-of-thought) visualization |
| Context Management | Multi-turn conversation history with manual clear / auto-truncation |
| Prompt Caching | Cache reuse reduces neuron consumption with billing awareness |
| Multi-Account Scheduling | Auto-switch to next available account when quota is exhausted |
| Model Comparison | Send the same prompt to multiple models simultaneously, compare results |

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

CF Manager implements automatic quota scheduling for both AI inference and browser rendering:

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
