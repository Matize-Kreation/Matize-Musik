// next.config.js

const isExport = process.env.EXPORT === "true" || process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: isExport ? "/Matize-Musik" : "",
    assetPrefix: isExport ? "/Matize-Musik" : "",
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: isExport ? "/Matize-Musik" : "",
    },
};

module.exports = nextConfig;
