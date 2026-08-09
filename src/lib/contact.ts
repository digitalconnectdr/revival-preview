export type ContactFormMode = "disabled" | "api" | "external";

const configuredMode = process.env.CONTACT_FORM_MODE;

export const contactFormMode: ContactFormMode = configuredMode === "api" || configuredMode === "external" ? configuredMode : "disabled";
export const contactFormEnabled = contactFormMode !== "disabled";
