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

There are three types of build configurations:

#### A. Markdown from MDX Build

For processing MDX content into markdown:

```typescript
"route-key": {
    build: {
        source: "content/your-source-folder",
        excludedPaths?: ["subfolder-to-exclude"],
        flatten?: true, // flattens directory structure
        markdown?: {
            includeFrontMatterLinks?: true,
            excludedSections?: ["## Props", "## API"]
        }
    }
}
```

#### B. Template-Based Build

For merging multiple **already generated files** using a template:

```typescript
"route-key": {
    build: {
        template: "/content/ai-templates/your-template.mdx",
        merge: [
            "/path/to/file1.md",
            "/path/to/file2.md",
            "/folder/*.md" // glob patterns supported
        ]
    }
}
```

**Note 1** The files or paths inside the `merge` are relative to the `buildRootPath` as we use this tool to merge them.

**Note 2** The items in `merge` should be listed based on the order in the final file.

#### C. JSON Build

> It is temporary and it only works for components properties. We will replace it with more robust and flexible approach.

For generating JSON from source content:

```typescript
"route-key": {
    build: {
        type: "json",
        source: "content/source-folder"
    }
}
```

### 3. Serve Configuration (Optional)

All the generated markdown files could be served from the same route. But if your route needs custom URL path mapping use this feature. For example `\components\full\Button.md` file is being served from `/components/Button.md` url. If we don't set it, the requests to this URL will be resolved from `/components` folder instead of `components\full` which is wrong.

```typescript
"route-key": {
    serve: {
        baseUrlPath: "/custom-path"
    }
}
```

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
        template: "/content/ai-templates/api-guide.mdx",
        merge: [
            "/api/introduction.md",
            "/api/authentication.md", 
            "/api/endpoints/*.md"
        ]
    }
}
```

### Example 3: Complex Component Documentation

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
        baseUrlPath: "/components/advanced"
    }
}
```

## Best Practices

### Route Key Naming

- Use kebab-case for consistency
- For files: include the `.md` extension
- For directories: use descriptive identifiers

### Build Configuration

- **Source paths**: Always relative to the content root
- **Flatten**: Use `true` when you want all files in a single directory
- **Excluded paths**: Use to skip internal or draft content, or when you want to serve them in different route.
- **Templates**: Store in `/content/ai-templates/` for organization

## How the System Works

### Build Process

1. System reads the configuration
2. For each route, processes the build configuration
3. Generates content in the specified `buildRootPath`
4. Files are organized according to the route keys

### Serve Process

1. Incoming URL request arrives
2. System reverse-lookups the configuration
3. Finds matching route with `serve.baseUrlPath` or route key (through the [txt](/apps/docs/app/txt/) router)
4. Serves the corresponding generated content
