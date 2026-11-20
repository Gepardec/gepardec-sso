# Tasks

## 1. Foundation

- [x] 1.1 Add `@fontsource/barlow-semi-condensed` to `theme/package.json`; verify `npm --prefix theme install` succeeds
- [x] 1.2 Create `theme/src/login/main.css` with brand tokens, self-hosted font imports and base typography, import it in `theme/src/login/KcPage.tsx`; verify `npm --prefix theme run build` passes

## 2. Branding

- [x] 2.1 Style full-viewport background (`hintergrundbilder_gepardec_super_small_new.png`) with overlay in `main.css`; verify in Storybook login story
- [x] 2.2 Style the card, inputs, primary/secondary buttons, links and IdP buttons with brand colours; verify in Storybook for login page
- [x] 2.3 Wire up the Gepardec favicon (`favicon.ico`); verify the icon resolves in the Storybook/Keycloak page
- [x] 2.4 Style alerts and field validation errors for contrast; verify via error and invalid-credentials stories
- [x] 2.5 Add responsive rules; verify no horizontal scroll at 320px in Storybook

- [x] 2.6 Hide the logo header, Remember me, Forgot password and registration link on `login.ftl`; verify in Storybook login stories

## 3. Localization

- [x] 3.1 Add English and German custom translations in `theme/src/login/i18n.ts`; verify via Storybook locale switch that labels change

## 4. Stories and Verification

- [x] 4.1 Add stories with `npx --prefix theme keycloakify add-story -p theme` for login, register, login-reset-password, login-update-password, error and info pages; verify they render in `npm --prefix theme run storybook`
- [x] 4.2 Run `npm --prefix theme run build-keycloak-theme`; verify the Keycloak 26 JAR is produced
- [ ] 4.3 Test in local Keycloak 26 (`npx --prefix theme keycloakify start-keycloak -p theme`); verify login, reset-password, error and IdP states look as specified

## Workflow follow-up

- Archive the change once the theme has been reviewed in a running Keycloak.
