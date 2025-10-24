import type { Config } from "svgo";

const config: Config = {
    plugins: [
        "preset-default",
        "removeXMLNS"
    ]
};

export default config;
