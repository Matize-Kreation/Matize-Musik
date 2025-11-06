/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    basePath: isProd ? "/Matize-Musik" : "",
    trailingSlash: true,
    staticPageGenerationTimeout: 180,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
