import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import "./main.css";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

// Map Keycloakify hook classes to Gepardec classes defined in main.css.
const classes = {
    kcLoginClass: "gc-login",
    kcFormSettingClass: "gc-hidden",
    kcFormCardClass: "gc-form-card"
} satisfies { [key in ClassKey]?: string };

// No page is ejected, so every page renders through DefaultPage.
// When ejecting a page, add a `switch (kcContext.pageId)` before the DefaultPage fallback.
export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={true}
            />
        </Suspense>
    );
}
