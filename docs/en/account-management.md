# Account Management

CF Manager's core capability is multi-account unified management. This guide covers adding, editing, switching, importing, and exporting accounts.

## Account List

After logging in, navigate to "Account Management" in the left sidebar to view all added Cloudflare accounts.

Each account card shows:
- Account name (custom)
- Auth type (API Token / Global API Key)
- Feature support status (AI / Workers / Browser Render / DNS / Storage / R2)
- Connection status (Active / Error)

![Account Management](/screenshots/accounts.png)

---

## Adding Accounts

Click "Add Account" and fill in:

| Field | Description |
|------|------|
| Name | Custom account name for easy identification (e.g. "Production", "Test Account") |
| Auth Type | API Token (recommended) or API Key + Email |
| API Token / API Key | Credential string |
| Email | Only required for API Key mode |
| Feature Toggles | Enable features for this account (AI / Workers / Browser Render / DNS / Storage) |

> Credentials are AES-encrypted before storage. **Ensure `ENCRYPTION_KEY` is configured before adding accounts.**
> For detailed credential setup, see [Account Authentication](./account-auth.md).

### Automatic Behavior

After adding, the system automatically:
1. Calls Cloudflare API to validate credentials
2. Fetches and stores Account ID
3. Detects R2 availability and caches it
4. Marks as "Active"

---

## Editing Accounts

Modify existing accounts in-place:

- **Rename**: Change the account identifier
- **Switch auth**: API Token ↔ API Key + Email
- **Update credentials**: Replace Token or API Key
- **Feature toggles**: Adjust feature enablement anytime

> Leave credential fields empty when editing to keep the current values — no re-entry needed.

---

## Account Switching

Three ways to switch between accounts:

1. **Global switch**: Top nav dropdown to select active account — all subsequent operations use this account
2. **Page-level switch**: Switch at the top of Workers, DNS, Storage pages without affecting other pages
3. **Auto-switch**: AI workspace and browser rendering automatically rotate to the next available account when quota is exhausted

---

## Batch Operations

### Batch Connection Test

Select multiple accounts, click "Batch Test" — the system sequentially calls Cloudflare API to verify each account's credentials and updates connection status.

### Batch Import / Export

CSV import/export for account info:

**Export**: Export all current accounts as CSV (without encrypted credentials), for backup or migration.

**Import**: Upload a CSV file to batch-add accounts. CSV columns:
```
name,auth_type,token,email,features
Production,token,xxxxx,,ai|workers|dns
Test,apikey,xxxxx,test@example.com,storage|browser
```

> Exported files do not contain encrypted credential plaintext — only name, type, and feature info are exported.

---

## Deleting Accounts

A confirmation dialog prevents accidental deletion.

### Protected Accounts

Accounts specified via `DEMO_ACCOUNT_IDS` environment variable cannot be deleted or modified (used by demo sites to protect shared demo accounts):
```bash
# .env
DEMO_ACCOUNT_IDS=1,2,3
```
