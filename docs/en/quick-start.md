# Quick Start

CF Manager offers three deployment methods, from easy to advanced. Get a unified multi-account operations panel in as fast as 3 minutes.

| Method | Difficulty | Requires | Best For |
|------|------|------|----------|
| Fork One-Click Deploy | ⭐ | GitHub Account | Easiest, no tools needed |
| Cloudflare Pages Manual Deploy | ⭐⭐ | Node.js or Browser | Serverless, zero cost |
| Docker Deploy | ⭐⭐⭐ | VPS + Docker | Self-hosted, full control |

> For complete deployment details, see [Deployment Guide](./deploy.md).

---

## Method 1: Fork One-Click Deploy (Recommended)

Everything done in the browser — no tools to install.

### 1. Fork the Repository

Click the **Fork** button on the [cf-manager repository](https://github.com/hefy2027/cf-manager).

### 2. Configure Secrets

Go to your forked repo → **Settings** → **Environments** → **New environment** (e.g. `production`), add 4 secrets:

| Secret | Description |
|--------|------|
| `CF_API_KEY` | Cloudflare Global API Key (recommend using fine-grained API Token instead, see [Account Auth](./account-auth.md)) |
| `CF_EMAIL` | Cloudflare account email |
| `ENCRYPTION_KEY` | Encryption key (strong random string, at least 16 characters) |
| `API_SECRET` | Admin panel access password (strong random string) |

### 3. Trigger Deployment

Go to **Actions** → select **Deploy to Cloudflare Pages (Secrets)** → **Run workflow**, enter the environment name such as `production`.

### 4. Access the Admin Panel

After deployment completes, visit `https://<your-project>.pages.dev/admin/`.

> For multiple accounts, create multiple Environments with different credentials, then enter the environment name when deploying.

---

## Method 2: Docker Deploy

Best for self-hosted servers — fully self-owned data. The fastest path is to pull the prebuilt image directly (no cloning needed):

```bash
docker run -d --name cf-manager -p 3000:3000 \
  -e ENCRYPTION_KEY="your-strong-key" \
  -e API_SECRET="your-strong-password" \
  -v ./data:/app/data \
  --restart unless-stopped \
  ghcr.io/hefy2027/cf-manager:latest
```

Visit `http://localhost:3000`.

> For building from source or configuring a proxy, see [Deployment Guide](./deploy.md).

---

## Environment Variables

| Variable | Required | Description |
|------|------|------|
| `ENCRYPTION_KEY` | Yes | Key for encrypting stored API Tokens (at least 16 random characters) |
| `API_SECRET` | No | Admin panel access password, leave empty for no login |
| `PROXY_URL` | No | HTTP/SOCKS5 proxy address |
| `APP_PORT` | No | External port, default `3000` |
| `DEMO_ACCOUNT_IDS` | No | Demo-mode protected account IDs (comma-separated), protected accounts cannot be deleted/modified |
| `KV` (Binding) | No | KV Namespace binding (Pages deploy only), for concurrency protection & cache routing |

---

## Local Development

```bash
# Backend (http://localhost:3001)
cd backend
npm install
ENCRYPTION_KEY="dev-key" npm run dev

# Frontend (http://localhost:5173, auto-proxies /api to backend)
cd frontend
npm install
npm run dev
```

---

## Next Steps

- [Account Authentication](./account-auth.md): Learn about API Token vs Global API Key
- [Deployment Guide](./deploy.md): Complete details for all three deployment methods
- [External API Docs](./api-v1.md): How to use the OpenAI-compatible API
