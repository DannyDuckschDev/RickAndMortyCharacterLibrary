const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Ignore `crypto` for the web to prevent errors
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'crypto': false,
  };

  return config;
};
