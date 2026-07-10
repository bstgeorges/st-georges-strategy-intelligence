import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/regulatory-horizon/index.html",
        destination: "/regulatory-horizon/",
        permanent: true,
      },
      {
        source: "/ai-signals/archive/:path*",
        destination: "/archive/",
        permanent: true,
      },
      {
        source: "/dashboard/assets/financial-services-intelligence-hero.webp",
        destination: "/dashboard/assets/financial-services-intelligence-hero.svg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
