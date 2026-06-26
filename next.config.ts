import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/platform', permanent: true },
    ];
  },
  // Allow iframes to load public/assets/*.html files
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ];
  },
};

export default nextConfig;
