/* eslint-disable */
const { join } = require("path");

const moduleExports = {
  async redirects() {
    return [
      {
        source: "/dribbble",
        destination: "https://dribbble.com/mknepprath",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/mknepprath",
        permanent: true,
      },
      {
        source: "/goodreads",
        destination: "https://goodreads.com/mknepprath",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/mknepprath/",
        permanent: true,
      },
      {
        source: "/letterboxd",
        destination: "https://letterboxd.com/mknepprath/",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/mknepprath/",
        permanent: true,
      },
      {
        source: "/mastodon",
        destination: "https://mastodon.social/@mknepprath",
        permanent: true,
      },
      {
        source: "/music",
        destination: "https://music.apple.com/profile/mknepprath",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/mknepprath",
        permanent: true,
      },
      {
        source: "/writing/detective-comics",
        destination: "/writing/defective-comics",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow all HTTPS domains
        hostname: "**", // Allow any hostname
      },
      {
        protocol: "http", // Allow all HTTP domains (optional)
        hostname: "**", // Allow any hostname
      },
    ],
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
      (path) => (config.resolve.alias[`@${path}`] = join(__dirname, path)),
    );

    return config;
  },
};

module.exports = moduleExports;
