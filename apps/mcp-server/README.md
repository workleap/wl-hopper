### Local Testing

**Test with external repository:**

1. Run the MCP server locally by `pnpm mcp:dev`
2. Add the `mcp` folder inside the `.vscode` folder with the following content:  

    ```json
    {
        "servers": {
            "Hopper": {
                "url": "<http://localhost:3300/mcp>",
                "type": "http"
            }
        },
        "inputs": []
    }
    ```

3. to generate AI docs again, you can call `pnpm generate:ai` from `docs`
