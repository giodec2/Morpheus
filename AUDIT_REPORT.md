# Morpheus Open-Source Repo Audit Report

**Date:** 2026-07-12  
**Scope:** Full working tree + git history (all branches reachable from `main`)  
**Goal:** Identify security exposure, unnecessary local/dev-only artifacts, and polish issues before open-sourcing.

---

## Executive Summary

The repository is functionally clean in terms of application source code, but it currently ships several categories of files that do not belong in a public open-source repo:

1. **Real backend/project identifiers** are present in current docs and in git history.
2. **Deployment archives, executables, and build outputs** are tracked or sitting in the working tree.
3. **Personal/business setup docs and roadmaps** are tracked and expose the author's specific infrastructure and product plans.
4. **Appwrite Edge Function source code** is bundled in the same repo as the frontend; this is deployment logic, not local-runtime logic.

The most important remediation is **rewriting git history** to remove leaked IDs, then deleting or sanitizing the files listed below.

---

## Critical Security Findings

| Risk | File / Commit | Details |
|------|---------------|---------|
| **High** | `APPWRITE_SETUP.md` | Contains a real Appwrite project ID and endpoint in the "Environment File" section. These values identify the author's live backend project. |
| **High** | Git history (`PAYMENT_SETUP.md`, commit `45bcbf20`) | A previous version of the payment setup guide exposed Store ID, LemonSqueezy variant IDs, Appwrite endpoint, Appwrite project ID, and Appwrite database ID. The commit message even says "scrubbed from history", but the old values remain reachable in git history. |
| **Medium** | `appwrite-functions/create-checkout/src/main.js` | Hardcoded production success URL: `https://your-domain.com/app?checkout=success`. |
| **Medium** | `appwrite-functions/lemonsqueezy-handler/src/main.js` | Same hardcoded production success URL fallback. |
| **Low** | `src/i18n/legal.ts` | Contains a real support email (`hello@morpheusink.com`) and business location (Rome, Italy). This is normal for a live product but should be a conscious choice for an open-source repo. |

**No hardcoded API keys, passwords, or private keys were found in the current tree.** All application code correctly reads Appwrite / LemonSqueezy / OpenRouter configuration from environment variables.

### Local-only files present (properly ignored, do not commit)

- `.env` — exists locally and is correctly ignored by `.gitignore`. Verify that none of its values were ever committed in the past.
- `node_modules/` — correctly ignored. Left in place because it is required for local development after `npm install`.
- `dist/` — build output, correctly ignored. Safe to delete.

---

## Files and Folders to Remove or Move

### 1. Obvious junk — safe to delete now

These files are either binaries/archives, build artifacts, or files already covered by `.gitignore` but still tracked.

| Path | Reason | Status |
|------|--------|--------|
| `bfg-1.15.0.jar` | BFG Repo-Cleaner executable. Tool artifact, not project code. Already in `.gitignore`. | Local-only |
| `hosted-ai-proxy-fixed.tar.gz` | Deployment archive. Tracked, 4.5 MB. | Tracked |
| `lemonsqueezy-handler-fixed.tar.gz` | Deployment archive. Tracked, 1.7 MB. | Tracked |
| `appwrite-functions/hosted-ai-proxy/hosted-ai-proxy.tar.gz` | Deployment archive inside function folder. | Tracked |
| `appwrite-functions/create-checkout/package-lock.json` | Function dependency lock. Already ignored, still tracked. | Tracked |
| `appwrite-functions/hosted-ai-proxy/package-lock.json` | Function dependency lock. Already ignored, still tracked. | Tracked |
| `appwrite-functions/lemonsqueezy-webhook/package-lock.json` | Function dependency lock. Already ignored, still tracked. | Tracked |
| `dist/` | Vite build output. Already ignored. | Local-only |

### 2. Setup / personal docs — recommend removing or heavily sanitizing

| Path | Reason |
|------|--------|
| `APPWRITE_SETUP.md` | Contains the author's real Appwrite endpoint and project ID. For open source this should become a generic "self-hosting" guide with placeholder values only. |
| `PAYMENT_SETUP.md` | Infrastructure-specific setup for LemonSqueezy + Appwrite. Useful, but tied to the author's exact deployment. Consider moving to a private deployment repo or converting to a generic template. |
| `PRODUCTION_ROADMAP.md` | Personal business roadmap, pricing, marketing plans, and feature cuts. Not appropriate for an open-source codebase. |

### 3. Appwrite Edge Functions — recommend moving to a separate repo

| Path | Reason |
|------|--------|
| `appwrite-functions/` | These are server-side deployment units, not required to run the frontend locally. Keeping them in the public repo increases attack surface and couples deployment logic to the app. A separate `morpheus-functions` (or similar) repo is the cleaner pattern. |

If you choose to keep them, make sure no function package bundles secrets and remove all `package-lock.json` files and `.tar.gz` archives.

### 4. Large assets — review

| Path | Size | Note |
|------|------|------|
| `public/logo.png` | 1.7 MB | Logo asset; acceptable if intentionally public. |
| `public/assets/hero-editor-dark.png` | 1.0 MB | Marketing asset. |
| `public/assets/hero-editor.png` | 1.0 MB | Marketing asset. |
| `src/i18n/legal.ts` | 133 KB | Generated legal-page translations; acceptable to keep but verify it does not contain real business details you do not want public. |

---

## Git History Findings

- **Leaked IDs are still reachable** in commit `45bcbf2046e8cde64b59eaff517a98357d6b3f0a` and likely in earlier commits.
- **Large binaries are present in history**, including older versions of `hosted-ai-proxy-fixed.tar.gz` (up to ~2.8 MB) and `lemonsqueezy-handler-fixed.tar.gz`. These inflate clone size even if deleted from the current tree.
- **No real API keys or passwords were found** in history scans, but project/endpoint/store IDs were exposed.

### Recommended history cleanup

Use **BFG Repo-Cleaner** (the jar already in the repo) or `git filter-repo` to:

1. Remove all `.tar.gz` files from history.
2. Remove `bfg-1.15.0.jar` from history.
3. Remove `appwrite-functions/**/package-lock.json` from history.
4. Scrub the leaked Appwrite / LemonSqueezy IDs from `PAYMENT_SETUP.md` and `APPWRITE_SETUP.md` history.

**This is a destructive operation** (`git push --force` required). All collaborators must re-clone or hard-reset.

---

## `.gitignore` Assessment

The current `.gitignore` is already well-structured for a Vite/React project:

- `node_modules/`, `dist/`, `.env`, editor/OS files are ignored.
- BFG artifacts and embedded-repo accidents are ignored.
- Function archives and function `package-lock.json` files are ignored.

### Recommended additions

```gitignore
# Root-level deployment archives and tool executables
/*.tar.gz
/*.jar
```

These patterns are broader than the existing per-folder rules and will catch future root-level archives without requiring a new line for each file.

---

## Action Checklist

- [ ] **Before anything else:** rotate the Appwrite project/API keys and LemonSqueezy credentials that were exposed in history, even if you later rewrite history. History rewriting does not invalidate credentials that may already have been copied.
- [ ] Delete or sanitize `APPWRITE_SETUP.md`, `PAYMENT_SETUP.md`, and `PRODUCTION_ROADMAP.md`.
- [ ] Move `appwrite-functions/` to a separate deployment repository (or at minimum remove archives and lockfiles).
- [ ] Delete the obvious junk listed in section 1.
- [ ] Add the broader `.gitignore` rules shown above.
- [ ] Rewrite git history with BFG / `git filter-repo` to remove leaked IDs and large binaries.
- [ ] Force-push the cleaned history and notify any collaborators to re-clone.
- [ ] Decide whether `src/i18n/legal.ts` should keep real contact details.
- [ ] Run `npm test` / `npm run build` after cleanup to confirm the app still compiles.

---

## Verification

This report was generated by auditing:

- All currently tracked files (`git ls-files`).
- All untracked but present files (`git status`).
- Git history for large objects and known secret/identifier patterns (`git log --all -p`, `git rev-list --objects --all`).
- Source files most likely to contain credentials (`src/lib/appwrite.ts`, `src/services/*`, `src/hooks/*`, `appwrite-functions/*`).

No application source logic was modified during the audit.
