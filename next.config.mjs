/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: 'https://plutox-a02j.onrender.com/media/:path*',
      },
    ];
  },
  images: {
    domains: [
      'localhost',
      'cdn.example.com',
      'images.unsplash.com',
      'your-other-domains.com',
      'plutox-a02j.onrender.com', // ✅ Add this
    ],
  },
};

export default nextConfig;
