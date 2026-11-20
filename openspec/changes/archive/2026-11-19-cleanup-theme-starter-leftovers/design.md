# Design

## Context

Audit of `theme/` against the Keycloakify v11 starter found:

| Item | Finding |
|---|---|
| `theme/README.md` | Verbatim starter text (clone starter, yarn, release workflow). Misleading. |
| `theme/.github/workflows/ci.yaml` | Starter CI (ts-ci release publishing). Lives in a subfolder so GitHub never runs it. |
| `theme/LICENSE` | Upstream MIT, copyright garronej. |
| `theme/src/main.tsx` | Starter comment block for page testing. |
| `theme/vite.config.ts` | Commented `keycloakifyBuildDirPath`. |
| `theme/package.json` | Name typo `gepardec-soo-theme`; no lint/typecheck scripts despite ESLint config. |
| `theme/.prettierrc.json` | Overrides for ejected-file paths that do not exist. |
| `theme/src/login/KcPage.tsx` | Single-`default` `switch` in an IIFE; `doMakeUserConfirmPassword` constant. |
| `theme/src/login/pages/Login.stories.tsx` | Starter stories incl. 12 social providers and duplicated provider arrays. |
| `theme/src/kc.gen.tsx`, `public/keycloakify-dev-resources/` | Generated; must stay untouched (git-ignored or marked auto-generated). |

No page is ejected (`theme/src/login/pages/` has only stories), so the theme is pure CSS + i18n + assets, which is the desired state.

## Goals / Non-Goals

**Goals:**
- No misleading starter content remains in `theme/`.
- `KcPage.tsx` and tooling follow current Keycloakify guidance and project conventions (4-space Prettier, strict TS).
- Team documentation of the Keycloakify setup in the root README.

**Non-Goals:**
- Any visual change; ejecting pages; upgrading dependencies; changing generated files.

## Decisions

1. **Delete `theme/.github/`** rather than move it: the root `.github/workflows/build-keycloak.yaml` already builds the artifact; the starter's release-by-version-bump flow does not match this monorepo.
2. **`theme/LICENSE`**: keep the file only if the repo has no root license and legal confirms; the starter's copyright line is not Gepardec's. Default: remove it and set `"license": "UNLICENSED"` in `package.json` unless the user says otherwise (open question below).
3. **`theme/README.md`**: replace with 5-10 lines pointing to the root README section, so `theme/` stays self-explanatory on GitHub.
4. **`KcPage.tsx` simplification**: render `DefaultPage` directly (no switch). When a page is ejected later, reintroduce the `switch (kcContext.pageId)` per Keycloakify docs. Move `classes` above the component and inline `doMakeUserConfirmPassword`. Keep `satisfies { [key in ClassKey]?: string }`.
5. **Prettier overrides**: remove entries for nonexistent paths; keep a single `login/pages/*.tsx` override only if ejected pages appear.
6. **Stories**: keep `Default`, `WithInvalidCredential`, `WithErrorMessage`, `WithOneSocialProvider`, `WithMoreThanTwoSocialProviders`, `InGerman`, plus the stories that exercise the hidden options (`WithoutRegistration`, `WithoutRememberMe`, `WithoutPasswordReset`). Extract a `socialProviders` fixture to a local const. Drop starter-only noise (12-provider list, near-duplicate provider stories). Stories not under test for Gepardec branding add no value and slow Storybook.
7. **Scripts**: add `"lint": "eslint ."`, `"typecheck": "tsc --noEmit"`, `"format:check": "prettier . --check"`. Run `lint` in the existing build workflow only if that workflow already installs theme dependencies.
8. **README section** (root `README.md`, new top-level heading "Keycloakify Login Theme"): what Keycloakify is (React/TS themes compiled to a Keycloak theme JAR), repo layout table (`theme/src/login/KcPage.tsx`, `main.css`, `i18n.ts`, `KcContext.ts`, `KcPageStory.tsx`, `pages/*.stories.tsx`, `assets/img/`, generated `kc.gen.tsx`), commands (install, storybook, `build`, `build-keycloak-theme`, `start-keycloak`), how the JAR reaches the image, how to customise (CSS hooks > i18n > eject last resort), and a "do not edit" list.

## Risks / Trade-offs

- Removing `theme/LICENSE` has legal implications for the MIT notice of copied starter code; the starter code remaining is minimal, but confirm with the user (open question).
- Trimming stories reduces visual regression coverage slightly; mitigated by keeping every state that the theme CSS targets.
- Simplifying `KcPage.tsx` changes nothing at runtime; verify by diffing the built JAR's FTL output and dist assets before/after.
