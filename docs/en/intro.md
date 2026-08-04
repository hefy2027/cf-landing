# What is CF Manager

CF Manager is a **all-in-one multi-account Cloudflare operations platform** designed for developers and DevOps teams. It solves the pain of constantly switching between Cloudflare dashboards and managing resources across accounts.

It provides visual management for DNS, Workers, Pages, and KV/D1/R2 storage, along with built-in AI inference, browser rendering for local debugging, and an **internal/local-only** OpenAI-compatible API.

![Dashboard](/screenshots/dashboard.png)

## Three Core Capabilities

| Capability | Description |
|------|------|
| **Multi-Account Management** | API Token / Global API Key dual authentication, AES credential encryption, one-click account switching & scheduling |
| **Full-Stack Resource Ops** | Visual management for DNS, Workers, Pages, KV/D1/R2, Tunnels & rule engines, cross-account batch deployment with structured forms instead of raw JSON |
| **OpenAI-Compatible AI Gateway** | Full Workers AI model inference, Prompt Caching-aware billing, multi-account quota scheduling, and `/v1` endpoints for local debugging |

## Dual Backend Architecture

Same business logic, deployed in two ways:

- **Docker Edition**: Express 5 + Cloudflare SDK + SQLite, self-hosted server deployment
- **Worker Edition**: Hono + Cloudflare REST API + D1, Cloudflare Pages deployment

Both share the same Vue 3 + Naive UI frontend.

## Security Features

- API Token / Global API Key stored with AES encryption
- Optional login password to protect the admin panel
- Path hiding: Worker edition `/admin/` path + root masked as nginx default page; Docker edition serves the panel at root `/`
- Complete operation audit logs

> ⚠️ **Disclaimer**: This tool is intended solely for learning, technical research, and self-management of authorized accounts. Please strictly follow [Cloudflare Terms of Service](https://www.cloudflare.com/terms/). Do not use for public AI/rendering relay services, resale, or compute sharing. Only add accounts that you own or have explicit authorization for.

## Tech Stack

| Layer | Docker Edition | Worker Edition |
|------|-----------|-----------|
| Frontend | Vue 3 · Naive UI · Pinia | Same |
| Backend | Express 5 · Cloudflare SDK | Hono · Cloudflare REST API |
| Database | SQLite (better-sqlite3) | Cloudflare D1 |
| Deployment | Docker Compose | Cloudflare Pages |

## Related Projects

- [cf-store](https://github.com/hefy2027/cf-store): Catalog template repository for CF Manager's App Store (app/Worker deployment template source).
