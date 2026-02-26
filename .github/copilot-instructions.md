# Copilot / AI agent instructions (project-specific)

This project is a Next.js (app-router) web app. Below are concise, actionable notes to help an AI coding agent be productive immediately.

- **Big picture**: Next 16 (app directory) React app using server components by default; interactive UI pieces are explicit `use client` components. Key entry points: [app/layout.js](app/layout.js#L1-L80) and [app/page.js](app/page.js#L1-L80).
- **Why structure**: App router separates page/route code under `app/` for incremental rendering and server-component defaults. Keep non-interactive logic in server components and add `"use client"` only for event handlers/stateful UI (see [app/components/Button/Button.js](app/components/Button/Button.js#L1-L80)).

- **Build / dev / lint commands**: Use the npm scripts in [package.json](package.json#L1-L40):
  - `npm run dev` — start local dev server
  - `npm run build` — production build
  - `npm run start` — run production server
  - `npm run lint` / `npm run lint:fix` — linting (ESLint + `eslint-config-next`)

- **Project conventions & patterns**:
  - Path aliases defined in [jsconfig.json](jsconfig.json#L1-L40): `@components/*` -> `app/components/`. Prefer those imports in new code.
  - Global styles live in `app/globals.css` and are applied in `app/layout.js`.
  - Images in `public/` can be referenced via `next/image` with a leading `/` (example: `Image src='/doc.jpg'` in [app/page.js](app/page.js#L1-L40)).
  - UI libs: MUI + Emotion + Tailwind are present in deps — avoid adding heavy UI libraries without coordinating.
  - `next.config.mjs` has `reactCompiler: true` enabled; be cautious when changing compiler-related options. ([next.config.mjs](next.config.mjs#L1-L20))

- **Files worth inspecting before edits**:
  - Layout & global CSS: [app/layout.js](app/layout.js#L1-L80), `app/globals.css`
  - Root page: [app/page.js](app/page.js#L1-L40)
  - Component example (client): [app/components/Button/Button.js](app/components/Button/Button.js#L1-L80)
  - Auth routes: [app/Auth/Signup/page.js](app/Auth/Signup/page.js#L1-L40) (Signin page currently empty)
  - Configs: [package.json](package.json#L1-L40), [jsconfig.json](jsconfig.json#L1-L40), [eslint.config.mjs](eslint.config.mjs#L1-L80)

- **Common tasks & agent behavior**:
  - When adding components, default to server components; add `"use client"` only for state/handlers.
  - Use aliases from `jsconfig.json` for imports (e.g. `@components/SignupForm`).
  - Don't assume form components exist — verify paths before changing (some form files are missing or named differently).
  - Keep changes minimal and confined to feature areas; avoid global config changes without explicit note and tests.

- **Testing / verification steps after edits**:
  1. Run `npm run dev` and load `http://localhost:3000` to confirm UI renders.
  2. Run `npm run lint` to ensure no lint regressions.
  3. If you change `next.config.mjs` or dependencies, run `npm run build`.

- **Examples of in-repo patterns (copyable snippets)**
  - Import with alias: `import SignupForm from "@components/SignupForm";` (seen in [app/Auth/Signup/page.js](app/Auth/Signup/page.js#L1-L20)).
  - Client component header: start file with `'use client'` then `export default function Button(...) { ... }` (see [app/components/Button/Button.js](app/components/Button/Button.js#L1-L40)).

If anything here is unclear or you want this tightened to a specific area (API routes, tests, CI, or styling), tell me which area and I will iterate.
