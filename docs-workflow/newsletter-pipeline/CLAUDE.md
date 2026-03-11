# Newsletter Automation — amaran-daily

## Purpose

This is the working directory for the daily newsletter digest automation pipeline.
Claude Code runs /loop from here to periodically fetch and process newsletters.

## Workflow

1. `/loop 1d at 7:00am` triggers the digest generation
2. Search Gmail for 10 newsletter sources (24-hour filter)
3. Categorize articles into: pharma, hbr/leadership, ai/tech
4. Save interactive HTML digest to `digest-output/`
5. User opens HTML, selects articles (~3 min)
6. `route-selected.sh` pushes selections to 3 GitHub repos

## Newsletter Sources

1. STAT News — biopharma industry
2. Endpoints News — biotech/pharma deals
3. BioPharma Dive — pharma business
4. Fierce Pharma — pharma operations
5. AI News (The Rundown) — AI industry
6. Ben's Bites — AI tools & products
7. HBR Daily — leadership/management
8. Morning Brew — business overview
9. Substack digest — curated follows
10. TLDR Newsletter — tech summary

## Output Repos

| Category | Repo | CLAUDE.md Focus |
|----------|------|-----------------|
| Pharma | ~/github/pharma-decipher | Pharma industry analysis, regulatory, pipeline |
| Leadership | ~/github/hbr-review | Strategy, management, organizational change |
| AI/Tech | ~/github/ai-articles | AI tools, coding, technical deep dives |

## File Structure

```
newsletter-pipeline/
  CLAUDE.md                  ← this file
  config.json                ← newsletter source definitions & categories
  generate-digest.py         ← Gmail fetch → categorize → HTML digest
  digest-template.html       ← interactive HTML template with checkboxes
  route-selected.sh          ← routes checked articles to 3 GitHub repos
  sample-selections.json     ← example input for testing route-selected.sh
  .gitignore                 ← excludes digest-output/
  digest-output/             ← generated HTML digests (gitignored)
  github-actions/
    process-inbox.yml        ← GitHub Actions workflow for Option B
  repo-templates/
    pharma-decipher-CLAUDE.md  ← CLAUDE.md template for pharma repo
    hbr-review-CLAUDE.md       ← CLAUDE.md template for leadership repo
    ai-articles-CLAUDE.md      ← CLAUDE.md template for AI/tech repo
```

## Quick Start (Testing)

```bash
# Generate a mock digest with sample data
python3 generate-digest.py --mock

# Open the generated HTML in browser
open digest-output/2026-03-11_digest.html

# After selecting articles & exporting JSON, route to repos
./route-selected.sh digest-output/2026-03-11_digest.json
```

## Gmail MCP Setup (Required for Live Mode)

### Prerequisites

- Google Cloud account
- Claude Code CLI installed

### Step 1: Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable the **Gmail API**:
   - APIs & Services → Library → search "Gmail API" → Enable
4. Create OAuth 2.0 credentials:
   - APIs & Services → Credentials → Create Credentials → OAuth Client ID
   - Application type: **Desktop Application**
   - Name: `gmail-mcp-claude`
   - Click Create → Download JSON

### Step 2: Install & Configure

```bash
# Create credentials directory
mkdir -p ~/.gmail-mcp

# Move downloaded OAuth JSON (rename it)
cp ~/Downloads/client_secret_*.json ~/.gmail-mcp/gcp-oauth.keys.json

# Install Gmail MCP server in Claude Code
claude mcp add --transport stdio gmail -- npx @gongrzhe/server-gmail-autoauth-mcp

# Or via Smithery (alternative)
# npx -y @smithery/cli install @gongrzhe/server-gmail-autoauth-mcp --client claude
```

### Step 3: Authenticate

```bash
# Run auth flow — opens browser for Google sign-in
npx @gongrzhe/server-gmail-autoauth-mcp auth

# Grant permissions:
#   ✓ Read email messages
#   ✓ Search email
#   ✓ View email labels
# A refresh token is saved to ~/.gmail-mcp/credentials.json
```

### Step 4: Verify

```bash
# Check MCP server is registered
claude mcp list

# Inside a Claude Code session, verify it's active
/mcp
```

### Troubleshooting

| Issue | Fix |
|-------|-----|
| `gcp-oauth.keys.json not found` | Check file is in `~/.gmail-mcp/` with exact filename |
| OAuth consent screen blocked | Add your email as test user in Google Cloud Console → OAuth consent screen |
| Token expired | Re-run `npx @gongrzhe/server-gmail-autoauth-mcp auth` |
| MCP not showing in `/mcp` | Restart Claude Code session after `claude mcp add` |

### Security Notes

- OAuth credentials are stored locally in `~/.gmail-mcp/` — never commit these
- The MCP server only requests read-only Gmail scopes by default
- Refresh tokens persist until revoked at [Google Account Permissions](https://myaccount.google.com/permissions)
