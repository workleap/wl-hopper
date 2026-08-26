---
paths:
  - "packages/components/src/**/src/*.tsx"
---

# Component TSX

## Hard Rules

| Rule | Violation |
| ---- | --------- |
| Pass `className` and semantic props (`size`, `variant`, `color`, `slot`, `isHidden`) through a context object; leave raw styled-system CSS props out | `[HeadingContext, { fontWeight: "…", padding: "…" }]` |
| Reach for the semantic element or the React Aria component | A `div` with `onClick` and `role="button"`, which is not equivalent |
| Give an icon-only control an accessible name, and guard it at runtime as `Button`, `ToggleButton`, `Tabs` and `RichIconAvatarImage` do | An icon-only control types accept but screen readers cannot name |
| Leave `tabIndex` at 0 or -1 | `tabIndex={1}` — the repo is currently fully compliant |
| Express visual values through tokens, not a hand-written inline `style` object | A literal `style={{ padding: 8 }}` |
| Read browser globals inside an effect, a memo, or behind `useIsSSR()` | `window.matchMedia(…)` in a component body, as `SegmentedControlItem.tsx:63` still does |
| Take `useId` from `react-aria` | `import { useId } from "react"` |
| Export each component in its own statement | `export { _ComboBox as ComboBox, ListBoxItem as ComboBoxItem }` |

Grouped exports make `react-docgen-typescript` attribute one component's props to another, corrupting
the generated documentation — see `contributing/components.md`. All 101 exports are currently clean;
the rule is a regression guard. Assign first, then export:

```tsx
export const ComboBoxItem = ListBoxItem;
export { _ComboBox as ComboBox };
```

Prefer a React Aria Component over its hooks; drop to the hooks only when the component API is too
rigid, and record why, as `TooltipTrigger` does in a code comment.

## Server rendering

71 of 116 components have a `tests/vitest/<Name>.ssr.test.tsx`. Add one with every new component:

```tsx
/**
 * @vitest-environment node
 */
import { renderToString } from "react-dom/server";

import { Button } from "../../src/Button.tsx";

describe("Button", () => {
    it("should render on the server", () => {
        const renderOnServer = () => renderToString(<Button>Cutoff</Button>);

        expect(renderOnServer).not.toThrow();
    });
});
```
