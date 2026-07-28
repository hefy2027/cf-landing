# Account Authentication

CF Manager supports two ways to add Cloudflare accounts. Choose the one that fits your needs.

> ⚠️ Only add accounts you own or have explicit authorization to manage. Never use unauthorized accounts. Credentials are stored encrypted (AES), but high-risk credentials like Global API Keys should still be handled with care.

---

## Method 1: API Token (Recommended)

API Token is Cloudflare's recommended authentication method, supporting fine-grained permission control and higher security.

### Required Info

| Field | Description |
|---|---|
| **Name** | Custom name for identifying the account |
| **Auth Type** | Select `API Token` |
| **API Token** | Cloudflare API Token string |

### How to Get an API Token

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click your avatar → **My Profile**
3. Left sidebar → **API Tokens**
4. Click **Create Token**
5. Choose:
   - **Use template**: Pick a preset (e.g. `Edit Cloudflare Workers`, `Edit DNS`)
   - **Create Custom Token**: Customize permissions as needed
6. Recommended permissions (covers all CF Manager features):

   **User-level permissions:**
   - `User.User Details:Read` — Verify token validity (connection test)

   **Account-level permissions:**
   - `Account.Account Analytics:Read` — Dashboard stats (Workers/Pages usage)
   - `Account.Workers Scripts:Edit` — Workers scripts, Secrets, Cron Triggers, Custom Domains, Settings
   - `Account.Workers Tail:Read` — Worker log viewing
   - `Account.Workers KV Storage:Edit` — KV namespace and key-value management
   - `Account.D1:Edit` — D1 database management (including SQL execution)
   - `Account.Workers R2 Storage:Edit` — R2 bucket and object management
   - `Account.Cloudflare Pages:Edit` — Pages project and deployment management
   - `Account.Workers AI:Edit` — AI model listing and inference
   - `Account.Browser Rendering:Edit` — Browser rendering (screenshot, PDF, Markdown, etc.)

   **Zone-level permissions:**
   - `Zone.Zone:Read` — Zone list reading
   - `Zone.DNS:Edit` — DNS record management (including Pages auto CNAME)
   - `Zone.Workers Routes:Edit` — Workers route management
7. Set token name, confirm resource scope:
   - **Account Resources**: Select `All accounts` or specific accounts (recommend `All accounts` for multi-account management)
   - **Zone Resources**: Select `All zones` or specific zones (recommend `All zones` for Workers routes and DNS management)
8. Click **Continue to summary** → **Create Token**
9. Copy the generated token (shown only once — save it securely)

---

## Method 2: Global API Key + Email

Global API Key is an account-level key with the **same full permissions as the account owner (covering all domains and resources)**. Unless you truly need full access or legacy API compatibility, **do not use it for daily operations** — a leak compromises all your assets. Strongly recommend fine-grained API Tokens for daily use.

### Required Info

| Field | Description |
|---|---|
| **Name** | Custom name for identifying the account |
| **Auth Type** | Select `API Key + Email` |
| **API Key** | Cloudflare Global API Key string |
| **Email** | Cloudflare account login email |

### How to Get Global API Key

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click your avatar → **My Profile**
3. Left sidebar → **API Tokens**
4. Find the **API Keys** section
5. Click **View** next to **Global API Key**
6. Enter your account password for security verification
7. Copy the displayed Global API Key

> **⚠️ Security Warning**: Global API Key grants the same permissions as the account owner. A leak allows full control over all your Cloudflare resources (domains, DNS, Workers, storage, AI, etc.). Only use for local testing. Never commit to repositories or logs. Strongly recommend least-privilege API Tokens for daily ops.

---

## Comparison

| Feature | API Token | Global API Key + Email |
|---|---|---|
| **Permission Control** | Fine-grained, on-demand | Global full access |
| **Security** | Higher (least privilege) | Lower (equivalent to account password) |
| **Info Required** | Token only | Key + email |
| **Recommended For** | Production, multi-account management (recommended) | Local quick testing only; not recommended for daily ops |
| **Cloudflare Recommended** | Yes | No (legacy compatibility only) |

---

## Post-Add Behavior

After adding an account, the system automatically:

1. **Validates credentials** — Calls Cloudflare API to verify Token/Key validity
2. **Auto-fetches Account ID** — Pulls account ID from Cloudflare API and stores it (no manual entry needed)
3. **Marks as active** — Sets account status to "Active" after successful validation

You can also manually verify account connectivity anytime by clicking the "Test" button in the account list.
