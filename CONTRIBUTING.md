# Contributing <!-- omit in toc -->

The following documentation is only for the maintainers of this repository.

- [Monorepo setup](#monorepo-setup)
- [Installation](#installation)
- [Commands](#commands)
  - [storybook](#storybook)
  - [test](#test)
  - [lint](#lint)
- [Adding a new icon](#adding-a-new-icon)
- [Updating or removing an icon](#updating-or-removing-an-icon)
- [Developing a new component](#developing-a-new-component)
- [CSS Conventions](#css-conventions)
  - [CSS Selector naming conventions](#css-selector-naming-conventions)
  - [CSS Variables](#css-variables)
- [Testing accessibility with axe via Storybook](#testing-accessibility-with-axe-via-storybook)
- [Localization and Internationalization](#localization-and-internationalization)
- [Exporting a component](#exporting-a-component)
  - [Problem example](#problem-example)
  - [Recommended approach](#recommended-approach)

## Monorepo setup

This repository is managed as a monorepo with [PNPM workspace](https://pnpm.io/workspaces) to handle the installation of the npm dependencies and manage the packages interdependencies.

It's important to note that PNPM workspace doesn't hoist the npm dependencies at the root of the workspace as most package manager does. Instead, it uses an advanced [symlinked node_modules structure](https://pnpm.io/symlinked-node-modules-structure). This means that you'll find a `node_modules` directory inside the packages folders as well as at the root of the repository.

The main difference to account for is that the `devDependencies` must now be installed locally in every package `package.json` file rather than in the root `package.json` file.

### Turborepo <!-- omit in toc -->

This repository use [Turborepo](https://turbo.build/repo/docs) to execute it's commands. Turborepo help saving time with it's built-in cache but also ensure the packages topological order is respected when executing commands.

To be understand the relationships between the commands, have a look at this repository [turbo.json](./turbo.json) configuration file.

## Installation

This project uses PNPM, therefore, you must install [PNPM](https://pnpm.io/installation) v9+ first:

```bash
npm install -g pnpm
```

To install the dependencies of this repository, open a terminal at the root of the workspace and execute the following commands:

```bash
pnpm i
```

You must then run the following command to run the following command to build all the packages:

```bash
pnpm build:pkg
```

Then, use any of the available [commands](#commands) to start developing.

## Commands

### storybook 

You can then run storybook to see the components in action:

```bash
pnpm storybook
```

### test

Run the unit tests.

```bash
pnpm test
```

### lint

Lint the files.

```bash
pnpm lint
```

## Adding a new icon

1. Add SVGs to Size-Specific and Metadata Folders
- Get the three versions (16px, 24px, 32px) of the SVG icon you want to add. Having 3 versions of the icon is mandatory.
- Place each version in the following folders:
  - `packages/svg-icons/src/icons/16px`
  - `packages/svg-icons/src/icons/24px`
  - `packages/svg-icons/src/icons/32px`
- For each icon, create a JSON metadata file `<YourIconName>.json` in the metadata directory - `packages/svg-icons/src/icons/metadata`. Having a metadata of the icon is mandatory. This is the following structure:
 
```
{
  "name": "YourIconName",
  "description": "Concise description of what the icon represents",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

2. Test the source SVGs
- Run the following command to test the source SVGs:
```sh
pnpm test
```
- If one or more of the source SVGs fail the test, you will need to fix the SVGs before proceeding to the next step.

3. Optimization and Generation of icons
- To generate optimized SVGs and React components, run the following command:

```sh
pnpm generate-icons
```

- This command will optimize the SVGs and create React components in the respective folders.
- Commit the changes to the repository.

4. Run Changeset Command

- After manually generating the icons, you will need to create two changesets for the new icons:
  - One for the `@hopper-ui/svg-icons` package
  - One for the `@hopper-ui/icons` package

You can do this by running the following command twice:
```sh
pnpm changeset
```

- Follow the prompts to describe the changes made and choose the appropriate version bump. Choose `patch` for minor changes, `minor` for new features, and `major` for breaking changes.

You can follow the template for the changeset to ensure that you provide the correct information for the release. The templates are located in the `.changeset-templates` folder.
1- For the icons release, you can follow [this template](.changeset-templates\icons-release.md)
2- For the svg-icons release, you can follow [this template](.changeset-templates\svg-icons-release.md)

## Updating or removing an icon

- Updating or removing an icon is similar to adding a new icon. The only difference is that you will need to delete or replace the SVGs from the following folders:
  - `packages/svg-icons/src/icons/16px`
  - `packages/svg-icons/src/icons/24px`
  - `packages/svg-icons/src/icons/32px`

- You will also need to delete or update the metadata of the icon in `packages/svg-icons/src/icons/metadata`.

- Steps 2-5 are the same as adding a new icon.

## Developing a new component

- [ ] Every component should have a GlobalCssSelector that is unique to the component. This allows the targetting of the component in the global CSS file.
```
export const GlobalIconCssSelector = "hop-Icon";
```

- [ ] Every component should make sure to merge their props and ref with the context props and ref.
```
// with a default slot:
[props, ref] = useContextProps({ ...props, slot: props.slot || DefaultIconListSlot }, ref, IconListContext);

// without a default slot
[props, ref] = useContextProps(props, ref, IconListContext);
```
- [ ] Every component should then remove the styling props from the props object and then add the other ones to the ownProps obj.
```
const { stylingProps, ...ownProps } = useStyledSystem(props);
```

- [ ] You can now deconstruct the ownProps object to get the props you need.
```
const { children, style, className, slot, ...otherProps } = ownProps;
```

- [ ] make sure to merge the classnames and styles from the props with the classnames and styles from the style system.
Make sure that the style from the props have higher priority than the style from the style system.
```
    const classNames = clsx(
        className,
        GlobalIconCssSelector,
        cssModule(
            styles,
            "hop-icon"
        ),
        stylingProps.className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };
```

## CSS Conventions

### CSS Selector naming conventions
**Namespace (hop-):** Acts as a unique prefix to avoid conflicts with other libraries or stylesheets and to make it clear that this class belongs to the Hopper design system.
**Component Name (Button):** Directly reflects the React component name, making it straightforward to associate styles with their respective components.
**BEM-like Structure:** Adopting BEM’s methodology for elements and modifiers but with your specific prefixing and naming strategy.

```
.namespace-ComponentName--modifier-name
.namespace-ComponentName__descendent-name
.namespace-ComponentName__descendent-name--modifier-name
```

### CSS Variables
**Namespace (hop-):** Acts as a unique prefix to avoid conflicts with other libraries or stylesheets and to make it clear that this class belongs to the Hopper design system.
**Component Name (Button):** Directly reflects the React component name, making it straightforward to associate styles with their respective components.
**Property Name (color):** Reflects the property being defined, making it clear what the variable is for.

```
namespace-ComponentName--modifier-name
namespace-ComponentName__descendent-name
namespace-ComponentName__descendent-name--modifier-name
```

## Testing accessibility with axe via Storybook

The test runner is only available locally, and it is not available in the CI/CD pipeline.

1- Open a first terminal, and run `pnpm storybook-nolazy`
2- Open a second terminal, and run `pnpm test-storybook`

**Note:** We need to run `storybook-nolazy` because the axe test runner is not compatible with the lazy loading of the stories.


## Localization and Internationalization

Translation files for English (en-US.json) and Canadian French (fr-CA.json) are available in the packages/i18n/src/intl folder. These files follow the [ICU Message Format standard](https://formatjs.io/docs/core-concepts/icu-syntax).

To implement formatting in your components, use the useLocalizedString hook to access the formatter. Then, call the .format method to apply formatting to your strings.

```js
const stringFormatter = useLocalizedString();

stringFormatter.format("key") // Use for simple string translations
stringFormatter.format("key", { value }) // Use when additional formatting is needed
```

This setup allows for seamless integration of localized content and formatting within your components.

We store all the string in a single file for now, which is not great for tree-shaking, but at the moment we expect
only a few strings to be used in the library. If we see that the bundle size is too big, we can split the strings
into a file per component.


## Exporting a component

> [!IMPORTANT]
> Avoid exporting multiple components in a single export statement for a single component file.

Doing so can cause issues with tools like `react-docgen-typescript`, which may incorrectly parse and assign props from one component to another, leading to inaccurate documentation.

Issue: When exporting multiple items in a single export statement for a component file, react-docgen-typescript can misinterpret the file structure. This often results in props from one component being incorrectly associated with another, creating confusion in the generated documentation.

### Problem example

Here’s an example of an incorrect approach:
```tsx
// File: ComboBox.tsx

// ❌ Incorrect Export
// This results in `react-docgen-typescript` associating the props of `ListBoxItem` with `ComboBox` in the documentation.
export { _ComboBox as ComboBox, ListBoxItem as ComboBoxItem };
```

### Recommended approach

To ensure proper parsing and accurate documentation, separate your exports:
```tsx
// File: ComboBox.tsx

// ✅ Correct Export
// Explicitly assign and export components individually to avoid parsing issues.
export const ComboBoxItem = ListBoxItem;
export const ComboBoxSection = ListBoxSection;

// Export the main component separately
export { _ComboBox as ComboBox };
```
