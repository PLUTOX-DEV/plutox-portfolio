/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://alphadao.onrender.com/media/:path*',
      },
    ];
  },
  images: {
    domains: ['localhost', 'cdn.example.com', 'images.unsplash.com', 'your-other-domains.com'],
  },
};

export default nextConfig;
