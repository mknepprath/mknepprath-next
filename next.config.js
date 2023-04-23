/* eslint-disable */
const { join } = require("path");
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Request-Headers", value: "sentry-trace" },
        ],
      },
    ];
  },
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
    domains: [
      "pbs.twimg.com", // Twitter
      "a.ltrbxd.com", // Letterboxed
      "i.gr-assets.com", // Goodreads
      "files.mastodon.social", // Mastodon
      "daringfireball.net", // Daring Fireball
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com", // Apple Music
      },
      {
        protocol: "https",
        hostname: "**.blobstore.apple.com", // Apple Music
      },
    ],
  },
  sentry: {
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    hideSourceMaps: true,
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

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
