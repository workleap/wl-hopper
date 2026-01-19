import packageJson from "../../package.json" with { type: "json" };

const TokensVersion = packageJson.version;

export const HOPPER_PREFIX = "hop";
export const StyledSystemRootCssClass = `${HOPPER_PREFIX}-${TokensVersion.replaceAll(".", "-")}`;
