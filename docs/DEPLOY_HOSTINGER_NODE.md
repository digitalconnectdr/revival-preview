# Hostinger Node deployment runbook

This is a future-production runbook only. It must not be used to change the current Vercel preview, Hostinger production or the live domain without written approval.

## Runtime and commands

- Supported runtime: Node.js `>=20.9 <25` (use the latest Hostinger-supported Node 20 or 22 LTS release).
- Install: `corepack enable && pnpm install --frozen-lockfile`
- Build: `NEXT_PUBLIC_SITE_ENV=production DEPLOYMENT_STAGE=production DEPLOY_TARGET=hostinger-node pnpm build:hostinger:node`
- Start: `pnpm start` (Hostinger supplies the listening port through its Node application configuration).

## Required production environment

Set these values in Hostinger's environment panel, never in Git:

- `NEXT_PUBLIC_SITE_ENV=production`
- `DEPLOYMENT_STAGE=production`
- `NEXT_PUBLIC_SITE_URL=https://revivaltransportationgroup.com`
- `NEXT_PUBLIC_BOOKING_URL` (the verified MyLimoBiz destination)
- Optional only after approval: GA4/Google Ads identifiers, Google verification token and an implemented contact-form delivery mode.

## Before DNS cutover

1. Confirm the assigned Node port, reverse proxy and HTTPS certificate.
2. Validate canonical URLs, `robots.txt`, `sitemap.xml`, `hreflang`, favicon, image paths and all English, Spanish and Portuguese deep routes.
3. Confirm the security headers from `next.config.ts`: CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame protection and production HSTS.
4. Install the prepared redirects in `docs/REDIRECT_MAP.csv`; do not redirect all legacy URLs to the homepage.
5. Test booking, phone, email, Instagram and any approved analytics conversions with production values.

## Rollback

Keep the previous production artifact and current DNS target until the validation window closes. If a critical issue is found, revert the hosting application to the previous artifact/commit, clear the affected cache and re-check the canonical response before communicating the rollback.

## Static alternative

If Node hosting is unavailable, run `pnpm build:hostinger:static` followed by `pnpm package:hostinger:static`. Upload `dist/hostinger-static.zip` to `public_html` only after approval. The package includes the environment-specific `.htaccess`, 404 page and security/robots headers. Test deep locale routes in the deployed static environment because Apache rewrite behavior is host-specific.
