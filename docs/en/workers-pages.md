# Workers & Pages Management

CF Manager unifies management of Cloudflare Workers scripts and Pages projects, supporting single-account and cross-account batch operations.

![Workers & Pages](/screenshots/workers.png)

## Workers Management

### Feature Overview

| Operation | Description |
|------|------|
| Create / Edit | Online code editor, JavaScript / TypeScript support |
| Deploy | Single-account direct deploy, cross-account one-click batch deploy |
| Bindings | KV / D1 / R2 / Service / Queue / Secret — all binding types |
| Environment Variables | Plain vars & encrypted Secrets, batch configuration |
| Routes | Domain routes, dispatch rules, pattern matching |
| Custom Domains | Bind custom domains with auto DNS configuration |
| Triggers | Cron Triggers scheduled task management |
| Logs | Real-time Tail log streaming, online debugging |

### Cross-Account Batch Deploy

Select target scripts across multiple accounts in the Workers list, click "Batch Deploy" — the system automatically:

1. Reads each account's latest script content
2. Switches to target account and updates the corresponding Workers script
3. Auto-syncs bindings and environment variables
4. Returns unified deployment results and logs

> Perfect for **syncing the same script across multiple accounts** — e.g. consistent deployment across environments (Dev / Staging / Production).

---

## Pages Management

### Feature Overview

| Operation | Description |
|------|------|
| Project Creation | Create Pages projects, link GitHub repos or direct upload |
| Build Config | Configure build command, output directory, branch & env vars |
| Deployment History | View all deployment versions, one-click rollback to any version |
| Custom Domains | Bind custom domains to Pages projects |
| Environment Variables | Manage & encrypt Pages project env vars |
| Delete Project | Archive and permanently delete Pages projects |

### Version Rollback

The deployment history list shows status, commit message, and time for each deployment. Click any historical version to **rollback** — the production environment reverts to the selected version.

> Rollback only affects production — deployment records for intermediate versions are preserved.

---

## Edition Differences

| Feature | Docker Edition | Worker (Pages) Edition |
|------|-----------|-------------------|
| API Call Method | Cloudflare SDK (Node.js) | Cloudflare REST API |
| Log Method | Tail API + local cache | Real-time Tail push |
| Batch Deploy | Full support | CPU time limited — watch concurrency |

### Notes

- **Worker Edition CPU Limit**: Free plan 10ms/request — too many concurrent batch operations may timeout. Reduce concurrent accounts per request or upgrade to Paid plan.
- **Route Conflicts**: Multiple Workers routes on the same domain may conflict. CF Manager detects conflicts and warns on save.
