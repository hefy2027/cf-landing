# Storage Management: KV / D1 / R2

CF Manager unifies management of Cloudflare's three storage services — KV (key-value), D1 (relational database), and R2 (object storage) — with visual CRUD operations.

## Storage Service Comparison

| Feature | KV | D1 | R2 |
|------|----|----|-----|
| **Type** | Key-value store | Serverless SQLite | Object storage (S3-compatible) |
| **Consistency** | Eventually consistent | Strongly consistent | Strongly consistent |
| **Typical Use** | Config / Cache / Sessions | Structured data / Leaderboards / CMS | Files / Images / Video / Static assets |
| **Read Latency** | Milliseconds | Milliseconds | Milliseconds |
| **Write Latency** | Global < 60s | Milliseconds | Milliseconds |
| **Free Quota** | 100K reads/day, 1K writes/day | 5M row reads/day, 100K row writes/day | 10 GB storage, 1M Class A ops/month |

---

## KV Management

### Supported Operations

| Operation | Description |
|------|------|
| Create Namespace | Create new KV Namespace and bind to Workers |
| Key-Value CRUD | Visual add / edit / delete of key-value pairs |
| Batch Operations | Batch add key-value pairs, JSON import support |
| Search | Search by key prefix for quick lookup |
| Expiration | Set TTL (expiration seconds) on key-value pairs |

### Typical Usage

```
Key:     config:theme
Value:   "dark"
TTL:     - (never expires)

Key:     session:abc123
Value:   {"userId": 1, "role": "admin"}
TTL:     3600
```

---

## D1 Management

### SQL Queries

Built-in SQL editor supporting:

- **Query execution**: SELECT, INSERT, UPDATE, DELETE — standard SQL
- **Schema changes**: CREATE TABLE, ALTER TABLE, DROP TABLE
- **Result export**: JSON / CSV download
- **Table list**: One-click view of all tables and their schemas

### Schema Management

| Operation | Description |
|------|------|
| Initialize | One-click table creation from `schema.sql` |
| View | Display all table names, columns, and indexes |
| Modify | Execute DDL statements online |

---

## R2 Management

### Supported Operations

| Operation | Description |
|------|------|
| Create Bucket | Create R2 Bucket |
| Upload Files | Drag-and-drop or click to upload, large file support |
| Download | One-click file download |
| Preview | Online preview of images / text files |
| Delete | Single or batch file deletion |
| Public Access | Manage bucket public access permissions |
| Custom Domain | Bind custom domain for R2 content access |

### R2 Limits

- Max single file: 5 TB (via multipart upload)
- Storage class: Standard (single storage class)
- No egress fees (key difference from S3)

---

## Cross-Account Storage Management

CF Manager supports unified storage management across multiple Cloudflare accounts:

- KV: View and edit all namespaces across accounts
- D1: Execute SQL queries and compare schemas across accounts
- R2: Browse and migrate files across accounts
