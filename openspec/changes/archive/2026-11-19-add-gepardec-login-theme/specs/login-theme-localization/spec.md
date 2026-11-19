# Spec Delta

## Purpose

Defines the language support and Gepardec-specific wording of the login theme so users see consistent branded text in their language.

## ADDED Requirements

### Requirement: English and German support
The theme SHALL provide English and German texts for all Gepardec-customised labels, falling back to English for other locales.

#### Scenario: German browser locale
- **WHEN** the realm supports German and the user's locale is `de`
- **THEN** customised labels are shown in German

#### Scenario: Unsupported locale
- **WHEN** the user's locale has no Gepardec translation
- **THEN** the customised labels are shown in English

### Requirement: Custom translations defined in code
Gepardec-specific labels SHALL be defined through the theme's TypeScript i18n configuration and not via legacy `.properties` files.

#### Scenario: Label override
- **WHEN** a Gepardec label overrides a Keycloak default (e.g. the page title)
- **THEN** the overridden text appears on the rendered page in the active language
