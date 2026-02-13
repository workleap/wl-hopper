# @hopper-ui/tokens

## 5.1.4

### Patch Changes

- 64874a1: Add Mark, Label component tokens and tactility shadows for themeable branding:
  - Add `comp-mark` tokens for background, border, check icon colors across all states (default, hover, press, focus, selected, disabled, error)
  - Add `comp-checkbox` and `comp-radio` tokens for border radius and box shadow overrides
  - Add `comp-label` tokens for text and icon colors across all states (default, hover, press, selected, disabled, focus, error)
  - Migrate Checkbox and Radio CSS from hardcoded semantic values to `--hop-comp-mark-*` and `--hop-comp-label-*` tokens
  - Rename `inset-bevel` shadow to `tactility-button` and add `tactility-card` and `tactility-control` shadow tokens

## 5.1.3

### Patch Changes

- 092c1a7: Add Card, Select, and Combobox component tokens for themeable branding:
  - Add `comp-card` tokens for border radius, background color, border color, and box shadow across both variants (main, second-level)
  - Migrate Card CSS from hardcoded semantic values to `--hop-comp-card-*` tokens
  - Add `comp-select` tokens for active and hover states (background, border, text colors)
  - Migrate Select and ComboBox CSS from hardcoded semantic values to `--hop-comp-select-*` and `--hop-comp-input-*` tokens.

## 5.1.2

### Patch Changes

- 8dc9376: Add Input component tokens for themeable branding:
  - Add `-comp-field` tokens for background, border, text, icon, placeholder, and prefill colors across all states (default, hover, focus, disabled, error)
  - Migrate Input, InputGroup, TextArea, TextField, SearchField, NumberField, and RemainingCharacterCount CSS from hardcoded semantic values to `--hop-comp-field-*` tokens.

## 5.1.1

### Patch Changes

- d55064b: Add Button component tokens for themeable branding:
  - Add `comp-button` tokens for all variants: primary, secondary, upsell, danger, ghost-primary, ghost-secondary, ghost-danger, and disabled states
  - Migrate Button and ToggleButton CSS from hardcoded semantic values to `--hop-comp-button-*` tokens.

## 5.1.0

### Minor Changes

- e4f524a: Add ShareGate tokens and core token updates:
  - Add new core color palettes: `persimmon`, `iris`, `limeburst`
  - Update `rock` color palette values
  - Add `inset-bevel` elevation token
  - Add `rounded-2-5` (12px) border radius
  - Update ShareGate semantic tokens: primary uses `iris`, upsell uses `limeburst`
  - Add `primary.surface-weak-selected` token to Workleap and ShareGate themes
  - Fix minor Workleap primary token values

## 5.0.0

### Major Changes

- cd95303: This update introduces a theming system in Hopper, allowing applications to customize the appearance of Hopper components to match different brands.
  Workleap application's will need to import a new CSS file for the `workleap` theme to ensure proper styling, but no changes are expected to the visual appearance.
  A Sharegate theme as been introduced, but will be updated in future updates, for now it's mostly identical to the `workleap` theme.

  BREAKING
  - The tokens files needs to be imported from the proper theme now.
  - Before : `@hopper-ui/tokens/tokens.css` and `@hopper-ui/tokens/dark/tokens.css`
  - Now : `@hopper-ui/tokens/workleap/tokens.css` and `@hopper-ui/tokens/workleap/dark/tokens.css`
  - The `withCssVariable` property is no longer available on the `HopperProvider`. You need to manually import the tokens now.

## 4.4.7

### Patch Changes

- 48988fb: Bump and standardize dependencies

## 4.4.6

### Patch Changes

- 3297b20: Update dependencies

## 4.4.5

### Patch Changes

- 39d9c13: Update all dependencies

## 4.4.4

### Patch Changes

- | 37a2b22:                     | Token                   | Category    | New Value |
  | ---------------------------- | ----------------------- | ----------- | --------- |
  | --hop-danger-border-press    | Semantic dark - colors  | amanita-400 |
  | --hop-danger-icon-selected   | Semantic dark - colors  | amanita-100 |
  | --hop-danger-border-selected | Semantic light - colors | amanita-400 |
  | --hop-danger-border-press    | Semantic light - colors | amanita-300 |
  | --hop-danger-icon-weak       | Semantic light - colors | amanita-400 |

## 4.4.3

### Patch Changes

- 41b0468: Modified the following tokens:

  **Added**

  | Token                     | Category                |
  | ------------------------- | ----------------------- |
  | --hop-danger-icon-weakest | Semantic token - colors |

## 4.4.2

### Patch Changes

- 2321210: **Updated**

  | Token                           | Category                  | New Value           |
  | ------------------------------- | ------------------------- | ------------------- |
  | --hop-upsell-border-selected    | Semantic light - (colors) | sunken-treasure-400 |
  | --hop-upsell-border-press       | Semantic light - (colors) | sunken-treasure-300 |
  | --hop-upsell-icon-weak          | Semantic light - (colors) | sunken-treasure-300 |
  | --hop-upsell-surface            | Semantic light - (colors) | sunken-treasure-25  |
  | --hop-upsell-surface-hover      | Semantic light - (colors) | sunken-treasure-50  |
  | --hop-upsell-surface-press      | Semantic light - (colors) | sunken-treasure-75  |
  | --hop-upsell-surface-weak       | Semantic light - (colors) | sunken-treasure-75  |
  | --hop-upsell-surface-weak-hover | Semantic light - (colors) | sunken-treasure-100 |
  | --hop-upsell-surface-weak-press | Semantic light - (colors) | sunken-treasure-200 |
  | --hop-upsell-icon-weak          | Semantic dark - (colors)  | sunken-treasure-100 |
  | --hop-upsell-surface            | Semantic dark - (colors)  | sunken-treasure-75  |
  | --hop-upsell-surface-hover      | Semantic dark - (colors)  | sunken-treasure-100 |
  | --hop-upsell-surface-press      | Semantic dark - (colors)  | sunken-treasure-200 |
  | --hop-upsell-surface-weak       | Semantic dark - (colors)  | sunken-treasure-800 |

## 4.4.1

### Patch Changes

- d098c47: Updated all dependencies.

## 4.4.0

### Minor Changes

- 6b443bd: Added hop-dataviz-categorical-sequence-category11-hover token

## 4.3.3

### Patch Changes

- 7f8b609: Adjusted text-neutral-weakest color

## 4.3.2

### Patch Changes

- 41cbec0: Fixed a token typo

## 4.3.1

### Patch Changes

- 2f8f383: Patched neutral-border-press token color

## 4.3.0

### Minor Changes

- 47cb86f: Added space-10 token (1px)

## 4.2.0

### Minor Changes

- a3ee503: Added two tokens / updated one token

## 4.1.1

### Patch Changes

- a16cf30: Fixed wrong token

## 4.1.0

### Minor Changes

- d689dd8: Added new status tokens - updated some status tokens

## 4.0.2

### Patch Changes

- 8ad853b: Retro fitted active color tokens to ease with migrations, these will be deprecated eventually.

## 4.0.1

### Patch Changes

- ffe99c7: Adjustment of the text crop token value for ABC Favorit Mono typeface

## 4.0.0

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

## 3.5.1

### Patch Changes

- f769b65: Swapped the ABC Favorit font for an alternate version

## 3.5.0

### Minor Changes

- c6004a4: #### Changed

  **Semantic dark**

  | Token                           | Value   | Status |
  | ------------------------------- | ------- | ------ |
  | --hop-primary-text-strong-hover | samoyed | update |

## 3.4.0

### Minor Changes

- 6a2fe45: Added offset tokens to semantic Typographic composite tokens

## 3.3.0

### Minor Changes

- aa5d10b: Added font fallback to font tokens

## 3.2.1

### Patch Changes

- 1948003: Removal of unnecessary node limitation for tokens

## 3.2.0

### Minor Changes

- ff7fed1: # Font Tokens
  - Swapped referenced token fonts for variable fonts.
  - Woff2 are now the defacto font extension.

## 3.1.5

### Patch Changes

- 2f18e75: - Upsell disabled surface value has been set to treasure-25
  - Upsell surface value has been set to treasure-75

## 3.1.4

### Patch Changes

- 2639596: Updated some dependencies + move some to peer dependency.
  Fixed a warning that was being thrown in the console regarding SSR.

## 3.1.3

### Patch Changes

- 8860106: Added missing token

## 3.1.2

### Patch Changes

- eb5de30: Updated neutral surface strong value in dark mode

## 3.1.1

### Patch Changes

- a31b7e2: Updated the heading small line height token to the right core token

## 3.1.0

### Minor Changes

- 70c40a8: Update to color tokens and new color tokens

## 3.0.0

### Major Changes

- 63ae833: prefixed data visualization tokens with "dataviz"

## 2.1.0

### Minor Changes

- 1ede3f2: Added data viz tokens and added sections to the color page in the docs.

## 2.0.0

### Major Changes

- 51c5357: replace the relative path of assets by an absolute path

## 1.1.0

### Minor Changes

- 2c7f2ab: ### New Tokens
  - decorative-option2-surface-weak
  - decorative-option2-surface-weakest
  - decorative-option4-surface-weak
  - decorative-option4-surface-weakest
  - decorative-option5-surface-weak
  - decorative-option5-surface-weakest
  - decorative-option6-surface-weak
  - decorative-option6-surface-weakest
  - decorative-option7-surface-weak
  - decorative-option7-surface-weakest
  - decorative-option8-surface-weak
  - decorative-option8-surface-weakest
  - decorative-option9-surface-weak
  - decorative-option9-surface-weakest

  ### Update
  - decorative-option1-text-weak
  - decorative-option2-text-weak
  - decorative-option3-text-weak
  - decorative-option5-text-weak
  - decorative-option9-text-weak

## 1.0.1

### Patch Changes

- 01844dd: Fix typo in size tokens

## 1.0.0

### Major Changes

- 2200fed: Sync with design tokens

  #### Changed

  **Semantic light**

  | Token                                    | Value   | Status |
  | ---------------------------------------- | ------- | ------ |
  | --hop-neutral-text-disabled              | #959593 | update |
  | --hop-neutral-surface-disabled           | #ECEBE8 | update |
  | --hop-neutral-border-disabled            | #ECEBE8 | update |
  | --hop-neutral-icon-disabled              | #959593 | update |
  | --hop-neutral-icon-hover                 | #505050 | update |
  | --hop-neutral-icon-weak-hover            | #505050 | new    |
  | --hop-neutral-surface-weakest-hover      | #ECEBE8 | new    |
  | --hop-primary-icon-strong-hover          | #FFFFFF | new    |
  | --hop-primary-icon-disabled              | #95B1FF | update |
  | --hop-primary-surface-strong-active      | #E6EBFF | new    |
  | --hop-primary-surface-strong-hover       | #2A43E8 | new    |
  | --hop-primary-text-strong-hover          | #FFFFFF | new    |
  | --hop-danger-surface-strong-hover        | #CB2E31 | new    |
  | --hop-danger-text-strong-hover           | #FFFFFF | new    |
  | --hop-danger-icon-strong-hover           | #FFFFFF | new    |
  | --hop-danger-icon-active                 | #DF3236 | update |
  | --hop-decorative-option1-surface         | #B9CBFF | update |
  | --hop-decorative-option1-border          | #B9CBFF | new    |
  | --hop-decorative-option1-surface-weakest | #F5F6FF | new    |
  | --hop-decorative-option1-surface-strong  | #95B1FF | new    |
  | --hop-decorative-option1-surface-hover   | #95B1FF | new    |
  | --hop-decorative-option2-surface         | #BDE8E1 | update |
  | --hop-decorative-option2-border          | #A3D6CB | new    |
  | --hop-decorative-option2-surface-weak    | #A3D6CB | update |
  | --hop-decorative-option2-surface-hover   | #A3D6CB | new    |
  | --hop-decorative-option3-border          | #FFBF92 | new    |
  | --hop-decorative-option3-surface-weakest | #FFF5E9 | new    |
  | --hop-decorative-option3-surface-strong  | #FF9B3F | new    |
  | --hop-decorative-option3-surface-hover   | #FF9B3F | new    |
  | --hop-decorative-option4-border          | #AAD89D | new    |
  | --hop-decorative-option4-surface-strong  | #AAD89D | new    |
  | --hop-decorative-option4-surface-hover   | #AAD89D | new    |
  | --hop-decorative-option4-surface-weak    | #E3F3B9 | delete |
  | --hop-decorative-option5-surface         | #BAE6FF | update |
  | --hop-decorative-option5-border          | #9FD2F7 | new    |
  | --hop-decorative-option5-surface-strong  | #9FD2F7 | new    |
  | --hop-decorative-option5-surface-hover   | #9FD2F7 | new    |
  | --hop-decorative-option5-surface-weak    | #BAE6FF | delete |
  | --hop-decorative-option6-border          | #EAC96D | new    |
  | --hop-decorative-option6-surface-strong  | #2F250D | new    |
  | --hop-decorative-option6-surface-hover   | #2F250D | new    |
  | --hop-decorative-option7-border          | #D4CBC0 | new    |
  | --hop-decorative-option7-surface-strong  | #E5DED6 | new    |
  | --hop-decorative-option7-surface-hover   | #E5DED6 | new    |
  | --hop-decorative-option7-surface-weak    | #BAE6FF | delete |
  | --hop-decorative-option8-border          | #FFBCB7 | new    |
  | --hop-decorative-option8-surface         | #FFBCB7 | update |
  | --hop-decorative-option8-surface-strong  | #FFBCB7 | new    |
  | --hop-decorative-option8-surface-hover   | #FF8E8E | new    |
  | --hop-decorative-option8-surface-weak    | #FDE6E5 | delete |
  | --hop-decorative-option9-surface         | #777775 | update |
  | --hop-decorative-option9-surface-weak    | #777775 | delete |
  | --hop-decorative-option9-border          | #CCCCCA | new    |
  | --hop-decorative-option9-surface-strong  | #3C3C3C | new    |
  | --hop-decorative-option9-surface-hover   | #6C6C6B | new    |

  **Status light**

  | Token                                | Value   | Status |
  | ------------------------------------ | ------- | ------ |
  | --hop-status-inactive-surface        | #ECEBE8 | new    |
  | --hop-status-inactive-surface-strong | #CCCCCA | new    |
  | --hop-status-inactive-text           | #505050 | new    |
  | --hop-status-inactive-icon           | #6C6C6B | new    |
  | --hop-status-option6-surface         | #FFF8D6 | new    |
  | --hop-status-option6-surface-strong  | #E2A934 | new    |
  | --hop-status-option6-text            | #7E5E0A | new    |
  | --hop-status-option6-icon            | #7E5E0A | new    |

  **Semantic dark**

  | Token                                | Value   | Status |
  | ------------------------------------ | ------- | ------ |
  | --hop-neutral-text-hover             | #ECEBE8 | update |
  | --hop-neutral-text-disabled          | #6C6C6B | update |
  | --hop-neutral-surface-weakest-hover  | #3C3C3C | new    |
  | --hop-neutral-surface-weakest-active | #3C3C3C | delete |
  | --hop-neutral-surface-disabled       | #505050 | update |
  | --hop-neutral-border-strong-hover    | #FFFFFF | new    |
  | --hop-neutral-border-disabled        | #3C3C3C | update |
  | --hop-neutral-icon-hover             | #ECEBE8 | update |
  | --hop-neutral-icon-disabled          | #6C6C6B | update |
  | --hop-primary-text-strong-hover      | #6C8FFD | new    |
  | --hop-primary-surface-strong-hover   | #95B1FF | new    |
  | --hop-primary-surface-strong-active  | #1B3587 | new    |
  | --hop-primary-icon-strong-hover      | #6C8FFD | new    |
  | --hop-danger-text-strong-hover       | #FFFFFF | new    |
  | --hop-danger-surface-strong-hover    | #FF8E8E | new    |
  | --hop-danger-icon-active             | #FA4D59 | update |
  | --hop-option1-surface-weak           | #E6EBFF | update |
  | --hop-option1-surface                | #B9CBFF | update |
  | --hop-option1-surface-hover          | #95B1FF | new    |
  | --hop-option1-surface-weakest        | #F5F6FF | new    |
  | --hop-option1-surface-strong         | #95B1FF | new    |
  | --hop-option1-surface-border         | #4767FE | new    |
  | --hop-option2-surface                | #BDE8E1 | update |
  | --hop-option2-surface-hover          | #A3D6CB | new    |
  | --hop-option2-surface-strong         | #A3D6CB | new    |
  | --hop-option2-surface-weak           |         | delete |
  | --hop-option2-border                 | #38836A | new    |
  | --hop-option3-surface                | #FFBF92 | update |
  | --hop-option3-surface-hover          | #FF9B3F | new    |
  | --hop-option3-surface-weak           | #FFE8D3 | update |
  | --hop-option3-surface-weakest        | #FFF5E9 | new    |
  | --hop-option3-surface-strong         | #FF9B3F | new    |
  | --hop-option3-border                 | #C95109 | new    |
  | --hop-option4-surface-weak           |         | delete |
  | --hop-option4-surface-strong         | #AAD89D | new    |
  | --hop-option4-surface-hover          | #AAD89D | new    |
  | --hop-option5-surface                | #BAE6FF | update |
  | --hop-option5-surface-hover          | #9FD2F7 | new    |
  | --hop-option5-surface-strong         | #9FD2F7 | new    |
  | --hop-option5-surface-weak           |         | delete |
  | --hop-option5-border                 | #3A7BB2 | new    |
  | --hop-option6-surface-weak           | #FFF8D6 | update |
  | --hop-option6-surface-hover          | #EAC96D | new    |
  | --hop-option6-surface-strong         | #EAC96D | new    |
  | --hop-option7-surface                | #FOEAE3 | update |
  | --hop-option7-surface-hover          | #E5DED6 | new    |
  | --hop-option7-surface-strong         | #E5DED6 | new    |
  | --hop-option7-surface-weak           |         | delete |
  | --hop-option7-border                 | #837463 | new    |
  | --hop-option8-surface                | #FFBCB7 | update |
  | --hop-option8-surface-strong         | #FEBCB7 | new    |
  | --hop-option8-surface-hover          | #FF8E8E | new    |
  | --hop-option8-surface-weak           |         | delete |
  | --hop-option8-border                 | #DF3236 | new    |
  | --hop-option9-surface                | #777775 | update |
  | --hop-option9-surface-weak           |         | delete |
  | --hop-option9-surface-hover          | #6C6C6B | new    |
  | --hop-option9-surface-strong         | #ЗСЗСЗС | new    |
  | --hop-option9-border                 | #777775 | new    |

  **Status dark**

  | Token                                | Value   | Status |
  | ------------------------------------ | ------- | ------ |
  | --hop-status-progress-surface        | #B9CBFF | update |
  | --hop-status-inactive-surface        | #E0DFDD | new    |
  | --hop-status-inactive-surface-strong | #CCCCCA | new    |
  | --hop-status-inactive-icon           | #3C3C3C | new    |
  | --hop-status-inactive-text           | #292929 | new    |
  | --hop-status-option5-text            | #2A2620 | update |
  | --hop-status-option5-surface         | #BDB1A3 | update |
  | --hop-status-option5-icon            | #2A2620 | update |
  | --hop-status-option6-surface         | #F7E694 | new    |
  | --hop-status-option6-surface-strong  | #EAC96D | new    |
  | --hop-status-option6-text            | #2F250D | new    |
  | --hop-status-option6-icon            | #2F250D | new    |

- b5956d0: Removed unnecessary line-height / fix rounding for some line height tokens
