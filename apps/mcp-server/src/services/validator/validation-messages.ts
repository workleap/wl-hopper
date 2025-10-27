
import { formatMessage } from "../../utils/message-formatter";

const validationMessages = {
    errors: {
        "no-code-provided": "No code provided. Please provide valid TypeScript/JSX code to validate.",
        "no-jsx-found": "No JSX components found in the provided code.",
        "parse-error": "Failed to parse code: {message}",
        "parse-error-identifier": "\n\nPlease ensure the code is valid TypeScript/JSX syntax. Common issues include:\n- Missing semicolons or brackets\n- Invalid JSX syntax\n- Incomplete component declarations",
        "parse-error-eof": "\n\nThe code appears to be incomplete. Please provide the full component code.",
        "parse-error-unknown": "Failed to parse code due to unknown error. Please ensure the code is valid TypeScript/JSX.",

        "emoji-detected": "Emoji '{emoji}' detected at position {position}. Emojis are not allowed in Hopper components. Consider using Hopper's Icon component or text alternatives for better accessibility and consistency.",
        "native-html-not-allowed": "Native HTML element '<{element}>' is not allowed. Use Hopper components instead for better design consistency. For example, consider using semantic components like Card, Box, Stack, Text, or Button, or use the direct Hopper equivalent like Div, Span, etc. If no direct equivalent exists, consider using the 'htmlElement' function. Check the '{guideSection}' guide for more details.",
        "prohibited-prop": "Using '{prop}' prop is **STRONGLY** discouraged. Check the Hopper 'styles' guide for details.",
        "button-two-children-rule": "Button component{instanceInfo} with 2 children must include a Text component when containing text content. Found children: {children} (plus text content)",
        "modal-invalid-children": "Modal component{instanceInfo} can only have Header, Content, and ButtonGroup as direct children. Found invalid children: {invalidChildren}",
        "modal-missing-children": "Modal component{instanceInfo} is missing recommended children: {missingChildren}",

        "layout-single-child-error": "'{componentName}' component has only one child. Layout components MUST not be used with only one child. Consider removing it or replacing it with a more appropriate component.",

        "unsafe-percentage-error": "The prop '{propName}' with percentage value '{value}' should not use the UNSAFE_ prefix. Change it to '{safePropName}=\"{value}\"' instead. Width and height properties accept percentage values directly.",
        "unsafe-prop-prohibited": "The prop '{propName}' is not a valid UNSAFE_ prop, and '{safePropName}' is prohibited in Hopper. Check the Hopper {guideSection}' guide for proper styling alternatives.",
        "unsafe-prop-invalid": "The prop '{propName}' is not a valid UNSAFE_ prop. Use '{safePropName}' directly instead.",
        "unsafe-has-token-equivalent": "The CSS value '{value}' for '{propName}' has equivalent design tokens. Consider using the safe prop '{safePropName}' with one of these token values: {suggestions}{moreText}.",

        "token-format-error": "The token value '{value}' for prop '{propName}' is wrong. Change it to '{formatted}'.",
        "token-not-allowed-unsafe": "The token value '{value}' is not allowed for prop '{propName}'. You have to use the safe prop '{suggestedProp}' directly when tokens are available. Check the Hopper '{guideSection}' guide for details.",
        "token-not-allowed": "The token value '{value}' is not allowed for prop '{propName}'. Only certain props support design tokens. Check the Hopper '{guideSection}' guide for details."

    },
    warnings: {
        "box-discouraged": "Using '<Box>' is STRONGLY discouraged. The '<Box>' component should not be used in place of standard HTML elements. Use '<Div>' or '<Span>' directly for that purpose.",
        "div-flex-warning": "Div component{instanceInfo} with display=\"flex\" should probably be replaced with a more semantic layout component. Consider using <Stack> for vertical layouts, <Inline> for horizontal layouts with wrapping, or <Flex> for custom flex layouts.",
        "div-grid-warning": "Div component{instanceInfo} with display=\"grid\" should probably be replaced with the <Grid> component for better design consistency and built-in grid functionality.",
        "layout-single-child-warning": "'{componentName}' component has only one child. This might be unnecessary — consider merging the '{componentName}' props directly into the child component if possible."
    },

    exceptions: {
        "unsafe-props-load-error": "Failed to load the list of allowed UNSAFE_ props for validation.",
        "tokens-load-error": "Failed to load the list of allowed design tokens for validation.",
        "token-data-load-error": "Failed to load the full token data for validation.",
        "unsafe-props-invalid-format": "Invalid format for unsafe props data."
    }

};

/**
 * Formats a validation message with the given parameters
 * @param key The message key from the validation messages
 * @param params Optional parameters to replace placeholders in the message
 * @returns The formatted message string
 *
 * @example
 * validationMessage("divGridWarning", { instanceInfo: " (instance 1)" })
 * validationMessage("prohibitedProp", { prop: "className" })
 */
export function validationMessage(
    key: keyof typeof validationMessages.errors | keyof typeof validationMessages.warnings | keyof typeof validationMessages.exceptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
): string {
    const template = key in validationMessages.errors
        ? validationMessages.errors[key as keyof typeof validationMessages.errors]
        : key in validationMessages.warnings
            ? validationMessages.warnings[key as keyof typeof validationMessages.warnings]
            : validationMessages.exceptions[key as keyof typeof validationMessages.exceptions];

    // If no parameters needed, return the template as-is
    if (!params || Object.keys(params).length === 0) {
        return template;
    }

    return formatMessage(template, params);
}

// Export for backward compatibility if needed
export { validationMessages };
