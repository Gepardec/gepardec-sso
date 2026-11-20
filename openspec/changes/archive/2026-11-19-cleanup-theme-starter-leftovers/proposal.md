# Proposal

## Why

`theme/` was bootstrapped from the Keycloakify v11 starter. Several starter leftovers remain that are misleading, inert or wrong for this repo (starter README, nested CI workflow, upstream LICENSE, placeholder comments, typo in package name), and the Keycloakify-specific structure is not documented anywhere for the team. Cleaning this up now, while the theme is still small, keeps future Keycloakify upgrades and onboarding simple.

## What Changes

- Remove/replace starter leftovers in `theme/`:
  - `theme/README.md`: replace the starter text (clone `keycloakify-starter`, account/email theme init, release workflow) with a short pointer to the root README.
  - `theme/.github/workflows/ci.yaml`: nested workflow copied from the starter (never executed by GitHub because it is not at the repo root, and it targets `main` + release publishing of the starter). Delete; the real build lives in `.github/workflows/build-keycloak.yaml`.
  - `theme/LICENSE`: upstream starter license (garronej). Decide and remove or replace with the project's own licensing (see design).
  - `theme/src/main.tsx`: remove the commented-out "test a specific page" starter block; keep a minimal dev entry.
  - `theme/vite.config.ts`: remove the commented-out `keycloakifyBuildDirPath` line and stale comment; align with actual JAR output handling.
  - `theme/package.json`: fix name typo `gepardec-soo-theme` -> `gepardec-sso-theme`; align `license`, and add `lint`/`typecheck` scripts.
  - `theme/.prettierrc.json`: drop override entries for files that do not exist (`account/pages`, `KcApp.tsx`, `login/pages/*.tsx`, `Template.tsx`, `UserProfileFormFields.tsx`) unless pages are ejected.
  - `theme/eslint.config.js`: reformat to the project's Prettier style (4 spaces) and drop the starter-only `no-labels` override if unused.
  - `theme/src/login/KcPageStory.tsx`, `KcContext.ts`: remove starter `NOTE:` boilerplate comments; keep behavior.
- Refactor to Keycloakify best practice:
  - `KcPage.tsx`: remove the redundant `switch` with only `default`, drop the unused `doMakeUserConfirmPassword` constant indirection, move `classes` above the component, keep the lazy `UserProfileFormFields`.
  - `Login.stories.tsx`: trim the starter's exhaustive 12-provider and duplicated social-provider stories to the cases that matter for Gepardec; extract shared mock data.
  - Add `lint` and `format:check` scripts and run them in CI.
- Documentation: add a "Keycloakify login theme" section to the root `README.md` describing what Keycloakify is, the `theme/` layout, how to preview (Storybook, Keycloak container), how to build the JAR, how it ends up in the image, how to add translations/assets/ejected pages, and which files are generated (do not edit).

Out of scope: visual/branding changes, account/admin/email themes, Keycloak SPI or realm config changes, upgrading Keycloakify or Keycloak versions, editing generated files (`theme/src/kc.gen.tsx`, `theme/public/keycloakify-dev-resources/`).

## Capabilities

### New Capabilities
<!-- None: pure refactor and documentation change -->

### Modified Capabilities
<!-- None: no spec-level behavior changes; rendered theme output must remain identical -->

## Impact

- Affected Keycloak FreeMarker pages: none functionally. All login pages (`login.ftl`, `register.ftl`, `login-reset-password.ftl`, `login-update-password.ftl`, `error.ftl`, `info.ftl`, ...) keep rendering through `DefaultPage` unchanged.
- Files: `theme/README.md`, `theme/LICENSE`, `theme/.github/`, `theme/package.json`, `theme/.prettierrc.json`, `theme/eslint.config.js`, `theme/vite.config.ts`, `theme/src/main.tsx`, `theme/src/login/{KcPage,KcPageStory,KcContext}.ts(x)`, `theme/src/login/pages/Login.stories.tsx`, root `README.md`, `.github/workflows/build-keycloak.yaml` (lint step, only if it builds the theme).
- Risk: low. Verified by `npm --prefix theme run build` and `build-keycloak-theme` producing the same JAR contents.
