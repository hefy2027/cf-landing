# DNS Management

CF Manager provides unified DNS record management and Zone settings across multiple Cloudflare accounts, supporting CRUD operations, Zone batch create/delete, Zone settings management, cache purge, pause/resume, and batch operations.

## Zone Overview

The DNS management page displays all domain zones under the current account, along with their DNS record counts and proxy status. v2.0.0 adds an account filter (defaults to last used, persisted in localStorage), domain search box, Zone status indicators (colored dots), and grouped collapsible lists by account. Click a zone to enter its record details.

![DNS Management](/screenshots/dns.png)

---

## Zone Management

### Batch Create Zones

v2.0.0 adds batch Zone creation:

1. Click the "Create Zone" button
2. Enter one domain per line in the textarea
3. Select the target account and Zone type (Full / Partial)
4. Submit — the system uses a concurrency pool (concurrency=3) for batch creation
5. On success, Cloudflare-assigned NS information is displayed with one-click copy

### Batch Delete Zones

- Domain list supports checkbox multi-select
- Click "Batch Delete" after selecting
- Deletion requires confirmation to prevent accidental operation
- Uses concurrency pool for batch deletion to avoid CF API rate limits

### Zone Settings Management

v2.0.0 adds a Zone-level settings panel supporting the following settings:

| Setting | Description |
|------|------|
| SSL/TLS Mode | Off / Flexible / Full / Full (Strict) |
| Always HTTPS | Automatically redirects all HTTP requests to HTTPS |
| Auto HTTPS Rewrite | Automatically rewrites HTTP links to HTTPS in pages |
| Security Level | Off / Essentially Off / Low / Medium / High |
| Auto Minify | HTML / CSS / JS compression |
| Brotli Compression | Enable Brotli compression algorithm |
| 0-RTT | 0-RTT connection resumption |

### Zone Cache Management

- **Purge All Cache**: One-click purge of all cache under the Zone
- **Purge by URL**: Enter specific URL to purge corresponding cache
- **Cache Level**: View and modify cache level (No Query String / Ignore Query String / Standard / Aggressive)
- **Browser Cache TTL**: View and modify browser cache TTL
- **Development Mode**: Temporarily bypass cache, access origin directly

### Zone Status Management

- Pause / resume Zones directly in CF Manager
- Pausing requires confirmation warning (all Cloudflare services for the Zone will stop)
- Zone cache is automatically purged after create/delete to ensure real-time list data

---

## DNS Record Management

### Supported Record Types

| Type | Description | Typical Value |
|------|------|--------|
| A | IPv4 address | `192.0.2.1` |
| AAAA | IPv6 address | `2001:db8::1` |
| CNAME | Alias | `app.example.com` |
| MX | Mail exchange | `mail.example.com` + priority |
| TXT | Text record | SPF / DKIM / verification |
| NS | Nameserver | Usually Cloudflare-managed |
| SRV | Service record | Port + target + priority |
| CAA | Certificate Authority Authorization | Restrict SSL CAs |

### Adding Records

1. Enter the target zone's DNS details page
2. Click "Add Record"
3. Select record type
4. Enter hostname (e.g. `@`, `www`, `api`)
5. Enter record value
6. Choose whether to enable proxy (orange cloud)
7. Optionally set TTL

### Editing & Deleting

- Click a record row to edit
- Check multiple records for batch deletion
- Deletion requires confirmation

---

## Proxy Toggle (Orange Cloud)

Cloudflare proxy is the most commonly used DNS feature.

| Status | Icon | Description |
|------|------|------|
| Proxied | 🟠 Orange cloud | Traffic goes through Cloudflare edge, with CDN / DDoS protection / SSL |
| DNS Only | ⚪ Gray cloud | Traffic goes directly to origin, bypassing Cloudflare |

### One-Click Toggle

CF Manager supports one-click proxy toggle for single or batched records — no need to enter each record's detail page.

> When proxy is enabled, Cloudflare auto-issues and manages SSL certificates (requires domain DNS to be hosted on Cloudflare).

---

## Batch Operations

### Batch Add

Create multiple similarly-formatted DNS records at once:

1. Click "Batch Add"
2. Fill in a table format (Type | Hostname | Value | TTL | Proxy)
3. Preview and confirm, then submit

### Batch Edit / Delete

After checking multiple records:
- **Batch toggle proxy**: Enable/disable proxy for all selected records
- **Batch delete**: Delete all selected records

### Cross-Zone Management

Switch between zones in the zone list without leaving the DNS management page.

---

## CNAME Auto-Discovery (Tunnel Origin)

When configuring the origin wizard in Tunnel management, the system automatically scans DNS CNAME records to help match tunnel endpoints with existing domains.

See [Tunnel & Origin Guide](./tunnel.md).

---

## Notes

- DNS changes may take time to propagate globally (depends on TTL settings)
- With proxy enabled, the origin IP is hidden — visitors see Cloudflare's edge IPs
- Modifying NS records can affect domain resolution — operate with caution
