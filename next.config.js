/* eslint-disable */
const { join } = require("path");

module.exports = {
  images: {
    domains: ["pbs.twimg.com", "a.ltrbxd.com"],
  },
  webpack(config, options) {
    // Fix for a long-running react-spring bug. https://github.com/pmndrs/react-spring/issues/1078#issuecomment-743698325
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    // https://github.com/zeit/next.js/tree/master/examples/with-absolute-imports
    // This allows me to reference these directories as if they were root.
    //
    // For instance, instead of:
    // `import Nav from "../../core/Nav";`
    //
    // I can simply write:
    // `import Nav from "@core/Nav";`
    const paths = ["core", "data", "hooks"];
    paths.forEach(
      (path) => (config.resolve.alias[`@${path}`] = join(__dirname, path))
    );

    return config;
  },
};
