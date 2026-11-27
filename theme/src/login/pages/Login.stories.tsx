import type { Meta, StoryObj } from "@storybook/react-vite";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

const socialProviders = [
    {
        loginUrl: "google",
        alias: "google",
        providerId: "google",
        displayName: "Google",
        iconClasses: "fa fa-google"
    },
    {
        loginUrl: "microsoft",
        alias: "microsoft",
        providerId: "microsoft",
        displayName: "Microsoft",
        iconClasses: "fa fa-windows"
    },
    {
        loginUrl: "github",
        alias: "github",
        providerId: "github",
        displayName: "Github",
        iconClasses: "fa fa-github"
    },
    {
        loginUrl: "gitlab",
        alias: "gitlab",
        providerId: "gitlab",
        displayName: "Gitlab",
        iconClasses: "fa fa-gitlab"
    }
];

function withSocialProviders(count: number) {
    return {
        social: { displayInfo: true, providers: socialProviders.slice(0, count) }
    };
}

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithInvalidCredential: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { username: "johndoe" },
                messagesPerField: {
                    // existsError() and get() are the only functions that need mocking;
                    // the others of messagesPerField are derived from them.
                    existsError: (fieldName: string, ...otherFieldNames: string[]) =>
                        [fieldName, ...otherFieldNames].some(
                            name => name === "username" || name === "password"
                        ),
                    get: (fieldName: string) =>
                        fieldName === "username" || fieldName === "password"
                            ? "Invalid username or password."
                            : ""
                }
            }}
        />
    )
};

export const WithErrorMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary:
                        "The time allotted for the connection has elapsed.<br/>The login process will restart from the beginning.",
                    type: "error"
                }
            }}
        />
    )
};

export const WithoutRegistration: Story = {
    render: () => <KcPageStory kcContext={{ realm: { registrationAllowed: false } }} />
};

export const WithoutRememberMe: Story = {
    render: () => <KcPageStory kcContext={{ realm: { rememberMe: false } }} />
};

export const WithoutPasswordReset: Story = {
    render: () => <KcPageStory kcContext={{ realm: { resetPasswordAllowed: false } }} />
};

export const WithoutPasswordField: Story = {
    render: () => <KcPageStory kcContext={{ realm: { password: false } }} />
};

export const WithPresetUsername: Story = {
    render: () => (
        <KcPageStory kcContext={{ login: { username: "max.mustermann@mail.com" } }} />
    )
};

export const WithImmutablePresetUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                auth: {
                    attemptedUsername: "max.mustermann@mail.com",
                    showUsername: true
                },
                usernameHidden: true,
                message: { type: "info", summary: "Please re-authenticate to continue" }
            }}
        />
    )
};

export const WithNoSocialProviders: Story = {
    render: () => <KcPageStory kcContext={withSocialProviders(0)} />
};

export const WithOneSocialProvider: Story = {
    render: () => <KcPageStory kcContext={withSocialProviders(1)} />
};

export const WithTwoSocialProviders: Story = {
    render: () => <KcPageStory kcContext={withSocialProviders(2)} />
};

export const WithMoreThanTwoSocialProviders: Story = {
    render: () => <KcPageStory kcContext={withSocialProviders(4)} />
};

/** Verifies the "Sign in with Passkey" button renders below "Sign in". */
export const WithAuthPassKey: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                url: { loginAction: "/mock-login-action" },
                enableWebAuthnConditionalUI: true
            }}
        />
    )
};

export const InGerman: Story = {
    render: () => <KcPageStory kcContext={{ locale: { currentLanguageTag: "de" } }} />
};
