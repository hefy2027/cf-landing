# App Store Guide

CF Manager includes a built-in App Store (Catalog) for one-click deployment templates for Workers and Pages. You can deploy from the built-in Catalog or connect to third-party template sources.

## Built-in Catalog

The built-in Catalog contains commonly used deployment templates covering:

- **AI Apps**: Chatbots, image generation, vector search, etc.
- **Data Tools**: URL shorteners, file sharing, form collection, etc.
- **Ops Tools**: Status monitoring, webhook forwarding, API proxies, etc.
- **Dev Tools**: Code runners, regex testers, JSON formatters, etc.

Each template includes:
- Name and description
- Deployment type (Workers / Pages)
- Required bindings (KV / D1 / R2, etc.)
- Environment variable descriptions
- Source repository link

### One-Click Deploy Flow

1. Go to **App Store** page
2. Browse or search for a template
3. Click "Deploy", select target account
4. Fill in required configuration (env vars, KV bindings, etc.)
5. Click "Confirm Deploy", wait for completion

The system automatically:
- Clones the template source
- Creates and configures bindings
- Sets environment variables
- Builds and deploys to Workers / Pages

---

## Third-Party Template Sources

Beyond the built-in Catalog, you can connect third-party template sources to expand available templates.

### How to Connect

1. Go to **App Store** → **Manage Template Sources**
2. Add a third-party source URL conforming to the [Catalog JSON Schema](https://github.com/hefy2027/cf-store)
3. The system auto-validates and fetches the template list
4. Browse and deploy third-party templates in the store after connection

### cf-store

[cf-store](https://github.com/hefy2027/cf-store) is CF Manager's official Catalog template repository, containing:

- Source code for all built-in Catalog templates
- Community-contributed templates
- Catalog validation and version management

If you have a great Workers / Pages template to share, submit a PR to cf-store.

---

## Template Development

To create your own template for the store, you need:

| File | Description |
|------|------|
| `manifest.json` | Template metadata (name, description, type, required bindings) |
| `src/` | Workers / Pages source code |
| `wrangler.toml` | Wrangler deployment config (if applicable) |

Template specification reference: [cf-store repository docs](https://github.com/hefy2027/cf-store).
