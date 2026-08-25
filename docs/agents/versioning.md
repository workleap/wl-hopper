# Versioning

Hopper packages are shared dependencies of Module Federation applications, so two versions must be
able to coexist in one page while an update rolls out.

## Hard Rules

| Rule                                                                                          | Violation                                                           |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Keep a release backwards compatible; ship a compatibility package when a break is unavoidable | Renaming an exported prop in a minor                                |
| Carry styles on the hashed CSS-module class, via `cssModule(styles, "hop-Name", ...)`         | Writing style declarations against the unhashed `hop-Name` selector |
| Keep the `Global<Name>CssSelector` export an addressable hook only                            | Two versions both styling the same global `.hop-Button`             |
| Scope token custom properties per remote module, or hash them per release                     | A single global `--hop-*` value two versions overwrite              |
| Treat reliance on a single unscoped global CSS name as a breaking change                      | Shipping it as a patch                                              |

## The two class names

Each component emits both, and the split is what makes parallel versions safe:

| Class                           | Hashed | Purpose                                                 |
| ------------------------------- | ------ | ------------------------------------------------------- |
| `cssModule(styles, "hop-Name")` | Yes    | Carries every style declaration                         |
| `Global<Name>CssSelector`       | No     | Lets a consumer target the component; carries no styles |
