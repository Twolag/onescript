# AGENTS.md

## Cursor Cloud specific instructions

OneScript is a **client-side Vite + React 19 SPA** (a French gaming/PC-optimization e-commerce marketing site). Dependencies are managed with **pnpm** (`packageManager` pins the version) and are installed by the environment update script (`pnpm install`), so you normally do not need to reinstall.

### Services / how to run

- **Frontend dev server (the app):** `pnpm dev` runs Vite with `--host` on port `3000` (`strictPort: false`, so it may pick the next free port). This is the only long-running service and serves the entire product. Prefer running it in a tmux-backed terminal.
- The whole UI is client-side (routing via `wouter`). The core purchase flow (filling the form on `/purchase` and clicking submit) generates an order number and payment options **entirely in the browser** — no backend needed to demo it.

### Non-obvious caveats

- **`api/` is Vercel serverless functions, not served by `pnpm dev`.** Endpoints like `/api/checkout` (Stripe), `/api/send-email` (Resend), and `/api/discord-notify` only run on a Vercel deployment. In local `vite dev` those `fetch` calls will fail/404 — this is expected. Only the actual card/email/Discord steps are affected; order creation and navigation work locally.
- **`server/` is a separate Express server** used only by the production bundle (`pnpm build` → `esbuild server/index.ts`, run via `pnpm start`). It is not part of the dev workflow.
- **`pnpm check` (tsc) currently reports 2 pre-existing type errors in `server/`** (`node-fetch` not installed; Resend `template` property). These are committed in the repo and unrelated to environment setup — do not treat them as a setup failure.
- No automated tests exist (no `test` script, no `*.test.*` files). `vitest` is installed but unused.
- `.env` (see `.env.example`) is only needed for real Stripe/Resend/Discord calls. `VITE_STRIPE_PUBLIC_KEY` has a hardcoded test-key fallback, so the frontend runs without any `.env`.

### Common commands

- Run app (dev): `pnpm dev`
- Typecheck: `pnpm check`
- Format: `pnpm format`
- Production build: `pnpm build` (outputs `dist/public` + bundled `dist/index.js`); serve with `pnpm start`.
