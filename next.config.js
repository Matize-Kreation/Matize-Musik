// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // wenn du GitHub Pages benutzt:
    output: "export",
    basePath: "/Matize-Musik",
    trailingSlash: true,

    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
