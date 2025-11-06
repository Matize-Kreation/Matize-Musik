// next.config.js
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const repoName = "Matize-Musik"; // dein GitHub-Repo-Name

const nextConfig = {
    reactStrictMode: true,
    output: "export",
    // alle Routen bekommen das Präfix
    basePath: isProd ? `/${repoName}` : "",
    // alle Assets (_next/static/...) auch
    assetPrefix: isProd ? `/${repoName}/` : "",
    trailingSlash: true,
    staticPageGenerationTimeout: 180,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
