# useTable

Provides the behavior and accessibility implementation for a table component. A table displays
data in rows and columns and enables a user to navigate its contents via directional navigation
keys, and optionally supports row selection and sorting.

```tsx
import {Table, TableHeader, TableBody, Column, Row, Cell} from 'hooks-starter/Table';

<Table aria-label="Pokémon" selectionMode="multiple" selectionBehavior="replace">
  <TableHeader>
    <Column isRowHeader>Name</Column>
    <Column>Type</Column>
    <Column>Level</Column>
  </TableHeader>
  <TableBody>
    <Row key="charizard"><Cell>Charizard</Cell><Cell>Fire, Flying</Cell><Cell>67</Cell></Row>
    <Row key="blastoise"><Cell>Blastoise</Cell><Cell>Water</Cell><Cell>56</Cell></Row>
    <Row key="venusaur"><Cell>Venusaur</Cell><Cell>Grass, Poison</Cell><Cell>83</Cell></Row>
    <Row key="pikachu"><Cell>Pikachu</Cell><Cell>Electric</Cell><Cell>100</Cell></Row>
  </TableBody>
</Table>
```

## API

```tsx
<ResizableTableContainer>
  <Table>
    <TableHeader>
      <Column />
      <Column><Checkbox slot="selection" /></Column>
      <Column><ColumnResizer /></Column>
      <Column />
    </TableHeader>
    <TableBody>
      <Row>
        <Cell><Button slot="drag" /></Cell>
        <Cell>
          <Checkbox slot="selection" /> or <SelectionIndicator />
        </Cell>
        <Cell>
          <Button slot="chevron" />
        </Cell>
        <Cell />
        <Row>
          {/* ... */}
        </Row>
      </Row>
      <TableLoadMoreItem />
    </TableBody>
    <TableFooter>
      <Row>
        <Cell />
      </Row>
    </TableFooter>
  </Table>
</ResizableTableContainer>
```

<FunctionAPIGroup functions={[
    {function: statelyDocs.exports.useTableState, links: statelyDocs.links},
    {function: statelyDocs.exports.useTableColumnResizeState, links: statelyDocs.links},
    {function: docs.exports.useTable, links: docs.links},
    {function: docs.exports.useTableRowGroup, links: docs.links},
    {function: docs.exports.useTableHeaderRow, links: docs.links},
    {function: docs.exports.useTableColumnHeader, links: docs.links},
    {function: docs.exports.useTableRow, links: docs.links},
    {function: docs.exports.useTableCell, links: docs.links},
    {function: docs.exports.useTableSelectionCheckbox, links: docs.links},
    {function: docs.exports.useTableSelectAllCheckbox, links: docs.links},
    {function: docs.exports.useTableColumnResize, links: docs.links},
  ]}/>

### TableState

### AriaTableProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `disallowTypeAhead` | `boolean | undefined` | false | Whether typeahead navigation is disabled. |
| `escapeKeyBehavior` | `"clearSelection" | "none" | undefined` | 'clearSelection' | Whether pressing the escape key should clear selection in the grid or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| `focusMode` | `"cell" | "row" | undefined` | 'row' | Whether initial grid focus should be placed on the grid row or grid cell. |
| `getRowText` | `((key: Key) => string) | undefined` | (key) => state.collection.getItem(key)?.textValue | A function that returns the text that should be announced by assistive technology when a row is added or removed from selection. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isVirtualized` | `boolean | undefined` | — | Whether the grid uses virtual scrolling. |
| `keyboardDelegate` | `KeyboardDelegate | undefined` | — | An optional keyboard delegate implementation for type to select, to override the default. |
| `keyboardNavigationBehavior` | `"arrow" | "tab" | undefined` | 'arrow' | Whether keyboard navigation to focusable elements within grid cells is via arrow keys or the tab key. |
| `layoutDelegate` | `LayoutDelegate | undefined` | — | The layout object for the table. Computes what content is visible and how to position and style them. |
| `onCellAction` | `((key: Key) => void) | undefined` | — | Handler that is called when a user performs an action on the cell. |
| `onRowAction` | `((key: Key) => void) | undefined` | — | Handler that is called when a user performs an action on the row. |
| `scrollRef` | `RefObject<HTMLElement | null> | undefined` | — | The ref attached to the scrollable body. Used to provided automatic scrolling on item focus for non-virtualized grids. |
| `shouldSelectOnPressUp` | `boolean | undefined` | — | Whether selection should occur on press up instead of press down. |

### AriaTableColumnHeaderProps

| Name | Type | Description |
|------|------|-------------|
| `node` \* | `GridNode<T>` | An object representing the [column header](https://www.w3.org/TR/wai-aria-1.1/#columnheader). Contains all the relevant information that makes up the column header. |
| `allowsArrowNavigation` | `boolean | undefined` | Whether the column header should support arrow key navigation even when the containing table uses tab keyboard navigation. Allows users to navigate between columns with arrow keys while focus is on an interactive child element within the cell. |
| `focusMode` | `"cell" | "child" | undefined` | Whether the column header or its first focusable child element should be focused when the column header is focused. Defaults to 'child' in arrow keyboard navigation mode and 'cell' in tab keyboard navigation mode. |
| `isVirtualized` | `boolean | undefined` | Whether the [column header](https://www.w3.org/TR/wai-aria-1.1/#columnheader) is contained in a virtual scroller. |

### AriaTableCellProps

| Name | Type | Description |
|------|------|-------------|
| `node` \* | `GridNode<unknown>` | An object representing the table cell. Contains all the relevant information that makes up the row header. |
| `allowsArrowNavigation` | `boolean | undefined` | Whether the cell should support arrow key navigation even when the containing table uses tab keyboard navigation.Allows users to navigate between rows and cells with arrow keys while focus is on an interactive child element within the cell. |
| `focusMode` | `"cell" | "child" | undefined` | Whether the cell or its first focusable child element should be focused when the cell is focused. Defaults to 'child' in arrow keyboard navigation mode and 'cell' in tab keyboard navigation mode. |
| `isVirtualized` | `boolean | undefined` | Whether the cell is contained in a virtual scroller. |
| `shouldSelectOnPressUp` | `boolean | undefined` | Whether selection should occur on press up instead of press down. |
