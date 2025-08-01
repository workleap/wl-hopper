# Todos

- [ ] We need to change our strategy for guides with large files because some tools like Claude Code raise error:
⏺ Hopper-Design-System - get_guide (MCP)(guide: "tokens")
  ⎿  Error: MCP tool "get_guide" response (58185 tokens) exceeds maximum allowed tokens (25000).
     Please use pagination, filtering, or limit parameters to reduce the response size.

⏺ Hopper-Design-System - get_guide (MCP)(guide: "icons")
  ⎿  Error: MCP tool "get_guide" response (207037 tokens) exceeds maximum allowed tokens (25000).
     Please use pagination, filtering, or limit parameters to reduce the response size.

## Tools

`claude mcp add --transport http Hopper-Design-System https://deploy-preview-717--wl-hopper.netlify.app/mcp`
