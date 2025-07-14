### Local Testing

**Test with external repository:**

1. Run the MCP server locally by `pnpm dev`
2. Add the `mcp` folder inside the `.vscode` folder and add the following content:  

    ```json
    {
        "servers": {
            "Hopper": {
                "url": "<http://localhost:3000/mcp>",
                "type": "http"
            }
        },
        "inputs": []
    }
    ```
