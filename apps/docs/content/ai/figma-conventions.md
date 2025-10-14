# Figma → Hopper Translation Guide

Conventions and prompting tips for converting Figma MCP generated code into Hopper design system components

This guide defines how to interpret the Figma MCP server output and reliably translate raw layer metadata into Hopper Design System components, icons, and product icons.
When generating Hopper code from Figma designs, it’s crucial to follow these conventions so the output remains consistent, maintainable, and fully leverages the Hopper Design System.

## Interpreting `data-name` Attributes

General rules on how to interpret `data-name` attribute in Figma elements:

- **{X}/{Y}**, it means X is the component name and Y is the name if it. E.g. `Button/Submit` → `Button` component.
- **Icon/{Y}**, it means it's always `{Y}Icon` from Hopper Icons library. e.g `Icon/Plus` → `PlusIcon`.
- **RichIcon/{Y}**, it means it's always `{Y}RichIcon` from Hopper Icons library. e.g `RichIcon/Rocket` → `RocketRichIcon`.
- **ProductIcon/{Y}**, This is a product-specific icon, logo, image or avatar. you MUST PRESERVE them in final output.

**Example mapping of Figma elements based on the above rules:**

| Figma Element (data-name)    | Hopper Component, Hopper Icon, Product Icon/Logo/Image/Avatar |
|------------------------------|---------------------------------------------------------------|
| `Button/submit`              | `Button`                                                      |
| `Select/filter by group`     | `Select`                                                      |
| `Tag`                        | `Tag`                                                         |
| `Tag/Warning`                | `Tag`                                                         |
| `Icon/Plus`                  | `PlusIcon` from Hopper Icons library                          |
| `Icon/AddUser/Add customer`  | `AddIcon` from Hopper Icons library                           |
| `RichIcon/Rocket`            | `RocketRichIcon` from Hopper Rich Icons library               |
| `ProductIcon/ShareGate logo` | `Img`                                                         |
