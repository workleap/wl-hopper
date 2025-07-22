# Contributing

## Component Structure

This documentation site uses two main component directories, each serving a specific purpose:

### `/components`

Components in this directory are general-purpose components that appear on the Next.js site. These include:

- Base UI elements (buttons, links, code blocks)
- Layout components
- Utility components

These components form the foundation of the site's interface and are typically used across multiple pages.

### `/app/ui/components`

Components in this directory are specialized components designed for use within MDX files. They are:

- Imported and made available to MDX content through the `components/mdx/components.tsx` file
- Used to enhance documentation with interactive elements, visualizations, and specialized formatting
- Specifically tailored for documentation purposes

When adding new components, consider their intended use:

- For general site functionality, add to `/components`
- For documentation-specific features used in MDX files, add to `/app/ui/components`
