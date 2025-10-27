import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true, // This will be enabled by default and removed in Next.js 15
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
