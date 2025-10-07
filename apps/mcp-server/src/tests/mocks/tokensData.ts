// The current pipeline is not configured to build both mcp-server and docs apps (as it would be slow and unnecessary for most cases).
// We keep this lightweight mock of aiFiles.ts to make sure mcp-server tests pass.
// This approach is flaky and should be replaced with a more robust solution in the future.

export const MOCK_TOKENS =
{
  "core": {
    "color": {
      "hop-coastal-25": "core_coastal-25",
      "hop-primary-surface": "primary"
    },
    "fontSize": {
      "hop-font-size-120": "core_120"
    }
  },
  "semantic": {
    "color": {
      "hop-danger-border-active": "danger-active",
      "hop-danger-icon-active": "danger-active",
      "hop-success-border": "success"
    },
    "size": {
      "hop-space-inset-xs": "inset-xs"
    },
    "shadow": {
      "hop-elevation-none": "none"
    },
    "fontFamily": {
      "hop-overline-font-family": "overline"
    }
  }
};
