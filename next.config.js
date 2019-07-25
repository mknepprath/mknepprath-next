const path = require("path");
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[path][name]-[local]-[hash:base64:5]"
  },
  cssModules: true,
  webpack(config, options) {
    // https://github.com/zeit/next.js/tree/master/examples/with-absolute-imports
    config.resolve.alias["core"] = path.join(__dirname, "core");
    return config;
  }
});
