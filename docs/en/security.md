# Security Best Practices

CF Manager provides multiple layers of security to protect your Cloudflare account credentials and operations.

## Credential Security

### Encryption

All API Tokens and Global API Keys are **AES-encrypted** before storage, using your configured `ENCRYPTION_KEY` as the key.

| Storage Location | Encryption Method |
|----------|----------|
| Docker Edition SQLite | AES encrypted into database |
| Worker Edition D1 | AES encrypted into D1 |
| Environment Variables (Secrets) | Wrangler Secrets (encrypted at rest) |

> ⚠️ `ENCRYPTION_KEY` is the root of encryption. Always use a **strong random string** (at least 16 characters). Do not use weak passwords. Changing `ENCRYPTION_KEY` will make all previously stored credentials unrecoverable.

### Credential Type Selection

| Scenario | Recommended Auth |
|------|------------|
| Daily operations | **API Token** (fine-grained permissions) |
| Quick initial trial | Global API Key |
| Production | **API Token** + least privilege |

API Tokens should only grant **the permissions actually needed**. See [Account Authentication](./account-auth.md) for the recommended permission list.

---

## Access Control

### Login Password

Set `API_SECRET` in `.env` or environment variables to require a password for all admin panel operations:

```bash
# .env
API_SECRET="your-strong-password"
```

The password is stored server-side. Each API request is verified via `Authorization: Bearer <token>`.

The demo site uses a fixed password (`cfmgrbest`). **In production, always use a strong password**.

### Path Hiding

The admin panel access path depends on the deployment:

- **Docker Edition**: Admin path is fixed at `/` — the root path serves the panel directly, no masking.
- **Worker Edition**: Admin path is fixed at `/admin/`, and the root path is masked as a fake nginx welcome page to hide the admin entry from external scanners.

---

## Network & Proxy

### Proxy Security

If accessing Cloudflare API via a proxy:

- Use HTTPS proxies — avoid plaintext transmission
- Proxy address is stored in `.env` — do not commit to repositories
- Periodically review proxy access logs for anomalies

### Public Exposure Risks

> ⚠️ CF Manager is **not recommended for direct public exposure**.

If external access is necessary:
- Always configure a strong password (`API_SECRET`)
- Consider pairing with Cloudflare Access for identity verification
- Use Cloudflare Tunnel for a secure tunnel proxy rather than opening ports directly

---

## Operation Security

### Multi-Account Isolation

- Add accounts for different purposes (Dev/Test/Production) separately for easy management and tracking
- Protect demo accounts with the `DEMO_ACCOUNT_IDS` environment variable to prevent accidental deletion or modification

### Sensitive Operation Confirmation

The following operations require confirmation before execution:
- Delete Workers scripts
- Delete DNS records
- Delete D1 databases
- Delete R2 files (batch)
- Rollback Pages deployments

### Audit Logs

All critical operations are logged with audit trails, including operator (admin/API), operation type, target resource, and timestamp — enabling traceability.

---

## Compliance Statement

> This tool is intended solely for **learning, technical research, and self-management of authorized accounts**. Please strictly follow [Cloudflare Terms of Service](https://www.cloudflare.com/terms/). Do not provide public AI relay services, resell compute, or share quotas across accounts. Only add accounts you own or have explicit authorization for.
