/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require("cypress");
const setupPlugins = require("./cypress/plugins/index.js");

module.exports = defineConfig({
  viewportWidth: 1300,
  defaultCommandTimeout: 20000,
  video: false,
  projectId: "2tv5un",
  e2e: {
    setupNodeEvents(on, config) {
      return setupPlugins(on, config);
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    testIsolation: false,
  },
});
