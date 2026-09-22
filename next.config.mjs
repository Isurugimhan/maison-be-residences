/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'file--storage.lon1.cdn.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'www.maisonberesidences.com',
      },
      {
        protocol: 'https',
        hostname: 'maisonberesidences.com',
      },
    ],
  },
};

export default nextConfig;
