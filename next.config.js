const withCSS = require("@zeit/next-css");
module.exports = withCSS({
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[path][name]-[local]-[hash:base64:5]"
  },
  cssModules: true
});
