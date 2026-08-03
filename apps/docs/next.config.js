import { withContentlayer } from "next-contentlayer2";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true // we typecheck separately
    },
    productionBrowserSourceMaps: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    transpilePackages: ["@hopper-ui", "shiki"],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.platform.workleap.com",
                port: "",
                pathname: "/hopper/**/*"
            }
        ]
    },
    webpack(config) {
        config.resolve.conditionNames = ["hopper-source", ...(config.resolve.conditionNames ?? ["..."])];

        config.module.rules.push(
            {
                test: /\.svg$/i,
                use: ["@svgr/webpack"]
            },
            // The workspace tsconfig aliases "@hopper-ui/components" to source, bypassing the
            // tsup build that normally compiles ICU plural/select strings in intl/*.json into
            // formatter functions. Without this, react-aria's LocalizedStringFormatter.format()
            // returns those strings verbatim instead of interpolating. Mirrors .storybook/intl-loader.js.
            {
                test: /(intl).*\.json$/,
                loader: path.resolve("./intl-loader.js"),
                type: "javascript/auto"
            }
        );

        return config;
    },
    async rewrites() {
        return {
            // `beforeFiles` runs before the static file check, which is what makes the skill
            // routes work at all: the `.md` rule below matches every markdown path, including
            // the ones under /.well-known, and would otherwise send them to the /txt handler.
            beforeFiles: [
                {
                    source: "/.well-known/skills/:path*",
                    destination: "/agent-skills/:path*"
                },
                {
                    source: "/.well-known/agent-skills/:path*",
                    destination: "/agent-skills/:path*"
                }
            ],
            // Keep this in `afterFiles` so real files under public/ still win, which is what
            // serves /ai-docs/**.
            afterFiles: [
                {
                    source: "/:path*.:ext(txt|md)",
                    destination: "/txt/:path*?ext=:ext"
                }
            ]
        };
    },
    async headers() {
        return [
            {
                // Skill clients fetch the manifest and every file from a different origin.
                source: "/.well-known/:prefix(skills|agent-skills)/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Cache-Control", value: "public, max-age=0, must-revalidate" }
                ]
            }
        ];
    }
};

export default withContentlayer(nextConfig);
