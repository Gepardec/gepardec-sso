# Proposal

## Why

The existing Gepardec login theme was built on the outdated Keycloak theme template and no longer fits Keycloak 26. The `theme/` project is now a fresh Keycloakify v11 scaffold that renders Keycloak's stock look. We need to rebuild the Gepardec-branded login experience from scratch on this stack instead of porting legacy FreeMarker/CSS.

## What Changes

- Add a Gepardec-branded visual design to all login-theme pages: full-viewport background image (which already contains the logo, so no separate logo is rendered), brand colours (`#ffc800`, `#17181a`, `#2b2b2b`) and the Barlow Semi Condensed font (self-hosted).
- Style via Keycloakify's `.kc*` hook classes in a new global stylesheet `theme/src/login/main.css`, imported in `KcPage.tsx`; no legacy template code is carried over.
- Keep assets in `theme/src/login/assets/img/` (login-theme specific, colocated with the login code, already in place) and align `openspec/config.yaml` with that location.
- Hide the Remember me checkbox, the Forgot password link and the registration link on `login.ftl` at theme level.
- Add Gepardec favicon and page title/realm display text via i18n custom translations (English and German).
- Add Storybook stories for the key login pages to preview the result.
- Pages affected (FreeMarker page IDs, all rendered through `DefaultPage`/`Template`): `login.ftl`, `login-username.ftl`, `login-password.ftl`, `register.ftl`, `login-reset-password.ftl`, `login-update-password.ftl`, `login-verify-email.ftl`, `login-otp.ftl`, `login-page-expired.ftl`, `error.ftl`, `info.ftl`, `logout-confirm.ftl`, `select-authenticator.ftl`, `login-config-totp.ftl`, `login-update-profile.ftl`, `terms.ftl`. Social IdP buttons on `login.ftl` are included.
- Not breaking.

## Capabilities

### New Capabilities
- `login-theme-branding`: Gepardec visual identity (background, colours, typography, favicon) and the reduced login options applied consistently across all login pages including error and validation states.
- `login-theme-localization`: Gepardec-specific labels and translations (English, German) for the login theme.

### Modified Capabilities

## Out of Scope

- Account console and Admin console themes.
- Email themes.
- Backend SPIs, realm configuration, container build and the `/provider` JAR pipeline.
- Ejecting page templates (only if CSS/i18n proves insufficient, to be decided during implementation and recorded in design.md).
- Porting any code from the old template-based theme.

## Impact

- Code: `theme/src/login/main.css` (new), `theme/src/login/KcPage.tsx`, `theme/src/login/i18n.ts`, `theme/src/login/pages/*.stories.tsx`, `theme/package.json` (font dependency).
- Assets: stay in `theme/src/login/assets/img/` (background, favicon; the logo file is no longer used); no files need to move. `openspec/config.yaml` is updated to name this as the project convention.
- Build: `npm --prefix theme run build-keycloak-theme` output must still produce a Keycloak 26 JAR.
