# Contributing to AI Documentation Configuration

This guide explains how to configure the AI documentation system by adding new routes in the `config.ts` file.

## Overview

The AI documentation system uses a bidirectional mapping configuration that serves two purposes:

1. **Build Process**: Defines how content is generated from source materials
2. **Serve Process**: Maps incoming URL paths to the correct markdown content

## Configuration Structure

The main configuration is in `config.ts` and follows this structure:

```typescript
export const aiDocsConfig: AiDocsConfig = {
    buildRootPath: "dist",
    filesFolder: "ai-docs",
    routes: {
        "route-key": {
            build: { /* build configuration */ },
            serve?: { /* optional serve configuration */ }
        }
    }
}
```

## Adding a New Route

When adding a new route, you need to define:

### 1. Route Key

The route key can be either:

- **File path**: `"components/new-guide.md"` - generates a specific markdown file
- **Directory identifier**: `"new-section"` - generates a folder with content

### 2. Build Configuration

There are several types of build configurations:

#### A. MDX & Markdown Build

For processing MDX content into markdown and copying existing markdown files:

```typescript
"route-key": {
    build: {
        source: "content/your-source-folder",
        excludedPaths?: ["subfolder-to-exclude"],
        flatten?: true, // flattens directory structure
        markdown?: {
            includeFrontMatterLinks?: true,
            excludedSections?: ["## Props", "## API"],
            replaceLinks?: (link: string) => string // Custom link transformation
        },
        renderer?: {
            customComponents?: {
                ComponentName: () => <div /> // Replace component with custom implementation
            }
        }
    }
}
```

**Behavior:**

- **`.mdx` files**: Converted to `.md` format with optional transformations
- **`.md` files**: Copied post processed markdown files to the output directory

**Renderer Options:**

- **`customComponents`**: Override specific MDX components during conversion. This is useful when you want to render different versions of components for different contexts (e.g., hiding interactive elements in AI documentation).

#### B. Template-Based Build

For merging multiple **already generated files** using a template:

```typescript
"route-key": {
    build: {
        template: "/content/ai/templates/your-template.mdx",
        merge: [
            "/path/to/file1.md",
            "/path/to/file2.md",
            "/folder/*.md" // glob patterns supported
        ],
        keepOriginalLeveling?: true // Keep original heading levels instead of adjusting them
    }
}
```

**Template Options:**

- **`template`**: Path to the template file (optional)
- **`merge`**: Array of file paths or glob patterns to merge (relative to `buildRootPath`)
- **`keepOriginalLeveling`**: When `true`, preserves the original heading levels in merged files instead of adjusting them to fit the document structure

**Note 1**: The files or paths inside the `merge` are relative to the `buildRootPath` as we use this tool to merge them.

**Note 2**: The items in `merge` should be listed based on the order in the final file.

#### C. Component Props JSON Build

For generating JSON documentation of component properties:

```typescript
"route-key": {
    build: {
        type: "props-json",
        source: "content/components",
        options: {
            includeFullProps?: boolean // Include full property details
        }
    }
}
```

**Note**: This is a temporary type specific to component properties. A more generic solution is planned for the future.

#### D. Tokens JSON Build

For generating JSON from design token data:

```typescript
"route-key": {
    build: {
        type: "tokens-json",
        source: "datas/tokens.json",
    }
}
```

#### E. Unsafe Props JSON Build

For generating JSON documentation of unsafe/escape hatch props:

```typescript
"route-key": {
    build: {
        type: "unsafe-props-json"
    }
}
```

#### F. Unsafe Props Markdown Build

For generating markdown documentation of unsafe/escape hatch props using a template:

```typescript
"route-key": {
    build: {
        type: "unsafe-props-markdown",
        template: "/ai-pipeline/templates/escape-hatches.mdx"
    }
}
```

#### G. Icons JSON Build

For generating JSON documentation of icon libraries (standard and rich icons):

```typescript
"route-key": {
    build: {
        type: "icons-json"
    }
}
```

**Note**: This build type generates a comprehensive JSON file containing metadata for all available icons, including their names, descriptions, keywords, and type information. The generated JSON includes both standard icons and rich icons, making it useful for search functionality and icon discovery tools.

### 3. Serve Configuration (Optional)

All generated markdown files can be served from the same route. However, if your route needs custom URL path mapping, use this feature. For example, `/components/full/Button.md` file can be served from `/components/Button.md` URL. Without this configuration, requests to this URL would be resolved from the `/components` folder instead of `components/full`, which would be incorrect.

```typescript
"route-key": {
    serve: {
        at?: "/custom-path",
        filesInRoot?: boolean
    }
}
```

#### Serve Options

- **`at`**: Custom URL path mapping for the route
- **`filesInRoot`**: When `true`, only checks the root directory when resolving paths. This is useful if the URL has paths but files are located in the root folder, typically because `flatten: true` was used during build time.

**Serve Logic**: The serve logic is set for `.txt|.md` paths and is served from the [txt](/apps/docs/app/txt/) route handler.

## Complete Examples

### Example 1: Simple Content Section

```typescript
"tutorials": {
    build: {
        source: "content/tutorials",
        flatten: true
    }
}
```

### Example 2: Merged Documentation File

```typescript
"api/complete-guide.md": {
    build: {
        template: "/content/ai/templates/api-guide.mdx",
        merge: [
            "/api/introduction.md",
            "/api/authentication.md",
            "/api/endpoints/*.md"
        ],
        keepOriginalLeveling: true
    }
}
```

### Example 3: Component Props JSON

```typescript
"components/api/full": {
    build: {
        type: "props-json",
        source: "content/components",
        options: {
            includeFullProps: true
        }
    }
}
```

### Example 4: Tokens JSON

```typescript
"tokens/maps/full": {
    build: {
        type: "tokens-json",
        source: "datas/tokens.json",
    }
}
```

### Example 5: Icons Data JSON

```typescript
"icons/data.json": {
    build: {
        type: "icons-json"
    }
}
```

### Example 6: MDX Build with Custom Renderer

```typescript
"icons/brief": {
    build: {
        source: "content/icons",
        flatten: false,
        renderer: {
            customComponents: {
                Switcher: () => <div /> // Replace interactive switcher with empty div
            }
        }
    }
}
```

### Example 7: Complex Component Documentation

```typescript
"components/advanced": {
    build: {
        source: "content/components/advanced",
        excludedPaths: ["internal"],
        flatten: true,
        markdown: {
            includeFrontMatterLinks: true,
            excludedSections: ["## Implementation Details"]
        }
    },
    serve: {
        at: "/components/advanced",
        filesInRoot: true
    }
}
```

## Link Transformation

The system automatically transforms relative links in markdown content to ensure they work correctly in the AI documentation context. This happens by default for all MDX-to-markdown builds.

### Default Link Processing

By default, the system applies these transformations to relative links:

1. **Preserves full URLs**: Links with valid URI schemes (http:, https:, ftp:, mailto:, etc.) remain unchanged
2. **Preserves hash-only links**: Internal document references like `#section` remain unchanged
3. **Transforms relative links**: Adds `.txt` extension to relative links while preserving:
   - Query parameters (`?param=value`)
   - Hash fragments (`#section`)
   - Relative path structures (including `../` patterns)

### Examples of Default Transformations

```markdown
<!-- Original links -->
[Full URL](https://example.com/page)           → No change
[Hash link](#introduction)                     → No change
[Relative link](../components/button)          → ../components/button.txt
[With hash](../guide#installation)            → ../guide.txt#installation
[With query](./api?version=2)                 → ./api.txt?version=2
[Complex relative](../../tokens/core)         → ../../tokens/core.txt
[Trailing slash](./components/)               → ./components.txt
```

**Important**: The link transformation now uses improved URL parsing that correctly handles complex relative paths starting with `../` without incorrectly resolving them, ensuring that the original path structure is preserved.

### Custom Link Transformation

You can override the default behavior by providing a custom `replaceLinks` function:

```typescript
"route-key": {
    build: {
        source: "content/your-source-folder",
        markdown: {
            replaceLinks: (link: string) => {
                // Custom logic here
                if (link.startsWith('http')) return link;
                if (link.startsWith('#')) return link;
                return link + '.html'; // Use .html instead of .txt
            }
        }
    }
}
```

### Why Link Transformation?

The transformation ensures that:

- **AI systems** can properly reference documentation files with consistent extensions
- **Cross-references** work correctly between generated documentation files
- **Internal navigation** (hash links) continues to function within documents
- **External links** remain functional and unchanged

## Best Practices

### Route Key Naming

- Use kebab-case for consistency
- For files: include the `.md` extension
- For directories: use descriptive identifiers

### Build Configuration

- **Source paths**: Always relative to the content root
- **Flatten**: Use `true` when you want all files in a single directory
- **Excluded paths**: Use to skip internal or draft content, or when you want to serve them in different route.
- **Templates**: Store in `/content/ai/templates/` for organization

## How the System Works

### Build Process

1. System reads the configuration
2. For each route, processes the build configuration
3. Generates content in the specified `buildRootPath`
4. Files are organized according to the route keys

### Serve Process

1. Incoming URL request arrives
2. System reverse-lookups the configuration
3. Finds matching route with `serve.at` or route key (through the [txt](/apps/docs/app/txt/) router)
4. Serves the corresponding generated content
