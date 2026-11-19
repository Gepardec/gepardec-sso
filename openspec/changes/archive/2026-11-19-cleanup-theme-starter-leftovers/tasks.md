# Tasks

## 1. Baseline

- [x] 1.1 Run `npm --prefix theme run build-keycloak-theme` and record the JAR file listing (`unzip -l`) for comparison after the refactor

## 2. Remove starter leftovers

- [x] 2.1 Delete `theme/.github/` (starter CI); verify `.github/workflows/build-keycloak.yaml` still covers the theme build
- [x] 2.2 Replace `theme/README.md` with a short pointer to the root README section
- [x] 2.3 Resolve `theme/LICENSE` per design decision 2 (remove, or keep if user confirms) and align `license` in `theme/package.json`
- [x] 2.4 Clean `theme/src/main.tsx` (remove commented starter block) and `theme/vite.config.ts` (remove commented `keycloakifyBuildDirPath`)
- [x] 2.5 Fix package name to `gepardec-sso-theme` in `theme/package.json` and `package-lock.json`; add `lint`, `typecheck`, `format:check` scripts
- [x] 2.6 Remove Prettier overrides for nonexistent paths in `theme/.prettierrc.json`; reformat `theme/eslint.config.js` to 4-space style
- [x] 2.7 Remove starter `NOTE:` boilerplate comments in `theme/src/login/KcContext.ts` and `KcPageStory.tsx`

## 3. Refactor

- [x] 3.1 Simplify `theme/src/login/KcPage.tsx` (no single-case switch, inline confirm-password flag, `classes` above component); verify `npm --prefix theme run build`
- [x] 3.2 Trim `theme/src/login/pages/Login.stories.tsx` per design decision 6 and extract a shared social-provider fixture; verify all remaining stories render in `npm --prefix theme run storybook`
- [x] 3.3 Run `npm --prefix theme run lint` and `format:check`; fix findings in changed files only

## 4. Documentation

- [x] 4.1 Add a "Keycloakify Login Theme" section to the root `README.md` per design decision 8 (what it is, layout, commands, build/image flow, customisation order, generated files not to edit)
- [x] 4.2 Check every command in the README section actually works from the repo root

## 5. Verification

- [x] 5.1 Run `npm --prefix theme run build-keycloak-theme`; compare JAR listing with task 1.1 (only hash-neutral differences allowed)
- [x] 5.2 Confirm `git status` shows no changes under `theme/public/keycloakify-dev-resources/` or `theme/dist_keycloak/`

## Open questions

- Keep or remove `theme/LICENSE` (upstream starter MIT notice)? Default in task 2.3: remove.
