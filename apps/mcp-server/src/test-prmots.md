# Test Prompts for testing MCP server

## Strategy

### Foundational Tasks (Basic component usage)

Ask the LLM to build:

- A **button group** with primary, secondary, and destructive actions
- A **modal dialog** with a form inside it
- A **form with validation states** (input, textarea, checkbox, dropdown)
- A **card** component with an image, heading, description, and actions
- A **toast or snackbar** for user feedback

These validate: component API usage, naming conventions, slot/props structure, default styling.

### Intermediate Tasks (Common application flows)

Ask for:

- A **login page** using the design system’s input, button, and alert components
- A **user profile form** with editable fields and save/cancel buttons
- A **settings page** with toggles, grouped sections, and tooltips
- A **table with filters and pagination**
- A **multi-step** form or wizard with step indicators and navigation

These test: layout primitives, form flows, consistent structure, accessibility, and component composition.

### Advanced/Integrated Tasks (High-level scenarios)

Ask it to build:

- A **dashboard layout** with header, sidebar, cards, charts, and tables
- A **comment thread** UI with nested replies, avatars, and actions
- A **product listing** grid with filters, badges, and hover states
- A **notification center** with grouped messages, icons, and states
- A **responsive pricing page** with plan cards and feature comparisons

These validate:

- complex composition, responsiveness,
- design system token usage (spacing, color, font),
- naming conventions,
- and whether the model truly understands the intended usage of the components.

## Test cases

### Test 1: Vague and Basic

Create a simple React app for managing using Hopper Design System to manage products.

Functional requirements:

- It should have title and quantity fields and a button to save.
- It should show the created product on the bottom of the form (product list).
- Products should be saved in local storage. No need to have any API call.
- Products should be removable from the list.
- The page should have a button on top to switch between dark and light mode.

Non-functional requirements:

- Use Hopper design system components, icons and best practices.
- Use Hopper icons for different parts of the page to make the look more appealing. Never use emojis.
- Assume you are an expert UI/UX designer and frontend developer. Follow modern industry standards for spacing, layout, and visual hierarchy- Use Typescript and tsx format.
- Use pnpm all the times.

## Test 2: Basic but follows foundational tasks

Your role:
Assume you are an expert UI/UX designer and frontend developer. Follow modern industry standards for spacing, layout, and visual hierarchy.

Task:
Build a simple React app for managing products by following the below requirements carefully.

Functional requirements:

- Each product has these fields: title, description (long text), category, isActive and quantity.
- Category is a fixed list of: food, cloths, cosmetic, tools and etc.
- Product list page: it shows list of product in a table format
  - The column are: title, category and actin buttons: modify and delete.
  - For modify: it opens the modal with already filled data.
  - For delete: it should confirm before deleting.
  - For all cases, after an action is done, use the callout to feedback user the result.  
  - Add a button on top of the page to add a new product.
  - If user clicked on a product row, it should open a Card on the right side of the table to show the product details in readonly mode. This card should:
    - show the product title as heading
    - show a random image for product on left side (use <https://picsum.photos/id/{id}/300/400> to get random fixed image)
    - on right side, it should show category and description and if it is active (by using an icon)
    - on the bottom of the card, it should have these actions: edit and delete. both actions behave like what similar ones do in the product list page.
- Product modal/dialog: Adding or modifying each product should be done through a modal.
  - The modal should have "save", "cancel" and "remove" buttons.
    - buttons should use the Design System primary, secondary, and destructive actions.
  - If it is in edit mode, the title field is readonly.
  - Title and category are the only required fields. It should shows error message if they are left empty. The save button should also disabled if the form is not valid.
  - Use combobox for selecting category.
- The Product list page should have a button on top to switch between dark and light mode. Make sure you use and follow  Hopper color scheme features.
- The app should be responsive and consider mobile view from scratch.

Non-functional requirements:

- Use Hopper design system components, icons and best practices.
- Use Hopper icons for different parts of the page to make the look more appealing. Never use emojis.
- Use Typescript and tsx format.
- Use pnpm all the times.
