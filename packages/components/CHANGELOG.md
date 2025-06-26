# @hopper-ui/components

## 1.11.4

### Patch Changes

- 6c88d24: Rename isDismissible to isDismissable to follow RAC
- Updated dependencies [7d6fe28]
  - @hopper-ui/icons@2.10.0

## 1.11.3

### Patch Changes

- 680969e: MenuTrigger and MenuItem now expose a shouldCloseOnSelect property

## 1.11.2

### Patch Changes

- 121b4c2: Updated the Modal component to warn when onOpenChange is used in a context where it will not work
- 327deaf: Export the mergeProps function

## 1.11.1

### Patch Changes

- 6cd6be7: Multiple changes in the effort to have better Orbiter parity

  - Adds isReadOnly to TagGroup component
  - Adjust Tab padding to follow Design
  - Adjust Heading weight for Popovers
  - Increase the Tooltip offset
  - Exports VisuallyHidden from react-aria

## 1.11.0

### Minor Changes

- ee8fad1: The hopper provider no longer sets default fonts. This caused too many chromatic issues in applications

## 1.10.1

### Patch Changes

- 0e1d9c9: Fix styling of Tabs to match design

## 1.10.0

### Minor Changes

- b07292e: Add Illustration component

## 1.9.1

### Patch Changes

- 5e3f6b0: Adds `onPress` prop to Avatar components

## 1.9.0

### Minor Changes

- c922d10: Adds XS size to buttons

  Adds an XS size variant to the Button, LinkButton, and ToggleButton components

## 1.8.2

### Patch Changes

- b37602a: Fixes badge dot display with zero value

## 1.8.1

### Patch Changes

- 764351d: Add variants for ToggleButton

## 1.8.0

### Minor Changes

- 2dc673d: Add ToggleButton component

## 1.7.0

### Minor Changes

- b9b528d: Add ContextualHelp component

### Patch Changes

- 44db1b9: Fixed an issue in the Modal component where header and footer buttons were fighting for space, leading to overflow or early line-breaks

## 1.6.1

### Patch Changes

- bb8809e: Fix margins and paddings for Menu

## 1.6.0

### Minor Changes

- 3a71b78: Add Menu component

## 1.5.16

### Patch Changes

- f24923f: Fix Tags outside of TagGroups to better support being links

## 1.5.15

### Patch Changes

- 054ae18: Created a Paragraph Component

## 1.5.14

### Patch Changes

- 4f84364: Revert the "All root elements now properly set their base typography" PR. Modal/Popover/Tooltips now sets their fonts properly themselves
  - @hopper-ui/icons@2.9.2

## 1.5.13

### Patch Changes

- 1fb4187: Add AvatarGroup component

## 1.5.12

### Patch Changes

- 6caa19d: Add Tooltip component
- a87f044: Adds pending state to Button and Alert

## 1.5.11

### Patch Changes

- 9f32d29: Fixed Callout to support LinkButton in addition to buttons

## 1.5.10

### Patch Changes

- 153b62c: Add the Alert component

## 1.5.9

### Patch Changes

- 248cbeb: Revert changes to the Heading

## 1.5.8

### Patch Changes

- 11ab82c: Add negative margins to Heading to make it appear more centered

## 1.5.7

### Patch Changes

- 0233be7: Now exporting the Broken Avatar

## 1.5.6

### Patch Changes

- 7f6a762: Add default color on heading

## 1.5.5

### Patch Changes

- b56f903: All root elements now properly set their base typography
- 75e3148: Fix Text styling for Content in a Callout, Modal and Popover
  - @hopper-ui/icons@2.9.2

## 1.5.4

### Patch Changes

- 57a58ce: Multiple fixes:
  - Avatar: The Avatar initials are no longer affected by the Avatar parent style
  - The vertical divider now properly takes the height needed without additional parameters
  - Callout with no headers no longer have extra margin

## 1.5.3

### Patch Changes

- bec4e44: Multiple fixes

  #### Hopper Provider

  - Typography is now properly set by default.

  #### Compact Callout

  - Ensures a minimum height of `48px`.
  - Removes unnecessary margin when only content is provided.
  - Applies `sm` typography to the content.

  #### Link

  - Typography props like `fontWeight` can now be properly customized directly on the `Link` element.

  #### Modal

  - Heading size is now `lg` by default.

## 1.5.2

### Patch Changes

- b497871: Fixed an issue where the Image component was logging a warning when the `alt` prop was provided, but empty.
- b497871: Fixed an issue where the zIndex should of been forwarded

## 1.5.1

### Patch Changes

- 15a1635: Add Tabs component

## 1.5.0

### Minor Changes

- d58d856: Tags can now be used without being in a TagsGroup

## 1.4.13

### Patch Changes

- 911767d: We are now exporting a PopoverBase component, which is just a styled RAC Popover
- Updated dependencies [911767d]
  - @hopper-ui/icons@2.9.2

## 1.4.12

### Patch Changes

- 2864ac4: Expose ToggleArrow in @hopper-ui/components

## 1.4.11

### Patch Changes

- e3a7288: Fixed an issue where locale wasn't properly forwarded in modales and popover

## 1.4.10

### Patch Changes

- cf7cefa: Add StyledComponentProps to Input

## 1.4.9

### Patch Changes

- e82cd6d: Add Modal and CustomModal component
- d946d4f: Export filterDOMProps and useId from @react-aria/utils to be usable

## 1.4.8

### Patch Changes

- 05270c0: Add Tile & TileGroup component
- 7fcad74: - Removed `inputClassName` and `inputType` properties from InputGroups
  - The TextField should not show the clear button when it's readonly
  - Simplified how the click in the input group focuses the input instead
  - Created an Input component that centralize input styles
  - Removed the `mobile` variant from the NumberInput, as it was untested and broken
  - ComboBox now reuses our input styles, instead of duplicating the styles

## 1.4.7

### Patch Changes

- f01af74: Added the Callout component
  - @hopper-ui/icons@2.9.1

## 1.4.6

### Patch Changes

- c77249e: Add standalone variant to Link

## 1.4.5

### Patch Changes

- 34bcb9c: Added SegmentedControl component
- 5dcad8d: Resolved issues with Listbox loading indicator colors to ensure proper visibility and consistency in dark mode.

## 1.4.4

### Patch Changes

- 2bcc8fd: Update links to documentation in the JSDoc
- 1e16c37: Added the Accordion component.

## 1.4.3

### Patch Changes

- 483bd1a: - **Improvement:** Simplified the `inputRef` type to enhance usability across multiple components.
  - **Bug Fixes:**
    - Resolved an issue preventing the addition of a custom `renderEmptyState` on a `Listbox` within a `ComboBox`.
    - Fixed a console error that occurred when using custom values inside the `Select` component.
    - Addressed a console error that appeared with custom popovers.

## 1.4.2

### Patch Changes

- 16ca6cc: Add isExternal prop to LinkButton to simplify opening a LinkButton to an external tab

## 1.4.1

### Patch Changes

- 0448ab1: Updated peer dependency versions range
- Updated dependencies [0448ab1]
  - @hopper-ui/icons@2.9.1

## 1.4.0

### Minor Changes

- 2506f03: Added support to React 19

### Patch Changes

- Updated dependencies [2506f03]
  - @hopper-ui/icons@2.9.0

## 1.3.35

### Patch Changes

- 865ddbe: There is no longer a generic Section component. We now have ListBoxSection, SelectSection and ComboBoxSection.

## 1.3.34

### Patch Changes

- 8abd4a4: Created the Disclosure component with its sub components: DisclosureHeader and DisclosurePanel.

## 1.3.33

### Patch Changes

- b234672: Updated TagGroup's API. Removed TagList since it's now used internally. Added label, description and errorMessage props instead of being used as slots.

## 1.3.32

### Patch Changes

- b14b0e4: Added Card component

## 1.3.31

### Patch Changes

- 4eacf7b: Added a `description` prop to SwitchField and removed the description slot.

## 1.3.30

### Patch Changes

- 190a71f: Moved otherProps last to let the end user override props if needed

## 1.3.29

### Patch Changes

- c1e98fb: PasswordField and NumberField no longer accept `children`. `Label`, `description` and `errorMessage` are now props.

## 1.3.28

### Patch Changes

- e2a266e: TextArea and SearchField no longer accept `children`. `Label`, `description` and `errorMessage` are now props.

## 1.3.27

### Patch Changes

- 6551037: TextField no longer accepts children. `Label`, `description` and `errorMessage` are now props.

## 1.3.26

### Patch Changes

- 667db64: - Added label, description and errorMessage props instead of having them as slots for the Select and ComboBox components.
  - Removed SelectOptions/ComboBoxOptions since they are no longer needed.
  - Renamed SelectOption/ComboBoxOption to SelectItem/ComboBoxItem.

## 1.3.25

### Patch Changes

- bd8b972: Instead of having slots for Label, HelperMessage and ErrorMessage, we removed them in favor of props: label, description and errorMessage. CheckboxList and RadioList are no longer needed and have been removed due to this change.

## 1.3.24

### Patch Changes

- d098c47: Updated all dependencies.
- 448b6e4: CheckboxField and RadioField will now have a description prop as opposed to a description slot.
- Updated dependencies [d098c47]
  - @hopper-ui/icons@2.8.4

## 1.3.23

### Patch Changes

- c603aff: Badge used to change appearance based on the states of its parent, but now Badge will remain the same when its parent's state changes.

## 1.3.22

### Patch Changes

- d329436: In the Badge component, we were using data-variant to be able to add styles in other components based on its variant. Now that we have className render props, we can switch back to using a class for Badge's variant prop.

## 1.3.21

### Patch Changes

- dbb0b74: Updated react aria versions and hopper styled-system version.
- dbb0b74: We've separated the Button component into two distinct components: Button and LinkButton. This change clarifies their purposes and simplifies their usage. The Button component now focuses solely on traditional button functionality, without any link-related features.

  Meanwhile, the new LinkButton component is specifically designed for link-based interactions, visually styled like a button but meant for navigation. Unlike Button, LinkButton does not support loading states (isLoading), as its primary role is to facilitate navigation rather than trigger actions that require loading feedback.

- Updated dependencies [dbb0b74]
  - @hopper-ui/icons@2.8.3

## 1.3.20

### Patch Changes

- 1ec20fc: - To ease the transition from Orbiter to Hopper, we want to be able to replace the Lozenge component from Orbiter with the one from Hopper. We have mapped Lozenge variants to their corresponding Badge variants for temporary compatibility.
  - Also moved the temporary mapping functions to utils files for maintainability and readability.

## 1.3.19

### Patch Changes

- edc8551: Handle Orbiter variants in Hopper for Tag

## 1.3.18

### Patch Changes

- 37cd226: Removed extra padding around select and combo box popovers so that the scrollbar would be all the way to the right.

## 1.3.17

### Patch Changes

- 7eaf804: Updated the Select and ComboBox syntax to use Select/ComboBox and SelectOptions/ComboBoxOptions

## 1.3.16

### Patch Changes

- 82d23a2: Updated Button css to remove unwanted gaps when icons are not there.
- ebe9268: Fixed buttonGroup default alignments

## 1.3.15

### Patch Changes

- c258cc1: Made react aria types as well as internal types available to the users.
- Updated dependencies [c258cc1]
  - @hopper-ui/icons@2.8.2

## 1.3.14

### Patch Changes

- c490240: Updated primary badge selected color

## 1.3.13

### Patch Changes

- 5537941: Added props to customize their DOM elements

## 1.3.12

### Patch Changes

- 0cf5bc0: Removed option to support size in remainingCharacterCount
- 4636333: Update avatar's fallback logic. The avatar image is now loaded if the src changes from undefined to a functional src.

## 1.3.11

### Patch Changes

- 578eccf: Added the slot function to add support to be able to use Hopper components inside Orbiter.
- Updated dependencies [578eccf]
  - @hopper-ui/icons@2.8.1

## 1.3.10

### Patch Changes

- 9f9c735: Updated the necessityIndicator logic for Label and added it to all the fields.

## 1.3.9

### Patch Changes

- 396605b: Added the ComboBox single select component.

## 1.3.8

### Patch Changes

- 7f8b609: Adjusted text-neutral-weakest color
  - @hopper-ui/icons@2.8.0

## 1.3.7

### Patch Changes

- 1e29a8e: Removed support for dividers in Listbox as this is not accessible

## 1.3.6

### Patch Changes

- aad6ff0: Accessibility fix
- 9daeca0: Simplify import of CSS

## 1.3.5

### Patch Changes

- 2a87664: Added DecorativeCheckbox and DecorativeRadio to be used as visual checkboxes and radio buttons inside other interactive components.
- 9d2abdd: Remove placeholder from NumberField

## 1.3.4

### Patch Changes

- 8ca74b4: Fixed an accesibility issue with input char count contrast
  - @hopper-ui/icons@2.8.0

## 1.3.3

### Patch Changes

- 46406ef: Added isSquare for EmbeddButton & Used it in InputGroup.

## 1.3.2

### Patch Changes

- d1f29f2: Added character count overflow option to TextField.

## 1.3.1

### Patch Changes

- 2e845a1: Added FloatingBadge component.

## 1.3.0

### Minor Changes

- e503a1f: Added the select component and made fixes to other components.

## 1.2.1

### Patch Changes

- Updated dependencies [8ddaae0]
  - @hopper-ui/icons@2.8.0

## 1.2.0

### Minor Changes

- 58de004: Added an avatar slot to ListBox and Tag components.

### Patch Changes

- Updated dependencies [58de004]
  - @hopper-ui/icons@2.7.0

## 1.1.0

### Minor Changes

- 63d9572: Added the TextArea component.

## 1.0.13

### Patch Changes

- 6c2e4bb: Adjusted the ghost secondary text/icon color

## 1.0.12

### Patch Changes

- Updated dependencies [90401be]
  - @hopper-ui/icons@2.6.2

## 1.0.11

### Patch Changes

- 4c517c1: update @hopper-ui/styled-system package
- Updated dependencies [4c517c1]
  - @hopper-ui/icons@2.6.1

## 1.0.10

### Patch Changes

- Updated dependencies [cdb7b7c]
  - @hopper-ui/icons@2.6.0

## 1.0.9

### Patch Changes

- Updated dependencies [584339c]
  - @hopper-ui/icons@2.5.0

## 1.0.8

### Patch Changes

- 6e4307e: Added exports to the package.json for the css file like we have in the icons package.

## 1.0.7

### Patch Changes

- ab07424: build the `index.ts` file so that the package is correctly resolved

## 1.0.6

### Patch Changes

- 9cf3058: pre-release of the components

## 1.0.5

### Patch Changes

- Updated dependencies [339c517]
  - @hopper-ui/icons@2.4.0

## 1.0.4

### Patch Changes

- Updated dependencies [1dc67e4]
  - @hopper-ui/icons@2.3.0

## 1.0.3

### Patch Changes

- Updated dependencies [e94a3e0]
  - @hopper-ui/icons@2.2.0

## 1.0.2

### Patch Changes

- Updated dependencies [a92e653]
  - @hopper-ui/icons@2.1.1

## 1.0.1

### Patch Changes

- Updated dependencies [75db68e]
  - @hopper-ui/icons@2.1.0

## 1.0.0

### Major Changes

- c5c6b30: ## @hopper-ui/tokens

  **Added**

  | Token                                 |
  | ------------------------------------- |
  | danger-text-selected                  |
  | danger-border-selected                |
  | danger-icon-selected                  |
  | danger-icon-weak-hover                |
  | danger-icon-weak-press                |
  | danger-surface-selected               |
  | danger-surface-weak-hover             |
  | danger-surface-weak-press             |
  | danger-text-weak-hover                |
  | danger-text-weak-press                |
  | decorative-option5-surface-weak-hover |
  | neutral-surface-weak-selected         |
  | neutral-surface-weakest-selected      |
  | neutral-border-selected               |
  | neutral-icon-selected                 |
  | neutral-icon-strong-hover             |
  | neutral-icon-weak-press               |
  | neutral-surface-selected              |
  | neutral-text-weak-hover               |
  | neutral-text-weak-press               |
  | primary-border-selected               |
  | primary-icon-selected                 |
  | primary-surface-selected              |
  | primary-surface-strong-selected       |
  | primary-surface-weak-hover            |
  | primary-surface-weak-press            |
  | primary-text-selected                 |
  | upsell-border-selected                |
  | upsell-icon-selected                  |
  | upsell-icon-hover                     |
  | upsell-icon-weak-hover                |
  | upsell-icon-weak-press                |
  | upsell-surface-selected               |
  | upsell-surface-weak-hover             |
  | upsell-surface-weak-press             |
  | upsell-text-selected                  |
  | upsell-text-weak                      |
  | upsell-text-weak-hover                |
  | upsell-text-weak-press                |

  **Renamed**

  Use this as a reference to fix all breaking changes.

  | Old Token name                | New Token name               |
  | ----------------------------- | ---------------------------- |
  | danger-border-active          | danger-border-press          |
  | danger-icon-active            | danger-icon-press            |
  | danger-text-active            | danger-text-press            |
  | danger-surface-active         | danger-surface-press         |
  | neutral-border-active         | neutral-border-press         |
  | neutral-icon-active           | neutral-icon-press           |
  | neutral-surface-active        | neutral-surface-press        |
  | neutral-surface-weak-active   | neutral-surface-weak-press   |
  | neutral-text-active           | neutral-text-press           |
  | primary-border-active         | primary-border-press         |
  | primary-icon-active           | primary-icon-press           |
  | primary-surface-active        | primary-surface-press        |
  | primary-text-active           | primary-text-press           |
  | primary-surface-strong-active | primary-surface-strong-press |
  | upsell-border-active          | upsell-border-press          |
  | upsell-icon-active            | upsell-icon-press            |
  | upsell-surface-active         | upsell-surface-press         |
  | upsell-text-active            | upsell-text-press            |

  **Updated**

  | Token                        |
  | ---------------------------- |
  | danger-surface-hover         |
  | danger-surface-strong        |
  | danger-surface-strong-hover  |
  | danger-text-weak             |
  | status-progress-text         |
  | status-progress-icon         |
  | primary-surface-strong-hover |
  | primary-text                 |
  | primary-surface-hover        |
  | upsell-surface-hover         |
  | upsell-surface-weak          |
  | upsell-text                  |
  | upsell-icon                  |
  | upsell-text-hover            |

  ## @hopper-ui/components

  - Added a press state to Links
  - Added a press state to Buttons
  - Added a press state to Checkbbox
  - Added a press state to Switch
  - Added a press state to Radio
  - Added numerous tests to test Pressed States of components

### Patch Changes

- Updated dependencies [73037f3]
- Updated dependencies [c5c6b30]
  - @hopper-ui/icons@2.0.0
  - @hopper-ui/styled-system@2.0.0

## 0.1.1

### Patch Changes

- Updated dependencies [bdc3e10]
  - @hopper-ui/icons@1.6.0

## 0.1.0

### Minor Changes

- 93a1a16: Added Button, Grid, Inline, Flex, Stack, Label, Text, IconList, Spinner and localization

### Patch Changes

- Updated dependencies [93a1a16]
  - @hopper-ui/icons@1.5.0

## 0.0.11

### Patch Changes

- Updated dependencies [aa5d10b]
  - @hopper-ui/styled-system@0.3.0

## 0.0.10

### Patch Changes

- Updated dependencies [2f18e75]
  - @hopper-ui/styled-system@0.2.8

## 0.0.9

### Patch Changes

- Updated dependencies [7717443]
  - @hopper-ui/styled-system@0.2.7

## 0.0.8

### Patch Changes

- 2639596: Updated some dependencies + move some to peer dependency.
  Fixed a warning that was being thrown in the console regarding SSR.
- Updated dependencies [2639596]
  - @hopper-ui/styled-system@0.2.6

## 0.0.7

### Patch Changes

- Updated dependencies [f5729c5]
  - @hopper-ui/styled-system@0.2.5

## 0.0.6

### Patch Changes

- Updated dependencies [20515b9]
  - @hopper-ui/styled-system@0.2.4

## 0.0.5

### Patch Changes

- 7f259c1: Changed build target to target ES2019
- Updated dependencies [7f259c1]
- Updated dependencies [eb5de30]
  - @hopper-ui/styled-system@0.2.3

## 0.0.4

### Patch Changes

- f40a266: Optimized the build output
- Updated dependencies [f40a266]
  - @hopper-ui/styled-system@0.2.2

## 0.0.3

### Patch Changes

- Updated dependencies [a31b7e2]
  - @hopper-ui/styled-system@0.2.1

## 0.0.2

### Patch Changes

- Updated dependencies [0c4a1c7]
  - @hopper-ui/styled-system@0.2.0

## 0.0.1

### Patch Changes

- Updated dependencies [7ef9681]
  - @hopper-ui/styled-system@0.1.0
