// The current pipeline is not configured to build both mcp-server and docs apps (as it would be slow and unnecessary for most cases).
// We keep this lightweight mock of aiFiles.ts to make sure mcp-server tests pass.
// This approach is flaky and should be replaced with a more robust solution in the future.

const files = {
  "styledSystem": {
    "unsafePropsData": {
      "path": "/styled-system/unsafe-props-data.json",
    },
  },
  "tokens": {
    "maps": {
    "brief": {
        "all": {
            "path": "/tokens/brief/tokens-data.json",
        },
      }
    },
  },
};

export { files };
