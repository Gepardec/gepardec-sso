# Spec Delta

## Purpose

Defines the Gepardec visual identity of the Keycloak login theme so that every login-related page looks consistent, branded and usable on desktop and mobile.

## ADDED Requirements

### Requirement: Branded background
Every login page SHALL display the Gepardec background image covering the full viewport. The theme SHALL NOT render a separate logo or realm name header, because the background image already carries the Gepardec logo.

#### Scenario: Login page renders branding
- **WHEN** a user opens the login page (`login.ftl`)
- **THEN** the Gepardec background image covers the viewport and no additional logo or realm name is shown above the form card

#### Scenario: Other pages share branding
- **WHEN** a user opens any other login-theme page (e.g. `login-reset-password.ftl`, `error.ftl`)
- **THEN** the same background is shown and no additional logo is rendered

### Requirement: Reduced login options
The login page SHALL NOT show the "Remember me" checkbox, the "Forgot password?" link or the registration link, regardless of the realm settings.

#### Scenario: Realm allows all options
- **WHEN** the realm has remember me, password reset and registration enabled and a user opens `login.ftl`
- **THEN** only the username/password fields, the sign-in button and any identity provider buttons are shown

#### Scenario: Identity providers remain
- **WHEN** an identity provider is enabled and the user opens `login.ftl`
- **THEN** its button is still shown below the sign-in form

### Requirement: Brand colours and typography
The theme SHALL use the Gepardec colours (`#ffc800` primary accent, `#17181a` dark, `#2b2b2b` secondary) and the Barlow Semi Condensed font, served from the theme itself without external requests.

#### Scenario: Primary button styling
- **WHEN** a page shows a primary action button
- **THEN** it uses the `#ffc800` accent with readable dark text

#### Scenario: Font is self-hosted
- **WHEN** a login page loads
- **THEN** text renders in Barlow Semi Condensed and no request is made to a third-party font host

### Requirement: Branded error and validation states
Error, warning, success and field-validation messages SHALL remain clearly distinguishable and legible on the branded background.

#### Scenario: Invalid credentials
- **WHEN** a user submits wrong credentials
- **THEN** an error alert is displayed within the card with sufficient contrast and the form remains usable

#### Scenario: Expired action link
- **WHEN** a user opens an expired action link
- **THEN** the branded error/info page shows the message and a link back to the login

### Requirement: Social identity provider buttons
When identity providers are configured, their buttons SHALL be shown on the login page in the branded style.

#### Scenario: IdP buttons displayed
- **WHEN** the realm has at least one identity provider enabled
- **THEN** each provider is rendered as a button inside the card, separated from the password form

### Requirement: Responsive layout
The login card SHALL be usable from 320px viewport width upward without horizontal scrolling.

#### Scenario: Mobile viewport
- **WHEN** the login page is viewed at 320px width
- **THEN** the card fits the viewport and all inputs and buttons are reachable

### Requirement: Favicon
Login pages SHALL show the Gepardec favicon.

#### Scenario: Favicon shown
- **WHEN** a login page is loaded in a browser
- **THEN** the browser tab shows the Gepardec favicon
