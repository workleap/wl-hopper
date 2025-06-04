# GitHub Copilot Code Review Instructions

This document provides instructions for GitHub Copilot Code Review to help maintain high-quality code standards for the Hopper UI component library. 
These instructions aim to make Copilot a more effective code reviewer by providing context about our project's architecture, coding standards, and best practices.

## Project Overview

Hopper is a React component library built with accessibility and design consistency in mind. It uses React Aria Components as a foundation and follows a structured approach to component development.

## Accessibility

- All components must be fully accessible according to WCAG 2.1 AA standards
- Verify proper ARIA attributes are used where appropriate
- Ensure keyboard navigation works correctly for interactive components
- Check that components have appropriate focus management
- Verify that color contrast meets accessibility standards (minimum 4.5:1 for normal text, 3:1 for large text)
- Ensure all interactive elements have accessible names
- Check that form elements have associated labels
- Verify that error messages are properly associated with form fields
- Ensure that components work with screen readers (use aria-live for dynamic content)
- Check that components support text zoom and maintain functionality at 200% zoom
- Verify that components are properly tested with axe-playwright for accessibility violations
- Ensure that components have appropriate SSR tests to verify they render correctly on the server
- Check that focus indicators are visible and meet WCAG 2.1 AA standards
- Verify that components have appropriate aria-labels, aria-describedby, and other ARIA attributes
- Ensure that components have appropriate role attributes
- Check that components have appropriate tabindex values
- Verify that components have appropriate focus management when opened/closed
- Ensure that components have appropriate keyboard shortcuts

## Browser Compatibility

- Components should work in all modern browsers (Chrome, Firefox, Safari, Edge)
- Ensure responsive design principles are followed
- Verify that components work on both desktop and mobile devices
- Check that touch interactions are properly supported
- Ensure that components degrade gracefully in older browsers

## HTML/CSS Requirements

- Follow BEM-like naming convention: `.hop-ComponentName__element--modifier`
- Use CSS modules for component styling
- Ensure all components have a unique `GlobalCssSelector` (e.g., `hop-Button`)
- Use CSS variables for theming and customization
- Ensure proper use of semantic HTML elements
- Ensure styles are properly merged with higher priority for direct props
- Use responsive design principles with the design system's breakpoints

## JavaScript/TypeScript Requirements

- Use TypeScript for all components
- Avoid unnecessary re-renders by using memoization where appropriate
- Ensure proper error handling
- Follow functional programming principles
- Use proper naming conventions for variables, functions, and components
- Ensure code is properly documented with JSDoc comments
- Ensure all exported components have proper display names

## React Requirements

- Use functional components with hooks
- Ensure proper prop validation
- Use React.forwardRef for all components that need to forward refs
- Ensure proper handling of controlled vs. uncontrolled components
- Follow React's best practices for performance optimization
- Ensure proper cleanup in useEffect hooks
- Use context appropriately and avoid prop drilling
- Ensure components are properly tested with Jest and React Testing Library
- Follow the principle of composition over inheritance
- Ensure components are properly memoized when necessary

## React Aria Requirements

### React Spectrum S2 Reference

React Aria Components was created for React Spectrum S2, Adobe's implementation of their design system using React Aria. Hopper follows React Spectrum S2's implementation patterns as a reference.

- React Spectrum S2 GitHub repository: https://github.com/adobe/react-spectrum/tree/main/packages/@react-spectrum/s2
- React Spectrum S2 Storybook: https://reactspectrum.blob.core.windows.net/reactspectrum/e890e0951ea4a784313645dd3426cddf4ec9558d/storybook-s2/index.html?path=/docs/intro--docs

When implementing Hopper components, we typically wait for the corresponding component to be implemented in React Spectrum S2 first, then use that implementation as a reference for our own. This ensures we follow best practices established by the React Aria team and maintain consistency with the React Aria Components ecosystem.

When reviewing Hopper components, check if there's a corresponding React Spectrum S2 component and verify that our implementation follows similar patterns, especially for accessibility features and state management.

### General Requirements

- Properly use React Aria Components as the foundation
- Ensure correct usage of React Aria hooks
- Verify proper integration with React Aria's accessibility features
- Follow React Aria's patterns for form controls, overlays, and other complex components
- Ensure proper usage of React Aria's context providers
- Verify that React Aria's event handlers are properly used
- Check that React Aria's focus management is correctly implemented
- Ensure proper usage of React Aria's internationalization features
- Verify that React Aria's state management is correctly implemented
- Ensure proper usage of useContextProps for slot-based component architecture
- Verify that components properly forward refs to React Aria components
- Check that components properly merge props with React Aria components
- Ensure proper usage of React Aria's composition patterns (composeRenderProps)
- Verify that components properly handle controlled vs. uncontrolled state
- Check that components properly handle form validation
- Ensure proper usage of React Aria's collection components
- Verify that components properly handle RTL languages
- Check that components properly handle internationalization
- Ensure proper usage of React Aria's overlay components

## Hopper Requirements

- Follow Hopper's component architecture and patterns
- Ensure proper usage of Hopper's design tokens
- Verify that components follow Hopper's design guidelines
- Check that components are properly documented
- Ensure proper usage of Hopper's styling system
- Verify that components are properly tested
- Follow Hopper's naming conventions
- Ensure proper usage of Hopper's internationalization features
- Check that components are properly exported
- Verify that components are properly integrated with Hopper's theming system

## Folder Structure

- Components should be organized in the following structure:
  ```
  packages/components/src/[component-name]/
  ├── docs/                  # Documentation and examples
  │   ├── preview.tsx       # Main documentation
  │   ├── [example-name].md          # Component documentation
  │   └── [component-name]/          # Examples
  │       ├── preview.tsx            # Preview example
  │       └── [example-name].tsx     # Other examples
  ├── src/                   # Component source code
  │   ├── [ComponentName].tsx        # Main component
  │   ├── [ComponentName].module.css # Component styles
  │   ├── [ComponentName]Context.ts  # Component context (if needed)
  │   └── index.ts                   # Exports
  ├── tests/                 # Tests
  │   ├── chromatic/                 # Visual regression tests
  │   │   └── [ComponentName].stories.tsx
  │   └── jest/                      # Unit tests
  │       ├── [ComponentName].test.tsx
  │       └── [ComponentName].ssr.test.tsx
  └── utils/                 # Component-specific utilities (if needed)
      └── [ComponentName].utils.ts
  ```

- Each component should follow this pattern:
  ```tsx
  // Define a global CSS selector for the component
  export const GlobalComponentCssSelector = "hop-Component";

  // Define the component props interface
  export interface ComponentProps extends StyledComponentProps<"div"> {
    // Component-specific props
  }

  // Define the component function
  function Component(props: ComponentProps, ref: ForwardedRef<HTMLDivElement>) {
    // Use context props
    [props, ref] = useContextProps(props, ref, ComponentContext);
    
    // Extract styling props
    const { stylingProps, ...ownProps } = useStyledSystem(props);
    
    // Destructure props
    const { children, style, className, ...otherProps } = ownProps;
    
    // Merge classnames
    const classNames = clsx(
      className,
      GlobalComponentCssSelector,
      cssModule(styles, "hop-component"),
      stylingProps.className
    );
    
    // Merge styles
    const mergedStyles: CSSProperties = {
      ...stylingProps.style,
      ...style
    };
    
    // Return the component
    return (
      <Element
        ref={ref}
        className={classNames}
        style={mergedStyles}
        {...otherProps}
      >
        {children}
      </Element>
    );
  }

  // Create the forwarded ref component
  const _Component = forwardRef<HTMLDivElement, ComponentProps>(Component);
  _Component.displayName = "Component";

  // Export the component
  export { _Component as Component };
  ```

## Code Review Checklist

When reviewing code, check for the following:

1. **Accessibility**
   - Are ARIA attributes used correctly?
   - Is keyboard navigation implemented properly?
   - Are there appropriate focus indicators?
   - Is the component screen reader friendly?

2. **Component Structure**
   - Does the component follow the Hopper component pattern?
   - Are props properly typed and documented?
   - Is the component properly exported?
   - Does the component have appropriate tests?

3. **Styling**
   - Does the component use CSS modules?
   - Does the component follow the BEM-like naming convention?
   - Are styles properly merged?
   - Is the component responsive?

4. **Performance**
   - Are there any unnecessary re-renders?
   - Is memoization used appropriately?
   - Are there any performance bottlenecks?

5. **React Aria Integration**
   - Is React Aria used correctly?
   - Are accessibility features properly implemented?
   - Is the component properly integrated with React Aria's state management?

6. **Testing**
   - Are there unit tests for the component?
   - Are there visual regression tests?
   - Are there tests for accessibility?
   - Are edge cases tested?

7. **Documentation**
   - Is the component properly documented?
   - Are there examples for different use cases?
   - Is the API documentation complete?

## Common Issues to Flag

1. Missing accessibility attributes or improper ARIA usage
2. Improper handling of keyboard navigation
3. Lack of proper focus management
4. Improper use of React Aria components or hooks
5. Styling issues that affect accessibility or responsiveness
6. Performance issues due to unnecessary re-renders
7. Improper type definitions or usage of `any`
8. Missing or incomplete tests
9. Missing or incomplete documentation
10. Improper component exports
11. Not following Hopper's component patterns
12. Not using CSS modules or following the naming convention
13. Not properly merging styles
14. Not using React.forwardRef when needed
15. Not properly handling controlled vs. uncontrolled components
16. Not properly cleaning up effects
17. Not properly handling errors
18. Not following React's rules of hooks
19. Not using semantic HTML elements
20. Not following logical property usage

## Specific Component Guidelines

### Form Components

- Ensure proper label association
- Implement proper validation and error messaging
- Support both controlled and uncontrolled modes
- Implement proper focus management
- Support keyboard navigation
- Implement proper ARIA attributes
- Support internationalization
- Support proper styling customization

### Interactive Components

- Ensure proper keyboard navigation
- Implement proper focus management
- Support proper ARIA attributes
- Implement proper event handling
- Support internationalization
- Support proper styling customization
- Implement proper state management

### Layout Components

- Ensure proper responsiveness
- Support proper styling customization
- Use semantic HTML elements
- Support proper nesting
- Implement proper spacing

### Typography Components

- Use semantic HTML elements
- Support proper styling customization
- Support internationalization
- Implement proper text truncation
- Support proper text alignment

## Styling System

- Hopper uses a token-based styling system
- Components should use the `useStyledSystem` hook to extract styling props
- Styling props should be used to apply styles to components
- Components should use CSS modules for component-specific styles
- Components should follow the BEM-like naming convention for CSS classes
- Components should use the `clsx` utility to merge classnames
- Components should use the `cssModule` utility to apply CSS module styles
- Components should properly merge styles from props with styles from the styling system
- Components should use the `ResponsiveProp` type for responsive values
- Components should avoid using `UNSAFE_` prefixed props unless absolutely necessary
- Components should use the design tokens from the token system

## Server-Side Rendering (SSR)

- All components must be SSR-compatible
- Components should have SSR tests to verify they render correctly on the server
- Components should use `useIsSSR` hook when needed to handle SSR-specific logic
- Components should avoid using browser-specific APIs without checking if they're available
- Components should use `useIsomorphicLayoutEffect` instead of `useLayoutEffect` for SSR compatibility

## Internationalization (i18n)

- Components should use the `useLocalizedString` hook for internationalized strings
- Text should be stored in the i18n files (en-US.json and fr-CA.json)
- Components should support RTL languages
- Components should use logical properties for RTL support
- Components should use the `I18nProvider` from React Aria Components

## Testing

- Components should have unit tests using Jest and React Testing Library
- Components should have SSR tests to verify they render correctly on the server
- Components should have visual regression tests using Chromatic
- Components should have accessibility tests using axe-playwright
- Tests should verify that components meet WCAG 2.1 AA standards
- Tests should verify that components work with keyboard navigation
- Tests should verify that components work with screen readers
- Tests should verify that components work with high contrast mode
- Tests should verify that components work with text zoom

### Accessibility Testing

Accessibility testing is a critical part of the development process. Here are specific guidelines for testing accessibility:

#### Manual Accessibility Testing Checklist

For each component, manually verify:

1. **Keyboard Navigation**
   - Can all interactive elements be reached using Tab key?
   - Is the focus order logical and intuitive?
   - Can all actions be performed using only the keyboard?
   - Are there appropriate keyboard shortcuts where needed?

2. **Screen Reader Testing**
   - Use VoiceOver (macOS), NVDA or JAWS (Windows), or TalkBack (Android) to test
   - Can all content be accessed and understood?
   - Are all interactive elements properly announced?
   - Are state changes properly announced?
   - Are error messages properly announced?

3. **Focus Management**
   - Is focus properly trapped in modals and dialogs?
   - Is focus properly restored when dialogs are closed?
   - Is focus properly moved to newly revealed content?
   - Are focus indicators clearly visible?

4. **Color and Contrast**
   - Does all text meet minimum contrast requirements (4.5:1 for normal text, 3:1 for large text)?
   - Is information conveyed by color also conveyed by other means?
   - Does the component work in high contrast mode?
   - Does the component work in dark mode?

5. **Text Resizing**
   - Does the component work when text is zoomed to 200%?
   - Does the component work when the page is zoomed to 200%?
   - Is text properly truncated when necessary?

6. **ARIA Attributes**
   - Are ARIA attributes used correctly?
   - Are ARIA roles used correctly?
   - Are ARIA states updated correctly?
   - Are ARIA properties set correctly?

## Conclusion

By following these guidelines, GitHub Copilot Code Review can help maintain high-quality code standards for the Hopper UI component library. 
These instructions provide context about our project's architecture, coding standards, and best practices, making Copilot a more effective code reviewer and potentially replacing human reviewers for routine code reviews.
