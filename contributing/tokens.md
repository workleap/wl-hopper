# Contributing to Hopper tokens <!-- omit in toc -->

- [Token Structure](#token-structure)
- [Adding component tokens](#adding-component-tokens)
- [Adding a new theme](#adding-a-new-theme)
- [Token Naming Conventions](#token-naming-conventions)
- [Building and Testing Tokens](#building-and-testing-tokens)

## Token Structure

Tokens are organized into the following categories in `packages/tokens/src/tokens/`:

- **core/**: Base design tokens that form the foundation (colors, fonts, spacing, shapes, elevations, motions)
- **semantic/**: Theme-specific semantic tokens organized by theme (workleap, sharegate) and color scheme (light, dark)
- **components/**: Component-specific tokens organized by theme and component
- **asset/**: Asset files like fonts

Each token follows the [Design Tokens Community Group format](https://design-tokens.github.io/community-group/format/) with `$type` and `$value` properties.

## Adding Component Tokens

Component tokens allow you to customize the appearance of components per theme. Follow these steps:

1. **Create or locate the component token file**
   - Navigate to `packages/tokens/src/tokens/components/<theme>/`
   - Create a new file named `<component-name>.tokens.json` if it doesn't exist
   - Example: `packages/tokens/src/tokens/components/workleap/button.tokens.json`

2. **Define tokens for your component**
   - Use `comp-` as the prefix followed by the kebab-case component name as the top-level key
   - Define tokens following the pattern: `comp-<component-name>-<property>-<state>`
   - Reference core or semantic tokens using the `{...}` syntax

   ```json
   {
       "comp-button": {
           "background-color": {
               "$type": "color",
               "$value": "{semantic.background.secondary.default}"
           },
           "text-color": {
               "$type": "color",
               "$value": "{semantic.text.default}"
           },
           "border-radius": {
               "$type": "dimension",
               "$value": "{core.shape.rounded.md}"
           }
       }
   }
   ```

3. **Update all theme variants**
   - If you add a token to one theme, you must add it to all other themes
   - Ensure consistency across:
     - `packages/tokens/src/tokens/components/workleap/`
     - `packages/tokens/src/tokens/components/sharegate/`
   - Update both light and dark variants if applicable

4. **Verify your tokens**
   - Run `pnpm build` to generate the token outputs
   - Check the generated token files in the dist folder
   - Ensure no breaking changes are introduced

5. **Commit the theme files generated**
   - Files are generated here: packages\styled-system\src\theme\generated

## Adding a New Theme

To add a new theme to Hopper, follow these steps:

1. **Create theme folders**
   - Create a new folder in `packages/tokens/src/tokens/semantic/` with your theme name
   - Create a new folder in `packages/tokens/src/tokens/components/` with your theme name
   - Example: `semantic/my-theme/` and `components/my-theme/`

2. **Copy existing theme structure**
   - Copy an existing theme (e.g., workleap) as a base for your new theme
   - Copy the light/ and dark/ folders to your new theme folder
   - This ensures you have all required token categories

3. **Customize token values**
   - Update color, typography, spacing, and elevation tokens to match your theme
   - Keep the token structure and names consistent with other themes
   - Update both light and dark variants as needed

4. **Register the theme in the configuration**
   - Update `packages/tokens/src/style-dictionary/constant.ts` to include your new theme
   - Add your theme to the theme list and define its color schemes

5. **Update Storybook modes (official themes only)**
   - If this is an official theme, update `tooling/storybook-addon/modes.ts` to add your theme as a selectable mode
   - This allows theme testing in Storybook

6. **Update documentation (official themes only)**
   - If this is an official theme, update the theme picker in the Hopper documentation
   - Add your theme to the available theme options for users

7. **Test your theme**
   - Run `pnpm build` to generate tokens
   - Verify all color contrasts meet WCAG accessibility standards
   - Test components with the new theme in Storybook

8. **Commit the theme files generated**
   - Files are generated here: packages\styled-system\src\theme\generated
