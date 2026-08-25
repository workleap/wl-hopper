# TypeScript Conventions

## File Naming

| Contents                                         | Convention                  | Example                                  |
| ------------------------------------------------ | --------------------------- | ---------------------------------------- |
| React component                                  | PascalCase                  | `Button.tsx`, `IconButton.tsx`           |
| Class                                            | PascalCase                  | `ValidationService.ts`                   |
| A single type or interface matching the filename | PascalCase                  | `ButtonProps.ts`                         |
| Utility function                                 | camelCase                   | `formatDate.ts`, `mergeProps.ts`         |
| Configuration                                    | camelCase                   | `tokenMappings.ts`                       |
| Hook                                             | camelCase                   | `useHover.ts`                            |
| Constants, enums, shared types                   | camelCase                   | `colors.ts`, `breakpoints.ts`            |
| Test                                             | Matches the unit under test | `Button.test.tsx`, `useDebounce.test.ts` |

Component directories under `packages/components/src/` are kebab-case — `action-bar/`, `list-box/`.
