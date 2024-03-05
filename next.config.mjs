/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'c.saavncdn.com',
          },
          {
            protocol: 'https',
            hostname: 'www.pagalworld.com.cm',
          },
        ],
    }
};

export default nextConfig;
