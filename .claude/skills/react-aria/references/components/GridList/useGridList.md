# useGridList

Provides the behavior and accessibility implementation for a list component with interactive
children. A grid list displays data in a single column and enables a user to navigate its
contents via directional navigation keys.

```tsx
import {GridList, GridListItem, Text} from 'hooks-starter/GridList';

<GridList aria-label="Photos" selectionMode="multiple" layout="grid">
  <GridListItem textValue="Desert Sunset">
    <img src="https://images.unsplash.com/photo-1705034598432-1694e203cdf3?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={400} alt="" />
    <Text>Desert Sunset</Text>
    <Text slot="description">PNG • 2/3/2024</Text>
  </GridListItem>
  <GridListItem textValue="Hiking Trail">
    <img src="https://images.unsplash.com/photo-1722233987129-61dc344db8b6?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} alt="" />
    <Text>Hiking Trail</Text>
    <Text slot="description">JPEG • 1/10/2022</Text>
  </GridListItem>
  <GridListItem textValue="Lion">
    <img src="https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={899} alt="" />
    <Text>Lion</Text>
    <Text slot="description">JPEG • 8/28/2021</Text>
  </GridListItem>
  <GridListItem textValue="Mountain Sunrise">
    <img src="https://images.unsplash.com/photo-1722172118908-1a97c312ce8c?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} alt="" />
    <Text>Mountain Sunrise</Text>
    <Text slot="description">PNG • 3/15/2015</Text>
  </GridListItem>
  <GridListItem textValue="Giraffe tongue">
    <img src="https://images.unsplash.com/photo-1574870111867-089730e5a72b?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={900} alt="" />
    <Text>Giraffe tongue</Text>
    <Text slot="description">PNG • 11/27/2019</Text>
  </GridListItem>
  <GridListItem textValue="Golden Hour">
    <img src="https://images.unsplash.com/photo-1718378037953-ab21bf2cf771?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={402} alt="" />
    <Text>Golden Hour</Text>
    <Text slot="description">WEBP • 7/24/2024</Text>
  </GridListItem>
  <GridListItem textValue="Architecture">
    <img src="https://images.unsplash.com/photo-1721661657253-6621d52db753?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYxfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D" width={600} height={900} alt="" />
    <Text>Architecture</Text>
    <Text slot="description">PNG • 12/24/2016</Text>
  </GridListItem>
  <GridListItem textValue="Peeking leopard">
    <img src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={400} alt="" />
    <Text>Peeking leopard</Text>
    <Text slot="description">JPEG • 3/2/2016</Text>
  </GridListItem>
  <GridListItem textValue="Roofs">
    <img src="https://images.unsplash.com/photo-1721598359121-363311b3b263?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc0fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D" width={600} height={900} alt="" />
    <Text>Roofs</Text>
    <Text slot="description">JPEG • 4/24/2025</Text>
  </GridListItem>
  <GridListItem textValue="Half Dome Deer">
    <img src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={990} alt="" />
    <Text>Half Dome Deer</Text>
    <Text slot="description">DNG • 8/28/2018</Text>
  </GridListItem>
</GridList>
```

## API

```tsx
<GridList>
  <GridListItem>
    <Button slot="drag" />
    <Checkbox slot="selection" /> or <SelectionIndicator />
  </GridListItem>
  <GridListLoadMoreItem />
</GridList>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useListState, links: statelyDocs.links},
    {function: docs.exports.useGridList, links: docs.links},
    {function: docs.exports.useGridListItem, links: docs.links},
    {function: docs.exports.useGridListSelectionCheckbox, links: docs.links},
  ]}/>

### ListState

### AriaGridListProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` \* | `CollectionChildren<T>` | — | The contents of the collection. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | FocusStrategy | undefined` | — | Whether to auto focus the gridlist or an option. |
| `defaultSelectedKeys` | `"all" | Iterable<Key> | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `disabledBehavior` | `DisabledBehavior | undefined` | 'all' | Whether `disabledKeys` applies to all interactions, or only selection. |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `disallowEmptySelection` | `boolean | undefined` | — | Whether the collection allows empty selection. |
| `escapeKeyBehavior` | `"clearSelection" | "none" | undefined` | 'clearSelection' | Whether pressing the escape key should clear selection in the grid list or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `keyboardNavigationBehavior` | `"arrow" | "tab" | undefined` | 'arrow' | Whether keyboard navigation to focusable elements within grid list items is via the left/right arrow keys or the tab key. |
| `onAction` | `((key: Key) => void) | undefined` | — | Handler that is called when a user performs an action on an item. The exact user event depends on the collection's `selectionBehavior` prop and the interaction modality. |
| `onSelectionChange` | `((keys: Selection) => void) | undefined` | — | Handler that is called when the selection changes. |
| `selectedKeys` | `"all" | Iterable<Key> | undefined` | — | The currently selected keys in the collection (controlled). |
| `selectionMode` | `SelectionMode | undefined` | — | The type of selection that is allowed in the collection. |
| `shouldSelectOnPressUp` | `boolean | undefined` | — | Whether selection should occur on press up instead of press down. |

### GridListAria

| Name | Type | Description |
|------|------|-------------|
| `gridProps` \* | `DOMAttributes<FocusableElement>` | Props for the grid element. |

### AriaGridListItemOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` \* | `RSNode<unknown>` | — | An object representing the list item. Contains all the relevant information that makes up the list row. |
| `allowsArrowNavigation` | `boolean | undefined` | — | Whether the row should support arrow key navigation even when the containing collection uses tab keyboard navigation. Allows users to navigate between rows with arrow keys while focus is on an interactive child element within the row. |
| `focusMode` | `"child" | "row" | undefined` | 'row' | Whether the row or its first focusable child element should be focused when the row is focused. |
| `hasChildItems` | `boolean | undefined` | — | Whether this item has children, even if not loaded yet. |
| `isVirtualized` | `boolean | undefined` | — | Whether the list row is contained in a virtual scroller. |
| `shouldSelectOnPressUp` | `boolean | undefined` | — | Whether selection should occur on press up instead of press down. |

### GridListItemAria

| Name | Type | Description |
|------|------|-------------|
| `allowsSelection` \* | `boolean` | Whether the item may be selected, dependent on `selectionMode`, `disabledKeys`, and `disabledBehavior`. |
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the list item description element, if any. |
| `gridCellProps` \* | `DOMAttributes<FocusableElement>` | Props for the grid cell element within the list row. |
| `hasAction` \* | `boolean` | Whether the item has an action, dependent on `onAction`, `disabledKeys`, and `disabledBehavior`. It may also change depending on the current selection state of the list (e.g. when selection is primary). This can be used to enable or disable hover styles or other visual indications of interactivity. |
| `isDisabled` \* | `boolean` | Whether the item is non-interactive, i.e. both selection and actions are disabled and the item may not be focused. Dependent on `disabledKeys` and `disabledBehavior`. |
| `isFocused` \* | `boolean` | Whether the item is currently focused. |
| `isPressed` \* | `boolean` | Whether the item is currently in a pressed state. |
| `isSelected` \* | `boolean` | Whether the item is currently selected. |
| `rowProps` \* | `DOMAttributes<FocusableElement>` | Props for the list row element. |
