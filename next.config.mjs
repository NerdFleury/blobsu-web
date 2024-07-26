/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/w80/**",
      },
      {
        protocol: "https",
        hostname: "a.blobsu.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.ppy.sh",
        port: "",
        pathname: "/beatmaps/**",
      },
    ],
    minimumCacheTTL: 1,
  },
};

export default nextConfig;
