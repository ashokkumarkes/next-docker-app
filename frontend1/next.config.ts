/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // 👈 ye important hai
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;