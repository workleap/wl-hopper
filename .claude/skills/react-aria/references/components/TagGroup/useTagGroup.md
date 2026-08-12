# useTagGroup

Provides the behavior and accessibility implementation for a tag group component. A tag group is
a focusable list of labels, categories, keywords, filters, or other items, with support for
keyboard navigation, selection, and removal.

```tsx
import {Tag, TagGroup} from 'hooks-starter/TagGroup';

<TagGroup
  label="Music genres"
  onAction={key => alert(`Clicked ${key}`)}
>
  <Tag id="rock">Rock</Tag>
  <Tag id="jazz">Jazz</Tag>
  <Tag id="pop">Pop</Tag>
  <Tag id="classical">Classical</Tag>
  <Tag id="edm">EDM</Tag>
</TagGroup>
```

## API

```tsx
<TagGroup>
  <Label />
  <TagList>
    <Tag>
      <SelectionIndicator />
      <Button slot="remove" />
    </Tag>
  </TagList>
  <Text slot="description" />
  <Text slot="errorMessage" />
</TagGroup>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useListState, links: statelyDocs.links},
    {function: docs.exports.useTagGroup, links: docs.links},
    {function: docs.exports.useTag, links: docs.links},
  ]}/>

### ListState

### AriaTagGroupProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` \* | `CollectionChildren<T>` | — | The contents of the collection. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `defaultSelectedKeys` | `"all" | Iterable<Key> | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `description` | `ReactNode` | — | A description for the field. Provides a hint such as specific requirements for what to choose. |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `disallowEmptySelection` | `boolean | undefined` | — | Whether the collection allows empty selection. |
| `errorMessage` | `ReactNode` | — | An error message for the field. |
| `escapeKeyBehavior` | `"clearSelection" | "none" | undefined` | 'clearSelection' | Whether pressing the escape key should clear selection in the TagGroup or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `label` | `ReactNode` | — | The content to display as the label. |
| `onAction` | `((key: Key) => void) | undefined` | — | Handler that is called when a user performs an action on an item. The exact user event depends on the collection's `selectionBehavior` prop and the interaction modality. |
| `onRemove` | `((keys: Set<Key>) => void) | undefined` | — | Handler that is called when a user deletes a tag. |
| `onSelectionChange` | `((keys: Selection) => void) | undefined` | — | Handler that is called when the selection changes. |
| `selectedKeys` | `"all" | Iterable<Key> | undefined` | — | The currently selected keys in the collection (controlled). |
| `selectionBehavior` | `SelectionBehavior | undefined` | 'toggle' | How multiple selection should behave in the collection. |
| `selectionMode` | `SelectionMode | undefined` | — | The type of selection that is allowed in the collection. |
| `shouldSelectOnPressUp` | `boolean | undefined` | — | Whether selection should occur on press up instead of press down. |

### TagGroupAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the tag group description element, if any. |
| `errorMessageProps` \* | `DOMAttributes<FocusableElement>` | Props for the tag group error message element, if any. |
| `gridProps` \* | `DOMAttributes<FocusableElement>` | Props for the tag grouping element. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the tag group's visible label (if any). |

### AriaTagProps

| Name | Type | Description |
|------|------|-------------|
| `item` \* | `Node<T>` | An object representing the tag. Contains all the relevant information that makes up the tag. |

### TagAria

| Name | Type | Description |
|------|------|-------------|
| `allowsRemoving` \* | `boolean` | Whether the tag can be removed. |
| `allowsSelection` \* | `boolean` | Whether the item may be selected, dependent on `selectionMode`, `disabledKeys`, and `disabledBehavior`. |
| `gridCellProps` \* | `DOMAttributes<FocusableElement>` | Props for the tag cell element. |
| `hasAction` \* | `boolean` | Whether the item has an action, dependent on `onAction`, `disabledKeys`, and `disabledBehavior`. It may also change depending on the current selection state of the list (e.g. when selection is primary). This can be used to enable or disable hover styles or other visual indications of interactivity. |
| `isDisabled` \* | `boolean` | Whether the item is non-interactive, i.e. both selection and actions are disabled and the item may not be focused. Dependent on `disabledKeys` and `disabledBehavior`. |
| `isFocused` \* | `boolean` | Whether the item is currently focused. |
| `isPressed` \* | `boolean` | Whether the item is currently in a pressed state. |
| `isSelected` \* | `boolean` | Whether the item is currently selected. |
| `removeButtonProps` \* | `AriaButtonProps<"button">` | Props for the tag remove button. |
| `rowProps` \* | `DOMAttributes<FocusableElement>` | Props for the tag row element. |
