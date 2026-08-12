# useBreadcrumbs

Provides the behavior and accessibility implementation for a breadcrumbs component.
Breadcrumbs display a hierarchy of links to the current page or resource in an application.

```tsx
import {Breadcrumbs, Breadcrumb} from 'hooks-starter/Breadcrumbs';

<Breadcrumbs>
  <Breadcrumb onPress={() => alert('Pressed Folder 1')}>Folder 1</Breadcrumb>
  <Breadcrumb onPress={() => alert('Pressed Folder 2')}>Folder 2</Breadcrumb>
  <Breadcrumb>Folder 3</Breadcrumb>
</Breadcrumbs>
```

## API

```tsx
<Breadcrumbs>
  <Breadcrumb>
    <Link />
  </Breadcrumb>
</Breadcrumbs>
```

<FunctionAPIGroup functions={[
    {function: docs.exports.useBreadcrumbs, links: docs.links},
    {function: docs.exports.useBreadcrumbItem, links: docs.links},
  ]}/>

### AriaBreadcrumbsProps

| Name | Type | Description |
|------|------|-------------|
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `id` | `string | undefined` | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |

### BreadcrumbsAria

| Name | Type | Description |
|------|------|-------------|
| `navProps` \* | `DOMAttributes<FocusableElement>` | Props for the breadcrumbs navigation element. |

### AriaBreadcrumbItemProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` \* | `ReactNode` | — | The contents of the breadcrumb item. |
| `aria-current` | `boolean | "true" | "false" | "date" | "location" | "page" | "step" | "time" | undefined` | 'page' | The type of current location the breadcrumb item represents, if `isCurrent` is true. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `download` | `boolean | string | undefined` | — | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download). |
| `elementType` | `string | undefined` | 'a' | The HTML element used to render the breadcrumb link, e.g. 'a', or 'span'. |
| `href` | `string | undefined` | — | A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href). |
| `hrefLang` | `string | undefined` | — | Hints at the human language of the linked URL. See[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang). |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isCurrent` | `boolean | undefined` | — | Whether the breadcrumb item represents the current page. |
| `isDisabled` | `boolean | undefined` | — | Whether the breadcrumb item is disabled. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onClick` | `((e: MouseEvent<FocusableElement>) => void) | undefined` | — | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onPress` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when the press is released over the target. |
| `onPressChange` | `((isPressed: boolean) => void) | undefined` | — | Handler that is called when the press state changes. |
| `onPressEnd` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| `onPressStart` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction starts. |
| `onPressUp` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |
| `ping` | `string | undefined` | — | A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping). |
| `referrerPolicy` | `HTMLAttributeReferrerPolicy | undefined` | — | How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy). |
| `rel` | `string | undefined` | — | The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). |
| `routerOptions` | `undefined` | — | Options for the configured client side router. |
| `target` | `HTMLAttributeAnchorTarget | undefined` | — | The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). |

### BreadcrumbItemAria

| Name | Type | Description |
|------|------|-------------|
| `itemProps` \* | `DOMAttributes<FocusableElement>` | Props for the breadcrumb item link element. |
