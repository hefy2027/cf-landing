# Architecture

CF Manager uses a dual-backend architecture — the same business logic adapted for both Docker self-hosted servers and Cloudflare Pages edge computing environments.

## Overall Architecture

```
                      ┌─────────────────────┐
                      │     Vue 3 Frontend     │
                      │  Naive UI · Pinia    │
                      │  base=/admin/        │
                      └──────────┬──────────┘
                                 │ /api/* /v1/*
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼───────┐        ┌───────▼──────────┐
            │  Docker Edition │        │  Worker Edition   │
            │  Express 5      │        │  Hono             │
            │  Cloudflare SDK  │        │  CF REST API      │
            │  SQLite          │        │  D1 + KV           │
            └───────┬───────┘        └───────┬──────────┘
                    │                         │
            ┌───────▼───────┐        ┌───────▼──────────┐
            │  Cloudflare API │        │  Cloudflare API   │
            │  (via proxy)    │        │  (CF internal)    │
            └───────────────┘        └──────────────────┘
```

## Tech Stack Comparison

| Layer | Docker Edition | Worker (Pages) Edition |
|------|-----------|-------------------|
| Frontend | Vue 3 · Naive UI · Pinia | Same |
| Backend Framework | Express 5 | Hono |
| API Calls | Cloudflare SDK (Node.js) | Cloudflare REST API (fetch) |
| Database | SQLite (better-sqlite3) | Cloudflare D1 |
| Cache | Node Cache (in-memory) | KV Namespace + D1 |
| Encryption | Node.js crypto (AES-GCM) | Web Crypto API (AES-GCM) |
| Proxy | HTTP / SOCKS5 support | Not needed (CF internal) |
| Cron Jobs | node-cron | Not supported |
| Logging | File logs + winston | console.log + Logpush |
| Deployment | Docker Compose | Wrangler / Pages Upload |

---

## Project Structure

```
cf-manager/
├── backend/                  # Docker Edition backend (Express 5)
│   └── src/
│       ├── index.ts          # Express entry + middleware
│       ├── config.ts         # Environment config
│       ├── db.ts             # SQLite database management
│       ├── middleware/       # Auth, error handling, response wrapping
│       ├── models/           # Data models (accounts, KV, D1, etc.)
│       ├── routes/           # API routes (accounts, workers, dns, etc.)
│       └── services/         # Business logic (Cloudflare SDK wrappers)
├── frontend/                 # Vue 3 frontend
│   └── src/
│       ├── api/              # API call wrappers
│       ├── views/            # Page components (Dashboard, Workers, DNS, etc.)
│       ├── components/       # Reusable components
│       ├── stores/           # Pinia state management
│       └── utils/            # Utility functions
├── worker/                   # Cloudflare Pages Edition
│   ├── src/                  # Hono API routes + D1 models
│   ├── build.js              # One-click build script
│   └── wrangler.toml         # Wrangler config
├── docker/                   # Docker build config
│   ├── backend/Dockerfile
│   └── frontend/
│       ├── Dockerfile
│       ├── nginx.conf.template
│       └── entrypoint.sh
├── shared/                   # Shared configs across editions
│   ├── model-pricing.json    # AI model pricing (with cache prices)
│   ├── catalog.schema.json   # Catalog template JSON Schema
│   └── catalogValidator.ts   # Catalog validator
├── docs/                     # Project documentation
├── docker-compose.yml        # Docker orchestration
└── deploy.sh                 # One-click deploy script
```

---

## Key Design Decisions

### Why Dual Backend

- **Docker Edition**: For users with existing servers — full data control, SQLite transactions, cron jobs
- **Worker Edition**: For serverless users — zero ops cost, CF internal network eliminates connectivity issues

### Shared Catalog Validation

`shared/catalogValidator.ts` and `shared/catalog.schema.json` are used by the backend, worker, and frontend build scripts. Ajv standalone precompilation resolves the `new Function()` limitation in Workers environments.

### Multi-Account Scheduling Strategy

The account scheduling logic for AI inference and browser rendering:

- **Round-robin + quota check**: Tries active accounts in order, skipping exhausted (4006) accounts
- **Prompt Caching stickiness**: Cache models prioritize the most recently used account, only switching when usage deviation exceeds 10,000 neurons
- **Optimistic estimation + precise correction**: Optimistic quota estimation at request start (avoids concurrency conflicts), corrected with actual usage after response

### Unified Deployment Artifact

`worker/build.js` packages the frontend SPA static assets + Hono backend into a single ZIP for single-file Pages deployment. `_worker.js` routes `/api/*` to the Hono backend — all other paths are handled by the static asset layer.

---

## Extension Points

| Extension | Integration Method |
|----------|----------|
| New API routes | backend/src/routes/ + worker sync implementation |
| New frontend pages | frontend/src/views/ + route + sidebar menu |
| Custom Catalog sources | Third-party template source URL conforming to schema |
| Model pricing updates | Edit shared/model-pricing.json |
| Custom key encryption | Modify AES encrypt/decrypt functions, keep ENCRYPTION_KEY unchanged |

---

## Related Projects

- [cf-store](https://github.com/hefy2027/cf-store) — App Store Catalog template repository
- [cf-landing](https://github.com/hefy2027/cf-landing) — This landing page project
