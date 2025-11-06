/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: {
    // weil GitHub Pages kein Image Optimization-Server hat
    unoptimized: true,
  },
  // wichtig für GitHub Pages unter /Matize-Musik
  basePath: isProd ? "/Matize-Musik" : "",
  assetPrefix: isProd ? "/Matize-Musik/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
