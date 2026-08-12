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
        return [
            {
                source: "/:path*.:ext(txt|md)",
                destination: "/txt/:path*?ext=:ext"
            }
        ];
    }
};

export default withContentlayer(nextConfig);
