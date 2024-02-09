/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TODO: remove remote pattern for mockups
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.newsmarket.com.tw',
        port: '',
        pathname: '/mag/**',
      },
    ],
  },
};

export default nextConfig;
