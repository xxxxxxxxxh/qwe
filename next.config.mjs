import config from './next-i18next.config.js';
const { i18n } = config;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  i18n,
  poweredByHeader: false,
  images: {
    domains: ['cdn.discordapp.com', 'flagsapi.com', 's2.googleusercontent.com', 'res.cloudinary.com']
  }
};

export default nextConfig;
