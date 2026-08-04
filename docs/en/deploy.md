# CF Manager Deployment Guide

CF Manager supports three deployment methods. **Fork One-Click Deploy** is recommended — easiest, no tools needed.

| Method | Difficulty | Requires | Best For |
|------|------|------|----------|
| Fork One-Click Deploy | ⭐ | GitHub Account | Easiest, no tools needed |
| Cloudflare Worker Deploy | ⭐⭐ | Node.js or Browser | Serverless, zero cost |
| Docker Deploy | ⭐⭐⭐ | VPS + Docker | Self-hosted, full control |

---

## Method 0: Fork One-Click Deploy (Recommended)

Everything done in the browser — no tools to install, 3 minutes to complete.

### Prerequisites

- A GitHub account
- A Cloudflare account (to obtain Global API Key)

### Deployment Steps

#### 1. Fork the Repository

Click the **Fork** button in the top-right corner to fork the project to your own GitHub account.

#### 2. Get Your Cloudflare Global API Key

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. **API Keys** → **Global API Key** → **View**
3. Note your API Key and account email; you'll enter them when running the Action

#### 3. Run the Deploy Action

Two Action types available. **Secrets version is recommended** (more secure — sensitive info won't appear in logs).

**Option A: Secrets Version (Recommended)**

1. Go to Fork repo → **Settings** → **Environments** → **New environment**, create an environment (e.g. `production`)
2. Click the environment → **Environment secrets** → **Add secret**, add:

| Secret Name | Description |
|---|---|
| `CF_API_KEY` | Cloudflare Global API Key |
| `CF_EMAIL` | Cloudflare account email |
| `ENCRYPTION_KEY` | Encryption key (e.g. `cfmgrbest`) |
| `API_SECRET` | Access password (e.g. `cfmgrbest`) |

3. Go to **Actions** tab → Select **Deploy to Cloudflare Pages (Secrets)** from the left sidebar
4. Click **Run workflow**, enter environment name (e.g. `production`), leave other params as default, click the green button

> For multiple Cloudflare accounts, create multiple Environments, each with different keys. Enter the environment name when deploying.

**Option B: Manual Input Version**

1. Go to **Actions** tab → Select **Deploy to Cloudflare Pages** from the left sidebar
2. Click **Run workflow**, fill in the parameters:
   - `cf_api_key`: Cloudflare Global API Key
   - `cf_email`: Cloudflare account email
   - `full_wipe`: Check to fully wipe D1 + KV and rebuild (clean deployment)
   - Keep others as default
3. Click the green **Run workflow** button

> Note: Option B briefly exposes sensitive values in the first step log (GitHub Actions design limitation). Option A is recommended.

#### 4. Wait for Deployment

The Action automatically:
- Creates a D1 database and initializes it
- Creates a KV namespace and binds it
- Builds frontend and backend code
- Deploys to Cloudflare Pages
- Configures encryption key and access password

#### 5. Access

After deployment, visit `https://cfmgr.pages.dev/admin/` (or `https://<project-name>.pages.dev/admin/` if you changed the project name).

Default password: `cfmgrbest`

### Updating

Run the **Deploy to Cloudflare Pages (Secrets)** or **Deploy to Cloudflare Pages** Action again. The database will not be overwritten.

To also sync upstream changes:
1. On the Fork's GitHub page, click **Sync fork** to sync upstream updates
2. Then run the deploy Action

---

## Method 1: Docker Deploy

For users with their own server (VPS) — a single container with the Node.js backend + frontend static files, no Nginx needed.

### Prerequisites

- Docker and Docker Compose
- A server that can reach the Cloudflare API (or configure a proxy)

### Method A: Prebuilt Image (Recommended)

No need to clone the repo — just pull and run the image:

```bash
docker run -d --name cf-manager -p 3000:3000 \
  -e ENCRYPTION_KEY="cfmgrbest" \
  -e API_SECRET="cfmgrbest" \
  -v ./data:/app/data \
  --restart unless-stopped \
  ghcr.io/hefy2027/cf-manager:latest
```

> ⚠️ Change `ENCRYPTION_KEY` and `API_SECRET` to your own strong passwords before production use.

Visit `http://<your-server-ip>:3000`.

### Method B: Build from Source

```bash
# 1. Clone the project
git clone https://github.com/hefy2027/cf-manager.git
cd cf-manager

# 2. Create config file
cp .env.example .env

# 3. Edit .env configuration
```

### Environment Variables

Edit `.env`:

| Variable | Required | Description |
|------|------|------|
| `ENCRYPTION_KEY` | Yes | Key for encrypting stored API Tokens (arbitrary random string, at least 16 characters) |
| `API_SECRET` | No | Admin panel access password, leave empty for no login |
| `PROXY_URL` | No | HTTP/SOCKS5 proxy URL, e.g. `socks5://127.0.0.1:1080` |
| `APP_PORT` | No | Exposed port, default `3000` |

### Start the Service

```bash
# One-click deploy (build + start)
chmod +x deploy.sh
./deploy.sh

# Or manual start
docker compose up -d --build

# View logs
docker compose logs -f
```

Visit `http://<your-server-ip>:3000`.

### Updating

```bash
# Prebuilt image
docker pull ghcr.io/hefy2027/cf-manager:latest
# re-run docker compose / docker run after pulling

# Source build
git pull
./deploy.sh
```

### Data Persistence

- Database file: local `./data/` (`/app/data/cf-manager.db`)
- Log files: `/app/data/logs/`
- Docker Compose maps `./data:/app/data` — data survives container removal

### Local Development

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

### Docker Architecture

```
                     ┌───────────────┐
  User ──── :3000 ──▶│  Node.js      │
                     │  Express 5    │
                     │               │
                     │  /api/*  → API│
                     │  /v1/*   → API│
                     │  /*      → SPA│
                     │               │
                     │  SQLite DB    │
                     └───────┬───────┘
                             │
                     ┌───────▼───────┐
                     │ Cloudflare    │
                     │    API        │
                     └───────────────┘
```

---

## Method 2: Cloudflare Worker Deploy

For users without their own server — runs entirely on Cloudflare's edge network, usable on the Free plan.

### Advantages

- **No server needed**: Runs on Cloudflare's global edge nodes
- **No proxy needed**: Workers call the API from within CF's internal network — no `socket hang up` issues
- **Zero-cost start**: Workers Free plan is sufficient for personal use
- **Global acceleration**: Responses from the nearest edge node, ultra-low latency

### Prerequisites

- A Cloudflare account
- Node.js 18+ (for building)

Two deployment options:

| | Option A: Dashboard Upload | Option B: Wrangler CLI |
|---|---|---|
| Tools needed | None | Wrangler CLI |
| D1 DB creation | Dashboard web UI | Command line |
| Deployment | Web upload ZIP | CLI one-click deploy |
| Best for | Users who don't want to install CLI | CLI users / CI automation |

---

### Option A: Dashboard Upload

Everything done in the browser — no Wrangler CLI needed.

#### 1. Create D1 Database

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Left sidebar → **Workers & Pages** → **D1 SQL Database**
3. Click **Create** → Name `cf-manager` → Create
4. Enter database details → **Console** tab
5. Paste the contents of `worker/src/db/schema.sql` into the console and execute

#### 2. Get the Deployment Package

**Option 1: Direct Download (Recommended)**

Download the latest pre-built package from GitHub Releases — no local build needed:

👉 [Download latest cf-manager.zip](https://github.com/hefy2027/cf-manager/releases/latest/download/cf-manager.zip)

Or visit the [Releases page](https://github.com/hefy2027/cf-manager/releases) for a specific version.

**Option 2: Local Build**

```bash
cd worker
npm install
npm run build
```

This single command automatically:
1. Installs frontend dependencies and builds (base=/admin/)
2. Copies frontend assets to `public/`
3. Bundles Worker TypeScript backend into `public/_worker.js`
4. Compresses everything into `worker/cf-manager.zip`

#### 3. Create Pages Project and Upload

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. Project name: `cf-manager`
3. Upload `worker/cf-manager.zip`
4. Wait for deployment to complete

#### 4. Configure Bindings and Environment Variables

After deployment, go to project settings:

1. **Settings** → **Bindings** → **Add** → **D1 Database**
   - Variable name: `DB`
   - D1 database: select `cf-manager`
2. **Settings** → **Bindings** → **Add** → **KV Namespace**
   - Variable name: `KV`
   - KV namespace: create one named `cfmgr` and select it
3. **Settings** → **Environment variables** → **Add**
   - `ENCRYPTION_KEY`: your encryption key (encryption type: **Encrypt**)
   - `API_SECRET`: your access password (optional, encryption type: **Encrypt**)
4. After adding Bindings, **redeploy** for them to take effect (in Deployments, click **Retry deployment** on the latest deployment)

#### 5. Access

After deployment, visit `https://cf-manager.<your-subdomain>.pages.dev/admin/`.

> The root path shows a fake nginx welcome page. The admin panel is always accessed via `/admin/`.

#### Updating

1. Download the latest from [Releases](https://github.com/hefy2027/cf-manager/releases/latest/download/cf-manager.zip), or rebuild locally: `cd worker && npm run build`
2. Dashboard → Pages → cf-manager → **Create deployment** → Upload the new `cf-manager.zip`

---

### Option B: Wrangler CLI Deploy

For users comfortable with CLI or needing automated deployment.

#### 1. Authenticate Wrangler

Choose one method:

```bash
# Option 1: Interactive login (opens browser)
npx wrangler login

# Option 2: Use API Token (no browser, for servers/CI)
# In Cloudflare Dashboard → My Profile → API Tokens → Create Token
# Select "Edit Cloudflare Workers" template
export CLOUDFLARE_API_TOKEN="your-api-token"
# Windows PowerShell:
$env:CLOUDFLARE_API_TOKEN="your-api-token"
```

#### 2. Create D1 Database

```bash
cd worker
npx wrangler d1 create cf-manager
```

Note the output `database_id` and fill it into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "cf-manager"
database_id = "your-database-id"
```

#### 3. Create KV Namespace (Optional but Recommended)

```bash
npx wrangler kv namespace create cfmgr
```

Fill the output `id` into `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "KV"
id = "your-kv-namespace-id"
```

> KV namespace is used for cache-aware routing and concurrency protection. Core functionality works without it.

#### 4. Initialize Database Tables

```bash
npx wrangler d1 execute cf-manager --file=src/db/schema.sql --remote
```

#### 5. Set Secrets

```bash
# Encryption key (required, for encrypting stored API Tokens)
npx wrangler pages secret put ENCRYPTION_KEY
# Enter your encryption key

# Access password (optional, leave empty for no login)
npx wrangler pages secret put API_SECRET
# Enter your password
```

#### 6. One-Click Build & Deploy

```bash
cd worker
npm install
npm run deploy
```

`npm run deploy` automatically:
1. Installs frontend deps and builds
2. Copies frontend assets
3. Bundles Worker backend code
4. Generates ZIP (backup)
5. Deploys to Cloudflare Pages

After deployment, the terminal shows the access URL (e.g. `https://cf-manager.your-subdomain.pages.dev/admin/`).

> The root path shows a fake nginx welcome page. The admin panel is always accessed via `/admin/`.

#### Updating

```bash
git pull
cd worker && npm run deploy
```

---

### Custom Domains

Cloudflare Dashboard → Pages → cf-manager → **Custom domains**.

Or via CLI:
```bash
wrangler pages project add-domain cf-manager your-domain.com
```

### Worker Architecture

```
                     ┌──────────────────┐
  User ──── HTTPS ──▶│  Cloudflare Edge │
                     │                  │
                     │  /        → Fake │
                     │            Nginx │
                     │  /admin/* → SPA  │
                     │  /api/*  → API   │
                     │  /v1/*   → API   │
                     │                  │
                     │  ┌────────────┐  │
                     │  │ Hono App   │  │
                     │  │ + D1 + KV  │  │
                     │  └─────┬──────┘  │
                     │        │ (internal) │
                     │  ┌─────▼──────┐  │
                     │  │ CF REST API│  │
                     │  └────────────┘  │
                     └──────────────────┘
```

### Limitations

| Item | Free Plan | Paid Plan |
|------|-----------|-----------|
| Requests | 100,000/day | Unlimited |
| CPU Time | 10ms/request | Up to 5 min |
| D1 Reads | 5M rows/day | 25B rows/month |
| D1 Writes | 100K rows/day | 50M rows/month |
| D1 Storage | 5 GB | 5 GB + usage-based |
| Memory | 128 MB | 128 MB |

For personal management use, the Free plan is sufficient.

### Docker vs Worker Edition

| Feature | Docker Edition | Worker Edition |
|------|-------------|-------------|
| Database | SQLite (local file) | D1 (Cloudflare managed) |
| Cache/Concurrency | Node Cache (in-memory) | KV + D1 fallback |
| Proxy Support | HTTP/SOCKS5 · Resin Proxy Pool (per-account sticky IP) | Not needed (CF internal) |
| Encryption | Node.js crypto | Web Crypto API |
| Cron Jobs | node-cron | Not supported |
| Logging | File logs + winston | console.log + Logpush |
| Deployment | docker compose | wrangler deploy |
| Data Migration | Incompatible (different encryption) | Re-add accounts |

---

## FAQ

### Docker: Cloudflare API socket hang up

Multi-account concurrent requests may overwhelm the proxy. Solutions:
- Use a more stable proxy service
- Temporarily disable proxy in Settings to test
- Switch to Worker edition (no proxy needed)

### Worker: CPU time exceeded

Free plan's 10ms CPU limit may cause complex operations to fail. Solutions:
- Upgrade to Workers Paid plan ($5/month)
- Reduce concurrent accounts per request
