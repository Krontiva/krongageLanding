import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
