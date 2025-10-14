# Hopper MCP Server

A Model Context Protocol (MCP) server providing AI-powered assistance for the Workleap Hopper Design System. Enables AI tools to access component documentation, design tokens, icons, and best practices.

## Quick Start

### Local Development

1. **Build documentation** (from repository root):

   ```bash
   # Run from root folder to ensure React 19 is available
   cd ../../  # Navigate to repository root
   pnpm build:ai-docs
   ```

2. **Start the server**:

   ```bash
   cd apps/mcp-server
   pnpm dev
   ```

   Server runs at `http://localhost:8888/mcp`

3. **Configure MCP client** (create `.vscode/mcp/config.json`):

   ```json
   {
     "servers": {
       "Hopper": {
         "url": "http://localhost:8888/mcp",
         "type": "http"
       }
     }
   }
   ```

## Architecture

```text
src/
├── server.ts       # Core MCP server
├── tools.ts        # Component docs & guides
├── prompts.ts      # AI prompts
└── hosts/
    ├── expressJs.ts    # Local development
    └── netlify/        # Production deployment
```

**Key Features:**

- Multi-host support (Express.js/Netlify)
- Component documentation access
- Design token integration
- Session management

## Available Tools

- `get_started` - Setup guidance
- `get_guide` - Design system guides and design tokens (use `category` param for tokens)
- `get_component_usage` - Component usage docs
- `get_component_props` - Component API/props
- `migrate_code_to_hopper` - Migrate existing code to Hopper

## Available Prompts

- `generate_code_from_figma_design` - Get fine-tuned prompt for generating code from Figma design

## Scripts

```bash
pnpm build              # Build for production
pnpm dev                # Start Netlify dev server
```

## Deployment

Automatically deploys to Netlify Functions on merge to `main`. Endpoint: `/mcp`

## License

Apache-2.0
