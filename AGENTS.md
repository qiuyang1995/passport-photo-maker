# Repository Guidelines

## Project Structure & Module Organization
This project is a Next.js App Router app for a bilingual passport photo tool. Put route files in `app/`; locale-aware pages live under `app/[locale]`, with marketing and SEO content grouped in route folders such as `(marketing)` and `(content)`. Keep domain logic in `features/` (`editor`, `export`, `content`), shared UI in `components/`, and cross-cutting helpers in `lib/` (`i18n`, `seo`, `analytics`, `runtime`). Store static assets in `public/`, long-form product docs in `doc/`, and test code in `tests/unit` and `tests/e2e`.

## Build, Test, and Development Commands
Use `npm run dev` for local development and `npm run build` then `npm run start` to verify the production build. Run `npm run lint` for ESLint, `npm run typecheck` for TypeScript checks, and `npm run format:check` before opening a PR. Unit and component tests run with `npm run test`; use `npm run test:watch` while iterating. Browser tests run with `npm run test:e2e`. On a fresh machine, install Playwright Chromium once with `npx playwright install chromium`.

## Coding Style & Naming Conventions
Write TypeScript with 2-space indentation, semicolons, and double quotes; Prettier (`.prettierrc.json`) is the source of truth and also sorts Tailwind classes. Follow the existing naming pattern: file names use kebab-case like `passport-photo-tool.tsx`, exported React components use PascalCase, and utility functions use camelCase. Keep route entry files named `page.tsx` or `layout.tsx`. Prefer the `@/` alias for root imports where it improves clarity.

## Testing Guidelines
Vitest and Testing Library cover unit and component behavior in `tests/unit/**/*.test.ts(x)`. Playwright covers end-to-end flows in `tests/e2e`, with desktop and mobile coverage split between files such as `app.spec.ts` and `mobile.spec.ts`. No hard coverage threshold is configured, but changes to editor transforms, export rendering, metadata, or localized routing should ship with tests or updated assertions.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects with conventional prefixes, for example `feat: finalize passport photo maker launch` and `docs: handoff-to-codex-web.md`. Keep commits focused on one change set. PRs should describe user-visible impact, list validation commands run, link any related issue, and include screenshots for UI, cropper, or export-template changes.

## Security & Configuration Tips
Start from `.env.example` and keep secrets out of git. Document any new `NEXT_PUBLIC_*` variable in the PR. When touching ads or analytics, verify the app still behaves correctly with unset AdSense and GA variables.
