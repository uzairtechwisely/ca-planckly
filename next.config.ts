import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joinnnow.plancklyimages.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "webapp.plancklyimages.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "joinnow.planckly.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
