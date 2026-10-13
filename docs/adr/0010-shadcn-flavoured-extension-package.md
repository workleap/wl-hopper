# ADR-0010: A shadcn-flavoured extension package

## Status

Accepted (2026-09-25)

## Context

Designers regularly ask for a component that [shadcn/ui](https://ui.shadcn.com) has and Hopper does not. Today the answer is either "wait for a Hopper port" — weeks of API design, token work, design review and documentation — or "hand-roll it in product code", which produces an unowned, untokenized, usually inaccessible component that nobody maintains.

In July 2026 shadcn/ui shipped a first-party **React Aria base** alongside its Radix and Base UI ones. That removes the obstacle that previously made this expensive. Its components are `react-aria-components` — the same primitive foundation Hopper stands on (ADR-0003), at the same version this repo already pins. The shadcn Slider, measured concretely, is React Aria's Slider plus a fixed DOM structure, four `data-slot` attributes, one `cn()` call and roughly forty-five Tailwind declarations. It adds no props, renames nothing, and changes no default.

So the cost of a port is: rewrite the Tailwind as CSS, substitute Hopper semantic tokens for shadcn's theme variables. That is small enough to be worth doing speculatively; a full Hopper port is not.

What it is not is free of consequence. The result has a different API style and a different customization model than `@hopper-ui/components`, and pretending otherwise would produce a package that is neither one thing nor the other.

## Decision

Ship `@hopper-ui/shadcn-extension` as a **first-class package**, supported on the same terms as `@hopper-ui/components`. It is not a staging area, not a lab, not experimental.

### The no-overlap invariant

A component name lives in **exactly one package**. There is never a Hopper Slider and an extension Slider.

This is what makes the selection rule trivial — "is it in `@hopper-ui/components`? use that; otherwise check the extension" — and it is what keeps the generated documentation data, which is keyed by bare component name into a single folder, unambiguous.

When a component graduates into `@hopper-ui/components`, the extension copy is deprecated with a migration note and removed at the next major. "First-class" means supported while it exists, not supported forever.

### The API is React Aria's, verbatim

ADR-0007 does not govern this package. Whatever React Aria calls a prop, we call it: `minValue`, not `min`; `isDisabled`, not `disabled`; `onChange` and `onChangeEnd`. A consumer can read the React Aria documentation and it is correct.

This is the property that makes porting cheap: there is no API design step. It is also the property that makes the package legible to someone arriving from a shadcn codebase.

We follow the upstream component's structure too, including where it is a _reduction_ of React Aria's. shadcn's Slider is a single closed component with no `Label` and no `SliderOutput`; ours is the same, and labelling is therefore the consumer's job via `aria-label` or `aria-labelledby`.

Three categories of deviation are sanctioned, and only these three:

1. **Tokens replace literals.** shadcn's `bg-white` becomes `--hop-neutral-surface`, because a hardcoded white thumb is wrong in dark mode.
2. **React Aria's `data-*` state attributes replace CSS pseudo-classes.** React Aria moves focus onto a visually hidden input inside the thumb, so shadcn's `focus-visible:` rule on the wrapper can never match. `[data-focus-visible]` is the working equivalent, not a redesign.
3. **Dead upstream declarations are dropped** rather than faithfully copied — a `:disabled` rule on a `div`, a `position: relative` that an inline `position: absolute` always overrides.

Additive type-level corrections are also allowed where they remove nothing a consumer could use: `children` is omitted from `SliderProps` because the component supplies its own render function and would discard it, and the props type is exported where shadcn keeps it local.

### `className` is the only styling API

ADR-0005 does not govern this package. There are no style props, no `UNSAFE_*`, no dependency on `@hopper-ui/styled-system` beyond the tokens.

To make that an actual contract rather than a race, every rule ships inside `@layer hopper-shadcn-extension`. Layered styles always lose to unlayered ones, so a consumer's `className` wins regardless of the order stylesheets load in. This reproduces the base-versus-utility behaviour Tailwind gets from its own layers, without Tailwind.

Components are authored as CSS Modules, as everywhere else in the repo, so class idents carry the package version and two majors cannot collide on one page. Each element additionally carries an unhashed `hop-<Name>__element` class and shadcn's `data-slot` attribute. All three surfaces are public API and are covered by ADR-0008.

### Semantic tokens, no component tokens

Colours, radii and motion resolve to Hopper **semantic** tokens. ADR-0004's prohibition on literals holds in spirit; its mechanism does not.

This package contributes nothing to `packages/tokens`. Geometry that shadcn has no Hopper equivalent for — a track thickness, a thumb diameter, a ring width — is declared as a local `--hop-<Component>-*` custom property on the module root. That keeps the values in one place, gives consumers a documented override surface, and avoids growing the component-token layer with values only one package reads.

The cost is real: the `--hop-comp-*` layer is the seam through which Workleap and ShareGate diverge _per component_, and this package gives that up. Brand divergence still works, because each brand has its own semantic tier.

### Accessibility and React Aria are not negotiable

ADR-0003 and ADR-0009 apply unchanged. React Aria owns behaviour, keyboard support, RTL and the accessibility tree, and we do not reimplement any of it.

Where shadcn's _visual_ treatment conflicts with Hopper's, shadcn wins — that is the point of the package. Where shadcn's _behaviour_ would be less accessible than React Aria's, React Aria wins.

### It requires a Hopper application

`@hopper-ui/styled-system` and `@hopper-ui/components` are both peer dependencies. The `--hop-*` properties are declared on a version-stamped root class, not on `:root`, so a component rendered outside a `HopperProvider` subtree gets unresolved `var()`s.

### The house style is `nova`

shadcn ships eight visual styles of every component, and they differ substantially. `nova` is the CLI default and therefore what a designer browsing shadcn most likely saw. Every component in this package is ported from `nova`.

## Consequences

### Positive

- A component Hopper lacks goes from "weeks" to "a port", and the result is tokenized, themed, accessible and owned.
- Consumers arriving from a shadcn codebase find the API they expect, and React Aria's documentation is accurate for it.
- Porting is mechanical enough to be captured in the `_port-shadcn-component` skill, so the second component is cheaper than the first.

### Negative

- Two API styles exist in the design system, and every contributor has to know which package they are in. The package's `AGENTS.md` and this ADR exist to make that unambiguous.
- Per-component brand divergence is not available here.
- Tracking upstream is manual. shadcn does not pin `react-aria-components` for consumers, and a registry component can change under us without notice.
- The package name references a third party whose direction we do not control.

### Neutral

- `validate_hopper_code` and the published Hopper agent Skill currently flag `className` as a violation, because that rule is written for `@hopper-ui/components`. On a component from this package that is a false positive. Teaching the validator to recognise the package is deferred to its own change; until then the documentation says so plainly.
- The docs site gains a fifth top-level section, and the two generator scripts that were hardcoded to `packages/components` now take a list of packages.

## Options considered

### Option A — Port the component into `@hopper-ui/components` as normal

The status quo. Produces one coherent design system and one API style, and it is exactly the cost this ADR exists to avoid. It also means the answer to a designer's request stays "not this quarter".

### Option B — Adopt the full shadcn distribution model

Publish a registry and have consumers copy source into their own repositories, as shadcn does. This suits shadcn because ownership-by-copy is its thesis. It does not suit a design system whose value is centralised maintenance and coordinated upgrades, and it would put a hundred divergent copies of each component into Workleap products.

### Option C — Ship it as an experimental `0.x` lab package

Lower commitment, and a plausible default for something new. Rejected because a package nobody can depend on does not solve the problem: the designer still does not get their component into production. The no-overlap invariant plus deprecation-on-graduation gives us the exit route that "experimental" was supposed to provide.

### Option D — Keep the shadcn look but Hopper's API and style props

Would preserve ADR-0005 and ADR-0007 intact. Rejected because it reintroduces the API design step per component, which is most of the cost, and the result would be neither Hopper's component nor shadcn's.

## Sources

- [shadcn/ui React Aria base, July 2026](https://ui.shadcn.com/docs/changelog/2026-07-react-aria)
- [React Aria Components](https://react-aria.adobe.com)
- ADR-0003, ADR-0004, ADR-0005, ADR-0007, ADR-0008, ADR-0009
- `packages/shadcn-extension/AGENTS.md` — the imperative form of the rules above
