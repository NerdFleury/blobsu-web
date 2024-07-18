/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w40/**",
      },
      {
        protocol: "https",
        hostname: "a.blobsu.xyz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
