/* eslint-disable */

const { join } = require("path");
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[path][name]-[local]-[hash:base64:5]"
  },
  cssModules: true,
  experimental: { publicDirectory: true },
  webpack(config, options) {
    // https://github.com/zeit/next.js/tree/master/examples/with-absolute-import
    const paths = ["core", "data"];
    paths.forEach(path => (config.resolve.alias[path] = join(__dirname, path)));

    return config;
  }
});
