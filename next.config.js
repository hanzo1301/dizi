/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: false,
  // If the app is served at a subpath (e.g. example.com/dizi/), set BASE_PATH=/dizi in env
  ...(process.env.BASE_PATH && { basePath: process.env.BASE_PATH }),
  images: {
    unoptimized: true
  },
  experimental: {
    layers: true,
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