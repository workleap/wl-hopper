import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true, // This will be enabled by default and removed in Next.js 15
    typescript: {
        ignoreBuildErrors: true // we typecheck separately
    },
    productionBrowserSourceMaps: true,
    // Eslint only lint pages/, app/, components/, lib/, and src/ directories by default. So we need to add other directories to the eslint config.
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#linting-custom-directories-and-files
    eslint: {
        ignoreDuringBuilds: true,
        dirs: [
            ".storybook",
            "app",
            "components",
            "configs",
            "content",
            "context",
            "hooks",
            "scripts"
        ]
    },
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
