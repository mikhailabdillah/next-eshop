import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "cdn.shopify.com"],
  },
  cacheComponents: true,
}

export default nextConfig
