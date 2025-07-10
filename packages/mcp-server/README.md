### Local Testing

**Test with external repository:**

1. Register the local `mcp-server` globally by running `pnpm link --global` from the [packages/mcp-server](/packages/mcp-server/) folder.
2. In your desired agent (e.g. Github Copilot) add the MCP server by:

   ```json
    "Hopper MCP server": {
        "type": "stdio",
        "command": "node",
        "args": ["PATH_TO_LOCAL_HOPPER_REPO/packages/mcp-server/dist/index.js"]
      },
   ```

3. To test changes make sure you run `pnpm build`
4. When you are done, you have to uninstall it by calling `pnpm uninstall --global @hopper-ui/dev-mcp`
   Note: Calling `pnpm unlink` doesn't work in this case. More info: <https://pnpm.io/cli/unlink>
