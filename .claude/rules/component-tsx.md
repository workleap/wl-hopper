---
paths:
  - "packages/components/src/**/src/*.tsx"
---

# Component TSX

## Hard Rules

| Rule                                                                                        | Violation                                                        |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Pass only `className` through a context object; put the visual value in the CSS module       | `[HeadingContext, { fontWeight: "heading-xs-medium" }]`          |
| Read browser globals inside an effect or a guard, never at render or module scope            | `const w = window.innerWidth` in a component body                |
| Derive ids from React's `useId` so the server and client markup agree                        | `id={Math.random()}`, `Date.now()` at render                     |
| Export each component in its own statement                                                  | `export { _ComboBox as ComboBox, ListBoxItem as ComboBoxItem }`  |

Grouped exports make `react-docgen-typescript` attribute one component's props to another, which
corrupts the generated documentation. Assign first, then export:

```tsx
export const ComboBoxItem = ListBoxItem;
export { _ComboBox as ComboBox };
```

## Server rendering

Every component carries a `tests/vitest/<Name>.ssr.test.tsx` proving it renders under Node. Add one
with each new component:

```tsx
/**
 * @vitest-environment node
 */
describe("Button", () => {
    it("should render on the server", () => {
        expect(() => renderToString(<Button>Cutoff</Button>)).not.toThrow();
    });
});
```
