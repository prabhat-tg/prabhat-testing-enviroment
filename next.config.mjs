import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default', // Prevents Vercel's optimization
    unoptimized: false, // Disables all image optimizations globally
    domains: [
      'images.tractorgyan.com',
      'staging.tractorgyan.com',
      'tractorgyan.com',
      'tg-web-git-main-aniket-tgs-projects.vercel.app',
    ], // Add the allowed domain here
  },
  compiler: {
    styledComponents: {
      minify: true,
    },
  },
};

export default withAnalyzer(nextConfig);
