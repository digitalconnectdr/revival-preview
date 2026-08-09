# Revival Transportation Group — local review build

Premium local review website for Revival Transportation Group. This project has **not** been published or connected to Vercel, Hostinger, GitHub, DNS, email or the customer domain.

## Run locally

```powershell
Copy-Item .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. The gold environment banner confirms that the application is running as a local review and blocks search indexing through `robots.txt` and page metadata.

## Quality commands

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:vercel
pnpm build:hostinger:node
pnpm build:hostinger:static
```

## Truth and release rules

- Business facts are centralized in `src/content/business.ts`.
- Do not add phone numbers, physical addresses, fleet capacities, policies, rates, claims or testimonials without client approval.
- Pending approval items are recorded in `docs/pending-client-approvals.md`.
- The contact form is intentionally a local review flow until a secure approved mail transport is configured.
- Do not change `DEPLOYMENT_STAGE` to `production` or deploy any build until the client authorizes release.
