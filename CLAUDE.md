# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@onlyoffice/docspace-react` — a single React component (`DocSpace`) that embeds an ONLYOFFICE Apps (formerly DocSpace) frame via `@onlyoffice/docspace-sdk-js`. Published to npm as a library (ESM + CJS + `.d.ts`); there is no app here, only Storybook stories for manual checking.

## Commands

Node version is pinned in `.nvmrc`. Use npm (`package-lock.json`).

- `npm run lint` — ESLint (flat config; enforces double quotes and semicolons).
- `npx tsc -b --force` — typecheck the whole solution (src, stories, tests, `.storybook/*`, Vite configs). This is what CI runs; it's wider than the build.
- `npm run test` / `npm run test:watch` / `npm run test:coverage` — Vitest in jsdom.
- Single test: `npx vitest run tests/DocSpace.test.tsx -t "initialises the frame once"`.
- `npm run build` — `tsc -b` → `vite build` (library bundle into `dist/`) → `tsc -p tsconfig.build.json` (declarations only).
- `npm run storybook` / `npm run build-storybook` — requires `.env` copied from `.env.example` (`VITE_DOCSPACE_URL`, `VITE_DOCSPACE_FILE_ID`).

CI (`.github/workflows/ci.yml`) runs typecheck and tests against **both React 18 and 19** (React 18 is installed over the lockfile with `npm install --no-save react@18 react-dom@18 @types/react@18 @types/react-dom@18`). Reproduce that locally when touching anything React-version sensitive.

## Architecture and non-obvious constraints

- `src/components/DocSpace/DocSpace.tsx` is the whole runtime. It calls `new SDK().initFrame(config)` in a **mount-only** `useEffect` and `destroyFrame()` on unmount. Re-running on config change is intentionally avoided (it would destroy the user's session in the frame); config changes go through the instance's `setConfig`, handed out by `onSetDocspaceInstance`. Keep the `exhaustive-deps` suppression and its comment.
- The SDK *replaces* the `#frameId` placeholder with its own container, so the outer wrapper `div` is what React owns. The wrapper uses `display: contents` (no box, so sizing comes from `config.width`/`height` against the parent) and `lineHeight: 0` (prevents the inline iframe's descender gap from causing a scrollbar). Tests assert these styles.
- `react`, `react-dom` and `@onlyoffice/docspace-sdk-js` are **peer dependencies** and are marked external in `vite.config.ts` — never bundle them, and the package has no runtime `dependencies`. SDK types are imported from deep paths (`@onlyoffice/docspace-sdk-js/dist/types/...`).
- Three separate build configs: `vite.config.ts` (library build), `vitest.config.ts` (tests — kept separate so the externals/lib settings don't apply), and `.storybook/main.ts` (strips `build.lib`/`rollupOptions` in `viteFinal`).
- Tests mock the SDK module with `vi.mock` + `vi.hoisted` spies for `initFrame`/`destroyFrame`; no real ONLYOFFICE Apps instance is contacted.
- Stories give every mount a unique `frameId` because the SDK keys frames by id and Storybook remounts can overlap old and new frames.
- Public exports go through `src/index.ts` → `src/components/DocSpace/index.ts`.

## Conventions

- Every source file in `src/` and `tests/` starts with the Apache 2.0 "(c) Copyright Ascensio System SIA" license header — add it to new files.
- User-facing changes get a line under `## [Unreleased]` in `CHANGELOG.md`. Release automation reads the first version number in `CHANGELOG.md`: pushing to `master` creates a `v<version>` tag, and the tag triggers `npm publish` and a GitHub release built from that changelog section.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `build:`, `ci:`, `docs:`).
