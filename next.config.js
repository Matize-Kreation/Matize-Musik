// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "Matize-Musik";

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    basePath: isProd ? `/${repoName}` : "",
    assetPrefix: isProd ? `/${repoName}/` : "",
    trailingSlash: true,
    images: {
        // weil GitHub Pages + static export
        unoptimized: true,
    },
};

module.exports = nextConfig;
