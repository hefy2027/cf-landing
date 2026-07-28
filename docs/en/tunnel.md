# Tunnel Management & Origin Wizard

CF Manager visualizes Cloudflare Tunnel (formerly Argo Tunnel) creation, configuration, and Ingress management, plus a one-click origin wizard to auto-wire tunnels with DNS.

## What is Cloudflare Tunnel

Cloudflare Tunnel creates a secure, encrypted tunnel between your server and Cloudflare's edge, without opening any inbound ports on your firewall. Ideal for:

- Exposing internal services to the internet (no public IP needed)
- Accelerating self-hosted services via Cloudflare's edge network
- Replacing traditional port forwarding / VPN

![Tunnel Management](/screenshots/tunnels.png)

## Feature Overview

| Operation | Description |
|------|------|
| Create Tunnel | One-click tunnel creation, generating `cloudflared` config & Token |
| Delete Tunnel | Archive and clean up unused tunnels |
| Ingress Editor | Visual editing of domain → service mapping rules |
| Origin Wizard | One-click DNS CNAME + Ingress config — no CLI needed |

---

## Ingress Rules

Ingress is the core of Cloudflare Tunnel — it defines **which domain/path** requests get forwarded to **which internal service**.

### Rule Format

```
domain:port → internal service address
```

Example:
```
app.example.com → localhost:8080
*.example.com   → localhost:3000
```

### Visual Editor

CF Manager provides a structured form for editing Ingress rules:

- Add / delete / modify routing rules
- Wildcard domain `*` support
- Real-time rule preview
- JSON source export (for advanced users)

---

## One-Click Origin Wizard

This is one of CF Manager's standout features. Traditional Tunnel + DNS setup requires:

1. Create Tunnel
2. Install `cloudflared`
3. Configure Ingress YAML
4. Manually add DNS CNAME records

**The One-Click Origin Wizard** automates the last two steps:

1. Select Tunnel, enter origin address (e.g. `http://10.0.0.5:3000`)
2. System auto-generates Ingress rules
3. System auto-creates DNS CNAME record pointing to the Tunnel endpoint
4. One-click save, effective immediately

> For `*.example.com` wildcard origins, the wizard automatically matches existing DNS records and avoids conflicts.

---

## Security Notes

- Tunnel Token is a sensitive credential — a leak allows others to access your internal services
- Rotate Tunnel Tokens regularly
- Ingress rules should follow **least privilege** — only expose necessary services and paths
- For production, consider pairing with Cloudflare Access for identity verification
