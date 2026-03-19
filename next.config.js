/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  experimental: {
    webpackBuildWorker: true
  },
  webpack: (config) => {
    config.experiments = { 
      asyncWebAssembly: false,
      layers: true
    };
    return config;
  }
};

export default nextConfig;
