import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Lighthouse Performance Optimizations */

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // JavaScript optimization
  compress: true,

  // Enable React strict mode for development
  reactStrictMode: true,

  // Webpack optimization - Use Next.js defaults
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor code
            vendor: {
              test: /node_modules/,
              name: "vendor",
              priority: 10,
              reuseExistingChunk: true,
              minChunks: 2,
            },
            // React and related libraries
            react: {
              test: /[\\/]node_modules[\\/]((react|react-dom|react-redux)[\\/])/,
              name: "react",
              priority: 20,
              reuseExistingChunk: true,
            },
            // Common chunks
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              name: "common",
            },
          },
        },
      };
    }

    return config;
  },

  // Optimize for production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
