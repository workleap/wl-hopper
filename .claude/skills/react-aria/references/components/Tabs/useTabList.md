# useTabList

Provides the behavior and accessibility implementation for a tab list.
Tabs organize content into multiple sections and allow users to navigate between them.

```tsx
import {Tab, Tabs} from 'hooks-starter/Tabs';

<Tabs aria-label="History of Ancient Rome">
  <Tab id="FoR" title="Founding of Rome">Arma virumque cano, Troiae qui primus ab oris.</Tab>
  <Tab id="MaR" title="Monarchy and Republic">Senatus Populusque Romanus.</Tab>
  <Tab id="Emp" title="Empire">Alea jacta est.</Tab>
</Tabs>
```

## API

```tsx
<Tabs>
  <TabList>
    <Tab>
      <SelectionIndicator />
    </Tab>
  </TabList>
  <TabPanels>
    <TabPanel />
  </TabPanels>
</Tabs>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useTabListState, links: statelyDocs.links},
    {function: docs.exports.useTabList, links: docs.links},
    {function: docs.exports.useTab, links: docs.links},
    {function: docs.exports.useTabPanel, links: docs.links},
  ]}/>

### TabListState

### AriaTabListOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `defaultSelectedKey` | `Key | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDisabled` | `boolean | undefined` | — | Whether the TabList is disabled. Shows that a selection exists, but is not available in that circumstance. |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `keyboardActivation` | `"automatic" | "manual" | undefined` | 'automatic' | Whether tabs are activated automatically on focus or manually. |
| `onSelectionChange` | `((key: Key) => void) | undefined` | — | Handler that is called when the selection changes. |
| `orientation` | `Orientation | undefined` | 'horizontal' | The orientation of the tabs. |
| `selectedKey` | `Key | undefined` | — | The currently selected key in the collection (controlled). |

### TabListAria

| Name | Type | Description |
|------|------|-------------|
| `tabListProps` \* | `DOMAttributes<FocusableElement>` | Props for the tablist container. |

### AriaTabProps

| Name | Type | Description |
|------|------|-------------|
| `key` \* | `Key` | The key of the tab. |
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `isDisabled` | `boolean | undefined` | Whether the tab should be disabled. |
| `shouldSelectOnPressUp` | `boolean | undefined` | Whether the tab selection should occur on press up instead of press down. |

### TabAria

| Name | Type | Description |
|------|------|-------------|
| `isDisabled` \* | `boolean` | Whether the tab is disabled. |
| `isPressed` \* | `boolean` | Whether the tab is currently in a pressed state. |
| `isSelected` \* | `boolean` | Whether the tab is currently selected. |
| `tabProps` \* | `DOMAttributes<FocusableElement>` | Props for the tab element. |

### AriaTabPanelProps

| Name | Type | Description |
|------|------|-------------|
| `aria-describedby` | `string | undefined` | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | Identifies the element (or elements) that labels the current element. |
| `id` | `Key | undefined` | The unique id of the tab. |

### TabPanelAria

| Name | Type | Description |
|------|------|-------------|
| `tabPanelProps` \* | `DOMAttributes<FocusableElement>` | Props for the tab panel element. |
