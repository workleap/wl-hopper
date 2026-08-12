# useListBox

Provides the behavior and accessibility implementation for a listbox component.
A listbox displays a list of options and allows a user to select one or more of them.

```tsx
import {ListBox, ListBoxItem} from 'hooks-starter/ListBox';

<ListBox aria-label="Alignment" selectionMode="single">
  <ListBoxItem id="left">Left</ListBoxItem>
  <ListBoxItem id="middle">Middle</ListBoxItem>
  <ListBoxItem id="right">Right</ListBoxItem>
</ListBox>
```

## API

```tsx
<ListBox>
  <ListBoxItem>
    <Text slot="label" />
    <Text slot="description" />
    <SelectionIndicator />
  </ListBoxItem>
  <ListBoxSection>
    <Header />
    <ListBoxItem />
  </ListBoxSection>
  <ListBoxLoadMoreItem />
</ListBox>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useListState, links: statelyDocs.links},
    {function: docs.exports.useListBox, links: docs.links},
    {function: docs.exports.useOption, links: docs.links},
    {function: docs.exports.useListBoxSection, links: docs.links},
  ]}/>

### ListState

### AriaListBoxOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | FocusStrategy | undefined` | — | Whether to auto focus the listbox or an option. |
| `defaultSelectedKeys` | `"all" | Iterable<Key> | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `disallowEmptySelection` | `boolean | undefined` | — | Whether the collection allows empty selection. |
| `escapeKeyBehavior` | `"clearSelection" | "none" | undefined` | 'clearSelection' | Whether pressing the escape key should clear selection in the listbox or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isVirtualized` | `boolean | undefined` | — | Whether the listbox uses virtual scrolling. |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `keyboardDelegate` | `KeyboardDelegate | undefined` | — | An optional keyboard delegate implementation for type to select, to override the default. |
| `label` | `ReactNode` | — | An optional visual label for the listbox. |
| `layoutDelegate` | `LayoutDelegate | undefined` | — | A delegate object that provides layout information for items in the collection. By default this uses the DOM, but this can be overridden to implement things like virtualized scrolling. |
| `linkBehavior` | `"action" | "override" | "selection" | undefined` | 'override' | The behavior of links in the collection. - 'action': link behaves like onAction. - 'selection': link follows selection interactions (e.g. if URL drives selection). - 'override': links override all other interactions (link items are not selectable). |
| `onAction` | `((key: Key) => void) | undefined` | — | Handler that is called when a user performs an action on an item. The exact user event depends on the collection's `selectionBehavior` prop and the interaction modality. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onSelectionChange` | `((keys: Selection) => void) | undefined` | — | Handler that is called when the selection changes. |
| `orientation` | `Orientation | undefined` | 'vertical' | The primary orientation of the items. Usually this is the direction that the collection scrolls. |
| `selectedKeys` | `"all" | Iterable<Key> | undefined` | — | The currently selected keys in the collection (controlled). |
| `selectionBehavior` | `SelectionBehavior | undefined` | — | How multiple selection should behave in the collection. |
| `selectionMode` | `SelectionMode | undefined` | — | The type of selection that is allowed in the collection. |
| `shouldFocusOnHover` | `boolean | undefined` | — | Whether options should be focused when the user hovers over them. |
| `shouldFocusWrap` | `boolean | undefined` | — | Whether focus should wrap around when the end/start is reached. |
| `shouldSelectOnPressUp` | `boolean | undefined` | — | Whether selection should occur on press up instead of press down. |
| `shouldUseVirtualFocus` | `boolean | undefined` | — | Whether the listbox items should use virtual focus instead of being focused directly. |

### ListBoxAria

| Name | Type | Description |
|------|------|-------------|
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the listbox's visual label element (if any). |
| `listBoxProps` \* | `DOMAttributes<FocusableElement>` | Props for the listbox element. |

### AriaOptionProps

| Name | Type | Description |
|------|------|-------------|
| `key` \* | `Key` | The unique key for the option. |
| `aria-label` | `string | undefined` | A screen reader only label for the option. |

### OptionAria

| Name | Type | Description |
|------|------|-------------|
| `allowsSelection` \* | `boolean` | Whether the item may be selected, dependent on `selectionMode`, `disabledKeys`, and `disabledBehavior`. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the description text element inside the option, if any. |
| `hasAction` \* | `boolean` | Whether the item has an action, dependent on `onAction`, `disabledKeys`, and `disabledBehavior`. It may also change depending on the current selection state of the list (e.g. when selection is primary). This can be used to enable or disable hover styles or other visual indications of interactivity. |
| `isDisabled` \* | `boolean` | Whether the item is non-interactive, i.e. both selection and actions are disabled and the item may not be focused. Dependent on `disabledKeys` and `disabledBehavior`. |
| `isFocused` \* | `boolean` | Whether the option is currently focused. |
| `isFocusVisible` \* | `boolean` | Whether the option is keyboard focused. |
| `isPressed` \* | `boolean` | Whether the item is currently in a pressed state. |
| `isSelected` \* | `boolean` | Whether the item is currently selected. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the main text element inside the option. |
| `optionProps` \* | `DOMAttributes<FocusableElement>` | Props for the option element. |

### AriaListBoxSectionProps

| Name | Type | Description |
|------|------|-------------|
| `aria-label` | `string | undefined` | An accessibility label for the section. Required if `heading` is not present. |
| `heading` | `ReactNode` | The heading for the section. |

### ListBoxSectionAria

| Name | Type | Description |
|------|------|-------------|
| `groupProps` \* | `DOMAttributes<FocusableElement>` | Props for the group element. |
| `headingProps` \* | `DOMAttributes<FocusableElement>` | Props for the heading element, if any. |
| `itemProps` \* | `DOMAttributes<FocusableElement>` | Props for the wrapper list item. |
