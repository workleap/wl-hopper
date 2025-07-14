### Local Testing

**Test with external repository:**

1. Run the MCP server locally by `pnpm dev`
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
