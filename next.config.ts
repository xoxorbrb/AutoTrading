import type { Configuration as WebpackConfig } from "webpack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig, { dev }) {
    return config;
  },
};

export default nextConfig;
