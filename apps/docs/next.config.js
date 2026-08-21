import { withContentlayer } from "next-contentlayer2";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

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
            // library build that normally compiles ICU plural/select strings in intl/*.json into
            // formatter functions. Without this, react-aria's LocalizedStringFormatter.format()
            // returns those strings verbatim instead of interpolating.
            {
                test: /(intl).*\.json$/,
                loader: require.resolve("@hopper-ui/rslib-config/intl-loader"),
                type: "javascript/auto"
            }
        );

        return config;
    },
    async rewrites() {
        return [
            {
                source: "/:path*.:ext(txt|md)",
                destination: "/txt/:path*?ext=:ext"
            }
        ];
    }
};

export default withContentlayer(nextConfig);
