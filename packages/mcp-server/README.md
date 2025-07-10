### Local Testing

**Test with external repository:**

1. In your desired agent (e.g. Github Copilot) add the MCP server by:

   ```json
    "Hopper MCP server": {
        "type": "stdio",
        "command": "node",
        "args": ["PATH_TO_LOCAL_HOPPER_REPO/packages/mcp-server/dist/index.js"]
      },
   ```

2. To test changes make sure you run `pnpm build`
