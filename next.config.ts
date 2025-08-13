import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            jsx: true,
          },
        },
      ],
    });
    
    return config;
  },
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;
