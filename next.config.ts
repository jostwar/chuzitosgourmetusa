import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // para deploy en Lightsail/VM: copiar .next/standalone + .next/static + public
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chuzitos.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "achieveapex-organization-files.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.openfoodfacts.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
