import SystemTheme from "@/utils/helpers/theme";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
    ],
    domains: ["logo.clearbit.com", "img.logo.dev"],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:2040']
    }
  },
  theme: {
    extend: {
      colors: {
        ...SystemTheme.colors,
      },
    },
  },

};

export default nextConfig;


