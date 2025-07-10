
# Introduction

Design tokens are central to Workleap's design language, underpinning all UI elements. These tokens encapsulate the Workleap brand and are maintained within the Hopper Design System.

A design token can store any of the following elements:

- A single value such as a `color`, `font-size`, or `border-width`.
- A collection of indivisible values such as a `box-shadow`.

## [Definitions](https://hopper.workleap.design/tokens/overview/introduction\#definitions)

Hopper aims to provide a three-tier token system, with each tier serving a specific purpose.

![Token tiers diagram](https://cdn.platform.workleap.com/hopper/webdoc/token-details.png)_A three tier token system allows a separation of concerns regarding design decisions._

### [Core tokens](https://hopper.workleap.design/tokens/overview/introduction\#definitions-core-tokens)

These tokens represent fundamental values like hexadecimal color codes, border widths, or font sizes. They serve as the building blocks of the design system.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-sapphire-200` | core\_sapphire-200 | #95b1ff |  |

### [Semantic tokens](https://hopper.workleap.design/tokens/overview/introduction\#definitions-semantic-tokens)

Semantic tokens convey design intent and are context-aware. They should be used in most scenarios.

#### [Light](https://hopper.workleap.design/tokens/overview/introduction\#light)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-surface-disabled` | primary-disabled | #95b1ff |  |

#### [Dark](https://hopper.workleap.design/tokens/overview/introduction\#dark)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-surface-disabled` | primary-disabled | #2040c7 |  |

### [Component tokens](https://hopper.workleap.design/tokens/overview/introduction\#definitions-component-tokens)

These tokens cover the essential details of component implementation and are provided by the components themselves. They are linked to their specific components and should only be used when building components with a technology other than React.

_Note: These tokens will be available in a future release._

#### [Light](https://hopper.workleap.design/tokens/overview/introduction\#light)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-button-primary-disabled` | #95b1ff |  |

#### [Dark](https://hopper.workleap.design/tokens/overview/introduction\#dark)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-button-primary-disabled` | #2040c7 |  |

## [When to use](https://hopper.workleap.design/tokens/overview/introduction\#when-to-use)

### [For Developers](https://hopper.workleap.design/tokens/overview/introduction\#when-to-use-for-developers)

Tokens should be used whenever Hopper components do not suit your current use case or if you can't use Hopper React components. They are also useful for situations such as setting a background color on an element.

It should be noted that if your current stack prevents you from directly using Hopper components, it is recommended to use component tokens, once released, in priority as they are mapped 1:1 with Hopper implementation.

### [For Designers](https://hopper.workleap.design/tokens/overview/introduction\#when-to-use-for-designers)

When developing features for Workleap, you may need to create new components or enhance existing ones. In this case, you should use semantic tokens to create your components. This ensures consistency with the rest of the design system. Only semantic tokens are available in Figma.

## Color Guidelines

# Color

Colors are a clear way to convey meaning in design. Over time, we associate colors with specific meanings based on their context and frequency of use. In the Workleap ecosystem, each color complements the others and has a specific role.

## [Guidelines](https://hopper.workleap.design/tokens/semantic/color\#guidelines)

- **Communication is key** \- Although we value an aesthetically pleasing use of color, we place a higher value on clear communication. Color supports the purpose of the content, communicating things like hierarchy, interactive states and differences between visual elements.
- **Colors have meaning** \- Each color has assigned sentiment based on how they function within the interface. Defined color roles make things easy to modify and customize later. Their meaning is also expanded to all Workleap verticals so that users understand that they’re in the same ecosystem and can recognize its codes.

## [Deprecation notice](https://hopper.workleap.design/tokens/semantic/color\#deprecation-notice)

Tokens with the `-active` suffix are deprecated and should not be used in new code. They will be removed in a future release. Prefer using their `-press` counterparts. In some instances, `-active` tokens should be replaced with `-selected` tokens. This should be documented in your Figma files. If in doubt, validate with a designer.

## [Light Tokens](https://hopper.workleap.design/tokens/semantic/color\#light-tokens)

### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-neutral-border-active` | neutral-active | #777775 |  |
| `--hop-neutral-icon-active` | neutral-active | #292929 |  |
| `--hop-neutral-icon-weak-active` | neutral-weak-active | #505050 |  |
| `--hop-neutral-surface-active` | neutral-active | #ecebe8 |  |
| `--hop-neutral-surface-weak-active` | neutral-weak-active | #ccccca |  |
| `--hop-neutral-text-active` | neutral-active | #292929 |  |
| `--hop-neutral-text-weak-active` | neutral-weak-active | #505050 |  |
| `--hop-neutral-border` | neutral | #b3b3b1 |  |
| `--hop-neutral-border-selected` | neutral-selected | #3c3c3c |  |
| `--hop-neutral-border-disabled` | neutral-disabled | #ecebe8 |  |
| `--hop-neutral-border-hover` | neutral-hover | #959593 |  |
| `--hop-neutral-border-press` | neutral-press | #777775 |  |
| `--hop-neutral-border-strong` | neutral-strong | #3c3c3c |  |
| `--hop-neutral-border-strong-hover` | neutral-strong-hover | #505050 |  |
| `--hop-neutral-border-weak` | neutral-weak | #e0dfdd |  |
| `--hop-neutral-border-weakest` | neutral-weakest | #ecebe8 |  |
| `--hop-neutral-icon` | neutral | #3c3c3c |  |
| `--hop-neutral-icon-selected` | neutral-selected | #ffffff |  |
| `--hop-neutral-icon-disabled` | neutral-disabled | #959593 |  |
| `--hop-neutral-icon-hover` | neutral-hover | #505050 |  |
| `--hop-neutral-icon-press` | neutral-press | #292929 |  |
| `--hop-neutral-icon-strong` | neutral-strong | #ffffff |  |
| `--hop-neutral-icon-strong-hover` | neutral-strong-hover | #ffffff |  |
| `--hop-neutral-icon-weak` | neutral-weak | #777775 |  |
| `--hop-neutral-icon-weak-hover` | neutral-weak-hover | #636362 |  |
| `--hop-neutral-icon-weak-press` | neutral-weak-press | #505050 |  |
| `--hop-neutral-icon-weak-selected` | neutral-weak-selected | #636362 |  |
| `--hop-neutral-icon-weakest` | neutral-weakest | #b3b3b1 |  |
| `--hop-neutral-surface` | neutral | #ffffff |  |
| `--hop-neutral-surface-selected` | neutral-selected | #3c3c3c |  |
| `--hop-neutral-surface-disabled` | neutral-disabled | #ecebe8 |  |
| `--hop-neutral-surface-hover` | neutral-hover | #f8f6f3 |  |
| `--hop-neutral-surface-press` | neutral-press | #ecebe8 |  |
| `--hop-neutral-surface-strong` | neutral-strong | #3c3c3c |  |
| `--hop-neutral-surface-weak` | neutral-weak | #ecebe8 |  |
| `--hop-neutral-surface-weak-selected` | neutral-weak-selected | #ecebe8 |  |
| `--hop-neutral-surface-weak-hover` | neutral-weak-hover | #e0dfdd |  |
| `--hop-neutral-surface-weak-press` | neutral-weak-press | #ccccca |  |
| `--hop-neutral-surface-weakest` | neutral-weakest | #f8f6f3 |  |
| `--hop-neutral-surface-weakest-selected` | neutral-weakest-selected | #ecebe8 |  |
| `--hop-neutral-surface-weakest-hover` | neutral-weakest-hover | #ecebe8 |  |
| `--hop-neutral-text` | neutral | #3c3c3c |  |
| `--hop-neutral-text-selected` | neutral-selected | #ffffff |  |
| `--hop-neutral-text-disabled` | neutral-disabled | #959593 |  |
| `--hop-neutral-text-hover` | neutral-hover | #505050 |  |
| `--hop-neutral-text-press` | neutral-press | #292929 |  |
| `--hop-neutral-text-strong` | neutral-strong | #ffffff |  |
| `--hop-neutral-text-weak` | neutral-weak | #6c6c6b |  |
| `--hop-neutral-text-weak-hover` | neutral-weak-hover | #636362 |  |
| `--hop-neutral-text-weak-press` | neutral-weak-press | #505050 |  |
| `--hop-neutral-text-weak-selected` | neutral-weak-selected | #636362 |  |
| `--hop-neutral-text-weakest` | neutral-weakest | #959593 |  |

### [Primary](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-primary)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-border-active` | primary-active | #6c8ffd |  |
| `--hop-primary-icon-active` | primary-active | #2040c7 |  |
| `--hop-primary-surface-active` | primary-active | #6c8ffd |  |
| `--hop-primary-surface-strong-active` | primary-strong-active | #2040c7 |  |
| `--hop-primary-surface-weak-active` | primary-weak-active | #d6e0ff |  |
| `--hop-primary-text-active` | primary-active | #2040c7 |  |
| `--hop-primary-border` | primary | #4767fe |  |
| `--hop-primary-border-selected` | primary-selected | #4767fe |  |
| `--hop-primary-border-focus` | primary-focus | #3b57ff |  |
| `--hop-primary-border-press` | primary-press | #6c8ffd |  |
| `--hop-primary-icon` | primary | #3b57ff |  |
| `--hop-primary-icon-selected` | primary-selected | #3b57ff |  |
| `--hop-primary-icon-disabled` | primary-disabled | #95b1ff |  |
| `--hop-primary-icon-hover` | primary-hover | #2a43e8 |  |
| `--hop-primary-icon-press` | primary-press | #2040c7 |  |
| `--hop-primary-icon-strong` | primary-strong | #ffffff |  |
| `--hop-primary-icon-strong-hover` | primary-strong-hover | #ffffff |  |
| `--hop-primary-surface` | primary | #e6ebff |  |
| `--hop-primary-surface-selected` | primary-selected | #e6ebff |  |
| `--hop-primary-surface-disabled` | primary-disabled | #95b1ff |  |
| `--hop-primary-surface-focus` | primary-focus | #f5f6ff |  |
| `--hop-primary-surface-hover` | primary-hover | #95b1ff |  |
| `--hop-primary-surface-press` | primary-press | #6c8ffd |  |
| `--hop-primary-surface-strong` | primary-strong | #4767fe |  |
| `--hop-primary-surface-strong-selected` | primary-strong-selected | #e6ebff |  |
| `--hop-primary-surface-strong-hover` | primary-strong-hover | #2a43e8 |  |
| `--hop-primary-surface-strong-press` | primary-strong-press | #2040c7 |  |
| `--hop-primary-surface-weak` | primary-weak | #f5f6ff |  |
| `--hop-primary-surface-weak-hover` | primary-weak-hover | #e6ebff |  |
| `--hop-primary-surface-weak-press` | primary-weak-press | #d6e0ff |  |
| `--hop-primary-text` | primary | #3b57ff |  |
| `--hop-primary-text-selected` | primary-selected | #3b57ff |  |
| `--hop-primary-text-disabled` | primary-disabled | #95b1ff |  |
| `--hop-primary-text-hover` | primary-hover | #2a43e8 |  |
| `--hop-primary-text-press` | primary-press | #2040c7 |  |
| `--hop-primary-text-strong` | primary-strong | #ffffff |  |
| `--hop-primary-text-strong-hover` | primary-strong-hover | #ffffff |  |

### [Success](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-success)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-success-border` | success | #aad89d |  |
| `--hop-success-icon` | success | #115a52 |  |
| `--hop-success-icon-weakest` | success-weakest | #aad89d |  |
| `--hop-success-icon-weak` | success-weak | #47a584 |  |
| `--hop-success-surface` | success | #f4f9e9 |  |
| `--hop-success-surface-strong` | success-strong | #aad89d |  |
| `--hop-success-surface-weak` | success-weak | #e3f3b9 |  |
| `--hop-success-text` | success | #115a52 |  |
| `--hop-success-text-hover` | success-hover | #16433d |  |
| `--hop-success-text-weak` | success-weak | #47a584 |  |

### [Warning](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-warning)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-warning-border` | warning | #ffbf92 |  |
| `--hop-warning-icon` | warning | #8c3504 |  |
| `--hop-warning-icon-weakest` | warning-weakest | #ffbf92 |  |
| `--hop-warning-icon-weak` | warning-weak | #e57723 |  |
| `--hop-warning-surface` | warning | #fff5e9 |  |
| `--hop-warning-surface-strong` | warning-strong | #ffbf92 |  |
| `--hop-warning-surface-weak` | warning-weak | #ffe8d3 |  |
| `--hop-warning-text` | warning | #8c3504 |  |
| `--hop-warning-text-weak` | warning-weak | #e57723 |  |

### [Danger](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-danger)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-danger-border-active` | danger-active | #ba2d2d |  |
| `--hop-danger-icon-active` | danger-active | #6c2320 |  |
| `--hop-danger-icon-weak-active` | danger-weak-active | #ba2d2d |  |
| `--hop-danger-surface-active` | danger-active | #ba2d2d |  |
| `--hop-danger-surface-weak-active` | danger-weak-active | #ffbcb7 |  |
| `--hop-danger-text-active` | danger-active | #6c2320 |  |
| `--hop-danger-text-weak-active` | danger-weak-active | #ba2d2d |  |
| `--hop-danger-border` | danger | #ffbcb7 |  |
| `--hop-danger-border-selected` | danger-selected | #df3236 |  |
| `--hop-danger-border-strong` | danger-strong | #fa4d59 |  |
| `--hop-danger-border-press` | danger-press | #fa4d59 |  |
| `--hop-danger-icon` | danger | #952927 |  |
| `--hop-danger-icon-selected` | danger-selected | #df3236 |  |
| `--hop-danger-icon-disabled` | danger-disabled | #ffbcb7 |  |
| `--hop-danger-icon-hover` | danger-hover | #cb2e31 |  |
| `--hop-danger-icon-press` | danger-press | #6c2320 |  |
| `--hop-danger-icon-strong` | danger-strong | #ffffff |  |
| `--hop-danger-icon-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-icon-weak` | danger-weak | #df3236 |  |
| `--hop-danger-icon-weak-hover` | danger-weak-hover | #cb2e31 |  |
| `--hop-danger-icon-weak-press` | danger-weak-press | #ba2d2d |  |
| `--hop-danger-icon-weakest` | danger-weakest | #ffd6d3 |  |
| `--hop-danger-surface` | danger | #fdf6f6 |  |
| `--hop-danger-surface-selected` | danger-selected | #fde6e5 |  |
| `--hop-danger-surface-disabled` | danger-disabled | #ffbcb7 |  |
| `--hop-danger-surface-hover` | danger-hover | #cb2e31 |  |
| `--hop-danger-surface-press` | danger-press | #ba2d2d |  |
| `--hop-danger-surface-strong` | danger-strong | #df3236 |  |
| `--hop-danger-surface-strong-hover` | danger-strong-hover | #cb2e31 |  |
| `--hop-danger-surface-weak` | danger-weak | #fde6e5 |  |
| `--hop-danger-surface-weak-hover` | danger-weak-hover | #ffd6d3 |  |
| `--hop-danger-surface-weak-press` | danger-weak-press | #ffbcb7 |  |
| `--hop-danger-text` | danger | #952927 |  |
| `--hop-danger-text-selected` | danger-selected | #df3236 |  |
| `--hop-danger-text-disabled` | danger-disabled | #ffbcb7 |  |
| `--hop-danger-text-hover` | danger-hover | #cb2e31 |  |
| `--hop-danger-text-press` | danger-press | #6c2320 |  |
| `--hop-danger-text-strong` | danger-strong | #ffffff |  |
| `--hop-danger-text-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-text-weak` | danger-weak | #df3236 |  |
| `--hop-danger-text-weak-hover` | danger-weak-hover | #cb2e31 |  |
| `--hop-danger-text-weak-press` | danger-weak-press | #ba2d2d |  |

### [Information](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-information)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-information-border` | information | #9fd2f7 |  |
| `--hop-information-icon` | information | #0a538b |  |
| `--hop-information-icon-weakest` | information-weakest | #bae6ff |  |
| `--hop-information-icon-weak` | information-weak | #5d9acd |  |
| `--hop-information-surface` | information | #f0f8ff |  |
| `--hop-information-surface-strong` | information-strong | #9fd2f7 |  |
| `--hop-information-surface-weak` | information-weak | #d9efff |  |
| `--hop-information-text` | information | #003d70 |  |
| `--hop-information-text-weak` | information-weak | #5d9acd |  |

### [Upsell](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-upsell)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-upsell-border-active` | upsell-active | #e2a934 |  |
| `--hop-upsell-icon-active` | upsell-active | #2f250d |  |
| `--hop-upsell-icon-weak-active` | upsell-weak-active | #7e5e0a |  |
| `--hop-upsell-surface-active` | upsell-active | #e2a934 |  |
| `--hop-upsell-surface-weak-active` | upsell-weak-active | #f7e694 |  |
| `--hop-upsell-text-active` | upsell-active | #2f250d |  |
| `--hop-upsell-text-weak-active` | upsell-weak-active | #7e5e0a |  |
| `--hop-upsell-border` | upsell | #eac96d |  |
| `--hop-upsell-border-selected` | upsell-selected | #996f08 |  |
| `--hop-upsell-border-disabled` | upsell-disabled | #f7e694 |  |
| `--hop-upsell-border-press` | upsell-press | #c28b12 |  |
| `--hop-upsell-icon` | upsell | #654c0d |  |
| `--hop-upsell-icon-selected` | upsell-selected | #996f08 |  |
| `--hop-upsell-icon-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-icon-press` | upsell-press | #2f250d |  |
| `--hop-upsell-icon-weakest` | upsell-weakest | #f7e694 |  |
| `--hop-upsell-icon-weak` | upsell-weak | #c28b12 |  |
| `--hop-upsell-icon-weak-hover` | upsell-weak-hover | #8b6609 |  |
| `--hop-upsell-icon-weak-press` | upsell-weak-press | #7e5e0a |  |
| `--hop-upsell-surface` | upsell | #fff8d6 |  |
| `--hop-upsell-surface-selected` | upsell-selected | #fff2b8 |  |
| `--hop-upsell-surface-disabled` | upsell-disabled | #fff8d6 |  |
| `--hop-upsell-surface-hover` | upsell-hover | #fff2b8 |  |
| `--hop-upsell-surface-press` | upsell-press | #f7e694 |  |
| `--hop-upsell-surface-weak` | upsell-weak | #f7e694 |  |
| `--hop-upsell-surface-weak-hover` | upsell-weak-hover | #eac96d |  |
| `--hop-upsell-surface-weak-press` | upsell-weak-press | #e2a934 |  |
| `--hop-upsell-text` | upsell | #654c0d |  |
| `--hop-upsell-text-selected` | upsell-selected | #996f08 |  |
| `--hop-upsell-text-disabled` | upsell-disabled | #996f08 |  |
| `--hop-upsell-text-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-text-press` | upsell-press | #2f250d |  |
| `--hop-upsell-text-weak` | upsell-weak | #c28b12 |  |
| `--hop-upsell-text-weak-hover` | upsell-weak-hover | #8b6609 |  |
| `--hop-upsell-text-weak-press` | upsell-weak-press | #7e5e0a |  |

### [Decorative](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-decorative)

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option1-border` | decorative-option1 | #b9cbff |  |
| `--hop-decorative-option1-icon` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-surface` | decorative-option1 | #b9cbff |  |
| `--hop-decorative-option1-surface-hover` | decorative-option1-hover | #95b1ff |  |
| `--hop-decorative-option1-surface-strong` | decorative-option1-strong | #95b1ff |  |
| `--hop-decorative-option1-surface-weak` | decorative-option1-weak | #e6ebff |  |
| `--hop-decorative-option1-surface-weak-hover` | decorative-option1-weak-hover | #d6e0ff |  |
| `--hop-decorative-option1-surface-weakest` | decorative-option1-weakest | #f5f6ff |  |
| `--hop-decorative-option1-text` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-text-weak` | decorative-option1-weak | #6c8ffd |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option2-border` | decorative-option2 | #a3d6cb |  |
| `--hop-decorative-option2-icon` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-surface` | decorative-option2 | #bde8e1 |  |
| `--hop-decorative-option2-surface-hover` | decorative-option2-hover | #a3d6cb |  |
| `--hop-decorative-option2-surface-strong` | decorative-option2-strong | #a3d6cb |  |
| `--hop-decorative-option2-surface-weak` | decorative-option2-weak | #cff4ef |  |
| `--hop-decorative-option2-surface-weak-hover` | decorative-option2-weak-hover | #bde8e1 |  |
| `--hop-decorative-option2-surface-weakest` | decorative-option2-weakest | #ddfdf9 |  |
| `--hop-decorative-option2-text` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-text-weak` | decorative-option2-weak | #5da18c |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option3-border` | decorative-option3 | #ffbf92 |  |
| `--hop-decorative-option3-icon` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-surface` | decorative-option3 | #ffbf92 |  |
| `--hop-decorative-option3-surface-hover` | decorative-option3-hover | #ff9b3f |  |
| `--hop-decorative-option3-surface-strong` | decorative-option3-strong | #ff9b3f |  |
| `--hop-decorative-option3-surface-weak` | decorative-option3-weak | #ffe8d3 |  |
| `--hop-decorative-option3-surface-weak-hover` | decorative-option3-weak-hover | #ffd8be |  |
| `--hop-decorative-option3-surface-weakest` | decorative-option3-weakest | #fff5e9 |  |
| `--hop-decorative-option3-text` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-text-weak` | decorative-option3-weak | #e57723 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option4-border` | decorative-option4 | #aad89d |  |
| `--hop-decorative-option4-icon` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-surface` | decorative-option4 | #cde8ac |  |
| `--hop-decorative-option4-surface-hover` | decorative-option4-hover | #aad89d |  |
| `--hop-decorative-option4-surface-strong` | decorative-option4-strong | #aad89d |  |
| `--hop-decorative-option4-surface-weak` | decorative-option4-weak | #e3f3b9 |  |
| `--hop-decorative-option4-surface-weak-hover` | decorative-option4-weak-hover | #cde8ac |  |
| `--hop-decorative-option4-surface-weakest` | decorative-option4-weakest | #f4f9e9 |  |
| `--hop-decorative-option4-text` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-text-weak` | decorative-option4-weak | #188a71 |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option5-border` | decorative-option5 | #9fd2f7 |  |
| `--hop-decorative-option5-icon` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-surface` | decorative-option5 | #bae6ff |  |
| `--hop-decorative-option5-surface-hover` | decorative-option5-hover | #9fd2f7 |  |
| `--hop-decorative-option5-surface-strong` | decorative-option5-strong | #9fd2f7 |  |
| `--hop-decorative-option5-surface-weak` | decorative-option5-weak | #d9efff |  |
| `--hop-decorative-option5-surface-weak-hover` | decorative-option5-weak-hover | #bae6ff |  |
| `--hop-decorative-option5-surface-weakest` | decorative-option5-weakest | #f0f8ff |  |
| `--hop-decorative-option5-text` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-text-weak` | decorative-option5-weak | #5d9acd |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option6-border` | decorative-option6 | #eac96d |  |
| `--hop-decorative-option6-icon` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-surface` | decorative-option6 | #f7e694 |  |
| `--hop-decorative-option6-surface-hover` | decorative-option6-hover | #eac96d |  |
| `--hop-decorative-option6-surface-strong` | decorative-option6-strong | #eac96d |  |
| `--hop-decorative-option6-surface-weak` | decorative-option6-weak | #fff2b8 |  |
| `--hop-decorative-option6-surface-weak-hover` | decorative-option6-weak-hover | #f7e694 |  |
| `--hop-decorative-option6-surface-weakest` | decorative-option6-weakest | #fff8d6 |  |
| `--hop-decorative-option6-text` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-text-weak` | decorative-option6-weak | #e2a934 |  |

#### [Option 7](https://hopper.workleap.design/tokens/semantic/color\#option-7)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option7-border` | decorative-option7 | #d4cbc0 |  |
| `--hop-decorative-option7-icon` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-surface` | decorative-option7 | #e5ded6 |  |
| `--hop-decorative-option7-surface-hover` | decorative-option7-hover | #d4cbc0 |  |
| `--hop-decorative-option7-surface-strong` | decorative-option7-strong | #d4cbc0 |  |
| `--hop-decorative-option7-surface-weak` | decorative-option7-weak | #f0eae3 |  |
| `--hop-decorative-option7-surface-weak-hover` | decorative-option7-weak-hover | #e5ded6 |  |
| `--hop-decorative-option7-surface-weakest` | decorative-option7-weakest | #fef6ef |  |
| `--hop-decorative-option7-text` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-text-weak` | decorative-option7-weak | #776a59 |  |

#### [Option 8](https://hopper.workleap.design/tokens/semantic/color\#option-8)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option8-border` | decorative-option8 | #ffbcb7 |  |
| `--hop-decorative-option8-icon` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-surface` | decorative-option8 | #ffd6d3 |  |
| `--hop-decorative-option8-surface-hover` | decorative-option8-hover | #ff8e8e |  |
| `--hop-decorative-option8-surface-strong` | decorative-option8-strong | #ffbcb7 |  |
| `--hop-decorative-option8-surface-weak` | decorative-option8-weak | #fde6e5 |  |
| `--hop-decorative-option8-surface-weak-hover` | decorative-option8-weak-hover | #ffd6d3 |  |
| `--hop-decorative-option8-surface-weakest` | decorative-option8-weakest | #fdf6f6 |  |
| `--hop-decorative-option8-text` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-text-weak` | decorative-option8-weak | #fa4d59 |  |

#### [Option 9](https://hopper.workleap.design/tokens/semantic/color\#option-9)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option9-border` | decorative-option9 | #ccccca |  |
| `--hop-decorative-option9-icon` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-surface` | decorative-option9 | #777775 |  |
| `--hop-decorative-option9-surface-hover` | decorative-option9-hover | #6c6c6b |  |
| `--hop-decorative-option9-surface-strong` | decorative-option9-strong | #3c3c3c |  |
| `--hop-decorative-option9-surface-weak` | decorative-option9-weak | #959593 |  |
| `--hop-decorative-option9-surface-weak-hover` | decorative-option9-weak-hover | #777775 |  |
| `--hop-decorative-option9-surface-weakest` | decorative-option9-weakest | #b3b3b1 |  |
| `--hop-decorative-option9-text` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-text-weak` | decorative-option9-weak | #959593 |  |

### [Status](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-status)

#### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-neutral-border` | status-neutral | #3c3c3c |  |
| `--hop-status-neutral-border-disabled` | status-neutral-disabled | #ecebe8 |  |
| `--hop-status-neutral-border-hover` | status-neutral-hover | #505050 |  |
| `--hop-status-neutral-border-press` | status-neutral-press | #292929 |  |
| `--hop-status-neutral-border-selected` | status-neutral-selected | #3c3c3c |  |
| `--hop-status-neutral-icon` | status-neutral | #3c3c3c |  |
| `--hop-status-neutral-icon-disabled` | status-neutral-disabled | #959593 |  |
| `--hop-status-neutral-icon-hover` | status-neutral-hover | #505050 |  |
| `--hop-status-neutral-icon-press` | status-neutral-press | #292929 |  |
| `--hop-status-neutral-icon-selected` | status-neutral-selected | #ffffff |  |
| `--hop-status-neutral-surface` | status-neutral | #ffffff |  |
| `--hop-status-neutral-surface-disabled` | status-neutral-disabled | #ecebe8 |  |
| `--hop-status-neutral-surface-hover` | status-neutral-hover | #f8f6f3 |  |
| `--hop-status-neutral-surface-press` | status-neutral-press | #ecebe8 |  |
| `--hop-status-neutral-surface-selected` | status-neutral-selected | #3c3c3c |  |
| `--hop-status-neutral-surface-strong` | status-neutral-strong | #b3b3b1 |  |
| `--hop-status-neutral-text` | status-neutral | #3c3c3c |  |
| `--hop-status-neutral-text-disabled` | status-neutral-disabled | #959593 |  |
| `--hop-status-neutral-text-hover` | status-neutral-hover | #505050 |  |
| `--hop-status-neutral-text-press` | status-neutral-press | #292929 |  |
| `--hop-status-neutral-text-selected` | status-neutral-selected | #ffffff |  |

#### [Progress](https://hopper.workleap.design/tokens/semantic/color\#progress)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-progress-border` | status-progress | #6c8ffd |  |
| `--hop-status-progress-border-disabled` | status-progress-disabled | #e6ebff |  |
| `--hop-status-progress-border-hover` | status-progress-hover | #4767fe |  |
| `--hop-status-progress-border-press` | status-progress-press | #3b57ff |  |
| `--hop-status-progress-border-selected` | status-progress-selected | #4767fe |  |
| `--hop-status-progress-icon` | status-progress | #2a43e8 |  |
| `--hop-status-progress-icon-disabled` | status-progress-disabled | #95b1ff |  |
| `--hop-status-progress-icon-hover` | status-progress-hover | #2040c7 |  |
| `--hop-status-progress-icon-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-icon-selected` | status-progress-selected | #3b57ff |  |
| `--hop-status-progress-surface` | status-progress | #e6ebff |  |
| `--hop-status-progress-surface-disabled` | status-progress-disabled | #f5f6ff |  |
| `--hop-status-progress-surface-hover` | status-progress-hover | #d6e0ff |  |
| `--hop-status-progress-surface-press` | status-progress-press | #b9cbff |  |
| `--hop-status-progress-surface-selected` | status-progress-selected | #e6ebff |  |
| `--hop-status-progress-surface-strong` | status-progress-strong | #95b1ff |  |
| `--hop-status-progress-text` | status-progress | #2a43e8 |  |
| `--hop-status-progress-text-disabled` | status-progress-disabled | #95b1ff |  |
| `--hop-status-progress-text-hover` | status-progress-hover | #2040c7 |  |
| `--hop-status-progress-text-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-text-selected` | status-progress-selected | #3b57ff |  |

#### [Positive](https://hopper.workleap.design/tokens/semantic/color\#positive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-positive-border` | status-positive | #47a584 |  |
| `--hop-status-positive-border-disabled` | status-positive-disabled | #e3f3b9 |  |
| `--hop-status-positive-border-hover` | status-positive-hover | #188a71 |  |
| `--hop-status-positive-border-press` | status-positive-press | #0c796b |  |
| `--hop-status-positive-border-selected` | status-positive-selected | #115a52 |  |
| `--hop-status-positive-icon` | status-positive | #0a6f64 |  |
| `--hop-status-positive-icon-disabled` | status-positive-disabled | #7dc291 |  |
| `--hop-status-positive-icon-hover` | status-positive-hover | #115a52 |  |
| `--hop-status-positive-icon-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-icon-selected` | status-positive-selected | #115a52 |  |
| `--hop-status-positive-surface` | status-positive | #e3f3b9 |  |
| `--hop-status-positive-surface-disabled` | status-positive-disabled | #f4f9e9 |  |
| `--hop-status-positive-surface-hover` | status-positive-hover | #cde8ac |  |
| `--hop-status-positive-surface-press` | status-positive-press | #aad89d |  |
| `--hop-status-positive-surface-selected` | status-positive-selected | #e3f3b9 |  |
| `--hop-status-positive-surface-strong` | status-positive-strong | #7dc291 |  |
| `--hop-status-positive-text` | status-positive | #0a6f64 |  |
| `--hop-status-positive-text-disabled` | status-positive-disabled | #7dc291 |  |
| `--hop-status-positive-text-hover` | status-positive-hover | #115a52 |  |
| `--hop-status-positive-text-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-text-selected` | status-positive-selected | #115a52 |  |

#### [Caution](https://hopper.workleap.design/tokens/semantic/color\#caution)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-caution-border` | status-caution | #e57723 |  |
| `--hop-status-caution-border-disabled` | status-caution-disabled | #ffe8d3 |  |
| `--hop-status-caution-border-hover` | status-caution-hover | #c95109 |  |
| `--hop-status-caution-border-press` | status-caution-press | #ba4705 |  |
| `--hop-status-caution-border-selected` | status-caution-selected | #8c3504 |  |
| `--hop-status-caution-icon` | status-caution | #ab4104 |  |
| `--hop-status-caution-icon-disabled` | status-caution-disabled | #ff9b3f |  |
| `--hop-status-caution-icon-hover` | status-caution-hover | #8c3504 |  |
| `--hop-status-caution-icon-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-icon-selected` | status-caution-selected | #8c3504 |  |
| `--hop-status-caution-surface` | status-caution | #ffe8d3 |  |
| `--hop-status-caution-surface-disabled` | status-caution-disabled | #fff5e9 |  |
| `--hop-status-caution-surface-hover` | status-caution-hover | #ffd8be |  |
| `--hop-status-caution-surface-press` | status-caution-press | #ffbf92 |  |
| `--hop-status-caution-surface-selected` | status-caution-selected | #ffe8d3 |  |
| `--hop-status-caution-surface-strong` | status-caution-strong | #ff9b3f |  |
| `--hop-status-caution-text` | status-caution | #ab4104 |  |
| `--hop-status-caution-text-disabled` | status-caution-disabled | #ff9b3f |  |
| `--hop-status-caution-text-hover` | status-caution-hover | #8c3504 |  |
| `--hop-status-caution-text-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-text-selected` | status-caution-selected | #8c3504 |  |

#### [Negative](https://hopper.workleap.design/tokens/semantic/color\#negative)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-negative-border` | status-negative | #fa4d59 |  |
| `--hop-status-negative-border-disabled` | status-negative-disabled | #fde6e5 |  |
| `--hop-status-negative-border-hover` | status-negative-hover | #df3236 |  |
| `--hop-status-negative-border-press` | status-negative-press | #cb2e31 |  |
| `--hop-status-negative-border-selected` | status-negative-selected | #952927 |  |
| `--hop-status-negative-icon` | status-negative | #ba2d2d |  |
| `--hop-status-negative-icon-disabled` | status-negative-disabled | #ff8e8e |  |
| `--hop-status-negative-icon-hover` | status-negative-hover | #952927 |  |
| `--hop-status-negative-icon-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-icon-selected` | status-negative-selected | #952927 |  |
| `--hop-status-negative-surface` | status-negative | #fde6e5 |  |
| `--hop-status-negative-surface-disabled` | status-negative-disabled | #fdf6f6 |  |
| `--hop-status-negative-surface-hover` | status-negative-hover | #ffd6d3 |  |
| `--hop-status-negative-surface-press` | status-negative-press | #ffbcb7 |  |
| `--hop-status-negative-surface-selected` | status-negative-selected | #fde6e5 |  |
| `--hop-status-negative-surface-strong` | status-negative-strong | #ff8e8e |  |
| `--hop-status-negative-text` | status-negative | #ba2d2d |  |
| `--hop-status-negative-text-disabled` | status-negative-disabled | #ff8e8e |  |
| `--hop-status-negative-text-hover` | status-negative-hover | #952927 |  |
| `--hop-status-negative-text-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-text-selected` | status-negative-selected | #952927 |  |

#### [Inactive](https://hopper.workleap.design/tokens/semantic/color\#inactive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-inactive-border` | status-inactive | #959593 |  |
| `--hop-status-inactive-border-disabled` | status-inactive-disabled | #ecebe8 |  |
| `--hop-status-inactive-border-hover` | status-inactive-hover | #777775 |  |
| `--hop-status-inactive-border-press` | status-inactive-press | #6c6c6b |  |
| `--hop-status-inactive-border-selected` | status-inactive-selected | #505050 |  |
| `--hop-status-inactive-icon` | status-inactive | #636362 |  |
| `--hop-status-inactive-icon-disabled` | status-inactive-disabled | #b3b3b1 |  |
| `--hop-status-inactive-icon-hover` | status-inactive-hover | #505050 |  |
| `--hop-status-inactive-icon-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-icon-selected` | status-inactive-selected | #505050 |  |
| `--hop-status-inactive-surface` | status-inactive | #ecebe8 |  |
| `--hop-status-inactive-surface-disabled` | status-inactive-disabled | #f8f6f3 |  |
| `--hop-status-inactive-surface-hover` | status-inactive-hover | #e0dfdd |  |
| `--hop-status-inactive-surface-press` | status-inactive-press | #ccccca |  |
| `--hop-status-inactive-surface-selected` | status-inactive-selected | #ecebe8 |  |
| `--hop-status-inactive-surface-strong` | status-inactive-strong | #ccccca |  |
| `--hop-status-inactive-text` | status-inactive | #636362 |  |
| `--hop-status-inactive-text-disabled` | status-inactive-disabled | #b3b3b1 |  |
| `--hop-status-inactive-text-hover` | status-inactive-hover | #505050 |  |
| `--hop-status-inactive-text-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-text-selected` | status-inactive-selected | #505050 |  |

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option1-border` | status-option1 | #5d9acd |  |
| `--hop-status-option1-border-disabled` | status-option1-disabled | #d9efff |  |
| `--hop-status-option1-border-hover` | status-option1-hover | #3a7bb2 |  |
| `--hop-status-option1-border-press` | status-option1-press | #2e70a8 |  |
| `--hop-status-option1-border-selected` | status-option1-selected | #0a538b |  |
| `--hop-status-option1-icon` | status-option1 | #23669f |  |
| `--hop-status-option1-icon-disabled` | status-option1-disabled | #81b9e4 |  |
| `--hop-status-option1-icon-hover` | status-option1-hover | #0a538b |  |
| `--hop-status-option1-icon-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-icon-selected` | status-option1-selected | #0a538b |  |
| `--hop-status-option1-surface` | status-option1 | #d9efff |  |
| `--hop-status-option1-surface-disabled` | status-option1-disabled | #f0f8ff |  |
| `--hop-status-option1-surface-hover` | status-option1-hover | #bae6ff |  |
| `--hop-status-option1-surface-press` | status-option1-press | #9fd2f7 |  |
| `--hop-status-option1-surface-selected` | status-option1-selected | #d9efff |  |
| `--hop-status-option1-surface-strong` | status-option1-strong | #81b9e4 |  |
| `--hop-status-option1-text` | status-option1 | #23669f |  |
| `--hop-status-option1-text-disabled` | status-option1-disabled | #81b9e4 |  |
| `--hop-status-option1-text-hover` | status-option1-hover | #0a538b |  |
| `--hop-status-option1-text-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-text-selected` | status-option1-selected | #0a538b |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option2-border` | status-option2 | #8d91dc |  |
| `--hop-status-option2-border-disabled` | status-option2-disabled | #eae9fb |  |
| `--hop-status-option2-border-hover` | status-option2-hover | #6b6ecc |  |
| `--hop-status-option2-border-press` | status-option2-press | #5f61c5 |  |
| `--hop-status-option2-border-selected` | status-option2-selected | #433fac |  |
| `--hop-status-option2-icon` | status-option2 | #5454be |  |
| `--hop-status-option2-icon-disabled` | status-option2-disabled | #aeb3e8 |  |
| `--hop-status-option2-icon-hover` | status-option2-hover | #433fac |  |
| `--hop-status-option2-icon-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-icon-selected` | status-option2-selected | #433fac |  |
| `--hop-status-option2-surface` | status-option2 | #eae9fb |  |
| `--hop-status-option2-surface-disabled` | status-option2-disabled | #f6f5ff |  |
| `--hop-status-option2-surface-hover` | status-option2-hover | #ddddf7 |  |
| `--hop-status-option2-surface-press` | status-option2-press | #c8caf0 |  |
| `--hop-status-option2-surface-selected` | status-option2-selected | #eae9fb |  |
| `--hop-status-option2-surface-strong` | status-option2-strong | #aeb3e8 |  |
| `--hop-status-option2-text` | status-option2 | #5454be |  |
| `--hop-status-option2-text-disabled` | status-option2-disabled | #aeb3e8 |  |
| `--hop-status-option2-text-hover` | status-option2-hover | #433fac |  |
| `--hop-status-option2-text-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-text-selected` | status-option2-selected | #433fac |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option3-border` | status-option3 | #5da18c |  |
| `--hop-status-option3-border-disabled` | status-option3-disabled | #cff4ef |  |
| `--hop-status-option3-border-hover` | status-option3-hover | #38836a |  |
| `--hop-status-option3-border-press` | status-option3-press | #2b795e |  |
| `--hop-status-option3-border-selected` | status-option3-selected | #cff4ef |  |
| `--hop-status-option3-icon` | status-option3 | #206f54 |  |
| `--hop-status-option3-icon-disabled` | status-option3-disabled | #83beaf |  |
| `--hop-status-option3-icon-hover` | status-option3-hover | #055c41 |  |
| `--hop-status-option3-icon-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-icon-selected` | status-option3-selected | #055c41 |  |
| `--hop-status-option3-surface` | status-option3 | #cff4ef |  |
| `--hop-status-option3-surface-disabled` | status-option3-disabled | #ddfdf9 |  |
| `--hop-status-option3-surface-hover` | status-option3-hover | #bde8e1 |  |
| `--hop-status-option3-surface-press` | status-option3-press | #a3d6cb |  |
| `--hop-status-option3-surface-selected` | status-option3-selected | #055c41 |  |
| `--hop-status-option3-surface-strong` | status-option3-strong | #83beaf |  |
| `--hop-status-option3-text` | status-option3 | #206f54 |  |
| `--hop-status-option3-text-disabled` | status-option3-disabled | #83beaf |  |
| `--hop-status-option3-text-hover` | status-option3-hover | #055c41 |  |
| `--hop-status-option3-text-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-text-selected` | status-option3-selected | #055c41 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option4-border` | status-option4 | #7c9aa3 |  |
| `--hop-status-option4-border-disabled` | status-option4-disabled | #e1eef1 |  |
| `--hop-status-option4-border-hover` | status-option4-hover | #5e7b84 |  |
| `--hop-status-option4-border-press` | status-option4-press | #557079 |  |
| `--hop-status-option4-border-selected` | status-option4-selected | #40535a |  |
| `--hop-status-option4-icon` | status-option4 | #4e6770 |  |
| `--hop-status-option4-icon-disabled` | status-option4-disabled | #9cb7be |  |
| `--hop-status-option4-icon-hover` | status-option4-hover | #40535a |  |
| `--hop-status-option4-icon-press` | status-option4-press | #313e43 |  |
| `--hop-status-option4-icon-selected` | status-option4-selected | #40535a |  |
| `--hop-status-option4-surface` | status-option4 | #e1eef1 |  |
| `--hop-status-option4-surface-disabled` | status-option4-disabled | #f2f8fa |  |
| `--hop-status-option4-surface-hover` | status-option4-hover | #d2e3e7 |  |
| `--hop-status-option4-surface-press` | status-option4-press | #bad0d5 |  |
| `--hop-status-option4-surface-selected` | status-option4-selected | #e1eef1 |  |
| `--hop-status-option4-surface-strong` | status-option4-strong | #9cb7be |  |
| `--hop-status-option4-text` | status-option4 | #4e6770 |  |
| `--hop-status-option4-text-disabled` | status-option4-disabled | #9cb7be |  |
| `--hop-status-option4-text-hover` | status-option4-hover | #40535a |  |
| `--hop-status-option4-text-press` | status-option4-press | #313e43 |  |
| `--hop-status-option4-text-selected` | status-option4-selected | #40535a |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option5-border` | status-option5 | #a19382 |  |
| `--hop-status-option5-border-disabled` | status-option5-disabled | #f0eae3 |  |
| `--hop-status-option5-border-hover` | status-option5-hover | #837463 |  |
| `--hop-status-option5-border-press` | status-option5-press | #776a59 |  |
| `--hop-status-option5-border-selected` | status-option5-selected | #594f41 |  |
| `--hop-status-option5-icon` | status-option5 | #6e6151 |  |
| `--hop-status-option5-icon-disabled` | status-option5-disabled | #bdb1a3 |  |
| `--hop-status-option5-icon-hover` | status-option5-hover | #594f41 |  |
| `--hop-status-option5-icon-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-icon-selected` | status-option5-selected | #594f41 |  |
| `--hop-status-option5-surface` | status-option5 | #f0eae3 |  |
| `--hop-status-option5-surface-disabled` | status-option5-disabled | #fef6ef |  |
| `--hop-status-option5-surface-hover` | status-option5-hover | #e5ded6 |  |
| `--hop-status-option5-surface-press` | status-option5-press | #d4cbc0 |  |
| `--hop-status-option5-surface-selected` | status-option5-selected | #f0eae3 |  |
| `--hop-status-option5-surface-strong` | status-option5-strong | #bdb1a3 |  |
| `--hop-status-option5-text` | status-option5 | #6e6151 |  |
| `--hop-status-option5-text-disabled` | status-option5-disabled | #bdb1a3 |  |
| `--hop-status-option5-text-hover` | status-option5-hover | #594f41 |  |
| `--hop-status-option5-text-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-text-selected` | status-option5-selected | #594f41 |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option6-border` | status-option6 | #c28b12 |  |
| `--hop-status-option6-border-disabled` | status-option6-disabled | #fff2b8 |  |
| `--hop-status-option6-border-hover` | status-option6-hover | #996f08 |  |
| `--hop-status-option6-border-press` | status-option6-press | #8b6609 |  |
| `--hop-status-option6-border-selected` | status-option6-selected | #654c0d |  |
| `--hop-status-option6-icon` | status-option6 | #7e5e0a |  |
| `--hop-status-option6-icon-disabled` | status-option6-disabled | #e2a934 |  |
| `--hop-status-option6-icon-hover` | status-option6-hover | #654c0d |  |
| `--hop-status-option6-icon-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-icon-selected` | status-option6-selected | #654c0d |  |
| `--hop-status-option6-surface` | status-option6 | #fff8d6 |  |
| `--hop-status-option6-surface-disabled` | status-option6-disabled | #fff8d6 |  |
| `--hop-status-option6-surface-hover` | status-option6-hover | #fff2b8 |  |
| `--hop-status-option6-surface-press` | status-option6-press | #eac96d |  |
| `--hop-status-option6-surface-selected` | status-option6-selected | #fff2b8 |  |
| `--hop-status-option6-surface-strong` | status-option6-strong | #e2a934 |  |
| `--hop-status-option6-text` | status-option6 | #7e5e0a |  |
| `--hop-status-option6-text-disabled` | status-option6-disabled | #e2a934 |  |
| `--hop-status-option6-text-hover` | status-option6-hover | #654c0d |  |
| `--hop-status-option6-text-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-text-selected` | status-option6-selected | #654c0d |  |

### [Data Visualization](https://hopper.workleap.design/tokens/semantic/color\#light-tokens-data-visualization)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-unavailable` | dataviz\_unavailable | #e0dfdd |  |
| `--hop-dataviz-unavailable-weak` | dataviz\_unavailable-weak | #ecebe8 |  |
| `--hop-dataviz-unavailable-strong` | dataviz\_unavailable-strong | #ccccca |  |
| `--hop-dataviz-text-onlight` | dataviz\_onlight | #3c3c3c |  |
| `--hop-dataviz-text-ondark` | dataviz\_ondark | #ffffff |  |

#### [Monochromatic - Primary](https://hopper.workleap.design/tokens/semantic/color\#monochromatic-primary)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-monochromatic-primary-25` | dataviz\_monochromatic-primary-25 | #f5f6ff |  |
| `--hop-dataviz-monochromatic-primary-50` | dataviz\_monochromatic-primary-50 | #e6ebff |  |
| `--hop-dataviz-monochromatic-primary-75` | dataviz\_monochromatic-primary-75 | #d6e0ff |  |
| `--hop-dataviz-monochromatic-primary-100` | dataviz\_monochromatic-primary-100 | #b9cbff |  |
| `--hop-dataviz-monochromatic-primary-200` | dataviz\_monochromatic-primary-200 | #95b1ff |  |
| `--hop-dataviz-monochromatic-primary-300` | dataviz\_monochromatic-primary-300 | #6c8ffd |  |
| `--hop-dataviz-monochromatic-primary-400` | dataviz\_monochromatic-primary-400 | #4767fe |  |
| `--hop-dataviz-monochromatic-primary-500` | dataviz\_monochromatic-primary-500 | #3b57ff |  |
| `--hop-dataviz-monochromatic-primary-600` | dataviz\_monochromatic-primary-600 | #2a43e8 |  |
| `--hop-dataviz-monochromatic-primary-700` | dataviz\_monochromatic-primary-700 | #2040c7 |  |
| `--hop-dataviz-monochromatic-primary-800` | dataviz\_monochromatic-primary-800 | #1b3587 |  |
| `--hop-dataviz-monochromatic-primary-900` | dataviz\_monochromatic-primary-900 | #152450 |  |
| `--hop-dataviz-monochromatic-primary-25-hover` | dataviz\_monochromatic-primary-25-hover | #e6ebff |  |
| `--hop-dataviz-monochromatic-primary-50-hover` | dataviz\_monochromatic-primary-50-hover | #d6e0ff |  |
| `--hop-dataviz-monochromatic-primary-75-hover` | dataviz\_monochromatic-primary-75-hover | #b9cbff |  |
| `--hop-dataviz-monochromatic-primary-100-hover` | dataviz\_monochromatic-primary-100-hover | #95b1ff |  |
| `--hop-dataviz-monochromatic-primary-200-hover` | dataviz\_monochromatic-primary-200-hover | #6c8ffd |  |
| `--hop-dataviz-monochromatic-primary-300-hover` | dataviz\_monochromatic-primary-300-hover | #4767fe |  |
| `--hop-dataviz-monochromatic-primary-400-hover` | dataviz\_monochromatic-primary-400-hover | #3b57ff |  |
| `--hop-dataviz-monochromatic-primary-500-hover` | dataviz\_monochromatic-primary-500-hover | #2a43e8 |  |
| `--hop-dataviz-monochromatic-primary-600-hover` | dataviz\_monochromatic-primary-600-hover | #2040c7 |  |
| `--hop-dataviz-monochromatic-primary-700-hover` | dataviz\_monochromatic-primary-700-hover | #1b3587 |  |
| `--hop-dataviz-monochromatic-primary-800-hover` | dataviz\_monochromatic-primary-800-hover | #152450 |  |
| `--hop-dataviz-monochromatic-primary-900-hover` | dataviz\_monochromatic-primary-900-hover | #0b173a |  |

#### [Monochromatic - Positive](https://hopper.workleap.design/tokens/semantic/color\#monochromatic-positive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-monochromatic-positive-25` | dataviz\_monochromatic-positive-25 | #f4f9e9 |  |
| `--hop-dataviz-monochromatic-positive-50` | dataviz\_monochromatic-positive-50 | #e3f3b9 |  |
| `--hop-dataviz-monochromatic-positive-75` | dataviz\_monochromatic-positive-75 | #cde8ac |  |
| `--hop-dataviz-monochromatic-positive-100` | dataviz\_monochromatic-positive-100 | #aad89d |  |
| `--hop-dataviz-monochromatic-positive-200` | dataviz\_monochromatic-positive-200 | #7dc291 |  |
| `--hop-dataviz-monochromatic-positive-300` | dataviz\_monochromatic-positive-300 | #47a584 |  |
| `--hop-dataviz-monochromatic-positive-400` | dataviz\_monochromatic-positive-400 | #188a71 |  |
| `--hop-dataviz-monochromatic-positive-500` | dataviz\_monochromatic-positive-500 | #0c796b |  |
| `--hop-dataviz-monochromatic-positive-600` | dataviz\_monochromatic-positive-600 | #0a6f64 |  |
| `--hop-dataviz-monochromatic-positive-700` | dataviz\_monochromatic-positive-700 | #115a52 |  |
| `--hop-dataviz-monochromatic-positive-800` | dataviz\_monochromatic-positive-800 | #16433d |  |
| `--hop-dataviz-monochromatic-positive-900` | dataviz\_monochromatic-positive-900 | #132a27 |  |
| `--hop-dataviz-monochromatic-positive-25-hover` | dataviz\_monochromatic-positive-25-hover | #e3f3b9 |  |
| `--hop-dataviz-monochromatic-positive-50-hover` | dataviz\_monochromatic-positive-50-hover | #cde8ac |  |
| `--hop-dataviz-monochromatic-positive-75-hover` | dataviz\_monochromatic-positive-75-hover | #aad89d |  |
| `--hop-dataviz-monochromatic-positive-100-hover` | dataviz\_monochromatic-positive-100-hover | #7dc291 |  |
| `--hop-dataviz-monochromatic-positive-200-hover` | dataviz\_monochromatic-positive-200-hover | #47a584 |  |
| `--hop-dataviz-monochromatic-positive-300-hover` | dataviz\_monochromatic-positive-300-hover | #188a71 |  |
| `--hop-dataviz-monochromatic-positive-400-hover` | dataviz\_monochromatic-positive-400-hover | #0c796b |  |
| `--hop-dataviz-monochromatic-positive-500-hover` | dataviz\_monochromatic-positive-500-hover | #0a6f64 |  |
| `--hop-dataviz-monochromatic-positive-600-hover` | dataviz\_monochromatic-positive-600-hover | #115a52 |  |
| `--hop-dataviz-monochromatic-positive-700-hover` | dataviz\_monochromatic-positive-700-hover | #16433d |  |
| `--hop-dataviz-monochromatic-positive-800-hover` | dataviz\_monochromatic-positive-800-hover | #132a27 |  |
| `--hop-dataviz-monochromatic-positive-900-hover` | dataviz\_monochromatic-positive-900-hover | #0a1716 |  |

#### [Monochromatic - Negative](https://hopper.workleap.design/tokens/semantic/color\#monochromatic-negative)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-monochromatic-negative-25` | dataviz\_monochromatic-negative-25 | #fdf6f6 |  |
| `--hop-dataviz-monochromatic-negative-50` | dataviz\_monochromatic-negative-50 | #fde6e5 |  |
| `--hop-dataviz-monochromatic-negative-75` | dataviz\_monochromatic-negative-75 | #ffd6d3 |  |
| `--hop-dataviz-monochromatic-negative-100` | dataviz\_monochromatic-negative-100 | #ffbcb7 |  |
| `--hop-dataviz-monochromatic-negative-200` | dataviz\_monochromatic-negative-200 | #ff8e8e |  |
| `--hop-dataviz-monochromatic-negative-300` | dataviz\_monochromatic-negative-300 | #f56263 |  |
| `--hop-dataviz-monochromatic-negative-400` | dataviz\_monochromatic-negative-400 | #df3236 |  |
| `--hop-dataviz-monochromatic-negative-500` | dataviz\_monochromatic-negative-500 | #cb2e31 |  |
| `--hop-dataviz-monochromatic-negative-600` | dataviz\_monochromatic-negative-600 | #ba2d2d |  |
| `--hop-dataviz-monochromatic-negative-700` | dataviz\_monochromatic-negative-700 | #952927 |  |
| `--hop-dataviz-monochromatic-negative-800` | dataviz\_monochromatic-negative-800 | #6c2320 |  |
| `--hop-dataviz-monochromatic-negative-900` | dataviz\_monochromatic-negative-900 | #431a17 |  |
| `--hop-dataviz-monochromatic-negative-25-hover` | dataviz\_monochromatic-negative-25-hover | #fde6e5 |  |
| `--hop-dataviz-monochromatic-negative-50-hover` | dataviz\_monochromatic-negative-50-hover | #ffd6d3 |  |
| `--hop-dataviz-monochromatic-negative-75-hover` | dataviz\_monochromatic-negative-75-hover | #ffbcb7 |  |
| `--hop-dataviz-monochromatic-negative-100-hover` | dataviz\_monochromatic-negative-100-hover | #ff8e8e |  |
| `--hop-dataviz-monochromatic-negative-200-hover` | dataviz\_monochromatic-negative-200-hover | #f56263 |  |
| `--hop-dataviz-monochromatic-negative-300-hover` | dataviz\_monochromatic-negative-300-hover | #df3236 |  |
| `--hop-dataviz-monochromatic-negative-400-hover` | dataviz\_monochromatic-negative-400-hover | #cb2e31 |  |
| `--hop-dataviz-monochromatic-negative-500-hover` | dataviz\_monochromatic-negative-500-hover | #ba2d2d |  |
| `--hop-dataviz-monochromatic-negative-600-hover` | dataviz\_monochromatic-negative-600-hover | #952927 |  |
| `--hop-dataviz-monochromatic-negative-700-hover` | dataviz\_monochromatic-negative-700-hover | #6c2320 |  |
| `--hop-dataviz-monochromatic-negative-800-hover` | dataviz\_monochromatic-negative-800-hover | #431a17 |  |
| `--hop-dataviz-monochromatic-negative-900-hover` | dataviz\_monochromatic-negative-900-hover | #2d100d |  |

#### [Diverging Sequence 1](https://hopper.workleap.design/tokens/semantic/color\#diverging-sequence-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-diverging-sequence-1-positive9` | dataviz\_diverging-sequence-1-positive9 | #16433d |  |
| `--hop-dataviz-diverging-sequence-1-positive9-hover` | dataviz\_diverging-sequence-1-positive9-hover | #132a27 |  |
| `--hop-dataviz-diverging-sequence-1-positive8` | dataviz\_diverging-sequence-1-positive8 | #115a52 |  |
| `--hop-dataviz-diverging-sequence-1-positive8-hover` | dataviz\_diverging-sequence-1-positive8-hover | #16433d |  |
| `--hop-dataviz-diverging-sequence-1-positive7` | dataviz\_diverging-sequence-1-positive7 | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-1-positive7-hover` | dataviz\_diverging-sequence-1-positive7-hover | #115a52 |  |
| `--hop-dataviz-diverging-sequence-1-positive6` | dataviz\_diverging-sequence-1-positive6 | #0c796b |  |
| `--hop-dataviz-diverging-sequence-1-positive6-hover` | dataviz\_diverging-sequence-1-positive6-hover | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-1-positive5` | dataviz\_diverging-sequence-1-positive5 | #188a71 |  |
| `--hop-dataviz-diverging-sequence-1-positive5-hover` | dataviz\_diverging-sequence-1-positive5-hover | #0c796b |  |
| `--hop-dataviz-diverging-sequence-1-positive4` | dataviz\_diverging-sequence-1-positive4 | #47a584 |  |
| `--hop-dataviz-diverging-sequence-1-positive-4-hover` | dataviz\_diverging-sequence-1-positive-4-hover | #188a71 |  |
| `--hop-dataviz-diverging-sequence-1-positive3` | dataviz\_diverging-sequence-1-positive3 | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-1-positive3-hover` | dataviz\_diverging-sequence-1-positive3-hover | #47a584 |  |
| `--hop-dataviz-diverging-sequence-1-positive2` | dataviz\_diverging-sequence-1-positive2 | #aad89d |  |
| `--hop-dataviz-diverging-sequence-1-positive2-hover` | dataviz\_diverging-sequence-1-positive2-hover | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-1-positive1` | dataviz\_diverging-sequence-1-positive1 | #cde8ac |  |
| `--hop-dataviz-diverging-sequence-1-positive1-hover` | dataviz\_diverging-sequence-1-positive1-hover | #aad89d |  |
| `--hop-dataviz-diverging-sequence-1-neutral` | dataviz\_diverging-sequence-1-neutral | #f7e694 |  |
| `--hop-dataviz-diverging-sequence-1-neutral-hover` | dataviz\_diverging-sequence-1-neutral-hover | #eac96d |  |
| `--hop-dataviz-diverging-sequence-1-negative1` | dataviz\_diverging-sequence-1-negative1 | #ffd8be |  |
| `--hop-dataviz-diverging-sequence-1-negative1-hover` | dataviz\_diverging-sequence-1-negative1-hover | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-1-negative2` | dataviz\_diverging-sequence-1-negative2 | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-1-negative2-hover` | dataviz\_diverging-sequence-1-negative2-hover | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-1-negative3` | dataviz\_diverging-sequence-1-negative3 | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-1-negative3-hover` | dataviz\_diverging-sequence-1-negative3-hover | #f56263 |  |
| `--hop-dataviz-diverging-sequence-1-negative4` | dataviz\_diverging-sequence-1-negative4 | #f56263 |  |
| `--hop-dataviz-diverging-sequence-1-negative4-hover` | dataviz\_diverging-sequence-1-negative4-hover | #df3236 |  |
| `--hop-dataviz-diverging-sequence-1-negative5` | dataviz\_diverging-sequence-1-negative5 | #df3236 |  |
| `--hop-dataviz-diverging-sequence-1-negative5-hover` | dataviz\_diverging-sequence-1-negative5-hover | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-1-negative6` | dataviz\_diverging-sequence-1-negative6 | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-1-negative6-hover` | dataviz\_diverging-sequence-1-negative6-hover | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-1-negative7` | dataviz\_diverging-sequence-1-negative7 | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-1-negative7-hover` | dataviz\_diverging-sequence-1-negative7-hover | #952927 |  |
| `--hop-dataviz-diverging-sequence-1-negative8` | dataviz\_diverging-sequence-1-negative8 | #952927 |  |
| `--hop-dataviz-diverging-sequence-1-negative8-hover` | dataviz\_diverging-sequence-1-negative8-hover | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-1-negative9` | dataviz\_diverging-sequence-1-negative9 | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-1-negative9-hover` | dataviz\_diverging-sequence-1-negative9-hover | #431a17 |  |

#### [Diverging Sequence 2](https://hopper.workleap.design/tokens/semantic/color\#diverging-sequence-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-diverging-sequence-2-positive10` | dataviz\_diverging-sequence-2-positive10 | #16433d |  |
| `--hop-dataviz-diverging-sequence-2-positive10-hover` | dataviz\_diverging-sequence-2-positive10-hover | #132a27 |  |
| `--hop-dataviz-diverging-sequence-2-positive9` | dataviz\_diverging-sequence-2-positive9 | #115a52 |  |
| `--hop-dataviz-diverging-sequence-2-positive9-hover` | dataviz\_diverging-sequence-2-positive9-hover | #16433d |  |
| `--hop-dataviz-diverging-sequence-2-positive8` | dataviz\_diverging-sequence-2-positive8 | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-2-positive8-hover` | dataviz\_diverging-sequence-2-positive8-hover | #115a52 |  |
| `--hop-dataviz-diverging-sequence-2-positive7` | dataviz\_diverging-sequence-2-positive7 | #0c796b |  |
| `--hop-dataviz-diverging-sequence-2-positive7-hover` | dataviz\_diverging-sequence-2-positive7-hover | #0a6f64 |  |
| `--hop-dataviz-diverging-sequence-2-positive6` | dataviz\_diverging-sequence-2-positive6 | #188a71 |  |
| `--hop-dataviz-diverging-sequence-2-positive6-hover` | dataviz\_diverging-sequence-2-positive6-hover | #0c796b |  |
| `--hop-dataviz-diverging-sequence-2-positive5` | dataviz\_diverging-sequence-2-positive5 | #47a584 |  |
| `--hop-dataviz-diverging-sequence-2-positive5-hover` | dataviz\_diverging-sequence-2-positive5-hover | #188a71 |  |
| `--hop-dataviz-diverging-sequence-2-positive4` | dataviz\_diverging-sequence-2-positive4 | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-2-positive4-hover` | dataviz\_diverging-sequence-2-positive4-hover | #47a584 |  |
| `--hop-dataviz-diverging-sequence-2-positive3` | dataviz\_diverging-sequence-2-positive3 | #aad89d |  |
| `--hop-dataviz-diverging-sequence-2-positive3-hover` | dataviz\_diverging-sequence-2-positive3-hover | #7dc291 |  |
| `--hop-dataviz-diverging-sequence-2-positive2` | dataviz\_diverging-sequence-2-positive2 | #cde8ac |  |
| `--hop-dataviz-diverging-sequence-2-positive2-hover` | dataviz\_diverging-sequence-2-positive2-hover | #aad89d |  |
| `--hop-dataviz-diverging-sequence-2-positive1` | dataviz\_diverging-sequence-2-positive1 | #e3f3b9 |  |
| `--hop-dataviz-diverging-sequence-2-positive1-hover` | dataviz\_diverging-sequence-2-positive1-hover | #cde8ac |  |
| `--hop-dataviz-diverging-sequence-2-negative1` | dataviz\_diverging-sequence-2-negative1 | #fde6e5 |  |
| `--hop-dataviz-diverging-sequence-2-negative1-hover` | dataviz\_diverging-sequence-2-negative1-hover | #ffd6d3 |  |
| `--hop-dataviz-diverging-sequence-2-negative2` | dataviz\_diverging-sequence-2-negative2 | #ffd6d3 |  |
| `--hop-dataviz-diverging-sequence-2-negative2-hover` | dataviz\_diverging-sequence-2-negative2-hover | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-2-negative3` | dataviz\_diverging-sequence-2-negative3 | #ffbcb7 |  |
| `--hop-dataviz-diverging-sequence-2-negative3-hover` | dataviz\_diverging-sequence-2-negative3-hover | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-2-negative4` | dataviz\_diverging-sequence-2-negative4 | #ff8e8e |  |
| `--hop-dataviz-diverging-sequence-2-negative4-hover` | dataviz\_diverging-sequence-2-negative4-hover | #f56263 |  |
| `--hop-dataviz-diverging-sequence-2-negative5` | dataviz\_diverging-sequence-2-negative5 | #f56263 |  |
| `--hop-dataviz-diverging-sequence-2-negative5-hover` | dataviz\_diverging-sequence-2-negative5-hover | #df3236 |  |
| `--hop-dataviz-diverging-sequence-2-negative6` | dataviz\_diverging-sequence-2-negative6 | #df3236 |  |
| `--hop-dataviz-diverging-sequence-2-negative6-hover` | dataviz\_diverging-sequence-2-negative6-hover | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-2-negative7` | dataviz\_diverging-sequence-2-negative7 | #cb2e31 |  |
| `--hop-dataviz-diverging-sequence-2-negative7-hover` | dataviz\_diverging-sequence-2-negative7-hover | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-2-negative8` | dataviz\_diverging-sequence-2-negative8 | #ba2d2d |  |
| `--hop-dataviz-diverging-sequence-2-negative8-hover` | dataviz\_diverging-sequence-2-negative8-hover | #952927 |  |
| `--hop-dataviz-diverging-sequence-2-negative9` | dataviz\_diverging-sequence-2-negative9 | #952927 |  |
| `--hop-dataviz-diverging-sequence-2-negative9-hover` | dataviz\_diverging-sequence-2-negative9-hover | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-2-negative10` | dataviz\_diverging-sequence-2-negative10 | #6c2320 |  |
| `--hop-dataviz-diverging-sequence-2-negative10-hover` | dataviz\_diverging-sequence-2-negative10-hover | #431a17 |  |

#### [Categorical - Sequences](https://hopper.workleap.design/tokens/semantic/color\#categorical-sequences)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-sequence-category1` | dataviz\_categorical-sequence-category1 | #c7ebff |  |
| `--hop-dataviz-categorical-sequence-category1-hover` | dataviz\_categorical-sequence-category1-hover | #ade2ff |  |
| `--hop-dataviz-categorical-sequence-category2` | dataviz\_categorical-sequence-category2 | #ecd599 |  |
| `--hop-dataviz-categorical-sequence-category2-hover` | dataviz\_categorical-sequence-category2-hover | #e6c675 |  |
| `--hop-dataviz-categorical-sequence-category3` | dataviz\_categorical-sequence-category3 | #d2cdf8 |  |
| `--hop-dataviz-categorical-sequence-category3-hover` | dataviz\_categorical-sequence-category3-hover | #bfb8f5 |  |
| `--hop-dataviz-categorical-sequence-category4` | dataviz\_categorical-sequence-category4 | #b6bead |  |
| `--hop-dataviz-categorical-sequence-category4-hover` | dataviz\_categorical-sequence-category4-hover | #a4ae98 |  |
| `--hop-dataviz-categorical-sequence-category5` | dataviz\_categorical-sequence-category5 | #fbbdcf |  |
| `--hop-dataviz-categorical-sequence-category5-hover` | dataviz\_categorical-sequence-category5-hover | #f99fb8 |  |
| `--hop-dataviz-categorical-sequence-category6` | dataviz\_categorical-sequence-category6 | #bfdca9 |  |
| `--hop-dataviz-categorical-sequence-category6-hover` | dataviz\_categorical-sequence-category6-hover | #a9d08b |  |
| `--hop-dataviz-categorical-sequence-category7` | dataviz\_categorical-sequence-category7 | #fbe997 |  |
| `--hop-dataviz-categorical-sequence-category7-hover` | dataviz\_categorical-sequence-category7-hover | #fae275 |  |
| `--hop-dataviz-categorical-sequence-category8` | dataviz\_categorical-sequence-category8 | #e8ddd0 |  |
| `--hop-dataviz-categorical-sequence-category8-hover` | dataviz\_categorical-sequence-category8-hover | #ddcebb |  |
| `--hop-dataviz-categorical-sequence-category9` | dataviz\_categorical-sequence-category9 | #a7e6dc |  |
| `--hop-dataviz-categorical-sequence-category9-hover` | dataviz\_categorical-sequence-category9-hover | #90e0d2 |  |
| `--hop-dataviz-categorical-sequence-category10` | dataviz\_categorical-sequence-category10 | #aecdd5 |  |
| `--hop-dataviz-categorical-sequence-category10-hover` | dataviz\_categorical-sequence-category10-hover | #93bdc8 |  |
| `--hop-dataviz-categorical-sequence-category11` | dataviz\_categorical-sequence-category11 | #ffbf92 |  |
| `--hop-dataviz-categorical-sequence-category11-hover` | dataviz\_categorical-sequence-category11-hover | #ffac70 |  |
| `--hop-dataviz-categorical-sequence-category12` | dataviz\_categorical-sequence-category12 | #a0b8fa |  |
| `--hop-dataviz-categorical-sequence-category12-hover` | dataviz\_categorical-sequence-category12-hover | #779af8 |  |
| `--hop-dataviz-categorical-sequence-category13` | dataviz\_categorical-sequence-category13 | #69bfa0 |  |
| `--hop-dataviz-categorical-sequence-category13-hover` | dataviz\_categorical-sequence-category13-hover | #54b692 |  |

#### [Categorical - 2 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-2-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-2colorgroup-option6-category2` | dataviz\_categorical-2colorgroup-option6-category2 | #69bfa0 |  |
| `--hop-dataviz-categorical-2colorgroup-option6-category1` | dataviz\_categorical-2colorgroup-option6-category1 | #ffbf92 |  |
| `--hop-dataviz-categorical-2colorgroup-option5-category2` | dataviz\_categorical-2colorgroup-option5-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-2colorgroup-option5-category1` | dataviz\_categorical-2colorgroup-option5-category1 | #a7e6dc |  |
| `--hop-dataviz-categorical-2colorgroup-option4-category2` | dataviz\_categorical-2colorgroup-option4-category2 | #6c8ffd |  |
| `--hop-dataviz-categorical-2colorgroup-option4-category1` | dataviz\_categorical-2colorgroup-option4-category1 | #bfdca9 |  |
| `--hop-dataviz-categorical-2colorgroup-option3-category2` | dataviz\_categorical-2colorgroup-option3-category2 | #ff9b3f |  |
| `--hop-dataviz-categorical-2colorgroup-option3-category1` | dataviz\_categorical-2colorgroup-option3-category1 | #2f48ff |  |
| `--hop-dataviz-categorical-2colorgroup-option2-category2` | dataviz\_categorical-2colorgroup-option2-category2 | #fbe997 |  |
| `--hop-dataviz-categorical-2colorgroup-option2-category1` | dataviz\_categorical-2colorgroup-option2-category1 | #fbbdcf |  |
| `--hop-dataviz-categorical-2colorgroup-option1-category2` | dataviz\_categorical-2colorgroup-option1-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-2colorgroup-option1-category1` | dataviz\_categorical-2colorgroup-option1-category1 | #b6bead |  |

#### [Categorical - 3 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-3-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-3colorgroup-option1-category1` | dataviz\_categorical-3colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-3colorgroup-option1-category2` | dataviz\_categorical-3colorgroup-option1-category2 | #d2cdf8 |  |
| `--hop-dataviz-categorical-3colorgroup-option1-category3` | dataviz\_categorical-3colorgroup-option1-category3 | #bfdca9 |  |
| `--hop-dataviz-categorical-3colorgroup-option2-category1` | dataviz\_categorical-3colorgroup-option2-category1 | #ecd599 |  |
| `--hop-dataviz-categorical-3colorgroup-option2-category2` | dataviz\_categorical-3colorgroup-option2-category2 | #a7e6dc |  |
| `--hop-dataviz-categorical-3colorgroup-option2-category3` | dataviz\_categorical-3colorgroup-option2-category3 | #69bfa0 |  |
| `--hop-dataviz-categorical-3colorgroup-option3-category1` | dataviz\_categorical-3colorgroup-option3-category1 | #69bfa0 |  |
| `--hop-dataviz-categorical-3colorgroup-option3-category2` | dataviz\_categorical-3colorgroup-option3-category2 | #fbe997 |  |
| `--hop-dataviz-categorical-3colorgroup-option3-category3` | dataviz\_categorical-3colorgroup-option3-category3 | #aecdd5 |  |
| `--hop-dataviz-categorical-3colorgroup-option4-category1` | dataviz\_categorical-3colorgroup-option4-category1 | #b6bead |  |
| `--hop-dataviz-categorical-3colorgroup-option4-category2` | dataviz\_categorical-3colorgroup-option4-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-3colorgroup-option4-category3` | dataviz\_categorical-3colorgroup-option4-category3 | #fbbdcf |  |

#### [Categorical - 4 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-4-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-4colorgroup-option1-category1` | dataviz\_categorical-4colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-4colorgroup-option1-category2` | dataviz\_categorical-4colorgroup-option1-category2 | #d2cdf8 |  |
| `--hop-dataviz-categorical-4colorgroup-option1-category3` | dataviz\_categorical-4colorgroup-option1-category3 | #cde8ac |  |
| `--hop-dataviz-categorical-4colorgroup-option1-category4` | dataviz\_categorical-4colorgroup-option1-category4 | #fbbdcf |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category1` | dataviz\_categorical-4colorgroup-option2-category1 | #b6bead |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category2` | dataviz\_categorical-4colorgroup-option2-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category3` | dataviz\_categorical-4colorgroup-option2-category3 | #84d0b4 |  |
| `--hop-dataviz-categorical-4colorgroup-option2-category4` | dataviz\_categorical-4colorgroup-option2-category4 | #fbe997 |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category1` | dataviz\_categorical-4colorgroup-option3-category1 | #ffbf92 |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category2` | dataviz\_categorical-4colorgroup-option3-category2 | #b6bead |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category3` | dataviz\_categorical-4colorgroup-option3-category3 | #2e70a8 |  |
| `--hop-dataviz-categorical-4colorgroup-option3-category4` | dataviz\_categorical-4colorgroup-option3-category4 | #ecd599 |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category1` | dataviz\_categorical-4colorgroup-option4-category1 | #69bfa0 |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category2` | dataviz\_categorical-4colorgroup-option4-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category3` | dataviz\_categorical-4colorgroup-option4-category3 | #fa4d59 |  |
| `--hop-dataviz-categorical-4colorgroup-option4-category4` | dataviz\_categorical-4colorgroup-option4-category4 | #d2cdf8 |  |

#### [Categorical - 5 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-5-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-5colorgroup-option1-category1` | dataviz\_categorical-5colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category2` | dataviz\_categorical-5colorgroup-option1-category2 | #ff9b3f |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category3` | dataviz\_categorical-5colorgroup-option1-category3 | #bfdca9 |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category4` | dataviz\_categorical-5colorgroup-option1-category4 | #ecd599 |  |
| `--hop-dataviz-categorical-5colorgroup-option1-category5` | dataviz\_categorical-5colorgroup-option1-category5 | #69bfa0 |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category1` | dataviz\_categorical-5colorgroup-option2-category1 | #ff9b3f |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category2` | dataviz\_categorical-5colorgroup-option2-category2 | #b6bead |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category3` | dataviz\_categorical-5colorgroup-option2-category3 | #2e70a8 |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category4` | dataviz\_categorical-5colorgroup-option2-category4 | #fbe997 |  |
| `--hop-dataviz-categorical-5colorgroup-option2-category5` | dataviz\_categorical-5colorgroup-option2-category5 | #c5bef6 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category1` | dataviz\_categorical-5colorgroup-option3-category1 | #d2cdf8 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category2` | dataviz\_categorical-5colorgroup-option3-category2 | #ecd599 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category3` | dataviz\_categorical-5colorgroup-option3-category3 | #aecdd5 |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category4` | dataviz\_categorical-5colorgroup-option3-category4 | #b6bead |  |
| `--hop-dataviz-categorical-5colorgroup-option3-category5` | dataviz\_categorical-5colorgroup-option3-category5 | #ffbf92 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category1` | dataviz\_categorical-5colorgroup-option4-category1 | #69bfa0 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category2` | dataviz\_categorical-5colorgroup-option4-category2 | #c7ebff |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category3` | dataviz\_categorical-5colorgroup-option4-category3 | #fa4d59 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category4` | dataviz\_categorical-5colorgroup-option4-category4 | #d2cdf8 |  |
| `--hop-dataviz-categorical-5colorgroup-option4-category5` | dataviz\_categorical-5colorgroup-option4-category5 | #b6bead |  |

#### [Categorical - 6 Color Groups](https://hopper.workleap.design/tokens/semantic/color\#categorical-6-color-groups)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-categorical-6colorgroup-option1-category1` | dataviz\_categorical-6colorgroup-option1-category1 | #b6bead |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category2` | dataviz\_categorical-6colorgroup-option1-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category3` | dataviz\_categorical-6colorgroup-option1-category3 | #bfdca9 |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category4` | dataviz\_categorical-6colorgroup-option1-category4 | #fa4d59 |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category5` | dataviz\_categorical-6colorgroup-option1-category5 | #ecd599 |  |
| `--hop-dataviz-categorical-6colorgroup-option1-category6` | dataviz\_categorical-6colorgroup-option1-category6 | #69bfa0 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category1` | dataviz\_categorical-6colorgroup-option2-category1 | #2e70a8 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category2` | dataviz\_categorical-6colorgroup-option2-category2 | #fbe997 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category3` | dataviz\_categorical-6colorgroup-option2-category3 | #69bfa0 |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category4` | dataviz\_categorical-6colorgroup-option2-category4 | #ff9b3f |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category5` | dataviz\_categorical-6colorgroup-option2-category5 | #a7e6dc |  |
| `--hop-dataviz-categorical-6colorgroup-option2-category6` | dataviz\_categorical-6colorgroup-option2-category6 | #d2cdf8 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category1` | dataviz\_categorical-6colorgroup-option3-category1 | #b6bead |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category2` | dataviz\_categorical-6colorgroup-option3-category2 | #aecdd5 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category3` | dataviz\_categorical-6colorgroup-option3-category3 | #e8ddd0 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category4` | dataviz\_categorical-6colorgroup-option3-category4 | #a7e6dc |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category5` | dataviz\_categorical-6colorgroup-option3-category5 | #2e70a8 |  |
| `--hop-dataviz-categorical-6colorgroup-option3-category6` | dataviz\_categorical-6colorgroup-option3-category6 | #fbbdcf |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category1` | dataviz\_categorical-6colorgroup-option4-category1 | #fbbdcf |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category2` | dataviz\_categorical-6colorgroup-option4-category2 | #a0b8fa |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category3` | dataviz\_categorical-6colorgroup-option4-category3 | #ffbf92 |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category4` | dataviz\_categorical-6colorgroup-option4-category4 | #c7ebff |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category5` | dataviz\_categorical-6colorgroup-option4-category5 | #bfdca9 |  |
| `--hop-dataviz-categorical-6colorgroup-option4-category6` | dataviz\_categorical-6colorgroup-option4-category6 | #fbe997 |  |

## [Dark Tokens](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens)

### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-neutral-border-active` | neutral-active | #505050 |  |
| `--hop-neutral-icon-active` | neutral-active | #fef6ef |  |
| `--hop-neutral-icon-weak-active` | neutral-weak-active | #ecebe8 |  |
| `--hop-neutral-surface-active` | neutral-active | #505050 |  |
| `--hop-neutral-surface-weak-active` | neutral-weak-active | #636362 |  |
| `--hop-neutral-text-active` | neutral-active | #fef6ef |  |
| `--hop-neutral-text-weak-active` | neutral-weak-active | #ecebe8 |  |
| `--hop-neutral-border` | neutral | #6c6c6b |  |
| `--hop-neutral-border-selected` | neutral-selected | #fef6ef |  |
| `--hop-neutral-border-disabled` | neutral-disabled | #3c3c3c |  |
| `--hop-neutral-border-hover` | neutral-hover | #959593 |  |
| `--hop-neutral-border-press` | neutral-press | #b3b3b1 |  |
| `--hop-neutral-border-strong` | neutral-strong | #ffffff |  |
| `--hop-neutral-border-strong-hover` | neutral-strong-hover | #ffffff |  |
| `--hop-neutral-border-weakest` | neutral-weakest | #3c3c3c |  |
| `--hop-neutral-border-weak` | neutral-weak | #3c3c3c |  |
| `--hop-neutral-icon` | neutral | #f8f6f3 |  |
| `--hop-neutral-icon-selected` | neutral-selected | #292929 |  |
| `--hop-neutral-icon-disabled` | neutral-disabled | #6c6c6b |  |
| `--hop-neutral-icon-hover` | neutral-hover | #ecebe8 |  |
| `--hop-neutral-icon-press` | neutral-press | #fef6ef |  |
| `--hop-neutral-icon-strong` | neutral-strong | #292929 |  |
| `--hop-neutral-icon-strong-hover` | neutral-strong-hover | #292929 |  |
| `--hop-neutral-icon-weak` | neutral-weak | #b3b3b1 |  |
| `--hop-neutral-icon-weak-hover` | neutral-weak-hover | #e0dfdd |  |
| `--hop-neutral-icon-weak-press` | neutral-weak-press | #ecebe8 |  |
| `--hop-neutral-icon-weak-selected` | neutral-weak-selected | #e0dfdd |  |
| `--hop-neutral-icon-weakest` | neutral-weakest | #777775 |  |
| `--hop-neutral-surface` | neutral | #1d1d1c |  |
| `--hop-neutral-surface-selected` | neutral-selected | #fef6ef |  |
| `--hop-neutral-surface-disabled` | neutral-disabled | #505050 |  |
| `--hop-neutral-surface-hover` | neutral-hover | #3c3c3c |  |
| `--hop-neutral-surface-press` | neutral-press | #505050 |  |
| `--hop-neutral-surface-strong` | neutral-strong | #fef6ef |  |
| `--hop-neutral-surface-weakest` | neutral-weakest | #292929 |  |
| `--hop-neutral-surface-weak` | neutral-weak | #3c3c3c |  |
| `--hop-neutral-surface-weak-selected` | neutral-weak-selected | #3c3c3c |  |
| `--hop-neutral-surface-weak-hover` | neutral-weak-hover | #505050 |  |
| `--hop-neutral-surface-weak-press` | neutral-weak-press | #636362 |  |
| `--hop-neutral-surface-weakest-selected` | neutral-weakest-selected | #3c3c3c |  |
| `--hop-neutral-surface-weakest-hover` | neutral-weakest-hover | #3c3c3c |  |
| `--hop-neutral-text` | neutral | #f8f6f3 |  |
| `--hop-neutral-text-selected` | neutral-selected | #292929 |  |
| `--hop-neutral-text-disabled` | neutral-disabled | #6c6c6b |  |
| `--hop-neutral-text-hover` | neutral-hover | #ecebe8 |  |
| `--hop-neutral-text-press` | neutral-press | #fef6ef |  |
| `--hop-neutral-text-strong` | neutral-strong | #292929 |  |
| `--hop-neutral-text-weak` | neutral-weak | #b3b3b1 |  |
| `--hop-neutral-text-weak-hover` | neutral-weak-hover | #e0dfdd |  |
| `--hop-neutral-text-weak-press` | neutral-weak-press | #ecebe8 |  |
| `--hop-neutral-text-weak-selected` | neutral-weak-selected | #e0dfdd |  |
| `--hop-neutral-text-weakest` | neutral-weakest | #959593 |  |

### [Primary](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-primary)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-primary-border-active` | primary-active | #3b57ff |  |
| `--hop-primary-icon-active` | primary-active | #d6e0ff |  |
| `--hop-primary-surface-active` | primary-active | #3b57ff |  |
| `--hop-primary-surface-strong-active` | primary-strong-active | #2a43e8 |  |
| `--hop-primary-surface-weak-active` | primary-weak-active | #2a43e8 |  |
| `--hop-primary-text-active` | primary-active | #d6e0ff |  |
| `--hop-primary-border` | primary | #6c8ffd |  |
| `--hop-primary-border-selected` | primary-selected | #6c8ffd |  |
| `--hop-primary-border-focus` | primary-focus | #95b1ff |  |
| `--hop-primary-border-press` | primary-press | #3b57ff |  |
| `--hop-primary-icon` | primary | #95b1ff |  |
| `--hop-primary-icon-selected` | primary-selected | #95b1ff |  |
| `--hop-primary-icon-disabled` | primary-disabled | #2040c7 |  |
| `--hop-primary-icon-hover` | primary-hover | #6c8ffd |  |
| `--hop-primary-icon-press` | primary-press | #d6e0ff |  |
| `--hop-primary-icon-strong` | primary-strong | #ffffff |  |
| `--hop-primary-icon-strong-hover` | primary-strong-hover | #6c8ffd |  |
| `--hop-primary-surface` | primary | #95b1ff |  |
| `--hop-primary-surface-selected` | primary-selected | #1b3587 |  |
| `--hop-primary-surface-disabled` | primary-disabled | #2040c7 |  |
| `--hop-primary-surface-focus` | primary-focus | #152450 |  |
| `--hop-primary-surface-hover` | primary-hover | #4767fe |  |
| `--hop-primary-surface-press` | primary-press | #3b57ff |  |
| `--hop-primary-surface-strong` | primary-strong | #4767fe |  |
| `--hop-primary-surface-strong-selected` | primary-strong-selected | #1b3587 |  |
| `--hop-primary-surface-strong-hover` | primary-strong-hover | #3b57ff |  |
| `--hop-primary-surface-strong-press` | primary-strong-press | #2a43e8 |  |
| `--hop-primary-surface-weak` | primary-weak | #1b3587 |  |
| `--hop-primary-surface-weak-hover` | primary-weak-hover | #2040c7 |  |
| `--hop-primary-surface-weak-press` | primary-weak-press | #2a43e8 |  |
| `--hop-primary-text` | primary | #b9cbff |  |
| `--hop-primary-text-hover` | primary-hover | #95b1ff |  |
| `--hop-primary-text-press` | primary-press | #d6e0ff |  |
| `--hop-primary-text-strong` | primary-strong | #ffffff |  |
| `--hop-primary-text-strong-hover` | primary-strong-hover | #ffffff |  |
| `--hop-primary-text-selected` | primary-selected | #95b1ff |  |
| `--hop-primary-text-disabled` | primary-disabled | #2040c7 |  |

### [Success](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-success)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-success-border` | success | #0c796b |  |
| `--hop-success-icon` | success | #132a27 |  |
| `--hop-success-icon-weakest` | success-weakest | #7dc291 |  |
| `--hop-success-icon-weak` | success-weak | #cde8ac |  |
| `--hop-success-surface` | success | #cde8ac |  |
| `--hop-success-surface-strong` | success-strong | #47a584 |  |
| `--hop-success-surface-weak` | success-weak | #16433d |  |
| `--hop-success-text` | success | #132a27 |  |
| `--hop-success-text-weak` | success-weak | #cde8ac |  |
| `--hop-success-text-hover` | success-hover | #115a52 |  |

### [Warning](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-warning)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-warning-border` | warning | #ba4705 |  |
| `--hop-warning-icon` | warning | #451a02 |  |
| `--hop-warning-icon-weakest` | warning-weakest | #ff9b3f |  |
| `--hop-warning-icon-weak` | warning-weak | #ffd8be |  |
| `--hop-warning-surface` | warning | #ffd8be |  |
| `--hop-warning-surface-strong` | warning-strong | #e57723 |  |
| `--hop-warning-surface-weak` | warning-weak | #692803 |  |
| `--hop-warning-text` | warning | #451a02 |  |
| `--hop-warning-text-weak` | warning-weak | #ffd8be |  |

### [Danger](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-danger)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-danger-border-active` | danger-active | #fa4d59 |  |
| `--hop-danger-icon-active` | danger-active | #fde6e5 |  |
| `--hop-danger-icon-weak-active` | danger-weak-active | #fa4d59 |  |
| `--hop-danger-surface-active` | danger-active | #ba2d2d |  |
| `--hop-danger-surface-weak-active` | danger-weak-active | #ba2d2d |  |
| `--hop-danger-text-active` | danger-active | #fde6e5 |  |
| `--hop-danger-text-weak-active` | danger-weak-active | #fa4d59 |  |
| `--hop-danger-border` | danger | #cb2e31 |  |
| `--hop-danger-border-selected` | danger-selected | #ffbcb7 |  |
| `--hop-danger-border-press` | danger-press | #df3236 |  |
| `--hop-danger-border-strong` | danger-strong | #fa4d59 |  |
| `--hop-danger-icon` | danger | #431a17 |  |
| `--hop-danger-icon-selected` | danger-selected | #ffbcb7 |  |
| `--hop-danger-icon-disabled` | danger-disabled | #ba2d2d |  |
| `--hop-danger-icon-hover` | danger-hover | #ff8e8e |  |
| `--hop-danger-icon-press` | danger-press | #fde6e5 |  |
| `--hop-danger-icon-strong` | danger-strong | #ffffff |  |
| `--hop-danger-icon-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-icon-weak` | danger-weak | #ffbcb7 |  |
| `--hop-danger-icon-weak-hover` | danger-weak-hover | #ff8e8e |  |
| `--hop-danger-icon-weak-press` | danger-weak-press | #fa4d59 |  |
| `--hop-danger-icon-weakest` | danger-weakest | #ffbcb7 |  |
| `--hop-danger-surface` | danger | #ff8e8e |  |
| `--hop-danger-surface-selected` | danger-selected | #6c2320 |  |
| `--hop-danger-surface-disabled` | danger-disabled | #ba2d2d |  |
| `--hop-danger-surface-hover` | danger-hover | #fa4d59 |  |
| `--hop-danger-surface-press` | danger-press | #ba2d2d |  |
| `--hop-danger-surface-strong` | danger-strong | #df3236 |  |
| `--hop-danger-surface-strong-hover` | danger-strong-hover | #cb2e31 |  |
| `--hop-danger-surface-weak` | danger-weak | #431a17 |  |
| `--hop-danger-surface-weak-hover` | danger-weak-hover | #952927 |  |
| `--hop-danger-surface-weak-press` | danger-weak-press | #ba2d2d |  |
| `--hop-danger-text` | danger | #431a17 |  |
| `--hop-danger-text-selected` | danger-selected | #ffbcb7 |  |
| `--hop-danger-text-disabled` | danger-disabled | #ba2d2d |  |
| `--hop-danger-text-hover` | danger-hover | #ff8e8e |  |
| `--hop-danger-text-press` | danger-press | #fde6e5 |  |
| `--hop-danger-text-strong` | danger-strong | #ffffff |  |
| `--hop-danger-text-strong-hover` | danger-strong-hover | #ffffff |  |
| `--hop-danger-text-weak` | danger-weak | #ffbcb7 |  |
| `--hop-danger-text-weak-hover` | danger-weak-hover | #ff8e8e |  |
| `--hop-danger-text-weak-press` | danger-weak-press | #fa4d59 |  |

### [Information](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-information)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-information-border` | information | #3a7bb2 |  |
| `--hop-information-icon` | information | #00274b |  |
| `--hop-information-icon-weakest` | information-weakest | #81b9e4 |  |
| `--hop-information-icon-weak` | information-weak | #5d9acd |  |
| `--hop-information-surface` | information | #bae6ff |  |
| `--hop-information-surface-strong` | information-strong | #5d9acd |  |
| `--hop-information-surface-weak` | information-weak | #003d70 |  |
| `--hop-information-text` | information | #00274b |  |
| `--hop-information-text-weak` | information-weak | #bae6ff |  |

### [Upsell](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-upsell)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-upsell-border-active` | upsell-active | #996f08 |  |
| `--hop-upsell-icon-active` | upsell-active | #2f250d |  |
| `--hop-upsell-icon-weak-active` | upsell-weak-active | #c28b12 |  |
| `--hop-upsell-surface-active` | upsell-active | #c28b12 |  |
| `--hop-upsell-surface-weak-active` | upsell-weak-active | #7e5e0a |  |
| `--hop-upsell-text-active` | upsell-active | #2f250d |  |
| `--hop-upsell-text-weak-active` | upsell-weak-active | #c28b12 |  |
| `--hop-upsell-border` | upsell | #e2a934 |  |
| `--hop-upsell-border-selected` | upsell-selected | #eac96d |  |
| `--hop-upsell-border-disabled` | upsell-disabled | #654c0d |  |
| `--hop-upsell-border-press` | upsell-press | #996f08 |  |
| `--hop-upsell-icon` | upsell | #654c0d |  |
| `--hop-upsell-icon-selected` | upsell-selected | #eac96d |  |
| `--hop-upsell-icon-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-icon-press` | upsell-press | #2f250d |  |
| `--hop-upsell-icon-weakest` | upsell-weakest | #eac96d |  |
| `--hop-upsell-icon-weak` | upsell-weak | #eac96d |  |
| `--hop-upsell-icon-weak-hover` | upsell-weak-hover | #e2a934 |  |
| `--hop-upsell-icon-weak-press` | upsell-weak-press | #c28b12 |  |
| `--hop-upsell-surface` | upsell | #f7e694 |  |
| `--hop-upsell-surface-selected` | upsell-selected | #4b390f |  |
| `--hop-upsell-surface-disabled` | upsell-disabled | #654c0d |  |
| `--hop-upsell-surface-hover` | upsell-hover | #eac96d |  |
| `--hop-upsell-surface-press` | upsell-press | #e2a934 |  |
| `--hop-upsell-surface-weak` | upsell-weak | #4b390f |  |
| `--hop-upsell-surface-weak-hover` | upsell-weak-hover | #654c0d |  |
| `--hop-upsell-surface-weak-press` | upsell-weak-press | #7e5e0a |  |
| `--hop-upsell-text` | upsell | #654c0d |  |
| `--hop-upsell-text-selected` | upsell-selected | #eac96d |  |
| `--hop-upsell-text-disabled` | upsell-disabled | #c28b12 |  |
| `--hop-upsell-text-hover` | upsell-hover | #4b390f |  |
| `--hop-upsell-text-press` | upsell-press | #2f250d |  |
| `--hop-upsell-text-weak` | upsell-weak | #eac96d |  |
| `--hop-upsell-text-weak-hover` | upsell-weak-hover | #e2a934 |  |
| `--hop-upsell-text-weak-press` | upsell-weak-press | #c28b12 |  |

### [Decorative](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-decorative)

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option1-border` | decorative-option1 | #4767fe |  |
| `--hop-decorative-option1-icon` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-surface` | decorative-option1 | #b9cbff |  |
| `--hop-decorative-option1-surface-hover` | decorative-option1-hover | #95b1ff |  |
| `--hop-decorative-option1-surface-strong` | decorative-option1-strong | #95b1ff |  |
| `--hop-decorative-option1-surface-weak` | decorative-option1-weak | #e6ebff |  |
| `--hop-decorative-option1-surface-weak-hover` | decorative-option1-weak-hover | #d6e0ff |  |
| `--hop-decorative-option1-surface-weakest` | decorative-option1-weakest | #f5f6ff |  |
| `--hop-decorative-option1-text` | decorative-option1 | #152450 |  |
| `--hop-decorative-option1-text-weak` | decorative-option1-weak | #6c8ffd |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option2-border` | decorative-option2 | #38836a |  |
| `--hop-decorative-option2-icon` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-surface` | decorative-option2 | #a3d6cb |  |
| `--hop-decorative-option2-surface-hover` | decorative-option2-hover | #83beaf |  |
| `--hop-decorative-option2-surface-strong` | decorative-option2-strong | #83beaf |  |
| `--hop-decorative-option2-surface-weak` | decorative-option2-weak | #cff4ef |  |
| `--hop-decorative-option2-surface-weak-hover` | decorative-option2-weak-hover | #bde8e1 |  |
| `--hop-decorative-option2-surface-weakest` | decorative-option2-weakest | #ddfdf9 |  |
| `--hop-decorative-option2-text` | decorative-option2 | #002d1c |  |
| `--hop-decorative-option2-text-weak` | decorative-option2-weak | #5da18c |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option3-border` | decorative-option3 | #c95109 |  |
| `--hop-decorative-option3-icon` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-surface` | decorative-option3 | #ffbf92 |  |
| `--hop-decorative-option3-surface-hover` | decorative-option3-hover | #ff9b3f |  |
| `--hop-decorative-option3-surface-strong` | decorative-option3-strong | #ff9b3f |  |
| `--hop-decorative-option3-surface-weak` | decorative-option3-weak | #ffe8d3 |  |
| `--hop-decorative-option3-surface-weak-hover` | decorative-option3-weak-hover | #ffd8be |  |
| `--hop-decorative-option3-surface-weakest` | decorative-option3-weakest | #fff5e9 |  |
| `--hop-decorative-option3-text` | decorative-option3 | #451a02 |  |
| `--hop-decorative-option3-text-weak` | decorative-option3-weak | #e57723 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option4-border` | decorative-option4 | #188a71 |  |
| `--hop-decorative-option4-icon` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-surface` | decorative-option4 | #cde8ac |  |
| `--hop-decorative-option4-surface-hover` | decorative-option4-hover | #aad89d |  |
| `--hop-decorative-option4-surface-strong` | decorative-option4-strong | #aad89d |  |
| `--hop-decorative-option4-surface-weak` | decorative-option4-weak | #e3f3b9 |  |
| `--hop-decorative-option4-surface-weak-hover` | decorative-option4-weak-hover | #cde8ac |  |
| `--hop-decorative-option4-surface-weakest` | decorative-option4-weakest | #f4f9e9 |  |
| `--hop-decorative-option4-text` | decorative-option4 | #132a27 |  |
| `--hop-decorative-option4-text-weak` | decorative-option4-weak | #188a71 |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option5-border` | decorative-option5 | #3a7bb2 |  |
| `--hop-decorative-option5-icon` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-surface` | decorative-option5 | #bae6ff |  |
| `--hop-decorative-option5-surface-hover` | decorative-option5-hover | #9fd2f7 |  |
| `--hop-decorative-option5-surface-strong` | decorative-option5-strong | #9fd2f7 |  |
| `--hop-decorative-option5-surface-weak` | decorative-option5-weak | #d9efff |  |
| `--hop-decorative-option5-surface-weak-hover` | decorative-option5-weak-hover | #bae6ff |  |
| `--hop-decorative-option5-surface-weakest` | decorative-option5-weakest | #f0f8ff |  |
| `--hop-decorative-option5-text` | decorative-option5 | #00274b |  |
| `--hop-decorative-option5-text-weak` | decorative-option5-weak | #5d9acd |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option6-border` | decorative-option6 | #996f08 |  |
| `--hop-decorative-option6-icon` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-surface` | decorative-option6 | #f7e694 |  |
| `--hop-decorative-option6-surface-hover` | decorative-option6-hover | #eac96d |  |
| `--hop-decorative-option6-surface-strong` | decorative-option6-strong | #eac96d |  |
| `--hop-decorative-option6-surface-weak` | decorative-option6-weak | #fff2b8 |  |
| `--hop-decorative-option6-surface-weak-hover` | decorative-option6-weak-hover | #f7e694 |  |
| `--hop-decorative-option6-surface-weakest` | decorative-option6-weakest | #fff8d6 |  |
| `--hop-decorative-option6-text` | decorative-option6 | #2f250d |  |
| `--hop-decorative-option6-text-weak` | decorative-option6-weak | #e2a934 |  |

#### [Option 7](https://hopper.workleap.design/tokens/semantic/color\#option-7)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option7-border` | decorative-option7 | #837463 |  |
| `--hop-decorative-option7-icon` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-surface` | decorative-option7 | #f0eae3 |  |
| `--hop-decorative-option7-surface-hover` | decorative-option7-hover | #d4cbc0 |  |
| `--hop-decorative-option7-surface-strong` | decorative-option7-strong | #d4cbc0 |  |
| `--hop-decorative-option7-surface-weak` | decorative-option7-weak | #f0eae3 |  |
| `--hop-decorative-option7-surface-weak-hover` | decorative-option7-weak-hover | #e5ded6 |  |
| `--hop-decorative-option7-surface-weakest` | decorative-option7-weakest | #fef6ef |  |
| `--hop-decorative-option7-text` | decorative-option7 | #2a2620 |  |
| `--hop-decorative-option7-text-weak` | decorative-option7-weak | #776a59 |  |

#### [Option 8](https://hopper.workleap.design/tokens/semantic/color\#option-8)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option8-border` | decorative-option8 | #df3236 |  |
| `--hop-decorative-option8-icon` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-surface` | decorative-option8 | #ffd6d3 |  |
| `--hop-decorative-option8-surface-hover` | decorative-option8-hover | #ff8e8e |  |
| `--hop-decorative-option8-surface-strong` | decorative-option8-strong | #ffbcb7 |  |
| `--hop-decorative-option8-surface-weak` | decorative-option8-weak | #fde6e5 |  |
| `--hop-decorative-option8-surface-weak-hover` | decorative-option8-weak-hover | #ffd6d3 |  |
| `--hop-decorative-option8-surface-weakest` | decorative-option8-weakest | #fdf6f6 |  |
| `--hop-decorative-option8-text` | decorative-option8 | #431a17 |  |
| `--hop-decorative-option8-text-weak` | decorative-option8-weak | #fa4d59 |  |

#### [Option 9](https://hopper.workleap.design/tokens/semantic/color\#option-9)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-decorative-option9-border` | decorative-option9 | #777775 |  |
| `--hop-decorative-option9-icon` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-surface` | decorative-option9 | #777775 |  |
| `--hop-decorative-option9-surface-hover` | decorative-option9-hover | #6c6c6b |  |
| `--hop-decorative-option9-surface-strong` | decorative-option9-strong | #3c3c3c |  |
| `--hop-decorative-option9-surface-weak` | decorative-option9-weak | #959593 |  |
| `--hop-decorative-option9-surface-weak-hover` | decorative-option9-weak-hover | #777775 |  |
| `--hop-decorative-option9-surface-weakest` | decorative-option9-weakest | #b3b3b1 |  |
| `--hop-decorative-option9-text` | decorative-option9 | #ffffff |  |
| `--hop-decorative-option9-text-weak` | decorative-option9-weak | #959593 |  |

### [Status](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-status)

#### [Neutral](https://hopper.workleap.design/tokens/semantic/color\#neutral)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-neutral-border` | status-neutral | #f8f6f3 |  |
| `--hop-status-neutral-border-disabled` | status-neutral-disabled | #3c3c3c |  |
| `--hop-status-neutral-border-hover` | status-neutral-hover | #ecebe8 |  |
| `--hop-status-neutral-border-press` | status-neutral-press | #f8f6f3 |  |
| `--hop-status-neutral-border-selected` | status-neutral-selected | #f8f6f3 |  |
| `--hop-status-neutral-icon` | status-neutral | #f8f6f3 |  |
| `--hop-status-neutral-icon-disabled` | status-neutral-disabled | #6c6c6b |  |
| `--hop-status-neutral-icon-hover` | status-neutral-hover | #ecebe8 |  |
| `--hop-status-neutral-icon-press` | status-neutral-press | #f8f6f3 |  |
| `--hop-status-neutral-icon-selected` | status-neutral-selected | #f8f6f3 |  |
| `--hop-status-neutral-surface` | status-neutral | #1d1d1c |  |
| `--hop-status-neutral-surface-disabled` | status-neutral-disabled | #505050 |  |
| `--hop-status-neutral-surface-hover` | status-neutral-hover | #3c3c3c |  |
| `--hop-status-neutral-surface-press` | status-neutral-press | #505050 |  |
| `--hop-status-neutral-surface-selected` | status-neutral-selected | #fef6ef |  |
| `--hop-status-neutral-surface-strong` | status-neutral-strong | #ccccca |  |
| `--hop-status-neutral-text` | status-neutral | #f8f6f3 |  |
| `--hop-status-neutral-text-disabled` | status-neutral-disabled | #6c6c6b |  |
| `--hop-status-neutral-text-hover` | status-neutral-hover | #ecebe8 |  |
| `--hop-status-neutral-text-press` | status-neutral-press | #f8f6f3 |  |
| `--hop-status-neutral-text-selected` | status-neutral-selected | #292929 |  |

#### [Progress](https://hopper.workleap.design/tokens/semantic/color\#progress)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-progress-border` | status-progress | #4767fe |  |
| `--hop-status-progress-border-disabled` | status-progress-disabled | #2a43e8 |  |
| `--hop-status-progress-border-hover` | status-progress-hover | #3b57ff |  |
| `--hop-status-progress-border-press` | status-progress-press | #4767fe |  |
| `--hop-status-progress-border-selected` | status-progress-selected | #d6e0ff |  |
| `--hop-status-progress-icon` | status-progress | #1b3587 |  |
| `--hop-status-progress-icon-disabled` | status-progress-disabled | #3b57ff |  |
| `--hop-status-progress-icon-hover` | status-progress-hover | #152450 |  |
| `--hop-status-progress-icon-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-icon-selected` | status-progress-selected | #d6e0ff |  |
| `--hop-status-progress-surface` | status-progress | #b9cbff |  |
| `--hop-status-progress-surface-disabled` | status-progress-disabled | #1b3587 |  |
| `--hop-status-progress-surface-hover` | status-progress-hover | #95b1ff |  |
| `--hop-status-progress-surface-press` | status-progress-press | #6c8ffd |  |
| `--hop-status-progress-surface-selected` | status-progress-selected | #1b3587 |  |
| `--hop-status-progress-surface-strong` | status-progress-strong | #95b1ff |  |
| `--hop-status-progress-text` | status-progress | #1b3587 |  |
| `--hop-status-progress-text-disabled` | status-progress-disabled | #3b57ff |  |
| `--hop-status-progress-text-hover` | status-progress-hover | #152450 |  |
| `--hop-status-progress-text-press` | status-progress-press | #1b3587 |  |
| `--hop-status-progress-text-selected` | status-progress-selected | #d6e0ff |  |

#### [Positive](https://hopper.workleap.design/tokens/semantic/color\#positive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-positive-border` | status-positive | #188a71 |  |
| `--hop-status-positive-border-disabled` | status-positive-disabled | #16433d |  |
| `--hop-status-positive-border-hover` | status-positive-hover | #0c796b |  |
| `--hop-status-positive-border-press` | status-positive-press | #188a71 |  |
| `--hop-status-positive-border-selected` | status-positive-selected | #cde8ac |  |
| `--hop-status-positive-icon` | status-positive | #16433d |  |
| `--hop-status-positive-icon-disabled` | status-positive-disabled | #0c796b |  |
| `--hop-status-positive-icon-hover` | status-positive-hover | #132a27 |  |
| `--hop-status-positive-icon-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-icon-selected` | status-positive-selected | #cde8ac |  |
| `--hop-status-positive-surface` | status-positive | #aad89d |  |
| `--hop-status-positive-surface-disabled` | status-positive-disabled | #16433d |  |
| `--hop-status-positive-surface-hover` | status-positive-hover | #7dc291 |  |
| `--hop-status-positive-surface-press` | status-positive-press | #47a584 |  |
| `--hop-status-positive-surface-selected` | status-positive-selected | #16433d |  |
| `--hop-status-positive-surface-strong` | status-positive-strong | #7dc291 |  |
| `--hop-status-positive-text` | status-positive | #16433d |  |
| `--hop-status-positive-text-disabled` | status-positive-disabled | #0c796b |  |
| `--hop-status-positive-text-hover` | status-positive-hover | #132a27 |  |
| `--hop-status-positive-text-press` | status-positive-press | #16433d |  |
| `--hop-status-positive-text-selected` | status-positive-selected | #cde8ac |  |

#### [Caution](https://hopper.workleap.design/tokens/semantic/color\#caution)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-caution-border` | status-caution | #c95109 |  |
| `--hop-status-caution-border-disabled` | status-caution-disabled | #ab4104 |  |
| `--hop-status-caution-border-hover` | status-caution-hover | #ba4705 |  |
| `--hop-status-caution-border-press` | status-caution-press | #c95109 |  |
| `--hop-status-caution-border-selected` | status-caution-selected | #ffd8be |  |
| `--hop-status-caution-icon` | status-caution | #692803 |  |
| `--hop-status-caution-icon-disabled` | status-caution-disabled | #ba4705 |  |
| `--hop-status-caution-icon-hover` | status-caution-hover | #451a02 |  |
| `--hop-status-caution-icon-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-icon-selected` | status-caution-selected | #ffd8be |  |
| `--hop-status-caution-surface` | status-caution | #ffbf92 |  |
| `--hop-status-caution-surface-disabled` | status-caution-disabled | #692803 |  |
| `--hop-status-caution-surface-hover` | status-caution-hover | #ff9b3f |  |
| `--hop-status-caution-surface-press` | status-caution-press | #e57723 |  |
| `--hop-status-caution-surface-selected` | status-caution-selected | #692803 |  |
| `--hop-status-caution-surface-strong` | status-caution-strong | #ff9b3f |  |
| `--hop-status-caution-text` | status-caution | #692803 |  |
| `--hop-status-caution-text-disabled` | status-caution-disabled | #ba4705 |  |
| `--hop-status-caution-text-hover` | status-caution-hover | #451a02 |  |
| `--hop-status-caution-text-press` | status-caution-press | #692803 |  |
| `--hop-status-caution-text-selected` | status-caution-selected | #ffd8be |  |

#### [Negative](https://hopper.workleap.design/tokens/semantic/color\#negative)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-negative-border` | status-negative | #df3236 |  |
| `--hop-status-negative-border-disabled` | status-negative-disabled | #ba2d2d |  |
| `--hop-status-negative-border-hover` | status-negative-hover | #cb2e31 |  |
| `--hop-status-negative-border-press` | status-negative-press | #df3236 |  |
| `--hop-status-negative-border-selected` | status-negative-selected | #ffd6d3 |  |
| `--hop-status-negative-icon` | status-negative | #6c2320 |  |
| `--hop-status-negative-icon-disabled` | status-negative-disabled | #cb2e31 |  |
| `--hop-status-negative-icon-hover` | status-negative-hover | #431a17 |  |
| `--hop-status-negative-icon-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-icon-selected` | status-negative-selected | #ffd6d3 |  |
| `--hop-status-negative-surface` | status-negative | #ffbcb7 |  |
| `--hop-status-negative-surface-disabled` | status-negative-disabled | #6c2320 |  |
| `--hop-status-negative-surface-hover` | status-negative-hover | #ff8e8e |  |
| `--hop-status-negative-surface-press` | status-negative-press | #fa4d59 |  |
| `--hop-status-negative-surface-selected` | status-negative-selected | #6c2320 |  |
| `--hop-status-negative-surface-strong` | status-negative-strong | #ff8e8e |  |
| `--hop-status-negative-text` | status-negative | #6c2320 |  |
| `--hop-status-negative-text-disabled` | status-negative-disabled | #cb2e31 |  |
| `--hop-status-negative-text-hover` | status-negative-hover | #431a17 |  |
| `--hop-status-negative-text-press` | status-negative-press | #6c2320 |  |
| `--hop-status-negative-text-selected` | status-negative-selected | #ffd6d3 |  |

#### [Inactive](https://hopper.workleap.design/tokens/semantic/color\#inactive)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-inactive-border` | status-inactive | #777775 |  |
| `--hop-status-inactive-border-disabled` | status-inactive-disabled | #636362 |  |
| `--hop-status-inactive-border-hover` | status-inactive-hover | #6c6c6b |  |
| `--hop-status-inactive-border-press` | status-inactive-press | #777775 |  |
| `--hop-status-inactive-border-selected` | status-inactive-selected | #e0dfdd |  |
| `--hop-status-inactive-icon` | status-inactive | #3c3c3c |  |
| `--hop-status-inactive-icon-disabled` | status-inactive-disabled | #6c6c6b |  |
| `--hop-status-inactive-icon-hover` | status-inactive-hover | #292929 |  |
| `--hop-status-inactive-icon-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-icon-selected` | status-inactive-selected | #e0dfdd |  |
| `--hop-status-inactive-surface` | status-inactive | #e0dfdd |  |
| `--hop-status-inactive-surface-disabled` | status-inactive-disabled | #3c3c3c |  |
| `--hop-status-inactive-surface-hover` | status-inactive-hover | #b3b3b1 |  |
| `--hop-status-inactive-surface-press` | status-inactive-press | #959593 |  |
| `--hop-status-inactive-surface-selected` | status-inactive-selected | #3c3c3c |  |
| `--hop-status-inactive-surface-strong` | status-inactive-strong | #ccccca |  |
| `--hop-status-inactive-text` | status-inactive | #3c3c3c |  |
| `--hop-status-inactive-text-disabled` | status-inactive-disabled | #6c6c6b |  |
| `--hop-status-inactive-text-hover` | status-inactive-hover | #292929 |  |
| `--hop-status-inactive-text-press` | status-inactive-press | #3c3c3c |  |
| `--hop-status-inactive-text-selected` | status-inactive-selected | #e0dfdd |  |

#### [Option 1](https://hopper.workleap.design/tokens/semantic/color\#option-1)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option1-border` | status-option1 | #3a7bb2 |  |
| `--hop-status-option1-border-disabled` | status-option1-disabled | #23669f |  |
| `--hop-status-option1-border-hover` | status-option1-hover | #2e70a8 |  |
| `--hop-status-option1-border-press` | status-option1-press | #3a7bb2 |  |
| `--hop-status-option1-border-selected` | status-option1-selected | #bae6ff |  |
| `--hop-status-option1-icon` | status-option1 | #003d70 |  |
| `--hop-status-option1-icon-disabled` | status-option1-disabled | #2e70a8 |  |
| `--hop-status-option1-icon-hover` | status-option1-hover | #00274b |  |
| `--hop-status-option1-icon-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-icon-selected` | status-option1-selected | #bae6ff |  |
| `--hop-status-option1-surface` | status-option1 | #9fd2f7 |  |
| `--hop-status-option1-surface-disabled` | status-option1-disabled | #003d70 |  |
| `--hop-status-option1-surface-hover` | status-option1-hover | #81b9e4 |  |
| `--hop-status-option1-surface-press` | status-option1-press | #5d9acd |  |
| `--hop-status-option1-surface-selected` | status-option1-selected | #003d70 |  |
| `--hop-status-option1-surface-strong` | status-option1-strong | #9fd2f7 |  |
| `--hop-status-option1-text` | status-option1 | #003d70 |  |
| `--hop-status-option1-text-disabled` | status-option1-disabled | #2e70a8 |  |
| `--hop-status-option1-text-hover` | status-option1-hover | #00274b |  |
| `--hop-status-option1-text-press` | status-option1-press | #003d70 |  |
| `--hop-status-option1-text-selected` | status-option1-selected | #bae6ff |  |

#### [Option 2](https://hopper.workleap.design/tokens/semantic/color\#option-2)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option2-border` | status-option2 | #8d91dc |  |
| `--hop-status-option2-border-disabled` | status-option2-disabled | #5454be |  |
| `--hop-status-option2-border-hover` | status-option2-hover | #5f61c5 |  |
| `--hop-status-option2-border-press` | status-option2-press | #8d91dc |  |
| `--hop-status-option2-border-selected` | status-option2-selected | #322b8d |  |
| `--hop-status-option2-icon` | status-option2 | #322b8d |  |
| `--hop-status-option2-icon-disabled` | status-option2-disabled | #5f61c5 |  |
| `--hop-status-option2-icon-hover` | status-option2-hover | #1e1c5d |  |
| `--hop-status-option2-icon-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-icon-selected` | status-option2-selected | #ddddf7 |  |
| `--hop-status-option2-surface` | status-option2 | #c8caf0 |  |
| `--hop-status-option2-surface-disabled` | status-option2-disabled | #322b8d |  |
| `--hop-status-option2-surface-hover` | status-option2-hover | #aeb3e8 |  |
| `--hop-status-option2-surface-press` | status-option2-press | #8d91dc |  |
| `--hop-status-option2-surface-selected` | status-option2-selected | #322b8d |  |
| `--hop-status-option2-surface-strong` | status-option2-strong | #c8caf0 |  |
| `--hop-status-option2-text` | status-option2 | #322b8d |  |
| `--hop-status-option2-text-disabled` | status-option2-disabled | #5f61c5 |  |
| `--hop-status-option2-text-hover` | status-option2-hover | #1e1c5d |  |
| `--hop-status-option2-text-press` | status-option2-press | #322b8d |  |
| `--hop-status-option2-text-selected` | status-option2-selected | #ddddf7 |  |

#### [Option 3](https://hopper.workleap.design/tokens/semantic/color\#option-3)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option3-border` | status-option3 | #38836a |  |
| `--hop-status-option3-border-disabled` | status-option3-disabled | #206f54 |  |
| `--hop-status-option3-border-hover` | status-option3-hover | #2b795e |  |
| `--hop-status-option3-border-press` | status-option3-press | #38836a |  |
| `--hop-status-option3-border-selected` | status-option3-selected | #bde8e1 |  |
| `--hop-status-option3-icon` | status-option3 | #00452d |  |
| `--hop-status-option3-icon-disabled` | status-option3-disabled | #2b795e |  |
| `--hop-status-option3-icon-hover` | status-option3-hover | #002d1c |  |
| `--hop-status-option3-icon-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-icon-selected` | status-option3-selected | #bde8e1 |  |
| `--hop-status-option3-surface` | status-option3 | #a3d6cb |  |
| `--hop-status-option3-surface-disabled` | status-option3-disabled | #00452d |  |
| `--hop-status-option3-surface-hover` | status-option3-hover | #83beaf |  |
| `--hop-status-option3-surface-press` | status-option3-press | #5da18c |  |
| `--hop-status-option3-surface-selected` | status-option3-selected | #00452d |  |
| `--hop-status-option3-surface-strong` | status-option3-strong | #a3d6cb |  |
| `--hop-status-option3-text` | status-option3 | #00452d |  |
| `--hop-status-option3-text-disabled` | status-option3-disabled | #83beaf |  |
| `--hop-status-option3-text-hover` | status-option3-hover | #002d1c |  |
| `--hop-status-option3-text-press` | status-option3-press | #00452d |  |
| `--hop-status-option3-text-selected` | status-option3-selected | #bde8e1 |  |

#### [Option 4](https://hopper.workleap.design/tokens/semantic/color\#option-4)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option4-border` | status-option4 | #5e7b84 |  |
| `--hop-status-option4-border-disabled` | status-option4-disabled | #4e6770 |  |
| `--hop-status-option4-border-hover` | status-option4-hover | #557079 |  |
| `--hop-status-option4-border-press` | status-option4-press | #5e7b84 |  |
| `--hop-status-option4-border-selected` | status-option4-selected | #d2e3e7 |  |
| `--hop-status-option4-icon` | status-option4 | #313e43 |  |
| `--hop-status-option4-icon-disabled` | status-option4-disabled | #557079 |  |
| `--hop-status-option4-icon-hover` | status-option4-hover | #20282a |  |
| `--hop-status-option4-icon-press` | status-option4-press | #313e43 |  |
| `--hop-status-option4-icon-selected` | status-option4-selected | #d2e3e7 |  |
| `--hop-status-option4-surface` | status-option4 | #bad0d5 |  |
| `--hop-status-option4-surface-disabled` | status-option4-disabled | #4e6770 |  |
| `--hop-status-option4-surface-hover` | status-option4-hover | #9cb7be |  |
| `--hop-status-option4-surface-press` | status-option4-press | #7c9aa3 |  |
| `--hop-status-option4-surface-selected` | status-option4-selected | #313e43 |  |
| `--hop-status-option4-surface-strong` | status-option4-strong | #bad0d5 |  |
| `--hop-status-option4-text` | status-option4 | #313e43 |  |
| `--hop-status-option4-text-disabled` | status-option4-disabled | #557079 |  |
| `--hop-status-option4-text-hover` | status-option4-hover | #20282a |  |
| `--hop-status-option4-text-press` | status-option4-press | #20282a |  |
| `--hop-status-option4-text-selected` | status-option4-selected | #d2e3e7 |  |

#### [Option 5](https://hopper.workleap.design/tokens/semantic/color\#option-5)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option5-border` | status-option5 | #837463 |  |
| `--hop-status-option5-border-disabled` | status-option5-disabled | #6e6151 |  |
| `--hop-status-option5-border-hover` | status-option5-hover | #776a59 |  |
| `--hop-status-option5-border-press` | status-option5-press | #837463 |  |
| `--hop-status-option5-border-selected` | status-option5-selected | #e5ded6 |  |
| `--hop-status-option5-icon` | status-option5 | #433b31 |  |
| `--hop-status-option5-icon-disabled` | status-option5-disabled | #776a59 |  |
| `--hop-status-option5-icon-hover` | status-option5-hover | #2a2620 |  |
| `--hop-status-option5-icon-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-icon-selected` | status-option5-selected | #e5ded6 |  |
| `--hop-status-option5-surface` | status-option5 | #d4cbc0 |  |
| `--hop-status-option5-surface-disabled` | status-option5-disabled | #433b31 |  |
| `--hop-status-option5-surface-hover` | status-option5-hover | #bdb1a3 |  |
| `--hop-status-option5-surface-press` | status-option5-press | #a19382 |  |
| `--hop-status-option5-surface-selected` | status-option5-selected | #433b31 |  |
| `--hop-status-option5-surface-strong` | status-option5-strong | #d4cbc0 |  |
| `--hop-status-option5-text` | status-option5 | #433b31 |  |
| `--hop-status-option5-text-disabled` | status-option5-disabled | #776a59 |  |
| `--hop-status-option5-text-hover` | status-option5-hover | #2a2620 |  |
| `--hop-status-option5-text-press` | status-option5-press | #433b31 |  |
| `--hop-status-option5-text-selected` | status-option5-selected | #e5ded6 |  |

#### [Option 6](https://hopper.workleap.design/tokens/semantic/color\#option-6)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-status-option6-border` | status-option6 | #996f08 |  |
| `--hop-status-option6-border-disabled` | status-option6-disabled | #7e5e0a |  |
| `--hop-status-option6-border-hover` | status-option6-hover | #8b6609 |  |
| `--hop-status-option6-border-press` | status-option6-press | #996f08 |  |
| `--hop-status-option6-border-selected` | status-option6-selected | #f7e694 |  |
| `--hop-status-option6-icon` | status-option6 | #4b390f |  |
| `--hop-status-option6-icon-disabled` | status-option6-disabled | #8b6609 |  |
| `--hop-status-option6-icon-hover` | status-option6-hover | #2f250d |  |
| `--hop-status-option6-icon-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-icon-selected` | status-option6-selected | #f7e694 |  |
| `--hop-status-option6-surface` | status-option6 | #eac96d |  |
| `--hop-status-option6-surface-disabled` | status-option6-disabled | #4b390f |  |
| `--hop-status-option6-surface-hover` | status-option6-hover | #e2a934 |  |
| `--hop-status-option6-surface-press` | status-option6-press | #c28b12 |  |
| `--hop-status-option6-surface-selected` | status-option6-selected | #4b390f |  |
| `--hop-status-option6-surface-strong` | status-option6-strong | #eac96d |  |
| `--hop-status-option6-text` | status-option6 | #4b390f |  |
| `--hop-status-option6-text-disabled` | status-option6-disabled | #8b6609 |  |
| `--hop-status-option6-text-hover` | status-option6-hover | #2f250d |  |
| `--hop-status-option6-text-press` | status-option6-press | #4b390f |  |
| `--hop-status-option6-text-selected` | status-option6-selected | #f7e694 |  |

### [Data Visualization](https://hopper.workleap.design/tokens/semantic/color\#dark-tokens-data-visualization)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-dataviz-unavailable` | dataviz\_unavailable | #636362 |  |
| `--hop-dataviz-unavailable-weak` | dataviz\_unavailable-weak | #777775 |  |
| `--hop-dataviz-unavailable-strong` | dataviz\_unavailable-strong | #505050 |  |
| `--hop-dataviz-text-onlight` | dataviz\_onlight | #3c3c3c |  |
| `--hop-dataviz-text-ondark` | dataviz\_ondark | #ffffff |  |

## Elevation Guidelines

# Elevation

## [Guidelines](https://hopper.workleap.design/tokens/semantic/elevation\#guidelines)

- **Working with elevation** \- Elevation allows to bring a sense of materiality and depth to an interface. Use elevation to infer information hierarchy.
- **Don’t skip elevation levels** \- When applying elevation to visual elements, ensure that each level is used progressively so users can understand the layering of elements on the page. Start with no elevation at the background level and build interfaces by 'piling up' containers and other elements step by step. Avoid jumping from a raised token to a floating token without using the intermediate lifted level.
- **Use elevation purposefully** \- Each elevation has a purpose and allow users to see what is closer to them – what requires their attention now. Always respect how elements are stacked on top of each other so that users understand the materiality of the application.

## [Tokens](https://hopper.workleap.design/tokens/semantic/elevation\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-elevation-none` | none | none |  |
| `--hop-elevation-raised` | raised | 0 1px 6px 0 rgba(60, 60, 60, 0.10) |  |
| `--hop-elevation-lifted` | lifted | 0 4px 10px 4px rgba(60, 60, 60, 0.08) |  |
| `--hop-elevation-floating` | floating | 0 10px 18px 8px rgba(60, 60, 60, 0.08) |  |

## Shape Tokens

# Shape

Shape tokens refer to the border radius of a visual element. Border radius is the amount of smoothness applied to the corners of a shape. The higher the value, the smoother the corners are. In addition to t-shirt-sized tokens, there are some utility tokens used for specific elements such as pill and circle.

## [Tokens](https://hopper.workleap.design/tokens/semantic/shape\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-shape-circle` | circle | 624.9375rem |  |
| `--hop-shape-pill` | pill | 1.5rem |  |
| `--hop-shape-rounded-lg` | rounded-lg | 1rem |  |
| `--hop-shape-rounded-md` | rounded-md | 0.5rem |  |
| `--hop-shape-rounded-sm` | rounded-sm | 0.25rem |  |

## Design Space Tokens

# Space

## [Guidelines](https://hopper.workleap.design/tokens/semantic/space\#guidelines)

- **Working with space** \- Space is the distance between two objects in your design. It should be used to complement the purpose of a page by creating hierarchy and making the content clearer and more comprehensible.
- **Be harmonious** \- Use space tokens in a way that is consistent with the rest of the experience. Some spaces are used in specific context, follow the proper documentation to apply space at the right places.
- **Create visual groups** \- The more visual elements are related, the closer they should be to each other.

## [Tokens](https://hopper.workleap.design/tokens/semantic/space\#tokens)

### [Padding](https://hopper.workleap.design/tokens/semantic/space\#tokens-padding)

Padding refers to the space within a block or container from which elements are separated from the edge. Is is refered as inset in Hopper.

#### [Inset](https://hopper.workleap.design/tokens/semantic/space\#inset)

By default, the inset is equal on all four sides.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inset-xs` | inset-xs | 0.25rem |  |
| `--hop-space-inset-sm` | inset-sm | 0.5rem |  |
| `--hop-space-inset-md` | inset-md | 1rem |  |
| `--hop-space-inset-lg` | inset-lg | 1.5rem |  |
| `--hop-space-inset-xl` | inset-xl | 2rem |  |

#### [Inset Squish](https://hopper.workleap.design/tokens/semantic/space\#inset-squish)

Squish inset reduces the top and bottom padding by one increment relative to the declared inset space.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inset-squish-sm` | inset-squish-sm | 0.25rem 0.5rem |  |
| `--hop-space-inset-squish-md` | inset-squish-md | 0.5rem 1rem |  |
| `--hop-space-inset-squish-lg` | inset-squish-lg | 1rem 2rem |  |

#### [Inset Stretch](https://hopper.workleap.design/tokens/semantic/space\#inset-stretch)

Stretch inset increases the top and bottom padding by one increment relative to the declared inset space.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inset-stretch-sm` | inset-stretch-sm | 1rem 0.5rem |  |
| `--hop-space-inset-stretch-md` | inset-stretch-md | 1.5rem 1rem |  |
| `--hop-space-inset-stretch-lg` | inset-stretch-lg | 3rem 1.5rem |  |

### [Margin](https://hopper.workleap.design/tokens/semantic/space\#tokens-margin)

Margin refers to the traditional meaning of space between elements. It can be used as a margin or gap when in a grid or flex layout. It is refered as stack in Hopper. The last element of a stack should omit this space.

#### [Stack](https://hopper.workleap.design/tokens/semantic/space\#stack)

Stack is the space that separates elements or containers arranged vertically within a column.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-stack-xs` | stack-xs | 0.25rem |  |
| `--hop-space-stack-sm` | stack-sm | 0.5rem |  |
| `--hop-space-stack-md` | stack-md | 1rem |  |
| `--hop-space-stack-lg` | stack-lg | 1.5rem |  |
| `--hop-space-stack-xl` | stack-xl | 2rem |  |

#### [Inline](https://hopper.workleap.design/tokens/semantic/space\#inline)

Inline refers to the space that separates inline elements arranged horizontally.

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-inline-xs` | inline-xs | 0.25rem |  |
| `--hop-space-inline-sm` | inline-sm | 0.5rem |  |
| `--hop-space-inline-md` | inline-md | 1rem |  |
| `--hop-space-inline-lg` | inline-lg | 1.5rem |  |
| `--hop-space-inline-xl` | inline-xl | 2rem |  |

## Typography Tokens

# Typography

Typography tokens are composite tokens, meaning they are made up of multiple other tokens. This allows us to create a consistent typographic scale across our products.

## [Guidelines](https://hopper.workleap.design/tokens/semantic/typography\#guidelines)

- **Use the bounding box to align with the grid** \- The bounding box is the vertical height of the text and is defined by the line height. That value of the line height is critical to make sure text is aligned to the 8px grid of the interface.
- **Use text-crop when a font looks off-centered** \- Some fonts, such as _ABC Favorit_ requires a little help to look centered. In those cases, apply a [text-crop](https://hopper.workleap.design/getting-started/guides/text-crop) to adjust the line height. These values are available as tokens and are documented below. Hopper Components already make use of these values when necessary.
- **Align text using baseline** \- When aligning different text boxes together horizontally, use their baselines as a guide instead of their true center for a more harmonious look.
- **Line length should be between 40 to 60 characters** \- Lines of text that are too short make the eyes strain while long lines make it hard to concentrate. As a way to give users the best reading experience, aim for lines of text between 40 to 60 characters, including spaces. If your text doesn’t fit this rule, review the content length, font size or even information hierarchy.

## [Tokens](https://hopper.workleap.design/tokens/semantic/typography\#tokens)

### [Heading](https://hopper.workleap.design/tokens/semantic/typography\#tokens-heading)

Headings are used to create a hierarchy of content. They are used to help users scan and understand the content on a page.

| Size | Values | Preview |
| --- | --- | --- |
| 3xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-3xl-font-size` | 2.25rem |
| Font Weight | `hop-heading-3xl-font-weight` | 680 |
| Line Height | `hop-heading-3xl-line-height` | 1.3333333 |
| Font Family | `hop-heading-3xl-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-3xl-top-offset` | -0.9375rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-3xl-bottom-offset` | -0.5625rem | | Aa |
| 2xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-2xl-font-size` | 2rem |
| Font Weight | `hop-heading-2xl-font-weight` | 580 |
| Line Height | `hop-heading-2xl-line-height` | 1.25 |
| Font Family | `hop-heading-2xl-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-2xl-top-offset` | -0.6667rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-2xl-bottom-offset` | -0.3334rem | | Aa |
| xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-xl-font-size` | 1.75rem |
| Font Weight | `hop-heading-xl-font-weight` | 680 |
| Line Height | `hop-heading-xl-line-height` | 1.1428571 |
| Font Family | `hop-heading-xl-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xl-top-offset` | -0.5rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xl-bottom-offset` | -0.1875rem | | Aa |
| lg | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-lg-font-size` | 1.5rem |
| Font Weight | `hop-heading-lg-font-weight` | 680 |
| Line Height | `hop-heading-lg-line-height` | 1.3333333 |
| Font Family | `hop-heading-lg-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-lg-top-offset` | -0.5625rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-lg-bottom-offset` | -0.3125rem | | Aa |
| md | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-md-font-size` | 1.25rem |
| Font Weight | `hop-heading-md-font-weight` | 580 |
| Line Height | `hop-heading-md-line-height` | 1.2 |
| Font Family | `hop-heading-md-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-md-top-offset` | -0.3333rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-md-bottom-offset` | -0.125rem | | Aa |
| sm | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-sm-font-size` | 1.125rem |
| Font Weight | `hop-heading-sm-font-weight` | 580 |
| Line Height | `hop-heading-sm-line-height` | 1.3333333 |
| Font Family | `hop-heading-sm-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-sm-top-offset` | -0.375rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-sm-bottom-offset` | -0.1875rem | | Aa |
| xs | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-heading-xs-font-size` | 1rem |
| Font Weight | `hop-heading-xs-font-weight` | 410 |
| Line Height | `hop-heading-xs-line-height` | 1.5 |
| Font Family | `hop-heading-xs-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xs-top-offset` | -0.4166rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-heading-xs-bottom-offset` | -0.25rem | | Aa |

#### [Variations](https://hopper.workleap.design/tokens/semantic/typography\#variations)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-heading-xs-medium-font-weight` | 580 | Aa |

### [Overline](https://hopper.workleap.design/tokens/semantic/typography\#tokens-overline)

Used to introduce a headline.

_Adding a text-transform of uppercase is necessary in order to render overline as intended by the Design. A letter spacing of `0.24px` is also necessary._

| Values | Preview |
| --- | --- |
| |     |     |     |
| --- | --- | --- |
| Font Size | `hop-overline-font-size` | 0.75rem |
| Font Weight | `hop-overline-font-weight` | 400 |
| Line Height | `hop-overline-line-height` | 1.3333333 |
| Font Family | `hop-overline-font-family` | 'ABC Favorit Mono', Consolas, 'SF Mono', monospace |
| Top Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-overline-top-offset` | -0.25rem |
| Bottom Offset [1](https://hopper.workleap.design/tokens/semantic/typography#offset-tokens) | `hop-overline-bottom-offset` | -0.25rem | | Aa |

### [Body](https://hopper.workleap.design/tokens/semantic/typography\#tokens-body)

Body text is used to communicate the main content of a page.

| Size | Values | Preview |
| --- | --- | --- |
| 2xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-2xl-font-size` | 2rem |
| Font Weight | `hop-body-2xl-font-weight` | 410 |
| Line Height | `hop-body-2xl-line-height` | 1.125 |
| Font Family | `hop-body-2xl-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| xl | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-xl-font-size` | 1.75rem |
| Font Weight | `hop-body-xl-font-weight` | 410 |
| Line Height | `hop-body-xl-line-height` | 1.1428571 |
| Font Family | `hop-body-xl-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| lg | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-lg-font-size` | 1.125rem |
| Font Weight | `hop-body-lg-font-weight` | 410 |
| Line Height | `hop-body-lg-line-height` | 1.3333333 |
| Font Family | `hop-body-lg-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| md | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-md-font-size` | 1rem |
| Font Weight | `hop-body-md-font-weight` | 410 |
| Line Height | `hop-body-md-line-height` | 1.5 |
| Font Family | `hop-body-md-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| sm | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-sm-font-size` | 0.875rem |
| Font Weight | `hop-body-sm-font-weight` | 410 |
| Line Height | `hop-body-sm-line-height` | 1.4285714 |
| Font Family | `hop-body-sm-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |
| xs | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-body-xs-font-size` | 0.75rem |
| Font Weight | `hop-body-xs-font-weight` | 410 |
| Line Height | `hop-body-xs-line-height` | 1.3333333 |
| Font Family | `hop-body-xs-font-family` | 'Inter', Helvetica, Arial, sans-serif | | Aa |

#### [Variations](https://hopper.workleap.design/tokens/semantic/typography\#variations)

| Name | Value | Preview |
| --- | --- | --- |
| `--hop-body-lg-medium-font-weight` | 505 | Aa |
| `--hop-body-lg-semibold-font-weight` | 590 | Aa |
| `--hop-body-lg-bold-font-weight` | 690 | Aa |
| `--hop-body-md-medium-font-weight` | 505 | Aa |
| `--hop-body-md-semibold-font-weight` | 590 | Aa |
| `--hop-body-md-bold-font-weight` | 690 | Aa |
| `--hop-body-sm-medium-font-weight` | 505 | Aa |
| `--hop-body-sm-semibold-font-weight` | 590 | Aa |
| `--hop-body-sm-bold-font-weight` | 690 | Aa |
| `--hop-body-xs-medium-font-weight` | 505 | Aa |
| `--hop-body-xs-semibold-font-weight` | 590 | Aa |
| `--hop-body-xs-bold-font-weight` | 690 | Aa |

### [Accent](https://hopper.workleap.design/tokens/semantic/typography\#tokens-accent)

Accent text is used to highlight important information on a page.

| Size | Values | Preview |
| --- | --- | --- |
| lg | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-accent-lg-font-size` | 3rem |
| Font Weight | `hop-accent-lg-font-weight` | 580 |
| Line Height | `hop-accent-lg-line-height` | 1.125 |
| Font Family | `hop-accent-lg-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif | | Aa |
| sm | |     |     |     |
| --- | --- | --- |
| Font Size | `hop-accent-sm-font-size` | 1.125rem |
| Font Weight | `hop-accent-sm-font-weight` | 580 |
| Line Height | `hop-accent-sm-line-height` | 1.3333333 |
| Font Family | `hop-accent-sm-font-family` | 'ABC Favorit', Helvetica, Arial, sans-serif | | Aa |

1. These values are meant to be used in tandem, they have been meticulously crafted to trim unwanted blank space in the _ABC Favorit_ typeface, and it's _Mono_ variant. They have been generated using [Eight Shape tool](https://text-crop.eightshapes.com/) and adjusted to fit our needs. You can see how and when to use them in the [Use text-crop when a font looks off-centered](https://hopper.workleap.design/tokens/semantic/typography#guidelines) section.

# Core

## Border Radius Tokens

[Tokens](https://hopper.workleap.design/tokens/core/border-radius\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-border-radius-0` | core\_0 | 0 |  |
| `--hop-border-radius-1` | core\_1 | 0.25rem |  |
| `--hop-border-radius-2` | core\_2 | 0.5rem |  |
| `--hop-border-radius-3` | core\_3 | 1rem |  |
| `--hop-border-radius-4` | core\_4 | 1.5rem |  |
| `--hop-border-radius-9999` | core\_9999 | 624.9375rem |  |

## Color Tokens

[Tokens](https://hopper.workleap.design/tokens/core/color\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-coastal-25` | core\_coastal-25 | #f0f8ff |  |
| `--hop-coastal-50` | core\_coastal-50 | #d9efff |  |
| `--hop-coastal-75` | core\_coastal-75 | #bae6ff |  |
| `--hop-coastal-100` | core\_coastal-100 | #9fd2f7 |  |
| `--hop-coastal-200` | core\_coastal-200 | #81b9e4 |  |
| `--hop-coastal-300` | core\_coastal-300 | #5d9acd |  |
| `--hop-coastal-400` | core\_coastal-400 | #3a7bb2 |  |
| `--hop-coastal-500` | core\_coastal-500 | #2e70a8 |  |
| `--hop-coastal-600` | core\_coastal-600 | #23669f |  |
| `--hop-coastal-700` | core\_coastal-700 | #0a538b |  |
| `--hop-coastal-800` | core\_coastal-800 | #003d70 |  |
| `--hop-coastal-900` | core\_coastal-900 | #00274b |  |
| `--hop-quetzal-25` | core\_quetzal-25 | #ddfdf9 |  |
| `--hop-quetzal-50` | core\_quetzal-50 | #cff4ef |  |
| `--hop-quetzal-75` | core\_quetzal-75 | #bde8e1 |  |
| `--hop-quetzal-100` | core\_quetzal-100 | #a3d6cb |  |
| `--hop-quetzal-200` | core\_quetzal-200 | #83beaf |  |
| `--hop-quetzal-300` | core\_quetzal-300 | #5da18c |  |
| `--hop-quetzal-400` | core\_quetzal-400 | #38836a |  |
| `--hop-quetzal-500` | core\_quetzal-500 | #2b795e |  |
| `--hop-quetzal-600` | core\_quetzal-600 | #206f54 |  |
| `--hop-quetzal-700` | core\_quetzal-700 | #055c41 |  |
| `--hop-quetzal-800` | core\_quetzal-800 | #00452d |  |
| `--hop-quetzal-900` | core\_quetzal-900 | #002d1c |  |
| `--hop-orchid-bloom-25` | core\_orchid-bloom-25 | #f6f5ff |  |
| `--hop-orchid-bloom-50` | core\_orchid-bloom-50 | #eae9fb |  |
| `--hop-orchid-bloom-75` | core\_orchid-bloom-75 | #ddddf7 |  |
| `--hop-orchid-bloom-100` | core\_orchid-bloom-100 | #c8caf0 |  |
| `--hop-orchid-bloom-200` | core\_orchid-bloom-200 | #aeb3e8 |  |
| `--hop-orchid-bloom-300` | core\_orchid-bloom-300 | #8d91dc |  |
| `--hop-orchid-bloom-400` | core\_orchid-bloom-400 | #6b6ecc |  |
| `--hop-orchid-bloom-500` | core\_orchid-bloom-500 | #5f61c5 |  |
| `--hop-orchid-bloom-600` | core\_orchid-bloom-600 | #5454be |  |
| `--hop-orchid-bloom-700` | core\_orchid-bloom-700 | #433fac |  |
| `--hop-orchid-bloom-800` | core\_orchid-bloom-800 | #322b8d |  |
| `--hop-orchid-bloom-900` | core\_orchid-bloom-900 | #1e1c5d |  |
| `--hop-sapphire-25` | core\_sapphire-25 | #f5f6ff |  |
| `--hop-sapphire-50` | core\_sapphire-50 | #e6ebff |  |
| `--hop-sapphire-75` | core\_sapphire-75 | #d6e0ff |  |
| `--hop-sapphire-100` | core\_sapphire-100 | #b9cbff |  |
| `--hop-sapphire-200` | core\_sapphire-200 | #95b1ff |  |
| `--hop-sapphire-300` | core\_sapphire-300 | #6c8ffd |  |
| `--hop-sapphire-400` | core\_sapphire-400 | #4767fe |  |
| `--hop-sapphire-500` | core\_sapphire-500 | #3b57ff |  |
| `--hop-sapphire-600` | core\_sapphire-600 | #2a43e8 |  |
| `--hop-sapphire-700` | core\_sapphire-700 | #2040c7 |  |
| `--hop-sapphire-800` | core\_sapphire-800 | #1b3587 |  |
| `--hop-sapphire-900` | core\_sapphire-900 | #152450 |  |
| `--hop-fog-25` | core\_fog-25 | #f2f8fa |  |
| `--hop-fog-50` | core\_fog-50 | #e1eef1 |  |
| `--hop-fog-75` | core\_fog-75 | #d2e3e7 |  |
| `--hop-fog-100` | core\_fog-100 | #bad0d5 |  |
| `--hop-fog-200` | core\_fog-200 | #9cb7be |  |
| `--hop-fog-300` | core\_fog-300 | #7c9aa3 |  |
| `--hop-fog-400` | core\_fog-400 | #5e7b84 |  |
| `--hop-fog-500` | core\_fog-500 | #557079 |  |
| `--hop-fog-600` | core\_fog-600 | #4e6770 |  |
| `--hop-fog-700` | core\_fog-700 | #40535a |  |
| `--hop-fog-800` | core\_fog-800 | #313e43 |  |
| `--hop-fog-900` | core\_fog-900 | #20282a |  |
| `--hop-toad-25` | core\_toad-25 | #fef6ef |  |
| `--hop-toad-50` | core\_toad-50 | #f0eae3 |  |
| `--hop-toad-75` | core\_toad-75 | #e5ded6 |  |
| `--hop-toad-100` | core\_toad-100 | #d4cbc0 |  |
| `--hop-toad-200` | core\_toad-200 | #bdb1a3 |  |
| `--hop-toad-300` | core\_toad-300 | #a19382 |  |
| `--hop-toad-400` | core\_toad-400 | #837463 |  |
| `--hop-toad-500` | core\_toad-500 | #776a59 |  |
| `--hop-toad-600` | core\_toad-600 | #6e6151 |  |
| `--hop-toad-700` | core\_toad-700 | #594f41 |  |
| `--hop-toad-800` | core\_toad-800 | #433b31 |  |
| `--hop-toad-900` | core\_toad-900 | #2a2620 |  |
| `--hop-sunken-treasure-25` | core\_sunken-treasure-25 | #fff8d6 |  |
| `--hop-sunken-treasure-50` | core\_sunken-treasure-50 | #fff2b8 |  |
| `--hop-sunken-treasure-75` | core\_sunken-treasure-75 | #f7e694 |  |
| `--hop-sunken-treasure-100` | core\_sunken-treasure-100 | #eac96d |  |
| `--hop-sunken-treasure-200` | core\_sunken-treasure-200 | #e2a934 |  |
| `--hop-sunken-treasure-300` | core\_sunken-treasure-300 | #c28b12 |  |
| `--hop-sunken-treasure-400` | core\_sunken-treasure-400 | #996f08 |  |
| `--hop-sunken-treasure-500` | core\_sunken-treasure-500 | #8b6609 |  |
| `--hop-sunken-treasure-600` | core\_sunken-treasure-600 | #7e5e0a |  |
| `--hop-sunken-treasure-700` | core\_sunken-treasure-700 | #654c0d |  |
| `--hop-sunken-treasure-800` | core\_sunken-treasure-800 | #4b390f |  |
| `--hop-sunken-treasure-900` | core\_sunken-treasure-900 | #2f250d |  |
| `--hop-koi-25` | core\_koi-25 | #fff5e9 |  |
| `--hop-koi-50` | core\_koi-50 | #ffe8d3 |  |
| `--hop-koi-75` | core\_koi-75 | #ffd8be |  |
| `--hop-koi-100` | core\_koi-100 | #ffbf92 |  |
| `--hop-koi-200` | core\_koi-200 | #ff9b3f |  |
| `--hop-koi-300` | core\_koi-300 | #e57723 |  |
| `--hop-koi-400` | core\_koi-400 | #c95109 |  |
| `--hop-koi-500` | core\_koi-500 | #ba4705 |  |
| `--hop-koi-600` | core\_koi-600 | #ab4104 |  |
| `--hop-koi-700` | core\_koi-700 | #8c3504 |  |
| `--hop-koi-800` | core\_koi-800 | #692803 |  |
| `--hop-koi-900` | core\_koi-900 | #451a02 |  |
| `--hop-amanita-25` | core\_amanita-25 | #fdf6f6 |  |
| `--hop-amanita-50` | core\_amanita-50 | #fde6e5 |  |
| `--hop-amanita-75` | core\_amanita-75 | #ffd6d3 |  |
| `--hop-amanita-100` | core\_amanita-100 | #ffbcb7 |  |
| `--hop-amanita-200` | core\_amanita-200 | #ff8e8e |  |
| `--hop-amanita-300` | core\_amanita-300 | #fa4d59 |  |
| `--hop-amanita-400` | core\_amanita-400 | #df3236 |  |
| `--hop-amanita-500` | core\_amanita-500 | #cb2e31 |  |
| `--hop-amanita-600` | core\_amanita-600 | #ba2d2d |  |
| `--hop-amanita-700` | core\_amanita-700 | #952927 |  |
| `--hop-amanita-800` | core\_amanita-800 | #6c2320 |  |
| `--hop-amanita-900` | core\_amanita-900 | #431a17 |  |
| `--hop-moss-25` | core\_moss-25 | #f4f9e9 |  |
| `--hop-moss-50` | core\_moss-50 | #e3f3b9 |  |
| `--hop-moss-75` | core\_moss-75 | #cde8ac |  |
| `--hop-moss-100` | core\_moss-100 | #aad89d |  |
| `--hop-moss-200` | core\_moss-200 | #7dc291 |  |
| `--hop-moss-300` | core\_moss-300 | #47a584 |  |
| `--hop-moss-400` | core\_moss-400 | #188a71 |  |
| `--hop-moss-500` | core\_moss-500 | #0c796b |  |
| `--hop-moss-600` | core\_moss-600 | #0a6f64 |  |
| `--hop-moss-700` | core\_moss-700 | #115a52 |  |
| `--hop-moss-800` | core\_moss-800 | #16433d |  |
| `--hop-moss-900` | core\_moss-900 | #132a27 |  |
| `--hop-abyss` | core\_abyss | #1d1d1c |  |
| `--hop-rock-20` | core\_rock-20 | #fcfbfb |  |
| `--hop-rock-25` | core\_rock-25 | #f8f6f3 |  |
| `--hop-rock-50` | core\_rock-50 | #ecebe8 |  |
| `--hop-rock-75` | core\_rock-75 | #e0dfdd |  |
| `--hop-rock-100` | core\_rock-100 | #ccccca |  |
| `--hop-rock-200` | core\_rock-200 | #b3b3b1 |  |
| `--hop-rock-300` | core\_rock-300 | #959593 |  |
| `--hop-rock-400` | core\_rock-400 | #777775 |  |
| `--hop-rock-500` | core\_rock-500 | #6c6c6b |  |
| `--hop-rock-600` | core\_rock-600 | #636362 |  |
| `--hop-rock-700` | core\_rock-700 | #505050 |  |
| `--hop-rock-800` | core\_rock-800 | #3c3c3c |  |
| `--hop-rock-900` | core\_rock-900 | #292929 |  |
| `--hop-samoyed` | core\_samoyed | #ffffff |  |

## Core Dimensions Tokens

[Tokens](https://hopper.workleap.design/tokens/core/dimensions\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-space-0` | core\_0 | 0 |  |
| `--hop-space-10` | core\_10 | 0.0625rem |  |
| `--hop-space-20` | core\_20 | 0.125rem |  |
| `--hop-space-40` | core\_40 | 0.25rem |  |
| `--hop-space-80` | core\_80 | 0.5rem |  |
| `--hop-space-160` | core\_160 | 1rem |  |
| `--hop-space-240` | core\_240 | 1.5rem |  |
| `--hop-space-320` | core\_320 | 2rem |  |
| `--hop-space-400` | core\_400 | 2.5rem |  |
| `--hop-space-480` | core\_480 | 3rem |  |
| `--hop-space-640` | core\_640 | 4rem |  |
| `--hop-space-800` | core\_800 | 5rem |  |
| `--hop-space-960` | core\_960 | 6rem |  |
| `--hop-space-1280` | core\_1280 | 8rem |  |

## Font Family Tokens

[Tokens](https://hopper.workleap.design/tokens/core/font-family\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-font-family-primary` | core\_primary | 'ABC Favorit', Helvetica, Arial, sans-serif | Aa |
| `--hop-font-family-secondary` | core\_secondary | 'Inter', Helvetica, Arial, sans-serif | Aa |
| `--hop-font-family-tertiary` | core\_tertiary | 'ABC Favorit Mono', Consolas, 'SF Mono', monospace | Aa |

## Font Size Tokens

[Tokens](https://hopper.workleap.design/tokens/core/font-size\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-font-size-120` | core\_120 | 0.75rem | Aa |
| `--hop-font-size-140` | core\_140 | 0.875rem | Aa |
| `--hop-font-size-160` | core\_160 | 1rem | Aa |
| `--hop-font-size-180` | core\_180 | 1.125rem | Aa |
| `--hop-font-size-200` | core\_200 | 1.25rem | Aa |
| `--hop-font-size-240` | core\_240 | 1.5rem | Aa |
| `--hop-font-size-280` | core\_280 | 1.75rem | Aa |
| `--hop-font-size-320` | core\_320 | 2rem | Aa |
| `--hop-font-size-360` | core\_360 | 2.25rem | Aa |
| `--hop-font-size-480` | core\_480 | 3rem | Aa |

## Font Weight Tokens

[Tokens](https://hopper.workleap.design/tokens/core/font-weight\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-font-weight-400` | core\_400 | 400 | Aa |
| `--hop-font-weight-410` | core\_410 | 410 | Aa |
| `--hop-font-weight-505` | core\_505 | 505 | Aa |
| `--hop-font-weight-580` | core\_580 | 580 | Aa |
| `--hop-font-weight-590` | core\_590 | 590 | Aa |
| `--hop-font-weight-680` | core\_680 | 680 | Aa |
| `--hop-font-weight-690` | core\_690 | 690 | Aa |

## Line Height Tokens

[Tokens](https://hopper.workleap.design/tokens/core/line-height\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-line-height-1-125` | core\_1-125 | 1.125 | AaAa |
| `--hop-line-height-1-14` | core\_1-14 | 1.1428571 | AaAa |
| `--hop-line-height-1-20` | core\_1-20 | 1.2 | AaAa |
| `--hop-line-height-1-25` | core\_1-25 | 1.25 | AaAa |
| `--hop-line-height-1-33` | core\_1-33 | 1.3333333 | AaAa |
| `--hop-line-height-1-4285` | core\_1-4285 | 1.4285714 | AaAa |
| `--hop-line-height-1-50` | core\_1-50 | 1.5 | AaAa |

## Motion Utilities

Motion brings meaning and a sense of life to the experience. It should be purposeful, intuitive, and seamless. Our motion utilities consists of two set of values, _durations_ and _easings_.

[Usage](https://hopper.workleap.design/tokens/core/motion\#usage)

Both variables can be combined in [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) as well in [CSS animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) to set the tone of an animation/transition (animation is used interchangeably with transition from now on).

In a transition declaration:

```hd-code

.tease {
    transition: color var(--hop-easing-duration-1) var(--hop-easing-focus);
}

```

In an animation declaration:

```hd-code

@keyframes tease-animation  {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.tease {
    animation: tease-animation var(--hop-easing-duration-2) var(--hop-easing-productive);
}

```

[Tokens](https://hopper.workleap.design/tokens/core/motion\#tokens)

### [Duration](https://hopper.workleap.design/tokens/core/motion\#tokens-duration)

Hopper exposes 5 durations, they help convey a message and makes animations smooth and responsive.

| Name | Value |
| --- | --- |
| `--hop-easing-duration-1` | 100ms |
| `--hop-easing-duration-2` | 200ms |
| `--hop-easing-duration-3` | 300ms |
| `--hop-easing-duration-4` | 500ms |
| `--hop-easing-duration-5` | 800ms |

### [Easings](https://hopper.workleap.design/tokens/core/motion\#tokens-easings)

[Easings](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) denotes a mathematical function that describes the rate at which a numerical value changes.They add life to motion by providing natural rests and setting the mood of an animation. Hopper provides 3 predefined easings, each having their use.

#### [Productive](https://hopper.workleap.design/tokens/core/motion\#productive)

Used in animations that are not in the way, they quickly change from one state to another.

#### [Focus](https://hopper.workleap.design/tokens/core/motion\#focus)

Used in animations that are designed to draw the user’s attention on what changed, in order to let them move on with their next task.

#### [Expressive](https://hopper.workleap.design/tokens/core/motion\#expressive)

Used in animations that are meant to give a sense of completeness or resolution to the user. Use them sparsely.

| Name | Value |
| --- | --- |
| `--hop-easing-productive` | cubic-bezier(0.22, 0.61, 0.36, 1) |
| `--hop-easing-focus` | cubic-bezier(0.46, 0.03, 0.52, 0.96) |
| `--hop-easing-expressive` | cubic-bezier(0.72, -0.66, 0.15, 1.5) |

### [Playground](https://hopper.workleap.design/tokens/core/motion\#tokens-playground)

EasingExpressive▼

ProductiveFocusExpressive

DurationDuration 1 (100ms)▼

Duration 1 (100ms)Duration 2 (200ms)Duration 3 (300ms)Duration 4 (500ms)Duration 5 (800ms)

Play this motion

## Shadow Tokens

[Tokens](https://hopper.workleap.design/tokens/core/shadow\#tokens)

| Name | Styled-System Value | Value | Preview |
| --- | --- | --- | --- |
| `--hop-shadow-none` | core\_none | none |  |
| `--hop-shadow-sm` | core\_sm | 0 1px 6px 0 rgba(60, 60, 60, 0.10) |  |
| `--hop-shadow-md` | core\_md | 0 4px 10px 4px rgba(60, 60, 60, 0.08) |  |
| `--hop-shadow-lg` | core\_lg | 0 10px 18px 8px rgba(60, 60, 60, 0.08) |  |
