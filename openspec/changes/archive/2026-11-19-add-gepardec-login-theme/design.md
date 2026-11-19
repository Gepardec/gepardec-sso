# Design

## Context

`theme/` is a fresh Keycloakify v11 (React, Vite, Keycloak 26) scaffold. `theme/src/login/KcPage.tsx` renders every page via `DefaultPage` with `doUseDefaultCss={true}`; `i18n.ts` has no custom translations; only one story (`Login.stories.tsx`) exists. Assets already present in `theme/src/login/assets/img/`: `hintergrundbilder_gepardec_super_small_new.png` (1958x1100), `gepardec-logo.png` (500x139), `favicon.ico`. See proposal.md for motivation and scope.

## Goals / Non-Goals

**Goals:**
- Fully branded look using only CSS, assets and i18n.
- Clean-room implementation; no legacy template code.

**Non-Goals:**
- Dark/light mode switching.
- Changing page structure or flow.

## Decisions

1. **CSS-only styling over `.kc*` hook classes** in `theme/src/login/main.css`, imported from `KcPage.tsx`. Keep `doUseDefaultCss={true}` so PatternFly defaults provide the base layout and we override with brand tokens (CSS custom properties `--gc-primary`, `--gc-dark`, `--gc-secondary`). Alternative: eject templates — rejected as heavier to maintain across Keycloakify upgrades. Eject only if the logo placement in the card header cannot be achieved with CSS (e.g. `::before` on the header class); any ejected file must be justified here.
2. **Background only, no logo**: the background is imported via a relative URL in CSS so Vite hashes and bundles it. The `#kc-header` (logo/realm name) is hidden with `display: none`, since the background already contains the logo; the page title `h1` remains for accessibility.
2a. **Hiding login options at theme level**: the `kcFormSettingClass` hook (remember me and forgot password) is mapped to `gc-hidden` in `KcPage.tsx`, and the sign-up block `#kc-info` is hidden with `:has(#kc-registration-container)` so other pages' info areas are unaffected. Alternative: disable the options in realm settings or eject `Login.tsx` — the CSS approach was chosen so the theme works regardless of realm config; note this only hides the UI, so password reset and registration endpoints stay reachable if enabled in the realm and should be disabled there too if they must be blocked.
3. **Font**: self-host via the `@fontsource/barlow-semi-condensed` npm package (weights 400, 500, 600, 700), imported in `main.css`/`KcPage.tsx`. Alternative: Google Fonts CDN — rejected (third-party request, privacy). 
4. **i18n**: `i18nBuilder.withThemeName<ThemeName>().withCustomTranslations({ en: {...}, de: {...} })` in `theme/src/login/i18n.ts`, only for keys we actually change (e.g. `loginAccountTitle`, `doLogIn`).
5. **Favicon**: Keycloakify's `Template` does not set a favicon. `theme/index.html` links the bundled asset (`/src/login/assets/img/favicon.ico`), which Vite hashes and Keycloakify emits into the generated FTL as `${xKeycloakify.resourcesPath}/dist/assets/favicon-<hash>.ico` (verified in the built JAR).
6. **Verification**: Storybook stories for login, error, reset-password, register, update-password and info pages; final check in a local Keycloak 26 via `keycloakify start-keycloak`.

7. **Asset location: `theme/src/login/assets/img/`** (chosen over `theme/src/assets/` and `theme/public/`). The assets are only used by the login theme and are imported via relative paths so Vite hashes and bundles them; colocating them with `theme/src/login/` keeps the login theme self-contained, and they are already there, so nothing moves. `public/` is rejected (unhashed, and forbidden by project convention). A shared `src/assets/` would only make sense once an account theme needs the same files. `openspec/config.yaml` is updated to match.

## Risks / Trade-offs

- [Background image is only 1958x1100 and may look soft on large screens] → use `background-size: cover` with dark overlay; request a larger asset later if needed.
- [Overriding PatternFly via CSS may break on Keycloakify upgrades] → rely on stable `.kc*` classes and keep overrides in one file.
- [Contrast of alerts on image background] → keep content inside a solid card.

