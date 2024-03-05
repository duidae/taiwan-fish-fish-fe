/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TODO: remove remote pattern for mockups
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.newsmarket.com.tw",
        port: "",
        pathname: "/mag/**"
      }
    ]
  },
  poweredByHeader: false // Remove poweredby for security issue, ref: https://nextjs.org/docs/pages/api-reference/next-config-js/poweredByHeader
}

export default nextConfig
