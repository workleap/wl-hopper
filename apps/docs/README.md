## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Todo

- [ ] Layout -> [calulator](https://utopia.fyi/grid/calculator?c=320,16,1.125,1240,18,1.333,5,1,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,2xl,xl,12)
- [ ] Navigation
- [ ] Table of content
- [ ] Code block
- [ ] Inline code
- [ ] Tags
- [ ] Table
- [ ] Link
- [ ] popover

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
