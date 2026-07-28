# Troubleshooting & Logs

Common issues when running CF Manager and their solutions.

## Deployment

### Docker: Cloudflare API socket hang up

**Symptom**: During batch operations or concurrent requests, some API calls fail with `socket hang up`.

**Cause**: The network proxy cannot handle all connections during multi-account concurrency.

**Solution**:
- Switch to a more stable proxy service
- Temporarily disable proxy in **System Settings** to test
- Reduce concurrent request count
- Switch to **Worker Edition** (Workers call API from within CF's internal network — no external proxy needed)

### Worker: CPU Time Exceeded (1102/1101)

**Symptom**: Complex batch operations fail, logs show `exceeded CPU time limit`.

**Cause**: Free Plan limits to 10ms CPU per request.

**Solution**:
- Upgrade to Workers Paid plan (removes CPU limit)
- Reduce concurrent accounts per request
- Split large operations into multiple smaller requests

### Fork Deploy: Action Build Failure

**Symptom**: GitHub Actions deployment fails.

**Common Causes & Solutions**:

| Cause | Solution |
|------|------|
| Secrets not configured | Check that `CF_API_KEY`, `CF_EMAIL`, `ENCRYPTION_KEY` are set in Environment Secrets |
| D1 creation failure | Verify your Cloudflare account has D1 access |
| Workflow permissions insufficient | Settings → Actions → General → Workflow permissions → Read and write permissions |

---

## Account

### Connection Test Failure

**Symptom**: Account connection test shows failure after adding.

**Troubleshooting Steps**:

1. **Insufficient API Token permissions**: Confirm Token covers required resources (see permission list in [Account Authentication](./account-auth.md))
2. **Token expired or revoked**: Check Token status in Cloudflare Dashboard
3. **Network proxy issues**: If using a proxy, verify it's reachable
4. **IP restrictions**: Check if Cloudflare has IP-based access restrictions

### Credential Encryption Issues

**Symptom**: Previously added accounts stop working after restart.

**Cause**: `ENCRYPTION_KEY` was changed, making existing credentials undecryptable.

**Solution**: Always keep `ENCRYPTION_KEY` unchanged. If you must change it, re-add all accounts.

---

## AI Inference

### Quota Exhausted (All accounts exhausted)

**Symptom**: AI chat returns 429 with `All accounts have reached daily neuron limit`.

**Solution**:
- Wait for next day's quota reset
- Add more Cloudflare accounts to distribute quota
- Check if Prompt Caching is enabled — cache hits reduce neuron consumption

### Streaming Interrupted

**Symptom**: Streaming output is interrupted during long text generation.

**Possible Causes**:
- Network instability (check proxy connection)
- Worker Edition CPU timeout (long text generation takes more time)
- Model limitations

**Suggestion**: Reduce `max_tokens` per request or split long text into multiple requests.

---

## Log Viewing

### Docker Edition

```bash
# Real-time container logs
docker compose logs -f

# Backend log file
tail -f backend/data/logs/app.log
```

### Worker Edition

- Dashboard → Workers & Pages → cf-manager → **Logs** for real-time logs
- Via Wrangler CLI: `npx wrangler pages deployment tail`
- In CF Manager admin panel: go to **Audit Logs** to view platform operation logs

---

## Audit Logs

CF Manager records all critical operations performed through the admin panel:

- Account add / delete / modify
- Workers / Pages deploy and rollback
- DNS record create / update / delete
- Storage data modification (KV / D1 / R2)
- System settings changes

Filter by time, operation type, and account in **Dashboard → Audit Logs**.
