// @ts-check

const HopperCSSVarRegex = /^hop-([A-Z][A-z0-9]+)(-[a-z0-9]+)*$/;
const NormalKebabCaseRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// we can't enforce that someone doesn't do --hop-button instead of --hop-Button, because it's too hard to know what is
// a component and what is a token, such as --hop-primary-color. So we'll just allow any kebab-case variable name.
const AllowedCSSVarsRegex = new RegExp(`^(${HopperCSSVarRegex.source}|${NormalKebabCaseRegex.source})$`);

/** @type {import('stylelint').Config} */
const config = {
    extends: "@workleap/stylelint-configs",
    overrides: [
        {
            files: ["./packages/**/*.css"],
            plugins: ["stylelint-use-logical"],
            extends: [
                "stylelint-config-clean-order" // This is a plugin that enforces a consistent order of CSS properties
            ],
            rules: {
                "prettier/prettier": null,
                "order/properties-order": null, // Disable property order enforcement from prettier-config, we use clean-order instead
                // We want to enforce the use of logical properties
                "csstools/use-logical": true,
                "media-feature-range-notation": "prefix",
                "selector-class-pattern": [
                    /** Selector that ensures our classNames have the pattern hop-ComponentName__element-name--modifier-name */
                    "^hop-([A-Z][A-z0-9]+)([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$",
                    {
                        resolveNestedSelectors: true,
                        message: selectorValue => `Expected class selector "${selectorValue}" to match our CSS pattern https://github.com/workleap/wl-hopper/blob/main/CONTRIBUTING.md#css-selector-naming-conventions. Selector validation tool: https://regexr.com/7tftf`
                    }
                ],
                "custom-property-pattern": [
                    AllowedCSSVarsRegex.source,
                    {
                        "message": "Expected css variables to be kebab-case or hop-ComponentName-kebab-case"
                    }
                ],
                "property-no-unknown": [
                    true,
                    {
                        ignoreProperties: ["/composes/"]
                    }
                ],
                "value-keyword-case": [
                    "lower",
                    {
                        ignoreKeywords: ["/^hop-.*$/"]
                    }
                ]
            }
        }
    ]
};

export default config;
