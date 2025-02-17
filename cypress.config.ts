import { defineConfig } from "cypress";
import webpackConfig from "./webpack.config";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackConfig({ mode: "development", port: 3000 }),
    },
    defaultBrowser: "electron",
    specPattern: "cypress/component/**/*.cy.{ts,tsx}",
  },

  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    baseUrl: "http://localhost:3000",
  },
});
