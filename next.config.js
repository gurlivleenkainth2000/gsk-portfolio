/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.gurlivleen.dev", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;
