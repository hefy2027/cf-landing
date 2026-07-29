# Changelog

Complete version history for CF Manager. Below is a summary of recent major updates. See the [GitHub CHANGELOG](https://github.com/hefy2027/cf-manager/blob/master/CHANGELOG.md) for the full log.

## v1.4.1 (2026-07-27)

### 🚀 Account Management Enhancements

- **Per-Account Proxy**: Assign an independent proxy URL and enable switch per account; priority is "account proxy > global proxy > env var", isolated from each other
- **Audit Log Filtering**: Filter audit logs by operation type and date range for easier tracing and troubleshooting
- **Account Batch Operations**: Multi-select accounts, batch delete, and batch proxy configuration
- **Account Settings Optimization**: Dedicated per-account proxy dialog; actions collapsed into a "More" dropdown, optimized for mobile narrow screens

## v1.4.0 (2026-07-24)

### 🚀 Tunnels & Rule Engine

- **Tunnel Management**: Cloudflare Tunnel CRUD + connection status + visual Ingress editing
- **Universal Rule Engine**: Unified management of 8 Cloudflare Rulesets types (Origin / URL Rewrite / Header Transform / Cache / Firewall / Rate Limit / Redirect)
- **One-Click Origin Wizard**: New/reuse tunnel + auto CNAME + auto Ingress, partial failure rollback support
- **Structured Rule Forms**: Intuitive forms for each rule type, expression builder with live preview
- **Advanced Mode**: Direct raw JSON editing

## v1.3.7 (2026-07-23)

### 🚀 Deployment & Store Enhancements

- **Two-Phase Deployment**: New precheck endpoint, auto-checks config differences & Secrets coverage before deploy
- **ZIP Multi-Module Deploy**: Auto-extracts multi-module ZIPs, infers main module
- **Custom Domain Zone Selector**: Zone dropdown + subdomain input + live preview
- **Pages Batch Deletion**: Deployment history supports select-all / batch delete
- **SSRF Hardening**: Full-chain URL security validation & Content-Type verification

## v1.3.6 (2026-07-21)

### 🚀 Feature Expansion

- **Account Editing**: In-place modification of account name, credentials, and auth method
- **R2 Availability Caching**: Faster account switching in storage management page
- **Worker with Assets**: Three-phase static asset upload deployment
- **Catalog Store Enhancement**: Template Markdown rendering, repo entry button

## v1.3.5 (2026-07-11)

### 🚀 App Store

- **Catalog Store**: Complete template marketplace — browse and one-click deploy Workers / Pages
- **Pages Deployment**: New Pages project creation and deployment capability
- **SSRF Fix**: Vulnerability fix reported by BUPT School of Cyberspace Security (thanks to Liu Huan & Zifeng Kang)

## v1.1.2 (2026-07-07)

### 🔒 Security Hardening

- Full Worker deployment SSRF protection (protocol / IP / redirect / Content-Type / size validation)
- Auth middleware: auto-generate random temporary key with alert when no password configured
- Audit log enhancement: record deployment source URL

## v1.1.1 (2026-07-05)

### 🚀 Stability Improvements

- Browser rendering rate limiter, SSE heartbeat mechanism
- Full Wrangler v4 compatibility
- Dashboard responsive layout optimization

## v1.1.0 (2026-07-03)

### 🚀 AI Inference Enhancement

- **Prompt Caching-Aware Billing**: Distinguish cache-hit / cache-miss tokens, accurately estimate neuron consumption
- **Cache Model Smart Routing**: Prioritize accounts with existing caches to improve hit rate
- Worker KV binding: Cross-request cache persistence

## v1.0.0 (2026-06)

### 🎉 Initial Release

- Multi-account unified management, dashboard, Workers / Pages / DNS / Storage ops
- OpenAI-compatible AI gateway, browser rendering
- Docker + Cloudflare Pages dual deployment
