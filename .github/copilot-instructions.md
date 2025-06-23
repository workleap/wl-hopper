# Hopper Design System - GitHub Copilot Guidelines

## Use the token system

Title: Use the token system

Description: Use CSS variables from the token system for all values (colors, spacing, etc.). Don't hardcode values that should come from the token system. This ensures consistency and supports theming.

Path patterns: packages/components/src/**/*.module.css

## Don't set style properties in context objects

Title: Don't set style properties in context objects

Description: Do not set style properties like `fontWeight`, `color`, or other visual attributes directly in context objects.
These properties should be defined in CSS modules instead. For example, instead of `[HeadingContext, { fontWeight: "heading-xs-medium" }]`, define the font weight in the CSS module and only use `className` in the context object.

Path patterns: packages/components/src/**/*.tsx

