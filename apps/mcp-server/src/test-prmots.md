# Test Strategy

## Foundational Tasks (Basic component usage)

Ask the LLM to build:

- A **button group** with primary, secondary, and destructive actions
- A **modal dialog** with a form inside it
- A **form with validation states** (input, textarea, checkbox, dropdown)
- A **card** component with an image, heading, description, and actions
- A **toast or snackbar** for user feedback

These validate: component API usage, naming conventions, slot/props structure, default styling.

## Intermediate Tasks (Common application flows)

Ask for:

- A **login page** using the design system’s input, button, and alert components
- A **user profile form** with editable fields and save/cancel buttons
- A **settings page** with toggles, grouped sections, and tooltips
- A **table with filters and pagination**
- A **multi-step** form or wizard with step indicators and navigation

These test: layout primitives, form flows, consistent structure, accessibility, and component composition.

## Advanced/Integrated Tasks (High-level scenarios)

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

# Test 1: Vague and Basic

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

# Test 2: Basic but follows foundational tasks

Your role:
Assume you are an expert UI/UX designer and an experienced frontend developer who is picky on design details. Follow modern industry standards for spacing, layout, and visual hierarchy.

Task:
Build a simple React app for managing products by following the below requirements carefully.

Functional requirements:

- Each product has these fields: title, description (long text), category, isActive and quantity.
- Category is a fixed list of: food, clothes, cosmetics, tools, etc.
- Product list page: it shows list of product in a table format
  - The columns are: title, category and action buttons: modify and delete.
  - For modify: it opens the modal with already filled data.
  - For delete: it should confirm before deleting.
  - For all cases, after an action is done, use the callout to feedback the user the result.  
  - Add a button on top of the page to add a new product.
  - If a user clicked on a product row, it should open a Card on the right side of the table to show the product details in readonly mode. This card should:
    - show the product title as heading
    - show a random image for product on left side (use <https://picsum.photos/id/{id}/300/400> to get random fixed image)
    - on right side, it should show category and description and if it is active (by using an icon)
    - on the bottom of the card, it should have these actions: edit and delete. Both actions behave like what similar ones do in the product list page.
- Product modal/dialog: Adding or modifying each product should be done through a modal.
  - The modal should have "save", "cancel" and "remove" buttons.
    - buttons should use the Design System primary, secondary, and destructive actions.
  - If it is in edit mode, the title field is readonly.
  - Title and category are the only required fields. It should show an error message if they are left empty. The save button should also disabled if the form is not valid.
  - Use combobox for selecting categories.
- The Product list page should have a button on top to switch between dark and light mode. Make sure you use and follow  Hopper color scheme features.

Non-functional requirements:

- The app should be responsive and consider mobile views from scratch.

# Test 2 (ChatGPT suggested version)

## 🧠 Role

You are an expert and picky **UI/UX designer** and **frontend engineer**.

- Follow **modern UI/UX practices**, ensuring clean spacing, clear visual hierarchy, accessible layout, and responsive behavior.
- Follow best practices from the **Hopper Design System**, including **components**, **colors**, **icons**, **button styles**, and **themes**.

---

## 🎯 Goal

Build a **simple React app (with TypeScript and .tsx)** to **manage a list of products**. The app should be responsive, accessible, and maintain a consistent visual identity across all screens and states.

---

## ✅ Functional Requirements

### 📦 Product Fields

Each product has the following fields:

- `title`: string
- `description`: long text
- `category`: one of `"food"`, `"clothes"`, `"cosmetics"`, `"tools"`, etc.
- `isActive`: boolean
- `quantity`: number

---

### 🧾 Product List Page

- Display all products in a **table layout** with columns:
  - `title`
  - `category`
  - `actions` (Modify / Delete)
- Add a **"New Product" button** at the top of the page.
- **Modify**: opens a modal pre-filled with the product's data.
- **Delete**: triggers a confirmation before deletion.
- After any action, display a **callout message** (using Hopper components) for feedback.
- **Dark mode toggle**: Add a switch to toggle dark/light mode using Hopper’s color scheme.
- **Side panel/card view**:
  - When clicking a row, open a **card on the right side** showing product details in read-only mode:
    - Title as card heading
    - Random product image on left (`https://picsum.photos/id/{id}/300/400`)
    - On the right: show description, category, and active status (use Hopper icon for status)
    - Card footer contains **Edit** and **Delete** buttons, behaving like the table actions

---

### 🧰 Product Modal (Add / Edit)

- Used for both **adding** and **modifying** products.
- The modal contains:
  - Title input (readonly in edit mode)
  - Description textarea
  - Category selection (use Hopper’s **Combobox**)
  - isActive checkbox
  - Quantity input
- Action buttons:
  - **Save**: primary button
  - **Cancel**: secondary button
  - **Remove**: destructive button (only shown in edit mode)
- **Validation**:
  - Required fields: `title` and `category`
  - Show error messages if these are empty
  - Disable **Save** button if form is invalid

---

## 📱 Responsiveness

- The entire UI must be **responsive** and support **mobile-friendly views** by default.
- Avoid desktop-only layouts or interactions.

---

## 🛠️ Non-Functional Requirements

- Use **Hopper Design System** for all UI elements and interactions.
- Use **Hopper icons** for actions, statuses, and enhancements — **do not use emojis**.
- Use **TypeScript (`.ts` and `.tsx`)**.
- Use **pnpm** as the package manager throughout development.
- Follow **industry-standard project structure** and code best practices.

# Test 3 (modified to have dashboard): Basic but follows foundational tasks

Your role:
Assume you are an expert UI/UX designer and an experienced frontend developer who is picky on design details. Follow modern industry standards for spacing, layout, and visual hierarchy.

Task:
Build a simple React app for managing products by following the below requirements carefully.

Functional requirements:

- Data structure
  - Product has these fields: title, description (long text), category, isActive and quantity.
  - Product category is a fixed list of: food, clothes, cosmetics, tools and etc.

- The layout of the application
  - Top Navbar to show icons
  - Left Sidebar to show navigation menu items
  - The rest is the content

- Top Navbar
  - It has a button on top-right to switch between dark and light mode. Make sure you follow Hopper color scheme features.
  - On the left side, you should use a random icon for the logo.
  - The website name is "Workleap Store Management". The name should come on the right side of the logo.
  - The position should be fixed on the page.

- Sidebar
  - No title
  - Just use icons and links for menu items. Don't use Buttons.
    - Icon should be on left.
  - Use a weak background color.
  - The width should fit all the menu items title and consider big padding .
  - Add a collapsible button on top-right border to collapse and expand.
  - In collapse mode only shows icons or use Avatar if there is no icon.
  - The position should be fixed on the page.

- Pages
  - Products Management
  - Users Management
  - Inventory Management
  - Marketing Campaigns
  - Storefront Editor
  - Flash sales

- Products management page
  - layout:
    - "Product List" is on the left and fill 35% of the page's width.
    - "Product Card" is on the right and fills 65% of the page's width.
    - If the screen size is smaller than tablet's width, it should show the card below the list and make both of them 100%.
  - Product List:
    - The columns are ONLY: title, category and action buttons: modify and delete.
    - There is a "Add Product" button on top of the list.
    - For modify: it opens a modal with already filled data.
    - For delete: it should confirm before deleting.
    - If a user clicks on a product row, it should fill the "Product Card" in readonly mode.
  - Product Card:
    - show a random image for product on the top (use <https://picsum.photos/id/{id}/300/400> to get random fixed image)
      - The image should fill at least 30% of the card completely.
    - show all fields in readonly mode on the right of the image.
    - on the bottom of the card, it should have these actions: edit and delete. both actions behave like similar ones in the Product List section.
    - Show badge for product status (i.e. active and inactive)
  - Product Modal/dialog:
    - Adding or modifying each product should be done through this modal.
    - Title and category are the only required fields. It should show an error message if they are left empty.
    - In edit mode, the title field is readonly. Users cannot modify it after creating it.
    - The modal should have "save", "cancel" and "remove" buttons.
      - The save button should also be disabled if the form is not valid.
      - buttons should use the Design System primary, secondary, and destructive actions.
    - Use combobox for selecting categories.
  
- Other pages
  - Just design a simple "under construction" page for them.

Non-functional requirements

- The app should be responsive and consider mobile views from scratch.
- For all cases, after an action is done, use the callout to give the user the result.  
- Use Hopper design system components, icons and best practices.
- Use Hopper icons for different parts of the page to make the look more appealing. Never use emojis.
- Use ReactRouter package to implement a routing mechanism between pages.
