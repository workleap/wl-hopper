# TypeScript Conventions

## File Naming

Every example below is a real file in this repo.

| Contents              | Convention                     | Example                                  |
| --------------------- | ------------------------------ | ---------------------------------------- |
| React component       | PascalCase                     | `LinkButton.tsx`, `CloseButton.tsx`      |
| A component's context | PascalCase, `<Name>Context.ts` | `ButtonContext.ts`                       |
| Utility function      | camelCase                      | `cssModule.ts`, `omitProps.ts`           |
| Hook                  | camelCase                      | `useDebounce.ts`, `useSlot.ts`           |
| Configuration         | camelCase                      | `tokenMappings.ts`                       |
| Shared types          | camelCase                      | `types.ts`, `styledSystemProps.ts`       |
| Test                  | Matches the unit under test    | `Button.test.tsx`, `useDebounce.test.ts` |

A component's props interface lives inside the component file — `export interface ComboBoxProps` in
`ComboBox.tsx` — not in a standalone `*Props.ts`.

Two accepted deviations: `Breakpoints.ts` is PascalCase despite exporting constants, and
`Badge.utils.ts` / `Tag.utils.ts` use a PascalCase `<Name>.utils.ts` form.

## Directories

Component directories under `packages/components/src/` are kebab-case — `action-bar/`, `list-box/` —
and hold a component _group_, not one component each. `buttons/`, `inputs/`, `layout/`, `overlays/`
and `typography/` each hold several. `combobox/` is the one name that does not kebab its component
(`ComboBox`).
