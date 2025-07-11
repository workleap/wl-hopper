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
- Just create a simple React app (using Vite).
- Try to use icons from Hopper for different parts of the page.

## Test 2: Basic but follows foundational tasks

Create a simple React app for managing products.

Functional requirements:

- Each product has these fields: title, description (long text), category, isActive and quantity.
- Category is a fixed list of: food, cloths, cosmetic, tools and etc.
- Create a Page that shows list of product (title only).
- Adding or modifying each product should be done through a modal.
  - The modal should have "save", "cancel" and "remove" buttons.
    - buttons should use the Design System primary, secondary, and destructive actions.
  - If it is in edit mode, the title field is readonly.
  - Title and category are the only required fields. It should shows error message if they are left empty.
  - Use combobox for selecting category.
- In the product list page:
  - each product has edit and remove buttons.
    - For edit, it opens the previous modal in edit mode.
    - For delete, it should ask before deleting.
    - For all cases, after an action is done, use the toast to feedback user the result.
  - Also a button on top to add a new product.
  - If user clicked on a product row, it should open a Card on the right side to show the product details in readonly mode. This card should:
    - this card should show the product title as heading
    - show a random image for product on left side
    - on right side, it should show category and description and if it is active (by using an icon)
    - on the bottom of the card, it should be these actions: edit and delete. both actions behave like what similar ones do in the product list page.
- The page should have a button on top to switch between dark and light mode.

Non-functional requirements:

- Use Hopper design system components, icons and best practices.
- Just create a simple React app (using Vite).
- Try to use icons from Hopper for different parts of the page.
- Products should be saved in local storage. No need to have any API call.
