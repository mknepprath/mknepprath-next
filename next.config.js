/* eslint-disable */

const { join } = require("path");
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[path][name]-[local]-[hash:base64:5]"
  },
  cssModules: true,
  webpack(config, options) {
    // https://github.com/zeit/next.js/tree/master/examples/with-absolute-imports
    // This allows me to reference these directories as if they were root.
    //
    // For instance, instead of:
    // `import Nav from "../../core/Nav";`
    //
    // I can simply write:
    // `import Nav from "core/Nav";`
    const paths = ["core", "data", "hooks"];
    paths.forEach(path => (config.resolve.alias[path] = join(__dirname, path)));

    return config;
  }
});
