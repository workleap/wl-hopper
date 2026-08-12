# useMenu

Provides the behavior and accessibility implementation for a menu component.
A menu displays a list of actions or options that a user can choose.

```tsx
import {MenuButton, MenuItem} from 'hooks-starter/Menu';

<MenuButton aria-label="Actions" onAction={key => alert(key)}>
  <MenuItem id="copy">Copy</MenuItem>
  <MenuItem id="cut">Cut</MenuItem>
  <MenuItem id="paste">Paste</MenuItem>
</MenuButton>
```

## API

```tsx
<MenuTrigger>
  <Button />
  <Popover>
    <Menu>
      <MenuItem>
        <Text slot="label" />
        <Text slot="description" />
        <Keyboard />
        <SelectionIndicator />
      </MenuItem>
      <Separator />
      <MenuSection>
        <Header />
        <MenuItem />
      </MenuSection>
      <SubmenuTrigger>
        <MenuItem />
        <Popover>
          <Menu />
        </Popover>
      </SubmenuTrigger>
    </Menu>
  </Popover>
</MenuTrigger>
```

<FunctionAPIGroup functions={[
    {function: menuStatelyDocs.exports.useMenuTriggerState, links: menuStatelyDocs.links},
    {function: treeStatelyDocs.exports.useTreeState, links: treeStatelyDocs.links},
    {function: docs.exports.useMenuTrigger, links: docs.links},
    {function: docs.exports.useMenu, links: docs.links},
    {function: docs.exports.useMenuItem, links: docs.links},
    {function: docs.exports.useMenuSection, links: docs.links},
  ]}/>

### MenuTriggerState

### TreeState

### AriaMenuTriggerProps

| Name | Type | Description |
|------|------|-------------|
| `isDisabled` | `boolean | undefined` | Whether menu trigger is disabled. |
| `trigger` | `MenuTriggerType | undefined` | How menu is triggered. |
| `type` | `"listbox" | "menu" | undefined` | The type of menu that the menu trigger opens. |

### MenuTriggerAria

| Name | Type | Description |
|------|------|-------------|
| `menuProps` \* | `AriaMenuOptions<T>` | Props for the menu. |
| `menuTriggerProps` \* | `AriaButtonProps<"button">` | Props for the menu trigger element. |

### AriaMenuOptions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | FocusStrategy | undefined` | — | Where the focus should be set. |
| `defaultSelectedKeys` | `"all" | Iterable<Key> | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `disallowEmptySelection` | `boolean | undefined` | — | Whether the collection allows empty selection. |
| `escapeKeyBehavior` | `"clearSelection" | "none" | undefined` | 'clearSelection' | Whether pressing the escape key should clear selection in the menu or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isVirtualized` | `boolean | undefined` | — | Whether the menu uses virtual scrolling. |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `keyboardDelegate` | `KeyboardDelegate | undefined` | — | An optional keyboard delegate implementation for type to select, to override the default. |
| `onAction` | `((key: Key, value: T) => void) | undefined` | — | Handler that is called when an item is selected. |
| `onClose` | `(() => void) | undefined` | — | Handler that is called when the menu should close after selecting an item. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onSelectionChange` | `((keys: Selection) => void) | undefined` | — | Handler that is called when the selection changes. |
| `selectedKeys` | `"all" | Iterable<Key> | undefined` | — | The currently selected keys in the collection (controlled). |
| `selectionMode` | `SelectionMode | undefined` | — | The type of selection that is allowed in the collection. |
| `shouldFocusWrap` | `boolean | undefined` | — | Whether keyboard navigation is circular. |
| `shouldUseVirtualFocus` | `boolean | undefined` | — | Whether the menu items should use virtual focus instead of being focused directly. |

### MenuAria

| Name | Type | Description |
|------|------|-------------|
| `menuProps` \* | `DOMAttributes<FocusableElement>` | Props for the menu element. |

### AriaMenuItemProps

| Name | Type | Description |
|------|------|-------------|
| `key` \* | `Key` | The unique key for the menu item. |
| `aria-controls` | `string | undefined` | Identifies the menu item's popup element whose contents or presence is controlled by the menu item. |
| `aria-describedby` | `string | undefined` | Identifies the element(s) that describe the menu item. |
| `aria-expanded` | `boolean | "true" | "false" | undefined` | Indicates whether the menu item's popup element is expanded or collapsed. |
| `aria-haspopup` | `"dialog" | "menu" | undefined` | What kind of popup the item opens. |
| `aria-label` | `string | undefined` | A screen reader only label for the menu item. |
| `id` | `string | undefined` | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isVirtualized` | `boolean | undefined` | Whether the menu item is contained in a virtual scrolling menu. |
| `onBlur` | `((e: FocusEvent<Element>) => void) | undefined` | Handler that is called when the element loses focus. |
| `onClick` | `((e: MouseEvent<FocusableElement>) => void) | undefined` | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `onFocus` | `((e: FocusEvent<Element>) => void) | undefined` | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | Handler that is called when the element's focus status changes. |
| `onHoverChange` | `((isHovering: boolean) => void) | undefined` | Handler that is called when the hover state changes. |
| `onHoverEnd` | `((e: HoverEvent) => void) | undefined` | Handler that is called when a hover interaction ends. |
| `onHoverStart` | `((e: HoverEvent) => void) | undefined` | Handler that is called when a hover interaction starts. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | Handler that is called when a key is released. |
| `onPress` | `((e: PressEvent) => void) | undefined` | Handler that is called when the press is released over the target. |
| `onPressChange` | `((isPressed: boolean) => void) | undefined` | Handler that is called when the press state changes. |
| `onPressEnd` | `((e: PressEvent) => void) | undefined` | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| `onPressStart` | `((e: PressEvent) => void) | undefined` | Handler that is called when a press interaction starts. |
| `onPressUp` | `((e: PressEvent) => void) | undefined` | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |
| `selectionManager` | `SelectionManager | undefined` | Override of the selection manager. By default, `state.selectionManager` is used. |
| `shouldCloseOnSelect` | `boolean | undefined` | Whether the menu should close when the menu item is selected. |

### MenuItemAria

| Name | Type | Description |
|------|------|-------------|
| `descriptionProps` \* | `DOMAttributes<FocusableElement>` | Props for the description text element inside the menu item, if any. |
| `isDisabled` \* | `boolean` | Whether the item is disabled. |
| `isFocused` \* | `boolean` | Whether the item is currently focused. |
| `isFocusVisible` \* | `boolean` | Whether the item is keyboard focused. |
| `isPressed` \* | `boolean` | Whether the item is currently in a pressed state. |
| `isSelected` \* | `boolean` | Whether the item is currently selected. |
| `keyboardShortcutProps` \* | `DOMAttributes<FocusableElement>` | Props for the keyboard shortcut text element inside the item, if any. |
| `labelProps` \* | `DOMAttributes<FocusableElement>` | Props for the main text element inside the menu item. |
| `menuItemProps` \* | `DOMAttributes<FocusableElement>` | Props for the menu item element. |

### AriaMenuSectionProps

| Name | Type | Description |
|------|------|-------------|
| `aria-label` | `string | undefined` | An accessibility label for the section. Required if `heading` is not present. |
| `heading` | `ReactNode` | The heading for the section. |

### MenuSectionAria

| Name | Type | Description |
|------|------|-------------|
| `groupProps` \* | `DOMAttributes<FocusableElement>` | Props for the group element. |
| `headingProps` \* | `DOMAttributes<FocusableElement>` | Props for the heading element, if any. |
| `itemProps` \* | `DOMAttributes<FocusableElement>` | Props for the wrapper list item. |
